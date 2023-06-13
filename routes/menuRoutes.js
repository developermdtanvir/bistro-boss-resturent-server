// routes/index.js
const express = require('express');
const router = express.Router();

const { menuCollection } = require('../db');
const { ObjectId } = require('mongodb');

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
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const queary = { _id: new ObjectId(id) }
    const result = await menuCollection.deleteOne(queary);
    res.send(result);
})

module.exports = router

