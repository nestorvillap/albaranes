import { Schema, model } from 'mongoose'

const clientSchema = new Schema({
  name: { type: String, required: true },
  cif: { type: String },
  address: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  archived: {
    type: Boolean,
    default: false
  },
  archivedAt: {
    type: Date
  }
}, { timestamps: true })

export const Client = model('Client', clientSchema)
