FROM node:24-alpine
RUN apk add --no-cache openssl 



# Set the working directory
WORKDIR /app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN yarn install

# Copy the rest of the application code
COPY prisma ./prisma
COPY . .

RUN npx prisma generate

# Expose the port and start the server
EXPOSE 3000
CMD ["yarn", "start"]
