# Backend Deployment on Railway

Your backend is ready for Railway. Here's how to deploy:

1.  **Railway Project**: Create a new project on Railway.
2.  **Service**: Add a new service from your GitHub repository.
3.  **Root Directory**: Set the root directory to `backend`.
4.  **Environment Variables**:
    - `DB_URL`: `jdbc:h2:file:./data/jijnasa-db;AUTO_SERVER=TRUE;AUTO_RECONNECT=TRUE`
    - `DB_USERNAME`: `sa`
    - `DB_PASSWORD`: `password`
    - `GEMINI_KEY`: `Your_Gemini_API_Key`
    - `GEMINI_URL`: `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent`
    - `FRONTEND_URL`: The URL of your deployed frontend (e.g., `https://jijnasa-frontend.up.railway.app`)
    - `PORT`: `8080` (Railway usually sets this automatically)

---

# Frontend Deployment on Railway

1.  **Railway Project**: Use the same project or a new one.
2.  **Service**: Add a new service from your GitHub repository.
3.  **Root Directory**: Set the root directory to `frontend`.
4.  **Build Command**: Ensure it is set to `npm run build`.
5.  **Start Command**: Ensure it is set to `npm start` (I have added this to your package.json).
6.  **Environment Variables**:
    - `VITE_API_URL`: The URL of your deployed backend + `/api` (e.g., `https://jijnasa-backend.up.railway.app/api`)

---

# Note on H2 Database
Since you are using a file-based H2 database, Railway's ephemeral file system will delete your data every time the server restarts.
**Recommendation**: Add a **PostgreSQL** database in Railway and update `DB_URL`, `DB_USERNAME`, and `DB_PASSWORD` accordingly for a permanent database.
