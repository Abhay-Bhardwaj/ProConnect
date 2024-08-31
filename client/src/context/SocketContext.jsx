import { addMessage } from "@/store/chatSlice";
import { HOST } from "@/utils/constants";
import { createContext, useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {io} from 'socket.io-client';

const SocketContext = createContext(null);

export const useSocket =()=>{
    return useContext(SocketContext);
}

export const SocketProvider = ({children})=>{
    const socket = useRef(null);
    const dispatch = useDispatch();
    const {user}= useSelector((state) => state.user);
    const {selectedThread} = useSelector((state)=> state.chat);
    const selectedThreadRef = useRef(selectedThread); // Create a ref to hold the latest selectedThread

    useEffect(() => {
        selectedThreadRef.current = selectedThread; // Update ref whenever selectedThread changes
    }, [selectedThread]);

    useEffect(()=>{
        if(user){
            socket.current = io(HOST, {
                withCredentials: true,
                query:{userId: user.id}
            });
            socket.current.on("connect", () => {
                console.log("Connected to Socket.IO server", socket.current.id);
            });
            socket.current.on("disconnect", () => {
                console.log("Disconnected from Socket.IO server");
            });

            const handleRecieveMessage = (messageData) => {
                if (messageData.thread === selectedThreadRef.current) {
                    dispatch(addMessage(messageData));
                }
            }
            socket.current.on('receiveMessage', (messageData) => {
                handleRecieveMessage(messageData);
            });

            return ()=>{
                socket.current.disconnect();
            }
        }


    }, [user])

    return <SocketContext.Provider value={socket.current}>{children}</SocketContext.Provider>
}