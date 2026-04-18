#!/bin/sh
set -e

PORT=${PORT:-80}
export PORT

if [ -z "$DATABASE_URL" ]; then
  echo "WARN: DATABASE_URL is not set. Backend will fail."
fi
if [ -z "$JWT_SECRET" ]; then
  echo "WARN: JWT_SECRET is not set. Backend will fail."
fi
if [ -z "$JWT_REFRESH_SECRET" ]; then
  echo "WARN: JWT_REFRESH_SECRET is not set. Backend will fail."
fi

echo "TerraVest startup - Port: $PORT"

envsubst '$PORT' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf
nginx -t

start_backend() {
  echo "Running database migrations..."
  cd /app/server
  npx prisma migrate deploy || true

  echo "Starting backend on port 3001..."
  NODE_ENV=${NODE_ENV:-production} PORT=3001 node dist/server.js &
}

start_backend &

echo "Starting nginx..."
exec nginx -g 'daemon off;'
