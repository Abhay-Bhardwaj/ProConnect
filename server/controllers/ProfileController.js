import { deleteImage, uploader } from "../helper/clouduploader.js";
import Profile from "../models/ProfileModel.js";
import User from "../models/UserModel.js";


export const userInfo=async(req,res)=>{
    try{
        const userName = req.params.userName;
        const user = await User.findOne({ userName: userName }, {__v:0, user_id:0,createdAt:0,updatedAt:0,password:0});
        if (!user) {
            return res.status(400).send("User Not Found");
        }
        let profile = await Profile.findOne({ _id: user.profile_id });
        if (!profile) {
            const newProfile = await Profile.create({ user_id: user._id });
            await User.updateOne({ _id: user._id }, { profile_id: newProfile._id });
            profile = newProfile;
        }
        const userObject = user.toObject();
        const profileObject = profile.toObject();

        // Remove specific fields from profileObject
        delete profileObject._id;
        delete profileObject.__v;
        
        const combinedData = {
            ...userObject,
            ...profileObject
        };
        
        return res.status(200).json({user:combinedData});
    }
    catch(err){
        console.log('Error at userprofile:',err.message);
        return res.status(500).send("Internal Server Error:"+err.message);
    }
}

export const updateProfile = async (req, res) => {
    try {
        const newUserData = req.body;
        const userId = newUserData._id; // Extract the _id separately

        // Update user document
        await User.updateOne({ _id: userId }, {
            userName: newUserData.userName,
            email: newUserData.email,
            firstName: newUserData.firstName,
            lastName: newUserData.lastName,
            headline: newUserData.headline,
            updatedAt: new Date()
        });

        // Update profile document
        await Profile.updateOne({ user_id: userId }, {
            about: newUserData.about,
            skills: newUserData.skills,
            experience: newUserData.experience,
            education: newUserData.education,
            updatedAt: new Date()
        });

        return res.status(200).send("Profile Updated");
    } catch (err) {
        console.log('Error at updateProfile:', err.message);
        return res.status(500).send("Internal Server Error: " + err.message);
    }
}

export const uploadProfileImage = async (req, res) => {
    try{
        
        if (!req.file) {
            return res.status(200).send('no file');
        }
        
      
          const filePath = req.file.path;
      
          // Upload to Cloudinary
          const result = await uploader({ filePath });
          // Here you can update the user's profile with the image URL
          // For example, updating the user's profile in the database
          const userId = req.userId;
          const user= await User.findOne({_id:userId});
          if(!user){
              return res.status(400).send("User Not Found");
          }
          if(user.image){
                const getPublicId = (imageURL) => {
                    const parts = imageURL.split('/');
                    const filename = parts[parts.length - 2]+'/'+parts[parts.length - 1];
                    const publicId = filename.split('.')[0];
                    return publicId;
                };
                await deleteImage(getPublicId(user.image));
          }
          await User.updateOne({ _id: userId }, { image: result});
          res.status(200).send('Image uploaded successfully');

    }catch(err){
        console.log('Error at ProfileImageChange:', err.message);
        return res.status(500).send("Internal Server Error: " + err.message);
    }
}