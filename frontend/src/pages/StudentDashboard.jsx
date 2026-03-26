import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { useAuth } from '../components/AuthProvider';
import { StatCard, StatusBadge, Avatar, AppBadge } from '../components/ui-components';
import {
  MessageCircle,
  Plus,
  Clock,
  HelpCircle,
  BookOpen,
  Search,
  Filter,
  Calendar,
  Grid
} from 'lucide-react';
import clsx from 'clsx';

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [doubts, setDoubts] = useState([]);
  const [stats, setStats] = useState({ total: 0, resolved: 0, pending: 0 });
  const [recentDoubts, setRecentDoubts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const allDoubts = await apiService.getAllDoubts();
        const userDoubts = allDoubts.filter(d => d.student?.id === user.id);
        setDoubts(userDoubts);

        const resolved = userDoubts.filter(d => d.status === 'RESOLVED').length;
        const pending = userDoubts.filter(d => d.status === 'PENDING').length;

        setStats({
          total: userDoubts.length,
          resolved: resolved,
          pending
        });

        setRecentDoubts([...userDoubts].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchDashboardData();
  }, [user]);

  const filteredDoubts = recentDoubts.filter(d => {
    const matchesTab = activeTab === 'ALL' || d.status === activeTab;
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          d.topic.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  if (loading) return <div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-4 border-unstop-blue border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Welcome Section */}
      <div className="bg-white p-8 rounded-xl border border-surface-border shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-unstop-dark mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-500 font-medium max-w-lg">
            Ready to dive back into learning? Ask your doubts, explore the library, and track your progress here.
          </p>
        </div>
        <button
          onClick={() => navigate('/post-doubt')}
          className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          Ask a New Doubt
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Doubts" value={stats.total} icon={MessageCircle} />
        <StatCard title="Resolved" value={stats.resolved} icon={Grid} />
        <StatCard title="Pending" value={stats.pending} icon={Clock} />
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-xl border border-surface-border shadow-soft overflow-hidden">
        {/* Header/Tabs */}
        <div className="px-6 border-b border-surface-border bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-unstop-dark mr-4">Doubt History</h2>
            <div className="flex bg-white rounded-lg border border-surface-border p-1">
              {['ALL', 'PENDING', 'RESOLVED'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={clsx(
                    "px-4 py-1.5 rounded-md text-xs font-bold transition-all",
                    activeTab === tab 
                      ? "bg-unstop-blue text-white shadow-sm" 
                      : "text-gray-500 hover:text-unstop-dark"
                  )}
                >
                  {tab === 'PENDING' ? 'Under Review' : tab}
                </button>
              ))}
            </div>
          </div>
          
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search doubts..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-surface-border rounded-lg text-sm focus:ring-1 focus:ring-unstop-blue outline-none transition-all"
            />
          </div>
        </div>

        {/* List Content */}
        <div className="p-6">
          {filteredDoubts.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {filteredDoubts.map((doubt) => (
                <div
                  key={doubt.id}
                  className="group flex flex-col md:flex-row md:items-center gap-6 p-5 rounded-xl border border-surface-border hover:border-unstop-blue hover:bg-unstop-lightBlue/30 transition-all cursor-pointer"
                  onClick={() => navigate(`/doubt/${doubt.id}`)}
                >
                  <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center text-unstop-blue font-bold group-hover:bg-white border border-transparent group-hover:border-unstop-blue/10">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-unstop-dark truncate group-hover:text-unstop-blue transition-colors">
                        {doubt.title}
                      </h4>
                      <AppBadge color="blue">{doubt.topic.name}</AppBadge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(doubt.timestamp).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5" />
                        {doubt.answers?.length || 0} Answers
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 md:min-w-[150px]">
                    <StatusBadge status={doubt.status} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-surface-border">
                <BookOpen className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-unstop-dark mb-2">No doubts found</h3>
              <p className="text-gray-500 font-medium mb-6">You haven't posted any doubts matching this criteria yet.</p>
              <button 
                onClick={() => navigate('/post-doubt')} 
                className="btn-primary"
              >
                Ask a Doubt
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
