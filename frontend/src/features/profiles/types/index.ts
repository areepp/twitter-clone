import { ITweet } from '@/features/tweets/types'
import { z } from 'zod'

export interface IUserTemp {
  userId: string
  userName: string
  userImgUrl: string
}

export interface IUser {
  id: string
  username: string
  displayName: string
  profilePictureUrl: string | null
  bio: string
  likedTweets: {
    id: number
    tweet: Pick<ITweet, 'id'>
  }[]
  isFollowedByLoggedInUser?: boolean
  followingTotal: number
  followerTotal: number
}

export const NewUsernameInput = z.object({
  username: z
    .string()
    .min(4, { message: 'Username must be at least 4 characters.' })
    .max(15, { message: 'The maximum length of username is 15 characters.' })
    .regex(/^[a-zA-Z0-9_]*$/g, {
      message: "Your username can only contain letters, numbers and '_'.",
    }),
})

export type NewUsernameInput = z.infer<typeof NewUsernameInput>

const MAX_FILE_SIZE = 50 * 1000 * 1000 // TODO: set maximum image size

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

export const EditProfileInput = z.object({
  displayName: z
    .string()
    .min(1, { message: "Display name can't be blank." })
    .max(50, { message: 'Maximum length is 50 characters.' }),
  bio: z.string().max(160, { message: 'Maximum length is 160 characters.' }),
  profilePictureFile: z
    .any()
    .refine(
      (file) => {
        if (file.length > 0) {
          return file[0]?.size <= MAX_FILE_SIZE
        }
        return true
      },
      { message: 'Max image size is 50MB.' }
    )
    .refine(
      (file) => {
        if (file.length > 0) {
          return ACCEPTED_IMAGE_TYPES.includes(file[0]?.type)
        }
        return true
      },
      { message: 'Only .jpg, .jpeg, .png and .webp formats are supported.' }
    ),
})

export type EditProfileInput = z.infer<typeof EditProfileInput>
