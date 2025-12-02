require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const createDefaultAdmin = async () => {
    try {
        await connectDB();

        // Check if admin already exists
        const adminExists = await User.findOne({ username: process.env.ADMIN_USERNAME || 'admin' });

        if (adminExists) {
            console.log('Default admin user already exists');
            process.exit(0);
        }

        // Create default admin
        const admin = await User.create({
            username: process.env.ADMIN_USERNAME || 'admin',
            email: process.env.ADMIN_EMAIL || 'admin@kamikennels.com',
            password: process.env.ADMIN_PASSWORD || 'password123',
            role: 'super-admin'
        });

        console.log('Default admin user created successfully:');
        console.log(`Username: ${admin.username}`);
        console.log(`Email: ${admin.email}`);
        console.log('Password: (check .env file)');
        console.log('\n⚠️  IMPORTANT: Change the default password after first login!');

        process.exit(0);
    } catch (error) {
        console.error('Error creating default admin:', error.message);
        process.exit(1);
    }
};

createDefaultAdmin();
