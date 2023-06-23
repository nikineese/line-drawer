import {cleanFrame} from "../utils";

export function keyEvents(e,cvs,ctx,draw) {
    switch (e.key) {
        case 'Escape':
            cleanFrame(cvs,ctx,draw)
            break
        default:
            break
    }
}