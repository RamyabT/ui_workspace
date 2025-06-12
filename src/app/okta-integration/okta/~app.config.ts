//const { CLIENT_ID, ISSUER, OKTA_TESTING_DISABLEHTTPSCHECK } = process.env;
//const USE_CLASSIC_ENGINE = process.env.USE_CLASSIC_ENGINE || false;

export default {
  // oidc: {
  //   issuer: 'https://login-devprj1.vancity.com/oauth2/default',
  //   clientId: '0oak88x1a9iOszumI1d7',
  //   redirectUri: 'https://my-sit.vancity.com/dit-dep24-retail/login/callback',
  //   scopes: ['openid', 'profile', 'email'],
  //   testing: {
  //     disableHttpsCheck: "false"
  //   },
  // postLogoutRedirectUri: "https://my-sit.vancity.com/dit-dep24-retail"
  // },
  oidc: {
    issuer: 'https://dev-91649780.okta.com/oauth2/default',
    clientId: '0oaexthayzw23F0pH5d7',
    redirectUri: 'http://localhost:4200/login/callback',
    scopes: ['openid', 'profile', 'email'],
    testing: {
      disableHttpsCheck: "false"
    },
    postLogoutRedirectUri: "http://localhost:4200"
  },
  widget: {
    USE_CLASSIC_ENGINE: "true",
  },
  resourceServer: {
    messagesUrl: 'http://localhost:4200/api/messages',
  },
};
