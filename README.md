\# ✍️ BlogSpace — Full-Stack Blogging Platform



A full-stack blogging platform built with the \*\*MERN stack\*\* (MongoDB, Express, React, Node.js).  

Users can register, write posts, edit them, and interact through comments — all with JWT-based authentication.



\---



\## 🖼️ Preview



!\[Cart](images/login.png)

\---



\## 🚀 Features



\- 🔐 \*\*User Authentication\*\* — Register, Login, Logout with JWT tokens

\- 📝 \*\*Blog Posts\*\* — Create, Read, Update, Delete (only by the author)

\- 💬 \*\*Comments\*\* — Add and delete comments on any post

\- 🏷️ \*\*Tags\*\* — Attach tags to posts for categorization

\- 🛡️ \*\*Protected Routes\*\* — API endpoints secured with middleware

\- 📱 \*\*Responsive UI\*\* — Dark-themed, clean interface



\---



\## 🛠️ Tech Stack



| Layer      | Technology                          |

|------------|-------------------------------------|

| Frontend   | React 18, React Router v6, Axios    |

| Backend    | Node.js, Express.js                 |

| Database   | MongoDB, Mongoose                   |

| Auth       | JWT (jsonwebtoken), bcryptjs        |

| Dev Tools  | Vite, nodemon, dotenv               |



\---



\## 📁 Project Structure



```

blog-platform/

├── backend/

│   ├── config/         # MongoDB connection

│   ├── controllers/    # Route logic (auth, posts, comments)

│   ├── middleware/     # JWT auth middleware

│   ├── models/         # Mongoose schemas (User, Post, Comment)

│   ├── routes/         # Express routers

│   ├── .env            # Environment variables

│   └── server.js       # App entry point

│

└── frontend/

&#x20;   ├── src/

&#x20;   │   ├── api/        # Axios instance with interceptors

&#x20;   │   ├── components/ # Navbar, PostCard, CommentSection

&#x20;   │   ├── context/    # AuthContext (global auth state)

&#x20;   │   ├── pages/      # Home, Login, Register, PostDetail, Create/Edit

&#x20;   │   └── styles/     # Global CSS

&#x20;   ├── index.html

&#x20;   ├── vite.config.js

&#x20;   └── .env

```



\---



\## ⚙️ Getting Started



\### Prerequisites

\- \[Node.js](https://nodejs.org/) v18+

\- \[MongoDB](https://www.mongodb.com/try/download/community) running locally



\---



\### 1. Clone the Repository



```bash

git clone https://github.com/YOUR\_USERNAME/blog-platform.git

cd blog-platform

```



\---



\### 2. Backend Setup



```bash

cd backend

npm install

```



Create a `.env` file inside `backend/`:



```env

PORT=5000

MONGO\_URI=mongodb://localhost:27017/blogplatform

JWT\_SECRET=your\_super\_secret\_key

```



Start the backend server:



```bash

npm run dev

```



> API runs at \*\*http://localhost:5000\*\*



\---



\### 3. Frontend Setup



```bash

cd ../frontend

npm install

```



Create a `.env` file inside `frontend/`:



```env

VITE\_API\_URL=http://localhost:5000/api

```



Start the frontend dev server:



```bash

npm run dev

```



> App runs at \*\*http://localhost:5173\*\*



\---



\## 🔌 API Endpoints



\### Auth

| Method | Endpoint              | Description         |

|--------|-----------------------|---------------------|

| POST   | `/api/auth/register`  | Register a new user |

| POST   | `/api/auth/login`     | Login, receive JWT  |

| GET    | `/api/auth/me`        | Get current user    |



\### Posts

| Method | Endpoint          | Auth | Description             |

|--------|-------------------|------|-------------------------|

| GET    | `/api/posts`      | ❌   | Get all posts           |

| GET    | `/api/posts/:id`  | ❌   | Get single post         |

| POST   | `/api/posts`      | ✅   | Create a new post       |

| PUT    | `/api/posts/:id`  | ✅   | Update post (author)    |

| DELETE | `/api/posts/:id`  | ✅   | Delete post (author)    |



\### Comments

| Method | Endpoint                  | Auth | Description                |

|--------|---------------------------|------|----------------------------|

| GET    | `/api/comments/:postId`   | ❌   | Get comments for a post    |

| POST   | `/api/comments/:postId`   | ✅   | Add a comment              |

| DELETE | `/api/comments/:id`       | ✅   | Delete comment (author)    |



\---



\## 🌍 Environment Variables



\### `backend/.env`

```env

PORT=5000

MONGO\_URI=mongodb://localhost:27017/blogplatform

JWT\_SECRET=replace\_with\_a\_strong\_secret

```



\### `frontend/.env`

```env

VITE\_API\_URL=http://localhost:5000/api

```



> ⚠️ Never commit `.env` files. They are listed in `.gitignore`.



\---



\## 📦 Scripts



\### Backend

| Command       | Description              |

|---------------|--------------------------|

| `npm run dev` | Start with nodemon       |

| `npm start`   | Start without nodemon    |



\### Frontend

| Command         | Description             |

|-----------------|-------------------------|

| `npm run dev`   | Start Vite dev server   |

| `npm run build` | Build for production    |



\---



\## 🤝 Contributing



1\. Fork the repository

2\. Create a feature branch: `git checkout -b feature/your-feature`

3\. Commit your changes: `git commit -m "Add your feature"`

4\. Push to the branch: `git push origin feature/your-feature`

5\. Open a Pull Request



\---



\## 📄 License



This project is open source and available under the \[MIT License](LICENSE).



\---



\## 👤 Author



\*\*Your Name\*\*  

GitHub: \[@YOUR\_USERNAME](https://github.com/YOUR\_USERNAME)



\---



> Built as a full-stack learning project covering REST APIs, JWT auth, MongoDB, and React.

