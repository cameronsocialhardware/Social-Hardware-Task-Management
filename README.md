# Task Management Application

A Next.js application with MongoDB integration, authentication, and role-based access control.

## Features

- User authentication with NextAuth.js
- MongoDB database integration
- User roles: Admin and User
- Secure login page
- Protected dashboard page
- Modern UI with Tailwind CSS

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret_key
   NEXTAUTH_URL=http://localhost:3000
   ```

   To generate a NEXTAUTH_SECRET, you can run:
   ```bash
   openssl rand -base64 32
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Create a user:**
   You can create a user by making a POST request to `/api/auth/register` with:
   ```json
   {
     "email": "user@example.com",
     "password": "password123",
     "name": "User Name",
     "role": "user" // or "admin"
   }
   ```

   Or use a tool like Postman or curl:
   ```bash
   curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@example.com","password":"admin123","name":"Admin User","role":"admin"}'
   ```

## Project Structure

- `/app` - Next.js app directory with pages and API routes
- `/app/login` - Login page
- `/app/dashboard` - Protected dashboard page
- `/app/api/auth` - Authentication API routes
- `/lib/mongodb.ts` - MongoDB connection utility
- `/models/User.ts` - User model with roles

## User Roles

- **Admin**: Full access to all features
- **User**: Standard user access

## Technologies Used

- Next.js 14 (App Router)
- TypeScript
- MongoDB with Mongoose
- NextAuth.js for authentication
- Tailwind CSS for styling
- bcryptjs for password hashing

# The-Squirrel-Task-Management
