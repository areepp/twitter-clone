import { getTweetDetail, getTweets } from '@/lib/tweets'
import { useQuery } from '@tanstack/react-query'

export const useGetTweetDetails = (id: string) =>
  useQuery(['tweets', id], () => getTweetDetail(id))
