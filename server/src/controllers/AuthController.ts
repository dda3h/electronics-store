import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

import { AuthService } from '../services/index.js'

import { ApiError } from '../exceptions/api-error.js'

export async function registration(req: Request, res: Response, next: NextFunction) {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return next(ApiError.BadRequest('Validation error', errors.array()))
		}

		const { name, email, password } = req.body

		const userData = await AuthService.registration(name, email, password)
		res.cookie('refreshToken', userData.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true
		})

		return res.json(userData)
	} catch (e) {
		next(e)
	}
}

export async function verify(req: Request, res: Response, next: NextFunction) {
	try {
		const verificationLink = req.params.link
		await AuthService.verify(verificationLink)
		return res.redirect(process.env.CLIENT_URL!)
	} catch (e) {
		next(e)
	}
}

export async function login(req: Request, res: Response, next: NextFunction) {
	try {
		const { email, password } = req.body

		const userData = await AuthService.login(email, password)
		res.cookie('refreshToken', userData.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true
		})

		return res.json(userData)
	} catch (e) {
		next(e)
	}
}

export async function logout(req: Request, res: Response, next: NextFunction) {
	try {
		const { refreshToken } = req.cookies

		const token = await AuthService.logout(refreshToken)
		res.clearCookie('refreshToken')

		return res.json(token)
	} catch (e) {
		next(e)
	}
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
	try {
		const { refreshToken } = req.cookies

		const userData = await AuthService.refresh(refreshToken)
		res.cookie('refreshToken', userData.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true
		})

		return res.json(userData)
	} catch (e) {
		next(e)
	}
}
