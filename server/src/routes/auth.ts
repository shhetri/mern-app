import { Router } from 'express'
import authController from '../controllers/auth-controller'
import validator from '../middlewares/validator'
import { registerRules, loginRules } from '../validation-rules/auth'

const router = Router()

router.post(
  '/register',
  validator(registerRules),
  authController.register.bind(authController)
)
router.post(
  '/login',
  validator(loginRules),
  authController.login.bind(authController)
)

export default router
