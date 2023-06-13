// routes/index.js
const express = require('express');
const router = express.Router();

const { menuCollection } = require('../db')

router.get('/', async (req, res) => {
    const queary = {}
    const cursor = await menuCollection.find(queary)
    const result = await cursor.toArray()
    res.send(result);
});

router.post('/', async (req, res) => {
    const data = req.body;
    const result = await menuCollection.insertOne(data);
    res.send(result);
})

module.exports = router

