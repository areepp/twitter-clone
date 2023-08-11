import db from '@/lib/db'
import { sendPutObjectCommand } from '@/lib/s3/put-object'
import { MediaAttachment } from '@/types/global'
import { Tweet, getRepliesSelect, tweetSelect } from './tweets.model'
import { generateRandomNumbers } from '@/utils/helpers'

export const getAllTweets = async ({
  username,
  cursor,
  loggedInUserId,
}: {
  username?: string
  cursor?: number
  loggedInUserId?: string
}) => {
  let tweets: Array<Tweet> = []

  if (username) {
    tweets = await db.tweet.findMany({
      where: {
        author: {
          username,
        },
      },
      select: tweetSelect,
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
  } else {
    tweets = await db.tweet.findMany({
      select: tweetSelect,
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
  }

  if (loggedInUserId) {
    tweets = await Promise.all(
      tweets.map(async (tweet) => {
        const like = await db.likedTweet.findFirst({
          where: {
            userId: loggedInUserId,
            tweetId: tweet.id,
          },
        })

        return { ...tweet, isLiked: !!like }
      }),
    )
  }

  return {
    data: tweets,
    next_cursor: tweets.length >= 10 ? tweets[9].id : undefined,
  }
}

export const getTweetReplies = async ({
  id,
  cursor,
  loggedInUserId,
}: {
  id: number
  cursor?: number
  loggedInUserId?: string
}) => {
  let tweet: Tweet | null
  tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    select: {
      ...tweetSelect,
      ...getRepliesSelect(cursor),
    },
  })

  if (!tweet) {
    tweet = await db.replyTweet.findUnique({
      where: {
        id,
      },
      select: {
        ...tweetSelect,
        parentTweetId: true,
        parentReplyId: true,
        ...getRepliesSelect(cursor),
      },
    })
  }

  if (loggedInUserId && tweet) {
    const tweetLiked = await db.likedTweet.findFirst({
      where: {
        userId: loggedInUserId,
        tweetId: tweet.id,
      },
    })

    let repliesWithIsLiked = null
    if (tweet.replies) {
      repliesWithIsLiked = await Promise.all(
        tweet.replies.map(async (reply) => {
          const like = await db.likedTweet.findFirst({
            where: {
              userId: loggedInUserId,
              replyTweetId: reply.id,
            },
          })

          return { ...reply, isLiked: !!like }
        }),
      )
    }

    tweet = {
      ...tweet,
      isLiked: !!tweetLiked,
      replies: repliesWithIsLiked ?? tweet.replies,
    }
  }

  return {
    data: tweet,
    next_cursor:
      tweet?.replies && tweet.replies.length >= 10
        ? tweet?.replies[9].id
        : undefined,
  }
}

export const getLikedTweets = async ({
  userId,
  loggedInUserId,
  cursor,
}: {
  userId: string
  loggedInUserId?: string
  cursor?: number
}) => {
  const likes = await db.likedTweet.findMany({
    where: {
      userId,
    },
    select: {
      tweet: {
        select: tweetSelect,
      },
      ReplyTweet: {
        select: tweetSelect,
      },
    },
    orderBy: {
      likedAt: 'desc',
    },
    take: 10,
    cursor: cursor
      ? {
          id: cursor,
        }
      : undefined,
  })

  let tweets = likes.map((like) => like.tweet ?? like.ReplyTweet)

  if (loggedInUserId && tweets) {
    tweets = await Promise.all(
      tweets.map(async (tweet) => {
        const like = await db.likedTweet.findFirst({
          where: {
            userId: loggedInUserId,
            tweetId: tweet?.id,
          },
        })

        return { ...tweet, isLiked: !!like }
      }),
    )
  }

  return {
    data: tweets,
    next_cursor: tweets && tweets.length >= 10 ? tweets[9]?.id : undefined,
  }
}

export const createTweet = async ({
  authorId,
  text,
  mediaAttachments,
}: {
  authorId: string
  text: string
  mediaAttachments?: Array<Express.Multer.File>
}) => {
  let parsedAttachmentIds: Array<Pick<MediaAttachment, 'id'>> | undefined =
    undefined
  if (mediaAttachments) {
    const attachmentsData = await Promise.all(
      mediaAttachments.map(async (file) => {
        const url = await sendPutObjectCommand(file)
        return await db.mediaAttachment.create({
          data: {
            url,
          },
        })
      }),
    )
    parsedAttachmentIds = attachmentsData.map((attachment) => ({
      id: attachment.id,
    }))
  }
  const newTweet = await db.tweet.create({
    data: {
      id: generateRandomNumbers(),
      text,
      author: {
        connect: {
          id: authorId,
        },
      },
      mediaAttachments: {
        connect: parsedAttachmentIds,
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
}) => {
  const isATweet = await db.tweet.findUnique({
    where: {
      id: tweetId,
    },
  })

  return db.likedTweet.create({
    data: {
      ...(isATweet
        ? {
            tweet: {
              connect: {
                id: tweetId,
              },
            },
          }
        : {
            ReplyTweet: {
              connect: {
                id: tweetId,
              },
            },
          }),
      User: {
        connect: {
          id: likedBy,
        },
      },
    },
  })
}

export const unlikeTweet = async ({
  tweetId,
  loggedInUserId,
}: {
  tweetId: number
  loggedInUserId: string
}) => {
  const isATweet = await db.tweet.findUnique({
    where: {
      id: tweetId,
    },
  })

  return db.likedTweet.deleteMany({
    where: {
      userId: loggedInUserId,
      ...(isATweet
        ? {
            tweetId: tweetId,
          }
        : {
            replyTweetId: tweetId,
          }),
    },
  })
}

export const createReply = async ({
  authorId,
  text,
  mediaAttachments,
  tweetId,
  replyId,
}: {
  authorId: string
  text: string
  mediaAttachments?: Array<Express.Multer.File>
  tweetId: number
  replyId?: number
}) => {
  let parsedAttachmentIds: Array<Pick<MediaAttachment, 'id'>> | undefined =
    undefined

  if (mediaAttachments) {
    const attachmentsData = await Promise.all(
      mediaAttachments.map(async (file) => {
        const url = await sendPutObjectCommand(file)
        return await db.mediaAttachment.create({
          data: {
            url,
          },
        })
      }),
    )
    parsedAttachmentIds = attachmentsData.map((attachment) => ({
      id: attachment.id,
    }))
  }

  const newReply = await db.replyTweet.create({
    data: {
      id: generateRandomNumbers(),
      tweet: {
        connect: {
          id: tweetId,
        },
      },
      text,
      author: {
        connect: {
          id: authorId,
        },
      },
      mediaAttachments: {
        connect: parsedAttachmentIds,
      },
    },
  })

  if (replyId) {
    await db.replyTweet.update({
      where: {
        id: replyId,
      },
      data: {
        replies: {
          connect: {
            id: newReply.id,
          },
        },
      },
    })
  }

  return newReply
}
