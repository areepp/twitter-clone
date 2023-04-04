import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
})

export const axiosMultiPart = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'multipart/form-data' },
  withCredentials: true,
})

export default axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})
