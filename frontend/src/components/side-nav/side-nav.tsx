import { useGetUserQueryData } from '@/features/auth'
import { TwitterIcon } from '../elements'
import Navigations, { PublicNavigation } from './navigations'
import UserProfile from './user-profile'

export const SideNav = () => {
  const user = useGetUserQueryData()

  return (
    <nav className="fixed flex h-screen w-[72px] flex-col items-center justify-between border-r p-3 pb-5 xl:w-[260px] xl:items-start">
      <section className="flex w-full flex-col items-center gap-8 xl:items-start">
        <h1>
          <TwitterIcon />
        </h1>
        {user ? <Navigations /> : <PublicNavigation />}
      </section>
      {user && <UserProfile />}
    </nav>
  )
}
