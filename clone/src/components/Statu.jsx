import React, { useState } from "react";
import { BiLike, BiComment } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { usePosts } from "../hooks/usePosts";
import { BsThreeDots } from "react-icons/bs";
import { IoMdShareAlt } from "react-icons/io";
import { useGetCommentCount } from "../hooks/useGetCommentCount";
import PostCard from "./PostCard";
import EditePost from "./EditePost";
import PostLikeButton from "./PostLikeButton";

const Statu = () => {
  const { posts, isLoading, error, deletePost } = usePosts();
  const [activePostId, setActivePostId] = useState(null);
  const [showEditPost, setShowEditPost] = useState(null);


  if (isLoading) return <p className='text-white'>Loading posts...</p>;
  if (error) return <p className='text-white'>Something went wrong</p>;

  const PostComentCount = ({ postId }) => {
    const { commentCount } = useGetCommentCount(postId);
    return (
      <span className='text-gray-400 text-sm'>
        {commentCount}
        comments
      </span>
    );
  };

  

  return (
    <>
      {posts?.map((post) => (
        <section key={post.id} className='w-[550px] h-auto bg-[#333334] text-white rounded-lg shadow-lg'>
          {/** post user info */}

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
              <button onClick={() => setShowEditPost(post.id)} className='hover:bg-gray-500 rounded-full p-1'>
                <BsThreeDots />
              </button> 
              {showEditPost === post.id && <EditePost post={post} onClose={() => setShowEditPost(null)} />}


              <button onClick={() => deletePost(post.id)} className='hover:bg-gray-500 rounded-full p-1 cursor-pointer'>
                <IoClose />
              </button>
            </div>
          </div>

          {/** content */}

          <label className='flex flex-col gap-2 p-4 '>
            <p>{post.content}</p>
            {post.images && post.images.length > 0 && post.images.map((img, index) => <img key={index} src={`/api/${img}`} alt='' className='rounded' />)}
          </label>

          {/** react and comments */}
          <label className='flex justify-between p-4 '>
            <div>
              <span className='text-gray-400 flex text -sm'>
                <MdOutlineEmojiEmotions className='text-yellow-500' />
              </span>
            </div>
            <PostComentCount postId={post.id} />
          </label>

          {/** action buttons */}

          <div className='flex justify-around p-4 text-sm text-gray-400'>
            <PostLikeButton postId={post.id} />
            <button onClick={() => setActivePostId(post.id)} className='flex justify-center items-center gap-1 hover:bg-gray-500 rounded-lg py-1 px-5'>
              <BiComment /> Comment
            </button>
            <button className='flex justify-center items-center gap-1 hover:bg-gray-500 rounded-lg py-1 px-5'>
              <IoMdShareAlt /> Share
            </button>
          </div>

          {activePostId === post.id && <PostCard post={post} 
          onClose={() => setActivePostId(null)} />}
        </section>
      ))}
    </>
  );
};

export default Statu;
