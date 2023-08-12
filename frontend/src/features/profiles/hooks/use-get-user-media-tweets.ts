import { getUserMediaTweets } from '@/lib/users'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetUserMediaTweets = (username: string) => {
  return useInfiniteQuery(
    [username, 'media'],
    ({ pageParam = undefined }) =>
      getUserMediaTweets({ username, cursor: pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage.next_cursor,
      getPreviousPageParam: (firstPage) => firstPage.next_cursor,
      refetchOnMount: 'always',
    }
  )
}
