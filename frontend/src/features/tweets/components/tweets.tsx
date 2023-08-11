'use client'

import { useEffect } from 'react'
import { useGetInfiniteTweets } from '../hooks/use-get-all-tweets'
import { Tweet } from './tweet'
import { useInView } from 'react-intersection-observer'
import { ITweet, TweetResponse } from '../types'
import { UseInfiniteQueryResult } from '@tanstack/react-query'

export const Tweets = ({
  query,
  queryKeyToInvalidate,
}: {
  query: UseInfiniteQueryResult<TweetResponse, unknown>
  queryKeyToInvalidate: Array<string>
}) => {
  const [ref, inView] = useInView({
    delay: 500,
    rootMargin: '800px',
  })

  useEffect(() => {
    if (inView) {
      query.fetchNextPage()
    }
  }, [inView])

  if (query.isLoading) return <div>loading...</div>

  return (
    <div className="mb-20 w-full">
      {query.data?.pages.map((page) => (
        <div key={page.next_cursor ?? 1}>
          {page.data.map((tweet) => (
            <Tweet
              key={tweet.id}
              data={tweet}
              queryKeyToInvalidate={queryKeyToInvalidate}
            />
          ))}
        </div>
      ))}
      <div
        ref={ref}
        className={`${!query.hasNextPage || !query.data ? 'hidden' : 'block'}`}
      ></div>
      {query.isFetchingNextPage ? 'Loading more...' : ''}
    </div>
  )
}
