/**
 * Hospitales
 * Ruta : /api/hospitales
 */

import exp from 'express';
import checkAPIs from 'express-validator';

import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';

import { getHospitales, saveHospital, updateHospital, deleteHospital } from '../controllers/hospitales'

const hospitalRouter = exp.Router();
const { check } = checkAPIs;

hospitalRouter.get( '/', getHospitales );
hospitalRouter.post( '/', [], saveHospital );
hospitalRouter.put( '/:id', [], updateHospital );
hospitalRouter.delete( '/:id' , deleteHospital );

export { hospitalRouter };