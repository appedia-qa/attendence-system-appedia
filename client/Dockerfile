# pull official base image
FROM node:14.3.0-alpine

RUN mkdir -p /home/react/app/node_modules && chown -R node:node /home/react/app

# set working directory
WORKDIR /home/react/app

# add `/app/node_modules/.bin` to $PATH
COPY package.json ./
COPY yarn.lock ./

# install app dependencies
USER node
# RUN yarn install
RUN yarn install --frozen-lockfile --production && yarn cache clean
# add app
COPY --chown=node:node . .
EXPOSE 3000
CMD [ "yarn", "start" ]
