import { Schema, model, HookNextFunction, Document } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface User extends Document {
  username: string
  password: string
  polls: Schema.Types.ObjectId[]
  created: Date
  comparePassword: (password: string) => Promise<boolean>
}

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
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

userSchema.pre<User>('save', async function(next: HookNextFunction) {
  try {
    if (!this.isModified) {
      return next()
    }

    this.password = await bcrypt.hash(this.password, 10)
  } catch (error) {
    next(error)
  }
})

userSchema.methods.comparePassword = async function(
  this: User,
  attemptedPassword: string,
  next: HookNextFunction
) {
  try {
    return await bcrypt.compare(attemptedPassword, this.password)
  } catch (error) {
    next(error)
  }
}

userSchema.methods.toJSON = function() {
  const obj = this.toObject()
  delete obj.password
  return obj
}

export default model<User>('User', userSchema)
