
# bios settings

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

***

# install system

keep pressing "del"(for PA3) or "F10"(for NUC) to select boot disk
![install_start](https://raw.githubusercontent.com/ouiyeah/ubuntu/master/img/install_start.png "install_start")
![select_language](https://raw.githubusercontent.com/ouiyeah/ubuntu/master/img/select_language.png "select_language")
![select_custom](https://raw.githubusercontent.com/ouiyeah/ubuntu/master/img/select_custom.png "select_custom")
![select_type](https://raw.githubusercontent.com/ouiyeah/ubuntu/master/img/select_type.png "select_type")
![select_location](https://raw.githubusercontent.com/ouiyeah/ubuntu/master/img/select_location.png "select_location")
![select_keyboard](https://raw.githubusercontent.com/ouiyeah/ubuntu/master/img/select_keyboard.png "select_keyboard")

note that if ubuntu system was reinstalled this hostname settings page would not be presented
![select_hostname](https://raw.githubusercontent.com/ouiyeah/ubuntu/master/img/select_hostname.png "select_hostname")
![install_wait](https://raw.githubusercontent.com/ouiyeah/ubuntu/master/img/install_wait.png "install_wait")
![install_complete](https://raw.githubusercontent.com/ouiyeah/ubuntu/master/img/install_complete.png "install_complete")

***

# update options

## upgrade old version (the 2.0 version for will2)

0. Download and unzip the files namely 'hitrobotgroup.github.io-master' from the link 'https://github.com/hitrobotgroup/hitrobotgroup.github.io' 
0. Copy the './bin/zip/dbparam-indigo.zip' to the root directory of our own USB Stick
0. Plug this USB Stick in the Navigation IPC(i.e. PA3, YanXiang.etc)
0. Run Index.html in the root directory of the folder 'hitrobotgroup.github.io-master'
0. Set the correct IP address(192.168.0.7 typically). Then press connect.
0. Choose 'U盘威尔2升级包' and then click 'update'
0. If the update information is 'success', the update of the new version is done.
0. Please remeber to reboot the Linux system in order to active the upgrade.

## regular update

0. Download and unzip the files namely 'hitrobotgroup.github.io-master' from the link 'https://github.com/hitrobotgroup/hitrobotgroup.github.io'  
0. Copy the given file 'release-indigo.zip' to './bin/pkg/'. (The name of the folder has to be 'pkg' if missed. Make sure that the folder 'hitrobotgroup.github.io-master' inculding all the files are in the upper PC or Navigation IPC.)
0. Use update.cmd(for windows) or update.sh(for linux) in './bin/' to transmit zip files to ubuntu. If the default name is correct, then return.
0. Run Index.html in the root directory of the folder 'hitrobotgroup.github.io-master'
0. Set the correct IP address(192.168.0.7 typically). Then press connect.
0. Choose '离线本地更新' and then click 'update'
0. If the update information is 'success', the update of the latest version is done.
0. Please remeber to reboot the Linux system in order to active the upgrade.

visit <https://hitrobotgroup.github.io/> for update tutorial

## map transmition

0. In the path './bin/map', click 'map_edit-get.cmd' to get map_edit.pgm. Click 'map_edit-set.cmd' to upload the modified map_edit.pgm

***

# ubuntu-windows 文件共享

![](https://github.com/hitrobotgroup/hitrobotgroup.github.io/raw/master/pics/uwm_1.PNG)  
![](https://github.com/hitrobotgroup/hitrobotgroup.github.io/raw/master/pics/uwm_2.PNG)  
![](https://github.com/hitrobotgroup/hitrobotgroup.github.io/raw/master/pics/uwm_3.PNG)  
![](https://github.com/hitrobotgroup/hitrobotgroup.github.io/raw/master/pics/uwm_4.PNG)  
![](https://github.com/hitrobotgroup/hitrobotgroup.github.io/raw/master/pics/uwm_5.PNG)  
![](https://github.com/hitrobotgroup/hitrobotgroup.github.io/raw/master/pics/uwm_6.PNG)  
![](https://github.com/hitrobotgroup/hitrobotgroup.github.io/raw/master/pics/uwm_7.PNG)  
![](https://github.com/hitrobotgroup/hitrobotgroup.github.io/raw/master/pics/uwm_8.PNG)  
![](https://github.com/hitrobotgroup/hitrobotgroup.github.io/raw/master/pics/uwm_9.PNG)  
![](https://github.com/hitrobotgroup/hitrobotgroup.github.io/raw/master/pics/uwm_10.PNG)  

From: http://www.sijiazhentan.top/news/c2pfZjcxZDY...

# Installation_Will
Work Instruction of Will installation.

威尔机器人路由器，驱动器和工控机的配置流程：

请准备好，RS485转usb串口线， 此网页上的Software_backup程序。

切记，如果有手柄，手柄的上端模式永远保持X，切勿切换到D！

1. The Default of COMPUTER(Linux)'s IP: 192.168.0.7   
    工控机IP默认为192.168.0.7

2.  The Default of Lidar IP  激光传感器默认 IP是： 192.168.0.10 

3.  Router implementatin. 
    路由器安装流程。

Firstly, click advanced setup option:  

首先，水星默认登陆ip是192.168.1.1，我们使用的ip是192.168.0.8，网络参数中可以设置IP地址，如下两张图所示。

![](https://github.com/hitrobotgroup/hitrobotgroup.github.io/raw/master/pics/iwm_4.PNG)

Secondly, Set Router Parameter:  

完成了下面参数的设置后，在确保wifi连上此路由器（在路由器正面上有名字）的前提下，尝试用上位机（win）或远程，ping一下192.168.0.8，手机连接路由器登陆也是一个办法。  

Router IP 192.168.0.8 ; NAME: hitrobot_test(randomly); code: hitrobot; Tryout: cmd -> ping 192.168.0.8

![](https://github.com/hitrobotgroup/hitrobotgroup.github.io/raw/master/pics/iwm_3.PNG)

Thereafter, open the DHCP service to get dynamic IP distribution.  

之后，打开DHCP动态分配接入设备的ip地址，防止ip冲突带来的网络问题。

![](https://github.com/hitrobotgroup/hitrobotgroup.github.io/raw/master/pics/iwm_2.PNG)

Bridging the Internet to get online if it is necessary.

按照下图位置进行桥接，第一次设置会有向导扫描，第二次可以在WDS开关的下方点击向导进行重新扫描，如不需要外网，也是以下位置关闭桥接。

![](https://github.com/hitrobotgroup/hitrobotgroup.github.io/raw/master/pics/iwm_1.PNG)

Note that if internet is not essential, please remeber to turn the WDS off.

Remote desktop. In the WINDOWS: Open mstsc.exe -> 192.168.0.7 -> vnc-any -> 192.168.0.7 (No password).

远程连接设置，主要用于上位机（win）连接工控机，可以通过在菜单栏里输入搜索mstsc.exe，输入192.168.0.7，选 vnc-any，再次输入 192.168.0.7，没有密码，点连接。

Learning via aqmdbls_demo-c0.90.exe. Drivers(CP210x) via RS485 direct connection.

驱动器配置，准备好485转USB线，aqmdbls程序，在本网页的上方Software_backup里有下载。 如果没有驱动，使用win里面的驱动精灵进行下载usbcp2102驱动的下载。

Firstly, check the com order via cmd -> devmgmt.msc and check the order number in the drivers.

首选，在设备管理器里确定对应的com口的数字。

Set the correct com, driver and Baud rate and, then open the port.

设置正确的参数，默认的驱动器波特率是9600， 我们使用的是115200，打开串口。

![](https://github.com/hitrobotgroup/hitrobotgroup.github.io/raw/master/pics/iwm_111.PNG)

In the 系统参数:  

系统参数栏：

Click 读取 to get all data.

点击读取获得数据。

Give 115200 to the baud rate, then chick 配置.  

如果波特率已经是115200，请忽略这条，如果是9600的，请修改为115200，然后配置。

Close the port, then keep other port info the same but change baud rate to 115200 and then open the port again.  

如果修改了波特率，重新设定波特率，重新开启串口。

Click 读取  

点击读取。

Set the values as follows in red in 系统参数 as follows:

在以下三个位置中设定以下参数。

![](https://github.com/hitrobotgroup/hitrobotgroup.github.io/raw/master/pics/iwm_xitongcanshu.PNG)

Note: three places need filling.

In the 电机参数:  

电机参数栏：

Click 读取 to get all data.  

点击读取获得参数。

Choose 速度闭环控制 as follows:  

选择速度闭环控制模式。

![](https://github.com/hitrobotgroup/hitrobotgroup.github.io/raw/master/pics/iwm_dianjicanshu.PNG)

Start to learn in 电机参数:

学习

![](https://github.com/hitrobotgroup/hitrobotgroup.github.io/raw/master/pics/iwm_114.PNG)

配置

Now you can start to try:

在电机控制栏，现在你可以尝试拖动以下pwm，点击操作，如果机器人运行2秒会自动停止，则成功，可以用485转usb线重新连另一个驱动器。

Drag 输出PWM then click 操作, if necessary to stop, please click 停止.

![](https://github.com/hitrobotgroup/hitrobotgroup.github.io/raw/master/pics/iwm_115.PNG)

# SICK_LIDAR_Setup
The process of SICK lidar setting

#PC网络IP地址设置   
控制面板 -> 本地连接 -> 属性 -> Internet 协议版本 4（TCP/IPv4）
   
![](https://github.com/hitrobotgroup/hitrobotgroup.github.io/raw/master/pics/slsm_1.png) 

电脑IP地址设置为：192.168.0.X    
子掩码为：255.255.255.0   
网关：0.0.0.0   

#SICK lidar 连接
第一步是要连接上激光。   
点击ip地址旁的编辑图标，如下图：   

![](https://github.com/hitrobotgroup/hitrobotgroup.github.io/raw/master/pics/slsm_2.png) 
   
点击ip地址为自动。然后点确定，能顺利连接。   

#ip修改
接下来重复上面的连接步骤，在自动之前把ip地址定位192.168.0.X 子掩码为255.255.255.0 如下图：   
  
![](https://github.com/hitrobotgroup/hitrobotgroup.github.io/raw/master/pics/slsm_3.png)    

点击确定， 然后在设备的右上角的三角下拉菜单里，点切换到在线。

然后会自动弹出写入和读取参数的窗口。

写入参数，如下图

![](https://github.com/hitrobotgroup/hitrobotgroup.github.io/raw/master/pics/slsm_4.png)    

#永久保存
这是最重要的一步，点一下显示的激光设备，再点参数 -> 永久保存   


#结束   

