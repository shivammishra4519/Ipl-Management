const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.MONGODB_URL;
const client = new MongoClient(url);

let db;

async function connectDB() {
    try {
        await client.connect();
        db = client.db("Ipl_management");  
        console.log(" MongoDB connected to Ipl_management");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit the app if DB connection fails
    }
}

function getDB() {
    if (!db) {
        throw new Error("Database not connected. Call connectDB() first.");
    }
    return db;
}

module.exports = { connectDB, getDB };
