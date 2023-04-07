import db from '@/lib/db'

export const getAllTweets = () =>
  db.tweet.findMany({
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
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

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
