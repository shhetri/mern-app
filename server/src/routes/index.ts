import { Router } from 'express'
import auth from './auth'
import polls from './polls'
import user from './user'

const router = Router()

router.use('/auth', auth)
router.use('/user', user)
router.use('/polls', polls)

export default router
