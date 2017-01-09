if [ -d "/var/www" ]; then
    ROS_USER_APACHE=true;
else
    ROS_USER_APACHE=false;
    sudo apt-get install -y apache2;
    sudo rm -rf /var/www;
    sudo ln -s ~/catkin_ws/www/ /var/www;
fi;
