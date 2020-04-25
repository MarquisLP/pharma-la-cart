module.exports = function(server) {
    const Prescription = require('../../database/models/prescription')
    const multer = require("multer");
    var storage = multer.memoryStorage();
    var upload = multer({ storage: storage })
    var AWS = require("aws-sdk");

    server.post('/api/files/', upload.single("file"), async function(req, res, next) {
      const file = req.file;
      console.log(file);
      //const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK;

      let s3bucket = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
      });

      //Where you want to store your file

      var params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read"
      };

      s3bucket.upload(params, function(err, data) {
        if (err) {
          return res.status(500).json(err);
        } else {
          console.log(data);
          // url is s3FileURL + file.originalname
          
        }
      });
      
    })
}