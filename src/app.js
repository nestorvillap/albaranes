// Imports
import express from 'express'
import cors from 'cors'
import { userRouter } from './routes/user.js'
import { clientRouter } from './routes/client.js'
import { swaggerMiddleware } from './config/swagger.js'
const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Rutas
app.use('/api/user', userRouter)
app.use('/api/client', clientRouter)

// Iniciar documentación con Swagger
swaggerMiddleware(app)

export { app }
