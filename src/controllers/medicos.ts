import { Request, Response } from 'express';
import bycryptjs from 'bcryptjs';

import { generarJWT } from '../helpers/jwt';
import { Medico } from '../models/medico';

const { hashSync, genSaltSync } = bycryptjs;
const getMedicos = async (req: Request, res: Response) => {
    try {
        const medicos = await Medico.find({}, 'nombre img usuario');
        res.json({
            ok : true,
            medicos
        })
    } catch (err) {
        res.status(500).json({
            ok  : false,
            msg : err
        });
    }
};

const saveMedico = async (req: Request, res: Response) => {
    try {
        res.json({
            ok  : true,
            mgs : "saveMedico"
        })
    } catch (err) {
        res.status(500).json({
            ok  : false,
            msg : err
        });
    }
};

const updateMedico = async (req: Request, res: Response) => {
    try {
        res.json({
            ok  : true,
            mgs : "updateMedico"
        })
    } catch (err) {
        res.status(500).json({
            ok  : false,
            msg : err
        });
    }
};

const deleteMedico = async (req: Request, res: Response) => {
    try {
        res.json({
            ok  : true,
            mgs : "deleteMedico"
        })
    } catch (err) {
        res.status(500).json({
            ok  : false,
            msg : err
        });
    }
};

export { getMedicos, saveMedico, updateMedico, deleteMedico };