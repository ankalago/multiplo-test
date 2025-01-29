import express, { Request, Response } from 'express'
import cors from 'cors'
import { httpLogger } from '../utls/logger'
import router from './routers/routers'

const app = express()
app.use(cors())
app.use(httpLogger)
app.use(express.json())

app.get('/', (_req: Request, res: Response) => {
	res.send('Hello World!').status(200)
})
app.use(router)

const port = process.env.SERVER_PORT || 3000
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
