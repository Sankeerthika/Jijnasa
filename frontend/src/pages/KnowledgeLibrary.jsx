import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { Search, Filter, MessageSquare, Clock, BookOpen, ChevronRight, Plus, Sparkles } from 'lucide-react';
import { StatusBadge, Avatar, AppBadge } from '../components/ui-components';
import clsx from 'clsx';

const KnowledgeLibrary = () => {
  const navigate = useNavigate();
  const [doubts, setDoubts] = useState([]);
  const [filteredDoubts, setFilteredDoubts] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [doubtsData, subjectsData] = await Promise.all([
          apiService.getAllDoubts(),
          apiService.getSubjects()
        ]);
        const libraryDoubts = doubtsData.filter(d =>
          ['RESOLVED', 'ANSWERED'].includes(d.status?.toUpperCase())
        );
        setDoubts(libraryDoubts);
        setFilteredDoubts(libraryDoubts);
        setSubjects(subjectsData);
      } catch (err) {
        console.error("Error fetching library data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let result = doubts;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(d =>
        d.title.toLowerCase().includes(q) ||
        d.topic.name.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q)
      );
    }
    if (selectedSubject) {
      result = result.filter(d => d.topic.subject.id.toString() === selectedSubject);
    }
    setFilteredDoubts(result);
  }, [searchQuery, selectedSubject, doubts]);

  if (loading) return <div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="space-y-12 animate-in pb-20">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h2 className="text-5xl font-display font-extrabold text-slate-900 tracking-tight mb-2">Knowledge Base</h2>
          <p className="text-xl font-display font-semibold text-slate-500">Dive into thousands of resolved academic queries.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary px-6">Filter By Date</button>
          <button className="btn-vibrant px-6 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Discover
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
          <input
            type="text"
            placeholder="Search keywords, topics, or subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white rounded-3xl pl-16 pr-6 py-5 focus:outline-none focus:ring-4 focus:ring-slate-50 border border-slate-100 shadow-sm text-sm font-medium transition-all"
          />
        </div>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="bg-white border border-slate-100 rounded-3xl px-8 py-5 focus:outline-none focus:ring-4 focus:ring-slate-50 w-full md:w-64 text-sm font-bold text-slate-900 shadow-sm appearance-none cursor-pointer"
        >
          <option value="">All Disciplines</option>
          {subjects.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredDoubts.length === 0 ? (
          <div className="col-span-full py-20 text-center rounded-[3rem] bg-white border-2 border-dashed border-slate-100">
            <BookOpen className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <h3 className="text-xl font-display font-bold text-slate-700 mb-2">No results found</h3>
            <p className="text-slate-500 font-medium">Try broadening your search or choosing another subject.</p>
          </div>
        ) : (
          filteredDoubts.map((doubt, i) => (
            <div
              key={doubt.id}
              onClick={() => navigate(`/doubt/${doubt.id}`)}
              className="group cursor-pointer rounded-[3rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full"
            >
              <div className="p-2 flex-1">
                <div className={clsx(
                  "h-64 rounded-[2.5rem] flex items-center justify-center p-8 relative overflow-hidden transition-all duration-500 group-hover:scale-[0.98]",
                  i % 3 === 0 ? "bg-accent-blue/5" : i % 3 === 1 ? "bg-accent-purple/5" : "bg-accent-pink/5"
                )}>
                  <div className="w-full h-full glass-card rounded-3xl p-6 flex flex-col shadow-2xl translate-y-4 group-hover:translate-y-2 transition-transform duration-500">
                    <div className="flex justify-between items-start mb-4">
                      <StatusBadge status={doubt.status} />
                      <Clock className="w-4 h-4 text-slate-400" />
                    </div>
                    <h4 className="text-xl font-display font-extrabold text-slate-900 leading-tight mb-2 line-clamp-2">
                      {doubt.title}
                    </h4>
                    <div className="mt-auto flex flex-wrap gap-1">
                      <span className="text-[10px] font-bold text-primary-600 bg-primary-100 px-2 py-0.5 rounded uppercase tracking-widest">{doubt.topic.subject.name}</span>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-widest">{doubt.topic.name}</span>
                    </div>
                  </div>
                  <div className="absolute top-6 right-6 flex gap-2">
                    <AppBadge color="dark">UI</AppBadge>
                  </div>
                </div>
              </div>

              <div className="p-8 pt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white shadow-md overflow-hidden flex-shrink-0">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${doubt.student.name}&backgroundColor=b6e3f4`} alt="m"></img >
                  </div>
                  <span className="text-sm font-display font-bold text-slate-900">{doubt.student.name}</span>
                </div>
                <div className="flex items-center gap-4 text-slate-400 text-xs font-bold font-display">
                  <span className="flex items-center gap-1.5"><MessageSquare className="w-4 h-4" /> {doubt.answers?.length || 0}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default KnowledgeLibrary;
