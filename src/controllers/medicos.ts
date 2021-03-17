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
        const id = req.params.id;
        const uid = req.uid;

        const medicoDB = await Medico.findById( id );

        if ( !medicoDB ) {
            return res.status(404).json({
                ok  : false,
                mgs : "No se encontro un Medico con ese ID"
            })
        }

        const dataMedico = {
            ...req.body,
            usuario: uid
        }

        const updateData = await Medico.findByIdAndUpdate( id, dataMedico, { new: true } );

        res.json({
            ok  : true,
            hospital : updateData
        });

    } catch (err) {
        res.status(500).json({
            ok  : false,
            msg : err
        });
    }
};

const deleteMedico = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const medicoDB = await Medico.findById( id );

        if ( !medicoDB ) {
            return res.status(404).json({
                ok  : false,
                mgs : "No se encontro un Hospital con ese ID"
            })
        }

        const deleteData = await Medico.findByIdAndDelete( id );

        res.json({
            ok  : true,
            hospital : deleteData
        });
    } catch (err) {
        res.status(500).json({
            ok  : false,
            msg : err
        });
    }
};

export { getMedicos, saveMedico, updateMedico, deleteMedico };