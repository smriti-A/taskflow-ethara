# 🌌 TaskFlow — Cyberpunk Project Management App

TaskFlow is a state-of-the-art, fully-featured project and team management application with a sleek, neon-infused **Cyberpunk aesthetic**. Built for speed, productivity, and style, TaskFlow allows operators to manage projects, assign tasks, and track team progress in a high-tech terminal-inspired interface.

Built using **React** and **Vite**.

![TaskFlow Concept Image](https://github.com/smriti-A/taskflow-ethara/assets/demo-image-placeholder) <!-- Add a screenshot of the app here -->

---

## 🚀 Features

- **🔐 Operator Authentication**: Secure entry system with role-based access control (Admin / Member).
- **📁 Advanced Project Management**: Create, view, and track the progress of ongoing projects.
- **✅ Task Execution Queue**: Create, assign, and manage tasks with statuses (Todo, In Progress, Done, Blocked).
- **👥 Team Operators**: Directory of all registered operators, their roles, and contact information.
- **📊 Command Dashboard**: High-level overview of system metrics, critical/overdue tasks, and quick actions.
- **💾 Local Persistence**: All data is securely stored within the browser's `localStorage`, requiring no external backend or database to operate.
- **🎨 Cyberpunk UI**: Built with a custom vanilla CSS design system featuring neon glows, mono-fonts, data-grids, and interactive micro-animations.

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite 6
- **Styling:** Custom Vanilla CSS with CSS Variables (Neon/Cyberpunk Theme)
- **State Management:** React Hooks (`useState`, `useEffect`)
- **Data Persistence:** Browser Local Storage (`localStorage`)
- **Deployment:** Vercel (or Netlify/GitHub Pages)

---

## 💻 Local Development

Follow these steps to run TaskFlow locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/smriti-A/taskflow-ethara.git
   cd taskflow-ethara
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local URL provided by Vite (usually `http://localhost:5173`).

---

## 🔑 Demo Credentials

To bypass registration and quickly explore the application, use one of the pre-configured demo operators:

| Access Level | Email            | Password  | Privileges |
|--------------|------------------|-----------|------------|
| **Admin**    | `alice@demo.com` | `demo123` | Full control over all projects and tasks. |
| **Member**   | `bob@demo.com`   | `demo123` | Can view and update their assigned tasks. |

---

## 🌐 Deployment

This application is fully client-side and can be deployed easily as a static site. 

**Deploying to Vercel (Recommended):**
1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com/) and create a new project.
3. Import your GitHub repository.
4. Leave the default settings (Framework Preset: Vite, Build Command: `npm run build`, Output Directory: `dist`).
5. Click **Deploy**.

---

## 📂 Project Structure

```text
src/
├── components/   # Reusable UI components (Avatar, Modal, StatCard)
├── pages/        # Main application views (Dashboard, Projects, Tasks, etc.)
├── styles/       # Core theme tokens and global CSS
├── utils/        # Helper functions and seed data
├── App.jsx       # Main application layout and routing logic
└── main.jsx      # React entry point
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
