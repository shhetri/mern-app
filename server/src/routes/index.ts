import { Router } from 'express'
import auth from './auth'
import polls from './polls'

const router = Router()

router.use('/auth', auth)
router.use('/polls', polls)

export default router
