import {fitCircleToPoints} from "../utils";
import {CANVAS_SIZE} from "../constants";

export class Draw {
    ctx = null
    color = "#fff"
    points = new Array(6).fill(0)
    mouse  = {x : 0, y : 0, button : false, point: 0, isCreating: false }

    constructor(ctx) {
        this.ctx = ctx;
    }

    drawPoint(x, y, rad) {
        if (!this.ctx) return;
        this.ctx.strokeStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, rad, 0, Math.PI * 2);
        this.ctx.stroke();
    }

    drawPoints(drag, col = "#aef193") {
        this.setColor(col)
        drag.nearest = -1;

        let i = 0, x, y;
        let minDist = 20;
        while (i < this.points.length) {
            this.drawPoint(x = this.points[i++], y = this.points[i++], 6);

            const dist = (x - this.mouse.x) ** 2 + (y - this.mouse.y) ** 2;
            if (dist < minDist) {
                minDist = dist;
                drag.nearest = i-2;
            }
        }
    }

    drawTracer(idx, col = "#fff") {
        if (!this.ctx) return;
        this.setColor(col);

        this.drawPoint(this.points[idx++],this.points[idx++],6);
        this.drawPoint(this.mouse.x,this.mouse.y,6);

        this.ctx.strokeStyle = this.color;
        this.ctx.beginPath();
        this.ctx.lineTo(this.points[0],this.points[1]);
        this.ctx.lineTo(this.mouse.x,this.mouse.y);
        this.ctx.stroke();
    }

    drawLine(col = '#fff') {
        if (!this.ctx) return;
        this.setColor(col);
        this.ctx.strokeStyle = this.color;
        this.ctx.beginPath();

        const circle = fitCircleToPoints(this.points);
        if (circle) {
            const ang1 = Math.atan2(this.points[1] - circle.y, this.points[0]- circle.x);
            const ang2 = Math.atan2(this.points[5] - circle.y, this.points[4]- circle.x);
            this.ctx.arc(circle.x, circle.y, circle.radius, ang1, ang2, circle.CCW);
        } else {
            this.ctx.lineTo(this.points[0], this.points[1]);
            this.ctx.lineTo(this.points[2], this.points[3]);
            this.ctx.lineTo(this.points[4],this. points[5]);
        }

        this.ctx.stroke();
    }

    setPoints() {
        if (this.mouse.point < 1) {
            this.mouse.isCreating = true
            this.points[this.mouse.point++] = this.mouse.x;
            this.points[this.mouse.point++] = this.mouse.y;
        } else {
            this.points[this.mouse.point++] = this.calculateMiddlePointCoordinate(this.mouse.x)
            this.points[this.mouse.point++] = this.calculateMiddlePointCoordinate(this.mouse.y)
            this.points[this.mouse.point++] = this.mouse.x;
            this.points[this.mouse.point++] = this.mouse.y;

            this.mouse.point = 0;
            this.mouse.isCreating = false
        }
    }

    calculateMiddlePointCoordinate(mousePointCoordinate) {
        return this.points[this.mouse.point - 3] + ((mousePointCoordinate - this.points[this.mouse.point - 3]) / 2);
    }

    isNotInDrawingRange() {
        const points = [...this.points];
        points.splice(2,2);
        return points[0] > CANVAS_SIZE.W || points[2] > CANVAS_SIZE.W || points[1] > CANVAS_SIZE.H || points[3] > CANVAS_SIZE.H
    }
    isSomePointIsntSettled() {
        return this.points.some(p => p < 0);
    }

    setColor(col) {
        this.color = col;
    }
}