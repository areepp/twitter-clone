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

userController.get('/me', isAuthenticated, async (req, res, next) => {
  try {
    const user = await userService.getUser(req.user!.username)
    if (!user) {
      throw new ApiError('Error: User not found', 404)
    }
    res.status(200).json({
      username: user.username,
      displayName: user.displayName,
      bio: user.bio,
      profilePicture: user.profilePicture,
    })
  } catch (error) {
    next(error)
  }
})

userController.get('/:username', async (req, res, next) => {
  try {
    const user = await userService.getUser(req.params.username)

    if (!user) {
      throw new ApiError("User doesn't exists", 404)
    }

    res.status(200).json({
      username: user.username,
      displayName: user.displayName,
      bio: user.bio,
      profilePicture: user.profilePicture,
    })
  } catch (error) {
    next(error)
  }
})

userController.get(
  '/check-availability/:username',
  isAuthenticated,
  validateRequest({ params: CheckUsernameAvailabilitySchema }),
  async (req, res, next) => {
    try {
      const taken = await userService.getUser(req.params.username)

      if (taken) {
        throw new ApiError(
          'This username has been taken. Please choose another.',
          400,
        )
      }

      res.status(200).send('username available')
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

      return res.status(200).send('User edited successfully.')
    } catch (error) {
      next(error)
    }
  },
)

export default userController
