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
     * 输入一个数组，返回将重复元素删除后的新数组
     * 不改动原数组
     * 多个元素仅取首个
     * @param list
     */
    ArrayAlgo.shrink = function (list) {
        var result = [];
        list.forEach(function (ele) {
            if (result.indexOf(ele) == -1) {
                result.push(ele);
            }
        });
        return result;
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
},{"./SceneScript/Game":51,"./SceneScript/Loading":52}],16:[function(require,module,exports){
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
        this.transform = new Transform_1.Transform(this);
        this.profile = new Profile_1.Profile(this, res['xxx']);
        this.atk = new AtkAbst_1.AtkStateMachine(this, res['xxx']);
        this.blocker = new Blocker_1.Blocker(this);
        this.buffMgr = new ActorBuffMgr_1.ActorBuffMgr(this, res['xxx']);
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
},{"../../Common/DodKey":2,"../../Fix/FixSymbol":13,"./ActorModules/ActorBuffMgr":18,"./ActorModules/ActorCost":19,"./ActorModules/ActorSkill":20,"./ActorModules/Animation":21,"./ActorModules/ColiMessage":22,"./ActorModules/Profile":24,"./ActorModules/Transform":25,"./ActorModules/UnitRender":26,"./ActorRoute":27,"./Attack/AtkAbst":28,"./Attack/Blocker":29,"./State/ActorStateFsm":33}],17:[function(require,module,exports){
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
        this.createActor(DodKey_1.ActorType.Operator, {});
        this.actors[1].state.runState(ActorStateFsm_1.ActorStateID.Fight);
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
},{"../../Common/DodKey":2,"../RhodesGame":41,"./Actor":16,"./State/ActorStateFsm":33}],18:[function(require,module,exports){
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
    Profile.prototype.getNodePos = function () {
        return this.keeper.transform.pos.getNodePos();
    };
    /**
     * 传入一个Actor，返回伤害对象
     * 正在考虑废弃此项
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
var ColiMessage_1 = require("./ColiMessage");
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
    Pos.prototype.getNodePos = function () {
        return new DodMath_1.Vec2(Math.floor(this.data.x / ColiMessage_1.ColiEmit.GLOBAL_UNIT_WIDTH), Math.floor(this.data.y / ColiMessage_1.ColiEmit.GLOBAL_UNIT_HEIGHT));
    };
    return Pos;
}());
},{"../../../Common/DodMath":4,"./ColiMessage":22}],26:[function(require,module,exports){
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
var MapNodeSeeker_1 = require("./MapNodeSeeker");
var DodMath_1 = require("../../../Common/DodMath");
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
    BaseState.prototype.name = function () { return "BaseState"; };
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
    Wait.prototype.name = function () { return "WaitState"; };
    Wait.prototype.execute = function (machine) {
        var focus = machine.seeker.getFocus();
        if (focus != null && focus != undefined) { //如果能够找到敌人
            machine.changeState(StateType.PREPARE);
            console.log("Found Enemy");
        }
        else { //如果找不到敌人
            //todo: none
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
    Prepare.prototype.name = function () { return "PrepareState"; };
    Prepare.prototype.execute = function (machine) {
        //判断是否需要重新选择目标并重置前摇
        var seeker = machine.seeker;
        var actor = machine.keeper;
        // console.log(seeker.focusChanged);
        if (seeker.focusChanged()) { //当前目标已修改
            // console.log("prepare:Focuschanged");
            machine.refresh();
            if (seeker.getFocus() != null) {
                machine.refresh();
            }
            else {
                machine.changeState(StateType.WAIT);
            }
            return;
        }
        //当前目标未修改
        machine.tic();
        if (machine.ready) {
            //todo: 进行攻击(进行profile参数判断)
            machine.keeper.attack(seeker.getFocus());
            machine.changeState(StateType.AFTER_ATK); //转换到后摇
            console.log("Attack Happened");
        }
    };
    return Prepare;
}(BaseState));
var AfterAtk = /** @class */ (function (_super) {
    __extends(AfterAtk, _super);
    function AfterAtk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AfterAtk.prototype.name = function () { return "AfterState"; };
    AfterAtk.prototype.execute = function (machine) {
        machine.tic();
        if (machine.coolComplete) {
            machine.refresh();
            if (machine.seeker.getFocus() != null) {
                machine.changeState(StateType.PREPARE);
            }
            else {
                machine.changeState(StateType.WAIT);
            }
            console.log("Attack recover");
        }
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
        this._prepTime = 300;
        this._coolTime = 300;
        this.seeker = new MapNodeSeeker_1.MapNodeSeeker(this.keeper.profile.getNodePos().plus(new DodMath_1.Vec2(3, 3)), res['xxx'], 0);
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
            return this._curPoint >= this._prepTime + this._coolTime;
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
        // console.log(this.curState.name());
        // console.log("pt:" + this._curPoint);
        this.seeker.update();
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
},{"../../../Common/DodDataStructure":1,"../../../Common/DodMath":4,"./MapNodeSeeker":30}],29:[function(require,module,exports){
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
var DodMath_1 = require("../../../Common/DodMath");
var RhodesGame_1 = require("../../RhodesGame");
var DodDataStructure_1 = require("../../../Common/DodDataStructure");
/**
 * 此对象是一种可以被攻击状态机应用的Actor搜索器
 * 专门用来对应地图节点搜索敌人（而非干员）
 */
var MapNodeSeeker = /** @class */ (function () {
    function MapNodeSeeker(origin, res, rotate) {
        if (rotate === void 0) { rotate = 0; }
        this._rotate = 0; //顺时针旋转90度的次数，默认为0
        this._relativeNodeList = []; //需要监控的地图节点的相对位置
        this._absoluteNodeList = []; //需要监控的地图节点的绝对位置
        this._focusChanged = false; //锁定的敌人已修改
        //这里的res是一种代表攻击范围类型的数据
        this._origin = origin;
        this._rotate = rotate;
        //test
        this._relativeNodeList.push(new DodMath_1.Vec2(0, 0), new DodMath_1.Vec2(1, 0), new DodMath_1.Vec2(2, 0));
        this.setAbsolute();
    }
    MapNodeSeeker.prototype.setAbsolute = function () {
        var _this = this;
        this._absoluteNodeList = [];
        this._relativeNodeList.forEach(function (ele) {
            _this._absoluteNodeList.push(_this._origin.plus(ele));
        });
    };
    MapNodeSeeker.prototype.getFocus = function () {
        return this._focus;
    };
    MapNodeSeeker.prototype.getFocusList = function (count) {
        //todo: 考虑在interface中移除此项
        return null;
    };
    MapNodeSeeker.prototype.getCaptureList = function () {
        return this._captureList;
    };
    MapNodeSeeker.prototype.followActor = function () {
        //todo: 考虑在interface中移除此项
        return null;
    };
    MapNodeSeeker.prototype.focusChanged = function () {
        return this._focusChanged;
    };
    MapNodeSeeker.prototype.update = function () {
        var _this = this;
        //刷新捕捉列表
        this._captureList = [];
        this._absoluteNodeList.forEach(function (ele) {
            var list = RhodesGame_1.default.Instance.battle.mapNodeCPU.matrixGet(ele);
            list.forEach(function (ele) {
                _this._captureList.push(ele);
            });
        });
        this._captureList = DodDataStructure_1.ArrayAlgo.shrink(this._captureList);
        //处理focus
        if ((this._focus == null || this._focus == undefined) && this._captureList.length > 0) { //当前无捕捉目标，且captureList中有目标
            this._focus = this._captureList[0];
            this._focusChanged = true;
        }
        else if (this._captureList.indexOf(this._focus) == -1) { //当前捕捉目标不在captureList中
            this._focus = this._captureList[0];
            this._focusChanged = true;
        }
        else { //捕捉目标未改变
            this._focusChanged = false;
        }
    };
    return MapNodeSeeker;
}());
exports.MapNodeSeeker = MapNodeSeeker;
},{"../../../Common/DodDataStructure":1,"../../../Common/DodMath":4,"../../RhodesGame":41}],31:[function(require,module,exports){
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
},{}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActorStateBase_1 = require("./ActorStateBase");
/**
 * 敌人的被阻挡状态、干员的一般状态
 */
var ActorStateFight = /** @class */ (function (_super) {
    __extends(ActorStateFight, _super);
    function ActorStateFight() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActorStateFight.prototype.update = function () {
        //todo: 调用攻击状态机的帧循环
        /*

        */
        this._actor.atk.update();
    };
    return ActorStateFight;
}(ActorStateBase_1.default));
exports.ActorStateFight = ActorStateFight;
},{"./ActorStateBase":31}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DodLog_1 = require("../../../Common/DodLog");
var ActorStateWalk_1 = require("./ActorStateWalk");
var ActorStatePrepared_1 = require("./ActorStatePrepared");
var ActorStateFight_1 = require("./ActorStateFight");
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
        this._states[ActorStateID.Fight] = new ActorStateFight_1.ActorStateFight(actor);
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
},{"../../../Common/DodLog":3,"./ActorStateFight":32,"./ActorStatePrepared":34,"./ActorStateWalk":35}],34:[function(require,module,exports){
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
},{"./ActorStateBase":31}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActorStateBase_1 = require("./ActorStateBase");
var DodMath_1 = require("../../../Common/DodMath");
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
        if (this._actor.transform.pos.arrived && 1 < 0) { //已到达目的地(暂时屏蔽)
            if (actor.route.next()) { //存在下一个目标节点
                actor.transform.pos.setTarget(actor.route.currentTarget()); //将目标替换为下一个目标节点
            }
            else {
                //todo: 敌人已到达终点
            }
        }
        actor.transform.pos.setTarget(new DodMath_1.Vec2(Laya.stage.mouseX - 50, Laya.stage.mouseY - 50));
        actor.transform.pos.setSpeed(20);
        actor.transform.pos.move(); //移动
        actor.coliEmit.posByVec(actor.transform.pos.data); //移动碰撞箱
        actor.coliEmit.event(actor, actor.type); //发布碰撞事件
        actor.render.move(actor.transform.pos.data); //移动可视对象
    };
    return ActorStateWalk;
}(ActorStateBase_1.default));
exports.ActorStateWalk = ActorStateWalk;
},{"../../../Common/DodMath":4,"./ActorStateBase":31}],36:[function(require,module,exports){
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
},{"../../Fix/FixSymbol":13}],37:[function(require,module,exports){
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
},{"../../Common/DodDataStructure":1,"../../Common/DodKey":2,"../../Common/DodMath":4,"../Actor/ActorModules/ColiMessage":22}],38:[function(require,module,exports){
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
},{"../Resources/DodResourceMgr":49,"./Actor/ActorMgr":17,"./Collision/ActorCollisionProcessor":36,"./Collision/ColiReporter":37,"./GameLevel":40}],39:[function(require,module,exports){
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
},{}],40:[function(require,module,exports){
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
},{"../Fix/FixTime":14,"./GameBattleConst":39}],41:[function(require,module,exports){
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
},{"../Common/DodLog":3,"./GameBattle":38,"./State/GameStateMgr":47}],42:[function(require,module,exports){
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
},{}],43:[function(require,module,exports){
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
        this._battle.actorMgr.update();
        this._battle.map.update();
    };
    return GameStateBattle;
}(GameStateBase_1.default));
exports.default = GameStateBattle;
},{"./GameStateBase":42}],44:[function(require,module,exports){
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
},{"../../Common/DodLog":3,"../../Resources/DodResourceMgr":49,"../RhodesGame":41,"./GameStateBase":42,"./GameStateMgr":47}],45:[function(require,module,exports){
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
},{"../../Common/DodLog":3,"../../Resources/DodResourceMgr":49,"../RhodesGame":41,"./GameStateBase":42,"./GameStateMgr":47}],46:[function(require,module,exports){
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
},{"./GameStateBase":42}],47:[function(require,module,exports){
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
},{"../../Common/DodLog":3,"./GameStateBattle":43,"./GameStateGameload":44,"./GameStateLevelload":45,"./GameStateLobby":46}],48:[function(require,module,exports){
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
},{"./Common/DodMath":4,"./Common/Graphics/Performance_Module/PerformanceCentre":6,"./Event/EventCentre":11,"./Fix/FixTime":14,"./Game/RhodesGame":41,"./GameConfig":15,"./Resources/DodResourceMgr":49,"./SceneManager":50}],49:[function(require,module,exports){
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
},{}],50:[function(require,module,exports){
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
},{}],51:[function(require,module,exports){
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
},{"../ui/layaMaxUI":53}],52:[function(require,module,exports){
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
},{"../ui/layaMaxUI":53}],53:[function(require,module,exports){
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
},{}]},{},[48])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xheWEvTGF5YUFpcklERS9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQ29tbW9uL0RvZERhdGFTdHJ1Y3R1cmUudHMiLCJzcmMvQ29tbW9uL0RvZEtleS50cyIsInNyYy9Db21tb24vRG9kTG9nLnRzIiwic3JjL0NvbW1vbi9Eb2RNYXRoLnRzIiwic3JjL0NvbW1vbi9HcmFwaGljcy9QZXJmb3JtYW5jZV9Nb2R1bGUvQWN0b3JDb21wb25lbnQudHMiLCJzcmMvQ29tbW9uL0dyYXBoaWNzL1BlcmZvcm1hbmNlX01vZHVsZS9QZXJmb3JtYW5jZUNlbnRyZS50cyIsInNyYy9Db21tb24vR3JhcGhpY3MvUGVyZm9ybWFuY2VfTW9kdWxlL1N5bWJvbGl6ZWRSZW5kZXIudHMiLCJzcmMvQ29tbW9uL0dyYXBoaWNzL1BlcmZvcm1hbmNlX01vZHVsZS9VbnN5bWJvbGl6ZWRSZW5kZXIudHMiLCJzcmMvQ29tbW9uL0dyYXBoaWNzL1BlcmZvcm1hbmNlX01vZHVsZS9jdXN0b21pemVkU3ByLnRzIiwic3JjL0NvbW1vbi9HcmFwaGljcy9QZXJmb3JtYW5jZV9Nb2R1bGUvb2JqYm94LnRzIiwic3JjL0V2ZW50L0V2ZW50Q2VudHJlLnRzIiwic3JjL0ZpeC9GaXhSZWN0LnRzIiwic3JjL0ZpeC9GaXhTeW1ib2wudHMiLCJzcmMvRml4L0ZpeFRpbWUudHMiLCJzcmMvR2FtZUNvbmZpZy50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yLnRzIiwic3JjL0dhbWUvQWN0b3IvQWN0b3JNZ3IudHMiLCJzcmMvR2FtZS9BY3Rvci9BY3Rvck1vZHVsZXMvQWN0b3JCdWZmTWdyLnRzIiwic3JjL0dhbWUvQWN0b3IvQWN0b3JNb2R1bGVzL0FjdG9yQ29zdC50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yTW9kdWxlcy9BY3RvclNraWxsLnRzIiwic3JjL0dhbWUvQWN0b3IvQWN0b3JNb2R1bGVzL0FuaW1hdGlvbi50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yTW9kdWxlcy9Db2xpTWVzc2FnZS50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yTW9kdWxlcy9EYW1hZ2UudHMiLCJzcmMvR2FtZS9BY3Rvci9BY3Rvck1vZHVsZXMvUHJvZmlsZS50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yTW9kdWxlcy9UcmFuc2Zvcm0udHMiLCJzcmMvR2FtZS9BY3Rvci9BY3Rvck1vZHVsZXMvVW5pdFJlbmRlci50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yUm91dGUudHMiLCJzcmMvR2FtZS9BY3Rvci9BdHRhY2svQXRrQWJzdC50cyIsInNyYy9HYW1lL0FjdG9yL0F0dGFjay9CbG9ja2VyLnRzIiwic3JjL0dhbWUvQWN0b3IvQXR0YWNrL01hcE5vZGVTZWVrZXIudHMiLCJzcmMvR2FtZS9BY3Rvci9TdGF0ZS9BY3RvclN0YXRlQmFzZS50cyIsInNyYy9HYW1lL0FjdG9yL1N0YXRlL0FjdG9yU3RhdGVGaWdodC50cyIsInNyYy9HYW1lL0FjdG9yL1N0YXRlL0FjdG9yU3RhdGVGc20udHMiLCJzcmMvR2FtZS9BY3Rvci9TdGF0ZS9BY3RvclN0YXRlUHJlcGFyZWQudHMiLCJzcmMvR2FtZS9BY3Rvci9TdGF0ZS9BY3RvclN0YXRlV2Fsay50cyIsInNyYy9HYW1lL0NvbGxpc2lvbi9BY3RvckNvbGxpc2lvblByb2Nlc3Nvci50cyIsInNyYy9HYW1lL0NvbGxpc2lvbi9Db2xpUmVwb3J0ZXIudHMiLCJzcmMvR2FtZS9HYW1lQmF0dGxlLnRzIiwic3JjL0dhbWUvR2FtZUJhdHRsZUNvbnN0LnRzIiwic3JjL0dhbWUvR2FtZUxldmVsLnRzIiwic3JjL0dhbWUvUmhvZGVzR2FtZS50cyIsInNyYy9HYW1lL1N0YXRlL0dhbWVTdGF0ZUJhc2UudHMiLCJzcmMvR2FtZS9TdGF0ZS9HYW1lU3RhdGVCYXR0bGUudHMiLCJzcmMvR2FtZS9TdGF0ZS9HYW1lU3RhdGVHYW1lbG9hZC50cyIsInNyYy9HYW1lL1N0YXRlL0dhbWVTdGF0ZUxldmVsbG9hZC50cyIsInNyYy9HYW1lL1N0YXRlL0dhbWVTdGF0ZUxvYmJ5LnRzIiwic3JjL0dhbWUvU3RhdGUvR2FtZVN0YXRlTWdyLnRzIiwic3JjL01haW4udHMiLCJzcmMvUmVzb3VyY2VzL0RvZFJlc291cmNlTWdyLnRzIiwic3JjL1NjZW5lTWFuYWdlci50cyIsInNyYy9TY2VuZVNjcmlwdC9HYW1lLnRzIiwic3JjL1NjZW5lU2NyaXB0L0xvYWRpbmcudHMiLCJzcmMvdWkvbGF5YU1heFVJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ05BO0lBQUE7UUFDWSxVQUFLLEdBQU8sRUFBRSxDQUFDO0lBYTNCLENBQUM7SUFaVSxxQkFBSSxHQUFYLFVBQVksR0FBVSxFQUFFLEtBQU87UUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDNUIsQ0FBQztJQUNNLHFCQUFJLEdBQVgsVUFBWSxHQUFVO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRU0sd0JBQU8sR0FBZCxVQUFlLENBQXNCO1FBQ2pDLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUN0QixDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN2QjtJQUNMLENBQUM7SUFDTCxhQUFDO0FBQUQsQ0FkQSxBQWNDLElBQUE7QUFkWSx3QkFBTTtBQWlCbkI7SUFHSSxjQUFZLElBQU0sRUFBRSxJQUFZO1FBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFDTCxXQUFDO0FBQUQsQ0FQQSxBQU9DLElBQUE7QUFFRDtJQUlJO1FBRFEsWUFBTyxHQUFVLENBQUMsQ0FBQztRQUV2QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksSUFBSSxDQUFJLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksSUFBSSxDQUFJLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBR0Qsc0JBQVcsNEJBQU07UUFEakIsTUFBTTthQUNOO1lBQ0kseUJBQXlCO1lBQ3pCLG9DQUFvQztZQUNwQyxrQ0FBa0M7WUFDbEMsbUJBQW1CO1lBQ25CLDhCQUE4QjtZQUM5QixJQUFJO1lBQ0osaUJBQWlCO1lBQ2pCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLDZCQUFPO2FBQWxCO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUM7UUFDcEMsQ0FBQzs7O09BQUE7SUFFRCxNQUFNO0lBQ04sR0FBRztJQUNJLHVCQUFJLEdBQVgsVUFBWSxJQUFNO1FBQ2QsSUFBSSxJQUFJLEdBQVcsSUFBSSxJQUFJLENBQUksSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7U0FDMUI7YUFBTTtZQUNILElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQzFCO1FBQ0QsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVNLDBCQUFPLEdBQWQsVUFBZSxJQUFNO1FBQ2pCLElBQUksS0FBSyxHQUFXLElBQUksSUFBSSxDQUFJLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1QyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7WUFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1NBQzNCO2FBQU07WUFDSCxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztTQUMzQjtRQUNELElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFTSx5QkFBTSxHQUFiLFVBQWMsS0FBWSxFQUFFLElBQU07UUFDOUIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUMsT0FBTztZQUMzQyxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUVELElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQixPQUFPLElBQUksQ0FBQztTQUNmO1FBRUQsSUFBSSxPQUFPLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBLDhCQUE4QjtRQUMvRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDL0IsT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7U0FDMUI7UUFFRCxPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFJLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUM7UUFFbEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELEdBQUc7SUFDSSx5QkFBTSxHQUFiLFVBQWMsS0FBWTtRQUN0QixJQUFJLEtBQUssR0FBRyxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDbkMsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUVELElBQUksT0FBTyxHQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQ3RDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMvQixPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztTQUMxQjtRQUVELElBQUksSUFBSSxHQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDMUIsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNmLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO1FBRWxCLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQztJQUN4QixDQUFDO0lBRU0sd0JBQUssR0FBWjtRQUNJLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFFRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBRXZDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUMxQjtRQUVELElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO1FBQ2xCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxHQUFHO0lBQ0ksd0JBQUssR0FBWixVQUFhLEtBQVksRUFBRSxJQUFNO1FBQzdCLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNuQyxPQUFPO1NBQ1Y7UUFFRCxJQUFJLE9BQU8sR0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUN0QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDL0IsT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7U0FDMUI7UUFFRCxPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUN4QixDQUFDO0lBRUQsR0FBRztJQUNJLHVCQUFJLEdBQVgsVUFBWSxLQUFZO1FBQ3BCLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNuQyxPQUFPO1NBQ1Y7UUFFRCxJQUFJLE9BQU8sR0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUN0QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDL0IsT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7U0FDMUI7UUFFRCxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUM7SUFDeEIsQ0FBQztJQUVNLHlCQUFNLEdBQWIsVUFBYyxJQUFNO1FBQ2hCLElBQUksTUFBTSxHQUFZLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBSyxFQUFFLEtBQVk7WUFDN0IsSUFBSSxHQUFHLEtBQUssSUFBSSxFQUFFO2dCQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEI7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxzQkFBRyxHQUFWLFVBQVcsSUFBTztRQUVkLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQzlCLE9BQU8sT0FBTyxJQUFJLElBQUksRUFBRTtZQUNwQixJQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFO2dCQUN0QixPQUFPLElBQUksQ0FBQzthQUNmO1lBQ0QsT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7U0FDMUI7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsTUFBTTtJQUNDLDBCQUFPLEdBQWQsVUFBZSxDQUErQztRQUMxRCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUM5QixJQUFJLEdBQUcsR0FBVSxDQUFDLENBQUM7UUFDbkIsT0FBTyxPQUFPLEtBQUssSUFBSSxFQUFFO1lBQ3JCLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMzQixPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztZQUN2QixHQUFHLElBQUksQ0FBQyxDQUFDO1NBQ1o7SUFDTCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0kseUJBQU0sR0FBYixVQUFjLENBQWlCLEVBQUUsUUFBdUI7UUFBdkIseUJBQUEsRUFBQSxlQUF1QjtRQUNwRCxJQUFJLFFBQVEsR0FBb0IsSUFBSSxRQUFRLEVBQVUsQ0FBQztRQUN2RCxJQUFJLE1BQU0sR0FBZSxJQUFJLFFBQVEsRUFBSyxDQUFDO1FBQzNDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWxCLElBQUksT0FBTyxHQUFnQyxRQUFRLENBQUEsQ0FBQyxDQUFBLFVBQUMsQ0FBQyxFQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFBLFVBQUMsQ0FBQyxFQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUM7UUFFakcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUc7WUFDYixJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDeEIsSUFBSSxJQUFJLEdBQVcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDckMsSUFBSSxPQUFPLEdBQWdCLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBRS9DLElBQUksVUFBVSxHQUFXLEtBQUssQ0FBQztZQUMvQixPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFFO2dCQUN2Qix3Q0FBd0M7Z0JBQ3hDLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUN4QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFJLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3hDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQVMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDMUQsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFDbEIsTUFBTTtpQkFDVDtnQkFFRCxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDakIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7YUFDMUI7WUFFRCxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDN0I7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNmLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFNTCxlQUFDO0FBQUQsQ0E1TkEsQUE0TkMsSUFBQTtBQTVOWSw0QkFBUTtBQThOckI7SUFJSSxnQkFBWSxNQUFlLEVBQUUsU0FBcUI7UUFBdEMsdUJBQUEsRUFBQSxXQUFlO1FBQUUsMEJBQUEsRUFBQSxhQUFvQixDQUFDO1FBQzlDLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7SUFFTSxxQkFBSSxHQUFYO1FBQ0ksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBQUEsQ0FBQztJQUVLLHFCQUFJLEdBQVg7UUFDSSxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQsc0JBQVcsdUJBQUc7YUFBZDtZQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUMvRCxDQUFDOzs7T0FBQTtJQUNMLGFBQUM7QUFBRCxDQXBCQSxBQW9CQyxJQUFBO0FBcEJZLHdCQUFNO0FBd0JuQjtJQUFBO0lBd0ZBLENBQUM7SUF0Rkc7Ozs7T0FJRztJQUNXLHVCQUFhLEdBQTNCLFVBQTRCLElBQWlCLEVBQUUsSUFBaUI7UUFDNUQsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDN0IsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUMxQixPQUFPLEtBQUssQ0FBQzthQUNoQjtTQUNKO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNXLDJCQUFpQixHQUEvQixVQUFnQyxDQUFjLEVBQUUsQ0FBYztRQUMxRCxJQUFJLE1BQU0sR0FBZ0IsRUFBRSxDQUFDO1FBQzdCLEtBQWdCLFVBQUMsRUFBRCxPQUFDLEVBQUQsZUFBQyxFQUFELElBQUMsRUFBRTtZQUFkLElBQUksR0FBRyxVQUFBO1lBQ1IsSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNwQjtTQUNKO1FBQUEsQ0FBQztRQUNGLFVBQVU7UUFDVixPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRWEsNkJBQW1CLEdBQWpDLFVBQWtDLENBQWMsRUFBRSxDQUFjO1FBQzVELFFBQVE7SUFDWixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDVyxnQkFBTSxHQUFwQixVQUFxQixJQUFVO1FBQzNCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVoQixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRztZQUNaLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtnQkFDM0IsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNwQjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ1csaUJBQU8sR0FBckIsVUFBc0IsR0FBYyxFQUFFLEdBQWdCO1FBQ2xELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDcEMsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNwQixPQUFPLENBQUMsQ0FBQzthQUNaO1NBQ0o7UUFDRCxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ1csbUJBQVMsR0FBdkIsVUFBd0IsR0FBTyxFQUFFLEdBQVM7UUFDdEMsSUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNWLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ25CO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQXhGQSxBQXdGQyxJQUFBO0FBeEZZLDhCQUFTO0FBNkZ0QiwyQ0FBMkM7QUFFM0MsMkJBQTJCO0FBQzNCLDJCQUEyQjtBQUczQixxQkFBcUI7QUFDckIsMEJBQTBCO0FBQzFCLFFBQVE7QUFHUixVQUFVO0FBQ1YsNkJBQTZCO0FBQzdCLHdCQUF3QjtBQUN4Qix3QkFBd0I7QUFDeEIsMEJBQTBCO0FBQzFCLHlCQUF5QjtBQUN6QixVQUFVO0FBQ1YsZ0lBQWdJO0FBQ2hJLGlEQUFpRDtBQUNqRCxpQ0FBaUM7QUFDakMsMkNBQTJDO0FBQzNDLHNDQUFzQztBQUN0QywwRkFBMEY7QUFDMUYsWUFBWTtBQUNaLHlCQUF5QjtBQUN6QixRQUFRO0FBRVIsMENBQTBDO0FBQzFDLHNCQUFzQjtBQUN0QixzQkFBc0I7QUFDdEIsdUJBQXVCO0FBQ3ZCLFFBQVE7QUFFUixvREFBb0Q7QUFDcEQsOEJBQThCO0FBQzlCLGdDQUFnQztBQUNoQyx1QkFBdUI7QUFDdkIsUUFBUTtBQUVSLDRDQUE0QztBQUM1QyxnQ0FBZ0M7QUFDaEMsNkNBQTZDO0FBQzdDLFlBQVk7QUFDWiw4REFBOEQ7QUFDOUQsbUVBQW1FO0FBQ25FLFFBQVE7QUFFUiw0Q0FBNEM7QUFDNUMsOEJBQThCO0FBQzlCLDZDQUE2QztBQUM3QyxZQUFZO0FBQ1osK0RBQStEO0FBQy9ELHNFQUFzRTtBQUN0RSxRQUFRO0FBQ1IsSUFBSTtBQUVKLHNCQUFzQjtBQUN0QixrQkFBa0I7QUFDbEIsb0JBQW9CO0FBQ3BCLG1DQUFtQztBQUNuQywwQkFBMEI7QUFDMUIsOEJBQThCO0FBQzlCLFFBQVE7QUFDUixJQUFJO0FBRUosdUJBQXVCO0FBQ3ZCLGdDQUFnQztBQUNoQyxpQ0FBaUM7QUFDakMsaUNBQWlDO0FBQ2pDLHlCQUF5QjtBQUN6QixvREFBb0Q7QUFDcEQsb0RBQW9EO0FBQ3BELFlBQVk7QUFFWixpQkFBaUI7QUFDakIsc0NBQXNDO0FBQ3RDLHFDQUFxQztBQUNyQyxnREFBZ0Q7QUFDaEQsOENBQThDO0FBQzlDLCtCQUErQjtBQUMvQiwwQ0FBMEM7QUFDMUMsZ0JBQWdCO0FBQ2hCLDZCQUE2QjtBQUM3QixZQUFZO0FBRVosd0NBQXdDO0FBQ3hDLCtDQUErQztBQUMvQyxZQUFZO0FBRVosaUJBQWlCO0FBQ2pCLGNBQWM7QUFDZCxvQ0FBb0M7QUFDcEMsMERBQTBEO0FBQzFELGtDQUFrQztBQUNsQywwQ0FBMEM7QUFDMUMsMENBQTBDO0FBQzFDLHVCQUF1QjtBQUN2QiwrQ0FBK0M7QUFDL0MsMENBQTBDO0FBQzFDLGdCQUFnQjtBQUVoQixZQUFZO0FBRVosdUNBQXVDO0FBQ3ZDLDJEQUEyRDtBQUMzRCxrQ0FBa0M7QUFDbEMsMkNBQTJDO0FBQzNDLDJDQUEyQztBQUMzQyx1QkFBdUI7QUFDdkIscURBQXFEO0FBQ3JELDJDQUEyQztBQUMzQyxnQkFBZ0I7QUFDaEIsWUFBWTtBQUVaLHVEQUF1RDtBQUN2RCw2REFBNkQ7QUFDN0QsZ0NBQWdDO0FBQ2hDLGdCQUFnQjtBQUVoQiwyQ0FBMkM7QUFDM0MsbUNBQW1DO0FBQ25DLCtCQUErQjtBQUMvQixnQkFBZ0I7QUFFaEIsOEVBQThFO0FBQzlFLG1EQUFtRDtBQUNuRCwwQ0FBMEM7QUFDMUMsZ0JBQWdCO0FBRWhCLDhEQUE4RDtBQUU5RCwyQkFBMkI7QUFDM0IsWUFBWTtBQUVaLGNBQWM7QUFDZCx5Q0FBeUM7QUFDekMsdURBQXVEO0FBQ3ZELCtCQUErQjtBQUMvQixnQkFBZ0I7QUFFaEIscURBQXFEO0FBQ3JELG1EQUFtRDtBQUNuRCwwQ0FBMEM7QUFDMUMsZ0JBQWdCO0FBRWhCLHlDQUF5QztBQUN6Qyw4QkFBOEI7QUFFOUIsbUNBQW1DO0FBQ25DLFlBQVk7QUFFWiw0QkFBNEI7QUFDNUIsa0NBQWtDO0FBQ2xDLCtCQUErQjtBQUMvQixnQkFBZ0I7QUFFaEIsK0NBQStDO0FBQy9DLHNEQUFzRDtBQUN0RCxrQ0FBa0M7QUFDbEMsMENBQTBDO0FBQzFDLGdCQUFnQjtBQUNoQiwyQkFBMkI7QUFDM0IsWUFBWTtBQUVaLGNBQWM7QUFDZCxtREFBbUQ7QUFDbkQsdURBQXVEO0FBQ3ZELDBCQUEwQjtBQUMxQixnQkFBZ0I7QUFFaEIscURBQXFEO0FBQ3JELG1EQUFtRDtBQUNuRCwwQ0FBMEM7QUFDMUMsZ0JBQWdCO0FBRWhCLG1DQUFtQztBQUNuQyxZQUFZO0FBRVosY0FBYztBQUNkLHVDQUF1QztBQUN2Qyx1REFBdUQ7QUFDdkQsMEJBQTBCO0FBQzFCLGdCQUFnQjtBQUVoQixxREFBcUQ7QUFDckQsbURBQW1EO0FBQ25ELDBDQUEwQztBQUMxQyxnQkFBZ0I7QUFFaEIsbUNBQW1DO0FBQ25DLFlBQVk7QUFFWiwwQ0FBMEM7QUFDMUMsd0NBQXdDO0FBQ3hDLG9EQUFvRDtBQUNwRCxzQ0FBc0M7QUFDdEMsMENBQTBDO0FBQzFDLG9CQUFvQjtBQUNwQixrQkFBa0I7QUFDbEIsNkJBQTZCO0FBQzdCLFlBQVk7QUFFWixjQUFjO0FBQ2QsMkJBQTJCO0FBQzNCLDBCQUEwQjtBQUMxQixjQUFjO0FBQ2QsdUNBQXVDO0FBRXZDLDZDQUE2QztBQUM3Qyx3Q0FBd0M7QUFDeEMsOENBQThDO0FBQzlDLG1DQUFtQztBQUNuQyxvQkFBb0I7QUFDcEIsMENBQTBDO0FBQzFDLGdCQUFnQjtBQUVoQiw0QkFBNEI7QUFDNUIsWUFBWTtBQUVaLGlCQUFpQjtBQUNqQixnRkFBZ0Y7QUFDaEYsNkNBQTZDO0FBQzdDLGtDQUFrQztBQUNsQyx5Q0FBeUM7QUFDekMsOENBQThDO0FBQzlDLDBDQUEwQztBQUMxQyw0QkFBNEI7QUFDNUIsZ0JBQWdCO0FBQ2hCLFlBQVk7QUFFWixjQUFjO0FBQ2QsdUNBQXVDO0FBQ3ZDLDJCQUEyQjtBQUMzQixtQ0FBbUM7QUFDbkMsdUNBQXVDO0FBQ3ZDLGdDQUFnQztBQUNoQyxjQUFjO0FBQ2QsaUZBQWlGO0FBQ2pGLHNFQUFzRTtBQUN0RSwwREFBMEQ7QUFDMUQsaUNBQWlDO0FBQ2pDLGlDQUFpQztBQUVqQyxnSEFBZ0g7QUFFaEgsb0NBQW9DO0FBQ3BDLDJDQUEyQztBQUMzQyx3REFBd0Q7QUFDeEQsa0VBQWtFO0FBRWxFLGtEQUFrRDtBQUNsRCwrQ0FBK0M7QUFDL0MsK0RBQStEO0FBQy9ELG9FQUFvRTtBQUNwRSxtRUFBbUU7QUFDbkUscUZBQXFGO0FBQ3JGLDZDQUE2QztBQUM3QyxpQ0FBaUM7QUFDakMsd0JBQXdCO0FBRXhCLHdDQUF3QztBQUN4Qyw4Q0FBOEM7QUFDOUMsb0JBQW9CO0FBRXBCLHFDQUFxQztBQUNyQyx3Q0FBd0M7QUFDeEMsaURBQWlEO0FBQ2pELG9CQUFvQjtBQUNwQixrQkFBa0I7QUFFbEIsOEJBQThCO0FBQzlCLDZCQUE2QjtBQUM3QixZQUFZO0FBRVosc0ZBQXNGO0FBRXRGLGVBQWU7QUFFZixRQUFRO0FBRVIsNkJBQTZCO0FBQzdCLDRDQUE0QztBQUM1Qyx5QkFBeUI7QUFDekIsOEJBQThCO0FBQzlCLFlBQVk7QUFDWiwrQkFBK0I7QUFDL0IsMkNBQTJDO0FBQzNDLHlDQUF5QztBQUN6Qyx1Q0FBdUM7QUFDdkMsb0JBQW9CO0FBQ3BCLGdCQUFnQjtBQUNoQiwwQkFBMEI7QUFDMUIsWUFBWTtBQUNaLHVDQUF1QztBQUN2Qyw0Q0FBNEM7QUFDNUMsMkNBQTJDO0FBQzNDLHFDQUFxQztBQUNyQyxvQkFBb0I7QUFDcEIsZ0JBQWdCO0FBQ2hCLDBCQUEwQjtBQUMxQixZQUFZO0FBQ1osMENBQTBDO0FBQzFDLDRDQUE0QztBQUM1Qyx5Q0FBeUM7QUFDekMsa0NBQWtDO0FBQ2xDLG9CQUFvQjtBQUNwQixnQkFBZ0I7QUFDaEIsMkJBQTJCO0FBQzNCLFlBQVk7QUFDWiw2Q0FBNkM7QUFDN0MsK0RBQStEO0FBQy9ELG1EQUFtRDtBQUNuRCxrREFBa0Q7QUFDbEQsb0NBQW9DO0FBQ3BDLG9CQUFvQjtBQUNwQixnQkFBZ0I7QUFDaEIsMkRBQTJEO0FBQzNELDJCQUEyQjtBQUMzQixZQUFZO0FBQ1oseURBQXlEO0FBQ3pELG1EQUFtRDtBQUNuRCxnQ0FBZ0M7QUFDaEMsZ0JBQWdCO0FBQ2hCLHlEQUF5RDtBQUN6RCxnREFBZ0Q7QUFDaEQsZ0JBQWdCO0FBQ2hCLDJCQUEyQjtBQUUzQixZQUFZO0FBQ1osd0NBQXdDO0FBQ3hDLG9DQUFvQztBQUNwQyw0Q0FBNEM7QUFDNUMseUNBQXlDO0FBQ3pDLGtEQUFrRDtBQUNsRCxrQ0FBa0M7QUFDbEMsb0JBQW9CO0FBQ3BCLDhCQUE4QjtBQUM5QixnQkFBZ0I7QUFDaEIsMkJBQTJCO0FBQzNCLFlBQVk7QUFDWixzQ0FBc0M7QUFDdEMsdUNBQXVDO0FBQ3ZDLFlBQVk7QUFDWixtREFBbUQ7QUFDbkQsNENBQTRDO0FBQzVDLHlDQUF5QztBQUN6QyxnQkFBZ0I7QUFDaEIsc0JBQXNCO0FBQ3RCLFlBQVk7QUFDWix3REFBd0Q7QUFDeEQsMkNBQTJDO0FBQzNDLDRDQUE0QztBQUM1Qyw4Q0FBOEM7QUFDOUMsc0RBQXNEO0FBQ3RELG9CQUFvQjtBQUNwQixnQkFBZ0I7QUFDaEIsNkJBQTZCO0FBQzdCLFlBQVk7QUFDWixRQUFRO0FBRVIsbUNBQW1DO0FBQ25DLHVDQUF1QztBQUN2Qyx1Q0FBdUM7QUFDdkMsbUVBQW1FO0FBQ25FLHNDQUFzQztBQUN0Qyx3Q0FBd0M7QUFDeEMsaUJBQWlCO0FBQ2pCLFlBQVk7QUFFWixtQ0FBbUM7QUFDbkMsNkVBQTZFO0FBQzdFLFlBQVk7QUFFWixhQUFhO0FBQ2IsZ0NBQWdDO0FBQ2hDLDJCQUEyQjtBQUMzQixhQUFhO0FBRWIsc0NBQXNDO0FBQ3RDLCtDQUErQztBQUMvQyxZQUFZO0FBRVosa0NBQWtDO0FBQ2xDLGdDQUFnQztBQUNoQyxrQ0FBa0M7QUFDbEMsWUFBWTtBQUVaLDBEQUEwRDtBQUMxRCxvQ0FBb0M7QUFDcEMsMEJBQTBCO0FBQzFCLFlBQVk7QUFFWixvREFBb0Q7QUFDcEQsb0NBQW9DO0FBQ3BDLDBCQUEwQjtBQUMxQixZQUFZO0FBRVosb0VBQW9FO0FBQ3BFLHVDQUF1QztBQUN2QywwQkFBMEI7QUFDMUIsWUFBWTtBQUVaLG9DQUFvQztBQUNwQywyQ0FBMkM7QUFDM0MsNENBQTRDO0FBQzVDLGlDQUFpQztBQUNqQyxxREFBcUQ7QUFDckQsWUFBWTtBQUVaLHVDQUF1QztBQUN2Qyx1Q0FBdUM7QUFDdkMsWUFBWTtBQUVaLGdDQUFnQztBQUNoQyxxREFBcUQ7QUFDckQsWUFBWTtBQUVaLCtCQUErQjtBQUMvQixvQ0FBb0M7QUFDcEMsWUFBWTtBQUVaLDJDQUEyQztBQUMzQyxtQ0FBbUM7QUFDbkMsWUFBWTtBQUVaLHlEQUF5RDtBQUN6RCw2REFBNkQ7QUFDN0QsWUFBWTtBQUNaLFFBQVE7QUFDUixJQUFJOzs7QUMveEJKLE1BQU07QUFDTixvQkFBb0I7QUFDcEIsaUJBQWlCO0FBQ2pCLHVDQUF1Qzs7QUFFdkMsa0NBQWtDO0FBRWxDLElBQVksU0FNWDtBQU5ELFdBQVksU0FBUztJQUNqQix5Q0FBSSxDQUFBO0lBQ0osaURBQVEsQ0FBQTtJQUNSLCtDQUFPLENBQUE7SUFDUCwyQ0FBSyxDQUFBO0lBQ0wsZ0JBQWdCO0FBQ3BCLENBQUMsRUFOVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQU1wQjtBQUVELElBQVksUUFJWDtBQUpELFdBQVksUUFBUTtJQUNoQix1Q0FBSSxDQUFBO0lBQ0osdUNBQUksQ0FBQTtJQUNKLHlDQUFLLENBQUEsQ0FBRyxJQUFJO0FBQ2hCLENBQUMsRUFKVyxRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQUluQjs7OztBQ25CRDtJQUFBO0lBOEJBLENBQUM7SUE1Qkcsc0JBQWtCLGtCQUFRO2FBQTFCO1lBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7UUFDM0QsQ0FBQzs7O09BQUE7SUFFYSxZQUFLLEdBQW5CLFVBQW9CLEdBQVE7UUFDeEIsR0FBRyxHQUFHLEtBQUcsR0FBSyxDQUFDO1FBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRWEsV0FBSSxHQUFsQixVQUFtQixHQUFRO1FBQ3ZCLEdBQUcsR0FBRyxLQUFHLEdBQUssQ0FBQztRQUNmLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVhLFdBQUksR0FBbEIsVUFBbUIsR0FBUTtRQUN2QixHQUFHLEdBQUcsS0FBRyxHQUFLLENBQUM7UUFDZixPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFYSxZQUFLLEdBQW5CLFVBQW9CLEdBQVE7UUFDeEIsR0FBRyxHQUFHLEtBQUcsR0FBSyxDQUFDO1FBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixNQUFNLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRU8sNkJBQVksR0FBcEIsVUFBcUIsR0FBVztRQUM1QixNQUFNO0lBQ1YsQ0FBQztJQUNMLGFBQUM7QUFBRCxDQTlCQSxBQThCQyxJQUFBOzs7OztBQ3JCRDtJQUFBO0lBcUVBLENBQUM7SUFuRUc7Ozs7Ozs7O09BUUc7SUFDVyxtQkFBVyxHQUF6QixVQUEwQixDQUFRLEVBQUUsQ0FBUTtRQUN4QyxPQUFPLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNXLGNBQU0sR0FBcEIsVUFBcUIsSUFBUyxFQUFFLEdBQVEsRUFBRSxRQUFlO1FBQ3JELElBQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM1QixJQUFNLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDNUIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFBLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBLEdBQUcsU0FBQSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQSxDQUFDLENBQUM7UUFDbEQsSUFBSSxRQUFRLElBQUksUUFBUSxFQUFFO1lBQ3RCLE9BQU8sR0FBRyxDQUFDO1NBQ2Q7UUFDRCxJQUFNLEtBQUssR0FBRyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ2xDLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNXLHdCQUFnQixHQUE5QixVQUErQixJQUFTLEVBQUUsR0FBUSxFQUFFLFFBQWU7UUFDL0QsSUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzVCLElBQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM1QixJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQUEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUEsR0FBRyxTQUFBLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUNsRCxJQUFJLFFBQVEsSUFBSSxRQUFRLEVBQUU7WUFDdEIsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2YsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELElBQU0sS0FBSyxHQUFHLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDbEMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBQyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBQyxLQUFLLENBQUM7UUFDN0IsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ1csdUJBQWUsR0FBN0IsVUFBOEIsSUFBUyxFQUFFLEdBQVEsRUFBRSxRQUFlO1FBRTlELElBQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM1QixJQUFNLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDNUIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFBLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBLEdBQUcsU0FBQSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQSxDQUFDLENBQUM7UUFDbEQsSUFBTSxLQUFLLEdBQUcsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUNsQyxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksR0FBQyxLQUFLLEVBQUUsSUFBSSxHQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFTCxjQUFDO0FBQUQsQ0FyRUEsQUFxRUMsSUFBQTtBQXJFWSwwQkFBTztBQXVFcEI7SUFtREksY0FBWSxDQUFTLEVBQUUsQ0FBUztRQUM1QixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNYLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsQ0FBQztJQXBEYSxpQkFBWSxHQUExQixVQUEyQixJQUFlO1FBQ3RDLElBQUksTUFBTSxHQUFVLEVBQUUsQ0FBQztRQUV2QixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRztZQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBS0Q7OztPQUdHO0lBQ0kseUJBQVUsR0FBakIsVUFBa0IsR0FBUTtRQUN0QixPQUFPLFNBQUEsQ0FBQyxTQUFBLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBLEdBQUcsU0FBQSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQSxDQUFDLEVBQUUsR0FBRyxDQUFBLENBQUM7SUFDNUQsQ0FBQztJQUVEOzs7T0FHRztJQUNJLG1CQUFJLEdBQVgsVUFBWSxHQUFRO1FBQ2hCLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksOEJBQWUsR0FBdEIsVUFBdUIsTUFBVztRQUM5QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7O09BRUc7SUFDSSxvQkFBSyxHQUFaO1FBQ0ksT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRU0scUJBQU0sR0FBYixVQUFjLEdBQVE7UUFDbEIsT0FBTyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFNTCxXQUFDO0FBQUQsQ0F2REEsQUF1REMsSUFBQTtBQXZEWSxvQkFBSTs7O0FDaEZqQixrQkFBa0I7O0FBR2xCLGlEQUErQztBQUMvQyx5Q0FBcUM7QUFDckMsMERBQXlEO0FBR3pEO0lBY0k7Ozs7Ozs7T0FPRztJQUNILGFBQVksT0FBYyxFQUFFLGVBQXNCLEVBQUMsSUFBUyxFQUFFLEdBQVEsRUFBRSxLQUFnQjtRQUFoQixzQkFBQSxFQUFBLFNBQWdCO1FBaEJoRixXQUFNLEdBQVUsQ0FBQyxDQUFDLENBQUEsT0FBTztRQUl6QixnQkFBVyxHQUFVLENBQUMsQ0FBQyxDQUFBLElBQUk7UUFhL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xHLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxjQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLHVCQUFnQixFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsZUFBZSxDQUFDLENBQUM7UUFDMUYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksdUJBQWdCLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxTQUFTLEVBQUMsSUFBSSxjQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNuRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDaEMseUJBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLHlCQUFXLENBQUMsS0FBSyxDQUFDLG1CQUFtQixFQUFFLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUV2RixDQUFDO0lBRUQ7OztPQUdHO0lBQ0sscUJBQU8sR0FBZixVQUFnQixLQUFZO1FBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxjQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsRixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsWUFBWTtRQUN0RixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLFdBQVcsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxTQUFTLEVBQUMsSUFBSSxjQUFJLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUEsWUFBWTtRQUNwSSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7O09BR0c7SUFDSSxxQkFBTyxHQUFkLFVBQWUsT0FBYztRQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztJQUU1QixDQUFDO0lBTUQsc0JBQVcsMkJBQVU7UUFKckI7OztXQUdHO2FBQ0gsVUFBc0IsVUFBaUI7WUFDbkMsSUFBRyxVQUFVLEtBQUssQ0FBQyxFQUFDO2dCQUNoQixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztnQkFDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDbkM7aUJBQUk7Z0JBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLFdBQVcsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxTQUFTLEVBQUMsSUFBSSxjQUFJLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUN4SCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ2hDO1FBQ0wsQ0FBQzs7O09BQUE7SUFFRDs7T0FFRztJQUNJLHdCQUFVLEdBQWpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7T0FFRztJQUNJLHVCQUFTLEdBQWhCO1FBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFJTCxVQUFDO0FBQUQsQ0EvRkEsQUErRkMsSUFBQTtBQS9GWSxrQkFBRztBQWlHaEI7SUFlSTs7Ozs7Ozs7T0FRRztJQUNILGdCQUFZLE9BQWdCLEVBQUUsSUFBdUIsRUFBRSxPQUFjLEVBQUUsR0FBUSxFQUFFLElBQVMsRUFBRyxLQUF3QixFQUFFLEtBQWdCO1FBQXpHLHFCQUFBLEVBQUEsZ0JBQXVCO1FBQXdDLHNCQUFBLEVBQUEsaUJBQXdCO1FBQUUsc0JBQUEsRUFBQSxTQUFnQjtRQUNuSSxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksY0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakYsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksdUJBQWdCLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEYsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN4Qix5QkFBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMseUJBQVcsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEVBQUUsRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25GLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUVuQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksd0JBQU8sR0FBZCxVQUFlLEdBQVk7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBQyxJQUFJLEVBQUMsVUFBQyxDQUFhO1lBQ2xELENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztRQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxVQUFDLENBQWE7WUFDaEQsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOztPQUVHO0lBQ0ksdUJBQU0sR0FBYjtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBSUQ7OztPQUdHO0lBQ0ksd0JBQU8sR0FBZCxVQUFlLEtBQVk7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGNBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsRixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRDs7T0FFRztJQUNJLHdCQUFPLEdBQWQ7UUFDSSxJQUFJLE1BQU0sR0FBYSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDN0IsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDYixNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNiLE1BQU0sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN6QixNQUFNLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztRQUN4QixNQUFNLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBR0wsYUFBQztBQUFELENBaEdBLEFBZ0dDLElBQUE7QUFoR1ksd0JBQU07QUFtR25CO0lBQTBCLHdCQUFTO0lBUS9COzs7OztPQUtHO0lBQ0gsY0FBWSxJQUFTLEVBQUUsS0FBWTtRQUFuQyxZQUNJLGlCQUFPLFNBYVY7UUEzQk8sYUFBTyxHQUFXLElBQUksQ0FBQyxDQUFBLGFBQWE7UUFHcEMsVUFBSSxHQUFRLElBQUksY0FBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLE1BQU07UUFZcEMsS0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUEsVUFBVTtRQUNoRCxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQSxVQUFVO1FBQ2pELEtBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxHQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQSxRQUFRO1FBQ3ZDLEtBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLENBQUEsUUFBUTtRQUM5QixLQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxDQUFBLFFBQVE7UUFDL0IsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQSxVQUFVO1FBQy9CLEtBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLENBQUEsRUFBRTtRQUN6Qix5QkFBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMseUJBQVcsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEVBQUUsRUFBQyxLQUFJLEVBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUEsU0FBUztRQUM1Rix5QkFBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMseUJBQVcsQ0FBQyxLQUFLLENBQUMsdUJBQXVCLEVBQUUsRUFBQyxLQUFJLEVBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUEsWUFBWTs7SUFFdEcsQ0FBQztJQUVEOzs7T0FHRztJQUNJLHNCQUFPLEdBQWQsVUFBZSxJQUFhO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7T0FFRztJQUNJLHFCQUFNLEdBQWI7UUFFSSxJQUFHLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUFDO1lBRXJCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7U0FFdkI7YUFBSTtZQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQ3ZCO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0ksMEJBQVcsR0FBbEI7UUFDSSxJQUFHLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUFDO1lBQ3JCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBRW5DO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0ksMkJBQVksR0FBbkI7UUFDSSxJQUFHLElBQUksQ0FBQyxPQUFPLEVBQUM7WUFDWixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBRXhCO0lBQ0wsQ0FBQztJQUdEOzs7T0FHRztJQUNLLHNCQUFPLEdBQWYsVUFBZ0IsS0FBWTtRQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNqQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNuQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksc0JBQU8sR0FBZCxVQUFlLElBQVc7UUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLHFCQUFNLEdBQWIsVUFBYyxHQUF3QjtRQUF4QixvQkFBQSxFQUFBLFVBQWUsY0FBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7UUFDaEIsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSx3QkFBUyxHQUFoQjtRQUNJLHlCQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyx5QkFBVyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEYseUJBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLHlCQUFXLENBQUMsS0FBSyxDQUFDLHVCQUF1QixFQUFFLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzRixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksMEJBQVcsR0FBbEIsVUFBbUIsS0FBWTtRQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDL0IsQ0FBQztJQUVMLFdBQUM7QUFBRCxDQTFIQSxBQTBIQyxDQTFIeUIsSUFBSSxDQUFDLElBQUksR0EwSGxDO0FBMUhZLG9CQUFJOzs7QUM1TWpCLGtCQUFrQjs7QUFFbEIsaURBQStDO0FBQy9DLDJEQUFrRDtBQUNsRCx1REFBeUM7QUFDekMsbUNBQW9DO0FBQ3BDLHlDQUFxQztBQUVyQywwREFBeUQ7QUFHekQ7SUFBQTtJQTRLQSxDQUFDO0lBdEtHOzs7T0FHRztJQUNXLDRCQUFVLEdBQXhCLFVBQTBCLEtBQWlCO1FBQ3ZDLGlCQUFpQixDQUFDLFFBQVEsR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUMsQ0FBQSxPQUFPO1FBQzVELGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsSUFBSSx1QkFBZ0IsRUFBRSxDQUFDLENBQUEsU0FBUztRQUNyRSx5QkFBeUI7UUFDekIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQSxpQkFBaUI7UUFDcEUseUJBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBLFFBQVE7UUFDM0IsaUJBQWlCLENBQUMsVUFBVSxHQUFHLGNBQU8sQ0FBQyxDQUFDLENBQUEsWUFBWTtRQUNwRCx1REFBdUQ7SUFFM0QsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNJLHFDQUFTLEdBQWhCLFVBQWlCLEdBQWUsRUFBRSxPQUFhLEVBQUUsUUFBYyxFQUFFLGVBQXVCLEVBQUUsVUFBa0IsRUFBRSxLQUFpQjtRQUFqQixzQkFBQSxFQUFBLFNBQWlCO1FBQzNILElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSwrQkFBVSxDQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLGVBQWUsRUFBQyxVQUFVLEVBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQSxNQUFNO1FBQzlGLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFBLE9BQU87SUFDeEUsQ0FBQztJQUVEOzs7T0FHRztJQUNJLG1DQUFPLEdBQWQsVUFBZSxLQUFhO1FBQ3hCLHlCQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUEsY0FBYztJQUVoRSxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNJLHdDQUFZLEdBQW5CLFVBQW9CLEtBQWlCLEVBQUUsR0FBUyxFQUFFLEdBQTBCLEVBQUUsS0FBd0IsRUFBRSxNQUErRDtRQUFySCxvQkFBQSxFQUFBLFVBQWUsY0FBSSxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUM7UUFBRSxzQkFBQSxFQUFBLGlCQUF3QjtRQUFFLHVCQUFBLEVBQUEsU0FBMEIsaUJBQWlCLENBQUMsUUFBUSxDQUFDLFVBQVU7UUFDbkssSUFBSSxRQUFRLEdBQVcsSUFBSSwwQkFBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQSxTQUFTO0lBQ25GLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0ksbUNBQU8sR0FBZCxVQUFlLEtBQWlCLEVBQUUsV0FBc0IsRUFBRSxVQUFzQixFQUFFLEtBQXlCLEVBQUUsQ0FBUyxFQUFFLENBQVM7UUFBL0YsNEJBQUEsRUFBQSxlQUFzQjtRQUFFLDJCQUFBLEVBQUEsY0FBc0I7UUFBRSxzQkFBQSxFQUFBLGlCQUF5QjtRQUN2RyxJQUFJLFFBQVEsR0FBVyxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUEsaUJBQWlCO1FBQ3hFLElBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBTSxTQUFTLEVBQUMsRUFBQyxZQUFZO1lBQ3hELFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsYUFBYTtTQUVyRTthQUFJLEVBQUMsV0FBVztZQUNiLFFBQVEsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUEsV0FBVztTQUN2RDtJQUVMLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLDRDQUFnQixHQUF2QixVQUF3QixJQUFnQixFQUFFLEVBQWM7UUFDcEQsc0JBQXNCO1FBQ3RCLGlCQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRTNDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksNENBQWdCLEdBQXZCLFVBQXdCLEtBQWlCO1FBQ3JDLGFBQWE7UUFDYixpQkFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBRTdDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksd0NBQVksR0FBbkIsVUFBb0IsS0FBaUIsRUFBRSxHQUFVO1FBQzdDLElBQUksUUFBUSxHQUFXLGlCQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQSxhQUFhO1FBQ3BFLElBQUcsR0FBRyxLQUFLLFNBQVMsRUFBQztZQUNqQixRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDdEI7UUFDRCxJQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUM7WUFDaEMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3RCO1FBQ0QsYUFBYTtJQUNqQixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksaUNBQUssR0FBWixVQUFhLEtBQWlCLEVBQUUsT0FBZSxFQUFFLEdBQVU7UUFDdkQsaUJBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQSxhQUFhO1FBQ3hFLGlCQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUEsU0FBUztJQUNuRSxDQUFDO0lBRUQ7O09BRUc7SUFDSSwyQ0FBZSxHQUF0QjtRQUNJLHlCQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyx5QkFBVyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUMsQ0FBQSxtQkFBbUI7SUFDL0YsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxnQ0FBSSxHQUFYLFVBQVksS0FBaUIsRUFBRSxHQUFTO1FBQ3BDLGlCQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUEsZUFBZTtJQUNqRSxDQUFDO0lBSUQ7Ozs7Ozs7Ozs7T0FVRztJQUNJLHdDQUFZLEdBQW5CLFVBQW9CLEtBQWlCLEVBQUMsR0FBVSxFQUFFLFFBQWtCLEVBQUUsSUFBYSxFQUFFLEdBQVUsRUFBRSxJQUFXLEVBQUUsS0FBYztRQUN4SCxJQUFJLE1BQU0sR0FBVyxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUEsYUFBYTtRQUNsRSxJQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxFQUFDLEVBQUMsV0FBVztZQUMvQyxJQUFHLEdBQUcsS0FBSyxTQUFTLEVBQUMsRUFBQyxXQUFXO2dCQUM3QixNQUFNLENBQUMsNEJBQTRCLENBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQSxXQUFXO2FBQzNFO2lCQUFJLEVBQUMsVUFBVTtnQkFDWixNQUFNLENBQUMsNkJBQTZCLENBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFBLFdBQVc7YUFDckY7U0FDSjthQUFJLEVBQUMsVUFBVTtZQUNaLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUEsUUFBUTtTQUNuRDtJQUNMLENBQUM7SUFFTCx3QkFBQztBQUFELENBNUtBLEFBNEtDLElBQUE7Ozs7QUN2TEQsa0JBQWtCOztBQUVsQixpREFBK0M7QUFDL0MsbUNBQW9DO0FBQ3BDLG1EQUFzRDtBQUV0RCx5Q0FBcUM7QUFDckMsMkRBQWdEO0FBQ2hELDBEQUF5RDtBQUd6RDtJQXNCSTs7Ozs7O09BTUc7SUFDSCxpQkFBWSxJQUFhLEVBQUUsR0FBUSxFQUFFLElBQVMsRUFBRSxNQUF1QixFQUFFLEtBQXdCLEVBQUUsS0FBZ0I7UUFBMUMsc0JBQUEsRUFBQSxpQkFBd0I7UUFBRSxzQkFBQSxFQUFBLFNBQWdCO1FBMUIzRyxtQkFBYyxHQUFVLENBQUMsQ0FBQyxDQUFBLFlBQVk7UUFHdEMsV0FBTSxHQUFVLENBQUMsQ0FBQyxDQUFBLE9BQU87UUFJekIsYUFBUSxHQUFlLElBQUkseUJBQU0sRUFBTyxDQUFDLENBQUEsUUFBUTtRQUVqRCxxQkFBZ0IsR0FBVyxLQUFLLENBQUMsQ0FBQSxlQUFlO1FBQ2hELGdCQUFXLEdBQWtCLElBQUkseUJBQU0sRUFBVSxDQUFDO1FBR2xELGtCQUFhLEdBQVUsQ0FBQyxDQUFDLENBQUEsV0FBVztRQUVwQyxvQkFBZSxHQUFVLENBQUMsQ0FBQyxDQUFBLFdBQVc7UUFZMUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsQ0FBQSxPQUFPO1FBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLENBQUEsTUFBTTtRQUMxQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFBLE1BQU07UUFDNUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLHVCQUFnQixFQUFFLENBQUMsQ0FBQSxRQUFRO1FBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBLE9BQU87UUFDeEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUMsSUFBSSxjQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUMsSUFBSSxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQSxVQUFVO1FBQzFLLGlCQUFRLENBQUMsR0FBRyxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQSxZQUFZO1FBQzFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFBLFNBQVM7UUFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLHFCQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQSxRQUFRO1FBQzFELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBLEVBQUU7UUFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBLEVBQUU7UUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUEsV0FBVztRQUMxQyx5QkFBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMseUJBQVcsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEVBQUUsRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUEsU0FBUztRQUM1RixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUEsRUFBRTtRQUMxRCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUEsRUFBRTtRQUN4RCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQSxFQUFFO1FBQ2pFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSx1QkFBZ0IsRUFBRSxDQUFDLENBQUEsRUFBRTtRQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQSxFQUFFO1FBQ25DLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQSxFQUFFO1FBQ2pFLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQSxFQUFFO1FBQ2pDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFBLEVBQUU7UUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLHVCQUFnQixFQUFFLENBQUMsQ0FBQSxFQUFFO1FBQ3RDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQSxFQUFFO1FBQzNFLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQSxFQUFFO1FBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBLEVBQUU7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUEsRUFBRTtJQUlyQyxDQUFDO0lBRUQ7O09BRUc7SUFDSyx3QkFBTSxHQUFkO1FBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFHRDs7O09BR0c7SUFDSSxxQkFBRyxHQUFWLFVBQVcsRUFBYTtRQUF4QixpQkFxQkM7UUFwQkcsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUNqQyxJQUFJLE1BQU0sR0FBUSxJQUFJLGNBQUksQ0FBQyxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BJLElBQUksR0FBRyxHQUFZLFVBQUMsTUFBVztZQUMzQixJQUFHLEtBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxFQUFDO2dCQUN4QixLQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztnQkFDekIsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQzVCLGlDQUFpQztnQkFDakMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSSxFQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMzQixpQkFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUN0QyxPQUFPO2FBRVY7WUFDRCxJQUFJLFlBQVksR0FBUSxJQUFJLGNBQUksQ0FBRSxDQUFDLEVBQUUsR0FBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUMsS0FBSSxDQUFDLGVBQWUsRUFBQyxDQUFDLEVBQUUsR0FBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzNHLEtBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDO1lBQzdCLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2xDLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDO1FBQ3RELENBQUMsQ0FBQztRQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUUxQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSx3QkFBTSxHQUFiO1FBQUEsaUJBaUJDO1FBaEJHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDM0IsSUFBSSxHQUFHLEdBQVk7WUFDZixJQUFHLEtBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxFQUFDO2dCQUN0QixLQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDOUIsS0FBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUksRUFBQyxHQUFHLENBQUMsQ0FBQztnQkFDM0IsT0FBTzthQUNWO1lBRUQsS0FBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUM7WUFDM0IsS0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSSxDQUFDLGFBQWEsQ0FBQztRQUM1QyxDQUFDLENBQUE7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWpDLENBQUM7SUFHRDs7T0FFRztJQUNLLG9DQUFrQixHQUExQjtRQUNJLElBQUcsSUFBSSxDQUFDLGdCQUFnQixLQUFLLEtBQUssRUFBQztZQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUN6RCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUN6RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1NBQ2hDO2FBQUk7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUM1RCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUM1RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1NBQ2pDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0ssMkJBQVMsR0FBakI7UUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRDs7T0FFRztJQUNLLDBCQUFRLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0sseUJBQU8sR0FBZixVQUFnQixLQUFZO1FBRXhCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBQyxJQUFJLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxTQUFTLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JGLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUM7SUFHbkMsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNLLHlCQUFPLEdBQWYsVUFBZ0IsSUFBYSxFQUFFLEdBQVEsRUFBRSxJQUFTLEVBQUMsS0FBWTtRQUMzRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksY0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksY0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQztRQUM1RSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksY0FBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQztJQUU5RCxDQUFDO0lBSUQ7O09BRUc7SUFDSSwwQkFBUSxHQUFmO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBR0Q7OztPQUdHO0lBQ0ksMEJBQVEsR0FBZixVQUFnQixHQUFRO1FBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxjQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFHRDs7T0FFRztJQUNJLHlCQUFPLEdBQWQ7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7T0FFRztJQUNJLDJCQUFTLEdBQWhCO1FBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFHRDs7T0FFRztJQUNJLHlCQUFPLEdBQWQ7UUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUdEOztPQUVHO0lBQ0ksMkJBQVMsR0FBaEI7UUFFSSxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztRQUN4QixJQUFJLEdBQUcsR0FBTyxJQUFJLG9CQUFHLENBQUMsQ0FBQyxFQUFDLFNBQVMsRUFBQyxJQUFJLGNBQUksQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxjQUFJLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBQyxHQUFHLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUdwRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksd0JBQU0sR0FBYixVQUFjLEdBQVU7UUFDcEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFPLEdBQUssQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSSwyQkFBUyxHQUFoQixVQUFpQixlQUFzQixFQUFDLElBQVcsRUFBQyxVQUFpQixFQUFDLENBQWEsRUFBQyxDQUFZO1FBQTFCLGtCQUFBLEVBQUEsTUFBYTtRQUFDLGtCQUFBLEVBQUEsS0FBWTtRQUU1RixJQUFJLE1BQU0sR0FBTyxJQUFJLG9CQUFHLENBQUMsSUFBSSxFQUFDLGVBQWUsRUFBQyxJQUFJLGNBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxjQUFJLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqSCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFPLElBQU0sRUFBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNuRSxNQUFNLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUNuQyxDQUFDO0lBR0Q7Ozs7T0FJRztJQUNJLHlCQUFPLEdBQWQsVUFBZSxJQUFXLEVBQUUsVUFBaUI7UUFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBTyxJQUFNLENBQUMsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQzlELENBQUM7SUFHRDs7T0FFRztJQUNLLCtCQUFhLEdBQXJCO1FBQ0ksSUFBSSxJQUFJLEdBQVUsSUFBSSx1QkFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLENBQUMsRUFBQyxJQUFJLGNBQUksQ0FBRSxDQUFFLEVBQUUsRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksY0FBSSxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBQyxTQUFTLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVILElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxJQUFJLElBQUksR0FBVSxJQUFJLHVCQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBQyxnQkFBZ0IsRUFBQyxDQUFDLEVBQUMsSUFBSSxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLGNBQUksQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsU0FBUyxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5SSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUdEOzs7Ozs7T0FNRztJQUNJLDhDQUE0QixHQUFuQyxVQUFvQyxJQUFXLEVBQUMsR0FBVSxFQUFFLEtBQWEsRUFBRSxHQUFhO1FBQ3BGLElBQUksTUFBTSxHQUFVLElBQUksdUJBQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsSUFBSSxjQUFJLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBQyxJQUFJLGNBQUksQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNySCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUMsRUFBRSxFQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxhQUFhLElBQUksRUFBRSxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0ksK0NBQTZCLEdBQXBDLFVBQXFDLElBQVcsRUFBQyxHQUFVLEVBQUMsR0FBWSxFQUFDLEdBQVEsRUFBQyxJQUFTLEVBQUUsS0FBYTtRQUN0RyxJQUFJLE1BQU0sR0FBVSxJQUFJLHVCQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUMsRUFBRSxFQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLDJCQUFTLEdBQWhCLFVBQWlCLEdBQVU7UUFDdkIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUMsRUFBRSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVMLGNBQUM7QUFBRCxDQXJVQSxBQXFVQyxJQUFBOzs7OztBQ2hWRCxrQkFBa0I7QUFDbEIsaURBQStDO0FBQy9DLHlDQUFxQztBQUNyQywwREFBeUQ7QUFHekQ7SUFBZ0MsOEJBQWdCO0lBVzVDOzs7Ozs7Ozs7T0FTRztJQUNILG9CQUFZLEdBQWMsRUFBRSxPQUFZLEVBQUUsUUFBYSxFQUFFLGVBQXNCLEVBQUUsVUFBaUIsRUFBRSxLQUFZO1FBQWhILFlBQ0ksaUJBQU8sU0FpQlY7UUFoQkcsS0FBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDbkIsS0FBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsS0FBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGNBQUksQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBQyxLQUFJLENBQUMsTUFBTSxFQUFFLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVuRixLQUFJLENBQUMsYUFBYSxHQUFHLElBQUksY0FBSSxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEtBQUksQ0FBQyxNQUFNLEVBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUEsc0JBQXNCO1FBQ25ILEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxlQUFlLENBQUM7UUFDeEMsS0FBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7UUFDOUIsS0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDckMsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLEtBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixLQUFJLENBQUMsY0FBYyxDQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN0Qyx5QkFBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMseUJBQVcsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEVBQUUsRUFBQyxLQUFJLEVBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztJQUV2RixDQUFDO0lBRUQ7O09BRUc7SUFDSyxtQ0FBYyxHQUF0QjtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDMUosSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBRTNCLENBQUM7SUFFRDs7T0FFRztJQUNLLG9DQUFlLEdBQXZCO1FBQ0ksSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsQ0FBQSxpQkFBaUI7UUFDeEMsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRyxFQUFDO1lBQ3pDLElBQUksTUFBTSxHQUFzQixFQUFFLENBQUM7WUFDbkMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRyxFQUFDO2dCQUM3QyxJQUFJLE1BQU0sR0FBb0IsSUFBSSx1QkFBZ0IsRUFBRSxDQUFDO2dCQUNyRCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsV0FBVyxFQUFDLElBQUksY0FBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1SSxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3pCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNsQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3JCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDdkI7WUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNsQztJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSyxtQ0FBYyxHQUF0QixVQUF1QixLQUFZO1FBQy9CLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUcsRUFBQztZQUM5QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFHLEVBQUM7Z0JBQ2xELElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN4QyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3pDO1NBQ0o7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLHFDQUFnQixHQUF2QixVQUF3QixPQUFZLEVBQUMsS0FBWTtRQUM3QyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMxRCxDQUFDO0lBRUQ7O09BRUc7SUFDSyw2QkFBUSxHQUFoQjtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdEIsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRyxFQUFDO1lBQzlDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUcsRUFBQztnQkFDbEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDNUM7U0FDSjtJQUVMLENBQUM7SUFFRDs7O09BR0c7SUFDSSw0QkFBTyxHQUFkLFVBQWUsR0FBVTtRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksY0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xGLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQSxzQkFBc0I7UUFDbkgsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVMLGlCQUFDO0FBQUQsQ0EzSEEsQUEySEMsQ0EzSCtCLHVCQUFnQixHQTJIL0M7QUEzSFksZ0NBQVU7Ozs7QUNOdkIseUNBQXFDO0FBRXJDLGtCQUFrQjtBQUVsQjtJQUE4QyxvQ0FBVztJQUtyRDtlQUNJLGlCQUFPO0lBQ1gsQ0FBQztJQUVNLDhDQUFtQixHQUExQjtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFDLENBQUMsRUFBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxLQUFLLEVBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUYsQ0FBQztJQUVEOzs7T0FHRztJQUNJLG1DQUFRLEdBQWYsVUFBZ0IsS0FBWTtRQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN4QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksc0NBQVcsR0FBbEI7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxLQUFLLEdBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2SixDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSSxtQ0FBUSxHQUFmLFVBQWdCLElBQVcsRUFBRSxJQUFXLEVBQUUsS0FBWSxFQUFFLE1BQWEsRUFBRSxLQUEwQixFQUFFLFlBQWlDO1FBQTdELHNCQUFBLEVBQUEsUUFBZSxJQUFJLENBQUMsTUFBTTtRQUFFLDZCQUFBLEVBQUEsbUJBQXdCLGNBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO1FBRWhJLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2QsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDZCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7T0FFRztJQUNJLDBDQUFlLEdBQXRCO1FBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVEOzs7T0FHRztJQUNJLG1DQUFRLEdBQWYsVUFBZ0IsT0FBWTtRQUN4QixJQUFJLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksaUNBQU0sR0FBYixVQUFjLFFBQWE7UUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksaUNBQU0sR0FBYjtRQUNJLE9BQU8sSUFBSSxjQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksa0NBQU8sR0FBZDtRQUNJLE9BQU8sSUFBSSxjQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksbUNBQVEsR0FBZjtRQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBQ0wsdUJBQUM7QUFBRCxDQWpHQSxBQWlHQyxDQWpHNkMsSUFBSSxDQUFDLE1BQU0sR0FpR3hEOzs7O0FDckdELGtCQUFrQjs7QUFHbEIsMkRBQWdEO0FBSWhELFlBQVk7QUFDWjtJQUFBO0lBV0EsQ0FBQztJQVRpQixZQUFHLEdBQWpCLFVBQWtCLEdBQVcsRUFBQyxJQUFhO1FBQ3ZDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUMsRUFBRSxFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFYSxZQUFHLEdBQWpCLFVBQWtCLEdBQVU7UUFDeEIsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUMsRUFBRSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQVBhLFlBQUcsR0FBbUIsSUFBSSx5QkFBTSxFQUFFLENBQUM7SUFVckQsZUFBQztDQVhELEFBV0MsSUFBQTtBQVhZLDRCQUFROzs7O0FDTnJCLE1BQU07QUFDTjtJQXdCSTtRQWZRLFlBQU8sR0FBd0IsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFlNUMsQ0FBQztJQXJCVCxnQkFBSSxHQUFsQjtRQUNJLFdBQVcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUN6QyxXQUFXLENBQUMsS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7UUFDaEMsV0FBVyxDQUFDLElBQUksR0FBRyxjQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQUEsQ0FBQztJQUlLLHdCQUFFLEdBQVQsVUFBVSxJQUFXLEVBQUUsTUFBVSxFQUFFLFFBQWlCLEVBQUUsSUFBVztRQUM3RCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRU0sMkJBQUssR0FBWixVQUFhLElBQVcsRUFBRSxJQUFTO1FBQy9CLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRU0seUJBQUcsR0FBVixVQUFXLElBQVcsRUFBRSxNQUFVLEVBQUUsUUFBaUI7UUFDakQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBSUwsa0JBQUM7QUFBRCxDQXpCQSxBQXlCQyxJQUFBO0FBekJZLGtDQUFXO0FBNEJ4QjtJQUFBO0lBcUJBLENBQUM7SUFwQlUscUJBQUssR0FBWixVQUFhLEdBQVEsRUFBRSxRQUFlO1FBQ2xDLE9BQVUsUUFBUSxvQ0FBK0IsR0FBRyxDQUFDLENBQUMsU0FBSSxHQUFHLENBQUMsQ0FBQyxNQUFHLENBQUM7SUFDdkUsQ0FBQztJQUNNLHFCQUFLLEdBQVosVUFBYSxHQUFRLEVBQUUsUUFBZTtRQUNsQyxPQUFVLFFBQVEsa0NBQTZCLEdBQUcsQ0FBQyxDQUFDLFNBQUksR0FBRyxDQUFDLENBQUMsTUFBRyxDQUFDO0lBQ3JFLENBQUM7SUFFRDs7T0FFRztJQUNJLG1DQUFtQixHQUExQjtRQUNJLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFTSx1Q0FBdUIsR0FBOUI7UUFDSSxPQUFPLGFBQWEsQ0FBQztJQUN6QixDQUFDO0lBSUwsWUFBQztBQUFELENBckJBLEFBcUJDLElBQUE7Ozs7QUNqREQ7SUFBNkIsMkJBQWM7SUFDdkMsaUJBQVksQ0FBUyxFQUFFLENBQVMsRUFBRSxLQUFhLEVBQUUsTUFBYztlQUMzRCxrQkFBTSxDQUFDLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxNQUFNLENBQUM7SUFDM0IsQ0FBQztJQUNMLGNBQUM7QUFBRCxDQUpBLEFBSUMsQ0FKNEIsSUFBSSxDQUFDLFNBQVMsR0FJMUM7QUFKWSwwQkFBTzs7OztBQ0NwQjtJQVNJO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQzVCLFFBQVEsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFQRCxzQkFBVywwQkFBSTthQUFmO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7OztPQUFBO0lBTmMsY0FBSyxHQUFVLENBQUMsQ0FBQztJQVlwQyxlQUFDO0NBYkQsQUFhQyxJQUFBO0FBYlksNEJBQVE7Ozs7QUNKckI7SUFBQTtJQWVBLENBQUM7SUFUaUIsWUFBSSxHQUFsQjtRQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFYSxjQUFNLEdBQXBCO1FBQ0ksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN2QyxDQUFDO0lBYnNCLGlCQUFTLEdBQVcsRUFBRSxDQUFDO0lBQ3ZCLGlCQUFTLEdBQVcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7SUFhckUsY0FBQztDQWZELEFBZUMsSUFBQTtrQkFmb0IsT0FBTzs7OztBQ0E1QixnR0FBZ0c7QUFDaEcsMkNBQXFDO0FBQ3JDLGlEQUEyQztBQUMzQzs7RUFFRTtBQUNGO0lBYUk7SUFBYyxDQUFDO0lBQ1IsZUFBSSxHQUFYO1FBQ0ksSUFBSSxHQUFHLEdBQWEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDN0MsR0FBRyxDQUFDLHFCQUFxQixFQUFDLGNBQUksQ0FBQyxDQUFDO1FBQ2hDLEdBQUcsQ0FBQyx3QkFBd0IsRUFBQyxpQkFBTyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQWpCTSxnQkFBSyxHQUFRLElBQUksQ0FBQztJQUNsQixpQkFBTSxHQUFRLEdBQUcsQ0FBQztJQUNsQixvQkFBUyxHQUFRLFNBQVMsQ0FBQztJQUMzQixxQkFBVSxHQUFRLE1BQU0sQ0FBQztJQUN6QixpQkFBTSxHQUFRLEtBQUssQ0FBQztJQUNwQixpQkFBTSxHQUFRLE1BQU0sQ0FBQztJQUNyQixxQkFBVSxHQUFLLG9CQUFvQixDQUFDO0lBQ3BDLG9CQUFTLEdBQVEsRUFBRSxDQUFDO0lBQ3BCLGdCQUFLLEdBQVMsS0FBSyxDQUFDO0lBQ3BCLGVBQUksR0FBUyxLQUFLLENBQUM7SUFDbkIsdUJBQVksR0FBUyxLQUFLLENBQUM7SUFDM0IsNEJBQWlCLEdBQVMsSUFBSSxDQUFDO0lBTzFDLGlCQUFDO0NBbkJELEFBbUJDLElBQUE7a0JBbkJvQixVQUFVO0FBb0IvQixVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7Ozs7QUMxQmxCLDBEQUFzRDtBQUN0RCxrREFBaUQ7QUFDakQsaURBQTJEO0FBRTNELDRDQUFtRDtBQUVuRCw4Q0FBZ0Q7QUFDaEQsdURBQW9FO0FBQ3BFLDREQUEyRDtBQUMzRCxzREFBcUQ7QUFDckQsd0RBQXVEO0FBQ3ZELHNEQUFxRDtBQUNyRCwyQ0FBaUM7QUFDakMsd0RBQXVEO0FBQ3ZELHNEQUFxRDtBQUNyRCw0Q0FBMkM7QUFNM0MsZ0JBQWdCO0FBQ2hCO0lBbUJJLGFBQWE7SUFDYixNQUFNO0lBQ04sV0FBVztJQUNYLE1BQU07SUFDTix5QkFBeUI7SUFFekIsS0FBSztJQUNMLFdBQVc7SUFDWCxPQUFPO0lBQ1AsdUJBQXVCO0lBR3ZCLGVBQVksSUFBZSxFQUFFLEdBQVE7UUE3QjlCLFNBQUksR0FBYyxrQkFBUyxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVk7UUFPOUMsYUFBUSxHQUFZLElBQUksc0JBQVEsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLHNCQUFRLENBQUMsb0JBQW9CLEVBQUMsc0JBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUEsU0FBUztRQXdCL0csR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLGFBQWEsQ0FBQztRQUUzQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksb0JBQVEsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSx1QkFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDLHdFQUF3RTtRQUN4RSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUkscUJBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksaUJBQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLHlCQUFlLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxpQkFBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWpDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSwyQkFBWSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUVsRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksdUJBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVuQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUkscUJBQVMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFakQsSUFBSSxrQkFBUyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxvQkFBSyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUU1QzthQUFNLElBQUksa0JBQVMsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUN4QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksdUJBQVUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFFOUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLHFCQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7U0FFbkM7SUFDTCxDQUFDO0lBRU0scUJBQUssR0FBWjtRQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLDRCQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVNLHNCQUFNLEdBQWI7UUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFTSxxQkFBSyxHQUFaO1FBQ0ksc0NBQXNDO1FBQ3RDLHVCQUF1QjtJQUMzQixDQUFDO0lBRU0sd0JBQVEsR0FBZjtRQUNJLE1BQU07SUFDVixDQUFDO0lBRU0sMkJBQVcsR0FBbEI7UUFDSSxNQUFNO0lBQ1YsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksc0JBQU0sR0FBYjtRQUFBLGlCQU1DO1FBTmEsZ0JBQWlCO2FBQWpCLFVBQWlCLEVBQWpCLHFCQUFpQixFQUFqQixJQUFpQjtZQUFqQiwyQkFBaUI7O1FBQzNCLElBQUksR0FBRyxHQUFVLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRW5ELE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO1lBQ2QsS0FBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7O09BR0c7SUFDSSwwQkFBVSxHQUFqQixVQUFrQixNQUFhO1FBQzNCLE9BQU87UUFDUCxPQUFPO1FBQ1AsUUFBUTtRQUNSLFlBQVk7SUFDaEIsQ0FBQztJQWVMLFlBQUM7QUFBRCxDQXhIQSxBQXdIQyxJQUFBOzs7OztBQzlJRCxpQ0FBNEI7QUFDNUIsOENBQWdEO0FBQ2hELHVEQUFxRDtBQUVyRCw0Q0FBdUM7QUFFdkM7SUFHSTtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWpCLE1BQU07UUFDTixJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFTLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyw0QkFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQVMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLDRCQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVNLHVCQUFJLEdBQVgsVUFBWSxHQUFRO1FBQ2hCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTSx3QkFBSyxHQUFaO1FBQ0ksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3pDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2pCO0lBQ0wsQ0FBQztJQUVNLHlCQUFNLEdBQWI7UUFDSSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDekMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDbEI7UUFDRCxvQkFBVSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ25ELENBQUM7SUFFTSx3QkFBSyxHQUFaO1FBQ0ksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3pDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2pCO0lBQ0wsQ0FBQztJQUVNLDhCQUFXLEdBQWxCLFVBQW1CLElBQWUsRUFBRSxHQUFRO1FBQ3hDLElBQUksS0FBSyxHQUFHLElBQUksZUFBSyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRU0sK0JBQVksR0FBbkIsVUFBb0IsRUFBVTtRQUMxQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDekMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLEVBQUUsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtnQkFDekIsT0FBTyxLQUFLLENBQUM7YUFDaEI7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTyw2QkFBVSxHQUFsQixVQUFtQixHQUFRO1FBQ3ZCLDJDQUEyQztRQUMzQyxLQUFLO1FBQ0wsOEJBQThCO1FBQzlCLHNEQUFzRDtJQUMxRCxDQUFDO0lBRU8sNEJBQVMsR0FBakI7UUFDSSxtREFBbUQ7UUFDbkQsNkRBQTZEO1FBQzdELDBDQUEwQztRQUMxQyx1QkFBdUI7UUFDdkIsc0VBQXNFO1FBQ3RFLDBEQUEwRDtRQUMxRCxHQUFHO0lBQ1AsQ0FBQztJQUNMLGVBQUM7QUFBRCxDQXZFQSxBQXVFQyxJQUFBOzs7OztBQzNFRDtJQUNJLHNCQUFZLE1BQVksRUFBRSxHQUFPO0lBRWpDLENBQUM7SUFDTCxtQkFBQztBQUFELENBSkEsQUFJQyxJQUFBO0FBSlksb0NBQVk7Ozs7QUNBekI7SUFDSSxtQkFBWSxNQUFZO0lBRXhCLENBQUM7SUFDTCxnQkFBQztBQUFELENBSkEsQUFJQyxJQUFBO0FBSlksOEJBQVM7Ozs7QUNBdEI7SUFDSSxvQkFBWSxNQUFZLEVBQUUsR0FBTztJQUVqQyxDQUFDO0lBQ0wsaUJBQUM7QUFBRCxDQUpBLEFBSUMsSUFBQTtBQUpZLGdDQUFVOzs7O0FDQXZCO0lBQ0ksbUJBQVksTUFBWSxFQUFFLEdBQU87SUFFakMsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FKQSxBQUlDLElBQUE7QUFKWSw4QkFBUzs7OztBQ0Z0QixtREFBd0Q7QUFDeEQsZ0RBQStDO0FBQy9DLHFFQUE2RDtBQUM3RCwwREFBeUQ7QUFFekQsaURBQW1EO0FBRW5EOztHQUVHO0FBQ0g7SUE0Rkksa0JBQVksQ0FBUSxFQUFDLENBQVEsRUFBQyxLQUE0QyxFQUFFLE1BQThDO1FBQTVGLHNCQUFBLEVBQUEsUUFBZSxRQUFRLENBQUMsb0JBQW9CO1FBQUUsdUJBQUEsRUFBQSxTQUFnQixRQUFRLENBQUMscUJBQXFCO1FBbEZsSCxhQUFRLEdBQVUsRUFBRSxDQUFDLENBQUEsY0FBYztRQW1GdkMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGlCQUFPLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQWxGRDs7T0FFRztJQUNLLGdDQUFhLEdBQXJCO1FBRVUsSUFBQTs7Ozs7U0FVTCxFQVRHLFlBQUksRUFDSixXQUFHLEVBQ0gsYUFBSyxFQUNMLGNBQU0sQ0FNVDtRQUVELElBQUksTUFBTSxHQUFVLEVBQUUsQ0FBQztRQUV2QixLQUFLLElBQUksSUFBSSxHQUFVLElBQUksRUFBRSxJQUFJLElBQUksS0FBSyxFQUFFLElBQUksSUFBSSxDQUFDLEVBQUU7WUFDbkQsS0FBSyxJQUFJLEtBQUssR0FBVSxHQUFHLEVBQUUsS0FBSyxJQUFJLE1BQU0sRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFO2dCQUN0RCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksY0FBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ3RDO1NBQ0o7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRU0sc0JBQUcsR0FBVixVQUFXLENBQVEsRUFBRSxDQUFRO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLDJCQUFRLEdBQWYsVUFBZ0IsR0FBUTtRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDcEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLHVCQUFJLEdBQVgsVUFBWSxLQUFZLEVBQUUsTUFBYTtRQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQzFCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSx3QkFBSyxHQUFaLFVBQWEsU0FBYyxFQUFFLFFBQW1DO1FBQW5DLHlCQUFBLEVBQUEsV0FBcUIsa0JBQVMsQ0FBQyxJQUFJO1FBQzVELElBQUksT0FBTyxHQUFVLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFBLFFBQVE7UUFDbEQsdUJBQXVCO1FBQ3ZCLDJCQUEyQjtRQUMzQixJQUFJLEtBQUssR0FBVSw0QkFBUyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFXLENBQUM7UUFDakYsMkJBQTJCO1FBQzNCLElBQUksS0FBSyxHQUFVLDRCQUFTLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQVcsQ0FBQztRQUdqRixNQUFNO1FBQ04scUJBQXFCO1FBQ3JCLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO1lBQ2IseUJBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLHlCQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsS0FBRyxRQUFVLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN2RixDQUFDLENBQUMsQ0FBQztRQUVILHFCQUFxQjtRQUNyQixLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRztZQUNiLHlCQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyx5QkFBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEtBQUcsUUFBVSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDdkYsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxDQUFBLGlCQUFpQjtJQUM3QyxDQUFDO0lBQUEsQ0FBQztJQUdGOzs7O09BSUc7SUFDSSxnQ0FBYSxHQUFwQixVQUFxQixTQUFjLEVBQUUsUUFBbUM7UUFBbkMseUJBQUEsRUFBQSxXQUFxQixrQkFBUyxDQUFDLElBQUk7UUFDcEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO1lBQ3JCLHlCQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyx5QkFBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEtBQUcsUUFBVSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDdkYsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBekZzQiwwQkFBaUIsR0FBVSxHQUFHLENBQUMsQ0FBQSxPQUFPO0lBQ3RDLDJCQUFrQixHQUFVLEdBQUcsQ0FBQyxDQUFBLE9BQU87SUFDdkMsNkJBQW9CLEdBQVUsRUFBRSxDQUFDLENBQUEsU0FBUztJQUMxQyw4QkFBcUIsR0FBVSxFQUFFLENBQUMsQ0FBQSxTQUFTO0lBQzNDLDJCQUFrQixHQUFVLENBQUMsQ0FBQyxDQUFBLFVBQVU7SUFDeEMsMkJBQWtCLEdBQVUsQ0FBQyxDQUFDLENBQUEsVUFBVTtJQXlGbkUsZUFBQztDQS9GRCxBQStGQyxJQUFBO0FBL0ZZLDRCQUFRO0FBaUdyQjs7Ozs7R0FLRztBQUNIO0lBYUksc0JBQVksS0FBWSxFQUFFLE1BQWE7UUFadkM7OztVQUdFO1FBQ00scUJBQWdCLEdBQWUsRUFBRSxDQUFDLENBQUEsWUFBWTtRQUk5Qyx3QkFBbUIsR0FBa0IsRUFBRSxDQUFDLENBQUEsYUFBYTtRQUt6RCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUV0QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDL0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUM5QixJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ2pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDaEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFDcEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQzthQUN2QztTQUNKO0lBQ0wsQ0FBQztJQW5CTyxxQ0FBYyxHQUF0QixVQUF1QixRQUFhO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQW1DRDs7OztPQUlHO0lBQ0ksbUNBQVksR0FBbkIsVUFBb0IsUUFBYSxFQUFFLFFBQWU7UUFBbEQsaUJBZ0NDO1FBL0JHLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFDLGtCQUFrQjtZQUNsRCxPQUFPLENBQUMsR0FBRyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7WUFDM0QsT0FBTztTQUNWO1FBQ0QsSUFBSSxRQUFRLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQzNDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFDLGtCQUFrQjtZQUNoRSxPQUFPO1NBQ1Y7UUFHRCxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUEsZUFBZTtRQUMzQyxJQUFJLFFBQVEsR0FBYyxFQUFFLENBQUMsQ0FBQSxvQkFBb0I7UUFDakQsUUFBUTtRQUNKLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFDLEtBQVc7WUFDdEIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFBO1FBQ0QsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQUMsS0FBVztZQUN0QixLQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUE7UUFFRCx5QkFBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMseUJBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEYseUJBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLHlCQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVGLFFBQVE7UUFFUixJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDbEQseUJBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLHlCQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUUsS0FBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdGLENBQUMsRUFBRTtZQUNDLHlCQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyx5QkFBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFLEtBQUksRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3RixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFBLGlCQUFpQjtJQUMxRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksbUNBQVksR0FBbkIsVUFBb0IsUUFBYTtRQUM3QixJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFHO1lBQ3pELEdBQUcsRUFBRSxDQUFDO1FBQ1YsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQSxXQUFXO1FBQ2pFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFBLFdBQVc7SUFDckUsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0E3RkEsQUE2RkMsSUFBQTtBQTdGcUIsb0NBQVk7Ozs7QUMvR2xDLElBQVksVUFJWDtBQUpELFdBQVksVUFBVTtJQUNsQixpREFBTyxDQUFBO0lBQ1AsaURBQU8sQ0FBQTtJQUNQLDJDQUFJLENBQUE7QUFDUixDQUFDLEVBSlcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFJckI7QUFFRDtJQU9JLGdCQUFZLE1BQVksRUFBRSxLQUFZLEVBQUUsSUFBZTtRQUxoRCxXQUFNLEdBQVMsSUFBSSxDQUFDLENBQUEsTUFBTTtRQUMxQixVQUFLLEdBQVUsQ0FBQyxDQUFDLENBQUEsS0FBSztRQUV0QixZQUFPLEdBQVcsSUFBSSxDQUFDLENBQUEsZ0NBQWdDO1FBRzFELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxxQkFBSSxHQUFYO1FBQ0ksSUFBSSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1RCxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDeEIsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzlCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUM1QixPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBQ0wsYUFBQztBQUFELENBbEJBLEFBa0JDLElBQUE7QUFsQlksd0JBQU07Ozs7QUNSbkIsbUNBQThDO0FBTTlDOzs7R0FHRztBQUNIO0lBc0JJLGlCQUFtQixNQUFZLEVBQUUsR0FBTztRQXJCakMsU0FBSSxHQUFXLGVBQWUsQ0FBQztRQUc5QixjQUFTLEdBQVcsR0FBRyxDQUFDLENBQUEsTUFBTTtRQUM5QixlQUFVLEdBQVcsR0FBRyxDQUFDLENBQUEsTUFBTTtRQUMvQixrQkFBYSxHQUFXLENBQUMsQ0FBQyxDQUFBLFFBQVE7UUFDbkMsY0FBUyxHQUFZLEtBQUssQ0FBQyxDQUFBLE1BQU07UUFDakMsWUFBTyxHQUFZLEtBQUssQ0FBQyxDQUFBLE1BQU07UUFHdEM7OztXQUdHO1FBQ0ksZ0JBQVcsR0FBVyxHQUFHLENBQUMsQ0FBQSxLQUFLO1FBQy9CLGFBQVEsR0FBVSxDQUFDLENBQUMsQ0FBQSxNQUFNO1FBQzFCLFlBQU8sR0FBVSxDQUFDLENBQUMsQ0FBQSxTQUFTO1FBQzVCLFdBQU0sR0FBVSxFQUFFLENBQUMsQ0FBQSxNQUFNO1FBQ3pCLGdCQUFXLEdBQVUsQ0FBQyxDQUFDLENBQUEsTUFBTTtRQUM3QixZQUFPLEdBQWMsbUJBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQSxNQUFNO1FBb0I5QyxhQUFRLEdBQVcsRUFBRSxDQUFDLENBQUEsS0FBSztRQUMzQixnQkFBVyxHQUFXLEVBQUUsQ0FBQyxDQUFBLE9BQU87UUFFdkM7O1dBRUc7UUFDSSxjQUFTLEdBQVcsQ0FBQyxDQUFDO1FBdkJ6QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixpQkFBaUI7SUFDckIsQ0FBQztJQUVNLDRCQUFVLEdBQWpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDbEQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxnQ0FBYyxHQUFyQixVQUFzQixNQUFZO1FBQzlCLE9BQU8sSUFBSSxlQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUMsSUFBSSxDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6RixDQUFDO0lBWUQsc0JBQVcsNkJBQVE7YUFBbkI7WUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyw4QkFBUzthQUFwQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMzQixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLGlDQUFZO2FBQXZCO1lBQ0ksT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzlCLENBQUM7OztPQUFBO0lBR0wsY0FBQztBQUFELENBL0RBLEFBK0RDLElBQUE7QUEvRFksMEJBQU87QUFpRXBCOzs7R0FHRzs7OztBQzdFSCxtREFBd0Q7QUFDeEQsNkNBQXlDO0FBRXpDOztHQUVHO0FBQ0g7SUFHSSxtQkFBWSxNQUFZO1FBRmpCLFFBQUcsR0FBTyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBSTNCLENBQUM7SUFDTCxnQkFBQztBQUFELENBTkEsQUFNQyxJQUFBO0FBTlksOEJBQVM7QUFRdEI7SUFnRUk7UUEvREEsMENBQTBDO1FBQ25DLFNBQUksR0FBUSxJQUFJLGNBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxJQUFJO1FBSTlCLFdBQU0sR0FBUSxJQUFJLGNBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxJQUFJO1FBQ2hDLFVBQUssR0FBVSxDQUFDLENBQUMsQ0FBQSxJQUFJO1FBQ3JCLGFBQVEsR0FBVSxDQUFDLENBQUMsQ0FBQSxNQUFNO1FBQzFCLGFBQVEsR0FBUSxJQUFJLGNBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxNQUFNO1FBQ25DLGFBQVEsR0FBVyxJQUFJLENBQUMsQ0FBQSwwQkFBMEI7SUF3RDFELENBQUM7SUF2REQsc0JBQVcsd0JBQU87YUFBbEIsY0FBNkIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUEsQ0FBQyxDQUFBLFlBQVk7Ozs7T0FBWjtJQUVuRDs7O09BR0c7SUFDSSx1QkFBUyxHQUFoQixVQUFpQixNQUFXO1FBRXhCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSSxzQkFBUSxHQUFmLFVBQWdCLEtBQVk7UUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNLLGlCQUFHLEdBQVg7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUMvRCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUcxQixDQUFDO0lBRUQ7O09BRUc7SUFDSSxrQkFBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUM7UUFDbkIsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsRUFBRTtZQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNyQixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUM1QyxPQUFPO0lBQ1gsQ0FBQztJQUVNLHdCQUFVLEdBQWpCO1FBQ0ksT0FBTyxJQUFJLGNBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLHNCQUFRLENBQUMsaUJBQWlCLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLHNCQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO0lBQ2pJLENBQUM7SUFLTCxVQUFDO0FBQUQsQ0FuRUEsQUFtRUMsSUFBQTs7OztBQ2pGRCxtR0FBOEY7QUFDOUYsbURBQStDO0FBRS9DO0lBS0ksb0JBQVksTUFBWTtRQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUMxQixDQUFDO0lBRU0sMkJBQU0sR0FBYjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEIsMkJBQWlCLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxjQUFJLENBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUcsQ0FBQztJQUVNLHlCQUFJLEdBQVgsVUFBWSxHQUFRO1FBQ2hCLDJCQUFpQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBQ0wsaUJBQUM7QUFBRCxDQWpCQSxBQWlCQyxJQUFBO0FBakJZLGdDQUFVOzs7O0FDSHZCLGdEQUE0QztBQUU1QztJQVVJLGVBQVksTUFBWSxFQUFFLEdBQU87UUFSekIsVUFBSyxHQUFVLGNBQUksQ0FBQyxZQUFZLENBQUM7WUFDckMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDO1lBQ1QsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDO1NBQ1YsQ0FBQyxDQUFDO1FBQ0ssY0FBUyxHQUFVLENBQUMsQ0FBQyxDQUFDLENBQUEsU0FBUztRQUduQyxvQkFBb0I7SUFDeEIsQ0FBQztJQUVNLDZCQUFhLEdBQXBCO1FBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRU0sb0JBQUksR0FBWDtRQUNJLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsRUFBQyxPQUFPO1lBQ2hELElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDO1lBQ3BCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7YUFBTSxFQUFDLE9BQU87WUFDWCxPQUFPLEtBQUssQ0FBQztTQUNoQjtJQUNMLENBQUM7SUFDTCxZQUFDO0FBQUQsQ0ExQkEsQUEwQkMsSUFBQTs7Ozs7QUM3QkQscUVBQXdEO0FBS3hELGlEQUFnRDtBQUNoRCxtREFBK0M7QUFHL0M7Ozs7Ozs7Ozs7O0dBV0c7QUFFSCxJQUFLLFNBSUo7QUFKRCxXQUFLLFNBQVM7SUFDViwwQkFBYSxDQUFBO0lBQ2IsZ0NBQW1CLENBQUE7SUFDbkIsb0NBQXVCLENBQUE7QUFDM0IsQ0FBQyxFQUpJLFNBQVMsS0FBVCxTQUFTLFFBSWI7QUFVRDtJQUFBO1FBR2MsU0FBSSxHQUFXLENBQUMsQ0FBQyxDQUFBLFVBQVU7SUFRekMsQ0FBQztJQVZVLHdCQUFJLEdBQVgsY0FBcUIsT0FBTyxXQUFXLENBQUMsQ0FBQSxDQUFDO0lBSWxDLHlCQUFLLEdBQVo7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNsQixDQUFDO0lBSUwsZ0JBQUM7QUFBRCxDQVhBLEFBV0MsSUFBQTtBQUVEO0lBQW1CLHdCQUFTO0lBQTVCOztJQWNBLENBQUM7SUFiVSxtQkFBSSxHQUFYLGNBQXFCLE9BQU8sV0FBVyxDQUFDLENBQUEsQ0FBQztJQUVsQyxzQkFBTyxHQUFkLFVBQWUsT0FBd0I7UUFDbkMsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN4QyxJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxJQUFJLFNBQVMsRUFBRSxFQUFDLFVBQVU7WUFDaEQsT0FBTyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUM5QjthQUFNLEVBQUMsU0FBUztZQUNiLFlBQVk7U0FDZjtRQUNELDBDQUEwQztJQUM5QyxDQUFDO0lBRUwsV0FBQztBQUFELENBZEEsQUFjQyxDQWRrQixTQUFTLEdBYzNCO0FBRUQ7SUFBc0IsMkJBQVM7SUFBL0I7O0lBa0NBLENBQUM7SUFqQ1Usc0JBQUksR0FBWCxjQUFxQixPQUFPLGNBQWMsQ0FBQyxDQUFBLENBQUM7SUFFckMseUJBQU8sR0FBZCxVQUFlLE9BQXdCO1FBSW5DLG1CQUFtQjtRQUNuQixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQzVCLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDM0Isb0NBQW9DO1FBQ3BDLElBQUksTUFBTSxDQUFDLFlBQVksRUFBRSxFQUFFLEVBQUMsU0FBUztZQUNqQyx1Q0FBdUM7WUFDdkMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2xCLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLElBQUksRUFBRTtnQkFDM0IsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ3JCO2lCQUFNO2dCQUNILE9BQU8sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3ZDO1lBRUQsT0FBTztTQUVWO1FBRUQsU0FBUztRQUNULE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTtZQUNmLDJCQUEyQjtZQUMzQixPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUN6QyxPQUFPLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFBLE9BQU87WUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQ2xDO0lBRUwsQ0FBQztJQUNMLGNBQUM7QUFBRCxDQWxDQSxBQWtDQyxDQWxDcUIsU0FBUyxHQWtDOUI7QUFFRDtJQUF1Qiw0QkFBUztJQUFoQzs7SUFjQSxDQUFDO0lBYlUsdUJBQUksR0FBWCxjQUFxQixPQUFPLFlBQVksQ0FBQyxDQUFBLENBQUM7SUFDbkMsMEJBQU8sR0FBZCxVQUFlLE9BQXdCO1FBQ25DLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQUksT0FBTyxDQUFDLFlBQVksRUFBRTtZQUN0QixPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDbEIsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLElBQUksRUFBRTtnQkFDbkMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDMUM7aUJBQU07Z0JBQ0gsT0FBTyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdkM7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDakM7SUFDTCxDQUFDO0lBQ0wsZUFBQztBQUFELENBZEEsQUFjQyxDQWRzQixTQUFTLEdBYy9CO0FBRUQ7O0dBRUc7QUFDSDtJQXFDSTs7T0FFRztJQUNILHlCQUFZLE1BQWEsRUFBRSxHQUFPO1FBL0JsQzs7V0FFRztRQUNLLGNBQVMsR0FBa0IsSUFBSSx5QkFBTSxFQUFTLENBQUM7UUFNL0MsY0FBUyxHQUFVLENBQUMsQ0FBQyxDQUFBLFVBQVU7UUFDL0IsY0FBUyxHQUFVLENBQUMsQ0FBQyxDQUFBLGNBQWM7UUFzQnZDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLElBQUksT0FBTyxFQUFFLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLElBQUksUUFBUSxFQUFFLENBQUMsQ0FBQztRQUN6RCxpQkFBaUI7UUFFakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7UUFFckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLDZCQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksY0FBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN6RyxDQUFDO0lBL0JELHNCQUFXLGtDQUFLO2FBQWhCO1lBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDNUMsQ0FBQzs7O09BQUE7SUFFTSw2QkFBRyxHQUFWO1FBQ0ksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxzQkFBVyx5Q0FBWTthQUF2QjtZQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDM0QsQ0FBQzs7O09BQUE7SUFFTSxpQ0FBTyxHQUFkO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQW1CRDs7T0FFRztJQUNJLGdDQUFNLEdBQWI7UUFDSSxxQ0FBcUM7UUFDckMsdUNBQXVDO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDckIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDL0I7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0kscUNBQVcsR0FBbEIsVUFBbUIsU0FBb0I7UUFDbkMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0MsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDMUIsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0EzRUEsQUEyRUMsSUFBQTtBQTNFWSwwQ0FBZTs7OztBQ3RINUI7SUFDSSxpQkFBWSxNQUFZO0lBRXhCLENBQUM7SUFDTCxjQUFDO0FBQUQsQ0FKQSxBQUlDLElBQUE7QUFKWSwwQkFBTzs7OztBQ0FwQixtREFBK0M7QUFFL0MsK0NBQTBDO0FBQzFDLHFFQUE2RDtBQUU3RDs7O0dBR0c7QUFDSDtJQWtCSSx1QkFBWSxNQUFXLEVBQUUsR0FBTyxFQUFFLE1BQWlCO1FBQWpCLHVCQUFBLEVBQUEsVUFBaUI7UUFmM0MsWUFBTyxHQUFVLENBQUMsQ0FBQyxDQUFBLGtCQUFrQjtRQUNyQyxzQkFBaUIsR0FBVSxFQUFFLENBQUMsQ0FBQSxnQkFBZ0I7UUFDOUMsc0JBQWlCLEdBQVUsRUFBRSxDQUFDLENBQUEsZ0JBQWdCO1FBRzlDLGtCQUFhLEdBQVcsS0FBSyxDQUFDLENBQUEsVUFBVTtRQVc1QyxzQkFBc0I7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFFdEIsTUFBTTtRQUNOLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxjQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksY0FBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBRSxJQUFJLGNBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUd6RSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQWpCTyxtQ0FBVyxHQUFuQjtRQUFBLGlCQUtDO1FBSkcsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRztZQUM5QixLQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDeEQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBZU0sZ0NBQVEsR0FBZjtRQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRU0sb0NBQVksR0FBbkIsVUFBb0IsS0FBYTtRQUM3Qix5QkFBeUI7UUFDekIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLHNDQUFjLEdBQXJCO1FBQ0ksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUFFTSxtQ0FBVyxHQUFsQjtRQUNJLHlCQUF5QjtRQUN6QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sb0NBQVksR0FBbkI7UUFDSSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDOUIsQ0FBQztJQUVNLDhCQUFNLEdBQWI7UUFBQSxpQkF1QkM7UUF0QkcsUUFBUTtRQUNSLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBRXZCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO1lBQzlCLElBQUksSUFBSSxHQUFXLG9CQUFVLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hFLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO2dCQUNaLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsWUFBWSxHQUFHLDRCQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUV4RCxTQUFTO1FBQ1QsSUFBSyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLEVBQUMsMEJBQTBCO1lBQy9HLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztTQUM3QjthQUFNLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUMsc0JBQXNCO1lBQzVFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztTQUM3QjthQUFNLEVBQUMsU0FBUztZQUNiLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1NBQzlCO0lBQ0wsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0E3RUEsQUE2RUMsSUFBQTtBQTdFWSxzQ0FBYTs7OztBQ1QxQjtJQUdJLHdCQUFZLEtBQVk7UUFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQztJQUVNLDhCQUFLLEdBQVo7SUFFQSxDQUFDO0lBRU0sK0JBQU0sR0FBYjtJQUVBLENBQUM7SUFFTSw4QkFBSyxHQUFaO0lBRUEsQ0FBQztJQUVNLDhCQUFLLEdBQVo7SUFFQSxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQXRCQSxBQXNCQyxJQUFBOzs7OztBQ3hCRCxtREFBOEM7QUFFOUM7O0dBRUc7QUFDSDtJQUFxQyxtQ0FBYztJQUFuRDs7SUFTQSxDQUFDO0lBUFUsZ0NBQU0sR0FBYjtRQUNJLG1CQUFtQjtRQUNuQjs7VUFFRTtRQUNILElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFDTCxzQkFBQztBQUFELENBVEEsQUFTQyxDQVRvQyx3QkFBYyxHQVNsRDtBQVRZLDBDQUFlOzs7O0FDSjVCLGlEQUE0QztBQUU1QyxtREFBa0Q7QUFDbEQsMkRBQTBEO0FBQzFELHFEQUFvRDtBQUVwRCxJQUFZLFlBV1g7QUFYRCxXQUFZLFlBQVk7SUFDcEIsK0NBQUksQ0FBQTtJQUNKLHVEQUFRLENBQUE7SUFDUiwrQ0FBSSxDQUFBO0lBQ0osK0NBQUksQ0FBQTtJQUNKLHFEQUFPLENBQUE7SUFDUCxxREFBTyxDQUFBO0lBQ1AsaURBQUssQ0FBQTtJQUNMLGlEQUFLLENBQUE7SUFDTCxtREFBTSxDQUFBO0lBQ04saURBQUssQ0FBQTtBQUNULENBQUMsRUFYVyxZQUFZLEdBQVosb0JBQVksS0FBWixvQkFBWSxRQVd2QjtBQUVEOztHQUVHO0FBQ0g7SUFJSSx1QkFBWSxLQUFZO1FBSGhCLFlBQU8sR0FBcUIsRUFBRSxDQUFDO1FBSW5DLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksK0JBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLHVDQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksaUNBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5RCxNQUFNO1FBQ04sVUFBVTtJQUNkLENBQUM7SUFFTSw0QkFBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVNLGdDQUFRLEdBQWYsVUFBZ0IsT0FBcUI7UUFDakMsSUFBSSxZQUFZLENBQUMsS0FBSyxJQUFJLE9BQU8sSUFBSSxPQUFPLElBQUksWUFBWSxDQUFDLElBQUksRUFBRTtZQUMvRCxnQkFBTSxDQUFDLEtBQUssQ0FBQyw2Q0FBMkMsT0FBTyxRQUFLLENBQUMsQ0FBQztZQUN0RSxPQUFPO1NBQ1Y7UUFFRCxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQzVCLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDOUI7UUFFRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRU0sOEJBQU0sR0FBYjtRQUNJLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDNUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUMvQjtJQUNMLENBQUM7SUFFTSw2QkFBSyxHQUFaO1FBQ0ksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUM1QixJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzNCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1NBQzdCO1FBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2pCO0lBQ0wsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0FoREEsQUFnREMsSUFBQTs7Ozs7QUN2RUQsbURBQThDO0FBRTlDO0lBQXdDLHNDQUFjO0lBQXREOztJQUlBLENBQUM7SUFIVSxtQ0FBTSxHQUFiO1FBQ0ksaUNBQWlDO0lBQ3JDLENBQUM7SUFDTCx5QkFBQztBQUFELENBSkEsQUFJQyxDQUp1Qyx3QkFBYyxHQUlyRDtBQUpZLGdEQUFrQjs7OztBQ0YvQixtREFBOEM7QUFFOUMsbURBQStDO0FBRS9DO0lBQW9DLGtDQUFjO0lBQWxEOztJQTZCQSxDQUFDO0lBM0JVLDhCQUFLLEdBQVo7UUFDSSw0QkFBNEI7UUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVNLCtCQUFNLEdBQWI7UUFFSSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRXhCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUMsY0FBYztZQUMzRCxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBQyxXQUFXO2dCQUNoQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUEsZUFBZTthQUM3RTtpQkFBTTtnQkFDSCxlQUFlO2FBQ2xCO1NBQ0o7UUFFRCxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxjQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEYsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRWpDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUEsSUFBSTtRQUMvQixLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBLE9BQU87UUFDekQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBLFFBQVE7UUFDaEQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQSxRQUFRO0lBRXhELENBQUM7SUFFTCxxQkFBQztBQUFELENBN0JBLEFBNkJDLENBN0JtQyx3QkFBYyxHQTZCakQ7QUE3Qlksd0NBQWM7Ozs7QUNIM0IsaURBQTZDO0FBSTdDOzs7Ozs7O0dBT0c7QUFDSDtJQUFBO1FBRVksZ0JBQVcsR0FBcUMsRUFBRSxDQUFDO0lBMkIvRCxDQUFDO0lBekJVLGtEQUFnQixHQUF2QixVQUF3QixRQUF1QjtRQUMzQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDO0lBQ3RELENBQUM7SUFFTSxvREFBa0IsR0FBekIsVUFBMEIsUUFBdUI7UUFDN0MsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVNLHdDQUFNLEdBQWI7UUFDSSxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDNUIsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QyxJQUFJLGFBQWEsR0FBRyxFQUFFLENBQUM7WUFDdkIsS0FBSyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUM1QixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLFFBQVEsSUFBSSxjQUFjLEVBQUU7b0JBQzVCLFNBQVM7aUJBQ1o7Z0JBQ0QsSUFBSSxjQUFjLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLElBQUksY0FBYyxDQUFDLGlCQUFpQixFQUFFLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLENBQUMsRUFBRTtvQkFDcEksYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDaEM7YUFDSjtZQUNELGNBQWMsQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUN4RDtJQUNMLENBQUM7SUFFTCw4QkFBQztBQUFELENBN0JBLEFBNkJDLElBQUE7QUE3QlksMERBQXVCO0FBZ0NwQztJQUFBO1FBQ0ksTUFBTTtRQUNVLFdBQU0sR0FBYSxJQUFJLG9CQUFRLEVBQUUsQ0FBQztJQW9DdEQsQ0FBQztJQUFELG9CQUFDO0FBQUQsQ0F0Q0EsQUFzQ0MsSUFBQTtBQXRDcUIsc0NBQWE7QUF3Q25DO0lBQWtELHVDQUFhO0lBTTNELDZCQUFZLEtBQVksRUFBRSxLQUEyQjtRQUFyRCxZQUNJLGlCQUFPLFNBR1Y7UUFSTyxtQkFBYSxHQUFvQixFQUFFLENBQUM7UUFNeEMsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7O0lBQ3ZCLENBQUM7SUFHRCwrQ0FBaUIsR0FBakI7UUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVELCtDQUFpQixHQUFqQixVQUFrQixLQUEyQjtRQUN6QyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBRUQsc0NBQVEsR0FBUjtRQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUQsOENBQWdCLEdBQWhCO1FBQ0ksT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzlCLENBQUM7SUFFRCxvREFBc0IsR0FBdEIsVUFBdUIsYUFBOEI7UUFDakQsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7SUFDdkMsQ0FBQztJQUdMLDBCQUFDO0FBQUQsQ0FsQ0EsQUFrQ0MsQ0FsQ2lELGFBQWEsR0FrQzlEO0FBbENxQixrREFBbUI7Ozs7QUNyRnpDLGlFQUEyRTtBQUMzRSxnREFBNEM7QUFFNUMsa0VBQTBEO0FBQzFELDhDQUFnRDtBQUdoRDtJQUEwQyxnQ0FBWTtJQXFCbEQ7UUFBQSxZQUNJLGtCQUFNLEVBQUUsRUFBRSxFQUFFLENBQUMsU0FZaEI7UUFqQ00sWUFBTSxHQUFXLEVBQUUsQ0FBQztRQUNwQixXQUFLLEdBQWdCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRXRDLGFBQU8sR0FBZ0IsRUFBRSxDQUFDLENBQUEsbUJBQW1CO1FBbUJqRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDNUIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDckIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM1QixLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksY0FBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFHLGtCQUFTLENBQUMsT0FBUyxDQUFDLENBQUM7Z0JBQzFELEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQzNCO1NBQ0o7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDeEIsS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUFDOztJQUMxQixDQUFDO0lBNUJPLGdDQUFTLEdBQWpCLFVBQWtCLEdBQVEsRUFBRSxLQUFXO1FBQ25DLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVPLG1DQUFZLEdBQXBCLFVBQXFCLEdBQVEsRUFBRSxLQUFXO1FBQ3RDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEQsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLEVBQUU7WUFDYixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsQ0FBQztTQUM5QztJQUNMLENBQUM7SUFFTSxnQ0FBUyxHQUFoQixVQUFpQixHQUFRO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFtQlMsOEJBQU8sR0FBakIsVUFBa0IsS0FBWSxFQUFFLEdBQVM7UUFDckMsOENBQThDO1FBQzlDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFUyw4QkFBTyxHQUFqQixVQUFrQixLQUFZLEVBQUUsR0FBUztRQUNyQyxJQUFNLEtBQUssR0FBRyw0QkFBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xELElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2hDO1FBQ0QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0IsOENBQThDO0lBQ2xELENBQUM7SUFFTSw2QkFBTSxHQUFiO1FBQUEsaUJBVUM7UUFURyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7WUFDbkIsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsc0JBQVEsQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLEVBQy9ELEdBQUcsQ0FBQyxDQUFDLEdBQUcsc0JBQVEsQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLEVBQ3ZDLHNCQUFRLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxFQUM5QixzQkFBUSxDQUFDLGtCQUFrQixHQUFHLENBQUMsRUFDL0IsU0FBUyxDQUNaLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTCxtQkFBQztBQUFELENBbEVBLEFBa0VDLENBbEV5QywwQkFBWSxHQWtFckQ7Ozs7O0FDekVELHlDQUFrQztBQUNsQywrRUFBOEU7QUFDOUUseUNBQW9DO0FBQ3BDLDhEQUF5RDtBQUN6RCw2Q0FBd0M7QUFDeEMseURBQW9EO0FBRXBEO0lBVUk7UUFKTyxlQUFVLEdBQWlCLElBQUksc0JBQVksRUFBRSxDQUFDLENBQUEsWUFBWTtRQUs3RCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksbUJBQVMsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxtQkFBTyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGtCQUFRLEVBQUUsQ0FBQztRQUUvQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksaURBQXVCLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0lBRU0saUNBQVksR0FBbkI7UUFDSSw2QkFBNkI7UUFDN0IsSUFBSSxHQUFHLEdBQUcsd0JBQWMsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUV2RCxNQUFNO1FBQ04sR0FBRyxHQUFHLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLENBQUM7UUFFdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhO1FBQzVDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRS9CLGtEQUFrRDtRQUNsRCx5QkFBeUI7UUFFekIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7SUFDL0IsQ0FBQztJQUVNLHFDQUFnQixHQUF2QjtRQUNJLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUMvQixDQUFDO0lBRU0sMEJBQUssR0FBWjtRQUNJLE1BQU07UUFDTiw0QkFBNEI7UUFDNUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7SUFDaEMsQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0E1Q0EsQUE0Q0MsSUFBQTs7Ozs7QUNuREQ7SUFBQTtJQUtBLENBQUM7SUFKMEIseUNBQXlCLEdBQVcsQ0FBQyxDQUFDO0lBQ3RDLDBCQUFVLEdBQVcsRUFBRSxDQUFDO0lBQ3hCLDJCQUFXLEdBQVcsQ0FBQyxDQUFDO0lBQ3hCLHlCQUFTLEdBQVcsQ0FBQyxDQUFDO0lBQ2pELHNCQUFDO0NBTEQsQUFLQyxJQUFBO2tCQUxvQixlQUFlOzs7O0FDRXBDLDBDQUFxQztBQUVyQyxxREFBZ0Q7QUFDaEQ7Ozs7O0dBS0c7QUFFSCxtQkFBbUI7QUFDbkIscUJBQXFCO0FBQ3JCLG9DQUFvQztBQUNwQyw2REFBNkQ7QUFFN0Q7SUFVSTtRQUNJLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFTSx3QkFBSSxHQUFYLFVBQVksR0FBUTtRQUNoQixhQUFhO1FBQ2IsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSx5QkFBZSxDQUFDLFdBQVcsQ0FBQztRQUN2RixJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSx5QkFBZSxDQUFDLFNBQVMsQ0FBQztRQUMzRCxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRU0sMEJBQU0sR0FBYjtRQUNJLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVNLHFDQUFpQixHQUF4QjtRQUNJLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUNoQyxDQUFDO0lBRU0sOEJBQVUsR0FBakI7UUFDSSxVQUFVO0lBQ2QsQ0FBQztJQUVPLCtCQUFXLEdBQW5CO1FBQ0ksSUFBSSxDQUFDLFNBQVMsSUFBSSxpQkFBTyxDQUFDLFNBQVMsQ0FBQztJQUN4QyxDQUFDO0lBRU8sK0JBQVcsR0FBbkI7SUFFQSxDQUFDO0lBRU0seUJBQUssR0FBWjtRQUNJLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFDTCxnQkFBQztBQUFELENBbkRBLEFBbURDLElBQUE7Ozs7O0FDcEVELDJDQUFzQztBQUN0QyxxREFBZ0Q7QUFDaEQsMkNBQXNDO0FBR3RDOzs7Ozs7Ozs7Ozs7R0FZRztBQUNIO0lBVUk7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksb0JBQVUsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxzQkFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUVsRCxDQUFDO0lBWkQsc0JBQWtCLHNCQUFRO2FBQTFCO1lBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7UUFDM0QsQ0FBQzs7O09BQUE7SUFZTSx5QkFBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixnQkFBTSxDQUFDLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFBO0lBQ3pELENBQUM7SUFFTSwyQkFBTSxHQUFiO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBR0wsaUJBQUM7QUFBRCxDQTFCQSxBQTBCQyxJQUFBOzs7OztBQzFDRDtJQUdJLHVCQUFZLE1BQWtCO1FBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQzFCLENBQUM7SUFFTSw2QkFBSyxHQUFaO0lBRUEsQ0FBQztJQUVNLDhCQUFNLEdBQWI7SUFFQSxDQUFDO0lBRU0sNkJBQUssR0FBWjtJQUVBLENBQUM7SUFFTSw2QkFBSyxHQUFaO0lBRUEsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0F0QkEsQUFzQkMsSUFBQTs7Ozs7QUN4QkQsaURBQTRDO0FBSTVDO0lBQTZDLG1DQUFhO0lBQ3RELHlCQUFZLE1BQWlCO2VBQ3pCLGtCQUFNLE1BQU0sQ0FBQztJQUNqQixDQUFDO0lBRU0sK0JBQUssR0FBWjtRQUNJLGlCQUFNLEtBQUssV0FBRSxDQUFDO0lBQ2xCLENBQUM7SUFFTSwrQkFBSyxHQUFaO1FBQ0ksaUJBQU0sS0FBSyxXQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVNLCtCQUFLLEdBQVo7UUFDSSxpQkFBTSxLQUFLLFdBQUUsQ0FBQztJQUNsQixDQUFDO0lBRU0sZ0NBQU0sR0FBYjtRQUNJLGlCQUFNLE1BQU0sV0FBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0F0QkEsQUFzQkMsQ0F0QjRDLHVCQUFhLEdBc0J6RDs7Ozs7QUMxQkQsaURBQTRDO0FBQzVDLDRDQUF1QztBQUN2QyxpRUFBNEQ7QUFDNUQsK0NBQTZDO0FBQzdDLDhDQUF5QztBQUV6QztJQUErQyxxQ0FBYTtJQUN4RCwyQkFBWSxNQUFNO2VBQ2Qsa0JBQU0sTUFBTSxDQUFDO0lBQ2pCLENBQUM7SUFFTSxpQ0FBSyxHQUFaO1FBQ0ksaUJBQU0sS0FBSyxXQUFFLENBQUM7UUFDZCwwQkFBMEI7SUFDOUIsQ0FBQztJQUVNLGlDQUFLLEdBQVo7UUFDSSxpQkFBTSxLQUFLLFdBQUUsQ0FBQztJQUNsQixDQUFDO0lBRU0saUNBQUssR0FBWjtRQUNJLGlCQUFNLEtBQUssV0FBRSxDQUFDO0lBQ2xCLENBQUM7SUFFTSxrQ0FBTSxHQUFiO1FBQ0ksaUJBQU0sTUFBTSxXQUFFLENBQUM7UUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDL0IsSUFBSSxJQUFJLElBQUksd0JBQWMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDMUMsNkNBQTZDO1lBQzdDLHdCQUF3QjtZQUN4QixRQUFRO1lBQ1Isd0JBQWMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLG9CQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsMEJBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM3RCxnQkFBTSxDQUFDLEtBQUssQ0FBQyx1RUFBdUUsQ0FBQyxDQUFDO1NBQ3pGO0lBQ0wsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0E5QkEsQUE4QkMsQ0E5QjhDLHVCQUFhLEdBOEIzRDs7Ozs7QUNwQ0QsaURBQTRDO0FBQzVDLDRDQUF1QztBQUN2QywrQ0FBNkM7QUFDN0MsaUVBQTREO0FBQzVELDhDQUF5QztBQUV6QztJQUFnRCxzQ0FBYTtJQUN6RCw0QkFBWSxNQUFNO2VBQ2Qsa0JBQU0sTUFBTSxDQUFDO0lBQ2pCLENBQUM7SUFFTSxrQ0FBSyxHQUFaO1FBQ0ksaUJBQU0sS0FBSyxXQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFTSxrQ0FBSyxHQUFaO1FBQ0ksaUJBQU0sS0FBSyxXQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVNLGtDQUFLLEdBQVo7UUFDSSxpQkFBTSxLQUFLLFdBQUUsQ0FBQztJQUNsQixDQUFDO0lBRU0sbUNBQU0sR0FBYjtRQUNJLGlCQUFNLE1BQU0sV0FBRSxDQUFDO1FBQ2YsSUFBSSxJQUFJLElBQUksd0JBQWMsQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLEVBQUU7WUFDbkQsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFO2dCQUN6QyxvQkFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLDBCQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzFELGdCQUFNLENBQUMsS0FBSyxDQUFDLHVDQUFxQyx3QkFBYyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsb0JBQWlCLENBQUMsQ0FBQzthQUM1RztTQUNKO0lBQ0wsQ0FBQztJQUNMLHlCQUFDO0FBQUQsQ0EzQkEsQUEyQkMsQ0EzQitDLHVCQUFhLEdBMkI1RDs7Ozs7QUNqQ0QsaURBQTRDO0FBRTVDO0lBQTRDLGtDQUFhO0lBQ3JELHdCQUFZLE1BQU07ZUFDZCxrQkFBTSxNQUFNLENBQUM7SUFDakIsQ0FBQztJQUVNLDhCQUFLLEdBQVo7UUFDSSxpQkFBTSxLQUFLLFdBQUUsQ0FBQztJQUNsQixDQUFDO0lBRU0sOEJBQUssR0FBWjtRQUNJLGlCQUFNLEtBQUssV0FBRSxDQUFDO0lBQ2xCLENBQUM7SUFFTSw4QkFBSyxHQUFaO1FBQ0ksaUJBQU0sS0FBSyxXQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVNLCtCQUFNLEdBQWI7UUFDSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztJQUNuQixDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQXBCQSxBQW9CQyxDQXBCMkMsdUJBQWEsR0FvQnhEOzs7OztBQ3JCRCxxREFBZ0Q7QUFDaEQsOENBQXlDO0FBQ3pDLDJEQUFzRDtBQUN0RCx5REFBb0Q7QUFDcEQsbURBQThDO0FBSTlDLElBQVksV0FPWDtBQVBELFdBQVksV0FBVztJQUNuQiw2Q0FBSSxDQUFBO0lBQ0oscURBQVEsQ0FBQTtJQUNSLCtDQUFLLENBQUE7SUFDTCx1REFBUyxDQUFBO0lBQ1QsaURBQU0sQ0FBQTtJQUNOLCtDQUFLLENBQUE7QUFDVCxDQUFDLEVBUFcsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFPdEI7QUFFRDs7O0dBR0c7QUFDSDtJQUlJLHNCQUFZLE1BQWlCO1FBQ3pCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLDJDQUEyQztRQUUzQyxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLDJCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSx3QkFBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSw0QkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUkseUJBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFTSwyQkFBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVNLCtCQUFRLEdBQWYsVUFBZ0IsT0FBb0I7UUFDaEMsSUFBSSxXQUFXLENBQUMsS0FBSyxJQUFJLE9BQU8sSUFBSSxPQUFPLElBQUksV0FBVyxDQUFDLElBQUksRUFBRTtZQUM3RCxnQkFBTSxDQUFDLEtBQUssQ0FBQyw2Q0FBMkMsT0FBTyxRQUFLLENBQUMsQ0FBQztZQUN0RSxPQUFPO1NBQ1Y7UUFFRCxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQzVCLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDOUI7UUFFRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRU0sNkJBQU0sR0FBYjtRQUNJLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDNUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUMvQjtJQUNMLENBQUM7SUFFTSw0QkFBSyxHQUFaO1FBQ0ksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUM1QixJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzNCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1NBQzdCO1FBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2pCO0lBQ0wsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0FuREEsQUFtREMsSUFBQTs7Ozs7QUN6RUQsMkNBQXNDO0FBQ3RDLCtDQUEwQztBQUMxQyx5Q0FBb0M7QUFDcEMsZ0RBQTJDO0FBQzNDLG1EQUFrRDtBQUNsRCw2REFBd0Q7QUFDeEQsNEZBQXVGO0FBQ3ZGLDRDQUF3QztBQUl4QztJQUNDO1FBQ0MsZ0JBQWdCO1FBQ2hCLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQVUsQ0FBQyxLQUFLLEVBQUUsb0JBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7WUFDbEUsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBVSxDQUFDLEtBQUssRUFBRSxvQkFBVSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzVDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsb0JBQVUsQ0FBQyxTQUFTLENBQUM7UUFDNUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsb0JBQVUsQ0FBQyxVQUFVLENBQUM7UUFDOUMsb0JBQW9CO1FBQ3BCLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsb0JBQVUsQ0FBQyxpQkFBaUIsQ0FBQztRQUUxRCxvREFBb0Q7UUFDcEQsSUFBSSxvQkFBVSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNO1lBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDOUYsSUFBSSxvQkFBVSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUM7WUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMzRixJQUFJLG9CQUFVLENBQUMsSUFBSTtZQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztRQUU3QiwyQkFBMkI7UUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2QiwyQkFBaUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXpDLE1BQU07UUFDTiwyQkFBaUIsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO1lBQ1QsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7U0FDVCxFQUFFLElBQUksY0FBSSxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsRUFBRSxJQUFJLGNBQUksQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzdELFVBQVU7UUFFVixpQkFBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2Ysb0JBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDM0Isd0JBQWMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDL0IseUJBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVuQixnREFBZ0Q7UUFDaEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3JJLENBQUM7SUFFTSw4QkFBZSxHQUF0QjtRQUNDLCtDQUErQztRQUMvQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztJQUNqRyxDQUFDO0lBRU0sNkJBQWMsR0FBckI7UUFJQyxzQkFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUc5QixNQUFNO1FBQ04sd0JBQWMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFL0Isd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXpDLENBQUM7SUFFTyxzQkFBTyxHQUFmO1FBQ0MsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNqQixvQkFBVSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM3Qix3QkFBYyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBQ0YsV0FBQztBQUFELENBL0RBLEFBK0RDLElBQUE7QUFFRCxPQUFPO0FBQ1AsSUFBSSxJQUFJLEVBQUUsQ0FBQzs7OztBQzdFWDtJQWVJO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7SUFDaEMsQ0FBQztJQWpCRCxzQkFBa0IsMEJBQVE7YUFBMUI7WUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMzRCxDQUFDOzs7T0FBQTtJQWlCTSxtQ0FBVSxHQUFqQixVQUFrQixFQUFpQjtRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztJQUNoQyxDQUFDO0lBRU0sbUNBQVUsR0FBakI7UUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVNLDZCQUFJLEdBQVg7UUFDSSxXQUFXO1FBQ1gsb0JBQW9CO1FBQ3BCLG1CQUFtQjtRQUNuQixvREFBb0Q7UUFDcEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDeEIsQ0FBQztJQUVNLCtCQUFNLEdBQWI7UUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUVNLCtCQUFNLEdBQWI7UUFDSSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3pELHFCQUFxQjtZQUNyQixJQUFJLENBQUMsRUFBRSxFQUFLLDJCQUEyQjtnQkFDbkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7YUFDOUI7U0FDSjtJQUNMLENBQUM7SUFFTSx3Q0FBZSxHQUF0QjtRQUNJLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUMvQixDQUFDO0lBRU0sMkNBQWtCLEdBQXpCO1FBQ0ksTUFBTTtRQUNOLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSx3Q0FBZSxHQUF0QixVQUF1QixFQUFVO1FBQzdCLE1BQU07UUFDTixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQWhFQSxBQWdFQyxJQUFBOzs7O0FDaEVELGtEQUFrRDtBQUNsRCw0Q0FBNEM7O0FBRTVDO0lBQUE7UUFNcUIsaUJBQVksR0FBVSxvQkFBb0IsQ0FBQztRQUMzQyxjQUFTLEdBQVUsaUJBQWlCLENBQUM7SUFLMUQsQ0FBQztJQVZHLHNCQUFrQix3QkFBUTthQUExQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzNELENBQUM7OztPQUFBO0lBS00sNEJBQUssR0FBWjtRQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQVpBLEFBWUMsSUFBQTs7Ozs7QUNmRCw2Q0FBbUM7QUFJbkM7SUFBa0Msd0JBQWM7SUFRNUM7UUFBQSxZQUNJLGlCQUFPLFNBQ1Y7UUFQTyxZQUFNLEdBQVksS0FBSyxDQUFDOztJQU9oQyxDQUFDO0lBRU8scUJBQU0sR0FBZDtJQUNBLENBQUM7SUFSRCxtQkFBbUI7SUFDTCxnQkFBVyxHQUFXLEVBQUUsQ0FBQyxDQUFBLEtBQUs7SUFRaEQsV0FBQztDQWRELEFBY0MsQ0FkaUMsY0FBRSxDQUFDLFdBQVcsR0FjL0M7a0JBZG9CLElBQUk7Ozs7QUNKekIsNkNBQWtDO0FBR2xDLElBQUk7QUFDSjtJQUFxQywyQkFBaUI7SUFDbEQ7ZUFDSSxpQkFBTztJQUNYLENBQUM7SUFDTCxjQUFDO0FBQUQsQ0FKQSxBQUlDLENBSm9DLGNBQUUsQ0FBQyxjQUFjLEdBSXJEOzs7OztBQ0xELElBQU8sS0FBSyxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDeEIsSUFBSSxHQUFHLEdBQWEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7QUFDN0MsSUFBYyxFQUFFLENBbUJmO0FBbkJELFdBQWMsRUFBRTtJQUNaO1FBQWlDLCtCQUFLO1FBR2xDO21CQUFlLGlCQUFPO1FBQUEsQ0FBQztRQUN2QixvQ0FBYyxHQUFkO1lBQ0ksaUJBQU0sY0FBYyxXQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBQ0wsa0JBQUM7SUFBRCxDQVJBLEFBUUMsQ0FSZ0MsS0FBSyxHQVFyQztJQVJZLGNBQVcsY0FRdkIsQ0FBQTtJQUNELEdBQUcsQ0FBQyxnQkFBZ0IsRUFBQyxXQUFXLENBQUMsQ0FBQztJQUNsQztRQUFvQyxrQ0FBSztRQUNyQzttQkFBZSxpQkFBTztRQUFBLENBQUM7UUFDdkIsdUNBQWMsR0FBZDtZQUNJLGlCQUFNLGNBQWMsV0FBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUNMLHFCQUFDO0lBQUQsQ0FOQSxBQU1DLENBTm1DLEtBQUssR0FNeEM7SUFOWSxpQkFBYyxpQkFNMUIsQ0FBQTtJQUNELEdBQUcsQ0FBQyxtQkFBbUIsRUFBQyxjQUFjLENBQUMsQ0FBQztBQUM1QyxDQUFDLEVBbkJhLEVBQUUsR0FBRixVQUFFLEtBQUYsVUFBRSxRQW1CZiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgeyBDb21wYXJhYmxlIH0gZnJvbSBcIi4vRG9kTWF0aFwiO1xyXG5cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgS1ZQYWlyPFY+e1xyXG4gICAgcHJpdmF0ZSBfbGlzdDphbnkgPSB7fTtcclxuICAgIHB1YmxpYyBlZGl0KGtleTpzdHJpbmcsIHZhbHVlOlYpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fbGlzdFtrZXldID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmVhZChrZXk6c3RyaW5nKTpWe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9saXN0W2tleV07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBpdGVyYXRlKGY6KGs6c3RyaW5nLHY6Vik9PnZvaWQpOnZvaWR7XHJcbiAgICAgICAgZm9yIChsZXQgayBpbiB0aGlzLl9saXN0KSB7XHJcbiAgICAgICAgICAgIGYoaywgdGhpcy5fbGlzdFtrXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuY2xhc3MgTm9kZTxFPntcclxuICAgIHB1YmxpYyBpdGVtOkU7XHJcbiAgICBwdWJsaWMgbmV4dDpOb2RlPEU+O1xyXG4gICAgY29uc3RydWN0b3IoaXRlbTpFLCBuZXh0Ok5vZGU8RT4pe1xyXG4gICAgICAgIHRoaXMuaXRlbSA9IGl0ZW07XHJcbiAgICAgICAgdGhpcy5uZXh0ID0gbmV4dDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIExpbmtMaXN0PEU+e1xyXG4gICAgcHJpdmF0ZSBfaGVhZDpOb2RlPEU+O1xyXG4gICAgcHJpdmF0ZSBfdGFpbDpOb2RlPEU+O1xyXG4gICAgcHJpdmF0ZSBfbGVuZ3RoOm51bWJlciA9IDA7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuX2hlYWQgPSBuZXcgTm9kZTxFPihudWxsLCBudWxsKTtcclxuICAgICAgICB0aGlzLl90YWlsID0gbmV3IE5vZGU8RT4obnVsbCwgbnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ln7rnoYDlsZ7mgKdcclxuICAgIHB1YmxpYyBnZXQgbGVuZ3RoKCk6bnVtYmVye1xyXG4gICAgICAgIC8vIGxldCByZXN1bHQ6bnVtYmVyID0gMDtcclxuICAgICAgICAvLyBsZXQgY3VycmVudDpOb2RlPEU+ID0gdGhpcy5faGVhZDtcclxuICAgICAgICAvLyB3aGlsZSAoY3VycmVudC5uZXh0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgLy8gICAgIHJlc3VsdCArPSAxO1xyXG4gICAgICAgIC8vICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpc0VtcHR5KCk6Ym9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5faGVhZC5uZXh0ID09PSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5aKe5Yig5pS55p+lXHJcbiAgICAvL+WinlxyXG4gICAgcHVibGljIHB1c2goaXRlbTpFKTp2b2lke1xyXG4gICAgICAgIGxldCBsYXN0Ok5vZGU8RT4gPSBuZXcgTm9kZTxFPihpdGVtLCBudWxsKTtcclxuICAgICAgICBpZiAodGhpcy5pc0VtcHR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2hlYWQubmV4dCA9IGxhc3Q7XHJcbiAgICAgICAgICAgIHRoaXMuX3RhaWwubmV4dCA9IGxhc3Q7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0Lm5leHQgPSBsYXN0O1xyXG4gICAgICAgICAgICB0aGlzLl90YWlsLm5leHQgPSBsYXN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9sZW5ndGggKz0gMTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdW5zaGlmdChpdGVtOkUpOnZvaWR7XHJcbiAgICAgICAgbGV0IGZpcnN0Ok5vZGU8RT4gPSBuZXcgTm9kZTxFPihpdGVtLCBudWxsKTtcclxuICAgICAgICBpZiAodGhpcy5pc0VtcHR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RhaWwubmV4dCA9IGZpcnN0O1xyXG4gICAgICAgICAgICB0aGlzLl9oZWFkLm5leHQgPSBmaXJzdDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmaXJzdC5uZXh0ID0gdGhpcy5faGVhZC5uZXh0O1xyXG4gICAgICAgICAgICB0aGlzLl9oZWFkLm5leHQgPSBmaXJzdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbGVuZ3RoICs9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluc2VydChpbmRleDpudW1iZXIsIGl0ZW06RSk6Ym9vbGVhbntcclxuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID4gdGhpcy5fbGVuZ3RoKSB7Ly/ov5nlj6XkuI3kuIDmoLdcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGluZGV4ID09PSB0aGlzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGN1cnJlbnQ6Tm9kZTxFPiA9IHRoaXMuX2hlYWQ7Ly/ov5nlj6Xlkozlhbbku5bpgY3ljobmmK/kuI3kuIDmoLfnmoTvvIzlm6DkuLropoHpgInlj5bliLDpgInlrprkvY3nva7nmoTliY3pnaLkuIDmoLxcclxuICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IGluZGV4OyBuICs9IDEpIHtcclxuICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGN1cnJlbnQubmV4dCA9IG5ldyBOb2RlPEU+KGl0ZW0sIGN1cnJlbnQubmV4dCk7XHJcbiAgICAgICAgdGhpcy5fbGVuZ3RoICs9IDE7XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5YigXHJcbiAgICBwdWJsaWMgcmVtb3ZlKGluZGV4Om51bWJlcik6RXtcclxuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGN1cnJlbnQ6Tm9kZTxFPiA9IHRoaXMuX2hlYWQubmV4dDtcclxuICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IGluZGV4OyBuICs9IDEpIHtcclxuICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBpdGVtOkUgPSBjdXJyZW50Lml0ZW07XHJcbiAgICAgICAgY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fbGVuZ3RoIC09IDE7XHJcblxyXG4gICAgICAgIHJldHVybiBjdXJyZW50Lml0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNoaWZ0KCk6RXtcclxuICAgICAgICBpZiAodGhpcy5pc0VtcHR5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLl9oZWFkLm5leHQuaXRlbTtcclxuICAgICAgICB0aGlzLl9oZWFkLm5leHQgPSB0aGlzLl9oZWFkLm5leHQubmV4dDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbXB0eSkge1xyXG4gICAgICAgICAgICB0aGlzLl90YWlsLm5leHQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fbGVuZ3RoIC09IDE7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgLy/mlLlcclxuICAgIHB1YmxpYyB3cml0ZShpbmRleDpudW1iZXIsIGl0ZW06RSk6dm9pZHtcclxuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjdXJyZW50Ok5vZGU8RT4gPSB0aGlzLl9oZWFkLm5leHQ7XHJcbiAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBpbmRleDsgbiArPSAxKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjdXJyZW50Lml0ZW0gPSBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5p+lXHJcbiAgICBwdWJsaWMgcmVhZChpbmRleDpudW1iZXIpOkV7XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY3VycmVudDpOb2RlPEU+ID0gdGhpcy5faGVhZC5uZXh0O1xyXG4gICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgaW5kZXg7IG4gKz0gMSkge1xyXG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQuaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VhcmNoKGl0ZW06RSk6bnVtYmVyW117XHJcbiAgICAgICAgbGV0IHJlc3VsdDpudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgIHRoaXMuZm9yZWFjaCgoZWxlOkUsIGluZGV4Om51bWJlcik9PntcclxuICAgICAgICAgICAgaWYgKGVsZSA9PT0gaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goaW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWremTvuihqOS4reaYr+WQpuWtmOWcqOafkOS4gOWFg+e0oFxyXG4gICAgICogQHBhcmFtIGl0ZW0gXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoYXMoaXRlbTogRSk6Ym9vbGVhbntcclxuXHJcbiAgICAgICAgbGV0IGN1cnJlbnQgPSB0aGlzLl9oZWFkLm5leHQ7XHJcbiAgICAgICAgd2hpbGUgKGN1cnJlbnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudC5pdGVtID09IGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy/pq5jpmLblh73mlbBcclxuICAgIHB1YmxpYyBmb3JlYWNoKGY6KGVsZTpFLCBpbmRleDpudW1iZXIsIGxpc3Q6TGlua0xpc3Q8RT4pPT52b2lkKTp2b2lke1xyXG4gICAgICAgIGxldCBjdXJyZW50ID0gdGhpcy5faGVhZC5uZXh0O1xyXG4gICAgICAgIGxldCBudW06bnVtYmVyID0gMDtcclxuICAgICAgICB3aGlsZSAoY3VycmVudCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBmKGN1cnJlbnQuaXRlbSwgbnVtLCB0aGlzKTtcclxuICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcclxuICAgICAgICAgICAgbnVtICs9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K+35pqC5pe25LiN6KaB5L2/55So6L+Z5Liq5Ye95pWw77yM5Zug5Li65oiR5Lmf5LiN55+l6YGT5a6D5Lya5LiN5Lya54iG54K4XHJcbiAgICAgKiDpmaTpnZ7kvaDor7vov4fov5nkuKrlh73mlbDnmoTmupDku6PnoIFcclxuICAgICAqIEBwYXJhbSBmIOWIpOaWreWFg+e0oOS8mOWFiOe6p+eahOWbnuiwg+WHveaVsFxyXG4gICAgICogQHBhcmFtIGluY3JlYXNlIOaYr+WQpuWNh+W6j++8jOm7mOiupOWNh+W6j1xyXG4gICAgICogQHJldHVybnMg6L+U5Zue5LiA5Liq5o6S5bqP55qE6ZO+6KGoXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzb3J0YnkoZjooZWxlOkUpPT5udW1iZXIsIGluY3JlYXNlOmJvb2xlYW4gPSB0cnVlKTpMaW5rTGlzdDxFPntcclxuICAgICAgICBsZXQgcHJpb3JpdHk6TGlua0xpc3Q8bnVtYmVyPiA9IG5ldyBMaW5rTGlzdDxudW1iZXI+KCk7XHJcbiAgICAgICAgbGV0IHNvcnRlZDpMaW5rTGlzdDxFPiA9IG5ldyBMaW5rTGlzdDxFPigpO1xyXG4gICAgICAgIHByaW9yaXR5LnB1c2goLTApO1xyXG4gICAgICAgIHNvcnRlZC5wdXNoKG51bGwpO1xyXG5cclxuICAgICAgICBsZXQgY29tcGFyZTooYTpudW1iZXIsYjpudW1iZXIpPT5ib29sZWFuID0gaW5jcmVhc2U/KGEsYik9PntyZXR1cm4gYSA8IGI7fTooYSxiKT0+e3JldHVybiBhID4gYn07XHJcblxyXG4gICAgICAgIHRoaXMuZm9yZWFjaCgoZWxlKT0+e1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFByaSA9IGYoZWxlKTtcclxuICAgICAgICAgICAgbGV0IG5vZGU6Tm9kZTxFPiA9IHNvcnRlZC5faGVhZC5uZXh0O1xyXG4gICAgICAgICAgICBsZXQgcHJpTm9kZTpOb2RlPG51bWJlcj4gPSBwcmlvcml0eS5faGVhZC5uZXh0O1xyXG5cclxuICAgICAgICAgICAgbGV0IGZvdW5kUGxhY2U6Ym9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB3aGlsZSAobm9kZS5uZXh0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoY3VycmVudFByaSA8IHByaU5vZGUubmV4dC5pdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcGFyZShjdXJyZW50UHJpLCBwcmlOb2RlLm5leHQuaXRlbSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLm5leHQgPSBuZXcgTm9kZTxFPihlbGUsIG5vZGUubmV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJpTm9kZS5uZXh0ID0gbmV3IE5vZGU8bnVtYmVyPihjdXJyZW50UHJpLCBwcmlOb2RlLm5leHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvdW5kUGxhY2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlLm5leHQ7XHJcbiAgICAgICAgICAgICAgICBwcmlOb2RlID0gcHJpTm9kZS5uZXh0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIWZvdW5kUGxhY2UpIHtcclxuICAgICAgICAgICAgICAgIHNvcnRlZC5wdXNoKGVsZSk7XHJcbiAgICAgICAgICAgICAgICBwcmlvcml0eS5wdXNoKGN1cnJlbnRQcmkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNvcnRlZC5zaGlmdCgpO1xyXG4gICAgICAgIHJldHVybiBzb3J0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcHVibGljIGJiU29ydEJ5KGY6KGVsZTpFKT0+bnVtYmVyLCBpbmNyZWFzZTpib29sZWFuID0gdHJ1ZSk6TGlua0xpc3Q8RT57XHJcblxyXG4gICAgLy8gfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBBcnJheTxFPntcclxuICAgIHB1YmxpYyBhcnI6RVtdO1xyXG4gICAgcHVibGljIHBvaW50ZXI6bnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNvdXJjZTpFW10gPSBbXSwgaW5pdFBvaW50Om51bWJlciA9IC0xKXtcclxuICAgICAgICB0aGlzLmFyciA9IHNvdXJjZTtcclxuICAgICAgICB0aGlzLnBvaW50ZXIgPSBpbml0UG9pbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlYWQoKTpFe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFyclt0aGlzLnBvaW50ZXJdO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgc3RlcCgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5wb2ludGVyICs9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBvdXQoKTpib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvaW50ZXIgPCAwIHx8IHRoaXMucG9pbnRlciA+PSB0aGlzLmFyci5sZW5ndGg7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEFycmF5QWxnb3tcclxuXHJcbiAgICAvKipcclxuICAgICAqIOi+k+WFpeeahOS4pOS4quaVsOe7hOeahOavj+S4qmluZGV45a+55bqU5YWD57Sg5piv5ZCm55u4562JXHJcbiAgICAgKiBAcGFyYW0gYXJyMCBcclxuICAgICAqIEBwYXJhbSBhcnIxIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHN0cmljdENvbXBhcmUoYXJyMDpDb21wYXJhYmxlW10sIGFycjE6Q29tcGFyYWJsZVtdKTpib29sZWFue1xyXG4gICAgICAgIGlmIChhcnIwLmxlbmd0aCAhPT0gYXJyMS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycjAubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICAgICAgaWYgKCFhcnIwW2ldLmVxdWFscyhhcnIxW2ldKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuS4gOS4qumbhuWQiGPvvIzkuJTkvb/lvpflroPlhbfmnInlpoLkuIvmgKfotKjvvJpcclxuICAgICAqIOWvueS6juavj+S4quWtmOWcqOS6jumbhuWQiGHkuK3nmoTlhYPntKDvvIzlpoLmnpzlroPkuI3lnKjpm4blkIhi5Lit77yM5YiZ5a6D5Zyo6ZuG5ZCIY+S4rVxyXG4gICAgICog5Y2zYz1hLWJcclxuICAgICAqIEBwYXJhbSBhIFxyXG4gICAgICogQHBhcmFtIGIgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZmluZENvbXBsZW1lbnRTZXQoYTpDb21wYXJhYmxlW10sIGI6Q29tcGFyYWJsZVtdKTpDb21wYXJhYmxlW117XHJcbiAgICAgICAgbGV0IHJlc3VsdDpDb21wYXJhYmxlW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBlbGUgb2YgYSkge1xyXG4gICAgICAgICAgICBpZiAoQXJyYXlBbGdvLmZpbmRFbGUoZWxlLCBiKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGVsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8v5rGC55u45a+56KGl6ZuGYS1iXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGZpbmRJbnRlcnNlY3Rpb25TZXQoYTpDb21wYXJhYmxlW10sIGI6Q29tcGFyYWJsZVtdKXtcclxuICAgICAgICAvL+axguS6pOmbhmHiiKliXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDovpPlhaXkuIDkuKrmlbDnu4TvvIzov5Tlm57lsIbph43lpI3lhYPntKDliKDpmaTlkI7nmoTmlrDmlbDnu4RcclxuICAgICAqIOS4jeaUueWKqOWOn+aVsOe7hFxyXG4gICAgICog5aSa5Liq5YWD57Sg5LuF5Y+W6aaW5LiqXHJcbiAgICAgKiBAcGFyYW0gbGlzdCBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzaHJpbmsobGlzdDphbnlbXSk6YW55W117XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xyXG5cclxuICAgICAgICBsaXN0LmZvckVhY2goZWxlPT57XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQuaW5kZXhPZihlbGUpID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChlbGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmsYJlbGXlnKhhcnLkuK3nmoRpbmRleO+8jOiLpeacquaJvuWIsOWImei/lOWbni0xXHJcbiAgICAgKiBlbGXlv4Xpobvlrp7njrBjb21wYXJhYmxl5o6l5Y+jXHJcbiAgICAgKiBAcGFyYW0gZWxlIFxyXG4gICAgICogQHBhcmFtIGFyciBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBmaW5kRWxlKGVsZTpDb21wYXJhYmxlLCBhcnI6Q29tcGFyYWJsZVtdKTpudW1iZXJ7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICAgICAgaWYgKGVsZS5lcXVhbHMoYXJyW2ldKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LuOYXJy5Lit56e76ZmkZWxlXHJcbiAgICAgKiDlpoLmnpxlbGXkuI3lrZjlnKjliJnku4DkuYjpg73kuI3lgZpcclxuICAgICAqIEBwYXJhbSBlbGUgXHJcbiAgICAgKiBAcGFyYW0gYXJyIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlbW92ZUVsZShlbGU6YW55LCBhcnI6YW55W10pOmFueVtde1xyXG4gICAgICAgIGNvbnN0IGkgPSBhcnIuaW5kZXhPZihlbGUpO1xyXG4gICAgICAgIGlmIChpICE9PSAtMSkge1xyXG4gICAgICAgICAgICBhcnIuc3BsaWNlKGksMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnI7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbi8vIGV4cG9ydCBjbGFzcyBCb3ggZXh0ZW5kcyBMYXlhLlJlY3RhbmdsZXtcclxuXHJcbi8vICAgICBwdWJsaWMgdW5pdFg6bnVtYmVyO1xyXG4vLyAgICAgcHVibGljIHVuaXRZOm51bWJlcjtcclxuICAgIFxyXG5cclxuLy8gICAgIGNvbnN0cnVjdG9yKCl7XHJcbi8vICAgICAgICAgc3VwZXIoMCwwLDAsMCk7XHJcbi8vICAgICB9XHJcbiAgIFxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog5bCx5piv4oCm4oCm5p2l5LiA57uE77yIMTAw5Liq77yJ6ZqP5py655qE56Kw5pKe566xXHJcbi8vICAgICAgKiBAcGFyYW0geFJhbmdlIFxyXG4vLyAgICAgICogQHBhcmFtIHlSYW5nZSBcclxuLy8gICAgICAqIEBwYXJhbSB3aWRSYW5nZSBcclxuLy8gICAgICAqIEBwYXJhbSBoaWdSYW5nZVxyXG4vLyAgICAgICovXHJcbi8vICAgICBwdWJsaWMgc3RhdGljIHJhbmRvbUJveGVzKHhSYW5nZTpudW1iZXIgPSAxMjAwLCB5UmFuZ2U6bnVtYmVyID0gODAwLCB3aWRSYW5nZTpudW1iZXIgPSAzMDAsIGhpZ1JhbmdlOm51bWJlciA9IDMwMCk6Qm94W117XHJcbi8vICAgICAgICAgY29uc3QgcmFkOkZ1bmN0aW9uID0gTXlNYXRoLnJhbmRvbUludDtcclxuLy8gICAgICAgICBsZXQgcmVzdWx0OkJveFtdID0gW107XHJcbi8vICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDUwOyBpICs9IDEpIHtcclxuLy8gICAgICAgICAgICAgcmVzdWx0LnB1c2gobmV3IEJveCgpKTtcclxuLy8gICAgICAgICAgICAgcmVzdWx0W2ldLnBvcyhyYWQoeFJhbmdlKSwgcmFkKHlSYW5nZSkpLnNpemUocmFkKHdpZFJhbmdlKSwgcmFkKGhpZ1JhbmdlKSk7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgcHVibGljIHBvcyh4Om51bWJlciwgeTpudW1iZXIpOkJveHtcclxuLy8gICAgICAgICB0aGlzLnggPSB4O1xyXG4vLyAgICAgICAgIHRoaXMueSA9IHk7XHJcbi8vICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgcHVibGljIHNpemUod2lkdGg6bnVtYmVyLCBoZWlnaHQ6bnVtYmVyKTpCb3h7XHJcbi8vICAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4vLyAgICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4vLyAgICAgICAgIHJldHVybiB0aGlzO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIHB1YmxpYyBpbnRlcnNlY3RzX1gocmVjOkJveCk6Ym9vbGVhbntcclxuLy8gICAgICAgICBpZiAodGhpcy54IDwgcmVjLngpIHtcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHJlYy5pbnRlcnNlY3RzX1godGhpcyk7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHJldHVybiAgKHRoaXMueCA+PSByZWMueCAmJiB0aGlzLnggPD0gcmVjLnJpZ2h0KSB8fFxyXG4vLyAgICAgICAgICAgICAgICAgKHRoaXMucmlnaHQgPj0gcmVjLnggJiYgdGhpcy5yaWdodCA8PSByZWMucmlnaHQpXHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgcHVibGljIGludGVyc2VjdHNfWShyZWM6Qm94KTpib29sZWFue1xyXG4vLyAgICAgICAgIGlmICh0aGlzLnk8cmVjLnkpIHtcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHJlYy5pbnRlcnNlY3RzX1kodGhpcyk7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHJldHVybiAgKHRoaXMueSA+PSByZWMueSAmJiB0aGlzLnkgPD0gcmVjLmJvdHRvbSkgfHxcclxuLy8gICAgICAgICAgICAgICAgICh0aGlzLmJvdHRvbSA+PSByZWMueSAmJiB0aGlzLmJvdHRvbSA8PSByZWMuYm90dG9tKVxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbiAgICBcclxuLy8gY2xhc3MgTWFwTm9kZTxLLFY+e1xyXG4vLyAgICAgcHVibGljIGtleTtcclxuLy8gICAgIHB1YmxpYyB2YWx1ZTtcclxuLy8gICAgIGNvbnN0cnVjdG9yKGtleTpLLCB2YWx1ZTpWKXtcclxuLy8gICAgICAgICB0aGlzLmtleSA9IGtleTtcclxuLy8gICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbi8vICAgICB9XHJcbi8vIH1cclxuXHJcbi8vIGV4cG9ydCBtb2R1bGUgU3RydWN7XHJcbi8vICAgICBleHBvcnQgY2xhc3MgTGlua0xpc3Q8RT57XHJcbi8vICAgICAgICAgcHJpdmF0ZSBfaGVhZDpOb2RlPEU+O1xyXG4vLyAgICAgICAgIHByaXZhdGUgX3RhaWw6Tm9kZTxFPjtcclxuLy8gICAgICAgICBjb25zdHJ1Y3Rvcigpe1xyXG4vLyAgICAgICAgICAgICB0aGlzLl9oZWFkID0gbmV3IE5vZGU8RT4obnVsbCwgbnVsbCk7XHJcbi8vICAgICAgICAgICAgIHRoaXMuX3RhaWwgPSBuZXcgTm9kZTxFPihudWxsLCBudWxsKTtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIC8v5Z+656GA5bGe5oCnXHJcbi8vICAgICAgICAgcHVibGljIGdldCBsZW5ndGgoKTpudW1iZXJ7XHJcbi8vICAgICAgICAgICAgIGxldCByZXN1bHQ6bnVtYmVyID0gMDtcclxuLy8gICAgICAgICAgICAgbGV0IGN1cnJlbnQ6Tm9kZTxFPiA9IHRoaXMuX2hlYWQ7XHJcbi8vICAgICAgICAgICAgIHdoaWxlIChjdXJyZW50Lm5leHQgIT09IG51bGwpIHtcclxuLy8gICAgICAgICAgICAgICAgIHJlc3VsdCArPSAxO1xyXG4vLyAgICAgICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgcHVibGljIGdldCBpc0VtcHR5KCk6Ym9vbGVhbntcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2hlYWQubmV4dCA9PT0gbnVsbDtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIC8v5aKe5Yig5pS55p+lXHJcbi8vICAgICAgICAgLy/lop5cclxuLy8gICAgICAgICBwdWJsaWMgcHVzaChpdGVtOkUpOnZvaWR7XHJcbi8vICAgICAgICAgICAgIGxldCBsYXN0Ok5vZGU8RT4gPSBuZXcgTm9kZTxFPihpdGVtLCBudWxsKTtcclxuLy8gICAgICAgICAgICAgaWYgKHRoaXMuaXNFbXB0eSkge1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5faGVhZC5uZXh0ID0gbGFzdDtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuX3RhaWwubmV4dCA9IGxhc3Q7XHJcbi8vICAgICAgICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLl90YWlsLm5leHQubmV4dCA9IGxhc3Q7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLl90YWlsLm5leHQgPSBsYXN0O1xyXG4vLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgcHVibGljIHVuc2hpZnQoaXRlbTpFKTp2b2lke1xyXG4vLyAgICAgICAgICAgICBsZXQgZmlyc3Q6Tm9kZTxFPiA9IG5ldyBOb2RlPEU+KGl0ZW0sIG51bGwpO1xyXG4vLyAgICAgICAgICAgICBpZiAodGhpcy5pc0VtcHR5KSB7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLl90YWlsLm5leHQgPSBmaXJzdDtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuX2hlYWQubmV4dCA9IGZpcnN0O1xyXG4vLyAgICAgICAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAgICAgZmlyc3QubmV4dCA9IHRoaXMuX2hlYWQubmV4dC5uZXh0O1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5faGVhZC5uZXh0ID0gZmlyc3Q7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIHB1YmxpYyBpbnNlcnQoaW5kZXg6bnVtYmVyLCBpdGVtOkUpOmJvb2xlYW57XHJcbi8vICAgICAgICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPiB0aGlzLmxlbmd0aCkgey8v6L+Z5Y+l5LiN5LiA5qC3XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gdGhpcy5sZW5ndGgpIHtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMucHVzaChpdGVtKTtcclxuLy8gICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgY3VycmVudDpOb2RlPEU+ID0gdGhpcy5faGVhZDsvL+i/meWPpeWSjOWFtuS7lumBjeWOhuaYr+S4jeS4gOagt+eahO+8jOWboOS4uuimgemAieWPluWIsOmAieWumuS9jee9rueahOWJjemdouS4gOagvFxyXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IGluZGV4OyBuICs9IDEpIHtcclxuLy8gICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIGN1cnJlbnQubmV4dCA9IG5ldyBOb2RlPEU+KGl0ZW0sIGN1cnJlbnQubmV4dCk7XHJcblxyXG4vLyAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIC8v5YigXHJcbi8vICAgICAgICAgcHVibGljIHJlbW92ZShpbmRleDpudW1iZXIpOkV7XHJcbi8vICAgICAgICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5sZW5ndGgpIHtcclxuLy8gICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgY3VycmVudDpOb2RlPEU+ID0gdGhpcy5faGVhZC5uZXh0O1xyXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IGluZGV4OyBuICs9IDEpIHtcclxuLy8gICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIGxldCBpdGVtOkUgPSBjdXJyZW50Lml0ZW07XHJcbi8vICAgICAgICAgICAgIGN1cnJlbnQgPSBudWxsO1xyXG5cclxuLy8gICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnQuaXRlbTtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIHB1YmxpYyBzaGlmdCgpOkV7XHJcbi8vICAgICAgICAgICAgIGlmICh0aGlzLmlzRW1wdHkpIHtcclxuLy8gICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuX2hlYWQubmV4dC5pdGVtO1xyXG4vLyAgICAgICAgICAgICB0aGlzLl9oZWFkLm5leHQgPSB0aGlzLl9oZWFkLm5leHQubmV4dDtcclxuLy8gICAgICAgICAgICAgaWYgKHRoaXMuaXNFbXB0eSkge1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0ID0gbnVsbDtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gaXRlbTtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIC8v5pS5XHJcbi8vICAgICAgICAgcHVibGljIHdyaXRlKGluZGV4Om51bWJlciwgaXRlbTpFKTp2b2lke1xyXG4vLyAgICAgICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMubGVuZ3RoKSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm47XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIGxldCBjdXJyZW50Ok5vZGU8RT4gPSB0aGlzLl9oZWFkLm5leHQ7XHJcbi8vICAgICAgICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgaW5kZXg7IG4gKz0gMSkge1xyXG4vLyAgICAgICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgY3VycmVudC5pdGVtID0gaXRlbTtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIC8v5p+lXHJcbi8vICAgICAgICAgcHVibGljIHJlYWQoaW5kZXg6bnVtYmVyKTpFe1xyXG4vLyAgICAgICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMubGVuZ3RoKSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm47XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIGxldCBjdXJyZW50Ok5vZGU8RT4gPSB0aGlzLl9oZWFkLm5leHQ7XHJcbi8vICAgICAgICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgaW5kZXg7IG4gKz0gMSkge1xyXG4vLyAgICAgICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnQuaXRlbTtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIHB1YmxpYyBzZWFyY2goaXRlbTpFKTpudW1iZXJbXXtcclxuLy8gICAgICAgICAgICAgbGV0IHJlc3VsdDpudW1iZXJbXSA9IFtdO1xyXG4vLyAgICAgICAgICAgICB0aGlzLmZvcmVhY2goKGVsZTpFLCBpbmRleDpudW1iZXIpPT57XHJcbi8vICAgICAgICAgICAgICAgICBpZiAoZWxlID09PSBpdGVtKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goaW5kZXgpO1xyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB9KTtcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIC8qKlxyXG4vLyAgICAgICAgICAqIOWIpOaWremTvuihqOS4reaYr+WQpuWtmOWcqOafkOS4gOWFg+e0oFxyXG4vLyAgICAgICAgICAqIEBwYXJhbSBpdGVtIFxyXG4vLyAgICAgICAgICAqL1xyXG4vLyAgICAgICAgIHB1YmxpYyBoYXMoaXRlbTogRSk6Ym9vbGVhbntcclxuXHJcbi8vICAgICAgICAgICAgIGxldCBjdXJyZW50ID0gdGhpcy5faGVhZC5uZXh0O1xyXG4vLyAgICAgICAgICAgICB3aGlsZSAoY3VycmVudCAhPSBudWxsKSB7XHJcbi8vICAgICAgICAgICAgICAgICBpZiAoY3VycmVudC5pdGVtID09IGl0ZW0pIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIC8v6auY6Zi25Ye95pWwXHJcbi8vICAgICAgICAgcHVibGljIGZvcmVhY2goZjooZWxlOkUsIGluZGV4Om51bWJlciwgbGlzdDpMaW5rTGlzdDxFPik9PnZvaWQpOnZvaWR7XHJcbi8vICAgICAgICAgICAgIGxldCBjdXJyZW50ID0gdGhpcy5faGVhZC5uZXh0O1xyXG4vLyAgICAgICAgICAgICBsZXQgbnVtOm51bWJlciA9IDA7XHJcbi8vICAgICAgICAgICAgIHdoaWxlIChjdXJyZW50ICE9PSBudWxsKSB7XHJcbi8vICAgICAgICAgICAgICAgICBmKGN1cnJlbnQuaXRlbSwgbnVtLCB0aGlzKTtcclxuLy8gICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbi8vICAgICAgICAgICAgICAgICBudW0gKz0gMTtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgLyoqXHJcbi8vICAgICAgICAgICog6K+35pqC5pe25LiN6KaB5L2/55So6L+Z5Liq5Ye95pWw77yM5Zug5Li65oiR5Lmf5LiN55+l6YGT5a6D5Lya5LiN5Lya54iG54K4XHJcbi8vICAgICAgICAgICog6Zmk6Z2e5L2g6K+76L+H6L+Z5Liq5Ye95pWw55qE5rqQ5Luj56CBXHJcbi8vICAgICAgICAgICogQHBhcmFtIGYg5Yik5pat5YWD57Sg5LyY5YWI57qn55qE5Zue6LCD5Ye95pWwXHJcbi8vICAgICAgICAgICogQHBhcmFtIGluY3JlYXNlIOaYr+WQpuWNh+W6j++8jOm7mOiupOWNh+W6j1xyXG4vLyAgICAgICAgICAqIEByZXR1cm5zIOi/lOWbnuS4gOS4quaOkuW6j+eahOmTvuihqFxyXG4vLyAgICAgICAgICAqL1xyXG4vLyAgICAgICAgIHB1YmxpYyBzb3J0YnkoZjooZWxlOkUpPT5udW1iZXIsIGluY3JlYXNlOmJvb2xlYW4gPSB0cnVlKTpMaW5rTGlzdDxFPntcclxuLy8gICAgICAgICAgICAgbGV0IHByaW9yaXR5OkxpbmtMaXN0PG51bWJlcj4gPSBuZXcgTGlua0xpc3Q8bnVtYmVyPigpO1xyXG4vLyAgICAgICAgICAgICBsZXQgc29ydGVkOkxpbmtMaXN0PEU+ID0gbmV3IExpbmtMaXN0PEU+KCk7XHJcbi8vICAgICAgICAgICAgIHByaW9yaXR5LnB1c2goLTApO1xyXG4vLyAgICAgICAgICAgICBzb3J0ZWQucHVzaChudWxsKTtcclxuXHJcbi8vICAgICAgICAgICAgIGxldCBjb21wYXJlOihhOm51bWJlcixiOm51bWJlcik9PmJvb2xlYW4gPSBpbmNyZWFzZT8oYSxiKT0+e3JldHVybiBhIDwgYjt9OihhLGIpPT57cmV0dXJuIGEgPiBifTtcclxuXHJcbi8vICAgICAgICAgICAgIHRoaXMuZm9yZWFjaCgoZWxlKT0+e1xyXG4vLyAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRQcmkgPSBmKGVsZSk7XHJcbi8vICAgICAgICAgICAgICAgICBsZXQgbm9kZTpOb2RlPEU+ID0gc29ydGVkLl9oZWFkLm5leHQ7XHJcbi8vICAgICAgICAgICAgICAgICBsZXQgcHJpTm9kZTpOb2RlPG51bWJlcj4gPSBwcmlvcml0eS5faGVhZC5uZXh0O1xyXG5cclxuLy8gICAgICAgICAgICAgICAgIGxldCBmb3VuZFBsYWNlOmJvb2xlYW4gPSBmYWxzZTtcclxuLy8gICAgICAgICAgICAgICAgIHdoaWxlIChub2RlLm5leHQgIT09IG51bGwpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAvLyBpZiAoY3VycmVudFByaSA8IHByaU5vZGUubmV4dC5pdGVtKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBhcmUoY3VycmVudFByaSwgcHJpTm9kZS5uZXh0Lml0ZW0pKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUubmV4dCA9IG5ldyBOb2RlPEU+KGVsZSwgbm9kZS5uZXh0KTtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgcHJpTm9kZS5uZXh0ID0gbmV3IE5vZGU8bnVtYmVyPihjdXJyZW50UHJpLCBwcmlOb2RlLm5leHQpO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBmb3VuZFBsYWNlID0gdHJ1ZTtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5uZXh0O1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHByaU5vZGUgPSBwcmlOb2RlLm5leHQ7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgaWYgKCFmb3VuZFBsYWNlKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgc29ydGVkLnB1c2goZWxlKTtcclxuLy8gICAgICAgICAgICAgICAgICAgICBwcmlvcml0eS5wdXNoKGN1cnJlbnRQcmkpO1xyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB9KTtcclxuXHJcbi8vICAgICAgICAgICAgIHNvcnRlZC5zaGlmdCgpO1xyXG4vLyAgICAgICAgICAgICByZXR1cm4gc29ydGVkO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgLy8gcHVibGljIGJiU29ydEJ5KGY6KGVsZTpFKT0+bnVtYmVyLCBpbmNyZWFzZTpib29sZWFuID0gdHJ1ZSk6TGlua0xpc3Q8RT57XHJcblxyXG4vLyAgICAgICAgIC8vIH1cclxuXHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgZXhwb3J0IGNsYXNzIE1hcDxLLFY+e1xyXG4vLyAgICAgICAgIHByaXZhdGUgX2xpc3Q6QXJyYXk8TWFwTm9kZTxLLFY+PlxyXG4vLyAgICAgICAgIGNvbnN0cnVjdG9yKCl7XHJcbi8vICAgICAgICAgICAgIHRoaXMuX2xpc3QgPSBbXVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBwdWJsaWMgZ2V0KGtleTpLKTpWe1xyXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBlbGUgb2YgdGhpcy5fbGlzdCl7XHJcbi8vICAgICAgICAgICAgICAgICBpZiAoZWxlLmtleSA9PT0ga2V5KSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZS52YWx1ZVxyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHJldHVybiBudWxsXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHB1YmxpYyBnZXRLZXlCeVZhbCh2YWw6Vik6S3tcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgZWxlIG9mIHRoaXMuX2xpc3QpIHtcclxuLy8gICAgICAgICAgICAgICAgIGlmIChlbGUudmFsdWUgPT09IHZhbCkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGUua2V5XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgcmV0dXJuIG51bGxcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcHVibGljIGtleUV4aXN0KGtleTpLKTpib29sZWFue1xyXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBlbGUgb2YgdGhpcy5fbGlzdCkge1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKGVsZS5rZXkgPT09IGtleSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHB1YmxpYyBzZXQoa2V5OkssdmFsdWU6Vik6Ym9vbGVhbntcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCB0aGlzLl9saXN0Lmxlbmd0aDsgbiArPSAxKSB7XHJcbi8vICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbGlzdFtuXS5rZXkgPT09IGtleSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xpc3Rbbl0udmFsdWUgPSB2YWx1ZVxyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB0aGlzLl9saXN0LnB1c2gobmV3IE1hcE5vZGU8SyxWPihrZXksdmFsdWUpKVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcHVibGljIGJhdGNoU2V0KGtleXM6S1tdLCB2YWx1ZXM6VltdKTpib29sZWFue1xyXG4vLyAgICAgICAgICAgICBpZiAoa2V5cy5sZW5ndGggIT09IHZhbHVlcy5sZW5ndGgpIHtcclxuLy8gICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IGtleXMubGVuZ3RoOyBuICs9IDEpIHtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuc2V0KGtleXNbbl0sIHZhbHVlc1tuXSk7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcblxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBwdWJsaWMgcmVtb3ZlKGtleTpLKTpib29sZWFue1xyXG4vLyAgICAgICAgICAgICBsZXQgY291bnQ6bnVtYmVyID0gMDtcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgZWxlIG9mIHRoaXMuX2xpc3QpIHtcclxuLy8gICAgICAgICAgICAgICAgIGlmIChlbGUua2V5ID09PSBrZXkpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLl9saXN0LnNwbGljZShjb3VudCwxKTtcclxuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgY291bnQgKz0gMTtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcHVibGljIGdldCBsZW5ndGgoKTpudW1iZXJ7XHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLl9saXN0Lmxlbmd0aFxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBwdWJsaWMgZm9yZWFjaChmOihrOkssIHY6Vik9PnZvaWQpOnZvaWR7XHJcbi8vICAgICAgICAgICAgIGZvciAobGV0IGVsZSBvZiB0aGlzLl9saXN0KSB7XHJcbi8vICAgICAgICAgICAgICAgICBmKGVsZS5rZXksIGVsZS52YWx1ZSk7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgcmV0dXJuO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBwdWJsaWMgZmlsdGVyKGY6KGs6Syx2OlYpPT5ib29sZWFuKTpNYXA8SyxWPntcclxuLy8gICAgICAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBNYXA8SyxWPigpO1xyXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBlbGUgb2YgdGhpcy5fbGlzdCkge1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKGYoZWxlLmtleSwgZWxlLnZhbHVlKSl7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnNldChlbGUua2V5LCBlbGUudmFsdWUpO1xyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIGV4cG9ydCBjbGFzcyBQb2ludGVyTGlzdDxFPntcclxuLy8gICAgICAgICBwcml2YXRlIF9saXN0OkFycmF5PEU+ID0gW107XHJcbi8vICAgICAgICAgcHJpdmF0ZSBfcG9pbnRlcjpudW1iZXIgPSAwO1xyXG4vLyAgICAgICAgIGNvbnN0cnVjdG9yKHNvdXJjZTpBcnJheTxFPiA9IFtdLCBpbml0UG9pbnQ6bnVtYmVyID0gMCl7XHJcbi8vICAgICAgICAgICAgIHNvdXJjZS5mb3JFYWNoKChlbGUpPT57XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLl9saXN0LnB1c2goZWxlKTtcclxuLy8gICAgICAgICAgICAgfSlcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIGdldCBleGNlZWRpbmcoKTpib29sZWFue1xyXG4vLyAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcG9pbnRlciA+PSB0aGlzLl9saXN0Lmxlbmd0aCB8fCB0aGlzLl9wb2ludGVyIDwgMFxyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgLypcclxuLy8gICAgICAgICDku6XkuIvms6jph4rkuK3vvIzmiormlbDnu4TnnIvkvZzmqKrlkJHmjpLliJfnmoTkuIDns7vliJflhYPntKBcclxuLy8gICAgICAgICBpbmRleCA9IDDnmoTlhYPntKDlnKjmnIDlt6bkvqdcclxuLy8gICAgICAgICAqL1xyXG5cclxuLy8gICAgICAgICByZWFkKCk6RXsvL+afpeeci+W9k+WJjXBvaW50ZXLmiYDmjIfnmoTlhYPntKBcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RbdGhpcy5fcG9pbnRlcl1cclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIHN0ZXAoKTpFey8vcG9pbnRlcuWQkeWPs+enu+S4gOatpVxyXG4vLyAgICAgICAgICAgICB0aGlzLl9wb2ludGVyKz0xO1xyXG4vLyAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZWFkKCk7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICB0byhwbGFjZTpudW1iZXIpOlBvaW50ZXJMaXN0PEU+ey8vcG9pbnRlcuenu+WIsOaMh+WumuS9jee9rlxyXG4vLyAgICAgICAgICAgICB0aGlzLl9wb2ludGVyID0gcGxhY2VcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXNcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIHB1c2goZGF0YTpFKTpQb2ludGVyTGlzdDxFPnsvL+WcqOaVsOe7hOacq+WwvuWinuWKoOS4gOS4quWFg+e0oFxyXG4vLyAgICAgICAgICAgICB0aGlzLl9saXN0LnB1c2goZGF0YSlcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXNcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIHNldChpbmRleDpudW1iZXIsZGF0YTpFKTpQb2ludGVyTGlzdDxFPnsvL+imhuWGmeaVsOe7hOeJueWummluZGV45Lit55qE5YWD57SgXHJcbi8vICAgICAgICAgICAgIHRoaXMuX2xpc3RbaW5kZXhdID0gZGF0YVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gdGhpc1xyXG4vLyAgICAgICAgIH1cclxuICAgICAgICBcclxuLy8gICAgICAgICBuZXh0KHNoaWZ0Om51bWJlciA9IDEpOkV7XHJcbi8vICAgICAgICAgICAgIC8v6K+75Y+W5L2N5LqO5b2T5YmNcG9pbnRlcuaJgOaMh+eahOWFg+e0oOWPs+i+ueiLpeW5suagvOeahOWFg+e0oFxyXG4vLyAgICAgICAgICAgICAvL3NoaWZ06buY6K6k5Li6Me+8jOWNs+W9k+WJjXBvaW50ZXLlj7Povrnnm7jpgrvnmoTlhYPntKBcclxuLy8gICAgICAgICAgICAgLy9zaGlmdOS4uui0n+aVsOaXtuiOt+WPluW3puS+p+eahOWFg+e0oFxyXG4vLyAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdFt0aGlzLl9wb2ludGVyK3NoaWZ0XVxyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgZ2V0IGxlbmd0aCgpOm51bWJlcnsvL+iOt+WPluaVsOe7hOmVv+W6plxyXG4vLyAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdC5sZW5ndGhcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIGdldCBsYXN0KCk6RXsvL+iOt+WPluacgOWQjuS4gOmhuVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdFt0aGlzLl9saXN0Lmxlbmd0aC0xXVxyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgZ2V0IGZpcnN0KCk6RXsvL+iOt+WPlummlumhuVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdFswXTtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIGdldCBwb2ludGVyKCk6bnVtYmVyey8v6I635Y+WcG9pbnRlclxyXG4vLyAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcG9pbnRlclxyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgZ2V0IGF0RW5kKCk6Ym9vbGVhbnsvL+afpeeci+KAnHBvaW50ZXLmjIflkJHmlbDnu4TmnIDlj7PkvqfnmoTlhYPntKDigJ3nmoTnnJ/lgLxcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BvaW50ZXIgPT09IHRoaXMuX2xpc3QubGVuZ3RoIC0gMVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH1cclxuLy8gfSIsIi8vVE9ET1xyXG4vL+aUvue9ruaIkeS7rOmhueebrumHjOiHquWumuS5ieeahOmAmueUqEtFWeWAvOihqFxyXG4vL+aUvuWcqOWQjOS4gOS4quaWh+S7tumHjOacieWKqeS6jue7k+aehOa4heaZsFxyXG4vL+WPpu+8muWmguaenOWPquacieafkOeJueWumuaooeWdl+ezu+e7n+mHjOS9v+eUqOeahGVudW3lj6/ku6XkuI3mlL7ov4fmnaUg55u05o6l5YaZ5Zyo5qih5Z2X5paH5Lu25LitXHJcblxyXG4vL+WPiOWPpu+8miDlu7rorq7lnKjkvb/nlKhlbnVt55qE5pe25YCZ5Yqg5LiA5Liq56m65YC8Tm9uZeS7peW6lOWvueWIpOWumumXrumimFxyXG5cclxuZXhwb3J0IGVudW0gQWN0b3JUeXBlIHtcclxuICAgIE5vbmUsXHJcbiAgICBPcGVyYXRvcixcclxuICAgIE1vbnN0ZXIsXHJcbiAgICBUb2tlblxyXG4gICAgLy/ov5nlhbblrp7mmK/lr7nlupTnmoTkuI3lkIznmoTmlbDmja7mqKHmnb9cclxufVxyXG5cclxuZXhwb3J0IGVudW0gQ2FtcFR5cGUge1xyXG4gICAgTm9uZSxcclxuICAgIFNlbGYsICAgLy/miJHmlrlcclxuICAgIEVuZW15ICAgLy/mlYzmlrlcclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBEb2RMb2cge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBEb2RMb2c7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBJbnN0YW5jZSgpOiBEb2RMb2cge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZSB8fCAodGhpcy5faW5zdGFuY2UgPSBuZXcgdGhpcygpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGRlYnVnKG1zZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgbXNnID0gYCR7bXNnfWA7XHJcbiAgICAgICAgY29uc29sZS5kZWJ1Zyhtc2cpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaW5mbyhtc2c6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIG1zZyA9IGAke21zZ31gO1xyXG4gICAgICAgIGNvbnNvbGUuaW5mbyhtc2cpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgd2Fybihtc2c6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIG1zZyA9IGAke21zZ31gO1xyXG4gICAgICAgIGNvbnNvbGUud2Fybihtc2cpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZXJyb3IobXNnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBtc2cgPSBgJHttc2d9YDtcclxuICAgICAgICBjb25zb2xlLmVycm9yKG1zZyk7XHJcbiAgICAgICAgRG9kTG9nLkluc3RhbmNlLl93cml0ZVRvRmlsZShtc2cpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3dyaXRlVG9GaWxlKGxvZzogc3RyaW5nKSB7XHJcbiAgICAgICAgLy9UT0RPXHJcbiAgICB9XHJcbn0iLCJleHBvcnQgaW50ZXJmYWNlIENvbXBhcmFibGV7XHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWreS4pOS4quWFg+e0oOaYr+WQpuebuOetiVxyXG4gICAgICog5b+F6aG75Y+v6YCGXHJcbiAgICAgKiBAcGFyYW0gZWxlIFxyXG4gICAgICovXHJcbiAgICBlcXVhbHMoZWxlOkNvbXBhcmFibGUpOmJvb2xlYW5cclxufVxyXG4gICAgXHJcbmV4cG9ydCBjbGFzcyBEb2RNYXRoe1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5ZueYS9i55qE5pW05pWw57uT5p6c77yI5bCP5pWw6YOo5YiG6IiN5Y67KVxyXG4gICAgICogYe+8jGLlpoLmnpzkuI3lnKjmraPmlbTmlbDln5/vvIzor7fnoa7kv53pmIXor7vov4fmraTlh73mlbBcclxuICAgICAqIHzigJTigJTigJTigJR84oCU4oCU4oCU4oCUfOKAlOKAlOKAlOKAlHzigJTigJTigJTigJR84oCU4oCU4oCU4oCUfFxyXG4gICAgICogICAgIC0xPC0tLTA8LS0tMTwtLS1cclxuICAgICAqICAgICAg5Y+v5Lul55CG6Kej5Li65Zyo5pWw6L205LiK5oqK57uT5p6c5ZCR5bem5pig5bCEXHJcbiAgICAgKiBAcGFyYW0gYSBcclxuICAgICAqIEBwYXJhbSBiIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGludERpdmlzaW9uKGE6bnVtYmVyLCBiOm51bWJlcik6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiAoYS1hJWIpL2I7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlnKjlubPpnaLkuIrmsYLku47mjIflrprlh7rlj5HngrnliLDmjIflrprnu4jngrnkvZzkuIDmnaHmjIflrprplb/luqbnmoTnur/mrrXvvIzmraTnur/mrrXnmoTlj6bkuIDnq6/ngrnnmoTlnZDmoIdcclxuICAgICAqIO+8iOWmguaenOatpOe6v+auteeahOmVv+W6puWkp+S6juetieS6juWHuuWPkeeCueWIsOe7iOeCueeahOi3neemu++8jOWImei+k+WHuue7iOeCueeahOWdkOagh++8iVxyXG4gICAgICogQHBhcmFtIGZyb20gXHJcbiAgICAgKiBAcGFyYW0gZW5kIFxyXG4gICAgICogQHBhcmFtIG1vdmVtZW50IFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG1vdmVUbyhmcm9tOlZlYzIsIGVuZDpWZWMyLCBtb3ZlbWVudDpudW1iZXIpOlZlYzJ7XHJcbiAgICAgICAgY29uc3QgeGRpcyA9IGVuZC54IC0gZnJvbS54O1xyXG4gICAgICAgIGNvbnN0IHlkaXMgPSBlbmQueSAtIGZyb20ueTtcclxuICAgICAgICBjb25zdCBkaXN0YW5jZSA9IE1hdGguc3FydCgoeGRpcykqKjIgKyAoeWRpcykqKjIpO1xyXG4gICAgICAgIGlmIChtb3ZlbWVudCA+PSBkaXN0YW5jZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZW5kO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCByYXRpbyA9IG1vdmVtZW50IC8gZGlzdGFuY2U7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMyKGZyb20ueCArIHhkaXMqcmF0aW8sZnJvbS55ICsgeWRpcypyYXRpbyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNeU1hdGgubW92ZVRv5Ye95pWw55qE5Y+m5LiA5Liq54mI5pys44CC6L+Z5Liq54mI5pys5Lya55u05o6l5L+u5pS5KGZyb206VmVjMinkvKDlhaXnmoTlr7nosaHmnKzouqvvvIzlubbliKTmlq3mnIDnu4hmcm9t5LiOZW5k5Lik5Liq5a+56LGh5piv5ZCm6YeN5ZCIXHJcbiAgICAgKiBAcGFyYW0gZnJvbSBcclxuICAgICAqIEBwYXJhbSBlbmQgXHJcbiAgICAgKiBAcGFyYW0gbW92ZW1lbnQgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbW92ZVRvU2lkZUVmZmVjdChmcm9tOlZlYzIsIGVuZDpWZWMyLCBtb3ZlbWVudDpudW1iZXIpOmJvb2xlYW57XHJcbiAgICAgICAgY29uc3QgeGRpcyA9IGVuZC54IC0gZnJvbS54O1xyXG4gICAgICAgIGNvbnN0IHlkaXMgPSBlbmQueSAtIGZyb20ueTtcclxuICAgICAgICBjb25zdCBkaXN0YW5jZSA9IE1hdGguc3FydCgoeGRpcykqKjIgKyAoeWRpcykqKjIpO1xyXG4gICAgICAgIGlmIChtb3ZlbWVudCA+PSBkaXN0YW5jZSkge1xyXG4gICAgICAgICAgICBmcm9tLnggPSBlbmQueDtcclxuICAgICAgICAgICAgZnJvbS55ID0gZW5kLnk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCByYXRpbyA9IG1vdmVtZW50IC8gZGlzdGFuY2U7XHJcbiAgICAgICAgZnJvbS54ID0gZnJvbS54ICsgeGRpcypyYXRpbztcclxuICAgICAgICBmcm9tLnkgPSBmcm9tLnkgKyB5ZGlzKnJhdGlvO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE15TWF0aC5tb3ZlVG/lh73mlbDnmoTlj6bkuIDkuKrniYjmnKzjgILov5Tlm57nm7Tnur/pgJ/luqblnKh4eeS4pOi9tOS4iueahOWIhumHj1xyXG4gICAgICogQHBhcmFtIGZyb20gXHJcbiAgICAgKiBAcGFyYW0gZW5kIFxyXG4gICAgICogQHBhcmFtIG1vdmVtZW50IFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG1vdmVUb0NvbXBvbmVudChmcm9tOlZlYzIsIGVuZDpWZWMyLCBtb3ZlbWVudDpudW1iZXIpOlZlYzJ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgeGRpcyA9IGVuZC54IC0gZnJvbS54O1xyXG4gICAgICAgIGNvbnN0IHlkaXMgPSBlbmQueSAtIGZyb20ueTtcclxuICAgICAgICBjb25zdCBkaXN0YW5jZSA9IE1hdGguc3FydCgoeGRpcykqKjIgKyAoeWRpcykqKjIpO1xyXG4gICAgICAgIGNvbnN0IHJhdGlvID0gbW92ZW1lbnQgLyBkaXN0YW5jZTtcclxuICAgICAgICByZXR1cm4gbmV3IFZlYzIoeGRpcypyYXRpbywgeWRpcypyYXRpbyk7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFZlYzIgaW1wbGVtZW50cyBDb21wYXJhYmxle1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbGlzdEZyb21MaXN0KGxpc3Q6bnVtYmVyW11bXSk6VmVjMltde1xyXG4gICAgICAgIGxldCByZXN1bHQ6VmVjMltdID0gW107XHJcblxyXG4gICAgICAgIGxpc3QuZm9yRWFjaChlbGU9PntcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2gobmV3IFZlYzIoZWxlWzBdLGVsZVsxXSkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB4Om51bWJlcjtcclxuICAgIHB1YmxpYyB5Om51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuS7juatpOeCueWIsOaMh+WumueCueeahOi3neemu1xyXG4gICAgICogQHBhcmFtIGVuZCBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpc3RhbmNlVG8oZW5kOlZlYzIpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gKChlbmQueCAtIHRoaXMueCkqKjIgKyAoZW5kLnkgLSB0aGlzLnkpKioyKSoqMC41O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5rGC5ZKM5Lik5LiqVmVj77yM6L+U5Zue57uT5p6c77yM5LiN5L+u5pS55Y6f5a6e5L6LXHJcbiAgICAgKiBAcGFyYW0gdmVjIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcGx1cyh2ZWM6VmVjMik6VmVjMntcclxuICAgICAgICByZXR1cm4gbmV3IFZlYzIodGhpcy54ICsgdmVjLngsIHRoaXMueSArIHZlYy55KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS7pei+k+WFpeWdkOagh+S4uuS4reW/g+i/m+ihjOmhuuaXtumSiDkw5bqm5peL6L2sXHJcbiAgICAgKiDvvIjmnKrlrozmiJDvvIlcclxuICAgICAqIEBwYXJhbSBjZW50cmUgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByb3RhdGVDbG9ja3dpc2UoY2VudHJlOlZlYzIpOlZlYzJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57mraTlkJHph4/nmoTlpI3liLZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNsb25lKCk6VmVjMntcclxuICAgICAgICByZXR1cm4gbmV3IFZlYzIodGhpcy54LCB0aGlzLnkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlcXVhbHMoZWxlOlZlYzIpOmJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueCA9PT0gZWxlLnggJiYgdGhpcy55ID09PSBlbGUueTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4PzpudW1iZXIsIHk/Om51bWJlcikge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiIsIi8vYXV0aG9yIE5hMkN1QzRPOFxyXG5cclxuXHJcbmltcG9ydCBDdXN0b21pemVkU3ByaXRlIGZyb20gXCIuL2N1c3RvbWl6ZWRTcHJcIjtcclxuaW1wb3J0IHsgVmVjMiB9IGZyb20gXCIuLi8uLi9Eb2RNYXRoXCI7XHJcbmltcG9ydCB7IEV2ZW50Q2VudHJlIH0gZnJvbSBcIi4uLy4uLy4uL0V2ZW50L0V2ZW50Q2VudHJlXCI7XHJcbmltcG9ydCB7IE15U3ltYm9sIH0gZnJvbSBcIi4uLy4uLy4uL0ZpeC9GaXhTeW1ib2xcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCYXJ7XHJcblxyXG4gICAgcHJpdmF0ZSBfaW5pdFBvczpWZWMyOy8v6LW35aeL5Z2Q5qCHXHJcbiAgICBwcml2YXRlIF9pbml0U2l6ZTpWZWMyOy8v6LW35aeL5aSn5bCPXHJcbiAgICBwcml2YXRlIF9wb3M6VmVjMjsvL+e8qeaUvuWQjuWdkOagh1xyXG4gICAgcHJpdmF0ZSBfc2l6ZTpWZWMyOy8v57yp5pS+5ZCO5aSn5bCPXHJcbiAgICBwcml2YXRlIF9zY2FsZTpudW1iZXIgPSAxOy8v5YWo5bGA57yp5pS+5q+UXHJcbiAgICBwcml2YXRlIF9zeW1iTnVtOm51bWJlcjsvL+i/m+W6puadoee8luWPt1xyXG4gICAgcHJpdmF0ZSBfYmFja1NwcjpDdXN0b21pemVkU3ByaXRlOy8v6L+b5bqm5p2h5bqV5bGC57uY5Zu+6IqC54K5XHJcbiAgICBwcml2YXRlIF9mcm9udFNwcjpDdXN0b21pemVkU3ByaXRlOy8v6L+b5bqm5p2h6aG25bGC57uY5Zu+6IqC54K5XHJcbiAgICBwcml2YXRlIF9wZXJjZW50YWdlOm51bWJlciA9IDE7Ly/ov5vluqZcclxuICAgIHByaXZhdGUgX2hlaWdodDpudW1iZXI7Ly/ov5vluqbmnaHpq5jluqZcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5vluqbmnaHmnoTpgKDlmahcclxuICAgICAqIEBwYXJhbSBzeW1iTnVtIOi/m+W6puadoee8luWPt1xyXG4gICAgICogQHBhcmFtIGJhY2tHcm91bmRDb2xvciDog4zmma/popzoibJcclxuICAgICAqIEBwYXJhbSBzaXplIOWkp+Wwj1xyXG4gICAgICogQHBhcmFtIHBvcyDlnZDmoIdcclxuICAgICAqIEBwYXJhbSBzY2FsZSDlhajlsYDnvKnmlL7mr5RcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioc3ltYk51bTpudW1iZXIsIGJhY2tHcm91bmRDb2xvcjpzdHJpbmcsc2l6ZTpWZWMyICxwb3M6VmVjMiwgc2NhbGU6bnVtYmVyID0gMSl7XHJcbiAgICAgICAgdGhpcy5fc3ltYk51bSA9IHN5bWJOdW07XHJcbiAgICAgICAgdGhpcy5faW5pdFNpemUgPSBzaXplO1xyXG4gICAgICAgIHRoaXMuX3NjYWxlID0gc2NhbGU7XHJcbiAgICAgICAgdGhpcy5fc2l6ZSA9IG5ldyBWZWMyKHRoaXMuX2luaXRTaXplLngqdGhpcy5fcGVyY2VudGFnZSp0aGlzLl9zY2FsZSx0aGlzLl9pbml0U2l6ZS55KnRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9pbml0UG9zID0gcG9zO1xyXG4gICAgICAgIHRoaXMuX3BvcyA9IG5ldyBWZWMyKHRoaXMuX2luaXRQb3MueCp0aGlzLl9zY2FsZSx0aGlzLl9pbml0UG9zLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX2JhY2tTcHIgPSBuZXcgQ3VzdG9taXplZFNwcml0ZSgpO1xyXG4gICAgICAgIHRoaXMuX2JhY2tTcHIuc2V0UGFyYW0odGhpcy5fcG9zLngsdGhpcy5fcG9zLnksdGhpcy5fc2l6ZS54LHRoaXMuX3NpemUueSxiYWNrR3JvdW5kQ29sb3IpO1xyXG4gICAgICAgIHRoaXMuX2JhY2tTcHIuY2hhbmdlQ29sb3IoKTtcclxuICAgICAgICB0aGlzLl9mcm9udFNwciA9IG5ldyBDdXN0b21pemVkU3ByaXRlKCk7XHJcbiAgICAgICAgdGhpcy5fYmFja1Nwci5hZGRDaGlsZCh0aGlzLl9mcm9udFNwcik7XHJcbiAgICAgICAgdGhpcy5fZnJvbnRTcHIuc2V0UGFyYW0oMCwwLHRoaXMuX3NpemUueCx0aGlzLl9zaXplLnksXCIjOGI4YjgzXCIsbmV3IFZlYzIodGhpcy5fc2NhbGUsdGhpcy5fc2NhbGUpKTtcclxuICAgICAgICB0aGlzLl9mcm9udFNwci5jaGFuZ2VDb2xvcigpO1xyXG4gICAgICAgIHRoaXMuX2hlaWdodCA9IHRoaXMuX2luaXRTaXplLnk7XHJcbiAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2Uub24oRXZlbnRDZW50cmUuRVR5cGUuUEVSRk9STUFOQ0VfUkVTQ0FMRSgpLHRoaXMsdGhpcy5yZVNjYWxlKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkv67mlLnnvKnmlL7mr5RcclxuICAgICAqIEBwYXJhbSB2YWx1ZSDlhajlsYDnvKnmlL7mr5RcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZVNjYWxlKHZhbHVlOm51bWJlcik6dm9pZHtcclxuICAgICAgICB0aGlzLl9zY2FsZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuX3BvcyA9IG5ldyBWZWMyKHRoaXMuX2luaXRQb3MueCp0aGlzLl9zY2FsZSwgdGhpcy5faW5pdFBvcy55KnRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9zaXplID0gbmV3IFZlYzIodGhpcy5faW5pdFNpemUueCp0aGlzLl9zY2FsZSwgdGhpcy5faW5pdFNpemUueSp0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fYmFja1Nwci5zZXRQYXJhbSh0aGlzLl9wb3MueCx0aGlzLl9wb3MueSx0aGlzLl9zaXplLngsdGhpcy5fc2l6ZS55KTsvL+iuvue9ruiDjOaZr+e7mOWbvuiKgueCueWPguaVsFxyXG4gICAgICAgIHRoaXMuX2JhY2tTcHIuY2hhbmdlQ29sb3IoKTtcclxuICAgICAgICB0aGlzLl9mcm9udFNwci5zZXRQYXJhbSgwLDAsdGhpcy5fc2l6ZS54KnRoaXMuX3BlcmNlbnRhZ2UsdGhpcy5fc2l6ZS55LFwiIzhiOGI4M1wiLG5ldyBWZWMyKDEqdGhpcy5fc2NhbGUsMSp0aGlzLl9zY2FsZSkpOy8v6K6+572u5YmN56uv57uY5Zu+6IqC54K55Y+C5pWwXHJcbiAgICAgICAgdGhpcy5fZnJvbnRTcHIuY2hhbmdlQ29sb3IoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9rui/m+W6puadoeS7o+WPt1xyXG4gICAgICogQHBhcmFtIHN5bWJOdW0g6L+b5bqm5p2h5Luj5Y+3XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRTeW1iKHN5bWJOdW06bnVtYmVyKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3N5bWJOdW0gPSBzeW1iTnVtO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5L+u5pS56L+b5bqmXHJcbiAgICAgKiBAcGFyYW0gcGVyY2VudGFnZSDnm67moIfov5vluqZcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBwZXJjZW50YWdlKHBlcmNlbnRhZ2U6bnVtYmVyKXtcclxuICAgICAgICBpZihwZXJjZW50YWdlID09PSAwKXtcclxuICAgICAgICAgICAgdGhpcy5fcGVyY2VudGFnZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX2Zyb250U3ByLmdyYXBoaWNzLmNsZWFyKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX3BlcmNlbnRhZ2UgPSBwZXJjZW50YWdlO1xyXG4gICAgICAgICAgICB0aGlzLl9mcm9udFNwci5zZXRQYXJhbSgwLDAsdGhpcy5fc2l6ZS54KnRoaXMuX3BlcmNlbnRhZ2UsdGhpcy5fc2l6ZS55LFwiIzhiOGI4M1wiLG5ldyBWZWMyKDEqdGhpcy5fc2NhbGUsMSp0aGlzLl9zY2FsZSkpO1xyXG4gICAgICAgICAgICB0aGlzLl9mcm9udFNwci5jaGFuZ2VDb2xvcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuacrOi/m+W6puadoeiDjOaZr+e7mOWbvuiKgueCuVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0QmFja1NwcigpOkN1c3RvbWl6ZWRTcHJpdGV7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JhY2tTcHI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57mnKzov5vluqbmnaHpq5jluqZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEhlaWdodCgpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5faGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQnV0dG9ue1xyXG5cclxuICAgIHByaXZhdGUgX2luaXRQb3M6VmVjMjsvL+aMiemSruWIneWni+WdkOagh1xyXG4gICAgcHJpdmF0ZSBfaW5pdFNpemU6VmVjMjsvL+aMiemSruWIneWni+WuvemrmFxyXG4gICAgcHJpdmF0ZSBfcG9zOlZlYzI7Ly/mmL7npLroioLngrnlnZDmoIdcclxuICAgIHByaXZhdGUgX3NpemU6VmVjMjsvL+aYvuekuuiKgueCueWuvemrmFxyXG4gICAgcHJpdmF0ZSBfc3ltYk5hbWU6bnVtYmVyOy8v5oyJ6ZKu57yW5Y+3XHJcbiAgICBwcml2YXRlIF9jb2xvcjpzdHJpbmc7Ly/mjInpkq7popzoibJcclxuICAgIHByaXZhdGUgX2hlaWdodDpudW1iZXI7Ly/mjInpkq7pq5jluqbvvIjpu5jorqTnvKnmlL7mr5TkuLox77yJXHJcbiAgICBwcml2YXRlIF9zcHI6Q3VzdG9taXplZFNwcml0ZTsvL+aMiemSruaYvuekuuiKgueCuVxyXG4gICAgcHJpdmF0ZSBfc2NhbGU6bnVtYmVyOy8v5YWo5bGA57yp5pS+5q+UXHJcbiAgICBwcml2YXRlIF9uYW1lOnN0cmluZzsvL+aMiemSruWQje+8iOaYvuekuuWcqOaMiemSruS4iu+8iVxyXG4gICAgcHJpdmF0ZSBfZnVuOkZ1bmN0aW9uOy8v5oyJ6ZKu5omA5pC65bim55qE5Yqf6IO95Ye95pWwXHJcbiAgICBwcml2YXRlIF9BUlVzeW1iOk15U3ltYm9sOy8v5oyJ6ZKu5omA5ZyoQWN0b3JSVVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5oyJ6ZKu5p6E6YCg5ZmoXHJcbiAgICAgKiBAcGFyYW0gbmFtZSDmjInpkq7lkI1cclxuICAgICAqIEBwYXJhbSBzeW1iTnVtIOaMiemSrue8luWPt1xyXG4gICAgICogQHBhcmFtIHBvcyDotbflp4vlnZDmoIdcclxuICAgICAqIEBwYXJhbSBzaXplIOi1t+Wni+WuvemrmFxyXG4gICAgICogQHBhcmFtIGNvbG9yIOaMiemSruminOiJslxyXG4gICAgICogQHBhcmFtIHNjYWxlIOe8qeaUvuavlFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihBUlVzeW1iOk15U3ltYm9sLCBuYW1lOnN0cmluZyA9IFwiZGVmYXVsdFwiLCBzeW1iTnVtOm51bWJlciwgcG9zOlZlYzIsIHNpemU6VmVjMiwgIGNvbG9yOnN0cmluZyA9IFwiIzAwQjJCRlwiLCBzY2FsZTpudW1iZXIgPSAxKXtcclxuICAgICAgICB0aGlzLl9BUlVzeW1iID0gQVJVc3ltYjtcclxuICAgICAgICB0aGlzLl9zeW1iTmFtZSA9IHN5bWJOdW07XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5faW5pdFBvcyA9IHBvcztcclxuICAgICAgICB0aGlzLl9pbml0U2l6ZSA9IHNpemU7XHJcbiAgICAgICAgdGhpcy5fY29sb3IgPSBjb2xvcjtcclxuICAgICAgICB0aGlzLl9zY2FsZSA9IHNjYWxlO1xyXG4gICAgICAgIHRoaXMuX3BvcyA9IG5ldyBWZWMyKHRoaXMuX2luaXRQb3MueCp0aGlzLl9zY2FsZSx0aGlzLl9pbml0UG9zLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX3NpemUgPSBuZXcgVmVjMih0aGlzLl9pbml0U2l6ZS54KnRoaXMuX3NjYWxlLHRoaXMuX2luaXRTaXplLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX2hlaWdodCA9IHRoaXMuX2luaXRTaXplLnk7XHJcbiAgICAgICAgdGhpcy5fc3ByID0gbmV3IEN1c3RvbWl6ZWRTcHJpdGUoKTtcclxuICAgICAgICB0aGlzLl9zcHIuc2V0UGFyYW0odGhpcy5fcG9zLngsdGhpcy5fcG9zLnksdGhpcy5fc2l6ZS54LHRoaXMuX3NpemUueSx0aGlzLl9jb2xvcik7XHJcbiAgICAgICAgdGhpcy5fc3ByLmNoYW5nZUNvbG9yKCk7XHJcbiAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2Uub24oRXZlbnRDZW50cmUuRVR5cGUuUEVSRk9STUFOQ0VfUkVTQ0FMRSgpLHRoaXMsdGhpcy5yZVNjYWxlKTtcclxuICAgICAgICB0aGlzLnNldFRleHQoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7mjInpkq7lip/og71cclxuICAgICAqIEBwYXJhbSBmdW4g5oyJ6ZKu5Yqf6IO95Ye95pWwXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRGdW5jKGZ1bjpGdW5jdGlvbik6dm9pZHtcclxuICAgICAgICB0aGlzLl9mdW4gPSBmdW47XHJcbiAgICAgICAgdGhpcy5fc3ByLm9uKExheWEuRXZlbnQuTU9VU0VfVVAsdGhpcyx0aGlzLl9mdW4pO1xyXG4gICAgICAgIHRoaXMuX3Nwci5vbihMYXlhLkV2ZW50Lk1PVVNFX09WRVIsdGhpcywoZTogTGF5YS5FdmVudCk9PntcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX3Nwci5vbihMYXlhLkV2ZW50Lk1PVVNFX1VQLHRoaXMsKGU6IExheWEuRXZlbnQpPT57XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57mjInpkq7nu5jlm77oioLngrlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFNwcigpOkN1c3RvbWl6ZWRTcHJpdGV7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NwcjtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57yp5pS+5oyJ6ZKuXHJcbiAgICAgKiBAcGFyYW0gdmFsdWUg5YWo5bGA57yp5pS+5q+UXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZVNjYWxlKHZhbHVlOm51bWJlcik6dm9pZHtcclxuICAgICAgICB0aGlzLl9zY2FsZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuX3BvcyA9IG5ldyBWZWMyKHRoaXMuX2luaXRQb3MueCp0aGlzLl9zY2FsZSx0aGlzLl9pbml0UG9zLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX3NpemUgPSBuZXcgVmVjMih0aGlzLl9pbml0U2l6ZS54KnRoaXMuX3NjYWxlLHRoaXMuX2luaXRTaXplLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX3Nwci5zZXRQYXJhbSh0aGlzLl9wb3MueCx0aGlzLl9wb3MueSx0aGlzLl9zaXplLngsdGhpcy5fc2l6ZS55LHRoaXMuX2NvbG9yKTtcclxuICAgICAgICB0aGlzLl9zcHIuY2hhbmdlQ29sb3IoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa4suafk+aWh+acrFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0VGV4dCgpOnZvaWR7XHJcbiAgICAgICAgbGV0IHRtcFRleDpMYXlhLlRleHQgPSBuZXcgTGF5YS5UZXh0KCk7XHJcbiAgICAgICAgdG1wVGV4LndpZHRoID0gdGhpcy5fc2l6ZS54O1xyXG4gICAgICAgIHRtcFRleC5oZWlnaHQgPSB0aGlzLl9zaXplLnk7XHJcbiAgICAgICAgdG1wVGV4LnggPSAwO1xyXG4gICAgICAgIHRtcFRleC55ID0gMDtcclxuICAgICAgICB0bXBUZXguZm9udFNpemUgPSA5O1xyXG4gICAgICAgIHRtcFRleC50ZXh0ID0gdGhpcy5fbmFtZTtcclxuICAgICAgICB0bXBUZXguYWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgIHRtcFRleC52YWxpZ24gPSBcIm1pZGRsZVwiO1xyXG4gICAgICAgIHRoaXMuX3Nwci5hZGRDaGlsZCh0bXBUZXgpO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dCBleHRlbmRzIExheWEuVGV4dHtcclxuICAgIHByaXZhdGUgX3N3aXRjaDpib29sZWFuID0gdHJ1ZTsvL+aWh+acrOaYvuekuuW8gOWFsyDpu5jorqTlhbPpl61cclxuICAgIHByaXZhdGUgX3NjYWxlOm51bWJlcjsvL+WFqOWxgOe8qeaUvuavlFxyXG4gICAgcHJpdmF0ZSBfc2l6ZTpWZWMyOy8v6LW35aeL5aSn5bCPXHJcbiAgICBwcml2YXRlIF9wb3M6VmVjMiA9IG5ldyBWZWMyKDAsMCk7Ly/otbflp4vlnZDmoIdcclxuICAgIHByaXZhdGUgX215U3RyaW5nOnN0cmluZzsvL+aWh+acrOWGheWuuVxyXG4gICAgcHJpdmF0ZSBfQVJVc3ltYjpNeVN5bWJvbDsvL+aJgOWcqOWPr+inhuiKgueCuVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5paH5pys5p6E6YCg5ZmoXHJcbiAgICAgKiBAcGFyYW0gc2l6ZSDotbflp4vlpKflsI9cclxuICAgICAqIEBwYXJhbSBzY2FsZSDnvKnmlL7mr5RcclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihzaXplOlZlYzIsIHNjYWxlOm51bWJlcil7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9zaXplID0gc2l6ZTtcclxuICAgICAgICB0aGlzLl9zY2FsZSA9IHNjYWxlO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB0aGlzLl9zaXplLngqdGhpcy5fc2NhbGU7Ly/orqHnrpflj6/op4boioLngrnlrr3luqZcclxuICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuX3NpemUueSp0aGlzLl9zY2FsZTsvL+iuoeeul+WPr+inhuiKgueCuemrmOW6plxyXG4gICAgICAgIHRoaXMuZm9udFNpemUgPSAxMCp0aGlzLl9zY2FsZTsvL+iuoeeul+Wtl+S9k+Wkp+Wwj1xyXG4gICAgICAgIHRoaXMuYWxpZ24gPSBcImNlbnRlclwiOy8v6buY6K6k56uW55u05bGF5LitXHJcbiAgICAgICAgdGhpcy52YWxpZ24gPSBcIm1pZGRsZVwiOy8v6buY6K6k5rC05bmz5bGF5LitXHJcbiAgICAgICAgdGhpcy53b3JkV3JhcCA9IHRydWU7Ly/pu5jorqToh6rliqjmjaLooYzlvIDlkK9cclxuICAgICAgICB0aGlzLmNvbG9yID0gXCIjMDAwMDAwXCI7Ly9cclxuICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5vbihFdmVudENlbnRyZS5FVHlwZS5QRVJGT1JNQU5DRV9SRVNDQUxFKCksdGhpcyx0aGlzLnJlU2NhbGUpOy8v55uR5ZCs5YWo5bGA57yp5pS+5q+UXHJcbiAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2Uub24oRXZlbnRDZW50cmUuRVR5cGUuUEVSRk9STUFOQ0VfVEVYVF9TV0lUQ0goKSx0aGlzLHRoaXMuc3dpdGNoKTsvL+ebkeWQrOWFqOWxgOaWh+acrOaYvuekuuW8gOWFs1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruaJgOWcqOaYvuekuuiKgueCuXN5bWJcclxuICAgICAqIEBwYXJhbSBzeW1iIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U3ltYihzeW1iOk15U3ltYm9sKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX0FSVXN5bWIgPSBzeW1iO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5byA5YWz5paH5pys5pi+56S65byA5YWzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzd2l0Y2goKTp2b2lke1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuX3N3aXRjaCA9PT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLl9zd2l0Y2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VUZXh0KFwiXCIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fc3dpdGNoID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkv67mlLnmlofmnKzmmL7npLrlvIDlhbNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFN3aXRjaE9uKCk6dm9pZHtcclxuICAgICAgICBpZih0aGlzLl9zd2l0Y2ggPT09IHRydWUpe1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZVRleHQodGhpcy5fbXlTdHJpbmcpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlhbPpl63mlofmnKzmmL7npLpcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFN3aXRjaE9mZigpOnZvaWR7XHJcbiAgICAgICAgaWYodGhpcy5fc3dpdGNoKXtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VUZXh0KFwiIFwiKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagueaNrue8qeaUvuavlOS/ruaUueWPr+inhuiKgueCueWkp+Wwj1xyXG4gICAgICogQHBhcmFtIHNjYWxlIOWFqOWxgOe8qeaUvuavlFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlU2NhbGUoc2NhbGU6bnVtYmVyKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3NjYWxlID0gc2NhbGU7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuX3NpemUueCp0aGlzLl9zY2FsZTtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuX3NpemUueSp0aGlzLl9zY2FsZTtcclxuICAgICAgICB0aGlzLnggPSB0aGlzLl9wb3MueCp0aGlzLl9zY2FsZTtcclxuICAgICAgICB0aGlzLnkgPSB0aGlzLl9wb3MueSp0aGlzLl9zY2FsZTtcclxuICAgICAgICB0aGlzLmZvbnRTaXplID0gMTAqdGhpcy5fc2NhbGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7mlofmnKxcclxuICAgICAqIEBwYXJhbSB0ZXh0IFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0VGV4dCh0ZXh0OnN0cmluZyk6dm9pZHtcclxuICAgICAgICB0aGlzLl9teVN0cmluZyA9IHRleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkv67mlLnmlofmnKzotbflp4vlnZDmoIfvvIjkuI3lj5flhajlsYDnvKnmlL7mr5TlvbHlk43vvIlcclxuICAgICAqIEBwYXJhbSBwb3Mg6LW35aeL5Z2Q5qCHXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRQb3MocG9zOlZlYzIgPSBuZXcgVmVjMigwLDApKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3BvcyA9IHBvcztcclxuICAgICAgICB0aGlzLnggPSB0aGlzLl9wb3MueCp0aGlzLl9zY2FsZTtcclxuICAgICAgICB0aGlzLnkgPSB0aGlzLl9wb3MueSp0aGlzLl9zY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmYu+atoum8oOagh+S6i+S7tuepv+mAj1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb2ZmU3dpdGNoKCk6dm9pZHtcclxuICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5vZmYoRXZlbnRDZW50cmUuRVR5cGUuUEVSRk9STUFOQ0VfUkVTQ0FMRSgpLHRoaXMsdGhpcy5yZVNjYWxlKTtcclxuICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5vZmYoRXZlbnRDZW50cmUuRVR5cGUuUEVSRk9STUFOQ0VfVEVYVF9TV0lUQ0goKSx0aGlzLHRoaXMuc3dpdGNoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS/ruaUueWtl+S9k+Wkp+Wwj1xyXG4gICAgICogQHBhcmFtIHZhbHVlIOi+k+WFpeWkp+Wwj1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0Rm9udFNpemUodmFsdWU6bnVtYmVyKTp2b2lke1xyXG4gICAgICAgIHRoaXMuZm9udFNpemUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnRleHQgPSB0aGlzLl9teVN0cmluZztcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiIsIi8vYXV0aG9yIE5hMkN1QzRPOFxyXG5cclxuaW1wb3J0IEN1c3RvbWl6ZWRTcHJpdGUgZnJvbSBcIi4vY3VzdG9taXplZFNwclwiO1xyXG5pbXBvcnQgeyBDaGVzc0JvYXJkIH0gZnJvbSBcIi4vVW5zeW1ib2xpemVkUmVuZGVyXCI7XHJcbmltcG9ydCBBY3RvclJVIGZyb20gXCIuL1N5bWJvbGl6ZWRSZW5kZXJcIjtcclxuaW1wb3J0IHsgQWN0b3JCb3ggfSBmcm9tIFwiLi9vYmpib3hcIjtcclxuaW1wb3J0IHsgVmVjMiB9IGZyb20gXCIuLi8uLi9Eb2RNYXRoXCI7XHJcbmltcG9ydCB7IFN5bWJvbGl6ZWQgfSBmcm9tIFwiLi4vLi4vLi4vRml4L0ZpeFN5bWJvbFwiO1xyXG5pbXBvcnQgeyBFdmVudENlbnRyZSB9IGZyb20gXCIuLi8uLi8uLi9FdmVudC9FdmVudENlbnRyZVwiO1xyXG5pbXBvcnQgeyBSZW5kZXJlciB9IGZyb20gXCIuLi8uLi9SZW5kZXJlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGVyZm9ybWFuY2VDZW50cmUgaW1wbGVtZW50cyBSZW5kZXJlcntcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGluc3RhbmNlOlBlcmZvcm1hbmNlQ2VudHJlOy8v5Y2V5L6L77yI6K+35LiN6KaB5omL5Yqo5paw5bu65Y2V5L6L77yJXHJcbiAgICBwdWJsaWMgbWFpblNwcjpDdXN0b21pemVkU3ByaXRlOy8v6buY6K6k57uY5Zu+6IqC54K577yI56aB5q2i5Zyo6K+l6IqC54K55LiK57uY5Zu+77yM5Y+q6IO955So5LqO5re75Yqg5a2Q6IqC54K577yJXHJcbiAgICBwcml2YXRlIGNoZXNzQm9hcmQ6Q2hlc3NCb2FyZDsvL+m7mOiupOaji+ebmFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW5riy5p+T5Li75Zy65pmv77yM5Yid5aeL5YyW5LqL5Lu255uR5ZCs57G7XHJcbiAgICAgKiBAcGFyYW0gc2NlbmUg5ri45oiP5Li75Zy65pmvXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZSAoc2NlbmU6TGF5YS5TcHJpdGUpOnZvaWR7XHJcbiAgICAgICAgUGVyZm9ybWFuY2VDZW50cmUuaW5zdGFuY2UgPSBuZXcgUGVyZm9ybWFuY2VDZW50cmUoKTsvL+WKoOi9vemdmeaAgeexu1xyXG4gICAgICAgIFBlcmZvcm1hbmNlQ2VudHJlLmluc3RhbmNlLm1haW5TcHIgPSBuZXcgQ3VzdG9taXplZFNwcml0ZSgpOy8v5bu656uL5Li757uY5Zu+6IqC54K5XHJcbiAgICAgICAgLy/or6Xnu5jlm77oioLngrnkuI3nlKjkuo7nu5jliLbku7vkvZXlm77lvaLvvIzku4XnlKjkuo7mt7vliqDlrZDoioLngrlcclxuICAgICAgICBzY2VuZS5hZGRDaGlsZChQZXJmb3JtYW5jZUNlbnRyZS5pbnN0YW5jZS5tYWluU3ByKTsvL+WwhuS4u+e7mOWbvuiKgueCuea3u+WKoOS4uuS4u+WcuuaZr+WtkOiKgueCuVxyXG4gICAgICAgIEV2ZW50Q2VudHJlLmluaXQoKTsvL+WIneWni+WMluinguWvn+iAhVxyXG4gICAgICAgIFBlcmZvcm1hbmNlQ2VudHJlLmluaXRpYWxpemUgPSAoKSA9PiB7fTsvL+a4heepuuS4u+WcuuaZr+WIneWni+WMluWHveaVsFxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiTWFpbiBTY2VuZSBJbml0aWFsaXphdGlvbiBDb21wbGV0ZSEhXCIpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa4suafk+aji+ebmFxyXG4gICAgICogQHBhcmFtIGFyciDnlKjkuo7nlJ/miJDmo4vnm5jnmoTkuoznu7TmlbDnu4RcclxuICAgICAqIEBwYXJhbSBwb3NWZWMyIOaji+ebmOi1t+Wni+WdkOagh++8iOS4gOW+i+aMieWFqOWxgOe8qeaUvuavlOS4ujHorqHnrpfvvIzmuLLmn5PlmajkvJrmoLnmja7lhajlsYDnvKnmlL7mr5Toh6rliqjlrozmiJDnvKnmlL7muLLmn5PvvIlcclxuICAgICAqIEBwYXJhbSB1bml0c2l6ZSDljZXkvY3moLzlrZDlrr3pq5jvvIjkuIDlvovmjInlhajlsYDnvKnmlL7mr5TkuLox6K6h566X77yM5riy5p+T5Zmo5Lya5qC55o2u5YWo5bGA57yp5pS+5q+U6Ieq5Yqo5a6M5oiQ57yp5pS+5riy5p+T77yJXHJcbiAgICAgKiBAcGFyYW0gYmFja0dyb3VuZENvbG9yIOaji+ebmOiDjOaZr+minOiJslxyXG4gICAgICogQHBhcmFtIGZyb250Q29sb3Ig5qC85a2Q6aKc6ImyXHJcbiAgICAgKiBAcGFyYW0gZmF0aGVyIOeItue7mOWbvuiKgueCue+8iOm7mOiupOS4uuWFqOWxgOe7mOWbvuiKgueCue+8iVxyXG4gICAgICogQHBhcmFtIHNjYWxlIOe8qeaUvuavlO+8iOm7mOiupOS4ujHvvIlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGluaXRCb2FyZChhcnI6IG51bWJlcltdW10sIHBvc1ZlYzI6IFZlYzIsIHVuaXRzaXplOiBWZWMyLCBiYWNrR3JvdW5kQ29sb3I6IHN0cmluZywgZnJvbnRDb2xvcjogc3RyaW5nLCBzY2FsZTogbnVtYmVyID0gMSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2hlc3NCb2FyZCA9IG5ldyBDaGVzc0JvYXJkKGFycixwb3NWZWMyLHVuaXRzaXplLGJhY2tHcm91bmRDb2xvcixmcm9udENvbG9yLHNjYWxlKTsvL+aWsOW7uuaji+ebmFxyXG4gICAgICAgIFBlcmZvcm1hbmNlQ2VudHJlLmluc3RhbmNlLm1haW5TcHIuYWRkQ2hpbGQodGhpcy5jaGVzc0JvYXJkKTsvL+a3u+WKoOWtkOiKgueCuVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6LCD6IqC5YWo5bGA57yp5pS+5q+U77yM5Y+q6IO95L2c55So5LqO5omA5pyJYWN0b3LmuLLmn5PlrozmiJDlkI7jgIHmiYDmnInnibnmlYjluKflvqrnjq/miafooYzliY3vvIzlkKbliJnmnInpnZ7oh7Tlkb3mgKdidWdcclxuICAgICAqIEBwYXJhbSB2YWx1ZSDlhajlsYDlj6/op4boioLngrnnvKnmlL7mr5RcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlc2NhbGUodmFsdWU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLmV2ZW50KFwiUkVTQ0FMRVwiLFt2YWx1ZV0pOy8v5Y+R5biD6LCD5Y+C5LqL5Lu244CB57yp5pS+5q+U5Y+C5pWwXHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOa4suafk2FjdG9y5a+56LGhXHJcbiAgICAgKiBAcGFyYW0gYm91bmQgYWN0b3JcclxuICAgICAqIEBwYXJhbSBwb3Mg5Z2Q5qCH77yI5LiA5b6L5oyJ5YWo5bGA57yp5pS+5q+U5Li6Meiuoeeul++8jOa4suafk+WZqOS8muagueaNruWFqOWxgOe8qeaUvuavlOiHquWKqOWujOaIkOe8qeaUvua4suafk++8iVxyXG4gICAgICogQHBhcmFtIHNpeiDlrr3pq5jvvIjpu5jorqQxMCwxMO+8ie+8iOS4gOW+i+aMieWFqOWxgOe8qeaUvuavlOS4ujHorqHnrpfvvIzmuLLmn5PlmajkvJrmoLnmja7lhajlsYDnvKnmlL7mr5Toh6rliqjlrozmiJDnvKnmlL7muLLmn5PvvIlcclxuICAgICAqIEBwYXJhbSBmYXRoZXIg54i257uY5Zu+6IqC54K577yI6buY6K6k5Li65qOL55uY57uY5Zu+6IqC54K577yJXHJcbiAgICAgKiBAcGFyYW0gY29sb3Ig6aKc6Imy77yI6buY6K6k5Li657u/77yJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXNwbGF5QWN0b3IoYm91bmQ6IFN5bWJvbGl6ZWQsIHBvczogVmVjMiwgc2l6OlZlYzIgPSBuZXcgVmVjMigxMCwxMCksIGNvbG9yOnN0cmluZyA9IFwiIzAwZmYwMFwiLCBmYXRoZXI6Q3VzdG9taXplZFNwcml0ZSA9IFBlcmZvcm1hbmNlQ2VudHJlLmluc3RhbmNlLmNoZXNzQm9hcmQpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdG1wQWN0b3I6QWN0b3JSVSA9IG5ldyBBY3RvclJVKGJvdW5kLnN5bWJvbCxwb3Msc2l6LGZhdGhlcixjb2xvcik7Ly/muLLmn5NhY3RvclxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoC/kv67mlLnov5vluqbmnaFcclxuICAgICAqIOm7mOiupOi/m+W6puadoemVvzMw77yM5a69Ne+8iOm7mOiupOi/m+W6puadoeWuvemrmOaXoOazlemAmui/h+acrOWHveaVsOS/ruaUue+8jOWmgumcgOS/ruaUueivt+WJjeW+gCAuXFxSaG9kZSBJc2xhbmRcXHNyY1xcUmhvZGVzX0dhbWVcXFBlcmZvcm1hbmNlX01vZHVsZVxcU3ltYm9saXplZFJlbmRlci50c1xcQWN0b3JSVSlcclxuICAgICAqIOi/m+W6puminOiJsuS4uueBsO+8jOWmgumcgOS/ruaUueivt+WJjeW+gCAuXFxSaG9kZSBJc2xhbmRcXHNyY1xcUmhvZGVzX0dhbWVcXFBlcmZvcm1hbmNlX01vZHVsZVxcQWN0b3JDb21wb25lbnQudHNcXEJhclxyXG4gICAgICogQHBhcmFtIGJvdW5kIGFjdG9yXHJcbiAgICAgKiBAcGFyYW0gYmFyX3N5bWJOdW0g56ys5Yeg5qC56L+b5bqm5p2h77yI5aeL5LqOMO+8iSBcclxuICAgICAqIEBwYXJhbSBwZXJjZW50YWdlIOivpei/m+W6puadoei/m+W6plxyXG4gICAgICogQHBhcmFtIGNvbG9yIOivpei/m+W6puadoeiDjOaZr+minOiJslxyXG4gICAgICogQHBhcmFtIHgg6L+b5bqm5p2h6ZW/5bqm77yI5LiA5b6L5oyJ5YWo5bGA57yp5pS+5q+U5Li6Meiuoeeul++8jOa4suafk+WZqOS8muagueaNruWFqOWxgOe8qeaUvuavlOiHquWKqOWujOaIkOe8qeaUvua4suafk++8iVxyXG4gICAgICogQHBhcmFtIHkg6L+b5bqm5p2h6auY5bqm77yI5LiA5b6L5oyJ5YWo5bGA57yp5pS+5q+U5Li6Meiuoeeul++8jOa4suafk+WZqOS8muagueaNruWFqOWxgOe8qeaUvuavlOiHquWKqOWujOaIkOe8qeaUvua4suafk++8iVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZWRpdEJhcihib3VuZDogU3ltYm9saXplZCwgYmFyX3N5bWJOdW06bnVtYmVyID0gMCwgcGVyY2VudGFnZTogbnVtYmVyID0gMSwgY29sb3I6IHN0cmluZyA9IFwiIzAwZmYwMFwiLCB4PzpudW1iZXIsIHk/Om51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGxldCB0bXBBY3RvcjpBY3RvclJVID0gQWN0b3JCb3guZ2V0KGJvdW5kLnN5bWJvbC5kYXRhKTsvL+iOt+WPluW3sua4suafk+eahGFjdG9yUlXlr7nosaFcclxuICAgICAgICBpZih0bXBBY3Rvci5nZXRCYXIoYmFyX3N5bWJOdW0pID09PSAgdW5kZWZpbmVkKXsvL+WmguaenOWvueW6lOi/m+W6puadoeS4jeWtmOWcqFxyXG4gICAgICAgICAgICB0bXBBY3Rvci5hZGRFeHRCYXIoY29sb3IsYmFyX3N5bWJOdW0scGVyY2VudGFnZSx4LHkpOy8v5qC55o2u6L6T5YWl5Y+C5pWw5paw5bu66L+b5bqm5p2hXHJcblxyXG4gICAgICAgIH1lbHNley8v5aaC5a+55bqU6L+b5bqm5p2h5bey5a2Y5ZyoXHJcbiAgICAgICAgICAgIHRtcEFjdG9yLmVkaXRCYXIoYmFyX3N5bWJOdW0scGVyY2VudGFnZSk7Ly/kv67mlLnor6Xov5vluqbmnaHnmb7liIbmr5RcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+R5biD5pS75Ye75LqL5Lu2XHJcbiAgICAgKiDmraTmlrnms5XosIPnlKjlkI7or7fli7/kv67mlLnlhajlsYDnvKnmlL7mr5TvvIHvvIFcclxuICAgICAqIEBwYXJhbSBmcm9tIOWPkeWKqOaUu+WHu+iKgueCuVxyXG4gICAgICogQHBhcmFtIHRvIOmBreWPl+aJk+WHu+iKgueCuVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVmYXVsdEF0a0VmZmVjdChmcm9tOiBTeW1ib2xpemVkLCB0bzogU3ltYm9saXplZCk6IHZvaWQge1xyXG4gICAgICAgIC8v5omT5Ye75LqL5Lu244CB5Y+R5Yqo5pS75Ye76IqC54K55ZKM6YGt5Y+X5pS75Ye76IqC54K55Y+C5pWwXHJcbiAgICAgICAgQWN0b3JCb3guZ2V0KGZyb20uc3ltYm9sLmRhdGEpLmhpdCh0byk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5HluIPlj5fkvKTkuovku7ZcclxuICAgICAqIOatpOaWueazleiwg+eUqOWQjuivt+WLv+S/ruaUueWFqOWxgOe8qeaUvuavlO+8ge+8gVxyXG4gICAgICogQHBhcmFtIGJvdW5kIOWPl+S8pOiKgueCuVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVmYXVsdERtZ0VmZmVjdChib3VuZDogU3ltYm9saXplZCk6IHZvaWQge1xyXG4gICAgICAgIC8v5Y+X5Lyk5LqL5Lu25ZKM5Y+X5Lyk6IqC54K55Y+C5pWwXHJcbiAgICAgICAgQWN0b3JCb3guZ2V0KGJvdW5kLnN5bWJvbC5kYXRhKS5kYW1hZ2UoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDplIDmr4Hlr7nosaHvvIjpu5jorqTplIDmr4HvvIlcclxuICAgICAqIEBwYXJhbSBib3VuZCDlr7nosaFcclxuICAgICAqIEBwYXJhbSBwb3Mg5Z2Q5qCH77yI5LiA5b6L5oyJ5YWo5bGA57yp5pS+5q+U5Li6Meiuoeeul++8jOa4suafk+WZqOS8muagueaNruWFqOWxgOe8qeaUvuavlOiHquWKqOWujOaIkOe8qeaUvua4suafk++8iVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGlzdHJveUFjdG9yKGJvdW5kOiBTeW1ib2xpemVkLCBwb3M/OiBWZWMyKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHRtcEFjdG9yOkFjdG9yUlUgPSBBY3RvckJveC5nZXQoYm91bmQuc3ltYm9sLmRhdGEpOy8v6I635Y+WYWN0b3JSVeWvueixoVxyXG4gICAgICAgIGlmKHBvcyA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdG1wQWN0b3IuZGVzdG9yeSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihwb3MuZXF1YWxzKHRtcEFjdG9yLmdldFBvc1ZlYygpKSl7XHJcbiAgICAgICAgICAgIHRtcEFjdG9yLmRlc3RvcnkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/plIDmr4FhY3RvclJV5a+56LGhXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlnKhhY3Rvcui6q+S4iua4suafk+aWh+acrFxyXG4gICAgICog5LuF5b2T5YWo5bGA5paH5pys5pi+56S65byA5YWzc3dpdGNoSG92ZXJUZXh077yI77yJ5byA5ZCv5pe25omN5Lya5riy5p+T5paH5pys77yM5byA5YWz6buY6K6k5YWz6ZetXHJcbiAgICAgKiBAcGFyYW0gYm91bmQgYWN0b3JcclxuICAgICAqIEBwYXJhbSBjb250ZW50IOaWh+acrFxyXG4gICAgICogQHBhcmFtIHBvcyDmlofmnKzotbflp4vlnZDmoIfvvIjkuIDlvovmjInlhajlsYDnvKnmlL7mr5TkuLox6K6h566X77yM5riy5p+T5Zmo5Lya5qC55o2u5YWo5bGA57yp5pS+5q+U6Ieq5Yqo5a6M5oiQ57yp5pS+5riy5p+T77yJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB3cml0ZShib3VuZDogU3ltYm9saXplZCwgY29udGVudDogc3RyaW5nLCBwb3M/OiBWZWMyKTogdm9pZCB7XHJcbiAgICAgICAgQWN0b3JCb3guZ2V0KGJvdW5kLnN5bWJvbC5kYXRhKS5nZXRUZXh0KCkuc2V0VGV4dChjb250ZW50KTsvL+S/ruaUuUFjdG9yUlXmlofmnKxcclxuICAgICAgICBBY3RvckJveC5nZXQoYm91bmQuc3ltYm9sLmRhdGEpLmdldFRleHQoKS5zZXRQb3MocG9zKTsvL+S/ruaUueivpeaWh+acrOS9jee9rlxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YWo5bGA5paH5pys5pi+56S65byA5YWz77yI6buY6K6k5YWz6Zet77yJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzd2l0Y2hIb3ZlclRleHQoKTogdm9pZCB7XHJcbiAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2UuZXZlbnQoRXZlbnRDZW50cmUuRVR5cGUuUEVSRk9STUFOQ0VfVEVYVF9TV0lUQ0goKSk7Ly/lj5HluIPmlofmnKzlvIDlhbPkuovku7bvvIzmjInpkq7mlofmnKzkuI3lj5flvbHlk41cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOenu+WKqGFjdG9y5a+56LGhXHJcbiAgICAgKiBAcGFyYW0gYm91bmQgYWN0b3JcclxuICAgICAqIEBwYXJhbSBwb3Mg55uu5qCH5Z2Q5qCH77yI5LiA5b6L5oyJ5YWo5bGA57yp5pS+5q+U5Li6Meiuoeeul++8jOa4suafk+WZqOS8muagueaNruWFqOWxgOe8qeaUvuavlOiHquWKqOWujOaIkOe8qeaUvua4suafk++8iVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbW92ZShib3VuZDogU3ltYm9saXplZCwgcG9zOiBWZWMyKTogdm9pZCB7XHJcbiAgICAgICAgQWN0b3JCb3guZ2V0KGJvdW5kLnN5bWJvbC5kYXRhKS5yZWxvY2F0ZShwb3MpOy8v56e75YqoQWN0b3JSVeWvueixoeWdkOagh1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlnKhhY3Rvcui6q+S4iua3u+WKoOaMiemSrlxyXG4gICAgICog5q+P5LiqYWN0b3JSVem7mOiupOWtmOWcqDLkuKrmjInpkq7vvIjngrnlh7thY3RvclJV6IqC54K55Y2z5Y+v5pi+56S677yJ77yM5a+55bqU5pKk6YCA5ZKM5oqA6IO944CC6K+l5oyJ6ZKu5Z2Q5qCH44CB5a696auY44CB6aKc6Imy44CB5ZCN5a2X5LiN5Y+v5L+u5pS577yM5Yqf6IO96ZyA5LuO5aSW6YOo5re75YqgXHJcbiAgICAgKiBAcGFyYW0gYm91bmQgYWN0b3JcclxuICAgICAqIEBwYXJhbSBudW0g5oyJ6ZKu57yW5Y+377yIMCwx5Li66buY6K6k5oyJ6ZKu77yM6buY6K6k5oyJ6ZKu5LiN6Ieq5bim5Lu75L2V5Yqf6IO977yM6ZyA5omL5Yqo5re75Yqg77yJXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sg54K55Ye75oyJ6ZKu5ZCO6LCD55So55qE5Ye95pWwXHJcbiAgICAgKiBAcGFyYW0gdGV4dCDmmL7npLrlnKjmjInpkq7kuIrnmoTmlofmnKzvvIjpu5jorqTmmL7npLrkuJTml6Dms5Xkv67mlLnvvIlcclxuICAgICAqIEBwYXJhbSBwb3Mg5oyJ6ZKu6LW35aeL5Z2Q5qCH77yI5LiA5b6L5oyJ5YWo5bGA57yp5pS+5q+U5Li6Meiuoeeul++8jOa4suafk+WZqOS8muagueaNruWFqOWxgOe8qeaUvuavlOiHquWKqOWujOaIkOe8qeaUvua4suafk++8iVxyXG4gICAgICogQHBhcmFtIHNpemUg5oyJ6ZKu5aSn5bCP77yI5LiA5b6L5oyJ5YWo5bGA57yp5pS+5q+U5Li6Meiuoeeul++8jOa4suafk+WZqOS8muagueaNruWFqOWxgOe8qeaUvuavlOiHquWKqOWujOaIkOe8qeaUvua4suafk++8iVxyXG4gICAgICogQHBhcmFtIGNvbG9yIOaMiemSruminOiJslxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXR0YWNoQnV0dG9uKGJvdW5kOiBTeW1ib2xpemVkLG51bTpudW1iZXIsIGNhbGxiYWNrOiBGdW5jdGlvbiwgdGV4dD86IHN0cmluZywgcG9zPzogVmVjMiwgc2l6ZT86IFZlYzIsIGNvbG9yPzogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHRtcEFjdDpBY3RvclJVID0gQWN0b3JCb3guZ2V0KGJvdW5kLnN5bWJvbC5kYXRhKTsvL+iOt+WPlkFjdG9yUlXlr7nosaFcclxuICAgICAgICBpZih0bXBBY3QuZ2V0QnV0dG9uKG51bSkgPT09IHVuZGVmaW5lZCl7Ly/lpoLmnpzlr7nlupTmjInpkq7kuI3lrZjlnKhcclxuICAgICAgICAgICAgaWYocG9zID09PSB1bmRlZmluZWQpey8v5aaC5p6c5LiN6L6T5YWl5oyH5a6a5Z2Q5qCHXHJcbiAgICAgICAgICAgICAgICB0bXBBY3QuYWRkRXh0cmFCdXR0b25zQXREZWZMb2NhdGlvbih0ZXh0LG51bSxjb2xvcixjYWxsYmFjayk7Ly/lnKjpu5jorqTkvY3nva7mlrDlu7rmjInpkq5cclxuICAgICAgICAgICAgfWVsc2V7Ly/lpoLmnpzovpPlhaXmjIflrprlnZDmoIdcclxuICAgICAgICAgICAgICAgIHRtcEFjdC5hZGRFeHRyYUJ1dHRvbkF0Tm9EZWZMb2NhdGlvbih0ZXh0LG51bSxjYWxsYmFjayxwb3Msc2l6ZSxjb2xvcik7Ly/lnKjmjIflrprkvY3nva7mlrDlu7rmjInpkq5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNley8v5aaC5p6c5a+55bqU5oyJ6ZKu5a2Y5ZyoXHJcbiAgICAgICAgICAgIHRtcEFjdC5nZXRCdXR0b24obnVtKS5zZXRGdW5jKGNhbGxiYWNrKTsvL+i+k+WFpeWKn+iDveWHveaVsFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iLCIvL2F1dGhvciBOYTJDdUM0TzhcclxuXHJcbmltcG9ydCBDdXN0b21pemVkU3ByaXRlIGZyb20gXCIuL2N1c3RvbWl6ZWRTcHJcIjtcclxuaW1wb3J0IHsgQWN0b3JCb3ggfSBmcm9tIFwiLi9vYmpib3hcIjtcclxuaW1wb3J0IHsgQmFyLCBCdXR0b24gLCBUZXh0IH0gZnJvbSBcIi4vQWN0b3JDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTXlTeW1ib2wsIFN5bWJvbGl6ZWQgfSBmcm9tIFwiLi4vLi4vLi4vRml4L0ZpeFN5bWJvbFwiO1xyXG5pbXBvcnQgeyBWZWMyIH0gZnJvbSBcIi4uLy4uL0RvZE1hdGhcIjtcclxuaW1wb3J0IHsgS1ZQYWlyIH0gZnJvbSBcIi4uLy4uL0RvZERhdGFTdHJ1Y3R1cmVcIjtcclxuaW1wb3J0IHsgRXZlbnRDZW50cmUgfSBmcm9tIFwiLi4vLi4vLi4vRXZlbnQvRXZlbnRDZW50cmVcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3RvclJVe1xyXG4gICAgcHJpdmF0ZSBfaW5pdFBvczpWZWMyOy8vYWN0b3Lotbflp4vlnZDmoIdcclxuICAgIHByaXZhdGUgX2luaXRTaXplOlZlYzI7Ly9hY3Rvcui1t+Wni+Wkp+Wwj1xyXG4gICAgcHJpdmF0ZSBfaW5pdEJhckhlaWdodDpudW1iZXIgPSAwOy8v6L+b5bqm5p2h5YW25a6e6auY5bqm5pqC5a2Y5ZmoXHJcbiAgICBwcml2YXRlIF9wb3M6VmVjMjsvL+agueaNruWFqOWxgOe8qeaUvuavlOaNoueul+WQjueahOWPr+ingeWdkOagh1xyXG4gICAgcHJpdmF0ZSBfc2l6ZTpWZWMyOy8v5qC55o2u5YWo5bGA57yp5pS+5q+U5o2i566X5ZCO55qE5Y+v6KeB5aSn5bCPXHJcbiAgICBwcml2YXRlIF9zY2FsZTpudW1iZXIgPSAxOy8v5YWo5bGA57yp5pS+5q+UXHJcbiAgICBwcml2YXRlIF9zeW1iOk15U3ltYm9sOy8vc3ltYlxyXG4gICAgcHJpdmF0ZSBfZmF0aGVyOkN1c3RvbWl6ZWRTcHJpdGU7Ly/niLbnu5jlm77oioLngrlcclxuICAgIHByaXZhdGUgX3NwcjpDdXN0b21pemVkU3ByaXRlOy8v5pys57uY5Zu+6IqC54K5XHJcbiAgICBwcml2YXRlIF9iYXJQYWlyOktWUGFpcjxCYXI+ID0gbmV3IEtWUGFpcjxCYXI+KCk7Ly/ov5vluqbmnaHplK7lgLznu4RcclxuICAgIHByaXZhdGUgX3RleHQ6VGV4dDsvL+m7mOiupOaWh+acrFxyXG4gICAgcHJpdmF0ZSBfZGVmQnV0dG9uU2hvd2VkOmJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuaYvuekuum7mOiupOaMiemSru+8jOm7mOiupOS4uuWQplxyXG4gICAgcHJpdmF0ZSBfYnV0dG9uUGFpcjpLVlBhaXI8QnV0dG9uPiA9IG5ldyBLVlBhaXI8QnV0dG9uPigpO1xyXG4gICAgcHJpdmF0ZSBfYnV0dG9uSGVpZ2h0Om51bWJlcjsvL+aMiemSrumrmOW6puaaguWtmOWZqFxyXG4gICAgcHJpdmF0ZSBfZGFtYWdlOkN1c3RvbWl6ZWRTcHJpdGU7Ly/lj5fkvKTnibnmlYjmmL7npLroioLngrlcclxuICAgIHByaXZhdGUgX3RyYW5zcGFyZW5jeTpudW1iZXIgPSAxOy8v5Y+X5Lyk54m55pWI5Y+C5pWw5pqC5a2Y5ZmoXHJcbiAgICBwcml2YXRlIF9maXN0OkN1c3RvbWl6ZWRTcHJpdGU7Ly/mlLvlh7vnibnmlYjmmL7npLroioLngrlcclxuICAgIHByaXZhdGUgX21vdmVQZXJjZW50YWdlOm51bWJlciA9IDA7Ly/mlLvlh7vnibnmlYjlj4LmlbDmmoLlrZjlmahcclxuICAgIHB1YmxpYyBfY2VudGVyUG9zOlZlYzI7Ly/kuK3lv4PlnZDmoIdcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXJVbml05p6E6YCg5ZmoXHJcbiAgICAgKiBAcGFyYW0gc3ltYiBzeW1iXHJcbiAgICAgKiBAcGFyYW0gcG9zIOi1t+Wni+WdkOagh1xyXG4gICAgICogQHBhcmFtIHNpemUg5a696auYXHJcbiAgICAgKiBAcGFyYW0gZmF0aGVyIOeItue7mOWbvuiKgueCuVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihzeW1iOk15U3ltYm9sLCBwb3M6VmVjMiwgc2l6ZTpWZWMyLCBmYXRoZXI6Q3VzdG9taXplZFNwcml0ZSwgY29sb3I6c3RyaW5nID0gXCIjMDBmZmZmXCIsIHNjYWxlOm51bWJlciA9IDEpe1xyXG4gICAgICAgIHRoaXMuX2ZhdGhlciA9IGZhdGhlcjsvL+eItue7mOWbvuiKgueCuVxyXG4gICAgICAgIHRoaXMuX2luaXRQb3MgPSBwb3M7Ly/otbflp4vlnZDmoIdcclxuICAgICAgICB0aGlzLl9pbml0U2l6ZSA9IHNpemU7Ly/otbflp4vlrr3pq5hcclxuICAgICAgICB0aGlzLl9zcHIgPSBuZXcgQ3VzdG9taXplZFNwcml0ZSgpOy8v5paw5bu657uY5Zu+6IqC54K5XHJcbiAgICAgICAgdGhpcy5fZmF0aGVyLmFkZENoaWxkKHRoaXMuX3Nwcik7Ly/mt7vliqDlrZDoioLngrlcclxuICAgICAgICB0aGlzLnNldERhdGEoc3ltYixuZXcgVmVjMih0aGlzLl9pbml0UG9zLngqdGhpcy5fc2NhbGUsdGhpcy5faW5pdFBvcy55KnRoaXMuX3NjYWxlKSxuZXcgVmVjMih0aGlzLl9pbml0U2l6ZS54KnRoaXMuX3NjYWxlLCB0aGlzLl9pbml0U2l6ZS55KnRoaXMuX3NjYWxlKSxjb2xvcik7Ly/orr7nva7nu5jlm77oioLngrnlj4LmlbBcclxuICAgICAgICBBY3RvckJveC5hZGQodGhpcyx0aGlzLl9zeW1iKTsvL+WwhuacrOWvueixoea3u+WKoOWIsOmUruWAvOWvuVxyXG4gICAgICAgIHRoaXMuYWRkRGVmQmFyKCk7Ly/mt7vliqDpu5jorqTov5vluqbmnaFcclxuICAgICAgICB0aGlzLl90ZXh0ID0gbmV3IFRleHQodGhpcy5faW5pdFNpemUsdGhpcy5fc2NhbGUpOy8v5re75Yqg6buY6K6k5paH5pysXHJcbiAgICAgICAgdGhpcy5fdGV4dC5zZXRTeW1iKHRoaXMuX3N5bWIpOy8vXHJcbiAgICAgICAgdGhpcy5fYnV0dG9uSGVpZ2h0ID0gdGhpcy5faW5pdFNpemUueTsvL1xyXG4gICAgICAgIHRoaXMuX3Nwci5hZGRDaGlsZCh0aGlzLl90ZXh0KTsvL+m7mOiupOaWh+acrOe9ruS6juWtkOiKgueCuVxyXG4gICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLm9uKEV2ZW50Q2VudHJlLkVUeXBlLlBFUkZPUk1BTkNFX1JFU0NBTEUoKSx0aGlzLHRoaXMucmVTY2FsZSk7Ly/nm5HlkKzlhajlsYDnvKnmlL7mr5RcclxuICAgICAgICB0aGlzLl9zcHIub24oTGF5YS5FdmVudC5NT1VTRV9PVkVSLHRoaXMsdGhpcy5tb3VzZU92ZXIpOy8vXHJcbiAgICAgICAgdGhpcy5fc3ByLm9uKExheWEuRXZlbnQuTU9VU0VfT1VULHRoaXMsdGhpcy5tb3VzZU91dCk7Ly9cclxuICAgICAgICB0aGlzLl9zcHIub24oTGF5YS5FdmVudC5NT1VTRV9VUCx0aGlzLHRoaXMuc2hvd0RlZmF1bHRCb3R0b25zKTsvL1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZSA9IG5ldyBDdXN0b21pemVkU3ByaXRlKCk7Ly9cclxuICAgICAgICB0aGlzLl9zcHIuYWRkQ2hpbGQodGhpcy5fZGFtYWdlKTsvL1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZS5zZXRQYXJhbSgwLDAsdGhpcy5fc2l6ZS54LHRoaXMuX3NpemUueSxcIiNmOTE1MjZcIik7Ly9cclxuICAgICAgICB0aGlzLl9kYW1hZ2UubG9jYXRpb25BbmRTaXplKCk7Ly9cclxuICAgICAgICB0aGlzLmFkZERlZkJ1dHRvbnMoKTsvL1xyXG4gICAgICAgIHRoaXMuX2Zpc3QgPSBuZXcgQ3VzdG9taXplZFNwcml0ZSgpOy8vXHJcbiAgICAgICAgdGhpcy5fZmlzdC5zZXRQYXJhbSh0aGlzLl9jZW50ZXJQb3MueCx0aGlzLl9jZW50ZXJQb3MueSwxNiwxNixcIiNGM0MyNDZcIik7Ly9cclxuICAgICAgICB0aGlzLl9maXN0LmxvY2F0aW9uQW5kU2l6ZSgpOy8vXHJcbiAgICAgICAgdGhpcy5fZmlzdC56T3JkZXIgPSAyOy8vXHJcbiAgICAgICAgdGhpcy5fc3ByLmFkZENoaWxkKHRoaXMuX2Zpc3QpOy8vXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue5b2T5YmN5Y+v6KeG6IqC54K55Z2Q5qCHXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3VyUG9zKCk6VmVjMntcclxuICAgICAgICByZXR1cm4gdGhpcy5fcG9zO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWPkeWKqOaJk+WHu+eJueaViFxyXG4gICAgICogQHBhcmFtIHRvIOaJk+WHu+ebruagh1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaGl0KHRvOlN5bWJvbGl6ZWQpOnZvaWR7XHJcbiAgICAgICAgLy8gdGhpcy5fZmlzdC5ncmFwaGljcy5zYXZlKCk7XHJcbiAgICAgICAgdGhpcy5fZmlzdC5jZW50cmFsU2hpZnRDb2xvcmVkKCk7XHJcbiAgICAgICAgbGV0IHRtcFZlYzpWZWMyID0gbmV3IFZlYzIoQWN0b3JCb3guZ2V0KHRvLnN5bWJvbC5kYXRhKS5jdXJQb3MoKS54LXRoaXMuX3Bvcy54LEFjdG9yQm94LmdldCh0by5zeW1ib2wuZGF0YSkuY3VyUG9zKCkueS10aGlzLl9wb3MueSk7XHJcbiAgICAgICAgbGV0IGZ1bjpGdW5jdGlvbiA9ICh0YXJnZXQ6VmVjMikgPT57XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX21vdmVQZXJjZW50YWdlID4gMSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3ZlUGVyY2VudGFnZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9maXN0LmdyYXBoaWNzLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLl9maXN0LmdyYXBoaWNzLnJlc3RvcmUoKTtcclxuICAgICAgICAgICAgICAgIExheWEudGltZXIuY2xlYXIodGhpcyxmdW4pO1xyXG4gICAgICAgICAgICAgICAgQWN0b3JCb3guZ2V0KHRvLnN5bWJvbC5kYXRhKS5kYW1hZ2UoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBjdXJMb2NhY3Rpb246VmVjMiA9IG5ldyBWZWMyKCAoMTYrIHRhcmdldC54KSp0aGlzLl9tb3ZlUGVyY2VudGFnZSwoMTYrIHRhcmdldC55KSp0aGlzLl9tb3ZlUGVyY2VudGFnZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX21vdmVQZXJjZW50YWdlICs9IDAuMDI7XHJcbiAgICAgICAgICAgIHRoaXMuX2Zpc3QucmVsb2NhdGUoY3VyTG9jYWN0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5fZmlzdC5yb3RhdGlvbiA9IDIwMDAgKiB0aGlzLl9tb3ZlUGVyY2VudGFnZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExheWEudGltZXIubG9vcCgyMCx0aGlzLGZ1bixbdG1wVmVjXSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+R5Yqo5Y+X5Lyk54m55pWIXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkYW1hZ2UoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZS5zZXRQYXJhbSgwLDAsdGhpcy5fc2l6ZS54LHRoaXMuX3NpemUueSk7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlLmxvY2F0aW9uQW5kU2l6ZSgpO1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZS5jaGFuZ2VDb2xvcigpO1xyXG4gICAgICAgIGxldCBmdW46RnVuY3Rpb24gPSAoKT0+e1xyXG4gICAgICAgICAgICBpZih0aGlzLl90cmFuc3BhcmVuY3kgPCAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RhbWFnZS5ncmFwaGljcy5jbGVhcigpOyBcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zcGFyZW5jeSA9IDE7XHJcbiAgICAgICAgICAgICAgICBMYXlhLnRpbWVyLmNsZWFyKHRoaXMsZnVuKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5fdHJhbnNwYXJlbmN5IC09IDAuMDM7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhbWFnZS5hbHBoYSA9IHRoaXMuX3RyYW5zcGFyZW5jeTtcclxuICAgICAgICB9XHJcbiAgICAgICAgTGF5YS50aW1lci5sb29wKDIwLHRoaXMsZnVuKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5riy5p+T6buY6K6k5oyJ6ZKuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2hvd0RlZmF1bHRCb3R0b25zKCk6dm9pZHtcclxuICAgICAgICBpZih0aGlzLl9kZWZCdXR0b25TaG93ZWQgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgdGhpcy5fc3ByLmFkZENoaWxkKHRoaXMuX2J1dHRvblBhaXIucmVhZCgwK1wiXCIpLmdldFNwcigpKTtcclxuICAgICAgICAgICAgdGhpcy5fc3ByLmFkZENoaWxkKHRoaXMuX2J1dHRvblBhaXIucmVhZCgxK1wiXCIpLmdldFNwcigpKTtcclxuICAgICAgICAgICAgdGhpcy5fZGVmQnV0dG9uU2hvd2VkID0gdHJ1ZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fc3ByLnJlbW92ZUNoaWxkKHRoaXMuX2J1dHRvblBhaXIucmVhZCgwK1wiXCIpLmdldFNwcigpKTtcclxuICAgICAgICAgICAgdGhpcy5fc3ByLnJlbW92ZUNoaWxkKHRoaXMuX2J1dHRvblBhaXIucmVhZCgxK1wiXCIpLmdldFNwcigpKTtcclxuICAgICAgICAgICAgdGhpcy5fZGVmQnV0dG9uU2hvd2VkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOWPkeW4g+m8oOagh+i/m+WFpeS6i+S7tlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG1vdXNlT3ZlcigpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fdGV4dC5zZXRTd2l0Y2hPbigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+R5biD6byg5qCH56a75byA5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbW91c2VPdXQoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3RleHQuc2V0U3dpdGNoT2ZmKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDph43orr7nvKnmlL7mr5RcclxuICAgICAqIEBwYXJhbSB2YWx1ZSDmlrDlhajlsYDnvKnmlL7mr5RcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZVNjYWxlKHZhbHVlOm51bWJlcik6dm9pZHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9zY2FsZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh0aGlzLl9zeW1iLHRoaXMuX2luaXRQb3MsdGhpcy5faW5pdFNpemUsdGhpcy5fc3ByLmdldENvbG9yKCkpO1xyXG4gICAgICAgIHRoaXMuc2V0Q29sb3IoKTtcclxuICAgICAgICB0aGlzLl9kYW1hZ2Uuc2V0UGFyYW0oMCwwLHRoaXMuX2luaXRTaXplLngqdGhpcy5fc2NhbGUsdGhpcy5faW5pdFNpemUueSp0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlLmxvY2F0aW9uQW5kU2l6ZSgpO1xyXG4gICAgICAgIFxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruacrEFSVeeahOWQhOmhueWPguaVsFxyXG4gICAgICogQHBhcmFtIHN5bWIgc3ltYlxyXG4gICAgICogQHBhcmFtIHBvcyDotbflp4vlnZDmoIdcclxuICAgICAqIEBwYXJhbSBzaXplIOWkp+Wwj1xyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0RGF0YShzeW1iOk15U3ltYm9sLCBwb3M6VmVjMiwgc2l6ZTpWZWMyLGNvbG9yOnN0cmluZyk6dm9pZHtcclxuICAgICAgICB0aGlzLl9zeW1iID0gc3ltYjtcclxuICAgICAgICB0aGlzLl9wb3MgPSBuZXcgVmVjMihwb3MueCp0aGlzLl9zY2FsZSxwb3MueSp0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fc2l6ZSA9IG5ldyBWZWMyKHNpemUueCp0aGlzLl9zY2FsZSxzaXplLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX3Nwci5zZXRQYXJhbSh0aGlzLl9wb3MueCx0aGlzLl9wb3MueSx0aGlzLl9zaXplLngsdGhpcy5fc2l6ZS55LGNvbG9yKTtcclxuICAgICAgICB0aGlzLnNldENvbG9yKCk7XHJcbiAgICAgICAgdGhpcy5fc3ByLmxvY2F0aW9uQW5kU2l6ZSgpO1xyXG4gICAgICAgIHRoaXMuX2NlbnRlclBvcyA9IG5ldyBWZWMyKHRoaXMuX3NpemUueC8yLHRoaXMuX3NpemUueS8yKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBjb2xvciDorr7nva7popzoibJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldENvbG9yKCk6dm9pZHtcclxuICAgICAgICB0aGlzLl9zcHIuY2hhbmdlQ29sb3IoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBwb3Mg6YeN5paw6K6+572u6LW35aeL5Z2Q5qCH77yI5LiN5Y+X57yp5pS+5q+U5b2x5ZON77yJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWxvY2F0ZShwb3M6VmVjMik6dm9pZHtcclxuICAgICAgICB0aGlzLl9wb3MgPSBuZXcgVmVjMihwb3MueCp0aGlzLl9zY2FsZSxwb3MueSp0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5faW5pdFBvcyA9IHBvcy5jbG9uZSgpO1xyXG4gICAgICAgIHRoaXMuX3Nwci5yZWxvY2F0ZShwb3MpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaRp+avgeacrEFSVVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVzdG9yeSgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fc3ByLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluacrEFSVeeahOi1t+Wni+WdkOagh++8iOS4jeWPl+e8qeaUvuavlOW9seWTje+8iVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0UG9zVmVjKCk6VmVjMntcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5pdFBvcztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bmnKxBUlXnmoTpu5jorqTmlofmnKzlr7nosaFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFRleHQoKTpUZXh0e1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90ZXh0O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoOm7mOiupOi/m+W6puadoVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkRGVmQmFyKCk6dm9pZHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9pbml0QmFySGVpZ2h0ID0gMDtcclxuICAgICAgICBsZXQgdG1wOkJhciA9IG5ldyBCYXIoMCxcIiMwMGZmZmZcIixuZXcgVmVjMigzMCw1KSxuZXcgVmVjMigwLHRoaXMuX2luaXRCYXJIZWlnaHQgLSA2KSx0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fc3ByLmFkZENoaWxkKHRtcC5nZXRCYWNrU3ByKCkpO1xyXG4gICAgICAgIHRoaXMuX2JhclBhaXIuZWRpdChcImJhcl8wXCIsdG1wKTtcclxuICAgICAgICB0aGlzLl9pbml0QmFySGVpZ2h0ID0gdGhpcy5faW5pdEJhckhlaWdodCAtIHRtcC5nZXRIZWlnaHQoKSAtIDE7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bmnKxBUlXnmoTmjIflrprov5vluqbmnaFcclxuICAgICAqIEBwYXJhbSBudW0g6L+b5bqm5p2h5Luj5Y+3XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRCYXIobnVtOm51bWJlcik6QmFye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iYXJQYWlyLnJlYWQoYGJhcl8ke251bX1gKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoOmZhOWKoOi/m+W6puadoVxyXG4gICAgICogQHBhcmFtIGJhY2tHcm91bmRDb2xvciDorr7nva7mlrDlop7ov5vluqbmnaHpopzoibJcclxuICAgICAqIEBwYXJhbSBzeW1iIOiuvue9ruaWsOWinui/m+W6puadoeS7o+WPt1xyXG4gICAgICogQHBhcmFtIHgg5a695bqmXHJcbiAgICAgKiBAcGFyYW0geSDpq5jluqZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZEV4dEJhcihiYWNrR3JvdW5kQ29sb3I6c3RyaW5nLHN5bWI6bnVtYmVyLHBlcmNlbnRhZ2U6bnVtYmVyLHg6bnVtYmVyID0gMzAseTpudW1iZXIgPSA1KTp2b2lke1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB0bXBCYXI6QmFyID0gbmV3IEJhcihzeW1iLGJhY2tHcm91bmRDb2xvcixuZXcgVmVjMih4LHkpLG5ldyBWZWMyKDAsdGhpcy5faW5pdEJhckhlaWdodCAtIHkgLSAxKSx0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fc3ByLmFkZENoaWxkKHRtcEJhci5nZXRCYWNrU3ByKCkpO1xyXG4gICAgICAgIHRoaXMuX2JhclBhaXIuZWRpdChgYmFyXyR7c3ltYn1gLHRtcEJhcik7XHJcbiAgICAgICAgdGhpcy5faW5pdEJhckhlaWdodCA9IHRoaXMuX2luaXRCYXJIZWlnaHQgLSB0bXBCYXIuZ2V0SGVpZ2h0KCkgLSAxO1xyXG4gICAgICAgIHRtcEJhci5wZXJjZW50YWdlID0gcGVyY2VudGFnZTtcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5L+u5pS55bey5pyJ6L+b5bqm5p2hXHJcbiAgICAgKiBAcGFyYW0gc3ltYiDmjIflrprov5vluqbmnaHku6Plj7dcclxuICAgICAqIEBwYXJhbSBwZXJjZW50YWdlIOS/ruaUuei/m+W6puadoei/m+W6plxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZWRpdEJhcihzeW1iOm51bWJlciwgcGVyY2VudGFnZTpudW1iZXIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fYmFyUGFpci5yZWFkKGBiYXJfJHtzeW1ifWApLnBlcmNlbnRhZ2UgPSBwZXJjZW50YWdlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoOm7mOiupOaMiemSrlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZERlZkJ1dHRvbnMoKTp2b2lke1xyXG4gICAgICAgIGxldCB0bXAxOkJ1dHRvbiA9IG5ldyBCdXR0b24odGhpcy5fc3ltYixcIlJldHJlYXRcIiwwLG5ldyBWZWMyKCAtIDIwLHRoaXMuX2luaXRTaXplLnkpLG5ldyBWZWMyKDIwLDE1KSx1bmRlZmluZWQsdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX2J1dHRvblBhaXIuZWRpdChcIjBcIix0bXAxKTtcclxuICAgICAgICBsZXQgdG1wMjpCdXR0b24gPSBuZXcgQnV0dG9uKHRoaXMuX3N5bWIsXCJBY3RpdmF0ZV9Ta2lsbFwiLDAsbmV3IFZlYzIodGhpcy5faW5pdFNpemUueCx0aGlzLl9pbml0U2l6ZS55KSxuZXcgVmVjMigyMCwxNSksdW5kZWZpbmVkLHRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9idXR0b25QYWlyLmVkaXQoXCIxXCIsdG1wMik7XHJcbiAgICAgICAgdGhpcy5fYnV0dG9uSGVpZ2h0ID0gdGhpcy5faW5pdFNpemUueSArIDE2O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWcqOm7mOiupOS9jee9rua3u+WKoOmineWkluaMiemSrlxyXG4gICAgICogQHBhcmFtIG5hbWUgXHJcbiAgICAgKiBAcGFyYW0gbnVtIFxyXG4gICAgICogQHBhcmFtIGNvbG9yIFxyXG4gICAgICogQHBhcmFtIGZ1biBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZEV4dHJhQnV0dG9uc0F0RGVmTG9jYXRpb24obmFtZTpzdHJpbmcsbnVtOm51bWJlciwgY29sb3I/OnN0cmluZywgZnVuPzpGdW5jdGlvbik6dm9pZHtcclxuICAgICAgICBsZXQgdG1wQnV0OkJ1dHRvbiA9IG5ldyBCdXR0b24odGhpcy5fc3ltYixuYW1lLG51bSxuZXcgVmVjMigwLHRoaXMuX2J1dHRvbkhlaWdodCksbmV3IFZlYzIoMjAsMTUpLGNvbG9yLHRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9idXR0b25QYWlyLmVkaXQobnVtK1wiXCIsdG1wQnV0KTtcclxuICAgICAgICB0aGlzLl9zcHIuYWRkQ2hpbGQodG1wQnV0LmdldFNwcigpKTtcclxuICAgICAgICB0aGlzLl9idXR0b25IZWlnaHQgKz0gMTY7XHJcbiAgICAgICAgdG1wQnV0LnNldEZ1bmMoZnVuKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWcqOaMh+WumuS9jee9rua3u+WKoOmineWkluaMiemSrlxyXG4gICAgICogQHBhcmFtIG5hbWUgXHJcbiAgICAgKiBAcGFyYW0gbnVtIFxyXG4gICAgICogQHBhcmFtIGZ1biBcclxuICAgICAqIEBwYXJhbSBwb3MgXHJcbiAgICAgKiBAcGFyYW0gc2l6ZSBcclxuICAgICAqIEBwYXJhbSBjb2xvciBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZEV4dHJhQnV0dG9uQXROb0RlZkxvY2F0aW9uKG5hbWU6c3RyaW5nLG51bTpudW1iZXIsZnVuOkZ1bmN0aW9uLHBvczpWZWMyLHNpemU6VmVjMiwgY29sb3I/OnN0cmluZyk6dm9pZHtcclxuICAgICAgICBsZXQgdG1wQnV0OkJ1dHRvbiA9IG5ldyBCdXR0b24odGhpcy5fc3ltYixuYW1lLG51bSxwb3Msc2l6ZSxjb2xvcix0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fYnV0dG9uUGFpci5lZGl0KG51bStcIlwiLHRtcEJ1dCk7XHJcbiAgICAgICAgdGhpcy5fc3ByLmFkZENoaWxkKHRtcEJ1dC5nZXRTcHIoKSk7XHJcbiAgICAgICAgdG1wQnV0LnNldEZ1bmMoZnVuKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluaMiemSrlxyXG4gICAgICogQHBhcmFtIG51bSDmjInpkq7nvJblj7dcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEJ1dHRvbihudW06bnVtYmVyKTpCdXR0b257XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2J1dHRvblBhaXIucmVhZChudW0rXCJcIik7XHJcbiAgICB9XHJcblxyXG59XHJcbiIsIi8vYXV0aG9yIE5hMkN1QzRPOFxyXG5pbXBvcnQgQ3VzdG9taXplZFNwcml0ZSBmcm9tIFwiLi9jdXN0b21pemVkU3ByXCI7XHJcbmltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi4vLi4vRG9kTWF0aFwiO1xyXG5pbXBvcnQgeyBFdmVudENlbnRyZSB9IGZyb20gXCIuLi8uLi8uLi9FdmVudC9FdmVudENlbnRyZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBDaGVzc0JvYXJkIGV4dGVuZHMgQ3VzdG9taXplZFNwcml0ZXtcclxuICAgIHByaXZhdGUgX2luaXRQb3M6VmVjMjtcclxuICAgIHByaXZhdGUgX2luaXRTaXplOlZlYzI7XHJcbiAgICBwcml2YXRlIF9udW1BcnI6bnVtYmVyW11bXTsvLzJkIGFyciB3aGljaCByZXByZXNlbnRzIHRoZSBjaGVzcyBib2FyZFxyXG4gICAgcHJpdmF0ZSBfcG9zVmVjMjpWZWMyOy8vaW5pdGlhbCBsb2NhdGlvbih4LHkpXHJcbiAgICBwcml2YXRlIF91bml0U2l6ZVZlYzI6VmVjMjsvL3VuaXQgc2l6ZSh3aWR0aCwgaGVpZ2h0KVxyXG4gICAgcHJpdmF0ZSBfZnJvbnRTcHJBcnI6Q3VzdG9taXplZFNwcml0ZVtdW107Ly9mcm9udCBzcHJcclxuICAgIHByaXZhdGUgX3NjYWxlOm51bWJlcjsvL3NjYWxlIGZvciB6b29taW5nXHJcbiAgICBwcml2YXRlIF9iYWNrR3JvdW5kQ29sb3I6c3RyaW5nOy8vYmFja2dyb3VuZCBjb2xvclxyXG4gICAgcHJpdmF0ZSBfZnJvbnRDb2xvcjpzdHJpbmc7Ly9mcm9udCBjb2xvciBcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaji+ebmOaehOmAoOWZqFxyXG4gICAgICogQHBhcmFtIGFyciDkuoznu7TmlbDnu4RcclxuICAgICAqIEBwYXJhbSBwb3NWZWMyIOi1t+Wni+WdkOagh1xyXG4gICAgICogQHBhcmFtIHVuaXRzaXplIOWNleS9jeWuvemrmFxyXG4gICAgICogQHBhcmFtIGJhY2tHcm91bmRDb2xvciDog4zmma/popzoibJcclxuICAgICAqIEBwYXJhbSBmcm9udENvbG9yIOagvOWtkOminOiJslxyXG4gICAgICogQHBhcmFtIGZhdGhlciDniLbnu5jlm77oioLngrlcclxuICAgICAqIEBwYXJhbSBzY2FsZSDnvKnmlL7mr5RcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoYXJyOm51bWJlcltdW10sIHBvc1ZlYzI6VmVjMiwgdW5pdHNpemU6VmVjMiwgYmFja0dyb3VuZENvbG9yOnN0cmluZywgZnJvbnRDb2xvcjpzdHJpbmcsIHNjYWxlOm51bWJlcil7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9udW1BcnIgPSBhcnI7XHJcbiAgICAgICAgdGhpcy5faW5pdFBvcyA9IHBvc1ZlYzI7XHJcbiAgICAgICAgdGhpcy5faW5pdFNpemUgPSB1bml0c2l6ZTtcclxuICAgICAgICB0aGlzLl9zY2FsZSA9IHNjYWxlO1xyXG4gICAgICAgIHRoaXMuX3Bvc1ZlYzIgPSBuZXcgVmVjMih0aGlzLl9pbml0UG9zLngqdGhpcy5fc2NhbGUsIHRoaXMuX2luaXRQb3MueSp0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fdW5pdFNpemVWZWMyID0gbmV3IFZlYzIodGhpcy5faW5pdFNpemUueCAqIHRoaXMuX3NjYWxlLHRoaXMuX2luaXRTaXplLnkgKiB0aGlzLl9zY2FsZSk7Ly9yZWNhbGN1bGF0ZSB1bml0U2l6ZVxyXG4gICAgICAgIHRoaXMuX2JhY2tHcm91bmRDb2xvciA9IGJhY2tHcm91bmRDb2xvcjtcclxuICAgICAgICB0aGlzLl9mcm9udENvbG9yID0gZnJvbnRDb2xvcjtcclxuICAgICAgICB0aGlzLmluaXRCYWNrZ3JvdW5kKCk7XHJcbiAgICAgICAgdGhpcy5zZXRDb2xvcih0aGlzLl9iYWNrR3JvdW5kQ29sb3IpO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlQ29sb3IoKTtcclxuICAgICAgICB0aGlzLmluaXRGcm9udFNwckFycigpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyRnJvbnRTcHIodGhpcy5fZnJvbnRDb2xvcik7XHJcbiAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2Uub24oRXZlbnRDZW50cmUuRVR5cGUuUEVSRk9STUFOQ0VfUkVTQ0FMRSgpLHRoaXMsdGhpcy5yZVNjYWxlKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkcmF3IGJhY2tncm91bmRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0QmFja2dyb3VuZCgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5zZXRQYXJhbSh0aGlzLl9wb3NWZWMyLngsdGhpcy5fcG9zVmVjMi55LHRoaXMuX251bUFyclswXS5sZW5ndGgqdGhpcy5fdW5pdFNpemVWZWMyLngsdGhpcy5fbnVtQXJyLmxlbmd0aCp0aGlzLl91bml0U2l6ZVZlYzIueSx0aGlzLl9iYWNrR3JvdW5kQ29sb3IpO1xyXG4gICAgICAgIHRoaXMubG9jYXRpb25BbmRTaXplKCk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkcmF3IGZyb250XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdEZyb250U3ByQXJyKCk6dm9pZHtcclxuICAgICAgICB0aGlzLl9mcm9udFNwckFyciA9IFtdOy8vaW5pdCBjdXN0U3ByQXJyXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuX251bUFyci5sZW5ndGg7IGkgKyspe1xyXG4gICAgICAgICAgICBsZXQgdG1wQXJyOkN1c3RvbWl6ZWRTcHJpdGVbXSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IoIGxldCBqID0gMDsgaiA8IHRoaXMuX251bUFyclswXS5sZW5ndGg7IGogKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IHRtcFNwcjpDdXN0b21pemVkU3ByaXRlID0gbmV3IEN1c3RvbWl6ZWRTcHJpdGUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQodG1wU3ByKTtcclxuICAgICAgICAgICAgICAgIHRtcFNwci5zZXRQYXJhbSgwK2oqdGhpcy5fdW5pdFNpemVWZWMyLngsMCtpKnRoaXMuX3VuaXRTaXplVmVjMi55LHRoaXMuX3VuaXRTaXplVmVjMi54LHRoaXMuX3VuaXRTaXplVmVjMi55LHRoaXMuX2Zyb250Q29sb3IsbmV3IFZlYzIoMSwxKSk7XHJcbiAgICAgICAgICAgICAgICB0bXBTcHIubG9jYXRpb25BbmRTaXplKCk7XHJcbiAgICAgICAgICAgICAgICB0bXBTcHIuc2V0Q29sb3IodGhpcy5fZnJvbnRDb2xvcik7XHJcbiAgICAgICAgICAgICAgICB0bXBTcHIuY2hhbmdlQ29sb3IoKTtcclxuICAgICAgICAgICAgICAgIHRtcFNwci56T3JkZXIgPSAtMTtcclxuICAgICAgICAgICAgICAgIHRtcEFyci5wdXNoKHRtcFNwcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fZnJvbnRTcHJBcnIucHVzaCh0bXBBcnIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGNvbG9yIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbmRlckZyb250U3ByKGNvbG9yOnN0cmluZyl7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuX2Zyb250U3ByQXJyLmxlbmd0aDsgaSArKyl7XHJcbiAgICAgICAgICAgIGZvciggbGV0IGogPSAwOyBqIDwgdGhpcy5fZnJvbnRTcHJBcnJbMF0ubGVuZ3RoOyBqICsrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Zyb250U3ByQXJyW2ldW2pdLnNldENvbG9yKGNvbG9yKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Zyb250U3ByQXJyW2ldW2pdLmNoYW5nZUNvbG9yKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkv67mlLnliY3mlrnmoLzlrZDpopzoibJcclxuICAgICAqIEBwYXJhbSBwb3NWZWMyIOW+heS/ruaUueagvOWtkOWdkOagh++8iHgsee+8iVxyXG4gICAgICogQHBhcmFtIGNvbG9yIOebruagh+minOiJslxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2hhbmdlRnJvbnRDb2xvcihwb3NWZWMyOlZlYzIsY29sb3I6c3RyaW5nKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX2Zyb250U3ByQXJyW3Bvc1ZlYzIueV1bcG9zVmVjMi54XS5zZXRDb2xvcihjb2xvcik7XHJcbiAgICAgICAgdGhpcy5fZnJvbnRTcHJBcnJbcG9zVmVjMi55XVtwb3NWZWMyLnhdLmNoYW5nZUNvbG9yKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuIXpmaTmiYDmnInlt7Lnu5jlm77lvaJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjbGVhckFsbCgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5ncmFwaGljcy5jbGVhcigpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9mcm9udFNwckFyci5sZW5ndGg7IGkgKyspe1xyXG4gICAgICAgICAgICBmb3IoIGxldCBqID0gMDsgaiA8IHRoaXMuX2Zyb250U3ByQXJyWzBdLmxlbmd0aDsgaiArKyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9mcm9udFNwckFycltpXVtqXS5ncmFwaGljcy5jbGVhcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YeN6K6+5qOL55uY57yp5pS+5q+UXHJcbiAgICAgKiBAcGFyYW0gbnVtIOe8qeaUvuavlFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVTY2FsZShudW06bnVtYmVyKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3NjYWxlID0gbnVtO1xyXG4gICAgICAgIHRoaXMuX3Bvc1ZlYzIgPSBuZXcgVmVjMih0aGlzLl9pbml0UG9zLngqdGhpcy5fc2NhbGUsdGhpcy5faW5pdFBvcy55KnRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl91bml0U2l6ZVZlYzIgPSBuZXcgVmVjMih0aGlzLl9pbml0U2l6ZS54ICogdGhpcy5fc2NhbGUsdGhpcy5faW5pdFNpemUueSAqIHRoaXMuX3NjYWxlKTsvL3JlY2FsY3VsYXRlIHVuaXRTaXplXHJcbiAgICAgICAgdGhpcy5jbGVhckFsbCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdEJhY2tncm91bmQoKTtcclxuICAgICAgICB0aGlzLmluaXRGcm9udFNwckFycigpO1xyXG4gICAgICAgIHRoaXMuc2V0Q29sb3IodGhpcy5fYmFja0dyb3VuZENvbG9yKTtcclxuICAgICAgICB0aGlzLmNoYW5nZUNvbG9yKCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJGcm9udFNwcih0aGlzLl9mcm9udENvbG9yKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiIsImltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi4vLi4vRG9kTWF0aFwiO1xyXG5cclxuLy9hdXRob3IgTmEyQ3VDNE84XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdXN0b21pemVkU3ByaXRlIGV4dGVuZHMgTGF5YS5TcHJpdGV7XHJcbiAgICBwcml2YXRlIF9jb2xvcjpzdHJpbmc7Ly/lj6/op4boioLngrnpopzoibJcclxuICAgIHByaXZhdGUgX2dyYXBoaWNTaGlmdDpWZWMyOy8v6YeN5Y+g57uY5Zu+5YGP56e76YePXHJcbiAgICBwcml2YXRlIF9jZW50cmFsU2hpZnQ7Ly/kuK3lv4Pnu5jlm77lgY/np7vph49cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNlbnRyYWxTaGlmdENvbG9yZWQoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuZ3JhcGhpY3MuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLmdyYXBoaWNzLmRyYXdSZWN0KC10aGlzLndpZHRoLzIsLXRoaXMuaGVpZ2h0LzIsdGhpcy53aWR0aCx0aGlzLmhlaWdodCx0aGlzLl9jb2xvcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBjb2xvciBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldENvbG9yKGNvbG9yOnN0cmluZyk6dm9pZHtcclxuICAgICAgICB0aGlzLl9jb2xvciA9IGNvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5L+u5pS56aKc6ImyXHJcbiAgICAgKiBAcGFyYW0gY29sb3Ig55uu5qCH6aKc6ImyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjaGFuZ2VDb2xvcigpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5ncmFwaGljcy5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuZ3JhcGhpY3MuZHJhd1JlY3QodGhpcy5fZ3JhcGhpY1NoaWZ0LngsdGhpcy5fZ3JhcGhpY1NoaWZ0LnksdGhpcy53aWR0aC0yKnRoaXMuX2dyYXBoaWNTaGlmdC54LHRoaXMuaGVpZ2h0LTIqdGhpcy5fZ3JhcGhpY1NoaWZ0LnksdGhpcy5fY29sb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u55u45YWz5Y+C5pWwXHJcbiAgICAgKiBAcGFyYW0gcG9zWCDotbflp4t4XHJcbiAgICAgKiBAcGFyYW0gcG9zWSDotbflp4t5XHJcbiAgICAgKiBAcGFyYW0gd2lkdGgg5a695bqmXHJcbiAgICAgKiBAcGFyYW0gaGVpZ2h0IOmrmOW6plxyXG4gICAgICogQHBhcmFtIGNvbG9yIOminOiJslxyXG4gICAgICogQHBhcmFtIGdyYXBoaWNTaGlmdCDmo4vnm5jlgY/np7vlgLxcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFBhcmFtKHBvc1g6bnVtYmVyLCBwb3NZOm51bWJlciwgd2lkdGg6bnVtYmVyLCBoZWlnaHQ6bnVtYmVyLCBjb2xvcjpzdHJpbmcgPSB0aGlzLl9jb2xvciwgZ3JhcGhpY1NoaWZ0OlZlYzIgPSBuZXcgVmVjMigwLDApKTp2b2lke1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMueCA9IHBvc1g7XHJcbiAgICAgICAgdGhpcy55ID0gcG9zWTtcclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5zZXRDb2xvcihjb2xvcik7XHJcbiAgICAgICAgdGhpcy5fZ3JhcGhpY1NoaWZ0ID0gZ3JhcGhpY1NoaWZ0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5L+u5pS55Z2Q5qCH5ZKM5aSn5bCPXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2NhdGlvbkFuZFNpemUoKTp2b2lke1xyXG4gICAgICAgIHRoaXMucG9zKHRoaXMueCx0aGlzLnkpLnNpemUodGhpcy53aWR0aCx0aGlzLmhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDph43orr7lnZDmoIdcclxuICAgICAqIEBwYXJhbSBwb3NWZWMyIOebruagh+WdkOagh1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVsb2NhdGUocG9zVmVjMjpWZWMyKTp2b2lke1xyXG4gICAgICAgIHRoaXMueCA9IHBvc1ZlYzIueDtcclxuICAgICAgICB0aGlzLnkgPSBwb3NWZWMyLnk7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbkFuZFNpemUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmHjeiuvuWuvemrmFxyXG4gICAgICogQHBhcmFtIHNpemVWZWMyIOebruagh+WuvemrmFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVTaXplKHNpemVWZWMyOlZlYzIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHNpemVWZWMyLng7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBzaXplVmVjMi55O1xyXG4gICAgICAgIHRoaXMuY2hhbmdlQ29sb3IoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuW9k+WJjeWbvuW9oui1t+Wni+WdkOagh1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0UG9zKCk6VmVjMntcclxuICAgICAgICByZXR1cm4gbmV3IFZlYzIodGhpcy54LHRoaXMueSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57lt7Lnu5jljLrln5/lpKflsI9cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFNpemUoKTpWZWMye1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjMih0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogXHJcbiAgICAgKiDov5Tlm57lvZPliY3lt7Lnu5jljLrln5/popzoibJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldENvbG9yKCk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb2xvcjtcclxuICAgIH1cclxufSIsIi8vYXV0aG9yIE5hMkN1QzRPOFxyXG5cclxuaW1wb3J0IEFjdG9yUlUgZnJvbSBcIi4vU3ltYm9saXplZFJlbmRlclwiO1xyXG5pbXBvcnQgeyBLVlBhaXIgfSBmcm9tIFwiLi4vLi4vRG9kRGF0YVN0cnVjdHVyZVwiO1xyXG5pbXBvcnQgeyBNeVN5bWJvbCB9IGZyb20gXCIuLi8uLi8uLi9GaXgvRml4U3ltYm9sXCI7XHJcblxyXG5cclxuLy/lgqjlrZjmiYDmnInnu5jlm77oioLngrnlr7nosaFcclxuZXhwb3J0IGNsYXNzIEFjdG9yQm94e1xyXG4gICAgcHVibGljIHN0YXRpYyBCb3g6S1ZQYWlyPEFjdG9yUlU+ID0gbmV3IEtWUGFpcigpO1xyXG4gICAgcHVibGljIHN0YXRpYyBhZGQoYWN0OkFjdG9yUlUsc3ltYjpNeVN5bWJvbCk6dm9pZHtcclxuICAgICAgICBBY3RvckJveC5Cb3guZWRpdChzeW1iLmRhdGErXCJcIixhY3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0KHN5bTpudW1iZXIpOkFjdG9yUlV7XHJcbiAgICAgICAgcmV0dXJuIEFjdG9yQm94LkJveC5yZWFkKHN5bStcIlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxufSIsImltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi4vQ29tbW9uL0RvZE1hdGhcIjtcclxuaW1wb3J0IHsgTXlTeW1ib2wgfSBmcm9tIFwiLi4vRml4L0ZpeFN5bWJvbFwiO1xyXG4vLy8vLy9cclxuZXhwb3J0IGNsYXNzIEV2ZW50Q2VudHJle1xyXG4gICAgcHVibGljIHN0YXRpYyBpbnN0YW5jZTpFdmVudENlbnRyZTtcclxuICAgIHB1YmxpYyBzdGF0aWMgRVR5cGU6RVR5cGU7XHJcbiAgICBwdWJsaWMgc3RhdGljIGluaXQoKTp2b2lke1xyXG4gICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlID0gbmV3IEV2ZW50Q2VudHJlKCk7XHJcbiAgICAgICAgRXZlbnRDZW50cmUuRVR5cGUgPSBuZXcgRVR5cGUoKTtcclxuICAgICAgICBFdmVudENlbnRyZS5pbml0ID0gKCk9Pnt9O1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIF9jZW50cmU6TGF5YS5FdmVudERpc3BhdGNoZXIgPSBuZXcgTGF5YS5FdmVudERpc3BhdGNoZXIoKTtcclxuXHJcbiAgICBwdWJsaWMgb24odHlwZTpzdHJpbmcsIGNhbGxlcjphbnksIGxpc3RlbmVyOkZ1bmN0aW9uLCBhcmdzPzphbnlbXSk6dm9pZHtcclxuICAgICAgICB0aGlzLl9jZW50cmUub24odHlwZSxjYWxsZXIsbGlzdGVuZXIsYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGV2ZW50KHR5cGU6c3RyaW5nLCBhcmdzPzphbnkpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fY2VudHJlLmV2ZW50KHR5cGUsYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9mZih0eXBlOnN0cmluZywgY2FsbGVyOmFueSwgbGlzdGVuZXI6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuX2NlbnRyZS5vZmYodHlwZSwgY2FsbGVyLCBsaXN0ZW5lcik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKXt9XHJcbn1cclxuXHJcblxyXG5jbGFzcyBFVHlwZSB7XHJcbiAgICBwdWJsaWMgTEVBVkUocG9zOlZlYzIsIGlkZW50aXR5OnN0cmluZyk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBgJHtpZGVudGl0eX06Q09MTElTSU9OX0VWRU5UX0xFQVZFX0ZST00oJHtwb3MueH18JHtwb3MueX0pYDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBFTlRSRShwb3M6VmVjMiwgaWRlbnRpdHk6c3RyaW5nKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIGAke2lkZW50aXR5fTpDT0xMSVNJT05fRVZFTlRfRU5UUkVfVE8oJHtwb3MueH18JHtwb3MueX0pYDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG5ldyBhZGRlZCBmb3IgcGVyZm9ybWFuY2Ugc3RhcnRzIGhlcmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIFBFUkZPUk1BTkNFX1JFU0NBTEUoKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIFwiUkVTQ0FMRVwiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBQRVJGT1JNQU5DRV9URVhUX1NXSVRDSCgpOnN0cmluZ3tcclxuICAgICAgICByZXR1cm4gXCJURVhUX1NXSVRDSFwiO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBuZXcgYWRkZWQgZm9yIHBlcmZvcm1hbmNlIGVuZHMgaGVyZVxyXG4gICAgICovXHJcbn0iLCJpbXBvcnQgeyBWZWMyLCBEb2RNYXRoIH0gZnJvbSBcIi4uL0NvbW1vbi9Eb2RNYXRoXCI7XHJcbmltcG9ydCB7IEFycmF5QWxnbyB9IGZyb20gXCIuLi9Db21tb24vRG9kRGF0YVN0cnVjdHVyZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZpeFJlY3QgZXh0ZW5kcyBMYXlhLlJlY3RhbmdsZXtcclxuICAgIGNvbnN0cnVjdG9yKHg/Om51bWJlciwgeT86bnVtYmVyLCB3aWR0aD86bnVtYmVyLCBoZWlnaHQ/Om51bWJlcil7XHJcbiAgICAgICAgc3VwZXIoeCx5LHdpZHRoLGhlaWdodCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImV4cG9ydCBpbnRlcmZhY2UgU3ltYm9saXplZHtcclxuICAgIHN5bWJvbDpNeVN5bWJvbDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE15U3ltYm9se1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY291bnQ6bnVtYmVyID0gMDtcclxuXHJcbiAgICBwcml2YXRlIF9kYXRhOm51bWJlcjtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGRhdGEoKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLl9kYXRhID0gTXlTeW1ib2wuY291bnQ7XHJcbiAgICAgICAgTXlTeW1ib2wuY291bnQgKz0gMTtcclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpeFRpbWUge1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBmcmFtZVJhdGU6IG51bWJlciA9IDYwO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBkZWx0YVRpbWU6IG51bWJlciA9IDEgLyBGaXhUaW1lLmZyYW1lUmF0ZTtcclxuICAgIHB1YmxpYyBzdGF0aWMgZnJhbWVDb3VudDogbnVtYmVyO1xyXG4gICAgcHVibGljIHN0YXRpYyBlbGFwc2VkVGltZTogbnVtYmVyO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmZyYW1lQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuZWxhcHNlZFRpbWUgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZnJhbWVDb3VudCsrO1xyXG4gICAgICAgIHRoaXMuZWxhcHNlZFRpbWUgKz0gdGhpcy5kZWx0YVRpbWU7XHJcbiAgICB9XHJcbn0iLCIvKipUaGlzIGNsYXNzIGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IExheWFBaXJJREUsIHBsZWFzZSBkbyBub3QgbWFrZSBhbnkgbW9kaWZpY2F0aW9ucy4gKi9cclxuaW1wb3J0IEdhbWUgZnJvbSBcIi4vU2NlbmVTY3JpcHQvR2FtZVwiXG5pbXBvcnQgTG9hZGluZyBmcm9tIFwiLi9TY2VuZVNjcmlwdC9Mb2FkaW5nXCJcclxuLypcclxuKiDmuLjmiI/liJ3lp4vljJbphY3nva47XHJcbiovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVDb25maWd7XHJcbiAgICBzdGF0aWMgd2lkdGg6bnVtYmVyPTE4MDA7XHJcbiAgICBzdGF0aWMgaGVpZ2h0Om51bWJlcj05MDA7XHJcbiAgICBzdGF0aWMgc2NhbGVNb2RlOnN0cmluZz1cIm5vc2NhbGVcIjtcclxuICAgIHN0YXRpYyBzY3JlZW5Nb2RlOnN0cmluZz1cIm5vbmVcIjtcclxuICAgIHN0YXRpYyBhbGlnblY6c3RyaW5nPVwidG9wXCI7XHJcbiAgICBzdGF0aWMgYWxpZ25IOnN0cmluZz1cImxlZnRcIjtcclxuICAgIHN0YXRpYyBzdGFydFNjZW5lOmFueT1cIkxvYWRpbmdTY2VuZS5zY2VuZVwiO1xyXG4gICAgc3RhdGljIHNjZW5lUm9vdDpzdHJpbmc9XCJcIjtcclxuICAgIHN0YXRpYyBkZWJ1Zzpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIHN0YXQ6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBwaHlzaWNzRGVidWc6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBleHBvcnRTY2VuZVRvSnNvbjpib29sZWFuPXRydWU7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe31cclxuICAgIHN0YXRpYyBpbml0KCl7XHJcbiAgICAgICAgdmFyIHJlZzogRnVuY3Rpb24gPSBMYXlhLkNsYXNzVXRpbHMucmVnQ2xhc3M7XHJcbiAgICAgICAgcmVnKFwiU2NlbmVTY3JpcHQvR2FtZS50c1wiLEdhbWUpO1xuICAgICAgICByZWcoXCJTY2VuZVNjcmlwdC9Mb2FkaW5nLnRzXCIsTG9hZGluZyk7XHJcbiAgICB9XHJcbn1cclxuR2FtZUNvbmZpZy5pbml0KCk7IiwiaW1wb3J0IHsgQ29saUVtaXQgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvQ29saU1lc3NhZ2VcIjtcclxuaW1wb3J0IHsgUHJvZmlsZSB9IGZyb20gXCIuL0FjdG9yTW9kdWxlcy9Qcm9maWxlXCI7XHJcbmltcG9ydCB7IFN5bWJvbGl6ZWQsIE15U3ltYm9sIH0gZnJvbSBcIi4uLy4uL0ZpeC9GaXhTeW1ib2xcIjtcclxuaW1wb3J0IHsgQnVmZiB9IGZyb20gXCIuL0FjdG9yTW9kdWxlcy9CdWZmXCI7XHJcbmltcG9ydCB7IEF0a1N0YXRlTWFjaGluZSB9IGZyb20gXCIuL0F0dGFjay9BdGtBYnN0XCI7XHJcbmltcG9ydCB7IERhbWFnZSB9IGZyb20gXCIuL0FjdG9yTW9kdWxlcy9EYW1hZ2VcIjtcclxuaW1wb3J0IHsgQWN0b3JUeXBlIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9Eb2RLZXlcIjtcclxuaW1wb3J0IEFjdG9yU3RhdGVNZ3IsIHsgQWN0b3JTdGF0ZUlEIH0gZnJvbSBcIi4vU3RhdGUvQWN0b3JTdGF0ZUZzbVwiO1xyXG5pbXBvcnQgeyBBY3RvckJ1ZmZNZ3IgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvQWN0b3JCdWZmTWdyXCI7XHJcbmltcG9ydCB7IFRyYW5zZm9ybSB9IGZyb20gXCIuL0FjdG9yTW9kdWxlcy9UcmFuc2Zvcm1cIjtcclxuaW1wb3J0IHsgVW5pdFJlbmRlciB9IGZyb20gXCIuL0FjdG9yTW9kdWxlcy9Vbml0UmVuZGVyXCI7XHJcbmltcG9ydCB7IEFuaW1hdGlvbiB9IGZyb20gXCIuL0FjdG9yTW9kdWxlcy9BbmltYXRpb25cIjtcclxuaW1wb3J0IFJvdXRlIGZyb20gXCIuL0FjdG9yUm91dGVcIjtcclxuaW1wb3J0IHsgQWN0b3JTa2lsbCB9IGZyb20gXCIuL0FjdG9yTW9kdWxlcy9BY3RvclNraWxsXCI7XHJcbmltcG9ydCB7IEFjdG9yQ29zdCB9IGZyb20gXCIuL0FjdG9yTW9kdWxlcy9BY3RvckNvc3RcIjtcclxuaW1wb3J0IHsgQmxvY2tlciB9IGZyb20gXCIuL0F0dGFjay9CbG9ja2VyXCI7XHJcblxyXG5cclxuXHJcblxyXG5cclxuLy/ln7rmnKzljp/liJnvvJrlsJHnlKjnu6fmib/vvIzlpJrnlKjnu4TlkIhcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWN0b3IgaW1wbGVtZW50cyBTeW1ib2xpemVke1xyXG4gICAgcHVibGljIHN5bWJvbDogTXlTeW1ib2w7IC8v5YWo5bGA5ZSv5LiA55qE5qCH6K+G5pWw5a2XXHJcbiAgICBwdWJsaWMgdHlwZTogQWN0b3JUeXBlID0gQWN0b3JUeXBlLk5vbmU7IC8v6buY6K6k6Lqr5Lu95Li6QWN0b3JcclxuXHJcbiAgICBwdWJsaWMgc3RhdGU6IEFjdG9yU3RhdGVNZ3I7IC8v54q25oCB5py6IOe7n+etueeKtuaAgeabtOaWsFxyXG5cclxuICAgIHB1YmxpYyBwcm9maWxlOlByb2ZpbGU7Ly/ln7rmnKzlsZ7mgKfkuI7orr/pl67mlrnms5XlkIjpm4ZcclxuXHJcbiAgICBwdWJsaWMgYXRrOiBBdGtTdGF0ZU1hY2hpbmU7Ly/mlLvlh7vnirbmgIHmnLpcclxuICAgIHB1YmxpYyBjb2xpRW1pdDpDb2xpRW1pdCA9IG5ldyBDb2xpRW1pdCgwLDAsQ29saUVtaXQuR0xPQkFMX1VOSVRfU1VCV0lEVEgsQ29saUVtaXQuR0xPQkFMX1VOSVRfU1VCSEVJR0hUKTsvL+eisOaSnuS6i+S7tuWPkeW4g+iAhVxyXG4gICAgcHVibGljIGJsb2NrZXI6QmxvY2tlcjsvL+mYu+aMoeaooeWdl1xyXG4gICAgcHVibGljIGJ1ZmZNZ3I6QWN0b3JCdWZmTWdyO1xyXG4gICAgcHVibGljIHRyYW5zZm9ybTpUcmFuc2Zvcm07XHJcbiAgICBwdWJsaWMgcmVuZGVyOlVuaXRSZW5kZXI7XHJcbiAgICBwdWJsaWMgYW5pbWF0aW9uOkFuaW1hdGlvbjtcclxuICAgIHB1YmxpYyByb3V0ZTpSb3V0ZTsvL+i3r+W+hOWvueixoVxyXG4gICAgcHVibGljIHNraWxsOkFjdG9yU2tpbGw7XHJcbiAgICBwdWJsaWMgY29zdDpBY3RvckNvc3Q7XHJcblxyXG4gICAgLy9UT0RP77ya5Y675YyF5LiA5Liq57uE5Lu2XHJcbiAgICAvLyAvKipcclxuICAgIC8vICAqIOebruagh+mAieaLqeWZqFxyXG4gICAgLy8gICovXHJcbiAgICAvLyBwdWJsaWMgc2Vla2VyOiBTZWVrZXI7XHJcblxyXG4gICAgLy8gLypcclxuICAgIC8vICog5b2T5YmN6ZSB5a6a55uu5qCHXHJcbiAgICAvLyAqICovXHJcbiAgICAvLyBwdWJsaWMgZm9jdXM6IEFjdG9yO1xyXG5cclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IodHlwZTogQWN0b3JUeXBlLCByZXM6IGFueSkge1xyXG5cclxuICAgICAgICByZXNbJ3h4eCddID0gMTE0NTE0MTkxOTgxMDtcclxuXHJcbiAgICAgICAgdGhpcy5zeW1ib2wgPSBuZXcgTXlTeW1ib2woKTtcclxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBuZXcgQWN0b3JTdGF0ZU1ncih0aGlzKTtcclxuICAgICAgICAvLyBhY2NvcmRpbmcgdG8gZGlmZmVyZW50IHR5cGUsIGFkZCBkaWZmZXJlbnQgY29tcG9uZW50cyB0byB0aGlzIGFjdG9yLiBcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybSA9IG5ldyBUcmFuc2Zvcm0odGhpcyk7XHJcbiAgICAgICAgdGhpcy5wcm9maWxlID0gbmV3IFByb2ZpbGUodGhpcywgcmVzWyd4eHgnXSk7IFxyXG4gICAgICAgIHRoaXMuYXRrID0gbmV3IEF0a1N0YXRlTWFjaGluZSh0aGlzLCByZXNbJ3h4eCddKTtcclxuICAgICAgICB0aGlzLmJsb2NrZXIgPSBuZXcgQmxvY2tlcih0aGlzKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmJ1ZmZNZ3IgPSBuZXcgQWN0b3JCdWZmTWdyKHRoaXMsIHJlc1sneHh4J10pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucmVuZGVyID0gbmV3IFVuaXRSZW5kZXIodGhpcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSBuZXcgQW5pbWF0aW9uKHRoaXMsIHJlc1sneHh4J10pO1xyXG4gXHJcbiAgICAgICAgaWYgKEFjdG9yVHlwZS5Nb25zdGVyID09IHRoaXMudHlwZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlID0gbmV3IFJvdXRlKHRoaXMsIHJlc1sneHh4J10pO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKEFjdG9yVHlwZS5PcGVyYXRvciA9PSB0aGlzLnR5cGUpIHtcclxuICAgICAgICAgICAgdGhpcy5za2lsbCA9IG5ldyBBY3RvclNraWxsKHRoaXMsIHJlc1sneHh4J10pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5jb3N0ID0gbmV3IEFjdG9yQ29zdCh0aGlzKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhd2FrZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXRlLnJ1blN0YXRlKEFjdG9yU3RhdGVJRC5QcmVwYXJlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXRlLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICAvLyByZXNldCBjbGVhciByZXNvdXJjZSByZWxhdGVkIG1vZHVsZVxyXG4gICAgICAgIC8vIHRoaXMucmVuZGVyLnJlc2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldE9uTWFwKCk6IHZvaWQge1xyXG4gICAgICAgIC8vVE9ET1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRQb3NpdGlvbigpOiB2b2lkIHtcclxuICAgICAgICAvL1RPRE9cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaUu+WHu+S4gOS4quaIluWkmuS4qkFjdG9y55uu5qCHXHJcbiAgICAgKiAyMDIwLzMvNSDmlLvlh7vpgLvovpHlt7Lku47kuovku7bop6blj5HmlLnkuLrnm7TmjqXosIPnlKhcclxuICAgICAqIOWPkei1t+WSjOaOpeaUtuaUu+WHu+eahOmAu+i+keWdh+WwgeijheWcqEFjdG9y57G75LitXHJcbiAgICAgKiBAcGFyYW0gdmljdGltIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXR0YWNrKC4uLnZpY3RpbTpBY3RvcltdKTp2b2lke1xyXG4gICAgICAgIGxldCBkbWc6RGFtYWdlID0gdGhpcy5wcm9maWxlLmdlbmVyYXRlRGFtYWdlKHRoaXMpO1xyXG5cclxuICAgICAgICB2aWN0aW0uZm9yRWFjaChlbGU9PntcclxuICAgICAgICAgICAgdGhpcy5iZUF0dGFja2VkKGRtZy5jb3B5KCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOiiq+aUu+WHu1xyXG4gICAgICogQHBhcmFtIGRhbWFnZSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGJlQXR0YWNrZWQoZGFtYWdlOkRhbWFnZSk6dm9pZHtcclxuICAgICAgICAvL0B0b2RvXHJcbiAgICAgICAgLy/lh4/lsJHnlJ/lkb3lgLxcclxuICAgICAgICAvL+WPkeWHuuaUu+WHu+S6i+S7tlxyXG4gICAgICAgIC8v77yI5Y+v6IO977yJ5Y+R5Ye65q275Lqh5LqL5Lu2XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog56e76ZmkYnVmZlxyXG4gICAgICogQHBhcmFtIGJ1ZmYgXHJcbiAgICAgKiDmjqXlj6Pnp7vpmaRcclxuICAgICAqL1xyXG4gICAgLy8gcHVibGljIHJlbW92ZUJ1ZmYoYnVmZjpCdWZmKTp2b2lke1xyXG4gICAgLy8gICAgIGxldCBpOm51bWJlciA9IHRoaXMuYnVmZkxpc3QuaW5kZXhPZihidWZmKTtcclxuICAgIC8vICAgICBpZiAoaSA9PSAtMSkge1xyXG4gICAgLy8gICAgICAgICByZXR1cm47XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIHRoaXMuYnVmZkxpc3RbaV0ub25EZXN0cm95KCk7XHJcbiAgICAvLyAgICAgdGhpcy5idWZmTGlzdC5zcGxpY2UoaSwxKTtcclxuICAgIC8vIH1cclxufVxyXG5cclxuXHJcbiIsImltcG9ydCBBY3RvciBmcm9tIFwiLi9BY3RvclwiO1xyXG5pbXBvcnQgeyBBY3RvclR5cGUgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL0RvZEtleVwiO1xyXG5pbXBvcnQgeyBBY3RvclN0YXRlSUQgfSBmcm9tIFwiLi9TdGF0ZS9BY3RvclN0YXRlRnNtXCI7XHJcbmltcG9ydCB7IENvbGlSZWNlaXZlciB9IGZyb20gXCIuL0FjdG9yTW9kdWxlcy9Db2xpTWVzc2FnZVwiO1xyXG5pbXBvcnQgUmhvZGVzR2FtZSBmcm9tIFwiLi4vUmhvZGVzR2FtZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWN0b3JNZ3Ige1xyXG4gICAgcHVibGljIGFjdG9yczogQWN0b3JbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmFjdG9ycyA9IFtdO1xyXG5cclxuICAgICAgICAvL3Rlc3RcclxuICAgICAgICB0aGlzLmNyZWF0ZUFjdG9yKEFjdG9yVHlwZS5Nb25zdGVyLCB7fSk7XHJcbiAgICAgICAgdGhpcy5hY3RvcnNbMF0uc3RhdGUucnVuU3RhdGUoQWN0b3JTdGF0ZUlELldhbGspO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlQWN0b3IoQWN0b3JUeXBlLk9wZXJhdG9yLCB7fSk7XHJcbiAgICAgICAgdGhpcy5hY3RvcnNbMV0uc3RhdGUucnVuU3RhdGUoQWN0b3JTdGF0ZUlELkZpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdChyZXM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX2luaXRFbmVteShyZXMpO1xyXG4gICAgICAgIHRoaXMuX2luaXRPcHJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGF3YWtlKCk6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hY3RvcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGFjdG9yID0gdGhpcy5hY3RvcnNbaV07XHJcbiAgICAgICAgICAgIGFjdG9yLmF3YWtlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYWN0b3IgPSB0aGlzLmFjdG9yc1tpXTtcclxuICAgICAgICAgICAgYWN0b3IudXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFJob2Rlc0dhbWUuSW5zdGFuY2UuYmF0dGxlLm1hcE5vZGVDUFUucmVuZGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hY3RvcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGFjdG9yID0gdGhpcy5hY3RvcnNbaV07XHJcbiAgICAgICAgICAgIGFjdG9yLnJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjcmVhdGVBY3Rvcih0eXBlOiBBY3RvclR5cGUsIHJlczogYW55KTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGFjdG9yID0gbmV3IEFjdG9yKHR5cGUsIHJlcyk7XHJcbiAgICAgICAgdGhpcy5hY3RvcnMucHVzaChhY3Rvcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEFjdG9yQnlJRChJRDogbnVtYmVyKTogQWN0b3IgfCBudWxsIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYWN0b3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhY3RvciA9IHRoaXMuYWN0b3JzW2ldO1xyXG4gICAgICAgICAgICBpZiAoSUQgPT0gYWN0b3Iuc3ltYm9sLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhY3RvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9pbml0RW5lbXkocmVzOiBhbnkpIHtcclxuICAgICAgICAvL1RPRE8gdXNlIGxldmVsIHJlcyBkYXRhIGluaXQgZW5lbXkgYWN0b3JzXHJcbiAgICAgICAgLy9lZy5cclxuICAgICAgICAvL2xldCBlbmVteVJlcyA9IHJlc1sneHh4eHgnXTtcclxuICAgICAgICAvL2FjdG9yID0gdGhpcy5jcmVhdGVBY3RvcihBY3RvclR5cGUuRW5lbXkgLGVuZW15UmVzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfaW5pdE9wcnQoKSB7XHJcbiAgICAgICAgLy9UT0RPIHVzZSBwcmUgY2hvb3NlIG9wcnQgbGlzdCB0byBpbml0IHNlbGYgYWN0b3JzXHJcbiAgICAgICAgLy9sZXQgYXJyYXkgPSBSaG9kZXNHYW1lcy5JbnN0YW5jZS5nYW1lZGF0YS5jdXJyZW50Rm9ybWF0aW9uO1xyXG4gICAgICAgIC8vZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIC8vICAgbGV0IGlkID0gYXJyYXlbaV07XHJcbiAgICAgICAgLy8gICBsZXQgcmVzID0gRG9kUmVzb3VyY2VNZ3IuSW5zdGFuY2UuZ2V0Q3VycmVudE9wZXJhcm9yRGF0YUJ5SUQoaWQpO1xyXG4gICAgICAgIC8vICAgbGV0IGFjdG9yID0gdGhpcy5jcmVhdGVBY3RvcihBY3RvclR5cGUuT3BlcmF0b3IsIHJlcylcclxuICAgICAgICAvL31cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQWN0b3JCdWZmTWdye1xyXG4gICAgY29uc3RydWN0b3Ioa2VlcGVyOkFjdG9yLCByZXM6YW55KXtcclxuICAgICAgICBcclxuICAgIH1cclxufSIsImltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBY3RvckNvc3R7XHJcbiAgICBjb25zdHJ1Y3RvcihrZWVwZXI6QWN0b3Ipe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9BY3RvclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFjdG9yU2tpbGx7XHJcbiAgICBjb25zdHJ1Y3RvcihrZWVwZXI6QWN0b3IsIHJlczphbnkpe1xyXG5cclxuICAgIH1cclxufSIsImltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBbmltYXRpb257XHJcbiAgICBjb25zdHJ1Y3RvcihrZWVwZXI6QWN0b3IsIHJlczphbnkpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgVmVjMiwgRG9kTWF0aCB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vRG9kTWF0aFwiO1xyXG5pbXBvcnQgeyBGaXhSZWN0IH0gZnJvbSBcIi4uLy4uLy4uL0ZpeC9GaXhSZWN0XCI7XHJcbmltcG9ydCB7IEFycmF5QWxnbyB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vRG9kRGF0YVN0cnVjdHVyZVwiO1xyXG5pbXBvcnQgeyBFdmVudENlbnRyZSB9IGZyb20gXCIuLi8uLi8uLi9FdmVudC9FdmVudENlbnRyZVwiO1xyXG5pbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcbmltcG9ydCB7IEFjdG9yVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vRG9kS2V5XCI7XHJcblxyXG4vKipcclxuICog56Kw5pKe5raI5oGv5Y+R5biD6ICFXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29saUVtaXR7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEdMT0JBTF9VTklUX1dJRFRIOm51bWJlciA9IDEwMDsvL+WFqOWxgOWNleS9jeWuvVxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBHTE9CQUxfVU5JVF9IRUlHSFQ6bnVtYmVyID0gMTAwOy8v5YWo5bGA5Y2V5L2N6auYXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEdMT0JBTF9VTklUX1NVQldJRFRIOm51bWJlciA9IDkwOy8v5YWo5bGA5YaF6YOo5Y2V5L2N5a69XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEdMT0JBTF9VTklUX1NVQkhFSUdIVDpudW1iZXIgPSA5MDsvL+WFqOWxgOWGhemDqOWNleS9jemrmFxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBHTE9CQUxfVU5JVF9SU0hJRlQ6bnVtYmVyID0gNTsvL+WFqOWxgOWNleS9jeWQkeWPs+WBj+enu1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBHTE9CQUxfVU5JVF9CU0hJRlQ6bnVtYmVyID0gNTsvL+WFqOWxgOWNleS9jeWQkeS4i+WBj+enu1xyXG5cclxuICAgIHByaXZhdGUgX3JlYzpGaXhSZWN0O1xyXG4gICAgXHJcbiAgICBwcml2YXRlIF9wYXN0U2V0OlZlYzJbXSA9IFtdOy8v5q2k5pa55Z2X5LiK5LiA5qyh5a2Y5Zyo5LqO5ZOq5LiA54K5XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57miYDmnInnm67liY3oh6rouqvmiYDlpITnmoTmlrnmoLxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBmaW5kSW50ZXJzZWN0KCk6VmVjMltde1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IFtcclxuICAgICAgICAgICAgbGVmdCxcclxuICAgICAgICAgICAgdG9wLFxyXG4gICAgICAgICAgICByaWdodCxcclxuICAgICAgICAgICAgYm90dG9tXHJcbiAgICAgICAgXSA9IFtcclxuICAgICAgICAgICAgRG9kTWF0aC5pbnREaXZpc2lvbih0aGlzLl9yZWMueCxDb2xpRW1pdC5HTE9CQUxfVU5JVF9XSURUSCksXHJcbiAgICAgICAgICAgIERvZE1hdGguaW50RGl2aXNpb24odGhpcy5fcmVjLnksQ29saUVtaXQuR0xPQkFMX1VOSVRfSEVJR0hUKSxcclxuICAgICAgICAgICAgRG9kTWF0aC5pbnREaXZpc2lvbih0aGlzLl9yZWMucmlnaHQsQ29saUVtaXQuR0xPQkFMX1VOSVRfV0lEVEgpLFxyXG4gICAgICAgICAgICBEb2RNYXRoLmludERpdmlzaW9uKHRoaXMuX3JlYy5ib3R0b20sQ29saUVtaXQuR0xPQkFMX1VOSVRfSEVJR0hUKVxyXG4gICAgICAgIF1cclxuXHJcbiAgICAgICAgbGV0IHJlc3VsdDpWZWMyW10gPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaG9yaTpudW1iZXIgPSBsZWZ0OyBob3JpIDw9IHJpZ2h0OyBob3JpICs9IDEpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgdmVydGk6bnVtYmVyID0gdG9wOyB2ZXJ0aSA8PSBib3R0b207IHZlcnRpICs9IDEpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBWZWMyKGhvcmksIHZlcnRpKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcG9zKHg6bnVtYmVyLCB5Om51bWJlcik6Q29saUVtaXR7XHJcbiAgICAgICAgdGhpcy5fcmVjLnggPSB4O1xyXG4gICAgICAgIHRoaXMuX3JlYy55ID0geTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcG9zQnlWZWModmVjOlZlYzIpOkNvbGlFbWl0e1xyXG4gICAgICAgIHRoaXMuX3JlYy54ID0gdmVjLng7XHJcbiAgICAgICAgdGhpcy5fcmVjLnkgPSB2ZWMueTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2l6ZSh3aWR0aDpudW1iZXIsIGhlaWdodDpudW1iZXIpOkNvbGlFbWl0e1xyXG4gICAgICAgIHRoaXMuX3JlYy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuX3JlYy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGV2ZW50KHB1Ymxpc2hlcj86YW55LCBpZGVudGl0eTpBY3RvclR5cGUgPSBBY3RvclR5cGUuTm9uZSk6dm9pZHtcclxuICAgICAgICBsZXQgY3VycmVudDpWZWMyW10gPSB0aGlzLmZpbmRJbnRlcnNlY3QoKTsvL+W9k+WJjeeisOaSnumbhuWQiFxyXG4gICAgICAgIC8vdGhpcy5fcGFzdFNldC8v5Y6G5Y+y56Kw5pKe6ZuG5ZCIXHJcbiAgICAgICAgLy/nprvlvIDvvJrlpITkuo7ljoblj7LnorDmkp7pm4blkIjvvIzkvYbkuI3lpITkuo7lvZPliY3norDmkp7pm4blkIjnmoTlhYPntKBcclxuICAgICAgICBsZXQgbGVhdmU6VmVjMltdID0gQXJyYXlBbGdvLmZpbmRDb21wbGVtZW50U2V0KHRoaXMuX3Bhc3RTZXQsIGN1cnJlbnQpIGFzIFZlYzJbXTtcclxuICAgICAgICAvL+i/m+WFpe+8muWkhOS6juW9k+WJjeeisOaSnumbhuWQiO+8jOS9huS4jeWkhOS6juWOhuWPsueisOaSnumbhuWQiOeahOWFg+e0oFxyXG4gICAgICAgIGxldCBlbnRyZTpWZWMyW10gPSBBcnJheUFsZ28uZmluZENvbXBsZW1lbnRTZXQoY3VycmVudCwgdGhpcy5fcGFzdFNldCkgYXMgVmVjMltdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8v5Y+R5biD5LqL5Lu2XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCLnprvlvIBcIik7XHJcbiAgICAgICAgbGVhdmUuZm9yRWFjaChlbGU9PntcclxuICAgICAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2UuZXZlbnQoRXZlbnRDZW50cmUuRVR5cGUuTEVBVkUoZWxlLCBgJHtpZGVudGl0eX1gKSwgcHVibGlzaGVyKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCLov5vlhaVcIik7XHJcbiAgICAgICAgZW50cmUuZm9yRWFjaChlbGU9PntcclxuICAgICAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2UuZXZlbnQoRXZlbnRDZW50cmUuRVR5cGUuRU5UUkUoZWxlLCBgJHtpZGVudGl0eX1gKSwgcHVibGlzaGVyKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fcGFzdFNldCA9IGN1cnJlbnQ7Ly/mm7TmlrDljoblj7LnorDmkp7pm4blkIjkuLrlvZPliY3norDmkp7pm4blkIhcclxuICAgIH07XHJcblxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOWPkeW4g+emu+W8gOW9k+WJjeWtmOWcqOeahOaJgOacieWdkOagh+eahOS6i+S7tlxyXG4gICAgICogQHBhcmFtIHB1Ymxpc2hlciBcclxuICAgICAqIEBwYXJhbSBpZGVudGl0eSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGV2ZW50TGVhdmVBbGwocHVibGlzaGVyPzphbnksIGlkZW50aXR5OkFjdG9yVHlwZSA9IEFjdG9yVHlwZS5Ob25lKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3Bhc3RTZXQuZm9yRWFjaCh2ZWM9PntcclxuICAgICAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2UuZXZlbnQoRXZlbnRDZW50cmUuRVR5cGUuTEVBVkUodmVjLCBgJHtpZGVudGl0eX1gKSwgcHVibGlzaGVyKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4Om51bWJlcix5Om51bWJlcix3aWR0aDpudW1iZXIgPSBDb2xpRW1pdC5HTE9CQUxfVU5JVF9TVUJXSURUSCwgaGVpZ2h0Om51bWJlciA9IENvbGlFbWl0LkdMT0JBTF9VTklUX1NVQkhFSUdIVCl7XHJcbiAgICAgICAgdGhpcy5fcmVjID0gbmV3IEZpeFJlY3QoeCx5LHdpZHRoLGhlaWdodCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDnorDmkp7mtojmga/mjqXmlLbogIVcclxuICog5Y+v5Lul6YCa6L+Hc2V0RGV0ZWN0aW9u55uR5o6n5oyH5a6a54K577yM5oyH5a6aSWRlbnRpdHnnmoTov5vlhaXlkoznprvlvIDkuovku7ZcclxuICog5Y+v5Lul6YCa6L+Hb2ZmRGV0ZWN0aW9u5pKk6ZSA5oyH5a6a54K555qE55uR5o6nXHJcbiAqIOi/meS4quS4jeiDveebtOaOpeeUqO+8jOimgee7p+aJv+S4gOWxguaKim9uTGVhdmXlkoxvbkVudHJl5Ye95pWw6YeN5YaZ5LmL5ZCO5omN6IO955SoXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ29saVJlY2VpdmVye1xyXG4gICAgLypcclxuICAgIOi/memHjOeahOS7u+S9leefqemYtemDveWPr+S7peeUqOmUruWAvOWvueabv+S7o+OAgnjkuI555Lik5Liq5Y+C5pWw5Y+v5Lul55Sf5oiQ5rC45LiN6YeN5aSN55qE6ZSuXHJcblxyXG4gICAgKi9cclxuICAgIHByaXZhdGUgX2RldGVjdGlvbk1hdHJpeDpib29sZWFuW11bXSA9IFtdOy8v6K6w5b2V5ZOq5Liq5Z2Q5qCH5bey6KKr55uR5o6nXHJcbiAgICBwcml2YXRlIGRldGVjdGlvbkV4aXN0KHBvc2l0aW9uOlZlYzIpOmJvb2xlYW57Ly/mn6XnnIvmn5DkuKrlnZDmoIfmmK/lkKblt7Looqvnm5HmjqdcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGV0ZWN0aW9uTWF0cml4W3Bvc2l0aW9uLnhdW3Bvc2l0aW9uLnldO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfY2FuY2VsbGF0aW9uTWF0cml4OkZ1bmN0aW9uW11bXVtdID0gW107Ly/lrZjmlL7nlKjkuo7lj5bmtojnm5HlkKznmoTlh73mlbBcclxuICAgIHByaXZhdGUgX3dpZHRoOm51bWJlcjtcclxuICAgIHByaXZhdGUgX2hlaWdodDpudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3Iod2lkdGg6bnVtYmVyLCBoZWlnaHQ6bnVtYmVyKXtcclxuICAgICAgICB0aGlzLl93aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuX2hlaWdodCA9IGhlaWdodDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgdyA9IDA7IHcgPCB3aWR0aDsgdyArPSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RldGVjdGlvbk1hdHJpeFt3XSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLl9jYW5jZWxsYXRpb25NYXRyaXhbd10gPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaCA9IDA7IGggPCBoZWlnaHQ7IGggKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGV0ZWN0aW9uTWF0cml4W3ddW2hdID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jYW5jZWxsYXRpb25NYXRyaXhbd11baF0gPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOatpOaWueazleaPkOS+m+e7meatpOexu+eahOWtkOexu+mHjeWGmVxyXG4gICAgICog5q+P5b2T5q2k5a6e5L6L55uR5o6n55qE6L+b5YWl56Kw5pKe5LqL5Lu25Zyo5bey5ZCv55So55uR5ZCs55qE5Z2Q5qCH5Y+R55Sf5pe277yM5q2k5Ye95pWw5bCG6KKr6LCD55SoXHJcbiAgICAgKiBAcGFyYW0gYWN0b3IgXHJcbiAgICAgKiBAcGFyYW0gcG9zaXRpb25cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IG9uRW50cmUoYWN0b3I6QWN0b3IsIHBvc2l0aW9uOlZlYzIpOnZvaWRcclxuXHJcbiAgICAvKipcclxuICAgICAqIOatpOaWueazleaPkOS+m+e7meatpOexu+eahOWtkOexu+mHjeWGmVxyXG4gICAgICog5q+P5b2T5q2k5a6e5L6L55uR5o6n55qE6L+b5YWl56Kw5pKe5LqL5Lu25Zyo5bey5ZCv55So55uR5ZCs55qE5Z2Q5qCH5Y+R55Sf5pe277yM5q2k5Ye95pWw5bCG6KKr6LCD55SoXHJcbiAgICAgKiBAcGFyYW0gYWN0b3IgXHJcbiAgICAgKiBAcGFyYW0gcG9zaXRpb25cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IG9uTGVhdmUoYWN0b3I6QWN0b3IsIHBvc2l0aW9uOlZlYzIpOnZvaWRcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWcqOaMh+WumuWdkOagh+S4iuiuvue9ruebkeWQrOeisOaSnuS6i+S7tlxyXG4gICAgICogaWRlbnRpdHnlj6/ku6XlnKhBY3Rvci5JZGVudGl0eemHjOmAieaLqVxyXG4gICAgICog6YKj5oiR5Li65LuA5LmI5LiN5YaZZW51beWRouKApuKAplxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0RGV0ZWN0aW9uKHBvc2l0aW9uOlZlYzIsIGlkZW50aXR5OnN0cmluZyk6dm9pZHtcclxuICAgICAgICBpZiAodGhpcy5kZXRlY3Rpb25FeGlzdChwb3NpdGlvbikpIHsvL+WmguaenOWcqOatpOWkhOW3suWtmOWcqOebkeaOp++8jOWImeWPlua2iOebkeaOp1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNldERldGVjdGlvbuWHveaVsOS4jeiDveWcqOWQjOS4gOS4quWdkOagh+WkmuasoeebkeaOp++8jOivt+afpeeci0NvbGlSZWNpZXZlcuexu1wiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocG9zaXRpb24ueCA+PSB0aGlzLl93aWR0aCB8fCBwb3NpdGlvbi54IDwgMCB8fFxyXG4gICAgICAgICAgICBwb3NpdGlvbi55ID4gdGhpcy5faGVpZ2h0IHx8IHBvc2l0aW9uLnkgPCAwKSB7Ly/lpoLmnpznm5HmjqfkvY3nva7otoXlh7rovrnnlYzvvIzliJnlj5bmtojnm5HmjqdcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHBvc2l0aW9uID0gcG9zaXRpb24uY2xvbmUoKTsvL+WkjeWItuS9jee9ruWvueixoeS7pemYsuatouS8oOWdgOmXrumimFxyXG4gICAgICAgIGxldCBkZXRlY3RvcjpGdW5jdGlvbltdID0gW107Ly/ov5nmmK/nm5HlkKzlh73mlbDvvIzlrZjotbfmnaXlh4blpIfmkqTpmaTnm5HlkKzml7bnlKhcclxuICAgICAgICAvL+iuvue9ruebkeWQrOS6i+S7tlxyXG4gICAgICAgICAgICBkZXRlY3RvclswXSA9IChhY3RvcjpBY3Rvcik9PnsvL+i/m+WFpeS6i+S7tuWHveaVsFxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkVudHJlKGFjdG9yLCBwb3NpdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGV0ZWN0b3JbMV0gPSAoYWN0b3I6QWN0b3IpPT57Ly/nprvlvIDkuovku7blh73mlbBcclxuICAgICAgICAgICAgICAgIHRoaXMub25MZWF2ZShhY3RvciwgcG9zaXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5vbihFdmVudENlbnRyZS5FVHlwZS5FTlRSRShwb3NpdGlvbiwgaWRlbnRpdHkpLCB0aGlzLCBkZXRlY3RvclswXSk7XHJcbiAgICAgICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLm9uKEV2ZW50Q2VudHJlLkVUeXBlLkxFQVZFKHBvc2l0aW9uLCBpZGVudGl0eSksIHRoaXMsIGRldGVjdG9yWzFdKTtcclxuICAgICAgICAvL+iuvue9ruebkeWQrOS6i+S7tlxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX2NhbmNlbGxhdGlvbk1hdHJpeFtwb3NpdGlvbi54XVtwb3NpdGlvbi55XS5wdXNoKCgpPT57Ly/lsIbnm5HlkKznp7vpmaTlh73mlbDlrZjlhaXlh73mlbDnn6npmLVcclxuICAgICAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2Uub2ZmKEV2ZW50Q2VudHJlLkVUeXBlLkVOVFJFKHBvc2l0aW9uLCBpZGVudGl0eSksIHRoaXMsIGRldGVjdG9yWzBdKTtcclxuICAgICAgICB9LCAoKT0+e1xyXG4gICAgICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5vZmYoRXZlbnRDZW50cmUuRVR5cGUuTEVBVkUocG9zaXRpb24sIGlkZW50aXR5KSwgdGhpcywgZGV0ZWN0b3JbMV0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLl9kZXRlY3Rpb25NYXRyaXhbcG9zaXRpb24ueF1bcG9zaXRpb24ueV0gPSB0cnVlOy8v5bCG5q2k5Z2Q5qCH55qE54q25oCB6K6+5Li64oCc5bey6KKr55uR5ZCs4oCdXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnp7vpmaTmjIflrprlnZDmoIfnmoTnorDmkp7kuovku7bnm5HlkKxcclxuICAgICAqIEBwYXJhbSBwb3NpdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb2ZmRGV0ZWN0aW9uKHBvc2l0aW9uOlZlYzIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fY2FuY2VsbGF0aW9uTWF0cml4W3Bvc2l0aW9uLnhdW3Bvc2l0aW9uLnldLmZvckVhY2goKGVsZSk9PnsvL+aJp+ihjOavj+S4gOS4qumihOWtmOeahOWHveaVsFxyXG4gICAgICAgICAgICBlbGUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9jYW5jZWxsYXRpb25NYXRyaXhbcG9zaXRpb24ueF1bcG9zaXRpb24ueV0gPSBbXTsvL+WIoOmZpOatpOWkhOeahOmihOWtmOWHveaVsFxyXG4gICAgICAgIHRoaXMuX2RldGVjdGlvbk1hdHJpeFtwb3NpdGlvbi54XVtwb3NpdGlvbi55XSA9IGZhbHNlOy8v5bCG5q2k5Z2Q5qCH6K6+5Li65pyq55uR5ZCsXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9BY3RvclwiO1xyXG5cclxuZXhwb3J0IGVudW0gRGFtYWdlVHlwZXtcclxuICAgIFBZU0lDQUwsXHJcbiAgICBNQUdJQ0FMLFxyXG4gICAgVFJVRSxcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERhbWFnZXtcclxuXHJcbiAgICBwdWJsaWMgc291cmNlOkFjdG9yID0gbnVsbDsvL+S8pOWus+adpea6kFxyXG4gICAgcHVibGljIHZhbHVlOm51bWJlciA9IDA7Ly/mlLvlh7vliptcclxuICAgIHB1YmxpYyB0eXBlOkRhbWFnZVR5cGUvL+S8pOWus+exu+Wei1xyXG4gICAgcHVibGljIHByaW1hcnk6Ym9vbGVhbiA9IHRydWU7Ly/mmK/lkKbkuLrpnZ7pl7TmjqXkvKTlrrPvvIjpl7TmjqXkvKTlrrPkuI3kvJrop6blj5HmmJ/nhorjgIHlubTnmoTlj43nlLLkuYvnsbvnmoTmlYjmnpzvvIlcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2U6QWN0b3IsIHZhbHVlOm51bWJlciwgdHlwZTpEYW1hZ2VUeXBlKXtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvcHkoKTpEYW1hZ2V7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBEYW1hZ2UodGhpcy5zb3VyY2UsIHRoaXMudmFsdWUsIHRoaXMudHlwZSk7XHJcbiAgICAgICAgcmVzdWx0LnR5cGUgPSB0aGlzLnR5cGU7XHJcbiAgICAgICAgcmVzdWx0LnByaW1hcnkgPSB0aGlzLnByaW1hcnk7XHJcbiAgICAgICAgcmVzdWx0LnNvdXJjZSA9IHRoaXMuc291cmNlO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBEYW1hZ2UsIERhbWFnZVR5cGUgfSBmcm9tIFwiLi9EYW1hZ2VcIjtcclxuaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9BY3RvclwiO1xyXG5pbXBvcnQgeyBBY3RvclR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0RvZEtleVwiO1xyXG5pbXBvcnQgeyBWZWMyIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Eb2RNYXRoXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIFByb2ZpbGXnsbvmmK/lgqjlrZjljZXkvY3ln7rmnKzmlbDmja7vvIjlpoLmlLvlh7vlipvjgIHpmLLlvqHlipvnrYnvvInnmoTnsbtcclxuICog5a6D6L+Y5o+Q5L6b5LiA5YiH55So5LqO6I635Y+WQWN0b3Lkv6Hmga/nmoTmjqXlj6PvvIjlpoLmmK/lkKbog73lpJ/ooYzliqjjgIHmmK/lkKbog73lpJ/pmLvmjKHvvIlcclxuICovXHJcbmV4cG9ydCBjbGFzcyBQcm9maWxlIHtcclxuICAgIHB1YmxpYyBuYW1lOiBTdHJpbmcgPSBcIkNoYW5kbGVyIEJpbmdcIjtcclxuICAgIHB1YmxpYyByZWFkb25seSBrZWVwZXI6QWN0b3I7XHJcblxyXG4gICAgcHJpdmF0ZSBfcHJlcFRpbWU6IG51bWJlciA9IDEwMDsvL+WJjeaRh+aXtumXtFxyXG4gICAgcHJpdmF0ZSBfYWZ0ZXJUaW1lOiBudW1iZXIgPSAxMDA7Ly/lkI7mkYfml7bpl7RcclxuICAgIHByaXZhdGUgX2JyZWFrdGhyb3VnaDogbnVtYmVyID0gMTsvL+egtOmZpOmYu+aMoeiDveWKm1xyXG4gICAgcHVibGljIGludmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlOy8v5piv5ZCm6ZqQ5b2iXHJcbiAgICBwdWJsaWMgYmxvY2tlZDogYm9vbGVhbiA9IGZhbHNlOy8v5bey6KKr6Zi75oyhXHJcbiAgICBwdWJsaWMgYmxvY2tlcjogQWN0b3I7Ly/pmLvmjKHogIVcclxuXHJcbiAgICAvKipcclxuICAgICAqIOS8pOWus+iuoeeul+ebuOWFs+eahOS/ruaUueWSjOiuv+mXruaOpeWPo1xyXG4gICAgICog5L2c6ICF77ya6JGxXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhdHRhY2tQb3dlcjogbnVtYmVyID0gMTAwOy8v5pS75Ye75YqbXHJcbiAgICBwdWJsaWMgYXRrU2NhbGU6bnVtYmVyID0gMTsvL+aUu+WHu+WAjeeOh1xyXG4gICAgcHVibGljIGF0a0J1ZmY6bnVtYmVyID0gMTsvL+aUu+WHu+eZvuWIhuavlOaPkOWNh1xyXG4gICAgcHVibGljIGFybW91cjpudW1iZXIgPSA1MDsvL+eJqeeQhumYsuW+oVxyXG4gICAgcHVibGljIG1hZ2ljQXJtb3VyOm51bWJlciA9IDA7Ly/ms5XmnK/mipfmgKdcclxuICAgIHB1YmxpYyBkbWdUeXBlOkRhbWFnZVR5cGUgPSBEYW1hZ2VUeXBlLlBZU0lDQUw7Ly/kvKTlrrPnsbvlnotcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3Ioa2VlcGVyOkFjdG9yLCByZXM6YW55KXtcclxuICAgICAgICB0aGlzLmtlZXBlciA9IGtlZXBlcjtcclxuICAgICAgICAvL3RvZG86IGFib3V0IHJlc1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXROb2RlUG9zKCk6VmVjMntcclxuICAgICAgICByZXR1cm4gdGhpcy5rZWVwZXIudHJhbnNmb3JtLnBvcy5nZXROb2RlUG9zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkvKDlhaXkuIDkuKpBY3Rvcu+8jOi/lOWbnuS8pOWus+WvueixoVxyXG4gICAgICog5q2j5Zyo6ICD6JmR5bqf5byD5q2k6aG5XHJcbiAgICAgKiBAcGFyYW0gc291cmNlIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2VuZXJhdGVEYW1hZ2Uoc291cmNlOkFjdG9yKTpEYW1hZ2V7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBEYW1hZ2Uoc291cmNlLCB0aGlzLmF0dGFja1Bvd2VyKnRoaXMuYXRrU2NhbGUqdGhpcy5hdGtCdWZmLCB0aGlzLmRtZ1R5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoaXRQb2ludDogbnVtYmVyID0gMTA7Ly/nlJ/lkb3lgLxcclxuICAgIHB1YmxpYyBtYXhIaXRQb2ludDogbnVtYmVyID0gMTA7Ly/mnIDpq5jnlJ/lkb3lgLxcclxuXHJcbiAgICAvKipcclxuICAgICAqIGJ5IFhXVlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaGF0ZUxldmVsOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGF0dGFja1JhbmdlUmFkaXVzOiBudW1iZXI7XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXQgcHJlcFRpbWUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcHJlcFRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBhZnRlclRpbWUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYWZ0ZXJUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgYnJlYWt0aHJvdWdoKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JyZWFrdGhyb3VnaDtcclxuICAgIH1cclxuXHJcbiAgIFxyXG59XHJcblxyXG4vKipcclxuICog5piv5ZCm6ZyA6KaB5ZyocHJvZmlsZeS4reWwhuS4jeWQjOeahOaVsOWAvOWIhuexu++8n1xyXG4gKlxyXG4gKi8iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcbmltcG9ydCB7IERvZE1hdGgsIFZlYzIgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0RvZE1hdGhcIjtcclxuaW1wb3J0IHsgQ29saUVtaXQgfSBmcm9tIFwiLi9Db2xpTWVzc2FnZVwiO1xyXG5cclxuLyoqXHJcbiAqIOWvueS4gOS4quWNleS9jeeahOWHoOS9leeKtuaAgeeahOaPj+i/sFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRyYW5zZm9ybXtcclxuICAgIHB1YmxpYyBwb3M6UG9zID0gbmV3IFBvcygpO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihrZWVwZXI6QWN0b3Ipe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBQb3N7XHJcbiAgICAvLyBwdWJsaWMgYXV0b1N3aXRjaFRhcmdldDpib29sZWFuID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBkYXRhOlZlYzIgPSBuZXcgVmVjMigwLDApOy8v5L2N572uXHJcblxyXG5cclxuICAgIFxyXG4gICAgcHVibGljIHRhcmdldDpWZWMyID0gbmV3IFZlYzIoMCwwKTsvL+ebruagh1xyXG4gICAgcHVibGljIHNwZWVkOm51bWJlciA9IDU7Ly/pgJ/luqZcclxuICAgIHB1YmxpYyBhcHByb2FjaDpudW1iZXIgPSAwOy8v6YC86L+R5qyh5pWwXHJcbiAgICBwdWJsaWMgdmVjU3BlZWQ6VmVjMiA9IG5ldyBWZWMyKDAsMCk7Ly/liIbph4/pgJ/luqZcclxuICAgIHByaXZhdGUgX2Fycml2ZWQ6Ym9vbGVhbiA9IHRydWU7Ly/lt7LliLDovr7nm67nmoTlnLAo5q+P5qyh6K6+572u5paw55uu55qE5Zyw5pe26K6+5Li6ZmFsc2UpXHJcbiAgICBwdWJsaWMgZ2V0IGFycml2ZWQoKTpib29sZWFue3JldHVybiB0aGlzLl9hcnJpdmVkO30vL+iOt+WPluaYr+WQpuW3suWIsOi+vueahOS/oeaBr1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u55uu55qE5Zyw5bm26YeN6K6+5YiG6YeP6YCf5bqmXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0VGFyZ2V0KHRhcmdldDpWZWMyKTp2b2lke1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgIHRoaXMuYWltKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7nm7Tnur/pgJ/luqblubbph43orr7liIbph4/pgJ/luqZcclxuICAgICAqIEBwYXJhbSBzcGVlZCBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFNwZWVkKHNwZWVkOm51bWJlcik6dm9pZHtcclxuICAgICAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XHJcbiAgICAgICAgdGhpcy5haW0oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuoeeul+enu+WKqOWPguaVsCzlubblsIZfYXJyaXZlZOiuvuS4umZhbHNlXHJcbiAgICAgKiDlsIbkvJrph43orr7liIbph4/pgJ/luqblkozpgLzov5HmrKHmlbBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhaW0oKTp2b2lke1xyXG4gICAgICAgIHRoaXMudmVjU3BlZWQgPSBEb2RNYXRoLm1vdmVUb0NvbXBvbmVudCh0aGlzLmRhdGEsdGhpcy50YXJnZXQsdGhpcy5zcGVlZCk7XHJcbiAgICAgICAgdGhpcy5hcHByb2FjaCA9IHRoaXMuZGF0YS5kaXN0YW5jZVRvKHRoaXMudGFyZ2V0KSAvIHRoaXMuc3BlZWQ7XHJcbiAgICAgICAgdGhpcy5fYXJyaXZlZCA9IGZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ZCR55uu5qCH54K556e75Yqo5LiA5qyhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtb3ZlKCk6dm9pZHtcclxuICAgICAgICB0aGlzLmFwcHJvYWNoIC09IDE7XHJcbiAgICAgICAgaWYgKHRoaXMuYXBwcm9hY2ggPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEueCA9IHRoaXMudGFyZ2V0Lng7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS55ID0gdGhpcy50YXJnZXQueTtcclxuICAgICAgICAgICAgdGhpcy5fYXJyaXZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kYXRhLnggPSB0aGlzLmRhdGEueCArIHRoaXMudmVjU3BlZWQueDtcclxuICAgICAgICB0aGlzLmRhdGEueSA9IHRoaXMuZGF0YS55ICsgdGhpcy52ZWNTcGVlZC55O1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Tm9kZVBvcygpOlZlYzJ7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMyKE1hdGguZmxvb3IodGhpcy5kYXRhLnggLyBDb2xpRW1pdC5HTE9CQUxfVU5JVF9XSURUSCksIE1hdGguZmxvb3IodGhpcy5kYXRhLnkgLyBDb2xpRW1pdC5HTE9CQUxfVU5JVF9IRUlHSFQpKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG5cclxuICAgIH1cclxufSIsImltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuaW1wb3J0IFBlcmZvcm1hbmNlQ2VudHJlIGZyb20gXCIuLi8uLi8uLi9Db21tb24vR3JhcGhpY3MvUGVyZm9ybWFuY2VfTW9kdWxlL1BlcmZvcm1hbmNlQ2VudHJlXCI7XHJcbmltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0RvZE1hdGhcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBVbml0UmVuZGVye1xyXG5cclxuICAgIHByaXZhdGUgX2tlZXBlcjpBY3RvcjtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3Ioa2VlcGVyOkFjdG9yKXtcclxuICAgICAgICB0aGlzLl9rZWVwZXIgPSBrZWVwZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlcGxveSgpOnZvaWR7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJEZXBsb3lcIik7XHJcbiAgICAgICAgUGVyZm9ybWFuY2VDZW50cmUuaW5zdGFuY2UuZGlzcGxheUFjdG9yKHRoaXMuX2tlZXBlciwgdGhpcy5fa2VlcGVyLnRyYW5zZm9ybS5wb3MuZGF0YSwgbmV3IFZlYzIoNTAsNTApKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbW92ZSh2ZWM6VmVjMik6dm9pZHtcclxuICAgICAgICBQZXJmb3JtYW5jZUNlbnRyZS5pbnN0YW5jZS5tb3ZlKHRoaXMuX2tlZXBlciwgdmVjKTtcclxuICAgIH1cclxufSIsImltcG9ydCBBY3RvciBmcm9tIFwiLi9BY3RvclwiO1xyXG5pbXBvcnQgeyBWZWMyIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9Eb2RNYXRoXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3V0ZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBfcGF0aDpWZWMyW10gPSBWZWMyLmxpc3RGcm9tTGlzdChbXHJcbiAgICAgICAgWzUwMCw1MDBdLFxyXG4gICAgICAgIFswLDBdLFxyXG4gICAgICAgIFs1MDAsMF0sXHJcbiAgICAgICAgWzAsNTAwXVxyXG4gICAgXSk7XHJcbiAgICBwcml2YXRlIF90YXJDb3VudDpudW1iZXIgPSAtMTsvL+ebruWJjeaMh+WQkeeahOebruagh1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGtlZXBlcjpBY3RvciwgcmVzOmFueSl7XHJcbiAgICAgICAgLy90b2RvOiDmoLnmja5yZXPojrflj5blupTotbDnmoTot6/nur9cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY3VycmVudFRhcmdldCgpOlZlYzJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhdGhbdGhpcy5fdGFyQ291bnRdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZXh0KCk6Ym9vbGVhbntcclxuICAgICAgICBpZiAodGhpcy5fdGFyQ291bnQgPCB0aGlzLl9wYXRoLmxlbmd0aCAtIDEpIHsvL+i/mOacieS4i+S4gOmhuVxyXG4gICAgICAgICAgICB0aGlzLl90YXJDb3VudCArPSAxO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Ugey8v5rKh5pyJ5LiL5LiA6aG5XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0tWUGFpcn0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Eb2REYXRhU3RydWN0dXJlXCI7XHJcbmltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuaW1wb3J0IHtFdmVudENlbnRyZX0gZnJvbSBcIi4uLy4uLy4uL0V2ZW50L0V2ZW50Q2VudHJlXCI7XHJcbmltcG9ydCB7IFNlZWtlciB9IGZyb20gXCIuL0FjdG9yU2Vla2VyXCI7XHJcbmltcG9ydCBGaXhUaW1lIGZyb20gXCIuLi8uLi8uLi9GaXgvRml4VGltZVwiO1xyXG5pbXBvcnQgeyBNYXBOb2RlU2Vla2VyIH0gZnJvbSBcIi4vTWFwTm9kZVNlZWtlclwiO1xyXG5pbXBvcnQgeyBWZWMyIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Eb2RNYXRoXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIGJ5IFhXVlxyXG4gKiBcclxuICog6JGxIOS/ruaUueS6jiAzLzE4XHJcbiAqICAgICAg5bCGU2Vla2Vy5oyq5YWl5pS75Ye754q25oCB5py65YaF77yM5LiN55SxQWN0b3LmjIHmnIlcclxuICogICAgICDkuI3lkIznmoTmlLvlh7vojIPlm7TnlLFTZWVrZXLmm7/mjaLmnaXlrp7njrBcclxuICogICAgICDkuI3lkIznmoTmlLvlh7vpgLvovpHvvIjojIPlm7Qv5Y2V5L2T77yJ55Sx5L+u5pS5cHJvZmlsZeS4reeahOWPguaVsOWunueOsFxyXG4gKiAgICAgIEF0a1N0YXRlTWFjaGluZei0n+i0o+WvueWkluaPkOS+m+aJgOacieS/ruaUuS/orr/pl67mjqXlj6NcclxuICogICAgICDku43pnIDlr7nmraTov5vooYzov5vkuIDmraXop4TliJLvvIjljZXkvZMv5aSa5L2TL+e+pOS9k+aUu+WHu+mAu+i+keaYr+S7heeUseS4gOS4quWPguaVsOWunueOsO+8jOi/mOaYr+eUseWkmuaAgeWunueOsO+8iVxyXG4gKiAgICAgIC8vdG9kbzrml7bpl7TntK/liqDpgLvovpHmlLnlj5hcclxuICogXHJcbiAqL1xyXG5cclxuZW51bSBTdGF0ZVR5cGUge1xyXG4gICAgV0FJVCA9IFwiV0FJVFwiLFxyXG4gICAgUFJFUEFSRSA9IFwiUFJFUEFSRVwiLFxyXG4gICAgQUZURVJfQVRLID0gXCJBRlRFUl9BVEtcIlxyXG59XHJcblxyXG5pbnRlcmZhY2UgU3RhdGUge1xyXG4gICAgbmFtZSgpOnN0cmluZ1xyXG5cclxuICAgIGV4ZWN1dGUobWFjaGluZTogQXRrU3RhdGVNYWNoaW5lKTogdm9pZFxyXG5cclxuICAgIHJlc2V0KCk6IHZvaWRcclxufVxyXG5cclxuYWJzdHJhY3QgY2xhc3MgQmFzZVN0YXRlIGltcGxlbWVudHMgU3RhdGUge1xyXG4gICAgcHVibGljIG5hbWUoKTpzdHJpbmd7cmV0dXJuIFwiQmFzZVN0YXRlXCI7fVxyXG5cclxuICAgIHByb3RlY3RlZCB0aW1lOiBudW1iZXIgPSAwOy8v5pe26Ze057Sv5Yqg6YC76L6R5pS55Y+YXHJcblxyXG4gICAgcHVibGljIHJlc2V0KCkge1xyXG4gICAgICAgIHRoaXMudGltZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgYWJzdHJhY3QgZXhlY3V0ZShtYWNoaW5lOiBBdGtTdGF0ZU1hY2hpbmUpOiB2b2lkO1xyXG5cclxufVxyXG5cclxuY2xhc3MgV2FpdCBleHRlbmRzIEJhc2VTdGF0ZSB7XHJcbiAgICBwdWJsaWMgbmFtZSgpOnN0cmluZ3tyZXR1cm4gXCJXYWl0U3RhdGVcIjt9XHJcblxyXG4gICAgcHVibGljIGV4ZWN1dGUobWFjaGluZTogQXRrU3RhdGVNYWNoaW5lKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZm9jdXMgPSBtYWNoaW5lLnNlZWtlci5nZXRGb2N1cygpO1xyXG4gICAgICAgIGlmIChmb2N1cyAhPSBudWxsICYmIGZvY3VzICE9IHVuZGVmaW5lZCkgey8v5aaC5p6c6IO95aSf5om+5Yiw5pWM5Lq6XHJcbiAgICAgICAgICAgIG1hY2hpbmUuY2hhbmdlU3RhdGUoU3RhdGVUeXBlLlBSRVBBUkUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZvdW5kIEVuZW15XCIpO1xyXG4gICAgICAgIH0gZWxzZSB7Ly/lpoLmnpzmib7kuI3liLDmlYzkurpcclxuICAgICAgICAgICAgLy90b2RvOiBub25lXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5aaC5p6cc2Vla2Vy5Lit5a2Y5Zyo5pWM5Lq677yMcmVzZXQgUHJlcGFyZeW5tui3s+i9rOWIsFByZXBhcmXpmLbmrrVcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmNsYXNzIFByZXBhcmUgZXh0ZW5kcyBCYXNlU3RhdGUge1xyXG4gICAgcHVibGljIG5hbWUoKTpzdHJpbmd7cmV0dXJuIFwiUHJlcGFyZVN0YXRlXCI7fVxyXG5cclxuICAgIHB1YmxpYyBleGVjdXRlKG1hY2hpbmU6IEF0a1N0YXRlTWFjaGluZSk6IHZvaWQge1xyXG4gICAgXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIC8v5Yik5pat5piv5ZCm6ZyA6KaB6YeN5paw6YCJ5oup55uu5qCH5bm26YeN572u5YmN5pGHXHJcbiAgICAgICAgbGV0IHNlZWtlciA9IG1hY2hpbmUuc2Vla2VyO1xyXG4gICAgICAgIGxldCBhY3RvciA9IG1hY2hpbmUua2VlcGVyO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHNlZWtlci5mb2N1c0NoYW5nZWQpO1xyXG4gICAgICAgIGlmIChzZWVrZXIuZm9jdXNDaGFuZ2VkKCkpIHsvL+W9k+WJjeebruagh+W3suS/ruaUuVxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInByZXBhcmU6Rm9jdXNjaGFuZ2VkXCIpO1xyXG4gICAgICAgICAgICBtYWNoaW5lLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgaWYgKHNlZWtlci5nZXRGb2N1cygpICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIG1hY2hpbmUucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWFjaGluZS5jaGFuZ2VTdGF0ZShTdGF0ZVR5cGUuV0FJVCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+W9k+WJjeebruagh+acquS/ruaUuVxyXG4gICAgICAgIG1hY2hpbmUudGljKCk7XHJcbiAgICAgICAgaWYgKG1hY2hpbmUucmVhZHkpIHtcclxuICAgICAgICAgICAgLy90b2RvOiDov5vooYzmlLvlh7so6L+b6KGMcHJvZmlsZeWPguaVsOWIpOaWrSlcclxuICAgICAgICAgICAgbWFjaGluZS5rZWVwZXIuYXR0YWNrKHNlZWtlci5nZXRGb2N1cygpKTtcclxuICAgICAgICAgICAgbWFjaGluZS5jaGFuZ2VTdGF0ZShTdGF0ZVR5cGUuQUZURVJfQVRLKTsvL+i9rOaNouWIsOWQjuaRh1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkF0dGFjayBIYXBwZW5lZFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBBZnRlckF0ayBleHRlbmRzIEJhc2VTdGF0ZSB7XHJcbiAgICBwdWJsaWMgbmFtZSgpOnN0cmluZ3tyZXR1cm4gXCJBZnRlclN0YXRlXCI7fVxyXG4gICAgcHVibGljIGV4ZWN1dGUobWFjaGluZTogQXRrU3RhdGVNYWNoaW5lKTogdm9pZCB7XHJcbiAgICAgICAgbWFjaGluZS50aWMoKTtcclxuICAgICAgICBpZiAobWFjaGluZS5jb29sQ29tcGxldGUpIHtcclxuICAgICAgICAgICAgbWFjaGluZS5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIGlmIChtYWNoaW5lLnNlZWtlci5nZXRGb2N1cygpICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIG1hY2hpbmUuY2hhbmdlU3RhdGUoU3RhdGVUeXBlLlBSRVBBUkUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWFjaGluZS5jaGFuZ2VTdGF0ZShTdGF0ZVR5cGUuV0FJVCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBdHRhY2sgcmVjb3ZlclwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDnirbmgIHmnLrnsbtcclxuICovXHJcbmV4cG9ydCBjbGFzcyBBdGtTdGF0ZU1hY2hpbmUge1xyXG4gICAgLypcclxuICAgICog5omA5bGeQWN0b3JcclxuICAgICogKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBrZWVwZXI6IEFjdG9yO1xyXG4gICAgLyoqXHJcbiAgICAgKiDlvZPliY3nirbmgIFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjdXJTdGF0ZTogU3RhdGU7XHJcbiAgICAvKipcclxuICAgICAqIOWPr+S9v+eUqOeahOeKtuaAgeWIl+ihqFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRlTGlzdDogS1ZQYWlyPFN0YXRlPiA9IG5ldyBLVlBhaXI8U3RhdGU+KCk7XHJcblxyXG4gICAgcHVibGljIHNlZWtlcjogU2Vla2VyO1xyXG5cclxuICAgIHByaXZhdGUgX3ByZXBUaW1lOm51bWJlcjsvL+WJjeaRh+aXtumXtC/luKdcclxuICAgIHByaXZhdGUgX2Nvb2xUaW1lOm51bWJlcjsvL+WQjuaRh+aXtumXtC/luKdcclxuICAgIHByaXZhdGUgX2N1clBvaW50Om51bWJlciA9IDA7Ly/lvZPliY3lt7Lnp6/ok4TnmoTngrnmlbBcclxuICAgIHByaXZhdGUgX3ZlbG9jaXR5Om51bWJlciA9IDE7Ly/lvZPliY3ntK/liqDpgJ/njoco54K55pWwL+W4pylcclxuXHJcbiAgICBwdWJsaWMgZ2V0IHJlYWR5KCk6Ym9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5fY3VyUG9pbnQgPj0gdGhpcy5fcHJlcFRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRpYygpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fY3VyUG9pbnQgKz0gdGhpcy5fdmVsb2NpdHk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjb29sQ29tcGxldGUoKTpib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJQb2ludCA+PSB0aGlzLl9wcmVwVGltZSt0aGlzLl9jb29sVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVmcmVzaCgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fY3VyUG9pbnQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIGtlZXBlciDnirbmgIHmnLrmiYDmnInogIVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioa2VlcGVyOiBBY3RvciwgcmVzOmFueSkge1xyXG4gICAgICAgIHRoaXMua2VlcGVyID0ga2VlcGVyO1xyXG4gICAgICAgIHRoaXMuY3VyU3RhdGUgPSBuZXcgV2FpdCgpO1xyXG4gICAgICAgIHRoaXMuc3RhdGVMaXN0LmVkaXQoU3RhdGVUeXBlLldBSVQsIHRoaXMuY3VyU3RhdGUpO1xyXG4gICAgICAgIHRoaXMuc3RhdGVMaXN0LmVkaXQoU3RhdGVUeXBlLlBSRVBBUkUsIG5ldyBQcmVwYXJlKCkpO1xyXG4gICAgICAgIHRoaXMuc3RhdGVMaXN0LmVkaXQoU3RhdGVUeXBlLkFGVEVSX0FUSywgbmV3IEFmdGVyQXRrKCkpO1xyXG4gICAgICAgIC8vdG9kbzogYWJvdXQgcmVzXHJcblxyXG4gICAgICAgIHRoaXMuX3ByZXBUaW1lID0gMzAwO1xyXG4gICAgICAgIHRoaXMuX2Nvb2xUaW1lID0gMzAwO1xyXG5cclxuICAgICAgICB0aGlzLnNlZWtlciA9IG5ldyBNYXBOb2RlU2Vla2VyKHRoaXMua2VlcGVyLnByb2ZpbGUuZ2V0Tm9kZVBvcygpLnBsdXMobmV3IFZlYzIoMywzKSksIHJlc1sneHh4J10sIDApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yi35paw5b2T5YmN54q25oCB77yM5q+P5bin6LCD55SoXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5jdXJTdGF0ZS5uYW1lKCkpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwicHQ6XCIgKyB0aGlzLl9jdXJQb2ludCk7XHJcbiAgICAgICAgdGhpcy5zZWVrZXIudXBkYXRlKCk7XHJcbiAgICAgICAgaWYgKHRoaXMua2VlcGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyU3RhdGUuZXhlY3V0ZSh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmlLnlj5jlvZPliY3nirbmgIHvvIzmlrDnirbmgIHkvJrph43nva7kuLrliJ3lp4vmgIFcclxuICAgICAqIEBwYXJhbSBzdGF0ZVR5cGUg5paw55qE54q25oCB57G75Z6LXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjaGFuZ2VTdGF0ZShzdGF0ZVR5cGU6IFN0YXRlVHlwZSkge1xyXG4gICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuc3RhdGVMaXN0LnJlYWQoc3RhdGVUeXBlKTtcclxuICAgICAgICBzdGF0ZS5yZXNldCgpO1xyXG4gICAgICAgIHRoaXMuY3VyU3RhdGUgPSBzdGF0ZTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiIsImltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCbG9ja2Vye1xyXG4gICAgY29uc3RydWN0b3Ioa2VlcGVyOkFjdG9yKXtcclxuICAgICAgICBcclxuICAgIH1cclxufSIsImltcG9ydCB7IEFjdG9yVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vRG9kS2V5XCI7XHJcbmltcG9ydCB7IFNlZWtlciB9IGZyb20gXCIuL0FjdG9yU2Vla2VyXCI7XHJcbmltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0RvZE1hdGhcIjtcclxuaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9BY3RvclwiO1xyXG5pbXBvcnQgUmhvZGVzR2FtZSBmcm9tIFwiLi4vLi4vUmhvZGVzR2FtZVwiO1xyXG5pbXBvcnQgeyBBcnJheUFsZ28gfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0RvZERhdGFTdHJ1Y3R1cmVcIjtcclxuXHJcbi8qKlxyXG4gKiDmraTlr7nosaHmmK/kuIDnp43lj6/ku6XooqvmlLvlh7vnirbmgIHmnLrlupTnlKjnmoRBY3RvcuaQnOe0ouWZqFxyXG4gKiDkuJPpl6jnlKjmnaXlr7nlupTlnLDlm77oioLngrnmkJzntKLmlYzkurrvvIjogIzpnZ7lubLlkZjvvIlcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNYXBOb2RlU2Vla2VyIGltcGxlbWVudHMgU2Vla2VyIHtcclxuXHJcbiAgICBwcml2YXRlIF9vcmlnaW46VmVjMjsvL+S4reW/g+S9jee9rlxyXG4gICAgcHJpdmF0ZSBfcm90YXRlOm51bWJlciA9IDA7Ly/pobrml7bpkojml4vovaw5MOW6pueahOasoeaVsO+8jOm7mOiupOS4ujBcclxuICAgIHByaXZhdGUgX3JlbGF0aXZlTm9kZUxpc3Q6VmVjMltdID0gW107Ly/pnIDopoHnm5HmjqfnmoTlnLDlm77oioLngrnnmoTnm7jlr7nkvY3nva5cclxuICAgIHByaXZhdGUgX2Fic29sdXRlTm9kZUxpc3Q6VmVjMltdID0gW107Ly/pnIDopoHnm5HmjqfnmoTlnLDlm77oioLngrnnmoTnu53lr7nkvY3nva5cclxuXHJcbiAgICBwcml2YXRlIF9mb2N1czpBY3RvcjsvL+mUgeWumueahOaVjOS6ulxyXG4gICAgcHJpdmF0ZSBfZm9jdXNDaGFuZ2VkOmJvb2xlYW4gPSBmYWxzZTsvL+mUgeWumueahOaVjOS6uuW3suS/ruaUuVxyXG4gICAgcHJpdmF0ZSBfY2FwdHVyZUxpc3Q6QWN0b3JbXS8v5o2V5o2J5Yiw55qE5pWM5Lq6XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRBYnNvbHV0ZSgpOnZvaWR7Ly/ph43mlrDorqHnrpfmiYDmnInpnIDopoHnm5HmjqfnmoTlnLDlm77oioLngrnnmoTnu53lr7nkvY3nva5cclxuICAgICAgICB0aGlzLl9hYnNvbHV0ZU5vZGVMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5fcmVsYXRpdmVOb2RlTGlzdC5mb3JFYWNoKGVsZT0+e1xyXG4gICAgICAgICAgICB0aGlzLl9hYnNvbHV0ZU5vZGVMaXN0LnB1c2godGhpcy5fb3JpZ2luLnBsdXMoZWxlKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3Iob3JpZ2luOlZlYzIsIHJlczphbnksIHJvdGF0ZTpudW1iZXIgPSAwKXtcclxuICAgICAgICAvL+i/memHjOeahHJlc+aYr+S4gOenjeS7o+ihqOaUu+WHu+iMg+WbtOexu+Wei+eahOaVsOaNrlxyXG4gICAgICAgIHRoaXMuX29yaWdpbiA9IG9yaWdpbjtcclxuICAgICAgICB0aGlzLl9yb3RhdGUgPSByb3RhdGU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy90ZXN0XHJcbiAgICAgICAgdGhpcy5fcmVsYXRpdmVOb2RlTGlzdC5wdXNoKG5ldyBWZWMyKDAsMCksIG5ldyBWZWMyKDEsMCksIG5ldyBWZWMyKDIsMCkpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5zZXRBYnNvbHV0ZSgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0Rm9jdXMoKTogQWN0b3Ige1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9mb2N1cztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Rm9jdXNMaXN0KGNvdW50OiBudW1iZXIpOiBBY3RvcltdIHtcclxuICAgICAgICAvL3RvZG86IOiAg+iZkeWcqGludGVyZmFjZeS4reenu+mZpOatpOmhuVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDYXB0dXJlTGlzdCgpOiBBY3RvcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2FwdHVyZUxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGZvbGxvd0FjdG9yKCk6IEFjdG9yIHtcclxuICAgICAgICAvL3RvZG86IOiAg+iZkeWcqGludGVyZmFjZeS4reenu+mZpOatpOmhuVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmb2N1c0NoYW5nZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZvY3VzQ2hhbmdlZDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICAvL+WIt+aWsOaNleaNieWIl+ihqFxyXG4gICAgICAgIHRoaXMuX2NhcHR1cmVMaXN0ID0gW107XHJcblxyXG4gICAgICAgIHRoaXMuX2Fic29sdXRlTm9kZUxpc3QuZm9yRWFjaChlbGU9PntcclxuICAgICAgICAgICAgbGV0IGxpc3Q6QWN0b3JbXSA9IFJob2Rlc0dhbWUuSW5zdGFuY2UuYmF0dGxlLm1hcE5vZGVDUFUubWF0cml4R2V0KGVsZSk7XHJcbiAgICAgICAgICAgIGxpc3QuZm9yRWFjaChlbGU9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NhcHR1cmVMaXN0LnB1c2goZWxlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NhcHR1cmVMaXN0ID0gQXJyYXlBbGdvLnNocmluayh0aGlzLl9jYXB0dXJlTGlzdCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/lpITnkIZmb2N1c1xyXG4gICAgICAgIGlmICggKHRoaXMuX2ZvY3VzID09IG51bGwgfHwgdGhpcy5fZm9jdXMgPT0gdW5kZWZpbmVkKSAmJiB0aGlzLl9jYXB0dXJlTGlzdC5sZW5ndGggPiAwKSB7Ly/lvZPliY3ml6DmjZXmjYnnm67moIfvvIzkuJRjYXB0dXJlTGlzdOS4reacieebruagh1xyXG4gICAgICAgICAgICB0aGlzLl9mb2N1cyA9IHRoaXMuX2NhcHR1cmVMaXN0WzBdO1xyXG4gICAgICAgICAgICB0aGlzLl9mb2N1c0NoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fY2FwdHVyZUxpc3QuaW5kZXhPZih0aGlzLl9mb2N1cykgPT0gLTEpIHsvL+W9k+WJjeaNleaNieebruagh+S4jeWcqGNhcHR1cmVMaXN05LitXHJcbiAgICAgICAgICAgIHRoaXMuX2ZvY3VzID0gdGhpcy5fY2FwdHVyZUxpc3RbMF07XHJcbiAgICAgICAgICAgIHRoaXMuX2ZvY3VzQ2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHsvL+aNleaNieebruagh+acquaUueWPmFxyXG4gICAgICAgICAgICB0aGlzLl9mb2N1c0NoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3RvclN0YXRlQmFzZSB7XHJcbiAgICBwcm90ZWN0ZWQgX2FjdG9yOiBBY3RvcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhY3RvcjogQWN0b3IpIHtcclxuICAgICAgICB0aGlzLl9hY3RvciA9IGFjdG9yO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnRlcigpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxlYXZlKCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEFjdG9yU3RhdGVCYXNlIGZyb20gXCIuL0FjdG9yU3RhdGVCYXNlXCI7XHJcblxyXG4vKipcclxuICog5pWM5Lq655qE6KKr6Zi75oyh54q25oCB44CB5bmy5ZGY55qE5LiA6Iis54q25oCBXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQWN0b3JTdGF0ZUZpZ2h0IGV4dGVuZHMgQWN0b3JTdGF0ZUJhc2V7XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOnZvaWR7XHJcbiAgICAgICAgLy90b2RvOiDosIPnlKjmlLvlh7vnirbmgIHmnLrnmoTluKflvqrnjq9cclxuICAgICAgICAvKlxyXG5cclxuICAgICAgICAqL1xyXG4gICAgICAgdGhpcy5fYWN0b3IuYXRrLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEFjdG9yU3RhdGVCYXNlIGZyb20gXCIuL0FjdG9yU3RhdGVCYXNlXCI7XHJcbmltcG9ydCBEb2RMb2cgZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Eb2RMb2dcIjtcclxuaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9BY3RvclwiO1xyXG5pbXBvcnQgeyBBY3RvclN0YXRlV2FsayB9IGZyb20gXCIuL0FjdG9yU3RhdGVXYWxrXCI7XHJcbmltcG9ydCB7IEFjdG9yU3RhdGVQcmVwYXJlZCB9IGZyb20gXCIuL0FjdG9yU3RhdGVQcmVwYXJlZFwiO1xyXG5pbXBvcnQgeyBBY3RvclN0YXRlRmlnaHQgfSBmcm9tIFwiLi9BY3RvclN0YXRlRmlnaHRcIjtcclxuXHJcbmV4cG9ydCBlbnVtIEFjdG9yU3RhdGVJRCB7XHJcbiAgICBOb25lLFxyXG4gICAgUHJlcGFyZWQsICAgICAvL+W+heacuiAo5pyq5Ye65YqoL+acqumDqOe9sikgIFxyXG4gICAgQm9ybiwgICAvL+WHuueUn+WKqOeUuyDkuI3lj6/mlLvlh7sg5LiN5Y+v6KKr5pS75Ye7XHJcbiAgICBXYWxrLCAgIC8v56e75YqoIOaVjOS6uueUqFxyXG4gICAgU3R1bm5lZCwgICAgLy/mmZXnnKkgZXRjIO+8iOaJk+aWreWKqOS9nOeahOiiq+aOp+WItueKtuaAge+8iVxyXG4gICAgRnJlZXplZCwgICAgLy/lhrDlhrsg77yI5LiN5omT5pat5Yqo5L2c55qE6KKr5o6n5Yi254q25oCB77yJXHJcbiAgICBGaWdodCwgIC8v5pmu5pS754q25oCBIOW5suWRmOW4uOaAgSDmlYzkurrooqvpmLvmjKHlkI5cclxuICAgIERlYXRoLCAgLy/mrbvkuqHliqjnlLsg5LiN5Y+v5pS75Ye7IOS4jeWPr+iiq+aUu+WHu1xyXG4gICAgRXNjYXBlLCAvL+aVjOS6uumAg+iEsVxyXG4gICAgQ291bnRcclxufVxyXG5cclxuLypcclxuICog6KeS6Imy54q25oCB5py6IOeuoeeQhuinkuiJsuaJgOWkhOmYtuautSDmoLnmja7kuI3lkIzpmLbmrrXlhrPlrprkuI3lkIznmoTnu4Tku7bnirbmgIFcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjdG9yU3RhdGVNZ3Ige1xyXG4gICAgcHJpdmF0ZSBfc3RhdGVzOiBBY3RvclN0YXRlQmFzZVtdID0gW107XHJcbiAgICBwcml2YXRlIF9jdXJyZW50U3RhdGU6IEFjdG9yU3RhdGVCYXNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFjdG9yOiBBY3Rvcikge1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fc3RhdGVzW0FjdG9yU3RhdGVJRC5XYWxrXSA9IG5ldyBBY3RvclN0YXRlV2FsayhhY3Rvcik7XHJcbiAgICAgICAgdGhpcy5fc3RhdGVzW0FjdG9yU3RhdGVJRC5QcmVwYXJlZF0gPSBuZXcgQWN0b3JTdGF0ZVByZXBhcmVkKGFjdG9yKTtcclxuICAgICAgICB0aGlzLl9zdGF0ZXNbQWN0b3JTdGF0ZUlELkZpZ2h0XSA9IG5ldyBBY3RvclN0YXRlRmlnaHQoYWN0b3IpO1xyXG4gICAgICAgIC8vVE9ET1xyXG4gICAgICAgIC8v5Y+C54Wn5ri45oiP5aSn54q25oCB5py6XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBpbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucnVuU3RhdGUoQWN0b3JTdGF0ZUlELk5vbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBydW5TdGF0ZShzdGF0ZUlEOiBBY3RvclN0YXRlSUQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoQWN0b3JTdGF0ZUlELkNvdW50IDw9IHN0YXRlSUQgfHwgc3RhdGVJRCA8PSBBY3RvclN0YXRlSUQuTm9uZSkge1xyXG4gICAgICAgICAgICBEb2RMb2cuZXJyb3IoYEdhbWVTdGF0ZU1nci5ydW5TdGF0ZTogSW52YWxpZCBzdGF0ZUlEIFske3N0YXRlSUR9XS4gYCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChudWxsICE9IHRoaXMuX2N1cnJlbnRTdGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUubGVhdmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZSA9IHRoaXMuX3N0YXRlc1tzdGF0ZUlEXTtcclxuICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUuZW50ZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChudWxsICE9IHRoaXMuX2N1cnJlbnRTdGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUudXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAobnVsbCAhPSB0aGlzLl9jdXJyZW50U3RhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlLmxlYXZlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3N0YXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLl9zdGF0ZXNbaV07XHJcbiAgICAgICAgICAgIHN0YXRlLnJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEFjdG9yU3RhdGVCYXNlIGZyb20gXCIuL0FjdG9yU3RhdGVCYXNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQWN0b3JTdGF0ZVByZXBhcmVkIGV4dGVuZHMgQWN0b3JTdGF0ZUJhc2V7XHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6dm9pZHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlBlcnBhcmVkIHVwZGF0ZVwiKVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEFjdG9yU3RhdGVCYXNlIGZyb20gXCIuL0FjdG9yU3RhdGVCYXNlXCI7XHJcbmltcG9ydCB7IEFjdG9yVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vRG9kS2V5XCI7XHJcbmltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0RvZE1hdGhcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBY3RvclN0YXRlV2FsayBleHRlbmRzIEFjdG9yU3RhdGVCYXNle1xyXG4gICAgXHJcbiAgICBwdWJsaWMgZW50ZXIoKTp2b2lke1xyXG4gICAgICAgIC8v5LiN5bqU6K+l5Zyo6L+Z5Liq54q25oCB6YeM77yM5bqU6K+l5ZyoYm9ybumHjOi/m+ihjGRlcGxveVxyXG4gICAgICAgIHRoaXMuX2FjdG9yLnJlbmRlci5kZXBsb3koKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIHVwZGF0ZSgpOnZvaWR7XHJcblxyXG4gICAgICAgIGxldCBhY3RvciA9IHRoaXMuX2FjdG9yO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fYWN0b3IudHJhbnNmb3JtLnBvcy5hcnJpdmVkICYmIDEgPCAwKSB7Ly/lt7LliLDovr7nm67nmoTlnLAo5pqC5pe25bGP6JS9KVxyXG4gICAgICAgICAgICBpZiAoYWN0b3Iucm91dGUubmV4dCgpKSB7Ly/lrZjlnKjkuIvkuIDkuKrnm67moIfoioLngrlcclxuICAgICAgICAgICAgICAgIGFjdG9yLnRyYW5zZm9ybS5wb3Muc2V0VGFyZ2V0KGFjdG9yLnJvdXRlLmN1cnJlbnRUYXJnZXQoKSk7Ly/lsIbnm67moIfmm7/mjaLkuLrkuIvkuIDkuKrnm67moIfoioLngrlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vdG9kbzog5pWM5Lq65bey5Yiw6L6+57uI54K5XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFjdG9yLnRyYW5zZm9ybS5wb3Muc2V0VGFyZ2V0KG5ldyBWZWMyKExheWEuc3RhZ2UubW91c2VYLTUwLCBMYXlhLnN0YWdlLm1vdXNlWS01MCkpO1xyXG4gICAgICAgIGFjdG9yLnRyYW5zZm9ybS5wb3Muc2V0U3BlZWQoMjApO1xyXG5cclxuICAgICAgICBhY3Rvci50cmFuc2Zvcm0ucG9zLm1vdmUoKTsvL+enu+WKqFxyXG4gICAgICAgIGFjdG9yLmNvbGlFbWl0LnBvc0J5VmVjKGFjdG9yLnRyYW5zZm9ybS5wb3MuZGF0YSk7Ly/np7vliqjnorDmkp7nrrFcclxuICAgICAgICBhY3Rvci5jb2xpRW1pdC5ldmVudChhY3RvciwgYWN0b3IudHlwZSk7Ly/lj5HluIPnorDmkp7kuovku7ZcclxuICAgICAgICBhY3Rvci5yZW5kZXIubW92ZShhY3Rvci50cmFuc2Zvcm0ucG9zLmRhdGEpOy8v56e75Yqo5Y+v6KeG5a+56LGhXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9BY3Rvci9BY3RvclwiO1xyXG5pbXBvcnQge015U3ltYm9sfSBmcm9tIFwiLi4vLi4vRml4L0ZpeFN5bWJvbFwiO1xyXG5pbXBvcnQge0NpcmNsZUNvbGxpc2lvblJhbmdlfSBmcm9tIFwiLi9Db2xsaXNpb25SYW5nZVwiO1xyXG5cclxuXHJcbi8qKlxyXG4gKiDnorDmkp7lpITnkIblmajvvIzor6Xnsbvnu7TmiqTkuIDkuKpNYXDvvIxNYXDorrDlvZXmiYDmnInpnIDopoHov5vooYznorDmkp7lpITnkIbnmoTnorDmkp7lmajvvIxNYXDnlKjnorDmkp7lmajnmoTllK/kuIDmoIfor4bkvZzkuLrplK7ku6Xpgb/lhY3ph43lpI3orrDlvZXjgIJcclxuICpcclxuICog6K+l57G75o+Q5L6b5LiA5LiqcmVjYWxjdWxhdGXmlrnms5XnlKjkuo7ph43mlrDorqHnrpfnorDmkp7mg4XlhrXvvIzlr7nkuo5NYXDkuK3nmoTmr4/kuKrlpITnkIblr7nosaHvvIzor6Xmlrnms5XorqHnrpflhbbkuI5NYXDkuK3nmoTmiYDmnInlhbbku5blr7nosaFcclxuICog55qE6YeN5Y+g5oOF5Ya177yM5bm25bCG6L+Z5Lqb6YeN5Y+g55qE5YW25LuW5a+56LGh5Lul5YiX6KGo55qE5b2i5byP5Lyg6YCS57uZ6K+l5aSE55CG5a+56LGh44CCXHJcbiAqXHJcbiAqIGJ5IFhXVlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFjdG9yQ29sbGlzaW9uUHJvY2Vzc29yIHtcclxuXHJcbiAgICBwcml2YXRlIGNvbGxpZGVyTWFwOiB7IFtrZXk6IG51bWJlcl06IEFjdG9yQ29sbGlkZXIgfSA9IHt9O1xyXG5cclxuICAgIHB1YmxpYyByZWdpc3RlckNvbGxpZGVyKGNvbGxpZGVyOiBBY3RvckNvbGxpZGVyKSB7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlck1hcFtjb2xsaWRlci5zeW1ib2wuZGF0YV0gPSBjb2xsaWRlcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdW5yZWdpc3RlckNvbGxpZGVyKGNvbGxpZGVyOiBBY3RvckNvbGxpZGVyKSB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuY29sbGlkZXJNYXBbY29sbGlkZXIuc3ltYm9sLmRhdGFdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmNvbGxpZGVyTWFwKSB7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXRDb2xsaWRlciA9IHRoaXMuY29sbGlkZXJNYXBbaV07XHJcbiAgICAgICAgICAgIGxldCBjb2xsaWRpbmdMaXN0ID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogaW4gdGhpcy5jb2xsaWRlck1hcCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbGxpZGVyID0gdGhpcy5jb2xsaWRlck1hcFtqXTtcclxuICAgICAgICAgICAgICAgIGlmIChjb2xsaWRlciA9PSB0YXJnZXRDb2xsaWRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldENvbGxpZGVyLnNob3VsZENvbGxpZGVXaXRoKGNvbGxpZGVyKSAmJiB0YXJnZXRDb2xsaWRlci5nZXRDb2xsaXNpb25SYW5nZSgpLmlzQ29pbmNpZGVXaXRoUmFuZ2UoY29sbGlkZXIuZ2V0Q29sbGlzaW9uUmFuZ2UoKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xsaWRpbmdMaXN0LnB1c2goY29sbGlkZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRhcmdldENvbGxpZGVyLm9uQ29sbGlkaW5nTGlzdFJlZnJlc2goY29sbGlkaW5nTGlzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBY3RvckNvbGxpZGVyIHtcclxuICAgIC8v5ZSv5LiA5qCH6K+GXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgc3ltYm9sOiBNeVN5bWJvbCA9IG5ldyBNeVN5bWJvbCgpO1xyXG5cclxuICAgIC8v6I635Y+W56Kw5pKe6IyD5Zu0XHJcbiAgICBhYnN0cmFjdCBnZXRDb2xsaXNpb25SYW5nZSgpOiBDaXJjbGVDb2xsaXNpb25SYW5nZSA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDph43orr7norDmkp7ojIPlm7RcclxuICAgICAqIEBwYXJhbSByYW5nZSDmlrDnmoTnorDmkp7ojIPlm7RcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3Qgc2V0Q29sbGlzaW9uUmFuZ2UocmFuZ2U6IENpcmNsZUNvbGxpc2lvblJhbmdlKTtcclxuXHJcbiAgICAvL+iOt+WPlueisOaSnuWZqOeahOaJgOacieiAhVxyXG4gICAgYWJzdHJhY3QgZ2V0QWN0b3IoKTogQWN0b3I7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnorDmkp7liJfooajpnIDopoHliLfmlrBcclxuICAgICAqIEBwYXJhbSBjb2xsaWRpbmdMaXN0IOaWsOeahOeisOaSnuWIl+ihqFxyXG4gICAgICogKi9cclxuICAgIGFic3RyYWN0IG9uQ29sbGlkaW5nTGlzdFJlZnJlc2goY29sbGlkaW5nTGlzdDogQWN0b3JDb2xsaWRlcltdKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpuW6lOivpeS4juaMh+WumueisOaSnuWZqOWPkeeUn+eisOaSnlxyXG4gICAgICogQHBhcmFtIGNvbGxpZGVyIOWPpuS4gOS4queisOaSnuWZqFxyXG4gICAgICogKi9cclxuICAgIGFic3RyYWN0IHNob3VsZENvbGxpZGVXaXRoKGNvbGxpZGVyOiBBY3RvckNvbGxpZGVyKTogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOW9k+WJjeeisOaSnuWIl+ihqFxyXG4gICAgICogKi9cclxuICAgIGFic3RyYWN0IGdldENvbGxpZGluZ0xpc3QoKTogQWN0b3JDb2xsaWRlcltdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yi35paw56Kw5pKe6IyD5Zu077yM5L2/5YW26Lef6ZqP5omA5pyJ6ICF56e75YqoXHJcbiAgICAgKiAqL1xyXG4gICAgYWJzdHJhY3QgcmVmcmVzaENvbGxpc2lvblJhbmdlRm9sbG93QWN0b3IoKTtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTaW1wbGVBY3RvckNvbGxpZGVyIGV4dGVuZHMgQWN0b3JDb2xsaWRlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBjb2xsaWRpbmdMaXN0OiBBY3RvckNvbGxpZGVyW10gPSBbXTtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgYWN0b3I6IEFjdG9yO1xyXG4gICAgcHJpdmF0ZSByYW5nZTogQ2lyY2xlQ29sbGlzaW9uUmFuZ2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYWN0b3I6IEFjdG9yLCByYW5nZTogQ2lyY2xlQ29sbGlzaW9uUmFuZ2UpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuYWN0b3IgPSBhY3RvcjtcclxuICAgICAgICB0aGlzLnJhbmdlID0gcmFuZ2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldENvbGxpc2lvblJhbmdlKCk6IENpcmNsZUNvbGxpc2lvblJhbmdlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yYW5nZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDb2xsaXNpb25SYW5nZShyYW5nZTogQ2lyY2xlQ29sbGlzaW9uUmFuZ2UpIHtcclxuICAgICAgICB0aGlzLnJhbmdlID0gcmFuZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QWN0b3IoKTogQWN0b3Ige1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFjdG9yO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENvbGxpZGluZ0xpc3QoKTogQWN0b3JDb2xsaWRlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb2xsaWRpbmdMaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ29sbGlkaW5nTGlzdFJlZnJlc2goY29sbGlkaW5nTGlzdDogQWN0b3JDb2xsaWRlcltdKSB7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRpbmdMaXN0ID0gY29sbGlkaW5nTGlzdDtcclxuICAgIH1cclxuXHJcblxyXG59IiwiaW1wb3J0IHsgQ29saVJlY2VpdmVyLCBDb2xpRW1pdCB9IGZyb20gXCIuLi9BY3Rvci9BY3Rvck1vZHVsZXMvQ29saU1lc3NhZ2VcIjtcclxuaW1wb3J0IHsgVmVjMiB9IGZyb20gXCIuLi8uLi9Db21tb24vRG9kTWF0aFwiO1xyXG5pbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yL0FjdG9yXCI7XHJcbmltcG9ydCB7IEFycmF5QWxnbyB9IGZyb20gXCIuLi8uLi9Db21tb24vRG9kRGF0YVN0cnVjdHVyZVwiO1xyXG5pbXBvcnQgeyBBY3RvclR5cGUgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL0RvZEtleVwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbGlSZXBvcnRlciBleHRlbmRzIENvbGlSZWNlaXZlciB7XHJcbiAgICBwdWJsaWMgaW5MaXN0OiBWZWMyW10gPSBbXTtcclxuICAgIHB1YmxpYyBsYXllcjogTGF5YS5TcHJpdGUgPSBuZXcgTGF5YS5TcHJpdGUoKTtcclxuXHJcbiAgICBwcml2YXRlIF9tYXRyaXg6IEFjdG9yW11bXVtdID0gW107Ly/lrZjlgqjmr4/kuKrlnLDlm77oioLngrnkuK3nmoRBY3RvcuWvueixoVxyXG5cclxuICAgIHByaXZhdGUgbWF0cml4QWRkKHBvczpWZWMyLCBhY3RvcjpBY3Rvcik6dm9pZHtcclxuICAgICAgICB0aGlzLl9tYXRyaXhbcG9zLnhdW3Bvcy55XS5wdXNoKGFjdG9yKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1hdHJpeFJlbW92ZShwb3M6VmVjMiwgYWN0b3I6QWN0b3IpOnZvaWR7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9tYXRyaXhbcG9zLnhdW3Bvcy55XS5pbmRleE9mKGFjdG9yKTtcclxuICAgICAgICBpZiAoaW5kZXggIT0gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWF0cml4W3Bvcy54XVtwb3MueV0uc3BsaWNlKGluZGV4LDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbWF0cml4R2V0KHBvczpWZWMyKTpBY3Rvcltde1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXRyaXhbcG9zLnhdW3Bvcy55XTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigxMCwgMTApO1xyXG4gICAgICAgIGZvciAobGV0IHcgPSAwOyB3IDwgMTA7IHcgKz0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXRyaXhbd10gPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaCA9IDA7IGggPCAxMDsgaCArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldERldGVjdGlvbihuZXcgVmVjMih3LCBoKSwgYCR7QWN0b3JUeXBlLk1vbnN0ZXJ9YCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXRyaXhbd11baF0gPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLmxheWVyKTtcclxuICAgICAgICB0aGlzLmxheWVyLnpPcmRlciA9IC0xMDtcclxuICAgICAgICB0aGlzLmxheWVyLnBvcyg1MCw1MCk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW50cmUoYWN0b3I6IEFjdG9yLCBwb3M6IFZlYzIpOiB2b2lkIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkVudGVyXCIgKyBwb3MueCArIFwifFwiICsgcG9zLnkpO1xyXG4gICAgICAgIHRoaXMuaW5MaXN0LnB1c2gocG9zKTtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgIHRoaXMubWF0cml4QWRkKHBvcyxhY3Rvcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTGVhdmUoYWN0b3I6IEFjdG9yLCBwb3M6IFZlYzIpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IEFycmF5QWxnby5maW5kRWxlKHBvcywgdGhpcy5pbkxpc3QpO1xyXG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5pbkxpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICB0aGlzLm1hdHJpeFJlbW92ZShwb3MsYWN0b3IpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiTGVhdmVcIiArIHBvcy54ICsgXCJ8XCIgKyBwb3MueSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbmRlcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxheWVyLmdyYXBoaWNzLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5pbkxpc3QuZm9yRWFjaChlbGUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyLmdyYXBoaWNzLmRyYXdSZWN0KGVsZS54ICogQ29saUVtaXQuR0xPQkFMX1VOSVRfV0lEVEggKyAxLFxyXG4gICAgICAgICAgICAgICAgZWxlLnkgKiBDb2xpRW1pdC5HTE9CQUxfVU5JVF9IRUlHSFQgKyAxLFxyXG4gICAgICAgICAgICAgICAgQ29saUVtaXQuR0xPQkFMX1VOSVRfV0lEVEggLSAyLFxyXG4gICAgICAgICAgICAgICAgQ29saUVtaXQuR0xPQkFMX1VOSVRfSEVJR0hUIC0gMixcclxuICAgICAgICAgICAgICAgIFwiI2ZmMDAwMFwiXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEdhbWVNYXAgZnJvbSBcIi4vR2FtZUxldmVsXCI7XHJcbmltcG9ydCB7IEFjdG9yQ29sbGlzaW9uUHJvY2Vzc29yIH0gZnJvbSBcIi4vQ29sbGlzaW9uL0FjdG9yQ29sbGlzaW9uUHJvY2Vzc29yXCI7XHJcbmltcG9ydCBHYW1lTGV2ZWwgZnJvbSBcIi4vR2FtZUxldmVsXCI7XHJcbmltcG9ydCBEb2RSZXNvdXJjZU1nciBmcm9tIFwiLi4vUmVzb3VyY2VzL0RvZFJlc291cmNlTWdyXCI7XHJcbmltcG9ydCBBY3Rvck1nciBmcm9tIFwiLi9BY3Rvci9BY3Rvck1nclwiO1xyXG5pbXBvcnQgQ29saVJlcG9ydGVyIGZyb20gXCIuL0NvbGxpc2lvbi9Db2xpUmVwb3J0ZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVCYXR0bGUge1xyXG4gICAgcHVibGljIGxldmVsOiBHYW1lTGV2ZWw7XHJcbiAgICBwdWJsaWMgbWFwOiBHYW1lTWFwO1xyXG4gICAgcHVibGljIGFjdG9yTWdyOiBBY3Rvck1ncjtcclxuXHJcbiAgICBwdWJsaWMgY29sbGlzaW9uOiBBY3RvckNvbGxpc2lvblByb2Nlc3NvcjsvL+i0n+i0o+WchuW9oueisOaSnuajgOa1i1xyXG4gICAgcHVibGljIG1hcE5vZGVDUFU6IENvbGlSZXBvcnRlciA9IG5ldyBDb2xpUmVwb3J0ZXIoKTsvL+i0n+i0o+WcsOWbvuiKgueCueeisOaSnuajgOa1i1xyXG5cclxuICAgIHByaXZhdGUgX2xldmVsUHJlcGFyZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5sZXZlbCA9IG5ldyBHYW1lTGV2ZWwoKTtcclxuICAgICAgICB0aGlzLm1hcCA9IG5ldyBHYW1lTWFwKCk7XHJcbiAgICAgICAgdGhpcy5hY3Rvck1nciA9IG5ldyBBY3Rvck1ncigpO1xyXG5cclxuICAgICAgICB0aGlzLmNvbGxpc2lvbiA9IG5ldyBBY3RvckNvbGxpc2lvblByb2Nlc3NvcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwcmVwYXJlTGV2ZWwoKTogdm9pZCB7XHJcbiAgICAgICAgLy9UT0RPIGluaXQgbGV2ZWwgaW5mb3JtYXRpb25cclxuICAgICAgICBsZXQgcmVzID0gRG9kUmVzb3VyY2VNZ3IuSW5zdGFuY2UuZ2V0Q3VycmVudExldmVsUmVzKCk7XHJcblxyXG4gICAgICAgIC8vdGVzdFxyXG4gICAgICAgIHJlcyA9IHtsZXZlbDoxLG1hcDoyfTtcclxuXHJcbiAgICAgICAgdGhpcy5sZXZlbC5pbml0KHJlc1snbGV2ZWwnXSk7IC8vanVzdCBzYW1wbGVcclxuICAgICAgICB0aGlzLm1hcC5pbml0KHJlc1snbWFwJ10pO1xyXG4gICAgICAgIHRoaXMuYWN0b3JNZ3IuaW5pdChyZXNbJ21hcCddKTtcclxuXHJcbiAgICAgICAgLy9BTkQgRE9OVCBGT1JHRVQgUkVTRVQgTEFTVCBCQVRUTEUgREFUQSBSRU1BSU5TLiBcclxuICAgICAgICAvL3RoaXMuY29sbGlzaW9uLnJlc2V0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2xldmVsUHJlcGFyZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0xldmVsUHJlcHJhcmVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sZXZlbFByZXBhcmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICAvL1RPRE9cclxuICAgICAgICAvL0NMRUFSIExBU1QgQkFUVExFIFJFU09VUkNFXHJcbiAgICAgICAgdGhpcy5fbGV2ZWxQcmVwYXJlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUJhdHRsZUNvbnN0IHtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgc3RhbmRhcmRDb3N0SW5jcmVhc2VSYXRpbzogbnVtYmVyID0gMTtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgbWF4Q29zdE51bTogbnVtYmVyID0gOTk7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGluaXRDb3N0TnVtOiBudW1iZXIgPSA2O1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBsaWZlUG9pbnQ6IG51bWJlciA9IDM7XHJcbn0iLCJpbXBvcnQgeyBCdWZmIH0gZnJvbSBcIi4vQWN0b3IvQWN0b3JNb2R1bGVzL0J1ZmZcIjtcclxuaW1wb3J0IHsgRXZlbnRDZW50cmUgfSBmcm9tIFwiLi4vRXZlbnQvRXZlbnRDZW50cmVcIjtcclxuaW1wb3J0IEZpeFRpbWUgZnJvbSBcIi4uL0ZpeC9GaXhUaW1lXCI7XHJcbmltcG9ydCBEb2RSZXNvdXJjZU1nciBmcm9tIFwiLi4vUmVzb3VyY2VzL0RvZFJlc291cmNlTWdyXCI7XHJcbmltcG9ydCBHYW1lQmF0dGxlQ29uc3QgZnJvbSBcIi4vR2FtZUJhdHRsZUNvbnN0XCI7XHJcbi8qKlxyXG4gKiDmqKHlnZfor7TmmI46IOa4uOaIj+aImOaWl+WcsOWbvuaooeWdlyAgXHJcbiAqIOi0n+i0o+WGheWuuTog5Zyw5Zu+5bGe5oCn6K6+572u77yM5YWo5bGAYnVmZueuoeeQhiAgXHJcbiAqIOi0n+i0o+S6ujog6ZO25Y2OICBcclxuICog5pe26Ze0OiAyMDIw5bm0M+aciDPml6UxMjo0NTo0MSAgXHJcbiAqL1xyXG5cclxuLy9LUjog5YWo5bGA55Sx5YWz5Y2h5qih5Z2X566h55CGIEDpk7bljY5cclxuLy/ov5nph4zlj6/ku6XljIXlkKvlhajlsYDnmoTosIPmlbTlgLwv55Sf5ZG95YC8L+a2qOi0uVxyXG4vL+WFqOa4uOaIj+agh+WHhuWAvOS9v+eUqOW4uOmHj+WumuS5ieWcqEJhdHRsZUNvbnN057G75LitIOekuuS+i+WPr+S7peeci+S4i+aWuVxyXG4vL+WPpu+8muengeacieaIkOWRmOWRveWQjeivt+WcqOWJjemdouWKoOS4i+WIkue6vyDlo7DmmI7nmoTmiJDlkZjor7flnKjmnoTpgKDlh73mlbDkuK3lhajpg6jliJ3lp4vljJbkuIDkuKrlgLzvvIzpmLLmraJ1bmRlZmluZWQo6YeO5oyH6ZKIKeeahOaDheWGteWPkeeUn1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUxldmVse1xyXG4gICAgcHJpdmF0ZSBfaW5pdGlhbENvc3Q6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfY3VycmVudENvc3Q6bnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgX2xpZmVQb2ludDpudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfdGltZUxpbmU6bnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgX2dsb2JhbEJ1ZmZMaXN0OiBCdWZmW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLl9pbml0aWFsQ29zdCA9IDA7XHJcbiAgICAgICAgdGhpcy5fY3VycmVudENvc3QgPSAwO1xyXG4gICAgICAgIHRoaXMuX2xpZmVQb2ludCA9IDA7XHJcbiAgICAgICAgdGhpcy5fdGltZUxpbmUgPSAwO1xyXG4gICAgICAgIHRoaXMuX2dsb2JhbEJ1ZmZMaXN0ID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXQocmVzOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICAvL2ZvciBleGFtcGxlXHJcbiAgICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgICAgIHRoaXMuX2luaXRpYWxDb3N0ID0gdGhpcy5fY3VycmVudENvc3QgPSByZXNbJ2luaXRDb3N0J10gfHwgR2FtZUJhdHRsZUNvbnN0LmluaXRDb3N0TnVtO1xyXG4gICAgICAgIHRoaXMuX2xpZmVQb2ludCA9IHJlc1snbGlmZSddIHx8IEdhbWVCYXR0bGVDb25zdC5saWZlUG9pbnQ7XHJcbiAgICAgICAgdGhpcy5fdGltZUxpbmUgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuZ2V0R2xvYmFsQnVmZkxpc3QoKTtcclxuICAgICAgICB0aGlzLl91cGRhdGVUaW1lKCk7IFxyXG4gICAgICAgIHRoaXMuX3VwZGF0ZUNvc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0R2xvYmFsQnVmZkxpc3QoKTpCdWZmW117XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dsb2JhbEJ1ZmZMaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGFuZ2VDb3N0KCk6dm9pZHtcclxuICAgICAgICAvL3RvZG8uLi4uXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfdXBkYXRlVGltZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl90aW1lTGluZSArPSBGaXhUaW1lLmRlbHRhVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF91cGRhdGVDb3N0KCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fZ2xvYmFsQnVmZkxpc3Quc3BsaWNlKDAsIHRoaXMuX2dsb2JhbEJ1ZmZMaXN0Lmxlbmd0aCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IERvZExvZyBmcm9tIFwiLi4vQ29tbW9uL0RvZExvZ1wiO1xyXG5pbXBvcnQgR2FtZVN0YXRlTWdyIGZyb20gXCIuL1N0YXRlL0dhbWVTdGF0ZU1nclwiO1xyXG5pbXBvcnQgR2FtZUJhdHRsZSBmcm9tIFwiLi9HYW1lQmF0dGxlXCI7XHJcbmltcG9ydCBHYW1lTG9iYnkgZnJvbSBcIi4vTG9iYnkvR2FtZUxvYmJ5XCI7XHJcblxyXG4vKipcclxuICog6L+Z5piv5ri45oiP5pys5L2TXHJcbiAqIOivtOS4gOS6m1Job2Rlc19HYW1l5paH5Lu25aS55LiL55qE5rOo6YeK6KeE5YiZ77yM5pa55L6/5Lul5ZCOY3RybCtmXHJcbiAqXHJcbiAqIDEuLy9AdG9kbyDmoIfms6jpnIDopoHlrozlloTnmoTpg6jliIZcclxuICpcclxuICogMi4vL0B0b2ZpeCDmoIfms6jlt7Lnn6XmnInpl67popjnmoTpg6jliIZcclxuICpcclxuICogMy4vL0B0ZXN0IOagh+azqOS7heS+m+a1i+ivleS9v+eUqOeahOmDqOWIhlxyXG4gKlxyXG4gKiAzLi8vQHJlZGNhbGwg5qCH5rOo6LCD55So5riy5p+T5qih5Z2X55qE6YOo5YiGXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSaG9kZXNHYW1lIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogUmhvZGVzR2FtZTtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IEluc3RhbmNlKCk6IFJob2Rlc0dhbWUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZSB8fCAodGhpcy5faW5zdGFuY2UgPSBuZXcgdGhpcygpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGVNZ3I6IEdhbWVTdGF0ZU1ncjtcclxuICAgIHB1YmxpYyBiYXR0bGU6IEdhbWVCYXR0bGU7XHJcbiAgICBwdWJsaWMgbG9iYnk6IEdhbWVMb2JieTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5iYXR0bGUgPSBuZXcgR2FtZUJhdHRsZSgpO1xyXG4gICAgICAgIHRoaXMuc3RhdGVNZ3IgPSBuZXcgR2FtZVN0YXRlTWdyKHRoaXMuYmF0dGxlKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXRlTWdyLmluaXQoKTtcclxuICAgICAgICBEb2RMb2cuZGVidWcoYFJob2Rlc0dhbWU6IGluaXRpYWxpemF0aW9uIGNvbXBsZXRlLiBgKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZU1nci51cGRhdGUoKTtcclxuICAgIH1cclxuXHJcblxyXG59IiwiaW1wb3J0IEdhbWVCYXR0bGUgZnJvbSBcIi4uL0dhbWVCYXR0bGVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTdGF0ZUJhc2Uge1xyXG4gICAgcHJvdGVjdGVkIF9iYXR0bGU6IEdhbWVCYXR0bGU7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYmF0dGxlOiBHYW1lQmF0dGxlKSB7XHJcbiAgICAgICAgdGhpcy5fYmF0dGxlID0gYmF0dGxlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnRlcigpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxlYXZlKCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEdhbWVTdGF0ZUJhc2UgZnJvbSBcIi4vR2FtZVN0YXRlQmFzZVwiO1xyXG5pbXBvcnQgUmhvZGVzR2FtZSBmcm9tIFwiLi4vUmhvZGVzR2FtZVwiO1xyXG5pbXBvcnQgR2FtZUJhdHRsZSBmcm9tIFwiLi4vR2FtZUJhdHRsZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVN0YXRlQmF0dGxlIGV4dGVuZHMgR2FtZVN0YXRlQmFzZXtcclxuICAgIGNvbnN0cnVjdG9yKGJhdHRsZTpHYW1lQmF0dGxlKSB7XHJcbiAgICAgICAgc3VwZXIoYmF0dGxlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW50ZXIoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuZW50ZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbGVhdmUoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIubGVhdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIucmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLnVwZGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuX2JhdHRsZS5hY3Rvck1nci51cGRhdGUoKTtcclxuICAgICAgICB0aGlzLl9iYXR0bGUubWFwLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEdhbWVTdGF0ZUJhc2UgZnJvbSBcIi4vR2FtZVN0YXRlQmFzZVwiO1xyXG5pbXBvcnQgUmhvZGVzR2FtZSBmcm9tIFwiLi4vUmhvZGVzR2FtZVwiO1xyXG5pbXBvcnQgRG9kUmVzb3VyY2VNZ3IgZnJvbSBcIi4uLy4uL1Jlc291cmNlcy9Eb2RSZXNvdXJjZU1nclwiO1xyXG5pbXBvcnQgeyBHYW1lU3RhdGVJRCB9IGZyb20gXCIuL0dhbWVTdGF0ZU1nclwiO1xyXG5pbXBvcnQgRG9kTG9nIGZyb20gXCIuLi8uLi9Db21tb24vRG9kTG9nXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU3RhdGVHYW1lbG9hZCBleHRlbmRzIEdhbWVTdGF0ZUJhc2V7XHJcbiAgICBjb25zdHJ1Y3RvcihiYXR0bGUpIHtcclxuICAgICAgICBzdXBlcihiYXR0bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnRlcigpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5lbnRlcigpO1xyXG4gICAgICAgIC8vVE9ETyBTSE9XIExPQURJTkcgU0NSRUVOXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxlYXZlKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmxlYXZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLnJlc2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci51cGRhdGUoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWVMb2FkIHVwZGF0ZVwiKTtcclxuICAgICAgICBpZiAodHJ1ZSA9PSBEb2RSZXNvdXJjZU1nci5JbnN0YW5jZS5pbml0ZWQoKSkge1xyXG4gICAgICAgICAgICAvL1dFIERPIE5PVCBIQVZFIExPQkJZIE1PRFVMRSBJTiBUSElTIFZFUlNJT05cclxuICAgICAgICAgICAgLy9KVVNUIFNFVCBMRVZFTCBJRCBIRVJFXHJcbiAgICAgICAgICAgIC8vVE8gREVMXHJcbiAgICAgICAgICAgIERvZFJlc291cmNlTWdyLkluc3RhbmNlLnNldExldmVsSUQoMSk7XHJcbiAgICAgICAgICAgIFJob2Rlc0dhbWUuSW5zdGFuY2Uuc3RhdGVNZ3IucnVuU3RhdGUoR2FtZVN0YXRlSUQuTGV2ZWxsb2FkKTtcclxuICAgICAgICAgICAgRG9kTG9nLmRlYnVnKGBHYW1lU3RhdGVHYW1lbG9hZC51cGRhdGU6IFJlc291cmNlcyBpbml0IGNvbXBsZXRlLCBzZXQgbGV2ZWwgaW50byAxLiBgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgR2FtZVN0YXRlQmFzZSBmcm9tIFwiLi9HYW1lU3RhdGVCYXNlXCI7XHJcbmltcG9ydCBSaG9kZXNHYW1lIGZyb20gXCIuLi9SaG9kZXNHYW1lXCI7XHJcbmltcG9ydCB7IEdhbWVTdGF0ZUlEIH0gZnJvbSBcIi4vR2FtZVN0YXRlTWdyXCI7XHJcbmltcG9ydCBEb2RSZXNvdXJjZU1nciBmcm9tIFwiLi4vLi4vUmVzb3VyY2VzL0RvZFJlc291cmNlTWdyXCI7XHJcbmltcG9ydCBEb2RMb2cgZnJvbSBcIi4uLy4uL0NvbW1vbi9Eb2RMb2dcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTdGF0ZUxldmVsTG9hZCBleHRlbmRzIEdhbWVTdGF0ZUJhc2V7XHJcbiAgICBjb25zdHJ1Y3RvcihiYXR0bGUpIHtcclxuICAgICAgICBzdXBlcihiYXR0bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnRlcigpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5lbnRlcigpO1xyXG4gICAgICAgIHRoaXMuX2JhdHRsZS5wcmVwYXJlTGV2ZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbGVhdmUoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIubGVhdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIucmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLnVwZGF0ZSgpO1xyXG4gICAgICAgIGlmICh0cnVlID09IERvZFJlc291cmNlTWdyLkluc3RhbmNlLmlzTGV2ZWxQcmVwYXJlZCgpKSB7XHJcbiAgICAgICAgICAgIGlmICh0cnVlID09IHRoaXMuX2JhdHRsZS5pc0xldmVsUHJlcHJhcmVkKCkpIHtcclxuICAgICAgICAgICAgICAgIFJob2Rlc0dhbWUuSW5zdGFuY2Uuc3RhdGVNZ3IucnVuU3RhdGUoR2FtZVN0YXRlSUQuQmF0dGxlKTtcclxuICAgICAgICAgICAgICAgIERvZExvZy5kZWJ1ZyhgR2FtZVN0YXRlTGV2ZWxsb2FkLnVwZGF0ZTogbGV2ZWwgWyR7RG9kUmVzb3VyY2VNZ3IuSW5zdGFuY2UuZ2V0TGV2ZWxJRCgpfV0gaXMgcHJlcGFyZWQuIGApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEdhbWVTdGF0ZUJhc2UgZnJvbSBcIi4vR2FtZVN0YXRlQmFzZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVN0YXRlTG9iYnkgZXh0ZW5kcyBHYW1lU3RhdGVCYXNle1xyXG4gICAgY29uc3RydWN0b3IoYmF0dGxlKSB7XHJcbiAgICAgICAgc3VwZXIoYmF0dGxlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW50ZXIoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuZW50ZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbGVhdmUoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIubGVhdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIucmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEdhbWVTdGF0ZUJhc2UgZnJvbSBcIi4vR2FtZVN0YXRlQmFzZVwiO1xyXG5pbXBvcnQgR2FtZVN0YXRlQmF0dGxlIGZyb20gXCIuL0dhbWVTdGF0ZUJhdHRsZVwiO1xyXG5pbXBvcnQgRG9kTG9nIGZyb20gXCIuLi8uLi9Db21tb24vRG9kTG9nXCI7XHJcbmltcG9ydCBHYW1lU3RhdGVMZXZlbExvYWQgZnJvbSBcIi4vR2FtZVN0YXRlTGV2ZWxsb2FkXCI7XHJcbmltcG9ydCBHYW1lU3RhdGVHYW1lbG9hZCBmcm9tIFwiLi9HYW1lU3RhdGVHYW1lbG9hZFwiO1xyXG5pbXBvcnQgR2FtZVN0YXRlTG9iYnkgZnJvbSBcIi4vR2FtZVN0YXRlTG9iYnlcIjtcclxuaW1wb3J0IFJob2Rlc0dhbWUgZnJvbSBcIi4uL1Job2Rlc0dhbWVcIjtcclxuaW1wb3J0IEdhbWVCYXR0bGUgZnJvbSBcIi4uL0dhbWVCYXR0bGVcIjtcclxuXHJcbmV4cG9ydCBlbnVtIEdhbWVTdGF0ZUlEIHtcclxuICAgIE5vbmUsXHJcbiAgICBHYW1lbG9hZCxcclxuICAgIExvYmJ5LFxyXG4gICAgTGV2ZWxsb2FkLFxyXG4gICAgQmF0dGxlLFxyXG4gICAgQ291bnRcclxufVxyXG5cclxuLypcclxuICog5aSn54q25oCB5py6IOeuoeeQhua4uOaIj+aJgOWkhOmYtuautVxyXG4gKiBAVE9ETyBHQU1FTE9BRCBMT0JCWSBMRVZFTExPQUQgQkFUVExFXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU3RhdGVNZ3Ige1xyXG4gICAgcHJpdmF0ZSBfc3RhdGVzOiBHYW1lU3RhdGVCYXNlW107XHJcbiAgICBwcml2YXRlIF9jdXJyZW50U3RhdGU6IEdhbWVTdGF0ZUJhc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYmF0dGxlOkdhbWVCYXR0bGUpIHtcclxuICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUgPSBudWxsO1xyXG4gICAgICAgIC8vIGxldCBiYXR0bGUgPSBSaG9kZXNHYW1lLkluc3RhbmNlLmJhdHRsZTtcclxuICAgIFxyXG4gICAgICAgIHRoaXMuX3N0YXRlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3N0YXRlcy5wdXNoKG51bGwpO1xyXG4gICAgICAgIHRoaXMuX3N0YXRlcy5wdXNoKG5ldyBHYW1lU3RhdGVHYW1lbG9hZChiYXR0bGUpKTtcclxuICAgICAgICB0aGlzLl9zdGF0ZXMucHVzaChuZXcgR2FtZVN0YXRlTG9iYnkoYmF0dGxlKSk7XHJcbiAgICAgICAgdGhpcy5fc3RhdGVzLnB1c2gobmV3IEdhbWVTdGF0ZUxldmVsTG9hZChiYXR0bGUpKTtcclxuICAgICAgICB0aGlzLl9zdGF0ZXMucHVzaChuZXcgR2FtZVN0YXRlQmF0dGxlKGJhdHRsZSkpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgaW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJ1blN0YXRlKEdhbWVTdGF0ZUlELkdhbWVsb2FkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcnVuU3RhdGUoc3RhdGVJRDogR2FtZVN0YXRlSUQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoR2FtZVN0YXRlSUQuQ291bnQgPD0gc3RhdGVJRCB8fCBzdGF0ZUlEIDw9IEdhbWVTdGF0ZUlELk5vbmUpIHtcclxuICAgICAgICAgICAgRG9kTG9nLmVycm9yKGBHYW1lU3RhdGVNZ3IucnVuU3RhdGU6IEludmFsaWQgc3RhdGVJRCBbJHtzdGF0ZUlEfV0uIGApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobnVsbCAhPSB0aGlzLl9jdXJyZW50U3RhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlLmxlYXZlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUgPSB0aGlzLl9zdGF0ZXNbc3RhdGVJRF07XHJcbiAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlLmVudGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAobnVsbCAhPSB0aGlzLl9jdXJyZW50U3RhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlLnVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKG51bGwgIT0gdGhpcy5fY3VycmVudFN0YXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZS5sZWF2ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9zdGF0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5fc3RhdGVzW2ldO1xyXG4gICAgICAgICAgICBzdGF0ZS5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBHYW1lQ29uZmlnIGZyb20gXCIuL0dhbWVDb25maWdcIjtcclxuaW1wb3J0IFNjZW5lTWFuYWdlciBmcm9tIFwiLi9TY2VuZU1hbmFnZXJcIjtcclxuaW1wb3J0IEZpeFRpbWUgZnJvbSBcIi4vRml4L0ZpeFRpbWVcIjtcclxuaW1wb3J0IFJob2Rlc0dhbWUgZnJvbSBcIi4vR2FtZS9SaG9kZXNHYW1lXCI7XHJcbmltcG9ydCB7IEV2ZW50Q2VudHJlIH0gZnJvbSBcIi4vRXZlbnQvRXZlbnRDZW50cmVcIjtcclxuaW1wb3J0IERvZFJlc291cmNlTWdyIGZyb20gXCIuL1Jlc291cmNlcy9Eb2RSZXNvdXJjZU1nclwiO1xyXG5pbXBvcnQgUGVyZm9ybWFuY2VDZW50cmUgZnJvbSBcIi4vQ29tbW9uL0dyYXBoaWNzL1BlcmZvcm1hbmNlX01vZHVsZS9QZXJmb3JtYW5jZUNlbnRyZVwiO1xyXG5pbXBvcnQgeyBWZWMyIH0gZnJvbSBcIi4vQ29tbW9uL0RvZE1hdGhcIjtcclxuaW1wb3J0IEFjdG9yIGZyb20gXCIuL0dhbWUvQWN0b3IvQWN0b3JcIjtcclxuaW1wb3J0IHsgQWN0b3JUeXBlIH0gZnJvbSBcIi4vQ29tbW9uL0RvZEtleVwiO1xyXG5cclxuY2xhc3MgTWFpbiB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHQvL+agueaNrklEReiuvue9ruWIneWni+WMluW8leaTjlx0XHRcclxuXHRcdGlmICh3aW5kb3dbXCJMYXlhM0RcIl0pIExheWEzRC5pbml0KEdhbWVDb25maWcud2lkdGgsIEdhbWVDb25maWcuaGVpZ2h0KTtcclxuXHRcdGVsc2UgTGF5YS5pbml0KEdhbWVDb25maWcud2lkdGgsIEdhbWVDb25maWcuaGVpZ2h0LCBMYXlhW1wiV2ViR0xcIl0pO1xyXG5cdFx0TGF5YVtcIlBoeXNpY3NcIl0gJiYgTGF5YVtcIlBoeXNpY3NcIl0uZW5hYmxlKCk7XHJcblx0XHRMYXlhW1wiRGVidWdQYW5lbFwiXSAmJiBMYXlhW1wiRGVidWdQYW5lbFwiXS5lbmFibGUoKTtcclxuXHRcdExheWEuc3RhZ2Uuc2NhbGVNb2RlID0gR2FtZUNvbmZpZy5zY2FsZU1vZGU7XHJcblx0XHRMYXlhLnN0YWdlLnNjcmVlbk1vZGUgPSBHYW1lQ29uZmlnLnNjcmVlbk1vZGU7XHJcblx0XHQvL+WFvOWuueW+ruS/oeS4jeaUr+aMgeWKoOi9vXNjZW5l5ZCO57yA5Zy65pmvXHJcblx0XHRMYXlhLlVSTC5leHBvcnRTY2VuZVRvSnNvbiA9IEdhbWVDb25maWcuZXhwb3J0U2NlbmVUb0pzb247XHJcblxyXG5cdFx0Ly/miZPlvIDosIPor5XpnaLmnb/vvIjpgJrov4dJREXorr7nva7osIPor5XmqKHlvI/vvIzmiJbogIV1cmzlnLDlnYDlop7liqBkZWJ1Zz10cnVl5Y+C5pWw77yM5Z2H5Y+v5omT5byA6LCD6K+V6Z2i5p2/77yJXHJcblx0XHRpZiAoR2FtZUNvbmZpZy5kZWJ1ZyB8fCBMYXlhLlV0aWxzLmdldFF1ZXJ5U3RyaW5nKFwiZGVidWdcIikgPT0gXCJ0cnVlXCIpIExheWEuZW5hYmxlRGVidWdQYW5lbCgpO1xyXG5cdFx0aWYgKEdhbWVDb25maWcucGh5c2ljc0RlYnVnICYmIExheWFbXCJQaHlzaWNzRGVidWdEcmF3XCJdKSBMYXlhW1wiUGh5c2ljc0RlYnVnRHJhd1wiXS5lbmFibGUoKTtcclxuXHRcdGlmIChHYW1lQ29uZmlnLnN0YXQpIExheWEuU3RhdC5zaG93KCk7XHJcblx0XHRMYXlhLmFsZXJ0R2xvYmFsRXJyb3IgPSB0cnVlO1xyXG5cclxuXHRcdC8vR0FNRSBJTklUIChHTE9CQUwgTU9EVUxFKVxyXG5cdFx0Y29uc29sZS5sb2coXCJQQyBpbml0XCIpO1xyXG5cdFx0UGVyZm9ybWFuY2VDZW50cmUuaW5pdGlhbGl6ZShMYXlhLnN0YWdlKTtcclxuXHJcblx0XHQvL3Rlc3RcclxuXHRcdFBlcmZvcm1hbmNlQ2VudHJlLmluc3RhbmNlLmluaXRCb2FyZChbXHJcblx0XHRcdFswLDAsMCwwXSxcclxuXHRcdFx0WzAsMCwwLDBdXHJcblx0XHRdLCBuZXcgVmVjMig1MCw1MCksIG5ldyBWZWMyKDEwMCwxMDApLCBcIiNmZjAwZmZcIiwgXCIjZmZmZjAwXCIpO1xyXG5cdFx0Ly90ZXN0IGVuZFxyXG5cclxuXHRcdEZpeFRpbWUuaW5pdCgpO1xyXG5cdFx0UmhvZGVzR2FtZS5JbnN0YW5jZS5pbml0KCk7XHJcblx0XHREb2RSZXNvdXJjZU1nci5JbnN0YW5jZS5pbml0KCk7XHJcblx0XHRFdmVudENlbnRyZS5pbml0KCk7XHJcblxyXG5cdFx0Ly/mv4DmtLvotYTmupDniYjmnKzmjqfliLbvvIx2ZXJzaW9uLmpzb27nlLFJREXlj5HluIPlip/og73oh6rliqjnlJ/miJDvvIzlpoLmnpzmsqHmnInkuZ/kuI3lvbHlk43lkI7nu63mtYHnqItcclxuXHRcdExheWEuUmVzb3VyY2VWZXJzaW9uLmVuYWJsZShcInZlcnNpb24uanNvblwiLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMub25WZXJzaW9uTG9hZGVkKSwgTGF5YS5SZXNvdXJjZVZlcnNpb24uRklMRU5BTUVfVkVSU0lPTik7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgb25WZXJzaW9uTG9hZGVkKCk6IHZvaWQge1xyXG5cdFx0Ly/mv4DmtLvlpKflsI/lm77mmKDlsITvvIzliqDovb3lsI/lm77nmoTml7blgJnvvIzlpoLmnpzlj5HnjrDlsI/lm77lnKjlpKflm77lkIjpm4bph4zpnaLvvIzliJnkvJjlhYjliqDovb3lpKflm77lkIjpm4bvvIzogIzkuI3mmK/lsI/lm75cclxuXHRcdExheWEuQXRsYXNJbmZvTWFuYWdlci5lbmFibGUoXCJmaWxlY29uZmlnLmpzb25cIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLm9uQ29uZmlnTG9hZGVkKSk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgb25Db25maWdMb2FkZWQoKTogdm9pZCB7XHJcblxyXG5cdFx0XHJcblxyXG5cdFx0U2NlbmVNYW5hZ2VyLkluc3RhbmNlLmF3YWtlKCk7XHJcblx0XHRcclxuXHJcblx0XHQvL3Rlc3RcclxuXHRcdERvZFJlc291cmNlTWdyLkluc3RhbmNlLmluaXQoKTtcclxuXHRcdFxyXG5cdFx0Ly9Bd2FrZSBHYW1lIEVuZ2luZSBMb29wXHJcblx0XHRMYXlhLnRpbWVyLmxvb3AoMTYsIHRoaXMsIHRoaXMuX3VwZGF0ZSk7XHJcblx0XHRcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgX3VwZGF0ZSgpOiB2b2lkIHtcclxuXHRcdEZpeFRpbWUudXBkYXRlKCk7XHJcblx0XHRSaG9kZXNHYW1lLkluc3RhbmNlLnVwZGF0ZSgpO1xyXG5cdFx0RG9kUmVzb3VyY2VNZ3IuSW5zdGFuY2UudXBkYXRlKCk7XHJcblx0fVxyXG59XHJcblxyXG4vL+a/gOa0u+WQr+WKqOexu1xyXG5uZXcgTWFpbigpO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBEb2RSZXNvdXJjZU1nciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IERvZFJlc291cmNlTWdyO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSW5zdGFuY2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlIHx8ICh0aGlzLl9pbnN0YW5jZSA9IG5ldyB0aGlzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETyBA6ZO25Y2OXHJcbiAgICAvL2xvYWQgcmVzb3VyY2VzIGhlcmUgaW5jbHVkaW5nIEpTT04gLyBURVhUVVJFIC8gQVZBVEFSIC8gU1BJTkVcclxuICAgIC8vcHJpdmF0ZSBfanNvbjogRG9kSnNvbkxvYWRlcjtcclxuICAgIC8vcHJpdmF0ZSBfdGV4OiBEb2RUZXh0dXJlTG9hZGVyO1xyXG5cclxuICAgIHByaXZhdGUgX2xldmVsSUQ6IG51bWJlciB8IG51bGw7XHJcbiAgICBwcml2YXRlIF9pbml0ZWQ6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9sZXZlbFByZXBhcmVkOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX2xldmVsSUQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2luaXRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2xldmVsUHJlcGFyZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0TGV2ZWxJRChpZDogbnVtYmVyIHwgbnVsbCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2xldmVsSUQgPSBpZDtcclxuICAgICAgICB0aGlzLl9sZXZlbFByZXBhcmVkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldExldmVsSUQoKTogbnVtYmVyIHwgbnVsbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xldmVsSUQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgLy9UT0RPIExPQURcclxuICAgICAgICAvL3RoaXMuX2pzb24ubG9hZCgpO1xyXG4gICAgICAgIC8vdGhpcy5fdGV4LmxvYWQoKTtcclxuICAgICAgICAvL3NldCBpbml0ZWQgZmxhZyB0cnVlIHdoaWxlIGluaXRpYWxpemF0aW9uIGNvbXBsZXRlXHJcbiAgICAgICAgdGhpcy5faW5pdGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbml0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAobnVsbCAhPSB0aGlzLnNldExldmVsSUQgJiYgZmFsc2UgPT0gdGhpcy5fbGV2ZWxQcmVwYXJlZCkge1xyXG4gICAgICAgICAgICAvL3ByZXBhcmUgcHJlZmFiIGhlcmVcclxuICAgICAgICAgICAgaWYgKDEpIHsgICAgLy9tYWtlIHN1cmUgcHJlZmFiIHByZXBhcmVkXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sZXZlbFByZXBhcmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNMZXZlbFByZXBhcmVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sZXZlbFByZXBhcmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDdXJyZW50TGV2ZWxSZXMoKTogYW55IHtcclxuICAgICAgICAvL1RPRE9cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QWN0b3JSZXNCeUlEKGlkOiBudW1iZXIpOiBhbnkge1xyXG4gICAgICAgIC8vVE9ET1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59IiwiLy8gaW1wb3J0IEV2ZW50Q2VudHJlIGZyb20gXCIuL1RveWJveC9FdmVudENlbnRyZVwiO1xyXG4vLyBpbXBvcnQgRGF0YWJhc2UgZnJvbSBcIi4vVG95Ym94L0RhdGFiYXNlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2VuZU1hbmFnZXJ7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFNjZW5lTWFuYWdlcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IEluc3RhbmNlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZSB8fCAodGhpcy5faW5zdGFuY2UgPSBuZXcgdGhpcygpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxvYWRpbmdTY2VuZTpzdHJpbmcgPSBcIkxvYWRpbmdTY2VuZS5zY2VuZVwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBnYW1lU2NlbmU6c3RyaW5nID0gXCJHYW1lU2NlbmUuc2NlbmVcIjtcclxuXHJcbiAgICBwdWJsaWMgYXdha2UoKTogdm9pZCB7XHJcbiAgICAgICAgTGF5YS5TY2VuZS5vcGVuKHRoaXMuZ2FtZVNjZW5lKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiIsImltcG9ydCB7dWl9IGZyb20gXCIuLi91aS9sYXlhTWF4VUlcIjtcclxuaW1wb3J0IFJob2Rlc0dhbWUgZnJvbSBcIi4uL0dhbWUvUmhvZGVzR2FtZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUgZXh0ZW5kcyB1aS5HYW1lU2NlbmVVSSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIFVJU2V0OiBMYXlhLlNwcml0ZTtcclxuICAgIHB1YmxpYyBzdGF0aWMgc3RhZ2U6IExheWEuU3RhZ2U7XHJcbiAgICBwcml2YXRlIF9wYXVzZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIC8v5YWo5bGA5pWw5o2u77yI5pWw5o2u5bqT57G75a6M5oiQ5ZCO5bCG6KKr5pu/5Luj77yJXHJcbiAgICBwdWJsaWMgc3RhdGljIGZyYW1lTGVuZ3RoOiBudW1iZXIgPSAyMDsvL+W4p+mVv+W6plxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7dWl9IGZyb20gXCIuLi91aS9sYXlhTWF4VUlcIlxyXG5cclxuXHJcbi8vVE9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZGluZyBleHRlbmRzIHVpLkxvYWRpbmdTY2VuZVVJe1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpXHJcbiAgICB9XHJcbn0iLCIvKipUaGlzIGNsYXNzIGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IExheWFBaXJJREUsIHBsZWFzZSBkbyBub3QgbWFrZSBhbnkgbW9kaWZpY2F0aW9ucy4gKi9cbmltcG9ydCBWaWV3PUxheWEuVmlldztcclxuaW1wb3J0IERpYWxvZz1MYXlhLkRpYWxvZztcclxuaW1wb3J0IFNjZW5lPUxheWEuU2NlbmU7XG52YXIgUkVHOiBGdW5jdGlvbiA9IExheWEuQ2xhc3NVdGlscy5yZWdDbGFzcztcbmV4cG9ydCBtb2R1bGUgdWkge1xyXG4gICAgZXhwb3J0IGNsYXNzIEdhbWVTY2VuZVVJIGV4dGVuZHMgU2NlbmUge1xyXG5cdFx0cHVibGljIFVJU2V0OkxheWEuU3ByaXRlO1xuXHRcdHB1YmxpYyBTaWRlQmFyOkxheWEuU3ByaXRlO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiR2FtZVNjZW5lXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLkdhbWVTY2VuZVVJXCIsR2FtZVNjZW5lVUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIExvYWRpbmdTY2VuZVVJIGV4dGVuZHMgU2NlbmUge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJMb2FkaW5nU2NlbmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkuTG9hZGluZ1NjZW5lVUlcIixMb2FkaW5nU2NlbmVVSSk7XHJcbn1cciJdfQ==
