import express from 'express'

const expressApp = express()

// Middlewares
expressApp.use(express.json())
expressApp.use(express.urlencoded({ extended: true }))

export default expressApp
