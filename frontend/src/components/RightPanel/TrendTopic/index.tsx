import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'

export interface ITrend {
  topic: string
  tweetsNumber: number
}

const TrendTopic = ({ data }: { data: ITrend }) => (
  <div className="flex justify-between">
    <div className="flex flex-col">
      <span className="text-sm text-dark-gray">Trending Worldwide</span>
      <span className="font-bold">{data.topic}</span>
      <span className="text-sm text-dark-gray">
        {data.tweetsNumber}K Tweets
      </span>
    </div>
    <EllipsisHorizontalIcon className="h-5 w-5 text-dark-gray" />
  </div>
)

export default TrendTopic
