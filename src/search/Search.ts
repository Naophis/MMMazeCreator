import { Model } from "../Model";
import { JSON_FORMAT } from "../Interface";

const North: number = 0x01;
const East: number = 0x02;
const West: number = 0x04;
const South: number = 0x08;
const ILLEGAL_ARGUMENT: number = 8096;

export class Search {
    private x: number = 0;
    private y: number = 0;
    private dir: number = 0x01;

    private inputMap: Array<Array<number>> = [];
    private map: Array<Array<number>> = [];
    private dist: Array<Array<number>> = [];

    private size: number = 16;

    constructor(json: JSON_FORMAT, canvas?: any) {
        this.size = json.size;

        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                this.inputMap[i][j] = 0;
                this.map[i][j] = 0;
                this.dist[i][j] = 0;
            }
        }
    }

    setModel(inputMap: Array<Array<number>>): void {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                this.inputMap[i][j] = (this.inputMap[i][j] & 0xff) | inputMap[i][j];
            }
        }
    }

    log() {
        console.log("distmap")
    }



    clearMap(x: number, y: number, isFull: boolean) {

    }

    isProceed(x: number, y: number, dir: number) {
        if (x < 0 || x >= this.size || y < 0 || y >= this.size)
            return false;
        return ((this.map[x][y] / dir) & 0x11) == 0x10;
    }

    existWall(x: number, y: number, dir: number) {
        if (x < 0 || x >= this.size || y < 0 || y >= this.size)
            return true;
        return ((this.map[x][y] / dir) & 0x01) == 0x01;
    }

    getDist(x: number, y: number) {
        if (x < 0 || x >= this.size || y < 0 || y >= this.size)
            return ILLEGAL_ARGUMENT;
        return this.dist[x][y];
    }

    makeDistMap(x: number, y: number, mode: number, isFull: boolean) {
        let X: number = 0, Y: number = 0;
        let pt1: number;
        let q: Array<number> = [];
        let head: number, tail: number;
        let D: number = 1;
        let i: number = 0, j: number = 0;
        let b: boolean;
        q[0] = x * 16 + y;
        head = 0;
        tail = 1;
        this.clearMap(x, y, isFull);
        while (head != tail) {
            Y = q[head] & 0x0f;
            X = (q[head] & 0xf0) >> 4;
            head++;
            pt1 = this.dist[X][Y] + 1;
            D = 1;
            while (D <= 8) {
                i = 0;
                j = 0;
                if (D == North) {
                    j = 1;
                } else if (D == East) {
                    i = 1;
                } else if (D == West) {
                    i = -1;
                } else if (D == South) {
                    j = -1;
                }
                b = false;
                if (mode == 1) {
                    b = this.isProceed(X, Y, D);
                } else {
                    b = !this.existWall(X, Y, D);
                }
                if (b && this.getDist(X + i, Y + j) == ILLEGAL_ARGUMENT) {
                    if (X + i < 0 || X + i >= this.size || Y + j < 0
                        || Y + j >= this.size) {
                    } else {
                        this.dist[X + i][Y + j] = pt1;
                        q[tail] = ((X + i) << 4) | (Y + j);
                        tail++;
                    }
                }
                D *= 2;
            }
        }
    }
}
