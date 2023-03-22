import axios from './axios'

export const getMyProfile = async () =>
  axios.get('http://localhost:8000/user/me')
