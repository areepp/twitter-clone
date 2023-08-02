import db from '@/lib/db'
import { sendPutObjectCommand } from '@/lib/s3/put-object'
import { MediaAttachment } from '@/types/global'
import { Tweet, TweetWithReplies } from './tweets.model'
import { generateRandomNumbers } from '@/utils/helpers'

export const getAllTweets = async ({
  username,
  cursor,
}: {
  username?: string
  cursor?: number
}) => {
  let tweets: Array<Tweet> = []

  if (username) {
    tweets = await db.tweet.findMany({
      where: {
        author: {
          username,
        },
      },
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
        mediaAttachments: {
          select: {
            url: true,
          },
        },
        _count: {
          select: {
            replies: {
              where: {
                parentReplyId: null,
              },
            },
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
  } else {
    tweets = await db.tweet.findMany({
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
        mediaAttachments: {
          select: {
            url: true,
          },
        },
        _count: {
          select: {
            replies: {
              where: {
                parentReplyId: null,
              },
            },
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
  }

  return {
    data: tweets,
    next_cursor: tweets.length >= 10 ? tweets[9].id : undefined,
  }
}

export const getTweetReplies = async ({
  id,
  cursor,
}: {
  id: number
  cursor?: number
}) => {
  let tweet: TweetWithReplies | null
  tweet = await db.tweet.findUnique({
    where: {
      id,
    },
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
      mediaAttachments: {
        select: {
          url: true,
        },
      },
      _count: {
        select: {
          replies: {
            where: {
              parentReplyId: null,
            },
          },
        },
      },
      replies: {
        where: {
          parentReplyId: null,
        },
        select: {
          id: true,
          text: true,
          createdAt: true,
          parentReplyId: true,
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
          mediaAttachments: {
            select: {
              url: true,
            },
          },
          _count: {
            select: {
              replies: true,
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
      },
    },
  })

  if (!tweet) {
    tweet = await db.replyTweet.findUnique({
      where: {
        id,
      },
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
        mediaAttachments: {
          select: {
            url: true,
          },
        },
        _count: {
          select: {
            replies: true,
          },
        },
        parentTweetId: true,
        parentReplyId: true,
        replies: {
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
            mediaAttachments: {
              select: {
                url: true,
              },
            },
            _count: {
              select: {
                replies: true,
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
        },
      },
    })
  }

  return {
    data: tweet,
    next_cursor:
      tweet?.replies && tweet.replies.length >= 10
        ? tweet?.replies[9].id
        : undefined,
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
