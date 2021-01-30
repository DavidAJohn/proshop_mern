import express from 'express';
import path from 'path';
import multer from 'multer';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

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

router.post('/', protect, isAdmin, upload.single('image'), (req, res) => {
    res.send(`/${req.file.path.replace('\\', '/')}`);
});

export default router;
