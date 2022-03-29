"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signupController_1 = __importDefault(require("../controllers/signupController"));
const signinController_1 = __importDefault(require("../controllers/signinController"));
const userControllers_1 = __importDefault(require("../controllers/userControllers"));
const TokenLibs_1 = require("../libs/TokenLibs");
class Routes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post("/signup", signupController_1.default.signup);
        this.router.post("/signin", signinController_1.default.signin);
        this.router.get("/userId", TokenLibs_1.getUserId);
        this.router.get("/validateToken", TokenLibs_1.isValid);
        this.router.get("/getData", TokenLibs_1.TokenValidation, userControllers_1.default.profile);
    }
}
const routes = new Routes();
exports.default = routes.router;
