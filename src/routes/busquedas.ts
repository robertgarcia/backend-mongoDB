/**
 * todo
 * Ruta : /api/todo:busqueda
 */

import exp from 'express';

import { validarJWT } from '../middlewares/';
import { getBusquedaGlobal } from '../controllers/busquedas';

const busquedaRouter = exp.Router();
busquedaRouter.get( '/:busqueda', validarJWT, getBusquedaGlobal );

export { busquedaRouter };