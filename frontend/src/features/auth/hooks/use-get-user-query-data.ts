import { IUser } from '@/features/profiles'
import { useQueryClient } from '@tanstack/react-query'

export const useGetUserQueryData = (): IUser | undefined => {
  const queryClient = useQueryClient()
  return queryClient.getQueryData(['user', 'me'])
}
