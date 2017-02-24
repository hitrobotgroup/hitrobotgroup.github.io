var UpdateEvent = UpdateEvent || {
    REVISION: '0.0.6.0-2016-12.27',
    Type: {
        onlineAuto: "在线自动更新",
        offlineAuto: "离线本地更新",
        others: {
        	dbparam: "dbparam",
        	openssh: "openssh",
        	apache: "apache",
        }
    },
    UpdateString: {
        onlineAuto: "update",
        offlineAuto: 'if [ -f ~/release-$ROS_DISTRO.zip ]; then unzip ~/release-$ROS_DISTRO.zip; release-$ROS_DISTRO/install/share/bringup/shell/update-offline.sh; rm -r release-$ROS_DISTRO; rm ~/release-$ROS_DISTRO.zip; rostopic pub -1 /shell_feedback std_msgs/String "update:success"; else  rostopic pub -1 /shell_feedback std_msgs/String "update:failure"; fi;',
        others: {
            dbparam: 'if [ -f /media/`whoami`/*/dbparam-$ROS_DISTRO.zip ]; then unzip /media/`whoami`/*/dbparam-$ROS_DISTRO.zip; cd dbparam-$ROS_DISTRO; ./install.sh; cd ..; rm -r dbparam-$ROS_DISTRO; rm ~/dbparam-$ROS_DISTRO.zip; rostopic pub -1 /shell_feedback std_msgs/String "update:success"; else  rostopic pub -1 /shell_feedback std_msgs/String "update:failure"; fi;',
        	openssh: 'if [ -f /media/`whoami`/*/openssh-$ROS_DISTRO.zip ]; then unzip /media/`whoami`/*/openssh-$ROS_DISTRO.zip; cd openssh-$ROS_DISTRO; ./install.sh; cd ..; rm -r openssh-$ROS_DISTRO; rostopic pub -1 /shell_feedback std_msgs/String "update:success"; else  rostopic pub -1 /shell_feedback std_msgs/String "update:failure"; fi;',
        	apache: 'if [ -f ~/apache-$ROS_DISTRO.zip ]; then unzip ~/apache-$ROS_DISTRO.zip; cd apache-$ROS_DISTRO; ./install.sh; cd ..; rm -r apache-$ROS_DISTRO; rm ~/apache-$ROS_DISTRO.zip; rostopic pub -1 /shell_feedback std_msgs/String "update:success"; else  rostopic pub -1 /shell_feedback std_msgs/String "update:failure"; fi;',
        }
    },
    UpdateType: "在线自动更新",
    UpdateStart: false,
    ConnectStart:false
}



function radio_change(id) {
    UpdateEvent.UpdateType = id;
    if (id == "在线自动更新") {
        sweetAlert(id, "请确认导航板可以连接网络", "warning");
    }
    else if (id == "离线本地更新") {
        sweetAlert(id, "请先把dbparam-***.zip文件放置在pkg文件夹中，然后运行update脚本", "warning");
    }
    else if (id == "U盘威尔2升级包") {
        sweetAlert(id, "请先把dbparam-***.zip文件放置在U盘根目录下插入导航板", "warning");
        UpdateEvent.UpdateType = "dbparam";
    }
    else if (id == "U盘安装文件传输包") {
        sweetAlert(id, "请先把openssh-***.zip文件放置在U盘根目录下插入导航板", "warning");
        UpdateEvent.UpdateType = "openssh";
    }
}


$(function () {
    var option = {
        url: "",
        onopen: function () {
            UpdateEvent.ConnectStart = false;
            console.log("success");
            $("#connect").buttonMarkup({ icon: "hrg-start" });
            $(".networkstatus").buttonMarkup({ icon: "hrg-networksuccess" });
            $.mobile.changePage("#hrg-software-update-page", { transition: "slide" });
            NavEvent.Subscribe(NavEvent.TopicEnum.shell_feedbackTopic, function (data) {
                console.log(data);
                switch (data.data) {
                    default:
                        var temp = data.data.split(/[ :]/);
                        switch (temp[0]) {
                            case "update":
                                $("#btn-software-update").buttonMarkup({ icon: "arrow-d" });
                                document.getElementById("update-info").innerHTML += "<p>" + data.data.substring(temp[0].length + 1, data.data.length) + "</p>";
                                $("#test").prop('disabled', false).removeClass("ui-disabled");
                                sweetAlert("更新结果", temp[1], "success");
                                UpdateEvent.UpdateStart = false;
                                break
                        }
                        break;
                }
            });
        },
        onclose: function () {
            UpdateEvent.ConnectStart = false;
            console.log("close");
            $("#connect").buttonMarkup({ icon: "hrg-stop" });
            $(".networkstatus").buttonMarkup({ icon: "hrg-networkerror" });
            sweetAlert("网络错误", "请检查网络状态", "error");
        }
    };
    $("#connect").click(function () {
        if (UpdateEvent.ConnectStart) {
            return;
        }
        UpdateEvent.ConnectStart = true;
        $(this).buttonMarkup({ icon: "hrg-load" });
        option.url = "ws://" + $("#remote_robot_ip")[0].value + ":9090";
        NavEvent.Init(option);
        console.log("try connect %s", option.url);
     //  $.mobile.changePage("#hrg-software-update-page", { transition: "slide" });
    });




    $("#btn-software-update").click(function () {
        if (UpdateEvent.UpdateStart ) {
            return;
        }
        UpdateEvent.UpdateStart = true;
        $("#test").prop('disabled', true).addClass("ui-disabled");
        $(this).buttonMarkup({ icon: "hrg-load" });
        console.log("发送 %s 命令", UpdateEvent.UpdateType);
        switch (UpdateEvent.UpdateType) {
            case UpdateEvent.Type.onlineAuto:
                NavEvent.Publish(NavEvent.TopicEnum.cmdTopic, UpdateEvent.UpdateString.onlineAuto);
                break;
            case UpdateEvent.Type.offlineAuto:
                NavEvent.Publish(NavEvent.TopicEnum.shellTopic, UpdateEvent.UpdateString.offlineAuto);
                break;
            case UpdateEvent.Type.others.dbparam:
                NavEvent.Publish(NavEvent.TopicEnum.updateTopic, UpdateEvent.UpdateString.others.dbparam);
                break;
            case UpdateEvent.Type.others.openssh:
                NavEvent.Publish(NavEvent.TopicEnum.shellTopic, UpdateEvent.UpdateString.others.openssh);
                break;
            case UpdateEvent.Type.others.apache:
                NavEvent.Publish(NavEvent.TopicEnum.shellTopic, UpdateEvent.UpdateString.others.apache);
                break;
            default:
                break;

        }

    });

})
