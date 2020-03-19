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
//////
var EventCentre = /** @class */ (function () {
    function EventCentre() {
        this._centre = new Laya.EventDispatcher();
    }
    EventCentre.init = function () {
        EventCentre.instance = new EventCentre();
        EventCentre.EType = new EType();
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
    /**
     * LEAVE事件
     * 参数：e:Actor
     *
     * ENTRE事件
     * 参数：e:Actor
     *
     * ATTACK事件
     * 参数：from:Actor, to:Actor
     *
     * ENEMY_DEAD事件
     * 参数: e:Enemy
     *
     * Oprt_DEAD事件
     * 参数: e:Oprt
     */
    EType.prototype.总之我先放一个函数在这里 = function () { };
    EType.prototype.LEAVE = function (pos, identity) {
        return identity + ":COLLISION_EVENT_LEAVE_FROM(" + pos.x + "|" + pos.y + ")";
    };
    EType.prototype.ENTRE = function (pos, identity) {
        return identity + ":COLLISION_EVENT_ENTRE_TO(" + pos.x + "|" + pos.y + ")";
    };
    Object.defineProperty(EType.prototype, "ATTACK", {
        get: function () {
            return "ATTACK";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EType.prototype, "ENEMY_DEAD", {
        get: function () {
            return "ENEMY_DEAD";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EType.prototype, "OPRT_DEAD", {
        get: function () {
            return "OPRT_DEAD";
        },
        enumerable: true,
        configurable: true
    });
    return EType;
}());
},{}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
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
},{"./SceneScript/Game":36,"./SceneScript/Loading":37}],8:[function(require,module,exports){
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
},{"../../Common/DodKey":2,"../../Fix/FixSymbol":5,"./ActorModules/ActorBuffMgr":10,"./ActorModules/ActorCost":11,"./ActorModules/ActorSkill":12,"./ActorModules/Animation":13,"./ActorModules/Profile":15,"./ActorModules/Transform":16,"./ActorModules/UnitRender":17,"./ActorRoute":18,"./Attack/AtkAbst":19,"./Attack/Blocker":20,"./State/ActorStateFsm":21}],9:[function(require,module,exports){
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
},{"./Actor":8}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActorBuffMgr = /** @class */ (function () {
    function ActorBuffMgr(keeper, res) {
    }
    return ActorBuffMgr;
}());
exports.ActorBuffMgr = ActorBuffMgr;
},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActorCost = /** @class */ (function () {
    function ActorCost(keeper) {
    }
    return ActorCost;
}());
exports.ActorCost = ActorCost;
},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActorSkill = /** @class */ (function () {
    function ActorSkill(keeper, res) {
    }
    return ActorSkill;
}());
exports.ActorSkill = ActorSkill;
},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Animation = /** @class */ (function () {
    function Animation(keeper, res) {
    }
    return Animation;
}());
exports.Animation = Animation;
},{}],14:[function(require,module,exports){
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
},{}],15:[function(require,module,exports){
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
},{"./Damage":14}],16:[function(require,module,exports){
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
},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UnitRender = /** @class */ (function () {
    function UnitRender(keeper) {
    }
    return UnitRender;
}());
exports.UnitRender = UnitRender;
},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Route = /** @class */ (function () {
    function Route(keeper, res) {
    }
    return Route;
}());
exports.default = Route;
},{}],19:[function(require,module,exports){
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
},{"../../../Common/DodDataStructure":1}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Blocker = /** @class */ (function () {
    function Blocker(keeper) {
    }
    return Blocker;
}());
exports.Blocker = Blocker;
},{}],21:[function(require,module,exports){
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
},{"../../../Common/DodLog":3}],22:[function(require,module,exports){
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
},{"../../Fix/FixSymbol":5}],23:[function(require,module,exports){
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
},{"../Resources/DodResourceMgr":34,"./Actor/ActorMgr":9,"./Collision/ActorCollisionProcessor":22,"./GameLevel":25}],24:[function(require,module,exports){
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
},{}],25:[function(require,module,exports){
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
},{"../Fix/FixTime":6,"./GameBattleConst":24}],26:[function(require,module,exports){
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
},{"../Common/DodLog":3,"./GameBattle":23,"./State/GameStateMgr":32}],27:[function(require,module,exports){
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
},{}],28:[function(require,module,exports){
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
},{"./GameStateBase":27}],29:[function(require,module,exports){
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
},{"../../Common/DodLog":3,"../../Resources/DodResourceMgr":34,"../RhodesGame":26,"./GameStateBase":27,"./GameStateMgr":32}],30:[function(require,module,exports){
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
},{"../../Common/DodLog":3,"../../Resources/DodResourceMgr":34,"../RhodesGame":26,"./GameStateBase":27,"./GameStateMgr":32}],31:[function(require,module,exports){
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
},{"./GameStateBase":27}],32:[function(require,module,exports){
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
},{"../../Common/DodLog":3,"./GameStateBattle":28,"./GameStateGameload":29,"./GameStateLevelload":30,"./GameStateLobby":31}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameConfig_1 = require("./GameConfig");
var SceneManager_1 = require("./SceneManager");
var FixTime_1 = require("./Fix/FixTime");
var RhodesGame_1 = require("./Game/RhodesGame");
var EventCentre_1 = require("./Event/EventCentre");
var DodResourceMgr_1 = require("./Resources/DodResourceMgr");
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
        // Laya.Scene.open("GameScene");
        // if (1==1){
        // 	return;
        // }
        //Resources Related Module Awake
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
},{"./Event/EventCentre":4,"./Fix/FixTime":6,"./Game/RhodesGame":26,"./GameConfig":7,"./Resources/DodResourceMgr":34,"./SceneManager":35}],34:[function(require,module,exports){
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
},{}],35:[function(require,module,exports){
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
},{}],36:[function(require,module,exports){
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
},{"../ui/layaMaxUI":38}],37:[function(require,module,exports){
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
},{"../ui/layaMaxUI":38}],38:[function(require,module,exports){
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
},{}]},{},[33])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xheWEvTGF5YUFpcklERS9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQ29tbW9uL0RvZERhdGFTdHJ1Y3R1cmUudHMiLCJzcmMvQ29tbW9uL0RvZEtleS50cyIsInNyYy9Db21tb24vRG9kTG9nLnRzIiwic3JjL0V2ZW50L0V2ZW50Q2VudHJlLnRzIiwic3JjL0ZpeC9GaXhTeW1ib2wudHMiLCJzcmMvRml4L0ZpeFRpbWUudHMiLCJzcmMvR2FtZUNvbmZpZy50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yLnRzIiwic3JjL0dhbWUvQWN0b3IvQWN0b3JNZ3IudHMiLCJzcmMvR2FtZS9BY3Rvci9BY3Rvck1vZHVsZXMvQWN0b3JCdWZmTWdyLnRzIiwic3JjL0dhbWUvQWN0b3IvQWN0b3JNb2R1bGVzL0FjdG9yQ29zdC50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yTW9kdWxlcy9BY3RvclNraWxsLnRzIiwic3JjL0dhbWUvQWN0b3IvQWN0b3JNb2R1bGVzL0FuaW1hdGlvbi50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yTW9kdWxlcy9EYW1hZ2UudHMiLCJzcmMvR2FtZS9BY3Rvci9BY3Rvck1vZHVsZXMvUHJvZmlsZS50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yTW9kdWxlcy9UcmFuc2Zvcm0udHMiLCJzcmMvR2FtZS9BY3Rvci9BY3Rvck1vZHVsZXMvVW5pdFJlbmRlci50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yUm91dGUudHMiLCJzcmMvR2FtZS9BY3Rvci9BdHRhY2svQXRrQWJzdC50cyIsInNyYy9HYW1lL0FjdG9yL0F0dGFjay9CbG9ja2VyLnRzIiwic3JjL0dhbWUvQWN0b3IvU3RhdGUvQWN0b3JTdGF0ZUZzbS50cyIsInNyYy9HYW1lL0NvbGxpc2lvbi9BY3RvckNvbGxpc2lvblByb2Nlc3Nvci50cyIsInNyYy9HYW1lL0dhbWVCYXR0bGUudHMiLCJzcmMvR2FtZS9HYW1lQmF0dGxlQ29uc3QudHMiLCJzcmMvR2FtZS9HYW1lTGV2ZWwudHMiLCJzcmMvR2FtZS9SaG9kZXNHYW1lLnRzIiwic3JjL0dhbWUvU3RhdGUvR2FtZVN0YXRlQmFzZS50cyIsInNyYy9HYW1lL1N0YXRlL0dhbWVTdGF0ZUJhdHRsZS50cyIsInNyYy9HYW1lL1N0YXRlL0dhbWVTdGF0ZUdhbWVsb2FkLnRzIiwic3JjL0dhbWUvU3RhdGUvR2FtZVN0YXRlTGV2ZWxsb2FkLnRzIiwic3JjL0dhbWUvU3RhdGUvR2FtZVN0YXRlTG9iYnkudHMiLCJzcmMvR2FtZS9TdGF0ZS9HYW1lU3RhdGVNZ3IudHMiLCJzcmMvTWFpbi50cyIsInNyYy9SZXNvdXJjZXMvRG9kUmVzb3VyY2VNZ3IudHMiLCJzcmMvU2NlbmVNYW5hZ2VyLnRzIiwic3JjL1NjZW5lU2NyaXB0L0dhbWUudHMiLCJzcmMvU2NlbmVTY3JpcHQvTG9hZGluZy50cyIsInNyYy91aS9sYXlhTWF4VUkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDTkE7SUFBQTtRQUNZLFVBQUssR0FBTyxFQUFFLENBQUM7SUFhM0IsQ0FBQztJQVpVLHFCQUFJLEdBQVgsVUFBWSxHQUFVLEVBQUUsS0FBTztRQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUM1QixDQUFDO0lBQ00scUJBQUksR0FBWCxVQUFZLEdBQVU7UUFDbEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFTSx3QkFBTyxHQUFkLFVBQWUsQ0FBc0I7UUFDakMsS0FBSyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ3RCLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3ZCO0lBQ0wsQ0FBQztJQUNMLGFBQUM7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RCxHQUFHLENBQUMsZ0JBQWdCLEVBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEM7UUFBb0Msa0NBQUs7UUFDckM7bUJBQWUsaUJBQU87UUFBQSxDQUFDO1FBQ3ZCLHVDQUFjLEdBQWQ7WUFDSSxpQkFBTSxjQUFjLFdBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFDTCxxQkFBQztJQUFELENBTkEsQUFNQyxDQU5tQyxLQUFLLEdBTXhDO0lBTlksaUJBQWMsaUJBTTFCLENBQUE7SUFDRCxHQUFHLENBQUMsbUJBQW1CLEVBQUMsY0FBYyxDQUFDLENBQUM7QUFDNUMsQ0FBQyxFQW5CYSxFQUFFLEdBQUYsVUFBRSxLQUFGLFVBQUUsUUFtQmYiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG4oZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHsgQ29tcGFyYWJsZSB9IGZyb20gXCIuL0RvZE1hdGhcIjtcclxuXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEtWUGFpcjxWPntcclxuICAgIHByaXZhdGUgX2xpc3Q6YW55ID0ge307XHJcbiAgICBwdWJsaWMgZWRpdChrZXk6c3RyaW5nLCB2YWx1ZTpWKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX2xpc3Rba2V5XSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHJlYWQoa2V5OnN0cmluZyk6VntcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGlzdFtrZXldO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgaXRlcmF0ZShmOihrOnN0cmluZyx2OlYpPT52b2lkKTp2b2lke1xyXG4gICAgICAgIGZvciAobGV0IGsgaW4gdGhpcy5fbGlzdCkge1xyXG4gICAgICAgICAgICBmKGssIHRoaXMuX2xpc3Rba10pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbmNsYXNzIE5vZGU8RT57XHJcbiAgICBwdWJsaWMgaXRlbTpFO1xyXG4gICAgcHVibGljIG5leHQ6Tm9kZTxFPjtcclxuICAgIGNvbnN0cnVjdG9yKGl0ZW06RSwgbmV4dDpOb2RlPEU+KXtcclxuICAgICAgICB0aGlzLml0ZW0gPSBpdGVtO1xyXG4gICAgICAgIHRoaXMubmV4dCA9IG5leHQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBMaW5rTGlzdDxFPntcclxuICAgIHByaXZhdGUgX2hlYWQ6Tm9kZTxFPjtcclxuICAgIHByaXZhdGUgX3RhaWw6Tm9kZTxFPjtcclxuICAgIHByaXZhdGUgX2xlbmd0aDpudW1iZXIgPSAwO1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLl9oZWFkID0gbmV3IE5vZGU8RT4obnVsbCwgbnVsbCk7XHJcbiAgICAgICAgdGhpcy5fdGFpbCA9IG5ldyBOb2RlPEU+KG51bGwsIG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Z+656GA5bGe5oCnXHJcbiAgICBwdWJsaWMgZ2V0IGxlbmd0aCgpOm51bWJlcntcclxuICAgICAgICAvLyBsZXQgcmVzdWx0Om51bWJlciA9IDA7XHJcbiAgICAgICAgLy8gbGV0IGN1cnJlbnQ6Tm9kZTxFPiA9IHRoaXMuX2hlYWQ7XHJcbiAgICAgICAgLy8gd2hpbGUgKGN1cnJlbnQubmV4dCAhPT0gbnVsbCkge1xyXG4gICAgICAgIC8vICAgICByZXN1bHQgKz0gMTtcclxuICAgICAgICAvLyAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaXNFbXB0eSgpOmJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hlYWQubmV4dCA9PT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvL+WinuWIoOaUueafpVxyXG4gICAgLy/lop5cclxuICAgIHB1YmxpYyBwdXNoKGl0ZW06RSk6dm9pZHtcclxuICAgICAgICBsZXQgbGFzdDpOb2RlPEU+ID0gbmV3IE5vZGU8RT4oaXRlbSwgbnVsbCk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbXB0eSkge1xyXG4gICAgICAgICAgICB0aGlzLl9oZWFkLm5leHQgPSBsYXN0O1xyXG4gICAgICAgICAgICB0aGlzLl90YWlsLm5leHQgPSBsYXN0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RhaWwubmV4dC5uZXh0ID0gbGFzdDtcclxuICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0ID0gbGFzdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbGVuZ3RoICs9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVuc2hpZnQoaXRlbTpFKTp2b2lke1xyXG4gICAgICAgIGxldCBmaXJzdDpOb2RlPEU+ID0gbmV3IE5vZGU8RT4oaXRlbSwgbnVsbCk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbXB0eSkge1xyXG4gICAgICAgICAgICB0aGlzLl90YWlsLm5leHQgPSBmaXJzdDtcclxuICAgICAgICAgICAgdGhpcy5faGVhZC5uZXh0ID0gZmlyc3Q7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZmlyc3QubmV4dCA9IHRoaXMuX2hlYWQubmV4dDtcclxuICAgICAgICAgICAgdGhpcy5faGVhZC5uZXh0ID0gZmlyc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2xlbmd0aCArPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbnNlcnQoaW5kZXg6bnVtYmVyLCBpdGVtOkUpOmJvb2xlYW57XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+IHRoaXMuX2xlbmd0aCkgey8v6L+Z5Y+l5LiN5LiA5qC3XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpbmRleCA9PT0gdGhpcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjdXJyZW50Ok5vZGU8RT4gPSB0aGlzLl9oZWFkOy8v6L+Z5Y+l5ZKM5YW25LuW6YGN5Y6G5piv5LiN5LiA5qC355qE77yM5Zug5Li66KaB6YCJ5Y+W5Yiw6YCJ5a6a5L2N572u55qE5YmN6Z2i5LiA5qC8XHJcbiAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBpbmRleDsgbiArPSAxKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjdXJyZW50Lm5leHQgPSBuZXcgTm9kZTxFPihpdGVtLCBjdXJyZW50Lm5leHQpO1xyXG4gICAgICAgIHRoaXMuX2xlbmd0aCArPSAxO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIoFxyXG4gICAgcHVibGljIHJlbW92ZShpbmRleDpudW1iZXIpOkV7XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjdXJyZW50Ok5vZGU8RT4gPSB0aGlzLl9oZWFkLm5leHQ7XHJcbiAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBpbmRleDsgbiArPSAxKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaXRlbTpFID0gY3VycmVudC5pdGVtO1xyXG4gICAgICAgIGN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2xlbmd0aCAtPSAxO1xyXG5cclxuICAgICAgICByZXR1cm4gY3VycmVudC5pdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaGlmdCgpOkV7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbXB0eSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBpdGVtID0gdGhpcy5faGVhZC5uZXh0Lml0ZW07XHJcbiAgICAgICAgdGhpcy5faGVhZC5uZXh0ID0gdGhpcy5faGVhZC5uZXh0Lm5leHQ7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzRW1wdHkpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0ID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2xlbmd0aCAtPSAxO1xyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pS5XHJcbiAgICBwdWJsaWMgd3JpdGUoaW5kZXg6bnVtYmVyLCBpdGVtOkUpOnZvaWR7XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY3VycmVudDpOb2RlPEU+ID0gdGhpcy5faGVhZC5uZXh0O1xyXG4gICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgaW5kZXg7IG4gKz0gMSkge1xyXG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3VycmVudC5pdGVtID0gaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICAvL+afpVxyXG4gICAgcHVibGljIHJlYWQoaW5kZXg6bnVtYmVyKTpFe1xyXG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGN1cnJlbnQ6Tm9kZTxFPiA9IHRoaXMuX2hlYWQubmV4dDtcclxuICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IGluZGV4OyBuICs9IDEpIHtcclxuICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjdXJyZW50Lml0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlYXJjaChpdGVtOkUpOm51bWJlcltde1xyXG4gICAgICAgIGxldCByZXN1bHQ6bnVtYmVyW10gPSBbXTtcclxuICAgICAgICB0aGlzLmZvcmVhY2goKGVsZTpFLCBpbmRleDpudW1iZXIpPT57XHJcbiAgICAgICAgICAgIGlmIChlbGUgPT09IGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3pk77ooajkuK3mmK/lkKblrZjlnKjmn5DkuIDlhYPntKBcclxuICAgICAqIEBwYXJhbSBpdGVtIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaGFzKGl0ZW06IEUpOmJvb2xlYW57XHJcblxyXG4gICAgICAgIGxldCBjdXJyZW50ID0gdGhpcy5faGVhZC5uZXh0O1xyXG4gICAgICAgIHdoaWxlIChjdXJyZW50ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnQuaXRlbSA9PSBpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6auY6Zi25Ye95pWwXHJcbiAgICBwdWJsaWMgZm9yZWFjaChmOihlbGU6RSwgaW5kZXg6bnVtYmVyLCBsaXN0OkxpbmtMaXN0PEU+KT0+dm9pZCk6dm9pZHtcclxuICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMuX2hlYWQubmV4dDtcclxuICAgICAgICBsZXQgbnVtOm51bWJlciA9IDA7XHJcbiAgICAgICAgd2hpbGUgKGN1cnJlbnQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgZihjdXJyZW50Lml0ZW0sIG51bSwgdGhpcyk7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbiAgICAgICAgICAgIG51bSArPSAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOivt+aaguaXtuS4jeimgeS9v+eUqOi/meS4quWHveaVsO+8jOWboOS4uuaIkeS5n+S4jeefpemBk+Wug+S8muS4jeS8mueIhueCuFxyXG4gICAgICog6Zmk6Z2e5L2g6K+76L+H6L+Z5Liq5Ye95pWw55qE5rqQ5Luj56CBXHJcbiAgICAgKiBAcGFyYW0gZiDliKTmlq3lhYPntKDkvJjlhYjnuqfnmoTlm57osIPlh73mlbBcclxuICAgICAqIEBwYXJhbSBpbmNyZWFzZSDmmK/lkKbljYfluo/vvIzpu5jorqTljYfluo9cclxuICAgICAqIEByZXR1cm5zIOi/lOWbnuS4gOS4quaOkuW6j+eahOmTvuihqFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc29ydGJ5KGY6KGVsZTpFKT0+bnVtYmVyLCBpbmNyZWFzZTpib29sZWFuID0gdHJ1ZSk6TGlua0xpc3Q8RT57XHJcbiAgICAgICAgbGV0IHByaW9yaXR5OkxpbmtMaXN0PG51bWJlcj4gPSBuZXcgTGlua0xpc3Q8bnVtYmVyPigpO1xyXG4gICAgICAgIGxldCBzb3J0ZWQ6TGlua0xpc3Q8RT4gPSBuZXcgTGlua0xpc3Q8RT4oKTtcclxuICAgICAgICBwcmlvcml0eS5wdXNoKC0wKTtcclxuICAgICAgICBzb3J0ZWQucHVzaChudWxsKTtcclxuXHJcbiAgICAgICAgbGV0IGNvbXBhcmU6KGE6bnVtYmVyLGI6bnVtYmVyKT0+Ym9vbGVhbiA9IGluY3JlYXNlPyhhLGIpPT57cmV0dXJuIGEgPCBiO306KGEsYik9PntyZXR1cm4gYSA+IGJ9O1xyXG5cclxuICAgICAgICB0aGlzLmZvcmVhY2goKGVsZSk9PntcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRQcmkgPSBmKGVsZSk7XHJcbiAgICAgICAgICAgIGxldCBub2RlOk5vZGU8RT4gPSBzb3J0ZWQuX2hlYWQubmV4dDtcclxuICAgICAgICAgICAgbGV0IHByaU5vZGU6Tm9kZTxudW1iZXI+ID0gcHJpb3JpdHkuX2hlYWQubmV4dDtcclxuXHJcbiAgICAgICAgICAgIGxldCBmb3VuZFBsYWNlOmJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgd2hpbGUgKG5vZGUubmV4dCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgKGN1cnJlbnRQcmkgPCBwcmlOb2RlLm5leHQuaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBhcmUoY3VycmVudFByaSwgcHJpTm9kZS5uZXh0Lml0ZW0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5uZXh0ID0gbmV3IE5vZGU8RT4oZWxlLCBub2RlLm5leHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHByaU5vZGUubmV4dCA9IG5ldyBOb2RlPG51bWJlcj4oY3VycmVudFByaSwgcHJpTm9kZS5uZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICBmb3VuZFBsYWNlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5uZXh0O1xyXG4gICAgICAgICAgICAgICAgcHJpTm9kZSA9IHByaU5vZGUubmV4dDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFmb3VuZFBsYWNlKSB7XHJcbiAgICAgICAgICAgICAgICBzb3J0ZWQucHVzaChlbGUpO1xyXG4gICAgICAgICAgICAgICAgcHJpb3JpdHkucHVzaChjdXJyZW50UHJpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzb3J0ZWQuc2hpZnQoKTtcclxuICAgICAgICByZXR1cm4gc29ydGVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHB1YmxpYyBiYlNvcnRCeShmOihlbGU6RSk9Pm51bWJlciwgaW5jcmVhc2U6Ym9vbGVhbiA9IHRydWUpOkxpbmtMaXN0PEU+e1xyXG5cclxuICAgIC8vIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQQXJyYXk8RT57XHJcbiAgICBwdWJsaWMgYXJyOkVbXTtcclxuICAgIHB1YmxpYyBwb2ludGVyOm51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2U6RVtdID0gW10sIGluaXRQb2ludDpudW1iZXIgPSAtMSl7XHJcbiAgICAgICAgdGhpcy5hcnIgPSBzb3VyY2U7XHJcbiAgICAgICAgdGhpcy5wb2ludGVyID0gaW5pdFBvaW50O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWFkKCk6RXtcclxuICAgICAgICByZXR1cm4gdGhpcy5hcnJbdGhpcy5wb2ludGVyXTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIHN0ZXAoKTp2b2lke1xyXG4gICAgICAgIHRoaXMucG9pbnRlciArPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgb3V0KCk6Ym9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5wb2ludGVyIDwgMCB8fCB0aGlzLnBvaW50ZXIgPj0gdGhpcy5hcnIubGVuZ3RoO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBBcnJheUFsZ297XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDovpPlhaXnmoTkuKTkuKrmlbDnu4TnmoTmr4/kuKppbmRleOWvueW6lOWFg+e0oOaYr+WQpuebuOetiVxyXG4gICAgICogQHBhcmFtIGFycjAgXHJcbiAgICAgKiBAcGFyYW0gYXJyMSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzdHJpY3RDb21wYXJlKGFycjA6Q29tcGFyYWJsZVtdLCBhcnIxOkNvbXBhcmFibGVbXSk6Ym9vbGVhbntcclxuICAgICAgICBpZiAoYXJyMC5sZW5ndGggIT09IGFycjEubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIwLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgIGlmICghYXJyMFtpXS5lcXVhbHMoYXJyMVtpXSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57kuIDkuKrpm4blkIhj77yM5LiU5L2/5b6X5a6D5YW35pyJ5aaC5LiL5oCn6LSo77yaXHJcbiAgICAgKiDlr7nkuo7mr4/kuKrlrZjlnKjkuo7pm4blkIhh5Lit55qE5YWD57Sg77yM5aaC5p6c5a6D5LiN5Zyo6ZuG5ZCIYuS4re+8jOWImeWug+WcqOmbhuWQiGPkuK1cclxuICAgICAqIOWNs2M9YS1iXHJcbiAgICAgKiBAcGFyYW0gYSBcclxuICAgICAqIEBwYXJhbSBiIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGZpbmRDb21wbGVtZW50U2V0KGE6Q29tcGFyYWJsZVtdLCBiOkNvbXBhcmFibGVbXSk6Q29tcGFyYWJsZVtde1xyXG4gICAgICAgIGxldCByZXN1bHQ6Q29tcGFyYWJsZVtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgZWxlIG9mIGEpIHtcclxuICAgICAgICAgICAgaWYgKEFycmF5QWxnby5maW5kRWxlKGVsZSwgYikgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChlbGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvL+axguebuOWvueihpembhmEtYlxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBmaW5kSW50ZXJzZWN0aW9uU2V0KGE6Q29tcGFyYWJsZVtdLCBiOkNvbXBhcmFibGVbXSl7XHJcbiAgICAgICAgLy/msYLkuqTpm4Zh4oipYlxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5rGCZWxl5ZyoYXJy5Lit55qEaW5kZXjvvIzoi6XmnKrmib7liLDliJnov5Tlm54tMVxyXG4gICAgICogZWxl5b+F6aG75a6e546wY29tcGFyYWJsZeaOpeWPo1xyXG4gICAgICogQHBhcmFtIGVsZSBcclxuICAgICAqIEBwYXJhbSBhcnIgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZmluZEVsZShlbGU6Q29tcGFyYWJsZSwgYXJyOkNvbXBhcmFibGVbXSk6bnVtYmVye1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgIGlmIChlbGUuZXF1YWxzKGFycltpXSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS7jmFycuS4reenu+mZpGVsZVxyXG4gICAgICog5aaC5p6cZWxl5LiN5a2Y5Zyo5YiZ5LuA5LmI6YO95LiN5YGaXHJcbiAgICAgKiBAcGFyYW0gZWxlIFxyXG4gICAgICogQHBhcmFtIGFyciBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByZW1vdmVFbGUoZWxlOmFueSwgYXJyOmFueVtdKTphbnlbXXtcclxuICAgICAgICBjb25zdCBpID0gYXJyLmluZGV4T2YoZWxlKTtcclxuICAgICAgICBpZiAoaSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgYXJyLnNwbGljZShpLDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG4vLyBleHBvcnQgY2xhc3MgQm94IGV4dGVuZHMgTGF5YS5SZWN0YW5nbGV7XHJcblxyXG4vLyAgICAgcHVibGljIHVuaXRYOm51bWJlcjtcclxuLy8gICAgIHB1YmxpYyB1bml0WTpudW1iZXI7XHJcbiAgICBcclxuXHJcbi8vICAgICBjb25zdHJ1Y3Rvcigpe1xyXG4vLyAgICAgICAgIHN1cGVyKDAsMCwwLDApO1xyXG4vLyAgICAgfVxyXG4gICBcclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOWwseaYr+KApuKApuadpeS4gOe7hO+8iDEwMOS4qu+8iemaj+acuueahOeisOaSnueusVxyXG4vLyAgICAgICogQHBhcmFtIHhSYW5nZSBcclxuLy8gICAgICAqIEBwYXJhbSB5UmFuZ2UgXHJcbi8vICAgICAgKiBAcGFyYW0gd2lkUmFuZ2UgXHJcbi8vICAgICAgKiBAcGFyYW0gaGlnUmFuZ2VcclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHVibGljIHN0YXRpYyByYW5kb21Cb3hlcyh4UmFuZ2U6bnVtYmVyID0gMTIwMCwgeVJhbmdlOm51bWJlciA9IDgwMCwgd2lkUmFuZ2U6bnVtYmVyID0gMzAwLCBoaWdSYW5nZTpudW1iZXIgPSAzMDApOkJveFtde1xyXG4vLyAgICAgICAgIGNvbnN0IHJhZDpGdW5jdGlvbiA9IE15TWF0aC5yYW5kb21JbnQ7XHJcbi8vICAgICAgICAgbGV0IHJlc3VsdDpCb3hbXSA9IFtdO1xyXG4vLyAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCA1MDsgaSArPSAxKSB7XHJcbi8vICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBCb3goKSk7XHJcbi8vICAgICAgICAgICAgIHJlc3VsdFtpXS5wb3MocmFkKHhSYW5nZSksIHJhZCh5UmFuZ2UpKS5zaXplKHJhZCh3aWRSYW5nZSksIHJhZChoaWdSYW5nZSkpO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIHB1YmxpYyBwb3MoeDpudW1iZXIsIHk6bnVtYmVyKTpCb3h7XHJcbi8vICAgICAgICAgdGhpcy54ID0geDtcclxuLy8gICAgICAgICB0aGlzLnkgPSB5O1xyXG4vLyAgICAgICAgIHJldHVybiB0aGlzO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIHB1YmxpYyBzaXplKHdpZHRoOm51bWJlciwgaGVpZ2h0Om51bWJlcik6Qm94e1xyXG4vLyAgICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuLy8gICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuLy8gICAgICAgICByZXR1cm4gdGhpcztcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBwdWJsaWMgaW50ZXJzZWN0c19YKHJlYzpCb3gpOmJvb2xlYW57XHJcbi8vICAgICAgICAgaWYgKHRoaXMueCA8IHJlYy54KSB7XHJcbi8vICAgICAgICAgICAgIHJldHVybiByZWMuaW50ZXJzZWN0c19YKHRoaXMpO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICByZXR1cm4gICh0aGlzLnggPj0gcmVjLnggJiYgdGhpcy54IDw9IHJlYy5yaWdodCkgfHxcclxuLy8gICAgICAgICAgICAgICAgICh0aGlzLnJpZ2h0ID49IHJlYy54ICYmIHRoaXMucmlnaHQgPD0gcmVjLnJpZ2h0KVxyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIHB1YmxpYyBpbnRlcnNlY3RzX1kocmVjOkJveCk6Ym9vbGVhbntcclxuLy8gICAgICAgICBpZiAodGhpcy55PHJlYy55KSB7XHJcbi8vICAgICAgICAgICAgIHJldHVybiByZWMuaW50ZXJzZWN0c19ZKHRoaXMpO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICByZXR1cm4gICh0aGlzLnkgPj0gcmVjLnkgJiYgdGhpcy55IDw9IHJlYy5ib3R0b20pIHx8XHJcbi8vICAgICAgICAgICAgICAgICAodGhpcy5ib3R0b20gPj0gcmVjLnkgJiYgdGhpcy5ib3R0b20gPD0gcmVjLmJvdHRvbSlcclxuLy8gICAgIH1cclxuLy8gfVxyXG4gICAgXHJcbi8vIGNsYXNzIE1hcE5vZGU8SyxWPntcclxuLy8gICAgIHB1YmxpYyBrZXk7XHJcbi8vICAgICBwdWJsaWMgdmFsdWU7XHJcbi8vICAgICBjb25zdHJ1Y3RvcihrZXk6SywgdmFsdWU6Vil7XHJcbi8vICAgICAgICAgdGhpcy5rZXkgPSBrZXk7XHJcbi8vICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4vLyAgICAgfVxyXG4vLyB9XHJcblxyXG4vLyBleHBvcnQgbW9kdWxlIFN0cnVje1xyXG4vLyAgICAgZXhwb3J0IGNsYXNzIExpbmtMaXN0PEU+e1xyXG4vLyAgICAgICAgIHByaXZhdGUgX2hlYWQ6Tm9kZTxFPjtcclxuLy8gICAgICAgICBwcml2YXRlIF90YWlsOk5vZGU8RT47XHJcbi8vICAgICAgICAgY29uc3RydWN0b3IoKXtcclxuLy8gICAgICAgICAgICAgdGhpcy5faGVhZCA9IG5ldyBOb2RlPEU+KG51bGwsIG51bGwpO1xyXG4vLyAgICAgICAgICAgICB0aGlzLl90YWlsID0gbmV3IE5vZGU8RT4obnVsbCwgbnVsbCk7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvL+WfuuehgOWxnuaAp1xyXG4vLyAgICAgICAgIHB1YmxpYyBnZXQgbGVuZ3RoKCk6bnVtYmVye1xyXG4vLyAgICAgICAgICAgICBsZXQgcmVzdWx0Om51bWJlciA9IDA7XHJcbi8vICAgICAgICAgICAgIGxldCBjdXJyZW50Ok5vZGU8RT4gPSB0aGlzLl9oZWFkO1xyXG4vLyAgICAgICAgICAgICB3aGlsZSAoY3VycmVudC5uZXh0ICE9PSBudWxsKSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXN1bHQgKz0gMTtcclxuLy8gICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIHB1YmxpYyBnZXQgaXNFbXB0eSgpOmJvb2xlYW57XHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLl9oZWFkLm5leHQgPT09IG51bGw7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvL+WinuWIoOaUueafpVxyXG4vLyAgICAgICAgIC8v5aKeXHJcbi8vICAgICAgICAgcHVibGljIHB1c2goaXRlbTpFKTp2b2lke1xyXG4vLyAgICAgICAgICAgICBsZXQgbGFzdDpOb2RlPEU+ID0gbmV3IE5vZGU8RT4oaXRlbSwgbnVsbCk7XHJcbi8vICAgICAgICAgICAgIGlmICh0aGlzLmlzRW1wdHkpIHtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuX2hlYWQubmV4dCA9IGxhc3Q7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLl90YWlsLm5leHQgPSBsYXN0O1xyXG4vLyAgICAgICAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0Lm5leHQgPSBsYXN0O1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0ID0gbGFzdDtcclxuLy8gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIHB1YmxpYyB1bnNoaWZ0KGl0ZW06RSk6dm9pZHtcclxuLy8gICAgICAgICAgICAgbGV0IGZpcnN0Ok5vZGU8RT4gPSBuZXcgTm9kZTxFPihpdGVtLCBudWxsKTtcclxuLy8gICAgICAgICAgICAgaWYgKHRoaXMuaXNFbXB0eSkge1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0ID0gZmlyc3Q7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLl9oZWFkLm5leHQgPSBmaXJzdDtcclxuLy8gICAgICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgIGZpcnN0Lm5leHQgPSB0aGlzLl9oZWFkLm5leHQubmV4dDtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuX2hlYWQubmV4dCA9IGZpcnN0O1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBwdWJsaWMgaW5zZXJ0KGluZGV4Om51bWJlciwgaXRlbTpFKTpib29sZWFue1xyXG4vLyAgICAgICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID4gdGhpcy5sZW5ndGgpIHsvL+i/meWPpeS4jeS4gOagt1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBpZiAoaW5kZXggPT09IHRoaXMubGVuZ3RoKSB7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLnB1c2goaXRlbSk7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IGN1cnJlbnQ6Tm9kZTxFPiA9IHRoaXMuX2hlYWQ7Ly/ov5nlj6Xlkozlhbbku5bpgY3ljobmmK/kuI3kuIDmoLfnmoTvvIzlm6DkuLropoHpgInlj5bliLDpgInlrprkvY3nva7nmoTliY3pnaLkuIDmoLxcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBpbmRleDsgbiArPSAxKSB7XHJcbi8vICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBjdXJyZW50Lm5leHQgPSBuZXcgTm9kZTxFPihpdGVtLCBjdXJyZW50Lm5leHQpO1xyXG5cclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvL+WIoFxyXG4vLyAgICAgICAgIHB1YmxpYyByZW1vdmUoaW5kZXg6bnVtYmVyKTpFe1xyXG4vLyAgICAgICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMubGVuZ3RoKSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IGN1cnJlbnQ6Tm9kZTxFPiA9IHRoaXMuX2hlYWQubmV4dDtcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBpbmRleDsgbiArPSAxKSB7XHJcbi8vICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgaXRlbTpFID0gY3VycmVudC5pdGVtO1xyXG4vLyAgICAgICAgICAgICBjdXJyZW50ID0gbnVsbDtcclxuXHJcbi8vICAgICAgICAgICAgIHJldHVybiBjdXJyZW50Lml0ZW07XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBwdWJsaWMgc2hpZnQoKTpFe1xyXG4vLyAgICAgICAgICAgICBpZiAodGhpcy5pc0VtcHR5KSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLl9oZWFkLm5leHQuaXRlbTtcclxuLy8gICAgICAgICAgICAgdGhpcy5faGVhZC5uZXh0ID0gdGhpcy5faGVhZC5uZXh0Lm5leHQ7XHJcbi8vICAgICAgICAgICAgIGlmICh0aGlzLmlzRW1wdHkpIHtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuX3RhaWwubmV4dCA9IG51bGw7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvL+aUuVxyXG4vLyAgICAgICAgIHB1YmxpYyB3cml0ZShpbmRleDpudW1iZXIsIGl0ZW06RSk6dm9pZHtcclxuLy8gICAgICAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLmxlbmd0aCkge1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgY3VycmVudDpOb2RlPEU+ID0gdGhpcy5faGVhZC5uZXh0O1xyXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IGluZGV4OyBuICs9IDEpIHtcclxuLy8gICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIGN1cnJlbnQuaXRlbSA9IGl0ZW07XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvL+afpVxyXG4vLyAgICAgICAgIHB1YmxpYyByZWFkKGluZGV4Om51bWJlcik6RXtcclxuLy8gICAgICAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLmxlbmd0aCkge1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgY3VycmVudDpOb2RlPEU+ID0gdGhpcy5faGVhZC5uZXh0O1xyXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IGluZGV4OyBuICs9IDEpIHtcclxuLy8gICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIHJldHVybiBjdXJyZW50Lml0ZW07XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBwdWJsaWMgc2VhcmNoKGl0ZW06RSk6bnVtYmVyW117XHJcbi8vICAgICAgICAgICAgIGxldCByZXN1bHQ6bnVtYmVyW10gPSBbXTtcclxuLy8gICAgICAgICAgICAgdGhpcy5mb3JlYWNoKChlbGU6RSwgaW5kZXg6bnVtYmVyKT0+e1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKGVsZSA9PT0gaXRlbSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGluZGV4KTtcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfSk7XHJcbi8vICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvKipcclxuLy8gICAgICAgICAgKiDliKTmlq3pk77ooajkuK3mmK/lkKblrZjlnKjmn5DkuIDlhYPntKBcclxuLy8gICAgICAgICAgKiBAcGFyYW0gaXRlbSBcclxuLy8gICAgICAgICAgKi9cclxuLy8gICAgICAgICBwdWJsaWMgaGFzKGl0ZW06IEUpOmJvb2xlYW57XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMuX2hlYWQubmV4dDtcclxuLy8gICAgICAgICAgICAgd2hpbGUgKGN1cnJlbnQgIT0gbnVsbCkge1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQuaXRlbSA9PSBpdGVtKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvL+mrmOmYtuWHveaVsFxyXG4vLyAgICAgICAgIHB1YmxpYyBmb3JlYWNoKGY6KGVsZTpFLCBpbmRleDpudW1iZXIsIGxpc3Q6TGlua0xpc3Q8RT4pPT52b2lkKTp2b2lke1xyXG4vLyAgICAgICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMuX2hlYWQubmV4dDtcclxuLy8gICAgICAgICAgICAgbGV0IG51bTpudW1iZXIgPSAwO1xyXG4vLyAgICAgICAgICAgICB3aGlsZSAoY3VycmVudCAhPT0gbnVsbCkge1xyXG4vLyAgICAgICAgICAgICAgICAgZihjdXJyZW50Lml0ZW0sIG51bSwgdGhpcyk7XHJcbi8vICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4vLyAgICAgICAgICAgICAgICAgbnVtICs9IDE7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIC8qKlxyXG4vLyAgICAgICAgICAqIOivt+aaguaXtuS4jeimgeS9v+eUqOi/meS4quWHveaVsO+8jOWboOS4uuaIkeS5n+S4jeefpemBk+Wug+S8muS4jeS8mueIhueCuFxyXG4vLyAgICAgICAgICAqIOmZpOmdnuS9oOivu+i/h+i/meS4quWHveaVsOeahOa6kOS7o+eggVxyXG4vLyAgICAgICAgICAqIEBwYXJhbSBmIOWIpOaWreWFg+e0oOS8mOWFiOe6p+eahOWbnuiwg+WHveaVsFxyXG4vLyAgICAgICAgICAqIEBwYXJhbSBpbmNyZWFzZSDmmK/lkKbljYfluo/vvIzpu5jorqTljYfluo9cclxuLy8gICAgICAgICAgKiBAcmV0dXJucyDov5Tlm57kuIDkuKrmjpLluo/nmoTpk77ooahcclxuLy8gICAgICAgICAgKi9cclxuLy8gICAgICAgICBwdWJsaWMgc29ydGJ5KGY6KGVsZTpFKT0+bnVtYmVyLCBpbmNyZWFzZTpib29sZWFuID0gdHJ1ZSk6TGlua0xpc3Q8RT57XHJcbi8vICAgICAgICAgICAgIGxldCBwcmlvcml0eTpMaW5rTGlzdDxudW1iZXI+ID0gbmV3IExpbmtMaXN0PG51bWJlcj4oKTtcclxuLy8gICAgICAgICAgICAgbGV0IHNvcnRlZDpMaW5rTGlzdDxFPiA9IG5ldyBMaW5rTGlzdDxFPigpO1xyXG4vLyAgICAgICAgICAgICBwcmlvcml0eS5wdXNoKC0wKTtcclxuLy8gICAgICAgICAgICAgc29ydGVkLnB1c2gobnVsbCk7XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgY29tcGFyZTooYTpudW1iZXIsYjpudW1iZXIpPT5ib29sZWFuID0gaW5jcmVhc2U/KGEsYik9PntyZXR1cm4gYSA8IGI7fTooYSxiKT0+e3JldHVybiBhID4gYn07XHJcblxyXG4vLyAgICAgICAgICAgICB0aGlzLmZvcmVhY2goKGVsZSk9PntcclxuLy8gICAgICAgICAgICAgICAgIGxldCBjdXJyZW50UHJpID0gZihlbGUpO1xyXG4vLyAgICAgICAgICAgICAgICAgbGV0IG5vZGU6Tm9kZTxFPiA9IHNvcnRlZC5faGVhZC5uZXh0O1xyXG4vLyAgICAgICAgICAgICAgICAgbGV0IHByaU5vZGU6Tm9kZTxudW1iZXI+ID0gcHJpb3JpdHkuX2hlYWQubmV4dDtcclxuXHJcbi8vICAgICAgICAgICAgICAgICBsZXQgZm91bmRQbGFjZTpib29sZWFuID0gZmFsc2U7XHJcbi8vICAgICAgICAgICAgICAgICB3aGlsZSAobm9kZS5uZXh0ICE9PSBudWxsKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGN1cnJlbnRQcmkgPCBwcmlOb2RlLm5leHQuaXRlbSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIGlmIChjb21wYXJlKGN1cnJlbnRQcmksIHByaU5vZGUubmV4dC5pdGVtKSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLm5leHQgPSBuZXcgTm9kZTxFPihlbGUsIG5vZGUubmV4dCk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHByaU5vZGUubmV4dCA9IG5ldyBOb2RlPG51bWJlcj4oY3VycmVudFByaSwgcHJpTm9kZS5uZXh0KTtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgZm91bmRQbGFjZSA9IHRydWU7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IG5vZGUubmV4dDtcclxuLy8gICAgICAgICAgICAgICAgICAgICBwcmlOb2RlID0gcHJpTm9kZS5uZXh0O1xyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgICAgIGlmICghZm91bmRQbGFjZSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHNvcnRlZC5wdXNoKGVsZSk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcHJpb3JpdHkucHVzaChjdXJyZW50UHJpKTtcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfSk7XHJcblxyXG4vLyAgICAgICAgICAgICBzb3J0ZWQuc2hpZnQoKTtcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHNvcnRlZDtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIC8vIHB1YmxpYyBiYlNvcnRCeShmOihlbGU6RSk9Pm51bWJlciwgaW5jcmVhc2U6Ym9vbGVhbiA9IHRydWUpOkxpbmtMaXN0PEU+e1xyXG5cclxuLy8gICAgICAgICAvLyB9XHJcblxyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIGV4cG9ydCBjbGFzcyBNYXA8SyxWPntcclxuLy8gICAgICAgICBwcml2YXRlIF9saXN0OkFycmF5PE1hcE5vZGU8SyxWPj5cclxuLy8gICAgICAgICBjb25zdHJ1Y3Rvcigpe1xyXG4vLyAgICAgICAgICAgICB0aGlzLl9saXN0ID0gW11cclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcHVibGljIGdldChrZXk6Syk6VntcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgZWxlIG9mIHRoaXMuX2xpc3Qpe1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKGVsZS5rZXkgPT09IGtleSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGUudmFsdWVcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gbnVsbFxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBwdWJsaWMgZ2V0S2V5QnlWYWwodmFsOlYpOkt7XHJcbi8vICAgICAgICAgICAgIGZvciAobGV0IGVsZSBvZiB0aGlzLl9saXN0KSB7XHJcbi8vICAgICAgICAgICAgICAgICBpZiAoZWxlLnZhbHVlID09PSB2YWwpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlLmtleVxyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHJldHVybiBudWxsXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHB1YmxpYyBrZXlFeGlzdChrZXk6Syk6Ym9vbGVhbntcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgZWxlIG9mIHRoaXMuX2xpc3QpIHtcclxuLy8gICAgICAgICAgICAgICAgIGlmIChlbGUua2V5ID09PSBrZXkpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBwdWJsaWMgc2V0KGtleTpLLHZhbHVlOlYpOmJvb2xlYW57XHJcbi8vICAgICAgICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgdGhpcy5fbGlzdC5sZW5ndGg7IG4gKz0gMSkge1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xpc3Rbbl0ua2V5ID09PSBrZXkpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLl9saXN0W25dLnZhbHVlID0gdmFsdWVcclxuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgdGhpcy5fbGlzdC5wdXNoKG5ldyBNYXBOb2RlPEssVj4oa2V5LHZhbHVlKSlcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHB1YmxpYyBiYXRjaFNldChrZXlzOktbXSwgdmFsdWVzOlZbXSk6Ym9vbGVhbntcclxuLy8gICAgICAgICAgICAgaWYgKGtleXMubGVuZ3RoICE9PSB2YWx1ZXMubGVuZ3RoKSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBrZXlzLmxlbmd0aDsgbiArPSAxKSB7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLnNldChrZXlzW25dLCB2YWx1ZXNbbl0pO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG5cclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcHVibGljIHJlbW92ZShrZXk6Syk6Ym9vbGVhbntcclxuLy8gICAgICAgICAgICAgbGV0IGNvdW50Om51bWJlciA9IDA7XHJcbi8vICAgICAgICAgICAgIGZvciAobGV0IGVsZSBvZiB0aGlzLl9saXN0KSB7XHJcbi8vICAgICAgICAgICAgICAgICBpZiAoZWxlLmtleSA9PT0ga2V5KSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGlzdC5zcGxpY2UoY291bnQsMSk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIGNvdW50ICs9IDE7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHB1YmxpYyBnZXQgbGVuZ3RoKCk6bnVtYmVye1xyXG4vLyAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdC5sZW5ndGhcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcHVibGljIGZvcmVhY2goZjooazpLLCB2OlYpPT52b2lkKTp2b2lke1xyXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBlbGUgb2YgdGhpcy5fbGlzdCkge1xyXG4vLyAgICAgICAgICAgICAgICAgZihlbGUua2V5LCBlbGUudmFsdWUpO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHJldHVybjtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcHVibGljIGZpbHRlcihmOihrOkssdjpWKT0+Ym9vbGVhbik6TWFwPEssVj57XHJcbi8vICAgICAgICAgICAgIGxldCByZXN1bHQgPSBuZXcgTWFwPEssVj4oKTtcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgZWxlIG9mIHRoaXMuX2xpc3QpIHtcclxuLy8gICAgICAgICAgICAgICAgIGlmIChmKGVsZS5rZXksIGVsZS52YWx1ZSkpe1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zZXQoZWxlLmtleSwgZWxlLnZhbHVlKTtcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBleHBvcnQgY2xhc3MgUG9pbnRlckxpc3Q8RT57XHJcbi8vICAgICAgICAgcHJpdmF0ZSBfbGlzdDpBcnJheTxFPiA9IFtdO1xyXG4vLyAgICAgICAgIHByaXZhdGUgX3BvaW50ZXI6bnVtYmVyID0gMDtcclxuLy8gICAgICAgICBjb25zdHJ1Y3Rvcihzb3VyY2U6QXJyYXk8RT4gPSBbXSwgaW5pdFBvaW50Om51bWJlciA9IDApe1xyXG4vLyAgICAgICAgICAgICBzb3VyY2UuZm9yRWFjaCgoZWxlKT0+e1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5fbGlzdC5wdXNoKGVsZSk7XHJcbi8vICAgICAgICAgICAgIH0pXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBnZXQgZXhjZWVkaW5nKCk6Ym9vbGVhbntcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BvaW50ZXIgPj0gdGhpcy5fbGlzdC5sZW5ndGggfHwgdGhpcy5fcG9pbnRlciA8IDBcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIC8qXHJcbi8vICAgICAgICAg5Lul5LiL5rOo6YeK5Lit77yM5oqK5pWw57uE55yL5L2c5qiq5ZCR5o6S5YiX55qE5LiA57O75YiX5YWD57SgXHJcbi8vICAgICAgICAgaW5kZXggPSAw55qE5YWD57Sg5Zyo5pyA5bem5L6nXHJcbi8vICAgICAgICAgKi9cclxuXHJcbi8vICAgICAgICAgcmVhZCgpOkV7Ly/mn6XnnIvlvZPliY1wb2ludGVy5omA5oyH55qE5YWD57SgXHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLl9saXN0W3RoaXMuX3BvaW50ZXJdXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBzdGVwKCk6RXsvL3BvaW50ZXLlkJHlj7Pnp7vkuIDmraVcclxuLy8gICAgICAgICAgICAgdGhpcy5fcG9pbnRlcis9MTtcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVhZCgpO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgdG8ocGxhY2U6bnVtYmVyKTpQb2ludGVyTGlzdDxFPnsvL3BvaW50ZXLnp7vliLDmjIflrprkvY3nva5cclxuLy8gICAgICAgICAgICAgdGhpcy5fcG9pbnRlciA9IHBsYWNlXHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBwdXNoKGRhdGE6RSk6UG9pbnRlckxpc3Q8RT57Ly/lnKjmlbDnu4TmnKvlsL7lop7liqDkuIDkuKrlhYPntKBcclxuLy8gICAgICAgICAgICAgdGhpcy5fbGlzdC5wdXNoKGRhdGEpXHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBzZXQoaW5kZXg6bnVtYmVyLGRhdGE6RSk6UG9pbnRlckxpc3Q8RT57Ly/opoblhpnmlbDnu4TnibnlrpppbmRleOS4reeahOWFg+e0oFxyXG4vLyAgICAgICAgICAgICB0aGlzLl9saXN0W2luZGV4XSA9IGRhdGFcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXNcclxuLy8gICAgICAgICB9XHJcbiAgICAgICAgXHJcbi8vICAgICAgICAgbmV4dChzaGlmdDpudW1iZXIgPSAxKTpFe1xyXG4vLyAgICAgICAgICAgICAvL+ivu+WPluS9jeS6juW9k+WJjXBvaW50ZXLmiYDmjIfnmoTlhYPntKDlj7Povrnoi6XlubLmoLznmoTlhYPntKBcclxuLy8gICAgICAgICAgICAgLy9zaGlmdOm7mOiupOS4ujHvvIzljbPlvZPliY1wb2ludGVy5Y+z6L6555u46YK755qE5YWD57SgXHJcbi8vICAgICAgICAgICAgIC8vc2hpZnTkuLrotJ/mlbDml7bojrflj5blt6bkvqfnmoTlhYPntKBcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RbdGhpcy5fcG9pbnRlcitzaGlmdF1cclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIGdldCBsZW5ndGgoKTpudW1iZXJ7Ly/ojrflj5bmlbDnu4Tplb/luqZcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3QubGVuZ3RoXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBnZXQgbGFzdCgpOkV7Ly/ojrflj5bmnIDlkI7kuIDpoblcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RbdGhpcy5fbGlzdC5sZW5ndGgtMV1cclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIGdldCBmaXJzdCgpOkV7Ly/ojrflj5bpppbpoblcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RbMF07XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBnZXQgcG9pbnRlcigpOm51bWJlcnsvL+iOt+WPlnBvaW50ZXJcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BvaW50ZXJcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIGdldCBhdEVuZCgpOmJvb2xlYW57Ly/mn6XnnIvigJxwb2ludGVy5oyH5ZCR5pWw57uE5pyA5Y+z5L6n55qE5YWD57Sg4oCd55qE55yf5YC8XHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wb2ludGVyID09PSB0aGlzLl9saXN0Lmxlbmd0aCAtIDFcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcbi8vIH0iLCIvL1RPRE9cclxuLy/mlL7nva7miJHku6zpobnnm67ph4zoh6rlrprkuYnnmoTpgJrnlKhLRVnlgLzooahcclxuLy/mlL7lnKjlkIzkuIDkuKrmlofku7bph4zmnInliqnkuo7nu5PmnoTmuIXmmbBcclxuLy/lj6bvvJrlpoLmnpzlj6rmnInmn5DnibnlrprmqKHlnZfns7vnu5/ph4zkvb/nlKjnmoRlbnVt5Y+v5Lul5LiN5pS+6L+H5p2lIOebtOaOpeWGmeWcqOaooeWdl+aWh+S7tuS4rVxyXG5cclxuLy/lj4jlj6bvvJog5bu66K6u5Zyo5L2/55SoZW51beeahOaXtuWAmeWKoOS4gOS4quepuuWAvE5vbmXku6XlupTlr7nliKTlrprpl67pophcclxuXHJcbmV4cG9ydCBlbnVtIEFjdG9yVHlwZSB7XHJcbiAgICBOb25lLFxyXG4gICAgT3BlcmF0b3IsXHJcbiAgICBNb25zdGVyLFxyXG4gICAgVG9rZW5cclxuICAgIC8v6L+Z5YW25a6e5piv5a+55bqU55qE5LiN5ZCM55qE5pWw5o2u5qih5p2/XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIENhbXBUeXBlIHtcclxuICAgIE5vbmUsXHJcbiAgICBTZWxmLCAgIC8v5oiR5pa5XHJcbiAgICBFbmVteSAgIC8v5pWM5pa5XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9kTG9nIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogRG9kTG9nO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSW5zdGFuY2UoKTogRG9kTG9nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2UgfHwgKHRoaXMuX2luc3RhbmNlID0gbmV3IHRoaXMoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBkZWJ1Zyhtc2c6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIG1zZyA9IGAke21zZ31gO1xyXG4gICAgICAgIGNvbnNvbGUuZGVidWcobXNnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGluZm8obXNnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBtc2cgPSBgJHttc2d9YDtcclxuICAgICAgICBjb25zb2xlLmluZm8obXNnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHdhcm4obXNnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBtc2cgPSBgJHttc2d9YDtcclxuICAgICAgICBjb25zb2xlLndhcm4obXNnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGVycm9yKG1zZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgbXNnID0gYCR7bXNnfWA7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihtc2cpO1xyXG4gICAgICAgIERvZExvZy5JbnN0YW5jZS5fd3JpdGVUb0ZpbGUobXNnKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF93cml0ZVRvRmlsZShsb2c6IHN0cmluZykge1xyXG4gICAgICAgIC8vVE9ET1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgVmVjMiB9IGZyb20gXCIuLi9Db21tb24vRG9kTWF0aFwiO1xyXG4vLy8vLy9cclxuZXhwb3J0IGNsYXNzIEV2ZW50Q2VudHJle1xyXG4gICAgcHVibGljIHN0YXRpYyBpbnN0YW5jZTpFdmVudENlbnRyZTtcclxuICAgIHB1YmxpYyBzdGF0aWMgRVR5cGU6RVR5cGU7XHJcbiAgICBwdWJsaWMgc3RhdGljIGluaXQoKTp2b2lke1xyXG4gICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlID0gbmV3IEV2ZW50Q2VudHJlKCk7XHJcbiAgICAgICAgRXZlbnRDZW50cmUuRVR5cGUgPSBuZXcgRVR5cGUoKTtcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBfY2VudHJlOkxheWEuRXZlbnREaXNwYXRjaGVyID0gbmV3IExheWEuRXZlbnREaXNwYXRjaGVyKCk7XHJcblxyXG4gICAgcHVibGljIG9uKHR5cGU6c3RyaW5nLCBjYWxsZXI6YW55LCBsaXN0ZW5lcjpGdW5jdGlvbiwgYXJncz86YW55W10pOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fY2VudHJlLm9uKHR5cGUsY2FsbGVyLGxpc3RlbmVyLGFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBldmVudCh0eXBlOnN0cmluZywgYXJncz86YW55KTp2b2lke1xyXG4gICAgICAgIHRoaXMuX2NlbnRyZS5ldmVudCh0eXBlLGFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvZmYodHlwZTpzdHJpbmcsIGNhbGxlcjphbnksIGxpc3RlbmVyOkZ1bmN0aW9uKXtcclxuICAgICAgICB0aGlzLl9jZW50cmUub2ZmKHR5cGUsIGNhbGxlciwgbGlzdGVuZXIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuY2xhc3MgRVR5cGUge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTEVBVkXkuovku7ZcclxuICAgICAqIOWPguaVsO+8mmU6QWN0b3JcclxuICAgICAqIFxyXG4gICAgICogRU5UUkXkuovku7ZcclxuICAgICAqIOWPguaVsO+8mmU6QWN0b3JcclxuICAgICAqIFxyXG4gICAgICogQVRUQUNL5LqL5Lu2XHJcbiAgICAgKiDlj4LmlbDvvJpmcm9tOkFjdG9yLCB0bzpBY3RvclxyXG4gICAgICogXHJcbiAgICAgKiBFTkVNWV9ERUFE5LqL5Lu2XHJcbiAgICAgKiDlj4LmlbA6IGU6RW5lbXlcclxuICAgICAqIFxyXG4gICAgICogT3BydF9ERUFE5LqL5Lu2XHJcbiAgICAgKiDlj4LmlbA6IGU6T3BydFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMg5oC75LmL5oiR5YWI5pS+5LiA5Liq5Ye95pWw5Zyo6L+Z6YeMKCk6dm9pZHt9XHJcbiAgICBcclxuICAgIHB1YmxpYyBMRUFWRShwb3M6VmVjMiwgaWRlbnRpdHk6c3RyaW5nKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIGAke2lkZW50aXR5fTpDT0xMSVNJT05fRVZFTlRfTEVBVkVfRlJPTSgke3Bvcy54fXwke3Bvcy55fSlgO1xyXG4gICAgfVxyXG4gICAgcHVibGljIEVOVFJFKHBvczpWZWMyLCBpZGVudGl0eTpzdHJpbmcpOnN0cmluZ3tcclxuICAgICAgICByZXR1cm4gYCR7aWRlbnRpdHl9OkNPTExJU0lPTl9FVkVOVF9FTlRSRV9UTygke3Bvcy54fXwke3Bvcy55fSlgO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBBVFRBQ0soKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIFwiQVRUQUNLXCI7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IEVORU1ZX0RFQUQoKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIFwiRU5FTVlfREVBRFwiO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBPUFJUX0RFQUQoKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIFwiT1BSVF9ERUFEXCI7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgaW50ZXJmYWNlIFN5bWJvbGl6ZWR7XHJcbiAgICBzeW1ib2w6TXlTeW1ib2w7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNeVN5bWJvbHtcclxuICAgIHByaXZhdGUgc3RhdGljIGNvdW50Om51bWJlciA9IDA7XHJcblxyXG4gICAgcHJpdmF0ZSBfZGF0YTpudW1iZXI7XHJcblxyXG4gICAgcHVibGljIGdldCBkYXRhKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IE15U3ltYm9sLmNvdW50O1xyXG4gICAgICAgIE15U3ltYm9sLmNvdW50ICs9IDE7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBGaXhUaW1lIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZnJhbWVSYXRlOiBudW1iZXIgPSA2MDtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZGVsdGFUaW1lOiBudW1iZXIgPSAxIC8gRml4VGltZS5mcmFtZVJhdGU7XHJcbiAgICBwdWJsaWMgc3RhdGljIGZyYW1lQ291bnQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgZWxhcHNlZFRpbWU6IG51bWJlcjtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5mcmFtZUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLmVsYXBzZWRUaW1lID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmZyYW1lQ291bnQrKztcclxuICAgICAgICB0aGlzLmVsYXBzZWRUaW1lICs9IHRoaXMuZGVsdGFUaW1lO1xyXG4gICAgfVxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXHJcbmltcG9ydCBHYW1lIGZyb20gXCIuL1NjZW5lU2NyaXB0L0dhbWVcIlxuaW1wb3J0IExvYWRpbmcgZnJvbSBcIi4vU2NlbmVTY3JpcHQvTG9hZGluZ1wiXHJcbi8qXHJcbiog5ri45oiP5Yid5aeL5YyW6YWN572uO1xyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ29uZmlne1xyXG4gICAgc3RhdGljIHdpZHRoOm51bWJlcj0xODAwO1xyXG4gICAgc3RhdGljIGhlaWdodDpudW1iZXI9OTAwO1xyXG4gICAgc3RhdGljIHNjYWxlTW9kZTpzdHJpbmc9XCJub3NjYWxlXCI7XHJcbiAgICBzdGF0aWMgc2NyZWVuTW9kZTpzdHJpbmc9XCJub25lXCI7XHJcbiAgICBzdGF0aWMgYWxpZ25WOnN0cmluZz1cInRvcFwiO1xyXG4gICAgc3RhdGljIGFsaWduSDpzdHJpbmc9XCJsZWZ0XCI7XHJcbiAgICBzdGF0aWMgc3RhcnRTY2VuZTphbnk9XCJMb2FkaW5nU2NlbmUuc2NlbmVcIjtcclxuICAgIHN0YXRpYyBzY2VuZVJvb3Q6c3RyaW5nPVwiXCI7XHJcbiAgICBzdGF0aWMgZGVidWc6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBzdGF0OmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgcGh5c2ljc0RlYnVnOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgZXhwb3J0U2NlbmVUb0pzb246Ym9vbGVhbj10cnVlO1xyXG4gICAgY29uc3RydWN0b3IoKXt9XHJcbiAgICBzdGF0aWMgaW5pdCgpe1xyXG4gICAgICAgIHZhciByZWc6IEZ1bmN0aW9uID0gTGF5YS5DbGFzc1V0aWxzLnJlZ0NsYXNzO1xyXG4gICAgICAgIHJlZyhcIlNjZW5lU2NyaXB0L0dhbWUudHNcIixHYW1lKTtcbiAgICAgICAgcmVnKFwiU2NlbmVTY3JpcHQvTG9hZGluZy50c1wiLExvYWRpbmcpO1xyXG4gICAgfVxyXG59XHJcbkdhbWVDb25maWcuaW5pdCgpOyIsImltcG9ydCB7IENvbGlFbWl0IH0gZnJvbSBcIi4vQWN0b3JNb2R1bGVzL0NvbGlNZXNzYWdlXCI7XHJcbmltcG9ydCB7IFByb2ZpbGUgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvUHJvZmlsZVwiO1xyXG5pbXBvcnQgeyBTeW1ib2xpemVkLCBNeVN5bWJvbCB9IGZyb20gXCIuLi8uLi9GaXgvRml4U3ltYm9sXCI7XHJcbmltcG9ydCB7IEJ1ZmYgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvQnVmZlwiO1xyXG5pbXBvcnQgeyBBdGtTdGF0ZU1hY2hpbmUgfSBmcm9tIFwiLi9BdHRhY2svQXRrQWJzdFwiO1xyXG5pbXBvcnQgeyBEYW1hZ2UgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvRGFtYWdlXCI7XHJcbmltcG9ydCB7IEFjdG9yVHlwZSB9IGZyb20gXCIuLi8uLi9Db21tb24vRG9kS2V5XCI7XHJcbmltcG9ydCBBY3RvclN0YXRlTWdyLCB7IEFjdG9yU3RhdGVJRCB9IGZyb20gXCIuL1N0YXRlL0FjdG9yU3RhdGVGc21cIjtcclxuaW1wb3J0IHsgQWN0b3JCdWZmTWdyIH0gZnJvbSBcIi4vQWN0b3JNb2R1bGVzL0FjdG9yQnVmZk1nclwiO1xyXG5pbXBvcnQgeyBUcmFuc2Zvcm0gfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvVHJhbnNmb3JtXCI7XHJcbmltcG9ydCB7IFVuaXRSZW5kZXIgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvVW5pdFJlbmRlclwiO1xyXG5pbXBvcnQgeyBBbmltYXRpb24gfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvQW5pbWF0aW9uXCI7XHJcbmltcG9ydCBSb3V0ZSBmcm9tIFwiLi9BY3RvclJvdXRlXCI7XHJcbmltcG9ydCB7IEFjdG9yU2tpbGwgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvQWN0b3JTa2lsbFwiO1xyXG5pbXBvcnQgeyBBY3RvckNvc3QgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvQWN0b3JDb3N0XCI7XHJcbmltcG9ydCB7IEJsb2NrZXIgfSBmcm9tIFwiLi9BdHRhY2svQmxvY2tlclwiO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbi8v5Z+65pys5Y6f5YiZ77ya5bCR55So57un5om/77yM5aSa55So57uE5ZCIXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjdG9yIGltcGxlbWVudHMgU3ltYm9saXplZHtcclxuICAgIHB1YmxpYyBzeW1ib2w6IE15U3ltYm9sOyAvL+WFqOWxgOWUr+S4gOeahOagh+ivhuaVsOWtl1xyXG4gICAgcHVibGljIHR5cGU6IEFjdG9yVHlwZTsgLy/pu5jorqTouqvku73kuLpBY3RvclxyXG5cclxuICAgIHB1YmxpYyBzdGF0ZTogQWN0b3JTdGF0ZU1ncjsgLy/nirbmgIHmnLog57uf562554q25oCB5pu05pawXHJcblxyXG4gICAgcHVibGljIHByb2ZpbGU6UHJvZmlsZTsvL+WfuuacrOWxnuaAp+S4juiuv+mXruaWueazleWQiOmbhlxyXG5cclxuICAgIHB1YmxpYyBhdGs6IEF0a1N0YXRlTWFjaGluZTtcclxuICAgIHB1YmxpYyBjb2xpRW1pdDpDb2xpRW1pdDtcclxuICAgIHB1YmxpYyBibG9ja2VyOkJsb2NrZXI7XHJcbiAgICBwdWJsaWMgYnVmZk1ncjpBY3RvckJ1ZmZNZ3I7XHJcbiAgICBwdWJsaWMgdHJhbnNmb3JtOlRyYW5zZm9ybTtcclxuICAgIHB1YmxpYyByZW5kZXI6VW5pdFJlbmRlcjtcclxuICAgIHB1YmxpYyBhbmltYXRpb246QW5pbWF0aW9uO1xyXG4gICAgcHVibGljIHJvdXRlOlJvdXRlO1xyXG4gICAgcHVibGljIHNraWxsOkFjdG9yU2tpbGw7XHJcbiAgICBwdWJsaWMgY29zdDpBY3RvckNvc3Q7XHJcblxyXG4gICAgLy9UT0RP77ya5Y675YyF5LiA5Liq57uE5Lu2XHJcbiAgICAvLyAvKipcclxuICAgIC8vICAqIOebruagh+mAieaLqeWZqFxyXG4gICAgLy8gICovXHJcbiAgICAvLyBwdWJsaWMgc2Vla2VyOiBTZWVrZXI7XHJcblxyXG4gICAgLy8gLypcclxuICAgIC8vICog5b2T5YmN6ZSB5a6a55uu5qCHXHJcbiAgICAvLyAqICovXHJcbiAgICAvLyBwdWJsaWMgZm9jdXM6IEFjdG9yO1xyXG5cclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IodHlwZTogQWN0b3JUeXBlLCByZXM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc3ltYm9sID0gbmV3IE15U3ltYm9sKCk7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gbmV3IEFjdG9yU3RhdGVNZ3IodGhpcyk7XHJcbiAgICAgICAgLy8gYWNjb3JkaW5nIHRvIGRpZmZlcmVudCB0eXBlLCBhZGQgZGlmZmVyZW50IGNvbXBvbmVudHMgdG8gdGhpcyBhY3Rvci4gXHJcblxyXG4gICAgICAgIHRoaXMucHJvZmlsZSA9IG5ldyBQcm9maWxlKHRoaXMsIHJlc1sneHh4J10pOyBcclxuICAgICAgICB0aGlzLmF0ayA9IG5ldyBBdGtTdGF0ZU1hY2hpbmUodGhpcywgcmVzWyd4eHgnXSk7XHJcbiAgICAgICAgdGhpcy5ibG9ja2VyID0gbmV3IEJsb2NrZXIodGhpcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5idWZmTWdyID0gbmV3IEFjdG9yQnVmZk1ncih0aGlzLCByZXNbJ3h4eCddKTtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybSA9IG5ldyBUcmFuc2Zvcm0odGhpcyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIgPSBuZXcgVW5pdFJlbmRlcih0aGlzKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IG5ldyBBbmltYXRpb24odGhpcywgcmVzWyd4eHgnXSk7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgaWYgKEFjdG9yVHlwZS5Nb25zdGVyID09IHRoaXMudHlwZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlID0gbmV3IFJvdXRlKHRoaXMsIHJlc1sneHh4J10pO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKEFjdG9yVHlwZS5PcGVyYXRvciA9PSB0aGlzLnR5cGUpIHtcclxuICAgICAgICAgICAgdGhpcy5za2lsbCA9IG5ldyBBY3RvclNraWxsKHRoaXMsIHJlc1sneHh4J10pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5jb3N0ID0gbmV3IEFjdG9yQ29zdCh0aGlzKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhd2FrZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXRlLnJ1blN0YXRlKEFjdG9yU3RhdGVJRC5QcmVwcmVkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGUudXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIC8vIHJlc2V0IGNsZWFyIHJlc291cmNlIHJlbGF0ZWQgbW9kdWxlXHJcbiAgICAgICAgLy8gdGhpcy5yZW5kZXIucmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0T25NYXAoKTogdm9pZCB7XHJcbiAgICAgICAgLy9UT0RPXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFBvc2l0aW9uKCk6IHZvaWQge1xyXG4gICAgICAgIC8vVE9ET1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pS75Ye75LiA5Liq5oiW5aSa5LiqQWN0b3Lnm67moIdcclxuICAgICAqIDIwMjAvMy81IOaUu+WHu+mAu+i+keW3suS7juS6i+S7tuinpuWPkeaUueS4uuebtOaOpeiwg+eUqFxyXG4gICAgICog5Y+R6LW35ZKM5o6l5pS25pS75Ye755qE6YC76L6R5Z2H5bCB6KOF5ZyoQWN0b3LnsbvkuK1cclxuICAgICAqIEBwYXJhbSB2aWN0aW0gXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhdHRhY2soLi4udmljdGltOkFjdG9yW10pOnZvaWR7XHJcbiAgICAgICAgbGV0IGRtZzpEYW1hZ2UgPSB0aGlzLnByb2ZpbGUuZ2VuZXJhdGVEYW1hZ2UodGhpcyk7XHJcblxyXG4gICAgICAgIHZpY3RpbS5mb3JFYWNoKGVsZT0+e1xyXG4gICAgICAgICAgICB0aGlzLmJlQXR0YWNrZWQoZG1nLmNvcHkoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog6KKr5pS75Ye7XHJcbiAgICAgKiBAcGFyYW0gZGFtYWdlIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYmVBdHRhY2tlZChkYW1hZ2U6RGFtYWdlKTp2b2lke1xyXG4gICAgICAgIC8vQHRvZG9cclxuICAgICAgICAvL+WHj+WwkeeUn+WRveWAvFxyXG4gICAgICAgIC8v5Y+R5Ye65pS75Ye75LqL5Lu2XHJcbiAgICAgICAgLy/vvIjlj6/og73vvInlj5Hlh7rmrbvkuqHkuovku7ZcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDnp7vpmaRidWZmXHJcbiAgICAgKiBAcGFyYW0gYnVmZiBcclxuICAgICAqIOaOpeWPo+enu+mZpFxyXG4gICAgICovXHJcbiAgICAvLyBwdWJsaWMgcmVtb3ZlQnVmZihidWZmOkJ1ZmYpOnZvaWR7XHJcbiAgICAvLyAgICAgbGV0IGk6bnVtYmVyID0gdGhpcy5idWZmTGlzdC5pbmRleE9mKGJ1ZmYpO1xyXG4gICAgLy8gICAgIGlmIChpID09IC0xKSB7XHJcbiAgICAvLyAgICAgICAgIHJldHVybjtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgdGhpcy5idWZmTGlzdFtpXS5vbkRlc3Ryb3koKTtcclxuICAgIC8vICAgICB0aGlzLmJ1ZmZMaXN0LnNwbGljZShpLDEpO1xyXG4gICAgLy8gfVxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IEFjdG9yIGZyb20gXCIuL0FjdG9yXCI7XHJcbmltcG9ydCB7IEFjdG9yVHlwZSB9IGZyb20gXCIuLi8uLi9Db21tb24vRG9kS2V5XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3Rvck1nciB7XHJcbiAgICBwdWJsaWMgYWN0b3JzOiBBcnJheTxBY3Rvcj47XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmFjdG9ycyA9IG5ldyBBcnJheTxBY3Rvcj4oKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdChyZXM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX2luaXRFbmVteShyZXMpO1xyXG4gICAgICAgIHRoaXMuX2luaXRPcHJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGF3YWtlKCk6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hY3RvcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGFjdG9yID0gdGhpcy5hY3RvcnNbaV07XHJcbiAgICAgICAgICAgIGFjdG9yLmF3YWtlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYWN0b3IgPSB0aGlzLmFjdG9yc1tpXTtcclxuICAgICAgICAgICAgYWN0b3IudXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYWN0b3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhY3RvciA9IHRoaXMuYWN0b3JzW2ldO1xyXG4gICAgICAgICAgICBhY3Rvci5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY3JlYXRlQWN0b3IodHlwZTogQWN0b3JUeXBlLCByZXM6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGxldCBhY3RvciA9IG5ldyBBY3Rvcih0eXBlLCByZXMpO1xyXG4gICAgICAgIHRoaXMuYWN0b3JzLnB1c2goYWN0b3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRBY3RvckJ5SUQoSUQ6IG51bWJlcik6IEFjdG9yIHwgbnVsbCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYWN0b3IgPSB0aGlzLmFjdG9yc1tpXTtcclxuICAgICAgICAgICAgaWYgKElEID09IGFjdG9yLnN5bWJvbC5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYWN0b3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfaW5pdEVuZW15KHJlczogYW55KSB7XHJcbiAgICAgICAgLy9UT0RPIHVzZSBsZXZlbCByZXMgZGF0YSBpbml0IGVuZW15IGFjdG9yc1xyXG4gICAgICAgIC8vZWcuXHJcbiAgICAgICAgLy9sZXQgZW5lbXlSZXMgPSByZXNbJ3h4eHh4J107XHJcbiAgICAgICAgLy9hY3RvciA9IHRoaXMuY3JlYXRlQWN0b3IoQWN0b3JUeXBlLkVuZW15ICxlbmVteVJlcyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgX2luaXRPcHJ0KCkge1xyXG4gICAgICAgIC8vVE9ETyB1c2UgcHJlIGNob29zZSBvcHJ0IGxpc3QgdG8gaW5pdCBzZWxmIGFjdG9yc1xyXG4gICAgICAgIC8vbGV0IGFycmF5ID0gUmhvZGVzR2FtZXMuSW5zdGFuY2UuZ2FtZWRhdGEuY3VycmVudEZvcm1hdGlvbjtcclxuICAgICAgICAvL2ZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAvLyAgIGxldCBpZCA9IGFycmF5W2ldO1xyXG4gICAgICAgIC8vICAgbGV0IHJlcyA9IERvZFJlc291cmNlTWdyLkluc3RhbmNlLmdldEN1cnJlbnRPcGVyYXJvckRhdGFCeUlEKGlkKTtcclxuICAgICAgICAvLyAgIGxldCBhY3RvciA9IHRoaXMuY3JlYXRlQWN0b3IoQWN0b3JUeXBlLk9wZXJhdG9yLCByZXMpXHJcbiAgICAgICAgLy99XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQWN0b3JCdWZmTWdye1xyXG4gICAgY29uc3RydWN0b3Ioa2VlcGVyOkFjdG9yLCByZXM6YW55KXtcclxuICAgICAgICBcclxuICAgIH1cclxufSIsImltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBY3RvckNvc3R7XHJcbiAgICBjb25zdHJ1Y3RvcihrZWVwZXI6QWN0b3Ipe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9BY3RvclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFjdG9yU2tpbGx7XHJcbiAgICBjb25zdHJ1Y3RvcihrZWVwZXI6QWN0b3IsIHJlczphbnkpe1xyXG5cclxuICAgIH1cclxufSIsImltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBbmltYXRpb257XHJcbiAgICBjb25zdHJ1Y3RvcihrZWVwZXI6QWN0b3IsIHJlczphbnkpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9BY3RvclwiO1xyXG5cclxuZXhwb3J0IGVudW0gRGFtYWdlVHlwZXtcclxuICAgIFBZU0lDQUwsXHJcbiAgICBNQUdJQ0FMLFxyXG4gICAgVFJVRSxcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERhbWFnZXtcclxuXHJcbiAgICBwdWJsaWMgc291cmNlOkFjdG9yID0gbnVsbDsvL+S8pOWus+adpea6kFxyXG4gICAgcHVibGljIHZhbHVlOm51bWJlciA9IDA7Ly/mlLvlh7vliptcclxuICAgIHB1YmxpYyB0eXBlOkRhbWFnZVR5cGUvL+S8pOWus+exu+Wei1xyXG4gICAgcHVibGljIHByaW1hcnk6Ym9vbGVhbiA9IHRydWU7Ly/mmK/lkKbkuLrpnZ7pl7TmjqXkvKTlrrPvvIjpl7TmjqXkvKTlrrPkuI3kvJrop6blj5HmmJ/nhorjgIHlubTnmoTlj43nlLLkuYvnsbvnmoTmlYjmnpzvvIlcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2U6QWN0b3IsIHZhbHVlOm51bWJlciwgdHlwZTpEYW1hZ2VUeXBlKXtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvcHkoKTpEYW1hZ2V7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBEYW1hZ2UodGhpcy5zb3VyY2UsIHRoaXMudmFsdWUsIHRoaXMudHlwZSk7XHJcbiAgICAgICAgcmVzdWx0LnR5cGUgPSB0aGlzLnR5cGU7XHJcbiAgICAgICAgcmVzdWx0LnByaW1hcnkgPSB0aGlzLnByaW1hcnk7XHJcbiAgICAgICAgcmVzdWx0LnNvdXJjZSA9IHRoaXMuc291cmNlO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBEYW1hZ2UsIERhbWFnZVR5cGUgfSBmcm9tIFwiLi9EYW1hZ2VcIjtcclxuaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9BY3RvclwiO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBQcm9maWxl57G75piv5YKo5a2Y5Y2V5L2N5Z+65pys5pWw5o2u77yI5aaC5pS75Ye75Yqb44CB6Ziy5b6h5Yqb562J77yJ55qE57G7XHJcbiAqIOWug+i/mOaPkOS+m+S4gOWIh+eUqOS6juiOt+WPlkFjdG9y5L+h5oGv55qE5o6l5Y+j77yI5aaC5piv5ZCm6IO95aSf6KGM5Yqo44CB5piv5ZCm6IO95aSf6Zi75oyh77yJXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUHJvZmlsZSB7XHJcbiAgICBwdWJsaWMgbmFtZTogU3RyaW5nID0gXCJDaGFuZGxlciBCaW5nXCI7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkga2VlcGVyOkFjdG9yO1xyXG5cclxuICAgIHByaXZhdGUgX3ByZXBUaW1lOiBudW1iZXIgPSAxMDA7Ly/liY3mkYfml7bpl7RcclxuICAgIHByaXZhdGUgX2FmdGVyVGltZTogbnVtYmVyID0gMTAwOy8v5ZCO5pGH5pe26Ze0XHJcbiAgICBwcml2YXRlIF9icmVha3Rocm91Z2g6IG51bWJlciA9IDE7Ly/noLTpmaTpmLvmjKHog73liptcclxuICAgIHB1YmxpYyBpbnZpc2libGU6IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpumakOW9olxyXG4gICAgcHVibGljIGJsb2NrZWQ6IGJvb2xlYW4gPSBmYWxzZTsvL+W3suiiq+mYu+aMoVxyXG4gICAgcHVibGljIGJsb2NrZXI6IEFjdG9yOy8v6Zi75oyh6ICFXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkvKTlrrPorqHnrpfnm7jlhbPnmoTkv67mlLnlkozorr/pl67mjqXlj6NcclxuICAgICAqIOS9nOiAhe+8muiRsVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXR0YWNrUG93ZXI6IG51bWJlciA9IDEwMDsvL+aUu+WHu+WKm1xyXG4gICAgcHVibGljIGF0a1NjYWxlOm51bWJlciA9IDE7Ly/mlLvlh7vlgI3njodcclxuICAgIHB1YmxpYyBhdGtCdWZmOm51bWJlciA9IDE7Ly/mlLvlh7vnmb7liIbmr5Tmj5DljYdcclxuICAgIHB1YmxpYyBhcm1vdXI6bnVtYmVyID0gNTA7Ly/niannkIbpmLLlvqFcclxuICAgIHB1YmxpYyBtYWdpY0FybW91cjpudW1iZXIgPSAwOy8v5rOV5pyv5oqX5oCnXHJcbiAgICBwdWJsaWMgZG1nVHlwZTpEYW1hZ2VUeXBlID0gRGFtYWdlVHlwZS5QWVNJQ0FMOy8v5Lyk5a6z57G75Z6LXHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGtlZXBlcjpBY3RvciwgcmVzOmFueSl7XHJcbiAgICAgICAgdGhpcy5rZWVwZXIgPSBrZWVwZXI7XHJcbiAgICAgICAgLy90b2RvOiBhYm91dCByZXNcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS8oOWFpeS4gOS4qkFjdG9y77yM6L+U5Zue5Lyk5a6z5a+56LGhXHJcbiAgICAgKiBAcGFyYW0gc291cmNlIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2VuZXJhdGVEYW1hZ2Uoc291cmNlOkFjdG9yKTpEYW1hZ2V7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBEYW1hZ2Uoc291cmNlLCB0aGlzLmF0dGFja1Bvd2VyKnRoaXMuYXRrU2NhbGUqdGhpcy5hdGtCdWZmLCB0aGlzLmRtZ1R5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoaXRQb2ludDogbnVtYmVyID0gMTA7Ly/nlJ/lkb3lgLxcclxuICAgIHB1YmxpYyBtYXhIaXRQb2ludDogbnVtYmVyID0gMTA7Ly/mnIDpq5jnlJ/lkb3lgLxcclxuXHJcbiAgICAvKipcclxuICAgICAqIGJ5IFhXVlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaGF0ZUxldmVsOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGF0dGFja1JhbmdlUmFkaXVzOiBudW1iZXI7XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXQgcHJlcFRpbWUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcHJlcFRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBhZnRlclRpbWUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYWZ0ZXJUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgYnJlYWt0aHJvdWdoKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JyZWFrdGhyb3VnaDtcclxuICAgIH1cclxuXHJcbiAgIFxyXG59XHJcblxyXG4vKipcclxuICog5piv5ZCm6ZyA6KaB5ZyocHJvZmlsZeS4reWwhuS4jeWQjOeahOaVsOWAvOWIhuexu++8n1xyXG4gKlxyXG4gKi8iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcblxyXG4vKipcclxuICog5a+55LiA5Liq5Y2V5L2N55qE5Yeg5L2V54q25oCB55qE5o+P6L+wXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVHJhbnNmb3Jte1xyXG4gICAgY29uc3RydWN0b3Ioa2VlcGVyOkFjdG9yKXtcclxuICAgICAgICBcclxuICAgIH1cclxufSIsImltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBVbml0UmVuZGVye1xyXG4gICAgY29uc3RydWN0b3Ioa2VlcGVyOkFjdG9yKXtcclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4vQWN0b3JcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlIHtcclxuICAgIGNvbnN0cnVjdG9yKGtlZXBlcjpBY3RvciwgcmVzOmFueSl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0tWUGFpcn0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Eb2REYXRhU3RydWN0dXJlXCI7XHJcbmltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuaW1wb3J0IHtFdmVudENlbnRyZX0gZnJvbSBcIi4uLy4uLy4uL0V2ZW50L0V2ZW50Q2VudHJlXCI7XHJcbmltcG9ydCB7IFNlZWtlciB9IGZyb20gXCIuL0FjdG9yU2Vla2VyXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIGJ5IFhXVlxyXG4gKiBcclxuICog6JGxIOS/ruaUueS6jiAzLzE4XHJcbiAqICAgICAg5bCGU2Vla2Vy5oyq5YWl5pS75Ye754q25oCB5py65YaF77yM5LiN55SxQWN0b3LmjIHmnIlcclxuICogICAgICDkuI3lkIznmoTmlLvlh7vojIPlm7TnlLFTZWVrZXLmm7/mjaLmnaXlrp7njrBcclxuICogICAgICDkuI3lkIznmoTmlLvlh7vpgLvovpHvvIjojIPlm7Qv5Y2V5L2T77yJ55Sx5pu/5o2i54q25oCB5py65YaF55qE54q25oCB5a6e5L6L5a6e546wXHJcbiAqICAgICAgQXRrU3RhdGVNYWNoaW5l6LSf6LSj5a+55aSW5o+Q5L6b5omA5pyJ5L+u5pS5L+iuv+mXruaOpeWPo1xyXG4gKiAgICAgIOS7jemcgOWvueatpOi/m+ihjOi/m+S4gOatpeinhOWIku+8iOWNleS9ky/lpJrkvZMv576k5L2T5pS75Ye76YC76L6R5piv5LuF55Sx5LiA5Liq5Y+C5pWw5a6e546w77yM6L+Y5piv55Sx5aSa5oCB5a6e546w77yJXHJcbiAqICAgICAgLy90b2RvOuaXtumXtOe0r+WKoOmAu+i+keaUueWPmFxyXG4gKiBcclxuICovXHJcblxyXG5lbnVtIFN0YXRlVHlwZSB7XHJcbiAgICBXQUlUID0gXCJXQUlUXCIsXHJcbiAgICBQUkVQQVJFID0gXCJQUkVQQVJFXCIsXHJcbiAgICBBRlRFUl9BVEsgPSBcIkFGVEVSX0FUS1wiXHJcbn1cclxuXHJcbmludGVyZmFjZSBTdGF0ZSB7XHJcbiAgICBleGVjdXRlKG1hY2hpbmU6IEF0a1N0YXRlTWFjaGluZSk6IHZvaWRcclxuXHJcbiAgICByZXNldCgpOiB2b2lkXHJcbn1cclxuXHJcbmFic3RyYWN0IGNsYXNzIEJhc2VTdGF0ZSBpbXBsZW1lbnRzIFN0YXRlIHtcclxuICAgIHByb3RlY3RlZCB0aW1lOiBudW1iZXIgPSAwOy8v5pe26Ze057Sv5Yqg6YC76L6R5pS55Y+YXHJcblxyXG4gICAgcHVibGljIHJlc2V0KCkge1xyXG4gICAgICAgIHRoaXMudGltZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgYWJzdHJhY3QgZXhlY3V0ZShtYWNoaW5lOiBBdGtTdGF0ZU1hY2hpbmUpOiB2b2lkO1xyXG5cclxufVxyXG5cclxuY2xhc3MgV2FpdCBleHRlbmRzIEJhc2VTdGF0ZSB7XHJcblxyXG4gICAgcHVibGljIGV4ZWN1dGUobWFjaGluZTogQXRrU3RhdGVNYWNoaW5lKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZm9jdXMgPSBtYWNoaW5lLnNlZWtlci5nZXRGb2N1cygpO1xyXG4gICAgICAgIGlmIChmb2N1cyAhPT0gbnVsbCkgey8v5aaC5p6c6IO95aSf5om+5Yiw5pWM5Lq6XHJcbiAgICAgICAgICAgIG1hY2hpbmUuY2hhbmdlU3RhdGUoU3RhdGVUeXBlLlBSRVBBUkUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZvdW5kIEVuZW15LCBTd2l0Y2ggdG8gcHJlcGFyZSBwaGFzZSBAXCIgKyB0aGlzLnRpbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7Ly/lpoLmnpzmib7kuI3liLDmlYzkurpcclxuICAgICAgICAgICAgdGhpcy50aW1lICs9IDE7Ly90b2RvOiDml7bpl7TntK/liqDpgLvovpHmlLnlj5hcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lpoLmnpxzZWVrZXLkuK3lrZjlnKjmlYzkurrvvIxyZXNldCBQcmVwYXJl5bm26Lez6L2s5YiwUHJlcGFyZemYtuautVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuY2xhc3MgUHJlcGFyZSBleHRlbmRzIEJhc2VTdGF0ZSB7XHJcblxyXG5cclxuICAgIHB1YmxpYyBleGVjdXRlKG1hY2hpbmU6IEF0a1N0YXRlTWFjaGluZSk6IHZvaWQge1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAg55Sx5LqO5pS75Ye754q25oCB5py655qE6KeE5YiS6L+b6KGM6L+H5LiA5qyh5L+u5pS577yM5q2k5aSE5pqC5pe25YWI5o+Q5L6b5Lyq5Luj56CBXHJcbiAgICAgICAg5q2k57G755uu5YmN5Li65Y2V5L2T5pS75Ye755qE6YC76L6RXHJcbiAgICAgICAgKi9cclxuXHJcbiAgICAgICBjb25zdCBmb2N1cyA9IG1hY2hpbmUuc2Vla2VyLmdldEZvY3VzKCk7XHJcbiAgICAgICAgaWYgKG1hY2hpbmUuc2Vla2VyLmZvY3VzQ2hhbmdlZCgpKSB7XHJcbiAgICAgICAgICAgIGlmIChmb2N1cyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy90b2RvOiDph43mlrDov5vlhaXliY3mkYfpmLbmrrVcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vdG9kbzog6L+b5YWl5YeG5aSH6Zi25q61XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICB0b2RvOiDliY3mkYfml7bpl7TntK/liqDjgILnm67liY3lt7Lnu4/nu4/ov4fnmoTliY3mkYfml7bpl7TlrZjlgqjlnKhwcm9maWxl5LitP1xyXG4gICAgICAgIOWmguaenOWJjeaRh+aXtumXtOW3sua7oe+8jOWImei/m+ihjOaUu+WHu+S4lOi/m+WFpeWQjuaRh+eKtuaAgVxyXG4gICAgICAgICovXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIC8vIC8v5Yik5pat5piv5ZCm6ZyA6KaB6YeN5paw6YCJ5oup55uu5qCH5bm26YeN572u5YmN5pGHXHJcbiAgICAgICAgLy8gbGV0IHNlZWtlciA9IG1hY2hpbmUua2VlcGVyLnNlZWtlcjtcclxuICAgICAgICAvLyBsZXQgYWN0b3IgPSBtYWNoaW5lLmtlZXBlcjtcclxuICAgICAgICAvLyBpZiAobWFjaGluZS5rZWVwZXIuZm9jdXMgJiYgc2Vla2VyLmdldENhcHR1cmVMaXN0KCkuaW5kZXhPZihtYWNoaW5lLmtlZXBlci5mb2N1cykgPCAwKSB7Ly/lvZPliY3nm67moIfkuI3lnKjmlLvlh7vojIPlm7TlhoVcclxuICAgICAgICAvLyAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgICAgIC8vICAgICBtYWNoaW5lLmtlZXBlci5mb2N1cyA9IHNlZWtlci5nZXRGb2N1cygpO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgLy8gLy/liKTmlq3lvZPliY3mmK/lkKblrZjlnKjnm67moIdcclxuICAgICAgICAvLyBpZiAobWFjaGluZS5rZWVwZXIuZm9jdXMpIHtcclxuICAgICAgICAvLyAgICAgLy/orqHmlbArMVxyXG4gICAgICAgIC8vICAgICB0aGlzLnRpbWUgKz0gMTtcclxuICAgICAgICAvLyAgICAgaWYgKHRoaXMudGltZSA+PSBhY3Rvci5wcm9maWxlLnByZXBUaW1lKSB7ICAvL+WJjeaRh+e7k+adn+inpuWPkeaUu+WHu1xyXG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJBdHRhY2sgJiB0byBBZnRlciBQaGFzZSBAXCIgKyB0aGlzLnRpbWUpOy8v6L+b6KGM5pS75Ye7XHJcbiAgICAgICAgLy8gICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5ldmVudChFdmVudENlbnRyZS5FVHlwZS5BVFRBQ0ssIFthY3RvciwgbWFjaGluZS5rZWVwZXIuZm9jdXNdKTtcclxuICAgICAgICAvLyAgICAgICAgIC8v6L+b5YWl5ZCO5pGH54q25oCBXHJcbiAgICAgICAgLy8gICAgICAgICBtYWNoaW5lLmNoYW5nZVN0YXRlKFN0YXRlVHlwZS5BRlRFUl9BVEspO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgLy/msqHmnInnm67moIfvvIzlm57liLDlvoXmnLrpmLbmrrVcclxuICAgICAgICAvLyAgICAgbWFjaGluZS5jaGFuZ2VTdGF0ZShTdGF0ZVR5cGUuV0FJVCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBBZnRlckF0ayBleHRlbmRzIEJhc2VTdGF0ZSB7XHJcblxyXG4gICAgcHVibGljIGV4ZWN1dGUobWFjaGluZTogQXRrU3RhdGVNYWNoaW5lKTogdm9pZCB7XHJcbiAgICAgICAgLy8gbGV0IHNlZWtlciA9IG1hY2hpbmUua2VlcGVyLnNlZWtlcjtcclxuICAgICAgICAvLyB0aGlzLnRpbWUgKz0gMTsvL+WNlee6r+iuoeS4quaVsO+8jOa7oeS6huWwsei/lOWbnndhaXTnirbmgIFcclxuICAgICAgICAvLyBpZiAodGhpcy50aW1lID49IG1hY2hpbmUua2VlcGVyLnByb2ZpbGUuYWZ0ZXJUaW1lKSB7XHJcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiV2FpdCBBZnRlciBBVEsgRW5kLCB0byBXYWl0IEBcIiArIHRoaXMudGltZSk7XHJcbiAgICAgICAgLy8gICAgIC8v6YeN5paw6I635Y+W55uu5qCH77yM5pyJ55uu5qCH5YiZ6L+b6KGM5LiL5LiA5qyh5pS75Ye777yM5peg55uu5qCH5Zue5Yiw5b6F5py66Zi25q61XHJcbiAgICAgICAgLy8gICAgIG1hY2hpbmUua2VlcGVyLmZvY3VzID0gc2Vla2VyLmdldEZvY3VzKCk7XHJcbiAgICAgICAgLy8gICAgIG1hY2hpbmUuY2hhbmdlU3RhdGUobWFjaGluZS5rZWVwZXIuZm9jdXMgPyBTdGF0ZVR5cGUuUFJFUEFSRSA6IFN0YXRlVHlwZS5XQUlUKTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDnirbmgIHmnLrnsbtcclxuICovXHJcbmV4cG9ydCBjbGFzcyBBdGtTdGF0ZU1hY2hpbmUge1xyXG4gICAgLypcclxuICAgICog5omA5bGeQWN0b3JcclxuICAgICogKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBrZWVwZXI6IEFjdG9yO1xyXG4gICAgLyoqXHJcbiAgICAgKiDlvZPliY3nirbmgIFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjdXJTdGF0ZTogU3RhdGU7XHJcbiAgICAvKipcclxuICAgICAqIOWPr+S9v+eUqOeahOeKtuaAgeWIl+ihqFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRlTGlzdDogS1ZQYWlyPFN0YXRlPiA9IG5ldyBLVlBhaXI8U3RhdGU+KCk7XHJcblxyXG4gICAgcHVibGljIHNlZWtlcjogU2Vla2VyO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBrZWVwZXIg54q25oCB5py65omA5pyJ6ICFXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGtlZXBlcjogQWN0b3IsIHJlczphbnkpIHtcclxuICAgICAgICB0aGlzLmtlZXBlciA9IGtlZXBlcjtcclxuICAgICAgICB0aGlzLmN1clN0YXRlID0gbmV3IFdhaXQoKTtcclxuICAgICAgICB0aGlzLnN0YXRlTGlzdC5lZGl0KFN0YXRlVHlwZS5XQUlULCB0aGlzLmN1clN0YXRlKTtcclxuICAgICAgICB0aGlzLnN0YXRlTGlzdC5lZGl0KFN0YXRlVHlwZS5QUkVQQVJFLCBuZXcgUHJlcGFyZSgpKTtcclxuICAgICAgICB0aGlzLnN0YXRlTGlzdC5lZGl0KFN0YXRlVHlwZS5BRlRFUl9BVEssIG5ldyBBZnRlckF0aygpKTtcclxuICAgICAgICAvL3RvZG86IGFib3V0IHJlc1xyXG5cclxuICAgICAgICB0aGlzLnNlZWtlciA9IG51bGw7Ly/liJ3lp4vljJZTZWVrZXJcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIt+aWsOW9k+WJjeeKtuaAge+8jOavj+W4p+iwg+eUqFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmtlZXBlcikge1xyXG4gICAgICAgICAgICB0aGlzLmN1clN0YXRlLmV4ZWN1dGUodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pS55Y+Y5b2T5YmN54q25oCB77yM5paw54q25oCB5Lya6YeN572u5Li65Yid5aeL5oCBXHJcbiAgICAgKiBAcGFyYW0gc3RhdGVUeXBlIOaWsOeahOeKtuaAgeexu+Wei1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2hhbmdlU3RhdGUoc3RhdGVUeXBlOiBTdGF0ZVR5cGUpIHtcclxuICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLnN0YXRlTGlzdC5yZWFkKHN0YXRlVHlwZSk7XHJcbiAgICAgICAgc3RhdGUucmVzZXQoKTtcclxuICAgICAgICB0aGlzLmN1clN0YXRlID0gc3RhdGU7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG4iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQmxvY2tlcntcclxuICAgIGNvbnN0cnVjdG9yKGtlZXBlcjpBY3Rvcil7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQWN0b3JTdGF0ZUJhc2UgZnJvbSBcIi4vQWN0b3JTdGF0ZUJhc2VcIjtcclxuaW1wb3J0IERvZExvZyBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0RvZExvZ1wiO1xyXG5pbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcblxyXG5leHBvcnQgZW51bSBBY3RvclN0YXRlSUQge1xyXG4gICAgTm9uZSxcclxuICAgIFByZXByZWQsICAgICAvL+W+heacuiAo5pyq5Ye65YqoL+acqumDqOe9sikgIFxyXG4gICAgQm9ybiwgICAvL+WHuueUn+WKqOeUuyDkuI3lj6/mlLvlh7sg5LiN5Y+v6KKr5pS75Ye7XHJcbiAgICBXYWxrLCAgIC8v56e75YqoIOaVjOS6uueUqFxyXG4gICAgU3R1bm5lZCwgICAgLy/mmZXnnKkg5Yaw5Ya7IGV0Y1xyXG4gICAgRmlnaHQsICAvL+aZruaUu+eKtuaAgSDlubLlkZjluLjmgIEg5pWM5Lq66KKr6Zi75oyh5ZCOXHJcbiAgICBEZWF0aCwgIC8v5q275Lqh5Yqo55S7IOS4jeWPr+aUu+WHuyDkuI3lj6/ooqvmlLvlh7tcclxuICAgIEVzY2FwZSwgLy/mlYzkurrpgIPohLFcclxuICAgIENvdW50XHJcbn1cclxuXHJcbi8qXHJcbiAqIOinkuiJsueKtuaAgeacuiDnrqHnkIbop5LoibLmiYDlpITpmLbmrrUg5qC55o2u5LiN5ZCM6Zi25q615Yaz5a6a5LiN5ZCM55qE57uE5Lu254q25oCBXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3RvclN0YXRlTWdyIHtcclxuICAgIHByaXZhdGUgX3N0YXRlczogQWN0b3JTdGF0ZUJhc2VbXTtcclxuICAgIHByaXZhdGUgX2N1cnJlbnRTdGF0ZTogQWN0b3JTdGF0ZUJhc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYWN0b3I6IEFjdG9yKSB7XHJcbiAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlID0gbnVsbDtcclxuXHJcbiAgICAgICAgLy9UT0RPXHJcbiAgICAgICAgLy/lj4LnhafmuLjmiI/lpKfnirbmgIHmnLpcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ydW5TdGF0ZShBY3RvclN0YXRlSUQuTm9uZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJ1blN0YXRlKHN0YXRlSUQ6IEFjdG9yU3RhdGVJRCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChBY3RvclN0YXRlSUQuQ291bnQgPD0gc3RhdGVJRCB8fCBzdGF0ZUlEIDw9IEFjdG9yU3RhdGVJRC5Ob25lKSB7XHJcbiAgICAgICAgICAgIERvZExvZy5lcnJvcihgR2FtZVN0YXRlTWdyLnJ1blN0YXRlOiBJbnZhbGlkIHN0YXRlSUQgWyR7c3RhdGVJRH1dLiBgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG51bGwgIT0gdGhpcy5fY3VycmVudFN0YXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZS5sZWF2ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlID0gdGhpcy5fc3RhdGVzW3N0YXRlSURdO1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZS5lbnRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKG51bGwgIT0gdGhpcy5fY3VycmVudFN0YXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZS51cGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChudWxsICE9IHRoaXMuX2N1cnJlbnRTdGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUubGVhdmUoKTtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fc3RhdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuX3N0YXRlc1tpXTtcclxuICAgICAgICAgICAgc3RhdGUucmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yL0FjdG9yXCI7XHJcbmltcG9ydCB7TXlTeW1ib2x9IGZyb20gXCIuLi8uLi9GaXgvRml4U3ltYm9sXCI7XHJcbmltcG9ydCB7Q2lyY2xlQ29sbGlzaW9uUmFuZ2V9IGZyb20gXCIuL0NvbGxpc2lvblJhbmdlXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIOeisOaSnuWkhOeQhuWZqO+8jOivpeexu+e7tOaKpOS4gOS4qk1hcO+8jE1hcOiusOW9leaJgOaciemcgOimgei/m+ihjOeisOaSnuWkhOeQhueahOeisOaSnuWZqO+8jE1hcOeUqOeisOaSnuWZqOeahOWUr+S4gOagh+ivhuS9nOS4uumUruS7pemBv+WFjemHjeWkjeiusOW9leOAglxyXG4gKlxyXG4gKiDor6Xnsbvmj5DkvpvkuIDkuKpyZWNhbGN1bGF0ZeaWueazleeUqOS6jumHjeaWsOiuoeeul+eisOaSnuaDheWGte+8jOWvueS6jk1hcOS4reeahOavj+S4quWkhOeQhuWvueixoe+8jOivpeaWueazleiuoeeul+WFtuS4jk1hcOS4reeahOaJgOacieWFtuS7luWvueixoVxyXG4gKiDnmoTph43lj6Dmg4XlhrXvvIzlubblsIbov5nkupvph43lj6DnmoTlhbbku5blr7nosaHku6XliJfooajnmoTlvaLlvI/kvKDpgJLnu5nor6XlpITnkIblr7nosaHjgIJcclxuICpcclxuICogYnkgWFdWXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQWN0b3JDb2xsaXNpb25Qcm9jZXNzb3Ige1xyXG5cclxuICAgIHByaXZhdGUgY29sbGlkZXJNYXA6IHsgW2tleTogbnVtYmVyXTogQWN0b3JDb2xsaWRlciB9ID0ge307XHJcblxyXG4gICAgcHVibGljIHJlZ2lzdGVyQ29sbGlkZXIoY29sbGlkZXI6IEFjdG9yQ29sbGlkZXIpIHtcclxuICAgICAgICB0aGlzLmNvbGxpZGVyTWFwW2NvbGxpZGVyLnN5bWJvbC5kYXRhXSA9IGNvbGxpZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1bnJlZ2lzdGVyQ29sbGlkZXIoY29sbGlkZXI6IEFjdG9yQ29sbGlkZXIpIHtcclxuICAgICAgICBkZWxldGUgdGhpcy5jb2xsaWRlck1hcFtjb2xsaWRlci5zeW1ib2wuZGF0YV07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpIHtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMuY29sbGlkZXJNYXApIHtcclxuICAgICAgICAgICAgbGV0IHRhcmdldENvbGxpZGVyID0gdGhpcy5jb2xsaWRlck1hcFtpXTtcclxuICAgICAgICAgICAgbGV0IGNvbGxpZGluZ0xpc3QgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiBpbiB0aGlzLmNvbGxpZGVyTWFwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29sbGlkZXIgPSB0aGlzLmNvbGxpZGVyTWFwW2pdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbGxpZGVyID09IHRhcmdldENvbGxpZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0Q29sbGlkZXIuc2hvdWxkQ29sbGlkZVdpdGgoY29sbGlkZXIpICYmIHRhcmdldENvbGxpZGVyLmdldENvbGxpc2lvblJhbmdlKCkuaXNDb2luY2lkZVdpdGhSYW5nZShjb2xsaWRlci5nZXRDb2xsaXNpb25SYW5nZSgpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxpZGluZ0xpc3QucHVzaChjb2xsaWRlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGFyZ2V0Q29sbGlkZXIub25Db2xsaWRpbmdMaXN0UmVmcmVzaChjb2xsaWRpbmdMaXN0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFjdG9yQ29sbGlkZXIge1xyXG4gICAgLy/llK/kuIDmoIfor4ZcclxuICAgIHB1YmxpYyByZWFkb25seSBzeW1ib2w6IE15U3ltYm9sID0gbmV3IE15U3ltYm9sKCk7XHJcblxyXG4gICAgLy/ojrflj5bnorDmkp7ojIPlm7RcclxuICAgIGFic3RyYWN0IGdldENvbGxpc2lvblJhbmdlKCk6IENpcmNsZUNvbGxpc2lvblJhbmdlIDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmHjeiuvueisOaSnuiMg+WbtFxyXG4gICAgICogQHBhcmFtIHJhbmdlIOaWsOeahOeisOaSnuiMg+WbtFxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBzZXRDb2xsaXNpb25SYW5nZShyYW5nZTogQ2lyY2xlQ29sbGlzaW9uUmFuZ2UpO1xyXG5cclxuICAgIC8v6I635Y+W56Kw5pKe5Zmo55qE5omA5pyJ6ICFXHJcbiAgICBhYnN0cmFjdCBnZXRBY3RvcigpOiBBY3RvcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOeisOaSnuWIl+ihqOmcgOimgeWIt+aWsFxyXG4gICAgICogQHBhcmFtIGNvbGxpZGluZ0xpc3Qg5paw55qE56Kw5pKe5YiX6KGoXHJcbiAgICAgKiAqL1xyXG4gICAgYWJzdHJhY3Qgb25Db2xsaWRpbmdMaXN0UmVmcmVzaChjb2xsaWRpbmdMaXN0OiBBY3RvckNvbGxpZGVyW10pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm5bqU6K+l5LiO5oyH5a6a56Kw5pKe5Zmo5Y+R55Sf56Kw5pKeXHJcbiAgICAgKiBAcGFyYW0gY29sbGlkZXIg5Y+m5LiA5Liq56Kw5pKe5ZmoXHJcbiAgICAgKiAqL1xyXG4gICAgYWJzdHJhY3Qgc2hvdWxkQ29sbGlkZVdpdGgoY29sbGlkZXI6IEFjdG9yQ29sbGlkZXIpOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b2T5YmN56Kw5pKe5YiX6KGoXHJcbiAgICAgKiAqL1xyXG4gICAgYWJzdHJhY3QgZ2V0Q29sbGlkaW5nTGlzdCgpOiBBY3RvckNvbGxpZGVyW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliLfmlrDnorDmkp7ojIPlm7TvvIzkvb/lhbbot5/pmo/miYDmnInogIXnp7vliqhcclxuICAgICAqICovXHJcbiAgICBhYnN0cmFjdCByZWZyZXNoQ29sbGlzaW9uUmFuZ2VGb2xsb3dBY3RvcigpO1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNpbXBsZUFjdG9yQ29sbGlkZXIgZXh0ZW5kcyBBY3RvckNvbGxpZGVyIHtcclxuXHJcbiAgICBwcml2YXRlIGNvbGxpZGluZ0xpc3Q6IEFjdG9yQ29sbGlkZXJbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBhY3RvcjogQWN0b3I7XHJcbiAgICBwcml2YXRlIHJhbmdlOiBDaXJjbGVDb2xsaXNpb25SYW5nZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhY3RvcjogQWN0b3IsIHJhbmdlOiBDaXJjbGVDb2xsaXNpb25SYW5nZSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5hY3RvciA9IGFjdG9yO1xyXG4gICAgICAgIHRoaXMucmFuZ2UgPSByYW5nZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0Q29sbGlzaW9uUmFuZ2UoKTogQ2lyY2xlQ29sbGlzaW9uUmFuZ2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJhbmdlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldENvbGxpc2lvblJhbmdlKHJhbmdlOiBDaXJjbGVDb2xsaXNpb25SYW5nZSkge1xyXG4gICAgICAgIHRoaXMucmFuZ2UgPSByYW5nZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBY3RvcigpOiBBY3RvciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q29sbGlkaW5nTGlzdCgpOiBBY3RvckNvbGxpZGVyW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbGxpZGluZ0xpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgb25Db2xsaWRpbmdMaXN0UmVmcmVzaChjb2xsaWRpbmdMaXN0OiBBY3RvckNvbGxpZGVyW10pIHtcclxuICAgICAgICB0aGlzLmNvbGxpZGluZ0xpc3QgPSBjb2xsaWRpbmdMaXN0O1xyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJpbXBvcnQgR2FtZU1hcCBmcm9tIFwiLi9HYW1lTGV2ZWxcIjtcclxuaW1wb3J0IHsgQWN0b3JDb2xsaXNpb25Qcm9jZXNzb3IgfSBmcm9tIFwiLi9Db2xsaXNpb24vQWN0b3JDb2xsaXNpb25Qcm9jZXNzb3JcIjtcclxuaW1wb3J0IEdhbWVMZXZlbCBmcm9tIFwiLi9HYW1lTGV2ZWxcIjtcclxuaW1wb3J0IERvZFJlc291cmNlTWdyIGZyb20gXCIuLi9SZXNvdXJjZXMvRG9kUmVzb3VyY2VNZ3JcIjtcclxuaW1wb3J0IEFjdG9yTWdyIGZyb20gXCIuL0FjdG9yL0FjdG9yTWdyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQmF0dGxlIHtcclxuICAgIHB1YmxpYyBsZXZlbDogR2FtZUxldmVsO1xyXG4gICAgcHVibGljIG1hcDogR2FtZU1hcDtcclxuICAgIHB1YmxpYyBhY3Rvck1ncjogQWN0b3JNZ3I7XHJcblxyXG4gICAgcHVibGljIGNvbGxpc2lvbjogQWN0b3JDb2xsaXNpb25Qcm9jZXNzb3I7XHJcblxyXG4gICAgcHJpdmF0ZSBfbGV2ZWxQcmVwYXJlZDogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmxldmVsID0gbmV3IEdhbWVMZXZlbCgpO1xyXG4gICAgICAgIHRoaXMubWFwID0gbmV3IEdhbWVNYXAoKTtcclxuICAgICAgICB0aGlzLmFjdG9yTWdyID0gbmV3IEFjdG9yTWdyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY29sbGlzaW9uID0gbmV3IEFjdG9yQ29sbGlzaW9uUHJvY2Vzc29yKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHByZXBhcmVMZXZlbCgpOiB2b2lkIHtcclxuICAgICAgICAvL1RPRE8gaW5pdCBsZXZlbCBpbmZvcm1hdGlvblxyXG4gICAgICAgIGxldCByZXMgPSBEb2RSZXNvdXJjZU1nci5JbnN0YW5jZS5nZXRDdXJyZW50TGV2ZWxSZXMoKTtcclxuICAgICAgICB0aGlzLmxldmVsLmluaXQocmVzWydsZXZlbCddKTsgLy9qdXN0IHNhbXBsZVxyXG4gICAgICAgIHRoaXMubWFwLmluaXQocmVzWydtYXAnXSk7XHJcbiAgICAgICAgdGhpcy5hY3Rvck1nci5pbml0KHJlc1snbWFwJ10pO1xyXG5cclxuICAgICAgICAvL0FORCBET05UIEZPUkdFVCBSRVNFVCBMQVNUIEJBVFRMRSBEQVRBIFJFTUFJTlMuIFxyXG4gICAgICAgIC8vdGhpcy5jb2xsaXNpb24ucmVzZXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fbGV2ZWxQcmVwYXJlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzTGV2ZWxQcmVwcmFyZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xldmVsUHJlcGFyZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIC8vVE9ET1xyXG4gICAgICAgIC8vQ0xFQVIgTEFTVCBCQVRUTEUgUkVTT1VSQ0VcclxuICAgICAgICB0aGlzLl9sZXZlbFByZXBhcmVkID0gZmFsc2U7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQmF0dGxlQ29uc3Qge1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBzdGFuZGFyZENvc3RJbmNyZWFzZVJhdGlvOiBudW1iZXIgPSAxO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBtYXhDb3N0TnVtOiBudW1iZXIgPSA5OTtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgaW5pdENvc3ROdW06IG51bWJlciA9IDY7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGxpZmVQb2ludDogbnVtYmVyID0gMztcclxufSIsImltcG9ydCB7IEJ1ZmYgfSBmcm9tIFwiLi9BY3Rvci9BY3Rvck1vZHVsZXMvQnVmZlwiO1xyXG5pbXBvcnQgeyBFdmVudENlbnRyZSB9IGZyb20gXCIuLi9FdmVudC9FdmVudENlbnRyZVwiO1xyXG5pbXBvcnQgRml4VGltZSBmcm9tIFwiLi4vRml4L0ZpeFRpbWVcIjtcclxuaW1wb3J0IERvZFJlc291cmNlTWdyIGZyb20gXCIuLi9SZXNvdXJjZXMvRG9kUmVzb3VyY2VNZ3JcIjtcclxuaW1wb3J0IEdhbWVCYXR0bGVDb25zdCBmcm9tIFwiLi9HYW1lQmF0dGxlQ29uc3RcIjtcclxuLyoqXHJcbiAqIOaooeWdl+ivtOaYjjog5ri45oiP5oiY5paX5Zyw5Zu+5qih5Z2XICBcclxuICog6LSf6LSj5YaF5a65OiDlnLDlm77lsZ7mgKforr7nva7vvIzlhajlsYBidWZm566h55CGICBcclxuICog6LSf6LSj5Lq6OiDpk7bljY4gIFxyXG4gKiDml7bpl7Q6IDIwMjDlubQz5pyIM+aXpTEyOjQ1OjQxICBcclxuICovXHJcblxyXG4vL0tSOiDlhajlsYDnlLHlhbPljaHmqKHlnZfnrqHnkIYgQOmTtuWNjlxyXG4vL+i/memHjOWPr+S7peWMheWQq+WFqOWxgOeahOiwg+aVtOWAvC/nlJ/lkb3lgLwv5rao6LS5XHJcbi8v5YWo5ri45oiP5qCH5YeG5YC85L2/55So5bi46YeP5a6a5LmJ5ZyoQmF0dGxlQ29uc3TnsbvkuK0g56S65L6L5Y+v5Lul55yL5LiL5pa5XHJcbi8v5Y+m77ya56eB5pyJ5oiQ5ZGY5ZG95ZCN6K+35Zyo5YmN6Z2i5Yqg5LiL5YiS57q/IOWjsOaYjueahOaIkOWRmOivt+WcqOaehOmAoOWHveaVsOS4reWFqOmDqOWIneWni+WMluS4gOS4quWAvO+8jOmYsuatonVuZGVmaW5lZCjph47mjIfpkogp55qE5oOF5Ya15Y+R55SfXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lTGV2ZWx7XHJcbiAgICBwcml2YXRlIF9pbml0aWFsQ29zdDpudW1iZXI7XHJcbiAgICBwcml2YXRlIF9jdXJyZW50Q29zdDpudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfbGlmZVBvaW50Om51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIF90aW1lTGluZTpudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2xvYmFsQnVmZkxpc3Q6IEJ1ZmZbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuX2luaXRpYWxDb3N0ID0gMDtcclxuICAgICAgICB0aGlzLl9jdXJyZW50Q29zdCA9IDA7XHJcbiAgICAgICAgdGhpcy5fbGlmZVBvaW50ID0gMDtcclxuICAgICAgICB0aGlzLl90aW1lTGluZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fZ2xvYmFsQnVmZkxpc3QgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdChyZXM6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIC8vZm9yIGV4YW1wbGVcclxuICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICAgICAgdGhpcy5faW5pdGlhbENvc3QgPSB0aGlzLl9jdXJyZW50Q29zdCA9IHJlc1snaW5pdENvc3QnXSB8fCBHYW1lQmF0dGxlQ29uc3QuaW5pdENvc3ROdW07XHJcbiAgICAgICAgdGhpcy5fbGlmZVBvaW50ID0gcmVzWydsaWZlJ10gfHwgR2FtZUJhdHRsZUNvbnN0LmxpZmVQb2ludDtcclxuICAgICAgICB0aGlzLl90aW1lTGluZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5nZXRHbG9iYWxCdWZmTGlzdCgpO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZVRpbWUoKTsgXHJcbiAgICAgICAgdGhpcy5fdXBkYXRlQ29zdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRHbG9iYWxCdWZmTGlzdCgpOkJ1ZmZbXXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2xvYmFsQnVmZkxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoYW5nZUNvc3QoKTp2b2lke1xyXG4gICAgICAgIC8vdG9kby4uLi5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF91cGRhdGVUaW1lKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3RpbWVMaW5lICs9IEZpeFRpbWUuZGVsdGFUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3VwZGF0ZUNvc3QoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9nbG9iYWxCdWZmTGlzdC5zcGxpY2UoMCwgdGhpcy5fZ2xvYmFsQnVmZkxpc3QubGVuZ3RoKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgRG9kTG9nIGZyb20gXCIuLi9Db21tb24vRG9kTG9nXCI7XHJcbmltcG9ydCBHYW1lU3RhdGVNZ3IgZnJvbSBcIi4vU3RhdGUvR2FtZVN0YXRlTWdyXCI7XHJcbmltcG9ydCBHYW1lQmF0dGxlIGZyb20gXCIuL0dhbWVCYXR0bGVcIjtcclxuaW1wb3J0IEdhbWVMb2JieSBmcm9tIFwiLi9Mb2JieS9HYW1lTG9iYnlcIjtcclxuXHJcbi8qKlxyXG4gKiDov5nmmK/muLjmiI/mnKzkvZNcclxuICog6K+05LiA5LqbUmhvZGVzX0dhbWXmlofku7blpLnkuIvnmoTms6jph4rop4TliJnvvIzmlrnkvr/ku6XlkI5jdHJsK2ZcclxuICpcclxuICogMS4vL0B0b2RvIOagh+azqOmcgOimgeWujOWWhOeahOmDqOWIhlxyXG4gKlxyXG4gKiAyLi8vQHRvZml4IOagh+azqOW3suefpeaciemXrumimOeahOmDqOWIhlxyXG4gKlxyXG4gKiAzLi8vQHRlc3Qg5qCH5rOo5LuF5L6b5rWL6K+V5L2/55So55qE6YOo5YiGXHJcbiAqXHJcbiAqIDMuLy9AcmVkY2FsbCDmoIfms6josIPnlKjmuLLmn5PmqKHlnZfnmoTpg6jliIZcclxuICpcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJob2Rlc0dhbWUge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBSaG9kZXNHYW1lO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSW5zdGFuY2UoKTogUmhvZGVzR2FtZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlIHx8ICh0aGlzLl9pbnN0YW5jZSA9IG5ldyB0aGlzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0ZU1ncjogR2FtZVN0YXRlTWdyO1xyXG4gICAgcHVibGljIGJhdHRsZTogR2FtZUJhdHRsZTtcclxuICAgIHB1YmxpYyBsb2JieTogR2FtZUxvYmJ5O1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmJhdHRsZSA9IG5ldyBHYW1lQmF0dGxlKCk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZU1nciA9IG5ldyBHYW1lU3RhdGVNZ3IodGhpcy5iYXR0bGUpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGVNZ3IuaW5pdCgpO1xyXG4gICAgICAgIERvZExvZy5kZWJ1ZyhgUmhvZGVzR2FtZTogaW5pdGlhbGl6YXRpb24gY29tcGxldGUuIGApXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXRlTWdyLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJpbXBvcnQgR2FtZUJhdHRsZSBmcm9tIFwiLi4vR2FtZUJhdHRsZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVN0YXRlQmFzZSB7XHJcbiAgICBwcm90ZWN0ZWQgX2JhdHRsZTogR2FtZUJhdHRsZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihiYXR0bGU6IEdhbWVCYXR0bGUpIHtcclxuICAgICAgICB0aGlzLl9iYXR0bGUgPSBiYXR0bGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudGVyKCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbGVhdmUoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgR2FtZVN0YXRlQmFzZSBmcm9tIFwiLi9HYW1lU3RhdGVCYXNlXCI7XHJcbmltcG9ydCBSaG9kZXNHYW1lIGZyb20gXCIuLi9SaG9kZXNHYW1lXCI7XHJcbmltcG9ydCBHYW1lQmF0dGxlIGZyb20gXCIuLi9HYW1lQmF0dGxlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU3RhdGVCYXR0bGUgZXh0ZW5kcyBHYW1lU3RhdGVCYXNle1xyXG4gICAgY29uc3RydWN0b3IoYmF0dGxlOkdhbWVCYXR0bGUpIHtcclxuICAgICAgICBzdXBlcihiYXR0bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnRlcigpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5lbnRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsZWF2ZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5sZWF2ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fYmF0dGxlLm1hcC51cGRhdGUoKTtcclxuICAgIH1cclxufSIsImltcG9ydCBHYW1lU3RhdGVCYXNlIGZyb20gXCIuL0dhbWVTdGF0ZUJhc2VcIjtcclxuaW1wb3J0IFJob2Rlc0dhbWUgZnJvbSBcIi4uL1Job2Rlc0dhbWVcIjtcclxuaW1wb3J0IERvZFJlc291cmNlTWdyIGZyb20gXCIuLi8uLi9SZXNvdXJjZXMvRG9kUmVzb3VyY2VNZ3JcIjtcclxuaW1wb3J0IHsgR2FtZVN0YXRlSUQgfSBmcm9tIFwiLi9HYW1lU3RhdGVNZ3JcIjtcclxuaW1wb3J0IERvZExvZyBmcm9tIFwiLi4vLi4vQ29tbW9uL0RvZExvZ1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVN0YXRlR2FtZWxvYWQgZXh0ZW5kcyBHYW1lU3RhdGVCYXNle1xyXG4gICAgY29uc3RydWN0b3IoYmF0dGxlKSB7XHJcbiAgICAgICAgc3VwZXIoYmF0dGxlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW50ZXIoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuZW50ZXIoKTtcclxuICAgICAgICAvL1RPRE8gU0hPVyBMT0FESU5HIFNDUkVFTlxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsZWF2ZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5sZWF2ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKCk7XHJcbiAgICAgICAgaWYgKHRydWUgPT0gRG9kUmVzb3VyY2VNZ3IuSW5zdGFuY2UuaW5pdGVkKCkpIHtcclxuICAgICAgICAgICAgLy9XRSBETyBOT1QgSEFWRSBMT0JCWSBNT0RVTEUgSU4gVEhJUyBWRVJTSU9OXHJcbiAgICAgICAgICAgIC8vSlVTVCBTRVQgTEVWRUwgSUQgSEVSRVxyXG4gICAgICAgICAgICAvL1RPIERFTFxyXG4gICAgICAgICAgICBEb2RSZXNvdXJjZU1nci5JbnN0YW5jZS5zZXRMZXZlbElEKDEpO1xyXG4gICAgICAgICAgICBSaG9kZXNHYW1lLkluc3RhbmNlLnN0YXRlTWdyLnJ1blN0YXRlKEdhbWVTdGF0ZUlELkxldmVsbG9hZCk7XHJcbiAgICAgICAgICAgIERvZExvZy5kZWJ1ZyhgR2FtZVN0YXRlR2FtZWxvYWQudXBkYXRlOiBSZXNvdXJjZXMgaW5pdCBjb21wbGV0ZSwgc2V0IGxldmVsIGludG8gMS4gYCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEdhbWVTdGF0ZUJhc2UgZnJvbSBcIi4vR2FtZVN0YXRlQmFzZVwiO1xyXG5pbXBvcnQgUmhvZGVzR2FtZSBmcm9tIFwiLi4vUmhvZGVzR2FtZVwiO1xyXG5pbXBvcnQgeyBHYW1lU3RhdGVJRCB9IGZyb20gXCIuL0dhbWVTdGF0ZU1nclwiO1xyXG5pbXBvcnQgRG9kUmVzb3VyY2VNZ3IgZnJvbSBcIi4uLy4uL1Jlc291cmNlcy9Eb2RSZXNvdXJjZU1nclwiO1xyXG5pbXBvcnQgRG9kTG9nIGZyb20gXCIuLi8uLi9Db21tb24vRG9kTG9nXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU3RhdGVMZXZlbExvYWQgZXh0ZW5kcyBHYW1lU3RhdGVCYXNle1xyXG4gICAgY29uc3RydWN0b3IoYmF0dGxlKSB7XHJcbiAgICAgICAgc3VwZXIoYmF0dGxlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW50ZXIoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuZW50ZXIoKTtcclxuICAgICAgICB0aGlzLl9iYXR0bGUucHJlcGFyZUxldmVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxlYXZlKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmxlYXZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLnJlc2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci51cGRhdGUoKTtcclxuICAgICAgICBpZiAodHJ1ZSA9PSBEb2RSZXNvdXJjZU1nci5JbnN0YW5jZS5pc0xldmVsUHJlcGFyZWQoKSkge1xyXG4gICAgICAgICAgICBpZiAodHJ1ZSA9PSB0aGlzLl9iYXR0bGUuaXNMZXZlbFByZXByYXJlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICBSaG9kZXNHYW1lLkluc3RhbmNlLnN0YXRlTWdyLnJ1blN0YXRlKEdhbWVTdGF0ZUlELkJhdHRsZSk7XHJcbiAgICAgICAgICAgICAgICBEb2RMb2cuZGVidWcoYEdhbWVTdGF0ZUxldmVsbG9hZC51cGRhdGU6IGxldmVsIFske0RvZFJlc291cmNlTWdyLkluc3RhbmNlLmdldExldmVsSUQoKX1dIGlzIHByZXBhcmVkLiBgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBHYW1lU3RhdGVCYXNlIGZyb20gXCIuL0dhbWVTdGF0ZUJhc2VcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTdGF0ZUxvYmJ5IGV4dGVuZHMgR2FtZVN0YXRlQmFzZXtcclxuICAgIGNvbnN0cnVjdG9yKGJhdHRsZSkge1xyXG4gICAgICAgIHN1cGVyKGJhdHRsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudGVyKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmVudGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxlYXZlKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmxlYXZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLnJlc2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci51cGRhdGUoKTtcclxuICAgIH1cclxufSIsImltcG9ydCBHYW1lU3RhdGVCYXNlIGZyb20gXCIuL0dhbWVTdGF0ZUJhc2VcIjtcclxuaW1wb3J0IEdhbWVTdGF0ZUJhdHRsZSBmcm9tIFwiLi9HYW1lU3RhdGVCYXR0bGVcIjtcclxuaW1wb3J0IERvZExvZyBmcm9tIFwiLi4vLi4vQ29tbW9uL0RvZExvZ1wiO1xyXG5pbXBvcnQgR2FtZVN0YXRlTGV2ZWxMb2FkIGZyb20gXCIuL0dhbWVTdGF0ZUxldmVsbG9hZFwiO1xyXG5pbXBvcnQgR2FtZVN0YXRlR2FtZWxvYWQgZnJvbSBcIi4vR2FtZVN0YXRlR2FtZWxvYWRcIjtcclxuaW1wb3J0IEdhbWVTdGF0ZUxvYmJ5IGZyb20gXCIuL0dhbWVTdGF0ZUxvYmJ5XCI7XHJcbmltcG9ydCBSaG9kZXNHYW1lIGZyb20gXCIuLi9SaG9kZXNHYW1lXCI7XHJcbmltcG9ydCBHYW1lQmF0dGxlIGZyb20gXCIuLi9HYW1lQmF0dGxlXCI7XHJcblxyXG5leHBvcnQgZW51bSBHYW1lU3RhdGVJRCB7XHJcbiAgICBOb25lLFxyXG4gICAgR2FtZWxvYWQsXHJcbiAgICBMb2JieSxcclxuICAgIExldmVsbG9hZCxcclxuICAgIEJhdHRsZSxcclxuICAgIENvdW50XHJcbn1cclxuXHJcbi8qXHJcbiAqIOWkp+eKtuaAgeacuiDnrqHnkIbmuLjmiI/miYDlpITpmLbmrrVcclxuICogQFRPRE8gR0FNRUxPQUQgTE9CQlkgTEVWRUxMT0FEIEJBVFRMRVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVN0YXRlTWdyIHtcclxuICAgIHByaXZhdGUgX3N0YXRlczogR2FtZVN0YXRlQmFzZVtdO1xyXG4gICAgcHJpdmF0ZSBfY3VycmVudFN0YXRlOiBHYW1lU3RhdGVCYXNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGJhdHRsZTpHYW1lQmF0dGxlKSB7XHJcbiAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlID0gbnVsbDtcclxuICAgICAgICAvLyBsZXQgYmF0dGxlID0gUmhvZGVzR2FtZS5JbnN0YW5jZS5iYXR0bGU7XHJcbiAgICBcclxuICAgICAgICB0aGlzLl9zdGF0ZXMgPSBbXTtcclxuICAgICAgICB0aGlzLl9zdGF0ZXMucHVzaChudWxsKTtcclxuICAgICAgICB0aGlzLl9zdGF0ZXMucHVzaChuZXcgR2FtZVN0YXRlR2FtZWxvYWQoYmF0dGxlKSk7XHJcbiAgICAgICAgdGhpcy5fc3RhdGVzLnB1c2gobmV3IEdhbWVTdGF0ZUxvYmJ5KGJhdHRsZSkpO1xyXG4gICAgICAgIHRoaXMuX3N0YXRlcy5wdXNoKG5ldyBHYW1lU3RhdGVMZXZlbExvYWQoYmF0dGxlKSk7XHJcbiAgICAgICAgdGhpcy5fc3RhdGVzLnB1c2gobmV3IEdhbWVTdGF0ZUJhdHRsZShiYXR0bGUpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ydW5TdGF0ZShHYW1lU3RhdGVJRC5HYW1lbG9hZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJ1blN0YXRlKHN0YXRlSUQ6IEdhbWVTdGF0ZUlEKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKEdhbWVTdGF0ZUlELkNvdW50IDw9IHN0YXRlSUQgfHwgc3RhdGVJRCA8PSBHYW1lU3RhdGVJRC5Ob25lKSB7XHJcbiAgICAgICAgICAgIERvZExvZy5lcnJvcihgR2FtZVN0YXRlTWdyLnJ1blN0YXRlOiBJbnZhbGlkIHN0YXRlSUQgWyR7c3RhdGVJRH1dLiBgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG51bGwgIT0gdGhpcy5fY3VycmVudFN0YXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZS5sZWF2ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlID0gdGhpcy5fc3RhdGVzW3N0YXRlSURdO1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZS5lbnRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKG51bGwgIT0gdGhpcy5fY3VycmVudFN0YXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZS51cGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChudWxsICE9IHRoaXMuX2N1cnJlbnRTdGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUubGVhdmUoKTtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fc3RhdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuX3N0YXRlc1tpXTtcclxuICAgICAgICAgICAgc3RhdGUucmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgR2FtZUNvbmZpZyBmcm9tIFwiLi9HYW1lQ29uZmlnXCI7XHJcbmltcG9ydCBTY2VuZU1hbmFnZXIgZnJvbSBcIi4vU2NlbmVNYW5hZ2VyXCI7XHJcbmltcG9ydCBGaXhUaW1lIGZyb20gXCIuL0ZpeC9GaXhUaW1lXCI7XHJcbmltcG9ydCBSaG9kZXNHYW1lIGZyb20gXCIuL0dhbWUvUmhvZGVzR2FtZVwiO1xyXG5pbXBvcnQgeyBFdmVudENlbnRyZSB9IGZyb20gXCIuL0V2ZW50L0V2ZW50Q2VudHJlXCI7XHJcbmltcG9ydCBEb2RSZXNvdXJjZU1nciBmcm9tIFwiLi9SZXNvdXJjZXMvRG9kUmVzb3VyY2VNZ3JcIjtcclxuXHJcbmNsYXNzIE1haW4ge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0Ly/moLnmja5JREXorr7nva7liJ3lp4vljJblvJXmk45cdFx0XHJcblx0XHRpZiAod2luZG93W1wiTGF5YTNEXCJdKSBMYXlhM0QuaW5pdChHYW1lQ29uZmlnLndpZHRoLCBHYW1lQ29uZmlnLmhlaWdodCk7XHJcblx0XHRlbHNlIExheWEuaW5pdChHYW1lQ29uZmlnLndpZHRoLCBHYW1lQ29uZmlnLmhlaWdodCwgTGF5YVtcIldlYkdMXCJdKTtcclxuXHRcdExheWFbXCJQaHlzaWNzXCJdICYmIExheWFbXCJQaHlzaWNzXCJdLmVuYWJsZSgpO1xyXG5cdFx0TGF5YVtcIkRlYnVnUGFuZWxcIl0gJiYgTGF5YVtcIkRlYnVnUGFuZWxcIl0uZW5hYmxlKCk7XHJcblx0XHRMYXlhLnN0YWdlLnNjYWxlTW9kZSA9IEdhbWVDb25maWcuc2NhbGVNb2RlO1xyXG5cdFx0TGF5YS5zdGFnZS5zY3JlZW5Nb2RlID0gR2FtZUNvbmZpZy5zY3JlZW5Nb2RlO1xyXG5cdFx0Ly/lhbzlrrnlvq7kv6HkuI3mlK/mjIHliqDovb1zY2VuZeWQjue8gOWcuuaZr1xyXG5cdFx0TGF5YS5VUkwuZXhwb3J0U2NlbmVUb0pzb24gPSBHYW1lQ29uZmlnLmV4cG9ydFNjZW5lVG9Kc29uO1xyXG5cclxuXHRcdC8v5omT5byA6LCD6K+V6Z2i5p2/77yI6YCa6L+HSURF6K6+572u6LCD6K+V5qih5byP77yM5oiW6ICFdXJs5Zyw5Z2A5aKe5YqgZGVidWc9dHJ1ZeWPguaVsO+8jOWdh+WPr+aJk+W8gOiwg+ivlemdouadv++8iVxyXG5cdFx0aWYgKEdhbWVDb25maWcuZGVidWcgfHwgTGF5YS5VdGlscy5nZXRRdWVyeVN0cmluZyhcImRlYnVnXCIpID09IFwidHJ1ZVwiKSBMYXlhLmVuYWJsZURlYnVnUGFuZWwoKTtcclxuXHRcdGlmIChHYW1lQ29uZmlnLnBoeXNpY3NEZWJ1ZyAmJiBMYXlhW1wiUGh5c2ljc0RlYnVnRHJhd1wiXSkgTGF5YVtcIlBoeXNpY3NEZWJ1Z0RyYXdcIl0uZW5hYmxlKCk7XHJcblx0XHRpZiAoR2FtZUNvbmZpZy5zdGF0KSBMYXlhLlN0YXQuc2hvdygpO1xyXG5cdFx0TGF5YS5hbGVydEdsb2JhbEVycm9yID0gdHJ1ZTtcclxuXHJcblx0XHQvL0dBTUUgSU5JVCAoR0xPQkFMIE1PRFVMRSlcclxuXHRcdEZpeFRpbWUuaW5pdCgpO1xyXG5cdFx0UmhvZGVzR2FtZS5JbnN0YW5jZS5pbml0KCk7XHJcblx0XHREb2RSZXNvdXJjZU1nci5JbnN0YW5jZS5pbml0KCk7XHJcblx0XHRFdmVudENlbnRyZS5pbml0KCk7XHJcblxyXG5cdFx0Ly/mv4DmtLvotYTmupDniYjmnKzmjqfliLbvvIx2ZXJzaW9uLmpzb27nlLFJREXlj5HluIPlip/og73oh6rliqjnlJ/miJDvvIzlpoLmnpzmsqHmnInkuZ/kuI3lvbHlk43lkI7nu63mtYHnqItcclxuXHRcdExheWEuUmVzb3VyY2VWZXJzaW9uLmVuYWJsZShcInZlcnNpb24uanNvblwiLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMub25WZXJzaW9uTG9hZGVkKSwgTGF5YS5SZXNvdXJjZVZlcnNpb24uRklMRU5BTUVfVkVSU0lPTik7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgb25WZXJzaW9uTG9hZGVkKCk6IHZvaWQge1xyXG5cdFx0Ly/mv4DmtLvlpKflsI/lm77mmKDlsITvvIzliqDovb3lsI/lm77nmoTml7blgJnvvIzlpoLmnpzlj5HnjrDlsI/lm77lnKjlpKflm77lkIjpm4bph4zpnaLvvIzliJnkvJjlhYjliqDovb3lpKflm77lkIjpm4bvvIzogIzkuI3mmK/lsI/lm75cclxuXHRcdExheWEuQXRsYXNJbmZvTWFuYWdlci5lbmFibGUoXCJmaWxlY29uZmlnLmpzb25cIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLm9uQ29uZmlnTG9hZGVkKSk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgb25Db25maWdMb2FkZWQoKTogdm9pZCB7XHJcblxyXG5cdFx0Ly8gTGF5YS5TY2VuZS5vcGVuKFwiR2FtZVNjZW5lXCIpO1xyXG5cdFx0Ly8gaWYgKDE9PTEpe1xyXG5cdFx0Ly8gXHRyZXR1cm47XHJcblx0XHQvLyB9XHJcblx0XHQvL1Jlc291cmNlcyBSZWxhdGVkIE1vZHVsZSBBd2FrZVxyXG5cdFx0U2NlbmVNYW5hZ2VyLkluc3RhbmNlLmF3YWtlKCk7XHJcblx0XHQvL0F3YWtlIEdhbWUgRW5naW5lIExvb3BcclxuXHRcdExheWEudGltZXIubG9vcCgxNiwgdGhpcywgdGhpcy5fdXBkYXRlKTtcclxuXHRcdFxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBfdXBkYXRlKCk6IHZvaWQge1xyXG5cdFx0Rml4VGltZS51cGRhdGUoKTtcclxuXHRcdFJob2Rlc0dhbWUuSW5zdGFuY2UudXBkYXRlKCk7XHJcblx0XHREb2RSZXNvdXJjZU1nci5JbnN0YW5jZS51cGRhdGUoKTtcclxuXHR9XHJcbn1cclxuXHJcbi8v5r+A5rS75ZCv5Yqo57G7XHJcbm5ldyBNYWluKCk7XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIERvZFJlc291cmNlTWdyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogRG9kUmVzb3VyY2VNZ3I7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBJbnN0YW5jZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2UgfHwgKHRoaXMuX2luc3RhbmNlID0gbmV3IHRoaXMoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPIEDpk7bljY5cclxuICAgIC8vbG9hZCByZXNvdXJjZXMgaGVyZSBpbmNsdWRpbmcgSlNPTiAvIFRFWFRVUkUgLyBBVkFUQVIgLyBTUElORVxyXG4gICAgLy9wcml2YXRlIF9qc29uOiBEb2RKc29uTG9hZGVyO1xyXG4gICAgLy9wcml2YXRlIF90ZXg6IERvZFRleHR1cmVMb2FkZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfbGV2ZWxJRDogbnVtYmVyIHwgbnVsbDtcclxuICAgIHByaXZhdGUgX2luaXRlZDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX2xldmVsUHJlcGFyZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxJRCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5faW5pdGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxQcmVwYXJlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRMZXZlbElEKGlkOiBudW1iZXIgfCBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxJRCA9IGlkO1xyXG4gICAgICAgIHRoaXMuX2xldmVsUHJlcGFyZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TGV2ZWxJRCgpOiBudW1iZXIgfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGV2ZWxJRDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdCgpOiB2b2lkIHtcclxuICAgICAgICAvL1RPRE8gTE9BRFxyXG4gICAgICAgIC8vdGhpcy5fanNvbi5sb2FkKCk7XHJcbiAgICAgICAgLy90aGlzLl90ZXgubG9hZCgpO1xyXG4gICAgICAgIC8vc2V0IGluaXRlZCBmbGFnIHRydWUgd2hpbGUgaW5pdGlhbGl6YXRpb24gY29tcGxldGVcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbml0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAobnVsbCAhPSB0aGlzLnNldExldmVsSUQgJiYgZmFsc2UgPT0gdGhpcy5fbGV2ZWxQcmVwYXJlZCkge1xyXG4gICAgICAgICAgICAvL3ByZXBhcmUgcHJlZmFiIGhlcmVcclxuICAgICAgICAgICAgaWYgKDEpIHsgICAgLy9tYWtlIHN1cmUgcHJlZmFiIHByZXBhcmVkXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sZXZlbFByZXBhcmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNMZXZlbFByZXBhcmVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sZXZlbFByZXBhcmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDdXJyZW50TGV2ZWxSZXMoKTogYW55IHtcclxuICAgICAgICAvL1RPRE9cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QWN0b3JSZXNCeUlEKGlkOiBudW1iZXIpOiBhbnkge1xyXG4gICAgICAgIC8vVE9ET1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59IiwiLy8gaW1wb3J0IEV2ZW50Q2VudHJlIGZyb20gXCIuL1RveWJveC9FdmVudENlbnRyZVwiO1xyXG4vLyBpbXBvcnQgRGF0YWJhc2UgZnJvbSBcIi4vVG95Ym94L0RhdGFiYXNlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2VuZU1hbmFnZXJ7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFNjZW5lTWFuYWdlcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IEluc3RhbmNlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZSB8fCAodGhpcy5faW5zdGFuY2UgPSBuZXcgdGhpcygpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxvYWRpbmdTY2VuZTpzdHJpbmcgPSBcIkxvYWRpbmdTY2VuZS5zY2VuZVwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBnYW1lU2NlbmU6c3RyaW5nID0gXCJHYW1lU2NlbmUuc2NlbmVcIjtcclxuXHJcbiAgICBwdWJsaWMgYXdha2UoKTogdm9pZCB7XHJcbiAgICAgICAgTGF5YS5TY2VuZS5vcGVuKHRoaXMuZ2FtZVNjZW5lKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiIsImltcG9ydCB7dWl9IGZyb20gXCIuLi91aS9sYXlhTWF4VUlcIjtcclxuaW1wb3J0IFJob2Rlc0dhbWUgZnJvbSBcIi4uL0dhbWUvUmhvZGVzR2FtZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUgZXh0ZW5kcyB1aS5HYW1lU2NlbmVVSSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIFVJU2V0OiBMYXlhLlNwcml0ZTtcclxuICAgIHB1YmxpYyBzdGF0aWMgc3RhZ2U6IExheWEuU3RhZ2U7XHJcbiAgICBwcml2YXRlIF9wYXVzZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIC8v5YWo5bGA5pWw5o2u77yI5pWw5o2u5bqT57G75a6M5oiQ5ZCO5bCG6KKr5pu/5Luj77yJXHJcbiAgICBwdWJsaWMgc3RhdGljIGZyYW1lTGVuZ3RoOiBudW1iZXIgPSAyMDsvL+W4p+mVv+W6plxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7dWl9IGZyb20gXCIuLi91aS9sYXlhTWF4VUlcIlxyXG5cclxuXHJcbi8vVE9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZGluZyBleHRlbmRzIHVpLkxvYWRpbmdTY2VuZVVJe1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpXHJcbiAgICB9XHJcbn0iLCIvKipUaGlzIGNsYXNzIGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IExheWFBaXJJREUsIHBsZWFzZSBkbyBub3QgbWFrZSBhbnkgbW9kaWZpY2F0aW9ucy4gKi9cbmltcG9ydCBWaWV3PUxheWEuVmlldztcclxuaW1wb3J0IERpYWxvZz1MYXlhLkRpYWxvZztcclxuaW1wb3J0IFNjZW5lPUxheWEuU2NlbmU7XG52YXIgUkVHOiBGdW5jdGlvbiA9IExheWEuQ2xhc3NVdGlscy5yZWdDbGFzcztcbmV4cG9ydCBtb2R1bGUgdWkge1xyXG4gICAgZXhwb3J0IGNsYXNzIEdhbWVTY2VuZVVJIGV4dGVuZHMgU2NlbmUge1xyXG5cdFx0cHVibGljIFVJU2V0OkxheWEuU3ByaXRlO1xuXHRcdHB1YmxpYyBTaWRlQmFyOkxheWEuU3ByaXRlO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiR2FtZVNjZW5lXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLkdhbWVTY2VuZVVJXCIsR2FtZVNjZW5lVUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIExvYWRpbmdTY2VuZVVJIGV4dGVuZHMgU2NlbmUge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJMb2FkaW5nU2NlbmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkuTG9hZGluZ1NjZW5lVUlcIixMb2FkaW5nU2NlbmVVSSk7XHJcbn1cciJdfQ==
