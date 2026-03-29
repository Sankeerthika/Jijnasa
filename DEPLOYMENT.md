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

# Note on Database (SQL)
Since you are using a file-based H2 database by default, Railway's ephemeral file system will delete your data every time the server restarts. 

**Recommendation: Use a real SQL Database (MySQL or PostgreSQL)**

1.  **Add Database**: In your Railway project, click **"New"** -> **"Database"** -> **"MySQL"** (or PostgreSQL).
2.  **Connect**: Railway will provide connection variables. Update your Backend service variables:
    - **MySQL Example**:
        - `DB_URL`: `jdbc:mysql://${MYSQLHOST}:${MYSQLPORT}/${MYSQLDATABASE}`
        - `DB_USERNAME`: `${MYSQLUSER}`
        - `DB_PASSWORD`: `${MYSQLPASSWORD}`
    - **PostgreSQL Example**:
        - `DB_URL`: `jdbc:postgresql://${PGHOST}:${PGPORT}/${PGDATABASE}`
        - `DB_USERNAME`: `${PGUSER}`
        - `DB_PASSWORD`: `${PGPASSWORD}`

Spring Boot will automatically detect the database type from the URL and use the correct driver.

