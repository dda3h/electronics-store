import data from '../../data/items.json' assert { type: 'json' }

export async function getAll() {
	const items = data.map(item => ({...item, image: process.env.SERVER_URL + item.image }))
	return items
}

export async function getById(id: number) {
	const item = data.find(item => item.id === id)

	if (!item) throw new Error(`Item not found.`)

	return { ...item, image: process.env.SERVER_URL + item.image }
}
