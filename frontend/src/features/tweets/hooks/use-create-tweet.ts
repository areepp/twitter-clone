import { createTweet } from '@/lib/tweets'
import { useMutation } from 'react-query'

export const useCreateTweet = () => {
  const mutation = useMutation((data: { text?: string }) => createTweet(data))

  return mutation
}
