const express = require('express');
const router = express.Router();
const multer = require('multer');
const { upload, download } = require('../controllers/file_controller');
const file_destination = '/Users/abhisheksingh/work_new/bane/uploads/';
const path = require('path');
const fs = require('fs');

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, file_destination),
    filename: (req, file, cb) => cb(null, file.originalname)
});

const uploadMiddleware = multer({ storage: storage });

// Route for file upload

const createFolderIfNotPresent = (folderPath) => !fs.existsSync(folderPath) && fs.mkdirSync(folderPath)

const setFileName = (req, res, next)=> {
    req.downloadsFolderPath =  path.join(__dirname, '..', 'downloads');
    createFolderIfNotPresent(req.downloadsFolderPath);
    next()
    
}

router.post('/upload' , [setFileName, upload]);

router.post('/upload', 
    uploadMiddleware.fields(
        [
        { name: 'name', maxCount: 1 },
        { name: 'requested_files', maxCount: 10 }
    ]),
    (req, res) => upload(req, res));





router.post('/download', (req, res) => download(req, res));

module.exports = router;
