/**
 * Ruta : /api/usuarios
 */
import exp from 'express';
import checkAPIs from 'express-validator';

import { getUsers, saveUser, updateUser, deleteUser } from '../controllers/usuarios';
import { validarCampos } from '../middlewares/validar-campos';

const userRouter = exp.Router();
const { check } = checkAPIs;

userRouter.get( '/', getUsers );
userRouter.post( '/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    validarCampos
], saveUser );
userRouter.put( '/:id', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
    validarCampos
], updateUser );
userRouter.delete( '/:id', deleteUser );

export { userRouter };