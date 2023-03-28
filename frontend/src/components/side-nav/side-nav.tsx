import { useGetUserQueryData } from '@/features/auth'
import Image from 'next/image'
import { TwitterIcon } from '../elements'
import Logout from './logout'
import Navigations, { PublicNavigation } from './navigations'

export const SideNav = () => {
  const user = useGetUserQueryData()

  return (
    <header className="fixed flex h-screen flex-col items-center justify-between border-r p-3 xl:w-[250px]">
      <section className="flex flex-col gap-8">
        <h1>
          <TwitterIcon />
        </h1>
        {user ? <Navigations /> : <PublicNavigation />}
        {user && <Logout />}
      </section>
      {user && (
        <section className="mb-2 flex items-center gap-4">
          <Image
            src={user.profilePicture ?? '/twitter-default-pp.png'}
            width="40"
            height="40"
            className="rounded-full"
            alt="photo profile"
          />
          <p className="hidden xl:block">user blablabla</p>
        </section>
      )}
    </header>
  )
}
