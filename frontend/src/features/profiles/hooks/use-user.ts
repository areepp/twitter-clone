import { getMyProfile } from '@/lib/user'
import { useQuery } from 'react-query'

export const useUser = () => {
  const query = useQuery('user', getMyProfile)

  return query
}
