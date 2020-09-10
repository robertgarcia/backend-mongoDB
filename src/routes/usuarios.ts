/**
 * Ruta : /api/usuarios
 */
import exp from 'express';
import checkAPIs from 'express-validator/check';

import { getUsers, saveUser } from '../controllers/usuarios';
import { validarCampos } from '../middlewares/validar-campos';

const userRouter = exp.Router();
const { check } = checkAPIs;

userRouter.get( '/', getUsers);
userRouter.post( '/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    validarCampos
], saveUser);

export { userRouter };