import { useGetUserQueryData } from '@/features/auth'
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
  const user = useGetUserQueryData()
  return (
    <nav className="flex flex-col gap-8">
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
    </nav>
  )
}

export const PublicNavigation = () => (
  <nav className="flex flex-col gap-8">
    <NavLink href="#" Icon={HashtagIcon} text="Explore" />
  </nav>
)

export default ProtectedNavigations
