import { AuthInput } from '@/features/auth'
import axios from './axios'

export const login = async (data: AuthInput) => axios.post('/auth/login', data)

export const signup = async (data: AuthInput) =>
  axios.post('/auth/signup', data)

export const logout = async () => axios.get('/auth/logout')
