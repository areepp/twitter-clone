'use client'

import { EditUserNameModal } from '@/features/profiles'
import { NewTweetDialogue, Tweets } from '@/features/tweets'
import { useGetInfiniteTweets } from '@/features/tweets/hooks/use-get-all-tweets'

const Home = () => {
  const tweetsQuery = useGetInfiniteTweets()

  return (
    <>
      <div className="flex items-center justify-between border-b p-3 text-xl font-bold">
        <h1>Home</h1>
        <EditUserNameModal />
      </div>
      <NewTweetDialogue />
      <Tweets query={tweetsQuery} />
    </>
  )
}

export default Home
