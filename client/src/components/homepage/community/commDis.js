import React, { useState,  useEffect } from 'react';
import './commDis.css';
import TwinklingBackground from '../../landingpage/TwinkleBackground/TwinkleBackground';
import NavBar from '../fixedcomponents/NavBar';
import Header from '../fixedcomponents/Header';

const PostRectangle = ({ username, content }) => {
  return (
    <div className="post-section">
      <h3>{username}</h3>
      <p>{content}</p>
      <div className="button-group">
        <button className="cd-like-button">Like</button>
        <button className="cd-dislike-button">Dislike</button>
        <button className="cd-report-button">Report</button>
      </div>
    </div>
  );
};

const BioInput = ({ onPostChange, onPostSubmit, postContent }) => {
  return (
    <div className="bio-section input-bio fixed-bio">
      <textarea
        placeholder="Use this space to showcase your personality, interests, and what you're looking for in a partner..."
        value={postContent}
        onChange={onPostChange}
      />
      <button className="cd-post-button" onClick={onPostSubmit}>Post</button>
    </div>
  );
};

const CommDis = () => {
  const [bioContent, setBioContent] = useState('');
  const [posts, setPosts] = useState([]);


  const handlePostSubmit = async (e)=>{
    //prevent page refresh 
    e.preventDefault()
    try {
    const token = localStorage.getItem('token');
    const res = await fetch("http://localhost:8080/api/community/newPost", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({
            'body': bioContent
        }),
    })
        const data = await res.json();
        console.log(`The submit response is: ${data}`)
        setPosts([...posts, data]);
        setBioContent(""); 
    }
    catch(err){
        console.log(err)
    }
  }

  useEffect(() => {

    const retrievePosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch("http://localhost:8080/api/community/getPosts", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          }
        });
        const data = await res.json();
        setPosts(data); 
    
      } catch (err) {
        console.error("Error retrieving matches:", err);
      }
    };

    retrievePosts(); 
}, []);


  const handlePostChange = (event) => {
    setBioContent(event.target.value);
  };

  // const handlePostSubmit = () => {
  //   if (!bioContent.trim()) return;
  //   const newPost = { username: 'NewUser', content: bioContent };
  //   setPosts([newPost, ...posts]);
  //   setBioContent('');
  // };

  return (
    <div className="community-page">
      <div className="fixed-header">
        <Header />
        <NavBar />
      </div>
      <TwinklingBackground />
      <div className="posts-container">
        {posts.map((post, index) => (
          <PostRectangle key={index} username={post.author.username} content={post.body} />
        ))}
      </div>
      <BioInput
        onPostChange={handlePostChange}
        onPostSubmit={handlePostSubmit}
        postContent={bioContent}
      />
    </div>
  );
};

export default CommDis;
