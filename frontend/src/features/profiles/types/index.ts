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
  profilePicture: string
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
