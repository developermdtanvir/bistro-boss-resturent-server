// routes/index.js
const express = require('express');
const router = express.Router();

const { userCollection } = require('../db')

router.post('/', async (req, res) => {
    const user = req.body;
    const queary = { email: user.email }
    const exestingUser = await userCollection.findOne(queary)
    console.log(exestingUser);
    if (exestingUser) {
        return res.send({ message: "user already exist" })
    }
    const result = await userCollection.insertOne(user);
    res.send(result);
})

module.exports = router
