'use client'

import { MainLayout } from '@/components/layouts/main-layout'
import { ProfileLayout, ProfileNav } from '@/features/profiles'

const ProfileWithMedia = () => {
  return (
    <MainLayout>
      <ProfileLayout />
      <ProfileNav activeTab="media" />
    </MainLayout>
  )
}

export default ProfileWithMedia
