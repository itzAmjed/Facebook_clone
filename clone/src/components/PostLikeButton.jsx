import React from "react";
import { BiLike } from "react-icons/bi";
import { useLikes } from "../hooks/useLikes";

const PostLikeButton = ({ postId }) => {
  const { likeData, likeMutation } = useLikes(postId);
  return (
    <button onClick={() => likeMutation.mutate({ post_id: postId })} className='flex justify-center items-center gap-1 hover:bg-gray-500 rounded-lg py-1 px-5'>
      <BiLike color={likeData?.liked ? "#1877f2" : "gray"} />
      {likeData?.count || 0} Like
    </button>
  );
};

export default PostLikeButton;
