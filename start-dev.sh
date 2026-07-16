#!/usr/bin/env bash
set -e
ROOT="$(cd "$(dirname "$0")" && pwd)"

cleanup() {
  kill "$BACKEND_PID" "$FRONTEND_PID" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

cd "$ROOT/backend"
chmod +x mvnw
./mvnw spring-boot:run &
BACKEND_PID=$!

cd "$ROOT/frontend"
if [ ! -d node_modules ]; then npm install; fi
npm run dev &
FRONTEND_PID=$!

printf '\nCareer Compass is starting:\n'
printf 'Backend:  http://localhost:8081\n'
printf 'Frontend: http://localhost:5173\n\n'
wait
