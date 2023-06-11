import { likeTweet } from '@/lib/tweets'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useLikeTweet = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation((id: number) => likeTweet(id), {
    onSuccess: () => {
      queryClient.refetchQueries(['tweets'])
      queryClient.refetchQueries(['user', 'me'])
    },
  })

  return mutation
}
