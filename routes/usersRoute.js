// routes/index.js
const express = require('express');
const router = express.Router();

const { userCollection } = require('../db')

router.post('/usres', async (req, res) => {
    const user = req.body;
    const result = await userCollection.insertOne(user);
    res.send(result);
})

module.exports = router
