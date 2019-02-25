import mongoose from 'mongoose'
import express, { Response } from 'express'
import logger from './logger/logger'

const app = express()

app.get('/', (_, res: Response) => {
  mongoose.connect('mongodb://mongo:27017', (err: Error) => {
    if (err) {
      res.send({ error: 'Can not connect to mongo' })
      return
    }
    res.send({ success: `Connected to mongo. I have  changed it` })
  })
})

app.listen(3000, () => {
  logger.info('Server successfully started')
})
