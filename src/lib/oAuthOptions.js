export default {
    // Domain name
    domain: 'test-pool-gjoel.auth.ap-southeast-2.amazoncognito.com',
    // Authorized scopes
    scope: [
      'phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'
    ],

    // Callback URL
    redirectSignIn: 'https://localhost:3000/signin',

    // Sign out URL
    redirectSignOut: 'https://localhost:3000/signout',

    // 'code' for Authorization code grant,
    // 'token' for Implicit grant
    responseType: 'code',

    // optional, for Cognito hosted ui specified options
    options: {
      // Indicates if the data collection is enabled to support Cognito advanced security features. By default, this flag is set to true.
      AdvancedSecurityDataCollectionFlag: true
    }
  }
