import {
  CreateTweetProps,
  CreateTweetReplyProps,
  createTweet,
  createTweetReply,
} from '@/lib/tweets'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateTweet = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation((data: CreateTweetProps) => createTweet(data), {
    onSettled: () => queryClient.invalidateQueries(['tweets']),
  })

  return mutation
}

export const useCreateTweetReply = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation(
    (data: CreateTweetReplyProps) => createTweetReply(data),
    {
      onSettled: (_data, _error, payload) =>
        queryClient.invalidateQueries([
          'tweets',
          `${payload.in_reply_to_reply_id ?? payload.tweetId}`,
          'replies',
        ]),
    }
  )

  return mutation
}
