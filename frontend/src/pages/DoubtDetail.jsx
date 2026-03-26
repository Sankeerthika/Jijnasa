import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { useAuth } from '../components/AuthProvider';
import {
  ArrowLeft,
  MessageSquare,
  Clock,
  CheckCircle,
  ThumbsUp,
  Send,
  Sparkles,
  Zap,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { StatusBadge, Avatar, AppBadge } from '../components/ui-components';
import clsx from 'clsx';

const DoubtDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [doubt, setDoubt] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answerInput, setAnswerInput] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);
  const [isResolving, setIsResolving] = useState(false);

  // Simple native time-ago formatter
  const formatTimeAgo = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const now = new Date();
    const diffInSeconds = Math.floor((now - d) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  useEffect(() => {
    const fetchDoubtData = async () => {
      try {
        console.log("Fetching doubt with ID:", id);
        const doubtData = await apiService.getDoubtById(id);
        console.log("Doubt data received:", doubtData);
        
        try {
          const answersData = await apiService.getAnswersForDoubt(id);
          setAnswers(answersData || []);
        } catch (ansErr) {
          console.error("Error fetching answers:", ansErr);
          setAnswers([]);
        }
        
        setDoubt(doubtData);
      } catch (err) {
        console.error("Error fetching doubt details:", err);
        setDoubt(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchDoubtData();
    }
  }, [id]);

  const handlePostAnswer = async (e) => {
    e.preventDefault();
    if (!answerInput.trim()) return;
    setIsAnswering(true);
    try {
      console.log("Posting answer for doubt ID:", id);
      console.log("Current user:", user);
      
      const payload = {
        doubtId: parseInt(id),
        content: answerInput,
        faculty: user // Pass full UserDto object
      };
      
      console.log("Sending payload:", payload);
      
      await apiService.postAnswer(payload);
      
      console.log("Answer posted successfully!");
      
      const updatedDoubt = await apiService.getDoubtById(id);
      setDoubt(updatedDoubt);
      const updatedAnswers = await apiService.getAnswersForDoubt(id);
      setAnswers(updatedAnswers);
      setAnswerInput('');
    } catch (err) {
      console.error("Error posting answer:", err);
      alert("Failed to publish response. Check console for details.");
    } finally {
      setIsAnswering(false);
    }
  };

  const handleResolve = async () => {
    setIsResolving(true);
    try {
      await apiService.updateDoubtStatus(id, 'RESOLVED');
      const updatedDoubt = await apiService.getDoubtById(id);
      setDoubt(updatedDoubt);
      alert("Doubt marked as resolved!");
    } catch (err) {
      console.error("Error resolving doubt:", err);
      alert("Failed to resolve. Make sure your backend endpoint is correct.");
    } finally {
      setIsResolving(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] gap-4">
      <div className="w-12 h-12 border-4 border-unstop-blue border-t-transparent rounded-full animate-spin"></div>
      <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Loading Doubt Details...</p>
    </div>
  );

  if (!doubt) return (
    <div className="text-center py-20 space-y-6">
      <div className="w-20 h-20 bg-red-50 text-status-error rounded-full flex items-center justify-center mx-auto shadow-sm">
        <HelpCircle className="w-10 h-10" />
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl font-display font-extrabold text-unstop-dark">Doubt Not Found</h3>
        <p className="text-slate-500 font-medium max-w-xs mx-auto">We couldn't retrieve the details for this doubt. It might have been deleted or there's a connection issue.</p>
      </div>
      <button 
        onClick={() => navigate(-1)}
        className="btn-secondary px-8 py-3 text-sm"
      >
        Go Back
      </button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in pb-20">
      <button
        onClick={() => navigate(-1)}
        className="group flex items-center gap-3 text-sm font-display font-extrabold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest"
      >
        <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-white transition-all shadow-sm">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        </div>
        Go Back
      </button>

      {/* Main Doubt Card - Irene Style */}
      <div className="glass-card rounded-[3.5rem] overflow-hidden shadow-2xl">
        <div className="p-12 pb-6 flex flex-col md:flex-row gap-8 items-start">
          <Avatar name={doubt.student?.name} size="md" />
          <div className="flex-1">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-1">
                <StatusBadge status={doubt.status} />
                <h2 className="text-4xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">{doubt.title}</h2>
              </div>
            </div>
            <div className="flex items-center gap-6 text-xs font-display font-extrabold text-slate-400 uppercase tracking-[0.2em]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-500"></span>
                {doubt.topic?.subject?.name || 'General'} &bull; {doubt.topic?.name || 'General'}
              </div>
              <span>By <span className="text-slate-900">{doubt.student?.name || 'Anonymous'}</span></span>
              <span>{doubt.timestamp ? new Date(doubt.timestamp).toLocaleDateString() : 'Recent'}</span>
            </div>
          </div>
        </div>

        <div className="px-12 pb-12">
          <p className="text-lg font-medium text-slate-600 leading-relaxed font-display mt-8">
            {doubt.description}
          </p>

          <div className="mt-12 pt-8 border-t border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="btn-secondary px-8 flex items-center gap-2 group border-0 shadow-sm">
                <ThumbsUp className="w-4 h-4 text-slate-400 group-hover:text-primary-600 transition-colors" />
                Support query
              </button>
              {user?.role === 'FACULTY' && doubt.status !== 'RESOLVED' && (
                <button 
                  onClick={handleResolve}
                  disabled={isResolving}
                  className="btn-vibrant px-6 py-2 text-xs flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" /> {isResolving ? 'Resolving...' : 'Mark as Resolved'}
                </button>
              )}
            </div>
            <div className="flex items-center gap-4">
              <AppBadge color="blue">{answers?.length || 0} Responses</AppBadge>
            </div>
          </div>
        </div>
      </div>

      {/* Answers List */}
      <div className="space-y-8">
        <h3 className="text-2xl font-display font-extrabold text-slate-900 px-4">Discussion</h3>

        {answers && answers.length > 0 ? (
          answers.map((answer, i) => (
            <div key={answer.id || i} className="relative group">
              <div className="glass-card p-10 rounded-[3rem] ml-12 shadow-md hover:shadow-xl transition-all border-l-[6px] border-l-primary-500">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white overflow-hidden shadow-lg border-2 border-white translate-x-[-4rem]">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${answer.faculty?.name || 'Faculty'}`} alt="f" />
                    </div>
                    <div className="-ml-12">
                      <h4 className="font-display font-extrabold text-slate-900 text-lg flex items-center gap-2">
                        {answer.faculty?.name || 'Expert Faculty'}
                        <CheckCircle className="w-4 h-4 text-primary-500" />
                      </h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{formatTimeAgo(answer.timestamp)}</p>
                    </div>
                  </div>
                  <AppBadge color="dark">Faculty</AppBadge>
                </div>

                <p className="text-base font-semibold text-slate-600 leading-relaxed mb-10 pl-2">
                  {answer.content}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center rounded-[3rem] bg-slate-50/30 border-2 border-dashed border-slate-100 mx-4">
            <MessageSquare className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <h4 className="text-xl font-display font-bold text-slate-400 uppercase tracking-tighter">Awaiting Response</h4>
          </div>
        )}
      </div>

      {/* Answer Form */}
      {user?.role === 'FACULTY' && (
        <form onSubmit={handlePostAnswer} className="glass-card p-12 rounded-[3.5rem] bg-white/40 shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-primary-600 rounded-2xl flex items-center justify-center text-white rotate-6">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <h3 className="text-2xl font-display font-extrabold text-slate-900 tracking-tight">Post Expert Insight</h3>
          </div>
          <textarea
            value={answerInput}
            onChange={(e) => setAnswerInput(e.target.value)}
            placeholder="Break down the solution for the student..."
            rows="6"
            className="w-full bg-white/60 border-2 border-transparent rounded-[2.5rem] px-8 py-6 focus:outline-none focus:ring-4 focus:ring-primary-100 focus:bg-white focus:border-primary-200 transition-all text-sm font-semibold leading-relaxed resize-none mb-8"
          ></textarea>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isAnswering || !answerInput.trim()}
              className="btn-vibrant px-12 py-5 text-lg flex items-center gap-3"
            >
              {isAnswering ? 'Publishing...' : <><Send className="w-5 h-5" /> Publish Response</>}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default DoubtDetail;
