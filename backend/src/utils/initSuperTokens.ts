import supertokens from 'supertokens-node'
import Session from 'supertokens-node/recipe/session'
import ThirdPartyEmailPassword from 'supertokens-node/recipe/thirdpartyemailpassword'

const { Google } = ThirdPartyEmailPassword

const initSuperTokens = () =>
  supertokens.init({
    framework: 'express',
    supertokens: {
      connectionURI: 'http://localhost:3567',
      // apiKey: <API_KEY(if configured)>,
    },
    appInfo: {
      // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
      appName: 'Twitter Clone',
      apiDomain: 'http://localhost:5000',
      websiteDomain: 'http://localhost:3000',
      apiBasePath: '/auth',
      websiteBasePath: '/auth',
    },
    recipeList: [
      ThirdPartyEmailPassword.init({
        providers: [
          Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          }),
        ],
      }),
      Session.init(), // initializes session features
    ],
  })

export default initSuperTokens
