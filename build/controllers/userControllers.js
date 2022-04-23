"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
//? implent token?
class UserControllers {
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { role } = req.headers;
            try {
                if (role === "admin") {
                    const users = yield userModel_1.default.find().populate("products");
                    return res.json(users);
                }
                else {
                    return res.status(403).send("Forbidden").end();
                }
            }
            catch (err) {
                return res.json({ error: err });
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield userModel_1.default.findById({ _id: id }, { password: 0, products: 0, username: 0, _id: 0 });
            return res.json(user);
        });
    }
    profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.default.findById(req.userId, { password: 0 });
                if (!user)
                    return res.status(404).json("User not found.");
                return res.json(user);
            }
            catch (err) {
                return res.status(400).send(false).end();
            }
        });
    }
}
const userController = new UserControllers();
exports.default = userController;
