import { Project } from '../models/project.js'

export async function createProjectService ({ name, client }) {
  const existingProject = await Project.findOne({ name, client, archived: { $ne: true } })
  if (existingProject) {
    throw new Error('Project with this name already exists for this client.')
  }
  const project = await Project.create({ name, client })
  return project
}

export async function updateProjectService ({ projectId, data }) {
  // Asegúrate de que no se pueda modificar el cliente o el estado de archivado directamente
  const { client, archived, archivedAt, ...updateData } = data
  const updatedProject = await Project.findOneAndUpdate(
    { _id: projectId, archived: { $ne: true } },
    updateData,
    { new: true }
  )
  if (!updatedProject) {
    const projectExists = await Project.findById(projectId)
    if (!projectExists) throw new Error('Project not found.')
    if (projectExists.archived) throw new Error('Cannot update an archived project.')
  }
  return updatedProject
}

export async function getProjectsService () {
  // Por ahora, devuelve todos los proyectos no archivados. Podrías añadir filtros por usuario si es necesario.
  const projects = await Project.find({ archived: { $ne: true } }).populate('client', 'name') // Popula el nombre del cliente
  return projects
}

export async function getProjectByIdService ({ projectId }) {
  const project = await Project.findOne({ _id: projectId, archived: { $ne: true } }).populate('client', 'name')
  return project // Devuelve null si no se encuentra o está archivado
}

export async function deleteProjectByIdService ({ projectId }) {
  const project = await Project.findById(projectId)
  if (!project) {
    throw new Error('Project not found.')
  }
  if (project.archived) {
    throw new Error('Project is already archived.')
  }

  const result = await Project.updateOne(
    { _id: projectId },
    { $set: { archived: true, archivedAt: new Date() } }
  )

  if (result.matchedCount === 0) {
    throw new Error('Project not found during update.')
  }
  if (result.modifiedCount === 0) {
    throw new Error('Project was not archived, it might already be in the desired state.')
  }

  // Devuelve el proyecto actualizado (archivado) para confirmar
  const archivedProject = await Project.findById(projectId)
  return archivedProject
}

export async function getArchivedProjectsService () {
  const archivedProjects = await Project.find({ archived: true }).populate('client', 'name')
  return archivedProjects
}

export async function getArchivedProjectByIdService ({ projectId }) {
  const project = await Project.findOne({ _id: projectId, archived: true }).populate('client', 'name')
  return project // Devuelve null si no se encuentra o no está archivado
}

export async function recoverArchivedProjectByIdService ({ projectId }) {
  const recoveredProject = await Project.findOneAndUpdate(
    { _id: projectId, archived: true },
    { $set: { archived: false }, $unset: { archivedAt: '' } },
    { new: true }
  ).populate('client', 'name')

  if (!recoveredProject) {
    const projectExists = await Project.findById(projectId)
    if (!projectExists) throw new Error('Project not found.')
    if (!projectExists.archived) throw new Error('Project is not archived.')
  }
  return recoveredProject
}
