import rateLimit from 'express-rate-limit'
import { body, validationResult } from 'express-validator'

// Middleware de rate limiting: 10 peticiones por minuto por IP
const comentariosLimiter = rateLimit({
  windowMs: 60 * 1000,      // 1 minuto
  max: 10,
  message: { error: 'Demasiadas peticiones, intenta de nuevo en un minuto' },
  standardHeaders: true,
  legacyHeaders: false,
})

// Middleware personalizado para sanitizar HTML/JS
const sanitizarHtmlJs = (req, res, next) => {
  if (req.body.texto) {
    // Escapa caracteres peligrosos
    req.body.texto = req.body.texto
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
  }
  next()
}

export function comentariosRoutes(app) {
  app.post('/api/v1/comentarios',
    comentariosLimiter,
    sanitizarHtmlJs,
    // Validaciones
    body('puntuacion').isInt({ min: 1, max: 5 }).withMessage('La puntuación debe ser un entero entre 1 y 5'),
    body('texto').isLength({ max: 200 }).withMessage('El texto no puede superar los 200 caracteres'),
    (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() })
      }
    
      res.status(201).json({
        mensaje: 'Comentario recibido',
        datos: req.body
      })
    }
  )
}