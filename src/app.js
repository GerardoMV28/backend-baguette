import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { pedidosRoutes } from './rutas/pedidos.js'
import { comentariosRoutes } from './rutas/comentarios.js'

const app = express()

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://frontend-baguette-production-9ebe.up.railway.app'
  ],
  credentials: true
}))

app.use(bodyParser.json())

// Solo rutas de pedidos
pedidosRoutes(app)
comentariosRoutes(app)

app.get('/', (req, res) => {
  res.send('Hola from Express!')
})

export { app }