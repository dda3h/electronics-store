import { Router } from 'express'
import { CartController } from '../controllers/index.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const cart = Router()

cart.get('/getCart', authMiddleware, CartController.getCart)
cart.post('/addItem', authMiddleware, CartController.addItem)
cart.put('/incrementItem', authMiddleware, CartController.incrementItem)
cart.put('/decrementItem', authMiddleware, CartController.decrementItem)
cart.delete('/removeItem', authMiddleware, CartController.removeItem)
cart.delete('/clearCart', authMiddleware, CartController.clearCart)

export const cartRouter = cart
