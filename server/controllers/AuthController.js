import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

/* Logic For JWT TOKEN */
const maxAge=7*24*60*60*60;

const createToken=(email,userId)=>{
    return jwt.sign({email,userId},process.env.JWT_SECRET,{expiresIn:maxAge});
}


export const signUp= async (req,res)=>{
    try{
        const {fullName, email,password}=req.body;
        if(!email || !password){
            return res.status(400).send("Email and Password are required");
        }
        const userExist=await User.findOne({email});
        if(userExist){
            return res.status(400).send("User Already Exist");
        }
        const firstName=fullName.split(' ')[0];
        const lastName=fullName.split(' ')[1] || "";
        /*Creating User*/
        const user=await User.create({email,password,firstName,lastName});
        const token=createToken(user.email,user.id);

        /* Adding JWT Cookies to the Response*/
        res.cookie('jwt',token,{maxAge:maxAge,secure:true, sameSite:"none"});

        return res.status(201).json({user:{
            email:user.email,
            id:user._id,
            userName:user.userName,
            headline:user.headline,
            image:user.image,
        }});
    }
    catch(err){
        console.log('Error:',err.message);
        return res.status(500).send("Internal Server Error:"+err.message);
    }
}

export const logIn= async (req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).send("Email and Password are required");
        }
        /*Creating User*/
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).send("User Not Found");
        }

        const auth= await bcrypt.compare(password,user.password);
        if(!auth){
            return res.status(400).send("Password is Incorrect");
        }
        const token=createToken(user.email,user.id);

        /* Adding JWT Cookies to the Response*/
        res.cookie('jwt',token,{maxAge:maxAge,secure:true, sameSite:"none"});

        return res.status(200).json({user:{
            email:user.email,
            id:user._id,
            userName:user.userName,
            headline:user.headline,
            firstName:user.firstName,
            lastName:user.lastName,
            image:user.image,
        }});
    }
    catch(err){
        console.log('Error:',err.message);
        return res.status(500).send("Internal Server Error:"+err.message);
    }
}

export const userInfo=async(req,res)=>{
    try{
        const user=await User.findById(req.userId);
        if(!user){
            return res.status(400).send("User Not Found");
        }

        return res.status(200).json({user:{
            email:user.email,
            id:user._id,
            userName:user.userName,
            headline:user.headline,
            firstName:user.firstName,
            lastName:user.lastName,
            image:user.image
        }});
    }
    catch(err){
        console.log('Error:',err.message);
        return res.status(500).send("Error in getting Info:"+err.message);
    }
}