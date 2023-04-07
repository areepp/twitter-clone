import { createTweet } from '@/lib/tweets'
import { useMutation, useQueryClient } from 'react-query'

export const useCreateTweet = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation((data: { text?: string }) => createTweet(data), {
    onSettled: () => queryClient.invalidateQueries('tweets'),
  })

  return mutation
}
