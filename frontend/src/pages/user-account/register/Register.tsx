import  { useState } from 'react';
import {useHistory} from 'react-router-dom';
import {register} from '../../../services/User.service';
import './Register.css'

const Register = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e:any) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }
        try {
            await register(email,password);
            alert('The profile has been created successfully.');
            history.push('/login');
        } catch (error:any) {
            console.log(error)
            setMessage('registration failed: ' + error?.response?.data?.message);
        }
    };

    return (
        <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
            <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="form-group">
            <label>Confirm Password</label>
            <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            </div>
            <button type="submit">Register</button>
            {message && <p className="message">{message}</p>}
        </form>
        </div>
    );
};

export default Register;
