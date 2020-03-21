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
     * 求和两个Vec，返回结果，不修改原实例
     * @param vec
     */
    Vec2.prototype.plus = function (vec) {
        return new Vec2(this.x + vec.x, this.y + vec.y);
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
var FixRect = /** @class */ (function (_super) {
    __extends(FixRect, _super);
    function FixRect(x, y, width, height) {
        return _super.call(this, x, y, width, height) || this;
    }
    return FixRect;
}(Laya.Rectangle));
exports.FixRect = FixRect;
},{}],13:[function(require,module,exports){
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
},{}],14:[function(require,module,exports){
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
},{}],15:[function(require,module,exports){
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
},{"./SceneScript/Game":49,"./SceneScript/Loading":50}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ColiMessage_1 = require("./ActorModules/ColiMessage");
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
        this.coliEmit = new ColiMessage_1.ColiEmit(0, 0, ColiMessage_1.ColiEmit.GLOBAL_UNIT_SUBWIDTH, ColiMessage_1.ColiEmit.GLOBAL_UNIT_SUBHEIGHT); //碰撞事件发布者
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
},{"../../Common/DodKey":2,"../../Fix/FixSymbol":13,"./ActorModules/ActorBuffMgr":18,"./ActorModules/ActorCost":19,"./ActorModules/ActorSkill":20,"./ActorModules/Animation":21,"./ActorModules/ColiMessage":22,"./ActorModules/Profile":24,"./ActorModules/Transform":25,"./ActorModules/UnitRender":26,"./ActorRoute":27,"./Attack/AtkAbst":28,"./Attack/Blocker":29,"./State/ActorStateFsm":31}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Actor_1 = require("./Actor");
var DodKey_1 = require("../../Common/DodKey");
var ActorStateFsm_1 = require("./State/ActorStateFsm");
var RhodesGame_1 = require("../RhodesGame");
var ActorMgr = /** @class */ (function () {
    function ActorMgr() {
        this.actors = [];
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
        console.log("Mgr update");
        for (var i = 0; i < this.actors.length; i++) {
            var actor = this.actors[i];
            actor.update();
        }
        RhodesGame_1.default.Instance.battle.mapNodeCPU.render();
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
},{"../../Common/DodKey":2,"../RhodesGame":39,"./Actor":16,"./State/ActorStateFsm":31}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActorBuffMgr = /** @class */ (function () {
    function ActorBuffMgr(keeper, res) {
    }
    return ActorBuffMgr;
}());
exports.ActorBuffMgr = ActorBuffMgr;
},{}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActorCost = /** @class */ (function () {
    function ActorCost(keeper) {
    }
    return ActorCost;
}());
exports.ActorCost = ActorCost;
},{}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActorSkill = /** @class */ (function () {
    function ActorSkill(keeper, res) {
    }
    return ActorSkill;
}());
exports.ActorSkill = ActorSkill;
},{}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Animation = /** @class */ (function () {
    function Animation(keeper, res) {
    }
    return Animation;
}());
exports.Animation = Animation;
},{}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DodMath_1 = require("../../../Common/DodMath");
var FixRect_1 = require("../../../Fix/FixRect");
var DodDataStructure_1 = require("../../../Common/DodDataStructure");
var EventCentre_1 = require("../../../Event/EventCentre");
var DodKey_1 = require("../../../Common/DodKey");
/**
 * 碰撞消息发布者
 */
var ColiEmit = /** @class */ (function () {
    function ColiEmit(x, y, width, height) {
        if (width === void 0) { width = ColiEmit.GLOBAL_UNIT_SUBWIDTH; }
        if (height === void 0) { height = ColiEmit.GLOBAL_UNIT_SUBHEIGHT; }
        this._pastSet = []; //此方块上一次存在于哪一点
        this._rec = new FixRect_1.FixRect(x, y, width, height);
    }
    /**
     * 返回所有目前自身所处的方格
     */
    ColiEmit.prototype.findIntersect = function () {
        var _a = [
            DodMath_1.DodMath.intDivision(this._rec.x, ColiEmit.GLOBAL_UNIT_WIDTH),
            DodMath_1.DodMath.intDivision(this._rec.y, ColiEmit.GLOBAL_UNIT_HEIGHT),
            DodMath_1.DodMath.intDivision(this._rec.right, ColiEmit.GLOBAL_UNIT_WIDTH),
            DodMath_1.DodMath.intDivision(this._rec.bottom, ColiEmit.GLOBAL_UNIT_HEIGHT)
        ], left = _a[0], top = _a[1], right = _a[2], bottom = _a[3];
        var result = [];
        for (var hori = left; hori <= right; hori += 1) {
            for (var verti = top; verti <= bottom; verti += 1) {
                result.push(new DodMath_1.Vec2(hori, verti));
            }
        }
        return result;
    };
    ColiEmit.prototype.pos = function (x, y) {
        this._rec.x = x;
        this._rec.y = y;
        return this;
    };
    ColiEmit.prototype.posByVec = function (vec) {
        this._rec.x = vec.x;
        this._rec.y = vec.y;
        return this;
    };
    ColiEmit.prototype.size = function (width, height) {
        this._rec.width = width;
        this._rec.height = height;
        return this;
    };
    ColiEmit.prototype.event = function (publisher, identity) {
        if (identity === void 0) { identity = DodKey_1.ActorType.None; }
        var current = this.findIntersect(); //当前碰撞集合
        //this._pastSet//历史碰撞集合
        //离开：处于历史碰撞集合，但不处于当前碰撞集合的元素
        var leave = DodDataStructure_1.ArrayAlgo.findComplementSet(this._pastSet, current);
        //进入：处于当前碰撞集合，但不处于历史碰撞集合的元素
        var entre = DodDataStructure_1.ArrayAlgo.findComplementSet(current, this._pastSet);
        //发布事件
        // console.log("离开");
        leave.forEach(function (ele) {
            EventCentre_1.EventCentre.instance.event(EventCentre_1.EventCentre.EType.LEAVE(ele, "" + identity), publisher);
        });
        // console.log("进入");
        entre.forEach(function (ele) {
            EventCentre_1.EventCentre.instance.event(EventCentre_1.EventCentre.EType.ENTRE(ele, "" + identity), publisher);
        });
        this._pastSet = current; //更新历史碰撞集合为当前碰撞集合
    };
    ;
    /**
     * 发布离开当前存在的所有坐标的事件
     * @param publisher
     * @param identity
     */
    ColiEmit.prototype.eventLeaveAll = function (publisher, identity) {
        if (identity === void 0) { identity = DodKey_1.ActorType.None; }
        this._pastSet.forEach(function (vec) {
            EventCentre_1.EventCentre.instance.event(EventCentre_1.EventCentre.EType.LEAVE(vec, "" + identity), publisher);
        });
    };
    ColiEmit.GLOBAL_UNIT_WIDTH = 100; //全局单位宽
    ColiEmit.GLOBAL_UNIT_HEIGHT = 100; //全局单位高
    ColiEmit.GLOBAL_UNIT_SUBWIDTH = 90; //全局内部单位宽
    ColiEmit.GLOBAL_UNIT_SUBHEIGHT = 90; //全局内部单位高
    ColiEmit.GLOBAL_UNIT_RSHIFT = 5; //全局单位向右偏移
    ColiEmit.GLOBAL_UNIT_BSHIFT = 5; //全局单位向下偏移
    return ColiEmit;
}());
exports.ColiEmit = ColiEmit;
/**
 * 碰撞消息接收者
 * 可以通过setDetection监控指定点，指定Identity的进入和离开事件
 * 可以通过offDetection撤销指定点的监控
 * 这个不能直接用，要继承一层把onLeave和onEntre函数重写之后才能用
 */
var ColiReceiver = /** @class */ (function () {
    function ColiReceiver(width, height) {
        /*
        这里的任何矩阵都可以用键值对替代。x与y两个参数可以生成永不重复的键
    
        */
        this._detectionMatrix = []; //记录哪个坐标已被监控
        this._cancellationMatrix = []; //存放用于取消监听的函数
        this._width = width;
        this._height = height;
        for (var w = 0; w < width; w += 1) {
            this._detectionMatrix[w] = [];
            this._cancellationMatrix[w] = [];
            for (var h = 0; h < height; h += 1) {
                this._detectionMatrix[w][h] = false;
                this._cancellationMatrix[w][h] = [];
            }
        }
    }
    ColiReceiver.prototype.detectionExist = function (position) {
        return this._detectionMatrix[position.x][position.y];
    };
    /**
     * 在指定坐标上设置监听碰撞事件
     * identity可以在Actor.Identity里选择
     * 那我为什么不写enum呢……
     */
    ColiReceiver.prototype.setDetection = function (position, identity) {
        var _this = this;
        if (this.detectionExist(position)) { //如果在此处已存在监控，则取消监控
            console.log("setDetection函数不能在同一个坐标多次监控，请查看ColiReciever类");
            return;
        }
        if (position.x >= this._width || position.x < 0 ||
            position.y > this._height || position.y < 0) { //如果监控位置超出边界，则取消监控
            return;
        }
        position = position.clone(); //复制位置对象以防止传址问题
        var detector = []; //这是监听函数，存起来准备撤除监听时用
        //设置监听事件
        detector[0] = function (actor) {
            _this.onEntre(actor, position);
        };
        detector[1] = function (actor) {
            _this.onLeave(actor, position);
        };
        EventCentre_1.EventCentre.instance.on(EventCentre_1.EventCentre.EType.ENTRE(position, identity), this, detector[0]);
        EventCentre_1.EventCentre.instance.on(EventCentre_1.EventCentre.EType.LEAVE(position, identity), this, detector[1]);
        //设置监听事件
        this._cancellationMatrix[position.x][position.y].push(function () {
            EventCentre_1.EventCentre.instance.off(EventCentre_1.EventCentre.EType.ENTRE(position, identity), _this, detector[0]);
        }, function () {
            EventCentre_1.EventCentre.instance.off(EventCentre_1.EventCentre.EType.LEAVE(position, identity), _this, detector[1]);
        });
        this._detectionMatrix[position.x][position.y] = true; //将此坐标的状态设为“已被监听”
    };
    /**
     * 移除指定坐标的碰撞事件监听
     * @param position
     */
    ColiReceiver.prototype.offDetection = function (position) {
        this._cancellationMatrix[position.x][position.y].forEach(function (ele) {
            ele();
        });
        this._cancellationMatrix[position.x][position.y] = []; //删除此处的预存函数
        this._detectionMatrix[position.x][position.y] = false; //将此坐标设为未监听
    };
    return ColiReceiver;
}());
exports.ColiReceiver = ColiReceiver;
},{"../../../Common/DodDataStructure":1,"../../../Common/DodKey":2,"../../../Common/DodMath":4,"../../../Event/EventCentre":11,"../../../Fix/FixRect":12}],23:[function(require,module,exports){
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
},{}],24:[function(require,module,exports){
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
},{"./Damage":23}],25:[function(require,module,exports){
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
        this.speed = 5; //速度
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
},{"../../../Common/DodMath":4}],26:[function(require,module,exports){
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
},{"../../../Common/DodMath":4,"../../../Common/Graphics/Performance_Module/PerformanceCentre":6}],27:[function(require,module,exports){
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
},{"../../Common/DodMath":4}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DodDataStructure_1 = require("../../../Common/DodDataStructure");
/**
 * by XWV
 *
 * 葱 修改于 3/18
 *      将Seeker挪入攻击状态机内，不由Actor持有
 *      不同的攻击范围由Seeker替换来实现
 *      不同的攻击逻辑（范围/单体）由修改profile中的参数实现
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
        this._curPoint = 0; //当前已积蓄的点数
        this._velocity = 1; //当前累加速率(点数/帧)
        this.keeper = keeper;
        this.curState = new Wait();
        this.stateList.edit(StateType.WAIT, this.curState);
        this.stateList.edit(StateType.PREPARE, new Prepare());
        this.stateList.edit(StateType.AFTER_ATK, new AfterAtk());
        //todo: about res
        this._prepTime = 40;
        this._coolTime = 40;
        this.seeker = null; //初始化Seeker(根据res)
    }
    Object.defineProperty(AtkStateMachine.prototype, "ready", {
        get: function () {
            return this._curPoint >= this._prepTime;
        },
        enumerable: true,
        configurable: true
    });
    AtkStateMachine.prototype.tic = function () {
        this._curPoint += this._velocity;
    };
    Object.defineProperty(AtkStateMachine.prototype, "coolComplete", {
        get: function () {
            return this._curPoint < this._prepTime + this._coolTime;
        },
        enumerable: true,
        configurable: true
    });
    AtkStateMachine.prototype.refresh = function () {
        this._curPoint = 0;
    };
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
},{"../../../Common/DodDataStructure":1}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Blocker = /** @class */ (function () {
    function Blocker(keeper) {
    }
    return Blocker;
}());
exports.Blocker = Blocker;
},{}],30:[function(require,module,exports){
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
},{}],31:[function(require,module,exports){
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
    ActorStateID[ActorStateID["Freezed"] = 5] = "Freezed";
    ActorStateID[ActorStateID["Fight"] = 6] = "Fight";
    ActorStateID[ActorStateID["Death"] = 7] = "Death";
    ActorStateID[ActorStateID["Escape"] = 8] = "Escape";
    ActorStateID[ActorStateID["Count"] = 9] = "Count";
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
},{"../../../Common/DodLog":3,"./ActorStatePrepared":32,"./ActorStateWalk":33}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActorStateBase_1 = require("./ActorStateBase");
var ActorStatePrepared = /** @class */ (function (_super) {
    __extends(ActorStatePrepared, _super);
    function ActorStatePrepared() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActorStatePrepared.prototype.update = function () {
        // console.log("Perpared update")
    };
    return ActorStatePrepared;
}(ActorStateBase_1.default));
exports.ActorStatePrepared = ActorStatePrepared;
},{"./ActorStateBase":30}],33:[function(require,module,exports){
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
        console.log("Walk update");
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
},{"./ActorStateBase":30}],34:[function(require,module,exports){
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
},{"../../Fix/FixSymbol":13}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ColiMessage_1 = require("../Actor/ActorModules/ColiMessage");
var DodMath_1 = require("../../Common/DodMath");
var DodDataStructure_1 = require("../../Common/DodDataStructure");
var DodKey_1 = require("../../Common/DodKey");
var ColiReporter = /** @class */ (function (_super) {
    __extends(ColiReporter, _super);
    function ColiReporter() {
        var _this = _super.call(this, 10, 10) || this;
        _this.inList = [];
        _this.layer = new Laya.Sprite();
        _this._matrix = []; //存储每个地图节点中的Actor对象
        for (var w = 0; w < 10; w += 1) {
            _this._matrix[w] = [];
            for (var h = 0; h < 10; h += 1) {
                _this.setDetection(new DodMath_1.Vec2(w, h), "" + DodKey_1.ActorType.Monster);
                _this._matrix[w][h] = [];
            }
        }
        Laya.stage.addChild(_this.layer);
        _this.layer.zOrder = -10;
        _this.layer.pos(50, 50);
        return _this;
    }
    ColiReporter.prototype.matrixAdd = function (pos, actor) {
        this._matrix[pos.x][pos.y].push(actor);
    };
    ColiReporter.prototype.matrixRemove = function (pos, actor) {
        var index = this._matrix[pos.x][pos.y].indexOf(actor);
        if (index != -1) {
            this._matrix[pos.x][pos.y].splice(index, 1);
        }
    };
    ColiReporter.prototype.matrixGet = function (pos) {
        return this._matrix[pos.x][pos.y];
    };
    ColiReporter.prototype.onEntre = function (actor, pos) {
        // console.log("Enter" + pos.x + "|" + pos.y);
        this.inList.push(pos);
        this.render();
        this.matrixAdd(pos, actor);
    };
    ColiReporter.prototype.onLeave = function (actor, pos) {
        var index = DodDataStructure_1.ArrayAlgo.findEle(pos, this.inList);
        if (index !== -1) {
            this.inList.splice(index, 1);
        }
        this.render();
        this.matrixRemove(pos, actor);
        // console.log("Leave" + pos.x + "|" + pos.y);
    };
    ColiReporter.prototype.render = function () {
        var _this = this;
        this.layer.graphics.clear();
        this.inList.forEach(function (ele) {
            _this.layer.graphics.drawRect(ele.x * ColiMessage_1.ColiEmit.GLOBAL_UNIT_WIDTH + 1, ele.y * ColiMessage_1.ColiEmit.GLOBAL_UNIT_HEIGHT + 1, ColiMessage_1.ColiEmit.GLOBAL_UNIT_WIDTH - 2, ColiMessage_1.ColiEmit.GLOBAL_UNIT_HEIGHT - 2, "#ff0000");
        });
    };
    return ColiReporter;
}(ColiMessage_1.ColiReceiver));
exports.default = ColiReporter;
},{"../../Common/DodDataStructure":1,"../../Common/DodKey":2,"../../Common/DodMath":4,"../Actor/ActorModules/ColiMessage":22}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameLevel_1 = require("./GameLevel");
var ActorCollisionProcessor_1 = require("./Collision/ActorCollisionProcessor");
var GameLevel_2 = require("./GameLevel");
var DodResourceMgr_1 = require("../Resources/DodResourceMgr");
var ActorMgr_1 = require("./Actor/ActorMgr");
var ColiReporter_1 = require("./Collision/ColiReporter");
var GameBattle = /** @class */ (function () {
    function GameBattle() {
        this.mapNodeCPU = new ColiReporter_1.default(); //负责地图节点碰撞检测
        this.level = new GameLevel_2.default();
        this.map = new GameLevel_1.default();
        this.actorMgr = new ActorMgr_1.default();
        this.collision = new ActorCollisionProcessor_1.ActorCollisionProcessor();
    }
    GameBattle.prototype.prepareLevel = function () {
        //TODO init level information
        var res = DodResourceMgr_1.default.Instance.getCurrentLevelRes();
        //test
        res = { level: 1, map: 2 };
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
},{"../Resources/DodResourceMgr":47,"./Actor/ActorMgr":17,"./Collision/ActorCollisionProcessor":34,"./Collision/ColiReporter":35,"./GameLevel":38}],37:[function(require,module,exports){
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
},{}],38:[function(require,module,exports){
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
},{"../Fix/FixTime":14,"./GameBattleConst":37}],39:[function(require,module,exports){
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
},{"../Common/DodLog":3,"./GameBattle":36,"./State/GameStateMgr":45}],40:[function(require,module,exports){
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
},{}],41:[function(require,module,exports){
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
        console.log("BattleState update");
        this._battle.actorMgr.update();
        this._battle.map.update();
    };
    return GameStateBattle;
}(GameStateBase_1.default));
exports.default = GameStateBattle;
},{"./GameStateBase":40}],42:[function(require,module,exports){
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
        console.log("GameLoad update");
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
},{"../../Common/DodLog":3,"../../Resources/DodResourceMgr":47,"../RhodesGame":39,"./GameStateBase":40,"./GameStateMgr":45}],43:[function(require,module,exports){
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
},{"../../Common/DodLog":3,"../../Resources/DodResourceMgr":47,"../RhodesGame":39,"./GameStateBase":40,"./GameStateMgr":45}],44:[function(require,module,exports){
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
},{"./GameStateBase":40}],45:[function(require,module,exports){
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
},{"../../Common/DodLog":3,"./GameStateBattle":41,"./GameStateGameload":42,"./GameStateLevelload":43,"./GameStateLobby":44}],46:[function(require,module,exports){
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
        //test
        DodResourceMgr_1.default.Instance.init();
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
},{"./Common/DodMath":4,"./Common/Graphics/Performance_Module/PerformanceCentre":6,"./Event/EventCentre":11,"./Fix/FixTime":14,"./Game/RhodesGame":39,"./GameConfig":15,"./Resources/DodResourceMgr":47,"./SceneManager":48}],47:[function(require,module,exports){
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
        this._inited = true;
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
},{}],48:[function(require,module,exports){
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
},{}],49:[function(require,module,exports){
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
},{"../ui/layaMaxUI":51}],50:[function(require,module,exports){
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
},{"../ui/layaMaxUI":51}],51:[function(require,module,exports){
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
},{}]},{},[46])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xheWEvTGF5YUFpcklERS9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQ29tbW9uL0RvZERhdGFTdHJ1Y3R1cmUudHMiLCJzcmMvQ29tbW9uL0RvZEtleS50cyIsInNyYy9Db21tb24vRG9kTG9nLnRzIiwic3JjL0NvbW1vbi9Eb2RNYXRoLnRzIiwic3JjL0NvbW1vbi9HcmFwaGljcy9QZXJmb3JtYW5jZV9Nb2R1bGUvQWN0b3JDb21wb25lbnQudHMiLCJzcmMvQ29tbW9uL0dyYXBoaWNzL1BlcmZvcm1hbmNlX01vZHVsZS9QZXJmb3JtYW5jZUNlbnRyZS50cyIsInNyYy9Db21tb24vR3JhcGhpY3MvUGVyZm9ybWFuY2VfTW9kdWxlL1N5bWJvbGl6ZWRSZW5kZXIudHMiLCJzcmMvQ29tbW9uL0dyYXBoaWNzL1BlcmZvcm1hbmNlX01vZHVsZS9VbnN5bWJvbGl6ZWRSZW5kZXIudHMiLCJzcmMvQ29tbW9uL0dyYXBoaWNzL1BlcmZvcm1hbmNlX01vZHVsZS9jdXN0b21pemVkU3ByLnRzIiwic3JjL0NvbW1vbi9HcmFwaGljcy9QZXJmb3JtYW5jZV9Nb2R1bGUvb2JqYm94LnRzIiwic3JjL0V2ZW50L0V2ZW50Q2VudHJlLnRzIiwic3JjL0ZpeC9GaXhSZWN0LnRzIiwic3JjL0ZpeC9GaXhTeW1ib2wudHMiLCJzcmMvRml4L0ZpeFRpbWUudHMiLCJzcmMvR2FtZUNvbmZpZy50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yLnRzIiwic3JjL0dhbWUvQWN0b3IvQWN0b3JNZ3IudHMiLCJzcmMvR2FtZS9BY3Rvci9BY3Rvck1vZHVsZXMvQWN0b3JCdWZmTWdyLnRzIiwic3JjL0dhbWUvQWN0b3IvQWN0b3JNb2R1bGVzL0FjdG9yQ29zdC50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yTW9kdWxlcy9BY3RvclNraWxsLnRzIiwic3JjL0dhbWUvQWN0b3IvQWN0b3JNb2R1bGVzL0FuaW1hdGlvbi50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yTW9kdWxlcy9Db2xpTWVzc2FnZS50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yTW9kdWxlcy9EYW1hZ2UudHMiLCJzcmMvR2FtZS9BY3Rvci9BY3Rvck1vZHVsZXMvUHJvZmlsZS50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yTW9kdWxlcy9UcmFuc2Zvcm0udHMiLCJzcmMvR2FtZS9BY3Rvci9BY3Rvck1vZHVsZXMvVW5pdFJlbmRlci50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yUm91dGUudHMiLCJzcmMvR2FtZS9BY3Rvci9BdHRhY2svQXRrQWJzdC50cyIsInNyYy9HYW1lL0FjdG9yL0F0dGFjay9CbG9ja2VyLnRzIiwic3JjL0dhbWUvQWN0b3IvU3RhdGUvQWN0b3JTdGF0ZUJhc2UudHMiLCJzcmMvR2FtZS9BY3Rvci9TdGF0ZS9BY3RvclN0YXRlRnNtLnRzIiwic3JjL0dhbWUvQWN0b3IvU3RhdGUvQWN0b3JTdGF0ZVByZXBhcmVkLnRzIiwic3JjL0dhbWUvQWN0b3IvU3RhdGUvQWN0b3JTdGF0ZVdhbGsudHMiLCJzcmMvR2FtZS9Db2xsaXNpb24vQWN0b3JDb2xsaXNpb25Qcm9jZXNzb3IudHMiLCJzcmMvR2FtZS9Db2xsaXNpb24vQ29saVJlcG9ydGVyLnRzIiwic3JjL0dhbWUvR2FtZUJhdHRsZS50cyIsInNyYy9HYW1lL0dhbWVCYXR0bGVDb25zdC50cyIsInNyYy9HYW1lL0dhbWVMZXZlbC50cyIsInNyYy9HYW1lL1Job2Rlc0dhbWUudHMiLCJzcmMvR2FtZS9TdGF0ZS9HYW1lU3RhdGVCYXNlLnRzIiwic3JjL0dhbWUvU3RhdGUvR2FtZVN0YXRlQmF0dGxlLnRzIiwic3JjL0dhbWUvU3RhdGUvR2FtZVN0YXRlR2FtZWxvYWQudHMiLCJzcmMvR2FtZS9TdGF0ZS9HYW1lU3RhdGVMZXZlbGxvYWQudHMiLCJzcmMvR2FtZS9TdGF0ZS9HYW1lU3RhdGVMb2JieS50cyIsInNyYy9HYW1lL1N0YXRlL0dhbWVTdGF0ZU1nci50cyIsInNyYy9NYWluLnRzIiwic3JjL1Jlc291cmNlcy9Eb2RSZXNvdXJjZU1nci50cyIsInNyYy9TY2VuZU1hbmFnZXIudHMiLCJzcmMvU2NlbmVTY3JpcHQvR2FtZS50cyIsInNyYy9TY2VuZVNjcmlwdC9Mb2FkaW5nLnRzIiwic3JjL3VpL2xheWFNYXhVSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNOQTtJQUFBO1FBQ1ksVUFBSyxHQUFPLEVBQUUsQ0FBQztJQWEzQixDQUFDO0lBWlUscUJBQUksR0FBWCxVQUFZLEdBQVUsRUFBRSxLQUFPO1FBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO0lBQzVCLENBQUM7SUFDTSxxQkFBSSxHQUFYLFVBQVksR0FBVTtRQUNsQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVNLHdCQUFPLEdBQWQsVUFBZSxDQUFzQjtRQUNqQyxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDdEIsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBQ0wsYUFBQztBQUFELENBZEEsQUFjQyxJQUFBO0FBZFksd0JBQU07QUFpQm5CO0lBR0ksY0FBWSxJQUFNLEVBQUUsSUFBWTtRQUM1QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBQ0wsV0FBQztBQUFELENBUEEsQUFPQyxJQUFBO0FBRUQ7SUFJSTtRQURRLFlBQU8sR0FBVSxDQUFDLENBQUM7UUFFdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBSSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFD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R0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQUEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUEsR0FBRyxTQUFBLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUNsRCxJQUFJLFFBQVEsSUFBSSxRQUFRLEVBQUU7WUFDdEIsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2YsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELElBQU0sS0FBSyxHQUFHLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDbEMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBQyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBQyxLQUFLLENBQUM7UUFDN0IsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ1csdUJBQWUsR0FBN0IsVUFBOEIsSUFBUyxFQUFFLEdBQVEsRUFBRSxRQUFlO1FBRTlELElBQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM1QixJQUFNLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDNUIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFBLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBLEdBQUcsU0FBQSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQSxDQUFDLENBQUM7UUFDbEQsSUFBTSxLQUFLLEdBQUcsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUNsQyxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksR0FBQyxLQUFLLEVBQUUsSUFBSSxHQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFTCxj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Y0FBYyxDQUFDLENBQUM7QUFDNUMsQ0FBQyxFQW5CYSxFQUFFLEdBQUYsVUFBRSxLQUFGLFVBQUUsUUFtQmYiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG4oZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHsgQ29tcGFyYWJsZSB9IGZyb20gXCIuL0RvZE1hdGhcIjtcclxuXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEtWUGFpcjxWPntcclxuICAgIHByaXZhdGUgX2xpc3Q6YW55ID0ge307XHJcbiAgICBwdWJsaWMgZWRpdChrZXk6c3RyaW5nLCB2YWx1ZTpWKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX2xpc3Rba2V5XSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHJlYWQoa2V5OnN0cmluZyk6VntcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGlzdFtrZXldO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgaXRlcmF0ZShmOihrOnN0cmluZyx2OlYpPT52b2lkKTp2b2lke1xyXG4gICAgICAgIGZvciAobGV0IGsgaW4gdGhpcy5fbGlzdCkge1xyXG4gICAgICAgICAgICBmKGssIHRoaXMuX2xpc3Rba10pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbmNsYXNzIE5vZGU8RT57XHJcbiAgICBwdWJsaWMgaXRlbTpFO1xyXG4gICAgcHVibGljIG5leHQ6Tm9kZTxFPjtcclxuICAgIGNvbnN0cnVjdG9yKGl0ZW06RSwgbmV4dDpOb2RlPEU+KXtcclxuICAgICAgICB0aGlzLml0ZW0gPSBpdGVtO1xyXG4gICAgICAgIHRoaXMubmV4dCA9IG5leHQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBMaW5rTGlzdDxFPntcclxuICAgIHByaXZhdGUgX2hlYWQ6Tm9kZTxFPjtcclxuICAgIHByaXZhdGUgX3RhaWw6Tm9kZTxFPjtcclxuICAgIHByaXZhdGUgX2xlbmd0aDpudW1iZXIgPSAwO1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLl9oZWFkID0gbmV3IE5vZGU8RT4obnVsbCwgbnVsbCk7XHJcbiAgICAgICAgdGhpcy5fdGFpbCA9IG5ldyBOb2RlPEU+KG51bGwsIG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Z+656GA5bGe5oCnXHJcbiAgICBwdWJsaWMgZ2V0IGxlbmd0aCgpOm51bWJlcntcclxuICAgICAgICAvLyBsZXQgcmVzdWx0Om51bWJlciA9IDA7XHJcbiAgICAgICAgLy8gbGV0IGN1cnJlbnQ6Tm9kZTxFPiA9IHRoaXMuX2hlYWQ7XHJcbiAgICAgICAgLy8gd2hpbGUgKGN1cnJlbnQubmV4dCAhPT0gbnVsbCkge1xyXG4gICAgICAgIC8vICAgICByZXN1bHQgKz0gMTtcclxuICAgICAgICAvLyAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaXNFbXB0eSgpOmJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hlYWQubmV4dCA9PT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvL+WinuWIoOaUueafpVxyXG4gICAgLy/lop5cclxuICAgIHB1YmxpYyBwdXNoKGl0ZW06RSk6dm9pZHtcclxuICAgICAgICBsZXQgbGFzdDpOb2RlPEU+ID0gbmV3IE5vZGU8RT4oaXRlbSwgbnVsbCk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbXB0eSkge1xyXG4gICAgICAgICAgICB0aGlzLl9oZWFkLm5leHQgPSBsYXN0O1xyXG4gICAgICAgICAgICB0aGlzLl90YWlsLm5leHQgPSBsYXN0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RhaWwubmV4dC5uZXh0ID0gbGFzdDtcclxuICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0ID0gbGFzdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbGVuZ3RoICs9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVuc2hpZnQoaXRlbTpFKTp2b2lke1xyXG4gICAgICAgIGxldCBmaXJzdDpOb2RlPEU+ID0gbmV3IE5vZGU8RT4oaXRlbSwgbnVsbCk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbXB0eSkge1xyXG4gICAgICAgICAgICB0aGlzLl90YWlsLm5leHQgPSBmaXJzdDtcclxuICAgICAgICAgICAgdGhpcy5faGVhZC5uZXh0ID0gZmlyc3Q7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZmlyc3QubmV4dCA9IHRoaXMuX2hlYWQubmV4dDtcclxuICAgICAgICAgICAgdGhpcy5faGVhZC5uZXh0ID0gZmlyc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2xlbmd0aCArPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbnNlcnQoaW5kZXg6bnVtYmVyLCBpdGVtOkUpOmJvb2xlYW57XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+IHRoaXMuX2xlbmd0aCkgey8v6L+Z5Y+l5LiN5LiA5qC3XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpbmRleCA9PT0gdGhpcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjdXJyZW50Ok5vZGU8RT4gPSB0aGlzLl9oZWFkOy8v6L+Z5Y+l5ZKM5YW25LuW6YGN5Y6G5piv5LiN5LiA5qC355qE77yM5Zug5Li66KaB6YCJ5Y+W5Yiw6YCJ5a6a5L2N572u55qE5YmN6Z2i5LiA5qC8XHJcbiAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBpbmRleDsgbiArPSAxKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjdXJyZW50Lm5leHQgPSBuZXcgTm9kZTxFPihpdGVtLCBjdXJyZW50Lm5leHQpO1xyXG4gICAgICAgIHRoaXMuX2xlbmd0aCArPSAxO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIoFxyXG4gICAgcHVibGljIHJlbW92ZShpbmRleDpudW1iZXIpOkV7XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjdXJyZW50Ok5vZGU8RT4gPSB0aGlzLl9oZWFkLm5leHQ7XHJcbiAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBpbmRleDsgbiArPSAxKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaXRlbTpFID0gY3VycmVudC5pdGVtO1xyXG4gICAgICAgIGN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2xlbmd0aCAtPSAxO1xyXG5cclxuICAgICAgICByZXR1cm4gY3VycmVudC5pdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaGlmdCgpOkV7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbXB0eSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBpdGVtID0gdGhpcy5faGVhZC5uZXh0Lml0ZW07XHJcbiAgICAgICAgdGhpcy5faGVhZC5uZXh0ID0gdGhpcy5faGVhZC5uZXh0Lm5leHQ7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzRW1wdHkpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0ID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2xlbmd0aCAtPSAxO1xyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pS5XHJcbiAgICBwdWJsaWMgd3JpdGUoaW5kZXg6bnVtYmVyLCBpdGVtOkUpOnZvaWR7XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY3VycmVudDpOb2RlPEU+ID0gdGhpcy5faGVhZC5uZXh0O1xyXG4gICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgaW5kZXg7IG4gKz0gMSkge1xyXG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3VycmVudC5pdGVtID0gaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICAvL+afpVxyXG4gICAgcHVibGljIHJlYWQoaW5kZXg6bnVtYmVyKTpFe1xyXG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGN1cnJlbnQ6Tm9kZTxFPiA9IHRoaXMuX2hlYWQubmV4dDtcclxuICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IGluZGV4OyBuICs9IDEpIHtcclxuICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjdXJyZW50Lml0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlYXJjaChpdGVtOkUpOm51bWJlcltde1xyXG4gICAgICAgIGxldCByZXN1bHQ6bnVtYmVyW10gPSBbXTtcclxuICAgICAgICB0aGlzLmZvcmVhY2goKGVsZTpFLCBpbmRleDpudW1iZXIpPT57XHJcbiAgICAgICAgICAgIGlmIChlbGUgPT09IGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3pk77ooajkuK3mmK/lkKblrZjlnKjmn5DkuIDlhYPntKBcclxuICAgICAqIEBwYXJhbSBpdGVtIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaGFzKGl0ZW06IEUpOmJvb2xlYW57XHJcblxyXG4gICAgICAgIGxldCBjdXJyZW50ID0gdGhpcy5faGVhZC5uZXh0O1xyXG4gICAgICAgIHdoaWxlIChjdXJyZW50ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnQuaXRlbSA9PSBpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6auY6Zi25Ye95pWwXHJcbiAgICBwdWJsaWMgZm9yZWFjaChmOihlbGU6RSwgaW5kZXg6bnVtYmVyLCBsaXN0OkxpbmtMaXN0PEU+KT0+dm9pZCk6dm9pZHtcclxuICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMuX2hlYWQubmV4dDtcclxuICAgICAgICBsZXQgbnVtOm51bWJlciA9IDA7XHJcbiAgICAgICAgd2hpbGUgKGN1cnJlbnQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgZihjdXJyZW50Lml0ZW0sIG51bSwgdGhpcyk7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbiAgICAgICAgICAgIG51bSArPSAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOivt+aaguaXtuS4jeimgeS9v+eUqOi/meS4quWHveaVsO+8jOWboOS4uuaIkeS5n+S4jeefpemBk+Wug+S8muS4jeS8mueIhueCuFxyXG4gICAgICog6Zmk6Z2e5L2g6K+76L+H6L+Z5Liq5Ye95pWw55qE5rqQ5Luj56CBXHJcbiAgICAgKiBAcGFyYW0gZiDliKTmlq3lhYPntKDkvJjlhYjnuqfnmoTlm57osIPlh73mlbBcclxuICAgICAqIEBwYXJhbSBpbmNyZWFzZSDmmK/lkKbljYfluo/vvIzpu5jorqTljYfluo9cclxuICAgICAqIEByZXR1cm5zIOi/lOWbnuS4gOS4quaOkuW6j+eahOmTvuihqFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc29ydGJ5KGY6KGVsZTpFKT0+bnVtYmVyLCBpbmNyZWFzZTpib29sZWFuID0gdHJ1ZSk6TGlua0xpc3Q8RT57XHJcbiAgICAgICAgbGV0IHByaW9yaXR5OkxpbmtMaXN0PG51bWJlcj4gPSBuZXcgTGlua0xpc3Q8bnVtYmVyPigpO1xyXG4gICAgICAgIGxldCBzb3J0ZWQ6TGlua0xpc3Q8RT4gPSBuZXcgTGlua0xpc3Q8RT4oKTtcclxuICAgICAgICBwcmlvcml0eS5wdXNoKC0wKTtcclxuICAgICAgICBzb3J0ZWQucHVzaChudWxsKTtcclxuXHJcbiAgICAgICAgbGV0IGNvbXBhcmU6KGE6bnVtYmVyLGI6bnVtYmVyKT0+Ym9vbGVhbiA9IGluY3JlYXNlPyhhLGIpPT57cmV0dXJuIGEgPCBiO306KGEsYik9PntyZXR1cm4gYSA+IGJ9O1xyXG5cclxuICAgICAgICB0aGlzLmZvcmVhY2goKGVsZSk9PntcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRQcmkgPSBmKGVsZSk7XHJcbiAgICAgICAgICAgIGxldCBub2RlOk5vZGU8RT4gPSBzb3J0ZWQuX2hlYWQubmV4dDtcclxuICAgICAgICAgICAgbGV0IHByaU5vZGU6Tm9kZTxudW1iZXI+ID0gcHJpb3JpdHkuX2hlYWQubmV4dDtcclxuXHJcbiAgICAgICAgICAgIGxldCBmb3VuZFBsYWNlOmJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgd2hpbGUgKG5vZGUubmV4dCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgKGN1cnJlbnRQcmkgPCBwcmlOb2RlLm5leHQuaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBhcmUoY3VycmVudFByaSwgcHJpTm9kZS5uZXh0Lml0ZW0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5uZXh0ID0gbmV3IE5vZGU8RT4oZWxlLCBub2RlLm5leHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHByaU5vZGUubmV4dCA9IG5ldyBOb2RlPG51bWJlcj4oY3VycmVudFByaSwgcHJpTm9kZS5uZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICBmb3VuZFBsYWNlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5uZXh0O1xyXG4gICAgICAgICAgICAgICAgcHJpTm9kZSA9IHByaU5vZGUubmV4dDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFmb3VuZFBsYWNlKSB7XHJcbiAgICAgICAgICAgICAgICBzb3J0ZWQucHVzaChlbGUpO1xyXG4gICAgICAgICAgICAgICAgcHJpb3JpdHkucHVzaChjdXJyZW50UHJpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzb3J0ZWQuc2hpZnQoKTtcclxuICAgICAgICByZXR1cm4gc29ydGVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHB1YmxpYyBiYlNvcnRCeShmOihlbGU6RSk9Pm51bWJlciwgaW5jcmVhc2U6Ym9vbGVhbiA9IHRydWUpOkxpbmtMaXN0PEU+e1xyXG5cclxuICAgIC8vIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQQXJyYXk8RT57XHJcbiAgICBwdWJsaWMgYXJyOkVbXTtcclxuICAgIHB1YmxpYyBwb2ludGVyOm51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2U6RVtdID0gW10sIGluaXRQb2ludDpudW1iZXIgPSAtMSl7XHJcbiAgICAgICAgdGhpcy5hcnIgPSBzb3VyY2U7XHJcbiAgICAgICAgdGhpcy5wb2ludGVyID0gaW5pdFBvaW50O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWFkKCk6RXtcclxuICAgICAgICByZXR1cm4gdGhpcy5hcnJbdGhpcy5wb2ludGVyXTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIHN0ZXAoKTp2b2lke1xyXG4gICAgICAgIHRoaXMucG9pbnRlciArPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgb3V0KCk6Ym9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5wb2ludGVyIDwgMCB8fCB0aGlzLnBvaW50ZXIgPj0gdGhpcy5hcnIubGVuZ3RoO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBBcnJheUFsZ297XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDovpPlhaXnmoTkuKTkuKrmlbDnu4TnmoTmr4/kuKppbmRleOWvueW6lOWFg+e0oOaYr+WQpuebuOetiVxyXG4gICAgICogQHBhcmFtIGFycjAgXHJcbiAgICAgKiBAcGFyYW0gYXJyMSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzdHJpY3RDb21wYXJlKGFycjA6Q29tcGFyYWJsZVtdLCBhcnIxOkNvbXBhcmFibGVbXSk6Ym9vbGVhbntcclxuICAgICAgICBpZiAoYXJyMC5sZW5ndGggIT09IGFycjEubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIwLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgIGlmICghYXJyMFtpXS5lcXVhbHMoYXJyMVtpXSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57kuIDkuKrpm4blkIhj77yM5LiU5L2/5b6X5a6D5YW35pyJ5aaC5LiL5oCn6LSo77yaXHJcbiAgICAgKiDlr7nkuo7mr4/kuKrlrZjlnKjkuo7pm4blkIhh5Lit55qE5YWD57Sg77yM5aaC5p6c5a6D5LiN5Zyo6ZuG5ZCIYuS4re+8jOWImeWug+WcqOmbhuWQiGPkuK1cclxuICAgICAqIOWNs2M9YS1iXHJcbiAgICAgKiBAcGFyYW0gYSBcclxuICAgICAqIEBwYXJhbSBiIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGZpbmRDb21wbGVtZW50U2V0KGE6Q29tcGFyYWJsZVtdLCBiOkNvbXBhcmFibGVbXSk6Q29tcGFyYWJsZVtde1xyXG4gICAgICAgIGxldCByZXN1bHQ6Q29tcGFyYWJsZVtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgZWxlIG9mIGEpIHtcclxuICAgICAgICAgICAgaWYgKEFycmF5QWxnby5maW5kRWxlKGVsZSwgYikgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChlbGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvL+axguebuOWvueihpembhmEtYlxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBmaW5kSW50ZXJzZWN0aW9uU2V0KGE6Q29tcGFyYWJsZVtdLCBiOkNvbXBhcmFibGVbXSl7XHJcbiAgICAgICAgLy/msYLkuqTpm4Zh4oipYlxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5rGCZWxl5ZyoYXJy5Lit55qEaW5kZXjvvIzoi6XmnKrmib7liLDliJnov5Tlm54tMVxyXG4gICAgICogZWxl5b+F6aG75a6e546wY29tcGFyYWJsZeaOpeWPo1xyXG4gICAgICogQHBhcmFtIGVsZSBcclxuICAgICAqIEBwYXJhbSBhcnIgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZmluZEVsZShlbGU6Q29tcGFyYWJsZSwgYXJyOkNvbXBhcmFibGVbXSk6bnVtYmVye1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgIGlmIChlbGUuZXF1YWxzKGFycltpXSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS7jmFycuS4reenu+mZpGVsZVxyXG4gICAgICog5aaC5p6cZWxl5LiN5a2Y5Zyo5YiZ5LuA5LmI6YO95LiN5YGaXHJcbiAgICAgKiBAcGFyYW0gZWxlIFxyXG4gICAgICogQHBhcmFtIGFyciBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByZW1vdmVFbGUoZWxlOmFueSwgYXJyOmFueVtdKTphbnlbXXtcclxuICAgICAgICBjb25zdCBpID0gYXJyLmluZGV4T2YoZWxlKTtcclxuICAgICAgICBpZiAoaSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgYXJyLnNwbGljZShpLDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG4vLyBleHBvcnQgY2xhc3MgQm94IGV4dGVuZHMgTGF5YS5SZWN0YW5nbGV7XHJcblxyXG4vLyAgICAgcHVibGljIHVuaXRYOm51bWJlcjtcclxuLy8gICAgIHB1YmxpYyB1bml0WTpudW1iZXI7XHJcbiAgICBcclxuXHJcbi8vICAgICBjb25zdHJ1Y3Rvcigpe1xyXG4vLyAgICAgICAgIHN1cGVyKDAsMCwwLDApO1xyXG4vLyAgICAgfVxyXG4gICBcclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOWwseaYr+KApuKApuadpeS4gOe7hO+8iDEwMOS4qu+8iemaj+acuueahOeisOaSnueusVxyXG4vLyAgICAgICogQHBhcmFtIHhSYW5nZSBcclxuLy8gICAgICAqIEBwYXJhbSB5UmFuZ2UgXHJcbi8vICAgICAgKiBAcGFyYW0gd2lkUmFuZ2UgXHJcbi8vICAgICAgKiBAcGFyYW0gaGlnUmFuZ2VcclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHVibGljIHN0YXRpYyByYW5kb21Cb3hlcyh4UmFuZ2U6bnVtYmVyID0gMTIwMCwgeVJhbmdlOm51bWJlciA9IDgwMCwgd2lkUmFuZ2U6bnVtYmVyID0gMzAwLCBoaWdSYW5nZTpudW1iZXIgPSAzMDApOkJveFtde1xyXG4vLyAgICAgICAgIGNvbnN0IHJhZDpGdW5jdGlvbiA9IE15TWF0aC5yYW5kb21JbnQ7XHJcbi8vICAgICAgICAgbGV0IHJlc3VsdDpCb3hbXSA9IFtdO1xyXG4vLyAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCA1MDsgaSArPSAxKSB7XHJcbi8vICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBCb3goKSk7XHJcbi8vICAgICAgICAgICAgIHJlc3VsdFtpXS5wb3MocmFkKHhSYW5nZSksIHJhZCh5UmFuZ2UpKS5zaXplKHJhZCh3aWRSYW5nZSksIHJhZChoaWdSYW5nZSkpO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIHB1YmxpYyBwb3MoeDpudW1iZXIsIHk6bnVtYmVyKTpCb3h7XHJcbi8vICAgICAgICAgdGhpcy54ID0geDtcclxuLy8gICAgICAgICB0aGlzLnkgPSB5O1xyXG4vLyAgICAgICAgIHJldHVybiB0aGlzO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIHB1YmxpYyBzaXplKHdpZHRoOm51bWJlciwgaGVpZ2h0Om51bWJlcik6Qm94e1xyXG4vLyAgICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuLy8gICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuLy8gICAgICAgICByZXR1cm4gdGhpcztcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBwdWJsaWMgaW50ZXJzZWN0c19YKHJlYzpCb3gpOmJvb2xlYW57XHJcbi8vICAgICAgICAgaWYgKHRoaXMueCA8IHJlYy54KSB7XHJcbi8vICAgICAgICAgICAgIHJldHVybiByZWMuaW50ZXJzZWN0c19YKHRoaXMpO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICByZXR1cm4gICh0aGlzLnggPj0gcmVjLnggJiYgdGhpcy54IDw9IHJlYy5yaWdodCkgfHxcclxuLy8gICAgICAgICAgICAgICAgICh0aGlzLnJpZ2h0ID49IHJlYy54ICYmIHRoaXMucmlnaHQgPD0gcmVjLnJpZ2h0KVxyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIHB1YmxpYyBpbnRlcnNlY3RzX1kocmVjOkJveCk6Ym9vbGVhbntcclxuLy8gICAgICAgICBpZiAodGhpcy55PHJlYy55KSB7XHJcbi8vICAgICAgICAgICAgIHJldHVybiByZWMuaW50ZXJzZWN0c19ZKHRoaXMpO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICByZXR1cm4gICh0aGlzLnkgPj0gcmVjLnkgJiYgdGhpcy55IDw9IHJlYy5ib3R0b20pIHx8XHJcbi8vICAgICAgICAgICAgICAgICAodGhpcy5ib3R0b20gPj0gcmVjLnkgJiYgdGhpcy5ib3R0b20gPD0gcmVjLmJvdHRvbSlcclxuLy8gICAgIH1cclxuLy8gfVxyXG4gICAgXHJcbi8vIGNsYXNzIE1hcE5vZGU8SyxWPntcclxuLy8gICAgIHB1YmxpYyBrZXk7XHJcbi8vICAgICBwdWJsaWMgdmFsdWU7XHJcbi8vICAgICBjb25zdHJ1Y3RvcihrZXk6SywgdmFsdWU6Vil7XHJcbi8vICAgICAgICAgdGhpcy5rZXkgPSBrZXk7XHJcbi8vICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4vLyAgICAgfVxyXG4vLyB9XHJcblxyXG4vLyBleHBvcnQgbW9kdWxlIFN0cnVje1xyXG4vLyAgICAgZXhwb3J0IGNsYXNzIExpbmtMaXN0PEU+e1xyXG4vLyAgICAgICAgIHByaXZhdGUgX2hlYWQ6Tm9kZTxFPjtcclxuLy8gICAgICAgICBwcml2YXRlIF90YWlsOk5vZGU8RT47XHJcbi8vICAgICAgICAgY29uc3RydWN0b3IoKXtcclxuLy8gICAgICAgICAgICAgdGhpcy5faGVhZCA9IG5ldyBOb2RlPEU+KG51bGwsIG51bGwpO1xyXG4vLyAgICAgICAgICAgICB0aGlzLl90YWlsID0gbmV3IE5vZGU8RT4obnVsbCwgbnVsbCk7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvL+WfuuehgOWxnuaAp1xyXG4vLyAgICAgICAgIHB1YmxpYyBnZXQgbGVuZ3RoKCk6bnVtYmVye1xyXG4vLyAgICAgICAgICAgICBsZXQgcmVzdWx0Om51bWJlciA9IDA7XHJcbi8vICAgICAgICAgICAgIGxldCBjdXJyZW50Ok5vZGU8RT4gPSB0aGlzLl9oZWFkO1xyXG4vLyAgICAgICAgICAgICB3aGlsZSAoY3VycmVudC5uZXh0ICE9PSBudWxsKSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXN1bHQgKz0gMTtcclxuLy8gICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIHB1YmxpYyBnZXQgaXNFbXB0eSgpOmJvb2xlYW57XHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLl9oZWFkLm5leHQgPT09IG51bGw7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvL+WinuWIoOaUueafpVxyXG4vLyAgICAgICAgIC8v5aKeXHJcbi8vICAgICAgICAgcHVibGljIHB1c2goaXRlbTpFKTp2b2lke1xyXG4vLyAgICAgICAgICAgICBsZXQgbGFzdDpOb2RlPEU+ID0gbmV3IE5vZGU8RT4oaXRlbSwgbnVsbCk7XHJcbi8vICAgICAgICAgICAgIGlmICh0aGlzLmlzRW1wdHkpIHtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuX2hlYWQubmV4dCA9IGxhc3Q7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLl90YWlsLm5leHQgPSBsYXN0O1xyXG4vLyAgICAgICAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0Lm5leHQgPSBsYXN0O1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0ID0gbGFzdDtcclxuLy8gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIHB1YmxpYyB1bnNoaWZ0KGl0ZW06RSk6dm9pZHtcclxuLy8gICAgICAgICAgICAgbGV0IGZpcnN0Ok5vZGU8RT4gPSBuZXcgTm9kZTxFPihpdGVtLCBudWxsKTtcclxuLy8gICAgICAgICAgICAgaWYgKHRoaXMuaXNFbXB0eSkge1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0ID0gZmlyc3Q7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLl9oZWFkLm5leHQgPSBmaXJzdDtcclxuLy8gICAgICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgIGZpcnN0Lm5leHQgPSB0aGlzLl9oZWFkLm5leHQubmV4dDtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuX2hlYWQubmV4dCA9IGZpcnN0O1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBwdWJsaWMgaW5zZXJ0KGluZGV4Om51bWJlciwgaXRlbTpFKTpib29sZWFue1xyXG4vLyAgICAgICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID4gdGhpcy5sZW5ndGgpIHsvL+i/meWPpeS4jeS4gOagt1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBpZiAoaW5kZXggPT09IHRoaXMubGVuZ3RoKSB7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLnB1c2goaXRlbSk7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IGN1cnJlbnQ6Tm9kZTxFPiA9IHRoaXMuX2hlYWQ7Ly/ov5nlj6Xlkozlhbbku5bpgY3ljobmmK/kuI3kuIDmoLfnmoTvvIzlm6DkuLropoHpgInlj5bliLDpgInlrprkvY3nva7nmoTliY3pnaLkuIDmoLxcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBpbmRleDsgbiArPSAxKSB7XHJcbi8vICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBjdXJyZW50Lm5leHQgPSBuZXcgTm9kZTxFPihpdGVtLCBjdXJyZW50Lm5leHQpO1xyXG5cclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvL+WIoFxyXG4vLyAgICAgICAgIHB1YmxpYyByZW1vdmUoaW5kZXg6bnVtYmVyKTpFe1xyXG4vLyAgICAgICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMubGVuZ3RoKSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IGN1cnJlbnQ6Tm9kZTxFPiA9IHRoaXMuX2hlYWQubmV4dDtcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBpbmRleDsgbiArPSAxKSB7XHJcbi8vICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgaXRlbTpFID0gY3VycmVudC5pdGVtO1xyXG4vLyAgICAgICAgICAgICBjdXJyZW50ID0gbnVsbDtcclxuXHJcbi8vICAgICAgICAgICAgIHJldHVybiBjdXJyZW50Lml0ZW07XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBwdWJsaWMgc2hpZnQoKTpFe1xyXG4vLyAgICAgICAgICAgICBpZiAodGhpcy5pc0VtcHR5KSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLl9oZWFkLm5leHQuaXRlbTtcclxuLy8gICAgICAgICAgICAgdGhpcy5faGVhZC5uZXh0ID0gdGhpcy5faGVhZC5uZXh0Lm5leHQ7XHJcbi8vICAgICAgICAgICAgIGlmICh0aGlzLmlzRW1wdHkpIHtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuX3RhaWwubmV4dCA9IG51bGw7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvL+aUuVxyXG4vLyAgICAgICAgIHB1YmxpYyB3cml0ZShpbmRleDpudW1iZXIsIGl0ZW06RSk6dm9pZHtcclxuLy8gICAgICAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLmxlbmd0aCkge1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgY3VycmVudDpOb2RlPEU+ID0gdGhpcy5faGVhZC5uZXh0O1xyXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IGluZGV4OyBuICs9IDEpIHtcclxuLy8gICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIGN1cnJlbnQuaXRlbSA9IGl0ZW07XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvL+afpVxyXG4vLyAgICAgICAgIHB1YmxpYyByZWFkKGluZGV4Om51bWJlcik6RXtcclxuLy8gICAgICAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLmxlbmd0aCkge1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgY3VycmVudDpOb2RlPEU+ID0gdGhpcy5faGVhZC5uZXh0O1xyXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IGluZGV4OyBuICs9IDEpIHtcclxuLy8gICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIHJldHVybiBjdXJyZW50Lml0ZW07XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBwdWJsaWMgc2VhcmNoKGl0ZW06RSk6bnVtYmVyW117XHJcbi8vICAgICAgICAgICAgIGxldCByZXN1bHQ6bnVtYmVyW10gPSBbXTtcclxuLy8gICAgICAgICAgICAgdGhpcy5mb3JlYWNoKChlbGU6RSwgaW5kZXg6bnVtYmVyKT0+e1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKGVsZSA9PT0gaXRlbSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGluZGV4KTtcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfSk7XHJcbi8vICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvKipcclxuLy8gICAgICAgICAgKiDliKTmlq3pk77ooajkuK3mmK/lkKblrZjlnKjmn5DkuIDlhYPntKBcclxuLy8gICAgICAgICAgKiBAcGFyYW0gaXRlbSBcclxuLy8gICAgICAgICAgKi9cclxuLy8gICAgICAgICBwdWJsaWMgaGFzKGl0ZW06IEUpOmJvb2xlYW57XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMuX2hlYWQubmV4dDtcclxuLy8gICAgICAgICAgICAgd2hpbGUgKGN1cnJlbnQgIT0gbnVsbCkge1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQuaXRlbSA9PSBpdGVtKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvL+mrmOmYtuWHveaVsFxyXG4vLyAgICAgICAgIHB1YmxpYyBmb3JlYWNoKGY6KGVsZTpFLCBpbmRleDpudW1iZXIsIGxpc3Q6TGlua0xpc3Q8RT4pPT52b2lkKTp2b2lke1xyXG4vLyAgICAgICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMuX2hlYWQubmV4dDtcclxuLy8gICAgICAgICAgICAgbGV0IG51bTpudW1iZXIgPSAwO1xyXG4vLyAgICAgICAgICAgICB3aGlsZSAoY3VycmVudCAhPT0gbnVsbCkge1xyXG4vLyAgICAgICAgICAgICAgICAgZihjdXJyZW50Lml0ZW0sIG51bSwgdGhpcyk7XHJcbi8vICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4vLyAgICAgICAgICAgICAgICAgbnVtICs9IDE7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIC8qKlxyXG4vLyAgICAgICAgICAqIOivt+aaguaXtuS4jeimgeS9v+eUqOi/meS4quWHveaVsO+8jOWboOS4uuaIkeS5n+S4jeefpemBk+Wug+S8muS4jeS8mueIhueCuFxyXG4vLyAgICAgICAgICAqIOmZpOmdnuS9oOivu+i/h+i/meS4quWHveaVsOeahOa6kOS7o+eggVxyXG4vLyAgICAgICAgICAqIEBwYXJhbSBmIOWIpOaWreWFg+e0oOS8mOWFiOe6p+eahOWbnuiwg+WHveaVsFxyXG4vLyAgICAgICAgICAqIEBwYXJhbSBpbmNyZWFzZSDmmK/lkKbljYfluo/vvIzpu5jorqTljYfluo9cclxuLy8gICAgICAgICAgKiBAcmV0dXJucyDov5Tlm57kuIDkuKrmjpLluo/nmoTpk77ooahcclxuLy8gICAgICAgICAgKi9cclxuLy8gICAgICAgICBwdWJsaWMgc29ydGJ5KGY6KGVsZTpFKT0+bnVtYmVyLCBpbmNyZWFzZTpib29sZWFuID0gdHJ1ZSk6TGlua0xpc3Q8RT57XHJcbi8vICAgICAgICAgICAgIGxldCBwcmlvcml0eTpMaW5rTGlzdDxudW1iZXI+ID0gbmV3IExpbmtMaXN0PG51bWJlcj4oKTtcclxuLy8gICAgICAgICAgICAgbGV0IHNvcnRlZDpMaW5rTGlzdDxFPiA9IG5ldyBMaW5rTGlzdDxFPigpO1xyXG4vLyAgICAgICAgICAgICBwcmlvcml0eS5wdXNoKC0wKTtcclxuLy8gICAgICAgICAgICAgc29ydGVkLnB1c2gobnVsbCk7XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgY29tcGFyZTooYTpudW1iZXIsYjpudW1iZXIpPT5ib29sZWFuID0gaW5jcmVhc2U/KGEsYik9PntyZXR1cm4gYSA8IGI7fTooYSxiKT0+e3JldHVybiBhID4gYn07XHJcblxyXG4vLyAgICAgICAgICAgICB0aGlzLmZvcmVhY2goKGVsZSk9PntcclxuLy8gICAgICAgICAgICAgICAgIGxldCBjdXJyZW50UHJpID0gZihlbGUpO1xyXG4vLyAgICAgICAgICAgICAgICAgbGV0IG5vZGU6Tm9kZTxFPiA9IHNvcnRlZC5faGVhZC5uZXh0O1xyXG4vLyAgICAgICAgICAgICAgICAgbGV0IHByaU5vZGU6Tm9kZTxudW1iZXI+ID0gcHJpb3JpdHkuX2hlYWQubmV4dDtcclxuXHJcbi8vICAgICAgICAgICAgICAgICBsZXQgZm91bmRQbGFjZTpib29sZWFuID0gZmFsc2U7XHJcbi8vICAgICAgICAgICAgICAgICB3aGlsZSAobm9kZS5uZXh0ICE9PSBudWxsKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGN1cnJlbnRQcmkgPCBwcmlOb2RlLm5leHQuaXRlbSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIGlmIChjb21wYXJlKGN1cnJlbnRQcmksIHByaU5vZGUubmV4dC5pdGVtKSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLm5leHQgPSBuZXcgTm9kZTxFPihlbGUsIG5vZGUubmV4dCk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHByaU5vZGUubmV4dCA9IG5ldyBOb2RlPG51bWJlcj4oY3VycmVudFByaSwgcHJpTm9kZS5uZXh0KTtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgZm91bmRQbGFjZSA9IHRydWU7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IG5vZGUubmV4dDtcclxuLy8gICAgICAgICAgICAgICAgICAgICBwcmlOb2RlID0gcHJpTm9kZS5uZXh0O1xyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgICAgIGlmICghZm91bmRQbGFjZSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHNvcnRlZC5wdXNoKGVsZSk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcHJpb3JpdHkucHVzaChjdXJyZW50UHJpKTtcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfSk7XHJcblxyXG4vLyAgICAgICAgICAgICBzb3J0ZWQuc2hpZnQoKTtcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHNvcnRlZDtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIC8vIHB1YmxpYyBiYlNvcnRCeShmOihlbGU6RSk9Pm51bWJlciwgaW5jcmVhc2U6Ym9vbGVhbiA9IHRydWUpOkxpbmtMaXN0PEU+e1xyXG5cclxuLy8gICAgICAgICAvLyB9XHJcblxyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIGV4cG9ydCBjbGFzcyBNYXA8SyxWPntcclxuLy8gICAgICAgICBwcml2YXRlIF9saXN0OkFycmF5PE1hcE5vZGU8SyxWPj5cclxuLy8gICAgICAgICBjb25zdHJ1Y3Rvcigpe1xyXG4vLyAgICAgICAgICAgICB0aGlzLl9saXN0ID0gW11cclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcHVibGljIGdldChrZXk6Syk6VntcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgZWxlIG9mIHRoaXMuX2xpc3Qpe1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKGVsZS5rZXkgPT09IGtleSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGUudmFsdWVcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gbnVsbFxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBwdWJsaWMgZ2V0S2V5QnlWYWwodmFsOlYpOkt7XHJcbi8vICAgICAgICAgICAgIGZvciAobGV0IGVsZSBvZiB0aGlzLl9saXN0KSB7XHJcbi8vICAgICAgICAgICAgICAgICBpZiAoZWxlLnZhbHVlID09PSB2YWwpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlLmtleVxyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHJldHVybiBudWxsXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHB1YmxpYyBrZXlFeGlzdChrZXk6Syk6Ym9vbGVhbntcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgZWxlIG9mIHRoaXMuX2xpc3QpIHtcclxuLy8gICAgICAgICAgICAgICAgIGlmIChlbGUua2V5ID09PSBrZXkpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBwdWJsaWMgc2V0KGtleTpLLHZhbHVlOlYpOmJvb2xlYW57XHJcbi8vICAgICAgICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgdGhpcy5fbGlzdC5sZW5ndGg7IG4gKz0gMSkge1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xpc3Rbbl0ua2V5ID09PSBrZXkpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLl9saXN0W25dLnZhbHVlID0gdmFsdWVcclxuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgdGhpcy5fbGlzdC5wdXNoKG5ldyBNYXBOb2RlPEssVj4oa2V5LHZhbHVlKSlcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHB1YmxpYyBiYXRjaFNldChrZXlzOktbXSwgdmFsdWVzOlZbXSk6Ym9vbGVhbntcclxuLy8gICAgICAgICAgICAgaWYgKGtleXMubGVuZ3RoICE9PSB2YWx1ZXMubGVuZ3RoKSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBrZXlzLmxlbmd0aDsgbiArPSAxKSB7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLnNldChrZXlzW25dLCB2YWx1ZXNbbl0pO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG5cclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcHVibGljIHJlbW92ZShrZXk6Syk6Ym9vbGVhbntcclxuLy8gICAgICAgICAgICAgbGV0IGNvdW50Om51bWJlciA9IDA7XHJcbi8vICAgICAgICAgICAgIGZvciAobGV0IGVsZSBvZiB0aGlzLl9saXN0KSB7XHJcbi8vICAgICAgICAgICAgICAgICBpZiAoZWxlLmtleSA9PT0ga2V5KSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGlzdC5zcGxpY2UoY291bnQsMSk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIGNvdW50ICs9IDE7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHB1YmxpYyBnZXQgbGVuZ3RoKCk6bnVtYmVye1xyXG4vLyAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdC5sZW5ndGhcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcHVibGljIGZvcmVhY2goZjooazpLLCB2OlYpPT52b2lkKTp2b2lke1xyXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBlbGUgb2YgdGhpcy5fbGlzdCkge1xyXG4vLyAgICAgICAgICAgICAgICAgZihlbGUua2V5LCBlbGUudmFsdWUpO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHJldHVybjtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcHVibGljIGZpbHRlcihmOihrOkssdjpWKT0+Ym9vbGVhbik6TWFwPEssVj57XHJcbi8vICAgICAgICAgICAgIGxldCByZXN1bHQgPSBuZXcgTWFwPEssVj4oKTtcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgZWxlIG9mIHRoaXMuX2xpc3QpIHtcclxuLy8gICAgICAgICAgICAgICAgIGlmIChmKGVsZS5rZXksIGVsZS52YWx1ZSkpe1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zZXQoZWxlLmtleSwgZWxlLnZhbHVlKTtcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBleHBvcnQgY2xhc3MgUG9pbnRlckxpc3Q8RT57XHJcbi8vICAgICAgICAgcHJpdmF0ZSBfbGlzdDpBcnJheTxFPiA9IFtdO1xyXG4vLyAgICAgICAgIHByaXZhdGUgX3BvaW50ZXI6bnVtYmVyID0gMDtcclxuLy8gICAgICAgICBjb25zdHJ1Y3Rvcihzb3VyY2U6QXJyYXk8RT4gPSBbXSwgaW5pdFBvaW50Om51bWJlciA9IDApe1xyXG4vLyAgICAgICAgICAgICBzb3VyY2UuZm9yRWFjaCgoZWxlKT0+e1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5fbGlzdC5wdXNoKGVsZSk7XHJcbi8vICAgICAgICAgICAgIH0pXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBnZXQgZXhjZWVkaW5nKCk6Ym9vbGVhbntcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BvaW50ZXIgPj0gdGhpcy5fbGlzdC5sZW5ndGggfHwgdGhpcy5fcG9pbnRlciA8IDBcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIC8qXHJcbi8vICAgICAgICAg5Lul5LiL5rOo6YeK5Lit77yM5oqK5pWw57uE55yL5L2c5qiq5ZCR5o6S5YiX55qE5LiA57O75YiX5YWD57SgXHJcbi8vICAgICAgICAgaW5kZXggPSAw55qE5YWD57Sg5Zyo5pyA5bem5L6nXHJcbi8vICAgICAgICAgKi9cclxuXHJcbi8vICAgICAgICAgcmVhZCgpOkV7Ly/mn6XnnIvlvZPliY1wb2ludGVy5omA5oyH55qE5YWD57SgXHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLl9saXN0W3RoaXMuX3BvaW50ZXJdXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBzdGVwKCk6RXsvL3BvaW50ZXLlkJHlj7Pnp7vkuIDmraVcclxuLy8gICAgICAgICAgICAgdGhpcy5fcG9pbnRlcis9MTtcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVhZCgpO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgdG8ocGxhY2U6bnVtYmVyKTpQb2ludGVyTGlzdDxFPnsvL3BvaW50ZXLnp7vliLDmjIflrprkvY3nva5cclxuLy8gICAgICAgICAgICAgdGhpcy5fcG9pbnRlciA9IHBsYWNlXHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBwdXNoKGRhdGE6RSk6UG9pbnRlckxpc3Q8RT57Ly/lnKjmlbDnu4TmnKvlsL7lop7liqDkuIDkuKrlhYPntKBcclxuLy8gICAgICAgICAgICAgdGhpcy5fbGlzdC5wdXNoKGRhdGEpXHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBzZXQoaW5kZXg6bnVtYmVyLGRhdGE6RSk6UG9pbnRlckxpc3Q8RT57Ly/opoblhpnmlbDnu4TnibnlrpppbmRleOS4reeahOWFg+e0oFxyXG4vLyAgICAgICAgICAgICB0aGlzLl9saXN0W2luZGV4XSA9IGRhdGFcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXNcclxuLy8gICAgICAgICB9XHJcbiAgICAgICAgXHJcbi8vICAgICAgICAgbmV4dChzaGlmdDpudW1iZXIgPSAxKTpFe1xyXG4vLyAgICAgICAgICAgICAvL+ivu+WPluS9jeS6juW9k+WJjXBvaW50ZXLmiYDmjIfnmoTlhYPntKDlj7Povrnoi6XlubLmoLznmoTlhYPntKBcclxuLy8gICAgICAgICAgICAgLy9zaGlmdOm7mOiupOS4ujHvvIzljbPlvZPliY1wb2ludGVy5Y+z6L6555u46YK755qE5YWD57SgXHJcbi8vICAgICAgICAgICAgIC8vc2hpZnTkuLrotJ/mlbDml7bojrflj5blt6bkvqfnmoTlhYPntKBcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RbdGhpcy5fcG9pbnRlcitzaGlmdF1cclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIGdldCBsZW5ndGgoKTpudW1iZXJ7Ly/ojrflj5bmlbDnu4Tplb/luqZcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3QubGVuZ3RoXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBnZXQgbGFzdCgpOkV7Ly/ojrflj5bmnIDlkI7kuIDpoblcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RbdGhpcy5fbGlzdC5sZW5ndGgtMV1cclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIGdldCBmaXJzdCgpOkV7Ly/ojrflj5bpppbpoblcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RbMF07XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBnZXQgcG9pbnRlcigpOm51bWJlcnsvL+iOt+WPlnBvaW50ZXJcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BvaW50ZXJcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIGdldCBhdEVuZCgpOmJvb2xlYW57Ly/mn6XnnIvigJxwb2ludGVy5oyH5ZCR5pWw57uE5pyA5Y+z5L6n55qE5YWD57Sg4oCd55qE55yf5YC8XHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wb2ludGVyID09PSB0aGlzLl9saXN0Lmxlbmd0aCAtIDFcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcbi8vIH0iLCIvL1RPRE9cclxuLy/mlL7nva7miJHku6zpobnnm67ph4zoh6rlrprkuYnnmoTpgJrnlKhLRVnlgLzooahcclxuLy/mlL7lnKjlkIzkuIDkuKrmlofku7bph4zmnInliqnkuo7nu5PmnoTmuIXmmbBcclxuLy/lj6bvvJrlpoLmnpzlj6rmnInmn5DnibnlrprmqKHlnZfns7vnu5/ph4zkvb/nlKjnmoRlbnVt5Y+v5Lul5LiN5pS+6L+H5p2lIOebtOaOpeWGmeWcqOaooeWdl+aWh+S7tuS4rVxyXG5cclxuLy/lj4jlj6bvvJog5bu66K6u5Zyo5L2/55SoZW51beeahOaXtuWAmeWKoOS4gOS4quepuuWAvE5vbmXku6XlupTlr7nliKTlrprpl67pophcclxuXHJcbmV4cG9ydCBlbnVtIEFjdG9yVHlwZSB7XHJcbiAgICBOb25lLFxyXG4gICAgT3BlcmF0b3IsXHJcbiAgICBNb25zdGVyLFxyXG4gICAgVG9rZW5cclxuICAgIC8v6L+Z5YW25a6e5piv5a+55bqU55qE5LiN5ZCM55qE5pWw5o2u5qih5p2/XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIENhbXBUeXBlIHtcclxuICAgIE5vbmUsXHJcbiAgICBTZWxmLCAgIC8v5oiR5pa5XHJcbiAgICBFbmVteSAgIC8v5pWM5pa5XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9kTG9nIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogRG9kTG9nO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSW5zdGFuY2UoKTogRG9kTG9nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2UgfHwgKHRoaXMuX2luc3RhbmNlID0gbmV3IHRoaXMoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBkZWJ1Zyhtc2c6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIG1zZyA9IGAke21zZ31gO1xyXG4gICAgICAgIGNvbnNvbGUuZGVidWcobXNnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGluZm8obXNnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBtc2cgPSBgJHttc2d9YDtcclxuICAgICAgICBjb25zb2xlLmluZm8obXNnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHdhcm4obXNnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBtc2cgPSBgJHttc2d9YDtcclxuICAgICAgICBjb25zb2xlLndhcm4obXNnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGVycm9yKG1zZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgbXNnID0gYCR7bXNnfWA7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihtc2cpO1xyXG4gICAgICAgIERvZExvZy5JbnN0YW5jZS5fd3JpdGVUb0ZpbGUobXNnKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF93cml0ZVRvRmlsZShsb2c6IHN0cmluZykge1xyXG4gICAgICAgIC8vVE9ET1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGludGVyZmFjZSBDb21wYXJhYmxle1xyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3kuKTkuKrlhYPntKDmmK/lkKbnm7jnrYlcclxuICAgICAqIOW/hemhu+WPr+mAhlxyXG4gICAgICogQHBhcmFtIGVsZSBcclxuICAgICAqL1xyXG4gICAgZXF1YWxzKGVsZTpDb21wYXJhYmxlKTpib29sZWFuXHJcbn1cclxuICAgIFxyXG5leHBvcnQgY2xhc3MgRG9kTWF0aHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnmEvYueahOaVtOaVsOe7k+aenO+8iOWwj+aVsOmDqOWIhuiIjeWOuylcclxuICAgICAqIGHvvIxi5aaC5p6c5LiN5Zyo5q2j5pW05pWw5Z+f77yM6K+356Gu5L+d6ZiF6K+76L+H5q2k5Ye95pWwXHJcbiAgICAgKiB84oCU4oCU4oCU4oCUfOKAlOKAlOKAlOKAlHzigJTigJTigJTigJR84oCU4oCU4oCU4oCUfOKAlOKAlOKAlOKAlHxcclxuICAgICAqICAgICAtMTwtLS0wPC0tLTE8LS0tXHJcbiAgICAgKiAgICAgIOWPr+S7peeQhuino+S4uuWcqOaVsOi9tOS4iuaKiue7k+aenOWQkeW3puaYoOWwhFxyXG4gICAgICogQHBhcmFtIGEgXHJcbiAgICAgKiBAcGFyYW0gYiBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBpbnREaXZpc2lvbihhOm51bWJlciwgYjpudW1iZXIpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gKGEtYSViKS9iO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Zyo5bmz6Z2i5LiK5rGC5LuO5oyH5a6a5Ye65Y+R54K55Yiw5oyH5a6a57uI54K55L2c5LiA5p2h5oyH5a6a6ZW/5bqm55qE57q/5q6177yM5q2k57q/5q6155qE5Y+m5LiA56uv54K555qE5Z2Q5qCHXHJcbiAgICAgKiDvvIjlpoLmnpzmraTnur/mrrXnmoTplb/luqblpKfkuo7nrYnkuo7lh7rlj5HngrnliLDnu4jngrnnmoTot53nprvvvIzliJnovpPlh7rnu4jngrnnmoTlnZDmoIfvvIlcclxuICAgICAqIEBwYXJhbSBmcm9tIFxyXG4gICAgICogQHBhcmFtIGVuZCBcclxuICAgICAqIEBwYXJhbSBtb3ZlbWVudCBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBtb3ZlVG8oZnJvbTpWZWMyLCBlbmQ6VmVjMiwgbW92ZW1lbnQ6bnVtYmVyKTpWZWMye1xyXG4gICAgICAgIGNvbnN0IHhkaXMgPSBlbmQueCAtIGZyb20ueDtcclxuICAgICAgICBjb25zdCB5ZGlzID0gZW5kLnkgLSBmcm9tLnk7XHJcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoKHhkaXMpKioyICsgKHlkaXMpKioyKTtcclxuICAgICAgICBpZiAobW92ZW1lbnQgPj0gZGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVuZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcmF0aW8gPSBtb3ZlbWVudCAvIGRpc3RhbmNlO1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjMihmcm9tLnggKyB4ZGlzKnJhdGlvLGZyb20ueSArIHlkaXMqcmF0aW8pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTXlNYXRoLm1vdmVUb+WHveaVsOeahOWPpuS4gOS4queJiOacrOOAgui/meS4queJiOacrOS8muebtOaOpeS/ruaUuShmcm9tOlZlYzIp5Lyg5YWl55qE5a+56LGh5pys6Lqr77yM5bm25Yik5pat5pyA57uIZnJvbeS4jmVuZOS4pOS4quWvueixoeaYr+WQpumHjeWQiFxyXG4gICAgICogQHBhcmFtIGZyb20gXHJcbiAgICAgKiBAcGFyYW0gZW5kIFxyXG4gICAgICogQHBhcmFtIG1vdmVtZW50IFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG1vdmVUb1NpZGVFZmZlY3QoZnJvbTpWZWMyLCBlbmQ6VmVjMiwgbW92ZW1lbnQ6bnVtYmVyKTpib29sZWFue1xyXG4gICAgICAgIGNvbnN0IHhkaXMgPSBlbmQueCAtIGZyb20ueDtcclxuICAgICAgICBjb25zdCB5ZGlzID0gZW5kLnkgLSBmcm9tLnk7XHJcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoKHhkaXMpKioyICsgKHlkaXMpKioyKTtcclxuICAgICAgICBpZiAobW92ZW1lbnQgPj0gZGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgZnJvbS54ID0gZW5kLng7XHJcbiAgICAgICAgICAgIGZyb20ueSA9IGVuZC55O1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcmF0aW8gPSBtb3ZlbWVudCAvIGRpc3RhbmNlO1xyXG4gICAgICAgIGZyb20ueCA9IGZyb20ueCArIHhkaXMqcmF0aW87XHJcbiAgICAgICAgZnJvbS55ID0gZnJvbS55ICsgeWRpcypyYXRpbztcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNeU1hdGgubW92ZVRv5Ye95pWw55qE5Y+m5LiA5Liq54mI5pys44CC6L+U5Zue55u057q/6YCf5bqm5ZyoeHnkuKTovbTkuIrnmoTliIbph49cclxuICAgICAqIEBwYXJhbSBmcm9tIFxyXG4gICAgICogQHBhcmFtIGVuZCBcclxuICAgICAqIEBwYXJhbSBtb3ZlbWVudCBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBtb3ZlVG9Db21wb25lbnQoZnJvbTpWZWMyLCBlbmQ6VmVjMiwgbW92ZW1lbnQ6bnVtYmVyKTpWZWMye1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IHhkaXMgPSBlbmQueCAtIGZyb20ueDtcclxuICAgICAgICBjb25zdCB5ZGlzID0gZW5kLnkgLSBmcm9tLnk7XHJcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoKHhkaXMpKioyICsgKHlkaXMpKioyKTtcclxuICAgICAgICBjb25zdCByYXRpbyA9IG1vdmVtZW50IC8gZGlzdGFuY2U7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMyKHhkaXMqcmF0aW8sIHlkaXMqcmF0aW8pO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBWZWMyIGltcGxlbWVudHMgQ29tcGFyYWJsZXtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGxpc3RGcm9tTGlzdChsaXN0Om51bWJlcltdW10pOlZlYzJbXXtcclxuICAgICAgICBsZXQgcmVzdWx0OlZlYzJbXSA9IFtdO1xyXG5cclxuICAgICAgICBsaXN0LmZvckVhY2goZWxlPT57XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBWZWMyKGVsZVswXSxlbGVbMV0pKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgeDpudW1iZXI7XHJcbiAgICBwdWJsaWMgeTpudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57ku47mraTngrnliLDmjIflrprngrnnmoTot53nprtcclxuICAgICAqIEBwYXJhbSBlbmQgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXN0YW5jZVRvKGVuZDpWZWMyKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuICgoZW5kLnggLSB0aGlzLngpKioyICsgKGVuZC55IC0gdGhpcy55KSoqMikqKjAuNTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaxguWSjOS4pOS4qlZlY++8jOi/lOWbnue7k+aenO+8jOS4jeS/ruaUueWOn+WunuS+i1xyXG4gICAgICogQHBhcmFtIHZlYyBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHBsdXModmVjOlZlYzIpOlZlYzJ7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMyKHRoaXMueCArIHZlYy54LCB0aGlzLnkgKyB2ZWMueSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDku6XovpPlhaXlnZDmoIfkuLrkuK3lv4Pov5vooYzpobrml7bpkog5MOW6puaXi+i9rFxyXG4gICAgICog77yI5pyq5a6M5oiQ77yJXHJcbiAgICAgKiBAcGFyYW0gY2VudHJlIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcm90YXRlQ2xvY2t3aXNlKGNlbnRyZTpWZWMyKTpWZWMye1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue5q2k5ZCR6YeP55qE5aSN5Yi2XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbG9uZSgpOlZlYzJ7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMyKHRoaXMueCwgdGhpcy55KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXF1YWxzKGVsZTpWZWMyKTpib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLnggPT09IGVsZS54ICYmIHRoaXMueSA9PT0gZWxlLnk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoeD86bnVtYmVyLCB5PzpudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iLCIvL2F1dGhvciBOYTJDdUM0TzhcclxuXHJcblxyXG5pbXBvcnQgQ3VzdG9taXplZFNwcml0ZSBmcm9tIFwiLi9jdXN0b21pemVkU3ByXCI7XHJcbmltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi4vLi4vRG9kTWF0aFwiO1xyXG5pbXBvcnQgeyBFdmVudENlbnRyZSB9IGZyb20gXCIuLi8uLi8uLi9FdmVudC9FdmVudENlbnRyZVwiO1xyXG5pbXBvcnQgeyBNeVN5bWJvbCB9IGZyb20gXCIuLi8uLi8uLi9GaXgvRml4U3ltYm9sXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQmFye1xyXG5cclxuICAgIHByaXZhdGUgX2luaXRQb3M6VmVjMjsvL+i1t+Wni+WdkOagh1xyXG4gICAgcHJpdmF0ZSBfaW5pdFNpemU6VmVjMjsvL+i1t+Wni+Wkp+Wwj1xyXG4gICAgcHJpdmF0ZSBfcG9zOlZlYzI7Ly/nvKnmlL7lkI7lnZDmoIdcclxuICAgIHByaXZhdGUgX3NpemU6VmVjMjsvL+e8qeaUvuWQjuWkp+Wwj1xyXG4gICAgcHJpdmF0ZSBfc2NhbGU6bnVtYmVyID0gMTsvL+WFqOWxgOe8qeaUvuavlFxyXG4gICAgcHJpdmF0ZSBfc3ltYk51bTpudW1iZXI7Ly/ov5vluqbmnaHnvJblj7dcclxuICAgIHByaXZhdGUgX2JhY2tTcHI6Q3VzdG9taXplZFNwcml0ZTsvL+i/m+W6puadoeW6leWxgue7mOWbvuiKgueCuVxyXG4gICAgcHJpdmF0ZSBfZnJvbnRTcHI6Q3VzdG9taXplZFNwcml0ZTsvL+i/m+W6puadoemhtuWxgue7mOWbvuiKgueCuVxyXG4gICAgcHJpdmF0ZSBfcGVyY2VudGFnZTpudW1iZXIgPSAxOy8v6L+b5bqmXHJcbiAgICBwcml2YXRlIF9oZWlnaHQ6bnVtYmVyOy8v6L+b5bqm5p2h6auY5bqmXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+b5bqm5p2h5p6E6YCg5ZmoXHJcbiAgICAgKiBAcGFyYW0gc3ltYk51bSDov5vluqbmnaHnvJblj7dcclxuICAgICAqIEBwYXJhbSBiYWNrR3JvdW5kQ29sb3Ig6IOM5pmv6aKc6ImyXHJcbiAgICAgKiBAcGFyYW0gc2l6ZSDlpKflsI9cclxuICAgICAqIEBwYXJhbSBwb3Mg5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gc2NhbGUg5YWo5bGA57yp5pS+5q+UXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHN5bWJOdW06bnVtYmVyLCBiYWNrR3JvdW5kQ29sb3I6c3RyaW5nLHNpemU6VmVjMiAscG9zOlZlYzIsIHNjYWxlOm51bWJlciA9IDEpe1xyXG4gICAgICAgIHRoaXMuX3N5bWJOdW0gPSBzeW1iTnVtO1xyXG4gICAgICAgIHRoaXMuX2luaXRTaXplID0gc2l6ZTtcclxuICAgICAgICB0aGlzLl9zY2FsZSA9IHNjYWxlO1xyXG4gICAgICAgIHRoaXMuX3NpemUgPSBuZXcgVmVjMih0aGlzLl9pbml0U2l6ZS54KnRoaXMuX3BlcmNlbnRhZ2UqdGhpcy5fc2NhbGUsdGhpcy5faW5pdFNpemUueSp0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5faW5pdFBvcyA9IHBvcztcclxuICAgICAgICB0aGlzLl9wb3MgPSBuZXcgVmVjMih0aGlzLl9pbml0UG9zLngqdGhpcy5fc2NhbGUsdGhpcy5faW5pdFBvcy55KnRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9iYWNrU3ByID0gbmV3IEN1c3RvbWl6ZWRTcHJpdGUoKTtcclxuICAgICAgICB0aGlzLl9iYWNrU3ByLnNldFBhcmFtKHRoaXMuX3Bvcy54LHRoaXMuX3Bvcy55LHRoaXMuX3NpemUueCx0aGlzLl9zaXplLnksYmFja0dyb3VuZENvbG9yKTtcclxuICAgICAgICB0aGlzLl9iYWNrU3ByLmNoYW5nZUNvbG9yKCk7XHJcbiAgICAgICAgdGhpcy5fZnJvbnRTcHIgPSBuZXcgQ3VzdG9taXplZFNwcml0ZSgpO1xyXG4gICAgICAgIHRoaXMuX2JhY2tTcHIuYWRkQ2hpbGQodGhpcy5fZnJvbnRTcHIpO1xyXG4gICAgICAgIHRoaXMuX2Zyb250U3ByLnNldFBhcmFtKDAsMCx0aGlzLl9zaXplLngsdGhpcy5fc2l6ZS55LFwiIzhiOGI4M1wiLG5ldyBWZWMyKHRoaXMuX3NjYWxlLHRoaXMuX3NjYWxlKSk7XHJcbiAgICAgICAgdGhpcy5fZnJvbnRTcHIuY2hhbmdlQ29sb3IoKTtcclxuICAgICAgICB0aGlzLl9oZWlnaHQgPSB0aGlzLl9pbml0U2l6ZS55O1xyXG4gICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLm9uKEV2ZW50Q2VudHJlLkVUeXBlLlBFUkZPUk1BTkNFX1JFU0NBTEUoKSx0aGlzLHRoaXMucmVTY2FsZSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5L+u5pS557yp5pS+5q+UXHJcbiAgICAgKiBAcGFyYW0gdmFsdWUg5YWo5bGA57yp5pS+5q+UXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVTY2FsZSh2YWx1ZTpudW1iZXIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fc2NhbGUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLl9wb3MgPSBuZXcgVmVjMih0aGlzLl9pbml0UG9zLngqdGhpcy5fc2NhbGUsIHRoaXMuX2luaXRQb3MueSp0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fc2l6ZSA9IG5ldyBWZWMyKHRoaXMuX2luaXRTaXplLngqdGhpcy5fc2NhbGUsIHRoaXMuX2luaXRTaXplLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX2JhY2tTcHIuc2V0UGFyYW0odGhpcy5fcG9zLngsdGhpcy5fcG9zLnksdGhpcy5fc2l6ZS54LHRoaXMuX3NpemUueSk7Ly/orr7nva7og4zmma/nu5jlm77oioLngrnlj4LmlbBcclxuICAgICAgICB0aGlzLl9iYWNrU3ByLmNoYW5nZUNvbG9yKCk7XHJcbiAgICAgICAgdGhpcy5fZnJvbnRTcHIuc2V0UGFyYW0oMCwwLHRoaXMuX3NpemUueCp0aGlzLl9wZXJjZW50YWdlLHRoaXMuX3NpemUueSxcIiM4YjhiODNcIixuZXcgVmVjMigxKnRoaXMuX3NjYWxlLDEqdGhpcy5fc2NhbGUpKTsvL+iuvue9ruWJjeerr+e7mOWbvuiKgueCueWPguaVsFxyXG4gICAgICAgIHRoaXMuX2Zyb250U3ByLmNoYW5nZUNvbG9yKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7ov5vluqbmnaHku6Plj7dcclxuICAgICAqIEBwYXJhbSBzeW1iTnVtIOi/m+W6puadoeS7o+WPt1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U3ltYihzeW1iTnVtOm51bWJlcik6dm9pZHtcclxuICAgICAgICB0aGlzLl9zeW1iTnVtID0gc3ltYk51bTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS/ruaUuei/m+W6plxyXG4gICAgICogQHBhcmFtIHBlcmNlbnRhZ2Ug55uu5qCH6L+b5bqmXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgcGVyY2VudGFnZShwZXJjZW50YWdlOm51bWJlcil7XHJcbiAgICAgICAgaWYocGVyY2VudGFnZSA9PT0gMCl7XHJcbiAgICAgICAgICAgIHRoaXMuX3BlcmNlbnRhZ2UgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9mcm9udFNwci5ncmFwaGljcy5jbGVhcigpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9wZXJjZW50YWdlID0gcGVyY2VudGFnZTtcclxuICAgICAgICAgICAgdGhpcy5fZnJvbnRTcHIuc2V0UGFyYW0oMCwwLHRoaXMuX3NpemUueCp0aGlzLl9wZXJjZW50YWdlLHRoaXMuX3NpemUueSxcIiM4YjhiODNcIixuZXcgVmVjMigxKnRoaXMuX3NjYWxlLDEqdGhpcy5fc2NhbGUpKTtcclxuICAgICAgICAgICAgdGhpcy5fZnJvbnRTcHIuY2hhbmdlQ29sb3IoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57mnKzov5vluqbmnaHog4zmma/nu5jlm77oioLngrlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEJhY2tTcHIoKTpDdXN0b21pemVkU3ByaXRle1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iYWNrU3ByO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue5pys6L+b5bqm5p2h6auY5bqmXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRIZWlnaHQoKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hlaWdodDtcclxuICAgIH1cclxuXHJcblxyXG5cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJ1dHRvbntcclxuXHJcbiAgICBwcml2YXRlIF9pbml0UG9zOlZlYzI7Ly/mjInpkq7liJ3lp4vlnZDmoIdcclxuICAgIHByaXZhdGUgX2luaXRTaXplOlZlYzI7Ly/mjInpkq7liJ3lp4vlrr3pq5hcclxuICAgIHByaXZhdGUgX3BvczpWZWMyOy8v5pi+56S66IqC54K55Z2Q5qCHXHJcbiAgICBwcml2YXRlIF9zaXplOlZlYzI7Ly/mmL7npLroioLngrnlrr3pq5hcclxuICAgIHByaXZhdGUgX3N5bWJOYW1lOm51bWJlcjsvL+aMiemSrue8luWPt1xyXG4gICAgcHJpdmF0ZSBfY29sb3I6c3RyaW5nOy8v5oyJ6ZKu6aKc6ImyXHJcbiAgICBwcml2YXRlIF9oZWlnaHQ6bnVtYmVyOy8v5oyJ6ZKu6auY5bqm77yI6buY6K6k57yp5pS+5q+U5Li6Me+8iVxyXG4gICAgcHJpdmF0ZSBfc3ByOkN1c3RvbWl6ZWRTcHJpdGU7Ly/mjInpkq7mmL7npLroioLngrlcclxuICAgIHByaXZhdGUgX3NjYWxlOm51bWJlcjsvL+WFqOWxgOe8qeaUvuavlFxyXG4gICAgcHJpdmF0ZSBfbmFtZTpzdHJpbmc7Ly/mjInpkq7lkI3vvIjmmL7npLrlnKjmjInpkq7kuIrvvIlcclxuICAgIHByaXZhdGUgX2Z1bjpGdW5jdGlvbjsvL+aMiemSruaJgOaQuuW4pueahOWKn+iDveWHveaVsFxyXG4gICAgcHJpdmF0ZSBfQVJVc3ltYjpNeVN5bWJvbDsvL+aMiemSruaJgOWcqEFjdG9yUlVcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaMiemSruaehOmAoOWZqFxyXG4gICAgICogQHBhcmFtIG5hbWUg5oyJ6ZKu5ZCNXHJcbiAgICAgKiBAcGFyYW0gc3ltYk51bSDmjInpkq7nvJblj7dcclxuICAgICAqIEBwYXJhbSBwb3Mg6LW35aeL5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gc2l6ZSDotbflp4vlrr3pq5hcclxuICAgICAqIEBwYXJhbSBjb2xvciDmjInpkq7popzoibJcclxuICAgICAqIEBwYXJhbSBzY2FsZSDnvKnmlL7mr5RcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoQVJVc3ltYjpNeVN5bWJvbCwgbmFtZTpzdHJpbmcgPSBcImRlZmF1bHRcIiwgc3ltYk51bTpudW1iZXIsIHBvczpWZWMyLCBzaXplOlZlYzIsICBjb2xvcjpzdHJpbmcgPSBcIiMwMEIyQkZcIiwgc2NhbGU6bnVtYmVyID0gMSl7XHJcbiAgICAgICAgdGhpcy5fQVJVc3ltYiA9IEFSVXN5bWI7XHJcbiAgICAgICAgdGhpcy5fc3ltYk5hbWUgPSBzeW1iTnVtO1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuX2luaXRQb3MgPSBwb3M7XHJcbiAgICAgICAgdGhpcy5faW5pdFNpemUgPSBzaXplO1xyXG4gICAgICAgIHRoaXMuX2NvbG9yID0gY29sb3I7XHJcbiAgICAgICAgdGhpcy5fc2NhbGUgPSBzY2FsZTtcclxuICAgICAgICB0aGlzLl9wb3MgPSBuZXcgVmVjMih0aGlzLl9pbml0UG9zLngqdGhpcy5fc2NhbGUsdGhpcy5faW5pdFBvcy55KnRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9zaXplID0gbmV3IFZlYzIodGhpcy5faW5pdFNpemUueCp0aGlzLl9zY2FsZSx0aGlzLl9pbml0U2l6ZS55KnRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9oZWlnaHQgPSB0aGlzLl9pbml0U2l6ZS55O1xyXG4gICAgICAgIHRoaXMuX3NwciA9IG5ldyBDdXN0b21pemVkU3ByaXRlKCk7XHJcbiAgICAgICAgdGhpcy5fc3ByLnNldFBhcmFtKHRoaXMuX3Bvcy54LHRoaXMuX3Bvcy55LHRoaXMuX3NpemUueCx0aGlzLl9zaXplLnksdGhpcy5fY29sb3IpO1xyXG4gICAgICAgIHRoaXMuX3Nwci5jaGFuZ2VDb2xvcigpO1xyXG4gICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLm9uKEV2ZW50Q2VudHJlLkVUeXBlLlBFUkZPUk1BTkNFX1JFU0NBTEUoKSx0aGlzLHRoaXMucmVTY2FsZSk7XHJcbiAgICAgICAgdGhpcy5zZXRUZXh0KCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5oyJ6ZKu5Yqf6IO9XHJcbiAgICAgKiBAcGFyYW0gZnVuIOaMiemSruWKn+iDveWHveaVsFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0RnVuYyhmdW46RnVuY3Rpb24pOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fZnVuID0gZnVuO1xyXG4gICAgICAgIHRoaXMuX3Nwci5vbihMYXlhLkV2ZW50Lk1PVVNFX1VQLHRoaXMsdGhpcy5fZnVuKTtcclxuICAgICAgICB0aGlzLl9zcHIub24oTGF5YS5FdmVudC5NT1VTRV9PVkVSLHRoaXMsKGU6IExheWEuRXZlbnQpPT57XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9zcHIub24oTGF5YS5FdmVudC5NT1VTRV9VUCx0aGlzLChlOiBMYXlhLkV2ZW50KT0+e1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue5oyJ6ZKu57uY5Zu+6IqC54K5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRTcHIoKTpDdXN0b21pemVkU3ByaXRle1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zcHI7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOe8qeaUvuaMiemSrlxyXG4gICAgICogQHBhcmFtIHZhbHVlIOWFqOWxgOe8qeaUvuavlFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVTY2FsZSh2YWx1ZTpudW1iZXIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fc2NhbGUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLl9wb3MgPSBuZXcgVmVjMih0aGlzLl9pbml0UG9zLngqdGhpcy5fc2NhbGUsdGhpcy5faW5pdFBvcy55KnRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9zaXplID0gbmV3IFZlYzIodGhpcy5faW5pdFNpemUueCp0aGlzLl9zY2FsZSx0aGlzLl9pbml0U2l6ZS55KnRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9zcHIuc2V0UGFyYW0odGhpcy5fcG9zLngsdGhpcy5fcG9zLnksdGhpcy5fc2l6ZS54LHRoaXMuX3NpemUueSx0aGlzLl9jb2xvcik7XHJcbiAgICAgICAgdGhpcy5fc3ByLmNoYW5nZUNvbG9yKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuLLmn5PmlofmnKxcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFRleHQoKTp2b2lke1xyXG4gICAgICAgIGxldCB0bXBUZXg6TGF5YS5UZXh0ID0gbmV3IExheWEuVGV4dCgpO1xyXG4gICAgICAgIHRtcFRleC53aWR0aCA9IHRoaXMuX3NpemUueDtcclxuICAgICAgICB0bXBUZXguaGVpZ2h0ID0gdGhpcy5fc2l6ZS55O1xyXG4gICAgICAgIHRtcFRleC54ID0gMDtcclxuICAgICAgICB0bXBUZXgueSA9IDA7XHJcbiAgICAgICAgdG1wVGV4LmZvbnRTaXplID0gOTtcclxuICAgICAgICB0bXBUZXgudGV4dCA9IHRoaXMuX25hbWU7XHJcbiAgICAgICAgdG1wVGV4LmFsaWduID0gXCJjZW50ZXJcIjtcclxuICAgICAgICB0bXBUZXgudmFsaWduID0gXCJtaWRkbGVcIjtcclxuICAgICAgICB0aGlzLl9zcHIuYWRkQ2hpbGQodG1wVGV4KTtcclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFRleHQgZXh0ZW5kcyBMYXlhLlRleHR7XHJcbiAgICBwcml2YXRlIF9zd2l0Y2g6Ym9vbGVhbiA9IHRydWU7Ly/mlofmnKzmmL7npLrlvIDlhbMg6buY6K6k5YWz6ZetXHJcbiAgICBwcml2YXRlIF9zY2FsZTpudW1iZXI7Ly/lhajlsYDnvKnmlL7mr5RcclxuICAgIHByaXZhdGUgX3NpemU6VmVjMjsvL+i1t+Wni+Wkp+Wwj1xyXG4gICAgcHJpdmF0ZSBfcG9zOlZlYzIgPSBuZXcgVmVjMigwLDApOy8v6LW35aeL5Z2Q5qCHXHJcbiAgICBwcml2YXRlIF9teVN0cmluZzpzdHJpbmc7Ly/mlofmnKzlhoXlrrlcclxuICAgIHByaXZhdGUgX0FSVXN5bWI6TXlTeW1ib2w7Ly/miYDlnKjlj6/op4boioLngrlcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaWh+acrOaehOmAoOWZqFxyXG4gICAgICogQHBhcmFtIHNpemUg6LW35aeL5aSn5bCPXHJcbiAgICAgKiBAcGFyYW0gc2NhbGUg57yp5pS+5q+UXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioc2l6ZTpWZWMyLCBzY2FsZTpudW1iZXIpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fc2l6ZSA9IHNpemU7XHJcbiAgICAgICAgdGhpcy5fc2NhbGUgPSBzY2FsZTtcclxuICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5fc2l6ZS54KnRoaXMuX3NjYWxlOy8v6K6h566X5Y+v6KeG6IqC54K55a695bqmXHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLl9zaXplLnkqdGhpcy5fc2NhbGU7Ly/orqHnrpflj6/op4boioLngrnpq5jluqZcclxuICAgICAgICB0aGlzLmZvbnRTaXplID0gMTAqdGhpcy5fc2NhbGU7Ly/orqHnrpflrZfkvZPlpKflsI9cclxuICAgICAgICB0aGlzLmFsaWduID0gXCJjZW50ZXJcIjsvL+m7mOiupOerluebtOWxheS4rVxyXG4gICAgICAgIHRoaXMudmFsaWduID0gXCJtaWRkbGVcIjsvL+m7mOiupOawtOW5s+WxheS4rVxyXG4gICAgICAgIHRoaXMud29yZFdyYXAgPSB0cnVlOy8v6buY6K6k6Ieq5Yqo5o2i6KGM5byA5ZCvXHJcbiAgICAgICAgdGhpcy5jb2xvciA9IFwiIzAwMDAwMFwiOy8vXHJcbiAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2Uub24oRXZlbnRDZW50cmUuRVR5cGUuUEVSRk9STUFOQ0VfUkVTQ0FMRSgpLHRoaXMsdGhpcy5yZVNjYWxlKTsvL+ebkeWQrOWFqOWxgOe8qeaUvuavlFxyXG4gICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLm9uKEV2ZW50Q2VudHJlLkVUeXBlLlBFUkZPUk1BTkNFX1RFWFRfU1dJVENIKCksdGhpcyx0aGlzLnN3aXRjaCk7Ly/nm5HlkKzlhajlsYDmlofmnKzmmL7npLrlvIDlhbNcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7miYDlnKjmmL7npLroioLngrlzeW1iXHJcbiAgICAgKiBAcGFyYW0gc3ltYiBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFN5bWIoc3ltYjpNeVN5bWJvbCk6dm9pZHtcclxuICAgICAgICB0aGlzLl9BUlVzeW1iID0gc3ltYjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW8gOWFs+aWh+acrOaYvuekuuW8gOWFs1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3dpdGNoKCk6dm9pZHtcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLl9zd2l0Y2ggPT09IHRydWUpe1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5fc3dpdGNoID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVGV4dChcIlwiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX3N3aXRjaCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5L+u5pS55paH5pys5pi+56S65byA5YWzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRTd2l0Y2hPbigpOnZvaWR7XHJcbiAgICAgICAgaWYodGhpcy5fc3dpdGNoID09PSB0cnVlKXtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VUZXh0KHRoaXMuX215U3RyaW5nKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YWz6Zet5paH5pys5pi+56S6XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRTd2l0Y2hPZmYoKTp2b2lke1xyXG4gICAgICAgIGlmKHRoaXMuX3N3aXRjaCl7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVGV4dChcIiBcIik7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja7nvKnmlL7mr5Tkv67mlLnlj6/op4boioLngrnlpKflsI9cclxuICAgICAqIEBwYXJhbSBzY2FsZSDlhajlsYDnvKnmlL7mr5RcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZVNjYWxlKHNjYWxlOm51bWJlcik6dm9pZHtcclxuICAgICAgICB0aGlzLl9zY2FsZSA9IHNjYWxlO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB0aGlzLl9zaXplLngqdGhpcy5fc2NhbGU7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLl9zaXplLnkqdGhpcy5fc2NhbGU7XHJcbiAgICAgICAgdGhpcy54ID0gdGhpcy5fcG9zLngqdGhpcy5fc2NhbGU7XHJcbiAgICAgICAgdGhpcy55ID0gdGhpcy5fcG9zLnkqdGhpcy5fc2NhbGU7XHJcbiAgICAgICAgdGhpcy5mb250U2l6ZSA9IDEwKnRoaXMuX3NjYWxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5paH5pysXHJcbiAgICAgKiBAcGFyYW0gdGV4dCBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFRleHQodGV4dDpzdHJpbmcpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fbXlTdHJpbmcgPSB0ZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5L+u5pS55paH5pys6LW35aeL5Z2Q5qCH77yI5LiN5Y+X5YWo5bGA57yp5pS+5q+U5b2x5ZON77yJXHJcbiAgICAgKiBAcGFyYW0gcG9zIOi1t+Wni+WdkOagh1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0UG9zKHBvczpWZWMyID0gbmV3IFZlYzIoMCwwKSk6dm9pZHtcclxuICAgICAgICB0aGlzLl9wb3MgPSBwb3M7XHJcbiAgICAgICAgdGhpcy54ID0gdGhpcy5fcG9zLngqdGhpcy5fc2NhbGU7XHJcbiAgICAgICAgdGhpcy55ID0gdGhpcy5fcG9zLnkqdGhpcy5fc2NhbGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpmLvmraLpvKDmoIfkuovku7bnqb/pgI9cclxuICAgICAqL1xyXG4gICAgcHVibGljIG9mZlN3aXRjaCgpOnZvaWR7XHJcbiAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2Uub2ZmKEV2ZW50Q2VudHJlLkVUeXBlLlBFUkZPUk1BTkNFX1JFU0NBTEUoKSx0aGlzLHRoaXMucmVTY2FsZSk7XHJcbiAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2Uub2ZmKEV2ZW50Q2VudHJlLkVUeXBlLlBFUkZPUk1BTkNFX1RFWFRfU1dJVENIKCksdGhpcyx0aGlzLnN3aXRjaCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkv67mlLnlrZfkvZPlpKflsI9cclxuICAgICAqIEBwYXJhbSB2YWx1ZSDovpPlhaXlpKflsI9cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldEZvbnRTaXplKHZhbHVlOm51bWJlcik6dm9pZHtcclxuICAgICAgICB0aGlzLmZvbnRTaXplID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy50ZXh0ID0gdGhpcy5fbXlTdHJpbmc7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iLCIvL2F1dGhvciBOYTJDdUM0TzhcclxuXHJcbmltcG9ydCBDdXN0b21pemVkU3ByaXRlIGZyb20gXCIuL2N1c3RvbWl6ZWRTcHJcIjtcclxuaW1wb3J0IHsgQ2hlc3NCb2FyZCB9IGZyb20gXCIuL1Vuc3ltYm9saXplZFJlbmRlclwiO1xyXG5pbXBvcnQgQWN0b3JSVSBmcm9tIFwiLi9TeW1ib2xpemVkUmVuZGVyXCI7XHJcbmltcG9ydCB7IEFjdG9yQm94IH0gZnJvbSBcIi4vb2JqYm94XCI7XHJcbmltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi4vLi4vRG9kTWF0aFwiO1xyXG5pbXBvcnQgeyBTeW1ib2xpemVkIH0gZnJvbSBcIi4uLy4uLy4uL0ZpeC9GaXhTeW1ib2xcIjtcclxuaW1wb3J0IHsgRXZlbnRDZW50cmUgfSBmcm9tIFwiLi4vLi4vLi4vRXZlbnQvRXZlbnRDZW50cmVcIjtcclxuaW1wb3J0IHsgUmVuZGVyZXIgfSBmcm9tIFwiLi4vLi4vUmVuZGVyZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBlcmZvcm1hbmNlQ2VudHJlIGltcGxlbWVudHMgUmVuZGVyZXJ7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBpbnN0YW5jZTpQZXJmb3JtYW5jZUNlbnRyZTsvL+WNleS+i++8iOivt+S4jeimgeaJi+WKqOaWsOW7uuWNleS+i++8iVxyXG4gICAgcHVibGljIG1haW5TcHI6Q3VzdG9taXplZFNwcml0ZTsvL+m7mOiupOe7mOWbvuiKgueCue+8iOemgeatouWcqOivpeiKgueCueS4iue7mOWbvu+8jOWPquiDveeUqOS6jua3u+WKoOWtkOiKgueCue+8iVxyXG4gICAgcHJpdmF0ZSBjaGVzc0JvYXJkOkNoZXNzQm9hcmQ7Ly/pu5jorqTmo4vnm5hcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMlua4suafk+S4u+WcuuaZr++8jOWIneWni+WMluS6i+S7tuebkeWQrOexu1xyXG4gICAgICogQHBhcmFtIHNjZW5lIOa4uOaIj+S4u+WcuuaZr1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUgKHNjZW5lOkxheWEuU3ByaXRlKTp2b2lke1xyXG4gICAgICAgIFBlcmZvcm1hbmNlQ2VudHJlLmluc3RhbmNlID0gbmV3IFBlcmZvcm1hbmNlQ2VudHJlKCk7Ly/liqDovb3pnZnmgIHnsbtcclxuICAgICAgICBQZXJmb3JtYW5jZUNlbnRyZS5pbnN0YW5jZS5tYWluU3ByID0gbmV3IEN1c3RvbWl6ZWRTcHJpdGUoKTsvL+W7uueri+S4u+e7mOWbvuiKgueCuVxyXG4gICAgICAgIC8v6K+l57uY5Zu+6IqC54K55LiN55So5LqO57uY5Yi25Lu75L2V5Zu+5b2i77yM5LuF55So5LqO5re75Yqg5a2Q6IqC54K5XHJcbiAgICAgICAgc2NlbmUuYWRkQ2hpbGQoUGVyZm9ybWFuY2VDZW50cmUuaW5zdGFuY2UubWFpblNwcik7Ly/lsIbkuLvnu5jlm77oioLngrnmt7vliqDkuLrkuLvlnLrmma/lrZDoioLngrlcclxuICAgICAgICBFdmVudENlbnRyZS5pbml0KCk7Ly/liJ3lp4vljJbop4Llr5/ogIVcclxuICAgICAgICBQZXJmb3JtYW5jZUNlbnRyZS5pbml0aWFsaXplID0gKCkgPT4ge307Ly/muIXnqbrkuLvlnLrmma/liJ3lp4vljJblh73mlbBcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIk1haW4gU2NlbmUgSW5pdGlhbGl6YXRpb24gQ29tcGxldGUhIVwiKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuLLmn5Pmo4vnm5hcclxuICAgICAqIEBwYXJhbSBhcnIg55So5LqO55Sf5oiQ5qOL55uY55qE5LqM57u05pWw57uEXHJcbiAgICAgKiBAcGFyYW0gcG9zVmVjMiDmo4vnm5jotbflp4vlnZDmoIfvvIjkuIDlvovmjInlhajlsYDnvKnmlL7mr5TkuLox6K6h566X77yM5riy5p+T5Zmo5Lya5qC55o2u5YWo5bGA57yp5pS+5q+U6Ieq5Yqo5a6M5oiQ57yp5pS+5riy5p+T77yJXHJcbiAgICAgKiBAcGFyYW0gdW5pdHNpemUg5Y2V5L2N5qC85a2Q5a696auY77yI5LiA5b6L5oyJ5YWo5bGA57yp5pS+5q+U5Li6Meiuoeeul++8jOa4suafk+WZqOS8muagueaNruWFqOWxgOe8qeaUvuavlOiHquWKqOWujOaIkOe8qeaUvua4suafk++8iVxyXG4gICAgICogQHBhcmFtIGJhY2tHcm91bmRDb2xvciDmo4vnm5jog4zmma/popzoibJcclxuICAgICAqIEBwYXJhbSBmcm9udENvbG9yIOagvOWtkOminOiJslxyXG4gICAgICogQHBhcmFtIGZhdGhlciDniLbnu5jlm77oioLngrnvvIjpu5jorqTkuLrlhajlsYDnu5jlm77oioLngrnvvIlcclxuICAgICAqIEBwYXJhbSBzY2FsZSDnvKnmlL7mr5TvvIjpu5jorqTkuLox77yJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpbml0Qm9hcmQoYXJyOiBudW1iZXJbXVtdLCBwb3NWZWMyOiBWZWMyLCB1bml0c2l6ZTogVmVjMiwgYmFja0dyb3VuZENvbG9yOiBzdHJpbmcsIGZyb250Q29sb3I6IHN0cmluZywgc2NhbGU6IG51bWJlciA9IDEpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNoZXNzQm9hcmQgPSBuZXcgQ2hlc3NCb2FyZChhcnIscG9zVmVjMix1bml0c2l6ZSxiYWNrR3JvdW5kQ29sb3IsZnJvbnRDb2xvcixzY2FsZSk7Ly/mlrDlu7rmo4vnm5hcclxuICAgICAgICBQZXJmb3JtYW5jZUNlbnRyZS5pbnN0YW5jZS5tYWluU3ByLmFkZENoaWxkKHRoaXMuY2hlc3NCb2FyZCk7Ly/mt7vliqDlrZDoioLngrlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiwg+iKguWFqOWxgOe8qeaUvuavlO+8jOWPquiDveS9nOeUqOS6juaJgOaciWFjdG9y5riy5p+T5a6M5oiQ5ZCO44CB5omA5pyJ54m55pWI5bin5b6q546v5omn6KGM5YmN77yM5ZCm5YiZ5pyJ6Z2e6Ie05ZG95oCnYnVnXHJcbiAgICAgKiBAcGFyYW0gdmFsdWUg5YWo5bGA5Y+v6KeG6IqC54K557yp5pS+5q+UXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZXNjYWxlKHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5ldmVudChcIlJFU0NBTEVcIixbdmFsdWVdKTsvL+WPkeW4g+iwg+WPguS6i+S7tuOAgee8qeaUvuavlOWPguaVsFxyXG5cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDmuLLmn5NhY3RvcuWvueixoVxyXG4gICAgICogQHBhcmFtIGJvdW5kIGFjdG9yXHJcbiAgICAgKiBAcGFyYW0gcG9zIOWdkOagh++8iOS4gOW+i+aMieWFqOWxgOe8qeaUvuavlOS4ujHorqHnrpfvvIzmuLLmn5PlmajkvJrmoLnmja7lhajlsYDnvKnmlL7mr5Toh6rliqjlrozmiJDnvKnmlL7muLLmn5PvvIlcclxuICAgICAqIEBwYXJhbSBzaXog5a696auY77yI6buY6K6kMTAsMTDvvInvvIjkuIDlvovmjInlhajlsYDnvKnmlL7mr5TkuLox6K6h566X77yM5riy5p+T5Zmo5Lya5qC55o2u5YWo5bGA57yp5pS+5q+U6Ieq5Yqo5a6M5oiQ57yp5pS+5riy5p+T77yJXHJcbiAgICAgKiBAcGFyYW0gZmF0aGVyIOeItue7mOWbvuiKgueCue+8iOm7mOiupOS4uuaji+ebmOe7mOWbvuiKgueCue+8iVxyXG4gICAgICogQHBhcmFtIGNvbG9yIOminOiJsu+8iOm7mOiupOS4uue7v++8iVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGlzcGxheUFjdG9yKGJvdW5kOiBTeW1ib2xpemVkLCBwb3M6IFZlYzIsIHNpejpWZWMyID0gbmV3IFZlYzIoMTAsMTApLCBjb2xvcjpzdHJpbmcgPSBcIiMwMGZmMDBcIiwgZmF0aGVyOkN1c3RvbWl6ZWRTcHJpdGUgPSBQZXJmb3JtYW5jZUNlbnRyZS5pbnN0YW5jZS5jaGVzc0JvYXJkKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHRtcEFjdG9yOkFjdG9yUlUgPSBuZXcgQWN0b3JSVShib3VuZC5zeW1ib2wscG9zLHNpeixmYXRoZXIsY29sb3IpOy8v5riy5p+TYWN0b3JcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqAv5L+u5pS56L+b5bqm5p2hXHJcbiAgICAgKiDpu5jorqTov5vluqbmnaHplb8zMO+8jOWuvTXvvIjpu5jorqTov5vluqbmnaHlrr3pq5jml6Dms5XpgJrov4fmnKzlh73mlbDkv67mlLnvvIzlpoLpnIDkv67mlLnor7fliY3lvoAgLlxcUmhvZGUgSXNsYW5kXFxzcmNcXFJob2Rlc19HYW1lXFxQZXJmb3JtYW5jZV9Nb2R1bGVcXFN5bWJvbGl6ZWRSZW5kZXIudHNcXEFjdG9yUlUpXHJcbiAgICAgKiDov5vluqbpopzoibLkuLrngbDvvIzlpoLpnIDkv67mlLnor7fliY3lvoAgLlxcUmhvZGUgSXNsYW5kXFxzcmNcXFJob2Rlc19HYW1lXFxQZXJmb3JtYW5jZV9Nb2R1bGVcXEFjdG9yQ29tcG9uZW50LnRzXFxCYXJcclxuICAgICAqIEBwYXJhbSBib3VuZCBhY3RvclxyXG4gICAgICogQHBhcmFtIGJhcl9zeW1iTnVtIOesrOWHoOaguei/m+W6puadoe+8iOWni+S6jjDvvIkgXHJcbiAgICAgKiBAcGFyYW0gcGVyY2VudGFnZSDor6Xov5vluqbmnaHov5vluqZcclxuICAgICAqIEBwYXJhbSBjb2xvciDor6Xov5vluqbmnaHog4zmma/popzoibJcclxuICAgICAqIEBwYXJhbSB4IOi/m+W6puadoemVv+W6pu+8iOS4gOW+i+aMieWFqOWxgOe8qeaUvuavlOS4ujHorqHnrpfvvIzmuLLmn5PlmajkvJrmoLnmja7lhajlsYDnvKnmlL7mr5Toh6rliqjlrozmiJDnvKnmlL7muLLmn5PvvIlcclxuICAgICAqIEBwYXJhbSB5IOi/m+W6puadoemrmOW6pu+8iOS4gOW+i+aMieWFqOWxgOe8qeaUvuavlOS4ujHorqHnrpfvvIzmuLLmn5PlmajkvJrmoLnmja7lhajlsYDnvKnmlL7mr5Toh6rliqjlrozmiJDnvKnmlL7muLLmn5PvvIlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGVkaXRCYXIoYm91bmQ6IFN5bWJvbGl6ZWQsIGJhcl9zeW1iTnVtOm51bWJlciA9IDAsIHBlcmNlbnRhZ2U6IG51bWJlciA9IDEsIGNvbG9yOiBzdHJpbmcgPSBcIiMwMGZmMDBcIiwgeD86bnVtYmVyLCB5PzpudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdG1wQWN0b3I6QWN0b3JSVSA9IEFjdG9yQm94LmdldChib3VuZC5zeW1ib2wuZGF0YSk7Ly/ojrflj5blt7LmuLLmn5PnmoRhY3RvclJV5a+56LGhXHJcbiAgICAgICAgaWYodG1wQWN0b3IuZ2V0QmFyKGJhcl9zeW1iTnVtKSA9PT0gIHVuZGVmaW5lZCl7Ly/lpoLmnpzlr7nlupTov5vluqbmnaHkuI3lrZjlnKhcclxuICAgICAgICAgICAgdG1wQWN0b3IuYWRkRXh0QmFyKGNvbG9yLGJhcl9zeW1iTnVtLHBlcmNlbnRhZ2UseCx5KTsvL+agueaNrui+k+WFpeWPguaVsOaWsOW7uui/m+W6puadoVxyXG5cclxuICAgICAgICB9ZWxzZXsvL+WmguWvueW6lOi/m+W6puadoeW3suWtmOWcqFxyXG4gICAgICAgICAgICB0bXBBY3Rvci5lZGl0QmFyKGJhcl9zeW1iTnVtLHBlcmNlbnRhZ2UpOy8v5L+u5pS56K+l6L+b5bqm5p2h55m+5YiG5q+UXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWPkeW4g+aUu+WHu+S6i+S7tlxyXG4gICAgICog5q2k5pa55rOV6LCD55So5ZCO6K+35Yu/5L+u5pS55YWo5bGA57yp5pS+5q+U77yB77yBXHJcbiAgICAgKiBAcGFyYW0gZnJvbSDlj5HliqjmlLvlh7voioLngrlcclxuICAgICAqIEBwYXJhbSB0byDpga3lj5fmiZPlh7voioLngrlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRlZmF1bHRBdGtFZmZlY3QoZnJvbTogU3ltYm9saXplZCwgdG86IFN5bWJvbGl6ZWQpOiB2b2lkIHtcclxuICAgICAgICAvL+aJk+WHu+S6i+S7tuOAgeWPkeWKqOaUu+WHu+iKgueCueWSjOmBreWPl+aUu+WHu+iKgueCueWPguaVsFxyXG4gICAgICAgIEFjdG9yQm94LmdldChmcm9tLnN5bWJvbC5kYXRhKS5oaXQodG8pO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+R5biD5Y+X5Lyk5LqL5Lu2XHJcbiAgICAgKiDmraTmlrnms5XosIPnlKjlkI7or7fli7/kv67mlLnlhajlsYDnvKnmlL7mr5TvvIHvvIFcclxuICAgICAqIEBwYXJhbSBib3VuZCDlj5fkvKToioLngrlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRlZmF1bHREbWdFZmZlY3QoYm91bmQ6IFN5bWJvbGl6ZWQpOiB2b2lkIHtcclxuICAgICAgICAvL+WPl+S8pOS6i+S7tuWSjOWPl+S8pOiKgueCueWPguaVsFxyXG4gICAgICAgIEFjdG9yQm94LmdldChib3VuZC5zeW1ib2wuZGF0YSkuZGFtYWdlKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZSA5q+B5a+56LGh77yI6buY6K6k6ZSA5q+B77yJXHJcbiAgICAgKiBAcGFyYW0gYm91bmQg5a+56LGhXHJcbiAgICAgKiBAcGFyYW0gcG9zIOWdkOagh++8iOS4gOW+i+aMieWFqOWxgOe8qeaUvuavlOS4ujHorqHnrpfvvIzmuLLmn5PlmajkvJrmoLnmja7lhajlsYDnvKnmlL7mr5Toh6rliqjlrozmiJDnvKnmlL7muLLmn5PvvIlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpc3Ryb3lBY3Rvcihib3VuZDogU3ltYm9saXplZCwgcG9zPzogVmVjMik6IHZvaWQge1xyXG4gICAgICAgIGxldCB0bXBBY3RvcjpBY3RvclJVID0gQWN0b3JCb3guZ2V0KGJvdW5kLnN5bWJvbC5kYXRhKTsvL+iOt+WPlmFjdG9yUlXlr7nosaFcclxuICAgICAgICBpZihwb3MgPT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHRtcEFjdG9yLmRlc3RvcnkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYocG9zLmVxdWFscyh0bXBBY3Rvci5nZXRQb3NWZWMoKSkpe1xyXG4gICAgICAgICAgICB0bXBBY3Rvci5kZXN0b3J5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6ZSA5q+BYWN0b3JSVeWvueixoVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ZyoYWN0b3LouqvkuIrmuLLmn5PmlofmnKxcclxuICAgICAqIOS7heW9k+WFqOWxgOaWh+acrOaYvuekuuW8gOWFs3N3aXRjaEhvdmVyVGV4dO+8iO+8ieW8gOWQr+aXtuaJjeS8mua4suafk+aWh+acrO+8jOW8gOWFs+m7mOiupOWFs+mXrVxyXG4gICAgICogQHBhcmFtIGJvdW5kIGFjdG9yXHJcbiAgICAgKiBAcGFyYW0gY29udGVudCDmlofmnKxcclxuICAgICAqIEBwYXJhbSBwb3Mg5paH5pys6LW35aeL5Z2Q5qCH77yI5LiA5b6L5oyJ5YWo5bGA57yp5pS+5q+U5Li6Meiuoeeul++8jOa4suafk+WZqOS8muagueaNruWFqOWxgOe8qeaUvuavlOiHquWKqOWujOaIkOe8qeaUvua4suafk++8iVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgd3JpdGUoYm91bmQ6IFN5bWJvbGl6ZWQsIGNvbnRlbnQ6IHN0cmluZywgcG9zPzogVmVjMik6IHZvaWQge1xyXG4gICAgICAgIEFjdG9yQm94LmdldChib3VuZC5zeW1ib2wuZGF0YSkuZ2V0VGV4dCgpLnNldFRleHQoY29udGVudCk7Ly/kv67mlLlBY3RvclJV5paH5pysXHJcbiAgICAgICAgQWN0b3JCb3guZ2V0KGJvdW5kLnN5bWJvbC5kYXRhKS5nZXRUZXh0KCkuc2V0UG9zKHBvcyk7Ly/kv67mlLnor6XmlofmnKzkvY3nva5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWFqOWxgOaWh+acrOaYvuekuuW8gOWFs++8iOm7mOiupOWFs+mXre+8iVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3dpdGNoSG92ZXJUZXh0KCk6IHZvaWQge1xyXG4gICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLmV2ZW50KEV2ZW50Q2VudHJlLkVUeXBlLlBFUkZPUk1BTkNFX1RFWFRfU1dJVENIKCkpOy8v5Y+R5biD5paH5pys5byA5YWz5LqL5Lu277yM5oyJ6ZKu5paH5pys5LiN5Y+X5b2x5ZONXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnp7vliqhhY3RvcuWvueixoVxyXG4gICAgICogQHBhcmFtIGJvdW5kIGFjdG9yXHJcbiAgICAgKiBAcGFyYW0gcG9zIOebruagh+WdkOagh++8iOS4gOW+i+aMieWFqOWxgOe8qeaUvuavlOS4ujHorqHnrpfvvIzmuLLmn5PlmajkvJrmoLnmja7lhajlsYDnvKnmlL7mr5Toh6rliqjlrozmiJDnvKnmlL7muLLmn5PvvIlcclxuICAgICAqL1xyXG4gICAgcHVibGljIG1vdmUoYm91bmQ6IFN5bWJvbGl6ZWQsIHBvczogVmVjMik6IHZvaWQge1xyXG4gICAgICAgIEFjdG9yQm94LmdldChib3VuZC5zeW1ib2wuZGF0YSkucmVsb2NhdGUocG9zKTsvL+enu+WKqEFjdG9yUlXlr7nosaHlnZDmoIdcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ZyoYWN0b3LouqvkuIrmt7vliqDmjInpkq5cclxuICAgICAqIOavj+S4qmFjdG9yUlXpu5jorqTlrZjlnKgy5Liq5oyJ6ZKu77yI54K55Ye7YWN0b3JSVeiKgueCueWNs+WPr+aYvuekuu+8ie+8jOWvueW6lOaSpOmAgOWSjOaKgOiDveOAguivpeaMiemSruWdkOagh+OAgeWuvemrmOOAgeminOiJsuOAgeWQjeWtl+S4jeWPr+S/ruaUue+8jOWKn+iDvemcgOS7juWklumDqOa3u+WKoFxyXG4gICAgICogQHBhcmFtIGJvdW5kIGFjdG9yXHJcbiAgICAgKiBAcGFyYW0gbnVtIOaMiemSrue8luWPt++8iDAsMeS4uum7mOiupOaMiemSru+8jOm7mOiupOaMiemSruS4jeiHquW4puS7u+S9leWKn+iDve+8jOmcgOaJi+WKqOa3u+WKoO+8iVxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIOeCueWHu+aMiemSruWQjuiwg+eUqOeahOWHveaVsFxyXG4gICAgICogQHBhcmFtIHRleHQg5pi+56S65Zyo5oyJ6ZKu5LiK55qE5paH5pys77yI6buY6K6k5pi+56S65LiU5peg5rOV5L+u5pS577yJXHJcbiAgICAgKiBAcGFyYW0gcG9zIOaMiemSrui1t+Wni+WdkOagh++8iOS4gOW+i+aMieWFqOWxgOe8qeaUvuavlOS4ujHorqHnrpfvvIzmuLLmn5PlmajkvJrmoLnmja7lhajlsYDnvKnmlL7mr5Toh6rliqjlrozmiJDnvKnmlL7muLLmn5PvvIlcclxuICAgICAqIEBwYXJhbSBzaXplIOaMiemSruWkp+Wwj++8iOS4gOW+i+aMieWFqOWxgOe8qeaUvuavlOS4ujHorqHnrpfvvIzmuLLmn5PlmajkvJrmoLnmja7lhajlsYDnvKnmlL7mr5Toh6rliqjlrozmiJDnvKnmlL7muLLmn5PvvIlcclxuICAgICAqIEBwYXJhbSBjb2xvciDmjInpkq7popzoibJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGF0dGFjaEJ1dHRvbihib3VuZDogU3ltYm9saXplZCxudW06bnVtYmVyLCBjYWxsYmFjazogRnVuY3Rpb24sIHRleHQ/OiBzdHJpbmcsIHBvcz86IFZlYzIsIHNpemU/OiBWZWMyLCBjb2xvcj86IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGxldCB0bXBBY3Q6QWN0b3JSVSA9IEFjdG9yQm94LmdldChib3VuZC5zeW1ib2wuZGF0YSk7Ly/ojrflj5ZBY3RvclJV5a+56LGhXHJcbiAgICAgICAgaWYodG1wQWN0LmdldEJ1dHRvbihudW0pID09PSB1bmRlZmluZWQpey8v5aaC5p6c5a+55bqU5oyJ6ZKu5LiN5a2Y5ZyoXHJcbiAgICAgICAgICAgIGlmKHBvcyA9PT0gdW5kZWZpbmVkKXsvL+WmguaenOS4jei+k+WFpeaMh+WumuWdkOagh1xyXG4gICAgICAgICAgICAgICAgdG1wQWN0LmFkZEV4dHJhQnV0dG9uc0F0RGVmTG9jYXRpb24odGV4dCxudW0sY29sb3IsY2FsbGJhY2spOy8v5Zyo6buY6K6k5L2N572u5paw5bu65oyJ6ZKuXHJcbiAgICAgICAgICAgIH1lbHNley8v5aaC5p6c6L6T5YWl5oyH5a6a5Z2Q5qCHXHJcbiAgICAgICAgICAgICAgICB0bXBBY3QuYWRkRXh0cmFCdXR0b25BdE5vRGVmTG9jYXRpb24odGV4dCxudW0sY2FsbGJhY2sscG9zLHNpemUsY29sb3IpOy8v5Zyo5oyH5a6a5L2N572u5paw5bu65oyJ6ZKuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXsvL+WmguaenOWvueW6lOaMiemSruWtmOWcqFxyXG4gICAgICAgICAgICB0bXBBY3QuZ2V0QnV0dG9uKG51bSkuc2V0RnVuYyhjYWxsYmFjayk7Ly/ovpPlhaXlip/og73lh73mlbBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59IiwiLy9hdXRob3IgTmEyQ3VDNE84XHJcblxyXG5pbXBvcnQgQ3VzdG9taXplZFNwcml0ZSBmcm9tIFwiLi9jdXN0b21pemVkU3ByXCI7XHJcbmltcG9ydCB7IEFjdG9yQm94IH0gZnJvbSBcIi4vb2JqYm94XCI7XHJcbmltcG9ydCB7IEJhciwgQnV0dG9uICwgVGV4dCB9IGZyb20gXCIuL0FjdG9yQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE15U3ltYm9sLCBTeW1ib2xpemVkIH0gZnJvbSBcIi4uLy4uLy4uL0ZpeC9GaXhTeW1ib2xcIjtcclxuaW1wb3J0IHsgVmVjMiB9IGZyb20gXCIuLi8uLi9Eb2RNYXRoXCI7XHJcbmltcG9ydCB7IEtWUGFpciB9IGZyb20gXCIuLi8uLi9Eb2REYXRhU3RydWN0dXJlXCI7XHJcbmltcG9ydCB7IEV2ZW50Q2VudHJlIH0gZnJvbSBcIi4uLy4uLy4uL0V2ZW50L0V2ZW50Q2VudHJlXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWN0b3JSVXtcclxuICAgIHByaXZhdGUgX2luaXRQb3M6VmVjMjsvL2FjdG9y6LW35aeL5Z2Q5qCHXHJcbiAgICBwcml2YXRlIF9pbml0U2l6ZTpWZWMyOy8vYWN0b3Lotbflp4vlpKflsI9cclxuICAgIHByaXZhdGUgX2luaXRCYXJIZWlnaHQ6bnVtYmVyID0gMDsvL+i/m+W6puadoeWFtuWunumrmOW6puaaguWtmOWZqFxyXG4gICAgcHJpdmF0ZSBfcG9zOlZlYzI7Ly/moLnmja7lhajlsYDnvKnmlL7mr5TmjaLnrpflkI7nmoTlj6/op4HlnZDmoIdcclxuICAgIHByaXZhdGUgX3NpemU6VmVjMjsvL+agueaNruWFqOWxgOe8qeaUvuavlOaNoueul+WQjueahOWPr+ingeWkp+Wwj1xyXG4gICAgcHJpdmF0ZSBfc2NhbGU6bnVtYmVyID0gMTsvL+WFqOWxgOe8qeaUvuavlFxyXG4gICAgcHJpdmF0ZSBfc3ltYjpNeVN5bWJvbDsvL3N5bWJcclxuICAgIHByaXZhdGUgX2ZhdGhlcjpDdXN0b21pemVkU3ByaXRlOy8v54i257uY5Zu+6IqC54K5XHJcbiAgICBwcml2YXRlIF9zcHI6Q3VzdG9taXplZFNwcml0ZTsvL+acrOe7mOWbvuiKgueCuVxyXG4gICAgcHJpdmF0ZSBfYmFyUGFpcjpLVlBhaXI8QmFyPiA9IG5ldyBLVlBhaXI8QmFyPigpOy8v6L+b5bqm5p2h6ZSu5YC857uEXHJcbiAgICBwcml2YXRlIF90ZXh0OlRleHQ7Ly/pu5jorqTmlofmnKxcclxuICAgIHByaXZhdGUgX2RlZkJ1dHRvblNob3dlZDpib29sZWFuID0gZmFsc2U7Ly/mmK/lkKbmmL7npLrpu5jorqTmjInpkq7vvIzpu5jorqTkuLrlkKZcclxuICAgIHByaXZhdGUgX2J1dHRvblBhaXI6S1ZQYWlyPEJ1dHRvbj4gPSBuZXcgS1ZQYWlyPEJ1dHRvbj4oKTtcclxuICAgIHByaXZhdGUgX2J1dHRvbkhlaWdodDpudW1iZXI7Ly/mjInpkq7pq5jluqbmmoLlrZjlmahcclxuICAgIHByaXZhdGUgX2RhbWFnZTpDdXN0b21pemVkU3ByaXRlOy8v5Y+X5Lyk54m55pWI5pi+56S66IqC54K5XHJcbiAgICBwcml2YXRlIF90cmFuc3BhcmVuY3k6bnVtYmVyID0gMTsvL+WPl+S8pOeJueaViOWPguaVsOaaguWtmOWZqFxyXG4gICAgcHJpdmF0ZSBfZmlzdDpDdXN0b21pemVkU3ByaXRlOy8v5pS75Ye754m55pWI5pi+56S66IqC54K5XHJcbiAgICBwcml2YXRlIF9tb3ZlUGVyY2VudGFnZTpudW1iZXIgPSAwOy8v5pS75Ye754m55pWI5Y+C5pWw5pqC5a2Y5ZmoXHJcbiAgICBwdWJsaWMgX2NlbnRlclBvczpWZWMyOy8v5Lit5b+D5Z2Q5qCHXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVyVW5pdOaehOmAoOWZqFxyXG4gICAgICogQHBhcmFtIHN5bWIgc3ltYlxyXG4gICAgICogQHBhcmFtIHBvcyDotbflp4vlnZDmoIdcclxuICAgICAqIEBwYXJhbSBzaXplIOWuvemrmFxyXG4gICAgICogQHBhcmFtIGZhdGhlciDniLbnu5jlm77oioLngrlcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioc3ltYjpNeVN5bWJvbCwgcG9zOlZlYzIsIHNpemU6VmVjMiwgZmF0aGVyOkN1c3RvbWl6ZWRTcHJpdGUsIGNvbG9yOnN0cmluZyA9IFwiIzAwZmZmZlwiLCBzY2FsZTpudW1iZXIgPSAxKXtcclxuICAgICAgICB0aGlzLl9mYXRoZXIgPSBmYXRoZXI7Ly/niLbnu5jlm77oioLngrlcclxuICAgICAgICB0aGlzLl9pbml0UG9zID0gcG9zOy8v6LW35aeL5Z2Q5qCHXHJcbiAgICAgICAgdGhpcy5faW5pdFNpemUgPSBzaXplOy8v6LW35aeL5a696auYXHJcbiAgICAgICAgdGhpcy5fc3ByID0gbmV3IEN1c3RvbWl6ZWRTcHJpdGUoKTsvL+aWsOW7uue7mOWbvuiKgueCuVxyXG4gICAgICAgIHRoaXMuX2ZhdGhlci5hZGRDaGlsZCh0aGlzLl9zcHIpOy8v5re75Yqg5a2Q6IqC54K5XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHN5bWIsbmV3IFZlYzIodGhpcy5faW5pdFBvcy54KnRoaXMuX3NjYWxlLHRoaXMuX2luaXRQb3MueSp0aGlzLl9zY2FsZSksbmV3IFZlYzIodGhpcy5faW5pdFNpemUueCp0aGlzLl9zY2FsZSwgdGhpcy5faW5pdFNpemUueSp0aGlzLl9zY2FsZSksY29sb3IpOy8v6K6+572u57uY5Zu+6IqC54K55Y+C5pWwXHJcbiAgICAgICAgQWN0b3JCb3guYWRkKHRoaXMsdGhpcy5fc3ltYik7Ly/lsIbmnKzlr7nosaHmt7vliqDliLDplK7lgLzlr7lcclxuICAgICAgICB0aGlzLmFkZERlZkJhcigpOy8v5re75Yqg6buY6K6k6L+b5bqm5p2hXHJcbiAgICAgICAgdGhpcy5fdGV4dCA9IG5ldyBUZXh0KHRoaXMuX2luaXRTaXplLHRoaXMuX3NjYWxlKTsvL+a3u+WKoOm7mOiupOaWh+acrFxyXG4gICAgICAgIHRoaXMuX3RleHQuc2V0U3ltYih0aGlzLl9zeW1iKTsvL1xyXG4gICAgICAgIHRoaXMuX2J1dHRvbkhlaWdodCA9IHRoaXMuX2luaXRTaXplLnk7Ly9cclxuICAgICAgICB0aGlzLl9zcHIuYWRkQ2hpbGQodGhpcy5fdGV4dCk7Ly/pu5jorqTmlofmnKznva7kuo7lrZDoioLngrlcclxuICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5vbihFdmVudENlbnRyZS5FVHlwZS5QRVJGT1JNQU5DRV9SRVNDQUxFKCksdGhpcyx0aGlzLnJlU2NhbGUpOy8v55uR5ZCs5YWo5bGA57yp5pS+5q+UXHJcbiAgICAgICAgdGhpcy5fc3ByLm9uKExheWEuRXZlbnQuTU9VU0VfT1ZFUix0aGlzLHRoaXMubW91c2VPdmVyKTsvL1xyXG4gICAgICAgIHRoaXMuX3Nwci5vbihMYXlhLkV2ZW50Lk1PVVNFX09VVCx0aGlzLHRoaXMubW91c2VPdXQpOy8vXHJcbiAgICAgICAgdGhpcy5fc3ByLm9uKExheWEuRXZlbnQuTU9VU0VfVVAsdGhpcyx0aGlzLnNob3dEZWZhdWx0Qm90dG9ucyk7Ly9cclxuICAgICAgICB0aGlzLl9kYW1hZ2UgPSBuZXcgQ3VzdG9taXplZFNwcml0ZSgpOy8vXHJcbiAgICAgICAgdGhpcy5fc3ByLmFkZENoaWxkKHRoaXMuX2RhbWFnZSk7Ly9cclxuICAgICAgICB0aGlzLl9kYW1hZ2Uuc2V0UGFyYW0oMCwwLHRoaXMuX3NpemUueCx0aGlzLl9zaXplLnksXCIjZjkxNTI2XCIpOy8vXHJcbiAgICAgICAgdGhpcy5fZGFtYWdlLmxvY2F0aW9uQW5kU2l6ZSgpOy8vXHJcbiAgICAgICAgdGhpcy5hZGREZWZCdXR0b25zKCk7Ly9cclxuICAgICAgICB0aGlzLl9maXN0ID0gbmV3IEN1c3RvbWl6ZWRTcHJpdGUoKTsvL1xyXG4gICAgICAgIHRoaXMuX2Zpc3Quc2V0UGFyYW0odGhpcy5fY2VudGVyUG9zLngsdGhpcy5fY2VudGVyUG9zLnksMTYsMTYsXCIjRjNDMjQ2XCIpOy8vXHJcbiAgICAgICAgdGhpcy5fZmlzdC5sb2NhdGlvbkFuZFNpemUoKTsvL1xyXG4gICAgICAgIHRoaXMuX2Zpc3Quek9yZGVyID0gMjsvL1xyXG4gICAgICAgIHRoaXMuX3Nwci5hZGRDaGlsZCh0aGlzLl9maXN0KTsvL1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuW9k+WJjeWPr+inhuiKgueCueWdkOagh1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGN1clBvcygpOlZlYzJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvcztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5HliqjmiZPlh7vnibnmlYhcclxuICAgICAqIEBwYXJhbSB0byDmiZPlh7vnm67moIdcclxuICAgICAqL1xyXG4gICAgcHVibGljIGhpdCh0bzpTeW1ib2xpemVkKTp2b2lke1xyXG4gICAgICAgIC8vIHRoaXMuX2Zpc3QuZ3JhcGhpY3Muc2F2ZSgpO1xyXG4gICAgICAgIHRoaXMuX2Zpc3QuY2VudHJhbFNoaWZ0Q29sb3JlZCgpO1xyXG4gICAgICAgIGxldCB0bXBWZWM6VmVjMiA9IG5ldyBWZWMyKEFjdG9yQm94LmdldCh0by5zeW1ib2wuZGF0YSkuY3VyUG9zKCkueC10aGlzLl9wb3MueCxBY3RvckJveC5nZXQodG8uc3ltYm9sLmRhdGEpLmN1clBvcygpLnktdGhpcy5fcG9zLnkpO1xyXG4gICAgICAgIGxldCBmdW46RnVuY3Rpb24gPSAodGFyZ2V0OlZlYzIpID0+e1xyXG4gICAgICAgICAgICBpZih0aGlzLl9tb3ZlUGVyY2VudGFnZSA+IDEpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbW92ZVBlcmNlbnRhZ2UgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZmlzdC5ncmFwaGljcy5jbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5fZmlzdC5ncmFwaGljcy5yZXN0b3JlKCk7XHJcbiAgICAgICAgICAgICAgICBMYXlhLnRpbWVyLmNsZWFyKHRoaXMsZnVuKTtcclxuICAgICAgICAgICAgICAgIEFjdG9yQm94LmdldCh0by5zeW1ib2wuZGF0YSkuZGFtYWdlKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgY3VyTG9jYWN0aW9uOlZlYzIgPSBuZXcgVmVjMiggKDE2KyB0YXJnZXQueCkqdGhpcy5fbW92ZVBlcmNlbnRhZ2UsKDE2KyB0YXJnZXQueSkqdGhpcy5fbW92ZVBlcmNlbnRhZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLl9tb3ZlUGVyY2VudGFnZSArPSAwLjAyO1xyXG4gICAgICAgICAgICB0aGlzLl9maXN0LnJlbG9jYXRlKGN1ckxvY2FjdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMuX2Zpc3Qucm90YXRpb24gPSAyMDAwICogdGhpcy5fbW92ZVBlcmNlbnRhZ2U7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBMYXlhLnRpbWVyLmxvb3AoMjAsdGhpcyxmdW4sW3RtcFZlY10pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWPkeWKqOWPl+S8pOeJueaViFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGFtYWdlKCk6dm9pZHtcclxuICAgICAgICB0aGlzLl9kYW1hZ2Uuc2V0UGFyYW0oMCwwLHRoaXMuX3NpemUueCx0aGlzLl9zaXplLnkpO1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZS5sb2NhdGlvbkFuZFNpemUoKTtcclxuICAgICAgICB0aGlzLl9kYW1hZ2UuY2hhbmdlQ29sb3IoKTtcclxuICAgICAgICBsZXQgZnVuOkZ1bmN0aW9uID0gKCk9PntcclxuICAgICAgICAgICAgaWYodGhpcy5fdHJhbnNwYXJlbmN5IDwgMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kYW1hZ2UuZ3JhcGhpY3MuY2xlYXIoKTsgXHJcbiAgICAgICAgICAgICAgICB0aGlzLl90cmFuc3BhcmVuY3kgPSAxO1xyXG4gICAgICAgICAgICAgICAgTGF5YS50aW1lci5jbGVhcih0aGlzLGZ1bik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuX3RyYW5zcGFyZW5jeSAtPSAwLjAzO1xyXG4gICAgICAgICAgICB0aGlzLl9kYW1hZ2UuYWxwaGEgPSB0aGlzLl90cmFuc3BhcmVuY3k7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIExheWEudGltZXIubG9vcCgyMCx0aGlzLGZ1bik7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa4suafk+m7mOiupOaMiemSrlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNob3dEZWZhdWx0Qm90dG9ucygpOnZvaWR7XHJcbiAgICAgICAgaWYodGhpcy5fZGVmQnV0dG9uU2hvd2VkID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nwci5hZGRDaGlsZCh0aGlzLl9idXR0b25QYWlyLnJlYWQoMCtcIlwiKS5nZXRTcHIoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nwci5hZGRDaGlsZCh0aGlzLl9idXR0b25QYWlyLnJlYWQoMStcIlwiKS5nZXRTcHIoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2RlZkJ1dHRvblNob3dlZCA9IHRydWU7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nwci5yZW1vdmVDaGlsZCh0aGlzLl9idXR0b25QYWlyLnJlYWQoMCtcIlwiKS5nZXRTcHIoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nwci5yZW1vdmVDaGlsZCh0aGlzLl9idXR0b25QYWlyLnJlYWQoMStcIlwiKS5nZXRTcHIoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2RlZkJ1dHRvblNob3dlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5HluIPpvKDmoIfov5vlhaXkuovku7ZcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBtb3VzZU92ZXIoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3RleHQuc2V0U3dpdGNoT24oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWPkeW4g+m8oOagh+emu+W8gOS6i+S7tlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG1vdXNlT3V0KCk6dm9pZHtcclxuICAgICAgICB0aGlzLl90ZXh0LnNldFN3aXRjaE9mZigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YeN6K6+57yp5pS+5q+UXHJcbiAgICAgKiBAcGFyYW0gdmFsdWUg5paw5YWo5bGA57yp5pS+5q+UXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVTY2FsZSh2YWx1ZTpudW1iZXIpOnZvaWR7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fc2NhbGUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNldERhdGEodGhpcy5fc3ltYix0aGlzLl9pbml0UG9zLHRoaXMuX2luaXRTaXplLHRoaXMuX3Nwci5nZXRDb2xvcigpKTtcclxuICAgICAgICB0aGlzLnNldENvbG9yKCk7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlLnNldFBhcmFtKDAsMCx0aGlzLl9pbml0U2l6ZS54KnRoaXMuX3NjYWxlLHRoaXMuX2luaXRTaXplLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZS5sb2NhdGlvbkFuZFNpemUoKTtcclxuICAgICAgICBcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7mnKxBUlXnmoTlkITpobnlj4LmlbBcclxuICAgICAqIEBwYXJhbSBzeW1iIHN5bWJcclxuICAgICAqIEBwYXJhbSBwb3Mg6LW35aeL5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gc2l6ZSDlpKflsI9cclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldERhdGEoc3ltYjpNeVN5bWJvbCwgcG9zOlZlYzIsIHNpemU6VmVjMixjb2xvcjpzdHJpbmcpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fc3ltYiA9IHN5bWI7XHJcbiAgICAgICAgdGhpcy5fcG9zID0gbmV3IFZlYzIocG9zLngqdGhpcy5fc2NhbGUscG9zLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX3NpemUgPSBuZXcgVmVjMihzaXplLngqdGhpcy5fc2NhbGUsc2l6ZS55KnRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9zcHIuc2V0UGFyYW0odGhpcy5fcG9zLngsdGhpcy5fcG9zLnksdGhpcy5fc2l6ZS54LHRoaXMuX3NpemUueSxjb2xvcik7XHJcbiAgICAgICAgdGhpcy5zZXRDb2xvcigpO1xyXG4gICAgICAgIHRoaXMuX3Nwci5sb2NhdGlvbkFuZFNpemUoKTtcclxuICAgICAgICB0aGlzLl9jZW50ZXJQb3MgPSBuZXcgVmVjMih0aGlzLl9zaXplLngvMix0aGlzLl9zaXplLnkvMik7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gY29sb3Ig6K6+572u6aKc6ImyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRDb2xvcigpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fc3ByLmNoYW5nZUNvbG9yKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gcG9zIOmHjeaWsOiuvue9rui1t+Wni+WdkOagh++8iOS4jeWPl+e8qeaUvuavlOW9seWTje+8iVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVsb2NhdGUocG9zOlZlYzIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fcG9zID0gbmV3IFZlYzIocG9zLngqdGhpcy5fc2NhbGUscG9zLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX2luaXRQb3MgPSBwb3MuY2xvbmUoKTtcclxuICAgICAgICB0aGlzLl9zcHIucmVsb2NhdGUocG9zKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmkafmr4HmnKxBUlVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRlc3RvcnkoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3Nwci5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bmnKxBUlXnmoTotbflp4vlnZDmoIfvvIjkuI3lj5fnvKnmlL7mr5TlvbHlk43vvIlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFBvc1ZlYygpOlZlYzJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luaXRQb3M7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5pysQVJV55qE6buY6K6k5paH5pys5a+56LGhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRUZXh0KCk6VGV4dHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGV4dDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqDpu5jorqTov5vluqbmnaFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZERlZkJhcigpOnZvaWR7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5faW5pdEJhckhlaWdodCA9IDA7XHJcbiAgICAgICAgbGV0IHRtcDpCYXIgPSBuZXcgQmFyKDAsXCIjMDBmZmZmXCIsbmV3IFZlYzIoMzAsNSksbmV3IFZlYzIoMCx0aGlzLl9pbml0QmFySGVpZ2h0IC0gNiksdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX3Nwci5hZGRDaGlsZCh0bXAuZ2V0QmFja1NwcigpKTtcclxuICAgICAgICB0aGlzLl9iYXJQYWlyLmVkaXQoXCJiYXJfMFwiLHRtcCk7XHJcbiAgICAgICAgdGhpcy5faW5pdEJhckhlaWdodCA9IHRoaXMuX2luaXRCYXJIZWlnaHQgLSB0bXAuZ2V0SGVpZ2h0KCkgLSAxO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5pysQVJV55qE5oyH5a6a6L+b5bqm5p2hXHJcbiAgICAgKiBAcGFyYW0gbnVtIOi/m+W6puadoeS7o+WPt1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0QmFyKG51bTpudW1iZXIpOkJhcntcclxuICAgICAgICByZXR1cm4gdGhpcy5fYmFyUGFpci5yZWFkKGBiYXJfJHtudW19YCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqDpmYTliqDov5vluqbmnaFcclxuICAgICAqIEBwYXJhbSBiYWNrR3JvdW5kQ29sb3Ig6K6+572u5paw5aKe6L+b5bqm5p2h6aKc6ImyXHJcbiAgICAgKiBAcGFyYW0gc3ltYiDorr7nva7mlrDlop7ov5vluqbmnaHku6Plj7dcclxuICAgICAqIEBwYXJhbSB4IOWuveW6plxyXG4gICAgICogQHBhcmFtIHkg6auY5bqmXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRFeHRCYXIoYmFja0dyb3VuZENvbG9yOnN0cmluZyxzeW1iOm51bWJlcixwZXJjZW50YWdlOm51bWJlcix4Om51bWJlciA9IDMwLHk6bnVtYmVyID0gNSk6dm9pZHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgdG1wQmFyOkJhciA9IG5ldyBCYXIoc3ltYixiYWNrR3JvdW5kQ29sb3IsbmV3IFZlYzIoeCx5KSxuZXcgVmVjMigwLHRoaXMuX2luaXRCYXJIZWlnaHQgLSB5IC0gMSksdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX3Nwci5hZGRDaGlsZCh0bXBCYXIuZ2V0QmFja1NwcigpKTtcclxuICAgICAgICB0aGlzLl9iYXJQYWlyLmVkaXQoYGJhcl8ke3N5bWJ9YCx0bXBCYXIpO1xyXG4gICAgICAgIHRoaXMuX2luaXRCYXJIZWlnaHQgPSB0aGlzLl9pbml0QmFySGVpZ2h0IC0gdG1wQmFyLmdldEhlaWdodCgpIC0gMTtcclxuICAgICAgICB0bXBCYXIucGVyY2VudGFnZSA9IHBlcmNlbnRhZ2U7XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIOS/ruaUueW3suaciei/m+W6puadoVxyXG4gICAgICogQHBhcmFtIHN5bWIg5oyH5a6a6L+b5bqm5p2h5Luj5Y+3XHJcbiAgICAgKiBAcGFyYW0gcGVyY2VudGFnZSDkv67mlLnov5vluqbmnaHov5vluqZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGVkaXRCYXIoc3ltYjpudW1iZXIsIHBlcmNlbnRhZ2U6bnVtYmVyKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX2JhclBhaXIucmVhZChgYmFyXyR7c3ltYn1gKS5wZXJjZW50YWdlID0gcGVyY2VudGFnZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqDpu5jorqTmjInpkq5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGREZWZCdXR0b25zKCk6dm9pZHtcclxuICAgICAgICBsZXQgdG1wMTpCdXR0b24gPSBuZXcgQnV0dG9uKHRoaXMuX3N5bWIsXCJSZXRyZWF0XCIsMCxuZXcgVmVjMiggLSAyMCx0aGlzLl9pbml0U2l6ZS55KSxuZXcgVmVjMigyMCwxNSksdW5kZWZpbmVkLHRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9idXR0b25QYWlyLmVkaXQoXCIwXCIsdG1wMSk7XHJcbiAgICAgICAgbGV0IHRtcDI6QnV0dG9uID0gbmV3IEJ1dHRvbih0aGlzLl9zeW1iLFwiQWN0aXZhdGVfU2tpbGxcIiwwLG5ldyBWZWMyKHRoaXMuX2luaXRTaXplLngsdGhpcy5faW5pdFNpemUueSksbmV3IFZlYzIoMjAsMTUpLHVuZGVmaW5lZCx0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fYnV0dG9uUGFpci5lZGl0KFwiMVwiLHRtcDIpO1xyXG4gICAgICAgIHRoaXMuX2J1dHRvbkhlaWdodCA9IHRoaXMuX2luaXRTaXplLnkgKyAxNjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlnKjpu5jorqTkvY3nva7mt7vliqDpop3lpJbmjInpkq5cclxuICAgICAqIEBwYXJhbSBuYW1lIFxyXG4gICAgICogQHBhcmFtIG51bSBcclxuICAgICAqIEBwYXJhbSBjb2xvciBcclxuICAgICAqIEBwYXJhbSBmdW4gXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRFeHRyYUJ1dHRvbnNBdERlZkxvY2F0aW9uKG5hbWU6c3RyaW5nLG51bTpudW1iZXIsIGNvbG9yPzpzdHJpbmcsIGZ1bj86RnVuY3Rpb24pOnZvaWR7XHJcbiAgICAgICAgbGV0IHRtcEJ1dDpCdXR0b24gPSBuZXcgQnV0dG9uKHRoaXMuX3N5bWIsbmFtZSxudW0sbmV3IFZlYzIoMCx0aGlzLl9idXR0b25IZWlnaHQpLG5ldyBWZWMyKDIwLDE1KSxjb2xvcix0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fYnV0dG9uUGFpci5lZGl0KG51bStcIlwiLHRtcEJ1dCk7XHJcbiAgICAgICAgdGhpcy5fc3ByLmFkZENoaWxkKHRtcEJ1dC5nZXRTcHIoKSk7XHJcbiAgICAgICAgdGhpcy5fYnV0dG9uSGVpZ2h0ICs9IDE2O1xyXG4gICAgICAgIHRtcEJ1dC5zZXRGdW5jKGZ1bik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlnKjmjIflrprkvY3nva7mt7vliqDpop3lpJbmjInpkq5cclxuICAgICAqIEBwYXJhbSBuYW1lIFxyXG4gICAgICogQHBhcmFtIG51bSBcclxuICAgICAqIEBwYXJhbSBmdW4gXHJcbiAgICAgKiBAcGFyYW0gcG9zIFxyXG4gICAgICogQHBhcmFtIHNpemUgXHJcbiAgICAgKiBAcGFyYW0gY29sb3IgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRFeHRyYUJ1dHRvbkF0Tm9EZWZMb2NhdGlvbihuYW1lOnN0cmluZyxudW06bnVtYmVyLGZ1bjpGdW5jdGlvbixwb3M6VmVjMixzaXplOlZlYzIsIGNvbG9yPzpzdHJpbmcpOnZvaWR7XHJcbiAgICAgICAgbGV0IHRtcEJ1dDpCdXR0b24gPSBuZXcgQnV0dG9uKHRoaXMuX3N5bWIsbmFtZSxudW0scG9zLHNpemUsY29sb3IsdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX2J1dHRvblBhaXIuZWRpdChudW0rXCJcIix0bXBCdXQpO1xyXG4gICAgICAgIHRoaXMuX3Nwci5hZGRDaGlsZCh0bXBCdXQuZ2V0U3ByKCkpO1xyXG4gICAgICAgIHRtcEJ1dC5zZXRGdW5jKGZ1bik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bmjInpkq5cclxuICAgICAqIEBwYXJhbSBudW0g5oyJ6ZKu57yW5Y+3XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRCdXR0b24obnVtOm51bWJlcik6QnV0dG9ue1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9idXR0b25QYWlyLnJlYWQobnVtK1wiXCIpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iLCIvL2F1dGhvciBOYTJDdUM0TzhcclxuaW1wb3J0IEN1c3RvbWl6ZWRTcHJpdGUgZnJvbSBcIi4vY3VzdG9taXplZFNwclwiO1xyXG5pbXBvcnQgeyBWZWMyIH0gZnJvbSBcIi4uLy4uL0RvZE1hdGhcIjtcclxuaW1wb3J0IHsgRXZlbnRDZW50cmUgfSBmcm9tIFwiLi4vLi4vLi4vRXZlbnQvRXZlbnRDZW50cmVcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQ2hlc3NCb2FyZCBleHRlbmRzIEN1c3RvbWl6ZWRTcHJpdGV7XHJcbiAgICBwcml2YXRlIF9pbml0UG9zOlZlYzI7XHJcbiAgICBwcml2YXRlIF9pbml0U2l6ZTpWZWMyO1xyXG4gICAgcHJpdmF0ZSBfbnVtQXJyOm51bWJlcltdW107Ly8yZCBhcnIgd2hpY2ggcmVwcmVzZW50cyB0aGUgY2hlc3MgYm9hcmRcclxuICAgIHByaXZhdGUgX3Bvc1ZlYzI6VmVjMjsvL2luaXRpYWwgbG9jYXRpb24oeCx5KVxyXG4gICAgcHJpdmF0ZSBfdW5pdFNpemVWZWMyOlZlYzI7Ly91bml0IHNpemUod2lkdGgsIGhlaWdodClcclxuICAgIHByaXZhdGUgX2Zyb250U3ByQXJyOkN1c3RvbWl6ZWRTcHJpdGVbXVtdOy8vZnJvbnQgc3ByXHJcbiAgICBwcml2YXRlIF9zY2FsZTpudW1iZXI7Ly9zY2FsZSBmb3Igem9vbWluZ1xyXG4gICAgcHJpdmF0ZSBfYmFja0dyb3VuZENvbG9yOnN0cmluZzsvL2JhY2tncm91bmQgY29sb3JcclxuICAgIHByaXZhdGUgX2Zyb250Q29sb3I6c3RyaW5nOy8vZnJvbnQgY29sb3IgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmo4vnm5jmnoTpgKDlmahcclxuICAgICAqIEBwYXJhbSBhcnIg5LqM57u05pWw57uEXHJcbiAgICAgKiBAcGFyYW0gcG9zVmVjMiDotbflp4vlnZDmoIdcclxuICAgICAqIEBwYXJhbSB1bml0c2l6ZSDljZXkvY3lrr3pq5hcclxuICAgICAqIEBwYXJhbSBiYWNrR3JvdW5kQ29sb3Ig6IOM5pmv6aKc6ImyXHJcbiAgICAgKiBAcGFyYW0gZnJvbnRDb2xvciDmoLzlrZDpopzoibJcclxuICAgICAqIEBwYXJhbSBmYXRoZXIg54i257uY5Zu+6IqC54K5XHJcbiAgICAgKiBAcGFyYW0gc2NhbGUg57yp5pS+5q+UXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGFycjpudW1iZXJbXVtdLCBwb3NWZWMyOlZlYzIsIHVuaXRzaXplOlZlYzIsIGJhY2tHcm91bmRDb2xvcjpzdHJpbmcsIGZyb250Q29sb3I6c3RyaW5nLCBzY2FsZTpudW1iZXIpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fbnVtQXJyID0gYXJyO1xyXG4gICAgICAgIHRoaXMuX2luaXRQb3MgPSBwb3NWZWMyO1xyXG4gICAgICAgIHRoaXMuX2luaXRTaXplID0gdW5pdHNpemU7XHJcbiAgICAgICAgdGhpcy5fc2NhbGUgPSBzY2FsZTtcclxuICAgICAgICB0aGlzLl9wb3NWZWMyID0gbmV3IFZlYzIodGhpcy5faW5pdFBvcy54KnRoaXMuX3NjYWxlLCB0aGlzLl9pbml0UG9zLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3VuaXRTaXplVmVjMiA9IG5ldyBWZWMyKHRoaXMuX2luaXRTaXplLnggKiB0aGlzLl9zY2FsZSx0aGlzLl9pbml0U2l6ZS55ICogdGhpcy5fc2NhbGUpOy8vcmVjYWxjdWxhdGUgdW5pdFNpemVcclxuICAgICAgICB0aGlzLl9iYWNrR3JvdW5kQ29sb3IgPSBiYWNrR3JvdW5kQ29sb3I7XHJcbiAgICAgICAgdGhpcy5fZnJvbnRDb2xvciA9IGZyb250Q29sb3I7XHJcbiAgICAgICAgdGhpcy5pbml0QmFja2dyb3VuZCgpO1xyXG4gICAgICAgIHRoaXMuc2V0Q29sb3IodGhpcy5fYmFja0dyb3VuZENvbG9yKTtcclxuICAgICAgICB0aGlzLmNoYW5nZUNvbG9yKCk7XHJcbiAgICAgICAgdGhpcy5pbml0RnJvbnRTcHJBcnIoKTtcclxuICAgICAgICB0aGlzLnJlbmRlckZyb250U3ByKHRoaXMuX2Zyb250Q29sb3IpO1xyXG4gICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLm9uKEV2ZW50Q2VudHJlLkVUeXBlLlBFUkZPUk1BTkNFX1JFU0NBTEUoKSx0aGlzLHRoaXMucmVTY2FsZSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZHJhdyBiYWNrZ3JvdW5kXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdEJhY2tncm91bmQoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuc2V0UGFyYW0odGhpcy5fcG9zVmVjMi54LHRoaXMuX3Bvc1ZlYzIueSx0aGlzLl9udW1BcnJbMF0ubGVuZ3RoKnRoaXMuX3VuaXRTaXplVmVjMi54LHRoaXMuX251bUFyci5sZW5ndGgqdGhpcy5fdW5pdFNpemVWZWMyLnksdGhpcy5fYmFja0dyb3VuZENvbG9yKTtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uQW5kU2l6ZSgpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZHJhdyBmcm9udFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRGcm9udFNwckFycigpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fZnJvbnRTcHJBcnIgPSBbXTsvL2luaXQgY3VzdFNwckFyclxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9udW1BcnIubGVuZ3RoOyBpICsrKXtcclxuICAgICAgICAgICAgbGV0IHRtcEFycjpDdXN0b21pemVkU3ByaXRlW10gPSBbXTtcclxuICAgICAgICAgICAgZm9yKCBsZXQgaiA9IDA7IGogPCB0aGlzLl9udW1BcnJbMF0ubGVuZ3RoOyBqICsrKXtcclxuICAgICAgICAgICAgICAgIGxldCB0bXBTcHI6Q3VzdG9taXplZFNwcml0ZSA9IG5ldyBDdXN0b21pemVkU3ByaXRlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZENoaWxkKHRtcFNwcik7XHJcbiAgICAgICAgICAgICAgICB0bXBTcHIuc2V0UGFyYW0oMCtqKnRoaXMuX3VuaXRTaXplVmVjMi54LDAraSp0aGlzLl91bml0U2l6ZVZlYzIueSx0aGlzLl91bml0U2l6ZVZlYzIueCx0aGlzLl91bml0U2l6ZVZlYzIueSx0aGlzLl9mcm9udENvbG9yLG5ldyBWZWMyKDEsMSkpO1xyXG4gICAgICAgICAgICAgICAgdG1wU3ByLmxvY2F0aW9uQW5kU2l6ZSgpO1xyXG4gICAgICAgICAgICAgICAgdG1wU3ByLnNldENvbG9yKHRoaXMuX2Zyb250Q29sb3IpO1xyXG4gICAgICAgICAgICAgICAgdG1wU3ByLmNoYW5nZUNvbG9yKCk7XHJcbiAgICAgICAgICAgICAgICB0bXBTcHIuek9yZGVyID0gLTE7XHJcbiAgICAgICAgICAgICAgICB0bXBBcnIucHVzaCh0bXBTcHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2Zyb250U3ByQXJyLnB1c2godG1wQXJyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBjb2xvciBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZW5kZXJGcm9udFNwcihjb2xvcjpzdHJpbmcpe1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9mcm9udFNwckFyci5sZW5ndGg7IGkgKyspe1xyXG4gICAgICAgICAgICBmb3IoIGxldCBqID0gMDsgaiA8IHRoaXMuX2Zyb250U3ByQXJyWzBdLmxlbmd0aDsgaiArKyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9mcm9udFNwckFycltpXVtqXS5zZXRDb2xvcihjb2xvcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9mcm9udFNwckFycltpXVtqXS5jaGFuZ2VDb2xvcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5L+u5pS55YmN5pa55qC85a2Q6aKc6ImyXHJcbiAgICAgKiBAcGFyYW0gcG9zVmVjMiDlvoXkv67mlLnmoLzlrZDlnZDmoIfvvIh4LHnvvIlcclxuICAgICAqIEBwYXJhbSBjb2xvciDnm67moIfpopzoibJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNoYW5nZUZyb250Q29sb3IocG9zVmVjMjpWZWMyLGNvbG9yOnN0cmluZyk6dm9pZHtcclxuICAgICAgICB0aGlzLl9mcm9udFNwckFycltwb3NWZWMyLnldW3Bvc1ZlYzIueF0uc2V0Q29sb3IoY29sb3IpO1xyXG4gICAgICAgIHRoaXMuX2Zyb250U3ByQXJyW3Bvc1ZlYzIueV1bcG9zVmVjMi54XS5jaGFuZ2VDb2xvcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5riF6Zmk5omA5pyJ5bey57uY5Zu+5b2iXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2xlYXJBbGwoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuZ3JhcGhpY3MuY2xlYXIoKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fZnJvbnRTcHJBcnIubGVuZ3RoOyBpICsrKXtcclxuICAgICAgICAgICAgZm9yKCBsZXQgaiA9IDA7IGogPCB0aGlzLl9mcm9udFNwckFyclswXS5sZW5ndGg7IGogKyspe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZnJvbnRTcHJBcnJbaV1bal0uZ3JhcGhpY3MuY2xlYXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmHjeiuvuaji+ebmOe8qeaUvuavlFxyXG4gICAgICogQHBhcmFtIG51bSDnvKnmlL7mr5RcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlU2NhbGUobnVtOm51bWJlcik6dm9pZHtcclxuICAgICAgICB0aGlzLl9zY2FsZSA9IG51bTtcclxuICAgICAgICB0aGlzLl9wb3NWZWMyID0gbmV3IFZlYzIodGhpcy5faW5pdFBvcy54KnRoaXMuX3NjYWxlLHRoaXMuX2luaXRQb3MueSp0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fdW5pdFNpemVWZWMyID0gbmV3IFZlYzIodGhpcy5faW5pdFNpemUueCAqIHRoaXMuX3NjYWxlLHRoaXMuX2luaXRTaXplLnkgKiB0aGlzLl9zY2FsZSk7Ly9yZWNhbGN1bGF0ZSB1bml0U2l6ZVxyXG4gICAgICAgIHRoaXMuY2xlYXJBbGwoKTtcclxuICAgICAgICB0aGlzLmluaXRCYWNrZ3JvdW5kKCk7XHJcbiAgICAgICAgdGhpcy5pbml0RnJvbnRTcHJBcnIoKTtcclxuICAgICAgICB0aGlzLnNldENvbG9yKHRoaXMuX2JhY2tHcm91bmRDb2xvcik7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VDb2xvcigpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyRnJvbnRTcHIodGhpcy5fZnJvbnRDb2xvcik7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBWZWMyIH0gZnJvbSBcIi4uLy4uL0RvZE1hdGhcIjtcclxuXHJcbi8vYXV0aG9yIE5hMkN1QzRPOFxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3VzdG9taXplZFNwcml0ZSBleHRlbmRzIExheWEuU3ByaXRle1xyXG4gICAgcHJpdmF0ZSBfY29sb3I6c3RyaW5nOy8v5Y+v6KeG6IqC54K56aKc6ImyXHJcbiAgICBwcml2YXRlIF9ncmFwaGljU2hpZnQ6VmVjMjsvL+mHjeWPoOe7mOWbvuWBj+enu+mHj1xyXG4gICAgcHJpdmF0ZSBfY2VudHJhbFNoaWZ0Oy8v5Lit5b+D57uY5Zu+5YGP56e76YePXHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjZW50cmFsU2hpZnRDb2xvcmVkKCk6dm9pZHtcclxuICAgICAgICB0aGlzLmdyYXBoaWNzLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5ncmFwaGljcy5kcmF3UmVjdCgtdGhpcy53aWR0aC8yLC10aGlzLmhlaWdodC8yLHRoaXMud2lkdGgsdGhpcy5oZWlnaHQsdGhpcy5fY29sb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gY29sb3IgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRDb2xvcihjb2xvcjpzdHJpbmcpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fY29sb3IgPSBjb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS/ruaUueminOiJslxyXG4gICAgICogQHBhcmFtIGNvbG9yIOebruagh+minOiJslxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2hhbmdlQ29sb3IoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuZ3JhcGhpY3MuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLmdyYXBoaWNzLmRyYXdSZWN0KHRoaXMuX2dyYXBoaWNTaGlmdC54LHRoaXMuX2dyYXBoaWNTaGlmdC55LHRoaXMud2lkdGgtMip0aGlzLl9ncmFwaGljU2hpZnQueCx0aGlzLmhlaWdodC0yKnRoaXMuX2dyYXBoaWNTaGlmdC55LHRoaXMuX2NvbG9yKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruebuOWFs+WPguaVsFxyXG4gICAgICogQHBhcmFtIHBvc1gg6LW35aeLeFxyXG4gICAgICogQHBhcmFtIHBvc1kg6LW35aeLeVxyXG4gICAgICogQHBhcmFtIHdpZHRoIOWuveW6plxyXG4gICAgICogQHBhcmFtIGhlaWdodCDpq5jluqZcclxuICAgICAqIEBwYXJhbSBjb2xvciDpopzoibJcclxuICAgICAqIEBwYXJhbSBncmFwaGljU2hpZnQg5qOL55uY5YGP56e75YC8XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRQYXJhbShwb3NYOm51bWJlciwgcG9zWTpudW1iZXIsIHdpZHRoOm51bWJlciwgaGVpZ2h0Om51bWJlciwgY29sb3I6c3RyaW5nID0gdGhpcy5fY29sb3IsIGdyYXBoaWNTaGlmdDpWZWMyID0gbmV3IFZlYzIoMCwwKSk6dm9pZHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnggPSBwb3NYO1xyXG4gICAgICAgIHRoaXMueSA9IHBvc1k7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuc2V0Q29sb3IoY29sb3IpO1xyXG4gICAgICAgIHRoaXMuX2dyYXBoaWNTaGlmdCA9IGdyYXBoaWNTaGlmdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS/ruaUueWdkOagh+WSjOWkp+Wwj1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9jYXRpb25BbmRTaXplKCk6dm9pZHtcclxuICAgICAgICB0aGlzLnBvcyh0aGlzLngsdGhpcy55KS5zaXplKHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YeN6K6+5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gcG9zVmVjMiDnm67moIflnZDmoIdcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbG9jYXRlKHBvc1ZlYzI6VmVjMik6dm9pZHtcclxuICAgICAgICB0aGlzLnggPSBwb3NWZWMyLng7XHJcbiAgICAgICAgdGhpcy55ID0gcG9zVmVjMi55O1xyXG4gICAgICAgIHRoaXMubG9jYXRpb25BbmRTaXplKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDph43orr7lrr3pq5hcclxuICAgICAqIEBwYXJhbSBzaXplVmVjMiDnm67moIflrr3pq5hcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlU2l6ZShzaXplVmVjMjpWZWMyKTp2b2lke1xyXG4gICAgICAgIHRoaXMud2lkdGggPSBzaXplVmVjMi54O1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gc2l6ZVZlYzIueTtcclxuICAgICAgICB0aGlzLmNoYW5nZUNvbG9yKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57lvZPliY3lm77lvaLotbflp4vlnZDmoIdcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFBvcygpOlZlYzJ7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMyKHRoaXMueCx0aGlzLnkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue5bey57uY5Yy65Z+f5aSn5bCPXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRTaXplKCk6VmVjMntcclxuICAgICAgICByZXR1cm4gbmV3IFZlYzIodGhpcy53aWR0aCx0aGlzLmhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFxyXG4gICAgICog6L+U5Zue5b2T5YmN5bey57uY5Yy65Z+f6aKc6ImyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRDb2xvcigpOnN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29sb3I7XHJcbiAgICB9XHJcbn0iLCIvL2F1dGhvciBOYTJDdUM0TzhcclxuXHJcbmltcG9ydCBBY3RvclJVIGZyb20gXCIuL1N5bWJvbGl6ZWRSZW5kZXJcIjtcclxuaW1wb3J0IHsgS1ZQYWlyIH0gZnJvbSBcIi4uLy4uL0RvZERhdGFTdHJ1Y3R1cmVcIjtcclxuaW1wb3J0IHsgTXlTeW1ib2wgfSBmcm9tIFwiLi4vLi4vLi4vRml4L0ZpeFN5bWJvbFwiO1xyXG5cclxuXHJcbi8v5YKo5a2Y5omA5pyJ57uY5Zu+6IqC54K55a+56LGhXHJcbmV4cG9ydCBjbGFzcyBBY3RvckJveHtcclxuICAgIHB1YmxpYyBzdGF0aWMgQm94OktWUGFpcjxBY3RvclJVPiA9IG5ldyBLVlBhaXIoKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgYWRkKGFjdDpBY3RvclJVLHN5bWI6TXlTeW1ib2wpOnZvaWR7XHJcbiAgICAgICAgQWN0b3JCb3guQm94LmVkaXQoc3ltYi5kYXRhK1wiXCIsYWN0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldChzeW06bnVtYmVyKTpBY3RvclJVe1xyXG4gICAgICAgIHJldHVybiBBY3RvckJveC5Cb3gucmVhZChzeW0rXCJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbn0iLCJpbXBvcnQgeyBWZWMyIH0gZnJvbSBcIi4uL0NvbW1vbi9Eb2RNYXRoXCI7XHJcbmltcG9ydCB7IE15U3ltYm9sIH0gZnJvbSBcIi4uL0ZpeC9GaXhTeW1ib2xcIjtcclxuLy8vLy8vXHJcbmV4cG9ydCBjbGFzcyBFdmVudENlbnRyZXtcclxuICAgIHB1YmxpYyBzdGF0aWMgaW5zdGFuY2U6RXZlbnRDZW50cmU7XHJcbiAgICBwdWJsaWMgc3RhdGljIEVUeXBlOkVUeXBlO1xyXG4gICAgcHVibGljIHN0YXRpYyBpbml0KCk6dm9pZHtcclxuICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZSA9IG5ldyBFdmVudENlbnRyZSgpO1xyXG4gICAgICAgIEV2ZW50Q2VudHJlLkVUeXBlID0gbmV3IEVUeXBlKCk7XHJcbiAgICAgICAgRXZlbnRDZW50cmUuaW5pdCA9ICgpPT57fTtcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBfY2VudHJlOkxheWEuRXZlbnREaXNwYXRjaGVyID0gbmV3IExheWEuRXZlbnREaXNwYXRjaGVyKCk7XHJcblxyXG4gICAgcHVibGljIG9uKHR5cGU6c3RyaW5nLCBjYWxsZXI6YW55LCBsaXN0ZW5lcjpGdW5jdGlvbiwgYXJncz86YW55W10pOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fY2VudHJlLm9uKHR5cGUsY2FsbGVyLGxpc3RlbmVyLGFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBldmVudCh0eXBlOnN0cmluZywgYXJncz86YW55KTp2b2lke1xyXG4gICAgICAgIHRoaXMuX2NlbnRyZS5ldmVudCh0eXBlLGFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvZmYodHlwZTpzdHJpbmcsIGNhbGxlcjphbnksIGxpc3RlbmVyOkZ1bmN0aW9uKXtcclxuICAgICAgICB0aGlzLl9jZW50cmUub2ZmKHR5cGUsIGNhbGxlciwgbGlzdGVuZXIpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCl7fVxyXG59XHJcblxyXG5cclxuY2xhc3MgRVR5cGUge1xyXG4gICAgcHVibGljIExFQVZFKHBvczpWZWMyLCBpZGVudGl0eTpzdHJpbmcpOnN0cmluZ3tcclxuICAgICAgICByZXR1cm4gYCR7aWRlbnRpdHl9OkNPTExJU0lPTl9FVkVOVF9MRUFWRV9GUk9NKCR7cG9zLnh9fCR7cG9zLnl9KWA7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgRU5UUkUocG9zOlZlYzIsIGlkZW50aXR5OnN0cmluZyk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBgJHtpZGVudGl0eX06Q09MTElTSU9OX0VWRU5UX0VOVFJFX1RPKCR7cG9zLnh9fCR7cG9zLnl9KWA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBuZXcgYWRkZWQgZm9yIHBlcmZvcm1hbmNlIHN0YXJ0cyBoZXJlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBQRVJGT1JNQU5DRV9SRVNDQUxFKCk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBcIlJFU0NBTEVcIjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUEVSRk9STUFOQ0VfVEVYVF9TV0lUQ0goKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIFwiVEVYVF9TV0lUQ0hcIjtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogbmV3IGFkZGVkIGZvciBwZXJmb3JtYW5jZSBlbmRzIGhlcmVcclxuICAgICAqL1xyXG59IiwiaW1wb3J0IHsgVmVjMiwgRG9kTWF0aCB9IGZyb20gXCIuLi9Db21tb24vRG9kTWF0aFwiO1xyXG5pbXBvcnQgeyBBcnJheUFsZ28gfSBmcm9tIFwiLi4vQ29tbW9uL0RvZERhdGFTdHJ1Y3R1cmVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBGaXhSZWN0IGV4dGVuZHMgTGF5YS5SZWN0YW5nbGV7XHJcbiAgICBjb25zdHJ1Y3Rvcih4PzpudW1iZXIsIHk/Om51bWJlciwgd2lkdGg/Om51bWJlciwgaGVpZ2h0PzpudW1iZXIpe1xyXG4gICAgICAgIHN1cGVyKHgseSx3aWR0aCxoZWlnaHQpO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJleHBvcnQgaW50ZXJmYWNlIFN5bWJvbGl6ZWR7XHJcbiAgICBzeW1ib2w6TXlTeW1ib2w7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNeVN5bWJvbHtcclxuICAgIHByaXZhdGUgc3RhdGljIGNvdW50Om51bWJlciA9IDA7XHJcblxyXG4gICAgcHJpdmF0ZSBfZGF0YTpudW1iZXI7XHJcblxyXG4gICAgcHVibGljIGdldCBkYXRhKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IE15U3ltYm9sLmNvdW50O1xyXG4gICAgICAgIE15U3ltYm9sLmNvdW50ICs9IDE7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBGaXhUaW1lIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZnJhbWVSYXRlOiBudW1iZXIgPSA2MDtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZGVsdGFUaW1lOiBudW1iZXIgPSAxIC8gRml4VGltZS5mcmFtZVJhdGU7XHJcbiAgICBwdWJsaWMgc3RhdGljIGZyYW1lQ291bnQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgZWxhcHNlZFRpbWU6IG51bWJlcjtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5mcmFtZUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLmVsYXBzZWRUaW1lID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmZyYW1lQ291bnQrKztcclxuICAgICAgICB0aGlzLmVsYXBzZWRUaW1lICs9IHRoaXMuZGVsdGFUaW1lO1xyXG4gICAgfVxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXHJcbmltcG9ydCBHYW1lIGZyb20gXCIuL1NjZW5lU2NyaXB0L0dhbWVcIlxuaW1wb3J0IExvYWRpbmcgZnJvbSBcIi4vU2NlbmVTY3JpcHQvTG9hZGluZ1wiXHJcbi8qXHJcbiog5ri45oiP5Yid5aeL5YyW6YWN572uO1xyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ29uZmlne1xyXG4gICAgc3RhdGljIHdpZHRoOm51bWJlcj0xODAwO1xyXG4gICAgc3RhdGljIGhlaWdodDpudW1iZXI9OTAwO1xyXG4gICAgc3RhdGljIHNjYWxlTW9kZTpzdHJpbmc9XCJub3NjYWxlXCI7XHJcbiAgICBzdGF0aWMgc2NyZWVuTW9kZTpzdHJpbmc9XCJub25lXCI7XHJcbiAgICBzdGF0aWMgYWxpZ25WOnN0cmluZz1cInRvcFwiO1xyXG4gICAgc3RhdGljIGFsaWduSDpzdHJpbmc9XCJsZWZ0XCI7XHJcbiAgICBzdGF0aWMgc3RhcnRTY2VuZTphbnk9XCJMb2FkaW5nU2NlbmUuc2NlbmVcIjtcclxuICAgIHN0YXRpYyBzY2VuZVJvb3Q6c3RyaW5nPVwiXCI7XHJcbiAgICBzdGF0aWMgZGVidWc6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBzdGF0OmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgcGh5c2ljc0RlYnVnOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgZXhwb3J0U2NlbmVUb0pzb246Ym9vbGVhbj10cnVlO1xyXG4gICAgY29uc3RydWN0b3IoKXt9XHJcbiAgICBzdGF0aWMgaW5pdCgpe1xyXG4gICAgICAgIHZhciByZWc6IEZ1bmN0aW9uID0gTGF5YS5DbGFzc1V0aWxzLnJlZ0NsYXNzO1xyXG4gICAgICAgIHJlZyhcIlNjZW5lU2NyaXB0L0dhbWUudHNcIixHYW1lKTtcbiAgICAgICAgcmVnKFwiU2NlbmVTY3JpcHQvTG9hZGluZy50c1wiLExvYWRpbmcpO1xyXG4gICAgfVxyXG59XHJcbkdhbWVDb25maWcuaW5pdCgpOyIsImltcG9ydCB7IENvbGlFbWl0IH0gZnJvbSBcIi4vQWN0b3JNb2R1bGVzL0NvbGlNZXNzYWdlXCI7XHJcbmltcG9ydCB7IFByb2ZpbGUgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvUHJvZmlsZVwiO1xyXG5pbXBvcnQgeyBTeW1ib2xpemVkLCBNeVN5bWJvbCB9IGZyb20gXCIuLi8uLi9GaXgvRml4U3ltYm9sXCI7XHJcbmltcG9ydCB7IEJ1ZmYgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvQnVmZlwiO1xyXG5pbXBvcnQgeyBBdGtTdGF0ZU1hY2hpbmUgfSBmcm9tIFwiLi9BdHRhY2svQXRrQWJzdFwiO1xyXG5pbXBvcnQgeyBEYW1hZ2UgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvRGFtYWdlXCI7XHJcbmltcG9ydCB7IEFjdG9yVHlwZSB9IGZyb20gXCIuLi8uLi9Db21tb24vRG9kS2V5XCI7XHJcbmltcG9ydCBBY3RvclN0YXRlTWdyLCB7IEFjdG9yU3RhdGVJRCB9IGZyb20gXCIuL1N0YXRlL0FjdG9yU3RhdGVGc21cIjtcclxuaW1wb3J0IHsgQWN0b3JCdWZmTWdyIH0gZnJvbSBcIi4vQWN0b3JNb2R1bGVzL0FjdG9yQnVmZk1nclwiO1xyXG5pbXBvcnQgeyBUcmFuc2Zvcm0gfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvVHJhbnNmb3JtXCI7XHJcbmltcG9ydCB7IFVuaXRSZW5kZXIgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvVW5pdFJlbmRlclwiO1xyXG5pbXBvcnQgeyBBbmltYXRpb24gfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvQW5pbWF0aW9uXCI7XHJcbmltcG9ydCBSb3V0ZSBmcm9tIFwiLi9BY3RvclJvdXRlXCI7XHJcbmltcG9ydCB7IEFjdG9yU2tpbGwgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvQWN0b3JTa2lsbFwiO1xyXG5pbXBvcnQgeyBBY3RvckNvc3QgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvQWN0b3JDb3N0XCI7XHJcbmltcG9ydCB7IEJsb2NrZXIgfSBmcm9tIFwiLi9BdHRhY2svQmxvY2tlclwiO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbi8v5Z+65pys5Y6f5YiZ77ya5bCR55So57un5om/77yM5aSa55So57uE5ZCIXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjdG9yIGltcGxlbWVudHMgU3ltYm9saXplZHtcclxuICAgIHB1YmxpYyBzeW1ib2w6IE15U3ltYm9sOyAvL+WFqOWxgOWUr+S4gOeahOagh+ivhuaVsOWtl1xyXG4gICAgcHVibGljIHR5cGU6IEFjdG9yVHlwZSA9IEFjdG9yVHlwZS5Ob25lOyAvL+m7mOiupOi6q+S7veS4ukFjdG9yXHJcblxyXG4gICAgcHVibGljIHN0YXRlOiBBY3RvclN0YXRlTWdyOyAvL+eKtuaAgeacuiDnu5/nrbnnirbmgIHmm7TmlrBcclxuXHJcbiAgICBwdWJsaWMgcHJvZmlsZTpQcm9maWxlOy8v5Z+65pys5bGe5oCn5LiO6K6/6Zeu5pa55rOV5ZCI6ZuGXHJcblxyXG4gICAgcHVibGljIGF0azogQXRrU3RhdGVNYWNoaW5lOy8v5pS75Ye754q25oCB5py6XHJcbiAgICBwdWJsaWMgY29saUVtaXQ6Q29saUVtaXQgPSBuZXcgQ29saUVtaXQoMCwwLENvbGlFbWl0LkdMT0JBTF9VTklUX1NVQldJRFRILENvbGlFbWl0LkdMT0JBTF9VTklUX1NVQkhFSUdIVCk7Ly/norDmkp7kuovku7blj5HluIPogIVcclxuICAgIHB1YmxpYyBibG9ja2VyOkJsb2NrZXI7Ly/pmLvmjKHmqKHlnZdcclxuICAgIHB1YmxpYyBidWZmTWdyOkFjdG9yQnVmZk1ncjtcclxuICAgIHB1YmxpYyB0cmFuc2Zvcm06VHJhbnNmb3JtO1xyXG4gICAgcHVibGljIHJlbmRlcjpVbml0UmVuZGVyO1xyXG4gICAgcHVibGljIGFuaW1hdGlvbjpBbmltYXRpb247XHJcbiAgICBwdWJsaWMgcm91dGU6Um91dGU7Ly/ot6/lvoTlr7nosaFcclxuICAgIHB1YmxpYyBza2lsbDpBY3RvclNraWxsO1xyXG4gICAgcHVibGljIGNvc3Q6QWN0b3JDb3N0O1xyXG5cclxuICAgIC8vVE9ET++8muWOu+WMheS4gOS4que7hOS7tlxyXG4gICAgLy8gLyoqXHJcbiAgICAvLyAgKiDnm67moIfpgInmi6nlmahcclxuICAgIC8vICAqL1xyXG4gICAgLy8gcHVibGljIHNlZWtlcjogU2Vla2VyO1xyXG5cclxuICAgIC8vIC8qXHJcbiAgICAvLyAqIOW9k+WJjemUgeWumuebruagh1xyXG4gICAgLy8gKiAqL1xyXG4gICAgLy8gcHVibGljIGZvY3VzOiBBY3RvcjtcclxuXHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHR5cGU6IEFjdG9yVHlwZSwgcmVzOiBhbnkpIHtcclxuXHJcbiAgICAgICAgcmVzWyd4eHgnXSA9IDExNDUxNDE5MTk4MTA7XHJcblxyXG4gICAgICAgIHRoaXMuc3ltYm9sID0gbmV3IE15U3ltYm9sKCk7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gbmV3IEFjdG9yU3RhdGVNZ3IodGhpcyk7XHJcbiAgICAgICAgLy8gYWNjb3JkaW5nIHRvIGRpZmZlcmVudCB0eXBlLCBhZGQgZGlmZmVyZW50IGNvbXBvbmVudHMgdG8gdGhpcyBhY3Rvci4gXHJcblxyXG4gICAgICAgIHRoaXMucHJvZmlsZSA9IG5ldyBQcm9maWxlKHRoaXMsIHJlc1sneHh4J10pOyBcclxuICAgICAgICB0aGlzLmF0ayA9IG5ldyBBdGtTdGF0ZU1hY2hpbmUodGhpcywgcmVzWyd4eHgnXSk7XHJcbiAgICAgICAgdGhpcy5ibG9ja2VyID0gbmV3IEJsb2NrZXIodGhpcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5idWZmTWdyID0gbmV3IEFjdG9yQnVmZk1ncih0aGlzLCByZXNbJ3h4eCddKTtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybSA9IG5ldyBUcmFuc2Zvcm0odGhpcyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIgPSBuZXcgVW5pdFJlbmRlcih0aGlzKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IG5ldyBBbmltYXRpb24odGhpcywgcmVzWyd4eHgnXSk7XHJcbiBcclxuICAgICAgICBpZiAoQWN0b3JUeXBlLk1vbnN0ZXIgPT0gdGhpcy50eXBlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGUgPSBuZXcgUm91dGUodGhpcywgcmVzWyd4eHgnXSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoQWN0b3JUeXBlLk9wZXJhdG9yID09IHRoaXMudHlwZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNraWxsID0gbmV3IEFjdG9yU2tpbGwodGhpcywgcmVzWyd4eHgnXSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmNvc3QgPSBuZXcgQWN0b3JDb3N0KHRoaXMpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGF3YWtlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGUucnVuU3RhdGUoQWN0b3JTdGF0ZUlELlByZXBhcmVkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGUudXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIC8vIHJlc2V0IGNsZWFyIHJlc291cmNlIHJlbGF0ZWQgbW9kdWxlXHJcbiAgICAgICAgLy8gdGhpcy5yZW5kZXIucmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0T25NYXAoKTogdm9pZCB7XHJcbiAgICAgICAgLy9UT0RPXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFBvc2l0aW9uKCk6IHZvaWQge1xyXG4gICAgICAgIC8vVE9ET1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pS75Ye75LiA5Liq5oiW5aSa5LiqQWN0b3Lnm67moIdcclxuICAgICAqIDIwMjAvMy81IOaUu+WHu+mAu+i+keW3suS7juS6i+S7tuinpuWPkeaUueS4uuebtOaOpeiwg+eUqFxyXG4gICAgICog5Y+R6LW35ZKM5o6l5pS25pS75Ye755qE6YC76L6R5Z2H5bCB6KOF5ZyoQWN0b3LnsbvkuK1cclxuICAgICAqIEBwYXJhbSB2aWN0aW0gXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhdHRhY2soLi4udmljdGltOkFjdG9yW10pOnZvaWR7XHJcbiAgICAgICAgbGV0IGRtZzpEYW1hZ2UgPSB0aGlzLnByb2ZpbGUuZ2VuZXJhdGVEYW1hZ2UodGhpcyk7XHJcblxyXG4gICAgICAgIHZpY3RpbS5mb3JFYWNoKGVsZT0+e1xyXG4gICAgICAgICAgICB0aGlzLmJlQXR0YWNrZWQoZG1nLmNvcHkoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog6KKr5pS75Ye7XHJcbiAgICAgKiBAcGFyYW0gZGFtYWdlIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYmVBdHRhY2tlZChkYW1hZ2U6RGFtYWdlKTp2b2lke1xyXG4gICAgICAgIC8vQHRvZG9cclxuICAgICAgICAvL+WHj+WwkeeUn+WRveWAvFxyXG4gICAgICAgIC8v5Y+R5Ye65pS75Ye75LqL5Lu2XHJcbiAgICAgICAgLy/vvIjlj6/og73vvInlj5Hlh7rmrbvkuqHkuovku7ZcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDnp7vpmaRidWZmXHJcbiAgICAgKiBAcGFyYW0gYnVmZiBcclxuICAgICAqIOaOpeWPo+enu+mZpFxyXG4gICAgICovXHJcbiAgICAvLyBwdWJsaWMgcmVtb3ZlQnVmZihidWZmOkJ1ZmYpOnZvaWR7XHJcbiAgICAvLyAgICAgbGV0IGk6bnVtYmVyID0gdGhpcy5idWZmTGlzdC5pbmRleE9mKGJ1ZmYpO1xyXG4gICAgLy8gICAgIGlmIChpID09IC0xKSB7XHJcbiAgICAvLyAgICAgICAgIHJldHVybjtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgdGhpcy5idWZmTGlzdFtpXS5vbkRlc3Ryb3koKTtcclxuICAgIC8vICAgICB0aGlzLmJ1ZmZMaXN0LnNwbGljZShpLDEpO1xyXG4gICAgLy8gfVxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IEFjdG9yIGZyb20gXCIuL0FjdG9yXCI7XHJcbmltcG9ydCB7IEFjdG9yVHlwZSB9IGZyb20gXCIuLi8uLi9Db21tb24vRG9kS2V5XCI7XHJcbmltcG9ydCB7IEFjdG9yU3RhdGVJRCB9IGZyb20gXCIuL1N0YXRlL0FjdG9yU3RhdGVGc21cIjtcclxuaW1wb3J0IHsgQ29saVJlY2VpdmVyIH0gZnJvbSBcIi4vQWN0b3JNb2R1bGVzL0NvbGlNZXNzYWdlXCI7XHJcbmltcG9ydCBSaG9kZXNHYW1lIGZyb20gXCIuLi9SaG9kZXNHYW1lXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3Rvck1nciB7XHJcbiAgICBwdWJsaWMgYWN0b3JzOiBBY3RvcltdO1xyXG5cclxuICAgIHB1YmxpYyBfbWF0cml4OiBBY3RvcltdW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5hY3RvcnMgPSBbXTtcclxuXHJcbiAgICAgICAgLy90ZXN0XHJcbiAgICAgICAgdGhpcy5jcmVhdGVBY3RvcihBY3RvclR5cGUuTW9uc3Rlciwge30pO1xyXG4gICAgICAgIHRoaXMuYWN0b3JzWzBdLnN0YXRlLnJ1blN0YXRlKEFjdG9yU3RhdGVJRC5XYWxrKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdChyZXM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX2luaXRFbmVteShyZXMpO1xyXG4gICAgICAgIHRoaXMuX2luaXRPcHJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGF3YWtlKCk6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hY3RvcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGFjdG9yID0gdGhpcy5hY3RvcnNbaV07XHJcbiAgICAgICAgICAgIGFjdG9yLmF3YWtlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNZ3IgdXBkYXRlXCIpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hY3RvcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGFjdG9yID0gdGhpcy5hY3RvcnNbaV07XHJcbiAgICAgICAgICAgIGFjdG9yLnVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBSaG9kZXNHYW1lLkluc3RhbmNlLmJhdHRsZS5tYXBOb2RlQ1BVLnJlbmRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYWN0b3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhY3RvciA9IHRoaXMuYWN0b3JzW2ldO1xyXG4gICAgICAgICAgICBhY3Rvci5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY3JlYXRlQWN0b3IodHlwZTogQWN0b3JUeXBlLCByZXM6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGxldCBhY3RvciA9IG5ldyBBY3Rvcih0eXBlLCByZXMpO1xyXG4gICAgICAgIHRoaXMuYWN0b3JzLnB1c2goYWN0b3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRBY3RvckJ5SUQoSUQ6IG51bWJlcik6IEFjdG9yIHwgbnVsbCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYWN0b3IgPSB0aGlzLmFjdG9yc1tpXTtcclxuICAgICAgICAgICAgaWYgKElEID09IGFjdG9yLnN5bWJvbC5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYWN0b3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfaW5pdEVuZW15KHJlczogYW55KSB7XHJcbiAgICAgICAgLy9UT0RPIHVzZSBsZXZlbCByZXMgZGF0YSBpbml0IGVuZW15IGFjdG9yc1xyXG4gICAgICAgIC8vZWcuXHJcbiAgICAgICAgLy9sZXQgZW5lbXlSZXMgPSByZXNbJ3h4eHh4J107XHJcbiAgICAgICAgLy9hY3RvciA9IHRoaXMuY3JlYXRlQWN0b3IoQWN0b3JUeXBlLkVuZW15ICxlbmVteVJlcyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgX2luaXRPcHJ0KCkge1xyXG4gICAgICAgIC8vVE9ETyB1c2UgcHJlIGNob29zZSBvcHJ0IGxpc3QgdG8gaW5pdCBzZWxmIGFjdG9yc1xyXG4gICAgICAgIC8vbGV0IGFycmF5ID0gUmhvZGVzR2FtZXMuSW5zdGFuY2UuZ2FtZWRhdGEuY3VycmVudEZvcm1hdGlvbjtcclxuICAgICAgICAvL2ZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAvLyAgIGxldCBpZCA9IGFycmF5W2ldO1xyXG4gICAgICAgIC8vICAgbGV0IHJlcyA9IERvZFJlc291cmNlTWdyLkluc3RhbmNlLmdldEN1cnJlbnRPcGVyYXJvckRhdGFCeUlEKGlkKTtcclxuICAgICAgICAvLyAgIGxldCBhY3RvciA9IHRoaXMuY3JlYXRlQWN0b3IoQWN0b3JUeXBlLk9wZXJhdG9yLCByZXMpXHJcbiAgICAgICAgLy99XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9BY3RvclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFjdG9yQnVmZk1ncntcclxuICAgIGNvbnN0cnVjdG9yKGtlZXBlcjpBY3RvciwgcmVzOmFueSl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQWN0b3JDb3N0e1xyXG4gICAgY29uc3RydWN0b3Ioa2VlcGVyOkFjdG9yKXtcclxuICAgICAgICBcclxuICAgIH1cclxufSIsImltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBY3RvclNraWxse1xyXG4gICAgY29uc3RydWN0b3Ioa2VlcGVyOkFjdG9yLCByZXM6YW55KXtcclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQW5pbWF0aW9ue1xyXG4gICAgY29uc3RydWN0b3Ioa2VlcGVyOkFjdG9yLCByZXM6YW55KXtcclxuICAgICAgICBcclxuICAgIH1cclxufSIsImltcG9ydCB7IFZlYzIsIERvZE1hdGggfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0RvZE1hdGhcIjtcclxuaW1wb3J0IHsgRml4UmVjdCB9IGZyb20gXCIuLi8uLi8uLi9GaXgvRml4UmVjdFwiO1xyXG5pbXBvcnQgeyBBcnJheUFsZ28gfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0RvZERhdGFTdHJ1Y3R1cmVcIjtcclxuaW1wb3J0IHsgRXZlbnRDZW50cmUgfSBmcm9tIFwiLi4vLi4vLi4vRXZlbnQvRXZlbnRDZW50cmVcIjtcclxuaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9BY3RvclwiO1xyXG5pbXBvcnQgeyBBY3RvclR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0RvZEtleVwiO1xyXG5cclxuLyoqXHJcbiAqIOeisOaSnua2iOaBr+WPkeW4g+iAhVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbGlFbWl0e1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBHTE9CQUxfVU5JVF9XSURUSDpudW1iZXIgPSAxMDA7Ly/lhajlsYDljZXkvY3lrr1cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgR0xPQkFMX1VOSVRfSEVJR0hUOm51bWJlciA9IDEwMDsvL+WFqOWxgOWNleS9jemrmFxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBHTE9CQUxfVU5JVF9TVUJXSURUSDpudW1iZXIgPSA5MDsvL+WFqOWxgOWGhemDqOWNleS9jeWuvVxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBHTE9CQUxfVU5JVF9TVUJIRUlHSFQ6bnVtYmVyID0gOTA7Ly/lhajlsYDlhoXpg6jljZXkvY3pq5hcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgR0xPQkFMX1VOSVRfUlNISUZUOm51bWJlciA9IDU7Ly/lhajlsYDljZXkvY3lkJHlj7PlgY/np7tcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgR0xPQkFMX1VOSVRfQlNISUZUOm51bWJlciA9IDU7Ly/lhajlsYDljZXkvY3lkJHkuIvlgY/np7tcclxuXHJcbiAgICBwcml2YXRlIF9yZWM6Rml4UmVjdDtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfcGFzdFNldDpWZWMyW10gPSBbXTsvL+atpOaWueWdl+S4iuS4gOasoeWtmOWcqOS6juWTquS4gOeCuVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue5omA5pyJ55uu5YmN6Ieq6Lqr5omA5aSE55qE5pa55qC8XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZmluZEludGVyc2VjdCgpOlZlYzJbXXtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBbXHJcbiAgICAgICAgICAgIGxlZnQsXHJcbiAgICAgICAgICAgIHRvcCxcclxuICAgICAgICAgICAgcmlnaHQsXHJcbiAgICAgICAgICAgIGJvdHRvbVxyXG4gICAgICAgIF0gPSBbXHJcbiAgICAgICAgICAgIERvZE1hdGguaW50RGl2aXNpb24odGhpcy5fcmVjLngsQ29saUVtaXQuR0xPQkFMX1VOSVRfV0lEVEgpLFxyXG4gICAgICAgICAgICBEb2RNYXRoLmludERpdmlzaW9uKHRoaXMuX3JlYy55LENvbGlFbWl0LkdMT0JBTF9VTklUX0hFSUdIVCksXHJcbiAgICAgICAgICAgIERvZE1hdGguaW50RGl2aXNpb24odGhpcy5fcmVjLnJpZ2h0LENvbGlFbWl0LkdMT0JBTF9VTklUX1dJRFRIKSxcclxuICAgICAgICAgICAgRG9kTWF0aC5pbnREaXZpc2lvbih0aGlzLl9yZWMuYm90dG9tLENvbGlFbWl0LkdMT0JBTF9VTklUX0hFSUdIVClcclxuICAgICAgICBdXHJcblxyXG4gICAgICAgIGxldCByZXN1bHQ6VmVjMltdID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGhvcmk6bnVtYmVyID0gbGVmdDsgaG9yaSA8PSByaWdodDsgaG9yaSArPSAxKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHZlcnRpOm51bWJlciA9IHRvcDsgdmVydGkgPD0gYm90dG9tOyB2ZXJ0aSArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChuZXcgVmVjMihob3JpLCB2ZXJ0aSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBvcyh4Om51bWJlciwgeTpudW1iZXIpOkNvbGlFbWl0e1xyXG4gICAgICAgIHRoaXMuX3JlYy54ID0geDtcclxuICAgICAgICB0aGlzLl9yZWMueSA9IHk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBvc0J5VmVjKHZlYzpWZWMyKTpDb2xpRW1pdHtcclxuICAgICAgICB0aGlzLl9yZWMueCA9IHZlYy54O1xyXG4gICAgICAgIHRoaXMuX3JlYy55ID0gdmVjLnk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNpemUod2lkdGg6bnVtYmVyLCBoZWlnaHQ6bnVtYmVyKTpDb2xpRW1pdHtcclxuICAgICAgICB0aGlzLl9yZWMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLl9yZWMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBldmVudChwdWJsaXNoZXI/OmFueSwgaWRlbnRpdHk6QWN0b3JUeXBlID0gQWN0b3JUeXBlLk5vbmUpOnZvaWR7XHJcbiAgICAgICAgbGV0IGN1cnJlbnQ6VmVjMltdID0gdGhpcy5maW5kSW50ZXJzZWN0KCk7Ly/lvZPliY3norDmkp7pm4blkIhcclxuICAgICAgICAvL3RoaXMuX3Bhc3RTZXQvL+WOhuWPsueisOaSnumbhuWQiFxyXG4gICAgICAgIC8v56a75byA77ya5aSE5LqO5Y6G5Y+y56Kw5pKe6ZuG5ZCI77yM5L2G5LiN5aSE5LqO5b2T5YmN56Kw5pKe6ZuG5ZCI55qE5YWD57SgXHJcbiAgICAgICAgbGV0IGxlYXZlOlZlYzJbXSA9IEFycmF5QWxnby5maW5kQ29tcGxlbWVudFNldCh0aGlzLl9wYXN0U2V0LCBjdXJyZW50KSBhcyBWZWMyW107XHJcbiAgICAgICAgLy/ov5vlhaXvvJrlpITkuo7lvZPliY3norDmkp7pm4blkIjvvIzkvYbkuI3lpITkuo7ljoblj7LnorDmkp7pm4blkIjnmoTlhYPntKBcclxuICAgICAgICBsZXQgZW50cmU6VmVjMltdID0gQXJyYXlBbGdvLmZpbmRDb21wbGVtZW50U2V0KGN1cnJlbnQsIHRoaXMuX3Bhc3RTZXQpIGFzIFZlYzJbXTtcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICAvL+WPkeW4g+S6i+S7tlxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwi56a75byAXCIpO1xyXG4gICAgICAgIGxlYXZlLmZvckVhY2goZWxlPT57XHJcbiAgICAgICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLmV2ZW50KEV2ZW50Q2VudHJlLkVUeXBlLkxFQVZFKGVsZSwgYCR7aWRlbnRpdHl9YCksIHB1Ymxpc2hlcik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwi6L+b5YWlXCIpO1xyXG4gICAgICAgIGVudHJlLmZvckVhY2goZWxlPT57XHJcbiAgICAgICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLmV2ZW50KEV2ZW50Q2VudHJlLkVUeXBlLkVOVFJFKGVsZSwgYCR7aWRlbnRpdHl9YCksIHB1Ymxpc2hlcik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3Bhc3RTZXQgPSBjdXJyZW50Oy8v5pu05paw5Y6G5Y+y56Kw5pKe6ZuG5ZCI5Li65b2T5YmN56Kw5pKe6ZuG5ZCIXHJcbiAgICB9O1xyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5HluIPnprvlvIDlvZPliY3lrZjlnKjnmoTmiYDmnInlnZDmoIfnmoTkuovku7ZcclxuICAgICAqIEBwYXJhbSBwdWJsaXNoZXIgXHJcbiAgICAgKiBAcGFyYW0gaWRlbnRpdHkgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBldmVudExlYXZlQWxsKHB1Ymxpc2hlcj86YW55LCBpZGVudGl0eTpBY3RvclR5cGUgPSBBY3RvclR5cGUuTm9uZSk6dm9pZHtcclxuICAgICAgICB0aGlzLl9wYXN0U2V0LmZvckVhY2godmVjPT57XHJcbiAgICAgICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLmV2ZW50KEV2ZW50Q2VudHJlLkVUeXBlLkxFQVZFKHZlYywgYCR7aWRlbnRpdHl9YCksIHB1Ymxpc2hlcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoeDpudW1iZXIseTpudW1iZXIsd2lkdGg6bnVtYmVyID0gQ29saUVtaXQuR0xPQkFMX1VOSVRfU1VCV0lEVEgsIGhlaWdodDpudW1iZXIgPSBDb2xpRW1pdC5HTE9CQUxfVU5JVF9TVUJIRUlHSFQpe1xyXG4gICAgICAgIHRoaXMuX3JlYyA9IG5ldyBGaXhSZWN0KHgseSx3aWR0aCxoZWlnaHQpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICog56Kw5pKe5raI5oGv5o6l5pS26ICFXHJcbiAqIOWPr+S7pemAmui/h3NldERldGVjdGlvbuebkeaOp+aMh+WumueCue+8jOaMh+WumklkZW50aXR555qE6L+b5YWl5ZKM56a75byA5LqL5Lu2XHJcbiAqIOWPr+S7pemAmui/h29mZkRldGVjdGlvbuaSpOmUgOaMh+WumueCueeahOebkeaOp1xyXG4gKiDov5nkuKrkuI3og73nm7TmjqXnlKjvvIzopoHnu6fmib/kuIDlsYLmiopvbkxlYXZl5ZKMb25FbnRyZeWHveaVsOmHjeWGmeS5i+WQjuaJjeiDveeUqFxyXG4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvbGlSZWNlaXZlcntcclxuICAgIC8qXHJcbiAgICDov5nph4znmoTku7vkvZXnn6npmLXpg73lj6/ku6XnlKjplK7lgLzlr7nmm7/ku6PjgIJ45LiOeeS4pOS4quWPguaVsOWPr+S7peeUn+aIkOawuOS4jemHjeWkjeeahOmUrlxyXG5cclxuICAgICovXHJcbiAgICBwcml2YXRlIF9kZXRlY3Rpb25NYXRyaXg6Ym9vbGVhbltdW10gPSBbXTsvL+iusOW9leWTquS4quWdkOagh+W3suiiq+ebkeaOp1xyXG4gICAgcHJpdmF0ZSBkZXRlY3Rpb25FeGlzdChwb3NpdGlvbjpWZWMyKTpib29sZWFuey8v5p+l55yL5p+Q5Liq5Z2Q5qCH5piv5ZCm5bey6KKr55uR5o6nXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RldGVjdGlvbk1hdHJpeFtwb3NpdGlvbi54XVtwb3NpdGlvbi55XTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgX2NhbmNlbGxhdGlvbk1hdHJpeDpGdW5jdGlvbltdW11bXSA9IFtdOy8v5a2Y5pS+55So5LqO5Y+W5raI55uR5ZCs55qE5Ye95pWwXHJcbiAgICBwcml2YXRlIF93aWR0aDpudW1iZXI7XHJcbiAgICBwcml2YXRlIF9oZWlnaHQ6bnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHdpZHRoOm51bWJlciwgaGVpZ2h0Om51bWJlcil7XHJcbiAgICAgICAgdGhpcy5fd2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLl9oZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG4gICAgICAgIGZvciAobGV0IHcgPSAwOyB3IDwgd2lkdGg7IHcgKz0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9kZXRlY3Rpb25NYXRyaXhbd10gPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5fY2FuY2VsbGF0aW9uTWF0cml4W3ddID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGggPSAwOyBoIDwgaGVpZ2h0OyBoICs9IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RldGVjdGlvbk1hdHJpeFt3XVtoXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2FuY2VsbGF0aW9uTWF0cml4W3ddW2hdID0gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmraTmlrnms5Xmj5Dkvpvnu5nmraTnsbvnmoTlrZDnsbvph43lhplcclxuICAgICAqIOavj+W9k+atpOWunuS+i+ebkeaOp+eahOi/m+WFpeeisOaSnuS6i+S7tuWcqOW3suWQr+eUqOebkeWQrOeahOWdkOagh+WPkeeUn+aXtu+8jOatpOWHveaVsOWwhuiiq+iwg+eUqFxyXG4gICAgICogQHBhcmFtIGFjdG9yIFxyXG4gICAgICogQHBhcmFtIHBvc2l0aW9uXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBvbkVudHJlKGFjdG9yOkFjdG9yLCBwb3NpdGlvbjpWZWMyKTp2b2lkXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmraTmlrnms5Xmj5Dkvpvnu5nmraTnsbvnmoTlrZDnsbvph43lhplcclxuICAgICAqIOavj+W9k+atpOWunuS+i+ebkeaOp+eahOi/m+WFpeeisOaSnuS6i+S7tuWcqOW3suWQr+eUqOebkeWQrOeahOWdkOagh+WPkeeUn+aXtu+8jOatpOWHveaVsOWwhuiiq+iwg+eUqFxyXG4gICAgICogQHBhcmFtIGFjdG9yIFxyXG4gICAgICogQHBhcmFtIHBvc2l0aW9uXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBvbkxlYXZlKGFjdG9yOkFjdG9yLCBwb3NpdGlvbjpWZWMyKTp2b2lkXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlnKjmjIflrprlnZDmoIfkuIrorr7nva7nm5HlkKznorDmkp7kuovku7ZcclxuICAgICAqIGlkZW50aXR55Y+v5Lul5ZyoQWN0b3IuSWRlbnRpdHnph4zpgInmi6lcclxuICAgICAqIOmCo+aIkeS4uuS7gOS5iOS4jeWGmWVudW3lkaLigKbigKZcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldERldGVjdGlvbihwb3NpdGlvbjpWZWMyLCBpZGVudGl0eTpzdHJpbmcpOnZvaWR7XHJcbiAgICAgICAgaWYgKHRoaXMuZGV0ZWN0aW9uRXhpc3QocG9zaXRpb24pKSB7Ly/lpoLmnpzlnKjmraTlpITlt7LlrZjlnKjnm5HmjqfvvIzliJnlj5bmtojnm5HmjqdcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZXREZXRlY3Rpb27lh73mlbDkuI3og73lnKjlkIzkuIDkuKrlnZDmoIflpJrmrKHnm5HmjqfvvIzor7fmn6XnnItDb2xpUmVjaWV2ZXLnsbtcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBvc2l0aW9uLnggPj0gdGhpcy5fd2lkdGggfHwgcG9zaXRpb24ueCA8IDAgfHxcclxuICAgICAgICAgICAgcG9zaXRpb24ueSA+IHRoaXMuX2hlaWdodCB8fCBwb3NpdGlvbi55IDwgMCkgey8v5aaC5p6c55uR5o6n5L2N572u6LaF5Ye66L6555WM77yM5YiZ5Y+W5raI55uR5o6nXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwb3NpdGlvbiA9IHBvc2l0aW9uLmNsb25lKCk7Ly/lpI3liLbkvY3nva7lr7nosaHku6XpmLLmraLkvKDlnYDpl67pophcclxuICAgICAgICBsZXQgZGV0ZWN0b3I6RnVuY3Rpb25bXSA9IFtdOy8v6L+Z5piv55uR5ZCs5Ye95pWw77yM5a2Y6LW35p2l5YeG5aSH5pKk6Zmk55uR5ZCs5pe255SoXHJcbiAgICAgICAgLy/orr7nva7nm5HlkKzkuovku7ZcclxuICAgICAgICAgICAgZGV0ZWN0b3JbMF0gPSAoYWN0b3I6QWN0b3IpPT57Ly/ov5vlhaXkuovku7blh73mlbBcclxuICAgICAgICAgICAgICAgIHRoaXMub25FbnRyZShhY3RvciwgcG9zaXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRldGVjdG9yWzFdID0gKGFjdG9yOkFjdG9yKT0+ey8v56a75byA5LqL5Lu25Ye95pWwXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTGVhdmUoYWN0b3IsIHBvc2l0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2Uub24oRXZlbnRDZW50cmUuRVR5cGUuRU5UUkUocG9zaXRpb24sIGlkZW50aXR5KSwgdGhpcywgZGV0ZWN0b3JbMF0pO1xyXG4gICAgICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5vbihFdmVudENlbnRyZS5FVHlwZS5MRUFWRShwb3NpdGlvbiwgaWRlbnRpdHkpLCB0aGlzLCBkZXRlY3RvclsxXSk7XHJcbiAgICAgICAgLy/orr7nva7nm5HlkKzkuovku7ZcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9jYW5jZWxsYXRpb25NYXRyaXhbcG9zaXRpb24ueF1bcG9zaXRpb24ueV0ucHVzaCgoKT0+ey8v5bCG55uR5ZCs56e76Zmk5Ye95pWw5a2Y5YWl5Ye95pWw55+p6Zi1XHJcbiAgICAgICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLm9mZihFdmVudENlbnRyZS5FVHlwZS5FTlRSRShwb3NpdGlvbiwgaWRlbnRpdHkpLCB0aGlzLCBkZXRlY3RvclswXSk7XHJcbiAgICAgICAgfSwgKCk9PntcclxuICAgICAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2Uub2ZmKEV2ZW50Q2VudHJlLkVUeXBlLkxFQVZFKHBvc2l0aW9uLCBpZGVudGl0eSksIHRoaXMsIGRldGVjdG9yWzFdKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fZGV0ZWN0aW9uTWF0cml4W3Bvc2l0aW9uLnhdW3Bvc2l0aW9uLnldID0gdHJ1ZTsvL+WwhuatpOWdkOagh+eahOeKtuaAgeiuvuS4uuKAnOW3suiiq+ebkeWQrOKAnVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog56e76Zmk5oyH5a6a5Z2Q5qCH55qE56Kw5pKe5LqL5Lu255uR5ZCsXHJcbiAgICAgKiBAcGFyYW0gcG9zaXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIG9mZkRldGVjdGlvbihwb3NpdGlvbjpWZWMyKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX2NhbmNlbGxhdGlvbk1hdHJpeFtwb3NpdGlvbi54XVtwb3NpdGlvbi55XS5mb3JFYWNoKChlbGUpPT57Ly/miafooYzmr4/kuIDkuKrpooTlrZjnmoTlh73mlbBcclxuICAgICAgICAgICAgZWxlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fY2FuY2VsbGF0aW9uTWF0cml4W3Bvc2l0aW9uLnhdW3Bvc2l0aW9uLnldID0gW107Ly/liKDpmaTmraTlpITnmoTpooTlrZjlh73mlbBcclxuICAgICAgICB0aGlzLl9kZXRlY3Rpb25NYXRyaXhbcG9zaXRpb24ueF1bcG9zaXRpb24ueV0gPSBmYWxzZTsvL+WwhuatpOWdkOagh+iuvuS4uuacquebkeWQrFxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuXHJcbmV4cG9ydCBlbnVtIERhbWFnZVR5cGV7XHJcbiAgICBQWVNJQ0FMLFxyXG4gICAgTUFHSUNBTCxcclxuICAgIFRSVUUsXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEYW1hZ2V7XHJcblxyXG4gICAgcHVibGljIHNvdXJjZTpBY3RvciA9IG51bGw7Ly/kvKTlrrPmnaXmupBcclxuICAgIHB1YmxpYyB2YWx1ZTpudW1iZXIgPSAwOy8v5pS75Ye75YqbXHJcbiAgICBwdWJsaWMgdHlwZTpEYW1hZ2VUeXBlLy/kvKTlrrPnsbvlnotcclxuICAgIHB1YmxpYyBwcmltYXJ5OmJvb2xlYW4gPSB0cnVlOy8v5piv5ZCm5Li66Z2e6Ze05o6l5Lyk5a6z77yI6Ze05o6l5Lyk5a6z5LiN5Lya6Kem5Y+R5pif54aK44CB5bm055qE5Y+N55Sy5LmL57G755qE5pWI5p6c77yJXHJcblxyXG4gICAgY29uc3RydWN0b3Ioc291cmNlOkFjdG9yLCB2YWx1ZTpudW1iZXIsIHR5cGU6RGFtYWdlVHlwZSl7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb3B5KCk6RGFtYWdle1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBuZXcgRGFtYWdlKHRoaXMuc291cmNlLCB0aGlzLnZhbHVlLCB0aGlzLnR5cGUpO1xyXG4gICAgICAgIHJlc3VsdC50eXBlID0gdGhpcy50eXBlO1xyXG4gICAgICAgIHJlc3VsdC5wcmltYXJ5ID0gdGhpcy5wcmltYXJ5O1xyXG4gICAgICAgIHJlc3VsdC5zb3VyY2UgPSB0aGlzLnNvdXJjZTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRGFtYWdlLCBEYW1hZ2VUeXBlIH0gZnJvbSBcIi4vRGFtYWdlXCI7XHJcbmltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuaW1wb3J0IHsgQWN0b3JUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Eb2RLZXlcIjtcclxuXHJcblxyXG4vKipcclxuICogUHJvZmlsZeexu+aYr+WCqOWtmOWNleS9jeWfuuacrOaVsOaNru+8iOWmguaUu+WHu+WKm+OAgemYsuW+oeWKm+etie+8ieeahOexu1xyXG4gKiDlroPov5jmj5DkvpvkuIDliIfnlKjkuo7ojrflj5ZBY3RvcuS/oeaBr+eahOaOpeWPo++8iOWmguaYr+WQpuiDveWkn+ihjOWKqOOAgeaYr+WQpuiDveWkn+mYu+aMoe+8iVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFByb2ZpbGUge1xyXG4gICAgcHVibGljIG5hbWU6IFN0cmluZyA9IFwiQ2hhbmRsZXIgQmluZ1wiO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGtlZXBlcjpBY3RvcjtcclxuXHJcbiAgICBwcml2YXRlIF9wcmVwVGltZTogbnVtYmVyID0gMTAwOy8v5YmN5pGH5pe26Ze0XHJcbiAgICBwcml2YXRlIF9hZnRlclRpbWU6IG51bWJlciA9IDEwMDsvL+WQjuaRh+aXtumXtFxyXG4gICAgcHJpdmF0ZSBfYnJlYWt0aHJvdWdoOiBudW1iZXIgPSAxOy8v56C06Zmk6Zi75oyh6IO95YqbXHJcbiAgICBwdWJsaWMgaW52aXNpYmxlOiBib29sZWFuID0gZmFsc2U7Ly/mmK/lkKbpmpDlvaJcclxuICAgIHB1YmxpYyBibG9ja2VkOiBib29sZWFuID0gZmFsc2U7Ly/lt7LooqvpmLvmjKFcclxuICAgIHB1YmxpYyBibG9ja2VyOiBBY3RvcjsvL+mYu+aMoeiAhVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Lyk5a6z6K6h566X55u45YWz55qE5L+u5pS55ZKM6K6/6Zeu5o6l5Y+jXHJcbiAgICAgKiDkvZzogIXvvJrokbFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGF0dGFja1Bvd2VyOiBudW1iZXIgPSAxMDA7Ly/mlLvlh7vliptcclxuICAgIHB1YmxpYyBhdGtTY2FsZTpudW1iZXIgPSAxOy8v5pS75Ye75YCN546HXHJcbiAgICBwdWJsaWMgYXRrQnVmZjpudW1iZXIgPSAxOy8v5pS75Ye755m+5YiG5q+U5o+Q5Y2HXHJcbiAgICBwdWJsaWMgYXJtb3VyOm51bWJlciA9IDUwOy8v54mp55CG6Ziy5b6hXHJcbiAgICBwdWJsaWMgbWFnaWNBcm1vdXI6bnVtYmVyID0gMDsvL+azleacr+aKl+aAp1xyXG4gICAgcHVibGljIGRtZ1R5cGU6RGFtYWdlVHlwZSA9IERhbWFnZVR5cGUuUFlTSUNBTDsvL+S8pOWus+exu+Wei1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihrZWVwZXI6QWN0b3IsIHJlczphbnkpe1xyXG4gICAgICAgIHRoaXMua2VlcGVyID0ga2VlcGVyO1xyXG4gICAgICAgIC8vdG9kbzogYWJvdXQgcmVzXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkvKDlhaXkuIDkuKpBY3Rvcu+8jOi/lOWbnuS8pOWus+WvueixoVxyXG4gICAgICogQHBhcmFtIHNvdXJjZSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdlbmVyYXRlRGFtYWdlKHNvdXJjZTpBY3Rvcik6RGFtYWdle1xyXG4gICAgICAgIHJldHVybiBuZXcgRGFtYWdlKHNvdXJjZSwgdGhpcy5hdHRhY2tQb3dlcip0aGlzLmF0a1NjYWxlKnRoaXMuYXRrQnVmZiwgdGhpcy5kbWdUeXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGl0UG9pbnQ6IG51bWJlciA9IDEwOy8v55Sf5ZG95YC8XHJcbiAgICBwdWJsaWMgbWF4SGl0UG9pbnQ6IG51bWJlciA9IDEwOy8v5pyA6auY55Sf5ZG95YC8XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBieSBYV1ZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGhhdGVMZXZlbDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBhdHRhY2tSYW5nZVJhZGl1czogbnVtYmVyO1xyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHByZXBUaW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ByZXBUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgYWZ0ZXJUaW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FmdGVyVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGJyZWFrdGhyb3VnaCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9icmVha3Rocm91Z2g7XHJcbiAgICB9XHJcblxyXG4gICBcclxufVxyXG5cclxuLyoqXHJcbiAqIOaYr+WQpumcgOimgeWcqHByb2ZpbGXkuK3lsIbkuI3lkIznmoTmlbDlgLzliIbnsbvvvJ9cclxuICpcclxuICovIiwiaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9BY3RvclwiO1xyXG5pbXBvcnQgeyBEb2RNYXRoLCBWZWMyIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Eb2RNYXRoXCI7XHJcblxyXG4vKipcclxuICog5a+55LiA5Liq5Y2V5L2N55qE5Yeg5L2V54q25oCB55qE5o+P6L+wXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVHJhbnNmb3Jte1xyXG4gICAgcHVibGljIHBvczpQb3MgPSBuZXcgUG9zKCk7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKGtlZXBlcjpBY3Rvcil7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFBvc3tcclxuICAgIC8vIHB1YmxpYyBhdXRvU3dpdGNoVGFyZ2V0OmJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIGRhdGE6VmVjMiA9IG5ldyBWZWMyKDAsMCk7Ly/kvY3nva5cclxuXHJcblxyXG4gICAgXHJcbiAgICBwdWJsaWMgdGFyZ2V0OlZlYzIgPSBuZXcgVmVjMigwLDApOy8v55uu5qCHXHJcbiAgICBwdWJsaWMgc3BlZWQ6bnVtYmVyID0gNTsvL+mAn+W6plxyXG4gICAgcHVibGljIGFwcHJvYWNoOm51bWJlciA9IDA7Ly/pgLzov5HmrKHmlbBcclxuICAgIHB1YmxpYyB2ZWNTcGVlZDpWZWMyID0gbmV3IFZlYzIoMCwwKTsvL+WIhumHj+mAn+W6plxyXG4gICAgcHJpdmF0ZSBfYXJyaXZlZDpib29sZWFuID0gdHJ1ZTsvL+W3suWIsOi+vuebrueahOWcsCjmr4/mrKHorr7nva7mlrDnm67nmoTlnLDml7borr7kuLpmYWxzZSlcclxuICAgIHB1YmxpYyBnZXQgYXJyaXZlZCgpOmJvb2xlYW57cmV0dXJuIHRoaXMuX2Fycml2ZWQ7fS8v6I635Y+W5piv5ZCm5bey5Yiw6L6+55qE5L+h5oGvXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7nm67nmoTlnLDlubbph43orr7liIbph4/pgJ/luqZcclxuICAgICAqIEBwYXJhbSB0YXJnZXQgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRUYXJnZXQodGFyZ2V0OlZlYzIpOnZvaWR7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgdGhpcy5haW0oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruebtOe6v+mAn+W6puW5tumHjeiuvuWIhumHj+mAn+W6plxyXG4gICAgICogQHBhcmFtIHNwZWVkIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U3BlZWQoc3BlZWQ6bnVtYmVyKTp2b2lke1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcclxuICAgICAgICB0aGlzLmFpbSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6h566X56e75Yqo5Y+C5pWwLOW5tuWwhl9hcnJpdmVk6K6+5Li6ZmFsc2VcclxuICAgICAqIOWwhuS8mumHjeiuvuWIhumHj+mAn+W6puWSjOmAvOi/keasoeaVsFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFpbSgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy52ZWNTcGVlZCA9IERvZE1hdGgubW92ZVRvQ29tcG9uZW50KHRoaXMuZGF0YSx0aGlzLnRhcmdldCx0aGlzLnNwZWVkKTtcclxuICAgICAgICB0aGlzLmFwcHJvYWNoID0gdGhpcy5kYXRhLmRpc3RhbmNlVG8odGhpcy50YXJnZXQpIC8gdGhpcy5zcGVlZDtcclxuICAgICAgICB0aGlzLl9hcnJpdmVkID0gZmFsc2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlkJHnm67moIfngrnnp7vliqjkuIDmrKFcclxuICAgICAqL1xyXG4gICAgcHVibGljIG1vdmUoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuYXBwcm9hY2ggLT0gMTtcclxuICAgICAgICBpZiAodGhpcy5hcHByb2FjaCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS54ID0gdGhpcy50YXJnZXQueDtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLnkgPSB0aGlzLnRhcmdldC55O1xyXG4gICAgICAgICAgICB0aGlzLl9hcnJpdmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmRhdGEueCA9IHRoaXMuZGF0YS54ICsgdGhpcy52ZWNTcGVlZC54O1xyXG4gICAgICAgIHRoaXMuZGF0YS55ID0gdGhpcy5kYXRhLnkgKyB0aGlzLnZlY1NwZWVkLnk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcbmltcG9ydCBQZXJmb3JtYW5jZUNlbnRyZSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0dyYXBoaWNzL1BlcmZvcm1hbmNlX01vZHVsZS9QZXJmb3JtYW5jZUNlbnRyZVwiO1xyXG5pbXBvcnQgeyBWZWMyIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Eb2RNYXRoXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVW5pdFJlbmRlcntcclxuXHJcbiAgICBwcml2YXRlIF9rZWVwZXI6QWN0b3I7XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGtlZXBlcjpBY3Rvcil7XHJcbiAgICAgICAgdGhpcy5fa2VlcGVyID0ga2VlcGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZXBsb3koKTp2b2lke1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRGVwbG95XCIpO1xyXG4gICAgICAgIFBlcmZvcm1hbmNlQ2VudHJlLmluc3RhbmNlLmRpc3BsYXlBY3Rvcih0aGlzLl9rZWVwZXIsIHRoaXMuX2tlZXBlci50cmFuc2Zvcm0ucG9zLmRhdGEsIG5ldyBWZWMyKDUwLDUwKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1vdmUodmVjOlZlYzIpOnZvaWR7XHJcbiAgICAgICAgUGVyZm9ybWFuY2VDZW50cmUuaW5zdGFuY2UubW92ZSh0aGlzLl9rZWVwZXIsIHZlYyk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4vQWN0b3JcIjtcclxuaW1wb3J0IHsgVmVjMiB9IGZyb20gXCIuLi8uLi9Db21tb24vRG9kTWF0aFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm91dGUge1xyXG5cclxuICAgIHByaXZhdGUgX3BhdGg6VmVjMltdID0gVmVjMi5saXN0RnJvbUxpc3QoW1xyXG4gICAgICAgIFs1MDAsNTAwXSxcclxuICAgICAgICBbMCwwXSxcclxuICAgICAgICBbNTAwLDBdLFxyXG4gICAgICAgIFswLDUwMF1cclxuICAgIF0pO1xyXG4gICAgcHJpdmF0ZSBfdGFyQ291bnQ6bnVtYmVyID0gLTE7Ly/nm67liY3mjIflkJHnmoTnm67moIdcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihrZWVwZXI6QWN0b3IsIHJlczphbnkpe1xyXG4gICAgICAgIC8vdG9kbzog5qC55o2ucmVz6I635Y+W5bqU6LWw55qE6Lev57q/XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGN1cnJlbnRUYXJnZXQoKTpWZWMye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXRoW3RoaXMuX3RhckNvdW50XTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmV4dCgpOmJvb2xlYW57XHJcbiAgICAgICAgaWYgKHRoaXMuX3RhckNvdW50IDwgdGhpcy5fcGF0aC5sZW5ndGggLSAxKSB7Ly/ov5jmnInkuIvkuIDpoblcclxuICAgICAgICAgICAgdGhpcy5fdGFyQ291bnQgKz0gMTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHsvL+ayoeacieS4i+S4gOmhuVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtLVlBhaXJ9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vRG9kRGF0YVN0cnVjdHVyZVwiO1xyXG5pbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcbmltcG9ydCB7RXZlbnRDZW50cmV9IGZyb20gXCIuLi8uLi8uLi9FdmVudC9FdmVudENlbnRyZVwiO1xyXG5pbXBvcnQgeyBTZWVrZXIgfSBmcm9tIFwiLi9BY3RvclNlZWtlclwiO1xyXG5pbXBvcnQgRml4VGltZSBmcm9tIFwiLi4vLi4vLi4vRml4L0ZpeFRpbWVcIjtcclxuXHJcblxyXG4vKipcclxuICogYnkgWFdWXHJcbiAqIFxyXG4gKiDokbEg5L+u5pS55LqOIDMvMThcclxuICogICAgICDlsIZTZWVrZXLmjKrlhaXmlLvlh7vnirbmgIHmnLrlhoXvvIzkuI3nlLFBY3RvcuaMgeaciVxyXG4gKiAgICAgIOS4jeWQjOeahOaUu+WHu+iMg+WbtOeUsVNlZWtlcuabv+aNouadpeWunueOsFxyXG4gKiAgICAgIOS4jeWQjOeahOaUu+WHu+mAu+i+ke+8iOiMg+WbtC/ljZXkvZPvvInnlLHkv67mlLlwcm9maWxl5Lit55qE5Y+C5pWw5a6e546wXHJcbiAqICAgICAgQXRrU3RhdGVNYWNoaW5l6LSf6LSj5a+55aSW5o+Q5L6b5omA5pyJ5L+u5pS5L+iuv+mXruaOpeWPo1xyXG4gKiAgICAgIOS7jemcgOWvueatpOi/m+ihjOi/m+S4gOatpeinhOWIku+8iOWNleS9ky/lpJrkvZMv576k5L2T5pS75Ye76YC76L6R5piv5LuF55Sx5LiA5Liq5Y+C5pWw5a6e546w77yM6L+Y5piv55Sx5aSa5oCB5a6e546w77yJXHJcbiAqICAgICAgLy90b2RvOuaXtumXtOe0r+WKoOmAu+i+keaUueWPmFxyXG4gKiBcclxuICovXHJcblxyXG5lbnVtIFN0YXRlVHlwZSB7XHJcbiAgICBXQUlUID0gXCJXQUlUXCIsXHJcbiAgICBQUkVQQVJFID0gXCJQUkVQQVJFXCIsXHJcbiAgICBBRlRFUl9BVEsgPSBcIkFGVEVSX0FUS1wiXHJcbn1cclxuXHJcbmludGVyZmFjZSBTdGF0ZSB7XHJcbiAgICBleGVjdXRlKG1hY2hpbmU6IEF0a1N0YXRlTWFjaGluZSk6IHZvaWRcclxuXHJcbiAgICByZXNldCgpOiB2b2lkXHJcbn1cclxuXHJcbmFic3RyYWN0IGNsYXNzIEJhc2VTdGF0ZSBpbXBsZW1lbnRzIFN0YXRlIHtcclxuICAgIHByb3RlY3RlZCB0aW1lOiBudW1iZXIgPSAwOy8v5pe26Ze057Sv5Yqg6YC76L6R5pS55Y+YXHJcblxyXG4gICAgcHVibGljIHJlc2V0KCkge1xyXG4gICAgICAgIHRoaXMudGltZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgYWJzdHJhY3QgZXhlY3V0ZShtYWNoaW5lOiBBdGtTdGF0ZU1hY2hpbmUpOiB2b2lkO1xyXG5cclxufVxyXG5cclxuY2xhc3MgV2FpdCBleHRlbmRzIEJhc2VTdGF0ZSB7XHJcblxyXG4gICAgcHVibGljIGV4ZWN1dGUobWFjaGluZTogQXRrU3RhdGVNYWNoaW5lKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZm9jdXMgPSBtYWNoaW5lLnNlZWtlci5nZXRGb2N1cygpO1xyXG4gICAgICAgIGlmIChmb2N1cyAhPT0gbnVsbCkgey8v5aaC5p6c6IO95aSf5om+5Yiw5pWM5Lq6XHJcbiAgICAgICAgICAgIG1hY2hpbmUuY2hhbmdlU3RhdGUoU3RhdGVUeXBlLlBSRVBBUkUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZvdW5kIEVuZW15LCBTd2l0Y2ggdG8gcHJlcGFyZSBwaGFzZSBAXCIgKyB0aGlzLnRpbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7Ly/lpoLmnpzmib7kuI3liLDmlYzkurpcclxuICAgICAgICAgICAgdGhpcy50aW1lICs9IDE7Ly90b2RvOiDml7bpl7TntK/liqDpgLvovpHmlLnlj5hcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lpoLmnpxzZWVrZXLkuK3lrZjlnKjmlYzkurrvvIxyZXNldCBQcmVwYXJl5bm26Lez6L2s5YiwUHJlcGFyZemYtuautVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuY2xhc3MgUHJlcGFyZSBleHRlbmRzIEJhc2VTdGF0ZSB7XHJcblxyXG5cclxuICAgIHB1YmxpYyBleGVjdXRlKG1hY2hpbmU6IEF0a1N0YXRlTWFjaGluZSk6IHZvaWQge1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAg55Sx5LqO5pS75Ye754q25oCB5py655qE6KeE5YiS6L+b6KGM6L+H5LiA5qyh5L+u5pS577yM5q2k5aSE5pqC5pe25YWI5o+Q5L6b5Lyq5Luj56CBXHJcbiAgICAgICAg5q2k57G755uu5YmN5Li65Y2V5L2T5pS75Ye755qE6YC76L6RXHJcbiAgICAgICAgKi9cclxuXHJcbiAgICAgICBjb25zdCBmb2N1cyA9IG1hY2hpbmUuc2Vla2VyLmdldEZvY3VzKCk7XHJcbiAgICAgICAgaWYgKG1hY2hpbmUuc2Vla2VyLmZvY3VzQ2hhbmdlZCgpKSB7XHJcbiAgICAgICAgICAgIGlmIChmb2N1cyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy90b2RvOiDph43mlrDov5vlhaXliY3mkYfpmLbmrrVcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vdG9kbzog6L+b5YWl5YeG5aSH6Zi25q61XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICB0b2RvOiDliY3mkYfml7bpl7TntK/liqDjgILnm67liY3lt7Lnu4/nu4/ov4fnmoTliY3mkYfml7bpl7TlrZjlgqjlnKhwcm9maWxl5LitP1xyXG4gICAgICAgIOWmguaenOWJjeaRh+aXtumXtOW3sua7oe+8jOWImei/m+ihjOaUu+WHu+S4lOi/m+WFpeWQjuaRh+eKtuaAgVxyXG4gICAgICAgICovXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIC8vIC8v5Yik5pat5piv5ZCm6ZyA6KaB6YeN5paw6YCJ5oup55uu5qCH5bm26YeN572u5YmN5pGHXHJcbiAgICAgICAgLy8gbGV0IHNlZWtlciA9IG1hY2hpbmUua2VlcGVyLnNlZWtlcjtcclxuICAgICAgICAvLyBsZXQgYWN0b3IgPSBtYWNoaW5lLmtlZXBlcjtcclxuICAgICAgICAvLyBpZiAobWFjaGluZS5rZWVwZXIuZm9jdXMgJiYgc2Vla2VyLmdldENhcHR1cmVMaXN0KCkuaW5kZXhPZihtYWNoaW5lLmtlZXBlci5mb2N1cykgPCAwKSB7Ly/lvZPliY3nm67moIfkuI3lnKjmlLvlh7vojIPlm7TlhoVcclxuICAgICAgICAvLyAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgICAgIC8vICAgICBtYWNoaW5lLmtlZXBlci5mb2N1cyA9IHNlZWtlci5nZXRGb2N1cygpO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgLy8gLy/liKTmlq3lvZPliY3mmK/lkKblrZjlnKjnm67moIdcclxuICAgICAgICAvLyBpZiAobWFjaGluZS5rZWVwZXIuZm9jdXMpIHtcclxuICAgICAgICAvLyAgICAgLy/orqHmlbArMVxyXG4gICAgICAgIC8vICAgICB0aGlzLnRpbWUgKz0gMTtcclxuICAgICAgICAvLyAgICAgaWYgKHRoaXMudGltZSA+PSBhY3Rvci5wcm9maWxlLnByZXBUaW1lKSB7ICAvL+WJjeaRh+e7k+adn+inpuWPkeaUu+WHu1xyXG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJBdHRhY2sgJiB0byBBZnRlciBQaGFzZSBAXCIgKyB0aGlzLnRpbWUpOy8v6L+b6KGM5pS75Ye7XHJcbiAgICAgICAgLy8gICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5ldmVudChFdmVudENlbnRyZS5FVHlwZS5BVFRBQ0ssIFthY3RvciwgbWFjaGluZS5rZWVwZXIuZm9jdXNdKTtcclxuICAgICAgICAvLyAgICAgICAgIC8v6L+b5YWl5ZCO5pGH54q25oCBXHJcbiAgICAgICAgLy8gICAgICAgICBtYWNoaW5lLmNoYW5nZVN0YXRlKFN0YXRlVHlwZS5BRlRFUl9BVEspO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgLy/msqHmnInnm67moIfvvIzlm57liLDlvoXmnLrpmLbmrrVcclxuICAgICAgICAvLyAgICAgbWFjaGluZS5jaGFuZ2VTdGF0ZShTdGF0ZVR5cGUuV0FJVCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBBZnRlckF0ayBleHRlbmRzIEJhc2VTdGF0ZSB7XHJcblxyXG4gICAgcHVibGljIGV4ZWN1dGUobWFjaGluZTogQXRrU3RhdGVNYWNoaW5lKTogdm9pZCB7XHJcbiAgICAgICAgLy8gbGV0IHNlZWtlciA9IG1hY2hpbmUua2VlcGVyLnNlZWtlcjtcclxuICAgICAgICAvLyB0aGlzLnRpbWUgKz0gMTsvL+WNlee6r+iuoeS4quaVsO+8jOa7oeS6huWwsei/lOWbnndhaXTnirbmgIFcclxuICAgICAgICAvLyBpZiAodGhpcy50aW1lID49IG1hY2hpbmUua2VlcGVyLnByb2ZpbGUuYWZ0ZXJUaW1lKSB7XHJcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiV2FpdCBBZnRlciBBVEsgRW5kLCB0byBXYWl0IEBcIiArIHRoaXMudGltZSk7XHJcbiAgICAgICAgLy8gICAgIC8v6YeN5paw6I635Y+W55uu5qCH77yM5pyJ55uu5qCH5YiZ6L+b6KGM5LiL5LiA5qyh5pS75Ye777yM5peg55uu5qCH5Zue5Yiw5b6F5py66Zi25q61XHJcbiAgICAgICAgLy8gICAgIG1hY2hpbmUua2VlcGVyLmZvY3VzID0gc2Vla2VyLmdldEZvY3VzKCk7XHJcbiAgICAgICAgLy8gICAgIG1hY2hpbmUuY2hhbmdlU3RhdGUobWFjaGluZS5rZWVwZXIuZm9jdXMgPyBTdGF0ZVR5cGUuUFJFUEFSRSA6IFN0YXRlVHlwZS5XQUlUKTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDnirbmgIHmnLrnsbtcclxuICovXHJcbmV4cG9ydCBjbGFzcyBBdGtTdGF0ZU1hY2hpbmUge1xyXG4gICAgLypcclxuICAgICog5omA5bGeQWN0b3JcclxuICAgICogKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBrZWVwZXI6IEFjdG9yO1xyXG4gICAgLyoqXHJcbiAgICAgKiDlvZPliY3nirbmgIFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjdXJTdGF0ZTogU3RhdGU7XHJcbiAgICAvKipcclxuICAgICAqIOWPr+S9v+eUqOeahOeKtuaAgeWIl+ihqFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRlTGlzdDogS1ZQYWlyPFN0YXRlPiA9IG5ldyBLVlBhaXI8U3RhdGU+KCk7XHJcblxyXG4gICAgcHVibGljIHNlZWtlcjogU2Vla2VyO1xyXG5cclxuICAgIHByaXZhdGUgX3ByZXBUaW1lOm51bWJlcjsvL+WJjeaRh+aXtumXtC/luKdcclxuICAgIHByaXZhdGUgX2Nvb2xUaW1lOm51bWJlcjsvL+WQjuaRh+aXtumXtC/luKdcclxuICAgIHByaXZhdGUgX2N1clBvaW50Om51bWJlciA9IDA7Ly/lvZPliY3lt7Lnp6/ok4TnmoTngrnmlbBcclxuICAgIHByaXZhdGUgX3ZlbG9jaXR5Om51bWJlciA9IDE7Ly/lvZPliY3ntK/liqDpgJ/njoco54K55pWwL+W4pylcclxuXHJcbiAgICBwdWJsaWMgZ2V0IHJlYWR5KCk6Ym9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5fY3VyUG9pbnQ+PXRoaXMuX3ByZXBUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0aWMoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX2N1clBvaW50ICs9IHRoaXMuX3ZlbG9jaXR5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29vbENvbXBsZXRlKCk6Ym9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5fY3VyUG9pbnQgPCB0aGlzLl9wcmVwVGltZSt0aGlzLl9jb29sVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVmcmVzaCgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fY3VyUG9pbnQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIGtlZXBlciDnirbmgIHmnLrmiYDmnInogIVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioa2VlcGVyOiBBY3RvciwgcmVzOmFueSkge1xyXG4gICAgICAgIHRoaXMua2VlcGVyID0ga2VlcGVyO1xyXG4gICAgICAgIHRoaXMuY3VyU3RhdGUgPSBuZXcgV2FpdCgpO1xyXG4gICAgICAgIHRoaXMuc3RhdGVMaXN0LmVkaXQoU3RhdGVUeXBlLldBSVQsIHRoaXMuY3VyU3RhdGUpO1xyXG4gICAgICAgIHRoaXMuc3RhdGVMaXN0LmVkaXQoU3RhdGVUeXBlLlBSRVBBUkUsIG5ldyBQcmVwYXJlKCkpO1xyXG4gICAgICAgIHRoaXMuc3RhdGVMaXN0LmVkaXQoU3RhdGVUeXBlLkFGVEVSX0FUSywgbmV3IEFmdGVyQXRrKCkpO1xyXG4gICAgICAgIC8vdG9kbzogYWJvdXQgcmVzXHJcblxyXG4gICAgICAgIHRoaXMuX3ByZXBUaW1lID0gNDA7XHJcbiAgICAgICAgdGhpcy5fY29vbFRpbWUgPSA0MDtcclxuXHJcbiAgICAgICAgdGhpcy5zZWVrZXIgPSBudWxsOy8v5Yid5aeL5YyWU2Vla2VyKOagueaNrnJlcylcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIt+aWsOW9k+WJjeeKtuaAge+8jOavj+W4p+iwg+eUqFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmtlZXBlcikge1xyXG4gICAgICAgICAgICB0aGlzLmN1clN0YXRlLmV4ZWN1dGUodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pS55Y+Y5b2T5YmN54q25oCB77yM5paw54q25oCB5Lya6YeN572u5Li65Yid5aeL5oCBXHJcbiAgICAgKiBAcGFyYW0gc3RhdGVUeXBlIOaWsOeahOeKtuaAgeexu+Wei1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2hhbmdlU3RhdGUoc3RhdGVUeXBlOiBTdGF0ZVR5cGUpIHtcclxuICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLnN0YXRlTGlzdC5yZWFkKHN0YXRlVHlwZSk7XHJcbiAgICAgICAgc3RhdGUucmVzZXQoKTtcclxuICAgICAgICB0aGlzLmN1clN0YXRlID0gc3RhdGU7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG4iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQmxvY2tlcntcclxuICAgIGNvbnN0cnVjdG9yKGtlZXBlcjpBY3Rvcil7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3RvclN0YXRlQmFzZSB7XHJcbiAgICBwcm90ZWN0ZWQgX2FjdG9yOiBBY3RvcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhY3RvcjogQWN0b3IpIHtcclxuICAgICAgICB0aGlzLl9hY3RvciA9IGFjdG9yO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnRlcigpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxlYXZlKCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEFjdG9yU3RhdGVCYXNlIGZyb20gXCIuL0FjdG9yU3RhdGVCYXNlXCI7XHJcbmltcG9ydCBEb2RMb2cgZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Eb2RMb2dcIjtcclxuaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9BY3RvclwiO1xyXG5pbXBvcnQgeyBBY3RvclN0YXRlV2FsayB9IGZyb20gXCIuL0FjdG9yU3RhdGVXYWxrXCI7XHJcbmltcG9ydCB7IEFjdG9yU3RhdGVQcmVwYXJlZCB9IGZyb20gXCIuL0FjdG9yU3RhdGVQcmVwYXJlZFwiO1xyXG5cclxuZXhwb3J0IGVudW0gQWN0b3JTdGF0ZUlEIHtcclxuICAgIE5vbmUsXHJcbiAgICBQcmVwYXJlZCwgICAgIC8v5b6F5py6ICjmnKrlh7rliqgv5pyq6YOo572yKSAgXHJcbiAgICBCb3JuLCAgIC8v5Ye655Sf5Yqo55S7IOS4jeWPr+aUu+WHuyDkuI3lj6/ooqvmlLvlh7tcclxuICAgIFdhbGssICAgLy/np7vliqgg5pWM5Lq655SoXHJcbiAgICBTdHVubmVkLCAgICAvL+aZleecqSBldGMg77yI5omT5pat5Yqo5L2c55qE6KKr5o6n5Yi254q25oCB77yJXHJcbiAgICBGcmVlemVkLCAgICAvL+WGsOWGuyDvvIjkuI3miZPmlq3liqjkvZznmoTooqvmjqfliLbnirbmgIHvvIlcclxuICAgIEZpZ2h0LCAgLy/mma7mlLvnirbmgIEg5bmy5ZGY5bi45oCBIOaVjOS6uuiiq+mYu+aMoeWQjlxyXG4gICAgRGVhdGgsICAvL+atu+S6oeWKqOeUuyDkuI3lj6/mlLvlh7sg5LiN5Y+v6KKr5pS75Ye7XHJcbiAgICBFc2NhcGUsIC8v5pWM5Lq66YCD6ISxXHJcbiAgICBDb3VudFxyXG59XHJcblxyXG4vKlxyXG4gKiDop5LoibLnirbmgIHmnLog566h55CG6KeS6Imy5omA5aSE6Zi25q61IOagueaNruS4jeWQjOmYtuauteWGs+WumuS4jeWQjOeahOe7hOS7tueKtuaAgVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWN0b3JTdGF0ZU1nciB7XHJcbiAgICBwcml2YXRlIF9zdGF0ZXM6IEFjdG9yU3RhdGVCYXNlW10gPSBbXTtcclxuICAgIHByaXZhdGUgX2N1cnJlbnRTdGF0ZTogQWN0b3JTdGF0ZUJhc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYWN0b3I6IEFjdG9yKSB7XHJcbiAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9zdGF0ZXNbQWN0b3JTdGF0ZUlELldhbGtdID0gbmV3IEFjdG9yU3RhdGVXYWxrKGFjdG9yKTtcclxuICAgICAgICB0aGlzLl9zdGF0ZXNbQWN0b3JTdGF0ZUlELlByZXBhcmVkXSA9IG5ldyBBY3RvclN0YXRlUHJlcGFyZWQoYWN0b3IpO1xyXG4gICAgICAgIC8vVE9ET1xyXG4gICAgICAgIC8v5Y+C54Wn5ri45oiP5aSn54q25oCB5py6XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBpbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucnVuU3RhdGUoQWN0b3JTdGF0ZUlELk5vbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBydW5TdGF0ZShzdGF0ZUlEOiBBY3RvclN0YXRlSUQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoQWN0b3JTdGF0ZUlELkNvdW50IDw9IHN0YXRlSUQgfHwgc3RhdGVJRCA8PSBBY3RvclN0YXRlSUQuTm9uZSkge1xyXG4gICAgICAgICAgICBEb2RMb2cuZXJyb3IoYEdhbWVTdGF0ZU1nci5ydW5TdGF0ZTogSW52YWxpZCBzdGF0ZUlEIFske3N0YXRlSUR9XS4gYCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChudWxsICE9IHRoaXMuX2N1cnJlbnRTdGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUubGVhdmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZSA9IHRoaXMuX3N0YXRlc1tzdGF0ZUlEXTtcclxuICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUuZW50ZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChudWxsICE9IHRoaXMuX2N1cnJlbnRTdGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUudXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAobnVsbCAhPSB0aGlzLl9jdXJyZW50U3RhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlLmxlYXZlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3N0YXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLl9zdGF0ZXNbaV07XHJcbiAgICAgICAgICAgIHN0YXRlLnJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEFjdG9yU3RhdGVCYXNlIGZyb20gXCIuL0FjdG9yU3RhdGVCYXNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQWN0b3JTdGF0ZVByZXBhcmVkIGV4dGVuZHMgQWN0b3JTdGF0ZUJhc2V7XHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6dm9pZHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlBlcnBhcmVkIHVwZGF0ZVwiKVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEFjdG9yU3RhdGVCYXNlIGZyb20gXCIuL0FjdG9yU3RhdGVCYXNlXCI7XHJcbmltcG9ydCB7IEFjdG9yVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vRG9kS2V5XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQWN0b3JTdGF0ZVdhbGsgZXh0ZW5kcyBBY3RvclN0YXRlQmFzZXtcclxuICAgIFxyXG4gICAgcHVibGljIGVudGVyKCk6dm9pZHtcclxuICAgICAgICAvL+S4jeW6lOivpeWcqOi/meS4queKtuaAgemHjO+8jOW6lOivpeWcqGJvcm7ph4zov5vooYxkZXBsb3lcclxuICAgICAgICB0aGlzLl9hY3Rvci5yZW5kZXIuZGVwbG95KCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyB1cGRhdGUoKTp2b2lke1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIldhbGsgdXBkYXRlXCIpO1xyXG4gICAgICAgIGxldCBhY3RvciA9IHRoaXMuX2FjdG9yO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fYWN0b3IudHJhbnNmb3JtLnBvcy5hcnJpdmVkKSB7Ly/lt7LliLDovr7nm67nmoTlnLBcclxuICAgICAgICAgICAgaWYgKGFjdG9yLnJvdXRlLm5leHQoKSkgey8v5a2Y5Zyo5LiL5LiA5Liq55uu5qCH6IqC54K5XHJcbiAgICAgICAgICAgICAgICBhY3Rvci50cmFuc2Zvcm0ucG9zLnNldFRhcmdldChhY3Rvci5yb3V0ZS5jdXJyZW50VGFyZ2V0KCkpOy8v5bCG55uu5qCH5pu/5o2i5Li65LiL5LiA5Liq55uu5qCH6IqC54K5XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL3RvZG86IOaVjOS6uuW3suWIsOi+vue7iOeCuVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhY3Rvci50cmFuc2Zvcm0ucG9zLm1vdmUoKTsvL+enu+WKqFxyXG4gICAgICAgIGFjdG9yLmNvbGlFbWl0LnBvc0J5VmVjKGFjdG9yLnRyYW5zZm9ybS5wb3MuZGF0YSk7Ly/np7vliqjnorDmkp7nrrFcclxuICAgICAgICBhY3Rvci5jb2xpRW1pdC5ldmVudChhY3RvciwgYWN0b3IudHlwZSk7Ly/lj5HluIPnorDmkp7kuovku7ZcclxuICAgICAgICBhY3Rvci5yZW5kZXIubW92ZShhY3Rvci50cmFuc2Zvcm0ucG9zLmRhdGEpOy8v56e75Yqo5Y+v6KeG5a+56LGhXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9BY3Rvci9BY3RvclwiO1xyXG5pbXBvcnQge015U3ltYm9sfSBmcm9tIFwiLi4vLi4vRml4L0ZpeFN5bWJvbFwiO1xyXG5pbXBvcnQge0NpcmNsZUNvbGxpc2lvblJhbmdlfSBmcm9tIFwiLi9Db2xsaXNpb25SYW5nZVwiO1xyXG5cclxuXHJcbi8qKlxyXG4gKiDnorDmkp7lpITnkIblmajvvIzor6Xnsbvnu7TmiqTkuIDkuKpNYXDvvIxNYXDorrDlvZXmiYDmnInpnIDopoHov5vooYznorDmkp7lpITnkIbnmoTnorDmkp7lmajvvIxNYXDnlKjnorDmkp7lmajnmoTllK/kuIDmoIfor4bkvZzkuLrplK7ku6Xpgb/lhY3ph43lpI3orrDlvZXjgIJcclxuICpcclxuICog6K+l57G75o+Q5L6b5LiA5LiqcmVjYWxjdWxhdGXmlrnms5XnlKjkuo7ph43mlrDorqHnrpfnorDmkp7mg4XlhrXvvIzlr7nkuo5NYXDkuK3nmoTmr4/kuKrlpITnkIblr7nosaHvvIzor6Xmlrnms5XorqHnrpflhbbkuI5NYXDkuK3nmoTmiYDmnInlhbbku5blr7nosaFcclxuICog55qE6YeN5Y+g5oOF5Ya177yM5bm25bCG6L+Z5Lqb6YeN5Y+g55qE5YW25LuW5a+56LGh5Lul5YiX6KGo55qE5b2i5byP5Lyg6YCS57uZ6K+l5aSE55CG5a+56LGh44CCXHJcbiAqXHJcbiAqIGJ5IFhXVlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFjdG9yQ29sbGlzaW9uUHJvY2Vzc29yIHtcclxuXHJcbiAgICBwcml2YXRlIGNvbGxpZGVyTWFwOiB7IFtrZXk6IG51bWJlcl06IEFjdG9yQ29sbGlkZXIgfSA9IHt9O1xyXG5cclxuICAgIHB1YmxpYyByZWdpc3RlckNvbGxpZGVyKGNvbGxpZGVyOiBBY3RvckNvbGxpZGVyKSB7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlck1hcFtjb2xsaWRlci5zeW1ib2wuZGF0YV0gPSBjb2xsaWRlcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdW5yZWdpc3RlckNvbGxpZGVyKGNvbGxpZGVyOiBBY3RvckNvbGxpZGVyKSB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuY29sbGlkZXJNYXBbY29sbGlkZXIuc3ltYm9sLmRhdGFdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmNvbGxpZGVyTWFwKSB7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXRDb2xsaWRlciA9IHRoaXMuY29sbGlkZXJNYXBbaV07XHJcbiAgICAgICAgICAgIGxldCBjb2xsaWRpbmdMaXN0ID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogaW4gdGhpcy5jb2xsaWRlck1hcCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbGxpZGVyID0gdGhpcy5jb2xsaWRlck1hcFtqXTtcclxuICAgICAgICAgICAgICAgIGlmIChjb2xsaWRlciA9PSB0YXJnZXRDb2xsaWRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldENvbGxpZGVyLnNob3VsZENvbGxpZGVXaXRoKGNvbGxpZGVyKSAmJiB0YXJnZXRDb2xsaWRlci5nZXRDb2xsaXNpb25SYW5nZSgpLmlzQ29pbmNpZGVXaXRoUmFuZ2UoY29sbGlkZXIuZ2V0Q29sbGlzaW9uUmFuZ2UoKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xsaWRpbmdMaXN0LnB1c2goY29sbGlkZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRhcmdldENvbGxpZGVyLm9uQ29sbGlkaW5nTGlzdFJlZnJlc2goY29sbGlkaW5nTGlzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBY3RvckNvbGxpZGVyIHtcclxuICAgIC8v5ZSv5LiA5qCH6K+GXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgc3ltYm9sOiBNeVN5bWJvbCA9IG5ldyBNeVN5bWJvbCgpO1xyXG5cclxuICAgIC8v6I635Y+W56Kw5pKe6IyD5Zu0XHJcbiAgICBhYnN0cmFjdCBnZXRDb2xsaXNpb25SYW5nZSgpOiBDaXJjbGVDb2xsaXNpb25SYW5nZSA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDph43orr7norDmkp7ojIPlm7RcclxuICAgICAqIEBwYXJhbSByYW5nZSDmlrDnmoTnorDmkp7ojIPlm7RcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3Qgc2V0Q29sbGlzaW9uUmFuZ2UocmFuZ2U6IENpcmNsZUNvbGxpc2lvblJhbmdlKTtcclxuXHJcbiAgICAvL+iOt+WPlueisOaSnuWZqOeahOaJgOacieiAhVxyXG4gICAgYWJzdHJhY3QgZ2V0QWN0b3IoKTogQWN0b3I7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnorDmkp7liJfooajpnIDopoHliLfmlrBcclxuICAgICAqIEBwYXJhbSBjb2xsaWRpbmdMaXN0IOaWsOeahOeisOaSnuWIl+ihqFxyXG4gICAgICogKi9cclxuICAgIGFic3RyYWN0IG9uQ29sbGlkaW5nTGlzdFJlZnJlc2goY29sbGlkaW5nTGlzdDogQWN0b3JDb2xsaWRlcltdKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpuW6lOivpeS4juaMh+WumueisOaSnuWZqOWPkeeUn+eisOaSnlxyXG4gICAgICogQHBhcmFtIGNvbGxpZGVyIOWPpuS4gOS4queisOaSnuWZqFxyXG4gICAgICogKi9cclxuICAgIGFic3RyYWN0IHNob3VsZENvbGxpZGVXaXRoKGNvbGxpZGVyOiBBY3RvckNvbGxpZGVyKTogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOW9k+WJjeeisOaSnuWIl+ihqFxyXG4gICAgICogKi9cclxuICAgIGFic3RyYWN0IGdldENvbGxpZGluZ0xpc3QoKTogQWN0b3JDb2xsaWRlcltdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yi35paw56Kw5pKe6IyD5Zu077yM5L2/5YW26Lef6ZqP5omA5pyJ6ICF56e75YqoXHJcbiAgICAgKiAqL1xyXG4gICAgYWJzdHJhY3QgcmVmcmVzaENvbGxpc2lvblJhbmdlRm9sbG93QWN0b3IoKTtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTaW1wbGVBY3RvckNvbGxpZGVyIGV4dGVuZHMgQWN0b3JDb2xsaWRlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBjb2xsaWRpbmdMaXN0OiBBY3RvckNvbGxpZGVyW10gPSBbXTtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgYWN0b3I6IEFjdG9yO1xyXG4gICAgcHJpdmF0ZSByYW5nZTogQ2lyY2xlQ29sbGlzaW9uUmFuZ2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYWN0b3I6IEFjdG9yLCByYW5nZTogQ2lyY2xlQ29sbGlzaW9uUmFuZ2UpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuYWN0b3IgPSBhY3RvcjtcclxuICAgICAgICB0aGlzLnJhbmdlID0gcmFuZ2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldENvbGxpc2lvblJhbmdlKCk6IENpcmNsZUNvbGxpc2lvblJhbmdlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yYW5nZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDb2xsaXNpb25SYW5nZShyYW5nZTogQ2lyY2xlQ29sbGlzaW9uUmFuZ2UpIHtcclxuICAgICAgICB0aGlzLnJhbmdlID0gcmFuZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QWN0b3IoKTogQWN0b3Ige1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFjdG9yO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENvbGxpZGluZ0xpc3QoKTogQWN0b3JDb2xsaWRlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb2xsaWRpbmdMaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ29sbGlkaW5nTGlzdFJlZnJlc2goY29sbGlkaW5nTGlzdDogQWN0b3JDb2xsaWRlcltdKSB7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRpbmdMaXN0ID0gY29sbGlkaW5nTGlzdDtcclxuICAgIH1cclxuXHJcblxyXG59IiwiaW1wb3J0IHsgQ29saVJlY2VpdmVyLCBDb2xpRW1pdCB9IGZyb20gXCIuLi9BY3Rvci9BY3Rvck1vZHVsZXMvQ29saU1lc3NhZ2VcIjtcclxuaW1wb3J0IHsgVmVjMiB9IGZyb20gXCIuLi8uLi9Db21tb24vRG9kTWF0aFwiO1xyXG5pbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yL0FjdG9yXCI7XHJcbmltcG9ydCB7IEFycmF5QWxnbyB9IGZyb20gXCIuLi8uLi9Db21tb24vRG9kRGF0YVN0cnVjdHVyZVwiO1xyXG5pbXBvcnQgeyBBY3RvclR5cGUgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL0RvZEtleVwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbGlSZXBvcnRlciBleHRlbmRzIENvbGlSZWNlaXZlciB7XHJcbiAgICBwdWJsaWMgaW5MaXN0OiBWZWMyW10gPSBbXTtcclxuICAgIHB1YmxpYyBsYXllcjogTGF5YS5TcHJpdGUgPSBuZXcgTGF5YS5TcHJpdGUoKTtcclxuXHJcbiAgICBwcml2YXRlIF9tYXRyaXg6IEFjdG9yW11bXVtdID0gW107Ly/lrZjlgqjmr4/kuKrlnLDlm77oioLngrnkuK3nmoRBY3RvcuWvueixoVxyXG5cclxuICAgIHByaXZhdGUgbWF0cml4QWRkKHBvczpWZWMyLCBhY3RvcjpBY3Rvcik6dm9pZHtcclxuICAgICAgICB0aGlzLl9tYXRyaXhbcG9zLnhdW3Bvcy55XS5wdXNoKGFjdG9yKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1hdHJpeFJlbW92ZShwb3M6VmVjMiwgYWN0b3I6QWN0b3IpOnZvaWR7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9tYXRyaXhbcG9zLnhdW3Bvcy55XS5pbmRleE9mKGFjdG9yKTtcclxuICAgICAgICBpZiAoaW5kZXggIT0gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWF0cml4W3Bvcy54XVtwb3MueV0uc3BsaWNlKGluZGV4LDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbWF0cml4R2V0KHBvczpWZWMyKTpBY3Rvcltde1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXRyaXhbcG9zLnhdW3Bvcy55XTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigxMCwgMTApO1xyXG4gICAgICAgIGZvciAobGV0IHcgPSAwOyB3IDwgMTA7IHcgKz0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXRyaXhbd10gPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaCA9IDA7IGggPCAxMDsgaCArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldERldGVjdGlvbihuZXcgVmVjMih3LCBoKSwgYCR7QWN0b3JUeXBlLk1vbnN0ZXJ9YCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXRyaXhbd11baF0gPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLmxheWVyKTtcclxuICAgICAgICB0aGlzLmxheWVyLnpPcmRlciA9IC0xMDtcclxuICAgICAgICB0aGlzLmxheWVyLnBvcyg1MCw1MCk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW50cmUoYWN0b3I6IEFjdG9yLCBwb3M6IFZlYzIpOiB2b2lkIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkVudGVyXCIgKyBwb3MueCArIFwifFwiICsgcG9zLnkpO1xyXG4gICAgICAgIHRoaXMuaW5MaXN0LnB1c2gocG9zKTtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgIHRoaXMubWF0cml4QWRkKHBvcyxhY3Rvcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTGVhdmUoYWN0b3I6IEFjdG9yLCBwb3M6IFZlYzIpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IEFycmF5QWxnby5maW5kRWxlKHBvcywgdGhpcy5pbkxpc3QpO1xyXG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5pbkxpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICB0aGlzLm1hdHJpeFJlbW92ZShwb3MsYWN0b3IpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiTGVhdmVcIiArIHBvcy54ICsgXCJ8XCIgKyBwb3MueSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbmRlcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxheWVyLmdyYXBoaWNzLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5pbkxpc3QuZm9yRWFjaChlbGUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyLmdyYXBoaWNzLmRyYXdSZWN0KGVsZS54ICogQ29saUVtaXQuR0xPQkFMX1VOSVRfV0lEVEggKyAxLFxyXG4gICAgICAgICAgICAgICAgZWxlLnkgKiBDb2xpRW1pdC5HTE9CQUxfVU5JVF9IRUlHSFQgKyAxLFxyXG4gICAgICAgICAgICAgICAgQ29saUVtaXQuR0xPQkFMX1VOSVRfV0lEVEggLSAyLFxyXG4gICAgICAgICAgICAgICAgQ29saUVtaXQuR0xPQkFMX1VOSVRfSEVJR0hUIC0gMixcclxuICAgICAgICAgICAgICAgIFwiI2ZmMDAwMFwiXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEdhbWVNYXAgZnJvbSBcIi4vR2FtZUxldmVsXCI7XHJcbmltcG9ydCB7IEFjdG9yQ29sbGlzaW9uUHJvY2Vzc29yIH0gZnJvbSBcIi4vQ29sbGlzaW9uL0FjdG9yQ29sbGlzaW9uUHJvY2Vzc29yXCI7XHJcbmltcG9ydCBHYW1lTGV2ZWwgZnJvbSBcIi4vR2FtZUxldmVsXCI7XHJcbmltcG9ydCBEb2RSZXNvdXJjZU1nciBmcm9tIFwiLi4vUmVzb3VyY2VzL0RvZFJlc291cmNlTWdyXCI7XHJcbmltcG9ydCBBY3Rvck1nciBmcm9tIFwiLi9BY3Rvci9BY3Rvck1nclwiO1xyXG5pbXBvcnQgQ29saVJlcG9ydGVyIGZyb20gXCIuL0NvbGxpc2lvbi9Db2xpUmVwb3J0ZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVCYXR0bGUge1xyXG4gICAgcHVibGljIGxldmVsOiBHYW1lTGV2ZWw7XHJcbiAgICBwdWJsaWMgbWFwOiBHYW1lTWFwO1xyXG4gICAgcHVibGljIGFjdG9yTWdyOiBBY3Rvck1ncjtcclxuXHJcbiAgICBwdWJsaWMgY29sbGlzaW9uOiBBY3RvckNvbGxpc2lvblByb2Nlc3NvcjsvL+i0n+i0o+WchuW9oueisOaSnuajgOa1i1xyXG4gICAgcHVibGljIG1hcE5vZGVDUFU6IENvbGlSZXBvcnRlciA9IG5ldyBDb2xpUmVwb3J0ZXIoKTsvL+i0n+i0o+WcsOWbvuiKgueCueeisOaSnuajgOa1i1xyXG5cclxuICAgIHByaXZhdGUgX2xldmVsUHJlcGFyZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5sZXZlbCA9IG5ldyBHYW1lTGV2ZWwoKTtcclxuICAgICAgICB0aGlzLm1hcCA9IG5ldyBHYW1lTWFwKCk7XHJcbiAgICAgICAgdGhpcy5hY3Rvck1nciA9IG5ldyBBY3Rvck1ncigpO1xyXG5cclxuICAgICAgICB0aGlzLmNvbGxpc2lvbiA9IG5ldyBBY3RvckNvbGxpc2lvblByb2Nlc3NvcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwcmVwYXJlTGV2ZWwoKTogdm9pZCB7XHJcbiAgICAgICAgLy9UT0RPIGluaXQgbGV2ZWwgaW5mb3JtYXRpb25cclxuICAgICAgICBsZXQgcmVzID0gRG9kUmVzb3VyY2VNZ3IuSW5zdGFuY2UuZ2V0Q3VycmVudExldmVsUmVzKCk7XHJcblxyXG4gICAgICAgIC8vdGVzdFxyXG4gICAgICAgIHJlcyA9IHtsZXZlbDoxLG1hcDoyfTtcclxuXHJcbiAgICAgICAgdGhpcy5sZXZlbC5pbml0KHJlc1snbGV2ZWwnXSk7IC8vanVzdCBzYW1wbGVcclxuICAgICAgICB0aGlzLm1hcC5pbml0KHJlc1snbWFwJ10pO1xyXG4gICAgICAgIHRoaXMuYWN0b3JNZ3IuaW5pdChyZXNbJ21hcCddKTtcclxuXHJcbiAgICAgICAgLy9BTkQgRE9OVCBGT1JHRVQgUkVTRVQgTEFTVCBCQVRUTEUgREFUQSBSRU1BSU5TLiBcclxuICAgICAgICAvL3RoaXMuY29sbGlzaW9uLnJlc2V0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2xldmVsUHJlcGFyZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0xldmVsUHJlcHJhcmVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sZXZlbFByZXBhcmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICAvL1RPRE9cclxuICAgICAgICAvL0NMRUFSIExBU1QgQkFUVExFIFJFU09VUkNFXHJcbiAgICAgICAgdGhpcy5fbGV2ZWxQcmVwYXJlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUJhdHRsZUNvbnN0IHtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgc3RhbmRhcmRDb3N0SW5jcmVhc2VSYXRpbzogbnVtYmVyID0gMTtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgbWF4Q29zdE51bTogbnVtYmVyID0gOTk7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGluaXRDb3N0TnVtOiBudW1iZXIgPSA2O1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBsaWZlUG9pbnQ6IG51bWJlciA9IDM7XHJcbn0iLCJpbXBvcnQgeyBCdWZmIH0gZnJvbSBcIi4vQWN0b3IvQWN0b3JNb2R1bGVzL0J1ZmZcIjtcclxuaW1wb3J0IHsgRXZlbnRDZW50cmUgfSBmcm9tIFwiLi4vRXZlbnQvRXZlbnRDZW50cmVcIjtcclxuaW1wb3J0IEZpeFRpbWUgZnJvbSBcIi4uL0ZpeC9GaXhUaW1lXCI7XHJcbmltcG9ydCBEb2RSZXNvdXJjZU1nciBmcm9tIFwiLi4vUmVzb3VyY2VzL0RvZFJlc291cmNlTWdyXCI7XHJcbmltcG9ydCBHYW1lQmF0dGxlQ29uc3QgZnJvbSBcIi4vR2FtZUJhdHRsZUNvbnN0XCI7XHJcbi8qKlxyXG4gKiDmqKHlnZfor7TmmI46IOa4uOaIj+aImOaWl+WcsOWbvuaooeWdlyAgXHJcbiAqIOi0n+i0o+WGheWuuTog5Zyw5Zu+5bGe5oCn6K6+572u77yM5YWo5bGAYnVmZueuoeeQhiAgXHJcbiAqIOi0n+i0o+S6ujog6ZO25Y2OICBcclxuICog5pe26Ze0OiAyMDIw5bm0M+aciDPml6UxMjo0NTo0MSAgXHJcbiAqL1xyXG5cclxuLy9LUjog5YWo5bGA55Sx5YWz5Y2h5qih5Z2X566h55CGIEDpk7bljY5cclxuLy/ov5nph4zlj6/ku6XljIXlkKvlhajlsYDnmoTosIPmlbTlgLwv55Sf5ZG95YC8L+a2qOi0uVxyXG4vL+WFqOa4uOaIj+agh+WHhuWAvOS9v+eUqOW4uOmHj+WumuS5ieWcqEJhdHRsZUNvbnN057G75LitIOekuuS+i+WPr+S7peeci+S4i+aWuVxyXG4vL+WPpu+8muengeacieaIkOWRmOWRveWQjeivt+WcqOWJjemdouWKoOS4i+WIkue6vyDlo7DmmI7nmoTmiJDlkZjor7flnKjmnoTpgKDlh73mlbDkuK3lhajpg6jliJ3lp4vljJbkuIDkuKrlgLzvvIzpmLLmraJ1bmRlZmluZWQo6YeO5oyH6ZKIKeeahOaDheWGteWPkeeUn1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUxldmVse1xyXG4gICAgcHJpdmF0ZSBfaW5pdGlhbENvc3Q6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfY3VycmVudENvc3Q6bnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgX2xpZmVQb2ludDpudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfdGltZUxpbmU6bnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgX2dsb2JhbEJ1ZmZMaXN0OiBCdWZmW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLl9pbml0aWFsQ29zdCA9IDA7XHJcbiAgICAgICAgdGhpcy5fY3VycmVudENvc3QgPSAwO1xyXG4gICAgICAgIHRoaXMuX2xpZmVQb2ludCA9IDA7XHJcbiAgICAgICAgdGhpcy5fdGltZUxpbmUgPSAwO1xyXG4gICAgICAgIHRoaXMuX2dsb2JhbEJ1ZmZMaXN0ID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXQocmVzOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICAvL2ZvciBleGFtcGxlXHJcbiAgICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgICAgIHRoaXMuX2luaXRpYWxDb3N0ID0gdGhpcy5fY3VycmVudENvc3QgPSByZXNbJ2luaXRDb3N0J10gfHwgR2FtZUJhdHRsZUNvbnN0LmluaXRDb3N0TnVtO1xyXG4gICAgICAgIHRoaXMuX2xpZmVQb2ludCA9IHJlc1snbGlmZSddIHx8IEdhbWVCYXR0bGVDb25zdC5saWZlUG9pbnQ7XHJcbiAgICAgICAgdGhpcy5fdGltZUxpbmUgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuZ2V0R2xvYmFsQnVmZkxpc3QoKTtcclxuICAgICAgICB0aGlzLl91cGRhdGVUaW1lKCk7IFxyXG4gICAgICAgIHRoaXMuX3VwZGF0ZUNvc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0R2xvYmFsQnVmZkxpc3QoKTpCdWZmW117XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dsb2JhbEJ1ZmZMaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGFuZ2VDb3N0KCk6dm9pZHtcclxuICAgICAgICAvL3RvZG8uLi4uXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfdXBkYXRlVGltZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl90aW1lTGluZSArPSBGaXhUaW1lLmRlbHRhVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF91cGRhdGVDb3N0KCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fZ2xvYmFsQnVmZkxpc3Quc3BsaWNlKDAsIHRoaXMuX2dsb2JhbEJ1ZmZMaXN0Lmxlbmd0aCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IERvZExvZyBmcm9tIFwiLi4vQ29tbW9uL0RvZExvZ1wiO1xyXG5pbXBvcnQgR2FtZVN0YXRlTWdyIGZyb20gXCIuL1N0YXRlL0dhbWVTdGF0ZU1nclwiO1xyXG5pbXBvcnQgR2FtZUJhdHRsZSBmcm9tIFwiLi9HYW1lQmF0dGxlXCI7XHJcbmltcG9ydCBHYW1lTG9iYnkgZnJvbSBcIi4vTG9iYnkvR2FtZUxvYmJ5XCI7XHJcblxyXG4vKipcclxuICog6L+Z5piv5ri45oiP5pys5L2TXHJcbiAqIOivtOS4gOS6m1Job2Rlc19HYW1l5paH5Lu25aS55LiL55qE5rOo6YeK6KeE5YiZ77yM5pa55L6/5Lul5ZCOY3RybCtmXHJcbiAqXHJcbiAqIDEuLy9AdG9kbyDmoIfms6jpnIDopoHlrozlloTnmoTpg6jliIZcclxuICpcclxuICogMi4vL0B0b2ZpeCDmoIfms6jlt7Lnn6XmnInpl67popjnmoTpg6jliIZcclxuICpcclxuICogMy4vL0B0ZXN0IOagh+azqOS7heS+m+a1i+ivleS9v+eUqOeahOmDqOWIhlxyXG4gKlxyXG4gKiAzLi8vQHJlZGNhbGwg5qCH5rOo6LCD55So5riy5p+T5qih5Z2X55qE6YOo5YiGXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSaG9kZXNHYW1lIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogUmhvZGVzR2FtZTtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IEluc3RhbmNlKCk6IFJob2Rlc0dhbWUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZSB8fCAodGhpcy5faW5zdGFuY2UgPSBuZXcgdGhpcygpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGVNZ3I6IEdhbWVTdGF0ZU1ncjtcclxuICAgIHB1YmxpYyBiYXR0bGU6IEdhbWVCYXR0bGU7XHJcbiAgICBwdWJsaWMgbG9iYnk6IEdhbWVMb2JieTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5iYXR0bGUgPSBuZXcgR2FtZUJhdHRsZSgpO1xyXG4gICAgICAgIHRoaXMuc3RhdGVNZ3IgPSBuZXcgR2FtZVN0YXRlTWdyKHRoaXMuYmF0dGxlKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXRlTWdyLmluaXQoKTtcclxuICAgICAgICBEb2RMb2cuZGVidWcoYFJob2Rlc0dhbWU6IGluaXRpYWxpemF0aW9uIGNvbXBsZXRlLiBgKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZU1nci51cGRhdGUoKTtcclxuICAgIH1cclxuXHJcblxyXG59IiwiaW1wb3J0IEdhbWVCYXR0bGUgZnJvbSBcIi4uL0dhbWVCYXR0bGVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTdGF0ZUJhc2Uge1xyXG4gICAgcHJvdGVjdGVkIF9iYXR0bGU6IEdhbWVCYXR0bGU7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYmF0dGxlOiBHYW1lQmF0dGxlKSB7XHJcbiAgICAgICAgdGhpcy5fYmF0dGxlID0gYmF0dGxlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnRlcigpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxlYXZlKCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEdhbWVTdGF0ZUJhc2UgZnJvbSBcIi4vR2FtZVN0YXRlQmFzZVwiO1xyXG5pbXBvcnQgUmhvZGVzR2FtZSBmcm9tIFwiLi4vUmhvZGVzR2FtZVwiO1xyXG5pbXBvcnQgR2FtZUJhdHRsZSBmcm9tIFwiLi4vR2FtZUJhdHRsZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVN0YXRlQmF0dGxlIGV4dGVuZHMgR2FtZVN0YXRlQmFzZXtcclxuICAgIGNvbnN0cnVjdG9yKGJhdHRsZTpHYW1lQmF0dGxlKSB7XHJcbiAgICAgICAgc3VwZXIoYmF0dGxlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW50ZXIoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuZW50ZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbGVhdmUoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIubGVhdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIucmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLnVwZGF0ZSgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQmF0dGxlU3RhdGUgdXBkYXRlXCIpXHJcbiAgICAgICAgdGhpcy5fYmF0dGxlLmFjdG9yTWdyLnVwZGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuX2JhdHRsZS5tYXAudXBkYXRlKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgR2FtZVN0YXRlQmFzZSBmcm9tIFwiLi9HYW1lU3RhdGVCYXNlXCI7XHJcbmltcG9ydCBSaG9kZXNHYW1lIGZyb20gXCIuLi9SaG9kZXNHYW1lXCI7XHJcbmltcG9ydCBEb2RSZXNvdXJjZU1nciBmcm9tIFwiLi4vLi4vUmVzb3VyY2VzL0RvZFJlc291cmNlTWdyXCI7XHJcbmltcG9ydCB7IEdhbWVTdGF0ZUlEIH0gZnJvbSBcIi4vR2FtZVN0YXRlTWdyXCI7XHJcbmltcG9ydCBEb2RMb2cgZnJvbSBcIi4uLy4uL0NvbW1vbi9Eb2RMb2dcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTdGF0ZUdhbWVsb2FkIGV4dGVuZHMgR2FtZVN0YXRlQmFzZXtcclxuICAgIGNvbnN0cnVjdG9yKGJhdHRsZSkge1xyXG4gICAgICAgIHN1cGVyKGJhdHRsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudGVyKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmVudGVyKCk7XHJcbiAgICAgICAgLy9UT0RPIFNIT1cgTE9BRElORyBTQ1JFRU5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbGVhdmUoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIubGVhdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIucmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLnVwZGF0ZSgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiR2FtZUxvYWQgdXBkYXRlXCIpO1xyXG4gICAgICAgIGlmICh0cnVlID09IERvZFJlc291cmNlTWdyLkluc3RhbmNlLmluaXRlZCgpKSB7XHJcbiAgICAgICAgICAgIC8vV0UgRE8gTk9UIEhBVkUgTE9CQlkgTU9EVUxFIElOIFRISVMgVkVSU0lPTlxyXG4gICAgICAgICAgICAvL0pVU1QgU0VUIExFVkVMIElEIEhFUkVcclxuICAgICAgICAgICAgLy9UTyBERUxcclxuICAgICAgICAgICAgRG9kUmVzb3VyY2VNZ3IuSW5zdGFuY2Uuc2V0TGV2ZWxJRCgxKTtcclxuICAgICAgICAgICAgUmhvZGVzR2FtZS5JbnN0YW5jZS5zdGF0ZU1nci5ydW5TdGF0ZShHYW1lU3RhdGVJRC5MZXZlbGxvYWQpO1xyXG4gICAgICAgICAgICBEb2RMb2cuZGVidWcoYEdhbWVTdGF0ZUdhbWVsb2FkLnVwZGF0ZTogUmVzb3VyY2VzIGluaXQgY29tcGxldGUsIHNldCBsZXZlbCBpbnRvIDEuIGApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBHYW1lU3RhdGVCYXNlIGZyb20gXCIuL0dhbWVTdGF0ZUJhc2VcIjtcclxuaW1wb3J0IFJob2Rlc0dhbWUgZnJvbSBcIi4uL1Job2Rlc0dhbWVcIjtcclxuaW1wb3J0IHsgR2FtZVN0YXRlSUQgfSBmcm9tIFwiLi9HYW1lU3RhdGVNZ3JcIjtcclxuaW1wb3J0IERvZFJlc291cmNlTWdyIGZyb20gXCIuLi8uLi9SZXNvdXJjZXMvRG9kUmVzb3VyY2VNZ3JcIjtcclxuaW1wb3J0IERvZExvZyBmcm9tIFwiLi4vLi4vQ29tbW9uL0RvZExvZ1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVN0YXRlTGV2ZWxMb2FkIGV4dGVuZHMgR2FtZVN0YXRlQmFzZXtcclxuICAgIGNvbnN0cnVjdG9yKGJhdHRsZSkge1xyXG4gICAgICAgIHN1cGVyKGJhdHRsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudGVyKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmVudGVyKCk7XHJcbiAgICAgICAgdGhpcy5fYmF0dGxlLnByZXBhcmVMZXZlbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsZWF2ZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5sZWF2ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKCk7XHJcbiAgICAgICAgaWYgKHRydWUgPT0gRG9kUmVzb3VyY2VNZ3IuSW5zdGFuY2UuaXNMZXZlbFByZXBhcmVkKCkpIHtcclxuICAgICAgICAgICAgaWYgKHRydWUgPT0gdGhpcy5fYmF0dGxlLmlzTGV2ZWxQcmVwcmFyZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgUmhvZGVzR2FtZS5JbnN0YW5jZS5zdGF0ZU1nci5ydW5TdGF0ZShHYW1lU3RhdGVJRC5CYXR0bGUpO1xyXG4gICAgICAgICAgICAgICAgRG9kTG9nLmRlYnVnKGBHYW1lU3RhdGVMZXZlbGxvYWQudXBkYXRlOiBsZXZlbCBbJHtEb2RSZXNvdXJjZU1nci5JbnN0YW5jZS5nZXRMZXZlbElEKCl9XSBpcyBwcmVwYXJlZC4gYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgR2FtZVN0YXRlQmFzZSBmcm9tIFwiLi9HYW1lU3RhdGVCYXNlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU3RhdGVMb2JieSBleHRlbmRzIEdhbWVTdGF0ZUJhc2V7XHJcbiAgICBjb25zdHJ1Y3RvcihiYXR0bGUpIHtcclxuICAgICAgICBzdXBlcihiYXR0bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnRlcigpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5lbnRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsZWF2ZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5sZWF2ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgR2FtZVN0YXRlQmFzZSBmcm9tIFwiLi9HYW1lU3RhdGVCYXNlXCI7XHJcbmltcG9ydCBHYW1lU3RhdGVCYXR0bGUgZnJvbSBcIi4vR2FtZVN0YXRlQmF0dGxlXCI7XHJcbmltcG9ydCBEb2RMb2cgZnJvbSBcIi4uLy4uL0NvbW1vbi9Eb2RMb2dcIjtcclxuaW1wb3J0IEdhbWVTdGF0ZUxldmVsTG9hZCBmcm9tIFwiLi9HYW1lU3RhdGVMZXZlbGxvYWRcIjtcclxuaW1wb3J0IEdhbWVTdGF0ZUdhbWVsb2FkIGZyb20gXCIuL0dhbWVTdGF0ZUdhbWVsb2FkXCI7XHJcbmltcG9ydCBHYW1lU3RhdGVMb2JieSBmcm9tIFwiLi9HYW1lU3RhdGVMb2JieVwiO1xyXG5pbXBvcnQgUmhvZGVzR2FtZSBmcm9tIFwiLi4vUmhvZGVzR2FtZVwiO1xyXG5pbXBvcnQgR2FtZUJhdHRsZSBmcm9tIFwiLi4vR2FtZUJhdHRsZVwiO1xyXG5cclxuZXhwb3J0IGVudW0gR2FtZVN0YXRlSUQge1xyXG4gICAgTm9uZSxcclxuICAgIEdhbWVsb2FkLFxyXG4gICAgTG9iYnksXHJcbiAgICBMZXZlbGxvYWQsXHJcbiAgICBCYXR0bGUsXHJcbiAgICBDb3VudFxyXG59XHJcblxyXG4vKlxyXG4gKiDlpKfnirbmgIHmnLog566h55CG5ri45oiP5omA5aSE6Zi25q61XHJcbiAqIEBUT0RPIEdBTUVMT0FEIExPQkJZIExFVkVMTE9BRCBCQVRUTEVcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTdGF0ZU1nciB7XHJcbiAgICBwcml2YXRlIF9zdGF0ZXM6IEdhbWVTdGF0ZUJhc2VbXTtcclxuICAgIHByaXZhdGUgX2N1cnJlbnRTdGF0ZTogR2FtZVN0YXRlQmFzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihiYXR0bGU6R2FtZUJhdHRsZSkge1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZSA9IG51bGw7XHJcbiAgICAgICAgLy8gbGV0IGJhdHRsZSA9IFJob2Rlc0dhbWUuSW5zdGFuY2UuYmF0dGxlO1xyXG4gICAgXHJcbiAgICAgICAgdGhpcy5fc3RhdGVzID0gW107XHJcbiAgICAgICAgdGhpcy5fc3RhdGVzLnB1c2gobnVsbCk7XHJcbiAgICAgICAgdGhpcy5fc3RhdGVzLnB1c2gobmV3IEdhbWVTdGF0ZUdhbWVsb2FkKGJhdHRsZSkpO1xyXG4gICAgICAgIHRoaXMuX3N0YXRlcy5wdXNoKG5ldyBHYW1lU3RhdGVMb2JieShiYXR0bGUpKTtcclxuICAgICAgICB0aGlzLl9zdGF0ZXMucHVzaChuZXcgR2FtZVN0YXRlTGV2ZWxMb2FkKGJhdHRsZSkpO1xyXG4gICAgICAgIHRoaXMuX3N0YXRlcy5wdXNoKG5ldyBHYW1lU3RhdGVCYXR0bGUoYmF0dGxlKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBpbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucnVuU3RhdGUoR2FtZVN0YXRlSUQuR2FtZWxvYWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBydW5TdGF0ZShzdGF0ZUlEOiBHYW1lU3RhdGVJRCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChHYW1lU3RhdGVJRC5Db3VudCA8PSBzdGF0ZUlEIHx8IHN0YXRlSUQgPD0gR2FtZVN0YXRlSUQuTm9uZSkge1xyXG4gICAgICAgICAgICBEb2RMb2cuZXJyb3IoYEdhbWVTdGF0ZU1nci5ydW5TdGF0ZTogSW52YWxpZCBzdGF0ZUlEIFske3N0YXRlSUR9XS4gYCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChudWxsICE9IHRoaXMuX2N1cnJlbnRTdGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUubGVhdmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZSA9IHRoaXMuX3N0YXRlc1tzdGF0ZUlEXTtcclxuICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUuZW50ZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChudWxsICE9IHRoaXMuX2N1cnJlbnRTdGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUudXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAobnVsbCAhPSB0aGlzLl9jdXJyZW50U3RhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlLmxlYXZlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3N0YXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLl9zdGF0ZXNbaV07XHJcbiAgICAgICAgICAgIHN0YXRlLnJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEdhbWVDb25maWcgZnJvbSBcIi4vR2FtZUNvbmZpZ1wiO1xyXG5pbXBvcnQgU2NlbmVNYW5hZ2VyIGZyb20gXCIuL1NjZW5lTWFuYWdlclwiO1xyXG5pbXBvcnQgRml4VGltZSBmcm9tIFwiLi9GaXgvRml4VGltZVwiO1xyXG5pbXBvcnQgUmhvZGVzR2FtZSBmcm9tIFwiLi9HYW1lL1Job2Rlc0dhbWVcIjtcclxuaW1wb3J0IHsgRXZlbnRDZW50cmUgfSBmcm9tIFwiLi9FdmVudC9FdmVudENlbnRyZVwiO1xyXG5pbXBvcnQgRG9kUmVzb3VyY2VNZ3IgZnJvbSBcIi4vUmVzb3VyY2VzL0RvZFJlc291cmNlTWdyXCI7XHJcbmltcG9ydCBQZXJmb3JtYW5jZUNlbnRyZSBmcm9tIFwiLi9Db21tb24vR3JhcGhpY3MvUGVyZm9ybWFuY2VfTW9kdWxlL1BlcmZvcm1hbmNlQ2VudHJlXCI7XHJcbmltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi9Db21tb24vRG9kTWF0aFwiO1xyXG5pbXBvcnQgQWN0b3IgZnJvbSBcIi4vR2FtZS9BY3Rvci9BY3RvclwiO1xyXG5pbXBvcnQgeyBBY3RvclR5cGUgfSBmcm9tIFwiLi9Db21tb24vRG9kS2V5XCI7XHJcblxyXG5jbGFzcyBNYWluIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdC8v5qC55o2uSURF6K6+572u5Yid5aeL5YyW5byV5pOOXHRcdFxyXG5cdFx0aWYgKHdpbmRvd1tcIkxheWEzRFwiXSkgTGF5YTNELmluaXQoR2FtZUNvbmZpZy53aWR0aCwgR2FtZUNvbmZpZy5oZWlnaHQpO1xyXG5cdFx0ZWxzZSBMYXlhLmluaXQoR2FtZUNvbmZpZy53aWR0aCwgR2FtZUNvbmZpZy5oZWlnaHQsIExheWFbXCJXZWJHTFwiXSk7XHJcblx0XHRMYXlhW1wiUGh5c2ljc1wiXSAmJiBMYXlhW1wiUGh5c2ljc1wiXS5lbmFibGUoKTtcclxuXHRcdExheWFbXCJEZWJ1Z1BhbmVsXCJdICYmIExheWFbXCJEZWJ1Z1BhbmVsXCJdLmVuYWJsZSgpO1xyXG5cdFx0TGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBHYW1lQ29uZmlnLnNjYWxlTW9kZTtcclxuXHRcdExheWEuc3RhZ2Uuc2NyZWVuTW9kZSA9IEdhbWVDb25maWcuc2NyZWVuTW9kZTtcclxuXHRcdC8v5YW85a655b6u5L+h5LiN5pSv5oyB5Yqg6L29c2NlbmXlkI7nvIDlnLrmma9cclxuXHRcdExheWEuVVJMLmV4cG9ydFNjZW5lVG9Kc29uID0gR2FtZUNvbmZpZy5leHBvcnRTY2VuZVRvSnNvbjtcclxuXHJcblx0XHQvL+aJk+W8gOiwg+ivlemdouadv++8iOmAmui/h0lEReiuvue9ruiwg+ivleaooeW8j++8jOaIluiAhXVybOWcsOWdgOWinuWKoGRlYnVnPXRydWXlj4LmlbDvvIzlnYflj6/miZPlvIDosIPor5XpnaLmnb/vvIlcclxuXHRcdGlmIChHYW1lQ29uZmlnLmRlYnVnIHx8IExheWEuVXRpbHMuZ2V0UXVlcnlTdHJpbmcoXCJkZWJ1Z1wiKSA9PSBcInRydWVcIikgTGF5YS5lbmFibGVEZWJ1Z1BhbmVsKCk7XHJcblx0XHRpZiAoR2FtZUNvbmZpZy5waHlzaWNzRGVidWcgJiYgTGF5YVtcIlBoeXNpY3NEZWJ1Z0RyYXdcIl0pIExheWFbXCJQaHlzaWNzRGVidWdEcmF3XCJdLmVuYWJsZSgpO1xyXG5cdFx0aWYgKEdhbWVDb25maWcuc3RhdCkgTGF5YS5TdGF0LnNob3coKTtcclxuXHRcdExheWEuYWxlcnRHbG9iYWxFcnJvciA9IHRydWU7XHJcblxyXG5cdFx0Ly9HQU1FIElOSVQgKEdMT0JBTCBNT0RVTEUpXHJcblx0XHRjb25zb2xlLmxvZyhcIlBDIGluaXRcIik7XHJcblx0XHRQZXJmb3JtYW5jZUNlbnRyZS5pbml0aWFsaXplKExheWEuc3RhZ2UpO1xyXG5cclxuXHRcdC8vdGVzdFxyXG5cdFx0UGVyZm9ybWFuY2VDZW50cmUuaW5zdGFuY2UuaW5pdEJvYXJkKFtcclxuXHRcdFx0WzAsMCwwLDBdLFxyXG5cdFx0XHRbMCwwLDAsMF1cclxuXHRcdF0sIG5ldyBWZWMyKDUwLDUwKSwgbmV3IFZlYzIoMTAwLDEwMCksIFwiI2ZmMDBmZlwiLCBcIiNmZmZmMDBcIik7XHJcblx0XHQvL3Rlc3QgZW5kXHJcblxyXG5cdFx0Rml4VGltZS5pbml0KCk7XHJcblx0XHRSaG9kZXNHYW1lLkluc3RhbmNlLmluaXQoKTtcclxuXHRcdERvZFJlc291cmNlTWdyLkluc3RhbmNlLmluaXQoKTtcclxuXHRcdEV2ZW50Q2VudHJlLmluaXQoKTtcclxuXHJcblx0XHQvL+a/gOa0u+i1hOa6kOeJiOacrOaOp+WItu+8jHZlcnNpb24uanNvbueUsUlEReWPkeW4g+WKn+iDveiHquWKqOeUn+aIkO+8jOWmguaenOayoeacieS5n+S4jeW9seWTjeWQjue7rea1geeoi1xyXG5cdFx0TGF5YS5SZXNvdXJjZVZlcnNpb24uZW5hYmxlKFwidmVyc2lvbi5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vblZlcnNpb25Mb2FkZWQpLCBMYXlhLlJlc291cmNlVmVyc2lvbi5GSUxFTkFNRV9WRVJTSU9OKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBvblZlcnNpb25Mb2FkZWQoKTogdm9pZCB7XHJcblx0XHQvL+a/gOa0u+Wkp+Wwj+WbvuaYoOWwhO+8jOWKoOi9veWwj+WbvueahOaXtuWAme+8jOWmguaenOWPkeeOsOWwj+WbvuWcqOWkp+WbvuWQiOmbhumHjOmdou+8jOWImeS8mOWFiOWKoOi9veWkp+WbvuWQiOmbhu+8jOiAjOS4jeaYr+Wwj+WbvlxyXG5cdFx0TGF5YS5BdGxhc0luZm9NYW5hZ2VyLmVuYWJsZShcImZpbGVjb25maWcuanNvblwiLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMub25Db25maWdMb2FkZWQpKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBvbkNvbmZpZ0xvYWRlZCgpOiB2b2lkIHtcclxuXHJcblx0XHRcclxuXHJcblx0XHRTY2VuZU1hbmFnZXIuSW5zdGFuY2UuYXdha2UoKTtcclxuXHRcdFxyXG5cclxuXHRcdC8vdGVzdFxyXG5cdFx0RG9kUmVzb3VyY2VNZ3IuSW5zdGFuY2UuaW5pdCgpO1xyXG5cdFx0XHJcblx0XHQvL0F3YWtlIEdhbWUgRW5naW5lIExvb3BcclxuXHRcdExheWEudGltZXIubG9vcCgxNiwgdGhpcywgdGhpcy5fdXBkYXRlKTtcclxuXHRcdFxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBfdXBkYXRlKCk6IHZvaWQge1xyXG5cdFx0Rml4VGltZS51cGRhdGUoKTtcclxuXHRcdFJob2Rlc0dhbWUuSW5zdGFuY2UudXBkYXRlKCk7XHJcblx0XHREb2RSZXNvdXJjZU1nci5JbnN0YW5jZS51cGRhdGUoKTtcclxuXHR9XHJcbn1cclxuXHJcbi8v5r+A5rS75ZCv5Yqo57G7XHJcbm5ldyBNYWluKCk7XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIERvZFJlc291cmNlTWdyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogRG9kUmVzb3VyY2VNZ3I7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBJbnN0YW5jZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2UgfHwgKHRoaXMuX2luc3RhbmNlID0gbmV3IHRoaXMoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPIEDpk7bljY5cclxuICAgIC8vbG9hZCByZXNvdXJjZXMgaGVyZSBpbmNsdWRpbmcgSlNPTiAvIFRFWFRVUkUgLyBBVkFUQVIgLyBTUElORVxyXG4gICAgLy9wcml2YXRlIF9qc29uOiBEb2RKc29uTG9hZGVyO1xyXG4gICAgLy9wcml2YXRlIF90ZXg6IERvZFRleHR1cmVMb2FkZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfbGV2ZWxJRDogbnVtYmVyIHwgbnVsbDtcclxuICAgIHByaXZhdGUgX2luaXRlZDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX2xldmVsUHJlcGFyZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxJRCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5faW5pdGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxQcmVwYXJlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRMZXZlbElEKGlkOiBudW1iZXIgfCBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxJRCA9IGlkO1xyXG4gICAgICAgIHRoaXMuX2xldmVsUHJlcGFyZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TGV2ZWxJRCgpOiBudW1iZXIgfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGV2ZWxJRDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdCgpOiB2b2lkIHtcclxuICAgICAgICAvL1RPRE8gTE9BRFxyXG4gICAgICAgIC8vdGhpcy5fanNvbi5sb2FkKCk7XHJcbiAgICAgICAgLy90aGlzLl90ZXgubG9hZCgpO1xyXG4gICAgICAgIC8vc2V0IGluaXRlZCBmbGFnIHRydWUgd2hpbGUgaW5pdGlhbGl6YXRpb24gY29tcGxldGVcclxuICAgICAgICB0aGlzLl9pbml0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luaXRlZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChudWxsICE9IHRoaXMuc2V0TGV2ZWxJRCAmJiBmYWxzZSA9PSB0aGlzLl9sZXZlbFByZXBhcmVkKSB7XHJcbiAgICAgICAgICAgIC8vcHJlcGFyZSBwcmVmYWIgaGVyZVxyXG4gICAgICAgICAgICBpZiAoMSkgeyAgICAvL21ha2Ugc3VyZSBwcmVmYWIgcHJlcGFyZWRcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xldmVsUHJlcGFyZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0xldmVsUHJlcGFyZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xldmVsUHJlcGFyZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEN1cnJlbnRMZXZlbFJlcygpOiBhbnkge1xyXG4gICAgICAgIC8vVE9ET1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRBY3RvclJlc0J5SUQoaWQ6IG51bWJlcik6IGFueSB7XHJcbiAgICAgICAgLy9UT0RPXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbn0iLCIvLyBpbXBvcnQgRXZlbnRDZW50cmUgZnJvbSBcIi4vVG95Ym94L0V2ZW50Q2VudHJlXCI7XHJcbi8vIGltcG9ydCBEYXRhYmFzZSBmcm9tIFwiLi9Ub3lib3gvRGF0YWJhc2VcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjZW5lTWFuYWdlcntcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogU2NlbmVNYW5hZ2VyO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSW5zdGFuY2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlIHx8ICh0aGlzLl9pbnN0YW5jZSA9IG5ldyB0aGlzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgbG9hZGluZ1NjZW5lOnN0cmluZyA9IFwiTG9hZGluZ1NjZW5lLnNjZW5lXCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGdhbWVTY2VuZTpzdHJpbmcgPSBcIkdhbWVTY2VuZS5zY2VuZVwiO1xyXG5cclxuICAgIHB1YmxpYyBhd2FrZSgpOiB2b2lkIHtcclxuICAgICAgICBMYXlhLlNjZW5lLm9wZW4odGhpcy5nYW1lU2NlbmUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IHt1aX0gZnJvbSBcIi4uL3VpL2xheWFNYXhVSVwiO1xyXG5pbXBvcnQgUmhvZGVzR2FtZSBmcm9tIFwiLi4vR2FtZS9SaG9kZXNHYW1lXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSBleHRlbmRzIHVpLkdhbWVTY2VuZVVJIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgVUlTZXQ6IExheWEuU3ByaXRlO1xyXG4gICAgcHVibGljIHN0YXRpYyBzdGFnZTogTGF5YS5TdGFnZTtcclxuICAgIHByaXZhdGUgX3BhdXNlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgLy/lhajlsYDmlbDmja7vvIjmlbDmja7lupPnsbvlrozmiJDlkI7lsIbooqvmm7/ku6PvvIlcclxuICAgIHB1YmxpYyBzdGF0aWMgZnJhbWVMZW5ndGg6IG51bWJlciA9IDIwOy8v5bin6ZW/5bqmXHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHt1aX0gZnJvbSBcIi4uL3VpL2xheWFNYXhVSVwiXHJcblxyXG5cclxuLy9UT1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkaW5nIGV4dGVuZHMgdWkuTG9hZGluZ1NjZW5lVUl7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKClcclxuICAgIH1cclxufSIsIi8qKlRoaXMgY2xhc3MgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgTGF5YUFpcklERSwgcGxlYXNlIGRvIG5vdCBtYWtlIGFueSBtb2RpZmljYXRpb25zLiAqL1xuaW1wb3J0IFZpZXc9TGF5YS5WaWV3O1xyXG5pbXBvcnQgRGlhbG9nPUxheWEuRGlhbG9nO1xyXG5pbXBvcnQgU2NlbmU9TGF5YS5TY2VuZTtcbnZhciBSRUc6IEZ1bmN0aW9uID0gTGF5YS5DbGFzc1V0aWxzLnJlZ0NsYXNzO1xuZXhwb3J0IG1vZHVsZSB1aSB7XHJcbiAgICBleHBvcnQgY2xhc3MgR2FtZVNjZW5lVUkgZXh0ZW5kcyBTY2VuZSB7XHJcblx0XHRwdWJsaWMgVUlTZXQ6TGF5YS5TcHJpdGU7XG5cdFx0cHVibGljIFNpZGVCYXI6TGF5YS5TcHJpdGU7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJHYW1lU2NlbmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkuR2FtZVNjZW5lVUlcIixHYW1lU2NlbmVVSSk7XHJcbiAgICBleHBvcnQgY2xhc3MgTG9hZGluZ1NjZW5lVUkgZXh0ZW5kcyBTY2VuZSB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkxvYWRpbmdTY2VuZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS5Mb2FkaW5nU2NlbmVVSVwiLExvYWRpbmdTY2VuZVVJKTtcclxufVxyIl19
