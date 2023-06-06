import { logout } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export const useLogout = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useQuery({
    queryFn: logout,
    enabled: false,
    onSettled: () => {
      queryClient.setQueryData(['user', 'me'], () => undefined)
      router.push('/')
    },
  })
}
