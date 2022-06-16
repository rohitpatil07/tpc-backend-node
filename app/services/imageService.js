import prisma from '../config/prisma.js';

const downloadImage = async (roll_no) => {
  try {
    const photo = await prisma.students.findUnique({
      select: {
        photo: true,
      },
      where: {
        roll_no: roll_no,
      },
    });

    return photo;
  } catch (error) {
    return error;
  }
};

const uploadImage = async (roll_no, b64) => {
  try {
    await prisma.students.update({
      where: { roll_no: roll_no },
      data: {
        photo: b64,
      },
    });
    return 'Photo Uploaded Sucessfully';
  } catch (error) {
    return error;
  }
};

export default { downloadImage, uploadImage };
