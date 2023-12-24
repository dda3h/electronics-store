import { NextFunction, Request, Response } from 'express'
import { CartService } from '../services/index.js'

export async function getCart(req: Request, res: Response, next: NextFunction) {
	try {
		const { userId } = req.query
		return res.json(await CartService.getCart(Number(userId)))
	} catch (err) {
		next(err)
	}
}

export async function addItem(req: Request, res: Response, next: NextFunction) {
	try {
		const { userId, itemId, itemQuantity } = req.body
		return res.json(await CartService.addItem(userId, itemId, itemQuantity))
	} catch (err) {
		next(err)
	}
}

export async function incrementItem(req: Request, res: Response, next: NextFunction) {
	try {
		const { userId, itemId } = req.body
		return res.json(await CartService.incrementItem(userId, itemId))
	} catch (err) {
		next(err)
	}
}

export async function decrementItem(req: Request, res: Response, next: NextFunction) {
	try {
		const { userId, itemId } = req.body
		return res.json(await CartService.decrementItem(userId, itemId))
	} catch (err) {
		next(err)
	}
}

export async function removeItem(req: Request, res: Response, next: NextFunction) {
	try {
		const { userId, itemId } = req.query
		return res.json(await CartService.removeItem(Number(userId), Number(itemId)))
	} catch (err) {
		next(err)
	}
}

export async function clearCart(req: Request, res: Response, next: NextFunction) {
	try {
		const { userId } = req.query
		return res.json(await CartService.clearCart(Number(userId)))
	} catch (err) {
		next(err)
	}
}
