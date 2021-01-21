import { Router } from 'express'
import User from './app/models/User'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers//SessionController'

import authMiddleWare from  './app/middleware/auth'

const routes = new Router()

routes.post('/users', UserController.store)
routes.post('/session', SessionController.store)

routes.put('/users',authMiddleWare, UserController.update)

export default routes