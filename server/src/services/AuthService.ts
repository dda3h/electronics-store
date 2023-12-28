import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

import { UsersDB } from '../database/index.js'
import { TokensDB } from '../database/index.js'

import { MailService } from './index.js'
import { TokenService } from './index.js'

import { UserDto } from '../dtos/user-dto.js'

import { ApiError } from '../exceptions/api-error.js'

export async function registration(name: string, email: string, password: string) {
	const candidate = await UsersDB.getUserByEmail(email)
	if (candidate) {
		throw ApiError.BadRequest(`A user with the email address ${email} already exists.`)
	}

	const hashPassword = await bcrypt.hash(password, 3)
	const verificationLink = uuidv4()
	const user = await UsersDB.createUser(name, email, hashPassword, verificationLink)

	await MailService.sendVerificationMail(
		email,
		`${process.env.SERVER_URL}/auth/verify/${verificationLink}`
	)

	const userDto = new UserDto(user)

	const tokens = TokenService.generateTokens({ ...userDto })
	await TokenService.saveToken(userDto.id, tokens.refreshToken)

	return { ...tokens, user: userDto }
}

export async function verify(verificationLink: string) {
	const user = await UsersDB.getUserByVerificationLink(verificationLink)

	if (!user) throw ApiError.BadRequest('Incorrect verification link')

	user.is_verified = 1
	await UsersDB.updateUser(user)
}

export async function login(email: string, password: string) {
	const user = await UsersDB.getUserByEmail(email)
	if (!user) throw ApiError.BadRequest('Wrong email or password.')

	const isPassValid = await bcrypt.compare(password, user.password)
	if (!isPassValid) throw ApiError.BadRequest('Wrong email or password.')

	const userDto = new UserDto(user)

	const tokens = TokenService.generateTokens({ ...userDto })
	await TokenService.saveToken(userDto.id, tokens.refreshToken)

	return { ...tokens, user: userDto }
}

export async function logout(refreshToken: string) {
	const token = await TokensDB.deleteToken(refreshToken)
	return token
}

export async function refresh(refreshToken: string) {
	if (!refreshToken) throw ApiError.UnauthorizedError()

	const userData = TokenService.validationRefreshToken(refreshToken)
	const tokenFromDb = await TokensDB.findToken(refreshToken)
	if (!userData || !tokenFromDb) throw ApiError.UnauthorizedError()

	const user = await UsersDB.getUserByToken(refreshToken)
	const userDto = new UserDto(user)

	const tokens = TokenService.generateTokens({ ...userDto })
	await TokenService.saveToken(userDto.id, tokens.refreshToken)

	return { ...tokens, user: userDto }
}
