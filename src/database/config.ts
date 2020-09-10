// const mongoose = require('mongoose');
import Mongoose from 'mongoose';
const mongoose = Mongoose;
const dbConection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        await mongoose.connection.on('connected', () => {
            console.log("Mongoose default connection is open to ", process.env.DB_CNN);
        });

        await mongoose.connection.on('error', (err) =>  {
            console.log("Mongoose default connection has occured "+err+" error");
        });

        await mongoose.connection.on('disconnected', () => {
            console.log("Mongoose default connection is disconnected");
        });

        console.log('¡DB Iniciada!');
    } catch (error) {
        console.log('¡Error al iniciar la conexion a la base de datos!');
        console.log(error);
    }
};

export { dbConection };