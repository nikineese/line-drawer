import {resetCanvas} from "./resetCanvas.js";

export function cleanFrame(cvs,ctx,draw) {
    resetCanvas(cvs,ctx)
    draw.mouse.isCreating = false
    draw.points.fill(0)
    draw.mouse.point = 0
}