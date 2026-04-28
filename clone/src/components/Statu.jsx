import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { MdOutlineEmojiEmotions, MdMoreHoriz } from "react-icons/md";
import { BiLike } from "react-icons/bi";
import { usePosts } from "../hooks/usePosts";

const Statu = () => {
  const { posts, isLoading, error, deletePost } = usePosts();
  //const [isStatusVisible, setIsStatusVisible] = useState(true);

  if (isLoading) return <p className='text-white'>Loading posts...</p>;
  if (error) return <p className='text-white'>Something went wrong</p>;

  return (
    <>
      {posts?.map((post) => (
        <section key={post.id} className='w-[550px] h-auto bg-[#333334] text-white rounded-lg shadow-lg'>
          <div className='flex gap-4 p-4'>
            <img src={post.profile_pic} className='w-10 h-10 rounded-full' alt='profile' />
            <span className='flex-col text-sm text-gray-400'>
              <div className='flex gap-2'>
                <p className='text-white'>{post.first_name}</p>
                <p className='text-white'>{post.last_name}</p>
              </div>
              <p>{post.created_at}</p>
            </span>
            <div className='flex gap-2 ml-auto text-2xl p-2'>
              <button className='hover:bg-gray-500 rounded-full p-1'>
                <MdMoreHoriz />
              </button>
              {/* ✅ deletePost from usePosts hook */}
              <button onClick={() => deletePost(post.id)} className='hover:bg-gray-500 rounded-full p-1 cursor-pointer'>
                <IoIosClose />
              </button>
            </div>
          </div>

          <label className='flex flex-col gap-2 p-4 border-b border-gray-500'>
            <p>{post.content}</p>
{post.images && post.images.length > 0 && post.images.map((img, index) => (
  <img key={index} src={`/api/${img}`} alt='' className='rounded' />
))}
            <span>
              <MdOutlineEmojiEmotions className='text-yellow-500' />
            </span>
          </label>

          <div className='flex justify-around p-4 text-sm text-gray-400'>
            <button className='flex justify-center items-center gap-1 hover:bg-gray-500 rounded-lg py-1 px-5'>
              <BiLike /> Like
            </button>
            <button className='flex justify-center items-center gap-1 hover:bg-gray-500 rounded-lg py-1 px-5'>
              <BiLike /> Comment
            </button>
            <button className='flex justify-center items-center gap-1 hover:bg-gray-500 rounded-lg py-1 px-5'>
              <BiLike /> Share
            </button>
          </div>
        </section>
      ))}
    </>
  );
};

export default Statu;
