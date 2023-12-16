import { NextFunction, Request, Response } from 'express'
import { TokenService } from '../services/index.js'
import { ApiError } from '../exceptions/api-error.js'

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
	try {
		const authorizationHeader = req.headers.authorization
		if (!authorizationHeader) {
			return next(ApiError.UnauthorizedError())
		}

		const accessToken = authorizationHeader.split(' ')[1]
		if (!accessToken) {
			return next(ApiError.UnauthorizedError())
		}

		const userData = TokenService.validationAccessToken(accessToken)
		if (!userData) {
			throw ApiError.UnauthorizedError()
		}

		// @ts-ignore
		req.user = userData
		next()
	} catch (error) {
		return next(ApiError.UnauthorizedError())
	}
}
