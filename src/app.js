import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { pedidosRoutes } from './rutas/pedidos.js'
import { usuarioRoutes } from './rutas/usuarios.js'
import  authRoutes  from './rutas/auth.js'

// Crear la aplicación Express
const app = express()

// 🔍 LOGS DE DEPURACIÓN
console.log('🚀 Iniciando servidor...');
console.log('📦 Módulo authRoutes importado:', authRoutes ? 'SÍ' : 'NO');
console.log('🔍 Tipo de authRoutes:', typeof authRoutes);
console.log('📋 Rutas en authRoutes:', authRoutes?.stack?.map(r => ({
  path: r.route?.path,
  methods: r.route?.methods
})) || 'No hay rutas');

// Configurar middlewares
app.use(cors({
  origin: [
    'http://localhost:5173',  // Desarrollo local
    'https://frontend-baguette-production-9ebe.up.railway.app'
  ],
  credentials: true
}))

app.use(bodyParser.json())

// Configurar rutas
console.log('🛣️ Montando rutas de auth en /api/v1/auth');
app.use('/api/v1/auth', authRoutes)

console.log('📝 Montando rutas de pedidos y usuarios');
pedidosRoutes(app)
usuarioRoutes(app)

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Hola from Express!')
})

// 🔍 LOG DE RUTAS DISPONIBLES
console.log('✅ Rutas configuradas:');
app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log(`   ${Object.keys(r.route.methods).join(', ').toUpperCase()} ${r.route.path}`);
  }
});

export { app }