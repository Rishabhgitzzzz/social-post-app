const jwt = require('jsonwebtoken');
require('dotenv').config()


function userAuth(req, res, next) {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({
            msg: "token required"
        })
    }
    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.userID = decodedData.id;
        next()
    } catch (error) {
        return res.status(401).json(
            {
                msg: "Invalid token"
            }
        )
    }
}

module.exports = { userAuth };