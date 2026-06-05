import React, { useState, useEffect, } from "react";

import { MdOutlineAddPhotoAlternate, MdOutlineOndemandVideo, } from "react-icons/md";
import { FaVideo } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useFileUpload } from "../hooks/useFileUpload";

import CreatPost from "./CreatPost";

const Post = () => {
  const { user } = useAuth();
  const [ShowPost, setShowPost] = useState(false);
  const showPost = () => setShowPost(true);
  const {imagePreview,fileInputRef,handleFileChange } = useFileUpload();
  useEffect(() => {
    return () => {
      imagePreview.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreview]);

 

  return (
    <header className='justify-self-center flex-1 gap-4 p-2 border-gray-300 mt-4 bg-gray-100 rounded-lg p-4 gap-4'>
      <div className='flex items-center gap-4 '>
        <Link to={`/profile/${user?.id}`}>
          <img className='w-10 h-10 rounded-full hover:opacity-80' src={user?.profile_pic} alt='profile' />
        </Link>
        <button onClick={showPost} className='border border-gray-300 text-left text-gray-600 text-xl rounded-full p-2 flex-1 hover:bg-gray-200'>
          What's on your mind, friend?
        </button>
      </div>

      {ShowPost && (
        <CreatPost />
      )}

      <div className='flex justify-center items-center gap-4 mt-4 border-t border-gray-300'>
        <label>
          <button className='flex items-center gap-2 text-gray-600 cursor-pointer hover:bg-gray-200 rounded-md py-2 px-6'>
            <FaVideo className='text-2xl text-red-500' />
            <p>Live video</p>
          </button>
        </label>
        <label>
          <input type='file' multiple ref={fileInputRef} onChange={handleFileChange} className='hidden' accept='image/*' />
          <button onClick={showPost} className='flex items-center gap-2 text-gray-600 cursor-pointer hover:bg-gray-200 rounded-md py-2 px-6'>
            <MdOutlineAddPhotoAlternate className='text-2xl text-green-500' />
            <p>Photo/Video</p>
          </button>
        </label>
        <label>
          <button className='flex items-center gap-2 text-gray-600 cursor-pointer hover:bg-gray-200 rounded-md py-2 px-6'>
            <MdOutlineOndemandVideo className='text-2xl text-purple-500' />
            <p>Reel</p>
          </button>
        </label>
      </div>
    </header>
  );
};

export default Post;
