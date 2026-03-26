import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Zap, Users, BookOpen, ShieldCheck } from 'lucide-react';
import clsx from 'clsx';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white relative overflow-hidden selection:bg-primary-100 selection:text-primary-900">
            {/* Background Orbs */}
            <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[60%] bg-accent-blue/10 rounded-full blur-[140px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent-purple/10 rounded-full blur-[140px] pointer-events-none"></div>

            {/* Navigation */}
            <nav className="relative z-50 flex items-center justify-between px-8 py-10 max-w-7xl mx-auto">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-2xl rotate-6">
                        <Sparkles className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-display font-extrabold tracking-tight text-slate-900">Jijnasa</span>
                </div>
                <div className="hidden md:flex items-center gap-10 text-sm font-display font-bold text-slate-500 uppercase tracking-widest">
                    <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
                    <a href="#" className="hover:text-slate-900 transition-colors">Faculty</a>
                    <a href="#" className="hover:text-slate-900 transition-colors">Pricing</a>
                    <button
                        onClick={() => navigate('/login')}
                        className="text-slate-900 border-2 border-slate-900 px-8 py-3 rounded-full hover:bg-slate-900 hover:text-white transition-all active:scale-95"
                    >
                        Sign In
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative z-10 pt-20 pb-32 px-8 max-w-7xl mx-auto text-center lg:text-left flex flex-col lg:flex-row items-center gap-20">
                <div className="flex-1 space-y-10">
                    <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary-50 text-primary-600 border border-primary-100 animate-fade-in">
                        <Zap className="w-4 h-4 fill-current" />
                        <span className="text-xs font-display font-bold uppercase tracking-[0.2em]">Next-Gen Learning Platform</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-display font-extrabold text-slate-900 tracking-tighter leading-[0.95] animate-slide-up">
                        Learn better, <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-pink">together.</span>
                    </h1>

                    <p className="text-xl md:text-2xl font-display font-semibold text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-slide-up">
                        A professional interactive space where students and faculty collaborate to bridge gaps in understanding.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start animate-slide-up">
                        <button
                            onClick={() => navigate('/register')}
                            className="btn-vibrant px-12 py-6 text-xl shadow-2xl shadow-primary-500/40"
                        >
                            Get Started for Free
                        </button>
                        <div className="flex items-center gap-4 px-6">
                            <div className="flex -space-x-4">
                                {[1, 2, 3].map(i => (
                                    <img
                                        key={i}
                                        className="w-12 h-12 rounded-full border-4 border-white shadow-xl"
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}&backgroundColor=b6e3f4`}
                                        alt="avatar"
                                    />
                                ))}
                            </div>
                            <span className="text-sm font-display font-bold text-slate-400">Join 2k+ Students</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 relative animate-in">
                    <div className="relative z-20 glass-card rounded-[4rem] p-10 shadow-2xl rotate-3 scale-105 border-primary-50/50">
                        <div className="w-full h-80 bg-slate-50 rounded-[3rem] flex items-center justify-center relative overflow-hidden">
                            <div className="absolute top-8 left-8 p-4 bg-white rounded-2xl shadow-xl flex items-center gap-3 animate-float">
                                <ShieldCheck className="w-6 h-6 text-emerald-500" />
                                <span className="font-display font-extrabold text-slate-900">Resolved instantly</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 w-full p-10">
                                <div className="h-32 bg-primary-100 rounded-3xl"></div>
                                <div className="h-32 bg-accent-pink/10 rounded-3xl translate-y-10"></div>
                            </div>
                        </div>
                        <div className="mt-8 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-slate-900 border-4 border-white shadow-lg overflow-hidden">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Irene" alt="user" />
                            </div>
                            <div>
                                <h4 className="font-display font-extrabold text-slate-900">Faculty Insights</h4>
                                <p className="text-xs font-bold text-slate-400 uppercase">Live Tracking</p>
                            </div>
                        </div>
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent-orange/20 rounded-full blur-3xl animate-pulse"></div>
                </div>
            </section>

            {/* Fast Stats */}
            <section id="features" className="py-20 px-8 relative z-10">
                <div className="max-w-7xl mx-auto bg-slate-900 rounded-[4rem] p-20 flex flex-wrap justify-center gap-20 text-center">
                    <div className="space-y-2">
                        <span className="text-5xl font-display font-extrabold text-white">98%</span>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Satisfaction</p>
                    </div>
                    <div className="space-y-2">
                        <span className="text-5xl font-display font-extrabold text-white">12k+</span>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Doubts Solved</p>
                    </div>
                    <div className="space-y-2">
                        <span className="text-5xl font-display font-extrabold text-white">450+</span>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Expert Faculty</p>
                    </div>
                </div>
            </section>

            {/* Quick Feature Grid */}
            <section className="py-32 px-8 max-w-7xl mx-auto">
                <h2 className="text-5xl font-display font-extrabold text-slate-900 text-center mb-20 tracking-tight">Built for serious learning</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[
                        { title: 'Smart Search', icon: BookOpen, color: 'bg-accent-blue/10 text-accent-blue', desc: 'Find answers in our library before you even finish typing.' },
                        { title: 'Role Specific', icon: Users, color: 'bg-accent-purple/10 text-accent-purple', desc: 'Dedicated tools for both students and teaching professionals.' },
                        { title: 'Live Feedback', icon: Zap, color: 'bg-accent-pink/10 text-accent-pink', desc: 'Track difficulties in real-time and provide instant help.' }
                    ].map((feature, i) => (
                        <div key={i} className="glass-card p-12 rounded-[3.5rem] space-y-6 hover:translate-y-[-10px] transition-all duration-500 group">
                            <div className={clsx("w-16 h-16 rounded-3xl flex items-center justify-center transition-transform group-hover:scale-110", feature.color)}>
                                <feature.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-display font-extrabold text-slate-900">{feature.title}</h3>
                            <p className="font-semibold text-slate-500 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default LandingPage;
