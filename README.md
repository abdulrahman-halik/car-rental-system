# Car Rental System

A comprehensive web application for renting cars, connecting car owners with customers. This system allows users to browse available cars, make bookings, and allows car owners to manage their fleet and bookings through a dedicated dashboard.

## Features

### Role-Based Access
*   **User (Customer)**: Browse cars, view details, book cars, manage their bookings.
*   **Owner (Admin/Lessor)**: Dashboard overview, manage car listings (add/edit/delete), toggle car availability, manage bookings.

### Key Functionalities
*   **Authentication**: Secure login and registration using JWT.
*   **Car Management**: Owners can upload car image, set pricing, and manage availability.
*   **Booking System**: Streamlined booking process for customers.
*   **Image Handling**: Integration with ImageKit for efficient image storage and delivery.
*   **Responsive Design**: Built with TailwindCSS for a seamless experience across devices.

## Tech Stack

### Frontend
*   **React** (Vite)
*   **TailwindCSS** (Styling)
*   **React Router DOM** (Navigation)
*   **Axios** (API Requests)
*   **React Hot Toast** (Notifications)

### Backend
*   **Node.js** & **Express.js** (Runtime & Framework)
*   **MongoDB** & **Mongoose** (Database & ODM)
*   **ImageKit** (Image Storage)
*   **JWT** (Authentication)
*   **BCrypt** (Security)
*   **Multer** (File Uploads)

## Project Structure

```
RENT-A-CAR/
├── backend/            # Express.js Server & API
│   ├── config/         # Configuration files
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Custom middleware (Auth, Upload)
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   └── server.js       # Entry point
├── frontend/           # React.js Client
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── context/    # Global state management
│   │   ├── pages/      # Application pages
│   │   └── assets/     # Static assets
│   └── ...
└── README.md
```

## Installation & Run Instructions

### Prerequisites
*   Node.js installed
*   MongoDB Atlas URI (or local instance)
*   ImageKit Account (for image uploads)

### 1. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory with the following variables:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

Start the backend server:
```bash
npm start
# OR for development with nodemon
npm run server
```

### 2. Frontend Setup
Open a new terminal, navigate to the frontend directory and install dependencies:
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:
```env
VITE_BASE_URL=http://localhost:4000  # Adjust port if backend runs elsewhere
VITE_APP_CURRENCY=LKR
```

Start the frontend development server:
```bash
npm run dev
```

## Environment Variables

### Backend (`backend/.env`)
| Variable | Description |
| :--- | :--- |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for signing JWT tokens |
| `IMAGEKIT_PUBLIC_KEY` | Public key from ImageKit dashboard |
| `IMAGEKIT_PRIVATE_KEY` | Private key from ImageKit dashboard |
| `IMAGEKIT_URL_ENDPOINT` | URL endpoint from ImageKit dashboard |

### Frontend (`frontend/.env`)
| Variable | Description |
| :--- | :--- |
| `VITE_BASE_URL` | Base URL of the backend API |
| `VITE_APP_CURRENCY` | Currency symbol/code to display |

## Author

**RahmanHalik**
