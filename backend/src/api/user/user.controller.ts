import isAuthenticated from '@/middlewares/isAuthenticated'
import express from 'express'

const userController = express.Router()

userController.get('/me', isAuthenticated, (req, res) => {
  res.json(req.user ?? { error: 'no user' })
})

export default userController
