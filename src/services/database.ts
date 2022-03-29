import { connect, connection } from 'mongoose';

const conn: any = {
    isConnected: false,
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

connection.on("error", (err: any) => {
    console.log(err);
});