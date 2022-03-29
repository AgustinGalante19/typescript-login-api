import { Document } from "mongoose";
export default interface IProduct extends Document {
    name: string,
    brand: string,
    model: string,
    quantity: number,
    seller_id: string
}