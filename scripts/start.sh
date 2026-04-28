#!/bin/bash
cd "$(dirname "$0")/.."
echo "Starting Social Media Bot (n8n + Postgres)..."
docker-compose up -d
echo "Done. Use './scripts/logs.sh' to view logs."
