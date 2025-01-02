# Step 1: Use a Node.js base image
FROM node:18-alpine as builder

# Step 2: Set working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --only=production

# Step 4: Install NestJS CLI globally
RUN npm install -g @nestjs/cli

# Step 5: Copy the rest of the application and build it
COPY . .
RUN npm run build

# Step 6: Create a lightweight runtime image
FROM node:18-alpine

# Step 7: Set working directory
WORKDIR /app

# Step 8: Copy production dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Step 9: Expose the application port
EXPOSE 3000

# Step 10: Command to run the application
CMD ["node", "dist/src/main"]

