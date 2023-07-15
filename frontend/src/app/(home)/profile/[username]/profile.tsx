'use client'

import { useParams } from 'next/navigation'
import {
  ProfileLayout,
  ProfileNav,
  useGetUserProfile,
  useGetUserTweets,
} from '@/features/profiles'
import { Tweets } from '@/features/tweets'

const Profile = () => {
  const { username: usernameQuery } = useParams()

  const { data: user } = useGetUserProfile(usernameQuery as string)
  const userTweetsQuery = useGetUserTweets(usernameQuery as string)

  const {
    data: userTweets,
    isInitialLoading: isLoadingTweets,
    isSuccess: tweetsFetched,
  } = useGetUserTweets(usernameQuery as string)

  return (
    <>
      <ProfileLayout />
      <ProfileNav activeTab="tweets" />
      <Tweets query={userTweetsQuery} />
    </>
  )
}

export default Profile
