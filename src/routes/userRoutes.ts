import { Router } from "express";
import userControllers from "../controllers/userControllers";
class UserRoutes {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get("/all", userControllers.getUsers);
        this.router.get("/:id", userControllers.getUserById);
        this.router.post("/edit/:id", userControllers.editProfile);
    }

}

const userRotes = new UserRoutes();
export default userRotes.router;