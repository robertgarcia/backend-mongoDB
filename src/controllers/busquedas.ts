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

const getColeccion = async (req: Request, res: Response) => {
    try {
        const busqueda = req.params.busqueda;
        const tabla = req.params.tabla;
        const regex = new RegExp( busqueda, 'i' );

        let data = [];

        switch ( tabla ) {
            case 'medicos' :
                data = await Medico.find( { nombre: regex } ).populate('usuario', 'nombre img').populate('hopital', 'nombre img');
            break;
            case 'hospitales' :
                data = await Hospital.find( { nombre: regex } ).populate('usuario', 'nombre img');
            break;
            case 'usuarios' :
                data = await Usuario.find( { nombre: regex } );
            break;
            default :
                return res.status(404).json({
                    ok  : false,
                    msg : 'El paremetro de la coleccion no es valido'
                })
            break;
        }

        res.json({
            ok  : true,
            data
        });

    } catch (err) {
        res.status(500).json({
            ok  : false,
            msg : err
        });
    }
};

export { getBusquedaGlobal, getColeccion };