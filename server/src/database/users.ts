import { pool } from './index.js'

interface User {
	id: number
	name: string
	email: string
	password: string
	verification_link: string
	is_verified: 0 | 1
}

export async function getUserByToken(refreshToken: string): Promise<User> {
	const [token]: any[] = await pool.query(
		'SELECT * FROM tokens WHERE refresh_token = ?',
		[refreshToken]
	)
	const [user]: any[] = await pool.query('SELECT * FROM users WHERE id = ?', [
		token[0].user_id
	])

	return user[0]
}

export async function getUserByEmail(email: string): Promise<User> {
	const [user]: any[] = await pool.query('SELECT * FROM users WHERE email = ?', [email])

	return user[0]
}

export async function getUserByVerificationLink(verificationLink: string): Promise<User> {
	const [user]: any[] = await pool.query(
		'SELECT * FROM users WHERE verification_link = ?',
		[verificationLink]
	)

	return user[0]
}

export async function createUser(
	name: string,
	email: string,
	password: string,
	verificationLink: string
) {
	await pool.query(
		`INSERT INTO users (name, email, password, verification_link) VALUES (?, ?, ?, ?)`,
		[name, email, password, verificationLink]
	)

	return await getUserByEmail(email)
}

export async function updateUser(user: User) {
	await pool.query('UPDATE users SET is_verified = ? WHERE id = ?', [
		user.is_verified,
		user.id
	])

	return await getUserByEmail(user.email)
}
