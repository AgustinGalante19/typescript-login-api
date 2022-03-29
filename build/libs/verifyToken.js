"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPayload = exports.TokenValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TokenValidation = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token)
        return res.status(401).json("access denied.");
    const payload = jsonwebtoken_1.default.verify(token, process.env.MY_SECRET || "tokentest");
    req.userId = payload._id;
    next();
};
exports.TokenValidation = TokenValidation;
const getPayload = (req, res) => {
    const token = req.header("auth-token");
    if (!token)
        return res.status(401).json("access denied.");
    const payload = jsonwebtoken_1.default.verify(token, process.env.MY_SECRET || "tokentest");
    const userId = payload._id;
    res.json({ userId, payload });
};
exports.getPayload = getPayload;
