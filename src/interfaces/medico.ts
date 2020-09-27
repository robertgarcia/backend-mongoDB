import Mongoose from 'mongoose';
export interface IMedico {
    nombre   : string;
    img?     : string;
    usuario  : Mongoose.Schema.Types.ObjectId;
    hospital : Mongoose.Schema.Types.ObjectId;
}