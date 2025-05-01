import { Router } from 'express'

import {
  createProjectController,
  updateProjectController,
  getProjectsController,
  getProjectByIdController,
  deleteProjectByIdController,
  getArchivedProjectsController,
  getArchivedProjectByIdController,
  recoverArchivedProjectByIdController
} from '../controllers/project.js'

// import {
//   validateCreation,
//   validateUpdate
// } from '../validators/project.js'

// import { authMiddleware } from '../middlewares/authMiddleware.js'

const projectRouter = Router()

// Middleware de autenticación
// projectRouter.use(authMiddleware())
// Crear, actualizar, obtener y eliminar proyectos
projectRouter.post('/', createProjectController)
projectRouter.patch('/', updateProjectController)
projectRouter.get('/', getProjectsController)
projectRouter.get('/:id', getProjectByIdController)
projectRouter.delete('/:id', deleteProjectByIdController)

// Rutas para proyectos archivados
projectRouter.get('/archived', getArchivedProjectsController)
projectRouter.get('/archived/:id', getArchivedProjectByIdController)
projectRouter.patch('/archived/:id', recoverArchivedProjectByIdController)

export { projectRouter }
