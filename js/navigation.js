var NavEvent = NavEvent || {
    /*
     *版本信息
     */
    REVISION: '0.0.6.0-2016-12.21',
    /*
     *Websocket 连接客户端
     */
    Ros:null,
    /*
     *cmdTopic 发送的Msg
     */
    CmdEnum: {
        Navigation: "navigation",
        Gmapping: "gmapping",
        Cancel: "cancel",
        Coverting: "converting",
        GamppingPose: "gmapping_pose",
        SaveMap: "save_map",
        SaveMapEdit: "save_map_edit",
        SaveAsMap: "save_as_map",
        SaveAsMapEdit: "save_as_map_edit",
        LoadMap: "load_map",
        LoadMapEdit: "load_map_edit",
        Userauth: "user_auth",
        Map_Select: "dbparam-select",  //查询地图
        Map_Delete: "dbparam-delete",  //删除地图
        Map_Update: "dbparam-update", // 切换地图
        Map_Insert: "dbparam-insert", // 添加地图
        Update: "update",
        Roslog_delete: "roslog-delete",
        Roslog_select: "roslog-select",
        Version: "version",
    },
    /*
     *shellTopic 发送的Msg
     */
    ShellEnum: {
        ChargeUp: 'rostopic pub -1 /auto_charge std_msgs/Byte "1"',
        ChargeDown: 'rostopic pub -1 /auto_charge std_msgs/Byte "0"',
        Joystick: '_JOYSTICK=`rosnode list | grep teleop_joystic`; if [[ -n $_JOYSTICK ]]; then _FB="joy_on"; else _FB="joy_off"; fi; rostopic pub -1 /shell_feedback std_msgs/String $_FB',
        JoystickOn: 'roslaunch bringup teleop_joystick.launch',
        JoystickOff: 'rosnode kill /teleop_joystick',
        MapSaveStaus: 'roslaunch bringup map_edit_as_saver.launch; rostopic pub -1 /shell_feedback std_msgs/String "map_edit_ok"',
        PLCopen: "rostopic pub -1 /waypoint_user_pub std_msgs/String \"wangjin_open\"",
        PLCclose: "rostopic pub -1 /waypoint_user_pub std_msgs/String \"wangjin_close\"",
        PLCstatus: "rostopic pub -1 /waypoint_user_pub std_msgs/String \"wangjin_status\"",
        Version: "_RC=`grep \'\\\'\'|\'\\\'\' ~/catkin_ws/README.md`;_FB=`echo $_RC | awk -F \'\\\'\'|\'\\\'\' \'\\\'\'{print $10}\'\\\'\'`;_FB=`echo version:$_FB | awk -F \'\\\'\' \'\\\'\' \'\\\'\'{print $1$2}\'\\\'\'`;rostopic pub -1 /shell_feedback std_msgs/String $_FB;unset _FB; unset _RC;",
    },
    /*
     *Topic 类型
     */
    TopicEnum: {
        cmdTopic: { name: '/cmd_string', messageType: "std_msgs/String" },
        shellTopic: { name: '/shell_string', messageType: "std_msgs/String" },
        updateTopic: { name: '/system_shell/shell_string', messageType: "std_msgs/String" },
        imuTopic: { name: '/mobile_imu', messageType: "sensor_msgs/Imu" },
        velTopic: { name: '/cmd_vel', messageType: "geometry_msgs/Twist" },
        odomTopic: { name: '/odom', messageType: "nav_msgs/Odometry" },
        poseTopic: { name: '/robot_pose', messageType: "geometry_msgs/Pose" },
        diagnosticsTopic: { name: '/diagnostics_agg', messageType: "diagnostic_msgs/DiagnosticArray" },
        map_editTopic: { name: '/map_edit', messageType: "nav_msgs/OccupancyGrid" },
        map_edit_asTopic: { name: '/map_edit_as', messageType: "nav_msgs/OccupancyGrid" },
        waypointTopic: { name: '/waypoints', messageType: "yocs_msgs/WaypointList" },
        trajectoryTopic: { name: '/trajectories', messageType: "yocs_msgs/TrajectoryList" },
        waypoint_addTopic: { name: '/waypoint_add', messageType: "yocs_msgs/Waypoint" },
        waypoint_removeTopic: { name: '/waypoint_remove', messageType: "yocs_msgs/Waypoint" },
        trajectory_addTopic: { name: '/trajectory_add', messageType: "yocs_msgs/Trajectory" },
        trajectory_removeTopic: { name: '/trajectory_remove', messageType: "yocs_msgs/Trajectory" },
        nav_ctrlTopic: { name: '/nav_ctrl', messageType: "yocs_msgs/NavigationControl" },
        nav_ctrl_statusTopic: { name: '/nav_ctrl_status', messageType: "yocs_msgs/NavigationControlStatus" },
        shell_feedbackTopic: { name: '/shell_feedback', messageType: "std_msgs/String" },
    },

    /*
     * NavigationMode
     */
    NavigationModeEnum: {
        Navigation: "navigation",
        Gmapping: "gmapping",
        Coverting: "converting"
    },
    /*
     * 路点列表
     */
    WaypointList: new Array(),
    /*
     *轨迹列表
     */
    TrajectoryList: new Array(),
    /*
     *当前导航状态 {string } 导航/建图/切换 NavigationModeEnum
     */
    NavigationMode: null,
    /*
     *当前Waypoint/Trajectory的标记名称
     */
    CurrentPositionName: "",
    /*
     *手动控制定时器
     */
    Timer: null,
    /*
     *无
     */
    actionClient: function () {
        return new ROSLIB.ActionClient({
            ros: this.Ros,
            actionName: 'move_base_msgs/MoveBaseAction',
            serverName: '/move_base'
        });
    },
    /*
     *构造Msg
     *@data {string} CmdEnum/ShellEnum的值
     */
    Msg: function (data) {
        return new ROSLIB.Message({
            data: data
        });
    },
    /*
     *地图信息
     *@info {object} 地图头信息 包括长、宽
     *@data {Array}  地图各像素值
     */
    MapMessage: function (info, data) {
        return new ROSLIB.Message({
            header: {
                frame_id: "/map",
                seq: 0
            },
            info: info,
            data: data
        });
    },
    /*
     *构造坐标点信息
     *@posX {number}  距离原点的水平距离  
     *@posY {number}  距离原点的垂直距离
     *@oriZ {number}  角度
     *@oriW {number}  角度
     */
    Pose: function (posX, posY, oriZ, oriW) {
        return new ROSLIB.Pose({
            position: { x: posX, y: posY, z: 0.0 },
            orientation: { x: 0.0, y: 0.0, z: oriZ, w: oriW }
        })
    },
    /*
     *目标点控制器
     *@pose {object} 目标坐标点  
     */
    Goal: function (pose) {
        return new ROSLIB.Goal({
            actionClient: this.actionClient(),
            goalMessage: {
                target_pose: {
                    header: {
                        frame_id: '/map'
                    },
                    pose: pose
                }
            }
        });
    },
    /*
     *构造Waypoints信息
     *@name         {string} waypoint 标记名  
     *@pose         {object} 坐标点 
     *@radius       {number} 半径 
     *@timeout      {number} 超时时间 单位 MS 
     *@keep         {string} 未能正常到达目标点后动作 LOOP 再一次尝试 NONE 不再尝试
     *@mode         {string} 参考WaypointMode说明 
     */
    WaypointMessage: function (name, pose, radius, timeout, keep, mode) {
        return new ROSLIB.Message({
            header: {
                frame_id: mode,
            },
            close_enough: radius,
            goal_timeout: timeout,
            failure_mode: keep,
            name: name,
            pose: pose,
        });
    },
    /*
     *构造Trajectory信息
     *@name         {string} trajectory 标记名  
     *@waypoints    {Array} waypoint集合 
     */
    TrajectoryMessage: function (name, waypoints) {
        return new ROSLIB.Message({
            name: name,
            waypoints: waypoints
        });
    },
    /*
     *构造Waypoint与Trajectory的控制信息
     *@control      {number} 1:启动 2:停止
     *@goal_name    {string} 需要执行的waypoint/trajectory标记名
   */
    NavCtrlMessage: function (control, goal_name) {
        return new ROSLIB.Message({
            control: control,
            goal_name: goal_name
        });
    },
    /*
     *构造速度信息
     *@linear_x      {number} 线速度
     *@angular_z     {number} 角速度
     */
    TwistMessage: function (linear_x, angular_z) {
        return new ROSLIB.Message({
            linear: {
                x: linear_x,
                y: 0,
                z: 0
            },
            angular: {
                x: 0,
                y: 0,
                z: angular_z
            },
        });
    },
    /*
     *Websocket初始化
     *@option      {object} option.url:服务器地址 option.onopen:连接成功回调 option.onclose:连接关闭回调 option.onerror:连接错误回调
     */
    Init: function (option) {
        var url = option.url || "ws://" + window.location.hostname + ":9090";
        this.Ros = new ROSLIB.Ros();
        this.Ros.connect(url);
        this.Ros.on('connection', option.onopen || function () {
            console.log("connect server %s success", url);
        });
        this.Ros.on('close', option.onclose || function () {
            console.error("connect server %s close", url);
        });
        this.Ros.on('error', option.onerror || function () {
            console.error("connect server %s error", url);
        });
    },
    /*
     *构建Topic
     *@option   {object} TopicEnum的值
     */
    Topic: function (option) {
        return new ROSLIB.Topic({
            ros: this.Ros,
            name: option.name,
            messageType: option.messageType
        });
    },
    /*
     *显示地图
     *@width  {number}  画布宽度
     *@height {number}  画布高度
     *@div    {string}  画布父容器ID
     */
    ShowMap: function (width, height, div) {
        var viewer = new ROS2D.Viewer({
            divID: div,
            width: width,
            height: height,
            background: "url('images/bg1.jpg')"
        });
        var nav = NAV2D.OccupancyGridClientNav({
            ros: this.Ros,
            rootObject: viewer.scene,
            continuous: true,
            withOrientation: true,
            viewer: viewer,
            serverName: '/move_base'
        });
        return viewer.scene;
    },
    /*
     *移除地图
     *@div    {string}  画布父容器ID
     */
    RemoveMap: function (div) {
        $("#" + div + " canvas").remove();
    },
    /*
     *切换至建图模式
     */
    Gmapping: function () {
        this.Publish(this.TopicEnum.cmdTopic, this.CmdEnum.Gmapping);
    },
    /*
     *切换至导航模式
     */
    Navigation: function () {
        this.Publish(this.TopicEnum.cmdTopic, this.CmdEnum.Navigation);
    },
    /*
     *保存建好的地图
     */
    SaveMap: function () {
        this.Publish(this.TopicEnum.cmdTopic, this.CmdEnum.GamppingPose, this.CmdEnum.SaveMap);
    },
    /*
     *保存修改后的地图
     *@info {object} 地图头信息
     *@data {Array}  地图各像素点值
     */
    SaveMapEdit: function (info, data) {
        this.Publish(this.TopicEnum.cmdTopic, this.CmdEnum.SaveAsMapEdit);

        var msg = this.MapMessage(info, data);
        var mapeditastopic = this.Topic(this.TopicEnum.map_edit_asTopic);
        mapeditastopic.publish(msg);
    },
    /*
     *取消当前导航指令
     */
    Cancel: function () {
        this.Publish(this.TopicEnum.cmdTopic, this.CmdEnum.Cancel);
    },
    /*
     *关闭手柄
     */
    CloseHandle: function () {
        this.Publish(this.TopicEnum.shellTopic, this.ShellEnum.JoystickOff, this.ShellEnum.Joystick);
    },
    /*
     *开启手柄
     */
    OpenHandle: function () {
        this.Publish(this.TopicEnum.shellTopic, this.ShellEnum.JoystickOn, this.ShellEnum.Joystick);
    },

    /*
     *站点添加
     *@wapoint {object} 站点信息 WaypointMessage
     */
    WayPointAdd: function (waypoint) {
        var topic = this.Topic(this.TopicEnum.waypoint_addTopic);
        topic.publish(waypoint);
    },
    /*
     *站点删除
     *@wapoint {object} 站点信息 WaypointMessage
     */
    WayPointRemove: function (waypoint) {
        var topic = this.Topic(this.TopicEnum.waypoint_removeTopic);
        topic.publish(waypoint);
    },
    /*
     *轨迹添加
     *@trajectory {object} 站点信息 TrajectoryMessage
     */
    TrajectoryAdd: function (trajectory) {
        var topic = this.Topic(this.TopicEnum.trajectory_addTopic);
        topic.publish(waypoint);
    },

    /*
     *轨迹删除
     *@trajectory {object} 站点信息 TrajectoryMessage
    */
    TrajectoryAdd: function (trajectory) {
        var topic = this.Topic(this.TopicEnum.trajectory_removeTopic);
        topic.publish(waypoint);
    },
    /*
     * 单点运动 导航至指定地点
     * @pose            {Pose}      坐标点
     * @goalCallback    {Fuction}           
     * @returns  void 
     */
    goPostion: function (pose, goalCallback) {
        var goal = this.Goal(pose);
        goal.send();
        goal.on('status', goalCallback);
    },
    /*
     *前进
     */
    goFront: function () {
        var velTopic = this.Topic(this.TopicEnum.velTopic);
        if (this.Timer != null) {
            clearInterval(this.Timer);
            this.Timer = null;
        }
        this.Timer = setInterval(function () {
            velTopic.publish(this.TwistMessage(0.25, 0));
        }, 300);
    },
    /*
     *后退
     */
    goBack: function () {
        var velTopic = this.Topic(this.TopicEnum.velTopic);
        if (this.Timer != null) {
            clearInterval(this.Timer);
            this.Timer = null;
        }
        this.Timer = setInterval(function () {
            velTopic.publish(this.TwistMessage(-0.25, 0));
        }, 300);
    },
    /*
     *左转
     */
    goLeft: function () {
        var velTopic = this.Topic(this.TopicEnum.velTopic);
        if (this.Timer != null) {
            clearInterval(this.Timer);
            this.Timer = null;
        }
        this.Timer = setInterval(function () {
            velTopic.publish(this.TwistMessage(0, 0.25));
        }, 300);
    },
    /*
     *右转
     */
    goRight: function () {
        var velTopic = this.Topic(this.TopicEnum.velTopic);
        if (this.Timer != null) {
            clearInterval(this.Timer);
            this.Timer = null;
        }
        this.Timer = setInterval(function () {
            velTopic.publish(this.TwistMessage(0, -0.25));
        }, 300);
    },
    /*
     *停止
     */
    goStop: function () {
        var velTopic = this.Topic(this.TopicEnum.velTopic);
        if (this.Timer != null) {
            clearInterval(this.Timer);
            this.Timer = null;
        }
        velTopic.publish(this.TwistMessage(0, 0));
    },
    /*
     *订阅Topic
     *@topic    {object}    TopicEnum类型
     *@callback {function}  回调
     */
    Subscribe: function (topic, callback) {
        var topic = this.Topic(topic);
        topic.subscribe(callback);
    },
    /*
    *取消订阅Topic
    *@topic    {object}    TopicEnum类型
    *@callback {function}  订阅函数回调
    */
    Unsubscribe: function (topic, callback) {
        var topic = this.Topic(topic);
        if (arguments.length == 2 && typeof (callback) == "function") {
            topic.unsubscribe(callback);
        }
        else {
            topic.unsubscribe();
        }
    },
    /*
     *发布Topic
     *@topic    {object}    TopicEnum类型
     *@data     {string}    CmdEnum/ShellEnum类型,支持多个参数
     */
    Publish: function (topic, data) {
        var topic = this.Topic(topic);
        for (var i = 1; i < arguments.length; i++) {
            var msg = this.Msg(arguments[i]);
            topic.publish(msg);
        }

    }
};


