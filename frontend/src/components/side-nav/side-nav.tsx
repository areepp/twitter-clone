import { useGetUserQueryData } from '@/features/auth'
import { useLogout } from '@/features/auth/hooks/use-logout'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { TwitterIcon } from '../elements'
import Navigations, { PublicNavigation } from './navigations'

export const SideNav = () => {
  const user = useGetUserQueryData()
  const { refetch } = useLogout()

  return (
    <header className="fixed flex h-screen flex-col items-center justify-between border-r p-3 xl:w-[250px]">
      <section className="flex flex-col gap-8">
        <h1>
          <TwitterIcon />
        </h1>
        {user ? <Navigations /> : <PublicNavigation />}
        {user && (
          <button className="flex items-center gap-4" onClick={() => refetch()}>
            <ArrowLeftOnRectangleIcon className="h-7 w-7" />
            <span className="hidden text-xl xl:block">Log out</span>
          </button>
        )}
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
