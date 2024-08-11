import Jobs from "../models/JobsModel";



export const CreateJob = async (req, res) => {
    try{
        const { title, description, location, type, salary, company, email } = req.body;
        const userId = req.userId;
        const newJob = new Jobs({
            user_id: userId,
            title,
            description,
            location,
            type,
            salary,
            company,
            email
        });

        return res.status(200).json(newJob);
    }
    catch(err){
        res.status(500).send('Error Creating Job: ' + err.message);
    }
}


export const getJobsList= async(req,res)=>{
    try{
        
    }
    catch(err){
        res.status(500).send('Error geting List', err.message)
    }
}