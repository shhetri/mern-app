import { Router } from 'express'
import pollsController from '../controllers/polls-controller'
import { findPollRules } from '../validation-rules/polls'
import validator from '../middlewares/validator'

const router = Router()

router.get('/', pollsController.index)
router.get('/:id', validator(findPollRules), pollsController.find)

export default router
