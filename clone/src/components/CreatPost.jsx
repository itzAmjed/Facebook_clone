import React ,{useState, useEffect}from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { FaUserTag } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { MdOutlineAddPhotoAlternate, MdMoreHoriz, MdEmojiEmotions } from "react-icons/md";
import { useFileUpload } from "../hooks/useFileUpload";
import { usePosts } from "../hooks/usePosts";
import { useAuth } from "../hooks/useAuth";

const CreatPost = () => {
      const [content, setContent] = useState("");
      const [hidePost, setHidePost] = useState(true);
      const closePost = () => setHidePost(false);
      const { imagePreview, imgFiles, fileInputRef, handleFileButtonClick, handleFileChange } = useFileUpload();
      const { post } = usePosts();
      const { user } = useAuth();

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
    <>
      {hidePost && (
        <div className='   fixed inset-0 z-40'>
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
                <img src={user?.profile_pic} className='w-10 h-10 rounded-full object-cover'  alt='profile' />
                <label>
                  <p>{user?.first_name} {user?.last_name}</p>
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
        </div>
      )}
    </>
  )
}

export default CreatPost