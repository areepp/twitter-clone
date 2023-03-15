import express from 'express'
import passport from 'passport'

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

export default authRouter
