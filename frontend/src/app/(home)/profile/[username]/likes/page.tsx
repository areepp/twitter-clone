'use client'

import {
  ProfileLayout,
  ProfileNav,
  useGetUserLikedTweets,
} from '@/features/profiles'
import { Tweets } from '@/features/tweets'
import { useParams } from 'next/navigation'

const ProfileWithLikesPage = () => {
  const { username: usernameQuery } = useParams()

  const userLikedTweetsQuery = useGetUserLikedTweets(usernameQuery)

  return (
    <>
      <ProfileLayout />
      <ProfileNav activeTab="likes" />
      <Tweets
        query={userLikedTweetsQuery}
        queryKeyToInvalidate={[usernameQuery, 'likes']}
      />
    </>
  )
}

export default ProfileWithLikesPage
