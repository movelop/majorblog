import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Header, Sidebar, Posts } from '../../components';
import './home.css'

 const Home = () => {
   const [posts, setPosts] = useState([]);
   const { search} = useLocation()
   


   useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:5000/api/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
   }, [search]);
   
  return (
      <>
        <Header />
        <div className='home'>
          <Posts posts = {posts} />
          <Sidebar />
        </div>
      </>
    
    );
};

export default Home;
