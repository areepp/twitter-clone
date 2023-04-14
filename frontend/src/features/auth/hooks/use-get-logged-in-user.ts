import { getMyProfile } from '@/lib/users'
import { useQuery, UseQueryOptions } from 'react-query'

export const useGetLoggedInUser = (enabled?: boolean) =>
  useQuery(['user', 'me'], getMyProfile, {
    retry: false,
    refetchOnWindowFocus: false,
    enabled,
  })
