const express = require('express');
const app = express()
const cors = require('cors');
const port = process.env.PORT || 3000;

const menuRoutes = require('./routes/menuRoutes')
const reveiwRoutes = require('./routes/reviewsRoute')
const cartRoutes = require('./routes/cartRoute')
const usersRoutes = require('./routes/usersRoute')
const jwtRoutes = require('./routes/jwtRoute')
const { connectToMongoDB } = require('./db');

// middleware 
app.use(cors({ origin: "*" }));
app.use(express.json());




connectToMongoDB().catch(console.error);



// use the route files as middleware
app.use('/menu', menuRoutes);
app.use('/review', reveiwRoutes);
app.use('/cart', cartRoutes);
app.use('/users', usersRoutes)
app.use('/jwt', jwtRoutes)





app.get('/', (req, res) => {
    res.send('bistro boss restaurant server is running');
})

app.listen(port, () => console.log(`listining port ${port}`))

