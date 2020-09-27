import Mongoose from 'mongoose';
export interface IHospital {
    nombre   : string;
    img?     : string;
    usuario  : Mongoose.Schema.Types.ObjectId;
}