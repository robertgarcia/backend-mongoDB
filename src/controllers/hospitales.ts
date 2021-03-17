import { Request, Response } from 'express';

import { Hospital } from '../models/';
import { IHospital } from '../interfaces';

const getHospitales = async (req: Request, res: Response) => {
    try {
        const hospitales = await Hospital.find().populate('usuario', 'nombre img');
        res.json({
            ok : true,
            hospitales
        })
    } catch (err) {
        res.status(500).json({
            ok  : false,
            msg : err
        });
    }
};

const saveHospital = async (req: Request, res: Response) => {
    try {
        const usuario = req.uid;
        const hospital = new Hospital({
            usuario,
            ...req.body
        });

        const hospitalDB = await hospital.save();

        res.json({
            ok       : true,
            hospital : hospitalDB,
            mgs      : 'El hospital se creo correctamente'
        });

    } catch (err) {
        res.status(500).json({
            ok  : false,
            msg : err
        });
    }
};

const updateHospital = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const uid = req.uid;

        const hospitalDB = await Hospital.findById( id );

        if ( !hospitalDB ) {
            return res.status(404).json({
                ok  : false,
                mgs : "No se encontro un Hospital con ese ID"
            })
        }

        const dataHospital = {
            ...req.body,
            usuario: uid
        }

        const updateData = await Hospital.findByIdAndUpdate( id, dataHospital, { new: true } );

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

const deleteHospital = async (req: Request, res: Response) => {
    try {
        res.json({
            ok  : true,
            mgs : "deleteHospitales"
        })
    } catch (err) {
        res.status(500).json({
            ok  : false,
            msg : err
        });
    }
};

export { getHospitales, saveHospital, updateHospital, deleteHospital };