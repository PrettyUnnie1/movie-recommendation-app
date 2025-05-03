#!/bin/bash

# -----------------------------------------
# Run both Flask backend and React frontend
# -----------------------------------------

# Step 1: Run backend
echo "Starting Flask backend..."
cd src-backend
export FLASK_APP=app.py
export FLASK_ENV=development
flask run --no-debugger --no-reload &
BACKEND_PID=$! 
cd ..

# Step 2: Run frontend
echo "Starting React frontend..."
cd src-frontend
npm start &
FRONTEND_PID=$!
cd ..

# Step 3: Wait for processes
echo "Both servers are running. Press [CTRL+C] to stop."
wait $BACKEND_PID $FRONTEND_PID
