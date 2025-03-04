import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { AuthContext } from './AuthContext';

const Login = () => {
    // const API_BASE_URL = "https://farmer-market-backend-xpxy.onrender.com";
    const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

    const { setLoggedIn, setLoggedInUser, setType } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            return handleError('Email and password are required');
        }

        setLoading(true);
        try {
            const url = `${API_BASE_URL}/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const result = await response.json();
            const { success, message, jwtToken, username, type, error } = result;

            setLoading(false);
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', username);
                localStorage.setItem('type', type);
                setType(type);
                setLoggedIn(true);
                setLoggedInUser(username);
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else if (error) {
                const details = error?.details[0]?.message || 'An error occurred';
                handleError(details);
            } else {
                handleError(message);
            }
        } catch (error) {
            setLoading(false);
            handleError('An unexpected error occurred');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
            <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full p-5 justify-between">
                <div className='hidden md:block lg:w-1/2 border-r-2'>
                    <img src="https://www.firstchoiceproduce.com/wp-content/uploads/2020/03/large-produce-box.jpg" width={450} alt="Produce Box" />
                </div>
                <div className="w-full p-8 lg:w-1/2">
                    <p className="text-xl text-gray-600 text-center">Welcome back!</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input
                                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mt-4 flex flex-col justify-between">
                            <div className="flex justify-between">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                            </div>
                            <input
                                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <a href="#" className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2">Forget Password?</a>
                        </div>
                        <div className="mt-8">
                            <button type="submit" className={`bg-green-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-green-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 flex items-center w-full text-center">
                        <Link to="/Register" className="text-xs text-gray-500 capitalize text-center w-full">
                            Don't have an account yet? <span className="text-green-700">Sign Up</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
