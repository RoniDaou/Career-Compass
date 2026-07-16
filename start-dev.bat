@echo off
setlocal
set "ROOT=%~dp0"

start "Career Compass Backend" cmd /k "cd /d ""%ROOT%backend"" && mvnw.cmd spring-boot:run"
start "Career Compass Frontend" cmd /k "cd /d ""%ROOT%frontend"" && if not exist node_modules npm install && npm run dev"

echo Career Compass is starting.
echo Backend:  http://localhost:8081
echo Frontend: http://localhost:5173
endlocal
