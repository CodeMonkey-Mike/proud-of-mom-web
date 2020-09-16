# Use the base App Engine Docker image, based on Ubuntu 16.0.4.
FROM node:12-slim

# Creating app dir.

WORKDIR /usr/proudofmom/client

# Copy files

COPY package.json ./
COPY babel.config.js ./
COPY next-env.d.ts ./
COPY tsconfig.json ./
COPY yarn.lock ./
# COPY .env.local ./
COPY .env ./
COPY src ./src/

#COPY . .

# Installing Dependencies and build

RUN yarn install --only=production
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
