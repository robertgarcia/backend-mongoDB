import { Request, Response } from 'express';
import { Medico } from '../models/';
import { IMedico } from '../interfaces';
const getMedicos = async (req: Request, res: Response) => {
    try {
        const medicos = await Medico.find().populate('usuario', 'nombre img').populate('hospital' , 'nombre img');
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
        const usuario = req.uid;
        const medico = new Medico({
            usuario,
            ...req.body
        });

        const medicoDB = await medico.save();

        res.json({
            ok     : true,
            medico : medicoDB,
            mgs    : 'Medico creado correctamente'
        });

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