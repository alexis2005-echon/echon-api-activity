require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/userModel');

const createFirstAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;
        const name = process.env.ADMIN_NAME || 'System Admin';

        if (!email || !password) {
            console.error('Missing ADMIN_EMAIL or ADMIN_PASSWORD in .env');
            process.exit(1);
        }

        const existingAdmin = await User.findOne({ role: 'admin' });
        if (existingAdmin) {
            console.log('Admin already exists. Aborting bootstrap.');
            process.exit(0);
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            console.error('A user with ADMIN_EMAIL already exists.');
            process.exit(1);
        }

        await User.create({
            name,
            email,
            password,
            role: 'admin',
        });

        console.log('First admin created successfully.');
        process.exit(0);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

createFirstAdmin();
