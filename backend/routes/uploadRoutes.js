import express from 'express';
import path from 'path';
import multer from 'multer';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import asyncHandler from 'express-async-handler';
import pkg from 'cloudinary';
const cloudinary = pkg;
import dotenv from 'dotenv';

const router = express.Router();

dotenv.config();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
});

function checkFileType(file, cb) {
    const fileTypes = /jpg|jpeg|png/
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
        return cb(null, true);
    } else {
        cb('File must be jpg or png!');
    }
}

const upload = multer({
    storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb)
    }
});

const uploadMethod = () => {
    if ('CLOUD_NAME' in process.env && 'CLOUD_API_KEY' in process.env && 'CLOUD_API_SECRET' in process.env) {
        return 'cloudinary';
    }
    else {
        return 'local';
    }
}

router.post('/', protect, isAdmin, upload.single('image'), asyncHandler (async (req, res) => {
    switch (uploadMethod()) {
        case 'cloudinary':
            const image = await cloudinary.uploader.upload(`${req.file.path}`);
            res.send(image.secure_url);
            break;
        case 'local':
            res.send(`/${req.file.path.replace('\\', '/')}`);
            break;
        default:
            res.send(`/${req.file.path.replace('\\', '/')}`);
    }
}));

export default router;
