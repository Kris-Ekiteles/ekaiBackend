const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:'uploads', //this will be the folder name in cloudinary
    allowed_formats:['jpg','jpeg','png','webp'], //this will be the allowed file formats
    },
});

const upload = multer({storage});
module.exports = upload;