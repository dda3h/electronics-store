import { pool } from './index.js'

interface Token {
  id: number
  refresh_token: string
}

export async function getTokenByUser(userId: number): Promise<Token> {
  const [token]: any[] = await pool.query('SELECT * FROM tokens WHERE user_id = ?', [userId])

  return token[0]
}

export async function findToken(refreshToken: string): Promise<Token> {
  const [token]: any[] = await pool.query('SELECT * FROM tokens WHERE refresh_token = ?', [refreshToken])

  return token[0]
}

export async function createToken(userId: number, refreshToken: string): Promise<Token> {
  await pool.query(`INSERT INTO tokens (user_id, refresh_token) VALUES (?, ?)`, [userId, refreshToken])

  return await getTokenByUser(userId)
}

export async function updateToken(userId: number, refreshToken: string): Promise<Token> {
  await pool.query('UPDATE tokens SET refresh_token = ? WHERE user_id = ?', [refreshToken, userId])

  return await getTokenByUser(userId)
}

export async function deleteToken(refreshToken: string): Promise<Token> {
  const [token]: any[] = await pool.query('DELETE FROM tokens WHERE refresh_token = ?', [refreshToken])

  return token[0]
}
