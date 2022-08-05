import express from 'express'
import cors from 'cors'

const expressApp = express()

// Middlewares
expressApp.use(cors())
expressApp.use(express.json())
expressApp.use(express.urlencoded({ extended: true }))

export default expressApp
