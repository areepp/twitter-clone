import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import * as authService from './auth.service'
import { getNewUniqueUsername } from './auth.util'

passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: 'http://localhost:8000/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await authService.getUserWithId(profile.id)

      if (user) {
        done(null, user)
      } else {
        const username = await getNewUniqueUsername(profile.displayName)
        const user = await authService.signUpWithGoogle({
          id: profile.id,
          email: profile._json.email!,
          profilePictureUrl: profile._json.picture!,
          displayName: profile.displayName,
          username,
        })
        done(null, user)
      }
    },
  ),
)

passport.serializeUser((user: any, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await authService.getUserWithId(id)
    if (user) {
      done(null, {
        username: user.username,
        id: user.id,
      })
    } else {
      done(null, false)
    }
  } catch (error) {
    done(error, null)
  }
})
