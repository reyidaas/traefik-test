import Bun from 'bun';
import { PrismaClient } from './prisma/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const server = Bun.serve({
  port: 3000,
  routes: {
    '/items': {
      GET: async () => {
        const items = await prisma.item.findMany();
        return Response.json(items.map(({ content }) => content));
      },
      POST: async (req) => {
        const { item } = (await req.json()) as { item: string };
        const added = await prisma.item.create({ data: { content: item } });

        return Response.json({ item: added });
      }
    }
  },
});

console.log(`Server running on port ${server.port}`);
