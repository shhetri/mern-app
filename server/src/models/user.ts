import { Schema, model } from 'mongoose'

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  polls: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Poll',
    },
  ],
  created: {
    type: Date,
    default: Date.now(),
  },
})

export default model('User', userSchema)
