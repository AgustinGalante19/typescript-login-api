import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Mongoose from 'mongoose';
import IPayload from "../interfaces/Payload";

export const createToken = (id: Mongoose.Types.ObjectId): string => {

    const token: string = jwt.sign({ _id: id }, process.env.MY_SECRET || "tokentest", {
        expiresIn: 60 * 60 * 24 * 7
    });
    return token;
}

export const TokenValidation = (req: Request, res: Response, next: NextFunction): boolean | Response => {

    try {
        const token: string | boolean = getToken(req);
        if (token) {
            const payload = jwt.verify(token, process.env.MY_SECRET || "tokentest") as IPayload;
            req.userId = payload._id;
            console.log("validated token.");
            next();
            return true;
        } else {
            return res.status(401).send("invalid token, signin again.");
        }
    } catch (err) {
        return res.status(200).send(false).end();
    }
}

export const getUserId = (req: Request, res: Response) => {

    const token = getToken(req);
    try {
        if (token) {
            const payload = jwt.verify(token, process.env.MY_SECRET || "tokentest") as IPayload;
            const userId = payload._id;
            return userId;
        } else {
            return res.status(401).send("invalid token, signin again.");
        }
    } catch (err) {
        return res.status(500).end();
    }
}

export const getToken = (req: Request): string => {
    const token = req.header("auth-token");
    if (!token) return "false";
    return token;
}

export const isValid = (req: Request, res: Response): Response => {

    const token = req.header("auth-token");
    try {
        if (token) {
            const payload = jwt.verify(token, process.env.MY_SECRET || "tokentest") as IPayload;
            req.userId = payload._id;
            console.log(payload);
            return res.send(true);
        } else {
            return res.status(401).send(false);
        }
    } catch (err) {
        return res.status(500).send(err).end();
    }
}