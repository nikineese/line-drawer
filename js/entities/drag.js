export class Drag {
    ctx = null
    nearest
    dragIdx
    ox
    oy
    isDragging

    constructor(ctx) {
        this.ctx = ctx;
    }

    startDragging(cvsIns,draw) {
        if (this.nearest > -1) {
            if (draw.mouse.button) {
                if (!this.isDragging) {
                    this.isDragging = true;
                    this.ox = draw.points[this.nearest] - draw.mouse.x;
                    this.oy = draw.points[this.nearest+1] - draw.mouse.y;
                    this.dragIdx = this.nearest;
                }
            } else {
                cvsIns.setCursor("move");
            }
            draw.drawPoint(draw.points[this.nearest], draw.points[this.nearest + 1], 6, "red")
        }
    }

    endDragging(cvsIns,draw) {
        if (this.isDragging) {
            if (!draw.mouse.button) {
                this.isDragging = false;
            } else {
                draw.points[this.dragIdx] = draw.mouse.x + this.ox;
                draw.points[this.dragIdx + 1] = draw.mouse.y + this.oy;
                cvsIns.setCursor("none");
            }
        }
    }
}