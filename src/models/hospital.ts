import Mongoose from 'mongoose';

const HospitalSchema = new Mongoose.Schema({
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
    }
}, {
    collection: 'hospitales'
});

HospitalSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    // object.id = _id;
    return object;
});

const Hospital = Mongoose.model('Hospital', HospitalSchema);
export { Hospital }