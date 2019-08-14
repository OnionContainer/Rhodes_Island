var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HashMapNode = /** @class */ (function () {
    function HashMapNode(key, value) {
        this.key = key;
        this.value = value;
    }
    return HashMapNode;
}());
var Struc;
(function (Struc) {
    var HashMap = /** @class */ (function () {
        function HashMap() {
            this._list = [];
        }
        HashMap.prototype.get = function (key) {
            for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
                var ele = _a[_i];
                if (ele.key === key) {
                    return ele.value;
                }
            }
            return null;
        };
        HashMap.prototype.getKeyByVal = function (val) {
            for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
                var ele = _a[_i];
                if (ele.value === val) {
                    return ele.key;
                }
            }
            return null;
        };
        HashMap.prototype.keyExist = function (key) {
            for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
                var ele = _a[_i];
                if (ele.key === key) {
                    return true;
                }
            }
            return false;
        };
        HashMap.prototype.set = function (key, value) {
            for (var n = 0; n < this._list.length; n += 1) {
                if (this._list[n].key === key) {
                    this._list[n].value = value;
                    return;
                }
            }
            this._list.push(new HashMapNode(key, value));
        };
        HashMap.prototype.remove = function (key) {
            var count = 0;
            for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
                var ele = _a[_i];
                if (ele.key === key) {
                    this._list.splice(count, 1);
                    return true;
                }
                count += 1;
            }
            return false;
        };
        Object.defineProperty(HashMap.prototype, "length", {
            get: function () {
                return this._list.length;
            },
            enumerable: true,
            configurable: true
        });
        return HashMap;
    }());
    Struc.HashMap = HashMap;
    var PointerList = /** @class */ (function () {
        function PointerList(source, initPoint) {
            if (source === void 0) { source = []; }
            if (initPoint === void 0) { initPoint = 0; }
            var _this = this;
            this._list = [];
            this._pointer = 0;
            source.forEach(function (ele) {
                _this._list.push(ele);
            });
        }
        Object.defineProperty(PointerList.prototype, "exceeding", {
            get: function () {
                return this._pointer >= this._list.length || this._pointer < 0;
            },
            enumerable: true,
            configurable: true
        });
        PointerList.prototype.read = function () {
            return this._list[this._pointer];
        };
        PointerList.prototype.step = function () {
            this._pointer += 1;
            return this;
        };
        PointerList.prototype.to = function (place) {
            this._pointer = place;
            return this;
        };
        PointerList.prototype.push = function (data) {
            this._list.push(data);
            return this;
        };
        PointerList.prototype.set = function (index, data) {
            this._list[index] = data;
            return this;
        };
        PointerList.prototype.next = function (shift) {
            if (shift === void 0) { shift = 1; }
            return this._list[this._pointer + shift];
        };
        Object.defineProperty(PointerList.prototype, "length", {
            get: function () {
                return this._list.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PointerList.prototype, "last", {
            get: function () {
                return this._list[this._list.length - 1];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PointerList.prototype, "pointer", {
            get: function () {
                return this._pointer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PointerList.prototype, "atEnd", {
            get: function () {
                return this._pointer === this._list.length - 1;
            },
            enumerable: true,
            configurable: true
        });
        return PointerList;
    }());
    Struc.PointerList = PointerList;
})(Struc = exports.Struc || (exports.Struc = {}));
},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataStructure_1 = require("./DataStructure");
var EventCentre = /** @class */ (function () {
    function EventCentre() {
    }
    EventCentre.on = function (field, type, caller, method, args) {
        if (!this._eventFields.keyExist(field)) {
            this._eventFields.set(field, new Laya.EventDispatcher());
        }
        this._eventFields.get(field).on(type, caller, method, args);
    };
    EventCentre.event = function (field, type, args) {
        if (!this._eventFields.keyExist(field)) {
            return;
        }
        this._eventFields.get(field).event(type, args);
    };
    EventCentre.once = function (field, type, caller, method, args) {
        if (!this._eventFields.keyExist(field)) {
            this._eventFields.set(field, new Laya.EventDispatcher());
        }
        this._eventFields.get(field).once(type, caller, method, args);
    };
    EventCentre._eventFields = new DataStructure_1.Struc.HashMap();
    return EventCentre;
}());
exports.default = EventCentre;
},{"./DataStructure":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
var GameField_1 = require("./SceneScript/GameField");
var Loading_1 = require("./SceneScript/Loading");
/*
* 游戏初始化配置;
*/
var GameConfig = /** @class */ (function () {
    function GameConfig() {
    }
    GameConfig.init = function () {
        var reg = Laya.ClassUtils.regClass;
        reg("SceneScript/GameField.ts", GameField_1.default);
        reg("SceneScript/Loading.ts", Loading_1.default);
    };
    GameConfig.width = 1400;
    GameConfig.height = 900;
    GameConfig.scaleMode = "noscale";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "LoadingScene.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    return GameConfig;
}());
exports.default = GameConfig;
GameConfig.init();
},{"./SceneScript/GameField":14,"./SceneScript/Loading":15}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataStructure_1 = require("../DataStructure");
var gameSet_URL = "./Database/GameSet.json", enemyDatabase_URL = "./Database/EnemyDatabase.json", operatorDatabase_URL = "./Database/OperatorDatabase.json";
var Database = /** @class */ (function () {
    function Database() {
        this.enemyData = Laya.loader.getRes(enemyDatabase_URL);
        this.operatorData = Laya.loader.getRes(operatorDatabase_URL);
        this.gameSet = Laya.loader.getRes(gameSet_URL);
        this.initTimeTable();
    }
    Database.prototype.initTimeTable = function () {
        var _this = this;
        this.timeTable = new DataStructure_1.Struc.PointerList();
        this.gameSet["timetableBref"].forEach(function (element) {
            var time = element["time"];
            var typeData = _this.enemyData[element["type"]];
            var path = _this.gameSet["paths"][element.path];
            _this.timeTable.push({ time: time, typeData: typeData, path: path });
        });
    };
    Database.prototype.isHappening = function (time) {
        return this.timeTable.read() && time === this.timeTable.read().time;
    };
    Database.prototype.readTimeEvent = function () {
        return this.timeTable.read();
    };
    Database.prototype.readTimeEventDone = function () {
        this.timeTable.step();
    };
    Database.prototype.getPath = function (pathName) {
        return this.gameSet["paths"][pathName];
    };
    Database.prototype.getEnemy = function (enemyName) {
        return this.enemyData[enemyName];
    };
    Database.prototype.getOperator = function (operatorName) {
        return this.operatorData[operatorName];
    };
    Database.prototype.getGround = function () {
        return this.gameSet["ground"];
    };
    return Database;
}());
exports.default = Database;
},{"../DataStructure":1}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var People_1 = require("./Interface/People");
var State_1 = require("./Interface/State");
var Present_1 = require("./Interface/Present");
var DataStructure_1 = require("../DataStructure");
var myMath_1 = require("../myMath");
/**
 * EnemyPresent
 */
var EnemyPresent = /** @class */ (function (_super) {
    __extends(EnemyPresent, _super);
    function EnemyPresent(father, data) {
        return _super.call(this, father, data) || this;
    }
    return EnemyPresent;
}(Present_1.default));
/**
 * EnemeState
 *
 */
var EnemyState = /** @class */ (function (_super) {
    __extends(EnemyState, _super);
    function EnemyState(data, path) {
        var _this = _super.call(this, data) || this;
        _this._xSpeed = 0;
        _this._ySpeed = 0;
        _this._path = new DataStructure_1.Struc.PointerList(path);
        // this._location = this._path.read()
        _this._x = _this._path.read()[0];
        _this._y = _this._path.read()[1];
        _this._speed = data["speed"];
        return _this;
    }
    Object.defineProperty(EnemyState.prototype, "x", {
        get: function () {
            return this._x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EnemyState.prototype, "y", {
        get: function () {
            return this._y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EnemyState.prototype, "atLastNode", {
        get: function () {
            return this._path.pointer === this._path.length - 1 &&
                this._x === this._path.last[0] &&
                this._y === this._path.last[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EnemyState.prototype, "isArrived", {
        get: function () {
            return this._path.read()[0] === this._x &&
                this._path.read()[1] === this._y;
        },
        enumerable: true,
        configurable: true
    });
    EnemyState.prototype.unitMove = function () {
        this._x = myMath_1.default.moveTo(this._x, this._xSpeed, this._path.read()[0]); //x轴移动
        this._y = myMath_1.default.moveTo(this._y, this._ySpeed, this._path.read()[1]); //y轴移动
    };
    EnemyState.prototype.setAxisSpeed = function () {
        var x_shift = this._path.read()[0] - this._x, //求x轴总距离
        y_shift = this._path.read()[1] - this._y, //求y轴总距离
        hypotenuse = Math.sqrt(Math.pow(x_shift, 2) + Math.pow(y_shift, 2)); //求直线总距离
        this._xSpeed = x_shift * this._speed / hypotenuse; //设置x轴速度
        this._ySpeed = y_shift * this._speed / hypotenuse; //设置y轴速度
    };
    EnemyState.prototype.nextAim = function () {
        this._path.step();
    };
    return EnemyState;
}(State_1.default));
/**
 * People
 *
 *
 *
 *
 *
 */
var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy(upperPath, father, enemyData, path, database) {
        var _this = _super.call(this) || this;
        _this._upperPath = upperPath;
        _this._data = enemyData;
        _this._present = new EnemyPresent(father, _this._data);
        _this._present.setSize(database.getGround()["size"]);
        // this._present.setPos(0,0)
        _this._state = new EnemyState(_this._data, path);
        console.log("Enemy对象创建完成");
        console.log(_this);
        console.log("=== === ===");
        return _this;
    }
    Enemy.prototype.update = function () {
        this.move();
    };
    Enemy.prototype.move = function () {
        /**
         * 函数说明
         * https://www.lucidchart.com/documents/view/96582305-ec6e-4c41-b178-aa78f91ce0d2/0
         */
        if (this._state.atLastNode) { //如果已到达终点
            this.move = function () { }; //则清空move函数
            return;
        }
        if (this._state.isArrived) { //如果已到达下一个节点
            this._state.nextAim(); //重设节点
            this._state.setAxisSpeed(); //计算速度
        }
        this._state.unitMove(); //进行一次移动
        this._present.setPos(this._state.x, this._state.y); //改变元素位置
    };
    return Enemy;
}(People_1.default));
exports.default = Enemy;
// export default class Enemy extends basic.People{
//     constructor(father:Laya.Sprite,upperPath:GameField,data:any,path:number[][]){
//         super()
//         this.state.init(data,path)
//         this.present.init(father, "Basic/There-2.png", 0,0)
//         // this.state.speed = 5
//         // this.state.setAxisSpeed()
//         this.update = ()=>{
//             // this.state.updatePosition()
//             // this.present.setPosition(this.state.position)
//             // this.state.isArrived() && this.state.nextAim()
//         }
//         Laya.timer.once(2000,this,console.log,[this])
//     }
// }
/*
export default class Enemy extends basic.People{
    public speed:number = 0.4       //速度
    public CentreShift:number = 35  //与Ground.Grids.size的一半保持一致，稍后改为变量
    private hitDoctor:number = 1    //进门之后打刀客他多少血
    // public path:number[][] = [
    //     [0,0],
    //     [100,100],
    //     [0,0]
    // ]
    
    public path:number[][] = []     //路径对象
    public father:Laya.Sprite       //原点坐标对象
    private place:Grids             //地图方格对象
    private upperPath:GameField     //含有此实例的实例

    constructor(father:Laya.Sprite, place:Grids, upperPath:GameField){
        super()
        // alert(1)
        this.upperPath = upperPath
        this.father = father
        this.place = place
        this.state.ele = Laya.Sprite.fromImage("Basic/There.png")
        // alert(2)

        // const start:number[] = this.path.shift()
        this.state.ele.pos(0,0).size(30,30)
        father.addChild(this.state.ele)

        this.SetPath()
        this.move()
    }

    private SetPath(){
        const points:number[][] = [
            [0,0],
            [0,5],
            [5,5],
            [5,3],
            [3,3],
            [3,0],
            [5,0],
            [5,9]
        ]
        points.forEach((ele)=>{
            // console.log(this.upperPath)
            const rec:Laya.Rectangle = this.upperPath.grids.RecMap[ele[0]][ele[1]]
            const current:number[] = [
                rec.x,
                rec.y
            ]
            this.path.push(current)
        })
    }

    private move(){
        const target:number[] = this.path.shift()
        if (target === undefined){
            this.goal()
            return
        }
        const {x,y} = this.state.ele
        const hypotenuse:number = Math.sqrt(Math.pow(x-target[0],2)+Math.pow(y-target[1],2))
        const time:number = Math.floor(hypotenuse/this.speed)
        const tween:Laya.Tween = Laya.Tween.to(this.state.ele, {x:target[0],y:target[1]}, time, null,
            Laya.Handler.create(this,this.move),100)

    }
    

    private goal(){
        this.upperPath.doctor.damaged(this.hitDoctor)
    }
}
*/ 
},{"../DataStructure":1,"../myMath":16,"./Interface/People":7,"./Interface/Present":8,"./Interface/State":9}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Grids = /** @class */ (function () {
    function Grids(upperPath, father, database) {
        this.spriteGroup = [];
        this.rectGroup = [];
        this.upperPath = upperPath;
        this.father = father;
        this.database = database;
        //创建游戏场地: Start
        var ground = database.getGround(), width = ground["width"], height = ground["height"], size = ground["size"], matrix = ground["matrix"];
        for (var x = 0; x < width; x += 1) {
            this.spriteGroup[x] = [];
            this.rectGroup[x] = [];
            for (var y = 0; y < height; y += 1) {
                //创建sprite: Start
                var sprite = Laya.Sprite.fromImage("Basic/Rec.png");
                sprite.pos(x * size, y * size).size(size, size);
                father.addChild(sprite);
                this.spriteGroup[x][y] = sprite;
                //创建Sprite: End
                //创建Rectangle: Start
                var rect = new Laya.Rectangle(x * size, y * size, size, size);
                this.rectGroup[x][y] = rect;
                //创建Rectangle: End
            }
        }
        //创建游戏场地: End
        console.log("Grids对象创建完成");
        console.log(this);
        console.log("=== === ===");
    }
    return Grids;
}());
exports.Grids = Grids;
// export class Grids{
//     public Map:Array<Array<Laya.Sprite>> = []
//     public RecMap:Array<Array<Laya.Rectangle>> = []
//     private static size:number = 90
//     private father:Laya.Sprite
//     private upperPath:GameField
//     private data:JSON
//     //old
//     //new
//     private database:Database
//     constructor(father:Laya.Sprite, upperPath:GameField, database:Database){
//         this.database = database
//         // this.father = father
//         // this.upperPath = upperPath
//         // this.data = data
//         // let cols = data["ground"]["width"],
//         // raws = data["ground"]["height"]
//         // for (let n = 0; n < raws; n += 1) {
//         //     this.Map[n] = []
//         //     this.RecMap[n] = []
//         //     for (let m = 0; m < cols; m += 1) {
//         //         this.initElement(n,m)
//         //     }
//         // }
//         // console.log(this.RecMap)
//     }
//     initElement(raw:number,count:number){
//         const current:Laya.Sprite = Laya.Sprite.fromImage("Basic/Rec.png");//载入图片
//         current.pos(Grids.size*count, Grids.size*raw)
//             .size(Grids.size,Grids.size)//依据static size属性改变大小、依据编号改变位置
//         current.name = `grid${raw}-${count}`//重命名为 grid行数-列数
//         this.Map[raw][count] = current
//         this.RecMap[raw][count] = new Laya.Rectangle(current.x,current.y,Grids.size,Grids.size)
//         // current.on(Laya.Event.CLICK, this.upperPath, this.upperPath.addOperator, [this.getPlace(count,raw)])//设定鼠标点击事件
//         //向GameField中添加Operator实例
//         this.father.addChild(current)
//     }
//     getPlace(count:number,raw:number):number[]{
//         //raw:第几行
//         //count:第几个
//         return [
//             this.RecMap[raw][count].x,
//             this.RecMap[raw][count].y
//         ]
//     }
// }
},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var People = /** @class */ (function () {
    function People() {
    }
    return People;
}());
exports.default = People;
},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Present：表现类
 */
var Present = /** @class */ (function () {
    function Present(father, data) {
        this._sprite = Laya.Sprite.fromImage(data["img"]);
        this._father = father;
        this._father.addChild(this._sprite);
    }
    Present.prototype.setSize = function (size) {
        this._sprite.size(size, size);
    };
    Present.prototype.setPos = function (x, y) {
        this._sprite.pos(x, y);
    };
    return Present;
}());
exports.default = Present;
},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var State = /** @class */ (function () {
    function State(data) {
    }
    return State;
}());
exports.default = State;
},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var People_1 = require("./People");
var Operator = /** @class */ (function (_super) {
    __extends(Operator, _super);
    function Operator(upperPath, position) {
        var _this = _super.call(this) || this;
        _this.init();
        // this.state.init()
        _this.present.init(upperPath.UISet, "Basic/OperatorSample_A.png", position[0], position[1]);
        console.log(_this);
        return _this;
    }
    Operator.prototype.init = function () {
    };
    return Operator;
}(People_1.basic.People));
exports.default = Operator;
},{"./People":11}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var basic;
(function (basic) {
    var Present = /** @class */ (function () {
        function Present() {
        }
        Present.prototype.init = function (father, url, x, y) {
            if (url === void 0) { url = "Basic/OperatorSample_A.png"; }
            this.father = father;
            this.ImageURL = url;
            this.ele = Laya.Sprite.fromImage(this.ImageURL);
            this.ele.size(Present.size, Present.size);
            this.father.addChild(this.ele);
            this.setPosition([x, y]);
        };
        Present.prototype.setPosition = function (newPosition) {
            this.ele.pos(newPosition[0], newPosition[1]);
        };
        Present.size = 90;
        return Present;
    }());
    basic.Present = Present;
    var State = /** @class */ (function () {
        // public hitBox:Laya.Rectangle
        function State() {
            this._x = 0;
            this._y = 0;
            this._speed = 0;
            this._xSpeed = 0;
            this._ySpeed = 0;
            this._path = [];
            this.aimPointer = -1;
        }
        State.prototype.init = function (data, path) {
            this.name = data["name"];
            this._speed = data["speed"];
            this.initPath(path);
        };
        State.prototype.initPath = function (getpath) {
            var _this = this;
            getpath.forEach(function (ele, index) {
                _this._path[index] = [];
                _this._path[index][0] = ele[0];
                _this._path[index][1] = ele[1];
            });
        };
        State.prototype.getAim = function () {
            return this._path[this.aimPointer];
        };
        State.prototype.updatePosition = function () {
            var aim = this.getAim();
            this._x = this.moveTo(this._x, this._xSpeed, aim[0]);
            this._y = this.moveTo(this._y, this._ySpeed, aim[1]);
            // console.log({x:this.x,y:this.y})
        };
        State.prototype.moveTo = function (front, shift, end) {
            if (shift === 0) {
                return front;
            }
            return shift > 0 ?
                ((front + shift) > end ? end : front + shift) :
                ((front + shift) < end ? end : front + shift);
        };
        State.prototype.isArrived = function () {
            var aim = this.getAim();
            return this._x === aim[0] && this._y === aim[1];
        };
        // private static size:number = 90//待修改
        State.hitSize = 80;
        return State;
    }());
    basic.State = State;
    var People = /** @class */ (function () {
        function People() {
            this.state = new State();
            this.present = new Present();
        }
        People.prototype.sethitBox = function (size, position) {
        };
        People.prototype.update = function () {
        };
        return People;
    }());
    basic.People = People;
})(basic = exports.basic || (exports.basic = {}));
},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventCentre_1 = require("../EventCentre");
var SideOperator = /** @class */ (function () {
    function SideOperator(upperPath, father, data, database) {
        this._upperPath = upperPath;
        this._father = father;
        this._data = data;
        this._database = database;
        this._unit = Laya.Sprite.fromImage(data["img"]);
        this._UISet = this._father.parent;
        father.addChild(this._unit);
        this.init_Drag();
    }
    SideOperator.prototype.init_Drag = function () {
        this._unit.on(Laya.Event.MOUSE_DOWN, this, this.onDrag);
    };
    SideOperator.prototype.onDrag = function () {
        var _this = this;
        ////////////////////////////////////
        var spr = Laya.Sprite.fromImage(this._data["img"]), size = this._database.getGround()["size"];
        spr.size(size, size);
        var draging = function () {
            var x = _this._UISet.mouseX - _this._UISet.mouseX % size, y = _this._UISet.mouseY - _this._UISet.mouseY % size;
            if (x < 0 ||
                y < 0 ||
                x > (_this._database.getGround()["width"] - 1) * size ||
                y > (_this._database.getGround()["height"] - 1) * size) {
                return;
            }
            spr.pos(x, y);
        };
        Laya.timer.loop(10, this, draging);
        this._UISet.addChild(spr);
        this._unit.stage.once(Laya.Event.MOUSE_UP, this, function () {
            Laya.timer.clear(_this, draging);
            EventCentre_1.default.event("Global", "Spawn");
            spr.parent.removeChild(spr);
            console.log(_this._UISet);
        });
    };
    SideOperator.prototype.size = function (width, height) {
        this._unit.size(width, height);
    };
    SideOperator.prototype.pos = function (x, y) {
        this._unit.pos(x, y);
    };
    return SideOperator;
}());
var SideField = /** @class */ (function () {
    function SideField(upperPath, father, list, database) {
        // private _operatorList:string[]
        this._sideOperators = [];
        this._upperPath = upperPath;
        this._father = father;
        // this._operatorList = list
        this._database = database;
        this._frame = Laya.Sprite.fromImage("Basic/Rec.png");
        var ground = database.getGround();
        this._frame.size(100, ground["size"] * ground["height"]).pos(ground["size"] * ground["width"], 0);
        this._father.addChild(this._frame);
        this.initSide(list);
        console.log("SideField对象创建完成");
        console.log(this);
        console.log("=== === ===");
    }
    SideField.prototype.initSide = function (list) {
        var _this = this;
        list.forEach(function (ele, index) {
            var data = _this._database.getOperator(ele);
            var currentSide = new SideOperator(_this, _this._frame, data, _this._database);
            currentSide.pos(0, index * 100);
            currentSide.size(100, 100);
            _this._sideOperators.push(currentSide);
        });
        this.initSide = function () { };
    };
    return SideField;
}());
exports.default = SideField;
},{"../EventCentre":2}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameConfig_1 = require("./GameConfig");
var Main = /** @class */ (function () {
    function Main() {
        //根据IDE设置初始化引擎		
        if (window["Laya3D"])
            Laya3D.init(GameConfig_1.default.width, GameConfig_1.default.height);
        else
            Laya.init(GameConfig_1.default.width, GameConfig_1.default.height, Laya["WebGL"]);
        Laya["Physics"] && Laya["Physics"].enable();
        Laya["DebugPanel"] && Laya["DebugPanel"].enable();
        Laya.stage.scaleMode = GameConfig_1.default.scaleMode;
        Laya.stage.screenMode = GameConfig_1.default.screenMode;
        //兼容微信不支持加载scene后缀场景
        Laya.URL.exportSceneToJson = GameConfig_1.default.exportSceneToJson;
        //打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
        if (GameConfig_1.default.debug || Laya.Utils.getQueryString("debug") == "true")
            Laya.enableDebugPanel();
        if (GameConfig_1.default.physicsDebug && Laya["PhysicsDebugDraw"])
            Laya["PhysicsDebugDraw"].enable();
        if (GameConfig_1.default.stat)
            Laya.Stat.show();
        Laya.alertGlobalError = true;
        //激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
        Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
    }
    Main.prototype.onVersionLoaded = function () {
        //激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
        Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
    };
    Main.prototype.onConfigLoaded = function () {
        //加载IDE指定的场景
        GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene);
    };
    return Main;
}());
//激活启动类
new Main();
},{"./GameConfig":3}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("../ui/layaMaxUI");
var Enemy_1 = require("../GameObj/Enemy");
var Grids_1 = require("../GameObj/Grids");
var Operator_1 = require("../GameObj/Operator");
var Database_1 = require("../GameObj/Database");
// import GameEventManager from "../GameObj/GameEvent";
var SideField_1 = require("../GameObj/SideField");
var EventCentre_1 = require("../EventCentre");
var log = console.log;
var GameField = /** @class */ (function (_super) {
    __extends(GameField, _super);
    function GameField() {
        var _this = _super.call(this) || this;
        _this._enemies = [];
        _this._operators = [];
        _this._time_frame = 0;
        ///////////////////////////////
        _this.stage.on("fuck", _this, function (a) { console.log(a); }, ["5"]);
        _this.stage.event("fuck", ["6"]);
        ////////////////////////////////
        _this._database = new Database_1.default();
        _this._grids = new Grids_1.Grids(_this, _this.UISet, _this._database);
        _this.sideField = new SideField_1.default(_this, _this.UISet, ["bird", "sb", "bird"], _this._database); //参数["bird"]将在选人功能完成后改为变量
        // this._gameEventManager = new GameEventManager(this)
        ///////////////////////////////
        EventCentre_1.default.on("Global", "Spawn", _this, _this.newOperator);
        ///////////////////////////////
        Laya.timer.loop(20, _this, _this.toLoop);
        return _this;
    }
    GameField.prototype.newOperator = function () {
        this._operators.push(new Operator_1.default(this, [0, 0]));
        console.log("Spawn Operator!!!!!!!");
    };
    GameField.prototype.toLoop = function () {
        while (this._database.isHappening(this._time_frame)) {
            this._enemies.push(new Enemy_1.default(this, this.UISet, this._database.readTimeEvent().typeData, this._database.readTimeEvent().path, this._database));
            this._database.readTimeEventDone();
        }
        this._enemies.forEach(function (ele) {
            ele.update();
        });
        this._time_frame += 1;
    };
    return GameField;
}(layaMaxUI_1.ui.GameFieldSceneUI));
exports.default = GameField;
// export default class GameField extends ui.GameFieldSceneUI{
//     /**
//      * sb
//      */
//     public grids:Grids
//     public doctor:Doctor
//     public operators:Array<Operator> = []
//     public enemies:Array<Enemy> = []
//     private onKeydown:Function
//     public GameSet:JSON
//     public EnemyDatabase:JSON
//     public TimeTable:Struc.PointerList<timeNode>
//     private time:number
//     // public frameLoop:Laya.timer
//     constructor(){
//         super()
//         this
//         Laya.loader.load([gameSet_json, enemyDatabase], Laya.Handler.create(this, this.onLoaded),null,Laya.Loader.JSON)
//         //加载敌人数据库
//         //加载地图  
//     }
//     private onLoaded(){//加载完成后执行此函数
//         this.GameSet = Laya.loader.getRes(gameSet_json)//获取已加载的地图
//         this.EnemyDatabase = Laya.loader.getRes(enemyDatabase)//获取已加载的敌人数据
//         this.initTimeTable()//从地图数据中加载时间表
//         this.time = 0//将时间设为0;时间单位为帧
//         this.grids = new Grids(this.UISet,this,this.GameSet)//依据已加载的地图数据，设置地图
//         this.doctor = new Doctor()//初始化刀客他对象
//         this.keyBoardEventSetup()//初始化键盘事件
//         /**测试代码 */
//         // this.enemies.push(new Enemy(this.UISet, this, "bug0", []))
//         /**测试代码End */
//         Laya.timer.loop(20,this,this.frameLoop)//开启游戏帧循环
//     }
//     private initTimeTable(){
//         this.TimeTable = new Struc.PointerList<timeNode>()
//         const rawTable:Array<any> = this.GameSet["timetable"]
//         rawTable.forEach((ele)=>{
//             this.TimeTable.push({
//                 time:ele.time,
//                 type:this.EnemyDatabase[ele.type],
//                 path:this.GameSet["paths"][ele.path]
//             })
//         })
//         log(this.TimeTable)
//     }
//     private keyBoardEventSetup(){
//         this.onKeydown = (e:Laya.Event) => {
//             /**测试代码 */
//             if (e.keyCode === Laya.Keyboard.E) {
//                 console.log(this.enemies)
//             }
//             if (e.keyCode === Laya.Keyboard.F) {
//                 console.log(this.enemies[0])
//             }
//             /**测试代码End */
//         }
//         Laya.stage.on(Laya.Event.KEY_DOWN,this,this.onKeydown)
//     }
//     public frameLoop(){//每帧都会执行的代码块
//         if (this.TimeTable.read() && this.time === this.TimeTable.read().time) {
//             this.enemies.push(new Enemy(this.UISet,this,
//                 this.TimeTable.read().type,
//                 this.TimeTable.read().path))
//             this.TimeTable.step()
//         }
//         this.operators.forEach((ele)=>{//执行所有干员对象的update方法
//             ele.update()
//         })
//         this.enemies.forEach((ele)=>{//执行所有敌人对象的update方法
//             ele.update()
//         })
//         this.time ++
//     }
//     addOperator(place:number[]){//在地图上添加干员
//         //此方法被作为回调函数提供给this.grids对象，在点击地图空格时执行
//         this.operators.push(new Operator(this,place))
//     }
// }
},{"../EventCentre":2,"../GameObj/Database":4,"../GameObj/Enemy":5,"../GameObj/Grids":6,"../GameObj/Operator":10,"../GameObj/SideField":12,"../ui/layaMaxUI":17}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("../ui/layaMaxUI");
var Loading = /** @class */ (function (_super) {
    __extends(Loading, _super);
    function Loading() {
        var _this = _super.call(this) || this;
        var gameSet = "./Database/GameSet.json", enemyDatabase = "./Database/EnemyDatabase.json", operatorDatabase = "./Database/OperatorDatabase.json";
        Laya.loader.load([gameSet, enemyDatabase, operatorDatabase], Laya.Handler.create(_this, _this.onLoaded), null, Laya.Loader.JSON);
        return _this;
    }
    Loading.prototype.onLoaded = function () {
        Laya.Scene.open("GameFieldScene.scene");
        // console.log(Laya.loader)
    };
    return Loading;
}(layaMaxUI_1.ui.LoadingSceneUI));
exports.default = Loading;
},{"../ui/layaMaxUI":17}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MyMath = /** @class */ (function () {
    function MyMath() {
    }
    MyMath.moveTo = function (front, shift, end) {
        if (shift === 0) {
            return front;
        }
        return shift > 0 ?
            ((front + shift) > end ? end : front + shift) :
            ((front + shift) < end ? end : front + shift);
    };
    return MyMath;
}());
exports.default = MyMath;
},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Scene = Laya.Scene;
var REG = Laya.ClassUtils.regClass;
var ui;
(function (ui) {
    var GameFieldSceneUI = /** @class */ (function (_super) {
        __extends(GameFieldSceneUI, _super);
        function GameFieldSceneUI() {
            return _super.call(this) || this;
        }
        GameFieldSceneUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.loadScene("GameFieldScene");
        };
        return GameFieldSceneUI;
    }(Scene));
    ui.GameFieldSceneUI = GameFieldSceneUI;
    REG("ui.GameFieldSceneUI", GameFieldSceneUI);
    var LoadingSceneUI = /** @class */ (function (_super) {
        __extends(LoadingSceneUI, _super);
        function LoadingSceneUI() {
            return _super.call(this) || this;
        }
        LoadingSceneUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.loadScene("LoadingScene");
        };
        return LoadingSceneUI;
    }(Scene));
    ui.LoadingSceneUI = LoadingSceneUI;
    REG("ui.LoadingSceneUI", LoadingSceneUI);
})(ui = exports.ui || (exports.ui = {}));
},{}]},{},[13])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xheWEvTGF5YUFpcklERS9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvRGF0YVN0cnVjdHVyZS50cyIsInNyYy9FdmVudENlbnRyZS50cyIsInNyYy9HYW1lQ29uZmlnLnRzIiwic3JjL0dhbWVPYmovRGF0YWJhc2UudHMiLCJzcmMvR2FtZU9iai9FbmVteS50cyIsInNyYy9HYW1lT2JqL0dyaWRzLnRzIiwic3JjL0dhbWVPYmovSW50ZXJmYWNlL1Blb3BsZS50cyIsInNyYy9HYW1lT2JqL0ludGVyZmFjZS9QcmVzZW50LnRzIiwic3JjL0dhbWVPYmovSW50ZXJmYWNlL1N0YXRlLnRzIiwic3JjL0dhbWVPYmovT3BlcmF0b3IudHMiLCJzcmMvR2FtZU9iai9QZW9wbGUudHMiLCJzcmMvR2FtZU9iai9TaWRlRmllbGQudHMiLCJzcmMvTWFpbi50cyIsInNyYy9TY2VuZVNjcmlwdC9HYW1lRmllbGQudHMiLCJzcmMvU2NlbmVTY3JpcHQvTG9hZGluZy50cyIsInNyYy9teU1hdGgudHMiLCJzcmMvdWkvbGF5YU1heFVJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1RBO0lBR0kscUJBQVksR0FBSyxFQUFFLEtBQU87UUFDdEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQVBBLEFBT0MsSUFBQTtBQUVELElBQWMsS0FBSyxDQWdIbEI7QUFoSEQsV0FBYyxLQUFLO0lBQ2Y7UUFFSTtZQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFBO1FBQ25CLENBQUM7UUFDTSxxQkFBRyxHQUFWLFVBQVcsR0FBSztZQUNaLEtBQWdCLFVBQVUsRUFBVixLQUFB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Q0FOQSxBQU1DLENBTm1DLEtBQUssR0FNeEM7SUFOWSxpQkFBYyxpQkFNMUIsQ0FBQTtJQUNELEdBQUcsQ0FBQyxtQkFBbUIsRUFBQyxjQUFjLENBQUMsQ0FBQztBQUM1QyxDQUFDLEVBdEJhLEVBQUUsR0FBRixVQUFFLEtBQUYsVUFBRSxRQXNCZiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcclxuY2xhc3MgSGFzaE1hcE5vZGU8SyxWPntcclxuICAgIHB1YmxpYyBrZXk7XHJcbiAgICBwdWJsaWMgdmFsdWU7XHJcbiAgICBjb25zdHJ1Y3RvcihrZXk6SywgdmFsdWU6Vil7XHJcbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgbW9kdWxlIFN0cnVje1xyXG4gICAgZXhwb3J0IGNsYXNzIEhhc2hNYXA8SyxWPntcclxuICAgICAgICBwcml2YXRlIF9saXN0OkFycmF5PEhhc2hNYXBOb2RlPEssVj4+XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICAgICAgdGhpcy5fbGlzdCA9IFtdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQoa2V5OkspOlZ7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGVsZSBvZiB0aGlzLl9saXN0KXtcclxuICAgICAgICAgICAgICAgIGlmIChlbGUua2V5ID09PSBrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlLnZhbHVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldEtleUJ5VmFsKHZhbDpWKTpLe1xyXG4gICAgICAgICAgICBmb3IgKGxldCBlbGUgb2YgdGhpcy5fbGlzdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVsZS52YWx1ZSA9PT0gdmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZS5rZXlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMga2V5RXhpc3Qoa2V5OkspOmJvb2xlYW57XHJcbiAgICAgICAgICAgIGZvciAobGV0IGVsZSBvZiB0aGlzLl9saXN0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlLmtleSA9PT0ga2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHNldChrZXk6Syx2YWx1ZTpWKTp2b2lke1xyXG4gICAgICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IHRoaXMuX2xpc3QubGVuZ3RoOyBuICs9IDEpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9saXN0W25dLmtleSA9PT0ga2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGlzdFtuXS52YWx1ZSA9IHZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fbGlzdC5wdXNoKG5ldyBIYXNoTWFwTm9kZTxLLFY+KGtleSx2YWx1ZSkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyByZW1vdmUoa2V5OkspOmJvb2xlYW57XHJcbiAgICAgICAgICAgIGxldCBjb3VudDpudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBlbGUgb2YgdGhpcy5fbGlzdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVsZS5rZXkgPT09IGtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xpc3Quc3BsaWNlKGNvdW50LDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb3VudCArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IGxlbmd0aCgpOm51bWJlcntcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3QubGVuZ3RoXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBQb2ludGVyTGlzdDxFPntcclxuICAgICAgICBwcml2YXRlIF9saXN0OkFycmF5PEU+ID0gW11cclxuICAgICAgICBwcml2YXRlIF9wb2ludGVyOm51bWJlciA9IDBcclxuICAgICAgICBjb25zdHJ1Y3Rvcihzb3VyY2U6QXJyYXk8RT4gPSBbXSwgaW5pdFBvaW50Om51bWJlciA9IDApe1xyXG4gICAgICAgICAgICBzb3VyY2UuZm9yRWFjaCgoZWxlKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGlzdC5wdXNoKGVsZSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBleGNlZWRpbmcoKTpib29sZWFue1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcG9pbnRlciA+PSB0aGlzLl9saXN0Lmxlbmd0aCB8fCB0aGlzLl9wb2ludGVyIDwgMFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVhZCgpOkV7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9saXN0W3RoaXMuX3BvaW50ZXJdXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGVwKCk6UG9pbnRlckxpc3Q8RT57XHJcbiAgICAgICAgICAgIHRoaXMuX3BvaW50ZXIrPTFcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRvKHBsYWNlOm51bWJlcik6UG9pbnRlckxpc3Q8RT57XHJcbiAgICAgICAgICAgIHRoaXMuX3BvaW50ZXIgPSBwbGFjZVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVzaChkYXRhOkUpOlBvaW50ZXJMaXN0PEU+e1xyXG4gICAgICAgICAgICB0aGlzLl9saXN0LnB1c2goZGF0YSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldChpbmRleDpudW1iZXIsZGF0YTpFKTpQb2ludGVyTGlzdDxFPntcclxuICAgICAgICAgICAgdGhpcy5fbGlzdFtpbmRleF0gPSBkYXRhXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIG5leHQoc2hpZnQ6bnVtYmVyID0gMSk6RXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RbdGhpcy5fcG9pbnRlcitzaGlmdF1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBsZW5ndGgoKTpudW1iZXJ7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9saXN0Lmxlbmd0aFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGxhc3QoKTpFe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdFt0aGlzLl9saXN0Lmxlbmd0aC0xXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IHBvaW50ZXIoKTpudW1iZXJ7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wb2ludGVyXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgYXRFbmQoKTpib29sZWFue1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcG9pbnRlciA9PT0gdGhpcy5fbGlzdC5sZW5ndGggLSAxXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU3RydWMgfSBmcm9tIFwiLi9EYXRhU3RydWN0dXJlXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRDZW50cmV7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2V2ZW50RmllbGRzOlN0cnVjLkhhc2hNYXA8c3RyaW5nLCBMYXlhLkV2ZW50RGlzcGF0Y2hlcj4gPSBuZXcgU3RydWMuSGFzaE1hcDxzdHJpbmcsIExheWEuRXZlbnREaXNwYXRjaGVyPigpO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6RXZlbnRDZW50cmVcclxuICAgIFxyXG4gICAgcHVibGljIHN0YXRpYyBvbihmaWVsZDpzdHJpbmcsIHR5cGU6c3RyaW5nLCBjYWxsZXI6YW55LCBtZXRob2Q6RnVuY3Rpb24sIGFyZ3M/OmFueVtdKTp2b2lke1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuX2V2ZW50RmllbGRzLmtleUV4aXN0KGZpZWxkKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9ldmVudEZpZWxkcy5zZXQoZmllbGQsIG5ldyBMYXlhLkV2ZW50RGlzcGF0Y2hlcigpKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9ldmVudEZpZWxkcy5nZXQoZmllbGQpLm9uKHR5cGUsY2FsbGVyLG1ldGhvZCwgYXJncylcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGV2ZW50KGZpZWxkOnN0cmluZywgdHlwZTpzdHJpbmcsIGFyZ3M/OmFueVtdKTp2b2lke1xyXG4gICAgICAgIGlmICghdGhpcy5fZXZlbnRGaWVsZHMua2V5RXhpc3QoZmllbGQpKXtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2V2ZW50RmllbGRzLmdldChmaWVsZCkuZXZlbnQodHlwZSxhcmdzKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgb25jZShmaWVsZDpzdHJpbmcsIHR5cGU6c3RyaW5nLCBjYWxsZXI6YW55LCBtZXRob2Q6RnVuY3Rpb24sIGFyZ3M/OmFueVtdKTp2b2lke1xyXG4gICAgICAgIGlmICghdGhpcy5fZXZlbnRGaWVsZHMua2V5RXhpc3QoZmllbGQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50RmllbGRzLnNldChmaWVsZCwgbmV3IExheWEuRXZlbnREaXNwYXRjaGVyKCkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2V2ZW50RmllbGRzLmdldChmaWVsZCkub25jZSh0eXBlLGNhbGxlcixtZXRob2QsIGFyZ3MpXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iLCIvKipUaGlzIGNsYXNzIGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IExheWFBaXJJREUsIHBsZWFzZSBkbyBub3QgbWFrZSBhbnkgbW9kaWZpY2F0aW9ucy4gKi9cclxuaW1wb3J0IEdhbWVGaWVsZCBmcm9tIFwiLi9TY2VuZVNjcmlwdC9HYW1lRmllbGRcIlxuaW1wb3J0IExvYWRpbmcgZnJvbSBcIi4vU2NlbmVTY3JpcHQvTG9hZGluZ1wiXHJcbi8qXHJcbiog5ri45oiP5Yid5aeL5YyW6YWN572uO1xyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ29uZmlne1xyXG4gICAgc3RhdGljIHdpZHRoOm51bWJlcj0xNDAwO1xyXG4gICAgc3RhdGljIGhlaWdodDpudW1iZXI9OTAwO1xyXG4gICAgc3RhdGljIHNjYWxlTW9kZTpzdHJpbmc9XCJub3NjYWxlXCI7XHJcbiAgICBzdGF0aWMgc2NyZWVuTW9kZTpzdHJpbmc9XCJub25lXCI7XHJcbiAgICBzdGF0aWMgYWxpZ25WOnN0cmluZz1cInRvcFwiO1xyXG4gICAgc3RhdGljIGFsaWduSDpzdHJpbmc9XCJsZWZ0XCI7XHJcbiAgICBzdGF0aWMgc3RhcnRTY2VuZTphbnk9XCJMb2FkaW5nU2NlbmUuc2NlbmVcIjtcclxuICAgIHN0YXRpYyBzY2VuZVJvb3Q6c3RyaW5nPVwiXCI7XHJcbiAgICBzdGF0aWMgZGVidWc6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBzdGF0OmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgcGh5c2ljc0RlYnVnOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgZXhwb3J0U2NlbmVUb0pzb246Ym9vbGVhbj10cnVlO1xyXG4gICAgY29uc3RydWN0b3IoKXt9XHJcbiAgICBzdGF0aWMgaW5pdCgpe1xyXG4gICAgICAgIHZhciByZWc6IEZ1bmN0aW9uID0gTGF5YS5DbGFzc1V0aWxzLnJlZ0NsYXNzO1xyXG4gICAgICAgIHJlZyhcIlNjZW5lU2NyaXB0L0dhbWVGaWVsZC50c1wiLEdhbWVGaWVsZCk7XG4gICAgICAgIHJlZyhcIlNjZW5lU2NyaXB0L0xvYWRpbmcudHNcIixMb2FkaW5nKTtcclxuICAgIH1cclxufVxyXG5HYW1lQ29uZmlnLmluaXQoKTsiLCJpbXBvcnQge1N0cnVjfSBmcm9tIFwiLi4vRGF0YVN0cnVjdHVyZVwiXHJcblxyXG5cclxuY29uc3QgZ2FtZVNldF9VUkw6c3RyaW5nID0gXCIuL0RhdGFiYXNlL0dhbWVTZXQuanNvblwiLFxyXG5lbmVteURhdGFiYXNlX1VSTDpzdHJpbmcgPSBcIi4vRGF0YWJhc2UvRW5lbXlEYXRhYmFzZS5qc29uXCIsXHJcbm9wZXJhdG9yRGF0YWJhc2VfVVJMOnN0cmluZyA9IFwiLi9EYXRhYmFzZS9PcGVyYXRvckRhdGFiYXNlLmpzb25cIlxyXG5cclxuXHJcblxyXG5cclxudHlwZSBFbmVteUV2ZW50ID0ge1xyXG4gICAgdGltZTpudW1iZXIsXHJcbiAgICB0eXBlRGF0YTphbnksXHJcbiAgICBwYXRoOm51bWJlcltdW11cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YWJhc2V7XHJcbiAgICBwcml2YXRlIGVuZW15RGF0YTpKU09OXHJcbiAgICBwcml2YXRlIG9wZXJhdG9yRGF0YTpKU09OXHJcbiAgICBwcml2YXRlIGdhbWVTZXQ6SlNPTlxyXG5cclxuICAgIHByaXZhdGUgdGltZVRhYmxlOlN0cnVjLlBvaW50ZXJMaXN0PEVuZW15RXZlbnQ+XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuZW5lbXlEYXRhID0gTGF5YS5sb2FkZXIuZ2V0UmVzKGVuZW15RGF0YWJhc2VfVVJMKVxyXG4gICAgICAgIHRoaXMub3BlcmF0b3JEYXRhID0gTGF5YS5sb2FkZXIuZ2V0UmVzKG9wZXJhdG9yRGF0YWJhc2VfVVJMKVxyXG4gICAgICAgIHRoaXMuZ2FtZVNldCA9IExheWEubG9hZGVyLmdldFJlcyhnYW1lU2V0X1VSTClcclxuICAgICAgICB0aGlzLmluaXRUaW1lVGFibGUoKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGluaXRUaW1lVGFibGUoKXtcclxuICAgICAgICB0aGlzLnRpbWVUYWJsZSA9IG5ldyBTdHJ1Yy5Qb2ludGVyTGlzdDxFbmVteUV2ZW50PigpXHJcbiAgICAgICAgdGhpcy5nYW1lU2V0W1widGltZXRhYmxlQnJlZlwiXS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0aW1lOm51bWJlciA9IGVsZW1lbnRbXCJ0aW1lXCJdXHJcbiAgICAgICAgICAgIGNvbnN0IHR5cGVEYXRhOmFueSA9IHRoaXMuZW5lbXlEYXRhW2VsZW1lbnRbXCJ0eXBlXCJdXVxyXG4gICAgICAgICAgICBjb25zdCBwYXRoOm51bWJlcltdW10gPSB0aGlzLmdhbWVTZXRbXCJwYXRoc1wiXVtlbGVtZW50LnBhdGhdXHJcbiAgICAgICAgICAgIHRoaXMudGltZVRhYmxlLnB1c2goe3RpbWUsdHlwZURhdGEscGF0aH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgcHVibGljIGlzSGFwcGVuaW5nKHRpbWU6bnVtYmVyKTpib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRpbWVUYWJsZS5yZWFkKCkgJiYgdGltZSA9PT0gdGhpcy50aW1lVGFibGUucmVhZCgpLnRpbWVcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVhZFRpbWVFdmVudCgpOkVuZW15RXZlbnR7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGltZVRhYmxlLnJlYWQoKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWFkVGltZUV2ZW50RG9uZSgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy50aW1lVGFibGUuc3RlcCgpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFBhdGgocGF0aE5hbWU6c3RyaW5nKTpudW1iZXJbXVtde1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdhbWVTZXRbXCJwYXRoc1wiXVtwYXRoTmFtZV1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RW5lbXkoZW5lbXlOYW1lOnN0cmluZyk6YW55e1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVuZW15RGF0YVtlbmVteU5hbWVdXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldE9wZXJhdG9yKG9wZXJhdG9yTmFtZTpzdHJpbmcpOmFueXtcclxuICAgICAgICByZXR1cm4gdGhpcy5vcGVyYXRvckRhdGFbb3BlcmF0b3JOYW1lXVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRHcm91bmQoKTphbnl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZVNldFtcImdyb3VuZFwiXVxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7YmFzaWN9IGZyb20gXCIuL1Blb3BsZVwiXHJcbmltcG9ydCB7R3JpZHN9IGZyb20gXCIuL0dyaWRzXCJcclxuaW1wb3J0IEdhbWVGaWVsZCBmcm9tIFwiLi4vU2NlbmVTY3JpcHQvR2FtZUZpZWxkXCJcclxuaW1wb3J0IERhdGFiYXNlIGZyb20gXCIuL0RhdGFiYXNlXCI7XHJcbmltcG9ydCBQZW9wbGUgZnJvbSBcIi4vSW50ZXJmYWNlL1Blb3BsZVwiO1xyXG5pbXBvcnQgU3RhdGUgZnJvbSBcIi4vSW50ZXJmYWNlL1N0YXRlXCI7XHJcbmltcG9ydCBQcmVzZW50IGZyb20gXCIuL0ludGVyZmFjZS9QcmVzZW50XCI7XHJcbmltcG9ydCB7U3RydWN9IGZyb20gXCIuLi9EYXRhU3RydWN0dXJlXCJcclxuaW1wb3J0IE15TWF0aCBmcm9tIFwiLi4vbXlNYXRoXCI7XHJcblxyXG4vKipcclxuICogRW5lbXlQcmVzZW50XHJcbiAqL1xyXG5cclxuY2xhc3MgRW5lbXlQcmVzZW50IGV4dGVuZHMgUHJlc2VudHtcclxuICAgIGNvbnN0cnVjdG9yKGZhdGhlcjpMYXlhLlNwcml0ZSwgZGF0YTphbnkpe1xyXG4gICAgICAgIHN1cGVyKGZhdGhlciwgZGF0YSlcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEVuZW1lU3RhdGVcclxuICogXHJcbiAqL1xyXG5cclxuY2xhc3MgRW5lbXlTdGF0ZSBleHRlbmRzIFN0YXRle1xyXG4gICAgcHJpdmF0ZSBfcGF0aDpTdHJ1Yy5Qb2ludGVyTGlzdDxudW1iZXJbXT5cclxuICAgIC8vIHByaXZhdGUgX2xvY2F0aW9uOm51bWJlcltdXHJcbiAgICBwcml2YXRlIF94Om51bWJlclxyXG4gICAgcHJpdmF0ZSBfeTpudW1iZXJcclxuICAgIHByaXZhdGUgX3NwZWVkOm51bWJlclxyXG4gICAgcHJpdmF0ZSBfeFNwZWVkOm51bWJlciA9IDBcclxuICAgIHByaXZhdGUgX3lTcGVlZDpudW1iZXIgPSAwXHJcblxyXG4gICAgY29uc3RydWN0b3IoZGF0YTphbnksIHBhdGg6bnVtYmVyW11bXSl7XHJcbiAgICAgICAgc3VwZXIoZGF0YSlcclxuICAgICAgICB0aGlzLl9wYXRoID0gbmV3IFN0cnVjLlBvaW50ZXJMaXN0PG51bWJlcltdPihwYXRoKVxyXG4gICAgICAgIC8vIHRoaXMuX2xvY2F0aW9uID0gdGhpcy5fcGF0aC5yZWFkKClcclxuICAgICAgICB0aGlzLl94ID0gdGhpcy5fcGF0aC5yZWFkKClbMF1cclxuICAgICAgICB0aGlzLl95ID0gdGhpcy5fcGF0aC5yZWFkKClbMV1cclxuICAgICAgICB0aGlzLl9zcGVlZCA9IGRhdGFbXCJzcGVlZFwiXVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgeCgpOm51bWJlcnsvL+iOt+WPlnjovbTlnZDmoIdcclxuICAgICAgICByZXR1cm4gdGhpcy5feFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgeSgpOm51bWJlcnsvL+iOt+WPlnnovbTlnZDmoIdcclxuICAgICAgICByZXR1cm4gdGhpcy5feVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgYXRMYXN0Tm9kZSgpOmJvb2xlYW57Ly/mo4DmtYvmmK/lkKblt7LliLDovr7mnIDlkI7kuIDkuKroioLngrlcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGF0aC5wb2ludGVyID09PSB0aGlzLl9wYXRoLmxlbmd0aCAtIDEgJiZcclxuICAgICAgICB0aGlzLl94ID09PSB0aGlzLl9wYXRoLmxhc3RbMF0gJiZcclxuICAgICAgICB0aGlzLl95ID09PSB0aGlzLl9wYXRoLmxhc3RbMV1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzQXJyaXZlZCgpOmJvb2xlYW57Ly/mo4DmtYvmmK/lkKblt7LliLDovr7lvZPliY3nmoTnm67moIdcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGF0aC5yZWFkKClbMF0gPT09IHRoaXMuX3ggJiYgXHJcbiAgICAgICAgdGhpcy5fcGF0aC5yZWFkKClbMV0gPT09IHRoaXMuX3lcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdW5pdE1vdmUoKTp2b2lkey8v56e75Yqo5LiA5qyhXHJcbiAgICAgICAgdGhpcy5feCA9IE15TWF0aC5tb3ZlVG8odGhpcy5feCx0aGlzLl94U3BlZWQsdGhpcy5fcGF0aC5yZWFkKClbMF0pICAvL3jovbTnp7vliqhcclxuICAgICAgICB0aGlzLl95ID0gTXlNYXRoLm1vdmVUbyh0aGlzLl95LHRoaXMuX3lTcGVlZCx0aGlzLl9wYXRoLnJlYWQoKVsxXSkgIC8veei9tOenu+WKqFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRBeGlzU3BlZWQoKTp2b2lkey8v6K6+572u6L206YCf5bqmXHJcbiAgICAgICAgbGV0IHhfc2hpZnQ6bnVtYmVyID0gdGhpcy5fcGF0aC5yZWFkKClbMF0gLSB0aGlzLl94LCAgICAgICAgICAgICAgICAgICAgLy/msYJ46L205oC76Led56a7XHJcbiAgICAgICAgeV9zaGlmdDpudW1iZXIgPSB0aGlzLl9wYXRoLnJlYWQoKVsxXSAtIHRoaXMuX3ksICAgICAgICAgICAgICAgICAgICAgICAgLy/msYJ56L205oC76Led56a7XHJcbiAgICAgICAgaHlwb3RlbnVzZTpudW1iZXIgPSBNYXRoLnNxcnQoTWF0aC5wb3coeF9zaGlmdCwyKStNYXRoLnBvdyh5X3NoaWZ0LDIpKSAvL+axguebtOe6v+aAu+i3neemu1xyXG4gICAgICAgIHRoaXMuX3hTcGVlZCA9IHhfc2hpZnQqdGhpcy5fc3BlZWQvaHlwb3RlbnVzZSAgIC8v6K6+572ueOi9tOmAn+W6plxyXG4gICAgICAgIHRoaXMuX3lTcGVlZCA9IHlfc2hpZnQqdGhpcy5fc3BlZWQvaHlwb3RlbnVzZSAgIC8v6K6+572ueei9tOmAn+W6plxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZXh0QWltKCk6dm9pZHsvL+aMh+WQkeS4i+S4gOS4quebruagh1xyXG4gICAgICAgIHRoaXMuX3BhdGguc3RlcCgpXHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQZW9wbGVcclxuICogXHJcbiAqIFxyXG4gKiBcclxuICogXHJcbiAqIFxyXG4gKi9cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbmVteSBleHRlbmRzIFBlb3BsZXtcclxuXHJcbiAgICBwcml2YXRlIF91cHBlclBhdGg6R2FtZUZpZWxkXHJcbiAgICBwcml2YXRlIF9kYXRhOmFueVxyXG4gICAgcHJpdmF0ZSBzaXplOm51bWJlclxyXG5cclxuICAgIHByaXZhdGUgX3N0YXRlOkVuZW15U3RhdGVcclxuICAgIHByaXZhdGUgX3ByZXNlbnQ6RW5lbXlQcmVzZW50XHJcblxyXG4gICAgY29uc3RydWN0b3IodXBwZXJQYXRoOkdhbWVGaWVsZCwgZmF0aGVyOkxheWEuU3ByaXRlLCBlbmVteURhdGE6YW55LCBwYXRoOm51bWJlcltdW10sIGRhdGFiYXNlOkRhdGFiYXNlKXtcclxuICAgICAgICBzdXBlcigpXHJcbiAgICAgICAgdGhpcy5fdXBwZXJQYXRoID0gdXBwZXJQYXRoXHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IGVuZW15RGF0YVxyXG5cclxuICAgICAgICB0aGlzLl9wcmVzZW50ID0gbmV3IEVuZW15UHJlc2VudChmYXRoZXIsIHRoaXMuX2RhdGEpXHJcbiAgICAgICAgdGhpcy5fcHJlc2VudC5zZXRTaXplKGRhdGFiYXNlLmdldEdyb3VuZCgpW1wic2l6ZVwiXSlcclxuICAgICAgICAvLyB0aGlzLl9wcmVzZW50LnNldFBvcygwLDApXHJcblxyXG4gICAgICAgIHRoaXMuX3N0YXRlID0gbmV3IEVuZW15U3RhdGUodGhpcy5fZGF0YSwgcGF0aClcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFbmVteeWvueixoeWIm+W7uuWujOaIkFwiKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMpXHJcbiAgICAgICAgY29uc29sZS5sb2coXCI9PT0gPT09ID09PVwiKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTp2b2lke1xyXG4gICAgICAgIHRoaXMubW92ZSgpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtb3ZlKCk6dm9pZHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDlh73mlbDor7TmmI5cclxuICAgICAgICAgKiBodHRwczovL3d3dy5sdWNpZGNoYXJ0LmNvbS9kb2N1bWVudHMvdmlldy85NjU4MjMwNS1lYzZlLTRjNDEtYjE3OC1hYTc4ZjkxY2UwZDIvMFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlmICh0aGlzLl9zdGF0ZS5hdExhc3ROb2RlKXsvL+WmguaenOW3suWIsOi+vue7iOeCuVxyXG4gICAgICAgICAgICB0aGlzLm1vdmUgPSAoKT0+e30vL+WImea4heepum1vdmXlh73mlbBcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9zdGF0ZS5pc0Fycml2ZWQpey8v5aaC5p6c5bey5Yiw6L6+5LiL5LiA5Liq6IqC54K5XHJcbiAgICAgICAgICAgIHRoaXMuX3N0YXRlLm5leHRBaW0oKS8v6YeN6K6+6IqC54K5XHJcbiAgICAgICAgICAgIHRoaXMuX3N0YXRlLnNldEF4aXNTcGVlZCgpLy/orqHnrpfpgJ/luqZcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3RhdGUudW5pdE1vdmUoKS8v6L+b6KGM5LiA5qyh56e75YqoXHJcbiAgICAgICAgdGhpcy5fcHJlc2VudC5zZXRQb3ModGhpcy5fc3RhdGUueCwgdGhpcy5fc3RhdGUueSkvL+aUueWPmOWFg+e0oOS9jee9rlxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLy8gZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW5lbXkgZXh0ZW5kcyBiYXNpYy5QZW9wbGV7XHJcbi8vICAgICBjb25zdHJ1Y3RvcihmYXRoZXI6TGF5YS5TcHJpdGUsdXBwZXJQYXRoOkdhbWVGaWVsZCxkYXRhOmFueSxwYXRoOm51bWJlcltdW10pe1xyXG4vLyAgICAgICAgIHN1cGVyKClcclxuLy8gICAgICAgICB0aGlzLnN0YXRlLmluaXQoZGF0YSxwYXRoKVxyXG4vLyAgICAgICAgIHRoaXMucHJlc2VudC5pbml0KGZhdGhlciwgXCJCYXNpYy9UaGVyZS0yLnBuZ1wiLCAwLDApXHJcblxyXG4vLyAgICAgICAgIC8vIHRoaXMuc3RhdGUuc3BlZWQgPSA1XHJcbi8vICAgICAgICAgLy8gdGhpcy5zdGF0ZS5zZXRBeGlzU3BlZWQoKVxyXG4gICAgICAgIFxyXG4vLyAgICAgICAgIHRoaXMudXBkYXRlID0gKCk9PntcclxuLy8gICAgICAgICAgICAgLy8gdGhpcy5zdGF0ZS51cGRhdGVQb3NpdGlvbigpXHJcbi8vICAgICAgICAgICAgIC8vIHRoaXMucHJlc2VudC5zZXRQb3NpdGlvbih0aGlzLnN0YXRlLnBvc2l0aW9uKVxyXG4vLyAgICAgICAgICAgICAvLyB0aGlzLnN0YXRlLmlzQXJyaXZlZCgpICYmIHRoaXMuc3RhdGUubmV4dEFpbSgpXHJcbi8vICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4vLyAgICAgICAgIExheWEudGltZXIub25jZSgyMDAwLHRoaXMsY29uc29sZS5sb2csW3RoaXNdKVxyXG4vLyAgICAgfVxyXG4vLyB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuLypcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW5lbXkgZXh0ZW5kcyBiYXNpYy5QZW9wbGV7XHJcbiAgICBwdWJsaWMgc3BlZWQ6bnVtYmVyID0gMC40ICAgICAgIC8v6YCf5bqmXHJcbiAgICBwdWJsaWMgQ2VudHJlU2hpZnQ6bnVtYmVyID0gMzUgIC8v5LiOR3JvdW5kLkdyaWRzLnNpemXnmoTkuIDljYrkv53mjIHkuIDoh7TvvIznqI3lkI7mlLnkuLrlj5jph49cclxuICAgIHByaXZhdGUgaGl0RG9jdG9yOm51bWJlciA9IDEgICAgLy/ov5vpl6jkuYvlkI7miZPliIDlrqLku5blpJrlsJHooYBcclxuICAgIC8vIHB1YmxpYyBwYXRoOm51bWJlcltdW10gPSBbXHJcbiAgICAvLyAgICAgWzAsMF0sXHJcbiAgICAvLyAgICAgWzEwMCwxMDBdLFxyXG4gICAgLy8gICAgIFswLDBdXHJcbiAgICAvLyBdXHJcbiAgICBcclxuICAgIHB1YmxpYyBwYXRoOm51bWJlcltdW10gPSBbXSAgICAgLy/ot6/lvoTlr7nosaFcclxuICAgIHB1YmxpYyBmYXRoZXI6TGF5YS5TcHJpdGUgICAgICAgLy/ljp/ngrnlnZDmoIflr7nosaFcclxuICAgIHByaXZhdGUgcGxhY2U6R3JpZHMgICAgICAgICAgICAgLy/lnLDlm77mlrnmoLzlr7nosaFcclxuICAgIHByaXZhdGUgdXBwZXJQYXRoOkdhbWVGaWVsZCAgICAgLy/lkKvmnInmraTlrp7kvovnmoTlrp7kvotcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihmYXRoZXI6TGF5YS5TcHJpdGUsIHBsYWNlOkdyaWRzLCB1cHBlclBhdGg6R2FtZUZpZWxkKXtcclxuICAgICAgICBzdXBlcigpXHJcbiAgICAgICAgLy8gYWxlcnQoMSlcclxuICAgICAgICB0aGlzLnVwcGVyUGF0aCA9IHVwcGVyUGF0aFxyXG4gICAgICAgIHRoaXMuZmF0aGVyID0gZmF0aGVyXHJcbiAgICAgICAgdGhpcy5wbGFjZSA9IHBsYWNlXHJcbiAgICAgICAgdGhpcy5zdGF0ZS5lbGUgPSBMYXlhLlNwcml0ZS5mcm9tSW1hZ2UoXCJCYXNpYy9UaGVyZS5wbmdcIilcclxuICAgICAgICAvLyBhbGVydCgyKVxyXG5cclxuICAgICAgICAvLyBjb25zdCBzdGFydDpudW1iZXJbXSA9IHRoaXMucGF0aC5zaGlmdCgpXHJcbiAgICAgICAgdGhpcy5zdGF0ZS5lbGUucG9zKDAsMCkuc2l6ZSgzMCwzMClcclxuICAgICAgICBmYXRoZXIuYWRkQ2hpbGQodGhpcy5zdGF0ZS5lbGUpXHJcblxyXG4gICAgICAgIHRoaXMuU2V0UGF0aCgpXHJcbiAgICAgICAgdGhpcy5tb3ZlKClcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFNldFBhdGgoKXtcclxuICAgICAgICBjb25zdCBwb2ludHM6bnVtYmVyW11bXSA9IFtcclxuICAgICAgICAgICAgWzAsMF0sXHJcbiAgICAgICAgICAgIFswLDVdLFxyXG4gICAgICAgICAgICBbNSw1XSxcclxuICAgICAgICAgICAgWzUsM10sXHJcbiAgICAgICAgICAgIFszLDNdLFxyXG4gICAgICAgICAgICBbMywwXSxcclxuICAgICAgICAgICAgWzUsMF0sXHJcbiAgICAgICAgICAgIFs1LDldXHJcbiAgICAgICAgXVxyXG4gICAgICAgIHBvaW50cy5mb3JFYWNoKChlbGUpPT57XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMudXBwZXJQYXRoKVxyXG4gICAgICAgICAgICBjb25zdCByZWM6TGF5YS5SZWN0YW5nbGUgPSB0aGlzLnVwcGVyUGF0aC5ncmlkcy5SZWNNYXBbZWxlWzBdXVtlbGVbMV1dXHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQ6bnVtYmVyW10gPSBbXHJcbiAgICAgICAgICAgICAgICByZWMueCxcclxuICAgICAgICAgICAgICAgIHJlYy55XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgdGhpcy5wYXRoLnB1c2goY3VycmVudClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbW92ZSgpe1xyXG4gICAgICAgIGNvbnN0IHRhcmdldDpudW1iZXJbXSA9IHRoaXMucGF0aC5zaGlmdCgpXHJcbiAgICAgICAgaWYgKHRhcmdldCA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5nb2FsKClcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHt4LHl9ID0gdGhpcy5zdGF0ZS5lbGVcclxuICAgICAgICBjb25zdCBoeXBvdGVudXNlOm51bWJlciA9IE1hdGguc3FydChNYXRoLnBvdyh4LXRhcmdldFswXSwyKStNYXRoLnBvdyh5LXRhcmdldFsxXSwyKSlcclxuICAgICAgICBjb25zdCB0aW1lOm51bWJlciA9IE1hdGguZmxvb3IoaHlwb3RlbnVzZS90aGlzLnNwZWVkKVxyXG4gICAgICAgIGNvbnN0IHR3ZWVuOkxheWEuVHdlZW4gPSBMYXlhLlR3ZWVuLnRvKHRoaXMuc3RhdGUuZWxlLCB7eDp0YXJnZXRbMF0seTp0YXJnZXRbMV19LCB0aW1lLCBudWxsLFxyXG4gICAgICAgICAgICBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5tb3ZlKSwxMDApXHJcblxyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgcHJpdmF0ZSBnb2FsKCl7XHJcbiAgICAgICAgdGhpcy51cHBlclBhdGguZG9jdG9yLmRhbWFnZWQodGhpcy5oaXREb2N0b3IpXHJcbiAgICB9XHJcbn1cclxuKi8iLCJpbXBvcnQgR2FtZUZpZWxkIGZyb20gXCIuLi9TY2VuZVNjcmlwdC9HYW1lRmllbGRcIjtcclxuaW1wb3J0IERhdGFiYXNlIGZyb20gXCIuL0RhdGFiYXNlXCJcclxuXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEdyaWRze1xyXG4gICAgcHJpdmF0ZSB1cHBlclBhdGg6R2FtZUZpZWxkXHJcbiAgICBwcml2YXRlIGZhdGhlcjpMYXlhLlNwcml0ZVxyXG4gICAgcHJpdmF0ZSBkYXRhYmFzZTpEYXRhYmFzZVxyXG5cclxuXHJcbiAgICBcclxuICAgIHByaXZhdGUgc3ByaXRlR3JvdXA6TGF5YS5TcHJpdGVbXVtdID0gW11cclxuICAgIHByaXZhdGUgcmVjdEdyb3VwOkxheWEuUmVjdGFuZ2xlW11bXSA9IFtdXHJcblxyXG4gICAgY29uc3RydWN0b3IodXBwZXJQYXRoOkdhbWVGaWVsZCwgZmF0aGVyOkxheWEuU3ByaXRlLCBkYXRhYmFzZTpEYXRhYmFzZSl7XHJcbiAgICAgICAgdGhpcy51cHBlclBhdGggPSB1cHBlclBhdGhcclxuICAgICAgICB0aGlzLmZhdGhlciA9IGZhdGhlclxyXG4gICAgICAgIHRoaXMuZGF0YWJhc2UgPSBkYXRhYmFzZVxyXG5cclxuICAgICAgICAvL+WIm+W7uua4uOaIj+WcuuWcsDogU3RhcnRcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBncm91bmQ6YW55ID0gZGF0YWJhc2UuZ2V0R3JvdW5kKCksXHJcbiAgICAgICAgd2lkdGg6bnVtYmVyID0gZ3JvdW5kW1wid2lkdGhcIl0sXHJcbiAgICAgICAgaGVpZ2h0Om51bWJlciA9IGdyb3VuZFtcImhlaWdodFwiXSxcclxuICAgICAgICBzaXplOm51bWJlciA9IGdyb3VuZFtcInNpemVcIl0sXHJcbiAgICAgICAgbWF0cml4Om51bWJlciA9IGdyb3VuZFtcIm1hdHJpeFwiXVxyXG5cclxuICAgICAgICBmb3IobGV0IHggPSAwOyB4IDwgd2lkdGg7IHggKz0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLnNwcml0ZUdyb3VwW3hdID0gW11cclxuICAgICAgICAgICAgdGhpcy5yZWN0R3JvdXBbeF0gPSBbXVxyXG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGhlaWdodDsgeSArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAvL+WIm+W7unNwcml0ZTogU3RhcnRcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNwcml0ZTpMYXlhLlNwcml0ZSA9IExheWEuU3ByaXRlLmZyb21JbWFnZShcIkJhc2ljL1JlYy5wbmdcIilcclxuICAgICAgICAgICAgICAgIHNwcml0ZS5wb3MoeCpzaXplLHkqc2l6ZSkuc2l6ZShzaXplLHNpemUpXHJcbiAgICAgICAgICAgICAgICBmYXRoZXIuYWRkQ2hpbGQoc3ByaXRlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVHcm91cFt4XVt5XSA9IHNwcml0ZVxyXG4gICAgICAgICAgICAgICAgLy/liJvlu7pTcHJpdGU6IEVuZFxyXG5cclxuICAgICAgICAgICAgICAgIC8v5Yib5bu6UmVjdGFuZ2xlOiBTdGFydFxyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVjdDpMYXlhLlJlY3RhbmdsZSA9IG5ldyBMYXlhLlJlY3RhbmdsZSh4KnNpemUseSpzaXplLHNpemUsc2l6ZSlcclxuICAgICAgICAgICAgICAgIHRoaXMucmVjdEdyb3VwW3hdW3ldID0gcmVjdFxyXG4gICAgICAgICAgICAgICAgLy/liJvlu7pSZWN0YW5nbGU6IEVuZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5Yib5bu65ri45oiP5Zy65ZywOiBFbmRcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkdyaWRz5a+56LGh5Yib5bu65a6M5oiQXCIpXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcylcclxuICAgICAgICBjb25zb2xlLmxvZyhcIj09PSA9PT0gPT09XCIpXHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIGV4cG9ydCBjbGFzcyBHcmlkc3tcclxuLy8gICAgIHB1YmxpYyBNYXA6QXJyYXk8QXJyYXk8TGF5YS5TcHJpdGU+PiA9IFtdXHJcbi8vICAgICBwdWJsaWMgUmVjTWFwOkFycmF5PEFycmF5PExheWEuUmVjdGFuZ2xlPj4gPSBbXVxyXG4vLyAgICAgcHJpdmF0ZSBzdGF0aWMgc2l6ZTpudW1iZXIgPSA5MFxyXG4vLyAgICAgcHJpdmF0ZSBmYXRoZXI6TGF5YS5TcHJpdGVcclxuLy8gICAgIHByaXZhdGUgdXBwZXJQYXRoOkdhbWVGaWVsZFxyXG4vLyAgICAgcHJpdmF0ZSBkYXRhOkpTT05cclxuLy8gICAgIC8vb2xkXHJcbi8vICAgICAvL25ld1xyXG4vLyAgICAgcHJpdmF0ZSBkYXRhYmFzZTpEYXRhYmFzZVxyXG5cclxuLy8gICAgIGNvbnN0cnVjdG9yKGZhdGhlcjpMYXlhLlNwcml0ZSwgdXBwZXJQYXRoOkdhbWVGaWVsZCwgZGF0YWJhc2U6RGF0YWJhc2Upe1xyXG4vLyAgICAgICAgIHRoaXMuZGF0YWJhc2UgPSBkYXRhYmFzZVxyXG4vLyAgICAgICAgIC8vIHRoaXMuZmF0aGVyID0gZmF0aGVyXHJcbi8vICAgICAgICAgLy8gdGhpcy51cHBlclBhdGggPSB1cHBlclBhdGhcclxuLy8gICAgICAgICAvLyB0aGlzLmRhdGEgPSBkYXRhXHJcbi8vICAgICAgICAgLy8gbGV0IGNvbHMgPSBkYXRhW1wiZ3JvdW5kXCJdW1wid2lkdGhcIl0sXHJcbi8vICAgICAgICAgLy8gcmF3cyA9IGRhdGFbXCJncm91bmRcIl1bXCJoZWlnaHRcIl1cclxuICAgICAgICBcclxuLy8gICAgICAgICAvLyBmb3IgKGxldCBuID0gMDsgbiA8IHJhd3M7IG4gKz0gMSkge1xyXG4vLyAgICAgICAgIC8vICAgICB0aGlzLk1hcFtuXSA9IFtdXHJcbi8vICAgICAgICAgLy8gICAgIHRoaXMuUmVjTWFwW25dID0gW11cclxuLy8gICAgICAgICAvLyAgICAgZm9yIChsZXQgbSA9IDA7IG0gPCBjb2xzOyBtICs9IDEpIHtcclxuLy8gICAgICAgICAvLyAgICAgICAgIHRoaXMuaW5pdEVsZW1lbnQobixtKVxyXG4vLyAgICAgICAgIC8vICAgICB9XHJcbi8vICAgICAgICAgLy8gfVxyXG4vLyAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuUmVjTWFwKVxyXG4vLyAgICAgfVxyXG5cclxuXHJcbi8vICAgICBpbml0RWxlbWVudChyYXc6bnVtYmVyLGNvdW50Om51bWJlcil7XHJcbi8vICAgICAgICAgY29uc3QgY3VycmVudDpMYXlhLlNwcml0ZSA9IExheWEuU3ByaXRlLmZyb21JbWFnZShcIkJhc2ljL1JlYy5wbmdcIik7Ly/ovb3lhaXlm77niYdcclxuLy8gICAgICAgICBjdXJyZW50LnBvcyhHcmlkcy5zaXplKmNvdW50LCBHcmlkcy5zaXplKnJhdylcclxuLy8gICAgICAgICAgICAgLnNpemUoR3JpZHMuc2l6ZSxHcmlkcy5zaXplKS8v5L6d5o2uc3RhdGljIHNpemXlsZ7mgKfmlLnlj5jlpKflsI/jgIHkvp3mja7nvJblj7fmlLnlj5jkvY3nva5cclxuLy8gICAgICAgICBjdXJyZW50Lm5hbWUgPSBgZ3JpZCR7cmF3fS0ke2NvdW50fWAvL+mHjeWRveWQjeS4uiBncmlk6KGM5pWwLeWIl+aVsFxyXG4gICAgICAgIFxyXG4vLyAgICAgICAgIHRoaXMuTWFwW3Jhd11bY291bnRdID0gY3VycmVudFxyXG4vLyAgICAgICAgIHRoaXMuUmVjTWFwW3Jhd11bY291bnRdID0gbmV3IExheWEuUmVjdGFuZ2xlKGN1cnJlbnQueCxjdXJyZW50LnksR3JpZHMuc2l6ZSxHcmlkcy5zaXplKVxyXG4vLyAgICAgICAgIC8vIGN1cnJlbnQub24oTGF5YS5FdmVudC5DTElDSywgdGhpcy51cHBlclBhdGgsIHRoaXMudXBwZXJQYXRoLmFkZE9wZXJhdG9yLCBbdGhpcy5nZXRQbGFjZShjb3VudCxyYXcpXSkvL+iuvuWumum8oOagh+eCueWHu+S6i+S7tlxyXG4vLyAgICAgICAgIC8v5ZCRR2FtZUZpZWxk5Lit5re75YqgT3BlcmF0b3Llrp7kvotcclxuLy8gICAgICAgICB0aGlzLmZhdGhlci5hZGRDaGlsZChjdXJyZW50KVxyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIGdldFBsYWNlKGNvdW50Om51bWJlcixyYXc6bnVtYmVyKTpudW1iZXJbXXtcclxuLy8gICAgICAgICAvL3JhdzrnrKzlh6DooYxcclxuLy8gICAgICAgICAvL2NvdW50OuesrOWHoOS4qlxyXG4vLyAgICAgICAgIHJldHVybiBbXHJcbi8vICAgICAgICAgICAgIHRoaXMuUmVjTWFwW3Jhd11bY291bnRdLngsXHJcbi8vICAgICAgICAgICAgIHRoaXMuUmVjTWFwW3Jhd11bY291bnRdLnlcclxuLy8gICAgICAgICBdXHJcbi8vICAgICB9XHJcbi8vIH1cclxuXHJcblxyXG5cclxuXHJcbiIsIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgUGVvcGxlIHtcclxuICAgIFxyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcbn0iLCJcclxuLyoqXHJcbiAqIFByZXNlbnTvvJrooajnjrDnsbtcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIFByZXNlbnQge1xyXG5cclxuICAgIHByaXZhdGUgX3Nwcml0ZTpMYXlhLlNwcml0ZVxyXG4gICAgcHJpdmF0ZSBfZmF0aGVyOkxheWEuU3ByaXRlXHJcblxyXG4gICAgY29uc3RydWN0b3IoZmF0aGVyOkxheWEuU3ByaXRlLGRhdGE6YW55KSB7XHJcbiAgICAgICAgdGhpcy5fc3ByaXRlID0gTGF5YS5TcHJpdGUuZnJvbUltYWdlKGRhdGFbXCJpbWdcIl0pXHJcbiAgICAgICAgdGhpcy5fZmF0aGVyID0gZmF0aGVyXHJcblxyXG4gICAgICAgIHRoaXMuX2ZhdGhlci5hZGRDaGlsZCh0aGlzLl9zcHJpdGUpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFNpemUoc2l6ZTpudW1iZXIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fc3ByaXRlLnNpemUoc2l6ZSxzaXplKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRQb3MoeDpudW1iZXIseTpudW1iZXIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fc3ByaXRlLnBvcyh4LHkpXHJcbiAgICB9XHJcblxyXG5cclxufSIsIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgU3RhdGUge1xyXG4gICAgcHJpdmF0ZSBfbG9kYXRpb246bnVtYmVyW11bXVxyXG4gICAgY29uc3RydWN0b3IoZGF0YTphbnkpIHtcclxuICAgICAgICBcclxuICAgIH1cclxufSIsImltcG9ydCBHYW1lRmllbGQgZnJvbSBcIi4uL1NjZW5lU2NyaXB0L0dhbWVGaWVsZFwiXHJcbmltcG9ydCB7YmFzaWN9IGZyb20gXCIuL1Blb3BsZVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcGVyYXRvciBleHRlbmRzIGJhc2ljLlBlb3BsZXtcclxuICAgIGNvbnN0cnVjdG9yKHVwcGVyUGF0aDpHYW1lRmllbGQsIHBvc2l0aW9uOm51bWJlcltdKXtcclxuICAgICAgICBzdXBlcigpXHJcbiAgICAgICAgdGhpcy5pbml0KClcclxuICAgICAgICAvLyB0aGlzLnN0YXRlLmluaXQoKVxyXG4gICAgICAgIHRoaXMucHJlc2VudC5pbml0KHVwcGVyUGF0aC5VSVNldCwgXCJCYXNpYy9PcGVyYXRvclNhbXBsZV9BLnBuZ1wiLFxyXG4gICAgICAgICAgICBwb3NpdGlvblswXSwgcG9zaXRpb25bMV0pXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcylcclxuICAgIH1cclxuICAgIGluaXQoKXtcclxuXHJcblxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJcclxuICAgIFxyXG4gICAgXHJcbmV4cG9ydCBtb2R1bGUgYmFzaWN7XHJcbiAgICBleHBvcnQgY2xhc3MgUHJlc2VudHtcclxuICAgICAgICBwcml2YXRlIEltYWdlVVJMOnN0cmluZ1xyXG4gICAgICAgIHByaXZhdGUgZmF0aGVyOkxheWEuU3ByaXRlXHJcbiAgICAgICAgcHJpdmF0ZSBlbGU6TGF5YS5TcHJpdGVcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBzaXplOm51bWJlciA9IDkwXHJcbiAgICAgICAgY29uc3RydWN0b3IoKXtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluaXQoZmF0aGVyOkxheWEuU3ByaXRlLHVybDpzdHJpbmcgPSBcIkJhc2ljL09wZXJhdG9yU2FtcGxlX0EucG5nXCIseDpudW1iZXIseTpudW1iZXIpe1xyXG4gICAgICAgICAgICB0aGlzLmZhdGhlciA9IGZhdGhlclxyXG4gICAgICAgICAgICB0aGlzLkltYWdlVVJMID0gdXJsXHJcbiAgICAgICAgICAgIHRoaXMuZWxlID0gTGF5YS5TcHJpdGUuZnJvbUltYWdlKHRoaXMuSW1hZ2VVUkwpXHJcbiAgICAgICAgICAgIHRoaXMuZWxlLnNpemUoUHJlc2VudC5zaXplLFByZXNlbnQuc2l6ZSlcclxuICAgICAgICAgICAgdGhpcy5mYXRoZXIuYWRkQ2hpbGQodGhpcy5lbGUpXHJcbiAgICAgICAgICAgIHRoaXMuc2V0UG9zaXRpb24oW3gseV0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRQb3NpdGlvbihuZXdQb3NpdGlvbjpudW1iZXJbXSl7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlLnBvcyhuZXdQb3NpdGlvblswXSxuZXdQb3NpdGlvblsxXSlcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgU3RhdGV7XHJcbiAgICAgICAgLy8gcHJpdmF0ZSBzdGF0aWMgc2l6ZTpudW1iZXIgPSA5MC8v5b6F5L+u5pS5XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgaGl0U2l6ZTpudW1iZXIgPSA4MFxyXG5cclxuICAgICAgICBwcml2YXRlIG5hbWU6c3RyaW5nXHJcbiAgICAgICAgcHJpdmF0ZSBIUDpudW1iZXJcclxuICAgICAgICBwcml2YXRlIE1QOm51bWJlclxyXG5cclxuICAgICAgICBwcml2YXRlIF94Om51bWJlciA9IDBcclxuICAgICAgICBwcml2YXRlIF95Om51bWJlciA9IDBcclxuICAgICAgICBwcml2YXRlIF9zcGVlZDpudW1iZXIgPSAwXHJcbiAgICAgICAgcHJpdmF0ZSBfeFNwZWVkOm51bWJlciA9IDBcclxuICAgICAgICBwcml2YXRlIF95U3BlZWQ6bnVtYmVyID0gMFxyXG4gICAgICAgIHByaXZhdGUgX3BhdGg6bnVtYmVyW11bXSA9IFtdXHJcbiAgICAgICAgcHJpdmF0ZSBhaW1Qb2ludGVyID0gLTFcclxuICAgICAgICBcclxuICAgICAgICAvLyBwdWJsaWMgaGl0Qm94OkxheWEuUmVjdGFuZ2xlXHJcbiAgICAgICAgY29uc3RydWN0b3IoKXtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KGRhdGE6YW55LHBhdGg6bnVtYmVyW11bXSl7XHJcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IGRhdGFbXCJuYW1lXCJdXHJcbiAgICAgICAgICAgIHRoaXMuX3NwZWVkID0gZGF0YVtcInNwZWVkXCJdXHJcbiAgICAgICAgICAgIHRoaXMuaW5pdFBhdGgocGF0aClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgaW5pdFBhdGgoZ2V0cGF0aDpudW1iZXJbXVtdKXtcclxuICAgICAgICAgICAgZ2V0cGF0aC5mb3JFYWNoKChlbGUsaW5kZXgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXRoW2luZGV4XSA9IFtdXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXRoW2luZGV4XVswXSA9IGVsZVswXVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGF0aFtpbmRleF1bMV0gPSBlbGVbMV1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0QWltKCk6bnVtYmVyW117XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wYXRoW3RoaXMuYWltUG9pbnRlcl1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB1cGRhdGVQb3NpdGlvbigpe1xyXG4gICAgICAgICAgICBjb25zdCBhaW06bnVtYmVyW10gPSB0aGlzLmdldEFpbSgpXHJcbiAgICAgICAgICAgIHRoaXMuX3ggPSB0aGlzLm1vdmVUbyh0aGlzLl94LHRoaXMuX3hTcGVlZCxhaW1bMF0pXHJcbiAgICAgICAgICAgIHRoaXMuX3kgPSB0aGlzLm1vdmVUbyh0aGlzLl95LHRoaXMuX3lTcGVlZCxhaW1bMV0pXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHt4OnRoaXMueCx5OnRoaXMueX0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG1vdmVUbyhmcm9udDpudW1iZXIsIHNoaWZ0Om51bWJlciwgZW5kOm51bWJlcik6bnVtYmVyIHtcclxuICAgICAgICAgICAgaWYoc2hpZnQ9PT0wKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmcm9udFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzaGlmdD4wP1xyXG4gICAgICAgICAgICAgICAgKChmcm9udCtzaGlmdCk+ZW5kP2VuZDpmcm9udCtzaGlmdCk6XHJcbiAgICAgICAgICAgICAgICAoKGZyb250K3NoaWZ0KTxlbmQ/ZW5kOmZyb250K3NoaWZ0KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGlzQXJyaXZlZCgpOmJvb2xlYW57XHJcbiAgICAgICAgICAgIGNvbnN0IGFpbTpudW1iZXJbXSA9IHRoaXMuZ2V0QWltKClcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ggPT09IGFpbVswXSAmJiB0aGlzLl95ID09PSBhaW1bMV1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBnZXRDZW50cmUoKTpudW1iZXJbXXtcclxuICAgICAgICAvLyAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vICAgICBdXHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgUGVvcGxle1xyXG4gICAgICAgIHB1YmxpYyBzdGF0ZTpTdGF0ZVxyXG4gICAgICAgIHB1YmxpYyBwcmVzZW50OlByZXNlbnRcclxuICAgICAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gbmV3IFN0YXRlKClcclxuICAgICAgICAgICAgdGhpcy5wcmVzZW50ID0gbmV3IFByZXNlbnQoKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0aGl0Qm94KHNpemU6bnVtYmVyLHBvc2l0aW9uOm51bWJlcltdKXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1cGRhdGUoKXtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEdhbWVGaWVsZCBmcm9tIFwiLi4vU2NlbmVTY3JpcHQvR2FtZUZpZWxkXCI7XHJcbmltcG9ydCBEYXRhYmFzZSBmcm9tIFwiLi9EYXRhYmFzZVwiO1xyXG5pbXBvcnQgRXZlbnRDZW50cmUgZnJvbSBcIi4uL0V2ZW50Q2VudHJlXCI7XHJcblxyXG5cclxuXHJcbmNsYXNzIFNpZGVPcGVyYXRvcntcclxuICAgIHByaXZhdGUgX3VwcGVyUGF0aDpTaWRlRmllbGRcclxuICAgIHByaXZhdGUgX2ZhdGhlcjpMYXlhLlNwcml0ZSAgICAgLy/lj7PkvqfpgInljZXljp/ngrlcclxuICAgIHByaXZhdGUgX2RhdGE6YW55XHJcbiAgICBwcml2YXRlIF91bml0OkxheWEuU3ByaXRlXHJcbiAgICBwcml2YXRlIF9kYXRhYmFzZTpEYXRhYmFzZVxyXG4gICAgcHJpdmF0ZSBfVUlTZXQ6TGF5YS5TcHJpdGVcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih1cHBlclBhdGg6U2lkZUZpZWxkLCBmYXRoZXI6TGF5YS5TcHJpdGUsIGRhdGE6YW55LCBkYXRhYmFzZTpEYXRhYmFzZSl7XHJcbiAgICAgICAgdGhpcy5fdXBwZXJQYXRoID0gdXBwZXJQYXRoXHJcbiAgICAgICAgdGhpcy5fZmF0aGVyID0gZmF0aGVyXHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGFcclxuICAgICAgICB0aGlzLl9kYXRhYmFzZSA9IGRhdGFiYXNlXHJcbiAgICAgICAgdGhpcy5fdW5pdCA9IExheWEuU3ByaXRlLmZyb21JbWFnZShkYXRhW1wiaW1nXCJdKVxyXG4gICAgICAgIHRoaXMuX1VJU2V0ID0gdGhpcy5fZmF0aGVyLnBhcmVudCBhcyBMYXlhLlNwcml0ZVxyXG4gICAgICAgIGZhdGhlci5hZGRDaGlsZCh0aGlzLl91bml0KVxyXG4gICAgICAgIHRoaXMuaW5pdF9EcmFnKClcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRfRHJhZygpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fdW5pdC5vbihMYXlhLkV2ZW50Lk1PVVNFX0RPV04sIHRoaXMsIHRoaXMub25EcmFnKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25EcmFnKCk6dm9pZHtcclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICBsZXQgc3ByOkxheWEuU3ByaXRlID0gTGF5YS5TcHJpdGUuZnJvbUltYWdlKHRoaXMuX2RhdGFbXCJpbWdcIl0pLFxyXG4gICAgICAgIHNpemU6bnVtYmVyID0gdGhpcy5fZGF0YWJhc2UuZ2V0R3JvdW5kKClbXCJzaXplXCJdXHJcbiAgICAgICAgc3ByLnNpemUoc2l6ZSxzaXplKVxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBsZXQgZHJhZ2luZzpGdW5jdGlvbiA9ICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHggPSB0aGlzLl9VSVNldC5tb3VzZVggLSB0aGlzLl9VSVNldC5tb3VzZVggJSBzaXplLFxyXG4gICAgICAgICAgICB5ID0gdGhpcy5fVUlTZXQubW91c2VZIC0gdGhpcy5fVUlTZXQubW91c2VZICUgc2l6ZVxyXG5cclxuICAgICAgICAgICAgaWYgKHg8MHx8XHJcbiAgICAgICAgICAgICAgICB5PDB8fFxyXG4gICAgICAgICAgICAgICAgeD4odGhpcy5fZGF0YWJhc2UuZ2V0R3JvdW5kKClbXCJ3aWR0aFwiXS0xKSpzaXplfHxcclxuICAgICAgICAgICAgICAgIHk+KHRoaXMuX2RhdGFiYXNlLmdldEdyb3VuZCgpW1wiaGVpZ2h0XCJdLTEpKnNpemUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3ByLnBvcyhcclxuICAgICAgICAgICAgICAgIHgsXHJcbiAgICAgICAgICAgICAgICB5XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIExheWEudGltZXIubG9vcCgxMCwgdGhpcywgZHJhZ2luZylcclxuICAgICAgICB0aGlzLl9VSVNldC5hZGRDaGlsZChzcHIpXHJcblxyXG4gICAgICAgIHRoaXMuX3VuaXQuc3RhZ2Uub25jZShMYXlhLkV2ZW50Lk1PVVNFX1VQLCB0aGlzLCAoKT0+e1xyXG4gICAgICAgICAgICBMYXlhLnRpbWVyLmNsZWFyKHRoaXMsIGRyYWdpbmcpXHJcbiAgICAgICAgICAgIEV2ZW50Q2VudHJlLmV2ZW50KFwiR2xvYmFsXCIsIFwiU3Bhd25cIilcclxuICAgICAgICAgICAgc3ByLnBhcmVudC5yZW1vdmVDaGlsZChzcHIpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuX1VJU2V0KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNpemUod2lkdGg6bnVtYmVyLGhlaWdodDpudW1iZXIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fdW5pdC5zaXplKHdpZHRoLGhlaWdodClcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIHBvcyh4Om51bWJlcix5Om51bWJlcik6dm9pZHtcclxuICAgICAgICB0aGlzLl91bml0LnBvcyh4LHkpXHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2lkZUZpZWxke1xyXG4gICAgLyoqXHJcbiAgICAgKiDlj7PkvqflubLlkZjmoI/nmoRVSeeuoeeQhuexu1xyXG4gICAgICovXHJcblxyXG4gICAgXHJcbiAgICBwcml2YXRlIF91cHBlclBhdGg6R2FtZUZpZWxkXHJcbiAgICBwcml2YXRlIF9mYXRoZXI6TGF5YS5TcHJpdGVcclxuICAgIC8vIHByaXZhdGUgX29wZXJhdG9yTGlzdDpzdHJpbmdbXVxyXG4gICAgcHJpdmF0ZSBfc2lkZU9wZXJhdG9yczpTaWRlT3BlcmF0b3JbXT0gW11cclxuICAgIHByaXZhdGUgX2RhdGFiYXNlOkRhdGFiYXNlXHJcbiAgICBwcml2YXRlIF9mcmFtZTpMYXlhLlNwcml0ZVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHVwcGVyUGF0aDpHYW1lRmllbGQsIGZhdGhlcjpMYXlhLlNwcml0ZSwgbGlzdDpzdHJpbmdbXSwgZGF0YWJhc2U6RGF0YWJhc2Upe1xyXG4gICAgICAgIHRoaXMuX3VwcGVyUGF0aCA9IHVwcGVyUGF0aFxyXG4gICAgICAgIHRoaXMuX2ZhdGhlciA9IGZhdGhlclxyXG4gICAgICAgIC8vIHRoaXMuX29wZXJhdG9yTGlzdCA9IGxpc3RcclxuICAgICAgICB0aGlzLl9kYXRhYmFzZSA9IGRhdGFiYXNlXHJcbiAgICAgICAgdGhpcy5fZnJhbWUgPSBMYXlhLlNwcml0ZS5mcm9tSW1hZ2UoXCJCYXNpYy9SZWMucG5nXCIpXHJcbiAgICAgICAgbGV0IGdyb3VuZDphbnkgPSBkYXRhYmFzZS5nZXRHcm91bmQoKVxyXG4gICAgICAgIHRoaXMuX2ZyYW1lLnNpemUoXHJcbiAgICAgICAgICAgIDEwMCxcclxuICAgICAgICAgICAgZ3JvdW5kW1wic2l6ZVwiXSpncm91bmRbXCJoZWlnaHRcIl1cclxuICAgICAgICApLnBvcyhcclxuICAgICAgICAgICAgZ3JvdW5kW1wic2l6ZVwiXSpncm91bmRbXCJ3aWR0aFwiXSxcclxuICAgICAgICAgICAgMFxyXG4gICAgICAgIClcclxuICAgICAgICB0aGlzLl9mYXRoZXIuYWRkQ2hpbGQodGhpcy5fZnJhbWUpXHJcbiAgICAgICAgdGhpcy5pbml0U2lkZShsaXN0KVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNpZGVGaWVsZOWvueixoeWIm+W7uuWujOaIkFwiKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMpXHJcbiAgICAgICAgY29uc29sZS5sb2coXCI9PT0gPT09ID09PVwiKVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBpbml0U2lkZShsaXN0OnN0cmluZ1tdKTp2b2lke1xyXG4gICAgICAgIGxpc3QuZm9yRWFjaCgoZWxlLGluZGV4KT0+e1xyXG4gICAgICAgICAgICBsZXQgZGF0YTphbnkgPSB0aGlzLl9kYXRhYmFzZS5nZXRPcGVyYXRvcihlbGUpXHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50U2lkZTpTaWRlT3BlcmF0b3IgPSBuZXcgU2lkZU9wZXJhdG9yKHRoaXMsIHRoaXMuX2ZyYW1lLCBkYXRhLCB0aGlzLl9kYXRhYmFzZSlcclxuICAgICAgICAgICAgY3VycmVudFNpZGUucG9zKDAsaW5kZXgqMTAwKVxyXG4gICAgICAgICAgICBjdXJyZW50U2lkZS5zaXplKDEwMCwxMDApXHJcbiAgICAgICAgICAgIHRoaXMuX3NpZGVPcGVyYXRvcnMucHVzaChjdXJyZW50U2lkZSlcclxuXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLmluaXRTaWRlID0gKCk9Pnt9XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbn0iLCJpbXBvcnQgR2FtZUNvbmZpZyBmcm9tIFwiLi9HYW1lQ29uZmlnXCI7XHJcbmNsYXNzIE1haW4ge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0Ly/moLnmja5JREXorr7nva7liJ3lp4vljJblvJXmk45cdFx0XHJcblx0XHRpZiAod2luZG93W1wiTGF5YTNEXCJdKSBMYXlhM0QuaW5pdChHYW1lQ29uZmlnLndpZHRoLCBHYW1lQ29uZmlnLmhlaWdodCk7XHJcblx0XHRlbHNlIExheWEuaW5pdChHYW1lQ29uZmlnLndpZHRoLCBHYW1lQ29uZmlnLmhlaWdodCwgTGF5YVtcIldlYkdMXCJdKTtcclxuXHRcdExheWFbXCJQaHlzaWNzXCJdICYmIExheWFbXCJQaHlzaWNzXCJdLmVuYWJsZSgpO1xyXG5cdFx0TGF5YVtcIkRlYnVnUGFuZWxcIl0gJiYgTGF5YVtcIkRlYnVnUGFuZWxcIl0uZW5hYmxlKCk7XHJcblx0XHRMYXlhLnN0YWdlLnNjYWxlTW9kZSA9IEdhbWVDb25maWcuc2NhbGVNb2RlO1xyXG5cdFx0TGF5YS5zdGFnZS5zY3JlZW5Nb2RlID0gR2FtZUNvbmZpZy5zY3JlZW5Nb2RlO1xyXG5cdFx0Ly/lhbzlrrnlvq7kv6HkuI3mlK/mjIHliqDovb1zY2VuZeWQjue8gOWcuuaZr1xyXG5cdFx0TGF5YS5VUkwuZXhwb3J0U2NlbmVUb0pzb24gPSBHYW1lQ29uZmlnLmV4cG9ydFNjZW5lVG9Kc29uO1xyXG5cclxuXHRcdC8v5omT5byA6LCD6K+V6Z2i5p2/77yI6YCa6L+HSURF6K6+572u6LCD6K+V5qih5byP77yM5oiW6ICFdXJs5Zyw5Z2A5aKe5YqgZGVidWc9dHJ1ZeWPguaVsO+8jOWdh+WPr+aJk+W8gOiwg+ivlemdouadv++8iVxyXG5cdFx0aWYgKEdhbWVDb25maWcuZGVidWcgfHwgTGF5YS5VdGlscy5nZXRRdWVyeVN0cmluZyhcImRlYnVnXCIpID09IFwidHJ1ZVwiKSBMYXlhLmVuYWJsZURlYnVnUGFuZWwoKTtcclxuXHRcdGlmIChHYW1lQ29uZmlnLnBoeXNpY3NEZWJ1ZyAmJiBMYXlhW1wiUGh5c2ljc0RlYnVnRHJhd1wiXSkgTGF5YVtcIlBoeXNpY3NEZWJ1Z0RyYXdcIl0uZW5hYmxlKCk7XHJcblx0XHRpZiAoR2FtZUNvbmZpZy5zdGF0KSBMYXlhLlN0YXQuc2hvdygpO1xyXG5cdFx0TGF5YS5hbGVydEdsb2JhbEVycm9yID0gdHJ1ZTtcclxuXHJcblx0XHQvL+a/gOa0u+i1hOa6kOeJiOacrOaOp+WItu+8jHZlcnNpb24uanNvbueUsUlEReWPkeW4g+WKn+iDveiHquWKqOeUn+aIkO+8jOWmguaenOayoeacieS5n+S4jeW9seWTjeWQjue7rea1geeoi1xyXG5cdFx0TGF5YS5SZXNvdXJjZVZlcnNpb24uZW5hYmxlKFwidmVyc2lvbi5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vblZlcnNpb25Mb2FkZWQpLCBMYXlhLlJlc291cmNlVmVyc2lvbi5GSUxFTkFNRV9WRVJTSU9OKTtcclxuXHR9XHJcblxyXG5cdG9uVmVyc2lvbkxvYWRlZCgpOiB2b2lkIHtcclxuXHRcdC8v5r+A5rS75aSn5bCP5Zu+5pig5bCE77yM5Yqg6L295bCP5Zu+55qE5pe25YCZ77yM5aaC5p6c5Y+R546w5bCP5Zu+5Zyo5aSn5Zu+5ZCI6ZuG6YeM6Z2i77yM5YiZ5LyY5YWI5Yqg6L295aSn5Zu+5ZCI6ZuG77yM6ICM5LiN5piv5bCP5Zu+XHJcblx0XHRMYXlhLkF0bGFzSW5mb01hbmFnZXIuZW5hYmxlKFwiZmlsZWNvbmZpZy5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vbkNvbmZpZ0xvYWRlZCkpO1xyXG5cdH1cclxuXHJcblx0b25Db25maWdMb2FkZWQoKTogdm9pZCB7XHJcblx0XHQvL+WKoOi9vUlEReaMh+WumueahOWcuuaZr1xyXG5cdFx0R2FtZUNvbmZpZy5zdGFydFNjZW5lICYmIExheWEuU2NlbmUub3BlbihHYW1lQ29uZmlnLnN0YXJ0U2NlbmUpO1xyXG5cdH1cclxufVxyXG4vL+a/gOa0u+WQr+WKqOexu1xyXG5uZXcgTWFpbigpO1xyXG4iLCJpbXBvcnQge3VpfSBmcm9tIFwiLi4vdWkvbGF5YU1heFVJXCJcclxuaW1wb3J0IEVuZW15IGZyb20gXCIuLi9HYW1lT2JqL0VuZW15XCJcclxuaW1wb3J0IHtHcmlkc30gZnJvbSBcIi4uL0dhbWVPYmovR3JpZHNcIlxyXG5pbXBvcnQgRG9jdG9yIGZyb20gXCIuLi9HYW1lT2JqL0RvY3RvclwiXHJcbmltcG9ydCBPcGVyYXRvciBmcm9tIFwiLi4vR2FtZU9iai9PcGVyYXRvclwiXHJcbmltcG9ydCB7U3RydWN9IGZyb20gXCIuLi9EYXRhU3RydWN0dXJlXCJcclxuaW1wb3J0IERhdGFiYXNlIGZyb20gXCIuLi9HYW1lT2JqL0RhdGFiYXNlXCJcclxuLy8gaW1wb3J0IEdhbWVFdmVudE1hbmFnZXIgZnJvbSBcIi4uL0dhbWVPYmovR2FtZUV2ZW50XCI7XHJcbmltcG9ydCBTaWRlRmllbGQgZnJvbSBcIi4uL0dhbWVPYmovU2lkZUZpZWxkXCI7XHJcbmltcG9ydCBFdmVudENlbnRyZSBmcm9tIFwiLi4vRXZlbnRDZW50cmVcIlxyXG5jb25zdCB7bG9nfSA9IGNvbnNvbGU7XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVGaWVsZCBleHRlbmRzIHVpLkdhbWVGaWVsZFNjZW5lVUl7XHJcbiAgICBcclxuICAgIHB1YmxpYyBfZGF0YWJhc2U6RGF0YWJhc2VcclxuICAgIHB1YmxpYyBfZ3JpZHM6R3JpZHNcclxuICAgIHByaXZhdGUgX2VuZW1pZXM6RW5lbXlbXSA9IFtdXHJcbiAgICBwcml2YXRlIF9vcGVyYXRvcnM6T3BlcmF0b3JbXSA9IFtdXHJcbiAgICBwcml2YXRlIF9kb2N0b3I6RG9jdG9yIFxyXG4gICAgcHVibGljIHNpZGVGaWVsZDpTaWRlRmllbGRcclxuXHJcbiAgICBwcml2YXRlIF90aW1lX2ZyYW1lOm51bWJlciA9IDBcclxuXHJcbiAgICBwcml2YXRlIF90ZXN0RnVuYzpGdW5jdGlvblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpXHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIHRoaXMuc3RhZ2Uub24oXCJmdWNrXCIsIHRoaXMsIChhOnN0cmluZyk9Pntjb25zb2xlLmxvZyhhKX0sIFtcIjVcIl0pXHJcbiAgICAgICAgdGhpcy5zdGFnZS5ldmVudChcImZ1Y2tcIiwgW1wiNlwiXSlcclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICB0aGlzLl9kYXRhYmFzZSA9IG5ldyBEYXRhYmFzZSgpXHJcbiAgICAgICAgdGhpcy5fZ3JpZHMgPSBuZXcgR3JpZHModGhpcyx0aGlzLlVJU2V0LHRoaXMuX2RhdGFiYXNlKVxyXG4gICAgICAgIHRoaXMuc2lkZUZpZWxkID0gbmV3IFNpZGVGaWVsZCh0aGlzLCB0aGlzLlVJU2V0LCBbXCJiaXJkXCIsXCJzYlwiLFwiYmlyZFwiXSwgdGhpcy5fZGF0YWJhc2UpLy/lj4LmlbBbXCJiaXJkXCJd5bCG5Zyo6YCJ5Lq65Yqf6IO95a6M5oiQ5ZCO5pS55Li65Y+Y6YePXHJcbiAgICAgICAgLy8gdGhpcy5fZ2FtZUV2ZW50TWFuYWdlciA9IG5ldyBHYW1lRXZlbnRNYW5hZ2VyKHRoaXMpXHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgICAgICBFdmVudENlbnRyZS5vbihcIkdsb2JhbFwiLCBcIlNwYXduXCIsIHRoaXMsIHRoaXMubmV3T3BlcmF0b3IpXHJcblxyXG5cclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgICAgIExheWEudGltZXIubG9vcCgyMCx0aGlzLHRoaXMudG9Mb29wKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbmV3T3BlcmF0b3IoKXtcclxuICAgICAgICB0aGlzLl9vcGVyYXRvcnMucHVzaChuZXcgT3BlcmF0b3IodGhpcywgWzAsMF0pKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU3Bhd24gT3BlcmF0b3IhISEhISEhXCIpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRvTG9vcCgpe1xyXG4gICAgICAgIHdoaWxlICh0aGlzLl9kYXRhYmFzZS5pc0hhcHBlbmluZyh0aGlzLl90aW1lX2ZyYW1lKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9lbmVtaWVzLnB1c2gobmV3IEVuZW15KHRoaXMsdGhpcy5VSVNldCxcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFiYXNlLnJlYWRUaW1lRXZlbnQoKS50eXBlRGF0YSxcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFiYXNlLnJlYWRUaW1lRXZlbnQoKS5wYXRoLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0YWJhc2UpKVxyXG4gICAgICAgICAgICB0aGlzLl9kYXRhYmFzZS5yZWFkVGltZUV2ZW50RG9uZSgpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9lbmVtaWVzLmZvckVhY2goZWxlPT57XHJcbiAgICAgICAgICAgIGVsZS51cGRhdGUoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHRoaXMuX3RpbWVfZnJhbWUgKz0gMVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHByaXZhdGUgaW5pdF9zaWRlRXZlbnQoKTp2b2lke1xyXG4gICAgLy8gICAgIGxldCB0b0J1aWxkRXZlbnRzOkxheWEuU3ByaXRlW10gPSB0aGlzLnNpZGVGaWVsZC5zaWRlU3ByaXRlcyAgICAvL+S7juS+p+i+ueagj+S4reiOt+WPlnNwcml0ZVxyXG4gICAgLy8gICAgIGxldCBkYXRhOmFueVtdID0gdGhpcy5zaWRlRmllbGQuc2lkZURhdGEgICAgICAgICAgICAgICAgICAgICAgICAvL+S7juS+p+i+ueagj+S4reiOt+WPluWQhOS4quWFg+e0oOWvueW6lOeahOW5suWRmOaVsOaNrlxyXG4gICAgLy8gICAgIHRvQnVpbGRFdmVudHMuZm9yRWFjaCgoZWxlLCBpbmRleCk9PnsgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+S4uuavj+S4quiOt+WPluWIsOeahHNwcml0Zeiuvue9rueCueWHu+S6i+S7tlxyXG4gICAgLy8gICAgICAgICBlbGUub24oTGF5YS5FdmVudC5NT1VTRV9ET1dOLCB0aGlzLCB0aGlzLm9uRHJhZywgW2RhdGFbaW5kZXhdXSlcclxuICAgIC8vICAgICB9KVxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHByaXZhdGUgb25EcmFnKGRhdGE6YW55KTp2b2lke1xyXG4gICAgLy8gICAgIGxldCBzcHI6TGF5YS5TcHJpdGUgPSBMYXlhLlNwcml0ZS5mcm9tSW1hZ2UoZGF0YVtcImltZ1wiXSkgICAgICAgIC8v55Sf5oiQ5bmy5ZGY5bCP5Lq677yI5bCx5piv5LuO6I+c5Y2V6YeM5ou95Ye65p2l6YKj5Liq5bCP5Lq6XHJcbiAgICAvLyAgICAgc3ByLnNpemUodGhpcy5fZGF0YWJhc2UuZ2V0R3JvdW5kKClbXCJzaXplXCJdLHRoaXMuX2RhdGFiYXNlLmdldEdyb3VuZCgpW1wic2l6ZVwiXSkgLy/osIPmlbTlpKflsI9cclxuICAgIC8vICAgICB0aGlzLlVJU2V0LmFkZENoaWxkKHNwcikgICAvL+aUvui/m1VJU2V0XHJcbiAgICAvLyAgICAgbGV0IGRyYWdpbmc6RnVuY3Rpb24gPSAoKT0+eyAgICAvL+iuvue9ruaLluaLveaXtueahGZ1bmN0aW9uXHJcbiAgICAvLyAgICAgICAgIHNwci5wb3MoXHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLlVJU2V0Lm1vdXNlWCxcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuVUlTZXQubW91c2VZXHJcbiAgICAvLyAgICAgICAgIClcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgTGF5YS50aW1lci5sb29wKDEwLCB0aGlzLCBkcmFnaW5nKSAgLy/orr7nva7mi5bmi73lvqrnjq9cclxuICAgIC8vICAgICB0aGlzLnN0YWdlLm9uKExheWEuRXZlbnQuTU9VU0VfVVAsIHRoaXMsICgpPT57TGF5YS50aW1lci5jbGVhcih0aGlzLGRyYWdpbmcpfSkgIC8v6byg5qCH5p2+5byA5pe25YGc5q2i5ouW5ou95b6q546vXHJcbiAgICAvLyB9XHJcblxyXG59XHJcbi8vIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVGaWVsZCBleHRlbmRzIHVpLkdhbWVGaWVsZFNjZW5lVUl7XHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIHNiXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHB1YmxpYyBncmlkczpHcmlkc1xyXG4vLyAgICAgcHVibGljIGRvY3RvcjpEb2N0b3JcclxuLy8gICAgIHB1YmxpYyBvcGVyYXRvcnM6QXJyYXk8T3BlcmF0b3I+ID0gW11cclxuLy8gICAgIHB1YmxpYyBlbmVtaWVzOkFycmF5PEVuZW15PiA9IFtdXHJcbi8vICAgICBwcml2YXRlIG9uS2V5ZG93bjpGdW5jdGlvblxyXG5cclxuLy8gICAgIHB1YmxpYyBHYW1lU2V0OkpTT05cclxuLy8gICAgIHB1YmxpYyBFbmVteURhdGFiYXNlOkpTT05cclxuLy8gICAgIHB1YmxpYyBUaW1lVGFibGU6U3RydWMuUG9pbnRlckxpc3Q8dGltZU5vZGU+XHJcblxyXG4vLyAgICAgcHJpdmF0ZSB0aW1lOm51bWJlclxyXG5cclxuXHJcblxyXG4vLyAgICAgLy8gcHVibGljIGZyYW1lTG9vcDpMYXlhLnRpbWVyXHJcbi8vICAgICBjb25zdHJ1Y3Rvcigpe1xyXG4vLyAgICAgICAgIHN1cGVyKClcclxuICAgICAgICBcclxuLy8gICAgICAgICB0aGlzXHJcbi8vICAgICAgICAgTGF5YS5sb2FkZXIubG9hZChbZ2FtZVNldF9qc29uLCBlbmVteURhdGFiYXNlXSwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLm9uTG9hZGVkKSxudWxsLExheWEuTG9hZGVyLkpTT04pXHJcbi8vICAgICAgICAgLy/liqDovb3mlYzkurrmlbDmja7lupNcclxuLy8gICAgICAgICAvL+WKoOi9veWcsOWbviAgXHJcbiAgICAgICAgXHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgcHJpdmF0ZSBvbkxvYWRlZCgpey8v5Yqg6L295a6M5oiQ5ZCO5omn6KGM5q2k5Ye95pWwXHJcblxyXG4vLyAgICAgICAgIHRoaXMuR2FtZVNldCA9IExheWEubG9hZGVyLmdldFJlcyhnYW1lU2V0X2pzb24pLy/ojrflj5blt7LliqDovb3nmoTlnLDlm75cclxuLy8gICAgICAgICB0aGlzLkVuZW15RGF0YWJhc2UgPSBMYXlhLmxvYWRlci5nZXRSZXMoZW5lbXlEYXRhYmFzZSkvL+iOt+WPluW3suWKoOi9veeahOaVjOS6uuaVsOaNrlxyXG4vLyAgICAgICAgIHRoaXMuaW5pdFRpbWVUYWJsZSgpLy/ku47lnLDlm77mlbDmja7kuK3liqDovb3ml7bpl7TooahcclxuLy8gICAgICAgICB0aGlzLnRpbWUgPSAwLy/lsIbml7bpl7Torr7kuLowO+aXtumXtOWNleS9jeS4uuW4p1xyXG4vLyAgICAgICAgIHRoaXMuZ3JpZHMgPSBuZXcgR3JpZHModGhpcy5VSVNldCx0aGlzLHRoaXMuR2FtZVNldCkvL+S+neaNruW3suWKoOi9veeahOWcsOWbvuaVsOaNru+8jOiuvue9ruWcsOWbvlxyXG4vLyAgICAgICAgIHRoaXMuZG9jdG9yID0gbmV3IERvY3RvcigpLy/liJ3lp4vljJbliIDlrqLku5blr7nosaFcclxuLy8gICAgICAgICB0aGlzLmtleUJvYXJkRXZlbnRTZXR1cCgpLy/liJ3lp4vljJbplK7nm5jkuovku7ZcclxuLy8gICAgICAgICAvKirmtYvor5Xku6PnoIEgKi9cclxuLy8gICAgICAgICAvLyB0aGlzLmVuZW1pZXMucHVzaChuZXcgRW5lbXkodGhpcy5VSVNldCwgdGhpcywgXCJidWcwXCIsIFtdKSlcclxuLy8gICAgICAgICAvKirmtYvor5Xku6PnoIFFbmQgKi9cclxuXHJcbi8vICAgICAgICAgTGF5YS50aW1lci5sb29wKDIwLHRoaXMsdGhpcy5mcmFtZUxvb3ApLy/lvIDlkK/muLjmiI/luKflvqrnjq9cclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBwcml2YXRlIGluaXRUaW1lVGFibGUoKXtcclxuLy8gICAgICAgICB0aGlzLlRpbWVUYWJsZSA9IG5ldyBTdHJ1Yy5Qb2ludGVyTGlzdDx0aW1lTm9kZT4oKVxyXG4vLyAgICAgICAgIGNvbnN0IHJhd1RhYmxlOkFycmF5PGFueT4gPSB0aGlzLkdhbWVTZXRbXCJ0aW1ldGFibGVcIl1cclxuLy8gICAgICAgICByYXdUYWJsZS5mb3JFYWNoKChlbGUpPT57XHJcbi8vICAgICAgICAgICAgIHRoaXMuVGltZVRhYmxlLnB1c2goe1xyXG4vLyAgICAgICAgICAgICAgICAgdGltZTplbGUudGltZSxcclxuLy8gICAgICAgICAgICAgICAgIHR5cGU6dGhpcy5FbmVteURhdGFiYXNlW2VsZS50eXBlXSxcclxuLy8gICAgICAgICAgICAgICAgIHBhdGg6dGhpcy5HYW1lU2V0W1wicGF0aHNcIl1bZWxlLnBhdGhdXHJcbi8vICAgICAgICAgICAgIH0pXHJcbi8vICAgICAgICAgfSlcclxuLy8gICAgICAgICBsb2codGhpcy5UaW1lVGFibGUpXHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgcHJpdmF0ZSBrZXlCb2FyZEV2ZW50U2V0dXAoKXtcclxuLy8gICAgICAgICB0aGlzLm9uS2V5ZG93biA9IChlOkxheWEuRXZlbnQpID0+IHtcclxuLy8gICAgICAgICAgICAgLyoq5rWL6K+V5Luj56CBICovXHJcbi8vICAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IExheWEuS2V5Ym9hcmQuRSkge1xyXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5lbmVtaWVzKVxyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IExheWEuS2V5Ym9hcmQuRikge1xyXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5lbmVtaWVzWzBdKVxyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIC8qKua1i+ivleS7o+eggUVuZCAqL1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBMYXlhLnN0YWdlLm9uKExheWEuRXZlbnQuS0VZX0RPV04sdGhpcyx0aGlzLm9uS2V5ZG93bilcclxuLy8gICAgIH1cclxuXHJcblxyXG4vLyAgICAgcHVibGljIGZyYW1lTG9vcCgpey8v5q+P5bin6YO95Lya5omn6KGM55qE5Luj56CB5Z2XXHJcbi8vICAgICAgICAgaWYgKHRoaXMuVGltZVRhYmxlLnJlYWQoKSAmJiB0aGlzLnRpbWUgPT09IHRoaXMuVGltZVRhYmxlLnJlYWQoKS50aW1lKSB7XHJcbi8vICAgICAgICAgICAgIHRoaXMuZW5lbWllcy5wdXNoKG5ldyBFbmVteSh0aGlzLlVJU2V0LHRoaXMsXHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLlRpbWVUYWJsZS5yZWFkKCkudHlwZSxcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuVGltZVRhYmxlLnJlYWQoKS5wYXRoKSlcclxuLy8gICAgICAgICAgICAgdGhpcy5UaW1lVGFibGUuc3RlcCgpXHJcbi8vICAgICAgICAgfVxyXG5cclxuXHJcbi8vICAgICAgICAgdGhpcy5vcGVyYXRvcnMuZm9yRWFjaCgoZWxlKT0+ey8v5omn6KGM5omA5pyJ5bmy5ZGY5a+56LGh55qEdXBkYXRl5pa55rOVXHJcbi8vICAgICAgICAgICAgIGVsZS51cGRhdGUoKVxyXG4gICAgICAgICAgICBcclxuLy8gICAgICAgICB9KVxyXG4vLyAgICAgICAgIHRoaXMuZW5lbWllcy5mb3JFYWNoKChlbGUpPT57Ly/miafooYzmiYDmnInmlYzkurrlr7nosaHnmoR1cGRhdGXmlrnms5VcclxuLy8gICAgICAgICAgICAgZWxlLnVwZGF0ZSgpXHJcbi8vICAgICAgICAgfSlcclxuLy8gICAgICAgICB0aGlzLnRpbWUgKytcclxuLy8gICAgIH1cclxuXHJcblxyXG5cclxuLy8gICAgIGFkZE9wZXJhdG9yKHBsYWNlOm51bWJlcltdKXsvL+WcqOWcsOWbvuS4iua3u+WKoOW5suWRmFxyXG4vLyAgICAgICAgIC8v5q2k5pa55rOV6KKr5L2c5Li65Zue6LCD5Ye95pWw5o+Q5L6b57uZdGhpcy5ncmlkc+Wvueixoe+8jOWcqOeCueWHu+WcsOWbvuepuuagvOaXtuaJp+ihjFxyXG5cclxuLy8gICAgICAgICB0aGlzLm9wZXJhdG9ycy5wdXNoKG5ldyBPcGVyYXRvcih0aGlzLHBsYWNlKSlcclxuICAgICAgICBcclxuLy8gICAgIH1cclxuXHJcbi8vIH0iLCJpbXBvcnQge3VpfSBmcm9tIFwiLi4vdWkvbGF5YU1heFVJXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvYWRpbmcgZXh0ZW5kcyB1aS5Mb2FkaW5nU2NlbmVVSXtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKVxyXG4gICAgICAgIGNvbnN0IGdhbWVTZXQ6c3RyaW5nID0gXCIuL0RhdGFiYXNlL0dhbWVTZXQuanNvblwiLFxyXG4gICAgICAgIGVuZW15RGF0YWJhc2U6c3RyaW5nID0gXCIuL0RhdGFiYXNlL0VuZW15RGF0YWJhc2UuanNvblwiLFxyXG4gICAgICAgIG9wZXJhdG9yRGF0YWJhc2U6c3RyaW5nID0gXCIuL0RhdGFiYXNlL09wZXJhdG9yRGF0YWJhc2UuanNvblwiXHJcbiAgICAgICAgTGF5YS5sb2FkZXIubG9hZChbZ2FtZVNldCxlbmVteURhdGFiYXNlLG9wZXJhdG9yRGF0YWJhc2VdLExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vbkxvYWRlZCksbnVsbCxMYXlhLkxvYWRlci5KU09OKVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZGVkKCl7XHJcbiAgICAgICAgTGF5YS5TY2VuZS5vcGVuKFwiR2FtZUZpZWxkU2NlbmUuc2NlbmVcIilcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhMYXlhLmxvYWRlcilcclxuICAgIH1cclxufSIsIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXlNYXRoe1xyXG4gICAgcHVibGljIHN0YXRpYyBtb3ZlVG8oZnJvbnQ6bnVtYmVyLCBzaGlmdDpudW1iZXIsIGVuZDpudW1iZXIpOm51bWJlciB7XHJcbiAgICAgICAgaWYoc2hpZnQ9PT0wKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZyb250XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzaGlmdD4wP1xyXG4gICAgICAgICAgICAoKGZyb250K3NoaWZ0KT5lbmQ/ZW5kOmZyb250K3NoaWZ0KTpcclxuICAgICAgICAgICAgKChmcm9udCtzaGlmdCk8ZW5kP2VuZDpmcm9udCtzaGlmdClcclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5cclxuIiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXG5pbXBvcnQgVmlldz1MYXlhLlZpZXc7XHJcbmltcG9ydCBEaWFsb2c9TGF5YS5EaWFsb2c7XHJcbmltcG9ydCBTY2VuZT1MYXlhLlNjZW5lO1xudmFyIFJFRzogRnVuY3Rpb24gPSBMYXlhLkNsYXNzVXRpbHMucmVnQ2xhc3M7XG5leHBvcnQgbW9kdWxlIHVpIHtcclxuICAgIGV4cG9ydCBjbGFzcyBHYW1lRmllbGRTY2VuZVVJIGV4dGVuZHMgU2NlbmUge1xyXG5cdFx0cHVibGljIFVJU2V0OkxheWEuU3ByaXRlO1xuXHRcdHB1YmxpYyBUMV8xOkxheWEuU3ByaXRlO1xuXHRcdHB1YmxpYyBUMl8yOkxheWEuU3ByaXRlO1xuXHRcdHB1YmxpYyBUM18xOkxheWEuU3ByaXRlO1xuXHRcdHB1YmxpYyBUMl8xOkxheWEuU3ByaXRlO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiR2FtZUZpZWxkU2NlbmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkuR2FtZUZpZWxkU2NlbmVVSVwiLEdhbWVGaWVsZFNjZW5lVUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIExvYWRpbmdTY2VuZVVJIGV4dGVuZHMgU2NlbmUge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJMb2FkaW5nU2NlbmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkuTG9hZGluZ1NjZW5lVUlcIixMb2FkaW5nU2NlbmVVSSk7XHJcbn1cciJdfQ==
