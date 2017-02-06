# Upgrade old version (the 2.0 version and the version before 2.0 version) to 3.0 version.
0. Download the files namely 'hitrobotgroup.github.io-master' from the link 'https://github.com/hitrobotgroup/hitrobotgroup.github.io' 

0. Copy the folder 'hitrobotgroup.github.io-master' inculding all the files to the root directory of our own USB Stick

0. Plug this USB Stick in the Navigation IPC(i.e. PA3, YanXiang.etc)

0. Run Index.html in the root directory of the folder 'hitrobotgroup.github.io-master'

0. Set the correct IP address. Then press connect. If the icon in the connection row turns to be red, contiune the next step.

0. Choose 'U盘威尔2升级包' and then click 'update'

0. If the update information is 'success', the update of the latest version is done.

0. Please remeber to reboot the Linux system in order to active the upgrade.

# Regular Update
0. Download the files namely 'hitrobotgroup.github.io-master' from the link 'https://github.com/hitrobotgroup/hitrobotgroup.github.io'  

0. Open the manipulation interface and check the current version in the '地图向导'.  Compare the current version with the latest version according to https://github.com/hitrobotgroup/release/blob/master/README.md.    

0. If the vision is latest, continue. Otherwise, download the latest one from the https://github.com/hitrobotgroup/release. The update branch is indigo NOT MASTER! Create a new folder in the root directory of the 'hitrobotgroup.github.io-master'. The name of the folder has to be 'pkg'. Make sure that the folder 'hitrobotgroup.github.io-master' inculding all the files are in the upper PC or Navigation IPC.

0. Use update.bat(for windows) or update.sh(for linux) to transmit zip files to ubuntu. If the default name is correct, then return.

0. Run Index.html in the root directory of the folder 'hitrobotgroup.github.io-master'

0. Set the correct IP address. Then press connect. If the icon in the connection row turns to be red, contiune the next step.

0. Choose '离线本地更新' and then click 'update'

0. If the update information is 'success', the update of the latest version is done.

0. run the boot.sh and active the update.

0. It is better to check the RVIZ or check the mapping funtion in the manipulation interface.

# Map transmition
0. In the path \hitrobotgroup.github.io-master\map, click 'map_edit-get.cmd' to get map_edit.pgm. Click 'map_edit-set.cmd' to upload the modified map_edit.pgm

visit <https://hitrobotgroup.github.io/> for update tutorial

# BIOS settings

## PA3

0. Keep pressing delete in order to enter in BIOS.
0. Advanced -> Module Serial port -> Serial port [0-1] -> Change to "Enable"
0. Chipset -> South Bridge -> USB Configuration -> XHCI Mode -> Change to "Enable"
0. Boot -> Power Loss Control ->  Set "Remain off" when applies to will 2 that M4 will send order to enable PA3 power on. Set "turn on" when applies to previous verison will that press the main button to enable PA3 power on.
0. Press F10 (save and quit).

## NUC

0. Keep pressing F2 in order to enter in BIOS.
0. Power -> After Power Failure -> Set "turn on" to enable PA3 power on.
0. Press F10 (save and quit).
