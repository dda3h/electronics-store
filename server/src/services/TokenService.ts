import jwt from 'jsonwebtoken'

import { TokensDB } from '../database/index.js'

import { UserDto } from '../dtos/user-dto.js'

export function generateTokens(payload: UserDto) {
	const accessToken: string = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
		expiresIn: '15m'
	})
	const refreshToken: string = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
		expiresIn: '30d'
	})

	return { accessToken, refreshToken }
}

export function validationAccessToken(token: string) {
	try {
		const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET!)
		return userData
	} catch (err) {
		return null
	}
}

export function validationRefreshToken(token: string) {
	try {
		const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET!)
		return userData
	} catch (err) {
		return null
	}
}

export async function saveToken(userId: number, refreshToken: string) {
	const tokenData = await TokensDB.getTokenByUser(userId)

	if (tokenData) {
		return await TokensDB.updateToken(userId, refreshToken)
	}

	const token = await TokensDB.createToken(userId, refreshToken)

	return token
}
