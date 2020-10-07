import fs from 'fs';
import { Hospital, Medico, Usuario } from '../models';

const updateImg = async( tipo: string, id: string, fileName: string ) => {
    switch ( tipo ) {
        case 'medicos' :
            const medico = await Medico.findById(id);

            if ( !medico ) {
                return false;
            }

            const pathMedicos = `./uploads/medicos/${ medico.get('img') }`;
            deleteImg(pathMedicos);

            medico.set('img', fileName);
            await medico.save();

            return true;
        break;
        case 'hospitales' :
            const hospital = await Hospital.findById(id);

            if ( !hospital ) {
                return false;
            }

            const pathHospitales = `./uploads/hospitales/${ hospital.get('img') }`;
            deleteImg(pathHospitales);

            hospital.set('img', fileName);
            await hospital.save();

            return true;
        break;
        case 'usuarios' :
            const usuario = await Usuario.findById(id);

            if ( !usuario ) {
                return false;
            }

            const pathUsuarios = `./uploads/usuarios/${ usuario.get('img') }`;
            deleteImg(pathUsuarios);

            usuario.set('img', fileName);
            await usuario.save();

            return true;
        break;
    }
}

const deleteImg = async( path: string ) => {
    if ( fs.existsSync( path ) ){
        fs.unlinkSync( path );
    }
}

export { updateImg };