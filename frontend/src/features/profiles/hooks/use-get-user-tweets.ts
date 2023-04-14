import { getUserTweets } from '@/lib/users'
import { useQuery } from 'react-query'

interface Options {
  enabled?: boolean
}

export const useGetUserTweets = (username: string, options?: Options) => {
  return useQuery(['tweets', username], () => getUserTweets(username), {
    retry: false,
    ...options,
  })
}
