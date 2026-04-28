#!/bin/bash
cd "$(dirname "$0")/.."
echo "Backing up database..."
source .env
docker-compose exec postgres pg_dump -U $DB_USER $DB_NAME > backup.sql
echo "Backup created at backup.sql"
