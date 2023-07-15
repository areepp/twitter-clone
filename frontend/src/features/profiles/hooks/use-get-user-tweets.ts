import { getUserTweets } from '@/lib/users'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

export const useGetUserTweets = (username: string) => {
  return useInfiniteQuery(
    ['tweets', username],
    ({ pageParam = undefined }) =>
      getUserTweets({ username, cursor: pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage.next_cursor,
      getPreviousPageParam: (firstPage) => firstPage.next_cursor,
    }
  )
}
