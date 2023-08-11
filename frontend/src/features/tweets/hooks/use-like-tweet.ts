import { likeTweet } from '@/lib/tweets'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useLikeTweet = (queryKeyToInvalidate: Array<string>) => {
  const queryClient = useQueryClient()
  const mutation = useMutation((id: string) => likeTweet(id), {
    onSuccess: () => {
      queryClient.refetchQueries(queryKeyToInvalidate)
    },
  })

  return mutation
}
