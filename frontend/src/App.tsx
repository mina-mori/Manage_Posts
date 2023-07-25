import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AddEditPost from './pages/manage-posts/add-edit-post/AddEditPost';
import Nav, {NavItemProps} from './components/shared/nav/Nav.component';
import Home from './pages/home/Home';
import PostDetail from './pages/manage-posts/post-details/PostDetails';
import SignIn from './pages/user-account/signin/SignIn';
import Register from './pages/user-account/register/Register';
import './App.css';

const App: React.FC = () => { 
  const [leftNavItems] = useState([{ label: 'Home', path: '/' }]);
  const [rightNavItems, setRightNavItems] = useState<NavItemProps[]>([]);
  useEffect(() => {
    if(localStorage.getItem('token')) {
      setRightNavItems([{ label: 'Logout', path: '/login', onClick: () => {localStorage.removeItem('token')} }])
    } else {
      setRightNavItems([{ label: 'Login', path: '/login' }])
    }
  },[]);

  return (
    <Router>
      <div className="app-container">
        <div className='loader-layout' id='loader-layout'>
          <span className='loader'>loading...</span>
        </div>
        <Nav leftNavItems={leftNavItems} rightNavItems={rightNavItems} />
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route exact path="/login">
            <SignIn></SignIn>
          </Route>
          <Route exact path="/register">
            <Register></Register>
          </Route>
          <Route exact path="/details/:postId">
            <PostDetail></PostDetail>
          </Route>
          <Route exact path="/add">
            <AddEditPost/>
          </Route>
          <Route exact path="/edit/:postId">
            <AddEditPost />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
