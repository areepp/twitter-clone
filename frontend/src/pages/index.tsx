import { MainLayout } from '@/components/layouts/main-layout'
import { NewTweetDialogue, Tweets } from '@/features/tweets'
import { getMyProfile } from '@/lib/users'
import { useEffect } from 'react'

const Home = () => {
  const logUserProfile = async () => {
    try {
      const response = await getMyProfile()

      console.log(response.data)
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    logUserProfile()
  }, [])
  return (
    <MainLayout>
      <h1 className="border-b p-3 text-xl font-bold">Home</h1>
      <NewTweetDialogue />
      <Tweets />
    </MainLayout>
  )
}

export default Home
