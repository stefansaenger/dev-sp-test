const {XMLParser, XMLBuilder, XMLValidator} = require('fast-xml-parser');
var uuidv1 = require('uuid/v1');
var moment = require('moment');

const xmloptions = {
    ignoreAttributes : false,
    attributeNamePrefix : "",
    textNodeName: "$t"
};

const parser = new XMLParser(xmloptions);
const builder = new XMLBuilder(xmloptions);


module.exports = function (app, config, passport) {

  app.get('/', function (req, res) {
    if (req.isAuthenticated()) {
      res.render('home',
        {
          user: req.user
        });
    } else {
      res.render('home',
        {
          user: null
        });
    }
  });

  app.get('/login',
    passport.authenticate(config.passport.strategy,
      {
        successRedirect: '/',
        failureRedirect: '/login'
      })
  );

  app.post(config.passport.saml.path,
    passport.authenticate(config.passport.strategy,
      {
        failureRedirect: '/',
        failureFlash: true
      }),
    function (req, res) {
      res.redirect('/');
    }
  );

  app.get('/signup', function (req, res) {
    res.render('signup');
  });

  app.get('/profile', function (req, res) {
    if (req.isAuthenticated()) {
      res.render('profile',
        {
          user: req.user
        });
    } else {
      res.redirect('/login');
    }
  });

  app.get('/logout', function (req, res) {

    var samlReqId = "";
    var samlResponseId = "_" + uuidv1().replace(/-/g, "");

    var samlResponseTxt = "";
    var issueInstant = moment().toISOString();
    var newURI = "";
    if (req.query && (req.query !== "" )) {
      console.log("logout", req.query );

      if (req.query.SAMLRequest && (req.query.SAMLRequest !== "")) {
        var b64r1 = urldecode(req.query.SAMLRequest);
        var b64buff = Buffer.from(b64r1, 'base64');
        var samlreq = Zlib.inflateRawSync(b64buff);
        var samlp = parser.parse(samlreq.toString());
        samlReqId = samlp["samlp:LogoutRequest"].ID;
        // logging("logout samlreq: ", samlreq.toString());
        // logging("logout", samlp);
        const logoutReqData = samlp["samlp:LogoutRequest"];
        const logoutReqDataNameID = logoutReqData["saml:NameID"];
        const logoutReqDataNameIDVal = logoutReqDataNameID["$t"];

        var samlResponse = { 'samlp:LogoutResponse':
            { 'xmlns:samlp': 'urn:oasis:names:tc:SAML:2.0:protocol',
              'xmlns:saml': 'urn:oasis:names:tc:SAML:2.0:assertion',
              ID: samlResponseId,
              Version: '2.0',
              'saml:Issuer':
                { 'xmlns:saml': 'urn:oasis:names:tc:SAML:2.0:assertion',
                  '$t': config.passport.saml.issuer },
              IssueInstant: issueInstant,
              Destination: config.passport.saml.logoutUrl,
              InResponseTo: samlp["samlp:LogoutRequest"].ID,
              'samlp:Status':
                { 'samlp:StatusCode': { Value: 'urn:oasis:names:tc:SAML:2.0:status:Success' }
                }
            }
        };


        var fxpLogoutXML = builder.build(samlResponse);
        var LogoutXMLdeflate = Zlib.deflateRawSync(Buffer.from(fxpLogoutXML));
        var LogoutB64 = LogoutXMLdeflate.toString('base64');

        newURI = config.passport.saml.logoutUrl + "?SAMLResponse=" + encodeURIComponent(LogoutB64);
      }
      if (req.query.RelayState && (req.query.RelayState !== "")) {
        console.log("RelayState ", req.query.RelayState);
        if (newURI !== "") {
          newURI += "&RelayState=" + req.query.RelayState;
        }
      }
    }


    req.logout(function(err) {
      if (err) { return next(err); }
      if (newURI == "") {
        res.redirect('/login');
      } else {
        res.redirect(newURI);
      }
    });
  });

  app.get('/call-logout', passport.logoutSaml);


};
