import pkg from '@prisma/client';
const { PrismaClient } = pkg;

// const prisma = new PrismaClient();

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
