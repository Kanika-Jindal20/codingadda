# CodingAdda 🚀

CodingAdda is a full-stack interactive coding platform built with **Next.js 15, React 19, Monaco Editor, Express 5, and MongoDB**.

---

## 🌟 Features

- **Multi-Language Online Code Editor**: Powered by Monaco Editor (VS Code core) with tab management, syntax highlighting, and live code execution via Judge0.
- **Live HTML/CSS/JS Server & Preview**: Real-time sandboxed iframe preview with a dedicated "Live Server" popout window using dynamic Blob URLs.
- **Interactive Learning Hub (Dark Mode)**: Theory, syntax rules, code breakdowns, and one-click "Practice in Editor" for Python, JavaScript, C, C++, Java, and Web Development.
- **Challenges Arena**: Structured coding problems with starter templates, test case evaluation, and instant compiler/runtime feedback.
- **Project Management**: Create, edit, rename, delete, and persist multi-file projects in MongoDB.
- **Authentication**: JWT-based authentication with bcrypt hashing, password reset tokens, and protected routes.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, Monaco Editor, Bootstrap, React Icons
- **Backend**: Express.js 5, Node.js, MongoDB / Mongoose, JWT, bcrypt
- **Code Execution**: Judge0 API
- **Deployment**: Vercel (Full-stack Serverless with Next.js & Express API)

---

## 💻 Local Development Setup

### 1. Clone & Install
```bash
git clone https://github.com/Kanika-Jindal20/codingadda.git
cd codingadda
npm install
```

### 2. Environment Variables (.env)
Create a `.env` file in the root directory:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/codingadda
JWT_SECRET=your_jwt_secret_key_here

# Code Execution Service (Judge0)
JUDGE0_API_URL=https://ce.judge0.com
JUDGE0_API_KEY=
JUDGE0_API_HOST=judge0-ce.p.rapidapi.com
```

### 3. Run Locally
- Start Frontend: `npm run dev` (Runs at [http://localhost:3000](http://localhost:3000))
- Start Backend: `npm run server` (Runs at [http://localhost:5000](http://localhost:5000))

---

## ☁️ Deploying Frontend & Backend to Vercel

Both the frontend and the Express backend can be deployed together on **Vercel** in one single project:

1. Log into your [Vercel Dashboard](https://vercel.com).
2. Click **Add New...** -> **Project**.
3. Import the GitHub repository: `Kanika-Jindal20/codingadda`.
4. Keep the Framework Preset as **Next.js**.
5. In **Environment Variables**, add:
   - `MONGO_URI`: Your MongoDB Atlas connection URI (e.g., `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/codingadda?retryWrites=true&w=majority`)
   - `JWT_SECRET`: Any secure random secret string
   - `JUDGE0_API_URL`: `https://ce.judge0.com`
6. Click **Deploy**.

> **Note on Architecture**: The serverless API adapter in `pages/api/[[...all]].js` connects your Express backend and all routes (`/api/auth/*`, `/api/projects/*`, `/api/execute/*`) directly to Vercel's serverless edge, so no separate paid server is required.

---

## 🗄️ Database Persistence & Preventing Data Loss

- **Locally**: The app connects to MongoDB Compass via `mongodb://127.0.0.1:27017/codingadda`. All user accounts, hashed passwords, projects, and multiple files are stored permanently in your local MongoDB instance.
- **On Vercel (Production)**: Because Vercel runs in the cloud, it cannot reach your personal laptop's `localhost:27017`. To ensure no data is lost and your cloud app persists everything:
  1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
  2. In MongoDB Atlas, go to **Network Access** and add `0.0.0.0/0` (Allow Access from Anywhere).
  3. Go to **Database Access** and create a database user and password.
  4. Copy your connection string (`mongodb+srv://...`) and paste it as `MONGO_URI` in Vercel's Environment Variables.
  5. If you want to transfer your existing local Compass data to Atlas, simply open MongoDB Compass, click on your collections (`users`, `projects`), select **Collection** -> **Export Collection**, and import them into your Atlas database cluster.
