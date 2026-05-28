@echo off
REM Script de limpeza nuclear para resolver corrupção em node_modules.
REM Uso: clean-install.bat (rode dentro de portfolio\frontend)

echo.
echo === [1/4] Removendo node_modules e package-lock.json ===
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del /q package-lock.json

echo.
echo === [2/4] Limpando cache do npm ===
call npm cache clean --force
call npm cache verify

echo.
echo === [3/4] Instalando (download fresco, sem cache) ===
call npm install --prefer-online --no-audit --no-fund

echo.
echo === [4/4] Verificando integridade de pacotes criticos ===
node -e "require('./node_modules/ts-interface-checker'); console.log('OK ts-interface-checker')"
node -e "require('./node_modules/braces'); console.log('OK braces')"
node -e "require('./node_modules/sucrase'); console.log('OK sucrase')"

echo.
echo === Pronto. Agora rode: npm run dev ===
