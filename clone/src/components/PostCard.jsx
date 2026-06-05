import React, { useState } from "react";
import { BiLike, BiComment } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { useComments } from "../hooks/useComments";
import { useAuth } from "../hooks/useAuth";
import PostLikeButton from "./PostLikeButton";

const PostCard = ({ post, onClose }) => {
  const { user } = useAuth();
  const { comments, isLoading, postComment } = useComments(post.id);
  const [commentText, setCommentText] = useState("");

  const handlePostComment = () => {
    if (!commentText.trim()) return;
    postComment(
      { comment: commentText, post_id: post.id },
      {
        onSuccess: () => setCommentText(""),
      },
    );
  };

  return (
    <>
      {/* overlay */}
      <div className='fixed inset-0 bg-black opacity-50 z-40' onClick={onClose} />

      {/* modal */}
      <section
        className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        w-[550px] bg-[#333334] text-white rounded-lg shadow-lg z-50 overflow-y-auto max-h-[90vh]'>
        {/* header */}
        <div className='flex items-center justify-between p-4 border-b border-gray-500'>
          <h1 className='text-lg font-bold'>{post.first_name}'s Post</h1>
          <button onClick={onClose} className='hover:bg-gray-500 rounded-full p-1'>
            <IoClose />
          </button>
        </div>

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
        <div  className=' px-4 pb-4'>
          <p>{post.content}</p>
          {post.images && post.images.length > 0 && post.images.map((img, index) => <img key={index} src={`/api/${img}`} alt='' className='rounded mt-2' />)}
          <span className='mt-2 block'>
            <MdOutlineEmojiEmotions className='text-yellow-500' />
          </span>
        </div>

        {/* like comment share */}
        <div className='flex justify-around p-4 text-sm text-gray-400 border-t border-gray-500'>
          <PostLikeButton postId={post.id} />
          <button className='flex justify-center items-center gap-1 hover:bg-gray-500 rounded-lg py-1 px-5'>
            <BiComment /> Comment
          </button>
          <button className='flex justify-center items-center gap-1 hover:bg-gray-500 rounded-lg py-1 px-5'>
            <BiLike /> Share
          </button>
        </div>

        {/* comments list */}
        <div className='px-4 pb-4 flex flex-col gap-3'>
          {isLoading ? (
            <p className='text-gray-400 text-sm'>Loading comments...</p>
          ) : comments.length === 0 ? (
            <p className='text-gray-400 text-sm'>No comments yet — be the first!</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className='flex gap-2'>
                <img src={comment.profile_pic} className='w-8 h-8 rounded-full' alt='profile' />
                <div className='bg-[#404041] px-3 py-2 rounded-2xl'>
                  <p className='text-sm font-semibold'>
                    {comment.first_name} {comment.last_name}
                  </p>
                  <p className='text-sm'>{comment.comment}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* comment input */}
        <footer className='flex gap-2 p-4 border-t border-gray-500'>
          <img src={user?.profile_pic} className='w-8 h-8 rounded-full' alt='profile' />
          <input type='text' value={commentText} onChange={(e) => setCommentText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handlePostComment()} placeholder='Write a comment...' className='flex-1 p-2 bg-[#404041] rounded-full outline-none text-sm px-4' />
          <button onClick={handlePostComment} className='bg-blue-500 px-4 py-1 rounded-full text-sm hover:bg-blue-600'>
            Post
          </button>
        </footer>
      </section>
    </>
  );
};

export default PostCard;
