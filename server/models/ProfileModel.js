import mongoose from 'mongoose';



const ProfileSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    about: {
        type: String,
        required: false,
    },
    experience: [
        {
            title: {
                type: String,
                required: true,
            },
            company: {
                type: String,
                required: true,
            },
            location: {
                type: String,
                required: false,
            },
            from: {
                type: Date,
                required: true,
            },
            to: {
                type: Date,
                required: false,
            },
            current: {
                type: Boolean,
                required: false,
            },
        },
    ],
    education: [
        {
            school: {
                type: String,
                required: true,
            },
            degree: {
                type: String,
                required: true,
            },
            fieldofstudy: {
                type: String,
                required: true,
            },
            from: {
                type: Date,
                required: true,
            },
            to: {
                type: Date,
                required: false,
            },
            grade:{
                type: String,
                required: false,
            },
            current: {
                type: Boolean,
                required: false,
            },
        },
    ],
    skills:{
                type: [String],
                required: false,
    },
})

const Profile = mongoose.model('Profile', ProfileSchema);
export default Profile;