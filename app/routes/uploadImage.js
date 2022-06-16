import { Router } from 'express';
import multer from 'multer';
import path from 'path';
const router = Router();
import fs from 'fs';
import prisma from '../config/prisma.js';

const imageStorage = multer.diskStorage({
  // Destination to store image
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '_' + Date.now() + path.extname(file.originalname),
    );
  },
});

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000, // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg format
      return cb(new Error('Please upload a Image'));
    }
    cb(undefined, true);
  },
});

router.post('/:roll', imageUpload.single('photo'), async (req, res) => {
  console.log(req.params['roll']);
  console.log('image uploaded');
  const encodedImage = imageEncoder(req.file.path);
  res.send(req.file);
});

const imageEncoder = (photo) => {
  var data = fs.readFileSync(photo);
  var imagebase64 = Buffer.from(data).toString('base64');
  console.log(imagebase64);
  return imagebase64;
};

export default router;
