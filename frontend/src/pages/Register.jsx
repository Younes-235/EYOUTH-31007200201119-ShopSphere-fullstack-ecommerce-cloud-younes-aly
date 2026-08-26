import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import api from '../api/axios.js';
import styles from './Register.module.css';

const Register = () => {
    const queryClient = useQueryClient();
    const [name, setName] = useState(''); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); 
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [emailPreviewUrl, setEmailPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setEmailPreviewUrl(null);
        setLoading(true);

        try {
            const res = await api.post('/register', { name, email, password, role });
            
            queryClient.invalidateQueries({ queryKey: ['adminStats'] });
            queryClient.invalidateQueries({ queryKey: ['users'] });

            setSuccess('Account created successfully!');
            if (res.data?.emailPreviewUrl) {
                setEmailPreviewUrl(res.data.emailPreviewUrl);
            }
            
            // Clear input fields on success
            setName('');
            setEmail('');
            setPassword('');
        } catch (err) {
            setError(err.response?.data?.error || err.response?.data?.message || 'Registration failed. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.card}>
            <h2>Create Account</h2>
            {error && <div className={styles.error}>{error}</div>}
            
            {success && (
                <div className={styles.successBox}>
                    <p className={styles.successTitle}>🎉 {success}</p>
                    {emailPreviewUrl && (
                        <div className={styles.emailNotification}>
                            <span>📧 <strong>Welcome email dispatched via Serverless Function</strong></span>
                            <a 
                                href={emailPreviewUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className={styles.emailPreviewBtn}
                            >
                                🔗 View Sent Email (Ethereal Inbox) &rarr;
                            </a>
                        </div>
                    )}
                    <button 
                        type="button" 
                        onClick={() => navigate('/login')} 
                        className={styles.loginRedirectBtn}
                    >
                        Proceed to Sign In &rarr;
                    </button>
                </div>
            )}
            
            <form onSubmit={handleSubmit} className={styles.form}>
                <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    required 
                />
                
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Create Password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    required 
                />
                
                <select value={role} onChange={e => setRole(e.target.value)}>
                    <option value="user">Standard Customer</option>
                    <option value="admin">Store Administrator</option>
                </select>

                <button type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register Account'}
                </button>
            </form>

            <div className={styles.switchLink}>
                Already have an account? <Link to="/login">Sign In</Link>
            </div>
        </div>
    );
};

export default Register;