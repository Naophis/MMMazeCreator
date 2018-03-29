import { Model } from "./Model"
import { JSON_FORMAT } from "./Interface";
import { Setting } from "./Setting";

export class View {
    private size: number;
    private scale: number;
    private bgColor: string;
    private color: string;

    private paddingSize: number = Setting.padding;

    private model: Model;

    private targetId: string;
    private btnClassName: string = "wallBtn";

    constructor(json: JSON_FORMAT, model: Model) {

        this.targetId = json.targetId;

        this.scale = json.scale;
        this.bgColor = json.bgColor;
        this.color = json.color;
        this.size = json.size;
        this.paddingSize *= this.scale;
        this.model = model;

        this.createButtonMap(json.size);
        this.applyModel(json.size, model.getMapData());

    }

    applyModel(size: number, map: Array<Array<number>>): void {
        for (let i: number = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                this.set(j, i, 1, ((map[j][i] & 0x01) == 0x01));
                this.set(j, i, 2, ((map[j][i] & 0x02) == 0x02));
                this.set(j, i, 4, ((map[j][i] & 0x04) == 0x04));
                this.set(j, i, 8, ((map[j][i] & 0x08) == 0x08));
            }
        }
    }

    createButtonMap(size: number): void {
        let targetDom = document.getElementById(this.targetId);
        targetDom.innerHTML = "";

        let headeStyle = `float:left;
        max-height:${this.paddingSize * 2 + 2}px;
        min-width:${this.paddingSize * 2 + 2}px;
        background-color:rgba(0,0,0,0);
        border:none;
        `;
        // border: 1px solid rgba(255, 255, 255, 0.125);
        let tmp = "";
        for (let i: number = -1; i < size + 1; i++) {
            let line;
            if (i >= 0 && i <= size - 1) {
                line = `<button style="${headeStyle}" disabled>${i}</button>`;
            } else {
                line = `<button style="${headeStyle}" disabled></button>`;
            }
            tmp += line;
        }
        // targetDom.insertAdjacentHTML("beforeend", `<div class="map_row">${tmp}</div>`);

        let rows = "";
        let rowStyle = `max-height:${this.paddingSize * 2 + 2}px;
        min-width:${this.paddingSize * 2 + 2}px;
        background-color:rgba(0,0,0,0);
        border:none;
        `;
        for (let i: number = size - 1; i >= 0; i--) {
            let tmpBox = "";
            for (let j = 0; j < size; j++) {
                tmpBox += `<button class="${this.btnClassName}" id=m_${this.targetId}_${j}_${i} x=${j} y=${i}></button>`;
            }
            let head = "";//`<button class="btn_left" style="${rowStyle}" >${i}</button>`;
            let tail = "";//`<button class="btn_right" style="${rowStyle}">${i}</button>`;
            rows += `<div style="float:left;line-height:0px;max-height:${this.paddingSize * 2 + 2}px;">${head}${tmpBox}${tail}</div>`;
        }
        targetDom.insertAdjacentHTML("beforeend", rows);

        let line2 = "";
        for (let i: number = -1; i < size + 1; i++) {
            if (i >= 0 && i <= size - 1) {
                line2 += `<button class="btn_footer" style="${headeStyle}" disabled>${i}</button>`;
            } else {
                line2 += `<button style="${headeStyle}" disabled></button>`;
            }
        }
        // targetDom.insertAdjacentHTML("beforeend", `<div class="map_row" style="float:left;">${line2}</div>`);

        this.setProp();
    }

    updateWall(x: number, y: number, dir: number, isWall: Boolean): void {
        // let target = $("[x=" + x + "][y=" + y + "]");
    }

    setProp(): void {
        const btns = document.querySelectorAll(`#${this.targetId} .${this.btnClassName}`);
        const length = btns.length;
        const node = Array.prototype.slice.call(btns, 0);

        node.forEach((element, index) => {

            element.style.backgroundColor = this.bgColor;
            element.style.color = this.color;
            element.style.padding = `${this.paddingSize}px ${this.paddingSize}px`;

            const x: number = parseInt(element.getAttribute("x"));
            const y: number = parseInt(element.getAttribute("y"));
            const w: number = element.clientWidth / 2;
            const h: number = element.clientHeight / 2;
            element.addEventListener("mouseover", (e: MouseEvent) => {
                this.model.getObserver().publish("mouseover", {
                    x: x,
                    y: y
                });
            });
            element.addEventListener("click", (e: MouseEvent) => {
                let deltaW: number = e.offsetX - w;
                let deltaH: number = h - e.offsetY;
                if ((Math.abs(deltaW) - Math.abs(deltaH)) > 0) {
                    if (deltaW > 0) {
                        this.update(x, y, (x + 1), y, 2, 4);
                    } else {
                        this.update(x, y, (x - 1), y, 4, 2);
                    }
                } else {
                    if (deltaH > 0) {
                        this.update(x, y, x, (y + 1), 1, 8);
                    } else {
                        this.update(x, y, x, (y - 1), 8, 1);
                    }
                }
                this.model.getObserver().publish("click", {
                    x: x,
                    y: y
                });
            })
        });
    }

    private updateValidate(x: number, y: number, dir: number): boolean {
        if (x === 0 && dir === 0x04) {
            return false;
        }

        if (x === (this.size - 1) && dir === 0x02) {
            return false;
        }

        if (y === 0 && dir === 0x08) {
            return false;
        }

        if (y === (this.size - 1) && dir === 0x01) {
            return false;
        }
        return true;
    }

    update(x1: number, y1: number, x2: number, y2: number, d1: number, d2: number): void {
        if (x2 < 0 || x2 >= this.size || y2 < 0 || y2 >= this.size) {
            return;
        }

        if (this.updateValidate(x1, y1, d1)) {
            const isWall = this.model.isWall(x1, y1, d1);
            this.apply(x1, y1, d1, isWall);
            this.apply(x2, y2, d2, isWall);
        }
    }

    apply(x: number, y: number, dir: number, isWall: boolean): void {
        let el = document.getElementById(`m_${this.targetId}_${x}_${y}`);
        if (!isWall) {
            if (dir == 1) {
                el.classList.add("hasNorth");
            } else if (dir == 2) {
                el.classList.add("hasEast");
            } else if (dir == 4) {
                el.classList.add("hasWest");
            } else if (dir == 8) {
                el.classList.add("hasSouth");
            }
        } else {
            if (dir == 1) {
                el.classList.remove("hasNorth");
            } else if (dir == 2) {
                el.classList.remove("hasEast");
            } else if (dir == 4) {
                el.classList.remove("hasWest");
            } else if (dir == 8) {
                el.classList.remove("hasSouth");
            }
        }
        this.model.updateWallData(x, y, dir, !isWall);
    }

    set(x: number, y: number, dir: number, isWall: boolean): void {
        let target = document.getElementById(`m_${this.targetId}_${x}_${y}`);
        const addClass = function (el: HTMLElement, className: string) {
            if (el.classList) {
                el.classList.add(className);
            } else {
                el.className += ' ' + className;
            }
        };
        const removeClass = function (el: HTMLElement, className: string) {
            if (el.classList) {
                el.classList.remove(className);
            } else {
                el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            }
        };
        if (isWall) {
            if (dir === 1) {
                addClass(target, "hasNorth");
            } else if (dir === 2) {
                addClass(target, "hasEast");
            } else if (dir === 4) {
                addClass(target, "hasWest");
            } else if (dir === 8) {
                addClass(target, "hasSouth");
            }
        } else {
            if (dir === 1) {
                removeClass(target, "hasNorth");
            } else if (dir === 2) {
                removeClass(target, "hasEast");
            } else if (dir === 4) {
                removeClass(target, "hasWest");
            } else if (dir === 8) {
                removeClass(target, "hasSouth");
            }
        }
    }
}
