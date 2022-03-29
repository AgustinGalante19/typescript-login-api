import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name: String,
    brand: String,
    model: String,
    quantity: Number,
    seller_id: Schema.Types.ObjectId,
}, {
    versionKey: false,
});

export default model("Product", productSchema);