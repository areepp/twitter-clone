import { unLikeTweet } from '@/lib/tweets'
import { useMutation, useQueryClient } from 'react-query'

export const useUnLikeTweet = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation((id: number) => unLikeTweet(id), {
    onSuccess: () => {
      queryClient.refetchQueries('tweets')
      queryClient.refetchQueries('user')
    },
  })

  return mutation
}
