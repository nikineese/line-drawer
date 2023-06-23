import {resetCanvas} from "./resetCanvas.js";

export function updateFrame(cvsIns,cvs,ctx,draw,drag) {
    cvsIns.setCursor("default")
    resetCanvas(cvs, ctx)

    if (draw.mouse.isCreating) {
        draw.drawTracer(0)
        return
    }
    if (draw.isSomePointIsntSettled() || draw.isNotInDrawingRange()) {
        if (drag.isDragging) {
            drag.endDragging(cvsIns,draw)
        }
        return;
    }

    draw.drawPoints(drag);
    draw.drawLine();
    drag.startDragging(cvsIns,draw);
    drag.endDragging(cvsIns,draw);
}