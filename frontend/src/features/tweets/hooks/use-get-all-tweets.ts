import { getTweets } from '@/lib/tweets'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetInfiniteTweets = () =>
  useInfiniteQuery(
    ['tweets'],
    ({ pageParam = undefined }) => getTweets(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next_cursor,
      getPreviousPageParam: (firstPage) => firstPage.next_cursor,
    }
  )
