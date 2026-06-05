import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import { FaVideo, FaMinus, FaPhone, FaAngleDown , FaMicrophone} from "react-icons/fa6";
import { MdOutlineAddPhotoAlternate, MdOutlineGifBox, MdEmojiEmotions } from "react-icons/md";
import { RiEmojiStickerLine } from "react-icons/ri";
import { useUI } from '../hooks/useUI';
import { useMessages } from '../hooks/useMessages';
import { useAuth } from '../hooks/useAuth';

const Chatbox = () => {
  const { minimizeChatBox, closeChatBox, isChatboxVisible, selectedFriend } = useUI();
  const { messages, postMessage } = useMessages(selectedFriend?.friend_id);
  const { user } = useAuth();
  const [messageText, setMessageText] = useState('');
  const bottomRef = useRef(null);

  // auto scroll to bottom when new messages arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isChatboxVisible) return null;

  const handleSend = () => {
    if (!messageText.trim()) return;
    postMessage(
      { receiver_id: selectedFriend?.friend_id, message: messageText },
      { onSuccess: () => setMessageText('') }
    );
  };

  return (
    <>
      <div className='fixed right-17 bottom-0 w-80 h-[450px] bg-[#1e1f23] text-white rounded-t-lg flex flex-col shadow-lg overflow-hidden'>
        
        {/* Header */}
        <header className='flex items-center justify-between px-3 py-2 bg-[#242526] border-b border-gray-600'>
          <Link className='flex items-center gap-2' to={`/profile/${selectedFriend?.friend_id}`}>
            <img src={selectedFriend?.profile_pic} className='w-8 h-8 rounded-full' alt='profile' />
            <div>
              <p className='text-sm font-medium'>{selectedFriend?.first_name} {selectedFriend?.last_name}</p>
              <p className='text-xs text-gray-400'>Active</p>
            </div>
            <button className='text-gray-400 hover:text-white'><FaAngleDown /></button>
          </Link>
          <div className='flex items-center gap-2 text-lg text-gray-300'>
            <FaPhone className='cursor-pointer hover:text-white' />
            <FaVideo className='cursor-pointer hover:text-white' />
            <button onClick={minimizeChatBox} className='cursor-pointer hover:text-white'>
              <FaMinus />
            </button>
            <button onClick={closeChatBox}>
              <IoMdClose className='cursor-pointer hover:text-white' />
            </button>
          </div>
        </header>

        {/* Messages */}
        <main className='flex-1 overflow-y-auto px-3 py-2 space-y-2 bg-[#1e1f23]'>
          {messages.map((msg) => {
            const isMe = msg.sender_id === user?.id;
            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                {!isMe && (
                  <img src={selectedFriend?.profile_pic} className='w-7 h-7 rounded-full mr-2 self-end' />
                )}
                <div className={`text-sm px-3 py-2 rounded-2xl max-w-[75%] ${isMe ? 'bg-[#4b44ff]' : 'bg-[#3a3b3c]'}`}>
                  {msg.message}
                </div>
              </div>
            );
          })}
          {/* auto scroll anchor */}
          <div ref={bottomRef} />
        </main>

        {/* Footer */}
        <footer className='flex items-center justify-between border-t border-gray-700 bg-[#242526] px-3 py-2 gap-2'>
          <div className='flex items-center gap-2 text-xl text-gray-400'>
            <FaMicrophone className='cursor-pointer hover:text-white' />
            <MdOutlineAddPhotoAlternate className='cursor-pointer hover:text-white' />
            <RiEmojiStickerLine className='cursor-pointer hover:text-white' />
            <MdOutlineGifBox className='cursor-pointer hover:text-white' />
          </div>
          <div className='flex items-center bg-[#3a3b3c] rounded-full px-3 py-1 flex-1'>
            <input
              type='text'
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder='Aa'
              className='bg-transparent outline-none text-white text-sm flex-1 placeholder-gray-400 w-30'
            />
          </div>
          <button onClick={handleSend}>
            <MdEmojiEmotions className='cursor-pointer hover:text-white' />
          </button>
        </footer>
      </div>
    </>
  );
};

export default Chatbox;