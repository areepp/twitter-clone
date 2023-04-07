import { getAllTweets } from '@/lib/tweets'
import { useQuery } from 'react-query'

export const useGetAllTweets = () => useQuery('tweets', getAllTweets)
