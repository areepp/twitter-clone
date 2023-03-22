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
      <main className="ml-[65px] max-w-[600px] grow border-r xl:ml-[250px]">
        <h1 className="border-b p-3 text-xl font-bold">Home</h1>
        <NewTweetDialogue />
        <Tweets />
      </main>
    </MainLayout>
  )
}

export default Home
