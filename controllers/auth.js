const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, UnauthenticatedError} = require('../errors/index');


const register = async (req, res) => {

    const user = await User.create({...req.body});
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({user: {name: user.name}, token});
}

const login = async (req, res) => {

    const {email, password} = req.body;

    if(!email || !password) {
        throw new BadRequestError("Please provide email and password");
    }

    const user = await User.findOne({email});

    if(!user) {
        throw new UnauthenticatedError("Please provide valid credintials");
    }
    
    if(await user.comparePassword(password) === false) {
        throw new UnauthenticatedError("Please provide valid credintials");
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({user:{name: user.name}, token});
}

module.exports = {
    register,
    login
}