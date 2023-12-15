import { Router } from 'express'

import { ItemsController } from '../controllers/index.js'

const items = Router()

items.get('/', ItemsController.getAll)
items.get('/:id', ItemsController.getById)

export const itemsRouter = items
