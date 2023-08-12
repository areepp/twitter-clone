'use client'

import { useGetLoggedInUser } from '@/features/auth'
import { NewTweetModal } from '@/features/tweets'
import {
  HomeIcon,
  HashtagIcon,
  BellIcon,
  EnvelopeIcon,
  BookmarkIcon,
  UserIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline'
import NavLink from './nav-link'

const ProtectedNavigations = () => {
  const { data: user } = useGetLoggedInUser()

  if (!user)
    return (
      <nav className="flex flex-col gap-8">
        <NavLink href="#" Icon={HashtagIcon} text="Explore" disabled />
      </nav>
    )

  return (
    <nav className="flex w-full flex-col items-center xl:items-start">
      <NavLink href="/" Icon={HomeIcon} text="Home" />
      <NavLink href="#" Icon={HashtagIcon} text="Explore" disabled />
      <NavLink href="#" Icon={BellIcon} text="Notifications" disabled />
      <NavLink href="#" Icon={EnvelopeIcon} text="Messages" disabled />
      <NavLink href="#" Icon={BookmarkIcon} text="Bookmarks" disabled />
      <NavLink
        href={`/profile/${user?.username}`}
        Icon={UserIcon}
        text="Profile"
      />
      <NavLink href="#" Icon={EllipsisHorizontalIcon} text="More" disabled />
      <NewTweetModal className="mt-3" />
    </nav>
  )
}

export default ProtectedNavigations
