import { IUser } from '@/features/profiles'
import axios from './axios'

export const getMyProfile = async () => {
  try {
    const response = await axios.get<IUser>('http://localhost:8000/user/me')
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}
