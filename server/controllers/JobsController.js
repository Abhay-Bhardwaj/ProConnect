import Company from "../models/CompanyModel.js";
import JobApplication from "../models/JobApplication.js";
import Jobs from "../models/JobsModel.js";

export const CreateJob = async (req, res) => {
    try {
        const { title, description, location, type, budget, company, category, skills, experience, deadline} = req.body;
        const userId = req.userId;

        // Find the company by name
        let CompanyData = await Company.findOne({ name: company });

        // If company doesn't exist, create a new one
        if (!CompanyData) {
            CompanyData = new Company({
                name: company,
                description: '',
                industry: '',
                companySize: '',
                website: '',
                logo: '',
                coverPhoto: '',
                followers: [],
                posts: [],
                managers: [userId]
            });
            await CompanyData.save();
        }

        // Create a new job and associate it with the company
        const newJob = new Jobs({
            created_by: userId,
            title,
            description,
            location,
            type,
            budget,
            category,
            skills,
            experience,
            deadline,
            company: CompanyData._id,
            applicants: [],
        });
        await newJob.save();
        return res.status(200).json({ message: 'Job created successfully', data: newJob, status: 'success' });
    } catch (err) {
        return res.status(500).send('Error Creating Job: ' + err.message);
    }
};


export const getAllJobsList = async (req, res) => {
    try {
        // const { searchTerm, location, jobType } = req.query;
        // let query = {};

        // if (searchTerm) {
        //     query.title = { $regex: searchTerm, $options: 'i' }; // case-insensitive search
        // }

        // if (location) {
        //     query.location = location;
        // }

        // if (jobType) {
        //     query.type = jobType;  // Correct key to match the job type
        // }
        // Get the count of applicants for each job
        let jobsWithApplicantCount = await Jobs.aggregate([
            {
                $addFields: {
                    applicantCount: { $size: '$applicants' }
                }
            }
        ]);
        
        // Populate 'company' and 'created_by' fields after aggregation
        jobsWithApplicantCount = await Jobs.populate(jobsWithApplicantCount, [
            { path: 'company', select: 'name logo' },
            { path: 'created_by', select: 'firstName lastName image headline userName' }
        ]);
        

        return res.status(200).json({ data: jobsWithApplicantCount, status: 'success' });
    } catch (err) {
        res.status(500).send('Error getting jobs list: ' + err.message);
    }
};


export const getPostedJobs= async (req, res) => {
    try {
        const userId = req.userId;
        const jobs = await Jobs.find({ created_by: userId }).populate('company');
        return res.status(200).json({ data: jobs, status: 'success' });
    } catch (err) {
        return res.status(500).send('Error getting posted jobs: ' + err.message);
    }
}

export const applyForJob = async (req, res) => {
    try {
        const { jobId } = req.body;
        const userId = req.userId;

        const jobApplication = {
            job: jobId,
            applicant: userId,
            status: 'applied'
        };
        const isApplied = await JobApplication.findOne(jobApplication);
        if(isApplied){
            return res.status(400).json({ message: 'You have already applied for this job', status: 'error' });
        }

        const newApplicant=await JobApplication.create(jobApplication);

        const job = await Jobs.findById(jobId);
        job.applicants.push(newApplicant._id);
        await job.save();

        return res.status(200).json({ message: 'Applied for job successfully', status: 'success' });
    } catch (err) {
        return res.status(500).send('Error applying for job: ' + err.message);
    }
}


export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.userId;
        const appliedJobs = await JobApplication.find({ applicant: userId });
        return res.status(200).json({ data: appliedJobs, status: 'success' });
    } catch (err) {
        return res.status(500).send('Error getting applied jobs: ' + err.message);
    }
}

export const getJobDetails= async (req, res) => {
    try {
        const { jobId } = req.params;
        const job = await Jobs.findById(jobId).populate('company');
        const applicants= await JobApplication.find({job:jobId}).populate('applicant');

        return res.status(200).json({ data: {job, applicants}, status: 'success' });
    } catch (err) {
        return res.status(500).send('Error getting job details: ' + err.message);
    }
}