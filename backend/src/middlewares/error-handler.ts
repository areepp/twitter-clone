import { NextFunction, Request, Response } from 'express'

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction,
) => {
  return res
    .status(err.statusCode ?? 500)
    .json({ message: err.message ?? 'something went wrong' })
}

export default errorHandler
