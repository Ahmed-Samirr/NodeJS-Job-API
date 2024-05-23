const jwt = require('jsonwebtoken');
const {UnauthenticatedError} = require('../errors/index');
const User = require('../models/User');

const auth = (req, res, next) => {
    const authHeaders = req.headers.authorization;

    if(!authHeaders || !authHeaders.startsWith('Bearer ')) {
        throw new UnauthenticatedError("Unvalid token");
    }

    const token = authHeaders.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECCRET);
        req.user = {
            userID: payload.userID,
            userName: payload.userName
        };
        next();
    } 
    catch (error) {
        throw new UnauthenticatedError("Unvalid token");
    }
}

module.exports = auth;