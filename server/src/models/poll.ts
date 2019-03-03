import { model, Schema, Document } from 'mongoose'
import { User } from './user'

export interface Option extends Document {
  name: string
  votes: number
}

export interface Poll extends Document {
  user: User
  question: string
  options: Option[]
  voted?: User[]
  created?: Date
}

const optionSchema: Schema = new Schema({
  name: String,
  votes: {
    type: Number,
    default: 0,
  },
})

const pollSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  question: String,
  options: [optionSchema],
  voted: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  created: {
    type: Date,
    default: Date.now(),
  },
})

export default model<Poll>('Poll', pollSchema)
