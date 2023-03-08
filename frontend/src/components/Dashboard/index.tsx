import NewTweetDialogue from './NewTweetDialogue'
import Tweets from './Tweets/index'

const Dashboard = () => (
  <main className="ml-[65px] max-w-[600px] grow border-r xl:ml-[250px]">
    <h1 className="border-b p-3 text-xl font-bold">Home</h1>
    <NewTweetDialogue />
    <Tweets />
  </main>
)
export default Dashboard
