import { unLikeTweet } from '@/lib/tweets'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUnLikeTweet = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation((id: string) => unLikeTweet(id), {
    onSuccess: () => {
      queryClient.refetchQueries(['tweets'])
      queryClient.refetchQueries(['user', 'me'])
    },
  })

  return mutation
}
