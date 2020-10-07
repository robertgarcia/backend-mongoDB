/**
 * uploads
 * Ruta : /api/uploads
 */

import exp from 'express';
import expressUpload from 'express-fileupload';

import { validarJWT } from '../middlewares/';
import { fileUpload, getImg } from '../controllers/uploads';

const uploadRouter = exp.Router();
uploadRouter.use( expressUpload() );

uploadRouter.put( '/:tipo/:id', validarJWT, fileUpload );
uploadRouter.get( '/:tipo/:foto', validarJWT, getImg );

export { uploadRouter };