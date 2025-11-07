# Backend Dockerfile
# Use Debian-based image to avoid Prisma OpenSSL issues on Alpine/ARM
FROM node:20-bookworm-slim

WORKDIR /app

COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN apt-get update && apt-get install -y openssl \
	&& rm -rf /var/lib/apt/lists/* \
	&& npm install --legacy-peer-deps || yarn install || pnpm install

COPY tsconfig.json .
COPY prisma ./prisma
COPY src ./src

RUN npx prisma generate

EXPOSE 5000

CMD ["npm", "run", "dev"]
