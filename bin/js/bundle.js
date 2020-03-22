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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xheWEvTGF5YUFpcklERS9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQ29tbW9uL0RvZERhdGFTdHJ1Y3R1cmUudHMiLCJzcmMvQ29tbW9uL0RvZEtleS50cyIsInNyYy9Db21tb24vRG9kTG9nLnRzIiwic3JjL0NvbW1vbi9Eb2RNYXRoLnRzIiwic3JjL0NvbW1vbi9HcmFwaGljcy9QZXJmb3JtYW5jZV9Nb2R1bGUvQWN0b3JDb21wb25lbnQudHMiLCJzcmMvQ29tbW9uL0dyYXBoaWNzL1BlcmZvcm1hbmNlX01vZHVsZS9QZXJmb3JtYW5jZUNlbnRyZS50cyIsInNyYy9Db21tb24vR3JhcGhpY3MvUGVyZm9ybWFuY2VfTW9kdWxlL1N5bWJvbGl6ZWRSZW5kZXIudHMiLCJzcmMvQ29tbW9uL0dyYXBoaWNzL1BlcmZvcm1hbmNlX01vZHVsZS9VbnN5bWJvbGl6ZWRSZW5kZXIudHMiLCJzcmMvQ29tbW9uL0dyYXBoaWNzL1BlcmZvcm1hbmNlX01vZHVsZS9jdXN0b21pemVkU3ByLnRzIiwic3JjL0NvbW1vbi9HcmFwaGljcy9QZXJmb3JtYW5jZV9Nb2R1bGUvb2JqYm94LnRzIiwic3JjL0V2ZW50L0V2ZW50Q2VudHJlLnRzIiwic3JjL0ZpeC9GaXhSZWN0LnRzIiwic3JjL0ZpeC9GaXhTeW1ib2wudHMiLCJzcmMvRml4L0ZpeFRpbWUudHMiLCJzcmMvR2FtZUNvbmZpZy50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yLnRzIiwic3JjL0dhbWUvQWN0b3IvQWN0b3JNZ3IudHMiLCJzcmMvR2FtZS9BY3Rvci9BY3Rvck1vZHVsZXMvQWN0b3JCdWZmTWdyLnRzIiwic3JjL0dhbWUvQWN0b3IvQWN0b3JNb2R1bGVzL0FjdG9yQ29zdC50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yTW9kdWxlcy9BY3RvclNraWxsLnRzIiwic3JjL0dhbWUvQWN0b3IvQWN0b3JNb2R1bGVzL0FuaW1hdGlvbi50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yTW9kdWxlcy9Db2xpTWVzc2FnZS50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yTW9kdWxlcy9EYW1hZ2UudHMiLCJzcmMvR2FtZS9BY3Rvci9BY3Rvck1vZHVsZXMvUHJvZmlsZS50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yTW9kdWxlcy9UcmFuc2Zvcm0udHMiLCJzcmMvR2FtZS9BY3Rvci9BY3Rvck1vZHVsZXMvVW5pdFJlbmRlci50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yUm91dGUudHMiLCJzcmMvR2FtZS9BY3Rvci9BdHRhY2svQXRrQWJzdC50cyIsInNyYy9HYW1lL0FjdG9yL0F0dGFjay9CbG9ja2VyLnRzIiwic3JjL0dhbWUvQWN0b3IvQXR0YWNrL01hcE5vZGVTZWVrZXIudHMiLCJzcmMvR2FtZS9BY3Rvci9TdGF0ZS9BY3RvclN0YXRlQmFzZS50cyIsInNyYy9HYW1lL0FjdG9yL1N0YXRlL0FjdG9yU3RhdGVGaWdodC50cyIsInNyYy9HYW1lL0FjdG9yL1N0YXRlL0FjdG9yU3RhdGVGc20udHMiLCJzcmMvR2FtZS9BY3Rvci9TdGF0ZS9BY3RvclN0YXRlUHJlcGFyZWQudHMiLCJzcmMvR2FtZS9BY3Rvci9TdGF0ZS9BY3RvclN0YXRlV2Fsay50cyIsInNyYy9HYW1lL0NvbGxpc2lvbi9BY3RvckNvbGxpc2lvblByb2Nlc3Nvci50cyIsInNyYy9HYW1lL0NvbGxpc2lvbi9Db2xpUmVwb3J0ZXIudHMiLCJzcmMvR2FtZS9HYW1lQmF0dGxlLnRzIiwic3JjL0dhbWUvR2FtZUJhdHRsZUNvbnN0LnRzIiwic3JjL0dhbWUvR2FtZUxldmVsLnRzIiwic3JjL0dhbWUvUmhvZGVzR2FtZS50cyIsInNyYy9HYW1lL1N0YXRlL0dhbWVTdGF0ZUJhc2UudHMiLCJzcmMvR2FtZS9TdGF0ZS9HYW1lU3RhdGVCYXR0bGUudHMiLCJzcmMvR2FtZS9TdGF0ZS9HYW1lU3RhdGVHYW1lbG9hZC50cyIsInNyYy9HYW1lL1N0YXRlL0dhbWVTdGF0ZUxldmVsbG9hZC50cyIsInNyYy9HYW1lL1N0YXRlL0dhbWVTdGF0ZUxvYmJ5LnRzIiwic3JjL0dhbWUvU3RhdGUvR2FtZVN0YXRlTWdyLnRzIiwic3JjL01haW4udHMiLCJzcmMvUmVzb3VyY2VzL0RvZFJlc291cmNlTWdyLnRzIiwic3JjL1NjZW5lTWFuYWdlci50cyIsInNyYy9TY2VuZVNjcmlwdC9HYW1lLnRzIiwic3JjL1NjZW5lU2NyaXB0L0xvYWRpbmcudHMiLCJzcmMvdWkvbGF5YU1heFVJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ05BO0lBQUE7UUFDWSxVQUFLLEdBQU8sRUFBRSxDQUFDO0lBYTNCLENBQUM7SUFaVSxxQkFBSSxHQUFYLFVBQVksR0FBVSxFQUFFLEtBQU87UUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDNUIsQ0FBQztJQUNNLHFCQUFJLEdBQVgsVUFBWSxHQUFVO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRU0sd0JBQU8sR0FBZCxVQUFlLENBQXNCO1FBQ2pDLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUN0QixDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN2QjtJQUNMLENBQUM7SUFDTCxhQUFDO0FBQUQsQ0FkQSxBQWNDLElBQUE7QUFkWSx3QkFBTTtBQWlCbkI7SUFHSSxjQUFZLElBQU0sRUFBRSxJQUFZO1FBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFDTCxXQUFDO0FBQUQsQ0FQQSxBQU9DLElBQUE7QUFFRDtJQUlJO1FBRFEsWUFBTyxHQUFVLENBQUMsQ0FB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QVEsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JGLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUM7SUFHbkMsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNLLHlCQUFPLEdBQWYsVUFBZ0IsSUFBYSxFQUFFLEdBQVEsRUFBRSxJQUFTLEVBQUMsS0FBWTtRQUMzRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksY0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksY0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQztRQUM1RSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksY0FBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBQyxD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SSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBQ0wsa0JBQUM7SUFBRCxDQVJBLEFBUUMsQ0FSZ0MsS0FBSyxHQVFyQztJQVJZLGNBQVcsY0FRdkIsQ0FBQTtJQUNELEdBQUcsQ0FBQyxnQkFBZ0IsRUFBQyxXQUFXLENBQUMsQ0FBQztJQUNsQztRQUFvQyxrQ0FBSztRQUNyQzttQkFBZSxpQkFBTztRQUFBLENBQUM7UUFDdkIsdUNBQWMsR0FBZDtZQUNJLGlCQUFNLGNBQWMsV0FBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUNMLHFCQUFDO0lBQUQsQ0FOQSxBQU1DLENBTm1DLEtBQUssR0FNeEM7SUFOWSxpQkFBYyxpQkFNMUIsQ0FBQTtJQUNELEdBQUcsQ0FBQyxtQkFBbUIsRUFBQyxjQUFjLENBQUMsQ0FBQztBQUM1QyxDQUFDLEVBbkJhLEVBQUUsR0FBRixVQUFFLEtBQUYsVUFBRSxRQW1CZiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgeyBDb21wYXJhYmxlIH0gZnJvbSBcIi4vRG9kTWF0aFwiO1xyXG5cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgS1ZQYWlyPFY+e1xyXG4gICAgcHJpdmF0ZSBfbGlzdDphbnkgPSB7fTtcclxuICAgIHB1YmxpYyBlZGl0KGtleTpzdHJpbmcsIHZhbHVlOlYpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fbGlzdFtrZXldID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmVhZChrZXk6c3RyaW5nKTpWe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9saXN0W2tleV07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBpdGVyYXRlKGY6KGs6c3RyaW5nLHY6Vik9PnZvaWQpOnZvaWR7XHJcbiAgICAgICAgZm9yIChsZXQgayBpbiB0aGlzLl9saXN0KSB7XHJcbiAgICAgICAgICAgIGYoaywgdGhpcy5fbGlzdFtrXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuY2xhc3MgTm9kZTxFPntcclxuICAgIHB1YmxpYyBpdGVtOkU7XHJcbiAgICBwdWJsaWMgbmV4dDpOb2RlPEU+O1xyXG4gICAgY29uc3RydWN0b3IoaXRlbTpFLCBuZXh0Ok5vZGU8RT4pe1xyXG4gICAgICAgIHRoaXMuaXRlbSA9IGl0ZW07XHJcbiAgICAgICAgdGhpcy5uZXh0ID0gbmV4dDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIExpbmtMaXN0PEU+e1xyXG4gICAgcHJpdmF0ZSBfaGVhZDpOb2RlPEU+O1xyXG4gICAgcHJpdmF0ZSBfdGFpbDpOb2RlPEU+O1xyXG4gICAgcHJpdmF0ZSBfbGVuZ3RoOm51bWJlciA9IDA7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuX2hlYWQgPSBuZXcgTm9kZTxFPihudWxsLCBudWxsKTtcclxuICAgICAgICB0aGlzLl90YWlsID0gbmV3IE5vZGU8RT4obnVsbCwgbnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ln7rnoYDlsZ7mgKdcclxuICAgIHB1YmxpYyBnZXQgbGVuZ3RoKCk6bnVtYmVye1xyXG4gICAgICAgIC8vIGxldCByZXN1bHQ6bnVtYmVyID0gMDtcclxuICAgICAgICAvLyBsZXQgY3VycmVudDpOb2RlPEU+ID0gdGhpcy5faGVhZDtcclxuICAgICAgICAvLyB3aGlsZSAoY3VycmVudC5uZXh0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgLy8gICAgIHJlc3VsdCArPSAxO1xyXG4gICAgICAgIC8vICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpc0VtcHR5KCk6Ym9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5faGVhZC5uZXh0ID09PSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5aKe5Yig5pS55p+lXHJcbiAgICAvL+WinlxyXG4gICAgcHVibGljIHB1c2goaXRlbTpFKTp2b2lke1xyXG4gICAgICAgIGxldCBsYXN0Ok5vZGU8RT4gPSBuZXcgTm9kZTxFPihpdGVtLCBudWxsKTtcclxuICAgICAgICBpZiAodGhpcy5pc0VtcHR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2hlYWQubmV4dCA9IGxhc3Q7XHJcbiAgICAgICAgICAgIHRoaXMuX3RhaWwubmV4dCA9IGxhc3Q7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0Lm5leHQgPSBsYXN0O1xyXG4gICAgICAgICAgICB0aGlzLl90YWlsLm5leHQgPSBsYXN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9sZW5ndGggKz0gMTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdW5zaGlmdChpdGVtOkUpOnZvaWR7XHJcbiAgICAgICAgbGV0IGZpcnN0Ok5vZGU8RT4gPSBuZXcgTm9kZTxFPihpdGVtLCBudWxsKTtcclxuICAgICAgICBpZiAodGhpcy5pc0VtcHR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RhaWwubmV4dCA9IGZpcnN0O1xyXG4gICAgICAgICAgICB0aGlzLl9oZWFkLm5leHQgPSBmaXJzdDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmaXJzdC5uZXh0ID0gdGhpcy5faGVhZC5uZXh0O1xyXG4gICAgICAgICAgICB0aGlzLl9oZWFkLm5leHQgPSBmaXJzdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbGVuZ3RoICs9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluc2VydChpbmRleDpudW1iZXIsIGl0ZW06RSk6Ym9vbGVhbntcclxuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID4gdGhpcy5fbGVuZ3RoKSB7Ly/ov5nlj6XkuI3kuIDmoLdcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGluZGV4ID09PSB0aGlzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGN1cnJlbnQ6Tm9kZTxFPiA9IHRoaXMuX2hlYWQ7Ly/ov5nlj6Xlkozlhbbku5bpgY3ljobmmK/kuI3kuIDmoLfnmoTvvIzlm6DkuLropoHpgInlj5bliLDpgInlrprkvY3nva7nmoTliY3pnaLkuIDmoLxcclxuICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IGluZGV4OyBuICs9IDEpIHtcclxuICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGN1cnJlbnQubmV4dCA9IG5ldyBOb2RlPEU+KGl0ZW0sIGN1cnJlbnQubmV4dCk7XHJcbiAgICAgICAgdGhpcy5fbGVuZ3RoICs9IDE7XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5YigXHJcbiAgICBwdWJsaWMgcmVtb3ZlKGluZGV4Om51bWJlcik6RXtcclxuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGN1cnJlbnQ6Tm9kZTxFPiA9IHRoaXMuX2hlYWQubmV4dDtcclxuICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IGluZGV4OyBuICs9IDEpIHtcclxuICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBpdGVtOkUgPSBjdXJyZW50Lml0ZW07XHJcbiAgICAgICAgY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fbGVuZ3RoIC09IDE7XHJcblxyXG4gICAgICAgIHJldHVybiBjdXJyZW50Lml0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNoaWZ0KCk6RXtcclxuICAgICAgICBpZiAodGhpcy5pc0VtcHR5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLl9oZWFkLm5leHQuaXRlbTtcclxuICAgICAgICB0aGlzLl9oZWFkLm5leHQgPSB0aGlzLl9oZWFkLm5leHQubmV4dDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbXB0eSkge1xyXG4gICAgICAgICAgICB0aGlzLl90YWlsLm5leHQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fbGVuZ3RoIC09IDE7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgLy/mlLlcclxuICAgIHB1YmxpYyB3cml0ZShpbmRleDpudW1iZXIsIGl0ZW06RSk6dm9pZHtcclxuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjdXJyZW50Ok5vZGU8RT4gPSB0aGlzLl9oZWFkLm5leHQ7XHJcbiAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBpbmRleDsgbiArPSAxKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjdXJyZW50Lml0ZW0gPSBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5p+lXHJcbiAgICBwdWJsaWMgcmVhZChpbmRleDpudW1iZXIpOkV7XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY3VycmVudDpOb2RlPEU+ID0gdGhpcy5faGVhZC5uZXh0O1xyXG4gICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgaW5kZXg7IG4gKz0gMSkge1xyXG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQuaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VhcmNoKGl0ZW06RSk6bnVtYmVyW117XHJcbiAgICAgICAgbGV0IHJlc3VsdDpudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgIHRoaXMuZm9yZWFjaCgoZWxlOkUsIGluZGV4Om51bWJlcik9PntcclxuICAgICAgICAgICAgaWYgKGVsZSA9PT0gaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goaW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWremTvuihqOS4reaYr+WQpuWtmOWcqOafkOS4gOWFg+e0oFxyXG4gICAgICogQHBhcmFtIGl0ZW0gXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoYXMoaXRlbTogRSk6Ym9vbGVhbntcclxuXHJcbiAgICAgICAgbGV0IGN1cnJlbnQgPSB0aGlzLl9oZWFkLm5leHQ7XHJcbiAgICAgICAgd2hpbGUgKGN1cnJlbnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudC5pdGVtID09IGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy/pq5jpmLblh73mlbBcclxuICAgIHB1YmxpYyBmb3JlYWNoKGY6KGVsZTpFLCBpbmRleDpudW1iZXIsIGxpc3Q6TGlua0xpc3Q8RT4pPT52b2lkKTp2b2lke1xyXG4gICAgICAgIGxldCBjdXJyZW50ID0gdGhpcy5faGVhZC5uZXh0O1xyXG4gICAgICAgIGxldCBudW06bnVtYmVyID0gMDtcclxuICAgICAgICB3aGlsZSAoY3VycmVudCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBmKGN1cnJlbnQuaXRlbSwgbnVtLCB0aGlzKTtcclxuICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcclxuICAgICAgICAgICAgbnVtICs9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K+35pqC5pe25LiN6KaB5L2/55So6L+Z5Liq5Ye95pWw77yM5Zug5Li65oiR5Lmf5LiN55+l6YGT5a6D5Lya5LiN5Lya54iG54K4XHJcbiAgICAgKiDpmaTpnZ7kvaDor7vov4fov5nkuKrlh73mlbDnmoTmupDku6PnoIFcclxuICAgICAqIEBwYXJhbSBmIOWIpOaWreWFg+e0oOS8mOWFiOe6p+eahOWbnuiwg+WHveaVsFxyXG4gICAgICogQHBhcmFtIGluY3JlYXNlIOaYr+WQpuWNh+W6j++8jOm7mOiupOWNh+W6j1xyXG4gICAgICogQHJldHVybnMg6L+U5Zue5LiA5Liq5o6S5bqP55qE6ZO+6KGoXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzb3J0YnkoZjooZWxlOkUpPT5udW1iZXIsIGluY3JlYXNlOmJvb2xlYW4gPSB0cnVlKTpMaW5rTGlzdDxFPntcclxuICAgICAgICBsZXQgcHJpb3JpdHk6TGlua0xpc3Q8bnVtYmVyPiA9IG5ldyBMaW5rTGlzdDxudW1iZXI+KCk7XHJcbiAgICAgICAgbGV0IHNvcnRlZDpMaW5rTGlzdDxFPiA9IG5ldyBMaW5rTGlzdDxFPigpO1xyXG4gICAgICAgIHByaW9yaXR5LnB1c2goLTApO1xyXG4gICAgICAgIHNvcnRlZC5wdXNoKG51bGwpO1xyXG5cclxuICAgICAgICBsZXQgY29tcGFyZTooYTpudW1iZXIsYjpudW1iZXIpPT5ib29sZWFuID0gaW5jcmVhc2U/KGEsYik9PntyZXR1cm4gYSA8IGI7fTooYSxiKT0+e3JldHVybiBhID4gYn07XHJcblxyXG4gICAgICAgIHRoaXMuZm9yZWFjaCgoZWxlKT0+e1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFByaSA9IGYoZWxlKTtcclxuICAgICAgICAgICAgbGV0IG5vZGU6Tm9kZTxFPiA9IHNvcnRlZC5faGVhZC5uZXh0O1xyXG4gICAgICAgICAgICBsZXQgcHJpTm9kZTpOb2RlPG51bWJlcj4gPSBwcmlvcml0eS5faGVhZC5uZXh0O1xyXG5cclxuICAgICAgICAgICAgbGV0IGZvdW5kUGxhY2U6Ym9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB3aGlsZSAobm9kZS5uZXh0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoY3VycmVudFByaSA8IHByaU5vZGUubmV4dC5pdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcGFyZShjdXJyZW50UHJpLCBwcmlOb2RlLm5leHQuaXRlbSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLm5leHQgPSBuZXcgTm9kZTxFPihlbGUsIG5vZGUubmV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJpTm9kZS5uZXh0ID0gbmV3IE5vZGU8bnVtYmVyPihjdXJyZW50UHJpLCBwcmlOb2RlLm5leHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvdW5kUGxhY2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlLm5leHQ7XHJcbiAgICAgICAgICAgICAgICBwcmlOb2RlID0gcHJpTm9kZS5uZXh0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIWZvdW5kUGxhY2UpIHtcclxuICAgICAgICAgICAgICAgIHNvcnRlZC5wdXNoKGVsZSk7XHJcbiAgICAgICAgICAgICAgICBwcmlvcml0eS5wdXNoKGN1cnJlbnRQcmkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNvcnRlZC5zaGlmdCgpO1xyXG4gICAgICAgIHJldHVybiBzb3J0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcHVibGljIGJiU29ydEJ5KGY6KGVsZTpFKT0+bnVtYmVyLCBpbmNyZWFzZTpib29sZWFuID0gdHJ1ZSk6TGlua0xpc3Q8RT57XHJcblxyXG4gICAgLy8gfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBBcnJheTxFPntcclxuICAgIHB1YmxpYyBhcnI6RVtdO1xyXG4gICAgcHVibGljIHBvaW50ZXI6bnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNvdXJjZTpFW10gPSBbXSwgaW5pdFBvaW50Om51bWJlciA9IC0xKXtcclxuICAgICAgICB0aGlzLmFyciA9IHNvdXJjZTtcclxuICAgICAgICB0aGlzLnBvaW50ZXIgPSBpbml0UG9pbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlYWQoKTpFe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFyclt0aGlzLnBvaW50ZXJdO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgc3RlcCgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5wb2ludGVyICs9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBvdXQoKTpib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvaW50ZXIgPCAwIHx8IHRoaXMucG9pbnRlciA+PSB0aGlzLmFyci5sZW5ndGg7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEFycmF5QWxnb3tcclxuXHJcbiAgICAvKipcclxuICAgICAqIOi+k+WFpeeahOS4pOS4quaVsOe7hOeahOavj+S4qmluZGV45a+55bqU5YWD57Sg5piv5ZCm55u4562JXHJcbiAgICAgKiBAcGFyYW0gYXJyMCBcclxuICAgICAqIEBwYXJhbSBhcnIxIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHN0cmljdENvbXBhcmUoYXJyMDpDb21wYXJhYmxlW10sIGFycjE6Q29tcGFyYWJsZVtdKTpib29sZWFue1xyXG4gICAgICAgIGlmIChhcnIwLmxlbmd0aCAhPT0gYXJyMS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycjAubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICAgICAgaWYgKCFhcnIwW2ldLmVxdWFscyhhcnIxW2ldKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuS4gOS4qumbhuWQiGPvvIzkuJTkvb/lvpflroPlhbfmnInlpoLkuIvmgKfotKjvvJpcclxuICAgICAqIOWvueS6juavj+S4quWtmOWcqOS6jumbhuWQiGHkuK3nmoTlhYPntKDvvIzlpoLmnpzlroPkuI3lnKjpm4blkIhi5Lit77yM5YiZ5a6D5Zyo6ZuG5ZCIY+S4rVxyXG4gICAgICog5Y2zYz1hLWJcclxuICAgICAqIEBwYXJhbSBhIFxyXG4gICAgICogQHBhcmFtIGIgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZmluZENvbXBsZW1lbnRTZXQoYTpDb21wYXJhYmxlW10sIGI6Q29tcGFyYWJsZVtdKTpDb21wYXJhYmxlW117XHJcbiAgICAgICAgbGV0IHJlc3VsdDpDb21wYXJhYmxlW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBlbGUgb2YgYSkge1xyXG4gICAgICAgICAgICBpZiAoQXJyYXlBbGdvLmZpbmRFbGUoZWxlLCBiKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGVsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8v5rGC55u45a+56KGl6ZuGYS1iXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuS4gOS4qumbhuWQiGPvvIzkuJTkvb/lvpflroPlhbfmnInlpoLkuIvmgKfotKjvvJpcclxuICAgICAqIOWvueS6juavj+S4quWtmOWcqOS6jumbhuWQiGHkuK3nmoTlhYPntKDvvIzlpoLmnpzlroPkuI3lnKjpm4blkIhi5Lit77yM5YiZ5a6D5Zyo6ZuG5ZCIY+S4rVxyXG4gICAgICog5Y2zYz1hLWJcclxuICAgICAqIFxyXG4gICAgICog5rOo5oSP77ya55uu5YmN5aaC5p6cYeS4reWtmOWcqOS4pOS4quWFg+e0oEvvvIxi5Lit5a2Y5Zyo5LiA5Liq5YWD57SgS++8jOe7k+aenOS4reeahGPkuI3kvJrlrZjlnKjlhYPntKBLXHJcbiAgICAgKiDlj6ropoFi5Lit5a2Y5Zyo5LiA5Liq5bCx5Lya5oqKYemHjOeahOWFqOmDqOWHj+aOiVxyXG4gICAgICogQHBhcmFtIGEgXHJcbiAgICAgKiBAcGFyYW0gYiBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBmaW5kQ29tcFNldChhOmFueVtdLCBiOmFueVtdKTphbnlbXSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdDpDb21wYXJhYmxlW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBlbGUgb2YgYSkge1xyXG4gICAgICAgICAgICBpZiAoYi5pbmRleE9mKGEpID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZWxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy/msYLnm7jlr7nooaXpm4ZhLWJcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZmluZEludGVyc2VjdGlvblNldChhOkNvbXBhcmFibGVbXSwgYjpDb21wYXJhYmxlW10pe1xyXG4gICAgICAgIC8v5rGC5Lqk6ZuGYeKIqWJcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi+k+WFpeS4gOS4quaVsOe7hO+8jOi/lOWbnuWwhumHjeWkjeWFg+e0oOWIoOmZpOWQjueahOaWsOaVsOe7hFxyXG4gICAgICog5LiN5pS55Yqo5Y6f5pWw57uEXHJcbiAgICAgKiDlpJrkuKrlhYPntKDku4Xlj5bpppbkuKpcclxuICAgICAqIEBwYXJhbSBsaXN0IFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHNocmluayhsaXN0OmFueVtdKTphbnlbXXtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gW107XHJcblxyXG4gICAgICAgIGxpc3QuZm9yRWFjaChlbGU9PntcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5pbmRleE9mKGVsZSkgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGVsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaxgmVsZeWcqGFycuS4reeahGluZGV477yM6Iul5pyq5om+5Yiw5YiZ6L+U5ZueLTFcclxuICAgICAqIGVsZeW/hemhu+WunueOsGNvbXBhcmFibGXmjqXlj6NcclxuICAgICAqIEBwYXJhbSBlbGUgXHJcbiAgICAgKiBAcGFyYW0gYXJyIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGZpbmRFbGUoZWxlOkNvbXBhcmFibGUsIGFycjpDb21wYXJhYmxlW10pOm51bWJlcntcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICBpZiAoZWxlLmVxdWFscyhhcnJbaV0pKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDku45hcnLkuK3np7vpmaRlbGVcclxuICAgICAqIOWmguaenGVsZeS4jeWtmOWcqOWImeS7gOS5iOmDveS4jeWBmlxyXG4gICAgICogQHBhcmFtIGVsZSBcclxuICAgICAqIEBwYXJhbSBhcnIgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVtb3ZlRWxlKGVsZTphbnksIGFycjphbnlbXSk6YW55W117XHJcbiAgICAgICAgY29uc3QgaSA9IGFyci5pbmRleE9mKGVsZSk7XHJcbiAgICAgICAgaWYgKGkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIGFyci5zcGxpY2UoaSwxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycjtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuLy8gZXhwb3J0IGNsYXNzIEJveCBleHRlbmRzIExheWEuUmVjdGFuZ2xle1xyXG5cclxuLy8gICAgIHB1YmxpYyB1bml0WDpudW1iZXI7XHJcbi8vICAgICBwdWJsaWMgdW5pdFk6bnVtYmVyO1xyXG4gICAgXHJcblxyXG4vLyAgICAgY29uc3RydWN0b3IoKXtcclxuLy8gICAgICAgICBzdXBlcigwLDAsMCwwKTtcclxuLy8gICAgIH1cclxuICAgXHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiDlsLHmmK/igKbigKbmnaXkuIDnu4TvvIgxMDDkuKrvvInpmo/mnLrnmoTnorDmkp7nrrFcclxuLy8gICAgICAqIEBwYXJhbSB4UmFuZ2UgXHJcbi8vICAgICAgKiBAcGFyYW0geVJhbmdlIFxyXG4vLyAgICAgICogQHBhcmFtIHdpZFJhbmdlIFxyXG4vLyAgICAgICogQHBhcmFtIGhpZ1JhbmdlXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHB1YmxpYyBzdGF0aWMgcmFuZG9tQm94ZXMoeFJhbmdlOm51bWJlciA9IDEyMDAsIHlSYW5nZTpudW1iZXIgPSA4MDAsIHdpZFJhbmdlOm51bWJlciA9IDMwMCwgaGlnUmFuZ2U6bnVtYmVyID0gMzAwKTpCb3hbXXtcclxuLy8gICAgICAgICBjb25zdCByYWQ6RnVuY3Rpb24gPSBNeU1hdGgucmFuZG9tSW50O1xyXG4vLyAgICAgICAgIGxldCByZXN1bHQ6Qm94W10gPSBbXTtcclxuLy8gICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgNTA7IGkgKz0gMSkge1xyXG4vLyAgICAgICAgICAgICByZXN1bHQucHVzaChuZXcgQm94KCkpO1xyXG4vLyAgICAgICAgICAgICByZXN1bHRbaV0ucG9zKHJhZCh4UmFuZ2UpLCByYWQoeVJhbmdlKSkuc2l6ZShyYWQod2lkUmFuZ2UpLCByYWQoaGlnUmFuZ2UpKTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBwdWJsaWMgcG9zKHg6bnVtYmVyLCB5Om51bWJlcik6Qm94e1xyXG4vLyAgICAgICAgIHRoaXMueCA9IHg7XHJcbi8vICAgICAgICAgdGhpcy55ID0geTtcclxuLy8gICAgICAgICByZXR1cm4gdGhpcztcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBwdWJsaWMgc2l6ZSh3aWR0aDpudW1iZXIsIGhlaWdodDpudW1iZXIpOkJveHtcclxuLy8gICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbi8vICAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbi8vICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgcHVibGljIGludGVyc2VjdHNfWChyZWM6Qm94KTpib29sZWFue1xyXG4vLyAgICAgICAgIGlmICh0aGlzLnggPCByZWMueCkge1xyXG4vLyAgICAgICAgICAgICByZXR1cm4gcmVjLmludGVyc2VjdHNfWCh0aGlzKTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcmV0dXJuICAodGhpcy54ID49IHJlYy54ICYmIHRoaXMueCA8PSByZWMucmlnaHQpIHx8XHJcbi8vICAgICAgICAgICAgICAgICAodGhpcy5yaWdodCA+PSByZWMueCAmJiB0aGlzLnJpZ2h0IDw9IHJlYy5yaWdodClcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBwdWJsaWMgaW50ZXJzZWN0c19ZKHJlYzpCb3gpOmJvb2xlYW57XHJcbi8vICAgICAgICAgaWYgKHRoaXMueTxyZWMueSkge1xyXG4vLyAgICAgICAgICAgICByZXR1cm4gcmVjLmludGVyc2VjdHNfWSh0aGlzKTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcmV0dXJuICAodGhpcy55ID49IHJlYy55ICYmIHRoaXMueSA8PSByZWMuYm90dG9tKSB8fFxyXG4vLyAgICAgICAgICAgICAgICAgKHRoaXMuYm90dG9tID49IHJlYy55ICYmIHRoaXMuYm90dG9tIDw9IHJlYy5ib3R0b20pXHJcbi8vICAgICB9XHJcbi8vIH1cclxuICAgIFxyXG4vLyBjbGFzcyBNYXBOb2RlPEssVj57XHJcbi8vICAgICBwdWJsaWMga2V5O1xyXG4vLyAgICAgcHVibGljIHZhbHVlO1xyXG4vLyAgICAgY29uc3RydWN0b3Ioa2V5OkssIHZhbHVlOlYpe1xyXG4vLyAgICAgICAgIHRoaXMua2V5ID0ga2V5O1xyXG4vLyAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuLy8gICAgIH1cclxuLy8gfVxyXG5cclxuLy8gZXhwb3J0IG1vZHVsZSBTdHJ1Y3tcclxuLy8gICAgIGV4cG9ydCBjbGFzcyBMaW5rTGlzdDxFPntcclxuLy8gICAgICAgICBwcml2YXRlIF9oZWFkOk5vZGU8RT47XHJcbi8vICAgICAgICAgcHJpdmF0ZSBfdGFpbDpOb2RlPEU+O1xyXG4vLyAgICAgICAgIGNvbnN0cnVjdG9yKCl7XHJcbi8vICAgICAgICAgICAgIHRoaXMuX2hlYWQgPSBuZXcgTm9kZTxFPihudWxsLCBudWxsKTtcclxuLy8gICAgICAgICAgICAgdGhpcy5fdGFpbCA9IG5ldyBOb2RlPEU+KG51bGwsIG51bGwpO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgLy/ln7rnoYDlsZ7mgKdcclxuLy8gICAgICAgICBwdWJsaWMgZ2V0IGxlbmd0aCgpOm51bWJlcntcclxuLy8gICAgICAgICAgICAgbGV0IHJlc3VsdDpudW1iZXIgPSAwO1xyXG4vLyAgICAgICAgICAgICBsZXQgY3VycmVudDpOb2RlPEU+ID0gdGhpcy5faGVhZDtcclxuLy8gICAgICAgICAgICAgd2hpbGUgKGN1cnJlbnQubmV4dCAhPT0gbnVsbCkge1xyXG4vLyAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IDE7XHJcbi8vICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBwdWJsaWMgZ2V0IGlzRW1wdHkoKTpib29sZWFue1xyXG4vLyAgICAgICAgICAgICByZXR1cm4gdGhpcy5faGVhZC5uZXh0ID09PSBudWxsO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgLy/lop7liKDmlLnmn6VcclxuLy8gICAgICAgICAvL+WinlxyXG4vLyAgICAgICAgIHB1YmxpYyBwdXNoKGl0ZW06RSk6dm9pZHtcclxuLy8gICAgICAgICAgICAgbGV0IGxhc3Q6Tm9kZTxFPiA9IG5ldyBOb2RlPEU+KGl0ZW0sIG51bGwpO1xyXG4vLyAgICAgICAgICAgICBpZiAodGhpcy5pc0VtcHR5KSB7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLl9oZWFkLm5leHQgPSBsYXN0O1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0ID0gbGFzdDtcclxuLy8gICAgICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuX3RhaWwubmV4dC5uZXh0ID0gbGFzdDtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuX3RhaWwubmV4dCA9IGxhc3Q7XHJcbi8vICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBwdWJsaWMgdW5zaGlmdChpdGVtOkUpOnZvaWR7XHJcbi8vICAgICAgICAgICAgIGxldCBmaXJzdDpOb2RlPEU+ID0gbmV3IE5vZGU8RT4oaXRlbSwgbnVsbCk7XHJcbi8vICAgICAgICAgICAgIGlmICh0aGlzLmlzRW1wdHkpIHtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuX3RhaWwubmV4dCA9IGZpcnN0O1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5faGVhZC5uZXh0ID0gZmlyc3Q7XHJcbi8vICAgICAgICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgICBmaXJzdC5uZXh0ID0gdGhpcy5faGVhZC5uZXh0Lm5leHQ7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLl9oZWFkLm5leHQgPSBmaXJzdDtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgcHVibGljIGluc2VydChpbmRleDpudW1iZXIsIGl0ZW06RSk6Ym9vbGVhbntcclxuLy8gICAgICAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+IHRoaXMubGVuZ3RoKSB7Ly/ov5nlj6XkuI3kuIDmoLdcclxuLy8gICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgaWYgKGluZGV4ID09PSB0aGlzLmxlbmd0aCkge1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5wdXNoKGl0ZW0pO1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIGxldCBjdXJyZW50Ok5vZGU8RT4gPSB0aGlzLl9oZWFkOy8v6L+Z5Y+l5ZKM5YW25LuW6YGN5Y6G5piv5LiN5LiA5qC355qE77yM5Zug5Li66KaB6YCJ5Y+W5Yiw6YCJ5a6a5L2N572u55qE5YmN6Z2i5LiA5qC8XHJcbi8vICAgICAgICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgaW5kZXg7IG4gKz0gMSkge1xyXG4vLyAgICAgICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgY3VycmVudC5uZXh0ID0gbmV3IE5vZGU8RT4oaXRlbSwgY3VycmVudC5uZXh0KTtcclxuXHJcbi8vICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgLy/liKBcclxuLy8gICAgICAgICBwdWJsaWMgcmVtb3ZlKGluZGV4Om51bWJlcik6RXtcclxuLy8gICAgICAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLmxlbmd0aCkge1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIGxldCBjdXJyZW50Ok5vZGU8RT4gPSB0aGlzLl9oZWFkLm5leHQ7XHJcbi8vICAgICAgICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgaW5kZXg7IG4gKz0gMSkge1xyXG4vLyAgICAgICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IGl0ZW06RSA9IGN1cnJlbnQuaXRlbTtcclxuLy8gICAgICAgICAgICAgY3VycmVudCA9IG51bGw7XHJcblxyXG4vLyAgICAgICAgICAgICByZXR1cm4gY3VycmVudC5pdGVtO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgcHVibGljIHNoaWZ0KCk6RXtcclxuLy8gICAgICAgICAgICAgaWYgKHRoaXMuaXNFbXB0eSkge1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5faGVhZC5uZXh0Lml0ZW07XHJcbi8vICAgICAgICAgICAgIHRoaXMuX2hlYWQubmV4dCA9IHRoaXMuX2hlYWQubmV4dC5uZXh0O1xyXG4vLyAgICAgICAgICAgICBpZiAodGhpcy5pc0VtcHR5KSB7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLl90YWlsLm5leHQgPSBudWxsO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgLy/mlLlcclxuLy8gICAgICAgICBwdWJsaWMgd3JpdGUoaW5kZXg6bnVtYmVyLCBpdGVtOkUpOnZvaWR7XHJcbi8vICAgICAgICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5sZW5ndGgpIHtcclxuLy8gICAgICAgICAgICAgICAgIHJldHVybjtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IGN1cnJlbnQ6Tm9kZTxFPiA9IHRoaXMuX2hlYWQubmV4dDtcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBpbmRleDsgbiArPSAxKSB7XHJcbi8vICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBjdXJyZW50Lml0ZW0gPSBpdGVtO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgLy/mn6VcclxuLy8gICAgICAgICBwdWJsaWMgcmVhZChpbmRleDpudW1iZXIpOkV7XHJcbi8vICAgICAgICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5sZW5ndGgpIHtcclxuLy8gICAgICAgICAgICAgICAgIHJldHVybjtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IGN1cnJlbnQ6Tm9kZTxFPiA9IHRoaXMuX2hlYWQubmV4dDtcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBpbmRleDsgbiArPSAxKSB7XHJcbi8vICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICByZXR1cm4gY3VycmVudC5pdGVtO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgcHVibGljIHNlYXJjaChpdGVtOkUpOm51bWJlcltde1xyXG4vLyAgICAgICAgICAgICBsZXQgcmVzdWx0Om51bWJlcltdID0gW107XHJcbi8vICAgICAgICAgICAgIHRoaXMuZm9yZWFjaCgoZWxlOkUsIGluZGV4Om51bWJlcik9PntcclxuLy8gICAgICAgICAgICAgICAgIGlmIChlbGUgPT09IGl0ZW0pIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChpbmRleCk7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIH0pO1xyXG4vLyAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgLyoqXHJcbi8vICAgICAgICAgICog5Yik5pat6ZO+6KGo5Lit5piv5ZCm5a2Y5Zyo5p+Q5LiA5YWD57SgXHJcbi8vICAgICAgICAgICogQHBhcmFtIGl0ZW0gXHJcbi8vICAgICAgICAgICovXHJcbi8vICAgICAgICAgcHVibGljIGhhcyhpdGVtOiBFKTpib29sZWFue1xyXG5cclxuLy8gICAgICAgICAgICAgbGV0IGN1cnJlbnQgPSB0aGlzLl9oZWFkLm5leHQ7XHJcbi8vICAgICAgICAgICAgIHdoaWxlIChjdXJyZW50ICE9IG51bGwpIHtcclxuLy8gICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Lml0ZW0gPT0gaXRlbSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgLy/pq5jpmLblh73mlbBcclxuLy8gICAgICAgICBwdWJsaWMgZm9yZWFjaChmOihlbGU6RSwgaW5kZXg6bnVtYmVyLCBsaXN0OkxpbmtMaXN0PEU+KT0+dm9pZCk6dm9pZHtcclxuLy8gICAgICAgICAgICAgbGV0IGN1cnJlbnQgPSB0aGlzLl9oZWFkLm5leHQ7XHJcbi8vICAgICAgICAgICAgIGxldCBudW06bnVtYmVyID0gMDtcclxuLy8gICAgICAgICAgICAgd2hpbGUgKGN1cnJlbnQgIT09IG51bGwpIHtcclxuLy8gICAgICAgICAgICAgICAgIGYoY3VycmVudC5pdGVtLCBudW0sIHRoaXMpO1xyXG4vLyAgICAgICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcclxuLy8gICAgICAgICAgICAgICAgIG51bSArPSAxO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvKipcclxuLy8gICAgICAgICAgKiDor7fmmoLml7bkuI3opoHkvb/nlKjov5nkuKrlh73mlbDvvIzlm6DkuLrmiJHkuZ/kuI3nn6XpgZPlroPkvJrkuI3kvJrniIbngrhcclxuLy8gICAgICAgICAgKiDpmaTpnZ7kvaDor7vov4fov5nkuKrlh73mlbDnmoTmupDku6PnoIFcclxuLy8gICAgICAgICAgKiBAcGFyYW0gZiDliKTmlq3lhYPntKDkvJjlhYjnuqfnmoTlm57osIPlh73mlbBcclxuLy8gICAgICAgICAgKiBAcGFyYW0gaW5jcmVhc2Ug5piv5ZCm5Y2H5bqP77yM6buY6K6k5Y2H5bqPXHJcbi8vICAgICAgICAgICogQHJldHVybnMg6L+U5Zue5LiA5Liq5o6S5bqP55qE6ZO+6KGoXHJcbi8vICAgICAgICAgICovXHJcbi8vICAgICAgICAgcHVibGljIHNvcnRieShmOihlbGU6RSk9Pm51bWJlciwgaW5jcmVhc2U6Ym9vbGVhbiA9IHRydWUpOkxpbmtMaXN0PEU+e1xyXG4vLyAgICAgICAgICAgICBsZXQgcHJpb3JpdHk6TGlua0xpc3Q8bnVtYmVyPiA9IG5ldyBMaW5rTGlzdDxudW1iZXI+KCk7XHJcbi8vICAgICAgICAgICAgIGxldCBzb3J0ZWQ6TGlua0xpc3Q8RT4gPSBuZXcgTGlua0xpc3Q8RT4oKTtcclxuLy8gICAgICAgICAgICAgcHJpb3JpdHkucHVzaCgtMCk7XHJcbi8vICAgICAgICAgICAgIHNvcnRlZC5wdXNoKG51bGwpO1xyXG5cclxuLy8gICAgICAgICAgICAgbGV0IGNvbXBhcmU6KGE6bnVtYmVyLGI6bnVtYmVyKT0+Ym9vbGVhbiA9IGluY3JlYXNlPyhhLGIpPT57cmV0dXJuIGEgPCBiO306KGEsYik9PntyZXR1cm4gYSA+IGJ9O1xyXG5cclxuLy8gICAgICAgICAgICAgdGhpcy5mb3JlYWNoKChlbGUpPT57XHJcbi8vICAgICAgICAgICAgICAgICBsZXQgY3VycmVudFByaSA9IGYoZWxlKTtcclxuLy8gICAgICAgICAgICAgICAgIGxldCBub2RlOk5vZGU8RT4gPSBzb3J0ZWQuX2hlYWQubmV4dDtcclxuLy8gICAgICAgICAgICAgICAgIGxldCBwcmlOb2RlOk5vZGU8bnVtYmVyPiA9IHByaW9yaXR5Ll9oZWFkLm5leHQ7XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgbGV0IGZvdW5kUGxhY2U6Ym9vbGVhbiA9IGZhbHNlO1xyXG4vLyAgICAgICAgICAgICAgICAgd2hpbGUgKG5vZGUubmV4dCAhPT0gbnVsbCkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIC8vIGlmIChjdXJyZW50UHJpIDwgcHJpTm9kZS5uZXh0Lml0ZW0pIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBpZiAoY29tcGFyZShjdXJyZW50UHJpLCBwcmlOb2RlLm5leHQuaXRlbSkpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5uZXh0ID0gbmV3IE5vZGU8RT4oZWxlLCBub2RlLm5leHQpO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBwcmlOb2RlLm5leHQgPSBuZXcgTm9kZTxudW1iZXI+KGN1cnJlbnRQcmksIHByaU5vZGUubmV4dCk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kUGxhY2UgPSB0cnVlO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuLy8gICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlLm5leHQ7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcHJpTm9kZSA9IHByaU5vZGUubmV4dDtcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgICAgICBpZiAoIWZvdW5kUGxhY2UpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBzb3J0ZWQucHVzaChlbGUpO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHByaW9yaXR5LnB1c2goY3VycmVudFByaSk7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIH0pO1xyXG5cclxuLy8gICAgICAgICAgICAgc29ydGVkLnNoaWZ0KCk7XHJcbi8vICAgICAgICAgICAgIHJldHVybiBzb3J0ZWQ7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvLyBwdWJsaWMgYmJTb3J0QnkoZjooZWxlOkUpPT5udW1iZXIsIGluY3JlYXNlOmJvb2xlYW4gPSB0cnVlKTpMaW5rTGlzdDxFPntcclxuXHJcbi8vICAgICAgICAgLy8gfVxyXG5cclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBleHBvcnQgY2xhc3MgTWFwPEssVj57XHJcbi8vICAgICAgICAgcHJpdmF0ZSBfbGlzdDpBcnJheTxNYXBOb2RlPEssVj4+XHJcbi8vICAgICAgICAgY29uc3RydWN0b3IoKXtcclxuLy8gICAgICAgICAgICAgdGhpcy5fbGlzdCA9IFtdXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHB1YmxpYyBnZXQoa2V5OkspOlZ7XHJcbi8vICAgICAgICAgICAgIGZvciAobGV0IGVsZSBvZiB0aGlzLl9saXN0KXtcclxuLy8gICAgICAgICAgICAgICAgIGlmIChlbGUua2V5ID09PSBrZXkpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlLnZhbHVlXHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgcmV0dXJuIG51bGxcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcHVibGljIGdldEtleUJ5VmFsKHZhbDpWKTpLe1xyXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBlbGUgb2YgdGhpcy5fbGlzdCkge1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKGVsZS52YWx1ZSA9PT0gdmFsKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZS5rZXlcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gbnVsbFxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBwdWJsaWMga2V5RXhpc3Qoa2V5OkspOmJvb2xlYW57XHJcbi8vICAgICAgICAgICAgIGZvciAobGV0IGVsZSBvZiB0aGlzLl9saXN0KSB7XHJcbi8vICAgICAgICAgICAgICAgICBpZiAoZWxlLmtleSA9PT0ga2V5KSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcHVibGljIHNldChrZXk6Syx2YWx1ZTpWKTpib29sZWFue1xyXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IHRoaXMuX2xpc3QubGVuZ3RoOyBuICs9IDEpIHtcclxuLy8gICAgICAgICAgICAgICAgIGlmICh0aGlzLl9saXN0W25dLmtleSA9PT0ga2V5KSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGlzdFtuXS52YWx1ZSA9IHZhbHVlXHJcbi8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHRoaXMuX2xpc3QucHVzaChuZXcgTWFwTm9kZTxLLFY+KGtleSx2YWx1ZSkpXHJcbi8vICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBwdWJsaWMgYmF0Y2hTZXQoa2V5czpLW10sIHZhbHVlczpWW10pOmJvb2xlYW57XHJcbi8vICAgICAgICAgICAgIGlmIChrZXlzLmxlbmd0aCAhPT0gdmFsdWVzLmxlbmd0aCkge1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwga2V5cy5sZW5ndGg7IG4gKz0gMSkge1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5zZXQoa2V5c1tuXSwgdmFsdWVzW25dKTtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHB1YmxpYyByZW1vdmUoa2V5OkspOmJvb2xlYW57XHJcbi8vICAgICAgICAgICAgIGxldCBjb3VudDpudW1iZXIgPSAwO1xyXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBlbGUgb2YgdGhpcy5fbGlzdCkge1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKGVsZS5rZXkgPT09IGtleSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xpc3Quc3BsaWNlKGNvdW50LDEpO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICBjb3VudCArPSAxO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBwdWJsaWMgZ2V0IGxlbmd0aCgpOm51bWJlcntcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3QubGVuZ3RoXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHB1YmxpYyBmb3JlYWNoKGY6KGs6SywgdjpWKT0+dm9pZCk6dm9pZHtcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgZWxlIG9mIHRoaXMuX2xpc3QpIHtcclxuLy8gICAgICAgICAgICAgICAgIGYoZWxlLmtleSwgZWxlLnZhbHVlKTtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICByZXR1cm47XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHB1YmxpYyBmaWx0ZXIoZjooazpLLHY6Vik9PmJvb2xlYW4pOk1hcDxLLFY+e1xyXG4vLyAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IE1hcDxLLFY+KCk7XHJcbi8vICAgICAgICAgICAgIGZvciAobGV0IGVsZSBvZiB0aGlzLl9saXN0KSB7XHJcbi8vICAgICAgICAgICAgICAgICBpZiAoZihlbGUua2V5LCBlbGUudmFsdWUpKXtcclxuLy8gICAgICAgICAgICAgICAgICAgICByZXN1bHQuc2V0KGVsZS5rZXksIGVsZS52YWx1ZSk7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgZXhwb3J0IGNsYXNzIFBvaW50ZXJMaXN0PEU+e1xyXG4vLyAgICAgICAgIHByaXZhdGUgX2xpc3Q6QXJyYXk8RT4gPSBbXTtcclxuLy8gICAgICAgICBwcml2YXRlIF9wb2ludGVyOm51bWJlciA9IDA7XHJcbi8vICAgICAgICAgY29uc3RydWN0b3Ioc291cmNlOkFycmF5PEU+ID0gW10sIGluaXRQb2ludDpudW1iZXIgPSAwKXtcclxuLy8gICAgICAgICAgICAgc291cmNlLmZvckVhY2goKGVsZSk9PntcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuX2xpc3QucHVzaChlbGUpO1xyXG4vLyAgICAgICAgICAgICB9KVxyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgZ2V0IGV4Y2VlZGluZygpOmJvb2xlYW57XHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wb2ludGVyID49IHRoaXMuX2xpc3QubGVuZ3RoIHx8IHRoaXMuX3BvaW50ZXIgPCAwXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvKlxyXG4vLyAgICAgICAgIOS7peS4i+azqOmHiuS4re+8jOaKiuaVsOe7hOeci+S9nOaoquWQkeaOkuWIl+eahOS4gOezu+WIl+WFg+e0oFxyXG4vLyAgICAgICAgIGluZGV4ID0gMOeahOWFg+e0oOWcqOacgOW3puS+p1xyXG4vLyAgICAgICAgICovXHJcblxyXG4vLyAgICAgICAgIHJlYWQoKTpFey8v5p+l55yL5b2T5YmNcG9pbnRlcuaJgOaMh+eahOWFg+e0oFxyXG4vLyAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdFt0aGlzLl9wb2ludGVyXVxyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgc3RlcCgpOkV7Ly9wb2ludGVy5ZCR5Y+z56e75LiA5q2lXHJcbi8vICAgICAgICAgICAgIHRoaXMuX3BvaW50ZXIrPTE7XHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlYWQoKTtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIHRvKHBsYWNlOm51bWJlcik6UG9pbnRlckxpc3Q8RT57Ly9wb2ludGVy56e75Yiw5oyH5a6a5L2N572uXHJcbi8vICAgICAgICAgICAgIHRoaXMuX3BvaW50ZXIgPSBwbGFjZVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gdGhpc1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgcHVzaChkYXRhOkUpOlBvaW50ZXJMaXN0PEU+ey8v5Zyo5pWw57uE5pyr5bC+5aKe5Yqg5LiA5Liq5YWD57SgXHJcbi8vICAgICAgICAgICAgIHRoaXMuX2xpc3QucHVzaChkYXRhKVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gdGhpc1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgc2V0KGluZGV4Om51bWJlcixkYXRhOkUpOlBvaW50ZXJMaXN0PEU+ey8v6KaG5YaZ5pWw57uE54m55a6aaW5kZXjkuK3nmoTlhYPntKBcclxuLy8gICAgICAgICAgICAgdGhpcy5fbGlzdFtpbmRleF0gPSBkYXRhXHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzXHJcbi8vICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4vLyAgICAgICAgIG5leHQoc2hpZnQ6bnVtYmVyID0gMSk6RXtcclxuLy8gICAgICAgICAgICAgLy/or7vlj5bkvY3kuo7lvZPliY1wb2ludGVy5omA5oyH55qE5YWD57Sg5Y+z6L656Iul5bmy5qC855qE5YWD57SgXHJcbi8vICAgICAgICAgICAgIC8vc2hpZnTpu5jorqTkuLox77yM5Y2z5b2T5YmNcG9pbnRlcuWPs+i+ueebuOmCu+eahOWFg+e0oFxyXG4vLyAgICAgICAgICAgICAvL3NoaWZ05Li66LSf5pWw5pe26I635Y+W5bem5L6n55qE5YWD57SgXHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLl9saXN0W3RoaXMuX3BvaW50ZXIrc2hpZnRdXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBnZXQgbGVuZ3RoKCk6bnVtYmVyey8v6I635Y+W5pWw57uE6ZW/5bqmXHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLl9saXN0Lmxlbmd0aFxyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgZ2V0IGxhc3QoKTpFey8v6I635Y+W5pyA5ZCO5LiA6aG5XHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLl9saXN0W3RoaXMuX2xpc3QubGVuZ3RoLTFdXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBnZXQgZmlyc3QoKTpFey8v6I635Y+W6aaW6aG5XHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLl9saXN0WzBdO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgZ2V0IHBvaW50ZXIoKTpudW1iZXJ7Ly/ojrflj5Zwb2ludGVyXHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wb2ludGVyXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBnZXQgYXRFbmQoKTpib29sZWFuey8v5p+l55yL4oCccG9pbnRlcuaMh+WQkeaVsOe7hOacgOWPs+S+p+eahOWFg+e0oOKAneeahOecn+WAvFxyXG4vLyAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcG9pbnRlciA9PT0gdGhpcy5fbGlzdC5sZW5ndGggLSAxXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfVxyXG4vLyB9IiwiLy9UT0RPXHJcbi8v5pS+572u5oiR5Lus6aG555uu6YeM6Ieq5a6a5LmJ55qE6YCa55SoS0VZ5YC86KGoXHJcbi8v5pS+5Zyo5ZCM5LiA5Liq5paH5Lu26YeM5pyJ5Yqp5LqO57uT5p6E5riF5pmwXHJcbi8v5Y+m77ya5aaC5p6c5Y+q5pyJ5p+Q54m55a6a5qih5Z2X57O757uf6YeM5L2/55So55qEZW51beWPr+S7peS4jeaUvui/h+adpSDnm7TmjqXlhpnlnKjmqKHlnZfmlofku7bkuK1cclxuXHJcbi8v5Y+I5Y+m77yaIOW7uuiuruWcqOS9v+eUqGVudW3nmoTml7blgJnliqDkuIDkuKrnqbrlgLxOb25l5Lul5bqU5a+55Yik5a6a6Zeu6aKYXHJcblxyXG5leHBvcnQgZW51bSBBY3RvclR5cGUge1xyXG4gICAgTm9uZSxcclxuICAgIE9wZXJhdG9yLFxyXG4gICAgTW9uc3RlcixcclxuICAgIFRva2VuXHJcbiAgICAvL+i/meWFtuWunuaYr+WvueW6lOeahOS4jeWQjOeahOaVsOaNruaooeadv1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBDYW1wVHlwZSB7XHJcbiAgICBOb25lLFxyXG4gICAgU2VsZiwgICAvL+aIkeaWuVxyXG4gICAgRW5lbXkgICAvL+aVjOaWuVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIERvZExvZyB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IERvZExvZztcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IEluc3RhbmNlKCk6IERvZExvZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlIHx8ICh0aGlzLl9pbnN0YW5jZSA9IG5ldyB0aGlzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZGVidWcobXNnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBtc2cgPSBgJHttc2d9YDtcclxuICAgICAgICBjb25zb2xlLmRlYnVnKG1zZyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBpbmZvKG1zZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgbXNnID0gYCR7bXNnfWA7XHJcbiAgICAgICAgY29uc29sZS5pbmZvKG1zZyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyB3YXJuKG1zZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgbXNnID0gYCR7bXNnfWA7XHJcbiAgICAgICAgY29uc29sZS53YXJuKG1zZyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBlcnJvcihtc2c6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIG1zZyA9IGAke21zZ31gO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcclxuICAgICAgICBEb2RMb2cuSW5zdGFuY2UuX3dyaXRlVG9GaWxlKG1zZyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfd3JpdGVUb0ZpbGUobG9nOiBzdHJpbmcpIHtcclxuICAgICAgICAvL1RPRE9cclxuICAgIH1cclxufSIsImV4cG9ydCBpbnRlcmZhY2UgQ29tcGFyYWJsZXtcclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5Lik5Liq5YWD57Sg5piv5ZCm55u4562JXHJcbiAgICAgKiDlv4Xpobvlj6/pgIZcclxuICAgICAqIEBwYXJhbSBlbGUgXHJcbiAgICAgKi9cclxuICAgIGVxdWFscyhlbGU6Q29tcGFyYWJsZSk6Ym9vbGVhblxyXG59XHJcbiAgICBcclxuZXhwb3J0IGNsYXNzIERvZE1hdGh7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm55hL2LnmoTmlbTmlbDnu5PmnpzvvIjlsI/mlbDpg6jliIboiI3ljrspXHJcbiAgICAgKiBh77yMYuWmguaenOS4jeWcqOato+aVtOaVsOWfn++8jOivt+ehruS/nemYheivu+i/h+atpOWHveaVsFxyXG4gICAgICogfOKAlOKAlOKAlOKAlHzigJTigJTigJTigJR84oCU4oCU4oCU4oCUfOKAlOKAlOKAlOKAlHzigJTigJTigJTigJR8XHJcbiAgICAgKiAgICAgLTE8LS0tMDwtLS0xPC0tLVxyXG4gICAgICogICAgICDlj6/ku6XnkIbop6PkuLrlnKjmlbDovbTkuIrmiornu5PmnpzlkJHlt6bmmKDlsIRcclxuICAgICAqIEBwYXJhbSBhIFxyXG4gICAgICogQHBhcmFtIGIgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgaW50RGl2aXNpb24oYTpudW1iZXIsIGI6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIChhLWElYikvYjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWcqOW5s+mdouS4iuaxguS7juaMh+WumuWHuuWPkeeCueWIsOaMh+Wumue7iOeCueS9nOS4gOadoeaMh+WumumVv+W6pueahOe6v+aute+8jOatpOe6v+auteeahOWPpuS4gOerr+eCueeahOWdkOagh1xyXG4gICAgICog77yI5aaC5p6c5q2k57q/5q6155qE6ZW/5bqm5aSn5LqO562J5LqO5Ye65Y+R54K55Yiw57uI54K555qE6Led56a777yM5YiZ6L6T5Ye657uI54K555qE5Z2Q5qCH77yJXHJcbiAgICAgKiBAcGFyYW0gZnJvbSBcclxuICAgICAqIEBwYXJhbSBlbmQgXHJcbiAgICAgKiBAcGFyYW0gbW92ZW1lbnQgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbW92ZVRvKGZyb206VmVjMiwgZW5kOlZlYzIsIG1vdmVtZW50Om51bWJlcik6VmVjMntcclxuICAgICAgICBjb25zdCB4ZGlzID0gZW5kLnggLSBmcm9tLng7XHJcbiAgICAgICAgY29uc3QgeWRpcyA9IGVuZC55IC0gZnJvbS55O1xyXG4gICAgICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KCh4ZGlzKSoqMiArICh5ZGlzKSoqMik7XHJcbiAgICAgICAgaWYgKG1vdmVtZW50ID49IGRpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbmQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHJhdGlvID0gbW92ZW1lbnQgLyBkaXN0YW5jZTtcclxuICAgICAgICByZXR1cm4gbmV3IFZlYzIoZnJvbS54ICsgeGRpcypyYXRpbyxmcm9tLnkgKyB5ZGlzKnJhdGlvKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE15TWF0aC5tb3ZlVG/lh73mlbDnmoTlj6bkuIDkuKrniYjmnKzjgILov5nkuKrniYjmnKzkvJrnm7TmjqXkv67mlLkoZnJvbTpWZWMyKeS8oOWFpeeahOWvueixoeacrOi6q++8jOW5tuWIpOaWreacgOe7iGZyb23kuI5lbmTkuKTkuKrlr7nosaHmmK/lkKbph43lkIhcclxuICAgICAqIEBwYXJhbSBmcm9tIFxyXG4gICAgICogQHBhcmFtIGVuZCBcclxuICAgICAqIEBwYXJhbSBtb3ZlbWVudCBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBtb3ZlVG9TaWRlRWZmZWN0KGZyb206VmVjMiwgZW5kOlZlYzIsIG1vdmVtZW50Om51bWJlcik6Ym9vbGVhbntcclxuICAgICAgICBjb25zdCB4ZGlzID0gZW5kLnggLSBmcm9tLng7XHJcbiAgICAgICAgY29uc3QgeWRpcyA9IGVuZC55IC0gZnJvbS55O1xyXG4gICAgICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KCh4ZGlzKSoqMiArICh5ZGlzKSoqMik7XHJcbiAgICAgICAgaWYgKG1vdmVtZW50ID49IGRpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIGZyb20ueCA9IGVuZC54O1xyXG4gICAgICAgICAgICBmcm9tLnkgPSBlbmQueTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHJhdGlvID0gbW92ZW1lbnQgLyBkaXN0YW5jZTtcclxuICAgICAgICBmcm9tLnggPSBmcm9tLnggKyB4ZGlzKnJhdGlvO1xyXG4gICAgICAgIGZyb20ueSA9IGZyb20ueSArIHlkaXMqcmF0aW87XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTXlNYXRoLm1vdmVUb+WHveaVsOeahOWPpuS4gOS4queJiOacrOOAgui/lOWbnuebtOe6v+mAn+W6puWcqHh55Lik6L205LiK55qE5YiG6YePXHJcbiAgICAgKiBAcGFyYW0gZnJvbSBcclxuICAgICAqIEBwYXJhbSBlbmQgXHJcbiAgICAgKiBAcGFyYW0gbW92ZW1lbnQgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbW92ZVRvQ29tcG9uZW50KGZyb206VmVjMiwgZW5kOlZlYzIsIG1vdmVtZW50Om51bWJlcik6VmVjMntcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCB4ZGlzID0gZW5kLnggLSBmcm9tLng7XHJcbiAgICAgICAgY29uc3QgeWRpcyA9IGVuZC55IC0gZnJvbS55O1xyXG4gICAgICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KCh4ZGlzKSoqMiArICh5ZGlzKSoqMik7XHJcbiAgICAgICAgY29uc3QgcmF0aW8gPSBtb3ZlbWVudCAvIGRpc3RhbmNlO1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjMih4ZGlzKnJhdGlvLCB5ZGlzKnJhdGlvKTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVmVjMiBpbXBsZW1lbnRzIENvbXBhcmFibGV7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBsaXN0RnJvbUxpc3QobGlzdDpudW1iZXJbXVtdKTpWZWMyW117XHJcbiAgICAgICAgbGV0IHJlc3VsdDpWZWMyW10gPSBbXTtcclxuXHJcbiAgICAgICAgbGlzdC5mb3JFYWNoKGVsZT0+e1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChuZXcgVmVjMihlbGVbMF0sZWxlWzFdKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHg6bnVtYmVyO1xyXG4gICAgcHVibGljIHk6bnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue5LuO5q2k54K55Yiw5oyH5a6a54K555qE6Led56a7XHJcbiAgICAgKiBAcGFyYW0gZW5kIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGlzdGFuY2VUbyhlbmQ6VmVjMik6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiAoKGVuZC54IC0gdGhpcy54KSoqMiArIChlbmQueSAtIHRoaXMueSkqKjIpKiowLjU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmsYLlkozkuKTkuKpWZWPvvIzov5Tlm57nu5PmnpzvvIzkuI3kv67mlLnljp/lrp7kvotcclxuICAgICAqIEBwYXJhbSB2ZWMgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwbHVzKHZlYzpWZWMyKTpWZWMye1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjMih0aGlzLnggKyB2ZWMueCwgdGhpcy55ICsgdmVjLnkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Lul6L6T5YWl5Z2Q5qCH5Li65Lit5b+D6L+b6KGM6aG65pe26ZKIOTDluqbml4vovaxcclxuICAgICAqIO+8iOacquWujOaIkO+8iVxyXG4gICAgICogQHBhcmFtIGNlbnRyZSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJvdGF0ZUNsb2Nrd2lzZShjZW50cmU6VmVjMik6VmVjMntcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuatpOWQkemHj+eahOWkjeWItlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xvbmUoKTpWZWMye1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjMih0aGlzLngsIHRoaXMueSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVxdWFscyhlbGU6VmVjMik6Ym9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy54ID09PSBlbGUueCAmJiB0aGlzLnkgPT09IGVsZS55O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHg/Om51bWJlciwgeT86bnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIiwiLy9hdXRob3IgTmEyQ3VDNE84XHJcblxyXG5cclxuaW1wb3J0IEN1c3RvbWl6ZWRTcHJpdGUgZnJvbSBcIi4vY3VzdG9taXplZFNwclwiO1xyXG5pbXBvcnQgeyBWZWMyIH0gZnJvbSBcIi4uLy4uL0RvZE1hdGhcIjtcclxuaW1wb3J0IHsgRXZlbnRDZW50cmUgfSBmcm9tIFwiLi4vLi4vLi4vRXZlbnQvRXZlbnRDZW50cmVcIjtcclxuaW1wb3J0IHsgTXlTeW1ib2wgfSBmcm9tIFwiLi4vLi4vLi4vRml4L0ZpeFN5bWJvbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJhcntcclxuXHJcbiAgICBwcml2YXRlIF9pbml0UG9zOlZlYzI7Ly/otbflp4vlnZDmoIdcclxuICAgIHByaXZhdGUgX2luaXRTaXplOlZlYzI7Ly/otbflp4vlpKflsI9cclxuICAgIHByaXZhdGUgX3BvczpWZWMyOy8v57yp5pS+5ZCO5Z2Q5qCHXHJcbiAgICBwcml2YXRlIF9zaXplOlZlYzI7Ly/nvKnmlL7lkI7lpKflsI9cclxuICAgIHByaXZhdGUgX3NjYWxlOm51bWJlciA9IDE7Ly/lhajlsYDnvKnmlL7mr5RcclxuICAgIHByaXZhdGUgX3N5bWJOdW06bnVtYmVyOy8v6L+b5bqm5p2h57yW5Y+3XHJcbiAgICBwcml2YXRlIF9iYWNrU3ByOkN1c3RvbWl6ZWRTcHJpdGU7Ly/ov5vluqbmnaHlupXlsYLnu5jlm77oioLngrlcclxuICAgIHByaXZhdGUgX2Zyb250U3ByOkN1c3RvbWl6ZWRTcHJpdGU7Ly/ov5vluqbmnaHpobblsYLnu5jlm77oioLngrlcclxuICAgIHByaXZhdGUgX3BlcmNlbnRhZ2U6bnVtYmVyID0gMTsvL+i/m+W6plxyXG4gICAgcHJpdmF0ZSBfaGVpZ2h0Om51bWJlcjsvL+i/m+W6puadoemrmOW6plxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/m+W6puadoeaehOmAoOWZqFxyXG4gICAgICogQHBhcmFtIHN5bWJOdW0g6L+b5bqm5p2h57yW5Y+3XHJcbiAgICAgKiBAcGFyYW0gYmFja0dyb3VuZENvbG9yIOiDjOaZr+minOiJslxyXG4gICAgICogQHBhcmFtIHNpemUg5aSn5bCPXHJcbiAgICAgKiBAcGFyYW0gcG9zIOWdkOagh1xyXG4gICAgICogQHBhcmFtIHNjYWxlIOWFqOWxgOe8qeaUvuavlFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihzeW1iTnVtOm51bWJlciwgYmFja0dyb3VuZENvbG9yOnN0cmluZyxzaXplOlZlYzIgLHBvczpWZWMyLCBzY2FsZTpudW1iZXIgPSAxKXtcclxuICAgICAgICB0aGlzLl9zeW1iTnVtID0gc3ltYk51bTtcclxuICAgICAgICB0aGlzLl9pbml0U2l6ZSA9IHNpemU7XHJcbiAgICAgICAgdGhpcy5fc2NhbGUgPSBzY2FsZTtcclxuICAgICAgICB0aGlzLl9zaXplID0gbmV3IFZlYzIodGhpcy5faW5pdFNpemUueCp0aGlzLl9wZXJjZW50YWdlKnRoaXMuX3NjYWxlLHRoaXMuX2luaXRTaXplLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX2luaXRQb3MgPSBwb3M7XHJcbiAgICAgICAgdGhpcy5fcG9zID0gbmV3IFZlYzIodGhpcy5faW5pdFBvcy54KnRoaXMuX3NjYWxlLHRoaXMuX2luaXRQb3MueSp0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fYmFja1NwciA9IG5ldyBDdXN0b21pemVkU3ByaXRlKCk7XHJcbiAgICAgICAgdGhpcy5fYmFja1Nwci5zZXRQYXJhbSh0aGlzLl9wb3MueCx0aGlzLl9wb3MueSx0aGlzLl9zaXplLngsdGhpcy5fc2l6ZS55LGJhY2tHcm91bmRDb2xvcik7XHJcbiAgICAgICAgdGhpcy5fYmFja1Nwci5jaGFuZ2VDb2xvcigpO1xyXG4gICAgICAgIHRoaXMuX2Zyb250U3ByID0gbmV3IEN1c3RvbWl6ZWRTcHJpdGUoKTtcclxuICAgICAgICB0aGlzLl9iYWNrU3ByLmFkZENoaWxkKHRoaXMuX2Zyb250U3ByKTtcclxuICAgICAgICB0aGlzLl9mcm9udFNwci5zZXRQYXJhbSgwLDAsdGhpcy5fc2l6ZS54LHRoaXMuX3NpemUueSxcIiM4YjhiODNcIixuZXcgVmVjMih0aGlzLl9zY2FsZSx0aGlzLl9zY2FsZSkpO1xyXG4gICAgICAgIHRoaXMuX2Zyb250U3ByLmNoYW5nZUNvbG9yKCk7XHJcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gdGhpcy5faW5pdFNpemUueTtcclxuICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5vbihFdmVudENlbnRyZS5FVHlwZS5QRVJGT1JNQU5DRV9SRVNDQUxFKCksdGhpcyx0aGlzLnJlU2NhbGUpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS/ruaUuee8qeaUvuavlFxyXG4gICAgICogQHBhcmFtIHZhbHVlIOWFqOWxgOe8qeaUvuavlFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlU2NhbGUodmFsdWU6bnVtYmVyKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3NjYWxlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5fcG9zID0gbmV3IFZlYzIodGhpcy5faW5pdFBvcy54KnRoaXMuX3NjYWxlLCB0aGlzLl9pbml0UG9zLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX3NpemUgPSBuZXcgVmVjMih0aGlzLl9pbml0U2l6ZS54KnRoaXMuX3NjYWxlLCB0aGlzLl9pbml0U2l6ZS55KnRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9iYWNrU3ByLnNldFBhcmFtKHRoaXMuX3Bvcy54LHRoaXMuX3Bvcy55LHRoaXMuX3NpemUueCx0aGlzLl9zaXplLnkpOy8v6K6+572u6IOM5pmv57uY5Zu+6IqC54K55Y+C5pWwXHJcbiAgICAgICAgdGhpcy5fYmFja1Nwci5jaGFuZ2VDb2xvcigpO1xyXG4gICAgICAgIHRoaXMuX2Zyb250U3ByLnNldFBhcmFtKDAsMCx0aGlzLl9zaXplLngqdGhpcy5fcGVyY2VudGFnZSx0aGlzLl9zaXplLnksXCIjOGI4YjgzXCIsbmV3IFZlYzIoMSp0aGlzLl9zY2FsZSwxKnRoaXMuX3NjYWxlKSk7Ly/orr7nva7liY3nq6/nu5jlm77oioLngrnlj4LmlbBcclxuICAgICAgICB0aGlzLl9mcm9udFNwci5jaGFuZ2VDb2xvcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u6L+b5bqm5p2h5Luj5Y+3XHJcbiAgICAgKiBAcGFyYW0gc3ltYk51bSDov5vluqbmnaHku6Plj7dcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFN5bWIoc3ltYk51bTpudW1iZXIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fc3ltYk51bSA9IHN5bWJOdW07XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkv67mlLnov5vluqZcclxuICAgICAqIEBwYXJhbSBwZXJjZW50YWdlIOebruagh+i/m+W6plxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IHBlcmNlbnRhZ2UocGVyY2VudGFnZTpudW1iZXIpe1xyXG4gICAgICAgIGlmKHBlcmNlbnRhZ2UgPT09IDApe1xyXG4gICAgICAgICAgICB0aGlzLl9wZXJjZW50YWdlID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fZnJvbnRTcHIuZ3JhcGhpY3MuY2xlYXIoKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fcGVyY2VudGFnZSA9IHBlcmNlbnRhZ2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2Zyb250U3ByLnNldFBhcmFtKDAsMCx0aGlzLl9zaXplLngqdGhpcy5fcGVyY2VudGFnZSx0aGlzLl9zaXplLnksXCIjOGI4YjgzXCIsbmV3IFZlYzIoMSp0aGlzLl9zY2FsZSwxKnRoaXMuX3NjYWxlKSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2Zyb250U3ByLmNoYW5nZUNvbG9yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue5pys6L+b5bqm5p2h6IOM5pmv57uY5Zu+6IqC54K5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRCYWNrU3ByKCk6Q3VzdG9taXplZFNwcml0ZXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYmFja1NwcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuacrOi/m+W6puadoemrmOW6plxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0SGVpZ2h0KCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9oZWlnaHQ7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCdXR0b257XHJcblxyXG4gICAgcHJpdmF0ZSBfaW5pdFBvczpWZWMyOy8v5oyJ6ZKu5Yid5aeL5Z2Q5qCHXHJcbiAgICBwcml2YXRlIF9pbml0U2l6ZTpWZWMyOy8v5oyJ6ZKu5Yid5aeL5a696auYXHJcbiAgICBwcml2YXRlIF9wb3M6VmVjMjsvL+aYvuekuuiKgueCueWdkOagh1xyXG4gICAgcHJpdmF0ZSBfc2l6ZTpWZWMyOy8v5pi+56S66IqC54K55a696auYXHJcbiAgICBwcml2YXRlIF9zeW1iTmFtZTpudW1iZXI7Ly/mjInpkq7nvJblj7dcclxuICAgIHByaXZhdGUgX2NvbG9yOnN0cmluZzsvL+aMiemSruminOiJslxyXG4gICAgcHJpdmF0ZSBfaGVpZ2h0Om51bWJlcjsvL+aMiemSrumrmOW6pu+8iOm7mOiupOe8qeaUvuavlOS4ujHvvIlcclxuICAgIHByaXZhdGUgX3NwcjpDdXN0b21pemVkU3ByaXRlOy8v5oyJ6ZKu5pi+56S66IqC54K5XHJcbiAgICBwcml2YXRlIF9zY2FsZTpudW1iZXI7Ly/lhajlsYDnvKnmlL7mr5RcclxuICAgIHByaXZhdGUgX25hbWU6c3RyaW5nOy8v5oyJ6ZKu5ZCN77yI5pi+56S65Zyo5oyJ6ZKu5LiK77yJXHJcbiAgICBwcml2YXRlIF9mdW46RnVuY3Rpb247Ly/mjInpkq7miYDmkLrluKbnmoTlip/og73lh73mlbBcclxuICAgIHByaXZhdGUgX0FSVXN5bWI6TXlTeW1ib2w7Ly/mjInpkq7miYDlnKhBY3RvclJVXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmjInpkq7mnoTpgKDlmahcclxuICAgICAqIEBwYXJhbSBuYW1lIOaMiemSruWQjVxyXG4gICAgICogQHBhcmFtIHN5bWJOdW0g5oyJ6ZKu57yW5Y+3XHJcbiAgICAgKiBAcGFyYW0gcG9zIOi1t+Wni+WdkOagh1xyXG4gICAgICogQHBhcmFtIHNpemUg6LW35aeL5a696auYXHJcbiAgICAgKiBAcGFyYW0gY29sb3Ig5oyJ6ZKu6aKc6ImyXHJcbiAgICAgKiBAcGFyYW0gc2NhbGUg57yp5pS+5q+UXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKEFSVXN5bWI6TXlTeW1ib2wsIG5hbWU6c3RyaW5nID0gXCJkZWZhdWx0XCIsIHN5bWJOdW06bnVtYmVyLCBwb3M6VmVjMiwgc2l6ZTpWZWMyLCAgY29sb3I6c3RyaW5nID0gXCIjMDBCMkJGXCIsIHNjYWxlOm51bWJlciA9IDEpe1xyXG4gICAgICAgIHRoaXMuX0FSVXN5bWIgPSBBUlVzeW1iO1xyXG4gICAgICAgIHRoaXMuX3N5bWJOYW1lID0gc3ltYk51bTtcclxuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLl9pbml0UG9zID0gcG9zO1xyXG4gICAgICAgIHRoaXMuX2luaXRTaXplID0gc2l6ZTtcclxuICAgICAgICB0aGlzLl9jb2xvciA9IGNvbG9yO1xyXG4gICAgICAgIHRoaXMuX3NjYWxlID0gc2NhbGU7XHJcbiAgICAgICAgdGhpcy5fcG9zID0gbmV3IFZlYzIodGhpcy5faW5pdFBvcy54KnRoaXMuX3NjYWxlLHRoaXMuX2luaXRQb3MueSp0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fc2l6ZSA9IG5ldyBWZWMyKHRoaXMuX2luaXRTaXplLngqdGhpcy5fc2NhbGUsdGhpcy5faW5pdFNpemUueSp0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gdGhpcy5faW5pdFNpemUueTtcclxuICAgICAgICB0aGlzLl9zcHIgPSBuZXcgQ3VzdG9taXplZFNwcml0ZSgpO1xyXG4gICAgICAgIHRoaXMuX3Nwci5zZXRQYXJhbSh0aGlzLl9wb3MueCx0aGlzLl9wb3MueSx0aGlzLl9zaXplLngsdGhpcy5fc2l6ZS55LHRoaXMuX2NvbG9yKTtcclxuICAgICAgICB0aGlzLl9zcHIuY2hhbmdlQ29sb3IoKTtcclxuICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5vbihFdmVudENlbnRyZS5FVHlwZS5QRVJGT1JNQU5DRV9SRVNDQUxFKCksdGhpcyx0aGlzLnJlU2NhbGUpO1xyXG4gICAgICAgIHRoaXMuc2V0VGV4dCgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruaMiemSruWKn+iDvVxyXG4gICAgICogQHBhcmFtIGZ1biDmjInpkq7lip/og73lh73mlbBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldEZ1bmMoZnVuOkZ1bmN0aW9uKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX2Z1biA9IGZ1bjtcclxuICAgICAgICB0aGlzLl9zcHIub24oTGF5YS5FdmVudC5NT1VTRV9VUCx0aGlzLHRoaXMuX2Z1bik7XHJcbiAgICAgICAgdGhpcy5fc3ByLm9uKExheWEuRXZlbnQuTU9VU0VfT1ZFUix0aGlzLChlOiBMYXlhLkV2ZW50KT0+e1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fc3ByLm9uKExheWEuRXZlbnQuTU9VU0VfVVAsdGhpcywoZTogTGF5YS5FdmVudCk9PntcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuaMiemSrue7mOWbvuiKgueCuVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0U3ByKCk6Q3VzdG9taXplZFNwcml0ZXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3ByO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnvKnmlL7mjInpkq5cclxuICAgICAqIEBwYXJhbSB2YWx1ZSDlhajlsYDnvKnmlL7mr5RcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlU2NhbGUodmFsdWU6bnVtYmVyKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3NjYWxlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5fcG9zID0gbmV3IFZlYzIodGhpcy5faW5pdFBvcy54KnRoaXMuX3NjYWxlLHRoaXMuX2luaXRQb3MueSp0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fc2l6ZSA9IG5ldyBWZWMyKHRoaXMuX2luaXRTaXplLngqdGhpcy5fc2NhbGUsdGhpcy5faW5pdFNpemUueSp0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fc3ByLnNldFBhcmFtKHRoaXMuX3Bvcy54LHRoaXMuX3Bvcy55LHRoaXMuX3NpemUueCx0aGlzLl9zaXplLnksdGhpcy5fY29sb3IpO1xyXG4gICAgICAgIHRoaXMuX3Nwci5jaGFuZ2VDb2xvcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5riy5p+T5paH5pysXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRUZXh0KCk6dm9pZHtcclxuICAgICAgICBsZXQgdG1wVGV4OkxheWEuVGV4dCA9IG5ldyBMYXlhLlRleHQoKTtcclxuICAgICAgICB0bXBUZXgud2lkdGggPSB0aGlzLl9zaXplLng7XHJcbiAgICAgICAgdG1wVGV4LmhlaWdodCA9IHRoaXMuX3NpemUueTtcclxuICAgICAgICB0bXBUZXgueCA9IDA7XHJcbiAgICAgICAgdG1wVGV4LnkgPSAwO1xyXG4gICAgICAgIHRtcFRleC5mb250U2l6ZSA9IDk7XHJcbiAgICAgICAgdG1wVGV4LnRleHQgPSB0aGlzLl9uYW1lO1xyXG4gICAgICAgIHRtcFRleC5hbGlnbiA9IFwiY2VudGVyXCI7XHJcbiAgICAgICAgdG1wVGV4LnZhbGlnbiA9IFwibWlkZGxlXCI7XHJcbiAgICAgICAgdGhpcy5fc3ByLmFkZENoaWxkKHRtcFRleCk7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBUZXh0IGV4dGVuZHMgTGF5YS5UZXh0e1xyXG4gICAgcHJpdmF0ZSBfc3dpdGNoOmJvb2xlYW4gPSB0cnVlOy8v5paH5pys5pi+56S65byA5YWzIOm7mOiupOWFs+mXrVxyXG4gICAgcHJpdmF0ZSBfc2NhbGU6bnVtYmVyOy8v5YWo5bGA57yp5pS+5q+UXHJcbiAgICBwcml2YXRlIF9zaXplOlZlYzI7Ly/otbflp4vlpKflsI9cclxuICAgIHByaXZhdGUgX3BvczpWZWMyID0gbmV3IFZlYzIoMCwwKTsvL+i1t+Wni+WdkOagh1xyXG4gICAgcHJpdmF0ZSBfbXlTdHJpbmc6c3RyaW5nOy8v5paH5pys5YaF5a65XHJcbiAgICBwcml2YXRlIF9BUlVzeW1iOk15U3ltYm9sOy8v5omA5Zyo5Y+v6KeG6IqC54K5XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmlofmnKzmnoTpgKDlmahcclxuICAgICAqIEBwYXJhbSBzaXplIOi1t+Wni+Wkp+Wwj1xyXG4gICAgICogQHBhcmFtIHNjYWxlIOe8qeaUvuavlFxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHNpemU6VmVjMiwgc2NhbGU6bnVtYmVyKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX3NpemUgPSBzaXplO1xyXG4gICAgICAgIHRoaXMuX3NjYWxlID0gc2NhbGU7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuX3NpemUueCp0aGlzLl9zY2FsZTsvL+iuoeeul+WPr+inhuiKgueCueWuveW6plxyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5fc2l6ZS55KnRoaXMuX3NjYWxlOy8v6K6h566X5Y+v6KeG6IqC54K56auY5bqmXHJcbiAgICAgICAgdGhpcy5mb250U2l6ZSA9IDEwKnRoaXMuX3NjYWxlOy8v6K6h566X5a2X5L2T5aSn5bCPXHJcbiAgICAgICAgdGhpcy5hbGlnbiA9IFwiY2VudGVyXCI7Ly/pu5jorqTnq5bnm7TlsYXkuK1cclxuICAgICAgICB0aGlzLnZhbGlnbiA9IFwibWlkZGxlXCI7Ly/pu5jorqTmsLTlubPlsYXkuK1cclxuICAgICAgICB0aGlzLndvcmRXcmFwID0gdHJ1ZTsvL+m7mOiupOiHquWKqOaNouihjOW8gOWQr1xyXG4gICAgICAgIHRoaXMuY29sb3IgPSBcIiMwMDAwMDBcIjsvL1xyXG4gICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLm9uKEV2ZW50Q2VudHJlLkVUeXBlLlBFUkZPUk1BTkNFX1JFU0NBTEUoKSx0aGlzLHRoaXMucmVTY2FsZSk7Ly/nm5HlkKzlhajlsYDnvKnmlL7mr5RcclxuICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5vbihFdmVudENlbnRyZS5FVHlwZS5QRVJGT1JNQU5DRV9URVhUX1NXSVRDSCgpLHRoaXMsdGhpcy5zd2l0Y2gpOy8v55uR5ZCs5YWo5bGA5paH5pys5pi+56S65byA5YWzXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5omA5Zyo5pi+56S66IqC54K5c3ltYlxyXG4gICAgICogQHBhcmFtIHN5bWIgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRTeW1iKHN5bWI6TXlTeW1ib2wpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fQVJVc3ltYiA9IHN5bWI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvIDlhbPmlofmnKzmmL7npLrlvIDlhbNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN3aXRjaCgpOnZvaWR7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5fc3dpdGNoID09PSB0cnVlKXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuX3N3aXRjaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZVRleHQoXCJcIik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9zd2l0Y2ggPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS/ruaUueaWh+acrOaYvuekuuW8gOWFs1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U3dpdGNoT24oKTp2b2lke1xyXG4gICAgICAgIGlmKHRoaXMuX3N3aXRjaCA9PT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVGV4dCh0aGlzLl9teVN0cmluZyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWFs+mXreaWh+acrOaYvuekulxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U3dpdGNoT2ZmKCk6dm9pZHtcclxuICAgICAgICBpZih0aGlzLl9zd2l0Y2gpe1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZVRleHQoXCIgXCIpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2u57yp5pS+5q+U5L+u5pS55Y+v6KeG6IqC54K55aSn5bCPXHJcbiAgICAgKiBAcGFyYW0gc2NhbGUg5YWo5bGA57yp5pS+5q+UXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVTY2FsZShzY2FsZTpudW1iZXIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fc2NhbGUgPSBzY2FsZTtcclxuICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5fc2l6ZS54KnRoaXMuX3NjYWxlO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5fc2l6ZS55KnRoaXMuX3NjYWxlO1xyXG4gICAgICAgIHRoaXMueCA9IHRoaXMuX3Bvcy54KnRoaXMuX3NjYWxlO1xyXG4gICAgICAgIHRoaXMueSA9IHRoaXMuX3Bvcy55KnRoaXMuX3NjYWxlO1xyXG4gICAgICAgIHRoaXMuZm9udFNpemUgPSAxMCp0aGlzLl9zY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruaWh+acrFxyXG4gICAgICogQHBhcmFtIHRleHQgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRUZXh0KHRleHQ6c3RyaW5nKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX215U3RyaW5nID0gdGV4dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS/ruaUueaWh+acrOi1t+Wni+WdkOagh++8iOS4jeWPl+WFqOWxgOe8qeaUvuavlOW9seWTje+8iVxyXG4gICAgICogQHBhcmFtIHBvcyDotbflp4vlnZDmoIdcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFBvcyhwb3M6VmVjMiA9IG5ldyBWZWMyKDAsMCkpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fcG9zID0gcG9zO1xyXG4gICAgICAgIHRoaXMueCA9IHRoaXMuX3Bvcy54KnRoaXMuX3NjYWxlO1xyXG4gICAgICAgIHRoaXMueSA9IHRoaXMuX3Bvcy55KnRoaXMuX3NjYWxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6Zi75q2i6byg5qCH5LqL5Lu256m/6YCPXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvZmZTd2l0Y2goKTp2b2lke1xyXG4gICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLm9mZihFdmVudENlbnRyZS5FVHlwZS5QRVJGT1JNQU5DRV9SRVNDQUxFKCksdGhpcyx0aGlzLnJlU2NhbGUpO1xyXG4gICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLm9mZihFdmVudENlbnRyZS5FVHlwZS5QRVJGT1JNQU5DRV9URVhUX1NXSVRDSCgpLHRoaXMsdGhpcy5zd2l0Y2gpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5L+u5pS55a2X5L2T5aSn5bCPXHJcbiAgICAgKiBAcGFyYW0gdmFsdWUg6L6T5YWl5aSn5bCPXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRGb250U2l6ZSh2YWx1ZTpudW1iZXIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5mb250U2l6ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudGV4dCA9IHRoaXMuX215U3RyaW5nO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIiwiLy9hdXRob3IgTmEyQ3VDNE84XHJcblxyXG5pbXBvcnQgQ3VzdG9taXplZFNwcml0ZSBmcm9tIFwiLi9jdXN0b21pemVkU3ByXCI7XHJcbmltcG9ydCB7IENoZXNzQm9hcmQgfSBmcm9tIFwiLi9VbnN5bWJvbGl6ZWRSZW5kZXJcIjtcclxuaW1wb3J0IEFjdG9yUlUgZnJvbSBcIi4vU3ltYm9saXplZFJlbmRlclwiO1xyXG5pbXBvcnQgeyBBY3RvckJveCB9IGZyb20gXCIuL29iamJveFwiO1xyXG5pbXBvcnQgeyBWZWMyIH0gZnJvbSBcIi4uLy4uL0RvZE1hdGhcIjtcclxuaW1wb3J0IHsgU3ltYm9saXplZCB9IGZyb20gXCIuLi8uLi8uLi9GaXgvRml4U3ltYm9sXCI7XHJcbmltcG9ydCB7IEV2ZW50Q2VudHJlIH0gZnJvbSBcIi4uLy4uLy4uL0V2ZW50L0V2ZW50Q2VudHJlXCI7XHJcbmltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSBcIi4uLy4uL1JlbmRlcmVyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQZXJmb3JtYW5jZUNlbnRyZSBpbXBsZW1lbnRzIFJlbmRlcmVye1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaW5zdGFuY2U6UGVyZm9ybWFuY2VDZW50cmU7Ly/ljZXkvovvvIjor7fkuI3opoHmiYvliqjmlrDlu7rljZXkvovvvIlcclxuICAgIHB1YmxpYyBtYWluU3ByOkN1c3RvbWl6ZWRTcHJpdGU7Ly/pu5jorqTnu5jlm77oioLngrnvvIjnpoHmraLlnKjor6XoioLngrnkuIrnu5jlm77vvIzlj6rog73nlKjkuo7mt7vliqDlrZDoioLngrnvvIlcclxuICAgIHByaXZhdGUgY2hlc3NCb2FyZDpDaGVzc0JvYXJkOy8v6buY6K6k5qOL55uYXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJbmuLLmn5PkuLvlnLrmma/vvIzliJ3lp4vljJbkuovku7bnm5HlkKznsbtcclxuICAgICAqIEBwYXJhbSBzY2VuZSDmuLjmiI/kuLvlnLrmma9cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplIChzY2VuZTpMYXlhLlNwcml0ZSk6dm9pZHtcclxuICAgICAgICBQZXJmb3JtYW5jZUNlbnRyZS5pbnN0YW5jZSA9IG5ldyBQZXJmb3JtYW5jZUNlbnRyZSgpOy8v5Yqg6L296Z2Z5oCB57G7XHJcbiAgICAgICAgUGVyZm9ybWFuY2VDZW50cmUuaW5zdGFuY2UubWFpblNwciA9IG5ldyBDdXN0b21pemVkU3ByaXRlKCk7Ly/lu7rnq4vkuLvnu5jlm77oioLngrlcclxuICAgICAgICAvL+ivpee7mOWbvuiKgueCueS4jeeUqOS6jue7mOWItuS7u+S9leWbvuW9ou+8jOS7heeUqOS6jua3u+WKoOWtkOiKgueCuVxyXG4gICAgICAgIHNjZW5lLmFkZENoaWxkKFBlcmZvcm1hbmNlQ2VudHJlLmluc3RhbmNlLm1haW5TcHIpOy8v5bCG5Li757uY5Zu+6IqC54K55re75Yqg5Li65Li75Zy65pmv5a2Q6IqC54K5XHJcbiAgICAgICAgRXZlbnRDZW50cmUuaW5pdCgpOy8v5Yid5aeL5YyW6KeC5a+f6ICFXHJcbiAgICAgICAgUGVyZm9ybWFuY2VDZW50cmUuaW5pdGlhbGl6ZSA9ICgpID0+IHt9Oy8v5riF56m65Li75Zy65pmv5Yid5aeL5YyW5Ye95pWwXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJNYWluIFNjZW5lIEluaXRpYWxpemF0aW9uIENvbXBsZXRlISFcIik7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5riy5p+T5qOL55uYXHJcbiAgICAgKiBAcGFyYW0gYXJyIOeUqOS6jueUn+aIkOaji+ebmOeahOS6jOe7tOaVsOe7hFxyXG4gICAgICogQHBhcmFtIHBvc1ZlYzIg5qOL55uY6LW35aeL5Z2Q5qCH77yI5LiA5b6L5oyJ5YWo5bGA57yp5pS+5q+U5Li6Meiuoeeul++8jOa4suafk+WZqOS8muagueaNruWFqOWxgOe8qeaUvuavlOiHquWKqOWujOaIkOe8qeaUvua4suafk++8iVxyXG4gICAgICogQHBhcmFtIHVuaXRzaXplIOWNleS9jeagvOWtkOWuvemrmO+8iOS4gOW+i+aMieWFqOWxgOe8qeaUvuavlOS4ujHorqHnrpfvvIzmuLLmn5PlmajkvJrmoLnmja7lhajlsYDnvKnmlL7mr5Toh6rliqjlrozmiJDnvKnmlL7muLLmn5PvvIlcclxuICAgICAqIEBwYXJhbSBiYWNrR3JvdW5kQ29sb3Ig5qOL55uY6IOM5pmv6aKc6ImyXHJcbiAgICAgKiBAcGFyYW0gZnJvbnRDb2xvciDmoLzlrZDpopzoibJcclxuICAgICAqIEBwYXJhbSBmYXRoZXIg54i257uY5Zu+6IqC54K577yI6buY6K6k5Li65YWo5bGA57uY5Zu+6IqC54K577yJXHJcbiAgICAgKiBAcGFyYW0gc2NhbGUg57yp5pS+5q+U77yI6buY6K6k5Li6Me+8iVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW5pdEJvYXJkKGFycjogbnVtYmVyW11bXSwgcG9zVmVjMjogVmVjMiwgdW5pdHNpemU6IFZlYzIsIGJhY2tHcm91bmRDb2xvcjogc3RyaW5nLCBmcm9udENvbG9yOiBzdHJpbmcsIHNjYWxlOiBudW1iZXIgPSAxKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jaGVzc0JvYXJkID0gbmV3IENoZXNzQm9hcmQoYXJyLHBvc1ZlYzIsdW5pdHNpemUsYmFja0dyb3VuZENvbG9yLGZyb250Q29sb3Isc2NhbGUpOy8v5paw5bu65qOL55uYXHJcbiAgICAgICAgUGVyZm9ybWFuY2VDZW50cmUuaW5zdGFuY2UubWFpblNwci5hZGRDaGlsZCh0aGlzLmNoZXNzQm9hcmQpOy8v5re75Yqg5a2Q6IqC54K5XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDosIPoioLlhajlsYDnvKnmlL7mr5TvvIzlj6rog73kvZznlKjkuo7miYDmnIlhY3Rvcua4suafk+WujOaIkOWQjuOAgeaJgOacieeJueaViOW4p+W+queOr+aJp+ihjOWJje+8jOWQpuWImeaciemdnuiHtOWRveaAp2J1Z1xyXG4gICAgICogQHBhcmFtIHZhbHVlIOWFqOWxgOWPr+inhuiKgueCuee8qeaUvuavlFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVzY2FsZSh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2UuZXZlbnQoXCJSRVNDQUxFXCIsW3ZhbHVlXSk7Ly/lj5HluIPosIPlj4Lkuovku7bjgIHnvKnmlL7mr5Tlj4LmlbBcclxuXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog5riy5p+TYWN0b3Llr7nosaFcclxuICAgICAqIEBwYXJhbSBib3VuZCBhY3RvclxyXG4gICAgICogQHBhcmFtIHBvcyDlnZDmoIfvvIjkuIDlvovmjInlhajlsYDnvKnmlL7mr5TkuLox6K6h566X77yM5riy5p+T5Zmo5Lya5qC55o2u5YWo5bGA57yp5pS+5q+U6Ieq5Yqo5a6M5oiQ57yp5pS+5riy5p+T77yJXHJcbiAgICAgKiBAcGFyYW0gc2l6IOWuvemrmO+8iOm7mOiupDEwLDEw77yJ77yI5LiA5b6L5oyJ5YWo5bGA57yp5pS+5q+U5Li6Meiuoeeul++8jOa4suafk+WZqOS8muagueaNruWFqOWxgOe8qeaUvuavlOiHquWKqOWujOaIkOe8qeaUvua4suafk++8iVxyXG4gICAgICogQHBhcmFtIGZhdGhlciDniLbnu5jlm77oioLngrnvvIjpu5jorqTkuLrmo4vnm5jnu5jlm77oioLngrnvvIlcclxuICAgICAqIEBwYXJhbSBjb2xvciDpopzoibLvvIjpu5jorqTkuLrnu7/vvIlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpc3BsYXlBY3Rvcihib3VuZDogU3ltYm9saXplZCwgcG9zOiBWZWMyLCBzaXo6VmVjMiA9IG5ldyBWZWMyKDEwLDEwKSwgY29sb3I6c3RyaW5nID0gXCIjMDBmZjAwXCIsIGZhdGhlcjpDdXN0b21pemVkU3ByaXRlID0gUGVyZm9ybWFuY2VDZW50cmUuaW5zdGFuY2UuY2hlc3NCb2FyZCk6IHZvaWQge1xyXG4gICAgICAgIGxldCB0bXBBY3RvcjpBY3RvclJVID0gbmV3IEFjdG9yUlUoYm91bmQuc3ltYm9sLHBvcyxzaXosZmF0aGVyLGNvbG9yKTsvL+a4suafk2FjdG9yXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog5re75YqgL+S/ruaUuei/m+W6puadoVxyXG4gICAgICog6buY6K6k6L+b5bqm5p2h6ZW/MzDvvIzlrr0177yI6buY6K6k6L+b5bqm5p2h5a696auY5peg5rOV6YCa6L+H5pys5Ye95pWw5L+u5pS577yM5aaC6ZyA5L+u5pS56K+35YmN5b6AIC5cXFJob2RlIElzbGFuZFxcc3JjXFxSaG9kZXNfR2FtZVxcUGVyZm9ybWFuY2VfTW9kdWxlXFxTeW1ib2xpemVkUmVuZGVyLnRzXFxBY3RvclJVKVxyXG4gICAgICog6L+b5bqm6aKc6Imy5Li654Gw77yM5aaC6ZyA5L+u5pS56K+35YmN5b6AIC5cXFJob2RlIElzbGFuZFxcc3JjXFxSaG9kZXNfR2FtZVxcUGVyZm9ybWFuY2VfTW9kdWxlXFxBY3RvckNvbXBvbmVudC50c1xcQmFyXHJcbiAgICAgKiBAcGFyYW0gYm91bmQgYWN0b3JcclxuICAgICAqIEBwYXJhbSBiYXJfc3ltYk51bSDnrKzlh6DmoLnov5vluqbmnaHvvIjlp4vkuo4w77yJIFxyXG4gICAgICogQHBhcmFtIHBlcmNlbnRhZ2Ug6K+l6L+b5bqm5p2h6L+b5bqmXHJcbiAgICAgKiBAcGFyYW0gY29sb3Ig6K+l6L+b5bqm5p2h6IOM5pmv6aKc6ImyXHJcbiAgICAgKiBAcGFyYW0geCDov5vluqbmnaHplb/luqbvvIjkuIDlvovmjInlhajlsYDnvKnmlL7mr5TkuLox6K6h566X77yM5riy5p+T5Zmo5Lya5qC55o2u5YWo5bGA57yp5pS+5q+U6Ieq5Yqo5a6M5oiQ57yp5pS+5riy5p+T77yJXHJcbiAgICAgKiBAcGFyYW0geSDov5vluqbmnaHpq5jluqbvvIjkuIDlvovmjInlhajlsYDnvKnmlL7mr5TkuLox6K6h566X77yM5riy5p+T5Zmo5Lya5qC55o2u5YWo5bGA57yp5pS+5q+U6Ieq5Yqo5a6M5oiQ57yp5pS+5riy5p+T77yJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlZGl0QmFyKGJvdW5kOiBTeW1ib2xpemVkLCBiYXJfc3ltYk51bTpudW1iZXIgPSAwLCBwZXJjZW50YWdlOiBudW1iZXIgPSAxLCBjb2xvcjogc3RyaW5nID0gXCIjMDBmZjAwXCIsIHg/Om51bWJlciwgeT86bnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHRtcEFjdG9yOkFjdG9yUlUgPSBBY3RvckJveC5nZXQoYm91bmQuc3ltYm9sLmRhdGEpOy8v6I635Y+W5bey5riy5p+T55qEYWN0b3JSVeWvueixoVxyXG4gICAgICAgIGlmKHRtcEFjdG9yLmdldEJhcihiYXJfc3ltYk51bSkgPT09ICB1bmRlZmluZWQpey8v5aaC5p6c5a+55bqU6L+b5bqm5p2h5LiN5a2Y5ZyoXHJcbiAgICAgICAgICAgIHRtcEFjdG9yLmFkZEV4dEJhcihjb2xvcixiYXJfc3ltYk51bSxwZXJjZW50YWdlLHgseSk7Ly/moLnmja7ovpPlhaXlj4LmlbDmlrDlu7rov5vluqbmnaFcclxuXHJcbiAgICAgICAgfWVsc2V7Ly/lpoLlr7nlupTov5vluqbmnaHlt7LlrZjlnKhcclxuICAgICAgICAgICAgdG1wQWN0b3IuZWRpdEJhcihiYXJfc3ltYk51bSxwZXJjZW50YWdlKTsvL+S/ruaUueivpei/m+W6puadoeeZvuWIhuavlFxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5HluIPmlLvlh7vkuovku7ZcclxuICAgICAqIOatpOaWueazleiwg+eUqOWQjuivt+WLv+S/ruaUueWFqOWxgOe8qeaUvuavlO+8ge+8gVxyXG4gICAgICogQHBhcmFtIGZyb20g5Y+R5Yqo5pS75Ye76IqC54K5XHJcbiAgICAgKiBAcGFyYW0gdG8g6YGt5Y+X5omT5Ye76IqC54K5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZWZhdWx0QXRrRWZmZWN0KGZyb206IFN5bWJvbGl6ZWQsIHRvOiBTeW1ib2xpemVkKTogdm9pZCB7XHJcbiAgICAgICAgLy/miZPlh7vkuovku7bjgIHlj5HliqjmlLvlh7voioLngrnlkozpga3lj5fmlLvlh7voioLngrnlj4LmlbBcclxuICAgICAgICBBY3RvckJveC5nZXQoZnJvbS5zeW1ib2wuZGF0YSkuaGl0KHRvKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWPkeW4g+WPl+S8pOS6i+S7tlxyXG4gICAgICog5q2k5pa55rOV6LCD55So5ZCO6K+35Yu/5L+u5pS55YWo5bGA57yp5pS+5q+U77yB77yBXHJcbiAgICAgKiBAcGFyYW0gYm91bmQg5Y+X5Lyk6IqC54K5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZWZhdWx0RG1nRWZmZWN0KGJvdW5kOiBTeW1ib2xpemVkKTogdm9pZCB7XHJcbiAgICAgICAgLy/lj5fkvKTkuovku7blkozlj5fkvKToioLngrnlj4LmlbBcclxuICAgICAgICBBY3RvckJveC5nZXQoYm91bmQuc3ltYm9sLmRhdGEpLmRhbWFnZSgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmUgOavgeWvueixoe+8iOm7mOiupOmUgOavge+8iVxyXG4gICAgICogQHBhcmFtIGJvdW5kIOWvueixoVxyXG4gICAgICogQHBhcmFtIHBvcyDlnZDmoIfvvIjkuIDlvovmjInlhajlsYDnvKnmlL7mr5TkuLox6K6h566X77yM5riy5p+T5Zmo5Lya5qC55o2u5YWo5bGA57yp5pS+5q+U6Ieq5Yqo5a6M5oiQ57yp5pS+5riy5p+T77yJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXN0cm95QWN0b3IoYm91bmQ6IFN5bWJvbGl6ZWQsIHBvcz86IFZlYzIpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdG1wQWN0b3I6QWN0b3JSVSA9IEFjdG9yQm94LmdldChib3VuZC5zeW1ib2wuZGF0YSk7Ly/ojrflj5ZhY3RvclJV5a+56LGhXHJcbiAgICAgICAgaWYocG9zID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0bXBBY3Rvci5kZXN0b3J5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHBvcy5lcXVhbHModG1wQWN0b3IuZ2V0UG9zVmVjKCkpKXtcclxuICAgICAgICAgICAgdG1wQWN0b3IuZGVzdG9yeSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+mUgOavgWFjdG9yUlXlr7nosaFcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWcqGFjdG9y6Lqr5LiK5riy5p+T5paH5pysXHJcbiAgICAgKiDku4XlvZPlhajlsYDmlofmnKzmmL7npLrlvIDlhbNzd2l0Y2hIb3ZlclRleHTvvIjvvInlvIDlkK/ml7bmiY3kvJrmuLLmn5PmlofmnKzvvIzlvIDlhbPpu5jorqTlhbPpl61cclxuICAgICAqIEBwYXJhbSBib3VuZCBhY3RvclxyXG4gICAgICogQHBhcmFtIGNvbnRlbnQg5paH5pysXHJcbiAgICAgKiBAcGFyYW0gcG9zIOaWh+acrOi1t+Wni+WdkOagh++8iOS4gOW+i+aMieWFqOWxgOe8qeaUvuavlOS4ujHorqHnrpfvvIzmuLLmn5PlmajkvJrmoLnmja7lhajlsYDnvKnmlL7mr5Toh6rliqjlrozmiJDnvKnmlL7muLLmn5PvvIlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHdyaXRlKGJvdW5kOiBTeW1ib2xpemVkLCBjb250ZW50OiBzdHJpbmcsIHBvcz86IFZlYzIpOiB2b2lkIHtcclxuICAgICAgICBBY3RvckJveC5nZXQoYm91bmQuc3ltYm9sLmRhdGEpLmdldFRleHQoKS5zZXRUZXh0KGNvbnRlbnQpOy8v5L+u5pS5QWN0b3JSVeaWh+acrFxyXG4gICAgICAgIEFjdG9yQm94LmdldChib3VuZC5zeW1ib2wuZGF0YSkuZ2V0VGV4dCgpLnNldFBvcyhwb3MpOy8v5L+u5pS56K+l5paH5pys5L2N572uXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlhajlsYDmlofmnKzmmL7npLrlvIDlhbPvvIjpu5jorqTlhbPpl63vvIlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN3aXRjaEhvdmVyVGV4dCgpOiB2b2lkIHtcclxuICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5ldmVudChFdmVudENlbnRyZS5FVHlwZS5QRVJGT1JNQU5DRV9URVhUX1NXSVRDSCgpKTsvL+WPkeW4g+aWh+acrOW8gOWFs+S6i+S7tu+8jOaMiemSruaWh+acrOS4jeWPl+W9seWTjVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog56e75YqoYWN0b3Llr7nosaFcclxuICAgICAqIEBwYXJhbSBib3VuZCBhY3RvclxyXG4gICAgICogQHBhcmFtIHBvcyDnm67moIflnZDmoIfvvIjkuIDlvovmjInlhajlsYDnvKnmlL7mr5TkuLox6K6h566X77yM5riy5p+T5Zmo5Lya5qC55o2u5YWo5bGA57yp5pS+5q+U6Ieq5Yqo5a6M5oiQ57yp5pS+5riy5p+T77yJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtb3ZlKGJvdW5kOiBTeW1ib2xpemVkLCBwb3M6IFZlYzIpOiB2b2lkIHtcclxuICAgICAgICBBY3RvckJveC5nZXQoYm91bmQuc3ltYm9sLmRhdGEpLnJlbG9jYXRlKHBvcyk7Ly/np7vliqhBY3RvclJV5a+56LGh5Z2Q5qCHXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWcqGFjdG9y6Lqr5LiK5re75Yqg5oyJ6ZKuXHJcbiAgICAgKiDmr4/kuKphY3RvclJV6buY6K6k5a2Y5ZyoMuS4quaMiemSru+8iOeCueWHu2FjdG9yUlXoioLngrnljbPlj6/mmL7npLrvvInvvIzlr7nlupTmkqTpgIDlkozmioDog73jgILor6XmjInpkq7lnZDmoIfjgIHlrr3pq5jjgIHpopzoibLjgIHlkI3lrZfkuI3lj6/kv67mlLnvvIzlip/og73pnIDku47lpJbpg6jmt7vliqBcclxuICAgICAqIEBwYXJhbSBib3VuZCBhY3RvclxyXG4gICAgICogQHBhcmFtIG51bSDmjInpkq7nvJblj7fvvIgwLDHkuLrpu5jorqTmjInpkq7vvIzpu5jorqTmjInpkq7kuI3oh6rluKbku7vkvZXlip/og73vvIzpnIDmiYvliqjmt7vliqDvvIlcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayDngrnlh7vmjInpkq7lkI7osIPnlKjnmoTlh73mlbBcclxuICAgICAqIEBwYXJhbSB0ZXh0IOaYvuekuuWcqOaMiemSruS4iueahOaWh+acrO+8iOm7mOiupOaYvuekuuS4lOaXoOazleS/ruaUue+8iVxyXG4gICAgICogQHBhcmFtIHBvcyDmjInpkq7otbflp4vlnZDmoIfvvIjkuIDlvovmjInlhajlsYDnvKnmlL7mr5TkuLox6K6h566X77yM5riy5p+T5Zmo5Lya5qC55o2u5YWo5bGA57yp5pS+5q+U6Ieq5Yqo5a6M5oiQ57yp5pS+5riy5p+T77yJXHJcbiAgICAgKiBAcGFyYW0gc2l6ZSDmjInpkq7lpKflsI/vvIjkuIDlvovmjInlhajlsYDnvKnmlL7mr5TkuLox6K6h566X77yM5riy5p+T5Zmo5Lya5qC55o2u5YWo5bGA57yp5pS+5q+U6Ieq5Yqo5a6M5oiQ57yp5pS+5riy5p+T77yJXHJcbiAgICAgKiBAcGFyYW0gY29sb3Ig5oyJ6ZKu6aKc6ImyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhdHRhY2hCdXR0b24oYm91bmQ6IFN5bWJvbGl6ZWQsbnVtOm51bWJlciwgY2FsbGJhY2s6IEZ1bmN0aW9uLCB0ZXh0Pzogc3RyaW5nLCBwb3M/OiBWZWMyLCBzaXplPzogVmVjMiwgY29sb3I/OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdG1wQWN0OkFjdG9yUlUgPSBBY3RvckJveC5nZXQoYm91bmQuc3ltYm9sLmRhdGEpOy8v6I635Y+WQWN0b3JSVeWvueixoVxyXG4gICAgICAgIGlmKHRtcEFjdC5nZXRCdXR0b24obnVtKSA9PT0gdW5kZWZpbmVkKXsvL+WmguaenOWvueW6lOaMiemSruS4jeWtmOWcqFxyXG4gICAgICAgICAgICBpZihwb3MgPT09IHVuZGVmaW5lZCl7Ly/lpoLmnpzkuI3ovpPlhaXmjIflrprlnZDmoIdcclxuICAgICAgICAgICAgICAgIHRtcEFjdC5hZGRFeHRyYUJ1dHRvbnNBdERlZkxvY2F0aW9uKHRleHQsbnVtLGNvbG9yLGNhbGxiYWNrKTsvL+WcqOm7mOiupOS9jee9ruaWsOW7uuaMiemSrlxyXG4gICAgICAgICAgICB9ZWxzZXsvL+WmguaenOi+k+WFpeaMh+WumuWdkOagh1xyXG4gICAgICAgICAgICAgICAgdG1wQWN0LmFkZEV4dHJhQnV0dG9uQXROb0RlZkxvY2F0aW9uKHRleHQsbnVtLGNhbGxiYWNrLHBvcyxzaXplLGNvbG9yKTsvL+WcqOaMh+WumuS9jee9ruaWsOW7uuaMiemSrlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7Ly/lpoLmnpzlr7nlupTmjInpkq7lrZjlnKhcclxuICAgICAgICAgICAgdG1wQWN0LmdldEJ1dHRvbihudW0pLnNldEZ1bmMoY2FsbGJhY2spOy8v6L6T5YWl5Yqf6IO95Ye95pWwXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSIsIi8vYXV0aG9yIE5hMkN1QzRPOFxyXG5cclxuaW1wb3J0IEN1c3RvbWl6ZWRTcHJpdGUgZnJvbSBcIi4vY3VzdG9taXplZFNwclwiO1xyXG5pbXBvcnQgeyBBY3RvckJveCB9IGZyb20gXCIuL29iamJveFwiO1xyXG5pbXBvcnQgeyBCYXIsIEJ1dHRvbiAsIFRleHQgfSBmcm9tIFwiLi9BY3RvckNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBNeVN5bWJvbCwgU3ltYm9saXplZCB9IGZyb20gXCIuLi8uLi8uLi9GaXgvRml4U3ltYm9sXCI7XHJcbmltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi4vLi4vRG9kTWF0aFwiO1xyXG5pbXBvcnQgeyBLVlBhaXIgfSBmcm9tIFwiLi4vLi4vRG9kRGF0YVN0cnVjdHVyZVwiO1xyXG5pbXBvcnQgeyBFdmVudENlbnRyZSB9IGZyb20gXCIuLi8uLi8uLi9FdmVudC9FdmVudENlbnRyZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjdG9yUlV7XHJcbiAgICBwcml2YXRlIF9pbml0UG9zOlZlYzI7Ly9hY3Rvcui1t+Wni+WdkOagh1xyXG4gICAgcHJpdmF0ZSBfaW5pdFNpemU6VmVjMjsvL2FjdG9y6LW35aeL5aSn5bCPXHJcbiAgICBwcml2YXRlIF9pbml0QmFySGVpZ2h0Om51bWJlciA9IDA7Ly/ov5vluqbmnaHlhbblrp7pq5jluqbmmoLlrZjlmahcclxuICAgIHByaXZhdGUgX3BvczpWZWMyOy8v5qC55o2u5YWo5bGA57yp5pS+5q+U5o2i566X5ZCO55qE5Y+v6KeB5Z2Q5qCHXHJcbiAgICBwcml2YXRlIF9zaXplOlZlYzI7Ly/moLnmja7lhajlsYDnvKnmlL7mr5TmjaLnrpflkI7nmoTlj6/op4HlpKflsI9cclxuICAgIHByaXZhdGUgX3NjYWxlOm51bWJlciA9IDE7Ly/lhajlsYDnvKnmlL7mr5RcclxuICAgIHByaXZhdGUgX3N5bWI6TXlTeW1ib2w7Ly9zeW1iXHJcbiAgICBwcml2YXRlIF9mYXRoZXI6Q3VzdG9taXplZFNwcml0ZTsvL+eItue7mOWbvuiKgueCuVxyXG4gICAgcHJpdmF0ZSBfc3ByOkN1c3RvbWl6ZWRTcHJpdGU7Ly/mnKznu5jlm77oioLngrlcclxuICAgIHByaXZhdGUgX2JhclBhaXI6S1ZQYWlyPEJhcj4gPSBuZXcgS1ZQYWlyPEJhcj4oKTsvL+i/m+W6puadoemUruWAvOe7hFxyXG4gICAgcHJpdmF0ZSBfdGV4dDpUZXh0Oy8v6buY6K6k5paH5pysXHJcbiAgICBwcml2YXRlIF9kZWZCdXR0b25TaG93ZWQ6Ym9vbGVhbiA9IGZhbHNlOy8v5piv5ZCm5pi+56S66buY6K6k5oyJ6ZKu77yM6buY6K6k5Li65ZCmXHJcbiAgICBwcml2YXRlIF9idXR0b25QYWlyOktWUGFpcjxCdXR0b24+ID0gbmV3IEtWUGFpcjxCdXR0b24+KCk7XHJcbiAgICBwcml2YXRlIF9idXR0b25IZWlnaHQ6bnVtYmVyOy8v5oyJ6ZKu6auY5bqm5pqC5a2Y5ZmoXHJcbiAgICBwcml2YXRlIF9kYW1hZ2U6Q3VzdG9taXplZFNwcml0ZTsvL+WPl+S8pOeJueaViOaYvuekuuiKgueCuVxyXG4gICAgcHJpdmF0ZSBfdHJhbnNwYXJlbmN5Om51bWJlciA9IDE7Ly/lj5fkvKTnibnmlYjlj4LmlbDmmoLlrZjlmahcclxuICAgIHByaXZhdGUgX2Zpc3Q6Q3VzdG9taXplZFNwcml0ZTsvL+aUu+WHu+eJueaViOaYvuekuuiKgueCuVxyXG4gICAgcHJpdmF0ZSBfbW92ZVBlcmNlbnRhZ2U6bnVtYmVyID0gMDsvL+aUu+WHu+eJueaViOWPguaVsOaaguWtmOWZqFxyXG4gICAgcHVibGljIF9jZW50ZXJQb3M6VmVjMjsvL+S4reW/g+WdkOagh1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlclVuaXTmnoTpgKDlmahcclxuICAgICAqIEBwYXJhbSBzeW1iIHN5bWJcclxuICAgICAqIEBwYXJhbSBwb3Mg6LW35aeL5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gc2l6ZSDlrr3pq5hcclxuICAgICAqIEBwYXJhbSBmYXRoZXIg54i257uY5Zu+6IqC54K5XHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHN5bWI6TXlTeW1ib2wsIHBvczpWZWMyLCBzaXplOlZlYzIsIGZhdGhlcjpDdXN0b21pemVkU3ByaXRlLCBjb2xvcjpzdHJpbmcgPSBcIiMwMGZmZmZcIiwgc2NhbGU6bnVtYmVyID0gMSl7XHJcbiAgICAgICAgdGhpcy5fZmF0aGVyID0gZmF0aGVyOy8v54i257uY5Zu+6IqC54K5XHJcbiAgICAgICAgdGhpcy5faW5pdFBvcyA9IHBvczsvL+i1t+Wni+WdkOagh1xyXG4gICAgICAgIHRoaXMuX2luaXRTaXplID0gc2l6ZTsvL+i1t+Wni+WuvemrmFxyXG4gICAgICAgIHRoaXMuX3NwciA9IG5ldyBDdXN0b21pemVkU3ByaXRlKCk7Ly/mlrDlu7rnu5jlm77oioLngrlcclxuICAgICAgICB0aGlzLl9mYXRoZXIuYWRkQ2hpbGQodGhpcy5fc3ByKTsvL+a3u+WKoOWtkOiKgueCuVxyXG4gICAgICAgIHRoaXMuc2V0RGF0YShzeW1iLG5ldyBWZWMyKHRoaXMuX2luaXRQb3MueCp0aGlzLl9zY2FsZSx0aGlzLl9pbml0UG9zLnkqdGhpcy5fc2NhbGUpLG5ldyBWZWMyKHRoaXMuX2luaXRTaXplLngqdGhpcy5fc2NhbGUsIHRoaXMuX2luaXRTaXplLnkqdGhpcy5fc2NhbGUpLGNvbG9yKTsvL+iuvue9rue7mOWbvuiKgueCueWPguaVsFxyXG4gICAgICAgIEFjdG9yQm94LmFkZCh0aGlzLHRoaXMuX3N5bWIpOy8v5bCG5pys5a+56LGh5re75Yqg5Yiw6ZSu5YC85a+5XHJcbiAgICAgICAgdGhpcy5hZGREZWZCYXIoKTsvL+a3u+WKoOm7mOiupOi/m+W6puadoVxyXG4gICAgICAgIHRoaXMuX3RleHQgPSBuZXcgVGV4dCh0aGlzLl9pbml0U2l6ZSx0aGlzLl9zY2FsZSk7Ly/mt7vliqDpu5jorqTmlofmnKxcclxuICAgICAgICB0aGlzLl90ZXh0LnNldFN5bWIodGhpcy5fc3ltYik7Ly9cclxuICAgICAgICB0aGlzLl9idXR0b25IZWlnaHQgPSB0aGlzLl9pbml0U2l6ZS55Oy8vXHJcbiAgICAgICAgdGhpcy5fc3ByLmFkZENoaWxkKHRoaXMuX3RleHQpOy8v6buY6K6k5paH5pys572u5LqO5a2Q6IqC54K5XHJcbiAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2Uub24oRXZlbnRDZW50cmUuRVR5cGUuUEVSRk9STUFOQ0VfUkVTQ0FMRSgpLHRoaXMsdGhpcy5yZVNjYWxlKTsvL+ebkeWQrOWFqOWxgOe8qeaUvuavlFxyXG4gICAgICAgIHRoaXMuX3Nwci5vbihMYXlhLkV2ZW50Lk1PVVNFX09WRVIsdGhpcyx0aGlzLm1vdXNlT3Zlcik7Ly9cclxuICAgICAgICB0aGlzLl9zcHIub24oTGF5YS5FdmVudC5NT1VTRV9PVVQsdGhpcyx0aGlzLm1vdXNlT3V0KTsvL1xyXG4gICAgICAgIHRoaXMuX3Nwci5vbihMYXlhLkV2ZW50Lk1PVVNFX1VQLHRoaXMsdGhpcy5zaG93RGVmYXVsdEJvdHRvbnMpOy8vXHJcbiAgICAgICAgdGhpcy5fZGFtYWdlID0gbmV3IEN1c3RvbWl6ZWRTcHJpdGUoKTsvL1xyXG4gICAgICAgIHRoaXMuX3Nwci5hZGRDaGlsZCh0aGlzLl9kYW1hZ2UpOy8vXHJcbiAgICAgICAgdGhpcy5fZGFtYWdlLnNldFBhcmFtKDAsMCx0aGlzLl9zaXplLngsdGhpcy5fc2l6ZS55LFwiI2Y5MTUyNlwiKTsvL1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZS5sb2NhdGlvbkFuZFNpemUoKTsvL1xyXG4gICAgICAgIHRoaXMuYWRkRGVmQnV0dG9ucygpOy8vXHJcbiAgICAgICAgdGhpcy5fZmlzdCA9IG5ldyBDdXN0b21pemVkU3ByaXRlKCk7Ly9cclxuICAgICAgICB0aGlzLl9maXN0LnNldFBhcmFtKHRoaXMuX2NlbnRlclBvcy54LHRoaXMuX2NlbnRlclBvcy55LDE2LDE2LFwiI0YzQzI0NlwiKTsvL1xyXG4gICAgICAgIHRoaXMuX2Zpc3QubG9jYXRpb25BbmRTaXplKCk7Ly9cclxuICAgICAgICB0aGlzLl9maXN0LnpPcmRlciA9IDI7Ly9cclxuICAgICAgICB0aGlzLl9zcHIuYWRkQ2hpbGQodGhpcy5fZmlzdCk7Ly9cclxuICAgICAgICBcclxuICAgICAgICBcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57lvZPliY3lj6/op4boioLngrnlnZDmoIdcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjdXJQb3MoKTpWZWMye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wb3M7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+R5Yqo5omT5Ye754m55pWIXHJcbiAgICAgKiBAcGFyYW0gdG8g5omT5Ye755uu5qCHXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoaXQodG86U3ltYm9saXplZCk6dm9pZHtcclxuICAgICAgICAvLyB0aGlzLl9maXN0LmdyYXBoaWNzLnNhdmUoKTtcclxuICAgICAgICB0aGlzLl9maXN0LmNlbnRyYWxTaGlmdENvbG9yZWQoKTtcclxuICAgICAgICBsZXQgdG1wVmVjOlZlYzIgPSBuZXcgVmVjMihBY3RvckJveC5nZXQodG8uc3ltYm9sLmRhdGEpLmN1clBvcygpLngtdGhpcy5fcG9zLngsQWN0b3JCb3guZ2V0KHRvLnN5bWJvbC5kYXRhKS5jdXJQb3MoKS55LXRoaXMuX3Bvcy55KTtcclxuICAgICAgICBsZXQgZnVuOkZ1bmN0aW9uID0gKHRhcmdldDpWZWMyKSA9PntcclxuICAgICAgICAgICAgaWYodGhpcy5fbW92ZVBlcmNlbnRhZ2UgPiAxKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21vdmVQZXJjZW50YWdlID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Zpc3QuZ3JhcGhpY3MuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuX2Zpc3QuZ3JhcGhpY3MucmVzdG9yZSgpO1xyXG4gICAgICAgICAgICAgICAgTGF5YS50aW1lci5jbGVhcih0aGlzLGZ1bik7XHJcbiAgICAgICAgICAgICAgICBBY3RvckJveC5nZXQodG8uc3ltYm9sLmRhdGEpLmRhbWFnZSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGN1ckxvY2FjdGlvbjpWZWMyID0gbmV3IFZlYzIoICgxNisgdGFyZ2V0LngpKnRoaXMuX21vdmVQZXJjZW50YWdlLCgxNisgdGFyZ2V0LnkpKnRoaXMuX21vdmVQZXJjZW50YWdlKTtcclxuICAgICAgICAgICAgdGhpcy5fbW92ZVBlcmNlbnRhZ2UgKz0gMC4wMjtcclxuICAgICAgICAgICAgdGhpcy5fZmlzdC5yZWxvY2F0ZShjdXJMb2NhY3Rpb24pO1xyXG4gICAgICAgICAgICB0aGlzLl9maXN0LnJvdGF0aW9uID0gMjAwMCAqIHRoaXMuX21vdmVQZXJjZW50YWdlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGF5YS50aW1lci5sb29wKDIwLHRoaXMsZnVuLFt0bXBWZWNdKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5Hliqjlj5fkvKTnibnmlYhcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRhbWFnZSgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlLnNldFBhcmFtKDAsMCx0aGlzLl9zaXplLngsdGhpcy5fc2l6ZS55KTtcclxuICAgICAgICB0aGlzLl9kYW1hZ2UubG9jYXRpb25BbmRTaXplKCk7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlLmNoYW5nZUNvbG9yKCk7XHJcbiAgICAgICAgbGV0IGZ1bjpGdW5jdGlvbiA9ICgpPT57XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX3RyYW5zcGFyZW5jeSA8IDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGFtYWdlLmdyYXBoaWNzLmNsZWFyKCk7IFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fdHJhbnNwYXJlbmN5ID0gMTtcclxuICAgICAgICAgICAgICAgIExheWEudGltZXIuY2xlYXIodGhpcyxmdW4pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLl90cmFuc3BhcmVuY3kgLT0gMC4wMztcclxuICAgICAgICAgICAgdGhpcy5fZGFtYWdlLmFscGhhID0gdGhpcy5fdHJhbnNwYXJlbmN5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBMYXlhLnRpbWVyLmxvb3AoMjAsdGhpcyxmdW4pO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuLLmn5Ppu5jorqTmjInpkq5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzaG93RGVmYXVsdEJvdHRvbnMoKTp2b2lke1xyXG4gICAgICAgIGlmKHRoaXMuX2RlZkJ1dHRvblNob3dlZCA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICB0aGlzLl9zcHIuYWRkQ2hpbGQodGhpcy5fYnV0dG9uUGFpci5yZWFkKDArXCJcIikuZ2V0U3ByKCkpO1xyXG4gICAgICAgICAgICB0aGlzLl9zcHIuYWRkQ2hpbGQodGhpcy5fYnV0dG9uUGFpci5yZWFkKDErXCJcIikuZ2V0U3ByKCkpO1xyXG4gICAgICAgICAgICB0aGlzLl9kZWZCdXR0b25TaG93ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9zcHIucmVtb3ZlQ2hpbGQodGhpcy5fYnV0dG9uUGFpci5yZWFkKDArXCJcIikuZ2V0U3ByKCkpO1xyXG4gICAgICAgICAgICB0aGlzLl9zcHIucmVtb3ZlQ2hpbGQodGhpcy5fYnV0dG9uUGFpci5yZWFkKDErXCJcIikuZ2V0U3ByKCkpO1xyXG4gICAgICAgICAgICB0aGlzLl9kZWZCdXR0b25TaG93ZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog5Y+R5biD6byg5qCH6L+b5YWl5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbW91c2VPdmVyKCk6dm9pZHtcclxuICAgICAgICB0aGlzLl90ZXh0LnNldFN3aXRjaE9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5HluIPpvKDmoIfnprvlvIDkuovku7ZcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBtb3VzZU91dCgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fdGV4dC5zZXRTd2l0Y2hPZmYoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmHjeiuvue8qeaUvuavlFxyXG4gICAgICogQHBhcmFtIHZhbHVlIOaWsOWFqOWxgOe8qeaUvuavlFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlU2NhbGUodmFsdWU6bnVtYmVyKTp2b2lke1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3NjYWxlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHRoaXMuX3N5bWIsdGhpcy5faW5pdFBvcyx0aGlzLl9pbml0U2l6ZSx0aGlzLl9zcHIuZ2V0Q29sb3IoKSk7XHJcbiAgICAgICAgdGhpcy5zZXRDb2xvcigpO1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZS5zZXRQYXJhbSgwLDAsdGhpcy5faW5pdFNpemUueCp0aGlzLl9zY2FsZSx0aGlzLl9pbml0U2l6ZS55KnRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9kYW1hZ2UubG9jYXRpb25BbmRTaXplKCk7XHJcbiAgICAgICAgXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5pysQVJV55qE5ZCE6aG55Y+C5pWwXHJcbiAgICAgKiBAcGFyYW0gc3ltYiBzeW1iXHJcbiAgICAgKiBAcGFyYW0gcG9zIOi1t+Wni+WdkOagh1xyXG4gICAgICogQHBhcmFtIHNpemUg5aSn5bCPXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXREYXRhKHN5bWI6TXlTeW1ib2wsIHBvczpWZWMyLCBzaXplOlZlYzIsY29sb3I6c3RyaW5nKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3N5bWIgPSBzeW1iO1xyXG4gICAgICAgIHRoaXMuX3BvcyA9IG5ldyBWZWMyKHBvcy54KnRoaXMuX3NjYWxlLHBvcy55KnRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9zaXplID0gbmV3IFZlYzIoc2l6ZS54KnRoaXMuX3NjYWxlLHNpemUueSp0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fc3ByLnNldFBhcmFtKHRoaXMuX3Bvcy54LHRoaXMuX3Bvcy55LHRoaXMuX3NpemUueCx0aGlzLl9zaXplLnksY29sb3IpO1xyXG4gICAgICAgIHRoaXMuc2V0Q29sb3IoKTtcclxuICAgICAgICB0aGlzLl9zcHIubG9jYXRpb25BbmRTaXplKCk7XHJcbiAgICAgICAgdGhpcy5fY2VudGVyUG9zID0gbmV3IFZlYzIodGhpcy5fc2l6ZS54LzIsdGhpcy5fc2l6ZS55LzIpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIGNvbG9yIOiuvue9ruminOiJslxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0Q29sb3IoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3Nwci5jaGFuZ2VDb2xvcigpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHBvcyDph43mlrDorr7nva7otbflp4vlnZDmoIfvvIjkuI3lj5fnvKnmlL7mr5TlvbHlk43vvIlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbG9jYXRlKHBvczpWZWMyKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3BvcyA9IG5ldyBWZWMyKHBvcy54KnRoaXMuX3NjYWxlLHBvcy55KnRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9pbml0UG9zID0gcG9zLmNsb25lKCk7XHJcbiAgICAgICAgdGhpcy5fc3ByLnJlbG9jYXRlKHBvcyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pGn5q+B5pysQVJVXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZXN0b3J5KCk6dm9pZHtcclxuICAgICAgICB0aGlzLl9zcHIuZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5pysQVJV55qE6LW35aeL5Z2Q5qCH77yI5LiN5Y+X57yp5pS+5q+U5b2x5ZON77yJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRQb3NWZWMoKTpWZWMye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbml0UG9zO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluacrEFSVeeahOm7mOiupOaWh+acrOWvueixoVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0VGV4dCgpOlRleHR7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RleHQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5re75Yqg6buY6K6k6L+b5bqm5p2hXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGREZWZCYXIoKTp2b2lke1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX2luaXRCYXJIZWlnaHQgPSAwO1xyXG4gICAgICAgIGxldCB0bXA6QmFyID0gbmV3IEJhcigwLFwiIzAwZmZmZlwiLG5ldyBWZWMyKDMwLDUpLG5ldyBWZWMyKDAsdGhpcy5faW5pdEJhckhlaWdodCAtIDYpLHRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9zcHIuYWRkQ2hpbGQodG1wLmdldEJhY2tTcHIoKSk7XHJcbiAgICAgICAgdGhpcy5fYmFyUGFpci5lZGl0KFwiYmFyXzBcIix0bXApO1xyXG4gICAgICAgIHRoaXMuX2luaXRCYXJIZWlnaHQgPSB0aGlzLl9pbml0QmFySGVpZ2h0IC0gdG1wLmdldEhlaWdodCgpIC0gMTtcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluacrEFSVeeahOaMh+Wumui/m+W6puadoVxyXG4gICAgICogQHBhcmFtIG51bSDov5vluqbmnaHku6Plj7dcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEJhcihudW06bnVtYmVyKTpCYXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JhclBhaXIucmVhZChgYmFyXyR7bnVtfWApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5re75Yqg6ZmE5Yqg6L+b5bqm5p2hXHJcbiAgICAgKiBAcGFyYW0gYmFja0dyb3VuZENvbG9yIOiuvue9ruaWsOWinui/m+W6puadoeminOiJslxyXG4gICAgICogQHBhcmFtIHN5bWIg6K6+572u5paw5aKe6L+b5bqm5p2h5Luj5Y+3XHJcbiAgICAgKiBAcGFyYW0geCDlrr3luqZcclxuICAgICAqIEBwYXJhbSB5IOmrmOW6plxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkRXh0QmFyKGJhY2tHcm91bmRDb2xvcjpzdHJpbmcsc3ltYjpudW1iZXIscGVyY2VudGFnZTpudW1iZXIseDpudW1iZXIgPSAzMCx5Om51bWJlciA9IDUpOnZvaWR7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHRtcEJhcjpCYXIgPSBuZXcgQmFyKHN5bWIsYmFja0dyb3VuZENvbG9yLG5ldyBWZWMyKHgseSksbmV3IFZlYzIoMCx0aGlzLl9pbml0QmFySGVpZ2h0IC0geSAtIDEpLHRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9zcHIuYWRkQ2hpbGQodG1wQmFyLmdldEJhY2tTcHIoKSk7XHJcbiAgICAgICAgdGhpcy5fYmFyUGFpci5lZGl0KGBiYXJfJHtzeW1ifWAsdG1wQmFyKTtcclxuICAgICAgICB0aGlzLl9pbml0QmFySGVpZ2h0ID0gdGhpcy5faW5pdEJhckhlaWdodCAtIHRtcEJhci5nZXRIZWlnaHQoKSAtIDE7XHJcbiAgICAgICAgdG1wQmFyLnBlcmNlbnRhZ2UgPSBwZXJjZW50YWdlO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkv67mlLnlt7LmnInov5vluqbmnaFcclxuICAgICAqIEBwYXJhbSBzeW1iIOaMh+Wumui/m+W6puadoeS7o+WPt1xyXG4gICAgICogQHBhcmFtIHBlcmNlbnRhZ2Ug5L+u5pS56L+b5bqm5p2h6L+b5bqmXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlZGl0QmFyKHN5bWI6bnVtYmVyLCBwZXJjZW50YWdlOm51bWJlcik6dm9pZHtcclxuICAgICAgICB0aGlzLl9iYXJQYWlyLnJlYWQoYGJhcl8ke3N5bWJ9YCkucGVyY2VudGFnZSA9IHBlcmNlbnRhZ2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5re75Yqg6buY6K6k5oyJ6ZKuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkRGVmQnV0dG9ucygpOnZvaWR7XHJcbiAgICAgICAgbGV0IHRtcDE6QnV0dG9uID0gbmV3IEJ1dHRvbih0aGlzLl9zeW1iLFwiUmV0cmVhdFwiLDAsbmV3IFZlYzIoIC0gMjAsdGhpcy5faW5pdFNpemUueSksbmV3IFZlYzIoMjAsMTUpLHVuZGVmaW5lZCx0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fYnV0dG9uUGFpci5lZGl0KFwiMFwiLHRtcDEpO1xyXG4gICAgICAgIGxldCB0bXAyOkJ1dHRvbiA9IG5ldyBCdXR0b24odGhpcy5fc3ltYixcIkFjdGl2YXRlX1NraWxsXCIsMCxuZXcgVmVjMih0aGlzLl9pbml0U2l6ZS54LHRoaXMuX2luaXRTaXplLnkpLG5ldyBWZWMyKDIwLDE1KSx1bmRlZmluZWQsdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX2J1dHRvblBhaXIuZWRpdChcIjFcIix0bXAyKTtcclxuICAgICAgICB0aGlzLl9idXR0b25IZWlnaHQgPSB0aGlzLl9pbml0U2l6ZS55ICsgMTY7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Zyo6buY6K6k5L2N572u5re75Yqg6aKd5aSW5oyJ6ZKuXHJcbiAgICAgKiBAcGFyYW0gbmFtZSBcclxuICAgICAqIEBwYXJhbSBudW0gXHJcbiAgICAgKiBAcGFyYW0gY29sb3IgXHJcbiAgICAgKiBAcGFyYW0gZnVuIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkRXh0cmFCdXR0b25zQXREZWZMb2NhdGlvbihuYW1lOnN0cmluZyxudW06bnVtYmVyLCBjb2xvcj86c3RyaW5nLCBmdW4/OkZ1bmN0aW9uKTp2b2lke1xyXG4gICAgICAgIGxldCB0bXBCdXQ6QnV0dG9uID0gbmV3IEJ1dHRvbih0aGlzLl9zeW1iLG5hbWUsbnVtLG5ldyBWZWMyKDAsdGhpcy5fYnV0dG9uSGVpZ2h0KSxuZXcgVmVjMigyMCwxNSksY29sb3IsdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX2J1dHRvblBhaXIuZWRpdChudW0rXCJcIix0bXBCdXQpO1xyXG4gICAgICAgIHRoaXMuX3Nwci5hZGRDaGlsZCh0bXBCdXQuZ2V0U3ByKCkpO1xyXG4gICAgICAgIHRoaXMuX2J1dHRvbkhlaWdodCArPSAxNjtcclxuICAgICAgICB0bXBCdXQuc2V0RnVuYyhmdW4pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Zyo5oyH5a6a5L2N572u5re75Yqg6aKd5aSW5oyJ6ZKuXHJcbiAgICAgKiBAcGFyYW0gbmFtZSBcclxuICAgICAqIEBwYXJhbSBudW0gXHJcbiAgICAgKiBAcGFyYW0gZnVuIFxyXG4gICAgICogQHBhcmFtIHBvcyBcclxuICAgICAqIEBwYXJhbSBzaXplIFxyXG4gICAgICogQHBhcmFtIGNvbG9yIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkRXh0cmFCdXR0b25BdE5vRGVmTG9jYXRpb24obmFtZTpzdHJpbmcsbnVtOm51bWJlcixmdW46RnVuY3Rpb24scG9zOlZlYzIsc2l6ZTpWZWMyLCBjb2xvcj86c3RyaW5nKTp2b2lke1xyXG4gICAgICAgIGxldCB0bXBCdXQ6QnV0dG9uID0gbmV3IEJ1dHRvbih0aGlzLl9zeW1iLG5hbWUsbnVtLHBvcyxzaXplLGNvbG9yLHRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9idXR0b25QYWlyLmVkaXQobnVtK1wiXCIsdG1wQnV0KTtcclxuICAgICAgICB0aGlzLl9zcHIuYWRkQ2hpbGQodG1wQnV0LmdldFNwcigpKTtcclxuICAgICAgICB0bXBCdXQuc2V0RnVuYyhmdW4pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5oyJ6ZKuXHJcbiAgICAgKiBAcGFyYW0gbnVtIOaMiemSrue8luWPt1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0QnV0dG9uKG51bTpudW1iZXIpOkJ1dHRvbntcclxuICAgICAgICByZXR1cm4gdGhpcy5fYnV0dG9uUGFpci5yZWFkKG51bStcIlwiKTtcclxuICAgIH1cclxuXHJcbn1cclxuIiwiLy9hdXRob3IgTmEyQ3VDNE84XHJcbmltcG9ydCBDdXN0b21pemVkU3ByaXRlIGZyb20gXCIuL2N1c3RvbWl6ZWRTcHJcIjtcclxuaW1wb3J0IHsgVmVjMiB9IGZyb20gXCIuLi8uLi9Eb2RNYXRoXCI7XHJcbmltcG9ydCB7IEV2ZW50Q2VudHJlIH0gZnJvbSBcIi4uLy4uLy4uL0V2ZW50L0V2ZW50Q2VudHJlXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIENoZXNzQm9hcmQgZXh0ZW5kcyBDdXN0b21pemVkU3ByaXRle1xyXG4gICAgcHJpdmF0ZSBfaW5pdFBvczpWZWMyO1xyXG4gICAgcHJpdmF0ZSBfaW5pdFNpemU6VmVjMjtcclxuICAgIHByaXZhdGUgX251bUFycjpudW1iZXJbXVtdOy8vMmQgYXJyIHdoaWNoIHJlcHJlc2VudHMgdGhlIGNoZXNzIGJvYXJkXHJcbiAgICBwcml2YXRlIF9wb3NWZWMyOlZlYzI7Ly9pbml0aWFsIGxvY2F0aW9uKHgseSlcclxuICAgIHByaXZhdGUgX3VuaXRTaXplVmVjMjpWZWMyOy8vdW5pdCBzaXplKHdpZHRoLCBoZWlnaHQpXHJcbiAgICBwcml2YXRlIF9mcm9udFNwckFycjpDdXN0b21pemVkU3ByaXRlW11bXTsvL2Zyb250IHNwclxyXG4gICAgcHJpdmF0ZSBfc2NhbGU6bnVtYmVyOy8vc2NhbGUgZm9yIHpvb21pbmdcclxuICAgIHByaXZhdGUgX2JhY2tHcm91bmRDb2xvcjpzdHJpbmc7Ly9iYWNrZ3JvdW5kIGNvbG9yXHJcbiAgICBwcml2YXRlIF9mcm9udENvbG9yOnN0cmluZzsvL2Zyb250IGNvbG9yIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qOL55uY5p6E6YCg5ZmoXHJcbiAgICAgKiBAcGFyYW0gYXJyIOS6jOe7tOaVsOe7hFxyXG4gICAgICogQHBhcmFtIHBvc1ZlYzIg6LW35aeL5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gdW5pdHNpemUg5Y2V5L2N5a696auYXHJcbiAgICAgKiBAcGFyYW0gYmFja0dyb3VuZENvbG9yIOiDjOaZr+minOiJslxyXG4gICAgICogQHBhcmFtIGZyb250Q29sb3Ig5qC85a2Q6aKc6ImyXHJcbiAgICAgKiBAcGFyYW0gZmF0aGVyIOeItue7mOWbvuiKgueCuVxyXG4gICAgICogQHBhcmFtIHNjYWxlIOe8qeaUvuavlFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihhcnI6bnVtYmVyW11bXSwgcG9zVmVjMjpWZWMyLCB1bml0c2l6ZTpWZWMyLCBiYWNrR3JvdW5kQ29sb3I6c3RyaW5nLCBmcm9udENvbG9yOnN0cmluZywgc2NhbGU6bnVtYmVyKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX251bUFyciA9IGFycjtcclxuICAgICAgICB0aGlzLl9pbml0UG9zID0gcG9zVmVjMjtcclxuICAgICAgICB0aGlzLl9pbml0U2l6ZSA9IHVuaXRzaXplO1xyXG4gICAgICAgIHRoaXMuX3NjYWxlID0gc2NhbGU7XHJcbiAgICAgICAgdGhpcy5fcG9zVmVjMiA9IG5ldyBWZWMyKHRoaXMuX2luaXRQb3MueCp0aGlzLl9zY2FsZSwgdGhpcy5faW5pdFBvcy55KnRoaXMuX3NjYWxlKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl91bml0U2l6ZVZlYzIgPSBuZXcgVmVjMih0aGlzLl9pbml0U2l6ZS54ICogdGhpcy5fc2NhbGUsdGhpcy5faW5pdFNpemUueSAqIHRoaXMuX3NjYWxlKTsvL3JlY2FsY3VsYXRlIHVuaXRTaXplXHJcbiAgICAgICAgdGhpcy5fYmFja0dyb3VuZENvbG9yID0gYmFja0dyb3VuZENvbG9yO1xyXG4gICAgICAgIHRoaXMuX2Zyb250Q29sb3IgPSBmcm9udENvbG9yO1xyXG4gICAgICAgIHRoaXMuaW5pdEJhY2tncm91bmQoKTtcclxuICAgICAgICB0aGlzLnNldENvbG9yKHRoaXMuX2JhY2tHcm91bmRDb2xvcik7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VDb2xvcigpO1xyXG4gICAgICAgIHRoaXMuaW5pdEZyb250U3ByQXJyKCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJGcm9udFNwcih0aGlzLl9mcm9udENvbG9yKTtcclxuICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5vbihFdmVudENlbnRyZS5FVHlwZS5QRVJGT1JNQU5DRV9SRVNDQUxFKCksdGhpcyx0aGlzLnJlU2NhbGUpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGRyYXcgYmFja2dyb3VuZFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRCYWNrZ3JvdW5kKCk6dm9pZHtcclxuICAgICAgICB0aGlzLnNldFBhcmFtKHRoaXMuX3Bvc1ZlYzIueCx0aGlzLl9wb3NWZWMyLnksdGhpcy5fbnVtQXJyWzBdLmxlbmd0aCp0aGlzLl91bml0U2l6ZVZlYzIueCx0aGlzLl9udW1BcnIubGVuZ3RoKnRoaXMuX3VuaXRTaXplVmVjMi55LHRoaXMuX2JhY2tHcm91bmRDb2xvcik7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbkFuZFNpemUoKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGRyYXcgZnJvbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0RnJvbnRTcHJBcnIoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX2Zyb250U3ByQXJyID0gW107Ly9pbml0IGN1c3RTcHJBcnJcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fbnVtQXJyLmxlbmd0aDsgaSArKyl7XHJcbiAgICAgICAgICAgIGxldCB0bXBBcnI6Q3VzdG9taXplZFNwcml0ZVtdID0gW107XHJcbiAgICAgICAgICAgIGZvciggbGV0IGogPSAwOyBqIDwgdGhpcy5fbnVtQXJyWzBdLmxlbmd0aDsgaiArKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG1wU3ByOkN1c3RvbWl6ZWRTcHJpdGUgPSBuZXcgQ3VzdG9taXplZFNwcml0ZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDaGlsZCh0bXBTcHIpO1xyXG4gICAgICAgICAgICAgICAgdG1wU3ByLnNldFBhcmFtKDAraip0aGlzLl91bml0U2l6ZVZlYzIueCwwK2kqdGhpcy5fdW5pdFNpemVWZWMyLnksdGhpcy5fdW5pdFNpemVWZWMyLngsdGhpcy5fdW5pdFNpemVWZWMyLnksdGhpcy5fZnJvbnRDb2xvcixuZXcgVmVjMigxLDEpKTtcclxuICAgICAgICAgICAgICAgIHRtcFNwci5sb2NhdGlvbkFuZFNpemUoKTtcclxuICAgICAgICAgICAgICAgIHRtcFNwci5zZXRDb2xvcih0aGlzLl9mcm9udENvbG9yKTtcclxuICAgICAgICAgICAgICAgIHRtcFNwci5jaGFuZ2VDb2xvcigpO1xyXG4gICAgICAgICAgICAgICAgdG1wU3ByLnpPcmRlciA9IC0xO1xyXG4gICAgICAgICAgICAgICAgdG1wQXJyLnB1c2godG1wU3ByKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9mcm9udFNwckFyci5wdXNoKHRtcEFycik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gY29sb3IgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVuZGVyRnJvbnRTcHIoY29sb3I6c3RyaW5nKXtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fZnJvbnRTcHJBcnIubGVuZ3RoOyBpICsrKXtcclxuICAgICAgICAgICAgZm9yKCBsZXQgaiA9IDA7IGogPCB0aGlzLl9mcm9udFNwckFyclswXS5sZW5ndGg7IGogKyspe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZnJvbnRTcHJBcnJbaV1bal0uc2V0Q29sb3IoY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZnJvbnRTcHJBcnJbaV1bal0uY2hhbmdlQ29sb3IoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS/ruaUueWJjeaWueagvOWtkOminOiJslxyXG4gICAgICogQHBhcmFtIHBvc1ZlYzIg5b6F5L+u5pS55qC85a2Q5Z2Q5qCH77yIeCx577yJXHJcbiAgICAgKiBAcGFyYW0gY29sb3Ig55uu5qCH6aKc6ImyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjaGFuZ2VGcm9udENvbG9yKHBvc1ZlYzI6VmVjMixjb2xvcjpzdHJpbmcpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fZnJvbnRTcHJBcnJbcG9zVmVjMi55XVtwb3NWZWMyLnhdLnNldENvbG9yKGNvbG9yKTtcclxuICAgICAgICB0aGlzLl9mcm9udFNwckFycltwb3NWZWMyLnldW3Bvc1ZlYzIueF0uY2hhbmdlQ29sb3IoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa4hemZpOaJgOacieW3sue7mOWbvuW9olxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNsZWFyQWxsKCk6dm9pZHtcclxuICAgICAgICB0aGlzLmdyYXBoaWNzLmNsZWFyKCk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuX2Zyb250U3ByQXJyLmxlbmd0aDsgaSArKyl7XHJcbiAgICAgICAgICAgIGZvciggbGV0IGogPSAwOyBqIDwgdGhpcy5fZnJvbnRTcHJBcnJbMF0ubGVuZ3RoOyBqICsrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Zyb250U3ByQXJyW2ldW2pdLmdyYXBoaWNzLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDph43orr7mo4vnm5jnvKnmlL7mr5RcclxuICAgICAqIEBwYXJhbSBudW0g57yp5pS+5q+UXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZVNjYWxlKG51bTpudW1iZXIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fc2NhbGUgPSBudW07XHJcbiAgICAgICAgdGhpcy5fcG9zVmVjMiA9IG5ldyBWZWMyKHRoaXMuX2luaXRQb3MueCp0aGlzLl9zY2FsZSx0aGlzLl9pbml0UG9zLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX3VuaXRTaXplVmVjMiA9IG5ldyBWZWMyKHRoaXMuX2luaXRTaXplLnggKiB0aGlzLl9zY2FsZSx0aGlzLl9pbml0U2l6ZS55ICogdGhpcy5fc2NhbGUpOy8vcmVjYWxjdWxhdGUgdW5pdFNpemVcclxuICAgICAgICB0aGlzLmNsZWFyQWxsKCk7XHJcbiAgICAgICAgdGhpcy5pbml0QmFja2dyb3VuZCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdEZyb250U3ByQXJyKCk7XHJcbiAgICAgICAgdGhpcy5zZXRDb2xvcih0aGlzLl9iYWNrR3JvdW5kQ29sb3IpO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlQ29sb3IoKTtcclxuICAgICAgICB0aGlzLnJlbmRlckZyb250U3ByKHRoaXMuX2Zyb250Q29sb3IpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIiwiaW1wb3J0IHsgVmVjMiB9IGZyb20gXCIuLi8uLi9Eb2RNYXRoXCI7XHJcblxyXG4vL2F1dGhvciBOYTJDdUM0TzhcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1c3RvbWl6ZWRTcHJpdGUgZXh0ZW5kcyBMYXlhLlNwcml0ZXtcclxuICAgIHByaXZhdGUgX2NvbG9yOnN0cmluZzsvL+WPr+inhuiKgueCueminOiJslxyXG4gICAgcHJpdmF0ZSBfZ3JhcGhpY1NoaWZ0OlZlYzI7Ly/ph43lj6Dnu5jlm77lgY/np7vph49cclxuICAgIHByaXZhdGUgX2NlbnRyYWxTaGlmdDsvL+S4reW/g+e7mOWbvuWBj+enu+mHj1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2VudHJhbFNoaWZ0Q29sb3JlZCgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5ncmFwaGljcy5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuZ3JhcGhpY3MuZHJhd1JlY3QoLXRoaXMud2lkdGgvMiwtdGhpcy5oZWlnaHQvMix0aGlzLndpZHRoLHRoaXMuaGVpZ2h0LHRoaXMuX2NvbG9yKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGNvbG9yIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0Q29sb3IoY29sb3I6c3RyaW5nKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX2NvbG9yID0gY29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkv67mlLnpopzoibJcclxuICAgICAqIEBwYXJhbSBjb2xvciDnm67moIfpopzoibJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNoYW5nZUNvbG9yKCk6dm9pZHtcclxuICAgICAgICB0aGlzLmdyYXBoaWNzLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5ncmFwaGljcy5kcmF3UmVjdCh0aGlzLl9ncmFwaGljU2hpZnQueCx0aGlzLl9ncmFwaGljU2hpZnQueSx0aGlzLndpZHRoLTIqdGhpcy5fZ3JhcGhpY1NoaWZ0LngsdGhpcy5oZWlnaHQtMip0aGlzLl9ncmFwaGljU2hpZnQueSx0aGlzLl9jb2xvcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7nm7jlhbPlj4LmlbBcclxuICAgICAqIEBwYXJhbSBwb3NYIOi1t+Wni3hcclxuICAgICAqIEBwYXJhbSBwb3NZIOi1t+Wni3lcclxuICAgICAqIEBwYXJhbSB3aWR0aCDlrr3luqZcclxuICAgICAqIEBwYXJhbSBoZWlnaHQg6auY5bqmXHJcbiAgICAgKiBAcGFyYW0gY29sb3Ig6aKc6ImyXHJcbiAgICAgKiBAcGFyYW0gZ3JhcGhpY1NoaWZ0IOaji+ebmOWBj+enu+WAvFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0UGFyYW0ocG9zWDpudW1iZXIsIHBvc1k6bnVtYmVyLCB3aWR0aDpudW1iZXIsIGhlaWdodDpudW1iZXIsIGNvbG9yOnN0cmluZyA9IHRoaXMuX2NvbG9yLCBncmFwaGljU2hpZnQ6VmVjMiA9IG5ldyBWZWMyKDAsMCkpOnZvaWR7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy54ID0gcG9zWDtcclxuICAgICAgICB0aGlzLnkgPSBwb3NZO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICB0aGlzLnNldENvbG9yKGNvbG9yKTtcclxuICAgICAgICB0aGlzLl9ncmFwaGljU2hpZnQgPSBncmFwaGljU2hpZnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkv67mlLnlnZDmoIflkozlpKflsI9cclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvY2F0aW9uQW5kU2l6ZSgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5wb3ModGhpcy54LHRoaXMueSkuc2l6ZSh0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmHjeiuvuWdkOagh1xyXG4gICAgICogQHBhcmFtIHBvc1ZlYzIg55uu5qCH5Z2Q5qCHXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWxvY2F0ZShwb3NWZWMyOlZlYzIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy54ID0gcG9zVmVjMi54O1xyXG4gICAgICAgIHRoaXMueSA9IHBvc1ZlYzIueTtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uQW5kU2l6ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YeN6K6+5a696auYXHJcbiAgICAgKiBAcGFyYW0gc2l6ZVZlYzIg55uu5qCH5a696auYXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZVNpemUoc2l6ZVZlYzI6VmVjMik6dm9pZHtcclxuICAgICAgICB0aGlzLndpZHRoID0gc2l6ZVZlYzIueDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IHNpemVWZWMyLnk7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VDb2xvcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue5b2T5YmN5Zu+5b2i6LW35aeL5Z2Q5qCHXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRQb3MoKTpWZWMye1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjMih0aGlzLngsdGhpcy55KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuW3sue7mOWMuuWfn+Wkp+Wwj1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0U2l6ZSgpOlZlYzJ7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMyKHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBcclxuICAgICAqIOi/lOWbnuW9k+WJjeW3sue7mOWMuuWfn+minOiJslxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Q29sb3IoKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xyXG4gICAgfVxyXG59IiwiLy9hdXRob3IgTmEyQ3VDNE84XHJcblxyXG5pbXBvcnQgQWN0b3JSVSBmcm9tIFwiLi9TeW1ib2xpemVkUmVuZGVyXCI7XHJcbmltcG9ydCB7IEtWUGFpciB9IGZyb20gXCIuLi8uLi9Eb2REYXRhU3RydWN0dXJlXCI7XHJcbmltcG9ydCB7IE15U3ltYm9sIH0gZnJvbSBcIi4uLy4uLy4uL0ZpeC9GaXhTeW1ib2xcIjtcclxuXHJcblxyXG4vL+WCqOWtmOaJgOaciee7mOWbvuiKgueCueWvueixoVxyXG5leHBvcnQgY2xhc3MgQWN0b3JCb3h7XHJcbiAgICBwdWJsaWMgc3RhdGljIEJveDpLVlBhaXI8QWN0b3JSVT4gPSBuZXcgS1ZQYWlyKCk7XHJcbiAgICBwdWJsaWMgc3RhdGljIGFkZChhY3Q6QWN0b3JSVSxzeW1iOk15U3ltYm9sKTp2b2lke1xyXG4gICAgICAgIEFjdG9yQm94LkJveC5lZGl0KHN5bWIuZGF0YStcIlwiLGFjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQoc3ltOm51bWJlcik6QWN0b3JSVXtcclxuICAgICAgICByZXR1cm4gQWN0b3JCb3guQm94LnJlYWQoc3ltK1wiXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG59IiwiaW1wb3J0IHsgVmVjMiB9IGZyb20gXCIuLi9Db21tb24vRG9kTWF0aFwiO1xyXG5pbXBvcnQgeyBNeVN5bWJvbCB9IGZyb20gXCIuLi9GaXgvRml4U3ltYm9sXCI7XHJcbi8vLy8vL1xyXG5leHBvcnQgY2xhc3MgRXZlbnRDZW50cmV7XHJcbiAgICBwdWJsaWMgc3RhdGljIGluc3RhbmNlOkV2ZW50Q2VudHJlO1xyXG4gICAgcHVibGljIHN0YXRpYyBFVHlwZTpFVHlwZTtcclxuICAgIHB1YmxpYyBzdGF0aWMgaW5pdCgpOnZvaWR7XHJcbiAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2UgPSBuZXcgRXZlbnRDZW50cmUoKTtcclxuICAgICAgICBFdmVudENlbnRyZS5FVHlwZSA9IG5ldyBFVHlwZSgpO1xyXG4gICAgICAgIEV2ZW50Q2VudHJlLmluaXQgPSAoKT0+e307XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgX2NlbnRyZTpMYXlhLkV2ZW50RGlzcGF0Y2hlciA9IG5ldyBMYXlhLkV2ZW50RGlzcGF0Y2hlcigpO1xyXG5cclxuICAgIHB1YmxpYyBvbih0eXBlOnN0cmluZywgY2FsbGVyOmFueSwgbGlzdGVuZXI6RnVuY3Rpb24sIGFyZ3M/OmFueVtdKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX2NlbnRyZS5vbih0eXBlLGNhbGxlcixsaXN0ZW5lcixhcmdzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXZlbnQodHlwZTpzdHJpbmcsIGFyZ3M/OmFueSk6dm9pZHtcclxuICAgICAgICB0aGlzLl9jZW50cmUuZXZlbnQodHlwZSxhcmdzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb2ZmKHR5cGU6c3RyaW5nLCBjYWxsZXI6YW55LCBsaXN0ZW5lcjpGdW5jdGlvbil7XHJcbiAgICAgICAgdGhpcy5fY2VudHJlLm9mZih0eXBlLCBjYWxsZXIsIGxpc3RlbmVyKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcigpe31cclxufVxyXG5cclxuXHJcbmNsYXNzIEVUeXBlIHtcclxuICAgIHB1YmxpYyBMRUFWRShwb3M6VmVjMiwgaWRlbnRpdHk6c3RyaW5nKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIGAke2lkZW50aXR5fTpDT0xMSVNJT05fRVZFTlRfTEVBVkVfRlJPTSgke3Bvcy54fXwke3Bvcy55fSlgO1xyXG4gICAgfVxyXG4gICAgcHVibGljIEVOVFJFKHBvczpWZWMyLCBpZGVudGl0eTpzdHJpbmcpOnN0cmluZ3tcclxuICAgICAgICByZXR1cm4gYCR7aWRlbnRpdHl9OkNPTExJU0lPTl9FVkVOVF9FTlRSRV9UTygke3Bvcy54fXwke3Bvcy55fSlgO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbmV3IGFkZGVkIGZvciBwZXJmb3JtYW5jZSBzdGFydHMgaGVyZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgUEVSRk9STUFOQ0VfUkVTQ0FMRSgpOnN0cmluZ3tcclxuICAgICAgICByZXR1cm4gXCJSRVNDQUxFXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFBFUkZPUk1BTkNFX1RFWFRfU1dJVENIKCk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBcIlRFWFRfU1dJVENIXCI7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIG5ldyBhZGRlZCBmb3IgcGVyZm9ybWFuY2UgZW5kcyBoZXJlXHJcbiAgICAgKi9cclxufSIsImltcG9ydCB7IFZlYzIsIERvZE1hdGggfSBmcm9tIFwiLi4vQ29tbW9uL0RvZE1hdGhcIjtcclxuaW1wb3J0IHsgQXJyYXlBbGdvIH0gZnJvbSBcIi4uL0NvbW1vbi9Eb2REYXRhU3RydWN0dXJlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRml4UmVjdCBleHRlbmRzIExheWEuUmVjdGFuZ2xle1xyXG4gICAgY29uc3RydWN0b3IoeD86bnVtYmVyLCB5PzpudW1iZXIsIHdpZHRoPzpudW1iZXIsIGhlaWdodD86bnVtYmVyKXtcclxuICAgICAgICBzdXBlcih4LHksd2lkdGgsaGVpZ2h0KTtcclxuICAgIH1cclxufVxyXG5cclxuIiwiZXhwb3J0IGludGVyZmFjZSBTeW1ib2xpemVke1xyXG4gICAgc3ltYm9sOk15U3ltYm9sO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTXlTeW1ib2x7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBjb3VudDpudW1iZXIgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgX2RhdGE6bnVtYmVyO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgZGF0YSgpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSBNeVN5bWJvbC5jb3VudDtcclxuICAgICAgICBNeVN5bWJvbC5jb3VudCArPSAxO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRml4VGltZSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGZyYW1lUmF0ZTogbnVtYmVyID0gNjA7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGRlbHRhVGltZTogbnVtYmVyID0gMSAvIEZpeFRpbWUuZnJhbWVSYXRlO1xyXG4gICAgcHVibGljIHN0YXRpYyBmcmFtZUNvdW50OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgc3RhdGljIGVsYXBzZWRUaW1lOiBudW1iZXI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBpbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZnJhbWVDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5lbGFwc2VkVGltZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5mcmFtZUNvdW50Kys7XHJcbiAgICAgICAgdGhpcy5lbGFwc2VkVGltZSArPSB0aGlzLmRlbHRhVGltZTtcclxuICAgIH1cclxufSIsIi8qKlRoaXMgY2xhc3MgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgTGF5YUFpcklERSwgcGxlYXNlIGRvIG5vdCBtYWtlIGFueSBtb2RpZmljYXRpb25zLiAqL1xyXG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9TY2VuZVNjcmlwdC9HYW1lXCJcbmltcG9ydCBMb2FkaW5nIGZyb20gXCIuL1NjZW5lU2NyaXB0L0xvYWRpbmdcIlxyXG4vKlxyXG4qIOa4uOaIj+WIneWni+WMlumFjee9rjtcclxuKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUNvbmZpZ3tcclxuICAgIHN0YXRpYyB3aWR0aDpudW1iZXI9MTgwMDtcclxuICAgIHN0YXRpYyBoZWlnaHQ6bnVtYmVyPTkwMDtcclxuICAgIHN0YXRpYyBzY2FsZU1vZGU6c3RyaW5nPVwibm9zY2FsZVwiO1xyXG4gICAgc3RhdGljIHNjcmVlbk1vZGU6c3RyaW5nPVwibm9uZVwiO1xyXG4gICAgc3RhdGljIGFsaWduVjpzdHJpbmc9XCJ0b3BcIjtcclxuICAgIHN0YXRpYyBhbGlnbkg6c3RyaW5nPVwibGVmdFwiO1xyXG4gICAgc3RhdGljIHN0YXJ0U2NlbmU6YW55PVwiTG9hZGluZ1NjZW5lLnNjZW5lXCI7XHJcbiAgICBzdGF0aWMgc2NlbmVSb290OnN0cmluZz1cIlwiO1xyXG4gICAgc3RhdGljIGRlYnVnOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgc3RhdDpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIHBoeXNpY3NEZWJ1Zzpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIGV4cG9ydFNjZW5lVG9Kc29uOmJvb2xlYW49dHJ1ZTtcclxuICAgIGNvbnN0cnVjdG9yKCl7fVxyXG4gICAgc3RhdGljIGluaXQoKXtcclxuICAgICAgICB2YXIgcmVnOiBGdW5jdGlvbiA9IExheWEuQ2xhc3NVdGlscy5yZWdDbGFzcztcclxuICAgICAgICByZWcoXCJTY2VuZVNjcmlwdC9HYW1lLnRzXCIsR2FtZSk7XG4gICAgICAgIHJlZyhcIlNjZW5lU2NyaXB0L0xvYWRpbmcudHNcIixMb2FkaW5nKTtcclxuICAgIH1cclxufVxyXG5HYW1lQ29uZmlnLmluaXQoKTsiLCJpbXBvcnQgeyBDb2xpRW1pdCB9IGZyb20gXCIuL0FjdG9yTW9kdWxlcy9Db2xpTWVzc2FnZVwiO1xyXG5pbXBvcnQgeyBQcm9maWxlIH0gZnJvbSBcIi4vQWN0b3JNb2R1bGVzL1Byb2ZpbGVcIjtcclxuaW1wb3J0IHsgU3ltYm9saXplZCwgTXlTeW1ib2wgfSBmcm9tIFwiLi4vLi4vRml4L0ZpeFN5bWJvbFwiO1xyXG5pbXBvcnQgeyBCdWZmIH0gZnJvbSBcIi4vQWN0b3JNb2R1bGVzL0J1ZmZcIjtcclxuaW1wb3J0IHsgQXRrU3RhdGVNYWNoaW5lIH0gZnJvbSBcIi4vQXR0YWNrL0F0a0Fic3RcIjtcclxuaW1wb3J0IHsgRGFtYWdlIH0gZnJvbSBcIi4vQWN0b3JNb2R1bGVzL0RhbWFnZVwiO1xyXG5pbXBvcnQgeyBBY3RvclR5cGUgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL0RvZEtleVwiO1xyXG5pbXBvcnQgQWN0b3JTdGF0ZU1nciwgeyBBY3RvclN0YXRlSUQgfSBmcm9tIFwiLi9TdGF0ZS9BY3RvclN0YXRlRnNtXCI7XHJcbmltcG9ydCB7IEFjdG9yQnVmZk1nciB9IGZyb20gXCIuL0FjdG9yTW9kdWxlcy9BY3RvckJ1ZmZNZ3JcIjtcclxuaW1wb3J0IHsgVHJhbnNmb3JtIH0gZnJvbSBcIi4vQWN0b3JNb2R1bGVzL1RyYW5zZm9ybVwiO1xyXG5pbXBvcnQgeyBVbml0UmVuZGVyIH0gZnJvbSBcIi4vQWN0b3JNb2R1bGVzL1VuaXRSZW5kZXJcIjtcclxuaW1wb3J0IHsgQW5pbWF0aW9uIH0gZnJvbSBcIi4vQWN0b3JNb2R1bGVzL0FuaW1hdGlvblwiO1xyXG5pbXBvcnQgUm91dGUgZnJvbSBcIi4vQWN0b3JSb3V0ZVwiO1xyXG5pbXBvcnQgeyBBY3RvclNraWxsIH0gZnJvbSBcIi4vQWN0b3JNb2R1bGVzL0FjdG9yU2tpbGxcIjtcclxuaW1wb3J0IHsgQWN0b3JDb3N0IH0gZnJvbSBcIi4vQWN0b3JNb2R1bGVzL0FjdG9yQ29zdFwiO1xyXG5pbXBvcnQgeyBCbG9ja2VyIH0gZnJvbSBcIi4vQXR0YWNrL0Jsb2NrZXJcIjtcclxuaW1wb3J0IHsgVmVjMiB9IGZyb20gXCIuLi8uLi9Db21tb24vRG9kTWF0aFwiO1xyXG5pbXBvcnQgR2FtZUJhdHRsZSBmcm9tIFwiLi4vR2FtZUJhdHRsZVwiO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbi8v5Z+65pys5Y6f5YiZ77ya5bCR55So57un5om/77yM5aSa55So57uE5ZCIXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjdG9yIGltcGxlbWVudHMgU3ltYm9saXplZHtcclxuICAgIHB1YmxpYyBzeW1ib2w6IE15U3ltYm9sOyAvL+WFqOWxgOWUr+S4gOeahOagh+ivhuaVsOWtl1xyXG4gICAgcHVibGljIHR5cGU6IEFjdG9yVHlwZSA9IEFjdG9yVHlwZS5Ob25lOyAvL+m7mOiupOi6q+S7veS4ukFjdG9yXHJcblxyXG4gICAgcHVibGljIHN0YXRlOiBBY3RvclN0YXRlTWdyOyAvL+eKtuaAgeacuiDnu5/nrbnnirbmgIHmm7TmlrBcclxuXHJcbiAgICBwdWJsaWMgcHJvZmlsZTpQcm9maWxlOy8v5Z+65pys5bGe5oCn5LiO6K6/6Zeu5pa55rOV5ZCI6ZuGXHJcblxyXG4gICAgcHVibGljIGF0azogQXRrU3RhdGVNYWNoaW5lOy8v5pS75Ye754q25oCB5py6XHJcbiAgICBwdWJsaWMgY29saUVtaXQ6Q29saUVtaXQgPSBuZXcgQ29saUVtaXQoMCwwLENvbGlFbWl0LkdMT0JBTF9VTklUX1NVQldJRFRILENvbGlFbWl0LkdMT0JBTF9VTklUX1NVQkhFSUdIVCk7Ly/norDmkp7kuovku7blj5HluIPogIVcclxuICAgIHB1YmxpYyBibG9ja2VyOkJsb2NrZXI7Ly/pmLvmjKHmqKHlnZdcclxuICAgIHB1YmxpYyBidWZmTWdyOkFjdG9yQnVmZk1ncjtcclxuICAgIHB1YmxpYyB0cmFuc2Zvcm06VHJhbnNmb3JtO1xyXG4gICAgcHVibGljIHJlbmRlcjpVbml0UmVuZGVyO1xyXG4gICAgcHVibGljIGFuaW1hdGlvbjpBbmltYXRpb247XHJcbiAgICBwdWJsaWMgcm91dGU6Um91dGU7Ly/ot6/lvoTlr7nosaFcclxuICAgIHB1YmxpYyBza2lsbDpBY3RvclNraWxsO1xyXG4gICAgcHVibGljIGNvc3Q6QWN0b3JDb3N0O1xyXG5cclxuICAgIC8vVE9ET++8muWOu+WMheS4gOS4que7hOS7tlxyXG4gICAgLy8gLyoqXHJcbiAgICAvLyAgKiDnm67moIfpgInmi6nlmahcclxuICAgIC8vICAqL1xyXG4gICAgLy8gcHVibGljIHNlZWtlcjogU2Vla2VyO1xyXG5cclxuICAgIC8vIC8qXHJcbiAgICAvLyAqIOW9k+WJjemUgeWumuebruagh1xyXG4gICAgLy8gKiAqL1xyXG4gICAgLy8gcHVibGljIGZvY3VzOiBBY3RvcjtcclxuXHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHR5cGU6IEFjdG9yVHlwZSwgcmVzOiBhbnkpIHtcclxuICAgICAgICByZXNbJ3h4eCddID0gMTE0NTE0MTkxOTgxMDtcclxuXHJcbiAgICAgICAgdGhpcy5zeW1ib2wgPSBuZXcgTXlTeW1ib2woKTtcclxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBuZXcgQWN0b3JTdGF0ZU1ncih0aGlzKTtcclxuICAgICAgICAvLyBhY2NvcmRpbmcgdG8gZGlmZmVyZW50IHR5cGUsIGFkZCBkaWZmZXJlbnQgY29tcG9uZW50cyB0byB0aGlzIGFjdG9yLiBcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybSA9IG5ldyBUcmFuc2Zvcm0odGhpcyk7XHJcbiAgICAgICAgdGhpcy5wcm9maWxlID0gbmV3IFByb2ZpbGUodGhpcywgcmVzWyd4eHgnXSk7IFxyXG4gICAgICAgIHRoaXMuYXRrID0gbmV3IEF0a1N0YXRlTWFjaGluZSh0aGlzLCByZXNbJ3h4eCddKTtcclxuICAgICAgICB0aGlzLmJsb2NrZXIgPSBuZXcgQmxvY2tlcih0aGlzLCByZXNbJ3h4eCddKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmJ1ZmZNZ3IgPSBuZXcgQWN0b3JCdWZmTWdyKHRoaXMsIHJlc1sneHh4J10pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucmVuZGVyID0gbmV3IFVuaXRSZW5kZXIodGhpcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSBuZXcgQW5pbWF0aW9uKHRoaXMsIHJlc1sneHh4J10pO1xyXG4gXHJcbiAgICAgICAgaWYgKEFjdG9yVHlwZS5Nb25zdGVyID09IHRoaXMudHlwZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlID0gbmV3IFJvdXRlKHRoaXMsIHJlc1sneHh4J10pO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKEFjdG9yVHlwZS5PcGVyYXRvciA9PSB0aGlzLnR5cGUpIHtcclxuICAgICAgICAgICAgdGhpcy5za2lsbCA9IG5ldyBBY3RvclNraWxsKHRoaXMsIHJlc1sneHh4J10pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5jb3N0ID0gbmV3IEFjdG9yQ29zdCh0aGlzKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhd2FrZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXRlLnJ1blN0YXRlKEFjdG9yU3RhdGVJRC5QcmVwYXJlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXRlLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICAvLyByZXNldCBjbGVhciByZXNvdXJjZSByZWxhdGVkIG1vZHVsZVxyXG4gICAgICAgIC8vIHRoaXMucmVuZGVyLnJlc2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldE9uTWFwKCk6IHZvaWQge1xyXG4gICAgICAgIC8vVE9ET1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRQb3NpdGlvbigpOiB2b2lkIHtcclxuICAgICAgICAvL1RPRE9cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaUu+WHu+S4gOS4quaIluWkmuS4qkFjdG9y55uu5qCHXHJcbiAgICAgKiAyMDIwLzMvNSDmlLvlh7vpgLvovpHlt7Lku47kuovku7bop6blj5HmlLnkuLrnm7TmjqXosIPnlKhcclxuICAgICAqIOWPkei1t+WSjOaOpeaUtuaUu+WHu+eahOmAu+i+keWdh+WwgeijheWcqEFjdG9y57G75LitXHJcbiAgICAgKiBAcGFyYW0gdmljdGltIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXR0YWNrKC4uLnZpY3RpbTpBY3RvcltdKTp2b2lke1xyXG4gICAgICAgIGxldCBkbWc6RGFtYWdlID0gdGhpcy5wcm9maWxlLmdlbmVyYXRlRGFtYWdlKHRoaXMpO1xyXG5cclxuICAgICAgICB2aWN0aW0uZm9yRWFjaChlbGU9PntcclxuICAgICAgICAgICAgdGhpcy5iZUF0dGFja2VkKGRtZy5jb3B5KCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOiiq+aUu+WHu1xyXG4gICAgICogQHBhcmFtIGRhbWFnZSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGJlQXR0YWNrZWQoZGFtYWdlOkRhbWFnZSk6dm9pZHtcclxuICAgICAgICAvL0B0b2RvXHJcbiAgICAgICAgLy/lh4/lsJHnlJ/lkb3lgLxcclxuICAgICAgICAvL+WPkeWHuuaUu+WHu+S6i+S7tlxyXG4gICAgICAgIC8v77yI5Y+v6IO977yJ5Y+R5Ye65q275Lqh5LqL5Lu2XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbn1cclxuXHJcblxyXG4iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4vQWN0b3JcIjtcclxuaW1wb3J0IHsgQWN0b3JUeXBlIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9Eb2RLZXlcIjtcclxuaW1wb3J0IHsgQWN0b3JTdGF0ZUlEIH0gZnJvbSBcIi4vU3RhdGUvQWN0b3JTdGF0ZUZzbVwiO1xyXG5pbXBvcnQgeyBDb2xpUmVjZWl2ZXIgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvQ29saU1lc3NhZ2VcIjtcclxuaW1wb3J0IFJob2Rlc0dhbWUgZnJvbSBcIi4uL1Job2Rlc0dhbWVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjdG9yTWdyIHtcclxuICAgIHB1YmxpYyBhY3RvcnM6IEFjdG9yW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5hY3RvcnMgPSBbXTtcclxuXHJcbiAgICAgICAgLy90ZXN0XHJcbiAgICAgICAgbGV0IGNyZWF0RW5lbXk6RnVuY3Rpb24gPSAodGltZTpudW1iZXJbXSk9PntcclxuICAgICAgICAgICAgdGltZS5mb3JFYWNoKGVsZT0+e1xyXG4gICAgICAgICAgICAgICAgTGF5YS50aW1lci5vbmNlKGVsZSwgdGhpcywgKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmFjdG9ycy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3RvcihBY3RvclR5cGUuTW9uc3Rlciwge30pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0b3JzW2luZGV4XS5zdGF0ZS5ydW5TdGF0ZShBY3RvclN0YXRlSUQuV2Fsayk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNyZWF0ZUFjdG9yKEFjdG9yVHlwZS5Nb25zdGVyLCB7fSk7XHJcbiAgICAgICAgdGhpcy5hY3RvcnNbMF0uc3RhdGUucnVuU3RhdGUoQWN0b3JTdGF0ZUlELldhbGspO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlQWN0b3IoQWN0b3JUeXBlLk9wZXJhdG9yLCB7fSk7XHJcbiAgICAgICAgdGhpcy5hY3RvcnNbMV0uc3RhdGUucnVuU3RhdGUoQWN0b3JTdGF0ZUlELkZpZ2h0KTtcclxuICAgICAgICBjcmVhdEVuZW15KFszMDAsNjAwLDkwMF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0KHJlczogYW55KSB7XHJcbiAgICAgICAgdGhpcy5faW5pdEVuZW15KHJlcyk7XHJcbiAgICAgICAgdGhpcy5faW5pdE9wcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXdha2UoKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYWN0b3IgPSB0aGlzLmFjdG9yc1tpXTtcclxuICAgICAgICAgICAgYWN0b3IuYXdha2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYWN0b3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhY3RvciA9IHRoaXMuYWN0b3JzW2ldO1xyXG4gICAgICAgICAgICBhY3Rvci51cGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgUmhvZGVzR2FtZS5JbnN0YW5jZS5iYXR0bGUubWFwTm9kZUNQVS5yZW5kZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYWN0b3IgPSB0aGlzLmFjdG9yc1tpXTtcclxuICAgICAgICAgICAgYWN0b3IucmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNyZWF0ZUFjdG9yKHR5cGU6IEFjdG9yVHlwZSwgcmVzOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBsZXQgYWN0b3IgPSBuZXcgQWN0b3IodHlwZSwgcmVzKTtcclxuICAgICAgICB0aGlzLmFjdG9ycy5wdXNoKGFjdG9yKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QWN0b3JCeUlEKElEOiBudW1iZXIpOiBBY3RvciB8IG51bGwge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hY3RvcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGFjdG9yID0gdGhpcy5hY3RvcnNbaV07XHJcbiAgICAgICAgICAgIGlmIChJRCA9PSBhY3Rvci5zeW1ib2wuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjdG9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2luaXRFbmVteShyZXM6IGFueSkge1xyXG4gICAgICAgIC8vVE9ETyB1c2UgbGV2ZWwgcmVzIGRhdGEgaW5pdCBlbmVteSBhY3RvcnNcclxuICAgICAgICAvL2VnLlxyXG4gICAgICAgIC8vbGV0IGVuZW15UmVzID0gcmVzWyd4eHh4eCddO1xyXG4gICAgICAgIC8vYWN0b3IgPSB0aGlzLmNyZWF0ZUFjdG9yKEFjdG9yVHlwZS5FbmVteSAsZW5lbXlSZXMpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIF9pbml0T3BydCgpIHtcclxuICAgICAgICAvL1RPRE8gdXNlIHByZSBjaG9vc2Ugb3BydCBsaXN0IHRvIGluaXQgc2VsZiBhY3RvcnNcclxuICAgICAgICAvL2xldCBhcnJheSA9IFJob2Rlc0dhbWVzLkluc3RhbmNlLmdhbWVkYXRhLmN1cnJlbnRGb3JtYXRpb247XHJcbiAgICAgICAgLy9mb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgLy8gICBsZXQgaWQgPSBhcnJheVtpXTtcclxuICAgICAgICAvLyAgIGxldCByZXMgPSBEb2RSZXNvdXJjZU1nci5JbnN0YW5jZS5nZXRDdXJyZW50T3BlcmFyb3JEYXRhQnlJRChpZCk7XHJcbiAgICAgICAgLy8gICBsZXQgYWN0b3IgPSB0aGlzLmNyZWF0ZUFjdG9yKEFjdG9yVHlwZS5PcGVyYXRvciwgcmVzKVxyXG4gICAgICAgIC8vfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBY3RvckJ1ZmZNZ3J7XHJcbiAgICBjb25zdHJ1Y3RvcihrZWVwZXI6QWN0b3IsIHJlczphbnkpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9BY3RvclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFjdG9yQ29zdHtcclxuICAgIGNvbnN0cnVjdG9yKGtlZXBlcjpBY3Rvcil7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQWN0b3JTa2lsbHtcclxuICAgIGNvbnN0cnVjdG9yKGtlZXBlcjpBY3RvciwgcmVzOmFueSl7XHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9BY3RvclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFuaW1hdGlvbntcclxuICAgIGNvbnN0cnVjdG9yKGtlZXBlcjpBY3RvciwgcmVzOmFueSl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBWZWMyLCBEb2RNYXRoIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Eb2RNYXRoXCI7XHJcbmltcG9ydCB7IEZpeFJlY3QgfSBmcm9tIFwiLi4vLi4vLi4vRml4L0ZpeFJlY3RcIjtcclxuaW1wb3J0IHsgQXJyYXlBbGdvIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Eb2REYXRhU3RydWN0dXJlXCI7XHJcbmltcG9ydCB7IEV2ZW50Q2VudHJlIH0gZnJvbSBcIi4uLy4uLy4uL0V2ZW50L0V2ZW50Q2VudHJlXCI7XHJcbmltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuaW1wb3J0IHsgQWN0b3JUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Eb2RLZXlcIjtcclxuXHJcbi8qKlxyXG4gKiDnorDmkp7mtojmga/lj5HluIPogIVcclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb2xpRW1pdHtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgR0xPQkFMX1VOSVRfV0lEVEg6bnVtYmVyID0gMTAwOy8v5YWo5bGA5Y2V5L2N5a69XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEdMT0JBTF9VTklUX0hFSUdIVDpudW1iZXIgPSAxMDA7Ly/lhajlsYDljZXkvY3pq5hcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgR0xPQkFMX1VOSVRfU1VCV0lEVEg6bnVtYmVyID0gOTA7Ly/lhajlsYDlhoXpg6jljZXkvY3lrr1cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgR0xPQkFMX1VOSVRfU1VCSEVJR0hUOm51bWJlciA9IDkwOy8v5YWo5bGA5YaF6YOo5Y2V5L2N6auYXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEdMT0JBTF9VTklUX1JTSElGVDpudW1iZXIgPSA1Oy8v5YWo5bGA5Y2V5L2N5ZCR5Y+z5YGP56e7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEdMT0JBTF9VTklUX0JTSElGVDpudW1iZXIgPSA1Oy8v5YWo5bGA5Y2V5L2N5ZCR5LiL5YGP56e7XHJcblxyXG4gICAgcHJpdmF0ZSBfcmVjOkZpeFJlY3Q7XHJcbiAgICBcclxuICAgIHByaXZhdGUgX3Bhc3RTZXQ6VmVjMltdID0gW107Ly/mraTmlrnlnZfkuIrkuIDmrKHlrZjlnKjkuo7lk6rkuIDngrlcclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuaJgOacieebruWJjeiHqui6q+aJgOWkhOeahOaWueagvFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGZpbmRJbnRlcnNlY3QoKTpWZWMyW117XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgW1xyXG4gICAgICAgICAgICBsZWZ0LFxyXG4gICAgICAgICAgICB0b3AsXHJcbiAgICAgICAgICAgIHJpZ2h0LFxyXG4gICAgICAgICAgICBib3R0b21cclxuICAgICAgICBdID0gW1xyXG4gICAgICAgICAgICBEb2RNYXRoLmludERpdmlzaW9uKHRoaXMuX3JlYy54LENvbGlFbWl0LkdMT0JBTF9VTklUX1dJRFRIKSxcclxuICAgICAgICAgICAgRG9kTWF0aC5pbnREaXZpc2lvbih0aGlzLl9yZWMueSxDb2xpRW1pdC5HTE9CQUxfVU5JVF9IRUlHSFQpLFxyXG4gICAgICAgICAgICBEb2RNYXRoLmludERpdmlzaW9uKHRoaXMuX3JlYy5yaWdodCxDb2xpRW1pdC5HTE9CQUxfVU5JVF9XSURUSCksXHJcbiAgICAgICAgICAgIERvZE1hdGguaW50RGl2aXNpb24odGhpcy5fcmVjLmJvdHRvbSxDb2xpRW1pdC5HTE9CQUxfVU5JVF9IRUlHSFQpXHJcbiAgICAgICAgXVxyXG5cclxuICAgICAgICBsZXQgcmVzdWx0OlZlYzJbXSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBob3JpOm51bWJlciA9IGxlZnQ7IGhvcmkgPD0gcmlnaHQ7IGhvcmkgKz0gMSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCB2ZXJ0aTpudW1iZXIgPSB0b3A7IHZlcnRpIDw9IGJvdHRvbTsgdmVydGkgKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobmV3IFZlYzIoaG9yaSwgdmVydGkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwb3MoeDpudW1iZXIsIHk6bnVtYmVyKTpDb2xpRW1pdHtcclxuICAgICAgICB0aGlzLl9yZWMueCA9IHg7XHJcbiAgICAgICAgdGhpcy5fcmVjLnkgPSB5O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwb3NCeVZlYyh2ZWM6VmVjMik6Q29saUVtaXR7XHJcbiAgICAgICAgdGhpcy5fcmVjLnggPSB2ZWMueDtcclxuICAgICAgICB0aGlzLl9yZWMueSA9IHZlYy55O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaXplKHdpZHRoOm51bWJlciwgaGVpZ2h0Om51bWJlcik6Q29saUVtaXR7XHJcbiAgICAgICAgdGhpcy5fcmVjLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5fcmVjLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXZlbnQocHVibGlzaGVyPzphbnksIGlkZW50aXR5OkFjdG9yVHlwZSA9IEFjdG9yVHlwZS5Ob25lKTp2b2lke1xyXG4gICAgICAgIGxldCBjdXJyZW50OlZlYzJbXSA9IHRoaXMuZmluZEludGVyc2VjdCgpOy8v5b2T5YmN56Kw5pKe6ZuG5ZCIXHJcbiAgICAgICAgLy90aGlzLl9wYXN0U2V0Ly/ljoblj7LnorDmkp7pm4blkIhcclxuICAgICAgICAvL+emu+W8gO+8muWkhOS6juWOhuWPsueisOaSnumbhuWQiO+8jOS9huS4jeWkhOS6juW9k+WJjeeisOaSnumbhuWQiOeahOWFg+e0oFxyXG4gICAgICAgIGxldCBsZWF2ZTpWZWMyW10gPSBBcnJheUFsZ28uZmluZENvbXBsZW1lbnRTZXQodGhpcy5fcGFzdFNldCwgY3VycmVudCkgYXMgVmVjMltdO1xyXG4gICAgICAgIC8v6L+b5YWl77ya5aSE5LqO5b2T5YmN56Kw5pKe6ZuG5ZCI77yM5L2G5LiN5aSE5LqO5Y6G5Y+y56Kw5pKe6ZuG5ZCI55qE5YWD57SgXHJcbiAgICAgICAgbGV0IGVudHJlOlZlYzJbXSA9IEFycmF5QWxnby5maW5kQ29tcGxlbWVudFNldChjdXJyZW50LCB0aGlzLl9wYXN0U2V0KSBhcyBWZWMyW107XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/lj5HluIPkuovku7ZcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuemu+W8gFwiKTtcclxuICAgICAgICBsZWF2ZS5mb3JFYWNoKGVsZT0+e1xyXG4gICAgICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5ldmVudChFdmVudENlbnRyZS5FVHlwZS5MRUFWRShlbGUsIGAke2lkZW50aXR5fWApLCBwdWJsaXNoZXIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIui/m+WFpVwiKTtcclxuICAgICAgICBlbnRyZS5mb3JFYWNoKGVsZT0+e1xyXG4gICAgICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5ldmVudChFdmVudENlbnRyZS5FVHlwZS5FTlRSRShlbGUsIGAke2lkZW50aXR5fWApLCBwdWJsaXNoZXIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLl9wYXN0U2V0ID0gY3VycmVudDsvL+abtOaWsOWOhuWPsueisOaSnumbhuWQiOS4uuW9k+WJjeeisOaSnumbhuWQiFxyXG4gICAgfTtcclxuXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog5Y+R5biD56a75byA5b2T5YmN5a2Y5Zyo55qE5omA5pyJ5Z2Q5qCH55qE5LqL5Lu2XHJcbiAgICAgKiBAcGFyYW0gcHVibGlzaGVyIFxyXG4gICAgICogQHBhcmFtIGlkZW50aXR5IFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZXZlbnRMZWF2ZUFsbChwdWJsaXNoZXI/OmFueSwgaWRlbnRpdHk6QWN0b3JUeXBlID0gQWN0b3JUeXBlLk5vbmUpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fcGFzdFNldC5mb3JFYWNoKHZlYz0+e1xyXG4gICAgICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5ldmVudChFdmVudENlbnRyZS5FVHlwZS5MRUFWRSh2ZWMsIGAke2lkZW50aXR5fWApLCBwdWJsaXNoZXIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHg6bnVtYmVyLHk6bnVtYmVyLHdpZHRoOm51bWJlciA9IENvbGlFbWl0LkdMT0JBTF9VTklUX1NVQldJRFRILCBoZWlnaHQ6bnVtYmVyID0gQ29saUVtaXQuR0xPQkFMX1VOSVRfU1VCSEVJR0hUKXtcclxuICAgICAgICB0aGlzLl9yZWMgPSBuZXcgRml4UmVjdCh4LHksd2lkdGgsaGVpZ2h0KTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIOeisOaSnua2iOaBr+aOpeaUtuiAhVxyXG4gKiDlj6/ku6XpgJrov4dzZXREZXRlY3Rpb27nm5HmjqfmjIflrprngrnvvIzmjIflrppJZGVudGl0eeeahOi/m+WFpeWSjOemu+W8gOS6i+S7tlxyXG4gKiDlj6/ku6XpgJrov4dvZmZEZXRlY3Rpb27mkqTplIDmjIflrprngrnnmoTnm5HmjqdcclxuICog6L+Z5Liq5LiN6IO955u05o6l55So77yM6KaB57un5om/5LiA5bGC5oqKb25MZWF2ZeWSjG9uRW50cmXlh73mlbDph43lhpnkuYvlkI7miY3og73nlKhcclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDb2xpUmVjZWl2ZXJ7XHJcbiAgICAvKlxyXG4gICAg6L+Z6YeM55qE5Lu75L2V55+p6Zi16YO95Y+v5Lul55So6ZSu5YC85a+55pu/5Luj44CCeOS4jnnkuKTkuKrlj4LmlbDlj6/ku6XnlJ/miJDmsLjkuI3ph43lpI3nmoTplK5cclxuXHJcbiAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZGV0ZWN0aW9uTWF0cml4OmJvb2xlYW5bXVtdID0gW107Ly/orrDlvZXlk6rkuKrlnZDmoIflt7Looqvnm5HmjqdcclxuICAgIHByaXZhdGUgZGV0ZWN0aW9uRXhpc3QocG9zaXRpb246VmVjMik6Ym9vbGVhbnsvL+afpeeci+afkOS4quWdkOagh+aYr+WQpuW3suiiq+ebkeaOp1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kZXRlY3Rpb25NYXRyaXhbcG9zaXRpb24ueF1bcG9zaXRpb24ueV07XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIF9jYW5jZWxsYXRpb25NYXRyaXg6RnVuY3Rpb25bXVtdW10gPSBbXTsvL+WtmOaUvueUqOS6juWPlua2iOebkeWQrOeahOWHveaVsFxyXG4gICAgcHJpdmF0ZSBfd2lkdGg6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfaGVpZ2h0Om51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih3aWR0aDpudW1iZXIsIGhlaWdodDpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuX3dpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgICAgICBmb3IgKGxldCB3ID0gMDsgdyA8IHdpZHRoOyB3ICs9IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGV0ZWN0aW9uTWF0cml4W3ddID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuX2NhbmNlbGxhdGlvbk1hdHJpeFt3XSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBoID0gMDsgaCA8IGhlaWdodDsgaCArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kZXRlY3Rpb25NYXRyaXhbd11baF0gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NhbmNlbGxhdGlvbk1hdHJpeFt3XVtoXSA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5q2k5pa55rOV5o+Q5L6b57uZ5q2k57G755qE5a2Q57G76YeN5YaZXHJcbiAgICAgKiDmr4/lvZPmraTlrp7kvovnm5HmjqfnmoTov5vlhaXnorDmkp7kuovku7blnKjlt7LlkK/nlKjnm5HlkKznmoTlnZDmoIflj5HnlJ/ml7bvvIzmraTlh73mlbDlsIbooqvosIPnlKhcclxuICAgICAqIEBwYXJhbSBhY3RvciBcclxuICAgICAqIEBwYXJhbSBwb3NpdGlvblxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3Qgb25FbnRyZShhY3RvcjpBY3RvciwgcG9zaXRpb246VmVjMik6dm9pZFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5q2k5pa55rOV5o+Q5L6b57uZ5q2k57G755qE5a2Q57G76YeN5YaZXHJcbiAgICAgKiDmr4/lvZPmraTlrp7kvovnm5HmjqfnmoTov5vlhaXnorDmkp7kuovku7blnKjlt7LlkK/nlKjnm5HlkKznmoTlnZDmoIflj5HnlJ/ml7bvvIzmraTlh73mlbDlsIbooqvosIPnlKhcclxuICAgICAqIEBwYXJhbSBhY3RvciBcclxuICAgICAqIEBwYXJhbSBwb3NpdGlvblxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3Qgb25MZWF2ZShhY3RvcjpBY3RvciwgcG9zaXRpb246VmVjMik6dm9pZFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Zyo5oyH5a6a5Z2Q5qCH5LiK6K6+572u55uR5ZCs56Kw5pKe5LqL5Lu2XHJcbiAgICAgKiBpZGVudGl0eeWPr+S7peWcqEFjdG9yLklkZW50aXR56YeM6YCJ5oupXHJcbiAgICAgKiDpgqPmiJHkuLrku4DkuYjkuI3lhpllbnVt5ZGi4oCm4oCmXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXREZXRlY3Rpb24ocG9zaXRpb246VmVjMiwgaWRlbnRpdHk6c3RyaW5nKTp2b2lke1xyXG4gICAgICAgIGlmICh0aGlzLmRldGVjdGlvbkV4aXN0KHBvc2l0aW9uKSkgey8v5aaC5p6c5Zyo5q2k5aSE5bey5a2Y5Zyo55uR5o6n77yM5YiZ5Y+W5raI55uR5o6nXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2V0RGV0ZWN0aW9u5Ye95pWw5LiN6IO95Zyo5ZCM5LiA5Liq5Z2Q5qCH5aSa5qyh55uR5o6n77yM6K+35p+l55yLQ29saVJlY2lldmVy57G7XCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwb3NpdGlvbi54ID49IHRoaXMuX3dpZHRoIHx8IHBvc2l0aW9uLnggPCAwIHx8XHJcbiAgICAgICAgICAgIHBvc2l0aW9uLnkgPiB0aGlzLl9oZWlnaHQgfHwgcG9zaXRpb24ueSA8IDApIHsvL+WmguaenOebkeaOp+S9jee9rui2heWHuui+ueeVjO+8jOWImeWPlua2iOebkeaOp1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcG9zaXRpb24gPSBwb3NpdGlvbi5jbG9uZSgpOy8v5aSN5Yi25L2N572u5a+56LGh5Lul6Ziy5q2i5Lyg5Z2A6Zeu6aKYXHJcbiAgICAgICAgbGV0IGRldGVjdG9yOkZ1bmN0aW9uW10gPSBbXTsvL+i/meaYr+ebkeWQrOWHveaVsO+8jOWtmOi1t+adpeWHhuWkh+aSpOmZpOebkeWQrOaXtueUqFxyXG4gICAgICAgIC8v6K6+572u55uR5ZCs5LqL5Lu2XHJcbiAgICAgICAgICAgIGRldGVjdG9yWzBdID0gKGFjdG9yOkFjdG9yKT0+ey8v6L+b5YWl5LqL5Lu25Ye95pWwXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uRW50cmUoYWN0b3IsIHBvc2l0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZXRlY3RvclsxXSA9IChhY3RvcjpBY3Rvcik9PnsvL+emu+W8gOS6i+S7tuWHveaVsFxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkxlYXZlKGFjdG9yLCBwb3NpdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLm9uKEV2ZW50Q2VudHJlLkVUeXBlLkVOVFJFKHBvc2l0aW9uLCBpZGVudGl0eSksIHRoaXMsIGRldGVjdG9yWzBdKTtcclxuICAgICAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2Uub24oRXZlbnRDZW50cmUuRVR5cGUuTEVBVkUocG9zaXRpb24sIGlkZW50aXR5KSwgdGhpcywgZGV0ZWN0b3JbMV0pO1xyXG4gICAgICAgIC8v6K6+572u55uR5ZCs5LqL5Lu2XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fY2FuY2VsbGF0aW9uTWF0cml4W3Bvc2l0aW9uLnhdW3Bvc2l0aW9uLnldLnB1c2goKCk9PnsvL+WwhuebkeWQrOenu+mZpOWHveaVsOWtmOWFpeWHveaVsOefqemYtVxyXG4gICAgICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5vZmYoRXZlbnRDZW50cmUuRVR5cGUuRU5UUkUocG9zaXRpb24sIGlkZW50aXR5KSwgdGhpcywgZGV0ZWN0b3JbMF0pO1xyXG4gICAgICAgIH0sICgpPT57XHJcbiAgICAgICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLm9mZihFdmVudENlbnRyZS5FVHlwZS5MRUFWRShwb3NpdGlvbiwgaWRlbnRpdHkpLCB0aGlzLCBkZXRlY3RvclsxXSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2RldGVjdGlvbk1hdHJpeFtwb3NpdGlvbi54XVtwb3NpdGlvbi55XSA9IHRydWU7Ly/lsIbmraTlnZDmoIfnmoTnirbmgIHorr7kuLrigJzlt7Looqvnm5HlkKzigJ1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOenu+mZpOaMh+WumuWdkOagh+eahOeisOaSnuS6i+S7tuebkeWQrFxyXG4gICAgICogQHBhcmFtIHBvc2l0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvZmZEZXRlY3Rpb24ocG9zaXRpb246VmVjMik6dm9pZHtcclxuICAgICAgICB0aGlzLl9jYW5jZWxsYXRpb25NYXRyaXhbcG9zaXRpb24ueF1bcG9zaXRpb24ueV0uZm9yRWFjaCgoZWxlKT0+ey8v5omn6KGM5q+P5LiA5Liq6aKE5a2Y55qE5Ye95pWwXHJcbiAgICAgICAgICAgIGVsZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2NhbmNlbGxhdGlvbk1hdHJpeFtwb3NpdGlvbi54XVtwb3NpdGlvbi55XSA9IFtdOy8v5Yig6Zmk5q2k5aSE55qE6aKE5a2Y5Ye95pWwXHJcbiAgICAgICAgdGhpcy5fZGV0ZWN0aW9uTWF0cml4W3Bvc2l0aW9uLnhdW3Bvc2l0aW9uLnldID0gZmFsc2U7Ly/lsIbmraTlnZDmoIforr7kuLrmnKrnm5HlkKxcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcblxyXG5leHBvcnQgZW51bSBEYW1hZ2VUeXBle1xyXG4gICAgUFlTSUNBTCxcclxuICAgIE1BR0lDQUwsXHJcbiAgICBUUlVFLFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRGFtYWdle1xyXG5cclxuICAgIHB1YmxpYyBzb3VyY2U6QWN0b3IgPSBudWxsOy8v5Lyk5a6z5p2l5rqQXHJcbiAgICBwdWJsaWMgdmFsdWU6bnVtYmVyID0gMDsvL+aUu+WHu+WKm1xyXG4gICAgcHVibGljIHR5cGU6RGFtYWdlVHlwZS8v5Lyk5a6z57G75Z6LXHJcbiAgICBwdWJsaWMgcHJpbWFyeTpib29sZWFuID0gdHJ1ZTsvL+aYr+WQpuS4uumdnumXtOaOpeS8pOWus++8iOmXtOaOpeS8pOWus+S4jeS8muinpuWPkeaYn+eGiuOAgeW5tOeahOWPjeeUsuS5i+exu+eahOaViOaenO+8iVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNvdXJjZTpBY3RvciwgdmFsdWU6bnVtYmVyLCB0eXBlOkRhbWFnZVR5cGUpe1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29weSgpOkRhbWFnZXtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IERhbWFnZSh0aGlzLnNvdXJjZSwgdGhpcy52YWx1ZSwgdGhpcy50eXBlKTtcclxuICAgICAgICByZXN1bHQudHlwZSA9IHRoaXMudHlwZTtcclxuICAgICAgICByZXN1bHQucHJpbWFyeSA9IHRoaXMucHJpbWFyeTtcclxuICAgICAgICByZXN1bHQuc291cmNlID0gdGhpcy5zb3VyY2U7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IERhbWFnZSwgRGFtYWdlVHlwZSB9IGZyb20gXCIuL0RhbWFnZVwiO1xyXG5pbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcbmltcG9ydCB7IEFjdG9yVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vRG9kS2V5XCI7XHJcbmltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0RvZE1hdGhcIjtcclxuXHJcblxyXG4vKipcclxuICogUHJvZmlsZeexu+aYr+WCqOWtmOWNleS9jeWfuuacrOaVsOaNru+8iOWmguaUu+WHu+WKm+OAgemYsuW+oeWKm+etie+8ieeahOexu1xyXG4gKiDlroPov5jmj5DkvpvkuIDliIfnlKjkuo7ojrflj5ZBY3RvcuS/oeaBr+eahOaOpeWPo++8iOWmguaYr+WQpuiDveWkn+ihjOWKqOOAgeaYr+WQpuiDveWkn+mYu+aMoe+8iVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFByb2ZpbGUge1xyXG4gICAgcHVibGljIG5hbWU6IFN0cmluZyA9IFwiQ2hhbmRsZXIgQmluZ1wiO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGtlZXBlcjpBY3RvcjtcclxuXHJcbiAgICBwcml2YXRlIF9wcmVwVGltZTogbnVtYmVyID0gMTAwOy8v5YmN5pGH5pe26Ze0XHJcbiAgICBwcml2YXRlIF9hZnRlclRpbWU6IG51bWJlciA9IDEwMDsvL+WQjuaRh+aXtumXtFxyXG4gICAgcHVibGljIGludmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlOy8v5piv5ZCm6ZqQ5b2iXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkvKTlrrPorqHnrpfnm7jlhbPnmoTkv67mlLnlkozorr/pl67mjqXlj6NcclxuICAgICAqIOS9nOiAhe+8muiRsVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXR0YWNrUG93ZXI6IG51bWJlciA9IDEwMDsvL+aUu+WHu+WKm1xyXG4gICAgcHVibGljIGF0a1NjYWxlOm51bWJlciA9IDE7Ly/mlLvlh7vlgI3njodcclxuICAgIHB1YmxpYyBhdGtCdWZmOm51bWJlciA9IDE7Ly/mlLvlh7vnmb7liIbmr5Tmj5DljYdcclxuICAgIHB1YmxpYyBhcm1vdXI6bnVtYmVyID0gNTA7Ly/niannkIbpmLLlvqFcclxuICAgIHB1YmxpYyBtYWdpY0FybW91cjpudW1iZXIgPSAwOy8v5rOV5pyv5oqX5oCnXHJcbiAgICBwdWJsaWMgZG1nVHlwZTpEYW1hZ2VUeXBlID0gRGFtYWdlVHlwZS5QWVNJQ0FMOy8v5Lyk5a6z57G75Z6LXHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGtlZXBlcjpBY3RvciwgcmVzOmFueSl7XHJcbiAgICAgICAgdGhpcy5rZWVwZXIgPSBrZWVwZXI7XHJcbiAgICAgICAgLy90b2RvOiBhYm91dCByZXNcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Tm9kZVBvcygpOlZlYzJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMua2VlcGVyLnRyYW5zZm9ybS5wb3MuZ2V0Tm9kZVBvcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Lyg5YWl5LiA5LiqQWN0b3LvvIzov5Tlm57kvKTlrrPlr7nosaFcclxuICAgICAqIOato+WcqOiAg+iZkeW6n+W8g+atpOmhuVxyXG4gICAgICogQHBhcmFtIHNvdXJjZSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdlbmVyYXRlRGFtYWdlKHNvdXJjZTpBY3Rvcik6RGFtYWdle1xyXG4gICAgICAgIHJldHVybiBuZXcgRGFtYWdlKHNvdXJjZSwgdGhpcy5hdHRhY2tQb3dlcip0aGlzLmF0a1NjYWxlKnRoaXMuYXRrQnVmZiwgdGhpcy5kbWdUeXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGl0UG9pbnQ6IG51bWJlciA9IDEwOy8v55Sf5ZG95YC8XHJcbiAgICBwdWJsaWMgbWF4SGl0UG9pbnQ6IG51bWJlciA9IDEwOy8v5pyA6auY55Sf5ZG95YC8XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBieSBYV1ZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGhhdGVMZXZlbDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBhdHRhY2tSYW5nZVJhZGl1czogbnVtYmVyO1xyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHByZXBUaW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ByZXBUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgYWZ0ZXJUaW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FmdGVyVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGJsb2NrYWJsZSgpOiBib29sZWFue1xyXG4gICAgICAgIC8vdG9kbzog5Yik5pat5piv5ZCm5Y+v5Lul6KKr6Zi75oyhXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICBcclxufVxyXG5cclxuLyoqXHJcbiAqIOaYr+WQpumcgOimgeWcqHByb2ZpbGXkuK3lsIbkuI3lkIznmoTmlbDlgLzliIbnsbvvvJ9cclxuICpcclxuICovIiwiaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9BY3RvclwiO1xyXG5pbXBvcnQgeyBEb2RNYXRoLCBWZWMyIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Eb2RNYXRoXCI7XHJcbmltcG9ydCB7IENvbGlFbWl0IH0gZnJvbSBcIi4vQ29saU1lc3NhZ2VcIjtcclxuXHJcbi8qKlxyXG4gKiDlr7nkuIDkuKrljZXkvY3nmoTlh6DkvZXnirbmgIHnmoTmj4/ov7BcclxuICovXHJcbmV4cG9ydCBjbGFzcyBUcmFuc2Zvcm17XHJcbiAgICBwdWJsaWMgcG9zOlBvcyA9IG5ldyBQb3MoKTtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3Ioa2VlcGVyOkFjdG9yKXtcclxuICAgICAgICBcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgUG9ze1xyXG4gICAgLy8gcHVibGljIGF1dG9Td2l0Y2hUYXJnZXQ6Ym9vbGVhbiA9IHRydWU7XHJcbiAgICBwdWJsaWMgZGF0YTpWZWMyID0gbmV3IFZlYzIoMCwwKTsvL+S9jee9rlxyXG5cclxuXHJcbiAgICBcclxuICAgIHB1YmxpYyB0YXJnZXQ6VmVjMiA9IG5ldyBWZWMyKDAsMCk7Ly/nm67moIdcclxuICAgIHB1YmxpYyBzcGVlZDpudW1iZXIgPSA1Oy8v6YCf5bqmXHJcbiAgICBwdWJsaWMgYXBwcm9hY2g6bnVtYmVyID0gMDsvL+mAvOi/keasoeaVsFxyXG4gICAgcHVibGljIHZlY1NwZWVkOlZlYzIgPSBuZXcgVmVjMigwLDApOy8v5YiG6YeP6YCf5bqmXHJcbiAgICBwcml2YXRlIF9hcnJpdmVkOmJvb2xlYW4gPSB0cnVlOy8v5bey5Yiw6L6+55uu55qE5ZywKOavj+asoeiuvue9ruaWsOebrueahOWcsOaXtuiuvuS4umZhbHNlKVxyXG4gICAgcHVibGljIGdldCBhcnJpdmVkKCk6Ym9vbGVhbntyZXR1cm4gdGhpcy5fYXJyaXZlZDt9Ly/ojrflj5bmmK/lkKblt7LliLDovr7nmoTkv6Hmga9cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruebrueahOWcsOW5tumHjeiuvuWIhumHj+mAn+W6plxyXG4gICAgICogQHBhcmFtIHRhcmdldCBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFRhcmdldCh0YXJnZXQ6VmVjMik6dm9pZHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICB0aGlzLmFpbSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u55u057q/6YCf5bqm5bm26YeN6K6+5YiG6YeP6YCf5bqmXHJcbiAgICAgKiBAcGFyYW0gc3BlZWQgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRTcGVlZChzcGVlZDpudW1iZXIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xyXG4gICAgICAgIHRoaXMuYWltKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorqHnrpfnp7vliqjlj4LmlbAs5bm25bCGX2Fycml2ZWTorr7kuLpmYWxzZVxyXG4gICAgICog5bCG5Lya6YeN6K6+5YiG6YeP6YCf5bqm5ZKM6YC86L+R5qyh5pWwXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWltKCk6dm9pZHtcclxuICAgICAgICB0aGlzLnZlY1NwZWVkID0gRG9kTWF0aC5tb3ZlVG9Db21wb25lbnQodGhpcy5kYXRhLHRoaXMudGFyZ2V0LHRoaXMuc3BlZWQpO1xyXG4gICAgICAgIHRoaXMuYXBwcm9hY2ggPSB0aGlzLmRhdGEuZGlzdGFuY2VUbyh0aGlzLnRhcmdldCkgLyB0aGlzLnNwZWVkO1xyXG4gICAgICAgIHRoaXMuX2Fycml2ZWQgPSBmYWxzZTtcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWQkeebruagh+eCueenu+WKqOS4gOasoVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbW92ZSgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5hcHByb2FjaCAtPSAxO1xyXG4gICAgICAgIGlmICh0aGlzLmFwcHJvYWNoIDw9IDApIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLnggPSB0aGlzLnRhcmdldC54O1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEueSA9IHRoaXMudGFyZ2V0Lnk7XHJcbiAgICAgICAgICAgIHRoaXMuX2Fycml2ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGF0YS54ID0gdGhpcy5kYXRhLnggKyB0aGlzLnZlY1NwZWVkLng7XHJcbiAgICAgICAgdGhpcy5kYXRhLnkgPSB0aGlzLmRhdGEueSArIHRoaXMudmVjU3BlZWQueTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldE5vZGVQb3MoKTpWZWMye1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjMihNYXRoLmZsb29yKHRoaXMuZGF0YS54IC8gQ29saUVtaXQuR0xPQkFMX1VOSVRfV0lEVEgpLCBNYXRoLmZsb29yKHRoaXMuZGF0YS55IC8gQ29saUVtaXQuR0xPQkFMX1VOSVRfSEVJR0hUKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcbmltcG9ydCBQZXJmb3JtYW5jZUNlbnRyZSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0dyYXBoaWNzL1BlcmZvcm1hbmNlX01vZHVsZS9QZXJmb3JtYW5jZUNlbnRyZVwiO1xyXG5pbXBvcnQgeyBWZWMyIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Eb2RNYXRoXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVW5pdFJlbmRlcntcclxuXHJcbiAgICBwcml2YXRlIF9rZWVwZXI6QWN0b3I7XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGtlZXBlcjpBY3Rvcil7XHJcbiAgICAgICAgdGhpcy5fa2VlcGVyID0ga2VlcGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZXBsb3koKTp2b2lke1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRGVwbG95XCIpO1xyXG4gICAgICAgIFBlcmZvcm1hbmNlQ2VudHJlLmluc3RhbmNlLmRpc3BsYXlBY3Rvcih0aGlzLl9rZWVwZXIsIHRoaXMuX2tlZXBlci50cmFuc2Zvcm0ucG9zLmRhdGEsIG5ldyBWZWMyKDUwLDUwKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1vdmUodmVjOlZlYzIpOnZvaWR7XHJcbiAgICAgICAgUGVyZm9ybWFuY2VDZW50cmUuaW5zdGFuY2UubW92ZSh0aGlzLl9rZWVwZXIsIHZlYyk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4vQWN0b3JcIjtcclxuaW1wb3J0IHsgVmVjMiB9IGZyb20gXCIuLi8uLi9Db21tb24vRG9kTWF0aFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm91dGUge1xyXG5cclxuICAgIHByaXZhdGUgX3BhdGg6VmVjMltdID0gVmVjMi5saXN0RnJvbUxpc3QoW1xyXG4gICAgICAgIFs1MDAsNTAwXSxcclxuICAgICAgICBbMCwwXSxcclxuICAgICAgICBbNTAwLDBdLFxyXG4gICAgICAgIFswLDUwMF1cclxuICAgIF0pO1xyXG4gICAgcHJpdmF0ZSBfdGFyQ291bnQ6bnVtYmVyID0gLTE7Ly/nm67liY3mjIflkJHnmoTnm67moIdcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihrZWVwZXI6QWN0b3IsIHJlczphbnkpe1xyXG4gICAgICAgIC8vdG9kbzog5qC55o2ucmVz6I635Y+W5bqU6LWw55qE6Lev57q/XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGN1cnJlbnRUYXJnZXQoKTpWZWMye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXRoW3RoaXMuX3RhckNvdW50XTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmV4dCgpOmJvb2xlYW57XHJcbiAgICAgICAgaWYgKHRoaXMuX3RhckNvdW50IDwgdGhpcy5fcGF0aC5sZW5ndGggLSAxKSB7Ly/ov5jmnInkuIvkuIDpoblcclxuICAgICAgICAgICAgdGhpcy5fdGFyQ291bnQgKz0gMTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHsvL+ayoeacieS4i+S4gOmhuVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtLVlBhaXJ9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vRG9kRGF0YVN0cnVjdHVyZVwiO1xyXG5pbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcbmltcG9ydCB7RXZlbnRDZW50cmV9IGZyb20gXCIuLi8uLi8uLi9FdmVudC9FdmVudENlbnRyZVwiO1xyXG5pbXBvcnQgeyBTZWVrZXIgfSBmcm9tIFwiLi9BY3RvclNlZWtlclwiO1xyXG5pbXBvcnQgRml4VGltZSBmcm9tIFwiLi4vLi4vLi4vRml4L0ZpeFRpbWVcIjtcclxuaW1wb3J0IHsgTWFwTm9kZVNlZWtlciB9IGZyb20gXCIuL01hcE5vZGVTZWVrZXJcIjtcclxuaW1wb3J0IHsgVmVjMiB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vRG9kTWF0aFwiO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBieSBYV1ZcclxuICogXHJcbiAqIOiRsSDkv67mlLnkuo4gMy8xOFxyXG4gKiAgICAgIOWwhlNlZWtlcuaMquWFpeaUu+WHu+eKtuaAgeacuuWGhe+8jOS4jeeUsUFjdG9y5oyB5pyJXHJcbiAqICAgICAg5LiN5ZCM55qE5pS75Ye76IyD5Zu055SxU2Vla2Vy5pu/5o2i5p2l5a6e546wXHJcbiAqICAgICAg5LiN5ZCM55qE5pS75Ye76YC76L6R77yI6IyD5Zu0L+WNleS9k++8ieeUseS/ruaUuXByb2ZpbGXkuK3nmoTlj4LmlbDlrp7njrBcclxuICogICAgICBBdGtTdGF0ZU1hY2hpbmXotJ/otKPlr7nlpJbmj5DkvpvmiYDmnInkv67mlLkv6K6/6Zeu5o6l5Y+jXHJcbiAqICAgICAg5LuN6ZyA5a+55q2k6L+b6KGM6L+b5LiA5q2l6KeE5YiS77yI5Y2V5L2TL+WkmuS9ky/nvqTkvZPmlLvlh7vpgLvovpHmmK/ku4XnlLHkuIDkuKrlj4LmlbDlrp7njrDvvIzov5jmmK/nlLHlpJrmgIHlrp7njrDvvIlcclxuICogICAgICAvL3RvZG865pe26Ze057Sv5Yqg6YC76L6R5pS55Y+YXHJcbiAqIFxyXG4gKi9cclxuXHJcbmVudW0gU3RhdGVUeXBlIHtcclxuICAgIFdBSVQgPSBcIldBSVRcIixcclxuICAgIFBSRVBBUkUgPSBcIlBSRVBBUkVcIixcclxuICAgIEFGVEVSX0FUSyA9IFwiQUZURVJfQVRLXCJcclxufVxyXG5cclxuaW50ZXJmYWNlIFN0YXRlIHtcclxuICAgIG5hbWUoKTpzdHJpbmdcclxuXHJcbiAgICBleGVjdXRlKG1hY2hpbmU6IEF0a1N0YXRlTWFjaGluZSk6IHZvaWRcclxuXHJcbiAgICByZXNldCgpOiB2b2lkXHJcbn1cclxuXHJcbmFic3RyYWN0IGNsYXNzIEJhc2VTdGF0ZSBpbXBsZW1lbnRzIFN0YXRlIHtcclxuICAgIHB1YmxpYyBuYW1lKCk6c3RyaW5ne3JldHVybiBcIkJhc2VTdGF0ZVwiO31cclxuXHJcbiAgICBwcm90ZWN0ZWQgdGltZTogbnVtYmVyID0gMDsvL+aXtumXtOe0r+WKoOmAu+i+keaUueWPmFxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpIHtcclxuICAgICAgICB0aGlzLnRpbWUgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGFic3RyYWN0IGV4ZWN1dGUobWFjaGluZTogQXRrU3RhdGVNYWNoaW5lKTogdm9pZDtcclxuXHJcbn1cclxuXHJcbmNsYXNzIFdhaXQgZXh0ZW5kcyBCYXNlU3RhdGUge1xyXG4gICAgcHVibGljIG5hbWUoKTpzdHJpbmd7cmV0dXJuIFwiV2FpdFN0YXRlXCI7fVxyXG5cclxuICAgIHB1YmxpYyBleGVjdXRlKG1hY2hpbmU6IEF0a1N0YXRlTWFjaGluZSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGZvY3VzID0gbWFjaGluZS5zZWVrZXIuZ2V0Rm9jdXMoKTtcclxuICAgICAgICBpZiAoZm9jdXMgIT0gbnVsbCAmJiBmb2N1cyAhPSB1bmRlZmluZWQpIHsvL+WmguaenOiDveWkn+aJvuWIsOaVjOS6ulxyXG4gICAgICAgICAgICBtYWNoaW5lLmNoYW5nZVN0YXRlKFN0YXRlVHlwZS5QUkVQQVJFKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJGb3VuZCBFbmVteVwiKTtcclxuICAgICAgICB9IGVsc2Ugey8v5aaC5p6c5om+5LiN5Yiw5pWM5Lq6XHJcbiAgICAgICAgICAgIC8vdG9kbzogbm9uZVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WmguaenHNlZWtlcuS4reWtmOWcqOaVjOS6uu+8jHJlc2V0IFByZXBhcmXlubbot7PovazliLBQcmVwYXJl6Zi25q61XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5jbGFzcyBQcmVwYXJlIGV4dGVuZHMgQmFzZVN0YXRlIHtcclxuICAgIHB1YmxpYyBuYW1lKCk6c3RyaW5ne3JldHVybiBcIlByZXBhcmVTdGF0ZVwiO31cclxuXHJcbiAgICBwdWJsaWMgZXhlY3V0ZShtYWNoaW5lOiBBdGtTdGF0ZU1hY2hpbmUpOiB2b2lkIHtcclxuICAgIFxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICAvL+WIpOaWreaYr+WQpumcgOimgemHjeaWsOmAieaLqeebruagh+W5tumHjee9ruWJjeaRh1xyXG4gICAgICAgIGxldCBzZWVrZXIgPSBtYWNoaW5lLnNlZWtlcjtcclxuICAgICAgICBsZXQgYWN0b3IgPSBtYWNoaW5lLmtlZXBlcjtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhzZWVrZXIuZm9jdXNDaGFuZ2VkKTtcclxuICAgICAgICBpZiAoc2Vla2VyLmZvY3VzQ2hhbmdlZCgpKSB7Ly/lvZPliY3nm67moIflt7Lkv67mlLlcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJwcmVwYXJlOkZvY3VzY2hhbmdlZFwiKTtcclxuICAgICAgICAgICAgbWFjaGluZS5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIGlmIChzZWVrZXIuZ2V0Rm9jdXMoKSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBtYWNoaW5lLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1hY2hpbmUuY2hhbmdlU3RhdGUoU3RhdGVUeXBlLldBSVQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/lvZPliY3nm67moIfmnKrkv67mlLlcclxuICAgICAgICBtYWNoaW5lLnRpYygpO1xyXG4gICAgICAgIGlmIChtYWNoaW5lLnJlYWR5KSB7XHJcbiAgICAgICAgICAgIC8vdG9kbzog6L+b6KGM5pS75Ye7KOi/m+ihjHByb2ZpbGXlj4LmlbDliKTmlq0pXHJcbiAgICAgICAgICAgIG1hY2hpbmUua2VlcGVyLmF0dGFjayhzZWVrZXIuZ2V0Rm9jdXMoKSk7XHJcbiAgICAgICAgICAgIG1hY2hpbmUuY2hhbmdlU3RhdGUoU3RhdGVUeXBlLkFGVEVSX0FUSyk7Ly/ovazmjaLliLDlkI7mkYdcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBdHRhY2sgSGFwcGVuZWRcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQWZ0ZXJBdGsgZXh0ZW5kcyBCYXNlU3RhdGUge1xyXG4gICAgcHVibGljIG5hbWUoKTpzdHJpbmd7cmV0dXJuIFwiQWZ0ZXJTdGF0ZVwiO31cclxuICAgIHB1YmxpYyBleGVjdXRlKG1hY2hpbmU6IEF0a1N0YXRlTWFjaGluZSk6IHZvaWQge1xyXG4gICAgICAgIG1hY2hpbmUudGljKCk7XHJcbiAgICAgICAgaWYgKG1hY2hpbmUuY29vbENvbXBsZXRlKSB7XHJcbiAgICAgICAgICAgIG1hY2hpbmUucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICBpZiAobWFjaGluZS5zZWVrZXIuZ2V0Rm9jdXMoKSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBtYWNoaW5lLmNoYW5nZVN0YXRlKFN0YXRlVHlwZS5QUkVQQVJFKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1hY2hpbmUuY2hhbmdlU3RhdGUoU3RhdGVUeXBlLldBSVQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQXR0YWNrIHJlY292ZXJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICog54q25oCB5py657G7XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQXRrU3RhdGVNYWNoaW5lIHtcclxuICAgIC8qXHJcbiAgICAqIOaJgOWxnkFjdG9yXHJcbiAgICAqICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkga2VlcGVyOiBBY3RvcjtcclxuICAgIC8qKlxyXG4gICAgICog5b2T5YmN54q25oCBXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3VyU3RhdGU6IFN0YXRlO1xyXG4gICAgLyoqXHJcbiAgICAgKiDlj6/kvb/nlKjnmoTnirbmgIHliJfooahcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0ZUxpc3Q6IEtWUGFpcjxTdGF0ZT4gPSBuZXcgS1ZQYWlyPFN0YXRlPigpO1xyXG5cclxuICAgIHB1YmxpYyBzZWVrZXI6IFNlZWtlcjtcclxuXHJcbiAgICBwcml2YXRlIF9wcmVwVGltZTpudW1iZXI7Ly/liY3mkYfml7bpl7Qv5binXHJcbiAgICBwcml2YXRlIF9jb29sVGltZTpudW1iZXI7Ly/lkI7mkYfml7bpl7Qv5binXHJcbiAgICBwcml2YXRlIF9jdXJQb2ludDpudW1iZXIgPSAwOy8v5b2T5YmN5bey56ev6JOE55qE54K55pWwXHJcbiAgICBwcml2YXRlIF92ZWxvY2l0eTpudW1iZXIgPSAxOy8v5b2T5YmN57Sv5Yqg6YCf546HKOeCueaVsC/luKcpXHJcblxyXG4gICAgcHVibGljIGdldCByZWFkeSgpOmJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1clBvaW50ID49IHRoaXMuX3ByZXBUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0aWMoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX2N1clBvaW50ICs9IHRoaXMuX3ZlbG9jaXR5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29vbENvbXBsZXRlKCk6Ym9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5fY3VyUG9pbnQgPj0gdGhpcy5fcHJlcFRpbWUrdGhpcy5fY29vbFRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlZnJlc2goKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX2N1clBvaW50ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBrZWVwZXIg54q25oCB5py65omA5pyJ6ICFXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGtlZXBlcjogQWN0b3IsIHJlczphbnkpIHtcclxuICAgICAgICB0aGlzLmtlZXBlciA9IGtlZXBlcjtcclxuICAgICAgICB0aGlzLmN1clN0YXRlID0gbmV3IFdhaXQoKTtcclxuICAgICAgICB0aGlzLnN0YXRlTGlzdC5lZGl0KFN0YXRlVHlwZS5XQUlULCB0aGlzLmN1clN0YXRlKTtcclxuICAgICAgICB0aGlzLnN0YXRlTGlzdC5lZGl0KFN0YXRlVHlwZS5QUkVQQVJFLCBuZXcgUHJlcGFyZSgpKTtcclxuICAgICAgICB0aGlzLnN0YXRlTGlzdC5lZGl0KFN0YXRlVHlwZS5BRlRFUl9BVEssIG5ldyBBZnRlckF0aygpKTtcclxuICAgICAgICAvL3RvZG86IGFib3V0IHJlc1xyXG5cclxuICAgICAgICB0aGlzLl9wcmVwVGltZSA9IDMwMDtcclxuICAgICAgICB0aGlzLl9jb29sVGltZSA9IDMwMDtcclxuXHJcbiAgICAgICAgdGhpcy5zZWVrZXIgPSBuZXcgTWFwTm9kZVNlZWtlcih0aGlzLmtlZXBlci5wcm9maWxlLmdldE5vZGVQb3MoKS5wbHVzKG5ldyBWZWMyKDMsMykpLCByZXNbJ3h4eCddLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIt+aWsOW9k+WJjeeKtuaAge+8jOavj+W4p+iwg+eUqFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuY3VyU3RhdGUubmFtZSgpKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInB0OlwiICsgdGhpcy5fY3VyUG9pbnQpO1xyXG4gICAgICAgIHRoaXMuc2Vla2VyLnVwZGF0ZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLmtlZXBlcikge1xyXG4gICAgICAgICAgICB0aGlzLmN1clN0YXRlLmV4ZWN1dGUodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pS55Y+Y5b2T5YmN54q25oCB77yM5paw54q25oCB5Lya6YeN572u5Li65Yid5aeL5oCBXHJcbiAgICAgKiBAcGFyYW0gc3RhdGVUeXBlIOaWsOeahOeKtuaAgeexu+Wei1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2hhbmdlU3RhdGUoc3RhdGVUeXBlOiBTdGF0ZVR5cGUpIHtcclxuICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLnN0YXRlTGlzdC5yZWFkKHN0YXRlVHlwZSk7XHJcbiAgICAgICAgc3RhdGUucmVzZXQoKTtcclxuICAgICAgICB0aGlzLmN1clN0YXRlID0gc3RhdGU7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG4iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcbmltcG9ydCB7IFNlZWtlciB9IGZyb20gXCIuL0FjdG9yU2Vla2VyXCI7XHJcbmltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0RvZE1hdGhcIjtcclxuaW1wb3J0IHsgQWN0b3JUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Eb2RLZXlcIjtcclxuaW1wb3J0IFJob2Rlc0dhbWUgZnJvbSBcIi4uLy4uL1Job2Rlc0dhbWVcIjtcclxuaW1wb3J0IHsgQXJyYXlBbGdvIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Eb2REYXRhU3RydWN0dXJlXCI7XHJcblxyXG4vKipcclxuICog5L2c6ICF77ya6I2J55Sf6JGxXHJcbiAqIFxyXG4gKiBCbG9ja2Vy5piv6Zi75oyh5qih5Z2XXHJcbiAqIOWCqOWtmOmYu+aMoeebuOWFs+eahOS/oeaBr1xyXG4gKiDlroPotJ/otKPmr4/luKfmo4DmtYvlubLlkZjlj6/pmLvmjKHnmoTkvY3nva7mmK/lkKbmnInmlYzkurrov5vlhaXvvIzlubblhrPlrprmmK/lkKbpmLvmjKFcclxuICogXHJcbiAqIFxyXG4gKiAvL3RvZG86IOWmguaenOi/m+ihjOmYu+aMoeaIluino+mZpOmYu+aMoe+8jEJsb2NrZXLlsIbkvJrlj5HluIPkuovku7ZcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCbG9ja2Vye1xyXG5cclxuICAgIHByaXZhdGUgX2tlZXBlcjpBY3RvcjtcclxuICAgIHByaXZhdGUgX3BvczpWZWMyO1xyXG4gICAgcHJpdmF0ZSBfYmxvY2tMaXN0OkFjdG9yW10gPSBbXTsvL+W3sumYu+aMoeeahOWIl+ihqFxyXG4gICAgcHJpdmF0ZSBfYmxvY2tlZEJ5OkFjdG9yID0gbnVsbDsvL+iiq+iwgemYu+aMoVxyXG4gICAgcHJpdmF0ZSBfYmxvY2tBYmlsaXR5Om51bWJlciA9IDM7Ly/pmLvmjKHog73liptcclxuICAgIHByaXZhdGUgX2JyZWFrdGhyb3VnaDpudW1iZXIgPSAxOy8v5Y+N6Zi75oyh6IO95YqbXHJcblxyXG4gICAgcHVibGljIGdldCBpc0Jsb2NrZWQoKTpib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9ibG9ja2VkQnkgIT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihrZWVwZXI6QWN0b3IsIHJlczphbnkpe1xyXG4gICAgICAgIHRoaXMuX2tlZXBlciA9IGtlZXBlcjtcclxuICAgICAgICB0aGlzLl9wb3MgPSBrZWVwZXIucHJvZmlsZS5nZXROb2RlUG9zKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9rZWVwZXIudHlwZSAhPSBBY3RvclR5cGUuT3BlcmF0b3IpIHsvL+S4jeaYr+W5suWRmOexu+Wei+eahOivneWwsea4heepunVwZGF0ZeaWueazlVxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSA9ICgpPT57fTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy90b2RvOiDmoLnmja5yZXPorr7nva7pmLvmjKHog73lipvjgIHlj43pmLvmjKHog73liptcclxuXHJcbiAgICAgICAgLy90ZXN0XHJcbiAgICAgICAgdGhpcy5fcG9zID0gbmV3IFZlYzIoNCw0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmHjeiuvumYu+aMoeS9jee9rlxyXG4gICAgICogQHBhcmFtIHBvcyDlnLDlm77oioLngrnkvY3nva7vvIzmlbTmlbBWZWMyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZXBvc2l0aW9uKHBvczpWZWMyKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3BvcyA9IHBvcztcclxuICAgICAgICB0aGlzLl9ibG9ja0xpc3QuZm9yRWFjaChlbGU9PntcclxuICAgICAgICAgICAgdGhpcy5fYmxvY2tBYmlsaXR5ICs9IGVsZS5ibG9ja2VyLl9icmVha3Rocm91Z2g7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fYmxvY2tMaXN0ID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOnZvaWR7XHJcbiAgICAgICAgLyog55uu5YmN55qE566X5rOV5Lya5Lqn55Sf5LiA5Liq5Yik5a6a6Zeu6aKY77yaXHJcbiAgICAgICAgICog6K6+5pyJ55u46YK755qE5Lik5Liq5qC85a2QQeWSjELvvIxC5Zyo5Y+z6L6577yMQeS4iuermeedgOaOqOeOi++8iOacneWPs++8ie+8jELkuIrnq5nnnYDloZ7pm7flqIVcclxuICAgICAgICAgKiDmlYzkurrlnKjjgJDnp7vlhaXjgJFC5qC85pe25Lya6KKr5aGe6I6x5aiF6Zi75oyhXHJcbiAgICAgICAgICog5q2k5pe255Sx5LqO5o6o546L55qE5pS75Ye76IyD5Zu05piv5Lik5qC877yM5aW55Y+v5Lul5pS75Ye75Yiw5aGe6Zu35aiF6Zi75oyh55qE5pWM5Lq6XHJcbiAgICAgICAgICog6L+Z5LiO5ri45oiP6KGo546w55u45Yay56qB77ya5pS75Ye76IyD5Zu0MuagvOeahOi/keWNq+aYr+aXoOazlei3qOS4gOS4quS6uuaUu+WHu+aVjOS6uueahO+8jDPmoLzmiY3ooYzvvIjmiJHljbDosaHkuK3mmK/vvIlcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiDov5nkuKrpl67popjlnKjmraTniYjmnKzmmoLkuJTlv73nlaVcclxuICAgICAgICAqL1xyXG4gICAgICAgIGlmICh0aGlzLl9ibG9ja0FiaWxpdHkgPD0gMCkgey8v5rKh5pyJ6Zi75oyh6IO95Yqb5bCx5LiN6ICD6JmR5Ymp5LiL55qE5LqL5LqGXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxpc3Q6QWN0b3JbXSA9IFJob2Rlc0dhbWUuSW5zdGFuY2UuYmF0dGxlLm1hcE5vZGVDUFUubWF0cml4R2V0KHRoaXMuX3Bvcyk7Ly/ojrflj5bpmLvmjKHnm67moIdcclxuICAgICAgICBsZXQgbmV3Q2FwdHVyZTpBY3RvcltdID0gQXJyYXlBbGdvLmZpbmRDb21wU2V0KGxpc3QsIHRoaXMuX2Jsb2NrTGlzdCk7XHJcbiAgICAgICAgbmV3Q2FwdHVyZSA9IG5ld0NhcHR1cmUuZmlsdGVyKGVsZT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gZWxlLmJsb2NrZXIuX2Jsb2NrZWRCeSA9PSBudWxsICYmIGVsZS5wcm9maWxlLmJsb2NrYWJsZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL+WPqumAieWPluaXoOS6uumYu+aMoeS4lOWPr+iiq+mYu+aMoeeahOmDqOWIhlxyXG4gICAgICAgIGlmIChuZXdDYXB0dXJlLmxlbmd0aCA9PSAwKSB7Ly/msqHmnInlh7rnjrDmlrDnmoTpmLvmjKHnm67moIdcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBuZXdDYXB0dXJlLmZvckVhY2goZWxlPT57XHJcbiAgICAgICAgICAgIGlmIChlbGUuYmxvY2tlci5fYnJlYWt0aHJvdWdoIDw9IHRoaXMuX2Jsb2NrQWJpbGl0eSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmxvY2tMaXN0LnB1c2goZWxlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Jsb2NrQWJpbGl0eSAtPSBlbGUuYmxvY2tlci5fYnJlYWt0aHJvdWdoO1xyXG4gICAgICAgICAgICAgICAgZWxlLmJsb2NrZXIuX2Jsb2NrZWRCeSA9IHRoaXMuX2tlZXBlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IEFjdG9yVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vRG9kS2V5XCI7XHJcbmltcG9ydCB7IFNlZWtlciB9IGZyb20gXCIuL0FjdG9yU2Vla2VyXCI7XHJcbmltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0RvZE1hdGhcIjtcclxuaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9BY3RvclwiO1xyXG5pbXBvcnQgUmhvZGVzR2FtZSBmcm9tIFwiLi4vLi4vUmhvZGVzR2FtZVwiO1xyXG5pbXBvcnQgeyBBcnJheUFsZ28gfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0RvZERhdGFTdHJ1Y3R1cmVcIjtcclxuXHJcbi8qKlxyXG4gKiDmraTlr7nosaHmmK/kuIDnp43lj6/ku6XooqvmlLvlh7vnirbmgIHmnLrlupTnlKjnmoRBY3RvcuaQnOe0ouWZqFxyXG4gKiDkuJPpl6jnlKjmnaXlr7nlupTlnLDlm77oioLngrnmkJzntKLmlYzkurrvvIjogIzpnZ7lubLlkZjvvIlcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNYXBOb2RlU2Vla2VyIGltcGxlbWVudHMgU2Vla2VyIHtcclxuXHJcbiAgICBwcml2YXRlIF9vcmlnaW46VmVjMjsvL+S4reW/g+S9jee9rlxyXG4gICAgcHJpdmF0ZSBfcm90YXRlOm51bWJlciA9IDA7Ly/pobrml7bpkojml4vovaw5MOW6pueahOasoeaVsO+8jOm7mOiupOS4ujBcclxuICAgIHByaXZhdGUgX3JlbGF0aXZlTm9kZUxpc3Q6VmVjMltdID0gW107Ly/pnIDopoHnm5HmjqfnmoTlnLDlm77oioLngrnnmoTnm7jlr7nkvY3nva5cclxuICAgIHByaXZhdGUgX2Fic29sdXRlTm9kZUxpc3Q6VmVjMltdID0gW107Ly/pnIDopoHnm5HmjqfnmoTlnLDlm77oioLngrnnmoTnu53lr7nkvY3nva5cclxuXHJcbiAgICBwcml2YXRlIF9mb2N1czpBY3RvcjsvL+mUgeWumueahOaVjOS6ulxyXG4gICAgcHJpdmF0ZSBfZm9jdXNDaGFuZ2VkOmJvb2xlYW4gPSBmYWxzZTsvL+mUgeWumueahOaVjOS6uuW3suS/ruaUuVxyXG4gICAgcHJpdmF0ZSBfY2FwdHVyZUxpc3Q6QWN0b3JbXS8v5o2V5o2J5Yiw55qE5pWM5Lq6XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRBYnNvbHV0ZSgpOnZvaWR7Ly/ph43mlrDorqHnrpfmiYDmnInpnIDopoHnm5HmjqfnmoTlnLDlm77oioLngrnnmoTnu53lr7nkvY3nva5cclxuICAgICAgICB0aGlzLl9hYnNvbHV0ZU5vZGVMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5fcmVsYXRpdmVOb2RlTGlzdC5mb3JFYWNoKGVsZT0+e1xyXG4gICAgICAgICAgICB0aGlzLl9hYnNvbHV0ZU5vZGVMaXN0LnB1c2godGhpcy5fb3JpZ2luLnBsdXMoZWxlKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3Iob3JpZ2luOlZlYzIsIHJlczphbnksIHJvdGF0ZTpudW1iZXIgPSAwKXtcclxuICAgICAgICAvL+i/memHjOeahHJlc+aYr+S4gOenjeS7o+ihqOaUu+WHu+iMg+WbtOexu+Wei+eahOaVsOaNrlxyXG4gICAgICAgIHRoaXMuX29yaWdpbiA9IG9yaWdpbjtcclxuICAgICAgICB0aGlzLl9yb3RhdGUgPSByb3RhdGU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy90ZXN0XHJcbiAgICAgICAgdGhpcy5fcmVsYXRpdmVOb2RlTGlzdC5wdXNoKG5ldyBWZWMyKDAsMCksIG5ldyBWZWMyKDEsMCksIG5ldyBWZWMyKDIsMCkpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5zZXRBYnNvbHV0ZSgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0Rm9jdXMoKTogQWN0b3Ige1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9mb2N1cztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Rm9jdXNMaXN0KGNvdW50OiBudW1iZXIpOiBBY3RvcltdIHtcclxuICAgICAgICAvL3RvZG86IOiAg+iZkeWcqGludGVyZmFjZeS4reenu+mZpOatpOmhuVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDYXB0dXJlTGlzdCgpOiBBY3RvcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2FwdHVyZUxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGZvbGxvd0FjdG9yKCk6IEFjdG9yIHtcclxuICAgICAgICAvL3RvZG86IOiAg+iZkeWcqGludGVyZmFjZeS4reenu+mZpOatpOmhuVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmb2N1c0NoYW5nZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZvY3VzQ2hhbmdlZDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICAvL+WIt+aWsOaNleaNieWIl+ihqFxyXG4gICAgICAgIHRoaXMuX2NhcHR1cmVMaXN0ID0gW107XHJcblxyXG4gICAgICAgIHRoaXMuX2Fic29sdXRlTm9kZUxpc3QuZm9yRWFjaChlbGU9PntcclxuICAgICAgICAgICAgbGV0IGxpc3Q6QWN0b3JbXSA9IFJob2Rlc0dhbWUuSW5zdGFuY2UuYmF0dGxlLm1hcE5vZGVDUFUubWF0cml4R2V0KGVsZSk7XHJcbiAgICAgICAgICAgIGxpc3QuZm9yRWFjaChlbGU9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NhcHR1cmVMaXN0LnB1c2goZWxlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NhcHR1cmVMaXN0ID0gQXJyYXlBbGdvLnNocmluayh0aGlzLl9jYXB0dXJlTGlzdCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/lpITnkIZmb2N1c1xyXG4gICAgICAgIGlmICggKHRoaXMuX2ZvY3VzID09IG51bGwgfHwgdGhpcy5fZm9jdXMgPT0gdW5kZWZpbmVkKSAmJiB0aGlzLl9jYXB0dXJlTGlzdC5sZW5ndGggPiAwKSB7Ly/lvZPliY3ml6DmjZXmjYnnm67moIfvvIzkuJRjYXB0dXJlTGlzdOS4reacieebruagh1xyXG4gICAgICAgICAgICB0aGlzLl9mb2N1cyA9IHRoaXMuX2NhcHR1cmVMaXN0WzBdO1xyXG4gICAgICAgICAgICB0aGlzLl9mb2N1c0NoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fY2FwdHVyZUxpc3QuaW5kZXhPZih0aGlzLl9mb2N1cykgPT0gLTEpIHsvL+W9k+WJjeaNleaNieebruagh+S4jeWcqGNhcHR1cmVMaXN05LitXHJcbiAgICAgICAgICAgIHRoaXMuX2ZvY3VzID0gdGhpcy5fY2FwdHVyZUxpc3RbMF07XHJcbiAgICAgICAgICAgIHRoaXMuX2ZvY3VzQ2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHsvL+aNleaNieebruagh+acquaUueWPmFxyXG4gICAgICAgICAgICB0aGlzLl9mb2N1c0NoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3RvclN0YXRlQmFzZSB7XHJcbiAgICBwcm90ZWN0ZWQgX2FjdG9yOiBBY3RvcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhY3RvcjogQWN0b3IpIHtcclxuICAgICAgICB0aGlzLl9hY3RvciA9IGFjdG9yO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnRlcigpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxlYXZlKCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEFjdG9yU3RhdGVCYXNlIGZyb20gXCIuL0FjdG9yU3RhdGVCYXNlXCI7XHJcblxyXG4vKipcclxuICog5pWM5Lq655qE6KKr6Zi75oyh54q25oCB44CB5bmy5ZGY55qE5LiA6Iis54q25oCBXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQWN0b3JTdGF0ZUZpZ2h0IGV4dGVuZHMgQWN0b3JTdGF0ZUJhc2V7XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOnZvaWR7XHJcbiAgICAgICAgLy90b2RvOiDosIPnlKjmlLvlh7vnirbmgIHmnLrnmoTluKflvqrnjq9cclxuICAgICAgICAvKlxyXG5cclxuICAgICAgICAqL1xyXG4gICAgICAgdGhpcy5fYWN0b3IuYXRrLnVwZGF0ZSgpO1xyXG4gICAgICAgdGhpcy5fYWN0b3IuYmxvY2tlci51cGRhdGUoKTtcclxuICAgIH1cclxufSIsImltcG9ydCBBY3RvclN0YXRlQmFzZSBmcm9tIFwiLi9BY3RvclN0YXRlQmFzZVwiO1xyXG5pbXBvcnQgRG9kTG9nIGZyb20gXCIuLi8uLi8uLi9Db21tb24vRG9kTG9nXCI7XHJcbmltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuaW1wb3J0IHsgQWN0b3JTdGF0ZVdhbGsgfSBmcm9tIFwiLi9BY3RvclN0YXRlV2Fsa1wiO1xyXG5pbXBvcnQgeyBBY3RvclN0YXRlUHJlcGFyZWQgfSBmcm9tIFwiLi9BY3RvclN0YXRlUHJlcGFyZWRcIjtcclxuaW1wb3J0IHsgQWN0b3JTdGF0ZUZpZ2h0IH0gZnJvbSBcIi4vQWN0b3JTdGF0ZUZpZ2h0XCI7XHJcblxyXG5leHBvcnQgZW51bSBBY3RvclN0YXRlSUQge1xyXG4gICAgTm9uZSxcclxuICAgIFByZXBhcmVkLCAgICAgLy/lvoXmnLogKOacquWHuuWKqC/mnKrpg6jnvbIpICBcclxuICAgIEJvcm4sICAgLy/lh7rnlJ/liqjnlLsg5LiN5Y+v5pS75Ye7IOS4jeWPr+iiq+aUu+WHu1xyXG4gICAgV2FsaywgICAvL+enu+WKqCDmlYzkurrnlKhcclxuICAgIFN0dW5uZWQsICAgIC8v5pmV55ypIGV0YyDvvIjmiZPmlq3liqjkvZznmoTooqvmjqfliLbnirbmgIHvvIlcclxuICAgIEZyZWV6ZWQsICAgIC8v5Yaw5Ya7IO+8iOS4jeaJk+aWreWKqOS9nOeahOiiq+aOp+WItueKtuaAge+8iVxyXG4gICAgRmlnaHQsICAvL+aZruaUu+eKtuaAgSDlubLlkZjluLjmgIEg5pWM5Lq66KKr6Zi75oyh5ZCOXHJcbiAgICBEZWF0aCwgIC8v5q275Lqh5Yqo55S7IOS4jeWPr+aUu+WHuyDkuI3lj6/ooqvmlLvlh7tcclxuICAgIEVzY2FwZSwgLy/mlYzkurrpgIPohLFcclxuICAgIENvdW50XHJcbn1cclxuXHJcbi8qXHJcbiAqIOinkuiJsueKtuaAgeacuiDnrqHnkIbop5LoibLmiYDlpITpmLbmrrUg5qC55o2u5LiN5ZCM6Zi25q615Yaz5a6a5LiN5ZCM55qE57uE5Lu254q25oCBXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3RvclN0YXRlTWdyIHtcclxuICAgIHByaXZhdGUgX3N0YXRlczogQWN0b3JTdGF0ZUJhc2VbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfY3VycmVudFN0YXRlOiBBY3RvclN0YXRlQmFzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhY3RvcjogQWN0b3IpIHtcclxuICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX3N0YXRlc1tBY3RvclN0YXRlSUQuV2Fsa10gPSBuZXcgQWN0b3JTdGF0ZVdhbGsoYWN0b3IpO1xyXG4gICAgICAgIHRoaXMuX3N0YXRlc1tBY3RvclN0YXRlSUQuUHJlcGFyZWRdID0gbmV3IEFjdG9yU3RhdGVQcmVwYXJlZChhY3Rvcik7XHJcbiAgICAgICAgdGhpcy5fc3RhdGVzW0FjdG9yU3RhdGVJRC5GaWdodF0gPSBuZXcgQWN0b3JTdGF0ZUZpZ2h0KGFjdG9yKTtcclxuICAgICAgICAvL1RPRE9cclxuICAgICAgICAvL+WPgueFp+a4uOaIj+Wkp+eKtuaAgeaculxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgaW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJ1blN0YXRlKEFjdG9yU3RhdGVJRC5Ob25lKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcnVuU3RhdGUoc3RhdGVJRDogQWN0b3JTdGF0ZUlEKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKEFjdG9yU3RhdGVJRC5Db3VudCA8PSBzdGF0ZUlEIHx8IHN0YXRlSUQgPD0gQWN0b3JTdGF0ZUlELk5vbmUpIHtcclxuICAgICAgICAgICAgRG9kTG9nLmVycm9yKGBHYW1lU3RhdGVNZ3IucnVuU3RhdGU6IEludmFsaWQgc3RhdGVJRCBbJHtzdGF0ZUlEfV0uIGApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobnVsbCAhPSB0aGlzLl9jdXJyZW50U3RhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlLmxlYXZlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUgPSB0aGlzLl9zdGF0ZXNbc3RhdGVJRF07XHJcbiAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlLmVudGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAobnVsbCAhPSB0aGlzLl9jdXJyZW50U3RhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlLnVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKG51bGwgIT0gdGhpcy5fY3VycmVudFN0YXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZS5sZWF2ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9zdGF0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5fc3RhdGVzW2ldO1xyXG4gICAgICAgICAgICBzdGF0ZS5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBBY3RvclN0YXRlQmFzZSBmcm9tIFwiLi9BY3RvclN0YXRlQmFzZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFjdG9yU3RhdGVQcmVwYXJlZCBleHRlbmRzIEFjdG9yU3RhdGVCYXNle1xyXG4gICAgcHVibGljIHVwZGF0ZSgpOnZvaWR7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJQZXJwYXJlZCB1cGRhdGVcIilcclxuICAgIH1cclxufSIsImltcG9ydCBBY3RvclN0YXRlQmFzZSBmcm9tIFwiLi9BY3RvclN0YXRlQmFzZVwiO1xyXG5pbXBvcnQgeyBBY3RvclR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0RvZEtleVwiO1xyXG5pbXBvcnQgeyBWZWMyIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Eb2RNYXRoXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQWN0b3JTdGF0ZVdhbGsgZXh0ZW5kcyBBY3RvclN0YXRlQmFzZXtcclxuICAgIFxyXG4gICAgcHVibGljIGVudGVyKCk6dm9pZHtcclxuICAgICAgICAvL+S4jeW6lOivpeWcqOi/meS4queKtuaAgemHjO+8jOW6lOivpeWcqGJvcm7ph4zov5vooYxkZXBsb3lcclxuICAgICAgICB0aGlzLl9hY3Rvci5yZW5kZXIuZGVwbG95KCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyB1cGRhdGUoKTp2b2lke1xyXG5cclxuICAgICAgICBsZXQgYWN0b3IgPSB0aGlzLl9hY3RvcjtcclxuXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIGlmIChhY3Rvci5ibG9ja2VyLmlzQmxvY2tlZCkge1xyXG4gICAgICAgICAgICAvL3RvZG86IOi9rOaNouWIsGZpZ2h054q25oCBXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IOS9oOS4jeimgei/h+adpeWVijpib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2FjdG9yLnRyYW5zZm9ybS5wb3MuYXJyaXZlZCAmJiDkvaDkuI3opoHov4fmnaXllYopIHsvL+W3suWIsOi+vuebrueahOWcsFxyXG4gICAgICAgICAgICBpZiAoYWN0b3Iucm91dGUubmV4dCgpKSB7Ly/lrZjlnKjkuIvkuIDkuKrnm67moIfoioLngrlcclxuICAgICAgICAgICAgICAgIGFjdG9yLnRyYW5zZm9ybS5wb3Muc2V0VGFyZ2V0KGFjdG9yLnJvdXRlLmN1cnJlbnRUYXJnZXQoKSk7Ly/lsIbnm67moIfmm7/mjaLkuLrkuIvkuIDkuKrnm67moIfoioLngrlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vdG9kbzog5pWM5Lq65bey5Yiw6L6+57uI54K5XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG5cclxuICAgICAgICBpZiAoIeS9oOS4jeimgei/h+adpeWViikgey8v6Lef6byg5qCH55qE6YC76L6RXHJcbiAgICAgICAgICAgIGFjdG9yLnRyYW5zZm9ybS5wb3Muc2V0VGFyZ2V0KG5ldyBWZWMyKExheWEuc3RhZ2UubW91c2VYLTUwLCBMYXlhLnN0YWdlLm1vdXNlWS01MCkpO1xyXG4gICAgICAgICAgICBhY3Rvci50cmFuc2Zvcm0ucG9zLnNldFNwZWVkKDIwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFjdG9yLnRyYW5zZm9ybS5wb3MubW92ZSgpOy8v56e75YqoXHJcbiAgICAgICAgYWN0b3IuY29saUVtaXQucG9zQnlWZWMoYWN0b3IudHJhbnNmb3JtLnBvcy5kYXRhKTsvL+enu+WKqOeisOaSnueusVxyXG4gICAgICAgIGFjdG9yLmNvbGlFbWl0LmV2ZW50KGFjdG9yLCBhY3Rvci50eXBlKTsvL+WPkeW4g+eisOaSnuS6i+S7tlxyXG4gICAgICAgIGFjdG9yLnJlbmRlci5tb3ZlKGFjdG9yLnRyYW5zZm9ybS5wb3MuZGF0YSk7Ly/np7vliqjlj6/op4blr7nosaFcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yL0FjdG9yXCI7XHJcbmltcG9ydCB7TXlTeW1ib2x9IGZyb20gXCIuLi8uLi9GaXgvRml4U3ltYm9sXCI7XHJcbmltcG9ydCB7Q2lyY2xlQ29sbGlzaW9uUmFuZ2V9IGZyb20gXCIuL0NvbGxpc2lvblJhbmdlXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIOeisOaSnuWkhOeQhuWZqO+8jOivpeexu+e7tOaKpOS4gOS4qk1hcO+8jE1hcOiusOW9leaJgOaciemcgOimgei/m+ihjOeisOaSnuWkhOeQhueahOeisOaSnuWZqO+8jE1hcOeUqOeisOaSnuWZqOeahOWUr+S4gOagh+ivhuS9nOS4uumUruS7pemBv+WFjemHjeWkjeiusOW9leOAglxyXG4gKlxyXG4gKiDor6Xnsbvmj5DkvpvkuIDkuKpyZWNhbGN1bGF0ZeaWueazleeUqOS6jumHjeaWsOiuoeeul+eisOaSnuaDheWGte+8jOWvueS6jk1hcOS4reeahOavj+S4quWkhOeQhuWvueixoe+8jOivpeaWueazleiuoeeul+WFtuS4jk1hcOS4reeahOaJgOacieWFtuS7luWvueixoVxyXG4gKiDnmoTph43lj6Dmg4XlhrXvvIzlubblsIbov5nkupvph43lj6DnmoTlhbbku5blr7nosaHku6XliJfooajnmoTlvaLlvI/kvKDpgJLnu5nor6XlpITnkIblr7nosaHjgIJcclxuICpcclxuICogYnkgWFdWXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQWN0b3JDb2xsaXNpb25Qcm9jZXNzb3Ige1xyXG5cclxuICAgIHByaXZhdGUgY29sbGlkZXJNYXA6IHsgW2tleTogbnVtYmVyXTogQWN0b3JDb2xsaWRlciB9ID0ge307XHJcblxyXG4gICAgcHVibGljIHJlZ2lzdGVyQ29sbGlkZXIoY29sbGlkZXI6IEFjdG9yQ29sbGlkZXIpIHtcclxuICAgICAgICB0aGlzLmNvbGxpZGVyTWFwW2NvbGxpZGVyLnN5bWJvbC5kYXRhXSA9IGNvbGxpZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1bnJlZ2lzdGVyQ29sbGlkZXIoY29sbGlkZXI6IEFjdG9yQ29sbGlkZXIpIHtcclxuICAgICAgICBkZWxldGUgdGhpcy5jb2xsaWRlck1hcFtjb2xsaWRlci5zeW1ib2wuZGF0YV07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpIHtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMuY29sbGlkZXJNYXApIHtcclxuICAgICAgICAgICAgbGV0IHRhcmdldENvbGxpZGVyID0gdGhpcy5jb2xsaWRlck1hcFtpXTtcclxuICAgICAgICAgICAgbGV0IGNvbGxpZGluZ0xpc3QgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiBpbiB0aGlzLmNvbGxpZGVyTWFwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29sbGlkZXIgPSB0aGlzLmNvbGxpZGVyTWFwW2pdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbGxpZGVyID09IHRhcmdldENvbGxpZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0Q29sbGlkZXIuc2hvdWxkQ29sbGlkZVdpdGgoY29sbGlkZXIpICYmIHRhcmdldENvbGxpZGVyLmdldENvbGxpc2lvblJhbmdlKCkuaXNDb2luY2lkZVdpdGhSYW5nZShjb2xsaWRlci5nZXRDb2xsaXNpb25SYW5nZSgpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxpZGluZ0xpc3QucHVzaChjb2xsaWRlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGFyZ2V0Q29sbGlkZXIub25Db2xsaWRpbmdMaXN0UmVmcmVzaChjb2xsaWRpbmdMaXN0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFjdG9yQ29sbGlkZXIge1xyXG4gICAgLy/llK/kuIDmoIfor4ZcclxuICAgIHB1YmxpYyByZWFkb25seSBzeW1ib2w6IE15U3ltYm9sID0gbmV3IE15U3ltYm9sKCk7XHJcblxyXG4gICAgLy/ojrflj5bnorDmkp7ojIPlm7RcclxuICAgIGFic3RyYWN0IGdldENvbGxpc2lvblJhbmdlKCk6IENpcmNsZUNvbGxpc2lvblJhbmdlIDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmHjeiuvueisOaSnuiMg+WbtFxyXG4gICAgICogQHBhcmFtIHJhbmdlIOaWsOeahOeisOaSnuiMg+WbtFxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBzZXRDb2xsaXNpb25SYW5nZShyYW5nZTogQ2lyY2xlQ29sbGlzaW9uUmFuZ2UpO1xyXG5cclxuICAgIC8v6I635Y+W56Kw5pKe5Zmo55qE5omA5pyJ6ICFXHJcbiAgICBhYnN0cmFjdCBnZXRBY3RvcigpOiBBY3RvcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOeisOaSnuWIl+ihqOmcgOimgeWIt+aWsFxyXG4gICAgICogQHBhcmFtIGNvbGxpZGluZ0xpc3Qg5paw55qE56Kw5pKe5YiX6KGoXHJcbiAgICAgKiAqL1xyXG4gICAgYWJzdHJhY3Qgb25Db2xsaWRpbmdMaXN0UmVmcmVzaChjb2xsaWRpbmdMaXN0OiBBY3RvckNvbGxpZGVyW10pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm5bqU6K+l5LiO5oyH5a6a56Kw5pKe5Zmo5Y+R55Sf56Kw5pKeXHJcbiAgICAgKiBAcGFyYW0gY29sbGlkZXIg5Y+m5LiA5Liq56Kw5pKe5ZmoXHJcbiAgICAgKiAqL1xyXG4gICAgYWJzdHJhY3Qgc2hvdWxkQ29sbGlkZVdpdGgoY29sbGlkZXI6IEFjdG9yQ29sbGlkZXIpOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b2T5YmN56Kw5pKe5YiX6KGoXHJcbiAgICAgKiAqL1xyXG4gICAgYWJzdHJhY3QgZ2V0Q29sbGlkaW5nTGlzdCgpOiBBY3RvckNvbGxpZGVyW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliLfmlrDnorDmkp7ojIPlm7TvvIzkvb/lhbbot5/pmo/miYDmnInogIXnp7vliqhcclxuICAgICAqICovXHJcbiAgICBhYnN0cmFjdCByZWZyZXNoQ29sbGlzaW9uUmFuZ2VGb2xsb3dBY3RvcigpO1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNpbXBsZUFjdG9yQ29sbGlkZXIgZXh0ZW5kcyBBY3RvckNvbGxpZGVyIHtcclxuXHJcbiAgICBwcml2YXRlIGNvbGxpZGluZ0xpc3Q6IEFjdG9yQ29sbGlkZXJbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBhY3RvcjogQWN0b3I7XHJcbiAgICBwcml2YXRlIHJhbmdlOiBDaXJjbGVDb2xsaXNpb25SYW5nZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhY3RvcjogQWN0b3IsIHJhbmdlOiBDaXJjbGVDb2xsaXNpb25SYW5nZSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5hY3RvciA9IGFjdG9yO1xyXG4gICAgICAgIHRoaXMucmFuZ2UgPSByYW5nZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0Q29sbGlzaW9uUmFuZ2UoKTogQ2lyY2xlQ29sbGlzaW9uUmFuZ2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJhbmdlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldENvbGxpc2lvblJhbmdlKHJhbmdlOiBDaXJjbGVDb2xsaXNpb25SYW5nZSkge1xyXG4gICAgICAgIHRoaXMucmFuZ2UgPSByYW5nZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBY3RvcigpOiBBY3RvciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q29sbGlkaW5nTGlzdCgpOiBBY3RvckNvbGxpZGVyW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbGxpZGluZ0xpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgb25Db2xsaWRpbmdMaXN0UmVmcmVzaChjb2xsaWRpbmdMaXN0OiBBY3RvckNvbGxpZGVyW10pIHtcclxuICAgICAgICB0aGlzLmNvbGxpZGluZ0xpc3QgPSBjb2xsaWRpbmdMaXN0O1xyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJpbXBvcnQgeyBDb2xpUmVjZWl2ZXIsIENvbGlFbWl0IH0gZnJvbSBcIi4uL0FjdG9yL0FjdG9yTW9kdWxlcy9Db2xpTWVzc2FnZVwiO1xyXG5pbXBvcnQgeyBWZWMyIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9Eb2RNYXRoXCI7XHJcbmltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3IvQWN0b3JcIjtcclxuaW1wb3J0IHsgQXJyYXlBbGdvIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9Eb2REYXRhU3RydWN0dXJlXCI7XHJcbmltcG9ydCB7IEFjdG9yVHlwZSB9IGZyb20gXCIuLi8uLi9Db21tb24vRG9kS2V5XCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29saVJlcG9ydGVyIGV4dGVuZHMgQ29saVJlY2VpdmVyIHtcclxuICAgIHB1YmxpYyBpbkxpc3Q6IFZlYzJbXSA9IFtdO1xyXG4gICAgcHVibGljIGxheWVyOiBMYXlhLlNwcml0ZSA9IG5ldyBMYXlhLlNwcml0ZSgpO1xyXG5cclxuICAgIHByaXZhdGUgX21hdHJpeDogQWN0b3JbXVtdW10gPSBbXTsvL+WtmOWCqOavj+S4quWcsOWbvuiKgueCueS4reeahEFjdG9y5a+56LGhXHJcblxyXG4gICAgcHJpdmF0ZSBtYXRyaXhBZGQocG9zOlZlYzIsIGFjdG9yOkFjdG9yKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX21hdHJpeFtwb3MueF1bcG9zLnldLnB1c2goYWN0b3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbWF0cml4UmVtb3ZlKHBvczpWZWMyLCBhY3RvcjpBY3Rvcik6dm9pZHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX21hdHJpeFtwb3MueF1bcG9zLnldLmluZGV4T2YoYWN0b3IpO1xyXG4gICAgICAgIGlmIChpbmRleCAhPSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXRyaXhbcG9zLnhdW3Bvcy55XS5zcGxpY2UoaW5kZXgsMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtYXRyaXhHZXQocG9zOlZlYzIpOkFjdG9yW117XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hdHJpeFtwb3MueF1bcG9zLnldO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKDEwLCAxMCk7XHJcbiAgICAgICAgZm9yIChsZXQgdyA9IDA7IHcgPCAxMDsgdyArPSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hdHJpeFt3XSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBoID0gMDsgaCA8IDEwOyBoICs9IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGV0ZWN0aW9uKG5ldyBWZWMyKHcsIGgpLCBgJHtBY3RvclR5cGUuTW9uc3Rlcn1gKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hdHJpeFt3XVtoXSA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMubGF5ZXIpO1xyXG4gICAgICAgIHRoaXMubGF5ZXIuek9yZGVyID0gLTEwO1xyXG4gICAgICAgIHRoaXMubGF5ZXIucG9zKDUwLDUwKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FbnRyZShhY3RvcjogQWN0b3IsIHBvczogVmVjMik6IHZvaWQge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRW50ZXJcIiArIHBvcy54ICsgXCJ8XCIgKyBwb3MueSk7XHJcbiAgICAgICAgdGhpcy5pbkxpc3QucHVzaChwb3MpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICAgICAgdGhpcy5tYXRyaXhBZGQocG9zLGFjdG9yKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25MZWF2ZShhY3RvcjogQWN0b3IsIHBvczogVmVjMik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gQXJyYXlBbGdvLmZpbmRFbGUocG9zLCB0aGlzLmluTGlzdCk7XHJcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLmluTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgIHRoaXMubWF0cml4UmVtb3ZlKHBvcyxhY3Rvcik7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJMZWF2ZVwiICsgcG9zLnggKyBcInxcIiArIHBvcy55KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVuZGVyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubGF5ZXIuZ3JhcGhpY3MuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLmluTGlzdC5mb3JFYWNoKGVsZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXIuZ3JhcGhpY3MuZHJhd1JlY3QoZWxlLnggKiBDb2xpRW1pdC5HTE9CQUxfVU5JVF9XSURUSCArIDEsXHJcbiAgICAgICAgICAgICAgICBlbGUueSAqIENvbGlFbWl0LkdMT0JBTF9VTklUX0hFSUdIVCArIDEsXHJcbiAgICAgICAgICAgICAgICBDb2xpRW1pdC5HTE9CQUxfVU5JVF9XSURUSCAtIDIsXHJcbiAgICAgICAgICAgICAgICBDb2xpRW1pdC5HTE9CQUxfVU5JVF9IRUlHSFQgLSAyLFxyXG4gICAgICAgICAgICAgICAgXCIjZmYwMDAwXCJcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgR2FtZU1hcCBmcm9tIFwiLi9HYW1lTGV2ZWxcIjtcclxuaW1wb3J0IHsgQWN0b3JDb2xsaXNpb25Qcm9jZXNzb3IgfSBmcm9tIFwiLi9Db2xsaXNpb24vQWN0b3JDb2xsaXNpb25Qcm9jZXNzb3JcIjtcclxuaW1wb3J0IEdhbWVMZXZlbCBmcm9tIFwiLi9HYW1lTGV2ZWxcIjtcclxuaW1wb3J0IERvZFJlc291cmNlTWdyIGZyb20gXCIuLi9SZXNvdXJjZXMvRG9kUmVzb3VyY2VNZ3JcIjtcclxuaW1wb3J0IEFjdG9yTWdyIGZyb20gXCIuL0FjdG9yL0FjdG9yTWdyXCI7XHJcbmltcG9ydCBDb2xpUmVwb3J0ZXIgZnJvbSBcIi4vQ29sbGlzaW9uL0NvbGlSZXBvcnRlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUJhdHRsZSB7XHJcbiAgICBwdWJsaWMgbGV2ZWw6IEdhbWVMZXZlbDtcclxuICAgIHB1YmxpYyBtYXA6IEdhbWVNYXA7XHJcbiAgICBwdWJsaWMgYWN0b3JNZ3I6IEFjdG9yTWdyO1xyXG5cclxuICAgIHB1YmxpYyBjb2xsaXNpb246IEFjdG9yQ29sbGlzaW9uUHJvY2Vzc29yOy8v6LSf6LSj5ZyG5b2i56Kw5pKe5qOA5rWLXHJcbiAgICBwdWJsaWMgbWFwTm9kZUNQVTogQ29saVJlcG9ydGVyID0gbmV3IENvbGlSZXBvcnRlcigpOy8v6LSf6LSj5Zyw5Zu+6IqC54K556Kw5pKe5qOA5rWLXHJcblxyXG4gICAgcHJpdmF0ZSBfbGV2ZWxQcmVwYXJlZDogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmxldmVsID0gbmV3IEdhbWVMZXZlbCgpO1xyXG4gICAgICAgIHRoaXMubWFwID0gbmV3IEdhbWVNYXAoKTtcclxuICAgICAgICB0aGlzLmFjdG9yTWdyID0gbmV3IEFjdG9yTWdyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY29sbGlzaW9uID0gbmV3IEFjdG9yQ29sbGlzaW9uUHJvY2Vzc29yKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHByZXBhcmVMZXZlbCgpOiB2b2lkIHtcclxuICAgICAgICAvL1RPRE8gaW5pdCBsZXZlbCBpbmZvcm1hdGlvblxyXG4gICAgICAgIGxldCByZXMgPSBEb2RSZXNvdXJjZU1nci5JbnN0YW5jZS5nZXRDdXJyZW50TGV2ZWxSZXMoKTtcclxuXHJcbiAgICAgICAgLy90ZXN0XHJcbiAgICAgICAgcmVzID0ge2xldmVsOjEsbWFwOjJ9O1xyXG5cclxuICAgICAgICB0aGlzLmxldmVsLmluaXQocmVzWydsZXZlbCddKTsgLy9qdXN0IHNhbXBsZVxyXG4gICAgICAgIHRoaXMubWFwLmluaXQocmVzWydtYXAnXSk7XHJcbiAgICAgICAgdGhpcy5hY3Rvck1nci5pbml0KHJlc1snbWFwJ10pO1xyXG5cclxuICAgICAgICAvL0FORCBET05UIEZPUkdFVCBSRVNFVCBMQVNUIEJBVFRMRSBEQVRBIFJFTUFJTlMuIFxyXG4gICAgICAgIC8vdGhpcy5jb2xsaXNpb24ucmVzZXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fbGV2ZWxQcmVwYXJlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzTGV2ZWxQcmVwcmFyZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xldmVsUHJlcGFyZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIC8vVE9ET1xyXG4gICAgICAgIC8vQ0xFQVIgTEFTVCBCQVRUTEUgUkVTT1VSQ0VcclxuICAgICAgICB0aGlzLl9sZXZlbFByZXBhcmVkID0gZmFsc2U7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQmF0dGxlQ29uc3Qge1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBzdGFuZGFyZENvc3RJbmNyZWFzZVJhdGlvOiBudW1iZXIgPSAxO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBtYXhDb3N0TnVtOiBudW1iZXIgPSA5OTtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgaW5pdENvc3ROdW06IG51bWJlciA9IDY7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGxpZmVQb2ludDogbnVtYmVyID0gMztcclxufSIsImltcG9ydCB7IEJ1ZmYgfSBmcm9tIFwiLi9BY3Rvci9BY3Rvck1vZHVsZXMvQnVmZlwiO1xyXG5pbXBvcnQgeyBFdmVudENlbnRyZSB9IGZyb20gXCIuLi9FdmVudC9FdmVudENlbnRyZVwiO1xyXG5pbXBvcnQgRml4VGltZSBmcm9tIFwiLi4vRml4L0ZpeFRpbWVcIjtcclxuaW1wb3J0IERvZFJlc291cmNlTWdyIGZyb20gXCIuLi9SZXNvdXJjZXMvRG9kUmVzb3VyY2VNZ3JcIjtcclxuaW1wb3J0IEdhbWVCYXR0bGVDb25zdCBmcm9tIFwiLi9HYW1lQmF0dGxlQ29uc3RcIjtcclxuLyoqXHJcbiAqIOaooeWdl+ivtOaYjjog5ri45oiP5oiY5paX5Zyw5Zu+5qih5Z2XICBcclxuICog6LSf6LSj5YaF5a65OiDlnLDlm77lsZ7mgKforr7nva7vvIzlhajlsYBidWZm566h55CGICBcclxuICog6LSf6LSj5Lq6OiDpk7bljY4gIFxyXG4gKiDml7bpl7Q6IDIwMjDlubQz5pyIM+aXpTEyOjQ1OjQxICBcclxuICovXHJcblxyXG4vL0tSOiDlhajlsYDnlLHlhbPljaHmqKHlnZfnrqHnkIYgQOmTtuWNjlxyXG4vL+i/memHjOWPr+S7peWMheWQq+WFqOWxgOeahOiwg+aVtOWAvC/nlJ/lkb3lgLwv5rao6LS5XHJcbi8v5YWo5ri45oiP5qCH5YeG5YC85L2/55So5bi46YeP5a6a5LmJ5ZyoQmF0dGxlQ29uc3TnsbvkuK0g56S65L6L5Y+v5Lul55yL5LiL5pa5XHJcbi8v5Y+m77ya56eB5pyJ5oiQ5ZGY5ZG95ZCN6K+35Zyo5YmN6Z2i5Yqg5LiL5YiS57q/IOWjsOaYjueahOaIkOWRmOivt+WcqOaehOmAoOWHveaVsOS4reWFqOmDqOWIneWni+WMluS4gOS4quWAvO+8jOmYsuatonVuZGVmaW5lZCjph47mjIfpkogp55qE5oOF5Ya15Y+R55SfXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lTGV2ZWx7XHJcbiAgICBwcml2YXRlIF9pbml0aWFsQ29zdDpudW1iZXI7XHJcbiAgICBwcml2YXRlIF9jdXJyZW50Q29zdDpudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfbGlmZVBvaW50Om51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIF90aW1lTGluZTpudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2xvYmFsQnVmZkxpc3Q6IEJ1ZmZbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuX2luaXRpYWxDb3N0ID0gMDtcclxuICAgICAgICB0aGlzLl9jdXJyZW50Q29zdCA9IDA7XHJcbiAgICAgICAgdGhpcy5fbGlmZVBvaW50ID0gMDtcclxuICAgICAgICB0aGlzLl90aW1lTGluZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fZ2xvYmFsQnVmZkxpc3QgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdChyZXM6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIC8vZm9yIGV4YW1wbGVcclxuICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICAgICAgdGhpcy5faW5pdGlhbENvc3QgPSB0aGlzLl9jdXJyZW50Q29zdCA9IHJlc1snaW5pdENvc3QnXSB8fCBHYW1lQmF0dGxlQ29uc3QuaW5pdENvc3ROdW07XHJcbiAgICAgICAgdGhpcy5fbGlmZVBvaW50ID0gcmVzWydsaWZlJ10gfHwgR2FtZUJhdHRsZUNvbnN0LmxpZmVQb2ludDtcclxuICAgICAgICB0aGlzLl90aW1lTGluZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5nZXRHbG9iYWxCdWZmTGlzdCgpO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZVRpbWUoKTsgXHJcbiAgICAgICAgdGhpcy5fdXBkYXRlQ29zdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRHbG9iYWxCdWZmTGlzdCgpOkJ1ZmZbXXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2xvYmFsQnVmZkxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoYW5nZUNvc3QoKTp2b2lke1xyXG4gICAgICAgIC8vdG9kby4uLi5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF91cGRhdGVUaW1lKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3RpbWVMaW5lICs9IEZpeFRpbWUuZGVsdGFUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3VwZGF0ZUNvc3QoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9nbG9iYWxCdWZmTGlzdC5zcGxpY2UoMCwgdGhpcy5fZ2xvYmFsQnVmZkxpc3QubGVuZ3RoKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgRG9kTG9nIGZyb20gXCIuLi9Db21tb24vRG9kTG9nXCI7XHJcbmltcG9ydCBHYW1lU3RhdGVNZ3IgZnJvbSBcIi4vU3RhdGUvR2FtZVN0YXRlTWdyXCI7XHJcbmltcG9ydCBHYW1lQmF0dGxlIGZyb20gXCIuL0dhbWVCYXR0bGVcIjtcclxuaW1wb3J0IEdhbWVMb2JieSBmcm9tIFwiLi9Mb2JieS9HYW1lTG9iYnlcIjtcclxuXHJcbi8qKlxyXG4gKiDov5nmmK/muLjmiI/mnKzkvZNcclxuICog6K+05LiA5LqbUmhvZGVzX0dhbWXmlofku7blpLnkuIvnmoTms6jph4rop4TliJnvvIzmlrnkvr/ku6XlkI5jdHJsK2ZcclxuICpcclxuICogMS4vL0B0b2RvIOagh+azqOmcgOimgeWujOWWhOeahOmDqOWIhlxyXG4gKlxyXG4gKiAyLi8vQHRvZml4IOagh+azqOW3suefpeaciemXrumimOeahOmDqOWIhlxyXG4gKlxyXG4gKiAzLi8vQHRlc3Qg5qCH5rOo5LuF5L6b5rWL6K+V5L2/55So55qE6YOo5YiGXHJcbiAqXHJcbiAqIDMuLy9AcmVkY2FsbCDmoIfms6josIPnlKjmuLLmn5PmqKHlnZfnmoTpg6jliIZcclxuICpcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJob2Rlc0dhbWUge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBSaG9kZXNHYW1lO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSW5zdGFuY2UoKTogUmhvZGVzR2FtZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlIHx8ICh0aGlzLl9pbnN0YW5jZSA9IG5ldyB0aGlzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0ZU1ncjogR2FtZVN0YXRlTWdyO1xyXG4gICAgcHVibGljIGJhdHRsZTogR2FtZUJhdHRsZTtcclxuICAgIHB1YmxpYyBsb2JieTogR2FtZUxvYmJ5O1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmJhdHRsZSA9IG5ldyBHYW1lQmF0dGxlKCk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZU1nciA9IG5ldyBHYW1lU3RhdGVNZ3IodGhpcy5iYXR0bGUpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGVNZ3IuaW5pdCgpO1xyXG4gICAgICAgIERvZExvZy5kZWJ1ZyhgUmhvZGVzR2FtZTogaW5pdGlhbGl6YXRpb24gY29tcGxldGUuIGApXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXRlTWdyLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJpbXBvcnQgR2FtZUJhdHRsZSBmcm9tIFwiLi4vR2FtZUJhdHRsZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVN0YXRlQmFzZSB7XHJcbiAgICBwcm90ZWN0ZWQgX2JhdHRsZTogR2FtZUJhdHRsZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihiYXR0bGU6IEdhbWVCYXR0bGUpIHtcclxuICAgICAgICB0aGlzLl9iYXR0bGUgPSBiYXR0bGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudGVyKCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbGVhdmUoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgR2FtZVN0YXRlQmFzZSBmcm9tIFwiLi9HYW1lU3RhdGVCYXNlXCI7XHJcbmltcG9ydCBSaG9kZXNHYW1lIGZyb20gXCIuLi9SaG9kZXNHYW1lXCI7XHJcbmltcG9ydCBHYW1lQmF0dGxlIGZyb20gXCIuLi9HYW1lQmF0dGxlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU3RhdGVCYXR0bGUgZXh0ZW5kcyBHYW1lU3RhdGVCYXNle1xyXG4gICAgY29uc3RydWN0b3IoYmF0dGxlOkdhbWVCYXR0bGUpIHtcclxuICAgICAgICBzdXBlcihiYXR0bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnRlcigpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5lbnRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsZWF2ZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5sZWF2ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKCk7XHJcbiAgICAgICAgdGhpcy5fYmF0dGxlLmFjdG9yTWdyLnVwZGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuX2JhdHRsZS5tYXAudXBkYXRlKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgR2FtZVN0YXRlQmFzZSBmcm9tIFwiLi9HYW1lU3RhdGVCYXNlXCI7XHJcbmltcG9ydCBSaG9kZXNHYW1lIGZyb20gXCIuLi9SaG9kZXNHYW1lXCI7XHJcbmltcG9ydCBEb2RSZXNvdXJjZU1nciBmcm9tIFwiLi4vLi4vUmVzb3VyY2VzL0RvZFJlc291cmNlTWdyXCI7XHJcbmltcG9ydCB7IEdhbWVTdGF0ZUlEIH0gZnJvbSBcIi4vR2FtZVN0YXRlTWdyXCI7XHJcbmltcG9ydCBEb2RMb2cgZnJvbSBcIi4uLy4uL0NvbW1vbi9Eb2RMb2dcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTdGF0ZUdhbWVsb2FkIGV4dGVuZHMgR2FtZVN0YXRlQmFzZXtcclxuICAgIGNvbnN0cnVjdG9yKGJhdHRsZSkge1xyXG4gICAgICAgIHN1cGVyKGJhdHRsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudGVyKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmVudGVyKCk7XHJcbiAgICAgICAgLy9UT0RPIFNIT1cgTE9BRElORyBTQ1JFRU5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbGVhdmUoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIubGVhdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIucmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLnVwZGF0ZSgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiR2FtZUxvYWQgdXBkYXRlXCIpO1xyXG4gICAgICAgIGlmICh0cnVlID09IERvZFJlc291cmNlTWdyLkluc3RhbmNlLmluaXRlZCgpKSB7XHJcbiAgICAgICAgICAgIC8vV0UgRE8gTk9UIEhBVkUgTE9CQlkgTU9EVUxFIElOIFRISVMgVkVSU0lPTlxyXG4gICAgICAgICAgICAvL0pVU1QgU0VUIExFVkVMIElEIEhFUkVcclxuICAgICAgICAgICAgLy9UTyBERUxcclxuICAgICAgICAgICAgRG9kUmVzb3VyY2VNZ3IuSW5zdGFuY2Uuc2V0TGV2ZWxJRCgxKTtcclxuICAgICAgICAgICAgUmhvZGVzR2FtZS5JbnN0YW5jZS5zdGF0ZU1nci5ydW5TdGF0ZShHYW1lU3RhdGVJRC5MZXZlbGxvYWQpO1xyXG4gICAgICAgICAgICBEb2RMb2cuZGVidWcoYEdhbWVTdGF0ZUdhbWVsb2FkLnVwZGF0ZTogUmVzb3VyY2VzIGluaXQgY29tcGxldGUsIHNldCBsZXZlbCBpbnRvIDEuIGApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBHYW1lU3RhdGVCYXNlIGZyb20gXCIuL0dhbWVTdGF0ZUJhc2VcIjtcclxuaW1wb3J0IFJob2Rlc0dhbWUgZnJvbSBcIi4uL1Job2Rlc0dhbWVcIjtcclxuaW1wb3J0IHsgR2FtZVN0YXRlSUQgfSBmcm9tIFwiLi9HYW1lU3RhdGVNZ3JcIjtcclxuaW1wb3J0IERvZFJlc291cmNlTWdyIGZyb20gXCIuLi8uLi9SZXNvdXJjZXMvRG9kUmVzb3VyY2VNZ3JcIjtcclxuaW1wb3J0IERvZExvZyBmcm9tIFwiLi4vLi4vQ29tbW9uL0RvZExvZ1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVN0YXRlTGV2ZWxMb2FkIGV4dGVuZHMgR2FtZVN0YXRlQmFzZXtcclxuICAgIGNvbnN0cnVjdG9yKGJhdHRsZSkge1xyXG4gICAgICAgIHN1cGVyKGJhdHRsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudGVyKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmVudGVyKCk7XHJcbiAgICAgICAgdGhpcy5fYmF0dGxlLnByZXBhcmVMZXZlbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsZWF2ZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5sZWF2ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKCk7XHJcbiAgICAgICAgaWYgKHRydWUgPT0gRG9kUmVzb3VyY2VNZ3IuSW5zdGFuY2UuaXNMZXZlbFByZXBhcmVkKCkpIHtcclxuICAgICAgICAgICAgaWYgKHRydWUgPT0gdGhpcy5fYmF0dGxlLmlzTGV2ZWxQcmVwcmFyZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgUmhvZGVzR2FtZS5JbnN0YW5jZS5zdGF0ZU1nci5ydW5TdGF0ZShHYW1lU3RhdGVJRC5CYXR0bGUpO1xyXG4gICAgICAgICAgICAgICAgRG9kTG9nLmRlYnVnKGBHYW1lU3RhdGVMZXZlbGxvYWQudXBkYXRlOiBsZXZlbCBbJHtEb2RSZXNvdXJjZU1nci5JbnN0YW5jZS5nZXRMZXZlbElEKCl9XSBpcyBwcmVwYXJlZC4gYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgR2FtZVN0YXRlQmFzZSBmcm9tIFwiLi9HYW1lU3RhdGVCYXNlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU3RhdGVMb2JieSBleHRlbmRzIEdhbWVTdGF0ZUJhc2V7XHJcbiAgICBjb25zdHJ1Y3RvcihiYXR0bGUpIHtcclxuICAgICAgICBzdXBlcihiYXR0bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnRlcigpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5lbnRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsZWF2ZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5sZWF2ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgR2FtZVN0YXRlQmFzZSBmcm9tIFwiLi9HYW1lU3RhdGVCYXNlXCI7XHJcbmltcG9ydCBHYW1lU3RhdGVCYXR0bGUgZnJvbSBcIi4vR2FtZVN0YXRlQmF0dGxlXCI7XHJcbmltcG9ydCBEb2RMb2cgZnJvbSBcIi4uLy4uL0NvbW1vbi9Eb2RMb2dcIjtcclxuaW1wb3J0IEdhbWVTdGF0ZUxldmVsTG9hZCBmcm9tIFwiLi9HYW1lU3RhdGVMZXZlbGxvYWRcIjtcclxuaW1wb3J0IEdhbWVTdGF0ZUdhbWVsb2FkIGZyb20gXCIuL0dhbWVTdGF0ZUdhbWVsb2FkXCI7XHJcbmltcG9ydCBHYW1lU3RhdGVMb2JieSBmcm9tIFwiLi9HYW1lU3RhdGVMb2JieVwiO1xyXG5pbXBvcnQgUmhvZGVzR2FtZSBmcm9tIFwiLi4vUmhvZGVzR2FtZVwiO1xyXG5pbXBvcnQgR2FtZUJhdHRsZSBmcm9tIFwiLi4vR2FtZUJhdHRsZVwiO1xyXG5cclxuZXhwb3J0IGVudW0gR2FtZVN0YXRlSUQge1xyXG4gICAgTm9uZSxcclxuICAgIEdhbWVsb2FkLFxyXG4gICAgTG9iYnksXHJcbiAgICBMZXZlbGxvYWQsXHJcbiAgICBCYXR0bGUsXHJcbiAgICBDb3VudFxyXG59XHJcblxyXG4vKlxyXG4gKiDlpKfnirbmgIHmnLog566h55CG5ri45oiP5omA5aSE6Zi25q61XHJcbiAqIEBUT0RPIEdBTUVMT0FEIExPQkJZIExFVkVMTE9BRCBCQVRUTEVcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTdGF0ZU1nciB7XHJcbiAgICBwcml2YXRlIF9zdGF0ZXM6IEdhbWVTdGF0ZUJhc2VbXTtcclxuICAgIHByaXZhdGUgX2N1cnJlbnRTdGF0ZTogR2FtZVN0YXRlQmFzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihiYXR0bGU6R2FtZUJhdHRsZSkge1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZSA9IG51bGw7XHJcbiAgICAgICAgLy8gbGV0IGJhdHRsZSA9IFJob2Rlc0dhbWUuSW5zdGFuY2UuYmF0dGxlO1xyXG4gICAgXHJcbiAgICAgICAgdGhpcy5fc3RhdGVzID0gW107XHJcbiAgICAgICAgdGhpcy5fc3RhdGVzLnB1c2gobnVsbCk7XHJcbiAgICAgICAgdGhpcy5fc3RhdGVzLnB1c2gobmV3IEdhbWVTdGF0ZUdhbWVsb2FkKGJhdHRsZSkpO1xyXG4gICAgICAgIHRoaXMuX3N0YXRlcy5wdXNoKG5ldyBHYW1lU3RhdGVMb2JieShiYXR0bGUpKTtcclxuICAgICAgICB0aGlzLl9zdGF0ZXMucHVzaChuZXcgR2FtZVN0YXRlTGV2ZWxMb2FkKGJhdHRsZSkpO1xyXG4gICAgICAgIHRoaXMuX3N0YXRlcy5wdXNoKG5ldyBHYW1lU3RhdGVCYXR0bGUoYmF0dGxlKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBpbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucnVuU3RhdGUoR2FtZVN0YXRlSUQuR2FtZWxvYWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBydW5TdGF0ZShzdGF0ZUlEOiBHYW1lU3RhdGVJRCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChHYW1lU3RhdGVJRC5Db3VudCA8PSBzdGF0ZUlEIHx8IHN0YXRlSUQgPD0gR2FtZVN0YXRlSUQuTm9uZSkge1xyXG4gICAgICAgICAgICBEb2RMb2cuZXJyb3IoYEdhbWVTdGF0ZU1nci5ydW5TdGF0ZTogSW52YWxpZCBzdGF0ZUlEIFske3N0YXRlSUR9XS4gYCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChudWxsICE9IHRoaXMuX2N1cnJlbnRTdGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUubGVhdmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZSA9IHRoaXMuX3N0YXRlc1tzdGF0ZUlEXTtcclxuICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUuZW50ZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChudWxsICE9IHRoaXMuX2N1cnJlbnRTdGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUudXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAobnVsbCAhPSB0aGlzLl9jdXJyZW50U3RhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlLmxlYXZlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3N0YXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLl9zdGF0ZXNbaV07XHJcbiAgICAgICAgICAgIHN0YXRlLnJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEdhbWVDb25maWcgZnJvbSBcIi4vR2FtZUNvbmZpZ1wiO1xyXG5pbXBvcnQgU2NlbmVNYW5hZ2VyIGZyb20gXCIuL1NjZW5lTWFuYWdlclwiO1xyXG5pbXBvcnQgRml4VGltZSBmcm9tIFwiLi9GaXgvRml4VGltZVwiO1xyXG5pbXBvcnQgUmhvZGVzR2FtZSBmcm9tIFwiLi9HYW1lL1Job2Rlc0dhbWVcIjtcclxuaW1wb3J0IHsgRXZlbnRDZW50cmUgfSBmcm9tIFwiLi9FdmVudC9FdmVudENlbnRyZVwiO1xyXG5pbXBvcnQgRG9kUmVzb3VyY2VNZ3IgZnJvbSBcIi4vUmVzb3VyY2VzL0RvZFJlc291cmNlTWdyXCI7XHJcbmltcG9ydCBQZXJmb3JtYW5jZUNlbnRyZSBmcm9tIFwiLi9Db21tb24vR3JhcGhpY3MvUGVyZm9ybWFuY2VfTW9kdWxlL1BlcmZvcm1hbmNlQ2VudHJlXCI7XHJcbmltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi9Db21tb24vRG9kTWF0aFwiO1xyXG5pbXBvcnQgQWN0b3IgZnJvbSBcIi4vR2FtZS9BY3Rvci9BY3RvclwiO1xyXG5pbXBvcnQgeyBBY3RvclR5cGUgfSBmcm9tIFwiLi9Db21tb24vRG9kS2V5XCI7XHJcblxyXG5jbGFzcyBNYWluIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdC8v5qC55o2uSURF6K6+572u5Yid5aeL5YyW5byV5pOOXHRcdFxyXG5cdFx0aWYgKHdpbmRvd1tcIkxheWEzRFwiXSkgTGF5YTNELmluaXQoR2FtZUNvbmZpZy53aWR0aCwgR2FtZUNvbmZpZy5oZWlnaHQpO1xyXG5cdFx0ZWxzZSBMYXlhLmluaXQoR2FtZUNvbmZpZy53aWR0aCwgR2FtZUNvbmZpZy5oZWlnaHQsIExheWFbXCJXZWJHTFwiXSk7XHJcblx0XHRMYXlhW1wiUGh5c2ljc1wiXSAmJiBMYXlhW1wiUGh5c2ljc1wiXS5lbmFibGUoKTtcclxuXHRcdExheWFbXCJEZWJ1Z1BhbmVsXCJdICYmIExheWFbXCJEZWJ1Z1BhbmVsXCJdLmVuYWJsZSgpO1xyXG5cdFx0TGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBHYW1lQ29uZmlnLnNjYWxlTW9kZTtcclxuXHRcdExheWEuc3RhZ2Uuc2NyZWVuTW9kZSA9IEdhbWVDb25maWcuc2NyZWVuTW9kZTtcclxuXHRcdC8v5YW85a655b6u5L+h5LiN5pSv5oyB5Yqg6L29c2NlbmXlkI7nvIDlnLrmma9cclxuXHRcdExheWEuVVJMLmV4cG9ydFNjZW5lVG9Kc29uID0gR2FtZUNvbmZpZy5leHBvcnRTY2VuZVRvSnNvbjtcclxuXHJcblx0XHQvL+aJk+W8gOiwg+ivlemdouadv++8iOmAmui/h0lEReiuvue9ruiwg+ivleaooeW8j++8jOaIluiAhXVybOWcsOWdgOWinuWKoGRlYnVnPXRydWXlj4LmlbDvvIzlnYflj6/miZPlvIDosIPor5XpnaLmnb/vvIlcclxuXHRcdGlmIChHYW1lQ29uZmlnLmRlYnVnIHx8IExheWEuVXRpbHMuZ2V0UXVlcnlTdHJpbmcoXCJkZWJ1Z1wiKSA9PSBcInRydWVcIikgTGF5YS5lbmFibGVEZWJ1Z1BhbmVsKCk7XHJcblx0XHRpZiAoR2FtZUNvbmZpZy5waHlzaWNzRGVidWcgJiYgTGF5YVtcIlBoeXNpY3NEZWJ1Z0RyYXdcIl0pIExheWFbXCJQaHlzaWNzRGVidWdEcmF3XCJdLmVuYWJsZSgpO1xyXG5cdFx0aWYgKEdhbWVDb25maWcuc3RhdCkgTGF5YS5TdGF0LnNob3coKTtcclxuXHRcdExheWEuYWxlcnRHbG9iYWxFcnJvciA9IHRydWU7XHJcblxyXG5cdFx0Ly9HQU1FIElOSVQgKEdMT0JBTCBNT0RVTEUpXHJcblx0XHRjb25zb2xlLmxvZyhcIlBDIGluaXRcIik7XHJcblx0XHRQZXJmb3JtYW5jZUNlbnRyZS5pbml0aWFsaXplKExheWEuc3RhZ2UpO1xyXG5cclxuXHRcdC8vdGVzdFxyXG5cdFx0UGVyZm9ybWFuY2VDZW50cmUuaW5zdGFuY2UuaW5pdEJvYXJkKFtcclxuXHRcdFx0WzAsMCwwLDBdLFxyXG5cdFx0XHRbMCwwLDAsMF1cclxuXHRcdF0sIG5ldyBWZWMyKDUwLDUwKSwgbmV3IFZlYzIoMTAwLDEwMCksIFwiI2ZmMDBmZlwiLCBcIiNmZmZmMDBcIik7XHJcblx0XHQvL3Rlc3QgZW5kXHJcblxyXG5cdFx0Rml4VGltZS5pbml0KCk7XHJcblx0XHRSaG9kZXNHYW1lLkluc3RhbmNlLmluaXQoKTtcclxuXHRcdERvZFJlc291cmNlTWdyLkluc3RhbmNlLmluaXQoKTtcclxuXHRcdEV2ZW50Q2VudHJlLmluaXQoKTtcclxuXHJcblx0XHQvL+a/gOa0u+i1hOa6kOeJiOacrOaOp+WItu+8jHZlcnNpb24uanNvbueUsUlEReWPkeW4g+WKn+iDveiHquWKqOeUn+aIkO+8jOWmguaenOayoeacieS5n+S4jeW9seWTjeWQjue7rea1geeoi1xyXG5cdFx0TGF5YS5SZXNvdXJjZVZlcnNpb24uZW5hYmxlKFwidmVyc2lvbi5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vblZlcnNpb25Mb2FkZWQpLCBMYXlhLlJlc291cmNlVmVyc2lvbi5GSUxFTkFNRV9WRVJTSU9OKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBvblZlcnNpb25Mb2FkZWQoKTogdm9pZCB7XHJcblx0XHQvL+a/gOa0u+Wkp+Wwj+WbvuaYoOWwhO+8jOWKoOi9veWwj+WbvueahOaXtuWAme+8jOWmguaenOWPkeeOsOWwj+WbvuWcqOWkp+WbvuWQiOmbhumHjOmdou+8jOWImeS8mOWFiOWKoOi9veWkp+WbvuWQiOmbhu+8jOiAjOS4jeaYr+Wwj+WbvlxyXG5cdFx0TGF5YS5BdGxhc0luZm9NYW5hZ2VyLmVuYWJsZShcImZpbGVjb25maWcuanNvblwiLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMub25Db25maWdMb2FkZWQpKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBvbkNvbmZpZ0xvYWRlZCgpOiB2b2lkIHtcclxuXHJcblx0XHRcclxuXHJcblx0XHRTY2VuZU1hbmFnZXIuSW5zdGFuY2UuYXdha2UoKTtcclxuXHRcdFxyXG5cclxuXHRcdC8vdGVzdFxyXG5cdFx0RG9kUmVzb3VyY2VNZ3IuSW5zdGFuY2UuaW5pdCgpO1xyXG5cdFx0XHJcblx0XHQvL0F3YWtlIEdhbWUgRW5naW5lIExvb3BcclxuXHRcdExheWEudGltZXIubG9vcCgxNiwgdGhpcywgdGhpcy5fdXBkYXRlKTtcclxuXHRcdFxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBfdXBkYXRlKCk6IHZvaWQge1xyXG5cdFx0Rml4VGltZS51cGRhdGUoKTtcclxuXHRcdFJob2Rlc0dhbWUuSW5zdGFuY2UudXBkYXRlKCk7XHJcblx0XHREb2RSZXNvdXJjZU1nci5JbnN0YW5jZS51cGRhdGUoKTtcclxuXHR9XHJcbn1cclxuXHJcbi8v5r+A5rS75ZCv5Yqo57G7XHJcbm5ldyBNYWluKCk7XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIERvZFJlc291cmNlTWdyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogRG9kUmVzb3VyY2VNZ3I7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBJbnN0YW5jZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2UgfHwgKHRoaXMuX2luc3RhbmNlID0gbmV3IHRoaXMoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPIEDpk7bljY5cclxuICAgIC8vbG9hZCByZXNvdXJjZXMgaGVyZSBpbmNsdWRpbmcgSlNPTiAvIFRFWFRVUkUgLyBBVkFUQVIgLyBTUElORVxyXG4gICAgLy9wcml2YXRlIF9qc29uOiBEb2RKc29uTG9hZGVyO1xyXG4gICAgLy9wcml2YXRlIF90ZXg6IERvZFRleHR1cmVMb2FkZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfbGV2ZWxJRDogbnVtYmVyIHwgbnVsbDtcclxuICAgIHByaXZhdGUgX2luaXRlZDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX2xldmVsUHJlcGFyZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxJRCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5faW5pdGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxQcmVwYXJlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRMZXZlbElEKGlkOiBudW1iZXIgfCBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWxJRCA9IGlkO1xyXG4gICAgICAgIHRoaXMuX2xldmVsUHJlcGFyZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TGV2ZWxJRCgpOiBudW1iZXIgfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGV2ZWxJRDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdCgpOiB2b2lkIHtcclxuICAgICAgICAvL1RPRE8gTE9BRFxyXG4gICAgICAgIC8vdGhpcy5fanNvbi5sb2FkKCk7XHJcbiAgICAgICAgLy90aGlzLl90ZXgubG9hZCgpO1xyXG4gICAgICAgIC8vc2V0IGluaXRlZCBmbGFnIHRydWUgd2hpbGUgaW5pdGlhbGl6YXRpb24gY29tcGxldGVcclxuICAgICAgICB0aGlzLl9pbml0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luaXRlZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChudWxsICE9IHRoaXMuc2V0TGV2ZWxJRCAmJiBmYWxzZSA9PSB0aGlzLl9sZXZlbFByZXBhcmVkKSB7XHJcbiAgICAgICAgICAgIC8vcHJlcGFyZSBwcmVmYWIgaGVyZVxyXG4gICAgICAgICAgICBpZiAoMSkgeyAgICAvL21ha2Ugc3VyZSBwcmVmYWIgcHJlcGFyZWRcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xldmVsUHJlcGFyZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0xldmVsUHJlcGFyZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xldmVsUHJlcGFyZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEN1cnJlbnRMZXZlbFJlcygpOiBhbnkge1xyXG4gICAgICAgIC8vVE9ET1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRBY3RvclJlc0J5SUQoaWQ6IG51bWJlcik6IGFueSB7XHJcbiAgICAgICAgLy9UT0RPXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbn0iLCIvLyBpbXBvcnQgRXZlbnRDZW50cmUgZnJvbSBcIi4vVG95Ym94L0V2ZW50Q2VudHJlXCI7XHJcbi8vIGltcG9ydCBEYXRhYmFzZSBmcm9tIFwiLi9Ub3lib3gvRGF0YWJhc2VcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjZW5lTWFuYWdlcntcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogU2NlbmVNYW5hZ2VyO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSW5zdGFuY2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlIHx8ICh0aGlzLl9pbnN0YW5jZSA9IG5ldyB0aGlzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgbG9hZGluZ1NjZW5lOnN0cmluZyA9IFwiTG9hZGluZ1NjZW5lLnNjZW5lXCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGdhbWVTY2VuZTpzdHJpbmcgPSBcIkdhbWVTY2VuZS5zY2VuZVwiO1xyXG5cclxuICAgIHB1YmxpYyBhd2FrZSgpOiB2b2lkIHtcclxuICAgICAgICBMYXlhLlNjZW5lLm9wZW4odGhpcy5nYW1lU2NlbmUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IHt1aX0gZnJvbSBcIi4uL3VpL2xheWFNYXhVSVwiO1xyXG5pbXBvcnQgUmhvZGVzR2FtZSBmcm9tIFwiLi4vR2FtZS9SaG9kZXNHYW1lXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSBleHRlbmRzIHVpLkdhbWVTY2VuZVVJIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgVUlTZXQ6IExheWEuU3ByaXRlO1xyXG4gICAgcHVibGljIHN0YXRpYyBzdGFnZTogTGF5YS5TdGFnZTtcclxuICAgIHByaXZhdGUgX3BhdXNlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgLy/lhajlsYDmlbDmja7vvIjmlbDmja7lupPnsbvlrozmiJDlkI7lsIbooqvmm7/ku6PvvIlcclxuICAgIHB1YmxpYyBzdGF0aWMgZnJhbWVMZW5ndGg6IG51bWJlciA9IDIwOy8v5bin6ZW/5bqmXHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHt1aX0gZnJvbSBcIi4uL3VpL2xheWFNYXhVSVwiXHJcblxyXG5cclxuLy9UT1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkaW5nIGV4dGVuZHMgdWkuTG9hZGluZ1NjZW5lVUl7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKClcclxuICAgIH1cclxufSIsIi8qKlRoaXMgY2xhc3MgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgTGF5YUFpcklERSwgcGxlYXNlIGRvIG5vdCBtYWtlIGFueSBtb2RpZmljYXRpb25zLiAqL1xuaW1wb3J0IFZpZXc9TGF5YS5WaWV3O1xyXG5pbXBvcnQgRGlhbG9nPUxheWEuRGlhbG9nO1xyXG5pbXBvcnQgU2NlbmU9TGF5YS5TY2VuZTtcbnZhciBSRUc6IEZ1bmN0aW9uID0gTGF5YS5DbGFzc1V0aWxzLnJlZ0NsYXNzO1xuZXhwb3J0IG1vZHVsZSB1aSB7XHJcbiAgICBleHBvcnQgY2xhc3MgR2FtZVNjZW5lVUkgZXh0ZW5kcyBTY2VuZSB7XHJcblx0XHRwdWJsaWMgVUlTZXQ6TGF5YS5TcHJpdGU7XG5cdFx0cHVibGljIFNpZGVCYXI6TGF5YS5TcHJpdGU7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJHYW1lU2NlbmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkuR2FtZVNjZW5lVUlcIixHYW1lU2NlbmVVSSk7XHJcbiAgICBleHBvcnQgY2xhc3MgTG9hZGluZ1NjZW5lVUkgZXh0ZW5kcyBTY2VuZSB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkxvYWRpbmdTY2VuZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS5Mb2FkaW5nU2NlbmVVSVwiLExvYWRpbmdTY2VuZVVJKTtcclxufVxyIl19
