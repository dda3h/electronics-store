import data from '../../data/items.json' assert { type: 'json' }

export const getAll = async () => {
  const items = data.map((item) => ({ ...item, image: process.env.SERVER_URL + item.image }))

  return items
}

export const getById = async (id: number) => {
  const item = data.find((item) => item.id === id)

  if (!item) {
    throw new Error(`Item not found.`)
  }

  return { ...item, image: process.env.SERVER_URL + item.image }
}
