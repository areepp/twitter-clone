import db from '@/lib/db'
import { sendPutObjectCommand } from '@/lib/s3/put-object'
import { MediaAttachment } from '@/types/global'
import { Tweet } from './tweets.model'

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
