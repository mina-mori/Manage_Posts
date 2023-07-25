import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import {login} from '../../../services/User.service';
import './SignIn.css';

const SignIn: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');


  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(email,password);
      if(response) {
        localStorage.setItem('token',response.accessToken);
        history.push('/')
      }
    }
    catch(error) {
      setMessage('Invalid email or password');
    }
  };

  return (
    <div className="signin-container">
      <h2>Login</h2>
      <form onSubmit={handleSignIn}>
        <div>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </div>
        <div>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}  required/>
        </div>
        <button type="submit">Login</button>
        <a href='/register'>Don't have an account yet? Register!</a>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default SignIn;
