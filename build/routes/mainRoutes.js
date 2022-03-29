"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const authController_1 = __importDefault(require("../controllers/authController"));
const verifyToken_1 = require("../libs/verifyToken");
class Routes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get("/", (req, res) => {
            res.sendFile(path_1.default.join(__dirname, '../views/index.html'));
        });
        this.router.post("/signup", authController_1.default.signup);
        this.router.post("/signin", authController_1.default.signin);
        this.router.get("/tokenvalidation", verifyToken_1.TokenValidation, authController_1.default.profile);
        this.router.get("/userId", verifyToken_1.getPayload);
    }
}
const routes = new Routes();
exports.default = routes.router;
