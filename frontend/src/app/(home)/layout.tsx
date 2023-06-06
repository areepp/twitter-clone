import { MainLayout } from '@/components/layouts/main-layout'
import getQueryClient from '@/lib/get-query-client'
import { getMyProfile } from '@/lib/users'

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(['user', 'me'], getMyProfile)

  return <MainLayout>{children}</MainLayout>
}

export default HomeLayout
