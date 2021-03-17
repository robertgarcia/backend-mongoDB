import jwt from 'jsonwebtoken'

const generarJWT = (uid: string) => {
    return new Promise( ( resolve: any, reject: any ) => {

        const payload = {
            uid
        }

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "12h"
        }, ( err, token ) => {
            if ( err ) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                resolve( token );
            }
        });
    });
}

export { generarJWT };