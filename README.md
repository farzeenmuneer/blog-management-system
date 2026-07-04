# 📝 Blog Management System



A full-stack blog platform built with **Django REST Framework** and **React.js** featuring JWT authentication, dark/light mode, and a modern glass-morphism UI.


## ✨ Features

### 🔐 Authentication & Authorization
- JWT Authentication with access/refresh tokens
- Secure login and logout
- Protected routes for authenticated users
- Custom `IsOwnerOrReadOnly` permission system

### 📝 Blog Management
- Create, read, update, and delete blog posts
- Rich text content support
- View posts by other users
- Owner-only edit/delete permissions

### 💬 Comment System
- Add comments on any post
- Delete own comments
- Real-time comment updates

### 🎨 User Experience
- 🌓 Dark/Light mode with persistent storage
- 📱 Fully responsive design (mobile-first)
- ✨ Smooth animations with Framer Motion
- 🎨 Modern glass-morphism UI
- 💫 Interactive hover effects



## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Django | 4.2.7 | Web framework |
| Django REST Framework | 3.14.0 | API development |
| DRF SimpleJWT | 5.3.0 | JWT authentication |
| Django CORS Headers | 4.3.0 | Cross-origin requests |
| Django Filter | 23.4 | API filtering |
| SQLite3 | - | Development database |

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI library |
| React Router | 6.18.0 | Navigation |
| Axios | 1.6.0 | HTTP client |
| Bootstrap | 5.3.0 | Styling |
| Framer Motion | 10.16.0 | Animations |
| React Icons | 4.11.0 | Icons |

---

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 14+
- Git

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/farzeenmuneer/blog-management-system.git
cd blog-management-system

# 2. Backend Setup
python -m venv venv

# Windows (Git Bash)
source venv/Scripts/activate

# Windows (CMD)
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start Django server
python manage.py runserver

# 3. Frontend Setup (in new terminal)
cd frontend
npm install
npm start

Project Structure

blog-management-system/
├── backend/                 # Django project settings
│   ├── settings.py         # Project configuration
│   └── urls.py            # Main URL routing
├── blog/                   # Blog application
│   ├── models.py          # Post and Comment models
│   ├── serializers.py     # DRF serializers
│   ├── views.py           # API views (ViewSets)
│   ├── permissions.py     # Custom permissions
│   ├── admin.py           # Admin configuration
│   ├── urls.py            # App URL routing
│   └── tests.py           # Test suite
├── frontend/               # React application
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   ├── context/      # Auth & Theme contexts
│   │   ├── App.js        # Main component
│   │   └── index.js      # Entry point
│   └── package.json      # Dependencies
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── requirements.txt        # Python dependencies
└── README.md              # Documentation
cd frontend
npm install
npm start
