import { NextFunction, Request, Response } from 'express'
import { AnyZodObject, ZodEffects, ZodError } from 'zod'

interface RequestValidators {
  body?: AnyZodObject | ZodEffects<AnyZodObject>
  params?: AnyZodObject | ZodEffects<AnyZodObject>
  query?: AnyZodObject | ZodEffects<AnyZodObject>
}

// prettier-ignore
const validateRequest =
  (validators: RequestValidators) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (validators.body) {
          req.body = await validators.body.parseAsync(req.body)
        }
        if (validators.params) {
          req.params = await validators.params.parseAsync(req.params)
        }
        if (validators.query) {
          req.query = await validators.query.parseAsync(req.query)
        }

        return next()
      } catch (error) {
        if (error instanceof ZodError) {
          return res.status(422).json(error)
        }
        return next(error)
      }
    }

export default validateRequest
