import { ITweet, TweetResponse } from '@/features/tweets/types'
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

export const likeTweet = async (id: number) => axios.patch(`/tweets/${id}/like`)

export const unLikeTweet = async (id: number) =>
  axios.delete(`/tweets/liked-tweets/${id}`)
