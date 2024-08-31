import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { apiClient } from "@/lib/api-client"
import { CREATE_INDIVIDUAL_THREAD, GET_ALL_USERS, LIST_CONNECTIONS } from "@/utils/constants"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function NewChat() {
  const [connectionList, setConnectionList] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const {user}= useSelector((state)=>state.user);
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchUsers = async()=>{
      try{
        const response= await apiClient.get(LIST_CONNECTIONS);
        if(response.status===200){
          console.log('response new chat: ',response);
          setConnectionList([...response.data]);
        }
        const AllUserresponse= await apiClient.get(GET_ALL_USERS);
        if(AllUserresponse.status===200){
          console.log('response new chat: ',AllUserresponse);
          setAllUsers([...AllUserresponse.data]);
        }

      }
      catch(err){
        console.log('Error Fetching Users: ', err.message);
      }
    }
    fetchUsers();

  }, [])

  const handleChat=(id)=>{
    const checkThread= async()=>{ 
      try{
          const newThread = await apiClient.post(CREATE_INDIVIDUAL_THREAD, {otherUser: id});
          console.log('newThread: ',newThread);
          navigate(`/chats/threads/${newThread.data.threadId}`);
          navigate(0)

      }catch(err){
        console.log('error: ',err);
        toast.error(err.response.data);
        
      }
    }
    checkThread();
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button >+</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Chat</DialogTitle>
          <DialogDescription>
            Create New Chat
          </DialogDescription>
        </DialogHeader>
        <Command>
          <CommandInput placeholder="Type Person Name to search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="People You Know" >
              {
                connectionList.filter((users) => users._id !== user.id).map((users) => (
                  <CommandItem key={users._id} onSelect={()=>handleChat(users._id)}>
                    <div className="flex flex-row gap-2 place-items-center">
                      <img src={users.image} alt={users.firstName} className="w-8 h-8 rounded-full" />
                      <div>
                        <p className="text-sm font-bold">{users.firstName} {users.lastName}</p>
                        <span className="text-xs">{users.headline}</span>
                      </div>
                    </div>
                  </CommandItem>
                ))
              }
            </CommandGroup>
            <CommandGroup heading="All Users" >
              {
                allUsers.filter((users) => users._id !== user.id).map((users) => (
                  <CommandItem key={users._id} onSelect={()=>handleChat(users._id)}>
                    <div className="flex flex-row gap-2 place-items-center">
                      <img src={users.image} alt={users.firstName} className="w-8 h-8 rounded-full" />
                      <div>
                        <p className="text-sm font-bold">{users.firstName} {users.lastName}</p>
                        <span className="text-xs">{users.headline}</span>
                      </div>
                    </div>
                  </CommandItem>
                ))
              }
            </CommandGroup>
          </CommandList>
        </Command>

      </DialogContent>
    </Dialog>
  )
}