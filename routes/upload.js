const express = require ('express');
const upload = require('../config/multer')
const router = express.Router();

router.post('/', upload.single('image'), async (req, res)=>{
    try{
        res.status(200).json({
            message:'upload successful',
            imageUrl:req.file.path,
            public_id: req.file.filename,
        });
    }catch (error){
        console.error('upload error:',error);
        res.status(500).json({message:'upload failed', error})
    }
});

module.exports = router;