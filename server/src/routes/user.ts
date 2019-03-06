import { Router } from 'express'
import pollsController from '../controllers/user/polls-controller'
import validator from '../middlewares/validator'
import {
  createPollRules,
  findPollRules,
  voteRules,
} from '../validation-rules/polls'

const router = Router()

router.post('/polls', validator(createPollRules), pollsController.create)
router.get('/polls', pollsController.index)
router.delete('/polls/:id', validator(findPollRules), pollsController.destroy)
router.post('/polls/:id/vote', validator(voteRules), pollsController.vote)

export default router
