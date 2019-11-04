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
        entryPoint: process.env.SAML_ENTRY_POINT || 'http://localhost:4000/saml2/idp/SSOService.php',
        logoutUrl: process.env.SAML_ENTRY_POINT || 'http://localhost:4000/saml2/idp/SingleLogoutService.php',
        issuer: 'local-dev-sp',
        cert: process.env.SAML_CERT || null
      }
    }
  }
};
