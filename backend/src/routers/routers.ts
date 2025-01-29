import { Router } from 'express'

import postRouter from './post/post.route'
const router = Router()

router.use('/api/v1/post', postRouter)

export default router
