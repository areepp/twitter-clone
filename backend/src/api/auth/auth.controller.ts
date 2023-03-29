import validateRequest from '@/middlewares/validate-request'
import express, { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import { AuthSchema } from './auth.model'
import * as authService from './auth.service'
import User from '../user/user.model'

const authController = express.Router()

authController.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
)

authController.get(
  '/google/callback',
  passport.authenticate('google', {
    failureMessage: 'Cannot login to Google, try again later',
    failureRedirect: process.env.CLIENT_URL! + '/login',
  }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL!)
  },
)

authController.post(
  '/signup',
  validateRequest({ body: AuthSchema }),
  async (
    req: Request<{}, {}, AuthSchema>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const user = await authService.signup(req.body)

      return res.status(201).json({
        message: 'User succesfully created',
      })
    } catch (error: any) {
      return next(error)
    }
  },
)

authController.post(
  '/login',
  validateRequest({ body: AuthSchema }),
  (req, res, next) => {
    passport.authenticate('local', (err: any, user: User, info: any) => {
      if (err) next(err)
      if (user) {
        req.logIn(user, (err) => {
          if (err) throw err
          res.json({
            id: user.id,
            email: user.email,
            profilePicture: user.profilePicture,
          })
        })
      } else {
        return res
          .status(403)
          .json({ message: info.message ?? 'some error occured' })
      }
    })(req, res, next)
  },
)

authController.get('/logout', (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err)
    res.send('logged out')
  })
})

export default authController
