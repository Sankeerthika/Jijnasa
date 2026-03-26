import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { apiService } from '../services/api';
import { AlertTriangle, Users, BookOpen, Sparkles, TrendingUp, HelpCircle } from 'lucide-react';
import { StatCard, AppBadge } from '../components/ui-components';
import { normalizeSubject, isSubjectMatch } from '../utils/subjectUtils';
import clsx from 'clsx';

const AnalyticsDashboard = () => {
  const { user } = useAuth();
  const [difficultTopics, setDifficultTopics] = useState([]);
  const [studentInsights, setStudentInsights] = useState([]);
  const [stats, setStats] = useState({ totalDoubts: 0, activeStudents: 0, resolutionRate: '0%' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const doubts = await apiService.getAllDoubts();
        
        // Filter doubts based on faculty expertise
        const facultySubjects = (user?.subjects || '').split(',').map(s => s.trim());
        const relevantDoubts = doubts.filter(d => {
          const doubtSubject = d.topic?.subject?.name || '';
          return facultySubjects.some(fs => isSubjectMatch(fs, doubtSubject));
        });

        // Calculate Topic Difficulty (Doubts per Topic)
        // We also normalize topic names to group variations
        const topicMap = {};
        relevantDoubts.forEach(d => {
          const topicName = normalizeSubject(d.topic?.name || 'General');
          topicMap[topicName] = (topicMap[topicName] || 0) + 1;
        });
        const topicsData = Object.keys(topicMap).map(name => ({
          topic: name,
          count: topicMap[name]
        })).sort((a, b) => b.count - a.count);

        // Calculate Student Insights (Doubts per Student)
        const studentMap = {};
        relevantDoubts.forEach(d => {
          const studentName = d.student?.name || 'Anonymous';
          studentMap[studentName] = (studentMap[studentName] || 0) + 1;
        });
        const studentsData = Object.keys(studentMap).map(name => ({
          studentName: name,
          doubtsCount: studentMap[name]
        })).sort((a, b) => b.doubtsCount - a.doubtsCount);

        // Calculate Stats
        const resolvedCount = relevantDoubts.filter(d => d.status?.toUpperCase() === 'RESOLVED').length;
        const resolutionRate = relevantDoubts.length > 0 
          ? Math.round((resolvedCount / relevantDoubts.length) * 100) + '%' 
          : '0%';

        setDifficultTopics(topicsData);
        setStudentInsights(studentsData.slice(0, 5));
        setStats({
          totalDoubts: relevantDoubts.length,
          activeStudents: studentsData.length,
          resolutionRate
        });

      } catch (err) {
        console.error("Error generating analytics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [user]);

  const COLORS = ['#8b5cf6', '#f472b6', '#60a5fa', '#fb923c', '#fbbf24'];

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Loading Analytics...</p>
    </div>
  );

  return (
    <div className="space-y-12 animate-in pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-5xl font-display font-extrabold text-slate-900 tracking-tight mb-2">Insights</h2>
          <p className="text-xl font-display font-semibold text-slate-500">Real-time learning metrics and difficulties.</p>
        </div>
        <div className="flex gap-4">
          <button className="btn-vibrant px-8 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> Export Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 px-10 bg-white/40 rounded-[4rem] border border-white shadow-2xl backdrop-blur-md">
        <StatCard title="Total Doubts" value={stats.totalDoubts} />
        <StatCard title="Active Students" value={stats.activeStudents} />
        <StatCard title="Resolution Rate" value={stats.resolutionRate} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="glass-card p-12 rounded-[3.5rem] flex flex-col min-h-[500px]">
          <div className="mb-10">
            <h3 className="text-2xl font-display font-extrabold text-slate-900 mb-2">Topic Difficulty</h3>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Doubts per academic segment</p>
          </div>

          <div className="flex-1 w-full h-[300px]">
            {difficultTopics.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={difficultTopics} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="topic" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }} />
                  <Tooltip
                    cursor={{ fill: 'rgba(139, 92, 246, 0.05)' }}
                    contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', fontWeight: 'bold', fontSize: '13px' }}
                  />
                  <Bar dataKey="count" radius={[12, 12, 0, 0]} maxBarSize={60}>
                    {difficultTopics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-100 rounded-3xl">
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No topic data available</p>
              </div>
            )}
          </div>
        </div>

        <div className="glass-card p-12 rounded-[3.5rem] flex flex-col min-h-[500px]">
          <div className="mb-10">
            <h3 className="text-2xl font-display font-extrabold text-slate-900 mb-2">Student Tracking</h3>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Active learning engagement</p>
          </div>

          <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {studentInsights.length > 0 ? (
              studentInsights.map((student, i) => (
                <div key={i} className="flex items-center justify-between p-6 rounded-[2rem] bg-white border border-slate-50 shadow-sm transition-transform hover:scale-[1.02]">
                  <div className="flex items-center gap-5">
                    <div className={clsx(
                      "w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white shadow-lg rotate-3",
                      i % 3 === 0 ? "bg-primary-500" : i % 3 === 1 ? "bg-accent-pink" : "bg-accent-blue"
                    )}>
                      {student.studentName?.charAt(0) || 'S'}
                    </div>
                    <div>
                      <h4 className="font-display font-extrabold text-slate-900 leading-none mb-1.5">{student.studentName || 'Student'}</h4>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">ID: ST-{student.studentName?.length || 0}9{i}</span>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className="text-2xl font-display font-extrabold text-slate-900 leading-none">{student.doubtsCount || 0}</span>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Queries</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full min-h-[200px] flex items-center justify-center border-2 border-dashed border-slate-100 rounded-3xl">
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No insights available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
