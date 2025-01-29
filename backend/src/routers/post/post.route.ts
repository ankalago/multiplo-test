import { Router, Request, Response } from 'express'
import { postController } from '../../../DependenciesInjections'

const router = Router()

router.post('/', async (req: Request, res: Response): Promise<void> => {
	try {
		res.status(201).json(await postController.create(req.body))
	} catch (error: any) {
		res.status(error.status).json({ error: error.message })
	}
})

router.get('/', async (_req: Request, res: Response): Promise<void> => {
	try {
		res.status(200).json(await postController.getAll())
	} catch (error: any) {
		res.status(error.status).json({ error: error.message })
	}
})

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
	try {
		res.status(200).json(await postController.findById(req.params.id))
	} catch (error: any) {
		res.status(error.status).json({ error: error.message })
	}
})

export default router
