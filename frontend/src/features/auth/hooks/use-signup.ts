import axios from '@/lib/axios'
import { AuthInput } from '../types'
import { useMutation } from '@tanstack/react-query'
import { signup } from '@/lib/auth'

export const useSignup = () => {
  const mutation = useMutation((data: AuthInput) => signup(data))

  return mutation
}
