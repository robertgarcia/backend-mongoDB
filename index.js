require('dotenv').config();

const express = require('express');
const cors = require('cors');

//Crear el servidor express
const app = express();

// Configurar CORS
app.use( cors() );

// Conexion a Base de datos
const { dbConection } = require('./database/config');
dbConection();

// Rutas
app.get( '/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola Mundo'
    })
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor correndo en puerto : ${ process.env.PORT }`);
});