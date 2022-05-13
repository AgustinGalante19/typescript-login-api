import { Document, Schema } from "mongoose";

export default interface IUser extends Document {
    name: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    products: Schema.Types.ObjectId[];
    description: string;
    encryptPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
}