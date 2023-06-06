'use client'

import { MainLayout } from '@/components/layouts/main-layout'
import { ProfileLayout, ProfileNav } from '@/features/profiles'

const ProfileWithLikes = () => {
  return (
    <MainLayout>
      <ProfileLayout />
      <ProfileNav activeTab="likes" />
    </MainLayout>
  )
}

export default ProfileWithLikes
