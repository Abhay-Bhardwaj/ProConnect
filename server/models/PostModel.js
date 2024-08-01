import mongoose from "mongoose";



const postSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    text:{
        type:String,
        required:[true,'Text is required']
    },
    image:{
        type:String,
        required:false
    },
    likes:[
        {
            user_id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User',
                required:true
            }
        }
    ],
    comments:[
        {
            user_id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User',
                required:true
            },
            text:{
                type:String,
                required:true
            },
            
            createdAt:{
                type:Date,
                default:Date.now
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
});

const Post=mongoose.model('Post',postSchema);
export default Post;
