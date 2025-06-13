const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

require('dotenv').config();
const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Configure Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route for handling file upload
router.post('/', upload.single('file'), async (req, res) => {
   try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // function to handle file upload to Cloudinary
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(( error, result) => {
          if (result) {
            resolve(result); 
          } else {
            reject(error); 
          }
        }); 
        // Use streamifier to convert the file buffer to a stream
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });      
    };
    // Call the streamUpload function
    const result = await streamUpload(req.file.buffer);

    // Respond with the Cloudinary image
    res.json({image: result.secure_url});
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;
