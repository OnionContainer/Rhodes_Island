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
},{"./SceneScript/Game":46,"./SceneScript/Loading":47}],15:[function(require,module,exports){
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
        this.type = DodKey_1.ActorType.None; //默认身份为Actor
        res['xxx'] = 1145141919810;
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
        if (DodKey_1.ActorType.Monster == this.type) {
            this.route = new ActorRoute_1.default(this, res['xxx']);
        }
        else if (DodKey_1.ActorType.Operator == this.type) {
            this.skill = new ActorSkill_1.ActorSkill(this, res['xxx']);
            this.cost = new ActorCost_1.ActorCost(this);
        }
    }
    Actor.prototype.awake = function () {
        this.state.runState(ActorStateFsm_1.ActorStateID.Prepared);
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
},{"../../Common/DodKey":2,"../../Fix/FixSymbol":12,"./ActorModules/ActorBuffMgr":17,"./ActorModules/ActorCost":18,"./ActorModules/ActorSkill":19,"./ActorModules/Animation":20,"./ActorModules/Profile":22,"./ActorModules/Transform":23,"./ActorModules/UnitRender":24,"./ActorRoute":25,"./Attack/AtkAbst":26,"./Attack/Blocker":27,"./State/ActorStateFsm":29}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Actor_1 = require("./Actor");
var DodKey_1 = require("../../Common/DodKey");
var ActorStateFsm_1 = require("./State/ActorStateFsm");
var ActorMgr = /** @class */ (function () {
    function ActorMgr() {
        this.actors = new Array();
        //test
        this.createActor(DodKey_1.ActorType.Monster, {});
        this.actors[0].state.runState(ActorStateFsm_1.ActorStateID.Walk);
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
},{"../../Common/DodKey":2,"./Actor":15,"./State/ActorStateFsm":29}],17:[function(require,module,exports){
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
var DodMath_1 = require("../../../Common/DodMath");
/**
 * 对一个单位的几何状态的描述
 */
var Transform = /** @class */ (function () {
    function Transform(keeper) {
        this.pos = new Pos();
    }
    return Transform;
}());
exports.Transform = Transform;
var Pos = /** @class */ (function () {
    function Pos() {
        // public autoSwitchTarget:boolean = true;
        this.data = new DodMath_1.Vec2(0, 0); //位置
        this.target = new DodMath_1.Vec2(0, 0); //目标
        this.speed = 0; //速度
        this.approach = 0; //逼近次数
        this.vecSpeed = new DodMath_1.Vec2(0, 0); //分量速度
        this._arrived = true; //已到达目的地(每次设置新目的地时设为false)
    }
    Object.defineProperty(Pos.prototype, "arrived", {
        get: function () { return this._arrived; } //获取是否已到达的信息
        ,
        enumerable: true,
        configurable: true
    });
    /**
     * 设置目的地并重设分量速度
     * @param target
     */
    Pos.prototype.setTarget = function (target) {
        this.target = target;
        this.aim();
    };
    /**
     * 设置直线速度并重设分量速度
     * @param speed
     */
    Pos.prototype.setSpeed = function (speed) {
        this.speed = speed;
        this.aim();
    };
    /**
     * 计算移动参数,并将_arrived设为false
     * 将会重设分量速度和逼近次数
     */
    Pos.prototype.aim = function () {
        this.vecSpeed = DodMath_1.DodMath.moveToComponent(this.data, this.target, this.speed);
        this.approach = this.data.distanceTo(this.target) / this.speed;
        this._arrived = false;
    };
    /**
     * 向目标点移动一次
     */
    Pos.prototype.move = function () {
        this.approach -= 1;
        if (this.approach <= 0) {
            this.data.x = this.target.x;
            this.data.y = this.target.y;
            this._arrived = true;
            return;
        }
        this.data.x = this.data.x + this.vecSpeed.x;
        this.data.y = this.data.y + this.vecSpeed.y;
        return;
    };
    return Pos;
}());
},{"../../../Common/DodMath":4}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PerformanceCentre_1 = require("../../../Common/Graphics/Performance_Module/PerformanceCentre");
var DodMath_1 = require("../../../Common/DodMath");
var UnitRender = /** @class */ (function () {
    function UnitRender(keeper) {
        this._keeper = keeper;
    }
    UnitRender.prototype.deploy = function () {
        console.log("Deploy");
        PerformanceCentre_1.default.instance.displayActor(this._keeper, this._keeper.transform.pos.data, new DodMath_1.Vec2(50, 50));
    };
    UnitRender.prototype.move = function (vec) {
        PerformanceCentre_1.default.instance.move(this._keeper, vec);
    };
    return UnitRender;
}());
exports.UnitRender = UnitRender;
},{"../../../Common/DodMath":4,"../../../Common/Graphics/Performance_Module/PerformanceCentre":6}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DodMath_1 = require("../../Common/DodMath");
var Route = /** @class */ (function () {
    function Route(keeper, res) {
        this._path = DodMath_1.Vec2.listFromList([
            [500, 500],
            [0, 0],
            [500, 0],
            [0, 500]
        ]);
        this._tarCount = -1; //目前指向的目标
        //todo: 根据res获取应走的路线
    }
    Route.prototype.currentTarget = function () {
        return this._path[this._tarCount];
    };
    Route.prototype.next = function () {
        if (this._tarCount < this._path.length - 1) { //还有下一项
            this._tarCount += 1;
            return true;
        }
        else { //没有下一项
            return false;
        }
    };
    return Route;
}());
exports.default = Route;
},{"../../Common/DodMath":4}],26:[function(require,module,exports){
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
var ActorStateBase = /** @class */ (function () {
    function ActorStateBase(actor) {
        this._actor = actor;
    }
    ActorStateBase.prototype.enter = function () {
    };
    ActorStateBase.prototype.update = function () {
    };
    ActorStateBase.prototype.leave = function () {
    };
    ActorStateBase.prototype.reset = function () {
    };
    return ActorStateBase;
}());
exports.default = ActorStateBase;
},{}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DodLog_1 = require("../../../Common/DodLog");
var ActorStateWalk_1 = require("./ActorStateWalk");
var ActorStatePrepared_1 = require("./ActorStatePrepared");
var ActorStateID;
(function (ActorStateID) {
    ActorStateID[ActorStateID["None"] = 0] = "None";
    ActorStateID[ActorStateID["Prepared"] = 1] = "Prepared";
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
        this._states = [];
        this._currentState = null;
        this._states[ActorStateID.Walk] = new ActorStateWalk_1.ActorStateWalk(actor);
        this._states[ActorStateID.Prepared] = new ActorStatePrepared_1.ActorStatePrepared(actor);
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
},{"../../../Common/DodLog":3,"./ActorStatePrepared":30,"./ActorStateWalk":31}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActorStateBase_1 = require("./ActorStateBase");
var ActorStatePrepared = /** @class */ (function (_super) {
    __extends(ActorStatePrepared, _super);
    function ActorStatePrepared() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ActorStatePrepared;
}(ActorStateBase_1.default));
exports.ActorStatePrepared = ActorStatePrepared;
},{"./ActorStateBase":28}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActorStateBase_1 = require("./ActorStateBase");
var ActorStateWalk = /** @class */ (function (_super) {
    __extends(ActorStateWalk, _super);
    function ActorStateWalk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActorStateWalk.prototype.enter = function () {
        //不应该在这个状态里，应该在born里进行deploy
        this._actor.render.deploy();
    };
    ActorStateWalk.prototype.update = function () {
        var actor = this._actor;
        if (this._actor.transform.pos.arrived) { //已到达目的地
            if (actor.route.next()) { //存在下一个目标节点
                actor.transform.pos.setTarget(actor.route.currentTarget()); //将目标替换为下一个目标节点
            }
            else {
                //todo: 敌人已到达终点
            }
        }
        actor.transform.pos.move(); //移动
        actor.coliEmit.posByVec(actor.transform.pos.data); //移动碰撞箱
        actor.coliEmit.event(actor, actor.type); //发布碰撞事件
        actor.render.move(actor.transform.pos.data); //移动可视对象
    };
    return ActorStateWalk;
}(ActorStateBase_1.default));
exports.ActorStateWalk = ActorStateWalk;
},{"./ActorStateBase":28}],32:[function(require,module,exports){
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
},{"../../Fix/FixSymbol":12}],33:[function(require,module,exports){
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
},{"../Resources/DodResourceMgr":44,"./Actor/ActorMgr":16,"./Collision/ActorCollisionProcessor":32,"./GameLevel":35}],34:[function(require,module,exports){
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
},{}],35:[function(require,module,exports){
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
},{"../Fix/FixTime":13,"./GameBattleConst":34}],36:[function(require,module,exports){
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
},{"../Common/DodLog":3,"./GameBattle":33,"./State/GameStateMgr":42}],37:[function(require,module,exports){
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
},{}],38:[function(require,module,exports){
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
},{"./GameStateBase":37}],39:[function(require,module,exports){
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
},{"../../Common/DodLog":3,"../../Resources/DodResourceMgr":44,"../RhodesGame":36,"./GameStateBase":37,"./GameStateMgr":42}],40:[function(require,module,exports){
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
},{"../../Common/DodLog":3,"../../Resources/DodResourceMgr":44,"../RhodesGame":36,"./GameStateBase":37,"./GameStateMgr":42}],41:[function(require,module,exports){
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
},{"./GameStateBase":37}],42:[function(require,module,exports){
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
},{"../../Common/DodLog":3,"./GameStateBattle":38,"./GameStateGameload":39,"./GameStateLevelload":40,"./GameStateLobby":41}],43:[function(require,module,exports){
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
        console.log("PC init");
        PerformanceCentre_1.default.initialize(Laya.stage);
        //test
        PerformanceCentre_1.default.instance.initBoard([
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ], new DodMath_1.Vec2(50, 50), new DodMath_1.Vec2(100, 100), "#ff00ff", "#ffff00");
        //test end
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
},{"./Common/DodMath":4,"./Common/Graphics/Performance_Module/PerformanceCentre":6,"./Event/EventCentre":11,"./Fix/FixTime":13,"./Game/RhodesGame":36,"./GameConfig":14,"./Resources/DodResourceMgr":44,"./SceneManager":45}],44:[function(require,module,exports){
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
},{}],45:[function(require,module,exports){
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
},{}],46:[function(require,module,exports){
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
},{"../ui/layaMaxUI":48}],47:[function(require,module,exports){
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
},{"../ui/layaMaxUI":48}],48:[function(require,module,exports){
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
},{}]},{},[43])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xheWEvTGF5YUFpcklERS9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQ29tbW9uL0RvZERhdGFTdHJ1Y3R1cmUudHMiLCJzcmMvQ29tbW9uL0RvZEtleS50cyIsInNyYy9Db21tb24vRG9kTG9nLnRzIiwic3JjL0NvbW1vbi9Eb2RNYXRoLnRzIiwic3JjL0NvbW1vbi9HcmFwaGljcy9QZXJmb3JtYW5jZV9Nb2R1bGUvQWN0b3JDb21wb25lbnQudHMiLCJzcmMvQ29tbW9uL0dyYXBoaWNzL1BlcmZvcm1hbmNlX01vZHVsZS9QZXJmb3JtYW5jZUNlbnRyZS50cyIsInNyYy9Db21tb24vR3JhcGhpY3MvUGVyZm9ybWFuY2VfTW9kdWxlL1N5bWJvbGl6ZWRSZW5kZXIudHMiLCJzcmMvQ29tbW9uL0dyYXBoaWNzL1BlcmZvcm1hbmNlX01vZHVsZS9VbnN5bWJvbGl6ZWRSZW5kZXIudHMiLCJzcmMvQ29tbW9uL0dyYXBoaWNzL1BlcmZvcm1hbmNlX01vZHVsZS9jdXN0b21pemVkU3ByLnRzIiwic3JjL0NvbW1vbi9HcmFwaGljcy9QZXJmb3JtYW5jZV9Nb2R1bGUvb2JqYm94LnRzIiwic3JjL0V2ZW50L0V2ZW50Q2VudHJlLnRzIiwic3JjL0ZpeC9GaXhTeW1ib2wudHMiLCJzcmMvRml4L0ZpeFRpbWUudHMiLCJzcmMvR2FtZUNvbmZpZy50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yLnRzIiwic3JjL0dhbWUvQWN0b3IvQWN0b3JNZ3IudHMiLCJzcmMvR2FtZS9BY3Rvci9BY3Rvck1vZHVsZXMvQWN0b3JCdWZmTWdyLnRzIiwic3JjL0dhbWUvQWN0b3IvQWN0b3JNb2R1bGVzL0FjdG9yQ29zdC50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yTW9kdWxlcy9BY3RvclNraWxsLnRzIiwic3JjL0dhbWUvQWN0b3IvQWN0b3JNb2R1bGVzL0FuaW1hdGlvbi50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yTW9kdWxlcy9EYW1hZ2UudHMiLCJzcmMvR2FtZS9BY3Rvci9BY3Rvck1vZHVsZXMvUHJvZmlsZS50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yTW9kdWxlcy9UcmFuc2Zvcm0udHMiLCJzcmMvR2FtZS9BY3Rvci9BY3Rvck1vZHVsZXMvVW5pdFJlbmRlci50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yUm91dGUudHMiLCJzcmMvR2FtZS9BY3Rvci9BdHRhY2svQXRrQWJzdC50cyIsInNyYy9HYW1lL0FjdG9yL0F0dGFjay9CbG9ja2VyLnRzIiwic3JjL0dhbWUvQWN0b3IvU3RhdGUvQWN0b3JTdGF0ZUJhc2UudHMiLCJzcmMvR2FtZS9BY3Rvci9TdGF0ZS9BY3RvclN0YXRlRnNtLnRzIiwic3JjL0dhbWUvQWN0b3IvU3RhdGUvQWN0b3JTdGF0ZVByZXBhcmVkLnRzIiwic3JjL0dhbWUvQWN0b3IvU3RhdGUvQWN0b3JTdGF0ZVdhbGsudHMiLCJzcmMvR2FtZS9Db2xsaXNpb24vQWN0b3JDb2xsaXNpb25Qcm9jZXNzb3IudHMiLCJzcmMvR2FtZS9HYW1lQmF0dGxlLnRzIiwic3JjL0dhbWUvR2FtZUJhdHRsZUNvbnN0LnRzIiwic3JjL0dhbWUvR2FtZUxldmVsLnRzIiwic3JjL0dhbWUvUmhvZGVzR2FtZS50cyIsInNyYy9HYW1lL1N0YXRlL0dhbWVTdGF0ZUJhc2UudHMiLCJzcmMvR2FtZS9TdGF0ZS9HYW1lU3RhdGVCYXR0bGUudHMiLCJzcmMvR2FtZS9TdGF0ZS9HYW1lU3RhdGVHYW1lbG9hZC50cyIsInNyYy9HYW1lL1N0YXRlL0dhbWVTdGF0ZUxldmVsbG9hZC50cyIsInNyYy9HYW1lL1N0YXRlL0dhbWVTdGF0ZUxvYmJ5LnRzIiwic3JjL0dhbWUvU3RhdGUvR2FtZVN0YXRlTWdyLnRzIiwic3JjL01haW4udHMiLCJzcmMvUmVzb3VyY2VzL0RvZFJlc291cmNlTWdyLnRzIiwic3JjL1NjZW5lTWFuYWdlci50cyIsInNyYy9TY2VuZVNjcmlwdC9HYW1lLnRzIiwic3JjL1NjZW5lU2NyaXB0L0xv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QixJQUFJOzs7O0FDSnpCLDZDQUFrQztBQUdsQyxJQUFJO0FBQ0o7SUFBcUMsMkJBQWlCO0lBQ2xEO2VBQ0ksaUJBQU87SUFDWCxDQUFDO0lBQ0wsY0FBQztBQUFELENBSkEsQUFJQyxDQUpvQyxjQUFFLENBQUMsY0FBYyxHQUlyRDs7Ozs7QUNMRCxJQUFPLEtBQUssR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0FBQ3hCLElBQUksR0FBRyxHQUFhLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO0FBQzdDLElBQWMsRUFBRSxDQW1CZjtBQW5CRCxXQUFjLEVBQUU7SUFDWjtRQUFpQywrQkFBSztRQUdsQzttQkFBZSxpQkFBTztRQUFBLENBQUM7UUFDdkIsb0NBQWMsR0FBZDtZQUNJLGlCQUFNLGNBQWMsV0FBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUNMLGtCQUFDO0lBQUQsQ0FSQSxBQVFDLENBUmdDLEtBQUssR0FRckM7SUFSWSxjQUFXLGNBUXZCLENBQUE7SUFDRCxHQUFHLENBQUMsZ0JBQWdCLEVBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEM7UUFBb0Msa0NBQUs7UUFDckM7bUJBQWUsaUJBQU87UUFBQSxDQUFDO1FBQ3ZCLHVDQUFjLEdBQWQ7WUFDSSxpQkFBTSxjQUFjLFdBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFDTCxxQkFBQztJQUFELENBTkEsQUFNQyxDQU5tQyxLQUFLLEdBTXhDO0lBTlksaUJBQWMsaUJBTTFCLENBQUE7SUFDRCxHQUFHLENBQUMsbUJBQW1CLEVBQUMsY0FBYyxDQUFDLENBQUM7QUFDNUMsQ0FBQyxFQW5CYSxFQUFFLEdBQUYsVUFBRSxLQUFGLFVBQUUsUUFtQmYiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG4oZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHsgQ29tcGFyYWJsZSB9IGZyb20gXCIuL0RvZE1hdGhcIjtcclxuXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEtWUGFpcjxWPntcclxuICAgIHByaXZhdGUgX2xpc3Q6YW55ID0ge307XHJcbiAgICBwdWJsaWMgZWRpdChrZXk6c3RyaW5nLCB2YWx1ZTpWKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX2xpc3Rba2V5XSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHJlYWQoa2V5OnN0cmluZyk6VntcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGlzdFtrZXldO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgaXRlcmF0ZShmOihrOnN0cmluZyx2OlYpPT52b2lkKTp2b2lke1xyXG4gICAgICAgIGZvciAobGV0IGsgaW4gdGhpcy5fbGlzdCkge1xyXG4gICAgICAgICAgICBmKGssIHRoaXMuX2xpc3Rba10pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbmNsYXNzIE5vZGU8RT57XHJcbiAgICBwdWJsaWMgaXRlbTpFO1xyXG4gICAgcHVibGljIG5leHQ6Tm9kZTxFPjtcclxuICAgIGNvbnN0cnVjdG9yKGl0ZW06RSwgbmV4dDpOb2RlPEU+KXtcclxuICAgICAgICB0aGlzLml0ZW0gPSBpdGVtO1xyXG4gICAgICAgIHRoaXMubmV4dCA9IG5leHQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBMaW5rTGlzdDxFPntcclxuICAgIHByaXZhdGUgX2hlYWQ6Tm9kZTxFPjtcclxuICAgIHByaXZhdGUgX3RhaWw6Tm9kZTxFPjtcclxuICAgIHByaXZhdGUgX2xlbmd0aDpudW1iZXIgPSAwO1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLl9oZWFkID0gbmV3IE5vZGU8RT4obnVsbCwgbnVsbCk7XHJcbiAgICAgICAgdGhpcy5fdGFpbCA9IG5ldyBOb2RlPEU+KG51bGwsIG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Z+656GA5bGe5oCnXHJcbiAgICBwdWJsaWMgZ2V0IGxlbmd0aCgpOm51bWJlcntcclxuICAgICAgICAvLyBsZXQgcmVzdWx0Om51bWJlciA9IDA7XHJcbiAgICAgICAgLy8gbGV0IGN1cnJlbnQ6Tm9kZTxFPiA9IHRoaXMuX2hlYWQ7XHJcbiAgICAgICAgLy8gd2hpbGUgKGN1cnJlbnQubmV4dCAhPT0gbnVsbCkge1xyXG4gICAgICAgIC8vICAgICByZXN1bHQgKz0gMTtcclxuICAgICAgICAvLyAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaXNFbXB0eSgpOmJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hlYWQubmV4dCA9PT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvL+WinuWIoOaUueafpVxyXG4gICAgLy/lop5cclxuICAgIHB1YmxpYyBwdXNoKGl0ZW06RSk6dm9pZHtcclxuICAgICAgICBsZXQgbGFzdDpOb2RlPEU+ID0gbmV3IE5vZGU8RT4oaXRlbSwgbnVsbCk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbXB0eSkge1xyXG4gICAgICAgICAgICB0aGlzLl9oZWFkLm5leHQgPSBsYXN0O1xyXG4gICAgICAgICAgICB0aGlzLl90YWlsLm5leHQgPSBsYXN0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RhaWwubmV4dC5uZXh0ID0gbGFzdDtcclxuICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0ID0gbGFzdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbGVuZ3RoICs9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVuc2hpZnQoaXRlbTpFKTp2b2lke1xyXG4gICAgICAgIGxldCBmaXJzdDpOb2RlPEU+ID0gbmV3IE5vZGU8RT4oaXRlbSwgbnVsbCk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbXB0eSkge1xyXG4gICAgICAgICAgICB0aGlzLl90YWlsLm5leHQgPSBmaXJzdDtcclxuICAgICAgICAgICAgdGhpcy5faGVhZC5uZXh0ID0gZmlyc3Q7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZmlyc3QubmV4dCA9IHRoaXMuX2hlYWQubmV4dDtcclxuICAgICAgICAgICAgdGhpcy5faGVhZC5uZXh0ID0gZmlyc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2xlbmd0aCArPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbnNlcnQoaW5kZXg6bnVtYmVyLCBpdGVtOkUpOmJvb2xlYW57XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+IHRoaXMuX2xlbmd0aCkgey8v6L+Z5Y+l5LiN5LiA5qC3XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpbmRleCA9PT0gdGhpcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjdXJyZW50Ok5vZGU8RT4gPSB0aGlzLl9oZWFkOy8v6L+Z5Y+l5ZKM5YW25LuW6YGN5Y6G5piv5LiN5LiA5qC355qE77yM5Zug5Li66KaB6YCJ5Y+W5Yiw6YCJ5a6a5L2N572u55qE5YmN6Z2i5LiA5qC8XHJcbiAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBpbmRleDsgbiArPSAxKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjdXJyZW50Lm5leHQgPSBuZXcgTm9kZTxFPihpdGVtLCBjdXJyZW50Lm5leHQpO1xyXG4gICAgICAgIHRoaXMuX2xlbmd0aCArPSAxO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIoFxyXG4gICAgcHVibGljIHJlbW92ZShpbmRleDpudW1iZXIpOkV7XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjdXJyZW50Ok5vZGU8RT4gPSB0aGlzLl9oZWFkLm5leHQ7XHJcbiAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBpbmRleDsgbiArPSAxKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaXRlbTpFID0gY3VycmVudC5pdGVtO1xyXG4gICAgICAgIGN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2xlbmd0aCAtPSAxO1xyXG5cclxuICAgICAgICByZXR1cm4gY3VycmVudC5pdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaGlmdCgpOkV7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbXB0eSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBpdGVtID0gdGhpcy5faGVhZC5uZXh0Lml0ZW07XHJcbiAgICAgICAgdGhpcy5faGVhZC5uZXh0ID0gdGhpcy5faGVhZC5uZXh0Lm5leHQ7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzRW1wdHkpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0ID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2xlbmd0aCAtPSAxO1xyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pS5XHJcbiAgICBwdWJsaWMgd3JpdGUoaW5kZXg6bnVtYmVyLCBpdGVtOkUpOnZvaWR7XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY3VycmVudDpOb2RlPEU+ID0gdGhpcy5faGVhZC5uZXh0O1xyXG4gICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgaW5kZXg7IG4gKz0gMSkge1xyXG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3VycmVudC5pdGVtID0gaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICAvL+afpVxyXG4gICAgcHVibGljIHJlYWQoaW5kZXg6bnVtYmVyKTpFe1xyXG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGN1cnJlbnQ6Tm9kZTxFPiA9IHRoaXMuX2hlYWQubmV4dDtcclxuICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IGluZGV4OyBuICs9IDEpIHtcclxuICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjdXJyZW50Lml0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlYXJjaChpdGVtOkUpOm51bWJlcltde1xyXG4gICAgICAgIGxldCByZXN1bHQ6bnVtYmVyW10gPSBbXTtcclxuICAgICAgICB0aGlzLmZvcmVhY2goKGVsZTpFLCBpbmRleDpudW1iZXIpPT57XHJcbiAgICAgICAgICAgIGlmIChlbGUgPT09IGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3pk77ooajkuK3mmK/lkKblrZjlnKjmn5DkuIDlhYPntKBcclxuICAgICAqIEBwYXJhbSBpdGVtIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaGFzKGl0ZW06IEUpOmJvb2xlYW57XHJcblxyXG4gICAgICAgIGxldCBjdXJyZW50ID0gdGhpcy5faGVhZC5uZXh0O1xyXG4gICAgICAgIHdoaWxlIChjdXJyZW50ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnQuaXRlbSA9PSBpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6auY6Zi25Ye95pWwXHJcbiAgICBwdWJsaWMgZm9yZWFjaChmOihlbGU6RSwgaW5kZXg6bnVtYmVyLCBsaXN0OkxpbmtMaXN0PEU+KT0+dm9pZCk6dm9pZHtcclxuICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMuX2hlYWQubmV4dDtcclxuICAgICAgICBsZXQgbnVtOm51bWJlciA9IDA7XHJcbiAgICAgICAgd2hpbGUgKGN1cnJlbnQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgZihjdXJyZW50Lml0ZW0sIG51bSwgdGhpcyk7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbiAgICAgICAgICAgIG51bSArPSAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOivt+aaguaXtuS4jeimgeS9v+eUqOi/meS4quWHveaVsO+8jOWboOS4uuaIkeS5n+S4jeefpemBk+Wug+S8muS4jeS8mueIhueCuFxyXG4gICAgICog6Zmk6Z2e5L2g6K+76L+H6L+Z5Liq5Ye95pWw55qE5rqQ5Luj56CBXHJcbiAgICAgKiBAcGFyYW0gZiDliKTmlq3lhYPntKDkvJjlhYjnuqfnmoTlm57osIPlh73mlbBcclxuICAgICAqIEBwYXJhbSBpbmNyZWFzZSDmmK/lkKbljYfluo/vvIzpu5jorqTljYfluo9cclxuICAgICAqIEByZXR1cm5zIOi/lOWbnuS4gOS4quaOkuW6j+eahOmTvuihqFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc29ydGJ5KGY6KGVsZTpFKT0+bnVtYmVyLCBpbmNyZWFzZTpib29sZWFuID0gdHJ1ZSk6TGlua0xpc3Q8RT57XHJcbiAgICAgICAgbGV0IHByaW9yaXR5OkxpbmtMaXN0PG51bWJlcj4gPSBuZXcgTGlua0xpc3Q8bnVtYmVyPigpO1xyXG4gICAgICAgIGxldCBzb3J0ZWQ6TGlua0xpc3Q8RT4gPSBuZXcgTGlua0xpc3Q8RT4oKTtcclxuICAgICAgICBwcmlvcml0eS5wdXNoKC0wKTtcclxuICAgICAgICBzb3J0ZWQucHVzaChudWxsKTtcclxuXHJcbiAgICAgICAgbGV0IGNvbXBhcmU6KGE6bnVtYmVyLGI6bnVtYmVyKT0+Ym9vbGVhbiA9IGluY3JlYXNlPyhhLGIpPT57cmV0dXJuIGEgPCBiO306KGEsYik9PntyZXR1cm4gYSA+IGJ9O1xyXG5cclxuICAgICAgICB0aGlzLmZvcmVhY2goKGVsZSk9PntcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRQcmkgPSBmKGVsZSk7XHJcbiAgICAgICAgICAgIGxldCBub2RlOk5vZGU8RT4gPSBzb3J0ZWQuX2hlYWQubmV4dDtcclxuICAgICAgICAgICAgbGV0IHByaU5vZGU6Tm9kZTxudW1iZXI+ID0gcHJpb3JpdHkuX2hlYWQubmV4dDtcclxuXHJcbiAgICAgICAgICAgIGxldCBmb3VuZFBsYWNlOmJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgd2hpbGUgKG5vZGUubmV4dCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgKGN1cnJlbnRQcmkgPCBwcmlOb2RlLm5leHQuaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBhcmUoY3VycmVudFByaSwgcHJpTm9kZS5uZXh0Lml0ZW0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5uZXh0ID0gbmV3IE5vZGU8RT4oZWxlLCBub2RlLm5leHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHByaU5vZGUubmV4dCA9IG5ldyBOb2RlPG51bWJlcj4oY3VycmVudFByaSwgcHJpTm9kZS5uZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICBmb3VuZFBsYWNlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5uZXh0O1xyXG4gICAgICAgICAgICAgICAgcHJpTm9kZSA9IHByaU5vZGUubmV4dDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFmb3VuZFBsYWNlKSB7XHJcbiAgICAgICAgICAgICAgICBzb3J0ZWQucHVzaChlbGUpO1xyXG4gICAgICAgICAgICAgICAgcHJpb3JpdHkucHVzaChjdXJyZW50UHJpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzb3J0ZWQuc2hpZnQoKTtcclxuICAgICAgICByZXR1cm4gc29ydGVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHB1YmxpYyBiYlNvcnRCeShmOihlbGU6RSk9Pm51bWJlciwgaW5jcmVhc2U6Ym9vbGVhbiA9IHRydWUpOkxpbmtMaXN0PEU+e1xyXG5cclxuICAgIC8vIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQQXJyYXk8RT57XHJcbiAgICBwdWJsaWMgYXJyOkVbXTtcclxuICAgIHB1YmxpYyBwb2ludGVyOm51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2U6RVtdID0gW10sIGluaXRQb2ludDpudW1iZXIgPSAtMSl7XHJcbiAgICAgICAgdGhpcy5hcnIgPSBzb3VyY2U7XHJcbiAgICAgICAgdGhpcy5wb2ludGVyID0gaW5pdFBvaW50O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWFkKCk6RXtcclxuICAgICAgICByZXR1cm4gdGhpcy5hcnJbdGhpcy5wb2ludGVyXTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIHN0ZXAoKTp2b2lke1xyXG4gICAgICAgIHRoaXMucG9pbnRlciArPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgb3V0KCk6Ym9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5wb2ludGVyIDwgMCB8fCB0aGlzLnBvaW50ZXIgPj0gdGhpcy5hcnIubGVuZ3RoO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBBcnJheUFsZ297XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDovpPlhaXnmoTkuKTkuKrmlbDnu4TnmoTmr4/kuKppbmRleOWvueW6lOWFg+e0oOaYr+WQpuebuOetiVxyXG4gICAgICogQHBhcmFtIGFycjAgXHJcbiAgICAgKiBAcGFyYW0gYXJyMSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzdHJpY3RDb21wYXJlKGFycjA6Q29tcGFyYWJsZVtdLCBhcnIxOkNvbXBhcmFibGVbXSk6Ym9vbGVhbntcclxuICAgICAgICBpZiAoYXJyMC5sZW5ndGggIT09IGFycjEubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIwLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgIGlmICghYXJyMFtpXS5lcXVhbHMoYXJyMVtpXSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57kuIDkuKrpm4blkIhj77yM5LiU5L2/5b6X5a6D5YW35pyJ5aaC5LiL5oCn6LSo77yaXHJcbiAgICAgKiDlr7nkuo7mr4/kuKrlrZjlnKjkuo7pm4blkIhh5Lit55qE5YWD57Sg77yM5aaC5p6c5a6D5LiN5Zyo6ZuG5ZCIYuS4re+8jOWImeWug+WcqOmbhuWQiGPkuK1cclxuICAgICAqIOWNs2M9YS1iXHJcbiAgICAgKiBAcGFyYW0gYSBcclxuICAgICAqIEBwYXJhbSBiIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGZpbmRDb21wbGVtZW50U2V0KGE6Q29tcGFyYWJsZVtdLCBiOkNvbXBhcmFibGVbXSk6Q29tcGFyYWJsZVtde1xyXG4gICAgICAgIGxldCByZXN1bHQ6Q29tcGFyYWJsZVtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgZWxlIG9mIGEpIHtcclxuICAgICAgICAgICAgaWYgKEFycmF5QWxnby5maW5kRWxlKGVsZSwgYikgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChlbGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvL+axguebuOWvueihpembhmEtYlxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBmaW5kSW50ZXJzZWN0aW9uU2V0KGE6Q29tcGFyYWJsZVtdLCBiOkNvbXBhcmFibGVbXSl7XHJcbiAgICAgICAgLy/msYLkuqTpm4Zh4oipYlxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5rGCZWxl5ZyoYXJy5Lit55qEaW5kZXjvvIzoi6XmnKrmib7liLDliJnov5Tlm54tMVxyXG4gICAgICogZWxl5b+F6aG75a6e546wY29tcGFyYWJsZeaOpeWPo1xyXG4gICAgICogQHBhcmFtIGVsZSBcclxuICAgICAqIEBwYXJhbSBhcnIgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZmluZEVsZShlbGU6Q29tcGFyYWJsZSwgYXJyOkNvbXBhcmFibGVbXSk6bnVtYmVye1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgIGlmIChlbGUuZXF1YWxzKGFycltpXSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS7jmFycuS4reenu+mZpGVsZVxyXG4gICAgICog5aaC5p6cZWxl5LiN5a2Y5Zyo5YiZ5LuA5LmI6YO95LiN5YGaXHJcbiAgICAgKiBAcGFyYW0gZWxlIFxyXG4gICAgICogQHBhcmFtIGFyciBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByZW1vdmVFbGUoZWxlOmFueSwgYXJyOmFueVtdKTphbnlbXXtcclxuICAgICAgICBjb25zdCBpID0gYXJyLmluZGV4T2YoZWxlKTtcclxuICAgICAgICBpZiAoaSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgYXJyLnNwbGljZShpLDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG4vLyBleHBvcnQgY2xhc3MgQm94IGV4dGVuZHMgTGF5YS5SZWN0YW5nbGV7XHJcblxyXG4vLyAgICAgcHVibGljIHVuaXRYOm51bWJlcjtcclxuLy8gICAgIHB1YmxpYyB1bml0WTpudW1iZXI7XHJcbiAgICBcclxuXHJcbi8vICAgICBjb25zdHJ1Y3Rvcigpe1xyXG4vLyAgICAgICAgIHN1cGVyKDAsMCwwLDApO1xyXG4vLyAgICAgfVxyXG4gICBcclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOWwseaYr+KApuKApuadpeS4gOe7hO+8iDEwMOS4qu+8iemaj+acuueahOeisOaSnueusVxyXG4vLyAgICAgICogQHBhcmFtIHhSYW5nZSBcclxuLy8gICAgICAqIEBwYXJhbSB5UmFuZ2UgXHJcbi8vICAgICAgKiBAcGFyYW0gd2lkUmFuZ2UgXHJcbi8vICAgICAgKiBAcGFyYW0gaGlnUmFuZ2VcclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHVibGljIHN0YXRpYyByYW5kb21Cb3hlcyh4UmFuZ2U6bnVtYmVyID0gMTIwMCwgeVJhbmdlOm51bWJlciA9IDgwMCwgd2lkUmFuZ2U6bnVtYmVyID0gMzAwLCBoaWdSYW5nZTpudW1iZXIgPSAzMDApOkJveFtde1xyXG4vLyAgICAgICAgIGNvbnN0IHJhZDpGdW5jdGlvbiA9IE15TWF0aC5yYW5kb21JbnQ7XHJcbi8vICAgICAgICAgbGV0IHJlc3VsdDpCb3hbXSA9IFtdO1xyXG4vLyAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCA1MDsgaSArPSAxKSB7XHJcbi8vICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBCb3goKSk7XHJcbi8vICAgICAgICAgICAgIHJlc3VsdFtpXS5wb3MocmFkKHhSYW5nZSksIHJhZCh5UmFuZ2UpKS5zaXplKHJhZCh3aWRSYW5nZSksIHJhZChoaWdSYW5nZSkpO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIHB1YmxpYyBwb3MoeDpudW1iZXIsIHk6bnVtYmVyKTpCb3h7XHJcbi8vICAgICAgICAgdGhpcy54ID0geDtcclxuLy8gICAgICAgICB0aGlzLnkgPSB5O1xyXG4vLyAgICAgICAgIHJldHVybiB0aGlzO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIHB1YmxpYyBzaXplKHdpZHRoOm51bWJlciwgaGVpZ2h0Om51bWJlcik6Qm94e1xyXG4vLyAgICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuLy8gICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuLy8gICAgICAgICByZXR1cm4gdGhpcztcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBwdWJsaWMgaW50ZXJzZWN0c19YKHJlYzpCb3gpOmJvb2xlYW57XHJcbi8vICAgICAgICAgaWYgKHRoaXMueCA8IHJlYy54KSB7XHJcbi8vICAgICAgICAgICAgIHJldHVybiByZWMuaW50ZXJzZWN0c19YKHRoaXMpO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICByZXR1cm4gICh0aGlzLnggPj0gcmVjLnggJiYgdGhpcy54IDw9IHJlYy5yaWdodCkgfHxcclxuLy8gICAgICAgICAgICAgICAgICh0aGlzLnJpZ2h0ID49IHJlYy54ICYmIHRoaXMucmlnaHQgPD0gcmVjLnJpZ2h0KVxyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIHB1YmxpYyBpbnRlcnNlY3RzX1kocmVjOkJveCk6Ym9vbGVhbntcclxuLy8gICAgICAgICBpZiAodGhpcy55PHJlYy55KSB7XHJcbi8vICAgICAgICAgICAgIHJldHVybiByZWMuaW50ZXJzZWN0c19ZKHRoaXMpO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICByZXR1cm4gICh0aGlzLnkgPj0gcmVjLnkgJiYgdGhpcy55IDw9IHJlYy5ib3R0b20pIHx8XHJcbi8vICAgICAgICAgICAgICAgICAodGhpcy5ib3R0b20gPj0gcmVjLnkgJiYgdGhpcy5ib3R0b20gPD0gcmVjLmJvdHRvbSlcclxuLy8gICAgIH1cclxuLy8gfVxyXG4gICAgXHJcbi8vIGNsYXNzIE1hcE5vZGU8SyxWPntcclxuLy8gICAgIHB1YmxpYyBrZXk7XHJcbi8vICAgICBwdWJsaWMgdmFsdWU7XHJcbi8vICAgICBjb25zdHJ1Y3RvcihrZXk6SywgdmFsdWU6Vil7XHJcbi8vICAgICAgICAgdGhpcy5rZXkgPSBrZXk7XHJcbi8vICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4vLyAgICAgfVxyXG4vLyB9XHJcblxyXG4vLyBleHBvcnQgbW9kdWxlIFN0cnVje1xyXG4vLyAgICAgZXhwb3J0IGNsYXNzIExpbmtMaXN0PEU+e1xyXG4vLyAgICAgICAgIHByaXZhdGUgX2hlYWQ6Tm9kZTxFPjtcclxuLy8gICAgICAgICBwcml2YXRlIF90YWlsOk5vZGU8RT47XHJcbi8vICAgICAgICAgY29uc3RydWN0b3IoKXtcclxuLy8gICAgICAgICAgICAgdGhpcy5faGVhZCA9IG5ldyBOb2RlPEU+KG51bGwsIG51bGwpO1xyXG4vLyAgICAgICAgICAgICB0aGlzLl90YWlsID0gbmV3IE5vZGU8RT4obnVsbCwgbnVsbCk7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvL+WfuuehgOWxnuaAp1xyXG4vLyAgICAgICAgIHB1YmxpYyBnZXQgbGVuZ3RoKCk6bnVtYmVye1xyXG4vLyAgICAgICAgICAgICBsZXQgcmVzdWx0Om51bWJlciA9IDA7XHJcbi8vICAgICAgICAgICAgIGxldCBjdXJyZW50Ok5vZGU8RT4gPSB0aGlzLl9oZWFkO1xyXG4vLyAgICAgICAgICAgICB3aGlsZSAoY3VycmVudC5uZXh0ICE9PSBudWxsKSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXN1bHQgKz0gMTtcclxuLy8gICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIHB1YmxpYyBnZXQgaXNFbXB0eSgpOmJvb2xlYW57XHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLl9oZWFkLm5leHQgPT09IG51bGw7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvL+WinuWIoOaUueafpVxyXG4vLyAgICAgICAgIC8v5aKeXHJcbi8vICAgICAgICAgcHVibGljIHB1c2goaXRlbTpFKTp2b2lke1xyXG4vLyAgICAgICAgICAgICBsZXQgbGFzdDpOb2RlPEU+ID0gbmV3IE5vZGU8RT4oaXRlbSwgbnVsbCk7XHJcbi8vICAgICAgICAgICAgIGlmICh0aGlzLmlzRW1wdHkpIHtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuX2hlYWQubmV4dCA9IGxhc3Q7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLl90YWlsLm5leHQgPSBsYXN0O1xyXG4vLyAgICAgICAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0Lm5leHQgPSBsYXN0O1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0ID0gbGFzdDtcclxuLy8gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIHB1YmxpYyB1bnNoaWZ0KGl0ZW06RSk6dm9pZHtcclxuLy8gICAgICAgICAgICAgbGV0IGZpcnN0Ok5vZGU8RT4gPSBuZXcgTm9kZTxFPihpdGVtLCBudWxsKTtcclxuLy8gICAgICAgICAgICAgaWYgKHRoaXMuaXNFbXB0eSkge1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0ID0gZmlyc3Q7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLl9oZWFkLm5leHQgPSBmaXJzdDtcclxuLy8gICAgICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgIGZpcnN0Lm5leHQgPSB0aGlzLl9oZWFkLm5leHQubmV4dDtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuX2hlYWQubmV4dCA9IGZpcnN0O1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBwdWJsaWMgaW5zZXJ0KGluZGV4Om51bWJlciwgaXRlbTpFKTpib29sZWFue1xyXG4vLyAgICAgICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID4gdGhpcy5sZW5ndGgpIHsvL+i/meWPpeS4jeS4gOagt1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBpZiAoaW5kZXggPT09IHRoaXMubGVuZ3RoKSB7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLnB1c2goaXRlbSk7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IGN1cnJlbnQ6Tm9kZTxFPiA9IHRoaXMuX2hlYWQ7Ly/ov5nlj6Xlkozlhbbku5bpgY3ljobmmK/kuI3kuIDmoLfnmoTvvIzlm6DkuLropoHpgInlj5bliLDpgInlrprkvY3nva7nmoTliY3pnaLkuIDmoLxcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBpbmRleDsgbiArPSAxKSB7XHJcbi8vICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBjdXJyZW50Lm5leHQgPSBuZXcgTm9kZTxFPihpdGVtLCBjdXJyZW50Lm5leHQpO1xyXG5cclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvL+WIoFxyXG4vLyAgICAgICAgIHB1YmxpYyByZW1vdmUoaW5kZXg6bnVtYmVyKTpFe1xyXG4vLyAgICAgICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMubGVuZ3RoKSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IGN1cnJlbnQ6Tm9kZTxFPiA9IHRoaXMuX2hlYWQubmV4dDtcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBpbmRleDsgbiArPSAxKSB7XHJcbi8vICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgaXRlbTpFID0gY3VycmVudC5pdGVtO1xyXG4vLyAgICAgICAgICAgICBjdXJyZW50ID0gbnVsbDtcclxuXHJcbi8vICAgICAgICAgICAgIHJldHVybiBjdXJyZW50Lml0ZW07XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBwdWJsaWMgc2hpZnQoKTpFe1xyXG4vLyAgICAgICAgICAgICBpZiAodGhpcy5pc0VtcHR5KSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLl9oZWFkLm5leHQuaXRlbTtcclxuLy8gICAgICAgICAgICAgdGhpcy5faGVhZC5uZXh0ID0gdGhpcy5faGVhZC5uZXh0Lm5leHQ7XHJcbi8vICAgICAgICAgICAgIGlmICh0aGlzLmlzRW1wdHkpIHtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuX3RhaWwubmV4dCA9IG51bGw7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvL+aUuVxyXG4vLyAgICAgICAgIHB1YmxpYyB3cml0ZShpbmRleDpudW1iZXIsIGl0ZW06RSk6dm9pZHtcclxuLy8gICAgICAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLmxlbmd0aCkge1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgY3VycmVudDpOb2RlPEU+ID0gdGhpcy5faGVhZC5uZXh0O1xyXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IGluZGV4OyBuICs9IDEpIHtcclxuLy8gICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIGN1cnJlbnQuaXRlbSA9IGl0ZW07XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvL+afpVxyXG4vLyAgICAgICAgIHB1YmxpYyByZWFkKGluZGV4Om51bWJlcik6RXtcclxuLy8gICAgICAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLmxlbmd0aCkge1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgY3VycmVudDpOb2RlPEU+ID0gdGhpcy5faGVhZC5uZXh0O1xyXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IGluZGV4OyBuICs9IDEpIHtcclxuLy8gICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIHJldHVybiBjdXJyZW50Lml0ZW07XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBwdWJsaWMgc2VhcmNoKGl0ZW06RSk6bnVtYmVyW117XHJcbi8vICAgICAgICAgICAgIGxldCByZXN1bHQ6bnVtYmVyW10gPSBbXTtcclxuLy8gICAgICAgICAgICAgdGhpcy5mb3JlYWNoKChlbGU6RSwgaW5kZXg6bnVtYmVyKT0+e1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKGVsZSA9PT0gaXRlbSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGluZGV4KTtcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfSk7XHJcbi8vICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvKipcclxuLy8gICAgICAgICAgKiDliKTmlq3pk77ooajkuK3mmK/lkKblrZjlnKjmn5DkuIDlhYPntKBcclxuLy8gICAgICAgICAgKiBAcGFyYW0gaXRlbSBcclxuLy8gICAgICAgICAgKi9cclxuLy8gICAgICAgICBwdWJsaWMgaGFzKGl0ZW06IEUpOmJvb2xlYW57XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMuX2hlYWQubmV4dDtcclxuLy8gICAgICAgICAgICAgd2hpbGUgKGN1cnJlbnQgIT0gbnVsbCkge1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQuaXRlbSA9PSBpdGVtKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvL+mrmOmYtuWHveaVsFxyXG4vLyAgICAgICAgIHB1YmxpYyBmb3JlYWNoKGY6KGVsZTpFLCBpbmRleDpudW1iZXIsIGxpc3Q6TGlua0xpc3Q8RT4pPT52b2lkKTp2b2lke1xyXG4vLyAgICAgICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMuX2hlYWQubmV4dDtcclxuLy8gICAgICAgICAgICAgbGV0IG51bTpudW1iZXIgPSAwO1xyXG4vLyAgICAgICAgICAgICB3aGlsZSAoY3VycmVudCAhPT0gbnVsbCkge1xyXG4vLyAgICAgICAgICAgICAgICAgZihjdXJyZW50Lml0ZW0sIG51bSwgdGhpcyk7XHJcbi8vICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4vLyAgICAgICAgICAgICAgICAgbnVtICs9IDE7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIC8qKlxyXG4vLyAgICAgICAgICAqIOivt+aaguaXtuS4jeimgeS9v+eUqOi/meS4quWHveaVsO+8jOWboOS4uuaIkeS5n+S4jeefpemBk+Wug+S8muS4jeS8mueIhueCuFxyXG4vLyAgICAgICAgICAqIOmZpOmdnuS9oOivu+i/h+i/meS4quWHveaVsOeahOa6kOS7o+eggVxyXG4vLyAgICAgICAgICAqIEBwYXJhbSBmIOWIpOaWreWFg+e0oOS8mOWFiOe6p+eahOWbnuiwg+WHveaVsFxyXG4vLyAgICAgICAgICAqIEBwYXJhbSBpbmNyZWFzZSDmmK/lkKbljYfluo/vvIzpu5jorqTljYfluo9cclxuLy8gICAgICAgICAgKiBAcmV0dXJucyDov5Tlm57kuIDkuKrmjpLluo/nmoTpk77ooahcclxuLy8gICAgICAgICAgKi9cclxuLy8gICAgICAgICBwdWJsaWMgc29ydGJ5KGY6KGVsZTpFKT0+bnVtYmVyLCBpbmNyZWFzZTpib29sZWFuID0gdHJ1ZSk6TGlua0xpc3Q8RT57XHJcbi8vICAgICAgICAgICAgIGxldCBwcmlvcml0eTpMaW5rTGlzdDxudW1iZXI+ID0gbmV3IExpbmtMaXN0PG51bWJlcj4oKTtcclxuLy8gICAgICAgICAgICAgbGV0IHNvcnRlZDpMaW5rTGlzdDxFPiA9IG5ldyBMaW5rTGlzdDxFPigpO1xyXG4vLyAgICAgICAgICAgICBwcmlvcml0eS5wdXNoKC0wKTtcclxuLy8gICAgICAgICAgICAgc29ydGVkLnB1c2gobnVsbCk7XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgY29tcGFyZTooYTpudW1iZXIsYjpudW1iZXIpPT5ib29sZWFuID0gaW5jcmVhc2U/KGEsYik9PntyZXR1cm4gYSA8IGI7fTooYSxiKT0+e3JldHVybiBhID4gYn07XHJcblxyXG4vLyAgICAgICAgICAgICB0aGlzLmZvcmVhY2goKGVsZSk9PntcclxuLy8gICAgICAgICAgICAgICAgIGxldCBjdXJyZW50UHJpID0gZihlbGUpO1xyXG4vLyAgICAgICAgICAgICAgICAgbGV0IG5vZGU6Tm9kZTxFPiA9IHNvcnRlZC5faGVhZC5uZXh0O1xyXG4vLyAgICAgICAgICAgICAgICAgbGV0IHByaU5vZGU6Tm9kZTxudW1iZXI+ID0gcHJpb3JpdHkuX2hlYWQubmV4dDtcclxuXHJcbi8vICAgICAgICAgICAgICAgICBsZXQgZm91bmRQbGFjZTpib29sZWFuID0gZmFsc2U7XHJcbi8vICAgICAgICAgICAgICAgICB3aGlsZSAobm9kZS5uZXh0ICE9PSBudWxsKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGN1cnJlbnRQcmkgPCBwcmlOb2RlLm5leHQuaXRlbSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIGlmIChjb21wYXJlKGN1cnJlbnRQcmksIHByaU5vZGUubmV4dC5pdGVtKSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLm5leHQgPSBuZXcgTm9kZTxFPihlbGUsIG5vZGUubmV4dCk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHByaU5vZGUubmV4dCA9IG5ldyBOb2RlPG51bWJlcj4oY3VycmVudFByaSwgcHJpTm9kZS5uZXh0KTtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgZm91bmRQbGFjZSA9IHRydWU7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IG5vZGUubmV4dDtcclxuLy8gICAgICAgICAgICAgICAgICAgICBwcmlOb2RlID0gcHJpTm9kZS5uZXh0O1xyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgICAgIGlmICghZm91bmRQbGFjZSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHNvcnRlZC5wdXNoKGVsZSk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcHJpb3JpdHkucHVzaChjdXJyZW50UHJpKTtcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfSk7XHJcblxyXG4vLyAgICAgICAgICAgICBzb3J0ZWQuc2hpZnQoKTtcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHNvcnRlZDtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIC8vIHB1YmxpYyBiYlNvcnRCeShmOihlbGU6RSk9Pm51bWJlciwgaW5jcmVhc2U6Ym9vbGVhbiA9IHRydWUpOkxpbmtMaXN0PEU+e1xyXG5cclxuLy8gICAgICAgICAvLyB9XHJcblxyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIGV4cG9ydCBjbGFzcyBNYXA8SyxWPntcclxuLy8gICAgICAgICBwcml2YXRlIF9saXN0OkFycmF5PE1hcE5vZGU8SyxWPj5cclxuLy8gICAgICAgICBjb25zdHJ1Y3Rvcigpe1xyXG4vLyAgICAgICAgICAgICB0aGlzLl9saXN0ID0gW11cclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcHVibGljIGdldChrZXk6Syk6VntcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgZWxlIG9mIHRoaXMuX2xpc3Qpe1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKGVsZS5rZXkgPT09IGtleSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGUudmFsdWVcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gbnVsbFxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBwdWJsaWMgZ2V0S2V5QnlWYWwodmFsOlYpOkt7XHJcbi8vICAgICAgICAgICAgIGZvciAobGV0IGVsZSBvZiB0aGlzLl9saXN0KSB7XHJcbi8vICAgICAgICAgICAgICAgICBpZiAoZWxlLnZhbHVlID09PSB2YWwpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlLmtleVxyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHJldHVybiBudWxsXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHB1YmxpYyBrZXlFeGlzdChrZXk6Syk6Ym9vbGVhbntcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgZWxlIG9mIHRoaXMuX2xpc3QpIHtcclxuLy8gICAgICAgICAgICAgICAgIGlmIChlbGUua2V5ID09PSBrZXkpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBwdWJsaWMgc2V0KGtleTpLLHZhbHVlOlYpOmJvb2xlYW57XHJcbi8vICAgICAgICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgdGhpcy5fbGlzdC5sZW5ndGg7IG4gKz0gMSkge1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xpc3Rbbl0ua2V5ID09PSBrZXkpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLl9saXN0W25dLnZhbHVlID0gdmFsdWVcclxuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgdGhpcy5fbGlzdC5wdXNoKG5ldyBNYXBOb2RlPEssVj4oa2V5LHZhbHVlKSlcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHB1YmxpYyBiYXRjaFNldChrZXlzOktbXSwgdmFsdWVzOlZbXSk6Ym9vbGVhbntcclxuLy8gICAgICAgICAgICAgaWYgKGtleXMubGVuZ3RoICE9PSB2YWx1ZXMubGVuZ3RoKSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBrZXlzLmxlbmd0aDsgbiArPSAxKSB7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLnNldChrZXlzW25dLCB2YWx1ZXNbbl0pO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG5cclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcHVibGljIHJlbW92ZShrZXk6Syk6Ym9vbGVhbntcclxuLy8gICAgICAgICAgICAgbGV0IGNvdW50Om51bWJlciA9IDA7XHJcbi8vICAgICAgICAgICAgIGZvciAobGV0IGVsZSBvZiB0aGlzLl9saXN0KSB7XHJcbi8vICAgICAgICAgICAgICAgICBpZiAoZWxlLmtleSA9PT0ga2V5KSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGlzdC5zcGxpY2UoY291bnQsMSk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIGNvdW50ICs9IDE7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHB1YmxpYyBnZXQgbGVuZ3RoKCk6bnVtYmVye1xyXG4vLyAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdC5sZW5ndGhcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcHVibGljIGZvcmVhY2goZjooazpLLCB2OlYpPT52b2lkKTp2b2lke1xyXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBlbGUgb2YgdGhpcy5fbGlzdCkge1xyXG4vLyAgICAgICAgICAgICAgICAgZihlbGUua2V5LCBlbGUudmFsdWUpO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHJldHVybjtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcHVibGljIGZpbHRlcihmOihrOkssdjpWKT0+Ym9vbGVhbik6TWFwPEssVj57XHJcbi8vICAgICAgICAgICAgIGxldCByZXN1bHQgPSBuZXcgTWFwPEssVj4oKTtcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgZWxlIG9mIHRoaXMuX2xpc3QpIHtcclxuLy8gICAgICAgICAgICAgICAgIGlmIChmKGVsZS5rZXksIGVsZS52YWx1ZSkpe1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zZXQoZWxlLmtleSwgZWxlLnZhbHVlKTtcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBleHBvcnQgY2xhc3MgUG9pbnRlckxpc3Q8RT57XHJcbi8vICAgICAgICAgcHJpdmF0ZSBfbGlzdDpBcnJheTxFPiA9IFtdO1xyXG4vLyAgICAgICAgIHByaXZhdGUgX3BvaW50ZXI6bnVtYmVyID0gMDtcclxuLy8gICAgICAgICBjb25zdHJ1Y3Rvcihzb3VyY2U6QXJyYXk8RT4gPSBbXSwgaW5pdFBvaW50Om51bWJlciA9IDApe1xyXG4vLyAgICAgICAgICAgICBzb3VyY2UuZm9yRWFjaCgoZWxlKT0+e1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5fbGlzdC5wdXNoKGVsZSk7XHJcbi8vICAgICAgICAgICAgIH0pXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBnZXQgZXhjZWVkaW5nKCk6Ym9vbGVhbntcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BvaW50ZXIgPj0gdGhpcy5fbGlzdC5sZW5ndGggfHwgdGhpcy5fcG9pbnRlciA8IDBcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIC8qXHJcbi8vICAgICAgICAg5Lul5LiL5rOo6YeK5Lit77yM5oqK5pWw57uE55yL5L2c5qiq5ZCR5o6S5YiX55qE5LiA57O75YiX5YWD57SgXHJcbi8vICAgICAgICAgaW5kZXggPSAw55qE5YWD57Sg5Zyo5pyA5bem5L6nXHJcbi8vICAgICAgICAgKi9cclxuXHJcbi8vICAgICAgICAgcmVhZCgpOkV7Ly/mn6XnnIvlvZPliY1wb2ludGVy5omA5oyH55qE5YWD57SgXHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLl9saXN0W3RoaXMuX3BvaW50ZXJdXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBzdGVwKCk6RXsvL3BvaW50ZXLlkJHlj7Pnp7vkuIDmraVcclxuLy8gICAgICAgICAgICAgdGhpcy5fcG9pbnRlcis9MTtcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVhZCgpO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgdG8ocGxhY2U6bnVtYmVyKTpQb2ludGVyTGlzdDxFPnsvL3BvaW50ZXLnp7vliLDmjIflrprkvY3nva5cclxuLy8gICAgICAgICAgICAgdGhpcy5fcG9pbnRlciA9IHBsYWNlXHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBwdXNoKGRhdGE6RSk6UG9pbnRlckxpc3Q8RT57Ly/lnKjmlbDnu4TmnKvlsL7lop7liqDkuIDkuKrlhYPntKBcclxuLy8gICAgICAgICAgICAgdGhpcy5fbGlzdC5wdXNoKGRhdGEpXHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBzZXQoaW5kZXg6bnVtYmVyLGRhdGE6RSk6UG9pbnRlckxpc3Q8RT57Ly/opoblhpnmlbDnu4TnibnlrpppbmRleOS4reeahOWFg+e0oFxyXG4vLyAgICAgICAgICAgICB0aGlzLl9saXN0W2luZGV4XSA9IGRhdGFcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXNcclxuLy8gICAgICAgICB9XHJcbiAgICAgICAgXHJcbi8vICAgICAgICAgbmV4dChzaGlmdDpudW1iZXIgPSAxKTpFe1xyXG4vLyAgICAgICAgICAgICAvL+ivu+WPluS9jeS6juW9k+WJjXBvaW50ZXLmiYDmjIfnmoTlhYPntKDlj7Povrnoi6XlubLmoLznmoTlhYPntKBcclxuLy8gICAgICAgICAgICAgLy9zaGlmdOm7mOiupOS4ujHvvIzljbPlvZPliY1wb2ludGVy5Y+z6L6555u46YK755qE5YWD57SgXHJcbi8vICAgICAgICAgICAgIC8vc2hpZnTkuLrotJ/mlbDml7bojrflj5blt6bkvqfnmoTlhYPntKBcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RbdGhpcy5fcG9pbnRlcitzaGlmdF1cclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIGdldCBsZW5ndGgoKTpudW1iZXJ7Ly/ojrflj5bmlbDnu4Tplb/luqZcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3QubGVuZ3RoXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBnZXQgbGFzdCgpOkV7Ly/ojrflj5bmnIDlkI7kuIDpoblcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RbdGhpcy5fbGlzdC5sZW5ndGgtMV1cclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIGdldCBmaXJzdCgpOkV7Ly/ojrflj5bpppbpoblcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RbMF07XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBnZXQgcG9pbnRlcigpOm51bWJlcnsvL+iOt+WPlnBvaW50ZXJcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BvaW50ZXJcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIGdldCBhdEVuZCgpOmJvb2xlYW57Ly/mn6XnnIvigJxwb2ludGVy5oyH5ZCR5pWw57uE5pyA5Y+z5L6n55qE5YWD57Sg4oCd55qE55yf5YC8XHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wb2ludGVyID09PSB0aGlzLl9saXN0Lmxlbmd0aCAtIDFcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcbi8vIH0iLCIvL1RPRE9cclxuLy/mlL7nva7miJHku6zpobnnm67ph4zoh6rlrprkuYnnmoTpgJrnlKhLRVnlgLzooahcclxuLy/mlL7lnKjlkIzkuIDkuKrmlofku7bph4zmnInliqnkuo7nu5PmnoTmuIXmmbBcclxuLy/lj6bvvJrlpoLmnpzlj6rmnInmn5DnibnlrprmqKHlnZfns7vnu5/ph4zkvb/nlKjnmoRlbnVt5Y+v5Lul5LiN5pS+6L+H5p2lIOebtOaOpeWGmeWcqOaooeWdl+aWh+S7tuS4rVxyXG5cclxuLy/lj4jlj6bvvJog5bu66K6u5Zyo5L2/55SoZW51beeahOaXtuWAmeWKoOS4gOS4quepuuWAvE5vbmXku6XlupTlr7nliKTlrprpl67pophcclxuXHJcbmV4cG9ydCBlbnVtIEFjdG9yVHlwZSB7XHJcbiAgICBOb25lLFxyXG4gICAgT3BlcmF0b3IsXHJcbiAgICBNb25zdGVyLFxyXG4gICAgVG9rZW5cclxuICAgIC8v6L+Z5YW25a6e5piv5a+55bqU55qE5LiN5ZCM55qE5pWw5o2u5qih5p2/XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIENhbXBUeXBlIHtcclxuICAgIE5vbmUsXHJcbiAgICBTZWxmLCAgIC8v5oiR5pa5XHJcbiAgICBFbmVteSAgIC8v5pWM5pa5XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9kTG9nIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogRG9kTG9nO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSW5zdGFuY2UoKTogRG9kTG9nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2UgfHwgKHRoaXMuX2luc3RhbmNlID0gbmV3IHRoaXMoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBkZWJ1Zyhtc2c6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIG1zZyA9IGAke21zZ31gO1xyXG4gICAgICAgIGNvbnNvbGUuZGVidWcobXNnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGluZm8obXNnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBtc2cgPSBgJHttc2d9YDtcclxuICAgICAgICBjb25zb2xlLmluZm8obXNnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHdhcm4obXNnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBtc2cgPSBgJHttc2d9YDtcclxuICAgICAgICBjb25zb2xlLndhcm4obXNnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGVycm9yKG1zZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgbXNnID0gYCR7bXNnfWA7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihtc2cpO1xyXG4gICAgICAgIERvZExvZy5JbnN0YW5jZS5fd3JpdGVUb0ZpbGUobXNnKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF93cml0ZVRvRmlsZShsb2c6IHN0cmluZykge1xyXG4gICAgICAgIC8vVE9ET1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGludGVyZmFjZSBDb21wYXJhYmxle1xyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3kuKTkuKrlhYPntKDmmK/lkKbnm7jnrYlcclxuICAgICAqIOW/hemhu+WPr+mAhlxyXG4gICAgICogQHBhcmFtIGVsZSBcclxuICAgICAqL1xyXG4gICAgZXF1YWxzKGVsZTpDb21wYXJhYmxlKTpib29sZWFuXHJcbn1cclxuICAgIFxyXG5leHBvcnQgY2xhc3MgRG9kTWF0aHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnmEvYueahOaVtOaVsOe7k+aenO+8iOWwj+aVsOmDqOWIhuiIjeWOuylcclxuICAgICAqIGHvvIxi5aaC5p6c5LiN5Zyo5q2j5pW05pWw5Z+f77yM6K+356Gu5L+d6ZiF6K+76L+H5q2k5Ye95pWwXHJcbiAgICAgKiB84oCU4oCU4oCU4oCUfOKAlOKAlOKAlOKAlHzigJTigJTigJTigJR84oCU4oCU4oCU4oCUfOKAlOKAlOKAlOKAlHxcclxuICAgICAqICAgICAtMTwtLS0wPC0tLTE8LS0tXHJcbiAgICAgKiAgICAgIOWPr+S7peeQhuino+S4uuWcqOaVsOi9tOS4iuaKiue7k+aenOWQkeW3puaYoOWwhFxyXG4gICAgICogQHBhcmFtIGEgXHJcbiAgICAgKiBAcGFyYW0gYiBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBpbnREaXZpc2lvbihhOm51bWJlciwgYjpudW1iZXIpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gKGEtYSViKS9iO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Zyo5bmz6Z2i5LiK5rGC5LuO5oyH5a6a5Ye65Y+R54K55Yiw5oyH5a6a57uI54K55L2c5LiA5p2h5oyH5a6a6ZW/5bqm55qE57q/5q6177yM5q2k57q/5q6155qE5Y+m5LiA56uv54K555qE5Z2Q5qCHXHJcbiAgICAgKiDvvIjlpoLmnpzmraTnur/mrrXnmoTplb/luqblpKfkuo7nrYnkuo7lh7rlj5HngrnliLDnu4jngrnnmoTot53nprvvvIzliJnovpPlh7rnu4jngrnnmoTlnZDmoIfvvIlcclxuICAgICAqIEBwYXJhbSBmcm9tIFxyXG4gICAgICogQHBhcmFtIGVuZCBcclxuICAgICAqIEBwYXJhbSBtb3ZlbWVudCBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBtb3ZlVG8oZnJvbTpWZWMyLCBlbmQ6VmVjMiwgbW92ZW1lbnQ6bnVtYmVyKTpWZWMye1xyXG4gICAgICAgIGNvbnN0IHhkaXMgPSBlbmQueCAtIGZyb20ueDtcclxuICAgICAgICBjb25zdCB5ZGlzID0gZW5kLnkgLSBmcm9tLnk7XHJcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoKHhkaXMpKioyICsgKHlkaXMpKioyKTtcclxuICAgICAgICBpZiAobW92ZW1lbnQgPj0gZGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVuZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcmF0aW8gPSBtb3ZlbWVudCAvIGRpc3RhbmNlO1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjMihmcm9tLnggKyB4ZGlzKnJhdGlvLGZyb20ueSArIHlkaXMqcmF0aW8pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTXlNYXRoLm1vdmVUb+WHveaVsOeahOWPpuS4gOS4queJiOacrOOAgui/meS4queJiOacrOS8muebtOaOpeS/ruaUuShmcm9tOlZlYzIp5Lyg5YWl55qE5a+56LGh5pys6Lqr77yM5bm25Yik5pat5pyA57uIZnJvbeS4jmVuZOS4pOS4quWvueixoeaYr+WQpumHjeWQiFxyXG4gICAgICogQHBhcmFtIGZyb20gXHJcbiAgICAgKiBAcGFyYW0gZW5kIFxyXG4gICAgICogQHBhcmFtIG1vdmVtZW50IFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG1vdmVUb1NpZGVFZmZlY3QoZnJvbTpWZWMyLCBlbmQ6VmVjMiwgbW92ZW1lbnQ6bnVtYmVyKTpib29sZWFue1xyXG4gICAgICAgIGNvbnN0IHhkaXMgPSBlbmQueCAtIGZyb20ueDtcclxuICAgICAgICBjb25zdCB5ZGlzID0gZW5kLnkgLSBmcm9tLnk7XHJcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoKHhkaXMpKioyICsgKHlkaXMpKioyKTtcclxuICAgICAgICBpZiAobW92ZW1lbnQgPj0gZGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgZnJvbS54ID0gZW5kLng7XHJcbiAgICAgICAgICAgIGZyb20ueSA9IGVuZC55O1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcmF0aW8gPSBtb3ZlbWVudCAvIGRpc3RhbmNlO1xyXG4gICAgICAgIGZyb20ueCA9IGZyb20ueCArIHhkaXMqcmF0aW87XHJcbiAgICAgICAgZnJvbS55ID0gZnJvbS55ICsgeWRpcypyYXRpbztcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNeU1hdGgubW92ZVRv5Ye95pWw55qE5Y+m5LiA5Liq54mI5pys44CC6L+U5Zue55u057q/6YCf5bqm5ZyoeHnkuKTovbTkuIrnmoTliIbph49cclxuICAgICAqIEBwYXJhbSBmcm9tIFxyXG4gICAgICogQHBhcmFtIGVuZCBcclxuICAgICAqIEBwYXJhbSBtb3ZlbWVudCBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBtb3ZlVG9Db21wb25lbnQoZnJvbTpWZWMyLCBlbmQ6VmVjMiwgbW92ZW1lbnQ6bnVtYmVyKTpWZWMye1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IHhkaXMgPSBlbmQueCAtIGZyb20ueDtcclxuICAgICAgICBjb25zdCB5ZGlzID0gZW5kLnkgLSBmcm9tLnk7XHJcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoKHhkaXMpKioyICsgKHlkaXMpKioyKTtcclxuICAgICAgICBjb25zdCByYXRpbyA9IG1vdmVtZW50IC8gZGlzdGFuY2U7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMyKHhkaXMqcmF0aW8sIHlkaXMqcmF0aW8pO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBWZWMyIGltcGxlbWVudHMgQ29tcGFyYWJsZXtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGxpc3RGcm9tTGlzdChsaXN0Om51bWJlcltdW10pOlZlYzJbXXtcclxuICAgICAgICBsZXQgcmVzdWx0OlZlYzJbXSA9IFtdO1xyXG5cclxuICAgICAgICBsaXN0LmZvckVhY2goZWxlPT57XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBWZWMyKGVsZVswXSxlbGVbMV0pKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgeDpudW1iZXI7XHJcbiAgICBwdWJsaWMgeTpudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57ku47mraTngrnliLDmjIflrprngrnnmoTot53nprtcclxuICAgICAqIEBwYXJhbSBlbmQgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXN0YW5jZVRvKGVuZDpWZWMyKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuICgoZW5kLnggLSB0aGlzLngpKioyICsgKGVuZC55IC0gdGhpcy55KSoqMikqKjAuNTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS7pei+k+WFpeWdkOagh+S4uuS4reW/g+i/m+ihjOmhuuaXtumSiDkw5bqm5peL6L2sXHJcbiAgICAgKiDvvIjmnKrlrozmiJDvvIlcclxuICAgICAqIEBwYXJhbSBjZW50cmUgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByb3RhdGVDbG9ja3dpc2UoY2VudHJlOlZlYzIpOlZlYzJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57mraTlkJHph4/nmoTlpI3liLZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNsb25lKCk6VmVjMntcclxuICAgICAgICByZXR1cm4gbmV3IFZlYzIodGhpcy54LCB0aGlzLnkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlcXVhbHMoZWxlOlZlYzIpOmJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueCA9PT0gZWxlLnggJiYgdGhpcy55ID09PSBlbGUueTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4PzpudW1iZXIsIHk/Om51bWJlcikge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiIsIi8vYXV0aG9yIE5hMkN1QzRPOFxyXG5cclxuXHJcbmltcG9ydCBDdXN0b21pemVkU3ByaXRlIGZyb20gXCIuL2N1c3RvbWl6ZWRTcHJcIjtcclxuaW1wb3J0IHsgVmVjMiB9IGZyb20gXCIuLi8uLi9Eb2RNYXRoXCI7XHJcbmltcG9ydCB7IEV2ZW50Q2VudHJlIH0gZnJvbSBcIi4uLy4uLy4uL0V2ZW50L0V2ZW50Q2VudHJlXCI7XHJcbmltcG9ydCB7IE15U3ltYm9sIH0gZnJvbSBcIi4uLy4uLy4uL0ZpeC9GaXhTeW1ib2xcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCYXJ7XHJcblxyXG4gICAgcHJpdmF0ZSBfaW5pdFBvczpWZWMyOy8v6LW35aeL5Z2Q5qCHXHJcbiAgICBwcml2YXRlIF9pbml0U2l6ZTpWZWMyOy8v6LW35aeL5aSn5bCPXHJcbiAgICBwcml2YXRlIF9wb3M6VmVjMjsvL+e8qeaUvuWQjuWdkOagh1xyXG4gICAgcHJpdmF0ZSBfc2l6ZTpWZWMyOy8v57yp5pS+5ZCO5aSn5bCPXHJcbiAgICBwcml2YXRlIF9zY2FsZTpudW1iZXIgPSAxOy8v5YWo5bGA57yp5pS+5q+UXHJcbiAgICBwcml2YXRlIF9zeW1iTnVtOm51bWJlcjsvL+i/m+W6puadoee8luWPt1xyXG4gICAgcHJpdmF0ZSBfYmFja1NwcjpDdXN0b21pemVkU3ByaXRlOy8v6L+b5bqm5p2h5bqV5bGC57uY5Zu+6IqC54K5XHJcbiAgICBwcml2YXRlIF9mcm9udFNwcjpDdXN0b21pemVkU3ByaXRlOy8v6L+b5bqm5p2h6aG25bGC57uY5Zu+6IqC54K5XHJcbiAgICBwcml2YXRlIF9wZXJjZW50YWdlOm51bWJlciA9IDE7Ly/ov5vluqZcclxuICAgIHByaXZhdGUgX2hlaWdodDpudW1iZXI7Ly/ov5vluqbmnaHpq5jluqZcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5vluqbmnaHmnoTpgKDlmahcclxuICAgICAqIEBwYXJhbSBzeW1iTnVtIOi/m+W6puadoee8luWPt1xyXG4gICAgICogQHBhcmFtIGJhY2tHcm91bmRDb2xvciDog4zmma/popzoibJcclxuICAgICAqIEBwYXJhbSBzaXplIOWkp+Wwj1xyXG4gICAgICogQHBhcmFtIHBvcyDlnZDmoIdcclxuICAgICAqIEBwYXJhbSBzY2FsZSDlhajlsYDnvKnmlL7mr5RcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioc3ltYk51bTpudW1iZXIsIGJhY2tHcm91bmRDb2xvcjpzdHJpbmcsc2l6ZTpWZWMyICxwb3M6VmVjMiwgc2NhbGU6bnVtYmVyID0gMSl7XHJcbiAgICAgICAgdGhpcy5fc3ltYk51bSA9IHN5bWJOdW07XHJcbiAgICAgICAgdGhpcy5faW5pdFNpemUgPSBzaXplO1xyXG4gICAgICAgIHRoaXMuX3NjYWxlID0gc2NhbGU7XHJcbiAgICAgICAgdGhpcy5fc2l6ZSA9IG5ldyBWZWMyKHRoaXMuX2luaXRTaXplLngqdGhpcy5fcGVyY2VudGFnZSp0aGlzLl9zY2FsZSx0aGlzLl9pbml0U2l6ZS55KnRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9pbml0UG9zID0gcG9zO1xyXG4gICAgICAgIHRoaXMuX3BvcyA9IG5ldyBWZWMyKHRoaXMuX2luaXRQb3MueCp0aGlzLl9zY2FsZSx0aGlzLl9pbml0UG9zLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX2JhY2tTcHIgPSBuZXcgQ3VzdG9taXplZFNwcml0ZSgpO1xyXG4gICAgICAgIHRoaXMuX2JhY2tTcHIuc2V0UGFyYW0odGhpcy5fcG9zLngsdGhpcy5fcG9zLnksdGhpcy5fc2l6ZS54LHRoaXMuX3NpemUueSxiYWNrR3JvdW5kQ29sb3IpO1xyXG4gICAgICAgIHRoaXMuX2JhY2tTcHIuY2hhbmdlQ29sb3IoKTtcclxuICAgICAgICB0aGlzLl9mcm9udFNwciA9IG5ldyBDdXN0b21pemVkU3ByaXRlKCk7XHJcbiAgICAgICAgdGhpcy5fYmFja1Nwci5hZGRDaGlsZCh0aGlzLl9mcm9udFNwcik7XHJcbiAgICAgICAgdGhpcy5fZnJvbnRTcHIuc2V0UGFyYW0oMCwwLHRoaXMuX3NpemUueCx0aGlzLl9zaXplLnksXCIjOGI4YjgzXCIsbmV3IFZlYzIodGhpcy5fc2NhbGUsdGhpcy5fc2NhbGUpKTtcclxuICAgICAgICB0aGlzLl9mcm9udFNwci5jaGFuZ2VDb2xvcigpO1xyXG4gICAgICAgIHRoaXMuX2hlaWdodCA9IHRoaXMuX2luaXRTaXplLnk7XHJcbiAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2Uub24oRXZlbnRDZW50cmUuRVR5cGUuUEVSRk9STUFOQ0VfUkVTQ0FMRSgpLHRoaXMsdGhpcy5yZVNjYWxlKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkv67mlLnnvKnmlL7mr5RcclxuICAgICAqIEBwYXJhbSB2YWx1ZSDlhajlsYDnvKnmlL7mr5RcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZVNjYWxlKHZhbHVlOm51bWJlcik6dm9pZHtcclxuICAgICAgICB0aGlzLl9zY2FsZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuX3BvcyA9IG5ldyBWZWMyKHRoaXMuX2luaXRQb3MueCp0aGlzLl9zY2FsZSwgdGhpcy5faW5pdFBvcy55KnRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9zaXplID0gbmV3IFZlYzIodGhpcy5faW5pdFNpemUueCp0aGlzLl9zY2FsZSwgdGhpcy5faW5pdFNpemUueSp0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fYmFja1Nwci5zZXRQYXJhbSh0aGlzLl9wb3MueCx0aGlzLl9wb3MueSx0aGlzLl9zaXplLngsdGhpcy5fc2l6ZS55KTsvL+iuvue9ruiDjOaZr+e7mOWbvuiKgueCueWPguaVsFxyXG4gICAgICAgIHRoaXMuX2JhY2tTcHIuY2hhbmdlQ29sb3IoKTtcclxuICAgICAgICB0aGlzLl9mcm9udFNwci5zZXRQYXJhbSgwLDAsdGhpcy5fc2l6ZS54KnRoaXMuX3BlcmNlbnRhZ2UsdGhpcy5fc2l6ZS55LFwiIzhiOGI4M1wiLG5ldyBWZWMyKDEqdGhpcy5fc2NhbGUsMSp0aGlzLl9zY2FsZSkpOy8v6K6+572u5YmN56uv57uY5Zu+6IqC54K55Y+C5pWwXHJcbiAgICAgICAgdGhpcy5fZnJvbnRTcHIuY2hhbmdlQ29sb3IoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9rui/m+W6puadoeS7o+WPt1xyXG4gICAgICogQHBhcmFtIHN5bWJOdW0g6L+b5bqm5p2h5Luj5Y+3XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRTeW1iKHN5bWJOdW06bnVtYmVyKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3N5bWJOdW0gPSBzeW1iTnVtO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5L+u5pS56L+b5bqmXHJcbiAgICAgKiBAcGFyYW0gcGVyY2VudGFnZSDnm67moIfov5vluqZcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBwZXJjZW50YWdlKHBlcmNlbnRhZ2U6bnVtYmVyKXtcclxuICAgICAgICBpZihwZXJjZW50YWdlID09PSAwKXtcclxuICAgICAgICAgICAgdGhpcy5fcGVyY2VudGFnZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX2Zyb250U3ByLmdyYXBoaWNzLmNsZWFyKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX3BlcmNlbnRhZ2UgPSBwZXJjZW50YWdlO1xyXG4gICAgICAgICAgICB0aGlzLl9mcm9udFNwci5zZXRQYXJhbSgwLDAsdGhpcy5fc2l6ZS54KnRoaXMuX3BlcmNlbnRhZ2UsdGhpcy5fc2l6ZS55LFwiIzhiOGI4M1wiLG5ldyBWZWMyKDEqdGhpcy5fc2NhbGUsMSp0aGlzLl9zY2FsZSkpO1xyXG4gICAgICAgICAgICB0aGlzLl9mcm9udFNwci5jaGFuZ2VDb2xvcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuacrOi/m+W6puadoeiDjOaZr+e7mOWbvuiKgueCuVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0QmFja1NwcigpOkN1c3RvbWl6ZWRTcHJpdGV7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JhY2tTcHI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57mnKzov5vluqbmnaHpq5jluqZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEhlaWdodCgpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5faGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQnV0dG9ue1xyXG5cclxuICAgIHByaXZhdGUgX2luaXRQb3M6VmVjMjsvL+aMiemSruWIneWni+WdkOagh1xyXG4gICAgcHJpdmF0ZSBfaW5pdFNpemU6VmVjMjsvL+aMiemSruWIneWni+WuvemrmFxyXG4gICAgcHJpdmF0ZSBfcG9zOlZlYzI7Ly/mmL7npLroioLngrnlnZDmoIdcclxuICAgIHByaXZhdGUgX3NpemU6VmVjMjsvL+aYvuekuuiKgueCueWuvemrmFxyXG4gICAgcHJpdmF0ZSBfc3ltYk5hbWU6bnVtYmVyOy8v5oyJ6ZKu57yW5Y+3XHJcbiAgICBwcml2YXRlIF9jb2xvcjpzdHJpbmc7Ly/mjInpkq7popzoibJcclxuICAgIHByaXZhdGUgX2hlaWdodDpudW1iZXI7Ly/mjInpkq7pq5jluqbvvIjpu5jorqTnvKnmlL7mr5TkuLox77yJXHJcbiAgICBwcml2YXRlIF9zcHI6Q3VzdG9taXplZFNwcml0ZTsvL+aMiemSruaYvuekuuiKgueCuVxyXG4gICAgcHJpdmF0ZSBfc2NhbGU6bnVtYmVyOy8v5YWo5bGA57yp5pS+5q+UXHJcbiAgICBwcml2YXRlIF9uYW1lOnN0cmluZzsvL+aMiemSruWQje+8iOaYvuekuuWcqOaMiemSruS4iu+8iVxyXG4gICAgcHJpdmF0ZSBfZnVuOkZ1bmN0aW9uOy8v5oyJ6ZKu5omA5pC65bim55qE5Yqf6IO95Ye95pWwXHJcbiAgICBwcml2YXRlIF9BUlVzeW1iOk15U3ltYm9sOy8v5oyJ6ZKu5omA5ZyoQWN0b3JSVVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5oyJ6ZKu5p6E6YCg5ZmoXHJcbiAgICAgKiBAcGFyYW0gbmFtZSDmjInpkq7lkI1cclxuICAgICAqIEBwYXJhbSBzeW1iTnVtIOaMiemSrue8luWPt1xyXG4gICAgICogQHBhcmFtIHBvcyDotbflp4vlnZDmoIdcclxuICAgICAqIEBwYXJhbSBzaXplIOi1t+Wni+WuvemrmFxyXG4gICAgICogQHBhcmFtIGNvbG9yIOaMiemSruminOiJslxyXG4gICAgICogQHBhcmFtIHNjYWxlIOe8qeaUvuavlFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihBUlVzeW1iOk15U3ltYm9sLCBuYW1lOnN0cmluZyA9IFwiZGVmYXVsdFwiLCBzeW1iTnVtOm51bWJlciwgcG9zOlZlYzIsIHNpemU6VmVjMiwgIGNvbG9yOnN0cmluZyA9IFwiIzAwQjJCRlwiLCBzY2FsZTpudW1iZXIgPSAxKXtcclxuICAgICAgICB0aGlzLl9BUlVzeW1iID0gQVJVc3ltYjtcclxuICAgICAgICB0aGlzLl9zeW1iTmFtZSA9IHN5bWJOdW07XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5faW5pdFBvcyA9IHBvcztcclxuICAgICAgICB0aGlzLl9pbml0U2l6ZSA9IHNpemU7XHJcbiAgICAgICAgdGhpcy5fY29sb3IgPSBjb2xvcjtcclxuICAgICAgICB0aGlzLl9zY2FsZSA9IHNjYWxlO1xyXG4gICAgICAgIHRoaXMuX3BvcyA9IG5ldyBWZWMyKHRoaXMuX2luaXRQb3MueCp0aGlzLl9zY2FsZSx0aGlzLl9pbml0UG9zLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX3NpemUgPSBuZXcgVmVjMih0aGlzLl9pbml0U2l6ZS54KnRoaXMuX3NjYWxlLHRoaXMuX2luaXRTaXplLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX2hlaWdodCA9IHRoaXMuX2luaXRTaXplLnk7XHJcbiAgICAgICAgdGhpcy5fc3ByID0gbmV3IEN1c3RvbWl6ZWRTcHJpdGUoKTtcclxuICAgICAgICB0aGlzLl9zcHIuc2V0UGFyYW0odGhpcy5fcG9zLngsdGhpcy5fcG9zLnksdGhpcy5fc2l6ZS54LHRoaXMuX3NpemUueSx0aGlzLl9jb2xvcik7XHJcbiAgICAgICAgdGhpcy5fc3ByLmNoYW5nZUNvbG9yKCk7XHJcbiAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2Uub24oRXZlbnRDZW50cmUuRVR5cGUuUEVSRk9STUFOQ0VfUkVTQ0FMRSgpLHRoaXMsdGhpcy5yZVNjYWxlKTtcclxuICAgICAgICB0aGlzLnNldFRleHQoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7mjInpkq7lip/og71cclxuICAgICAqIEBwYXJhbSBmdW4g5oyJ6ZKu5Yqf6IO95Ye95pWwXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRGdW5jKGZ1bjpGdW5jdGlvbik6dm9pZHtcclxuICAgICAgICB0aGlzLl9mdW4gPSBmdW47XHJcbiAgICAgICAgdGhpcy5fc3ByLm9uKExheWEuRXZlbnQuTU9VU0VfVVAsdGhpcyx0aGlzLl9mdW4pO1xyXG4gICAgICAgIHRoaXMuX3Nwci5vbihMYXlhLkV2ZW50Lk1PVVNFX09WRVIsdGhpcywoZTogTGF5YS5FdmVudCk9PntcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX3Nwci5vbihMYXlhLkV2ZW50Lk1PVVNFX1VQLHRoaXMsKGU6IExheWEuRXZlbnQpPT57XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57mjInpkq7nu5jlm77oioLngrlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFNwcigpOkN1c3RvbWl6ZWRTcHJpdGV7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NwcjtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57yp5pS+5oyJ6ZKuXHJcbiAgICAgKiBAcGFyYW0gdmFsdWUg5YWo5bGA57yp5pS+5q+UXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZVNjYWxlKHZhbHVlOm51bWJlcik6dm9pZHtcclxuICAgICAgICB0aGlzLl9zY2FsZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuX3BvcyA9IG5ldyBWZWMyKHRoaXMuX2luaXRQb3MueCp0aGlzLl9zY2FsZSx0aGlzLl9pbml0UG9zLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX3NpemUgPSBuZXcgVmVjMih0aGlzLl9pbml0U2l6ZS54KnRoaXMuX3NjYWxlLHRoaXMuX2luaXRTaXplLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX3Nwci5zZXRQYXJhbSh0aGlzLl9wb3MueCx0aGlzLl9wb3MueSx0aGlzLl9zaXplLngsdGhpcy5fc2l6ZS55LHRoaXMuX2NvbG9yKTtcclxuICAgICAgICB0aGlzLl9zcHIuY2hhbmdlQ29sb3IoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa4suafk+aWh+acrFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0VGV4dCgpOnZvaWR7XHJcbiAgICAgICAgbGV0IHRtcFRleDpMYXlhLlRleHQgPSBuZXcgTGF5YS5UZXh0KCk7XHJcbiAgICAgICAgdG1wVGV4LndpZHRoID0gdGhpcy5fc2l6ZS54O1xyXG4gICAgICAgIHRtcFRleC5oZWlnaHQgPSB0aGlzLl9zaXplLnk7XHJcbiAgICAgICAgdG1wVGV4LnggPSAwO1xyXG4gICAgICAgIHRtcFRleC55ID0gMDtcclxuICAgICAgICB0bXBUZXguZm9udFNpemUgPSA5O1xyXG4gICAgICAgIHRtcFRleC50ZXh0ID0gdGhpcy5fbmFtZTtcclxuICAgICAgICB0bXBUZXguYWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgIHRtcFRleC52YWxpZ24gPSBcIm1pZGRsZVwiO1xyXG4gICAgICAgIHRoaXMuX3Nwci5hZGRDaGlsZCh0bXBUZXgpO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dCBleHRlbmRzIExheWEuVGV4dHtcclxuICAgIHByaXZhdGUgX3N3aXRjaDpib29sZWFuID0gdHJ1ZTsvL+aWh+acrOaYvuekuuW8gOWFsyDpu5jorqTlhbPpl61cclxuICAgIHByaXZhdGUgX3NjYWxlOm51bWJlcjsvL+WFqOWxgOe8qeaUvuavlFxyXG4gICAgcHJpdmF0ZSBfc2l6ZTpWZWMyOy8v6LW35aeL5aSn5bCPXHJcbiAgICBwcml2YXRlIF9wb3M6VmVjMiA9IG5ldyBWZWMyKDAsMCk7Ly/otbflp4vlnZDmoIdcclxuICAgIHByaXZhdGUgX215U3RyaW5nOnN0cmluZzsvL+aWh+acrOWGheWuuVxyXG4gICAgcHJpdmF0ZSBfQVJVc3ltYjpNeVN5bWJvbDsvL+aJgOWcqOWPr+inhuiKgueCuVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5paH5pys5p6E6YCg5ZmoXHJcbiAgICAgKiBAcGFyYW0gc2l6ZSDotbflp4vlpKflsI9cclxuICAgICAqIEBwYXJhbSBzY2FsZSDnvKnmlL7mr5RcclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihzaXplOlZlYzIsIHNjYWxlOm51bWJlcil7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9zaXplID0gc2l6ZTtcclxuICAgICAgICB0aGlzLl9zY2FsZSA9IHNjYWxlO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB0aGlzLl9zaXplLngqdGhpcy5fc2NhbGU7Ly/orqHnrpflj6/op4boioLngrnlrr3luqZcclxuICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuX3NpemUueSp0aGlzLl9zY2FsZTsvL+iuoeeul+WPr+inhuiKgueCuemrmOW6plxyXG4gICAgICAgIHRoaXMuZm9udFNpemUgPSAxMCp0aGlzLl9zY2FsZTsvL+iuoeeul+Wtl+S9k+Wkp+Wwj1xyXG4gICAgICAgIHRoaXMuYWxpZ24gPSBcImNlbnRlclwiOy8v6buY6K6k56uW55u05bGF5LitXHJcbiAgICAgICAgdGhpcy52YWxpZ24gPSBcIm1pZGRsZVwiOy8v6buY6K6k5rC05bmz5bGF5LitXHJcbiAgICAgICAgdGhpcy53b3JkV3JhcCA9IHRydWU7Ly/pu5jorqToh6rliqjmjaLooYzlvIDlkK9cclxuICAgICAgICB0aGlzLmNvbG9yID0gXCIjMDAwMDAwXCI7Ly9cclxuICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5vbihFdmVudENlbnRyZS5FVHlwZS5QRVJGT1JNQU5DRV9SRVNDQUxFKCksdGhpcyx0aGlzLnJlU2NhbGUpOy8v55uR5ZCs5YWo5bGA57yp5pS+5q+UXHJcbiAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2Uub24oRXZlbnRDZW50cmUuRVR5cGUuUEVSRk9STUFOQ0VfVEVYVF9TV0lUQ0goKSx0aGlzLHRoaXMuc3dpdGNoKTsvL+ebkeWQrOWFqOWxgOaWh+acrOaYvuekuuW8gOWFs1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruaJgOWcqOaYvuekuuiKgueCuXN5bWJcclxuICAgICAqIEBwYXJhbSBzeW1iIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U3ltYihzeW1iOk15U3ltYm9sKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX0FSVXN5bWIgPSBzeW1iO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5byA5YWz5paH5pys5pi+56S65byA5YWzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzd2l0Y2goKTp2b2lke1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuX3N3aXRjaCA9PT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLl9zd2l0Y2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VUZXh0KFwiXCIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fc3dpdGNoID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkv67mlLnmlofmnKzmmL7npLrlvIDlhbNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFN3aXRjaE9uKCk6dm9pZHtcclxuICAgICAgICBpZih0aGlzLl9zd2l0Y2ggPT09IHRydWUpe1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZVRleHQodGhpcy5fbXlTdHJpbmcpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlhbPpl63mlofmnKzmmL7npLpcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFN3aXRjaE9mZigpOnZvaWR7XHJcbiAgICAgICAgaWYodGhpcy5fc3dpdGNoKXtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VUZXh0KFwiIFwiKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagueaNrue8qeaUvuavlOS/ruaUueWPr+inhuiKgueCueWkp+Wwj1xyXG4gICAgICogQHBhcmFtIHNjYWxlIOWFqOWxgOe8qeaUvuavlFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlU2NhbGUoc2NhbGU6bnVtYmVyKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3NjYWxlID0gc2NhbGU7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuX3NpemUueCp0aGlzLl9zY2FsZTtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuX3NpemUueSp0aGlzLl9zY2FsZTtcclxuICAgICAgICB0aGlzLnggPSB0aGlzLl9wb3MueCp0aGlzLl9zY2FsZTtcclxuICAgICAgICB0aGlzLnkgPSB0aGlzLl9wb3MueSp0aGlzLl9zY2FsZTtcclxuICAgICAgICB0aGlzLmZvbnRTaXplID0gMTAqdGhpcy5fc2NhbGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7mlofmnKxcclxuICAgICAqIEBwYXJhbSB0ZXh0IFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0VGV4dCh0ZXh0OnN0cmluZyk6dm9pZHtcclxuICAgICAgICB0aGlzLl9teVN0cmluZyA9IHRleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkv67mlLnmlofmnKzotbflp4vlnZDmoIfvvIjkuI3lj5flhajlsYDnvKnmlL7mr5TlvbHlk43vvIlcclxuICAgICAqIEBwYXJhbSBwb3Mg6LW35aeL5Z2Q5qCHXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRQb3MocG9zOlZlYzIgPSBuZXcgVmVjMigwLDApKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3BvcyA9IHBvcztcclxuICAgICAgICB0aGlzLnggPSB0aGlzLl9wb3MueCp0aGlzLl9zY2FsZTtcclxuICAgICAgICB0aGlzLnkgPSB0aGlzLl9wb3MueSp0aGlzLl9zY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmYu+atoum8oOagh+S6i+S7tuepv+mAj1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb2ZmU3dpdGNoKCk6dm9pZHtcclxuICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5vZmYoRXZlbnRDZW50cmUuRVR5cGUuUEVSRk9STUFOQ0VfUkVTQ0FMRSgpLHRoaXMsdGhpcy5yZVNjYWxlKTtcclxuICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5vZmYoRXZlbnRDZW50cmUuRVR5cGUuUEVSRk9STUFOQ0VfVEVYVF9TV0lUQ0goKSx0aGlzLHRoaXMuc3dpdGNoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS/ruaUueWtl+S9k+Wkp+Wwj1xyXG4gICAgICogQHBhcmFtIHZhbHVlIOi+k+WFpeWkp+Wwj1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0Rm9udFNpemUodmFsdWU6bnVtYmVyKTp2b2lke1xyXG4gICAgICAgIHRoaXMuZm9udFNpemUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnRleHQgPSB0aGlzLl9teVN0cmluZztcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiIsIi8vYXV0aG9yIE5hMkN1QzRPOFxyXG5cclxuaW1wb3J0IEN1c3RvbWl6ZWRTcHJpdGUgZnJvbSBcIi4vY3VzdG9taXplZFNwclwiO1xyXG5pbXBvcnQgeyBDaGVzc0JvYXJkIH0gZnJvbSBcIi4vVW5zeW1ib2xpemVkUmVuZGVyXCI7XHJcbmltcG9ydCBBY3RvclJVIGZyb20gXCIuL1N5bWJvbGl6ZWRSZW5kZXJcIjtcclxuaW1wb3J0IHsgQWN0b3JCb3ggfSBmcm9tIFwiLi9vYmpib3hcIjtcclxuaW1wb3J0IHsgVmVjMiB9IGZyb20gXCIuLi8uLi9Eb2RNYXRoXCI7XHJcbmltcG9ydCB7IFN5bWJvbGl6ZWQgfSBmcm9tIFwiLi4vLi4vLi4vRml4L0ZpeFN5bWJvbFwiO1xyXG5pbXBvcnQgeyBFdmVudENlbnRyZSB9IGZyb20gXCIuLi8uLi8uLi9FdmVudC9FdmVudENlbnRyZVwiO1xyXG5pbXBvcnQgeyBSZW5kZXJlciB9IGZyb20gXCIuLi8uLi9SZW5kZXJlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGVyZm9ybWFuY2VDZW50cmUgaW1wbGVtZW50cyBSZW5kZXJlcntcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGluc3RhbmNlOlBlcmZvcm1hbmNlQ2VudHJlOy8v5Y2V5L6L77yI6K+35LiN6KaB5omL5Yqo5paw5bu65Y2V5L6L77yJXHJcbiAgICBwdWJsaWMgbWFpblNwcjpDdXN0b21pemVkU3ByaXRlOy8v6buY6K6k57uY5Zu+6IqC54K577yI56aB5q2i5Zyo6K+l6IqC54K55LiK57uY5Zu+77yM5Y+q6IO955So5LqO5re75Yqg5a2Q6IqC54K577yJXHJcbiAgICBwcml2YXRlIGNoZXNzQm9hcmQ6Q2hlc3NCb2FyZDsvL+m7mOiupOaji+ebmFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW5riy5p+T5Li75Zy65pmv77yM5Yid5aeL5YyW5LqL5Lu255uR5ZCs57G7XHJcbiAgICAgKiBAcGFyYW0gc2NlbmUg5ri45oiP5Li75Zy65pmvXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZSAoc2NlbmU6TGF5YS5TcHJpdGUpOnZvaWR7XHJcbiAgICAgICAgUGVyZm9ybWFuY2VDZW50cmUuaW5zdGFuY2UgPSBuZXcgUGVyZm9ybWFuY2VDZW50cmUoKTsvL+WKoOi9vemdmeaAgeexu1xyXG4gICAgICAgIFBlcmZvcm1hbmNlQ2VudHJlLmluc3RhbmNlLm1haW5TcHIgPSBuZXcgQ3VzdG9taXplZFNwcml0ZSgpOy8v5bu656uL5Li757uY5Zu+6IqC54K5XHJcbiAgICAgICAgLy/or6Xnu5jlm77oioLngrnkuI3nlKjkuo7nu5jliLbku7vkvZXlm77lvaLvvIzku4XnlKjkuo7mt7vliqDlrZDoioLngrlcclxuICAgICAgICBzY2VuZS5hZGRDaGlsZChQZXJmb3JtYW5jZUNlbnRyZS5pbnN0YW5jZS5tYWluU3ByKTsvL+WwhuS4u+e7mOWbvuiKgueCuea3u+WKoOS4uuS4u+WcuuaZr+WtkOiKgueCuVxyXG4gICAgICAgIEV2ZW50Q2VudHJlLmluaXQoKTsvL+WIneWni+WMluinguWvn+iAhVxyXG4gICAgICAgIFBlcmZvcm1hbmNlQ2VudHJlLmluaXRpYWxpemUgPSAoKSA9PiB7fTsvL+a4heepuuS4u+WcuuaZr+WIneWni+WMluWHveaVsFxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiTWFpbiBTY2VuZSBJbml0aWFsaXphdGlvbiBDb21wbGV0ZSEhXCIpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa4suafk+aji+ebmFxyXG4gICAgICogQHBhcmFtIGFyciDnlKjkuo7nlJ/miJDmo4vnm5jnmoTkuoznu7TmlbDnu4RcclxuICAgICAqIEBwYXJhbSBwb3NWZWMyIOaji+ebmOi1t+Wni+WdkOagh++8iOS4gOW+i+aMieWFqOWxgOe8qeaUvuavlOS4ujHorqHnrpfvvIzmuLLmn5PlmajkvJrmoLnmja7lhajlsYDnvKnmlL7mr5Toh6rliqjlrozmiJDnvKnmlL7muLLmn5PvvIlcclxuICAgICAqIEBwYXJhbSB1bml0c2l6ZSDljZXkvY3moLzlrZDlrr3pq5jvvIjkuIDlvovmjInlhajlsYDnvKnmlL7mr5TkuLox6K6h566X77yM5riy5p+T5Zmo5Lya5qC55o2u5YWo5bGA57yp5pS+5q+U6Ieq5Yqo5a6M5oiQ57yp5pS+5riy5p+T77yJXHJcbiAgICAgKiBAcGFyYW0gYmFja0dyb3VuZENvbG9yIOaji+ebmOiDjOaZr+minOiJslxyXG4gICAgICogQHBhcmFtIGZyb250Q29sb3Ig5qC85a2Q6aKc6ImyXHJcbiAgICAgKiBAcGFyYW0gZmF0aGVyIOeItue7mOWbvuiKgueCue+8iOm7mOiupOS4uuWFqOWxgOe7mOWbvuiKgueCue+8iVxyXG4gICAgICogQHBhcmFtIHNjYWxlIOe8qeaUvuavlO+8iOm7mOiupOS4ujHvvIlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGluaXRCb2FyZChhcnI6IG51bWJlcltdW10sIHBvc1ZlYzI6IFZlYzIsIHVuaXRzaXplOiBWZWMyLCBiYWNrR3JvdW5kQ29sb3I6IHN0cmluZywgZnJvbnRDb2xvcjogc3RyaW5nLCBzY2FsZTogbnVtYmVyID0gMSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2hlc3NCb2FyZCA9IG5ldyBDaGVzc0JvYXJkKGFycixwb3NWZWMyLHVuaXRzaXplLGJhY2tHcm91bmRDb2xvcixmcm9udENvbG9yLHNjYWxlKTsvL+aWsOW7uuaji+ebmFxyXG4gICAgICAgIFBlcmZvcm1hbmNlQ2VudHJlLmluc3RhbmNlLm1haW5TcHIuYWRkQ2hpbGQodGhpcy5jaGVzc0JvYXJkKTsvL+a3u+WKoOWtkOiKgueCuVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6LCD6IqC5YWo5bGA57yp5pS+5q+U77yM5Y+q6IO95L2c55So5LqO5omA5pyJYWN0b3LmuLLmn5PlrozmiJDlkI7jgIHmiYDmnInnibnmlYjluKflvqrnjq/miafooYzliY3vvIzlkKbliJnmnInpnZ7oh7Tlkb3mgKdidWdcclxuICAgICAqIEBwYXJhbSB2YWx1ZSDlhajlsYDlj6/op4boioLngrnnvKnmlL7mr5RcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlc2NhbGUodmFsdWU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLmV2ZW50KFwiUkVTQ0FMRVwiLFt2YWx1ZV0pOy8v5Y+R5biD6LCD5Y+C5LqL5Lu244CB57yp5pS+5q+U5Y+C5pWwXHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOa4suafk2FjdG9y5a+56LGhXHJcbiAgICAgKiBAcGFyYW0gYm91bmQgYWN0b3JcclxuICAgICAqIEBwYXJhbSBwb3Mg5Z2Q5qCH77yI5LiA5b6L5oyJ5YWo5bGA57yp5pS+5q+U5Li6Meiuoeeul++8jOa4suafk+WZqOS8muagueaNruWFqOWxgOe8qeaUvuavlOiHquWKqOWujOaIkOe8qeaUvua4suafk++8iVxyXG4gICAgICogQHBhcmFtIHNpeiDlrr3pq5jvvIjpu5jorqQxMCwxMO+8ie+8iOS4gOW+i+aMieWFqOWxgOe8qeaUvuavlOS4ujHorqHnrpfvvIzmuLLmn5PlmajkvJrmoLnmja7lhajlsYDnvKnmlL7mr5Toh6rliqjlrozmiJDnvKnmlL7muLLmn5PvvIlcclxuICAgICAqIEBwYXJhbSBmYXRoZXIg54i257uY5Zu+6IqC54K577yI6buY6K6k5Li65qOL55uY57uY5Zu+6IqC54K577yJXHJcbiAgICAgKiBAcGFyYW0gY29sb3Ig6aKc6Imy77yI6buY6K6k5Li657u/77yJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXNwbGF5QWN0b3IoYm91bmQ6IFN5bWJvbGl6ZWQsIHBvczogVmVjMiwgc2l6OlZlYzIgPSBuZXcgVmVjMigxMCwxMCksIGNvbG9yOnN0cmluZyA9IFwiIzAwZmYwMFwiLCBmYXRoZXI6Q3VzdG9taXplZFNwcml0ZSA9IFBlcmZvcm1hbmNlQ2VudHJlLmluc3RhbmNlLmNoZXNzQm9hcmQpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdG1wQWN0b3I6QWN0b3JSVSA9IG5ldyBBY3RvclJVKGJvdW5kLnN5bWJvbCxwb3Msc2l6LGZhdGhlcixjb2xvcik7Ly/muLLmn5NhY3RvclxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoC/kv67mlLnov5vluqbmnaFcclxuICAgICAqIOm7mOiupOi/m+W6puadoemVvzMw77yM5a69Ne+8iOm7mOiupOi/m+W6puadoeWuvemrmOaXoOazlemAmui/h+acrOWHveaVsOS/ruaUue+8jOWmgumcgOS/ruaUueivt+WJjeW+gCAuXFxSaG9kZSBJc2xhbmRcXHNyY1xcUmhvZGVzX0dhbWVcXFBlcmZvcm1hbmNlX01vZHVsZVxcU3ltYm9saXplZFJlbmRlci50c1xcQWN0b3JSVSlcclxuICAgICAqIOi/m+W6puminOiJsuS4uueBsO+8jOWmgumcgOS/ruaUueivt+WJjeW+gCAuXFxSaG9kZSBJc2xhbmRcXHNyY1xcUmhvZGVzX0dhbWVcXFBlcmZvcm1hbmNlX01vZHVsZVxcQWN0b3JDb21wb25lbnQudHNcXEJhclxyXG4gICAgICogQHBhcmFtIGJvdW5kIGFjdG9yXHJcbiAgICAgKiBAcGFyYW0gYmFyX3N5bWJOdW0g56ys5Yeg5qC56L+b5bqm5p2h77yI5aeL5LqOMO+8iSBcclxuICAgICAqIEBwYXJhbSBwZXJjZW50YWdlIOivpei/m+W6puadoei/m+W6plxyXG4gICAgICogQHBhcmFtIGNvbG9yIOivpei/m+W6puadoeiDjOaZr+minOiJslxyXG4gICAgICogQHBhcmFtIHgg6L+b5bqm5p2h6ZW/5bqm77yI5LiA5b6L5oyJ5YWo5bGA57yp5pS+5q+U5Li6Meiuoeeul++8jOa4suafk+WZqOS8muagueaNruWFqOWxgOe8qeaUvuavlOiHquWKqOWujOaIkOe8qeaUvua4suafk++8iVxyXG4gICAgICogQHBhcmFtIHkg6L+b5bqm5p2h6auY5bqm77yI5LiA5b6L5oyJ5YWo5bGA57yp5pS+5q+U5Li6Meiuoeeul++8jOa4suafk+WZqOS8muagueaNruWFqOWxgOe8qeaUvuavlOiHquWKqOWujOaIkOe8qeaUvua4suafk++8iVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZWRpdEJhcihib3VuZDogU3ltYm9saXplZCwgYmFyX3N5bWJOdW06bnVtYmVyID0gMCwgcGVyY2VudGFnZTogbnVtYmVyID0gMSwgY29sb3I6IHN0cmluZyA9IFwiIzAwZmYwMFwiLCB4PzpudW1iZXIsIHk/Om51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGxldCB0bXBBY3RvcjpBY3RvclJVID0gQWN0b3JCb3guZ2V0KGJvdW5kLnN5bWJvbC5kYXRhKTsvL+iOt+WPluW3sua4suafk+eahGFjdG9yUlXlr7nosaFcclxuICAgICAgICBpZih0bXBBY3Rvci5nZXRCYXIoYmFyX3N5bWJOdW0pID09PSAgdW5kZWZpbmVkKXsvL+WmguaenOWvueW6lOi/m+W6puadoeS4jeWtmOWcqFxyXG4gICAgICAgICAgICB0bXBBY3Rvci5hZGRFeHRCYXIoY29sb3IsYmFyX3N5bWJOdW0scGVyY2VudGFnZSx4LHkpOy8v5qC55o2u6L6T5YWl5Y+C5pWw5paw5bu66L+b5bqm5p2hXHJcblxyXG4gICAgICAgIH1lbHNley8v5aaC5a+55bqU6L+b5bqm5p2h5bey5a2Y5ZyoXHJcbiAgICAgICAgICAgIHRtcEFjdG9yLmVkaXRCYXIoYmFyX3N5bWJOdW0scGVyY2VudGFnZSk7Ly/kv67mlLnor6Xov5vluqbmnaHnmb7liIbmr5RcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+R5biD5pS75Ye75LqL5Lu2XHJcbiAgICAgKiDmraTmlrnms5XosIPnlKjlkI7or7fli7/kv67mlLnlhajlsYDnvKnmlL7mr5TvvIHvvIFcclxuICAgICAqIEBwYXJhbSBmcm9tIOWPkeWKqOaUu+WHu+iKgueCuVxyXG4gICAgICogQHBhcmFtIHRvIOmBreWPl+aJk+WHu+iKgueCuVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVmYXVsdEF0a0VmZmVjdChmcm9tOiBTeW1ib2xpemVkLCB0bzogU3ltYm9saXplZCk6IHZvaWQge1xyXG4gICAgICAgIC8v5omT5Ye75LqL5Lu244CB5Y+R5Yqo5pS75Ye76IqC54K55ZKM6YGt5Y+X5pS75Ye76IqC54K55Y+C5pWwXHJcbiAgICAgICAgQWN0b3JCb3guZ2V0KGZyb20uc3ltYm9sLmRhdGEpLmhpdCh0byk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5HluIPlj5fkvKTkuovku7ZcclxuICAgICAqIOatpOaWueazleiwg+eUqOWQjuivt+WLv+S/ruaUueWFqOWxgOe8qeaUvuavlO+8ge+8gVxyXG4gICAgICogQHBhcmFtIGJvdW5kIOWPl+S8pOiKgueCuVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVmYXVsdERtZ0VmZmVjdChib3VuZDogU3ltYm9saXplZCk6IHZvaWQge1xyXG4gICAgICAgIC8v5Y+X5Lyk5LqL5Lu25ZKM5Y+X5Lyk6IqC54K55Y+C5pWwXHJcbiAgICAgICAgQWN0b3JCb3guZ2V0KGJvdW5kLnN5bWJvbC5kYXRhKS5kYW1hZ2UoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDplIDmr4Hlr7nosaHvvIjpu5jorqTplIDmr4HvvIlcclxuICAgICAqIEBwYXJhbSBib3VuZCDlr7nosaFcclxuICAgICAqIEBwYXJhbSBwb3Mg5Z2Q5qCH77yI5LiA5b6L5oyJ5YWo5bGA57yp5pS+5q+U5Li6Meiuoeeul++8jOa4suafk+WZqOS8muagueaNruWFqOWxgOe8qeaUvuavlOiHquWKqOWujOaIkOe8qeaUvua4suafk++8iVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGlzdHJveUFjdG9yKGJvdW5kOiBTeW1ib2xpemVkLCBwb3M/OiBWZWMyKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHRtcEFjdG9yOkFjdG9yUlUgPSBBY3RvckJveC5nZXQoYm91bmQuc3ltYm9sLmRhdGEpOy8v6I635Y+WYWN0b3JSVeWvueixoVxyXG4gICAgICAgIGlmKHBvcyA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdG1wQWN0b3IuZGVzdG9yeSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihwb3MuZXF1YWxzKHRtcEFjdG9yLmdldFBvc1ZlYygpKSl7XHJcbiAgICAgICAgICAgIHRtcEFjdG9yLmRlc3RvcnkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/plIDmr4FhY3RvclJV5a+56LGhXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlnKhhY3Rvcui6q+S4iua4suafk+aWh+acrFxyXG4gICAgICog5LuF5b2T5YWo5bGA5paH5pys5pi+56S65byA5YWzc3dpdGNoSG92ZXJUZXh077yI77yJ5byA5ZCv5pe25omN5Lya5riy5p+T5paH5pys77yM5byA5YWz6buY6K6k5YWz6ZetXHJcbiAgICAgKiBAcGFyYW0gYm91bmQgYWN0b3JcclxuICAgICAqIEBwYXJhbSBjb250ZW50IOaWh+acrFxyXG4gICAgICogQHBhcmFtIHBvcyDmlofmnKzotbflp4vlnZDmoIfvvIjkuIDlvovmjInlhajlsYDnvKnmlL7mr5TkuLox6K6h566X77yM5riy5p+T5Zmo5Lya5qC55o2u5YWo5bGA57yp5pS+5q+U6Ieq5Yqo5a6M5oiQ57yp5pS+5riy5p+T77yJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB3cml0ZShib3VuZDogU3ltYm9saXplZCwgY29udGVudDogc3RyaW5nLCBwb3M/OiBWZWMyKTogdm9pZCB7XHJcbiAgICAgICAgQWN0b3JCb3guZ2V0KGJvdW5kLnN5bWJvbC5kYXRhKS5nZXRUZXh0KCkuc2V0VGV4dChjb250ZW50KTsvL+S/ruaUuUFjdG9yUlXmlofmnKxcclxuICAgICAgICBBY3RvckJveC5nZXQoYm91bmQuc3ltYm9sLmRhdGEpLmdldFRleHQoKS5zZXRQb3MocG9zKTsvL+S/ruaUueivpeaWh+acrOS9jee9rlxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YWo5bGA5paH5pys5pi+56S65byA5YWz77yI6buY6K6k5YWz6Zet77yJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzd2l0Y2hIb3ZlclRleHQoKTogdm9pZCB7XHJcbiAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2UuZXZlbnQoRXZlbnRDZW50cmUuRVR5cGUuUEVSRk9STUFOQ0VfVEVYVF9TV0lUQ0goKSk7Ly/lj5HluIPmlofmnKzlvIDlhbPkuovku7bvvIzmjInpkq7mlofmnKzkuI3lj5flvbHlk41cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOenu+WKqGFjdG9y5a+56LGhXHJcbiAgICAgKiBAcGFyYW0gYm91bmQgYWN0b3JcclxuICAgICAqIEBwYXJhbSBwb3Mg55uu5qCH5Z2Q5qCH77yI5LiA5b6L5oyJ5YWo5bGA57yp5pS+5q+U5Li6Meiuoeeul++8jOa4suafk+WZqOS8muagueaNruWFqOWxgOe8qeaUvuavlOiHquWKqOWujOaIkOe8qeaUvua4suafk++8iVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbW92ZShib3VuZDogU3ltYm9saXplZCwgcG9zOiBWZWMyKTogdm9pZCB7XHJcbiAgICAgICAgQWN0b3JCb3guZ2V0KGJvdW5kLnN5bWJvbC5kYXRhKS5yZWxvY2F0ZShwb3MpOy8v56e75YqoQWN0b3JSVeWvueixoeWdkOagh1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlnKhhY3Rvcui6q+S4iua3u+WKoOaMiemSrlxyXG4gICAgICog5q+P5LiqYWN0b3JSVem7mOiupOWtmOWcqDLkuKrmjInpkq7vvIjngrnlh7thY3RvclJV6IqC54K55Y2z5Y+v5pi+56S677yJ77yM5a+55bqU5pKk6YCA5ZKM5oqA6IO944CC6K+l5oyJ6ZKu5Z2Q5qCH44CB5a696auY44CB6aKc6Imy44CB5ZCN5a2X5LiN5Y+v5L+u5pS577yM5Yqf6IO96ZyA5LuO5aSW6YOo5re75YqgXHJcbiAgICAgKiBAcGFyYW0gYm91bmQgYWN0b3JcclxuICAgICAqIEBwYXJhbSBudW0g5oyJ6ZKu57yW5Y+377yIMCwx5Li66buY6K6k5oyJ6ZKu77yM6buY6K6k5oyJ6ZKu5LiN6Ieq5bim5Lu75L2V5Yqf6IO977yM6ZyA5omL5Yqo5re75Yqg77yJXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sg54K55Ye75oyJ6ZKu5ZCO6LCD55So55qE5Ye95pWwXHJcbiAgICAgKiBAcGFyYW0gdGV4dCDmmL7npLrlnKjmjInpkq7kuIrnmoTmlofmnKzvvIjpu5jorqTmmL7npLrkuJTml6Dms5Xkv67mlLnvvIlcclxuICAgICAqIEBwYXJhbSBwb3Mg5oyJ6ZKu6LW35aeL5Z2Q5qCH77yI5LiA5b6L5oyJ5YWo5bGA57yp5pS+5q+U5Li6Meiuoeeul++8jOa4suafk+WZqOS8muagueaNruWFqOWxgOe8qeaUvuavlOiHquWKqOWujOaIkOe8qeaUvua4suafk++8iVxyXG4gICAgICogQHBhcmFtIHNpemUg5oyJ6ZKu5aSn5bCP77yI5LiA5b6L5oyJ5YWo5bGA57yp5pS+5q+U5Li6Meiuoeeul++8jOa4suafk+WZqOS8muagueaNruWFqOWxgOe8qeaUvuavlOiHquWKqOWujOaIkOe8qeaUvua4suafk++8iVxyXG4gICAgICogQHBhcmFtIGNvbG9yIOaMiemSruminOiJslxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXR0YWNoQnV0dG9uKGJvdW5kOiBTeW1ib2xpemVkLG51bTpudW1iZXIsIGNhbGxiYWNrOiBGdW5jdGlvbiwgdGV4dD86IHN0cmluZywgcG9zPzogVmVjMiwgc2l6ZT86IFZlYzIsIGNvbG9yPzogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHRtcEFjdDpBY3RvclJVID0gQWN0b3JCb3guZ2V0KGJvdW5kLnN5bWJvbC5kYXRhKTsvL+iOt+WPlkFjdG9yUlXlr7nosaFcclxuICAgICAgICBpZih0bXBBY3QuZ2V0QnV0dG9uKG51bSkgPT09IHVuZGVmaW5lZCl7Ly/lpoLmnpzlr7nlupTmjInpkq7kuI3lrZjlnKhcclxuICAgICAgICAgICAgaWYocG9zID09PSB1bmRlZmluZWQpey8v5aaC5p6c5LiN6L6T5YWl5oyH5a6a5Z2Q5qCHXHJcbiAgICAgICAgICAgICAgICB0bXBBY3QuYWRkRXh0cmFCdXR0b25zQXREZWZMb2NhdGlvbih0ZXh0LG51bSxjb2xvcixjYWxsYmFjayk7Ly/lnKjpu5jorqTkvY3nva7mlrDlu7rmjInpkq5cclxuICAgICAgICAgICAgfWVsc2V7Ly/lpoLmnpzovpPlhaXmjIflrprlnZDmoIdcclxuICAgICAgICAgICAgICAgIHRtcEFjdC5hZGRFeHRyYUJ1dHRvbkF0Tm9EZWZMb2NhdGlvbih0ZXh0LG51bSxjYWxsYmFjayxwb3Msc2l6ZSxjb2xvcik7Ly/lnKjmjIflrprkvY3nva7mlrDlu7rmjInpkq5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNley8v5aaC5p6c5a+55bqU5oyJ6ZKu5a2Y5ZyoXHJcbiAgICAgICAgICAgIHRtcEFjdC5nZXRCdXR0b24obnVtKS5zZXRGdW5jKGNhbGxiYWNrKTsvL+i+k+WFpeWKn+iDveWHveaVsFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iLCIvL2F1dGhvciBOYTJDdUM0TzhcclxuXHJcbmltcG9ydCBDdXN0b21pemVkU3ByaXRlIGZyb20gXCIuL2N1c3RvbWl6ZWRTcHJcIjtcclxuaW1wb3J0IHsgQWN0b3JCb3ggfSBmcm9tIFwiLi9vYmpib3hcIjtcclxuaW1wb3J0IHsgQmFyLCBCdXR0b24gLCBUZXh0IH0gZnJvbSBcIi4vQWN0b3JDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTXlTeW1ib2wsIFN5bWJvbGl6ZWQgfSBmcm9tIFwiLi4vLi4vLi4vRml4L0ZpeFN5bWJvbFwiO1xyXG5pbXBvcnQgeyBWZWMyIH0gZnJvbSBcIi4uLy4uL0RvZE1hdGhcIjtcclxuaW1wb3J0IHsgS1ZQYWlyIH0gZnJvbSBcIi4uLy4uL0RvZERhdGFTdHJ1Y3R1cmVcIjtcclxuaW1wb3J0IHsgRXZlbnRDZW50cmUgfSBmcm9tIFwiLi4vLi4vLi4vRXZlbnQvRXZlbnRDZW50cmVcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3RvclJVe1xyXG4gICAgcHJpdmF0ZSBfaW5pdFBvczpWZWMyOy8vYWN0b3Lotbflp4vlnZDmoIdcclxuICAgIHByaXZhdGUgX2luaXRTaXplOlZlYzI7Ly9hY3Rvcui1t+Wni+Wkp+Wwj1xyXG4gICAgcHJpdmF0ZSBfaW5pdEJhckhlaWdodDpudW1iZXIgPSAwOy8v6L+b5bqm5p2h5YW25a6e6auY5bqm5pqC5a2Y5ZmoXHJcbiAgICBwcml2YXRlIF9wb3M6VmVjMjsvL+agueaNruWFqOWxgOe8qeaUvuavlOaNoueul+WQjueahOWPr+ingeWdkOagh1xyXG4gICAgcHJpdmF0ZSBfc2l6ZTpWZWMyOy8v5qC55o2u5YWo5bGA57yp5pS+5q+U5o2i566X5ZCO55qE5Y+v6KeB5aSn5bCPXHJcbiAgICBwcml2YXRlIF9zY2FsZTpudW1iZXIgPSAxOy8v5YWo5bGA57yp5pS+5q+UXHJcbiAgICBwcml2YXRlIF9zeW1iOk15U3ltYm9sOy8vc3ltYlxyXG4gICAgcHJpdmF0ZSBfZmF0aGVyOkN1c3RvbWl6ZWRTcHJpdGU7Ly/niLbnu5jlm77oioLngrlcclxuICAgIHByaXZhdGUgX3NwcjpDdXN0b21pemVkU3ByaXRlOy8v5pys57uY5Zu+6IqC54K5XHJcbiAgICBwcml2YXRlIF9iYXJQYWlyOktWUGFpcjxCYXI+ID0gbmV3IEtWUGFpcjxCYXI+KCk7Ly/ov5vluqbmnaHplK7lgLznu4RcclxuICAgIHByaXZhdGUgX3RleHQ6VGV4dDsvL+m7mOiupOaWh+acrFxyXG4gICAgcHJpdmF0ZSBfZGVmQnV0dG9uU2hvd2VkOmJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuaYvuekuum7mOiupOaMiemSru+8jOm7mOiupOS4uuWQplxyXG4gICAgcHJpdmF0ZSBfYnV0dG9uUGFpcjpLVlBhaXI8QnV0dG9uPiA9IG5ldyBLVlBhaXI8QnV0dG9uPigpO1xyXG4gICAgcHJpdmF0ZSBfYnV0dG9uSGVpZ2h0Om51bWJlcjsvL+aMiemSrumrmOW6puaaguWtmOWZqFxyXG4gICAgcHJpdmF0ZSBfZGFtYWdlOkN1c3RvbWl6ZWRTcHJpdGU7Ly/lj5fkvKTnibnmlYjmmL7npLroioLngrlcclxuICAgIHByaXZhdGUgX3RyYW5zcGFyZW5jeTpudW1iZXIgPSAxOy8v5Y+X5Lyk54m55pWI5Y+C5pWw5pqC5a2Y5ZmoXHJcbiAgICBwcml2YXRlIF9maXN0OkN1c3RvbWl6ZWRTcHJpdGU7Ly/mlLvlh7vnibnmlYjmmL7npLroioLngrlcclxuICAgIHByaXZhdGUgX21vdmVQZXJjZW50YWdlOm51bWJlciA9IDA7Ly/mlLvlh7vnibnmlYjlj4LmlbDmmoLlrZjlmahcclxuICAgIHB1YmxpYyBfY2VudGVyUG9zOlZlYzI7Ly/kuK3lv4PlnZDmoIdcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXJVbml05p6E6YCg5ZmoXHJcbiAgICAgKiBAcGFyYW0gc3ltYiBzeW1iXHJcbiAgICAgKiBAcGFyYW0gcG9zIOi1t+Wni+WdkOagh1xyXG4gICAgICogQHBhcmFtIHNpemUg5a696auYXHJcbiAgICAgKiBAcGFyYW0gZmF0aGVyIOeItue7mOWbvuiKgueCuVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihzeW1iOk15U3ltYm9sLCBwb3M6VmVjMiwgc2l6ZTpWZWMyLCBmYXRoZXI6Q3VzdG9taXplZFNwcml0ZSwgY29sb3I6c3RyaW5nID0gXCIjMDBmZmZmXCIsIHNjYWxlOm51bWJlciA9IDEpe1xyXG4gICAgICAgIHRoaXMuX2ZhdGhlciA9IGZhdGhlcjsvL+eItue7mOWbvuiKgueCuVxyXG4gICAgICAgIHRoaXMuX2luaXRQb3MgPSBwb3M7Ly/otbflp4vlnZDmoIdcclxuICAgICAgICB0aGlzLl9pbml0U2l6ZSA9IHNpemU7Ly/otbflp4vlrr3pq5hcclxuICAgICAgICB0aGlzLl9zcHIgPSBuZXcgQ3VzdG9taXplZFNwcml0ZSgpOy8v5paw5bu657uY5Zu+6IqC54K5XHJcbiAgICAgICAgdGhpcy5fZmF0aGVyLmFkZENoaWxkKHRoaXMuX3Nwcik7Ly/mt7vliqDlrZDoioLngrlcclxuICAgICAgICB0aGlzLnNldERhdGEoc3ltYixuZXcgVmVjMih0aGlzLl9pbml0UG9zLngqdGhpcy5fc2NhbGUsdGhpcy5faW5pdFBvcy55KnRoaXMuX3NjYWxlKSxuZXcgVmVjMih0aGlzLl9pbml0U2l6ZS54KnRoaXMuX3NjYWxlLCB0aGlzLl9pbml0U2l6ZS55KnRoaXMuX3NjYWxlKSxjb2xvcik7Ly/orr7nva7nu5jlm77oioLngrnlj4LmlbBcclxuICAgICAgICBBY3RvckJveC5hZGQodGhpcyx0aGlzLl9zeW1iKTsvL+WwhuacrOWvueixoea3u+WKoOWIsOmUruWAvOWvuVxyXG4gICAgICAgIHRoaXMuYWRkRGVmQmFyKCk7Ly/mt7vliqDpu5jorqTov5vluqbmnaFcclxuICAgICAgICB0aGlzLl90ZXh0ID0gbmV3IFRleHQodGhpcy5faW5pdFNpemUsdGhpcy5fc2NhbGUpOy8v5re75Yqg6buY6K6k5paH5pysXHJcbiAgICAgICAgdGhpcy5fdGV4dC5zZXRTeW1iKHRoaXMuX3N5bWIpOy8vXHJcbiAgICAgICAgdGhpcy5fYnV0dG9uSGVpZ2h0ID0gdGhpcy5faW5pdFNpemUueTsvL1xyXG4gICAgICAgIHRoaXMuX3Nwci5hZGRDaGlsZCh0aGlzLl90ZXh0KTsvL+m7mOiupOaWh+acrOe9ruS6juWtkOiKgueCuVxyXG4gICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLm9uKEV2ZW50Q2VudHJlLkVUeXBlLlBFUkZPUk1BTkNFX1JFU0NBTEUoKSx0aGlzLHRoaXMucmVTY2FsZSk7Ly/nm5HlkKzlhajlsYDnvKnmlL7mr5RcclxuICAgICAgICB0aGlzLl9zcHIub24oTGF5YS5FdmVudC5NT1VTRV9PVkVSLHRoaXMsdGhpcy5tb3VzZU92ZXIpOy8vXHJcbiAgICAgICAgdGhpcy5fc3ByLm9uKExheWEuRXZlbnQuTU9VU0VfT1VULHRoaXMsdGhpcy5tb3VzZU91dCk7Ly9cclxuICAgICAgICB0aGlzLl9zcHIub24oTGF5YS5FdmVudC5NT1VTRV9VUCx0aGlzLHRoaXMuc2hvd0RlZmF1bHRCb3R0b25zKTsvL1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZSA9IG5ldyBDdXN0b21pemVkU3ByaXRlKCk7Ly9cclxuICAgICAgICB0aGlzLl9zcHIuYWRkQ2hpbGQodGhpcy5fZGFtYWdlKTsvL1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZS5zZXRQYXJhbSgwLDAsdGhpcy5fc2l6ZS54LHRoaXMuX3NpemUueSxcIiNmOTE1MjZcIik7Ly9cclxuICAgICAgICB0aGlzLl9kYW1hZ2UubG9jYXRpb25BbmRTaXplKCk7Ly9cclxuICAgICAgICB0aGlzLmFkZERlZkJ1dHRvbnMoKTsvL1xyXG4gICAgICAgIHRoaXMuX2Zpc3QgPSBuZXcgQ3VzdG9taXplZFNwcml0ZSgpOy8vXHJcbiAgICAgICAgdGhpcy5fZmlzdC5zZXRQYXJhbSh0aGlzLl9jZW50ZXJQb3MueCx0aGlzLl9jZW50ZXJQb3MueSwxNiwxNixcIiNGM0MyNDZcIik7Ly9cclxuICAgICAgICB0aGlzLl9maXN0LmxvY2F0aW9uQW5kU2l6ZSgpOy8vXHJcbiAgICAgICAgdGhpcy5fZmlzdC56T3JkZXIgPSAyOy8vXHJcbiAgICAgICAgdGhpcy5fc3ByLmFkZENoaWxkKHRoaXMuX2Zpc3QpOy8vXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue5b2T5YmN5Y+v6KeG6IqC54K55Z2Q5qCHXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3VyUG9zKCk6VmVjMntcclxuICAgICAgICByZXR1cm4gdGhpcy5fcG9zO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWPkeWKqOaJk+WHu+eJueaViFxyXG4gICAgICogQHBhcmFtIHRvIOaJk+WHu+ebruagh1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaGl0KHRvOlN5bWJvbGl6ZWQpOnZvaWR7XHJcbiAgICAgICAgLy8gdGhpcy5fZmlzdC5ncmFwaGljcy5zYXZlKCk7XHJcbiAgICAgICAgdGhpcy5fZmlzdC5jZW50cmFsU2hpZnRDb2xvcmVkKCk7XHJcbiAgICAgICAgbGV0IHRtcFZlYzpWZWMyID0gbmV3IFZlYzIoQWN0b3JCb3guZ2V0KHRvLnN5bWJvbC5kYXRhKS5jdXJQb3MoKS54LXRoaXMuX3Bvcy54LEFjdG9yQm94LmdldCh0by5zeW1ib2wuZGF0YSkuY3VyUG9zKCkueS10aGlzLl9wb3MueSk7XHJcbiAgICAgICAgbGV0IGZ1bjpGdW5jdGlvbiA9ICh0YXJnZXQ6VmVjMikgPT57XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX21vdmVQZXJjZW50YWdlID4gMSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3ZlUGVyY2VudGFnZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9maXN0LmdyYXBoaWNzLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLl9maXN0LmdyYXBoaWNzLnJlc3RvcmUoKTtcclxuICAgICAgICAgICAgICAgIExheWEudGltZXIuY2xlYXIodGhpcyxmdW4pO1xyXG4gICAgICAgICAgICAgICAgQWN0b3JCb3guZ2V0KHRvLnN5bWJvbC5kYXRhKS5kYW1hZ2UoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBjdXJMb2NhY3Rpb246VmVjMiA9IG5ldyBWZWMyKCAoMTYrIHRhcmdldC54KSp0aGlzLl9tb3ZlUGVyY2VudGFnZSwoMTYrIHRhcmdldC55KSp0aGlzLl9tb3ZlUGVyY2VudGFnZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX21vdmVQZXJjZW50YWdlICs9IDAuMDI7XHJcbiAgICAgICAgICAgIHRoaXMuX2Zpc3QucmVsb2NhdGUoY3VyTG9jYWN0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5fZmlzdC5yb3RhdGlvbiA9IDIwMDAgKiB0aGlzLl9tb3ZlUGVyY2VudGFnZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExheWEudGltZXIubG9vcCgyMCx0aGlzLGZ1bixbdG1wVmVjXSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+R5Yqo5Y+X5Lyk54m55pWIXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkYW1hZ2UoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZS5zZXRQYXJhbSgwLDAsdGhpcy5fc2l6ZS54LHRoaXMuX3NpemUueSk7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlLmxvY2F0aW9uQW5kU2l6ZSgpO1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZS5jaGFuZ2VDb2xvcigpO1xyXG4gICAgICAgIGxldCBmdW46RnVuY3Rpb24gPSAoKT0+e1xyXG4gICAgICAgICAgICBpZih0aGlzLl90cmFuc3BhcmVuY3kgPCAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RhbWFnZS5ncmFwaGljcy5jbGVhcigpOyBcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zcGFyZW5jeSA9IDE7XHJcbiAgICAgICAgICAgICAgICBMYXlhLnRpbWVyLmNsZWFyKHRoaXMsZnVuKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5fdHJhbnNwYXJlbmN5IC09IDAuMDM7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhbWFnZS5hbHBoYSA9IHRoaXMuX3RyYW5zcGFyZW5jeTtcclxuICAgICAgICB9XHJcbiAgICAgICAgTGF5YS50aW1lci5sb29wKDIwLHRoaXMsZnVuKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5riy5p+T6buY6K6k5oyJ6ZKuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2hvd0RlZmF1bHRCb3R0b25zKCk6dm9pZHtcclxuICAgICAgICBpZih0aGlzLl9kZWZCdXR0b25TaG93ZWQgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgdGhpcy5fc3ByLmFkZENoaWxkKHRoaXMuX2J1dHRvblBhaXIucmVhZCgwK1wiXCIpLmdldFNwcigpKTtcclxuICAgICAgICAgICAgdGhpcy5fc3ByLmFkZENoaWxkKHRoaXMuX2J1dHRvblBhaXIucmVhZCgxK1wiXCIpLmdldFNwcigpKTtcclxuICAgICAgICAgICAgdGhpcy5fZGVmQnV0dG9uU2hvd2VkID0gdHJ1ZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fc3ByLnJlbW92ZUNoaWxkKHRoaXMuX2J1dHRvblBhaXIucmVhZCgwK1wiXCIpLmdldFNwcigpKTtcclxuICAgICAgICAgICAgdGhpcy5fc3ByLnJlbW92ZUNoaWxkKHRoaXMuX2J1dHRvblBhaXIucmVhZCgxK1wiXCIpLmdldFNwcigpKTtcclxuICAgICAgICAgICAgdGhpcy5fZGVmQnV0dG9uU2hvd2VkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOWPkeW4g+m8oOagh+i/m+WFpeS6i+S7tlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG1vdXNlT3ZlcigpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fdGV4dC5zZXRTd2l0Y2hPbigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+R5biD6byg5qCH56a75byA5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbW91c2VPdXQoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3RleHQuc2V0U3dpdGNoT2ZmKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDph43orr7nvKnmlL7mr5RcclxuICAgICAqIEBwYXJhbSB2YWx1ZSDmlrDlhajlsYDnvKnmlL7mr5RcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZVNjYWxlKHZhbHVlOm51bWJlcik6dm9pZHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9zY2FsZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh0aGlzLl9zeW1iLHRoaXMuX2luaXRQb3MsdGhpcy5faW5pdFNpemUsdGhpcy5fc3ByLmdldENvbG9yKCkpO1xyXG4gICAgICAgIHRoaXMuc2V0Q29sb3IoKTtcclxuICAgICAgICB0aGlzLl9kYW1hZ2Uuc2V0UGFyYW0oMCwwLHRoaXMuX2luaXRTaXplLngqdGhpcy5fc2NhbGUsdGhpcy5faW5pdFNpemUueSp0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlLmxvY2F0aW9uQW5kU2l6ZSgpO1xyXG4gICAgICAgIFxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruacrEFSVeeahOWQhOmhueWPguaVsFxyXG4gICAgICogQHBhcmFtIHN5bWIgc3ltYlxyXG4gICAgICogQHBhcmFtIHBvcyDotbflp4vlnZDmoIdcclxuICAgICAqIEBwYXJhbSBzaXplIOWkp+Wwj1xyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0RGF0YShzeW1iOk15U3ltYm9sLCBwb3M6VmVjMiwgc2l6ZTpWZWMyLGNvbG9yOnN0cmluZyk6dm9pZHtcclxuICAgICAgICB0aGlzLl9zeW1iID0gc3ltYjtcclxuICAgICAgICB0aGlzLl9wb3MgPSBuZXcgVmVjMihwb3MueCp0aGlzLl9zY2FsZSxwb3MueSp0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fc2l6ZSA9IG5ldyBWZWMyKHNpemUueCp0aGlzLl9zY2FsZSxzaXplLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX3Nwci5zZXRQYXJhbSh0aGlzLl9wb3MueCx0aGlzLl9wb3MueSx0aGlzLl9zaXplLngsdGhpcy5fc2l6ZS55LGNvbG9yKTtcclxuICAgICAgICB0aGlzLnNldENvbG9yKCk7XHJcbiAgICAgICAgdGhpcy5fc3ByLmxvY2F0aW9uQW5kU2l6ZSgpO1xyXG4gICAgICAgIHRoaXMuX2NlbnRlclBvcyA9IG5ldyBWZWMyKHRoaXMuX3NpemUueC8yLHRoaXMuX3NpemUueS8yKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBjb2xvciDorr7nva7popzoibJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldENvbG9yKCk6dm9pZHtcclxuICAgICAgICB0aGlzLl9zcHIuY2hhbmdlQ29sb3IoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBwb3Mg6YeN5paw6K6+572u6LW35aeL5Z2Q5qCH77yI5LiN5Y+X57yp5pS+5q+U5b2x5ZON77yJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWxvY2F0ZShwb3M6VmVjMik6dm9pZHtcclxuICAgICAgICB0aGlzLl9wb3MgPSBuZXcgVmVjMihwb3MueCp0aGlzLl9zY2FsZSxwb3MueSp0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5faW5pdFBvcyA9IHBvcy5jbG9uZSgpO1xyXG4gICAgICAgIHRoaXMuX3Nwci5yZWxvY2F0ZShwb3MpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaRp+avgeacrEFSVVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVzdG9yeSgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fc3ByLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluacrEFSVeeahOi1t+Wni+WdkOagh++8iOS4jeWPl+e8qeaUvuavlOW9seWTje+8iVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0UG9zVmVjKCk6VmVjMntcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5pdFBvcztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bmnKxBUlXnmoTpu5jorqTmlofmnKzlr7nosaFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFRleHQoKTpUZXh0e1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90ZXh0O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoOm7mOiupOi/m+W6puadoVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkRGVmQmFyKCk6dm9pZHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9pbml0QmFySGVpZ2h0ID0gMDtcclxuICAgICAgICBsZXQgdG1wOkJhciA9IG5ldyBCYXIoMCxcIiMwMGZmZmZcIixuZXcgVmVjMigzMCw1KSxuZXcgVmVjMigwLHRoaXMuX2luaXRCYXJIZWlnaHQgLSA2KSx0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fc3ByLmFkZENoaWxkKHRtcC5nZXRCYWNrU3ByKCkpO1xyXG4gICAgICAgIHRoaXMuX2JhclBhaXIuZWRpdChcImJhcl8wXCIsdG1wKTtcclxuICAgICAgICB0aGlzLl9pbml0QmFySGVpZ2h0ID0gdGhpcy5faW5pdEJhckhlaWdodCAtIHRtcC5nZXRIZWlnaHQoKSAtIDE7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bmnKxBUlXnmoTmjIflrprov5vluqbmnaFcclxuICAgICAqIEBwYXJhbSBudW0g6L+b5bqm5p2h5Luj5Y+3XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRCYXIobnVtOm51bWJlcik6QmFye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iYXJQYWlyLnJlYWQoYGJhcl8ke251bX1gKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoOmZhOWKoOi/m+W6puadoVxyXG4gICAgICogQHBhcmFtIGJhY2tHcm91bmRDb2xvciDorr7nva7mlrDlop7ov5vluqbmnaHpopzoibJcclxuICAgICAqIEBwYXJhbSBzeW1iIOiuvue9ruaWsOWinui/m+W6puadoeS7o+WPt1xyXG4gICAgICogQHBhcmFtIHgg5a695bqmXHJcbiAgICAgKiBAcGFyYW0geSDpq5jluqZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZEV4dEJhcihiYWNrR3JvdW5kQ29sb3I6c3RyaW5nLHN5bWI6bnVtYmVyLHBlcmNlbnRhZ2U6bnVtYmVyLHg6bnVtYmVyID0gMzAseTpudW1iZXIgPSA1KTp2b2lke1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB0bXBCYXI6QmFyID0gbmV3IEJhcihzeW1iLGJhY2tHcm91bmRDb2xvcixuZXcgVmVjMih4LHkpLG5ldyBWZWMyKDAsdGhpcy5faW5pdEJhckhlaWdodCAtIHkgLSAxKSx0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fc3ByLmFkZENoaWxkKHRtcEJhci5nZXRCYWNrU3ByKCkpO1xyXG4gICAgICAgIHRoaXMuX2JhclBhaXIuZWRpdChgYmFyXyR7c3ltYn1gLHRtcEJhcik7XHJcbiAgICAgICAgdGhpcy5faW5pdEJhckhlaWdodCA9IHRoaXMuX2luaXRCYXJIZWlnaHQgLSB0bXBCYXIuZ2V0SGVpZ2h0KCkgLSAxO1xyXG4gICAgICAgIHRtcEJhci5wZXJjZW50YWdlID0gcGVyY2VudGFnZTtcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5L+u5pS55bey5pyJ6L+b5bqm5p2hXHJcbiAgICAgKiBAcGFyYW0gc3ltYiDmjIflrprov5vluqbmnaHku6Plj7dcclxuICAgICAqIEBwYXJhbSBwZXJjZW50YWdlIOS/ruaUuei/m+W6puadoei/m+W6plxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZWRpdEJhcihzeW1iOm51bWJlciwgcGVyY2VudGFnZTpudW1iZXIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fYmFyUGFpci5yZWFkKGBiYXJfJHtzeW1ifWApLnBlcmNlbnRhZ2UgPSBwZXJjZW50YWdlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoOm7mOiupOaMiemSrlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZERlZkJ1dHRvbnMoKTp2b2lke1xyXG4gICAgICAgIGxldCB0bXAxOkJ1dHRvbiA9IG5ldyBCdXR0b24odGhpcy5fc3ltYixcIlJldHJlYXRcIiwwLG5ldyBWZWMyKCAtIDIwLHRoaXMuX2luaXRTaXplLnkpLG5ldyBWZWMyKDIwLDE1KSx1bmRlZmluZWQsdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX2J1dHRvblBhaXIuZWRpdChcIjBcIix0bXAxKTtcclxuICAgICAgICBsZXQgdG1wMjpCdXR0b24gPSBuZXcgQnV0dG9uKHRoaXMuX3N5bWIsXCJBY3RpdmF0ZV9Ta2lsbFwiLDAsbmV3IFZlYzIodGhpcy5faW5pdFNpemUueCx0aGlzLl9pbml0U2l6ZS55KSxuZXcgVmVjMigyMCwxNSksdW5kZWZpbmVkLHRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9idXR0b25QYWlyLmVkaXQoXCIxXCIsdG1wMik7XHJcbiAgICAgICAgdGhpcy5fYnV0dG9uSGVpZ2h0ID0gdGhpcy5faW5pdFNpemUueSArIDE2O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWcqOm7mOiupOS9jee9rua3u+WKoOmineWkluaMiemSrlxyXG4gICAgICogQHBhcmFtIG5hbWUgXHJcbiAgICAgKiBAcGFyYW0gbnVtIFxyXG4gICAgICogQHBhcmFtIGNvbG9yIFxyXG4gICAgICogQHBhcmFtIGZ1biBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZEV4dHJhQnV0dG9uc0F0RGVmTG9jYXRpb24obmFtZTpzdHJpbmcsbnVtOm51bWJlciwgY29sb3I/OnN0cmluZywgZnVuPzpGdW5jdGlvbik6dm9pZHtcclxuICAgICAgICBsZXQgdG1wQnV0OkJ1dHRvbiA9IG5ldyBCdXR0b24odGhpcy5fc3ltYixuYW1lLG51bSxuZXcgVmVjMigwLHRoaXMuX2J1dHRvbkhlaWdodCksbmV3IFZlYzIoMjAsMTUpLGNvbG9yLHRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9idXR0b25QYWlyLmVkaXQobnVtK1wiXCIsdG1wQnV0KTtcclxuICAgICAgICB0aGlzLl9zcHIuYWRkQ2hpbGQodG1wQnV0LmdldFNwcigpKTtcclxuICAgICAgICB0aGlzLl9idXR0b25IZWlnaHQgKz0gMTY7XHJcbiAgICAgICAgdG1wQnV0LnNldEZ1bmMoZnVuKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWcqOaMh+WumuS9jee9rua3u+WKoOmineWkluaMiemSrlxyXG4gICAgICogQHBhcmFtIG5hbWUgXHJcbiAgICAgKiBAcGFyYW0gbnVtIFxyXG4gICAgICogQHBhcmFtIGZ1biBcclxuICAgICAqIEBwYXJhbSBwb3MgXHJcbiAgICAgKiBAcGFyYW0gc2l6ZSBcclxuICAgICAqIEBwYXJhbSBjb2xvciBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZEV4dHJhQnV0dG9uQXROb0RlZkxvY2F0aW9uKG5hbWU6c3RyaW5nLG51bTpudW1iZXIsZnVuOkZ1bmN0aW9uLHBvczpWZWMyLHNpemU6VmVjMiwgY29sb3I/OnN0cmluZyk6dm9pZHtcclxuICAgICAgICBsZXQgdG1wQnV0OkJ1dHRvbiA9IG5ldyBCdXR0b24odGhpcy5fc3ltYixuYW1lLG51bSxwb3Msc2l6ZSxjb2xvcix0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fYnV0dG9uUGFpci5lZGl0KG51bStcIlwiLHRtcEJ1dCk7XHJcbiAgICAgICAgdGhpcy5fc3ByLmFkZENoaWxkKHRtcEJ1dC5nZXRTcHIoKSk7XHJcbiAgICAgICAgdG1wQnV0LnNldEZ1bmMoZnVuKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluaMiemSrlxyXG4gICAgICogQHBhcmFtIG51bSDmjInpkq7nvJblj7dcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEJ1dHRvbihudW06bnVtYmVyKTpCdXR0b257XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2J1dHRvblBhaXIucmVhZChudW0rXCJcIik7XHJcbiAgICB9XHJcblxyXG59XHJcbiIsIi8vYXV0aG9yIE5hMkN1QzRPOFxyXG5pbXBvcnQgQ3VzdG9taXplZFNwcml0ZSBmcm9tIFwiLi9jdXN0b21pemVkU3ByXCI7XHJcbmltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi4vLi4vRG9kTWF0aFwiO1xyXG5pbXBvcnQgeyBFdmVudENlbnRyZSB9IGZyb20gXCIuLi8uLi8uLi9FdmVudC9FdmVudENlbnRyZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBDaGVzc0JvYXJkIGV4dGVuZHMgQ3VzdG9taXplZFNwcml0ZXtcclxuICAgIHByaXZhdGUgX2luaXRQb3M6VmVjMjtcclxuICAgIHByaXZhdGUgX2luaXRTaXplOlZlYzI7XHJcbiAgICBwcml2YXRlIF9udW1BcnI6bnVtYmVyW11bXTsvLzJkIGFyciB3aGljaCByZXByZXNlbnRzIHRoZSBjaGVzcyBib2FyZFxyXG4gICAgcHJpdmF0ZSBfcG9zVmVjMjpWZWMyOy8vaW5pdGlhbCBsb2NhdGlvbih4LHkpXHJcbiAgICBwcml2YXRlIF91bml0U2l6ZVZlYzI6VmVjMjsvL3VuaXQgc2l6ZSh3aWR0aCwgaGVpZ2h0KVxyXG4gICAgcHJpdmF0ZSBfZnJvbnRTcHJBcnI6Q3VzdG9taXplZFNwcml0ZVtdW107Ly9mcm9udCBzcHJcclxuICAgIHByaXZhdGUgX3NjYWxlOm51bWJlcjsvL3NjYWxlIGZvciB6b29taW5nXHJcbiAgICBwcml2YXRlIF9iYWNrR3JvdW5kQ29sb3I6c3RyaW5nOy8vYmFja2dyb3VuZCBjb2xvclxyXG4gICAgcHJpdmF0ZSBfZnJvbnRDb2xvcjpzdHJpbmc7Ly9mcm9udCBjb2xvciBcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaji+ebmOaehOmAoOWZqFxyXG4gICAgICogQHBhcmFtIGFyciDkuoznu7TmlbDnu4RcclxuICAgICAqIEBwYXJhbSBwb3NWZWMyIOi1t+Wni+WdkOagh1xyXG4gICAgICogQHBhcmFtIHVuaXRzaXplIOWNleS9jeWuvemrmFxyXG4gICAgICogQHBhcmFtIGJhY2tHcm91bmRDb2xvciDog4zmma/popzoibJcclxuICAgICAqIEBwYXJhbSBmcm9udENvbG9yIOagvOWtkOminOiJslxyXG4gICAgICogQHBhcmFtIGZhdGhlciDniLbnu5jlm77oioLngrlcclxuICAgICAqIEBwYXJhbSBzY2FsZSDnvKnmlL7mr5RcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoYXJyOm51bWJlcltdW10sIHBvc1ZlYzI6VmVjMiwgdW5pdHNpemU6VmVjMiwgYmFja0dyb3VuZENvbG9yOnN0cmluZywgZnJvbnRDb2xvcjpzdHJpbmcsIHNjYWxlOm51bWJlcil7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9udW1BcnIgPSBhcnI7XHJcbiAgICAgICAgdGhpcy5faW5pdFBvcyA9IHBvc1ZlYzI7XHJcbiAgICAgICAgdGhpcy5faW5pdFNpemUgPSB1bml0c2l6ZTtcclxuICAgICAgICB0aGlzLl9zY2FsZSA9IHNjYWxlO1xyXG4gICAgICAgIHRoaXMuX3Bvc1ZlYzIgPSBuZXcgVmVjMih0aGlzLl9pbml0UG9zLngqdGhpcy5fc2NhbGUsIHRoaXMuX2luaXRQb3MueSp0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fdW5pdFNpemVWZWMyID0gbmV3IFZlYzIodGhpcy5faW5pdFNpemUueCAqIHRoaXMuX3NjYWxlLHRoaXMuX2luaXRTaXplLnkgKiB0aGlzLl9zY2FsZSk7Ly9yZWNhbGN1bGF0ZSB1bml0U2l6ZVxyXG4gICAgICAgIHRoaXMuX2JhY2tHcm91bmRDb2xvciA9IGJhY2tHcm91bmRDb2xvcjtcclxuICAgICAgICB0aGlzLl9mcm9udENvbG9yID0gZnJvbnRDb2xvcjtcclxuICAgICAgICB0aGlzLmluaXRCYWNrZ3JvdW5kKCk7XHJcbiAgICAgICAgdGhpcy5zZXRDb2xvcih0aGlzLl9iYWNrR3JvdW5kQ29sb3IpO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlQ29sb3IoKTtcclxuICAgICAgICB0aGlzLmluaXRGcm9udFNwckFycigpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyRnJvbnRTcHIodGhpcy5fZnJvbnRDb2xvcik7XHJcbiAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2Uub24oRXZlbnRDZW50cmUuRVR5cGUuUEVSRk9STUFOQ0VfUkVTQ0FMRSgpLHRoaXMsdGhpcy5yZVNjYWxlKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkcmF3IGJhY2tncm91bmRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0QmFja2dyb3VuZCgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5zZXRQYXJhbSh0aGlzLl9wb3NWZWMyLngsdGhpcy5fcG9zVmVjMi55LHRoaXMuX251bUFyclswXS5sZW5ndGgqdGhpcy5fdW5pdFNpemVWZWMyLngsdGhpcy5fbnVtQXJyLmxlbmd0aCp0aGlzLl91bml0U2l6ZVZlYzIueSx0aGlzLl9iYWNrR3JvdW5kQ29sb3IpO1xyXG4gICAgICAgIHRoaXMubG9jYXRpb25BbmRTaXplKCk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkcmF3IGZyb250XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdEZyb250U3ByQXJyKCk6dm9pZHtcclxuICAgICAgICB0aGlzLl9mcm9udFNwckFyciA9IFtdOy8vaW5pdCBjdXN0U3ByQXJyXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuX251bUFyci5sZW5ndGg7IGkgKyspe1xyXG4gICAgICAgICAgICBsZXQgdG1wQXJyOkN1c3RvbWl6ZWRTcHJpdGVbXSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IoIGxldCBqID0gMDsgaiA8IHRoaXMuX251bUFyclswXS5sZW5ndGg7IGogKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IHRtcFNwcjpDdXN0b21pemVkU3ByaXRlID0gbmV3IEN1c3RvbWl6ZWRTcHJpdGUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQodG1wU3ByKTtcclxuICAgICAgICAgICAgICAgIHRtcFNwci5zZXRQYXJhbSgwK2oqdGhpcy5fdW5pdFNpemVWZWMyLngsMCtpKnRoaXMuX3VuaXRTaXplVmVjMi55LHRoaXMuX3VuaXRTaXplVmVjMi54LHRoaXMuX3VuaXRTaXplVmVjMi55LHRoaXMuX2Zyb250Q29sb3IsbmV3IFZlYzIoMSwxKSk7XHJcbiAgICAgICAgICAgICAgICB0bXBTcHIubG9jYXRpb25BbmRTaXplKCk7XHJcbiAgICAgICAgICAgICAgICB0bXBTcHIuc2V0Q29sb3IodGhpcy5fZnJvbnRDb2xvcik7XHJcbiAgICAgICAgICAgICAgICB0bXBTcHIuY2hhbmdlQ29sb3IoKTtcclxuICAgICAgICAgICAgICAgIHRtcFNwci56T3JkZXIgPSAtMTtcclxuICAgICAgICAgICAgICAgIHRtcEFyci5wdXNoKHRtcFNwcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fZnJvbnRTcHJBcnIucHVzaCh0bXBBcnIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGNvbG9yIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbmRlckZyb250U3ByKGNvbG9yOnN0cmluZyl7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuX2Zyb250U3ByQXJyLmxlbmd0aDsgaSArKyl7XHJcbiAgICAgICAgICAgIGZvciggbGV0IGogPSAwOyBqIDwgdGhpcy5fZnJvbnRTcHJBcnJbMF0ubGVuZ3RoOyBqICsrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Zyb250U3ByQXJyW2ldW2pdLnNldENvbG9yKGNvbG9yKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Zyb250U3ByQXJyW2ldW2pdLmNoYW5nZUNvbG9yKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkv67mlLnliY3mlrnmoLzlrZDpopzoibJcclxuICAgICAqIEBwYXJhbSBwb3NWZWMyIOW+heS/ruaUueagvOWtkOWdkOagh++8iHgsee+8iVxyXG4gICAgICogQHBhcmFtIGNvbG9yIOebruagh+minOiJslxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2hhbmdlRnJvbnRDb2xvcihwb3NWZWMyOlZlYzIsY29sb3I6c3RyaW5nKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX2Zyb250U3ByQXJyW3Bvc1ZlYzIueV1bcG9zVmVjMi54XS5zZXRDb2xvcihjb2xvcik7XHJcbiAgICAgICAgdGhpcy5fZnJvbnRTcHJBcnJbcG9zVmVjMi55XVtwb3NWZWMyLnhdLmNoYW5nZUNvbG9yKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuIXpmaTmiYDmnInlt7Lnu5jlm77lvaJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjbGVhckFsbCgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5ncmFwaGljcy5jbGVhcigpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9mcm9udFNwckFyci5sZW5ndGg7IGkgKyspe1xyXG4gICAgICAgICAgICBmb3IoIGxldCBqID0gMDsgaiA8IHRoaXMuX2Zyb250U3ByQXJyWzBdLmxlbmd0aDsgaiArKyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9mcm9udFNwckFycltpXVtqXS5ncmFwaGljcy5jbGVhcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YeN6K6+5qOL55uY57yp5pS+5q+UXHJcbiAgICAgKiBAcGFyYW0gbnVtIOe8qeaUvuavlFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVTY2FsZShudW06bnVtYmVyKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3NjYWxlID0gbnVtO1xyXG4gICAgICAgIHRoaXMuX3Bvc1ZlYzIgPSBuZXcgVmVjMih0aGlzLl9pbml0UG9zLngqdGhpcy5fc2NhbGUsdGhpcy5faW5pdFBvcy55KnRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl91bml0U2l6ZVZlYzIgPSBuZXcgVmVjMih0aGlzLl9pbml0U2l6ZS54ICogdGhpcy5fc2NhbGUsdGhpcy5faW5pdFNpemUueSAqIHRoaXMuX3NjYWxlKTsvL3JlY2FsY3VsYXRlIHVuaXRTaXplXHJcbiAgICAgICAgdGhpcy5jbGVhckFsbCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdEJhY2tncm91bmQoKTtcclxuICAgICAgICB0aGlzLmluaXRGcm9udFNwckFycigpO1xyXG4gICAgICAgIHRoaXMuc2V0Q29sb3IodGhpcy5fYmFja0dyb3VuZENvbG9yKTtcclxuICAgICAgICB0aGlzLmNoYW5nZUNvbG9yKCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJGcm9udFNwcih0aGlzLl9mcm9udENvbG9yKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiIsImltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi4vLi4vRG9kTWF0aFwiO1xyXG5cclxuLy9hdXRob3IgTmEyQ3VDNE84XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdXN0b21pemVkU3ByaXRlIGV4dGVuZHMgTGF5YS5TcHJpdGV7XHJcbiAgICBwcml2YXRlIF9jb2xvcjpzdHJpbmc7Ly/lj6/op4boioLngrnpopzoibJcclxuICAgIHByaXZhdGUgX2dyYXBoaWNTaGlmdDpWZWMyOy8v6YeN5Y+g57uY5Zu+5YGP56e76YePXHJcbiAgICBwcml2YXRlIF9jZW50cmFsU2hpZnQ7Ly/kuK3lv4Pnu5jlm77lgY/np7vph49cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNlbnRyYWxTaGlmdENvbG9yZWQoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuZ3JhcGhpY3MuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLmdyYXBoaWNzLmRyYXdSZWN0KC10aGlzLndpZHRoLzIsLXRoaXMuaGVpZ2h0LzIsdGhpcy53aWR0aCx0aGlzLmhlaWdodCx0aGlzLl9jb2xvcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBjb2xvciBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldENvbG9yKGNvbG9yOnN0cmluZyk6dm9pZHtcclxuICAgICAgICB0aGlzLl9jb2xvciA9IGNvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5L+u5pS56aKc6ImyXHJcbiAgICAgKiBAcGFyYW0gY29sb3Ig55uu5qCH6aKc6ImyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjaGFuZ2VDb2xvcigpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5ncmFwaGljcy5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuZ3JhcGhpY3MuZHJhd1JlY3QodGhpcy5fZ3JhcGhpY1NoaWZ0LngsdGhpcy5fZ3JhcGhpY1NoaWZ0LnksdGhpcy53aWR0aC0yKnRoaXMuX2dyYXBoaWNTaGlmdC54LHRoaXMuaGVpZ2h0LTIqdGhpcy5fZ3JhcGhpY1NoaWZ0LnksdGhpcy5fY29sb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u55u45YWz5Y+C5pWwXHJcbiAgICAgKiBAcGFyYW0gcG9zWCDotbflp4t4XHJcbiAgICAgKiBAcGFyYW0gcG9zWSDotbflp4t5XHJcbiAgICAgKiBAcGFyYW0gd2lkdGgg5a695bqmXHJcbiAgICAgKiBAcGFyYW0gaGVpZ2h0IOmrmOW6plxyXG4gICAgICogQHBhcmFtIGNvbG9yIOminOiJslxyXG4gICAgICogQHBhcmFtIGdyYXBoaWNTaGlmdCDmo4vnm5jlgY/np7vlgLxcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFBhcmFtKHBvc1g6bnVtYmVyLCBwb3NZOm51bWJlciwgd2lkdGg6bnVtYmVyLCBoZWlnaHQ6bnVtYmVyLCBjb2xvcjpzdHJpbmcgPSB0aGlzLl9jb2xvciwgZ3JhcGhpY1NoaWZ0OlZlYzIgPSBuZXcgVmVjMigwLDApKTp2b2lke1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMueCA9IHBvc1g7XHJcbiAgICAgICAgdGhpcy55ID0gcG9zWTtcclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5zZXRDb2xvcihjb2xvcik7XHJcbiAgICAgICAgdGhpcy5fZ3JhcGhpY1NoaWZ0ID0gZ3JhcGhpY1NoaWZ0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5L+u5pS55Z2Q5qCH5ZKM5aSn5bCPXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2NhdGlvbkFuZFNpemUoKTp2b2lke1xyXG4gICAgICAgIHRoaXMucG9zKHRoaXMueCx0aGlzLnkpLnNpemUodGhpcy53aWR0aCx0aGlzLmhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDph43orr7lnZDmoIdcclxuICAgICAqIEBwYXJhbSBwb3NWZWMyIOebruagh+WdkOagh1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVsb2NhdGUocG9zVmVjMjpWZWMyKTp2b2lke1xyXG4gICAgICAgIHRoaXMueCA9IHBvc1ZlYzIueDtcclxuICAgICAgICB0aGlzLnkgPSBwb3NWZWMyLnk7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbkFuZFNpemUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmHjeiuvuWuvemrmFxyXG4gICAgICogQHBhcmFtIHNpemVWZWMyIOebruagh+WuvemrmFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVTaXplKHNpemVWZWMyOlZlYzIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHNpemVWZWMyLng7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBzaXplVmVjMi55O1xyXG4gICAgICAgIHRoaXMuY2hhbmdlQ29sb3IoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuW9k+WJjeWbvuW9oui1t+Wni+WdkOagh1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0UG9zKCk6VmVjMntcclxuICAgICAgICByZXR1cm4gbmV3IFZlYzIodGhpcy54LHRoaXMueSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57lt7Lnu5jljLrln5/lpKflsI9cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFNpemUoKTpWZWMye1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjMih0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogXHJcbiAgICAgKiDov5Tlm57lvZPliY3lt7Lnu5jljLrln5/popzoibJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldENvbG9yKCk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb2xvcjtcclxuICAgIH1cclxufSIsIi8vYXV0aG9yIE5hMkN1QzRPOFxyXG5cclxuaW1wb3J0IEFjdG9yUlUgZnJvbSBcIi4vU3ltYm9saXplZFJlbmRlclwiO1xyXG5pbXBvcnQgeyBLVlBhaXIgfSBmcm9tIFwiLi4vLi4vRG9kRGF0YVN0cnVjdHVyZVwiO1xyXG5pbXBvcnQgeyBNeVN5bWJvbCB9IGZyb20gXCIuLi8uLi8uLi9GaXgvRml4U3ltYm9sXCI7XHJcblxyXG5cclxuLy/lgqjlrZjmiYDmnInnu5jlm77oioLngrnlr7nosaFcclxuZXhwb3J0IGNsYXNzIEFjdG9yQm94e1xyXG4gICAgcHVibGljIHN0YXRpYyBCb3g6S1ZQYWlyPEFjdG9yUlU+ID0gbmV3IEtWUGFpcigpO1xyXG4gICAgcHVibGljIHN0YXRpYyBhZGQoYWN0OkFjdG9yUlUsc3ltYjpNeVN5bWJvbCk6dm9pZHtcclxuICAgICAgICBBY3RvckJveC5Cb3guZWRpdChzeW1iLmRhdGErXCJcIixhY3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0KHN5bTpudW1iZXIpOkFjdG9yUlV7XHJcbiAgICAgICAgcmV0dXJuIEFjdG9yQm94LkJveC5yZWFkKHN5bStcIlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxufSIsImltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi4vQ29tbW9uL0RvZE1hdGhcIjtcclxuaW1wb3J0IHsgTXlTeW1ib2wgfSBmcm9tIFwiLi4vRml4L0ZpeFN5bWJvbFwiO1xyXG4vLy8vLy9cclxuZXhwb3J0IGNsYXNzIEV2ZW50Q2VudHJle1xyXG4gICAgcHVibGljIHN0YXRpYyBpbnN0YW5jZTpFdmVudENlbnRyZTtcclxuICAgIHB1YmxpYyBzdGF0aWMgRVR5cGU6RVR5cGU7XHJcbiAgICBwdWJsaWMgc3RhdGljIGluaXQoKTp2b2lke1xyXG4gICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlID0gbmV3IEV2ZW50Q2VudHJlKCk7XHJcbiAgICAgICAgRXZlbnRDZW50cmUuRVR5cGUgPSBuZXcgRVR5cGUoKTtcclxuICAgICAgICBFdmVudENlbnRyZS5pbml0ID0gKCk9Pnt9O1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIF9jZW50cmU6TGF5YS5FdmVudERpc3BhdGNoZXIgPSBuZXcgTGF5YS5FdmVudERpc3BhdGNoZXIoKTtcclxuXHJcbiAgICBwdWJsaWMgb24odHlwZTpzdHJpbmcsIGNhbGxlcjphbnksIGxpc3RlbmVyOkZ1bmN0aW9uLCBhcmdzPzphbnlbXSk6dm9pZHtcclxuICAgICAgICB0aGlzLl9jZW50cmUub24odHlwZSxjYWxsZXIsbGlzdGVuZXIsYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGV2ZW50KHR5cGU6c3RyaW5nLCBhcmdzPzphbnkpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fY2VudHJlLmV2ZW50KHR5cGUsYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9mZih0eXBlOnN0cmluZywgY2FsbGVyOmFueSwgbGlzdGVuZXI6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuX2NlbnRyZS5vZmYodHlwZSwgY2FsbGVyLCBsaXN0ZW5lcik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKXt9XHJcbn1cclxuXHJcblxyXG5jbGFzcyBFVHlwZSB7XHJcbiAgICBwdWJsaWMgTEVBVkUocG9zOlZlYzIsIGlkZW50aXR5OnN0cmluZyk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBgJHtpZGVudGl0eX06Q09MTElTSU9OX0VWRU5UX0xFQVZFX0ZST00oJHtwb3MueH18JHtwb3MueX0pYDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBFTlRSRShwb3M6VmVjMiwgaWRlbnRpdHk6c3RyaW5nKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIGAke2lkZW50aXR5fTpDT0xMSVNJT05fRVZFTlRfRU5UUkVfVE8oJHtwb3MueH18JHtwb3MueX0pYDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG5ldyBhZGRlZCBmb3IgcGVyZm9ybWFuY2Ugc3RhcnRzIGhlcmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIFBFUkZPUk1BTkNFX1JFU0NBTEUoKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIFwiUkVTQ0FMRVwiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBQRVJGT1JNQU5DRV9URVhUX1NXSVRDSCgpOnN0cmluZ3tcclxuICAgICAgICByZXR1cm4gXCJURVhUX1NXSVRDSFwiO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBuZXcgYWRkZWQgZm9yIHBlcmZvcm1hbmNlIGVuZHMgaGVyZVxyXG4gICAgICovXHJcbn0iLCJleHBvcnQgaW50ZXJmYWNlIFN5bWJvbGl6ZWR7XHJcbiAgICBzeW1ib2w6TXlTeW1ib2w7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNeVN5bWJvbHtcclxuICAgIHByaXZhdGUgc3RhdGljIGNvdW50Om51bWJlciA9IDA7XHJcblxyXG4gICAgcHJpdmF0ZSBfZGF0YTpudW1iZXI7XHJcblxyXG4gICAgcHVibGljIGdldCBkYXRhKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IE15U3ltYm9sLmNvdW50O1xyXG4gICAgICAgIE15U3ltYm9sLmNvdW50ICs9IDE7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBGaXhUaW1lIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZnJhbWVSYXRlOiBudW1iZXIgPSA2MDtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZGVsdGFUaW1lOiBudW1iZXIgPSAxIC8gRml4VGltZS5mcmFtZVJhdGU7XHJcbiAgICBwdWJsaWMgc3RhdGljIGZyYW1lQ291bnQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgZWxhcHNlZFRpbWU6IG51bWJlcjtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5mcmFtZUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLmVsYXBzZWRUaW1lID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmZyYW1lQ291bnQrKztcclxuICAgICAgICB0aGlzLmVsYXBzZWRUaW1lICs9IHRoaXMuZGVsdGFUaW1lO1xyXG4gICAgfVxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXHJcbmltcG9ydCBHYW1lIGZyb20gXCIuL1NjZW5lU2NyaXB0L0dhbWVcIlxuaW1wb3J0IExvYWRpbmcgZnJvbSBcIi4vU2NlbmVTY3JpcHQvTG9hZGluZ1wiXHJcbi8qXHJcbiog5ri45oiP5Yid5aeL5YyW6YWN572uO1xyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ29uZmlne1xyXG4gICAgc3RhdGljIHdpZHRoOm51bWJlcj0xODAwO1xyXG4gICAgc3RhdGljIGhlaWdodDpudW1iZXI9OTAwO1xyXG4gICAgc3RhdGljIHNjYWxlTW9kZTpzdHJpbmc9XCJub3NjYWxlXCI7XHJcbiAgICBzdGF0aWMgc2NyZWVuTW9kZTpzdHJpbmc9XCJub25lXCI7XHJcbiAgICBzdGF0aWMgYWxpZ25WOnN0cmluZz1cInRvcFwiO1xyXG4gICAgc3RhdGljIGFsaWduSDpzdHJpbmc9XCJsZWZ0XCI7XHJcbiAgICBzdGF0aWMgc3RhcnRTY2VuZTphbnk9XCJMb2FkaW5nU2NlbmUuc2NlbmVcIjtcclxuICAgIHN0YXRpYyBzY2VuZVJvb3Q6c3RyaW5nPVwiXCI7XHJcbiAgICBzdGF0aWMgZGVidWc6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBzdGF0OmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgcGh5c2ljc0RlYnVnOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgZXhwb3J0U2NlbmVUb0pzb246Ym9vbGVhbj10cnVlO1xyXG4gICAgY29uc3RydWN0b3IoKXt9XHJcbiAgICBzdGF0aWMgaW5pdCgpe1xyXG4gICAgICAgIHZhciByZWc6IEZ1bmN0aW9uID0gTGF5YS5DbGFzc1V0aWxzLnJlZ0NsYXNzO1xyXG4gICAgICAgIHJlZyhcIlNjZW5lU2NyaXB0L0dhbWUudHNcIixHYW1lKTtcbiAgICAgICAgcmVnKFwiU2NlbmVTY3JpcHQvTG9hZGluZy50c1wiLExvYWRpbmcpO1xyXG4gICAgfVxyXG59XHJcbkdhbWVDb25maWcuaW5pdCgpOyIsImltcG9ydCB7IENvbGlFbWl0IH0gZnJvbSBcIi4vQWN0b3JNb2R1bGVzL0NvbGlNZXNzYWdlXCI7XHJcbmltcG9ydCB7IFByb2ZpbGUgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvUHJvZmlsZVwiO1xyXG5pbXBvcnQgeyBTeW1ib2xpemVkLCBNeVN5bWJvbCB9IGZyb20gXCIuLi8uLi9GaXgvRml4U3ltYm9sXCI7XHJcbmltcG9ydCB7IEJ1ZmYgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvQnVmZlwiO1xyXG5pbXBvcnQgeyBBdGtTdGF0ZU1hY2hpbmUgfSBmcm9tIFwiLi9BdHRhY2svQXRrQWJzdFwiO1xyXG5pbXBvcnQgeyBEYW1hZ2UgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvRGFtYWdlXCI7XHJcbmltcG9ydCB7IEFjdG9yVHlwZSB9IGZyb20gXCIuLi8uLi9Db21tb24vRG9kS2V5XCI7XHJcbmltcG9ydCBBY3RvclN0YXRlTWdyLCB7IEFjdG9yU3RhdGVJRCB9IGZyb20gXCIuL1N0YXRlL0FjdG9yU3RhdGVGc21cIjtcclxuaW1wb3J0IHsgQWN0b3JCdWZmTWdyIH0gZnJvbSBcIi4vQWN0b3JNb2R1bGVzL0FjdG9yQnVmZk1nclwiO1xyXG5pbXBvcnQgeyBUcmFuc2Zvcm0gfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvVHJhbnNmb3JtXCI7XHJcbmltcG9ydCB7IFVuaXRSZW5kZXIgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvVW5pdFJlbmRlclwiO1xyXG5pbXBvcnQgeyBBbmltYXRpb24gfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvQW5pbWF0aW9uXCI7XHJcbmltcG9ydCBSb3V0ZSBmcm9tIFwiLi9BY3RvclJvdXRlXCI7XHJcbmltcG9ydCB7IEFjdG9yU2tpbGwgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvQWN0b3JTa2lsbFwiO1xyXG5pbXBvcnQgeyBBY3RvckNvc3QgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvQWN0b3JDb3N0XCI7XHJcbmltcG9ydCB7IEJsb2NrZXIgfSBmcm9tIFwiLi9BdHRhY2svQmxvY2tlclwiO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbi8v5Z+65pys5Y6f5YiZ77ya5bCR55So57un5om/77yM5aSa55So57uE5ZCIXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjdG9yIGltcGxlbWVudHMgU3ltYm9saXplZHtcclxuICAgIHB1YmxpYyBzeW1ib2w6IE15U3ltYm9sOyAvL+WFqOWxgOWUr+S4gOeahOagh+ivhuaVsOWtl1xyXG4gICAgcHVibGljIHR5cGU6IEFjdG9yVHlwZSA9IEFjdG9yVHlwZS5Ob25lOyAvL+m7mOiupOi6q+S7veS4ukFjdG9yXHJcblxyXG4gICAgcHVibGljIHN0YXRlOiBBY3RvclN0YXRlTWdyOyAvL+eKtuaAgeacuiDnu5/nrbnnirbmgIHmm7TmlrBcclxuXHJcbiAgICBwdWJsaWMgcHJvZmlsZTpQcm9maWxlOy8v5Z+65pys5bGe5oCn5LiO6K6/6Zeu5pa55rOV5ZCI6ZuGXHJcblxyXG4gICAgcHVibGljIGF0azogQXRrU3RhdGVNYWNoaW5lOy8v5pS75Ye754q25oCB5py6XHJcbiAgICBwdWJsaWMgY29saUVtaXQ6Q29saUVtaXQ7Ly/norDmkp7kuovku7blj5HluIPogIVcclxuICAgIHB1YmxpYyBibG9ja2VyOkJsb2NrZXI7Ly/pmLvmjKHmqKHlnZdcclxuICAgIHB1YmxpYyBidWZmTWdyOkFjdG9yQnVmZk1ncjtcclxuICAgIHB1YmxpYyB0cmFuc2Zvcm06VHJhbnNmb3JtO1xyXG4gICAgcHVibGljIHJlbmRlcjpVbml0UmVuZGVyO1xyXG4gICAgcHVibGljIGFuaW1hdGlvbjpBbmltYXRpb247XHJcbiAgICBwdWJsaWMgcm91dGU6Um91dGU7Ly/ot6/lvoTlr7nosaFcclxuICAgIHB1YmxpYyBza2lsbDpBY3RvclNraWxsO1xyXG4gICAgcHVibGljIGNvc3Q6QWN0b3JDb3N0O1xyXG5cclxuICAgIC8vVE9ET++8muWOu+WMheS4gOS4que7hOS7tlxyXG4gICAgLy8gLyoqXHJcbiAgICAvLyAgKiDnm67moIfpgInmi6nlmahcclxuICAgIC8vICAqL1xyXG4gICAgLy8gcHVibGljIHNlZWtlcjogU2Vla2VyO1xyXG5cclxuICAgIC8vIC8qXHJcbiAgICAvLyAqIOW9k+WJjemUgeWumuebruagh1xyXG4gICAgLy8gKiAqL1xyXG4gICAgLy8gcHVibGljIGZvY3VzOiBBY3RvcjtcclxuXHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHR5cGU6IEFjdG9yVHlwZSwgcmVzOiBhbnkpIHtcclxuXHJcbiAgICAgICAgcmVzWyd4eHgnXSA9IDExNDUxNDE5MTk4MTA7XHJcblxyXG4gICAgICAgIHRoaXMuc3ltYm9sID0gbmV3IE15U3ltYm9sKCk7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gbmV3IEFjdG9yU3RhdGVNZ3IodGhpcyk7XHJcbiAgICAgICAgLy8gYWNjb3JkaW5nIHRvIGRpZmZlcmVudCB0eXBlLCBhZGQgZGlmZmVyZW50IGNvbXBvbmVudHMgdG8gdGhpcyBhY3Rvci4gXHJcblxyXG4gICAgICAgIHRoaXMucHJvZmlsZSA9IG5ldyBQcm9maWxlKHRoaXMsIHJlc1sneHh4J10pOyBcclxuICAgICAgICB0aGlzLmF0ayA9IG5ldyBBdGtTdGF0ZU1hY2hpbmUodGhpcywgcmVzWyd4eHgnXSk7XHJcbiAgICAgICAgdGhpcy5ibG9ja2VyID0gbmV3IEJsb2NrZXIodGhpcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5idWZmTWdyID0gbmV3IEFjdG9yQnVmZk1ncih0aGlzLCByZXNbJ3h4eCddKTtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybSA9IG5ldyBUcmFuc2Zvcm0odGhpcyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIgPSBuZXcgVW5pdFJlbmRlcih0aGlzKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IG5ldyBBbmltYXRpb24odGhpcywgcmVzWyd4eHgnXSk7XHJcbiBcclxuICAgICAgICBpZiAoQWN0b3JUeXBlLk1vbnN0ZXIgPT0gdGhpcy50eXBlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGUgPSBuZXcgUm91dGUodGhpcywgcmVzWyd4eHgnXSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoQWN0b3JUeXBlLk9wZXJhdG9yID09IHRoaXMudHlwZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNraWxsID0gbmV3IEFjdG9yU2tpbGwodGhpcywgcmVzWyd4eHgnXSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmNvc3QgPSBuZXcgQWN0b3JDb3N0KHRoaXMpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGF3YWtlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGUucnVuU3RhdGUoQWN0b3JTdGF0ZUlELlByZXBhcmVkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGUudXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIC8vIHJlc2V0IGNsZWFyIHJlc291cmNlIHJlbGF0ZWQgbW9kdWxlXHJcbiAgICAgICAgLy8gdGhpcy5yZW5kZXIucmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0T25NYXAoKTogdm9pZCB7XHJcbiAgICAgICAgLy9UT0RPXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFBvc2l0aW9uKCk6IHZvaWQge1xyXG4gICAgICAgIC8vVE9ET1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pS75Ye75LiA5Liq5oiW5aSa5LiqQWN0b3Lnm67moIdcclxuICAgICAqIDIwMjAvMy81IOaUu+WHu+mAu+i+keW3suS7juS6i+S7tuinpuWPkeaUueS4uuebtOaOpeiwg+eUqFxyXG4gICAgICog5Y+R6LW35ZKM5o6l5pS25pS75Ye755qE6YC76L6R5Z2H5bCB6KOF5ZyoQWN0b3LnsbvkuK1cclxuICAgICAqIEBwYXJhbSB2aWN0aW0gXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhdHRhY2soLi4udmljdGltOkFjdG9yW10pOnZvaWR7XHJcbiAgICAgICAgbGV0IGRtZzpEYW1hZ2UgPSB0aGlzLnByb2ZpbGUuZ2VuZXJhdGVEYW1hZ2UodGhpcyk7XHJcblxyXG4gICAgICAgIHZpY3RpbS5mb3JFYWNoKGVsZT0+e1xyXG4gICAgICAgICAgICB0aGlzLmJlQXR0YWNrZWQoZG1nLmNvcHkoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog6KKr5pS75Ye7XHJcbiAgICAgKiBAcGFyYW0gZGFtYWdlIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYmVBdHRhY2tlZChkYW1hZ2U6RGFtYWdlKTp2b2lke1xyXG4gICAgICAgIC8vQHRvZG9cclxuICAgICAgICAvL+WHj+WwkeeUn+WRveWAvFxyXG4gICAgICAgIC8v5Y+R5Ye65pS75Ye75LqL5Lu2XHJcbiAgICAgICAgLy/vvIjlj6/og73vvInlj5Hlh7rmrbvkuqHkuovku7ZcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDnp7vpmaRidWZmXHJcbiAgICAgKiBAcGFyYW0gYnVmZiBcclxuICAgICAqIOaOpeWPo+enu+mZpFxyXG4gICAgICovXHJcbiAgICAvLyBwdWJsaWMgcmVtb3ZlQnVmZihidWZmOkJ1ZmYpOnZvaWR7XHJcbiAgICAvLyAgICAgbGV0IGk6bnVtYmVyID0gdGhpcy5idWZmTGlzdC5pbmRleE9mKGJ1ZmYpO1xyXG4gICAgLy8gICAgIGlmIChpID09IC0xKSB7XHJcbiAgICAvLyAgICAgICAgIHJldHVybjtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgdGhpcy5idWZmTGlzdFtpXS5vbkRlc3Ryb3koKTtcclxuICAgIC8vICAgICB0aGlzLmJ1ZmZMaXN0LnNwbGljZShpLDEpO1xyXG4gICAgLy8gfVxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IEFjdG9yIGZyb20gXCIuL0FjdG9yXCI7XHJcbmltcG9ydCB7IEFjdG9yVHlwZSB9IGZyb20gXCIuLi8uLi9Db21tb24vRG9kS2V5XCI7XHJcbmltcG9ydCB7IEFjdG9yU3RhdGVJRCB9IGZyb20gXCIuL1N0YXRlL0FjdG9yU3RhdGVGc21cIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjdG9yTWdyIHtcclxuICAgIHB1YmxpYyBhY3RvcnM6IEFycmF5PEFjdG9yPjtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuYWN0b3JzID0gbmV3IEFycmF5PEFjdG9yPigpO1xyXG5cclxuICAgICAgICAvL3Rlc3RcclxuICAgICAgICB0aGlzLmNyZWF0ZUFjdG9yKEFjdG9yVHlwZS5Nb25zdGVyLCB7fSk7XHJcbiAgICAgICAgdGhpcy5hY3RvcnNbMF0uc3RhdGUucnVuU3RhdGUoQWN0b3JTdGF0ZUlELldhbGspO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0KHJlczogYW55KSB7XHJcbiAgICAgICAgdGhpcy5faW5pdEVuZW15KHJlcyk7XHJcbiAgICAgICAgdGhpcy5faW5pdE9wcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXdha2UoKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYWN0b3IgPSB0aGlzLmFjdG9yc1tpXTtcclxuICAgICAgICAgICAgYWN0b3IuYXdha2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYWN0b3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhY3RvciA9IHRoaXMuYWN0b3JzW2ldO1xyXG4gICAgICAgICAgICBhY3Rvci51cGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hY3RvcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGFjdG9yID0gdGhpcy5hY3RvcnNbaV07XHJcbiAgICAgICAgICAgIGFjdG9yLnJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjcmVhdGVBY3Rvcih0eXBlOiBBY3RvclR5cGUsIHJlczogYW55KTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGFjdG9yID0gbmV3IEFjdG9yKHR5cGUsIHJlcyk7XHJcbiAgICAgICAgdGhpcy5hY3RvcnMucHVzaChhY3Rvcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEFjdG9yQnlJRChJRDogbnVtYmVyKTogQWN0b3IgfCBudWxsIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYWN0b3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhY3RvciA9IHRoaXMuYWN0b3JzW2ldO1xyXG4gICAgICAgICAgICBpZiAoSUQgPT0gYWN0b3Iuc3ltYm9sLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhY3RvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9pbml0RW5lbXkocmVzOiBhbnkpIHtcclxuICAgICAgICAvL1RPRE8gdXNlIGxldmVsIHJlcyBkYXRhIGluaXQgZW5lbXkgYWN0b3JzXHJcbiAgICAgICAgLy9lZy5cclxuICAgICAgICAvL2xldCBlbmVteVJlcyA9IHJlc1sneHh4eHgnXTtcclxuICAgICAgICAvL2FjdG9yID0gdGhpcy5jcmVhdGVBY3RvcihBY3RvclR5cGUuRW5lbXkgLGVuZW15UmVzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfaW5pdE9wcnQoKSB7XHJcbiAgICAgICAgLy9UT0RPIHVzZSBwcmUgY2hvb3NlIG9wcnQgbGlzdCB0byBpbml0IHNlbGYgYWN0b3JzXHJcbiAgICAgICAgLy9sZXQgYXJyYXkgPSBSaG9kZXNHYW1lcy5JbnN0YW5jZS5nYW1lZGF0YS5jdXJyZW50Rm9ybWF0aW9uO1xyXG4gICAgICAgIC8vZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIC8vICAgbGV0IGlkID0gYXJyYXlbaV07XHJcbiAgICAgICAgLy8gICBsZXQgcmVzID0gRG9kUmVzb3VyY2VNZ3IuSW5zdGFuY2UuZ2V0Q3VycmVudE9wZXJhcm9yRGF0YUJ5SUQoaWQpO1xyXG4gICAgICAgIC8vICAgbGV0IGFjdG9yID0gdGhpcy5jcmVhdGVBY3RvcihBY3RvclR5cGUuT3BlcmF0b3IsIHJlcylcclxuICAgICAgICAvL31cclxuICAgIH1cclxufSIsImltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBY3RvckJ1ZmZNZ3J7XHJcbiAgICBjb25zdHJ1Y3RvcihrZWVwZXI6QWN0b3IsIHJlczphbnkpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9BY3RvclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFjdG9yQ29zdHtcclxuICAgIGNvbnN0cnVjdG9yKGtlZXBlcjpBY3Rvcil7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQWN0b3JTa2lsbHtcclxuICAgIGNvbnN0cnVjdG9yKGtlZXBlcjpBY3RvciwgcmVzOmFueSl7XHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9BY3RvclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFuaW1hdGlvbntcclxuICAgIGNvbnN0cnVjdG9yKGtlZXBlcjpBY3RvciwgcmVzOmFueSl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcblxyXG5leHBvcnQgZW51bSBEYW1hZ2VUeXBle1xyXG4gICAgUFlTSUNBTCxcclxuICAgIE1BR0lDQUwsXHJcbiAgICBUUlVFLFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRGFtYWdle1xyXG5cclxuICAgIHB1YmxpYyBzb3VyY2U6QWN0b3IgPSBudWxsOy8v5Lyk5a6z5p2l5rqQXHJcbiAgICBwdWJsaWMgdmFsdWU6bnVtYmVyID0gMDsvL+aUu+WHu+WKm1xyXG4gICAgcHVibGljIHR5cGU6RGFtYWdlVHlwZS8v5Lyk5a6z57G75Z6LXHJcbiAgICBwdWJsaWMgcHJpbWFyeTpib29sZWFuID0gdHJ1ZTsvL+aYr+WQpuS4uumdnumXtOaOpeS8pOWus++8iOmXtOaOpeS8pOWus+S4jeS8muinpuWPkeaYn+eGiuOAgeW5tOeahOWPjeeUsuS5i+exu+eahOaViOaenO+8iVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNvdXJjZTpBY3RvciwgdmFsdWU6bnVtYmVyLCB0eXBlOkRhbWFnZVR5cGUpe1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29weSgpOkRhbWFnZXtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IERhbWFnZSh0aGlzLnNvdXJjZSwgdGhpcy52YWx1ZSwgdGhpcy50eXBlKTtcclxuICAgICAgICByZXN1bHQudHlwZSA9IHRoaXMudHlwZTtcclxuICAgICAgICByZXN1bHQucHJpbWFyeSA9IHRoaXMucHJpbWFyeTtcclxuICAgICAgICByZXN1bHQuc291cmNlID0gdGhpcy5zb3VyY2U7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IERhbWFnZSwgRGFtYWdlVHlwZSB9IGZyb20gXCIuL0RhbWFnZVwiO1xyXG5pbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcbmltcG9ydCB7IEFjdG9yVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vRG9kS2V5XCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIFByb2ZpbGXnsbvmmK/lgqjlrZjljZXkvY3ln7rmnKzmlbDmja7vvIjlpoLmlLvlh7vlipvjgIHpmLLlvqHlipvnrYnvvInnmoTnsbtcclxuICog5a6D6L+Y5o+Q5L6b5LiA5YiH55So5LqO6I635Y+WQWN0b3Lkv6Hmga/nmoTmjqXlj6PvvIjlpoLmmK/lkKbog73lpJ/ooYzliqjjgIHmmK/lkKbog73lpJ/pmLvmjKHvvIlcclxuICovXHJcbmV4cG9ydCBjbGFzcyBQcm9maWxlIHtcclxuICAgIHB1YmxpYyBuYW1lOiBTdHJpbmcgPSBcIkNoYW5kbGVyIEJpbmdcIjtcclxuICAgIHB1YmxpYyByZWFkb25seSBrZWVwZXI6QWN0b3I7XHJcblxyXG4gICAgcHJpdmF0ZSBfcHJlcFRpbWU6IG51bWJlciA9IDEwMDsvL+WJjeaRh+aXtumXtFxyXG4gICAgcHJpdmF0ZSBfYWZ0ZXJUaW1lOiBudW1iZXIgPSAxMDA7Ly/lkI7mkYfml7bpl7RcclxuICAgIHByaXZhdGUgX2JyZWFrdGhyb3VnaDogbnVtYmVyID0gMTsvL+egtOmZpOmYu+aMoeiDveWKm1xyXG4gICAgcHVibGljIGludmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlOy8v5piv5ZCm6ZqQ5b2iXHJcbiAgICBwdWJsaWMgYmxvY2tlZDogYm9vbGVhbiA9IGZhbHNlOy8v5bey6KKr6Zi75oyhXHJcbiAgICBwdWJsaWMgYmxvY2tlcjogQWN0b3I7Ly/pmLvmjKHogIVcclxuXHJcbiAgICAvKipcclxuICAgICAqIOS8pOWus+iuoeeul+ebuOWFs+eahOS/ruaUueWSjOiuv+mXruaOpeWPo1xyXG4gICAgICog5L2c6ICF77ya6JGxXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhdHRhY2tQb3dlcjogbnVtYmVyID0gMTAwOy8v5pS75Ye75YqbXHJcbiAgICBwdWJsaWMgYXRrU2NhbGU6bnVtYmVyID0gMTsvL+aUu+WHu+WAjeeOh1xyXG4gICAgcHVibGljIGF0a0J1ZmY6bnVtYmVyID0gMTsvL+aUu+WHu+eZvuWIhuavlOaPkOWNh1xyXG4gICAgcHVibGljIGFybW91cjpudW1iZXIgPSA1MDsvL+eJqeeQhumYsuW+oVxyXG4gICAgcHVibGljIG1hZ2ljQXJtb3VyOm51bWJlciA9IDA7Ly/ms5XmnK/mipfmgKdcclxuICAgIHB1YmxpYyBkbWdUeXBlOkRhbWFnZVR5cGUgPSBEYW1hZ2VUeXBlLlBZU0lDQUw7Ly/kvKTlrrPnsbvlnotcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3Ioa2VlcGVyOkFjdG9yLCByZXM6YW55KXtcclxuICAgICAgICB0aGlzLmtlZXBlciA9IGtlZXBlcjtcclxuICAgICAgICAvL3RvZG86IGFib3V0IHJlc1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Lyg5YWl5LiA5LiqQWN0b3LvvIzov5Tlm57kvKTlrrPlr7nosaFcclxuICAgICAqIEBwYXJhbSBzb3VyY2UgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZW5lcmF0ZURhbWFnZShzb3VyY2U6QWN0b3IpOkRhbWFnZXtcclxuICAgICAgICByZXR1cm4gbmV3IERhbWFnZShzb3VyY2UsIHRoaXMuYXR0YWNrUG93ZXIqdGhpcy5hdGtTY2FsZSp0aGlzLmF0a0J1ZmYsIHRoaXMuZG1nVHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhpdFBvaW50OiBudW1iZXIgPSAxMDsvL+eUn+WRveWAvFxyXG4gICAgcHVibGljIG1heEhpdFBvaW50OiBudW1iZXIgPSAxMDsvL+acgOmrmOeUn+WRveWAvFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYnkgWFdWXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoYXRlTGV2ZWw6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgYXR0YWNrUmFuZ2VSYWRpdXM6IG51bWJlcjtcclxuXHJcblxyXG4gICAgcHVibGljIGdldCBwcmVwVGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wcmVwVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGFmdGVyVGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hZnRlclRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBicmVha3Rocm91Z2goKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYnJlYWt0aHJvdWdoO1xyXG4gICAgfVxyXG5cclxuICAgXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmmK/lkKbpnIDopoHlnKhwcm9maWxl5Lit5bCG5LiN5ZCM55qE5pWw5YC85YiG57G777yfXHJcbiAqXHJcbiAqLyIsImltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuaW1wb3J0IHsgRG9kTWF0aCwgVmVjMiB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vRG9kTWF0aFwiO1xyXG5cclxuLyoqXHJcbiAqIOWvueS4gOS4quWNleS9jeeahOWHoOS9leeKtuaAgeeahOaPj+i/sFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRyYW5zZm9ybXtcclxuICAgIHB1YmxpYyBwb3M6UG9zID0gbmV3IFBvcygpO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihrZWVwZXI6QWN0b3Ipe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBQb3N7XHJcbiAgICAvLyBwdWJsaWMgYXV0b1N3aXRjaFRhcmdldDpib29sZWFuID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBkYXRhOlZlYzIgPSBuZXcgVmVjMigwLDApOy8v5L2N572uXHJcblxyXG5cclxuICAgIFxyXG4gICAgcHVibGljIHRhcmdldDpWZWMyID0gbmV3IFZlYzIoMCwwKTsvL+ebruagh1xyXG4gICAgcHVibGljIHNwZWVkOm51bWJlciA9IDA7Ly/pgJ/luqZcclxuICAgIHB1YmxpYyBhcHByb2FjaDpudW1iZXIgPSAwOy8v6YC86L+R5qyh5pWwXHJcbiAgICBwdWJsaWMgdmVjU3BlZWQ6VmVjMiA9IG5ldyBWZWMyKDAsMCk7Ly/liIbph4/pgJ/luqZcclxuICAgIHByaXZhdGUgX2Fycml2ZWQ6Ym9vbGVhbiA9IHRydWU7Ly/lt7LliLDovr7nm67nmoTlnLAo5q+P5qyh6K6+572u5paw55uu55qE5Zyw5pe26K6+5Li6ZmFsc2UpXHJcbiAgICBwdWJsaWMgZ2V0IGFycml2ZWQoKTpib29sZWFue3JldHVybiB0aGlzLl9hcnJpdmVkO30vL+iOt+WPluaYr+WQpuW3suWIsOi+vueahOS/oeaBr1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u55uu55qE5Zyw5bm26YeN6K6+5YiG6YeP6YCf5bqmXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0VGFyZ2V0KHRhcmdldDpWZWMyKTp2b2lke1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgIHRoaXMuYWltKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7nm7Tnur/pgJ/luqblubbph43orr7liIbph4/pgJ/luqZcclxuICAgICAqIEBwYXJhbSBzcGVlZCBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFNwZWVkKHNwZWVkOm51bWJlcik6dm9pZHtcclxuICAgICAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XHJcbiAgICAgICAgdGhpcy5haW0oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuoeeul+enu+WKqOWPguaVsCzlubblsIZfYXJyaXZlZOiuvuS4umZhbHNlXHJcbiAgICAgKiDlsIbkvJrph43orr7liIbph4/pgJ/luqblkozpgLzov5HmrKHmlbBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhaW0oKTp2b2lke1xyXG4gICAgICAgIHRoaXMudmVjU3BlZWQgPSBEb2RNYXRoLm1vdmVUb0NvbXBvbmVudCh0aGlzLmRhdGEsdGhpcy50YXJnZXQsdGhpcy5zcGVlZCk7XHJcbiAgICAgICAgdGhpcy5hcHByb2FjaCA9IHRoaXMuZGF0YS5kaXN0YW5jZVRvKHRoaXMudGFyZ2V0KSAvIHRoaXMuc3BlZWQ7XHJcbiAgICAgICAgdGhpcy5fYXJyaXZlZCA9IGZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ZCR55uu5qCH54K556e75Yqo5LiA5qyhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtb3ZlKCk6dm9pZHtcclxuICAgICAgICB0aGlzLmFwcHJvYWNoIC09IDE7XHJcbiAgICAgICAgaWYgKHRoaXMuYXBwcm9hY2ggPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEueCA9IHRoaXMudGFyZ2V0Lng7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS55ID0gdGhpcy50YXJnZXQueTtcclxuICAgICAgICAgICAgdGhpcy5fYXJyaXZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kYXRhLnggPSB0aGlzLmRhdGEueCArIHRoaXMudmVjU3BlZWQueDtcclxuICAgICAgICB0aGlzLmRhdGEueSA9IHRoaXMuZGF0YS55ICsgdGhpcy52ZWNTcGVlZC55O1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9BY3RvclwiO1xyXG5pbXBvcnQgUGVyZm9ybWFuY2VDZW50cmUgZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9HcmFwaGljcy9QZXJmb3JtYW5jZV9Nb2R1bGUvUGVyZm9ybWFuY2VDZW50cmVcIjtcclxuaW1wb3J0IHsgVmVjMiB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vRG9kTWF0aFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFVuaXRSZW5kZXJ7XHJcblxyXG4gICAgcHJpdmF0ZSBfa2VlcGVyOkFjdG9yO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihrZWVwZXI6QWN0b3Ipe1xyXG4gICAgICAgIHRoaXMuX2tlZXBlciA9IGtlZXBlcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVwbG95KCk6dm9pZHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkRlcGxveVwiKTtcclxuICAgICAgICBQZXJmb3JtYW5jZUNlbnRyZS5pbnN0YW5jZS5kaXNwbGF5QWN0b3IodGhpcy5fa2VlcGVyLCB0aGlzLl9rZWVwZXIudHJhbnNmb3JtLnBvcy5kYXRhLCBuZXcgVmVjMig1MCw1MCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtb3ZlKHZlYzpWZWMyKTp2b2lke1xyXG4gICAgICAgIFBlcmZvcm1hbmNlQ2VudHJlLmluc3RhbmNlLm1vdmUodGhpcy5fa2VlcGVyLCB2ZWMpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEFjdG9yIGZyb20gXCIuL0FjdG9yXCI7XHJcbmltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL0RvZE1hdGhcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlIHtcclxuXHJcbiAgICBwcml2YXRlIF9wYXRoOlZlYzJbXSA9IFZlYzIubGlzdEZyb21MaXN0KFtcclxuICAgICAgICBbNTAwLDUwMF0sXHJcbiAgICAgICAgWzAsMF0sXHJcbiAgICAgICAgWzUwMCwwXSxcclxuICAgICAgICBbMCw1MDBdXHJcbiAgICBdKTtcclxuICAgIHByaXZhdGUgX3RhckNvdW50Om51bWJlciA9IC0xOy8v55uu5YmN5oyH5ZCR55qE55uu5qCHXHJcblxyXG4gICAgY29uc3RydWN0b3Ioa2VlcGVyOkFjdG9yLCByZXM6YW55KXtcclxuICAgICAgICAvL3RvZG86IOagueaNrnJlc+iOt+WPluW6lOi1sOeahOi3r+e6v1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjdXJyZW50VGFyZ2V0KCk6VmVjMntcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGF0aFt0aGlzLl90YXJDb3VudF07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5leHQoKTpib29sZWFue1xyXG4gICAgICAgIGlmICh0aGlzLl90YXJDb3VudCA8IHRoaXMuX3BhdGgubGVuZ3RoIC0gMSkgey8v6L+Y5pyJ5LiL5LiA6aG5XHJcbiAgICAgICAgICAgIHRoaXMuX3RhckNvdW50ICs9IDE7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7Ly/msqHmnInkuIvkuIDpoblcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7S1ZQYWlyfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0RvZERhdGFTdHJ1Y3R1cmVcIjtcclxuaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9BY3RvclwiO1xyXG5pbXBvcnQge0V2ZW50Q2VudHJlfSBmcm9tIFwiLi4vLi4vLi4vRXZlbnQvRXZlbnRDZW50cmVcIjtcclxuaW1wb3J0IHsgU2Vla2VyIH0gZnJvbSBcIi4vQWN0b3JTZWVrZXJcIjtcclxuXHJcblxyXG4vKipcclxuICogYnkgWFdWXHJcbiAqIFxyXG4gKiDokbEg5L+u5pS55LqOIDMvMThcclxuICogICAgICDlsIZTZWVrZXLmjKrlhaXmlLvlh7vnirbmgIHmnLrlhoXvvIzkuI3nlLFBY3RvcuaMgeaciVxyXG4gKiAgICAgIOS4jeWQjOeahOaUu+WHu+iMg+WbtOeUsVNlZWtlcuabv+aNouadpeWunueOsFxyXG4gKiAgICAgIOS4jeWQjOeahOaUu+WHu+mAu+i+ke+8iOiMg+WbtC/ljZXkvZPvvInnlLHmm7/mjaLnirbmgIHmnLrlhoXnmoTnirbmgIHlrp7kvovlrp7njrBcclxuICogICAgICBBdGtTdGF0ZU1hY2hpbmXotJ/otKPlr7nlpJbmj5DkvpvmiYDmnInkv67mlLkv6K6/6Zeu5o6l5Y+jXHJcbiAqICAgICAg5LuN6ZyA5a+55q2k6L+b6KGM6L+b5LiA5q2l6KeE5YiS77yI5Y2V5L2TL+WkmuS9ky/nvqTkvZPmlLvlh7vpgLvovpHmmK/ku4XnlLHkuIDkuKrlj4LmlbDlrp7njrDvvIzov5jmmK/nlLHlpJrmgIHlrp7njrDvvIlcclxuICogICAgICAvL3RvZG865pe26Ze057Sv5Yqg6YC76L6R5pS55Y+YXHJcbiAqIFxyXG4gKi9cclxuXHJcbmVudW0gU3RhdGVUeXBlIHtcclxuICAgIFdBSVQgPSBcIldBSVRcIixcclxuICAgIFBSRVBBUkUgPSBcIlBSRVBBUkVcIixcclxuICAgIEFGVEVSX0FUSyA9IFwiQUZURVJfQVRLXCJcclxufVxyXG5cclxuaW50ZXJmYWNlIFN0YXRlIHtcclxuICAgIGV4ZWN1dGUobWFjaGluZTogQXRrU3RhdGVNYWNoaW5lKTogdm9pZFxyXG5cclxuICAgIHJlc2V0KCk6IHZvaWRcclxufVxyXG5cclxuYWJzdHJhY3QgY2xhc3MgQmFzZVN0YXRlIGltcGxlbWVudHMgU3RhdGUge1xyXG4gICAgcHJvdGVjdGVkIHRpbWU6IG51bWJlciA9IDA7Ly/ml7bpl7TntK/liqDpgLvovpHmlLnlj5hcclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKSB7XHJcbiAgICAgICAgdGhpcy50aW1lID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBhYnN0cmFjdCBleGVjdXRlKG1hY2hpbmU6IEF0a1N0YXRlTWFjaGluZSk6IHZvaWQ7XHJcblxyXG59XHJcblxyXG5jbGFzcyBXYWl0IGV4dGVuZHMgQmFzZVN0YXRlIHtcclxuXHJcbiAgICBwdWJsaWMgZXhlY3V0ZShtYWNoaW5lOiBBdGtTdGF0ZU1hY2hpbmUpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBmb2N1cyA9IG1hY2hpbmUuc2Vla2VyLmdldEZvY3VzKCk7XHJcbiAgICAgICAgaWYgKGZvY3VzICE9PSBudWxsKSB7Ly/lpoLmnpzog73lpJ/mib7liLDmlYzkurpcclxuICAgICAgICAgICAgbWFjaGluZS5jaGFuZ2VTdGF0ZShTdGF0ZVR5cGUuUFJFUEFSRSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRm91bmQgRW5lbXksIFN3aXRjaCB0byBwcmVwYXJlIHBoYXNlIEBcIiArIHRoaXMudGltZSk7XHJcbiAgICAgICAgfSBlbHNlIHsvL+WmguaenOaJvuS4jeWIsOaVjOS6ulxyXG4gICAgICAgICAgICB0aGlzLnRpbWUgKz0gMTsvL3RvZG86IOaXtumXtOe0r+WKoOmAu+i+keaUueWPmFxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WmguaenHNlZWtlcuS4reWtmOWcqOaVjOS6uu+8jHJlc2V0IFByZXBhcmXlubbot7PovazliLBQcmVwYXJl6Zi25q61XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5jbGFzcyBQcmVwYXJlIGV4dGVuZHMgQmFzZVN0YXRlIHtcclxuXHJcblxyXG4gICAgcHVibGljIGV4ZWN1dGUobWFjaGluZTogQXRrU3RhdGVNYWNoaW5lKTogdm9pZCB7XHJcbiAgICAgICAgLypcclxuICAgICAgICDnlLHkuo7mlLvlh7vnirbmgIHmnLrnmoTop4TliJLov5vooYzov4fkuIDmrKHkv67mlLnvvIzmraTlpITmmoLml7blhYjmj5DkvpvkvKrku6PnoIFcclxuICAgICAgICDmraTnsbvnm67liY3kuLrljZXkvZPmlLvlh7vnmoTpgLvovpFcclxuICAgICAgICAqL1xyXG5cclxuICAgICAgIGNvbnN0IGZvY3VzID0gbWFjaGluZS5zZWVrZXIuZ2V0Rm9jdXMoKTtcclxuICAgICAgICBpZiAobWFjaGluZS5zZWVrZXIuZm9jdXNDaGFuZ2VkKCkpIHtcclxuICAgICAgICAgICAgaWYgKGZvY3VzICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvL3RvZG86IOmHjeaWsOi/m+WFpeWJjeaRh+mYtuautVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy90b2RvOiDov5vlhaXlh4blpIfpmLbmrrVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgIHRvZG86IOWJjeaRh+aXtumXtOe0r+WKoOOAguebruWJjeW3sue7j+e7j+i/h+eahOWJjeaRh+aXtumXtOWtmOWCqOWcqHByb2ZpbGXkuK0/XHJcbiAgICAgICAg5aaC5p6c5YmN5pGH5pe26Ze05bey5ruh77yM5YiZ6L+b6KGM5pS75Ye75LiU6L+b5YWl5ZCO5pGH54q25oCBXHJcbiAgICAgICAgKi9cclxuICAgICAgICBcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgLy8gLy/liKTmlq3mmK/lkKbpnIDopoHph43mlrDpgInmi6nnm67moIflubbph43nva7liY3mkYdcclxuICAgICAgICAvLyBsZXQgc2Vla2VyID0gbWFjaGluZS5rZWVwZXIuc2Vla2VyO1xyXG4gICAgICAgIC8vIGxldCBhY3RvciA9IG1hY2hpbmUua2VlcGVyO1xyXG4gICAgICAgIC8vIGlmIChtYWNoaW5lLmtlZXBlci5mb2N1cyAmJiBzZWVrZXIuZ2V0Q2FwdHVyZUxpc3QoKS5pbmRleE9mKG1hY2hpbmUua2VlcGVyLmZvY3VzKSA8IDApIHsvL+W9k+WJjeebruagh+S4jeWcqOaUu+WHu+iMg+WbtOWGhVxyXG4gICAgICAgIC8vICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICAgICAgLy8gICAgIG1hY2hpbmUua2VlcGVyLmZvY3VzID0gc2Vla2VyLmdldEZvY3VzKCk7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAvLyAvL+WIpOaWreW9k+WJjeaYr+WQpuWtmOWcqOebruagh1xyXG4gICAgICAgIC8vIGlmIChtYWNoaW5lLmtlZXBlci5mb2N1cykge1xyXG4gICAgICAgIC8vICAgICAvL+iuoeaVsCsxXHJcbiAgICAgICAgLy8gICAgIHRoaXMudGltZSArPSAxO1xyXG4gICAgICAgIC8vICAgICBpZiAodGhpcy50aW1lID49IGFjdG9yLnByb2ZpbGUucHJlcFRpbWUpIHsgIC8v5YmN5pGH57uT5p2f6Kem5Y+R5pS75Ye7XHJcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcIkF0dGFjayAmIHRvIEFmdGVyIFBoYXNlIEBcIiArIHRoaXMudGltZSk7Ly/ov5vooYzmlLvlh7tcclxuICAgICAgICAvLyAgICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLmV2ZW50KEV2ZW50Q2VudHJlLkVUeXBlLkFUVEFDSywgW2FjdG9yLCBtYWNoaW5lLmtlZXBlci5mb2N1c10pO1xyXG4gICAgICAgIC8vICAgICAgICAgLy/ov5vlhaXlkI7mkYfnirbmgIFcclxuICAgICAgICAvLyAgICAgICAgIG1hY2hpbmUuY2hhbmdlU3RhdGUoU3RhdGVUeXBlLkFGVEVSX0FUSyk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgIC8vICAgICAvL+ayoeacieebruagh++8jOWbnuWIsOW+heacuumYtuautVxyXG4gICAgICAgIC8vICAgICBtYWNoaW5lLmNoYW5nZVN0YXRlKFN0YXRlVHlwZS5XQUlUKTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEFmdGVyQXRrIGV4dGVuZHMgQmFzZVN0YXRlIHtcclxuXHJcbiAgICBwdWJsaWMgZXhlY3V0ZShtYWNoaW5lOiBBdGtTdGF0ZU1hY2hpbmUpOiB2b2lkIHtcclxuICAgICAgICAvLyBsZXQgc2Vla2VyID0gbWFjaGluZS5rZWVwZXIuc2Vla2VyO1xyXG4gICAgICAgIC8vIHRoaXMudGltZSArPSAxOy8v5Y2V57qv6K6h5Liq5pWw77yM5ruh5LqG5bCx6L+U5Zued2FpdOeKtuaAgVxyXG4gICAgICAgIC8vIGlmICh0aGlzLnRpbWUgPj0gbWFjaGluZS5rZWVwZXIucHJvZmlsZS5hZnRlclRpbWUpIHtcclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCJXYWl0IEFmdGVyIEFUSyBFbmQsIHRvIFdhaXQgQFwiICsgdGhpcy50aW1lKTtcclxuICAgICAgICAvLyAgICAgLy/ph43mlrDojrflj5bnm67moIfvvIzmnInnm67moIfliJnov5vooYzkuIvkuIDmrKHmlLvlh7vvvIzml6Dnm67moIflm57liLDlvoXmnLrpmLbmrrVcclxuICAgICAgICAvLyAgICAgbWFjaGluZS5rZWVwZXIuZm9jdXMgPSBzZWVrZXIuZ2V0Rm9jdXMoKTtcclxuICAgICAgICAvLyAgICAgbWFjaGluZS5jaGFuZ2VTdGF0ZShtYWNoaW5lLmtlZXBlci5mb2N1cyA/IFN0YXRlVHlwZS5QUkVQQVJFIDogU3RhdGVUeXBlLldBSVQpO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIOeKtuaAgeacuuexu1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEF0a1N0YXRlTWFjaGluZSB7XHJcbiAgICAvKlxyXG4gICAgKiDmiYDlsZ5BY3RvclxyXG4gICAgKiAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGtlZXBlcjogQWN0b3I7XHJcbiAgICAvKipcclxuICAgICAqIOW9k+WJjeeKtuaAgVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGN1clN0YXRlOiBTdGF0ZTtcclxuICAgIC8qKlxyXG4gICAgICog5Y+v5L2/55So55qE54q25oCB5YiX6KGoXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGVMaXN0OiBLVlBhaXI8U3RhdGU+ID0gbmV3IEtWUGFpcjxTdGF0ZT4oKTtcclxuXHJcbiAgICBwdWJsaWMgc2Vla2VyOiBTZWVrZXI7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIGtlZXBlciDnirbmgIHmnLrmiYDmnInogIVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioa2VlcGVyOiBBY3RvciwgcmVzOmFueSkge1xyXG4gICAgICAgIHRoaXMua2VlcGVyID0ga2VlcGVyO1xyXG4gICAgICAgIHRoaXMuY3VyU3RhdGUgPSBuZXcgV2FpdCgpO1xyXG4gICAgICAgIHRoaXMuc3RhdGVMaXN0LmVkaXQoU3RhdGVUeXBlLldBSVQsIHRoaXMuY3VyU3RhdGUpO1xyXG4gICAgICAgIHRoaXMuc3RhdGVMaXN0LmVkaXQoU3RhdGVUeXBlLlBSRVBBUkUsIG5ldyBQcmVwYXJlKCkpO1xyXG4gICAgICAgIHRoaXMuc3RhdGVMaXN0LmVkaXQoU3RhdGVUeXBlLkFGVEVSX0FUSywgbmV3IEFmdGVyQXRrKCkpO1xyXG4gICAgICAgIC8vdG9kbzogYWJvdXQgcmVzXHJcblxyXG4gICAgICAgIHRoaXMuc2Vla2VyID0gbnVsbDsvL+WIneWni+WMllNlZWtlclxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yi35paw5b2T5YmN54q25oCB77yM5q+P5bin6LCD55SoXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMua2VlcGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyU3RhdGUuZXhlY3V0ZSh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmlLnlj5jlvZPliY3nirbmgIHvvIzmlrDnirbmgIHkvJrph43nva7kuLrliJ3lp4vmgIFcclxuICAgICAqIEBwYXJhbSBzdGF0ZVR5cGUg5paw55qE54q25oCB57G75Z6LXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjaGFuZ2VTdGF0ZShzdGF0ZVR5cGU6IFN0YXRlVHlwZSkge1xyXG4gICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuc3RhdGVMaXN0LnJlYWQoc3RhdGVUeXBlKTtcclxuICAgICAgICBzdGF0ZS5yZXNldCgpO1xyXG4gICAgICAgIHRoaXMuY3VyU3RhdGUgPSBzdGF0ZTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiIsImltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCbG9ja2Vye1xyXG4gICAgY29uc3RydWN0b3Ioa2VlcGVyOkFjdG9yKXtcclxuICAgICAgICBcclxuICAgIH1cclxufSIsImltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjdG9yU3RhdGVCYXNlIHtcclxuICAgIHByb3RlY3RlZCBfYWN0b3I6IEFjdG9yO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFjdG9yOiBBY3Rvcikge1xyXG4gICAgICAgIHRoaXMuX2FjdG9yID0gYWN0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudGVyKCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbGVhdmUoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQWN0b3JTdGF0ZUJhc2UgZnJvbSBcIi4vQWN0b3JTdGF0ZUJhc2VcIjtcclxuaW1wb3J0IERvZExvZyBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0RvZExvZ1wiO1xyXG5pbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcbmltcG9ydCB7IEFjdG9yU3RhdGVXYWxrIH0gZnJvbSBcIi4vQWN0b3JTdGF0ZVdhbGtcIjtcclxuaW1wb3J0IHsgQWN0b3JTdGF0ZVByZXBhcmVkIH0gZnJvbSBcIi4vQWN0b3JTdGF0ZVByZXBhcmVkXCI7XHJcblxyXG5leHBvcnQgZW51bSBBY3RvclN0YXRlSUQge1xyXG4gICAgTm9uZSxcclxuICAgIFByZXBhcmVkLCAgICAgLy/lvoXmnLogKOacquWHuuWKqC/mnKrpg6jnvbIpICBcclxuICAgIEJvcm4sICAgLy/lh7rnlJ/liqjnlLsg5LiN5Y+v5pS75Ye7IOS4jeWPr+iiq+aUu+WHu1xyXG4gICAgV2FsaywgICAvL+enu+WKqCDmlYzkurrnlKhcclxuICAgIFN0dW5uZWQsICAgIC8v5pmV55ypIOWGsOWGuyBldGNcclxuICAgIEZpZ2h0LCAgLy/mma7mlLvnirbmgIEg5bmy5ZGY5bi45oCBIOaVjOS6uuiiq+mYu+aMoeWQjlxyXG4gICAgRGVhdGgsICAvL+atu+S6oeWKqOeUuyDkuI3lj6/mlLvlh7sg5LiN5Y+v6KKr5pS75Ye7XHJcbiAgICBFc2NhcGUsIC8v5pWM5Lq66YCD6ISxXHJcbiAgICBDb3VudFxyXG59XHJcblxyXG4vKlxyXG4gKiDop5LoibLnirbmgIHmnLog566h55CG6KeS6Imy5omA5aSE6Zi25q61IOagueaNruS4jeWQjOmYtuauteWGs+WumuS4jeWQjOeahOe7hOS7tueKtuaAgVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWN0b3JTdGF0ZU1nciB7XHJcbiAgICBwcml2YXRlIF9zdGF0ZXM6IEFjdG9yU3RhdGVCYXNlW10gPSBbXTtcclxuICAgIHByaXZhdGUgX2N1cnJlbnRTdGF0ZTogQWN0b3JTdGF0ZUJhc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYWN0b3I6IEFjdG9yKSB7XHJcbiAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9zdGF0ZXNbQWN0b3JTdGF0ZUlELldhbGtdID0gbmV3IEFjdG9yU3RhdGVXYWxrKGFjdG9yKTtcclxuICAgICAgICB0aGlzLl9zdGF0ZXNbQWN0b3JTdGF0ZUlELlByZXBhcmVkXSA9IG5ldyBBY3RvclN0YXRlUHJlcGFyZWQoYWN0b3IpO1xyXG4gICAgICAgIC8vVE9ET1xyXG4gICAgICAgIC8v5Y+C54Wn5ri45oiP5aSn54q25oCB5py6XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBpbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucnVuU3RhdGUoQWN0b3JTdGF0ZUlELk5vbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBydW5TdGF0ZShzdGF0ZUlEOiBBY3RvclN0YXRlSUQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoQWN0b3JTdGF0ZUlELkNvdW50IDw9IHN0YXRlSUQgfHwgc3RhdGVJRCA8PSBBY3RvclN0YXRlSUQuTm9uZSkge1xyXG4gICAgICAgICAgICBEb2RMb2cuZXJyb3IoYEdhbWVTdGF0ZU1nci5ydW5TdGF0ZTogSW52YWxpZCBzdGF0ZUlEIFske3N0YXRlSUR9XS4gYCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChudWxsICE9IHRoaXMuX2N1cnJlbnRTdGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUubGVhdmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZSA9IHRoaXMuX3N0YXRlc1tzdGF0ZUlEXTtcclxuICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUuZW50ZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChudWxsICE9IHRoaXMuX2N1cnJlbnRTdGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUudXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAobnVsbCAhPSB0aGlzLl9jdXJyZW50U3RhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlLmxlYXZlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3N0YXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLl9zdGF0ZXNbaV07XHJcbiAgICAgICAgICAgIHN0YXRlLnJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEFjdG9yU3RhdGVCYXNlIGZyb20gXCIuL0FjdG9yU3RhdGVCYXNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQWN0b3JTdGF0ZVByZXBhcmVkIGV4dGVuZHMgQWN0b3JTdGF0ZUJhc2V7XHJcbiAgICBcclxufSIsImltcG9ydCBBY3RvclN0YXRlQmFzZSBmcm9tIFwiLi9BY3RvclN0YXRlQmFzZVwiO1xyXG5pbXBvcnQgeyBBY3RvclR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0RvZEtleVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFjdG9yU3RhdGVXYWxrIGV4dGVuZHMgQWN0b3JTdGF0ZUJhc2V7XHJcbiAgICBcclxuICAgIHB1YmxpYyBlbnRlcigpOnZvaWR7XHJcbiAgICAgICAgLy/kuI3lupTor6XlnKjov5nkuKrnirbmgIHph4zvvIzlupTor6XlnKhib3Ju6YeM6L+b6KGMZGVwbG95XHJcbiAgICAgICAgdGhpcy5fYWN0b3IucmVuZGVyLmRlcGxveSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6dm9pZHtcclxuICAgICAgICBsZXQgYWN0b3IgPSB0aGlzLl9hY3RvcjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2FjdG9yLnRyYW5zZm9ybS5wb3MuYXJyaXZlZCkgey8v5bey5Yiw6L6+55uu55qE5ZywXHJcbiAgICAgICAgICAgIGlmIChhY3Rvci5yb3V0ZS5uZXh0KCkpIHsvL+WtmOWcqOS4i+S4gOS4quebruagh+iKgueCuVxyXG4gICAgICAgICAgICAgICAgYWN0b3IudHJhbnNmb3JtLnBvcy5zZXRUYXJnZXQoYWN0b3Iucm91dGUuY3VycmVudFRhcmdldCgpKTsvL+Wwhuebruagh+abv+aNouS4uuS4i+S4gOS4quebruagh+iKgueCuVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy90b2RvOiDmlYzkurrlt7LliLDovr7nu4jngrlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYWN0b3IudHJhbnNmb3JtLnBvcy5tb3ZlKCk7Ly/np7vliqhcclxuICAgICAgICBhY3Rvci5jb2xpRW1pdC5wb3NCeVZlYyhhY3Rvci50cmFuc2Zvcm0ucG9zLmRhdGEpOy8v56e75Yqo56Kw5pKe566xXHJcbiAgICAgICAgYWN0b3IuY29saUVtaXQuZXZlbnQoYWN0b3IsIGFjdG9yLnR5cGUpOy8v5Y+R5biD56Kw5pKe5LqL5Lu2XHJcbiAgICAgICAgYWN0b3IucmVuZGVyLm1vdmUoYWN0b3IudHJhbnNmb3JtLnBvcy5kYXRhKTsvL+enu+WKqOWPr+inhuWvueixoVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3IvQWN0b3JcIjtcclxuaW1wb3J0IHtNeVN5bWJvbH0gZnJvbSBcIi4uLy4uL0ZpeC9GaXhTeW1ib2xcIjtcclxuaW1wb3J0IHtDaXJjbGVDb2xsaXNpb25SYW5nZX0gZnJvbSBcIi4vQ29sbGlzaW9uUmFuZ2VcIjtcclxuXHJcblxyXG4vKipcclxuICog56Kw5pKe5aSE55CG5Zmo77yM6K+l57G757u05oqk5LiA5LiqTWFw77yMTWFw6K6w5b2V5omA5pyJ6ZyA6KaB6L+b6KGM56Kw5pKe5aSE55CG55qE56Kw5pKe5Zmo77yMTWFw55So56Kw5pKe5Zmo55qE5ZSv5LiA5qCH6K+G5L2c5Li66ZSu5Lul6YG/5YWN6YeN5aSN6K6w5b2V44CCXHJcbiAqXHJcbiAqIOivpeexu+aPkOS+m+S4gOS4qnJlY2FsY3VsYXRl5pa55rOV55So5LqO6YeN5paw6K6h566X56Kw5pKe5oOF5Ya177yM5a+55LqOTWFw5Lit55qE5q+P5Liq5aSE55CG5a+56LGh77yM6K+l5pa55rOV6K6h566X5YW25LiOTWFw5Lit55qE5omA5pyJ5YW25LuW5a+56LGhXHJcbiAqIOeahOmHjeWPoOaDheWGte+8jOW5tuWwhui/meS6m+mHjeWPoOeahOWFtuS7luWvueixoeS7peWIl+ihqOeahOW9ouW8j+S8oOmAkue7meivpeWkhOeQhuWvueixoeOAglxyXG4gKlxyXG4gKiBieSBYV1ZcclxuICovXHJcbmV4cG9ydCBjbGFzcyBBY3RvckNvbGxpc2lvblByb2Nlc3NvciB7XHJcblxyXG4gICAgcHJpdmF0ZSBjb2xsaWRlck1hcDogeyBba2V5OiBudW1iZXJdOiBBY3RvckNvbGxpZGVyIH0gPSB7fTtcclxuXHJcbiAgICBwdWJsaWMgcmVnaXN0ZXJDb2xsaWRlcihjb2xsaWRlcjogQWN0b3JDb2xsaWRlcikge1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXJNYXBbY29sbGlkZXIuc3ltYm9sLmRhdGFdID0gY29sbGlkZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVucmVnaXN0ZXJDb2xsaWRlcihjb2xsaWRlcjogQWN0b3JDb2xsaWRlcikge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmNvbGxpZGVyTWFwW2NvbGxpZGVyLnN5bWJvbC5kYXRhXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5jb2xsaWRlck1hcCkge1xyXG4gICAgICAgICAgICBsZXQgdGFyZ2V0Q29sbGlkZXIgPSB0aGlzLmNvbGxpZGVyTWFwW2ldO1xyXG4gICAgICAgICAgICBsZXQgY29sbGlkaW5nTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqIGluIHRoaXMuY29sbGlkZXJNYXApIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb2xsaWRlciA9IHRoaXMuY29sbGlkZXJNYXBbal07XHJcbiAgICAgICAgICAgICAgICBpZiAoY29sbGlkZXIgPT0gdGFyZ2V0Q29sbGlkZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0YXJnZXRDb2xsaWRlci5zaG91bGRDb2xsaWRlV2l0aChjb2xsaWRlcikgJiYgdGFyZ2V0Q29sbGlkZXIuZ2V0Q29sbGlzaW9uUmFuZ2UoKS5pc0NvaW5jaWRlV2l0aFJhbmdlKGNvbGxpZGVyLmdldENvbGxpc2lvblJhbmdlKCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGlkaW5nTGlzdC5wdXNoKGNvbGxpZGVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0YXJnZXRDb2xsaWRlci5vbkNvbGxpZGluZ0xpc3RSZWZyZXNoKGNvbGxpZGluZ0xpc3QpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWN0b3JDb2xsaWRlciB7XHJcbiAgICAvL+WUr+S4gOagh+ivhlxyXG4gICAgcHVibGljIHJlYWRvbmx5IHN5bWJvbDogTXlTeW1ib2wgPSBuZXcgTXlTeW1ib2woKTtcclxuXHJcbiAgICAvL+iOt+WPlueisOaSnuiMg+WbtFxyXG4gICAgYWJzdHJhY3QgZ2V0Q29sbGlzaW9uUmFuZ2UoKTogQ2lyY2xlQ29sbGlzaW9uUmFuZ2UgO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YeN6K6+56Kw5pKe6IyD5Zu0XHJcbiAgICAgKiBAcGFyYW0gcmFuZ2Ug5paw55qE56Kw5pKe6IyD5Zu0XHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IHNldENvbGxpc2lvblJhbmdlKHJhbmdlOiBDaXJjbGVDb2xsaXNpb25SYW5nZSk7XHJcblxyXG4gICAgLy/ojrflj5bnorDmkp7lmajnmoTmiYDmnInogIVcclxuICAgIGFic3RyYWN0IGdldEFjdG9yKCk6IEFjdG9yO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog56Kw5pKe5YiX6KGo6ZyA6KaB5Yi35pawXHJcbiAgICAgKiBAcGFyYW0gY29sbGlkaW5nTGlzdCDmlrDnmoTnorDmkp7liJfooahcclxuICAgICAqICovXHJcbiAgICBhYnN0cmFjdCBvbkNvbGxpZGluZ0xpc3RSZWZyZXNoKGNvbGxpZGluZ0xpc3Q6IEFjdG9yQ29sbGlkZXJbXSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKblupTor6XkuI7mjIflrprnorDmkp7lmajlj5HnlJ/norDmkp5cclxuICAgICAqIEBwYXJhbSBjb2xsaWRlciDlj6bkuIDkuKrnorDmkp7lmahcclxuICAgICAqICovXHJcbiAgICBhYnN0cmFjdCBzaG91bGRDb2xsaWRlV2l0aChjb2xsaWRlcjogQWN0b3JDb2xsaWRlcik6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvZPliY3norDmkp7liJfooahcclxuICAgICAqICovXHJcbiAgICBhYnN0cmFjdCBnZXRDb2xsaWRpbmdMaXN0KCk6IEFjdG9yQ29sbGlkZXJbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIt+aWsOeisOaSnuiMg+WbtO+8jOS9v+WFtui3n+maj+aJgOacieiAheenu+WKqFxyXG4gICAgICogKi9cclxuICAgIGFic3RyYWN0IHJlZnJlc2hDb2xsaXNpb25SYW5nZUZvbGxvd0FjdG9yKCk7XHJcblxyXG59XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU2ltcGxlQWN0b3JDb2xsaWRlciBleHRlbmRzIEFjdG9yQ29sbGlkZXIge1xyXG5cclxuICAgIHByaXZhdGUgY29sbGlkaW5nTGlzdDogQWN0b3JDb2xsaWRlcltdID0gW107XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGFjdG9yOiBBY3RvcjtcclxuICAgIHByaXZhdGUgcmFuZ2U6IENpcmNsZUNvbGxpc2lvblJhbmdlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFjdG9yOiBBY3RvciwgcmFuZ2U6IENpcmNsZUNvbGxpc2lvblJhbmdlKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmFjdG9yID0gYWN0b3I7XHJcbiAgICAgICAgdGhpcy5yYW5nZSA9IHJhbmdlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXRDb2xsaXNpb25SYW5nZSgpOiBDaXJjbGVDb2xsaXNpb25SYW5nZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmFuZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q29sbGlzaW9uUmFuZ2UocmFuZ2U6IENpcmNsZUNvbGxpc2lvblJhbmdlKSB7XHJcbiAgICAgICAgdGhpcy5yYW5nZSA9IHJhbmdlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFjdG9yKCk6IEFjdG9yIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hY3RvcjtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDb2xsaWRpbmdMaXN0KCk6IEFjdG9yQ29sbGlkZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sbGlkaW5nTGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBvbkNvbGxpZGluZ0xpc3RSZWZyZXNoKGNvbGxpZGluZ0xpc3Q6IEFjdG9yQ29sbGlkZXJbXSkge1xyXG4gICAgICAgIHRoaXMuY29sbGlkaW5nTGlzdCA9IGNvbGxpZGluZ0xpc3Q7XHJcbiAgICB9XHJcblxyXG5cclxufSIsImltcG9ydCBHYW1lTWFwIGZyb20gXCIuL0dhbWVMZXZlbFwiO1xyXG5pbXBvcnQgeyBBY3RvckNvbGxpc2lvblByb2Nlc3NvciB9IGZyb20gXCIuL0NvbGxpc2lvbi9BY3RvckNvbGxpc2lvblByb2Nlc3NvclwiO1xyXG5pbXBvcnQgR2FtZUxldmVsIGZyb20gXCIuL0dhbWVMZXZlbFwiO1xyXG5pbXBvcnQgRG9kUmVzb3VyY2VNZ3IgZnJvbSBcIi4uL1Jlc291cmNlcy9Eb2RSZXNvdXJjZU1nclwiO1xyXG5pbXBvcnQgQWN0b3JNZ3IgZnJvbSBcIi4vQWN0b3IvQWN0b3JNZ3JcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVCYXR0bGUge1xyXG4gICAgcHVibGljIGxldmVsOiBHYW1lTGV2ZWw7XHJcbiAgICBwdWJsaWMgbWFwOiBHYW1lTWFwO1xyXG4gICAgcHVibGljIGFjdG9yTWdyOiBBY3Rvck1ncjtcclxuXHJcbiAgICBwdWJsaWMgY29sbGlzaW9uOiBBY3RvckNvbGxpc2lvblByb2Nlc3NvcjtcclxuXHJcbiAgICBwcml2YXRlIF9sZXZlbFByZXBhcmVkOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubGV2ZWwgPSBuZXcgR2FtZUxldmVsKCk7XHJcbiAgICAgICAgdGhpcy5tYXAgPSBuZXcgR2FtZU1hcCgpO1xyXG4gICAgICAgIHRoaXMuYWN0b3JNZ3IgPSBuZXcgQWN0b3JNZ3IoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb2xsaXNpb24gPSBuZXcgQWN0b3JDb2xsaXNpb25Qcm9jZXNzb3IoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcHJlcGFyZUxldmVsKCk6IHZvaWQge1xyXG4gICAgICAgIC8vVE9ETyBpbml0IGxldmVsIGluZm9ybWF0aW9uXHJcbiAgICAgICAgbGV0IHJlcyA9IERvZFJlc291cmNlTWdyLkluc3RhbmNlLmdldEN1cnJlbnRMZXZlbFJlcygpO1xyXG4gICAgICAgIHRoaXMubGV2ZWwuaW5pdChyZXNbJ2xldmVsJ10pOyAvL2p1c3Qgc2FtcGxlXHJcbiAgICAgICAgdGhpcy5tYXAuaW5pdChyZXNbJ21hcCddKTtcclxuICAgICAgICB0aGlzLmFjdG9yTWdyLmluaXQocmVzWydtYXAnXSk7XHJcblxyXG4gICAgICAgIC8vQU5EIERPTlQgRk9SR0VUIFJFU0VUIExBU1QgQkFUVExFIERBVEEgUkVNQUlOUy4gXHJcbiAgICAgICAgLy90aGlzLmNvbGxpc2lvbi5yZXNldCgpO1xyXG5cclxuICAgICAgICB0aGlzLl9sZXZlbFByZXBhcmVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNMZXZlbFByZXByYXJlZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGV2ZWxQcmVwYXJlZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgLy9UT0RPXHJcbiAgICAgICAgLy9DTEVBUiBMQVNUIEJBVFRMRSBSRVNPVVJDRVxyXG4gICAgICAgIHRoaXMuX2xldmVsUHJlcGFyZWQgPSBmYWxzZTtcclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVCYXR0bGVDb25zdCB7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHN0YW5kYXJkQ29zdEluY3JlYXNlUmF0aW86IG51bWJlciA9IDE7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IG1heENvc3ROdW06IG51bWJlciA9IDk5O1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBpbml0Q29zdE51bTogbnVtYmVyID0gNjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgbGlmZVBvaW50OiBudW1iZXIgPSAzO1xyXG59IiwiaW1wb3J0IHsgQnVmZiB9IGZyb20gXCIuL0FjdG9yL0FjdG9yTW9kdWxlcy9CdWZmXCI7XHJcbmltcG9ydCB7IEV2ZW50Q2VudHJlIH0gZnJvbSBcIi4uL0V2ZW50L0V2ZW50Q2VudHJlXCI7XHJcbmltcG9ydCBGaXhUaW1lIGZyb20gXCIuLi9GaXgvRml4VGltZVwiO1xyXG5pbXBvcnQgRG9kUmVzb3VyY2VNZ3IgZnJvbSBcIi4uL1Jlc291cmNlcy9Eb2RSZXNvdXJjZU1nclwiO1xyXG5pbXBvcnQgR2FtZUJhdHRsZUNvbnN0IGZyb20gXCIuL0dhbWVCYXR0bGVDb25zdFwiO1xyXG4vKipcclxuICog5qih5Z2X6K+05piOOiDmuLjmiI/miJjmlpflnLDlm77mqKHlnZcgIFxyXG4gKiDotJ/otKPlhoXlrrk6IOWcsOWbvuWxnuaAp+iuvue9ru+8jOWFqOWxgGJ1ZmbnrqHnkIYgIFxyXG4gKiDotJ/otKPkuro6IOmTtuWNjiAgXHJcbiAqIOaXtumXtDogMjAyMOW5tDPmnIgz5pelMTI6NDU6NDEgIFxyXG4gKi9cclxuXHJcbi8vS1I6IOWFqOWxgOeUseWFs+WNoeaooeWdl+euoeeQhiBA6ZO25Y2OXHJcbi8v6L+Z6YeM5Y+v5Lul5YyF5ZCr5YWo5bGA55qE6LCD5pW05YC8L+eUn+WRveWAvC/mtqjotLlcclxuLy/lhajmuLjmiI/moIflh4blgLzkvb/nlKjluLjph4/lrprkuYnlnKhCYXR0bGVDb25zdOexu+S4rSDnpLrkvovlj6/ku6XnnIvkuIvmlrlcclxuLy/lj6bvvJrnp4HmnInmiJDlkZjlkb3lkI3or7flnKjliY3pnaLliqDkuIvliJLnur8g5aOw5piO55qE5oiQ5ZGY6K+35Zyo5p6E6YCg5Ye95pWw5Lit5YWo6YOo5Yid5aeL5YyW5LiA5Liq5YC877yM6Ziy5q2idW5kZWZpbmVkKOmHjuaMh+mSiCnnmoTmg4XlhrXlj5HnlJ9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVMZXZlbHtcclxuICAgIHByaXZhdGUgX2luaXRpYWxDb3N0Om51bWJlcjtcclxuICAgIHByaXZhdGUgX2N1cnJlbnRDb3N0Om51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIF9saWZlUG9pbnQ6bnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgX3RpbWVMaW5lOm51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIF9nbG9iYWxCdWZmTGlzdDogQnVmZltdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5faW5pdGlhbENvc3QgPSAwO1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRDb3N0ID0gMDtcclxuICAgICAgICB0aGlzLl9saWZlUG9pbnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX3RpbWVMaW5lID0gMDtcclxuICAgICAgICB0aGlzLl9nbG9iYWxCdWZmTGlzdCA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0KHJlczogYW55KTogdm9pZCB7XHJcbiAgICAgICAgLy9mb3IgZXhhbXBsZVxyXG4gICAgICAgIHRoaXMucmVzZXQoKTtcclxuICAgICAgICB0aGlzLl9pbml0aWFsQ29zdCA9IHRoaXMuX2N1cnJlbnRDb3N0ID0gcmVzWydpbml0Q29zdCddIHx8IEdhbWVCYXR0bGVDb25zdC5pbml0Q29zdE51bTtcclxuICAgICAgICB0aGlzLl9saWZlUG9pbnQgPSByZXNbJ2xpZmUnXSB8fCBHYW1lQmF0dGxlQ29uc3QubGlmZVBvaW50O1xyXG4gICAgICAgIHRoaXMuX3RpbWVMaW5lID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6dm9pZHtcclxuICAgICAgICB0aGlzLmdldEdsb2JhbEJ1ZmZMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlVGltZSgpOyBcclxuICAgICAgICB0aGlzLl91cGRhdGVDb3N0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEdsb2JhbEJ1ZmZMaXN0KCk6QnVmZltde1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9nbG9iYWxCdWZmTGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hhbmdlQ29zdCgpOnZvaWR7XHJcbiAgICAgICAgLy90b2RvLi4uLlxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3VwZGF0ZVRpbWUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fdGltZUxpbmUgKz0gRml4VGltZS5kZWx0YVRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfdXBkYXRlQ29zdCgpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2dsb2JhbEJ1ZmZMaXN0LnNwbGljZSgwLCB0aGlzLl9nbG9iYWxCdWZmTGlzdC5sZW5ndGgpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBEb2RMb2cgZnJvbSBcIi4uL0NvbW1vbi9Eb2RMb2dcIjtcclxuaW1wb3J0IEdhbWVTdGF0ZU1nciBmcm9tIFwiLi9TdGF0ZS9HYW1lU3RhdGVNZ3JcIjtcclxuaW1wb3J0IEdhbWVCYXR0bGUgZnJvbSBcIi4vR2FtZUJhdHRsZVwiO1xyXG5pbXBvcnQgR2FtZUxvYmJ5IGZyb20gXCIuL0xvYmJ5L0dhbWVMb2JieVwiO1xyXG5cclxuLyoqXHJcbiAqIOi/meaYr+a4uOaIj+acrOS9k1xyXG4gKiDor7TkuIDkuptSaG9kZXNfR2FtZeaWh+S7tuWkueS4i+eahOazqOmHiuinhOWIme+8jOaWueS+v+S7peWQjmN0cmwrZlxyXG4gKlxyXG4gKiAxLi8vQHRvZG8g5qCH5rOo6ZyA6KaB5a6M5ZaE55qE6YOo5YiGXHJcbiAqXHJcbiAqIDIuLy9AdG9maXgg5qCH5rOo5bey55+l5pyJ6Zeu6aKY55qE6YOo5YiGXHJcbiAqXHJcbiAqIDMuLy9AdGVzdCDmoIfms6jku4XkvpvmtYvor5Xkvb/nlKjnmoTpg6jliIZcclxuICpcclxuICogMy4vL0ByZWRjYWxsIOagh+azqOiwg+eUqOa4suafk+aooeWdl+eahOmDqOWIhlxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmhvZGVzR2FtZSB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFJob2Rlc0dhbWU7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBJbnN0YW5jZSgpOiBSaG9kZXNHYW1lIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2UgfHwgKHRoaXMuX2luc3RhbmNlID0gbmV3IHRoaXMoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRlTWdyOiBHYW1lU3RhdGVNZ3I7XHJcbiAgICBwdWJsaWMgYmF0dGxlOiBHYW1lQmF0dGxlO1xyXG4gICAgcHVibGljIGxvYmJ5OiBHYW1lTG9iYnk7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuYmF0dGxlID0gbmV3IEdhbWVCYXR0bGUoKTtcclxuICAgICAgICB0aGlzLnN0YXRlTWdyID0gbmV3IEdhbWVTdGF0ZU1ncih0aGlzLmJhdHRsZSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZU1nci5pbml0KCk7XHJcbiAgICAgICAgRG9kTG9nLmRlYnVnKGBSaG9kZXNHYW1lOiBpbml0aWFsaXphdGlvbiBjb21wbGV0ZS4gYClcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGVNZ3IudXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG5cclxufSIsImltcG9ydCBHYW1lQmF0dGxlIGZyb20gXCIuLi9HYW1lQmF0dGxlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU3RhdGVCYXNlIHtcclxuICAgIHByb3RlY3RlZCBfYmF0dGxlOiBHYW1lQmF0dGxlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGJhdHRsZTogR2FtZUJhdHRsZSkge1xyXG4gICAgICAgIHRoaXMuX2JhdHRsZSA9IGJhdHRsZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW50ZXIoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsZWF2ZSgpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxufSIsImltcG9ydCBHYW1lU3RhdGVCYXNlIGZyb20gXCIuL0dhbWVTdGF0ZUJhc2VcIjtcclxuaW1wb3J0IFJob2Rlc0dhbWUgZnJvbSBcIi4uL1Job2Rlc0dhbWVcIjtcclxuaW1wb3J0IEdhbWVCYXR0bGUgZnJvbSBcIi4uL0dhbWVCYXR0bGVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTdGF0ZUJhdHRsZSBleHRlbmRzIEdhbWVTdGF0ZUJhc2V7XHJcbiAgICBjb25zdHJ1Y3RvcihiYXR0bGU6R2FtZUJhdHRsZSkge1xyXG4gICAgICAgIHN1cGVyKGJhdHRsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudGVyKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmVudGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxlYXZlKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmxlYXZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLnJlc2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci51cGRhdGUoKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9iYXR0bGUubWFwLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEdhbWVTdGF0ZUJhc2UgZnJvbSBcIi4vR2FtZVN0YXRlQmFzZVwiO1xyXG5pbXBvcnQgUmhvZGVzR2FtZSBmcm9tIFwiLi4vUmhvZGVzR2FtZVwiO1xyXG5pbXBvcnQgRG9kUmVzb3VyY2VNZ3IgZnJvbSBcIi4uLy4uL1Jlc291cmNlcy9Eb2RSZXNvdXJjZU1nclwiO1xyXG5pbXBvcnQgeyBHYW1lU3RhdGVJRCB9IGZyb20gXCIuL0dhbWVTdGF0ZU1nclwiO1xyXG5pbXBvcnQgRG9kTG9nIGZyb20gXCIuLi8uLi9Db21tb24vRG9kTG9nXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU3RhdGVHYW1lbG9hZCBleHRlbmRzIEdhbWVTdGF0ZUJhc2V7XHJcbiAgICBjb25zdHJ1Y3RvcihiYXR0bGUpIHtcclxuICAgICAgICBzdXBlcihiYXR0bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnRlcigpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5lbnRlcigpO1xyXG4gICAgICAgIC8vVE9ETyBTSE9XIExPQURJTkcgU0NSRUVOXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxlYXZlKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmxlYXZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLnJlc2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci51cGRhdGUoKTtcclxuICAgICAgICBpZiAodHJ1ZSA9PSBEb2RSZXNvdXJjZU1nci5JbnN0YW5jZS5pbml0ZWQoKSkge1xyXG4gICAgICAgICAgICAvL1dFIERPIE5PVCBIQVZFIExPQkJZIE1PRFVMRSBJTiBUSElTIFZFUlNJT05cclxuICAgICAgICAgICAgLy9KVVNUIFNFVCBMRVZFTCBJRCBIRVJFXHJcbiAgICAgICAgICAgIC8vVE8gREVMXHJcbiAgICAgICAgICAgIERvZFJlc291cmNlTWdyLkluc3RhbmNlLnNldExldmVsSUQoMSk7XHJcbiAgICAgICAgICAgIFJob2Rlc0dhbWUuSW5zdGFuY2Uuc3RhdGVNZ3IucnVuU3RhdGUoR2FtZVN0YXRlSUQuTGV2ZWxsb2FkKTtcclxuICAgICAgICAgICAgRG9kTG9nLmRlYnVnKGBHYW1lU3RhdGVHYW1lbG9hZC51cGRhdGU6IFJlc291cmNlcyBpbml0IGNvbXBsZXRlLCBzZXQgbGV2ZWwgaW50byAxLiBgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgR2FtZVN0YXRlQmFzZSBmcm9tIFwiLi9HYW1lU3RhdGVCYXNlXCI7XHJcbmltcG9ydCBSaG9kZXNHYW1lIGZyb20gXCIuLi9SaG9kZXNHYW1lXCI7XHJcbmltcG9ydCB7IEdhbWVTdGF0ZUlEIH0gZnJvbSBcIi4vR2FtZVN0YXRlTWdyXCI7XHJcbmltcG9ydCBEb2RSZXNvdXJjZU1nciBmcm9tIFwiLi4vLi4vUmVzb3VyY2VzL0RvZFJlc291cmNlTWdyXCI7XHJcbmltcG9ydCBEb2RMb2cgZnJvbSBcIi4uLy4uL0NvbW1vbi9Eb2RMb2dcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTdGF0ZUxldmVsTG9hZCBleHRlbmRzIEdhbWVTdGF0ZUJhc2V7XHJcbiAgICBjb25zdHJ1Y3RvcihiYXR0bGUpIHtcclxuICAgICAgICBzdXBlcihiYXR0bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnRlcigpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5lbnRlcigpO1xyXG4gICAgICAgIHRoaXMuX2JhdHRsZS5wcmVwYXJlTGV2ZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbGVhdmUoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIubGVhdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIucmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLnVwZGF0ZSgpO1xyXG4gICAgICAgIGlmICh0cnVlID09IERvZFJlc291cmNlTWdyLkluc3RhbmNlLmlzTGV2ZWxQcmVwYXJlZCgpKSB7XHJcbiAgICAgICAgICAgIGlmICh0cnVlID09IHRoaXMuX2JhdHRsZS5pc0xldmVsUHJlcHJhcmVkKCkpIHtcclxuICAgICAgICAgICAgICAgIFJob2Rlc0dhbWUuSW5zdGFuY2Uuc3RhdGVNZ3IucnVuU3RhdGUoR2FtZVN0YXRlSUQuQmF0dGxlKTtcclxuICAgICAgICAgICAgICAgIERvZExvZy5kZWJ1ZyhgR2FtZVN0YXRlTGV2ZWxsb2FkLnVwZGF0ZTogbGV2ZWwgWyR7RG9kUmVzb3VyY2VNZ3IuSW5zdGFuY2UuZ2V0TGV2ZWxJRCgpfV0gaXMgcHJlcGFyZWQuIGApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEdhbWVTdGF0ZUJhc2UgZnJvbSBcIi4vR2FtZVN0YXRlQmFzZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVN0YXRlTG9iYnkgZXh0ZW5kcyBHYW1lU3RhdGVCYXNle1xyXG4gICAgY29uc3RydWN0b3IoYmF0dGxlKSB7XHJcbiAgICAgICAgc3VwZXIoYmF0dGxlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW50ZXIoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuZW50ZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbGVhdmUoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIubGVhdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIucmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEdhbWVTdGF0ZUJhc2UgZnJvbSBcIi4vR2FtZVN0YXRlQmFzZVwiO1xyXG5pbXBvcnQgR2FtZVN0YXRlQmF0dGxlIGZyb20gXCIuL0dhbWVTdGF0ZUJhdHRsZVwiO1xyXG5pbXBvcnQgRG9kTG9nIGZyb20gXCIuLi8uLi9Db21tb24vRG9kTG9nXCI7XHJcbmltcG9ydCBHYW1lU3RhdGVMZXZlbExvYWQgZnJvbSBcIi4vR2FtZVN0YXRlTGV2ZWxsb2FkXCI7XHJcbmltcG9ydCBHYW1lU3RhdGVHYW1lbG9hZCBmcm9tIFwiLi9HYW1lU3RhdGVHYW1lbG9hZFwiO1xyXG5pbXBvcnQgR2FtZVN0YXRlTG9iYnkgZnJvbSBcIi4vR2FtZVN0YXRlTG9iYnlcIjtcclxuaW1wb3J0IFJob2Rlc0dhbWUgZnJvbSBcIi4uL1Job2Rlc0dhbWVcIjtcclxuaW1wb3J0IEdhbWVCYXR0bGUgZnJvbSBcIi4uL0dhbWVCYXR0bGVcIjtcclxuXHJcbmV4cG9ydCBlbnVtIEdhbWVTdGF0ZUlEIHtcclxuICAgIE5vbmUsXHJcbiAgICBHYW1lbG9hZCxcclxuICAgIExvYmJ5LFxyXG4gICAgTGV2ZWxsb2FkLFxyXG4gICAgQmF0dGxlLFxyXG4gICAgQ291bnRcclxufVxyXG5cclxuLypcclxuICog5aSn54q25oCB5py6IOeuoeeQhua4uOaIj+aJgOWkhOmYtuautVxyXG4gKiBAVE9ETyBHQU1FTE9BRCBMT0JCWSBMRVZFTExPQUQgQkFUVExFXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU3RhdGVNZ3Ige1xyXG4gICAgcHJpdmF0ZSBfc3RhdGVzOiBHYW1lU3RhdGVCYXNlW107XHJcbiAgICBwcml2YXRlIF9jdXJyZW50U3RhdGU6IEdhbWVTdGF0ZUJhc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYmF0dGxlOkdhbWVCYXR0bGUpIHtcclxuICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUgPSBudWxsO1xyXG4gICAgICAgIC8vIGxldCBiYXR0bGUgPSBSaG9kZXNHYW1lLkluc3RhbmNlLmJhdHRsZTtcclxuICAgIFxyXG4gICAgICAgIHRoaXMuX3N0YXRlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3N0YXRlcy5wdXNoKG51bGwpO1xyXG4gICAgICAgIHRoaXMuX3N0YXRlcy5wdXNoKG5ldyBHYW1lU3RhdGVHYW1lbG9hZChiYXR0bGUpKTtcclxuICAgICAgICB0aGlzLl9zdGF0ZXMucHVzaChuZXcgR2FtZVN0YXRlTG9iYnkoYmF0dGxlKSk7XHJcbiAgICAgICAgdGhpcy5fc3RhdGVzLnB1c2gobmV3IEdhbWVTdGF0ZUxldmVsTG9hZChiYXR0bGUpKTtcclxuICAgICAgICB0aGlzLl9zdGF0ZXMucHVzaChuZXcgR2FtZVN0YXRlQmF0dGxlKGJhdHRsZSkpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgaW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJ1blN0YXRlKEdhbWVTdGF0ZUlELkdhbWVsb2FkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcnVuU3RhdGUoc3RhdGVJRDogR2FtZVN0YXRlSUQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoR2FtZVN0YXRlSUQuQ291bnQgPD0gc3RhdGVJRCB8fCBzdGF0ZUlEIDw9IEdhbWVTdGF0ZUlELk5vbmUpIHtcclxuICAgICAgICAgICAgRG9kTG9nLmVycm9yKGBHYW1lU3RhdGVNZ3IucnVuU3RhdGU6IEludmFsaWQgc3RhdGVJRCBbJHtzdGF0ZUlEfV0uIGApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobnVsbCAhPSB0aGlzLl9jdXJyZW50U3RhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlLmxlYXZlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUgPSB0aGlzLl9zdGF0ZXNbc3RhdGVJRF07XHJcbiAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlLmVudGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAobnVsbCAhPSB0aGlzLl9jdXJyZW50U3RhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlLnVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKG51bGwgIT0gdGhpcy5fY3VycmVudFN0YXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZS5sZWF2ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9zdGF0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5fc3RhdGVzW2ldO1xyXG4gICAgICAgICAgICBzdGF0ZS5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBHYW1lQ29uZmlnIGZyb20gXCIuL0dhbWVDb25maWdcIjtcclxuaW1wb3J0IFNjZW5lTWFuYWdlciBmcm9tIFwiLi9TY2VuZU1hbmFnZXJcIjtcclxuaW1wb3J0IEZpeFRpbWUgZnJvbSBcIi4vRml4L0ZpeFRpbWVcIjtcclxuaW1wb3J0IFJob2Rlc0dhbWUgZnJvbSBcIi4vR2FtZS9SaG9kZXNHYW1lXCI7XHJcbmltcG9ydCB7IEV2ZW50Q2VudHJlIH0gZnJvbSBcIi4vRXZlbnQvRXZlbnRDZW50cmVcIjtcclxuaW1wb3J0IERvZFJlc291cmNlTWdyIGZyb20gXCIuL1Jlc291cmNlcy9Eb2RSZXNvdXJjZU1nclwiO1xyXG5pbXBvcnQgUGVyZm9ybWFuY2VDZW50cmUgZnJvbSBcIi4vQ29tbW9uL0dyYXBoaWNzL1BlcmZvcm1hbmNlX01vZHVsZS9QZXJmb3JtYW5jZUNlbnRyZVwiO1xyXG5pbXBvcnQgeyBWZWMyIH0gZnJvbSBcIi4vQ29tbW9uL0RvZE1hdGhcIjtcclxuaW1wb3J0IEFjdG9yIGZyb20gXCIuL0dhbWUvQWN0b3IvQWN0b3JcIjtcclxuaW1wb3J0IHsgQWN0b3JUeXBlIH0gZnJvbSBcIi4vQ29tbW9uL0RvZEtleVwiO1xyXG5cclxuY2xhc3MgTWFpbiB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHQvL+agueaNrklEReiuvue9ruWIneWni+WMluW8leaTjlx0XHRcclxuXHRcdGlmICh3aW5kb3dbXCJMYXlhM0RcIl0pIExheWEzRC5pbml0KEdhbWVDb25maWcud2lkdGgsIEdhbWVDb25maWcuaGVpZ2h0KTtcclxuXHRcdGVsc2UgTGF5YS5pbml0KEdhbWVDb25maWcud2lkdGgsIEdhbWVDb25maWcuaGVpZ2h0LCBMYXlhW1wiV2ViR0xcIl0pO1xyXG5cdFx0TGF5YVtcIlBoeXNpY3NcIl0gJiYgTGF5YVtcIlBoeXNpY3NcIl0uZW5hYmxlKCk7XHJcblx0XHRMYXlhW1wiRGVidWdQYW5lbFwiXSAmJiBMYXlhW1wiRGVidWdQYW5lbFwiXS5lbmFibGUoKTtcclxuXHRcdExheWEuc3RhZ2Uuc2NhbGVNb2RlID0gR2FtZUNvbmZpZy5zY2FsZU1vZGU7XHJcblx0XHRMYXlhLnN0YWdlLnNjcmVlbk1vZGUgPSBHYW1lQ29uZmlnLnNjcmVlbk1vZGU7XHJcblx0XHQvL+WFvOWuueW+ruS/oeS4jeaUr+aMgeWKoOi9vXNjZW5l5ZCO57yA5Zy65pmvXHJcblx0XHRMYXlhLlVSTC5leHBvcnRTY2VuZVRvSnNvbiA9IEdhbWVDb25maWcuZXhwb3J0U2NlbmVUb0pzb247XHJcblxyXG5cdFx0Ly/miZPlvIDosIPor5XpnaLmnb/vvIjpgJrov4dJREXorr7nva7osIPor5XmqKHlvI/vvIzmiJbogIV1cmzlnLDlnYDlop7liqBkZWJ1Zz10cnVl5Y+C5pWw77yM5Z2H5Y+v5omT5byA6LCD6K+V6Z2i5p2/77yJXHJcblx0XHRpZiAoR2FtZUNvbmZpZy5kZWJ1ZyB8fCBMYXlhLlV0aWxzLmdldFF1ZXJ5U3RyaW5nKFwiZGVidWdcIikgPT0gXCJ0cnVlXCIpIExheWEuZW5hYmxlRGVidWdQYW5lbCgpO1xyXG5cdFx0aWYgKEdhbWVDb25maWcucGh5c2ljc0RlYnVnICYmIExheWFbXCJQaHlzaWNzRGVidWdEcmF3XCJdKSBMYXlhW1wiUGh5c2ljc0RlYnVnRHJhd1wiXS5lbmFibGUoKTtcclxuXHRcdGlmIChHYW1lQ29uZmlnLnN0YXQpIExheWEuU3RhdC5zaG93KCk7XHJcblx0XHRMYXlhLmFsZXJ0R2xvYmFsRXJyb3IgPSB0cnVlO1xyXG5cclxuXHRcdC8vR0FNRSBJTklUIChHTE9CQUwgTU9EVUxFKVxyXG5cdFx0Y29uc29sZS5sb2coXCJQQyBpbml0XCIpO1xyXG5cdFx0UGVyZm9ybWFuY2VDZW50cmUuaW5pdGlhbGl6ZShMYXlhLnN0YWdlKTtcclxuXHJcblx0XHQvL3Rlc3RcclxuXHRcdFBlcmZvcm1hbmNlQ2VudHJlLmluc3RhbmNlLmluaXRCb2FyZChbXHJcblx0XHRcdFswLDAsMCwwXSxcclxuXHRcdFx0WzAsMCwwLDBdXHJcblx0XHRdLCBuZXcgVmVjMig1MCw1MCksIG5ldyBWZWMyKDEwMCwxMDApLCBcIiNmZjAwZmZcIiwgXCIjZmZmZjAwXCIpO1xyXG5cdFx0Ly90ZXN0IGVuZFxyXG5cclxuXHRcdEZpeFRpbWUuaW5pdCgpO1xyXG5cdFx0UmhvZGVzR2FtZS5JbnN0YW5jZS5pbml0KCk7XHJcblx0XHREb2RSZXNvdXJjZU1nci5JbnN0YW5jZS5pbml0KCk7XHJcblx0XHRFdmVudENlbnRyZS5pbml0KCk7XHJcblxyXG5cdFx0Ly/mv4DmtLvotYTmupDniYjmnKzmjqfliLbvvIx2ZXJzaW9uLmpzb27nlLFJREXlj5HluIPlip/og73oh6rliqjnlJ/miJDvvIzlpoLmnpzmsqHmnInkuZ/kuI3lvbHlk43lkI7nu63mtYHnqItcclxuXHRcdExheWEuUmVzb3VyY2VWZXJzaW9uLmVuYWJsZShcInZlcnNpb24uanNvblwiLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMub25WZXJzaW9uTG9hZGVkKSwgTGF5YS5SZXNvdXJjZVZlcnNpb24uRklMRU5BTUVfVkVSU0lPTik7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgb25WZXJzaW9uTG9hZGVkKCk6IHZvaWQge1xyXG5cdFx0Ly/mv4DmtLvlpKflsI/lm77mmKDlsITvvIzliqDovb3lsI/lm77nmoTml7blgJnvvIzlpoLmnpzlj5HnjrDlsI/lm77lnKjlpKflm77lkIjpm4bph4zpnaLvvIzliJnkvJjlhYjliqDovb3lpKflm77lkIjpm4bvvIzogIzkuI3mmK/lsI/lm75cclxuXHRcdExheWEuQXRsYXNJbmZvTWFuYWdlci5lbmFibGUoXCJmaWxlY29uZmlnLmpzb25cIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLm9uQ29uZmlnTG9hZGVkKSk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgb25Db25maWdMb2FkZWQoKTogdm9pZCB7XHJcblxyXG5cdFx0XHJcblxyXG5cdFx0U2NlbmVNYW5hZ2VyLkluc3RhbmNlLmF3YWtlKCk7XHJcblx0XHRcclxuXHRcdFxyXG5cdFx0Ly9Bd2FrZSBHYW1lIEVuZ2luZSBMb29wXHJcblx0XHRMYXlhLnRpbWVyLmxvb3AoMTYsIHRoaXMsIHRoaXMuX3VwZGF0ZSk7XHJcblx0XHRcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgX3VwZGF0ZSgpOiB2b2lkIHtcclxuXHRcdEZpeFRpbWUudXBkYXRlKCk7XHJcblx0XHRSaG9kZXNHYW1lLkluc3RhbmNlLnVwZGF0ZSgpO1xyXG5cdFx0RG9kUmVzb3VyY2VNZ3IuSW5zdGFuY2UudXBkYXRlKCk7XHJcblx0fVxyXG59XHJcblxyXG4vL+a/gOa0u+WQr+WKqOexu1xyXG5uZXcgTWFpbigpO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBEb2RSZXNvdXJjZU1nciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IERvZFJlc291cmNlTWdyO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSW5zdGFuY2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlIHx8ICh0aGlzLl9pbnN0YW5jZSA9IG5ldyB0aGlzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETyBA6ZO25Y2OXHJcbiAgICAvL2xvYWQgcmVzb3VyY2VzIGhlcmUgaW5jbHVkaW5nIEpTT04gLyBURVhUVVJFIC8gQVZBVEFSIC8gU1BJTkVcclxuICAgIC8vcHJpdmF0ZSBfanNvbjogRG9kSnNvbkxvYWRlcjtcclxuICAgIC8vcHJpdmF0ZSBfdGV4OiBEb2RUZXh0dXJlTG9hZGVyO1xyXG5cclxuICAgIHByaXZhdGUgX2xldmVsSUQ6IG51bWJlciB8IG51bGw7XHJcbiAgICBwcml2YXRlIF9pbml0ZWQ6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9sZXZlbFByZXBhcmVkOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX2xldmVsSUQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2luaXRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2xldmVsUHJlcGFyZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0TGV2ZWxJRChpZDogbnVtYmVyIHwgbnVsbCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2xldmVsSUQgPSBpZDtcclxuICAgICAgICB0aGlzLl9sZXZlbFByZXBhcmVkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldExldmVsSUQoKTogbnVtYmVyIHwgbnVsbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xldmVsSUQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgLy9UT0RPIExPQURcclxuICAgICAgICAvL3RoaXMuX2pzb24ubG9hZCgpO1xyXG4gICAgICAgIC8vdGhpcy5fdGV4LmxvYWQoKTtcclxuICAgICAgICAvL3NldCBpbml0ZWQgZmxhZyB0cnVlIHdoaWxlIGluaXRpYWxpemF0aW9uIGNvbXBsZXRlXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXRlZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5pdGVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKG51bGwgIT0gdGhpcy5zZXRMZXZlbElEICYmIGZhbHNlID09IHRoaXMuX2xldmVsUHJlcGFyZWQpIHtcclxuICAgICAgICAgICAgLy9wcmVwYXJlIHByZWZhYiBoZXJlXHJcbiAgICAgICAgICAgIGlmICgxKSB7ICAgIC8vbWFrZSBzdXJlIHByZWZhYiBwcmVwYXJlZFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGV2ZWxQcmVwYXJlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzTGV2ZWxQcmVwYXJlZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGV2ZWxQcmVwYXJlZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q3VycmVudExldmVsUmVzKCk6IGFueSB7XHJcbiAgICAgICAgLy9UT0RPXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEFjdG9yUmVzQnlJRChpZDogbnVtYmVyKTogYW55IHtcclxuICAgICAgICAvL1RPRE9cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufSIsIi8vIGltcG9ydCBFdmVudENlbnRyZSBmcm9tIFwiLi9Ub3lib3gvRXZlbnRDZW50cmVcIjtcclxuLy8gaW1wb3J0IERhdGFiYXNlIGZyb20gXCIuL1RveWJveC9EYXRhYmFzZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NlbmVNYW5hZ2Vye1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBTY2VuZU1hbmFnZXI7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBJbnN0YW5jZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2UgfHwgKHRoaXMuX2luc3RhbmNlID0gbmV3IHRoaXMoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBsb2FkaW5nU2NlbmU6c3RyaW5nID0gXCJMb2FkaW5nU2NlbmUuc2NlbmVcIjtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgZ2FtZVNjZW5lOnN0cmluZyA9IFwiR2FtZVNjZW5lLnNjZW5lXCI7XHJcblxyXG4gICAgcHVibGljIGF3YWtlKCk6IHZvaWQge1xyXG4gICAgICAgIExheWEuU2NlbmUub3Blbih0aGlzLmdhbWVTY2VuZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iLCJpbXBvcnQge3VpfSBmcm9tIFwiLi4vdWkvbGF5YU1heFVJXCI7XHJcbmltcG9ydCBSaG9kZXNHYW1lIGZyb20gXCIuLi9HYW1lL1Job2Rlc0dhbWVcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIGV4dGVuZHMgdWkuR2FtZVNjZW5lVUkge1xyXG4gICAgcHVibGljIHN0YXRpYyBVSVNldDogTGF5YS5TcHJpdGU7XHJcbiAgICBwdWJsaWMgc3RhdGljIHN0YWdlOiBMYXlhLlN0YWdlO1xyXG4gICAgcHJpdmF0ZSBfcGF1c2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAvL+WFqOWxgOaVsOaNru+8iOaVsOaNruW6k+exu+WujOaIkOWQjuWwhuiiq+abv+S7o++8iVxyXG4gICAgcHVibGljIHN0YXRpYyBmcmFtZUxlbmd0aDogbnVtYmVyID0gMjA7Ly/luKfplb/luqZcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQge3VpfSBmcm9tIFwiLi4vdWkvbGF5YU1heFVJXCJcclxuXHJcblxyXG4vL1RPXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvYWRpbmcgZXh0ZW5kcyB1aS5Mb2FkaW5nU2NlbmVVSXtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKVxyXG4gICAgfVxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXG5pbXBvcnQgVmlldz1MYXlhLlZpZXc7XHJcbmltcG9ydCBEaWFsb2c9TGF5YS5EaWFsb2c7XHJcbmltcG9ydCBTY2VuZT1MYXlhLlNjZW5lO1xudmFyIFJFRzogRnVuY3Rpb24gPSBMYXlhLkNsYXNzVXRpbHMucmVnQ2xhc3M7XG5leHBvcnQgbW9kdWxlIHVpIHtcclxuICAgIGV4cG9ydCBjbGFzcyBHYW1lU2NlbmVVSSBleHRlbmRzIFNjZW5lIHtcclxuXHRcdHB1YmxpYyBVSVNldDpMYXlhLlNwcml0ZTtcblx0XHRwdWJsaWMgU2lkZUJhcjpMYXlhLlNwcml0ZTtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkdhbWVTY2VuZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS5HYW1lU2NlbmVVSVwiLEdhbWVTY2VuZVVJKTtcclxuICAgIGV4cG9ydCBjbGFzcyBMb2FkaW5nU2NlbmVVSSBleHRlbmRzIFNjZW5lIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiTG9hZGluZ1NjZW5lXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLkxvYWRpbmdTY2VuZVVJXCIsTG9hZGluZ1NjZW5lVUkpO1xyXG59XHIiXX0=
