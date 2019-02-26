import mongoose from 'mongoose'

class DatabaseConnector {
  connect(): void {
    const DATABASE_HOST: string = process.env.DATABASE_HOST
    const DATABASE_PORT: number = +process.env.DATABASE_PORT
    const DATABASE: string = process.env.DATABASE

    mongoose.set('debug', true)
    mongoose.connect(
      `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE}`,
      {
        useNewUrlParser: true,
        promiseLibrary: global.Promise,
      }
    )
  }
}

export default new DatabaseConnector()
