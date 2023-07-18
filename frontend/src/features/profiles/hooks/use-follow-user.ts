import { followUser, unFollowUser } from '@/lib/users'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useFollowUser = () => {
  const queryClient = useQueryClient()

  return useMutation(
    (followeeUsername: string) => followUser(followeeUsername),
    {
      onSuccess: (data, payload) => {
        queryClient.invalidateQueries(['user', payload])
      },
    }
  )
}

export const useUnFollowUser = () => {
  const queryClient = useQueryClient()

  return useMutation(
    (followeeUsername: string) => unFollowUser(followeeUsername),
    {
      onSuccess: (data, payload) => {
        queryClient.invalidateQueries(['user', payload])
      },
    }
  )
}
