import { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import { AuthSchema } from './auth.model'
import * as authService from './auth.service'

export const signup = async (
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
}

export const login = async (
  req: Request<{}, {}, AuthSchema>,
  res: Response,
  next: NextFunction,
) => {
  return passport.authenticate('local', (err: any, user: any) => {
    if (err) throw err
    if (!user) res.send('No user exists')
    res.send('Successfully authenticated')
  })(req, res, next)
}
