#!/bin/bash
# Development server startup script for The Gaslight on Main website

echo "Starting The Gaslight on Main development server..."
echo "This will start the server on http://localhost:3000"

# Navigate to project directory
cd "$(dirname "$0")"

# Start the Next.js development server
./node_modules/.bin/next dev --port 3000
