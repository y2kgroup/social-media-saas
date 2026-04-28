#!/bin/bash

# Configuration
SERVER="root@76.13.98.118"
REMOTE_DIR="/docker/social-saas"
LOCAL_DIR="/Users/yosinuri/Desktop/Antigravity_Projects/Social Media Bot Antigravity/"

echo "🚀 Starting Deployment to Cloud Server ($SERVER)..."

# Ensure remote directory exists
ssh -o BatchMode=yes -o ConnectTimeout=5 $SERVER "mkdir -p $REMOTE_DIR"

# Rsync files to the server (excluding node_modules and .next to save time)
echo "📦 Syncing files..."
rsync -avz --delete --exclude 'node_modules' --exclude '.next' --exclude '.git' -e "ssh -o BatchMode=yes -o ConnectTimeout=5" "$LOCAL_DIR" "$SERVER:$REMOTE_DIR"

# Rebuild and restart the Docker container on the remote server
echo "🐳 Building and restarting Docker container..."
ssh -o BatchMode=yes -o ConnectTimeout=5 $SERVER "cd $REMOTE_DIR && docker compose up -d --build"

echo "✅ Deployment successful! Your app should be live on port 3000 of the server."
