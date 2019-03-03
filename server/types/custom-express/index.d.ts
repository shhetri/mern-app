import express from 'express'

declare global {
  namespace Express {
    interface Request {
      user?: { username: string }
      [prop: string]: any
    }
  }
}
