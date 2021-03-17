import { Request, Response } from 'express';
import bycryptjs from 'bcryptjs';

import { Usuario } from '../models/';
import { IUsuario } from '../interfaces/usuario';
import { generarJWT } from '../helpers/jwt';
import { googleVerify } from '../helpers/google-verify';

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

const loginGoogle = async ( req: Request, res: Response ) => {

    try {
        const googleToken = req.body.token;

        const { name, email, picture } = await googleVerify( googleToken );
        const usuarioDB = await Usuario.findOne( { email } );

        let usuario:any;

        if ( !usuarioDB ) {
            // Si no existe el usuario
            usuario = new Usuario({
                nombre : name,
                email,
                password : '@@@',
                img : picture,
                google : true
            });
        } else {
            // existe usuario
            usuario = usuarioDB;
            usuario.google = true;
            // usuario.password = '@@@';
        }

        // Guardar en DB
        await usuario.save();

        // Generar el TOKEN - JWT
        const token = await generarJWT( usuario._id );

        res.json({
            ok: true,
            msg: 'Google SingIn',
            token
        });

    } catch (err) {
        console.log(err);
        res.status(401).json({
            ok: false,
            msg: err
        });
    }
}

const renewToken = async ( req: Request, res: Response ) => {
    // Obteneos el ID
    const uid = req.uid;

    // Generar el TOKEN - JWT
    const token = await generarJWT( uid );

    res.json({
        ok : true,
        token
    })
}

export { login, loginGoogle, renewToken };