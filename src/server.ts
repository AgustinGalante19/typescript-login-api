import express from "express";
import cors from 'cors'
import morgan from 'morgan';
import path from 'path';
import dotenv from 'dotenv'
dotenv.config();

import { dbConnect } from "./services/database";
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';

class Server {

    private app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    config(): void {
        //Settings
        this.app.set("port", process.env.PORT || 5000);
        this.app.set("views", path.join(__dirname, "/views"));

        //Middleweares.
        this.app.use(morgan("dev"));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    routes(): void {
        this.app.use("/api/auth", authRoutes);
        this.app.use("/api/products", productRoutes);
        this.app.use("/api/user", userRoutes);
    }

    start(): void {
        dbConnect();
        this.app.listen(process.env.PORT || this.app.get("port"), () => {
            console.log("Server on port", this.app.get("port"));
        });
    }
}

const server = new Server();

server.start();