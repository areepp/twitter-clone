import Image from 'next/image'
import {
  ArrowPathRoundedSquareIcon,
  ArrowUpTrayIcon,
  ChatBubbleOvalLeftIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'
import { ITweet } from '../types'

export const Tweet = ({ data }: { data: ITweet }) => {
  return (
    <div className="flex w-full gap-3 border-b p-3">
      <div>
        <Image
          src={data.userImg}
          width="48"
          height="48"
          className="rounded-full"
          alt="profile photo"
        />
      </div>
      <div className="w-full">
        <div className="flex items-center gap-1">
          <span>{data.userName}</span>
          <span className="text-dark-gray">@{data.userId}</span>
          <span className="h-[2px] w-[2px] rounded-full bg-dark-gray" />
          <span className="text-dark-gray">{data.timeStamp}</span>
        </div>
        <p>{data.text}</p>
        <div className="mt-2 flex gap-20">
          <ChatBubbleOvalLeftIcon className="h-5 w-5 text-dark-gray" />
          <ArrowPathRoundedSquareIcon className="h-5 w-5 text-dark-gray" />
          <HeartIcon className="h-5 w-5 text-dark-gray" />
          <ArrowUpTrayIcon className="h-5 w-5 text-dark-gray" />
        </div>
      </div>
    </div>
  )
}
