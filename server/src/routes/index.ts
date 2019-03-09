import { Router } from 'express'
import auth from './auth'
import polls from './polls'
import user from './user'
import authMiddleware from '../middlewares/auth'

const router = Router()
const protectedRoutes: { [prop: string]: Router } = {
  '/user': user,
  '/polls': polls,
}

const registerProtectedRoutes = (): void => {
  for (const path in protectedRoutes) {
    if (protectedRoutes.hasOwnProperty(path)) {
      router.use(path, authMiddleware, protectedRoutes[path])
    }
  }
}

router.use('/auth', auth)
registerProtectedRoutes()

export default router
