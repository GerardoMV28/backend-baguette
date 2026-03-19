// backend/src/app.js
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { pedidosRoutes } from './rutas/pedidos.js'
import { usuarioRoutes } from './rutas/usuarios.js'
import  authRoutes  from './rutas/auth.js'

// Crear la aplicación Express
const app = express()
// Configurar middlewaress
app.use(cors({
  origin: [
    'http://localhost:5173',  // Desarrollo local
    'https://frontend-baguette-production-9ebe.up.railway.app'
  ],
  credentials: true
}))
app.use(bodyParser.json())


// Configurar rutas
app.use('/api/v1/auth', authRoutes)
pedidosRoutes(app)
usuarioRoutes(app)

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Hola from Express!')
})


export { app }
