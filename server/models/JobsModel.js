import mongoose from "mongoose";


const jobsSchema= new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        required:[true,'Title is required']
    },
    company:{
        type:String,
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
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
});

const Jobs=mongoose.model('Jobs',jobsSchema);
export default Jobs;