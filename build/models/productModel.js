"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: String,
    brand: String,
    model: String,
    quantity: Number,
    seller_id: mongoose_1.Schema.Types.ObjectId,
}, {
    versionKey: false,
});
exports.default = (0, mongoose_1.model)("Product", productSchema);
