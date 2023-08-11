'use client'

import { useParams } from 'next/navigation'
import {
  ProfileLayout,
  ProfileNav,
  useGetUserTweets,
} from '@/features/profiles'
import { Tweets } from '@/features/tweets'

const Profile = () => {
  const { username: usernameQuery } = useParams()

  const userTweetsQuery = useGetUserTweets(usernameQuery)

  return (
    <>
      <ProfileLayout />
      <ProfileNav activeTab="tweets" />
      <Tweets
        query={userTweetsQuery}
        queryKeyToInvalidate={[usernameQuery, 'tweets']}
      />
    </>
  )
}

export default Profile
