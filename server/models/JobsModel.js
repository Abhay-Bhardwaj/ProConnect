import mongoose, { skipMiddlewareFunction } from "mongoose";

const jobSchema= new mongoose.Schema({
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        required:[true,'Title is required']
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required:[true,'Company is required']
    },
    location:{
        type:String,
        required:false
    },
    type:{
        type:String,
        required:false
    },
    description:{
        type:String,
        required:false
    },
    budget:{
        type:String,
        required:false
    },
    category:{
        type:String,
        required:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    deadline:{
        type:Date,
        required:false
    },
    skills:{
        type:String,
        required:false
    },
    applicants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'JobApplication'
        }
        
    ],
    updatedAt:{
        type:Date,
        default:Date.now
    }
});

const Jobs=mongoose.model('jobs',jobSchema);
export default Jobs;