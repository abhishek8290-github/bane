const httpStatus = require('http-status');

const handleAsync = require('../utils/catchAsync');
const fs = require('fs');
const path = require('path');

const {Storage} = require('@google-cloud/storage');



const storage = new Storage({
  keyFilename: `/Users/abhisheksingh/elevated-dynamo-2024-3b3fc4a8b0ca.json`,
})
const bucketName = 'userdatabackend'
const bucket = storage.bucket(bucketName)

const upload = handleAsync(async (req, res) => {



  
  if (!Array.isArray(req.files)) req.files = [req.files];

  req.files.map(
    (file) =>{
      filePath = path.join(req.downloadsFolderPath, `${Date.now()}_${file.requested_files.name}`)
      
      fs.writeFileSync(filePath,file.requested_files.data);

      bucket.upload(
        filePath,
        {destination: `someFolderInBucket/image_to_upload.jpeg`},
      )

    });

  return { msg: 'File downloaded and saved successfully' };
});

const download = handleAsync(async (req, res) => {
  return { msg: "Response from file_controller.js" }
});


module.exports = {
  upload, download
}
