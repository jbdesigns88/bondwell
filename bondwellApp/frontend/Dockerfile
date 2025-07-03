# Step 1: Build the Expo app for web
FROM node:18 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Install expo-cli globally
RUN npm install -g expo-cli

# Copy the rest of the application code into the container
COPY . .
COPY app/.env.prod app/.env
# Build the Expo app for web (outputs to `dist` folder by default)
RUN npx expo export --platform web

# Step 2: Set up a lightweight Node.js server for serving the static files
FROM node:18

# Set the working directory
WORKDIR /app

# Copy the built files and server script
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package*.json ./
COPY server.js /app/server.js

# Install only production dependencies for the server
RUN npm install --only=production

# Expose port 8080 for App Engine
EXPOSE 8080

# Start the Node.js server
CMD ["node", "server.js"]
