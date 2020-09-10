import { Request, Response } from 'express';
import { Usuario } from '../models/usuario';

const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await Usuario.find({}, 'nombre email role google');
        res.json({
            ok: true,
            users
        })
    } catch (err) {
        console.log('err' + err);
        res.status(500).send(err);
    }
};

const saveUser = async (req: Request, res: Response) => {
    try {
        const { email, pasword, nombre } = req.body;
        const existe = await Usuario.findOne({ email });

        if (existe) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese correo.'
            });
        }

        const user = new Usuario( req.body );
        await user.save();

        res.json({
            user
        });
    } catch (err) {
        console.log('err' + err);
        res.status(500).send(err);
    }
};

export { getUsers, saveUser };