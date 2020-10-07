import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { v4 } from 'uuid';

import { updateImg } from '../helpers/files';
// import { Usuario, Medico, Hospital } from '../models';

const fileUpload = async (req: Request, res: Response) => {
    try {
        const tipo  = req.params.tipo;
        const id    = req.params.id;

        const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
        if ( !tiposValidos.includes(tipo) ) {
            return res.status(400).json({
                ok  : false,
                msg : 'No existe una ruta configurada para los valores que acaba de ingresar'
            });
        }

        if ( !req.files || Object.keys(req.files).length === 0 ) {
            return res.status(400).send({
                ok  : false,
                msg : 'No se encontro ningun archivo'
            });
        }

        const file = req.files.imagen;
        const shortName = file.name.split('.');
        const fileExt = shortName[ shortName.length - 1 ];
        const extValid = ['png', 'jpg', 'jpeg', 'gif'];

        if ( !extValid.includes(fileExt) ) {
            return res.status(400).json({
                ok  : false,
                msg : 'No es una extensión permitida'
            });
        }

        const fileName = `${ v4() }.${ fileExt }`;
        const pathFile = `./uploads/${ tipo }/${ fileName }`;

        file.mv( pathFile, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    ok  : false,
                    msg : 'Error al mover la imagen'
                });
            }

            updateImg( tipo, id, fileName );

            res.json({
                ok      : true,
                msg     : 'Archivo subido',
                fileName
            });

        });


    } catch (err) {
        res.status(500).json({
            ok  : false,
            msg : err
        });
    }
};

const getImg = ( req:Request, res: Response ) => {
    const dirName2 = fs.realpathSync('.');
    // const dirName2 = process.cwd();
    // const dirName2 = path.resolve();
    // const dirName2 = path.resolve(path.dirname(''));
    const tipo = req.params.tipo;
    const foto = req.params.foto;
    const pathImg = path.join( `${ dirName2 }`, `uploads/${ tipo }/${ foto }` );

    if ( fs.existsSync( pathImg ) ){
        res.sendFile( pathImg );
    } else {
        res.sendFile( path.join( `${ dirName2 }`, `uploads/no-img.jpg` ) );
    }

}

export { fileUpload, getImg };