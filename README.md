# 🌸 Lotus Planet

A full-stack e-commerce web application for a plant and flower shop. Lotus Planet allows users to browse, search, and purchase plants online, while admins can manage products, categories, and orders through a dedicated dashboard.

---

## 🌿 Features

### 👤 User Features
- Register & Login with JWT authentication
- Browse products by category
- Add items to cart and wishlist
- Checkout and place orders
- View order history in profile
- Plant care tips page

### 🔐 Admin Features
- Secure admin dashboard
- Add, edit, and delete products
- Upload product images via Cloudinary
- Manage categories
- View and update order statuses
- Configure site settings

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 + TypeScript | Core UI framework |
| Vite | Build tool & dev server |
| Tailwind CSS v4 | Styling |
| React Router v7 | Client-side routing |
| Radix UI / ShadcnUI | Accessible UI components |
| Lucide React | Icons |
| React Hook Form | Form management |
| Recharts | Admin analytics charts |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | Server & REST API |
| MongoDB + Mongoose | Database |
| JWT + bcryptjs | Authentication & security |
| Cloudinary + Multer | Image uploads |
| Nodemailer | Email notifications |
| dotenv | Environment config |

---

## 📁 Project Structure

```
Lotus_Planet/
├── backend/
│   ├── src/
│   │   ├── config/       # DB & Cloudinary config
│   │   ├── controllers/  # Route controllers
│   │   ├── middleware/   # Auth & error middleware
│   │   ├── models/       # Mongoose schemas
│   │   ├── routes/       # API route definitions
│   │   └── utils/        # Helper utilities
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   └── app/
    │       ├── components/  # Reusable UI components
    │       ├── context/     # React context (auth, cart, etc.)
    │       ├── pages/       # Page components
    │       ├── utils/       # API helpers
    │       └── routes.tsx   # App routes
    ├── index.html
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed/set up:

- [Node.js](https://nodejs.org/) v18+
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or local MongoDB)
- [Cloudinary](https://cloudinary.com/) account (for image uploads)
- A Gmail account with an [App Password](https://support.google.com/accounts/answer/185833) (for email notifications)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Lotus_Planet.git
cd Lotus_Planet
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file by copying the example:

```bash
cp .env.example .env
```

Then fill in your values in `.env`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
ADMIN_EMAIL=admin@lotusplanet.com
ADMIN_PASSWORD=your_admin_password
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GMAIL_USER=your_gmail@gmail.com
GMAIL_PASSWORD=your_gmail_app_password
FRONTEND_URL=http://localhost:5173
```

Start the backend server:

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

The backend will run at `http://localhost:5000`.

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Start the frontend dev server:

```bash
npm run dev
```

The frontend will run at `http://localhost:5173`.

---

## 🔌 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user / admin |
| GET | `/api/products` | Get all products |
| POST | `/api/products` | Create product (Admin) |
| PUT | `/api/products/:id` | Update product (Admin) |
| DELETE | `/api/products/:id` | Delete product (Admin) |
| GET | `/api/categories` | Get all categories |
| GET | `/api/orders` | Get all orders (Admin) |
| POST | `/api/orders` | Place a new order |
| PUT | `/api/orders/:id` | Update order status (Admin) |
| POST | `/api/upload` | Upload image to Cloudinary |

---

## 🌐 Environment Variables Reference

| Variable | Description |
|---|---|
| `PORT` | Port the backend server runs on |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `JWT_EXPIRE` | JWT token expiry duration |
| `ADMIN_EMAIL` | Email address for the admin account |
| `ADMIN_PASSWORD` | Password for the admin account |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Your Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API secret |
| `GMAIL_USER` | Gmail address for sending emails |
| `GMAIL_PASSWORD` | Gmail App Password |
| `FRONTEND_URL` | URL of the frontend (for CORS) |

---

## 📸 Pages

- **Home** — Hero section, featured plants, categories
- **Shop** — Product listing with filters
- **Care Tips** — Plant care guidance articles
- **Login / Register** — User authentication
- **Checkout & Payment** — Order flow
- **Admin Dashboard** — Product, category, and order management

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👩‍💻 Author

Made with 💚 by **Khushi Patel**
