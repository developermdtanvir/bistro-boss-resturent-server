// routes/index.js
const express = require('express');
const router = express.Router();

const { reviewsCollection } = require('../db')

router.get('/', async (req, res) => {
    const queary = {};
    const cursor = await reviewsCollection.find(queary);
    const result = await cursor.toArray();
    res.send(result);
})

module.exports = router

