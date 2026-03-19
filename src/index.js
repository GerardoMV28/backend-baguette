import dotenv from 'dotenv'
dotenv.config()

import { app } from './app.js'
import { initBaseDeDatos } from './bd/init.js'

try {
  await initBaseDeDatos()
  
  // 👇 Railway asigna el puerto automáticamente
  const PORT = process.env.PORT || 3002
  
  // 👇 CRUCIAL: escuchar en '0.0.0.0' para Railway
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Servidor Express ejecutandose en puerto: ${PORT}`)
    console.log(`🌍 URL en Railway: https://backend-baguette-production-fae6.up.railway.app`)
  })
  
} catch (err) {
  console.error('Error conectando a la Base de Datos:', err)
  process.exit(1)
}