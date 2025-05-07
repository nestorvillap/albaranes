import { Router } from 'express'

import {
  createClientController,
  updateClientController,
  getClientsController,
  getClientByIdController,
  deleteClientByIdController,
  getArchivedClientsController,
  getArchivedClientByIdController,
  recoverArchivedClientByIdController
} from '../controllers/client.js'

// import {
//   validateCreation,
//   validateUpdate
// } from '../validators/client.js'

import { authMiddleware } from '../middlewares/authMiddleware.js'

const clientRouter = Router()

// Middleware de autenticación
clientRouter.use(authMiddleware())

// Rutas específicas PRIMERO para evitar conflictos con :id
clientRouter.get('/archived', getArchivedClientsController)
clientRouter.get('/archived/:id', getArchivedClientByIdController)
clientRouter.patch('/archived/:id', recoverArchivedClientByIdController)

// Rutas generales y con parámetros DESPUÉS
clientRouter.post('/', createClientController)
clientRouter.get('/', getClientsController)
clientRouter.get('/:id', getClientByIdController)
clientRouter.patch('/:id', updateClientController)
clientRouter.delete('/:id', deleteClientByIdController)

export { clientRouter }
