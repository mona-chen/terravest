#!/bin/bash
set -e

BASE_URL="http://127.0.0.1:3002"
EMAIL="testuser$(date +%s)@example.com"
PASSWORD="TestPass123!"
NAME="Test User"

echo "======================================"
echo "TerraVest API Test Script"
echo "======================================"
echo ""
echo "Test User: $EMAIL"
echo ""

node dist/server.js &
SERVER_PID=$!
sleep 3

echo "[0] Health Check"
curl -s "$BASE_URL/api/health" | python3 -m json.tool 2>/dev/null || echo "Health check failed"
echo ""

echo "[1] POST /api/auth/register"
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\",\"name\":\"$NAME\"}")
echo "$REGISTER_RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$REGISTER_RESPONSE"
echo ""

echo "[2] POST /api/auth/login"
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")
echo "$LOGIN_RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$LOGIN_RESPONSE"
ACCESS_TOKEN=$(echo "$LOGIN_RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin).get('data',{}).get('accessToken',''))" 2>/dev/null || echo "")
REFRESH_TOKEN=$(echo "$LOGIN_RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin).get('data',{}).get('refreshToken',''))" 2>/dev/null || echo "")
echo ""

if [ -z "$ACCESS_TOKEN" ]; then
  echo "ERROR: Failed to get access token. Aborting."
  kill $SERVER_PID 2>/dev/null || true
  exit 1
fi

echo "Access Token obtained"
echo ""

echo "[3] GET /api/auth/me"
curl -s "$BASE_URL/api/auth/me" -H "Authorization: Bearer $ACCESS_TOKEN" | python3 -m json.tool 2>/dev/null || echo "Failed"
echo ""

echo "[4] POST /api/auth/refresh"
curl -s -X POST "$BASE_URL/api/auth/refresh" \
  -H "Content-Type: application/json" \
  -d "{\"refreshToken\":\"$REFRESH_TOKEN\"}" | python3 -m json.tool 2>/dev/null || echo "Failed"
echo ""

echo "[5] GET /api/portal/dashboard"
curl -s "$BASE_URL/api/portal/dashboard" -H "Authorization: Bearer $ACCESS_TOKEN" | python3 -m json.tool 2>/dev/null || echo "Failed"
echo ""

echo "[6] GET /api/portal/profile"
curl -s "$BASE_URL/api/portal/profile" -H "Authorization: Bearer $ACCESS_TOKEN" | python3 -m json.tool 2>/dev/null || echo "Failed"
echo ""

echo "[7] PATCH /api/portal/profile"
curl -s -X PATCH "$BASE_URL/api/portal/profile" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Test User","phone":"+237 123 456 789"}' | python3 -m json.tool 2>/dev/null || echo "Failed"
echo ""

echo "[8] GET /api/portal/portfolio"
curl -s "$BASE_URL/api/portal/portfolio" -H "Authorization: Bearer $ACCESS_TOKEN" | python3 -m json.tool 2>/dev/null || echo "Failed"
echo ""

echo "[9] GET /api/portal/companies"
curl -s "$BASE_URL/api/portal/companies" -H "Authorization: Bearer $ACCESS_TOKEN" | python3 -m json.tool 2>/dev/null || echo "Failed"
echo ""

echo "[10] GET /api/portal/documents"
curl -s "$BASE_URL/api/portal/documents" -H "Authorization: Bearer $ACCESS_TOKEN" | python3 -m json.tool 2>/dev/null || echo "Failed"
echo ""

echo "[11] GET /api/portal/notifications"
curl -s "$BASE_URL/api/portal/notifications" -H "Authorization: Bearer $ACCESS_TOKEN" | python3 -m json.tool 2>/dev/null || echo "Failed"
echo ""

echo "[12] GET /api/portal/messages"
curl -s "$BASE_URL/api/portal/messages" -H "Authorization: Bearer $ACCESS_TOKEN" | python3 -m json.tool 2>/dev/null || echo "Failed"
echo ""

echo "[13] POST /api/portal/messages"
curl -s -X POST "$BASE_URL/api/portal/messages" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"subject":"Test Message","content":"This is a test message from curl"}' | python3 -m json.tool 2>/dev/null || echo "Failed"
echo ""

echo "[14] Admin - GET /api/admin/dashboard"
curl -s "$BASE_URL/api/admin/dashboard" -H "Authorization: Bearer $ACCESS_TOKEN" | python3 -m json.tool 2>/dev/null || echo "Failed"
echo ""

echo "[15] Admin - GET /api/admin/users"
curl -s "$BASE_URL/api/admin/users" -H "Authorization: Bearer $ACCESS_TOKEN" | python3 -m json.tool 2>/dev/null || echo "Failed"
echo ""

echo "[16] Admin - GET /api/admin/companies"
curl -s "$BASE_URL/api/admin/companies" -H "Authorization: Bearer $ACCESS_TOKEN" | python3 -m json.tool 2>/dev/null || echo "Failed"
echo ""

echo "[17] POST /api/auth/logout"
curl -s -X POST "$BASE_URL/api/auth/logout" \
  -H "Content-Type: application/json" \
  -d "{\"refreshToken\":\"$REFRESH_TOKEN\"}" | python3 -m json.tool 2>/dev/null || echo "Failed"
echo ""

kill $SERVER_PID 2>/dev/null || true
echo "======================================"
echo "API Testing Complete"
echo "======================================"
