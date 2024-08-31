import { CompanyUploader, ProfileUploader } from "../helper/clouduploader.js";


const getPublicId = (imageURL) => {
    const parts = imageURL.split('/');
    const filename = parts[parts.length - 2]+'/'+parts[parts.length - 1];
    const publicId = filename.split('.')[0];
    return publicId;
};

export const UploadProfileImage= async (req, res) => {
    try {
        if (!req.file) {
            return res.status(200).send('no file');
        }
        const filePath = req.file.path;
          // Upload to Cloudinary
        const result = await ProfileUploader({ filePath });
          // Here you can update the user's profile with the image URL
          // For example, updating the user's profile in the database
        
        if(user.image){
            await deleteImage(getPublicId(user.image));
        }
        await User.updateOne({ _id: userId }, { image: result});
        return res.status(200).json({imageUrl:result});
    } catch (err) {
        console.log('Error:', err.message);
        return res.status(500).send('Internal Server Error: ' + err.message);
    }
}

export const CompanyProfileImageUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(200).send('no file');
        }
        const filePath = req.file.path;
        
        const result = await CompanyUploader({ filePath });
     
        return res.status(200).json({imageUrl:result});
    } catch (err) {
        console.log('Error:', err.message);
        return res.status(500).send('Internal Server Error: ' + err.message);
    }
}