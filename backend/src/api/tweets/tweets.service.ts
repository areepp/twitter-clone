import db from '@/lib/db'

export const getAllTweets = async ({ cursor }: { cursor?: number }) => {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      text: true,
      createdAt: true,
      author: {
        select: {
          profilePictureUrl: true,
          displayName: true,
          username: true,
        },
      },
      likes: {
        select: {
          id: true,
        },
      },
    },
    take: 10,
    cursor: cursor
      ? {
          id: cursor,
        }
      : undefined,
    orderBy: {
      createdAt: 'desc',
    },
  })

  return {
    data: tweets,
    next_cursor: tweets.length >= 10 ? tweets[9].id : undefined,
  }
}

export const createTweet = async ({
  authorId,
  text,
}: {
  authorId: string
  text: string
}) => {
  const newTweet = await db.tweet.create({
    data: {
      text,
      author: {
        connect: {
          id: authorId,
        },
      },
    },
  })

  return newTweet
}

export const likeTweet = async ({
  tweetId,
  likedBy,
}: {
  tweetId: number
  likedBy: string
}) =>
  db.likedTweet.create({
    data: {
      tweet: {
        connect: {
          id: tweetId,
        },
      },
      User: {
        connect: {
          id: likedBy,
        },
      },
    },
  })

export const unlikeTweet = async ({ likedTweetId }: { likedTweetId: number }) =>
  db.likedTweet.delete({
    where: {
      id: likedTweetId,
    },
  })
