import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import db from '@/utils/db'

passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: 'http://localhost:8000/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await db.user.upsert({
        where: {
          id: profile.id,
        },
        update: {},
        create: {
          id: profile.id,
          email: profile._json.email!,
          profilePicture: profile._json.picture,
        },
      })
      done(null, user)
    },
  ),
)

passport.serializeUser((user: any, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await db.user.findUnique({ where: { id } })
    done(null, user)
  } catch (error) {
    done(error, null)
  }
})
