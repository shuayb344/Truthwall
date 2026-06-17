# TruthWall 🕯️
### Digital Confessional | Anonymous Expression | Community Empathy

TruthWall is a premium, anonymous social platform designed as a modern "digital confessional." It provides a safe, high-contrast emotional space for users to share their deepest thoughts, secrets, and life experiences without the fear of judgment.



## ✨ Key Features

- **Anonymous Confessions**: Share thoughts with persistent, uniquely generated aliases.
- **Confessional Design System**: A high-end, dark-themed aesthetic with vibrant red accents and glassmorphism.
- **Categorized Feeds**: Explore confessions by emotion or topic (Mental Health, Relationships, Work, Identity, etc.).
- **Real-time Interaction**: Live empathy reactions and threaded comments powered by Socket.io.
- **Empathy Scoring**: A gamified system that rewards authentic interaction and supportive engagement.
- **Privacy First**: No tracking, minimal data retention, and optional ephemeral posting.
- **Crisis Support**: Automated detection of sensitive content with immediate resource redirection.
- **Moderation Suite**: Robust admin tools for community safety and content management.
- **Mobile Optimized**: Custom "Hide on Scroll" navigation and compact UI for a seamless mobile reading experience.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: TypeScript
- **State Management**: [Zustand](https://docs.pmnd.rs/zustand/)
- **Data Fetching**: [Tanstack React Query v5](https://tanstack.com/query/latest)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/) & [HugeIcons](https://hugeicons.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Real-time**: [Socket.io](https://socket.io/)
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: [Cloudinary](https://cloudinary.com/) (Images)
- **Security**: Helmet, CORS, Bcrypt.js

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shuayb344/Truthwall.git
   cd Truthwall
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   ```
   Create a `.env` file in the `Backend` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=name
   CLOUDINARY_API_KEY=key
   CLOUDINARY_API_SECRET=secret
   ```
   Run in development:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```
   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_SOCKET_URL=http://localhost:5000
   ```
   Run in development:
   ```bash
   npm run dev
   ```

---

## 🏗️ Architecture

- **`frontend/src/components/layout`**: Centralized layout system with responsive navigation.
- **`frontend/src/hooks`**: Custom hooks for business logic (Auth, Feed, Notifications, Scroll).
- **`Backend/src/models`**: Robust Mongoose schemas for Posts, Users, Reports, and Notifications.
- **`Backend/src/services`**: Decoupled service layer for complex business rules.

---

## 🎨 Design Philosophy
TruthWall uses the **"Confessional" Design System**:
- **Contrast**: Deep #080808 backgrounds with high-contrast text and bright red (`#E03030`) highlights.
- **Typography**: Inter for readability and unique font-variable headers for character.
- **Micro-interactions**: Subtle hover scales, spring-based animations, and smooth layout transitions to keep the interface feeling "alive."

## 📄 License
This project is licensed under the ISC License.

---
Created with ❤️ by Shuayb.
