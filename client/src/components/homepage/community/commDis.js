import React, { useState, useEffect } from 'react';
import './commDis.css';
import TwinklingBackground from '../../landingpage/TwinkleBackground/TwinkleBackground';
import NavBar from '../fixedcomponents/NavBar';
import Header from '../fixedcomponents/Header';

const PostRectangle = ({ _id, author, body, likes, dislikes, timeStamp, reportedBy, hide, 
                         currentUserId, onLike, onDislike, onDelete, onReport}) => {

  const content = body;
  const date = new Date(timeStamp).toLocaleDateString('en-US');
  const isAuthor =  author['_id'] === currentUserId;
  const isReportedByCurrentUser = reportedBy.includes(currentUserId);
  const currentUserLikedPost = likes.includes(currentUserId);
  const currentUserDislikedPost = dislikes.includes(currentUserId);

  if (hide || isReportedByCurrentUser) return null;

  return (
    <div className="post-section">
      <h3>{author['username']} - {date}</h3>
      <p>{content}</p>
      <div className="button-group">
        {!currentUserLikedPost &&  <button className="cd-like-button" onClick={() => onLike(_id)}>Like</button>}
        {!currentUserDislikedPost && <button className="cd-dislike-button" onClick={() => onDislike(_id)}>Dislike</button>}
        {isAuthor && <button className="cd-delete-button" onClick={() => onDelete(_id)}>Delete</button>}
        {!isAuthor && <button className="cd-report-button" onClick={() => onReport(_id)}>Report</button>}
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
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/api/community/getPosts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
        });

        if (!response.ok) {
          throw new Error(`ERROR: http status: ${response.status}`);
        }

        const data = await response.json();
        setPosts(data);
        setIsConnected(true);
      } catch (error) {
        console.error('ERROR: fetching posts: ', error);
        setIsConnected(false);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchCurrentUserId = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/user/getCurrentUserId', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
        });

        if (!response.ok) {
          throw new Error(`ERROR: http status: ${response.status}`);
        }

        const data = await response.json();
        setCurrentUserId(data._id);
      } catch (error) {
        console.error('ERROR: fetching current user id: ', error);
      }
    };

    fetchCurrentUserId();
  }, []);

  const handleLike = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/community/likeDislike', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          "postID": postId,
          "like": true
        }),
      });
  
      if (!response.ok) {
        throw new Error(`ERROR: http status: ${response.status}`);
      }
  
      // Update the local state to reflect the new like status
      // const updatedPosts = posts.map(post => {
      //   if (post._id === postId) {
      //     return { ...post, likes: [...post.likes, currentUserId] };
      //   }
      //   return post;
      // });
      // setPosts(updatedPosts);
  
    } catch (error) {
      console.error('ERROR: liking post: ', error);
    }
  };

  const handleDislike = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/community/likeDislike', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          "postID": postId,
          "like": false
        }),
      });
  
      if (!response.ok) {
        throw new Error(`ERROR: http status: ${response.status}`);
      }
  
      // Update the local state to reflect the new dislike status
      // const updatedPosts = posts.map(post => {
      //   if (post._id === postId) {
      //     return { ...post, dislikes: [...post.dislikes, currentUserId] };
      //   }
      //   return post;
      // });
      // setPosts(updatedPosts);
  
    } catch (error) {
      console.error('ERROR: disliking post: ', error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/community/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          "postID": postId
        }),
      });

      if (!response.ok) {
        throw new Error(`ERROR: http status: ${response.status}`);
      }

      // Update the local state to remove the deleted post
      // setPosts(posts.filter(post => post._id !== postId));

    } catch (error) {
      console.error('ERROR: deleting post: ', error);
    }
  };

  const handleReport = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/community/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          "postID": postId,
          "report": true
        }),
      });

      if (!response.ok) {
        throw new Error(`ERROR: http status: ${response.status}`);
      }

      // Update the state to reflect that the post has been reported
      // setPosts(posts.map(post => post._id === postId ? { ...post, hide: true } : post));

    } catch (error) {
      console.error('ERROR: reporting post: ', error);
    }
  };

  const handlePostChange = (event) => {
    setBioContent(event.target.value);
  };

  const handlePostSubmit = async () => {
    if (!bioContent.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/community/newPosts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({
          "body": bioContent,
        }),
      });

      if (!response.ok) {
        throw new Error(`ERROR: http status: ${response.status}`);
      }

      const newPost = await response.json();
      setPosts([newPost, ...posts]);
      setBioContent('');

    } catch (error) {
      console.error('ERROR: creating new post: ', error);
    }
  };

  let communityPageClass = 'community-page';
  if (posts === undefined) {
    communityPageClass += ' full-page';
  } else {
    if (!isConnected || posts.length === 0) {
      communityPageClass += ' full-page';
    }
  }

  return (
    <div className={communityPageClass}>
      <div className="fixed-header">
        <Header />
        <NavBar />
      </div>
      <TwinklingBackground />
      <div className="posts-container">
        {isConnected && posts !== undefined ?(
          posts.length > 0 ? (
            posts.map((post, index) => (
              <PostRectangle
                key={index}
                _id={post._id}
                author={post.author}
                body={post.body}
                likes={post.likes}
                dislikes={post.dislikes}
                timeStamp={post.timeStamp}
                reportedBy={post.reportedBy}
                hide={post.hide}
                currentUserId={currentUserId}
                onLike={handleLike}
                onDislike={handleDislike}
                onDelete={handleDelete}
                onReport={handleReport}
              />
            ))
          ) : (
            <p className="no-posts-message">No posts yet, post the first post in the community!</p>
          )
        ) : (
          <p className="no-connection-message">No connection. Please try again later.</p>
        )}
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
