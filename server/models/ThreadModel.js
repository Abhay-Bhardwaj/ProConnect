import mongoose from 'mongoose';

const threadSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['individual', 'group'],
        required: true
    },
    groupName: {
        type: String,
        required: function() {
            return this.type === 'group';
        }
    },
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }
    ],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    timeStamps: {
        type: Date,
        default: Date.now
    }
});

const Thread = mongoose.model('Thread', threadSchema);
export default Thread;
