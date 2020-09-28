// Generales
import dot from 'dotenv';
import corsx from 'cors';
import exp from 'express';

// Implementamos las configuraciones globales
dot.config();

// BD
import { dbConection }  from './src/database/config';

// Rutas
import { userRouter, hospitalRouter, medicoRouter, busquedaRouter, loginRouter, uploadRouter } from './src/routes/';

const app = exp();
const cors = corsx();

// Configurar CORS
app.use( cors );

// Parseamos el body
app.use( exp.json() );

// Conexion a Base de datos
dbConection();

// Rutas
app.use('/api/usuarios',  userRouter);
app.use('/api/hospitales',  hospitalRouter);
app.use('/api/medicos',  medicoRouter);
app.use('/api/todo',  busquedaRouter);
app.use('/api/login',  loginRouter);
app.use('/api/upload',  uploadRouter);

app.listen(process.env.PORT, () => {
    console.log(`Servidor correndo en puerto : ${ process.env.PORT }`);
});