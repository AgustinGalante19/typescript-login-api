"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = __importDefault(require("../controllers/productController"));
class ProductRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/stock", productController_1.default.getUserProducts);
        this.router.get("/stock/:id", productController_1.default.getProductById);
        this.router.post("/stock", productController_1.default.addProduct);
        this.router.put("/stock/:id", productController_1.default.modifyProduct);
        this.router.delete("/stock/:id/", productController_1.default.removeProduct);
    }
}
const productRoutes = new ProductRoutes();
exports.default = productRoutes.router;
