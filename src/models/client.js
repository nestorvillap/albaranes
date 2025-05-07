import { Schema, model } from 'mongoose'

const clientSchema = new Schema({
  name: { type: String, required: true },
  cif: { type: String },
  address: {
    street: { type: String },
    number: { type: Number },
    postal: { type: Number },
    city: { type: String },
    province: { type: String }
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  archived: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

export const Client = model('Client', clientSchema)
