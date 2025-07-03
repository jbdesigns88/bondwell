FROM node:18-alpine
RUN apk add --no-cache nodejs npm 



# Set the working directory
WORKDIR /app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install express --save
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port and start the server
EXPOSE 3000
CMD ["node", "index.js"]
