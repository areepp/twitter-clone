import {
  ITweet,
  TweetResponse,
  TweetWithRepliesResponse,
} from '@/features/tweets/types'
import axios, { axiosMultiPart } from './axios'

export const getTweets = async (cursor?: number) => {
  try {
    const response = await axios.get<TweetResponse>('/tweets', {
      params: {
        cursor,
      },
    })

    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

export const getTweetDetail = async (id: string) => {
  try {
    const response = await axios.get<Pick<TweetWithRepliesResponse, 'data'>>(
      `/tweets/${id}`
    )
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

export const getTweetReplies = async ({
  id,
  cursor,
}: {
  id: string
  cursor: string
}): Promise<TweetResponse> => {
  try {
    const response = await axios.get<TweetWithRepliesResponse>(
      `/tweets/${id}`,
      {
        params: {
          cursor,
        },
      }
    )
    return {
      data: response.data.data.replies,
      next_cursor: response.data.next_cursor,
    }
  } catch (error) {
    throw new Error(error)
  }
}

export type CreateTweetProps = {
  text: string
  media_attachments?: Array<{ file: File }>
}

export const createTweet = async (data: CreateTweetProps) => {
  const formData = new FormData()

  formData.append('text', data.text)

  if (data.media_attachments) {
    for (let i = 0; i < data.media_attachments?.length; i++) {
      formData.append('media_attachments', data.media_attachments[i].file)
    }
  }
  return axiosMultiPart.post('/tweets', formData)
}

export type CreateTweetReplyProps = CreateTweetProps & {
  tweetId: string
  in_reply_to_reply_id?: string
}

export const createTweetReply = async (data: CreateTweetReplyProps) => {
  const formData = new FormData()

  formData.append('text', data.text)

  if (data.media_attachments) {
    for (let i = 0; i < data.media_attachments?.length; i++) {
      formData.append('media_attachments', data.media_attachments[i].file)
    }
  }
  return axiosMultiPart.post(`/tweets/${data.tweetId}/reply`, formData, {
    params: {
      in_reply_to_reply_id: data.in_reply_to_reply_id,
    },
  })
}

export const likeTweet = async (id: string) => axios.patch(`/tweets/${id}/like`)

export const unLikeTweet = async (id: string) =>
  axios.delete(`/tweets/liked-tweets/${id}`)
