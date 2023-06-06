import { editUserProfile } from '@/lib/users'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface EditProfileProps {
  username: string
  newUsername?: string
  displayName?: string
  bio?: string
  profilePictureFile?: any
}

export const useEditProfile = () => {
  const queryClient = useQueryClient()

  return useMutation((data: EditProfileProps) => editUserProfile(data), {
    onSuccess: () => queryClient.invalidateQueries(['user', 'me']),
  })
}
