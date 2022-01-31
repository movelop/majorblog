import React from 'react';
import { Sidebar, SinglePost } from '../../components';
import './post.css';

const Post = () => {
  return (
    <div className='single'>
        <SinglePost />
        <Sidebar />
    </div>
  );
};

export default Post;
