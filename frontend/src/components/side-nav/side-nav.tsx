import { useUser } from '@/features/profiles'
import Image from 'next/image'
import { TwitterIcon } from '../elements'
import Navigations from './navigations'

export const SideNav = () => {
  const { data } = useUser()
  return (
    <header className="fixed flex h-screen flex-col items-center justify-between border-r p-3 xl:w-[250px]">
      <section className="flex flex-col gap-8">
        <h1>
          <TwitterIcon />
        </h1>
        <Navigations />
      </section>
      <section className="mb-2 flex items-center gap-4">
        <Image
          src={data.profilePicture ?? '/twitter-default-pp.png'}
          width="40"
          height="40"
          className="rounded-full"
          alt="photo profile"
        />
        <p className="hidden xl:block">user blablabla</p>
      </section>
    </header>
  )
}
