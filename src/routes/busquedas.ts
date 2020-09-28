/**
 * todo
 * Ruta : /api/todo:busqueda
 */

import exp from 'express';

import { validarJWT } from '../middlewares/';
import { getBusquedaGlobal, getColeccion } from '../controllers/busquedas';

const busquedaRouter = exp.Router();
busquedaRouter.get( '/:busqueda', validarJWT, getBusquedaGlobal );
busquedaRouter.get( '/coleccion/:tabla/:busqueda', validarJWT, getColeccion );

export { busquedaRouter };