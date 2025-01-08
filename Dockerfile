FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Run Prisma migrations
RUN npx prisma generate

# Expose the application port
EXPOSE 3000

# Default command
CMD ["sh", "-c", "npx prisma migrate deploy && npm run dev"]
