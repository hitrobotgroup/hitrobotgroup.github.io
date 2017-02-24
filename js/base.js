var BaseEvent = BaseEvent || {
    REVISION: '0.0.6.0-2016-12.22',
    FirstLoad: true,
    StartWizard: false,
    StartSaveMapEdit: false,
    MapEditMessage: null,
    MachineModel: "",
    WaypointsHtml: "<option value='-1'>空</option>",
    selectid: 0,
    UpdateSocket:null,
    Init: function () {
        document.oncontextmenu = function (e) {
            e.preventDefault();
        };
        NavEvent.Subscribe(NavEvent.TopicEnum.shell_feedbackTopic, function (data) {
            console.log(data);
            switch (data.data) {
                case "joy_on":
                    $("#handle-switch").text("手柄关闭");
                    $("#handle-switch").buttonMarkup({ icon: "hrg-start" });
                    break;
                case "joy_off":
                    $("#handle-switch").text("手柄开启");
                    $("#handle-switch").buttonMarkup({ icon: "hrg-stop" });
                    break;
                case "save_map":
                    if (BaseEvent.StartWizard) {
                        NavEvent.Publish(NavEvent.TopicEnum.cmdTopic, NavEvent.CmdEnum.LoadMap, NavEvent.CmdEnum.SaveMapEdit);
                    }
                    break;
                case "save_map_edit":
                    if (BaseEvent.StartWizard) {
                        NavEvent.Publish(NavEvent.TopicEnum.cmdTopic, NavEvent.CmdEnum.LoadMapEdit);
                        $("#map-save").buttonMarkup({ icon: "hrg-save" });
                        $.mobile.changePage("#hrg-map-wizard-third", { transition: "slide" });
                    }

                    break;
                case "save_as_map_edit":
                    if (BaseEvent.StartWizard) {
                        BaseEvent.StartSaveMapEdit = true;
                        NavEvent.Navigation();
                    }
                    break;
                default:
                    var temp = data.data.split(/[ :]/);
                    switch (temp[0]) {
                        case "version":
                            $(".version").html(temp[1]);
                            break;
                        case "user_status":
                            if (temp[1] == 256) {
                                $("#btn-plc").buttonMarkup({ icon: "hty-normal-run" });
                            }
                            else if (temp[1] == 257) {
                                $("#btn-plc").buttonMarkup({ icon: "hty-error-run" });
                            }
                            else if (temp[1] == 0) {
                                $("#btn-plc").buttonMarkup({ icon: "hty-stop" });
                            }
                            else if (temp[1] == 1) {
                                $("#btn-plc").buttonMarkup({ icon: "hty-error-stop" });
                            }
                            else {
                            }
                            break;
                        case "user_auth":
                            BaseEvent.MachineModel = temp[1];
                            NavEvent.Publish(NavEvent.TopicEnum.shellTopic, NavEvent.ShellEnum.Joystick);
                            NavEvent.Publish(NavEvent.TopicEnum.cmdTopic, NavEvent.CmdEnum.Version);
                            if (temp[1] == "true") {
                                $.mobile.changePage("#hrg-login-page", { transition: "slide" });
                            }
                            else {
                                $.mobile.changePage("#hrg-navigation-main-page", { transition: "slide" });
                            }
                            break;
                        case "software_update":
                            document.getElementById("update-info").innerHTML += "<p>" + data.data.substring(temp[0].length + 1, data.data.length) + "</p>";
                            break
                        case "dbparam":
                            BaseEvent.CurrentMap = temp[1];
                            $(".current-map-name").text(temp[1]);
                            document.getElementById("map-select").innerHTML = "";
                            var options = "";
                            for (var i = 1; i < temp.length; i++) {
                                options += "<option value='" + temp[i] + "'>" + temp[i] + "</option>";
                            }
                            $("#map-select").append(options);
                            $("#map-select").selectmenu();
                            $("#map-select").selectmenu("refresh");
                            if (Scene.CurrentMapCmd == Scene.MapCmdEnum.map_insert) {
                                if (Scene.CurrentMap == Scene.CreatMap) {
                                    $("#btn-map-insert").buttonMarkup({ icon: "plus" });
                                    sweetAlert("创建成功", "", "success");
                                }
                            }
                            else if (Scene.CurrentMapCmd == Scene.MapCmdEnum.map_update) {
                                if (Scene.CurrentMap == Scene.SelectMap) {
                                    $("#hrg-map-selected-popup").popup("close");
                                    NavEvent.RemoveMap("nav");
                                    NavEvent.ShowMap(800, 800, "nav");
                                    $("#nav canvas").on("taphold", function () {
                                        $("#hrg-manual-control-popup").popup();
                                        $("#hrg-manual-control-popup").popup("open");
                                    });
                                }
                            }
                            Scene.CurrentMapCmd =-1;
                            Scene.CreatMap = "";
                            Scene.SelectMap = "";
                            break;

                        case "roslog":
                            $("#log").text(data.data.substring(temp[0].length + 1, data.data.length));
                            break;
                    }
                    break;
            }
        });
        NavEvent.Publish(NavEvent.TopicEnum.cmdTopic, NavEvent.CmdEnum.Userauth, NavEvent.CmdEnum.Navigation);
    }
}

$(function () {
    $('#hrg-navigation-main-page').live('pageshow', function (event, ui) {
        if (ui.prevPage[0].id == "hrg-login-page") {
            if (BaseEvent.FirstLoad) {
                BaseEvent.FirstLoad = false;
                var htmlcontents = "<a href='#hty-user-manger-page' data-transition='slide' class='btn-hty ui-btn ui-icon-hrg-user ui-btn-icon-notext ui-corner-all ui-btn-left'></a>";
                $("#hrg-menu-page-header").append(htmlcontents);
                var htmlcontents1 = "<a href='#hty-super-page' class='btn-hty' data-transition='slide' data-role='button' data-icon='carat-r' data-iconpos='right' style='background: #b6ff00;'>HTY-SUPER SD6</a>";
                $("#hrg-menu-page-content").append(htmlcontents1);
                NavEvent.Publish(NavEvent.TopicEnum.cmdTopic, NavEvent.CmdEnum.Map_Select);
                NavEvent.ShowMap(800, 800, "nav");
                $("#nav canvas").on("taphold", function () {
                    $("#hrg-manual-control-popup").popup();
                    $("#hrg-manual-control-popup").popup("open");
                });
            }
        }
        else if (ui.prevPage[0].id == "hrg-main-page") {
            if (BaseEvent.FirstLoad) {
                BaseEvent.FirstLoad = false;
                var htmlcontents = "<a href='#hrg-super-page' data-transition='slide' class='ui-btn ui-icon-hrg-user ui-btn-icon-notext ui-corner-all ui-btn-left'></a>";
                $("#hrg-menu-page-header").append(htmlcontents);
                NavEvent.Publish(NavEvent.TopicEnum.cmdTopic, NavEvent.CmdEnum.Map_Select);
                NavEvent.ShowMap(800, 800, "nav");
                $("#nav canvas").on("taphold", function () {
                    $("#hrg-manual-control-popup").popup();
                    $("#hrg-manual-control-popup").popup("open");
                });
            }
        }

    });

    /*
     *建图步骤
     */
    $(".btn-start-create-map").click(function () {
        if ($(this).text() != "模式切换中...") {
            $(this).text("模式切换中...");
            $(this).buttonMarkup({ icon: "hrg-load" });
            if (NavEvent.NavigationMode == NavEvent.NavigationModeEnum.Navigation) {
                NavEvent.Gmapping();
            }
            else if (NavEvent.NavigationMode == NavEvent.NavigationModeEnum.Gmapping) {
                NavEvent.Navigation();
            }
            else if (NavEvent.NavigationMode == NavEvent.NavigationModeEnum.Coverting) {

            }
            else {
                $(this).text("开启建图");
                $(this).buttonMarkup({ icon: "hrg-stop" });
                sweetAlert("获取导航状态失败", "", "error");
            }
        }
    });
    /*
     *建图第一步
     */
    $('#hrg-map-wizard-frist').live('pageshow', function (event, ui) {
        BaseEvent.StartWizard = true;
        NavEvent.Subscribe(NavEvent.TopicEnum.diagnosticsTopic, function (data) {
            if (!BaseEvent.StartWizard) {
                NavEvent.Unsubscribe(NavEvent.TopicEnum.diagnosticsTopic);
            }
            else {
                console.log(data);
                for (var i = 0; i < data.status.length; i++) {
                    if (data.status[i].name == "/Other/ros_mode") {
                        switch (data.status[i].message) {
                            case NavEvent.NavigationModeEnum.Navigation:
                                if (NavEvent.NavigationMode != NavEvent.NavigationModeEnum.Navigation) {
                                    console.log(data.status[i].message);
                                    NavEvent.NavigationMode = data.status[i].message;
                                    $(".btn-start-create-map").text("开启建图");
                                    $(".btn-start-create-map").buttonMarkup({ icon: "hrg-stop" });
                                    if (BaseEvent.StartSaveMapEdit) {
                                        BaseEvent.StartSaveMapEdit = false;
                                        $("#map-edit-save").buttonMarkup({ icon: "hrg-save" });
                                        $.mobile.changePage("#hrg-menu-page", { transition: "slide" });
                                    }
                                }
                                break;
                            case NavEvent.NavigationModeEnum.Gmapping:
                                if (NavEvent.NavigationMode != NavEvent.CmdEnum.Gmapping) {
                                    console.log(data.status[i].message);
                                    NavEvent.NavigationMode = data.status[i].message;
                                    $(".btn-start-create-map").text("关闭建图");
                                    $(".btn-start-create-map").buttonMarkup({ icon: "hrg-start" });
                                    $.mobile.changePage("#hrg-map-wizard-second", { transition: "slide" });
                                }
                                break;
                            case NavEvent.NavigationModeEnum.Coverting:
                                if (NavEvent.NavigationMode != NavEvent.CmdEnum.Coverting) {
                                    console.log(data.status[i].message);
                                    NavEvent.NavigationMode = data.status[i].message;
                                    $(".btn-start-create-map").text("模式切换中...");
                                    $(".btn-start-create-map").buttonMarkup({ icon: "hrg-load" });
                                }
                                break;
                            default:
                                break;
                        }
                        return;
                    }
                }
            }
        });
    });
    /*
     *建图第二步
     */
    $('#hrg-map-wizard-second').live('pageshow', function (event, ui) {
        NavEvent.show(800, 800, 'nav1');
        $("#nav1 canvas").on("taphold", function () {
            $("#hrg-manual-control-popup").popup();
            $("#hrg-manual-control-popup").popup("open");
        });
    });

    /*
     *保存建图地图
     */
    $("#map-save").click(function () {
        NavEvent.SaveMap();
        $(this).buttonMarkup({ icon: "hrg-load" });
    });

    $('#hrg-map-wizard-second').live('pagehide', function (event, ui) {
        NavEvent.RemoveMap('nav1');
        $("#nav1 canvas").off("taphold");
    });
    /*
     *建图第三步
     */
    $('#hrg-map-wizard-third').live('pageshow', function (event, ui) {
        BrushEvent.disableCanvasEdit("map-edit-canvas-father");
        $("#map-edit-canvas").hide();
        $("#map-edit-canvas-father img").show();
        NavEvent.Subscribe(NavEvent.TopicEnum.map_editTopic, function (message) {
            $("#map-edit-canvas-father img").hide();
            NavEvent.Unsubscribe(NavEvent.TopicEnum.map_editTopic);
            BaseEvent.MapEditMessage = message;
            var canvas = document.getElementById('map-edit-canvas');
            var context = canvas.getContext('2d');
            canvas.width = message.info.width;
            canvas.height = message.info.height;
            var imageData = context.createImageData(canvas.width, canvas.height);
            for (var row = 0; row < canvas.height; row++) {
                for (var col = 0; col < canvas.width; col++) {
                    var mapI = col + ((canvas.height - row - 1) * canvas.width);
                    var data = message.data[mapI];
                    var val;
                    if (data === 100) {
                        val = 0;
                    } else if (data === 0) {
                        val = 255;
                    } else {
                        val = 127;
                    }
                    var i = (col + (row * canvas.width)) * 4;
                    // r
                    imageData.data[i] = val;
                    // g
                    imageData.data[++i] = val;
                    // b
                    imageData.data[++i] = val;
                    // a
                    imageData.data[++i] = 255;
                }
            }
            context.putImageData(imageData, 0, 0);
            $("#hrg-map-wizard-third").css("background", "grey");
            $("#map-edit-canvas").show();
            var test = document.getElementById("map-edit-canvas-father");
            test.scrollLeft = test.scrollWidth / 2 - 100;
            test.scrollTop = test.scrollHeight / 2 - 100;
        });
        $(this).css("background", "white");
    });
    /*
     *保存修改地图
     */
    $("#map-edit-save").click(function () {
        $(this).buttonMarkup({ icon: "hrg-load" });
        var info = BaseEvent.MapEditMessage.info;
        var data = MapEditDataConvert("map-edit-canvas");
        NavEvent.SaveMapEdit(info,data);
    });
    /*
     *画笔设置
     */
    $("#map-scorll").click(function () {
        var scorll = document.getElementById("map-edit-canvas-father");
        if (scorll.style.overflow == "hidden") {
            DisableBrush(scorll);
        }
        else {
            EnableBrush(scorll);
        }
    });
    /*
     *画笔设置成白色
     */
    $("#map-lines-delete").click(function () {
        BrushEvent.mapEditcolor = "white";
        BrushEvent.mapEditlineWidth = 5;
        $(this).buttonMarkup({ icon: "hrg-edit-red" });
        $("#map-lines-add").buttonMarkup({ icon: "hrg-edit-white" });
    });
    /*
     *画笔设置成黑色
     */
    $("#map-lines-add").click(function () {
        BrushEvent.mapEditcolor = "black";
        BrushEvent.mapEditlineWidth = 3;
        $(this).buttonMarkup({ icon: "hrg-edit-red" });
        $("#map-lines-delete").buttonMarkup({ icon: "hrg-edit-white" });
    });
    /*
     *建图向导结束
     */
    $('#hrg-map-wizard-third').live('pagehide', function (event, ui) {
        BaseEvent.StartWizard = false;
    });

    /*
     *系统诊断
     */
    $('#hrg-system-diagnosis-page').live('pageshow', function (event, ui) {
        NavEvent.Subscribe(NavEvent.TopicEnum.diagnosticsTopic, function (data) {
            NavEvent.Unsubscribe(NavEvent.TopicEnum.diagnosticsTopic);
            for (var i = 0; i < data.status.length; i++) {
                var tempHtml = "<div data-role='collapsible'>"
                               + "<h3>" + data.status[i].name + "</h3>"
                               + "<p>" + data.status[i].message + "</p>"
                               + "</div>";
                $("#diagnostics-list").append(tempHtml);
            }
            $("#diagnostics-list").trigger("create");
            $("#diagnostics-list").collapsibleset("refresh");
            $("#hrg-diagnosis-content img").hide();
        });
    });

    $('#hrg-system-diagnosis-page').live('pagehide', function (event, ui) {
        $("#diagnostics-list div").remove();
        $("#hrg-diagnosis-content img").show();
    });
    /*
     *订阅坐标值
     */
    NavEvent.Subscribe(NavEvent.TopicEnum.poseTopic, function (poseMessage) {
        $("#pos_x").val(poseMessage.position.x);
        $("#pos_y").val(poseMessage.position.y);
        $("#ori_z").val(poseMessage.orientation.z);
        $("#ori_w").val(poseMessage.orientation.w);
    });
    /*
     *订阅路点信息
     */
    NavEvent.Subscribe(NavEvent.TopicEnum.waypointTopic, function (data) {
        console.log(data);
        NavEvent.WaypointList = data;
        $("#waypoint-list")[0].innerHTML = "";
        NavEvent.data.WaypointsHtml = "<option value='-1'>空</option>";
        for (var i = 0; i < data.waypoints.length; i++) {
            var name = data.waypoints[i].name;
            var waypoint_icon = "location";
            waypoint_icon = getWaypointIcon(i);
            var htmlcontents = " <div class='ui-grid-a' id='way" + name + "'>"
                             + "<div class='ui-block-a'>"
                             + "<a style='padding:0.1em;margin-left:0;' data-icon='" + waypoint_icon + "' class='btn btn1' id='btn-waypoint-" + name + "' onclick='goPostion(this)'>" + name + "</a></div>"
                             + "<div class='ui-block-b'>"
                             + "<a style='padding:0.1em;margin-left:0;' data-icon='delete' class='btn btn1' onclick='WaypointDelete(this)'>删除</a></div></div>";
            BaseEvent.WaypointsHtml += "<option value='" + i + "'>" + name + "</option>";
            $("#waypoint-list").append(htmlcontents);
        }
        $('.btn').button();
    });
    /*
     *订阅轨迹信息
     */
    NavEvent.Subscribe(NavEvent.TopicEnum.trajectoryTopic, function (data) {
        console.log(data);
        NavEvent.TrajectoryList = data;
        $("#trajectory-list")[0].innerHTML = "";
        for (var i = 0; i < data.trajectories.length; i++) {
            var name = data.trajectories[i].name;
            var htmlcontents = "<div data-role='collapsible' class='coll'>"
                         + "<h3>" + name + "</h3>"
                         + " <div class='ui-grid-b' id='tra" + name + "'>"
                         + "<div class='ui-block-a'>"
                         + "<a style='padding:0.1em;margin-left:0;' data-icon='location' class='btn btn1'id='btn-trajectorie-" + name + "' onclick='goPostion(this)'>" + name + "</a></div>"
                         + "<div class='ui-block-b'>"
                         + "<a style='padding:0.1em;margin-left:0;' data-icon='info' class='btn btn1' onclick='showTrajectoryMessage(this)'>详情</a></div>"
                         + "<div class='ui-block-c'>"
                         + "<a style='padding:0.1em;margin-left:0;' data-icon='delete' class='btn btn1' onclick='TrajectoryDelete(this)'>删除</a></div></div>"
                         + "</div>";
            $("#trajectory-list").append(htmlcontents);
        }
        $('.btn').button();
        $('#trajectory-list').collapsibleset().trigger("create");
        $('#trajectory-list').collapsibleset("refresh");
    });

    /*
     *订阅 站点 轨迹 运动状态
     */
    NavEvent.Subscribe(NavEvent.TopicEnum.nav_ctrl_statusTopic,function (data) {
        console.log(data);
        var index = getIndexFromArray(data.waypoint_name, NavEvent.WaypointList.waypoints);
        var waypoint_icon = "none";
        if (index != -1) {
            waypoint_icon = getWaypointIcon(index);
        }
        var index1 = getIndexFromArray(NavEvent.CurrentPositionName, NavEvent.WaypointList.waypoints);
        var pre_waypoint_icon = "none";
        if (index1 != -1) {
            pre_waypoint_icon = getWaypointIcon(index1);
        }
        switch (data.status) {
            case 1:
                $("#btn-waypoint-" + NavEvent.CurrentPositionName).parent().buttonMarkup({ icon: pre_waypoint_icon });
                $("#btn-waypoint-" + data.waypoint_name).parent().buttonMarkup({ icon: "hrg-load" });
                break;
            case 3:
                $("#btn-waypoint-" + data.waypoint_name).parent().buttonMarkup({ icon: waypoint_icon });
                break;
            case 0:
                $(".btn1").prop('disabled', false).removeClass("ui-disabled");
                break;
            case 4:
                $("#btn-waypoint-" + data.waypoint_name).parent().buttonMarkup({ icon: waypoint_icon });
                break;
            default:
                break;
        }
        if (data.waypoint_name != "all waypoints") {
            NavEvent.CurrentPositionName = data.waypoint_name;
        }
    });

    /*
     *添加站点
     */
    $("#btn-add-waypoint").click(function () {
        var pose = NavEvent.Pose(parseFloat($('#pos_x')[0].value), parseFloat($('#pos_y')[0].value), parseFloat($('#ori_z')[0].value), parseFloat($('#ori_w')[0].value));
        var waypoints_action = $("#waypoints-action").val();
        var timeout = $('#timeout')[0].value;
        var area = $("#area")[0].value;
        var waypoints_mode = $("#waypoints-mode").val();

        var temp_waypoints_action = "map";
        if (waypoints_action == "map") {
            temp_waypoints_action = "map";
        }
        else if (waypoints_action == "timer") {
            temp_waypoints_action = "timer";
        }
        else if (waypoints_action == "publisher") {
            temp_waypoints_action = "pub";
        }
        else if (waypoints_action == "subscriber") {
            temp_waypoints_action = "sub";
        }
        else if (waypoints_action == "looper") {
            temp_waypoints_action = "loop";
        }

        var name = temp_waypoints_action + "-" + $('#name')[0].value;
        var index = getIndexFromArray(name, NavEvent.TrajectoryList.trajectories);
        if (index !== -1) {
            sweetAlert("Waypoint:" + name + " 在Trajectory列表中已占用 位于Trajectory[" + index + "]", "", "error");
            return;
        }
        if (timeout == "") {
            timeout = 0.0;
        }
        if (area == "") {
            area = 0.0;
        }
        var waypoint = NavEvent.WaypointMessage(name, pose, parseFloat(area), parseFloat(timeout), waypoints_mode, waypoints_action);
        NavEvent.WayPointAdd(waypoint);
        $.mobile.changePage("#hrg-navigation-setting-page", { transition: "slide" });
    });
    /*
     *轨迹添加
     */
    $("#btn-add-trajectory").click(function () {
        var temp = false;
        var name = $("#trajectory-name")[0].value;
        if (name == "") {
            return;
        }
        var index = getIndexFromArray(name, NavEvent.WaypointList.waypoints);
        if (index !== -1) {
            sweetAlert("Waypoint:" + name + " 在Trajectory列表中已占用 位于Trajectory[" + index + "]", "", "error");
            return;
        }

        var waypoints = new Array();
        for (var i = 1; i <= BaseEvent.selectid; i++) {
            if ($("#select-native-" + i)) {
                temp = true;
                var index = getIndexFromArray($("#select-native-" + i).find("option:selected").text(), NavEvent.WaypointList.waypoints);
                if (index==-1) 
                    return;
                waypoints.push(NavEvent.WaypointList.waypoints[index]);
            }
        }
        if (temp) {
            var trajectory = NavEvent.TrajectoryMessage(name, waypoints);
            NavEvent.TrajectoryAdd(trajectory);
            $.mobile.changePage("#hrg-navigation-setting", { transition: "slide" });
        }
        else {
            sweetAlert("未设定路点", "", "error");
        }
        $.mobile.changePage("#hrg-navigation-setting-page", { transition: "slide" });
    });



    $('#hrg-add-trajectory-page').live('pagehide', function (event, ui) {
         BaseEvent.selectid = 0;
        $("#waypoint-item select").remove();
    });

    $("#btn-add-waypoint-item").click(function () {
        BaseEvent.selectid++;
        var htmlcontents = "<select name='select-native-" + BaseEvent.selectid + "'id='select-native-" + BaseEvent.selectid + "' data-iconpos='right' onchange='DeleteSelectOption(this)'>"
             + NavEvent.WaypointsHtml + "</select>";
        $("#waypoint-item").append(htmlcontents);

        $("#select-native-" + BaseEvent.selectid).selectmenu();
        $("#select-native-" + BaseEvent.selectid).selectmenu("refresh");

        $("#select-native-" + BaseEvent.selectid).parent().parent().hide();
        $("#select-native-" + BaseEvent.selectid).parent().parent().fadeIn(2000);
    });
 
    /*
     *取消Waypoint/Trajectory导航
     */
    $("#cancel").click(function () {
        var msg = NavEvent.NavCtrlMessage(0, NavEvent.CurrentPositionName);
        var topic = NavEvent.Topic(NavEvent.TopicEnum.nav_ctrlTopic);
        topic.publish(msg);
    });

    /*
     *方向键 手动控制
     */
    $(".up").on("touchstart touchend", function (e) {
        if (e.type == "touchstart") {
            e.preventDefault();
            $(this).attr('src', "images/up1.png");
            NavEvent.goFront();
        }
        else if (e.type == "touchend") {
            $(this).attr('src', "images/up.png");
            NavEvent.goStop();
        }


    });
    $(".down").on("touchstart touchend", function (e) {

        if (e.type == "touchstart") {
            e.preventDefault();
            $(this).attr('src', "images/down1.png");
            NavEvent.goBack();
        }
        else if (e.type == "touchend") {
            $(this).attr('src', "images/down.png");
            NavEvent.goStop();
        }
    });
    $(".left").on("touchstart touchend", function (e) {

        if (e.type == "touchstart") {
            e.preventDefault();
            $(this).attr('src', "images/left1.png");
            NavEvent.goLeft();
        }
        else if (e.type == "touchend") {
            $(this).attr('src', "images/left.png");
            NavEvent.goStop();
        }
    });
    $(".right").on("touchstart touchend", function (e) {
        if (e.type == "touchstart") {
            e.preventDefault();
            $(this).attr('src', "images/right1.png");
            NavEvent.goRight();
        }
        else if (e.type == "touchend") {
            $(this).attr('src', "images/right.png");
            NavEvent.goStop();
        }
    });
    $(".stop").on("touchstart touchend", function (e) {
        if (e.type == "touchstart") {
            e.preventDefault();
            $(this).attr('src', "images/stopmove1.png");
            NavEvent.goStop();
        }
        else if (e.type == "touchend") {
            $(this).attr('src', "images/stopmove.png");
            NavEvent.goStop();
        }
    });

    /*
     * 系统日志
     */
    $('#hrg-system-log-page').live('pageshow', function (event, ui) {
        NavEvent.Publish(NavEvent.TopicEnum.cmdTopic, NavEvent.CmdEnum.Roslog_select);
    });

})

function MapEditDataConvert(id) {
    var MapEditArray = new Array();
    var cxtMap = document.getElementById(id).getContext("2d");
    var canvas = document.getElementById(id);
    var imgData = cxtMap.getImageData(0, 0, canvas.width, canvas.height);

    for (var row = 0; row < canvas.height; row++) {
        for (var col = 0; col < canvas.width; col++) {
            var j = col + ((canvas.height - row - 1) * canvas.width);
            var i = (col + (row * canvas.width)) * 4;
            switch (imgData.data[i]) {
                case 0:
                    MapEditArray[j] = 100;
                    break;
                case 255:
                    MapEditArray[j] = 0;
                    break;
                case 127:
                    MapEditArray[j] = -1;
                    break;
                default:
                    MapEditArray[j] = 100;
                    break;
            }

        }
    }
    return MapEditArray;
};

function getWaypointIcon(index) {
    var waypoint_icon = "none";
    if (NavEvent.WaypointList.waypoints[index].header.frame_id == "map") {
        waypoint_icon = "location";
    }
    else if (NavEvent.WaypointList.waypoints[index].header.frame_id == "timer") {
        waypoint_icon = "clock";
    }
    else if (NavEvent.WaypointList.waypoints[index].header.frame_id == "publisher") {
        waypoint_icon = "navigation";
    }
    else if (NavEvent.WaypointList.waypoints[index].header.frame_id == "subscriber") {
        waypoint_icon = "star";
    }
    else if (NavEvent.WaypointList.waypoints[index].header.frame_id == "looper") {
        waypoint_icon = "recycle";
    }
    return waypoint_icon;
}

function DisableBrush(dom) {
    dom.style.overflow = "scroll";
    BrushEvent.disableCanvasEdit("map-edit-canvas");
    $("#map-scorll").text("启用画笔");
    $("#map-lines-add").prop('disabled', true).addClass("ui-disabled");
    $("#map-lines-delete").prop('disabled', true).addClass("ui-disabled");

}
function EnableBrush(id) {
    dom.style.overflow = "hidden";
    BrushEvent.enableCanvasEdit("map-edit-canvas");
    $("#map-scorll").text("禁用画笔");
    $("#map-lines-add").prop('disabled', false).removeClass("ui-disabled");
    $("#map-lines-delete").prop('disabled', false).removeClass("ui-disabled");
}
function getIndexFromArray(name, list) {
    try {
        var index = -1;
        for (var i = 0; i < list.length; i++) {
            if (name == list[i].name) {
                index = i;
                return index;
            }
        }
        return index;
    } catch (e) {
        sweetAlert("获取站点信息失败", "", "error");
        return -1;
    }

}