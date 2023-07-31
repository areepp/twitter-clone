import { getTweetReplies } from '@/lib/tweets'
import { getUserTweets } from '@/lib/users'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

export const useGetInfiniteReplies = (id: string) => {
  return useInfiniteQuery(
    ['tweets', id, 'replies'],
    ({ pageParam = undefined }) => getTweetReplies({ id, cursor: pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage.next_cursor,
      getPreviousPageParam: (firstPage) => firstPage.next_cursor,
    }
  )
}
