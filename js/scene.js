var Scene = Scene || {
    REVISION: '0.0.6.0-2016-12.22',
    MapCmdEnum :{
        map_select: 0,
        map_insert: 1,
        map_update: 2,
        map_delete: 3
    },
    CurrentMapCmd: -1,
    CurrentMap: "",
    SelectMap: "",
    CreatMap:""
}


$(function () {

    $("#hrg-map-selected-popup").on('popupbeforeposition', function (event, ui) {
        Scene.CurrentMapCmd = Scene.MapCmdEnum.map_select;
        NavEvent.Publish(NavEvent.TopicEnum.cmdTopic, NavEvent.CmdEnum.Map_Select);
    });

    $("#hrg-map-selected-popup").on('popupafterclose', function (event, ui) {

    });

    $("#map-select").on('change', function (e) {
        $(".current-map-name").text("加载场景地图");
        Scene.SelectMap = e.target.value;
        Scene.CurrentMapCmd = Scene.MapCmdEnum.map_update;
        NavEvent.Publish(NavEvent.TopicEnum.cmdTopic, NavEvent.CmdEnum.Map_Update + ":" + e.target.value);
    });

    $("#btn-map-insert").click(function () {
        Scene.CreatMap = $("#map-insert-name")[0].value;
        Scene.CurrentMapCmd = Scene.MapCmdEnum.map_insert;
        $(this).buttonMarkup({ icon: "hrg-load" });
        NavEvent.Publish(NavEvent.TopicEnum.cmdTopic, NavEvent.CmdEnum.Map_Insert + ":" + $("#map-insert-name")[0].value);
    });


})
