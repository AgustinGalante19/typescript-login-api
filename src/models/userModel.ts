import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

import IUser from '../interfaces/User';

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, unique: true, required: true, min: 4, lowercase: true },
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, required: true, min: 8 },
    description: { type: String, required: false, max: 250, default: "" },
    products: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }],
},
    {
        versionKey: false,
    });

UserSchema.methods.encryptPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

UserSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
}

export default model<IUser>("UserJWT", UserSchema);