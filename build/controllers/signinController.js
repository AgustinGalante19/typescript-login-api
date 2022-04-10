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
const validateChars_1 = __importDefault(require("../services/validateChars"));
class signinCtrls {
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Get the user data from the request body.
            const { username, password } = req.body;
            //* This conditional statement is to check if the username have valid characters.
            if (!(0, validateChars_1.default)(username)) {
                return res.status(400).json({
                    status: 400,
                    message: 'Username must be alphanumeric'
                });
                //* This conditional statement is to check if the password have valid characters.
            }
            else if (!(0, validateChars_1.default)(password)) {
                return res.status(400).json({
                    status: 400,
                    message: 'Password must be alphanumeric'
                });
                //* If everithything is ok, then we can proceed to validate if te user exists.
            }
            else {
                try {
                    const user = yield userModel_1.default.findOne({ username });
                    //* If the user doesn't exist, then we can return a message.
                    if (!user)
                        return res.status(203).json({ username: false }).end();
                    //* Desencrypt the password and compare with the original password, if is valid return a true else a false.
                    const pswIsValid = yield user.validatePassword(password);
                    //* If the password isn't valid, return a message with the error.
                    if (!pswIsValid) {
                        console.log("invalid password");
                        return res.status(203).json({ password: pswIsValid }).end();
                    }
                    //* The token is created and sent as response.
                    const token = (0, TokenLibs_1.createToken)(user._id);
                    //* If everithing is ok, then we can return the user data with the token.
                    return res.header("auth-token", token).json({ user, token });
                }
                catch (err) {
                    //* If we have an unhandled error, we return a error message.
                    return res.status(500).send("e500: server error").end();
                }
            }
        });
    }
}
const signinController = new signinCtrls();
exports.default = signinController;
