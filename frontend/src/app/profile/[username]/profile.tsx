'use client'

import { MainLayout } from '@/components/layouts/main-layout'
import { useRouter, useParams } from 'next/navigation'
import {
  ProfileLayout,
  ProfileNav,
  useGetUserProfile,
  useGetUserTweets,
} from '@/features/profiles'
import { Tweet } from '@/features/tweets'

const Profile = () => {
  const { username: usernameQuery } = useParams()

  const { data: user, isLoading } = useGetUserProfile(usernameQuery as string)

  const {
    data: userTweets,
    isLoading: isLoadingTweets,
    isSuccess: tweetsFetched,
  } = useGetUserTweets(usernameQuery as string)

  return (
    <MainLayout>
      <ProfileLayout />
      <ProfileNav activeTab="tweets" />
      {tweetsFetched &&
        user &&
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
