# DEPENDENCIES INSTALLER
FROM node:22-alpine3.20 AS deps

WORKDIR /app

COPY package*.json ./

RUN HUSKY=0 npm ci

# APPLICATION BUILDER
FROM node:22-alpine3.20 AS build

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package*.json ./
COPY tsconfig.json ./
COPY src ./src

RUN npm run build 

RUN npm prune --production

# APPLICATION RUNNER
FROM node:22-alpine3.20 AS runner

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY assets ./assets

CMD ["npm", "run", "start"]