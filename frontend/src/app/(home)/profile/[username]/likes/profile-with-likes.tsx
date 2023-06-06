import { ProfileLayout, ProfileNav } from '@/features/profiles'

const ProfileWithLikes = () => {
  return (
    <>
      <ProfileLayout />
      <ProfileNav activeTab="likes" />
    </>
  )
}

export default ProfileWithLikes
