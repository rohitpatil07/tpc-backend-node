import pkg from '@prisma/client';
const { PrismaClient } = pkg;

let connectDB = () => {
  try {
    const prisma = new PrismaClient();
    return prisma;
  } catch (error) {
    return error;
  }
};

const prisma = connectDB();

export default prisma;
