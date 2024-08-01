import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    text:{
        type:String,
        required:[true,'Text is required']
    },
    read:{
        type:Boolean,
        default:false
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