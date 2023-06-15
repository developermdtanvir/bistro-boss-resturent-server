const jwt = require('jsonwebtoken')

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

module.exports = varifyJWT