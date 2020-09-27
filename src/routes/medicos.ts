/**
 * Medicos
 * Ruta : /api/medicos
 */

import exp from 'express';
import checkAPIs from 'express-validator';

import { validarCampos, validarJWT } from '../middlewares/';
import { getMedicos, saveMedico, updateMedico, deleteMedico } from '../controllers/medicos'

const medicoRouter = exp.Router();
const { check } = checkAPIs;

medicoRouter.get( '/', getMedicos );
medicoRouter.post( '/', [
    validarJWT,
    check('nombre', 'El nombre del medico es requerido').not().isEmpty(),
    check('hospital', 'El hospital es requerido').not().isEmpty(),
    check('hospital', 'El hospital ID debe ser valido').isMongoId(),
    validarCampos
], saveMedico );
medicoRouter.put( '/:id', [], updateMedico );
medicoRouter.delete( '/:id' , deleteMedico );

export { medicoRouter };