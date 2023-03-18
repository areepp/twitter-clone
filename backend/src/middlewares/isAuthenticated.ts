import ApiError from '@/types/ApiError'
import { NextFunction, Request, Response } from 'express'

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    throw new ApiError('user unauthorized', 403)
  }
}

export default isAuthenticated
