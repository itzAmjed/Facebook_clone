import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const NavLinks = () => {
  const { user } = useAuth();

  return (
    <section className='mt-17 rounded-lg hidden lg:block'>
      <Link 
        to={`/profile/${user?.id}`} 
        className='flex items-center gap-2 p-2 pr-45 rounded-md hover:bg-blue-500 hover:text-white transition-colors duration-300 ease-in-out'>
        <img className='w-10 h-10 rounded-full' src={user?.profile_pic} alt='Profile' />
        <span>{user?.first_name}</span>
        <span>{user?.last_name}</span>
      </Link>
    </section>
  );
};

export default NavLinks;