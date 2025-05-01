import { Schema, model } from 'mongoose'

const projectSchema = new Schema({
  name: { type: String, required: true, unique: true }
})

export const Project = model('Project', projectSchema)
