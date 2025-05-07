import {
  createClient,
  updateClient,
  getClients,
  getClientById,
  deleteClient,
  getArchivedClients,
  getArchivedClientById,
  recoverArchivedClient
} from '../services/client.js'

export async function createClientController (req, res) {
  const { name, cif, address } = req.body
  const userId = req.user._id

  try {
    const client = await createClient({ name, cif, address, userId })
    res.status(201).send({ status: 201, data: { client } })
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message })
  }
}

export async function updateClientController (req, res) {
  const { id } = req.params
  const { name } = req.body
  const userId = req.user._id

  try {
    const updatedClient = await updateClient({ clientId: id, userId, data: { name } })
    res.status(200).send({ status: 200, data: { client: updatedClient } })
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message })
  }
}

export async function getClientsController (req, res) {
  const userId = req.user._id

  try {
    const clients = await getClients({ userId })
    res.status(200).send({ status: 200, data: { clients } })
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message })
  }
}

export async function getClientByIdController (req, res) {
  const { id } = req.params
  const userId = req.user._id

  try {
    const client = await getClientById({ clientId: id, userId })
    res.status(200).send({ status: 200, data: client })
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message })
  }
}

export async function deleteClientByIdController (req, res) {
  const { id } = req.params
  const userId = req.user._id

  try {
    await deleteClient({ clientId: id, userId })
    res.status(204).send({ status: 204 })
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message })
  }
}

export async function getArchivedClientsController (req, res) {
  const userId = req.user._id

  try {
    const archivedClients = await getArchivedClients({ userId })
    res.status(200).send({ status: 200, data: { clients: archivedClients } })
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message })
  }
}

export async function getArchivedClientByIdController (req, res) {
  const { id } = req.params
  const userId = req.user._id

  try {
    const client = await getArchivedClientById({ clientId: id, userId })
    res.status(200).send({ status: 200, data: { client } })
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message })
  }
}

export async function recoverArchivedClientByIdController (req, res) {
  const { id } = req.params
  const userId = req.user._id

  try {
    const recoveredClient = await recoverArchivedClient({ clientId: id, userId })
    res.status(200).send({ status: 200, data: { client: recoveredClient } })
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message })
  }
}
