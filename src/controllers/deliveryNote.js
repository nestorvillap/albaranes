import {
  createDeliveryNoteService,
  updateDeliveryNoteService,
  getDeliveryNotesService,
  getDeliveryNoteByIdService,
  deleteDeliveryNoteByIdService,
  generatePdfService,
  signDeliveryNoteService
} from '../services/deliveryNote.js'

export async function createDeliveryNoteController (req, res) {
  const { name, project } = req.body

  try {
    const deliveryNote = await createDeliveryNoteService({ name, project })
    res.status(201).send({ status: 201, data: { deliveryNote } })
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message })
  }
}

export async function updateDeliveryNoteController (req, res) {
  const { id } = req.params
  const updateData = req.body

  try {
    const updatedDeliveryNote = await updateDeliveryNoteService({ deliveryNoteId: id, data: updateData })
    res.status(200).send({ status: 200, data: { deliveryNote: updatedDeliveryNote } })
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message })
  }
}

export async function getDeliveryNotesController (req, res) {
  const { projectId } = req.query

  try {
    const deliveryNotes = await getDeliveryNotesService({ projectId })
    res.status(200).send({ status: 200, data: { deliveryNotes } })
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message })
  }
}

export async function getDeliveryNoteByIdController (req, res) {
  const { id } = req.params

  try {
    const deliveryNote = await getDeliveryNoteByIdService({ deliveryNoteId: id })
    res.status(200).send({ status: 200, data: { deliveryNote } })
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message })
  }
}

export async function deleteDeliveryNoteByIdController (req, res) {
  const { id } = req.params

  try {
    const archivedNote = await deleteDeliveryNoteByIdService({ deliveryNoteId: id })
    res.status(200).send({ status: 200, data: { deliveryNote: archivedNote } })
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message })
  }
}

export async function generatePdfController (req, res) {
  const { id } = req.params

  try {
    const { url } = await generatePdfService({ deliveryNoteId: id })
    res.status(200).send({ status: 200, data: { url } })
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message })
  }
}

export async function signDeliveryNoteController (req, res) {
  const { id } = req.params
  const signatureData = req.body.signature

  try {
    const { url } = await signDeliveryNoteService({ deliveryNoteId: id, signatureData })
    res.status(200).send({ status: 204, data: { url } })
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message })
  }
}
