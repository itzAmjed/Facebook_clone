import React from "react";
import Navbar from "../components/Navbar";
import NavLinks from "../components/NavLinks";
import MainPost from "../components/MainPost";
import Contact from "../chat_component/Contact";
import Chatbox from "../chat_component/Newchat";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <section className='flex justify-between justify-items-center gap-4 px-2 '>
        <div className='justify-self-start '>
          <NavLinks />
        </div>
        <div className='w-[550px] mt-13'>
          <MainPost />
        </div>
        <div className='justify-self-start   '>
          <Contact />
        </div>
      </section>
      <Chatbox />
    </>
  );
};

export default HomePage;
