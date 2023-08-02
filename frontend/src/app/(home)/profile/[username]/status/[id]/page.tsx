'use client'

import { Spinner } from '@/components/elements'
import { useGetLoggedInUser } from '@/features/auth'
import { Tweet, Tweets } from '@/features/tweets'
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
import clsx from 'clsx'
import { format } from 'date-fns'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

const TweetDetailPage = () => {
  const tweetRef = useRef<HTMLDivElement>(null)
  const { back } = useRouter()
  const { id: tweetId } = useParams()
  const { data: loggedInUser } = useGetLoggedInUser()
  const {
    data: tweetResponse,
    isInitialLoading,
    isSuccess,
  } = useGetTweetDetails(tweetId, {
    onSuccess: () => {
      tweetRef.current?.scrollIntoView()
    },
  })
  const {
    data: parentTweetResponse,
    isInitialLoading: isInitialParentTweetLoading,
  } = useGetTweetDetails(
    tweetResponse?.data.parentReplyId ?? tweetResponse?.data.parentTweetId
  )
  const infiniteRepliesQuery = useGetInfiniteReplies(tweetId)

  const tweet = tweetResponse?.data

  useEffect(() => {
    tweetRef.current?.scrollIntoView()
  }, [isSuccess])

  if (isInitialLoading || isInitialParentTweetLoading)
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
          onClick={back}
          className="h-5 w-5 shrink-0 cursor-pointer"
        />
        <div className="w-full">
          <p className="w-11/12 truncate text-xl font-bold">Tweet</p>
        </div>
      </div>
      {parentTweetResponse?.data && (
        <Tweet data={parentTweetResponse?.data} className="mt-12 !border-b-0" />
      )}
      <div
        ref={tweetRef}
        className={clsx(
          'relative scroll-mt-12  p-3',
          tweet.parentTweetId ? 'mt-0' : 'mt-14'
        )}
      >
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
        {(tweet.parentTweetId || tweet.parentReplyId) && (
          <div className="absolute -top-12 left-[30px] h-[60px] w-[2px] bg-stone-300" />
        )}
      </div>
      {loggedInUser && <hr className="mb-2" />}
      <Tweets query={infiniteRepliesQuery} />
    </>
  )
}

export default TweetDetailPage
