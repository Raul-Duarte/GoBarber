import { Router } from 'express'
import User from './app/models/User'
import multer from 'multer'
import multerConfig from './config/multer'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers//SessionController'
import FileController from './app/controllers/FileController'
import ProviderController from './app/controllers/ProviderController'
import AppointmentController from './app/controllers/AppointmentController'
import AvailableController from './app/controllers/AvailableController'

import authMiddleWare from './app/middleware/auth'
import ScheduleController from './app/controllers/ScheduleController'
import NotificationController from './app/controllers/NotificationController'

const routes = new Router()
const upload = multer(multerConfig)


routes.post('/users', UserController.store)
routes.post('/session', SessionController.store)

routes.use(authMiddleWare)

routes.put('/users', UserController.update)

routes.get('/providers',ProviderController.index)
routes.get('/providers/:providerId/available',AvailableController.index)

routes.post('/appointments',AppointmentController.store)
routes.get('/appointments',AppointmentController.index)
routes.delete('/appointments/:id',AppointmentController.delete)

routes.get('/schedule', ScheduleController.index)

routes.get('/notifications', NotificationController.index)
routes.put('/notifications/:id',NotificationController.update)

routes.post('/files', upload.single('file'), FileController.store)

export default routes