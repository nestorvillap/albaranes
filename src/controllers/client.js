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
  const { name } = req.body
  const userId = req.user._id

  if (!name) {
    return res.status(400).send({ status: 400, message: 'Client name is required' })
  }

  try {
    const client = await createClient({ name, userId })
    res.status(201).send({ status: 201, data: client })
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message || 'Error creating client' })
  }
}

export async function updateClientController (req, res) {
  const { id } = req.params
  const { name } = req.body
  const userId = req.user._id

  if (!name) {
    return res.status(400).send({ status: 400, message: 'Client name is required for update' })
  }

  try {
    const updatedClient = await updateClient({ clientId: id, userId, data: { name } })
    if (!updatedClient) {
      return res.status(404).send({ status: 404, message: 'Client not found or user unauthorized' })
    }
    res.status(200).send({ status: 200, data: updatedClient })
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message || 'Error updating client' })
  }
}

export async function getClientsController (req, res) {
  const userId = req.user._id
  try {
    const clients = await getClients({ userId })
    res.status(200).send({ status: 200, data: clients })
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message || 'Error fetching clients' })
  }
}

export async function getClientByIdController (req, res) {
  const { id } = req.params
  const userId = req.user._id

  try {
    const client = await getClientById({ clientId: id, userId })
    if (!client) {
      return res.status(404).send({ status: 404, message: 'Client not found or user unauthorized' })
    }
    res.status(200).send({ status: 200, data: client })
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message || 'Error fetching client' })
  }
}

export async function deleteClientByIdController (req, res) {
  const { id } = req.params
  const userId = req.user._id

  try {
    const result = await deleteClient({ clientId: id, userId })
    if (!result) {
      return res.status(404).send({ status: 404, message: 'Client not found or user unauthorized' })
    }
    res.status(204).send()
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message || 'Error deleting client' })
  }
}

export async function getArchivedClientsController (req, res) {
  const userId = req.user._id
  try {
    const archivedClients = await getArchivedClients({ userId })
    res.status(200).send({ status: 200, data: archivedClients })
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message || 'Error fetching archived clients' })
  }
}

export async function getArchivedClientByIdController (req, res) {
  const { id } = req.params
  const userId = req.user._id

  try {
    const client = await getArchivedClientById({ clientId: id, userId })
    if (!client) {
      return res.status(404).send({ status: 404, message: 'Archived client not found or user unauthorized' })
    }
    res.status(200).send({ status: 200, data: client })
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message || 'Error fetching archived client' })
  }
}

export async function recoverArchivedClientByIdController (req, res) {
  const { id } = req.params
  const userId = req.user._id

  try {
    const recoveredClient = await recoverArchivedClient({ clientId: id, userId })
    if (!recoveredClient) {
      return res.status(404).send({ status: 404, message: 'Archived client not found or user unauthorized for recovery' })
    }
    res.status(200).send({ status: 200, data: recoveredClient })
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message || 'Error recovering client' })
  }
}
