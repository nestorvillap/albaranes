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

// import { authMiddleware } from '../middlewares/authMiddleware.js'

const clientRouter = Router()

// Middleware de autenticación
// clientRouter.use(authMiddleware())
// Crear, actualizar, obtener y eliminar clientes
clientRouter.post('/', createClientController)
clientRouter.patch('/', updateClientController)
clientRouter.get('/', getClientsController)
clientRouter.get('/:id', getClientByIdController)
clientRouter.delete('/:id', deleteClientByIdController)

// Rutas para clientes archivados
clientRouter.get('/archived', getArchivedClientsController)
clientRouter.get('/archived/:id', getArchivedClientByIdController)
clientRouter.patch('/archived/:id', recoverArchivedClientByIdController)

export { clientRouter }
