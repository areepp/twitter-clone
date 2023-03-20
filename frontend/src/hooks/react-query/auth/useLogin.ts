import axios from '@/lib/axios'
import { AuthInput } from '@/types/AuthInput'
import { useMutation } from 'react-query'

export default () => {
  const mutation = useMutation((data: AuthInput) =>
    axios.post('/auth/login', data, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
  )

  return mutation
}
