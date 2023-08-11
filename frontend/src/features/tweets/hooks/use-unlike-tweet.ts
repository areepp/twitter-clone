import { unLikeTweet } from '@/lib/tweets'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUnLikeTweet = (queryKeyToInvalidate: Array<string>) => {
  const queryClient = useQueryClient()
  const mutation = useMutation((id: string) => unLikeTweet(id), {
    onSuccess: () => {
      queryClient.refetchQueries(queryKeyToInvalidate)
    },
  })

  return mutation
}
