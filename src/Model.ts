/// <reference path="../node_modules/@types/node/index.d.ts"/>
import { View } from "./View";
import { JSON_FORMAT } from "./Interface";
import { Observable } from "./Observable";

export class Model {
    private size: number;
    private map: Array<Array<number>>;
    private view: View;
    private observer: Observable;
    constructor(json: JSON_FORMAT, observer: Observable) {
        this.size = json.size;
        this.map = json.inportData ? json.inportData : [];
        this.observer = observer;
        if (!json.inportData) {
            for (let i = 0; i < this.size; i++) {
                this.map[i] = [];
                for (let j = 0; j < this.size; j++) {
                    this.map[i][j] = 0;
                }
            }
            for (let i = 0; i < this.size; i++) {
                for (let j = 0; j < this.size; j++) {
                    let wall = 0;
                    if (i === 0) {
                        wall |= 8;
                    } else if (i == this.size - 1) {
                        wall |= 1;
                    }
                    if (j === 0) {
                        wall |= 4;
                    } else if (j == this.size - 1) {
                        wall |= 2;
                    }
                    this.map[j][i] = wall;
                }
            }
        }
        this.view = new View(json, this);
    }

    getMapData() {
        return this.map;
    }

    getWallData(x: number, y: number, dir: number): number {
        return this.map[x][y];
    }

    isWall(x: number, y: number, dir: number): boolean {
        return (this.map[x][y] & (0x01 * dir)) !== 0x00;
    }

    updateWallData(x: number, y: number, dir: number, isWall: boolean): boolean {
        if (x < 0 || x >= this.size || y < 0 || y >= this.size) {
            return true;
        }
        if (isWall) {
            this.map[x][y] |= 0x01 * dir;
            this.getObserver().publish("change", {
                x: x,
                y: y,
                isWall: isWall,
                wall: this.map[x][y]
            });
            return true;
        } else {
            this.map[x][y] = (this.map[x][y] & 0xf0) | (this.map[x][y] & (~(0x01 * dir) & 0x0f));
            this.getObserver().publish("change", {
                x: x,
                y: y,
                isWall: isWall,
                wall: this.map[x][y]
            });
            return false;
        }
    }

    getObserver() {
        return this.observer;
    }

    // step(x: number, y: number, dir: number, isWall: boolean) {

    // }
}
