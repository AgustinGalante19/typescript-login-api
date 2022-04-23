import { Request, Response } from 'express';
import Product from '../models/productModel';
import User from '../models/userModel';
import IProduct from '../interfaces/Product';
import { getToken, getUserId } from "../libs/TokenLibs";
class ProductControllers {

    async getUserProducts(req: Request, res: Response): Promise<Response> {

        const token = getToken(req);

        try {
            if (token) {
                const payload = getUserId(req, res);
                const user = await User.findById(payload, { password: 0, _id: 0, email: 0 }).populate("products");
                return res.json(user);
            } else {
                return res.status(401).send("invalid toke, signin again.");
            }
        } catch (err) {
            return res.status(400).send("token not provided.").end();
        }

    }

    async getProductById(req: Request, res: Response): Promise<Response> {

        try {
            const { id } = req.params;
            const product = await Product.findById(id);
            return res.status(200).json(product);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err).end();
        }
    }

    async addProduct(req: Request, res: Response): Promise<Response> {

        try {
            const { name, brand, model, quantity } = req.body;
            const token = getToken(req);
            const payload = getUserId(req, res);

            const user = await User.findById(payload);
            if (!user) return res.status(404).send("user not found").end();

            try {
                if (token) {
                    const newProduct: IProduct = new Product(
                        {
                            name: name[0].toUpperCase() + name.slice(1),
                            brand: brand[0].toUpperCase() + brand.slice(1),
                            model,
                            quantity,
                            seller_id: user._id
                        });
                    try {
                        const savedProduct = await newProduct.save();
                        user.products = user.products.concat([savedProduct._id]);
                        await user.save();
                        return res.json(savedProduct);

                    } catch (error) {
                        return res.status(500).json(error).end();
                    }
                } else {
                    return res.status(401).send("invalid toke, signin again.").end();
                }
            } catch (err) {
                return res.status(400).send("invalid token").end();
            }
        } catch (err) {
            return res.status(500).send(err).end();
        }

    }

    async modifyProduct(req: Request, res: Response): Promise<Response> {

        try {
            const { id } = req.params;
            const { name, brand, model, quantity } = req.body;
            const product = await Product.findOneAndUpdate({ _id: id }, { name, brand, model, quantity }, { new: true });
            return res.status(200).json(product).end();
        } catch (err) {
            return res.status(500).end();
        }

    }

    async removeProduct(req: Request, res: Response): Promise<Response> {

        try {
            const { id } = req.params;
            await Product.findOneAndDelete({ _id: id });
            await User.updateMany({},
                {
                    $pull:
                        { products: { $in: [id] } }
                });
            return res.status(200).json("Product deleted");
        } catch (err) {
            return res.status(500).send("error").end();
        }

    }

}

const productControllers = new ProductControllers();
export default productControllers;