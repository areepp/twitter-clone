import LoginBanner from '@/components/Auth/LoginBanner'
import Dashboard from '@/components/Dashboard'
import RightPanel from '@/components/RightPanel'
import Sidebar from '@/components/Sidebar'
import axios from 'axios'
import { useEffect } from 'react'

const Home = () => {
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user/me', {
          withCredentials: true,
        })
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
    getUserProfile()
  }, [])
  return (
    <>
      <div className="container mx-auto flex h-screen xl:px-20">
        <Sidebar />
        <Dashboard />
        <RightPanel />
      </div>
      <LoginBanner />
    </>
  )
}

export default Home
