import { Request, Response } from "express";
import User from '../models/userModel';
import IUser from "../interfaces/User";
import { createToken } from "../libs/TokenLibs";
import validateChars from '../services/validateChars';
class signupCtrls {

    async signup(req: Request, res: Response): Promise<Response> {

        //Get the user data from the request body.
        const { name, lastname, email, username, password } = req.body;

        //* This conditional statement is to check if the name have valid characters.
        if (!validateChars(name)) {
            return res.status(400).json({
                status: 400,
                message: 'Name must be alphanumeric'
            });
        }

        //* This conditional statement is to check if the last name have valid characters.
        else if (!validateChars(lastname)) {
            return res.status(400).json({
                status: 400,
                message: 'Lastname must be alphanumeric'
            });
        }

        //* This conditional statement is to check if the username have valid characters.
        else if (!validateChars(username)) {
            return res.status(400).json({ message: "Username must be alphanumeric" });
        }
        //* This conditional statement is to check if the password have valid characters.
        else if (!validateChars(password)) {
            return res.status(400).json({ message: "Password must be alphanumeric" });
        }

        //* If everithything is ok, then we can proceed to create the user in the database.
        else {
            try {

                //The user has been created with the received data.
                const user: IUser = new User({
                    name,
                    lastname,
                    email,
                    username,
                    password
                });

                //* We check if the user already exists in the database.
                const userExists = await User.exists({ username });
                if (userExists) return res.status(203).json({ userExists: true }).end();

                //* We check if the email already exists in the database.
                const emailExists = await User.exists({ email });
                if (emailExists) return res.status(203).json({ emailExists: true }).end();

                //* We encrypt the password to be stored in the database.
                user.password = await user.encryptPassword(user.password);
                user.name = user.name[0].toUpperCase() + user.name.slice(1);
                user.lastname = user.lastname[0].toUpperCase() + user.lastname.slice(1);
                const savedUser = await user.save();

                //* We create the token for the user.
                const token = createToken(user._id);

                //* We return the user and the token.
                return res.header("auth-token", token).json({ savedUser, token });
            } catch (err) {
                //* If there is an error, we return the error.
                return res.status(500).send(err).end();
            }
        }
    }
}

const signupController = new signupCtrls();

export default signupController;