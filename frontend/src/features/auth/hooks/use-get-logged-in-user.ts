import { getMyProfile } from '@/lib/users'
import { useQuery } from '@tanstack/react-query'

export const useGetLoggedInUser = (enabled?: boolean) =>
  useQuery(['user', 'me'], getMyProfile, {
    retry: false,
    refetchOnWindowFocus: false,
    enabled,
  })
