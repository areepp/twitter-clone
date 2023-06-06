import { ProfileLayout, ProfileNav } from '@/features/profiles'

const ProfileWithReplies = () => {
  return (
    <>
      <ProfileLayout />
      <ProfileNav activeTab="replies" />
    </>
  )
}

export default ProfileWithReplies
