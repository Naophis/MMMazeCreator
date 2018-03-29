
import { JSON_FORMAT } from "../Interface";
import { Observable } from "../Observable";
import { Setting } from "../Setting";

export class Canvas {
    private targetId: string;
    private canvasDivId: string;
    private canvasId: string;
    private offsetX: number = Setting.padding;
    private offsetY: number = Setting.padding;
    // private offset: number =  Setting.padding;
    private scale: number = 1;
    private defaultOffsetX: number = Setting.padding;
    private defaultOffsetY: number = Setting.padding;
    constructor(json: JSON_FORMAT) {
        this.targetId = json.targetId;
        this.canvasDivId = `cvsdiv_${this.targetId}`;
        this.canvasId = `cvs_${this.targetId}`;

        if (json.scale) {
            this.scale = json.scale;
        }
        this.createFrame();
    }

    createFrame() {
        let targetDom = document.getElementById(this.targetId);
        let defaultStyle = "display:none;overflow:hidden;"
        document.getElementById(this.targetId).insertAdjacentHTML("beforeend",
            `<div id="${this.canvasDivId}" style="${defaultStyle}"></div>`
        );
    }

    setupCanvas() {
        let canvas = <HTMLCanvasElement>document.getElementById(this.canvasId);
        let targetDom = document.getElementById(this.targetId);
        canvas.setAttribute('height', `${targetDom.clientHeight}px`);
        canvas.setAttribute('width', `${targetDom.clientHeight}px`);

        let ctx = canvas.getContext("2d");

        let canvasDiv = document.getElementById(this.canvasDivId);
        let height = canvasDiv.clientHeight;
        this.offsetX = (this.defaultOffsetX * this.scale) + 1;
        this.offsetY = ((this.defaultOffsetY + 2) * this.scale);
        console.log(this.offsetX, height - this.offsetY);


        ctx.strokeStyle = 'yellow';

        console.log(this.offsetX, height - this.offsetY);
        ctx.beginPath();
        ctx.moveTo(this.offsetX, height - this.offsetY);

        // ctx.lineTo(this.offset, this.offset + 2);

        ctx.lineTo(this.offsetX, this.offsetY * 2);
        ctx.lineTo(this.offsetX * 2, this.offsetY * 1);


        ctx.lineTo(this.offsetX * 30, this.offsetY * 1);


        ctx.stroke();
    }

    show() {
        let showStyle = "display:block;position:absolute;top:0;right:0;bottom:0;left:0;"
        let canvasDiv = document.getElementById(this.canvasDivId);
        let targetDom = document.getElementById(this.targetId);
        canvasDiv.style.display = "block";
        canvasDiv.style.position = "absolute";
        canvasDiv.style.height = `${targetDom.clientHeight}px`;
        canvasDiv.style.width = `${targetDom.clientHeight}px`;
        canvasDiv.style.backgroundColor = "rgba(255,255,255,0.0)";
        canvasDiv.innerHTML = "";

        canvasDiv.insertAdjacentHTML("beforeend",
            `<canvas id="${this.canvasId}" ></canvas>`
        );

        this.setupCanvas();


        let self = this;
        let evtFnc = function () {
            canvasDiv.removeEventListener("dblclick", evtFnc);
            canvasDiv.style.display = "none";
            canvasDiv.innerHTML = "";
        }
        canvasDiv.addEventListener("dblclick", evtFnc);
    }

    hide() {

    }
}