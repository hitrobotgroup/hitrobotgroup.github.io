@echo off
set /p ip_address=ip_address(192.168.0.7):
if "%ip_address%"=="" (set ip_address=192.168.0.7)
set ip_port=343
set /p hostname=hostname(hitrobot):
if "%hostname%"=="" (set hostname=hitrobot)
@echo getting release-*.zip ...
cd ..
pscp -pw %ip_port% %hostname%@%ip_address%:/home/%hostname%/workspaces/hitrobot/release-*.zip ./pkg/
pause