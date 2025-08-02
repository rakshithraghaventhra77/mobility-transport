# Urban Mobility Bus Agent - Docker Configuration

# Multi-stage build for optimization
FROM node:18-alpine AS base

# Install dependencies for native modules
RUN apk add --no-cache python3 make g++

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create app user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Set working directory
WORKDIR /app

# Copy built application from base stage
COPY --from=base --chown=nodejs:nodejs /app/dist ./dist
COPY --from=base --chown=nodejs:nodejs /app/package*.json ./
COPY --from=base --chown=nodejs:nodejs /app/node_modules ./node_modules

# Copy Python scripts for ML models
COPY --from=base --chown=nodejs:nodejs /app/scripts ./scripts
COPY --from=base --chown=nodejs:nodejs /app/requirements.txt ./requirements.txt

# Install Python dependencies for ML models
RUN apk add --no-cache python3 py3-pip
RUN pip3 install -r requirements.txt

# Create models directory
RUN mkdir -p models && chown nodejs:nodejs models

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8080/api/ping', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the application
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]

# Development stage
FROM base AS development

# Install development dependencies
RUN npm ci

# Expose port
EXPOSE 8080

# Start development server
CMD ["npm", "run", "dev"] 