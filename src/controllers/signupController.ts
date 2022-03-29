import { Request, Response } from "express";
import User from '../models/userModel';
import IUser from "../interfaces/User";
import { createToken } from "../libs/TokenLibs";

class signupCtrls {

    async signup(req: Request, res: Response): Promise<Response> {

        //Saving a new user.
        try {
            const { name, lastname, email, username, password } = req.body;
            const user: IUser = new User({
                name,
                lastname,
                email,
                username,
                password
            });


            const userExists = await User.exists({ username });
            if (userExists) return res.status(203).json({ userExists: true }).end();

            const emailExists = await User.exists({ email });
            if (emailExists) return res.status(203).json({ emailExists: true }).end();

            user.password = await user.encryptPassword(user.password);
            const savedUser = await user.save();

            //Token
            const token = createToken(user._id);

            //!El token no se almacena en la base de datos.
            return res.header("auth-token", token).json({ savedUser, token });
        } catch (err) {
            return res.status(500).send(err).end();
        }

    }
}

const signupController = new signupCtrls();

export default signupController;