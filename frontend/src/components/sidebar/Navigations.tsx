// eslint-disable-next-line import/no-extraneous-dependencies
import {
  HomeIcon,
  HashtagIcon,
  BellIcon,
  EnvelopeIcon,
  BookmarkIcon,
  UserIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline'
import NavLink from './NavLink'

const Navigations = () => (
  <nav className="flex flex-col gap-8">
    <NavLink href="/" Icon={HomeIcon} text="Home" />
    <NavLink href="#" Icon={HashtagIcon} text="Explore" />
    <NavLink href="#" Icon={BellIcon} text="Notifications" />
    <NavLink href="#" Icon={EnvelopeIcon} text="Messages" />
    <NavLink href="#" Icon={BookmarkIcon} text="Bookmarks" />
    <NavLink href="#" Icon={UserIcon} text="Profile" />
    <NavLink href="#" Icon={EllipsisHorizontalIcon} text="More" />
  </nav>
)

export default Navigations
