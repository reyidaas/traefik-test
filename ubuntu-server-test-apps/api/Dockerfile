FROM oven/bun:latest

WORKDIR /app

COPY package.json ./
COPY bun.lock ./
COPY prisma ./
RUN bun install
RUN bunx prisma generate
RUN ls
RUN ls prisma
RUN ls prisma/generated
COPY . .
EXPOSE 3000

CMD ["bun", "run", "start"]
