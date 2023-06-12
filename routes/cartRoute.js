// routes/index.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const { cartCollection } = require('../db')


const varifyJWT = (req, res, next) => {
    const authorizetion = req.headers.authorizetion

    if (!authorizetion) {
        res.status(403).send({ error: true, message: 'unauthorize access' })
    }
    const token = authorizetion.split(' ')[1]

    jwt.verify(token, process.env.ACCESS_TOKEN_SECREET, (error, decoded) => {
        if (error) {
            return res.status(401).send({ error: true, message: 'unauthorize access' })
        }
        req.decoded = decoded.email;
        next()
    })

}

router.get('/', varifyJWT, async (req, res) => {
    const decodedEmail = req.decoded
    const email = req.query.email;
    if (decodedEmail !== email) {
        res.send({ error: true, message: 'forviden access' })
    }
    let queary = { email: email };
    if (!email) {
        return res.send([])
    }
    const cursor = await cartCollection.find(queary)
    const result = await cursor.toArray();
    res.send(result);
})

router.post('/', async (req, res) => {
    const data = req.body;
    const result = await cartCollection.insertOne(data);
    res.send(result);
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const queary = { _id: new ObjectId(id) }
    const result = await cartCollection.deleteOne(queary);
    res.send(result);
})

module.exports = router

