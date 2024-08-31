import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useSelector } from 'react-redux'
import {ChevronDown, LogOut, Settings, User, UserPen, UserPlus } from 'lucide-react';
import LogoutButton from '../LogoutButton';
  

export default function MenuDropDown() {
    const {user} = useSelector((state) => state.user);
  return (
    <div>
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className='grid place-items-center'>
                    {
                        user.image? 
                        <img src={user.image} alt='profile' className='h-6 w-6 rounded-full' />

                        :<div className='h-6 w-6 rounded-full bg-gray-300'></div>
                    }
                    <p className='hidden text-xs font-semibold md:block'>
                        <span className='flex flex-row'>Me <ChevronDown className='h-4 w-4 '/> </span>
                    </p>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <a href={`/u/${user.userName}`}>
                    <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            Profile
                    </DropdownMenuItem>
                </a>
                {/* <a href={`/profile-setting`}>
                    <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            Edit Profile
                    </DropdownMenuItem>
                </a> */}
                <a href={`/talent/dashboard`}>
                    <DropdownMenuItem>
                            <UserPlus className="mr-2 h-4 w-4" />
                            Hire Talent
                    </DropdownMenuItem>
                </a>
                <LogoutButton>
                    <DropdownMenuItem>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </DropdownMenuItem>
                </LogoutButton>
                
               
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}
