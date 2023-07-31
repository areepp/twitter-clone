import { Prisma } from '@prisma/client'
import { z } from 'zod'

export type Tweet = {
  text: string
  id: bigint
  createdAt: Date
  mediaAttachments: {
    url: string
  }[]
  author: {
    username: string
    displayName: string
    profilePictureUrl: string | null
  }
  likes: {
    id: number
  }[]
  _count: {
    replies: number
  }
}

export type TweetWithReplies = Tweet & {
  replies: Tweet[]
}

export const GetTweetsSchema = z.object({
  cursor: z.string().optional(),
})

export const MAX_FILE_SIZE = 50 * 1000 * 1000 // 50 MB

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

export const NewTweetSchema = z.object({
  text: z
    .string()
    .min(1, { message: 'A tweet must contain at least on character' })
    .max(280, { message: 'Maximum 280 characters.' }),
  media_attachments: z
    .array(
      z
        .any()
        .refine(
          (file) => {
            if (file.length > 0) {
              return file[0]?.size <= MAX_FILE_SIZE
            }
            return true
          },
          { message: 'Max image size is 50MB.' },
        )
        .refine(
          (file) => {
            if (file.length > 0) {
              return ACCEPTED_IMAGE_TYPES.includes(file[0]?.type)
            }
            return true
          },
          {
            message: 'Only .jpg, .jpeg, .png and .webp formats are supported.',
          },
        ),
    )
    .optional(),
})

type TempNewTweetSchema = z.infer<typeof NewTweetSchema>
export type NewTweetSchema = Pick<TempNewTweetSchema, 'text'> & {
  media_attachments: Array<Express.Multer.File>
}
export type GetTweetsSchema = z.infer<typeof GetTweetsSchema>

export const queryGetTweets: Prisma.TweetArgs = {
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
}
