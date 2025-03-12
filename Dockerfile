 # Use the official Node.js image as the base image
FROM node:20-alpine

#Set the working directory inside the container
WORKDIR /app

#Copy package.json and package-lock.json to the container
COPY package*.json ./

#Install dependencies
RUN npm install

#Copy the rest of the application code into the container
COPY . .

#Expose port 3000 (default Next.js development port)
EXPOSE 3000

#Start the Next.js development server with experimental HTTPS
CMD ["npm", "run", "dev:https"]