import React, { useState } from 'react';
import './commDis.css';
import TwinklingBackground from '../../landingpage/TwinkleBackground/TwinkleBackground';
import NavBar from '../fixedcomponents/NavBar';
import Header from '../fixedcomponents/Header';

const BioRectangle = ({ username, content, isInput, onPostChange, onPostSubmit, postContent }) => {
  if (isInput) {
    return (
      <div className="bio-section">
        <label>Bio:</label>
        <textarea
          placeholder="Use this space to showcase your personality, interests, and what you're looking for in a partner..."
          rows="4"
          cols="50"
          value={postContent}
          onChange={onPostChange}
        />
        <button className="post-button" onClick={onPostSubmit}>Post</button>
      </div>
    );
  } else {
    return (
      <div className="bio-section">
        <h3>{username}</h3>
        <p>{content}</p>
        <div className="button-group">
          <button className="like-button">Like</button>
          <button className="dislike-button">Dislike</button>
          <button className="report-button">Report</button>
        </div>
      </div>
    );
  }
};

const CommDis = () => {
  const [bioContent, setBioContent] = useState('');
  const [posts, setPosts] = useState([
    { username: 'User1', content: 'This is the first post.' },
    { username: 'User2', content: 'This is another post.' },
    { username: 'User3', content: 'This is yet another post.' },
    { username: 'User3', content: 'This is yet another post.' },
    { username: 'User3', content: 'This is yet another post.' },
    { username: 'User3', content: 'This is yet another post.' },
    { username: 'User3', content: 'This is yet another post.' },
    { username: 'User3', content: 'This is yet another post.' },
    { username: 'User3', content: 'This is yet another post.' },
    { username: 'User3', content: 'This is yet another post.' },
    { username: 'User3', content: 'This is yet another post.' },
    { username: 'User3', content: 'This is yet another post.' },
    { username: 'User3', content: 'This is yet another post.' },
    { username: 'User3', content: 'This is yet another post.' },
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
    <div className="config-page">
      <Header />
      <NavBar />
      <div className="container" style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <TwinklingBackground/>
        <BioRectangle
          isInput={true}
          onPostChange={handlePostChange}
          onPostSubmit={handlePostSubmit}
          postContent={bioContent}
        />
        {posts.map((post, index) => (
          <BioRectangle key={index} username={post.username} content={post.content} isInput={false} />
        ))}
      </div>
    </div>
  );
};

export default CommDis;
