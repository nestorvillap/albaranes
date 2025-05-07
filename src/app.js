// Imports
import express from 'express'
import cors from 'cors'
import { userRouter } from './routes/user.js'
import { clientRouter } from './routes/client.js'
// import { projectRouter } from './routes/project.js'
// import { deliveryNoteRouter } from './routes/deliveryNote.js'
import { swaggerMiddleware } from './config/swagger.js'

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Rutas
app.use('/api/user', userRouter)
app.use('/api/client', clientRouter)
// app.use('/api/project', projectRouter)
// app.use('/api/deliveryNote', deliveryNoteRouter)
// Iniciar documentación con Swagger
swaggerMiddleware(app)

export { app }
