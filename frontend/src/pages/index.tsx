import { MainLayout } from '@/components/layouts/main-layout'
import { LoginBanner, useGetLoggedInUser } from '@/features/auth'
import { EditUserNameModal } from '@/features/profiles'
import { NewTweetDialogue, Tweets } from '@/features/tweets'

const Home = () => {
  const { isLoading, data } = useGetLoggedInUser()

  if (isLoading) return <div>loading screen...</div>

  return (
    <>
      <MainLayout>
        <div className="flex items-center justify-between border-b p-3 text-xl font-bold">
          <h1>Home</h1>
          {data && <EditUserNameModal />}
        </div>
        {data && <NewTweetDialogue />}
        <Tweets />
      </MainLayout>
      {!data && <LoginBanner />}
    </>
  )
}

export default Home
