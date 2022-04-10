import { Request, Response } from "express";
import User from '../models/userModel';
import { createToken } from "../libs/TokenLibs";
import IUser from '../interfaces/User';
import validateChars from '../services/validateChars';

class signinCtrls {

    async signin(req: Request, res: Response): Promise<Response> {

        //Get the user data from the request body.
        const { username, password } = req.body;

        //* This conditional statement is to check if the username have valid characters.
        if (!validateChars(username)) {
            return res.status(400).json({
                status: 400,
                message: 'Username must be alphanumeric'
            });
            //* This conditional statement is to check if the password have valid characters.
        } else if (!validateChars(password)) {
            return res.status(400).json({
                status: 400,
                message: 'Password must be alphanumeric'
            });
            //* If everithything is ok, then we can proceed to validate if te user exists.
        } else {
            try {

                const user: IUser | null = await User.findOne({ username });

                //* If the user doesn't exist, then we can return a message.
                if (!user) return res.status(203).json({ username: false }).end();

                //* Desencrypt the password and compare with the original password, if is valid return a true else a false.
                const pswIsValid: boolean = await user.validatePassword(password);

                //* If the password isn't valid, return a message with the error.
                if (!pswIsValid) {
                    console.log("invalid password")
                    return res.status(203).json({ password: pswIsValid }).end();
                }

                //* The token is created and sent as response.
                const token = createToken(user._id);

                //* If everithing is ok, then we can return the user data with the token.
                return res.header("auth-token", token).json({ user, token });
            } catch (err) {
                //* If we have an unhandled error, we return a error message.
                return res.status(500).send("e500: server error").end();
            }
        }
    }
}

const signinController = new signinCtrls();

export default signinController;