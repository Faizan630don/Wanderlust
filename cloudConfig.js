const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Check if environment variables are set
if (!process.env.CLOUD_NAME || !process.env.CLOUD_API_KEY || !process.env.CLOUD_API_SECRET) {
    console.error('❌ Cloudinary environment variables are missing!');
    console.error('Please set: CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET');
    console.error('Using local storage as fallback...');
    
    // Fallback to local storage
    const multer = require('multer');
    const path = require('path');
    
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname))
        }
    });
    
    module.exports = {
        cloudinary: null,
        storage,
    };
} else {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET
    });
    
    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: 'wanderlust_DEV',
            allowedFormats: ['jpeg', 'png', 'jpg'],
        },
    });
    
    module.exports = {
        cloudinary,
        storage,
    };
}