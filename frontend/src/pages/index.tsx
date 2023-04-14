import { MainLayout } from '@/components/layouts/main-layout'
import {
  LoginBanner,
  useGetLoggedInUser,
  useGetUserQueryData,
} from '@/features/auth'
import { EditUserNameModal } from '@/features/profiles'
import { NewTweetDialogue, Tweets } from '@/features/tweets'

const Home = () => {
  const loggedInUser = useGetUserQueryData()

  return (
    <>
      <MainLayout>
        <div className="flex items-center justify-between border-b p-3 text-xl font-bold">
          <h1>Home</h1>
          {loggedInUser && <EditUserNameModal />}
        </div>
        {loggedInUser && <NewTweetDialogue />}
        <Tweets />
      </MainLayout>
      {!loggedInUser && <LoginBanner />}
    </>
  )
}

export default Home
