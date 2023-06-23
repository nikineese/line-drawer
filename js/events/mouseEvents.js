export function mouseEvents(e,cvs,draw,drag){
    const bounds = cvs.getBoundingClientRect();
    draw.mouse.x = e.pageX - bounds.left - scrollX;
    draw.mouse.y = e.pageY - bounds.top - scrollY;

    if (e.type === 'click' && !drag.isDragging) {
        draw.setLinePointsCoordinates(draw.points,draw.mouse)
    }
    draw.mouse.button = e.type === "mousedown" ? true : e.type === "mouseup" ? false : draw.mouse.button;
}