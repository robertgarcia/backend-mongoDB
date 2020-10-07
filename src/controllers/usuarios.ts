import { Request, Response } from 'express';
import bycryptjs from 'bcryptjs';

import { generarJWT } from '../helpers/jwt';
import { Usuario } from '../models/';
import { IUsuario } from '../interfaces/';

const { hashSync, genSaltSync } = bycryptjs;

const getUsers = async (req: Request, res: Response) => {
    try {
        const desde = Number(req.query.desde) || 0;
        const query = { estado: true };

        const [ users, total ] = await Promise.all([
            Usuario.find(query, 'nombre email role google estado img').skip(desde).limit(5),
            Usuario.countDocuments({})
        ]);

        res.json({
            ok    : true,
            users,
            uid   : req.uid,
            total
        })
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: err
        });
    }
};

const saveUser = async (req: Request, res: Response) => {
    try {
        const { email, password }:IUsuario = req.body;
        const userDB = await Usuario.findOne({ email });

        if ( userDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese correo.'
            });
        }

        // Encriptar contraseña
        const salt = genSaltSync();
        req.body.password = hashSync(password, salt);

        const user = new Usuario( req.body );
        await user.save();

        const token = await generarJWT( user._id );

        res.json({
            user,
            token
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: err
        });
    }
};

const updateUser = async ( req: Request, res: Response ) => {
    try {
        // TODO: Validar token y comprobar si es el usuario correcto
        const uid = req.params.id;
        const userDB = await Usuario.findById({ _id: uid });

        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese UID'
            });
        }

        const campos: IUsuario = req.body;

        if ( userDB.get('email') !== campos.email ) {
            const existeEmail = await Usuario.findOne( { email: campos.email } );
            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese correo'
                });
            }
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuarioActualizado
        });

    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: err
        });
    }
};

const deleteUser = async ( req: Request, res: Response ) => {

    try {
        // TODO: Validar token y comprobar si es el usuario correcto
        const uid = req.params.id;
        const userDB = await Usuario.findById({ _id: uid });

        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese UID'
            });
        }

        // const usuarioEliminado = await Usuario.findByIdAndDelete( uid );
        const usuarioEliminado = await Usuario.findByIdAndUpdate( uid, { estado: false }, { new: true } );

        res.json({
            ok: true,
            usuarioEliminado
        });

    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: err
        });
    }
}

export { getUsers, saveUser, updateUser, deleteUser };