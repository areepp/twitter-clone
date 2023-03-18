import ApiError from '@/types/ApiError'
import db from '@/utils/db'
import { AuthSchema } from './auth.model'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

export const signup = async ({ email, password }: AuthSchema) => {
  const userExists = await db.user.count({ where: { email } })

  if (userExists) {
    throw new ApiError('User with the email address already exists.', 403)
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const newUser = await db.user.create({
    data: {
      id: uuidv4(),
      email,
      password: passwordHash,
    },
  })

  return newUser
}
