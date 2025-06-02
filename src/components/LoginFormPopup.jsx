"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginFormPopup = ({ onClose, onLoginSuccess }) => {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [githubId, setGithubId] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showMessageBox, setShowMessageBox] = useState(false);

    const showMessage = (msg, type = 'success') => {
        setMessage(msg);
        setShowMessageBox(true);
        setTimeout(() => {
            setShowMessageBox(false);
            setMessage('');
        }, 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setShowMessageBox(false);

        if (isLogin) {
            if (!email || !password) {
                showMessage('Please fill in all login fields.', 'error');
                return;
            }
            showMessage('Logging in..', 'info');
            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });
                const data = await response.json();
                if (response.ok) {
                    showMessage(data.message || 'Login successful!');
                    onLoginSuccess(data.token, email);
                } else {
                    showMessage(data.message || 'Login failed.', 'error');
                }
            } catch (error) {
                showMessage('An error occurred during login.', 'error');
                console.error('Login error:', error);
            }
        } else {
            if (!username || !email || !password) {
                showMessage('Please fill in all signup fields.', 'error');
                return;
            }
            showMessage('Signup attempt (check console)', 'info');
            try {
                const response = await fetch('/api/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, email, githubId, password }),
                });
                const data = await response.json();
                if (response.ok) {
                    showMessage(data.message || 'Signup successful! Please log in.');
                    setIsLogin(true);
                } else {
                    showMessage(data.message || 'Signup failed.', 'error');
                }
            } catch (error) {
                showMessage('An error occurred during signup.', 'error');
                console.error('Signup error:', error);
            }
        }
    };

    const getMessageStyles = (msg) => {
        if (msg.includes('successful') || msg.includes('Login successful')) {
            return 'bg-emerald-600 border-emerald-500';
        } else if (msg.includes('error') || msg.includes('failed')) {
            return 'bg-red-600 border-red-500';
        } else {
            return 'bg-blue-600 border-blue-500';
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="absolute left-1/4 top-1/4 h-72 w-72 animate-blob rounded-full bg-blue-600/20 mix-blend-screen blur-xl"></div>
            <div className="animation-delay-2000 absolute right-1/4 top-1/2 h-72 w-72 animate-blob rounded-full bg-cyan-600/20 mix-blend-screen blur-xl"></div>
            <div className="animation-delay-4000 absolute bottom-1/4 left-1/2 h-72 w-72 animate-blob rounded-full bg-blue-400/20 mix-blend-screen blur-xl"></div>

            <div className={`fixed left-1/2 top-8 z-[60] -translate-x-1/2 rounded-xl border px-6 py-3 text-white shadow-2xl transition-all duration-300 ${getMessageStyles(message)} ${showMessageBox ? 'scale-100 opacity-100 translate-y-0' : 'pointer-events-none -translate-y-4 scale-95 opacity-0'}`}>
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-white"></div>
                    {message}
                </div>
            </div>

            <div className="relative z-50 flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-gray-700/50 bg-gray-900/95 shadow-2xl backdrop-blur-xl md:flex-row">
                <button
                    onClick={onClose}
                    className="absolute right-6 top-6 z-[60] flex h-8 w-8 items-center justify-center rounded-full text-2xl text-gray-400 transition-all duration-200 hover:rotate-90 hover:bg-gray-700/50 hover:text-white"
                    aria-label="Close"
                >
                    ✕
                </button>

                <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-t-3xl bg-gradient-to-br from-gray-800 via-gray-900 to-black p-8 md:w-1/2 md:rounded-l-3xl md:rounded-tr-none">
                    <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-transparent"></div>
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl"></div>
                    <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-purple-500/10 blur-2xl"></div>

                    <div className="relative z-10 text-center">
                        <div className="mb-6">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                                <span className="text-2xl">🚀</span>
                            </div>
                        </div>

                        <h2 className="mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-3xl font-bold text-transparent">
                            {isLogin ? 'Welcome Back!' : 'Join Us Today!'}
                        </h2>
                        <p className="mx-auto mb-6 max-w-xs text-sm leading-relaxed text-gray-300">
                            {isLogin
                                ? 'Ready to dive back into your projects? Sign in to continue your coding journey.'
                                : 'Start your development adventure with us. Create your account in seconds.'}
                        </p>

                        <button
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setUsername('');
                                setEmail('');
                                setGithubId('');
                                setPassword('');
                                setMessage('');
                                setShowMessageBox(false);
                            }}
                            className="transform-gpu rounded-xl border border-blue-500/20 bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:from-blue-500 hover:to-cyan-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                        >
                            {isLogin ? '✨ Create New Account' : '👋 Back to Login'}
                        </button>
                    </div>
                </div>

                <div className="relative flex w-full flex-col items-center justify-center rounded-b-3xl bg-gray-900/80 p-8 backdrop-blur-xl md:w-1/2 md:rounded-r-3xl md:rounded-bl-none">
                    <div className="absolute inset-0 rounded-b-3xl bg-gradient-to-b from-gray-800/20 via-transparent to-gray-800/20"></div>

                    <div className="relative z-10 w-full max-w-xs">
                        <div className="mb-6 text-center">
                            <h3 className="mb-1 text-2xl font-bold text-white">
                                {isLogin ? 'Sign In' : 'Create Account'}
                            </h3>
                            <p className="text-xs text-gray-400">
                                {isLogin ? 'Enter your credentials below' : 'Fill in your details to get started'}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {!isLogin && (
                                <div className="space-y-2">
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        className="w-full rounded-xl border border-gray-600 bg-gray-800/50 px-4 py-3 text-white shadow-sm placeholder:text-gray-500 transition-all duration-200 hover:bg-gray-800/70 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required={!isLogin}
                                    />
                                </div>
                            )}

                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full rounded-xl border border-gray-600 bg-gray-800/50 px-4 py-3 text-white shadow-sm placeholder:text-gray-500 transition-all duration-200 hover:bg-gray-800/70 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            {!isLogin && (
                                <div className="space-y-2">
                                    <label htmlFor="githubId" className="block text-sm font-medium text-gray-300">
                                        GitHub Username <span className="text-xs text-gray-500">(Optional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="githubId"
                                        className="w-full rounded-xl border border-gray-600 bg-gray-800/50 px-4 py-3 text-white shadow-sm placeholder:text-gray-500 transition-all duration-200 hover:bg-gray-800/70 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                                        placeholder="your-github-username"
                                        value={githubId}
                                        onChange={(e) => setGithubId(e.target.value)}
                                    />
                                </div>
                            )}

                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full rounded-xl border border-gray-600 bg-gray-800/50 px-4 py-3 text-white shadow-sm placeholder:text-gray-500 transition-all duration-200 hover:bg-gray-800/70 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="transform-gpu w-full rounded-xl border border-blue-500/20 bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-3 font-semibold text-white shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.02] hover:from-blue-500 hover:to-cyan-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 active:scale-95"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    {isLogin ? '🔓 Sign In' : '🚀 Create Account'}
                                </span>
                            </button>

                            {isLogin && (
                                <div className="text-center">
                                    <a href="#" className="text-sm text-blue-400 transition-colors hover:text-blue-300">
                                        Forgot your password?
                                    </a>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes blob {
                    0% {
                        transform: translate(0px, 0px) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                    100% {
                        transform: translate(0px, 0px) scale(1);
                    }
                }
                .animate-blob {
                    animation: blob 7s infinite cubic-bezier(0.6, 0.01, 0.3, 0.9);
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
};

export default LoginFormPopup;