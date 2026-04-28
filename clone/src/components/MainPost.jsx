import React from "react";
import Statu from "./Statu";
import Post from "./Post";
import Story from "./Story";

const MainPost = () => {
  return (
    <section className='flex flex-col gap-2 '>
      <Post />
      <Story />
      <Statu />
    </section>
  );
};

export default MainPost;
