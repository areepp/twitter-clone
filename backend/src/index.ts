import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import credentials from './middlewares/credentials'
import errorHandler from './middlewares/errorHandler'

dotenv.config()

const app = express()

app.use(credentials)
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://your-domain',
    credentials: true,
  }),
)
app.use(express.json())
app.use(cookieParser())

app.get('/', (_req, res) => res.send('Hello world!'))

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server is running on port ${PORT}`)
})
