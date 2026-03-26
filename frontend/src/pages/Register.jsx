import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import { User, Shield, AlertCircle, ArrowRight, UserPlus } from 'lucide-react';
import clsx from 'clsx';

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'STUDENT',
        university: '',
        subjects: '' // New field for faculty
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.role) {
            setError('Please fill in all fields.');
            return;
        }

        if (formData.role === 'FACULTY' && !formData.subjects) {
            setError('Please enter the subjects you teach.');
            return;
        }

        try {
            await register({
                name: formData.name,
                email: formData.email,
                role: formData.role,
                university: formData.university,
                subjects: formData.subjects // Include subjects in registration
            });
            // Redirect to login instead of dashboard
            navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Try again.');
        }
    };

    return (
        <div className="min-h-screen bg-surface-bg flex items-center justify-center px-8 py-20 relative overflow-hidden font-sans">
            {/* Professional Background Accent */}
            <div className="absolute top-0 left-0 w-1/2 h-full bg-unstop-blue/5 skew-x-[12deg] -translate-x-1/2 pointer-events-none"></div>

            <div className="w-full max-w-lg z-10 space-y-8 animate-slide-up">
                <div className="text-center space-y-3">
                    <div className="w-12 h-12 bg-unstop-blue rounded-lg flex items-center justify-center text-white font-bold text-2xl mx-auto shadow-elevated">
                        J
                    </div>
                    <h1 className="text-3xl font-display font-bold text-unstop-dark tracking-tight">Join Jijnasa</h1>
                    <p className="text-gray-500 font-medium">Create your account to start collaborating.</p>
                </div>

                <div className="bg-white p-10 rounded-xl border border-surface-border shadow-soft space-y-6">
                    <div className="text-center mb-2">
                        <h2 className="text-xl font-bold text-unstop-dark mb-1">Create Account</h2>
                        <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Join our growing learning community</p>
                    </div>

                    {error && (
                        <div className="p-4 rounded-lg bg-red-50 text-status-error flex items-center gap-3 border border-red-100">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <span className="text-sm font-bold">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: 'STUDENT' })}
                                className={clsx(
                                    "flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all group",
                                    formData.role === 'STUDENT'
                                        ? "bg-unstop-lightBlue border-unstop-blue text-unstop-blue shadow-sm"
                                        : "bg-white border-surface-border text-gray-500 hover:border-gray-300"
                                )}
                            >
                                <User className={clsx("w-5 h-5", formData.role === 'STUDENT' ? "text-unstop-blue" : "text-gray-400 group-hover:text-gray-600")} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Student</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: 'FACULTY' })}
                                className={clsx(
                                    "flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all group",
                                    formData.role === 'FACULTY'
                                        ? "bg-unstop-lightBlue border-unstop-blue text-unstop-blue shadow-sm"
                                        : "bg-white border-surface-border text-gray-500 hover:border-gray-300"
                                )}
                            >
                                <Shield className={clsx("w-5 h-5", formData.role === 'FACULTY' ? "text-unstop-blue" : "text-gray-400 group-hover:text-gray-600")} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Faculty</span>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Enter your full name"
                                    className="input-field py-2"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="yourname@university.edu"
                                    className="input-field py-2"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">University / College</label>
                                <input
                                    type="text"
                                    value={formData.university}
                                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                                    placeholder="Name of your institution"
                                    className="input-field py-2"
                                />
                            </div>

                            {formData.role === 'FACULTY' && (
                                <div className="space-y-1 animate-in">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Subjects You Teach</label>
                                    <input
                                        type="text"
                                        value={formData.subjects}
                                        onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
                                        placeholder="e.g. Mathematics, Physics (comma separated)"
                                        className="input-field py-2 border-primary-200 focus:border-primary-500"
                                    />
                                    <p className="text-[9px] text-slate-400 font-medium ml-1 italic">We'll use this to route relevant student doubts to you.</p>
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full btn-primary py-3 text-base flex items-center justify-center gap-2 mt-4"
                        >
                            Create Account <UserPlus className="w-5 h-5" />
                        </button>
                    </form>

                    <div className="pt-2 text-center border-t border-surface-border mt-6">
                        <p className="text-gray-500 font-medium text-sm">
                            Already have an account? <Link to="/login" className="text-unstop-blue font-bold hover:underline">Log in here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
