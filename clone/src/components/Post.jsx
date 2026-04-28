import React, { useState, useEffect, } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import profile from "../assets/profile.jpg";
import { MdOutlineAddPhotoAlternate, MdOutlineOndemandVideo, MdMoreHoriz, MdEmojiEmotions } from "react-icons/md";
import { FaVideo, FaUserTag } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useFileUpload } from "../hooks/useFileUpload";
import { usePosts } from "../hooks/usePosts";

const Post = () => {
  const { user } = useAuth();
  const [ShowPost, setShowPost] = useState(false);
  const [content, setContent] = useState("");
  const showPost = () => setShowPost(true);
  const closePost = () => setShowPost(false);
  const { imagePreview, imgFiles, fileInputRef, handleFileButtonClick, handleFileChange } = useFileUpload();
  const { post } = usePosts();

  useEffect(() => {
    return () => {
      imagePreview.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreview]);

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", content);
    imgFiles.forEach((file) => {
      formData.append("image_url[]", file);
    });

    post(formData, {
      onSuccess: () => {
        setContent("");
        setShowPost(false);
      },
    });
  };

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
        <>
          <div className='bg-black opacity-50 fixed inset-0 z-40'></div>
          <section className='w-[500px] h-auto bg-[#333334] text-white rounded-lg shadow-lg fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <header className='flex p-4 border-b border-gray-300'>
              <h1 className='text-lg relative left-45 font-semibold'>Create Post</h1>
              <button onClick={closePost} className='ml-auto bg-gray-500 p-1 cursor-pointer rounded-full text-2xl text-white'>
                <IoMdClose />
              </button>
            </header>

            <main className='flex flex-col gap-2 p-4'>
              <input type='file' multiple ref={fileInputRef} onChange={handleFileChange} className='hidden' accept='image/*' />

              <div className='flex items-center gap-4 p-2'>
                <img className='w-10 h-10 rounded-full object-cover' src={profile} alt='profile' />
                <label>
                  <p>Profile Name</p>
                  <button className='bg-blue-500 text-white rounded-sm text-sm px-2 cursor-pointer'>Public</button>
                </label>
              </div>

              <input type='text' value={content} onChange={(e) => setContent(e.target.value)} placeholder="What's on your mind, friend?" className='w-full h-20 p-2 outline-none text-white bg-transparent' />

              {imagePreview.length > 0 && (
                <div className='mt-1 grid grid-cols-1 gap-2'>
                  {imagePreview.map((src, index) => (
                    <img key={index} src={src} alt={`${index}`} className='max-h-32 object-cover rounded-md' />
                  ))}
                </div>
              )}

              <div className='flex items-center justify-between p-2 border rounded-lg border-gray-300'>
                <p>Add to your post</p>
                <span className='flex items-center gap-2 text-xl'>
                  <button onClick={handleFileButtonClick} className='text-green-500 cursor-pointer hover:bg-gray-500 rounded-full p-1'>
                    <MdOutlineAddPhotoAlternate />
                  </button>
                  <button className='text-blue-500 cursor-pointer hover:bg-gray-500 rounded-full p-1'>
                    <FaUserTag />
                  </button>
                  <button className='text-yellow-500 cursor-pointer hover:bg-gray-500 rounded-full p-1'>
                    <MdEmojiEmotions />
                  </button>
                  <button className='text-red-500 cursor-pointer hover:bg-gray-500 rounded-full p-1'>
                    <IoLocationSharp />
                  </button>
                  <button className='text-purple-500 cursor-pointer hover:bg-gray-500 rounded-full p-1'>
                    <MdMoreHoriz />
                  </button>
                </span>
              </div>
            </main>

            <button onClick={handlePostSubmit} className='relative mt-2 left-12 w-[80%] bg-blue-500 cursor-pointer rounded-lg p-1 mb-2'>
              Next
            </button>
          </section>
        </>
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
