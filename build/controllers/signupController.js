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
const TokenLibs_1 = require("../libs/TokenLibs");
class signupCtrls {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Saving a new user.
            try {
                const { name, lastname, email, username, password } = req.body;
                const user = new userModel_1.default({
                    name,
                    lastname,
                    email,
                    username,
                    password
                });
                const userExists = yield userModel_1.default.exists({ username });
                if (userExists)
                    return res.status(203).json({ userExists: true }).end();
                const emailExists = yield userModel_1.default.exists({ email });
                if (emailExists)
                    return res.status(203).json({ emailExists: true }).end();
                user.password = yield user.encryptPassword(user.password);
                const savedUser = yield user.save();
                //Token
                const token = (0, TokenLibs_1.createToken)(user._id);
                //!El token no se almacena en la base de datos.
                return res.header("auth-token", token).json({ savedUser, token });
            }
            catch (err) {
                return res.status(500).send(err).end();
            }
        });
    }
}
const signupController = new signupCtrls();
exports.default = signupController;
