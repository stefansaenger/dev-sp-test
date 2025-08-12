const SamlStrategy = require('@node-saml/passport-saml').Strategy;

module.exports = function (passport, config) {

  var saml={};
  var samlStrategy = new SamlStrategy(
  {
    path: config.passport.saml.path,
    callbackUrl: config.passport.saml.path,
    entryPoint: config.passport.saml.entryPoint,
    logoutUrl: config.passport.saml.logoutUrl,
    logoutCallbackUrl: config.passport.saml.logoutCallbackUrl,
    issuer: config.passport.saml.issuer,
    idpCert: config.passport.saml.cert,
    cert: config.passport.saml.cert
  },
  function (profile, done) {
    saml.nameID = profile.nameID;
    saml.nameIDFormat = profile.nameIDFormat;
    console.log("profile: ", profile);
    return done(null,
      {
        id: profile.uid,
        RedmineApiKey: profile.RedmineApiKey,
        email: profile.email,
        displayName: !!profile.cn ? profile.cn : profile.givenname + " " + profile.sn,
        firstName: profile.givenname,
        lastName: profile.sn
      });
  });

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.logoutSaml = function(req, res) {
    if(req.user) {
      req.user.nameID = saml.nameID;
      req.user.nameIDFormat = saml.nameIDFormat;
      samlStrategy.logout(req, function(err, request){
          if(!err){
              //redirect to the IdP Logout URL
              res.redirect(request);
          }
      });
    } else {
      res.redirect('/');
    }
  };

  passport.use(samlStrategy);


};
