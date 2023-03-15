import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import passport from 'passport'
import session from 'express-session'
import errorHandler from './middlewares/errorHandler'
import authRouter from '@/api/auth/auth.router'
import './api/auth/passportGoogleSetup'
import userRouter from './api/user/user.router'

dotenv.config()

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
    resave: true,
    saveUninitialized: true,
  }),
)

app.use(passport.initialize())
app.use(passport.session())

app.get('/', (_req, res) => res.send('Hello world!'))
app.use('/auth', authRouter)
app.use('/user', userRouter)

// app.use(errorHandler)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server is running on port ${PORT}`)
})
