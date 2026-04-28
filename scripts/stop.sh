#!/bin/bash
cd "$(dirname "$0")/.."
echo "Stopping Social Media Bot..."
docker-compose down
echo "Done."
