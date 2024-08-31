import mongoose from "mongoose";


const CompanySchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
    },
    industry:{
        type:String,
    },
    companySize:{
        type:String,
    },
    website:{
        type:String,
    },
    logo:{
        type:String,
    },
    coverPhoto:{
        type:String,
    },
    followers:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        }   
    ],
    posts:{
        type:Array,
        default:[]
    },
    managers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
},{timestamps:true})

const Company = mongoose.model('Company',CompanySchema);
export default Company;