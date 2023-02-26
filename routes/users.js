import { Router } from 'express'
import content from '../middleware/content.js'
import * as auth from '../middleware/auth.js'
import upload from '../middleware/upload.js'
import { register, login, logout, extend, getUser, editUser, editFavorite, getFavorite } from '../controllers/users.js'

const router = Router()

router.post('/', content('application/json'), register)
router.post('/login', content('application/json'), auth.login, login)
router.delete('/logout', auth.jwt, logout)
router.patch('/extend', auth.jwt, extend)
router.patch('/edit/:id', content('multipart/form-data'), auth.jwt, upload, editUser)
router.get('/me', auth.jwt, getUser)

router.post('/favorite', content('application/json'), auth.jwt, editFavorite)
router.get('/favorite', auth.jwt, getFavorite)

export default router
