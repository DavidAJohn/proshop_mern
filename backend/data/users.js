import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();
const adminPassword = process.env.ADMIN_PASSWORD || 'admin123456';

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync(adminPassword, 10),
        isAdmin: true
    },
    {
        name: 'David Jones',
        email: 'david@example.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name: 'Mark Williams',
        email: 'mark@example.com',
        password: bcrypt.hashSync('123456', 10)
    }
]

export default users;
