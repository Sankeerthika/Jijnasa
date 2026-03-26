import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import { User, Shield, AlertCircle, ArrowRight, CheckCircle } from 'lucide-react';
import clsx from 'clsx';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({ email: '', role: 'STUDENT' });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (location.state?.message) {
            setSuccessMessage(location.state.message);
            // Clear message from location state
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        if (!formData.email) {
            setError('Please enter your email.');
            return;
        }

        try {
            await login({
                email: formData.email,
                role: formData.role
            });
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or role selection.');
        }
    };

    return (
        <div className="min-h-screen bg-surface-bg flex items-center justify-center px-8 py-20 relative overflow-hidden font-sans">
            {/* Professional Background Accent */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-unstop-blue/5 skew-x-[-12deg] translate-x-1/2 pointer-events-none"></div>

            <div className="w-full max-w-lg z-10 space-y-8 animate-slide-up">
                <div className="text-center space-y-3">
                    <div className="w-12 h-12 bg-unstop-blue rounded-lg flex items-center justify-center text-white font-bold text-2xl mx-auto shadow-elevated">
                        J
                    </div>
                    <h1 className="text-3xl font-display font-bold text-unstop-dark tracking-tight">Welcome to Jijnasa</h1>
                    <p className="text-gray-500 font-medium">Empowering students through collaborative learning.</p>
                </div>

                <div className="bg-white p-10 rounded-xl border border-surface-border shadow-soft space-y-8">
                    <div className="text-center">
                        <h2 className="text-xl font-bold text-unstop-dark mb-1">Log In</h2>
                        <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Select your role to continue</p>
                    </div>

                    {successMessage && (
                        <div className="p-4 rounded-lg bg-green-50 text-status-success flex items-center gap-3 border border-green-100">
                            <CheckCircle className="w-5 h-5 flex-shrink-0" />
                            <span className="text-sm font-bold">{successMessage}</span>
                        </div>
                    )}

                    {error && (
                        <div className="p-4 rounded-lg bg-red-50 text-status-error flex items-center gap-3 border border-red-100">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <span className="text-sm font-bold">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: 'STUDENT' })}
                                className={clsx(
                                    "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all group",
                                    formData.role === 'STUDENT'
                                        ? "bg-unstop-lightBlue border-unstop-blue text-unstop-blue shadow-sm"
                                        : "bg-white border-surface-border text-gray-500 hover:border-gray-300"
                                )}
                            >
                                <User className={clsx("w-6 h-6", formData.role === 'STUDENT' ? "text-unstop-blue" : "text-gray-400 group-hover:text-gray-600")} />
                                <span className="text-xs font-bold uppercase tracking-widest">Student</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: 'FACULTY' })}
                                className={clsx(
                                    "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all group",
                                    formData.role === 'FACULTY'
                                        ? "bg-unstop-lightBlue border-unstop-blue text-unstop-blue shadow-sm"
                                        : "bg-white border-surface-border text-gray-500 hover:border-gray-300"
                                )}
                            >
                                <Shield className={clsx("w-6 h-6", formData.role === 'FACULTY' ? "text-unstop-blue" : "text-gray-400 group-hover:text-gray-600")} />
                                <span className="text-xs font-bold uppercase tracking-widest">Faculty</span>
                            </button>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="name@university.edu"
                                className="input-field"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full btn-primary py-3.5 text-base flex items-center justify-center gap-2"
                        >
                            Log In <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>

                    <div className="pt-2 text-center">
                        <p className="text-gray-500 font-medium text-sm">
                            Don't have an account? <Link to="/register" className="text-unstop-blue font-bold hover:underline">Sign up for free</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
