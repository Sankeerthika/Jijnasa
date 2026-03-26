import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { useAuth } from '../components/AuthProvider';
import {
  Search,
  Send,
  AlertCircle,
  ChevronRight,
  Lightbulb,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { AppBadge } from '../components/ui-components';
import clsx from 'clsx';

const PostDoubt = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    subjectName: '',
    topicName: '',
    title: '',
    description: ''
  });
  const [similarDoubts, setSimilarDoubts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Remove fetchSubjects and fetchTopics since we use free text now

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (formData.title.length > 5 && formData.topicName) {
        try {
          // Note: Backend might need to be updated to search by topic name instead of ID
          const data = await apiService.getSimilarDoubts(formData.topicName, formData.title);
          setSimilarDoubts(data.slice(0, 3));
        } catch (err) {
          console.error("Error checking similar doubts", err);
        }
      } else {
        setSimilarDoubts([]);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [formData.title, formData.topicName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.subjectName || !formData.topicName || !formData.title || !formData.description) {
      setError('Please fill in all mandatory fields.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    try {
      await apiService.postDoubt({
        student: user,
        topic: { 
          name: formData.topicName,
          subject: { name: formData.subjectName }
        },
        title: formData.title,
        description: formData.description
      });
      navigate('/');
    } catch (err) {
      setError('Failed to submit doubt. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 animate-in pb-20 max-w-5xl mx-auto">
      <div className="text-center">
        <h2 className="text-5xl font-display font-extrabold text-slate-900 tracking-tight mb-4">What's on your mind?</h2>
        <p className="text-xl font-display font-semibold text-slate-500">Share your doubt and let our faculty guide you.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <form onSubmit={handleSubmit} className="glass-card p-10 rounded-[3rem] space-y-8 shadow-2xl">
            {error && (
              <div className="p-4 rounded-2xl bg-rose-50 text-rose-700 flex items-center gap-3 border border-rose-100 animate-in">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-bold font-display">{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-display font-extrabold text-slate-900 uppercase tracking-widest ml-1">Subject</label>
                <input
                  type="text"
                  name="subjectName"
                  value={formData.subjectName}
                  onChange={handleChange}
                  placeholder="e.g. Computer Science"
                  className="w-full bg-slate-50/50 border-2 border-transparent rounded-[1.5rem] px-6 py-4 focus:outline-none focus:ring-4 focus:ring-primary-100 focus:bg-white focus:border-primary-200 transition-all text-sm font-bold text-slate-700"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-display font-extrabold text-slate-900 uppercase tracking-widest ml-1">Topic</label>
                <input
                  type="text"
                  name="topicName"
                  value={formData.topicName}
                  onChange={handleChange}
                  placeholder="e.g. Data Structures"
                  className="w-full bg-slate-50/50 border-2 border-transparent rounded-[1.5rem] px-6 py-4 focus:outline-none focus:ring-4 focus:ring-primary-100 focus:bg-white focus:border-primary-200 transition-all text-sm font-bold text-slate-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-display font-extrabold text-slate-900 uppercase tracking-widest ml-1">Title</label>
              <div className="relative">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Understanding the 'this' keyword in Java"
                  className="w-full bg-slate-50/50 border-2 border-transparent rounded-[1.5rem] px-6 py-4 focus:outline-none focus:ring-4 focus:ring-primary-100 focus:bg-white focus:border-primary-200 transition-all text-sm font-bold text-slate-900"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-display font-extrabold text-slate-900 uppercase tracking-widest ml-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="8"
                placeholder="Break down your doubt here... Provide code or examples if possible."
                className="w-full bg-slate-50/50 border-2 border-transparent rounded-[2rem] px-8 py-6 focus:outline-none focus:ring-4 focus:ring-primary-100 focus:bg-white focus:border-primary-200 transition-all text-sm font-semibold leading-relaxed resize-none text-slate-700"
              ></textarea>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-vibrant px-12 py-5 text-lg flex items-center gap-3 active:scale-95"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Submit Question <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-8 rounded-[3rem] sticky top-6 shadow-xl border-amber-100 bg-amber-50/30">
            <h3 className="font-display font-extrabold text-slate-900 flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-amber-600" />
              </div>
              Similar Work
            </h3>

            {similarDoubts.length > 0 ? (
              <div className="space-y-4">
                {similarDoubts.map(doubt => (
                  <div key={doubt.id} className="p-5 bg-white rounded-2xl border border-amber-100 hover:border-amber-300 hover:shadow-lg transition-all cursor-pointer group" onClick={() => navigate(`/doubt/${doubt.id}`)}>
                    <h4 className="font-display font-bold text-sm text-slate-800 line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors uppercase tracking-tight">{doubt.title}</h4>
                    <div className="flex justify-between items-center">
                      <AppBadge color="orange">UI</AppBadge>
                      <span className="text-[10px] font-bold text-slate-400">VIEW <ArrowRight className="w-3 h-3 inline ml-1" /></span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 px-6">
                <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-amber-100">
                  <Search className="w-6 h-6 text-amber-200" />
                </div>
                <p className="text-sm font-display font-bold text-slate-400">Start typing to see if we've already answered this!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDoubt;
