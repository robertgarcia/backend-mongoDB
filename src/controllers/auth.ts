import { Request, Response } from 'express';
import bycryptjs from 'bcryptjs';

import { Usuario } from '../models/usuario';
import { IUsuario } from '../interfaces/usuario';
import { generarJWT } from '../helpers/jwt';

const { compareSync } = bycryptjs;

const login = async ( req: Request, res: Response ) => {
    try {
        const { email, password }:IUsuario = req.body;
        const userDB = await Usuario.findOne({ email });

        if ( !userDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales Incorrectas / Usuario no encontrado'
            });
        }

        const validPassword = compareSync( password, userDB.get('password') );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales Incorrectas / Contraseña no valida'
            });
        }

        const token = await generarJWT( userDB._id );

        res.json({
            ok: true,
            token
        });

    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: err
        });
    }
}

export { login };