import React from "react";
import { useUI } from '../hooks/useUI';


const Chat = () => {
  const { openChatBox, isMinimized , selectedFriend } = useUI();
  if (!isMinimized) return null; // Don't show icon if chat is minimized
  return (
    <section>
      {/* Minimized bubble */}
      <button onClick={openChatBox} className='fixed z-40 cursor-pointer  bottom-17 right-2 text-white rounded-full p-2'>
        <img className='w-10 h-10 rounded-full ' src={selectedFriend?.profile_pic} alt='' />
      </button>

    </section>
  );
};

export default Chat;
