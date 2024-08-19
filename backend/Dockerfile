FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

RUN npm install -g knex

COPY . .

# Copy the entrypoint script to the container
COPY entrypoint.sh /usr/app/entrypoint.sh

# Make sure the entrypoint script is executable
RUN chmod +x /usr/app/entrypoint.sh

EXPOSE 3003

ENTRYPOINT ["/usr/app/entrypoint.sh"]
