<div align="center">

## ╔══════════════════════════════════════════╗

# 🌐 **Muntasir Portfolio** 🌐

### _Personal Portfolio Website Backend_

## ╚══════════════════════════════════════════╝

</div>

## 🧭 Overview

**Muntasir Portfolio** is a modern full-stack personal portfolio website built with **Next.js (TypeScript)** on the frontend and **Express.js + Prisma** on the backend.  
It serves as a digital representation of professional identity, showcasing personal projects, blogs, and detailed background information through a responsive and user-friendly interface.

---

### 📡 Api Endpoints

| Module      | Method | Endpoint                  | Body / Params                                                                    | Description                                   |
| ----------- | ------ | ------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------- |
| **Auth**    | POST   | `/api/v1/auth/login`      | `{ email, password }`                                                            | Login user and return access & refresh tokens |
|             | POST   | `/api/v1/auth/logout`     | —                                                                                | Logout user and clear authentication cookies  |
| **User**    | POST   | `/api/v1/user/create`     | `{ name, email, password, role? }`                                               | Create a new user                             |
|             | PATCH  | `/api/v1/user/:id`        | `{ name?, password?, role? }`                                                    | Update a user by ID                           |
| **Blog**    | POST   | `/api/v1/blog/create`     | `{ title, content, published, authorId }`                                        | Create a new blog                             |
|             | GET    | `/api/v1/blog/`           | Query params: `page`, `limit`                                                    | Get all blogs with pagination                 |
|             | GET    | `/api/v1/blog/:id`        | `id`                                                                             | Get a single blog by ID                       |
|             | PATCH  | `/api/v1/blog/:id`        | `{ title?, content?, published? }`                                               | Update a blog by ID                           |
|             | DELETE | `/api/v1/blog/:id`        | `id`                                                                             | Delete a blog by ID                           |
| **Project** | POST   | `/api/v1/project/create`  | `{ title, description, thumbnail, projectLink, liveSite, features[], authorId }` | Create a new project                          |
|             | GET    | `/api/v1/project/:id`     | `id`                                                                             | Get a single project by ID                    |
|             | GET    | `/api/v1/project/`        | Query params: `page`, `limit`                                                    | Get all projects                              |
|             | PUT    | `/api/v1/project/:id`     | `{ title?, description?, thumbnail?, projectLink?, liveSite?, features? }`       | Update a project by ID                        |
|             | DELETE | `/api/v1/project/:id`     | `id`                                                                             | Delete a project by ID                        |
| **About**   | POST   | `/api/v1/about/create`    | `{ authorId, name, email, phone, bio, skills[], linkedin?, github?, twitter? }`  | Create About Me section                       |
|             | GET    | `/api/v1/about/:authorId` | `authorId`                                                                       | Get About Me section by user ID               |
|             | PATCH  | `/api/v1/about/:authorId` | `{ name?, email?, phone?, bio?, skills?, linkedin?, github?, twitter? }`         | Update About Me section by user ID            |
|             | DELETE | `/api/v1/about/:authorId` | `authorId`                                                                       | Delete About Me section by user ID            |

---

## ⚡ Key Features

- 🔐 **Authentication & Authorization**  
  A secure login system that grants exclusive access to the portfolio owner.  
  Only the authenticated user can enter the private dashboard and manage website content safely.

- 🧭 **Interactive Dashboard**  
  A centralized control hub where the owner can manage blogs, projects, and about information.  
  Includes an elegant overview section with analytics and visual insights powered by a **Pie Chart**.

- ✍️ **Dynamic Blog Management**  
  A fully functional blog system enabling the owner to **create, read, update, and delete** blog posts with ease.  
  Visitors can explore all published blogs, while updates appear instantly using **Incremental Static Regeneration (ISR)**.

- ⚙️ **Project Management System**  
   A powerful interface within the dashboard that allows the owner to **create, edit, update, or remove** projects dynamically —  
   maintaining full control over showcased work in real time.

- 👤 **About Me Section**  
  A public introduction showcasing personal information, work experience, and technical skills.  
  Built with **SSG (Static Site Generation)** for fast loading and SEO optimization.

- 💼 **Projects Showcase**  
  A sleek portfolio gallery that highlights personal and professional projects with live links, thumbnails, and feature details.  
  Updated dynamically via **ISR**, ensuring fresh content without manual redeployment.

---

## 🧰 Technology Stack

**Frontend:** Next.js, TypeScript, Tailwind CSS + Shadcn/UI  
**Backend:** Node.js, Express.js, PostgreSQL, Prisma, JWT + bcrypt  
**Tools:** react-hot-toast, GitHub, Vercel

---

### 📦 Installation Steps

1. **Clone the Repository Frontend**

   ```bash
   https://github.com/muntasirmoin/resume-nest-client.git
   ```

2. **Clone the Repository Backend**

   ```bash
    https://github.com/muntasirmoin/resume-nest-server.git
   ```

3. **Create an `.env` file at the root of the frontend**

```bash
  # Base API URL
  NEXT_PUBLIC_BASE_API=http://localhost:5000/api/v1

  # Google OAuth
  GOOGLE_CLIENT_ID=your_google_client_id
  GOOGLE_CLIENT_SECRET=your_google_client_secret

  # NextAuth settings
  NEXTAUTH_URL=http://localhost:3000
  NEXTAUTH_SECRET=your_nextauth_secret
  AUTH_SECRET=your_auth_secret
```

4.  **Create an `.env` file at the root of the backend**

```bash
# Server Port
PORT=5000

# Database URL
DATABASE_URL=*****

# Node environment
NODE_ENV=development

# JWT Settings
JWT_ACCESS_SECRET=*****
JWT_ACCESS_EXPIRES=***
JWT_REFRESH_SECRET=*****
JWT_REFRESH_EXPIRES=***

# Bcrypt Settings
BCRYPT_SALT_ROUND=10

# Admin Credentials
ADMIN_EMAIL=*****
ADMIN_PASSWORD=*****

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

5. **Install Dependencies**

```bash
npm install / bun install
```

## 🚀 Live Deployment Links

- **Frontend:** [https://resume-nest-client.vercel.app](https://resume-nest-client.vercel.app)
- **Backend:** [https://resume-nest-server.vercel.app](https://resume-nest-server.vercel.app/)
