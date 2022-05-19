import appRouter from 'express'
import productRoutes from './productRoute.js'

const router = appRouter.Router()

router.use('/products', productRoutes)

export default router
