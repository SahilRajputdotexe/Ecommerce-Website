const multer = require('multer');
const express= require("express")
const router= express.Router()

const storage = multer.diskStorage({
    destination:"./upload/images",
    filename:(req,file,cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage});

router.use('/images', express.static('upload/images'));

router.post('/upload', upload.single('image'), (req, res) => {
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`,
        file:req.file});
});



