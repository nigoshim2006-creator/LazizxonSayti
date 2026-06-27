@echo off
echo =====================================
echo   sp.market — Ishga tushirish
echo =====================================
echo.

cd /d "%~dp0sp-market"

echo [1/2] Paketlarni o'rnatish...
call npm install
if %errorlevel% neq 0 (
    echo.
    echo XATOLIK! npm install bajarilmadi.
    echo Iltimos, Node.js ni o'rnatganingizni tekshiring: https://nodejs.org
    pause
    exit /b 1
)

echo.
echo [2/2] Dev serverni ishga tushirish...
echo Brauzeringizda http://localhost:3000 ochiladi
echo.
echo Serverni to'xtatish uchun Ctrl+C bosing
echo =====================================
echo.

start http://localhost:3000
call npm run dev

pause
