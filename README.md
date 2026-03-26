# Jijnasa - Classroom Interaction & Doubt Tracking System 🚀

**Jijnasa** is a high-end, dual-role educational platform designed to bridge the communication gap between students and faculty. It streamlines the doubt-resolution process, provides AI-powered assistance, and offers deep learning analytics for educators.

---

## 📝 Problem Statement
In traditional classroom settings, students often hesitate to ask questions due to time constraints, social anxiety, or the fear of being judged. Faculty members, on the other hand, struggle to track recurring doubts and identify which topics the majority of students are struggling with. 

**Jijnasa solves this by:**
- Providing an **Anonymous & Secure** platform for students to post doubts.
- Implementing **Smart Routing** that sends doubts only to faculty members who specialize in those subjects.
- Using **AI-Powered Chatbots** (Gemini AI) to provide instant answers to common queries.
- Offering **Faculty Analytics** to visualize topic difficulty and student engagement levels.

---

## ✨ Key Features

### 🎓 For Students
- **Smart Doubt Posting**: Categorize doubts by subject and topic using free-text inputs.
- **AI Chatbot (Jijnasa AI)**: Instant academic assistance powered by Google Gemini.
- **Similar Work Detection**: See if your question has already been answered by a faculty member.
- **My Doubts Tracker**: Keep track of all your pending and resolved queries in one place.

### 👨‍🏫 For Faculty
- **Specialized Dashboard**: Only see doubts related to the subjects you teach (e.g., OOPS, DBMS, OS).
- **Expert Resolution**: Provide detailed academic answers and mark doubts as "Resolved".
- **Advanced Analytics**: 
    - **Topic Difficulty**: Visualize which topics have the most doubts.
    - **Student Tracking**: Identify active learners and those who might need extra help.
- **Acronym Support**: Smart matching for shortcuts (e.g., "OOM" correctly routes to "Object Oriented Modeling").

---

## 🎨 Design Philosophy
The platform features a **premium, modern UI** inspired by top-tier portfolio aesthetics:
- **Glassmorphism**: Translucent cards with high-end backdrop blurs.
- **Vibrant Palette**: A professional mix of Indigo, Rose, and Slate.
- **Micro-animations**: Floating elements and bouncy interactions for a superior UX.
- **Responsive Layout**: Fully optimized for both desktop and mobile viewing.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS (JIT mode)
- **Icons**: Lucide React
- **Charts**: Recharts
- **State/Auth**: Context API + Custom Auth Provider

### Backend
- **Framework**: Java 17 + Spring Boot 3.x
- **Database**: H2 (In-memory/File-based) with JPA/Hibernate
- **AI Integration**: Google Gemini API via RestTemplate
- **Security**: Custom Role-based Authentication

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- Java JDK 17
- Maven

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Access the UI at: `http://localhost:5173`

### 3. Backend Setup
1. Move your Spring Boot code into the `/backend` folder.
2. Create a `.env` file in the backend root with:
   ```env
   DB_URL=jdbc:h2:file:./data/jijnasa-db;AUTO_SERVER=TRUE
   DB_USERNAME=sa
   DB_PASSWORD=password
   GEMINI_KEY=YOUR_GEMINI_API_KEY
   GEMINI_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent
   ```
3. Run the Spring Boot application using your IDE (Eclipse/IntelliJ) or Maven:
   ```bash
   mvn spring-boot:run
   ```

---

## ✨ Project Structure
```text
doubt-tracking-system/
├── frontend/          # React Application
├── backend/           # Spring Boot Application
├── .gitignore         # Monorepo ignore rules
└── README.md          # Project Documentation
```

---

## 🤝 Contribution
Developed with ❤️ by **Sankeerthika** and the **Jijnasa Team**.
