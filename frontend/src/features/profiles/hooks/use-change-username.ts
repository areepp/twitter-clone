import { editUserProfile } from '@/lib/user'
import { useMutation, useQueryClient } from 'react-query'

export const useChangeUsername = () => {
  const queryClient = useQueryClient()

  return useMutation(
    (data: { username: string; newUsername: string }) => editUserProfile(data),
    { onSuccess: () => queryClient.invalidateQueries('user') }
  )
}
