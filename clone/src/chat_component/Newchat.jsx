import React from "react";
import { LuMessageCirclePlus } from "react-icons/lu";
const Newchat = () => {
  return (
    <div className='group'>
      <button className=' fixed bottom-4 right-3  z-40 bg-gray-500 text-white rounded-full p-3 cursor-pointer'>
        <LuMessageCirclePlus className='text-2xl' />
      </button>
      <div className='fixed z-40   bottom-5 right-13 text-white rounded-full p-2 hidden group-hover:block'>
        <span className=' bg-gray-200 p-2 rounded-lg text-black'>new chat</span>
      </div>
    </div>
  );
};

export default Newchat;
