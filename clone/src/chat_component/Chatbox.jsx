import React from 'react'

import { Link } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import { FaVideo, FaMinus, FaPhone, FaMicrophone, FaAngleDown } from "react-icons/fa6";
import { MdOutlineAddPhotoAlternate, MdOutlineGifBox, MdEmojiEmotions } from "react-icons/md";
import { RiEmojiStickerLine } from "react-icons/ri";
import { useUI } from '../hooks/useUI';




const Chatbox = () => {
  const { minimizeChatBox, closeChatBox, isChatboxVisible, selectedFriend , clearFriend } = useUI();
 

  if (!isChatboxVisible) return null; // Prevent rendering if chatBox is not open

  // Main chatbox structure
return (
  <>
   <div className=' fixed right-17 bottom-0  w-80 h-[450px] bg-[#1e1f23] text-white rounded-t-lg flex flex-col shadow-lg overflow-hidden'>
        {/* Header */}

          <header key={selectedFriend?.id} className='flex items-center justify-between px-3 py-2 bg-[#242526] border-b border-gray-600'>
            <Link className='flex items-center gap-2' to={`/profile/${selectedFriend?.id}`}>
              <img src={selectedFriend?.profile_pic} className='w-8 h-8 rounded-full' alt='profile' />
              <div>
                <p className='text-sm font-medium'>{selectedFriend?.first_name} {selectedFriend?.last_name}</p>
                <p className='text-xs text-gray-400'>Active 22m ago</p>
              </div>
              <button className='text-gray-400 hover:text-white'>
                {" "}
                <FaAngleDown />
              </button>
            </Link>
        <div className='flex items-center gap-2 text-lg text-gray-300'>
          <FaPhone className='cursor-pointer hover:text-white' />
          <FaVideo className='cursor-pointer hover:text-white' />
          <button onClick={minimizeChatBox} className='cursor-pointer hover:text-white'>
          <FaMinus className='cursor-pointer hover:text-white' />
          </button>
         <button onClick={closeChatBox}>
  <IoMdClose className='cursor-pointer hover:text-white' />
</button>
        </div>
      </header>
      
      

      <main className='flex-1 overflow-y-auto px-3 py-2 space-y-4 bg-[#1e1f23]'>
      
          <div key={selectedFriend?.id} className='flex flex-col items-start space-y-1'>
            <span className='flex items-center gap-1'>
              <img src={selectedFriend?.profile_pic} className='w-8 h-8 rounded-full' />
              <p className='bg-[#3a3b3c] text-sm px-3 py-2 rounded-2xl max-w-[75%]'>i realllly appreciate your help</p>
            </span>
            <p className=' relative left-47 bottom-3 bg-[#3a3b3c] text-sm  rounded-2xl max-w-[75%]'>😅</p>
          </div>
     

        <div className='flex justify-end'>
          <div className='bg-[#4b44ff] text-sm px-3 py-2 rounded-2xl max-w-[75%]'>I did nothing. it's okay</div>
        </div>
      </main>
   
      {/* Footer / Input */}
      <footer className=' flex item-center justify-between border-t border-gray-700 bg-[#242526] px-3 py-2'>
        <div className='flex items-center gap-2 text-xl text-gray-400 mb-2'>
          <FaMicrophone className='cursor-pointer hover:text-white' />
          <MdOutlineAddPhotoAlternate className='cursor-pointer hover:text-white' />
          <RiEmojiStickerLine className='cursor-pointer hover:text-white' />
          <MdOutlineGifBox className='cursor-pointer hover:text-white' />
        </div>
        <div className='flex items-center bg-[#3a3b3c] rounded-full px-3 py-1'>
          <input type='text' placeholder='Aa' className='bg-transparent outline-none text-white text-sm flex-1 placeholder-gray-400 w-30' />
        </div>
        <button>
          {" "}
          <MdEmojiEmotions className='cursor-pointer hover:text-white' />
        </button>
      </footer>
    </div>
         </>
  )
}

export default Chatbox
