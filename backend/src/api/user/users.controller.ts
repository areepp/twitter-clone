import isAuthenticated from '@/middlewares/is-authenticated'
import validateRequest from '@/middlewares/validate-request'
import ApiError from '@/types/api-error'
import express from 'express'
import multer from 'multer'
import {
  CheckUsernameAvailabilitySchema,
  EditUserProfileSchema,
} from './users.model'
import * as userService from './users.service'

const storage = multer.memoryStorage()
const upload = multer({ storage })

const usersController = express.Router()

usersController.get('/me', isAuthenticated, async (req, res, next) => {
  try {
    const user = await userService.getUserProfile({
      username: req.user!.username,
    })

    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
})

usersController.get('/:username', async (req, res, next) => {
  try {
    const user = await userService.getUserProfile({
      username: req.params.username,
      loggedInUserUsername: req.user?.username,
    })

    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
})

usersController.get('/:username/tweets', async (req, res, next) => {
  try {
    const tweets = await userService.getUserTweets({
      username: req.params.username,
      cursor: req.query.cursor
        ? parseInt(req.query.cursor as string)
        : undefined,
      loggedInUserId: req.user?.id,
    })

    res.status(200).json(tweets)
  } catch (error) {
    next(error)
  }
})

usersController.get('/:username/likes', async (req, res, next) => {
  try {
    const tweets = await userService.getUserLikedTweets({
      username: req.params.username,
      cursor: req.query.cursor
        ? parseInt(req.query.cursor as string)
        : undefined,
      loggedInUserId: req.user?.id,
    })

    res.status(200).json(tweets)
  } catch (error) {
    next(error)
  }
})

usersController.get(
  '/check-availability/:username',
  isAuthenticated,
  validateRequest({ params: CheckUsernameAvailabilitySchema }),
  async (req, res, next) => {
    try {
      const taken = await userService.getUserWithUsername(req.params.username)

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

usersController.patch(
  '/:username',
  isAuthenticated,
  // validateRequest({ body: EditUserProfileSchema }), // TODO: work on this validation
  upload.single('profilePictureFile'),
  async (req, res, next) => {
    try {
      // logged in user and requested user have to be the same
      if (req.params.username !== req?.user?.username) {
        throw new ApiError('Request denied.', 403)
      }

      await userService.editUserProfile(req.user, {
        ...req.body,
        profilePictureFile: req.file,
      })

      return res.status(200).send('User edited successfully.')
    } catch (error) {
      next(error)
    }
  },
)

usersController.post(
  '/:username/follow',
  isAuthenticated,
  async (req, res, next) => {
    try {
      await userService.followUser({
        followeeUsername: req.params.username,
        followerUsername: req.user!.username,
      })

      return res
        .status(200)
        .send(`You are now following ${req.params.username}`)
    } catch (error) {
      next(error)
    }
  },
)

usersController.post(
  '/:username/unfollow',
  isAuthenticated,
  async (req, res, next) => {
    try {
      await userService.unfollowUser({
        followeeUsername: req.params.username,
        followerUsername: req.user!.username,
      })

      return res
        .status(200)
        .send(`You unfollowed user with id ${req.params.username}`)
    } catch (error) {
      next(error)
    }
  },
)

export default usersController
