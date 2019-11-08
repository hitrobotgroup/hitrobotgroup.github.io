scp -r pkg/* hitrobot@192.168.0.7:/home/hitrobot/;
read;

#sudo sed -i -e "/$(hostname)/ c $ROS_USER_HOSTNAME" /etc/hostname;
#sudo sed -i "2s/$(hostname)/$ROS_USER_HOSTNAME/" /etc/hosts;
