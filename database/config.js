const mongoose = require('mongoose');
const dbConection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        console.log('DB Iniciada!');
    } catch (error) {
        console.log(error);
        console.log('Error al iniciar la conexion a la base de datos!');
    }
};

module.exports = {
    dbConection
};