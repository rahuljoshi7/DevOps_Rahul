# Stage 1: Build React frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production server
FROM node:18-alpine
WORKDIR /app

COPY server/package*.json ./
RUN npm install --omit=dev

COPY server/ .
COPY --from=frontend-build /app/build ./public

EXPOSE 8000
CMD ["node", "app.js"]
