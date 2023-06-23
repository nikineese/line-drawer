import {CANVAS_SIZE} from "../constants";

export function resetCanvas(cvs,ctx) {
    ctx.setTransform(1,0,0,1,0,0);
    let w = cvs.width, h = cvs.height
    if (w !== CANVAS_SIZE.W || h !== CANVAS_SIZE.H) {
        w = cvs.width = CANVAS_SIZE.W
        h = cvs.height = CANVAS_SIZE.H
    } else {
        ctx.clearRect(0,0,w,h);
    }
}
