import { connect, connection } from 'mongoose';
interface IConnection {
    isConnected: number;
}

const conn: IConnection = {
    isConnected: 0,
}

export async function dbConnect() {
    if (conn.isConnected) return;
    const db = await connect(process.env.MONGO_URI || "");
    conn.isConnected = db.connections[0].readyState;
    console.log(db.connection.db.databaseName, ": 200");
}

connection.on("connected", () => {
    console.log("connected to mongodb");
});

connection.on("error", (err) => {
    console.log(err);
});