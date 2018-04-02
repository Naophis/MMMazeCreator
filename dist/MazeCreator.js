/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/MazeCreator.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Controller.ts":
/*!***************************!*\
  !*** ./src/Controller.ts ***!
  \***************************/
/*! exports provided: Controller */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Controller\", function() { return Controller; });\n/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Model */ \"./src/Model.ts\");\n\r\nvar Controller = /** @class */ (function () {\r\n    function Controller(json, observer) {\r\n        this.model = new _Model__WEBPACK_IMPORTED_MODULE_0__[\"Model\"](json, observer);\r\n    }\r\n    Controller.prototype.getWallData = function (x, y, dir) {\r\n        var map = this.model.getMapData();\r\n        return map[x][y];\r\n    };\r\n    Controller.prototype.isWall = function (x, y, dir) {\r\n        var map = this.model.getMapData();\r\n        return (map[x][y] & (0x01 * dir)) !== 0x00;\r\n    };\r\n    // updateWallData(x, y, dir, isWall): void {\r\n    //     return this.map[x][y];\r\n    // }\r\n    Controller.prototype.getMapData = function () {\r\n        return this.model.getMapData();\r\n    };\r\n    return Controller;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./src/Controller.ts?");

/***/ }),

/***/ "./src/MazeCreator.ts":
/*!****************************!*\
  !*** ./src/MazeCreator.ts ***!
  \****************************/
/*! exports provided: MazeCreator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MazeCreator\", function() { return MazeCreator; });\n/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Controller */ \"./src/Controller.ts\");\n/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Observable */ \"./src/Observable.ts\");\n/* harmony import */ var _canvas_Canvas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./canvas/Canvas */ \"./src/canvas/Canvas.ts\");\n/* harmony import */ var _search_Search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./search/Search */ \"./src/search/Search.ts\");\n/// <reference path=\"../node_modules/@types/node/index.d.ts\"/>\r\n\r\n\r\n\r\n\r\nvar MazeCreator = /** @class */ (function () {\r\n    function MazeCreator(json) {\r\n        var param = {\r\n            size: 16,\r\n            targetId: undefined,\r\n            scale: 1,\r\n            bgColor: \"rgba(0,0,0,0)\",\r\n            color: \"#111\"\r\n        };\r\n        this.observer = new _Observable__WEBPACK_IMPORTED_MODULE_1__[\"Observable\"]();\r\n        if (json.size) {\r\n            param.size = json.size;\r\n        }\r\n        if (json.targetId) {\r\n            param.targetId = json.targetId;\r\n        }\r\n        if (json.scale) {\r\n            param.scale = json.scale;\r\n        }\r\n        if (json.bgColor) {\r\n            param.bgColor = json.bgColor;\r\n        }\r\n        if (json.color) {\r\n            param.color = json.color;\r\n        }\r\n        document.getElementById(param.targetId).innerHTML = \"\";\r\n        this.ctrl = new _Controller__WEBPACK_IMPORTED_MODULE_0__[\"Controller\"](param, this.observer);\r\n        this.canvas = new _canvas_Canvas__WEBPACK_IMPORTED_MODULE_2__[\"Canvas\"](param);\r\n        this.search = new _search_Search__WEBPACK_IMPORTED_MODULE_3__[\"Search\"]();\r\n    }\r\n    MazeCreator.prototype.exportAsString = function () {\r\n        var map = this.ctrl.getMapData();\r\n        var size = map.length;\r\n        var tmp = \"\";\r\n        for (var i = 0; i < size; i++) {\r\n            tmp += \"[\";\r\n            for (var j = 0; j < size; j++) {\r\n                tmp += map[i][j];\r\n                if (j !== (size - 1)) {\r\n                    tmp += \",\";\r\n                }\r\n            }\r\n            tmp += \"]\";\r\n            if (i !== (size - 1)) {\r\n                tmp += \",\";\r\n            }\r\n        }\r\n        tmp += \"]\";\r\n        return tmp;\r\n    };\r\n    MazeCreator.prototype.on = function (key, fnc) {\r\n        this.observer.subscribe(key, fnc);\r\n    };\r\n    /**\r\n     * import data\r\n     */\r\n    MazeCreator.prototype.import = function () {\r\n    };\r\n    MazeCreator.prototype.step = function () {\r\n        this.search.setModel(this.ctrl.getMapData());\r\n    };\r\n    return MazeCreator;\r\n}());\r\n\r\nwindow[\"MazeCreator\"] = MazeCreator;\r\n\n\n//# sourceURL=webpack:///./src/MazeCreator.ts?");

/***/ }),

/***/ "./src/Model.ts":
/*!**********************!*\
  !*** ./src/Model.ts ***!
  \**********************/
/*! exports provided: Model */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Model\", function() { return Model; });\n/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View */ \"./src/View.ts\");\n/// <reference path=\"../node_modules/@types/node/index.d.ts\"/>\r\n\r\nvar Model = /** @class */ (function () {\r\n    function Model(json, observer) {\r\n        this.size = json.size;\r\n        this.map = json.inportData ? json.inportData : [];\r\n        this.observer = observer;\r\n        if (!json.inportData) {\r\n            for (var i = 0; i < this.size; i++) {\r\n                this.map[i] = [];\r\n                for (var j = 0; j < this.size; j++) {\r\n                    this.map[i][j] = 0;\r\n                }\r\n            }\r\n            for (var i = 0; i < this.size; i++) {\r\n                for (var j = 0; j < this.size; j++) {\r\n                    var wall = 0;\r\n                    if (i === 0) {\r\n                        wall |= 8;\r\n                    }\r\n                    else if (i == this.size - 1) {\r\n                        wall |= 1;\r\n                    }\r\n                    if (j === 0) {\r\n                        wall |= 4;\r\n                    }\r\n                    else if (j == this.size - 1) {\r\n                        wall |= 2;\r\n                    }\r\n                    this.map[j][i] = wall;\r\n                }\r\n            }\r\n        }\r\n        this.view = new _View__WEBPACK_IMPORTED_MODULE_0__[\"View\"](json, this);\r\n    }\r\n    Model.prototype.getMapData = function () {\r\n        return this.map;\r\n    };\r\n    Model.prototype.getWallData = function (x, y, dir) {\r\n        return this.map[x][y];\r\n    };\r\n    Model.prototype.isWall = function (x, y, dir) {\r\n        return (this.map[x][y] & (0x01 * dir)) !== 0x00;\r\n    };\r\n    Model.prototype.updateWallData = function (x, y, dir, isWall) {\r\n        if (x < 0 || x >= this.size || y < 0 || y >= this.size) {\r\n            return true;\r\n        }\r\n        if (isWall) {\r\n            this.map[x][y] |= 0x01 * dir;\r\n            this.getObserver().publish(\"change\", {\r\n                x: x,\r\n                y: y,\r\n                isWall: isWall,\r\n                wall: this.map[x][y]\r\n            });\r\n            return true;\r\n        }\r\n        else {\r\n            this.map[x][y] = (this.map[x][y] & 0xf0) | (this.map[x][y] & (~(0x01 * dir) & 0x0f));\r\n            this.getObserver().publish(\"change\", {\r\n                x: x,\r\n                y: y,\r\n                isWall: isWall,\r\n                wall: this.map[x][y]\r\n            });\r\n            return false;\r\n        }\r\n    };\r\n    Model.prototype.getObserver = function () {\r\n        return this.observer;\r\n    };\r\n    return Model;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./src/Model.ts?");

/***/ }),

/***/ "./src/Observable.ts":
/*!***************************!*\
  !*** ./src/Observable.ts ***!
  \***************************/
/*! exports provided: Observable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Observable\", function() { return Observable; });\nvar Observable = /** @class */ (function () {\r\n    function Observable() {\r\n        this.eventList = [];\r\n    }\r\n    Observable.prototype.subscribe = function (key, fnc) {\r\n        // let exist = this.eventList.some(element => {\r\n        //     return element.key === key;\r\n        // });\r\n        // if (!exist) {\r\n        this.eventList.push({\r\n            key: key,\r\n            fnc: fnc\r\n        });\r\n        // }\r\n    };\r\n    Observable.prototype.publish = function (key, args) {\r\n        this.eventList.forEach(function (evt) {\r\n            if (evt.key === key) {\r\n                evt.fnc(args);\r\n            }\r\n        });\r\n    };\r\n    Observable.prototype.unsubscribe = function (key) {\r\n        var newList = this.eventList.map(function (evt) {\r\n            if (evt.key !== key) {\r\n                return evt;\r\n            }\r\n        });\r\n        this.eventList = newList;\r\n    };\r\n    return Observable;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./src/Observable.ts?");

/***/ }),

/***/ "./src/Setting.ts":
/*!************************!*\
  !*** ./src/Setting.ts ***!
  \************************/
/*! exports provided: Setting */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Setting\", function() { return Setting; });\nvar Setting = /** @class */ (function () {\r\n    function Setting() {\r\n    }\r\n    Setting.padding = 16;\r\n    return Setting;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./src/Setting.ts?");

/***/ }),

/***/ "./src/View.ts":
/*!*********************!*\
  !*** ./src/View.ts ***!
  \*********************/
/*! exports provided: View */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"View\", function() { return View; });\n/* harmony import */ var _Setting__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Setting */ \"./src/Setting.ts\");\n\r\nvar View = /** @class */ (function () {\r\n    function View(json, model) {\r\n        this.paddingSize = _Setting__WEBPACK_IMPORTED_MODULE_0__[\"Setting\"].padding;\r\n        this.btnClassName = \"wallBtn\";\r\n        this.targetId = json.targetId;\r\n        this.scale = json.scale;\r\n        this.bgColor = json.bgColor;\r\n        this.color = json.color;\r\n        this.size = json.size;\r\n        this.paddingSize *= this.scale;\r\n        this.model = model;\r\n        this.createButtonMap(json.size);\r\n        this.applyModel(json.size, model.getMapData());\r\n    }\r\n    View.prototype.applyModel = function (size, map) {\r\n        for (var i = 0; i < size; i++) {\r\n            for (var j = 0; j < size; j++) {\r\n                this.set(j, i, 1, ((map[j][i] & 0x01) == 0x01));\r\n                this.set(j, i, 2, ((map[j][i] & 0x02) == 0x02));\r\n                this.set(j, i, 4, ((map[j][i] & 0x04) == 0x04));\r\n                this.set(j, i, 8, ((map[j][i] & 0x08) == 0x08));\r\n            }\r\n        }\r\n    };\r\n    View.prototype.createButtonMap = function (size) {\r\n        var targetDom = document.getElementById(this.targetId);\r\n        var headeStyle = \"float:left;\";\r\n        headeStyle += \"max-height:\" + (this.paddingSize * 2 + 2) + \"px;\";\r\n        headeStyle += \"min-width:\" + (this.paddingSize * 2 + 2) + \"px;\";\r\n        headeStyle += \"background-color:rgba(0,0,0,0);\";\r\n        headeStyle += \"border:none;\";\r\n        var tmp = \"\";\r\n        for (var i = -1; i < size + 1; i++) {\r\n            var line = void 0;\r\n            if (i >= 0 && i <= size - 1) {\r\n                line = \"<button style=\\\"\" + headeStyle + \"\\\" disabled>\" + i + \"</button>\";\r\n            }\r\n            else {\r\n                line = \"<button style=\\\"\" + headeStyle + \"\\\" disabled></button>\";\r\n            }\r\n            tmp += line;\r\n        }\r\n        var rows = \"\";\r\n        var rowStyle = \"max-height:\" + (this.paddingSize * 2 + 2) + \"px;\";\r\n        rowStyle += \"min-width:\" + (this.paddingSize * 2 + 2) + \"px;\";\r\n        rowStyle += \"background-color:rgba(0,0,0,0);\";\r\n        rowStyle += \"border:none;\";\r\n        for (var i = size - 1; i >= 0; i--) {\r\n            var tmpBox = \"\";\r\n            for (var j = 0; j < size; j++) {\r\n                tmpBox += \"<button class=\\\"\" + this.btnClassName + \"\\\" id=m_\" + this.targetId + \"_\" + j + \"_\" + i + \" x=\" + j + \" y=\" + i + \"></button>\";\r\n            }\r\n            rows += \"<div style=\\\"position:relative;z-index:100;line-height:0px;max-height:\" + (this.paddingSize * 2 + 2) + \"px;\\\">\" + tmpBox + \"</div>\";\r\n        }\r\n        targetDom.insertAdjacentHTML(\"beforeend\", rows);\r\n        this.setProp();\r\n    };\r\n    View.prototype.updateWall = function (x, y, dir, isWall) {\r\n        // let target = $(\"[x=\" + x + \"][y=\" + y + \"]\");\r\n    };\r\n    View.prototype.setProp = function () {\r\n        var _this = this;\r\n        var btns = document.querySelectorAll(\"#\" + this.targetId + \" .\" + this.btnClassName);\r\n        var length = btns.length;\r\n        var node = Array.prototype.slice.call(btns, 0);\r\n        node.forEach(function (element, index) {\r\n            element.style.backgroundColor = _this.bgColor;\r\n            element.style.color = _this.color;\r\n            element.style.padding = _this.paddingSize + \"px \" + _this.paddingSize + \"px\";\r\n            var x = parseInt(element.getAttribute(\"x\"));\r\n            var y = parseInt(element.getAttribute(\"y\"));\r\n            var w = element.clientWidth / 2;\r\n            var h = element.clientHeight / 2;\r\n            element.addEventListener(\"mouseover\", function (e) {\r\n                _this.model.getObserver().publish(\"mouseover\", {\r\n                    x: x,\r\n                    y: y\r\n                });\r\n            });\r\n            element.addEventListener(\"click\", function (e) {\r\n                var deltaW = e.offsetX - w;\r\n                var deltaH = h - e.offsetY;\r\n                if ((Math.abs(deltaW) - Math.abs(deltaH)) > 0) {\r\n                    if (deltaW > 0) {\r\n                        _this.update(x, y, (x + 1), y, 2, 4);\r\n                    }\r\n                    else {\r\n                        _this.update(x, y, (x - 1), y, 4, 2);\r\n                    }\r\n                }\r\n                else {\r\n                    if (deltaH > 0) {\r\n                        _this.update(x, y, x, (y + 1), 1, 8);\r\n                    }\r\n                    else {\r\n                        _this.update(x, y, x, (y - 1), 8, 1);\r\n                    }\r\n                }\r\n                _this.model.getObserver().publish(\"click\", {\r\n                    x: x,\r\n                    y: y\r\n                });\r\n            });\r\n        });\r\n    };\r\n    View.prototype.updateValidate = function (x, y, dir) {\r\n        if (x === 0 && dir === 0x04) {\r\n            return false;\r\n        }\r\n        if (x === (this.size - 1) && dir === 0x02) {\r\n            return false;\r\n        }\r\n        if (y === 0 && dir === 0x08) {\r\n            return false;\r\n        }\r\n        if (y === (this.size - 1) && dir === 0x01) {\r\n            return false;\r\n        }\r\n        return true;\r\n    };\r\n    View.prototype.update = function (x1, y1, x2, y2, d1, d2) {\r\n        if (x2 < 0 || x2 >= this.size || y2 < 0 || y2 >= this.size) {\r\n            return;\r\n        }\r\n        if (this.updateValidate(x1, y1, d1)) {\r\n            var isWall = this.model.isWall(x1, y1, d1);\r\n            this.apply(x1, y1, d1, isWall);\r\n            this.apply(x2, y2, d2, isWall);\r\n        }\r\n    };\r\n    View.prototype.apply = function (x, y, dir, isWall) {\r\n        var el = document.getElementById(\"m_\" + this.targetId + \"_\" + x + \"_\" + y);\r\n        if (!isWall) {\r\n            if (dir == 1) {\r\n                el.classList.add(\"hasNorth\");\r\n            }\r\n            else if (dir == 2) {\r\n                el.classList.add(\"hasEast\");\r\n            }\r\n            else if (dir == 4) {\r\n                el.classList.add(\"hasWest\");\r\n            }\r\n            else if (dir == 8) {\r\n                el.classList.add(\"hasSouth\");\r\n            }\r\n        }\r\n        else {\r\n            if (dir == 1) {\r\n                el.classList.remove(\"hasNorth\");\r\n            }\r\n            else if (dir == 2) {\r\n                el.classList.remove(\"hasEast\");\r\n            }\r\n            else if (dir == 4) {\r\n                el.classList.remove(\"hasWest\");\r\n            }\r\n            else if (dir == 8) {\r\n                el.classList.remove(\"hasSouth\");\r\n            }\r\n        }\r\n        this.model.updateWallData(x, y, dir, !isWall);\r\n    };\r\n    View.prototype.set = function (x, y, dir, isWall) {\r\n        var target = document.getElementById(\"m_\" + this.targetId + \"_\" + x + \"_\" + y);\r\n        var addClass = function (el, className) {\r\n            if (el.classList) {\r\n                el.classList.add(className);\r\n            }\r\n            else {\r\n                el.className += ' ' + className;\r\n            }\r\n        };\r\n        var removeClass = function (el, className) {\r\n            if (el.classList) {\r\n                el.classList.remove(className);\r\n            }\r\n            else {\r\n                el.className = el.className.replace(new RegExp('(^|\\\\b)' + className.split(' ').join('|') + '(\\\\b|$)', 'gi'), ' ');\r\n            }\r\n        };\r\n        if (isWall) {\r\n            if (dir === 1) {\r\n                addClass(target, \"hasNorth\");\r\n            }\r\n            else if (dir === 2) {\r\n                addClass(target, \"hasEast\");\r\n            }\r\n            else if (dir === 4) {\r\n                addClass(target, \"hasWest\");\r\n            }\r\n            else if (dir === 8) {\r\n                addClass(target, \"hasSouth\");\r\n            }\r\n        }\r\n        else {\r\n            if (dir === 1) {\r\n                removeClass(target, \"hasNorth\");\r\n            }\r\n            else if (dir === 2) {\r\n                removeClass(target, \"hasEast\");\r\n            }\r\n            else if (dir === 4) {\r\n                removeClass(target, \"hasWest\");\r\n            }\r\n            else if (dir === 8) {\r\n                removeClass(target, \"hasSouth\");\r\n            }\r\n        }\r\n    };\r\n    return View;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./src/View.ts?");

/***/ }),

/***/ "./src/canvas/Canvas.ts":
/*!******************************!*\
  !*** ./src/canvas/Canvas.ts ***!
  \******************************/
/*! exports provided: Canvas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Canvas\", function() { return Canvas; });\n/* harmony import */ var _Setting__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Setting */ \"./src/Setting.ts\");\n\r\nvar Canvas = /** @class */ (function () {\r\n    function Canvas(json) {\r\n        this.offsetX = _Setting__WEBPACK_IMPORTED_MODULE_0__[\"Setting\"].padding;\r\n        this.offsetY = _Setting__WEBPACK_IMPORTED_MODULE_0__[\"Setting\"].padding;\r\n        // private offset: number =  Setting.padding;\r\n        this.scale = 1;\r\n        this.defaultOffsetX = _Setting__WEBPACK_IMPORTED_MODULE_0__[\"Setting\"].padding;\r\n        this.defaultOffsetY = _Setting__WEBPACK_IMPORTED_MODULE_0__[\"Setting\"].padding;\r\n        this.targetId = json.targetId;\r\n        this.canvasDivId = \"cvsdiv_\" + this.targetId;\r\n        this.canvasId = \"cvs_\" + this.targetId;\r\n        if (json.scale) {\r\n            this.scale = json.scale;\r\n        }\r\n        this.createFrame();\r\n    }\r\n    Canvas.prototype.createFrame = function () {\r\n        var targetDom = document.getElementById(this.targetId);\r\n        var defaultStyle = \"display:block;overflow:hidden;\";\r\n        document.getElementById(this.targetId).insertAdjacentHTML(\"beforeend\", \"<div id=\\\"\" + this.canvasDivId + \"\\\" style=\\\"\" + defaultStyle + \"\\\"></div>\");\r\n        this.show();\r\n    };\r\n    Canvas.prototype.setupCanvas = function () {\r\n        var canvas = document.getElementById(this.canvasId);\r\n        var targetDom = document.getElementById(this.targetId);\r\n        canvas.setAttribute('height', targetDom.clientHeight + \"px\");\r\n        canvas.setAttribute('width', targetDom.clientHeight + \"px\");\r\n        var ctx = canvas.getContext(\"2d\");\r\n        var canvasDiv = document.getElementById(this.canvasDivId);\r\n        var height = canvasDiv.clientHeight;\r\n        this.offsetX = (this.defaultOffsetX * this.scale) + 1;\r\n        this.offsetY = ((this.defaultOffsetY + 2) * this.scale);\r\n        ctx.strokeStyle = 'yellow';\r\n        ctx.beginPath();\r\n        ctx.moveTo(this.offsetX, height - this.offsetY);\r\n        ctx.lineTo(this.offsetX, this.offsetY * 2);\r\n        ctx.lineTo(this.offsetX * 2, this.offsetY * 1);\r\n        ctx.lineTo(this.offsetX * 30, this.offsetY * 1);\r\n        ctx.stroke();\r\n    };\r\n    Canvas.prototype.show = function () {\r\n        var showStyle = \"display:block;position:absolute;top:0;right:0;bottom:0;left:0;\";\r\n        var canvasDiv = document.getElementById(this.canvasDivId);\r\n        var targetDom = document.getElementById(this.targetId);\r\n        canvasDiv.style.display = \"block\";\r\n        canvasDiv.style.position = \"absolute\";\r\n        canvasDiv.style.top = \"0px\";\r\n        canvasDiv.style.height = targetDom.clientHeight + \"px\";\r\n        canvasDiv.style.width = targetDom.clientHeight + \"px\";\r\n        canvasDiv.style.backgroundColor = \"rgba(0,0,0,0.0)\";\r\n        canvasDiv.style.zIndex = \"1\";\r\n        canvasDiv.innerHTML = \"\";\r\n        canvasDiv.insertAdjacentHTML(\"beforeend\", \"<canvas id=\\\"\" + this.canvasId + \"\\\" ></canvas>\");\r\n        this.setupCanvas();\r\n        var self = this;\r\n        var evtFnc = function () {\r\n            canvasDiv.removeEventListener(\"dblclick\", evtFnc);\r\n            // canvasDiv.style.display = \"none\";\r\n            canvasDiv.innerHTML = \"\";\r\n        };\r\n        canvasDiv.addEventListener(\"dblclick\", evtFnc);\r\n    };\r\n    Canvas.prototype.hide = function () {\r\n    };\r\n    return Canvas;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./src/canvas/Canvas.ts?");

/***/ }),

/***/ "./src/search/Search.ts":
/*!******************************!*\
  !*** ./src/search/Search.ts ***!
  \******************************/
/*! exports provided: Search */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Search\", function() { return Search; });\nvar Search = /** @class */ (function () {\r\n    function Search(canvas) {\r\n        this.inputMap = [];\r\n        this.x = 0;\r\n        this.y = 0;\r\n        this.dir = 0x01;\r\n        this.size = 16;\r\n    }\r\n    Search.prototype.setModel = function (inputMap) {\r\n        this.inputMap = [];\r\n        this.size = 0;\r\n        for (var _i = 0, inputMap_1 = inputMap; _i < inputMap_1.length; _i++) {\r\n            var i = inputMap_1[_i];\r\n            this.inputMap.push([]);\r\n            for (var _a = 0, i_1 = i; _a < i_1.length; _a++) {\r\n                var j = i_1[_a];\r\n                this.inputMap[this.size].push(j);\r\n            }\r\n            this.size++;\r\n        }\r\n        console.log(inputMap);\r\n        console.log(this.inputMap);\r\n    };\r\n    return Search;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./src/search/Search.ts?");

/***/ })

/******/ });