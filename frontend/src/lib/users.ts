import { IUser } from '@/features/profiles'
import axios, { axiosMultiPart } from './axios'

export const getUserProfile = async (username: string) => {
  try {
    const response = await axios.get<IUser>(`/users/${username}`)
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

export const getMyProfile = async () => {
  try {
    const response = await axios.get<IUser>('/users/me')
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

export const checkUsernameAvailability = async (username: string) => {
  try {
    const response = await axios.get(`/users/check-availability/${username}`)
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

export const editUserProfile = async ({
  username,
  newUsername,
  displayName,
  bio,
  profilePictureFile,
}: {
  username: string
  newUsername?: string
  displayName?: string
  bio?: string
  profilePictureFile?: any
}) =>
  axiosMultiPart.patch(`/users/${username}`, {
    username: newUsername,
    displayName,
    bio,
    profilePictureFile,
  })
