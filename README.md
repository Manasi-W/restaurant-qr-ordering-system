# DineDash - Restaurant QR Ordering System

DineDash is a premium, full-stack restaurant management and QR-based ordering system. It allows restaurant owners to manage their menus, track orders, and generate QR codes for tables, while providing a seamless digital ordering experience for customers.

## 🚀 Features

### Admin Portal
- **Dashboard**: Real-time business overview with today's orders, revenue, and growth metrics.
- **Menu Management**: Add, edit, and delete dishes with images, categories, and descriptions.
- **Order Tracking**: Manage incoming orders through various stages (Pending, Cooking, Served, Paid).
- **QR Generation**: Create table-specific QR codes that link directly to the restaurant's digital menu.
- **Analytics**: Visualization of top-selling items and revenue performance.

### Customer Portal
- **Digital Menu**: Access a beautiful, mobile-optimized menu by scanning a table QR code.
- **Smart Search**: Quickly find dishes by name or category.
- **Interactive Cart**: Easy item selection, quantity adjustment, and checkout process.
- **Theme-Aware**: Fully responsive design with glassmorphism aesthetics.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js (Vite)
- **Routing**: React Router Dom
- **State/API**: Axios, Hooks
- **Icons**: Custom Lucide-inspired SVG components
- **Styling**: Pure CSS (Modern architectural/glassmorphism theme)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Security**: JWT (Authentication), Bcryptjs (Password hashing)
- **File Uploads**: Multer (Restaurant logos and dish images)
- **Payments**: **Mock Implementation** (Ready for Stripe integration - see `paymentRoutes.js`)

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js installed
- MongoDB account (or local instance)

### Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your credentials:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
4. Start the server (Development):
   ```bash
   npm run dev
   ```
   *Alternatively, start directly with Node:*
   ```bash
   node server.js
   ```

### Frontend Setup
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## 📖 How to Use

1. **Register**: Create an admin account for your restaurant.
2. **Setup Menu**: Navigate to the Menu section and add your categories and dishes.
3. **Generate QRs**: Go to the Tables section and generate QR codes for your restaurant tables.
4. **Place Orders**: Customers scan the generated QR code, browse the menu, and place orders.
5. **Manage Orders**: Track and update order statuses in real-time from the Admin Orders dashboard.

---

## 📝 License
This project is for demonstration purposes. All rights reserved.
