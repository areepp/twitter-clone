import ApiError from '@/types/api-error'
import db from '@/utils/db'
import { AuthSchema } from './auth.model'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { getNewUniqueUsername } from './auth.util'

export const signup = async ({ email, password }: AuthSchema) => {
  const userExists = await db.user.count({ where: { email } })

  if (userExists) {
    throw new ApiError('User with the email address already exists.', 403)
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const username = await getNewUniqueUsername(
    email.substring(0, email.indexOf('@')),
  )

  const newUser = await db.user.create({
    data: {
      id: uuidv4(),
      email,
      username,
      password: passwordHash,
      displayName: email.substring(0, email.indexOf('@')),
    },
  })

  return newUser
}

export const signUpWithGoogle = async ({
  id,
  email,
  profilePicture,
  username,
  displayName,
}: {
  id: string
  email: string
  profilePicture: string
  username: string
  displayName: string
}) =>
  db.user.create({
    data: {
      id,
      email,
      profilePicture,
      username,
      displayName,
    },
  })

export const getUserWithId = async (id: string) =>
  db.user.findUnique({ where: { id } })

export const getUserWithEmail = async (email: string) =>
  db.user.findUnique({ where: { email } })

export const checkUserWithUsernameExists = async (username: string) =>
  db.user.findUnique({ where: { username } })
