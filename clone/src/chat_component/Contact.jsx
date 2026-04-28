import React, { useState } from "react";
import niga from "../assets/niga.jpg";
import Chatbox from "./Chatbox";
import Chat from "./Chat.jsx";
import {useUI} from "../hooks/useUI";
import { useFriendList } from "../hooks/useFriendList";

const Contact = () => {
  const { openChatBox ,  selectFriend } = useUI();
  const { friends, isLoading, error } = useFriendList();

  const handleFriendClick = (friend) => {
    selectFriend(friend);
    openChatBox();
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading friends</div>;

  return (
    <section
      className='  mt-16 rounded-lg hidden md:block 
     md:justify-self-center '>
      <h1>Contacts</h1>
      {friends.map((friend) => (
        <button key={friend.id} onClick={() => handleFriendClick(friend)} to='/profile' className='flex items-center flex-start gap-2 p-2 pr-25  mt-3 rounded-md hover:bg-blue-500 hover:text-white transition-colors duration-300 ease-in-out '>
          <img className='w-10 h-10 rounded-full' src={friend.profile_pic} alt='Profile' />
          <span> {friend.first_name} {friend.last_name} </span>
        </button>
      ))}
      <Chatbox />
      <Chat />
    </section>
  );
};

export default Contact;
