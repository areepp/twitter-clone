import { ITweet } from '@/features/tweets/types'
import axios from './axios'

export const getAllTweets = async () => {
  try {
    const response = await axios.get<ITweet[]>('/tweets')

    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

export const createTweet = async (data: { text?: string }) =>
  axios.post('/tweets', data)
