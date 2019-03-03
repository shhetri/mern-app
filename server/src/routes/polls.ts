import { Router } from 'express'
import pollsController from '../controllers/polls-controller'
import validator from '../middlewares/validator'
import { createPollRules } from '../validation-rules/polls'

const router = Router()

router.post(
  '/',
  validator(createPollRules),
  pollsController.create.bind(pollsController)
)
router.get('/', pollsController.index.bind(pollsController))

export default router
