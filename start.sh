#!/bin/sh
set -e

PORT=${PORT:-80}
export PORT

echo "TerraVest starting on port $PORT"

envsubst '$PORT' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf
nginx -t

(
  while true; do
    echo "Starting backend..."
    cd /app/server
    npx prisma migrate deploy || true
    NODE_ENV=${NODE_ENV:-production} PORT=3001 node dist/server.js || true
    echo "Backend exited, restarting in 5s..."
    sleep 5
  done
) &

echo "Starting nginx..."
exec nginx -g 'daemon off;'
