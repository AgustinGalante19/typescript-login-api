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
class signinCtrls {
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            const user = yield userModel_1.default.findOne({ username });
            try {
                if (!user)
                    return res.status(203).json({ username: false }).end();
                const pswIsValid = yield user.validatePassword(password);
                if (!pswIsValid) {
                    console.log("invalid password");
                    return res.status(203).json({ password: pswIsValid }).end();
                }
                const token = (0, TokenLibs_1.createToken)(user._id);
                //!El token no se almacena en la base de datos.
                return res.header("auth-token", token).json({ user, token });
            }
            catch (err) {
                return res.status(500).send("e500: server error").end();
            }
        });
    }
}
const signinController = new signinCtrls();
exports.default = signinController;
