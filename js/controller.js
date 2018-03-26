var mapController = (function () {
    var size = 0;
    var mapController = function (size, data) {
        this.size = size;
        this.model = new mapModel(size);
        if (data) {
            this.inputMapData(data);
        }
    };
    var p = mapController.prototype;
    p.getWallData = function (x, y, dir) {
        return this.map[x][y];
    };
    p.isWall = function (x, y, dir) {
        return (this.map[x][y] & (0x01 * dir)) !== 0x00;
    };
    p.updateWallData = function (x, y, dir, isWall) {
        return this.map[x][y];
    };
    p.getMapData = function () {
        return this.model.map;
    };
    p.inputMapData = function (map) {
        this.model = new mapModel(this.size, map);
    };
    return mapController;
})();

var map;

function getMapData() {
    var m = map.getMapData();
    var length = m.length;
    var tmp = "[";
    for (var i = 0; i < length; i++) {
        tmp += "[";
        for (var j = 0; j < length; j++) {
            tmp += m[i][j];
            if (j !== (length - 1)) {
                tmp += ",";
            }
        }
        tmp += "]";
        if (i !== (length - 1)) {
            tmp += ",";
        }
    }
    tmp += "]";

    $("#map_result").html(tmp);
}

function readMap(d) {
    console.log(d.length);
    console.log(d);
    map = new mapController(d.length, d);
    console.log(map);
}

function applyMapData(mapData) {
    if (!mapData) {
        return;
    }
    if (!mapData.size || !mapData.maze) {
        return;
    }
    var size = mapData.size;
    var mazeData = arrayToMatrix(mapData.maze, size);
    map = new mapController(size, mazeData);
}
var arrayToMatrix = function (array, mazeSize) {
    var map = [];
    var index = 0;
    for (var i = 0; i < mazeSize; i++) {
        this.map[i] = [];
        for (var j = 0; j < mazeSize; j++) {
            this.map[j][i] = array[index++];
        }
    }
    return map;
};