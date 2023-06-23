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
            drag.dragMove(cvsIns,draw)
        }
        return;
    }

    draw.drawPoints(drag);
    draw.drawLine();
    drag.dragDetect(cvsIns,draw);
    drag.dragMove(cvsIns,draw);
}