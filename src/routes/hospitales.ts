/**
 * Hospitales
 * Ruta : /api/hospitales
 */

import exp from 'express';
import checkAPIs from 'express-validator';

import { validarCampos, validarJWT } from '../middlewares/';
import { getHospitales, saveHospital, updateHospital, deleteHospital } from '../controllers/hospitales'

const hospitalRouter = exp.Router();
const { check } = checkAPIs;

hospitalRouter.get( '/', getHospitales );
hospitalRouter.post( '/', [
    validarJWT,
    check('nombre', 'El nombre del hospital es requerido').not().isEmpty(),
    validarCampos
    ], saveHospital );
hospitalRouter.put( '/:id', [
    validarJWT,
    check('nombre', 'El nombre del hospital es requerido').not().isEmpty(),
    validarCampos
], updateHospital );
hospitalRouter.delete( '/:id' , deleteHospital );

export { hospitalRouter };