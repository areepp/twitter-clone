import { checkUsernameAvailability } from '@/lib/users'
import { useQuery } from '@tanstack/react-query'

export const useCheckUsernameAvailability = (username: string) =>
  useQuery({
    queryFn: () => checkUsernameAvailability(username),
    enabled: false,
    retry: false,
  })
