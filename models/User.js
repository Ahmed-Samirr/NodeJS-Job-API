const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minLength: 3,
        maxLength: 20
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: [true, 'email is already exsist'],
        match: [/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/, 'Please provide valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minLength: 6
    }
});

userSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10));
    next();
});

userSchema.methods.createJWT = function () {
    return jwt.sign({userID: this._id, userName: this.name}, process.env.JWT_SECCRET, {expiresIn: process.env.JWT_LIFETIME});
}

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('user', userSchema);