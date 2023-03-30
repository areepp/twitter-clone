import { z } from 'zod'

const User = z.object({
  id: z.string(),
  email: z.string().email(),
  profilePicture: z.string().optional(),
  username: z.string(),
  displayName: z.string(),
})

type User = z.infer<typeof User>

export const EditUserProfileSchema = z
  .object({
    newUsername: z
      .string()
      .min(4, { message: 'Username must be at least 4 characters.' })
      .max(15, { message: 'The maximum length of username is 15 characters.' })
      .regex(/^[a-zA-Z0-9_]*$/g, {
        message: "Your username can only contain letters, numbers and '_'.",
      }),
  })
  .partial()

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
