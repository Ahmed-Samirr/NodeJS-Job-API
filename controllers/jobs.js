const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors')

const getAllJobs = async (req, res) => {

    const jobs = await Job.find({ createdBy: req.user.userID }).sort("createdAt");
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length });

}


const createJob = async (req, res) => {

    req.body.createdBy = req.user.userID;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });

}

const getJob = async (req, res) => {

    const { user: { userID }, params: { id } } = req;
    const job = await Job.findOne({ createdBy: userID, _id: id });

    if (!job) {
        throw new NotFoundError(` No job with id ${id} `);
    }

    res.status(StatusCodes.OK).json({ job });

}

const updateJob = async (req, res) => {

    const { user: { userID }, params: { id }, body: { company, position } } = req;

    if (company === "" || position === "") {
        throw new BadRequestError("Please provide non empty values");
    }

    const job = await Job.findOneAndUpdate({ createdBy: userID, _id: id }, { company, position }, { new: true, runValidators: true });

    if (!job) {
        throw new NotFoundError(` No job with id ${id} `);
    }

    res.status(StatusCodes.OK).json({ job });

}

const deleteJob = async (req, res) => {

    const { user: { userID }, params: { id } } = req;
    const job = await Job.findOneAndDelete({ createdBy: userID, _id: id });

    if (!job) {
        throw new NotFoundError(` No job with id ${id} `);
    }

    res.status(StatusCodes.OK).json({ msg: "Deleted", job });
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}