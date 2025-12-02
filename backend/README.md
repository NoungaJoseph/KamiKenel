# Kami Kennels Backend API

Production-ready backend for Kami Kennels website with MongoDB, Cloudinary image storage, and JWT authentication.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- Cloudinary account

## Quick Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Edit the `.env` file with your credentials:

```env
# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/kamikennels

# JWT Secret (generate a random string)
JWT_SECRET=your-super-secret-key-here

# Cloudinary Credentials (from dashboard)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 3. Get MongoDB Atlas Connection String

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password

### 4. Get Cloudinary Credentials

1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for free account
3. Go to Dashboard
4. Copy Cloud Name, API Key, and API Secret

### 5. Start the Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Register new admin (protected)
- `GET /api/auth/verify` - Verify JWT token

### Puppies
- `GET /api/puppies` - Get all puppies
- `GET /api/puppies/:id` - Get single puppy
- `POST /api/puppies` - Create puppy with images (protected)
- `PUT /api/puppies/:id` - Update puppy (protected)
- `DELETE /api/puppies/:id` - Delete puppy (protected)

### Bookings
- `GET /api/bookings` - Get all bookings (protected)
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking status (protected)
- `DELETE /api/bookings/:id` - Delete booking (protected)

### Health Check
- `GET /api/health` - Server status

## Default Admin Credentials

**Username:** admin  
**Password:** password123

⚠️ **Change these immediately after first login!**

## Testing the API

Use Postman, Thunder Client, or curl:

```bash
# Health check
curl http://localhost:5000/api/health

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password123"}'

# Get all puppies
curl http://localhost:5000/api/puppies
```

## Deployment

### Recommended Platforms

**Backend:**
- Railway (free tier, easy deployment)
- Render (free tier)
- Heroku (paid)

**Frontend:**
- Netlify (free, recommended)
- Vercel (free)
- GitHub Pages (free, static only)

### Environment Variables for Production

Set these in your deployment platform:
- `MONGODB_URI`
- `JWT_SECRET`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `NODE_ENV=production`
- `FRONTEND_URL` (your frontend domain)

## Troubleshooting

**MongoDB Connection Error:**
- Check your connection string
- Ensure IP whitelist includes your IP (or use 0.0.0.0/0 for all)
- Verify database user credentials

**Cloudinary Upload Error:**
- Verify API credentials
- Check file size (max 5MB)
- Ensure file is an image format

**CORS Error:**
- Update `FRONTEND_URL` in .env
- Check CORS configuration in server.js

## Support

For issues, check the implementation plan or contact support.
