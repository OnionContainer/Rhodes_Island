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
var KVPair = /** @class */ (function () {
    function KVPair() {
        this._list = {};
    }
    KVPair.prototype.edit = function (key, value) {
        this._list[key] = value;
    };
    KVPair.prototype.read = function (key) {
        return this._list[key];
    };
    KVPair.prototype.iterate = function (f) {
        for (var k in this._list) {
            f(k, this._list[k]);
        }
    };
    return KVPair;
}());
exports.KVPair = KVPair;
var Node = /** @class */ (function () {
    function Node(item, next) {
        this.item = item;
        this.next = next;
    }
    return Node;
}());
var LinkList = /** @class */ (function () {
    function LinkList() {
        this._length = 0;
        this._head = new Node(null, null);
        this._tail = new Node(null, null);
    }
    Object.defineProperty(LinkList.prototype, "length", {
        //基础属性
        get: function () {
            // let result:number = 0;
            // let current:Node<E> = this._head;
            // while (current.next !== null) {
            //     result += 1;
            //     current = current.next;
            // }
            // return result;
            return this._length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LinkList.prototype, "isEmpty", {
        get: function () {
            return this._head.next === null;
        },
        enumerable: true,
        configurable: true
    });
    //增删改查
    //增
    LinkList.prototype.push = function (item) {
        var last = new Node(item, null);
        if (this.isEmpty) {
            this._head.next = last;
            this._tail.next = last;
        }
        else {
            this._tail.next.next = last;
            this._tail.next = last;
        }
        this._length += 1;
    };
    LinkList.prototype.unshift = function (item) {
        var first = new Node(item, null);
        if (this.isEmpty) {
            this._tail.next = first;
            this._head.next = first;
        }
        else {
            first.next = this._head.next;
            this._head.next = first;
        }
        this._length += 1;
    };
    LinkList.prototype.insert = function (index, item) {
        if (index < 0 || index > this._length) { //这句不一样
            return false;
        }
        if (index === this.length) {
            this.push(item);
            return true;
        }
        var current = this._head; //这句和其他遍历是不一样的，因为要选取到选定位置的前面一格
        for (var n = 0; n < index; n += 1) {
            current = current.next;
        }
        current.next = new Node(item, current.next);
        this._length += 1;
        return true;
    };
    //删
    LinkList.prototype.remove = function (index) {
        if (index < 0 || index >= this.length) {
            return null;
        }
        var current = this._head.next;
        for (var n = 0; n < index; n += 1) {
            current = current.next;
        }
        var item = current.item;
        current = null;
        this._length -= 1;
        return current.item;
    };
    LinkList.prototype.shift = function () {
        if (this.isEmpty) {
            return null;
        }
        var item = this._head.next.item;
        this._head.next = this._head.next.next;
        if (this.isEmpty) {
            this._tail.next = null;
        }
        this._length -= 1;
        return item;
    };
    //改
    LinkList.prototype.write = function (index, item) {
        if (index < 0 || index >= this.length) {
            return;
        }
        var current = this._head.next;
        for (var n = 0; n < index; n += 1) {
            current = current.next;
        }
        current.item = item;
    };
    //查
    LinkList.prototype.read = function (index) {
        if (index < 0 || index >= this.length) {
            return;
        }
        var current = this._head.next;
        for (var n = 0; n < index; n += 1) {
            current = current.next;
        }
        return current.item;
    };
    LinkList.prototype.search = function (item) {
        var result = [];
        this.foreach(function (ele, index) {
            if (ele === item) {
                result.push(index);
            }
        });
        return result;
    };
    /**
     * 判断链表中是否存在某一元素
     * @param item
     */
    LinkList.prototype.has = function (item) {
        var current = this._head.next;
        while (current != null) {
            if (current.item == item) {
                return true;
            }
            current = current.next;
        }
        return false;
    };
    //高阶函数
    LinkList.prototype.foreach = function (f) {
        var current = this._head.next;
        var num = 0;
        while (current !== null) {
            f(current.item, num, this);
            current = current.next;
            num += 1;
        }
    };
    /**
     * 请暂时不要使用这个函数，因为我也不知道它会不会爆炸
     * 除非你读过这个函数的源代码
     * @param f 判断元素优先级的回调函数
     * @param increase 是否升序，默认升序
     * @returns 返回一个排序的链表
     */
    LinkList.prototype.sortby = function (f, increase) {
        if (increase === void 0) { increase = true; }
        var priority = new LinkList();
        var sorted = new LinkList();
        priority.push(-0);
        sorted.push(null);
        var compare = increase ? function (a, b) { return a < b; } : function (a, b) { return a > b; };
        this.foreach(function (ele) {
            var currentPri = f(ele);
            var node = sorted._head.next;
            var priNode = priority._head.next;
            var foundPlace = false;
            while (node.next !== null) {
                // if (currentPri < priNode.next.item) {
                if (compare(currentPri, priNode.next.item)) {
                    node.next = new Node(ele, node.next);
                    priNode.next = new Node(currentPri, priNode.next);
                    foundPlace = true;
                    break;
                }
                node = node.next;
                priNode = priNode.next;
            }
            if (!foundPlace) {
                sorted.push(ele);
                priority.push(currentPri);
            }
        });
        sorted.shift();
        return sorted;
    };
    return LinkList;
}());
exports.LinkList = LinkList;
var PArray = /** @class */ (function () {
    function PArray(source, initPoint) {
        if (source === void 0) { source = []; }
        if (initPoint === void 0) { initPoint = -1; }
        this.arr = source;
        this.pointer = initPoint;
    }
    PArray.prototype.read = function () {
        return this.arr[this.pointer];
    };
    ;
    PArray.prototype.step = function () {
        this.pointer += 1;
    };
    Object.defineProperty(PArray.prototype, "out", {
        get: function () {
            return this.pointer < 0 || this.pointer >= this.arr.length;
        },
        enumerable: true,
        configurable: true
    });
    return PArray;
}());
exports.PArray = PArray;
var ArrayAlgo = /** @class */ (function () {
    function ArrayAlgo() {
    }
    /**
     * 输入的两个数组的每个index对应元素是否相等
     * @param arr0
     * @param arr1
     */
    ArrayAlgo.strictCompare = function (arr0, arr1) {
        if (arr0.length !== arr1.length) {
            return false;
        }
        for (var i = 0; i < arr0.length; i += 1) {
            if (!arr0[i].equals(arr1[i])) {
                return false;
            }
        }
        return true;
    };
    /**
     * 返回一个集合c，且使得它具有如下性质：
     * 对于每个存在于集合a中的元素，如果它不在集合b中，则它在集合c中
     * 即c=a-b
     * @param a
     * @param b
     */
    ArrayAlgo.findComplementSet = function (a, b) {
        var result = [];
        for (var _i = 0, a_1 = a; _i < a_1.length; _i++) {
            var ele = a_1[_i];
            if (ArrayAlgo.findEle(ele, b) === -1) {
                result.push(ele);
            }
        }
        ;
        //求相对补集a-b
        return result;
    };
    ArrayAlgo.findIntersectionSet = function (a, b) {
        //求交集a∩b
    };
    /**
     * 求ele在arr中的index，若未找到则返回-1
     * ele必须实现comparable接口
     * @param ele
     * @param arr
     */
    ArrayAlgo.findEle = function (ele, arr) {
        for (var i = 0; i < arr.length; i += 1) {
            if (ele.equals(arr[i])) {
                return i;
            }
        }
        return -1;
    };
    /**
     * 从arr中移除ele
     * 如果ele不存在则什么都不做
     * @param ele
     * @param arr
     */
    ArrayAlgo.removeEle = function (ele, arr) {
        var i = arr.indexOf(ele);
        if (i !== -1) {
            arr.splice(i, 1);
        }
        return arr;
    };
    return ArrayAlgo;
}());
exports.ArrayAlgo = ArrayAlgo;
// export class Box extends Laya.Rectangle{
//     public unitX:number;
//     public unitY:number;
//     constructor(){
//         super(0,0,0,0);
//     }
//     /**
//      * 就是……来一组（100个）随机的碰撞箱
//      * @param xRange 
//      * @param yRange 
//      * @param widRange 
//      * @param higRange
//      */
//     public static randomBoxes(xRange:number = 1200, yRange:number = 800, widRange:number = 300, higRange:number = 300):Box[]{
//         const rad:Function = MyMath.randomInt;
//         let result:Box[] = [];
//         for(let i = 0; i < 50; i += 1) {
//             result.push(new Box());
//             result[i].pos(rad(xRange), rad(yRange)).size(rad(widRange), rad(higRange));
//         }
//         return result;
//     }
//     public pos(x:number, y:number):Box{
//         this.x = x;
//         this.y = y;
//         return this;
//     }
//     public size(width:number, height:number):Box{
//         this.width = width;
//         this.height = height;
//         return this;
//     }
//     public intersects_X(rec:Box):boolean{
//         if (this.x < rec.x) {
//             return rec.intersects_X(this);
//         }
//         return  (this.x >= rec.x && this.x <= rec.right) ||
//                 (this.right >= rec.x && this.right <= rec.right)
//     }
//     public intersects_Y(rec:Box):boolean{
//         if (this.y<rec.y) {
//             return rec.intersects_Y(this);
//         }
//         return  (this.y >= rec.y && this.y <= rec.bottom) ||
//                 (this.bottom >= rec.y && this.bottom <= rec.bottom)
//     }
// }
// class MapNode<K,V>{
//     public key;
//     public value;
//     constructor(key:K, value:V){
//         this.key = key;
//         this.value = value;
//     }
// }
// export module Struc{
//     export class LinkList<E>{
//         private _head:Node<E>;
//         private _tail:Node<E>;
//         constructor(){
//             this._head = new Node<E>(null, null);
//             this._tail = new Node<E>(null, null);
//         }
//         //基础属性
//         public get length():number{
//             let result:number = 0;
//             let current:Node<E> = this._head;
//             while (current.next !== null) {
//                 result += 1;
//                 current = current.next;
//             }
//             return result;
//         }
//         public get isEmpty():boolean{
//             return this._head.next === null;
//         }
//         //增删改查
//         //增
//         public push(item:E):void{
//             let last:Node<E> = new Node<E>(item, null);
//             if (this.isEmpty) {
//                 this._head.next = last;
//                 this._tail.next = last;
//             } else {
//                 this._tail.next.next = last;
//                 this._tail.next = last;
//             }
//         }
//         public unshift(item:E):void{
//             let first:Node<E> = new Node<E>(item, null);
//             if (this.isEmpty) {
//                 this._tail.next = first;
//                 this._head.next = first;
//             } else {
//                 first.next = this._head.next.next;
//                 this._head.next = first;
//             }
//         }
//         public insert(index:number, item:E):boolean{
//             if (index < 0 || index > this.length) {//这句不一样
//                 return false;
//             }
//             if (index === this.length) {
//                 this.push(item);
//                 return true;
//             }
//             let current:Node<E> = this._head;//这句和其他遍历是不一样的，因为要选取到选定位置的前面一格
//             for (let n = 0; n < index; n += 1) {
//                 current = current.next;
//             }
//             current.next = new Node<E>(item, current.next);
//             return true;
//         }
//         //删
//         public remove(index:number):E{
//             if (index < 0 || index >= this.length) {
//                 return null;
//             }
//             let current:Node<E> = this._head.next;
//             for (let n = 0; n < index; n += 1) {
//                 current = current.next;
//             }
//             let item:E = current.item;
//             current = null;
//             return current.item;
//         }
//         public shift():E{
//             if (this.isEmpty) {
//                 return null;
//             }
//             let item = this._head.next.item;
//             this._head.next = this._head.next.next;
//             if (this.isEmpty) {
//                 this._tail.next = null;
//             }
//             return item;
//         }
//         //改
//         public write(index:number, item:E):void{
//             if (index < 0 || index >= this.length) {
//                 return;
//             }
//             let current:Node<E> = this._head.next;
//             for (let n = 0; n < index; n += 1) {
//                 current = current.next;
//             }
//             current.item = item;
//         }
//         //查
//         public read(index:number):E{
//             if (index < 0 || index >= this.length) {
//                 return;
//             }
//             let current:Node<E> = this._head.next;
//             for (let n = 0; n < index; n += 1) {
//                 current = current.next;
//             }
//             return current.item;
//         }
//         public search(item:E):number[]{
//             let result:number[] = [];
//             this.foreach((ele:E, index:number)=>{
//                 if (ele === item) {
//                     result.push(index);
//                 }
//             });
//             return result;
//         }
//         /**
//          * 判断链表中是否存在某一元素
//          * @param item 
//          */
//         public has(item: E):boolean{
//             let current = this._head.next;
//             while (current != null) {
//                 if (current.item == item) {
//                     return true;
//                 }
//                 current = current.next;
//             }
//             return false;
//         }
//         //高阶函数
//         public foreach(f:(ele:E, index:number, list:LinkList<E>)=>void):void{
//             let current = this._head.next;
//             let num:number = 0;
//             while (current !== null) {
//                 f(current.item, num, this);
//                 current = current.next;
//                 num += 1;
//             }
//         }
//         /**
//          * 请暂时不要使用这个函数，因为我也不知道它会不会爆炸
//          * 除非你读过这个函数的源代码
//          * @param f 判断元素优先级的回调函数
//          * @param increase 是否升序，默认升序
//          * @returns 返回一个排序的链表
//          */
//         public sortby(f:(ele:E)=>number, increase:boolean = true):LinkList<E>{
//             let priority:LinkList<number> = new LinkList<number>();
//             let sorted:LinkList<E> = new LinkList<E>();
//             priority.push(-0);
//             sorted.push(null);
//             let compare:(a:number,b:number)=>boolean = increase?(a,b)=>{return a < b;}:(a,b)=>{return a > b};
//             this.foreach((ele)=>{
//                 let currentPri = f(ele);
//                 let node:Node<E> = sorted._head.next;
//                 let priNode:Node<number> = priority._head.next;
//                 let foundPlace:boolean = false;
//                 while (node.next !== null) {
//                     // if (currentPri < priNode.next.item) {
//                     if (compare(currentPri, priNode.next.item)) {
//                         node.next = new Node<E>(ele, node.next);
//                         priNode.next = new Node<number>(currentPri, priNode.next);
//                         foundPlace = true;
//                         break;
//                     }
//                     node = node.next;
//                     priNode = priNode.next;
//                 }
//                 if (!foundPlace) {
//                     sorted.push(ele);
//                     priority.push(currentPri);
//                 }
//             });
//             sorted.shift();
//             return sorted;
//         }
//         // public bbSortBy(f:(ele:E)=>number, increase:boolean = true):LinkList<E>{
//         // }
//     }
//     export class Map<K,V>{
//         private _list:Array<MapNode<K,V>>
//         constructor(){
//             this._list = []
//         }
//         public get(key:K):V{
//             for (let ele of this._list){
//                 if (ele.key === key) {
//                     return ele.value
//                 }
//             }
//             return null
//         }
//         public getKeyByVal(val:V):K{
//             for (let ele of this._list) {
//                 if (ele.value === val) {
//                     return ele.key
//                 }
//             }
//             return null
//         }
//         public keyExist(key:K):boolean{
//             for (let ele of this._list) {
//                 if (ele.key === key) {
//                     return true
//                 }
//             }
//             return false
//         }
//         public set(key:K,value:V):boolean{
//             for (let n = 0; n < this._list.length; n += 1) {
//                 if (this._list[n].key === key) {
//                     this._list[n].value = value
//                     return false;
//                 }
//             }
//             this._list.push(new MapNode<K,V>(key,value))
//             return true;
//         }
//         public batchSet(keys:K[], values:V[]):boolean{
//             if (keys.length !== values.length) {
//                 return false;
//             }
//             for (let n = 0; n < keys.length; n += 1) {
//                 this.set(keys[n], values[n]);
//             }
//             return true;
//         }
//         public remove(key:K):boolean{
//             let count:number = 0;
//             for (let ele of this._list) {
//                 if (ele.key === key) {
//                     this._list.splice(count,1);
//                     return true
//                 }
//                 count += 1;
//             }
//             return false
//         }
//         public get length():number{
//             return this._list.length
//         }
//         public foreach(f:(k:K, v:V)=>void):void{
//             for (let ele of this._list) {
//                 f(ele.key, ele.value);
//             }
//             return;
//         }
//         public filter(f:(k:K,v:V)=>boolean):Map<K,V>{
//             let result = new Map<K,V>();
//             for (let ele of this._list) {
//                 if (f(ele.key, ele.value)){
//                     result.set(ele.key, ele.value);
//                 }
//             }
//             return result;
//         }
//     }
//     export class PointerList<E>{
//         private _list:Array<E> = [];
//         private _pointer:number = 0;
//         constructor(source:Array<E> = [], initPoint:number = 0){
//             source.forEach((ele)=>{
//                 this._list.push(ele);
//             })
//         }
//         get exceeding():boolean{
//             return this._pointer >= this._list.length || this._pointer < 0
//         }
//         /*
//         以下注释中，把数组看作横向排列的一系列元素
//         index = 0的元素在最左侧
//         */
//         read():E{//查看当前pointer所指的元素
//             return this._list[this._pointer]
//         }
//         step():E{//pointer向右移一步
//             this._pointer+=1;
//             return this.read();
//         }
//         to(place:number):PointerList<E>{//pointer移到指定位置
//             this._pointer = place
//             return this
//         }
//         push(data:E):PointerList<E>{//在数组末尾增加一个元素
//             this._list.push(data)
//             return this
//         }
//         set(index:number,data:E):PointerList<E>{//覆写数组特定index中的元素
//             this._list[index] = data
//             return this
//         }
//         next(shift:number = 1):E{
//             //读取位于当前pointer所指的元素右边若干格的元素
//             //shift默认为1，即当前pointer右边相邻的元素
//             //shift为负数时获取左侧的元素
//             return this._list[this._pointer+shift]
//         }
//         get length():number{//获取数组长度
//             return this._list.length
//         }
//         get last():E{//获取最后一项
//             return this._list[this._list.length-1]
//         }
//         get first():E{//获取首项
//             return this._list[0];
//         }
//         get pointer():number{//获取pointer
//             return this._pointer
//         }
//         get atEnd():boolean{//查看“pointer指向数组最右侧的元素”的真值
//             return this._pointer === this._list.length - 1
//         }
//     }
// }
},{}],2:[function(require,module,exports){
"use strict";
//TODO
//放置我们项目里自定义的通用KEY值表
//放在同一个文件里有助于结构清晰
//另：如果只有某特定模块系统里使用的enum可以不放过来 直接写在模块文件中
Object.defineProperty(exports, "__esModule", { value: true });
//又另： 建议在使用enum的时候加一个空值None以应对判定问题
var ActorType;
(function (ActorType) {
    ActorType[ActorType["None"] = 0] = "None";
    ActorType[ActorType["Operator"] = 1] = "Operator";
    ActorType[ActorType["Monster"] = 2] = "Monster";
    ActorType[ActorType["Token"] = 3] = "Token";
    //这其实是对应的不同的数据模板
})(ActorType = exports.ActorType || (exports.ActorType = {}));
var CampType;
(function (CampType) {
    CampType[CampType["None"] = 0] = "None";
    CampType[CampType["Self"] = 1] = "Self";
    CampType[CampType["Enemy"] = 2] = "Enemy"; //敌方
})(CampType = exports.CampType || (exports.CampType = {}));
},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DodLog = /** @class */ (function () {
    function DodLog() {
    }
    Object.defineProperty(DodLog, "Instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: true,
        configurable: true
    });
    DodLog.debug = function (msg) {
        msg = "" + msg;
        console.debug(msg);
    };
    DodLog.info = function (msg) {
        msg = "" + msg;
        console.info(msg);
    };
    DodLog.warn = function (msg) {
        msg = "" + msg;
        console.warn(msg);
    };
    DodLog.error = function (msg) {
        msg = "" + msg;
        console.error(msg);
        DodLog.Instance._writeToFile(msg);
    };
    DodLog.prototype._writeToFile = function (log) {
        //TODO
    };
    return DodLog;
}());
exports.default = DodLog;
},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DodMath = /** @class */ (function () {
    function DodMath() {
    }
    /**
     * 返回a/b的整数结果（小数部分舍去)
     * a，b如果不在正整数域，请确保阅读过此函数
     * |————|————|————|————|————|
     *     -1<---0<---1<---
     *      可以理解为在数轴上把结果向左映射
     * @param a
     * @param b
     */
    DodMath.intDivision = function (a, b) {
        return (a - a % b) / b;
    };
    /**
     * 在平面上求从指定出发点到指定终点作一条指定长度的线段，此线段的另一端点的坐标
     * （如果此线段的长度大于等于出发点到终点的距离，则输出终点的坐标）
     * @param from
     * @param end
     * @param movement
     */
    DodMath.moveTo = function (from, end, movement) {
        var xdis = end.x - from.x;
        var ydis = end.y - from.y;
        var distance = Math.sqrt(Math.pow((xdis), 2) + Math.pow((ydis), 2));
        if (movement >= distance) {
            return end;
        }
        var ratio = movement / distance;
        return new Vec2(from.x + xdis * ratio, from.y + ydis * ratio);
    };
    /**
     * MyMath.moveTo函数的另一个版本。这个版本会直接修改(from:Vec2)传入的对象本身，并判断最终from与end两个对象是否重合
     * @param from
     * @param end
     * @param movement
     */
    DodMath.moveToSideEffect = function (from, end, movement) {
        var xdis = end.x - from.x;
        var ydis = end.y - from.y;
        var distance = Math.sqrt(Math.pow((xdis), 2) + Math.pow((ydis), 2));
        if (movement >= distance) {
            from.x = end.x;
            from.y = end.y;
            return true;
        }
        var ratio = movement / distance;
        from.x = from.x + xdis * ratio;
        from.y = from.y + ydis * ratio;
        return false;
    };
    /**
     * MyMath.moveTo函数的另一个版本。返回直线速度在xy两轴上的分量
     * @param from
     * @param end
     * @param movement
     */
    DodMath.moveToComponent = function (from, end, movement) {
        var xdis = end.x - from.x;
        var ydis = end.y - from.y;
        var distance = Math.sqrt(Math.pow((xdis), 2) + Math.pow((ydis), 2));
        var ratio = movement / distance;
        return new Vec2(xdis * ratio, ydis * ratio);
    };
    return DodMath;
}());
exports.DodMath = DodMath;
var Vec2 = /** @class */ (function () {
    function Vec2(x, y) {
        this.x = x;
        this.y = y;
    }
    Vec2.listFromList = function (list) {
        var result = [];
        list.forEach(function (ele) {
            result.push(new Vec2(ele[0], ele[1]));
        });
        return result;
    };
    /**
     * 返回从此点到指定点的距离
     * @param end
     */
    Vec2.prototype.distanceTo = function (end) {
        return Math.pow((Math.pow((end.x - this.x), 2) + Math.pow((end.y - this.y), 2)), 0.5);
    };
    /**
     * 以输入坐标为中心进行顺时针90度旋转
     * （未完成）
     * @param centre
     */
    Vec2.prototype.rotateClockwise = function (centre) {
        return this;
    };
    /**
     * 返回此向量的复制
     */
    Vec2.prototype.clone = function () {
        return new Vec2(this.x, this.y);
    };
    Vec2.prototype.equals = function (ele) {
        return this.x === ele.x && this.y === ele.y;
    };
    return Vec2;
}());
exports.Vec2 = Vec2;
},{}],5:[function(require,module,exports){
"use strict";
//author Na2CuC4O8
Object.defineProperty(exports, "__esModule", { value: true });
var customizedSpr_1 = require("./customizedSpr");
var DodMath_1 = require("../../DodMath");
var EventCentre_1 = require("../../../Event/EventCentre");
var Bar = /** @class */ (function () {
    /**
     * 进度条构造器
     * @param symbNum 进度条编号
     * @param backGroundColor 背景颜色
     * @param size 大小
     * @param pos 坐标
     * @param scale 全局缩放比
     */
    function Bar(symbNum, backGroundColor, size, pos, scale) {
        if (scale === void 0) { scale = 1; }
        this._scale = 1; //全局缩放比
        this._percentage = 1; //进度
        this._symbNum = symbNum;
        this._initSize = size;
        this._scale = scale;
        this._size = new DodMath_1.Vec2(this._initSize.x * this._percentage * this._scale, this._initSize.y * this._scale);
        this._initPos = pos;
        this._pos = new DodMath_1.Vec2(this._initPos.x * this._scale, this._initPos.y * this._scale);
        this._backSpr = new customizedSpr_1.default();
        this._backSpr.setParam(this._pos.x, this._pos.y, this._size.x, this._size.y, backGroundColor);
        this._backSpr.changeColor();
        this._frontSpr = new customizedSpr_1.default();
        this._backSpr.addChild(this._frontSpr);
        this._frontSpr.setParam(0, 0, this._size.x, this._size.y, "#8b8b83", new DodMath_1.Vec2(this._scale, this._scale));
        this._frontSpr.changeColor();
        this._height = this._initSize.y;
        EventCentre_1.EventCentre.instance.on(EventCentre_1.EventCentre.EType.PERFORMANCE_RESCALE(), this, this.reScale);
    }
    /**
     * 修改缩放比
     * @param value 全局缩放比
     */
    Bar.prototype.reScale = function (value) {
        this._scale = value;
        this._pos = new DodMath_1.Vec2(this._initPos.x * this._scale, this._initPos.y * this._scale);
        this._size = new DodMath_1.Vec2(this._initSize.x * this._scale, this._initSize.y * this._scale);
        this._backSpr.setParam(this._pos.x, this._pos.y, this._size.x, this._size.y); //设置背景绘图节点参数
        this._backSpr.changeColor();
        this._frontSpr.setParam(0, 0, this._size.x * this._percentage, this._size.y, "#8b8b83", new DodMath_1.Vec2(1 * this._scale, 1 * this._scale)); //设置前端绘图节点参数
        this._frontSpr.changeColor();
    };
    /**
     * 设置进度条代号
     * @param symbNum 进度条代号
     */
    Bar.prototype.setSymb = function (symbNum) {
        this._symbNum = symbNum;
    };
    Object.defineProperty(Bar.prototype, "percentage", {
        /**
         * 修改进度
         * @param percentage 目标进度
         */
        set: function (percentage) {
            if (percentage === 0) {
                this._percentage = 0;
                this._frontSpr.graphics.clear();
            }
            else {
                this._percentage = percentage;
                this._frontSpr.setParam(0, 0, this._size.x * this._percentage, this._size.y, "#8b8b83", new DodMath_1.Vec2(1 * this._scale, 1 * this._scale));
                this._frontSpr.changeColor();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 返回本进度条背景绘图节点
     */
    Bar.prototype.getBackSpr = function () {
        return this._backSpr;
    };
    /**
     * 返回本进度条高度
     */
    Bar.prototype.getHeight = function () {
        return this._height;
    };
    return Bar;
}());
exports.Bar = Bar;
var Button = /** @class */ (function () {
    /**
     * 按钮构造器
     * @param name 按钮名
     * @param symbNum 按钮编号
     * @param pos 起始坐标
     * @param size 起始宽高
     * @param color 按钮颜色
     * @param scale 缩放比
     */
    function Button(ARUsymb, name, symbNum, pos, size, color, scale) {
        if (name === void 0) { name = "default"; }
        if (color === void 0) { color = "#00B2BF"; }
        if (scale === void 0) { scale = 1; }
        this._ARUsymb = ARUsymb;
        this._symbName = symbNum;
        this._name = name;
        this._initPos = pos;
        this._initSize = size;
        this._color = color;
        this._scale = scale;
        this._pos = new DodMath_1.Vec2(this._initPos.x * this._scale, this._initPos.y * this._scale);
        this._size = new DodMath_1.Vec2(this._initSize.x * this._scale, this._initSize.y * this._scale);
        this._height = this._initSize.y;
        this._spr = new customizedSpr_1.default();
        this._spr.setParam(this._pos.x, this._pos.y, this._size.x, this._size.y, this._color);
        this._spr.changeColor();
        EventCentre_1.EventCentre.instance.on(EventCentre_1.EventCentre.EType.PERFORMANCE_RESCALE(), this, this.reScale);
        this.setText();
    }
    /**
     * 设置按钮功能
     * @param fun 按钮功能函数
     */
    Button.prototype.setFunc = function (fun) {
        this._fun = fun;
        this._spr.on(Laya.Event.MOUSE_UP, this, this._fun);
        this._spr.on(Laya.Event.MOUSE_OVER, this, function (e) {
            e.stopPropagation();
        });
        this._spr.on(Laya.Event.MOUSE_UP, this, function (e) {
            e.stopPropagation();
        });
    };
    /**
     * 返回按钮绘图节点
     */
    Button.prototype.getSpr = function () {
        return this._spr;
    };
    /**
     * 缩放按钮
     * @param value 全局缩放比
     */
    Button.prototype.reScale = function (value) {
        this._scale = value;
        this._pos = new DodMath_1.Vec2(this._initPos.x * this._scale, this._initPos.y * this._scale);
        this._size = new DodMath_1.Vec2(this._initSize.x * this._scale, this._initSize.y * this._scale);
        this._spr.setParam(this._pos.x, this._pos.y, this._size.x, this._size.y, this._color);
        this._spr.changeColor();
    };
    /**
     * 渲染文本
     */
    Button.prototype.setText = function () {
        var tmpTex = new Laya.Text();
        tmpTex.width = this._size.x;
        tmpTex.height = this._size.y;
        tmpTex.x = 0;
        tmpTex.y = 0;
        tmpTex.fontSize = 9;
        tmpTex.text = this._name;
        tmpTex.align = "center";
        tmpTex.valign = "middle";
        this._spr.addChild(tmpTex);
    };
    return Button;
}());
exports.Button = Button;
var Text = /** @class */ (function (_super) {
    __extends(Text, _super);
    /**
     * 文本构造器
     * @param size 起始大小
     * @param scale 缩放比
     *
     */
    function Text(size, scale) {
        var _this = _super.call(this) || this;
        _this._switch = true; //文本显示开关 默认关闭
        _this._pos = new DodMath_1.Vec2(0, 0); //起始坐标
        _this._size = size;
        _this._scale = scale;
        _this.width = _this._size.x * _this._scale; //计算可视节点宽度
        _this.height = _this._size.y * _this._scale; //计算可视节点高度
        _this.fontSize = 10 * _this._scale; //计算字体大小
        _this.align = "center"; //默认竖直居中
        _this.valign = "middle"; //默认水平居中
        _this.wordWrap = true; //默认自动换行开启
        _this.color = "#000000"; //
        EventCentre_1.EventCentre.instance.on(EventCentre_1.EventCentre.EType.PERFORMANCE_RESCALE(), _this, _this.reScale); //监听全局缩放比
        EventCentre_1.EventCentre.instance.on(EventCentre_1.EventCentre.EType.PERFORMANCE_TEXT_SWITCH(), _this, _this.switch); //监听全局文本显示开关
        return _this;
    }
    /**
     * 设置所在显示节点symb
     * @param symb
     */
    Text.prototype.setSymb = function (symb) {
        this._ARUsymb = symb;
    };
    /**
     * 开关文本显示开关
     */
    Text.prototype.switch = function () {
        if (this._switch === true) {
            this._switch = false;
            this.changeText("");
        }
        else {
            this._switch = true;
        }
    };
    /**
     * 修改文本显示开关
     */
    Text.prototype.setSwitchOn = function () {
        if (this._switch === true) {
            this.changeText(this._myString);
        }
    };
    /**
     * 关闭文本显示
     */
    Text.prototype.setSwitchOff = function () {
        if (this._switch) {
            this.changeText(" ");
        }
    };
    /**
     * 根据缩放比修改可视节点大小
     * @param scale 全局缩放比
     */
    Text.prototype.reScale = function (scale) {
        this._scale = scale;
        this.width = this._size.x * this._scale;
        this.height = this._size.y * this._scale;
        this.x = this._pos.x * this._scale;
        this.y = this._pos.y * this._scale;
        this.fontSize = 10 * this._scale;
    };
    /**
     * 设置文本
     * @param text
     */
    Text.prototype.setText = function (text) {
        this._myString = text;
    };
    /**
     * 修改文本起始坐标（不受全局缩放比影响）
     * @param pos 起始坐标
     */
    Text.prototype.setPos = function (pos) {
        if (pos === void 0) { pos = new DodMath_1.Vec2(0, 0); }
        this._pos = pos;
        this.x = this._pos.x * this._scale;
        this.y = this._pos.y * this._scale;
    };
    /**
     * 阻止鼠标事件穿透
     */
    Text.prototype.offSwitch = function () {
        EventCentre_1.EventCentre.instance.off(EventCentre_1.EventCentre.EType.PERFORMANCE_RESCALE(), this, this.reScale);
        EventCentre_1.EventCentre.instance.off(EventCentre_1.EventCentre.EType.PERFORMANCE_TEXT_SWITCH(), this, this.switch);
    };
    /**
     * 修改字体大小
     * @param value 输入大小
     */
    Text.prototype.setFontSize = function (value) {
        this.fontSize = value;
        this.text = this._myString;
    };
    return Text;
}(Laya.Text));
exports.Text = Text;
},{"../../../Event/EventCentre":11,"../../DodMath":4,"./customizedSpr":9}],6:[function(require,module,exports){
"use strict";
//author Na2CuC4O8
Object.defineProperty(exports, "__esModule", { value: true });
var customizedSpr_1 = require("./customizedSpr");
var UnsymbolizedRender_1 = require("./UnsymbolizedRender");
var SymbolizedRender_1 = require("./SymbolizedRender");
var objbox_1 = require("./objbox");
var DodMath_1 = require("../../DodMath");
var EventCentre_1 = require("../../../Event/EventCentre");
var PerformanceCentre = /** @class */ (function () {
    function PerformanceCentre() {
    }
    /**
     * 初始化渲染主场景，初始化事件监听类
     * @param scene 游戏主场景
     */
    PerformanceCentre.initialize = function (scene) {
        PerformanceCentre.instance = new PerformanceCentre(); //加载静态类
        PerformanceCentre.instance.mainSpr = new customizedSpr_1.default(); //建立主绘图节点
        //该绘图节点不用于绘制任何图形，仅用于添加子节点
        scene.addChild(PerformanceCentre.instance.mainSpr); //将主绘图节点添加为主场景子节点
        EventCentre_1.EventCentre.init(); //初始化观察者
        PerformanceCentre.initialize = function () { }; //清空主场景初始化函数
        // console.log("Main Scene Initialization Complete!!");
    };
    /**
     * 渲染棋盘
     * @param arr 用于生成棋盘的二维数组
     * @param posVec2 棋盘起始坐标（一律按全局缩放比为1计算，渲染器会根据全局缩放比自动完成缩放渲染）
     * @param unitsize 单位格子宽高（一律按全局缩放比为1计算，渲染器会根据全局缩放比自动完成缩放渲染）
     * @param backGroundColor 棋盘背景颜色
     * @param frontColor 格子颜色
     * @param father 父绘图节点（默认为全局绘图节点）
     * @param scale 缩放比（默认为1）
     */
    PerformanceCentre.prototype.initBoard = function (arr, posVec2, unitsize, backGroundColor, frontColor, scale) {
        if (scale === void 0) { scale = 1; }
        this.chessBoard = new UnsymbolizedRender_1.ChessBoard(arr, posVec2, unitsize, backGroundColor, frontColor, scale); //新建棋盘
        PerformanceCentre.instance.mainSpr.addChild(this.chessBoard); //添加子节点
    };
    /**
     * 调节全局缩放比，只能作用于所有actor渲染完成后、所有特效帧循环执行前，否则有非致命性bug
     * @param value 全局可视节点缩放比
     */
    PerformanceCentre.prototype.rescale = function (value) {
        EventCentre_1.EventCentre.instance.event("RESCALE", [value]); //发布调参事件、缩放比参数
    };
    /**
     * 渲染actor对象
     * @param bound actor
     * @param pos 坐标（一律按全局缩放比为1计算，渲染器会根据全局缩放比自动完成缩放渲染）
     * @param siz 宽高（默认10,10）（一律按全局缩放比为1计算，渲染器会根据全局缩放比自动完成缩放渲染）
     * @param father 父绘图节点（默认为棋盘绘图节点）
     * @param color 颜色（默认为绿）
     */
    PerformanceCentre.prototype.displayActor = function (bound, pos, siz, color, father) {
        if (siz === void 0) { siz = new DodMath_1.Vec2(10, 10); }
        if (color === void 0) { color = "#00ff00"; }
        if (father === void 0) { father = PerformanceCentre.instance.chessBoard; }
        var tmpActor = new SymbolizedRender_1.default(bound.symbol, pos, siz, father, color); //渲染actor
    };
    /**
     * 添加/修改进度条
     * 默认进度条长30，宽5（默认进度条宽高无法通过本函数修改，如需修改请前往 .\Rhode Island\src\Rhodes_Game\Performance_Module\SymbolizedRender.ts\ActorRU)
     * 进度颜色为灰，如需修改请前往 .\Rhode Island\src\Rhodes_Game\Performance_Module\ActorComponent.ts\Bar
     * @param bound actor
     * @param bar_symbNum 第几根进度条（始于0）
     * @param percentage 该进度条进度
     * @param color 该进度条背景颜色
     * @param x 进度条长度（一律按全局缩放比为1计算，渲染器会根据全局缩放比自动完成缩放渲染）
     * @param y 进度条高度（一律按全局缩放比为1计算，渲染器会根据全局缩放比自动完成缩放渲染）
     */
    PerformanceCentre.prototype.editBar = function (bound, bar_symbNum, percentage, color, x, y) {
        if (bar_symbNum === void 0) { bar_symbNum = 0; }
        if (percentage === void 0) { percentage = 1; }
        if (color === void 0) { color = "#00ff00"; }
        var tmpActor = objbox_1.ActorBox.get(bound.symbol.data); //获取已渲染的actorRU对象
        if (tmpActor.getBar(bar_symbNum) === undefined) { //如果对应进度条不存在
            tmpActor.addExtBar(color, bar_symbNum, percentage, x, y); //根据输入参数新建进度条
        }
        else { //如对应进度条已存在
            tmpActor.editBar(bar_symbNum, percentage); //修改该进度条百分比
        }
    };
    /**
     * 发布攻击事件
     * 此方法调用后请勿修改全局缩放比！！
     * @param from 发动攻击节点
     * @param to 遭受打击节点
     */
    PerformanceCentre.prototype.defaultAtkEffect = function (from, to) {
        //打击事件、发动攻击节点和遭受攻击节点参数
        objbox_1.ActorBox.get(from.symbol.data).hit(to);
    };
    /**
     * 发布受伤事件
     * 此方法调用后请勿修改全局缩放比！！
     * @param bound 受伤节点
     */
    PerformanceCentre.prototype.defaultDmgEffect = function (bound) {
        //受伤事件和受伤节点参数
        objbox_1.ActorBox.get(bound.symbol.data).damage();
    };
    /**
     * 销毁对象（默认销毁）
     * @param bound 对象
     * @param pos 坐标（一律按全局缩放比为1计算，渲染器会根据全局缩放比自动完成缩放渲染）
     */
    PerformanceCentre.prototype.distroyActor = function (bound, pos) {
        var tmpActor = objbox_1.ActorBox.get(bound.symbol.data); //获取actorRU对象
        if (pos === undefined) {
            tmpActor.destory();
        }
        if (pos.equals(tmpActor.getPosVec())) {
            tmpActor.destory();
        }
        //销毁actorRU对象
    };
    /**
     * 在actor身上渲染文本
     * 仅当全局文本显示开关switchHoverText（）开启时才会渲染文本，开关默认关闭
     * @param bound actor
     * @param content 文本
     * @param pos 文本起始坐标（一律按全局缩放比为1计算，渲染器会根据全局缩放比自动完成缩放渲染）
     */
    PerformanceCentre.prototype.write = function (bound, content, pos) {
        objbox_1.ActorBox.get(bound.symbol.data).getText().setText(content); //修改ActorRU文本
        objbox_1.ActorBox.get(bound.symbol.data).getText().setPos(pos); //修改该文本位置
    };
    /**
     * 全局文本显示开关（默认关闭）
     */
    PerformanceCentre.prototype.switchHoverText = function () {
        EventCentre_1.EventCentre.instance.event(EventCentre_1.EventCentre.EType.PERFORMANCE_TEXT_SWITCH()); //发布文本开关事件，按钮文本不受影响
    };
    /**
     * 移动actor对象
     * @param bound actor
     * @param pos 目标坐标（一律按全局缩放比为1计算，渲染器会根据全局缩放比自动完成缩放渲染）
     */
    PerformanceCentre.prototype.move = function (bound, pos) {
        objbox_1.ActorBox.get(bound.symbol.data).relocate(pos); //移动ActorRU对象坐标
    };
    /**
     * 在actor身上添加按钮
     * 每个actorRU默认存在2个按钮（点击actorRU节点即可显示），对应撤退和技能。该按钮坐标、宽高、颜色、名字不可修改，功能需从外部添加
     * @param bound actor
     * @param num 按钮编号（0,1为默认按钮，默认按钮不自带任何功能，需手动添加）
     * @param callback 点击按钮后调用的函数
     * @param text 显示在按钮上的文本（默认显示且无法修改）
     * @param pos 按钮起始坐标（一律按全局缩放比为1计算，渲染器会根据全局缩放比自动完成缩放渲染）
     * @param size 按钮大小（一律按全局缩放比为1计算，渲染器会根据全局缩放比自动完成缩放渲染）
     * @param color 按钮颜色
     */
    PerformanceCentre.prototype.attachButton = function (bound, num, callback, text, pos, size, color) {
        var tmpAct = objbox_1.ActorBox.get(bound.symbol.data); //获取ActorRU对象
        if (tmpAct.getButton(num) === undefined) { //如果对应按钮不存在
            if (pos === undefined) { //如果不输入指定坐标
                tmpAct.addExtraButtonsAtDefLocation(text, num, color, callback); //在默认位置新建按钮
            }
            else { //如果输入指定坐标
                tmpAct.addExtraButtonAtNoDefLocation(text, num, callback, pos, size, color); //在指定位置新建按钮
            }
        }
        else { //如果对应按钮存在
            tmpAct.getButton(num).setFunc(callback); //输入功能函数
        }
    };
    return PerformanceCentre;
}());
exports.default = PerformanceCentre;
},{"../../../Event/EventCentre":11,"../../DodMath":4,"./SymbolizedRender":7,"./UnsymbolizedRender":8,"./customizedSpr":9,"./objbox":10}],7:[function(require,module,exports){
"use strict";
//author Na2CuC4O8
Object.defineProperty(exports, "__esModule", { value: true });
var customizedSpr_1 = require("./customizedSpr");
var objbox_1 = require("./objbox");
var ActorComponent_1 = require("./ActorComponent");
var DodMath_1 = require("../../DodMath");
var DodDataStructure_1 = require("../../DodDataStructure");
var EventCentre_1 = require("../../../Event/EventCentre");
var ActorRU = /** @class */ (function () {
    /**
     * RenderUnit构造器
     * @param symb symb
     * @param pos 起始坐标
     * @param size 宽高
     * @param father 父绘图节点
     */
    function ActorRU(symb, pos, size, father, color, scale) {
        if (color === void 0) { color = "#00ffff"; }
        if (scale === void 0) { scale = 1; }
        this._initBarHeight = 0; //进度条其实高度暂存器
        this._scale = 1; //全局缩放比
        this._barPair = new DodDataStructure_1.KVPair(); //进度条键值组
        this._defButtonShowed = false; //是否显示默认按钮，默认为否
        this._buttonPair = new DodDataStructure_1.KVPair();
        this._transparency = 1; //受伤特效参数暂存器
        this._movePercentage = 0; //攻击特效参数暂存器
        this._father = father; //父绘图节点
        this._initPos = pos; //起始坐标
        this._initSize = size; //起始宽高
        this._spr = new customizedSpr_1.default(); //新建绘图节点
        this._father.addChild(this._spr); //添加子节点
        this.setData(symb, new DodMath_1.Vec2(this._initPos.x * this._scale, this._initPos.y * this._scale), new DodMath_1.Vec2(this._initSize.x * this._scale, this._initSize.y * this._scale), color); //设置绘图节点参数
        objbox_1.ActorBox.add(this, this._symb); //将本对象添加到键值对
        this.addDefBar(); //添加默认进度条
        this._text = new ActorComponent_1.Text(this._initSize, this._scale); //添加默认文本
        this._text.setSymb(this._symb); //
        this._buttonHeight = this._initSize.y; //
        this._spr.addChild(this._text); //默认文本置于子节点
        EventCentre_1.EventCentre.instance.on(EventCentre_1.EventCentre.EType.PERFORMANCE_RESCALE(), this, this.reScale); //监听全局缩放比
        this._spr.on(Laya.Event.MOUSE_OVER, this, this.mouseOver); //
        this._spr.on(Laya.Event.MOUSE_OUT, this, this.mouseOut); //
        this._spr.on(Laya.Event.MOUSE_UP, this, this.showDefaultBottons); //
        this._damage = new customizedSpr_1.default(); //
        this._spr.addChild(this._damage); //
        this._damage.setParam(0, 0, this._size.x, this._size.y, "#f91526"); //
        this._damage.locationAndSize(); //
        this.addDefButtons(); //
        this._fist = new customizedSpr_1.default(); //
        this._fist.setParam(this._centerPos.x, this._centerPos.y, 16, 16, "#F3C246"); //
        this._fist.locationAndSize(); //
        this._fist.zOrder = 2; //
        this._spr.addChild(this._fist); //
    }
    /**
     * 返回当前可视节点坐标
     */
    ActorRU.prototype.curPos = function () {
        return this._pos;
    };
    /**
     * 发动打击特效
     * @param to 打击目标
     */
    ActorRU.prototype.hit = function (to) {
        var _this = this;
        // this._fist.graphics.save();
        this._fist.centralShiftColored();
        var tmpVec = new DodMath_1.Vec2(objbox_1.ActorBox.get(to.symbol.data).curPos().x - this._pos.x, objbox_1.ActorBox.get(to.symbol.data).curPos().y - this._pos.y);
        var fun = function (target) {
            if (_this._movePercentage > 1) {
                _this._movePercentage = 0;
                _this._fist.graphics.clear();
                // this._fist.graphics.restore();
                Laya.timer.clear(_this, fun);
                objbox_1.ActorBox.get(to.symbol.data).damage();
                return;
            }
            var curLocaction = new DodMath_1.Vec2((16 + target.x) * _this._movePercentage, (16 + target.y) * _this._movePercentage);
            _this._movePercentage += 0.02;
            _this._fist.relocate(curLocaction);
            _this._fist.rotation = 2000 * _this._movePercentage;
        };
        Laya.timer.loop(20, this, fun, [tmpVec]);
    };
    /**
     * 发动受伤特效
     */
    ActorRU.prototype.damage = function () {
        var _this = this;
        this._damage.setParam(0, 0, this._size.x, this._size.y);
        this._damage.locationAndSize();
        this._damage.changeColor();
        var fun = function () {
            if (_this._transparency < 0) {
                _this._damage.graphics.clear();
                _this._transparency = 1;
                Laya.timer.clear(_this, fun);
                return;
            }
            _this._transparency -= 0.03;
            _this._damage.alpha = _this._transparency;
        };
        Laya.timer.loop(20, this, fun);
    };
    /**
     * 渲染默认按钮
     */
    ActorRU.prototype.showDefaultBottons = function () {
        if (this._defButtonShowed === false) {
            this._spr.addChild(this._buttonPair.read(0 + "").getSpr());
            this._spr.addChild(this._buttonPair.read(1 + "").getSpr());
            this._defButtonShowed = true;
        }
        else {
            this._spr.removeChild(this._buttonPair.read(0 + "").getSpr());
            this._spr.removeChild(this._buttonPair.read(1 + "").getSpr());
            this._defButtonShowed = false;
        }
    };
    /**
     * 发布鼠标进入事件
     */
    ActorRU.prototype.mouseOver = function () {
        this._text.setSwitchOn();
    };
    /**
     * 发布鼠标离开事件
     */
    ActorRU.prototype.mouseOut = function () {
        this._text.setSwitchOff();
    };
    /**
     * 重设缩放比
     * @param value 新全局缩放比
     */
    ActorRU.prototype.reScale = function (value) {
        this._scale = value;
        this.setData(this._symb, this._initPos, this._initSize, this._spr.getColor());
        this.setColor();
        this._damage.setParam(0, 0, this._initSize.x * this._scale, this._initSize.y * this._scale);
        this._damage.locationAndSize();
    };
    /**
     * 设置本ARU的各项参数
     * @param symb symb
     * @param pos 起始坐标
     * @param size 大小
     *
     */
    ActorRU.prototype.setData = function (symb, pos, size, color) {
        this._symb = symb;
        this._pos = new DodMath_1.Vec2(pos.x * this._scale, pos.y * this._scale);
        this._size = new DodMath_1.Vec2(size.x * this._scale, size.y * this._scale);
        this._spr.setParam(this._pos.x, this._pos.y, this._size.x, this._size.y, color);
        this.setColor();
        this._spr.locationAndSize();
        this._centerPos = new DodMath_1.Vec2(this._size.x / 2, this._size.y / 2);
    };
    /**
     * @param color 设置颜色
     */
    ActorRU.prototype.setColor = function () {
        this._spr.changeColor();
    };
    /**
     *
     * @param pos 重新设置起始坐标（不受缩放比影响）
     */
    ActorRU.prototype.relocate = function (pos) {
        this._pos = new DodMath_1.Vec2(pos.x * this._scale, pos.y * this._scale);
        this._initPos = pos.clone();
        this._spr.relocate(pos);
    };
    /**
     * 摧毁本ARU
     */
    ActorRU.prototype.destory = function () {
        this._spr.destroy();
    };
    /**
     * 获取本ARU的起始坐标（不受缩放比影响）
     */
    ActorRU.prototype.getPosVec = function () {
        return this._initPos;
    };
    /**
     * 获取本ARU的默认文本对象
     */
    ActorRU.prototype.getText = function () {
        return this._text;
    };
    /**
     * 添加默认进度条
     */
    ActorRU.prototype.addDefBar = function () {
        this._initBarHeight = 0;
        var tmp = new ActorComponent_1.Bar(0, "#00ffff", new DodMath_1.Vec2(30, 5), new DodMath_1.Vec2(0, this._initBarHeight - 6), this._scale);
        this._spr.addChild(tmp.getBackSpr());
        this._barPair.edit("bar_0", tmp);
        this._initBarHeight = this._initBarHeight - tmp.getHeight() - 1;
    };
    /**
     * 获取本ARU的指定进度条
     * @param num 进度条代号
     */
    ActorRU.prototype.getBar = function (num) {
        return this._barPair.read("bar_" + num);
    };
    /**
     * 添加附加进度条
     * @param backGroundColor 设置新增进度条颜色
     * @param symb 设置新增进度条代号
     * @param x 宽度
     * @param y 高度
     */
    ActorRU.prototype.addExtBar = function (backGroundColor, symb, percentage, x, y) {
        if (x === void 0) { x = 30; }
        if (y === void 0) { y = 5; }
        var tmpBar = new ActorComponent_1.Bar(symb, backGroundColor, new DodMath_1.Vec2(x, y), new DodMath_1.Vec2(0, this._initBarHeight - y - 1), this._scale);
        this._spr.addChild(tmpBar.getBackSpr());
        this._barPair.edit("bar_" + symb, tmpBar);
        this._initBarHeight = this._initBarHeight - tmpBar.getHeight() - 1;
        tmpBar.percentage = percentage;
    };
    /**
     * 修改已有进度条
     * @param symb 指定进度条代号
     * @param percentage 修改进度条进度
     */
    ActorRU.prototype.editBar = function (symb, percentage) {
        this._barPair.read("bar_" + symb).percentage = percentage;
    };
    /**
     * 添加默认按钮
     */
    ActorRU.prototype.addDefButtons = function () {
        var tmp1 = new ActorComponent_1.Button(this._symb, "Retreat", 0, new DodMath_1.Vec2(-20, this._initSize.y), new DodMath_1.Vec2(20, 15), undefined, this._scale);
        this._buttonPair.edit("0", tmp1);
        var tmp2 = new ActorComponent_1.Button(this._symb, "Activate_Skill", 0, new DodMath_1.Vec2(this._initSize.x, this._initSize.y), new DodMath_1.Vec2(20, 15), undefined, this._scale);
        this._buttonPair.edit("1", tmp2);
        this._buttonHeight = this._initSize.y + 16;
    };
    /**
     * 在默认位置添加额外按钮
     * @param name
     * @param num
     * @param color
     * @param fun
     */
    ActorRU.prototype.addExtraButtonsAtDefLocation = function (name, num, color, fun) {
        var tmpBut = new ActorComponent_1.Button(this._symb, name, num, new DodMath_1.Vec2(0, this._buttonHeight), new DodMath_1.Vec2(20, 15), color, this._scale);
        this._buttonPair.edit(num + "", tmpBut);
        this._spr.addChild(tmpBut.getSpr());
        this._buttonHeight += 16;
        tmpBut.setFunc(fun);
    };
    /**
     * 在指定位置添加额外按钮
     * @param name
     * @param num
     * @param fun
     * @param pos
     * @param size
     * @param color
     */
    ActorRU.prototype.addExtraButtonAtNoDefLocation = function (name, num, fun, pos, size, color) {
        var tmpBut = new ActorComponent_1.Button(this._symb, name, num, pos, size, color, this._scale);
        this._buttonPair.edit(num + "", tmpBut);
        this._spr.addChild(tmpBut.getSpr());
        tmpBut.setFunc(fun);
    };
    /**
     * 获取按钮
     * @param num 按钮编号
     */
    ActorRU.prototype.getButton = function (num) {
        return this._buttonPair.read(num + "");
    };
    return ActorRU;
}());
exports.default = ActorRU;
},{"../../../Event/EventCentre":11,"../../DodDataStructure":1,"../../DodMath":4,"./ActorComponent":5,"./customizedSpr":9,"./objbox":10}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//author Na2CuC4O8
var customizedSpr_1 = require("./customizedSpr");
var DodMath_1 = require("../../DodMath");
var EventCentre_1 = require("../../../Event/EventCentre");
var ChessBoard = /** @class */ (function (_super) {
    __extends(ChessBoard, _super);
    /**
     * 棋盘构造器
     * @param arr 二维数组
     * @param posVec2 起始坐标
     * @param unitsize 单位宽高
     * @param backGroundColor 背景颜色
     * @param frontColor 格子颜色
     * @param father 父绘图节点
     * @param scale 缩放比
     */
    function ChessBoard(arr, posVec2, unitsize, backGroundColor, frontColor, scale) {
        var _this = _super.call(this) || this;
        _this._numArr = arr;
        _this._initPos = posVec2;
        _this._initSize = unitsize;
        _this._scale = scale;
        _this._posVec2 = new DodMath_1.Vec2(_this._initPos.x * _this._scale, _this._initPos.y * _this._scale);
        _this._unitSizeVec2 = new DodMath_1.Vec2(_this._initSize.x * _this._scale, _this._initSize.y * _this._scale); //recalculate unitSize
        _this._backGroundColor = backGroundColor;
        _this._frontColor = frontColor;
        _this.initBackground();
        _this.setColor(_this._backGroundColor);
        _this.changeColor();
        _this.initFrontSprArr();
        _this.renderFrontSpr(_this._frontColor);
        EventCentre_1.EventCentre.instance.on(EventCentre_1.EventCentre.EType.PERFORMANCE_RESCALE(), _this, _this.reScale);
        return _this;
    }
    /**
     * draw background
     */
    ChessBoard.prototype.initBackground = function () {
        this.setParam(this._posVec2.x, this._posVec2.y, this._numArr[0].length * this._unitSizeVec2.x, this._numArr.length * this._unitSizeVec2.y, this._backGroundColor);
        this.locationAndSize();
    };
    /**
     * draw front
     */
    ChessBoard.prototype.initFrontSprArr = function () {
        this._frontSprArr = []; //init custSprArr
        for (var i = 0; i < this._numArr.length; i++) {
            var tmpArr = [];
            for (var j = 0; j < this._numArr[0].length; j++) {
                var tmpSpr = new customizedSpr_1.default();
                this.addChild(tmpSpr);
                tmpSpr.setParam(0 + j * this._unitSizeVec2.x, 0 + i * this._unitSizeVec2.y, this._unitSizeVec2.x, this._unitSizeVec2.y, this._frontColor, new DodMath_1.Vec2(1, 1));
                tmpSpr.locationAndSize();
                tmpSpr.setColor(this._frontColor);
                tmpSpr.changeColor();
                tmpSpr.zOrder = -1;
                tmpArr.push(tmpSpr);
            }
            this._frontSprArr.push(tmpArr);
        }
    };
    /**
     *
     * @param color
     */
    ChessBoard.prototype.renderFrontSpr = function (color) {
        for (var i = 0; i < this._frontSprArr.length; i++) {
            for (var j = 0; j < this._frontSprArr[0].length; j++) {
                this._frontSprArr[i][j].setColor(color);
                this._frontSprArr[i][j].changeColor();
            }
        }
    };
    /**
     * 修改前方格子颜色
     * @param posVec2 待修改格子坐标（x,y）
     * @param color 目标颜色
     */
    ChessBoard.prototype.changeFrontColor = function (posVec2, color) {
        this._frontSprArr[posVec2.y][posVec2.x].setColor(color);
        this._frontSprArr[posVec2.y][posVec2.x].changeColor();
    };
    /**
     * 清除所有已绘图形
     */
    ChessBoard.prototype.clearAll = function () {
        this.graphics.clear();
        for (var i = 0; i < this._frontSprArr.length; i++) {
            for (var j = 0; j < this._frontSprArr[0].length; j++) {
                this._frontSprArr[i][j].graphics.clear();
            }
        }
    };
    /**
     * 重设棋盘缩放比
     * @param num 缩放比
     */
    ChessBoard.prototype.reScale = function (num) {
        this._scale = num;
        this._posVec2 = new DodMath_1.Vec2(this._initPos.x * this._scale, this._initPos.y * this._scale);
        this._unitSizeVec2 = new DodMath_1.Vec2(this._initSize.x * this._scale, this._initSize.y * this._scale); //recalculate unitSize
        this.clearAll();
        this.initBackground();
        this.initFrontSprArr();
        this.setColor(this._backGroundColor);
        this.changeColor();
        this.renderFrontSpr(this._frontColor);
    };
    return ChessBoard;
}(customizedSpr_1.default));
exports.ChessBoard = ChessBoard;
},{"../../../Event/EventCentre":11,"../../DodMath":4,"./customizedSpr":9}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DodMath_1 = require("../../DodMath");
//author Na2CuC4O8
var CustomizedSprite = /** @class */ (function (_super) {
    __extends(CustomizedSprite, _super);
    function CustomizedSprite() {
        return _super.call(this) || this;
    }
    CustomizedSprite.prototype.centralShiftColored = function () {
        this.graphics.clear();
        this.graphics.drawRect(-this.width / 2, -this.height / 2, this.width, this.height, this._color);
    };
    /**
     *
     * @param color
     */
    CustomizedSprite.prototype.setColor = function (color) {
        this._color = color;
    };
    /**
     * 修改颜色
     * @param color 目标颜色
     */
    CustomizedSprite.prototype.changeColor = function () {
        this.graphics.clear();
        this.graphics.drawRect(this._graphicShift.x, this._graphicShift.y, this.width - 2 * this._graphicShift.x, this.height - 2 * this._graphicShift.y, this._color);
    };
    /**
     * 设置相关参数
     * @param posX 起始x
     * @param posY 起始y
     * @param width 宽度
     * @param height 高度
     * @param color 颜色
     * @param graphicShift 棋盘偏移值
     */
    CustomizedSprite.prototype.setParam = function (posX, posY, width, height, color, graphicShift) {
        if (color === void 0) { color = this._color; }
        if (graphicShift === void 0) { graphicShift = new DodMath_1.Vec2(0, 0); }
        this.x = posX;
        this.y = posY;
        this.width = width;
        this.height = height;
        this.setColor(color);
        this._graphicShift = graphicShift;
    };
    /**
     * 修改坐标和大小
     */
    CustomizedSprite.prototype.locationAndSize = function () {
        this.pos(this.x, this.y).size(this.width, this.height);
    };
    /**
     * 重设坐标
     * @param posVec2 目标坐标
     */
    CustomizedSprite.prototype.relocate = function (posVec2) {
        this.x = posVec2.x;
        this.y = posVec2.y;
        this.locationAndSize();
    };
    /**
     * 重设宽高
     * @param sizeVec2 目标宽高
     */
    CustomizedSprite.prototype.reSize = function (sizeVec2) {
        this.width = sizeVec2.x;
        this.height = sizeVec2.y;
        this.changeColor();
    };
    /**
     * 返回当前图形起始坐标
     */
    CustomizedSprite.prototype.getPos = function () {
        return new DodMath_1.Vec2(this.x, this.y);
    };
    /**
     * 返回已绘区域大小
     */
    CustomizedSprite.prototype.getSize = function () {
        return new DodMath_1.Vec2(this.width, this.height);
    };
    /**
     * 返回当前已绘区域颜色
     */
    CustomizedSprite.prototype.getColor = function () {
        return this._color;
    };
    return CustomizedSprite;
}(Laya.Sprite));
exports.default = CustomizedSprite;
},{"../../DodMath":4}],10:[function(require,module,exports){
"use strict";
//author Na2CuC4O8
Object.defineProperty(exports, "__esModule", { value: true });
var DodDataStructure_1 = require("../../DodDataStructure");
//储存所有绘图节点对象
var ActorBox = /** @class */ (function () {
    function ActorBox() {
    }
    ActorBox.add = function (act, symb) {
        ActorBox.Box.edit(symb.data + "", act);
    };
    ActorBox.get = function (sym) {
        return ActorBox.Box.read(sym + "");
    };
    ActorBox.Box = new DodDataStructure_1.KVPair();
    return ActorBox;
}());
exports.ActorBox = ActorBox;
},{"../../DodDataStructure":1}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//////
var EventCentre = /** @class */ (function () {
    function EventCentre() {
        this._centre = new Laya.EventDispatcher();
    }
    EventCentre.init = function () {
        EventCentre.instance = new EventCentre();
        EventCentre.EType = new EType();
        EventCentre.init = function () { };
    };
    ;
    EventCentre.prototype.on = function (type, caller, listener, args) {
        this._centre.on(type, caller, listener, args);
    };
    EventCentre.prototype.event = function (type, args) {
        this._centre.event(type, args);
    };
    EventCentre.prototype.off = function (type, caller, listener) {
        this._centre.off(type, caller, listener);
    };
    return EventCentre;
}());
exports.EventCentre = EventCentre;
var EType = /** @class */ (function () {
    function EType() {
    }
    EType.prototype.LEAVE = function (pos, identity) {
        return identity + ":COLLISION_EVENT_LEAVE_FROM(" + pos.x + "|" + pos.y + ")";
    };
    EType.prototype.ENTRE = function (pos, identity) {
        return identity + ":COLLISION_EVENT_ENTRE_TO(" + pos.x + "|" + pos.y + ")";
    };
    /**
     * new added for performance starts here
     */
    EType.prototype.PERFORMANCE_RESCALE = function () {
        return "RESCALE";
    };
    EType.prototype.PERFORMANCE_TEXT_SWITCH = function () {
        return "TEXT_SWITCH";
    };
    return EType;
}());
},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MySymbol = /** @class */ (function () {
    function MySymbol() {
        this._data = MySymbol.count;
        MySymbol.count += 1;
    }
    Object.defineProperty(MySymbol.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    MySymbol.count = 0;
    return MySymbol;
}());
exports.MySymbol = MySymbol;
},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FixTime = /** @class */ (function () {
    function FixTime() {
    }
    FixTime.init = function () {
        this.frameCount = 0;
        this.elapsedTime = 0;
    };
    FixTime.update = function () {
        this.frameCount++;
        this.elapsedTime += this.deltaTime;
    };
    FixTime.frameRate = 60;
    FixTime.deltaTime = 1 / FixTime.frameRate;
    return FixTime;
}());
exports.default = FixTime;
},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
var Game_1 = require("./SceneScript/Game");
var Loading_1 = require("./SceneScript/Loading");
/*
* 游戏初始化配置;
*/
var GameConfig = /** @class */ (function () {
    function GameConfig() {
    }
    GameConfig.init = function () {
        var reg = Laya.ClassUtils.regClass;
        reg("SceneScript/Game.ts", Game_1.default);
        reg("SceneScript/Loading.ts", Loading_1.default);
    };
    GameConfig.width = 1800;
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
},{"./SceneScript/Game":43,"./SceneScript/Loading":44}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Profile_1 = require("./ActorModules/Profile");
var FixSymbol_1 = require("../../Fix/FixSymbol");
var AtkAbst_1 = require("./Attack/AtkAbst");
var DodKey_1 = require("../../Common/DodKey");
var ActorStateFsm_1 = require("./State/ActorStateFsm");
var ActorBuffMgr_1 = require("./ActorModules/ActorBuffMgr");
var Transform_1 = require("./ActorModules/Transform");
var UnitRender_1 = require("./ActorModules/UnitRender");
var Animation_1 = require("./ActorModules/Animation");
var ActorRoute_1 = require("./ActorRoute");
var ActorSkill_1 = require("./ActorModules/ActorSkill");
var ActorCost_1 = require("./ActorModules/ActorCost");
var Blocker_1 = require("./Attack/Blocker");
//基本原则：少用继承，多用组合
var Actor = /** @class */ (function () {
    //TODO：去包一个组件
    // /**
    //  * 目标选择器
    //  */
    // public seeker: Seeker;
    // /*
    // * 当前锁定目标
    // * */
    // public focus: Actor;
    function Actor(type, res) {
        this.symbol = new FixSymbol_1.MySymbol();
        this.type = type;
        this.state = new ActorStateFsm_1.default(this);
        // according to different type, add different components to this actor. 
        this.profile = new Profile_1.Profile(this, res['xxx']);
        this.atk = new AtkAbst_1.AtkStateMachine(this, res['xxx']);
        this.blocker = new Blocker_1.Blocker(this);
        this.buffMgr = new ActorBuffMgr_1.ActorBuffMgr(this, res['xxx']);
        this.transform = new Transform_1.Transform(this);
        this.render = new UnitRender_1.UnitRender(this);
        this.animation = new Animation_1.Animation(this, res['xxx']);
        //
        if (DodKey_1.ActorType.Monster == this.type) {
            this.route = new ActorRoute_1.default(this, res['xxx']);
        }
        else if (DodKey_1.ActorType.Operator == this.type) {
            this.skill = new ActorSkill_1.ActorSkill(this, res['xxx']);
            this.cost = new ActorCost_1.ActorCost(this);
        }
    }
    Actor.prototype.awake = function () {
        this.state.runState(ActorStateFsm_1.ActorStateID.Prepred);
    };
    Actor.prototype.update = function () {
        this.state.update();
    };
    Actor.prototype.reset = function () {
        // reset clear resource related module
        // this.render.reset();
    };
    Actor.prototype.setOnMap = function () {
        //TODO
    };
    Actor.prototype.setPosition = function () {
        //TODO
    };
    /**
     * 攻击一个或多个Actor目标
     * 2020/3/5 攻击逻辑已从事件触发改为直接调用
     * 发起和接收攻击的逻辑均封装在Actor类中
     * @param victim
     */
    Actor.prototype.attack = function () {
        var _this = this;
        var victim = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            victim[_i] = arguments[_i];
        }
        var dmg = this.profile.generateDamage(this);
        victim.forEach(function (ele) {
            _this.beAttacked(dmg.copy());
        });
    };
    /**
     * 被攻击
     * @param damage
     */
    Actor.prototype.beAttacked = function (damage) {
        //@todo
        //减少生命值
        //发出攻击事件
        //（可能）发出死亡事件
    };
    return Actor;
}());
exports.default = Actor;
},{"../../Common/DodKey":2,"../../Fix/FixSymbol":12,"./ActorModules/ActorBuffMgr":17,"./ActorModules/ActorCost":18,"./ActorModules/ActorSkill":19,"./ActorModules/Animation":20,"./ActorModules/Profile":22,"./ActorModules/Transform":23,"./ActorModules/UnitRender":24,"./ActorRoute":25,"./Attack/AtkAbst":26,"./Attack/Blocker":27,"./State/ActorStateFsm":28}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Actor_1 = require("./Actor");
var ActorMgr = /** @class */ (function () {
    function ActorMgr() {
        this.actors = new Array();
    }
    ActorMgr.prototype.init = function (res) {
        this._initEnemy(res);
        this._initOprt();
    };
    ActorMgr.prototype.awake = function () {
        for (var i = 0; i < this.actors.length; i++) {
            var actor = this.actors[i];
            actor.awake();
        }
    };
    ActorMgr.prototype.update = function () {
        for (var i = 0; i < this.actors.length; i++) {
            var actor = this.actors[i];
            actor.update();
        }
    };
    ActorMgr.prototype.reset = function () {
        for (var i = 0; i < this.actors.length; i++) {
            var actor = this.actors[i];
            actor.reset();
        }
    };
    ActorMgr.prototype.createActor = function (type, res) {
        var actor = new Actor_1.default(type, res);
        this.actors.push(actor);
    };
    ActorMgr.prototype.getActorByID = function (ID) {
        for (var i = 0; i < this.actors.length; i++) {
            var actor = this.actors[i];
            if (ID == actor.symbol.data) {
                return actor;
            }
        }
        return null;
    };
    ActorMgr.prototype._initEnemy = function (res) {
        //TODO use level res data init enemy actors
        //eg.
        //let enemyRes = res['xxxxx'];
        //actor = this.createActor(ActorType.Enemy ,enemyRes);
    };
    ActorMgr.prototype._initOprt = function () {
        //TODO use pre choose oprt list to init self actors
        //let array = RhodesGames.Instance.gamedata.currentFormation;
        //for (let i = 0; i < array.length; i++) {
        //   let id = array[i];
        //   let res = DodResourceMgr.Instance.getCurrentOperarorDataByID(id);
        //   let actor = this.createActor(ActorType.Operator, res)
        //}
    };
    return ActorMgr;
}());
exports.default = ActorMgr;
},{"./Actor":15}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActorBuffMgr = /** @class */ (function () {
    function ActorBuffMgr(keeper, res) {
    }
    return ActorBuffMgr;
}());
exports.ActorBuffMgr = ActorBuffMgr;
},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActorCost = /** @class */ (function () {
    function ActorCost(keeper) {
    }
    return ActorCost;
}());
exports.ActorCost = ActorCost;
},{}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActorSkill = /** @class */ (function () {
    function ActorSkill(keeper, res) {
    }
    return ActorSkill;
}());
exports.ActorSkill = ActorSkill;
},{}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Animation = /** @class */ (function () {
    function Animation(keeper, res) {
    }
    return Animation;
}());
exports.Animation = Animation;
},{}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DamageType;
(function (DamageType) {
    DamageType[DamageType["PYSICAL"] = 0] = "PYSICAL";
    DamageType[DamageType["MAGICAL"] = 1] = "MAGICAL";
    DamageType[DamageType["TRUE"] = 2] = "TRUE";
})(DamageType = exports.DamageType || (exports.DamageType = {}));
var Damage = /** @class */ (function () {
    function Damage(source, value, type) {
        this.source = null; //伤害来源
        this.value = 0; //攻击力
        this.primary = true; //是否为非间接伤害（间接伤害不会触发星熊、年的反甲之类的效果）
        this.value = value;
    }
    Damage.prototype.copy = function () {
        var result = new Damage(this.source, this.value, this.type);
        result.type = this.type;
        result.primary = this.primary;
        result.source = this.source;
        return result;
    };
    return Damage;
}());
exports.Damage = Damage;
},{}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Damage_1 = require("./Damage");
/**
 * Profile类是储存单位基本数据（如攻击力、防御力等）的类
 * 它还提供一切用于获取Actor信息的接口（如是否能够行动、是否能够阻挡）
 */
var Profile = /** @class */ (function () {
    function Profile(keeper, res) {
        this.name = "Chandler Bing";
        this._prepTime = 100; //前摇时间
        this._afterTime = 100; //后摇时间
        this._breakthrough = 1; //破除阻挡能力
        this.invisible = false; //是否隐形
        this.blocked = false; //已被阻挡
        /**
         * 伤害计算相关的修改和访问接口
         * 作者：葱
         */
        this.attackPower = 100; //攻击力
        this.atkScale = 1; //攻击倍率
        this.atkBuff = 1; //攻击百分比提升
        this.armour = 50; //物理防御
        this.magicArmour = 0; //法术抗性
        this.dmgType = Damage_1.DamageType.PYSICAL; //伤害类型
        this.hitPoint = 10; //生命值
        this.maxHitPoint = 10; //最高生命值
        /**
         * by XWV
         */
        this.hateLevel = 0;
        this.keeper = keeper;
        //todo: about res
    }
    /**
     * 传入一个Actor，返回伤害对象
     * @param source
     */
    Profile.prototype.generateDamage = function (source) {
        return new Damage_1.Damage(source, this.attackPower * this.atkScale * this.atkBuff, this.dmgType);
    };
    Object.defineProperty(Profile.prototype, "prepTime", {
        get: function () {
            return this._prepTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Profile.prototype, "afterTime", {
        get: function () {
            return this._afterTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Profile.prototype, "breakthrough", {
        get: function () {
            return this._breakthrough;
        },
        enumerable: true,
        configurable: true
    });
    return Profile;
}());
exports.Profile = Profile;
/**
 * 是否需要在profile中将不同的数值分类？
 *
 */ 
},{"./Damage":21}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 对一个单位的几何状态的描述
 */
var Transform = /** @class */ (function () {
    function Transform(keeper) {
    }
    return Transform;
}());
exports.Transform = Transform;
},{}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UnitRender = /** @class */ (function () {
    function UnitRender(keeper) {
    }
    return UnitRender;
}());
exports.UnitRender = UnitRender;
},{}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Route = /** @class */ (function () {
    function Route(keeper, res) {
    }
    return Route;
}());
exports.default = Route;
},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DodDataStructure_1 = require("../../../Common/DodDataStructure");
/**
 * by XWV
 *
 * 葱 修改于 3/18
 *      将Seeker挪入攻击状态机内，不由Actor持有
 *      不同的攻击范围由Seeker替换来实现
 *      不同的攻击逻辑（范围/单体）由替换状态机内的状态实例实现
 *      AtkStateMachine负责对外提供所有修改/访问接口
 *      仍需对此进行进一步规划（单体/多体/群体攻击逻辑是仅由一个参数实现，还是由多态实现）
 *      //todo:时间累加逻辑改变
 *
 */
var StateType;
(function (StateType) {
    StateType["WAIT"] = "WAIT";
    StateType["PREPARE"] = "PREPARE";
    StateType["AFTER_ATK"] = "AFTER_ATK";
})(StateType || (StateType = {}));
var BaseState = /** @class */ (function () {
    function BaseState() {
        this.time = 0; //时间累加逻辑改变
    }
    BaseState.prototype.reset = function () {
        this.time = 0;
    };
    return BaseState;
}());
var Wait = /** @class */ (function (_super) {
    __extends(Wait, _super);
    function Wait() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Wait.prototype.execute = function (machine) {
        var focus = machine.seeker.getFocus();
        if (focus !== null) { //如果能够找到敌人
            machine.changeState(StateType.PREPARE);
            console.log("Found Enemy, Switch to prepare phase @" + this.time);
        }
        else { //如果找不到敌人
            this.time += 1; //todo: 时间累加逻辑改变
        }
        //如果seeker中存在敌人，reset Prepare并跳转到Prepare阶段
    };
    return Wait;
}(BaseState));
var Prepare = /** @class */ (function (_super) {
    __extends(Prepare, _super);
    function Prepare() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Prepare.prototype.execute = function (machine) {
        /*
        由于攻击状态机的规划进行过一次修改，此处暂时先提供伪代码
        此类目前为单体攻击的逻辑
        */
        var focus = machine.seeker.getFocus();
        if (machine.seeker.focusChanged()) {
            if (focus !== null) {
                //todo: 重新进入前摇阶段
            }
            else {
                //todo: 进入准备阶段
            }
            return;
        }
        /*
        todo: 前摇时间累加。目前已经经过的前摇时间存储在profile中?
        如果前摇时间已满，则进行攻击且进入后摇状态
        */
        // //判断是否需要重新选择目标并重置前摇
        // let seeker = machine.keeper.seeker;
        // let actor = machine.keeper;
        // if (machine.keeper.focus && seeker.getCaptureList().indexOf(machine.keeper.focus) < 0) {//当前目标不在攻击范围内
        //     this.reset();
        //     machine.keeper.focus = seeker.getFocus();
        // }
        // //判断当前是否存在目标
        // if (machine.keeper.focus) {
        //     //计数+1
        //     this.time += 1;
        //     if (this.time >= actor.profile.prepTime) {  //前摇结束触发攻击
        //         console.log("Attack & to After Phase @" + this.time);//进行攻击
        //         EventCentre.instance.event(EventCentre.EType.ATTACK, [actor, machine.keeper.focus]);
        //         //进入后摇状态
        //         machine.changeState(StateType.AFTER_ATK);
        //     }
        // } else {
        //     //没有目标，回到待机阶段
        //     machine.changeState(StateType.WAIT);
        // }
    };
    return Prepare;
}(BaseState));
var AfterAtk = /** @class */ (function (_super) {
    __extends(AfterAtk, _super);
    function AfterAtk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AfterAtk.prototype.execute = function (machine) {
        // let seeker = machine.keeper.seeker;
        // this.time += 1;//单纯计个数，满了就返回wait状态
        // if (this.time >= machine.keeper.profile.afterTime) {
        //     console.log("Wait After ATK End, to Wait @" + this.time);
        //     //重新获取目标，有目标则进行下一次攻击，无目标回到待机阶段
        //     machine.keeper.focus = seeker.getFocus();
        //     machine.changeState(machine.keeper.focus ? StateType.PREPARE : StateType.WAIT);
        // }
    };
    return AfterAtk;
}(BaseState));
/**
 * 状态机类
 */
var AtkStateMachine = /** @class */ (function () {
    /**
     * @param keeper 状态机所有者
     */
    function AtkStateMachine(keeper, res) {
        /**
         * 可使用的状态列表
         */
        this.stateList = new DodDataStructure_1.KVPair();
        this.keeper = keeper;
        this.curState = new Wait();
        this.stateList.edit(StateType.WAIT, this.curState);
        this.stateList.edit(StateType.PREPARE, new Prepare());
        this.stateList.edit(StateType.AFTER_ATK, new AfterAtk());
        //todo: about res
        this.seeker = null; //初始化Seeker
    }
    /**
     * 刷新当前状态，每帧调用
     */
    AtkStateMachine.prototype.update = function () {
        if (this.keeper) {
            this.curState.execute(this);
        }
    };
    /**
     * 改变当前状态，新状态会重置为初始态
     * @param stateType 新的状态类型
     */
    AtkStateMachine.prototype.changeState = function (stateType) {
        var state = this.stateList.read(stateType);
        state.reset();
        this.curState = state;
    };
    return AtkStateMachine;
}());
exports.AtkStateMachine = AtkStateMachine;
},{"../../../Common/DodDataStructure":1}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Blocker = /** @class */ (function () {
    function Blocker(keeper) {
    }
    return Blocker;
}());
exports.Blocker = Blocker;
},{}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DodLog_1 = require("../../../Common/DodLog");
var ActorStateID;
(function (ActorStateID) {
    ActorStateID[ActorStateID["None"] = 0] = "None";
    ActorStateID[ActorStateID["Prepred"] = 1] = "Prepred";
    ActorStateID[ActorStateID["Born"] = 2] = "Born";
    ActorStateID[ActorStateID["Walk"] = 3] = "Walk";
    ActorStateID[ActorStateID["Stunned"] = 4] = "Stunned";
    ActorStateID[ActorStateID["Fight"] = 5] = "Fight";
    ActorStateID[ActorStateID["Death"] = 6] = "Death";
    ActorStateID[ActorStateID["Escape"] = 7] = "Escape";
    ActorStateID[ActorStateID["Count"] = 8] = "Count";
})(ActorStateID = exports.ActorStateID || (exports.ActorStateID = {}));
/*
 * 角色状态机 管理角色所处阶段 根据不同阶段决定不同的组件状态
 */
var ActorStateMgr = /** @class */ (function () {
    function ActorStateMgr(actor) {
        this._currentState = null;
        //TODO
        //参照游戏大状态机
    }
    ActorStateMgr.prototype.init = function () {
        this.runState(ActorStateID.None);
    };
    ActorStateMgr.prototype.runState = function (stateID) {
        if (ActorStateID.Count <= stateID || stateID <= ActorStateID.None) {
            DodLog_1.default.error("GameStateMgr.runState: Invalid stateID [" + stateID + "]. ");
            return;
        }
        if (null != this._currentState) {
            this._currentState.leave();
        }
        this._currentState = this._states[stateID];
        this._currentState.enter();
    };
    ActorStateMgr.prototype.update = function () {
        if (null != this._currentState) {
            this._currentState.update();
        }
    };
    ActorStateMgr.prototype.reset = function () {
        if (null != this._currentState) {
            this._currentState.leave();
            this._currentState = null;
        }
        for (var i = 0; i < this._states.length; i++) {
            var state = this._states[i];
            state.reset();
        }
    };
    return ActorStateMgr;
}());
exports.default = ActorStateMgr;
},{"../../../Common/DodLog":3}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FixSymbol_1 = require("../../Fix/FixSymbol");
/**
 * 碰撞处理器，该类维护一个Map，Map记录所有需要进行碰撞处理的碰撞器，Map用碰撞器的唯一标识作为键以避免重复记录。
 *
 * 该类提供一个recalculate方法用于重新计算碰撞情况，对于Map中的每个处理对象，该方法计算其与Map中的所有其他对象
 * 的重叠情况，并将这些重叠的其他对象以列表的形式传递给该处理对象。
 *
 * by XWV
 */
var ActorCollisionProcessor = /** @class */ (function () {
    function ActorCollisionProcessor() {
        this.colliderMap = {};
    }
    ActorCollisionProcessor.prototype.registerCollider = function (collider) {
        this.colliderMap[collider.symbol.data] = collider;
    };
    ActorCollisionProcessor.prototype.unregisterCollider = function (collider) {
        delete this.colliderMap[collider.symbol.data];
    };
    ActorCollisionProcessor.prototype.update = function () {
        for (var i in this.colliderMap) {
            var targetCollider = this.colliderMap[i];
            var collidingList = [];
            for (var j in this.colliderMap) {
                var collider = this.colliderMap[j];
                if (collider == targetCollider) {
                    continue;
                }
                if (targetCollider.shouldCollideWith(collider) && targetCollider.getCollisionRange().isCoincideWithRange(collider.getCollisionRange())) {
                    collidingList.push(collider);
                }
            }
            targetCollider.onCollidingListRefresh(collidingList);
        }
    };
    return ActorCollisionProcessor;
}());
exports.ActorCollisionProcessor = ActorCollisionProcessor;
var ActorCollider = /** @class */ (function () {
    function ActorCollider() {
        //唯一标识
        this.symbol = new FixSymbol_1.MySymbol();
    }
    return ActorCollider;
}());
exports.ActorCollider = ActorCollider;
var SimpleActorCollider = /** @class */ (function (_super) {
    __extends(SimpleActorCollider, _super);
    function SimpleActorCollider(actor, range) {
        var _this = _super.call(this) || this;
        _this.collidingList = [];
        _this.actor = actor;
        _this.range = range;
        return _this;
    }
    SimpleActorCollider.prototype.getCollisionRange = function () {
        return this.range;
    };
    SimpleActorCollider.prototype.setCollisionRange = function (range) {
        this.range = range;
    };
    SimpleActorCollider.prototype.getActor = function () {
        return this.actor;
    };
    SimpleActorCollider.prototype.getCollidingList = function () {
        return this.collidingList;
    };
    SimpleActorCollider.prototype.onCollidingListRefresh = function (collidingList) {
        this.collidingList = collidingList;
    };
    return SimpleActorCollider;
}(ActorCollider));
exports.SimpleActorCollider = SimpleActorCollider;
},{"../../Fix/FixSymbol":12}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameLevel_1 = require("./GameLevel");
var ActorCollisionProcessor_1 = require("./Collision/ActorCollisionProcessor");
var GameLevel_2 = require("./GameLevel");
var DodResourceMgr_1 = require("../Resources/DodResourceMgr");
var ActorMgr_1 = require("./Actor/ActorMgr");
var GameBattle = /** @class */ (function () {
    function GameBattle() {
        this.level = new GameLevel_2.default();
        this.map = new GameLevel_1.default();
        this.actorMgr = new ActorMgr_1.default();
        this.collision = new ActorCollisionProcessor_1.ActorCollisionProcessor();
    }
    GameBattle.prototype.prepareLevel = function () {
        //TODO init level information
        var res = DodResourceMgr_1.default.Instance.getCurrentLevelRes();
        this.level.init(res['level']); //just sample
        this.map.init(res['map']);
        this.actorMgr.init(res['map']);
        //AND DONT FORGET RESET LAST BATTLE DATA REMAINS. 
        //this.collision.reset();
        this._levelPrepared = true;
    };
    GameBattle.prototype.isLevelPreprared = function () {
        return this._levelPrepared;
    };
    GameBattle.prototype.reset = function () {
        //TODO
        //CLEAR LAST BATTLE RESOURCE
        this._levelPrepared = false;
    };
    return GameBattle;
}());
exports.default = GameBattle;
},{"../Resources/DodResourceMgr":41,"./Actor/ActorMgr":16,"./Collision/ActorCollisionProcessor":29,"./GameLevel":32}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameBattleConst = /** @class */ (function () {
    function GameBattleConst() {
    }
    GameBattleConst.standardCostIncreaseRatio = 1;
    GameBattleConst.maxCostNum = 99;
    GameBattleConst.initCostNum = 6;
    GameBattleConst.lifePoint = 3;
    return GameBattleConst;
}());
exports.default = GameBattleConst;
},{}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FixTime_1 = require("../Fix/FixTime");
var GameBattleConst_1 = require("./GameBattleConst");
/**
 * 模块说明: 游戏战斗地图模块
 * 负责内容: 地图属性设置，全局buff管理
 * 负责人: 银华
 * 时间: 2020年3月3日12:45:41
 */
//KR: 全局由关卡模块管理 @银华
//这里可以包含全局的调整值/生命值/涨费
//全游戏标准值使用常量定义在BattleConst类中 示例可以看下方
//另：私有成员命名请在前面加下划线 声明的成员请在构造函数中全部初始化一个值，防止undefined(野指针)的情况发生
var GameLevel = /** @class */ (function () {
    function GameLevel() {
        this._initialCost = 0;
        this._currentCost = 0;
        this._lifePoint = 0;
        this._timeLine = 0;
        this._globalBuffList = [];
    }
    GameLevel.prototype.init = function (res) {
        //for example
        this.reset();
        this._initialCost = this._currentCost = res['initCost'] || GameBattleConst_1.default.initCostNum;
        this._lifePoint = res['life'] || GameBattleConst_1.default.lifePoint;
        this._timeLine = 0;
    };
    GameLevel.prototype.update = function () {
        this.getGlobalBuffList();
        this._updateTime();
        this._updateCost();
    };
    GameLevel.prototype.getGlobalBuffList = function () {
        return this._globalBuffList;
    };
    GameLevel.prototype.changeCost = function () {
        //todo....
    };
    GameLevel.prototype._updateTime = function () {
        this._timeLine += FixTime_1.default.deltaTime;
    };
    GameLevel.prototype._updateCost = function () {
    };
    GameLevel.prototype.reset = function () {
        this._globalBuffList.splice(0, this._globalBuffList.length);
    };
    return GameLevel;
}());
exports.default = GameLevel;
},{"../Fix/FixTime":13,"./GameBattleConst":31}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DodLog_1 = require("../Common/DodLog");
var GameStateMgr_1 = require("./State/GameStateMgr");
var GameBattle_1 = require("./GameBattle");
/**
 * 这是游戏本体
 * 说一些Rhodes_Game文件夹下的注释规则，方便以后ctrl+f
 *
 * 1.//@todo 标注需要完善的部分
 *
 * 2.//@tofix 标注已知有问题的部分
 *
 * 3.//@test 标注仅供测试使用的部分
 *
 * 3.//@redcall 标注调用渲染模块的部分
 *
 */
var RhodesGame = /** @class */ (function () {
    function RhodesGame() {
        this.battle = new GameBattle_1.default();
        this.stateMgr = new GameStateMgr_1.default(this.battle);
    }
    Object.defineProperty(RhodesGame, "Instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: true,
        configurable: true
    });
    RhodesGame.prototype.init = function () {
        this.stateMgr.init();
        DodLog_1.default.debug("RhodesGame: initialization complete. ");
    };
    RhodesGame.prototype.update = function () {
        this.stateMgr.update();
    };
    return RhodesGame;
}());
exports.default = RhodesGame;
},{"../Common/DodLog":3,"./GameBattle":30,"./State/GameStateMgr":39}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameStateBase = /** @class */ (function () {
    function GameStateBase(battle) {
        this._battle = battle;
    }
    GameStateBase.prototype.enter = function () {
    };
    GameStateBase.prototype.update = function () {
    };
    GameStateBase.prototype.leave = function () {
    };
    GameStateBase.prototype.reset = function () {
    };
    return GameStateBase;
}());
exports.default = GameStateBase;
},{}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameStateBase_1 = require("./GameStateBase");
var GameStateBattle = /** @class */ (function (_super) {
    __extends(GameStateBattle, _super);
    function GameStateBattle(battle) {
        return _super.call(this, battle) || this;
    }
    GameStateBattle.prototype.enter = function () {
        _super.prototype.enter.call(this);
    };
    GameStateBattle.prototype.leave = function () {
        _super.prototype.leave.call(this);
    };
    GameStateBattle.prototype.reset = function () {
        _super.prototype.reset.call(this);
    };
    GameStateBattle.prototype.update = function () {
        _super.prototype.update.call(this);
        this._battle.map.update();
    };
    return GameStateBattle;
}(GameStateBase_1.default));
exports.default = GameStateBattle;
},{"./GameStateBase":34}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameStateBase_1 = require("./GameStateBase");
var RhodesGame_1 = require("../RhodesGame");
var DodResourceMgr_1 = require("../../Resources/DodResourceMgr");
var GameStateMgr_1 = require("./GameStateMgr");
var DodLog_1 = require("../../Common/DodLog");
var GameStateGameload = /** @class */ (function (_super) {
    __extends(GameStateGameload, _super);
    function GameStateGameload(battle) {
        return _super.call(this, battle) || this;
    }
    GameStateGameload.prototype.enter = function () {
        _super.prototype.enter.call(this);
        //TODO SHOW LOADING SCREEN
    };
    GameStateGameload.prototype.leave = function () {
        _super.prototype.leave.call(this);
    };
    GameStateGameload.prototype.reset = function () {
        _super.prototype.reset.call(this);
    };
    GameStateGameload.prototype.update = function () {
        _super.prototype.update.call(this);
        if (true == DodResourceMgr_1.default.Instance.inited()) {
            //WE DO NOT HAVE LOBBY MODULE IN THIS VERSION
            //JUST SET LEVEL ID HERE
            //TO DEL
            DodResourceMgr_1.default.Instance.setLevelID(1);
            RhodesGame_1.default.Instance.stateMgr.runState(GameStateMgr_1.GameStateID.Levelload);
            DodLog_1.default.debug("GameStateGameload.update: Resources init complete, set level into 1. ");
        }
    };
    return GameStateGameload;
}(GameStateBase_1.default));
exports.default = GameStateGameload;
},{"../../Common/DodLog":3,"../../Resources/DodResourceMgr":41,"../RhodesGame":33,"./GameStateBase":34,"./GameStateMgr":39}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameStateBase_1 = require("./GameStateBase");
var RhodesGame_1 = require("../RhodesGame");
var GameStateMgr_1 = require("./GameStateMgr");
var DodResourceMgr_1 = require("../../Resources/DodResourceMgr");
var DodLog_1 = require("../../Common/DodLog");
var GameStateLevelLoad = /** @class */ (function (_super) {
    __extends(GameStateLevelLoad, _super);
    function GameStateLevelLoad(battle) {
        return _super.call(this, battle) || this;
    }
    GameStateLevelLoad.prototype.enter = function () {
        _super.prototype.enter.call(this);
        this._battle.prepareLevel();
    };
    GameStateLevelLoad.prototype.leave = function () {
        _super.prototype.leave.call(this);
    };
    GameStateLevelLoad.prototype.reset = function () {
        _super.prototype.reset.call(this);
    };
    GameStateLevelLoad.prototype.update = function () {
        _super.prototype.update.call(this);
        if (true == DodResourceMgr_1.default.Instance.isLevelPrepared()) {
            if (true == this._battle.isLevelPreprared()) {
                RhodesGame_1.default.Instance.stateMgr.runState(GameStateMgr_1.GameStateID.Battle);
                DodLog_1.default.debug("GameStateLevelload.update: level [" + DodResourceMgr_1.default.Instance.getLevelID() + "] is prepared. ");
            }
        }
    };
    return GameStateLevelLoad;
}(GameStateBase_1.default));
exports.default = GameStateLevelLoad;
},{"../../Common/DodLog":3,"../../Resources/DodResourceMgr":41,"../RhodesGame":33,"./GameStateBase":34,"./GameStateMgr":39}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameStateBase_1 = require("./GameStateBase");
var GameStateLobby = /** @class */ (function (_super) {
    __extends(GameStateLobby, _super);
    function GameStateLobby(battle) {
        return _super.call(this, battle) || this;
    }
    GameStateLobby.prototype.enter = function () {
        _super.prototype.enter.call(this);
    };
    GameStateLobby.prototype.leave = function () {
        _super.prototype.leave.call(this);
    };
    GameStateLobby.prototype.reset = function () {
        _super.prototype.reset.call(this);
    };
    GameStateLobby.prototype.update = function () {
        _super.prototype.update.call(this);
    };
    return GameStateLobby;
}(GameStateBase_1.default));
exports.default = GameStateLobby;
},{"./GameStateBase":34}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameStateBattle_1 = require("./GameStateBattle");
var DodLog_1 = require("../../Common/DodLog");
var GameStateLevelload_1 = require("./GameStateLevelload");
var GameStateGameload_1 = require("./GameStateGameload");
var GameStateLobby_1 = require("./GameStateLobby");
var GameStateID;
(function (GameStateID) {
    GameStateID[GameStateID["None"] = 0] = "None";
    GameStateID[GameStateID["Gameload"] = 1] = "Gameload";
    GameStateID[GameStateID["Lobby"] = 2] = "Lobby";
    GameStateID[GameStateID["Levelload"] = 3] = "Levelload";
    GameStateID[GameStateID["Battle"] = 4] = "Battle";
    GameStateID[GameStateID["Count"] = 5] = "Count";
})(GameStateID = exports.GameStateID || (exports.GameStateID = {}));
/*
 * 大状态机 管理游戏所处阶段
 * @TODO GAMELOAD LOBBY LEVELLOAD BATTLE
 */
var GameStateMgr = /** @class */ (function () {
    function GameStateMgr(battle) {
        this._currentState = null;
        // let battle = RhodesGame.Instance.battle;
        this._states = [];
        this._states.push(null);
        this._states.push(new GameStateGameload_1.default(battle));
        this._states.push(new GameStateLobby_1.default(battle));
        this._states.push(new GameStateLevelload_1.default(battle));
        this._states.push(new GameStateBattle_1.default(battle));
    }
    GameStateMgr.prototype.init = function () {
        this.runState(GameStateID.Gameload);
    };
    GameStateMgr.prototype.runState = function (stateID) {
        if (GameStateID.Count <= stateID || stateID <= GameStateID.None) {
            DodLog_1.default.error("GameStateMgr.runState: Invalid stateID [" + stateID + "]. ");
            return;
        }
        if (null != this._currentState) {
            this._currentState.leave();
        }
        this._currentState = this._states[stateID];
        this._currentState.enter();
    };
    GameStateMgr.prototype.update = function () {
        if (null != this._currentState) {
            this._currentState.update();
        }
    };
    GameStateMgr.prototype.reset = function () {
        if (null != this._currentState) {
            this._currentState.leave();
            this._currentState = null;
        }
        for (var i = 0; i < this._states.length; i++) {
            var state = this._states[i];
            state.reset();
        }
    };
    return GameStateMgr;
}());
exports.default = GameStateMgr;
},{"../../Common/DodLog":3,"./GameStateBattle":35,"./GameStateGameload":36,"./GameStateLevelload":37,"./GameStateLobby":38}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameConfig_1 = require("./GameConfig");
var SceneManager_1 = require("./SceneManager");
var FixTime_1 = require("./Fix/FixTime");
var RhodesGame_1 = require("./Game/RhodesGame");
var EventCentre_1 = require("./Event/EventCentre");
var DodResourceMgr_1 = require("./Resources/DodResourceMgr");
var PerformanceCentre_1 = require("./Common/Graphics/Performance_Module/PerformanceCentre");
var DodMath_1 = require("./Common/DodMath");
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
        //GAME INIT (GLOBAL MODULE)
        FixTime_1.default.init();
        RhodesGame_1.default.Instance.init();
        DodResourceMgr_1.default.Instance.init();
        EventCentre_1.EventCentre.init();
        //激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
        Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
    }
    Main.prototype.onVersionLoaded = function () {
        //激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
        Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
    };
    Main.prototype.onConfigLoaded = function () {
        SceneManager_1.default.Instance.awake();
        PerformanceCentre_1.default.initialize(Laya.stage);
        PerformanceCentre_1.default.instance.initBoard([
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ], new DodMath_1.Vec2(50, 50), new DodMath_1.Vec2(100, 100), "#ff00ff", "#ffff00");
        //Awake Game Engine Loop
        Laya.timer.loop(16, this, this._update);
    };
    Main.prototype._update = function () {
        FixTime_1.default.update();
        RhodesGame_1.default.Instance.update();
        DodResourceMgr_1.default.Instance.update();
    };
    return Main;
}());
//激活启动类
new Main();
},{"./Common/DodMath":4,"./Common/Graphics/Performance_Module/PerformanceCentre":6,"./Event/EventCentre":11,"./Fix/FixTime":13,"./Game/RhodesGame":33,"./GameConfig":14,"./Resources/DodResourceMgr":41,"./SceneManager":42}],41:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DodResourceMgr = /** @class */ (function () {
    function DodResourceMgr() {
        this._levelID = null;
        this._inited = false;
        this._levelPrepared = false;
    }
    Object.defineProperty(DodResourceMgr, "Instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: true,
        configurable: true
    });
    DodResourceMgr.prototype.setLevelID = function (id) {
        this._levelID = id;
        this._levelPrepared = false;
    };
    DodResourceMgr.prototype.getLevelID = function () {
        return this._levelID;
    };
    DodResourceMgr.prototype.init = function () {
        //TODO LOAD
        //this._json.load();
        //this._tex.load();
        //set inited flag true while initialization complete
    };
    DodResourceMgr.prototype.inited = function () {
        return this._inited;
    };
    DodResourceMgr.prototype.update = function () {
        if (null != this.setLevelID && false == this._levelPrepared) {
            //prepare prefab here
            if (1) { //make sure prefab prepared
                this._levelPrepared = true;
            }
        }
    };
    DodResourceMgr.prototype.isLevelPrepared = function () {
        return this._levelPrepared;
    };
    DodResourceMgr.prototype.getCurrentLevelRes = function () {
        //TODO
        return null;
    };
    DodResourceMgr.prototype.getActorResByID = function (id) {
        //TODO
        return null;
    };
    return DodResourceMgr;
}());
exports.default = DodResourceMgr;
},{}],42:[function(require,module,exports){
"use strict";
// import EventCentre from "./Toybox/EventCentre";
// import Database from "./Toybox/Database";
Object.defineProperty(exports, "__esModule", { value: true });
var SceneManager = /** @class */ (function () {
    function SceneManager() {
        this.loadingScene = "LoadingScene.scene";
        this.gameScene = "GameScene.scene";
    }
    Object.defineProperty(SceneManager, "Instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: true,
        configurable: true
    });
    SceneManager.prototype.awake = function () {
        Laya.Scene.open(this.gameScene);
    };
    return SceneManager;
}());
exports.default = SceneManager;
},{}],43:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("../ui/layaMaxUI");
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this) || this;
        _this._pause = false;
        return _this;
    }
    Game.prototype.update = function () {
    };
    //全局数据（数据库类完成后将被替代）
    Game.frameLength = 20; //帧长度
    return Game;
}(layaMaxUI_1.ui.GameSceneUI));
exports.default = Game;
},{"../ui/layaMaxUI":45}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("../ui/layaMaxUI");
//TO
var Loading = /** @class */ (function (_super) {
    __extends(Loading, _super);
    function Loading() {
        return _super.call(this) || this;
    }
    return Loading;
}(layaMaxUI_1.ui.LoadingSceneUI));
exports.default = Loading;
},{"../ui/layaMaxUI":45}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Scene = Laya.Scene;
var REG = Laya.ClassUtils.regClass;
var ui;
(function (ui) {
    var GameSceneUI = /** @class */ (function (_super) {
        __extends(GameSceneUI, _super);
        function GameSceneUI() {
            return _super.call(this) || this;
        }
        GameSceneUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.loadScene("GameScene");
        };
        return GameSceneUI;
    }(Scene));
    ui.GameSceneUI = GameSceneUI;
    REG("ui.GameSceneUI", GameSceneUI);
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
},{}]},{},[40])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xheWEvTGF5YUFpcklERS9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQ29tbW9uL0RvZERhdGFTdHJ1Y3R1cmUudHMiLCJzcmMvQ29tbW9uL0RvZEtleS50cyIsInNyYy9Db21tb24vRG9kTG9nLnRzIiwic3JjL0NvbW1vbi9Eb2RNYXRoLnRzIiwic3JjL0NvbW1vbi9HcmFwaGljcy9QZXJmb3JtYW5jZV9Nb2R1bGUvQWN0b3JDb21wb25lbnQudHMiLCJzcmMvQ29tbW9uL0dyYXBoaWNzL1BlcmZvcm1hbmNlX01vZHVsZS9QZXJmb3JtYW5jZUNlbnRyZS50cyIsInNyYy9Db21tb24vR3JhcGhpY3MvUGVyZm9ybWFuY2VfTW9kdWxlL1N5bWJvbGl6ZWRSZW5kZXIudHMiLCJzcmMvQ29tbW9uL0dyYXBoaWNzL1BlcmZvcm1hbmNlX01vZHVsZS9VbnN5bWJvbGl6ZWRSZW5kZXIudHMiLCJzcmMvQ29tbW9uL0dyYXBoaWNzL1BlcmZvcm1hbmNlX01vZHVsZS9jdXN0b21pemVkU3ByLnRzIiwic3JjL0NvbW1vbi9HcmFwaGljcy9QZXJmb3JtYW5jZV9Nb2R1bGUvb2JqYm94LnRzIiwic3JjL0V2ZW50L0V2ZW50Q2VudHJlLnRzIiwic3JjL0ZpeC9GaXhTeW1ib2wudHMiLCJzcmMvRml4L0ZpeFRpbWUudHMiLCJzcmMvR2FtZUNvbmZpZy50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yLnRzIiwic3JjL0dhbWUvQWN0b3IvQWN0b3JNZ3IudHMiLCJzcmMvR2FtZS9BY3Rvci9BY3Rvck1vZHVsZXMvQWN0b3JCdWZmTWdyLnRzIiwic3JjL0dhbWUvQWN0b3IvQWN0b3JNb2R1bGVzL0FjdG9yQ29zdC50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yTW9kdWxlcy9BY3RvclNraWxsLnRzIiwic3JjL0dhbWUvQWN0b3IvQWN0b3JNb2R1bGVzL0FuaW1hdGlvbi50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yTW9kdWxlcy9EYW1hZ2UudHMiLCJzcmMvR2FtZS9BY3Rvci9BY3Rvck1vZHVsZXMvUHJvZmlsZS50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yTW9kdWxlcy9UcmFuc2Zvcm0udHMiLCJzcmMvR2FtZS9BY3Rvci9BY3Rvck1vZHVsZXMvVW5pdFJlbmRlci50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yUm91dGUudHMiLCJzcmMvR2FtZS9BY3Rvci9BdHRhY2svQXRrQWJzdC50cyIsInNyYy9HYW1lL0FjdG9yL0F0dGFjay9CbG9ja2VyLnRzIiwic3JjL0dhbWUvQWN0b3IvU3RhdGUvQWN0b3JTdGF0ZUZzbS50cyIsInNyYy9HYW1lL0NvbGxpc2lvbi9BY3RvckNvbGxpc2lvblByb2Nlc3Nvci50cyIsInNyYy9HYW1lL0dhbWVCYXR0bGUudHMiLCJzcmMvR2FtZS9HYW1lQmF0dGxlQ29uc3QudHMiLCJzcmMvR2FtZS9HYW1lTGV2ZWwudHMiLCJzcmMvR2FtZS9SaG9kZXNHYW1lLnRzIiwic3JjL0dhbWUvU3RhdGUvR2FtZVN0YXRlQmFzZS50cyIsInNyYy9HYW1lL1N0YXRlL0dhbWVTdGF0ZUJhdHRsZS50cyIsInNyYy9HYW1lL1N0YXRlL0dhbWVTdGF0ZUdhbWVsb2FkLnRzIiwic3JjL0dhbWUvU3RhdGUvR2FtZVN0YXRlTGV2ZWxsb2FkLnRzIiwic3JjL0dhbWUvU3RhdGUvR2FtZVN0YXRlTG9iYnkudHMiLCJzcmMvR2FtZS9TdGF0ZS9HYW1lU3RhdGVNZ3IudHMiLCJzcmMvTWFpbi50cyIsInNyYy9SZXNvdXJjZXMvRG9kUmVzb3VyY2VNZ3IudHMiLCJzcmMvU2NlbmVNYW5hZ2VyLnRzIiwic3JjL1NjZW5lU2NyaXB0L0dhbWUudHMiLCJzcmMvU2NlbmVTY3JpcHQvTG9hZGluZy50cyIsInNyYy91aS9sYXlhTWF4VUkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDTkE7SUFBQTtRQUNZ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ZTtRQUNyRCxJQUFNLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDNUIsSUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzVCLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBQSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQSxHQUFHLFNBQUEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUEsQ0FBQyxDQUFDO1FBQ2xELElBQUksUUFBUSxJQUFJLFFBQVEsRUFBRTtZQUN0QixPQUFPLEdBQUcsQ0FBQztTQUNkO1FBQ0QsSUFBTSxLQUFLLEdBQUcsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUNsQyxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFDLEtBQUssRUFBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDVyx3QkFBZ0IsR0FBOUIsVUFBK0IsSUFBUyxFQUFFLEdBQVEsRUFBRSxRQUFlO1FBQy9ELElBQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM1QixJQUFNLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDNUIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFBLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBLEdBQUcsU0FBQSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQSxDQUFDLENBQUM7UUFDbEQsSUFBSSxRQUFRLElBQUksUUFBUSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FB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TlksaUJBQWMsaUJBTTFCLENBQUE7SUFDRCxHQUFHLENBQUMsbUJBQW1CLEVBQUMsY0FBYyxDQUFDLENBQUM7QUFDNUMsQ0FBQyxFQW5CYSxFQUFFLEdBQUYsVUFBRSxLQUFGLFVBQUUsUUFtQmYiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG4oZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHsgQ29tcGFyYWJsZSB9IGZyb20gXCIuL0RvZE1hdGhcIjtcclxuXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEtWUGFpcjxWPntcclxuICAgIHByaXZhdGUgX2xpc3Q6YW55ID0ge307XHJcbiAgICBwdWJsaWMgZWRpdChrZXk6c3RyaW5nLCB2YWx1ZTpWKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX2xpc3Rba2V5XSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHJlYWQoa2V5OnN0cmluZyk6VntcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGlzdFtrZXldO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgaXRlcmF0ZShmOihrOnN0cmluZyx2OlYpPT52b2lkKTp2b2lke1xyXG4gICAgICAgIGZvciAobGV0IGsgaW4gdGhpcy5fbGlzdCkge1xyXG4gICAgICAgICAgICBmKGssIHRoaXMuX2xpc3Rba10pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbmNsYXNzIE5vZGU8RT57XHJcbiAgICBwdWJsaWMgaXRlbTpFO1xyXG4gICAgcHVibGljIG5leHQ6Tm9kZTxFPjtcclxuICAgIGNvbnN0cnVjdG9yKGl0ZW06RSwgbmV4dDpOb2RlPEU+KXtcclxuICAgICAgICB0aGlzLml0ZW0gPSBpdGVtO1xyXG4gICAgICAgIHRoaXMubmV4dCA9IG5leHQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBMaW5rTGlzdDxFPntcclxuICAgIHByaXZhdGUgX2hlYWQ6Tm9kZTxFPjtcclxuICAgIHByaXZhdGUgX3RhaWw6Tm9kZTxFPjtcclxuICAgIHByaXZhdGUgX2xlbmd0aDpudW1iZXIgPSAwO1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLl9oZWFkID0gbmV3IE5vZGU8RT4obnVsbCwgbnVsbCk7XHJcbiAgICAgICAgdGhpcy5fdGFpbCA9IG5ldyBOb2RlPEU+KG51bGwsIG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Z+656GA5bGe5oCnXHJcbiAgICBwdWJsaWMgZ2V0IGxlbmd0aCgpOm51bWJlcntcclxuICAgICAgICAvLyBsZXQgcmVzdWx0Om51bWJlciA9IDA7XHJcbiAgICAgICAgLy8gbGV0IGN1cnJlbnQ6Tm9kZTxFPiA9IHRoaXMuX2hlYWQ7XHJcbiAgICAgICAgLy8gd2hpbGUgKGN1cnJlbnQubmV4dCAhPT0gbnVsbCkge1xyXG4gICAgICAgIC8vICAgICByZXN1bHQgKz0gMTtcclxuICAgICAgICAvLyAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaXNFbXB0eSgpOmJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hlYWQubmV4dCA9PT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvL+WinuWIoOaUueafpVxyXG4gICAgLy/lop5cclxuICAgIHB1YmxpYyBwdXNoKGl0ZW06RSk6dm9pZHtcclxuICAgICAgICBsZXQgbGFzdDpOb2RlPEU+ID0gbmV3IE5vZGU8RT4oaXRlbSwgbnVsbCk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbXB0eSkge1xyXG4gICAgICAgICAgICB0aGlzLl9oZWFkLm5leHQgPSBsYXN0O1xyXG4gICAgICAgICAgICB0aGlzLl90YWlsLm5leHQgPSBsYXN0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RhaWwubmV4dC5uZXh0ID0gbGFzdDtcclxuICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0ID0gbGFzdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbGVuZ3RoICs9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVuc2hpZnQoaXRlbTpFKTp2b2lke1xyXG4gICAgICAgIGxldCBmaXJzdDpOb2RlPEU+ID0gbmV3IE5vZGU8RT4oaXRlbSwgbnVsbCk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbXB0eSkge1xyXG4gICAgICAgICAgICB0aGlzLl90YWlsLm5leHQgPSBmaXJzdDtcclxuICAgICAgICAgICAgdGhpcy5faGVhZC5uZXh0ID0gZmlyc3Q7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZmlyc3QubmV4dCA9IHRoaXMuX2hlYWQubmV4dDtcclxuICAgICAgICAgICAgdGhpcy5faGVhZC5uZXh0ID0gZmlyc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2xlbmd0aCArPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbnNlcnQoaW5kZXg6bnVtYmVyLCBpdGVtOkUpOmJvb2xlYW57XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+IHRoaXMuX2xlbmd0aCkgey8v6L+Z5Y+l5LiN5LiA5qC3XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpbmRleCA9PT0gdGhpcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjdXJyZW50Ok5vZGU8RT4gPSB0aGlzLl9oZWFkOy8v6L+Z5Y+l5ZKM5YW25LuW6YGN5Y6G5piv5LiN5LiA5qC355qE77yM5Zug5Li66KaB6YCJ5Y+W5Yiw6YCJ5a6a5L2N572u55qE5YmN6Z2i5LiA5qC8XHJcbiAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBpbmRleDsgbiArPSAxKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjdXJyZW50Lm5leHQgPSBuZXcgTm9kZTxFPihpdGVtLCBjdXJyZW50Lm5leHQpO1xyXG4gICAgICAgIHRoaXMuX2xlbmd0aCArPSAxO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIoFxyXG4gICAgcHVibGljIHJlbW92ZShpbmRleDpudW1iZXIpOkV7XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjdXJyZW50Ok5vZGU8RT4gPSB0aGlzLl9oZWFkLm5leHQ7XHJcbiAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBpbmRleDsgbiArPSAxKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaXRlbTpFID0gY3VycmVudC5pdGVtO1xyXG4gICAgICAgIGN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2xlbmd0aCAtPSAxO1xyXG5cclxuICAgICAgICByZXR1cm4gY3VycmVudC5pdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaGlmdCgpOkV7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbXB0eSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBpdGVtID0gdGhpcy5faGVhZC5uZXh0Lml0ZW07XHJcbiAgICAgICAgdGhpcy5faGVhZC5uZXh0ID0gdGhpcy5faGVhZC5uZXh0Lm5leHQ7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzRW1wdHkpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0ID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2xlbmd0aCAtPSAxO1xyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pS5XHJcbiAgICBwdWJsaWMgd3JpdGUoaW5kZXg6bnVtYmVyLCBpdGVtOkUpOnZvaWR7XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY3VycmVudDpOb2RlPEU+ID0gdGhpcy5faGVhZC5uZXh0O1xyXG4gICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgaW5kZXg7IG4gKz0gMSkge1xyXG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3VycmVudC5pdGVtID0gaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICAvL+afpVxyXG4gICAgcHVibGljIHJlYWQoaW5kZXg6bnVtYmVyKTpFe1xyXG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGN1cnJlbnQ6Tm9kZTxFPiA9IHRoaXMuX2hlYWQubmV4dDtcclxuICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IGluZGV4OyBuICs9IDEpIHtcclxuICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjdXJyZW50Lml0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlYXJjaChpdGVtOkUpOm51bWJlcltde1xyXG4gICAgICAgIGxldCByZXN1bHQ6bnVtYmVyW10gPSBbXTtcclxuICAgICAgICB0aGlzLmZvcmVhY2goKGVsZTpFLCBpbmRleDpudW1iZXIpPT57XHJcbiAgICAgICAgICAgIGlmIChlbGUgPT09IGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3pk77ooajkuK3mmK/lkKblrZjlnKjmn5DkuIDlhYPntKBcclxuICAgICAqIEBwYXJhbSBpdGVtIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaGFzKGl0ZW06IEUpOmJvb2xlYW57XHJcblxyXG4gICAgICAgIGxldCBjdXJyZW50ID0gdGhpcy5faGVhZC5uZXh0O1xyXG4gICAgICAgIHdoaWxlIChjdXJyZW50ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnQuaXRlbSA9PSBpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6auY6Zi25Ye95pWwXHJcbiAgICBwdWJsaWMgZm9yZWFjaChmOihlbGU6RSwgaW5kZXg6bnVtYmVyLCBsaXN0OkxpbmtMaXN0PEU+KT0+dm9pZCk6dm9pZHtcclxuICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMuX2hlYWQubmV4dDtcclxuICAgICAgICBsZXQgbnVtOm51bWJlciA9IDA7XHJcbiAgICAgICAgd2hpbGUgKGN1cnJlbnQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgZihjdXJyZW50Lml0ZW0sIG51bSwgdGhpcyk7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbiAgICAgICAgICAgIG51bSArPSAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOivt+aaguaXtuS4jeimgeS9v+eUqOi/meS4quWHveaVsO+8jOWboOS4uuaIkeS5n+S4jeefpemBk+Wug+S8muS4jeS8mueIhueCuFxyXG4gICAgICog6Zmk6Z2e5L2g6K+76L+H6L+Z5Liq5Ye95pWw55qE5rqQ5Luj56CBXHJcbiAgICAgKiBAcGFyYW0gZiDliKTmlq3lhYPntKDkvJjlhYjnuqfnmoTlm57osIPlh73mlbBcclxuICAgICAqIEBwYXJhbSBpbmNyZWFzZSDmmK/lkKbljYfluo/vvIzpu5jorqTljYfluo9cclxuICAgICAqIEByZXR1cm5zIOi/lOWbnuS4gOS4quaOkuW6j+eahOmTvuihqFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc29ydGJ5KGY6KGVsZTpFKT0+bnVtYmVyLCBpbmNyZWFzZTpib29sZWFuID0gdHJ1ZSk6TGlua0xpc3Q8RT57XHJcbiAgICAgICAgbGV0IHByaW9yaXR5OkxpbmtMaXN0PG51bWJlcj4gPSBuZXcgTGlua0xpc3Q8bnVtYmVyPigpO1xyXG4gICAgICAgIGxldCBzb3J0ZWQ6TGlua0xpc3Q8RT4gPSBuZXcgTGlua0xpc3Q8RT4oKTtcclxuICAgICAgICBwcmlvcml0eS5wdXNoKC0wKTtcclxuICAgICAgICBzb3J0ZWQucHVzaChudWxsKTtcclxuXHJcbiAgICAgICAgbGV0IGNvbXBhcmU6KGE6bnVtYmVyLGI6bnVtYmVyKT0+Ym9vbGVhbiA9IGluY3JlYXNlPyhhLGIpPT57cmV0dXJuIGEgPCBiO306KGEsYik9PntyZXR1cm4gYSA+IGJ9O1xyXG5cclxuICAgICAgICB0aGlzLmZvcmVhY2goKGVsZSk9PntcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRQcmkgPSBmKGVsZSk7XHJcbiAgICAgICAgICAgIGxldCBub2RlOk5vZGU8RT4gPSBzb3J0ZWQuX2hlYWQubmV4dDtcclxuICAgICAgICAgICAgbGV0IHByaU5vZGU6Tm9kZTxudW1iZXI+ID0gcHJpb3JpdHkuX2hlYWQubmV4dDtcclxuXHJcbiAgICAgICAgICAgIGxldCBmb3VuZFBsYWNlOmJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgd2hpbGUgKG5vZGUubmV4dCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgKGN1cnJlbnRQcmkgPCBwcmlOb2RlLm5leHQuaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBhcmUoY3VycmVudFByaSwgcHJpTm9kZS5uZXh0Lml0ZW0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5uZXh0ID0gbmV3IE5vZGU8RT4oZWxlLCBub2RlLm5leHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHByaU5vZGUubmV4dCA9IG5ldyBOb2RlPG51bWJlcj4oY3VycmVudFByaSwgcHJpTm9kZS5uZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICBmb3VuZFBsYWNlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5uZXh0O1xyXG4gICAgICAgICAgICAgICAgcHJpTm9kZSA9IHByaU5vZGUubmV4dDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFmb3VuZFBsYWNlKSB7XHJcbiAgICAgICAgICAgICAgICBzb3J0ZWQucHVzaChlbGUpO1xyXG4gICAgICAgICAgICAgICAgcHJpb3JpdHkucHVzaChjdXJyZW50UHJpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzb3J0ZWQuc2hpZnQoKTtcclxuICAgICAgICByZXR1cm4gc29ydGVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHB1YmxpYyBiYlNvcnRCeShmOihlbGU6RSk9Pm51bWJlciwgaW5jcmVhc2U6Ym9vbGVhbiA9IHRydWUpOkxpbmtMaXN0PEU+e1xyXG5cclxuICAgIC8vIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQQXJyYXk8RT57XHJcbiAgICBwdWJsaWMgYXJyOkVbXTtcclxuICAgIHB1YmxpYyBwb2ludGVyOm51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2U6RVtdID0gW10sIGluaXRQb2ludDpudW1iZXIgPSAtMSl7XHJcbiAgICAgICAgdGhpcy5hcnIgPSBzb3VyY2U7XHJcbiAgICAgICAgdGhpcy5wb2ludGVyID0gaW5pdFBvaW50O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWFkKCk6RXtcclxuICAgICAgICByZXR1cm4gdGhpcy5hcnJbdGhpcy5wb2ludGVyXTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIHN0ZXAoKTp2b2lke1xyXG4gICAgICAgIHRoaXMucG9pbnRlciArPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgb3V0KCk6Ym9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5wb2ludGVyIDwgMCB8fCB0aGlzLnBvaW50ZXIgPj0gdGhpcy5hcnIubGVuZ3RoO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBBcnJheUFsZ297XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDovpPlhaXnmoTkuKTkuKrmlbDnu4TnmoTmr4/kuKppbmRleOWvueW6lOWFg+e0oOaYr+WQpuebuOetiVxyXG4gICAgICogQHBhcmFtIGFycjAgXHJcbiAgICAgKiBAcGFyYW0gYXJyMSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzdHJpY3RDb21wYXJlKGFycjA6Q29tcGFyYWJsZVtdLCBhcnIxOkNvbXBhcmFibGVbXSk6Ym9vbGVhbntcclxuICAgICAgICBpZiAoYXJyMC5sZW5ndGggIT09IGFycjEubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIwLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgIGlmICghYXJyMFtpXS5lcXVhbHMoYXJyMVtpXSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57kuIDkuKrpm4blkIhj77yM5LiU5L2/5b6X5a6D5YW35pyJ5aaC5LiL5oCn6LSo77yaXHJcbiAgICAgKiDlr7nkuo7mr4/kuKrlrZjlnKjkuo7pm4blkIhh5Lit55qE5YWD57Sg77yM5aaC5p6c5a6D5LiN5Zyo6ZuG5ZCIYuS4re+8jOWImeWug+WcqOmbhuWQiGPkuK1cclxuICAgICAqIOWNs2M9YS1iXHJcbiAgICAgKiBAcGFyYW0gYSBcclxuICAgICAqIEBwYXJhbSBiIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGZpbmRDb21wbGVtZW50U2V0KGE6Q29tcGFyYWJsZVtdLCBiOkNvbXBhcmFibGVbXSk6Q29tcGFyYWJsZVtde1xyXG4gICAgICAgIGxldCByZXN1bHQ6Q29tcGFyYWJsZVtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgZWxlIG9mIGEpIHtcclxuICAgICAgICAgICAgaWYgKEFycmF5QWxnby5maW5kRWxlKGVsZSwgYikgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChlbGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvL+axguebuOWvueihpembhmEtYlxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBmaW5kSW50ZXJzZWN0aW9uU2V0KGE6Q29tcGFyYWJsZVtdLCBiOkNvbXBhcmFibGVbXSl7XHJcbiAgICAgICAgLy/msYLkuqTpm4Zh4oipYlxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5rGCZWxl5ZyoYXJy5Lit55qEaW5kZXjvvIzoi6XmnKrmib7liLDliJnov5Tlm54tMVxyXG4gICAgICogZWxl5b+F6aG75a6e546wY29tcGFyYWJsZeaOpeWPo1xyXG4gICAgICogQHBhcmFtIGVsZSBcclxuICAgICAqIEBwYXJhbSBhcnIgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZmluZEVsZShlbGU6Q29tcGFyYWJsZSwgYXJyOkNvbXBhcmFibGVbXSk6bnVtYmVye1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgIGlmIChlbGUuZXF1YWxzKGFycltpXSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS7jmFycuS4reenu+mZpGVsZVxyXG4gICAgICog5aaC5p6cZWxl5LiN5a2Y5Zyo5YiZ5LuA5LmI6YO95LiN5YGaXHJcbiAgICAgKiBAcGFyYW0gZWxlIFxyXG4gICAgICogQHBhcmFtIGFyciBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByZW1vdmVFbGUoZWxlOmFueSwgYXJyOmFueVtdKTphbnlbXXtcclxuICAgICAgICBjb25zdCBpID0gYXJyLmluZGV4T2YoZWxlKTtcclxuICAgICAgICBpZiAoaSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgYXJyLnNwbGljZShpLDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG4vLyBleHBvcnQgY2xhc3MgQm94IGV4dGVuZHMgTGF5YS5SZWN0YW5nbGV7XHJcblxyXG4vLyAgICAgcHVibGljIHVuaXRYOm51bWJlcjtcclxuLy8gICAgIHB1YmxpYyB1bml0WTpudW1iZXI7XHJcbiAgICBcclxuXHJcbi8vICAgICBjb25zdHJ1Y3Rvcigpe1xyXG4vLyAgICAgICAgIHN1cGVyKDAsMCwwLDApO1xyXG4vLyAgICAgfVxyXG4gICBcclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOWwseaYr+KApuKApuadpeS4gOe7hO+8iDEwMOS4qu+8iemaj+acuueahOeisOaSnueusVxyXG4vLyAgICAgICogQHBhcmFtIHhSYW5nZSBcclxuLy8gICAgICAqIEBwYXJhbSB5UmFuZ2UgXHJcbi8vICAgICAgKiBAcGFyYW0gd2lkUmFuZ2UgXHJcbi8vICAgICAgKiBAcGFyYW0gaGlnUmFuZ2VcclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHVibGljIHN0YXRpYyByYW5kb21Cb3hlcyh4UmFuZ2U6bnVtYmVyID0gMTIwMCwgeVJhbmdlOm51bWJlciA9IDgwMCwgd2lkUmFuZ2U6bnVtYmVyID0gMzAwLCBoaWdSYW5nZTpudW1iZXIgPSAzMDApOkJveFtde1xyXG4vLyAgICAgICAgIGNvbnN0IHJhZDpGdW5jdGlvbiA9IE15TWF0aC5yYW5kb21JbnQ7XHJcbi8vICAgICAgICAgbGV0IHJlc3VsdDpCb3hbXSA9IFtdO1xyXG4vLyAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCA1MDsgaSArPSAxKSB7XHJcbi8vICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBCb3goKSk7XHJcbi8vICAgICAgICAgICAgIHJlc3VsdFtpXS5wb3MocmFkKHhSYW5nZSksIHJhZCh5UmFuZ2UpKS5zaXplKHJhZCh3aWRSYW5nZSksIHJhZChoaWdSYW5nZSkpO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIHB1YmxpYyBwb3MoeDpudW1iZXIsIHk6bnVtYmVyKTpCb3h7XHJcbi8vICAgICAgICAgdGhpcy54ID0geDtcclxuLy8gICAgICAgICB0aGlzLnkgPSB5O1xyXG4vLyAgICAgICAgIHJldHVybiB0aGlzO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIHB1YmxpYyBzaXplKHdpZHRoOm51bWJlciwgaGVpZ2h0Om51bWJlcik6Qm94e1xyXG4vLyAgICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuLy8gICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuLy8gICAgICAgICByZXR1cm4gdGhpcztcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBwdWJsaWMgaW50ZXJzZWN0c19YKHJlYzpCb3gpOmJvb2xlYW57XHJcbi8vICAgICAgICAgaWYgKHRoaXMueCA8IHJlYy54KSB7XHJcbi8vICAgICAgICAgICAgIHJldHVybiByZWMuaW50ZXJzZWN0c19YKHRoaXMpO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICByZXR1cm4gICh0aGlzLnggPj0gcmVjLnggJiYgdGhpcy54IDw9IHJlYy5yaWdodCkgfHxcclxuLy8gICAgICAgICAgICAgICAgICh0aGlzLnJpZ2h0ID49IHJlYy54ICYmIHRoaXMucmlnaHQgPD0gcmVjLnJpZ2h0KVxyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIHB1YmxpYyBpbnRlcnNlY3RzX1kocmVjOkJveCk6Ym9vbGVhbntcclxuLy8gICAgICAgICBpZiAodGhpcy55PHJlYy55KSB7XHJcbi8vICAgICAgICAgICAgIHJldHVybiByZWMuaW50ZXJzZWN0c19ZKHRoaXMpO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICByZXR1cm4gICh0aGlzLnkgPj0gcmVjLnkgJiYgdGhpcy55IDw9IHJlYy5ib3R0b20pIHx8XHJcbi8vICAgICAgICAgICAgICAgICAodGhpcy5ib3R0b20gPj0gcmVjLnkgJiYgdGhpcy5ib3R0b20gPD0gcmVjLmJvdHRvbSlcclxuLy8gICAgIH1cclxuLy8gfVxyXG4gICAgXHJcbi8vIGNsYXNzIE1hcE5vZGU8SyxWPntcclxuLy8gICAgIHB1YmxpYyBrZXk7XHJcbi8vICAgICBwdWJsaWMgdmFsdWU7XHJcbi8vICAgICBjb25zdHJ1Y3RvcihrZXk6SywgdmFsdWU6Vil7XHJcbi8vICAgICAgICAgdGhpcy5rZXkgPSBrZXk7XHJcbi8vICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4vLyAgICAgfVxyXG4vLyB9XHJcblxyXG4vLyBleHBvcnQgbW9kdWxlIFN0cnVje1xyXG4vLyAgICAgZXhwb3J0IGNsYXNzIExpbmtMaXN0PEU+e1xyXG4vLyAgICAgICAgIHByaXZhdGUgX2hlYWQ6Tm9kZTxFPjtcclxuLy8gICAgICAgICBwcml2YXRlIF90YWlsOk5vZGU8RT47XHJcbi8vICAgICAgICAgY29uc3RydWN0b3IoKXtcclxuLy8gICAgICAgICAgICAgdGhpcy5faGVhZCA9IG5ldyBOb2RlPEU+KG51bGwsIG51bGwpO1xyXG4vLyAgICAgICAgICAgICB0aGlzLl90YWlsID0gbmV3IE5vZGU8RT4obnVsbCwgbnVsbCk7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvL+WfuuehgOWxnuaAp1xyXG4vLyAgICAgICAgIHB1YmxpYyBnZXQgbGVuZ3RoKCk6bnVtYmVye1xyXG4vLyAgICAgICAgICAgICBsZXQgcmVzdWx0Om51bWJlciA9IDA7XHJcbi8vICAgICAgICAgICAgIGxldCBjdXJyZW50Ok5vZGU8RT4gPSB0aGlzLl9oZWFkO1xyXG4vLyAgICAgICAgICAgICB3aGlsZSAoY3VycmVudC5uZXh0ICE9PSBudWxsKSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXN1bHQgKz0gMTtcclxuLy8gICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIHB1YmxpYyBnZXQgaXNFbXB0eSgpOmJvb2xlYW57XHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLl9oZWFkLm5leHQgPT09IG51bGw7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvL+WinuWIoOaUueafpVxyXG4vLyAgICAgICAgIC8v5aKeXHJcbi8vICAgICAgICAgcHVibGljIHB1c2goaXRlbTpFKTp2b2lke1xyXG4vLyAgICAgICAgICAgICBsZXQgbGFzdDpOb2RlPEU+ID0gbmV3IE5vZGU8RT4oaXRlbSwgbnVsbCk7XHJcbi8vICAgICAgICAgICAgIGlmICh0aGlzLmlzRW1wdHkpIHtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuX2hlYWQubmV4dCA9IGxhc3Q7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLl90YWlsLm5leHQgPSBsYXN0O1xyXG4vLyAgICAgICAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0Lm5leHQgPSBsYXN0O1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0ID0gbGFzdDtcclxuLy8gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIHB1YmxpYyB1bnNoaWZ0KGl0ZW06RSk6dm9pZHtcclxuLy8gICAgICAgICAgICAgbGV0IGZpcnN0Ok5vZGU8RT4gPSBuZXcgTm9kZTxFPihpdGVtLCBudWxsKTtcclxuLy8gICAgICAgICAgICAgaWYgKHRoaXMuaXNFbXB0eSkge1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0ID0gZmlyc3Q7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLl9oZWFkLm5leHQgPSBmaXJzdDtcclxuLy8gICAgICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgIGZpcnN0Lm5leHQgPSB0aGlzLl9oZWFkLm5leHQubmV4dDtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuX2hlYWQubmV4dCA9IGZpcnN0O1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBwdWJsaWMgaW5zZXJ0KGluZGV4Om51bWJlciwgaXRlbTpFKTpib29sZWFue1xyXG4vLyAgICAgICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID4gdGhpcy5sZW5ndGgpIHsvL+i/meWPpeS4jeS4gOagt1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBpZiAoaW5kZXggPT09IHRoaXMubGVuZ3RoKSB7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLnB1c2goaXRlbSk7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IGN1cnJlbnQ6Tm9kZTxFPiA9IHRoaXMuX2hlYWQ7Ly/ov5nlj6Xlkozlhbbku5bpgY3ljobmmK/kuI3kuIDmoLfnmoTvvIzlm6DkuLropoHpgInlj5bliLDpgInlrprkvY3nva7nmoTliY3pnaLkuIDmoLxcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBpbmRleDsgbiArPSAxKSB7XHJcbi8vICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBjdXJyZW50Lm5leHQgPSBuZXcgTm9kZTxFPihpdGVtLCBjdXJyZW50Lm5leHQpO1xyXG5cclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvL+WIoFxyXG4vLyAgICAgICAgIHB1YmxpYyByZW1vdmUoaW5kZXg6bnVtYmVyKTpFe1xyXG4vLyAgICAgICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMubGVuZ3RoKSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IGN1cnJlbnQ6Tm9kZTxFPiA9IHRoaXMuX2hlYWQubmV4dDtcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBpbmRleDsgbiArPSAxKSB7XHJcbi8vICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgaXRlbTpFID0gY3VycmVudC5pdGVtO1xyXG4vLyAgICAgICAgICAgICBjdXJyZW50ID0gbnVsbDtcclxuXHJcbi8vICAgICAgICAgICAgIHJldHVybiBjdXJyZW50Lml0ZW07XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBwdWJsaWMgc2hpZnQoKTpFe1xyXG4vLyAgICAgICAgICAgICBpZiAodGhpcy5pc0VtcHR5KSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLl9oZWFkLm5leHQuaXRlbTtcclxuLy8gICAgICAgICAgICAgdGhpcy5faGVhZC5uZXh0ID0gdGhpcy5faGVhZC5uZXh0Lm5leHQ7XHJcbi8vICAgICAgICAgICAgIGlmICh0aGlzLmlzRW1wdHkpIHtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuX3RhaWwubmV4dCA9IG51bGw7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvL+aUuVxyXG4vLyAgICAgICAgIHB1YmxpYyB3cml0ZShpbmRleDpudW1iZXIsIGl0ZW06RSk6dm9pZHtcclxuLy8gICAgICAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLmxlbmd0aCkge1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgY3VycmVudDpOb2RlPEU+ID0gdGhpcy5faGVhZC5uZXh0O1xyXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IGluZGV4OyBuICs9IDEpIHtcclxuLy8gICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIGN1cnJlbnQuaXRlbSA9IGl0ZW07XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvL+afpVxyXG4vLyAgICAgICAgIHB1YmxpYyByZWFkKGluZGV4Om51bWJlcik6RXtcclxuLy8gICAgICAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLmxlbmd0aCkge1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgY3VycmVudDpOb2RlPEU+ID0gdGhpcy5faGVhZC5uZXh0O1xyXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IGluZGV4OyBuICs9IDEpIHtcclxuLy8gICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIHJldHVybiBjdXJyZW50Lml0ZW07XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBwdWJsaWMgc2VhcmNoKGl0ZW06RSk6bnVtYmVyW117XHJcbi8vICAgICAgICAgICAgIGxldCByZXN1bHQ6bnVtYmVyW10gPSBbXTtcclxuLy8gICAgICAgICAgICAgdGhpcy5mb3JlYWNoKChlbGU6RSwgaW5kZXg6bnVtYmVyKT0+e1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKGVsZSA9PT0gaXRlbSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGluZGV4KTtcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfSk7XHJcbi8vICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvKipcclxuLy8gICAgICAgICAgKiDliKTmlq3pk77ooajkuK3mmK/lkKblrZjlnKjmn5DkuIDlhYPntKBcclxuLy8gICAgICAgICAgKiBAcGFyYW0gaXRlbSBcclxuLy8gICAgICAgICAgKi9cclxuLy8gICAgICAgICBwdWJsaWMgaGFzKGl0ZW06IEUpOmJvb2xlYW57XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMuX2hlYWQubmV4dDtcclxuLy8gICAgICAgICAgICAgd2hpbGUgKGN1cnJlbnQgIT0gbnVsbCkge1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQuaXRlbSA9PSBpdGVtKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvL+mrmOmYtuWHveaVsFxyXG4vLyAgICAgICAgIHB1YmxpYyBmb3JlYWNoKGY6KGVsZTpFLCBpbmRleDpudW1iZXIsIGxpc3Q6TGlua0xpc3Q8RT4pPT52b2lkKTp2b2lke1xyXG4vLyAgICAgICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMuX2hlYWQubmV4dDtcclxuLy8gICAgICAgICAgICAgbGV0IG51bTpudW1iZXIgPSAwO1xyXG4vLyAgICAgICAgICAgICB3aGlsZSAoY3VycmVudCAhPT0gbnVsbCkge1xyXG4vLyAgICAgICAgICAgICAgICAgZihjdXJyZW50Lml0ZW0sIG51bSwgdGhpcyk7XHJcbi8vICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4vLyAgICAgICAgICAgICAgICAgbnVtICs9IDE7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIC8qKlxyXG4vLyAgICAgICAgICAqIOivt+aaguaXtuS4jeimgeS9v+eUqOi/meS4quWHveaVsO+8jOWboOS4uuaIkeS5n+S4jeefpemBk+Wug+S8muS4jeS8mueIhueCuFxyXG4vLyAgICAgICAgICAqIOmZpOmdnuS9oOivu+i/h+i/meS4quWHveaVsOeahOa6kOS7o+eggVxyXG4vLyAgICAgICAgICAqIEBwYXJhbSBmIOWIpOaWreWFg+e0oOS8mOWFiOe6p+eahOWbnuiwg+WHveaVsFxyXG4vLyAgICAgICAgICAqIEBwYXJhbSBpbmNyZWFzZSDmmK/lkKbljYfluo/vvIzpu5jorqTljYfluo9cclxuLy8gICAgICAgICAgKiBAcmV0dXJucyDov5Tlm57kuIDkuKrmjpLluo/nmoTpk77ooahcclxuLy8gICAgICAgICAgKi9cclxuLy8gICAgICAgICBwdWJsaWMgc29ydGJ5KGY6KGVsZTpFKT0+bnVtYmVyLCBpbmNyZWFzZTpib29sZWFuID0gdHJ1ZSk6TGlua0xpc3Q8RT57XHJcbi8vICAgICAgICAgICAgIGxldCBwcmlvcml0eTpMaW5rTGlzdDxudW1iZXI+ID0gbmV3IExpbmtMaXN0PG51bWJlcj4oKTtcclxuLy8gICAgICAgICAgICAgbGV0IHNvcnRlZDpMaW5rTGlzdDxFPiA9IG5ldyBMaW5rTGlzdDxFPigpO1xyXG4vLyAgICAgICAgICAgICBwcmlvcml0eS5wdXNoKC0wKTtcclxuLy8gICAgICAgICAgICAgc29ydGVkLnB1c2gobnVsbCk7XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgY29tcGFyZTooYTpudW1iZXIsYjpudW1iZXIpPT5ib29sZWFuID0gaW5jcmVhc2U/KGEsYik9PntyZXR1cm4gYSA8IGI7fTooYSxiKT0+e3JldHVybiBhID4gYn07XHJcblxyXG4vLyAgICAgICAgICAgICB0aGlzLmZvcmVhY2goKGVsZSk9PntcclxuLy8gICAgICAgICAgICAgICAgIGxldCBjdXJyZW50UHJpID0gZihlbGUpO1xyXG4vLyAgICAgICAgICAgICAgICAgbGV0IG5vZGU6Tm9kZTxFPiA9IHNvcnRlZC5faGVhZC5uZXh0O1xyXG4vLyAgICAgICAgICAgICAgICAgbGV0IHByaU5vZGU6Tm9kZTxudW1iZXI+ID0gcHJpb3JpdHkuX2hlYWQubmV4dDtcclxuXHJcbi8vICAgICAgICAgICAgICAgICBsZXQgZm91bmRQbGFjZTpib29sZWFuID0gZmFsc2U7XHJcbi8vICAgICAgICAgICAgICAgICB3aGlsZSAobm9kZS5uZXh0ICE9PSBudWxsKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGN1cnJlbnRQcmkgPCBwcmlOb2RlLm5leHQuaXRlbSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIGlmIChjb21wYXJlKGN1cnJlbnRQcmksIHByaU5vZGUubmV4dC5pdGVtKSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLm5leHQgPSBuZXcgTm9kZTxFPihlbGUsIG5vZGUubmV4dCk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHByaU5vZGUubmV4dCA9IG5ldyBOb2RlPG51bWJlcj4oY3VycmVudFByaSwgcHJpTm9kZS5uZXh0KTtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgZm91bmRQbGFjZSA9IHRydWU7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IG5vZGUubmV4dDtcclxuLy8gICAgICAgICAgICAgICAgICAgICBwcmlOb2RlID0gcHJpTm9kZS5uZXh0O1xyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgICAgIGlmICghZm91bmRQbGFjZSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHNvcnRlZC5wdXNoKGVsZSk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcHJpb3JpdHkucHVzaChjdXJyZW50UHJpKTtcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfSk7XHJcblxyXG4vLyAgICAgICAgICAgICBzb3J0ZWQuc2hpZnQoKTtcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHNvcnRlZDtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIC8vIHB1YmxpYyBiYlNvcnRCeShmOihlbGU6RSk9Pm51bWJlciwgaW5jcmVhc2U6Ym9vbGVhbiA9IHRydWUpOkxpbmtMaXN0PEU+e1xyXG5cclxuLy8gICAgICAgICAvLyB9XHJcblxyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIGV4cG9ydCBjbGFzcyBNYXA8SyxWPntcclxuLy8gICAgICAgICBwcml2YXRlIF9saXN0OkFycmF5PE1hcE5vZGU8SyxWPj5cclxuLy8gICAgICAgICBjb25zdHJ1Y3Rvcigpe1xyXG4vLyAgICAgICAgICAgICB0aGlzLl9saXN0ID0gW11cclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcHVibGljIGdldChrZXk6Syk6VntcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgZWxlIG9mIHRoaXMuX2xpc3Qpe1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKGVsZS5rZXkgPT09IGtleSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGUudmFsdWVcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gbnVsbFxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBwdWJsaWMgZ2V0S2V5QnlWYWwodmFsOlYpOkt7XHJcbi8vICAgICAgICAgICAgIGZvciAobGV0IGVsZSBvZiB0aGlzLl9saXN0KSB7XHJcbi8vICAgICAgICAgICAgICAgICBpZiAoZWxlLnZhbHVlID09PSB2YWwpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlLmtleVxyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHJldHVybiBudWxsXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHB1YmxpYyBrZXlFeGlzdChrZXk6Syk6Ym9vbGVhbntcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgZWxlIG9mIHRoaXMuX2xpc3QpIHtcclxuLy8gICAgICAgICAgICAgICAgIGlmIChlbGUua2V5ID09PSBrZXkpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBwdWJsaWMgc2V0KGtleTpLLHZhbHVlOlYpOmJvb2xlYW57XHJcbi8vICAgICAgICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgdGhpcy5fbGlzdC5sZW5ndGg7IG4gKz0gMSkge1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xpc3Rbbl0ua2V5ID09PSBrZXkpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLl9saXN0W25dLnZhbHVlID0gdmFsdWVcclxuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgdGhpcy5fbGlzdC5wdXNoKG5ldyBNYXBOb2RlPEssVj4oa2V5LHZhbHVlKSlcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHB1YmxpYyBiYXRjaFNldChrZXlzOktbXSwgdmFsdWVzOlZbXSk6Ym9vbGVhbntcclxuLy8gICAgICAgICAgICAgaWYgKGtleXMubGVuZ3RoICE9PSB2YWx1ZXMubGVuZ3RoKSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBrZXlzLmxlbmd0aDsgbiArPSAxKSB7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLnNldChrZXlzW25dLCB2YWx1ZXNbbl0pO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG5cclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcHVibGljIHJlbW92ZShrZXk6Syk6Ym9vbGVhbntcclxuLy8gICAgICAgICAgICAgbGV0IGNvdW50Om51bWJlciA9IDA7XHJcbi8vICAgICAgICAgICAgIGZvciAobGV0IGVsZSBvZiB0aGlzLl9saXN0KSB7XHJcbi8vICAgICAgICAgICAgICAgICBpZiAoZWxlLmtleSA9PT0ga2V5KSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGlzdC5zcGxpY2UoY291bnQsMSk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIGNvdW50ICs9IDE7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHB1YmxpYyBnZXQgbGVuZ3RoKCk6bnVtYmVye1xyXG4vLyAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdC5sZW5ndGhcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcHVibGljIGZvcmVhY2goZjooazpLLCB2OlYpPT52b2lkKTp2b2lke1xyXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBlbGUgb2YgdGhpcy5fbGlzdCkge1xyXG4vLyAgICAgICAgICAgICAgICAgZihlbGUua2V5LCBlbGUudmFsdWUpO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHJldHVybjtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcHVibGljIGZpbHRlcihmOihrOkssdjpWKT0+Ym9vbGVhbik6TWFwPEssVj57XHJcbi8vICAgICAgICAgICAgIGxldCByZXN1bHQgPSBuZXcgTWFwPEssVj4oKTtcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgZWxlIG9mIHRoaXMuX2xpc3QpIHtcclxuLy8gICAgICAgICAgICAgICAgIGlmIChmKGVsZS5rZXksIGVsZS52YWx1ZSkpe1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zZXQoZWxlLmtleSwgZWxlLnZhbHVlKTtcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBleHBvcnQgY2xhc3MgUG9pbnRlckxpc3Q8RT57XHJcbi8vICAgICAgICAgcHJpdmF0ZSBfbGlzdDpBcnJheTxFPiA9IFtdO1xyXG4vLyAgICAgICAgIHByaXZhdGUgX3BvaW50ZXI6bnVtYmVyID0gMDtcclxuLy8gICAgICAgICBjb25zdHJ1Y3Rvcihzb3VyY2U6QXJyYXk8RT4gPSBbXSwgaW5pdFBvaW50Om51bWJlciA9IDApe1xyXG4vLyAgICAgICAgICAgICBzb3VyY2UuZm9yRWFjaCgoZWxlKT0+e1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5fbGlzdC5wdXNoKGVsZSk7XHJcbi8vICAgICAgICAgICAgIH0pXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBnZXQgZXhjZWVkaW5nKCk6Ym9vbGVhbntcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BvaW50ZXIgPj0gdGhpcy5fbGlzdC5sZW5ndGggfHwgdGhpcy5fcG9pbnRlciA8IDBcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIC8qXHJcbi8vICAgICAgICAg5Lul5LiL5rOo6YeK5Lit77yM5oqK5pWw57uE55yL5L2c5qiq5ZCR5o6S5YiX55qE5LiA57O75YiX5YWD57SgXHJcbi8vICAgICAgICAgaW5kZXggPSAw55qE5YWD57Sg5Zyo5pyA5bem5L6nXHJcbi8vICAgICAgICAgKi9cclxuXHJcbi8vICAgICAgICAgcmVhZCgpOkV7Ly/mn6XnnIvlvZPliY1wb2ludGVy5omA5oyH55qE5YWD57SgXHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLl9saXN0W3RoaXMuX3BvaW50ZXJdXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBzdGVwKCk6RXsvL3BvaW50ZXLlkJHlj7Pnp7vkuIDmraVcclxuLy8gICAgICAgICAgICAgdGhpcy5fcG9pbnRlcis9MTtcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVhZCgpO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgdG8ocGxhY2U6bnVtYmVyKTpQb2ludGVyTGlzdDxFPnsvL3BvaW50ZXLnp7vliLDmjIflrprkvY3nva5cclxuLy8gICAgICAgICAgICAgdGhpcy5fcG9pbnRlciA9IHBsYWNlXHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBwdXNoKGRhdGE6RSk6UG9pbnRlckxpc3Q8RT57Ly/lnKjmlbDnu4TmnKvlsL7lop7liqDkuIDkuKrlhYPntKBcclxuLy8gICAgICAgICAgICAgdGhpcy5fbGlzdC5wdXNoKGRhdGEpXHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBzZXQoaW5kZXg6bnVtYmVyLGRhdGE6RSk6UG9pbnRlckxpc3Q8RT57Ly/opoblhpnmlbDnu4TnibnlrpppbmRleOS4reeahOWFg+e0oFxyXG4vLyAgICAgICAgICAgICB0aGlzLl9saXN0W2luZGV4XSA9IGRhdGFcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXNcclxuLy8gICAgICAgICB9XHJcbiAgICAgICAgXHJcbi8vICAgICAgICAgbmV4dChzaGlmdDpudW1iZXIgPSAxKTpFe1xyXG4vLyAgICAgICAgICAgICAvL+ivu+WPluS9jeS6juW9k+WJjXBvaW50ZXLmiYDmjIfnmoTlhYPntKDlj7Povrnoi6XlubLmoLznmoTlhYPntKBcclxuLy8gICAgICAgICAgICAgLy9zaGlmdOm7mOiupOS4ujHvvIzljbPlvZPliY1wb2ludGVy5Y+z6L6555u46YK755qE5YWD57SgXHJcbi8vICAgICAgICAgICAgIC8vc2hpZnTkuLrotJ/mlbDml7bojrflj5blt6bkvqfnmoTlhYPntKBcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RbdGhpcy5fcG9pbnRlcitzaGlmdF1cclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIGdldCBsZW5ndGgoKTpudW1iZXJ7Ly/ojrflj5bmlbDnu4Tplb/luqZcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3QubGVuZ3RoXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBnZXQgbGFzdCgpOkV7Ly/ojrflj5bmnIDlkI7kuIDpoblcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RbdGhpcy5fbGlzdC5sZW5ndGgtMV1cclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIGdldCBmaXJzdCgpOkV7Ly/ojrflj5bpppbpoblcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RbMF07XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBnZXQgcG9pbnRlcigpOm51bWJlcnsvL+iOt+WPlnBvaW50ZXJcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BvaW50ZXJcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIGdldCBhdEVuZCgpOmJvb2xlYW57Ly/mn6XnnIvigJxwb2ludGVy5oyH5ZCR5pWw57uE5pyA5Y+z5L6n55qE5YWD57Sg4oCd55qE55yf5YC8XHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wb2ludGVyID09PSB0aGlzLl9saXN0Lmxlbmd0aCAtIDFcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcbi8vIH0iLCIvL1RPRE9cclxuLy/mlL7nva7miJHku6zpobnnm67ph4zoh6rlrprkuYnnmoTpgJrnlKhLRVnlgLzooahcclxuLy/mlL7lnKjlkIzkuIDkuKrmlofku7bph4zmnInliqnkuo7nu5PmnoTmuIXmmbBcclxuLy/lj6bvvJrlpoLmnpzlj6rmnInmn5DnibnlrprmqKHlnZfns7vnu5/ph4zkvb/nlKjnmoRlbnVt5Y+v5Lul5LiN5pS+6L+H5p2lIOebtOaOpeWGmeWcqOaooeWdl+aWh+S7tuS4rVxyXG5cclxuLy/lj4jlj6bvvJog5bu66K6u5Zyo5L2/55SoZW51beeahOaXtuWAmeWKoOS4gOS4quepuuWAvE5vbmXku6XlupTlr7nliKTlrprpl67pophcclxuXHJcbmV4cG9ydCBlbnVtIEFjdG9yVHlwZSB7XHJcbiAgICBOb25lLFxyXG4gICAgT3BlcmF0b3IsXHJcbiAgICBNb25zdGVyLFxyXG4gICAgVG9rZW5cclxuICAgIC8v6L+Z5YW25a6e5piv5a+55bqU55qE5LiN5ZCM55qE5pWw5o2u5qih5p2/XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIENhbXBUeXBlIHtcclxuICAgIE5vbmUsXHJcbiAgICBTZWxmLCAgIC8v5oiR5pa5XHJcbiAgICBFbmVteSAgIC8v5pWM5pa5XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9kTG9nIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogRG9kTG9nO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSW5zdGFuY2UoKTogRG9kTG9nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2UgfHwgKHRoaXMuX2luc3RhbmNlID0gbmV3IHRoaXMoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBkZWJ1Zyhtc2c6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIG1zZyA9IGAke21zZ31gO1xyXG4gICAgICAgIGNvbnNvbGUuZGVidWcobXNnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGluZm8obXNnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBtc2cgPSBgJHttc2d9YDtcclxuICAgICAgICBjb25zb2xlLmluZm8obXNnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHdhcm4obXNnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBtc2cgPSBgJHttc2d9YDtcclxuICAgICAgICBjb25zb2xlLndhcm4obXNnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGVycm9yKG1zZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgbXNnID0gYCR7bXNnfWA7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihtc2cpO1xyXG4gICAgICAgIERvZExvZy5JbnN0YW5jZS5fd3JpdGVUb0ZpbGUobXNnKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF93cml0ZVRvRmlsZShsb2c6IHN0cmluZykge1xyXG4gICAgICAgIC8vVE9ET1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGludGVyZmFjZSBDb21wYXJhYmxle1xyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3kuKTkuKrlhYPntKDmmK/lkKbnm7jnrYlcclxuICAgICAqIOW/hemhu+WPr+mAhlxyXG4gICAgICogQHBhcmFtIGVsZSBcclxuICAgICAqL1xyXG4gICAgZXF1YWxzKGVsZTpDb21wYXJhYmxlKTpib29sZWFuXHJcbn1cclxuICAgIFxyXG5leHBvcnQgY2xhc3MgRG9kTWF0aHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnmEvYueahOaVtOaVsOe7k+aenO+8iOWwj+aVsOmDqOWIhuiIjeWOuylcclxuICAgICAqIGHvvIxi5aaC5p6c5LiN5Zyo5q2j5pW05pWw5Z+f77yM6K+356Gu5L+d6ZiF6K+76L+H5q2k5Ye95pWwXHJcbiAgICAgKiB84oCU4oCU4oCU4oCUfOKAlOKAlOKAlOKAlHzigJTigJTigJTigJR84oCU4oCU4oCU4oCUfOKAlOKAlOKAlOKAlHxcclxuICAgICAqICAgICAtMTwtLS0wPC0tLTE8LS0tXHJcbiAgICAgKiAgICAgIOWPr+S7peeQhuino+S4uuWcqOaVsOi9tOS4iuaKiue7k+aenOWQkeW3puaYoOWwhFxyXG4gICAgICogQHBhcmFtIGEgXHJcbiAgICAgKiBAcGFyYW0gYiBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBpbnREaXZpc2lvbihhOm51bWJlciwgYjpudW1iZXIpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gKGEtYSViKS9iO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Zyo5bmz6Z2i5LiK5rGC5LuO5oyH5a6a5Ye65Y+R54K55Yiw5oyH5a6a57uI54K55L2c5LiA5p2h5oyH5a6a6ZW/5bqm55qE57q/5q6177yM5q2k57q/5q6155qE5Y+m5LiA56uv54K555qE5Z2Q5qCHXHJcbiAgICAgKiDvvIjlpoLmnpzmraTnur/mrrXnmoTplb/luqblpKfkuo7nrYnkuo7lh7rlj5HngrnliLDnu4jngrnnmoTot53nprvvvIzliJnovpPlh7rnu4jngrnnmoTlnZDmoIfvvIlcclxuICAgICAqIEBwYXJhbSBmcm9tIFxyXG4gICAgICogQHBhcmFtIGVuZCBcclxuICAgICAqIEBwYXJhbSBtb3ZlbWVudCBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBtb3ZlVG8oZnJvbTpWZWMyLCBlbmQ6VmVjMiwgbW92ZW1lbnQ6bnVtYmVyKTpWZWMye1xyXG4gICAgICAgIGNvbnN0IHhkaXMgPSBlbmQueCAtIGZyb20ueDtcclxuICAgICAgICBjb25zdCB5ZGlzID0gZW5kLnkgLSBmcm9tLnk7XHJcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoKHhkaXMpKioyICsgKHlkaXMpKioyKTtcclxuICAgICAgICBpZiAobW92ZW1lbnQgPj0gZGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVuZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcmF0aW8gPSBtb3ZlbWVudCAvIGRpc3RhbmNlO1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjMihmcm9tLnggKyB4ZGlzKnJhdGlvLGZyb20ueSArIHlkaXMqcmF0aW8pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTXlNYXRoLm1vdmVUb+WHveaVsOeahOWPpuS4gOS4queJiOacrOOAgui/meS4queJiOacrOS8muebtOaOpeS/ruaUuShmcm9tOlZlYzIp5Lyg5YWl55qE5a+56LGh5pys6Lqr77yM5bm25Yik5pat5pyA57uIZnJvbeS4jmVuZOS4pOS4quWvueixoeaYr+WQpumHjeWQiFxyXG4gICAgICogQHBhcmFtIGZyb20gXHJcbiAgICAgKiBAcGFyYW0gZW5kIFxyXG4gICAgICogQHBhcmFtIG1vdmVtZW50IFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG1vdmVUb1NpZGVFZmZlY3QoZnJvbTpWZWMyLCBlbmQ6VmVjMiwgbW92ZW1lbnQ6bnVtYmVyKTpib29sZWFue1xyXG4gICAgICAgIGNvbnN0IHhkaXMgPSBlbmQueCAtIGZyb20ueDtcclxuICAgICAgICBjb25zdCB5ZGlzID0gZW5kLnkgLSBmcm9tLnk7XHJcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoKHhkaXMpKioyICsgKHlkaXMpKioyKTtcclxuICAgICAgICBpZiAobW92ZW1lbnQgPj0gZGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgZnJvbS54ID0gZW5kLng7XHJcbiAgICAgICAgICAgIGZyb20ueSA9IGVuZC55O1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcmF0aW8gPSBtb3ZlbWVudCAvIGRpc3RhbmNlO1xyXG4gICAgICAgIGZyb20ueCA9IGZyb20ueCArIHhkaXMqcmF0aW87XHJcbiAgICAgICAgZnJvbS55ID0gZnJvbS55ICsgeWRpcypyYXRpbztcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNeU1hdGgubW92ZVRv5Ye95pWw55qE5Y+m5LiA5Liq54mI5pys44CC6L+U5Zue55u057q/6YCf5bqm5ZyoeHnkuKTovbTkuIrnmoTliIbph49cclxuICAgICAqIEBwYXJhbSBmcm9tIFxyXG4gICAgICogQHBhcmFtIGVuZCBcclxuICAgICAqIEBwYXJhbSBtb3ZlbWVudCBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBtb3ZlVG9Db21wb25lbnQoZnJvbTpWZWMyLCBlbmQ6VmVjMiwgbW92ZW1lbnQ6bnVtYmVyKTpWZWMye1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IHhkaXMgPSBlbmQueCAtIGZyb20ueDtcclxuICAgICAgICBjb25zdCB5ZGlzID0gZW5kLnkgLSBmcm9tLnk7XHJcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoKHhkaXMpKioyICsgKHlkaXMpKioyKTtcclxuICAgICAgICBjb25zdCByYXRpbyA9IG1vdmVtZW50IC8gZGlzdGFuY2U7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMyKHhkaXMqcmF0aW8sIHlkaXMqcmF0aW8pO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBWZWMyIGltcGxlbWVudHMgQ29tcGFyYWJsZXtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGxpc3RGcm9tTGlzdChsaXN0Om51bWJlcltdW10pOlZlYzJbXXtcclxuICAgICAgICBsZXQgcmVzdWx0OlZlYzJbXSA9IFtdO1xyXG5cclxuICAgICAgICBsaXN0LmZvckVhY2goZWxlPT57XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBWZWMyKGVsZVswXSxlbGVbMV0pKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgeDpudW1iZXI7XHJcbiAgICBwdWJsaWMgeTpudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57ku47mraTngrnliLDmjIflrprngrnnmoTot53nprtcclxuICAgICAqIEBwYXJhbSBlbmQgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXN0YW5jZVRvKGVuZDpWZWMyKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuICgoZW5kLnggLSB0aGlzLngpKioyICsgKGVuZC55IC0gdGhpcy55KSoqMikqKjAuNTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS7pei+k+WFpeWdkOagh+S4uuS4reW/g+i/m+ihjOmhuuaXtumSiDkw5bqm5peL6L2sXHJcbiAgICAgKiDvvIjmnKrlrozmiJDvvIlcclxuICAgICAqIEBwYXJhbSBjZW50cmUgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByb3RhdGVDbG9ja3dpc2UoY2VudHJlOlZlYzIpOlZlYzJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57mraTlkJHph4/nmoTlpI3liLZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNsb25lKCk6VmVjMntcclxuICAgICAgICByZXR1cm4gbmV3IFZlYzIodGhpcy54LCB0aGlzLnkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlcXVhbHMoZWxlOlZlYzIpOmJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueCA9PT0gZWxlLnggJiYgdGhpcy55ID09PSBlbGUueTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4PzpudW1iZXIsIHk/Om51bWJlcikge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiIsIi8vYXV0aG9yIE5hMkN1QzRPOFxyXG5cclxuXHJcbmltcG9ydCBDdXN0b21pemVkU3ByaXRlIGZyb20gXCIuL2N1c3RvbWl6ZWRTcHJcIjtcclxuaW1wb3J0IHsgVmVjMiB9IGZyb20gXCIuLi8uLi9Eb2RNYXRoXCI7XHJcbmltcG9ydCB7IEV2ZW50Q2VudHJlIH0gZnJvbSBcIi4uLy4uLy4uL0V2ZW50L0V2ZW50Q2VudHJlXCI7XHJcbmltcG9ydCB7IE15U3ltYm9sIH0gZnJvbSBcIi4uLy4uLy4uL0ZpeC9GaXhTeW1ib2xcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCYXJ7XHJcblxyXG4gICAgcHJpdmF0ZSBfaW5pdFBvczpWZWMyOy8v6LW35aeL5Z2Q5qCHXHJcbiAgICBwcml2YXRlIF9pbml0U2l6ZTpWZWMyOy8v6LW35aeL5aSn5bCPXHJcbiAgICBwcml2YXRlIF9wb3M6VmVjMjsvL+e8qeaUvuWQjuWdkOagh1xyXG4gICAgcHJpdmF0ZSBfc2l6ZTpWZWMyOy8v57yp5pS+5ZCO5aSn5bCPXHJcbiAgICBwcml2YXRlIF9zY2FsZTpudW1iZXIgPSAxOy8v5YWo5bGA57yp5pS+5q+UXHJcbiAgICBwcml2YXRlIF9zeW1iTnVtOm51bWJlcjsvL+i/m+W6puadoee8luWPt1xyXG4gICAgcHJpdmF0ZSBfYmFja1NwcjpDdXN0b21pemVkU3ByaXRlOy8v6L+b5bqm5p2h5bqV5bGC57uY5Zu+6IqC54K5XHJcbiAgICBwcml2YXRlIF9mcm9udFNwcjpDdXN0b21pemVkU3ByaXRlOy8v6L+b5bqm5p2h6aG25bGC57uY5Zu+6IqC54K5XHJcbiAgICBwcml2YXRlIF9wZXJjZW50YWdlOm51bWJlciA9IDE7Ly/ov5vluqZcclxuICAgIHByaXZhdGUgX2hlaWdodDpudW1iZXI7Ly/ov5vluqbmnaHpq5jluqZcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5vluqbmnaHmnoTpgKDlmahcclxuICAgICAqIEBwYXJhbSBzeW1iTnVtIOi/m+W6puadoee8luWPt1xyXG4gICAgICogQHBhcmFtIGJhY2tHcm91bmRDb2xvciDog4zmma/popzoibJcclxuICAgICAqIEBwYXJhbSBzaXplIOWkp+Wwj1xyXG4gICAgICogQHBhcmFtIHBvcyDlnZDmoIdcclxuICAgICAqIEBwYXJhbSBzY2FsZSDlhajlsYDnvKnmlL7mr5RcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioc3ltYk51bTpudW1iZXIsIGJhY2tHcm91bmRDb2xvcjpzdHJpbmcsc2l6ZTpWZWMyICxwb3M6VmVjMiwgc2NhbGU6bnVtYmVyID0gMSl7XHJcbiAgICAgICAgdGhpcy5fc3ltYk51bSA9IHN5bWJOdW07XHJcbiAgICAgICAgdGhpcy5faW5pdFNpemUgPSBzaXplO1xyXG4gICAgICAgIHRoaXMuX3NjYWxlID0gc2NhbGU7XHJcbiAgICAgICAgdGhpcy5fc2l6ZSA9IG5ldyBWZWMyKHRoaXMuX2luaXRTaXplLngqdGhpcy5fcGVyY2VudGFnZSp0aGlzLl9zY2FsZSx0aGlzLl9pbml0U2l6ZS55KnRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9pbml0UG9zID0gcG9zO1xyXG4gICAgICAgIHRoaXMuX3BvcyA9IG5ldyBWZWMyKHRoaXMuX2luaXRQb3MueCp0aGlzLl9zY2FsZSx0aGlzLl9pbml0UG9zLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX2JhY2tTcHIgPSBuZXcgQ3VzdG9taXplZFNwcml0ZSgpO1xyXG4gICAgICAgIHRoaXMuX2JhY2tTcHIuc2V0UGFyYW0odGhpcy5fcG9zLngsdGhpcy5fcG9zLnksdGhpcy5fc2l6ZS54LHRoaXMuX3NpemUueSxiYWNrR3JvdW5kQ29sb3IpO1xyXG4gICAgICAgIHRoaXMuX2JhY2tTcHIuY2hhbmdlQ29sb3IoKTtcclxuICAgICAgICB0aGlzLl9mcm9udFNwciA9IG5ldyBDdXN0b21pemVkU3ByaXRlKCk7XHJcbiAgICAgICAgdGhpcy5fYmFja1Nwci5hZGRDaGlsZCh0aGlzLl9mcm9udFNwcik7XHJcbiAgICAgICAgdGhpcy5fZnJvbnRTcHIuc2V0UGFyYW0oMCwwLHRoaXMuX3NpemUueCx0aGlzLl9zaXplLnksXCIjOGI4YjgzXCIsbmV3IFZlYzIodGhpcy5fc2NhbGUsdGhpcy5fc2NhbGUpKTtcclxuICAgICAgICB0aGlzLl9mcm9udFNwci5jaGFuZ2VDb2xvcigpO1xyXG4gICAgICAgIHRoaXMuX2hlaWdodCA9IHRoaXMuX2luaXRTaXplLnk7XHJcbiAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2Uub24oRXZlbnRDZW50cmUuRVR5cGUuUEVSRk9STUFOQ0VfUkVTQ0FMRSgpLHRoaXMsdGhpcy5yZVNjYWxlKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkv67mlLnnvKnmlL7mr5RcclxuICAgICAqIEBwYXJhbSB2YWx1ZSDlhajlsYDnvKnmlL7mr5RcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZVNjYWxlKHZhbHVlOm51bWJlcik6dm9pZHtcclxuICAgICAgICB0aGlzLl9zY2FsZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuX3BvcyA9IG5ldyBWZWMyKHRoaXMuX2luaXRQb3MueCp0aGlzLl9zY2FsZSwgdGhpcy5faW5pdFBvcy55KnRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9zaXplID0gbmV3IFZlYzIodGhpcy5faW5pdFNpemUueCp0aGlzLl9zY2FsZSwgdGhpcy5faW5pdFNpemUueSp0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fYmFja1Nwci5zZXRQYXJhbSh0aGlzLl9wb3MueCx0aGlzLl9wb3MueSx0aGlzLl9zaXplLngsdGhpcy5fc2l6ZS55KTsvL+iuvue9ruiDjOaZr+e7mOWbvuiKgueCueWPguaVsFxyXG4gICAgICAgIHRoaXMuX2JhY2tTcHIuY2hhbmdlQ29sb3IoKTtcclxuICAgICAgICB0aGlzLl9mcm9udFNwci5zZXRQYXJhbSgwLDAsdGhpcy5fc2l6ZS54KnRoaXMuX3BlcmNlbnRhZ2UsdGhpcy5fc2l6ZS55LFwiIzhiOGI4M1wiLG5ldyBWZWMyKDEqdGhpcy5fc2NhbGUsMSp0aGlzLl9zY2FsZSkpOy8v6K6+572u5YmN56uv57uY5Zu+6IqC54K55Y+C5pWwXHJcbiAgICAgICAgdGhpcy5fZnJvbnRTcHIuY2hhbmdlQ29sb3IoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9rui/m+W6puadoeS7o+WPt1xyXG4gICAgICogQHBhcmFtIHN5bWJOdW0g6L+b5bqm5p2h5Luj5Y+3XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRTeW1iKHN5bWJOdW06bnVtYmVyKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3N5bWJOdW0gPSBzeW1iTnVtO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5L+u5pS56L+b5bqmXHJcbiAgICAgKiBAcGFyYW0gcGVyY2VudGFnZSDnm67moIfov5vluqZcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBwZXJjZW50YWdlKHBlcmNlbnRhZ2U6bnVtYmVyKXtcclxuICAgICAgICBpZihwZXJjZW50YWdlID09PSAwKXtcclxuICAgICAgICAgICAgdGhpcy5fcGVyY2VudGFnZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX2Zyb250U3ByLmdyYXBoaWNzLmNsZWFyKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX3BlcmNlbnRhZ2UgPSBwZXJjZW50YWdlO1xyXG4gICAgICAgICAgICB0aGlzLl9mcm9udFNwci5zZXRQYXJhbSgwLDAsdGhpcy5fc2l6ZS54KnRoaXMuX3BlcmNlbnRhZ2UsdGhpcy5fc2l6ZS55LFwiIzhiOGI4M1wiLG5ldyBWZWMyKDEqdGhpcy5fc2NhbGUsMSp0aGlzLl9zY2FsZSkpO1xyXG4gICAgICAgICAgICB0aGlzLl9mcm9udFNwci5jaGFuZ2VDb2xvcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuacrOi/m+W6puadoeiDjOaZr+e7mOWbvuiKgueCuVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0QmFja1NwcigpOkN1c3RvbWl6ZWRTcHJpdGV7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JhY2tTcHI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57mnKzov5vluqbmnaHpq5jluqZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEhlaWdodCgpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5faGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQnV0dG9ue1xyXG5cclxuICAgIHByaXZhdGUgX2luaXRQb3M6VmVjMjsvL+aMiemSruWIneWni+WdkOagh1xyXG4gICAgcHJpdmF0ZSBfaW5pdFNpemU6VmVjMjsvL+aMiemSruWIneWni+WuvemrmFxyXG4gICAgcHJpdmF0ZSBfcG9zOlZlYzI7Ly/mmL7npLroioLngrnlnZDmoIdcclxuICAgIHByaXZhdGUgX3NpemU6VmVjMjsvL+aYvuekuuiKgueCueWuvemrmFxyXG4gICAgcHJpdmF0ZSBfc3ltYk5hbWU6bnVtYmVyOy8v5oyJ6ZKu57yW5Y+3XHJcbiAgICBwcml2YXRlIF9jb2xvcjpzdHJpbmc7Ly/mjInpkq7popzoibJcclxuICAgIHByaXZhdGUgX2hlaWdodDpudW1iZXI7Ly/mjInpkq7pq5jluqbvvIjpu5jorqTnvKnmlL7mr5TkuLox77yJXHJcbiAgICBwcml2YXRlIF9zcHI6Q3VzdG9taXplZFNwcml0ZTsvL+aMiemSruaYvuekuuiKgueCuVxyXG4gICAgcHJpdmF0ZSBfc2NhbGU6bnVtYmVyOy8v5YWo5bGA57yp5pS+5q+UXHJcbiAgICBwcml2YXRlIF9uYW1lOnN0cmluZzsvL+aMiemSruWQje+8iOaYvuekuuWcqOaMiemSruS4iu+8iVxyXG4gICAgcHJpdmF0ZSBfZnVuOkZ1bmN0aW9uOy8v5oyJ6ZKu5omA5pC65bim55qE5Yqf6IO95Ye95pWwXHJcbiAgICBwcml2YXRlIF9BUlVzeW1iOk15U3ltYm9sOy8v5oyJ6ZKu5omA5ZyoQWN0b3JSVVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5oyJ6ZKu5p6E6YCg5ZmoXHJcbiAgICAgKiBAcGFyYW0gbmFtZSDmjInpkq7lkI1cclxuICAgICAqIEBwYXJhbSBzeW1iTnVtIOaMiemSrue8luWPt1xyXG4gICAgICogQHBhcmFtIHBvcyDotbflp4vlnZDmoIdcclxuICAgICAqIEBwYXJhbSBzaXplIOi1t+Wni+WuvemrmFxyXG4gICAgICogQHBhcmFtIGNvbG9yIOaMiemSruminOiJslxyXG4gICAgICogQHBhcmFtIHNjYWxlIOe8qeaUvuavlFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihBUlVzeW1iOk15U3ltYm9sLCBuYW1lOnN0cmluZyA9IFwiZGVmYXVsdFwiLCBzeW1iTnVtOm51bWJlciwgcG9zOlZlYzIsIHNpemU6VmVjMiwgIGNvbG9yOnN0cmluZyA9IFwiIzAwQjJCRlwiLCBzY2FsZTpudW1iZXIgPSAxKXtcclxuICAgICAgICB0aGlzLl9BUlVzeW1iID0gQVJVc3ltYjtcclxuICAgICAgICB0aGlzLl9zeW1iTmFtZSA9IHN5bWJOdW07XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5faW5pdFBvcyA9IHBvcztcclxuICAgICAgICB0aGlzLl9pbml0U2l6ZSA9IHNpemU7XHJcbiAgICAgICAgdGhpcy5fY29sb3IgPSBjb2xvcjtcclxuICAgICAgICB0aGlzLl9zY2FsZSA9IHNjYWxlO1xyXG4gICAgICAgIHRoaXMuX3BvcyA9IG5ldyBWZWMyKHRoaXMuX2luaXRQb3MueCp0aGlzLl9zY2FsZSx0aGlzLl9pbml0UG9zLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX3NpemUgPSBuZXcgVmVjMih0aGlzLl9pbml0U2l6ZS54KnRoaXMuX3NjYWxlLHRoaXMuX2luaXRTaXplLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX2hlaWdodCA9IHRoaXMuX2luaXRTaXplLnk7XHJcbiAgICAgICAgdGhpcy5fc3ByID0gbmV3IEN1c3RvbWl6ZWRTcHJpdGUoKTtcclxuICAgICAgICB0aGlzLl9zcHIuc2V0UGFyYW0odGhpcy5fcG9zLngsdGhpcy5fcG9zLnksdGhpcy5fc2l6ZS54LHRoaXMuX3NpemUueSx0aGlzLl9jb2xvcik7XHJcbiAgICAgICAgdGhpcy5fc3ByLmNoYW5nZUNvbG9yKCk7XHJcbiAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2Uub24oRXZlbnRDZW50cmUuRVR5cGUuUEVSRk9STUFOQ0VfUkVTQ0FMRSgpLHRoaXMsdGhpcy5yZVNjYWxlKTtcclxuICAgICAgICB0aGlzLnNldFRleHQoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7mjInpkq7lip/og71cclxuICAgICAqIEBwYXJhbSBmdW4g5oyJ6ZKu5Yqf6IO95Ye95pWwXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRGdW5jKGZ1bjpGdW5jdGlvbik6dm9pZHtcclxuICAgICAgICB0aGlzLl9mdW4gPSBmdW47XHJcbiAgICAgICAgdGhpcy5fc3ByLm9uKExheWEuRXZlbnQuTU9VU0VfVVAsdGhpcyx0aGlzLl9mdW4pO1xyXG4gICAgICAgIHRoaXMuX3Nwci5vbihMYXlhLkV2ZW50Lk1PVVNFX09WRVIsdGhpcywoZTogTGF5YS5FdmVudCk9PntcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX3Nwci5vbihMYXlhLkV2ZW50Lk1PVVNFX1VQLHRoaXMsKGU6IExheWEuRXZlbnQpPT57XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57mjInpkq7nu5jlm77oioLngrlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFNwcigpOkN1c3RvbWl6ZWRTcHJpdGV7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NwcjtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57yp5pS+5oyJ6ZKuXHJcbiAgICAgKiBAcGFyYW0gdmFsdWUg5YWo5bGA57yp5pS+5q+UXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZVNjYWxlKHZhbHVlOm51bWJlcik6dm9pZHtcclxuICAgICAgICB0aGlzLl9zY2FsZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuX3BvcyA9IG5ldyBWZWMyKHRoaXMuX2luaXRQb3MueCp0aGlzLl9zY2FsZSx0aGlzLl9pbml0UG9zLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX3NpemUgPSBuZXcgVmVjMih0aGlzLl9pbml0U2l6ZS54KnRoaXMuX3NjYWxlLHRoaXMuX2luaXRTaXplLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX3Nwci5zZXRQYXJhbSh0aGlzLl9wb3MueCx0aGlzLl9wb3MueSx0aGlzLl9zaXplLngsdGhpcy5fc2l6ZS55LHRoaXMuX2NvbG9yKTtcclxuICAgICAgICB0aGlzLl9zcHIuY2hhbmdlQ29sb3IoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa4suafk+aWh+acrFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0VGV4dCgpOnZvaWR7XHJcbiAgICAgICAgbGV0IHRtcFRleDpMYXlhLlRleHQgPSBuZXcgTGF5YS5UZXh0KCk7XHJcbiAgICAgICAgdG1wVGV4LndpZHRoID0gdGhpcy5fc2l6ZS54O1xyXG4gICAgICAgIHRtcFRleC5oZWlnaHQgPSB0aGlzLl9zaXplLnk7XHJcbiAgICAgICAgdG1wVGV4LnggPSAwO1xyXG4gICAgICAgIHRtcFRleC55ID0gMDtcclxuICAgICAgICB0bXBUZXguZm9udFNpemUgPSA5O1xyXG4gICAgICAgIHRtcFRleC50ZXh0ID0gdGhpcy5fbmFtZTtcclxuICAgICAgICB0bXBUZXguYWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgIHRtcFRleC52YWxpZ24gPSBcIm1pZGRsZVwiO1xyXG4gICAgICAgIHRoaXMuX3Nwci5hZGRDaGlsZCh0bXBUZXgpO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dCBleHRlbmRzIExheWEuVGV4dHtcclxuICAgIHByaXZhdGUgX3N3aXRjaDpib29sZWFuID0gdHJ1ZTsvL+aWh+acrOaYvuekuuW8gOWFsyDpu5jorqTlhbPpl61cclxuICAgIHByaXZhdGUgX3NjYWxlOm51bWJlcjsvL+WFqOWxgOe8qeaUvuavlFxyXG4gICAgcHJpdmF0ZSBfc2l6ZTpWZWMyOy8v6LW35aeL5aSn5bCPXHJcbiAgICBwcml2YXRlIF9wb3M6VmVjMiA9IG5ldyBWZWMyKDAsMCk7Ly/otbflp4vlnZDmoIdcclxuICAgIHByaXZhdGUgX215U3RyaW5nOnN0cmluZzsvL+aWh+acrOWGheWuuVxyXG4gICAgcHJpdmF0ZSBfQVJVc3ltYjpNeVN5bWJvbDsvL+aJgOWcqOWPr+inhuiKgueCuVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5paH5pys5p6E6YCg5ZmoXHJcbiAgICAgKiBAcGFyYW0gc2l6ZSDotbflp4vlpKflsI9cclxuICAgICAqIEBwYXJhbSBzY2FsZSDnvKnmlL7mr5RcclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihzaXplOlZlYzIsIHNjYWxlOm51bWJlcil7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9zaXplID0gc2l6ZTtcclxuICAgICAgICB0aGlzLl9zY2FsZSA9IHNjYWxlO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB0aGlzLl9zaXplLngqdGhpcy5fc2NhbGU7Ly/orqHnrpflj6/op4boioLngrnlrr3luqZcclxuICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuX3NpemUueSp0aGlzLl9zY2FsZTsvL+iuoeeul+WPr+inhuiKgueCuemrmOW6plxyXG4gICAgICAgIHRoaXMuZm9udFNpemUgPSAxMCp0aGlzLl9zY2FsZTsvL+iuoeeul+Wtl+S9k+Wkp+Wwj1xyXG4gICAgICAgIHRoaXMuYWxpZ24gPSBcImNlbnRlclwiOy8v6buY6K6k56uW55u05bGF5LitXHJcbiAgICAgICAgdGhpcy52YWxpZ24gPSBcIm1pZGRsZVwiOy8v6buY6K6k5rC05bmz5bGF5LitXHJcbiAgICAgICAgdGhpcy53b3JkV3JhcCA9IHRydWU7Ly/pu5jorqToh6rliqjmjaLooYzlvIDlkK9cclxuICAgICAgICB0aGlzLmNvbG9yID0gXCIjMDAwMDAwXCI7Ly9cclxuICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5vbihFdmVudENlbnRyZS5FVHlwZS5QRVJGT1JNQU5DRV9SRVNDQUxFKCksdGhpcyx0aGlzLnJlU2NhbGUpOy8v55uR5ZCs5YWo5bGA57yp5pS+5q+UXHJcbiAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2Uub24oRXZlbnRDZW50cmUuRVR5cGUuUEVSRk9STUFOQ0VfVEVYVF9TV0lUQ0goKSx0aGlzLHRoaXMuc3dpdGNoKTsvL+ebkeWQrOWFqOWxgOaWh+acrOaYvuekuuW8gOWFs1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruaJgOWcqOaYvuekuuiKgueCuXN5bWJcclxuICAgICAqIEBwYXJhbSBzeW1iIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U3ltYihzeW1iOk15U3ltYm9sKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX0FSVXN5bWIgPSBzeW1iO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5byA5YWz5paH5pys5pi+56S65byA5YWzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzd2l0Y2goKTp2b2lke1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuX3N3aXRjaCA9PT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLl9zd2l0Y2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VUZXh0KFwiXCIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fc3dpdGNoID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkv67mlLnmlofmnKzmmL7npLrlvIDlhbNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFN3aXRjaE9uKCk6dm9pZHtcclxuICAgICAgICBpZih0aGlzLl9zd2l0Y2ggPT09IHRydWUpe1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZVRleHQodGhpcy5fbXlTdHJpbmcpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlhbPpl63mlofmnKzmmL7npLpcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFN3aXRjaE9mZigpOnZvaWR7XHJcbiAgICAgICAgaWYodGhpcy5fc3dpdGNoKXtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VUZXh0KFwiIFwiKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagueaNrue8qeaUvuavlOS/ruaUueWPr+inhuiKgueCueWkp+Wwj1xyXG4gICAgICogQHBhcmFtIHNjYWxlIOWFqOWxgOe8qeaUvuavlFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlU2NhbGUoc2NhbGU6bnVtYmVyKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3NjYWxlID0gc2NhbGU7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuX3NpemUueCp0aGlzLl9zY2FsZTtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuX3NpemUueSp0aGlzLl9zY2FsZTtcclxuICAgICAgICB0aGlzLnggPSB0aGlzLl9wb3MueCp0aGlzLl9zY2FsZTtcclxuICAgICAgICB0aGlzLnkgPSB0aGlzLl9wb3MueSp0aGlzLl9zY2FsZTtcclxuICAgICAgICB0aGlzLmZvbnRTaXplID0gMTAqdGhpcy5fc2NhbGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7mlofmnKxcclxuICAgICAqIEBwYXJhbSB0ZXh0IFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0VGV4dCh0ZXh0OnN0cmluZyk6dm9pZHtcclxuICAgICAgICB0aGlzLl9teVN0cmluZyA9IHRleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkv67mlLnmlofmnKzotbflp4vlnZDmoIfvvIjkuI3lj5flhajlsYDnvKnmlL7mr5TlvbHlk43vvIlcclxuICAgICAqIEBwYXJhbSBwb3Mg6LW35aeL5Z2Q5qCHXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRQb3MocG9zOlZlYzIgPSBuZXcgVmVjMigwLDApKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3BvcyA9IHBvcztcclxuICAgICAgICB0aGlzLnggPSB0aGlzLl9wb3MueCp0aGlzLl9zY2FsZTtcclxuICAgICAgICB0aGlzLnkgPSB0aGlzLl9wb3MueSp0aGlzLl9zY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmYu+atoum8oOagh+S6i+S7tuepv+mAj1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb2ZmU3dpdGNoKCk6dm9pZHtcclxuICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5vZmYoRXZlbnRDZW50cmUuRVR5cGUuUEVSRk9STUFOQ0VfUkVTQ0FMRSgpLHRoaXMsdGhpcy5yZVNjYWxlKTtcclxuICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5vZmYoRXZlbnRDZW50cmUuRVR5cGUuUEVSRk9STUFOQ0VfVEVYVF9TV0lUQ0goKSx0aGlzLHRoaXMuc3dpdGNoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS/ruaUueWtl+S9k+Wkp+Wwj1xyXG4gICAgICogQHBhcmFtIHZhbHVlIOi+k+WFpeWkp+Wwj1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0Rm9udFNpemUodmFsdWU6bnVtYmVyKTp2b2lke1xyXG4gICAgICAgIHRoaXMuZm9udFNpemUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnRleHQgPSB0aGlzLl9teVN0cmluZztcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiIsIi8vYXV0aG9yIE5hMkN1QzRPOFxyXG5cclxuaW1wb3J0IEN1c3RvbWl6ZWRTcHJpdGUgZnJvbSBcIi4vY3VzdG9taXplZFNwclwiO1xyXG5pbXBvcnQgeyBDaGVzc0JvYXJkIH0gZnJvbSBcIi4vVW5zeW1ib2xpemVkUmVuZGVyXCI7XHJcbmltcG9ydCBBY3RvclJVIGZyb20gXCIuL1N5bWJvbGl6ZWRSZW5kZXJcIjtcclxuaW1wb3J0IHsgQWN0b3JCb3ggfSBmcm9tIFwiLi9vYmpib3hcIjtcclxuaW1wb3J0IHsgVmVjMiB9IGZyb20gXCIuLi8uLi9Eb2RNYXRoXCI7XHJcbmltcG9ydCB7IFN5bWJvbGl6ZWQgfSBmcm9tIFwiLi4vLi4vLi4vRml4L0ZpeFN5bWJvbFwiO1xyXG5pbXBvcnQgeyBFdmVudENlbnRyZSB9IGZyb20gXCIuLi8uLi8uLi9FdmVudC9FdmVudENlbnRyZVwiO1xyXG5pbXBvcnQgeyBSZW5kZXJlciB9IGZyb20gXCIuLi8uLi9SZW5kZXJlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGVyZm9ybWFuY2VDZW50cmUgaW1wbGVtZW50cyBSZW5kZXJlcntcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGluc3RhbmNlOlBlcmZvcm1hbmNlQ2VudHJlOy8v5Y2V5L6L77yI6K+35LiN6KaB5omL5Yqo5paw5bu65Y2V5L6L77yJXHJcbiAgICBwdWJsaWMgbWFpblNwcjpDdXN0b21pemVkU3ByaXRlOy8v6buY6K6k57uY5Zu+6IqC54K577yI56aB5q2i5Zyo6K+l6IqC54K55LiK57uY5Zu+77yM5Y+q6IO955So5LqO5re75Yqg5a2Q6IqC54K577yJXHJcbiAgICBwcml2YXRlIGNoZXNzQm9hcmQ6Q2hlc3NCb2FyZDsvL+m7mOiupOaji+ebmFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW5riy5p+T5Li75Zy65pmv77yM5Yid5aeL5YyW5LqL5Lu255uR5ZCs57G7XHJcbiAgICAgKiBAcGFyYW0gc2NlbmUg5ri45oiP5Li75Zy65pmvXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZSAoc2NlbmU6TGF5YS5TcHJpdGUpOnZvaWR7XHJcbiAgICAgICAgUGVyZm9ybWFuY2VDZW50cmUuaW5zdGFuY2UgPSBuZXcgUGVyZm9ybWFuY2VDZW50cmUoKTsvL+WKoOi9vemdmeaAgeexu1xyXG4gICAgICAgIFBlcmZvcm1hbmNlQ2VudHJlLmluc3RhbmNlLm1haW5TcHIgPSBuZXcgQ3VzdG9taXplZFNwcml0ZSgpOy8v5bu656uL5Li757uY5Zu+6IqC54K5XHJcbiAgICAgICAgLy/or6Xnu5jlm77oioLngrnkuI3nlKjkuo7nu5jliLbku7vkvZXlm77lvaLvvIzku4XnlKjkuo7mt7vliqDlrZDoioLngrlcclxuICAgICAgICBzY2VuZS5hZGRDaGlsZChQZXJmb3JtYW5jZUNlbnRyZS5pbnN0YW5jZS5tYWluU3ByKTsvL+WwhuS4u+e7mOWbvuiKgueCuea3u+WKoOS4uuS4u+WcuuaZr+WtkOiKgueCuVxyXG4gICAgICAgIEV2ZW50Q2VudHJlLmluaXQoKTsvL+WIneWni+WMluinguWvn+iAhVxyXG4gICAgICAgIFBlcmZvcm1hbmNlQ2VudHJlLmluaXRpYWxpemUgPSAoKSA9PiB7fTsvL+a4heepuuS4u+WcuuaZr+WIneWni+WMluWHveaVsFxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiTWFpbiBTY2VuZSBJbml0aWFsaXphdGlvbiBDb21wbGV0ZSEhXCIpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa4suafk+aji+ebmFxyXG4gICAgICogQHBhcmFtIGFyciDnlKjkuo7nlJ/miJDmo4vnm5jnmoTkuoznu7TmlbDnu4RcclxuICAgICAqIEBwYXJhbSBwb3NWZWMyIOaji+ebmOi1t+Wni+WdkOagh++8iOS4gOW+i+aMieWFqOWxgOe8qeaUvuavlOS4ujHorqHnrpfvvIzmuLLmn5PlmajkvJrmoLnmja7lhajlsYDnvKnmlL7mr5Toh6rliqjlrozmiJDnvKnmlL7muLLmn5PvvIlcclxuICAgICAqIEBwYXJhbSB1bml0c2l6ZSDljZXkvY3moLzlrZDlrr3pq5jvvIjkuIDlvovmjInlhajlsYDnvKnmlL7mr5TkuLox6K6h566X77yM5riy5p+T5Zmo5Lya5qC55o2u5YWo5bGA57yp5pS+5q+U6Ieq5Yqo5a6M5oiQ57yp5pS+5riy5p+T77yJXHJcbiAgICAgKiBAcGFyYW0gYmFja0dyb3VuZENvbG9yIOaji+ebmOiDjOaZr+minOiJslxyXG4gICAgICogQHBhcmFtIGZyb250Q29sb3Ig5qC85a2Q6aKc6ImyXHJcbiAgICAgKiBAcGFyYW0gZmF0aGVyIOeItue7mOWbvuiKgueCue+8iOm7mOiupOS4uuWFqOWxgOe7mOWbvuiKgueCue+8iVxyXG4gICAgICogQHBhcmFtIHNjYWxlIOe8qeaUvuavlO+8iOm7mOiupOS4ujHvvIlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGluaXRCb2FyZChhcnI6IG51bWJlcltdW10sIHBvc1ZlYzI6IFZlYzIsIHVuaXRzaXplOiBWZWMyLCBiYWNrR3JvdW5kQ29sb3I6IHN0cmluZywgZnJvbnRDb2xvcjogc3RyaW5nLCBzY2FsZTogbnVtYmVyID0gMSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2hlc3NCb2FyZCA9IG5ldyBDaGVzc0JvYXJkKGFycixwb3NWZWMyLHVuaXRzaXplLGJhY2tHcm91bmRDb2xvcixmcm9udENvbG9yLHNjYWxlKTsvL+aWsOW7uuaji+ebmFxyXG4gICAgICAgIFBlcmZvcm1hbmNlQ2VudHJlLmluc3RhbmNlLm1haW5TcHIuYWRkQ2hpbGQodGhpcy5jaGVzc0JvYXJkKTsvL+a3u+WKoOWtkOiKgueCuVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6LCD6IqC5YWo5bGA57yp5pS+5q+U77yM5Y+q6IO95L2c55So5LqO5omA5pyJYWN0b3LmuLLmn5PlrozmiJDlkI7jgIHmiYDmnInnibnmlYjluKflvqrnjq/miafooYzliY3vvIzlkKbliJnmnInpnZ7oh7Tlkb3mgKdidWdcclxuICAgICAqIEBwYXJhbSB2YWx1ZSDlhajlsYDlj6/op4boioLngrnnvKnmlL7mr5RcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlc2NhbGUodmFsdWU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLmV2ZW50KFwiUkVTQ0FMRVwiLFt2YWx1ZV0pOy8v5Y+R5biD6LCD5Y+C5LqL5Lu244CB57yp5pS+5q+U5Y+C5pWwXHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOa4suafk2FjdG9y5a+56LGhXHJcbiAgICAgKiBAcGFyYW0gYm91bmQgYWN0b3JcclxuICAgICAqIEBwYXJhbSBwb3Mg5Z2Q5qCH77yI5LiA5b6L5oyJ5YWo5bGA57yp5pS+5q+U5Li6Meiuoeeul++8jOa4suafk+WZqOS8muagueaNruWFqOWxgOe8qeaUvuavlOiHquWKqOWujOaIkOe8qeaUvua4suafk++8iVxyXG4gICAgICogQHBhcmFtIHNpeiDlrr3pq5jvvIjpu5jorqQxMCwxMO+8ie+8iOS4gOW+i+aMieWFqOWxgOe8qeaUvuavlOS4ujHorqHnrpfvvIzmuLLmn5PlmajkvJrmoLnmja7lhajlsYDnvKnmlL7mr5Toh6rliqjlrozmiJDnvKnmlL7muLLmn5PvvIlcclxuICAgICAqIEBwYXJhbSBmYXRoZXIg54i257uY5Zu+6IqC54K577yI6buY6K6k5Li65qOL55uY57uY5Zu+6IqC54K577yJXHJcbiAgICAgKiBAcGFyYW0gY29sb3Ig6aKc6Imy77yI6buY6K6k5Li657u/77yJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXNwbGF5QWN0b3IoYm91bmQ6IFN5bWJvbGl6ZWQsIHBvczogVmVjMiwgc2l6OlZlYzIgPSBuZXcgVmVjMigxMCwxMCksIGNvbG9yOnN0cmluZyA9IFwiIzAwZmYwMFwiLCBmYXRoZXI6Q3VzdG9taXplZFNwcml0ZSA9IFBlcmZvcm1hbmNlQ2VudHJlLmluc3RhbmNlLmNoZXNzQm9hcmQpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdG1wQWN0b3I6QWN0b3JSVSA9IG5ldyBBY3RvclJVKGJvdW5kLnN5bWJvbCxwb3Msc2l6LGZhdGhlcixjb2xvcik7Ly/muLLmn5NhY3RvclxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoC/kv67mlLnov5vluqbmnaFcclxuICAgICAqIOm7mOiupOi/m+W6puadoemVvzMw77yM5a69Ne+8iOm7mOiupOi/m+W6puadoeWuvemrmOaXoOazlemAmui/h+acrOWHveaVsOS/ruaUue+8jOWmgumcgOS/ruaUueivt+WJjeW+gCAuXFxSaG9kZSBJc2xhbmRcXHNyY1xcUmhvZGVzX0dhbWVcXFBlcmZvcm1hbmNlX01vZHVsZVxcU3ltYm9saXplZFJlbmRlci50c1xcQWN0b3JSVSlcclxuICAgICAqIOi/m+W6puminOiJsuS4uueBsO+8jOWmgumcgOS/ruaUueivt+WJjeW+gCAuXFxSaG9kZSBJc2xhbmRcXHNyY1xcUmhvZGVzX0dhbWVcXFBlcmZvcm1hbmNlX01vZHVsZVxcQWN0b3JDb21wb25lbnQudHNcXEJhclxyXG4gICAgICogQHBhcmFtIGJvdW5kIGFjdG9yXHJcbiAgICAgKiBAcGFyYW0gYmFyX3N5bWJOdW0g56ys5Yeg5qC56L+b5bqm5p2h77yI5aeL5LqOMO+8iSBcclxuICAgICAqIEBwYXJhbSBwZXJjZW50YWdlIOivpei/m+W6puadoei/m+W6plxyXG4gICAgICogQHBhcmFtIGNvbG9yIOivpei/m+W6puadoeiDjOaZr+minOiJslxyXG4gICAgICogQHBhcmFtIHgg6L+b5bqm5p2h6ZW/5bqm77yI5LiA5b6L5oyJ5YWo5bGA57yp5pS+5q+U5Li6Meiuoeeul++8jOa4suafk+WZqOS8muagueaNruWFqOWxgOe8qeaUvuavlOiHquWKqOWujOaIkOe8qeaUvua4suafk++8iVxyXG4gICAgICogQHBhcmFtIHkg6L+b5bqm5p2h6auY5bqm77yI5LiA5b6L5oyJ5YWo5bGA57yp5pS+5q+U5Li6Meiuoeeul++8jOa4suafk+WZqOS8muagueaNruWFqOWxgOe8qeaUvuavlOiHquWKqOWujOaIkOe8qeaUvua4suafk++8iVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZWRpdEJhcihib3VuZDogU3ltYm9saXplZCwgYmFyX3N5bWJOdW06bnVtYmVyID0gMCwgcGVyY2VudGFnZTogbnVtYmVyID0gMSwgY29sb3I6IHN0cmluZyA9IFwiIzAwZmYwMFwiLCB4PzpudW1iZXIsIHk/Om51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGxldCB0bXBBY3RvcjpBY3RvclJVID0gQWN0b3JCb3guZ2V0KGJvdW5kLnN5bWJvbC5kYXRhKTsvL+iOt+WPluW3sua4suafk+eahGFjdG9yUlXlr7nosaFcclxuICAgICAgICBpZih0bXBBY3Rvci5nZXRCYXIoYmFyX3N5bWJOdW0pID09PSAgdW5kZWZpbmVkKXsvL+WmguaenOWvueW6lOi/m+W6puadoeS4jeWtmOWcqFxyXG4gICAgICAgICAgICB0bXBBY3Rvci5hZGRFeHRCYXIoY29sb3IsYmFyX3N5bWJOdW0scGVyY2VudGFnZSx4LHkpOy8v5qC55o2u6L6T5YWl5Y+C5pWw5paw5bu66L+b5bqm5p2hXHJcblxyXG4gICAgICAgIH1lbHNley8v5aaC5a+55bqU6L+b5bqm5p2h5bey5a2Y5ZyoXHJcbiAgICAgICAgICAgIHRtcEFjdG9yLmVkaXRCYXIoYmFyX3N5bWJOdW0scGVyY2VudGFnZSk7Ly/kv67mlLnor6Xov5vluqbmnaHnmb7liIbmr5RcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+R5biD5pS75Ye75LqL5Lu2XHJcbiAgICAgKiDmraTmlrnms5XosIPnlKjlkI7or7fli7/kv67mlLnlhajlsYDnvKnmlL7mr5TvvIHvvIFcclxuICAgICAqIEBwYXJhbSBmcm9tIOWPkeWKqOaUu+WHu+iKgueCuVxyXG4gICAgICogQHBhcmFtIHRvIOmBreWPl+aJk+WHu+iKgueCuVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVmYXVsdEF0a0VmZmVjdChmcm9tOiBTeW1ib2xpemVkLCB0bzogU3ltYm9saXplZCk6IHZvaWQge1xyXG4gICAgICAgIC8v5omT5Ye75LqL5Lu244CB5Y+R5Yqo5pS75Ye76IqC54K55ZKM6YGt5Y+X5pS75Ye76IqC54K55Y+C5pWwXHJcbiAgICAgICAgQWN0b3JCb3guZ2V0KGZyb20uc3ltYm9sLmRhdGEpLmhpdCh0byk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5HluIPlj5fkvKTkuovku7ZcclxuICAgICAqIOatpOaWueazleiwg+eUqOWQjuivt+WLv+S/ruaUueWFqOWxgOe8qeaUvuavlO+8ge+8gVxyXG4gICAgICogQHBhcmFtIGJvdW5kIOWPl+S8pOiKgueCuVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVmYXVsdERtZ0VmZmVjdChib3VuZDogU3ltYm9saXplZCk6IHZvaWQge1xyXG4gICAgICAgIC8v5Y+X5Lyk5LqL5Lu25ZKM5Y+X5Lyk6IqC54K55Y+C5pWwXHJcbiAgICAgICAgQWN0b3JCb3guZ2V0KGJvdW5kLnN5bWJvbC5kYXRhKS5kYW1hZ2UoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDplIDmr4Hlr7nosaHvvIjpu5jorqTplIDmr4HvvIlcclxuICAgICAqIEBwYXJhbSBib3VuZCDlr7nosaFcclxuICAgICAqIEBwYXJhbSBwb3Mg5Z2Q5qCH77yI5LiA5b6L5oyJ5YWo5bGA57yp5pS+5q+U5Li6Meiuoeeul++8jOa4suafk+WZqOS8muagueaNruWFqOWxgOe8qeaUvuavlOiHquWKqOWujOaIkOe8qeaUvua4suafk++8iVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGlzdHJveUFjdG9yKGJvdW5kOiBTeW1ib2xpemVkLCBwb3M/OiBWZWMyKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHRtcEFjdG9yOkFjdG9yUlUgPSBBY3RvckJveC5nZXQoYm91bmQuc3ltYm9sLmRhdGEpOy8v6I635Y+WYWN0b3JSVeWvueixoVxyXG4gICAgICAgIGlmKHBvcyA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdG1wQWN0b3IuZGVzdG9yeSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihwb3MuZXF1YWxzKHRtcEFjdG9yLmdldFBvc1ZlYygpKSl7XHJcbiAgICAgICAgICAgIHRtcEFjdG9yLmRlc3RvcnkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/plIDmr4FhY3RvclJV5a+56LGhXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlnKhhY3Rvcui6q+S4iua4suafk+aWh+acrFxyXG4gICAgICog5LuF5b2T5YWo5bGA5paH5pys5pi+56S65byA5YWzc3dpdGNoSG92ZXJUZXh077yI77yJ5byA5ZCv5pe25omN5Lya5riy5p+T5paH5pys77yM5byA5YWz6buY6K6k5YWz6ZetXHJcbiAgICAgKiBAcGFyYW0gYm91bmQgYWN0b3JcclxuICAgICAqIEBwYXJhbSBjb250ZW50IOaWh+acrFxyXG4gICAgICogQHBhcmFtIHBvcyDmlofmnKzotbflp4vlnZDmoIfvvIjkuIDlvovmjInlhajlsYDnvKnmlL7mr5TkuLox6K6h566X77yM5riy5p+T5Zmo5Lya5qC55o2u5YWo5bGA57yp5pS+5q+U6Ieq5Yqo5a6M5oiQ57yp5pS+5riy5p+T77yJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB3cml0ZShib3VuZDogU3ltYm9saXplZCwgY29udGVudDogc3RyaW5nLCBwb3M/OiBWZWMyKTogdm9pZCB7XHJcbiAgICAgICAgQWN0b3JCb3guZ2V0KGJvdW5kLnN5bWJvbC5kYXRhKS5nZXRUZXh0KCkuc2V0VGV4dChjb250ZW50KTsvL+S/ruaUuUFjdG9yUlXmlofmnKxcclxuICAgICAgICBBY3RvckJveC5nZXQoYm91bmQuc3ltYm9sLmRhdGEpLmdldFRleHQoKS5zZXRQb3MocG9zKTsvL+S/ruaUueivpeaWh+acrOS9jee9rlxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YWo5bGA5paH5pys5pi+56S65byA5YWz77yI6buY6K6k5YWz6Zet77yJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzd2l0Y2hIb3ZlclRleHQoKTogdm9pZCB7XHJcbiAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2UuZXZlbnQoRXZlbnRDZW50cmUuRVR5cGUuUEVSRk9STUFOQ0VfVEVYVF9TV0lUQ0goKSk7Ly/lj5HluIPmlofmnKzlvIDlhbPkuovku7bvvIzmjInpkq7mlofmnKzkuI3lj5flvbHlk41cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOenu+WKqGFjdG9y5a+56LGhXHJcbiAgICAgKiBAcGFyYW0gYm91bmQgYWN0b3JcclxuICAgICAqIEBwYXJhbSBwb3Mg55uu5qCH5Z2Q5qCH77yI5LiA5b6L5oyJ5YWo5bGA57yp5pS+5q+U5Li6Meiuoeeul++8jOa4suafk+WZqOS8muagueaNruWFqOWxgOe8qeaUvuavlOiHquWKqOWujOaIkOe8qeaUvua4suafk++8iVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbW92ZShib3VuZDogU3ltYm9saXplZCwgcG9zOiBWZWMyKTogdm9pZCB7XHJcbiAgICAgICAgQWN0b3JCb3guZ2V0KGJvdW5kLnN5bWJvbC5kYXRhKS5yZWxvY2F0ZShwb3MpOy8v56e75YqoQWN0b3JSVeWvueixoeWdkOagh1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlnKhhY3Rvcui6q+S4iua3u+WKoOaMiemSrlxyXG4gICAgICog5q+P5LiqYWN0b3JSVem7mOiupOWtmOWcqDLkuKrmjInpkq7vvIjngrnlh7thY3RvclJV6IqC54K55Y2z5Y+v5pi+56S677yJ77yM5a+55bqU5pKk6YCA5ZKM5oqA6IO944CC6K+l5oyJ6ZKu5Z2Q5qCH44CB5a696auY44CB6aKc6Imy44CB5ZCN5a2X5LiN5Y+v5L+u5pS577yM5Yqf6IO96ZyA5LuO5aSW6YOo5re75YqgXHJcbiAgICAgKiBAcGFyYW0gYm91bmQgYWN0b3JcclxuICAgICAqIEBwYXJhbSBudW0g5oyJ6ZKu57yW5Y+377yIMCwx5Li66buY6K6k5oyJ6ZKu77yM6buY6K6k5oyJ6ZKu5LiN6Ieq5bim5Lu75L2V5Yqf6IO977yM6ZyA5omL5Yqo5re75Yqg77yJXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sg54K55Ye75oyJ6ZKu5ZCO6LCD55So55qE5Ye95pWwXHJcbiAgICAgKiBAcGFyYW0gdGV4dCDmmL7npLrlnKjmjInpkq7kuIrnmoTmlofmnKzvvIjpu5jorqTmmL7npLrkuJTml6Dms5Xkv67mlLnvvIlcclxuICAgICAqIEBwYXJhbSBwb3Mg5oyJ6ZKu6LW35aeL5Z2Q5qCH77yI5LiA5b6L5oyJ5YWo5bGA57yp5pS+5q+U5Li6Meiuoeeul++8jOa4suafk+WZqOS8muagueaNruWFqOWxgOe8qeaUvuavlOiHquWKqOWujOaIkOe8qeaUvua4suafk++8iVxyXG4gICAgICogQHBhcmFtIHNpemUg5oyJ6ZKu5aSn5bCP77yI5LiA5b6L5oyJ5YWo5bGA57yp5pS+5q+U5Li6Meiuoeeul++8jOa4suafk+WZqOS8muagueaNruWFqOWxgOe8qeaUvuavlOiHquWKqOWujOaIkOe8qeaUvua4suafk++8iVxyXG4gICAgICogQHBhcmFtIGNvbG9yIOaMiemSruminOiJslxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXR0YWNoQnV0dG9uKGJvdW5kOiBTeW1ib2xpemVkLG51bTpudW1iZXIsIGNhbGxiYWNrOiBGdW5jdGlvbiwgdGV4dD86IHN0cmluZywgcG9zPzogVmVjMiwgc2l6ZT86IFZlYzIsIGNvbG9yPzogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHRtcEFjdDpBY3RvclJVID0gQWN0b3JCb3guZ2V0KGJvdW5kLnN5bWJvbC5kYXRhKTsvL+iOt+WPlkFjdG9yUlXlr7nosaFcclxuICAgICAgICBpZih0bXBBY3QuZ2V0QnV0dG9uKG51bSkgPT09IHVuZGVmaW5lZCl7Ly/lpoLmnpzlr7nlupTmjInpkq7kuI3lrZjlnKhcclxuICAgICAgICAgICAgaWYocG9zID09PSB1bmRlZmluZWQpey8v5aaC5p6c5LiN6L6T5YWl5oyH5a6a5Z2Q5qCHXHJcbiAgICAgICAgICAgICAgICB0bXBBY3QuYWRkRXh0cmFCdXR0b25zQXREZWZMb2NhdGlvbih0ZXh0LG51bSxjb2xvcixjYWxsYmFjayk7Ly/lnKjpu5jorqTkvY3nva7mlrDlu7rmjInpkq5cclxuICAgICAgICAgICAgfWVsc2V7Ly/lpoLmnpzovpPlhaXmjIflrprlnZDmoIdcclxuICAgICAgICAgICAgICAgIHRtcEFjdC5hZGRFeHRyYUJ1dHRvbkF0Tm9EZWZMb2NhdGlvbih0ZXh0LG51bSxjYWxsYmFjayxwb3Msc2l6ZSxjb2xvcik7Ly/lnKjmjIflrprkvY3nva7mlrDlu7rmjInpkq5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNley8v5aaC5p6c5a+55bqU5oyJ6ZKu5a2Y5ZyoXHJcbiAgICAgICAgICAgIHRtcEFjdC5nZXRCdXR0b24obnVtKS5zZXRGdW5jKGNhbGxiYWNrKTsvL+i+k+WFpeWKn+iDveWHveaVsFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iLCIvL2F1dGhvciBOYTJDdUM0TzhcclxuXHJcbmltcG9ydCBDdXN0b21pemVkU3ByaXRlIGZyb20gXCIuL2N1c3RvbWl6ZWRTcHJcIjtcclxuaW1wb3J0IHsgQWN0b3JCb3ggfSBmcm9tIFwiLi9vYmpib3hcIjtcclxuaW1wb3J0IHsgQmFyLCBCdXR0b24gLCBUZXh0IH0gZnJvbSBcIi4vQWN0b3JDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTXlTeW1ib2wsIFN5bWJvbGl6ZWQgfSBmcm9tIFwiLi4vLi4vLi4vRml4L0ZpeFN5bWJvbFwiO1xyXG5pbXBvcnQgeyBWZWMyIH0gZnJvbSBcIi4uLy4uL0RvZE1hdGhcIjtcclxuaW1wb3J0IHsgS1ZQYWlyIH0gZnJvbSBcIi4uLy4uL0RvZERhdGFTdHJ1Y3R1cmVcIjtcclxuaW1wb3J0IHsgRXZlbnRDZW50cmUgfSBmcm9tIFwiLi4vLi4vLi4vRXZlbnQvRXZlbnRDZW50cmVcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3RvclJVe1xyXG4gICAgcHJpdmF0ZSBfaW5pdFBvczpWZWMyOy8vYWN0b3Lotbflp4vlnZDmoIdcclxuICAgIHByaXZhdGUgX2luaXRTaXplOlZlYzI7Ly9hY3Rvcui1t+Wni+Wkp+Wwj1xyXG4gICAgcHJpdmF0ZSBfaW5pdEJhckhlaWdodDpudW1iZXIgPSAwOy8v6L+b5bqm5p2h5YW25a6e6auY5bqm5pqC5a2Y5ZmoXHJcbiAgICBwcml2YXRlIF9wb3M6VmVjMjsvL+agueaNruWFqOWxgOe8qeaUvuavlOaNoueul+WQjueahOWPr+ingeWdkOagh1xyXG4gICAgcHJpdmF0ZSBfc2l6ZTpWZWMyOy8v5qC55o2u5YWo5bGA57yp5pS+5q+U5o2i566X5ZCO55qE5Y+v6KeB5aSn5bCPXHJcbiAgICBwcml2YXRlIF9zY2FsZTpudW1iZXIgPSAxOy8v5YWo5bGA57yp5pS+5q+UXHJcbiAgICBwcml2YXRlIF9zeW1iOk15U3ltYm9sOy8vc3ltYlxyXG4gICAgcHJpdmF0ZSBfZmF0aGVyOkN1c3RvbWl6ZWRTcHJpdGU7Ly/niLbnu5jlm77oioLngrlcclxuICAgIHByaXZhdGUgX3NwcjpDdXN0b21pemVkU3ByaXRlOy8v5pys57uY5Zu+6IqC54K5XHJcbiAgICBwcml2YXRlIF9iYXJQYWlyOktWUGFpcjxCYXI+ID0gbmV3IEtWUGFpcjxCYXI+KCk7Ly/ov5vluqbmnaHplK7lgLznu4RcclxuICAgIHByaXZhdGUgX3RleHQ6VGV4dDsvL+m7mOiupOaWh+acrFxyXG4gICAgcHJpdmF0ZSBfZGVmQnV0dG9uU2hvd2VkOmJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuaYvuekuum7mOiupOaMiemSru+8jOm7mOiupOS4uuWQplxyXG4gICAgcHJpdmF0ZSBfYnV0dG9uUGFpcjpLVlBhaXI8QnV0dG9uPiA9IG5ldyBLVlBhaXI8QnV0dG9uPigpO1xyXG4gICAgcHJpdmF0ZSBfYnV0dG9uSGVpZ2h0Om51bWJlcjsvL+aMiemSrumrmOW6puaaguWtmOWZqFxyXG4gICAgcHJpdmF0ZSBfZGFtYWdlOkN1c3RvbWl6ZWRTcHJpdGU7Ly/lj5fkvKTnibnmlYjmmL7npLroioLngrlcclxuICAgIHByaXZhdGUgX3RyYW5zcGFyZW5jeTpudW1iZXIgPSAxOy8v5Y+X5Lyk54m55pWI5Y+C5pWw5pqC5a2Y5ZmoXHJcbiAgICBwcml2YXRlIF9maXN0OkN1c3RvbWl6ZWRTcHJpdGU7Ly/mlLvlh7vnibnmlYjmmL7npLroioLngrlcclxuICAgIHByaXZhdGUgX21vdmVQZXJjZW50YWdlOm51bWJlciA9IDA7Ly/mlLvlh7vnibnmlYjlj4LmlbDmmoLlrZjlmahcclxuICAgIHB1YmxpYyBfY2VudGVyUG9zOlZlYzI7Ly/kuK3lv4PlnZDmoIdcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXJVbml05p6E6YCg5ZmoXHJcbiAgICAgKiBAcGFyYW0gc3ltYiBzeW1iXHJcbiAgICAgKiBAcGFyYW0gcG9zIOi1t+Wni+WdkOagh1xyXG4gICAgICogQHBhcmFtIHNpemUg5a696auYXHJcbiAgICAgKiBAcGFyYW0gZmF0aGVyIOeItue7mOWbvuiKgueCuVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihzeW1iOk15U3ltYm9sLCBwb3M6VmVjMiwgc2l6ZTpWZWMyLCBmYXRoZXI6Q3VzdG9taXplZFNwcml0ZSwgY29sb3I6c3RyaW5nID0gXCIjMDBmZmZmXCIsIHNjYWxlOm51bWJlciA9IDEpe1xyXG4gICAgICAgIHRoaXMuX2ZhdGhlciA9IGZhdGhlcjsvL+eItue7mOWbvuiKgueCuVxyXG4gICAgICAgIHRoaXMuX2luaXRQb3MgPSBwb3M7Ly/otbflp4vlnZDmoIdcclxuICAgICAgICB0aGlzLl9pbml0U2l6ZSA9IHNpemU7Ly/otbflp4vlrr3pq5hcclxuICAgICAgICB0aGlzLl9zcHIgPSBuZXcgQ3VzdG9taXplZFNwcml0ZSgpOy8v5paw5bu657uY5Zu+6IqC54K5XHJcbiAgICAgICAgdGhpcy5fZmF0aGVyLmFkZENoaWxkKHRoaXMuX3Nwcik7Ly/mt7vliqDlrZDoioLngrlcclxuICAgICAgICB0aGlzLnNldERhdGEoc3ltYixuZXcgVmVjMih0aGlzLl9pbml0UG9zLngqdGhpcy5fc2NhbGUsdGhpcy5faW5pdFBvcy55KnRoaXMuX3NjYWxlKSxuZXcgVmVjMih0aGlzLl9pbml0U2l6ZS54KnRoaXMuX3NjYWxlLCB0aGlzLl9pbml0U2l6ZS55KnRoaXMuX3NjYWxlKSxjb2xvcik7Ly/orr7nva7nu5jlm77oioLngrnlj4LmlbBcclxuICAgICAgICBBY3RvckJveC5hZGQodGhpcyx0aGlzLl9zeW1iKTsvL+WwhuacrOWvueixoea3u+WKoOWIsOmUruWAvOWvuVxyXG4gICAgICAgIHRoaXMuYWRkRGVmQmFyKCk7Ly/mt7vliqDpu5jorqTov5vluqbmnaFcclxuICAgICAgICB0aGlzLl90ZXh0ID0gbmV3IFRleHQodGhpcy5faW5pdFNpemUsdGhpcy5fc2NhbGUpOy8v5re75Yqg6buY6K6k5paH5pysXHJcbiAgICAgICAgdGhpcy5fdGV4dC5zZXRTeW1iKHRoaXMuX3N5bWIpOy8vXHJcbiAgICAgICAgdGhpcy5fYnV0dG9uSGVpZ2h0ID0gdGhpcy5faW5pdFNpemUueTsvL1xyXG4gICAgICAgIHRoaXMuX3Nwci5hZGRDaGlsZCh0aGlzLl90ZXh0KTsvL+m7mOiupOaWh+acrOe9ruS6juWtkOiKgueCuVxyXG4gICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLm9uKEV2ZW50Q2VudHJlLkVUeXBlLlBFUkZPUk1BTkNFX1JFU0NBTEUoKSx0aGlzLHRoaXMucmVTY2FsZSk7Ly/nm5HlkKzlhajlsYDnvKnmlL7mr5RcclxuICAgICAgICB0aGlzLl9zcHIub24oTGF5YS5FdmVudC5NT1VTRV9PVkVSLHRoaXMsdGhpcy5tb3VzZU92ZXIpOy8vXHJcbiAgICAgICAgdGhpcy5fc3ByLm9uKExheWEuRXZlbnQuTU9VU0VfT1VULHRoaXMsdGhpcy5tb3VzZU91dCk7Ly9cclxuICAgICAgICB0aGlzLl9zcHIub24oTGF5YS5FdmVudC5NT1VTRV9VUCx0aGlzLHRoaXMuc2hvd0RlZmF1bHRCb3R0b25zKTsvL1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZSA9IG5ldyBDdXN0b21pemVkU3ByaXRlKCk7Ly9cclxuICAgICAgICB0aGlzLl9zcHIuYWRkQ2hpbGQodGhpcy5fZGFtYWdlKTsvL1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZS5zZXRQYXJhbSgwLDAsdGhpcy5fc2l6ZS54LHRoaXMuX3NpemUueSxcIiNmOTE1MjZcIik7Ly9cclxuICAgICAgICB0aGlzLl9kYW1hZ2UubG9jYXRpb25BbmRTaXplKCk7Ly9cclxuICAgICAgICB0aGlzLmFkZERlZkJ1dHRvbnMoKTsvL1xyXG4gICAgICAgIHRoaXMuX2Zpc3QgPSBuZXcgQ3VzdG9taXplZFNwcml0ZSgpOy8vXHJcbiAgICAgICAgdGhpcy5fZmlzdC5zZXRQYXJhbSh0aGlzLl9jZW50ZXJQb3MueCx0aGlzLl9jZW50ZXJQb3MueSwxNiwxNixcIiNGM0MyNDZcIik7Ly9cclxuICAgICAgICB0aGlzLl9maXN0LmxvY2F0aW9uQW5kU2l6ZSgpOy8vXHJcbiAgICAgICAgdGhpcy5fZmlzdC56T3JkZXIgPSAyOy8vXHJcbiAgICAgICAgdGhpcy5fc3ByLmFkZENoaWxkKHRoaXMuX2Zpc3QpOy8vXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue5b2T5YmN5Y+v6KeG6IqC54K55Z2Q5qCHXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3VyUG9zKCk6VmVjMntcclxuICAgICAgICByZXR1cm4gdGhpcy5fcG9zO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWPkeWKqOaJk+WHu+eJueaViFxyXG4gICAgICogQHBhcmFtIHRvIOaJk+WHu+ebruagh1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaGl0KHRvOlN5bWJvbGl6ZWQpOnZvaWR7XHJcbiAgICAgICAgLy8gdGhpcy5fZmlzdC5ncmFwaGljcy5zYXZlKCk7XHJcbiAgICAgICAgdGhpcy5fZmlzdC5jZW50cmFsU2hpZnRDb2xvcmVkKCk7XHJcbiAgICAgICAgbGV0IHRtcFZlYzpWZWMyID0gbmV3IFZlYzIoQWN0b3JCb3guZ2V0KHRvLnN5bWJvbC5kYXRhKS5jdXJQb3MoKS54LXRoaXMuX3Bvcy54LEFjdG9yQm94LmdldCh0by5zeW1ib2wuZGF0YSkuY3VyUG9zKCkueS10aGlzLl9wb3MueSk7XHJcbiAgICAgICAgbGV0IGZ1bjpGdW5jdGlvbiA9ICh0YXJnZXQ6VmVjMikgPT57XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX21vdmVQZXJjZW50YWdlID4gMSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3ZlUGVyY2VudGFnZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9maXN0LmdyYXBoaWNzLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLl9maXN0LmdyYXBoaWNzLnJlc3RvcmUoKTtcclxuICAgICAgICAgICAgICAgIExheWEudGltZXIuY2xlYXIodGhpcyxmdW4pO1xyXG4gICAgICAgICAgICAgICAgQWN0b3JCb3guZ2V0KHRvLnN5bWJvbC5kYXRhKS5kYW1hZ2UoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBjdXJMb2NhY3Rpb246VmVjMiA9IG5ldyBWZWMyKCAoMTYrIHRhcmdldC54KSp0aGlzLl9tb3ZlUGVyY2VudGFnZSwoMTYrIHRhcmdldC55KSp0aGlzLl9tb3ZlUGVyY2VudGFnZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX21vdmVQZXJjZW50YWdlICs9IDAuMDI7XHJcbiAgICAgICAgICAgIHRoaXMuX2Zpc3QucmVsb2NhdGUoY3VyTG9jYWN0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5fZmlzdC5yb3RhdGlvbiA9IDIwMDAgKiB0aGlzLl9tb3ZlUGVyY2VudGFnZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExheWEudGltZXIubG9vcCgyMCx0aGlzLGZ1bixbdG1wVmVjXSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+R5Yqo5Y+X5Lyk54m55pWIXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkYW1hZ2UoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZS5zZXRQYXJhbSgwLDAsdGhpcy5fc2l6ZS54LHRoaXMuX3NpemUueSk7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlLmxvY2F0aW9uQW5kU2l6ZSgpO1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZS5jaGFuZ2VDb2xvcigpO1xyXG4gICAgICAgIGxldCBmdW46RnVuY3Rpb24gPSAoKT0+e1xyXG4gICAgICAgICAgICBpZih0aGlzLl90cmFuc3BhcmVuY3kgPCAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RhbWFnZS5ncmFwaGljcy5jbGVhcigpOyBcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zcGFyZW5jeSA9IDE7XHJcbiAgICAgICAgICAgICAgICBMYXlhLnRpbWVyLmNsZWFyKHRoaXMsZnVuKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5fdHJhbnNwYXJlbmN5IC09IDAuMDM7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhbWFnZS5hbHBoYSA9IHRoaXMuX3RyYW5zcGFyZW5jeTtcclxuICAgICAgICB9XHJcbiAgICAgICAgTGF5YS50aW1lci5sb29wKDIwLHRoaXMsZnVuKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5riy5p+T6buY6K6k5oyJ6ZKuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2hvd0RlZmF1bHRCb3R0b25zKCk6dm9pZHtcclxuICAgICAgICBpZih0aGlzLl9kZWZCdXR0b25TaG93ZWQgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgdGhpcy5fc3ByLmFkZENoaWxkKHRoaXMuX2J1dHRvblBhaXIucmVhZCgwK1wiXCIpLmdldFNwcigpKTtcclxuICAgICAgICAgICAgdGhpcy5fc3ByLmFkZENoaWxkKHRoaXMuX2J1dHRvblBhaXIucmVhZCgxK1wiXCIpLmdldFNwcigpKTtcclxuICAgICAgICAgICAgdGhpcy5fZGVmQnV0dG9uU2hvd2VkID0gdHJ1ZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fc3ByLnJlbW92ZUNoaWxkKHRoaXMuX2J1dHRvblBhaXIucmVhZCgwK1wiXCIpLmdldFNwcigpKTtcclxuICAgICAgICAgICAgdGhpcy5fc3ByLnJlbW92ZUNoaWxkKHRoaXMuX2J1dHRvblBhaXIucmVhZCgxK1wiXCIpLmdldFNwcigpKTtcclxuICAgICAgICAgICAgdGhpcy5fZGVmQnV0dG9uU2hvd2VkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOWPkeW4g+m8oOagh+i/m+WFpeS6i+S7tlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG1vdXNlT3ZlcigpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fdGV4dC5zZXRTd2l0Y2hPbigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+R5biD6byg5qCH56a75byA5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbW91c2VPdXQoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3RleHQuc2V0U3dpdGNoT2ZmKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDph43orr7nvKnmlL7mr5RcclxuICAgICAqIEBwYXJhbSB2YWx1ZSDmlrDlhajlsYDnvKnmlL7mr5RcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZVNjYWxlKHZhbHVlOm51bWJlcik6dm9pZHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9zY2FsZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh0aGlzLl9zeW1iLHRoaXMuX2luaXRQb3MsdGhpcy5faW5pdFNpemUsdGhpcy5fc3ByLmdldENvbG9yKCkpO1xyXG4gICAgICAgIHRoaXMuc2V0Q29sb3IoKTtcclxuICAgICAgICB0aGlzLl9kYW1hZ2Uuc2V0UGFyYW0oMCwwLHRoaXMuX2luaXRTaXplLngqdGhpcy5fc2NhbGUsdGhpcy5faW5pdFNpemUueSp0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlLmxvY2F0aW9uQW5kU2l6ZSgpO1xyXG4gICAgICAgIFxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruacrEFSVeeahOWQhOmhueWPguaVsFxyXG4gICAgICogQHBhcmFtIHN5bWIgc3ltYlxyXG4gICAgICogQHBhcmFtIHBvcyDotbflp4vlnZDmoIdcclxuICAgICAqIEBwYXJhbSBzaXplIOWkp+Wwj1xyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0RGF0YShzeW1iOk15U3ltYm9sLCBwb3M6VmVjMiwgc2l6ZTpWZWMyLGNvbG9yOnN0cmluZyk6dm9pZHtcclxuICAgICAgICB0aGlzLl9zeW1iID0gc3ltYjtcclxuICAgICAgICB0aGlzLl9wb3MgPSBuZXcgVmVjMihwb3MueCp0aGlzLl9zY2FsZSxwb3MueSp0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fc2l6ZSA9IG5ldyBWZWMyKHNpemUueCp0aGlzLl9zY2FsZSxzaXplLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX3Nwci5zZXRQYXJhbSh0aGlzLl9wb3MueCx0aGlzLl9wb3MueSx0aGlzLl9zaXplLngsdGhpcy5fc2l6ZS55LGNvbG9yKTtcclxuICAgICAgICB0aGlzLnNldENvbG9yKCk7XHJcbiAgICAgICAgdGhpcy5fc3ByLmxvY2F0aW9uQW5kU2l6ZSgpO1xyXG4gICAgICAgIHRoaXMuX2NlbnRlclBvcyA9IG5ldyBWZWMyKHRoaXMuX3NpemUueC8yLHRoaXMuX3NpemUueS8yKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBjb2xvciDorr7nva7popzoibJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldENvbG9yKCk6dm9pZHtcclxuICAgICAgICB0aGlzLl9zcHIuY2hhbmdlQ29sb3IoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBwb3Mg6YeN5paw6K6+572u6LW35aeL5Z2Q5qCH77yI5LiN5Y+X57yp5pS+5q+U5b2x5ZON77yJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWxvY2F0ZShwb3M6VmVjMik6dm9pZHtcclxuICAgICAgICB0aGlzLl9wb3MgPSBuZXcgVmVjMihwb3MueCp0aGlzLl9zY2FsZSxwb3MueSp0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5faW5pdFBvcyA9IHBvcy5jbG9uZSgpO1xyXG4gICAgICAgIHRoaXMuX3Nwci5yZWxvY2F0ZShwb3MpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaRp+avgeacrEFSVVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVzdG9yeSgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fc3ByLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluacrEFSVeeahOi1t+Wni+WdkOagh++8iOS4jeWPl+e8qeaUvuavlOW9seWTje+8iVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0UG9zVmVjKCk6VmVjMntcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5pdFBvcztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bmnKxBUlXnmoTpu5jorqTmlofmnKzlr7nosaFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFRleHQoKTpUZXh0e1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90ZXh0O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoOm7mOiupOi/m+W6puadoVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkRGVmQmFyKCk6dm9pZHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9pbml0QmFySGVpZ2h0ID0gMDtcclxuICAgICAgICBsZXQgdG1wOkJhciA9IG5ldyBCYXIoMCxcIiMwMGZmZmZcIixuZXcgVmVjMigzMCw1KSxuZXcgVmVjMigwLHRoaXMuX2luaXRCYXJIZWlnaHQgLSA2KSx0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fc3ByLmFkZENoaWxkKHRtcC5nZXRCYWNrU3ByKCkpO1xyXG4gICAgICAgIHRoaXMuX2JhclBhaXIuZWRpdChcImJhcl8wXCIsdG1wKTtcclxuICAgICAgICB0aGlzLl9pbml0QmFySGVpZ2h0ID0gdGhpcy5faW5pdEJhckhlaWdodCAtIHRtcC5nZXRIZWlnaHQoKSAtIDE7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bmnKxBUlXnmoTmjIflrprov5vluqbmnaFcclxuICAgICAqIEBwYXJhbSBudW0g6L+b5bqm5p2h5Luj5Y+3XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRCYXIobnVtOm51bWJlcik6QmFye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iYXJQYWlyLnJlYWQoYGJhcl8ke251bX1gKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoOmZhOWKoOi/m+W6puadoVxyXG4gICAgICogQHBhcmFtIGJhY2tHcm91bmRDb2xvciDorr7nva7mlrDlop7ov5vluqbmnaHpopzoibJcclxuICAgICAqIEBwYXJhbSBzeW1iIOiuvue9ruaWsOWinui/m+W6puadoeS7o+WPt1xyXG4gICAgICogQHBhcmFtIHgg5a695bqmXHJcbiAgICAgKiBAcGFyYW0geSDpq5jluqZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZEV4dEJhcihiYWNrR3JvdW5kQ29sb3I6c3RyaW5nLHN5bWI6bnVtYmVyLHBlcmNlbnRhZ2U6bnVtYmVyLHg6bnVtYmVyID0gMzAseTpudW1iZXIgPSA1KTp2b2lke1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB0bXBCYXI6QmFyID0gbmV3IEJhcihzeW1iLGJhY2tHcm91bmRDb2xvcixuZXcgVmVjMih4LHkpLG5ldyBWZWMyKDAsdGhpcy5faW5pdEJhckhlaWdodCAtIHkgLSAxKSx0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fc3ByLmFkZENoaWxkKHRtcEJhci5nZXRCYWNrU3ByKCkpO1xyXG4gICAgICAgIHRoaXMuX2JhclBhaXIuZWRpdChgYmFyXyR7c3ltYn1gLHRtcEJhcik7XHJcbiAgICAgICAgdGhpcy5faW5pdEJhckhlaWdodCA9IHRoaXMuX2luaXRCYXJIZWlnaHQgLSB0bXBCYXIuZ2V0SGVpZ2h0KCkgLSAxO1xyXG4gICAgICAgIHRtcEJhci5wZXJjZW50YWdlID0gcGVyY2VudGFnZTtcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5L+u5pS55bey5pyJ6L+b5bqm5p2hXHJcbiAgICAgKiBAcGFyYW0gc3ltYiDmjIflrprov5vluqbmnaHku6Plj7dcclxuICAgICAqIEBwYXJhbSBwZXJjZW50YWdlIOS/ruaUuei/m+W6puadoei/m+W6plxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZWRpdEJhcihzeW1iOm51bWJlciwgcGVyY2VudGFnZTpudW1iZXIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fYmFyUGFpci5yZWFkKGBiYXJfJHtzeW1ifWApLnBlcmNlbnRhZ2UgPSBwZXJjZW50YWdlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoOm7mOiupOaMiemSrlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZERlZkJ1dHRvbnMoKTp2b2lke1xyXG4gICAgICAgIGxldCB0bXAxOkJ1dHRvbiA9IG5ldyBCdXR0b24odGhpcy5fc3ltYixcIlJldHJlYXRcIiwwLG5ldyBWZWMyKCAtIDIwLHRoaXMuX2luaXRTaXplLnkpLG5ldyBWZWMyKDIwLDE1KSx1bmRlZmluZWQsdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX2J1dHRvblBhaXIuZWRpdChcIjBcIix0bXAxKTtcclxuICAgICAgICBsZXQgdG1wMjpCdXR0b24gPSBuZXcgQnV0dG9uKHRoaXMuX3N5bWIsXCJBY3RpdmF0ZV9Ta2lsbFwiLDAsbmV3IFZlYzIodGhpcy5faW5pdFNpemUueCx0aGlzLl9pbml0U2l6ZS55KSxuZXcgVmVjMigyMCwxNSksdW5kZWZpbmVkLHRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9idXR0b25QYWlyLmVkaXQoXCIxXCIsdG1wMik7XHJcbiAgICAgICAgdGhpcy5fYnV0dG9uSGVpZ2h0ID0gdGhpcy5faW5pdFNpemUueSArIDE2O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWcqOm7mOiupOS9jee9rua3u+WKoOmineWkluaMiemSrlxyXG4gICAgICogQHBhcmFtIG5hbWUgXHJcbiAgICAgKiBAcGFyYW0gbnVtIFxyXG4gICAgICogQHBhcmFtIGNvbG9yIFxyXG4gICAgICogQHBhcmFtIGZ1biBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZEV4dHJhQnV0dG9uc0F0RGVmTG9jYXRpb24obmFtZTpzdHJpbmcsbnVtOm51bWJlciwgY29sb3I/OnN0cmluZywgZnVuPzpGdW5jdGlvbik6dm9pZHtcclxuICAgICAgICBsZXQgdG1wQnV0OkJ1dHRvbiA9IG5ldyBCdXR0b24odGhpcy5fc3ltYixuYW1lLG51bSxuZXcgVmVjMigwLHRoaXMuX2J1dHRvbkhlaWdodCksbmV3IFZlYzIoMjAsMTUpLGNvbG9yLHRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9idXR0b25QYWlyLmVkaXQobnVtK1wiXCIsdG1wQnV0KTtcclxuICAgICAgICB0aGlzLl9zcHIuYWRkQ2hpbGQodG1wQnV0LmdldFNwcigpKTtcclxuICAgICAgICB0aGlzLl9idXR0b25IZWlnaHQgKz0gMTY7XHJcbiAgICAgICAgdG1wQnV0LnNldEZ1bmMoZnVuKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWcqOaMh+WumuS9jee9rua3u+WKoOmineWkluaMiemSrlxyXG4gICAgICogQHBhcmFtIG5hbWUgXHJcbiAgICAgKiBAcGFyYW0gbnVtIFxyXG4gICAgICogQHBhcmFtIGZ1biBcclxuICAgICAqIEBwYXJhbSBwb3MgXHJcbiAgICAgKiBAcGFyYW0gc2l6ZSBcclxuICAgICAqIEBwYXJhbSBjb2xvciBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZEV4dHJhQnV0dG9uQXROb0RlZkxvY2F0aW9uKG5hbWU6c3RyaW5nLG51bTpudW1iZXIsZnVuOkZ1bmN0aW9uLHBvczpWZWMyLHNpemU6VmVjMiwgY29sb3I/OnN0cmluZyk6dm9pZHtcclxuICAgICAgICBsZXQgdG1wQnV0OkJ1dHRvbiA9IG5ldyBCdXR0b24odGhpcy5fc3ltYixuYW1lLG51bSxwb3Msc2l6ZSxjb2xvcix0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fYnV0dG9uUGFpci5lZGl0KG51bStcIlwiLHRtcEJ1dCk7XHJcbiAgICAgICAgdGhpcy5fc3ByLmFkZENoaWxkKHRtcEJ1dC5nZXRTcHIoKSk7XHJcbiAgICAgICAgdG1wQnV0LnNldEZ1bmMoZnVuKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluaMiemSrlxyXG4gICAgICogQHBhcmFtIG51bSDmjInpkq7nvJblj7dcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEJ1dHRvbihudW06bnVtYmVyKTpCdXR0b257XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2J1dHRvblBhaXIucmVhZChudW0rXCJcIik7XHJcbiAgICB9XHJcblxyXG59XHJcbiIsIi8vYXV0aG9yIE5hMkN1QzRPOFxyXG5pbXBvcnQgQ3VzdG9taXplZFNwcml0ZSBmcm9tIFwiLi9jdXN0b21pemVkU3ByXCI7XHJcbmltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi4vLi4vRG9kTWF0aFwiO1xyXG5pbXBvcnQgeyBFdmVudENlbnRyZSB9IGZyb20gXCIuLi8uLi8uLi9FdmVudC9FdmVudENlbnRyZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBDaGVzc0JvYXJkIGV4dGVuZHMgQ3VzdG9taXplZFNwcml0ZXtcclxuICAgIHByaXZhdGUgX2luaXRQb3M6VmVjMjtcclxuICAgIHByaXZhdGUgX2luaXRTaXplOlZlYzI7XHJcbiAgICBwcml2YXRlIF9udW1BcnI6bnVtYmVyW11bXTsvLzJkIGFyciB3aGljaCByZXByZXNlbnRzIHRoZSBjaGVzcyBib2FyZFxyXG4gICAgcHJpdmF0ZSBfcG9zVmVjMjpWZWMyOy8vaW5pdGlhbCBsb2NhdGlvbih4LHkpXHJcbiAgICBwcml2YXRlIF91bml0U2l6ZVZlYzI6VmVjMjsvL3VuaXQgc2l6ZSh3aWR0aCwgaGVpZ2h0KVxyXG4gICAgcHJpdmF0ZSBfZnJvbnRTcHJBcnI6Q3VzdG9taXplZFNwcml0ZVtdW107Ly9mcm9udCBzcHJcclxuICAgIHByaXZhdGUgX3NjYWxlOm51bWJlcjsvL3NjYWxlIGZvciB6b29taW5nXHJcbiAgICBwcml2YXRlIF9iYWNrR3JvdW5kQ29sb3I6c3RyaW5nOy8vYmFja2dyb3VuZCBjb2xvclxyXG4gICAgcHJpdmF0ZSBfZnJvbnRDb2xvcjpzdHJpbmc7Ly9mcm9udCBjb2xvciBcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaji+ebmOaehOmAoOWZqFxyXG4gICAgICogQHBhcmFtIGFyciDkuoznu7TmlbDnu4RcclxuICAgICAqIEBwYXJhbSBwb3NWZWMyIOi1t+Wni+WdkOagh1xyXG4gICAgICogQHBhcmFtIHVuaXRzaXplIOWNleS9jeWuvemrmFxyXG4gICAgICogQHBhcmFtIGJhY2tHcm91bmRDb2xvciDog4zmma/popzoibJcclxuICAgICAqIEBwYXJhbSBmcm9udENvbG9yIOagvOWtkOminOiJslxyXG4gICAgICogQHBhcmFtIGZhdGhlciDniLbnu5jlm77oioLngrlcclxuICAgICAqIEBwYXJhbSBzY2FsZSDnvKnmlL7mr5RcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoYXJyOm51bWJlcltdW10sIHBvc1ZlYzI6VmVjMiwgdW5pdHNpemU6VmVjMiwgYmFja0dyb3VuZENvbG9yOnN0cmluZywgZnJvbnRDb2xvcjpzdHJpbmcsIHNjYWxlOm51bWJlcil7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9udW1BcnIgPSBhcnI7XHJcbiAgICAgICAgdGhpcy5faW5pdFBvcyA9IHBvc1ZlYzI7XHJcbiAgICAgICAgdGhpcy5faW5pdFNpemUgPSB1bml0c2l6ZTtcclxuICAgICAgICB0aGlzLl9zY2FsZSA9IHNjYWxlO1xyXG4gICAgICAgIHRoaXMuX3Bvc1ZlYzIgPSBuZXcgVmVjMih0aGlzLl9pbml0UG9zLngqdGhpcy5fc2NhbGUsIHRoaXMuX2luaXRQb3MueSp0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fdW5pdFNpemVWZWMyID0gbmV3IFZlYzIodGhpcy5faW5pdFNpemUueCAqIHRoaXMuX3NjYWxlLHRoaXMuX2luaXRTaXplLnkgKiB0aGlzLl9zY2FsZSk7Ly9yZWNhbGN1bGF0ZSB1bml0U2l6ZVxyXG4gICAgICAgIHRoaXMuX2JhY2tHcm91bmRDb2xvciA9IGJhY2tHcm91bmRDb2xvcjtcclxuICAgICAgICB0aGlzLl9mcm9udENvbG9yID0gZnJvbnRDb2xvcjtcclxuICAgICAgICB0aGlzLmluaXRCYWNrZ3JvdW5kKCk7XHJcbiAgICAgICAgdGhpcy5zZXRDb2xvcih0aGlzLl9iYWNrR3JvdW5kQ29sb3IpO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlQ29sb3IoKTtcclxuICAgICAgICB0aGlzLmluaXRGcm9udFNwckFycigpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyRnJvbnRTcHIodGhpcy5fZnJvbnRDb2xvcik7XHJcbiAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2Uub24oRXZlbnRDZW50cmUuRVR5cGUuUEVSRk9STUFOQ0VfUkVTQ0FMRSgpLHRoaXMsdGhpcy5yZVNjYWxlKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkcmF3IGJhY2tncm91bmRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0QmFja2dyb3VuZCgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5zZXRQYXJhbSh0aGlzLl9wb3NWZWMyLngsdGhpcy5fcG9zVmVjMi55LHRoaXMuX251bUFyclswXS5sZW5ndGgqdGhpcy5fdW5pdFNpemVWZWMyLngsdGhpcy5fbnVtQXJyLmxlbmd0aCp0aGlzLl91bml0U2l6ZVZlYzIueSx0aGlzLl9iYWNrR3JvdW5kQ29sb3IpO1xyXG4gICAgICAgIHRoaXMubG9jYXRpb25BbmRTaXplKCk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkcmF3IGZyb250XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdEZyb250U3ByQXJyKCk6dm9pZHtcclxuICAgICAgICB0aGlzLl9mcm9udFNwckFyciA9IFtdOy8vaW5pdCBjdXN0U3ByQXJyXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuX251bUFyci5sZW5ndGg7IGkgKyspe1xyXG4gICAgICAgICAgICBsZXQgdG1wQXJyOkN1c3RvbWl6ZWRTcHJpdGVbXSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IoIGxldCBqID0gMDsgaiA8IHRoaXMuX251bUFyclswXS5sZW5ndGg7IGogKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IHRtcFNwcjpDdXN0b21pemVkU3ByaXRlID0gbmV3IEN1c3RvbWl6ZWRTcHJpdGUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQodG1wU3ByKTtcclxuICAgICAgICAgICAgICAgIHRtcFNwci5zZXRQYXJhbSgwK2oqdGhpcy5fdW5pdFNpemVWZWMyLngsMCtpKnRoaXMuX3VuaXRTaXplVmVjMi55LHRoaXMuX3VuaXRTaXplVmVjMi54LHRoaXMuX3VuaXRTaXplVmVjMi55LHRoaXMuX2Zyb250Q29sb3IsbmV3IFZlYzIoMSwxKSk7XHJcbiAgICAgICAgICAgICAgICB0bXBTcHIubG9jYXRpb25BbmRTaXplKCk7XHJcbiAgICAgICAgICAgICAgICB0bXBTcHIuc2V0Q29sb3IodGhpcy5fZnJvbnRDb2xvcik7XHJcbiAgICAgICAgICAgICAgICB0bXBTcHIuY2hhbmdlQ29sb3IoKTtcclxuICAgICAgICAgICAgICAgIHRtcFNwci56T3JkZXIgPSAtMTtcclxuICAgICAgICAgICAgICAgIHRtcEFyci5wdXNoKHRtcFNwcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fZnJvbnRTcHJBcnIucHVzaCh0bXBBcnIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGNvbG9yIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbmRlckZyb250U3ByKGNvbG9yOnN0cmluZyl7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuX2Zyb250U3ByQXJyLmxlbmd0aDsgaSArKyl7XHJcbiAgICAgICAgICAgIGZvciggbGV0IGogPSAwOyBqIDwgdGhpcy5fZnJvbnRTcHJBcnJbMF0ubGVuZ3RoOyBqICsrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Zyb250U3ByQXJyW2ldW2pdLnNldENvbG9yKGNvbG9yKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Zyb250U3ByQXJyW2ldW2pdLmNoYW5nZUNvbG9yKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkv67mlLnliY3mlrnmoLzlrZDpopzoibJcclxuICAgICAqIEBwYXJhbSBwb3NWZWMyIOW+heS/ruaUueagvOWtkOWdkOagh++8iHgsee+8iVxyXG4gICAgICogQHBhcmFtIGNvbG9yIOebruagh+minOiJslxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2hhbmdlRnJvbnRDb2xvcihwb3NWZWMyOlZlYzIsY29sb3I6c3RyaW5nKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX2Zyb250U3ByQXJyW3Bvc1ZlYzIueV1bcG9zVmVjMi54XS5zZXRDb2xvcihjb2xvcik7XHJcbiAgICAgICAgdGhpcy5fZnJvbnRTcHJBcnJbcG9zVmVjMi55XVtwb3NWZWMyLnhdLmNoYW5nZUNvbG9yKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuIXpmaTmiYDmnInlt7Lnu5jlm77lvaJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjbGVhckFsbCgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5ncmFwaGljcy5jbGVhcigpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9mcm9udFNwckFyci5sZW5ndGg7IGkgKyspe1xyXG4gICAgICAgICAgICBmb3IoIGxldCBqID0gMDsgaiA8IHRoaXMuX2Zyb250U3ByQXJyWzBdLmxlbmd0aDsgaiArKyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9mcm9udFNwckFycltpXVtqXS5ncmFwaGljcy5jbGVhcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YeN6K6+5qOL55uY57yp5pS+5q+UXHJcbiAgICAgKiBAcGFyYW0gbnVtIOe8qeaUvuavlFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVTY2FsZShudW06bnVtYmVyKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3NjYWxlID0gbnVtO1xyXG4gICAgICAgIHRoaXMuX3Bvc1ZlYzIgPSBuZXcgVmVjMih0aGlzLl9pbml0UG9zLngqdGhpcy5fc2NhbGUsdGhpcy5faW5pdFBvcy55KnRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl91bml0U2l6ZVZlYzIgPSBuZXcgVmVjMih0aGlzLl9pbml0U2l6ZS54ICogdGhpcy5fc2NhbGUsdGhpcy5faW5pdFNpemUueSAqIHRoaXMuX3NjYWxlKTsvL3JlY2FsY3VsYXRlIHVuaXRTaXplXHJcbiAgICAgICAgdGhpcy5jbGVhckFsbCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdEJhY2tncm91bmQoKTtcclxuICAgICAgICB0aGlzLmluaXRGcm9udFNwckFycigpO1xyXG4gICAgICAgIHRoaXMuc2V0Q29sb3IodGhpcy5fYmFja0dyb3VuZENvbG9yKTtcclxuICAgICAgICB0aGlzLmNoYW5nZUNvbG9yKCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJGcm9udFNwcih0aGlzLl9mcm9udENvbG9yKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiIsImltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi4vLi4vRG9kTWF0aFwiO1xyXG5cclxuLy9hdXRob3IgTmEyQ3VDNE84XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdXN0b21pemVkU3ByaXRlIGV4dGVuZHMgTGF5YS5TcHJpdGV7XHJcbiAgICBwcml2YXRlIF9jb2xvcjpzdHJpbmc7Ly/lj6/op4boioLngrnpopzoibJcclxuICAgIHByaXZhdGUgX2dyYXBoaWNTaGlmdDpWZWMyOy8v6YeN5Y+g57uY5Zu+5YGP56e76YePXHJcbiAgICBwcml2YXRlIF9jZW50cmFsU2hpZnQ7Ly/kuK3lv4Pnu5jlm77lgY/np7vph49cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNlbnRyYWxTaGlmdENvbG9yZWQoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuZ3JhcGhpY3MuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLmdyYXBoaWNzLmRyYXdSZWN0KC10aGlzLndpZHRoLzIsLXRoaXMuaGVpZ2h0LzIsdGhpcy53aWR0aCx0aGlzLmhlaWdodCx0aGlzLl9jb2xvcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBjb2xvciBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldENvbG9yKGNvbG9yOnN0cmluZyk6dm9pZHtcclxuICAgICAgICB0aGlzLl9jb2xvciA9IGNvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5L+u5pS56aKc6ImyXHJcbiAgICAgKiBAcGFyYW0gY29sb3Ig55uu5qCH6aKc6ImyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjaGFuZ2VDb2xvcigpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5ncmFwaGljcy5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuZ3JhcGhpY3MuZHJhd1JlY3QodGhpcy5fZ3JhcGhpY1NoaWZ0LngsdGhpcy5fZ3JhcGhpY1NoaWZ0LnksdGhpcy53aWR0aC0yKnRoaXMuX2dyYXBoaWNTaGlmdC54LHRoaXMuaGVpZ2h0LTIqdGhpcy5fZ3JhcGhpY1NoaWZ0LnksdGhpcy5fY29sb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u55u45YWz5Y+C5pWwXHJcbiAgICAgKiBAcGFyYW0gcG9zWCDotbflp4t4XHJcbiAgICAgKiBAcGFyYW0gcG9zWSDotbflp4t5XHJcbiAgICAgKiBAcGFyYW0gd2lkdGgg5a695bqmXHJcbiAgICAgKiBAcGFyYW0gaGVpZ2h0IOmrmOW6plxyXG4gICAgICogQHBhcmFtIGNvbG9yIOminOiJslxyXG4gICAgICogQHBhcmFtIGdyYXBoaWNTaGlmdCDmo4vnm5jlgY/np7vlgLxcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFBhcmFtKHBvc1g6bnVtYmVyLCBwb3NZOm51bWJlciwgd2lkdGg6bnVtYmVyLCBoZWlnaHQ6bnVtYmVyLCBjb2xvcjpzdHJpbmcgPSB0aGlzLl9jb2xvciwgZ3JhcGhpY1NoaWZ0OlZlYzIgPSBuZXcgVmVjMigwLDApKTp2b2lke1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMueCA9IHBvc1g7XHJcbiAgICAgICAgdGhpcy55ID0gcG9zWTtcclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5zZXRDb2xvcihjb2xvcik7XHJcbiAgICAgICAgdGhpcy5fZ3JhcGhpY1NoaWZ0ID0gZ3JhcGhpY1NoaWZ0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5L+u5pS55Z2Q5qCH5ZKM5aSn5bCPXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2NhdGlvbkFuZFNpemUoKTp2b2lke1xyXG4gICAgICAgIHRoaXMucG9zKHRoaXMueCx0aGlzLnkpLnNpemUodGhpcy53aWR0aCx0aGlzLmhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDph43orr7lnZDmoIdcclxuICAgICAqIEBwYXJhbSBwb3NWZWMyIOebruagh+WdkOagh1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVsb2NhdGUocG9zVmVjMjpWZWMyKTp2b2lke1xyXG4gICAgICAgIHRoaXMueCA9IHBvc1ZlYzIueDtcclxuICAgICAgICB0aGlzLnkgPSBwb3NWZWMyLnk7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbkFuZFNpemUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmHjeiuvuWuvemrmFxyXG4gICAgICogQHBhcmFtIHNpemVWZWMyIOebruagh+WuvemrmFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVTaXplKHNpemVWZWMyOlZlYzIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHNpemVWZWMyLng7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBzaXplVmVjMi55O1xyXG4gICAgICAgIHRoaXMuY2hhbmdlQ29sb3IoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuW9k+WJjeWbvuW9oui1t+Wni+WdkOagh1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0UG9zKCk6VmVjMntcclxuICAgICAgICByZXR1cm4gbmV3IFZlYzIodGhpcy54LHRoaXMueSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57lt7Lnu5jljLrln5/lpKflsI9cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFNpemUoKTpWZWMye1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjMih0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogXHJcbiAgICAgKiDov5Tlm57lvZPliY3lt7Lnu5jljLrln5/popzoibJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldENvbG9yKCk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb2xvcjtcclxuICAgIH1cclxufSIsIi8vYXV0aG9yIE5hMkN1QzRPOFxyXG5cclxuaW1wb3J0IEFjdG9yUlUgZnJvbSBcIi4vU3ltYm9saXplZFJlbmRlclwiO1xyXG5pbXBvcnQgeyBLVlBhaXIgfSBmcm9tIFwiLi4vLi4vRG9kRGF0YVN0cnVjdHVyZVwiO1xyXG5pbXBvcnQgeyBNeVN5bWJvbCB9IGZyb20gXCIuLi8uLi8uLi9GaXgvRml4U3ltYm9sXCI7XHJcblxyXG5cclxuLy/lgqjlrZjmiYDmnInnu5jlm77oioLngrnlr7nosaFcclxuZXhwb3J0IGNsYXNzIEFjdG9yQm94e1xyXG4gICAgcHVibGljIHN0YXRpYyBCb3g6S1ZQYWlyPEFjdG9yUlU+ID0gbmV3IEtWUGFpcigpO1xyXG4gICAgcHVibGljIHN0YXRpYyBhZGQoYWN0OkFjdG9yUlUsc3ltYjpNeVN5bWJvbCk6dm9pZHtcclxuICAgICAgICBBY3RvckJveC5Cb3guZWRpdChzeW1iLmRhdGErXCJcIixhY3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0KHN5bTpudW1iZXIpOkFjdG9yUlV7XHJcbiAgICAgICAgcmV0dXJuIEFjdG9yQm94LkJveC5yZWFkKHN5bStcIlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxufSIsImltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi4vQ29tbW9uL0RvZE1hdGhcIjtcclxuaW1wb3J0IHsgTXlTeW1ib2wgfSBmcm9tIFwiLi4vRml4L0ZpeFN5bWJvbFwiO1xyXG4vLy8vLy9cclxuZXhwb3J0IGNsYXNzIEV2ZW50Q2VudHJle1xyXG4gICAgcHVibGljIHN0YXRpYyBpbnN0YW5jZTpFdmVudENlbnRyZTtcclxuICAgIHB1YmxpYyBzdGF0aWMgRVR5cGU6RVR5cGU7XHJcbiAgICBwdWJsaWMgc3RhdGljIGluaXQoKTp2b2lke1xyXG4gICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlID0gbmV3IEV2ZW50Q2VudHJlKCk7XHJcbiAgICAgICAgRXZlbnRDZW50cmUuRVR5cGUgPSBuZXcgRVR5cGUoKTtcclxuICAgICAgICBFdmVudENlbnRyZS5pbml0ID0gKCk9Pnt9O1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIF9jZW50cmU6TGF5YS5FdmVudERpc3BhdGNoZXIgPSBuZXcgTGF5YS5FdmVudERpc3BhdGNoZXIoKTtcclxuXHJcbiAgICBwdWJsaWMgb24odHlwZTpzdHJpbmcsIGNhbGxlcjphbnksIGxpc3RlbmVyOkZ1bmN0aW9uLCBhcmdzPzphbnlbXSk6dm9pZHtcclxuICAgICAgICB0aGlzLl9jZW50cmUub24odHlwZSxjYWxsZXIsbGlzdGVuZXIsYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGV2ZW50KHR5cGU6c3RyaW5nLCBhcmdzPzphbnkpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fY2VudHJlLmV2ZW50KHR5cGUsYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9mZih0eXBlOnN0cmluZywgY2FsbGVyOmFueSwgbGlzdGVuZXI6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuX2NlbnRyZS5vZmYodHlwZSwgY2FsbGVyLCBsaXN0ZW5lcik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKXt9XHJcbn1cclxuXHJcblxyXG5jbGFzcyBFVHlwZSB7XHJcbiAgICBwdWJsaWMgTEVBVkUocG9zOlZlYzIsIGlkZW50aXR5OnN0cmluZyk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBgJHtpZGVudGl0eX06Q09MTElTSU9OX0VWRU5UX0xFQVZFX0ZST00oJHtwb3MueH18JHtwb3MueX0pYDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBFTlRSRShwb3M6VmVjMiwgaWRlbnRpdHk6c3RyaW5nKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIGAke2lkZW50aXR5fTpDT0xMSVNJT05fRVZFTlRfRU5UUkVfVE8oJHtwb3MueH18JHtwb3MueX0pYDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG5ldyBhZGRlZCBmb3IgcGVyZm9ybWFuY2Ugc3RhcnRzIGhlcmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIFBFUkZPUk1BTkNFX1JFU0NBTEUoKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIFwiUkVTQ0FMRVwiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBQRVJGT1JNQU5DRV9URVhUX1NXSVRDSCgpOnN0cmluZ3tcclxuICAgICAgICByZXR1cm4gXCJURVhUX1NXSVRDSFwiO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBuZXcgYWRkZWQgZm9yIHBlcmZvcm1hbmNlIGVuZHMgaGVyZVxyXG4gICAgICovXHJcbn0iLCJleHBvcnQgaW50ZXJmYWNlIFN5bWJvbGl6ZWR7XHJcbiAgICBzeW1ib2w6TXlTeW1ib2w7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNeVN5bWJvbHtcclxuICAgIHByaXZhdGUgc3RhdGljIGNvdW50Om51bWJlciA9IDA7XHJcblxyXG4gICAgcHJpdmF0ZSBfZGF0YTpudW1iZXI7XHJcblxyXG4gICAgcHVibGljIGdldCBkYXRhKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IE15U3ltYm9sLmNvdW50O1xyXG4gICAgICAgIE15U3ltYm9sLmNvdW50ICs9IDE7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBGaXhUaW1lIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZnJhbWVSYXRlOiBudW1iZXIgPSA2MDtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZGVsdGFUaW1lOiBudW1iZXIgPSAxIC8gRml4VGltZS5mcmFtZVJhdGU7XHJcbiAgICBwdWJsaWMgc3RhdGljIGZyYW1lQ291bnQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgZWxhcHNlZFRpbWU6IG51bWJlcjtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5mcmFtZUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLmVsYXBzZWRUaW1lID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmZyYW1lQ291bnQrKztcclxuICAgICAgICB0aGlzLmVsYXBzZWRUaW1lICs9IHRoaXMuZGVsdGFUaW1lO1xyXG4gICAgfVxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXHJcbmltcG9ydCBHYW1lIGZyb20gXCIuL1NjZW5lU2NyaXB0L0dhbWVcIlxuaW1wb3J0IExvYWRpbmcgZnJvbSBcIi4vU2NlbmVTY3JpcHQvTG9hZGluZ1wiXHJcbi8qXHJcbiog5ri45oiP5Yid5aeL5YyW6YWN572uO1xyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ29uZmlne1xyXG4gICAgc3RhdGljIHdpZHRoOm51bWJlcj0xODAwO1xyXG4gICAgc3RhdGljIGhlaWdodDpudW1iZXI9OTAwO1xyXG4gICAgc3RhdGljIHNjYWxlTW9kZTpzdHJpbmc9XCJub3NjYWxlXCI7XHJcbiAgICBzdGF0aWMgc2NyZWVuTW9kZTpzdHJpbmc9XCJub25lXCI7XHJcbiAgICBzdGF0aWMgYWxpZ25WOnN0cmluZz1cInRvcFwiO1xyXG4gICAgc3RhdGljIGFsaWduSDpzdHJpbmc9XCJsZWZ0XCI7XHJcbiAgICBzdGF0aWMgc3RhcnRTY2VuZTphbnk9XCJMb2FkaW5nU2NlbmUuc2NlbmVcIjtcclxuICAgIHN0YXRpYyBzY2VuZVJvb3Q6c3RyaW5nPVwiXCI7XHJcbiAgICBzdGF0aWMgZGVidWc6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBzdGF0OmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgcGh5c2ljc0RlYnVnOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgZXhwb3J0U2NlbmVUb0pzb246Ym9vbGVhbj10cnVlO1xyXG4gICAgY29uc3RydWN0b3IoKXt9XHJcbiAgICBzdGF0aWMgaW5pdCgpe1xyXG4gICAgICAgIHZhciByZWc6IEZ1bmN0aW9uID0gTGF5YS5DbGFzc1V0aWxzLnJlZ0NsYXNzO1xyXG4gICAgICAgIHJlZyhcIlNjZW5lU2NyaXB0L0dhbWUudHNcIixHYW1lKTtcbiAgICAgICAgcmVnKFwiU2NlbmVTY3JpcHQvTG9hZGluZy50c1wiLExvYWRpbmcpO1xyXG4gICAgfVxyXG59XHJcbkdhbWVDb25maWcuaW5pdCgpOyIsImltcG9ydCB7IENvbGlFbWl0IH0gZnJvbSBcIi4vQWN0b3JNb2R1bGVzL0NvbGlNZXNzYWdlXCI7XHJcbmltcG9ydCB7IFByb2ZpbGUgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvUHJvZmlsZVwiO1xyXG5pbXBvcnQgeyBTeW1ib2xpemVkLCBNeVN5bWJvbCB9IGZyb20gXCIuLi8uLi9GaXgvRml4U3ltYm9sXCI7XHJcbmltcG9ydCB7IEJ1ZmYgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvQnVmZlwiO1xyXG5pbXBvcnQgeyBBdGtTdGF0ZU1hY2hpbmUgfSBmcm9tIFwiLi9BdHRhY2svQXRrQWJzdFwiO1xyXG5pbXBvcnQgeyBEYW1hZ2UgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvRGFtYWdlXCI7XHJcbmltcG9ydCB7IEFjdG9yVHlwZSB9IGZyb20gXCIuLi8uLi9Db21tb24vRG9kS2V5XCI7XHJcbmltcG9ydCBBY3RvclN0YXRlTWdyLCB7IEFjdG9yU3RhdGVJRCB9IGZyb20gXCIuL1N0YXRlL0FjdG9yU3RhdGVGc21cIjtcclxuaW1wb3J0IHsgQWN0b3JCdWZmTWdyIH0gZnJvbSBcIi4vQWN0b3JNb2R1bGVzL0FjdG9yQnVmZk1nclwiO1xyXG5pbXBvcnQgeyBUcmFuc2Zvcm0gfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvVHJhbnNmb3JtXCI7XHJcbmltcG9ydCB7IFVuaXRSZW5kZXIgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvVW5pdFJlbmRlclwiO1xyXG5pbXBvcnQgeyBBbmltYXRpb24gfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvQW5pbWF0aW9uXCI7XHJcbmltcG9ydCBSb3V0ZSBmcm9tIFwiLi9BY3RvclJvdXRlXCI7XHJcbmltcG9ydCB7IEFjdG9yU2tpbGwgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvQWN0b3JTa2lsbFwiO1xyXG5pbXBvcnQgeyBBY3RvckNvc3QgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvQWN0b3JDb3N0XCI7XHJcbmltcG9ydCB7IEJsb2NrZXIgfSBmcm9tIFwiLi9BdHRhY2svQmxvY2tlclwiO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbi8v5Z+65pys5Y6f5YiZ77ya5bCR55So57un5om/77yM5aSa55So57uE5ZCIXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjdG9yIGltcGxlbWVudHMgU3ltYm9saXplZHtcclxuICAgIHB1YmxpYyBzeW1ib2w6IE15U3ltYm9sOyAvL+WFqOWxgOWUr+S4gOeahOagh+ivhuaVsOWtl1xyXG4gICAgcHVibGljIHR5cGU6IEFjdG9yVHlwZTsgLy/pu5jorqTouqvku73kuLpBY3RvclxyXG5cclxuICAgIHB1YmxpYyBzdGF0ZTogQWN0b3JTdGF0ZU1ncjsgLy/nirbmgIHmnLog57uf562554q25oCB5pu05pawXHJcblxyXG4gICAgcHVibGljIHByb2ZpbGU6UHJvZmlsZTsvL+WfuuacrOWxnuaAp+S4juiuv+mXruaWueazleWQiOmbhlxyXG5cclxuICAgIHB1YmxpYyBhdGs6IEF0a1N0YXRlTWFjaGluZTtcclxuICAgIHB1YmxpYyBjb2xpRW1pdDpDb2xpRW1pdDtcclxuICAgIHB1YmxpYyBibG9ja2VyOkJsb2NrZXI7XHJcbiAgICBwdWJsaWMgYnVmZk1ncjpBY3RvckJ1ZmZNZ3I7XHJcbiAgICBwdWJsaWMgdHJhbnNmb3JtOlRyYW5zZm9ybTtcclxuICAgIHB1YmxpYyByZW5kZXI6VW5pdFJlbmRlcjtcclxuICAgIHB1YmxpYyBhbmltYXRpb246QW5pbWF0aW9uO1xyXG4gICAgcHVibGljIHJvdXRlOlJvdXRlO1xyXG4gICAgcHVibGljIHNraWxsOkFjdG9yU2tpbGw7XHJcbiAgICBwdWJsaWMgY29zdDpBY3RvckNvc3Q7XHJcblxyXG4gICAgLy9UT0RP77ya5Y675YyF5LiA5Liq57uE5Lu2XHJcbiAgICAvLyAvKipcclxuICAgIC8vICAqIOebruagh+mAieaLqeWZqFxyXG4gICAgLy8gICovXHJcbiAgICAvLyBwdWJsaWMgc2Vla2VyOiBTZWVrZXI7XHJcblxyXG4gICAgLy8gLypcclxuICAgIC8vICog5b2T5YmN6ZSB5a6a55uu5qCHXHJcbiAgICAvLyAqICovXHJcbiAgICAvLyBwdWJsaWMgZm9jdXM6IEFjdG9yO1xyXG5cclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IodHlwZTogQWN0b3JUeXBlLCByZXM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc3ltYm9sID0gbmV3IE15U3ltYm9sKCk7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gbmV3IEFjdG9yU3RhdGVNZ3IodGhpcyk7XHJcbiAgICAgICAgLy8gYWNjb3JkaW5nIHRvIGRpZmZlcmVudCB0eXBlLCBhZGQgZGlmZmVyZW50IGNvbXBvbmVudHMgdG8gdGhpcyBhY3Rvci4gXHJcblxyXG4gICAgICAgIHRoaXMucHJvZmlsZSA9IG5ldyBQcm9maWxlKHRoaXMsIHJlc1sneHh4J10pOyBcclxuICAgICAgICB0aGlzLmF0ayA9IG5ldyBBdGtTdGF0ZU1hY2hpbmUodGhpcywgcmVzWyd4eHgnXSk7XHJcbiAgICAgICAgdGhpcy5ibG9ja2VyID0gbmV3IEJsb2NrZXIodGhpcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5idWZmTWdyID0gbmV3IEFjdG9yQnVmZk1ncih0aGlzLCByZXNbJ3h4eCddKTtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybSA9IG5ldyBUcmFuc2Zvcm0odGhpcyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIgPSBuZXcgVW5pdFJlbmRlcih0aGlzKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IG5ldyBBbmltYXRpb24odGhpcywgcmVzWyd4eHgnXSk7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgaWYgKEFjdG9yVHlwZS5Nb25zdGVyID09IHRoaXMudHlwZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlID0gbmV3IFJvdXRlKHRoaXMsIHJlc1sneHh4J10pO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKEFjdG9yVHlwZS5PcGVyYXRvciA9PSB0aGlzLnR5cGUpIHtcclxuICAgICAgICAgICAgdGhpcy5za2lsbCA9IG5ldyBBY3RvclNraWxsKHRoaXMsIHJlc1sneHh4J10pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5jb3N0ID0gbmV3IEFjdG9yQ29zdCh0aGlzKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhd2FrZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXRlLnJ1blN0YXRlKEFjdG9yU3RhdGVJRC5QcmVwcmVkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGUudXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIC8vIHJlc2V0IGNsZWFyIHJlc291cmNlIHJlbGF0ZWQgbW9kdWxlXHJcbiAgICAgICAgLy8gdGhpcy5yZW5kZXIucmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0T25NYXAoKTogdm9pZCB7XHJcbiAgICAgICAgLy9UT0RPXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFBvc2l0aW9uKCk6IHZvaWQge1xyXG4gICAgICAgIC8vVE9ET1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pS75Ye75LiA5Liq5oiW5aSa5LiqQWN0b3Lnm67moIdcclxuICAgICAqIDIwMjAvMy81IOaUu+WHu+mAu+i+keW3suS7juS6i+S7tuinpuWPkeaUueS4uuebtOaOpeiwg+eUqFxyXG4gICAgICog5Y+R6LW35ZKM5o6l5pS25pS75Ye755qE6YC76L6R5Z2H5bCB6KOF5ZyoQWN0b3LnsbvkuK1cclxuICAgICAqIEBwYXJhbSB2aWN0aW0gXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhdHRhY2soLi4udmljdGltOkFjdG9yW10pOnZvaWR7XHJcbiAgICAgICAgbGV0IGRtZzpEYW1hZ2UgPSB0aGlzLnByb2ZpbGUuZ2VuZXJhdGVEYW1hZ2UodGhpcyk7XHJcblxyXG4gICAgICAgIHZpY3RpbS5mb3JFYWNoKGVsZT0+e1xyXG4gICAgICAgICAgICB0aGlzLmJlQXR0YWNrZWQoZG1nLmNvcHkoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog6KKr5pS75Ye7XHJcbiAgICAgKiBAcGFyYW0gZGFtYWdlIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYmVBdHRhY2tlZChkYW1hZ2U6RGFtYWdlKTp2b2lke1xyXG4gICAgICAgIC8vQHRvZG9cclxuICAgICAgICAvL+WHj+WwkeeUn+WRveWAvFxyXG4gICAgICAgIC8v5Y+R5Ye65pS75Ye75LqL5Lu2XHJcbiAgICAgICAgLy/vvIjlj6/og73vvInlj5Hlh7rmrbvkuqHkuovku7ZcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDnp7vpmaRidWZmXHJcbiAgICAgKiBAcGFyYW0gYnVmZiBcclxuICAgICAqIOaOpeWPo+enu+mZpFxyXG4gICAgICovXHJcbiAgICAvLyBwdWJsaWMgcmVtb3ZlQnVmZihidWZmOkJ1ZmYpOnZvaWR7XHJcbiAgICAvLyAgICAgbGV0IGk6bnVtYmVyID0gdGhpcy5idWZmTGlzdC5pbmRleE9mKGJ1ZmYpO1xyXG4gICAgLy8gICAgIGlmIChpID09IC0xKSB7XHJcbiAgICAvLyAgICAgICAgIHJldHVybjtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgdGhpcy5idWZmTGlzdFtpXS5vbkRlc3Ryb3koKTtcclxuICAgIC8vICAgICB0aGlzLmJ1ZmZMaXN0LnNwbGljZShpLDEpO1xyXG4gICAgLy8gfVxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IEFjdG9yIGZyb20gXCIuL0FjdG9yXCI7XHJcbmltcG9ydCB7IEFjdG9yVHlwZSB9IGZyb20gXCIuLi8uLi9Db21tb24vRG9kS2V5XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3Rvck1nciB7XHJcbiAgICBwdWJsaWMgYWN0b3JzOiBBcnJheTxBY3Rvcj47XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmFjdG9ycyA9IG5ldyBBcnJheTxBY3Rvcj4oKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdChyZXM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX2luaXRFbmVteShyZXMpO1xyXG4gICAgICAgIHRoaXMuX2luaXRPcHJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGF3YWtlKCk6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hY3RvcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGFjdG9yID0gdGhpcy5hY3RvcnNbaV07XHJcbiAgICAgICAgICAgIGFjdG9yLmF3YWtlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYWN0b3IgPSB0aGlzLmFjdG9yc1tpXTtcclxuICAgICAgICAgICAgYWN0b3IudXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYWN0b3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhY3RvciA9IHRoaXMuYWN0b3JzW2ldO1xyXG4gICAgICAgICAgICBhY3Rvci5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY3JlYXRlQWN0b3IodHlwZTogQWN0b3JUeXBlLCByZXM6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGxldCBhY3RvciA9IG5ldyBBY3Rvcih0eXBlLCByZXMpO1xyXG4gICAgICAgIHRoaXMuYWN0b3JzLnB1c2goYWN0b3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRBY3RvckJ5SUQoSUQ6IG51bWJlcik6IEFjdG9yIHwgbnVsbCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYWN0b3IgPSB0aGlzLmFjdG9yc1tpXTtcclxuICAgICAgICAgICAgaWYgKElEID09IGFjdG9yLnN5bWJvbC5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYWN0b3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfaW5pdEVuZW15KHJlczogYW55KSB7XHJcbiAgICAgICAgLy9UT0RPIHVzZSBsZXZlbCByZXMgZGF0YSBpbml0IGVuZW15IGFjdG9yc1xyXG4gICAgICAgIC8vZWcuXHJcbiAgICAgICAgLy9sZXQgZW5lbXlSZXMgPSByZXNbJ3h4eHh4J107XHJcbiAgICAgICAgLy9hY3RvciA9IHRoaXMuY3JlYXRlQWN0b3IoQWN0b3JUeXBlLkVuZW15ICxlbmVteVJlcyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgX2luaXRPcHJ0KCkge1xyXG4gICAgICAgIC8vVE9ETyB1c2UgcHJlIGNob29zZSBvcHJ0IGxpc3QgdG8gaW5pdCBzZWxmIGFjdG9yc1xyXG4gICAgICAgIC8vbGV0IGFycmF5ID0gUmhvZGVzR2FtZXMuSW5zdGFuY2UuZ2FtZWRhdGEuY3VycmVudEZvcm1hdGlvbjtcclxuICAgICAgICAvL2ZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAvLyAgIGxldCBpZCA9IGFycmF5W2ldO1xyXG4gICAgICAgIC8vICAgbGV0IHJlcyA9IERvZFJlc291cmNlTWdyLkluc3RhbmNlLmdldEN1cnJlbnRPcGVyYXJvckRhdGFCeUlEKGlkKTtcclxuICAgICAgICAvLyAgIGxldCBhY3RvciA9IHRoaXMuY3JlYXRlQWN0b3IoQWN0b3JUeXBlLk9wZXJhdG9yLCByZXMpXHJcbiAgICAgICAgLy99XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQWN0b3JCdWZmTWdye1xyXG4gICAgY29uc3RydWN0b3Ioa2VlcGVyOkFjdG9yLCByZXM6YW55KXtcclxuICAgICAgICBcclxuICAgIH1cclxufSIsImltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBY3RvckNvc3R7XHJcbiAgICBjb25zdHJ1Y3RvcihrZWVwZXI6QWN0b3Ipe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9BY3RvclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFjdG9yU2tpbGx7XHJcbiAgICBjb25zdHJ1Y3RvcihrZWVwZXI6QWN0b3IsIHJlczphbnkpe1xyXG5cclxuICAgIH1cclxufSIsImltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBbmltYXRpb257XHJcbiAgICBjb25zdHJ1Y3RvcihrZWVwZXI6QWN0b3IsIHJlczphbnkpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9BY3RvclwiO1xyXG5cclxuZXhwb3J0IGVudW0gRGFtYWdlVHlwZXtcclxuICAgIFBZU0lDQUwsXHJcbiAgICBNQUdJQ0FMLFxyXG4gICAgVFJVRSxcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERhbWFnZXtcclxuXHJcbiAgICBwdWJsaWMgc291cmNlOkFjdG9yID0gbnVsbDsvL+S8pOWus+adpea6kFxyXG4gICAgcHVibGljIHZhbHVlOm51bWJlciA9IDA7Ly/mlLvlh7vliptcclxuICAgIHB1YmxpYyB0eXBlOkRhbWFnZVR5cGUvL+S8pOWus+exu+Wei1xyXG4gICAgcHVibGljIHByaW1hcnk6Ym9vbGVhbiA9IHRydWU7Ly/mmK/lkKbkuLrpnZ7pl7TmjqXkvKTlrrPvvIjpl7TmjqXkvKTlrrPkuI3kvJrop6blj5HmmJ/nhorjgIHlubTnmoTlj43nlLLkuYvnsbvnmoTmlYjmnpzvvIlcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2U6QWN0b3IsIHZhbHVlOm51bWJlciwgdHlwZTpEYW1hZ2VUeXBlKXtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvcHkoKTpEYW1hZ2V7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBEYW1hZ2UodGhpcy5zb3VyY2UsIHRoaXMudmFsdWUsIHRoaXMudHlwZSk7XHJcbiAgICAgICAgcmVzdWx0LnR5cGUgPSB0aGlzLnR5cGU7XHJcbiAgICAgICAgcmVzdWx0LnByaW1hcnkgPSB0aGlzLnByaW1hcnk7XHJcbiAgICAgICAgcmVzdWx0LnNvdXJjZSA9IHRoaXMuc291cmNlO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBEYW1hZ2UsIERhbWFnZVR5cGUgfSBmcm9tIFwiLi9EYW1hZ2VcIjtcclxuaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9BY3RvclwiO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBQcm9maWxl57G75piv5YKo5a2Y5Y2V5L2N5Z+65pys5pWw5o2u77yI5aaC5pS75Ye75Yqb44CB6Ziy5b6h5Yqb562J77yJ55qE57G7XHJcbiAqIOWug+i/mOaPkOS+m+S4gOWIh+eUqOS6juiOt+WPlkFjdG9y5L+h5oGv55qE5o6l5Y+j77yI5aaC5piv5ZCm6IO95aSf6KGM5Yqo44CB5piv5ZCm6IO95aSf6Zi75oyh77yJXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUHJvZmlsZSB7XHJcbiAgICBwdWJsaWMgbmFtZTogU3RyaW5nID0gXCJDaGFuZGxlciBCaW5nXCI7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkga2VlcGVyOkFjdG9yO1xyXG5cclxuICAgIHByaXZhdGUgX3ByZXBUaW1lOiBudW1iZXIgPSAxMDA7Ly/liY3mkYfml7bpl7RcclxuICAgIHByaXZhdGUgX2FmdGVyVGltZTogbnVtYmVyID0gMTAwOy8v5ZCO5pGH5pe26Ze0XHJcbiAgICBwcml2YXRlIF9icmVha3Rocm91Z2g6IG51bWJlciA9IDE7Ly/noLTpmaTpmLvmjKHog73liptcclxuICAgIHB1YmxpYyBpbnZpc2libGU6IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpumakOW9olxyXG4gICAgcHVibGljIGJsb2NrZWQ6IGJvb2xlYW4gPSBmYWxzZTsvL+W3suiiq+mYu+aMoVxyXG4gICAgcHVibGljIGJsb2NrZXI6IEFjdG9yOy8v6Zi75oyh6ICFXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkvKTlrrPorqHnrpfnm7jlhbPnmoTkv67mlLnlkozorr/pl67mjqXlj6NcclxuICAgICAqIOS9nOiAhe+8muiRsVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXR0YWNrUG93ZXI6IG51bWJlciA9IDEwMDsvL+aUu+WHu+WKm1xyXG4gICAgcHVibGljIGF0a1NjYWxlOm51bWJlciA9IDE7Ly/mlLvlh7vlgI3njodcclxuICAgIHB1YmxpYyBhdGtCdWZmOm51bWJlciA9IDE7Ly/mlLvlh7vnmb7liIbmr5Tmj5DljYdcclxuICAgIHB1YmxpYyBhcm1vdXI6bnVtYmVyID0gNTA7Ly/niannkIbpmLLlvqFcclxuICAgIHB1YmxpYyBtYWdpY0FybW91cjpudW1iZXIgPSAwOy8v5rOV5pyv5oqX5oCnXHJcbiAgICBwdWJsaWMgZG1nVHlwZTpEYW1hZ2VUeXBlID0gRGFtYWdlVHlwZS5QWVNJQ0FMOy8v5Lyk5a6z57G75Z6LXHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGtlZXBlcjpBY3RvciwgcmVzOmFueSl7XHJcbiAgICAgICAgdGhpcy5rZWVwZXIgPSBrZWVwZXI7XHJcbiAgICAgICAgLy90b2RvOiBhYm91dCByZXNcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS8oOWFpeS4gOS4qkFjdG9y77yM6L+U5Zue5Lyk5a6z5a+56LGhXHJcbiAgICAgKiBAcGFyYW0gc291cmNlIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2VuZXJhdGVEYW1hZ2Uoc291cmNlOkFjdG9yKTpEYW1hZ2V7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBEYW1hZ2Uoc291cmNlLCB0aGlzLmF0dGFja1Bvd2VyKnRoaXMuYXRrU2NhbGUqdGhpcy5hdGtCdWZmLCB0aGlzLmRtZ1R5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoaXRQb2ludDogbnVtYmVyID0gMTA7Ly/nlJ/lkb3lgLxcclxuICAgIHB1YmxpYyBtYXhIaXRQb2ludDogbnVtYmVyID0gMTA7Ly/mnIDpq5jnlJ/lkb3lgLxcclxuXHJcbiAgICAvKipcclxuICAgICAqIGJ5IFhXVlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaGF0ZUxldmVsOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGF0dGFja1JhbmdlUmFkaXVzOiBudW1iZXI7XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXQgcHJlcFRpbWUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcHJlcFRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBhZnRlclRpbWUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYWZ0ZXJUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgYnJlYWt0aHJvdWdoKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JyZWFrdGhyb3VnaDtcclxuICAgIH1cclxuXHJcbiAgIFxyXG59XHJcblxyXG4vKipcclxuICog5piv5ZCm6ZyA6KaB5ZyocHJvZmlsZeS4reWwhuS4jeWQjOeahOaVsOWAvOWIhuexu++8n1xyXG4gKlxyXG4gKi8iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcblxyXG4vKipcclxuICog5a+55LiA5Liq5Y2V5L2N55qE5Yeg5L2V54q25oCB55qE5o+P6L+wXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVHJhbnNmb3Jte1xyXG4gICAgY29uc3RydWN0b3Ioa2VlcGVyOkFjdG9yKXtcclxuICAgICAgICBcclxuICAgIH1cclxufSIsImltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBVbml0UmVuZGVye1xyXG4gICAgY29uc3RydWN0b3Ioa2VlcGVyOkFjdG9yKXtcclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4vQWN0b3JcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlIHtcclxuICAgIGNvbnN0cnVjdG9yKGtlZXBlcjpBY3RvciwgcmVzOmFueSl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0tWUGFpcn0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Eb2REYXRhU3RydWN0dXJlXCI7XHJcbmltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuaW1wb3J0IHtFdmVudENlbnRyZX0gZnJvbSBcIi4uLy4uLy4uL0V2ZW50L0V2ZW50Q2VudHJlXCI7XHJcbmltcG9ydCB7IFNlZWtlciB9IGZyb20gXCIuL0FjdG9yU2Vla2VyXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIGJ5IFhXVlxyXG4gKiBcclxuICog6JGxIOS/ruaUueS6jiAzLzE4XHJcbiAqICAgICAg5bCGU2Vla2Vy5oyq5YWl5pS75Ye754q25oCB5py65YaF77yM5LiN55SxQWN0b3LmjIHmnIlcclxuICogICAgICDkuI3lkIznmoTmlLvlh7vojIPlm7TnlLFTZWVrZXLmm7/mjaLmnaXlrp7njrBcclxuICogICAgICDkuI3lkIznmoTmlLvlh7vpgLvovpHvvIjojIPlm7Qv5Y2V5L2T77yJ55Sx5pu/5o2i54q25oCB5py65YaF55qE54q25oCB5a6e5L6L5a6e546wXHJcbiAqICAgICAgQXRrU3RhdGVNYWNoaW5l6LSf6LSj5a+55aSW5o+Q5L6b5omA5pyJ5L+u5pS5L+iuv+mXruaOpeWPo1xyXG4gKiAgICAgIOS7jemcgOWvueatpOi/m+ihjOi/m+S4gOatpeinhOWIku+8iOWNleS9ky/lpJrkvZMv576k5L2T5pS75Ye76YC76L6R5piv5LuF55Sx5LiA5Liq5Y+C5pWw5a6e546w77yM6L+Y5piv55Sx5aSa5oCB5a6e546w77yJXHJcbiAqICAgICAgLy90b2RvOuaXtumXtOe0r+WKoOmAu+i+keaUueWPmFxyXG4gKiBcclxuICovXHJcblxyXG5lbnVtIFN0YXRlVHlwZSB7XHJcbiAgICBXQUlUID0gXCJXQUlUXCIsXHJcbiAgICBQUkVQQVJFID0gXCJQUkVQQVJFXCIsXHJcbiAgICBBRlRFUl9BVEsgPSBcIkFGVEVSX0FUS1wiXHJcbn1cclxuXHJcbmludGVyZmFjZSBTdGF0ZSB7XHJcbiAgICBleGVjdXRlKG1hY2hpbmU6IEF0a1N0YXRlTWFjaGluZSk6IHZvaWRcclxuXHJcbiAgICByZXNldCgpOiB2b2lkXHJcbn1cclxuXHJcbmFic3RyYWN0IGNsYXNzIEJhc2VTdGF0ZSBpbXBsZW1lbnRzIFN0YXRlIHtcclxuICAgIHByb3RlY3RlZCB0aW1lOiBudW1iZXIgPSAwOy8v5pe26Ze057Sv5Yqg6YC76L6R5pS55Y+YXHJcblxyXG4gICAgcHVibGljIHJlc2V0KCkge1xyXG4gICAgICAgIHRoaXMudGltZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgYWJzdHJhY3QgZXhlY3V0ZShtYWNoaW5lOiBBdGtTdGF0ZU1hY2hpbmUpOiB2b2lkO1xyXG5cclxufVxyXG5cclxuY2xhc3MgV2FpdCBleHRlbmRzIEJhc2VTdGF0ZSB7XHJcblxyXG4gICAgcHVibGljIGV4ZWN1dGUobWFjaGluZTogQXRrU3RhdGVNYWNoaW5lKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZm9jdXMgPSBtYWNoaW5lLnNlZWtlci5nZXRGb2N1cygpO1xyXG4gICAgICAgIGlmIChmb2N1cyAhPT0gbnVsbCkgey8v5aaC5p6c6IO95aSf5om+5Yiw5pWM5Lq6XHJcbiAgICAgICAgICAgIG1hY2hpbmUuY2hhbmdlU3RhdGUoU3RhdGVUeXBlLlBSRVBBUkUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZvdW5kIEVuZW15LCBTd2l0Y2ggdG8gcHJlcGFyZSBwaGFzZSBAXCIgKyB0aGlzLnRpbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7Ly/lpoLmnpzmib7kuI3liLDmlYzkurpcclxuICAgICAgICAgICAgdGhpcy50aW1lICs9IDE7Ly90b2RvOiDml7bpl7TntK/liqDpgLvovpHmlLnlj5hcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lpoLmnpxzZWVrZXLkuK3lrZjlnKjmlYzkurrvvIxyZXNldCBQcmVwYXJl5bm26Lez6L2s5YiwUHJlcGFyZemYtuautVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuY2xhc3MgUHJlcGFyZSBleHRlbmRzIEJhc2VTdGF0ZSB7XHJcblxyXG5cclxuICAgIHB1YmxpYyBleGVjdXRlKG1hY2hpbmU6IEF0a1N0YXRlTWFjaGluZSk6IHZvaWQge1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAg55Sx5LqO5pS75Ye754q25oCB5py655qE6KeE5YiS6L+b6KGM6L+H5LiA5qyh5L+u5pS577yM5q2k5aSE5pqC5pe25YWI5o+Q5L6b5Lyq5Luj56CBXHJcbiAgICAgICAg5q2k57G755uu5YmN5Li65Y2V5L2T5pS75Ye755qE6YC76L6RXHJcbiAgICAgICAgKi9cclxuXHJcbiAgICAgICBjb25zdCBmb2N1cyA9IG1hY2hpbmUuc2Vla2VyLmdldEZvY3VzKCk7XHJcbiAgICAgICAgaWYgKG1hY2hpbmUuc2Vla2VyLmZvY3VzQ2hhbmdlZCgpKSB7XHJcbiAgICAgICAgICAgIGlmIChmb2N1cyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy90b2RvOiDph43mlrDov5vlhaXliY3mkYfpmLbmrrVcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vdG9kbzog6L+b5YWl5YeG5aSH6Zi25q61XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICB0b2RvOiDliY3mkYfml7bpl7TntK/liqDjgILnm67liY3lt7Lnu4/nu4/ov4fnmoTliY3mkYfml7bpl7TlrZjlgqjlnKhwcm9maWxl5LitP1xyXG4gICAgICAgIOWmguaenOWJjeaRh+aXtumXtOW3sua7oe+8jOWImei/m+ihjOaUu+WHu+S4lOi/m+WFpeWQjuaRh+eKtuaAgVxyXG4gICAgICAgICovXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIC8vIC8v5Yik5pat5piv5ZCm6ZyA6KaB6YeN5paw6YCJ5oup55uu5qCH5bm26YeN572u5YmN5pGHXHJcbiAgICAgICAgLy8gbGV0IHNlZWtlciA9IG1hY2hpbmUua2VlcGVyLnNlZWtlcjtcclxuICAgICAgICAvLyBsZXQgYWN0b3IgPSBtYWNoaW5lLmtlZXBlcjtcclxuICAgICAgICAvLyBpZiAobWFjaGluZS5rZWVwZXIuZm9jdXMgJiYgc2Vla2VyLmdldENhcHR1cmVMaXN0KCkuaW5kZXhPZihtYWNoaW5lLmtlZXBlci5mb2N1cykgPCAwKSB7Ly/lvZPliY3nm67moIfkuI3lnKjmlLvlh7vojIPlm7TlhoVcclxuICAgICAgICAvLyAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgICAgIC8vICAgICBtYWNoaW5lLmtlZXBlci5mb2N1cyA9IHNlZWtlci5nZXRGb2N1cygpO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgLy8gLy/liKTmlq3lvZPliY3mmK/lkKblrZjlnKjnm67moIdcclxuICAgICAgICAvLyBpZiAobWFjaGluZS5rZWVwZXIuZm9jdXMpIHtcclxuICAgICAgICAvLyAgICAgLy/orqHmlbArMVxyXG4gICAgICAgIC8vICAgICB0aGlzLnRpbWUgKz0gMTtcclxuICAgICAgICAvLyAgICAgaWYgKHRoaXMudGltZSA+PSBhY3Rvci5wcm9maWxlLnByZXBUaW1lKSB7ICAvL+WJjeaRh+e7k+adn+inpuWPkeaUu+WHu1xyXG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJBdHRhY2sgJiB0byBBZnRlciBQaGFzZSBAXCIgKyB0aGlzLnRpbWUpOy8v6L+b6KGM5pS75Ye7XHJcbiAgICAgICAgLy8gICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5ldmVudChFdmVudENlbnRyZS5FVHlwZS5BVFRBQ0ssIFthY3RvciwgbWFjaGluZS5rZWVwZXIuZm9jdXNdKTtcclxuICAgICAgICAvLyAgICAgICAgIC8v6L+b5YWl5ZCO5pGH54q25oCBXHJcbiAgICAgICAgLy8gICAgICAgICBtYWNoaW5lLmNoYW5nZVN0YXRlKFN0YXRlVHlwZS5BRlRFUl9BVEspO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgLy/msqHmnInnm67moIfvvIzlm57liLDlvoXmnLrpmLbmrrVcclxuICAgICAgICAvLyAgICAgbWFjaGluZS5jaGFuZ2VTdGF0ZShTdGF0ZVR5cGUuV0FJVCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBBZnRlckF0ayBleHRlbmRzIEJhc2VTdGF0ZSB7XHJcblxyXG4gICAgcHVibGljIGV4ZWN1dGUobWFjaGluZTogQXRrU3RhdGVNYWNoaW5lKTogdm9pZCB7XHJcbiAgICAgICAgLy8gbGV0IHNlZWtlciA9IG1hY2hpbmUua2VlcGVyLnNlZWtlcjtcclxuICAgICAgICAvLyB0aGlzLnRpbWUgKz0gMTsvL+WNlee6r+iuoeS4quaVsO+8jOa7oeS6huWwsei/lOWbnndhaXTnirbmgIFcclxuICAgICAgICAvLyBpZiAodGhpcy50aW1lID49IG1hY2hpbmUua2VlcGVyLnByb2ZpbGUuYWZ0ZXJUaW1lKSB7XHJcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiV2FpdCBBZnRlciBBVEsgRW5kLCB0byBXYWl0IEBcIiArIHRoaXMudGltZSk7XHJcbiAgICAgICAgLy8gICAgIC8v6YeN5paw6I635Y+W55uu5qCH77yM5pyJ55uu5qCH5YiZ6L+b6KGM5LiL5LiA5qyh5pS75Ye777yM5peg55uu5qCH5Zue5Yiw5b6F5py66Zi25q61XHJcbiAgICAgICAgLy8gICAgIG1hY2hpbmUua2VlcGVyLmZvY3VzID0gc2Vla2VyLmdldEZvY3VzKCk7XHJcbiAgICAgICAgLy8gICAgIG1hY2hpbmUuY2hhbmdlU3RhdGUobWFjaGluZS5rZWVwZXIuZm9jdXMgPyBTdGF0ZVR5cGUuUFJFUEFSRSA6IFN0YXRlVHlwZS5XQUlUKTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDnirbmgIHmnLrnsbtcclxuICovXHJcbmV4cG9ydCBjbGFzcyBBdGtTdGF0ZU1hY2hpbmUge1xyXG4gICAgLypcclxuICAgICog5omA5bGeQWN0b3JcclxuICAgICogKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBrZWVwZXI6IEFjdG9yO1xyXG4gICAgLyoqXHJcbiAgICAgKiDlvZPliY3nirbmgIFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjdXJTdGF0ZTogU3RhdGU7XHJcbiAgICAvKipcclxuICAgICAqIOWPr+S9v+eUqOeahOeKtuaAgeWIl+ihqFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRlTGlzdDogS1ZQYWlyPFN0YXRlPiA9IG5ldyBLVlBhaXI8U3RhdGU+KCk7XHJcblxyXG4gICAgcHVibGljIHNlZWtlcjogU2Vla2VyO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBrZWVwZXIg54q25oCB5py65omA5pyJ6ICFXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGtlZXBlcjogQWN0b3IsIHJlczphbnkpIHtcclxuICAgICAgICB0aGlzLmtlZXBlciA9IGtlZXBlcjtcclxuICAgICAgICB0aGlzLmN1clN0YXRlID0gbmV3IFdhaXQoKTtcclxuICAgICAgICB0aGlzLnN0YXRlTGlzdC5lZGl0KFN0YXRlVHlwZS5XQUlULCB0aGlzLmN1clN0YXRlKTtcclxuICAgICAgICB0aGlzLnN0YXRlTGlzdC5lZGl0KFN0YXRlVHlwZS5QUkVQQVJFLCBuZXcgUHJlcGFyZSgpKTtcclxuICAgICAgICB0aGlzLnN0YXRlTGlzdC5lZGl0KFN0YXRlVHlwZS5BRlRFUl9BVEssIG5ldyBBZnRlckF0aygpKTtcclxuICAgICAgICAvL3RvZG86IGFib3V0IHJlc1xyXG5cclxuICAgICAgICB0aGlzLnNlZWtlciA9IG51bGw7Ly/liJ3lp4vljJZTZWVrZXJcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIt+aWsOW9k+WJjeeKtuaAge+8jOavj+W4p+iwg+eUqFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmtlZXBlcikge1xyXG4gICAgICAgICAgICB0aGlzLmN1clN0YXRlLmV4ZWN1dGUodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pS55Y+Y5b2T5YmN54q25oCB77yM5paw54q25oCB5Lya6YeN572u5Li65Yid5aeL5oCBXHJcbiAgICAgKiBAcGFyYW0gc3RhdGVUeXBlIOaWsOeahOeKtuaAgeexu+Wei1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2hhbmdlU3RhdGUoc3RhdGVUeXBlOiBTdGF0ZVR5cGUpIHtcclxuICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLnN0YXRlTGlzdC5yZWFkKHN0YXRlVHlwZSk7XHJcbiAgICAgICAgc3RhdGUucmVzZXQoKTtcclxuICAgICAgICB0aGlzLmN1clN0YXRlID0gc3RhdGU7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG4iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQmxvY2tlcntcclxuICAgIGNvbnN0cnVjdG9yKGtlZXBlcjpBY3Rvcil7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQWN0b3JTdGF0ZUJhc2UgZnJvbSBcIi4vQWN0b3JTdGF0ZUJhc2VcIjtcclxuaW1wb3J0IERvZExvZyBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0RvZExvZ1wiO1xyXG5pbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcblxyXG5leHBvcnQgZW51bSBBY3RvclN0YXRlSUQge1xyXG4gICAgTm9uZSxcclxuICAgIFByZXByZWQsICAgICAvL+W+heacuiAo5pyq5Ye65YqoL+acqumDqOe9sikgIFxyXG4gICAgQm9ybiwgICAvL+WHuueUn+WKqOeUuyDkuI3lj6/mlLvlh7sg5LiN5Y+v6KKr5pS75Ye7XHJcbiAgICBXYWxrLCAgIC8v56e75YqoIOaVjOS6uueUqFxyXG4gICAgU3R1bm5lZCwgICAgLy/mmZXnnKkg5Yaw5Ya7IGV0Y1xyXG4gICAgRmlnaHQsICAvL+aZruaUu+eKtuaAgSDlubLlkZjluLjmgIEg5pWM5Lq66KKr6Zi75oyh5ZCOXHJcbiAgICBEZWF0aCwgIC8v5q275Lqh5Yqo55S7IOS4jeWPr+aUu+WHuyDkuI3lj6/ooqvmlLvlh7tcclxuICAgIEVzY2FwZSwgLy/mlYzkurrpgIPohLFcclxuICAgIENvdW50XHJcbn1cclxuXHJcbi8qXHJcbiAqIOinkuiJsueKtuaAgeacuiDnrqHnkIbop5LoibLmiYDlpITpmLbmrrUg5qC55o2u5LiN5ZCM6Zi25q615Yaz5a6a5LiN5ZCM55qE57uE5Lu254q25oCBXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3RvclN0YXRlTWdyIHtcclxuICAgIHByaXZhdGUgX3N0YXRlczogQWN0b3JTdGF0ZUJhc2VbXTtcclxuICAgIHByaXZhdGUgX2N1cnJlbnRTdGF0ZTogQWN0b3JTdGF0ZUJhc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYWN0b3I6IEFjdG9yKSB7XHJcbiAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlID0gbnVsbDtcclxuXHJcbiAgICAgICAgLy9UT0RPXHJcbiAgICAgICAgLy/lj4LnhafmuLjmiI/lpKfnirbmgIHmnLpcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ydW5TdGF0ZShBY3RvclN0YXRlSUQuTm9uZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJ1blN0YXRlKHN0YXRlSUQ6IEFjdG9yU3RhdGVJRCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChBY3RvclN0YXRlSUQuQ291bnQgPD0gc3RhdGVJRCB8fCBzdGF0ZUlEIDw9IEFjdG9yU3RhdGVJRC5Ob25lKSB7XHJcbiAgICAgICAgICAgIERvZExvZy5lcnJvcihgR2FtZVN0YXRlTWdyLnJ1blN0YXRlOiBJbnZhbGlkIHN0YXRlSUQgWyR7c3RhdGVJRH1dLiBgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG51bGwgIT0gdGhpcy5fY3VycmVudFN0YXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZS5sZWF2ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlID0gdGhpcy5fc3RhdGVzW3N0YXRlSURdO1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZS5lbnRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKG51bGwgIT0gdGhpcy5fY3VycmVudFN0YXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZS51cGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChudWxsICE9IHRoaXMuX2N1cnJlbnRTdGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUubGVhdmUoKTtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fc3RhdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuX3N0YXRlc1tpXTtcclxuICAgICAgICAgICAgc3RhdGUucmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yL0FjdG9yXCI7XHJcbmltcG9ydCB7TXlTeW1ib2x9IGZyb20gXCIuLi8uLi9GaXgvRml4U3ltYm9sXCI7XHJcbmltcG9ydCB7Q2lyY2xlQ29sbGlzaW9uUmFuZ2V9IGZyb20gXCIuL0NvbGxpc2lvblJhbmdlXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIOeisOaSnuWkhOeQhuWZqO+8jOivpeexu+e7tOaKpOS4gOS4qk1hcO+8jE1hcOiusOW9leaJgOaciemcgOimgei/m+ihjOeisOaSnuWkhOeQhueahOeisOaSnuWZqO+8jE1hcOeUqOeisOaSnuWZqOeahOWUr+S4gOagh+ivhuS9nOS4uumUruS7pemBv+WFjemHjeWkjeiusOW9leOAglxyXG4gKlxyXG4gKiDor6Xnsbvmj5DkvpvkuIDkuKpyZWNhbGN1bGF0ZeaWueazleeUqOS6jumHjeaWsOiuoeeul+eisOaSnuaDheWGte+8jOWvueS6jk1hcOS4reeahOavj+S4quWkhOeQhuWvueixoe+8jOivpeaWueazleiuoeeul+WFtuS4jk1hcOS4reeahOaJgOacieWFtuS7luWvueixoVxyXG4gKiDnmoTph43lj6Dmg4XlhrXvvIzlubblsIbov5nkupvph43lj6DnmoTlhbbku5blr7nosaHku6XliJfooajnmoTlvaLlvI/kvKDpgJLnu5nor6XlpITnkIblr7nosaHjgIJcclxuICpcclxuICogYnkgWFdWXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQWN0b3JDb2xsaXNpb25Qcm9jZXNzb3Ige1xyXG5cclxuICAgIHByaXZhdGUgY29sbGlkZXJNYXA6IHsgW2tleTogbnVtYmVyXTogQWN0b3JDb2xsaWRlciB9ID0ge307XHJcblxyXG4gICAgcHVibGljIHJlZ2lzdGVyQ29sbGlkZXIoY29sbGlkZXI6IEFjdG9yQ29sbGlkZXIpIHtcclxuICAgICAgICB0aGlzLmNvbGxpZGVyTWFwW2NvbGxpZGVyLnN5bWJvbC5kYXRhXSA9IGNvbGxpZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1bnJlZ2lzdGVyQ29sbGlkZXIoY29sbGlkZXI6IEFjdG9yQ29sbGlkZXIpIHtcclxuICAgICAgICBkZWxldGUgdGhpcy5jb2xsaWRlck1hcFtjb2xsaWRlci5zeW1ib2wuZGF0YV07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpIHtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMuY29sbGlkZXJNYXApIHtcclxuICAgICAgICAgICAgbGV0IHRhcmdldENvbGxpZGVyID0gdGhpcy5jb2xsaWRlck1hcFtpXTtcclxuICAgICAgICAgICAgbGV0IGNvbGxpZGluZ0xpc3QgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiBpbiB0aGlzLmNvbGxpZGVyTWFwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29sbGlkZXIgPSB0aGlzLmNvbGxpZGVyTWFwW2pdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbGxpZGVyID09IHRhcmdldENvbGxpZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0Q29sbGlkZXIuc2hvdWxkQ29sbGlkZVdpdGgoY29sbGlkZXIpICYmIHRhcmdldENvbGxpZGVyLmdldENvbGxpc2lvblJhbmdlKCkuaXNDb2luY2lkZVdpdGhSYW5nZShjb2xsaWRlci5nZXRDb2xsaXNpb25SYW5nZSgpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxpZGluZ0xpc3QucHVzaChjb2xsaWRlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGFyZ2V0Q29sbGlkZXIub25Db2xsaWRpbmdMaXN0UmVmcmVzaChjb2xsaWRpbmdMaXN0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFjdG9yQ29sbGlkZXIge1xyXG4gICAgLy/llK/kuIDmoIfor4ZcclxuICAgIHB1YmxpYyByZWFkb25seSBzeW1ib2w6IE15U3ltYm9sID0gbmV3IE15U3ltYm9sKCk7XHJcblxyXG4gICAgLy/ojrflj5bnorDmkp7ojIPlm7RcclxuICAgIGFic3RyYWN0IGdldENvbGxpc2lvblJhbmdlKCk6IENpcmNsZUNvbGxpc2lvblJhbmdlIDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmHjeiuvueisOaSnuiMg+WbtFxyXG4gICAgICogQHBhcmFtIHJhbmdlIOaWsOeahOeisOaSnuiMg+WbtFxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBzZXRDb2xsaXNpb25SYW5nZShyYW5nZTogQ2lyY2xlQ29sbGlzaW9uUmFuZ2UpO1xyXG5cclxuICAgIC8v6I635Y+W56Kw5pKe5Zmo55qE5omA5pyJ6ICFXHJcbiAgICBhYnN0cmFjdCBnZXRBY3RvcigpOiBBY3RvcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOeisOaSnuWIl+ihqOmcgOimgeWIt+aWsFxyXG4gICAgICogQHBhcmFtIGNvbGxpZGluZ0xpc3Qg5paw55qE56Kw5pKe5YiX6KGoXHJcbiAgICAgKiAqL1xyXG4gICAgYWJzdHJhY3Qgb25Db2xsaWRpbmdMaXN0UmVmcmVzaChjb2xsaWRpbmdMaXN0OiBBY3RvckNvbGxpZGVyW10pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm5bqU6K+l5LiO5oyH5a6a56Kw5pKe5Zmo5Y+R55Sf56Kw5pKeXHJcbiAgICAgKiBAcGFyYW0gY29sbGlkZXIg5Y+m5LiA5Liq56Kw5pKe5ZmoXHJcbiAgICAgKiAqL1xyXG4gICAgYWJzdHJhY3Qgc2hvdWxkQ29sbGlkZVdpdGgoY29sbGlkZXI6IEFjdG9yQ29sbGlkZXIpOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b2T5YmN56Kw5pKe5YiX6KGoXHJcbiAgICAgKiAqL1xyXG4gICAgYWJzdHJhY3QgZ2V0Q29sbGlkaW5nTGlzdCgpOiBBY3RvckNvbGxpZGVyW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliLfmlrDnorDmkp7ojIPlm7TvvIzkvb/lhbbot5/pmo/miYDmnInogIXnp7vliqhcclxuICAgICAqICovXHJcbiAgICBhYnN0cmFjdCByZWZyZXNoQ29sbGlzaW9uUmFuZ2VGb2xsb3dBY3RvcigpO1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNpbXBsZUFjdG9yQ29sbGlkZXIgZXh0ZW5kcyBBY3RvckNvbGxpZGVyIHtcclxuXHJcbiAgICBwcml2YXRlIGNvbGxpZGluZ0xpc3Q6IEFjdG9yQ29sbGlkZXJbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBhY3RvcjogQWN0b3I7XHJcbiAgICBwcml2YXRlIHJhbmdlOiBDaXJjbGVDb2xsaXNpb25SYW5nZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhY3RvcjogQWN0b3IsIHJhbmdlOiBDaXJjbGVDb2xsaXNpb25SYW5nZSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5hY3RvciA9IGFjdG9yO1xyXG4gICAgICAgIHRoaXMucmFuZ2UgPSByYW5nZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0Q29sbGlzaW9uUmFuZ2UoKTogQ2lyY2xlQ29sbGlzaW9uUmFuZ2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJhbmdlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldENvbGxpc2lvblJhbmdlKHJhbmdlOiBDaXJjbGVDb2xsaXNpb25SYW5nZSkge1xyXG4gICAgICAgIHRoaXMucmFuZ2UgPSByYW5nZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBY3RvcigpOiBBY3RvciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q29sbGlkaW5nTGlzdCgpOiBBY3RvckNvbGxpZGVyW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbGxpZGluZ0xpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgb25Db2xsaWRpbmdMaXN0UmVmcmVzaChjb2xsaWRpbmdMaXN0OiBBY3RvckNvbGxpZGVyW10pIHtcclxuICAgICAgICB0aGlzLmNvbGxpZGluZ0xpc3QgPSBjb2xsaWRpbmdMaXN0O1xyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJpbXBvcnQgR2FtZU1hcCBmcm9tIFwiLi9HYW1lTGV2ZWxcIjtcclxuaW1wb3J0IHsgQWN0b3JDb2xsaXNpb25Qcm9jZXNzb3IgfSBmcm9tIFwiLi9Db2xsaXNpb24vQWN0b3JDb2xsaXNpb25Qcm9jZXNzb3JcIjtcclxuaW1wb3J0IEdhbWVMZXZlbCBmcm9tIFwiLi9HYW1lTGV2ZWxcIjtcclxuaW1wb3J0IERvZFJlc291cmNlTWdyIGZyb20gXCIuLi9SZXNvdXJjZXMvRG9kUmVzb3VyY2VNZ3JcIjtcclxuaW1wb3J0IEFjdG9yTWdyIGZyb20gXCIuL0FjdG9yL0FjdG9yTWdyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQmF0dGxlIHtcclxuICAgIHB1YmxpYyBsZXZlbDogR2FtZUxldmVsO1xyXG4gICAgcHVibGljIG1hcDogR2FtZU1hcDtcclxuICAgIHB1YmxpYyBhY3Rvck1ncjogQWN0b3JNZ3I7XHJcblxyXG4gICAgcHVibGljIGNvbGxpc2lvbjogQWN0b3JDb2xsaXNpb25Qcm9jZXNzb3I7XHJcblxyXG4gICAgcHJpdmF0ZSBfbGV2ZWxQcmVwYXJlZDogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmxldmVsID0gbmV3IEdhbWVMZXZlbCgpO1xyXG4gICAgICAgIHRoaXMubWFwID0gbmV3IEdhbWVNYXAoKTtcclxuICAgICAgICB0aGlzLmFjdG9yTWdyID0gbmV3IEFjdG9yTWdyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY29sbGlzaW9uID0gbmV3IEFjdG9yQ29sbGlzaW9uUHJvY2Vzc29yKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHByZXBhcmVMZXZlbCgpOiB2b2lkIHtcclxuICAgICAgICAvL1RPRE8gaW5pdCBsZXZlbCBpbmZvcm1hdGlvblxyXG4gICAgICAgIGxldCByZXMgPSBEb2RSZXNvdXJjZU1nci5JbnN0YW5jZS5nZXRDdXJyZW50TGV2ZWxSZXMoKTtcclxuICAgICAgICB0aGlzLmxldmVsLmluaXQocmVzWydsZXZlbCddKTsgLy9qdXN0IHNhbXBsZVxyXG4gICAgICAgIHRoaXMubWFwLmluaXQocmVzWydtYXAnXSk7XHJcbiAgICAgICAgdGhpcy5hY3Rvck1nci5pbml0KHJlc1snbWFwJ10pO1xyXG5cclxuICAgICAgICAvL0FORCBET05UIEZPUkdFVCBSRVNFVCBMQVNUIEJBVFRMRSBEQVRBIFJFTUFJTlMuIFxyXG4gICAgICAgIC8vdGhpcy5jb2xsaXNpb24ucmVzZXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fbGV2ZWxQcmVwYXJlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzTGV2ZWxQcmVwcmFyZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xldmVsUHJlcGFyZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIC8vVE9ET1xyXG4gICAgICAgIC8vQ0xFQVIgTEFTVCBCQVRUTEUgUkVTT1VSQ0VcclxuICAgICAgICB0aGlzLl9sZXZlbFByZXBhcmVkID0gZmFsc2U7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQmF0dGxlQ29uc3Qge1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBzdGFuZGFyZENvc3RJbmNyZWFzZVJhdGlvOiBudW1iZXIgPSAxO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBtYXhDb3N0TnVtOiBudW1iZXIgPSA5OTtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgaW5pdENvc3ROdW06IG51bWJlciA9IDY7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGxpZmVQb2ludDogbnVtYmVyID0gMztcclxufSIsImltcG9ydCB7IEJ1ZmYgfSBmcm9tIFwiLi9BY3Rvci9BY3Rvck1vZHVsZXMvQnVmZlwiO1xyXG5pbXBvcnQgeyBFdmVudENlbnRyZSB9IGZyb20gXCIuLi9FdmVudC9FdmVudENlbnRyZVwiO1xyXG5pbXBvcnQgRml4VGltZSBmcm9tIFwiLi4vRml4L0ZpeFRpbWVcIjtcclxuaW1wb3J0IERvZFJlc291cmNlTWdyIGZyb20gXCIuLi9SZXNvdXJjZXMvRG9kUmVzb3VyY2VNZ3JcIjtcclxuaW1wb3J0IEdhbWVCYXR0bGVDb25zdCBmcm9tIFwiLi9HYW1lQmF0dGxlQ29uc3RcIjtcclxuLyoqXHJcbiAqIOaooeWdl+ivtOaYjjog5ri45oiP5oiY5paX5Zyw5Zu+5qih5Z2XICBcclxuICog6LSf6LSj5YaF5a65OiDlnLDlm77lsZ7mgKforr7nva7vvIzlhajlsYBidWZm566h55CGICBcclxuICog6LSf6LSj5Lq6OiDpk7bljY4gIFxyXG4gKiDml7bpl7Q6IDIwMjDlubQz5pyIM+aXpTEyOjQ1OjQxICBcclxuICovXHJcblxyXG4vL0tSOiDlhajlsYDnlLHlhbPljaHmqKHlnZfnrqHnkIYgQOmTtuWNjlxyXG4vL+i/memHjOWPr+S7peWMheWQq+WFqOWxgOeahOiwg+aVtOWAvC/nlJ/lkb3lgLwv5rao6LS5XHJcbi8v5YWo5ri45oiP5qCH5YeG5YC85L2/55So5bi46YeP5a6a5LmJ5ZyoQmF0dGxlQ29uc3TnsbvkuK0g56S65L6L5Y+v5Lul55yL5LiL5pa5XHJcbi8v5Y+m77ya56eB5pyJ5oiQ5ZGY5ZG95ZCN6K+35Zyo5YmN6Z2i5Yqg5LiL5YiS57q/IOWjsOaYjueahOaIkOWRmOivt+WcqOaehOmAoOWHveaVsOS4reWFqOmDqOWIneWni+WMluS4gOS4quWAvO+8jOmYsuatonVuZGVmaW5lZCjph47mjIfpkogp55qE5oOF5Ya15Y+R55SfXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lTGV2ZWx7XHJcbiAgICBwcml2YXRlIF9pbml0aWFsQ29zdDpudW1iZXI7XHJcbiAgICBwcml2YXRlIF9jdXJyZW50Q29zdDpudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfbGlmZVBvaW50Om51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIF90aW1lTGluZTpudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2xvYmFsQnVmZkxpc3Q6IEJ1ZmZbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuX2luaXRpYWxDb3N0ID0gMDtcclxuICAgICAgICB0aGlzLl9jdXJyZW50Q29zdCA9IDA7XHJcbiAgICAgICAgdGhpcy5fbGlmZVBvaW50ID0gMDtcclxuICAgICAgICB0aGlzLl90aW1lTGluZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fZ2xvYmFsQnVmZkxpc3QgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdChyZXM6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIC8vZm9yIGV4YW1wbGVcclxuICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICAgICAgdGhpcy5faW5pdGlhbENvc3QgPSB0aGlzLl9jdXJyZW50Q29zdCA9IHJlc1snaW5pdENvc3QnXSB8fCBHYW1lQmF0dGxlQ29uc3QuaW5pdENvc3ROdW07XHJcbiAgICAgICAgdGhpcy5fbGlmZVBvaW50ID0gcmVzWydsaWZlJ10gfHwgR2FtZUJhdHRsZUNvbnN0LmxpZmVQb2ludDtcclxuICAgICAgICB0aGlzLl90aW1lTGluZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5nZXRHbG9iYWxCdWZmTGlzdCgpO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZVRpbWUoKTsgXHJcbiAgICAgICAgdGhpcy5fdXBkYXRlQ29zdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRHbG9iYWxCdWZmTGlzdCgpOkJ1ZmZbXXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2xvYmFsQnVmZkxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoYW5nZUNvc3QoKTp2b2lke1xyXG4gICAgICAgIC8vdG9kby4uLi5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF91cGRhdGVUaW1lKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3RpbWVMaW5lICs9IEZpeFRpbWUuZGVsdGFUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3VwZGF0ZUNvc3QoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9nbG9iYWxCdWZmTGlzdC5zcGxpY2UoMCwgdGhpcy5fZ2xvYmFsQnVmZkxpc3QubGVuZ3RoKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgRG9kTG9nIGZyb20gXCIuLi9Db21tb24vRG9kTG9nXCI7XHJcbmltcG9ydCBHYW1lU3RhdGVNZ3IgZnJvbSBcIi4vU3RhdGUvR2FtZVN0YXRlTWdyXCI7XHJcbmltcG9ydCBHYW1lQmF0dGxlIGZyb20gXCIuL0dhbWVCYXR0bGVcIjtcclxuaW1wb3J0IEdhbWVMb2JieSBmcm9tIFwiLi9Mb2JieS9HYW1lTG9iYnlcIjtcclxuXHJcbi8qKlxyXG4gKiDov5nmmK/muLjmiI/mnKzkvZNcclxuICog6K+05LiA5LqbUmhvZGVzX0dhbWXmlofku7blpLnkuIvnmoTms6jph4rop4TliJnvvIzmlrnkvr/ku6XlkI5jdHJsK2ZcclxuICpcclxuICogMS4vL0B0b2RvIOagh+azqOmcgOimgeWujOWWhOeahOmDqOWIhlxyXG4gKlxyXG4gKiAyLi8vQHRvZml4IOagh+azqOW3suefpeaciemXrumimOeahOmDqOWIhlxyXG4gKlxyXG4gKiAzLi8vQHRlc3Qg5qCH5rOo5LuF5L6b5rWL6K+V5L2/55So55qE6YOo5YiGXHJcbiAqXHJcbiAqIDMuLy9AcmVkY2FsbCDmoIfms6josIPnlKjmuLLmn5PmqKHlnZfnmoTpg6jliIZcclxuICpcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJob2Rlc0dhbWUge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBSaG9kZXNHYW1lO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSW5zdGFuY2UoKTogUmhvZGVzR2FtZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlIHx8ICh0aGlzLl9pbnN0YW5jZSA9IG5ldyB0aGlzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0ZU1ncjogR2FtZVN0YXRlTWdyO1xyXG4gICAgcHVibGljIGJhdHRsZTogR2FtZUJhdHRsZTtcclxuICAgIHB1YmxpYyBsb2JieTogR2FtZUxvYmJ5O1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmJhdHRsZSA9IG5ldyBHYW1lQmF0dGxlKCk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZU1nciA9IG5ldyBHYW1lU3RhdGVNZ3IodGhpcy5iYXR0bGUpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGVNZ3IuaW5pdCgpO1xyXG4gICAgICAgIERvZExvZy5kZWJ1ZyhgUmhvZGVzR2FtZTogaW5pdGlhbGl6YXRpb24gY29tcGxldGUuIGApXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXRlTWdyLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJpbXBvcnQgR2FtZUJhdHRsZSBmcm9tIFwiLi4vR2FtZUJhdHRsZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVN0YXRlQmFzZSB7XHJcbiAgICBwcm90ZWN0ZWQgX2JhdHRsZTogR2FtZUJhdHRsZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihiYXR0bGU6IEdhbWVCYXR0bGUpIHtcclxuICAgICAgICB0aGlzLl9iYXR0bGUgPSBiYXR0bGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudGVyKCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbGVhdmUoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgR2FtZVN0YXRlQmFzZSBmcm9tIFwiLi9HYW1lU3RhdGVCYXNlXCI7XHJcbmltcG9ydCBSaG9kZXNHYW1lIGZyb20gXCIuLi9SaG9kZXNHYW1lXCI7XHJcbmltcG9ydCBHYW1lQmF0dGxlIGZyb20gXCIuLi9HYW1lQmF0dGxlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU3RhdGVCYXR0bGUgZXh0ZW5kcyBHYW1lU3RhdGVCYXNle1xyXG4gICAgY29uc3RydWN0b3IoYmF0dGxlOkdhbWVCYXR0bGUpIHtcclxuICAgICAgICBzdXBlcihiYXR0bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnRlcigpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5lbnRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsZWF2ZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5sZWF2ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fYmF0dGxlLm1hcC51cGRhdGUoKTtcclxuICAgIH1cclxufSIsImltcG9ydCBHYW1lU3RhdGVCYXNlIGZyb20gXCIuL0dhbWVTdGF0ZUJhc2VcIjtcclxuaW1wb3J0IFJob2Rlc0dhbWUgZnJvbSBcIi4uL1Job2Rlc0dhbWVcIjtcclxuaW1wb3J0IERvZFJlc291cmNlTWdyIGZyb20gXCIuLi8uLi9SZXNvdXJjZXMvRG9kUmVzb3VyY2VNZ3JcIjtcclxuaW1wb3J0IHsgR2FtZVN0YXRlSUQgfSBmcm9tIFwiLi9HYW1lU3RhdGVNZ3JcIjtcclxuaW1wb3J0IERvZExvZyBmcm9tIFwiLi4vLi4vQ29tbW9uL0RvZExvZ1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVN0YXRlR2FtZWxvYWQgZXh0ZW5kcyBHYW1lU3RhdGVCYXNle1xyXG4gICAgY29uc3RydWN0b3IoYmF0dGxlKSB7XHJcbiAgICAgICAgc3VwZXIoYmF0dGxlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW50ZXIoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuZW50ZXIoKTtcclxuICAgICAgICAvL1RPRE8gU0hPVyBMT0FESU5HIFNDUkVFTlxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsZWF2ZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5sZWF2ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKCk7XHJcbiAgICAgICAgaWYgKHRydWUgPT0gRG9kUmVzb3VyY2VNZ3IuSW5zdGFuY2UuaW5pdGVkKCkpIHtcclxuICAgICAgICAgICAgLy9XRSBETyBOT1QgSEFWRSBMT0JCWSBNT0RVTEUgSU4gVEhJUyBWRVJTSU9OXHJcbiAgICAgICAgICAgIC8vSlVTVCBTRVQgTEVWRUwgSUQgSEVSRVxyXG4gICAgICAgICAgICAvL1RPIERFTFxyXG4gICAgICAgICAgICBEb2RSZXNvdXJjZU1nci5JbnN0YW5jZS5zZXRMZXZlbElEKDEpO1xyXG4gICAgICAgICAgICBSaG9kZXNHYW1lLkluc3RhbmNlLnN0YXRlTWdyLnJ1blN0YXRlKEdhbWVTdGF0ZUlELkxldmVsbG9hZCk7XHJcbiAgICAgICAgICAgIERvZExvZy5kZWJ1ZyhgR2FtZVN0YXRlR2FtZWxvYWQudXBkYXRlOiBSZXNvdXJjZXMgaW5pdCBjb21wbGV0ZSwgc2V0IGxldmVsIGludG8gMS4gYCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEdhbWVTdGF0ZUJhc2UgZnJvbSBcIi4vR2FtZVN0YXRlQmFzZVwiO1xyXG5pbXBvcnQgUmhvZGVzR2FtZSBmcm9tIFwiLi4vUmhvZGVzR2FtZVwiO1xyXG5pbXBvcnQgeyBHYW1lU3RhdGVJRCB9IGZyb20gXCIuL0dhbWVTdGF0ZU1nclwiO1xyXG5pbXBvcnQgRG9kUmVzb3VyY2VNZ3IgZnJvbSBcIi4uLy4uL1Jlc291cmNlcy9Eb2RSZXNvdXJjZU1nclwiO1xyXG5pbXBvcnQgRG9kTG9nIGZyb20gXCIuLi8uLi9Db21tb24vRG9kTG9nXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU3RhdGVMZXZlbExvYWQgZXh0ZW5kcyBHYW1lU3RhdGVCYXNle1xyXG4gICAgY29uc3RydWN0b3IoYmF0dGxlKSB7XHJcbiAgICAgICAgc3VwZXIoYmF0dGxlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW50ZXIoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuZW50ZXIoKTtcclxuICAgICAgICB0aGlzLl9iYXR0bGUucHJlcGFyZUxldmVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxlYXZlKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmxlYXZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLnJlc2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci51cGRhdGUoKTtcclxuICAgICAgICBpZiAodHJ1ZSA9PSBEb2RSZXNvdXJjZU1nci5JbnN0YW5jZS5pc0xldmVsUHJlcGFyZWQoKSkge1xyXG4gICAgICAgICAgICBpZiAodHJ1ZSA9PSB0aGlzLl9iYXR0bGUuaXNMZXZlbFByZXByYXJlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICBSaG9kZXNHYW1lLkluc3RhbmNlLnN0YXRlTWdyLnJ1blN0YXRlKEdhbWVTdGF0ZUlELkJhdHRsZSk7XHJcbiAgICAgICAgICAgICAgICBEb2RMb2cuZGVidWcoYEdhbWVTdGF0ZUxldmVsbG9hZC51cGRhdGU6IGxldmVsIFske0RvZFJlc291cmNlTWdyLkluc3RhbmNlLmdldExldmVsSUQoKX1dIGlzIHByZXBhcmVkLiBgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBHYW1lU3RhdGVCYXNlIGZyb20gXCIuL0dhbWVTdGF0ZUJhc2VcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTdGF0ZUxvYmJ5IGV4dGVuZHMgR2FtZVN0YXRlQmFzZXtcclxuICAgIGNvbnN0cnVjdG9yKGJhdHRsZSkge1xyXG4gICAgICAgIHN1cGVyKGJhdHRsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudGVyKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmVudGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxlYXZlKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmxlYXZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLnJlc2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci51cGRhdGUoKTtcclxuICAgIH1cclxufSIsImltcG9ydCBHYW1lU3RhdGVCYXNlIGZyb20gXCIuL0dhbWVTdGF0ZUJhc2VcIjtcclxuaW1wb3J0IEdhbWVTdGF0ZUJhdHRsZSBmcm9tIFwiLi9HYW1lU3RhdGVCYXR0bGVcIjtcclxuaW1wb3J0IERvZExvZyBmcm9tIFwiLi4vLi4vQ29tbW9uL0RvZExvZ1wiO1xyXG5pbXBvcnQgR2FtZVN0YXRlTGV2ZWxMb2FkIGZyb20gXCIuL0dhbWVTdGF0ZUxldmVsbG9hZFwiO1xyXG5pbXBvcnQgR2FtZVN0YXRlR2FtZWxvYWQgZnJvbSBcIi4vR2FtZVN0YXRlR2FtZWxvYWRcIjtcclxuaW1wb3J0IEdhbWVTdGF0ZUxvYmJ5IGZyb20gXCIuL0dhbWVTdGF0ZUxvYmJ5XCI7XHJcbmltcG9ydCBSaG9kZXNHYW1lIGZyb20gXCIuLi9SaG9kZXNHYW1lXCI7XHJcbmltcG9ydCBHYW1lQmF0dGxlIGZyb20gXCIuLi9HYW1lQmF0dGxlXCI7XHJcblxyXG5leHBvcnQgZW51bSBHYW1lU3RhdGVJRCB7XHJcbiAgICBOb25lLFxyXG4gICAgR2FtZWxvYWQsXHJcbiAgICBMb2JieSxcclxuICAgIExldmVsbG9hZCxcclxuICAgIEJhdHRsZSxcclxuICAgIENvdW50XHJcbn1cclxuXHJcbi8qXHJcbiAqIOWkp+eKtuaAgeacuiDnrqHnkIbmuLjmiI/miYDlpITpmLbmrrVcclxuICogQFRPRE8gR0FNRUxPQUQgTE9CQlkgTEVWRUxMT0FEIEJBVFRMRVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVN0YXRlTWdyIHtcclxuICAgIHByaXZhdGUgX3N0YXRlczogR2FtZVN0YXRlQmFzZVtdO1xyXG4gICAgcHJpdmF0ZSBfY3VycmVudFN0YXRlOiBHYW1lU3RhdGVCYXNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGJhdHRsZTpHYW1lQmF0dGxlKSB7XHJcbiAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlID0gbnVsbDtcclxuICAgICAgICAvLyBsZXQgYmF0dGxlID0gUmhvZGVzR2FtZS5JbnN0YW5jZS5iYXR0bGU7XHJcbiAgICBcclxuICAgICAgICB0aGlzLl9zdGF0ZXMgPSBbXTtcclxuICAgICAgICB0aGlzLl9zdGF0ZXMucHVzaChudWxsKTtcclxuICAgICAgICB0aGlzLl9zdGF0ZXMucHVzaChuZXcgR2FtZVN0YXRlR2FtZWxvYWQoYmF0dGxlKSk7XHJcbiAgICAgICAgdGhpcy5fc3RhdGVzLnB1c2gobmV3IEdhbWVTdGF0ZUxvYmJ5KGJhdHRsZSkpO1xyXG4gICAgICAgIHRoaXMuX3N0YXRlcy5wdXNoKG5ldyBHYW1lU3RhdGVMZXZlbExvYWQoYmF0dGxlKSk7XHJcbiAgICAgICAgdGhpcy5fc3RhdGVzLnB1c2gobmV3IEdhbWVTdGF0ZUJhdHRsZShiYXR0bGUpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ydW5TdGF0ZShHYW1lU3RhdGVJRC5HYW1lbG9hZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJ1blN0YXRlKHN0YXRlSUQ6IEdhbWVTdGF0ZUlEKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKEdhbWVTdGF0ZUlELkNvdW50IDw9IHN0YXRlSUQgfHwgc3RhdGVJRCA8PSBHYW1lU3RhdGVJRC5Ob25lKSB7XHJcbiAgICAgICAgICAgIERvZExvZy5lcnJvcihgR2FtZVN0YXRlTWdyLnJ1blN0YXRlOiBJbnZhbGlkIHN0YXRlSUQgWyR7c3RhdGVJRH1dLiBgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG51bGwgIT0gdGhpcy5fY3VycmVudFN0YXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZS5sZWF2ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlID0gdGhpcy5fc3RhdGVzW3N0YXRlSURdO1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZS5lbnRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKG51bGwgIT0gdGhpcy5fY3VycmVudFN0YXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZS51cGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChudWxsICE9IHRoaXMuX2N1cnJlbnRTdGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUubGVhdmUoKTtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fc3RhdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuX3N0YXRlc1tpXTtcclxuICAgICAgICAgICAgc3RhdGUucmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgR2FtZUNvbmZpZyBmcm9tIFwiLi9HYW1lQ29uZmlnXCI7XHJcbmltcG9ydCBTY2VuZU1hbmFnZXIgZnJvbSBcIi4vU2NlbmVNYW5hZ2VyXCI7XHJcbmltcG9ydCBGaXhUaW1lIGZyb20gXCIuL0ZpeC9GaXhUaW1lXCI7XHJcbmltcG9ydCBSaG9kZXNHYW1lIGZyb20gXCIuL0dhbWUvUmhvZGVzR2FtZVwiO1xyXG5pbXBvcnQgeyBFdmVudENlbnRyZSB9IGZyb20gXCIuL0V2ZW50L0V2ZW50Q2VudHJlXCI7XHJcbmltcG9ydCBEb2RSZXNvdXJjZU1nciBmcm9tIFwiLi9SZXNvdXJjZXMvRG9kUmVzb3VyY2VNZ3JcIjtcclxuaW1wb3J0IFBlcmZvcm1hbmNlQ2VudHJlIGZyb20gXCIuL0NvbW1vbi9HcmFwaGljcy9QZXJmb3JtYW5jZV9Nb2R1bGUvUGVyZm9ybWFuY2VDZW50cmVcIjtcclxuaW1wb3J0IHsgVmVjMiB9IGZyb20gXCIuL0NvbW1vbi9Eb2RNYXRoXCI7XHJcblxyXG5jbGFzcyBNYWluIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdC8v5qC55o2uSURF6K6+572u5Yid5aeL5YyW5byV5pOOXHRcdFxyXG5cdFx0aWYgKHdpbmRvd1tcIkxheWEzRFwiXSkgTGF5YTNELmluaXQoR2FtZUNvbmZpZy53aWR0aCwgR2FtZUNvbmZpZy5oZWlnaHQpO1xyXG5cdFx0ZWxzZSBMYXlhLmluaXQoR2FtZUNvbmZpZy53aWR0aCwgR2FtZUNvbmZpZy5oZWlnaHQsIExheWFbXCJXZWJHTFwiXSk7XHJcblx0XHRMYXlhW1wiUGh5c2ljc1wiXSAmJiBMYXlhW1wiUGh5c2ljc1wiXS5lbmFibGUoKTtcclxuXHRcdExheWFbXCJEZWJ1Z1BhbmVsXCJdICYmIExheWFbXCJEZWJ1Z1BhbmVsXCJdLmVuYWJsZSgpO1xyXG5cdFx0TGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBHYW1lQ29uZmlnLnNjYWxlTW9kZTtcclxuXHRcdExheWEuc3RhZ2Uuc2NyZWVuTW9kZSA9IEdhbWVDb25maWcuc2NyZWVuTW9kZTtcclxuXHRcdC8v5YW85a655b6u5L+h5LiN5pSv5oyB5Yqg6L29c2NlbmXlkI7nvIDlnLrmma9cclxuXHRcdExheWEuVVJMLmV4cG9ydFNjZW5lVG9Kc29uID0gR2FtZUNvbmZpZy5leHBvcnRTY2VuZVRvSnNvbjtcclxuXHJcblx0XHQvL+aJk+W8gOiwg+ivlemdouadv++8iOmAmui/h0lEReiuvue9ruiwg+ivleaooeW8j++8jOaIluiAhXVybOWcsOWdgOWinuWKoGRlYnVnPXRydWXlj4LmlbDvvIzlnYflj6/miZPlvIDosIPor5XpnaLmnb/vvIlcclxuXHRcdGlmIChHYW1lQ29uZmlnLmRlYnVnIHx8IExheWEuVXRpbHMuZ2V0UXVlcnlTdHJpbmcoXCJkZWJ1Z1wiKSA9PSBcInRydWVcIikgTGF5YS5lbmFibGVEZWJ1Z1BhbmVsKCk7XHJcblx0XHRpZiAoR2FtZUNvbmZpZy5waHlzaWNzRGVidWcgJiYgTGF5YVtcIlBoeXNpY3NEZWJ1Z0RyYXdcIl0pIExheWFbXCJQaHlzaWNzRGVidWdEcmF3XCJdLmVuYWJsZSgpO1xyXG5cdFx0aWYgKEdhbWVDb25maWcuc3RhdCkgTGF5YS5TdGF0LnNob3coKTtcclxuXHRcdExheWEuYWxlcnRHbG9iYWxFcnJvciA9IHRydWU7XHJcblxyXG5cdFx0Ly9HQU1FIElOSVQgKEdMT0JBTCBNT0RVTEUpXHJcblx0XHRGaXhUaW1lLmluaXQoKTtcclxuXHRcdFJob2Rlc0dhbWUuSW5zdGFuY2UuaW5pdCgpO1xyXG5cdFx0RG9kUmVzb3VyY2VNZ3IuSW5zdGFuY2UuaW5pdCgpO1xyXG5cdFx0RXZlbnRDZW50cmUuaW5pdCgpO1xyXG5cclxuXHRcdC8v5r+A5rS76LWE5rqQ54mI5pys5o6n5Yi277yMdmVyc2lvbi5qc29u55SxSURF5Y+R5biD5Yqf6IO96Ieq5Yqo55Sf5oiQ77yM5aaC5p6c5rKh5pyJ5Lmf5LiN5b2x5ZON5ZCO57ut5rWB56iLXHJcblx0XHRMYXlhLlJlc291cmNlVmVyc2lvbi5lbmFibGUoXCJ2ZXJzaW9uLmpzb25cIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLm9uVmVyc2lvbkxvYWRlZCksIExheWEuUmVzb3VyY2VWZXJzaW9uLkZJTEVOQU1FX1ZFUlNJT04pO1xyXG5cdH1cclxuXHJcblx0cHVibGljIG9uVmVyc2lvbkxvYWRlZCgpOiB2b2lkIHtcclxuXHRcdC8v5r+A5rS75aSn5bCP5Zu+5pig5bCE77yM5Yqg6L295bCP5Zu+55qE5pe25YCZ77yM5aaC5p6c5Y+R546w5bCP5Zu+5Zyo5aSn5Zu+5ZCI6ZuG6YeM6Z2i77yM5YiZ5LyY5YWI5Yqg6L295aSn5Zu+5ZCI6ZuG77yM6ICM5LiN5piv5bCP5Zu+XHJcblx0XHRMYXlhLkF0bGFzSW5mb01hbmFnZXIuZW5hYmxlKFwiZmlsZWNvbmZpZy5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vbkNvbmZpZ0xvYWRlZCkpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIG9uQ29uZmlnTG9hZGVkKCk6IHZvaWQge1xyXG5cclxuXHRcdFxyXG5cdFx0U2NlbmVNYW5hZ2VyLkluc3RhbmNlLmF3YWtlKCk7XHJcblx0XHRQZXJmb3JtYW5jZUNlbnRyZS5pbml0aWFsaXplKExheWEuc3RhZ2UpO1xyXG5cdFx0UGVyZm9ybWFuY2VDZW50cmUuaW5zdGFuY2UuaW5pdEJvYXJkKFtcclxuXHRcdFx0WzAsMCwwLDBdLFxyXG5cdFx0XHRbMCwwLDAsMF1cclxuXHRcdF0sIG5ldyBWZWMyKDUwLDUwKSwgbmV3IFZlYzIoMTAwLDEwMCksIFwiI2ZmMDBmZlwiLCBcIiNmZmZmMDBcIik7XHJcblx0XHQvL0F3YWtlIEdhbWUgRW5naW5lIExvb3BcclxuXHRcdExheWEudGltZXIubG9vcCgxNiwgdGhpcywgdGhpcy5fdXBkYXRlKTtcclxuXHRcdFxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBfdXBkYXRlKCk6IHZvaWQge1xyXG5cdFx0Rml4VGltZS51cGRhdGUoKTtcclxuXHRcdFJob2Rlc0dhbWUuSW5zdGFuY2UudXBkYXRlKCk7XHJcblx0XHREb2RSZXNvdXJjZU1nci5JbnN0YW5jZS51cGRhdGUoKTtcclxuXHR9XHJcbn1cclxuXHJcbi8v5r+A5rS75ZCv5Yqo57G7XHJcbm5ldyBNYWluKCk7XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIERvZFJlc291cmNlTWdyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogRG9kUmVzb3VyY2VNZ3I7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBJbnN0YW5jZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2UgfHwgKHRoaXMuX2luc3RhbmNlID0gbmV3IHRoaXMoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPIEDpk7bljY5cclxuICAgIC8vbG9hZCByZXNvdXJjZXMgaGVyZSBpbmNsdWRpbmcgSlNPTiAvIFRFWFRVUkUgLyBBVkFUQVIgLyBTUElORVxyXG4gICAgLy9wcml2YXRlIF9qc29uOiBEb2RKc29uTG9hZGVyO1xyXG4gICAgLy9wcml2YXRlIF90ZXg6IERvZFRleHR1cmVMb2FkZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfbGV2ZWxJRDogbnVtYmVyIHwgbnVsbDtcclxuICAgIHByaXZhdGUgX2luaXRlZDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX2xldmVsUHJlcGFyZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxJRCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5faW5pdGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxQcmVwYXJlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRMZXZlbElEKGlkOiBudW1iZXIgfCBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxJRCA9IGlkO1xyXG4gICAgICAgIHRoaXMuX2xldmVsUHJlcGFyZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TGV2ZWxJRCgpOiBudW1iZXIgfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGV2ZWxJRDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdCgpOiB2b2lkIHtcclxuICAgICAgICAvL1RPRE8gTE9BRFxyXG4gICAgICAgIC8vdGhpcy5fanNvbi5sb2FkKCk7XHJcbiAgICAgICAgLy90aGlzLl90ZXgubG9hZCgpO1xyXG4gICAgICAgIC8vc2V0IGluaXRlZCBmbGFnIHRydWUgd2hpbGUgaW5pdGlhbGl6YXRpb24gY29tcGxldGVcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbml0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAobnVsbCAhPSB0aGlzLnNldExldmVsSUQgJiYgZmFsc2UgPT0gdGhpcy5fbGV2ZWxQcmVwYXJlZCkge1xyXG4gICAgICAgICAgICAvL3ByZXBhcmUgcHJlZmFiIGhlcmVcclxuICAgICAgICAgICAgaWYgKDEpIHsgICAgLy9tYWtlIHN1cmUgcHJlZmFiIHByZXBhcmVkXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sZXZlbFByZXBhcmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNMZXZlbFByZXBhcmVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sZXZlbFByZXBhcmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDdXJyZW50TGV2ZWxSZXMoKTogYW55IHtcclxuICAgICAgICAvL1RPRE9cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QWN0b3JSZXNCeUlEKGlkOiBudW1iZXIpOiBhbnkge1xyXG4gICAgICAgIC8vVE9ET1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59IiwiLy8gaW1wb3J0IEV2ZW50Q2VudHJlIGZyb20gXCIuL1RveWJveC9FdmVudENlbnRyZVwiO1xyXG4vLyBpbXBvcnQgRGF0YWJhc2UgZnJvbSBcIi4vVG95Ym94L0RhdGFiYXNlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2VuZU1hbmFnZXJ7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFNjZW5lTWFuYWdlcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IEluc3RhbmNlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZSB8fCAodGhpcy5faW5zdGFuY2UgPSBuZXcgdGhpcygpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxvYWRpbmdTY2VuZTpzdHJpbmcgPSBcIkxvYWRpbmdTY2VuZS5zY2VuZVwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBnYW1lU2NlbmU6c3RyaW5nID0gXCJHYW1lU2NlbmUuc2NlbmVcIjtcclxuXHJcbiAgICBwdWJsaWMgYXdha2UoKTogdm9pZCB7XHJcbiAgICAgICAgTGF5YS5TY2VuZS5vcGVuKHRoaXMuZ2FtZVNjZW5lKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiIsImltcG9ydCB7dWl9IGZyb20gXCIuLi91aS9sYXlhTWF4VUlcIjtcclxuaW1wb3J0IFJob2Rlc0dhbWUgZnJvbSBcIi4uL0dhbWUvUmhvZGVzR2FtZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUgZXh0ZW5kcyB1aS5HYW1lU2NlbmVVSSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIFVJU2V0OiBMYXlhLlNwcml0ZTtcclxuICAgIHB1YmxpYyBzdGF0aWMgc3RhZ2U6IExheWEuU3RhZ2U7XHJcbiAgICBwcml2YXRlIF9wYXVzZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIC8v5YWo5bGA5pWw5o2u77yI5pWw5o2u5bqT57G75a6M5oiQ5ZCO5bCG6KKr5pu/5Luj77yJXHJcbiAgICBwdWJsaWMgc3RhdGljIGZyYW1lTGVuZ3RoOiBudW1iZXIgPSAyMDsvL+W4p+mVv+W6plxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7dWl9IGZyb20gXCIuLi91aS9sYXlhTWF4VUlcIlxyXG5cclxuXHJcbi8vVE9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZGluZyBleHRlbmRzIHVpLkxvYWRpbmdTY2VuZVVJe1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpXHJcbiAgICB9XHJcbn0iLCIvKipUaGlzIGNsYXNzIGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IExheWFBaXJJREUsIHBsZWFzZSBkbyBub3QgbWFrZSBhbnkgbW9kaWZpY2F0aW9ucy4gKi9cbmltcG9ydCBWaWV3PUxheWEuVmlldztcclxuaW1wb3J0IERpYWxvZz1MYXlhLkRpYWxvZztcclxuaW1wb3J0IFNjZW5lPUxheWEuU2NlbmU7XG52YXIgUkVHOiBGdW5jdGlvbiA9IExheWEuQ2xhc3NVdGlscy5yZWdDbGFzcztcbmV4cG9ydCBtb2R1bGUgdWkge1xyXG4gICAgZXhwb3J0IGNsYXNzIEdhbWVTY2VuZVVJIGV4dGVuZHMgU2NlbmUge1xyXG5cdFx0cHVibGljIFVJU2V0OkxheWEuU3ByaXRlO1xuXHRcdHB1YmxpYyBTaWRlQmFyOkxheWEuU3ByaXRlO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiR2FtZVNjZW5lXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLkdhbWVTY2VuZVVJXCIsR2FtZVNjZW5lVUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIExvYWRpbmdTY2VuZVVJIGV4dGVuZHMgU2NlbmUge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJMb2FkaW5nU2NlbmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkuTG9hZGluZ1NjZW5lVUlcIixMb2FkaW5nU2NlbmVVSSk7XHJcbn1cciJdfQ==
