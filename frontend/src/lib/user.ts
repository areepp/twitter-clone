import { IUser } from '@/features/profiles'
import axios from './axios'

export const getMyProfile = async (): Promise<IUser> => {
  try {
    const response = await axios.get<IUser>('http://localhost:8000/user/me')
    return response.data
  } catch (error) {
    return error.response.data
  }
}
