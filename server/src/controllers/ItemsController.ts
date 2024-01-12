import { Request, Response } from 'express'

import { ItemsService } from '../services/index.js'

export async function getAll(req: Request, res: Response) {
	try {
		const items = await ItemsService.getAll()
		return res.json(items)
	} catch (e) {
		console.error(e)
	}
}

export async function getById(req: Request, res: Response) {
	try {
		const { id } = req.params
		const item = await ItemsService.getById(Number(id))
		return res.json(item)
	} catch (e) {
		console.error(e)
	}
}
