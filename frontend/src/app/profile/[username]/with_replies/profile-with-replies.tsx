'use client'

import { MainLayout } from '@/components/layouts/main-layout'
import { ProfileLayout, ProfileNav } from '@/features/profiles'

const ProfileWithReplies = () => {
  return (
    <MainLayout>
      <ProfileLayout />
      <ProfileNav activeTab="replies" />
    </MainLayout>
  )
}

export default ProfileWithReplies
