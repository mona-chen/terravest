import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

declare global {
  // eslint-disable-next-line no-unused-vars
  var prisma: PrismaClient | undefined;
}

if (!globalThis.prisma) {
  prisma = new PrismaClient();
  globalThis.prisma = prisma;
} else {
  prisma = globalThis.prisma;
}

export default prisma;
