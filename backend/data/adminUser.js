import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();
const adminPassword = process.env.ADMIN_PASSWORD || 'admin123456';

const adminUser = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync(adminPassword, 10),
        isAdmin: true
    }
]

export default adminUser;
