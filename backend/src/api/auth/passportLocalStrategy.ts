import db from '@/utils/db'
import passport, { PassportStatic } from 'passport'
import localStrategy from 'passport-local'
import bcrypt from 'bcryptjs'

passport.use(
  new localStrategy.Strategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      try {
        const user = await db.user.findUnique({ where: { email } })

        if (!user) {
          done(null, false, { message: 'Incorrect email and/or password.' })
        } else {
          const passwordMatches = await bcrypt.compare(
            password,
            user?.password!,
          )

          passwordMatches
            ? done(null, user!)
            : done(null, false, { message: 'Incorrect email and/or password.' })
        }
      } catch (error) {
        done(error, false)
      }
    },
  ),
)

passport.serializeUser((user: any, done: any) => {
  done(null, user.id)
})

passport.deserializeUser(async (id: string, done: any) => {
  try {
    const user = await db.user.findUnique({ where: { id } })
    if (user) {
      done(null, {
        email: user.email,
        profilePicture: user.profilePicture,
        id: user.id,
      })
    } else {
      done(null, false)
    }
  } catch (error) {
    done(error, null)
  }
})
