import validateRequest from '@/middlewares/validateRequest'
import express from 'express'
import passport from 'passport'
import { AuthSchema } from './auth.model'
import * as authController from './auth.controller'

const authRouter = express.Router()

authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
)

authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    failureMessage: 'Cannot login to Google, try again later',
    failureRedirect: process.env.CLIENT_URL! + '/login',
  }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL!)
  },
)

authRouter.post(
  '/signup',
  validateRequest({ body: AuthSchema }),
  authController.signup,
)

authRouter.post(
  '/login',
  validateRequest({ body: AuthSchema }),
  (req, res, next) => {
    passport.authenticate('local', (err: any, user: any, info: any) => {
      if (err) next(err)
      if (user) {
        req.logIn(user, (err) => {
          if (err) throw err
          res.send('Authenticated')
        })
      } else {
        return res
          .status(403)
          .json({ message: info.message ?? 'some error occured' })
      }
    })(req, res, next)
  },
)

authRouter.get('/logout', (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err)
    res.send('logged out')
  })
})

export default authRouter
