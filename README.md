# 🎓 LearnHub — Intelligent E-Learning Platform

![Project Banner 1](/public/learn-hub-1.png)
![Project Banner 2](/public/learn-hub-2.png)
![Project Banner 3](/public/learn-hub-3.png)

**LearnHub** is a comprehensive, full-stack Learning Management System (LMS) designed to bridge the gap between instructors and students. It offers a seamless experience for course creation, enrollment, and progress tracking, empowered by real-time analytics and secure role-based access.

🔗 **Live Demo:** [https://learn-hub-f5d30.web.app](https://learn-hub-f5d30.web.app)

---

## 🚀 Key Features

### 👤 User Experience
*   **Role-Based Dashboards:** tailored interfaces for Students, Instructors, and Admin.
*   **Secure Authentication:** Google and Email/Password login via Firebase.
*   **Dynamic Theme:** Toggle between Light and Dark modes.
*   **Responsive Design:** Fully optimized for mobile, tablet, and desktop.

### 📚 For Students
*   **Interactive Dashboard:**
    *   **Analytics:** Track learning hours, completed courses, and average ratings.
    *   **Visualizations:** Enrollment timeline, category distribution, and rating charts using **Recharts**.
*   **Smart Enrollment:** Easy course discovery and one-click enrollment.
*   **Profile Management:** Editable profile with custom avatar and personal details.
*   **My Courses:** view ongoing and completed courses with progress indicators.

### 👨‍🏫 For Instructors
*   **Course Management:** Create, update, and manage courses with rich details (image, price, syllabus).
*   **Student Tracking:** View student enrollments and monitor course popularity.

### 🛡️ For Admins
*   **User Management:** detailed user lists with role management capabilities.
*   **Content Oversight:** Tools to moderate courses and content.

### 🔒 Security
*   **Protected Routes:** Frontend route guards for User, Instructor, and Admin views.
*   **Secure API:** JWT-based verification with secure Axios interceptors.
*   **Error Handling:** Custom 401 (Unauthorized) and 403 (Forbidden) pages.

---

## 🛠️ Tech Stack

### Frontend
*   **Framework:** [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
*   **State Management:** [TanStack Query](https://tanstack.com/query/latest) (Server state), Context API (Auth state)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)
*   **Routing:** [React Router DOM](https://reactrouter.com/)
*   **Data Visualization:** [Recharts](https://recharts.org/)
*   **Authentication:** [Firebase Authentication](https://firebase.google.com/)
*   **HTTP Client:** [Axios](https://axios-http.com/) (with Interceptors)
*   **Notifications:** [React Hot Toast](https://react-hot-toast.com/) & React Toastify

---

## ⚙️ Local Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/armanislams/learn-hub-client.git
    cd learn-hub-client
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Configuration:**
    Create a `.env.local` file in the root directory and add your Firebase config keys:
    ```env
    VITE_apiKey=your_api_key
    VITE_authDomain=your_auth_domain
    VITE_projectId=your_project_id
    VITE_storageBucket=your_storage_bucket
    VITE_messagingSenderId=your_messaging_sender_id
    VITE_appId=your_app_id
    ```

4.  **Run the application:**
    ```bash
    npm run dev
    ```

---

## 📂 Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── Common/     # Shared components (Navbar, Footer, Loaders)
│   ├── Dashboard/  # Dashboard-specific widgets and charts
│   └── Home/       # Landing page sections
├── hooks/          # Custom Hooks (useAuth, useAxiosSecure, useRole)
├── Layout/         # Main layout wrappers (Main, Dashboard)
├── pages/          # Application views
│   ├── AdminPages/ # Admin-only routes
│   ├── Common/     # Shared pages (Login, Register, Errors)
│   └── Instructor/ # Instructor-specific views
├── Provider/       # Context Providers (AuthProvider)
└── Routes/         # Router configuration (PrivateRoutes, AdminRoute)
```

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Author
**Arman Islam**
- 🌐 [Portfolio](https://armanislam.me)
- 💼 [LinkedIn](https://linkedin.com/in/armanislams)
- 🐙 [GitHub](https://github.com/armanislams)