const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')

router.post('/', (req, res) => {
    const email = req.body
    const token = jwt.sign(email, process.env.ACCESS_TOKEN_SECREET, { expiresIn: '7d' });
    console.log(token)
    res.send({ token });
})

module.exports = router;