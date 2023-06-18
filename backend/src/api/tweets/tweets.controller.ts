import isAuthenticated from '@/middlewares/is-authenticated'
import validateRequest from '@/middlewares/validate-request'
import express from 'express'
import { NewTweetSchema } from './tweets.model'
import * as tweetsService from './tweets.service'

const tweetsController = express.Router()

tweetsController.get('/', async (req, res, next) => {
  try {
    const tweets = await tweetsService.getAllTweets()

    return res.status(200).json(tweets)
  } catch (error) {
    next(error)
  }
})

tweetsController.post(
  '/',
  isAuthenticated,
  validateRequest({ body: NewTweetSchema }),
  async (req, res, next) => {
    console.log('iiiiiii', req.user!.id)
    try {
      const newTweet = await tweetsService.createTweet({
        authorId: req.user!.id,
        text: req.body.text,
      })

      return res.status(200).json(newTweet)
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
