import React from 'react'
import { LuMessageCirclePlus } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";
import { HiArrowsExpand } from "react-icons/hi";
import { FaSearch } from "react-icons/fa"; 
import { useFriendList } from '../hooks/useFriendList';
import {useUI} from '../hooks/useUI';


const MessageNotif = () => {
   const { friends } = useFriendList();
   const { openChatBox , selectFriend } = useUI();

  return (
    <section className='absolute w-auto top-14 right-3 bg-[#333334] shadow-lg rounded-md p-2 text-white'>
        <header className=''>
            <label className='flex justify-between items-center mb-2 p-2' htmlFor="">
                <h1>Chats</h1>
                <div className='flex gap-2 text-gray-400 '>
                    <span className='hover:text-white'><BsThreeDots /></span>
                    <span className='hover:text-white'> <HiArrowsExpand /> </span>
                    <span className='hover:text-white'> <LuMessageCirclePlus /></span>
                </div>
            </label>
             <label className='flex items-center gap-2 bg-gray-500 rounded-full p-2 text-sm text-white'>
                      <span className='rounded-full flex justify-center items-center'>
                        <FaSearch />
                      </span>
                      <span className='hidden lg:flex items-center gap-2'>
                        <input
                          className='outline-none text-white bg-transparent'
                          type='search'
                          placeholder='Search...'
                        />
                      </span>
                    </label>
        </header>
        <main> 
            <div className='flex gap-4 mt-4 items-center mb-4'>
                <button className='bg-blue-500 text-white rounded-full px-4 py-2'> All </button>
                <button className='hover:bg-blue-500 text-white rounded-full px-4 py-2'> Unread </button>
                <button className='hover:bg-blue-500 text-white rounded-full px-4 py-2'> Groups </button>
                <button className='hover:bg-blue-500 text-white rounded-full px-4 py-2'> Communities </button>
            </div>
            <div>
                {friends.map((friend) => (
                    <div onClick={() => { selectFriend(friend); openChatBox(); }} key={friend.id} className='flex items-center gap-2 p-2 hover:bg-gray-500 rounded'>
                        <img src={friend?.profile_pic} alt="User" className='w-10 h-10 rounded-full' />
                        <span>
                            <h1>{friend?.first_name} {friend?.last_name}</h1> 
                            <p className='text-sm text-gray-400'>Hey, how are you?</p>
                        </span>
                    </div>
               ))}
            </div>
        </main>
    </section>
  )
}

export default MessageNotif