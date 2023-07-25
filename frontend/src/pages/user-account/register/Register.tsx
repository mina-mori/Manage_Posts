import  { useState } from 'react';
import {useHistory} from 'react-router-dom';
import {register} from '../../../services/User.service';
import Modal from '../../../components/shared/modal/Modal.component';
import './Register.css'

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [popupMessage, setPopupMessage] = useState<string>('');

    const handleRegister = async (e:any) => {
        e.preventDefault();
        setMessage('');
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }
        try {
            await register(email,password);
            setPopupMessage('The profile has been created successfully.');
            setShowPopup(true);
            resetForm();
            // history.push('/login');
        } catch (error:any) {
            console.log(error)
            setPopupMessage('Something went wrong');
            setShowPopup(true);
        }
    };
    const resetForm = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }
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
            <Modal isOpen={showPopup} onClose={()=> setShowPopup(false)}>
                <> 
                    <h3>Message</h3>
                    <p>{popupMessage}</p>
                    <hr></hr>
                    <div style={{ textAlign: 'center' }}>
                        <button onClick={() => setShowPopup(false)}>Close</button>
                    </div>
                </>
            </Modal>
        </div>
    );
};

export default Register;
