import { MainLayout } from '@/components/layouts/main-layout'
import { useUser } from '@/features/profiles'
import { NewTweetDialogue, Tweets } from '@/features/tweets'

const Home = () => {
  const { data, isLoading } = useUser()

  if (isLoading) return <div>loading screen...</div>

  if (data) console.log(data)
  return (
    <MainLayout>
      <h1 className="border-b p-3 text-xl font-bold">Home</h1>
      <NewTweetDialogue />
      <Tweets />
    </MainLayout>
  )
}

export default Home
