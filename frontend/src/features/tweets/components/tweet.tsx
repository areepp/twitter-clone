import Image from 'next/image'
import {
  ArrowPathRoundedSquareIcon,
  ArrowUpTrayIcon,
  ChatBubbleOvalLeftIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'
import { ITweet } from '../types'
import { formatIsoString } from '../utils/format-iso-string'

export const Tweet = ({ data }: { data: ITweet }) => {
  const { author } = data
  return (
    <div className="flex w-full gap-3 border-b p-3">
      <div className="relative h-12 w-12">
        <Image
          src={author.profilePictureUrl}
          className="h-full w-full rounded-full object-cover"
          alt="profile photo"
          fill
        />
      </div>
      <div className="flex-grow">
        <div className="flex items-center gap-1">
          <span className="font-semibold">{author.displayName}</span>
          <span className="text-dark-gray">@{author.username}</span>
          <span className="h-[2px] w-[2px] rounded-full bg-dark-gray" />
          <span className="text-dark-gray">
            {formatIsoString(data.createdAt)}
          </span>
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
