import { Request, Response } from 'express';
import bycryptjs from 'bcryptjs';

import { generarJWT } from '../helpers/jwt';
import { Hospital } from '../models/hospital';

const { hashSync, genSaltSync } = bycryptjs;
const getHospitales = async (req: Request, res: Response) => {
    try {
        const hospitales = await Hospital.find({}, 'nombre img usuario');
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
        res.json({
            ok  : true,
            mgs : "saveHospitales"
        })
    } catch (err) {
        res.status(500).json({
            ok  : false,
            msg : err
        });
    }
};

const updateHospital = async (req: Request, res: Response) => {
    try {
        res.json({
            ok  : true,
            mgs : "updateHospitales"
        })
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