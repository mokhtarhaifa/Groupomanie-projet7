const multer = require('multer');
const path = require('path');
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
};

//configuration de multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const fileName = file.originalname.split(' ').join('_');
    const fileWithoutExtension = path.parse(fileName).name; 
    const date = new Date(Date.now() * 1000);
    const extension = MIME_TYPES[file.mimetype];
    callback(null, fileWithoutExtension +'_'+ formatDate(Date.now()) + '.' + extension);
  }
});

const formatDate = (date) => {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

module.exports = multer({storage: storage}).single('image');
