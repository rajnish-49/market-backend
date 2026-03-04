import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { config } from '../config/env';

const adapter = new PrismaPg({ connectionString: config.databaseUrl });

const prismaClient = new PrismaClient({ adapter });

export { prismaClient };
export default prismaClient;
