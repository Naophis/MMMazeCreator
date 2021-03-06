/// <reference path="../node_modules/@types/node/index.d.ts"/>
import { Controller } from "./Controller";
import { JSON_FORMAT } from "./Interface";
import { Observable } from "./Observable";
import { Canvas } from "./canvas/Canvas";
import { Search } from "./search/Search";

export class MazeCreator {
    private ctrl: Controller;
    private format: JSON_FORMAT;
    private observer: Observable;
    private canvas: Canvas;
    private search: Search;
    constructor(json: JSON_FORMAT) {
        let param: JSON_FORMAT = {
            size: 16,
            targetId: undefined,
            scale: 1,
            bgColor: "rgba(0,0,0,0)",
            color: "#111"
        };

        this.observer = new Observable();

        if (json.size) {
            param.size = json.size;
        }

        if (json.targetId) {
            param.targetId = json.targetId;
        }

        if (json.scale) {
            param.scale = json.scale;
        }

        if (json.bgColor) {
            param.bgColor = json.bgColor;
        }

        if (json.color) {
            param.color = json.color;
        }
        document.getElementById(param.targetId).innerHTML = "";
        this.ctrl = new Controller(param, this.observer);
        this.canvas = new Canvas(param);
        this.search = new Search(param);
    }

    exportAsString(): string {
        const map = this.ctrl.getMapData();
        const size = map.length;
        let tmp: string = "";
        for (let i = 0; i < size; i++) {
            tmp += "[";
            for (let j = 0; j < size; j++) {
                tmp += map[i][j];
                if (j !== (size - 1)) {
                    tmp += ",";
                }
            }
            tmp += "]";
            if (i !== (size - 1)) {
                tmp += ",";
            }
        }
        tmp += "]";
        return tmp;
    }

    on(key: string, fnc: Function) {
        this.observer.subscribe(key, fnc);
    }

    /**
     * import data
     */
    import(): void {

    }

    step() {
        this.search.setModel(this.ctrl.getMapData());
    }

}
window["MazeCreator"] = MazeCreator;