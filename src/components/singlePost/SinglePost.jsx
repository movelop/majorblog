import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './singlePost.css';
import { Context } from '../../context/Context';

const SinglePost = () => {
    const [post, setPost] = useState({});
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updatePost, setUpdatePost] = useState(false);
    const location = useLocation();
    const postId = location.pathname.split('/')[2];
    const { user } = useContext(Context);

    const PF = "http://localhost:5000/images/";

    useEffect(() => {
      const fetchPost = async () => {
            const res = await axios.get(`http://localhost:5000/api/posts/${postId}`);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
      };
      fetchPost();
    }, [postId]);

    const handleDelete = async () => {
        try {
            axios.delete(`http://localhost:5000/api/posts/${postId}`, {
                data: { username: user.username }
            });

            window.location.replace("/");
        } catch (error) {
            console.log(error);
        }
    } 

    const handleUpdate = async() => {
        try {
            axios.put(`http://localhost:5000/api/posts/${postId}`, {
                username: user.username, 
                title, 
                desc,
            });

            setUpdatePost(false);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }
    
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {updatePost ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdatePost(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b> {post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updatePost ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updatePost && (
            <div className='singlePostButtons'>
                <button className="singlePostButton2" onClick={ () => setUpdatePost(false)}>
                    Cancel
                </button>
                <button className="singlePostButton" onClick={handleUpdate}>
                    Update
                </button>
            </div>           
        )}
      </div>
    </div>
  );
};

export default SinglePost;
