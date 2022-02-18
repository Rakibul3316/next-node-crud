import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
    if (connection.isConnected) {
        return;
    }

    const db = await mongoose.connect("mongodb+srv://rakib8316:hodAEZas2gmTlqlO@cluster0.dxu0v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
        // useNewUrlParse: true,
        useUnifiedTopology: true,
    });

    connection.isConnected = db.connections[0].readyState;
    console.log(connection.isConnected);
}

export default dbConnect;