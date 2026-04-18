#!/bin/sh
set -e

PORT=${PORT:-80}
export PORT

echo "TerraVest starting on port $PORT"

echo "Static files in /usr/share/nginx/html:"
ls -la /usr/share/nginx/html/ || echo "No static files!"

envsubst '$PORT' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

echo "Nginx config:"
cat /etc/nginx/conf.d/default.conf

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
