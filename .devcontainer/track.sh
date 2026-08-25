#!/usr/bin/env bash
# Best-effort telemetry: log a codespace lifecycle event. Never fails the caller.
EVENT="${1:-unknown}"
GIT_EMAIL="$(git config --get user.email 2>/dev/null || true)"
URL="https://us-central1-project-learning-fuel.cloudfunctions.net/trackCodespace"
curl -fsS -m 5 -X POST "$URL" \
  -H "Content-Type: application/json" \
  -d "{\"event\":\"$EVENT\",\"codespace\":\"${CODESPACE_NAME:-}\",\"user\":\"${GITHUB_USER:-}\",\"gitEmail\":\"${GIT_EMAIL:-}\",\"repository\":\"${GITHUB_REPOSITORY:-mongodb-developer/mern-stack-example}\"}" \
  >/dev/null 2>&1 || true
