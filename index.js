const express = require('express');
const app = express()
const cors = require('cors');
const port = process.env.PORT || 3000;
require('dotenv').config();
const jwt = require('jsonwebtoken');
const menuRoutes = require('./routes/menuRoutes')
const reveiwRoutes = require('./routes/reviewsRoute')
const cartRoutes = require('./routes/cartRoute')
const usersRoutes = require('./routes/usersRoute')
const { connectToMongoDB } = require('./db');

// middleware 
app.use(cors());
app.use(express.json());


connectToMongoDB().catch(console.error);



// use the route files as middleware
app.use('/menu', menuRoutes);
app.use('/review', reveiwRoutes);
app.use('/cart', cartRoutes);
app.use('/users', usersRoutes)



async function run() {

    try {
        app.post('/jwt', (req, res) => {
            const email = req.body
            const token = jwt.sign(email, process.env.ACCESS_TOKEN_SECREET, { expiresIn: '7d' });
            res.send({ token });
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

