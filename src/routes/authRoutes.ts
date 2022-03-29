import { Router } from "express";
import signupControllers from '../controllers/signupController';
import signinControllers from '../controllers/signinController'
import userControllers from '../controllers/userControllers'
import { TokenValidation, getUserId, isValid } from '../libs/TokenLibs';

class Routes {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.post("/signup", signupControllers.signup);
        this.router.post("/signin", signinControllers.signin);
        this.router.get("/userId", getUserId);
        this.router.get("/validateToken", isValid);
        this.router.get("/getData", TokenValidation, userControllers.profile);
    }

}

const routes = new Routes();

export default routes.router;