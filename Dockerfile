# Use Node.js official image as a base
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies first
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the entire application code into the container
COPY . .

# Expose the port your app will run on
EXPOSE 3000 3306

# Set the command to run the application
CMD ["node", "src/index.js"]
