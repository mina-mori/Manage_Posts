import React from 'react';
import {useHistory} from 'react-router-dom';
import PostList from '../manage-posts/posts-list/PostsList';
import './Home.css';

const Home: React.FC = () => {
  
  const history = useHistory();  
  return (
    <div className='home'>
      <button onClick={() => history.push('/add')}>Add Post</button>
      <PostList />
    </div>
  );
};

export default Home;
