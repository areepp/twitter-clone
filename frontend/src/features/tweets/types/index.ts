import { IUser } from '@/features/profiles'
import { z } from 'zod'

export type ITweet = {
  id: number
  text: string
  createdAt: string
  author: Pick<IUser, 'username' | 'displayName' | 'profilePictureUrl'>
  likes: {
    id: string
  }[]
  mediaAttachments: MediaAttachment[]
}

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
  media_attachments: z.array(
    z
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
      )
      .optional()
  ),
})

export type NewTweetSchema = z.infer<typeof NewTweetSchema>
