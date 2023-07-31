import isAuthenticated from '@/middlewares/is-authenticated'
import validateRequest from '@/middlewares/validate-request'
import express from 'express'
import { GetTweetsSchema, NewTweetSchema } from './tweets.model'
import * as tweetsService from './tweets.service'
import multer from 'multer'

const tweetsController = express.Router()

const storage = multer.memoryStorage()
const upload = multer({ storage })

tweetsController.get(
  '/',
  validateRequest({ query: GetTweetsSchema }),
  async (req, res, next) => {
    try {
      const tweets = await tweetsService.getAllTweets({
        cursor: req.query.cursor
          ? parseInt(req.query.cursor as string)
          : undefined,
      })

      return res.status(200).json(tweets)
    } catch (error) {
      next(error)
    }
  },
)

tweetsController.get(
  '/:id',
  validateRequest({ query: GetTweetsSchema }),
  async (req, res, next) => {
    try {
      const tweets = await tweetsService.getTweetReplies({
        id: Number(req.params.id),
      })

      return res.status(200).json(tweets)
    } catch (error) {
      next(error)
    }
  },
)

tweetsController.post(
  '/',
  isAuthenticated,
  // validateRequest({ body: NewTweetSchema }), // TODO: work on this validation
  upload.array('media_attachments', 4),
  async (req, res, next) => {
    try {
      const newTweet = await tweetsService.createTweet({
        authorId: req.user!.id,
        text: req.body.text,
        ...(req.files && {
          mediaAttachments: req.files as Array<Express.Multer.File>,
        }),
      })

      return res.status(200).json(newTweet)
    } catch (error) {
      next(error)
    }
  },
)

tweetsController.post(
  '/:id/reply',
  isAuthenticated,
  // validateRequest({ body: NewTweetSchema }), // TODO: work on this validation
  upload.array('media_attachments', 4),
  async (req, res, next) => {
    try {
      const newReply = await tweetsService.createReply({
        tweetId: Number(req.params.id),
        authorId: req.user!.id,
        text: req.body.text,
        replyId: Number(req.query['in_reply_to_reply_id']),
        ...(req.files && {
          mediaAttachments: req.files as Array<Express.Multer.File>,
        }),
      })

      return res.status(200).json(newReply)
    } catch (error) {
      next(error)
    }
  },
)

tweetsController.patch('/:id/like', isAuthenticated, async (req, res, next) => {
  try {
    const likedTweet = await tweetsService.likeTweet({
      tweetId: parseInt(req.params.id),
      likedBy: req.user!.id,
    })

    res.status(200).json(likedTweet)
  } catch (error) {
    next(error)
  }
})

tweetsController.delete(
  '/liked-tweets/:id',
  isAuthenticated,
  async (req, res, next) => {
    try {
      const unlikedTweet = await tweetsService.unlikeTweet({
        likedTweetId: parseInt(req.params.id),
      })

      res.status(200).json(unlikedTweet)
    } catch (error) {
      next(error)
    }
  },
)

export default tweetsController
