import ApiError from '@/types/api-error'
import db from '@/utils/db'
import { EditUserProfileSchema } from './user.model'

export const checkUsernameAvailability = async (username: string) =>
  db.user.findUnique({ where: { username } })

export const editUserProfile = async (
  user: Express.User,
  { newUsername }: EditUserProfileSchema,
) => {
  if (newUsername) {
    const userWithUserNameExist = await db.user.findUnique({
      where: { username: newUsername },
    })

    if (userWithUserNameExist) {
      throw new ApiError(
        'This username has been taken. Please choose another.',
        400,
      )
    } else {
      return db.user.update({
        where: {
          username: user.username,
        },
        data: {
          username: newUsername,
        },
      })
    }
  }
}
