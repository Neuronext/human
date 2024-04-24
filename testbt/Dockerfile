FROM node:14.15.5-buster

# install bluez related packages
RUN apt-get update && apt-get install -y \
    bluez \
    dbus

# setup and build application
WORKDIR /usr/src/app
COPY ./package.json ./tsconfig.json ./
COPY ./source ./source

# Install all dependencies, then build
RUN npm install && npm run build

# setup startup script
COPY entrypoint.sh .
RUN [ "CAT", "./entrypoint.sh" ]
CMD ["./entrypoint.sh"]
