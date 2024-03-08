import React, { useState } from 'react';
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
  const [posts, setPosts] = useState([
    { username: 'User1', content: 'This is the latest post' },
    { username: 'User3', content: 'This is another post.' },
    { username: 'User4', content: 'This is another post.' },
    { username: 'User5', content: 'This is another post.' },
    { username: 'User6', content: 'This is another post.' },
    { username: 'User7', content: 'This is another post.' },
    { username: 'User8', content: 'This is another post.' },
    { username: 'User9', content: 'This is another post.' },
    { username: 'User10', content: 'This is another post.' },
    // ...other initial posts
  ]);

  const handlePostChange = (event) => {
    setBioContent(event.target.value);
  };

  const handlePostSubmit = () => {
    if (!bioContent.trim()) return;
    const newPost = { username: 'NewUser', content: bioContent };
    setPosts([newPost, ...posts]);
    setBioContent('');
  };

  return (
    <div className="community-page">
      <div className="fixed-header">
        <Header />
        <NavBar />
      </div>
      <TwinklingBackground />
      <div className="posts-container">
        {posts.map((post, index) => (
          <PostRectangle key={index} username={post.username} content={post.content} />
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
