var BrushEvent = BrushEvent || {
    REVISION: '0.0.6.0-2016-12.22',
    mousePressed: false,
    lastX: 0,
    lastY: 0,
    ctx: null,
    mapEditcolor: "",
    mapEditlineWidth: "",

    Draw: function (x, y, isDown, color, linWidth) {
        if (isDown) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = color;
            this.ctx.lineWidth = linWidth;
            this.ctx.lineJoin = "round";
            this.ctx.moveTo(this.lastX, this.lastY);
            this.ctx.lineTo(x, y);
            this.ctx.closePath();
            this.ctx.stroke();
        }
        this.lastX = x;
        this.lastY = y;
    },
    enableCanvasEdit: function (id) {
        BrushEvent.ctx = document.getElementById(id).getContext("2d");
        $("#" + id).on("touchstart touchmove touchend", function (event) {
            switch (event.type) {
                case "touchstart":
                    event.preventDefault(); 
                    BrushEvent.mousePressed = true;
                    BrushEvent.Draw(event.touches[0].clientX - $(this).offset().left,
                         event.touches[0].clientY - $(this).offset().top,
                         false,
                         BrushEvent.mapEditcolor,
                         BrushEvent.mapEditlineWidth);
                    break;
                case "touchmove":
                    event.preventDefault();
                    if (BrushEvent.mousePressed) {
                        BrushEvent.Draw(event.touches[0].clientX - $(this).offset().left,
                            event.touches[0].clientY - $(this).offset().top,
                            true,
                            BrushEvent.mapEditcolor,
                            BrushEvent.mapEditlineWidth);
                    }
                    break;
                case "touchend":
                    BrushEvent.mousePressed = false;
                    break;
                default:

            }
        });
        $("#" + id).on("mousedown mousemove mouseup", function (event) {
            switch (event.type) {
                case "mousedown":
                    event.preventDefault();
                    BrushEvent.mousePressed = true;
                    BrushEvent.Draw(event.clientX - $(this).offset().left,
                         event.clientY - $(this).offset().top,
                         false,
                         BrushEvent.mapEditcolor,
                         BrushEvent.mapEditlineWidth);
                    break;
                case "mousemove":
                    event.preventDefault();
                    if (BrushEvent.mousePressed) {
                        BrushEvent.Draw(event.clientX - $(this).offset().left,
                            event.clientY - $(this).offset().top,
                            true,
                            BrushEvent.mapEditcolor,
                            BrushEvent.mapEditlineWidth);
                    }
                    break;
                case "mouseup":
                    BrushEvent.mousePressed = false;
                    break;
                default:
            }
        });
    },
    disableCanvasEdit: function (id) {
        $("#" + id).off("touchstart touchmove touchend");
        $("#" + id).off("mousedown mousemove mouseup");
    },

};
