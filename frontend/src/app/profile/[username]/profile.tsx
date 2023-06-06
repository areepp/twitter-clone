'use client'

import { MainLayout } from '@/components/layouts/main-layout'
import { useGetLoggedInUser } from '@/features/auth'
import { useRouter } from 'next/router'
import {
  ProfileLayout,
  ProfileNav,
  useGetUserProfile,
  useGetUserTweets,
} from '@/features/profiles'
import { Tweet } from '@/features/tweets'

const Profile = () => {
  const { query, isReady } = useRouter()
  const { username: usernameQuery } = query

  const { data: user, isLoading } = useGetUserProfile(usernameQuery as string, {
    enabled: isReady,
  })

  const {
    data: userTweets,
    isLoading: isLoadingTweets,
    isSuccess: tweetsFetched,
  } = useGetUserTweets(usernameQuery as string, { enabled: isReady })

  return (
    <MainLayout>
      <ProfileLayout />
      <ProfileNav activeTab="tweets" />
      {tweetsFetched &&
        userTweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            data={{
              ...tweet,
              author: {
                profilePictureUrl: user.profilePictureUrl,
                displayName: user.displayName,
                username: user.username,
              },
            }}
          />
        ))}
    </MainLayout>
  )
}

export default Profile
