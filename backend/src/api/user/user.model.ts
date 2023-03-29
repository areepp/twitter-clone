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
    newUsername: z.string(),
  })
  .partial()

export type EditUserProfileSchema = z.infer<typeof EditUserProfileSchema>

export default User
