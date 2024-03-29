FROM node:13

# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
ADD . /usr/src/app/

RUN npm install

# Bundle app source
COPY . .
EXPOSE 3000
CMD [ "node", "server.js" ]