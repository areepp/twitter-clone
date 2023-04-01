import { z } from 'zod'

const User = z.object({
  username: z
    .string()
    .min(4)
    .max(15)
    .regex(/^[a-zA-Z0-9_]*$/g),
  id: z.string(),
  email: z.string().email(),
  profilePicture: z.string(),
  displayName: z.string().min(1).max(50),
})

type User = z.infer<typeof User>

export const EditUserProfileSchema = z
  .object({
    username: z
      .string()
      .min(4, { message: 'Username must be at least 4 characters.' })
      .max(15, { message: 'The maximum length of username is 15 characters.' })
      .regex(/^[a-zA-Z0-9_]*$/g, {
        message: "Your username can only contain letters, numbers and '_'.",
      }),
    displayName: z
      .string()
      .min(1, { message: 'Display name must be at least 1 character' })
      .max(50, {
        message: 'The maximum length of display name is 50 characters',
      }),
    bio: z
      .string()
      .max(160, { message: 'The maximum length of bio is 160 characters.' }),
  })
  .partial()
  .refine(
    (data) => data.username || data.displayName || data.bio,
    'Either "username" or "displayName" or "bio" field should be filled in.',
  )

export type EditUserProfileSchema = z.infer<typeof EditUserProfileSchema>

export const CheckUsernameAvailabilitySchema = z.object({
  username: z
    .string()
    .min(4, { message: 'Username must be at least 4 characters.' })
    .max(15, { message: 'The maximum length of username is 15 characters.' })
    .regex(/^[a-zA-Z0-9_]*$/g, {
      message: "Your username can only contain letters, numbers and '_'.",
    }),
})

export default User
