import React, { useState, useEffect } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { FaUserTag } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { MdOutlineAddPhotoAlternate, MdMoreHoriz, MdEmojiEmotions } from "react-icons/md";
import { useFileUpload } from "../hooks/useFileUpload";
import { useAuth } from "../hooks/useAuth";
import { useEditPost } from "../hooks/useEditPost";

const EditePost = ({ post, onClose }) => {
  const [content, setContent] = useState(post.content || "");
  const [hidePost, setShowPost] = useState(true);
  const { imagePreview, imgFiles, fileInputRef, handleFileButtonClick, handleFileChange } = useFileUpload();
  const { user } = useAuth();
  const { editPostMutation } = useEditPost();

  useEffect(() => {
    return () => {
      imagePreview.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreview]);

  const handleEditPost = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", content);
    formData.append("post_id", post.id);
    imgFiles.forEach((file) => {
      formData.append("image_url[]", file);
    });

    editPostMutation.mutate(formData, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <>
      {hidePost && (
        <div className='   fixed inset-0 z-40'>
          <section className='w-[500px] h-auto bg-[#333334] text-white rounded-lg shadow-lg fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <header className='flex p-4 border-b border-gray-300'>
              <h1 className='text-lg relative left-45 font-semibold'>Edit Post</h1>

              <button onClick={onClose} className='ml-auto bg-gray-500 p-1 cursor-pointer rounded-full text-2xl text-white'>
                <IoMdClose />
              </button>
            </header>

            <main className='flex flex-col gap-2 p-4'>
              <input type='file' multiple ref={fileInputRef} onChange={handleFileChange} className='hidden' accept='image/*' />

              {/* post info */}
              <div className='flex gap-4 p-4'>
                <img src={post.profile_pic} className='w-10 h-10 rounded-full' alt='profile' />
                <span className='flex flex-col text-sm text-gray-400'>
                  <div className='flex gap-2'>
                    <p className='text-white'>{post.first_name}</p>
                    <p className='text-white'>{post.last_name}</p>
                  </div>
                  <p>{post.created_at}</p>
                </span>
              </div>

              {/* post content */}
              <div className=' px-4 pb-4'>
                <input type='text' value={content} onChange={(e) => setContent(e.target.value)} className='w-full bg-transparent  focus:outline-none text-white' placeholder="What's on your mind?" />
                <div className='flex flex-wrap gap-2 mt-2'>
                  {imagePreview.length > 0
                    ? imagePreview.map((src, index) => <img key={`new-${index}`} src={src} alt='' className='rounded mt-2 ' />)
                    : post.images && post.images.map((img, index) => <img key={`existing-${index}`} src={`/api/${img}`} alt='' className='' />)}
                </div>
              </div>

              <div className='flex items-center justify-between p-1 border rounded-lg border-gray-300'>
                <p className='text-sm text-white '>Add to your post</p>
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

            <button onClick={handleEditPost} className='relative left-[10%] gap-1 bg-blue-500 hover:bg-blue-600 text-[20px] rounded-lg w-[80%] mb-4'>
              Next
            </button>
          </section>
        </div>
      )}
    </>
  );
};

export default EditePost;
