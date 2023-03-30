import { checkUsernameAvailability } from '@/lib/user'
import { useQuery } from 'react-query'

export const useCheckUsernameAvailability = (username: string) =>
  useQuery({
    queryFn: () => checkUsernameAvailability(username),
    enabled: false,
    retry: false,
  })
