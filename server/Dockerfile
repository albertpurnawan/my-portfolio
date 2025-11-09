FROM node:20-alpine
WORKDIR /app

COPY package.json ./
RUN npm install --only=production --no-audit --no-fund
COPY src ./src

ENV PORT=80
EXPOSE 80
CMD ["npm", "start"]
