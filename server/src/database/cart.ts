import { pool } from './index.js'

export async function getCart(userId: number) {
	const [cart]: any[] = await pool.query(
		`
			SELECT item_id AS id, item_quantity AS quantity
			FROM cart
			WHERE user_id = ?;
		`,
		[userId]
	)

	return cart
}

export async function addItem(userId: number, itemId: number, itemQuantity: number) {
	return await pool.query(
		`
			INSERT INTO cart (user_id, item_id, item_quantity)
			VALUES (?, ?, ?);
		`,
		[userId, itemId, itemQuantity]
	)
}

export async function incrementItem(userId: number, itemId: number) {
	return await pool.query(
		`
			UPDATE cart
			SET item_quantity = item_quantity + 1
			WHERE user_id = ? AND item_id = ?;
		`,
		[userId, itemId]
	)
}

export async function decrementItem(userId: number, itemId: number) {
	return await pool.query(
		`
			UPDATE cart
			SET item_quantity = item_quantity - 1
			WHERE user_id = ? AND item_id = ?;
		`,
		[userId, itemId]
	)
}

export async function removeItem(userId: number, itemId: number) {
	return await pool.query(
		`
			DELETE FROM cart
			WHERE user_id = ? AND item_id = ?;
		`,
		[userId, itemId]
	)
}

export async function clearCart(userId: number) {
	return await pool.query(
		`
			DELETE FROM cart
			WHERE user_id = ?;
		`,
		[userId]
	)
}
