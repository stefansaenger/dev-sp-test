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
        entryPoint: process.env.SAML_ENTRY_POINT || 'https://vncidp.dev.vnc.de/saml2/idp/SSOService.php',
        logoutUrl: process.env.SAML_ENTRY_POINT || 'https://vncidp.dev.vnc.de/saml2/idp/SingleLogoutService.php',
        issuer: 'saml-localhost-dev',
        acceptedClockSkewMs: -1,
        cert: process.env.SAML_CERT || 'MIIEOzCCAyOgAwIBAgIJAIIxIoAmkptKMA0GCSqGSIb3DQEBBQUAMIGzMQswCQYDVQQGEwJDSDELMAkGA1UECAwCWkcxDDAKBgNVBAcMA1p1ZzEoMCYGA1UECgwfVk5DLSBWaXJ0dWFsIE5ldHdvcmsgQ29uc3VsdCBBRzEYMBYGA1UECwwPUmVkbWluZSBEZXYgSWRQMR4wHAYDVQQDDBVyZWRtaW5lZGV2aWRwLnZuYy5iaXoxJTAjBgkqhkiG9w0BCQEWFnN0ZWZhbi5zYWVuZ2VyQHZuYy5iaXowHhcNMTUxMjAxMTExMjA2WhcNMjUxMTMwMTExMjA2WjCBszELMAkGA1UEBhMCQ0gxCzAJBgNVBAgMAlpHMQwwCgYDVQQHDANadWcxKDAmBgNVBAoMH1ZOQy0gVmlydHVhbCBOZXR3b3JrIENvbnN1bHQgQUcxGDAWBgNVBAsMD1JlZG1pbmUgRGV2IElkUDEeMBwGA1UEAwwVcmVkbWluZWRldmlkcC52bmMuYml6MSUwIwYJKoZIhvcNAQkBFhZzdGVmYW4uc2FlbmdlckB2bmMuYml6MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwJ08bG2XuLqOURqjyUQYDqN/RiiVcE56CZi89jAaai9qDgvfyVPuimdgCAY18Rvh6dvf++0vTu1i4L6sElMvihnkD0+qm4alkQCOt5q/vEv7jvHG0PFbt2lQ6dGQm3OP6JfGatKZ6+UatuQScTQ08v6JR0S7VTElk3F7SYch9yyUAMM1pKfvakOnpy3XTZE8M9aABl5Ly1Xf3X9kxO3O2wqpKhyb6bUMN7UUe9p5SZhPx35i6UVMpekCtSo7pjIvGwQEnRxJEr2P4/RBNa7gDQtT6yLYa/MOhc3M8yViQyL/ASyJj9wcDVIurRTGXOuo9QQx8t8FX4vKjLiAyCxZsQIDAQABo1AwTjAdBgNVHQ4EFgQUvk2ifwnRhtiVedAi4wZ6AQEFa+EwHwYDVR0jBBgwFoAUvk2ifwnRhtiVedAi4wZ6AQEFa+EwDAYDVR0TBAUwAwEB/zANBgkqhkiG9w0BAQUFAAOCAQEAEha+N2LrJ1jsM12/ziPtorPGeJRbL7oALivq5odX3+1NGJ4htWc/zrxgsmKBml8E5QlnOWKLzixFs97GqA1P6SJWrG/HUXpKeZfIbFWecJVEqAW/+j6bgxFLtfbI0hQhKVD7vgJyulfmQofdBWcU6DQeClxG9/3ufNDmSGP7AUguzfp1T//ZupL54uWxHyzvmPvGSXGdHxv/8GEWEaH6vC/NJ70UORuQDjliQESgXN7Z+IGMmBYaFrONKuqbQ/CZiKuTO2vFs5kj50AZZsOKn9aP49m7wfqH0KJT33JY32lU/ntscFggvObSnNtzMvR91ZkGFhg4pvfu30vtH+Ltfg=='
      }
    }
  }
};
