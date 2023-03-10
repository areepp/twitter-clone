import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react'
import ThirdPartyEmailPassword, {
  Google,
} from 'supertokens-auth-react/recipe/thirdpartyemailpassword'
import Session from 'supertokens-auth-react/recipe/session'
import { QueryClient, QueryClientProvider } from 'react-query'

SuperTokens.init({
  appInfo: {
    appName: 'Twitter Clone',
    apiDomain: 'http://localhost:5000',
    websiteDomain: 'http://localhost:3000',
    apiBasePath: '/auth',
    websiteBasePath: '/auth',
  },
  recipeList: [
    ThirdPartyEmailPassword.init({
      signInAndUpFeature: {
        providers: [Google.init()],
      },
    }),
    Session.init(),
  ],
})

const queryClient = new QueryClient()

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <SuperTokensWrapper>
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  </SuperTokensWrapper>
)

export default App
