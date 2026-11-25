from node:22-slim as builder

workdir /app

copy package*.json ./
run npm ci
copy . .
RUN npm prune --production

# stage 2
from dhi.io/node:22-alpine3.23
workdir /app
user node
copy --from=builder /app ./


Expose 5050
CMD ["node", "server.js"]