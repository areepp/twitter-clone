import isAuthenticated from '@/middlewares/isAuthenticated'
import express from 'express'

const userRouter = express.Router()

userRouter.get('/me', isAuthenticated, (req, res) => {
  res.json(req.user ?? { error: 'no user' })
})

export default userRouter
