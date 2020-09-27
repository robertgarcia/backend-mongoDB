import { Request, Response } from 'express';
import { Usuario, Medico, Hospital } from '../models';

const getBusquedaGlobal = async (req: Request, res: Response) => {
    try {
        const param = req.params.busqueda;
        const regex = new RegExp( param, 'i' );

        const [ usuarios, medicos, hospitales ] = await Promise.all([
            Usuario.find({ nombre : regex }),
            Medico.find({ nombre : regex }),
            Hospital.find({ nombre : regex })
        ]);

        res.json({
            ok  : true,
            usuarios,
            medicos,
            hospitales
        });

    } catch (err) {
        res.status(500).json({
            ok  : false,
            msg : err
        });
    }
};

export { getBusquedaGlobal };