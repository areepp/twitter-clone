import { AuthInput } from '../types'
import { useMutation } from '@tanstack/react-query'
import { login } from '@/lib/auth'

export const useLogin = () => {
  const mutation = useMutation((data: AuthInput) => login(data))

  return mutation
}
