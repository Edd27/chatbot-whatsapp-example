import express from 'express'

const expressApp = express()

// Middlewares
expressApp.use(express.json())

export default expressApp
