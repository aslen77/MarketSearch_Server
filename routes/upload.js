const { application } = require("express");
const express = require("express");
const path = require('path')
const router = express.Router();
const fs = require('fs');

const multer = require("multer");

// const storage = multer.diskStorage({
//         destination : (req,file,cb) => {
//             cb(null,'Images')
//         }, 
//         filename : (req,file,cb) => {
//             console.log(file)
//             cb(null,Date.now() + path.extname(file.originalname))
//         }
// })

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      fs.mkdir('./uploads/',(err)=>{
         cb(null, './uploads/');
      });
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    }
  });

const upload = multer({storage : storage})

router.get("/upload/post", (req, res) => {
  //   res.sendFile(path.join(__dirname + '/index.html'));
  res.send("upload");
});


router.post("/upload/post", upload.single("image") ,(req, res) => {
  res.send(req.file);
    res.send("Image uploader");
  });
// router.post("/uplaod", (req, res) => {
//   res.send("Image uploader");
// });

// app.post('/upload', upload.single('file'), function(req, res) {
//   var file = 'uploads' + '/' + req.file.originalname;
//   fs.rename(req.file.path, file, function(err) {
//     if (err) {
//       res.send(500);
//     } else {
//       res.json({
//         message: 'File uploaded successfully',
//         filename: req.originalname
//       });
//     }
//   });
// });

module.exports = router;
