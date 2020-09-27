/**
 * Medicos
 * Ruta : /api/medicos
 */

import exp from 'express';
import checkAPIs from 'express-validator';

import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

import { getMedicos, saveMedico, updateMedico, deleteMedico } from '../controllers/medicos'

const medicoRouter = exp.Router();
const { check } = checkAPIs;

medicoRouter.get( '/', getMedicos );
medicoRouter.post( '/', [], saveMedico );
medicoRouter.put( '/:id', [], updateMedico );
medicoRouter.delete( '/:id' , deleteMedico );

export { medicoRouter };