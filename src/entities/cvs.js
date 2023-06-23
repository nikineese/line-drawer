export class Cvs {
    canvas = null
    ctx = null

    constructor(cvs) {
        this.canvas = cvs;
        this.setContext(this.canvas.getContext("2d"))
    }

    setCursor(cur) {
        if (!this.canvas) return;
        this.canvas.style.cursor = cur;
    }

    setContext(ctx) {
        this.ctx = ctx
    }

    getContext() {
        return this.ctx
    }
}