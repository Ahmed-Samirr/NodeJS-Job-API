const express = require('express');
const router = express.Router();
const {createJob, deleteJob, getAllJobs, getJob, updateJob} = require('../controllers/jobs');

router.route('/api/v1/jobs').get(getAllJobs).post(createJob);
router.route('/api/v1/jobs/:id').get(getJob).delete(deleteJob).patch(updateJob);

module.exports = router;