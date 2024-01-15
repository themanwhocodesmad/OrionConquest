import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');

    //The function takes an event object (e) as its parameter. This object contains information about the event that occurred—in this case, a user changing the value of an input field.
    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();                     //tells the browser not to use default form submission behavior (reloads the page by default after submission)
        const { email, password } = formData;
        if (!email || !password) {
            setMessage('Please fill in all fields.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/api/users/login', formData);
            setMessage('Login Successful!');
            // Additional actions upon successful login
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data || 'Login failed.');
            } else {
                setMessage('Something went wrong. Please try again.');
            };
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default LoginForm;
