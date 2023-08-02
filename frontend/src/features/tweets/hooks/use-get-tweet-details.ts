import { getTweetDetail, getTweets } from '@/lib/tweets'
import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { TweetWithRepliesResponse } from '../types'

type Options = {
  onSuccess?: (data: TweetWithRepliesResponse) => void
}

export const useGetTweetDetails = (id?: string | null, options?: Options) =>
  useQuery(['tweets', id], () => getTweetDetail(id as string), {
    enabled: !!id,
    ...options,
  })
