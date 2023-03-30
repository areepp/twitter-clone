import isAuthenticated from '@/middlewares/is-authenticated'
import validateRequest from '@/middlewares/validate-request'
import ApiError from '@/types/api-error'
import express from 'express'
import {
  CheckUsernameAvailabilitySchema,
  EditUserProfileSchema,
} from './user.model'
import * as userService from './user.service'

const userController = express.Router()

userController.get('/me', isAuthenticated, (req, res) => {
  res.json(req.user ?? { error: 'no user' })
})

userController.get(
  '/check-availability/:username',
  isAuthenticated,
  validateRequest({ params: CheckUsernameAvailabilitySchema }),
  async (req, res, next) => {
    try {
      const taken = await userService.checkUsernameAvailability(
        req.params.username,
      )

      if (taken) {
        throw new ApiError(
          'This username has been taken. Please choose another.',
          400,
        )
      } else {
        res.status(200).send('username available')
      }
    } catch (error) {
      next(error)
    }
  },
)

userController.patch(
  '/:username',
  isAuthenticated,
  validateRequest({ body: EditUserProfileSchema }),
  async (req, res, next) => {
    try {
      if (req.params.username !== req?.user?.username) {
        throw new ApiError('Request denied.', 403)
      } // logged in user and requested user have to be the same

      await userService.editUserProfile(req.user!, req.body)

      return res.status(200).send('Username changed successfully.')
    } catch (error) {
      next(error)
    }
  },
)

export default userController
