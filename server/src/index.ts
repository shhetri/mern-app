import mongoose from 'mongoose'
import express, { Response } from 'express'

const app = express()

app.get('/', (_, res: Response) => {
  mongoose.connect('mongodb://mongo:27017', (err: Error) => {
    if (err) {
      res.send({ error: 'Can not connect to mongo' })
      return
    }
    res.send({ success: 'Connected to mongo....' })
  })
})

app.listen(3000, () => {
  // tslint:disable-next-line: no-console
  console.log('successfully started server.')
})
