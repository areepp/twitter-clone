import { useGetUserQueryData } from '@/features/auth'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { TwitterIcon } from '../elements'
import Logout from './logout'
import Navigations, { PublicNavigation } from './navigations'

export const SideNav = () => {
  const user = useGetUserQueryData()

  return (
    <nav className="fixed flex h-screen w-[72px] flex-col items-center justify-between border-r p-3 pb-5 xl:w-[260px] xl:items-start">
      <section className="flex flex-col gap-8">
        <h1>
          <TwitterIcon />
        </h1>
        {user ? <Navigations /> : <PublicNavigation />}
        {user && <Logout />}
      </section>
      {user && (
        <section className="flex items-center justify-between rounded-full p-3 hover:bg-gray-200 xl:w-full">
          <div className="flex items-center gap-3">
            <Image
              src={user.profilePicture ?? '/twitter-default-pp.png'}
              width="40"
              height="40"
              className="rounded-full"
              alt="photo profile"
            />
            <div className="hidden text-sm xl:block">
              <p>{user.username}</p>
              <p className="text-dark-gray">@{user.username}</p>
            </div>
          </div>
          <EllipsisHorizontalIcon className="hidden h-5 w-5 xl:block" />
        </section>
      )}
    </nav>
  )
}
