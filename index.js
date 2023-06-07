const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const cors = require('cors');
const port = process.env.PORT || 3000;
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gzw4htn.mongodb.net/?retryWrites=true&w=majority`;

// middleware 
app.use(cors());
app.use(express.json());


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {


    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const menuCollection = client.db('bistro').collection('menu')
        const reviewsCollection = client.db('bistro').collection('reviews')
        const cartCollection = client.db('bistro').collection('cart')

        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        app.get('/menu', async (req, res) => {
            const queary = {};
            const cursor = await menuCollection.find(queary);
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/reviews', async (req, res) => {
            const queary = {};
            const cursor = await reviewsCollection.find(queary);
            const result = await cursor.toArray();
            res.send(result);
        })

        app.post('/cart', (req, res) => {
            const data = req.body;
            console.log(data);
        })

    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('bistro boss restaurant server is running');
})

app.listen(port, () => console.log(`listining port ${port}`))