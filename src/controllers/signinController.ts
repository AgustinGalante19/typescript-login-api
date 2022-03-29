import { Request, Response } from "express";
import User from '../models/userModel';
import { createToken } from "../libs/TokenLibs";

class signinCtrls {

    async signin(req: Request, res: Response): Promise<Response> {

        const { username, password } = req.body;
        const user = await User.findOne({ username });

        try {
            if (!user) return res.status(203).json({ username: false }).end();

            const pswIsValid: boolean = await user.validatePassword(password);

            if (!pswIsValid) {
                console.log("invalid password")
                return res.status(203).json({ password: pswIsValid }).end();
            }

            const token = createToken(user._id);

            //!El token no se almacena en la base de datos.
            return res.header("auth-token", token).json({ user, token });
        } catch (err) {
            return res.status(500).send("e500: server error").end();
        }
    }
}

const signinController = new signinCtrls();

export default signinController;