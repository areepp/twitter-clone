import { z } from 'zod'
import axios from '../axiosInstance'

export const Inputs = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email({
    message: 'Must be a valid email',
  }),
  password: z
    .string()
    .min(6, { message: 'Password must be atleast 6 characters' }),
})

export type Inputs = z.infer<typeof Inputs>

export const signup = async (body: Inputs) =>
  axios.post('/auth/signup', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  })

export const login = async (body: Inputs) =>
  axios.post('/auth/login', body, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  })
