import '@/styles/globals.css'

import { dehydrate } from '@tanstack/react-query'
import Hydrate from '@/components/providers/hydrate'
import QueryProvider from '@/components/providers/query-provider'
import getQueryClient from '@/lib/get-query-client'

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient()
  const dehydratedState = dehydrate(queryClient)

  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <Hydrate state={dehydratedState}>{children}</Hydrate>
        </QueryProvider>
      </body>
    </html>
  )
}

export default RootLayout
