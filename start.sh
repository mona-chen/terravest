#!/bin/sh
set -e

PORT=${PORT:-80}
export PORT

echo "TerraVest starting on port $PORT"

envsubst '$PORT' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf
nginx -t

(
  cd /app/server
  npx prisma migrate deploy 2>&1 || echo "Migration warning (non-fatal)"
  echo "Starting backend on port 3001..."
  NODE_ENV=${NODE_ENV:-production} PORT=3001 node dist/server.js 2>&1
) &

echo "Starting nginx..."
exec nginx -g 'daemon off;'
