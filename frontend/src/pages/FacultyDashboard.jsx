import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { useAuth } from '../components/AuthProvider';
import { StatCard, StatusBadge, Avatar, AppBadge } from '../components/ui-components';
import {
  CheckCircle,
  MessageCircle,
  TrendingUp,
  Clock,
  Zap,
  Sparkles,
  BarChart,
  Users,
  ChevronRight,
  ArrowRight,
  Search
} from 'lucide-react';
import { isSubjectMatch } from '../utils/subjectUtils';
import clsx from 'clsx';

const FacultyDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [allDoubts, setAllDoubts] = useState([]);
  const [pendingDoubts, setPendingDoubts] = useState([]);
  const [filteredDoubts, setFilteredDoubts] = useState([]);
  const [stats, setStats] = useState({ activeDoubts: 0, resolvedToday: 0, responseRate: '94%' });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('PENDING');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchFacultyData = async () => {
      try {
        const doubts = await apiService.getAllDoubts();
        
        // Filter doubts based on faculty expertise (subjects taught)
        const facultySubjects = (user?.subjects || '').split(',').map(s => s.trim());
        
        const relevantDoubts = doubts.filter(d => {
          const doubtSubject = d.topic?.subject?.name || '';
          return facultySubjects.some(fs => isSubjectMatch(fs, doubtSubject));
        });

        setAllDoubts(relevantDoubts);
        
        // Show all doubts that are NOT resolved yet
        const active = relevantDoubts.filter(d => d.status?.toUpperCase() !== 'RESOLVED');
        setPendingDoubts(active);
        
        const resolved = relevantDoubts.filter(d => d.status?.toUpperCase() === 'RESOLVED');
        
        setStats({
          activeDoubts: active.length,
          resolvedToday: resolved.length,
          responseRate: '94%'
        });
      } catch (err) {
        console.error("Error fetching faculty data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFacultyData();
  }, [user]);

  useEffect(() => {
    let filtered = allDoubts;
    
    // Apply Tab Filter
    if (activeTab === 'PENDING') {
      filtered = filtered.filter(d => d.status?.toUpperCase() !== 'RESOLVED');
    } else if (activeTab === 'RESOLVED') {
      filtered = filtered.filter(d => d.status?.toUpperCase() === 'RESOLVED');
    }

    // Apply Search Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(d => 
        d.title.toLowerCase().includes(q) || 
        (d.student?.name || '').toLowerCase().includes(q) ||
        (d.topic?.name || '').toLowerCase().includes(q)
      );
    }

    setFilteredDoubts(filtered);
  }, [activeTab, searchQuery, allDoubts]);

  if (loading) return <div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="space-y-12 animate-in pb-20">

      {/* Faculty Header */}
      <div className="flex flex-col lg:flex-row items-center lg:items-end gap-12 mt-4">
        <div className="relative">
          <Avatar name={user?.name} size="lg" />
          <div className="absolute -top-4 -left-4 w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-2xl rotate-[-12deg] animate-float">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="flex-1 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row lg:items-center gap-2 mb-3">
            <h1 className="text-5xl font-display font-extrabold text-slate-900 tracking-tight">{user?.name}</h1>
            <div className="flex justify-center gap-1">
              <AppBadge color="dark">FACULTY <Sparkles className="w-2.5 h-2.5 inline ml-0.5" /></AppBadge>
            </div>
          </div>

          <p className="text-xl font-display font-semibold text-slate-500 mb-8 max-w-sm">
            Expert in <span className="text-primary-600 italic">{user?.subjects || 'Multiple Subjects'}</span>. Helping {stats.activeDoubts} students with their doubts today.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <button
              onClick={() => navigate('/analytics')}
              className="btn-vibrant px-12 py-4 text-base shadow-xl shadow-primary-500/20 flex items-center gap-2"
            >
              <TrendingUp className="w-5 h-5" /> View Analytics
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="btn-secondary px-8 py-4 text-base bg-white hover:bg-slate-50 transition-colors"
            >
              Refresh Queue
            </button>
          </div>
        </div>

        <div className="flex items-center gap-12 pb-2">
          <StatCard title="Active Doubts" value={stats.activeDoubts} />
          <StatCard title="Resolved" value={stats.resolvedToday} />
          <StatCard title="Response Rate" value={stats.responseRate} />
        </div>
      </div>

      {/* Doubt Management Section */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 px-4">
          <div className="flex items-center gap-6">
            <h3 className="text-2xl font-display font-extrabold text-slate-900">Doubt Queue</h3>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              {['PENDING', 'RESOLVED', 'ALL'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={clsx(
                    "px-6 py-2 rounded-lg text-xs font-bold transition-all uppercase tracking-widest",
                    activeTab === tab 
                      ? "bg-white text-primary-600 shadow-sm" 
                      : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by student, topic, or title..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-primary-50 outline-none transition-all font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main List */}
          <div className="lg:col-span-2 space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredDoubts.length > 0 ? (
              filteredDoubts.map((doubt, i) => (
                <div
                  key={doubt.id}
                  onClick={() => navigate(`/doubt/${doubt.id}`)}
                  className="glass-card p-6 rounded-[2.5rem] flex items-center gap-6 hover:translate-x-3 transition-all cursor-pointer group shadow-sm hover:shadow-xl border-white/40"
                >
                  <div className={clsx(
                    "w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-inner",
                    doubt.status === 'RESOLVED' ? "bg-emerald-50" : i % 2 === 0 ? "bg-accent-blue/10" : "bg-accent-pink/10"
                  )}>
                    {doubt.status === 'RESOLVED' ? (
                      <CheckCircle className="w-6 h-6 text-emerald-500" />
                    ) : (
                      <Clock className="w-6 h-6 text-slate-400 group-hover:animate-pulse" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-display font-extrabold text-slate-900 line-clamp-1 group-hover:text-primary-600 transition-colors">{doubt.title}</h4>
                      <StatusBadge status={doubt.status} />
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {doubt.student?.name || 'Anonymous Student'} &bull; {doubt.topic?.name || 'General Topic'}
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white shadow-lg">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center glass-card rounded-[3.5rem] border-dashed border-2 border-slate-100">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-slate-200" />
                </div>
                <h3 className="text-xl font-display font-bold text-slate-700 mb-2 uppercase tracking-tighter">No doubts found</h3>
                <p className="text-slate-500 font-medium">Try changing your filters or search query.</p>
              </div>
            )}
          </div>

          {/* Mini Analytics Preview */}
          <div className="space-y-8">
            <div className="glass-card p-10 rounded-[3.5rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden h-full min-h-[500px]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                    <BarChart className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-xl">Weekly Performance</h4>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Efficiency tracking</p>
                  </div>
                </div>

                <div className="flex-1 flex items-end gap-3 px-4">
                  {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                    <div key={i} className="flex-1 group relative">
                      <div
                        className="w-full bg-primary-500 rounded-full opacity-30 group-hover:opacity-100 transition-all duration-500 cursor-pointer shadow-lg"
                        style={{ height: `${h}%` }}
                      ></div>
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-600 uppercase">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 p-6 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary-400" />
                    <span className="text-sm font-bold">{stats.activeDoubts + stats.resolvedToday} Total Students Helped</span>
                  </div>
                  <button 
                    onClick={() => navigate('/analytics')}
                    className="text-primary-400 hover:text-white transition-colors"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
