import { Router } from 'express'

import { body } from 'express-validator'

import { AuthController } from '../controllers/index.js'

import { authMiddleware } from '../middlewares/authMiddleware.js'

const auth = Router()

auth.post(
  '/registration',
  body('name').isLength({ min: 1, max: 16 }),
  body('email').isEmail().isLength({ max: 32 }),
  body('password').isLength({ min: 8, max: 20 }),
  AuthController.registration
)
auth.get('/verify/:link', AuthController.verify)
auth.post('/login', AuthController.login)
auth.post('/logout', AuthController.logout)
auth.get('/refresh', AuthController.refresh)
auth.get('/users', authMiddleware, AuthController.getUsers)

export const authRouter = auth
