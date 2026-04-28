#!/bin/bash
cd "$(dirname "$0")/.."
echo "Exporting project..."
# Creates a zip of the project excluding n8n-data (to keep it clean) and database (use backup.sql instead)
zip -r social-media-bot-export.zip . -x "n8n-data/*" "database/*" "node_modules/*" ".git/*"
echo "Export created at social-media-bot-export.zip"
