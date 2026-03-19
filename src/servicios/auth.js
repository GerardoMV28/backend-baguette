import Usuario from '../bd/modelos/usuario.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'full-stack';

// ✅ Función para registrar usuario
export async function registerUser(userData) {
  try {
    const existingUser = await Usuario.findOne({ username: userData.username });
    if (existingUser) {
      throw new Error('El nombre de usuario ya está registrado');
    }

    const user = new Usuario({
      username: userData.username,
      password: userData.password,
      nombre: userData.nombre || userData.username
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id, username: user.username, nombre: user.nombre },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return {
      token,
      user: {
        id: user._id,
        username: user.username,
        nombre: user.nombre
      }
    };
  } catch (error) {
    throw error;
  }
}

// ✅ Función para login
export async function loginUser(username, password) {
  try {
    const user = await Usuario.findOne({ username });
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) {
      throw new Error('Credenciales inválidas');
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, nombre: user.nombre },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return {
      token,
      user: {
        id: user._id,
        username: user.username,
        nombre: user.nombre
      }
    };
  } catch (error) {
    throw error;
  }
}

// ✅ Función para verificar token
export async function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await Usuario.findById(decoded.id).select('-password');
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return user;
  } catch (error) {
    throw error;
  }
}