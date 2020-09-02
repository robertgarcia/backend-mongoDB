// require('dotenv').config();
import dot from 'dotenv';
import corsx from 'cors';
import app from 'express';

// Implementamos las configuraciones globales
dot.config();

// Configurar CORS
app().use( corsx() );

// Conexion a Base de datos
import dbConection  from './src/database/config';
dbConection();

// Rutas
app().get( '/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola Mundo'
    })
});

app().listen(process.env.PORT, () => {
    console.log(`Servidor correndo en puerto : ${ process.env.PORT }`);
});