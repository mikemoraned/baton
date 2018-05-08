FROM node:9.3.0

# expected context
ENV PORT 3000

# Prepare app directory
RUN mkdir -p /usr/src/app
ADD . /usr/src/app

# Install dependencies
WORKDIR /usr/src/app
RUN npm install

# Run the app
CMD node --experimental-modules index.mjs $PORT
EXPOSE $PORT

