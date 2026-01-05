# Build stage for React Client
FROM node:20-alpine AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Production stage for Express Server
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
# Copy built client assets from the build stage
COPY --from=client-build /app/client/build ./client/build

ENV PORT=8080
EXPOSE 8080
CMD [ "node", "server.js" ]
