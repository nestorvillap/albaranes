import { Schema, model } from 'mongoose'

const deliveryNoteSchema = new Schema({
  name: { type: String, required: true },
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

export const DeliveryNote = model('DeliveryNote', deliveryNoteSchema)
