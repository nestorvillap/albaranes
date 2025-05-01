import { Router } from 'express'

import {
  createDeliveryNoteController,
  updateDeliveryNoteController,
  getDeliveryNotesController,
  getDeliveryNoteByIdController,
  deleteDeliveryNoteByIdController,
  generatePdfController, // Added
  signDeliveryNoteController // Added
} from '../controllers/deliveryNote.js'

// import {
//   validateCreation,
//   validateUpdate
// } from '../validators/deliveryNote.js'

// import { authMiddleware } from '../middlewares/authMiddleware.js'

const deliveryNoteRouter = Router()

// Middleware de autenticación
// deliveryNoteRouter.use(authMiddleware())

// Crear, actualizar, obtener y eliminar albaranes
deliveryNoteRouter.post('/', createDeliveryNoteController)
deliveryNoteRouter.patch('/:id', updateDeliveryNoteController) // Changed path to include ID for update
deliveryNoteRouter.get('/', getDeliveryNotesController)
deliveryNoteRouter.get('/:id', getDeliveryNoteByIdController)
deliveryNoteRouter.delete('/:id', deleteDeliveryNoteByIdController) // Note: Controller needs logic to prevent deletion if signed

// Generar y descargar PDF
deliveryNoteRouter.get('/pdf/:id', generatePdfController)

// Firmar albarán
deliveryNoteRouter.post('/:id/sign', signDeliveryNoteController) // Using POST for signing action

export { deliveryNoteRouter }
