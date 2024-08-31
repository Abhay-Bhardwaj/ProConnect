import { Server as SocketIoServer } from 'socket.io'
import Thread from './models/ThreadModel.js';
import Message from './models/MessageModel.js';
const setupSocket = (server) => {
    const io= new SocketIoServer(server,{
        cors: {
            origin: process.env.ORIGIN || 'http://localhost:5173', // Allow the front-end's origin
            methods: ["GET", "POST"],
            credentials: true // Allow credentials (cookies, authorization headers)
        }
    });

    const userSocketMap = new Map();

    const sendMessage = async (messageData) => {
        const {threadId, sender, message, messageType} = messageData;
        const threadExist = await Thread.findOne({_id: threadId});
        const newMessage = await Message.create({
            thread:threadId,
            messageType: messageType || 'text',
            sender: sender,
            content: message
        });
        await newMessage.save();
        threadExist.lastMessage = newMessage._id;
        await threadExist.save();
        threadExist.participants.forEach(participant => {
            const participantSocketId = userSocketMap.get(participant.toHexString());
            if (participantSocketId) {
                io.to(participantSocketId).emit('receiveMessage', newMessage);
            }
        });
    }

    io.on("connection", function (socket) {
       const userId = socket.handshake.query.userId;
       if(userId){
           userSocketMap.set(userId,socket.id);
        //    console.log(`User ${userId} connected with socket id ${socket.id}`);
       }else{
         console.log('User Id not found in socket connection');
       }

       socket.on('sendMessage', sendMessage);

        socket.on("disconnect", () => {
            console.log(`User ${userId} Disconnected with socket id ${socket.id}`);
            userSocketMap.delete(userId);
        });
        
    });


}

export default setupSocket