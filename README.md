<div align="center">

# 🔐 MERN Authentication System

### A full-stack authentication system with email verification, OTP-based password reset, and secure JWT session management.

[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)
![Status](https://img.shields.io/badge/status-active-success?style=flat-square)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Database Schema](#-database-schema)
- [Application Flow](#-application-flow)
- [Security Implementation](#-security-implementation)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**MERN Auth** is a production-ready authentication boilerplate built with the MERN stack. It implements modern security practices including HTTP-only cookie sessions, bcrypt password hashing, OTP-based email verification, and a secure password reset flow — all wrapped in a clean, responsive UI.

> Use this as a starting point for any project that requires a complete, secure user authentication system.

---

## ✨ Features

| Feature | Status |
|---|---|
| 📝 User Registration | ✅ Complete |
| 🔑 Secure Login / Logout | ✅ Complete |
| 📧 Email Verification via OTP | ✅ Complete |
| 🔒 Password Reset via OTP | ✅ Complete |
| 🍪 JWT in HTTP-only Cookies | ✅ Complete |
| 🛡️ Protected Routes & Auth Middleware | ✅ Complete |
| 📬 Nodemailer Email Notifications | ✅ Complete |
| 📱 Fully Responsive UI | ✅ Complete |
| 🔔 Toast Notifications | ✅ Complete |

---

## 🛠 Tech Stack

### Frontend
- **React 18** — UI library
- **React Router DOM** — Client-side routing
- **Axios** — HTTP requests with cookie credentials
- **React Toastify** — Toast notifications
- **Tailwind CSS** — Utility-first styling
- **Vite** — Build tooling

### Backend
- **Node.js** — Runtime environment
- **Express.js** — Web framework
- **Mongoose** — MongoDB ODM
- **bcryptjs** — Password hashing (10 salt rounds)
- **JSON Web Token (JWT)** — Stateless authentication
- **Nodemailer** — Email delivery via Gmail SMTP
- **cookie-parser** — Cookie parsing middleware
- **CORS** — Cross-origin resource sharing
- **dotenv** — Environment configuration

### Database
- **MongoDB Atlas** — Cloud-hosted database
  - Cluster: `cluster1.zfbm6hy.mongodb.net`
  - Database Name: `mern_authorize`

---

## 📁 Project Structure

```
mern-auth/
│
├── 📂 client/                        # React Frontend (Vite)
│   ├── 📂 public/
│   │   └── bg_img.png               # Background image
│   ├── 📂 src/
│   │   ├── 📂 assets/
│   │   │   └── assets.js            # Centralized asset exports
│   │   ├── 📂 components/
│   │   │   ├── Header.jsx           # Hero section with verify status
│   │   │   └── Navbar.jsx           # Top nav with user dropdown
│   │   ├── 📂 context/
│   │   │   └── AppContext.jsx       # Global auth state
│   │   ├── 📂 pages/
│   │   │   ├── Home.jsx             # Main dashboard page
│   │   │   ├── Login.jsx            # Login & registration form
│   │   │   ├── EmailVerify.jsx      # 6-digit OTP verification
│   │   │   └── ResetPassword.jsx    # Two-step password reset
│   │   ├── App.jsx                  # Route definitions
│   │   └── main.jsx                 # React entry point
│   └── .env                         # Frontend environment variables
│
└── 📂 server/                        # Express Backend
    ├── 📂 config/
    │   ├── mongodb.js               # Mongoose connection
    │   └── nodemailer.js            # Gmail transporter config
    ├── 📂 controllers/
    │   ├── authController.js        # register, login, logout, OTP flows
    │   └── userController.js        # getUserData
    ├── 📂 middleware/
    │   └── userAuth.js              # JWT verification middleware
    ├── 📂 models/
    │   └── userModel.js             # Mongoose user schema
    ├── 📂 routes/
    │   ├── authRoutes.js            # /api/auth/* endpoints
    │   └── userRoutes.js            # /api/user/* endpoints
    ├── server.js                    # Express app entry point
    └── .env                         # Backend environment variables
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed and ready:

- [Node.js](https://nodejs.org/) v14 or higher
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account *(free tier works perfectly)*
- A [Gmail](https://mail.google.com/) account with an **App Password** generated

---

### Backend Setup

**1. Clone the repository**

```bash
git clone https://github.com/your-username/mern-auth.git
cd mern-auth/server
```

**2. Install dependencies**

```bash
npm install
```

**3. Create a `.env` file** inside the `server/` directory and add the following:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster1.zfbm6hy.mongodb.net/mern_authorize
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
PORT=4000
```

> ⚠️ Replace `<username>` and `<password>` with your actual MongoDB Atlas credentials.

**4. Start the backend server**

```bash
npm start
```

On success, your terminal should show:

```
Server started on PORT 4000
✅ Database Connected Successfully
```

---

### Frontend Setup

**1. Open a new terminal and navigate to the client**

```bash
cd mern-auth/client
```

**2. Install dependencies**

```bash
npm install
```

**3. Create a `.env` file** inside the `client/` directory:

```env
VITE_BACKEND_URL=http://localhost:4000
```

**4. Start the development server**

```bash
npm run dev
```

The app will be running at **`http://localhost:5173`** 🎉

---

## 🔑 Environment Variables

### Backend — `server/.env`

| Variable | Description | Example |
|---|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster1...` |
| `JWT_SECRET` | Secret key for signing JWTs | `myS3cr3tK3y!` |
| `NODE_ENV` | Runtime environment | `development` or `production` |
| `EMAIL_USER` | Gmail address used to send emails | `yourname@gmail.com` |
| `EMAIL_PASS` | Gmail App Password (16 characters) | `xxxx xxxx xxxx xxxx` |
| `PORT` | Port the server listens on | `4000` |

### Frontend — `client/.env`

| Variable | Description | Example |
|---|---|---|
| `VITE_BACKEND_URL` | Backend API base URL | `http://localhost:4000` |

---

### 📮 How to Generate a Gmail App Password

1. Go to your [Google Account Settings](https://myaccount.google.com/)
2. Navigate to **Security** → Enable **2-Step Verification**
3. Return to **Security** → Find and click **App Passwords**
4. Select **Mail** as the app and your device type, then click **Generate**
5. Copy the 16-character password and paste it as `EMAIL_PASS` in your `.env`

> ⚠️ **Never** use your regular Gmail password — it will not work and is a security risk.

---

## 📡 API Reference

### Auth Routes — Base: `/api/auth`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/register` | Create a new user account | ❌ |
| `POST` | `/login` | Authenticate and set session cookie | ❌ |
| `POST` | `/logout` | Clear the session cookie | ❌ |
| `GET` | `/is-auth` | Verify if the current session is valid | ✅ |
| `POST` | `/send-verify-otp` | Send a 6-digit OTP to the user's email | ✅ |
| `POST` | `/verify-account` | Verify the user's email with OTP | ✅ |
| `POST` | `/send-reset-otp` | Send a password reset OTP | ❌ |
| `POST` | `/reset-password` | Reset password using OTP + new password | ❌ |

### User Routes — Base: `/api/user`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/data` | Fetch the logged-in user's profile data | ✅ |

---

### Example Requests & Responses

<details>
<summary><b>📌 POST /api/auth/register</b></summary>

**Request Body**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "SecurePass123!"
}
```

**Success `200`**
```json
{
  "success": true
}
```

**Error `200`**
```json
{
  "success": false,
  "message": "User already exists"
}
```
</details>

<details>
<summary><b>📌 POST /api/auth/login</b></summary>

**Request Body**
```json
{
  "email": "jane@example.com",
  "password": "SecurePass123!"
}
```

**Success `200`**
```json
{
  "success": true
}
```
> A `token` HTTP-only cookie is set automatically on the client.

**Error `200`**
```json
{
  "success": false,
  "message": "Invalid password"
}
```
</details>

<details>
<summary><b>📌 POST /api/auth/send-reset-otp</b></summary>

**Request Body**
```json
{
  "email": "jane@example.com"
}
```

**Success `200`**
```json
{
  "success": true,
  "message": "OTP sent to your email"
}
```
</details>

<details>
<summary><b>📌 POST /api/auth/reset-password</b></summary>

**Request Body**
```json
{
  "email": "jane@example.com",
  "otp": "482910",
  "newPassword": "NewSecurePass456!"
}
```

**Success `200`**
```json
{
  "success": true,
  "message": "Password has been reset successfully"
}
```
</details>

<details>
<summary><b>📌 GET /api/user/data</b></summary>

**Headers** — Cookie with valid `token` required

**Success `200`**
```json
{
  "success": true,
  "userData": {
    "name": "Jane Doe",
    "isAccountVerified": false
  }
}
```
</details>

---

## 🗄️ Database Schema

**Connection:** MongoDB Atlas — `cluster1.zfbm6hy.mongodb.net`  
**Database:** `mern_authorize`  
**Collection:** `users`

```js
{
  _id:                  ObjectId,   // Auto-generated
  name:                 String,     // Required — user's full name
  email:                String,     // Required, Unique — user's email
  password:             String,     // Required — bcrypt hashed (10 rounds)

  // Email Verification
  verifyOtp:            String,     // 6-digit OTP (default: "")
  verifyOtpExpiredAt:   Number,     // Timestamp — expires in 24 hours (default: 0)
  isAccountVerified:    Boolean,    // Defaults to false

  // Password Reset
  resetOtp:             String,     // 6-digit OTP (default: "")
  resetOtpExpiredAt:    Number,     // Timestamp — expires in 15 minutes (default: 0)
}
```

---

## 🔄 Application Flow

### 1️⃣ Registration

```
User fills in name, email, password
        ↓
POST /api/auth/register
        ↓
Validate fields → Check existing email
        ↓
Hash password with bcrypt (10 rounds)
        ↓
Save new user to MongoDB (isAccountVerified: false)
        ↓
Send welcome email via Nodemailer
        ↓
Sign JWT → Set HTTP-only cookie (7 days)
        ↓
Frontend: setIsLoggedin(true) → getUserData() → navigate('/')
```

---

### 2️⃣ Email Verification

```
User sees "Email not verified" banner on Home page
        ↓
Clicks "Verify Email" → POST /api/auth/send-verify-otp
        ↓
Generate 6-digit OTP → Save to DB with 24-hour expiry
        ↓
Send OTP email → navigate('/email-verify')
        ↓
User enters 6-digit OTP in input boxes
        ↓
POST /api/auth/verify-account  { otp }
        ↓
Validate OTP & expiry → Set isAccountVerified: true
        ↓
Frontend: getUserData() → "✅ Verified" badge shown
```

---

### 3️⃣ Password Reset

```
User clicks "Forgot password?" on Login page
        ↓
Enters registered email → POST /api/auth/send-reset-otp
        ↓
Generate 6-digit OTP → Save to DB with 15-minute expiry
        ↓
Send OTP email → Form advances to Step 2
        ↓
User enters OTP + new password
        ↓
POST /api/auth/reset-password  { email, otp, newPassword }
        ↓
Validate OTP & expiry → Hash new password → Update DB
        ↓
navigate('/login') → User logs in with new password
```

---

### 4️⃣ Session & Auto-Authentication

```
App loads → useEffect triggers getAuthState()
        ↓
GET /api/auth/is-auth  (sends cookie automatically)
        ↓
userAuth middleware validates JWT from cookie
        ↓
Valid  → setIsLoggedin(true) → getUserData() → User loaded
Invalid/Missing → User stays as null → Login button shown
```

---

## 🔒 Security Implementation

### HTTP-only Cookie
```js
res.cookie('token', token, {
  httpOnly: true,   // Cannot be accessed by JS — prevents XSS
  secure: process.env.NODE_ENV === 'production',  // HTTPS only in prod
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days in milliseconds
});
```

### Password Hashing
```js
// Hashing on registration
const hashedPassword = await bcrypt.hash(password, 10);

// Comparing on login
const isMatch = await bcrypt.compare(password, user.password);
```

### JWT Authentication
```js
// Signing the token
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
  expiresIn: '7d'
});

// Verifying in middleware
const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
req.user = { id: tokenDecode.id };
```

### OTP Expiry Logic
```js
// Email verification OTP — valid for 24 hours
user.verifyOtpExpiredAt = Date.now() + 24 * 60 * 60 * 1000;

// Password reset OTP — valid for 15 minutes
user.resetOtpExpiredAt = Date.now() + 15 * 60 * 1000;
```

---

## 🗺️ Roadmap

Future features planned for this project:

- [ ] **Two-Factor Authentication (2FA)** — TOTP via Google Authenticator + QR code setup
- [ ] **Remember Me** — Extended 30-day cookie sessions
- [ ] **Account Deletion** — Permanent deletion with password confirmation and email notice
- [ ] **Profile Picture Upload** — Cloudinary cloud image storage
- [ ] **Email Change with Verification** — OTP sent to new email before updating
- [ ] **Password Strength Indicator** — Real-time visual password feedback
- [ ] **Rate Limiting on OTP Requests** — Prevent brute-force and OTP spam
- [ ] **Social Login** — Google / GitHub OAuth 2.0
- [ ] **HTML Email Templates** — Branded, styled email designs

---

## 🤝 Contributing

Contributions are welcome and appreciated! To get started:

1. **Fork** this repository
2. **Clone** your fork:
   ```bash
   git clone https://github.com/your-username/mern-auth.git
   ```
3. **Create** a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Commit** your changes:
   ```bash
   git commit -m "feat: add your feature description"
   ```
5. **Push** and open a **Pull Request**:
   ```bash
   git push origin feature/your-feature-name
   ```

Please follow the existing code style and keep commits focused and descriptive.

---

## ⚠️ Security Notes

**Never commit your `.env` files.** Add the following to your `.gitignore` before your first push:

```gitignore
# Environment Variables
.env
client/.env
server/.env

# Dependencies
node_modules/
client/node_modules/
server/node_modules/
```

---

## 📄 License

This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute this project with attribution.

---

<div align="center">

**Built with ❤️ using the MERN Stack**

If this project helped you, please consider giving it a ⭐

</div>
