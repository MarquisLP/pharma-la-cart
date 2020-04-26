// upload to aws s3 https://github.com/badunk/multer-s3
// https://stackoverflow.com/questions/40494050/uploading-image-to-amazon-s3-using-multer-s3-nodejs
module.exports = function(server) {
  const aws = require('aws-sdk')
  multer = require('multer'),
  multerS3 = require('multer-s3')

  aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: 'us-east-2'
  })
  const s3 = new aws.S3()
  const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.S3_BUCKET,
      key: function (req, file, cb) {
        const dateKey = Date.now()+file.originalname
        req.body.aws_key = dateKey
        cb(null, dateKey); //use Date.now() for unique file keys
      }
    })
  });
  server.post('/api/files/images', upload.array('image',1), async function(req, res, next) {
    console.log(req.body.aws_key)
    res.status(201).json({
      key: req.body.aws_key
    })
  })

  server.get('/api/files/images/:aws_key', upload.array('image',1), async function(req, res, next) {
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: req.params.aws_key
    }
    s3.getObject(params, (err, data) => {
    if (err) console.error(err)
      return res.send(data.Body)
    })
  })
}
