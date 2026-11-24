
# ==========================================
# Stage 1: Base Image
# ==========================================

FROM node:22-bookworm-slim AS base

WORKDIR /app

# Required for Prisma
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*


# ==========================================
# Stage 2: Build Application
# ==========================================

FROM base AS builder

WORKDIR /app

# Install all dependencies, including TypeScript
COPY package*.json ./
RUN npm ci

# Generate Prisma Client
COPY prisma ./prisma/
RUN npm run prisma:generate

# Compile TypeScript
COPY . .
RUN npm run build


# ==========================================
# Stage 3: Production Dependencies
# ==========================================

FROM base AS prod-deps

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

# Install production dependencies only
RUN npm ci --omit=dev

# Generate Prisma Client for production
RUN npm run prisma:generate


# ==========================================
# Stage 4: Production Runtime
# ==========================================

FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

# Copy production dependencies
COPY --from=prod-deps /app/node_modules ./node_modules

# Copy compiled JavaScript
COPY --from=builder /app/dist ./dist

# Keep Prisma schema and migrations available
COPY --from=prod-deps /app/prisma ./prisma

# Copy package information
COPY package*.json ./

# Create a writable directory for Winston logs
RUN mkdir -p /app/logs \
    && chown node:node /app/logs

# Use non-root user
USER node

EXPOSE 5000

# Start Express
CMD ["node", "dist/index.js"]
