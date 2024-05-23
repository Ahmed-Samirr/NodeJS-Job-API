const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, "Please provide company name"],
        maxlength: 20,
        minlength: 2
    },
    position: {
        type: String,
        required: [true, "Please provide position"],
        maxlength: 50
    },
    status: {
        type: String,
        enum: ["declined", "pending", "interview"],
        default: "pending"
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        required: [true, "Please provide a user"],
        ref: "User"
    },
}, {timestamps: true});

module.exports = mongoose.model("Job", jobSchema);