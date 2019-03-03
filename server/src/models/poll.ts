import { model, Schema } from 'mongoose'

const optionSchema: Schema = new Schema({
  option: String,
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

export default model('Poll', pollSchema)
