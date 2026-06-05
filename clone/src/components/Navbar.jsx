import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { FaSearch, FaFacebookMessenger, FaUser, FaQuestionCircle } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import { MdOutlineOndemandVideo, MdGroup, MdKeyboardArrowDown, MdKeyboardArrowRight, MdFeedback } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { HiUserGroup, HiMiniSquares2X2 } from "react-icons/hi2";
import { IoNotifications, IoMoon } from "react-icons/io5";
import { RiSettings5Fill } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Notification from "./Notification";
import MessageNotif from "./MessageNotif";



const Navbar = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showMessageNotif, setShowMessageNotif] = useState(false);

  // ✅ single source of truth for logged in user
  const { user } = useAuth();
  const toggleNotif = () => setShowNotification((prev) => !prev);
  const toggleDropdown = () => setShowDropdown((prev) => !prev);
  const toggleMessageNotif = () => setShowMessageNotif((prev) => !prev);

  // search stays exactly the same
  useEffect(() => {
    if (!searchQuery) return;
    fetch("/api/search.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ first_Name: searchQuery }),
    })
      .then((res) => res.json())
      .then((data) => setResults(data))
      .catch((err) => console.error("Error:", err));
  }, [searchQuery]);

  const handleSearch = (e) => setSearchQuery(e.target.value);

 //logout function
const navigate = useNavigate();
const queryClient = useQueryClient();

const handleLogout = async () => {
  await fetch('/api/logout.php', {
    method: 'POST',
    credentials: 'include'
  });

  queryClient.clear(); // wipe all cached data
  navigate('/login');  // redirect to login
};
  

  const Nav_center = "bg-transparent border-none cursor-pointer text-gray-600 hover:bg-blue-500 hover:text-white px-8 py-2 rounded-md transition-colors duration-300 ease-in-out text-2xl";
  const Nav_right = "bg-gray-300 border-none cursor-pointer text-gray-600 hover:bg-blue-500 hover:text-white p-3 rounded-full transition-colors duration-300 ease-in-out text-2xl";

  const CenterButtons = [
    { icon: <GoHomeFill />, label: "Home" },
    { icon: <MdGroup />, label: "Groups" },
    { icon: <CiShop />, label: "Marketplace" },
    { icon: <MdOutlineOndemandVideo />, label: "Watch" },
    { icon: <HiUserGroup />, label: "Friends" },
  ];

  return (
    <nav className='fixed w-full flex justify-between items-center p-1 bg-white shadow-md z-10'>
      {/* everything below is identical to what you had */}
      <div className='flex items-center gap-2'>
        <Link to='/HomePage'>
          <img src={logo} alt='Logo' className='w-9 ml-3' />
        </Link>
        <label className='flex items-center gap-2 bg-gray-100 rounded-full p-2'>
          <span className='rounded-full flex justify-center items-center'>
            <FaSearch />
          </span>
          <span className='hidden lg:flex items-center gap-2'>
            <input
              value={searchQuery}
              onClick={() => setResults([])}
              onChange={handleSearch}
              className='outline-none bg-transparent'
              type='search'
              placeholder='Search...'
            />
          </span>
        </label>
      </div>

      {results.length > 0 && (
        <div className='absolute top-14 left-10 bg-white shadow-lg rounded-md p-2 w-64'>
          {results.map((u, i) => (
            <div key={i} className='flex items-center gap-2 p-2 hover:bg-gray-100 rounded'>
              <img src={u.profile_pic} alt={`${u.first_Name} ${u.last_Name}`} className='w-8 h-8 rounded-full' />
              <Link to={`/profile/${u.id}`}>
                <span>{u.first_Name} {u.last_Name}</span>
              </Link>
            </div>
          ))}
        </div>
      )}

      <div className='flex items-center gap-3 hidden md:flex'>
        {CenterButtons.map((btn, index) => (
          <div className='relative group' key={index}>
            <button className={Nav_center}>{btn.icon}</button>
            <div className='absolute top-full mt-2 w-full flex justify-center'>
              <span className='px-3 py-1 text-sm bg-gray-200 text-black rounded shadow hidden group-hover:block'>
                {btn.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className='flex items-center gap-3'>
        {/* messenger */}
        <div className='relative group'>
          <button onClick={toggleMessageNotif} className={Nav_right}><FaFacebookMessenger /></button>
          <div className='absolute top-full mt-2 w-full flex justify-center'>
            <span className='px-3 py-1 text-sm bg-gray-200 text-black rounded shadow hidden group-hover:block'>messenger</span>
          </div>
        </div>
        {showMessageNotif && (
          <MessageNotif />
        )}

        {/* more */}
        <div className='relative group'>
          <button  className={Nav_right}><HiMiniSquares2X2 /></button>
          <div className='absolute top-full mt-2 w-full flex justify-center'>
            <span className='px-3 py-1 text-sm bg-gray-200 text-black rounded shadow hidden group-hover:block'>more</span>
          </div>
        </div>

        {/* notifications */}
        <div className='relative group'>
          <button onClick={toggleNotif} className={Nav_right}><IoNotifications /></button>
          <div className='absolute top-full mt-2 w-full flex justify-center'>
            <span className='px-3 py-1 text-sm bg-gray-200 text-black rounded shadow hidden group-hover:block'>notifications</span>
          </div>
        </div>

        {showNotification && (
          <Notification />
        )}

        {/* profile dropdown */}
        <div className='relative group'>
          <button onClick={toggleDropdown} className={Nav_right + " flex items-center gap-1"}>
            <FaUser />
            <MdKeyboardArrowDown className='bg-gray-600 text-white text-sm rounded-full' />
          </button>
          <div className='absolute top-full mt-2 w-full flex justify-center'>
            <span className='px-3 py-1 text-sm bg-gray-200 text-black rounded shadow hidden group-hover:block'>Account</span>
          </div>
        </div>

        {showDropdown && (
          <div className='absolute top-14 right-3 bg-[#333334] shadow-lg rounded-md p-2 text-white'>
            <label className='bg-[#333334] shadow-lg rounded-md rounded-lg p-2 flex flex-col'>
              {/* ✅ user replaces both authUser and user */}
              <Link to={`/profile/${user?.id}`}>
                <span className='flex rounded-lg items-center gap-2 p-2 mb-2 hover:bg-[#404041]'>
                  <img src={user?.profile_pic} alt='Profile' className='w-8 h-8 rounded-full' />
                  <p className='font-bold'>{user?.first_name} {user?.last_name}</p>
                </span>
              </Link>
              <button className='w-auto py-1 rounded-lg bg-[#404041]'>See all profiles</button>
            </label>
            <ul className='mt-2 space-y-2'>
              <label className='flex items-center rounded-lg gap-2 p-2 hover:bg-[#404041] cursor-pointer'>
                <span className='rounded-full text-xl p-1 bg-[#404041]'><RiSettings5Fill /></span>
                <li>Settings & privacy</li>
                <span className='ml-auto text-2xl'><MdKeyboardArrowRight /></span>
              </label>
              <label className='flex items-center rounded-lg gap-2 p-2 hover:bg-[#404041] cursor-pointer'>
                <span className='rounded-full text-xl p-1 bg-[#404041]'><FaQuestionCircle /></span>
                <li>Help & support</li>
                <span className='ml-auto text-2xl'><MdKeyboardArrowRight /></span>
              </label>
              <label className='flex items-center rounded-lg gap-2 p-2 hover:bg-[#404041] cursor-pointer'>
                <span className='rounded-full text-xl p-1 bg-[#404041]'><IoMoon /></span>
                <li>Display & support</li>
                <span className='ml-auto text-2xl'><MdKeyboardArrowRight /></span>
              </label>
              <label className='flex items-center rounded-lg gap-2 p-2 hover:bg-[#404041] cursor-pointer'>
                <span className='rounded-full text-xl p-1 bg-[#404041]'><MdFeedback /></span>
                <li>Give feedback</li>
              </label >
              <label className='flex items-center rounded-lg gap-2 p-2 hover:bg-[#404041] cursor-pointer' onClick={handleLogout}>
                <span className='rounded-full text-xl p-1 bg-[#404041]'><TbLogout /></span>
               <li>logout</li>
              </label>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;