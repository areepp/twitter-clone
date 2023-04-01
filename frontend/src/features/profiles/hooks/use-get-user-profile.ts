import { getUserProfile } from '@/lib/user'
import { useQuery } from 'react-query'

interface Options {
  enabled?: boolean
}

export const useGetUserProfile = (username: string, options?: Options) =>
  useQuery(['user', username], () => getUserProfile(username), {
    retry: false,
    ...options,
  })
