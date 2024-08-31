import Company from "../models/CompanyModel.js";


export const createCompany = async (req, res) => {
    try {
        const userId = req.userId;
        const { name, description, logo, companySize, industry } = req.body;
        if (!name || !description) {
            return res.status(400).send('Name and Description are required');
        }
        if(!logo){
            logo='https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png';
        }
        const company = await Company.create({ name, description, logo, companySize, industry, managers: [userId] });
        return res.status(201).json(company);
    } catch (err) {
        console.log('Error:', err.message);
        return res.status(500).send('Internal Server Error: ' + err.message);
    }
}

export const getCompany = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).send('Company not found');
        }
        return res.status(200).json(company);
    } catch (err) {
        console.log('Error:', err.message);
        return res.status(500).send('Internal Server Error: ' + err.message);
    }
}

export const getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
        return res.status(200).json(companies);
    } catch (err) {
        console.log('Error:', err.message);
        return res.status(500).send('Internal Server Error: ' + err.message);
    }
}