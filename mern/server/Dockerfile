from node:22-slim as builder

copy package*.json ./
run npm ci
copy . .

Expose 5050
CMD ["node", "server.js"]