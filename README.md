# Book Store MERN Stack Application

## Project Overview
A full-stack e-commerce book store application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack with Redux for state management. The application features user authentication, book browsing, shopping cart functionality, order management, and an admin dashboard.

<img src="frontend\src\assets\Home.png" alt="Website Preview" width="500">

## Data Flow

### Authentication Flow
1. User submits login/register credentials
2. Backend validates and creates/verifies user
3. JWT token generated and stored in Redux auth slice
4. Protected routes check token validity

### Book Purchase Flow
1. User browses books (handled by products slice)
2. Adds items to cart (managed by cart slice)
3. Proceeds to checkout (checkout slice)
4. Order creation and confirmation (order slice)

### Admin Operations Flow
1. Admin authentication with special privileges
2. Product management through adminProducts slice
3. Order management via adminOrders slice
4. User management capabilities

## API Endpoints

### User Routes
- POST /api/users/register - User registration
- POST /api/users/login - User authentication
- GET /api/users/profile - Get user profile

### Product Routes
- GET /api/products - Get all products
- GET /api/products/:id - Get single product
- POST /api/products (Admin) - Add new product
- PUT /api/products/:id (Admin) - Update product

### Cart & Order Routes
- GET /api/cart - Get user's cart
- POST /api/cart - Add to cart
- GET /api/orders - Get user's orders
- POST /api/orders - Create new order

### Admin Routes
- GET /api/admin/orders - Get all orders
- PUT /api/admin/orders/:id - Update order status
- GET /api/admin/products - Manage products

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed and running
- npm or yarn package manager

### Backend Setup
1. Clone the repository and navigate to backend directory:
   ```bash
   git clone <repository-url>
   cd book-mern/backend
   ```

2. Install dependencies:
   ```bash
   npm install express mongoose dotenv bcryptjs jsonwebtoken cors
   npm install nodemon --save-dev
   ```

3. Create .env file:
   ```bash
   echo "MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000" > .env
   ```

4. Seed the database (optional):
   ```bash
   npm run seed
   ```

5. Start the development server:
   ```bash
   # Development mode with nodemon
   npm run dev

   # Production mode
   npm start
   ```

### Frontend Setup
1. Open a new terminal and navigate to frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   # Core dependencies
   npm install react react-dom @reduxjs/toolkit react-redux axios
   
   # UI and styling
   npm install @mui/material @emotion/react @emotion/styled
   npm install tailwindcss postcss autoprefixer
   
   # Routing and forms
   npm install react-router-dom formik yup
   
   # Development dependencies
   npm install -D vite @vitejs/plugin-react
   ```

3. Create .env file:
   ```bash
   echo "VITE_API_URL=http://localhost:5000" > .env
   ```

4. Initialize Tailwind CSS:
   ```bash
   npx tailwindcss init -p
   ```

5. Start the development server:
   ```bash
   # Development mode
   npm run dev

   # Build for production
   npm run build
   
   # Preview production build
   npm run preview
   ```

## Deployment

The application is configured for deployment on Vercel:

### Backend Deployment
- Uses vercel.json configuration for Node.js deployment
- Handles API routes through serverless functions

### Frontend Deployment
- Configured with vercel.json for static site deployment
- Uses build output from Vite

## Security Features
- JWT-based authentication
- Password hashing
- Protected API routes
- Input validation
- Error handling middleware

## Database Models

### User Model
- Authentication details
- Profile information
- Order history references

### Product Model
- Book details
- Pricing information
- Stock management

### Order Model
- Order details
- Payment information
- Shipping status

### Cart Model
- Selected items
- Quantity information
- Price calculations

## Contributing
Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.
