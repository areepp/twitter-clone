import LoginBanner from '@/components/auth/LoginBanner'
import Dashboard from '@/components/dashboard'
import RightPanel from '@/components/rightPanel'
import Sidebar from '@/components/sidebar'
import axios from 'axios'
import { useEffect } from 'react'

const Home = () => {
  const getUserProfile = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user/me', {
        withCredentials: true,
      })

      console.log(response.data)
    } catch (error) {
      console.log(error.response)
    }
  }

  const logOut = async () => {
    const response = await axios.get('http://localhost:8000/auth/logout', {
      withCredentials: true,
    })

    console.log(response)
  }

  useEffect(() => {
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
      <button onClick={getUserProfile} className="fixed inset-0 h-4 w-4">
        getUser
      </button>
      <button onClick={logOut} className="fixed top-4 left-0 h-7 w-7">
        log out
      </button>
    </>
  )
}

export default Home
