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
const productModel_1 = __importDefault(require("../models/productModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const TokenLibs_1 = require("../libs/TokenLibs");
class ProductControllers {
    getUserProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = (0, TokenLibs_1.getToken)(req);
            try {
                if (token) {
                    const payload = (0, TokenLibs_1.getUserId)(req, res);
                    const user = yield userModel_1.default.findById(payload, { password: 0, _id: 0, email: 0 }).populate("products");
                    return res.json(user);
                }
                else {
                    return res.status(401).send("invalid toke, signin again.");
                }
            }
            catch (err) {
                return res.status(400).send("token not provided.").end();
            }
        });
    }
    getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const product = yield productModel_1.default.findById(id);
                return res.status(200).json(product);
            }
            catch (err) {
                console.log(err);
                return res.status(500).json(err).end();
            }
        });
    }
    addProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, brand, model, quantity } = req.body;
                const token = (0, TokenLibs_1.getToken)(req);
                const payload = (0, TokenLibs_1.getUserId)(req, res);
                const user = yield userModel_1.default.findById(payload);
                if (!user)
                    return res.status(404).send("user not found").end();
                try {
                    if (token) {
                        const newProduct = new productModel_1.default({
                            name: name[0].toUpperCase() + name.slice(1),
                            brand: brand[0].toUpperCase() + brand.slice(1),
                            model,
                            quantity,
                            seller_id: user._id
                        });
                        try {
                            const savedProduct = yield newProduct.save();
                            user.products = user.products.concat([savedProduct._id]);
                            yield user.save();
                            return res.json(savedProduct);
                        }
                        catch (error) {
                            return res.status(500).json(error).end();
                        }
                    }
                    else {
                        return res.status(401).send("invalid toke, signin again.").end();
                    }
                }
                catch (err) {
                    return res.status(400).send("invalid token").end();
                }
            }
            catch (err) {
                return res.status(500).send(err).end();
            }
        });
    }
    modifyProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { name, brand, model, quantity } = req.body;
                const product = yield productModel_1.default.findOneAndUpdate({ _id: id }, {
                    name, brand, model, quantity
                }, { new: true });
                return res.status(200).json(product).end();
            }
            catch (err) {
                console.log(err);
                return res.status(500).end();
            }
        });
    }
    removeProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield productModel_1.default.findOneAndDelete({ _id: id });
                yield userModel_1.default.updateMany({}, {
                    $pull: { products: { $in: [id] } }
                });
                return res.status(200).json("Product deleted");
            }
            catch (err) {
                return res.status(500).send("error").end();
            }
        });
    }
}
const productControllers = new ProductControllers();
exports.default = productControllers;
