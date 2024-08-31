import mongoose from "mongoose";



const JobApplicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jobs',
        required: true
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['applied', 'shortlisted', 'rejected'],
        default: 'applied'
    }
});

const JobApplication = mongoose.model('JobApplication', JobApplicationSchema);

export default JobApplication;

