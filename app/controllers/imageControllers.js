import imageService from '../services/imageService.js';
import fs from 'fs';

const uploadImage = async (req, res) => {
  try {
    const roll_no = String(req.params.roll_no);
    const image = req.files.profile;
    if (image.size <= 256000) {
      const b64 = Buffer.from(image.data).toString('base64');

      const message = await imageService.uploadImage(roll_no, b64);
      res.json({ message: message });
    } else {
      res.json({ message: 'Please upload file size of 256kb or less' });
    }
  } catch (error) {
    res.json(error);
  }
};

const downloadImage = async (req, res) => {
  try {
    const roll_no = String(req.params.roll_no);
    const photo = await imageService.downloadImage(roll_no);

    let buff = Buffer.from(photo['photo'], 'base64');
    fs.writeFileSync('profile.jpg', buff);
    res.download('profile.jpg');
  } catch (error) {
    res.json(error);
  }
};

const offerdownload = async (req, res) => {
  try {
    const roll_no = String(req.params.roll_no);
    const offer_letter = String(req.params.number);
    const photo = await imageService.offerdownload(roll_no, offer_letter);

    let buff = Buffer.from(photo['photo'], 'base64');
    fs.writeFileSync('profile.jpg', buff);
    res.download('profile.jpg');
  } catch (error) {
    res.json(error);
  }
};

const offerupload = async (req, res) => {
  try {
    const roll_no = String(req.params.roll_no);
    const offer_letter = String(req.params.number);
    const image = req.files.profile;
    if (image.size <= 256000) {
      const b64 = Buffer.from(image.data).toString('base64');

      const message = await imageService.offerupload(roll_no, b64, offer_letter);
      res.json({ message: message });
    } else {
      res.json({ message: 'Please upload file size of 256kb or less' });
    }
  } catch (error) {
    res.json(error);
  }
};

export default { uploadImage, downloadImage, offerdownload, offerupload };
