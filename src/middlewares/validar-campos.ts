import { Request, Response, NextFunction } from 'express';
import checkAPIs from 'express-validator/check';
const { validationResult } = checkAPIs;
const validarCampos = (req: Request, res: Response, next: NextFunction) => {
    const errExpress = validationResult(req);
    if ( !errExpress.isEmpty() ){
        return res.status(400).json({
            ok: false,
            err: errExpress.mapped(),
            msg: 'Ingrese todos los campos requeridos'
        });
    }
    next();

}
export { validarCampos };