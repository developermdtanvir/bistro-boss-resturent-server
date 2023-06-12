const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gzw4htn.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

// Connect to MongoDB and initialize collections
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1);
    }
}

const db = client.db('bistro');
const menuCollection = db.collection('menu');

const reviewsCollection = db.collection('reviews')
const cartCollection = db.collection('cart')
const userCollection = db.collection('user')

module.exports = {
    connectToMongoDB,
    menuCollection,
    reviewsCollection,
    cartCollection,
    userCollection
};
