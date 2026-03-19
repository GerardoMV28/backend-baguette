import dotenv from 'dotenv'
dotenv.config()

import { app } from './app.js'
import { initBaseDeDatos } from './bd/init.js'

try {
  await initBaseDeDatos()
  
  // 👇 EL PUERTO DE RAILWAY (lo asigna automáticamente)
  const PORT = process.env.PORT || 3002
  
  // 👇 IMPORTANTE: Escuchar en '0.0.0.0' para que Railway pueda enrutar
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Servidor Express ejecutandose en puerto: ${PORT}`)
    console.log(`🌍 Accesible desde Railway en: https://backend-baguette-production-fae6.up.railway.app`)
  })
  
} catch (err) {
  console.error('Error conectando a la Base de Datos:', err)
  process.exit(1)  // Salir con error para que Railway reinicie
}