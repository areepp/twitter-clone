import { editUserProfile } from '@/lib/user'
import { useMutation, useQueryClient } from 'react-query'

interface EditProfileProps {
  username: string
  newUsername?: string
  displayName?: string
  bio?: string
}

export const useEditProfile = () => {
  const queryClient = useQueryClient()

  return useMutation((data: EditProfileProps) => editUserProfile(data), {
    onSuccess: () => queryClient.invalidateQueries('user'),
  })
}
