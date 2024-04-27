import React, { useState } from 'react';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                // Signup successful
                const data = await response.json();
                console.log('Signup successful:', data);
                // Redirect to login page or do something else
            } else if (response.status === 409) {
                // Email already exists
                console.error('Signup failed: Email already exists');
                // Provide feedback to the user that the email is already registered
            } else {
                // Other error
                console.error('Signup failed:', response.statusText);
                // Provide generic error message to the user
            }
        } catch (error) {
            console.error('Error:', error);
            // Provide generic error message to the user
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            <p>Already have an account? <a href="/login">Sign In</a></p>
        </div>
    );
};

export default SignUp;
