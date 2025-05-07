import { DeliveryNote } from '../models/deliverynNote.js'
// Import Project model if needed for validation or population details beyond the ID
// import { Project } from '../models/project.js';

export async function createDeliveryNoteService ({ name, project }) {
  // Optional: Check if project exists and is not archived
  // const existingProject = await Project.findOne({ _id: project, archived: { $ne: true } });
  // if (!existingProject) {
  //   throw new Error('Project not found or is archived.');
  // }

  // Check if a delivery note with the same name already exists for this project
  const existingNote = await DeliveryNote.findOne({ name, project, archived: { $ne: true } })
  if (existingNote) {
    throw new Error('Delivery note with this name already exists for this project.')
  }

  const deliveryNote = await DeliveryNote.create({ name, project })
  // Populate project details if needed upon creation response
  // await deliveryNote.populate('project', 'name client'); // Example population
  return deliveryNote
}

export async function updateDeliveryNoteService ({ deliveryNoteId, data }) {
  // Prevent updating project, archived status, or signature directly via this service
  const { project, archived, archivedAt, signed, signature, ...updateData } = data

  const note = await DeliveryNote.findById(deliveryNoteId)
  if (!note) throw new Error('Delivery note not found.')
  if (note.archived) throw new Error('Cannot update an archived delivery note.')
  if (note.signed) throw new Error('Cannot update a signed delivery note.')

  const updatedDeliveryNote = await DeliveryNote.findByIdAndUpdate(
    deliveryNoteId,
    updateData,
    { new: true }
  ).populate('project', 'name') // Populate project name

  return updatedDeliveryNote
}

export async function getDeliveryNotesService ({ projectId }) {
  const query = { archived: { $ne: true } }
  if (projectId) {
    query.project = projectId
  }
  // Populate project details
  const deliveryNotes = await DeliveryNote.find(query).populate('project', 'name client') // Example population
  return deliveryNotes
}

export async function getDeliveryNoteByIdService ({ deliveryNoteId }) {
  const deliveryNote = await DeliveryNote.findOne({ _id: deliveryNoteId, archived: { $ne: true } })
    .populate('project', 'name client') // Example population
  // Return null if not found or archived (controller handles 404)
  return deliveryNote
}

export async function deleteDeliveryNoteByIdService ({ deliveryNoteId }) {
  const note = await DeliveryNote.findById(deliveryNoteId)
  if (!note) {
    throw new Error('Delivery note not found.')
  }
  if (note.archived) {
    throw new Error('Delivery note is already archived.')
  }
  if (note.signed) {
    throw new Error('Cannot archive a signed delivery note.')
  }

  const result = await DeliveryNote.updateOne(
    { _id: deliveryNoteId },
    { $set: { archived: true, archivedAt: new Date() } }
  )

  if (result.matchedCount === 0) {
    throw new Error('Delivery note not found during update.')
  }
  if (result.modifiedCount === 0) {
    throw new Error('Delivery note was not archived, it might already be in the desired state.')
  }

  // Return the archived note for confirmation
  const archivedNote = await DeliveryNote.findById(deliveryNoteId).populate('project', 'name')
  return archivedNote
}

export async function generatePdfService ({ deliveryNoteId }) {
  const note = await DeliveryNote.findOne({ _id: deliveryNoteId })
    .populate({
      path: 'project',
      populate: { path: 'client' } // Populate client within project if needed
    })
    // .populate('user') // Populate user details if needed

  if (!note) {
    throw new Error('Delivery note not found.')
  }

  // Placeholder for actual PDF generation logic (e.g., using pdfkit or puppeteer)
  console.log('Generating PDF for:', note)
  // const pdfBuffer = await generateThePdf(note); // Call your PDF generation function

  // For now, return success and the note data
  return { success: true, message: 'PDF generation initiated (placeholder)', data: note /*, pdfBuffer */ }
}

export async function signDeliveryNoteService ({ deliveryNoteId, signatureData }) {
  const note = await DeliveryNote.findById(deliveryNoteId)
  if (!note) {
    throw new Error('Delivery note not found.')
  }
  if (note.archived) {
    throw new Error('Cannot sign an archived delivery note.')
  }
  if (note.signed) {
    throw new Error('Delivery note is already signed.')
  }

  // Add signature data and mark as signed
  // The structure of signatureData depends on what you send from the frontend
  // Example: { signerName: 'John Doe', signatureImage: 'data:image/png;base64,...' or URL }
  const updatedNote = await DeliveryNote.findByIdAndUpdate(
    deliveryNoteId,
    {
      $set: {
        signed: true,
        signature: signatureData, // Store the signature details
        signedAt: new Date()
      }
    },
    { new: true }
  ).populate('project', 'name')

  if (!updatedNote) {
    // Should not happen if the initial findById worked, but good practice
    throw new Error('Failed to update delivery note for signing.')
  }

  return updatedNote
}

// Add functions for getArchivedDeliveryNotes, getArchivedDeliveryNoteById, recoverArchivedDeliveryNote
// if you add corresponding routes and controllers later.
