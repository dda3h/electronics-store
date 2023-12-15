import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { itemsRouter } from './routers/items.js'
import { authRouter } from './routers/auth.js'

import { errorMiddleware } from './middlewares/errorMiddleware.js'

const app = express()
const PORT = process.env.PORT ?? 5000

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }))
app.use(express.json())
app.use(cookieParser())

app.use('/images', express.static('./images'))

app.use('/items', itemsRouter)
app.use('/auth', authRouter)

app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}...`)
})
