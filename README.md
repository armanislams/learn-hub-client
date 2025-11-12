# 🎓 LearnHub — Online Course Platform

LearnHub is a full-stack MERN-based e-learning website that allows users to browse, enroll, and manage online courses.  
Instructors can add and manage their own courses, while students can explore and enroll in them easily.  

Built using **React**, **Express**, **MongoDB**, **TailwindCSS**, and **DaisyUI**.

---

## 🚀 Features

### 🌐 Public Area
- View all available courses
- Filter courses by category
- View detailed course pages
- Switch between light and dark themes (DaisyUI built-in)

### 👨‍🏫 Instructor Dashboard
- Add a new course with title, image, category, price, and description
- Mark courses as **Featured**
- View all courses added by the logged-in instructor
- Dashboard stats and course overview

### 👩‍🎓 Student Area
- Enroll in courses
- View enrolled courses
- Track progress

### 💡 UI & Experience
- Fully responsive design
- Theme switcher using DaisyUI toggle
- Toast notifications for actions
- Clean, modern layout

---

## 🛠️ Tech Stack

### Core Technologies

| Technology    | Purpose |
|---------------|---------|
| React         | The frontend JavaScript library for building the user interface. |
| Vite          | The build tool and development server. |
| Firebase      | Backend-as-a-Service, used specifically for Authentication. |
| Tailwind CSS  | Utility-first CSS framework for styling and responsiveness. |
| React Router  | For handling navigation and routing within the application. |

### Additional Packages

| Package       | Purpose |
|---------------|---------|
| react-toastify | For displaying toast notifications. |
| react-icons   | For including various icons in the UI. |
| Framer Motion | For motion in the home page|

---
## ✨ Key Features

- **Custom Authentication Flow**: Secure registration, login, and password reset functionalities.
- **Social Sign-In**: Easy login using Google Popup Authentication.
- **Protected Routes**: User-specific content (like the Profile page) is protected, requiring authentication for access.
- **Context API for Global State**: User and authentication state are managed globally using React Context, accessible via a custom useAuth hook.
- **Responsive UI**: Built with Tailwind CSS for a mobile-first, attractive design.
- **Enhanced UX**: Uses react-toastify for clear, non-intrusive success and error notifications.
- **Title Customization**: Uses a custom useTitle hook to dynamically set the page title based on the current route.


## 📱 Features in Detail

### Authentication

- **Registration**: Users can create a new account with email and password.
- **Login**: Existing users can sign in with their credentials.
- **Password Reset**: Users can reset their password if forgotten.
- **Google Sign-In**: Quick authentication using Google accounts.

----

## 🧩 Key Components

- Dashboard – Displays instructor stats, total enrollments, featured courses
- 
- Add Course Page – Instructors can create a new course
- 
- All Courses Page – Lists all available courses
- 
- Auth Context – Manages Firebase authentication state globally
- 
- Theme Toggle – Uses DaisyUI’s built-in theme-controller toggle

---

## 🌐 Live Demo

| Environment | URL |
|-------------|-----|
| Live Site   | https://learn-hub-f5d30.web.app/

## 🧾 License

This project is licensed under the MIT License.

## 🧑‍💻 Author

- Arman Islam
- 📧 Email: [email@armanislam.me]
- 🌐 Portfolio: [armanislam.me]
- 💼 GitHub: https://github.com/armanislams