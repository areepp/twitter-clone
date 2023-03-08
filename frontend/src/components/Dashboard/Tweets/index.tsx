import { ITweet } from '@/types/ITweet'
import Tweet from './Tweet'

const TWEETS_DATA: ITweet[] = [
  {
    id: 1,
    text: 'Hello world!',
    timeStamp: 'Feb 17',
    userId: 'johnDoe',
    userName: 'John Doe',
    userImg:
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
  },
  {
    id: 2,
    text: 'Hello darkness my old friend',
    timeStamp: 'Feb 17',
    userId: 'boboliver',
    userName: 'Bob Oliver',
    userImg:
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
  },
]

const Tweets = () => (
  <div className="w-full">
    {TWEETS_DATA.map((data) => (
      <Tweet key={data.id} data={data} />
    ))}
  </div>
)

export default Tweets
