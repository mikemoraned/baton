FROM node:9.3.0

# expected context
ENV PORT 3000

# Prepare app directory
RUN mkdir -p /usr/src/app
ADD . /usr/src/app

# Install dependencies
WORKDIR /usr/src/app
RUN npm install && npm rebuild node-sass --force
RUN cd server && npm install

# Run tests
RUN CI=true npm test

# Build the app
RUN npm run build

# Run the app
CMD cd server && node --experimental-modules index.mjs $PORT
EXPOSE $PORT

