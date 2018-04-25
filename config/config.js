module.exports = {
  development: {
    app: {
      name: 'Passport SAML strategy example',
      port: process.env.PORT || 3000
    },
    passport: {
      strategy: 'saml',
      saml: {
        path: process.env.SAML_PATH || '/login/callback',
        logoutCallbackUrl: '/logout/callback',
        entryPoint: process.env.SAML_ENTRY_POINT || 'https://redminedevidp.vnc.biz/simplesaml/saml2/idp/SSOService.php',
        logoutUrl: process.env.SAML_ENTRY_POINT || 'https://redminedevidp.vnc.biz/simplesaml/saml2/idp/SingleLogoutService.php',
        issuer: 'saml-commander-dev',
        cert: process.env.SAML_CERT || null
      }
    }
  }
};
