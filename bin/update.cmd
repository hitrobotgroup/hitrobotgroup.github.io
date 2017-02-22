@echo off
set /p ip_address=ip_address(192.168.0.7):
if "%ip_address%"=="" (set ip_address=192.168.0.7)
set ip_port=343
set /p hostname=hostname(hitrobot):
if "%hostname%"=="" (set hostname=hitrobot)
@echo updating pkg ...
pscp -pw %ip_port% -r ./pkg/* %hostname%@%ip_address%:/home/%hostname%/
pause