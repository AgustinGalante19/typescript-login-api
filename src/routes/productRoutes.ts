import { Router } from "express";
import productControllers from "../controllers/productController";

class ProductRoutes {

    router: Router;    
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get("/stock", productControllers.getUserProducts);
        this.router.get("/stock/:id", productControllers.getProductById);
        this.router.post("/stock", productControllers.addProduct);
        this.router.put("/stock/:id", productControllers.modifyProduct);
        this.router.delete("/stock/:id/", productControllers.removeProduct);
    }
}

const productRoutes = new ProductRoutes();
export default productRoutes.router;