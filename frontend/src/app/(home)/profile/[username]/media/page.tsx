'use client'

import {
  ProfileLayout,
  ProfileNav,
  useGetUserMediaTweets,
} from '@/features/profiles'
import { Tweets } from '@/features/tweets'
import { useParams } from 'next/navigation'

const ProfileWithMediaPage = () => {
  const { username: usernameQuery } = useParams()

  const userMediaTweetsQuery = useGetUserMediaTweets(usernameQuery)

  return (
    <>
      <ProfileLayout />
      <ProfileNav activeTab="media" />
      <Tweets
        query={userMediaTweetsQuery}
        queryKeyToInvalidate={[usernameQuery, 'media']}
      />
    </>
  )
}

export default ProfileWithMediaPage
