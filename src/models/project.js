import { Schema, model } from 'mongoose'

const projectSchema = new Schema({
  name: { type: String, required: true },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  archived: {
    type: Boolean,
    default: false
  },
  archivedAt: {
    type: Date
  }
})

export const Project = model('Project', projectSchema)
