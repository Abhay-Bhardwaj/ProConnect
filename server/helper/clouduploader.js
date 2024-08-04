import cloudinary from "../config/cloudinaryConfig.js";
import fs from 'fs';


export const uploader = async ({filePath}) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'profile_images',
        });
        fs.unlinkSync(filePath);
        return result.secure_url;
    }catch(err){
        console.log('Error at uploadImage:', err.message);
    }
}

export const deleteImage = async (public_id) => {
    try {
        await cloudinary.uploader.destroy(public_id);

        return;
    } catch (err) {
        console.log('Error at deleteImage:', err.message);
    }
}