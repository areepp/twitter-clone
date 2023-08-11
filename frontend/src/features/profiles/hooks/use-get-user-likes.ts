import { getUserLikes } from '@/lib/users'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetUserLikedTweets = (username: string) => {
  return useInfiniteQuery(
    [username, 'likes'],
    ({ pageParam = undefined }) =>
      getUserLikes({ username, cursor: pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage.next_cursor,
      getPreviousPageParam: (firstPage) => firstPage.next_cursor,
      refetchOnMount: 'always',
    }
  )
}
