import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './components/AuthProvider';
import Layout from './components/Layout';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// Public Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';

// Protected Pages
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import MyDoubts from './pages/MyDoubts';
import PostDoubt from './pages/PostDoubt';
import KnowledgeLibrary from './pages/KnowledgeLibrary';
import DoubtDetail from './pages/DoubtDetail';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import Chatbot from './pages/Chatbot';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="min-h-screen bg-surface-bg flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-unstop-blue border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!user) return <Navigate to="/login" />;
  if (allowedRole && user.role !== allowedRole) return <Navigate to="/" />;

  return children;
};

const App = () => {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="min-h-screen bg-surface-bg flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-unstop-blue border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Authenticated Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout
              sidebar={<Sidebar />}
              header={<Header />}
            >
              {user?.role === 'FACULTY' ? <FacultyDashboard /> : <StudentDashboard />}
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-doubts"
        element={
          <ProtectedRoute allowedRole="STUDENT">
            <Layout sidebar={<Sidebar />} header={<Header />}>
              <MyDoubts />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/post-doubt"
        element={
          <ProtectedRoute allowedRole="STUDENT">
            <Layout sidebar={<Sidebar />} header={<Header />}>
              <PostDoubt />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/library"
        element={
          <ProtectedRoute>
            <Layout sidebar={<Sidebar />} header={<Header />}>
              <KnowledgeLibrary />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/doubt/:id"
        element={
          <ProtectedRoute>
            <Layout sidebar={<Sidebar />} header={<Header />}>
              <DoubtDetail />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute allowedRole="FACULTY">
            <Layout sidebar={<Sidebar />} header={<Header />}>
              <AnalyticsDashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/chatbot"
        element={
          <ProtectedRoute allowedRole="STUDENT">
            <Layout sidebar={<Sidebar />} header={<Header />}>
              <Chatbot />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
