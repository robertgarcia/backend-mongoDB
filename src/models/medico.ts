import Mongoose from 'mongoose';

const MedicoSchema = new Mongoose.Schema({
    nombre :{
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    hospital: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Hospital'
    }
}, {
    collection: 'medicos'
});

MedicoSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    // object.id = _id;
    return object;
});

const Medico = Mongoose.model('Medico', MedicoSchema);
export { Medico }