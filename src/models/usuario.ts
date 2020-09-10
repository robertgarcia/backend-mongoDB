// import { Schema, Model } from 'mongoose';
// 02331479
import Mongoose from 'mongoose';
const UsuarioSchema = new Mongoose.Schema({
    nombre :{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    role:{
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google:{
        type: Boolean,
        default: false,
    }
});

UsuarioSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

const Usuario = Mongoose.model('Usuario', UsuarioSchema);
export { Usuario }