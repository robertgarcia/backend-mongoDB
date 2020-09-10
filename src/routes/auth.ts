/**
 * Ruta : /api/login
 */
import exp from 'express';
import checkAPIs from 'express-validator';

import { login } from '../controllers/auth'
import { validarCampos } from '../middlewares/validar-campos';

const loginRouter = exp.Router();
const { check } = checkAPIs;

loginRouter.post('/', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login );

export { loginRouter };