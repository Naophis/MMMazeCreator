import { Model } from "./Model";
import { JSON_FORMAT } from "./Interface";
import { Observable } from "./Observable";

export class Controller {
    private model: Model;

    constructor(json: JSON_FORMAT, observer: Observable) {
        this.model = new Model(json, observer);
    }

    getWallData(x: number, y: number, dir: number): number {
        const map = this.model.getMapData();
        return map[x][y];
    }

    isWall(x: number, y: number, dir: number): boolean {
        const map = this.model.getMapData();
        return (map[x][y] & (0x01 * dir)) !== 0x00;
    }

    // updateWallData(x, y, dir, isWall): void {
    //     return this.map[x][y];
    // }

    getMapData(): Array<Array<number>> {
        return this.model.getMapData();
    }
}