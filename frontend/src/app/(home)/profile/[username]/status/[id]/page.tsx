'use client'

import { Spinner } from '@/components/elements'
import { useGetLoggedInUser } from '@/features/auth'
import { Tweets } from '@/features/tweets'
import MediaAttachments from '@/features/tweets/components/media-attachments'
import TweetYourReply from '@/features/tweets/components/tweet-your-reply'
import { useGetInfiniteReplies } from '@/features/tweets/hooks/use-get-infinite-replies'
import { useGetTweetDetails } from '@/features/tweets/hooks/use-get-tweet-details'
import {
  ArrowLeftIcon,
  ArrowPathRoundedSquareIcon,
  ArrowUpTrayIcon,
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'

const TweetDetailPage = () => {
  const { push } = useRouter()
  const { id: tweetId } = useParams()
  const { data: loggedInUser } = useGetLoggedInUser()
  const { data, isInitialLoading } = useGetTweetDetails(tweetId)
  const infiniteRepliesQuery = useGetInfiniteReplies(tweetId)

  const tweet = data?.data

  if (isInitialLoading)
    return (
      <div className="flex h-[500px] w-full items-center justify-center">
        <Spinner />
      </div>
    )

  if (!tweet)
    return (
      <div className="flex h-[500px] w-full items-center justify-center">
        ERROR
      </div>
    )

  return (
    <>
      <div className="fixed z-50 flex w-full max-w-[600px] items-center gap-6 border-b bg-white bg-opacity-50 p-3 backdrop-blur-sm">
        <ArrowLeftIcon
          onClick={() => push('/')}
          className="h-5 w-5 shrink-0 cursor-pointer"
        />
        <div className="w-full">
          <p className="w-11/12 truncate text-xl font-bold">Tweet</p>
        </div>
      </div>
      <div className="mt-14 p-3">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10">
            <Image
              src={tweet.author.profilePictureUrl ?? '/twitter-default-pp.png'}
              className="h-auto w-full rounded-full object-cover"
              alt="photo profile"
              fill
            />
          </div>
          <div>
            <p className="font-semibold">{tweet.author.displayName}</p>
            <p className="-mt-1 text-dark-gray">@{tweet.author.username}</p>
          </div>
        </div>
        <p className="mt-3">{tweet?.text}</p>
        {tweet.mediaAttachments.length >= 1 && (
          <MediaAttachments
            className="mt-2"
            attachments={tweet.mediaAttachments}
          />
        )}
        <p className="mt-3 text-dark-gray">
          {format(new Date(tweet.createdAt), 'h:mm b ∙ LLL d, yyyy')}
        </p>
        <hr className="my-3" />
        <div className="flex gap-x-6 text-dark-gray">
          <div>
            <span className="font-semibold text-black">0</span> Retweets
          </div>
          <div>
            <span className="font-semibold text-black">0</span> Quotes
          </div>
          <div>
            <span className="font-semibold text-black">0</span> Likes
          </div>
          <div>
            <span className="font-semibold text-black">0</span> Bookmarks
          </div>
        </div>
        <hr className="my-3" />
        {loggedInUser && (
          <>
            <div className="flex justify-between px-12">
              <ChatBubbleOvalLeftIcon className="h-5 w-5 text-dark-gray" />
              <ArrowPathRoundedSquareIcon className="h-5 w-5 text-dark-gray" />
              <HeartIcon className="h-5 w-5 cursor-pointer text-dark-gray" />
              <BookmarkIcon className="h-5 w-5 text-dark-gray" />
              <ArrowUpTrayIcon className="h-5 w-5 text-dark-gray" />
            </div>
            <hr className="my-3" />
          </>
        )}
        <TweetYourReply
          replyToUsernames={[tweet.author.username]}
          parentTweetId={tweet.parentTweetId ?? tweet.id}
          parentReplyId={tweet.parentTweetId ? tweet.id : undefined}
        />
      </div>
      {loggedInUser && <hr className="mb-2" />}
      <Tweets query={infiniteRepliesQuery} />
    </>
  )
}

export default TweetDetailPage
