import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';

const jwt = jsonwebtoken;
const validarJWT = (req: Request, res: Response, next: NextFunction) => {
    // Leer Token
    const token = req.header('x-token');
    if ( !token ) {
        return res.status(401).json({
            ok  : false,
            msg : 'No hay token en la petición'
        });
    }

    try {
        const { uid }  = jwt.verify( token, process.env.JWT_SECRET ) as any;
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            ok  : false,
            msg : 'Token no válido'
        });
    }
}
export { validarJWT };