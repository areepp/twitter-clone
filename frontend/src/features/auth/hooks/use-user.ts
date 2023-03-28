import { getMyProfile } from '@/lib/user'
import { useQuery, UseQueryOptions } from 'react-query'

export const useUser = (enabled?: boolean) =>
  useQuery('user', getMyProfile, {
    retry: false,
    refetchOnWindowFocus: false,
    enabled,
  })
