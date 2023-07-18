import ApiError from '@/types/api-error'
import db from '@/lib/db'
import { EditUserProfileSchema } from './users.model'
import { sendPutObjectCommand } from '@/lib/s3/put-object'
import { getAllTweets } from '../tweets/tweets.service'

export const getUserProfile = async ({
  username,
  loggedInUserUsername,
}: {
  username: string
  loggedInUserUsername?: string
}) => {
  let isFollowedByLoggedInUser: boolean = false
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
      _count: {
        select: {
          followers: true,
          following: true,
        },
      },
    },
  })

  if (loggedInUserUsername && user?.id) {
    const follows = await db.follows.findUnique({
      where: {
        followerUsername_followingUsername: {
          followerUsername: loggedInUserUsername,
          followingUsername: user.username,
        },
      },
    })
    if (follows) {
      isFollowedByLoggedInUser = true
    }
  }

  if (!user) {
    throw new ApiError("User doesn't exists", 404)
  }

  return {
    id: user.id,
    username: user.username,
    displayName: user.displayName,
    bio: user.bio,
    profilePictureUrl: user.profilePictureUrl,
    likedTweets: user.likedTweets,
    followingTotal: user._count.following,
    followerTotal: user._count.followers,
    ...(loggedInUserUsername && {
      isFollowedByLoggedInUser,
    }),
  }
}

export const getUserTweets = async ({
  username,
  cursor,
}: {
  username: string
  cursor?: number
}) => {
  const userExists = await db.user.findUnique({
    where: { username },
  })
  if (!userExists) {
    throw new ApiError("User doesn't exists", 404)
  }

  const tweets = await getAllTweets({
    username,
    cursor,
  })

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

export const followUser = async ({
  followeeUsername,
  followerUsername,
}: {
  followeeUsername: string
  followerUsername: string
}) => {
  console.log('eyyyy', followeeUsername, followerUsername)
  return db.follows.create({
    data: {
      follower: {
        connect: {
          username: followerUsername,
        },
      },
      following: {
        connect: {
          username: followeeUsername,
        },
      },
    },
  })
}

export const unfollowUser = async ({
  followeeUsername,
  followerUsername,
}: {
  followeeUsername: string
  followerUsername: string
}) => {
  return db.follows.delete({
    where: {
      followerUsername_followingUsername: {
        followerUsername,
        followingUsername: followeeUsername,
      },
    },
  })
}
