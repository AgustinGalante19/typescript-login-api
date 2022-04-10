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
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
const mongoose_1 = require("mongoose");
const conn = {
    isConnected: 0,
};
function dbConnect() {
    return __awaiter(this, void 0, void 0, function* () {
        if (conn.isConnected)
            return;
        const db = yield (0, mongoose_1.connect)(process.env.MONGO_URI || "");
        conn.isConnected = db.connections[0].readyState;
        console.log(db.connection.db.databaseName, ": 200");
    });
}
exports.dbConnect = dbConnect;
mongoose_1.connection.on("connected", () => {
    console.log("connected to mongodb");
});
mongoose_1.connection.on("error", (err) => {
    console.log(err);
});
