"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValid = exports.getToken = exports.getUserId = exports.TokenValidation = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (id) => {
    const token = jsonwebtoken_1.default.sign({ _id: id }, process.env.MY_SECRET || "tokentest", {
        expiresIn: 60 * 60 * 24 * 7
    });
    return token;
};
exports.createToken = createToken;
const TokenValidation = (req, res, next) => {
    try {
        const token = (0, exports.getToken)(req);
        if (token) {
            const payload = jsonwebtoken_1.default.verify(token, process.env.MY_SECRET || "tokentest");
            req.userId = payload._id;
            console.log("validated token.");
            next();
            return true;
        }
        else {
            return res.status(401).send("invalid token, signin again.");
        }
    }
    catch (err) {
        return res.status(200).send(false).end();
    }
};
exports.TokenValidation = TokenValidation;
const getUserId = (req, res) => {
    const token = (0, exports.getToken)(req);
    try {
        if (token) {
            const payload = jsonwebtoken_1.default.verify(token, process.env.MY_SECRET || "tokentest");
            const userId = payload._id;
            return userId;
        }
        else {
            return res.status(401).send("invalid token, signin again.");
        }
    }
    catch (err) {
        return res.status(500).end();
    }
};
exports.getUserId = getUserId;
const getToken = (req) => {
    const token = req.header("auth-token");
    if (!token)
        return "false";
    return token;
};
exports.getToken = getToken;
const isValid = (req, res) => {
    const token = req.header("auth-token");
    try {
        if (token) {
            const payload = jsonwebtoken_1.default.verify(token, process.env.MY_SECRET || "tokentest");
            req.userId = payload._id;
            return res.send(true);
        }
        else {
            return res.status(401).send(false);
        }
    }
    catch (err) {
        return res.status(500).send(err).end();
    }
};
exports.isValid = isValid;
