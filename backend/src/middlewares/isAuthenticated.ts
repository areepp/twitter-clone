import ApiError from '@/types/ApiError'
import { NextFunction, Request, Response } from 'express'

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) throw new ApiError('user unauthorized', 403)
  next()
}

export default isAuthenticated
