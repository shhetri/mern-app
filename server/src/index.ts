import mongoose from 'mongoose'
import express, { Request, Response } from 'express'

const app = express()

app.get('/', (req: Request, res: Response) => {
  mongoose.connect('mongodb://mongo:27017', (err: Error) => {
    if (err) {
      res.send({ error: 'Can not connect to mongo' })
      return
    }
    res.send({ success: 'Connected to mongo....' })
  })
})

app.listen(3000, x => {
  // tslint:disable-next-line: no-console
  console.log('successfully started server.')
})
