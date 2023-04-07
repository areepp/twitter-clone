import axios from './axios'

export const createTweet = async (data: { text?: string }) =>
  axios.post('/tweets', data)
