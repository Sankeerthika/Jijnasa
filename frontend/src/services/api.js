import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

console.log('Connecting to backend at:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock Data
const mockDoubts = [
  {
    id: 1,
    title: "How to implement high-performance caching in Node.js?",
    status: "RESOLVED",
    timestamp: new Date().toISOString(),
    topic: { name: "Backend Development" },
    student: { id: 1 },
    answers: [{}, {}]
  },
  {
    id: 2,
    title: "Understanding CSS Grid vs Flexbox for complex layouts",
    status: "UNDER_REVIEW",
    timestamp: new Date().toISOString(),
    topic: { name: "Frontend Engineering" },
    student: { id: 1 },
    answers: []
  },
  {
    id: 3,
    title: "Database indexing strategies for millions of rows",
    status: "ANSWERED",
    timestamp: new Date().toISOString(),
    topic: { name: "System Design" },
    student: { id: 1 },
    answers: [{}]
  }
];

const mockWrap = (data) => Promise.resolve(data);

export const apiService = {
  // Auth
  login: (data) => api.post('/auth/login', data).then(res => res.data),
  register: (data) => api.post('/auth/register', data).then(res => res.data),

  // Users
  getUsers: () => api.get('/users').then(res => res.data),
  
  // Classification
  getSubjects: () => api.get('/classification/subjects').then(res => res.data),
  getTopicsBySubject: (subjectId) => api.get(`/classification/subjects/${subjectId}/topics`).then(res => res.data),
  
  // Doubts
  getAllDoubts: () => api.get('/doubts').then(res => res.data),
  getDoubtById: (id) => api.get(`/doubts/${id}`).then(res => res.data),
  getSimilarDoubts: (topicId, titleQuery) => api.get('/doubts/similar', { params: { topicId, titleQuery } })
    .then(res => res.data)
    .catch(err => {
      console.warn("Similar doubts endpoint not implemented in backend yet.");
      return [];
    }),
  postDoubt: (data) => api.post('/doubts', data).then(res => res.data),
  updateDoubtStatus: (id, status) => {
    if (status === 'RESOLVED') {
      return api.post(`/doubts/${id}/resolve`).then(res => res.data);
    }
    // Fallback if you add more status endpoints later
    return api.put(`/doubts/${id}/status`, null, { params: { status } }).then(res => res.data);
  },
  
  // Answers
  getAnswersForDoubt: (doubtId) => api.get(`/answers/doubt/${doubtId}`).then(res => res.data),
  postAnswer: (data) => api.post('/answers', data).then(res => res.data),
  
  // Analytics
  getDifficultTopics: () => api.get('/analytics/difficult-topics').then(res => {
    // Transform Map<String, Integer> to List<{topic, count}> for Recharts
    const data = res.data;
    return Object.keys(data).map(key => ({
      topic: key,
      count: data[key]
    }));
  }),
  getStudentInsights: () => api.get('/analytics/student-insights')
    .then(res => res.data)
    .catch(err => {
      console.warn("Student insights endpoint not implemented in backend yet.");
      return [];
    }),
  
  // Chatbot
  askChatbot: (query) => api.get('/chatbot/ask', { params: { query } }).then(res => res.data),

  // Voting & Feedback
  voteDoubt: (doubtId, studentId, isUpvote) => api.post('/votes/doubt', null, { params: { doubtId, studentId, isUpvote } }).then(res => res.data),
  voteAnswer: (answerId, studentId, isUpvote) => api.post('/votes/answer', null, { params: { answerId, studentId, isUpvote } }).then(res => res.data),
  submitFeedback: (answerId, studentId, level) => api.post('/feedback', null, { params: { answerId, studentId, level } }).then(res => res.data),
};
