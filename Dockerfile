# Use an official lightweight Linux image with build tools
FROM node:18-bullseye

# Install C++, Flex, and Bison inside the container
RUN apt-get update && apt-get install -y \
    g++ \
    flex \
    bison \
    make

# Set working directory inside container
WORKDIR /app

# Copy package files and install backend dependencies
COPY package*.json ./
RUN npm install

# Copy all your source files (parser.y, lexer.l, main.cpp, server.js, etc.)
COPY . .

# Automatically compile your C++ compiler inside the Linux environment!
RUN flex lexer.l
RUN bison -d parser.y
RUN g++ lex.yy.c parser.tab.c main.cpp -o mini_compiler

# Expose the backend port
EXPOSE 3001

# Start the Node.js bridge server
CMD ["node", "server.js"]