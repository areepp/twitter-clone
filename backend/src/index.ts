import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import passport from 'passport'
import session from 'express-session'
import errorHandler from './middlewares/error-handler'
import authController from '@/api/auth/auth.controller'
import usersController from './api/user/users.controller'
import './api/auth/passportGoogleStrategy'
import './api/auth/passportLocalStrategy'
import tweetController from './api/tweets/tweets.controller'

declare global {
  namespace Express {
    interface User {
      id: string
      username: string
    }
  }
}

// @ts-ignore: Unreachable code error
BigInt.prototype.toJSON = function () {
  return this.toString()
}

const app = express()

app.use(express.json())

app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://your-domain',
    credentials: true,
  }),
)

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  }),
)

app.use(passport.initialize())
app.use(passport.session())

app.get('/', (_req, res) => res.send('Hello world!'))
app.use('/auth', authController)
app.use('/users', usersController)
app.use('/tweets', tweetController)

app.use(errorHandler)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server is running on port ${PORT}`)
})
