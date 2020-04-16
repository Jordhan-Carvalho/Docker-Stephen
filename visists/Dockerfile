
# Specify base img
FROM node:alpine

# Install dependencies
WORKDIR /home/node/vwebserver
# Copy this folder to the folder in the container (relative to work dir)
COPY ./package.json ./
RUN npm install
COPY ./ ./

# Default command
CMD ["npm", "start"]