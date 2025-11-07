# Frontend Dockerfile
FROM node:20-alpine
WORKDIR /app

COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm install --legacy-peer-deps || yarn install || pnpm install

COPY tsconfig.json .
COPY vite.config.ts .
COPY index.html .
COPY src ./src
COPY tailwind.config.ts ./
COPY postcss.config.cjs ./

EXPOSE 5173
CMD ["npm", "run", "dev"]
