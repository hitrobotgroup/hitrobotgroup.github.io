var DbEvent = DbEvent || {
    REVISION: '0.0.6.0-2016-12.23',
    State: {
        LoginSuccess: 0,
        LoginFail_NotExist: -1,
        LoginFail_LoginedIn: -2,
        LoginFail_WrongPwd: -3,

        RegisterSuccess: 1,
        RegisterFail: -4,
        RegisterFail_Exist: -5,
        RegisterFail_InvalidCode: -6,

        LogoutSuccess: 2,
        LogoutFail: -7,

        UpdataSuccess: 3,
        UpdataFail: -8,

        GenerateCodeSuccess: 4,
        GenerateCodeFail: -9,

        InvalidAuthCode: -10,
        RegisterFail_CodeOutOfDate: -11,

        UpdateAuthSuccess: 5,
        UpdateAuthFail: -12,
        UpdateAuthFail_Denied: -13,


        StoreOpRecordSuccess: 6,
        StoreOpRecordFail: -14,

        QueryOpRecordSuccess: 7,
        QueryOpRecordFail: -15
    },
    ID: {
        login_name: "#login-name",
        login_password: "#login-password",

        register_name: "#register-name",
        register_password: "#register-password",
        register_password_agin: "#register-password-agin",
        register_auth_code: "#register-auth-code",

        old_password: "#old-password",
        new_password: "#new-password",
        confirm_password: "#confirm-password",

        user_table: "#hty-user-table",
        history_table: "#hty-history-table"
    },
    /*
     *存储操作记录
     */
    StoreRecord: function (username, operation) {
        var url = "http://" + window.location.hostname + ":8808/store_record";
        $.ajax({
            type: 'post',
            url: url,
            data: {
                time: this.formatDate(new Date(), "yyyy-M-d hh:mm:ss"), username: username, operation: operation
            },
            async: true,
            success: function (data) {
                console.log(data);

            },
            dataType: "json"
        });
    },
    /*
     *6-20位密码判定正则
     */
    isPasswd: function (s) {
        var patrn = /^(\w){6,20}$/;
        if (!patrn.exec(s))
            return false
        return true
    },
    /*
     *用户名判定正则
     */
    isRegisterUserName: function (s) {
        var patrn = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
        if (!patrn.exec(s)) return false
        return true
    },
    /*
     *向DIV 下添加表格数据
     */
    AddtableList: function (data, tableId) {
        $(tableId)[0].innerHTML = "";
        var header = "";
        var headerList = new Array();
        for (var key in data[0]) {
            header += "<th data-priority='1'>" + key + "</th>";
            headerList.push(key);
        }
        var html1 = " <thead><tr>" + header + "</tr></thead>"

        $(tableId).append(html1);
        var row = "";
        for (var i = 0; i < data.length; i++) {
            var temp = "";
            for (var j = 0; j < headerList.length; j++) {
                temp += "<td>" + data[i][headerList[j]] + "</td>"
            }
            row += "<tr>" + temp + "</tr>";
        }
        var html2 = "<tbody>" + row + "</tbody>";
        $(tableId).append(html2);

    },

    /*
     *格式化日期
     */
    formatDate: function (date, format) {
        var paddNum = function (num) {
            num += "";
            return num.replace(/^(\d)$/, "0$1");
        }
        //指定格式字符
        var cfg = {
            yyyy: date.getFullYear() //年 : 4位
          , yy: date.getFullYear().toString().substring(2)//年 : 2位
          , M: date.getMonth() + 1  //月 : 如果1位的时候不补0
          , MM: paddNum(date.getMonth() + 1) //月 : 如果1位的时候补0
          , d: date.getDate()   //日 : 如果1位的时候不补0
          , dd: paddNum(date.getDate())//日 : 如果1位的时候补0
          , hh: date.getHours()  //时
          , mm: date.getMinutes() //分
          , ss: date.getSeconds() //秒
        }
        format || (format = "yyyy-MM-dd hh:mm:ss");
        return format.replace(/([a-z])(\1)*/ig, function (m) { return cfg[m]; });
    },

    /*
     *格式化CST日期的字串
     */
    formatCSTDate: function (strDate, format) {
        return formatDate(new Date(strDate), format);
    }

}

$(function () {
    console.log(DbEvent);
    /*
     *登录
     */
    $("#login").click(function () {
        var username = $(DbEvent.ID.login_name)[0].value;
        var userpassword = $(DbEvent.ID.login_password)[0].value;
        var url = "http://" + window.location.hostname + ":8808/login";
        $.ajax({
            type: 'post',
            url: url,
            data: { username: username, password: userpassword },
            async: true,
            success: function (data) {
                console.log(data);
                if (data.status == DbEvent.State.LoginSuccess) {
                    TL.LoginName = username;
                    TL.LoginPassword = userpassword;
                    TL.Auth = data.auth;
                    $(".current-user").html(data.auth);
                    $.mobile.changePage("#hrg-navigation-main-page", { transition: "slide" });
                    DbEvent.StoreRecord(username, JSON.stringify({ action: "login" }));
                }
                else if (data.status == DbEvent.State.LoginFail_NotExist) {
                    sweetAlert("用户名不存在", "", "error");
                }
                else if (data.status == DbEvent.State.LoginFail_LoginedIn) {
                    sweetAlert("该用户已在其他设备登录", "", "warning");
                }
                else if (data.status == DbEvent.State.LoginFail_WrongPwd) {
                    sweetAlert("密码错误", "", "error");
                }
            },
            dataType: "json"
        });
    });
    /*
     *登出 注销
     */
    $("#logout").click(function () {
        var username = TL.LoginName;
        var url = "http://" + window.location.hostname + ":8808/logout";
        $.ajax({
            type: 'post',
            url: url,
            data: { username: username },
            async: true,
            success: function (data) {
                console.log(data);
                if (data.status == DbEvent.State.LogoutSuccess) {
                    TL.LoginName = "";
                    TL.LoginPassword = "";
                    TL.Auth = "";
                    $(DbEvent.ID.login_name)[0].value = "";
                    $(DbEvent.ID.login_password)[0].value = "";
                    $.mobile.changePage("#hrg-login-page", { transition: "slide" });
                }
                else if (data.status == DbEvent.State.LogoutFail) {
                    sweetAlert("注销失败", "", "error");
                }
            },
            dataType: "json"
        });

    });
    /*
     *获取用户列表
     */
    $("#get").click(function () {
        var url = "http://" + window.location.hostname + ":8808/user_select";
        $.ajax({
            type: 'get',
            url: url,
            async: true,
            success: function (data) {
                console.log(data);
                DbEvent.AddtableList(data, DbEvent.ID.user_table);
                $.mobile.changePage("#hty-user-table-page", { transition: "slide" });
            },
            dataType: "json"
        });
    });

    /*
     *注册用户
     */
    $("#btn-register").click(function () {
        var username = $(DbEvent.ID.register_name)[0].value;
        var userpassword = $(DbEvent.ID.register_password)[0].value;
        var authcode = $(DbEvent.ID.register_auth_code)[0].value;
        if (!DbEvent.isRegisterUserName(username)) {
            sweetAlert("用户名不合法", "", "warning");
            return;
        }
        if (authcode == "") {
            sweetAlert("授权码不能为空", "", "warning");
            return;
        }
        else if (authcode != "hitrobot") {
            if (authcode.length != 32) {
                sweetAlert("授权码不合法", "", "warning");
                return;
            }
        }

        if (!DbEvent.isPasswd(userpassword)) {
            sweetAlert("密码不合法", "", "warning");
            return;
        }
        if (userpassword != $(DbEvent.ID.register_password_agin)[0].value) {
            sweetAlert("密码不一致", "", "error");
            return;
        }
        var url = "http://" + window.location.hostname + ":8808/register";
        $.ajax({
            type: 'post',
            url: url,
            data: { username: username, password: userpassword, authCode: authcode },
            async: true,
            success: function (data) {
                if (data.status == DbEvent.State.RegisterSuccess) {
                    $.mobile.changePage("#hrg-login-page", { transition: "slide" });
                }
                else if (data.status == DbEvent.State.RegisterFail) {
                    sweetAlert("注册失败", "", "error");
                }
                else if (data.status == DbEvent.State.RegisterFail_Exist) {
                    sweetAlert("注册失败 用户名已存在", "", "error");
                }
            },
            dataType: "json"
        });
    });
    /*
     *修改密码
     */
    $("#btn-change-login-password").click(function () {
        if ($(DbEvent.ID.old_password)[0].value != TL.LoginPassword) {
            sweetAlert("原密码输入错误", "", "error");
            return;
        }
        if (!DbEvent.isPasswd($(DbEvent.ID.new_password)[0].value)) {
            sweetAlert("新密码不合法", "", "warning");
            return;
        }
        if ($("#new-password")[0].value != $(DbEvent.ID.confirm_password)[0].value) {
            sweetAlert("输入密码不一致", "", "error");
            return;
        }
        var username = TL.LoginName;
        var userpassword = $(DbEvent.ID.new_password)[0].value;
        var url = "http://" + window.location.hostname + ":8808/update";
        $.ajax({
            type: 'post',
            url: url,
            data: { username: username, password: userpassword },
            async: true,
            success: function (data) {
                console.log(data);
                if (data.status == DbEvent.State.UpdataSuccess) {
                    TL.LoginPassword = userpassword;
                    sweetAlert("修改成功", "", "success");
                    $("#hrg-change-password-popup").popup("close");
                }
                else if (data.status == DbEvent.State.UpdataFail) {
                    sweetAlert("修改失败", "", "error");
                }
            },
            dataType: "json"
        });
    });
    /*
     *生成授权码
     */
    $("#btn-get-auth-code").click(function () {
        $(this).buttonMarkup({ icon: "hrg-load" });
        var username = TL.LoginName;
        var auth = $("#auth-code-select").val();
        var url = "http://" + window.location.hostname + ":8808/code";
        $.ajax({
            type: 'post',
            url: url,
            data: { username: username, auth: auth },
            async: true,
            success: function (data) {
                console.log(data);
                $("#btn-get-auth-code").buttonMarkup({ icon: "star" });
                if (data.status == DbEvent.State.GenerateCodeSuccess) {
                    $("#new-auth-code").val(data.authcode);
                }
                else if (data.status == DbEvent.State.GenerateCodeFail) {
                    sweetAlert(data.message, "", "error");
                }
            },
            dataType: "json"
        });

    });

    /*
     *获取用户列表
     */
    $('#hty-history-search-page').live('pageshow', function (event, ui) {
        if (ui.prevPage[0].id == "hty-user-manger-page") {
            var url = "http://" + window.location.hostname + ":8808/get_users";
            var htmlcontents = "<option value='-1'>ALL</option>";
            $.ajax({
                type: 'get',
                url: url,
                async: true,
                success: function (data) {
                    console.log(data);
                    for (var i = 0; i < data.users.length; i++) {
                        htmlcontents += "<option value='" + data.users[i] + "'>" + data.users[i] + "</option>";
                    }
                    $("#hty-users-list").append(htmlcontents);
                    $("#hty-users-list").selectmenu();
                    $("#hty-users-list").selectmenu("refresh");
                },
                dataType: "json"
            });
        }
    });

    $('#hty-history-search-page').live('pagehide', function (event, ui) {
        if (ui.toPage[0].id == "hrg-user-manger-page") {
            $("#hty-users-list")[0].innerHTML = "";
        }
    });
    /*
     *历史记录查询
     */
    $("#btn-history-search").click(function () {
        var start = $("#dtl")[0].value;
        var end = $("#dt2")[0].value;
        var username = $("#hty-users-list").find("option:selected").text();
        start = start.replace('T', " ");
        end = end.replace('T', " ");
        //console.log(start);
        //console.log(end);
        var url = "http://" + window.location.hostname + ":8808/query_op";
        $.ajax({
            type: 'post',
            url: url,
            data: { username: username, start: start, end: end },
            async: true,
            success: function (data) {
                if (data.status == DbEvent.State.QueryOpRecordSuccess) {
                    DbEvent.AddtableList(data.records, DbEvent.ID.history_table);
                    $.mobile.changePage("#hty-history-page", { transition: "slide" });
                }
            },
            dataType: "json"
        });
    });
})