import { logout } from '@/lib/auth'
import { useQuery, useQueryClient } from 'react-query'

export const useLogout = () => {
  const queryClient = useQueryClient()
  return useQuery({
    queryFn: logout,
    enabled: false,
    onSettled: () => queryClient.setQueryData('user', () => undefined),
  })
}
