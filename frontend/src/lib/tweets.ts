import { ITweet } from '@/features/tweets/types'
import axios from './axios'

export const getTweets = async (cursor?: number) => {
  try {
    const response = await axios.get<{ data: ITweet[]; next_cursor: number }>(
      '/tweets',
      {
        params: {
          cursor,
        },
      }
    )

    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

export const createTweet = async (data: { text?: string }) =>
  axios.post('/tweets', data)

export const likeTweet = async (id: number) => axios.patch(`/tweets/${id}/like`)

export const unLikeTweet = async (id: number) =>
  axios.delete(`/tweets/liked-tweets/${id}`)
