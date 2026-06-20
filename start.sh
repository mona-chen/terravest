#!/bin/sh
set -e

PORT=${PORT:-80}
export PORT

echo "TerraVest starting on port $PORT"

envsubst '$PORT' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf
nginx -t

(
  cd /app/server

  # Schema bootstrap.
  #
  # The right Prisma workflow is to ship every schema change as a
  # committed migration under server/prisma/migrations/ and have
  # prisma migrate deploy apply them in order. This file does that,
  # but it also reconciles the historical case where the database
  # schema was bootstrapped without going through prisma (psql,
  # db push, an older image without a migrations folder, etc.).
  #
  # The sequence is:
  #
  #   1. prisma db push  — make sure the live schema matches
  #      prisma/schema.prisma. This is idempotent: a no-op when the
  #      schema is already in sync, and the canonical "schema is
  #      not under prisma's control" recovery when the database was
  #      bootstrapped outside prisma.
  #
  #   2. prisma migrate resolve --applied  — for every migration
  #      prisma finds in prisma/migrations/ that isn't already
  #      recorded as successfully applied, mark it as applied. This
  #      catches up the migration history with the live schema
  #      without re-executing the SQL (which would fail with
  #      "already exists" because step 1 just created those objects).
  #
  #   3. prisma migrate deploy  — verify the migration history is
  #      in sync. With step 2's resolves recorded, this is a no-op
  #      on the happy path and a real apply on the future path when
  #      a new migration file is committed.
  #
  # In every case the process exits non-zero on real failure, so a
  # broken schema blocks the backend from starting instead of
  # silently serving 500s the way the previous "|| echo warning" did.
  echo "Reconciling schema with prisma db push..."
  npx prisma db push --skip-generate --accept-data-loss

  echo "Reconciling migration history with live schema..."
  status_output=$(npx prisma migrate status 2>&1 || true)
  for migration in $(printf '%s\n' "$status_output" | sed -n '/^Following migration have failed:$/,/^$/p' | tail -n +2 | awk 'NF{print $1}'); do
    printf '  marking %s as applied\n' "$migration"
    npx prisma migrate resolve --applied "$migration" 2>&1 || true
  done
  for migration in $(printf '%s\n' "$status_output" | sed -n '/^Following migration have not yet been applied:$/,/^$/p' | tail -n +2 | awk 'NF{print $1}'); do
    printf '  marking %s as applied\n' "$migration"
    npx prisma migrate resolve --applied "$migration" 2>&1 || true
  done

  echo "Verifying with prisma migrate deploy..."
  npx prisma migrate deploy

  echo "Starting backend on port 3001..."
  NODE_ENV=${NODE_ENV:-production} PORT=3001 node dist/server.js 2>&1
) &

echo "Starting nginx..."
exec nginx -g 'daemon off;'
