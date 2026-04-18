#!/bin/sh
set -e

PORT=${PORT:-80}
export PORT

if [ -z "$DATABASE_URL" ]; then
  echo "ERROR: DATABASE_URL is not set. Add it in Railway Variables."
  exit 1
fi
if [ -z "$JWT_SECRET" ]; then
  echo "ERROR: JWT_SECRET is not set. Add it in Railway Variables."
  exit 1
fi
if [ -z "$JWT_REFRESH_SECRET" ]; then
  echo "ERROR: JWT_REFRESH_SECRET is not set. Add it in Railway Variables."
  exit 1
fi

echo "TerraVest startup - Port: $PORT"

envsubst '$PORT' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf
nginx -t

echo "Running database migrations..."
cd /app/server
npx prisma migrate deploy || true

echo "Starting backend..."
NODE_ENV=${NODE_ENV:-production} PORT=3001 node dist/server.js &
echo $! > /tmp/backend.pid

echo "Waiting for backend..."
for i in $(seq 1 30); do
    if curl -s -m 2 http://localhost:3001/api/health > /dev/null 2>&1; then
        echo "Backend ready"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "Backend timeout"
    fi
    sleep 1
done

echo "Starting nginx..."
exec nginx -g 'daemon off;'
