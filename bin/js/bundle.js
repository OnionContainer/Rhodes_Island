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
    /**
     * 返回一个集合c，且使得它具有如下性质：
     * 对于每个存在于集合a中的元素，如果它不在集合b中，则它在集合c中
     * 即c=a-b
     *
     * 注意：目前如果a中存在两个元素K，b中存在一个元素K，结果中的c不会存在元素K
     * 只要b中存在一个就会把a里的全部减掉
     * @param a
     * @param b
     */
    ArrayAlgo.findCompSet = function (a, b) {
        var result = [];
        for (var _i = 0, a_2 = a; _i < a_2.length; _i++) {
            var ele = a_2[_i];
            if (b.indexOf(a) === -1) {
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
            this.changeText(" ");
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
Object.defineProperty(exports, "__esModule", { value: true });
//author Na2CuC4O8
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
    PerformanceCentre.prototype.distroyActor = function (bound) {
        var tmpActor = objbox_1.ActorBox.get(bound.symbol.data); //获取actorRU对象
        tmpActor.destory();
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
    /**
     * 渲染动画
     * 代号请查询动画对照表.xlsx
     * @param bound 待渲染对象
     * @param name 干员或敌人代号
     * @param ani 动作代号
     * @param numOfFrames 动作执行帧数
     * @param scale 动画图形在x，y方向上缩放比
     * @param loopOrNot 是否开启动作帧循环（默认关闭）
     */
    PerformanceCentre.prototype.displayAni = function (bound, name, ani, numOfFrames, scale, loopOrNot) {
        if (numOfFrames === void 0) { numOfFrames = 16; }
        if (scale === void 0) { scale = new DodMath_1.Vec2(0.25, 0.17); }
        if (loopOrNot === void 0) { loopOrNot = false; }
        var tmpActor = objbox_1.ActorBox.get(bound.symbol.data);
        tmpActor.clearAni();
        tmpActor.loadAni(name, ani, loopOrNot, numOfFrames, scale);
    };
    /**
     * 初始化侧面UI
     * 侧面UI的父节点为！！！！棋盘！！！！！！
     * @param pos 相对于棋盘坐标
     * @param unitsize 干员立绘大小
     *
     */
    PerformanceCentre.prototype.loadSideUI = function (pos, unitsize) {
        PerformanceCentre.instance.ui = new UnsymbolizedRender_1.sideUI(pos, unitsize, 1); //初始化侧面UI
    };
    /**
     * 向侧面UI插入干员立绘并开启鼠标事件监听
     * @param bound actor对象
     * @param name 干员立绘名
     */
    PerformanceCentre.prototype.pushActIntoSideUI = function (bound, name) {
        var _this = this;
        var board = PerformanceCentre.instance.chessBoard;
        var ui = PerformanceCentre.instance.ui;
        board.addChild(ui.getSpr()); //添加为棋盘子节点
        var tmpspr = ui.pushActor(bound, name); //干员信息写入UI中数组
        var fun = function () {
            //根据鼠标相对于棋盘坐标换算干员所处坐标
            var tmpvec = PerformanceCentre.instance.chessBoard.returnMouseVec();
            var uipos = ui.getPos();
            var uisize = ui.getSize();
            tmpspr.pos(tmpvec.x - uipos.x - 0.5 * uisize.x, tmpvec.y - uipos.y - 0.5 * uisize.y);
        };
        tmpspr.on(Laya.Event.MOUSE_DOWN, this, function () {
            //监听鼠标按下事件
            Laya.timer.loop(17, _this, fun); //开启帧循环
        });
        tmpspr.on(Laya.Event.MOUSE_UP, this, function () {
            //监听鼠标抬起事件
            Laya.timer.clear(_this, fun); //终止帧循环
            var boardsize = board.getboardsize();
            var mouseloaction = board.returnMouseVec();
            var unitsize = board.getUnitSize();
            if (boardsize.x >= mouseloaction.x && boardsize.y >= mouseloaction.y && mouseloaction.y >= 0 && mouseloaction.x >= 0) {
                //当mouse_up时鼠标在棋盘上
                var tmpvec = new DodMath_1.Vec2(Math.floor(mouseloaction.x / unitsize.x) * unitsize.x, Math.floor(mouseloaction.y / unitsize.y) * unitsize.y);
                EventCentre_1.EventCentre.instance.event(EventCentre_1.EventCentre.EType.PERFORMANCE_ACTOR_ON_BOARD(bound.symbol.data), tmpvec); //发送干员到达棋盘事件并发送棋盘坐标
                tmpspr.destroy(); //摧毁立绘对象
            }
            else {
                //当mouse_up时鼠标不在棋盘上
                var tmpvec = ui.readPairForPos(bound);
                tmpspr.pos(tmpvec.x, tmpvec.y);
            }
        });
    };
    return PerformanceCentre;
}());
exports.default = PerformanceCentre;
},{"../../../Event/EventCentre":11,"../../DodMath":4,"./SymbolizedRender":7,"./UnsymbolizedRender":8,"./customizedSpr":9,"./objbox":10}],7:[function(require,module,exports){
"use strict";
//author Na2CuC4O8
Object.defineProperty(exports, "__esModule", { value: true });
var DodMath_1 = require("../../DodMath");
var customizedSpr_1 = require("./customizedSpr");
var objbox_1 = require("./objbox");
var EventCentre_1 = require("../../../Event/EventCentre");
var ActorComponent_1 = require("./ActorComponent");
var DodDataStructure_1 = require("../../DodDataStructure");
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
        this._ani = new Laya.Animation();
        this._father = father; //父绘图节点
        this._initPos = pos; //起始坐标
        this._initSize = size; //起始宽高
        this._spr = new customizedSpr_1.default(); //新建绘图节点
        this._father.addChild(this._spr); //添加子节点
        this.setData(symb, new DodMath_1.Vec2(this._initPos.x * this._scale, this._initPos.y * this._scale), new DodMath_1.Vec2(this._initSize.x * this._scale, this._initSize.y * this._scale), undefined); //设置绘图节点参数
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
        this._damage.zOrder = 99;
        this.addDefButtons(); //
        this._fist = new customizedSpr_1.default(); //
        this._fist.setParam(this._centerPos.x, this._centerPos.y, 16, 16, "#F3C246"); //
        this._fist.locationAndSize(); //
        this._fist.zOrder = 2; //
        this._spr.addChild(this._fist); //
    }
    ActorRU.prototype.clearAni = function () {
        this._ani.clear();
    };
    ActorRU.prototype.loadAni = function (name, status, loopOrNot, numOfFrames, scale) {
        this._ani = new Laya.Animation();
        this._ani.pos(-17 * this._scale, -8 * this._scale);
        this._ani.scale(scale.x, scale.y);
        this._spr.addChild(this._ani);
        this._ani.loadAtlas("res/atlas/" + name + ".atlas", Laya.Handler.create(this, onLoaded));
        this._ani.play(undefined, loopOrNot);
        function createAniUrls(url, length) {
            var urls = [];
            for (var i = 1; i < length; i++) {
                if (i < 10) {
                    urls.push(url + "_" + "0" + i + ".png");
                }
                else {
                    urls.push(url + "_" + i + ".png");
                }
            }
            return urls;
        }
        function onLoaded() {
            this._ani.interval = 50;
            var tmpAni = createAniUrls(name + "/" + status, numOfFrames);
            this._ani.loadImages(tmpAni);
        }
        return this._ani;
    };
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
        this._fist.centralShiftColored();
        var tmpVec = new DodMath_1.Vec2(objbox_1.ActorBox.get(to.symbol.data).curPos().x - this._pos.x, objbox_1.ActorBox.get(to.symbol.data).curPos().y - this._pos.y);
        var fun = function (target) {
            if (_this._movePercentage > 1) {
                _this._movePercentage = 0;
                _this._fist.graphics.clear();
                Laya.timer.clear(_this, fun);
                objbox_1.ActorBox.get(to.symbol.data).damage();
                // this._ani.stop();
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
    ActorRU.prototype.showDefaultBottons = function (e) {
        e.stopPropagation();
        if (this._defButtonShowed === false) {
            this._spr.addChild(this.getButton(0).getSpr());
            this._spr.addChild(this.getButton(1).getSpr());
            this._defButtonShowed = true;
            // console.log(this._text._switch);
        }
        else {
            this._spr.removeChild(this.getButton(0).getSpr());
            this._spr.removeChild(this.getButton(1).getSpr());
            this._defButtonShowed = false;
            // console.log(this._text._switch);
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
        // this._ani.scale(0.25*value,0.18*value);
        // this._ani.pos(-17*value,-8*value);
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
        var tmp3 = new ActorComponent_1.Button(this._symb, "", 999, new DodMath_1.Vec2(0, 0), new DodMath_1.Vec2(0, 0), undefined, this._scale);
        this._spr.addChild(tmp3.getSpr());
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
var DodDataStructure_1 = require("../../DodDataStructure");
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
        _this._initboardsize = new DodMath_1.Vec2(unitsize.x * arr[0].length, unitsize.y * arr.length);
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
    ChessBoard.prototype.returnMouseVec = function () {
        return new DodMath_1.Vec2(this.mouseX, this.mouseY);
    };
    ChessBoard.prototype.getUnitSize = function () {
        return this._initSize;
    };
    ChessBoard.prototype.getboardsize = function () {
        return this._initboardsize;
    };
    return ChessBoard;
}(customizedSpr_1.default));
exports.ChessBoard = ChessBoard;
var sideUI = /** @class */ (function () {
    function sideUI(pos, unitSize, rescale) {
        var _this = this;
        this._bound = [];
        this._posPair = new DodDataStructure_1.KVPair();
        this._pos = pos;
        this._unitSize = unitSize;
        this._rescale = rescale;
        this._currPos = new DodMath_1.Vec2(pos.x * rescale, pos.y * rescale);
        this._currUnitSize = new DodMath_1.Vec2(unitSize.x * rescale, unitSize.y * rescale);
        EventCentre_1.EventCentre.instance.on(EventCentre_1.EventCentre.EType.PERFORMANCE_RESCALE(), this, function (rescale) {
            _this._rescale = rescale;
            _this._currPos = new DodMath_1.Vec2(_this._pos.x * _this._rescale, _this._pos.y * _this._rescale);
            _this._currUnitSize = new DodMath_1.Vec2(_this._unitSize.x * _this._rescale, _this._unitSize.y * _this._rescale);
        });
        this._spr = new customizedSpr_1.default();
        this._spr.pos(this._currPos.x, this._currPos.y);
    }
    sideUI.prototype.pushActor = function (bound, name) {
        var tmpSpr = new customizedSpr_1.default();
        var info = [bound.symbol.data];
        this._bound.push(info);
        var initpos = new DodMath_1.Vec2(0, this._currUnitSize.y * (this._bound.length - 1));
        this._posPair.edit(bound.symbol.data + "", initpos);
        tmpSpr.pos(initpos.x, initpos.y).size(this._currUnitSize.x, this._currUnitSize.y);
        this._spr.addChild(tmpSpr);
        tmpSpr.loadImage("res/png/" + name + ".png");
        this._spr.size(this._currUnitSize.x, this._currUnitSize.y * this._bound.length);
        return tmpSpr;
    };
    sideUI.prototype.getSpr = function () {
        return this._spr;
    };
    sideUI.prototype.getPos = function () {
        return this._pos;
    };
    sideUI.prototype.getSize = function () {
        return this._unitSize;
    };
    sideUI.prototype.getscale = function () {
        return this._rescale;
    };
    sideUI.prototype.readPairForPos = function (bound) {
        return this._posPair.read(bound.symbol.data + "");
    };
    return sideUI;
}());
exports.sideUI = sideUI;
},{"../../../Event/EventCentre":11,"../../DodDataStructure":1,"../../DodMath":4,"./customizedSpr":9}],9:[function(require,module,exports){
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
    EType.prototype.PERFORMANCE_ACTOR_ON_BOARD = function (symb) {
        return "ACTOR_" + symb + "_ON_BOARD";
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
        this.blocker = new Blocker_1.Blocker(this, res['xxx']);
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
        var _this = this;
        this.actors = [];
        //test
        var creatEnemy = function (time) {
            time.forEach(function (ele) {
                Laya.timer.once(ele, _this, function () {
                    var index = _this.actors.length;
                    _this.createActor(DodKey_1.ActorType.Monster, {});
                    _this.actors[index].state.runState(ActorStateFsm_1.ActorStateID.Walk);
                });
            });
        };
        this.createActor(DodKey_1.ActorType.Monster, {});
        this.actors[0].state.runState(ActorStateFsm_1.ActorStateID.Walk);
        this.createActor(DodKey_1.ActorType.Operator, {});
        this.actors[1].state.runState(ActorStateFsm_1.ActorStateID.Fight);
        creatEnemy([300, 600, 900]);
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
        this.invisible = false; //是否隐形
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
    Object.defineProperty(Profile.prototype, "blockable", {
        get: function () {
            //todo: 判断是否可以被阻挡
            return true;
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
var DodMath_1 = require("../../../Common/DodMath");
var DodKey_1 = require("../../../Common/DodKey");
var RhodesGame_1 = require("../../RhodesGame");
var DodDataStructure_1 = require("../../../Common/DodDataStructure");
/**
 * 作者：草生葱
 *
 * Blocker是阻挡模块
 * 储存阻挡相关的信息
 * 它负责每帧检测干员可阻挡的位置是否有敌人进入，并决定是否阻挡
 *
 *
 * //todo: 如果进行阻挡或解除阻挡，Blocker将会发布事件
 */
var Blocker = /** @class */ (function () {
    function Blocker(keeper, res) {
        this._blockList = []; //已阻挡的列表
        this._blockedBy = null; //被谁阻挡
        this._blockAbility = 3; //阻挡能力
        this._breakthrough = 1; //反阻挡能力
        this._keeper = keeper;
        this._pos = keeper.profile.getNodePos();
        if (this._keeper.type != DodKey_1.ActorType.Operator) { //不是干员类型的话就清空update方法
            this.update = function () { };
        }
        //todo: 根据res设置阻挡能力、反阻挡能力
        //test
        this._pos = new DodMath_1.Vec2(4, 4);
    }
    Object.defineProperty(Blocker.prototype, "isBlocked", {
        get: function () {
            return this._blockedBy != null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 重设阻挡位置
     * @param pos 地图节点位置，整数Vec2
     */
    Blocker.prototype.reposition = function (pos) {
        var _this = this;
        this._pos = pos;
        this._blockList.forEach(function (ele) {
            _this._blockAbility += ele.blocker._breakthrough;
        });
        this._blockList = [];
    };
    Blocker.prototype.update = function () {
        var _this = this;
        /* 目前的算法会产生一个判定问题：
         * 设有相邻的两个格子A和B，B在右边，A上站着推王（朝右），B上站着塞雷娅
         * 敌人在【移入】B格时会被塞莱娅阻挡
         * 此时由于推王的攻击范围是两格，她可以攻击到塞雷娅阻挡的敌人
         * 这与游戏表现相冲突：攻击范围2格的近卫是无法跨一个人攻击敌人的，3格才行（我印象中是）
         *
         * 这个问题在此版本暂且忽略
        */
        if (this._blockAbility <= 0) { //没有阻挡能力就不考虑剩下的事了
            return;
        }
        var list = RhodesGame_1.default.Instance.battle.mapNodeCPU.matrixGet(this._pos); //获取阻挡目标
        var newCapture = DodDataStructure_1.ArrayAlgo.findCompSet(list, this._blockList);
        newCapture = newCapture.filter(function (ele) {
            return ele.blocker._blockedBy == null && ele.profile.blockable;
        });
        //只选取无人阻挡且可被阻挡的部分
        if (newCapture.length == 0) { //没有出现新的阻挡目标
            return;
        }
        newCapture.forEach(function (ele) {
            if (ele.blocker._breakthrough <= _this._blockAbility) {
                _this._blockList.push(ele);
                _this._blockAbility -= ele.blocker._breakthrough;
                ele.blocker._blockedBy = _this._keeper;
            }
        });
    };
    return Blocker;
}());
exports.Blocker = Blocker;
},{"../../../Common/DodDataStructure":1,"../../../Common/DodKey":2,"../../../Common/DodMath":4,"../../RhodesGame":41}],30:[function(require,module,exports){
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
        this._actor.blocker.update();
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
        if (actor.blocker.isBlocked) {
            //todo: 转换到fight状态
            return;
        }
        var 你不要过来啊 = true;
        if (this._actor.transform.pos.arrived && 你不要过来啊) { //已到达目的地
            if (actor.route.next()) { //存在下一个目标节点
                actor.transform.pos.setTarget(actor.route.currentTarget()); //将目标替换为下一个目标节点
            }
            else {
                //todo: 敌人已到达终点
            }
        }
        if (!你不要过来啊) { //跟鼠标的逻辑
            actor.transform.pos.setTarget(new DodMath_1.Vec2(Laya.stage.mouseX - 50, Laya.stage.mouseY - 50));
            actor.transform.pos.setSpeed(20);
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkg6L1Byb2dyYW0gRmlsZXMvTGF5YUFpcklERV8yLjEuMC9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQ29tbW9uL0RvZERhdGFTdHJ1Y3R1cmUudHMiLCJzcmMvQ29tbW9uL0RvZEtleS50cyIsInNyYy9Db21tb24vRG9kTG9nLnRzIiwic3JjL0NvbW1vbi9Eb2RNYXRoLnRzIiwic3JjL0NvbW1vbi9HcmFwaGljcy9QZXJmb3JtYW5jZV9Nb2R1bGUvQWN0b3JDb21wb25lbnQudHMiLCJzcmMvQ29tbW9uL0dyYXBoaWNzL1BlcmZvcm1hbmNlX01vZHVsZS9QZXJmb3JtYW5jZUNlbnRyZS50cyIsInNyYy9Db21tb24vR3JhcGhpY3MvUGVyZm9ybWFuY2VfTW9kdWxlL1N5bWJvbGl6ZWRSZW5kZXIudHMiLCJzcmMvQ29tbW9uL0dyYXBoaWNzL1BlcmZvcm1hbmNlX01vZHVsZS9VbnN5bWJvbGl6ZWRSZW5kZXIudHMiLCJzcmMvQ29tbW9uL0dyYXBoaWNzL1BlcmZvcm1hbmNlX01vZHVsZS9jdXN0b21pemVkU3ByLnRzIiwic3JjL0NvbW1vbi9HcmFwaGljcy9QZXJmb3JtYW5jZV9Nb2R1bGUvb2JqYm94LnRzIiwic3JjL0V2ZW50L0V2ZW50Q2VudHJlLnRzIiwic3JjL0ZpeC9GaXhSZWN0LnRzIiwic3JjL0ZpeC9GaXhTeW1ib2wudHMiLCJzcmMvRml4L0ZpeFRpbWUudHMiLCJzcmMvR2FtZUNvbmZpZy50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yLnRzIiwic3JjL0dhbWUvQWN0b3IvQWN0b3JNZ3IudHMiLCJzcmMvR2FtZS9BY3Rvci9BY3Rvck1vZHVsZXMvQWN0b3JCdWZmTWdyLnRzIiwic3JjL0dhbWUvQWN0b3IvQWN0b3JNb2R1bGVzL0FjdG9yQ29zdC50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yTW9kdWxlcy9BY3RvclNraWxsLnRzIiwic3JjL0dhbWUvQWN0b3IvQWN0b3JNb2R1bGVzL0FuaW1hdGlvbi50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yTW9kdWxlcy9Db2xpTWVzc2FnZS50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yTW9kdWxlcy9EYW1hZ2UudHMiLCJzcmMvR2FtZS9BY3Rvci9BY3Rvck1vZHVsZXMvUHJvZmlsZS50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yTW9kdWxlcy9UcmFuc2Zvcm0udHMiLCJzcmMvR2FtZS9BY3Rvci9BY3Rvck1vZHVsZXMvVW5pdFJlbmRlci50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yUm91dGUudHMiLCJzcmMvR2FtZS9BY3Rvci9BdHRhY2svQXRrQWJzdC50cyIsInNyYy9HYW1lL0FjdG9yL0F0dGFjay9CbG9ja2VyLnRzIiwic3JjL0dhbWUvQWN0b3IvQXR0YWNrL01hcE5vZGVTZWVrZXIudHMiLCJzcmMvR2FtZS9BY3Rvci9TdGF0ZS9BY3RvclN0YXRlQmFzZS50cyIsInNyYy9HYW1lL0FjdG9yL1N0YXRlL0FjdG9yU3RhdGVGaWdodC50cyIsInNyYy9HYW1lL0FjdG9yL1N0YXRlL0FjdG9yU3RhdGVGc20udHMiLCJzcmMvR2FtZS9BY3Rvci9TdGF0ZS9BY3RvclN0YXRlUHJlcGFyZWQudHMiLCJzcmMvR2FtZS9BY3Rvci9TdGF0ZS9BY3RvclN0YXRlV2Fsay50cyIsInNyYy9HYW1lL0NvbGxpc2lvbi9BY3RvckNvbGxpc2lvblByb2Nlc3Nvci50cyIsInNyYy9HYW1lL0NvbGxpc2lvbi9Db2xpUmVwb3J0ZXIudHMiLCJzcmMvR2FtZS9HYW1lQmF0dGxlLnRzIiwic3JjL0dhbWUvR2FtZUJhdHRsZUNvbnN0LnRzIiwic3JjL0dhbWUvR2FtZUxldmVsLnRzIiwic3JjL0dhbWUvUmhvZGVzR2FtZS50cyIsInNyYy9HYW1lL1N0YXRlL0dhbWVTdGF0ZUJhc2UudHMiLCJzcmMvR2FtZS9TdGF0ZS9HYW1lU3RhdGVCYXR0bGUudHMiLCJzcmMvR2FtZS9TdGF0ZS9HYW1lU3RhdGVHYW1lbG9hZC50cyIsInNyYy9HYW1lL1N0YXRlL0dhbWVTdGF0ZUxldmVsbG9hZC50cyIsInNyYy9HYW1lL1N0YXRlL0dhbWVTdGF0ZUxvYmJ5LnRzIiwic3JjL0dhbWUvU3RhdGUvR2FtZVN0YXRlTWdyLnRzIiwic3JjL01haW4udHMiLCJzcmMvUmVzb3VyY2VzL0RvZFJlc291cmNlTWdyLnRzIiwic3JjL1NjZW5lTWFuYWdlci50cyIsInNyYy9TY2VuZVNjcmlwdC9HYW1lLnRzIiwic3JjL1NjZW5lU2NyaXB0L0xvYWRpbmcudHMiLCJzcmMvdWkvbGF5YU1heFVJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ05BO0lBQUE7UUFDWSxVQUFLLEdBQU8sRUFBRSxDQUFDO0lBYTNCLENBQUM7SUFaVSxxQkFBSSxHQUFYLFVBQVksR0FBVSxFQUFFLEtBQU87UUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDNUIsQ0FBQztJQUNNLHFCQUFJLEdBQVgsVUFBWSxHQUFVO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRU0sd0JBQU8sR0FBZCxVQUFlLENBQXNCO1FBQ2pDLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUN0QixDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN2QjtJQUNMLENBQUM7SUFDTCxhQUFDO0FBQUQsQ0FkQSxBQWNDLElBQUE7QUFkWSx3QkFBTTtBQWlCbkI7SUFHSSxjQUFZLElBQU0sRUFBRSxJQUFZO1FBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFDTCxXQUFDO0FBQUQsQ0FQQSxBQU9DLElBQUE7QUFFRDtJQUlJO1FBRFEsWUFBTyxHQUFV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QUFPO0lBQ1gsQ0FBQztJQUNMLGNBQUM7QUFBRCxDQUpBLEFBSUMsQ0FKb0MsY0FBRSxDQUFDLGNBQWMsR0FJckQ7Ozs7O0FDTEQsSUFBTyxLQUFLLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztBQUN4QixJQUFJLEdBQUcsR0FBYSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQztBQUM3QyxJQUFjLEVBQUUsQ0FtQmY7QUFuQkQsV0FBYyxFQUFFO0lBQ1o7UUFBaUMsK0JBQUs7UUFHbEM7bUJBQWUsaUJBQU87UUFBQSxDQUFDO1FBQ3ZCLG9DQUFjLEdBQWQ7WUFDSSxpQkFBTSxjQUFjLFdBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFDTCxrQkFBQztJQUFELENBUkEsQUFRQyxDQVJnQyxLQUFLLEdBUXJDO0lBUlksY0FBVyxjQVF2QixDQUFBO0lBQ0QsR0FBRyxDQUFDLGdCQUFnQixFQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xDO1FBQW9DLGtDQUFLO1FBQ3JDO21CQUFlLGlCQUFPO1FBQUEsQ0FBQztRQUN2Qix1Q0FBYyxHQUFkO1lBQ0ksaUJBQU0sY0FBYyxXQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBQ0wscUJBQUM7SUFBRCxDQU5BLEFBTUMsQ0FObUMsS0FBSyxHQU14QztJQU5ZLGlCQUFjLGlCQU0xQixDQUFBO0lBQ0QsR0FBRyxDQUFDLG1CQUFtQixFQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQzVDLENBQUMsRUFuQmEsRUFBRSxHQUFGLFVBQUUsS0FBRixVQUFFLFFBbUJmIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCB7IENvbXBhcmFibGUgfSBmcm9tIFwiLi9Eb2RNYXRoXCI7XHJcblxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBLVlBhaXI8Vj57XHJcbiAgICBwcml2YXRlIF9saXN0OmFueSA9IHt9O1xyXG4gICAgcHVibGljIGVkaXQoa2V5OnN0cmluZywgdmFsdWU6Vik6dm9pZHtcclxuICAgICAgICB0aGlzLl9saXN0W2tleV0gPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyByZWFkKGtleTpzdHJpbmcpOlZ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3Rba2V5XTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGl0ZXJhdGUoZjooazpzdHJpbmcsdjpWKT0+dm9pZCk6dm9pZHtcclxuICAgICAgICBmb3IgKGxldCBrIGluIHRoaXMuX2xpc3QpIHtcclxuICAgICAgICAgICAgZihrLCB0aGlzLl9saXN0W2tdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5jbGFzcyBOb2RlPEU+e1xyXG4gICAgcHVibGljIGl0ZW06RTtcclxuICAgIHB1YmxpYyBuZXh0Ok5vZGU8RT47XHJcbiAgICBjb25zdHJ1Y3RvcihpdGVtOkUsIG5leHQ6Tm9kZTxFPil7XHJcbiAgICAgICAgdGhpcy5pdGVtID0gaXRlbTtcclxuICAgICAgICB0aGlzLm5leHQgPSBuZXh0O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTGlua0xpc3Q8RT57XHJcbiAgICBwcml2YXRlIF9oZWFkOk5vZGU8RT47XHJcbiAgICBwcml2YXRlIF90YWlsOk5vZGU8RT47XHJcbiAgICBwcml2YXRlIF9sZW5ndGg6bnVtYmVyID0gMDtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5faGVhZCA9IG5ldyBOb2RlPEU+KG51bGwsIG51bGwpO1xyXG4gICAgICAgIHRoaXMuX3RhaWwgPSBuZXcgTm9kZTxFPihudWxsLCBudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WfuuehgOWxnuaAp1xyXG4gICAgcHVibGljIGdldCBsZW5ndGgoKTpudW1iZXJ7XHJcbiAgICAgICAgLy8gbGV0IHJlc3VsdDpudW1iZXIgPSAwO1xyXG4gICAgICAgIC8vIGxldCBjdXJyZW50Ok5vZGU8RT4gPSB0aGlzLl9oZWFkO1xyXG4gICAgICAgIC8vIHdoaWxlIChjdXJyZW50Lm5leHQgIT09IG51bGwpIHtcclxuICAgICAgICAvLyAgICAgcmVzdWx0ICs9IDE7XHJcbiAgICAgICAgLy8gICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzRW1wdHkoKTpib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9oZWFkLm5leHQgPT09IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lop7liKDmlLnmn6VcclxuICAgIC8v5aKeXHJcbiAgICBwdWJsaWMgcHVzaChpdGVtOkUpOnZvaWR7XHJcbiAgICAgICAgbGV0IGxhc3Q6Tm9kZTxFPiA9IG5ldyBOb2RlPEU+KGl0ZW0sIG51bGwpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzRW1wdHkpIHtcclxuICAgICAgICAgICAgdGhpcy5faGVhZC5uZXh0ID0gbGFzdDtcclxuICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0ID0gbGFzdDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl90YWlsLm5leHQubmV4dCA9IGxhc3Q7XHJcbiAgICAgICAgICAgIHRoaXMuX3RhaWwubmV4dCA9IGxhc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2xlbmd0aCArPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1bnNoaWZ0KGl0ZW06RSk6dm9pZHtcclxuICAgICAgICBsZXQgZmlyc3Q6Tm9kZTxFPiA9IG5ldyBOb2RlPEU+KGl0ZW0sIG51bGwpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzRW1wdHkpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0ID0gZmlyc3Q7XHJcbiAgICAgICAgICAgIHRoaXMuX2hlYWQubmV4dCA9IGZpcnN0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZpcnN0Lm5leHQgPSB0aGlzLl9oZWFkLm5leHQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2hlYWQubmV4dCA9IGZpcnN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9sZW5ndGggKz0gMTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5zZXJ0KGluZGV4Om51bWJlciwgaXRlbTpFKTpib29sZWFue1xyXG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPiB0aGlzLl9sZW5ndGgpIHsvL+i/meWPpeS4jeS4gOagt1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaW5kZXggPT09IHRoaXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY3VycmVudDpOb2RlPEU+ID0gdGhpcy5faGVhZDsvL+i/meWPpeWSjOWFtuS7lumBjeWOhuaYr+S4jeS4gOagt+eahO+8jOWboOS4uuimgemAieWPluWIsOmAieWumuS9jee9rueahOWJjemdouS4gOagvFxyXG4gICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgaW5kZXg7IG4gKz0gMSkge1xyXG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3VycmVudC5uZXh0ID0gbmV3IE5vZGU8RT4oaXRlbSwgY3VycmVudC5uZXh0KTtcclxuICAgICAgICB0aGlzLl9sZW5ndGggKz0gMTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liKBcclxuICAgIHB1YmxpYyByZW1vdmUoaW5kZXg6bnVtYmVyKTpFe1xyXG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY3VycmVudDpOb2RlPEU+ID0gdGhpcy5faGVhZC5uZXh0O1xyXG4gICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgaW5kZXg7IG4gKz0gMSkge1xyXG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGl0ZW06RSA9IGN1cnJlbnQuaXRlbTtcclxuICAgICAgICBjdXJyZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9sZW5ndGggLT0gMTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQuaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hpZnQoKTpFe1xyXG4gICAgICAgIGlmICh0aGlzLmlzRW1wdHkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaXRlbSA9IHRoaXMuX2hlYWQubmV4dC5pdGVtO1xyXG4gICAgICAgIHRoaXMuX2hlYWQubmV4dCA9IHRoaXMuX2hlYWQubmV4dC5uZXh0O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc0VtcHR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RhaWwubmV4dCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9sZW5ndGggLT0gMTtcclxuICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICAvL+aUuVxyXG4gICAgcHVibGljIHdyaXRlKGluZGV4Om51bWJlciwgaXRlbTpFKTp2b2lke1xyXG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGN1cnJlbnQ6Tm9kZTxFPiA9IHRoaXMuX2hlYWQubmV4dDtcclxuICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IGluZGV4OyBuICs9IDEpIHtcclxuICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGN1cnJlbnQuaXRlbSA9IGl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgLy/mn6VcclxuICAgIHB1YmxpYyByZWFkKGluZGV4Om51bWJlcik6RXtcclxuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjdXJyZW50Ok5vZGU8RT4gPSB0aGlzLl9oZWFkLm5leHQ7XHJcbiAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBpbmRleDsgbiArPSAxKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY3VycmVudC5pdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZWFyY2goaXRlbTpFKTpudW1iZXJbXXtcclxuICAgICAgICBsZXQgcmVzdWx0Om51bWJlcltdID0gW107XHJcbiAgICAgICAgdGhpcy5mb3JlYWNoKChlbGU6RSwgaW5kZXg6bnVtYmVyKT0+e1xyXG4gICAgICAgICAgICBpZiAoZWxlID09PSBpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChpbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat6ZO+6KGo5Lit5piv5ZCm5a2Y5Zyo5p+Q5LiA5YWD57SgXHJcbiAgICAgKiBAcGFyYW0gaXRlbSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGhhcyhpdGVtOiBFKTpib29sZWFue1xyXG5cclxuICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMuX2hlYWQubmV4dDtcclxuICAgICAgICB3aGlsZSAoY3VycmVudCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50Lml0ZW0gPT0gaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+mrmOmYtuWHveaVsFxyXG4gICAgcHVibGljIGZvcmVhY2goZjooZWxlOkUsIGluZGV4Om51bWJlciwgbGlzdDpMaW5rTGlzdDxFPik9PnZvaWQpOnZvaWR7XHJcbiAgICAgICAgbGV0IGN1cnJlbnQgPSB0aGlzLl9oZWFkLm5leHQ7XHJcbiAgICAgICAgbGV0IG51bTpudW1iZXIgPSAwO1xyXG4gICAgICAgIHdoaWxlIChjdXJyZW50ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGYoY3VycmVudC5pdGVtLCBudW0sIHRoaXMpO1xyXG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4gICAgICAgICAgICBudW0gKz0gMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDor7fmmoLml7bkuI3opoHkvb/nlKjov5nkuKrlh73mlbDvvIzlm6DkuLrmiJHkuZ/kuI3nn6XpgZPlroPkvJrkuI3kvJrniIbngrhcclxuICAgICAqIOmZpOmdnuS9oOivu+i/h+i/meS4quWHveaVsOeahOa6kOS7o+eggVxyXG4gICAgICogQHBhcmFtIGYg5Yik5pat5YWD57Sg5LyY5YWI57qn55qE5Zue6LCD5Ye95pWwXHJcbiAgICAgKiBAcGFyYW0gaW5jcmVhc2Ug5piv5ZCm5Y2H5bqP77yM6buY6K6k5Y2H5bqPXHJcbiAgICAgKiBAcmV0dXJucyDov5Tlm57kuIDkuKrmjpLluo/nmoTpk77ooahcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNvcnRieShmOihlbGU6RSk9Pm51bWJlciwgaW5jcmVhc2U6Ym9vbGVhbiA9IHRydWUpOkxpbmtMaXN0PEU+e1xyXG4gICAgICAgIGxldCBwcmlvcml0eTpMaW5rTGlzdDxudW1iZXI+ID0gbmV3IExpbmtMaXN0PG51bWJlcj4oKTtcclxuICAgICAgICBsZXQgc29ydGVkOkxpbmtMaXN0PEU+ID0gbmV3IExpbmtMaXN0PEU+KCk7XHJcbiAgICAgICAgcHJpb3JpdHkucHVzaCgtMCk7XHJcbiAgICAgICAgc29ydGVkLnB1c2gobnVsbCk7XHJcblxyXG4gICAgICAgIGxldCBjb21wYXJlOihhOm51bWJlcixiOm51bWJlcik9PmJvb2xlYW4gPSBpbmNyZWFzZT8oYSxiKT0+e3JldHVybiBhIDwgYjt9OihhLGIpPT57cmV0dXJuIGEgPiBifTtcclxuXHJcbiAgICAgICAgdGhpcy5mb3JlYWNoKChlbGUpPT57XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50UHJpID0gZihlbGUpO1xyXG4gICAgICAgICAgICBsZXQgbm9kZTpOb2RlPEU+ID0gc29ydGVkLl9oZWFkLm5leHQ7XHJcbiAgICAgICAgICAgIGxldCBwcmlOb2RlOk5vZGU8bnVtYmVyPiA9IHByaW9yaXR5Ll9oZWFkLm5leHQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgZm91bmRQbGFjZTpib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHdoaWxlIChub2RlLm5leHQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vIGlmIChjdXJyZW50UHJpIDwgcHJpTm9kZS5uZXh0Lml0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb21wYXJlKGN1cnJlbnRQcmksIHByaU5vZGUubmV4dC5pdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUubmV4dCA9IG5ldyBOb2RlPEU+KGVsZSwgbm9kZS5uZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICBwcmlOb2RlLm5leHQgPSBuZXcgTm9kZTxudW1iZXI+KGN1cnJlbnRQcmksIHByaU5vZGUubmV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm91bmRQbGFjZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbm9kZSA9IG5vZGUubmV4dDtcclxuICAgICAgICAgICAgICAgIHByaU5vZGUgPSBwcmlOb2RlLm5leHQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghZm91bmRQbGFjZSkge1xyXG4gICAgICAgICAgICAgICAgc29ydGVkLnB1c2goZWxlKTtcclxuICAgICAgICAgICAgICAgIHByaW9yaXR5LnB1c2goY3VycmVudFByaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc29ydGVkLnNoaWZ0KCk7XHJcbiAgICAgICAgcmV0dXJuIHNvcnRlZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBwdWJsaWMgYmJTb3J0QnkoZjooZWxlOkUpPT5udW1iZXIsIGluY3JlYXNlOmJvb2xlYW4gPSB0cnVlKTpMaW5rTGlzdDxFPntcclxuXHJcbiAgICAvLyB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUEFycmF5PEU+e1xyXG4gICAgcHVibGljIGFycjpFW107XHJcbiAgICBwdWJsaWMgcG9pbnRlcjpudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc291cmNlOkVbXSA9IFtdLCBpbml0UG9pbnQ6bnVtYmVyID0gLTEpe1xyXG4gICAgICAgIHRoaXMuYXJyID0gc291cmNlO1xyXG4gICAgICAgIHRoaXMucG9pbnRlciA9IGluaXRQb2ludDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVhZCgpOkV7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXJyW3RoaXMucG9pbnRlcl07XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBzdGVwKCk6dm9pZHtcclxuICAgICAgICB0aGlzLnBvaW50ZXIgKz0gMTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IG91dCgpOmJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucG9pbnRlciA8IDAgfHwgdGhpcy5wb2ludGVyID49IHRoaXMuYXJyLmxlbmd0aDtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQXJyYXlBbGdve1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L6T5YWl55qE5Lik5Liq5pWw57uE55qE5q+P5LiqaW5kZXjlr7nlupTlhYPntKDmmK/lkKbnm7jnrYlcclxuICAgICAqIEBwYXJhbSBhcnIwIFxyXG4gICAgICogQHBhcmFtIGFycjEgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc3RyaWN0Q29tcGFyZShhcnIwOkNvbXBhcmFibGVbXSwgYXJyMTpDb21wYXJhYmxlW10pOmJvb2xlYW57XHJcbiAgICAgICAgaWYgKGFycjAubGVuZ3RoICE9PSBhcnIxLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyMC5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICBpZiAoIWFycjBbaV0uZXF1YWxzKGFycjFbaV0pKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue5LiA5Liq6ZuG5ZCIY++8jOS4lOS9v+W+l+Wug+WFt+acieWmguS4i+aAp+i0qO+8mlxyXG4gICAgICog5a+55LqO5q+P5Liq5a2Y5Zyo5LqO6ZuG5ZCIYeS4reeahOWFg+e0oO+8jOWmguaenOWug+S4jeWcqOmbhuWQiGLkuK3vvIzliJnlroPlnKjpm4blkIhj5LitXHJcbiAgICAgKiDljbNjPWEtYlxyXG4gICAgICogQHBhcmFtIGEgXHJcbiAgICAgKiBAcGFyYW0gYiBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBmaW5kQ29tcGxlbWVudFNldChhOkNvbXBhcmFibGVbXSwgYjpDb21wYXJhYmxlW10pOkNvbXBhcmFibGVbXXtcclxuICAgICAgICBsZXQgcmVzdWx0OkNvbXBhcmFibGVbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGVsZSBvZiBhKSB7XHJcbiAgICAgICAgICAgIGlmIChBcnJheUFsZ28uZmluZEVsZShlbGUsIGIpID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZWxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy/msYLnm7jlr7nooaXpm4ZhLWJcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue5LiA5Liq6ZuG5ZCIY++8jOS4lOS9v+W+l+Wug+WFt+acieWmguS4i+aAp+i0qO+8mlxyXG4gICAgICog5a+55LqO5q+P5Liq5a2Y5Zyo5LqO6ZuG5ZCIYeS4reeahOWFg+e0oO+8jOWmguaenOWug+S4jeWcqOmbhuWQiGLkuK3vvIzliJnlroPlnKjpm4blkIhj5LitXHJcbiAgICAgKiDljbNjPWEtYlxyXG4gICAgICogXHJcbiAgICAgKiDms6jmhI/vvJrnm67liY3lpoLmnpxh5Lit5a2Y5Zyo5Lik5Liq5YWD57SgS++8jGLkuK3lrZjlnKjkuIDkuKrlhYPntKBL77yM57uT5p6c5Lit55qEY+S4jeS8muWtmOWcqOWFg+e0oEtcclxuICAgICAqIOWPquimgWLkuK3lrZjlnKjkuIDkuKrlsLHkvJrmioph6YeM55qE5YWo6YOo5YeP5o6JXHJcbiAgICAgKiBAcGFyYW0gYSBcclxuICAgICAqIEBwYXJhbSBiIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGZpbmRDb21wU2V0KGE6YW55W10sIGI6YW55W10pOmFueVtdIHtcclxuICAgICAgICBsZXQgcmVzdWx0OkNvbXBhcmFibGVbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGVsZSBvZiBhKSB7XHJcbiAgICAgICAgICAgIGlmIChiLmluZGV4T2YoYSkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChlbGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvL+axguebuOWvueihpembhmEtYlxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBmaW5kSW50ZXJzZWN0aW9uU2V0KGE6Q29tcGFyYWJsZVtdLCBiOkNvbXBhcmFibGVbXSl7XHJcbiAgICAgICAgLy/msYLkuqTpm4Zh4oipYlxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L6T5YWl5LiA5Liq5pWw57uE77yM6L+U5Zue5bCG6YeN5aSN5YWD57Sg5Yig6Zmk5ZCO55qE5paw5pWw57uEXHJcbiAgICAgKiDkuI3mlLnliqjljp/mlbDnu4RcclxuICAgICAqIOWkmuS4quWFg+e0oOS7heWPlummluS4qlxyXG4gICAgICogQHBhcmFtIGxpc3QgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc2hyaW5rKGxpc3Q6YW55W10pOmFueVtde1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcclxuXHJcbiAgICAgICAgbGlzdC5mb3JFYWNoKGVsZT0+e1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0LmluZGV4T2YoZWxlKSA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZWxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5rGCZWxl5ZyoYXJy5Lit55qEaW5kZXjvvIzoi6XmnKrmib7liLDliJnov5Tlm54tMVxyXG4gICAgICogZWxl5b+F6aG75a6e546wY29tcGFyYWJsZeaOpeWPo1xyXG4gICAgICogQHBhcmFtIGVsZSBcclxuICAgICAqIEBwYXJhbSBhcnIgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZmluZEVsZShlbGU6Q29tcGFyYWJsZSwgYXJyOkNvbXBhcmFibGVbXSk6bnVtYmVye1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgIGlmIChlbGUuZXF1YWxzKGFycltpXSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS7jmFycuS4reenu+mZpGVsZVxyXG4gICAgICog5aaC5p6cZWxl5LiN5a2Y5Zyo5YiZ5LuA5LmI6YO95LiN5YGaXHJcbiAgICAgKiBAcGFyYW0gZWxlIFxyXG4gICAgICogQHBhcmFtIGFyciBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByZW1vdmVFbGUoZWxlOmFueSwgYXJyOmFueVtdKTphbnlbXXtcclxuICAgICAgICBjb25zdCBpID0gYXJyLmluZGV4T2YoZWxlKTtcclxuICAgICAgICBpZiAoaSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgYXJyLnNwbGljZShpLDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG4vLyBleHBvcnQgY2xhc3MgQm94IGV4dGVuZHMgTGF5YS5SZWN0YW5nbGV7XHJcblxyXG4vLyAgICAgcHVibGljIHVuaXRYOm51bWJlcjtcclxuLy8gICAgIHB1YmxpYyB1bml0WTpudW1iZXI7XHJcbiAgICBcclxuXHJcbi8vICAgICBjb25zdHJ1Y3Rvcigpe1xyXG4vLyAgICAgICAgIHN1cGVyKDAsMCwwLDApO1xyXG4vLyAgICAgfVxyXG4gICBcclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOWwseaYr+KApuKApuadpeS4gOe7hO+8iDEwMOS4qu+8iemaj+acuueahOeisOaSnueusVxyXG4vLyAgICAgICogQHBhcmFtIHhSYW5nZSBcclxuLy8gICAgICAqIEBwYXJhbSB5UmFuZ2UgXHJcbi8vICAgICAgKiBAcGFyYW0gd2lkUmFuZ2UgXHJcbi8vICAgICAgKiBAcGFyYW0gaGlnUmFuZ2VcclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHVibGljIHN0YXRpYyByYW5kb21Cb3hlcyh4UmFuZ2U6bnVtYmVyID0gMTIwMCwgeVJhbmdlOm51bWJlciA9IDgwMCwgd2lkUmFuZ2U6bnVtYmVyID0gMzAwLCBoaWdSYW5nZTpudW1iZXIgPSAzMDApOkJveFtde1xyXG4vLyAgICAgICAgIGNvbnN0IHJhZDpGdW5jdGlvbiA9IE15TWF0aC5yYW5kb21JbnQ7XHJcbi8vICAgICAgICAgbGV0IHJlc3VsdDpCb3hbXSA9IFtdO1xyXG4vLyAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCA1MDsgaSArPSAxKSB7XHJcbi8vICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBCb3goKSk7XHJcbi8vICAgICAgICAgICAgIHJlc3VsdFtpXS5wb3MocmFkKHhSYW5nZSksIHJhZCh5UmFuZ2UpKS5zaXplKHJhZCh3aWRSYW5nZSksIHJhZChoaWdSYW5nZSkpO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIHB1YmxpYyBwb3MoeDpudW1iZXIsIHk6bnVtYmVyKTpCb3h7XHJcbi8vICAgICAgICAgdGhpcy54ID0geDtcclxuLy8gICAgICAgICB0aGlzLnkgPSB5O1xyXG4vLyAgICAgICAgIHJldHVybiB0aGlzO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIHB1YmxpYyBzaXplKHdpZHRoOm51bWJlciwgaGVpZ2h0Om51bWJlcik6Qm94e1xyXG4vLyAgICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuLy8gICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuLy8gICAgICAgICByZXR1cm4gdGhpcztcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBwdWJsaWMgaW50ZXJzZWN0c19YKHJlYzpCb3gpOmJvb2xlYW57XHJcbi8vICAgICAgICAgaWYgKHRoaXMueCA8IHJlYy54KSB7XHJcbi8vICAgICAgICAgICAgIHJldHVybiByZWMuaW50ZXJzZWN0c19YKHRoaXMpO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICByZXR1cm4gICh0aGlzLnggPj0gcmVjLnggJiYgdGhpcy54IDw9IHJlYy5yaWdodCkgfHxcclxuLy8gICAgICAgICAgICAgICAgICh0aGlzLnJpZ2h0ID49IHJlYy54ICYmIHRoaXMucmlnaHQgPD0gcmVjLnJpZ2h0KVxyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIHB1YmxpYyBpbnRlcnNlY3RzX1kocmVjOkJveCk6Ym9vbGVhbntcclxuLy8gICAgICAgICBpZiAodGhpcy55PHJlYy55KSB7XHJcbi8vICAgICAgICAgICAgIHJldHVybiByZWMuaW50ZXJzZWN0c19ZKHRoaXMpO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICByZXR1cm4gICh0aGlzLnkgPj0gcmVjLnkgJiYgdGhpcy55IDw9IHJlYy5ib3R0b20pIHx8XHJcbi8vICAgICAgICAgICAgICAgICAodGhpcy5ib3R0b20gPj0gcmVjLnkgJiYgdGhpcy5ib3R0b20gPD0gcmVjLmJvdHRvbSlcclxuLy8gICAgIH1cclxuLy8gfVxyXG4gICAgXHJcbi8vIGNsYXNzIE1hcE5vZGU8SyxWPntcclxuLy8gICAgIHB1YmxpYyBrZXk7XHJcbi8vICAgICBwdWJsaWMgdmFsdWU7XHJcbi8vICAgICBjb25zdHJ1Y3RvcihrZXk6SywgdmFsdWU6Vil7XHJcbi8vICAgICAgICAgdGhpcy5rZXkgPSBrZXk7XHJcbi8vICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4vLyAgICAgfVxyXG4vLyB9XHJcblxyXG4vLyBleHBvcnQgbW9kdWxlIFN0cnVje1xyXG4vLyAgICAgZXhwb3J0IGNsYXNzIExpbmtMaXN0PEU+e1xyXG4vLyAgICAgICAgIHByaXZhdGUgX2hlYWQ6Tm9kZTxFPjtcclxuLy8gICAgICAgICBwcml2YXRlIF90YWlsOk5vZGU8RT47XHJcbi8vICAgICAgICAgY29uc3RydWN0b3IoKXtcclxuLy8gICAgICAgICAgICAgdGhpcy5faGVhZCA9IG5ldyBOb2RlPEU+KG51bGwsIG51bGwpO1xyXG4vLyAgICAgICAgICAgICB0aGlzLl90YWlsID0gbmV3IE5vZGU8RT4obnVsbCwgbnVsbCk7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvL+WfuuehgOWxnuaAp1xyXG4vLyAgICAgICAgIHB1YmxpYyBnZXQgbGVuZ3RoKCk6bnVtYmVye1xyXG4vLyAgICAgICAgICAgICBsZXQgcmVzdWx0Om51bWJlciA9IDA7XHJcbi8vICAgICAgICAgICAgIGxldCBjdXJyZW50Ok5vZGU8RT4gPSB0aGlzLl9oZWFkO1xyXG4vLyAgICAgICAgICAgICB3aGlsZSAoY3VycmVudC5uZXh0ICE9PSBudWxsKSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXN1bHQgKz0gMTtcclxuLy8gICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIHB1YmxpYyBnZXQgaXNFbXB0eSgpOmJvb2xlYW57XHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLl9oZWFkLm5leHQgPT09IG51bGw7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvL+WinuWIoOaUueafpVxyXG4vLyAgICAgICAgIC8v5aKeXHJcbi8vICAgICAgICAgcHVibGljIHB1c2goaXRlbTpFKTp2b2lke1xyXG4vLyAgICAgICAgICAgICBsZXQgbGFzdDpOb2RlPEU+ID0gbmV3IE5vZGU8RT4oaXRlbSwgbnVsbCk7XHJcbi8vICAgICAgICAgICAgIGlmICh0aGlzLmlzRW1wdHkpIHtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuX2hlYWQubmV4dCA9IGxhc3Q7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLl90YWlsLm5leHQgPSBsYXN0O1xyXG4vLyAgICAgICAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0Lm5leHQgPSBsYXN0O1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0ID0gbGFzdDtcclxuLy8gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIHB1YmxpYyB1bnNoaWZ0KGl0ZW06RSk6dm9pZHtcclxuLy8gICAgICAgICAgICAgbGV0IGZpcnN0Ok5vZGU8RT4gPSBuZXcgTm9kZTxFPihpdGVtLCBudWxsKTtcclxuLy8gICAgICAgICAgICAgaWYgKHRoaXMuaXNFbXB0eSkge1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0ID0gZmlyc3Q7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLl9oZWFkLm5leHQgPSBmaXJzdDtcclxuLy8gICAgICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgIGZpcnN0Lm5leHQgPSB0aGlzLl9oZWFkLm5leHQubmV4dDtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuX2hlYWQubmV4dCA9IGZpcnN0O1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBwdWJsaWMgaW5zZXJ0KGluZGV4Om51bWJlciwgaXRlbTpFKTpib29sZWFue1xyXG4vLyAgICAgICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID4gdGhpcy5sZW5ndGgpIHsvL+i/meWPpeS4jeS4gOagt1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBpZiAoaW5kZXggPT09IHRoaXMubGVuZ3RoKSB7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLnB1c2goaXRlbSk7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IGN1cnJlbnQ6Tm9kZTxFPiA9IHRoaXMuX2hlYWQ7Ly/ov5nlj6Xlkozlhbbku5bpgY3ljobmmK/kuI3kuIDmoLfnmoTvvIzlm6DkuLropoHpgInlj5bliLDpgInlrprkvY3nva7nmoTliY3pnaLkuIDmoLxcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBpbmRleDsgbiArPSAxKSB7XHJcbi8vICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBjdXJyZW50Lm5leHQgPSBuZXcgTm9kZTxFPihpdGVtLCBjdXJyZW50Lm5leHQpO1xyXG5cclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvL+WIoFxyXG4vLyAgICAgICAgIHB1YmxpYyByZW1vdmUoaW5kZXg6bnVtYmVyKTpFe1xyXG4vLyAgICAgICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMubGVuZ3RoKSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IGN1cnJlbnQ6Tm9kZTxFPiA9IHRoaXMuX2hlYWQubmV4dDtcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBpbmRleDsgbiArPSAxKSB7XHJcbi8vICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgaXRlbTpFID0gY3VycmVudC5pdGVtO1xyXG4vLyAgICAgICAgICAgICBjdXJyZW50ID0gbnVsbDtcclxuXHJcbi8vICAgICAgICAgICAgIHJldHVybiBjdXJyZW50Lml0ZW07XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBwdWJsaWMgc2hpZnQoKTpFe1xyXG4vLyAgICAgICAgICAgICBpZiAodGhpcy5pc0VtcHR5KSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLl9oZWFkLm5leHQuaXRlbTtcclxuLy8gICAgICAgICAgICAgdGhpcy5faGVhZC5uZXh0ID0gdGhpcy5faGVhZC5uZXh0Lm5leHQ7XHJcbi8vICAgICAgICAgICAgIGlmICh0aGlzLmlzRW1wdHkpIHtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuX3RhaWwubmV4dCA9IG51bGw7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvL+aUuVxyXG4vLyAgICAgICAgIHB1YmxpYyB3cml0ZShpbmRleDpudW1iZXIsIGl0ZW06RSk6dm9pZHtcclxuLy8gICAgICAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLmxlbmd0aCkge1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgY3VycmVudDpOb2RlPEU+ID0gdGhpcy5faGVhZC5uZXh0O1xyXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IGluZGV4OyBuICs9IDEpIHtcclxuLy8gICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIGN1cnJlbnQuaXRlbSA9IGl0ZW07XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvL+afpVxyXG4vLyAgICAgICAgIHB1YmxpYyByZWFkKGluZGV4Om51bWJlcik6RXtcclxuLy8gICAgICAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLmxlbmd0aCkge1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgY3VycmVudDpOb2RlPEU+ID0gdGhpcy5faGVhZC5uZXh0O1xyXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IGluZGV4OyBuICs9IDEpIHtcclxuLy8gICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIHJldHVybiBjdXJyZW50Lml0ZW07XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBwdWJsaWMgc2VhcmNoKGl0ZW06RSk6bnVtYmVyW117XHJcbi8vICAgICAgICAgICAgIGxldCByZXN1bHQ6bnVtYmVyW10gPSBbXTtcclxuLy8gICAgICAgICAgICAgdGhpcy5mb3JlYWNoKChlbGU6RSwgaW5kZXg6bnVtYmVyKT0+e1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKGVsZSA9PT0gaXRlbSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGluZGV4KTtcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfSk7XHJcbi8vICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvKipcclxuLy8gICAgICAgICAgKiDliKTmlq3pk77ooajkuK3mmK/lkKblrZjlnKjmn5DkuIDlhYPntKBcclxuLy8gICAgICAgICAgKiBAcGFyYW0gaXRlbSBcclxuLy8gICAgICAgICAgKi9cclxuLy8gICAgICAgICBwdWJsaWMgaGFzKGl0ZW06IEUpOmJvb2xlYW57XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMuX2hlYWQubmV4dDtcclxuLy8gICAgICAgICAgICAgd2hpbGUgKGN1cnJlbnQgIT0gbnVsbCkge1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQuaXRlbSA9PSBpdGVtKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvL+mrmOmYtuWHveaVsFxyXG4vLyAgICAgICAgIHB1YmxpYyBmb3JlYWNoKGY6KGVsZTpFLCBpbmRleDpudW1iZXIsIGxpc3Q6TGlua0xpc3Q8RT4pPT52b2lkKTp2b2lke1xyXG4vLyAgICAgICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMuX2hlYWQubmV4dDtcclxuLy8gICAgICAgICAgICAgbGV0IG51bTpudW1iZXIgPSAwO1xyXG4vLyAgICAgICAgICAgICB3aGlsZSAoY3VycmVudCAhPT0gbnVsbCkge1xyXG4vLyAgICAgICAgICAgICAgICAgZihjdXJyZW50Lml0ZW0sIG51bSwgdGhpcyk7XHJcbi8vICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4vLyAgICAgICAgICAgICAgICAgbnVtICs9IDE7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIC8qKlxyXG4vLyAgICAgICAgICAqIOivt+aaguaXtuS4jeimgeS9v+eUqOi/meS4quWHveaVsO+8jOWboOS4uuaIkeS5n+S4jeefpemBk+Wug+S8muS4jeS8mueIhueCuFxyXG4vLyAgICAgICAgICAqIOmZpOmdnuS9oOivu+i/h+i/meS4quWHveaVsOeahOa6kOS7o+eggVxyXG4vLyAgICAgICAgICAqIEBwYXJhbSBmIOWIpOaWreWFg+e0oOS8mOWFiOe6p+eahOWbnuiwg+WHveaVsFxyXG4vLyAgICAgICAgICAqIEBwYXJhbSBpbmNyZWFzZSDmmK/lkKbljYfluo/vvIzpu5jorqTljYfluo9cclxuLy8gICAgICAgICAgKiBAcmV0dXJucyDov5Tlm57kuIDkuKrmjpLluo/nmoTpk77ooahcclxuLy8gICAgICAgICAgKi9cclxuLy8gICAgICAgICBwdWJsaWMgc29ydGJ5KGY6KGVsZTpFKT0+bnVtYmVyLCBpbmNyZWFzZTpib29sZWFuID0gdHJ1ZSk6TGlua0xpc3Q8RT57XHJcbi8vICAgICAgICAgICAgIGxldCBwcmlvcml0eTpMaW5rTGlzdDxudW1iZXI+ID0gbmV3IExpbmtMaXN0PG51bWJlcj4oKTtcclxuLy8gICAgICAgICAgICAgbGV0IHNvcnRlZDpMaW5rTGlzdDxFPiA9IG5ldyBMaW5rTGlzdDxFPigpO1xyXG4vLyAgICAgICAgICAgICBwcmlvcml0eS5wdXNoKC0wKTtcclxuLy8gICAgICAgICAgICAgc29ydGVkLnB1c2gobnVsbCk7XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgY29tcGFyZTooYTpudW1iZXIsYjpudW1iZXIpPT5ib29sZWFuID0gaW5jcmVhc2U/KGEsYik9PntyZXR1cm4gYSA8IGI7fTooYSxiKT0+e3JldHVybiBhID4gYn07XHJcblxyXG4vLyAgICAgICAgICAgICB0aGlzLmZvcmVhY2goKGVsZSk9PntcclxuLy8gICAgICAgICAgICAgICAgIGxldCBjdXJyZW50UHJpID0gZihlbGUpO1xyXG4vLyAgICAgICAgICAgICAgICAgbGV0IG5vZGU6Tm9kZTxFPiA9IHNvcnRlZC5faGVhZC5uZXh0O1xyXG4vLyAgICAgICAgICAgICAgICAgbGV0IHByaU5vZGU6Tm9kZTxudW1iZXI+ID0gcHJpb3JpdHkuX2hlYWQubmV4dDtcclxuXHJcbi8vICAgICAgICAgICAgICAgICBsZXQgZm91bmRQbGFjZTpib29sZWFuID0gZmFsc2U7XHJcbi8vICAgICAgICAgICAgICAgICB3aGlsZSAobm9kZS5uZXh0ICE9PSBudWxsKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGN1cnJlbnRQcmkgPCBwcmlOb2RlLm5leHQuaXRlbSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIGlmIChjb21wYXJlKGN1cnJlbnRQcmksIHByaU5vZGUubmV4dC5pdGVtKSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLm5leHQgPSBuZXcgTm9kZTxFPihlbGUsIG5vZGUubmV4dCk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHByaU5vZGUubmV4dCA9IG5ldyBOb2RlPG51bWJlcj4oY3VycmVudFByaSwgcHJpTm9kZS5uZXh0KTtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgZm91bmRQbGFjZSA9IHRydWU7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IG5vZGUubmV4dDtcclxuLy8gICAgICAgICAgICAgICAgICAgICBwcmlOb2RlID0gcHJpTm9kZS5uZXh0O1xyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgICAgIGlmICghZm91bmRQbGFjZSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHNvcnRlZC5wdXNoKGVsZSk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcHJpb3JpdHkucHVzaChjdXJyZW50UHJpKTtcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfSk7XHJcblxyXG4vLyAgICAgICAgICAgICBzb3J0ZWQuc2hpZnQoKTtcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHNvcnRlZDtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIC8vIHB1YmxpYyBiYlNvcnRCeShmOihlbGU6RSk9Pm51bWJlciwgaW5jcmVhc2U6Ym9vbGVhbiA9IHRydWUpOkxpbmtMaXN0PEU+e1xyXG5cclxuLy8gICAgICAgICAvLyB9XHJcblxyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIGV4cG9ydCBjbGFzcyBNYXA8SyxWPntcclxuLy8gICAgICAgICBwcml2YXRlIF9saXN0OkFycmF5PE1hcE5vZGU8SyxWPj5cclxuLy8gICAgICAgICBjb25zdHJ1Y3Rvcigpe1xyXG4vLyAgICAgICAgICAgICB0aGlzLl9saXN0ID0gW11cclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcHVibGljIGdldChrZXk6Syk6VntcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgZWxlIG9mIHRoaXMuX2xpc3Qpe1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKGVsZS5rZXkgPT09IGtleSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGUudmFsdWVcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gbnVsbFxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBwdWJsaWMgZ2V0S2V5QnlWYWwodmFsOlYpOkt7XHJcbi8vICAgICAgICAgICAgIGZvciAobGV0IGVsZSBvZiB0aGlzLl9saXN0KSB7XHJcbi8vICAgICAgICAgICAgICAgICBpZiAoZWxlLnZhbHVlID09PSB2YWwpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlLmtleVxyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHJldHVybiBudWxsXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHB1YmxpYyBrZXlFeGlzdChrZXk6Syk6Ym9vbGVhbntcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgZWxlIG9mIHRoaXMuX2xpc3QpIHtcclxuLy8gICAgICAgICAgICAgICAgIGlmIChlbGUua2V5ID09PSBrZXkpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBwdWJsaWMgc2V0KGtleTpLLHZhbHVlOlYpOmJvb2xlYW57XHJcbi8vICAgICAgICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgdGhpcy5fbGlzdC5sZW5ndGg7IG4gKz0gMSkge1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xpc3Rbbl0ua2V5ID09PSBrZXkpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLl9saXN0W25dLnZhbHVlID0gdmFsdWVcclxuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgdGhpcy5fbGlzdC5wdXNoKG5ldyBNYXBOb2RlPEssVj4oa2V5LHZhbHVlKSlcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHB1YmxpYyBiYXRjaFNldChrZXlzOktbXSwgdmFsdWVzOlZbXSk6Ym9vbGVhbntcclxuLy8gICAgICAgICAgICAgaWYgKGtleXMubGVuZ3RoICE9PSB2YWx1ZXMubGVuZ3RoKSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBrZXlzLmxlbmd0aDsgbiArPSAxKSB7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLnNldChrZXlzW25dLCB2YWx1ZXNbbl0pO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG5cclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcHVibGljIHJlbW92ZShrZXk6Syk6Ym9vbGVhbntcclxuLy8gICAgICAgICAgICAgbGV0IGNvdW50Om51bWJlciA9IDA7XHJcbi8vICAgICAgICAgICAgIGZvciAobGV0IGVsZSBvZiB0aGlzLl9saXN0KSB7XHJcbi8vICAgICAgICAgICAgICAgICBpZiAoZWxlLmtleSA9PT0ga2V5KSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGlzdC5zcGxpY2UoY291bnQsMSk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIGNvdW50ICs9IDE7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHB1YmxpYyBnZXQgbGVuZ3RoKCk6bnVtYmVye1xyXG4vLyAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdC5sZW5ndGhcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcHVibGljIGZvcmVhY2goZjooazpLLCB2OlYpPT52b2lkKTp2b2lke1xyXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBlbGUgb2YgdGhpcy5fbGlzdCkge1xyXG4vLyAgICAgICAgICAgICAgICAgZihlbGUua2V5LCBlbGUudmFsdWUpO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHJldHVybjtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcHVibGljIGZpbHRlcihmOihrOkssdjpWKT0+Ym9vbGVhbik6TWFwPEssVj57XHJcbi8vICAgICAgICAgICAgIGxldCByZXN1bHQgPSBuZXcgTWFwPEssVj4oKTtcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgZWxlIG9mIHRoaXMuX2xpc3QpIHtcclxuLy8gICAgICAgICAgICAgICAgIGlmIChmKGVsZS5rZXksIGVsZS52YWx1ZSkpe1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zZXQoZWxlLmtleSwgZWxlLnZhbHVlKTtcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBleHBvcnQgY2xhc3MgUG9pbnRlckxpc3Q8RT57XHJcbi8vICAgICAgICAgcHJpdmF0ZSBfbGlzdDpBcnJheTxFPiA9IFtdO1xyXG4vLyAgICAgICAgIHByaXZhdGUgX3BvaW50ZXI6bnVtYmVyID0gMDtcclxuLy8gICAgICAgICBjb25zdHJ1Y3Rvcihzb3VyY2U6QXJyYXk8RT4gPSBbXSwgaW5pdFBvaW50Om51bWJlciA9IDApe1xyXG4vLyAgICAgICAgICAgICBzb3VyY2UuZm9yRWFjaCgoZWxlKT0+e1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5fbGlzdC5wdXNoKGVsZSk7XHJcbi8vICAgICAgICAgICAgIH0pXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBnZXQgZXhjZWVkaW5nKCk6Ym9vbGVhbntcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BvaW50ZXIgPj0gdGhpcy5fbGlzdC5sZW5ndGggfHwgdGhpcy5fcG9pbnRlciA8IDBcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIC8qXHJcbi8vICAgICAgICAg5Lul5LiL5rOo6YeK5Lit77yM5oqK5pWw57uE55yL5L2c5qiq5ZCR5o6S5YiX55qE5LiA57O75YiX5YWD57SgXHJcbi8vICAgICAgICAgaW5kZXggPSAw55qE5YWD57Sg5Zyo5pyA5bem5L6nXHJcbi8vICAgICAgICAgKi9cclxuXHJcbi8vICAgICAgICAgcmVhZCgpOkV7Ly/mn6XnnIvlvZPliY1wb2ludGVy5omA5oyH55qE5YWD57SgXHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLl9saXN0W3RoaXMuX3BvaW50ZXJdXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBzdGVwKCk6RXsvL3BvaW50ZXLlkJHlj7Pnp7vkuIDmraVcclxuLy8gICAgICAgICAgICAgdGhpcy5fcG9pbnRlcis9MTtcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVhZCgpO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgdG8ocGxhY2U6bnVtYmVyKTpQb2ludGVyTGlzdDxFPnsvL3BvaW50ZXLnp7vliLDmjIflrprkvY3nva5cclxuLy8gICAgICAgICAgICAgdGhpcy5fcG9pbnRlciA9IHBsYWNlXHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBwdXNoKGRhdGE6RSk6UG9pbnRlckxpc3Q8RT57Ly/lnKjmlbDnu4TmnKvlsL7lop7liqDkuIDkuKrlhYPntKBcclxuLy8gICAgICAgICAgICAgdGhpcy5fbGlzdC5wdXNoKGRhdGEpXHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBzZXQoaW5kZXg6bnVtYmVyLGRhdGE6RSk6UG9pbnRlckxpc3Q8RT57Ly/opoblhpnmlbDnu4TnibnlrpppbmRleOS4reeahOWFg+e0oFxyXG4vLyAgICAgICAgICAgICB0aGlzLl9saXN0W2luZGV4XSA9IGRhdGFcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXNcclxuLy8gICAgICAgICB9XHJcbiAgICAgICAgXHJcbi8vICAgICAgICAgbmV4dChzaGlmdDpudW1iZXIgPSAxKTpFe1xyXG4vLyAgICAgICAgICAgICAvL+ivu+WPluS9jeS6juW9k+WJjXBvaW50ZXLmiYDmjIfnmoTlhYPntKDlj7Povrnoi6XlubLmoLznmoTlhYPntKBcclxuLy8gICAgICAgICAgICAgLy9zaGlmdOm7mOiupOS4ujHvvIzljbPlvZPliY1wb2ludGVy5Y+z6L6555u46YK755qE5YWD57SgXHJcbi8vICAgICAgICAgICAgIC8vc2hpZnTkuLrotJ/mlbDml7bojrflj5blt6bkvqfnmoTlhYPntKBcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RbdGhpcy5fcG9pbnRlcitzaGlmdF1cclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIGdldCBsZW5ndGgoKTpudW1iZXJ7Ly/ojrflj5bmlbDnu4Tplb/luqZcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3QubGVuZ3RoXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBnZXQgbGFzdCgpOkV7Ly/ojrflj5bmnIDlkI7kuIDpoblcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RbdGhpcy5fbGlzdC5sZW5ndGgtMV1cclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIGdldCBmaXJzdCgpOkV7Ly/ojrflj5bpppbpoblcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RbMF07XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBnZXQgcG9pbnRlcigpOm51bWJlcnsvL+iOt+WPlnBvaW50ZXJcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BvaW50ZXJcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIGdldCBhdEVuZCgpOmJvb2xlYW57Ly/mn6XnnIvigJxwb2ludGVy5oyH5ZCR5pWw57uE5pyA5Y+z5L6n55qE5YWD57Sg4oCd55qE55yf5YC8XHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wb2ludGVyID09PSB0aGlzLl9saXN0Lmxlbmd0aCAtIDFcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcbi8vIH0iLCIvL1RPRE9cclxuLy/mlL7nva7miJHku6zpobnnm67ph4zoh6rlrprkuYnnmoTpgJrnlKhLRVnlgLzooahcclxuLy/mlL7lnKjlkIzkuIDkuKrmlofku7bph4zmnInliqnkuo7nu5PmnoTmuIXmmbBcclxuLy/lj6bvvJrlpoLmnpzlj6rmnInmn5DnibnlrprmqKHlnZfns7vnu5/ph4zkvb/nlKjnmoRlbnVt5Y+v5Lul5LiN5pS+6L+H5p2lIOebtOaOpeWGmeWcqOaooeWdl+aWh+S7tuS4rVxyXG5cclxuLy/lj4jlj6bvvJog5bu66K6u5Zyo5L2/55SoZW51beeahOaXtuWAmeWKoOS4gOS4quepuuWAvE5vbmXku6XlupTlr7nliKTlrprpl67pophcclxuXHJcbmV4cG9ydCBlbnVtIEFjdG9yVHlwZSB7XHJcbiAgICBOb25lLFxyXG4gICAgT3BlcmF0b3IsXHJcbiAgICBNb25zdGVyLFxyXG4gICAgVG9rZW5cclxuICAgIC8v6L+Z5YW25a6e5piv5a+55bqU55qE5LiN5ZCM55qE5pWw5o2u5qih5p2/XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIENhbXBUeXBlIHtcclxuICAgIE5vbmUsXHJcbiAgICBTZWxmLCAgIC8v5oiR5pa5XHJcbiAgICBFbmVteSAgIC8v5pWM5pa5XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9kTG9nIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogRG9kTG9nO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSW5zdGFuY2UoKTogRG9kTG9nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2UgfHwgKHRoaXMuX2luc3RhbmNlID0gbmV3IHRoaXMoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBkZWJ1Zyhtc2c6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIG1zZyA9IGAke21zZ31gO1xyXG4gICAgICAgIGNvbnNvbGUuZGVidWcobXNnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGluZm8obXNnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBtc2cgPSBgJHttc2d9YDtcclxuICAgICAgICBjb25zb2xlLmluZm8obXNnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHdhcm4obXNnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBtc2cgPSBgJHttc2d9YDtcclxuICAgICAgICBjb25zb2xlLndhcm4obXNnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGVycm9yKG1zZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgbXNnID0gYCR7bXNnfWA7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihtc2cpO1xyXG4gICAgICAgIERvZExvZy5JbnN0YW5jZS5fd3JpdGVUb0ZpbGUobXNnKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF93cml0ZVRvRmlsZShsb2c6IHN0cmluZykge1xyXG4gICAgICAgIC8vVE9ET1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGludGVyZmFjZSBDb21wYXJhYmxle1xyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3kuKTkuKrlhYPntKDmmK/lkKbnm7jnrYlcclxuICAgICAqIOW/hemhu+WPr+mAhlxyXG4gICAgICogQHBhcmFtIGVsZSBcclxuICAgICAqL1xyXG4gICAgZXF1YWxzKGVsZTpDb21wYXJhYmxlKTpib29sZWFuXHJcbn1cclxuICAgIFxyXG5leHBvcnQgY2xhc3MgRG9kTWF0aHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnmEvYueahOaVtOaVsOe7k+aenO+8iOWwj+aVsOmDqOWIhuiIjeWOuylcclxuICAgICAqIGHvvIxi5aaC5p6c5LiN5Zyo5q2j5pW05pWw5Z+f77yM6K+356Gu5L+d6ZiF6K+76L+H5q2k5Ye95pWwXHJcbiAgICAgKiB84oCU4oCU4oCU4oCUfOKAlOKAlOKAlOKAlHzigJTigJTigJTigJR84oCU4oCU4oCU4oCUfOKAlOKAlOKAlOKAlHxcclxuICAgICAqICAgICAtMTwtLS0wPC0tLTE8LS0tXHJcbiAgICAgKiAgICAgIOWPr+S7peeQhuino+S4uuWcqOaVsOi9tOS4iuaKiue7k+aenOWQkeW3puaYoOWwhFxyXG4gICAgICogQHBhcmFtIGEgXHJcbiAgICAgKiBAcGFyYW0gYiBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBpbnREaXZpc2lvbihhOm51bWJlciwgYjpudW1iZXIpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gKGEtYSViKS9iO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Zyo5bmz6Z2i5LiK5rGC5LuO5oyH5a6a5Ye65Y+R54K55Yiw5oyH5a6a57uI54K55L2c5LiA5p2h5oyH5a6a6ZW/5bqm55qE57q/5q6177yM5q2k57q/5q6155qE5Y+m5LiA56uv54K555qE5Z2Q5qCHXHJcbiAgICAgKiDvvIjlpoLmnpzmraTnur/mrrXnmoTplb/luqblpKfkuo7nrYnkuo7lh7rlj5HngrnliLDnu4jngrnnmoTot53nprvvvIzliJnovpPlh7rnu4jngrnnmoTlnZDmoIfvvIlcclxuICAgICAqIEBwYXJhbSBmcm9tIFxyXG4gICAgICogQHBhcmFtIGVuZCBcclxuICAgICAqIEBwYXJhbSBtb3ZlbWVudCBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBtb3ZlVG8oZnJvbTpWZWMyLCBlbmQ6VmVjMiwgbW92ZW1lbnQ6bnVtYmVyKTpWZWMye1xyXG4gICAgICAgIGNvbnN0IHhkaXMgPSBlbmQueCAtIGZyb20ueDtcclxuICAgICAgICBjb25zdCB5ZGlzID0gZW5kLnkgLSBmcm9tLnk7XHJcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoKHhkaXMpKioyICsgKHlkaXMpKioyKTtcclxuICAgICAgICBpZiAobW92ZW1lbnQgPj0gZGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVuZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcmF0aW8gPSBtb3ZlbWVudCAvIGRpc3RhbmNlO1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjMihmcm9tLnggKyB4ZGlzKnJhdGlvLGZyb20ueSArIHlkaXMqcmF0aW8pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTXlNYXRoLm1vdmVUb+WHveaVsOeahOWPpuS4gOS4queJiOacrOOAgui/meS4queJiOacrOS8muebtOaOpeS/ruaUuShmcm9tOlZlYzIp5Lyg5YWl55qE5a+56LGh5pys6Lqr77yM5bm25Yik5pat5pyA57uIZnJvbeS4jmVuZOS4pOS4quWvueixoeaYr+WQpumHjeWQiFxyXG4gICAgICogQHBhcmFtIGZyb20gXHJcbiAgICAgKiBAcGFyYW0gZW5kIFxyXG4gICAgICogQHBhcmFtIG1vdmVtZW50IFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG1vdmVUb1NpZGVFZmZlY3QoZnJvbTpWZWMyLCBlbmQ6VmVjMiwgbW92ZW1lbnQ6bnVtYmVyKTpib29sZWFue1xyXG4gICAgICAgIGNvbnN0IHhkaXMgPSBlbmQueCAtIGZyb20ueDtcclxuICAgICAgICBjb25zdCB5ZGlzID0gZW5kLnkgLSBmcm9tLnk7XHJcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoKHhkaXMpKioyICsgKHlkaXMpKioyKTtcclxuICAgICAgICBpZiAobW92ZW1lbnQgPj0gZGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgZnJvbS54ID0gZW5kLng7XHJcbiAgICAgICAgICAgIGZyb20ueSA9IGVuZC55O1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcmF0aW8gPSBtb3ZlbWVudCAvIGRpc3RhbmNlO1xyXG4gICAgICAgIGZyb20ueCA9IGZyb20ueCArIHhkaXMqcmF0aW87XHJcbiAgICAgICAgZnJvbS55ID0gZnJvbS55ICsgeWRpcypyYXRpbztcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNeU1hdGgubW92ZVRv5Ye95pWw55qE5Y+m5LiA5Liq54mI5pys44CC6L+U5Zue55u057q/6YCf5bqm5ZyoeHnkuKTovbTkuIrnmoTliIbph49cclxuICAgICAqIEBwYXJhbSBmcm9tIFxyXG4gICAgICogQHBhcmFtIGVuZCBcclxuICAgICAqIEBwYXJhbSBtb3ZlbWVudCBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBtb3ZlVG9Db21wb25lbnQoZnJvbTpWZWMyLCBlbmQ6VmVjMiwgbW92ZW1lbnQ6bnVtYmVyKTpWZWMye1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IHhkaXMgPSBlbmQueCAtIGZyb20ueDtcclxuICAgICAgICBjb25zdCB5ZGlzID0gZW5kLnkgLSBmcm9tLnk7XHJcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoKHhkaXMpKioyICsgKHlkaXMpKioyKTtcclxuICAgICAgICBjb25zdCByYXRpbyA9IG1vdmVtZW50IC8gZGlzdGFuY2U7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMyKHhkaXMqcmF0aW8sIHlkaXMqcmF0aW8pO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBWZWMyIGltcGxlbWVudHMgQ29tcGFyYWJsZXtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGxpc3RGcm9tTGlzdChsaXN0Om51bWJlcltdW10pOlZlYzJbXXtcclxuICAgICAgICBsZXQgcmVzdWx0OlZlYzJbXSA9IFtdO1xyXG5cclxuICAgICAgICBsaXN0LmZvckVhY2goZWxlPT57XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBWZWMyKGVsZVswXSxlbGVbMV0pKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgeDpudW1iZXI7XHJcbiAgICBwdWJsaWMgeTpudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57ku47mraTngrnliLDmjIflrprngrnnmoTot53nprtcclxuICAgICAqIEBwYXJhbSBlbmQgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXN0YW5jZVRvKGVuZDpWZWMyKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuICgoZW5kLnggLSB0aGlzLngpKioyICsgKGVuZC55IC0gdGhpcy55KSoqMikqKjAuNTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaxguWSjOS4pOS4qlZlY++8jOi/lOWbnue7k+aenO+8jOS4jeS/ruaUueWOn+WunuS+i1xyXG4gICAgICogQHBhcmFtIHZlYyBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHBsdXModmVjOlZlYzIpOlZlYzJ7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMyKHRoaXMueCArIHZlYy54LCB0aGlzLnkgKyB2ZWMueSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDku6XovpPlhaXlnZDmoIfkuLrkuK3lv4Pov5vooYzpobrml7bpkog5MOW6puaXi+i9rFxyXG4gICAgICog77yI5pyq5a6M5oiQ77yJXHJcbiAgICAgKiBAcGFyYW0gY2VudHJlIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcm90YXRlQ2xvY2t3aXNlKGNlbnRyZTpWZWMyKTpWZWMye1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue5q2k5ZCR6YeP55qE5aSN5Yi2XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbG9uZSgpOlZlYzJ7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMyKHRoaXMueCwgdGhpcy55KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXF1YWxzKGVsZTpWZWMyKTpib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLnggPT09IGVsZS54ICYmIHRoaXMueSA9PT0gZWxlLnk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoeD86bnVtYmVyLCB5PzpudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iLCIvL2F1dGhvciBOYTJDdUM0TzhcclxuXHJcblxyXG5pbXBvcnQgQ3VzdG9taXplZFNwcml0ZSBmcm9tIFwiLi9jdXN0b21pemVkU3ByXCI7XHJcbmltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi4vLi4vRG9kTWF0aFwiO1xyXG5pbXBvcnQgeyBFdmVudENlbnRyZSB9IGZyb20gXCIuLi8uLi8uLi9FdmVudC9FdmVudENlbnRyZVwiO1xyXG5pbXBvcnQgeyBNeVN5bWJvbCB9IGZyb20gXCIuLi8uLi8uLi9GaXgvRml4U3ltYm9sXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQmFye1xyXG5cclxuICAgIHByaXZhdGUgX2luaXRQb3M6VmVjMjsvL+i1t+Wni+WdkOagh1xyXG4gICAgcHJpdmF0ZSBfaW5pdFNpemU6VmVjMjsvL+i1t+Wni+Wkp+Wwj1xyXG4gICAgcHJpdmF0ZSBfcG9zOlZlYzI7Ly/nvKnmlL7lkI7lnZDmoIdcclxuICAgIHByaXZhdGUgX3NpemU6VmVjMjsvL+e8qeaUvuWQjuWkp+Wwj1xyXG4gICAgcHJpdmF0ZSBfc2NhbGU6bnVtYmVyID0gMTsvL+WFqOWxgOe8qeaUvuavlFxyXG4gICAgcHJpdmF0ZSBfc3ltYk51bTpudW1iZXI7Ly/ov5vluqbmnaHnvJblj7dcclxuICAgIHByaXZhdGUgX2JhY2tTcHI6Q3VzdG9taXplZFNwcml0ZTsvL+i/m+W6puadoeW6leWxgue7mOWbvuiKgueCuVxyXG4gICAgcHJpdmF0ZSBfZnJvbnRTcHI6Q3VzdG9taXplZFNwcml0ZTsvL+i/m+W6puadoemhtuWxgue7mOWbvuiKgueCuVxyXG4gICAgcHJpdmF0ZSBfcGVyY2VudGFnZTpudW1iZXIgPSAxOy8v6L+b5bqmXHJcbiAgICBwcml2YXRlIF9oZWlnaHQ6bnVtYmVyOy8v6L+b5bqm5p2h6auY5bqmXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+b5bqm5p2h5p6E6YCg5ZmoXHJcbiAgICAgKiBAcGFyYW0gc3ltYk51bSDov5vluqbmnaHnvJblj7dcclxuICAgICAqIEBwYXJhbSBiYWNrR3JvdW5kQ29sb3Ig6IOM5pmv6aKc6ImyXHJcbiAgICAgKiBAcGFyYW0gc2l6ZSDlpKflsI9cclxuICAgICAqIEBwYXJhbSBwb3Mg5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gc2NhbGUg5YWo5bGA57yp5pS+5q+UXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHN5bWJOdW06bnVtYmVyLCBiYWNrR3JvdW5kQ29sb3I6c3RyaW5nLHNpemU6VmVjMiAscG9zOlZlYzIsIHNjYWxlOm51bWJlciA9IDEpe1xyXG4gICAgICAgIHRoaXMuX3N5bWJOdW0gPSBzeW1iTnVtO1xyXG4gICAgICAgIHRoaXMuX2luaXRTaXplID0gc2l6ZTtcclxuICAgICAgICB0aGlzLl9zY2FsZSA9IHNjYWxlO1xyXG4gICAgICAgIHRoaXMuX3NpemUgPSBuZXcgVmVjMih0aGlzLl9pbml0U2l6ZS54KnRoaXMuX3BlcmNlbnRhZ2UqdGhpcy5fc2NhbGUsdGhpcy5faW5pdFNpemUueSp0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5faW5pdFBvcyA9IHBvcztcclxuICAgICAgICB0aGlzLl9wb3MgPSBuZXcgVmVjMih0aGlzLl9pbml0UG9zLngqdGhpcy5fc2NhbGUsdGhpcy5faW5pdFBvcy55KnRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9iYWNrU3ByID0gbmV3IEN1c3RvbWl6ZWRTcHJpdGUoKTtcclxuICAgICAgICB0aGlzLl9iYWNrU3ByLnNldFBhcmFtKHRoaXMuX3Bvcy54LHRoaXMuX3Bvcy55LHRoaXMuX3NpemUueCx0aGlzLl9zaXplLnksYmFja0dyb3VuZENvbG9yKTtcclxuICAgICAgICB0aGlzLl9iYWNrU3ByLmNoYW5nZUNvbG9yKCk7XHJcbiAgICAgICAgdGhpcy5fZnJvbnRTcHIgPSBuZXcgQ3VzdG9taXplZFNwcml0ZSgpO1xyXG4gICAgICAgIHRoaXMuX2JhY2tTcHIuYWRkQ2hpbGQodGhpcy5fZnJvbnRTcHIpO1xyXG4gICAgICAgIHRoaXMuX2Zyb250U3ByLnNldFBhcmFtKDAsMCx0aGlzLl9zaXplLngsdGhpcy5fc2l6ZS55LFwiIzhiOGI4M1wiLG5ldyBWZWMyKHRoaXMuX3NjYWxlLHRoaXMuX3NjYWxlKSk7XHJcbiAgICAgICAgdGhpcy5fZnJvbnRTcHIuY2hhbmdlQ29sb3IoKTtcclxuICAgICAgICB0aGlzLl9oZWlnaHQgPSB0aGlzLl9pbml0U2l6ZS55O1xyXG4gICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLm9uKEV2ZW50Q2VudHJlLkVUeXBlLlBFUkZPUk1BTkNFX1JFU0NBTEUoKSx0aGlzLHRoaXMucmVTY2FsZSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5L+u5pS557yp5pS+5q+UXHJcbiAgICAgKiBAcGFyYW0gdmFsdWUg5YWo5bGA57yp5pS+5q+UXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVTY2FsZSh2YWx1ZTpudW1iZXIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fc2NhbGUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLl9wb3MgPSBuZXcgVmVjMih0aGlzLl9pbml0UG9zLngqdGhpcy5fc2NhbGUsIHRoaXMuX2luaXRQb3MueSp0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fc2l6ZSA9IG5ldyBWZWMyKHRoaXMuX2luaXRTaXplLngqdGhpcy5fc2NhbGUsIHRoaXMuX2luaXRTaXplLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX2JhY2tTcHIuc2V0UGFyYW0odGhpcy5fcG9zLngsdGhpcy5fcG9zLnksdGhpcy5fc2l6ZS54LHRoaXMuX3NpemUueSk7Ly/orr7nva7og4zmma/nu5jlm77oioLngrnlj4LmlbBcclxuICAgICAgICB0aGlzLl9iYWNrU3ByLmNoYW5nZUNvbG9yKCk7XHJcbiAgICAgICAgdGhpcy5fZnJvbnRTcHIuc2V0UGFyYW0oMCwwLHRoaXMuX3NpemUueCp0aGlzLl9wZXJjZW50YWdlLHRoaXMuX3NpemUueSxcIiM4YjhiODNcIixuZXcgVmVjMigxKnRoaXMuX3NjYWxlLDEqdGhpcy5fc2NhbGUpKTsvL+iuvue9ruWJjeerr+e7mOWbvuiKgueCueWPguaVsFxyXG4gICAgICAgIHRoaXMuX2Zyb250U3ByLmNoYW5nZUNvbG9yKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7ov5vluqbmnaHku6Plj7dcclxuICAgICAqIEBwYXJhbSBzeW1iTnVtIOi/m+W6puadoeS7o+WPt1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U3ltYihzeW1iTnVtOm51bWJlcik6dm9pZHtcclxuICAgICAgICB0aGlzLl9zeW1iTnVtID0gc3ltYk51bTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS/ruaUuei/m+W6plxyXG4gICAgICogQHBhcmFtIHBlcmNlbnRhZ2Ug55uu5qCH6L+b5bqmXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgcGVyY2VudGFnZShwZXJjZW50YWdlOm51bWJlcil7XHJcbiAgICAgICAgaWYocGVyY2VudGFnZSA9PT0gMCl7XHJcbiAgICAgICAgICAgIHRoaXMuX3BlcmNlbnRhZ2UgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9mcm9udFNwci5ncmFwaGljcy5jbGVhcigpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9wZXJjZW50YWdlID0gcGVyY2VudGFnZTtcclxuICAgICAgICAgICAgdGhpcy5fZnJvbnRTcHIuc2V0UGFyYW0oMCwwLHRoaXMuX3NpemUueCp0aGlzLl9wZXJjZW50YWdlLHRoaXMuX3NpemUueSxcIiM4YjhiODNcIixuZXcgVmVjMigxKnRoaXMuX3NjYWxlLDEqdGhpcy5fc2NhbGUpKTtcclxuICAgICAgICAgICAgdGhpcy5fZnJvbnRTcHIuY2hhbmdlQ29sb3IoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57mnKzov5vluqbmnaHog4zmma/nu5jlm77oioLngrlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEJhY2tTcHIoKTpDdXN0b21pemVkU3ByaXRle1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iYWNrU3ByO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue5pys6L+b5bqm5p2h6auY5bqmXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRIZWlnaHQoKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hlaWdodDtcclxuICAgIH1cclxuXHJcblxyXG5cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJ1dHRvbntcclxuXHJcbiAgICBwcml2YXRlIF9pbml0UG9zOlZlYzI7Ly/mjInpkq7liJ3lp4vlnZDmoIdcclxuICAgIHByaXZhdGUgX2luaXRTaXplOlZlYzI7Ly/mjInpkq7liJ3lp4vlrr3pq5hcclxuICAgIHByaXZhdGUgX3BvczpWZWMyOy8v5pi+56S66IqC54K55Z2Q5qCHXHJcbiAgICBwcml2YXRlIF9zaXplOlZlYzI7Ly/mmL7npLroioLngrnlrr3pq5hcclxuICAgIHByaXZhdGUgX3N5bWJOYW1lOm51bWJlcjsvL+aMiemSrue8luWPt1xyXG4gICAgcHJpdmF0ZSBfY29sb3I6c3RyaW5nOy8v5oyJ6ZKu6aKc6ImyXHJcbiAgICBwcml2YXRlIF9oZWlnaHQ6bnVtYmVyOy8v5oyJ6ZKu6auY5bqm77yI6buY6K6k57yp5pS+5q+U5Li6Me+8iVxyXG4gICAgcHJpdmF0ZSBfc3ByOkN1c3RvbWl6ZWRTcHJpdGU7Ly/mjInpkq7mmL7npLroioLngrlcclxuICAgIHByaXZhdGUgX3NjYWxlOm51bWJlcjsvL+WFqOWxgOe8qeaUvuavlFxyXG4gICAgcHJpdmF0ZSBfbmFtZTpzdHJpbmc7Ly/mjInpkq7lkI3vvIjmmL7npLrlnKjmjInpkq7kuIrvvIlcclxuICAgIHByaXZhdGUgX2Z1bjpGdW5jdGlvbjsvL+aMiemSruaJgOaQuuW4pueahOWKn+iDveWHveaVsFxyXG4gICAgcHJpdmF0ZSBfQVJVc3ltYjpNeVN5bWJvbDsvL+aMiemSruaJgOWcqEFjdG9yUlVcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaMiemSruaehOmAoOWZqFxyXG4gICAgICogQHBhcmFtIG5hbWUg5oyJ6ZKu5ZCNXHJcbiAgICAgKiBAcGFyYW0gc3ltYk51bSDmjInpkq7nvJblj7dcclxuICAgICAqIEBwYXJhbSBwb3Mg6LW35aeL5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gc2l6ZSDotbflp4vlrr3pq5hcclxuICAgICAqIEBwYXJhbSBjb2xvciDmjInpkq7popzoibJcclxuICAgICAqIEBwYXJhbSBzY2FsZSDnvKnmlL7mr5RcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoQVJVc3ltYjpNeVN5bWJvbCwgbmFtZTpzdHJpbmcgPSBcImRlZmF1bHRcIiwgc3ltYk51bTpudW1iZXIsIHBvczpWZWMyLCBzaXplOlZlYzIsICBjb2xvcjpzdHJpbmcgPSBcIiMwMEIyQkZcIiwgc2NhbGU6bnVtYmVyID0gMSl7XHJcbiAgICAgICAgdGhpcy5fQVJVc3ltYiA9IEFSVXN5bWI7XHJcbiAgICAgICAgdGhpcy5fc3ltYk5hbWUgPSBzeW1iTnVtO1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuX2luaXRQb3MgPSBwb3M7XHJcbiAgICAgICAgdGhpcy5faW5pdFNpemUgPSBzaXplO1xyXG4gICAgICAgIHRoaXMuX2NvbG9yID0gY29sb3I7XHJcbiAgICAgICAgdGhpcy5fc2NhbGUgPSBzY2FsZTtcclxuICAgICAgICB0aGlzLl9wb3MgPSBuZXcgVmVjMih0aGlzLl9pbml0UG9zLngqdGhpcy5fc2NhbGUsdGhpcy5faW5pdFBvcy55KnRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9zaXplID0gbmV3IFZlYzIodGhpcy5faW5pdFNpemUueCp0aGlzLl9zY2FsZSx0aGlzLl9pbml0U2l6ZS55KnRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9oZWlnaHQgPSB0aGlzLl9pbml0U2l6ZS55O1xyXG4gICAgICAgIHRoaXMuX3NwciA9IG5ldyBDdXN0b21pemVkU3ByaXRlKCk7XHJcbiAgICAgICAgdGhpcy5fc3ByLnNldFBhcmFtKHRoaXMuX3Bvcy54LHRoaXMuX3Bvcy55LHRoaXMuX3NpemUueCx0aGlzLl9zaXplLnksdGhpcy5fY29sb3IpO1xyXG4gICAgICAgIHRoaXMuX3Nwci5jaGFuZ2VDb2xvcigpO1xyXG4gICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLm9uKEV2ZW50Q2VudHJlLkVUeXBlLlBFUkZPUk1BTkNFX1JFU0NBTEUoKSx0aGlzLHRoaXMucmVTY2FsZSk7XHJcbiAgICAgICAgdGhpcy5zZXRUZXh0KCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5oyJ6ZKu5Yqf6IO9XHJcbiAgICAgKiBAcGFyYW0gZnVuIOaMiemSruWKn+iDveWHveaVsFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0RnVuYyhmdW46RnVuY3Rpb24pOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fZnVuID0gZnVuO1xyXG4gICAgICAgIHRoaXMuX3Nwci5vbihMYXlhLkV2ZW50Lk1PVVNFX1VQLHRoaXMsdGhpcy5fZnVuKTtcclxuICAgICAgICB0aGlzLl9zcHIub24oTGF5YS5FdmVudC5NT1VTRV9PVkVSLHRoaXMsKGU6IExheWEuRXZlbnQpPT57XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9zcHIub24oTGF5YS5FdmVudC5NT1VTRV9VUCx0aGlzLChlOiBMYXlhLkV2ZW50KT0+e1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue5oyJ6ZKu57uY5Zu+6IqC54K5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRTcHIoKTpDdXN0b21pemVkU3ByaXRle1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zcHI7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOe8qeaUvuaMiemSrlxyXG4gICAgICogQHBhcmFtIHZhbHVlIOWFqOWxgOe8qeaUvuavlFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVTY2FsZSh2YWx1ZTpudW1iZXIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fc2NhbGUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLl9wb3MgPSBuZXcgVmVjMih0aGlzLl9pbml0UG9zLngqdGhpcy5fc2NhbGUsdGhpcy5faW5pdFBvcy55KnRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9zaXplID0gbmV3IFZlYzIodGhpcy5faW5pdFNpemUueCp0aGlzLl9zY2FsZSx0aGlzLl9pbml0U2l6ZS55KnRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9zcHIuc2V0UGFyYW0odGhpcy5fcG9zLngsdGhpcy5fcG9zLnksdGhpcy5fc2l6ZS54LHRoaXMuX3NpemUueSx0aGlzLl9jb2xvcik7XHJcbiAgICAgICAgdGhpcy5fc3ByLmNoYW5nZUNvbG9yKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuLLmn5PmlofmnKxcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFRleHQoKTp2b2lke1xyXG4gICAgICAgIGxldCB0bXBUZXg6TGF5YS5UZXh0ID0gbmV3IExheWEuVGV4dCgpO1xyXG4gICAgICAgIHRtcFRleC53aWR0aCA9IHRoaXMuX3NpemUueDtcclxuICAgICAgICB0bXBUZXguaGVpZ2h0ID0gdGhpcy5fc2l6ZS55O1xyXG4gICAgICAgIHRtcFRleC54ID0gMDtcclxuICAgICAgICB0bXBUZXgueSA9IDA7XHJcbiAgICAgICAgdG1wVGV4LmZvbnRTaXplID0gOTtcclxuICAgICAgICB0bXBUZXgudGV4dCA9IHRoaXMuX25hbWU7XHJcbiAgICAgICAgdG1wVGV4LmFsaWduID0gXCJjZW50ZXJcIjtcclxuICAgICAgICB0bXBUZXgudmFsaWduID0gXCJtaWRkbGVcIjtcclxuICAgICAgICB0aGlzLl9zcHIuYWRkQ2hpbGQodG1wVGV4KTtcclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFRleHQgZXh0ZW5kcyBMYXlhLlRleHR7XHJcbiAgICBwcml2YXRlIF9zd2l0Y2g6Ym9vbGVhbiA9IHRydWU7Ly/mlofmnKzmmL7npLrlvIDlhbMg6buY6K6k5YWz6ZetXHJcbiAgICBwcml2YXRlIF9zY2FsZTpudW1iZXI7Ly/lhajlsYDnvKnmlL7mr5RcclxuICAgIHByaXZhdGUgX3NpemU6VmVjMjsvL+i1t+Wni+Wkp+Wwj1xyXG4gICAgcHJpdmF0ZSBfcG9zOlZlYzIgPSBuZXcgVmVjMigwLDApOy8v6LW35aeL5Z2Q5qCHXHJcbiAgICBwcml2YXRlIF9teVN0cmluZzpzdHJpbmc7Ly/mlofmnKzlhoXlrrlcclxuICAgIHByaXZhdGUgX0FSVXN5bWI6TXlTeW1ib2w7Ly/miYDlnKjlj6/op4boioLngrlcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaWh+acrOaehOmAoOWZqFxyXG4gICAgICogQHBhcmFtIHNpemUg6LW35aeL5aSn5bCPXHJcbiAgICAgKiBAcGFyYW0gc2NhbGUg57yp5pS+5q+UXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioc2l6ZTpWZWMyLCBzY2FsZTpudW1iZXIpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fc2l6ZSA9IHNpemU7XHJcbiAgICAgICAgdGhpcy5fc2NhbGUgPSBzY2FsZTtcclxuICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5fc2l6ZS54KnRoaXMuX3NjYWxlOy8v6K6h566X5Y+v6KeG6IqC54K55a695bqmXHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLl9zaXplLnkqdGhpcy5fc2NhbGU7Ly/orqHnrpflj6/op4boioLngrnpq5jluqZcclxuICAgICAgICB0aGlzLmZvbnRTaXplID0gMTAqdGhpcy5fc2NhbGU7Ly/orqHnrpflrZfkvZPlpKflsI9cclxuICAgICAgICB0aGlzLmFsaWduID0gXCJjZW50ZXJcIjsvL+m7mOiupOerluebtOWxheS4rVxyXG4gICAgICAgIHRoaXMudmFsaWduID0gXCJtaWRkbGVcIjsvL+m7mOiupOawtOW5s+WxheS4rVxyXG4gICAgICAgIHRoaXMud29yZFdyYXAgPSB0cnVlOy8v6buY6K6k6Ieq5Yqo5o2i6KGM5byA5ZCvXHJcbiAgICAgICAgdGhpcy5jb2xvciA9IFwiIzAwMDAwMFwiOy8vXHJcbiAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2Uub24oRXZlbnRDZW50cmUuRVR5cGUuUEVSRk9STUFOQ0VfUkVTQ0FMRSgpLHRoaXMsdGhpcy5yZVNjYWxlKTsvL+ebkeWQrOWFqOWxgOe8qeaUvuavlFxyXG4gICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLm9uKEV2ZW50Q2VudHJlLkVUeXBlLlBFUkZPUk1BTkNFX1RFWFRfU1dJVENIKCksdGhpcyx0aGlzLnN3aXRjaCk7Ly/nm5HlkKzlhajlsYDmlofmnKzmmL7npLrlvIDlhbNcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7miYDlnKjmmL7npLroioLngrlzeW1iXHJcbiAgICAgKiBAcGFyYW0gc3ltYiBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFN5bWIoc3ltYjpNeVN5bWJvbCk6dm9pZHtcclxuICAgICAgICB0aGlzLl9BUlVzeW1iID0gc3ltYjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW8gOWFs+aWh+acrOaYvuekuuW8gOWFs1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3dpdGNoKCk6dm9pZHtcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLl9zd2l0Y2ggPT09IHRydWUpe1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5fc3dpdGNoID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVGV4dChcIiBcIik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9zd2l0Y2ggPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS/ruaUueaWh+acrOaYvuekuuW8gOWFs1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U3dpdGNoT24oKTp2b2lke1xyXG4gICAgICAgIGlmKHRoaXMuX3N3aXRjaCA9PT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVGV4dCh0aGlzLl9teVN0cmluZyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWFs+mXreaWh+acrOaYvuekulxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U3dpdGNoT2ZmKCk6dm9pZHtcclxuICAgICAgICBpZih0aGlzLl9zd2l0Y2gpe1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZVRleHQoXCIgXCIpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2u57yp5pS+5q+U5L+u5pS55Y+v6KeG6IqC54K55aSn5bCPXHJcbiAgICAgKiBAcGFyYW0gc2NhbGUg5YWo5bGA57yp5pS+5q+UXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVTY2FsZShzY2FsZTpudW1iZXIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fc2NhbGUgPSBzY2FsZTtcclxuICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5fc2l6ZS54KnRoaXMuX3NjYWxlO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5fc2l6ZS55KnRoaXMuX3NjYWxlO1xyXG4gICAgICAgIHRoaXMueCA9IHRoaXMuX3Bvcy54KnRoaXMuX3NjYWxlO1xyXG4gICAgICAgIHRoaXMueSA9IHRoaXMuX3Bvcy55KnRoaXMuX3NjYWxlO1xyXG4gICAgICAgIHRoaXMuZm9udFNpemUgPSAxMCp0aGlzLl9zY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruaWh+acrFxyXG4gICAgICogQHBhcmFtIHRleHQgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRUZXh0KHRleHQ6c3RyaW5nKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX215U3RyaW5nID0gdGV4dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS/ruaUueaWh+acrOi1t+Wni+WdkOagh++8iOS4jeWPl+WFqOWxgOe8qeaUvuavlOW9seWTje+8iVxyXG4gICAgICogQHBhcmFtIHBvcyDotbflp4vlnZDmoIdcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFBvcyhwb3M6VmVjMiA9IG5ldyBWZWMyKDAsMCkpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fcG9zID0gcG9zO1xyXG4gICAgICAgIHRoaXMueCA9IHRoaXMuX3Bvcy54KnRoaXMuX3NjYWxlO1xyXG4gICAgICAgIHRoaXMueSA9IHRoaXMuX3Bvcy55KnRoaXMuX3NjYWxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6Zi75q2i6byg5qCH5LqL5Lu256m/6YCPXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvZmZTd2l0Y2goKTp2b2lke1xyXG4gICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLm9mZihFdmVudENlbnRyZS5FVHlwZS5QRVJGT1JNQU5DRV9SRVNDQUxFKCksdGhpcyx0aGlzLnJlU2NhbGUpO1xyXG4gICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLm9mZihFdmVudENlbnRyZS5FVHlwZS5QRVJGT1JNQU5DRV9URVhUX1NXSVRDSCgpLHRoaXMsdGhpcy5zd2l0Y2gpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5L+u5pS55a2X5L2T5aSn5bCPXHJcbiAgICAgKiBAcGFyYW0gdmFsdWUg6L6T5YWl5aSn5bCPXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRGb250U2l6ZSh2YWx1ZTpudW1iZXIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5mb250U2l6ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudGV4dCA9IHRoaXMuX215U3RyaW5nO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIiwiLy9hdXRob3IgTmEyQ3VDNE84XHJcbmltcG9ydCBDdXN0b21pemVkU3ByaXRlIGZyb20gXCIuL2N1c3RvbWl6ZWRTcHJcIjtcclxuaW1wb3J0IHsgQ2hlc3NCb2FyZCwgc2lkZVVJIH0gZnJvbSBcIi4vVW5zeW1ib2xpemVkUmVuZGVyXCI7XHJcbmltcG9ydCBBY3RvclJVIGZyb20gXCIuL1N5bWJvbGl6ZWRSZW5kZXJcIjtcclxuaW1wb3J0IHsgQWN0b3JCb3ggfSBmcm9tIFwiLi9vYmpib3hcIjtcclxuaW1wb3J0IHsgVmVjMiB9IGZyb20gXCIuLi8uLi9Eb2RNYXRoXCI7XHJcbmltcG9ydCB7IEV2ZW50Q2VudHJlIH0gZnJvbSBcIi4uLy4uLy4uL0V2ZW50L0V2ZW50Q2VudHJlXCI7XHJcbmltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSBcIi4uLy4uL1JlbmRlcmVyXCI7XHJcbmltcG9ydCB7IFN5bWJvbGl6ZWQgfSBmcm9tIFwiLi4vLi4vLi4vRml4L0ZpeFN5bWJvbFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGVyZm9ybWFuY2VDZW50cmUgaW1wbGVtZW50cyBSZW5kZXJlcntcclxuICAgIFxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaW5zdGFuY2U6UGVyZm9ybWFuY2VDZW50cmU7Ly/ljZXkvovvvIjor7fkuI3opoHmiYvliqjmlrDlu7rljZXkvovvvIlcclxuICAgIHB1YmxpYyBtYWluU3ByOkN1c3RvbWl6ZWRTcHJpdGU7Ly/pu5jorqTnu5jlm77oioLngrnvvIjnpoHmraLlnKjor6XoioLngrnkuIrnu5jlm77vvIzlj6rog73nlKjkuo7mt7vliqDlrZDoioLngrnvvIlcclxuICAgIHB1YmxpYyBjaGVzc0JvYXJkOkNoZXNzQm9hcmQ7Ly/pu5jorqTmo4vnm5hcclxuICAgIHByaXZhdGUgdWk6c2lkZVVJOy8v6buY6K6k5L6n6L655bmy5ZGYVUlcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMlua4suafk+S4u+WcuuaZr++8jOWIneWni+WMluS6i+S7tuebkeWQrOexu1xyXG4gICAgICogQHBhcmFtIHNjZW5lIOa4uOaIj+S4u+WcuuaZr1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUgKHNjZW5lOkxheWEuU3ByaXRlKTp2b2lke1xyXG4gICAgICAgIFBlcmZvcm1hbmNlQ2VudHJlLmluc3RhbmNlID0gbmV3IFBlcmZvcm1hbmNlQ2VudHJlKCk7Ly/liqDovb3pnZnmgIHnsbtcclxuICAgICAgICBQZXJmb3JtYW5jZUNlbnRyZS5pbnN0YW5jZS5tYWluU3ByID0gbmV3IEN1c3RvbWl6ZWRTcHJpdGUoKTsvL+W7uueri+S4u+e7mOWbvuiKgueCuVxyXG4gICAgICAgIC8v6K+l57uY5Zu+6IqC54K55LiN55So5LqO57uY5Yi25Lu75L2V5Zu+5b2i77yM5LuF55So5LqO5re75Yqg5a2Q6IqC54K5XHJcbiAgICAgICAgc2NlbmUuYWRkQ2hpbGQoUGVyZm9ybWFuY2VDZW50cmUuaW5zdGFuY2UubWFpblNwcik7Ly/lsIbkuLvnu5jlm77oioLngrnmt7vliqDkuLrkuLvlnLrmma/lrZDoioLngrlcclxuICAgICAgICBFdmVudENlbnRyZS5pbml0KCk7Ly/liJ3lp4vljJbop4Llr5/ogIVcclxuICAgICAgICBQZXJmb3JtYW5jZUNlbnRyZS5pbml0aWFsaXplID0gKCkgPT4ge307Ly/muIXnqbrkuLvlnLrmma/liJ3lp4vljJblh73mlbBcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIk1haW4gU2NlbmUgSW5pdGlhbGl6YXRpb24gQ29tcGxldGUhIVwiKTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5riy5p+T5qOL55uYXHJcbiAgICAgKiBAcGFyYW0gYXJyIOeUqOS6jueUn+aIkOaji+ebmOeahOS6jOe7tOaVsOe7hFxyXG4gICAgICogQHBhcmFtIHBvc1ZlYzIg5qOL55uY6LW35aeL5Z2Q5qCH77yI5LiA5b6L5oyJ5YWo5bGA57yp5pS+5q+U5Li6Meiuoeeul++8jOa4suafk+WZqOS8muagueaNruWFqOWxgOe8qeaUvuavlOiHquWKqOWujOaIkOe8qeaUvua4suafk++8iVxyXG4gICAgICogQHBhcmFtIHVuaXRzaXplIOWNleS9jeagvOWtkOWuvemrmO+8iOS4gOW+i+aMieWFqOWxgOe8qeaUvuavlOS4ujHorqHnrpfvvIzmuLLmn5PlmajkvJrmoLnmja7lhajlsYDnvKnmlL7mr5Toh6rliqjlrozmiJDnvKnmlL7muLLmn5PvvIlcclxuICAgICAqIEBwYXJhbSBiYWNrR3JvdW5kQ29sb3Ig5qOL55uY6IOM5pmv6aKc6ImyXHJcbiAgICAgKiBAcGFyYW0gZnJvbnRDb2xvciDmoLzlrZDpopzoibJcclxuICAgICAqIEBwYXJhbSBmYXRoZXIg54i257uY5Zu+6IqC54K577yI6buY6K6k5Li65YWo5bGA57uY5Zu+6IqC54K577yJXHJcbiAgICAgKiBAcGFyYW0gc2NhbGUg57yp5pS+5q+U77yI6buY6K6k5Li6Me+8iVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW5pdEJvYXJkKGFycjogbnVtYmVyW11bXSwgcG9zVmVjMjogVmVjMiwgdW5pdHNpemU6IFZlYzIsIGJhY2tHcm91bmRDb2xvcjogc3RyaW5nLCBmcm9udENvbG9yOiBzdHJpbmcsIHNjYWxlOiBudW1iZXIgPSAxKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jaGVzc0JvYXJkID0gbmV3IENoZXNzQm9hcmQoYXJyLHBvc1ZlYzIsdW5pdHNpemUsYmFja0dyb3VuZENvbG9yLGZyb250Q29sb3Isc2NhbGUpOy8v5paw5bu65qOL55uYXHJcbiAgICAgICAgUGVyZm9ybWFuY2VDZW50cmUuaW5zdGFuY2UubWFpblNwci5hZGRDaGlsZCh0aGlzLmNoZXNzQm9hcmQpOy8v5re75Yqg5a2Q6IqC54K5XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDosIPoioLlhajlsYDnvKnmlL7mr5TvvIzlj6rog73kvZznlKjkuo7miYDmnIlhY3Rvcua4suafk+WujOaIkOWQjuOAgeaJgOacieeJueaViOW4p+W+queOr+aJp+ihjOWJje+8jOWQpuWImeaciemdnuiHtOWRveaAp2J1Z1xyXG4gICAgICogQHBhcmFtIHZhbHVlIOWFqOWxgOWPr+inhuiKgueCuee8qeaUvuavlFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVzY2FsZSh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2UuZXZlbnQoXCJSRVNDQUxFXCIsW3ZhbHVlXSk7Ly/lj5HluIPosIPlj4Lkuovku7bjgIHnvKnmlL7mr5Tlj4LmlbBcclxuXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog5riy5p+TYWN0b3Llr7nosaFcclxuICAgICAqIEBwYXJhbSBib3VuZCBhY3RvclxyXG4gICAgICogQHBhcmFtIHBvcyDlnZDmoIfvvIjkuIDlvovmjInlhajlsYDnvKnmlL7mr5TkuLox6K6h566X77yM5riy5p+T5Zmo5Lya5qC55o2u5YWo5bGA57yp5pS+5q+U6Ieq5Yqo5a6M5oiQ57yp5pS+5riy5p+T77yJXHJcbiAgICAgKiBAcGFyYW0gc2l6IOWuvemrmO+8iOm7mOiupDEwLDEw77yJ77yI5LiA5b6L5oyJ5YWo5bGA57yp5pS+5q+U5Li6Meiuoeeul++8jOa4suafk+WZqOS8muagueaNruWFqOWxgOe8qeaUvuavlOiHquWKqOWujOaIkOe8qeaUvua4suafk++8iVxyXG4gICAgICogQHBhcmFtIGZhdGhlciDniLbnu5jlm77oioLngrnvvIjpu5jorqTkuLrmo4vnm5jnu5jlm77oioLngrnvvIlcclxuICAgICAqIEBwYXJhbSBjb2xvciDpopzoibLvvIjpu5jorqTkuLrnu7/vvIlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpc3BsYXlBY3Rvcihib3VuZDogU3ltYm9saXplZCwgcG9zOiBWZWMyLCBzaXo6VmVjMiA9IG5ldyBWZWMyKDEwLDEwKSwgY29sb3I6c3RyaW5nID0gXCIjMDBmZjAwXCIsIGZhdGhlcjpDdXN0b21pemVkU3ByaXRlID0gUGVyZm9ybWFuY2VDZW50cmUuaW5zdGFuY2UuY2hlc3NCb2FyZCk6IHZvaWQge1xyXG4gICAgICAgIGxldCB0bXBBY3RvcjpBY3RvclJVID0gbmV3IEFjdG9yUlUoYm91bmQuc3ltYm9sLHBvcyxzaXosZmF0aGVyLGNvbG9yKTsvL+a4suafk2FjdG9yXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog5re75YqgL+S/ruaUuei/m+W6puadoVxyXG4gICAgICog6buY6K6k6L+b5bqm5p2h6ZW/MzDvvIzlrr0177yI6buY6K6k6L+b5bqm5p2h5a696auY5peg5rOV6YCa6L+H5pys5Ye95pWw5L+u5pS577yM5aaC6ZyA5L+u5pS56K+35YmN5b6AIC5cXFJob2RlIElzbGFuZFxcc3JjXFxSaG9kZXNfR2FtZVxcUGVyZm9ybWFuY2VfTW9kdWxlXFxTeW1ib2xpemVkUmVuZGVyLnRzXFxBY3RvclJVKVxyXG4gICAgICog6L+b5bqm6aKc6Imy5Li654Gw77yM5aaC6ZyA5L+u5pS56K+35YmN5b6AIC5cXFJob2RlIElzbGFuZFxcc3JjXFxSaG9kZXNfR2FtZVxcUGVyZm9ybWFuY2VfTW9kdWxlXFxBY3RvckNvbXBvbmVudC50c1xcQmFyXHJcbiAgICAgKiBAcGFyYW0gYm91bmQgYWN0b3JcclxuICAgICAqIEBwYXJhbSBiYXJfc3ltYk51bSDnrKzlh6DmoLnov5vluqbmnaHvvIjlp4vkuo4w77yJIFxyXG4gICAgICogQHBhcmFtIHBlcmNlbnRhZ2Ug6K+l6L+b5bqm5p2h6L+b5bqmXHJcbiAgICAgKiBAcGFyYW0gY29sb3Ig6K+l6L+b5bqm5p2h6IOM5pmv6aKc6ImyXHJcbiAgICAgKiBAcGFyYW0geCDov5vluqbmnaHplb/luqbvvIjkuIDlvovmjInlhajlsYDnvKnmlL7mr5TkuLox6K6h566X77yM5riy5p+T5Zmo5Lya5qC55o2u5YWo5bGA57yp5pS+5q+U6Ieq5Yqo5a6M5oiQ57yp5pS+5riy5p+T77yJXHJcbiAgICAgKiBAcGFyYW0geSDov5vluqbmnaHpq5jluqbvvIjkuIDlvovmjInlhajlsYDnvKnmlL7mr5TkuLox6K6h566X77yM5riy5p+T5Zmo5Lya5qC55o2u5YWo5bGA57yp5pS+5q+U6Ieq5Yqo5a6M5oiQ57yp5pS+5riy5p+T77yJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlZGl0QmFyKGJvdW5kOiBTeW1ib2xpemVkLCBiYXJfc3ltYk51bTpudW1iZXIgPSAwLCBwZXJjZW50YWdlOiBudW1iZXIgPSAxLCBjb2xvcjogc3RyaW5nID0gXCIjMDBmZjAwXCIsIHg/Om51bWJlciwgeT86bnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHRtcEFjdG9yOkFjdG9yUlUgPSBBY3RvckJveC5nZXQoYm91bmQuc3ltYm9sLmRhdGEpOy8v6I635Y+W5bey5riy5p+T55qEYWN0b3JSVeWvueixoVxyXG4gICAgICAgIGlmKHRtcEFjdG9yLmdldEJhcihiYXJfc3ltYk51bSkgPT09ICB1bmRlZmluZWQpey8v5aaC5p6c5a+55bqU6L+b5bqm5p2h5LiN5a2Y5ZyoXHJcbiAgICAgICAgICAgIHRtcEFjdG9yLmFkZEV4dEJhcihjb2xvcixiYXJfc3ltYk51bSxwZXJjZW50YWdlLHgseSk7Ly/moLnmja7ovpPlhaXlj4LmlbDmlrDlu7rov5vluqbmnaFcclxuXHJcbiAgICAgICAgfWVsc2V7Ly/lpoLlr7nlupTov5vluqbmnaHlt7LlrZjlnKhcclxuICAgICAgICAgICAgdG1wQWN0b3IuZWRpdEJhcihiYXJfc3ltYk51bSxwZXJjZW50YWdlKTsvL+S/ruaUueivpei/m+W6puadoeeZvuWIhuavlFxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5HluIPmlLvlh7vkuovku7ZcclxuICAgICAqIOatpOaWueazleiwg+eUqOWQjuivt+WLv+S/ruaUueWFqOWxgOe8qeaUvuavlO+8ge+8gVxyXG4gICAgICogQHBhcmFtIGZyb20g5Y+R5Yqo5pS75Ye76IqC54K5XHJcbiAgICAgKiBAcGFyYW0gdG8g6YGt5Y+X5omT5Ye76IqC54K5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZWZhdWx0QXRrRWZmZWN0KGZyb206IFN5bWJvbGl6ZWQsIHRvOiBTeW1ib2xpemVkKTogdm9pZCB7XHJcbiAgICAgICAgLy/miZPlh7vkuovku7bjgIHlj5HliqjmlLvlh7voioLngrnlkozpga3lj5fmlLvlh7voioLngrnlj4LmlbBcclxuICAgICAgICBBY3RvckJveC5nZXQoZnJvbS5zeW1ib2wuZGF0YSkuaGl0KHRvKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWPkeW4g+WPl+S8pOS6i+S7tlxyXG4gICAgICog5q2k5pa55rOV6LCD55So5ZCO6K+35Yu/5L+u5pS55YWo5bGA57yp5pS+5q+U77yB77yBXHJcbiAgICAgKiBAcGFyYW0gYm91bmQg5Y+X5Lyk6IqC54K5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZWZhdWx0RG1nRWZmZWN0KGJvdW5kOiBTeW1ib2xpemVkKTogdm9pZCB7XHJcbiAgICAgICAgLy/lj5fkvKTkuovku7blkozlj5fkvKToioLngrnlj4LmlbBcclxuICAgICAgICBBY3RvckJveC5nZXQoYm91bmQuc3ltYm9sLmRhdGEpLmRhbWFnZSgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmUgOavgeWvueixoe+8iOm7mOiupOmUgOavge+8iVxyXG4gICAgICogQHBhcmFtIGJvdW5kIOWvueixoVxyXG4gICAgICogQHBhcmFtIHBvcyDlnZDmoIfvvIjkuIDlvovmjInlhajlsYDnvKnmlL7mr5TkuLox6K6h566X77yM5riy5p+T5Zmo5Lya5qC55o2u5YWo5bGA57yp5pS+5q+U6Ieq5Yqo5a6M5oiQ57yp5pS+5riy5p+T77yJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXN0cm95QWN0b3IoYm91bmQ6IFN5bWJvbGl6ZWQpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdG1wQWN0b3I6QWN0b3JSVSA9IEFjdG9yQm94LmdldChib3VuZC5zeW1ib2wuZGF0YSk7Ly/ojrflj5ZhY3RvclJV5a+56LGhXHJcblxyXG4gICAgICAgIHRtcEFjdG9yLmRlc3RvcnkoKTtcclxuXHJcbiAgICAgICAgLy/plIDmr4FhY3RvclJV5a+56LGhXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlnKhhY3Rvcui6q+S4iua4suafk+aWh+acrFxyXG4gICAgICog5LuF5b2T5YWo5bGA5paH5pys5pi+56S65byA5YWzc3dpdGNoSG92ZXJUZXh077yI77yJ5byA5ZCv5pe25omN5Lya5riy5p+T5paH5pys77yM5byA5YWz6buY6K6k5YWz6ZetXHJcbiAgICAgKiBAcGFyYW0gYm91bmQgYWN0b3JcclxuICAgICAqIEBwYXJhbSBjb250ZW50IOaWh+acrFxyXG4gICAgICogQHBhcmFtIHBvcyDmlofmnKzotbflp4vlnZDmoIfvvIjkuIDlvovmjInlhajlsYDnvKnmlL7mr5TkuLox6K6h566X77yM5riy5p+T5Zmo5Lya5qC55o2u5YWo5bGA57yp5pS+5q+U6Ieq5Yqo5a6M5oiQ57yp5pS+5riy5p+T77yJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB3cml0ZShib3VuZDogU3ltYm9saXplZCwgY29udGVudDogc3RyaW5nLCBwb3M/OiBWZWMyKTogdm9pZCB7XHJcbiAgICAgICAgQWN0b3JCb3guZ2V0KGJvdW5kLnN5bWJvbC5kYXRhKS5nZXRUZXh0KCkuc2V0VGV4dChjb250ZW50KTsvL+S/ruaUuUFjdG9yUlXmlofmnKxcclxuICAgICAgICBBY3RvckJveC5nZXQoYm91bmQuc3ltYm9sLmRhdGEpLmdldFRleHQoKS5zZXRQb3MocG9zKTsvL+S/ruaUueivpeaWh+acrOS9jee9rlxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YWo5bGA5paH5pys5pi+56S65byA5YWz77yI6buY6K6k5YWz6Zet77yJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzd2l0Y2hIb3ZlclRleHQoKTogdm9pZCB7XHJcbiAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2UuZXZlbnQoRXZlbnRDZW50cmUuRVR5cGUuUEVSRk9STUFOQ0VfVEVYVF9TV0lUQ0goKSk7Ly/lj5HluIPmlofmnKzlvIDlhbPkuovku7bvvIzmjInpkq7mlofmnKzkuI3lj5flvbHlk41cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOenu+WKqGFjdG9y5a+56LGhXHJcbiAgICAgKiBAcGFyYW0gYm91bmQgYWN0b3JcclxuICAgICAqIEBwYXJhbSBwb3Mg55uu5qCH5Z2Q5qCH77yI5LiA5b6L5oyJ5YWo5bGA57yp5pS+5q+U5Li6Meiuoeeul++8jOa4suafk+WZqOS8muagueaNruWFqOWxgOe8qeaUvuavlOiHquWKqOWujOaIkOe8qeaUvua4suafk++8iVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbW92ZShib3VuZDogU3ltYm9saXplZCwgcG9zOiBWZWMyKTogdm9pZCB7XHJcbiAgICAgICAgQWN0b3JCb3guZ2V0KGJvdW5kLnN5bWJvbC5kYXRhKS5yZWxvY2F0ZShwb3MpOy8v56e75YqoQWN0b3JSVeWvueixoeWdkOagh1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlnKhhY3Rvcui6q+S4iua3u+WKoOaMiemSrlxyXG4gICAgICog5q+P5LiqYWN0b3JSVem7mOiupOWtmOWcqDLkuKrmjInpkq7vvIjngrnlh7thY3RvclJV6IqC54K55Y2z5Y+v5pi+56S677yJ77yM5a+55bqU5pKk6YCA5ZKM5oqA6IO944CC6K+l5oyJ6ZKu5Z2Q5qCH44CB5a696auY44CB6aKc6Imy44CB5ZCN5a2X5LiN5Y+v5L+u5pS577yM5Yqf6IO96ZyA5LuO5aSW6YOo5re75YqgXHJcbiAgICAgKiBAcGFyYW0gYm91bmQgYWN0b3JcclxuICAgICAqIEBwYXJhbSBudW0g5oyJ6ZKu57yW5Y+377yIMCwx5Li66buY6K6k5oyJ6ZKu77yM6buY6K6k5oyJ6ZKu5LiN6Ieq5bim5Lu75L2V5Yqf6IO977yM6ZyA5omL5Yqo5re75Yqg77yJXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sg54K55Ye75oyJ6ZKu5ZCO6LCD55So55qE5Ye95pWwXHJcbiAgICAgKiBAcGFyYW0gdGV4dCDmmL7npLrlnKjmjInpkq7kuIrnmoTmlofmnKzvvIjpu5jorqTmmL7npLrkuJTml6Dms5Xkv67mlLnvvIlcclxuICAgICAqIEBwYXJhbSBwb3Mg5oyJ6ZKu6LW35aeL5Z2Q5qCH77yI5LiA5b6L5oyJ5YWo5bGA57yp5pS+5q+U5Li6Meiuoeeul++8jOa4suafk+WZqOS8muagueaNruWFqOWxgOe8qeaUvuavlOiHquWKqOWujOaIkOe8qeaUvua4suafk++8iVxyXG4gICAgICogQHBhcmFtIHNpemUg5oyJ6ZKu5aSn5bCP77yI5LiA5b6L5oyJ5YWo5bGA57yp5pS+5q+U5Li6Meiuoeeul++8jOa4suafk+WZqOS8muagueaNruWFqOWxgOe8qeaUvuavlOiHquWKqOWujOaIkOe8qeaUvua4suafk++8iVxyXG4gICAgICogQHBhcmFtIGNvbG9yIOaMiemSruminOiJslxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXR0YWNoQnV0dG9uKGJvdW5kOiBTeW1ib2xpemVkLG51bTpudW1iZXIsIGNhbGxiYWNrOiBGdW5jdGlvbiwgdGV4dD86IHN0cmluZywgcG9zPzogVmVjMiwgc2l6ZT86IFZlYzIsIGNvbG9yPzogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHRtcEFjdDpBY3RvclJVID0gQWN0b3JCb3guZ2V0KGJvdW5kLnN5bWJvbC5kYXRhKTsvL+iOt+WPlkFjdG9yUlXlr7nosaFcclxuICAgICAgICBpZih0bXBBY3QuZ2V0QnV0dG9uKG51bSkgPT09IHVuZGVmaW5lZCl7Ly/lpoLmnpzlr7nlupTmjInpkq7kuI3lrZjlnKhcclxuICAgICAgICAgICAgaWYocG9zID09PSB1bmRlZmluZWQpey8v5aaC5p6c5LiN6L6T5YWl5oyH5a6a5Z2Q5qCHXHJcbiAgICAgICAgICAgICAgICB0bXBBY3QuYWRkRXh0cmFCdXR0b25zQXREZWZMb2NhdGlvbih0ZXh0LG51bSxjb2xvcixjYWxsYmFjayk7Ly/lnKjpu5jorqTkvY3nva7mlrDlu7rmjInpkq5cclxuICAgICAgICAgICAgfWVsc2V7Ly/lpoLmnpzovpPlhaXmjIflrprlnZDmoIdcclxuICAgICAgICAgICAgICAgIHRtcEFjdC5hZGRFeHRyYUJ1dHRvbkF0Tm9EZWZMb2NhdGlvbih0ZXh0LG51bSxjYWxsYmFjayxwb3Msc2l6ZSxjb2xvcik7Ly/lnKjmjIflrprkvY3nva7mlrDlu7rmjInpkq5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNley8v5aaC5p6c5a+55bqU5oyJ6ZKu5a2Y5ZyoXHJcbiAgICAgICAgICAgIHRtcEFjdC5nZXRCdXR0b24obnVtKS5zZXRGdW5jKGNhbGxiYWNrKTsvL+i+k+WFpeWKn+iDveWHveaVsFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa4suafk+WKqOeUu1xyXG4gICAgICog5Luj5Y+36K+35p+l6K+i5Yqo55S75a+554Wn6KGoLnhsc3hcclxuICAgICAqIEBwYXJhbSBib3VuZCDlvoXmuLLmn5Plr7nosaFcclxuICAgICAqIEBwYXJhbSBuYW1lIOW5suWRmOaIluaVjOS6uuS7o+WPt1xyXG4gICAgICogQHBhcmFtIGFuaSDliqjkvZzku6Plj7dcclxuICAgICAqIEBwYXJhbSBudW1PZkZyYW1lcyDliqjkvZzmiafooYzluKfmlbBcclxuICAgICAqIEBwYXJhbSBzY2FsZSDliqjnlLvlm77lvaLlnKh477yMeeaWueWQkeS4iue8qeaUvuavlFxyXG4gICAgICogQHBhcmFtIGxvb3BPck5vdCDmmK/lkKblvIDlkK/liqjkvZzluKflvqrnjq/vvIjpu5jorqTlhbPpl63vvIlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpc3BsYXlBbmkoYm91bmQ6IFN5bWJvbGl6ZWQsIG5hbWU6IHN0cmluZywgYW5pOiBzdHJpbmcgLCBudW1PZkZyYW1lczpudW1iZXIgPSAxNiwgc2NhbGU6VmVjMiA9IG5ldyBWZWMyKDAuMjUsMC4xNyksIGxvb3BPck5vdDpib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdG1wQWN0b3I6QWN0b3JSVSA9IEFjdG9yQm94LmdldChib3VuZC5zeW1ib2wuZGF0YSk7XHJcbiAgICAgICAgdG1wQWN0b3IuY2xlYXJBbmkoKTtcclxuICAgICAgICB0bXBBY3Rvci5sb2FkQW5pKG5hbWUsYW5pLGxvb3BPck5vdCxudW1PZkZyYW1lcyxzY2FsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJbkvqfpnaJVSVxyXG4gICAgICog5L6n6Z2iVUnnmoTniLboioLngrnkuLrvvIHvvIHvvIHvvIHmo4vnm5jvvIHvvIHvvIHvvIHvvIHvvIFcclxuICAgICAqIEBwYXJhbSBwb3Mg55u45a+55LqO5qOL55uY5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gdW5pdHNpemUg5bmy5ZGY56uL57uY5aSn5bCPXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWRTaWRlVUkocG9zOlZlYzIsdW5pdHNpemU6VmVjMik6dm9pZHtcclxuICAgICAgICBQZXJmb3JtYW5jZUNlbnRyZS5pbnN0YW5jZS51aSA9IG5ldyBzaWRlVUkocG9zLHVuaXRzaXplLDEpOy8v5Yid5aeL5YyW5L6n6Z2iVUlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWQkeS+p+mdolVJ5o+S5YWl5bmy5ZGY56uL57uY5bm25byA5ZCv6byg5qCH5LqL5Lu255uR5ZCsXHJcbiAgICAgKiBAcGFyYW0gYm91bmQgYWN0b3Llr7nosaFcclxuICAgICAqIEBwYXJhbSBuYW1lIOW5suWRmOeri+e7mOWQjVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcHVzaEFjdEludG9TaWRlVUkoYm91bmQ6U3ltYm9saXplZCxuYW1lOnN0cmluZyk6dm9pZHtcclxuICAgICAgICBsZXQgYm9hcmQ6Q2hlc3NCb2FyZCA9IFBlcmZvcm1hbmNlQ2VudHJlLmluc3RhbmNlLmNoZXNzQm9hcmQ7XHJcbiAgICAgICAgbGV0IHVpOnNpZGVVSSA9IFBlcmZvcm1hbmNlQ2VudHJlLmluc3RhbmNlLnVpO1xyXG4gICAgICAgIGJvYXJkLmFkZENoaWxkKHVpLmdldFNwcigpKTsvL+a3u+WKoOS4uuaji+ebmOWtkOiKgueCuVxyXG4gICAgICAgIGxldCB0bXBzcHI6Q3VzdG9taXplZFNwcml0ZSA9IHVpLnB1c2hBY3Rvcihib3VuZCxuYW1lKTsvL+W5suWRmOS/oeaBr+WGmeWFpVVJ5Lit5pWw57uEXHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGZ1bjpGdW5jdGlvbiA9ICgpID0+e1xyXG4gICAgICAgICAgICAvL+agueaNrum8oOagh+ebuOWvueS6juaji+ebmOWdkOagh+aNoueul+W5suWRmOaJgOWkhOWdkOagh1xyXG4gICAgICAgICAgICBsZXQgdG1wdmVjOlZlYzIgPSBQZXJmb3JtYW5jZUNlbnRyZS5pbnN0YW5jZS5jaGVzc0JvYXJkLnJldHVybk1vdXNlVmVjKCk7XHJcbiAgICAgICAgICAgIGxldCB1aXBvczpWZWMyID0gdWkuZ2V0UG9zKCk7XHJcbiAgICAgICAgICAgIGxldCB1aXNpemU6VmVjMiA9IHVpLmdldFNpemUoKTtcclxuICAgICAgICAgICAgdG1wc3ByLnBvcyh0bXB2ZWMueCAtIHVpcG9zLnggLSAwLjUqdWlzaXplLngsdG1wdmVjLnkgLSB1aXBvcy55LSAwLjUqdWlzaXplLnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0bXBzcHIub24oTGF5YS5FdmVudC5NT1VTRV9ET1dOLHRoaXMsKCk9PntcclxuICAgICAgICAgICAgLy/nm5HlkKzpvKDmoIfmjInkuIvkuovku7ZcclxuICAgICAgICAgICAgTGF5YS50aW1lci5sb29wKDE3LHRoaXMsZnVuKTsvL+W8gOWQr+W4p+W+queOr1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdG1wc3ByLm9uKExheWEuRXZlbnQuTU9VU0VfVVAsdGhpcywoKSA9PiB7XHJcbiAgICAgICAgICAgIC8v55uR5ZCs6byg5qCH5oqs6LW35LqL5Lu2XHJcbiAgICAgICAgICAgIExheWEudGltZXIuY2xlYXIodGhpcyxmdW4pOy8v57uI5q2i5bin5b6q546vXHJcbiAgICAgICAgICAgIGxldCBib2FyZHNpemU6VmVjMiA9IGJvYXJkLmdldGJvYXJkc2l6ZSgpO1xyXG4gICAgICAgICAgICBsZXQgbW91c2Vsb2FjdGlvbjpWZWMyID0gYm9hcmQucmV0dXJuTW91c2VWZWMoKTtcclxuICAgICAgICAgICAgbGV0IHVuaXRzaXplOlZlYzIgPSBib2FyZC5nZXRVbml0U2l6ZSgpO1xyXG4gICAgICAgICAgICBpZihib2FyZHNpemUueCA+PSBtb3VzZWxvYWN0aW9uLnggJiYgYm9hcmRzaXplLnkgPj0gbW91c2Vsb2FjdGlvbi55ICYmIG1vdXNlbG9hY3Rpb24ueSA+PSAwICYmIG1vdXNlbG9hY3Rpb24ueCA+PSAwKXtcclxuICAgICAgICAgICAgICAgIC8v5b2TbW91c2VfdXDml7bpvKDmoIflnKjmo4vnm5jkuIpcclxuICAgICAgICAgICAgICAgIGxldCB0bXB2ZWM6VmVjMiA9IG5ldyBWZWMyKE1hdGguZmxvb3IobW91c2Vsb2FjdGlvbi54L3VuaXRzaXplLngpKnVuaXRzaXplLngsTWF0aC5mbG9vcihtb3VzZWxvYWN0aW9uLnkvdW5pdHNpemUueSkqdW5pdHNpemUueSk7XHJcbiAgICAgICAgICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5ldmVudChFdmVudENlbnRyZS5FVHlwZS5QRVJGT1JNQU5DRV9BQ1RPUl9PTl9CT0FSRChib3VuZC5zeW1ib2wuZGF0YSksdG1wdmVjKTsvL+WPkemAgeW5suWRmOWIsOi+vuaji+ebmOS6i+S7tuW5tuWPkemAgeaji+ebmOWdkOagh1xyXG4gICAgICAgICAgICAgICAgdG1wc3ByLmRlc3Ryb3koKTsvL+aRp+avgeeri+e7mOWvueixoVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8v5b2TbW91c2VfdXDml7bpvKDmoIfkuI3lnKjmo4vnm5jkuIpcclxuICAgICAgICAgICAgICAgIGxldCB0bXB2ZWM6VmVjMiA9IHVpLnJlYWRQYWlyRm9yUG9zKGJvdW5kKTtcclxuICAgICAgICAgICAgICAgIHRtcHNwci5wb3ModG1wdmVjLngsdG1wdmVjLnkpO1xyXG4gICAgICAgICAgICB9XHJcbiBcclxuXHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG59IiwiLy9hdXRob3IgTmEyQ3VDNE84XHJcblxyXG5pbXBvcnQgeyBNeVN5bWJvbCwgU3ltYm9saXplZCB9IGZyb20gXCIuLi8uLi8uLi9GaXgvRml4U3ltYm9sXCI7XHJcbmltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi4vLi4vRG9kTWF0aFwiO1xyXG5pbXBvcnQgQ3VzdG9taXplZFNwcml0ZSBmcm9tIFwiLi9jdXN0b21pemVkU3ByXCI7XHJcbmltcG9ydCB7IEFjdG9yQm94IH0gZnJvbSBcIi4vb2JqYm94XCI7XHJcbmltcG9ydCB7IEV2ZW50Q2VudHJlIH0gZnJvbSBcIi4uLy4uLy4uL0V2ZW50L0V2ZW50Q2VudHJlXCI7XHJcbmltcG9ydCB7IEJhciwgQnV0dG9uICwgVGV4dCB9IGZyb20gXCIuL0FjdG9yQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEtWUGFpciB9IGZyb20gXCIuLi8uLi9Eb2REYXRhU3RydWN0dXJlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3RvclJVe1xyXG4gICAgcHJpdmF0ZSBfaW5pdFBvczpWZWMyOy8vYWN0b3Lotbflp4vlnZDmoIdcclxuICAgIHByaXZhdGUgX2luaXRTaXplOlZlYzI7Ly9hY3Rvcui1t+Wni+Wkp+Wwj1xyXG4gICAgcHJpdmF0ZSBfaW5pdEJhckhlaWdodDpudW1iZXIgPSAwOy8v6L+b5bqm5p2h5YW25a6e6auY5bqm5pqC5a2Y5ZmoXHJcbiAgICBwcml2YXRlIF9wb3M6VmVjMjsvL+agueaNruWFqOWxgOe8qeaUvuavlOaNoueul+WQjueahOWPr+ingeWdkOagh1xyXG4gICAgcHJpdmF0ZSBfc2l6ZTpWZWMyOy8v5qC55o2u5YWo5bGA57yp5pS+5q+U5o2i566X5ZCO55qE5Y+v6KeB5aSn5bCPXHJcbiAgICBwcml2YXRlIF9zY2FsZTpudW1iZXIgPSAxOy8v5YWo5bGA57yp5pS+5q+UXHJcbiAgICBwcml2YXRlIF9zeW1iOk15U3ltYm9sOy8vc3ltYlxyXG4gICAgcHJpdmF0ZSBfZmF0aGVyOkN1c3RvbWl6ZWRTcHJpdGU7Ly/niLbnu5jlm77oioLngrlcclxuICAgIHByaXZhdGUgX3NwcjpDdXN0b21pemVkU3ByaXRlOy8v5pys57uY5Zu+6IqC54K5XHJcbiAgICBwcml2YXRlIF9iYXJQYWlyOktWUGFpcjxCYXI+ID0gbmV3IEtWUGFpcjxCYXI+KCk7Ly/ov5vluqbmnaHplK7lgLznu4RcclxuICAgIHByaXZhdGUgX3RleHQ6VGV4dDsvL+m7mOiupOaWh+acrFxyXG4gICAgcHJpdmF0ZSBfZGVmQnV0dG9uU2hvd2VkOmJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuaYvuekuum7mOiupOaMiemSru+8jOm7mOiupOS4uuWQplxyXG4gICAgcHJpdmF0ZSBfYnV0dG9uUGFpcjpLVlBhaXI8QnV0dG9uPiA9IG5ldyBLVlBhaXI8QnV0dG9uPigpO1xyXG4gICAgcHJpdmF0ZSBfYnV0dG9uSGVpZ2h0Om51bWJlcjsvL+aMiemSrumrmOW6puaaguWtmOWZqFxyXG4gICAgcHJpdmF0ZSBfZGFtYWdlOkN1c3RvbWl6ZWRTcHJpdGU7Ly/lj5fkvKTnibnmlYjmmL7npLroioLngrlcclxuICAgIHByaXZhdGUgX3RyYW5zcGFyZW5jeTpudW1iZXIgPSAxOy8v5Y+X5Lyk54m55pWI5Y+C5pWw5pqC5a2Y5ZmoXHJcbiAgICBwcml2YXRlIF9maXN0OkN1c3RvbWl6ZWRTcHJpdGU7Ly/mlLvlh7vnibnmlYjmmL7npLroioLngrlcclxuICAgIHByaXZhdGUgX21vdmVQZXJjZW50YWdlOm51bWJlciA9IDA7Ly/mlLvlh7vnibnmlYjlj4LmlbDmmoLlrZjlmahcclxuICAgIHB1YmxpYyBfY2VudGVyUG9zOlZlYzI7Ly/kuK3lv4PlnZDmoIdcclxuICAgIHByaXZhdGUgX2FuaTpMYXlhLkFuaW1hdGlvbiA9IG5ldyBMYXlhLkFuaW1hdGlvbigpO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlclVuaXTmnoTpgKDlmahcclxuICAgICAqIEBwYXJhbSBzeW1iIHN5bWJcclxuICAgICAqIEBwYXJhbSBwb3Mg6LW35aeL5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gc2l6ZSDlrr3pq5hcclxuICAgICAqIEBwYXJhbSBmYXRoZXIg54i257uY5Zu+6IqC54K5XHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHN5bWI6TXlTeW1ib2wsIHBvczpWZWMyLCBzaXplOlZlYzIsIGZhdGhlcjpDdXN0b21pemVkU3ByaXRlLCBjb2xvcjpzdHJpbmcgPSBcIiMwMGZmZmZcIiwgc2NhbGU6bnVtYmVyID0gMSl7XHJcbiAgICAgICAgdGhpcy5fZmF0aGVyID0gZmF0aGVyOy8v54i257uY5Zu+6IqC54K5XHJcbiAgICAgICAgdGhpcy5faW5pdFBvcyA9IHBvczsvL+i1t+Wni+WdkOagh1xyXG4gICAgICAgIHRoaXMuX2luaXRTaXplID0gc2l6ZTsvL+i1t+Wni+WuvemrmFxyXG4gICAgICAgIHRoaXMuX3NwciA9IG5ldyBDdXN0b21pemVkU3ByaXRlKCk7Ly/mlrDlu7rnu5jlm77oioLngrlcclxuICAgICAgICB0aGlzLl9mYXRoZXIuYWRkQ2hpbGQodGhpcy5fc3ByKTsvL+a3u+WKoOWtkOiKgueCuVxyXG4gICAgICAgIHRoaXMuc2V0RGF0YShzeW1iLG5ldyBWZWMyKHRoaXMuX2luaXRQb3MueCp0aGlzLl9zY2FsZSx0aGlzLl9pbml0UG9zLnkqdGhpcy5fc2NhbGUpLG5ldyBWZWMyKHRoaXMuX2luaXRTaXplLngqdGhpcy5fc2NhbGUsIHRoaXMuX2luaXRTaXplLnkqdGhpcy5fc2NhbGUpLHVuZGVmaW5lZCk7Ly/orr7nva7nu5jlm77oioLngrnlj4LmlbBcclxuICAgICAgICBBY3RvckJveC5hZGQodGhpcyx0aGlzLl9zeW1iKTsvL+WwhuacrOWvueixoea3u+WKoOWIsOmUruWAvOWvuVxyXG4gICAgICAgIHRoaXMuYWRkRGVmQmFyKCk7Ly/mt7vliqDpu5jorqTov5vluqbmnaFcclxuICAgICAgICB0aGlzLl90ZXh0ID0gbmV3IFRleHQodGhpcy5faW5pdFNpemUsdGhpcy5fc2NhbGUpOy8v5re75Yqg6buY6K6k5paH5pysXHJcbiAgICAgICAgdGhpcy5fdGV4dC5zZXRTeW1iKHRoaXMuX3N5bWIpOy8vXHJcbiAgICAgICAgdGhpcy5fYnV0dG9uSGVpZ2h0ID0gdGhpcy5faW5pdFNpemUueTsvL1xyXG4gICAgICAgIHRoaXMuX3Nwci5hZGRDaGlsZCh0aGlzLl90ZXh0KTsvL+m7mOiupOaWh+acrOe9ruS6juWtkOiKgueCuVxyXG4gICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLm9uKEV2ZW50Q2VudHJlLkVUeXBlLlBFUkZPUk1BTkNFX1JFU0NBTEUoKSx0aGlzLHRoaXMucmVTY2FsZSk7Ly/nm5HlkKzlhajlsYDnvKnmlL7mr5RcclxuICAgICAgICB0aGlzLl9zcHIub24oTGF5YS5FdmVudC5NT1VTRV9PVkVSLHRoaXMsdGhpcy5tb3VzZU92ZXIpOy8vXHJcbiAgICAgICAgdGhpcy5fc3ByLm9uKExheWEuRXZlbnQuTU9VU0VfT1VULHRoaXMsdGhpcy5tb3VzZU91dCk7Ly9cclxuICAgICAgICB0aGlzLl9zcHIub24oTGF5YS5FdmVudC5NT1VTRV9VUCx0aGlzLHRoaXMuc2hvd0RlZmF1bHRCb3R0b25zKTsvL1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZSA9IG5ldyBDdXN0b21pemVkU3ByaXRlKCk7Ly9cclxuICAgICAgICB0aGlzLl9zcHIuYWRkQ2hpbGQodGhpcy5fZGFtYWdlKTsvL1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZS5zZXRQYXJhbSgwLDAsdGhpcy5fc2l6ZS54LHRoaXMuX3NpemUueSxcIiNmOTE1MjZcIik7Ly9cclxuICAgICAgICB0aGlzLl9kYW1hZ2UubG9jYXRpb25BbmRTaXplKCk7Ly9cclxuICAgICAgICB0aGlzLl9kYW1hZ2Uuek9yZGVyID0gOTk7XHJcbiAgICAgICAgdGhpcy5hZGREZWZCdXR0b25zKCk7Ly9cclxuICAgICAgICB0aGlzLl9maXN0ID0gbmV3IEN1c3RvbWl6ZWRTcHJpdGUoKTsvL1xyXG4gICAgICAgIHRoaXMuX2Zpc3Quc2V0UGFyYW0odGhpcy5fY2VudGVyUG9zLngsdGhpcy5fY2VudGVyUG9zLnksMTYsMTYsXCIjRjNDMjQ2XCIpOy8vXHJcbiAgICAgICAgdGhpcy5fZmlzdC5sb2NhdGlvbkFuZFNpemUoKTsvL1xyXG4gICAgICAgIHRoaXMuX2Zpc3Quek9yZGVyID0gMjsvL1xyXG4gICAgICAgIHRoaXMuX3Nwci5hZGRDaGlsZCh0aGlzLl9maXN0KTsvL1xyXG4gICAgICAgIFxyXG5cclxuXHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG4gICAgcHVibGljIGNsZWFyQW5pKCk6dm9pZHtcclxuICAgICAgICB0aGlzLl9hbmkuY2xlYXIoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgXHJcblxyXG4gICAgcHVibGljIGxvYWRBbmkobmFtZTpzdHJpbmcsc3RhdHVzOnN0cmluZywgbG9vcE9yTm90OmJvb2xlYW4sIG51bU9mRnJhbWVzOm51bWJlciwgc2NhbGU6VmVjMik6TGF5YS5BbmltYXRpb257XHJcbiAgICAgICAgdGhpcy5fYW5pID0gbmV3IExheWEuQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5fYW5pLnBvcygtMTcqdGhpcy5fc2NhbGUsLTgqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX2FuaS5zY2FsZShzY2FsZS54LHNjYWxlLnkpO1xyXG4gICAgICAgIHRoaXMuX3Nwci5hZGRDaGlsZCh0aGlzLl9hbmkpO1xyXG4gICAgICAgIHRoaXMuX2FuaS5sb2FkQXRsYXMoYHJlcy9hdGxhcy8ke25hbWV9LmF0bGFzYCxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsb25Mb2FkZWQpKTsgXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fYW5pLnBsYXkodW5kZWZpbmVkLGxvb3BPck5vdCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUFuaVVybHModXJsLGxlbmd0aCl7XHJcbiAgICAgICAgICAgIGxldCB1cmxzID0gW107XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0xO2k8bGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICBpZihpIDwgMTApe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybHMucHVzaCh1cmwgK1wiX1wiK1wiMFwiICtpK1wiLnBuZ1wiKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHVybHMucHVzaCh1cmwgK1wiX1wiK2krXCIucG5nXCIpOyAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdXJscztcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gb25Mb2FkZWQoKXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuX2FuaS5pbnRlcnZhbCA9IDUwO1xyXG4gICAgICAgICAgICBsZXQgdG1wQW5pID0gY3JlYXRlQW5pVXJscyhgJHtuYW1lfS8ke3N0YXR1c31gLG51bU9mRnJhbWVzKTtcclxuICAgICAgICAgICAgdGhpcy5fYW5pLmxvYWRJbWFnZXModG1wQW5pKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9hbmk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue5b2T5YmN5Y+v6KeG6IqC54K55Z2Q5qCHXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3VyUG9zKCk6VmVjMntcclxuICAgICAgICByZXR1cm4gdGhpcy5fcG9zO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWPkeWKqOaJk+WHu+eJueaViFxyXG4gICAgICogQHBhcmFtIHRvIOaJk+WHu+ebruagh1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaGl0KHRvOlN5bWJvbGl6ZWQpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fZmlzdC5jZW50cmFsU2hpZnRDb2xvcmVkKCk7XHJcbiAgICAgICAgbGV0IHRtcFZlYzpWZWMyID0gbmV3IFZlYzIoQWN0b3JCb3guZ2V0KHRvLnN5bWJvbC5kYXRhKS5jdXJQb3MoKS54LXRoaXMuX3Bvcy54LEFjdG9yQm94LmdldCh0by5zeW1ib2wuZGF0YSkuY3VyUG9zKCkueS10aGlzLl9wb3MueSk7XHJcbiAgICAgICAgbGV0IGZ1bjpGdW5jdGlvbiA9ICh0YXJnZXQ6VmVjMikgPT57XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX21vdmVQZXJjZW50YWdlID4gMSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3ZlUGVyY2VudGFnZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9maXN0LmdyYXBoaWNzLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICBMYXlhLnRpbWVyLmNsZWFyKHRoaXMsZnVuKTtcclxuICAgICAgICAgICAgICAgIEFjdG9yQm94LmdldCh0by5zeW1ib2wuZGF0YSkuZGFtYWdlKCk7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLl9hbmkuc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGN1ckxvY2FjdGlvbjpWZWMyID0gbmV3IFZlYzIoICgxNisgdGFyZ2V0LngpKnRoaXMuX21vdmVQZXJjZW50YWdlLCgxNisgdGFyZ2V0LnkpKnRoaXMuX21vdmVQZXJjZW50YWdlKTtcclxuICAgICAgICAgICAgdGhpcy5fbW92ZVBlcmNlbnRhZ2UgKz0gMC4wMjtcclxuICAgICAgICAgICAgdGhpcy5fZmlzdC5yZWxvY2F0ZShjdXJMb2NhY3Rpb24pO1xyXG4gICAgICAgICAgICB0aGlzLl9maXN0LnJvdGF0aW9uID0gMjAwMCAqIHRoaXMuX21vdmVQZXJjZW50YWdlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGF5YS50aW1lci5sb29wKDIwLHRoaXMsZnVuLFt0bXBWZWNdKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWPkeWKqOWPl+S8pOeJueaViFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGFtYWdlKCk6dm9pZHtcclxuICAgICAgICB0aGlzLl9kYW1hZ2Uuc2V0UGFyYW0oMCwwLHRoaXMuX3NpemUueCx0aGlzLl9zaXplLnkpO1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZS5sb2NhdGlvbkFuZFNpemUoKTtcclxuICAgICAgICB0aGlzLl9kYW1hZ2UuY2hhbmdlQ29sb3IoKTtcclxuICAgICAgICBsZXQgZnVuOkZ1bmN0aW9uID0gKCk9PntcclxuICAgICAgICAgICAgaWYodGhpcy5fdHJhbnNwYXJlbmN5IDwgMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kYW1hZ2UuZ3JhcGhpY3MuY2xlYXIoKTsgXHJcbiAgICAgICAgICAgICAgICB0aGlzLl90cmFuc3BhcmVuY3kgPSAxO1xyXG4gICAgICAgICAgICAgICAgTGF5YS50aW1lci5jbGVhcih0aGlzLGZ1bik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuX3RyYW5zcGFyZW5jeSAtPSAwLjAzO1xyXG4gICAgICAgICAgICB0aGlzLl9kYW1hZ2UuYWxwaGEgPSB0aGlzLl90cmFuc3BhcmVuY3k7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIExheWEudGltZXIubG9vcCgyMCx0aGlzLGZ1bik7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa4suafk+m7mOiupOaMiemSrlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNob3dEZWZhdWx0Qm90dG9ucyhlOkxheWEuRXZlbnQpOnZvaWR7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBpZih0aGlzLl9kZWZCdXR0b25TaG93ZWQgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgdGhpcy5fc3ByLmFkZENoaWxkKHRoaXMuZ2V0QnV0dG9uKDApLmdldFNwcigpKTtcclxuICAgICAgICAgICAgdGhpcy5fc3ByLmFkZENoaWxkKHRoaXMuZ2V0QnV0dG9uKDEpLmdldFNwcigpKTtcclxuICAgICAgICAgICAgdGhpcy5fZGVmQnV0dG9uU2hvd2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5fdGV4dC5fc3dpdGNoKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fc3ByLnJlbW92ZUNoaWxkKHRoaXMuZ2V0QnV0dG9uKDApLmdldFNwcigpKTtcclxuICAgICAgICAgICAgdGhpcy5fc3ByLnJlbW92ZUNoaWxkKHRoaXMuZ2V0QnV0dG9uKDEpLmdldFNwcigpKTtcclxuICAgICAgICAgICAgdGhpcy5fZGVmQnV0dG9uU2hvd2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuX3RleHQuX3N3aXRjaCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOWPkeW4g+m8oOagh+i/m+WFpeS6i+S7tlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG1vdXNlT3ZlcigpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fdGV4dC5zZXRTd2l0Y2hPbigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+R5biD6byg5qCH56a75byA5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbW91c2VPdXQoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3RleHQuc2V0U3dpdGNoT2ZmKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDph43orr7nvKnmlL7mr5RcclxuICAgICAqIEBwYXJhbSB2YWx1ZSDmlrDlhajlsYDnvKnmlL7mr5RcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZVNjYWxlKHZhbHVlOm51bWJlcik6dm9pZHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9zY2FsZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh0aGlzLl9zeW1iLHRoaXMuX2luaXRQb3MsdGhpcy5faW5pdFNpemUsdGhpcy5fc3ByLmdldENvbG9yKCkpO1xyXG4gICAgICAgIHRoaXMuc2V0Q29sb3IoKTtcclxuICAgICAgICB0aGlzLl9kYW1hZ2Uuc2V0UGFyYW0oMCwwLHRoaXMuX2luaXRTaXplLngqdGhpcy5fc2NhbGUsdGhpcy5faW5pdFNpemUueSp0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlLmxvY2F0aW9uQW5kU2l6ZSgpO1xyXG4gICAgICAgIC8vIHRoaXMuX2FuaS5zY2FsZSgwLjI1KnZhbHVlLDAuMTgqdmFsdWUpO1xyXG4gICAgICAgIC8vIHRoaXMuX2FuaS5wb3MoLTE3KnZhbHVlLC04KnZhbHVlKTtcclxuICAgICAgICBcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7mnKxBUlXnmoTlkITpobnlj4LmlbBcclxuICAgICAqIEBwYXJhbSBzeW1iIHN5bWJcclxuICAgICAqIEBwYXJhbSBwb3Mg6LW35aeL5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gc2l6ZSDlpKflsI9cclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldERhdGEoc3ltYjpNeVN5bWJvbCwgcG9zOlZlYzIsIHNpemU6VmVjMixjb2xvcjpzdHJpbmcpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fc3ltYiA9IHN5bWI7XHJcbiAgICAgICAgdGhpcy5fcG9zID0gbmV3IFZlYzIocG9zLngqdGhpcy5fc2NhbGUscG9zLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX3NpemUgPSBuZXcgVmVjMihzaXplLngqdGhpcy5fc2NhbGUsc2l6ZS55KnRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9zcHIuc2V0UGFyYW0odGhpcy5fcG9zLngsdGhpcy5fcG9zLnksdGhpcy5fc2l6ZS54LHRoaXMuX3NpemUueSxjb2xvcik7XHJcbiAgICAgICAgdGhpcy5zZXRDb2xvcigpO1xyXG4gICAgICAgIHRoaXMuX3Nwci5sb2NhdGlvbkFuZFNpemUoKTtcclxuICAgICAgICB0aGlzLl9jZW50ZXJQb3MgPSBuZXcgVmVjMih0aGlzLl9zaXplLngvMix0aGlzLl9zaXplLnkvMik7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gY29sb3Ig6K6+572u6aKc6ImyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRDb2xvcigpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fc3ByLmNoYW5nZUNvbG9yKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gcG9zIOmHjeaWsOiuvue9rui1t+Wni+WdkOagh++8iOS4jeWPl+e8qeaUvuavlOW9seWTje+8iVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVsb2NhdGUocG9zOlZlYzIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fcG9zID0gbmV3IFZlYzIocG9zLngqdGhpcy5fc2NhbGUscG9zLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX2luaXRQb3MgPSBwb3MuY2xvbmUoKTtcclxuICAgICAgICB0aGlzLl9zcHIucmVsb2NhdGUocG9zKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmkafmr4HmnKxBUlVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRlc3RvcnkoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3Nwci5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bmnKxBUlXnmoTotbflp4vlnZDmoIfvvIjkuI3lj5fnvKnmlL7mr5TlvbHlk43vvIlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFBvc1ZlYygpOlZlYzJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luaXRQb3M7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5pysQVJV55qE6buY6K6k5paH5pys5a+56LGhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRUZXh0KCk6VGV4dHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGV4dDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqDpu5jorqTov5vluqbmnaFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZERlZkJhcigpOnZvaWR7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5faW5pdEJhckhlaWdodCA9IDA7XHJcbiAgICAgICAgbGV0IHRtcDpCYXIgPSBuZXcgQmFyKDAsXCIjMDBmZmZmXCIsbmV3IFZlYzIoMzAsNSksbmV3IFZlYzIoMCx0aGlzLl9pbml0QmFySGVpZ2h0IC0gNiksdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX3Nwci5hZGRDaGlsZCh0bXAuZ2V0QmFja1NwcigpKTtcclxuICAgICAgICB0aGlzLl9iYXJQYWlyLmVkaXQoXCJiYXJfMFwiLHRtcCk7XHJcbiAgICAgICAgdGhpcy5faW5pdEJhckhlaWdodCA9IHRoaXMuX2luaXRCYXJIZWlnaHQgLSB0bXAuZ2V0SGVpZ2h0KCkgLSAxO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5pysQVJV55qE5oyH5a6a6L+b5bqm5p2hXHJcbiAgICAgKiBAcGFyYW0gbnVtIOi/m+W6puadoeS7o+WPt1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0QmFyKG51bTpudW1iZXIpOkJhcntcclxuICAgICAgICByZXR1cm4gdGhpcy5fYmFyUGFpci5yZWFkKGBiYXJfJHtudW19YCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqDpmYTliqDov5vluqbmnaFcclxuICAgICAqIEBwYXJhbSBiYWNrR3JvdW5kQ29sb3Ig6K6+572u5paw5aKe6L+b5bqm5p2h6aKc6ImyXHJcbiAgICAgKiBAcGFyYW0gc3ltYiDorr7nva7mlrDlop7ov5vluqbmnaHku6Plj7dcclxuICAgICAqIEBwYXJhbSB4IOWuveW6plxyXG4gICAgICogQHBhcmFtIHkg6auY5bqmXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRFeHRCYXIoYmFja0dyb3VuZENvbG9yOnN0cmluZyxzeW1iOm51bWJlcixwZXJjZW50YWdlOm51bWJlcix4Om51bWJlciA9IDMwLHk6bnVtYmVyID0gNSk6dm9pZHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgdG1wQmFyOkJhciA9IG5ldyBCYXIoc3ltYixiYWNrR3JvdW5kQ29sb3IsbmV3IFZlYzIoeCx5KSxuZXcgVmVjMigwLHRoaXMuX2luaXRCYXJIZWlnaHQgLSB5IC0gMSksdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX3Nwci5hZGRDaGlsZCh0bXBCYXIuZ2V0QmFja1NwcigpKTtcclxuICAgICAgICB0aGlzLl9iYXJQYWlyLmVkaXQoYGJhcl8ke3N5bWJ9YCx0bXBCYXIpO1xyXG4gICAgICAgIHRoaXMuX2luaXRCYXJIZWlnaHQgPSB0aGlzLl9pbml0QmFySGVpZ2h0IC0gdG1wQmFyLmdldEhlaWdodCgpIC0gMTtcclxuICAgICAgICB0bXBCYXIucGVyY2VudGFnZSA9IHBlcmNlbnRhZ2U7XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIOS/ruaUueW3suaciei/m+W6puadoVxyXG4gICAgICogQHBhcmFtIHN5bWIg5oyH5a6a6L+b5bqm5p2h5Luj5Y+3XHJcbiAgICAgKiBAcGFyYW0gcGVyY2VudGFnZSDkv67mlLnov5vluqbmnaHov5vluqZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGVkaXRCYXIoc3ltYjpudW1iZXIsIHBlcmNlbnRhZ2U6bnVtYmVyKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX2JhclBhaXIucmVhZChgYmFyXyR7c3ltYn1gKS5wZXJjZW50YWdlID0gcGVyY2VudGFnZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqDpu5jorqTmjInpkq5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGREZWZCdXR0b25zKCk6dm9pZHtcclxuICAgICAgICBsZXQgdG1wMTpCdXR0b24gPSBuZXcgQnV0dG9uKHRoaXMuX3N5bWIsXCJSZXRyZWF0XCIsMCxuZXcgVmVjMiggLSAyMCx0aGlzLl9pbml0U2l6ZS55KSxuZXcgVmVjMigyMCwxNSksdW5kZWZpbmVkLHRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9idXR0b25QYWlyLmVkaXQoXCIwXCIsdG1wMSk7XHJcbiAgICAgICAgbGV0IHRtcDI6QnV0dG9uID0gbmV3IEJ1dHRvbih0aGlzLl9zeW1iLFwiQWN0aXZhdGVfU2tpbGxcIiwwLG5ldyBWZWMyKHRoaXMuX2luaXRTaXplLngsdGhpcy5faW5pdFNpemUueSksbmV3IFZlYzIoMjAsMTUpLHVuZGVmaW5lZCx0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fYnV0dG9uUGFpci5lZGl0KFwiMVwiLHRtcDIpO1xyXG4gICAgICAgIHRoaXMuX2J1dHRvbkhlaWdodCA9IHRoaXMuX2luaXRTaXplLnkgKyAxNjtcclxuICAgICAgICBsZXQgdG1wMzpCdXR0b24gPSBuZXcgQnV0dG9uKHRoaXMuX3N5bWIsXCJcIiw5OTksbmV3IFZlYzIoMCwwKSxuZXcgVmVjMigwLDApLHVuZGVmaW5lZCx0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fc3ByLmFkZENoaWxkKHRtcDMuZ2V0U3ByKCkpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWcqOm7mOiupOS9jee9rua3u+WKoOmineWkluaMiemSrlxyXG4gICAgICogQHBhcmFtIG5hbWUgXHJcbiAgICAgKiBAcGFyYW0gbnVtIFxyXG4gICAgICogQHBhcmFtIGNvbG9yIFxyXG4gICAgICogQHBhcmFtIGZ1biBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZEV4dHJhQnV0dG9uc0F0RGVmTG9jYXRpb24obmFtZTpzdHJpbmcsbnVtOm51bWJlciwgY29sb3I/OnN0cmluZywgZnVuPzpGdW5jdGlvbik6dm9pZHtcclxuICAgICAgICBsZXQgdG1wQnV0OkJ1dHRvbiA9IG5ldyBCdXR0b24odGhpcy5fc3ltYixuYW1lLG51bSxuZXcgVmVjMigwLHRoaXMuX2J1dHRvbkhlaWdodCksbmV3IFZlYzIoMjAsMTUpLGNvbG9yLHRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9idXR0b25QYWlyLmVkaXQobnVtK1wiXCIsdG1wQnV0KTtcclxuICAgICAgICB0aGlzLl9zcHIuYWRkQ2hpbGQodG1wQnV0LmdldFNwcigpKTtcclxuICAgICAgICB0aGlzLl9idXR0b25IZWlnaHQgKz0gMTY7XHJcbiAgICAgICAgdG1wQnV0LnNldEZ1bmMoZnVuKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWcqOaMh+WumuS9jee9rua3u+WKoOmineWkluaMiemSrlxyXG4gICAgICogQHBhcmFtIG5hbWUgXHJcbiAgICAgKiBAcGFyYW0gbnVtIFxyXG4gICAgICogQHBhcmFtIGZ1biBcclxuICAgICAqIEBwYXJhbSBwb3MgXHJcbiAgICAgKiBAcGFyYW0gc2l6ZSBcclxuICAgICAqIEBwYXJhbSBjb2xvciBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZEV4dHJhQnV0dG9uQXROb0RlZkxvY2F0aW9uKG5hbWU6c3RyaW5nLG51bTpudW1iZXIsZnVuOkZ1bmN0aW9uLHBvczpWZWMyLHNpemU6VmVjMiwgY29sb3I/OnN0cmluZyk6dm9pZHtcclxuICAgICAgICBsZXQgdG1wQnV0OkJ1dHRvbiA9IG5ldyBCdXR0b24odGhpcy5fc3ltYixuYW1lLG51bSxwb3Msc2l6ZSxjb2xvcix0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fYnV0dG9uUGFpci5lZGl0KG51bStcIlwiLHRtcEJ1dCk7XHJcbiAgICAgICAgdGhpcy5fc3ByLmFkZENoaWxkKHRtcEJ1dC5nZXRTcHIoKSk7XHJcbiAgICAgICAgdG1wQnV0LnNldEZ1bmMoZnVuKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluaMiemSrlxyXG4gICAgICogQHBhcmFtIG51bSDmjInpkq7nvJblj7dcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEJ1dHRvbihudW06bnVtYmVyKTpCdXR0b257XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2J1dHRvblBhaXIucmVhZChudW0rXCJcIik7XHJcbiAgICB9XHJcblxyXG59XHJcbiIsIi8vYXV0aG9yIE5hMkN1QzRPOFxyXG5pbXBvcnQgQ3VzdG9taXplZFNwcml0ZSBmcm9tIFwiLi9jdXN0b21pemVkU3ByXCI7XHJcbmltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi4vLi4vRG9kTWF0aFwiO1xyXG5pbXBvcnQgeyBFdmVudENlbnRyZSB9IGZyb20gXCIuLi8uLi8uLi9FdmVudC9FdmVudENlbnRyZVwiO1xyXG5pbXBvcnQgeyBTeW1ib2xpemVkIH0gZnJvbSBcIi4uLy4uLy4uL0ZpeC9GaXhTeW1ib2xcIjtcclxuaW1wb3J0IHsgS1ZQYWlyIH0gZnJvbSBcIi4uLy4uL0RvZERhdGFTdHJ1Y3R1cmVcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQ2hlc3NCb2FyZCBleHRlbmRzIEN1c3RvbWl6ZWRTcHJpdGV7XHJcbiAgICBwcml2YXRlIF9pbml0UG9zOlZlYzI7XHJcbiAgICBwcml2YXRlIF9pbml0U2l6ZTpWZWMyO1xyXG4gICAgcHJpdmF0ZSBfbnVtQXJyOm51bWJlcltdW107Ly8yZCBhcnIgd2hpY2ggcmVwcmVzZW50cyB0aGUgY2hlc3MgYm9hcmRcclxuICAgIHByaXZhdGUgX3Bvc1ZlYzI6VmVjMjsvL2luaXRpYWwgbG9jYXRpb24oeCx5KVxyXG4gICAgcHJpdmF0ZSBfdW5pdFNpemVWZWMyOlZlYzI7Ly91bml0IHNpemUod2lkdGgsIGhlaWdodClcclxuICAgIHByaXZhdGUgX2Zyb250U3ByQXJyOkN1c3RvbWl6ZWRTcHJpdGVbXVtdOy8vZnJvbnQgc3ByXHJcbiAgICBwcml2YXRlIF9zY2FsZTpudW1iZXI7Ly9zY2FsZSBmb3Igem9vbWluZ1xyXG4gICAgcHJpdmF0ZSBfYmFja0dyb3VuZENvbG9yOnN0cmluZzsvL2JhY2tncm91bmQgY29sb3JcclxuICAgIHByaXZhdGUgX2Zyb250Q29sb3I6c3RyaW5nOy8vZnJvbnQgY29sb3IgXHJcbiAgICBwcml2YXRlIF9pbml0Ym9hcmRzaXplOlZlYzI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmo4vnm5jmnoTpgKDlmahcclxuICAgICAqIEBwYXJhbSBhcnIg5LqM57u05pWw57uEXHJcbiAgICAgKiBAcGFyYW0gcG9zVmVjMiDotbflp4vlnZDmoIdcclxuICAgICAqIEBwYXJhbSB1bml0c2l6ZSDljZXkvY3lrr3pq5hcclxuICAgICAqIEBwYXJhbSBiYWNrR3JvdW5kQ29sb3Ig6IOM5pmv6aKc6ImyXHJcbiAgICAgKiBAcGFyYW0gZnJvbnRDb2xvciDmoLzlrZDpopzoibJcclxuICAgICAqIEBwYXJhbSBmYXRoZXIg54i257uY5Zu+6IqC54K5XHJcbiAgICAgKiBAcGFyYW0gc2NhbGUg57yp5pS+5q+UXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGFycjpudW1iZXJbXVtdLCBwb3NWZWMyOlZlYzIsIHVuaXRzaXplOlZlYzIsIGJhY2tHcm91bmRDb2xvcjpzdHJpbmcsIGZyb250Q29sb3I6c3RyaW5nLCBzY2FsZTpudW1iZXIpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fbnVtQXJyID0gYXJyO1xyXG4gICAgICAgIHRoaXMuX2luaXRQb3MgPSBwb3NWZWMyO1xyXG4gICAgICAgIHRoaXMuX2luaXRTaXplID0gdW5pdHNpemU7XHJcbiAgICAgICAgdGhpcy5fc2NhbGUgPSBzY2FsZTtcclxuICAgICAgICB0aGlzLl9wb3NWZWMyID0gbmV3IFZlYzIodGhpcy5faW5pdFBvcy54KnRoaXMuX3NjYWxlLCB0aGlzLl9pbml0UG9zLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX2luaXRib2FyZHNpemUgPSBuZXcgVmVjMih1bml0c2l6ZS54KmFyclswXS5sZW5ndGgsdW5pdHNpemUueSphcnIubGVuZ3RoKTtcclxuICAgICAgICB0aGlzLl91bml0U2l6ZVZlYzIgPSBuZXcgVmVjMih0aGlzLl9pbml0U2l6ZS54ICogdGhpcy5fc2NhbGUsdGhpcy5faW5pdFNpemUueSAqIHRoaXMuX3NjYWxlKTsvL3JlY2FsY3VsYXRlIHVuaXRTaXplXHJcbiAgICAgICAgdGhpcy5fYmFja0dyb3VuZENvbG9yID0gYmFja0dyb3VuZENvbG9yO1xyXG4gICAgICAgIHRoaXMuX2Zyb250Q29sb3IgPSBmcm9udENvbG9yO1xyXG4gICAgICAgIHRoaXMuaW5pdEJhY2tncm91bmQoKTtcclxuICAgICAgICB0aGlzLnNldENvbG9yKHRoaXMuX2JhY2tHcm91bmRDb2xvcik7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VDb2xvcigpO1xyXG4gICAgICAgIHRoaXMuaW5pdEZyb250U3ByQXJyKCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJGcm9udFNwcih0aGlzLl9mcm9udENvbG9yKTtcclxuICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5vbihFdmVudENlbnRyZS5FVHlwZS5QRVJGT1JNQU5DRV9SRVNDQUxFKCksdGhpcyx0aGlzLnJlU2NhbGUpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGRyYXcgYmFja2dyb3VuZFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRCYWNrZ3JvdW5kKCk6dm9pZHtcclxuICAgICAgICB0aGlzLnNldFBhcmFtKHRoaXMuX3Bvc1ZlYzIueCx0aGlzLl9wb3NWZWMyLnksdGhpcy5fbnVtQXJyWzBdLmxlbmd0aCp0aGlzLl91bml0U2l6ZVZlYzIueCx0aGlzLl9udW1BcnIubGVuZ3RoKnRoaXMuX3VuaXRTaXplVmVjMi55LHRoaXMuX2JhY2tHcm91bmRDb2xvcik7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbkFuZFNpemUoKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGRyYXcgZnJvbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0RnJvbnRTcHJBcnIoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX2Zyb250U3ByQXJyID0gW107Ly9pbml0IGN1c3RTcHJBcnJcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fbnVtQXJyLmxlbmd0aDsgaSArKyl7XHJcbiAgICAgICAgICAgIGxldCB0bXBBcnI6Q3VzdG9taXplZFNwcml0ZVtdID0gW107XHJcbiAgICAgICAgICAgIGZvciggbGV0IGogPSAwOyBqIDwgdGhpcy5fbnVtQXJyWzBdLmxlbmd0aDsgaiArKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG1wU3ByOkN1c3RvbWl6ZWRTcHJpdGUgPSBuZXcgQ3VzdG9taXplZFNwcml0ZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDaGlsZCh0bXBTcHIpO1xyXG4gICAgICAgICAgICAgICAgdG1wU3ByLnNldFBhcmFtKDAraip0aGlzLl91bml0U2l6ZVZlYzIueCwwK2kqdGhpcy5fdW5pdFNpemVWZWMyLnksdGhpcy5fdW5pdFNpemVWZWMyLngsdGhpcy5fdW5pdFNpemVWZWMyLnksdGhpcy5fZnJvbnRDb2xvcixuZXcgVmVjMigxLDEpKTtcclxuICAgICAgICAgICAgICAgIHRtcFNwci5sb2NhdGlvbkFuZFNpemUoKTtcclxuICAgICAgICAgICAgICAgIHRtcFNwci5zZXRDb2xvcih0aGlzLl9mcm9udENvbG9yKTtcclxuICAgICAgICAgICAgICAgIHRtcFNwci5jaGFuZ2VDb2xvcigpO1xyXG4gICAgICAgICAgICAgICAgdG1wU3ByLnpPcmRlciA9IC0xO1xyXG4gICAgICAgICAgICAgICAgdG1wQXJyLnB1c2godG1wU3ByKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9mcm9udFNwckFyci5wdXNoKHRtcEFycik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gY29sb3IgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVuZGVyRnJvbnRTcHIoY29sb3I6c3RyaW5nKXtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fZnJvbnRTcHJBcnIubGVuZ3RoOyBpICsrKXtcclxuICAgICAgICAgICAgZm9yKCBsZXQgaiA9IDA7IGogPCB0aGlzLl9mcm9udFNwckFyclswXS5sZW5ndGg7IGogKyspe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZnJvbnRTcHJBcnJbaV1bal0uc2V0Q29sb3IoY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZnJvbnRTcHJBcnJbaV1bal0uY2hhbmdlQ29sb3IoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS/ruaUueWJjeaWueagvOWtkOminOiJslxyXG4gICAgICogQHBhcmFtIHBvc1ZlYzIg5b6F5L+u5pS55qC85a2Q5Z2Q5qCH77yIeCx577yJXHJcbiAgICAgKiBAcGFyYW0gY29sb3Ig55uu5qCH6aKc6ImyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjaGFuZ2VGcm9udENvbG9yKHBvc1ZlYzI6VmVjMixjb2xvcjpzdHJpbmcpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fZnJvbnRTcHJBcnJbcG9zVmVjMi55XVtwb3NWZWMyLnhdLnNldENvbG9yKGNvbG9yKTtcclxuICAgICAgICB0aGlzLl9mcm9udFNwckFycltwb3NWZWMyLnldW3Bvc1ZlYzIueF0uY2hhbmdlQ29sb3IoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa4hemZpOaJgOacieW3sue7mOWbvuW9olxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNsZWFyQWxsKCk6dm9pZHtcclxuICAgICAgICB0aGlzLmdyYXBoaWNzLmNsZWFyKCk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuX2Zyb250U3ByQXJyLmxlbmd0aDsgaSArKyl7XHJcbiAgICAgICAgICAgIGZvciggbGV0IGogPSAwOyBqIDwgdGhpcy5fZnJvbnRTcHJBcnJbMF0ubGVuZ3RoOyBqICsrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Zyb250U3ByQXJyW2ldW2pdLmdyYXBoaWNzLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDph43orr7mo4vnm5jnvKnmlL7mr5RcclxuICAgICAqIEBwYXJhbSBudW0g57yp5pS+5q+UXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZVNjYWxlKG51bTpudW1iZXIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fc2NhbGUgPSBudW07XHJcbiAgICAgICAgdGhpcy5fcG9zVmVjMiA9IG5ldyBWZWMyKHRoaXMuX2luaXRQb3MueCp0aGlzLl9zY2FsZSx0aGlzLl9pbml0UG9zLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX3VuaXRTaXplVmVjMiA9IG5ldyBWZWMyKHRoaXMuX2luaXRTaXplLnggKiB0aGlzLl9zY2FsZSx0aGlzLl9pbml0U2l6ZS55ICogdGhpcy5fc2NhbGUpOy8vcmVjYWxjdWxhdGUgdW5pdFNpemVcclxuICAgICAgICB0aGlzLmNsZWFyQWxsKCk7XHJcbiAgICAgICAgdGhpcy5pbml0QmFja2dyb3VuZCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdEZyb250U3ByQXJyKCk7XHJcbiAgICAgICAgdGhpcy5zZXRDb2xvcih0aGlzLl9iYWNrR3JvdW5kQ29sb3IpO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlQ29sb3IoKTtcclxuICAgICAgICB0aGlzLnJlbmRlckZyb250U3ByKHRoaXMuX2Zyb250Q29sb3IpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHJldHVybk1vdXNlVmVjKCk6VmVjMntcclxuICAgICAgICByZXR1cm4gbmV3IFZlYzIodGhpcy5tb3VzZVgsdGhpcy5tb3VzZVkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRVbml0U2l6ZSgpOlZlYzJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luaXRTaXplO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRib2FyZHNpemUoKTpWZWMye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbml0Ym9hcmRzaXplO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIHNpZGVVSXtcclxuXHJcbiAgICBwcml2YXRlIF9wb3M6VmVjMjtcclxuICAgIHByaXZhdGUgX3VuaXRTaXplOlZlYzI7XHJcbiAgICBwcml2YXRlIF9yZXNjYWxlOm51bWJlcjtcclxuICAgIHByaXZhdGUgX2N1cnJQb3M6VmVjMjtcclxuICAgIHByaXZhdGUgX2N1cnJVbml0U2l6ZTpWZWMyO1xyXG4gICAgcHJpdmF0ZSBfYm91bmQ6YW55W10gPSBbXTtcclxuICAgIHByaXZhdGUgX3NwcjpDdXN0b21pemVkU3ByaXRlO1xyXG4gICAgcHJpdmF0ZSBfcG9zUGFpcjpLVlBhaXI8VmVjMj4gPSBuZXcgS1ZQYWlyPFZlYzI+KCk7XHJcbiAgICBcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwb3M6VmVjMiwgdW5pdFNpemU6VmVjMixyZXNjYWxlOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5fcG9zID0gcG9zO1xyXG4gICAgICAgIHRoaXMuX3VuaXRTaXplID0gdW5pdFNpemU7XHJcbiAgICAgICAgdGhpcy5fcmVzY2FsZSA9IHJlc2NhbGU7XHJcbiAgICAgICAgdGhpcy5fY3VyclBvcyA9IG5ldyBWZWMyKHBvcy54KnJlc2NhbGUscG9zLnkqcmVzY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fY3VyclVuaXRTaXplID0gbmV3IFZlYzIodW5pdFNpemUueCpyZXNjYWxlLHVuaXRTaXplLnkqcmVzY2FsZSk7XHJcbiAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2Uub24oRXZlbnRDZW50cmUuRVR5cGUuUEVSRk9STUFOQ0VfUkVTQ0FMRSgpLHRoaXMsKHJlc2NhbGU6bnVtYmVyKT0+e1xyXG4gICAgICAgICAgICB0aGlzLl9yZXNjYWxlID0gcmVzY2FsZTtcclxuICAgICAgICAgICAgdGhpcy5fY3VyclBvcyA9IG5ldyBWZWMyKHRoaXMuX3Bvcy54KnRoaXMuX3Jlc2NhbGUsdGhpcy5fcG9zLnkqdGhpcy5fcmVzY2FsZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJVbml0U2l6ZSA9IG5ldyBWZWMyKHRoaXMuX3VuaXRTaXplLngqdGhpcy5fcmVzY2FsZSx0aGlzLl91bml0U2l6ZS55KnRoaXMuX3Jlc2NhbGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX3NwciA9IG5ldyBDdXN0b21pemVkU3ByaXRlKCk7XHJcbiAgICAgICAgdGhpcy5fc3ByLnBvcyh0aGlzLl9jdXJyUG9zLngsIHRoaXMuX2N1cnJQb3MueSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHB1c2hBY3Rvcihib3VuZDpTeW1ib2xpemVkLG5hbWU6c3RyaW5nKTpDdXN0b21pemVkU3ByaXRle1xyXG5cclxuICAgICAgICBsZXQgdG1wU3ByOkN1c3RvbWl6ZWRTcHJpdGUgPSBuZXcgQ3VzdG9taXplZFNwcml0ZSgpO1xyXG4gICAgICAgIGxldCBpbmZvOmFueVtdID0gW2JvdW5kLnN5bWJvbC5kYXRhXTtcclxuICAgICAgICB0aGlzLl9ib3VuZC5wdXNoKGluZm8pO1xyXG4gICAgICAgIGxldCBpbml0cG9zOlZlYzIgPSBuZXcgVmVjMigwLHRoaXMuX2N1cnJVbml0U2l6ZS55Kih0aGlzLl9ib3VuZC5sZW5ndGgtMSkpO1xyXG4gICAgICAgIHRoaXMuX3Bvc1BhaXIuZWRpdChib3VuZC5zeW1ib2wuZGF0YStcIlwiLGluaXRwb3MpO1xyXG4gICAgICAgIHRtcFNwci5wb3MoaW5pdHBvcy54LGluaXRwb3MueSkuc2l6ZSh0aGlzLl9jdXJyVW5pdFNpemUueCx0aGlzLl9jdXJyVW5pdFNpemUueSk7XHJcbiAgICAgICAgdGhpcy5fc3ByLmFkZENoaWxkKHRtcFNwcik7XHJcbiAgICAgICAgdG1wU3ByLmxvYWRJbWFnZShgcmVzL3BuZy8ke25hbWV9LnBuZ2ApO1xyXG4gICAgICAgIHRoaXMuX3Nwci5zaXplKHRoaXMuX2N1cnJVbml0U2l6ZS54LHRoaXMuX2N1cnJVbml0U2l6ZS55KnRoaXMuX2JvdW5kLmxlbmd0aCk7XHJcbiAgICAgICAgcmV0dXJuIHRtcFNwcjtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdldFNwcigpOkN1c3RvbWl6ZWRTcHJpdGV7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NwcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UG9zKCk6VmVjMntcclxuICAgICAgICByZXR1cm4gdGhpcy5fcG9zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRTaXplKCk6VmVjMntcclxuICAgICAgICByZXR1cm4gdGhpcy5fdW5pdFNpemU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldHNjYWxlKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZXNjYWxlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWFkUGFpckZvclBvcyhib3VuZDpTeW1ib2xpemVkKTpWZWMye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wb3NQYWlyLnJlYWQoYm91bmQuc3ltYm9sLmRhdGErXCJcIik7XHJcbiAgICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi4vLi4vRG9kTWF0aFwiO1xyXG5cclxuLy9hdXRob3IgTmEyQ3VDNE84XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdXN0b21pemVkU3ByaXRlIGV4dGVuZHMgTGF5YS5TcHJpdGV7XHJcbiAgICBwcml2YXRlIF9jb2xvcjpzdHJpbmc7Ly/lj6/op4boioLngrnpopzoibJcclxuICAgIHByaXZhdGUgX2dyYXBoaWNTaGlmdDpWZWMyOy8v6YeN5Y+g57uY5Zu+5YGP56e76YePXHJcbiAgICBwcml2YXRlIF9jZW50cmFsU2hpZnQ7Ly/kuK3lv4Pnu5jlm77lgY/np7vph49cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNlbnRyYWxTaGlmdENvbG9yZWQoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuZ3JhcGhpY3MuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLmdyYXBoaWNzLmRyYXdSZWN0KC10aGlzLndpZHRoLzIsLXRoaXMuaGVpZ2h0LzIsdGhpcy53aWR0aCx0aGlzLmhlaWdodCx0aGlzLl9jb2xvcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBjb2xvciBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldENvbG9yKGNvbG9yOnN0cmluZyk6dm9pZHtcclxuICAgICAgICB0aGlzLl9jb2xvciA9IGNvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5L+u5pS56aKc6ImyXHJcbiAgICAgKiBAcGFyYW0gY29sb3Ig55uu5qCH6aKc6ImyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjaGFuZ2VDb2xvcigpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5ncmFwaGljcy5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuZ3JhcGhpY3MuZHJhd1JlY3QodGhpcy5fZ3JhcGhpY1NoaWZ0LngsdGhpcy5fZ3JhcGhpY1NoaWZ0LnksdGhpcy53aWR0aC0yKnRoaXMuX2dyYXBoaWNTaGlmdC54LHRoaXMuaGVpZ2h0LTIqdGhpcy5fZ3JhcGhpY1NoaWZ0LnksdGhpcy5fY29sb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u55u45YWz5Y+C5pWwXHJcbiAgICAgKiBAcGFyYW0gcG9zWCDotbflp4t4XHJcbiAgICAgKiBAcGFyYW0gcG9zWSDotbflp4t5XHJcbiAgICAgKiBAcGFyYW0gd2lkdGgg5a695bqmXHJcbiAgICAgKiBAcGFyYW0gaGVpZ2h0IOmrmOW6plxyXG4gICAgICogQHBhcmFtIGNvbG9yIOminOiJslxyXG4gICAgICogQHBhcmFtIGdyYXBoaWNTaGlmdCDmo4vnm5jlgY/np7vlgLxcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFBhcmFtKHBvc1g6bnVtYmVyLCBwb3NZOm51bWJlciwgd2lkdGg6bnVtYmVyLCBoZWlnaHQ6bnVtYmVyLCBjb2xvcjpzdHJpbmcgPSB0aGlzLl9jb2xvciwgZ3JhcGhpY1NoaWZ0OlZlYzIgPSBuZXcgVmVjMigwLDApKTp2b2lke1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMueCA9IHBvc1g7XHJcbiAgICAgICAgdGhpcy55ID0gcG9zWTtcclxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5zZXRDb2xvcihjb2xvcik7XHJcbiAgICAgICAgdGhpcy5fZ3JhcGhpY1NoaWZ0ID0gZ3JhcGhpY1NoaWZ0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5L+u5pS55Z2Q5qCH5ZKM5aSn5bCPXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2NhdGlvbkFuZFNpemUoKTp2b2lke1xyXG4gICAgICAgIHRoaXMucG9zKHRoaXMueCx0aGlzLnkpLnNpemUodGhpcy53aWR0aCx0aGlzLmhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDph43orr7lnZDmoIdcclxuICAgICAqIEBwYXJhbSBwb3NWZWMyIOebruagh+WdkOagh1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVsb2NhdGUocG9zVmVjMjpWZWMyKTp2b2lke1xyXG4gICAgICAgIHRoaXMueCA9IHBvc1ZlYzIueDtcclxuICAgICAgICB0aGlzLnkgPSBwb3NWZWMyLnk7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbkFuZFNpemUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmHjeiuvuWuvemrmFxyXG4gICAgICogQHBhcmFtIHNpemVWZWMyIOebruagh+WuvemrmFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVTaXplKHNpemVWZWMyOlZlYzIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHNpemVWZWMyLng7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBzaXplVmVjMi55O1xyXG4gICAgICAgIHRoaXMuY2hhbmdlQ29sb3IoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuW9k+WJjeWbvuW9oui1t+Wni+WdkOagh1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0UG9zKCk6VmVjMntcclxuICAgICAgICByZXR1cm4gbmV3IFZlYzIodGhpcy54LHRoaXMueSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57lt7Lnu5jljLrln5/lpKflsI9cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFNpemUoKTpWZWMye1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjMih0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogXHJcbiAgICAgKiDov5Tlm57lvZPliY3lt7Lnu5jljLrln5/popzoibJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldENvbG9yKCk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb2xvcjtcclxuICAgIH1cclxufSIsIi8vYXV0aG9yIE5hMkN1QzRPOFxyXG5cclxuaW1wb3J0IEFjdG9yUlUgZnJvbSBcIi4vU3ltYm9saXplZFJlbmRlclwiO1xyXG5pbXBvcnQgeyBLVlBhaXIgfSBmcm9tIFwiLi4vLi4vRG9kRGF0YVN0cnVjdHVyZVwiO1xyXG5pbXBvcnQgeyBNeVN5bWJvbCB9IGZyb20gXCIuLi8uLi8uLi9GaXgvRml4U3ltYm9sXCI7XHJcblxyXG5cclxuLy/lgqjlrZjmiYDmnInnu5jlm77oioLngrnlr7nosaFcclxuZXhwb3J0IGNsYXNzIEFjdG9yQm94e1xyXG4gICAgcHVibGljIHN0YXRpYyBCb3g6S1ZQYWlyPEFjdG9yUlU+ID0gbmV3IEtWUGFpcigpO1xyXG4gICAgcHVibGljIHN0YXRpYyBhZGQoYWN0OkFjdG9yUlUsc3ltYjpNeVN5bWJvbCk6dm9pZHtcclxuICAgICAgICBBY3RvckJveC5Cb3guZWRpdChzeW1iLmRhdGErXCJcIixhY3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0KHN5bTpudW1iZXIpOkFjdG9yUlV7XHJcbiAgICAgICAgcmV0dXJuIEFjdG9yQm94LkJveC5yZWFkKHN5bStcIlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxufSIsImltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi4vQ29tbW9uL0RvZE1hdGhcIjtcclxuaW1wb3J0IHsgTXlTeW1ib2wgfSBmcm9tIFwiLi4vRml4L0ZpeFN5bWJvbFwiO1xyXG4vLy8vLy9cclxuZXhwb3J0IGNsYXNzIEV2ZW50Q2VudHJle1xyXG4gICAgcHVibGljIHN0YXRpYyBpbnN0YW5jZTpFdmVudENlbnRyZTtcclxuICAgIHB1YmxpYyBzdGF0aWMgRVR5cGU6RVR5cGU7XHJcbiAgICBwdWJsaWMgc3RhdGljIGluaXQoKTp2b2lke1xyXG4gICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlID0gbmV3IEV2ZW50Q2VudHJlKCk7XHJcbiAgICAgICAgRXZlbnRDZW50cmUuRVR5cGUgPSBuZXcgRVR5cGUoKTtcclxuICAgICAgICBFdmVudENlbnRyZS5pbml0ID0gKCk9Pnt9O1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIF9jZW50cmU6TGF5YS5FdmVudERpc3BhdGNoZXIgPSBuZXcgTGF5YS5FdmVudERpc3BhdGNoZXIoKTtcclxuXHJcbiAgICBwdWJsaWMgb24odHlwZTpzdHJpbmcsIGNhbGxlcjphbnksIGxpc3RlbmVyOkZ1bmN0aW9uLCBhcmdzPzphbnlbXSk6dm9pZHtcclxuICAgICAgICB0aGlzLl9jZW50cmUub24odHlwZSxjYWxsZXIsbGlzdGVuZXIsYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGV2ZW50KHR5cGU6c3RyaW5nLCBhcmdzPzphbnkpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fY2VudHJlLmV2ZW50KHR5cGUsYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9mZih0eXBlOnN0cmluZywgY2FsbGVyOmFueSwgbGlzdGVuZXI6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuX2NlbnRyZS5vZmYodHlwZSwgY2FsbGVyLCBsaXN0ZW5lcik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKXt9XHJcbn1cclxuXHJcblxyXG5jbGFzcyBFVHlwZSB7XHJcbiAgICBwdWJsaWMgTEVBVkUocG9zOlZlYzIsIGlkZW50aXR5OnN0cmluZyk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBgJHtpZGVudGl0eX06Q09MTElTSU9OX0VWRU5UX0xFQVZFX0ZST00oJHtwb3MueH18JHtwb3MueX0pYDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBFTlRSRShwb3M6VmVjMiwgaWRlbnRpdHk6c3RyaW5nKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIGAke2lkZW50aXR5fTpDT0xMSVNJT05fRVZFTlRfRU5UUkVfVE8oJHtwb3MueH18JHtwb3MueX0pYDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG5ldyBhZGRlZCBmb3IgcGVyZm9ybWFuY2Ugc3RhcnRzIGhlcmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIFBFUkZPUk1BTkNFX1JFU0NBTEUoKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIFwiUkVTQ0FMRVwiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBQRVJGT1JNQU5DRV9URVhUX1NXSVRDSCgpOnN0cmluZ3tcclxuICAgICAgICByZXR1cm4gXCJURVhUX1NXSVRDSFwiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBQRVJGT1JNQU5DRV9BQ1RPUl9PTl9CT0FSRChzeW1iOm51bWJlcil7XHJcbiAgICAgICAgcmV0dXJuIGBBQ1RPUl8ke3N5bWJ9X09OX0JPQVJEYDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogbmV3IGFkZGVkIGZvciBwZXJmb3JtYW5jZSBlbmRzIGhlcmVcclxuICAgICAqL1xyXG59IiwiaW1wb3J0IHsgVmVjMiwgRG9kTWF0aCB9IGZyb20gXCIuLi9Db21tb24vRG9kTWF0aFwiO1xyXG5pbXBvcnQgeyBBcnJheUFsZ28gfSBmcm9tIFwiLi4vQ29tbW9uL0RvZERhdGFTdHJ1Y3R1cmVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBGaXhSZWN0IGV4dGVuZHMgTGF5YS5SZWN0YW5nbGV7XHJcbiAgICBjb25zdHJ1Y3Rvcih4PzpudW1iZXIsIHk/Om51bWJlciwgd2lkdGg/Om51bWJlciwgaGVpZ2h0PzpudW1iZXIpe1xyXG4gICAgICAgIHN1cGVyKHgseSx3aWR0aCxoZWlnaHQpO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJleHBvcnQgaW50ZXJmYWNlIFN5bWJvbGl6ZWR7XHJcbiAgICBzeW1ib2w6TXlTeW1ib2w7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNeVN5bWJvbHtcclxuICAgIHByaXZhdGUgc3RhdGljIGNvdW50Om51bWJlciA9IDA7XHJcblxyXG4gICAgcHJpdmF0ZSBfZGF0YTpudW1iZXI7XHJcblxyXG4gICAgcHVibGljIGdldCBkYXRhKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IE15U3ltYm9sLmNvdW50O1xyXG4gICAgICAgIE15U3ltYm9sLmNvdW50ICs9IDE7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBGaXhUaW1lIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZnJhbWVSYXRlOiBudW1iZXIgPSA2MDtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZGVsdGFUaW1lOiBudW1iZXIgPSAxIC8gRml4VGltZS5mcmFtZVJhdGU7XHJcbiAgICBwdWJsaWMgc3RhdGljIGZyYW1lQ291bnQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgZWxhcHNlZFRpbWU6IG51bWJlcjtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5mcmFtZUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLmVsYXBzZWRUaW1lID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmZyYW1lQ291bnQrKztcclxuICAgICAgICB0aGlzLmVsYXBzZWRUaW1lICs9IHRoaXMuZGVsdGFUaW1lO1xyXG4gICAgfVxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXHJcbmltcG9ydCBHYW1lIGZyb20gXCIuL1NjZW5lU2NyaXB0L0dhbWVcIlxyXG5pbXBvcnQgTG9hZGluZyBmcm9tIFwiLi9TY2VuZVNjcmlwdC9Mb2FkaW5nXCJcclxuLypcclxuKiDmuLjmiI/liJ3lp4vljJbphY3nva47XHJcbiovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVDb25maWd7XHJcbiAgICBzdGF0aWMgd2lkdGg6bnVtYmVyPTE4MDA7XHJcbiAgICBzdGF0aWMgaGVpZ2h0Om51bWJlcj05MDA7XHJcbiAgICBzdGF0aWMgc2NhbGVNb2RlOnN0cmluZz1cIm5vc2NhbGVcIjtcclxuICAgIHN0YXRpYyBzY3JlZW5Nb2RlOnN0cmluZz1cIm5vbmVcIjtcclxuICAgIHN0YXRpYyBhbGlnblY6c3RyaW5nPVwidG9wXCI7XHJcbiAgICBzdGF0aWMgYWxpZ25IOnN0cmluZz1cImxlZnRcIjtcclxuICAgIHN0YXRpYyBzdGFydFNjZW5lOmFueT1cIkxvYWRpbmdTY2VuZS5zY2VuZVwiO1xyXG4gICAgc3RhdGljIHNjZW5lUm9vdDpzdHJpbmc9XCJcIjtcclxuICAgIHN0YXRpYyBkZWJ1Zzpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIHN0YXQ6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBwaHlzaWNzRGVidWc6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBleHBvcnRTY2VuZVRvSnNvbjpib29sZWFuPXRydWU7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe31cclxuICAgIHN0YXRpYyBpbml0KCl7XHJcbiAgICAgICAgdmFyIHJlZzogRnVuY3Rpb24gPSBMYXlhLkNsYXNzVXRpbHMucmVnQ2xhc3M7XHJcbiAgICAgICAgcmVnKFwiU2NlbmVTY3JpcHQvR2FtZS50c1wiLEdhbWUpO1xyXG4gICAgICAgIHJlZyhcIlNjZW5lU2NyaXB0L0xvYWRpbmcudHNcIixMb2FkaW5nKTtcclxuICAgIH1cclxufVxyXG5HYW1lQ29uZmlnLmluaXQoKTsiLCJpbXBvcnQgeyBDb2xpRW1pdCB9IGZyb20gXCIuL0FjdG9yTW9kdWxlcy9Db2xpTWVzc2FnZVwiO1xyXG5pbXBvcnQgeyBQcm9maWxlIH0gZnJvbSBcIi4vQWN0b3JNb2R1bGVzL1Byb2ZpbGVcIjtcclxuaW1wb3J0IHsgU3ltYm9saXplZCwgTXlTeW1ib2wgfSBmcm9tIFwiLi4vLi4vRml4L0ZpeFN5bWJvbFwiO1xyXG5pbXBvcnQgeyBCdWZmIH0gZnJvbSBcIi4vQWN0b3JNb2R1bGVzL0J1ZmZcIjtcclxuaW1wb3J0IHsgQXRrU3RhdGVNYWNoaW5lIH0gZnJvbSBcIi4vQXR0YWNrL0F0a0Fic3RcIjtcclxuaW1wb3J0IHsgRGFtYWdlIH0gZnJvbSBcIi4vQWN0b3JNb2R1bGVzL0RhbWFnZVwiO1xyXG5pbXBvcnQgeyBBY3RvclR5cGUgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL0RvZEtleVwiO1xyXG5pbXBvcnQgQWN0b3JTdGF0ZU1nciwgeyBBY3RvclN0YXRlSUQgfSBmcm9tIFwiLi9TdGF0ZS9BY3RvclN0YXRlRnNtXCI7XHJcbmltcG9ydCB7IEFjdG9yQnVmZk1nciB9IGZyb20gXCIuL0FjdG9yTW9kdWxlcy9BY3RvckJ1ZmZNZ3JcIjtcclxuaW1wb3J0IHsgVHJhbnNmb3JtIH0gZnJvbSBcIi4vQWN0b3JNb2R1bGVzL1RyYW5zZm9ybVwiO1xyXG5pbXBvcnQgeyBVbml0UmVuZGVyIH0gZnJvbSBcIi4vQWN0b3JNb2R1bGVzL1VuaXRSZW5kZXJcIjtcclxuaW1wb3J0IHsgQW5pbWF0aW9uIH0gZnJvbSBcIi4vQWN0b3JNb2R1bGVzL0FuaW1hdGlvblwiO1xyXG5pbXBvcnQgUm91dGUgZnJvbSBcIi4vQWN0b3JSb3V0ZVwiO1xyXG5pbXBvcnQgeyBBY3RvclNraWxsIH0gZnJvbSBcIi4vQWN0b3JNb2R1bGVzL0FjdG9yU2tpbGxcIjtcclxuaW1wb3J0IHsgQWN0b3JDb3N0IH0gZnJvbSBcIi4vQWN0b3JNb2R1bGVzL0FjdG9yQ29zdFwiO1xyXG5pbXBvcnQgeyBCbG9ja2VyIH0gZnJvbSBcIi4vQXR0YWNrL0Jsb2NrZXJcIjtcclxuaW1wb3J0IHsgVmVjMiB9IGZyb20gXCIuLi8uLi9Db21tb24vRG9kTWF0aFwiO1xyXG5pbXBvcnQgR2FtZUJhdHRsZSBmcm9tIFwiLi4vR2FtZUJhdHRsZVwiO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbi8v5Z+65pys5Y6f5YiZ77ya5bCR55So57un5om/77yM5aSa55So57uE5ZCIXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjdG9yIGltcGxlbWVudHMgU3ltYm9saXplZHtcclxuICAgIHB1YmxpYyBzeW1ib2w6IE15U3ltYm9sOyAvL+WFqOWxgOWUr+S4gOeahOagh+ivhuaVsOWtl1xyXG4gICAgcHVibGljIHR5cGU6IEFjdG9yVHlwZSA9IEFjdG9yVHlwZS5Ob25lOyAvL+m7mOiupOi6q+S7veS4ukFjdG9yXHJcblxyXG4gICAgcHVibGljIHN0YXRlOiBBY3RvclN0YXRlTWdyOyAvL+eKtuaAgeacuiDnu5/nrbnnirbmgIHmm7TmlrBcclxuXHJcbiAgICBwdWJsaWMgcHJvZmlsZTpQcm9maWxlOy8v5Z+65pys5bGe5oCn5LiO6K6/6Zeu5pa55rOV5ZCI6ZuGXHJcblxyXG4gICAgcHVibGljIGF0azogQXRrU3RhdGVNYWNoaW5lOy8v5pS75Ye754q25oCB5py6XHJcbiAgICBwdWJsaWMgY29saUVtaXQ6Q29saUVtaXQgPSBuZXcgQ29saUVtaXQoMCwwLENvbGlFbWl0LkdMT0JBTF9VTklUX1NVQldJRFRILENvbGlFbWl0LkdMT0JBTF9VTklUX1NVQkhFSUdIVCk7Ly/norDmkp7kuovku7blj5HluIPogIVcclxuICAgIHB1YmxpYyBibG9ja2VyOkJsb2NrZXI7Ly/pmLvmjKHmqKHlnZdcclxuICAgIHB1YmxpYyBidWZmTWdyOkFjdG9yQnVmZk1ncjtcclxuICAgIHB1YmxpYyB0cmFuc2Zvcm06VHJhbnNmb3JtO1xyXG4gICAgcHVibGljIHJlbmRlcjpVbml0UmVuZGVyO1xyXG4gICAgcHVibGljIGFuaW1hdGlvbjpBbmltYXRpb247XHJcbiAgICBwdWJsaWMgcm91dGU6Um91dGU7Ly/ot6/lvoTlr7nosaFcclxuICAgIHB1YmxpYyBza2lsbDpBY3RvclNraWxsO1xyXG4gICAgcHVibGljIGNvc3Q6QWN0b3JDb3N0O1xyXG5cclxuICAgIC8vVE9ET++8muWOu+WMheS4gOS4que7hOS7tlxyXG4gICAgLy8gLyoqXHJcbiAgICAvLyAgKiDnm67moIfpgInmi6nlmahcclxuICAgIC8vICAqL1xyXG4gICAgLy8gcHVibGljIHNlZWtlcjogU2Vla2VyO1xyXG5cclxuICAgIC8vIC8qXHJcbiAgICAvLyAqIOW9k+WJjemUgeWumuebruagh1xyXG4gICAgLy8gKiAqL1xyXG4gICAgLy8gcHVibGljIGZvY3VzOiBBY3RvcjtcclxuXHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHR5cGU6IEFjdG9yVHlwZSwgcmVzOiBhbnkpIHtcclxuICAgICAgICByZXNbJ3h4eCddID0gMTE0NTE0MTkxOTgxMDtcclxuXHJcbiAgICAgICAgdGhpcy5zeW1ib2wgPSBuZXcgTXlTeW1ib2woKTtcclxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBuZXcgQWN0b3JTdGF0ZU1ncih0aGlzKTtcclxuICAgICAgICAvLyBhY2NvcmRpbmcgdG8gZGlmZmVyZW50IHR5cGUsIGFkZCBkaWZmZXJlbnQgY29tcG9uZW50cyB0byB0aGlzIGFjdG9yLiBcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybSA9IG5ldyBUcmFuc2Zvcm0odGhpcyk7XHJcbiAgICAgICAgdGhpcy5wcm9maWxlID0gbmV3IFByb2ZpbGUodGhpcywgcmVzWyd4eHgnXSk7IFxyXG4gICAgICAgIHRoaXMuYXRrID0gbmV3IEF0a1N0YXRlTWFjaGluZSh0aGlzLCByZXNbJ3h4eCddKTtcclxuICAgICAgICB0aGlzLmJsb2NrZXIgPSBuZXcgQmxvY2tlcih0aGlzLCByZXNbJ3h4eCddKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmJ1ZmZNZ3IgPSBuZXcgQWN0b3JCdWZmTWdyKHRoaXMsIHJlc1sneHh4J10pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucmVuZGVyID0gbmV3IFVuaXRSZW5kZXIodGhpcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSBuZXcgQW5pbWF0aW9uKHRoaXMsIHJlc1sneHh4J10pO1xyXG4gXHJcbiAgICAgICAgaWYgKEFjdG9yVHlwZS5Nb25zdGVyID09IHRoaXMudHlwZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlID0gbmV3IFJvdXRlKHRoaXMsIHJlc1sneHh4J10pO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKEFjdG9yVHlwZS5PcGVyYXRvciA9PSB0aGlzLnR5cGUpIHtcclxuICAgICAgICAgICAgdGhpcy5za2lsbCA9IG5ldyBBY3RvclNraWxsKHRoaXMsIHJlc1sneHh4J10pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5jb3N0ID0gbmV3IEFjdG9yQ29zdCh0aGlzKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhd2FrZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXRlLnJ1blN0YXRlKEFjdG9yU3RhdGVJRC5QcmVwYXJlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXRlLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICAvLyByZXNldCBjbGVhciByZXNvdXJjZSByZWxhdGVkIG1vZHVsZVxyXG4gICAgICAgIC8vIHRoaXMucmVuZGVyLnJlc2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldE9uTWFwKCk6IHZvaWQge1xyXG4gICAgICAgIC8vVE9ET1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRQb3NpdGlvbigpOiB2b2lkIHtcclxuICAgICAgICAvL1RPRE9cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaUu+WHu+S4gOS4quaIluWkmuS4qkFjdG9y55uu5qCHXHJcbiAgICAgKiAyMDIwLzMvNSDmlLvlh7vpgLvovpHlt7Lku47kuovku7bop6blj5HmlLnkuLrnm7TmjqXosIPnlKhcclxuICAgICAqIOWPkei1t+WSjOaOpeaUtuaUu+WHu+eahOmAu+i+keWdh+WwgeijheWcqEFjdG9y57G75LitXHJcbiAgICAgKiBAcGFyYW0gdmljdGltIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXR0YWNrKC4uLnZpY3RpbTpBY3RvcltdKTp2b2lke1xyXG4gICAgICAgIGxldCBkbWc6RGFtYWdlID0gdGhpcy5wcm9maWxlLmdlbmVyYXRlRGFtYWdlKHRoaXMpO1xyXG5cclxuICAgICAgICB2aWN0aW0uZm9yRWFjaChlbGU9PntcclxuICAgICAgICAgICAgdGhpcy5iZUF0dGFja2VkKGRtZy5jb3B5KCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOiiq+aUu+WHu1xyXG4gICAgICogQHBhcmFtIGRhbWFnZSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGJlQXR0YWNrZWQoZGFtYWdlOkRhbWFnZSk6dm9pZHtcclxuICAgICAgICAvL0B0b2RvXHJcbiAgICAgICAgLy/lh4/lsJHnlJ/lkb3lgLxcclxuICAgICAgICAvL+WPkeWHuuaUu+WHu+S6i+S7tlxyXG4gICAgICAgIC8v77yI5Y+v6IO977yJ5Y+R5Ye65q275Lqh5LqL5Lu2XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbn1cclxuXHJcblxyXG4iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4vQWN0b3JcIjtcclxuaW1wb3J0IHsgQWN0b3JUeXBlIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9Eb2RLZXlcIjtcclxuaW1wb3J0IHsgQWN0b3JTdGF0ZUlEIH0gZnJvbSBcIi4vU3RhdGUvQWN0b3JTdGF0ZUZzbVwiO1xyXG5pbXBvcnQgeyBDb2xpUmVjZWl2ZXIgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvQ29saU1lc3NhZ2VcIjtcclxuaW1wb3J0IFJob2Rlc0dhbWUgZnJvbSBcIi4uL1Job2Rlc0dhbWVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjdG9yTWdyIHtcclxuICAgIHB1YmxpYyBhY3RvcnM6IEFjdG9yW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5hY3RvcnMgPSBbXTtcclxuXHJcbiAgICAgICAgLy90ZXN0XHJcbiAgICAgICAgbGV0IGNyZWF0RW5lbXk6RnVuY3Rpb24gPSAodGltZTpudW1iZXJbXSk9PntcclxuICAgICAgICAgICAgdGltZS5mb3JFYWNoKGVsZT0+e1xyXG4gICAgICAgICAgICAgICAgTGF5YS50aW1lci5vbmNlKGVsZSwgdGhpcywgKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmFjdG9ycy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3RvcihBY3RvclR5cGUuTW9uc3Rlciwge30pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0b3JzW2luZGV4XS5zdGF0ZS5ydW5TdGF0ZShBY3RvclN0YXRlSUQuV2Fsayk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNyZWF0ZUFjdG9yKEFjdG9yVHlwZS5Nb25zdGVyLCB7fSk7XHJcbiAgICAgICAgdGhpcy5hY3RvcnNbMF0uc3RhdGUucnVuU3RhdGUoQWN0b3JTdGF0ZUlELldhbGspO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlQWN0b3IoQWN0b3JUeXBlLk9wZXJhdG9yLCB7fSk7XHJcbiAgICAgICAgdGhpcy5hY3RvcnNbMV0uc3RhdGUucnVuU3RhdGUoQWN0b3JTdGF0ZUlELkZpZ2h0KTtcclxuICAgICAgICBjcmVhdEVuZW15KFszMDAsNjAwLDkwMF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0KHJlczogYW55KSB7XHJcbiAgICAgICAgdGhpcy5faW5pdEVuZW15KHJlcyk7XHJcbiAgICAgICAgdGhpcy5faW5pdE9wcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXdha2UoKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYWN0b3IgPSB0aGlzLmFjdG9yc1tpXTtcclxuICAgICAgICAgICAgYWN0b3IuYXdha2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYWN0b3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhY3RvciA9IHRoaXMuYWN0b3JzW2ldO1xyXG4gICAgICAgICAgICBhY3Rvci51cGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgUmhvZGVzR2FtZS5JbnN0YW5jZS5iYXR0bGUubWFwTm9kZUNQVS5yZW5kZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYWN0b3IgPSB0aGlzLmFjdG9yc1tpXTtcclxuICAgICAgICAgICAgYWN0b3IucmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNyZWF0ZUFjdG9yKHR5cGU6IEFjdG9yVHlwZSwgcmVzOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBsZXQgYWN0b3IgPSBuZXcgQWN0b3IodHlwZSwgcmVzKTtcclxuICAgICAgICB0aGlzLmFjdG9ycy5wdXNoKGFjdG9yKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QWN0b3JCeUlEKElEOiBudW1iZXIpOiBBY3RvciB8IG51bGwge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hY3RvcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGFjdG9yID0gdGhpcy5hY3RvcnNbaV07XHJcbiAgICAgICAgICAgIGlmIChJRCA9PSBhY3Rvci5zeW1ib2wuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjdG9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2luaXRFbmVteShyZXM6IGFueSkge1xyXG4gICAgICAgIC8vVE9ETyB1c2UgbGV2ZWwgcmVzIGRhdGEgaW5pdCBlbmVteSBhY3RvcnNcclxuICAgICAgICAvL2VnLlxyXG4gICAgICAgIC8vbGV0IGVuZW15UmVzID0gcmVzWyd4eHh4eCddO1xyXG4gICAgICAgIC8vYWN0b3IgPSB0aGlzLmNyZWF0ZUFjdG9yKEFjdG9yVHlwZS5FbmVteSAsZW5lbXlSZXMpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIF9pbml0T3BydCgpIHtcclxuICAgICAgICAvL1RPRE8gdXNlIHByZSBjaG9vc2Ugb3BydCBsaXN0IHRvIGluaXQgc2VsZiBhY3RvcnNcclxuICAgICAgICAvL2xldCBhcnJheSA9IFJob2Rlc0dhbWVzLkluc3RhbmNlLmdhbWVkYXRhLmN1cnJlbnRGb3JtYXRpb247XHJcbiAgICAgICAgLy9mb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgLy8gICBsZXQgaWQgPSBhcnJheVtpXTtcclxuICAgICAgICAvLyAgIGxldCByZXMgPSBEb2RSZXNvdXJjZU1nci5JbnN0YW5jZS5nZXRDdXJyZW50T3BlcmFyb3JEYXRhQnlJRChpZCk7XHJcbiAgICAgICAgLy8gICBsZXQgYWN0b3IgPSB0aGlzLmNyZWF0ZUFjdG9yKEFjdG9yVHlwZS5PcGVyYXRvciwgcmVzKVxyXG4gICAgICAgIC8vfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBY3RvckJ1ZmZNZ3J7XHJcbiAgICBjb25zdHJ1Y3RvcihrZWVwZXI6QWN0b3IsIHJlczphbnkpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9BY3RvclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFjdG9yQ29zdHtcclxuICAgIGNvbnN0cnVjdG9yKGtlZXBlcjpBY3Rvcil7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQWN0b3JTa2lsbHtcclxuICAgIGNvbnN0cnVjdG9yKGtlZXBlcjpBY3RvciwgcmVzOmFueSl7XHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9BY3RvclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFuaW1hdGlvbntcclxuICAgIGNvbnN0cnVjdG9yKGtlZXBlcjpBY3RvciwgcmVzOmFueSl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBWZWMyLCBEb2RNYXRoIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Eb2RNYXRoXCI7XHJcbmltcG9ydCB7IEZpeFJlY3QgfSBmcm9tIFwiLi4vLi4vLi4vRml4L0ZpeFJlY3RcIjtcclxuaW1wb3J0IHsgQXJyYXlBbGdvIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Eb2REYXRhU3RydWN0dXJlXCI7XHJcbmltcG9ydCB7IEV2ZW50Q2VudHJlIH0gZnJvbSBcIi4uLy4uLy4uL0V2ZW50L0V2ZW50Q2VudHJlXCI7XHJcbmltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuaW1wb3J0IHsgQWN0b3JUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Eb2RLZXlcIjtcclxuXHJcbi8qKlxyXG4gKiDnorDmkp7mtojmga/lj5HluIPogIVcclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb2xpRW1pdHtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgR0xPQkFMX1VOSVRfV0lEVEg6bnVtYmVyID0gMTAwOy8v5YWo5bGA5Y2V5L2N5a69XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEdMT0JBTF9VTklUX0hFSUdIVDpudW1iZXIgPSAxMDA7Ly/lhajlsYDljZXkvY3pq5hcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgR0xPQkFMX1VOSVRfU1VCV0lEVEg6bnVtYmVyID0gOTA7Ly/lhajlsYDlhoXpg6jljZXkvY3lrr1cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgR0xPQkFMX1VOSVRfU1VCSEVJR0hUOm51bWJlciA9IDkwOy8v5YWo5bGA5YaF6YOo5Y2V5L2N6auYXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEdMT0JBTF9VTklUX1JTSElGVDpudW1iZXIgPSA1Oy8v5YWo5bGA5Y2V5L2N5ZCR5Y+z5YGP56e7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEdMT0JBTF9VTklUX0JTSElGVDpudW1iZXIgPSA1Oy8v5YWo5bGA5Y2V5L2N5ZCR5LiL5YGP56e7XHJcblxyXG4gICAgcHJpdmF0ZSBfcmVjOkZpeFJlY3Q7XHJcbiAgICBcclxuICAgIHByaXZhdGUgX3Bhc3RTZXQ6VmVjMltdID0gW107Ly/mraTmlrnlnZfkuIrkuIDmrKHlrZjlnKjkuo7lk6rkuIDngrlcclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuaJgOacieebruWJjeiHqui6q+aJgOWkhOeahOaWueagvFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGZpbmRJbnRlcnNlY3QoKTpWZWMyW117XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgW1xyXG4gICAgICAgICAgICBsZWZ0LFxyXG4gICAgICAgICAgICB0b3AsXHJcbiAgICAgICAgICAgIHJpZ2h0LFxyXG4gICAgICAgICAgICBib3R0b21cclxuICAgICAgICBdID0gW1xyXG4gICAgICAgICAgICBEb2RNYXRoLmludERpdmlzaW9uKHRoaXMuX3JlYy54LENvbGlFbWl0LkdMT0JBTF9VTklUX1dJRFRIKSxcclxuICAgICAgICAgICAgRG9kTWF0aC5pbnREaXZpc2lvbih0aGlzLl9yZWMueSxDb2xpRW1pdC5HTE9CQUxfVU5JVF9IRUlHSFQpLFxyXG4gICAgICAgICAgICBEb2RNYXRoLmludERpdmlzaW9uKHRoaXMuX3JlYy5yaWdodCxDb2xpRW1pdC5HTE9CQUxfVU5JVF9XSURUSCksXHJcbiAgICAgICAgICAgIERvZE1hdGguaW50RGl2aXNpb24odGhpcy5fcmVjLmJvdHRvbSxDb2xpRW1pdC5HTE9CQUxfVU5JVF9IRUlHSFQpXHJcbiAgICAgICAgXVxyXG5cclxuICAgICAgICBsZXQgcmVzdWx0OlZlYzJbXSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBob3JpOm51bWJlciA9IGxlZnQ7IGhvcmkgPD0gcmlnaHQ7IGhvcmkgKz0gMSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCB2ZXJ0aTpudW1iZXIgPSB0b3A7IHZlcnRpIDw9IGJvdHRvbTsgdmVydGkgKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobmV3IFZlYzIoaG9yaSwgdmVydGkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwb3MoeDpudW1iZXIsIHk6bnVtYmVyKTpDb2xpRW1pdHtcclxuICAgICAgICB0aGlzLl9yZWMueCA9IHg7XHJcbiAgICAgICAgdGhpcy5fcmVjLnkgPSB5O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwb3NCeVZlYyh2ZWM6VmVjMik6Q29saUVtaXR7XHJcbiAgICAgICAgdGhpcy5fcmVjLnggPSB2ZWMueDtcclxuICAgICAgICB0aGlzLl9yZWMueSA9IHZlYy55O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaXplKHdpZHRoOm51bWJlciwgaGVpZ2h0Om51bWJlcik6Q29saUVtaXR7XHJcbiAgICAgICAgdGhpcy5fcmVjLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5fcmVjLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXZlbnQocHVibGlzaGVyPzphbnksIGlkZW50aXR5OkFjdG9yVHlwZSA9IEFjdG9yVHlwZS5Ob25lKTp2b2lke1xyXG4gICAgICAgIGxldCBjdXJyZW50OlZlYzJbXSA9IHRoaXMuZmluZEludGVyc2VjdCgpOy8v5b2T5YmN56Kw5pKe6ZuG5ZCIXHJcbiAgICAgICAgLy90aGlzLl9wYXN0U2V0Ly/ljoblj7LnorDmkp7pm4blkIhcclxuICAgICAgICAvL+emu+W8gO+8muWkhOS6juWOhuWPsueisOaSnumbhuWQiO+8jOS9huS4jeWkhOS6juW9k+WJjeeisOaSnumbhuWQiOeahOWFg+e0oFxyXG4gICAgICAgIGxldCBsZWF2ZTpWZWMyW10gPSBBcnJheUFsZ28uZmluZENvbXBsZW1lbnRTZXQodGhpcy5fcGFzdFNldCwgY3VycmVudCkgYXMgVmVjMltdO1xyXG4gICAgICAgIC8v6L+b5YWl77ya5aSE5LqO5b2T5YmN56Kw5pKe6ZuG5ZCI77yM5L2G5LiN5aSE5LqO5Y6G5Y+y56Kw5pKe6ZuG5ZCI55qE5YWD57SgXHJcbiAgICAgICAgbGV0IGVudHJlOlZlYzJbXSA9IEFycmF5QWxnby5maW5kQ29tcGxlbWVudFNldChjdXJyZW50LCB0aGlzLl9wYXN0U2V0KSBhcyBWZWMyW107XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/lj5HluIPkuovku7ZcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuemu+W8gFwiKTtcclxuICAgICAgICBsZWF2ZS5mb3JFYWNoKGVsZT0+e1xyXG4gICAgICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5ldmVudChFdmVudENlbnRyZS5FVHlwZS5MRUFWRShlbGUsIGAke2lkZW50aXR5fWApLCBwdWJsaXNoZXIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIui/m+WFpVwiKTtcclxuICAgICAgICBlbnRyZS5mb3JFYWNoKGVsZT0+e1xyXG4gICAgICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5ldmVudChFdmVudENlbnRyZS5FVHlwZS5FTlRSRShlbGUsIGAke2lkZW50aXR5fWApLCBwdWJsaXNoZXIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLl9wYXN0U2V0ID0gY3VycmVudDsvL+abtOaWsOWOhuWPsueisOaSnumbhuWQiOS4uuW9k+WJjeeisOaSnumbhuWQiFxyXG4gICAgfTtcclxuXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog5Y+R5biD56a75byA5b2T5YmN5a2Y5Zyo55qE5omA5pyJ5Z2Q5qCH55qE5LqL5Lu2XHJcbiAgICAgKiBAcGFyYW0gcHVibGlzaGVyIFxyXG4gICAgICogQHBhcmFtIGlkZW50aXR5IFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZXZlbnRMZWF2ZUFsbChwdWJsaXNoZXI/OmFueSwgaWRlbnRpdHk6QWN0b3JUeXBlID0gQWN0b3JUeXBlLk5vbmUpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fcGFzdFNldC5mb3JFYWNoKHZlYz0+e1xyXG4gICAgICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5ldmVudChFdmVudENlbnRyZS5FVHlwZS5MRUFWRSh2ZWMsIGAke2lkZW50aXR5fWApLCBwdWJsaXNoZXIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHg6bnVtYmVyLHk6bnVtYmVyLHdpZHRoOm51bWJlciA9IENvbGlFbWl0LkdMT0JBTF9VTklUX1NVQldJRFRILCBoZWlnaHQ6bnVtYmVyID0gQ29saUVtaXQuR0xPQkFMX1VOSVRfU1VCSEVJR0hUKXtcclxuICAgICAgICB0aGlzLl9yZWMgPSBuZXcgRml4UmVjdCh4LHksd2lkdGgsaGVpZ2h0KTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIOeisOaSnua2iOaBr+aOpeaUtuiAhVxyXG4gKiDlj6/ku6XpgJrov4dzZXREZXRlY3Rpb27nm5HmjqfmjIflrprngrnvvIzmjIflrppJZGVudGl0eeeahOi/m+WFpeWSjOemu+W8gOS6i+S7tlxyXG4gKiDlj6/ku6XpgJrov4dvZmZEZXRlY3Rpb27mkqTplIDmjIflrprngrnnmoTnm5HmjqdcclxuICog6L+Z5Liq5LiN6IO955u05o6l55So77yM6KaB57un5om/5LiA5bGC5oqKb25MZWF2ZeWSjG9uRW50cmXlh73mlbDph43lhpnkuYvlkI7miY3og73nlKhcclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDb2xpUmVjZWl2ZXJ7XHJcbiAgICAvKlxyXG4gICAg6L+Z6YeM55qE5Lu75L2V55+p6Zi16YO95Y+v5Lul55So6ZSu5YC85a+55pu/5Luj44CCeOS4jnnkuKTkuKrlj4LmlbDlj6/ku6XnlJ/miJDmsLjkuI3ph43lpI3nmoTplK5cclxuXHJcbiAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZGV0ZWN0aW9uTWF0cml4OmJvb2xlYW5bXVtdID0gW107Ly/orrDlvZXlk6rkuKrlnZDmoIflt7Looqvnm5HmjqdcclxuICAgIHByaXZhdGUgZGV0ZWN0aW9uRXhpc3QocG9zaXRpb246VmVjMik6Ym9vbGVhbnsvL+afpeeci+afkOS4quWdkOagh+aYr+WQpuW3suiiq+ebkeaOp1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kZXRlY3Rpb25NYXRyaXhbcG9zaXRpb24ueF1bcG9zaXRpb24ueV07XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIF9jYW5jZWxsYXRpb25NYXRyaXg6RnVuY3Rpb25bXVtdW10gPSBbXTsvL+WtmOaUvueUqOS6juWPlua2iOebkeWQrOeahOWHveaVsFxyXG4gICAgcHJpdmF0ZSBfd2lkdGg6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfaGVpZ2h0Om51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih3aWR0aDpudW1iZXIsIGhlaWdodDpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuX3dpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgICAgICBmb3IgKGxldCB3ID0gMDsgdyA8IHdpZHRoOyB3ICs9IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGV0ZWN0aW9uTWF0cml4W3ddID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuX2NhbmNlbGxhdGlvbk1hdHJpeFt3XSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBoID0gMDsgaCA8IGhlaWdodDsgaCArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kZXRlY3Rpb25NYXRyaXhbd11baF0gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NhbmNlbGxhdGlvbk1hdHJpeFt3XVtoXSA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5q2k5pa55rOV5o+Q5L6b57uZ5q2k57G755qE5a2Q57G76YeN5YaZXHJcbiAgICAgKiDmr4/lvZPmraTlrp7kvovnm5HmjqfnmoTov5vlhaXnorDmkp7kuovku7blnKjlt7LlkK/nlKjnm5HlkKznmoTlnZDmoIflj5HnlJ/ml7bvvIzmraTlh73mlbDlsIbooqvosIPnlKhcclxuICAgICAqIEBwYXJhbSBhY3RvciBcclxuICAgICAqIEBwYXJhbSBwb3NpdGlvblxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3Qgb25FbnRyZShhY3RvcjpBY3RvciwgcG9zaXRpb246VmVjMik6dm9pZFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5q2k5pa55rOV5o+Q5L6b57uZ5q2k57G755qE5a2Q57G76YeN5YaZXHJcbiAgICAgKiDmr4/lvZPmraTlrp7kvovnm5HmjqfnmoTov5vlhaXnorDmkp7kuovku7blnKjlt7LlkK/nlKjnm5HlkKznmoTlnZDmoIflj5HnlJ/ml7bvvIzmraTlh73mlbDlsIbooqvosIPnlKhcclxuICAgICAqIEBwYXJhbSBhY3RvciBcclxuICAgICAqIEBwYXJhbSBwb3NpdGlvblxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3Qgb25MZWF2ZShhY3RvcjpBY3RvciwgcG9zaXRpb246VmVjMik6dm9pZFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Zyo5oyH5a6a5Z2Q5qCH5LiK6K6+572u55uR5ZCs56Kw5pKe5LqL5Lu2XHJcbiAgICAgKiBpZGVudGl0eeWPr+S7peWcqEFjdG9yLklkZW50aXR56YeM6YCJ5oupXHJcbiAgICAgKiDpgqPmiJHkuLrku4DkuYjkuI3lhpllbnVt5ZGi4oCm4oCmXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXREZXRlY3Rpb24ocG9zaXRpb246VmVjMiwgaWRlbnRpdHk6c3RyaW5nKTp2b2lke1xyXG4gICAgICAgIGlmICh0aGlzLmRldGVjdGlvbkV4aXN0KHBvc2l0aW9uKSkgey8v5aaC5p6c5Zyo5q2k5aSE5bey5a2Y5Zyo55uR5o6n77yM5YiZ5Y+W5raI55uR5o6nXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2V0RGV0ZWN0aW9u5Ye95pWw5LiN6IO95Zyo5ZCM5LiA5Liq5Z2Q5qCH5aSa5qyh55uR5o6n77yM6K+35p+l55yLQ29saVJlY2lldmVy57G7XCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwb3NpdGlvbi54ID49IHRoaXMuX3dpZHRoIHx8IHBvc2l0aW9uLnggPCAwIHx8XHJcbiAgICAgICAgICAgIHBvc2l0aW9uLnkgPiB0aGlzLl9oZWlnaHQgfHwgcG9zaXRpb24ueSA8IDApIHsvL+WmguaenOebkeaOp+S9jee9rui2heWHuui+ueeVjO+8jOWImeWPlua2iOebkeaOp1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcG9zaXRpb24gPSBwb3NpdGlvbi5jbG9uZSgpOy8v5aSN5Yi25L2N572u5a+56LGh5Lul6Ziy5q2i5Lyg5Z2A6Zeu6aKYXHJcbiAgICAgICAgbGV0IGRldGVjdG9yOkZ1bmN0aW9uW10gPSBbXTsvL+i/meaYr+ebkeWQrOWHveaVsO+8jOWtmOi1t+adpeWHhuWkh+aSpOmZpOebkeWQrOaXtueUqFxyXG4gICAgICAgIC8v6K6+572u55uR5ZCs5LqL5Lu2XHJcbiAgICAgICAgICAgIGRldGVjdG9yWzBdID0gKGFjdG9yOkFjdG9yKT0+ey8v6L+b5YWl5LqL5Lu25Ye95pWwXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uRW50cmUoYWN0b3IsIHBvc2l0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZXRlY3RvclsxXSA9IChhY3RvcjpBY3Rvcik9PnsvL+emu+W8gOS6i+S7tuWHveaVsFxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkxlYXZlKGFjdG9yLCBwb3NpdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLm9uKEV2ZW50Q2VudHJlLkVUeXBlLkVOVFJFKHBvc2l0aW9uLCBpZGVudGl0eSksIHRoaXMsIGRldGVjdG9yWzBdKTtcclxuICAgICAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2Uub24oRXZlbnRDZW50cmUuRVR5cGUuTEVBVkUocG9zaXRpb24sIGlkZW50aXR5KSwgdGhpcywgZGV0ZWN0b3JbMV0pO1xyXG4gICAgICAgIC8v6K6+572u55uR5ZCs5LqL5Lu2XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fY2FuY2VsbGF0aW9uTWF0cml4W3Bvc2l0aW9uLnhdW3Bvc2l0aW9uLnldLnB1c2goKCk9PnsvL+WwhuebkeWQrOenu+mZpOWHveaVsOWtmOWFpeWHveaVsOefqemYtVxyXG4gICAgICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5vZmYoRXZlbnRDZW50cmUuRVR5cGUuRU5UUkUocG9zaXRpb24sIGlkZW50aXR5KSwgdGhpcywgZGV0ZWN0b3JbMF0pO1xyXG4gICAgICAgIH0sICgpPT57XHJcbiAgICAgICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLm9mZihFdmVudENlbnRyZS5FVHlwZS5MRUFWRShwb3NpdGlvbiwgaWRlbnRpdHkpLCB0aGlzLCBkZXRlY3RvclsxXSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2RldGVjdGlvbk1hdHJpeFtwb3NpdGlvbi54XVtwb3NpdGlvbi55XSA9IHRydWU7Ly/lsIbmraTlnZDmoIfnmoTnirbmgIHorr7kuLrigJzlt7Looqvnm5HlkKzigJ1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOenu+mZpOaMh+WumuWdkOagh+eahOeisOaSnuS6i+S7tuebkeWQrFxyXG4gICAgICogQHBhcmFtIHBvc2l0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvZmZEZXRlY3Rpb24ocG9zaXRpb246VmVjMik6dm9pZHtcclxuICAgICAgICB0aGlzLl9jYW5jZWxsYXRpb25NYXRyaXhbcG9zaXRpb24ueF1bcG9zaXRpb24ueV0uZm9yRWFjaCgoZWxlKT0+ey8v5omn6KGM5q+P5LiA5Liq6aKE5a2Y55qE5Ye95pWwXHJcbiAgICAgICAgICAgIGVsZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2NhbmNlbGxhdGlvbk1hdHJpeFtwb3NpdGlvbi54XVtwb3NpdGlvbi55XSA9IFtdOy8v5Yig6Zmk5q2k5aSE55qE6aKE5a2Y5Ye95pWwXHJcbiAgICAgICAgdGhpcy5fZGV0ZWN0aW9uTWF0cml4W3Bvc2l0aW9uLnhdW3Bvc2l0aW9uLnldID0gZmFsc2U7Ly/lsIbmraTlnZDmoIforr7kuLrmnKrnm5HlkKxcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcblxyXG5leHBvcnQgZW51bSBEYW1hZ2VUeXBle1xyXG4gICAgUFlTSUNBTCxcclxuICAgIE1BR0lDQUwsXHJcbiAgICBUUlVFLFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRGFtYWdle1xyXG5cclxuICAgIHB1YmxpYyBzb3VyY2U6QWN0b3IgPSBudWxsOy8v5Lyk5a6z5p2l5rqQXHJcbiAgICBwdWJsaWMgdmFsdWU6bnVtYmVyID0gMDsvL+aUu+WHu+WKm1xyXG4gICAgcHVibGljIHR5cGU6RGFtYWdlVHlwZS8v5Lyk5a6z57G75Z6LXHJcbiAgICBwdWJsaWMgcHJpbWFyeTpib29sZWFuID0gdHJ1ZTsvL+aYr+WQpuS4uumdnumXtOaOpeS8pOWus++8iOmXtOaOpeS8pOWus+S4jeS8muinpuWPkeaYn+eGiuOAgeW5tOeahOWPjeeUsuS5i+exu+eahOaViOaenO+8iVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNvdXJjZTpBY3RvciwgdmFsdWU6bnVtYmVyLCB0eXBlOkRhbWFnZVR5cGUpe1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29weSgpOkRhbWFnZXtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IERhbWFnZSh0aGlzLnNvdXJjZSwgdGhpcy52YWx1ZSwgdGhpcy50eXBlKTtcclxuICAgICAgICByZXN1bHQudHlwZSA9IHRoaXMudHlwZTtcclxuICAgICAgICByZXN1bHQucHJpbWFyeSA9IHRoaXMucHJpbWFyeTtcclxuICAgICAgICByZXN1bHQuc291cmNlID0gdGhpcy5zb3VyY2U7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IERhbWFnZSwgRGFtYWdlVHlwZSB9IGZyb20gXCIuL0RhbWFnZVwiO1xyXG5pbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcbmltcG9ydCB7IEFjdG9yVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vRG9kS2V5XCI7XHJcbmltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0RvZE1hdGhcIjtcclxuXHJcblxyXG4vKipcclxuICogUHJvZmlsZeexu+aYr+WCqOWtmOWNleS9jeWfuuacrOaVsOaNru+8iOWmguaUu+WHu+WKm+OAgemYsuW+oeWKm+etie+8ieeahOexu1xyXG4gKiDlroPov5jmj5DkvpvkuIDliIfnlKjkuo7ojrflj5ZBY3RvcuS/oeaBr+eahOaOpeWPo++8iOWmguaYr+WQpuiDveWkn+ihjOWKqOOAgeaYr+WQpuiDveWkn+mYu+aMoe+8iVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFByb2ZpbGUge1xyXG4gICAgcHVibGljIG5hbWU6IFN0cmluZyA9IFwiQ2hhbmRsZXIgQmluZ1wiO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGtlZXBlcjpBY3RvcjtcclxuXHJcbiAgICBwcml2YXRlIF9wcmVwVGltZTogbnVtYmVyID0gMTAwOy8v5YmN5pGH5pe26Ze0XHJcbiAgICBwcml2YXRlIF9hZnRlclRpbWU6IG51bWJlciA9IDEwMDsvL+WQjuaRh+aXtumXtFxyXG4gICAgcHVibGljIGludmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlOy8v5piv5ZCm6ZqQ5b2iXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkvKTlrrPorqHnrpfnm7jlhbPnmoTkv67mlLnlkozorr/pl67mjqXlj6NcclxuICAgICAqIOS9nOiAhe+8muiRsVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXR0YWNrUG93ZXI6IG51bWJlciA9IDEwMDsvL+aUu+WHu+WKm1xyXG4gICAgcHVibGljIGF0a1NjYWxlOm51bWJlciA9IDE7Ly/mlLvlh7vlgI3njodcclxuICAgIHB1YmxpYyBhdGtCdWZmOm51bWJlciA9IDE7Ly/mlLvlh7vnmb7liIbmr5Tmj5DljYdcclxuICAgIHB1YmxpYyBhcm1vdXI6bnVtYmVyID0gNTA7Ly/niannkIbpmLLlvqFcclxuICAgIHB1YmxpYyBtYWdpY0FybW91cjpudW1iZXIgPSAwOy8v5rOV5pyv5oqX5oCnXHJcbiAgICBwdWJsaWMgZG1nVHlwZTpEYW1hZ2VUeXBlID0gRGFtYWdlVHlwZS5QWVNJQ0FMOy8v5Lyk5a6z57G75Z6LXHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGtlZXBlcjpBY3RvciwgcmVzOmFueSl7XHJcbiAgICAgICAgdGhpcy5rZWVwZXIgPSBrZWVwZXI7XHJcbiAgICAgICAgLy90b2RvOiBhYm91dCByZXNcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Tm9kZVBvcygpOlZlYzJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMua2VlcGVyLnRyYW5zZm9ybS5wb3MuZ2V0Tm9kZVBvcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Lyg5YWl5LiA5LiqQWN0b3LvvIzov5Tlm57kvKTlrrPlr7nosaFcclxuICAgICAqIOato+WcqOiAg+iZkeW6n+W8g+atpOmhuVxyXG4gICAgICogQHBhcmFtIHNvdXJjZSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdlbmVyYXRlRGFtYWdlKHNvdXJjZTpBY3Rvcik6RGFtYWdle1xyXG4gICAgICAgIHJldHVybiBuZXcgRGFtYWdlKHNvdXJjZSwgdGhpcy5hdHRhY2tQb3dlcip0aGlzLmF0a1NjYWxlKnRoaXMuYXRrQnVmZiwgdGhpcy5kbWdUeXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGl0UG9pbnQ6IG51bWJlciA9IDEwOy8v55Sf5ZG95YC8XHJcbiAgICBwdWJsaWMgbWF4SGl0UG9pbnQ6IG51bWJlciA9IDEwOy8v5pyA6auY55Sf5ZG95YC8XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBieSBYV1ZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGhhdGVMZXZlbDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBhdHRhY2tSYW5nZVJhZGl1czogbnVtYmVyO1xyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHByZXBUaW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ByZXBUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgYWZ0ZXJUaW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FmdGVyVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGJsb2NrYWJsZSgpOiBib29sZWFue1xyXG4gICAgICAgIC8vdG9kbzog5Yik5pat5piv5ZCm5Y+v5Lul6KKr6Zi75oyhXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICBcclxufVxyXG5cclxuLyoqXHJcbiAqIOaYr+WQpumcgOimgeWcqHByb2ZpbGXkuK3lsIbkuI3lkIznmoTmlbDlgLzliIbnsbvvvJ9cclxuICpcclxuICovIiwiaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9BY3RvclwiO1xyXG5pbXBvcnQgeyBEb2RNYXRoLCBWZWMyIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Eb2RNYXRoXCI7XHJcbmltcG9ydCB7IENvbGlFbWl0IH0gZnJvbSBcIi4vQ29saU1lc3NhZ2VcIjtcclxuXHJcbi8qKlxyXG4gKiDlr7nkuIDkuKrljZXkvY3nmoTlh6DkvZXnirbmgIHnmoTmj4/ov7BcclxuICovXHJcbmV4cG9ydCBjbGFzcyBUcmFuc2Zvcm17XHJcbiAgICBwdWJsaWMgcG9zOlBvcyA9IG5ldyBQb3MoKTtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3Ioa2VlcGVyOkFjdG9yKXtcclxuICAgICAgICBcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgUG9ze1xyXG4gICAgLy8gcHVibGljIGF1dG9Td2l0Y2hUYXJnZXQ6Ym9vbGVhbiA9IHRydWU7XHJcbiAgICBwdWJsaWMgZGF0YTpWZWMyID0gbmV3IFZlYzIoMCwwKTsvL+S9jee9rlxyXG5cclxuXHJcbiAgICBcclxuICAgIHB1YmxpYyB0YXJnZXQ6VmVjMiA9IG5ldyBWZWMyKDAsMCk7Ly/nm67moIdcclxuICAgIHB1YmxpYyBzcGVlZDpudW1iZXIgPSA1Oy8v6YCf5bqmXHJcbiAgICBwdWJsaWMgYXBwcm9hY2g6bnVtYmVyID0gMDsvL+mAvOi/keasoeaVsFxyXG4gICAgcHVibGljIHZlY1NwZWVkOlZlYzIgPSBuZXcgVmVjMigwLDApOy8v5YiG6YeP6YCf5bqmXHJcbiAgICBwcml2YXRlIF9hcnJpdmVkOmJvb2xlYW4gPSB0cnVlOy8v5bey5Yiw6L6+55uu55qE5ZywKOavj+asoeiuvue9ruaWsOebrueahOWcsOaXtuiuvuS4umZhbHNlKVxyXG4gICAgcHVibGljIGdldCBhcnJpdmVkKCk6Ym9vbGVhbntyZXR1cm4gdGhpcy5fYXJyaXZlZDt9Ly/ojrflj5bmmK/lkKblt7LliLDovr7nmoTkv6Hmga9cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruebrueahOWcsOW5tumHjeiuvuWIhumHj+mAn+W6plxyXG4gICAgICogQHBhcmFtIHRhcmdldCBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFRhcmdldCh0YXJnZXQ6VmVjMik6dm9pZHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICB0aGlzLmFpbSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u55u057q/6YCf5bqm5bm26YeN6K6+5YiG6YeP6YCf5bqmXHJcbiAgICAgKiBAcGFyYW0gc3BlZWQgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRTcGVlZChzcGVlZDpudW1iZXIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xyXG4gICAgICAgIHRoaXMuYWltKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorqHnrpfnp7vliqjlj4LmlbAs5bm25bCGX2Fycml2ZWTorr7kuLpmYWxzZVxyXG4gICAgICog5bCG5Lya6YeN6K6+5YiG6YeP6YCf5bqm5ZKM6YC86L+R5qyh5pWwXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWltKCk6dm9pZHtcclxuICAgICAgICB0aGlzLnZlY1NwZWVkID0gRG9kTWF0aC5tb3ZlVG9Db21wb25lbnQodGhpcy5kYXRhLHRoaXMudGFyZ2V0LHRoaXMuc3BlZWQpO1xyXG4gICAgICAgIHRoaXMuYXBwcm9hY2ggPSB0aGlzLmRhdGEuZGlzdGFuY2VUbyh0aGlzLnRhcmdldCkgLyB0aGlzLnNwZWVkO1xyXG4gICAgICAgIHRoaXMuX2Fycml2ZWQgPSBmYWxzZTtcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWQkeebruagh+eCueenu+WKqOS4gOasoVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbW92ZSgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5hcHByb2FjaCAtPSAxO1xyXG4gICAgICAgIGlmICh0aGlzLmFwcHJvYWNoIDw9IDApIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLnggPSB0aGlzLnRhcmdldC54O1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEueSA9IHRoaXMudGFyZ2V0Lnk7XHJcbiAgICAgICAgICAgIHRoaXMuX2Fycml2ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGF0YS54ID0gdGhpcy5kYXRhLnggKyB0aGlzLnZlY1NwZWVkLng7XHJcbiAgICAgICAgdGhpcy5kYXRhLnkgPSB0aGlzLmRhdGEueSArIHRoaXMudmVjU3BlZWQueTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldE5vZGVQb3MoKTpWZWMye1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjMihNYXRoLmZsb29yKHRoaXMuZGF0YS54IC8gQ29saUVtaXQuR0xPQkFMX1VOSVRfV0lEVEgpLCBNYXRoLmZsb29yKHRoaXMuZGF0YS55IC8gQ29saUVtaXQuR0xPQkFMX1VOSVRfSEVJR0hUKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcbmltcG9ydCBQZXJmb3JtYW5jZUNlbnRyZSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0dyYXBoaWNzL1BlcmZvcm1hbmNlX01vZHVsZS9QZXJmb3JtYW5jZUNlbnRyZVwiO1xyXG5pbXBvcnQgeyBWZWMyIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Eb2RNYXRoXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVW5pdFJlbmRlcntcclxuXHJcbiAgICBwcml2YXRlIF9rZWVwZXI6QWN0b3I7XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGtlZXBlcjpBY3Rvcil7XHJcbiAgICAgICAgdGhpcy5fa2VlcGVyID0ga2VlcGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZXBsb3koKTp2b2lke1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRGVwbG95XCIpO1xyXG4gICAgICAgIFBlcmZvcm1hbmNlQ2VudHJlLmluc3RhbmNlLmRpc3BsYXlBY3Rvcih0aGlzLl9rZWVwZXIsIHRoaXMuX2tlZXBlci50cmFuc2Zvcm0ucG9zLmRhdGEsIG5ldyBWZWMyKDUwLDUwKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1vdmUodmVjOlZlYzIpOnZvaWR7XHJcbiAgICAgICAgUGVyZm9ybWFuY2VDZW50cmUuaW5zdGFuY2UubW92ZSh0aGlzLl9rZWVwZXIsIHZlYyk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4vQWN0b3JcIjtcclxuaW1wb3J0IHsgVmVjMiB9IGZyb20gXCIuLi8uLi9Db21tb24vRG9kTWF0aFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm91dGUge1xyXG5cclxuICAgIHByaXZhdGUgX3BhdGg6VmVjMltdID0gVmVjMi5saXN0RnJvbUxpc3QoW1xyXG4gICAgICAgIFs1MDAsNTAwXSxcclxuICAgICAgICBbMCwwXSxcclxuICAgICAgICBbNTAwLDBdLFxyXG4gICAgICAgIFswLDUwMF1cclxuICAgIF0pO1xyXG4gICAgcHJpdmF0ZSBfdGFyQ291bnQ6bnVtYmVyID0gLTE7Ly/nm67liY3mjIflkJHnmoTnm67moIdcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihrZWVwZXI6QWN0b3IsIHJlczphbnkpe1xyXG4gICAgICAgIC8vdG9kbzog5qC55o2ucmVz6I635Y+W5bqU6LWw55qE6Lev57q/XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGN1cnJlbnRUYXJnZXQoKTpWZWMye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXRoW3RoaXMuX3RhckNvdW50XTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmV4dCgpOmJvb2xlYW57XHJcbiAgICAgICAgaWYgKHRoaXMuX3RhckNvdW50IDwgdGhpcy5fcGF0aC5sZW5ndGggLSAxKSB7Ly/ov5jmnInkuIvkuIDpoblcclxuICAgICAgICAgICAgdGhpcy5fdGFyQ291bnQgKz0gMTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHsvL+ayoeacieS4i+S4gOmhuVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtLVlBhaXJ9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vRG9kRGF0YVN0cnVjdHVyZVwiO1xyXG5pbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcbmltcG9ydCB7RXZlbnRDZW50cmV9IGZyb20gXCIuLi8uLi8uLi9FdmVudC9FdmVudENlbnRyZVwiO1xyXG5pbXBvcnQgeyBTZWVrZXIgfSBmcm9tIFwiLi9BY3RvclNlZWtlclwiO1xyXG5pbXBvcnQgRml4VGltZSBmcm9tIFwiLi4vLi4vLi4vRml4L0ZpeFRpbWVcIjtcclxuaW1wb3J0IHsgTWFwTm9kZVNlZWtlciB9IGZyb20gXCIuL01hcE5vZGVTZWVrZXJcIjtcclxuaW1wb3J0IHsgVmVjMiB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vRG9kTWF0aFwiO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBieSBYV1ZcclxuICogXHJcbiAqIOiRsSDkv67mlLnkuo4gMy8xOFxyXG4gKiAgICAgIOWwhlNlZWtlcuaMquWFpeaUu+WHu+eKtuaAgeacuuWGhe+8jOS4jeeUsUFjdG9y5oyB5pyJXHJcbiAqICAgICAg5LiN5ZCM55qE5pS75Ye76IyD5Zu055SxU2Vla2Vy5pu/5o2i5p2l5a6e546wXHJcbiAqICAgICAg5LiN5ZCM55qE5pS75Ye76YC76L6R77yI6IyD5Zu0L+WNleS9k++8ieeUseS/ruaUuXByb2ZpbGXkuK3nmoTlj4LmlbDlrp7njrBcclxuICogICAgICBBdGtTdGF0ZU1hY2hpbmXotJ/otKPlr7nlpJbmj5DkvpvmiYDmnInkv67mlLkv6K6/6Zeu5o6l5Y+jXHJcbiAqICAgICAg5LuN6ZyA5a+55q2k6L+b6KGM6L+b5LiA5q2l6KeE5YiS77yI5Y2V5L2TL+WkmuS9ky/nvqTkvZPmlLvlh7vpgLvovpHmmK/ku4XnlLHkuIDkuKrlj4LmlbDlrp7njrDvvIzov5jmmK/nlLHlpJrmgIHlrp7njrDvvIlcclxuICogICAgICAvL3RvZG865pe26Ze057Sv5Yqg6YC76L6R5pS55Y+YXHJcbiAqIFxyXG4gKi9cclxuXHJcbmVudW0gU3RhdGVUeXBlIHtcclxuICAgIFdBSVQgPSBcIldBSVRcIixcclxuICAgIFBSRVBBUkUgPSBcIlBSRVBBUkVcIixcclxuICAgIEFGVEVSX0FUSyA9IFwiQUZURVJfQVRLXCJcclxufVxyXG5cclxuaW50ZXJmYWNlIFN0YXRlIHtcclxuICAgIG5hbWUoKTpzdHJpbmdcclxuXHJcbiAgICBleGVjdXRlKG1hY2hpbmU6IEF0a1N0YXRlTWFjaGluZSk6IHZvaWRcclxuXHJcbiAgICByZXNldCgpOiB2b2lkXHJcbn1cclxuXHJcbmFic3RyYWN0IGNsYXNzIEJhc2VTdGF0ZSBpbXBsZW1lbnRzIFN0YXRlIHtcclxuICAgIHB1YmxpYyBuYW1lKCk6c3RyaW5ne3JldHVybiBcIkJhc2VTdGF0ZVwiO31cclxuXHJcbiAgICBwcm90ZWN0ZWQgdGltZTogbnVtYmVyID0gMDsvL+aXtumXtOe0r+WKoOmAu+i+keaUueWPmFxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpIHtcclxuICAgICAgICB0aGlzLnRpbWUgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGFic3RyYWN0IGV4ZWN1dGUobWFjaGluZTogQXRrU3RhdGVNYWNoaW5lKTogdm9pZDtcclxuXHJcbn1cclxuXHJcbmNsYXNzIFdhaXQgZXh0ZW5kcyBCYXNlU3RhdGUge1xyXG4gICAgcHVibGljIG5hbWUoKTpzdHJpbmd7cmV0dXJuIFwiV2FpdFN0YXRlXCI7fVxyXG5cclxuICAgIHB1YmxpYyBleGVjdXRlKG1hY2hpbmU6IEF0a1N0YXRlTWFjaGluZSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGZvY3VzID0gbWFjaGluZS5zZWVrZXIuZ2V0Rm9jdXMoKTtcclxuICAgICAgICBpZiAoZm9jdXMgIT0gbnVsbCAmJiBmb2N1cyAhPSB1bmRlZmluZWQpIHsvL+WmguaenOiDveWkn+aJvuWIsOaVjOS6ulxyXG4gICAgICAgICAgICBtYWNoaW5lLmNoYW5nZVN0YXRlKFN0YXRlVHlwZS5QUkVQQVJFKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJGb3VuZCBFbmVteVwiKTtcclxuICAgICAgICB9IGVsc2Ugey8v5aaC5p6c5om+5LiN5Yiw5pWM5Lq6XHJcbiAgICAgICAgICAgIC8vdG9kbzogbm9uZVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WmguaenHNlZWtlcuS4reWtmOWcqOaVjOS6uu+8jHJlc2V0IFByZXBhcmXlubbot7PovazliLBQcmVwYXJl6Zi25q61XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5jbGFzcyBQcmVwYXJlIGV4dGVuZHMgQmFzZVN0YXRlIHtcclxuICAgIHB1YmxpYyBuYW1lKCk6c3RyaW5ne3JldHVybiBcIlByZXBhcmVTdGF0ZVwiO31cclxuXHJcbiAgICBwdWJsaWMgZXhlY3V0ZShtYWNoaW5lOiBBdGtTdGF0ZU1hY2hpbmUpOiB2b2lkIHtcclxuICAgIFxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICAvL+WIpOaWreaYr+WQpumcgOimgemHjeaWsOmAieaLqeebruagh+W5tumHjee9ruWJjeaRh1xyXG4gICAgICAgIGxldCBzZWVrZXIgPSBtYWNoaW5lLnNlZWtlcjtcclxuICAgICAgICBsZXQgYWN0b3IgPSBtYWNoaW5lLmtlZXBlcjtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhzZWVrZXIuZm9jdXNDaGFuZ2VkKTtcclxuICAgICAgICBpZiAoc2Vla2VyLmZvY3VzQ2hhbmdlZCgpKSB7Ly/lvZPliY3nm67moIflt7Lkv67mlLlcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJwcmVwYXJlOkZvY3VzY2hhbmdlZFwiKTtcclxuICAgICAgICAgICAgbWFjaGluZS5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIGlmIChzZWVrZXIuZ2V0Rm9jdXMoKSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBtYWNoaW5lLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1hY2hpbmUuY2hhbmdlU3RhdGUoU3RhdGVUeXBlLldBSVQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/lvZPliY3nm67moIfmnKrkv67mlLlcclxuICAgICAgICBtYWNoaW5lLnRpYygpO1xyXG4gICAgICAgIGlmIChtYWNoaW5lLnJlYWR5KSB7XHJcbiAgICAgICAgICAgIC8vdG9kbzog6L+b6KGM5pS75Ye7KOi/m+ihjHByb2ZpbGXlj4LmlbDliKTmlq0pXHJcbiAgICAgICAgICAgIG1hY2hpbmUua2VlcGVyLmF0dGFjayhzZWVrZXIuZ2V0Rm9jdXMoKSk7XHJcbiAgICAgICAgICAgIG1hY2hpbmUuY2hhbmdlU3RhdGUoU3RhdGVUeXBlLkFGVEVSX0FUSyk7Ly/ovazmjaLliLDlkI7mkYdcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBdHRhY2sgSGFwcGVuZWRcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQWZ0ZXJBdGsgZXh0ZW5kcyBCYXNlU3RhdGUge1xyXG4gICAgcHVibGljIG5hbWUoKTpzdHJpbmd7cmV0dXJuIFwiQWZ0ZXJTdGF0ZVwiO31cclxuICAgIHB1YmxpYyBleGVjdXRlKG1hY2hpbmU6IEF0a1N0YXRlTWFjaGluZSk6IHZvaWQge1xyXG4gICAgICAgIG1hY2hpbmUudGljKCk7XHJcbiAgICAgICAgaWYgKG1hY2hpbmUuY29vbENvbXBsZXRlKSB7XHJcbiAgICAgICAgICAgIG1hY2hpbmUucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICBpZiAobWFjaGluZS5zZWVrZXIuZ2V0Rm9jdXMoKSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBtYWNoaW5lLmNoYW5nZVN0YXRlKFN0YXRlVHlwZS5QUkVQQVJFKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1hY2hpbmUuY2hhbmdlU3RhdGUoU3RhdGVUeXBlLldBSVQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQXR0YWNrIHJlY292ZXJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICog54q25oCB5py657G7XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQXRrU3RhdGVNYWNoaW5lIHtcclxuICAgIC8qXHJcbiAgICAqIOaJgOWxnkFjdG9yXHJcbiAgICAqICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkga2VlcGVyOiBBY3RvcjtcclxuICAgIC8qKlxyXG4gICAgICog5b2T5YmN54q25oCBXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3VyU3RhdGU6IFN0YXRlO1xyXG4gICAgLyoqXHJcbiAgICAgKiDlj6/kvb/nlKjnmoTnirbmgIHliJfooahcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0ZUxpc3Q6IEtWUGFpcjxTdGF0ZT4gPSBuZXcgS1ZQYWlyPFN0YXRlPigpO1xyXG5cclxuICAgIHB1YmxpYyBzZWVrZXI6IFNlZWtlcjtcclxuXHJcbiAgICBwcml2YXRlIF9wcmVwVGltZTpudW1iZXI7Ly/liY3mkYfml7bpl7Qv5binXHJcbiAgICBwcml2YXRlIF9jb29sVGltZTpudW1iZXI7Ly/lkI7mkYfml7bpl7Qv5binXHJcbiAgICBwcml2YXRlIF9jdXJQb2ludDpudW1iZXIgPSAwOy8v5b2T5YmN5bey56ev6JOE55qE54K55pWwXHJcbiAgICBwcml2YXRlIF92ZWxvY2l0eTpudW1iZXIgPSAxOy8v5b2T5YmN57Sv5Yqg6YCf546HKOeCueaVsC/luKcpXHJcblxyXG4gICAgcHVibGljIGdldCByZWFkeSgpOmJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1clBvaW50ID49IHRoaXMuX3ByZXBUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0aWMoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX2N1clBvaW50ICs9IHRoaXMuX3ZlbG9jaXR5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29vbENvbXBsZXRlKCk6Ym9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5fY3VyUG9pbnQgPj0gdGhpcy5fcHJlcFRpbWUrdGhpcy5fY29vbFRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlZnJlc2goKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX2N1clBvaW50ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBrZWVwZXIg54q25oCB5py65omA5pyJ6ICFXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGtlZXBlcjogQWN0b3IsIHJlczphbnkpIHtcclxuICAgICAgICB0aGlzLmtlZXBlciA9IGtlZXBlcjtcclxuICAgICAgICB0aGlzLmN1clN0YXRlID0gbmV3IFdhaXQoKTtcclxuICAgICAgICB0aGlzLnN0YXRlTGlzdC5lZGl0KFN0YXRlVHlwZS5XQUlULCB0aGlzLmN1clN0YXRlKTtcclxuICAgICAgICB0aGlzLnN0YXRlTGlzdC5lZGl0KFN0YXRlVHlwZS5QUkVQQVJFLCBuZXcgUHJlcGFyZSgpKTtcclxuICAgICAgICB0aGlzLnN0YXRlTGlzdC5lZGl0KFN0YXRlVHlwZS5BRlRFUl9BVEssIG5ldyBBZnRlckF0aygpKTtcclxuICAgICAgICAvL3RvZG86IGFib3V0IHJlc1xyXG5cclxuICAgICAgICB0aGlzLl9wcmVwVGltZSA9IDMwMDtcclxuICAgICAgICB0aGlzLl9jb29sVGltZSA9IDMwMDtcclxuXHJcbiAgICAgICAgdGhpcy5zZWVrZXIgPSBuZXcgTWFwTm9kZVNlZWtlcih0aGlzLmtlZXBlci5wcm9maWxlLmdldE5vZGVQb3MoKS5wbHVzKG5ldyBWZWMyKDMsMykpLCByZXNbJ3h4eCddLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIt+aWsOW9k+WJjeeKtuaAge+8jOavj+W4p+iwg+eUqFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuY3VyU3RhdGUubmFtZSgpKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInB0OlwiICsgdGhpcy5fY3VyUG9pbnQpO1xyXG4gICAgICAgIHRoaXMuc2Vla2VyLnVwZGF0ZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLmtlZXBlcikge1xyXG4gICAgICAgICAgICB0aGlzLmN1clN0YXRlLmV4ZWN1dGUodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pS55Y+Y5b2T5YmN54q25oCB77yM5paw54q25oCB5Lya6YeN572u5Li65Yid5aeL5oCBXHJcbiAgICAgKiBAcGFyYW0gc3RhdGVUeXBlIOaWsOeahOeKtuaAgeexu+Wei1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2hhbmdlU3RhdGUoc3RhdGVUeXBlOiBTdGF0ZVR5cGUpIHtcclxuICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLnN0YXRlTGlzdC5yZWFkKHN0YXRlVHlwZSk7XHJcbiAgICAgICAgc3RhdGUucmVzZXQoKTtcclxuICAgICAgICB0aGlzLmN1clN0YXRlID0gc3RhdGU7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG4iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcbmltcG9ydCB7IFNlZWtlciB9IGZyb20gXCIuL0FjdG9yU2Vla2VyXCI7XHJcbmltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0RvZE1hdGhcIjtcclxuaW1wb3J0IHsgQWN0b3JUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Eb2RLZXlcIjtcclxuaW1wb3J0IFJob2Rlc0dhbWUgZnJvbSBcIi4uLy4uL1Job2Rlc0dhbWVcIjtcclxuaW1wb3J0IHsgQXJyYXlBbGdvIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Eb2REYXRhU3RydWN0dXJlXCI7XHJcblxyXG4vKipcclxuICog5L2c6ICF77ya6I2J55Sf6JGxXHJcbiAqIFxyXG4gKiBCbG9ja2Vy5piv6Zi75oyh5qih5Z2XXHJcbiAqIOWCqOWtmOmYu+aMoeebuOWFs+eahOS/oeaBr1xyXG4gKiDlroPotJ/otKPmr4/luKfmo4DmtYvlubLlkZjlj6/pmLvmjKHnmoTkvY3nva7mmK/lkKbmnInmlYzkurrov5vlhaXvvIzlubblhrPlrprmmK/lkKbpmLvmjKFcclxuICogXHJcbiAqIFxyXG4gKiAvL3RvZG86IOWmguaenOi/m+ihjOmYu+aMoeaIluino+mZpOmYu+aMoe+8jEJsb2NrZXLlsIbkvJrlj5HluIPkuovku7ZcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCbG9ja2Vye1xyXG5cclxuICAgIHByaXZhdGUgX2tlZXBlcjpBY3RvcjtcclxuICAgIHByaXZhdGUgX3BvczpWZWMyO1xyXG4gICAgcHJpdmF0ZSBfYmxvY2tMaXN0OkFjdG9yW10gPSBbXTsvL+W3sumYu+aMoeeahOWIl+ihqFxyXG4gICAgcHJpdmF0ZSBfYmxvY2tlZEJ5OkFjdG9yID0gbnVsbDsvL+iiq+iwgemYu+aMoVxyXG4gICAgcHJpdmF0ZSBfYmxvY2tBYmlsaXR5Om51bWJlciA9IDM7Ly/pmLvmjKHog73liptcclxuICAgIHByaXZhdGUgX2JyZWFrdGhyb3VnaDpudW1iZXIgPSAxOy8v5Y+N6Zi75oyh6IO95YqbXHJcblxyXG4gICAgcHVibGljIGdldCBpc0Jsb2NrZWQoKTpib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9ibG9ja2VkQnkgIT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihrZWVwZXI6QWN0b3IsIHJlczphbnkpe1xyXG4gICAgICAgIHRoaXMuX2tlZXBlciA9IGtlZXBlcjtcclxuICAgICAgICB0aGlzLl9wb3MgPSBrZWVwZXIucHJvZmlsZS5nZXROb2RlUG9zKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9rZWVwZXIudHlwZSAhPSBBY3RvclR5cGUuT3BlcmF0b3IpIHsvL+S4jeaYr+W5suWRmOexu+Wei+eahOivneWwsea4heepunVwZGF0ZeaWueazlVxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSA9ICgpPT57fTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy90b2RvOiDmoLnmja5yZXPorr7nva7pmLvmjKHog73lipvjgIHlj43pmLvmjKHog73liptcclxuXHJcbiAgICAgICAgLy90ZXN0XHJcbiAgICAgICAgdGhpcy5fcG9zID0gbmV3IFZlYzIoNCw0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmHjeiuvumYu+aMoeS9jee9rlxyXG4gICAgICogQHBhcmFtIHBvcyDlnLDlm77oioLngrnkvY3nva7vvIzmlbTmlbBWZWMyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZXBvc2l0aW9uKHBvczpWZWMyKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3BvcyA9IHBvcztcclxuICAgICAgICB0aGlzLl9ibG9ja0xpc3QuZm9yRWFjaChlbGU9PntcclxuICAgICAgICAgICAgdGhpcy5fYmxvY2tBYmlsaXR5ICs9IGVsZS5ibG9ja2VyLl9icmVha3Rocm91Z2g7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fYmxvY2tMaXN0ID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOnZvaWR7XHJcbiAgICAgICAgLyog55uu5YmN55qE566X5rOV5Lya5Lqn55Sf5LiA5Liq5Yik5a6a6Zeu6aKY77yaXHJcbiAgICAgICAgICog6K6+5pyJ55u46YK755qE5Lik5Liq5qC85a2QQeWSjELvvIxC5Zyo5Y+z6L6577yMQeS4iuermeedgOaOqOeOi++8iOacneWPs++8ie+8jELkuIrnq5nnnYDloZ7pm7flqIVcclxuICAgICAgICAgKiDmlYzkurrlnKjjgJDnp7vlhaXjgJFC5qC85pe25Lya6KKr5aGe6I6x5aiF6Zi75oyhXHJcbiAgICAgICAgICog5q2k5pe255Sx5LqO5o6o546L55qE5pS75Ye76IyD5Zu05piv5Lik5qC877yM5aW55Y+v5Lul5pS75Ye75Yiw5aGe6Zu35aiF6Zi75oyh55qE5pWM5Lq6XHJcbiAgICAgICAgICog6L+Z5LiO5ri45oiP6KGo546w55u45Yay56qB77ya5pS75Ye76IyD5Zu0MuagvOeahOi/keWNq+aYr+aXoOazlei3qOS4gOS4quS6uuaUu+WHu+aVjOS6uueahO+8jDPmoLzmiY3ooYzvvIjmiJHljbDosaHkuK3mmK/vvIlcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiDov5nkuKrpl67popjlnKjmraTniYjmnKzmmoLkuJTlv73nlaVcclxuICAgICAgICAqL1xyXG4gICAgICAgIGlmICh0aGlzLl9ibG9ja0FiaWxpdHkgPD0gMCkgey8v5rKh5pyJ6Zi75oyh6IO95Yqb5bCx5LiN6ICD6JmR5Ymp5LiL55qE5LqL5LqGXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxpc3Q6QWN0b3JbXSA9IFJob2Rlc0dhbWUuSW5zdGFuY2UuYmF0dGxlLm1hcE5vZGVDUFUubWF0cml4R2V0KHRoaXMuX3Bvcyk7Ly/ojrflj5bpmLvmjKHnm67moIdcclxuICAgICAgICBsZXQgbmV3Q2FwdHVyZTpBY3RvcltdID0gQXJyYXlBbGdvLmZpbmRDb21wU2V0KGxpc3QsIHRoaXMuX2Jsb2NrTGlzdCk7XHJcbiAgICAgICAgbmV3Q2FwdHVyZSA9IG5ld0NhcHR1cmUuZmlsdGVyKGVsZT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gZWxlLmJsb2NrZXIuX2Jsb2NrZWRCeSA9PSBudWxsICYmIGVsZS5wcm9maWxlLmJsb2NrYWJsZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL+WPqumAieWPluaXoOS6uumYu+aMoeS4lOWPr+iiq+mYu+aMoeeahOmDqOWIhlxyXG4gICAgICAgIGlmIChuZXdDYXB0dXJlLmxlbmd0aCA9PSAwKSB7Ly/msqHmnInlh7rnjrDmlrDnmoTpmLvmjKHnm67moIdcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBuZXdDYXB0dXJlLmZvckVhY2goZWxlPT57XHJcbiAgICAgICAgICAgIGlmIChlbGUuYmxvY2tlci5fYnJlYWt0aHJvdWdoIDw9IHRoaXMuX2Jsb2NrQWJpbGl0eSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmxvY2tMaXN0LnB1c2goZWxlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Jsb2NrQWJpbGl0eSAtPSBlbGUuYmxvY2tlci5fYnJlYWt0aHJvdWdoO1xyXG4gICAgICAgICAgICAgICAgZWxlLmJsb2NrZXIuX2Jsb2NrZWRCeSA9IHRoaXMuX2tlZXBlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IEFjdG9yVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vRG9kS2V5XCI7XHJcbmltcG9ydCB7IFNlZWtlciB9IGZyb20gXCIuL0FjdG9yU2Vla2VyXCI7XHJcbmltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0RvZE1hdGhcIjtcclxuaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9BY3RvclwiO1xyXG5pbXBvcnQgUmhvZGVzR2FtZSBmcm9tIFwiLi4vLi4vUmhvZGVzR2FtZVwiO1xyXG5pbXBvcnQgeyBBcnJheUFsZ28gfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0RvZERhdGFTdHJ1Y3R1cmVcIjtcclxuXHJcbi8qKlxyXG4gKiDmraTlr7nosaHmmK/kuIDnp43lj6/ku6XooqvmlLvlh7vnirbmgIHmnLrlupTnlKjnmoRBY3RvcuaQnOe0ouWZqFxyXG4gKiDkuJPpl6jnlKjmnaXlr7nlupTlnLDlm77oioLngrnmkJzntKLmlYzkurrvvIjogIzpnZ7lubLlkZjvvIlcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNYXBOb2RlU2Vla2VyIGltcGxlbWVudHMgU2Vla2VyIHtcclxuXHJcbiAgICBwcml2YXRlIF9vcmlnaW46VmVjMjsvL+S4reW/g+S9jee9rlxyXG4gICAgcHJpdmF0ZSBfcm90YXRlOm51bWJlciA9IDA7Ly/pobrml7bpkojml4vovaw5MOW6pueahOasoeaVsO+8jOm7mOiupOS4ujBcclxuICAgIHByaXZhdGUgX3JlbGF0aXZlTm9kZUxpc3Q6VmVjMltdID0gW107Ly/pnIDopoHnm5HmjqfnmoTlnLDlm77oioLngrnnmoTnm7jlr7nkvY3nva5cclxuICAgIHByaXZhdGUgX2Fic29sdXRlTm9kZUxpc3Q6VmVjMltdID0gW107Ly/pnIDopoHnm5HmjqfnmoTlnLDlm77oioLngrnnmoTnu53lr7nkvY3nva5cclxuXHJcbiAgICBwcml2YXRlIF9mb2N1czpBY3RvcjsvL+mUgeWumueahOaVjOS6ulxyXG4gICAgcHJpdmF0ZSBfZm9jdXNDaGFuZ2VkOmJvb2xlYW4gPSBmYWxzZTsvL+mUgeWumueahOaVjOS6uuW3suS/ruaUuVxyXG4gICAgcHJpdmF0ZSBfY2FwdHVyZUxpc3Q6QWN0b3JbXS8v5o2V5o2J5Yiw55qE5pWM5Lq6XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRBYnNvbHV0ZSgpOnZvaWR7Ly/ph43mlrDorqHnrpfmiYDmnInpnIDopoHnm5HmjqfnmoTlnLDlm77oioLngrnnmoTnu53lr7nkvY3nva5cclxuICAgICAgICB0aGlzLl9hYnNvbHV0ZU5vZGVMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5fcmVsYXRpdmVOb2RlTGlzdC5mb3JFYWNoKGVsZT0+e1xyXG4gICAgICAgICAgICB0aGlzLl9hYnNvbHV0ZU5vZGVMaXN0LnB1c2godGhpcy5fb3JpZ2luLnBsdXMoZWxlKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3Iob3JpZ2luOlZlYzIsIHJlczphbnksIHJvdGF0ZTpudW1iZXIgPSAwKXtcclxuICAgICAgICAvL+i/memHjOeahHJlc+aYr+S4gOenjeS7o+ihqOaUu+WHu+iMg+WbtOexu+Wei+eahOaVsOaNrlxyXG4gICAgICAgIHRoaXMuX29yaWdpbiA9IG9yaWdpbjtcclxuICAgICAgICB0aGlzLl9yb3RhdGUgPSByb3RhdGU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy90ZXN0XHJcbiAgICAgICAgdGhpcy5fcmVsYXRpdmVOb2RlTGlzdC5wdXNoKG5ldyBWZWMyKDAsMCksIG5ldyBWZWMyKDEsMCksIG5ldyBWZWMyKDIsMCkpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5zZXRBYnNvbHV0ZSgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0Rm9jdXMoKTogQWN0b3Ige1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9mb2N1cztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Rm9jdXNMaXN0KGNvdW50OiBudW1iZXIpOiBBY3RvcltdIHtcclxuICAgICAgICAvL3RvZG86IOiAg+iZkeWcqGludGVyZmFjZeS4reenu+mZpOatpOmhuVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDYXB0dXJlTGlzdCgpOiBBY3RvcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2FwdHVyZUxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGZvbGxvd0FjdG9yKCk6IEFjdG9yIHtcclxuICAgICAgICAvL3RvZG86IOiAg+iZkeWcqGludGVyZmFjZeS4reenu+mZpOatpOmhuVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmb2N1c0NoYW5nZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZvY3VzQ2hhbmdlZDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICAvL+WIt+aWsOaNleaNieWIl+ihqFxyXG4gICAgICAgIHRoaXMuX2NhcHR1cmVMaXN0ID0gW107XHJcblxyXG4gICAgICAgIHRoaXMuX2Fic29sdXRlTm9kZUxpc3QuZm9yRWFjaChlbGU9PntcclxuICAgICAgICAgICAgbGV0IGxpc3Q6QWN0b3JbXSA9IFJob2Rlc0dhbWUuSW5zdGFuY2UuYmF0dGxlLm1hcE5vZGVDUFUubWF0cml4R2V0KGVsZSk7XHJcbiAgICAgICAgICAgIGxpc3QuZm9yRWFjaChlbGU9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NhcHR1cmVMaXN0LnB1c2goZWxlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NhcHR1cmVMaXN0ID0gQXJyYXlBbGdvLnNocmluayh0aGlzLl9jYXB0dXJlTGlzdCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/lpITnkIZmb2N1c1xyXG4gICAgICAgIGlmICggKHRoaXMuX2ZvY3VzID09IG51bGwgfHwgdGhpcy5fZm9jdXMgPT0gdW5kZWZpbmVkKSAmJiB0aGlzLl9jYXB0dXJlTGlzdC5sZW5ndGggPiAwKSB7Ly/lvZPliY3ml6DmjZXmjYnnm67moIfvvIzkuJRjYXB0dXJlTGlzdOS4reacieebruagh1xyXG4gICAgICAgICAgICB0aGlzLl9mb2N1cyA9IHRoaXMuX2NhcHR1cmVMaXN0WzBdO1xyXG4gICAgICAgICAgICB0aGlzLl9mb2N1c0NoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fY2FwdHVyZUxpc3QuaW5kZXhPZih0aGlzLl9mb2N1cykgPT0gLTEpIHsvL+W9k+WJjeaNleaNieebruagh+S4jeWcqGNhcHR1cmVMaXN05LitXHJcbiAgICAgICAgICAgIHRoaXMuX2ZvY3VzID0gdGhpcy5fY2FwdHVyZUxpc3RbMF07XHJcbiAgICAgICAgICAgIHRoaXMuX2ZvY3VzQ2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHsvL+aNleaNieebruagh+acquaUueWPmFxyXG4gICAgICAgICAgICB0aGlzLl9mb2N1c0NoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3RvclN0YXRlQmFzZSB7XHJcbiAgICBwcm90ZWN0ZWQgX2FjdG9yOiBBY3RvcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhY3RvcjogQWN0b3IpIHtcclxuICAgICAgICB0aGlzLl9hY3RvciA9IGFjdG9yO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnRlcigpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxlYXZlKCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEFjdG9yU3RhdGVCYXNlIGZyb20gXCIuL0FjdG9yU3RhdGVCYXNlXCI7XHJcblxyXG4vKipcclxuICog5pWM5Lq655qE6KKr6Zi75oyh54q25oCB44CB5bmy5ZGY55qE5LiA6Iis54q25oCBXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQWN0b3JTdGF0ZUZpZ2h0IGV4dGVuZHMgQWN0b3JTdGF0ZUJhc2V7XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOnZvaWR7XHJcbiAgICAgICAgLy90b2RvOiDosIPnlKjmlLvlh7vnirbmgIHmnLrnmoTluKflvqrnjq9cclxuICAgICAgICAvKlxyXG5cclxuICAgICAgICAqL1xyXG4gICAgICAgdGhpcy5fYWN0b3IuYXRrLnVwZGF0ZSgpO1xyXG4gICAgICAgdGhpcy5fYWN0b3IuYmxvY2tlci51cGRhdGUoKTtcclxuICAgIH1cclxufSIsImltcG9ydCBBY3RvclN0YXRlQmFzZSBmcm9tIFwiLi9BY3RvclN0YXRlQmFzZVwiO1xyXG5pbXBvcnQgRG9kTG9nIGZyb20gXCIuLi8uLi8uLi9Db21tb24vRG9kTG9nXCI7XHJcbmltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuaW1wb3J0IHsgQWN0b3JTdGF0ZVdhbGsgfSBmcm9tIFwiLi9BY3RvclN0YXRlV2Fsa1wiO1xyXG5pbXBvcnQgeyBBY3RvclN0YXRlUHJlcGFyZWQgfSBmcm9tIFwiLi9BY3RvclN0YXRlUHJlcGFyZWRcIjtcclxuaW1wb3J0IHsgQWN0b3JTdGF0ZUZpZ2h0IH0gZnJvbSBcIi4vQWN0b3JTdGF0ZUZpZ2h0XCI7XHJcblxyXG5leHBvcnQgZW51bSBBY3RvclN0YXRlSUQge1xyXG4gICAgTm9uZSxcclxuICAgIFByZXBhcmVkLCAgICAgLy/lvoXmnLogKOacquWHuuWKqC/mnKrpg6jnvbIpICBcclxuICAgIEJvcm4sICAgLy/lh7rnlJ/liqjnlLsg5LiN5Y+v5pS75Ye7IOS4jeWPr+iiq+aUu+WHu1xyXG4gICAgV2FsaywgICAvL+enu+WKqCDmlYzkurrnlKhcclxuICAgIFN0dW5uZWQsICAgIC8v5pmV55ypIGV0YyDvvIjmiZPmlq3liqjkvZznmoTooqvmjqfliLbnirbmgIHvvIlcclxuICAgIEZyZWV6ZWQsICAgIC8v5Yaw5Ya7IO+8iOS4jeaJk+aWreWKqOS9nOeahOiiq+aOp+WItueKtuaAge+8iVxyXG4gICAgRmlnaHQsICAvL+aZruaUu+eKtuaAgSDlubLlkZjluLjmgIEg5pWM5Lq66KKr6Zi75oyh5ZCOXHJcbiAgICBEZWF0aCwgIC8v5q275Lqh5Yqo55S7IOS4jeWPr+aUu+WHuyDkuI3lj6/ooqvmlLvlh7tcclxuICAgIEVzY2FwZSwgLy/mlYzkurrpgIPohLFcclxuICAgIENvdW50XHJcbn1cclxuXHJcbi8qXHJcbiAqIOinkuiJsueKtuaAgeacuiDnrqHnkIbop5LoibLmiYDlpITpmLbmrrUg5qC55o2u5LiN5ZCM6Zi25q615Yaz5a6a5LiN5ZCM55qE57uE5Lu254q25oCBXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3RvclN0YXRlTWdyIHtcclxuICAgIHByaXZhdGUgX3N0YXRlczogQWN0b3JTdGF0ZUJhc2VbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfY3VycmVudFN0YXRlOiBBY3RvclN0YXRlQmFzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhY3RvcjogQWN0b3IpIHtcclxuICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX3N0YXRlc1tBY3RvclN0YXRlSUQuV2Fsa10gPSBuZXcgQWN0b3JTdGF0ZVdhbGsoYWN0b3IpO1xyXG4gICAgICAgIHRoaXMuX3N0YXRlc1tBY3RvclN0YXRlSUQuUHJlcGFyZWRdID0gbmV3IEFjdG9yU3RhdGVQcmVwYXJlZChhY3Rvcik7XHJcbiAgICAgICAgdGhpcy5fc3RhdGVzW0FjdG9yU3RhdGVJRC5GaWdodF0gPSBuZXcgQWN0b3JTdGF0ZUZpZ2h0KGFjdG9yKTtcclxuICAgICAgICAvL1RPRE9cclxuICAgICAgICAvL+WPgueFp+a4uOaIj+Wkp+eKtuaAgeaculxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgaW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJ1blN0YXRlKEFjdG9yU3RhdGVJRC5Ob25lKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcnVuU3RhdGUoc3RhdGVJRDogQWN0b3JTdGF0ZUlEKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKEFjdG9yU3RhdGVJRC5Db3VudCA8PSBzdGF0ZUlEIHx8IHN0YXRlSUQgPD0gQWN0b3JTdGF0ZUlELk5vbmUpIHtcclxuICAgICAgICAgICAgRG9kTG9nLmVycm9yKGBHYW1lU3RhdGVNZ3IucnVuU3RhdGU6IEludmFsaWQgc3RhdGVJRCBbJHtzdGF0ZUlEfV0uIGApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobnVsbCAhPSB0aGlzLl9jdXJyZW50U3RhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlLmxlYXZlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUgPSB0aGlzLl9zdGF0ZXNbc3RhdGVJRF07XHJcbiAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlLmVudGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAobnVsbCAhPSB0aGlzLl9jdXJyZW50U3RhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlLnVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKG51bGwgIT0gdGhpcy5fY3VycmVudFN0YXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZS5sZWF2ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9zdGF0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5fc3RhdGVzW2ldO1xyXG4gICAgICAgICAgICBzdGF0ZS5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBBY3RvclN0YXRlQmFzZSBmcm9tIFwiLi9BY3RvclN0YXRlQmFzZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFjdG9yU3RhdGVQcmVwYXJlZCBleHRlbmRzIEFjdG9yU3RhdGVCYXNle1xyXG4gICAgcHVibGljIHVwZGF0ZSgpOnZvaWR7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJQZXJwYXJlZCB1cGRhdGVcIilcclxuICAgIH1cclxufSIsImltcG9ydCBBY3RvclN0YXRlQmFzZSBmcm9tIFwiLi9BY3RvclN0YXRlQmFzZVwiO1xyXG5pbXBvcnQgeyBBY3RvclR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0RvZEtleVwiO1xyXG5pbXBvcnQgeyBWZWMyIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Eb2RNYXRoXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQWN0b3JTdGF0ZVdhbGsgZXh0ZW5kcyBBY3RvclN0YXRlQmFzZXtcclxuICAgIFxyXG4gICAgcHVibGljIGVudGVyKCk6dm9pZHtcclxuICAgICAgICAvL+S4jeW6lOivpeWcqOi/meS4queKtuaAgemHjO+8jOW6lOivpeWcqGJvcm7ph4zov5vooYxkZXBsb3lcclxuICAgICAgICB0aGlzLl9hY3Rvci5yZW5kZXIuZGVwbG95KCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyB1cGRhdGUoKTp2b2lke1xyXG5cclxuICAgICAgICBsZXQgYWN0b3IgPSB0aGlzLl9hY3RvcjtcclxuXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIGlmIChhY3Rvci5ibG9ja2VyLmlzQmxvY2tlZCkge1xyXG4gICAgICAgICAgICAvL3RvZG86IOi9rOaNouWIsGZpZ2h054q25oCBXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IOS9oOS4jeimgei/h+adpeWVijpib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2FjdG9yLnRyYW5zZm9ybS5wb3MuYXJyaXZlZCAmJiDkvaDkuI3opoHov4fmnaXllYopIHsvL+W3suWIsOi+vuebrueahOWcsFxyXG4gICAgICAgICAgICBpZiAoYWN0b3Iucm91dGUubmV4dCgpKSB7Ly/lrZjlnKjkuIvkuIDkuKrnm67moIfoioLngrlcclxuICAgICAgICAgICAgICAgIGFjdG9yLnRyYW5zZm9ybS5wb3Muc2V0VGFyZ2V0KGFjdG9yLnJvdXRlLmN1cnJlbnRUYXJnZXQoKSk7Ly/lsIbnm67moIfmm7/mjaLkuLrkuIvkuIDkuKrnm67moIfoioLngrlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vdG9kbzog5pWM5Lq65bey5Yiw6L6+57uI54K5XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG5cclxuICAgICAgICBpZiAoIeS9oOS4jeimgei/h+adpeWViikgey8v6Lef6byg5qCH55qE6YC76L6RXHJcbiAgICAgICAgICAgIGFjdG9yLnRyYW5zZm9ybS5wb3Muc2V0VGFyZ2V0KG5ldyBWZWMyKExheWEuc3RhZ2UubW91c2VYLTUwLCBMYXlhLnN0YWdlLm1vdXNlWS01MCkpO1xyXG4gICAgICAgICAgICBhY3Rvci50cmFuc2Zvcm0ucG9zLnNldFNwZWVkKDIwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFjdG9yLnRyYW5zZm9ybS5wb3MubW92ZSgpOy8v56e75YqoXHJcbiAgICAgICAgYWN0b3IuY29saUVtaXQucG9zQnlWZWMoYWN0b3IudHJhbnNmb3JtLnBvcy5kYXRhKTsvL+enu+WKqOeisOaSnueusVxyXG4gICAgICAgIGFjdG9yLmNvbGlFbWl0LmV2ZW50KGFjdG9yLCBhY3Rvci50eXBlKTsvL+WPkeW4g+eisOaSnuS6i+S7tlxyXG4gICAgICAgIGFjdG9yLnJlbmRlci5tb3ZlKGFjdG9yLnRyYW5zZm9ybS5wb3MuZGF0YSk7Ly/np7vliqjlj6/op4blr7nosaFcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yL0FjdG9yXCI7XHJcbmltcG9ydCB7TXlTeW1ib2x9IGZyb20gXCIuLi8uLi9GaXgvRml4U3ltYm9sXCI7XHJcbmltcG9ydCB7Q2lyY2xlQ29sbGlzaW9uUmFuZ2V9IGZyb20gXCIuL0NvbGxpc2lvblJhbmdlXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIOeisOaSnuWkhOeQhuWZqO+8jOivpeexu+e7tOaKpOS4gOS4qk1hcO+8jE1hcOiusOW9leaJgOaciemcgOimgei/m+ihjOeisOaSnuWkhOeQhueahOeisOaSnuWZqO+8jE1hcOeUqOeisOaSnuWZqOeahOWUr+S4gOagh+ivhuS9nOS4uumUruS7pemBv+WFjemHjeWkjeiusOW9leOAglxyXG4gKlxyXG4gKiDor6Xnsbvmj5DkvpvkuIDkuKpyZWNhbGN1bGF0ZeaWueazleeUqOS6jumHjeaWsOiuoeeul+eisOaSnuaDheWGte+8jOWvueS6jk1hcOS4reeahOavj+S4quWkhOeQhuWvueixoe+8jOivpeaWueazleiuoeeul+WFtuS4jk1hcOS4reeahOaJgOacieWFtuS7luWvueixoVxyXG4gKiDnmoTph43lj6Dmg4XlhrXvvIzlubblsIbov5nkupvph43lj6DnmoTlhbbku5blr7nosaHku6XliJfooajnmoTlvaLlvI/kvKDpgJLnu5nor6XlpITnkIblr7nosaHjgIJcclxuICpcclxuICogYnkgWFdWXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQWN0b3JDb2xsaXNpb25Qcm9jZXNzb3Ige1xyXG5cclxuICAgIHByaXZhdGUgY29sbGlkZXJNYXA6IHsgW2tleTogbnVtYmVyXTogQWN0b3JDb2xsaWRlciB9ID0ge307XHJcblxyXG4gICAgcHVibGljIHJlZ2lzdGVyQ29sbGlkZXIoY29sbGlkZXI6IEFjdG9yQ29sbGlkZXIpIHtcclxuICAgICAgICB0aGlzLmNvbGxpZGVyTWFwW2NvbGxpZGVyLnN5bWJvbC5kYXRhXSA9IGNvbGxpZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1bnJlZ2lzdGVyQ29sbGlkZXIoY29sbGlkZXI6IEFjdG9yQ29sbGlkZXIpIHtcclxuICAgICAgICBkZWxldGUgdGhpcy5jb2xsaWRlck1hcFtjb2xsaWRlci5zeW1ib2wuZGF0YV07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpIHtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMuY29sbGlkZXJNYXApIHtcclxuICAgICAgICAgICAgbGV0IHRhcmdldENvbGxpZGVyID0gdGhpcy5jb2xsaWRlck1hcFtpXTtcclxuICAgICAgICAgICAgbGV0IGNvbGxpZGluZ0xpc3QgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiBpbiB0aGlzLmNvbGxpZGVyTWFwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29sbGlkZXIgPSB0aGlzLmNvbGxpZGVyTWFwW2pdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbGxpZGVyID09IHRhcmdldENvbGxpZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0Q29sbGlkZXIuc2hvdWxkQ29sbGlkZVdpdGgoY29sbGlkZXIpICYmIHRhcmdldENvbGxpZGVyLmdldENvbGxpc2lvblJhbmdlKCkuaXNDb2luY2lkZVdpdGhSYW5nZShjb2xsaWRlci5nZXRDb2xsaXNpb25SYW5nZSgpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxpZGluZ0xpc3QucHVzaChjb2xsaWRlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGFyZ2V0Q29sbGlkZXIub25Db2xsaWRpbmdMaXN0UmVmcmVzaChjb2xsaWRpbmdMaXN0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFjdG9yQ29sbGlkZXIge1xyXG4gICAgLy/llK/kuIDmoIfor4ZcclxuICAgIHB1YmxpYyByZWFkb25seSBzeW1ib2w6IE15U3ltYm9sID0gbmV3IE15U3ltYm9sKCk7XHJcblxyXG4gICAgLy/ojrflj5bnorDmkp7ojIPlm7RcclxuICAgIGFic3RyYWN0IGdldENvbGxpc2lvblJhbmdlKCk6IENpcmNsZUNvbGxpc2lvblJhbmdlIDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmHjeiuvueisOaSnuiMg+WbtFxyXG4gICAgICogQHBhcmFtIHJhbmdlIOaWsOeahOeisOaSnuiMg+WbtFxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBzZXRDb2xsaXNpb25SYW5nZShyYW5nZTogQ2lyY2xlQ29sbGlzaW9uUmFuZ2UpO1xyXG5cclxuICAgIC8v6I635Y+W56Kw5pKe5Zmo55qE5omA5pyJ6ICFXHJcbiAgICBhYnN0cmFjdCBnZXRBY3RvcigpOiBBY3RvcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOeisOaSnuWIl+ihqOmcgOimgeWIt+aWsFxyXG4gICAgICogQHBhcmFtIGNvbGxpZGluZ0xpc3Qg5paw55qE56Kw5pKe5YiX6KGoXHJcbiAgICAgKiAqL1xyXG4gICAgYWJzdHJhY3Qgb25Db2xsaWRpbmdMaXN0UmVmcmVzaChjb2xsaWRpbmdMaXN0OiBBY3RvckNvbGxpZGVyW10pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm5bqU6K+l5LiO5oyH5a6a56Kw5pKe5Zmo5Y+R55Sf56Kw5pKeXHJcbiAgICAgKiBAcGFyYW0gY29sbGlkZXIg5Y+m5LiA5Liq56Kw5pKe5ZmoXHJcbiAgICAgKiAqL1xyXG4gICAgYWJzdHJhY3Qgc2hvdWxkQ29sbGlkZVdpdGgoY29sbGlkZXI6IEFjdG9yQ29sbGlkZXIpOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b2T5YmN56Kw5pKe5YiX6KGoXHJcbiAgICAgKiAqL1xyXG4gICAgYWJzdHJhY3QgZ2V0Q29sbGlkaW5nTGlzdCgpOiBBY3RvckNvbGxpZGVyW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliLfmlrDnorDmkp7ojIPlm7TvvIzkvb/lhbbot5/pmo/miYDmnInogIXnp7vliqhcclxuICAgICAqICovXHJcbiAgICBhYnN0cmFjdCByZWZyZXNoQ29sbGlzaW9uUmFuZ2VGb2xsb3dBY3RvcigpO1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNpbXBsZUFjdG9yQ29sbGlkZXIgZXh0ZW5kcyBBY3RvckNvbGxpZGVyIHtcclxuXHJcbiAgICBwcml2YXRlIGNvbGxpZGluZ0xpc3Q6IEFjdG9yQ29sbGlkZXJbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBhY3RvcjogQWN0b3I7XHJcbiAgICBwcml2YXRlIHJhbmdlOiBDaXJjbGVDb2xsaXNpb25SYW5nZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhY3RvcjogQWN0b3IsIHJhbmdlOiBDaXJjbGVDb2xsaXNpb25SYW5nZSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5hY3RvciA9IGFjdG9yO1xyXG4gICAgICAgIHRoaXMucmFuZ2UgPSByYW5nZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0Q29sbGlzaW9uUmFuZ2UoKTogQ2lyY2xlQ29sbGlzaW9uUmFuZ2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJhbmdlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldENvbGxpc2lvblJhbmdlKHJhbmdlOiBDaXJjbGVDb2xsaXNpb25SYW5nZSkge1xyXG4gICAgICAgIHRoaXMucmFuZ2UgPSByYW5nZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBY3RvcigpOiBBY3RvciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q29sbGlkaW5nTGlzdCgpOiBBY3RvckNvbGxpZGVyW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbGxpZGluZ0xpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgb25Db2xsaWRpbmdMaXN0UmVmcmVzaChjb2xsaWRpbmdMaXN0OiBBY3RvckNvbGxpZGVyW10pIHtcclxuICAgICAgICB0aGlzLmNvbGxpZGluZ0xpc3QgPSBjb2xsaWRpbmdMaXN0O1xyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJpbXBvcnQgeyBDb2xpUmVjZWl2ZXIsIENvbGlFbWl0IH0gZnJvbSBcIi4uL0FjdG9yL0FjdG9yTW9kdWxlcy9Db2xpTWVzc2FnZVwiO1xyXG5pbXBvcnQgeyBWZWMyIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9Eb2RNYXRoXCI7XHJcbmltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3IvQWN0b3JcIjtcclxuaW1wb3J0IHsgQXJyYXlBbGdvIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9Eb2REYXRhU3RydWN0dXJlXCI7XHJcbmltcG9ydCB7IEFjdG9yVHlwZSB9IGZyb20gXCIuLi8uLi9Db21tb24vRG9kS2V5XCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29saVJlcG9ydGVyIGV4dGVuZHMgQ29saVJlY2VpdmVyIHtcclxuICAgIHB1YmxpYyBpbkxpc3Q6IFZlYzJbXSA9IFtdO1xyXG4gICAgcHVibGljIGxheWVyOiBMYXlhLlNwcml0ZSA9IG5ldyBMYXlhLlNwcml0ZSgpO1xyXG5cclxuICAgIHByaXZhdGUgX21hdHJpeDogQWN0b3JbXVtdW10gPSBbXTsvL+WtmOWCqOavj+S4quWcsOWbvuiKgueCueS4reeahEFjdG9y5a+56LGhXHJcblxyXG4gICAgcHJpdmF0ZSBtYXRyaXhBZGQocG9zOlZlYzIsIGFjdG9yOkFjdG9yKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX21hdHJpeFtwb3MueF1bcG9zLnldLnB1c2goYWN0b3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbWF0cml4UmVtb3ZlKHBvczpWZWMyLCBhY3RvcjpBY3Rvcik6dm9pZHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX21hdHJpeFtwb3MueF1bcG9zLnldLmluZGV4T2YoYWN0b3IpO1xyXG4gICAgICAgIGlmIChpbmRleCAhPSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXRyaXhbcG9zLnhdW3Bvcy55XS5zcGxpY2UoaW5kZXgsMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtYXRyaXhHZXQocG9zOlZlYzIpOkFjdG9yW117XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hdHJpeFtwb3MueF1bcG9zLnldO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKDEwLCAxMCk7XHJcbiAgICAgICAgZm9yIChsZXQgdyA9IDA7IHcgPCAxMDsgdyArPSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hdHJpeFt3XSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBoID0gMDsgaCA8IDEwOyBoICs9IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGV0ZWN0aW9uKG5ldyBWZWMyKHcsIGgpLCBgJHtBY3RvclR5cGUuTW9uc3Rlcn1gKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hdHJpeFt3XVtoXSA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMubGF5ZXIpO1xyXG4gICAgICAgIHRoaXMubGF5ZXIuek9yZGVyID0gLTEwO1xyXG4gICAgICAgIHRoaXMubGF5ZXIucG9zKDUwLDUwKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FbnRyZShhY3RvcjogQWN0b3IsIHBvczogVmVjMik6IHZvaWQge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRW50ZXJcIiArIHBvcy54ICsgXCJ8XCIgKyBwb3MueSk7XHJcbiAgICAgICAgdGhpcy5pbkxpc3QucHVzaChwb3MpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICAgICAgdGhpcy5tYXRyaXhBZGQocG9zLGFjdG9yKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25MZWF2ZShhY3RvcjogQWN0b3IsIHBvczogVmVjMik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gQXJyYXlBbGdvLmZpbmRFbGUocG9zLCB0aGlzLmluTGlzdCk7XHJcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLmluTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgIHRoaXMubWF0cml4UmVtb3ZlKHBvcyxhY3Rvcik7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJMZWF2ZVwiICsgcG9zLnggKyBcInxcIiArIHBvcy55KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVuZGVyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubGF5ZXIuZ3JhcGhpY3MuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLmluTGlzdC5mb3JFYWNoKGVsZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXIuZ3JhcGhpY3MuZHJhd1JlY3QoZWxlLnggKiBDb2xpRW1pdC5HTE9CQUxfVU5JVF9XSURUSCArIDEsXHJcbiAgICAgICAgICAgICAgICBlbGUueSAqIENvbGlFbWl0LkdMT0JBTF9VTklUX0hFSUdIVCArIDEsXHJcbiAgICAgICAgICAgICAgICBDb2xpRW1pdC5HTE9CQUxfVU5JVF9XSURUSCAtIDIsXHJcbiAgICAgICAgICAgICAgICBDb2xpRW1pdC5HTE9CQUxfVU5JVF9IRUlHSFQgLSAyLFxyXG4gICAgICAgICAgICAgICAgXCIjZmYwMDAwXCJcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgR2FtZU1hcCBmcm9tIFwiLi9HYW1lTGV2ZWxcIjtcclxuaW1wb3J0IHsgQWN0b3JDb2xsaXNpb25Qcm9jZXNzb3IgfSBmcm9tIFwiLi9Db2xsaXNpb24vQWN0b3JDb2xsaXNpb25Qcm9jZXNzb3JcIjtcclxuaW1wb3J0IEdhbWVMZXZlbCBmcm9tIFwiLi9HYW1lTGV2ZWxcIjtcclxuaW1wb3J0IERvZFJlc291cmNlTWdyIGZyb20gXCIuLi9SZXNvdXJjZXMvRG9kUmVzb3VyY2VNZ3JcIjtcclxuaW1wb3J0IEFjdG9yTWdyIGZyb20gXCIuL0FjdG9yL0FjdG9yTWdyXCI7XHJcbmltcG9ydCBDb2xpUmVwb3J0ZXIgZnJvbSBcIi4vQ29sbGlzaW9uL0NvbGlSZXBvcnRlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUJhdHRsZSB7XHJcbiAgICBwdWJsaWMgbGV2ZWw6IEdhbWVMZXZlbDtcclxuICAgIHB1YmxpYyBtYXA6IEdhbWVNYXA7XHJcbiAgICBwdWJsaWMgYWN0b3JNZ3I6IEFjdG9yTWdyO1xyXG5cclxuICAgIHB1YmxpYyBjb2xsaXNpb246IEFjdG9yQ29sbGlzaW9uUHJvY2Vzc29yOy8v6LSf6LSj5ZyG5b2i56Kw5pKe5qOA5rWLXHJcbiAgICBwdWJsaWMgbWFwTm9kZUNQVTogQ29saVJlcG9ydGVyID0gbmV3IENvbGlSZXBvcnRlcigpOy8v6LSf6LSj5Zyw5Zu+6IqC54K556Kw5pKe5qOA5rWLXHJcblxyXG4gICAgcHJpdmF0ZSBfbGV2ZWxQcmVwYXJlZDogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmxldmVsID0gbmV3IEdhbWVMZXZlbCgpO1xyXG4gICAgICAgIHRoaXMubWFwID0gbmV3IEdhbWVNYXAoKTtcclxuICAgICAgICB0aGlzLmFjdG9yTWdyID0gbmV3IEFjdG9yTWdyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY29sbGlzaW9uID0gbmV3IEFjdG9yQ29sbGlzaW9uUHJvY2Vzc29yKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHByZXBhcmVMZXZlbCgpOiB2b2lkIHtcclxuICAgICAgICAvL1RPRE8gaW5pdCBsZXZlbCBpbmZvcm1hdGlvblxyXG4gICAgICAgIGxldCByZXMgPSBEb2RSZXNvdXJjZU1nci5JbnN0YW5jZS5nZXRDdXJyZW50TGV2ZWxSZXMoKTtcclxuXHJcbiAgICAgICAgLy90ZXN0XHJcbiAgICAgICAgcmVzID0ge2xldmVsOjEsbWFwOjJ9O1xyXG5cclxuICAgICAgICB0aGlzLmxldmVsLmluaXQocmVzWydsZXZlbCddKTsgLy9qdXN0IHNhbXBsZVxyXG4gICAgICAgIHRoaXMubWFwLmluaXQocmVzWydtYXAnXSk7XHJcbiAgICAgICAgdGhpcy5hY3Rvck1nci5pbml0KHJlc1snbWFwJ10pO1xyXG5cclxuICAgICAgICAvL0FORCBET05UIEZPUkdFVCBSRVNFVCBMQVNUIEJBVFRMRSBEQVRBIFJFTUFJTlMuIFxyXG4gICAgICAgIC8vdGhpcy5jb2xsaXNpb24ucmVzZXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fbGV2ZWxQcmVwYXJlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzTGV2ZWxQcmVwcmFyZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xldmVsUHJlcGFyZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIC8vVE9ET1xyXG4gICAgICAgIC8vQ0xFQVIgTEFTVCBCQVRUTEUgUkVTT1VSQ0VcclxuICAgICAgICB0aGlzLl9sZXZlbFByZXBhcmVkID0gZmFsc2U7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQmF0dGxlQ29uc3Qge1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBzdGFuZGFyZENvc3RJbmNyZWFzZVJhdGlvOiBudW1iZXIgPSAxO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBtYXhDb3N0TnVtOiBudW1iZXIgPSA5OTtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgaW5pdENvc3ROdW06IG51bWJlciA9IDY7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGxpZmVQb2ludDogbnVtYmVyID0gMztcclxufSIsImltcG9ydCB7IEJ1ZmYgfSBmcm9tIFwiLi9BY3Rvci9BY3Rvck1vZHVsZXMvQnVmZlwiO1xyXG5pbXBvcnQgeyBFdmVudENlbnRyZSB9IGZyb20gXCIuLi9FdmVudC9FdmVudENlbnRyZVwiO1xyXG5pbXBvcnQgRml4VGltZSBmcm9tIFwiLi4vRml4L0ZpeFRpbWVcIjtcclxuaW1wb3J0IERvZFJlc291cmNlTWdyIGZyb20gXCIuLi9SZXNvdXJjZXMvRG9kUmVzb3VyY2VNZ3JcIjtcclxuaW1wb3J0IEdhbWVCYXR0bGVDb25zdCBmcm9tIFwiLi9HYW1lQmF0dGxlQ29uc3RcIjtcclxuLyoqXHJcbiAqIOaooeWdl+ivtOaYjjog5ri45oiP5oiY5paX5Zyw5Zu+5qih5Z2XICBcclxuICog6LSf6LSj5YaF5a65OiDlnLDlm77lsZ7mgKforr7nva7vvIzlhajlsYBidWZm566h55CGICBcclxuICog6LSf6LSj5Lq6OiDpk7bljY4gIFxyXG4gKiDml7bpl7Q6IDIwMjDlubQz5pyIM+aXpTEyOjQ1OjQxICBcclxuICovXHJcblxyXG4vL0tSOiDlhajlsYDnlLHlhbPljaHmqKHlnZfnrqHnkIYgQOmTtuWNjlxyXG4vL+i/memHjOWPr+S7peWMheWQq+WFqOWxgOeahOiwg+aVtOWAvC/nlJ/lkb3lgLwv5rao6LS5XHJcbi8v5YWo5ri45oiP5qCH5YeG5YC85L2/55So5bi46YeP5a6a5LmJ5ZyoQmF0dGxlQ29uc3TnsbvkuK0g56S65L6L5Y+v5Lul55yL5LiL5pa5XHJcbi8v5Y+m77ya56eB5pyJ5oiQ5ZGY5ZG95ZCN6K+35Zyo5YmN6Z2i5Yqg5LiL5YiS57q/IOWjsOaYjueahOaIkOWRmOivt+WcqOaehOmAoOWHveaVsOS4reWFqOmDqOWIneWni+WMluS4gOS4quWAvO+8jOmYsuatonVuZGVmaW5lZCjph47mjIfpkogp55qE5oOF5Ya15Y+R55SfXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lTGV2ZWx7XHJcbiAgICBwcml2YXRlIF9pbml0aWFsQ29zdDpudW1iZXI7XHJcbiAgICBwcml2YXRlIF9jdXJyZW50Q29zdDpudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfbGlmZVBvaW50Om51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIF90aW1lTGluZTpudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2xvYmFsQnVmZkxpc3Q6IEJ1ZmZbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuX2luaXRpYWxDb3N0ID0gMDtcclxuICAgICAgICB0aGlzLl9jdXJyZW50Q29zdCA9IDA7XHJcbiAgICAgICAgdGhpcy5fbGlmZVBvaW50ID0gMDtcclxuICAgICAgICB0aGlzLl90aW1lTGluZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fZ2xvYmFsQnVmZkxpc3QgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdChyZXM6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIC8vZm9yIGV4YW1wbGVcclxuICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICAgICAgdGhpcy5faW5pdGlhbENvc3QgPSB0aGlzLl9jdXJyZW50Q29zdCA9IHJlc1snaW5pdENvc3QnXSB8fCBHYW1lQmF0dGxlQ29uc3QuaW5pdENvc3ROdW07XHJcbiAgICAgICAgdGhpcy5fbGlmZVBvaW50ID0gcmVzWydsaWZlJ10gfHwgR2FtZUJhdHRsZUNvbnN0LmxpZmVQb2ludDtcclxuICAgICAgICB0aGlzLl90aW1lTGluZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5nZXRHbG9iYWxCdWZmTGlzdCgpO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZVRpbWUoKTsgXHJcbiAgICAgICAgdGhpcy5fdXBkYXRlQ29zdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRHbG9iYWxCdWZmTGlzdCgpOkJ1ZmZbXXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2xvYmFsQnVmZkxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoYW5nZUNvc3QoKTp2b2lke1xyXG4gICAgICAgIC8vdG9kby4uLi5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF91cGRhdGVUaW1lKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3RpbWVMaW5lICs9IEZpeFRpbWUuZGVsdGFUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3VwZGF0ZUNvc3QoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9nbG9iYWxCdWZmTGlzdC5zcGxpY2UoMCwgdGhpcy5fZ2xvYmFsQnVmZkxpc3QubGVuZ3RoKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgRG9kTG9nIGZyb20gXCIuLi9Db21tb24vRG9kTG9nXCI7XHJcbmltcG9ydCBHYW1lU3RhdGVNZ3IgZnJvbSBcIi4vU3RhdGUvR2FtZVN0YXRlTWdyXCI7XHJcbmltcG9ydCBHYW1lQmF0dGxlIGZyb20gXCIuL0dhbWVCYXR0bGVcIjtcclxuaW1wb3J0IEdhbWVMb2JieSBmcm9tIFwiLi9Mb2JieS9HYW1lTG9iYnlcIjtcclxuXHJcbi8qKlxyXG4gKiDov5nmmK/muLjmiI/mnKzkvZNcclxuICog6K+05LiA5LqbUmhvZGVzX0dhbWXmlofku7blpLnkuIvnmoTms6jph4rop4TliJnvvIzmlrnkvr/ku6XlkI5jdHJsK2ZcclxuICpcclxuICogMS4vL0B0b2RvIOagh+azqOmcgOimgeWujOWWhOeahOmDqOWIhlxyXG4gKlxyXG4gKiAyLi8vQHRvZml4IOagh+azqOW3suefpeaciemXrumimOeahOmDqOWIhlxyXG4gKlxyXG4gKiAzLi8vQHRlc3Qg5qCH5rOo5LuF5L6b5rWL6K+V5L2/55So55qE6YOo5YiGXHJcbiAqXHJcbiAqIDMuLy9AcmVkY2FsbCDmoIfms6josIPnlKjmuLLmn5PmqKHlnZfnmoTpg6jliIZcclxuICpcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJob2Rlc0dhbWUge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBSaG9kZXNHYW1lO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSW5zdGFuY2UoKTogUmhvZGVzR2FtZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlIHx8ICh0aGlzLl9pbnN0YW5jZSA9IG5ldyB0aGlzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0ZU1ncjogR2FtZVN0YXRlTWdyO1xyXG4gICAgcHVibGljIGJhdHRsZTogR2FtZUJhdHRsZTtcclxuICAgIHB1YmxpYyBsb2JieTogR2FtZUxvYmJ5O1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmJhdHRsZSA9IG5ldyBHYW1lQmF0dGxlKCk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZU1nciA9IG5ldyBHYW1lU3RhdGVNZ3IodGhpcy5iYXR0bGUpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGVNZ3IuaW5pdCgpO1xyXG4gICAgICAgIERvZExvZy5kZWJ1ZyhgUmhvZGVzR2FtZTogaW5pdGlhbGl6YXRpb24gY29tcGxldGUuIGApXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXRlTWdyLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJpbXBvcnQgR2FtZUJhdHRsZSBmcm9tIFwiLi4vR2FtZUJhdHRsZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVN0YXRlQmFzZSB7XHJcbiAgICBwcm90ZWN0ZWQgX2JhdHRsZTogR2FtZUJhdHRsZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihiYXR0bGU6IEdhbWVCYXR0bGUpIHtcclxuICAgICAgICB0aGlzLl9iYXR0bGUgPSBiYXR0bGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudGVyKCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbGVhdmUoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgR2FtZVN0YXRlQmFzZSBmcm9tIFwiLi9HYW1lU3RhdGVCYXNlXCI7XHJcbmltcG9ydCBSaG9kZXNHYW1lIGZyb20gXCIuLi9SaG9kZXNHYW1lXCI7XHJcbmltcG9ydCBHYW1lQmF0dGxlIGZyb20gXCIuLi9HYW1lQmF0dGxlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU3RhdGVCYXR0bGUgZXh0ZW5kcyBHYW1lU3RhdGVCYXNle1xyXG4gICAgY29uc3RydWN0b3IoYmF0dGxlOkdhbWVCYXR0bGUpIHtcclxuICAgICAgICBzdXBlcihiYXR0bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnRlcigpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5lbnRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsZWF2ZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5sZWF2ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKCk7XHJcbiAgICAgICAgdGhpcy5fYmF0dGxlLmFjdG9yTWdyLnVwZGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuX2JhdHRsZS5tYXAudXBkYXRlKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgR2FtZVN0YXRlQmFzZSBmcm9tIFwiLi9HYW1lU3RhdGVCYXNlXCI7XHJcbmltcG9ydCBSaG9kZXNHYW1lIGZyb20gXCIuLi9SaG9kZXNHYW1lXCI7XHJcbmltcG9ydCBEb2RSZXNvdXJjZU1nciBmcm9tIFwiLi4vLi4vUmVzb3VyY2VzL0RvZFJlc291cmNlTWdyXCI7XHJcbmltcG9ydCB7IEdhbWVTdGF0ZUlEIH0gZnJvbSBcIi4vR2FtZVN0YXRlTWdyXCI7XHJcbmltcG9ydCBEb2RMb2cgZnJvbSBcIi4uLy4uL0NvbW1vbi9Eb2RMb2dcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTdGF0ZUdhbWVsb2FkIGV4dGVuZHMgR2FtZVN0YXRlQmFzZXtcclxuICAgIGNvbnN0cnVjdG9yKGJhdHRsZSkge1xyXG4gICAgICAgIHN1cGVyKGJhdHRsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudGVyKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmVudGVyKCk7XHJcbiAgICAgICAgLy9UT0RPIFNIT1cgTE9BRElORyBTQ1JFRU5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbGVhdmUoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIubGVhdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIucmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLnVwZGF0ZSgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiR2FtZUxvYWQgdXBkYXRlXCIpO1xyXG4gICAgICAgIGlmICh0cnVlID09IERvZFJlc291cmNlTWdyLkluc3RhbmNlLmluaXRlZCgpKSB7XHJcbiAgICAgICAgICAgIC8vV0UgRE8gTk9UIEhBVkUgTE9CQlkgTU9EVUxFIElOIFRISVMgVkVSU0lPTlxyXG4gICAgICAgICAgICAvL0pVU1QgU0VUIExFVkVMIElEIEhFUkVcclxuICAgICAgICAgICAgLy9UTyBERUxcclxuICAgICAgICAgICAgRG9kUmVzb3VyY2VNZ3IuSW5zdGFuY2Uuc2V0TGV2ZWxJRCgxKTtcclxuICAgICAgICAgICAgUmhvZGVzR2FtZS5JbnN0YW5jZS5zdGF0ZU1nci5ydW5TdGF0ZShHYW1lU3RhdGVJRC5MZXZlbGxvYWQpO1xyXG4gICAgICAgICAgICBEb2RMb2cuZGVidWcoYEdhbWVTdGF0ZUdhbWVsb2FkLnVwZGF0ZTogUmVzb3VyY2VzIGluaXQgY29tcGxldGUsIHNldCBsZXZlbCBpbnRvIDEuIGApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBHYW1lU3RhdGVCYXNlIGZyb20gXCIuL0dhbWVTdGF0ZUJhc2VcIjtcclxuaW1wb3J0IFJob2Rlc0dhbWUgZnJvbSBcIi4uL1Job2Rlc0dhbWVcIjtcclxuaW1wb3J0IHsgR2FtZVN0YXRlSUQgfSBmcm9tIFwiLi9HYW1lU3RhdGVNZ3JcIjtcclxuaW1wb3J0IERvZFJlc291cmNlTWdyIGZyb20gXCIuLi8uLi9SZXNvdXJjZXMvRG9kUmVzb3VyY2VNZ3JcIjtcclxuaW1wb3J0IERvZExvZyBmcm9tIFwiLi4vLi4vQ29tbW9uL0RvZExvZ1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVN0YXRlTGV2ZWxMb2FkIGV4dGVuZHMgR2FtZVN0YXRlQmFzZXtcclxuICAgIGNvbnN0cnVjdG9yKGJhdHRsZSkge1xyXG4gICAgICAgIHN1cGVyKGJhdHRsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudGVyKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmVudGVyKCk7XHJcbiAgICAgICAgdGhpcy5fYmF0dGxlLnByZXBhcmVMZXZlbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsZWF2ZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5sZWF2ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKCk7XHJcbiAgICAgICAgaWYgKHRydWUgPT0gRG9kUmVzb3VyY2VNZ3IuSW5zdGFuY2UuaXNMZXZlbFByZXBhcmVkKCkpIHtcclxuICAgICAgICAgICAgaWYgKHRydWUgPT0gdGhpcy5fYmF0dGxlLmlzTGV2ZWxQcmVwcmFyZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgUmhvZGVzR2FtZS5JbnN0YW5jZS5zdGF0ZU1nci5ydW5TdGF0ZShHYW1lU3RhdGVJRC5CYXR0bGUpO1xyXG4gICAgICAgICAgICAgICAgRG9kTG9nLmRlYnVnKGBHYW1lU3RhdGVMZXZlbGxvYWQudXBkYXRlOiBsZXZlbCBbJHtEb2RSZXNvdXJjZU1nci5JbnN0YW5jZS5nZXRMZXZlbElEKCl9XSBpcyBwcmVwYXJlZC4gYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgR2FtZVN0YXRlQmFzZSBmcm9tIFwiLi9HYW1lU3RhdGVCYXNlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU3RhdGVMb2JieSBleHRlbmRzIEdhbWVTdGF0ZUJhc2V7XHJcbiAgICBjb25zdHJ1Y3RvcihiYXR0bGUpIHtcclxuICAgICAgICBzdXBlcihiYXR0bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnRlcigpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5lbnRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsZWF2ZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5sZWF2ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgR2FtZVN0YXRlQmFzZSBmcm9tIFwiLi9HYW1lU3RhdGVCYXNlXCI7XHJcbmltcG9ydCBHYW1lU3RhdGVCYXR0bGUgZnJvbSBcIi4vR2FtZVN0YXRlQmF0dGxlXCI7XHJcbmltcG9ydCBEb2RMb2cgZnJvbSBcIi4uLy4uL0NvbW1vbi9Eb2RMb2dcIjtcclxuaW1wb3J0IEdhbWVTdGF0ZUxldmVsTG9hZCBmcm9tIFwiLi9HYW1lU3RhdGVMZXZlbGxvYWRcIjtcclxuaW1wb3J0IEdhbWVTdGF0ZUdhbWVsb2FkIGZyb20gXCIuL0dhbWVTdGF0ZUdhbWVsb2FkXCI7XHJcbmltcG9ydCBHYW1lU3RhdGVMb2JieSBmcm9tIFwiLi9HYW1lU3RhdGVMb2JieVwiO1xyXG5pbXBvcnQgUmhvZGVzR2FtZSBmcm9tIFwiLi4vUmhvZGVzR2FtZVwiO1xyXG5pbXBvcnQgR2FtZUJhdHRsZSBmcm9tIFwiLi4vR2FtZUJhdHRsZVwiO1xyXG5cclxuZXhwb3J0IGVudW0gR2FtZVN0YXRlSUQge1xyXG4gICAgTm9uZSxcclxuICAgIEdhbWVsb2FkLFxyXG4gICAgTG9iYnksXHJcbiAgICBMZXZlbGxvYWQsXHJcbiAgICBCYXR0bGUsXHJcbiAgICBDb3VudFxyXG59XHJcblxyXG4vKlxyXG4gKiDlpKfnirbmgIHmnLog566h55CG5ri45oiP5omA5aSE6Zi25q61XHJcbiAqIEBUT0RPIEdBTUVMT0FEIExPQkJZIExFVkVMTE9BRCBCQVRUTEVcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTdGF0ZU1nciB7XHJcbiAgICBwcml2YXRlIF9zdGF0ZXM6IEdhbWVTdGF0ZUJhc2VbXTtcclxuICAgIHByaXZhdGUgX2N1cnJlbnRTdGF0ZTogR2FtZVN0YXRlQmFzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihiYXR0bGU6R2FtZUJhdHRsZSkge1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZSA9IG51bGw7XHJcbiAgICAgICAgLy8gbGV0IGJhdHRsZSA9IFJob2Rlc0dhbWUuSW5zdGFuY2UuYmF0dGxlO1xyXG4gICAgXHJcbiAgICAgICAgdGhpcy5fc3RhdGVzID0gW107XHJcbiAgICAgICAgdGhpcy5fc3RhdGVzLnB1c2gobnVsbCk7XHJcbiAgICAgICAgdGhpcy5fc3RhdGVzLnB1c2gobmV3IEdhbWVTdGF0ZUdhbWVsb2FkKGJhdHRsZSkpO1xyXG4gICAgICAgIHRoaXMuX3N0YXRlcy5wdXNoKG5ldyBHYW1lU3RhdGVMb2JieShiYXR0bGUpKTtcclxuICAgICAgICB0aGlzLl9zdGF0ZXMucHVzaChuZXcgR2FtZVN0YXRlTGV2ZWxMb2FkKGJhdHRsZSkpO1xyXG4gICAgICAgIHRoaXMuX3N0YXRlcy5wdXNoKG5ldyBHYW1lU3RhdGVCYXR0bGUoYmF0dGxlKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBpbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucnVuU3RhdGUoR2FtZVN0YXRlSUQuR2FtZWxvYWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBydW5TdGF0ZShzdGF0ZUlEOiBHYW1lU3RhdGVJRCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChHYW1lU3RhdGVJRC5Db3VudCA8PSBzdGF0ZUlEIHx8IHN0YXRlSUQgPD0gR2FtZVN0YXRlSUQuTm9uZSkge1xyXG4gICAgICAgICAgICBEb2RMb2cuZXJyb3IoYEdhbWVTdGF0ZU1nci5ydW5TdGF0ZTogSW52YWxpZCBzdGF0ZUlEIFske3N0YXRlSUR9XS4gYCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChudWxsICE9IHRoaXMuX2N1cnJlbnRTdGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUubGVhdmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZSA9IHRoaXMuX3N0YXRlc1tzdGF0ZUlEXTtcclxuICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUuZW50ZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChudWxsICE9IHRoaXMuX2N1cnJlbnRTdGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUudXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAobnVsbCAhPSB0aGlzLl9jdXJyZW50U3RhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlLmxlYXZlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3N0YXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLl9zdGF0ZXNbaV07XHJcbiAgICAgICAgICAgIHN0YXRlLnJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEdhbWVDb25maWcgZnJvbSBcIi4vR2FtZUNvbmZpZ1wiO1xyXG5pbXBvcnQgU2NlbmVNYW5hZ2VyIGZyb20gXCIuL1NjZW5lTWFuYWdlclwiO1xyXG5pbXBvcnQgRml4VGltZSBmcm9tIFwiLi9GaXgvRml4VGltZVwiO1xyXG5pbXBvcnQgUmhvZGVzR2FtZSBmcm9tIFwiLi9HYW1lL1Job2Rlc0dhbWVcIjtcclxuaW1wb3J0IHsgRXZlbnRDZW50cmUgfSBmcm9tIFwiLi9FdmVudC9FdmVudENlbnRyZVwiO1xyXG5pbXBvcnQgRG9kUmVzb3VyY2VNZ3IgZnJvbSBcIi4vUmVzb3VyY2VzL0RvZFJlc291cmNlTWdyXCI7XHJcbmltcG9ydCBQZXJmb3JtYW5jZUNlbnRyZSBmcm9tIFwiLi9Db21tb24vR3JhcGhpY3MvUGVyZm9ybWFuY2VfTW9kdWxlL1BlcmZvcm1hbmNlQ2VudHJlXCI7XHJcbmltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi9Db21tb24vRG9kTWF0aFwiO1xyXG5pbXBvcnQgQWN0b3IgZnJvbSBcIi4vR2FtZS9BY3Rvci9BY3RvclwiO1xyXG5pbXBvcnQgeyBBY3RvclR5cGUgfSBmcm9tIFwiLi9Db21tb24vRG9kS2V5XCI7XHJcblxyXG5jbGFzcyBNYWluIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdC8v5qC55o2uSURF6K6+572u5Yid5aeL5YyW5byV5pOOXHRcdFxyXG5cdFx0aWYgKHdpbmRvd1tcIkxheWEzRFwiXSkgTGF5YTNELmluaXQoR2FtZUNvbmZpZy53aWR0aCwgR2FtZUNvbmZpZy5oZWlnaHQpO1xyXG5cdFx0ZWxzZSBMYXlhLmluaXQoR2FtZUNvbmZpZy53aWR0aCwgR2FtZUNvbmZpZy5oZWlnaHQsIExheWFbXCJXZWJHTFwiXSk7XHJcblx0XHRMYXlhW1wiUGh5c2ljc1wiXSAmJiBMYXlhW1wiUGh5c2ljc1wiXS5lbmFibGUoKTtcclxuXHRcdExheWFbXCJEZWJ1Z1BhbmVsXCJdICYmIExheWFbXCJEZWJ1Z1BhbmVsXCJdLmVuYWJsZSgpO1xyXG5cdFx0TGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBHYW1lQ29uZmlnLnNjYWxlTW9kZTtcclxuXHRcdExheWEuc3RhZ2Uuc2NyZWVuTW9kZSA9IEdhbWVDb25maWcuc2NyZWVuTW9kZTtcclxuXHRcdC8v5YW85a655b6u5L+h5LiN5pSv5oyB5Yqg6L29c2NlbmXlkI7nvIDlnLrmma9cclxuXHRcdExheWEuVVJMLmV4cG9ydFNjZW5lVG9Kc29uID0gR2FtZUNvbmZpZy5leHBvcnRTY2VuZVRvSnNvbjtcclxuXHJcblx0XHQvL+aJk+W8gOiwg+ivlemdouadv++8iOmAmui/h0lEReiuvue9ruiwg+ivleaooeW8j++8jOaIluiAhXVybOWcsOWdgOWinuWKoGRlYnVnPXRydWXlj4LmlbDvvIzlnYflj6/miZPlvIDosIPor5XpnaLmnb/vvIlcclxuXHRcdGlmIChHYW1lQ29uZmlnLmRlYnVnIHx8IExheWEuVXRpbHMuZ2V0UXVlcnlTdHJpbmcoXCJkZWJ1Z1wiKSA9PSBcInRydWVcIikgTGF5YS5lbmFibGVEZWJ1Z1BhbmVsKCk7XHJcblx0XHRpZiAoR2FtZUNvbmZpZy5waHlzaWNzRGVidWcgJiYgTGF5YVtcIlBoeXNpY3NEZWJ1Z0RyYXdcIl0pIExheWFbXCJQaHlzaWNzRGVidWdEcmF3XCJdLmVuYWJsZSgpO1xyXG5cdFx0aWYgKEdhbWVDb25maWcuc3RhdCkgTGF5YS5TdGF0LnNob3coKTtcclxuXHRcdExheWEuYWxlcnRHbG9iYWxFcnJvciA9IHRydWU7XHJcblxyXG5cdFx0Ly9HQU1FIElOSVQgKEdMT0JBTCBNT0RVTEUpXHJcblx0XHRjb25zb2xlLmxvZyhcIlBDIGluaXRcIik7XHJcblx0XHRQZXJmb3JtYW5jZUNlbnRyZS5pbml0aWFsaXplKExheWEuc3RhZ2UpO1xyXG5cclxuXHRcdC8vdGVzdFxyXG5cdFx0UGVyZm9ybWFuY2VDZW50cmUuaW5zdGFuY2UuaW5pdEJvYXJkKFtcclxuXHRcdFx0WzAsMCwwLDBdLFxyXG5cdFx0XHRbMCwwLDAsMF1cclxuXHRcdF0sIG5ldyBWZWMyKDUwLDUwKSwgbmV3IFZlYzIoMTAwLDEwMCksIFwiI2ZmMDBmZlwiLCBcIiNmZmZmMDBcIik7XHJcblx0XHQvL3Rlc3QgZW5kXHJcblxyXG5cdFx0Rml4VGltZS5pbml0KCk7XHJcblx0XHRSaG9kZXNHYW1lLkluc3RhbmNlLmluaXQoKTtcclxuXHRcdERvZFJlc291cmNlTWdyLkluc3RhbmNlLmluaXQoKTtcclxuXHRcdEV2ZW50Q2VudHJlLmluaXQoKTtcclxuXHJcblx0XHQvL+a/gOa0u+i1hOa6kOeJiOacrOaOp+WItu+8jHZlcnNpb24uanNvbueUsUlEReWPkeW4g+WKn+iDveiHquWKqOeUn+aIkO+8jOWmguaenOayoeacieS5n+S4jeW9seWTjeWQjue7rea1geeoi1xyXG5cdFx0TGF5YS5SZXNvdXJjZVZlcnNpb24uZW5hYmxlKFwidmVyc2lvbi5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vblZlcnNpb25Mb2FkZWQpLCBMYXlhLlJlc291cmNlVmVyc2lvbi5GSUxFTkFNRV9WRVJTSU9OKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBvblZlcnNpb25Mb2FkZWQoKTogdm9pZCB7XHJcblx0XHQvL+a/gOa0u+Wkp+Wwj+WbvuaYoOWwhO+8jOWKoOi9veWwj+WbvueahOaXtuWAme+8jOWmguaenOWPkeeOsOWwj+WbvuWcqOWkp+WbvuWQiOmbhumHjOmdou+8jOWImeS8mOWFiOWKoOi9veWkp+WbvuWQiOmbhu+8jOiAjOS4jeaYr+Wwj+WbvlxyXG5cdFx0TGF5YS5BdGxhc0luZm9NYW5hZ2VyLmVuYWJsZShcImZpbGVjb25maWcuanNvblwiLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMub25Db25maWdMb2FkZWQpKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBvbkNvbmZpZ0xvYWRlZCgpOiB2b2lkIHtcclxuXHJcblx0XHRcclxuXHJcblx0XHRTY2VuZU1hbmFnZXIuSW5zdGFuY2UuYXdha2UoKTtcclxuXHRcdFxyXG5cclxuXHRcdC8vdGVzdFxyXG5cdFx0RG9kUmVzb3VyY2VNZ3IuSW5zdGFuY2UuaW5pdCgpO1xyXG5cdFx0XHJcblx0XHQvL0F3YWtlIEdhbWUgRW5naW5lIExvb3BcclxuXHRcdExheWEudGltZXIubG9vcCgxNiwgdGhpcywgdGhpcy5fdXBkYXRlKTtcclxuXHRcdFxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBfdXBkYXRlKCk6IHZvaWQge1xyXG5cdFx0Rml4VGltZS51cGRhdGUoKTtcclxuXHRcdFJob2Rlc0dhbWUuSW5zdGFuY2UudXBkYXRlKCk7XHJcblx0XHREb2RSZXNvdXJjZU1nci5JbnN0YW5jZS51cGRhdGUoKTtcclxuXHR9XHJcbn1cclxuXHJcbi8v5r+A5rS75ZCv5Yqo57G7XHJcbm5ldyBNYWluKCk7XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIERvZFJlc291cmNlTWdyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogRG9kUmVzb3VyY2VNZ3I7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBJbnN0YW5jZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2UgfHwgKHRoaXMuX2luc3RhbmNlID0gbmV3IHRoaXMoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPIEDpk7bljY5cclxuICAgIC8vbG9hZCByZXNvdXJjZXMgaGVyZSBpbmNsdWRpbmcgSlNPTiAvIFRFWFRVUkUgLyBBVkFUQVIgLyBTUElORVxyXG4gICAgLy9wcml2YXRlIF9qc29uOiBEb2RKc29uTG9hZGVyO1xyXG4gICAgLy9wcml2YXRlIF90ZXg6IERvZFRleHR1cmVMb2FkZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfbGV2ZWxJRDogbnVtYmVyIHwgbnVsbDtcclxuICAgIHByaXZhdGUgX2luaXRlZDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX2xldmVsUHJlcGFyZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxJRCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5faW5pdGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxQcmVwYXJlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRMZXZlbElEKGlkOiBudW1iZXIgfCBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxJRCA9IGlkO1xyXG4gICAgICAgIHRoaXMuX2xldmVsUHJlcGFyZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TGV2ZWxJRCgpOiBudW1iZXIgfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGV2ZWxJRDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdCgpOiB2b2lkIHtcclxuICAgICAgICAvL1RPRE8gTE9BRFxyXG4gICAgICAgIC8vdGhpcy5fanNvbi5sb2FkKCk7XHJcbiAgICAgICAgLy90aGlzLl90ZXgubG9hZCgpO1xyXG4gICAgICAgIC8vc2V0IGluaXRlZCBmbGFnIHRydWUgd2hpbGUgaW5pdGlhbGl6YXRpb24gY29tcGxldGVcclxuICAgICAgICB0aGlzLl9pbml0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luaXRlZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChudWxsICE9IHRoaXMuc2V0TGV2ZWxJRCAmJiBmYWxzZSA9PSB0aGlzLl9sZXZlbFByZXBhcmVkKSB7XHJcbiAgICAgICAgICAgIC8vcHJlcGFyZSBwcmVmYWIgaGVyZVxyXG4gICAgICAgICAgICBpZiAoMSkgeyAgICAvL21ha2Ugc3VyZSBwcmVmYWIgcHJlcGFyZWRcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xldmVsUHJlcGFyZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0xldmVsUHJlcGFyZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xldmVsUHJlcGFyZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEN1cnJlbnRMZXZlbFJlcygpOiBhbnkge1xyXG4gICAgICAgIC8vVE9ET1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRBY3RvclJlc0J5SUQoaWQ6IG51bWJlcik6IGFueSB7XHJcbiAgICAgICAgLy9UT0RPXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbn0iLCIvLyBpbXBvcnQgRXZlbnRDZW50cmUgZnJvbSBcIi4vVG95Ym94L0V2ZW50Q2VudHJlXCI7XHJcbi8vIGltcG9ydCBEYXRhYmFzZSBmcm9tIFwiLi9Ub3lib3gvRGF0YWJhc2VcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjZW5lTWFuYWdlcntcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogU2NlbmVNYW5hZ2VyO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSW5zdGFuY2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlIHx8ICh0aGlzLl9pbnN0YW5jZSA9IG5ldyB0aGlzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgbG9hZGluZ1NjZW5lOnN0cmluZyA9IFwiTG9hZGluZ1NjZW5lLnNjZW5lXCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGdhbWVTY2VuZTpzdHJpbmcgPSBcIkdhbWVTY2VuZS5zY2VuZVwiO1xyXG5cclxuICAgIHB1YmxpYyBhd2FrZSgpOiB2b2lkIHtcclxuICAgICAgICBMYXlhLlNjZW5lLm9wZW4odGhpcy5nYW1lU2NlbmUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IHt1aX0gZnJvbSBcIi4uL3VpL2xheWFNYXhVSVwiO1xyXG5pbXBvcnQgUmhvZGVzR2FtZSBmcm9tIFwiLi4vR2FtZS9SaG9kZXNHYW1lXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSBleHRlbmRzIHVpLkdhbWVTY2VuZVVJIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgVUlTZXQ6IExheWEuU3ByaXRlO1xyXG4gICAgcHVibGljIHN0YXRpYyBzdGFnZTogTGF5YS5TdGFnZTtcclxuICAgIHByaXZhdGUgX3BhdXNlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgLy/lhajlsYDmlbDmja7vvIjmlbDmja7lupPnsbvlrozmiJDlkI7lsIbooqvmm7/ku6PvvIlcclxuICAgIHB1YmxpYyBzdGF0aWMgZnJhbWVMZW5ndGg6IG51bWJlciA9IDIwOy8v5bin6ZW/5bqmXHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHt1aX0gZnJvbSBcIi4uL3VpL2xheWFNYXhVSVwiXHJcblxyXG5cclxuLy9UT1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkaW5nIGV4dGVuZHMgdWkuTG9hZGluZ1NjZW5lVUl7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKClcclxuICAgIH1cclxufSIsIi8qKlRoaXMgY2xhc3MgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgTGF5YUFpcklERSwgcGxlYXNlIGRvIG5vdCBtYWtlIGFueSBtb2RpZmljYXRpb25zLiAqL1xuaW1wb3J0IFZpZXc9TGF5YS5WaWV3O1xyXG5pbXBvcnQgRGlhbG9nPUxheWEuRGlhbG9nO1xyXG5pbXBvcnQgU2NlbmU9TGF5YS5TY2VuZTtcbnZhciBSRUc6IEZ1bmN0aW9uID0gTGF5YS5DbGFzc1V0aWxzLnJlZ0NsYXNzO1xuZXhwb3J0IG1vZHVsZSB1aSB7XHJcbiAgICBleHBvcnQgY2xhc3MgR2FtZVNjZW5lVUkgZXh0ZW5kcyBTY2VuZSB7XHJcblx0XHRwdWJsaWMgVUlTZXQ6TGF5YS5TcHJpdGU7XG5cdFx0cHVibGljIFNpZGVCYXI6TGF5YS5TcHJpdGU7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJHYW1lU2NlbmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkuR2FtZVNjZW5lVUlcIixHYW1lU2NlbmVVSSk7XHJcbiAgICBleHBvcnQgY2xhc3MgTG9hZGluZ1NjZW5lVUkgZXh0ZW5kcyBTY2VuZSB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkxvYWRpbmdTY2VuZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS5Mb2FkaW5nU2NlbmVVSVwiLExvYWRpbmdTY2VuZVVJKTtcclxufVxyIl19
