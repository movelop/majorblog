import React from 'react';
import './posts.css';
import { PostItem } from '..';

const Posts = ({ posts }) => {
  return (
    <div className="posts">
      {posts.map((post) => (
        <PostItem post = { post } key={post._id} />
      ))}
      
    </div>
  );
};

export default Posts;
