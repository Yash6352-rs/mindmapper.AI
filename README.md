# 🧠 MindMapper.AI

MindMapper.AI is a full-stack web application that helps users visualize, organize, and manage their thoughts via mind maps, AI assistance, and more.

## 🚀 Live Demo

- **Frontend (Vercel):** [[https://mindmapper-ai.vercel.app](https://mindmapper-ai-omega.vercel.app/)]
- **Backend (Render):** [[https://mindmapper-api.onrender.com](https://mindmapper-ai.onrender.com)] *(used internally)*

---

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- Axios for API calls
- TailwindCSS for UI styling
- React Router

**Backend:**
- Node.js + Express
- MongoDB (via MongoDB Atlas)
- Mongoose ODM
- JWT Authentication
- bcrypt for password hashing

**AI Integration:**
- OpenRouter API

**Deployment:**
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## 📁 Folder Structure (Simplified)
mindmapper.AI/
├── frontend/ (React Frontend)
│ ├── public/
│ ├── src/
│ │ ├── asset/
│ │ ├── context/
│ │ ├── pages/
│ │ ├── components/
│ │ └── utils/api.js,entries.js
│ └── vite.config.js
├── server/ (Express Backend)
│ ├── routes/
│ ├── models/
│ ├── middleware/
│ └── server.js

---

## 🧑‍💻 Features

- ✅ User Signup & Login with JWT
- ✅ Profile protection via token
- ✅ AI-powered suggestions for mindmaps
- ✅ Create, update, delete mindmaps
- ✅ Responsive UI
- ✅ Fully deployed and connected to MongoDB Atlas

---

🧪 Local Development
1️⃣ Clone the Repo
git clone https://github.com/Yash6352-rs/mindmapper.AI.git
cd mindmapper.AI

2️⃣ Start the Backend
cd server
npm install
npm run dev

3️⃣ Start the Frontend
cd client
npm install
npm run dev
🔗 Visit the app at: http://localhost:5173

📦 Deployment
🚀 Frontend (Vercel)
1. Push your client/ folder code to GitHub.
2. Go to https://vercel.com and import the repo.
3. Set environment variable:
   VITE_API_BASE_URL = https://your-render-backend-url.onrender.com
4. Click Deploy 🎉

⚙️ Backend (Render)
1. Push your server/ folder code to GitHub.
2. Go to https://render.com and create a Web Service.
3. Connect your GitHub repo and select the server/ directory.
4. Set environment variables:
   MONGO_URI = your-mongo-db-uri
   JWT_SECRET = your-jwt-secret
   OPENROUTER_API_KEY = your-ai-api-key
5. Render will automatically build and deploy your backend.

📄 License
This project is licensed under the MIT License.

Built with 💡 by Yash Panchal
