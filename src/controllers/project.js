import {
  createProjectService,
  updateProjectService,
  getProjectsService,
  getProjectByIdService,
  deleteProjectByIdService,
  getArchivedProjectsService,
  getArchivedProjectByIdService,
  recoverArchivedProjectByIdService
} from '../services/project.js'

export async function createProjectController (req, res) {
  const { name, email, address, client } = req.body
  try {
    const project = await createProjectService({ name, email, address, client })
    res.status(201).send({ status: 201, data: { project } })
  } catch (error) {
    res.status(400).send({ status: 400, message: error.message })
  }
}

export async function updateProjectController (req, res) {
  const { id } = req.params
  const updateData = req.body
  try {
    const updatedProject = await updateProjectService({ projectId: id, data: updateData })
    res.status(200).send({ status: 200, data: { project: updatedProject } })
  } catch (error) {
    res.status(400).send({ status: 400, message: error.message })
  }
}

export async function getProjectsController (_, res) {
  try {
    const projects = await getProjectsService()
    res.status(200).send({ status: 200, data: { projects } })
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message })
  }
}

export async function getProjectByIdController (req, res) {
  const { id } = req.params
  try {
    const project = await getProjectByIdService({ projectId: id })
    res.status(200).send({ status: 200, data: { project } })
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message })
  }
}

export async function deleteProjectByIdController (req, res) {
  const { id } = req.params
  try {
    const archivedProject = await deleteProjectByIdService({ projectId: id })
    res.status(200).send({ status: 200, data: { project: archivedProject } })
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message })
  }
}

export async function getArchivedProjectsController (_, res) {
  try {
    const archivedProjects = await getArchivedProjectsService()
    res.status(200).send({ status: 200, data: { projects: archivedProjects } })
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message })
  }
}

export async function getArchivedProjectByIdController (req, res) {
  const { id } = req.params
  try {
    const project = await getArchivedProjectByIdService({ projectId: id })
    res.status(200).send({ status: 200, data: { project } })
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message })
  }
}

export async function recoverArchivedProjectByIdController (req, res) {
  const { id } = req.params
  try {
    const recoveredProject = await recoverArchivedProjectByIdService({ projectId: id })
    res.status(200).send({ status: 200, data: { project: recoveredProject } })
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message })
  }
}
