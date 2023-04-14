import ApiError from '@/types/api-error'
import db from '@/lib/db'
import { PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3'
import s3 from '@/lib/aws'
import { v4 as uuidv4 } from 'uuid'
import { EditUserProfileSchema } from './users.model'

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

  if (displayName || bio) {
    await db.user.update({
      where: { username: user.username },
      data: {
        displayName,
        bio,
      },
    })
  }

  if (profilePictureFile) {
    const uniqueFileName = uuidv4()

    const params: PutObjectCommandInput = {
      Bucket: process.env.BUCKET_NAME,
      Key: uniqueFileName,
      Body: profilePictureFile.buffer,
      ContentType: profilePictureFile.mimetype,
    }

    const command = new PutObjectCommand(params)

    await s3.send(command)

    await db.user.update({
      where: {
        username: user.username,
      },
      data: {
        profilePictureUrl:
          'https://my-twitter-clone.s3.ap-southeast-1.amazonaws.com/' +
          uniqueFileName,
      },
    })
  }
}
