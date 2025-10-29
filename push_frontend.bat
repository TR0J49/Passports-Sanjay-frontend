@echo off
cd /d C:\Users\progr\Desktop\consultancy\frontend

REM Remove old git if exists
if exist .git rmdir /s /q .git

REM Initialize new repo
git init

REM Configure user
git config user.name "Sanjay"
git config user.email "admin@sanjay.com"

REM Stage all files
git add .

REM Commit
git commit -m "Frontend code"

REM Add remote and push
git remote add origin https://github.com/TR0J49/Passports-Sanjay-frontend.git
git branch -M main
git push -u origin main --force

echo.
echo ===================================
echo Frontend pushed to GitHub!
echo ===================================
pause
