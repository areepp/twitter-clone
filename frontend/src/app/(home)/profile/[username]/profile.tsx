'use client'

import { useParams } from 'next/navigation'
import {
  ProfileLayout,
  ProfileNav,
  useGetUserProfile,
  useGetUserTweets,
} from '@/features/profiles'
import { Tweet } from '@/features/tweets'

const Profile = () => {
  const { username: usernameQuery } = useParams()

  const { data: user } = useGetUserProfile(usernameQuery as string)

  const {
    data: userTweets,
    isInitialLoading: isLoadingTweets,
    isSuccess: tweetsFetched,
  } = useGetUserTweets(usernameQuery as string)

  return (
    <>
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
    </>
  )
}

export default Profile
