import {Cvs, Drag, Draw} from "./entities";
import {updateFrame} from "./utils";
import {keyEvents, mouseEvents} from "./events";
import {KEY_EVENTS, MOUSE_EVENTS} from "./constants";

const cvsIns = new Cvs(canvas);
const cvs = cvsIns.canvas;
const ctx = cvsIns.getContext();

const draw = new Draw(ctx);
const drag = new Drag(ctx);

(function init() {
    Math.TAU = Math.PI * 2;
    requestAnimationFrame(() => updateFrame(cvsIns,cvs,ctx,draw,drag))
})()

// Subscribe to events
MOUSE_EVENTS.map(name => document.addEventListener(name, (e) => {
    requestAnimationFrame(() => updateFrame(cvsIns,cvs,ctx,draw,drag));
    mouseEvents(e, cvs, draw, drag)
}));
KEY_EVENTS.map(name => document.addEventListener(name, (e) => keyEvents(e,cvs,ctx,draw)))