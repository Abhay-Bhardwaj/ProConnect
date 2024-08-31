import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    thread: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thread',
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    messageType: {
        type: String,
        enum: ['text', 'file'],
        required: [true, 'Text is required']
    },
    content: {
        type: String,
        required: function() {
            return this.messageType === 'text';
        }
    },
    fileUrl: {
        type: String,
        required: function() {
            return this.messageType === 'file';
        }
    },
    read: {
        type: Boolean,
        default: false
    },
    timeStamps: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
