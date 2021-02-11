import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import adminUser from './data/adminUser.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
    // use this to create a fresh dev database,
    // with new products, an admin user, two test users
    // and no existing orders

    try {
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();

        const createdUsers = await User.insertMany(users);
        const admin = createdUsers[0]._id;

        const sampleProducts = products.map(product => {
            return { ...product, user: admin}
        });

        await Product.insertMany(sampleProducts);
        console.log('Data imported');
        process.exit();
    }
    catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
}

const deleteData = async () => {
    // use this to delete all existing data

    try {
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();

        console.log('Data deleted');
        process.exit();
    }
    catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
}

const setupProductionData = async () => {
    // use this to set up a fresh production database
    // with no test users or orders,
    // but just an admin user and new products

    try {
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();

        const createdAdminUser = await User.insertMany(adminUser);
        const admin = createdAdminUser[0]._id;

        const sampleProducts = products.map(product => {
            return { ...product, user: admin}
        });

        await Product.insertMany(sampleProducts);
        console.log('Production data set up');
        process.exit();
    }
    catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
}

const setupProductionUserData = async () => {
    // use if products should left intact, 
    // but users and orders should be deleted and re-created

    try {
        await Order.deleteMany();
        await User.deleteMany();

        const createdAdminUser = await User.insertMany(adminUser);
        const admin = createdAdminUser[0]._id;
        await Product.updateMany({}, { $set: { user: admin } });

        console.log('Production user data set up');
        process.exit();
    }
    catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
}

switch(process.argv[2]) {
    case '-d':
        // deletes all data
        deleteData();
        break;
    case '-i':
        // deletes all data, then re-imports for dev use
        importData();
        break;
    case '-p':
        // deletes all data, then re-creates for production use
        setupProductionData();
        break;
    case '-u':
        // deletes user and order data, then creates an admin user,
        // leaving products alone
        setupProductionUserData();
        break;
    default:
        console.log('No data was changed');
        process.exit();
}
