import { EditUserNameModal } from '@/features/profiles'
import { NewTweetDialogue, Tweets } from '@/features/tweets'

const Home = () => {
  return (
    <>
      <div className="flex items-center justify-between border-b p-3 text-xl font-bold">
        <h1>Home</h1>
        <EditUserNameModal />
      </div>
      <NewTweetDialogue />
      <Tweets />
    </>
  )
}

export default Home
