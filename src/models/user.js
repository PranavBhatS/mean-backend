import { Schema as _Schema, model } from 'mongoose';

import uniqueValidator from "mongoose-unique-validator";

const Schema = _Schema;
const userSchema = new Schema({
    'email': { type: String, required: true, unique: true },
    'password': { type: String, required: true },
},
    {
        collection: 'Users'
    });

userSchema.plugin(uniqueValidator);
export default model('Users', userSchema);
