import passport, { PassportStatic } from 'passport'
import localStrategy from 'passport-local'
import bcrypt from 'bcryptjs'
import * as authService from './auth.service'

passport.use(
  new localStrategy.Strategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      try {
        const user = await authService.getUserWithEmail(email)
        if (!user) {
          done(null, false, { message: 'Incorrect email and/or password.' })
        } else {
          if (!user.password) {
            done(null, false, {
              message:
                'account registered with the sign in with google method. Please use the sign in with google method instead.',
            })
          } else {
            const passwordMatches = await bcrypt.compare(
              password,
              user.password,
            )

            passwordMatches
              ? done(null, user!)
              : done(null, false, {
                  message: 'Incorrect email and/or password.',
                })
          }
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
    const user = await authService.getUserWithId(id)
    if (user) {
      done(null, {
        username: user.username,
        displayName: user.displayName,
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
