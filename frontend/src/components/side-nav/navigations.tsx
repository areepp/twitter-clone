import { useGetUserQueryData } from '@/features/auth'
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
import { FeatherIcon, PillButton } from '../elements'
import NavLink from './nav-link'

const ProtectedNavigations = () => {
  const user = useGetUserQueryData()
  return (
    <nav className="flex w-full flex-col items-center gap-8 xl:items-start">
      <NavLink href="/" Icon={HomeIcon} text="Home" />
      <NavLink href="#" Icon={HashtagIcon} text="Explore" />
      <NavLink href="#" Icon={BellIcon} text="Notifications" />
      <NavLink href="#" Icon={EnvelopeIcon} text="Messages" />
      <NavLink href="#" Icon={BookmarkIcon} text="Bookmarks" />
      <NavLink
        href={`/profile/${user.username}`}
        Icon={UserIcon}
        text="Profile"
      />
      <NavLink href="#" Icon={EllipsisHorizontalIcon} text="More" />
      <NewTweetModal />
    </nav>
  )
}

export const PublicNavigation = () => (
  <nav className="flex flex-col gap-8">
    <NavLink href="#" Icon={HashtagIcon} text="Explore" />
  </nav>
)

export default ProtectedNavigations
