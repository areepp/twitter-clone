import { PillButton } from '@/components/elements'
import { useGetUserProfile } from '../hooks/use-get-user-profile'
import { useGetLoggedInUser } from '@/features/auth'
import { useParams } from 'next/navigation'
import { useFollowUser, useUnFollowUser } from '../hooks/use-follow-user'

const FollowButton = () => {
  const { username: usernameQuery } = useParams()
  const { data: user } = useGetUserProfile(usernameQuery as string)
  const { mutate: doFollowUser } = useFollowUser()
  const { mutate: doUnFollowUser } = useUnFollowUser()

  const handleFollow = () => {
    user && doFollowUser(user.username)
  }

  const handleUnFollow = () => {
    user && doUnFollowUser(user.username)
  }

  if (user?.isFollowedByLoggedInUser) {
    return (
      <PillButton
        className="absolute right-3 top-3 !font-bold"
        text="Following"
        variant="white"
        onClick={handleUnFollow}
      />
    )
  } else {
    return (
      <PillButton
        className="absolute right-3 top-3 !font-bold"
        text="Follow"
        variant="white"
        onClick={handleFollow}
      />
    )
  }
}

export default FollowButton
