import { MainLayout } from '@/components/layouts/main-layout'
import { LoginBanner, useUser } from '@/features/auth'
import { NewTweetDialogue, Tweets } from '@/features/tweets'

const Home = () => {
  const { isLoading, isError, isSuccess } = useUser()

  if (isLoading) return <div>loading screen...</div>

  return (
    <>
      <MainLayout>
        <h1 className="border-b p-3 text-xl font-bold">Home</h1>
        {isSuccess && <NewTweetDialogue />}
        <Tweets />
      </MainLayout>
      {isError && <LoginBanner />}
    </>
  )
}

export default Home
