import mongoose from "mongoose";

export function initBaseDeDatos() {
  // 👇 CAMBIA ESTO - usa MONGODB_URI en lugar de DATABASE_URL
  const DATABASE_URL = process.env.MONGODB_URI || process.env.DATABASE_URL;
  
  if (!DATABASE_URL) {
    throw new Error("❌ No hay URL de base de datos configurada. Define MONGODB_URI o DATABASE_URL");
  }

  mongoose.connection.on("error", (error) => {
    console.error("❌ Error de conexión a la Base de Datos:", error);
  });

  mongoose.connection.on("open", () => {
    console.info("✅ Exitosamente Conectado a la Base de Datos");
  });

  const conexion = mongoose.connect(DATABASE_URL);
  return conexion;
}