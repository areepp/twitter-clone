'use client'

import { useGetAllTweets } from '../hooks/use-get-all-tweets'
import { Tweet } from './tweet'

export const Tweets = () => {
  const { data, isLoading } = useGetAllTweets()

  if (isLoading) return <div>loading...</div>

  return (
    <div className="w-full">
      {data?.map((tweet) => (
        <Tweet key={tweet.id} data={tweet} />
      ))}
    </div>
  )
}
