import { IUser } from '@/features/profiles'
import axios from './axios'

export const getMyProfile = async () => {
  try {
    const response = await axios.get<IUser>('/user/me')
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

export const checkUsernameAvailability = async (username: string) => {
  try {
    const response = await axios.get(`/user/check-availability/${username}`)
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

export const editUserProfile = async ({
  username,
  newUsername,
}: {
  username: string
  newUsername: string
}) => axios.patch(`/user/${username}`, { newUsername })
