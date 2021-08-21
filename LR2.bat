@echo off
setlocal enabledelayedexpansion
set runas=
for /f tokens^=4^ delims^=^" %%i in ('findstr /r /c:"Run in Japanese. Guid" .\Locale.Emulator.2.4.1.0\LEConfig.xml') do set runas=%%i

.\Locale.Emulator.2.4.1.0\LEProc.exe -runas !runas! LR2.exe