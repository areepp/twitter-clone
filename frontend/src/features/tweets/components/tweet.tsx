import Image from 'next/image'
import {
  ArrowPathRoundedSquareIcon,
  ArrowUpTrayIcon,
  ChatBubbleOvalLeftIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { ITweet } from '../types'
import { formatIsoString } from '../utils/format-iso-string'
import { useLikeTweet } from '../hooks/use-like-tweet'
import { useGetLoggedInUser } from '@/features/auth'
import { useUnLikeTweet } from '../hooks/use-unlike-tweet'
import Link from 'next/link'
import MediaAttachments from './media-attachments'

export const Tweet = ({ data }: { data: ITweet }) => {
  const { data: loggedInUser } = useGetLoggedInUser()
  const { author } = data
  const { mutate: likeTweetMutation } = useLikeTweet()
  const { mutate: unlikeTweetMutation } = useUnLikeTweet()

  const likeTweet = () => {
    if (!loggedInUser) {
      alert('join twitter to perform this action')
      return
    }
    likeTweetMutation(data.id)
  }

  const unlikeTweet = () => {
    if (!loggedInUser) {
      alert('join twitter to perform this action')
      return
    }
    unlikeTweetMutation(
      loggedInUser.likedTweets.filter((el) => el.tweet.id === data.id)[0].id
    )
  }

  return (
    <div className="flex w-full cursor-pointer gap-3 border-b p-3">
      <Link href={`/profile/${author.username}`} className="relative h-12 w-12">
        <Image
          src={author.profilePictureUrl ?? '/twitter-default-pp.png'}
          className="h-full w-full rounded-full object-cover"
          alt="profile photo"
          fill
        />
      </Link>
      <div className="flex-grow">
        <div className="flex items-center gap-1">
          <Link href={`/profile/${author.username}`} className="font-semibold">
            {author.displayName}
          </Link>
          <Link href={`/profile/${author.username}`} className="text-dark-gray">
            @{author.username}
          </Link>
          <span className="h-[2px] w-[2px] rounded-full bg-dark-gray" />
          <span className="text-dark-gray">
            {formatIsoString(data.createdAt)}
          </span>
        </div>
        <p>{data.text}</p>
        {data.mediaAttachments?.length > 0 && (
          <MediaAttachments
            className="mt-2"
            attachments={data.mediaAttachments}
          />
        )}

        <div className="mt-3 flex gap-20 text-dark-gray">
          <ChatBubbleOvalLeftIcon className="h-5 w-5 " />
          <ArrowPathRoundedSquareIcon className="h-5 w-5" />
          <div className="flex items-center gap-2">
            {loggedInUser?.likedTweets.find(
              (list) => list.tweet.id === data.id
            ) ? (
              <HeartIconSolid
                className="h-5 w-5 cursor-pointer text-pink-600"
                onClick={unlikeTweet}
              />
            ) : (
              <HeartIcon
                className="h-5 w-5 cursor-pointer"
                onClick={likeTweet}
              />
            )}
            <span className="text-sm">
              {data.likes.length === 0 ? '' : data.likes.length}
            </span>
          </div>
          <ArrowUpTrayIcon className="h-5 w-5" />
        </div>
      </div>
    </div>
  )
}
