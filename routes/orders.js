import { Router } from 'express'
import content from '../middleware/content.js'
import upload from '../middleware/upload.js'
import { jwt } from '../middleware/auth.js'
// import admin from '../middleware/admin.js'
import { createOrder, getMyOrders, getAllOrdersGM, getAllOrders, getModuleOrders } from '../controllers/orders.js'

const router = Router()

router.post('/', content('application/json'), jwt, createOrder, upload)
router.get('/', jwt, getMyOrders)
router.get('/gm', jwt, getAllOrdersGM)
router.get('/all', jwt, getAllOrders)
router.get('/module', jwt, getModuleOrders)

export default router
