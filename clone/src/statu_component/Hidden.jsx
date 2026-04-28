import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import { TbMessageReportFilled } from "react-icons/tb"; 
import Statu from "../components/Statu.jsx";



const Hidden = () => {
    const [isHidden, setIsHidden] = useState(true);

    const handleUndo = () => {
        setIsHidden(false);
        // Logic to undo the hiding action can be added here
    };
  return ( 
 <>
    {isHidden ? (
       
    <section className="w-[550px] h-[auto] bg-[#333334] text-white rounded-lg shadow-lg">
      <header className='flex justify-between items-center p-4 border-b border-gray-500'>
        <label className='flex items-center'>
          <span className='text-xl mr-2 text-white'>
            <FaWindowClose />
          </span>
          <span>
            <h1> Hidden </h1>
            <p className='text-gray-400 text-sm'> hiding posts helps Facebook personalise your feed </p>
          </span>
        </label>
        <button onClick={handleUndo} className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600">Undo</button>
      </header>
      <main className='flex flex-col gap-4 p-4'>

        <label className='flex items-center hover:bg-gray-500 hover:rounded-lg '>
          <span className='text-xl mr-2  pl-2 text-white'>
            <MdAccessTimeFilled />
          </span>
          <span className="">
            <h1> Snooze {" profile name"} for 30 day</h1>
            <p className='text-gray-400 text-sm'> temporary stop seeing posts </p>
          </span>

        </label>
        <label className='flex items-center hover:bg-gray-500 hover:rounded-lg' >
          <span className='text-xl mr-2 pl-2 text-white'>
            <TbMessageReportFilled />
          </span>
          <span>
            <h1> Report post </h1>
            <p className='text-gray-400 text-sm'> we wont let {"profile name"} know who reported this </p>
          </span>
        </label>
      </main>
    </section>  ):( <Statu/>)}</>
  );
};

export default Hidden;
