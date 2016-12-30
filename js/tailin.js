var TL = TL || {
    REVISION: '0.0.6.0-2016-12.22',
    LockScrren: false,
    LoginName:"",
    LoginPassword: "",
    Auth:""

}
$(function () {
    /*
     * 锁屏
     */
    $("#btn-lock-software").click(function () {
        TL.LockScreen = true;
        $("#hrg-lock-software-popup").popup("open");
    });
    /*
     *解锁
     */
    $("#btn-unlock-software").click(function () {
        if ($("#lock-password")[0].value == TL.LoginPassword) {
            $("#lock-password")[0].value = "";
            $("#hrg-lock-software-popup").popup("close");
            TL.LockScreen = false;
        }
        else {
            sweetAlert("输入密码错误", "", "error");
        }
    });
})

