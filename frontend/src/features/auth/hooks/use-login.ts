import { AuthInput } from '../types'
import { useMutation } from 'react-query'
import { login } from '@/lib/auth'

export const useLogin = () => {
  const mutation = useMutation((data: AuthInput) => login(data))

  return mutation
}
