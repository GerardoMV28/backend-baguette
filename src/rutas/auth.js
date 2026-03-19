    import express from 'express';
    import { registerUser, loginUser, verifyToken } from '../servicios/auth.js';

    const router = express.Router();


    router.get('/test', (req, res) => {
  res.json({ 
    message: '✅ Ruta de auth funcionando',
    timestamp: new Date().toISOString()
  });
});

    // Registro
    router.post('/register', async (req, res) => {
    try {
        const { username, password, nombre } = req.body;

        // Validaciones básicas
        if (!username || !password) {
        return res.status(400).json({ 
            message: 'Username y password son obligatorios' 
        });
        }

        if (password.length < 6) {
        return res.status(400).json({ 
            message: 'La contraseña debe tener al menos 6 caracteres' 
        });
        }

        const result = await registerUser({ username, password, nombre });
        res.status(201).json(result);
    } catch (error) {
        if (error.message === 'El nombre de usuario ya está registrado') {
        return res.status(400).json({ message: error.message });
        }
        console.error('Error en registro:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
    });

    // Login
    router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
        return res.status(400).json({ 
            message: 'Username y password son obligatorios' 
        });
        }

        const result = await loginUser(username, password);
        res.json(result);
    } catch (error) {
        if (error.message === 'Credenciales inválidas') {
        return res.status(401).json({ message: error.message });
        }
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
    });

    // Verificar token
    router.get('/verify', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
        }

        const user = await verifyToken(token);
        res.json({ user });
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
    });

    export default router;