import { Schema, model } from 'mongoose'

const projectSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String },
  address: {
    street: { type: String },
    number: { type: Number },
    postal: { type: Number },
    city: { type: String },
    province: { type: String }
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  archived: {
    type: Boolean,
    default: false
  }
})

export const Project = model('Project', projectSchema)
