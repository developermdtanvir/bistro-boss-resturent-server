const { userCollection } = require('./../db')

const varifyAdmin = async (req, res, next) => {
    const email = req.decoded;
    const queary = { email: email }
    const user = await userCollection.findOne(queary);
    if (user?.role !== 'admin') {
        return res.status(401).send({ error: true, message: 'forbidden access' })
    }
    next()
}

module.exports = varifyAdmin;