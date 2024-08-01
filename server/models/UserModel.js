import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Profile from "./ProfileModel.js";

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:false,
        unique:true
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
    },
    password:{
        type:String,
        required:[true,'Password is required'],
    },
    firstName:{
        type:String,
        required:false
    },
    lastName:{
        type:String,
        required:false
    },
    image:{
        type:String,
        default:"",
        required:false
    },
    headline:{
        type:String,
        default:"",
        required:false
    },
    profile_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Profile',
        required:false
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    updatedAt:{
        type:Date,
        default:Date.now,
    }


});

userSchema.pre('save', async function(next){
    const profile=await Profile.create({user_id:this._id});
    
    this.profile_id=profile._id;
    this.userName=this.email.split('@')[0];
    const temp=await User.findOne({userName:this.userName});
    if(temp){
        this.userName=this.userName+this._id;
    }
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);
    next();
});
const User=mongoose.model('Users',userSchema);

export default User;