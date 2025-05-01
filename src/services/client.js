import { Client } from '../models/client.js' // Asegúrate de que el modelo Client esté correctamente importado

export async function createClient ({ name, userId }) {
  const existingClient = await Client.findOne({ name, user: userId, archived: { $ne: true } })
  if (existingClient) {
    throw new Error('Client with this name already exists for this user.')
  }

  const client = await Client.create({ name, user: userId })
  return client
}

export async function updateClient ({ clientId, userId, data }) {
  const updatedClient = await Client.findOneAndUpdate(
    { _id: clientId, user: userId, archived: { $ne: true } },
    data,
    { new: true }
  )

  if (!updatedClient) {
    const clientExists = await Client.findById(clientId)
    if (!clientExists) throw new Error('Client not found.')
    if (String(clientExists.user) !== String(userId)) throw new Error('User not authorized to update this client.')
    if (clientExists.archived) throw new Error('Cannot update an archived client.') // Opcional: decidir si se permite
  }

  return updatedClient
}

export async function getClients ({ userId }) {
  const clients = await Client.find({ user: userId, archived: { $ne: true } }) // Filtra por usuario y no archivados
  return clients
}

export async function getClientById ({ clientId, userId }) {
  const client = await Client.findOne({ _id: clientId, user: userId, archived: { $ne: true } })
  return client // Devuelve null si no se encuentra o no cumple las condiciones
}

export async function deleteClient ({ clientId, userId }) {
  // Primero verifica si existe y pertenece al usuario
  const client = await Client.findOne({ _id: clientId, user: userId })
  if (!client) {
    throw new Error('Client not found or user not authorized.')
  }
  if (client.archived) {
    throw new Error('Client is already archived.') // Evita re-archivar
  }

  // Realiza el archivado (actualización)
  const result = await Client.updateOne(
    { _id: clientId, user: userId },
    { $set: { archived: true, archivedAt: new Date() } }
  )

  // updateOne devuelve un objeto con información sobre la operación, como matchedCount y modifiedCount
  if (result.matchedCount === 0) {
    // Esto no debería ocurrir si la verificación anterior pasó, pero es una doble comprobación
    throw new Error('Client not found or user not authorized during update.')
  }
  if (result.modifiedCount === 0) {
    // Podría ocurrir si ya estaba archivado y la lógica anterior falló o hubo una condición de carrera
    throw new Error('Client was not archived, it might already be in the desired state.')
  }

  // Devolvemos un indicador de éxito. El controlador espera un valor truthy.
  // Podríamos devolver el objeto result si el controlador necesita más detalles.
  return { success: true }
}

export async function getArchivedClients ({ userId }) {
  const archivedClients = await Client.find({ user: userId, archived: true }) // Filtra por usuario y archivados
  return archivedClients
}

export async function getArchivedClientById ({ clientId, userId }) {
  const client = await Client.findOne({ _id: clientId, user: userId, archived: true })
  return client // Devuelve null si no se encuentra o no cumple las condiciones
}

export async function recoverArchivedClient ({ clientId, userId }) {
  const recoveredClient = await Client.findOneAndUpdate(
    { _id: clientId, user: userId, archived: true }, // Solo recupera si pertenece al usuario y está archivado
    { $set: { archived: false }, $unset: { archivedAt: '' } }, // Quita el estado archivado y la fecha
    { new: true } // Devuelve el documento modificado
  )
  // findOneAndUpdate devuelve null si no encuentra el documento que coincida con el filtro
  if (!recoveredClient) {
    // Podría ser que no exista, no pertenezca al usuario, o no estuviera archivado
    const clientExists = await Client.findById(clientId)
    if (!clientExists) throw new Error('Client not found.')
    if (String(clientExists.user) !== String(userId)) throw new Error('User not authorized to recover this client.')
    if (!clientExists.archived) throw new Error('Client is not archived.')
  }
  return recoveredClient
}
