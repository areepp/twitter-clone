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
import IconWithNumber from './icon-with-number'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'

type Props = {
  data: ITweet
  className?: string
}

export const Tweet = ({ data, className }: Props) => {
  const { push } = useRouter()
  const { data: loggedInUser } = useGetLoggedInUser()
  const { author } = data
  const { mutate: likeTweetMutation } = useLikeTweet()
  const { mutate: unlikeTweetMutation } = useUnLikeTweet()

  const likeTweet = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (!loggedInUser) {
      alert('join twitter to perform this action')
      return
    }
    likeTweetMutation(data.id)
  }

  const unlikeTweet = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (!loggedInUser) {
      alert('join twitter to perform this action')
      return
    }
    unlikeTweetMutation(data.id)
  }

  const handleTweetClick = () => {
    push(`/profile/${author.username}/status/${data.id}`)
  }

  return (
    <div
      className={clsx(
        'flex w-full cursor-pointer gap-3 border-b p-3',
        className
      )}
      onClick={handleTweetClick}
    >
      <Link
        href={`/profile/${author.username}`}
        onClick={(e) => e.stopPropagation()}
        className="relative h-10 w-10"
      >
        <Image
          src={author.profilePictureUrl ?? '/twitter-default-pp.png'}
          className="h-full w-full rounded-full object-cover"
          alt="profile photo"
          fill
        />
      </Link>
      <div className="flex-grow">
        <div className="flex items-center gap-1">
          <Link
            href={`/profile/${author.username}`}
            onClick={(e) => e.stopPropagation()}
            className="font-semibold"
          >
            {author.displayName}
          </Link>
          <Link
            href={`/profile/${author.username}`}
            onClick={(e) => e.stopPropagation()}
            className="text-dark-gray"
          >
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
          <IconWithNumber
            icon={<ChatBubbleOvalLeftIcon className="h-5 w-5" />}
            count={data._count.replies}
          />
          <IconWithNumber
            icon={<ArrowPathRoundedSquareIcon className="h-5 w-5" />}
            count={0}
          />
          <IconWithNumber
            icon={
              data.isLiked ? (
                <HeartIconSolid
                  className="h-5 w-5 cursor-pointer text-pink-600"
                  onClick={unlikeTweet}
                />
              ) : (
                <HeartIcon
                  className="h-5 w-5 cursor-pointer"
                  onClick={likeTweet}
                />
              )
            }
            count={data._count.likes}
          />
          <ArrowUpTrayIcon className="h-5 w-5" />
        </div>
      </div>
    </div>
  )
}
