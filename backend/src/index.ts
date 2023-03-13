import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import supertokens from 'supertokens-node'
import {
  middleware as supertokensMiddleware,
  errorHandler as supertokensErrorHandler,
} from 'supertokens-node/framework/express'
import credentials from './middlewares/credentials'
import errorHandler from './middlewares/errorHandler'
import initSuperTokens from './utils/initSuperTokens'

dotenv.config()

initSuperTokens()

const app = express()

app.use(credentials)
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://your-domain',
    credentials: true,
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
  }),
)
app.use(express.json())
app.use(cookieParser())

app.use(supertokensMiddleware()) // supertokens middlewares

app.get('/', (_req, res) => res.send('Hello world!'))

app.use(supertokensErrorHandler())
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server is running on port ${PORT}`)
})
