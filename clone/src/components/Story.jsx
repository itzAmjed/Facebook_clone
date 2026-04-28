import React from "react";
import niga from "../assets/niga.jpg";
import { IoIosAdd } from "react-icons/io";
import { useAuth } from "../hooks/useAuth";


import { useFriendList } from "../hooks/useFriendList";
 

const Story = () => { 
  const { user  } = useAuth();


const { friends } = useFriendList();
  return (
    <main className=' flex gap-2 flex-1  p-2 border-gray-300 '>
      <div className='w-[150px] h-[200px] relative rounded-xl overflow-hidden group'>
        <div className='absolute inset-0  bg-cover bg-center group-hover:brightness-75 transition duration-200'> <img src={user?.profile_pic} alt='friend' className='w-full h-full object-cover' /></div>
        <div className='relative  flex flex-col items-center justify-end h-full p-2'>
          <button className='bg-blue-500 text-white   rounded-full mt-2 hover:bg-blue-600 transition duration-200'>
            <IoIosAdd className='text-3xl' />
          </button>
          <span className='text-white text-sm mt-2'>add story </span>
        </div>
      </div>
      <div className='w-[150px] h-[200px] relative rounded-xl overflow-hidden group'>
        <div className='absolute inset-0 bg-[url(/src/assets/cat.jpg)] bg-cover bg-center group-hover:brightness-75 transition duration-200'></div>

        <div className='relative  flex flex-col items-center justify-end h-full p-2'>
          {friends.map((friend) => (
            <img key={friend.friend_id} src={friend?.profile_pic} className='absolute top-3 left-3 w-10 h-10 rounded-full border-2 border-blue-500' alt='friend' />
          ))}
          <span className='text-white text-sm mt-2'>friend story</span>
        </div>
      </div>
    </main>
  );
};

export default Story;
