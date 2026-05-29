import pkg from '@prisma/client';
const { PrismaClient } = pkg;

// Instância única do Prisma Client reaproveitada por toda a aplicação.
const prisma = new PrismaClient();

export default prisma;
