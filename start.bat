@echo off
echo Starting MERN Flashcard App...

echo Installing Server Dependencies...
start cmd /k "cd server && npm install && npm start"

echo Installing Client Dependencies...
start cmd /k "cd client && npm install && npm run dev"

echo Done! Windows should open shortly.
