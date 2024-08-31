import Message from '../models/MessageModel.js';
import Thread from '../models/ThreadModel.js';

export const newIndividualThread = async (req, res) => {
    try {
        const {otherUser} = req.body;
        const userId = req.userId;

        if(otherUser === userId){
            return res.status(400).send('You cannot create a thread with yourself');
        }
        const threadExist = await Thread.find({participants: {$all: [userId, otherUser]},type: 'individual' });
        if(threadExist.length > 0){
            return res.status(200).json({threadId: threadExist[0]._id, message: 'Thread already exist'});
        }
        const newThread = new Thread({
            type: 'individual',
            participants: [userId, otherUser],
            lastMessage: null
        });
        await newThread.save();
        return res.status(200).json({threadId: newThread._id, message: 'Thread created successfully'});
    }catch(err){
        console.log('Error at Creating individual threads: ', err.message);
        return res.status(500).send('Internal Server Error: ' + err.message);
    }  
}


export const newGroupThread = async (req, res) => {
    try{
        const {groupName, participants} = req.body;
        const userId = req.userId;
        if(participants.length < 2){
            return res.status(400).send('Group must have at least 2 participants');
        }
        if(!participants.includes(userId)){
            return res.status(400).send('You must be a participant of the group');
        }
        const groupExist = await Thread.findOne({groupName, type: 'group', participants: userId});
        if(groupExist){
            return res.status(400).send('Group already exist');
        }
        const newThread = new Thread({
            type: 'group',
            groupName,
            participants
        });
        await newThread.save();
        return res.status(200).send('Group created successfully');
    }catch(err){
        console.log('Error at Creating Group threads: ', err.message);
        return res.status(500).send('Internal Server Error: ' + err.message);
    }
}

export const getThreads = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(400).send('User not found');
        }

        const threads = await Thread.find({ participants: userId })
            .populate('participants', 'firstName lastName image')
            .populate('lastMessage', 'content');

        const threadList = threads.map(thread => {
            const isGroup = thread.type === 'group';
            const otherParticipant = isGroup ? null : thread.participants.find(p => p._id.toString() !== userId.toString());
            const name = isGroup ? thread.groupName : otherParticipant.name;

            return {
                id: thread._id,
                type: thread.type,
                name,
                participants: thread.participants,
                lastMessage: thread.lastMessage ? thread.lastMessage.content :'',
                otherUser: otherParticipant ? {
                    id: otherParticipant._id,
                    fullName: `${ otherParticipant.firstName +' '+ otherParticipant.lastName }`,
                    image: otherParticipant.image,
                    lastMessage: thread.lastMessage ? thread.lastMessage.content : 'No messages yet'
                } : null
            };
        });

        return res.status(200).json(threadList);
    } catch (err) {
        console.log('Error at Getting Threads: ', err.message);
        return res.status(500).send('Internal Server Error: ' + err.message);
    }
}


export const newMessage = async (req, res) => {
    try {
        const {threadId, message, messageType} = req.body;
        const userId = req.userId;

        const threadExist = await Thread.findOne({_id: threadId, participants: userId});
        if(!threadExist){
            return res.status(400).send('Thread does not exist');
        }

        if(messageType === 'file' && !req.file){
            return res.status(400).send('File is required');
        }
        if(messageType === 'text' && !message){
            return res.status(400).send('Message is required');
        }

        if(messageType === 'file'){
            const fileUrl = req.file.path;
            const newMessage = new Message({
                thread:threadId,
                messageType: messageType || 'text',
                sender: userId,
                fileUrl
            });
            await newMessage.save();
            threadExist.lastMessage = {
                content: message,
            };
            await threadExist.save();
            return res.status(200).json(newMessage);
        }
        if(messageType === 'text'){
            const newMessage = new Message({
                thread:threadId,
                messageType: messageType || 'text',
                sender: userId,
                content: message
            });
            await newMessage.save();
            threadExist.lastMessage = newMessage._id;
            await threadExist.save();
            return res.status(200).json(newMessage);
        }

    }catch(err){
        console.log('Error at Creating new message: ', err);
        return res.status(500).send('Internal Server Error: ' + err.message);
    }  
}


export const getMessages = async (req, res) => { 
    try{
        const {id} = req.params;
        const threadExist = await Thread.findOne({_id: id});
        if(!threadExist){
            return res.status(400).send('Thread does not exist');
        }

        const messages = await Message.find({thread: id}).sort({ timestamp: 1 });

        return res.status(200).send(messages);
    }catch(err){
        console.log('Error at Getting Messages: ', err.message);
        return res.status(500).send('Internal Server Error: ' + err.message);
    }

}