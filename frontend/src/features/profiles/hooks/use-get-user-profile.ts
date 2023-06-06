import { getUserProfile } from '@/lib/users'
import { useQuery } from '@tanstack/react-query'

interface Options {
  enabled?: boolean
}

export const useGetUserProfile = (username: string, options?: Options) =>
  useQuery(['user', username], () => getUserProfile(username), {
    retry: false,
    ...options,
  })
