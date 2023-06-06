import { getAllTweets } from '@/lib/tweets'
import { useQuery } from '@tanstack/react-query'

export const useGetAllTweets = () => useQuery(['tweets'], getAllTweets)
