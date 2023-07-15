import ApiError from '@/types/api-error'
import db from '@/lib/db'
import { EditUserProfileSchema } from './users.model'
import { sendPutObjectCommand } from '@/lib/s3/put-object'

export const getUserProfile = async (username: string) => {
  const user = await db.user.findUnique({
    where: { username },
    include: {
      likedTweets: {
        select: {
          id: true,
          tweet: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  })

  if (!user) {
    throw new ApiError("User doesn't exists", 404)
  }

  return {
    username: user.username,
    displayName: user.displayName,
    bio: user.bio,
    profilePictureUrl: user.profilePictureUrl,
    likedTweets: user.likedTweets,
  }
}

export const getUserTweets = async (username: string) => {
  const tweets = await db.user.findUnique({
    where: { username },
    select: {
      Tweet: {
        select: {
          id: true,
          text: true,
          createdAt: true,
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
      },
    },
  })

  if (!tweets) {
    throw new ApiError("User doesn't exists", 404)
  }

  return tweets
}

export const getUserWithUsername = async (username: string) =>
  db.user.findUnique({ where: { username } })

export const editUserProfile = async (
  user: Express.User,
  { username, displayName, bio, profilePictureFile }: EditUserProfileSchema,
) => {
  if (username) {
    const userWithUserNameExist = await db.user.findUnique({
      where: { username },
    })

    if (userWithUserNameExist) {
      throw new ApiError(
        'This username has been taken. Please choose another.',
        400,
      )
    } else {
      await db.user.update({
        where: {
          username: user.username,
        },
        data: {
          username,
        },
      })
    }
  }

  let profilePictureUrl: string | null = null
  if (profilePictureFile) {
    profilePictureUrl = await sendPutObjectCommand(profilePictureFile)
  }

  if (displayName || bio) {
    await db.user.update({
      where: { username: user.username },
      data: {
        displayName,
        bio,
        ...(profilePictureUrl && {
          profilePictureUrl,
        }),
      },
    })
  }
}
