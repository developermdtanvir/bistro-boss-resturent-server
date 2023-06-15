// routes/index.js
const express = require('express');
const router = express.Router();

const { userCollection } = require('../db');
const { ObjectId } = require('mongodb');

const varifyJWT = require('./verifyJWT')
const varifyAdmin = require('./verifyAdmin')


router.post('/', async (req, res) => {
    const user = req.body;
    const queary = { email: user.email }
    const exestingUser = await userCollection.findOne(queary)
    if (exestingUser) {
        return res.send({ message: "user already exist" })
    }
    const result = await userCollection.insertOne(user);
    res.send(result);
})


router.get('/', varifyJWT, varifyAdmin, async (req, res) => {
    const queary = {};
    const cursor = await userCollection.find(queary)
    const result = await cursor.toArray();
    res.send(result)
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const queary = { _id: new ObjectId(id) }
    const result = await userCollection.deleteOne(queary);
    res.send(result);
})

// security layer : varifyJWT , 
// email same 
// check admin

router.get('/admin/:email', varifyJWT, async (req, res) => {
    const email = req.params.email;
    const decodedEmail = req.decoded

    if (decodedEmail !== email) {
        return res.send({ admin: false })
    }

    const queary = { email: email }
    const user = await userCollection.findOne(queary);
    const result = { admin: user?.role === 'admin' }
    res.send(result);
})

router.patch('/admin/:id', async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) }
    const updateDoc = {
        $set: {
            role: 'admin'
        }
    }
    const result = await userCollection.updateOne(filter, updateDoc);
    res.send(result);
})

module.exports = router
