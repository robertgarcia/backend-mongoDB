/**
 * Ruta : /api/login
 */
import exp from 'express';
import checkAPIs from 'express-validator';

import { login, loginGoogle } from '../controllers/auth'
import { validarCampos } from '../middlewares/';

const loginRouter = exp.Router();
const { check } = checkAPIs;

loginRouter.post('/', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login );

loginRouter.post('/google', [
    check('token', 'El token de Google es obligatorio').not().isEmpty(),
    validarCampos
], loginGoogle );

export { loginRouter };