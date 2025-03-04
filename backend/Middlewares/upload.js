// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // Ensure the 'uploads/images/' directory exists
// const uploadDir = path.join(__dirname, 'tmp/uploads');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
//   console.log(`Directory ${uploadDir} created.`);
// }

// // Multer configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'tmp/uploads');
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueName);
//   },
// });



// // Multer setup with storage=
// const upload = multer({ storage: storage })

// module.exports = upload;
