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
        // console.log(this.elapsedTime);
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
},{"./SceneScript/Game":53,"./SceneScript/Loading":54}],16:[function(require,module,exports){
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
    /**
     * 将此对象设置到场上
     */
    Actor.prototype.setOnMap = function (pos) {
        //todo: 启动模块
        this.atk.start(pos);
        this.transform.start(pos);
        this.state.runState(ActorStateFsm_1.ActorStateID.Born);
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
},{"../../Common/DodKey":2,"../../Fix/FixSymbol":13,"./ActorModules/ActorBuffMgr":18,"./ActorModules/ActorCost":19,"./ActorModules/ActorSkill":20,"./ActorModules/Animation":21,"./ActorModules/ColiMessage":22,"./ActorModules/Profile":24,"./ActorModules/Transform":25,"./ActorModules/UnitRender":26,"./ActorRoute":27,"./Attack/AtkAbst":28,"./Attack/Blocker":29,"./State/ActorStateFsm":34}],17:[function(require,module,exports){
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
        this.actors[1].state.runState(ActorStateFsm_1.ActorStateID.Prepared);
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
    ActorMgr.prototype.deployOprt = function (id, pos) {
        var oprt = this.getActorByID(id);
        if (oprt == null) {
            throw new DOMException("Deploting None Existing Operator");
        }
        if (oprt.state.currentStateType != ActorStateFsm_1.ActorStateID.Prepared) {
            throw new DOMException("Deploying None Prepared Operator");
        }
        if (oprt.type != DodKey_1.ActorType.Operator) {
            throw new DOMException("Deploying None Operator Actor");
        }
        oprt.setOnMap(pos);
        oprt.state.runState(ActorStateFsm_1.ActorStateID.Born);
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
},{"../../Common/DodKey":2,"../RhodesGame":43,"./Actor":16,"./State/ActorStateFsm":34}],18:[function(require,module,exports){
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
    Transform.prototype.start = function (pos) {
        this.isWorking = function () { return true; };
        this.pos.setNodePos(pos);
    };
    Transform.prototype.terminate = function () {
        this.isWorking = function () { return false; };
    };
    Transform.prototype.isWorking = function () {
        return false;
    };
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
    /**
     * 依据地图节点设置位置
     * @param pos 此处的Vec2实例储存的是整数数据，用于描述地图节点位置
     */
    Pos.prototype.setNodePos = function (pos) {
        this.data = new DodMath_1.Vec2(pos.x * ColiMessage_1.ColiEmit.GLOBAL_UNIT_WIDTH, pos.y * ColiMessage_1.ColiEmit.GLOBAL_UNIT_HEIGHT);
    };
    return Pos;
}());
},{"../../../Common/DodMath":4,"./ColiMessage":22}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PerformanceCentre_1 = require("../../../Common/Graphics/Performance_Module/PerformanceCentre");
var DodMath_1 = require("../../../Common/DodMath");
var FixTime_1 = require("../../../Fix/FixTime");
var UnitRender = /** @class */ (function () {
    function UnitRender(keeper) {
        this._keeper = keeper;
    }
    UnitRender.prototype.bornAnimation = function () {
        var _this = this;
        PerformanceCentre_1.default.instance.displayActor(this._keeper, this._keeper.transform.pos.data, new DodMath_1.Vec2(30, 30), "#ff00ff");
        var borntime = FixTime_1.default.elapsedTime;
        var looper = function () {
            if (FixTime_1.default.elapsedTime - borntime >= 3) {
                PerformanceCentre_1.default.instance.distroyActor(_this._keeper, new DodMath_1.Vec2());
                Laya.timer.clear(_this, looper);
                return;
            }
            PerformanceCentre_1.default.instance.editBar(_this._keeper, 0, (FixTime_1.default.elapsedTime - borntime) / 3);
        };
        Laya.timer.loop(16, this, looper);
    };
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
},{"../../../Common/DodMath":4,"../../../Common/Graphics/Performance_Module/PerformanceCentre":6,"../../../Fix/FixTime":14}],27:[function(require,module,exports){
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
    AtkStateMachine.prototype.start = function (pos) {
        this.isWorking = function () { return true; };
        this.seeker.reposition(pos);
    };
    AtkStateMachine.prototype.terminate = function () {
        this.isWorking = function () { return false; };
    };
    AtkStateMachine.prototype.isWorking = function () { return false; };
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
},{"../../../Common/DodDataStructure":1,"../../../Common/DodKey":2,"../../../Common/DodMath":4,"../../RhodesGame":43}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DodKey_1 = require("../../../Common/DodKey");
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
        // this.update();
    };
    MapNodeSeeker.prototype.reposition = function (pos) {
        this._origin = pos;
        this.setAbsolute();
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
        this._captureList = this._captureList.filter(function (ele) {
            return ele.type == DodKey_1.ActorType.Monster;
        });
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
},{"../../../Common/DodDataStructure":1,"../../../Common/DodKey":2,"../../../Common/DodMath":4,"../../RhodesGame":43}],31:[function(require,module,exports){
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
var FixTime_1 = require("../../../Fix/FixTime");
var ActorStateFsm_1 = require("./ActorStateFsm");
var DodKey_1 = require("../../../Common/DodKey");
var ActorStateBorn = /** @class */ (function (_super) {
    __extends(ActorStateBorn, _super);
    function ActorStateBorn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._enterTime = 0;
        return _this;
    }
    ActorStateBorn.prototype.enter = function () {
        this._enterTime = FixTime_1.default.elapsedTime;
        this._actor.render.bornAnimation();
        console.log("Enter Born");
        //test
    };
    ActorStateBorn.prototype.update = function () {
        if (FixTime_1.default.elapsedTime - this._enterTime >= 3) { //todo: 这个出生时间应该是一个全场共通的常数
            if (this._actor.type == DodKey_1.ActorType.Monster) {
                this._actor.state.runState(ActorStateFsm_1.ActorStateID.Walk);
            }
            else if (this._actor.type == DodKey_1.ActorType.Operator) {
                this._actor.state.runState(ActorStateFsm_1.ActorStateID.Fight);
            }
            else {
                throw new DOMException("Unacceptable Actor Type");
            }
        }
    };
    return ActorStateBorn;
}(ActorStateBase_1.default));
exports.ActorStateBorn = ActorStateBorn;
},{"../../../Common/DodKey":2,"../../../Fix/FixTime":14,"./ActorStateBase":31,"./ActorStateFsm":34}],33:[function(require,module,exports){
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
},{"./ActorStateBase":31}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DodLog_1 = require("../../../Common/DodLog");
var ActorStateWalk_1 = require("./ActorStateWalk");
var ActorStatePrepared_1 = require("./ActorStatePrepared");
var ActorStateFight_1 = require("./ActorStateFight");
var ActorStateBorn_1 = require("./ActorStateBorn");
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
        this._currentStateType = ActorStateID.None;
        this._currentState = null;
        this._states[ActorStateID.Walk] = new ActorStateWalk_1.ActorStateWalk(actor);
        this._states[ActorStateID.Prepared] = new ActorStatePrepared_1.ActorStatePrepared(actor);
        this._states[ActorStateID.Fight] = new ActorStateFight_1.ActorStateFight(actor);
        this._states[ActorStateID.Born] = new ActorStateBorn_1.ActorStateBorn(actor);
        //TODO
        //参照游戏大状态机
    }
    Object.defineProperty(ActorStateMgr.prototype, "currentStateType", {
        get: function () {
            return this._currentStateType;
        },
        enumerable: true,
        configurable: true
    });
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
        this._currentStateType = stateID;
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
},{"../../../Common/DodLog":3,"./ActorStateBorn":32,"./ActorStateFight":33,"./ActorStatePrepared":35,"./ActorStateWalk":36}],35:[function(require,module,exports){
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
},{"./ActorStateBase":31}],36:[function(require,module,exports){
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
},{"../../../Common/DodMath":4,"./ActorStateBase":31}],37:[function(require,module,exports){
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
        this._colliderMap = {};
    }
    ActorCollisionProcessor.prototype.registerCollider = function (collider) {
        this._colliderMap[collider.symbol.data] = collider;
    };
    ActorCollisionProcessor.prototype.unregisterCollider = function (collider) {
        delete this._colliderMap[collider.symbol.data];
    };
    ActorCollisionProcessor.prototype.update = function () {
        for (var i in this._colliderMap) {
            var targetCollider = this._colliderMap[i];
            var collidingList = [];
            for (var j in this._colliderMap) {
                var collider = this._colliderMap[j];
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
},{"../../Fix/FixSymbol":13}],38:[function(require,module,exports){
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
},{"../../Common/DodDataStructure":1,"../../Common/DodKey":2,"../../Common/DodMath":4,"../Actor/ActorModules/ColiMessage":22}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameLevel_1 = require("./GameLevel");
var ActorCollisionProcessor_1 = require("./Collision/ActorCollisionProcessor");
var GameLevel_2 = require("./GameLevel");
var DodResourceMgr_1 = require("../Resources/DodResourceMgr");
var ActorMgr_1 = require("./Actor/ActorMgr");
var ColiReporter_1 = require("./Collision/ColiReporter");
var GameUIEvent_1 = require("./GameUIEvent");
var GameBattle = /** @class */ (function () {
    function GameBattle() {
        this.mapNodeCPU = new ColiReporter_1.default(); //负责地图节点碰撞检测
        this.level = new GameLevel_2.default();
        this.map = new GameLevel_1.default();
        this.actorMgr = new ActorMgr_1.default();
        this.collision = new ActorCollisionProcessor_1.ActorCollisionProcessor();
        this.gameUIEvent = new GameUIEvent_1.default();
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
},{"../Resources/DodResourceMgr":51,"./Actor/ActorMgr":17,"./Collision/ActorCollisionProcessor":37,"./Collision/ColiReporter":38,"./GameLevel":41,"./GameUIEvent":42}],40:[function(require,module,exports){
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
},{}],41:[function(require,module,exports){
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
},{"../Fix/FixTime":14,"./GameBattleConst":40}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RhodesGame_1 = require("./RhodesGame");
var PerformanceCentre_1 = require("../Common/Graphics/Performance_Module/PerformanceCentre");
var DodMath_1 = require("../Common/DodMath");
var GameUIEvent = /** @class */ (function () {
    function GameUIEvent() {
        this._cancleList = []; //todo
        this._registerEvent();
    }
    GameUIEvent.prototype._registerEvent = function () {
        PerformanceCentre_1.default.instance.mainSpr.on(Laya.Event.DOUBLE_CLICK, this, function () {
            var pos = new DodMath_1.Vec2(2, 2); //实际上应该从鼠标上获取
            RhodesGame_1.default.Instance.battle.actorMgr.deployOprt(1, pos);
        });
        //TODO 
        //@阿葱 在这个类里注册所有战斗模块所需接收的UI事件
        //@example
        //eventcenter.on(eventcenter.gamepause, this, this._onGamePause);
    };
    /**
     * UI事件处理类基本完全通过事件与外界进行交互，没有进行帧循环的必要
     * 此处的update函数仅用于开发便利
     */
    GameUIEvent.prototype.update = function () {
    };
    return GameUIEvent;
}());
exports.default = GameUIEvent;
},{"../Common/DodMath":4,"../Common/Graphics/Performance_Module/PerformanceCentre":6,"./RhodesGame":43}],43:[function(require,module,exports){
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
},{"../Common/DodLog":3,"./GameBattle":39,"./State/GameStateMgr":49}],44:[function(require,module,exports){
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
},{}],45:[function(require,module,exports){
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
        this._battle.collision.update();
        this._battle.actorMgr.update();
        this._battle.map.update();
    };
    return GameStateBattle;
}(GameStateBase_1.default));
exports.default = GameStateBattle;
},{"./GameStateBase":44}],46:[function(require,module,exports){
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
},{"../../Common/DodLog":3,"../../Resources/DodResourceMgr":51,"../RhodesGame":43,"./GameStateBase":44,"./GameStateMgr":49}],47:[function(require,module,exports){
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
},{"../../Common/DodLog":3,"../../Resources/DodResourceMgr":51,"../RhodesGame":43,"./GameStateBase":44,"./GameStateMgr":49}],48:[function(require,module,exports){
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
},{"./GameStateBase":44}],49:[function(require,module,exports){
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
},{"../../Common/DodLog":3,"./GameStateBattle":45,"./GameStateGameload":46,"./GameStateLevelload":47,"./GameStateLobby":48}],50:[function(require,module,exports){
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
var FixSymbol_1 = require("./Fix/FixSymbol");
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
        var k = new /** @class */ (function () {
            function class_1() {
                this.symbol = new FixSymbol_1.MySymbol();
            }
            return class_1;
        }());
        PerformanceCentre_1.default.instance.displayActor(k, new DodMath_1.Vec2(50, 50), new DodMath_1.Vec2(50, 50));
        console.log(PerformanceCentre_1.default.instance);
        console.log(k);
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
},{"./Common/DodMath":4,"./Common/Graphics/Performance_Module/PerformanceCentre":6,"./Event/EventCentre":11,"./Fix/FixSymbol":13,"./Fix/FixTime":14,"./Game/RhodesGame":43,"./GameConfig":15,"./Resources/DodResourceMgr":51,"./SceneManager":52}],51:[function(require,module,exports){
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
},{}],52:[function(require,module,exports){
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
},{}],53:[function(require,module,exports){
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
},{"../ui/layaMaxUI":55}],54:[function(require,module,exports){
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
},{"../ui/layaMaxUI":55}],55:[function(require,module,exports){
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
},{}]},{},[50])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xheWEvTGF5YUFpcklERS9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQ29tbW9uL0RvZERhdGFTdHJ1Y3R1cmUudHMiLCJzcmMvQ29tbW9uL0RvZEtleS50cyIsInNyYy9Db21tb24vRG9kTG9nLnRzIiwic3JjL0NvbW1vbi9Eb2RNYXRoLnRzIiwic3JjL0NvbW1vbi9HcmFwaGljcy9QZXJmb3JtYW5jZV9Nb2R1bGUvQWN0b3JDb21wb25lbnQudHMiLCJzcmMvQ29tbW9uL0dyYXBoaWNzL1BlcmZvcm1hbmNlX01vZHVsZS9QZXJmb3JtYW5jZUNlbnRyZS50cyIsInNyYy9Db21tb24vR3JhcGhpY3MvUGVyZm9ybWFuY2VfTW9kdWxlL1N5bWJvbGl6ZWRSZW5kZXIudHMiLCJzcmMvQ29tbW9uL0dyYXBoaWNzL1BlcmZvcm1hbmNlX01vZHVsZS9VbnN5bWJvbGl6ZWRSZW5kZXIudHMiLCJzcmMvQ29tbW9uL0dyYXBoaWNzL1BlcmZvcm1hbmNlX01vZHVsZS9jdXN0b21pemVkU3ByLnRzIiwic3JjL0NvbW1vbi9HcmFwaGljcy9QZXJmb3JtYW5jZV9Nb2R1bGUvb2JqYm94LnRzIiwic3JjL0V2ZW50L0V2ZW50Q2VudHJlLnRzIiwic3JjL0ZpeC9GaXhSZWN0LnRzIiwic3JjL0ZpeC9GaXhTeW1ib2wudHMiLCJzcmMvRml4L0ZpeFRpbWUudHMiLCJzcmMvR2FtZUNvbmZpZy50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yLnRzIiwic3JjL0dhbWUvQWN0b3IvQWN0b3JNZ3IudHMiLCJzcmMvR2FtZS9BY3Rvci9BY3Rvck1vZHVsZXMvQWN0b3JCdWZmTWdyLnRzIiwic3JjL0dhbWUvQWN0b3IvQWN0b3JNb2R1bGVzL0FjdG9yQ29zdC50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yTW9kdWxlcy9BY3RvclNraWxsLnRzIiwic3JjL0dhbWUvQWN0b3IvQWN0b3JNb2R1bGVzL0FuaW1hdGlvbi50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yTW9kdWxlcy9Db2xpTWVzc2FnZS50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yTW9kdWxlcy9EYW1hZ2UudHMiLCJzcmMvR2FtZS9BY3Rvci9BY3Rvck1vZHVsZXMvUHJvZmlsZS50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yTW9kdWxlcy9UcmFuc2Zvcm0udHMiLCJzcmMvR2FtZS9BY3Rvci9BY3Rvck1vZHVsZXMvVW5pdFJlbmRlci50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yUm91dGUudHMiLCJzcmMvR2FtZS9BY3Rvci9BdHRhY2svQXRrQWJzdC50cyIsInNyYy9HYW1lL0FjdG9yL0F0dGFjay9CbG9ja2VyLnRzIiwic3JjL0dhbWUvQWN0b3IvQXR0YWNrL01hcE5vZGVTZWVrZXIudHMiLCJzcmMvR2FtZS9BY3Rvci9TdGF0ZS9BY3RvclN0YXRlQmFzZS50cyIsInNyYy9HYW1lL0FjdG9yL1N0YXRlL0FjdG9yU3RhdGVCb3JuLnRzIiwic3JjL0dhbWUvQWN0b3IvU3RhdGUvQWN0b3JTdGF0ZUZpZ2h0LnRzIiwic3JjL0dhbWUvQWN0b3IvU3RhdGUvQWN0b3JTdGF0ZUZzbS50cyIsInNyYy9HYW1lL0FjdG9yL1N0YXRlL0FjdG9yU3RhdGVQcmVwYXJlZC50cyIsInNyYy9HYW1lL0FjdG9yL1N0YXRlL0FjdG9yU3RhdGVXYWxrLnRzIiwic3JjL0dhbWUvQ29sbGlzaW9uL0FjdG9yQ29sbGlzaW9uUHJvY2Vzc29yLnRzIiwic3JjL0dhbWUvQ29sbGlzaW9uL0NvbGlSZXBvcnRlci50cyIsInNyYy9HYW1lL0dhbWVCYXR0bGUudHMiLCJzcmMvR2FtZS9HYW1lQmF0dGxlQ29uc3QudHMiLCJzcmMvR2FtZS9HYW1lTGV2ZWwudHMiLCJzcmMvR2FtZS9HYW1lVUlFdmVudC50cyIsInNyYy9HYW1lL1Job2Rlc0dhbWUudHMiLCJzcmMvR2FtZS9TdGF0ZS9HYW1lU3RhdGVCYXNlLnRzIiwic3JjL0dhbWUvU3RhdGUvR2FtZVN0YXRlQmF0dGxlLnRzIiwic3JjL0dhbWUvU3RhdGUvR2FtZVN0YXRlR2FtZWxvYWQudHMiLCJzcmMvR2FtZS9TdGF0ZS9HYW1lU3RhdGVMZXZlbGxvYWQudHMiLCJzcmMvR2FtZS9TdGF0ZS9HYW1lU3RhdGVMb2JieS50cyIsInNyYy9HYW1lL1N0YXRlL0dhbWVTdGF0ZU1nci50cyIsInNyYy9NYWluLnRzIiwic3JjL1Jlc291cmNlcy9Eb2RSZXNvdXJjZU1nci50cyIsInNyYy9TY2VuZU1hbmFnZXIudHMiLCJzcmMvU2NlbmVTY3JpcHQvR2FtZS50cyIsInNyYy9TY2VuZVNjcmlwdC9Mb2FkaW5nLnRzIiwic3JjL3VpL2xheWFNYXhVSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNOQTtJQUFBO1FBQ1ksVUFBSyxHQUFPLEVBQUUsQ0FBQztJQWEzQixDQUFDO0lBWlUscUJBQUksR0FBWCxVQUFZLEdBQVUsRUFBRSxLQUFPO1FBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO0lBQzVCLENBQUM7SUFDTSxxQkFBSSxHQUFYLFVBQVksR0FBVTtRQUNsQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVNLHdCQUFPLEdBQWQsVUFBZSxDQUFzQjtRQUNqQyxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDdEIsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBQ0wsYUFBQztBQUFELENBZEEsQUFjQyxJQUFBO0FBZFksd0JBQU07QUFpQm5CO0lBR0ksY0FBWSxJQUFNLEVBQUUsSUFBWTtRQUM1QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixD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Q0FBQztRQUN2QixvQ0FBYyxHQUFkO1lBQ0ksaUJBQU0sY0FBYyxXQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBQ0wsa0JBQUM7SUFBRCxDQVJBLEFBUUMsQ0FSZ0MsS0FBSyxHQVFyQztJQVJZLGNBQVcsY0FRdkIsQ0FBQTtJQUNELEdBQUcsQ0FBQyxnQkFBZ0IsRUFBQyxXQUFXLENBQUMsQ0FBQztJQUNsQztRQUFvQyxrQ0FBSztRQUNyQzttQkFBZSxpQkFBTztRQUFBLENBQUM7UUFDdkIsdUNBQWMsR0FBZDtZQUNJLGlCQUFNLGNBQWMsV0FBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUNMLHFCQUFDO0lBQUQsQ0FOQSxBQU1DLENBTm1DLEtBQUssR0FNeEM7SUFOWSxpQkFBYyxpQkFNMUIsQ0FBQTtJQUNELEdBQUcsQ0FBQyxtQkFBbUIsRUFBQyxjQUFjLENBQUMsQ0FBQztBQUM1QyxDQUFDLEVBbkJhLEVBQUUsR0FBRixVQUFFLEtBQUYsVUFBRSxRQW1CZiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgeyBDb21wYXJhYmxlIH0gZnJvbSBcIi4vRG9kTWF0aFwiO1xyXG5cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgS1ZQYWlyPFY+e1xyXG4gICAgcHJpdmF0ZSBfbGlzdDphbnkgPSB7fTtcclxuICAgIHB1YmxpYyBlZGl0KGtleTpzdHJpbmcsIHZhbHVlOlYpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fbGlzdFtrZXldID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmVhZChrZXk6c3RyaW5nKTpWe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9saXN0W2tleV07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBpdGVyYXRlKGY6KGs6c3RyaW5nLHY6Vik9PnZvaWQpOnZvaWR7XHJcbiAgICAgICAgZm9yIChsZXQgayBpbiB0aGlzLl9saXN0KSB7XHJcbiAgICAgICAgICAgIGYoaywgdGhpcy5fbGlzdFtrXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuY2xhc3MgTm9kZTxFPntcclxuICAgIHB1YmxpYyBpdGVtOkU7XHJcbiAgICBwdWJsaWMgbmV4dDpOb2RlPEU+O1xyXG4gICAgY29uc3RydWN0b3IoaXRlbTpFLCBuZXh0Ok5vZGU8RT4pe1xyXG4gICAgICAgIHRoaXMuaXRlbSA9IGl0ZW07XHJcbiAgICAgICAgdGhpcy5uZXh0ID0gbmV4dDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIExpbmtMaXN0PEU+e1xyXG4gICAgcHJpdmF0ZSBfaGVhZDpOb2RlPEU+O1xyXG4gICAgcHJpdmF0ZSBfdGFpbDpOb2RlPEU+O1xyXG4gICAgcHJpdmF0ZSBfbGVuZ3RoOm51bWJlciA9IDA7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuX2hlYWQgPSBuZXcgTm9kZTxFPihudWxsLCBudWxsKTtcclxuICAgICAgICB0aGlzLl90YWlsID0gbmV3IE5vZGU8RT4obnVsbCwgbnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ln7rnoYDlsZ7mgKdcclxuICAgIHB1YmxpYyBnZXQgbGVuZ3RoKCk6bnVtYmVye1xyXG4gICAgICAgIC8vIGxldCByZXN1bHQ6bnVtYmVyID0gMDtcclxuICAgICAgICAvLyBsZXQgY3VycmVudDpOb2RlPEU+ID0gdGhpcy5faGVhZDtcclxuICAgICAgICAvLyB3aGlsZSAoY3VycmVudC5uZXh0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgLy8gICAgIHJlc3VsdCArPSAxO1xyXG4gICAgICAgIC8vICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpc0VtcHR5KCk6Ym9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5faGVhZC5uZXh0ID09PSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5aKe5Yig5pS55p+lXHJcbiAgICAvL+WinlxyXG4gICAgcHVibGljIHB1c2goaXRlbTpFKTp2b2lke1xyXG4gICAgICAgIGxldCBsYXN0Ok5vZGU8RT4gPSBuZXcgTm9kZTxFPihpdGVtLCBudWxsKTtcclxuICAgICAgICBpZiAodGhpcy5pc0VtcHR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2hlYWQubmV4dCA9IGxhc3Q7XHJcbiAgICAgICAgICAgIHRoaXMuX3RhaWwubmV4dCA9IGxhc3Q7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0Lm5leHQgPSBsYXN0O1xyXG4gICAgICAgICAgICB0aGlzLl90YWlsLm5leHQgPSBsYXN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9sZW5ndGggKz0gMTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdW5zaGlmdChpdGVtOkUpOnZvaWR7XHJcbiAgICAgICAgbGV0IGZpcnN0Ok5vZGU8RT4gPSBuZXcgTm9kZTxFPihpdGVtLCBudWxsKTtcclxuICAgICAgICBpZiAodGhpcy5pc0VtcHR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RhaWwubmV4dCA9IGZpcnN0O1xyXG4gICAgICAgICAgICB0aGlzLl9oZWFkLm5leHQgPSBmaXJzdDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmaXJzdC5uZXh0ID0gdGhpcy5faGVhZC5uZXh0O1xyXG4gICAgICAgICAgICB0aGlzLl9oZWFkLm5leHQgPSBmaXJzdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbGVuZ3RoICs9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluc2VydChpbmRleDpudW1iZXIsIGl0ZW06RSk6Ym9vbGVhbntcclxuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID4gdGhpcy5fbGVuZ3RoKSB7Ly/ov5nlj6XkuI3kuIDmoLdcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGluZGV4ID09PSB0aGlzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGN1cnJlbnQ6Tm9kZTxFPiA9IHRoaXMuX2hlYWQ7Ly/ov5nlj6Xlkozlhbbku5bpgY3ljobmmK/kuI3kuIDmoLfnmoTvvIzlm6DkuLropoHpgInlj5bliLDpgInlrprkvY3nva7nmoTliY3pnaLkuIDmoLxcclxuICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IGluZGV4OyBuICs9IDEpIHtcclxuICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGN1cnJlbnQubmV4dCA9IG5ldyBOb2RlPEU+KGl0ZW0sIGN1cnJlbnQubmV4dCk7XHJcbiAgICAgICAgdGhpcy5fbGVuZ3RoICs9IDE7XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5YigXHJcbiAgICBwdWJsaWMgcmVtb3ZlKGluZGV4Om51bWJlcik6RXtcclxuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGN1cnJlbnQ6Tm9kZTxFPiA9IHRoaXMuX2hlYWQubmV4dDtcclxuICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IGluZGV4OyBuICs9IDEpIHtcclxuICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBpdGVtOkUgPSBjdXJyZW50Lml0ZW07XHJcbiAgICAgICAgY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fbGVuZ3RoIC09IDE7XHJcblxyXG4gICAgICAgIHJldHVybiBjdXJyZW50Lml0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNoaWZ0KCk6RXtcclxuICAgICAgICBpZiAodGhpcy5pc0VtcHR5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLl9oZWFkLm5leHQuaXRlbTtcclxuICAgICAgICB0aGlzLl9oZWFkLm5leHQgPSB0aGlzLl9oZWFkLm5leHQubmV4dDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbXB0eSkge1xyXG4gICAgICAgICAgICB0aGlzLl90YWlsLm5leHQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fbGVuZ3RoIC09IDE7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgLy/mlLlcclxuICAgIHB1YmxpYyB3cml0ZShpbmRleDpudW1iZXIsIGl0ZW06RSk6dm9pZHtcclxuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjdXJyZW50Ok5vZGU8RT4gPSB0aGlzLl9oZWFkLm5leHQ7XHJcbiAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBpbmRleDsgbiArPSAxKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjdXJyZW50Lml0ZW0gPSBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5p+lXHJcbiAgICBwdWJsaWMgcmVhZChpbmRleDpudW1iZXIpOkV7XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY3VycmVudDpOb2RlPEU+ID0gdGhpcy5faGVhZC5uZXh0O1xyXG4gICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgaW5kZXg7IG4gKz0gMSkge1xyXG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQuaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VhcmNoKGl0ZW06RSk6bnVtYmVyW117XHJcbiAgICAgICAgbGV0IHJlc3VsdDpudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgIHRoaXMuZm9yZWFjaCgoZWxlOkUsIGluZGV4Om51bWJlcik9PntcclxuICAgICAgICAgICAgaWYgKGVsZSA9PT0gaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goaW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWremTvuihqOS4reaYr+WQpuWtmOWcqOafkOS4gOWFg+e0oFxyXG4gICAgICogQHBhcmFtIGl0ZW0gXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoYXMoaXRlbTogRSk6Ym9vbGVhbntcclxuXHJcbiAgICAgICAgbGV0IGN1cnJlbnQgPSB0aGlzLl9oZWFkLm5leHQ7XHJcbiAgICAgICAgd2hpbGUgKGN1cnJlbnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudC5pdGVtID09IGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy/pq5jpmLblh73mlbBcclxuICAgIHB1YmxpYyBmb3JlYWNoKGY6KGVsZTpFLCBpbmRleDpudW1iZXIsIGxpc3Q6TGlua0xpc3Q8RT4pPT52b2lkKTp2b2lke1xyXG4gICAgICAgIGxldCBjdXJyZW50ID0gdGhpcy5faGVhZC5uZXh0O1xyXG4gICAgICAgIGxldCBudW06bnVtYmVyID0gMDtcclxuICAgICAgICB3aGlsZSAoY3VycmVudCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBmKGN1cnJlbnQuaXRlbSwgbnVtLCB0aGlzKTtcclxuICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcclxuICAgICAgICAgICAgbnVtICs9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K+35pqC5pe25LiN6KaB5L2/55So6L+Z5Liq5Ye95pWw77yM5Zug5Li65oiR5Lmf5LiN55+l6YGT5a6D5Lya5LiN5Lya54iG54K4XHJcbiAgICAgKiDpmaTpnZ7kvaDor7vov4fov5nkuKrlh73mlbDnmoTmupDku6PnoIFcclxuICAgICAqIEBwYXJhbSBmIOWIpOaWreWFg+e0oOS8mOWFiOe6p+eahOWbnuiwg+WHveaVsFxyXG4gICAgICogQHBhcmFtIGluY3JlYXNlIOaYr+WQpuWNh+W6j++8jOm7mOiupOWNh+W6j1xyXG4gICAgICogQHJldHVybnMg6L+U5Zue5LiA5Liq5o6S5bqP55qE6ZO+6KGoXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzb3J0YnkoZjooZWxlOkUpPT5udW1iZXIsIGluY3JlYXNlOmJvb2xlYW4gPSB0cnVlKTpMaW5rTGlzdDxFPntcclxuICAgICAgICBsZXQgcHJpb3JpdHk6TGlua0xpc3Q8bnVtYmVyPiA9IG5ldyBMaW5rTGlzdDxudW1iZXI+KCk7XHJcbiAgICAgICAgbGV0IHNvcnRlZDpMaW5rTGlzdDxFPiA9IG5ldyBMaW5rTGlzdDxFPigpO1xyXG4gICAgICAgIHByaW9yaXR5LnB1c2goLTApO1xyXG4gICAgICAgIHNvcnRlZC5wdXNoKG51bGwpO1xyXG5cclxuICAgICAgICBsZXQgY29tcGFyZTooYTpudW1iZXIsYjpudW1iZXIpPT5ib29sZWFuID0gaW5jcmVhc2U/KGEsYik9PntyZXR1cm4gYSA8IGI7fTooYSxiKT0+e3JldHVybiBhID4gYn07XHJcblxyXG4gICAgICAgIHRoaXMuZm9yZWFjaCgoZWxlKT0+e1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFByaSA9IGYoZWxlKTtcclxuICAgICAgICAgICAgbGV0IG5vZGU6Tm9kZTxFPiA9IHNvcnRlZC5faGVhZC5uZXh0O1xyXG4gICAgICAgICAgICBsZXQgcHJpTm9kZTpOb2RlPG51bWJlcj4gPSBwcmlvcml0eS5faGVhZC5uZXh0O1xyXG5cclxuICAgICAgICAgICAgbGV0IGZvdW5kUGxhY2U6Ym9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB3aGlsZSAobm9kZS5uZXh0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoY3VycmVudFByaSA8IHByaU5vZGUubmV4dC5pdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcGFyZShjdXJyZW50UHJpLCBwcmlOb2RlLm5leHQuaXRlbSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLm5leHQgPSBuZXcgTm9kZTxFPihlbGUsIG5vZGUubmV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJpTm9kZS5uZXh0ID0gbmV3IE5vZGU8bnVtYmVyPihjdXJyZW50UHJpLCBwcmlOb2RlLm5leHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvdW5kUGxhY2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlLm5leHQ7XHJcbiAgICAgICAgICAgICAgICBwcmlOb2RlID0gcHJpTm9kZS5uZXh0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIWZvdW5kUGxhY2UpIHtcclxuICAgICAgICAgICAgICAgIHNvcnRlZC5wdXNoKGVsZSk7XHJcbiAgICAgICAgICAgICAgICBwcmlvcml0eS5wdXNoKGN1cnJlbnRQcmkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNvcnRlZC5zaGlmdCgpO1xyXG4gICAgICAgIHJldHVybiBzb3J0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcHVibGljIGJiU29ydEJ5KGY6KGVsZTpFKT0+bnVtYmVyLCBpbmNyZWFzZTpib29sZWFuID0gdHJ1ZSk6TGlua0xpc3Q8RT57XHJcblxyXG4gICAgLy8gfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBBcnJheTxFPntcclxuICAgIHB1YmxpYyBhcnI6RVtdO1xyXG4gICAgcHVibGljIHBvaW50ZXI6bnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNvdXJjZTpFW10gPSBbXSwgaW5pdFBvaW50Om51bWJlciA9IC0xKXtcclxuICAgICAgICB0aGlzLmFyciA9IHNvdXJjZTtcclxuICAgICAgICB0aGlzLnBvaW50ZXIgPSBpbml0UG9pbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlYWQoKTpFe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFyclt0aGlzLnBvaW50ZXJdO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgc3RlcCgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5wb2ludGVyICs9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBvdXQoKTpib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvaW50ZXIgPCAwIHx8IHRoaXMucG9pbnRlciA+PSB0aGlzLmFyci5sZW5ndGg7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEFycmF5QWxnb3tcclxuXHJcbiAgICAvKipcclxuICAgICAqIOi+k+WFpeeahOS4pOS4quaVsOe7hOeahOavj+S4qmluZGV45a+55bqU5YWD57Sg5piv5ZCm55u4562JXHJcbiAgICAgKiBAcGFyYW0gYXJyMCBcclxuICAgICAqIEBwYXJhbSBhcnIxIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHN0cmljdENvbXBhcmUoYXJyMDpDb21wYXJhYmxlW10sIGFycjE6Q29tcGFyYWJsZVtdKTpib29sZWFue1xyXG4gICAgICAgIGlmIChhcnIwLmxlbmd0aCAhPT0gYXJyMS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycjAubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICAgICAgaWYgKCFhcnIwW2ldLmVxdWFscyhhcnIxW2ldKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuS4gOS4qumbhuWQiGPvvIzkuJTkvb/lvpflroPlhbfmnInlpoLkuIvmgKfotKjvvJpcclxuICAgICAqIOWvueS6juavj+S4quWtmOWcqOS6jumbhuWQiGHkuK3nmoTlhYPntKDvvIzlpoLmnpzlroPkuI3lnKjpm4blkIhi5Lit77yM5YiZ5a6D5Zyo6ZuG5ZCIY+S4rVxyXG4gICAgICog5Y2zYz1hLWJcclxuICAgICAqIEBwYXJhbSBhIFxyXG4gICAgICogQHBhcmFtIGIgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZmluZENvbXBsZW1lbnRTZXQoYTpDb21wYXJhYmxlW10sIGI6Q29tcGFyYWJsZVtdKTpDb21wYXJhYmxlW117XHJcbiAgICAgICAgbGV0IHJlc3VsdDpDb21wYXJhYmxlW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBlbGUgb2YgYSkge1xyXG4gICAgICAgICAgICBpZiAoQXJyYXlBbGdvLmZpbmRFbGUoZWxlLCBiKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGVsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8v5rGC55u45a+56KGl6ZuGYS1iXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuS4gOS4qumbhuWQiGPvvIzkuJTkvb/lvpflroPlhbfmnInlpoLkuIvmgKfotKjvvJpcclxuICAgICAqIOWvueS6juavj+S4quWtmOWcqOS6jumbhuWQiGHkuK3nmoTlhYPntKDvvIzlpoLmnpzlroPkuI3lnKjpm4blkIhi5Lit77yM5YiZ5a6D5Zyo6ZuG5ZCIY+S4rVxyXG4gICAgICog5Y2zYz1hLWJcclxuICAgICAqIFxyXG4gICAgICog5rOo5oSP77ya55uu5YmN5aaC5p6cYeS4reWtmOWcqOS4pOS4quWFg+e0oEvvvIxi5Lit5a2Y5Zyo5LiA5Liq5YWD57SgS++8jOe7k+aenOS4reeahGPkuI3kvJrlrZjlnKjlhYPntKBLXHJcbiAgICAgKiDlj6ropoFi5Lit5a2Y5Zyo5LiA5Liq5bCx5Lya5oqKYemHjOeahOWFqOmDqOWHj+aOiVxyXG4gICAgICogQHBhcmFtIGEgXHJcbiAgICAgKiBAcGFyYW0gYiBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBmaW5kQ29tcFNldChhOmFueVtdLCBiOmFueVtdKTphbnlbXSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdDpDb21wYXJhYmxlW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBlbGUgb2YgYSkge1xyXG4gICAgICAgICAgICBpZiAoYi5pbmRleE9mKGEpID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZWxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy/msYLnm7jlr7nooaXpm4ZhLWJcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZmluZEludGVyc2VjdGlvblNldChhOkNvbXBhcmFibGVbXSwgYjpDb21wYXJhYmxlW10pe1xyXG4gICAgICAgIC8v5rGC5Lqk6ZuGYeKIqWJcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi+k+WFpeS4gOS4quaVsOe7hO+8jOi/lOWbnuWwhumHjeWkjeWFg+e0oOWIoOmZpOWQjueahOaWsOaVsOe7hFxyXG4gICAgICog5LiN5pS55Yqo5Y6f5pWw57uEXHJcbiAgICAgKiDlpJrkuKrlhYPntKDku4Xlj5bpppbkuKpcclxuICAgICAqIEBwYXJhbSBsaXN0IFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHNocmluayhsaXN0OmFueVtdKTphbnlbXXtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gW107XHJcblxyXG4gICAgICAgIGxpc3QuZm9yRWFjaChlbGU9PntcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5pbmRleE9mKGVsZSkgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGVsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaxgmVsZeWcqGFycuS4reeahGluZGV477yM6Iul5pyq5om+5Yiw5YiZ6L+U5ZueLTFcclxuICAgICAqIGVsZeW/hemhu+WunueOsGNvbXBhcmFibGXmjqXlj6NcclxuICAgICAqIEBwYXJhbSBlbGUgXHJcbiAgICAgKiBAcGFyYW0gYXJyIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGZpbmRFbGUoZWxlOkNvbXBhcmFibGUsIGFycjpDb21wYXJhYmxlW10pOm51bWJlcntcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICBpZiAoZWxlLmVxdWFscyhhcnJbaV0pKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDku45hcnLkuK3np7vpmaRlbGVcclxuICAgICAqIOWmguaenGVsZeS4jeWtmOWcqOWImeS7gOS5iOmDveS4jeWBmlxyXG4gICAgICogQHBhcmFtIGVsZSBcclxuICAgICAqIEBwYXJhbSBhcnIgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVtb3ZlRWxlKGVsZTphbnksIGFycjphbnlbXSk6YW55W117XHJcbiAgICAgICAgY29uc3QgaSA9IGFyci5pbmRleE9mKGVsZSk7XHJcbiAgICAgICAgaWYgKGkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIGFyci5zcGxpY2UoaSwxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycjtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuLy8gZXhwb3J0IGNsYXNzIEJveCBleHRlbmRzIExheWEuUmVjdGFuZ2xle1xyXG5cclxuLy8gICAgIHB1YmxpYyB1bml0WDpudW1iZXI7XHJcbi8vICAgICBwdWJsaWMgdW5pdFk6bnVtYmVyO1xyXG4gICAgXHJcblxyXG4vLyAgICAgY29uc3RydWN0b3IoKXtcclxuLy8gICAgICAgICBzdXBlcigwLDAsMCwwKTtcclxuLy8gICAgIH1cclxuICAgXHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiDlsLHmmK/igKbigKbmnaXkuIDnu4TvvIgxMDDkuKrvvInpmo/mnLrnmoTnorDmkp7nrrFcclxuLy8gICAgICAqIEBwYXJhbSB4UmFuZ2UgXHJcbi8vICAgICAgKiBAcGFyYW0geVJhbmdlIFxyXG4vLyAgICAgICogQHBhcmFtIHdpZFJhbmdlIFxyXG4vLyAgICAgICogQHBhcmFtIGhpZ1JhbmdlXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHB1YmxpYyBzdGF0aWMgcmFuZG9tQm94ZXMoeFJhbmdlOm51bWJlciA9IDEyMDAsIHlSYW5nZTpudW1iZXIgPSA4MDAsIHdpZFJhbmdlOm51bWJlciA9IDMwMCwgaGlnUmFuZ2U6bnVtYmVyID0gMzAwKTpCb3hbXXtcclxuLy8gICAgICAgICBjb25zdCByYWQ6RnVuY3Rpb24gPSBNeU1hdGgucmFuZG9tSW50O1xyXG4vLyAgICAgICAgIGxldCByZXN1bHQ6Qm94W10gPSBbXTtcclxuLy8gICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgNTA7IGkgKz0gMSkge1xyXG4vLyAgICAgICAgICAgICByZXN1bHQucHVzaChuZXcgQm94KCkpO1xyXG4vLyAgICAgICAgICAgICByZXN1bHRbaV0ucG9zKHJhZCh4UmFuZ2UpLCByYWQoeVJhbmdlKSkuc2l6ZShyYWQod2lkUmFuZ2UpLCByYWQoaGlnUmFuZ2UpKTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBwdWJsaWMgcG9zKHg6bnVtYmVyLCB5Om51bWJlcik6Qm94e1xyXG4vLyAgICAgICAgIHRoaXMueCA9IHg7XHJcbi8vICAgICAgICAgdGhpcy55ID0geTtcclxuLy8gICAgICAgICByZXR1cm4gdGhpcztcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBwdWJsaWMgc2l6ZSh3aWR0aDpudW1iZXIsIGhlaWdodDpudW1iZXIpOkJveHtcclxuLy8gICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbi8vICAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbi8vICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgcHVibGljIGludGVyc2VjdHNfWChyZWM6Qm94KTpib29sZWFue1xyXG4vLyAgICAgICAgIGlmICh0aGlzLnggPCByZWMueCkge1xyXG4vLyAgICAgICAgICAgICByZXR1cm4gcmVjLmludGVyc2VjdHNfWCh0aGlzKTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcmV0dXJuICAodGhpcy54ID49IHJlYy54ICYmIHRoaXMueCA8PSByZWMucmlnaHQpIHx8XHJcbi8vICAgICAgICAgICAgICAgICAodGhpcy5yaWdodCA+PSByZWMueCAmJiB0aGlzLnJpZ2h0IDw9IHJlYy5yaWdodClcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBwdWJsaWMgaW50ZXJzZWN0c19ZKHJlYzpCb3gpOmJvb2xlYW57XHJcbi8vICAgICAgICAgaWYgKHRoaXMueTxyZWMueSkge1xyXG4vLyAgICAgICAgICAgICByZXR1cm4gcmVjLmludGVyc2VjdHNfWSh0aGlzKTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcmV0dXJuICAodGhpcy55ID49IHJlYy55ICYmIHRoaXMueSA8PSByZWMuYm90dG9tKSB8fFxyXG4vLyAgICAgICAgICAgICAgICAgKHRoaXMuYm90dG9tID49IHJlYy55ICYmIHRoaXMuYm90dG9tIDw9IHJlYy5ib3R0b20pXHJcbi8vICAgICB9XHJcbi8vIH1cclxuICAgIFxyXG4vLyBjbGFzcyBNYXBOb2RlPEssVj57XHJcbi8vICAgICBwdWJsaWMga2V5O1xyXG4vLyAgICAgcHVibGljIHZhbHVlO1xyXG4vLyAgICAgY29uc3RydWN0b3Ioa2V5OkssIHZhbHVlOlYpe1xyXG4vLyAgICAgICAgIHRoaXMua2V5ID0ga2V5O1xyXG4vLyAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuLy8gICAgIH1cclxuLy8gfVxyXG5cclxuLy8gZXhwb3J0IG1vZHVsZSBTdHJ1Y3tcclxuLy8gICAgIGV4cG9ydCBjbGFzcyBMaW5rTGlzdDxFPntcclxuLy8gICAgICAgICBwcml2YXRlIF9oZWFkOk5vZGU8RT47XHJcbi8vICAgICAgICAgcHJpdmF0ZSBfdGFpbDpOb2RlPEU+O1xyXG4vLyAgICAgICAgIGNvbnN0cnVjdG9yKCl7XHJcbi8vICAgICAgICAgICAgIHRoaXMuX2hlYWQgPSBuZXcgTm9kZTxFPihudWxsLCBudWxsKTtcclxuLy8gICAgICAgICAgICAgdGhpcy5fdGFpbCA9IG5ldyBOb2RlPEU+KG51bGwsIG51bGwpO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgLy/ln7rnoYDlsZ7mgKdcclxuLy8gICAgICAgICBwdWJsaWMgZ2V0IGxlbmd0aCgpOm51bWJlcntcclxuLy8gICAgICAgICAgICAgbGV0IHJlc3VsdDpudW1iZXIgPSAwO1xyXG4vLyAgICAgICAgICAgICBsZXQgY3VycmVudDpOb2RlPEU+ID0gdGhpcy5faGVhZDtcclxuLy8gICAgICAgICAgICAgd2hpbGUgKGN1cnJlbnQubmV4dCAhPT0gbnVsbCkge1xyXG4vLyAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IDE7XHJcbi8vICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBwdWJsaWMgZ2V0IGlzRW1wdHkoKTpib29sZWFue1xyXG4vLyAgICAgICAgICAgICByZXR1cm4gdGhpcy5faGVhZC5uZXh0ID09PSBudWxsO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgLy/lop7liKDmlLnmn6VcclxuLy8gICAgICAgICAvL+WinlxyXG4vLyAgICAgICAgIHB1YmxpYyBwdXNoKGl0ZW06RSk6dm9pZHtcclxuLy8gICAgICAgICAgICAgbGV0IGxhc3Q6Tm9kZTxFPiA9IG5ldyBOb2RlPEU+KGl0ZW0sIG51bGwpO1xyXG4vLyAgICAgICAgICAgICBpZiAodGhpcy5pc0VtcHR5KSB7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLl9oZWFkLm5leHQgPSBsYXN0O1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0ID0gbGFzdDtcclxuLy8gICAgICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuX3RhaWwubmV4dC5uZXh0ID0gbGFzdDtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuX3RhaWwubmV4dCA9IGxhc3Q7XHJcbi8vICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBwdWJsaWMgdW5zaGlmdChpdGVtOkUpOnZvaWR7XHJcbi8vICAgICAgICAgICAgIGxldCBmaXJzdDpOb2RlPEU+ID0gbmV3IE5vZGU8RT4oaXRlbSwgbnVsbCk7XHJcbi8vICAgICAgICAgICAgIGlmICh0aGlzLmlzRW1wdHkpIHtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuX3RhaWwubmV4dCA9IGZpcnN0O1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5faGVhZC5uZXh0ID0gZmlyc3Q7XHJcbi8vICAgICAgICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgICBmaXJzdC5uZXh0ID0gdGhpcy5faGVhZC5uZXh0Lm5leHQ7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLl9oZWFkLm5leHQgPSBmaXJzdDtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgcHVibGljIGluc2VydChpbmRleDpudW1iZXIsIGl0ZW06RSk6Ym9vbGVhbntcclxuLy8gICAgICAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+IHRoaXMubGVuZ3RoKSB7Ly/ov5nlj6XkuI3kuIDmoLdcclxuLy8gICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgaWYgKGluZGV4ID09PSB0aGlzLmxlbmd0aCkge1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5wdXNoKGl0ZW0pO1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIGxldCBjdXJyZW50Ok5vZGU8RT4gPSB0aGlzLl9oZWFkOy8v6L+Z5Y+l5ZKM5YW25LuW6YGN5Y6G5piv5LiN5LiA5qC355qE77yM5Zug5Li66KaB6YCJ5Y+W5Yiw6YCJ5a6a5L2N572u55qE5YmN6Z2i5LiA5qC8XHJcbi8vICAgICAgICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgaW5kZXg7IG4gKz0gMSkge1xyXG4vLyAgICAgICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgY3VycmVudC5uZXh0ID0gbmV3IE5vZGU8RT4oaXRlbSwgY3VycmVudC5uZXh0KTtcclxuXHJcbi8vICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgLy/liKBcclxuLy8gICAgICAgICBwdWJsaWMgcmVtb3ZlKGluZGV4Om51bWJlcik6RXtcclxuLy8gICAgICAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLmxlbmd0aCkge1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIGxldCBjdXJyZW50Ok5vZGU8RT4gPSB0aGlzLl9oZWFkLm5leHQ7XHJcbi8vICAgICAgICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgaW5kZXg7IG4gKz0gMSkge1xyXG4vLyAgICAgICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IGl0ZW06RSA9IGN1cnJlbnQuaXRlbTtcclxuLy8gICAgICAgICAgICAgY3VycmVudCA9IG51bGw7XHJcblxyXG4vLyAgICAgICAgICAgICByZXR1cm4gY3VycmVudC5pdGVtO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgcHVibGljIHNoaWZ0KCk6RXtcclxuLy8gICAgICAgICAgICAgaWYgKHRoaXMuaXNFbXB0eSkge1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5faGVhZC5uZXh0Lml0ZW07XHJcbi8vICAgICAgICAgICAgIHRoaXMuX2hlYWQubmV4dCA9IHRoaXMuX2hlYWQubmV4dC5uZXh0O1xyXG4vLyAgICAgICAgICAgICBpZiAodGhpcy5pc0VtcHR5KSB7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLl90YWlsLm5leHQgPSBudWxsO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgLy/mlLlcclxuLy8gICAgICAgICBwdWJsaWMgd3JpdGUoaW5kZXg6bnVtYmVyLCBpdGVtOkUpOnZvaWR7XHJcbi8vICAgICAgICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5sZW5ndGgpIHtcclxuLy8gICAgICAgICAgICAgICAgIHJldHVybjtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IGN1cnJlbnQ6Tm9kZTxFPiA9IHRoaXMuX2hlYWQubmV4dDtcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBpbmRleDsgbiArPSAxKSB7XHJcbi8vICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBjdXJyZW50Lml0ZW0gPSBpdGVtO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgLy/mn6VcclxuLy8gICAgICAgICBwdWJsaWMgcmVhZChpbmRleDpudW1iZXIpOkV7XHJcbi8vICAgICAgICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5sZW5ndGgpIHtcclxuLy8gICAgICAgICAgICAgICAgIHJldHVybjtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IGN1cnJlbnQ6Tm9kZTxFPiA9IHRoaXMuX2hlYWQubmV4dDtcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBpbmRleDsgbiArPSAxKSB7XHJcbi8vICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICByZXR1cm4gY3VycmVudC5pdGVtO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgcHVibGljIHNlYXJjaChpdGVtOkUpOm51bWJlcltde1xyXG4vLyAgICAgICAgICAgICBsZXQgcmVzdWx0Om51bWJlcltdID0gW107XHJcbi8vICAgICAgICAgICAgIHRoaXMuZm9yZWFjaCgoZWxlOkUsIGluZGV4Om51bWJlcik9PntcclxuLy8gICAgICAgICAgICAgICAgIGlmIChlbGUgPT09IGl0ZW0pIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChpbmRleCk7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIH0pO1xyXG4vLyAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgLyoqXHJcbi8vICAgICAgICAgICog5Yik5pat6ZO+6KGo5Lit5piv5ZCm5a2Y5Zyo5p+Q5LiA5YWD57SgXHJcbi8vICAgICAgICAgICogQHBhcmFtIGl0ZW0gXHJcbi8vICAgICAgICAgICovXHJcbi8vICAgICAgICAgcHVibGljIGhhcyhpdGVtOiBFKTpib29sZWFue1xyXG5cclxuLy8gICAgICAgICAgICAgbGV0IGN1cnJlbnQgPSB0aGlzLl9oZWFkLm5leHQ7XHJcbi8vICAgICAgICAgICAgIHdoaWxlIChjdXJyZW50ICE9IG51bGwpIHtcclxuLy8gICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Lml0ZW0gPT0gaXRlbSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgLy/pq5jpmLblh73mlbBcclxuLy8gICAgICAgICBwdWJsaWMgZm9yZWFjaChmOihlbGU6RSwgaW5kZXg6bnVtYmVyLCBsaXN0OkxpbmtMaXN0PEU+KT0+dm9pZCk6dm9pZHtcclxuLy8gICAgICAgICAgICAgbGV0IGN1cnJlbnQgPSB0aGlzLl9oZWFkLm5leHQ7XHJcbi8vICAgICAgICAgICAgIGxldCBudW06bnVtYmVyID0gMDtcclxuLy8gICAgICAgICAgICAgd2hpbGUgKGN1cnJlbnQgIT09IG51bGwpIHtcclxuLy8gICAgICAgICAgICAgICAgIGYoY3VycmVudC5pdGVtLCBudW0sIHRoaXMpO1xyXG4vLyAgICAgICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcclxuLy8gICAgICAgICAgICAgICAgIG51bSArPSAxO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvKipcclxuLy8gICAgICAgICAgKiDor7fmmoLml7bkuI3opoHkvb/nlKjov5nkuKrlh73mlbDvvIzlm6DkuLrmiJHkuZ/kuI3nn6XpgZPlroPkvJrkuI3kvJrniIbngrhcclxuLy8gICAgICAgICAgKiDpmaTpnZ7kvaDor7vov4fov5nkuKrlh73mlbDnmoTmupDku6PnoIFcclxuLy8gICAgICAgICAgKiBAcGFyYW0gZiDliKTmlq3lhYPntKDkvJjlhYjnuqfnmoTlm57osIPlh73mlbBcclxuLy8gICAgICAgICAgKiBAcGFyYW0gaW5jcmVhc2Ug5piv5ZCm5Y2H5bqP77yM6buY6K6k5Y2H5bqPXHJcbi8vICAgICAgICAgICogQHJldHVybnMg6L+U5Zue5LiA5Liq5o6S5bqP55qE6ZO+6KGoXHJcbi8vICAgICAgICAgICovXHJcbi8vICAgICAgICAgcHVibGljIHNvcnRieShmOihlbGU6RSk9Pm51bWJlciwgaW5jcmVhc2U6Ym9vbGVhbiA9IHRydWUpOkxpbmtMaXN0PEU+e1xyXG4vLyAgICAgICAgICAgICBsZXQgcHJpb3JpdHk6TGlua0xpc3Q8bnVtYmVyPiA9IG5ldyBMaW5rTGlzdDxudW1iZXI+KCk7XHJcbi8vICAgICAgICAgICAgIGxldCBzb3J0ZWQ6TGlua0xpc3Q8RT4gPSBuZXcgTGlua0xpc3Q8RT4oKTtcclxuLy8gICAgICAgICAgICAgcHJpb3JpdHkucHVzaCgtMCk7XHJcbi8vICAgICAgICAgICAgIHNvcnRlZC5wdXNoKG51bGwpO1xyXG5cclxuLy8gICAgICAgICAgICAgbGV0IGNvbXBhcmU6KGE6bnVtYmVyLGI6bnVtYmVyKT0+Ym9vbGVhbiA9IGluY3JlYXNlPyhhLGIpPT57cmV0dXJuIGEgPCBiO306KGEsYik9PntyZXR1cm4gYSA+IGJ9O1xyXG5cclxuLy8gICAgICAgICAgICAgdGhpcy5mb3JlYWNoKChlbGUpPT57XHJcbi8vICAgICAgICAgICAgICAgICBsZXQgY3VycmVudFByaSA9IGYoZWxlKTtcclxuLy8gICAgICAgICAgICAgICAgIGxldCBub2RlOk5vZGU8RT4gPSBzb3J0ZWQuX2hlYWQubmV4dDtcclxuLy8gICAgICAgICAgICAgICAgIGxldCBwcmlOb2RlOk5vZGU8bnVtYmVyPiA9IHByaW9yaXR5Ll9oZWFkLm5leHQ7XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgbGV0IGZvdW5kUGxhY2U6Ym9vbGVhbiA9IGZhbHNlO1xyXG4vLyAgICAgICAgICAgICAgICAgd2hpbGUgKG5vZGUubmV4dCAhPT0gbnVsbCkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIC8vIGlmIChjdXJyZW50UHJpIDwgcHJpTm9kZS5uZXh0Lml0ZW0pIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBpZiAoY29tcGFyZShjdXJyZW50UHJpLCBwcmlOb2RlLm5leHQuaXRlbSkpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5uZXh0ID0gbmV3IE5vZGU8RT4oZWxlLCBub2RlLm5leHQpO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBwcmlOb2RlLm5leHQgPSBuZXcgTm9kZTxudW1iZXI+KGN1cnJlbnRQcmksIHByaU5vZGUubmV4dCk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kUGxhY2UgPSB0cnVlO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuLy8gICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlLm5leHQ7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcHJpTm9kZSA9IHByaU5vZGUubmV4dDtcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgICAgICBpZiAoIWZvdW5kUGxhY2UpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBzb3J0ZWQucHVzaChlbGUpO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHByaW9yaXR5LnB1c2goY3VycmVudFByaSk7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIH0pO1xyXG5cclxuLy8gICAgICAgICAgICAgc29ydGVkLnNoaWZ0KCk7XHJcbi8vICAgICAgICAgICAgIHJldHVybiBzb3J0ZWQ7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvLyBwdWJsaWMgYmJTb3J0QnkoZjooZWxlOkUpPT5udW1iZXIsIGluY3JlYXNlOmJvb2xlYW4gPSB0cnVlKTpMaW5rTGlzdDxFPntcclxuXHJcbi8vICAgICAgICAgLy8gfVxyXG5cclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBleHBvcnQgY2xhc3MgTWFwPEssVj57XHJcbi8vICAgICAgICAgcHJpdmF0ZSBfbGlzdDpBcnJheTxNYXBOb2RlPEssVj4+XHJcbi8vICAgICAgICAgY29uc3RydWN0b3IoKXtcclxuLy8gICAgICAgICAgICAgdGhpcy5fbGlzdCA9IFtdXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHB1YmxpYyBnZXQoa2V5OkspOlZ7XHJcbi8vICAgICAgICAgICAgIGZvciAobGV0IGVsZSBvZiB0aGlzLl9saXN0KXtcclxuLy8gICAgICAgICAgICAgICAgIGlmIChlbGUua2V5ID09PSBrZXkpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlLnZhbHVlXHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgcmV0dXJuIG51bGxcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcHVibGljIGdldEtleUJ5VmFsKHZhbDpWKTpLe1xyXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBlbGUgb2YgdGhpcy5fbGlzdCkge1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKGVsZS52YWx1ZSA9PT0gdmFsKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZS5rZXlcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gbnVsbFxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBwdWJsaWMga2V5RXhpc3Qoa2V5OkspOmJvb2xlYW57XHJcbi8vICAgICAgICAgICAgIGZvciAobGV0IGVsZSBvZiB0aGlzLl9saXN0KSB7XHJcbi8vICAgICAgICAgICAgICAgICBpZiAoZWxlLmtleSA9PT0ga2V5KSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcHVibGljIHNldChrZXk6Syx2YWx1ZTpWKTpib29sZWFue1xyXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IHRoaXMuX2xpc3QubGVuZ3RoOyBuICs9IDEpIHtcclxuLy8gICAgICAgICAgICAgICAgIGlmICh0aGlzLl9saXN0W25dLmtleSA9PT0ga2V5KSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGlzdFtuXS52YWx1ZSA9IHZhbHVlXHJcbi8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHRoaXMuX2xpc3QucHVzaChuZXcgTWFwTm9kZTxLLFY+KGtleSx2YWx1ZSkpXHJcbi8vICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBwdWJsaWMgYmF0Y2hTZXQoa2V5czpLW10sIHZhbHVlczpWW10pOmJvb2xlYW57XHJcbi8vICAgICAgICAgICAgIGlmIChrZXlzLmxlbmd0aCAhPT0gdmFsdWVzLmxlbmd0aCkge1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwga2V5cy5sZW5ndGg7IG4gKz0gMSkge1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5zZXQoa2V5c1tuXSwgdmFsdWVzW25dKTtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHB1YmxpYyByZW1vdmUoa2V5OkspOmJvb2xlYW57XHJcbi8vICAgICAgICAgICAgIGxldCBjb3VudDpudW1iZXIgPSAwO1xyXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBlbGUgb2YgdGhpcy5fbGlzdCkge1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKGVsZS5rZXkgPT09IGtleSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xpc3Quc3BsaWNlKGNvdW50LDEpO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICBjb3VudCArPSAxO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBwdWJsaWMgZ2V0IGxlbmd0aCgpOm51bWJlcntcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3QubGVuZ3RoXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHB1YmxpYyBmb3JlYWNoKGY6KGs6SywgdjpWKT0+dm9pZCk6dm9pZHtcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgZWxlIG9mIHRoaXMuX2xpc3QpIHtcclxuLy8gICAgICAgICAgICAgICAgIGYoZWxlLmtleSwgZWxlLnZhbHVlKTtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICByZXR1cm47XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHB1YmxpYyBmaWx0ZXIoZjooazpLLHY6Vik9PmJvb2xlYW4pOk1hcDxLLFY+e1xyXG4vLyAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IE1hcDxLLFY+KCk7XHJcbi8vICAgICAgICAgICAgIGZvciAobGV0IGVsZSBvZiB0aGlzLl9saXN0KSB7XHJcbi8vICAgICAgICAgICAgICAgICBpZiAoZihlbGUua2V5LCBlbGUudmFsdWUpKXtcclxuLy8gICAgICAgICAgICAgICAgICAgICByZXN1bHQuc2V0KGVsZS5rZXksIGVsZS52YWx1ZSk7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgZXhwb3J0IGNsYXNzIFBvaW50ZXJMaXN0PEU+e1xyXG4vLyAgICAgICAgIHByaXZhdGUgX2xpc3Q6QXJyYXk8RT4gPSBbXTtcclxuLy8gICAgICAgICBwcml2YXRlIF9wb2ludGVyOm51bWJlciA9IDA7XHJcbi8vICAgICAgICAgY29uc3RydWN0b3Ioc291cmNlOkFycmF5PEU+ID0gW10sIGluaXRQb2ludDpudW1iZXIgPSAwKXtcclxuLy8gICAgICAgICAgICAgc291cmNlLmZvckVhY2goKGVsZSk9PntcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuX2xpc3QucHVzaChlbGUpO1xyXG4vLyAgICAgICAgICAgICB9KVxyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgZ2V0IGV4Y2VlZGluZygpOmJvb2xlYW57XHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wb2ludGVyID49IHRoaXMuX2xpc3QubGVuZ3RoIHx8IHRoaXMuX3BvaW50ZXIgPCAwXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvKlxyXG4vLyAgICAgICAgIOS7peS4i+azqOmHiuS4re+8jOaKiuaVsOe7hOeci+S9nOaoquWQkeaOkuWIl+eahOS4gOezu+WIl+WFg+e0oFxyXG4vLyAgICAgICAgIGluZGV4ID0gMOeahOWFg+e0oOWcqOacgOW3puS+p1xyXG4vLyAgICAgICAgICovXHJcblxyXG4vLyAgICAgICAgIHJlYWQoKTpFey8v5p+l55yL5b2T5YmNcG9pbnRlcuaJgOaMh+eahOWFg+e0oFxyXG4vLyAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdFt0aGlzLl9wb2ludGVyXVxyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgc3RlcCgpOkV7Ly9wb2ludGVy5ZCR5Y+z56e75LiA5q2lXHJcbi8vICAgICAgICAgICAgIHRoaXMuX3BvaW50ZXIrPTE7XHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlYWQoKTtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIHRvKHBsYWNlOm51bWJlcik6UG9pbnRlckxpc3Q8RT57Ly9wb2ludGVy56e75Yiw5oyH5a6a5L2N572uXHJcbi8vICAgICAgICAgICAgIHRoaXMuX3BvaW50ZXIgPSBwbGFjZVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gdGhpc1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgcHVzaChkYXRhOkUpOlBvaW50ZXJMaXN0PEU+ey8v5Zyo5pWw57uE5pyr5bC+5aKe5Yqg5LiA5Liq5YWD57SgXHJcbi8vICAgICAgICAgICAgIHRoaXMuX2xpc3QucHVzaChkYXRhKVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gdGhpc1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgc2V0KGluZGV4Om51bWJlcixkYXRhOkUpOlBvaW50ZXJMaXN0PEU+ey8v6KaG5YaZ5pWw57uE54m55a6aaW5kZXjkuK3nmoTlhYPntKBcclxuLy8gICAgICAgICAgICAgdGhpcy5fbGlzdFtpbmRleF0gPSBkYXRhXHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzXHJcbi8vICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4vLyAgICAgICAgIG5leHQoc2hpZnQ6bnVtYmVyID0gMSk6RXtcclxuLy8gICAgICAgICAgICAgLy/or7vlj5bkvY3kuo7lvZPliY1wb2ludGVy5omA5oyH55qE5YWD57Sg5Y+z6L656Iul5bmy5qC855qE5YWD57SgXHJcbi8vICAgICAgICAgICAgIC8vc2hpZnTpu5jorqTkuLox77yM5Y2z5b2T5YmNcG9pbnRlcuWPs+i+ueebuOmCu+eahOWFg+e0oFxyXG4vLyAgICAgICAgICAgICAvL3NoaWZ05Li66LSf5pWw5pe26I635Y+W5bem5L6n55qE5YWD57SgXHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLl9saXN0W3RoaXMuX3BvaW50ZXIrc2hpZnRdXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBnZXQgbGVuZ3RoKCk6bnVtYmVyey8v6I635Y+W5pWw57uE6ZW/5bqmXHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLl9saXN0Lmxlbmd0aFxyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgZ2V0IGxhc3QoKTpFey8v6I635Y+W5pyA5ZCO5LiA6aG5XHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLl9saXN0W3RoaXMuX2xpc3QubGVuZ3RoLTFdXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBnZXQgZmlyc3QoKTpFey8v6I635Y+W6aaW6aG5XHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLl9saXN0WzBdO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgZ2V0IHBvaW50ZXIoKTpudW1iZXJ7Ly/ojrflj5Zwb2ludGVyXHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wb2ludGVyXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBnZXQgYXRFbmQoKTpib29sZWFuey8v5p+l55yL4oCccG9pbnRlcuaMh+WQkeaVsOe7hOacgOWPs+S+p+eahOWFg+e0oOKAneeahOecn+WAvFxyXG4vLyAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcG9pbnRlciA9PT0gdGhpcy5fbGlzdC5sZW5ndGggLSAxXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfVxyXG4vLyB9IiwiLy9UT0RPXHJcbi8v5pS+572u5oiR5Lus6aG555uu6YeM6Ieq5a6a5LmJ55qE6YCa55SoS0VZ5YC86KGoXHJcbi8v5pS+5Zyo5ZCM5LiA5Liq5paH5Lu26YeM5pyJ5Yqp5LqO57uT5p6E5riF5pmwXHJcbi8v5Y+m77ya5aaC5p6c5Y+q5pyJ5p+Q54m55a6a5qih5Z2X57O757uf6YeM5L2/55So55qEZW51beWPr+S7peS4jeaUvui/h+adpSDnm7TmjqXlhpnlnKjmqKHlnZfmlofku7bkuK1cclxuXHJcbi8v5Y+I5Y+m77yaIOW7uuiuruWcqOS9v+eUqGVudW3nmoTml7blgJnliqDkuIDkuKrnqbrlgLxOb25l5Lul5bqU5a+55Yik5a6a6Zeu6aKYXHJcblxyXG5leHBvcnQgZW51bSBBY3RvclR5cGUge1xyXG4gICAgTm9uZSxcclxuICAgIE9wZXJhdG9yLFxyXG4gICAgTW9uc3RlcixcclxuICAgIFRva2VuXHJcbiAgICAvL+i/meWFtuWunuaYr+WvueW6lOeahOS4jeWQjOeahOaVsOaNruaooeadv1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBDYW1wVHlwZSB7XHJcbiAgICBOb25lLFxyXG4gICAgU2VsZiwgICAvL+aIkeaWuVxyXG4gICAgRW5lbXkgICAvL+aVjOaWuVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIERvZExvZyB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IERvZExvZztcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IEluc3RhbmNlKCk6IERvZExvZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlIHx8ICh0aGlzLl9pbnN0YW5jZSA9IG5ldyB0aGlzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZGVidWcobXNnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBtc2cgPSBgJHttc2d9YDtcclxuICAgICAgICBjb25zb2xlLmRlYnVnKG1zZyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBpbmZvKG1zZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgbXNnID0gYCR7bXNnfWA7XHJcbiAgICAgICAgY29uc29sZS5pbmZvKG1zZyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyB3YXJuKG1zZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgbXNnID0gYCR7bXNnfWA7XHJcbiAgICAgICAgY29uc29sZS53YXJuKG1zZyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBlcnJvcihtc2c6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIG1zZyA9IGAke21zZ31gO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcclxuICAgICAgICBEb2RMb2cuSW5zdGFuY2UuX3dyaXRlVG9GaWxlKG1zZyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfd3JpdGVUb0ZpbGUobG9nOiBzdHJpbmcpIHtcclxuICAgICAgICAvL1RPRE9cclxuICAgIH1cclxufSIsImV4cG9ydCBpbnRlcmZhY2UgQ29tcGFyYWJsZXtcclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5Lik5Liq5YWD57Sg5piv5ZCm55u4562JXHJcbiAgICAgKiDlv4Xpobvlj6/pgIZcclxuICAgICAqIEBwYXJhbSBlbGUgXHJcbiAgICAgKi9cclxuICAgIGVxdWFscyhlbGU6Q29tcGFyYWJsZSk6Ym9vbGVhblxyXG59XHJcbiAgICBcclxuZXhwb3J0IGNsYXNzIERvZE1hdGh7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm55hL2LnmoTmlbTmlbDnu5PmnpzvvIjlsI/mlbDpg6jliIboiI3ljrspXHJcbiAgICAgKiBh77yMYuWmguaenOS4jeWcqOato+aVtOaVsOWfn++8jOivt+ehruS/nemYheivu+i/h+atpOWHveaVsFxyXG4gICAgICogfOKAlOKAlOKAlOKAlHzigJTigJTigJTigJR84oCU4oCU4oCU4oCUfOKAlOKAlOKAlOKAlHzigJTigJTigJTigJR8XHJcbiAgICAgKiAgICAgLTE8LS0tMDwtLS0xPC0tLVxyXG4gICAgICogICAgICDlj6/ku6XnkIbop6PkuLrlnKjmlbDovbTkuIrmiornu5PmnpzlkJHlt6bmmKDlsIRcclxuICAgICAqIEBwYXJhbSBhIFxyXG4gICAgICogQHBhcmFtIGIgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgaW50RGl2aXNpb24oYTpudW1iZXIsIGI6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIChhLWElYikvYjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWcqOW5s+mdouS4iuaxguS7juaMh+WumuWHuuWPkeeCueWIsOaMh+Wumue7iOeCueS9nOS4gOadoeaMh+WumumVv+W6pueahOe6v+aute+8jOatpOe6v+auteeahOWPpuS4gOerr+eCueeahOWdkOagh1xyXG4gICAgICog77yI5aaC5p6c5q2k57q/5q6155qE6ZW/5bqm5aSn5LqO562J5LqO5Ye65Y+R54K55Yiw57uI54K555qE6Led56a777yM5YiZ6L6T5Ye657uI54K555qE5Z2Q5qCH77yJXHJcbiAgICAgKiBAcGFyYW0gZnJvbSBcclxuICAgICAqIEBwYXJhbSBlbmQgXHJcbiAgICAgKiBAcGFyYW0gbW92ZW1lbnQgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbW92ZVRvKGZyb206VmVjMiwgZW5kOlZlYzIsIG1vdmVtZW50Om51bWJlcik6VmVjMntcclxuICAgICAgICBjb25zdCB4ZGlzID0gZW5kLnggLSBmcm9tLng7XHJcbiAgICAgICAgY29uc3QgeWRpcyA9IGVuZC55IC0gZnJvbS55O1xyXG4gICAgICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KCh4ZGlzKSoqMiArICh5ZGlzKSoqMik7XHJcbiAgICAgICAgaWYgKG1vdmVtZW50ID49IGRpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbmQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHJhdGlvID0gbW92ZW1lbnQgLyBkaXN0YW5jZTtcclxuICAgICAgICByZXR1cm4gbmV3IFZlYzIoZnJvbS54ICsgeGRpcypyYXRpbyxmcm9tLnkgKyB5ZGlzKnJhdGlvKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE15TWF0aC5tb3ZlVG/lh73mlbDnmoTlj6bkuIDkuKrniYjmnKzjgILov5nkuKrniYjmnKzkvJrnm7TmjqXkv67mlLkoZnJvbTpWZWMyKeS8oOWFpeeahOWvueixoeacrOi6q++8jOW5tuWIpOaWreacgOe7iGZyb23kuI5lbmTkuKTkuKrlr7nosaHmmK/lkKbph43lkIhcclxuICAgICAqIEBwYXJhbSBmcm9tIFxyXG4gICAgICogQHBhcmFtIGVuZCBcclxuICAgICAqIEBwYXJhbSBtb3ZlbWVudCBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBtb3ZlVG9TaWRlRWZmZWN0KGZyb206VmVjMiwgZW5kOlZlYzIsIG1vdmVtZW50Om51bWJlcik6Ym9vbGVhbntcclxuICAgICAgICBjb25zdCB4ZGlzID0gZW5kLnggLSBmcm9tLng7XHJcbiAgICAgICAgY29uc3QgeWRpcyA9IGVuZC55IC0gZnJvbS55O1xyXG4gICAgICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KCh4ZGlzKSoqMiArICh5ZGlzKSoqMik7XHJcbiAgICAgICAgaWYgKG1vdmVtZW50ID49IGRpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIGZyb20ueCA9IGVuZC54O1xyXG4gICAgICAgICAgICBmcm9tLnkgPSBlbmQueTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHJhdGlvID0gbW92ZW1lbnQgLyBkaXN0YW5jZTtcclxuICAgICAgICBmcm9tLnggPSBmcm9tLnggKyB4ZGlzKnJhdGlvO1xyXG4gICAgICAgIGZyb20ueSA9IGZyb20ueSArIHlkaXMqcmF0aW87XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTXlNYXRoLm1vdmVUb+WHveaVsOeahOWPpuS4gOS4queJiOacrOOAgui/lOWbnuebtOe6v+mAn+W6puWcqHh55Lik6L205LiK55qE5YiG6YePXHJcbiAgICAgKiBAcGFyYW0gZnJvbSBcclxuICAgICAqIEBwYXJhbSBlbmQgXHJcbiAgICAgKiBAcGFyYW0gbW92ZW1lbnQgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbW92ZVRvQ29tcG9uZW50KGZyb206VmVjMiwgZW5kOlZlYzIsIG1vdmVtZW50Om51bWJlcik6VmVjMntcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCB4ZGlzID0gZW5kLnggLSBmcm9tLng7XHJcbiAgICAgICAgY29uc3QgeWRpcyA9IGVuZC55IC0gZnJvbS55O1xyXG4gICAgICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KCh4ZGlzKSoqMiArICh5ZGlzKSoqMik7XHJcbiAgICAgICAgY29uc3QgcmF0aW8gPSBtb3ZlbWVudCAvIGRpc3RhbmNlO1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjMih4ZGlzKnJhdGlvLCB5ZGlzKnJhdGlvKTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVmVjMiBpbXBsZW1lbnRzIENvbXBhcmFibGV7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBsaXN0RnJvbUxpc3QobGlzdDpudW1iZXJbXVtdKTpWZWMyW117XHJcbiAgICAgICAgbGV0IHJlc3VsdDpWZWMyW10gPSBbXTtcclxuXHJcbiAgICAgICAgbGlzdC5mb3JFYWNoKGVsZT0+e1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChuZXcgVmVjMihlbGVbMF0sZWxlWzFdKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHg6bnVtYmVyO1xyXG4gICAgcHVibGljIHk6bnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue5LuO5q2k54K55Yiw5oyH5a6a54K555qE6Led56a7XHJcbiAgICAgKiBAcGFyYW0gZW5kIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGlzdGFuY2VUbyhlbmQ6VmVjMik6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiAoKGVuZC54IC0gdGhpcy54KSoqMiArIChlbmQueSAtIHRoaXMueSkqKjIpKiowLjU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmsYLlkozkuKTkuKpWZWPvvIzov5Tlm57nu5PmnpzvvIzkuI3kv67mlLnljp/lrp7kvotcclxuICAgICAqIEBwYXJhbSB2ZWMgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwbHVzKHZlYzpWZWMyKTpWZWMye1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjMih0aGlzLnggKyB2ZWMueCwgdGhpcy55ICsgdmVjLnkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Lul6L6T5YWl5Z2Q5qCH5Li65Lit5b+D6L+b6KGM6aG65pe26ZKIOTDluqbml4vovaxcclxuICAgICAqIO+8iOacquWujOaIkO+8iVxyXG4gICAgICogQHBhcmFtIGNlbnRyZSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJvdGF0ZUNsb2Nrd2lzZShjZW50cmU6VmVjMik6VmVjMntcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuatpOWQkemHj+eahOWkjeWItlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xvbmUoKTpWZWMye1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjMih0aGlzLngsIHRoaXMueSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVxdWFscyhlbGU6VmVjMik6Ym9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy54ID09PSBlbGUueCAmJiB0aGlzLnkgPT09IGVsZS55O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHg/Om51bWJlciwgeT86bnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIiwiLy9hdXRob3IgTmEyQ3VDNE84XHJcblxyXG5cclxuaW1wb3J0IEN1c3RvbWl6ZWRTcHJpdGUgZnJvbSBcIi4vY3VzdG9taXplZFNwclwiO1xyXG5pbXBvcnQgeyBWZWMyIH0gZnJvbSBcIi4uLy4uL0RvZE1hdGhcIjtcclxuaW1wb3J0IHsgRXZlbnRDZW50cmUgfSBmcm9tIFwiLi4vLi4vLi4vRXZlbnQvRXZlbnRDZW50cmVcIjtcclxuaW1wb3J0IHsgTXlTeW1ib2wgfSBmcm9tIFwiLi4vLi4vLi4vRml4L0ZpeFN5bWJvbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJhcntcclxuXHJcbiAgICBwcml2YXRlIF9pbml0UG9zOlZlYzI7Ly/otbflp4vlnZDmoIdcclxuICAgIHByaXZhdGUgX2luaXRTaXplOlZlYzI7Ly/otbflp4vlpKflsI9cclxuICAgIHByaXZhdGUgX3BvczpWZWMyOy8v57yp5pS+5ZCO5Z2Q5qCHXHJcbiAgICBwcml2YXRlIF9zaXplOlZlYzI7Ly/nvKnmlL7lkI7lpKflsI9cclxuICAgIHByaXZhdGUgX3NjYWxlOm51bWJlciA9IDE7Ly/lhajlsYDnvKnmlL7mr5RcclxuICAgIHByaXZhdGUgX3N5bWJOdW06bnVtYmVyOy8v6L+b5bqm5p2h57yW5Y+3XHJcbiAgICBwcml2YXRlIF9iYWNrU3ByOkN1c3RvbWl6ZWRTcHJpdGU7Ly/ov5vluqbmnaHlupXlsYLnu5jlm77oioLngrlcclxuICAgIHByaXZhdGUgX2Zyb250U3ByOkN1c3RvbWl6ZWRTcHJpdGU7Ly/ov5vluqbmnaHpobblsYLnu5jlm77oioLngrlcclxuICAgIHByaXZhdGUgX3BlcmNlbnRhZ2U6bnVtYmVyID0gMTsvL+i/m+W6plxyXG4gICAgcHJpdmF0ZSBfaGVpZ2h0Om51bWJlcjsvL+i/m+W6puadoemrmOW6plxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/m+W6puadoeaehOmAoOWZqFxyXG4gICAgICogQHBhcmFtIHN5bWJOdW0g6L+b5bqm5p2h57yW5Y+3XHJcbiAgICAgKiBAcGFyYW0gYmFja0dyb3VuZENvbG9yIOiDjOaZr+minOiJslxyXG4gICAgICogQHBhcmFtIHNpemUg5aSn5bCPXHJcbiAgICAgKiBAcGFyYW0gcG9zIOWdkOagh1xyXG4gICAgICogQHBhcmFtIHNjYWxlIOWFqOWxgOe8qeaUvuavlFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihzeW1iTnVtOm51bWJlciwgYmFja0dyb3VuZENvbG9yOnN0cmluZyxzaXplOlZlYzIgLHBvczpWZWMyLCBzY2FsZTpudW1iZXIgPSAxKXtcclxuICAgICAgICB0aGlzLl9zeW1iTnVtID0gc3ltYk51bTtcclxuICAgICAgICB0aGlzLl9pbml0U2l6ZSA9IHNpemU7XHJcbiAgICAgICAgdGhpcy5fc2NhbGUgPSBzY2FsZTtcclxuICAgICAgICB0aGlzLl9zaXplID0gbmV3IFZlYzIodGhpcy5faW5pdFNpemUueCp0aGlzLl9wZXJjZW50YWdlKnRoaXMuX3NjYWxlLHRoaXMuX2luaXRTaXplLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX2luaXRQb3MgPSBwb3M7XHJcbiAgICAgICAgdGhpcy5fcG9zID0gbmV3IFZlYzIodGhpcy5faW5pdFBvcy54KnRoaXMuX3NjYWxlLHRoaXMuX2luaXRQb3MueSp0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fYmFja1NwciA9IG5ldyBDdXN0b21pemVkU3ByaXRlKCk7XHJcbiAgICAgICAgdGhpcy5fYmFja1Nwci5zZXRQYXJhbSh0aGlzLl9wb3MueCx0aGlzLl9wb3MueSx0aGlzLl9zaXplLngsdGhpcy5fc2l6ZS55LGJhY2tHcm91bmRDb2xvcik7XHJcbiAgICAgICAgdGhpcy5fYmFja1Nwci5jaGFuZ2VDb2xvcigpO1xyXG4gICAgICAgIHRoaXMuX2Zyb250U3ByID0gbmV3IEN1c3RvbWl6ZWRTcHJpdGUoKTtcclxuICAgICAgICB0aGlzLl9iYWNrU3ByLmFkZENoaWxkKHRoaXMuX2Zyb250U3ByKTtcclxuICAgICAgICB0aGlzLl9mcm9udFNwci5zZXRQYXJhbSgwLDAsdGhpcy5fc2l6ZS54LHRoaXMuX3NpemUueSxcIiM4YjhiODNcIixuZXcgVmVjMih0aGlzLl9zY2FsZSx0aGlzLl9zY2FsZSkpO1xyXG4gICAgICAgIHRoaXMuX2Zyb250U3ByLmNoYW5nZUNvbG9yKCk7XHJcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gdGhpcy5faW5pdFNpemUueTtcclxuICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5vbihFdmVudENlbnRyZS5FVHlwZS5QRVJGT1JNQU5DRV9SRVNDQUxFKCksdGhpcyx0aGlzLnJlU2NhbGUpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS/ruaUuee8qeaUvuavlFxyXG4gICAgICogQHBhcmFtIHZhbHVlIOWFqOWxgOe8qeaUvuavlFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlU2NhbGUodmFsdWU6bnVtYmVyKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3NjYWxlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5fcG9zID0gbmV3IFZlYzIodGhpcy5faW5pdFBvcy54KnRoaXMuX3NjYWxlLCB0aGlzLl9pbml0UG9zLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX3NpemUgPSBuZXcgVmVjMih0aGlzLl9pbml0U2l6ZS54KnRoaXMuX3NjYWxlLCB0aGlzLl9pbml0U2l6ZS55KnRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9iYWNrU3ByLnNldFBhcmFtKHRoaXMuX3Bvcy54LHRoaXMuX3Bvcy55LHRoaXMuX3NpemUueCx0aGlzLl9zaXplLnkpOy8v6K6+572u6IOM5pmv57uY5Zu+6IqC54K55Y+C5pWwXHJcbiAgICAgICAgdGhpcy5fYmFja1Nwci5jaGFuZ2VDb2xvcigpO1xyXG4gICAgICAgIHRoaXMuX2Zyb250U3ByLnNldFBhcmFtKDAsMCx0aGlzLl9zaXplLngqdGhpcy5fcGVyY2VudGFnZSx0aGlzLl9zaXplLnksXCIjOGI4YjgzXCIsbmV3IFZlYzIoMSp0aGlzLl9zY2FsZSwxKnRoaXMuX3NjYWxlKSk7Ly/orr7nva7liY3nq6/nu5jlm77oioLngrnlj4LmlbBcclxuICAgICAgICB0aGlzLl9mcm9udFNwci5jaGFuZ2VDb2xvcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u6L+b5bqm5p2h5Luj5Y+3XHJcbiAgICAgKiBAcGFyYW0gc3ltYk51bSDov5vluqbmnaHku6Plj7dcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFN5bWIoc3ltYk51bTpudW1iZXIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fc3ltYk51bSA9IHN5bWJOdW07XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkv67mlLnov5vluqZcclxuICAgICAqIEBwYXJhbSBwZXJjZW50YWdlIOebruagh+i/m+W6plxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IHBlcmNlbnRhZ2UocGVyY2VudGFnZTpudW1iZXIpe1xyXG4gICAgICAgIGlmKHBlcmNlbnRhZ2UgPT09IDApe1xyXG4gICAgICAgICAgICB0aGlzLl9wZXJjZW50YWdlID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fZnJvbnRTcHIuZ3JhcGhpY3MuY2xlYXIoKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fcGVyY2VudGFnZSA9IHBlcmNlbnRhZ2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2Zyb250U3ByLnNldFBhcmFtKDAsMCx0aGlzLl9zaXplLngqdGhpcy5fcGVyY2VudGFnZSx0aGlzLl9zaXplLnksXCIjOGI4YjgzXCIsbmV3IFZlYzIoMSp0aGlzLl9zY2FsZSwxKnRoaXMuX3NjYWxlKSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2Zyb250U3ByLmNoYW5nZUNvbG9yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue5pys6L+b5bqm5p2h6IOM5pmv57uY5Zu+6IqC54K5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRCYWNrU3ByKCk6Q3VzdG9taXplZFNwcml0ZXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYmFja1NwcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuacrOi/m+W6puadoemrmOW6plxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0SGVpZ2h0KCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9oZWlnaHQ7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCdXR0b257XHJcblxyXG4gICAgcHJpdmF0ZSBfaW5pdFBvczpWZWMyOy8v5oyJ6ZKu5Yid5aeL5Z2Q5qCHXHJcbiAgICBwcml2YXRlIF9pbml0U2l6ZTpWZWMyOy8v5oyJ6ZKu5Yid5aeL5a696auYXHJcbiAgICBwcml2YXRlIF9wb3M6VmVjMjsvL+aYvuekuuiKgueCueWdkOagh1xyXG4gICAgcHJpdmF0ZSBfc2l6ZTpWZWMyOy8v5pi+56S66IqC54K55a696auYXHJcbiAgICBwcml2YXRlIF9zeW1iTmFtZTpudW1iZXI7Ly/mjInpkq7nvJblj7dcclxuICAgIHByaXZhdGUgX2NvbG9yOnN0cmluZzsvL+aMiemSruminOiJslxyXG4gICAgcHJpdmF0ZSBfaGVpZ2h0Om51bWJlcjsvL+aMiemSrumrmOW6pu+8iOm7mOiupOe8qeaUvuavlOS4ujHvvIlcclxuICAgIHByaXZhdGUgX3NwcjpDdXN0b21pemVkU3ByaXRlOy8v5oyJ6ZKu5pi+56S66IqC54K5XHJcbiAgICBwcml2YXRlIF9zY2FsZTpudW1iZXI7Ly/lhajlsYDnvKnmlL7mr5RcclxuICAgIHByaXZhdGUgX25hbWU6c3RyaW5nOy8v5oyJ6ZKu5ZCN77yI5pi+56S65Zyo5oyJ6ZKu5LiK77yJXHJcbiAgICBwcml2YXRlIF9mdW46RnVuY3Rpb247Ly/mjInpkq7miYDmkLrluKbnmoTlip/og73lh73mlbBcclxuICAgIHByaXZhdGUgX0FSVXN5bWI6TXlTeW1ib2w7Ly/mjInpkq7miYDlnKhBY3RvclJVXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmjInpkq7mnoTpgKDlmahcclxuICAgICAqIEBwYXJhbSBuYW1lIOaMiemSruWQjVxyXG4gICAgICogQHBhcmFtIHN5bWJOdW0g5oyJ6ZKu57yW5Y+3XHJcbiAgICAgKiBAcGFyYW0gcG9zIOi1t+Wni+WdkOagh1xyXG4gICAgICogQHBhcmFtIHNpemUg6LW35aeL5a696auYXHJcbiAgICAgKiBAcGFyYW0gY29sb3Ig5oyJ6ZKu6aKc6ImyXHJcbiAgICAgKiBAcGFyYW0gc2NhbGUg57yp5pS+5q+UXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKEFSVXN5bWI6TXlTeW1ib2wsIG5hbWU6c3RyaW5nID0gXCJkZWZhdWx0XCIsIHN5bWJOdW06bnVtYmVyLCBwb3M6VmVjMiwgc2l6ZTpWZWMyLCAgY29sb3I6c3RyaW5nID0gXCIjMDBCMkJGXCIsIHNjYWxlOm51bWJlciA9IDEpe1xyXG4gICAgICAgIHRoaXMuX0FSVXN5bWIgPSBBUlVzeW1iO1xyXG4gICAgICAgIHRoaXMuX3N5bWJOYW1lID0gc3ltYk51bTtcclxuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLl9pbml0UG9zID0gcG9zO1xyXG4gICAgICAgIHRoaXMuX2luaXRTaXplID0gc2l6ZTtcclxuICAgICAgICB0aGlzLl9jb2xvciA9IGNvbG9yO1xyXG4gICAgICAgIHRoaXMuX3NjYWxlID0gc2NhbGU7XHJcbiAgICAgICAgdGhpcy5fcG9zID0gbmV3IFZlYzIodGhpcy5faW5pdFBvcy54KnRoaXMuX3NjYWxlLHRoaXMuX2luaXRQb3MueSp0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fc2l6ZSA9IG5ldyBWZWMyKHRoaXMuX2luaXRTaXplLngqdGhpcy5fc2NhbGUsdGhpcy5faW5pdFNpemUueSp0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gdGhpcy5faW5pdFNpemUueTtcclxuICAgICAgICB0aGlzLl9zcHIgPSBuZXcgQ3VzdG9taXplZFNwcml0ZSgpO1xyXG4gICAgICAgIHRoaXMuX3Nwci5zZXRQYXJhbSh0aGlzLl9wb3MueCx0aGlzLl9wb3MueSx0aGlzLl9zaXplLngsdGhpcy5fc2l6ZS55LHRoaXMuX2NvbG9yKTtcclxuICAgICAgICB0aGlzLl9zcHIuY2hhbmdlQ29sb3IoKTtcclxuICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5vbihFdmVudENlbnRyZS5FVHlwZS5QRVJGT1JNQU5DRV9SRVNDQUxFKCksdGhpcyx0aGlzLnJlU2NhbGUpO1xyXG4gICAgICAgIHRoaXMuc2V0VGV4dCgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruaMiemSruWKn+iDvVxyXG4gICAgICogQHBhcmFtIGZ1biDmjInpkq7lip/og73lh73mlbBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldEZ1bmMoZnVuOkZ1bmN0aW9uKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX2Z1biA9IGZ1bjtcclxuICAgICAgICB0aGlzLl9zcHIub24oTGF5YS5FdmVudC5NT1VTRV9VUCx0aGlzLHRoaXMuX2Z1bik7XHJcbiAgICAgICAgdGhpcy5fc3ByLm9uKExheWEuRXZlbnQuTU9VU0VfT1ZFUix0aGlzLChlOiBMYXlhLkV2ZW50KT0+e1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fc3ByLm9uKExheWEuRXZlbnQuTU9VU0VfVVAsdGhpcywoZTogTGF5YS5FdmVudCk9PntcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuaMiemSrue7mOWbvuiKgueCuVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0U3ByKCk6Q3VzdG9taXplZFNwcml0ZXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3ByO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnvKnmlL7mjInpkq5cclxuICAgICAqIEBwYXJhbSB2YWx1ZSDlhajlsYDnvKnmlL7mr5RcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlU2NhbGUodmFsdWU6bnVtYmVyKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3NjYWxlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5fcG9zID0gbmV3IFZlYzIodGhpcy5faW5pdFBvcy54KnRoaXMuX3NjYWxlLHRoaXMuX2luaXRQb3MueSp0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fc2l6ZSA9IG5ldyBWZWMyKHRoaXMuX2luaXRTaXplLngqdGhpcy5fc2NhbGUsdGhpcy5faW5pdFNpemUueSp0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fc3ByLnNldFBhcmFtKHRoaXMuX3Bvcy54LHRoaXMuX3Bvcy55LHRoaXMuX3NpemUueCx0aGlzLl9zaXplLnksdGhpcy5fY29sb3IpO1xyXG4gICAgICAgIHRoaXMuX3Nwci5jaGFuZ2VDb2xvcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5riy5p+T5paH5pysXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRUZXh0KCk6dm9pZHtcclxuICAgICAgICBsZXQgdG1wVGV4OkxheWEuVGV4dCA9IG5ldyBMYXlhLlRleHQoKTtcclxuICAgICAgICB0bXBUZXgud2lkdGggPSB0aGlzLl9zaXplLng7XHJcbiAgICAgICAgdG1wVGV4LmhlaWdodCA9IHRoaXMuX3NpemUueTtcclxuICAgICAgICB0bXBUZXgueCA9IDA7XHJcbiAgICAgICAgdG1wVGV4LnkgPSAwO1xyXG4gICAgICAgIHRtcFRleC5mb250U2l6ZSA9IDk7XHJcbiAgICAgICAgdG1wVGV4LnRleHQgPSB0aGlzLl9uYW1lO1xyXG4gICAgICAgIHRtcFRleC5hbGlnbiA9IFwiY2VudGVyXCI7XHJcbiAgICAgICAgdG1wVGV4LnZhbGlnbiA9IFwibWlkZGxlXCI7XHJcbiAgICAgICAgdGhpcy5fc3ByLmFkZENoaWxkKHRtcFRleCk7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBUZXh0IGV4dGVuZHMgTGF5YS5UZXh0e1xyXG4gICAgcHJpdmF0ZSBfc3dpdGNoOmJvb2xlYW4gPSB0cnVlOy8v5paH5pys5pi+56S65byA5YWzIOm7mOiupOWFs+mXrVxyXG4gICAgcHJpdmF0ZSBfc2NhbGU6bnVtYmVyOy8v5YWo5bGA57yp5pS+5q+UXHJcbiAgICBwcml2YXRlIF9zaXplOlZlYzI7Ly/otbflp4vlpKflsI9cclxuICAgIHByaXZhdGUgX3BvczpWZWMyID0gbmV3IFZlYzIoMCwwKTsvL+i1t+Wni+WdkOagh1xyXG4gICAgcHJpdmF0ZSBfbXlTdHJpbmc6c3RyaW5nOy8v5paH5pys5YaF5a65XHJcbiAgICBwcml2YXRlIF9BUlVzeW1iOk15U3ltYm9sOy8v5omA5Zyo5Y+v6KeG6IqC54K5XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmlofmnKzmnoTpgKDlmahcclxuICAgICAqIEBwYXJhbSBzaXplIOi1t+Wni+Wkp+Wwj1xyXG4gICAgICogQHBhcmFtIHNjYWxlIOe8qeaUvuavlFxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHNpemU6VmVjMiwgc2NhbGU6bnVtYmVyKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX3NpemUgPSBzaXplO1xyXG4gICAgICAgIHRoaXMuX3NjYWxlID0gc2NhbGU7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuX3NpemUueCp0aGlzLl9zY2FsZTsvL+iuoeeul+WPr+inhuiKgueCueWuveW6plxyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5fc2l6ZS55KnRoaXMuX3NjYWxlOy8v6K6h566X5Y+v6KeG6IqC54K56auY5bqmXHJcbiAgICAgICAgdGhpcy5mb250U2l6ZSA9IDEwKnRoaXMuX3NjYWxlOy8v6K6h566X5a2X5L2T5aSn5bCPXHJcbiAgICAgICAgdGhpcy5hbGlnbiA9IFwiY2VudGVyXCI7Ly/pu5jorqTnq5bnm7TlsYXkuK1cclxuICAgICAgICB0aGlzLnZhbGlnbiA9IFwibWlkZGxlXCI7Ly/pu5jorqTmsLTlubPlsYXkuK1cclxuICAgICAgICB0aGlzLndvcmRXcmFwID0gdHJ1ZTsvL+m7mOiupOiHquWKqOaNouihjOW8gOWQr1xyXG4gICAgICAgIHRoaXMuY29sb3IgPSBcIiMwMDAwMDBcIjsvL1xyXG4gICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLm9uKEV2ZW50Q2VudHJlLkVUeXBlLlBFUkZPUk1BTkNFX1JFU0NBTEUoKSx0aGlzLHRoaXMucmVTY2FsZSk7Ly/nm5HlkKzlhajlsYDnvKnmlL7mr5RcclxuICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5vbihFdmVudENlbnRyZS5FVHlwZS5QRVJGT1JNQU5DRV9URVhUX1NXSVRDSCgpLHRoaXMsdGhpcy5zd2l0Y2gpOy8v55uR5ZCs5YWo5bGA5paH5pys5pi+56S65byA5YWzXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5omA5Zyo5pi+56S66IqC54K5c3ltYlxyXG4gICAgICogQHBhcmFtIHN5bWIgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRTeW1iKHN5bWI6TXlTeW1ib2wpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fQVJVc3ltYiA9IHN5bWI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvIDlhbPmlofmnKzmmL7npLrlvIDlhbNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN3aXRjaCgpOnZvaWR7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5fc3dpdGNoID09PSB0cnVlKXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuX3N3aXRjaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZVRleHQoXCJcIik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9zd2l0Y2ggPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS/ruaUueaWh+acrOaYvuekuuW8gOWFs1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U3dpdGNoT24oKTp2b2lke1xyXG4gICAgICAgIGlmKHRoaXMuX3N3aXRjaCA9PT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVGV4dCh0aGlzLl9teVN0cmluZyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWFs+mXreaWh+acrOaYvuekulxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U3dpdGNoT2ZmKCk6dm9pZHtcclxuICAgICAgICBpZih0aGlzLl9zd2l0Y2gpe1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZVRleHQoXCIgXCIpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2u57yp5pS+5q+U5L+u5pS55Y+v6KeG6IqC54K55aSn5bCPXHJcbiAgICAgKiBAcGFyYW0gc2NhbGUg5YWo5bGA57yp5pS+5q+UXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVTY2FsZShzY2FsZTpudW1iZXIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fc2NhbGUgPSBzY2FsZTtcclxuICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5fc2l6ZS54KnRoaXMuX3NjYWxlO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5fc2l6ZS55KnRoaXMuX3NjYWxlO1xyXG4gICAgICAgIHRoaXMueCA9IHRoaXMuX3Bvcy54KnRoaXMuX3NjYWxlO1xyXG4gICAgICAgIHRoaXMueSA9IHRoaXMuX3Bvcy55KnRoaXMuX3NjYWxlO1xyXG4gICAgICAgIHRoaXMuZm9udFNpemUgPSAxMCp0aGlzLl9zY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruaWh+acrFxyXG4gICAgICogQHBhcmFtIHRleHQgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRUZXh0KHRleHQ6c3RyaW5nKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX215U3RyaW5nID0gdGV4dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS/ruaUueaWh+acrOi1t+Wni+WdkOagh++8iOS4jeWPl+WFqOWxgOe8qeaUvuavlOW9seWTje+8iVxyXG4gICAgICogQHBhcmFtIHBvcyDotbflp4vlnZDmoIdcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFBvcyhwb3M6VmVjMiA9IG5ldyBWZWMyKDAsMCkpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fcG9zID0gcG9zO1xyXG4gICAgICAgIHRoaXMueCA9IHRoaXMuX3Bvcy54KnRoaXMuX3NjYWxlO1xyXG4gICAgICAgIHRoaXMueSA9IHRoaXMuX3Bvcy55KnRoaXMuX3NjYWxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6Zi75q2i6byg5qCH5LqL5Lu256m/6YCPXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvZmZTd2l0Y2goKTp2b2lke1xyXG4gICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLm9mZihFdmVudENlbnRyZS5FVHlwZS5QRVJGT1JNQU5DRV9SRVNDQUxFKCksdGhpcyx0aGlzLnJlU2NhbGUpO1xyXG4gICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLm9mZihFdmVudENlbnRyZS5FVHlwZS5QRVJGT1JNQU5DRV9URVhUX1NXSVRDSCgpLHRoaXMsdGhpcy5zd2l0Y2gpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5L+u5pS55a2X5L2T5aSn5bCPXHJcbiAgICAgKiBAcGFyYW0gdmFsdWUg6L6T5YWl5aSn5bCPXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRGb250U2l6ZSh2YWx1ZTpudW1iZXIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5mb250U2l6ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudGV4dCA9IHRoaXMuX215U3RyaW5nO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIiwiLy9hdXRob3IgTmEyQ3VDNE84XHJcblxyXG5pbXBvcnQgQ3VzdG9taXplZFNwcml0ZSBmcm9tIFwiLi9jdXN0b21pemVkU3ByXCI7XHJcbmltcG9ydCB7IENoZXNzQm9hcmQgfSBmcm9tIFwiLi9VbnN5bWJvbGl6ZWRSZW5kZXJcIjtcclxuaW1wb3J0IEFjdG9yUlUgZnJvbSBcIi4vU3ltYm9saXplZFJlbmRlclwiO1xyXG5pbXBvcnQgeyBBY3RvckJveCB9IGZyb20gXCIuL29iamJveFwiO1xyXG5pbXBvcnQgeyBWZWMyIH0gZnJvbSBcIi4uLy4uL0RvZE1hdGhcIjtcclxuaW1wb3J0IHsgU3ltYm9saXplZCB9IGZyb20gXCIuLi8uLi8uLi9GaXgvRml4U3ltYm9sXCI7XHJcbmltcG9ydCB7IEV2ZW50Q2VudHJlIH0gZnJvbSBcIi4uLy4uLy4uL0V2ZW50L0V2ZW50Q2VudHJlXCI7XHJcbmltcG9ydCB7IFJlbmRlcmVyIH0gZnJvbSBcIi4uLy4uL1JlbmRlcmVyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQZXJmb3JtYW5jZUNlbnRyZSBpbXBsZW1lbnRzIFJlbmRlcmVye1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaW5zdGFuY2U6UGVyZm9ybWFuY2VDZW50cmU7Ly/ljZXkvovvvIjor7fkuI3opoHmiYvliqjmlrDlu7rljZXkvovvvIlcclxuICAgIHB1YmxpYyBtYWluU3ByOkN1c3RvbWl6ZWRTcHJpdGU7Ly/pu5jorqTnu5jlm77oioLngrnvvIjnpoHmraLlnKjor6XoioLngrnkuIrnu5jlm77vvIzlj6rog73nlKjkuo7mt7vliqDlrZDoioLngrnvvIlcclxuICAgIHByaXZhdGUgY2hlc3NCb2FyZDpDaGVzc0JvYXJkOy8v6buY6K6k5qOL55uYXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJbmuLLmn5PkuLvlnLrmma/vvIzliJ3lp4vljJbkuovku7bnm5HlkKznsbtcclxuICAgICAqIEBwYXJhbSBzY2VuZSDmuLjmiI/kuLvlnLrmma9cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplIChzY2VuZTpMYXlhLlNwcml0ZSk6dm9pZHtcclxuICAgICAgICBQZXJmb3JtYW5jZUNlbnRyZS5pbnN0YW5jZSA9IG5ldyBQZXJmb3JtYW5jZUNlbnRyZSgpOy8v5Yqg6L296Z2Z5oCB57G7XHJcbiAgICAgICAgUGVyZm9ybWFuY2VDZW50cmUuaW5zdGFuY2UubWFpblNwciA9IG5ldyBDdXN0b21pemVkU3ByaXRlKCk7Ly/lu7rnq4vkuLvnu5jlm77oioLngrlcclxuICAgICAgICAvL+ivpee7mOWbvuiKgueCueS4jeeUqOS6jue7mOWItuS7u+S9leWbvuW9ou+8jOS7heeUqOS6jua3u+WKoOWtkOiKgueCuVxyXG4gICAgICAgIHNjZW5lLmFkZENoaWxkKFBlcmZvcm1hbmNlQ2VudHJlLmluc3RhbmNlLm1haW5TcHIpOy8v5bCG5Li757uY5Zu+6IqC54K55re75Yqg5Li65Li75Zy65pmv5a2Q6IqC54K5XHJcbiAgICAgICAgRXZlbnRDZW50cmUuaW5pdCgpOy8v5Yid5aeL5YyW6KeC5a+f6ICFXHJcbiAgICAgICAgUGVyZm9ybWFuY2VDZW50cmUuaW5pdGlhbGl6ZSA9ICgpID0+IHt9Oy8v5riF56m65Li75Zy65pmv5Yid5aeL5YyW5Ye95pWwXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJNYWluIFNjZW5lIEluaXRpYWxpemF0aW9uIENvbXBsZXRlISFcIik7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5riy5p+T5qOL55uYXHJcbiAgICAgKiBAcGFyYW0gYXJyIOeUqOS6jueUn+aIkOaji+ebmOeahOS6jOe7tOaVsOe7hFxyXG4gICAgICogQHBhcmFtIHBvc1ZlYzIg5qOL55uY6LW35aeL5Z2Q5qCH77yI5LiA5b6L5oyJ5YWo5bGA57yp5pS+5q+U5Li6Meiuoeeul++8jOa4suafk+WZqOS8muagueaNruWFqOWxgOe8qeaUvuavlOiHquWKqOWujOaIkOe8qeaUvua4suafk++8iVxyXG4gICAgICogQHBhcmFtIHVuaXRzaXplIOWNleS9jeagvOWtkOWuvemrmO+8iOS4gOW+i+aMieWFqOWxgOe8qeaUvuavlOS4ujHorqHnrpfvvIzmuLLmn5PlmajkvJrmoLnmja7lhajlsYDnvKnmlL7mr5Toh6rliqjlrozmiJDnvKnmlL7muLLmn5PvvIlcclxuICAgICAqIEBwYXJhbSBiYWNrR3JvdW5kQ29sb3Ig5qOL55uY6IOM5pmv6aKc6ImyXHJcbiAgICAgKiBAcGFyYW0gZnJvbnRDb2xvciDmoLzlrZDpopzoibJcclxuICAgICAqIEBwYXJhbSBmYXRoZXIg54i257uY5Zu+6IqC54K577yI6buY6K6k5Li65YWo5bGA57uY5Zu+6IqC54K577yJXHJcbiAgICAgKiBAcGFyYW0gc2NhbGUg57yp5pS+5q+U77yI6buY6K6k5Li6Me+8iVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW5pdEJvYXJkKGFycjogbnVtYmVyW11bXSwgcG9zVmVjMjogVmVjMiwgdW5pdHNpemU6IFZlYzIsIGJhY2tHcm91bmRDb2xvcjogc3RyaW5nLCBmcm9udENvbG9yOiBzdHJpbmcsIHNjYWxlOiBudW1iZXIgPSAxKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jaGVzc0JvYXJkID0gbmV3IENoZXNzQm9hcmQoYXJyLHBvc1ZlYzIsdW5pdHNpemUsYmFja0dyb3VuZENvbG9yLGZyb250Q29sb3Isc2NhbGUpOy8v5paw5bu65qOL55uYXHJcbiAgICAgICAgUGVyZm9ybWFuY2VDZW50cmUuaW5zdGFuY2UubWFpblNwci5hZGRDaGlsZCh0aGlzLmNoZXNzQm9hcmQpOy8v5re75Yqg5a2Q6IqC54K5XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDosIPoioLlhajlsYDnvKnmlL7mr5TvvIzlj6rog73kvZznlKjkuo7miYDmnIlhY3Rvcua4suafk+WujOaIkOWQjuOAgeaJgOacieeJueaViOW4p+W+queOr+aJp+ihjOWJje+8jOWQpuWImeaciemdnuiHtOWRveaAp2J1Z1xyXG4gICAgICogQHBhcmFtIHZhbHVlIOWFqOWxgOWPr+inhuiKgueCuee8qeaUvuavlFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVzY2FsZSh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2UuZXZlbnQoXCJSRVNDQUxFXCIsW3ZhbHVlXSk7Ly/lj5HluIPosIPlj4Lkuovku7bjgIHnvKnmlL7mr5Tlj4LmlbBcclxuXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog5riy5p+TYWN0b3Llr7nosaFcclxuICAgICAqIEBwYXJhbSBib3VuZCBhY3RvclxyXG4gICAgICogQHBhcmFtIHBvcyDlnZDmoIfvvIjkuIDlvovmjInlhajlsYDnvKnmlL7mr5TkuLox6K6h566X77yM5riy5p+T5Zmo5Lya5qC55o2u5YWo5bGA57yp5pS+5q+U6Ieq5Yqo5a6M5oiQ57yp5pS+5riy5p+T77yJXHJcbiAgICAgKiBAcGFyYW0gc2l6IOWuvemrmO+8iOm7mOiupDEwLDEw77yJ77yI5LiA5b6L5oyJ5YWo5bGA57yp5pS+5q+U5Li6Meiuoeeul++8jOa4suafk+WZqOS8muagueaNruWFqOWxgOe8qeaUvuavlOiHquWKqOWujOaIkOe8qeaUvua4suafk++8iVxyXG4gICAgICogQHBhcmFtIGZhdGhlciDniLbnu5jlm77oioLngrnvvIjpu5jorqTkuLrmo4vnm5jnu5jlm77oioLngrnvvIlcclxuICAgICAqIEBwYXJhbSBjb2xvciDpopzoibLvvIjpu5jorqTkuLrnu7/vvIlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpc3BsYXlBY3Rvcihib3VuZDogU3ltYm9saXplZCwgcG9zOiBWZWMyLCBzaXo6VmVjMiA9IG5ldyBWZWMyKDEwLDEwKSwgY29sb3I6c3RyaW5nID0gXCIjMDBmZjAwXCIsIGZhdGhlcjpDdXN0b21pemVkU3ByaXRlID0gUGVyZm9ybWFuY2VDZW50cmUuaW5zdGFuY2UuY2hlc3NCb2FyZCk6IHZvaWQge1xyXG4gICAgICAgIGxldCB0bXBBY3RvcjpBY3RvclJVID0gbmV3IEFjdG9yUlUoYm91bmQuc3ltYm9sLHBvcyxzaXosZmF0aGVyLGNvbG9yKTsvL+a4suafk2FjdG9yXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog5re75YqgL+S/ruaUuei/m+W6puadoVxyXG4gICAgICog6buY6K6k6L+b5bqm5p2h6ZW/MzDvvIzlrr0177yI6buY6K6k6L+b5bqm5p2h5a696auY5peg5rOV6YCa6L+H5pys5Ye95pWw5L+u5pS577yM5aaC6ZyA5L+u5pS56K+35YmN5b6AIC5cXFJob2RlIElzbGFuZFxcc3JjXFxSaG9kZXNfR2FtZVxcUGVyZm9ybWFuY2VfTW9kdWxlXFxTeW1ib2xpemVkUmVuZGVyLnRzXFxBY3RvclJVKVxyXG4gICAgICog6L+b5bqm6aKc6Imy5Li654Gw77yM5aaC6ZyA5L+u5pS56K+35YmN5b6AIC5cXFJob2RlIElzbGFuZFxcc3JjXFxSaG9kZXNfR2FtZVxcUGVyZm9ybWFuY2VfTW9kdWxlXFxBY3RvckNvbXBvbmVudC50c1xcQmFyXHJcbiAgICAgKiBAcGFyYW0gYm91bmQgYWN0b3JcclxuICAgICAqIEBwYXJhbSBiYXJfc3ltYk51bSDnrKzlh6DmoLnov5vluqbmnaHvvIjlp4vkuo4w77yJIFxyXG4gICAgICogQHBhcmFtIHBlcmNlbnRhZ2Ug6K+l6L+b5bqm5p2h6L+b5bqmXHJcbiAgICAgKiBAcGFyYW0gY29sb3Ig6K+l6L+b5bqm5p2h6IOM5pmv6aKc6ImyXHJcbiAgICAgKiBAcGFyYW0geCDov5vluqbmnaHplb/luqbvvIjkuIDlvovmjInlhajlsYDnvKnmlL7mr5TkuLox6K6h566X77yM5riy5p+T5Zmo5Lya5qC55o2u5YWo5bGA57yp5pS+5q+U6Ieq5Yqo5a6M5oiQ57yp5pS+5riy5p+T77yJXHJcbiAgICAgKiBAcGFyYW0geSDov5vluqbmnaHpq5jluqbvvIjkuIDlvovmjInlhajlsYDnvKnmlL7mr5TkuLox6K6h566X77yM5riy5p+T5Zmo5Lya5qC55o2u5YWo5bGA57yp5pS+5q+U6Ieq5Yqo5a6M5oiQ57yp5pS+5riy5p+T77yJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlZGl0QmFyKGJvdW5kOiBTeW1ib2xpemVkLCBiYXJfc3ltYk51bTpudW1iZXIgPSAwLCBwZXJjZW50YWdlOiBudW1iZXIgPSAxLCBjb2xvcjogc3RyaW5nID0gXCIjMDBmZjAwXCIsIHg/Om51bWJlciwgeT86bnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHRtcEFjdG9yOkFjdG9yUlUgPSBBY3RvckJveC5nZXQoYm91bmQuc3ltYm9sLmRhdGEpOy8v6I635Y+W5bey5riy5p+T55qEYWN0b3JSVeWvueixoVxyXG4gICAgICAgIGlmKHRtcEFjdG9yLmdldEJhcihiYXJfc3ltYk51bSkgPT09ICB1bmRlZmluZWQpey8v5aaC5p6c5a+55bqU6L+b5bqm5p2h5LiN5a2Y5ZyoXHJcbiAgICAgICAgICAgIHRtcEFjdG9yLmFkZEV4dEJhcihjb2xvcixiYXJfc3ltYk51bSxwZXJjZW50YWdlLHgseSk7Ly/moLnmja7ovpPlhaXlj4LmlbDmlrDlu7rov5vluqbmnaFcclxuXHJcbiAgICAgICAgfWVsc2V7Ly/lpoLlr7nlupTov5vluqbmnaHlt7LlrZjlnKhcclxuICAgICAgICAgICAgdG1wQWN0b3IuZWRpdEJhcihiYXJfc3ltYk51bSxwZXJjZW50YWdlKTsvL+S/ruaUueivpei/m+W6puadoeeZvuWIhuavlFxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5HluIPmlLvlh7vkuovku7ZcclxuICAgICAqIOatpOaWueazleiwg+eUqOWQjuivt+WLv+S/ruaUueWFqOWxgOe8qeaUvuavlO+8ge+8gVxyXG4gICAgICogQHBhcmFtIGZyb20g5Y+R5Yqo5pS75Ye76IqC54K5XHJcbiAgICAgKiBAcGFyYW0gdG8g6YGt5Y+X5omT5Ye76IqC54K5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZWZhdWx0QXRrRWZmZWN0KGZyb206IFN5bWJvbGl6ZWQsIHRvOiBTeW1ib2xpemVkKTogdm9pZCB7XHJcbiAgICAgICAgLy/miZPlh7vkuovku7bjgIHlj5HliqjmlLvlh7voioLngrnlkozpga3lj5fmlLvlh7voioLngrnlj4LmlbBcclxuICAgICAgICBBY3RvckJveC5nZXQoZnJvbS5zeW1ib2wuZGF0YSkuaGl0KHRvKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWPkeW4g+WPl+S8pOS6i+S7tlxyXG4gICAgICog5q2k5pa55rOV6LCD55So5ZCO6K+35Yu/5L+u5pS55YWo5bGA57yp5pS+5q+U77yB77yBXHJcbiAgICAgKiBAcGFyYW0gYm91bmQg5Y+X5Lyk6IqC54K5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZWZhdWx0RG1nRWZmZWN0KGJvdW5kOiBTeW1ib2xpemVkKTogdm9pZCB7XHJcbiAgICAgICAgLy/lj5fkvKTkuovku7blkozlj5fkvKToioLngrnlj4LmlbBcclxuICAgICAgICBBY3RvckJveC5nZXQoYm91bmQuc3ltYm9sLmRhdGEpLmRhbWFnZSgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmUgOavgeWvueixoe+8iOm7mOiupOmUgOavge+8iVxyXG4gICAgICogQHBhcmFtIGJvdW5kIOWvueixoVxyXG4gICAgICogQHBhcmFtIHBvcyDlnZDmoIfvvIjkuIDlvovmjInlhajlsYDnvKnmlL7mr5TkuLox6K6h566X77yM5riy5p+T5Zmo5Lya5qC55o2u5YWo5bGA57yp5pS+5q+U6Ieq5Yqo5a6M5oiQ57yp5pS+5riy5p+T77yJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXN0cm95QWN0b3IoYm91bmQ6IFN5bWJvbGl6ZWQsIHBvcz86IFZlYzIpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdG1wQWN0b3I6QWN0b3JSVSA9IEFjdG9yQm94LmdldChib3VuZC5zeW1ib2wuZGF0YSk7Ly/ojrflj5ZhY3RvclJV5a+56LGhXHJcbiAgICAgICAgaWYocG9zID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0bXBBY3Rvci5kZXN0b3J5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHBvcy5lcXVhbHModG1wQWN0b3IuZ2V0UG9zVmVjKCkpKXtcclxuICAgICAgICAgICAgdG1wQWN0b3IuZGVzdG9yeSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+mUgOavgWFjdG9yUlXlr7nosaFcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWcqGFjdG9y6Lqr5LiK5riy5p+T5paH5pysXHJcbiAgICAgKiDku4XlvZPlhajlsYDmlofmnKzmmL7npLrlvIDlhbNzd2l0Y2hIb3ZlclRleHTvvIjvvInlvIDlkK/ml7bmiY3kvJrmuLLmn5PmlofmnKzvvIzlvIDlhbPpu5jorqTlhbPpl61cclxuICAgICAqIEBwYXJhbSBib3VuZCBhY3RvclxyXG4gICAgICogQHBhcmFtIGNvbnRlbnQg5paH5pysXHJcbiAgICAgKiBAcGFyYW0gcG9zIOaWh+acrOi1t+Wni+WdkOagh++8iOS4gOW+i+aMieWFqOWxgOe8qeaUvuavlOS4ujHorqHnrpfvvIzmuLLmn5PlmajkvJrmoLnmja7lhajlsYDnvKnmlL7mr5Toh6rliqjlrozmiJDnvKnmlL7muLLmn5PvvIlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHdyaXRlKGJvdW5kOiBTeW1ib2xpemVkLCBjb250ZW50OiBzdHJpbmcsIHBvcz86IFZlYzIpOiB2b2lkIHtcclxuICAgICAgICBBY3RvckJveC5nZXQoYm91bmQuc3ltYm9sLmRhdGEpLmdldFRleHQoKS5zZXRUZXh0KGNvbnRlbnQpOy8v5L+u5pS5QWN0b3JSVeaWh+acrFxyXG4gICAgICAgIEFjdG9yQm94LmdldChib3VuZC5zeW1ib2wuZGF0YSkuZ2V0VGV4dCgpLnNldFBvcyhwb3MpOy8v5L+u5pS56K+l5paH5pys5L2N572uXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlhajlsYDmlofmnKzmmL7npLrlvIDlhbPvvIjpu5jorqTlhbPpl63vvIlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN3aXRjaEhvdmVyVGV4dCgpOiB2b2lkIHtcclxuICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5ldmVudChFdmVudENlbnRyZS5FVHlwZS5QRVJGT1JNQU5DRV9URVhUX1NXSVRDSCgpKTsvL+WPkeW4g+aWh+acrOW8gOWFs+S6i+S7tu+8jOaMiemSruaWh+acrOS4jeWPl+W9seWTjVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog56e75YqoYWN0b3Llr7nosaFcclxuICAgICAqIEBwYXJhbSBib3VuZCBhY3RvclxyXG4gICAgICogQHBhcmFtIHBvcyDnm67moIflnZDmoIfvvIjkuIDlvovmjInlhajlsYDnvKnmlL7mr5TkuLox6K6h566X77yM5riy5p+T5Zmo5Lya5qC55o2u5YWo5bGA57yp5pS+5q+U6Ieq5Yqo5a6M5oiQ57yp5pS+5riy5p+T77yJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtb3ZlKGJvdW5kOiBTeW1ib2xpemVkLCBwb3M6IFZlYzIpOiB2b2lkIHtcclxuICAgICAgICBBY3RvckJveC5nZXQoYm91bmQuc3ltYm9sLmRhdGEpLnJlbG9jYXRlKHBvcyk7Ly/np7vliqhBY3RvclJV5a+56LGh5Z2Q5qCHXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWcqGFjdG9y6Lqr5LiK5re75Yqg5oyJ6ZKuXHJcbiAgICAgKiDmr4/kuKphY3RvclJV6buY6K6k5a2Y5ZyoMuS4quaMiemSru+8iOeCueWHu2FjdG9yUlXoioLngrnljbPlj6/mmL7npLrvvInvvIzlr7nlupTmkqTpgIDlkozmioDog73jgILor6XmjInpkq7lnZDmoIfjgIHlrr3pq5jjgIHpopzoibLjgIHlkI3lrZfkuI3lj6/kv67mlLnvvIzlip/og73pnIDku47lpJbpg6jmt7vliqBcclxuICAgICAqIEBwYXJhbSBib3VuZCBhY3RvclxyXG4gICAgICogQHBhcmFtIG51bSDmjInpkq7nvJblj7fvvIgwLDHkuLrpu5jorqTmjInpkq7vvIzpu5jorqTmjInpkq7kuI3oh6rluKbku7vkvZXlip/og73vvIzpnIDmiYvliqjmt7vliqDvvIlcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayDngrnlh7vmjInpkq7lkI7osIPnlKjnmoTlh73mlbBcclxuICAgICAqIEBwYXJhbSB0ZXh0IOaYvuekuuWcqOaMiemSruS4iueahOaWh+acrO+8iOm7mOiupOaYvuekuuS4lOaXoOazleS/ruaUue+8iVxyXG4gICAgICogQHBhcmFtIHBvcyDmjInpkq7otbflp4vlnZDmoIfvvIjkuIDlvovmjInlhajlsYDnvKnmlL7mr5TkuLox6K6h566X77yM5riy5p+T5Zmo5Lya5qC55o2u5YWo5bGA57yp5pS+5q+U6Ieq5Yqo5a6M5oiQ57yp5pS+5riy5p+T77yJXHJcbiAgICAgKiBAcGFyYW0gc2l6ZSDmjInpkq7lpKflsI/vvIjkuIDlvovmjInlhajlsYDnvKnmlL7mr5TkuLox6K6h566X77yM5riy5p+T5Zmo5Lya5qC55o2u5YWo5bGA57yp5pS+5q+U6Ieq5Yqo5a6M5oiQ57yp5pS+5riy5p+T77yJXHJcbiAgICAgKiBAcGFyYW0gY29sb3Ig5oyJ6ZKu6aKc6ImyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhdHRhY2hCdXR0b24oYm91bmQ6IFN5bWJvbGl6ZWQsbnVtOm51bWJlciwgY2FsbGJhY2s6IEZ1bmN0aW9uLCB0ZXh0Pzogc3RyaW5nLCBwb3M/OiBWZWMyLCBzaXplPzogVmVjMiwgY29sb3I/OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdG1wQWN0OkFjdG9yUlUgPSBBY3RvckJveC5nZXQoYm91bmQuc3ltYm9sLmRhdGEpOy8v6I635Y+WQWN0b3JSVeWvueixoVxyXG4gICAgICAgIGlmKHRtcEFjdC5nZXRCdXR0b24obnVtKSA9PT0gdW5kZWZpbmVkKXsvL+WmguaenOWvueW6lOaMiemSruS4jeWtmOWcqFxyXG4gICAgICAgICAgICBpZihwb3MgPT09IHVuZGVmaW5lZCl7Ly/lpoLmnpzkuI3ovpPlhaXmjIflrprlnZDmoIdcclxuICAgICAgICAgICAgICAgIHRtcEFjdC5hZGRFeHRyYUJ1dHRvbnNBdERlZkxvY2F0aW9uKHRleHQsbnVtLGNvbG9yLGNhbGxiYWNrKTsvL+WcqOm7mOiupOS9jee9ruaWsOW7uuaMiemSrlxyXG4gICAgICAgICAgICB9ZWxzZXsvL+WmguaenOi+k+WFpeaMh+WumuWdkOagh1xyXG4gICAgICAgICAgICAgICAgdG1wQWN0LmFkZEV4dHJhQnV0dG9uQXROb0RlZkxvY2F0aW9uKHRleHQsbnVtLGNhbGxiYWNrLHBvcyxzaXplLGNvbG9yKTsvL+WcqOaMh+WumuS9jee9ruaWsOW7uuaMiemSrlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7Ly/lpoLmnpzlr7nlupTmjInpkq7lrZjlnKhcclxuICAgICAgICAgICAgdG1wQWN0LmdldEJ1dHRvbihudW0pLnNldEZ1bmMoY2FsbGJhY2spOy8v6L6T5YWl5Yqf6IO95Ye95pWwXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSIsIi8vYXV0aG9yIE5hMkN1QzRPOFxyXG5cclxuaW1wb3J0IEN1c3RvbWl6ZWRTcHJpdGUgZnJvbSBcIi4vY3VzdG9taXplZFNwclwiO1xyXG5pbXBvcnQgeyBBY3RvckJveCB9IGZyb20gXCIuL29iamJveFwiO1xyXG5pbXBvcnQgeyBCYXIsIEJ1dHRvbiAsIFRleHQgfSBmcm9tIFwiLi9BY3RvckNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBNeVN5bWJvbCwgU3ltYm9saXplZCB9IGZyb20gXCIuLi8uLi8uLi9GaXgvRml4U3ltYm9sXCI7XHJcbmltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi4vLi4vRG9kTWF0aFwiO1xyXG5pbXBvcnQgeyBLVlBhaXIgfSBmcm9tIFwiLi4vLi4vRG9kRGF0YVN0cnVjdHVyZVwiO1xyXG5pbXBvcnQgeyBFdmVudENlbnRyZSB9IGZyb20gXCIuLi8uLi8uLi9FdmVudC9FdmVudENlbnRyZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjdG9yUlV7XHJcbiAgICBwcml2YXRlIF9pbml0UG9zOlZlYzI7Ly9hY3Rvcui1t+Wni+WdkOagh1xyXG4gICAgcHJpdmF0ZSBfaW5pdFNpemU6VmVjMjsvL2FjdG9y6LW35aeL5aSn5bCPXHJcbiAgICBwcml2YXRlIF9pbml0QmFySGVpZ2h0Om51bWJlciA9IDA7Ly/ov5vluqbmnaHlhbblrp7pq5jluqbmmoLlrZjlmahcclxuICAgIHByaXZhdGUgX3BvczpWZWMyOy8v5qC55o2u5YWo5bGA57yp5pS+5q+U5o2i566X5ZCO55qE5Y+v6KeB5Z2Q5qCHXHJcbiAgICBwcml2YXRlIF9zaXplOlZlYzI7Ly/moLnmja7lhajlsYDnvKnmlL7mr5TmjaLnrpflkI7nmoTlj6/op4HlpKflsI9cclxuICAgIHByaXZhdGUgX3NjYWxlOm51bWJlciA9IDE7Ly/lhajlsYDnvKnmlL7mr5RcclxuICAgIHByaXZhdGUgX3N5bWI6TXlTeW1ib2w7Ly9zeW1iXHJcbiAgICBwcml2YXRlIF9mYXRoZXI6Q3VzdG9taXplZFNwcml0ZTsvL+eItue7mOWbvuiKgueCuVxyXG4gICAgcHJpdmF0ZSBfc3ByOkN1c3RvbWl6ZWRTcHJpdGU7Ly/mnKznu5jlm77oioLngrlcclxuICAgIHByaXZhdGUgX2JhclBhaXI6S1ZQYWlyPEJhcj4gPSBuZXcgS1ZQYWlyPEJhcj4oKTsvL+i/m+W6puadoemUruWAvOe7hFxyXG4gICAgcHJpdmF0ZSBfdGV4dDpUZXh0Oy8v6buY6K6k5paH5pysXHJcbiAgICBwcml2YXRlIF9kZWZCdXR0b25TaG93ZWQ6Ym9vbGVhbiA9IGZhbHNlOy8v5piv5ZCm5pi+56S66buY6K6k5oyJ6ZKu77yM6buY6K6k5Li65ZCmXHJcbiAgICBwcml2YXRlIF9idXR0b25QYWlyOktWUGFpcjxCdXR0b24+ID0gbmV3IEtWUGFpcjxCdXR0b24+KCk7XHJcbiAgICBwcml2YXRlIF9idXR0b25IZWlnaHQ6bnVtYmVyOy8v5oyJ6ZKu6auY5bqm5pqC5a2Y5ZmoXHJcbiAgICBwcml2YXRlIF9kYW1hZ2U6Q3VzdG9taXplZFNwcml0ZTsvL+WPl+S8pOeJueaViOaYvuekuuiKgueCuVxyXG4gICAgcHJpdmF0ZSBfdHJhbnNwYXJlbmN5Om51bWJlciA9IDE7Ly/lj5fkvKTnibnmlYjlj4LmlbDmmoLlrZjlmahcclxuICAgIHByaXZhdGUgX2Zpc3Q6Q3VzdG9taXplZFNwcml0ZTsvL+aUu+WHu+eJueaViOaYvuekuuiKgueCuVxyXG4gICAgcHJpdmF0ZSBfbW92ZVBlcmNlbnRhZ2U6bnVtYmVyID0gMDsvL+aUu+WHu+eJueaViOWPguaVsOaaguWtmOWZqFxyXG4gICAgcHVibGljIF9jZW50ZXJQb3M6VmVjMjsvL+S4reW/g+WdkOagh1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlclVuaXTmnoTpgKDlmahcclxuICAgICAqIEBwYXJhbSBzeW1iIHN5bWJcclxuICAgICAqIEBwYXJhbSBwb3Mg6LW35aeL5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gc2l6ZSDlrr3pq5hcclxuICAgICAqIEBwYXJhbSBmYXRoZXIg54i257uY5Zu+6IqC54K5XHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHN5bWI6TXlTeW1ib2wsIHBvczpWZWMyLCBzaXplOlZlYzIsIGZhdGhlcjpDdXN0b21pemVkU3ByaXRlLCBjb2xvcjpzdHJpbmcgPSBcIiMwMGZmZmZcIiwgc2NhbGU6bnVtYmVyID0gMSl7XHJcbiAgICAgICAgdGhpcy5fZmF0aGVyID0gZmF0aGVyOy8v54i257uY5Zu+6IqC54K5XHJcbiAgICAgICAgdGhpcy5faW5pdFBvcyA9IHBvczsvL+i1t+Wni+WdkOagh1xyXG4gICAgICAgIHRoaXMuX2luaXRTaXplID0gc2l6ZTsvL+i1t+Wni+WuvemrmFxyXG4gICAgICAgIHRoaXMuX3NwciA9IG5ldyBDdXN0b21pemVkU3ByaXRlKCk7Ly/mlrDlu7rnu5jlm77oioLngrlcclxuICAgICAgICB0aGlzLl9mYXRoZXIuYWRkQ2hpbGQodGhpcy5fc3ByKTsvL+a3u+WKoOWtkOiKgueCuVxyXG4gICAgICAgIHRoaXMuc2V0RGF0YShzeW1iLG5ldyBWZWMyKHRoaXMuX2luaXRQb3MueCp0aGlzLl9zY2FsZSx0aGlzLl9pbml0UG9zLnkqdGhpcy5fc2NhbGUpLG5ldyBWZWMyKHRoaXMuX2luaXRTaXplLngqdGhpcy5fc2NhbGUsIHRoaXMuX2luaXRTaXplLnkqdGhpcy5fc2NhbGUpLGNvbG9yKTsvL+iuvue9rue7mOWbvuiKgueCueWPguaVsFxyXG4gICAgICAgIEFjdG9yQm94LmFkZCh0aGlzLHRoaXMuX3N5bWIpOy8v5bCG5pys5a+56LGh5re75Yqg5Yiw6ZSu5YC85a+5XHJcbiAgICAgICAgdGhpcy5hZGREZWZCYXIoKTsvL+a3u+WKoOm7mOiupOi/m+W6puadoVxyXG4gICAgICAgIHRoaXMuX3RleHQgPSBuZXcgVGV4dCh0aGlzLl9pbml0U2l6ZSx0aGlzLl9zY2FsZSk7Ly/mt7vliqDpu5jorqTmlofmnKxcclxuICAgICAgICB0aGlzLl90ZXh0LnNldFN5bWIodGhpcy5fc3ltYik7Ly9cclxuICAgICAgICB0aGlzLl9idXR0b25IZWlnaHQgPSB0aGlzLl9pbml0U2l6ZS55Oy8vXHJcbiAgICAgICAgdGhpcy5fc3ByLmFkZENoaWxkKHRoaXMuX3RleHQpOy8v6buY6K6k5paH5pys572u5LqO5a2Q6IqC54K5XHJcbiAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2Uub24oRXZlbnRDZW50cmUuRVR5cGUuUEVSRk9STUFOQ0VfUkVTQ0FMRSgpLHRoaXMsdGhpcy5yZVNjYWxlKTsvL+ebkeWQrOWFqOWxgOe8qeaUvuavlFxyXG4gICAgICAgIHRoaXMuX3Nwci5vbihMYXlhLkV2ZW50Lk1PVVNFX09WRVIsdGhpcyx0aGlzLm1vdXNlT3Zlcik7Ly9cclxuICAgICAgICB0aGlzLl9zcHIub24oTGF5YS5FdmVudC5NT1VTRV9PVVQsdGhpcyx0aGlzLm1vdXNlT3V0KTsvL1xyXG4gICAgICAgIHRoaXMuX3Nwci5vbihMYXlhLkV2ZW50Lk1PVVNFX1VQLHRoaXMsdGhpcy5zaG93RGVmYXVsdEJvdHRvbnMpOy8vXHJcbiAgICAgICAgdGhpcy5fZGFtYWdlID0gbmV3IEN1c3RvbWl6ZWRTcHJpdGUoKTsvL1xyXG4gICAgICAgIHRoaXMuX3Nwci5hZGRDaGlsZCh0aGlzLl9kYW1hZ2UpOy8vXHJcbiAgICAgICAgdGhpcy5fZGFtYWdlLnNldFBhcmFtKDAsMCx0aGlzLl9zaXplLngsdGhpcy5fc2l6ZS55LFwiI2Y5MTUyNlwiKTsvL1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZS5sb2NhdGlvbkFuZFNpemUoKTsvL1xyXG4gICAgICAgIHRoaXMuYWRkRGVmQnV0dG9ucygpOy8vXHJcbiAgICAgICAgdGhpcy5fZmlzdCA9IG5ldyBDdXN0b21pemVkU3ByaXRlKCk7Ly9cclxuICAgICAgICB0aGlzLl9maXN0LnNldFBhcmFtKHRoaXMuX2NlbnRlclBvcy54LHRoaXMuX2NlbnRlclBvcy55LDE2LDE2LFwiI0YzQzI0NlwiKTsvL1xyXG4gICAgICAgIHRoaXMuX2Zpc3QubG9jYXRpb25BbmRTaXplKCk7Ly9cclxuICAgICAgICB0aGlzLl9maXN0LnpPcmRlciA9IDI7Ly9cclxuICAgICAgICB0aGlzLl9zcHIuYWRkQ2hpbGQodGhpcy5fZmlzdCk7Ly9cclxuICAgICAgICBcclxuICAgICAgICBcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57lvZPliY3lj6/op4boioLngrnlnZDmoIdcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjdXJQb3MoKTpWZWMye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wb3M7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+R5Yqo5omT5Ye754m55pWIXHJcbiAgICAgKiBAcGFyYW0gdG8g5omT5Ye755uu5qCHXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoaXQodG86U3ltYm9saXplZCk6dm9pZHtcclxuICAgICAgICAvLyB0aGlzLl9maXN0LmdyYXBoaWNzLnNhdmUoKTtcclxuICAgICAgICB0aGlzLl9maXN0LmNlbnRyYWxTaGlmdENvbG9yZWQoKTtcclxuICAgICAgICBsZXQgdG1wVmVjOlZlYzIgPSBuZXcgVmVjMihBY3RvckJveC5nZXQodG8uc3ltYm9sLmRhdGEpLmN1clBvcygpLngtdGhpcy5fcG9zLngsQWN0b3JCb3guZ2V0KHRvLnN5bWJvbC5kYXRhKS5jdXJQb3MoKS55LXRoaXMuX3Bvcy55KTtcclxuICAgICAgICBsZXQgZnVuOkZ1bmN0aW9uID0gKHRhcmdldDpWZWMyKSA9PntcclxuICAgICAgICAgICAgaWYodGhpcy5fbW92ZVBlcmNlbnRhZ2UgPiAxKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21vdmVQZXJjZW50YWdlID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Zpc3QuZ3JhcGhpY3MuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuX2Zpc3QuZ3JhcGhpY3MucmVzdG9yZSgpO1xyXG4gICAgICAgICAgICAgICAgTGF5YS50aW1lci5jbGVhcih0aGlzLGZ1bik7XHJcbiAgICAgICAgICAgICAgICBBY3RvckJveC5nZXQodG8uc3ltYm9sLmRhdGEpLmRhbWFnZSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGN1ckxvY2FjdGlvbjpWZWMyID0gbmV3IFZlYzIoICgxNisgdGFyZ2V0LngpKnRoaXMuX21vdmVQZXJjZW50YWdlLCgxNisgdGFyZ2V0LnkpKnRoaXMuX21vdmVQZXJjZW50YWdlKTtcclxuICAgICAgICAgICAgdGhpcy5fbW92ZVBlcmNlbnRhZ2UgKz0gMC4wMjtcclxuICAgICAgICAgICAgdGhpcy5fZmlzdC5yZWxvY2F0ZShjdXJMb2NhY3Rpb24pO1xyXG4gICAgICAgICAgICB0aGlzLl9maXN0LnJvdGF0aW9uID0gMjAwMCAqIHRoaXMuX21vdmVQZXJjZW50YWdlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTGF5YS50aW1lci5sb29wKDIwLHRoaXMsZnVuLFt0bXBWZWNdKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5Hliqjlj5fkvKTnibnmlYhcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRhbWFnZSgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlLnNldFBhcmFtKDAsMCx0aGlzLl9zaXplLngsdGhpcy5fc2l6ZS55KTtcclxuICAgICAgICB0aGlzLl9kYW1hZ2UubG9jYXRpb25BbmRTaXplKCk7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlLmNoYW5nZUNvbG9yKCk7XHJcbiAgICAgICAgbGV0IGZ1bjpGdW5jdGlvbiA9ICgpPT57XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX3RyYW5zcGFyZW5jeSA8IDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGFtYWdlLmdyYXBoaWNzLmNsZWFyKCk7IFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fdHJhbnNwYXJlbmN5ID0gMTtcclxuICAgICAgICAgICAgICAgIExheWEudGltZXIuY2xlYXIodGhpcyxmdW4pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLl90cmFuc3BhcmVuY3kgLT0gMC4wMztcclxuICAgICAgICAgICAgdGhpcy5fZGFtYWdlLmFscGhhID0gdGhpcy5fdHJhbnNwYXJlbmN5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBMYXlhLnRpbWVyLmxvb3AoMjAsdGhpcyxmdW4pO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuLLmn5Ppu5jorqTmjInpkq5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzaG93RGVmYXVsdEJvdHRvbnMoKTp2b2lke1xyXG4gICAgICAgIGlmKHRoaXMuX2RlZkJ1dHRvblNob3dlZCA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICB0aGlzLl9zcHIuYWRkQ2hpbGQodGhpcy5fYnV0dG9uUGFpci5yZWFkKDArXCJcIikuZ2V0U3ByKCkpO1xyXG4gICAgICAgICAgICB0aGlzLl9zcHIuYWRkQ2hpbGQodGhpcy5fYnV0dG9uUGFpci5yZWFkKDErXCJcIikuZ2V0U3ByKCkpO1xyXG4gICAgICAgICAgICB0aGlzLl9kZWZCdXR0b25TaG93ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLl9zcHIucmVtb3ZlQ2hpbGQodGhpcy5fYnV0dG9uUGFpci5yZWFkKDArXCJcIikuZ2V0U3ByKCkpO1xyXG4gICAgICAgICAgICB0aGlzLl9zcHIucmVtb3ZlQ2hpbGQodGhpcy5fYnV0dG9uUGFpci5yZWFkKDErXCJcIikuZ2V0U3ByKCkpO1xyXG4gICAgICAgICAgICB0aGlzLl9kZWZCdXR0b25TaG93ZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog5Y+R5biD6byg5qCH6L+b5YWl5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbW91c2VPdmVyKCk6dm9pZHtcclxuICAgICAgICB0aGlzLl90ZXh0LnNldFN3aXRjaE9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5HluIPpvKDmoIfnprvlvIDkuovku7ZcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBtb3VzZU91dCgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fdGV4dC5zZXRTd2l0Y2hPZmYoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmHjeiuvue8qeaUvuavlFxyXG4gICAgICogQHBhcmFtIHZhbHVlIOaWsOWFqOWxgOe8qeaUvuavlFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlU2NhbGUodmFsdWU6bnVtYmVyKTp2b2lke1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3NjYWxlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHRoaXMuX3N5bWIsdGhpcy5faW5pdFBvcyx0aGlzLl9pbml0U2l6ZSx0aGlzLl9zcHIuZ2V0Q29sb3IoKSk7XHJcbiAgICAgICAgdGhpcy5zZXRDb2xvcigpO1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZS5zZXRQYXJhbSgwLDAsdGhpcy5faW5pdFNpemUueCp0aGlzLl9zY2FsZSx0aGlzLl9pbml0U2l6ZS55KnRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9kYW1hZ2UubG9jYXRpb25BbmRTaXplKCk7XHJcbiAgICAgICAgXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5pysQVJV55qE5ZCE6aG55Y+C5pWwXHJcbiAgICAgKiBAcGFyYW0gc3ltYiBzeW1iXHJcbiAgICAgKiBAcGFyYW0gcG9zIOi1t+Wni+WdkOagh1xyXG4gICAgICogQHBhcmFtIHNpemUg5aSn5bCPXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXREYXRhKHN5bWI6TXlTeW1ib2wsIHBvczpWZWMyLCBzaXplOlZlYzIsY29sb3I6c3RyaW5nKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3N5bWIgPSBzeW1iO1xyXG4gICAgICAgIHRoaXMuX3BvcyA9IG5ldyBWZWMyKHBvcy54KnRoaXMuX3NjYWxlLHBvcy55KnRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9zaXplID0gbmV3IFZlYzIoc2l6ZS54KnRoaXMuX3NjYWxlLHNpemUueSp0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fc3ByLnNldFBhcmFtKHRoaXMuX3Bvcy54LHRoaXMuX3Bvcy55LHRoaXMuX3NpemUueCx0aGlzLl9zaXplLnksY29sb3IpO1xyXG4gICAgICAgIHRoaXMuc2V0Q29sb3IoKTtcclxuICAgICAgICB0aGlzLl9zcHIubG9jYXRpb25BbmRTaXplKCk7XHJcbiAgICAgICAgdGhpcy5fY2VudGVyUG9zID0gbmV3IFZlYzIodGhpcy5fc2l6ZS54LzIsdGhpcy5fc2l6ZS55LzIpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIGNvbG9yIOiuvue9ruminOiJslxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0Q29sb3IoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3Nwci5jaGFuZ2VDb2xvcigpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHBvcyDph43mlrDorr7nva7otbflp4vlnZDmoIfvvIjkuI3lj5fnvKnmlL7mr5TlvbHlk43vvIlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbG9jYXRlKHBvczpWZWMyKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3BvcyA9IG5ldyBWZWMyKHBvcy54KnRoaXMuX3NjYWxlLHBvcy55KnRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9pbml0UG9zID0gcG9zLmNsb25lKCk7XHJcbiAgICAgICAgdGhpcy5fc3ByLnJlbG9jYXRlKHBvcyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pGn5q+B5pysQVJVXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZXN0b3J5KCk6dm9pZHtcclxuICAgICAgICB0aGlzLl9zcHIuZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5pysQVJV55qE6LW35aeL5Z2Q5qCH77yI5LiN5Y+X57yp5pS+5q+U5b2x5ZON77yJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRQb3NWZWMoKTpWZWMye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbml0UG9zO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluacrEFSVeeahOm7mOiupOaWh+acrOWvueixoVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0VGV4dCgpOlRleHR7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RleHQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5re75Yqg6buY6K6k6L+b5bqm5p2hXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGREZWZCYXIoKTp2b2lke1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX2luaXRCYXJIZWlnaHQgPSAwO1xyXG4gICAgICAgIGxldCB0bXA6QmFyID0gbmV3IEJhcigwLFwiIzAwZmZmZlwiLG5ldyBWZWMyKDMwLDUpLG5ldyBWZWMyKDAsdGhpcy5faW5pdEJhckhlaWdodCAtIDYpLHRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9zcHIuYWRkQ2hpbGQodG1wLmdldEJhY2tTcHIoKSk7XHJcbiAgICAgICAgdGhpcy5fYmFyUGFpci5lZGl0KFwiYmFyXzBcIix0bXApO1xyXG4gICAgICAgIHRoaXMuX2luaXRCYXJIZWlnaHQgPSB0aGlzLl9pbml0QmFySGVpZ2h0IC0gdG1wLmdldEhlaWdodCgpIC0gMTtcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluacrEFSVeeahOaMh+Wumui/m+W6puadoVxyXG4gICAgICogQHBhcmFtIG51bSDov5vluqbmnaHku6Plj7dcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEJhcihudW06bnVtYmVyKTpCYXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JhclBhaXIucmVhZChgYmFyXyR7bnVtfWApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5re75Yqg6ZmE5Yqg6L+b5bqm5p2hXHJcbiAgICAgKiBAcGFyYW0gYmFja0dyb3VuZENvbG9yIOiuvue9ruaWsOWinui/m+W6puadoeminOiJslxyXG4gICAgICogQHBhcmFtIHN5bWIg6K6+572u5paw5aKe6L+b5bqm5p2h5Luj5Y+3XHJcbiAgICAgKiBAcGFyYW0geCDlrr3luqZcclxuICAgICAqIEBwYXJhbSB5IOmrmOW6plxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkRXh0QmFyKGJhY2tHcm91bmRDb2xvcjpzdHJpbmcsc3ltYjpudW1iZXIscGVyY2VudGFnZTpudW1iZXIseDpudW1iZXIgPSAzMCx5Om51bWJlciA9IDUpOnZvaWR7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHRtcEJhcjpCYXIgPSBuZXcgQmFyKHN5bWIsYmFja0dyb3VuZENvbG9yLG5ldyBWZWMyKHgseSksbmV3IFZlYzIoMCx0aGlzLl9pbml0QmFySGVpZ2h0IC0geSAtIDEpLHRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9zcHIuYWRkQ2hpbGQodG1wQmFyLmdldEJhY2tTcHIoKSk7XHJcbiAgICAgICAgdGhpcy5fYmFyUGFpci5lZGl0KGBiYXJfJHtzeW1ifWAsdG1wQmFyKTtcclxuICAgICAgICB0aGlzLl9pbml0QmFySGVpZ2h0ID0gdGhpcy5faW5pdEJhckhlaWdodCAtIHRtcEJhci5nZXRIZWlnaHQoKSAtIDE7XHJcbiAgICAgICAgdG1wQmFyLnBlcmNlbnRhZ2UgPSBwZXJjZW50YWdlO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkv67mlLnlt7LmnInov5vluqbmnaFcclxuICAgICAqIEBwYXJhbSBzeW1iIOaMh+Wumui/m+W6puadoeS7o+WPt1xyXG4gICAgICogQHBhcmFtIHBlcmNlbnRhZ2Ug5L+u5pS56L+b5bqm5p2h6L+b5bqmXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlZGl0QmFyKHN5bWI6bnVtYmVyLCBwZXJjZW50YWdlOm51bWJlcik6dm9pZHtcclxuICAgICAgICB0aGlzLl9iYXJQYWlyLnJlYWQoYGJhcl8ke3N5bWJ9YCkucGVyY2VudGFnZSA9IHBlcmNlbnRhZ2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5re75Yqg6buY6K6k5oyJ6ZKuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkRGVmQnV0dG9ucygpOnZvaWR7XHJcbiAgICAgICAgbGV0IHRtcDE6QnV0dG9uID0gbmV3IEJ1dHRvbih0aGlzLl9zeW1iLFwiUmV0cmVhdFwiLDAsbmV3IFZlYzIoIC0gMjAsdGhpcy5faW5pdFNpemUueSksbmV3IFZlYzIoMjAsMTUpLHVuZGVmaW5lZCx0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fYnV0dG9uUGFpci5lZGl0KFwiMFwiLHRtcDEpO1xyXG4gICAgICAgIGxldCB0bXAyOkJ1dHRvbiA9IG5ldyBCdXR0b24odGhpcy5fc3ltYixcIkFjdGl2YXRlX1NraWxsXCIsMCxuZXcgVmVjMih0aGlzLl9pbml0U2l6ZS54LHRoaXMuX2luaXRTaXplLnkpLG5ldyBWZWMyKDIwLDE1KSx1bmRlZmluZWQsdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX2J1dHRvblBhaXIuZWRpdChcIjFcIix0bXAyKTtcclxuICAgICAgICB0aGlzLl9idXR0b25IZWlnaHQgPSB0aGlzLl9pbml0U2l6ZS55ICsgMTY7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Zyo6buY6K6k5L2N572u5re75Yqg6aKd5aSW5oyJ6ZKuXHJcbiAgICAgKiBAcGFyYW0gbmFtZSBcclxuICAgICAqIEBwYXJhbSBudW0gXHJcbiAgICAgKiBAcGFyYW0gY29sb3IgXHJcbiAgICAgKiBAcGFyYW0gZnVuIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkRXh0cmFCdXR0b25zQXREZWZMb2NhdGlvbihuYW1lOnN0cmluZyxudW06bnVtYmVyLCBjb2xvcj86c3RyaW5nLCBmdW4/OkZ1bmN0aW9uKTp2b2lke1xyXG4gICAgICAgIGxldCB0bXBCdXQ6QnV0dG9uID0gbmV3IEJ1dHRvbih0aGlzLl9zeW1iLG5hbWUsbnVtLG5ldyBWZWMyKDAsdGhpcy5fYnV0dG9uSGVpZ2h0KSxuZXcgVmVjMigyMCwxNSksY29sb3IsdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX2J1dHRvblBhaXIuZWRpdChudW0rXCJcIix0bXBCdXQpO1xyXG4gICAgICAgIHRoaXMuX3Nwci5hZGRDaGlsZCh0bXBCdXQuZ2V0U3ByKCkpO1xyXG4gICAgICAgIHRoaXMuX2J1dHRvbkhlaWdodCArPSAxNjtcclxuICAgICAgICB0bXBCdXQuc2V0RnVuYyhmdW4pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Zyo5oyH5a6a5L2N572u5re75Yqg6aKd5aSW5oyJ6ZKuXHJcbiAgICAgKiBAcGFyYW0gbmFtZSBcclxuICAgICAqIEBwYXJhbSBudW0gXHJcbiAgICAgKiBAcGFyYW0gZnVuIFxyXG4gICAgICogQHBhcmFtIHBvcyBcclxuICAgICAqIEBwYXJhbSBzaXplIFxyXG4gICAgICogQHBhcmFtIGNvbG9yIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkRXh0cmFCdXR0b25BdE5vRGVmTG9jYXRpb24obmFtZTpzdHJpbmcsbnVtOm51bWJlcixmdW46RnVuY3Rpb24scG9zOlZlYzIsc2l6ZTpWZWMyLCBjb2xvcj86c3RyaW5nKTp2b2lke1xyXG4gICAgICAgIGxldCB0bXBCdXQ6QnV0dG9uID0gbmV3IEJ1dHRvbih0aGlzLl9zeW1iLG5hbWUsbnVtLHBvcyxzaXplLGNvbG9yLHRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9idXR0b25QYWlyLmVkaXQobnVtK1wiXCIsdG1wQnV0KTtcclxuICAgICAgICB0aGlzLl9zcHIuYWRkQ2hpbGQodG1wQnV0LmdldFNwcigpKTtcclxuICAgICAgICB0bXBCdXQuc2V0RnVuYyhmdW4pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5oyJ6ZKuXHJcbiAgICAgKiBAcGFyYW0gbnVtIOaMiemSrue8luWPt1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0QnV0dG9uKG51bTpudW1iZXIpOkJ1dHRvbntcclxuICAgICAgICByZXR1cm4gdGhpcy5fYnV0dG9uUGFpci5yZWFkKG51bStcIlwiKTtcclxuICAgIH1cclxuXHJcbn1cclxuIiwiLy9hdXRob3IgTmEyQ3VDNE84XHJcbmltcG9ydCBDdXN0b21pemVkU3ByaXRlIGZyb20gXCIuL2N1c3RvbWl6ZWRTcHJcIjtcclxuaW1wb3J0IHsgVmVjMiB9IGZyb20gXCIuLi8uLi9Eb2RNYXRoXCI7XHJcbmltcG9ydCB7IEV2ZW50Q2VudHJlIH0gZnJvbSBcIi4uLy4uLy4uL0V2ZW50L0V2ZW50Q2VudHJlXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIENoZXNzQm9hcmQgZXh0ZW5kcyBDdXN0b21pemVkU3ByaXRle1xyXG4gICAgcHJpdmF0ZSBfaW5pdFBvczpWZWMyO1xyXG4gICAgcHJpdmF0ZSBfaW5pdFNpemU6VmVjMjtcclxuICAgIHByaXZhdGUgX251bUFycjpudW1iZXJbXVtdOy8vMmQgYXJyIHdoaWNoIHJlcHJlc2VudHMgdGhlIGNoZXNzIGJvYXJkXHJcbiAgICBwcml2YXRlIF9wb3NWZWMyOlZlYzI7Ly9pbml0aWFsIGxvY2F0aW9uKHgseSlcclxuICAgIHByaXZhdGUgX3VuaXRTaXplVmVjMjpWZWMyOy8vdW5pdCBzaXplKHdpZHRoLCBoZWlnaHQpXHJcbiAgICBwcml2YXRlIF9mcm9udFNwckFycjpDdXN0b21pemVkU3ByaXRlW11bXTsvL2Zyb250IHNwclxyXG4gICAgcHJpdmF0ZSBfc2NhbGU6bnVtYmVyOy8vc2NhbGUgZm9yIHpvb21pbmdcclxuICAgIHByaXZhdGUgX2JhY2tHcm91bmRDb2xvcjpzdHJpbmc7Ly9iYWNrZ3JvdW5kIGNvbG9yXHJcbiAgICBwcml2YXRlIF9mcm9udENvbG9yOnN0cmluZzsvL2Zyb250IGNvbG9yIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qOL55uY5p6E6YCg5ZmoXHJcbiAgICAgKiBAcGFyYW0gYXJyIOS6jOe7tOaVsOe7hFxyXG4gICAgICogQHBhcmFtIHBvc1ZlYzIg6LW35aeL5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gdW5pdHNpemUg5Y2V5L2N5a696auYXHJcbiAgICAgKiBAcGFyYW0gYmFja0dyb3VuZENvbG9yIOiDjOaZr+minOiJslxyXG4gICAgICogQHBhcmFtIGZyb250Q29sb3Ig5qC85a2Q6aKc6ImyXHJcbiAgICAgKiBAcGFyYW0gZmF0aGVyIOeItue7mOWbvuiKgueCuVxyXG4gICAgICogQHBhcmFtIHNjYWxlIOe8qeaUvuavlFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihhcnI6bnVtYmVyW11bXSwgcG9zVmVjMjpWZWMyLCB1bml0c2l6ZTpWZWMyLCBiYWNrR3JvdW5kQ29sb3I6c3RyaW5nLCBmcm9udENvbG9yOnN0cmluZywgc2NhbGU6bnVtYmVyKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX251bUFyciA9IGFycjtcclxuICAgICAgICB0aGlzLl9pbml0UG9zID0gcG9zVmVjMjtcclxuICAgICAgICB0aGlzLl9pbml0U2l6ZSA9IHVuaXRzaXplO1xyXG4gICAgICAgIHRoaXMuX3NjYWxlID0gc2NhbGU7XHJcbiAgICAgICAgdGhpcy5fcG9zVmVjMiA9IG5ldyBWZWMyKHRoaXMuX2luaXRQb3MueCp0aGlzLl9zY2FsZSwgdGhpcy5faW5pdFBvcy55KnRoaXMuX3NjYWxlKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl91bml0U2l6ZVZlYzIgPSBuZXcgVmVjMih0aGlzLl9pbml0U2l6ZS54ICogdGhpcy5fc2NhbGUsdGhpcy5faW5pdFNpemUueSAqIHRoaXMuX3NjYWxlKTsvL3JlY2FsY3VsYXRlIHVuaXRTaXplXHJcbiAgICAgICAgdGhpcy5fYmFja0dyb3VuZENvbG9yID0gYmFja0dyb3VuZENvbG9yO1xyXG4gICAgICAgIHRoaXMuX2Zyb250Q29sb3IgPSBmcm9udENvbG9yO1xyXG4gICAgICAgIHRoaXMuaW5pdEJhY2tncm91bmQoKTtcclxuICAgICAgICB0aGlzLnNldENvbG9yKHRoaXMuX2JhY2tHcm91bmRDb2xvcik7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VDb2xvcigpO1xyXG4gICAgICAgIHRoaXMuaW5pdEZyb250U3ByQXJyKCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJGcm9udFNwcih0aGlzLl9mcm9udENvbG9yKTtcclxuICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5vbihFdmVudENlbnRyZS5FVHlwZS5QRVJGT1JNQU5DRV9SRVNDQUxFKCksdGhpcyx0aGlzLnJlU2NhbGUpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGRyYXcgYmFja2dyb3VuZFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRCYWNrZ3JvdW5kKCk6dm9pZHtcclxuICAgICAgICB0aGlzLnNldFBhcmFtKHRoaXMuX3Bvc1ZlYzIueCx0aGlzLl9wb3NWZWMyLnksdGhpcy5fbnVtQXJyWzBdLmxlbmd0aCp0aGlzLl91bml0U2l6ZVZlYzIueCx0aGlzLl9udW1BcnIubGVuZ3RoKnRoaXMuX3VuaXRTaXplVmVjMi55LHRoaXMuX2JhY2tHcm91bmRDb2xvcik7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbkFuZFNpemUoKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGRyYXcgZnJvbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0RnJvbnRTcHJBcnIoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX2Zyb250U3ByQXJyID0gW107Ly9pbml0IGN1c3RTcHJBcnJcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fbnVtQXJyLmxlbmd0aDsgaSArKyl7XHJcbiAgICAgICAgICAgIGxldCB0bXBBcnI6Q3VzdG9taXplZFNwcml0ZVtdID0gW107XHJcbiAgICAgICAgICAgIGZvciggbGV0IGogPSAwOyBqIDwgdGhpcy5fbnVtQXJyWzBdLmxlbmd0aDsgaiArKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG1wU3ByOkN1c3RvbWl6ZWRTcHJpdGUgPSBuZXcgQ3VzdG9taXplZFNwcml0ZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDaGlsZCh0bXBTcHIpO1xyXG4gICAgICAgICAgICAgICAgdG1wU3ByLnNldFBhcmFtKDAraip0aGlzLl91bml0U2l6ZVZlYzIueCwwK2kqdGhpcy5fdW5pdFNpemVWZWMyLnksdGhpcy5fdW5pdFNpemVWZWMyLngsdGhpcy5fdW5pdFNpemVWZWMyLnksdGhpcy5fZnJvbnRDb2xvcixuZXcgVmVjMigxLDEpKTtcclxuICAgICAgICAgICAgICAgIHRtcFNwci5sb2NhdGlvbkFuZFNpemUoKTtcclxuICAgICAgICAgICAgICAgIHRtcFNwci5zZXRDb2xvcih0aGlzLl9mcm9udENvbG9yKTtcclxuICAgICAgICAgICAgICAgIHRtcFNwci5jaGFuZ2VDb2xvcigpO1xyXG4gICAgICAgICAgICAgICAgdG1wU3ByLnpPcmRlciA9IC0xO1xyXG4gICAgICAgICAgICAgICAgdG1wQXJyLnB1c2godG1wU3ByKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9mcm9udFNwckFyci5wdXNoKHRtcEFycik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gY29sb3IgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVuZGVyRnJvbnRTcHIoY29sb3I6c3RyaW5nKXtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fZnJvbnRTcHJBcnIubGVuZ3RoOyBpICsrKXtcclxuICAgICAgICAgICAgZm9yKCBsZXQgaiA9IDA7IGogPCB0aGlzLl9mcm9udFNwckFyclswXS5sZW5ndGg7IGogKyspe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZnJvbnRTcHJBcnJbaV1bal0uc2V0Q29sb3IoY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZnJvbnRTcHJBcnJbaV1bal0uY2hhbmdlQ29sb3IoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS/ruaUueWJjeaWueagvOWtkOminOiJslxyXG4gICAgICogQHBhcmFtIHBvc1ZlYzIg5b6F5L+u5pS55qC85a2Q5Z2Q5qCH77yIeCx577yJXHJcbiAgICAgKiBAcGFyYW0gY29sb3Ig55uu5qCH6aKc6ImyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjaGFuZ2VGcm9udENvbG9yKHBvc1ZlYzI6VmVjMixjb2xvcjpzdHJpbmcpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fZnJvbnRTcHJBcnJbcG9zVmVjMi55XVtwb3NWZWMyLnhdLnNldENvbG9yKGNvbG9yKTtcclxuICAgICAgICB0aGlzLl9mcm9udFNwckFycltwb3NWZWMyLnldW3Bvc1ZlYzIueF0uY2hhbmdlQ29sb3IoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa4hemZpOaJgOacieW3sue7mOWbvuW9olxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNsZWFyQWxsKCk6dm9pZHtcclxuICAgICAgICB0aGlzLmdyYXBoaWNzLmNsZWFyKCk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuX2Zyb250U3ByQXJyLmxlbmd0aDsgaSArKyl7XHJcbiAgICAgICAgICAgIGZvciggbGV0IGogPSAwOyBqIDwgdGhpcy5fZnJvbnRTcHJBcnJbMF0ubGVuZ3RoOyBqICsrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Zyb250U3ByQXJyW2ldW2pdLmdyYXBoaWNzLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDph43orr7mo4vnm5jnvKnmlL7mr5RcclxuICAgICAqIEBwYXJhbSBudW0g57yp5pS+5q+UXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZVNjYWxlKG51bTpudW1iZXIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fc2NhbGUgPSBudW07XHJcbiAgICAgICAgdGhpcy5fcG9zVmVjMiA9IG5ldyBWZWMyKHRoaXMuX2luaXRQb3MueCp0aGlzLl9zY2FsZSx0aGlzLl9pbml0UG9zLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX3VuaXRTaXplVmVjMiA9IG5ldyBWZWMyKHRoaXMuX2luaXRTaXplLnggKiB0aGlzLl9zY2FsZSx0aGlzLl9pbml0U2l6ZS55ICogdGhpcy5fc2NhbGUpOy8vcmVjYWxjdWxhdGUgdW5pdFNpemVcclxuICAgICAgICB0aGlzLmNsZWFyQWxsKCk7XHJcbiAgICAgICAgdGhpcy5pbml0QmFja2dyb3VuZCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdEZyb250U3ByQXJyKCk7XHJcbiAgICAgICAgdGhpcy5zZXRDb2xvcih0aGlzLl9iYWNrR3JvdW5kQ29sb3IpO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlQ29sb3IoKTtcclxuICAgICAgICB0aGlzLnJlbmRlckZyb250U3ByKHRoaXMuX2Zyb250Q29sb3IpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIiwiaW1wb3J0IHsgVmVjMiB9IGZyb20gXCIuLi8uLi9Eb2RNYXRoXCI7XHJcblxyXG4vL2F1dGhvciBOYTJDdUM0TzhcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1c3RvbWl6ZWRTcHJpdGUgZXh0ZW5kcyBMYXlhLlNwcml0ZXtcclxuICAgIHByaXZhdGUgX2NvbG9yOnN0cmluZzsvL+WPr+inhuiKgueCueminOiJslxyXG4gICAgcHJpdmF0ZSBfZ3JhcGhpY1NoaWZ0OlZlYzI7Ly/ph43lj6Dnu5jlm77lgY/np7vph49cclxuICAgIHByaXZhdGUgX2NlbnRyYWxTaGlmdDsvL+S4reW/g+e7mOWbvuWBj+enu+mHj1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2VudHJhbFNoaWZ0Q29sb3JlZCgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5ncmFwaGljcy5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuZ3JhcGhpY3MuZHJhd1JlY3QoLXRoaXMud2lkdGgvMiwtdGhpcy5oZWlnaHQvMix0aGlzLndpZHRoLHRoaXMuaGVpZ2h0LHRoaXMuX2NvbG9yKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGNvbG9yIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0Q29sb3IoY29sb3I6c3RyaW5nKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX2NvbG9yID0gY29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkv67mlLnpopzoibJcclxuICAgICAqIEBwYXJhbSBjb2xvciDnm67moIfpopzoibJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNoYW5nZUNvbG9yKCk6dm9pZHtcclxuICAgICAgICB0aGlzLmdyYXBoaWNzLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5ncmFwaGljcy5kcmF3UmVjdCh0aGlzLl9ncmFwaGljU2hpZnQueCx0aGlzLl9ncmFwaGljU2hpZnQueSx0aGlzLndpZHRoLTIqdGhpcy5fZ3JhcGhpY1NoaWZ0LngsdGhpcy5oZWlnaHQtMip0aGlzLl9ncmFwaGljU2hpZnQueSx0aGlzLl9jb2xvcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7nm7jlhbPlj4LmlbBcclxuICAgICAqIEBwYXJhbSBwb3NYIOi1t+Wni3hcclxuICAgICAqIEBwYXJhbSBwb3NZIOi1t+Wni3lcclxuICAgICAqIEBwYXJhbSB3aWR0aCDlrr3luqZcclxuICAgICAqIEBwYXJhbSBoZWlnaHQg6auY5bqmXHJcbiAgICAgKiBAcGFyYW0gY29sb3Ig6aKc6ImyXHJcbiAgICAgKiBAcGFyYW0gZ3JhcGhpY1NoaWZ0IOaji+ebmOWBj+enu+WAvFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0UGFyYW0ocG9zWDpudW1iZXIsIHBvc1k6bnVtYmVyLCB3aWR0aDpudW1iZXIsIGhlaWdodDpudW1iZXIsIGNvbG9yOnN0cmluZyA9IHRoaXMuX2NvbG9yLCBncmFwaGljU2hpZnQ6VmVjMiA9IG5ldyBWZWMyKDAsMCkpOnZvaWR7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy54ID0gcG9zWDtcclxuICAgICAgICB0aGlzLnkgPSBwb3NZO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICB0aGlzLnNldENvbG9yKGNvbG9yKTtcclxuICAgICAgICB0aGlzLl9ncmFwaGljU2hpZnQgPSBncmFwaGljU2hpZnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkv67mlLnlnZDmoIflkozlpKflsI9cclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvY2F0aW9uQW5kU2l6ZSgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5wb3ModGhpcy54LHRoaXMueSkuc2l6ZSh0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmHjeiuvuWdkOagh1xyXG4gICAgICogQHBhcmFtIHBvc1ZlYzIg55uu5qCH5Z2Q5qCHXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWxvY2F0ZShwb3NWZWMyOlZlYzIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy54ID0gcG9zVmVjMi54O1xyXG4gICAgICAgIHRoaXMueSA9IHBvc1ZlYzIueTtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uQW5kU2l6ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YeN6K6+5a696auYXHJcbiAgICAgKiBAcGFyYW0gc2l6ZVZlYzIg55uu5qCH5a696auYXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZVNpemUoc2l6ZVZlYzI6VmVjMik6dm9pZHtcclxuICAgICAgICB0aGlzLndpZHRoID0gc2l6ZVZlYzIueDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IHNpemVWZWMyLnk7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VDb2xvcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue5b2T5YmN5Zu+5b2i6LW35aeL5Z2Q5qCHXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRQb3MoKTpWZWMye1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjMih0aGlzLngsdGhpcy55KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuW3sue7mOWMuuWfn+Wkp+Wwj1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0U2l6ZSgpOlZlYzJ7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMyKHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBcclxuICAgICAqIOi/lOWbnuW9k+WJjeW3sue7mOWMuuWfn+minOiJslxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Q29sb3IoKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xyXG4gICAgfVxyXG59IiwiLy9hdXRob3IgTmEyQ3VDNE84XHJcblxyXG5pbXBvcnQgQWN0b3JSVSBmcm9tIFwiLi9TeW1ib2xpemVkUmVuZGVyXCI7XHJcbmltcG9ydCB7IEtWUGFpciB9IGZyb20gXCIuLi8uLi9Eb2REYXRhU3RydWN0dXJlXCI7XHJcbmltcG9ydCB7IE15U3ltYm9sIH0gZnJvbSBcIi4uLy4uLy4uL0ZpeC9GaXhTeW1ib2xcIjtcclxuXHJcblxyXG4vL+WCqOWtmOaJgOaciee7mOWbvuiKgueCueWvueixoVxyXG5leHBvcnQgY2xhc3MgQWN0b3JCb3h7XHJcbiAgICBwdWJsaWMgc3RhdGljIEJveDpLVlBhaXI8QWN0b3JSVT4gPSBuZXcgS1ZQYWlyKCk7XHJcbiAgICBwdWJsaWMgc3RhdGljIGFkZChhY3Q6QWN0b3JSVSxzeW1iOk15U3ltYm9sKTp2b2lke1xyXG4gICAgICAgIEFjdG9yQm94LkJveC5lZGl0KHN5bWIuZGF0YStcIlwiLGFjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQoc3ltOm51bWJlcik6QWN0b3JSVXtcclxuICAgICAgICByZXR1cm4gQWN0b3JCb3guQm94LnJlYWQoc3ltK1wiXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG59IiwiaW1wb3J0IHsgVmVjMiB9IGZyb20gXCIuLi9Db21tb24vRG9kTWF0aFwiO1xyXG5pbXBvcnQgeyBNeVN5bWJvbCB9IGZyb20gXCIuLi9GaXgvRml4U3ltYm9sXCI7XHJcbi8vLy8vL1xyXG5leHBvcnQgY2xhc3MgRXZlbnRDZW50cmV7XHJcbiAgICBwdWJsaWMgc3RhdGljIGluc3RhbmNlOkV2ZW50Q2VudHJlO1xyXG4gICAgcHVibGljIHN0YXRpYyBFVHlwZTpFVHlwZTtcclxuICAgIHB1YmxpYyBzdGF0aWMgaW5pdCgpOnZvaWR7XHJcbiAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2UgPSBuZXcgRXZlbnRDZW50cmUoKTtcclxuICAgICAgICBFdmVudENlbnRyZS5FVHlwZSA9IG5ldyBFVHlwZSgpO1xyXG4gICAgICAgIEV2ZW50Q2VudHJlLmluaXQgPSAoKT0+e307XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgX2NlbnRyZTpMYXlhLkV2ZW50RGlzcGF0Y2hlciA9IG5ldyBMYXlhLkV2ZW50RGlzcGF0Y2hlcigpO1xyXG5cclxuICAgIHB1YmxpYyBvbih0eXBlOnN0cmluZywgY2FsbGVyOmFueSwgbGlzdGVuZXI6RnVuY3Rpb24sIGFyZ3M/OmFueVtdKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX2NlbnRyZS5vbih0eXBlLGNhbGxlcixsaXN0ZW5lcixhcmdzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXZlbnQodHlwZTpzdHJpbmcsIGFyZ3M/OmFueSk6dm9pZHtcclxuICAgICAgICB0aGlzLl9jZW50cmUuZXZlbnQodHlwZSxhcmdzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb2ZmKHR5cGU6c3RyaW5nLCBjYWxsZXI6YW55LCBsaXN0ZW5lcjpGdW5jdGlvbil7XHJcbiAgICAgICAgdGhpcy5fY2VudHJlLm9mZih0eXBlLCBjYWxsZXIsIGxpc3RlbmVyKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcigpe31cclxufVxyXG5cclxuXHJcbmNsYXNzIEVUeXBlIHtcclxuICAgIHB1YmxpYyBMRUFWRShwb3M6VmVjMiwgaWRlbnRpdHk6c3RyaW5nKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIGAke2lkZW50aXR5fTpDT0xMSVNJT05fRVZFTlRfTEVBVkVfRlJPTSgke3Bvcy54fXwke3Bvcy55fSlgO1xyXG4gICAgfVxyXG4gICAgcHVibGljIEVOVFJFKHBvczpWZWMyLCBpZGVudGl0eTpzdHJpbmcpOnN0cmluZ3tcclxuICAgICAgICByZXR1cm4gYCR7aWRlbnRpdHl9OkNPTExJU0lPTl9FVkVOVF9FTlRSRV9UTygke3Bvcy54fXwke3Bvcy55fSlgO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbmV3IGFkZGVkIGZvciBwZXJmb3JtYW5jZSBzdGFydHMgaGVyZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgUEVSRk9STUFOQ0VfUkVTQ0FMRSgpOnN0cmluZ3tcclxuICAgICAgICByZXR1cm4gXCJSRVNDQUxFXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFBFUkZPUk1BTkNFX1RFWFRfU1dJVENIKCk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBcIlRFWFRfU1dJVENIXCI7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIG5ldyBhZGRlZCBmb3IgcGVyZm9ybWFuY2UgZW5kcyBoZXJlXHJcbiAgICAgKi9cclxufSIsImltcG9ydCB7IFZlYzIsIERvZE1hdGggfSBmcm9tIFwiLi4vQ29tbW9uL0RvZE1hdGhcIjtcclxuaW1wb3J0IHsgQXJyYXlBbGdvIH0gZnJvbSBcIi4uL0NvbW1vbi9Eb2REYXRhU3RydWN0dXJlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRml4UmVjdCBleHRlbmRzIExheWEuUmVjdGFuZ2xle1xyXG4gICAgY29uc3RydWN0b3IoeD86bnVtYmVyLCB5PzpudW1iZXIsIHdpZHRoPzpudW1iZXIsIGhlaWdodD86bnVtYmVyKXtcclxuICAgICAgICBzdXBlcih4LHksd2lkdGgsaGVpZ2h0KTtcclxuICAgIH1cclxufVxyXG5cclxuIiwiZXhwb3J0IGludGVyZmFjZSBTeW1ib2xpemVke1xyXG4gICAgc3ltYm9sOk15U3ltYm9sO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTXlTeW1ib2x7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBjb3VudDpudW1iZXIgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgX2RhdGE6bnVtYmVyO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgZGF0YSgpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSBNeVN5bWJvbC5jb3VudDtcclxuICAgICAgICBNeVN5bWJvbC5jb3VudCArPSAxO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRml4VGltZSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGZyYW1lUmF0ZTogbnVtYmVyID0gNjA7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGRlbHRhVGltZTogbnVtYmVyID0gMSAvIEZpeFRpbWUuZnJhbWVSYXRlO1xyXG4gICAgcHVibGljIHN0YXRpYyBmcmFtZUNvdW50OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgc3RhdGljIGVsYXBzZWRUaW1lOiBudW1iZXI7Ly/lt7Lnu4/ov4fnmoTml7bpl7RcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5mcmFtZUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLmVsYXBzZWRUaW1lID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmZyYW1lQ291bnQrKztcclxuICAgICAgICB0aGlzLmVsYXBzZWRUaW1lICs9IHRoaXMuZGVsdGFUaW1lO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZWxhcHNlZFRpbWUpO1xyXG4gICAgfVxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXHJcbmltcG9ydCBHYW1lIGZyb20gXCIuL1NjZW5lU2NyaXB0L0dhbWVcIlxuaW1wb3J0IExvYWRpbmcgZnJvbSBcIi4vU2NlbmVTY3JpcHQvTG9hZGluZ1wiXHJcbi8qXHJcbiog5ri45oiP5Yid5aeL5YyW6YWN572uO1xyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ29uZmlne1xyXG4gICAgc3RhdGljIHdpZHRoOm51bWJlcj0xODAwO1xyXG4gICAgc3RhdGljIGhlaWdodDpudW1iZXI9OTAwO1xyXG4gICAgc3RhdGljIHNjYWxlTW9kZTpzdHJpbmc9XCJub3NjYWxlXCI7XHJcbiAgICBzdGF0aWMgc2NyZWVuTW9kZTpzdHJpbmc9XCJub25lXCI7XHJcbiAgICBzdGF0aWMgYWxpZ25WOnN0cmluZz1cInRvcFwiO1xyXG4gICAgc3RhdGljIGFsaWduSDpzdHJpbmc9XCJsZWZ0XCI7XHJcbiAgICBzdGF0aWMgc3RhcnRTY2VuZTphbnk9XCJMb2FkaW5nU2NlbmUuc2NlbmVcIjtcclxuICAgIHN0YXRpYyBzY2VuZVJvb3Q6c3RyaW5nPVwiXCI7XHJcbiAgICBzdGF0aWMgZGVidWc6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBzdGF0OmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgcGh5c2ljc0RlYnVnOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgZXhwb3J0U2NlbmVUb0pzb246Ym9vbGVhbj10cnVlO1xyXG4gICAgY29uc3RydWN0b3IoKXt9XHJcbiAgICBzdGF0aWMgaW5pdCgpe1xyXG4gICAgICAgIHZhciByZWc6IEZ1bmN0aW9uID0gTGF5YS5DbGFzc1V0aWxzLnJlZ0NsYXNzO1xyXG4gICAgICAgIHJlZyhcIlNjZW5lU2NyaXB0L0dhbWUudHNcIixHYW1lKTtcbiAgICAgICAgcmVnKFwiU2NlbmVTY3JpcHQvTG9hZGluZy50c1wiLExvYWRpbmcpO1xyXG4gICAgfVxyXG59XHJcbkdhbWVDb25maWcuaW5pdCgpOyIsImltcG9ydCB7IENvbGlFbWl0IH0gZnJvbSBcIi4vQWN0b3JNb2R1bGVzL0NvbGlNZXNzYWdlXCI7XHJcbmltcG9ydCB7IFByb2ZpbGUgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvUHJvZmlsZVwiO1xyXG5pbXBvcnQgeyBTeW1ib2xpemVkLCBNeVN5bWJvbCB9IGZyb20gXCIuLi8uLi9GaXgvRml4U3ltYm9sXCI7XHJcbmltcG9ydCB7IEJ1ZmYgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvQnVmZlwiO1xyXG5pbXBvcnQgeyBBdGtTdGF0ZU1hY2hpbmUgfSBmcm9tIFwiLi9BdHRhY2svQXRrQWJzdFwiO1xyXG5pbXBvcnQgeyBEYW1hZ2UgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvRGFtYWdlXCI7XHJcbmltcG9ydCB7IEFjdG9yVHlwZSB9IGZyb20gXCIuLi8uLi9Db21tb24vRG9kS2V5XCI7XHJcbmltcG9ydCBBY3RvclN0YXRlTWdyLCB7IEFjdG9yU3RhdGVJRCB9IGZyb20gXCIuL1N0YXRlL0FjdG9yU3RhdGVGc21cIjtcclxuaW1wb3J0IHsgQWN0b3JCdWZmTWdyIH0gZnJvbSBcIi4vQWN0b3JNb2R1bGVzL0FjdG9yQnVmZk1nclwiO1xyXG5pbXBvcnQgeyBUcmFuc2Zvcm0gfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvVHJhbnNmb3JtXCI7XHJcbmltcG9ydCB7IFVuaXRSZW5kZXIgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvVW5pdFJlbmRlclwiO1xyXG5pbXBvcnQgeyBBbmltYXRpb24gfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvQW5pbWF0aW9uXCI7XHJcbmltcG9ydCBSb3V0ZSBmcm9tIFwiLi9BY3RvclJvdXRlXCI7XHJcbmltcG9ydCB7IEFjdG9yU2tpbGwgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvQWN0b3JTa2lsbFwiO1xyXG5pbXBvcnQgeyBBY3RvckNvc3QgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvQWN0b3JDb3N0XCI7XHJcbmltcG9ydCB7IEJsb2NrZXIgfSBmcm9tIFwiLi9BdHRhY2svQmxvY2tlclwiO1xyXG5pbXBvcnQgeyBWZWMyIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9Eb2RNYXRoXCI7XHJcbmltcG9ydCBHYW1lQmF0dGxlIGZyb20gXCIuLi9HYW1lQmF0dGxlXCI7XHJcblxyXG5cclxuXHJcblxyXG5cclxuLy/ln7rmnKzljp/liJnvvJrlsJHnlKjnu6fmib/vvIzlpJrnlKjnu4TlkIhcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWN0b3IgaW1wbGVtZW50cyBTeW1ib2xpemVke1xyXG4gICAgcHVibGljIHN5bWJvbDogTXlTeW1ib2w7IC8v5YWo5bGA5ZSv5LiA55qE5qCH6K+G5pWw5a2XXHJcbiAgICBwdWJsaWMgdHlwZTogQWN0b3JUeXBlID0gQWN0b3JUeXBlLk5vbmU7IC8v6buY6K6k6Lqr5Lu95Li6QWN0b3JcclxuXHJcbiAgICBwdWJsaWMgc3RhdGU6IEFjdG9yU3RhdGVNZ3I7IC8v54q25oCB5py6IOe7n+etueeKtuaAgeabtOaWsFxyXG5cclxuICAgIHB1YmxpYyBwcm9maWxlOlByb2ZpbGU7Ly/ln7rmnKzlsZ7mgKfkuI7orr/pl67mlrnms5XlkIjpm4ZcclxuXHJcbiAgICBwdWJsaWMgYXRrOiBBdGtTdGF0ZU1hY2hpbmU7Ly/mlLvlh7vnirbmgIHmnLpcclxuICAgIHB1YmxpYyBjb2xpRW1pdDpDb2xpRW1pdCA9IG5ldyBDb2xpRW1pdCgwLDAsQ29saUVtaXQuR0xPQkFMX1VOSVRfU1VCV0lEVEgsQ29saUVtaXQuR0xPQkFMX1VOSVRfU1VCSEVJR0hUKTsvL+eisOaSnuS6i+S7tuWPkeW4g+iAhVxyXG4gICAgcHVibGljIGJsb2NrZXI6QmxvY2tlcjsvL+mYu+aMoeaooeWdl1xyXG4gICAgcHVibGljIGJ1ZmZNZ3I6QWN0b3JCdWZmTWdyO1xyXG4gICAgcHVibGljIHRyYW5zZm9ybTpUcmFuc2Zvcm07XHJcbiAgICBwdWJsaWMgcmVuZGVyOlVuaXRSZW5kZXI7XHJcbiAgICBwdWJsaWMgYW5pbWF0aW9uOkFuaW1hdGlvbjtcclxuICAgIHB1YmxpYyByb3V0ZTpSb3V0ZTsvL+i3r+W+hOWvueixoVxyXG4gICAgcHVibGljIHNraWxsOkFjdG9yU2tpbGw7XHJcbiAgICBwdWJsaWMgY29zdDpBY3RvckNvc3Q7XHJcblxyXG4gICAgLy9UT0RP77ya5Y675YyF5LiA5Liq57uE5Lu2XHJcbiAgICAvLyAvKipcclxuICAgIC8vICAqIOebruagh+mAieaLqeWZqFxyXG4gICAgLy8gICovXHJcbiAgICAvLyBwdWJsaWMgc2Vla2VyOiBTZWVrZXI7XHJcblxyXG4gICAgLy8gLypcclxuICAgIC8vICog5b2T5YmN6ZSB5a6a55uu5qCHXHJcbiAgICAvLyAqICovXHJcbiAgICAvLyBwdWJsaWMgZm9jdXM6IEFjdG9yO1xyXG5cclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IodHlwZTogQWN0b3JUeXBlLCByZXM6IGFueSkge1xyXG4gICAgICAgIHJlc1sneHh4J10gPSAxMTQ1MTQxOTE5ODEwO1xyXG5cclxuICAgICAgICB0aGlzLnN5bWJvbCA9IG5ldyBNeVN5bWJvbCgpO1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IG5ldyBBY3RvclN0YXRlTWdyKHRoaXMpO1xyXG4gICAgICAgIC8vIGFjY29yZGluZyB0byBkaWZmZXJlbnQgdHlwZSwgYWRkIGRpZmZlcmVudCBjb21wb25lbnRzIHRvIHRoaXMgYWN0b3IuIFxyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtID0gbmV3IFRyYW5zZm9ybSh0aGlzKTtcclxuICAgICAgICB0aGlzLnByb2ZpbGUgPSBuZXcgUHJvZmlsZSh0aGlzLCByZXNbJ3h4eCddKTsgXHJcbiAgICAgICAgdGhpcy5hdGsgPSBuZXcgQXRrU3RhdGVNYWNoaW5lKHRoaXMsIHJlc1sneHh4J10pO1xyXG4gICAgICAgIHRoaXMuYmxvY2tlciA9IG5ldyBCbG9ja2VyKHRoaXMsIHJlc1sneHh4J10pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuYnVmZk1nciA9IG5ldyBBY3RvckJ1ZmZNZ3IodGhpcywgcmVzWyd4eHgnXSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5yZW5kZXIgPSBuZXcgVW5pdFJlbmRlcih0aGlzKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IG5ldyBBbmltYXRpb24odGhpcywgcmVzWyd4eHgnXSk7XHJcbiBcclxuICAgICAgICBpZiAoQWN0b3JUeXBlLk1vbnN0ZXIgPT0gdGhpcy50eXBlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGUgPSBuZXcgUm91dGUodGhpcywgcmVzWyd4eHgnXSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoQWN0b3JUeXBlLk9wZXJhdG9yID09IHRoaXMudHlwZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNraWxsID0gbmV3IEFjdG9yU2tpbGwodGhpcywgcmVzWyd4eHgnXSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmNvc3QgPSBuZXcgQWN0b3JDb3N0KHRoaXMpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGF3YWtlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGUucnVuU3RhdGUoQWN0b3JTdGF0ZUlELlByZXBhcmVkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGUudXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIC8vIHJlc2V0IGNsZWFyIHJlc291cmNlIHJlbGF0ZWQgbW9kdWxlXHJcbiAgICAgICAgLy8gdGhpcy5yZW5kZXIucmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWwhuatpOWvueixoeiuvue9ruWIsOWcuuS4ilxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0T25NYXAocG9zOlZlYzIpOiB2b2lkIHtcclxuICAgICAgICAvL3RvZG86IOWQr+WKqOaooeWdl1xyXG4gICAgICAgIHRoaXMuYXRrLnN0YXJ0KHBvcyk7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0uc3RhcnQocG9zKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnN0YXRlLnJ1blN0YXRlKEFjdG9yU3RhdGVJRC5Cb3JuKTtcclxuICAgICAgICAvL1RPRE9cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0UG9zaXRpb24oKTogdm9pZCB7XHJcbiAgICAgICAgLy9UT0RPXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmlLvlh7vkuIDkuKrmiJblpJrkuKpBY3Rvcuebruagh1xyXG4gICAgICogMjAyMC8zLzUg5pS75Ye76YC76L6R5bey5LuO5LqL5Lu26Kem5Y+R5pS55Li655u05o6l6LCD55SoXHJcbiAgICAgKiDlj5HotbflkozmjqXmlLbmlLvlh7vnmoTpgLvovpHlnYflsIHoo4XlnKhBY3Rvcuexu+S4rVxyXG4gICAgICogQHBhcmFtIHZpY3RpbSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGF0dGFjayguLi52aWN0aW06QWN0b3JbXSk6dm9pZHtcclxuICAgICAgICBsZXQgZG1nOkRhbWFnZSA9IHRoaXMucHJvZmlsZS5nZW5lcmF0ZURhbWFnZSh0aGlzKTtcclxuXHJcbiAgICAgICAgdmljdGltLmZvckVhY2goZWxlPT57XHJcbiAgICAgICAgICAgIHRoaXMuYmVBdHRhY2tlZChkbWcuY29weSgpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDooqvmlLvlh7tcclxuICAgICAqIEBwYXJhbSBkYW1hZ2UgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBiZUF0dGFja2VkKGRhbWFnZTpEYW1hZ2UpOnZvaWR7XHJcbiAgICAgICAgLy9AdG9kb1xyXG4gICAgICAgIC8v5YeP5bCR55Sf5ZG95YC8XHJcbiAgICAgICAgLy/lj5Hlh7rmlLvlh7vkuovku7ZcclxuICAgICAgICAvL++8iOWPr+iDve+8ieWPkeWHuuatu+S6oeS6i+S7tlxyXG4gICAgfVxyXG4gICAgXHJcblxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IEFjdG9yIGZyb20gXCIuL0FjdG9yXCI7XHJcbmltcG9ydCB7IEFjdG9yVHlwZSB9IGZyb20gXCIuLi8uLi9Db21tb24vRG9kS2V5XCI7XHJcbmltcG9ydCB7IEFjdG9yU3RhdGVJRCB9IGZyb20gXCIuL1N0YXRlL0FjdG9yU3RhdGVGc21cIjtcclxuaW1wb3J0IHsgQ29saVJlY2VpdmVyIH0gZnJvbSBcIi4vQWN0b3JNb2R1bGVzL0NvbGlNZXNzYWdlXCI7XHJcbmltcG9ydCBSaG9kZXNHYW1lIGZyb20gXCIuLi9SaG9kZXNHYW1lXCI7XHJcbmltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL0RvZE1hdGhcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjdG9yTWdyIHtcclxuICAgIHB1YmxpYyBhY3RvcnM6IEFjdG9yW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5hY3RvcnMgPSBbXTtcclxuXHJcbiAgICAgICAgLy90ZXN0XHJcbiAgICAgICAgbGV0IGNyZWF0RW5lbXk6RnVuY3Rpb24gPSAodGltZTpudW1iZXJbXSk9PntcclxuICAgICAgICAgICAgdGltZS5mb3JFYWNoKGVsZT0+e1xyXG4gICAgICAgICAgICAgICAgTGF5YS50aW1lci5vbmNlKGVsZSwgdGhpcywgKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmFjdG9ycy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3RvcihBY3RvclR5cGUuTW9uc3Rlciwge30pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0b3JzW2luZGV4XS5zdGF0ZS5ydW5TdGF0ZShBY3RvclN0YXRlSUQuV2Fsayk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNyZWF0ZUFjdG9yKEFjdG9yVHlwZS5Nb25zdGVyLCB7fSk7XHJcbiAgICAgICAgdGhpcy5hY3RvcnNbMF0uc3RhdGUucnVuU3RhdGUoQWN0b3JTdGF0ZUlELldhbGspO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlQWN0b3IoQWN0b3JUeXBlLk9wZXJhdG9yLCB7fSk7XHJcbiAgICAgICAgdGhpcy5hY3RvcnNbMV0uc3RhdGUucnVuU3RhdGUoQWN0b3JTdGF0ZUlELlByZXBhcmVkKTtcclxuICAgICAgICBjcmVhdEVuZW15KFszMDAsNjAwLDkwMF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0KHJlczogYW55KSB7XHJcbiAgICAgICAgdGhpcy5faW5pdEVuZW15KHJlcyk7XHJcbiAgICAgICAgdGhpcy5faW5pdE9wcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXdha2UoKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYWN0b3IgPSB0aGlzLmFjdG9yc1tpXTtcclxuICAgICAgICAgICAgYWN0b3IuYXdha2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYWN0b3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhY3RvciA9IHRoaXMuYWN0b3JzW2ldO1xyXG4gICAgICAgICAgICBhY3Rvci51cGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgUmhvZGVzR2FtZS5JbnN0YW5jZS5iYXR0bGUubWFwTm9kZUNQVS5yZW5kZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYWN0b3IgPSB0aGlzLmFjdG9yc1tpXTtcclxuICAgICAgICAgICAgYWN0b3IucmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNyZWF0ZUFjdG9yKHR5cGU6IEFjdG9yVHlwZSwgcmVzOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBsZXQgYWN0b3IgPSBuZXcgQWN0b3IodHlwZSwgcmVzKTtcclxuICAgICAgICB0aGlzLmFjdG9ycy5wdXNoKGFjdG9yKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QWN0b3JCeUlEKElEOiBudW1iZXIpOiBBY3RvciB8IG51bGwge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hY3RvcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGFjdG9yID0gdGhpcy5hY3RvcnNbaV07XHJcbiAgICAgICAgICAgIGlmIChJRCA9PSBhY3Rvci5zeW1ib2wuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjdG9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZXBsb3lPcHJ0KGlkOm51bWJlciwgcG9zOlZlYzIpOnZvaWR7XHJcbiAgICAgICAgbGV0IG9wcnQ6QWN0b3IgPSB0aGlzLmdldEFjdG9yQnlJRChpZCk7XHJcblxyXG4gICAgICAgIGlmIChvcHJ0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbihcIkRlcGxvdGluZyBOb25lIEV4aXN0aW5nIE9wZXJhdG9yXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9wcnQuc3RhdGUuY3VycmVudFN0YXRlVHlwZSAhPSBBY3RvclN0YXRlSUQuUHJlcGFyZWQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbihcIkRlcGxveWluZyBOb25lIFByZXBhcmVkIE9wZXJhdG9yXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9wcnQudHlwZSAhPSBBY3RvclR5cGUuT3BlcmF0b3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbihcIkRlcGxveWluZyBOb25lIE9wZXJhdG9yIEFjdG9yXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb3BydC5zZXRPbk1hcChwb3MpO1xyXG4gICAgICAgIG9wcnQuc3RhdGUucnVuU3RhdGUoQWN0b3JTdGF0ZUlELkJvcm4pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9pbml0RW5lbXkocmVzOiBhbnkpIHtcclxuICAgICAgICAvL1RPRE8gdXNlIGxldmVsIHJlcyBkYXRhIGluaXQgZW5lbXkgYWN0b3JzXHJcbiAgICAgICAgLy9lZy5cclxuICAgICAgICAvL2xldCBlbmVteVJlcyA9IHJlc1sneHh4eHgnXTtcclxuICAgICAgICAvL2FjdG9yID0gdGhpcy5jcmVhdGVBY3RvcihBY3RvclR5cGUuRW5lbXkgLGVuZW15UmVzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfaW5pdE9wcnQoKSB7XHJcbiAgICAgICAgLy9UT0RPIHVzZSBwcmUgY2hvb3NlIG9wcnQgbGlzdCB0byBpbml0IHNlbGYgYWN0b3JzXHJcbiAgICAgICAgLy9sZXQgYXJyYXkgPSBSaG9kZXNHYW1lcy5JbnN0YW5jZS5nYW1lZGF0YS5jdXJyZW50Rm9ybWF0aW9uO1xyXG4gICAgICAgIC8vZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIC8vICAgbGV0IGlkID0gYXJyYXlbaV07XHJcbiAgICAgICAgLy8gICBsZXQgcmVzID0gRG9kUmVzb3VyY2VNZ3IuSW5zdGFuY2UuZ2V0Q3VycmVudE9wZXJhcm9yRGF0YUJ5SUQoaWQpO1xyXG4gICAgICAgIC8vICAgbGV0IGFjdG9yID0gdGhpcy5jcmVhdGVBY3RvcihBY3RvclR5cGUuT3BlcmF0b3IsIHJlcylcclxuICAgICAgICAvL31cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQWN0b3JCdWZmTWdye1xyXG4gICAgY29uc3RydWN0b3Ioa2VlcGVyOkFjdG9yLCByZXM6YW55KXtcclxuICAgICAgICBcclxuICAgIH1cclxufSIsImltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBY3RvckNvc3R7XHJcbiAgICBjb25zdHJ1Y3RvcihrZWVwZXI6QWN0b3Ipe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9BY3RvclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFjdG9yU2tpbGx7XHJcbiAgICBjb25zdHJ1Y3RvcihrZWVwZXI6QWN0b3IsIHJlczphbnkpe1xyXG5cclxuICAgIH1cclxufSIsImltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBbmltYXRpb257XHJcbiAgICBjb25zdHJ1Y3RvcihrZWVwZXI6QWN0b3IsIHJlczphbnkpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgVmVjMiwgRG9kTWF0aCB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vRG9kTWF0aFwiO1xyXG5pbXBvcnQgeyBGaXhSZWN0IH0gZnJvbSBcIi4uLy4uLy4uL0ZpeC9GaXhSZWN0XCI7XHJcbmltcG9ydCB7IEFycmF5QWxnbyB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vRG9kRGF0YVN0cnVjdHVyZVwiO1xyXG5pbXBvcnQgeyBFdmVudENlbnRyZSB9IGZyb20gXCIuLi8uLi8uLi9FdmVudC9FdmVudENlbnRyZVwiO1xyXG5pbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcbmltcG9ydCB7IEFjdG9yVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vRG9kS2V5XCI7XHJcblxyXG4vKipcclxuICog56Kw5pKe5raI5oGv5Y+R5biD6ICFXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29saUVtaXR7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEdMT0JBTF9VTklUX1dJRFRIOm51bWJlciA9IDEwMDsvL+WFqOWxgOWNleS9jeWuvVxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBHTE9CQUxfVU5JVF9IRUlHSFQ6bnVtYmVyID0gMTAwOy8v5YWo5bGA5Y2V5L2N6auYXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEdMT0JBTF9VTklUX1NVQldJRFRIOm51bWJlciA9IDkwOy8v5YWo5bGA5YaF6YOo5Y2V5L2N5a69XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEdMT0JBTF9VTklUX1NVQkhFSUdIVDpudW1iZXIgPSA5MDsvL+WFqOWxgOWGhemDqOWNleS9jemrmFxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBHTE9CQUxfVU5JVF9SU0hJRlQ6bnVtYmVyID0gNTsvL+WFqOWxgOWNleS9jeWQkeWPs+WBj+enu1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBHTE9CQUxfVU5JVF9CU0hJRlQ6bnVtYmVyID0gNTsvL+WFqOWxgOWNleS9jeWQkeS4i+WBj+enu1xyXG5cclxuICAgIHByaXZhdGUgX3JlYzpGaXhSZWN0O1xyXG4gICAgXHJcbiAgICBwcml2YXRlIF9wYXN0U2V0OlZlYzJbXSA9IFtdOy8v5q2k5pa55Z2X5LiK5LiA5qyh5a2Y5Zyo5LqO5ZOq5LiA54K5XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57miYDmnInnm67liY3oh6rouqvmiYDlpITnmoTmlrnmoLxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBmaW5kSW50ZXJzZWN0KCk6VmVjMltde1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IFtcclxuICAgICAgICAgICAgbGVmdCxcclxuICAgICAgICAgICAgdG9wLFxyXG4gICAgICAgICAgICByaWdodCxcclxuICAgICAgICAgICAgYm90dG9tXHJcbiAgICAgICAgXSA9IFtcclxuICAgICAgICAgICAgRG9kTWF0aC5pbnREaXZpc2lvbih0aGlzLl9yZWMueCxDb2xpRW1pdC5HTE9CQUxfVU5JVF9XSURUSCksXHJcbiAgICAgICAgICAgIERvZE1hdGguaW50RGl2aXNpb24odGhpcy5fcmVjLnksQ29saUVtaXQuR0xPQkFMX1VOSVRfSEVJR0hUKSxcclxuICAgICAgICAgICAgRG9kTWF0aC5pbnREaXZpc2lvbih0aGlzLl9yZWMucmlnaHQsQ29saUVtaXQuR0xPQkFMX1VOSVRfV0lEVEgpLFxyXG4gICAgICAgICAgICBEb2RNYXRoLmludERpdmlzaW9uKHRoaXMuX3JlYy5ib3R0b20sQ29saUVtaXQuR0xPQkFMX1VOSVRfSEVJR0hUKVxyXG4gICAgICAgIF1cclxuXHJcbiAgICAgICAgbGV0IHJlc3VsdDpWZWMyW10gPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaG9yaTpudW1iZXIgPSBsZWZ0OyBob3JpIDw9IHJpZ2h0OyBob3JpICs9IDEpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgdmVydGk6bnVtYmVyID0gdG9wOyB2ZXJ0aSA8PSBib3R0b207IHZlcnRpICs9IDEpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBWZWMyKGhvcmksIHZlcnRpKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcG9zKHg6bnVtYmVyLCB5Om51bWJlcik6Q29saUVtaXR7XHJcbiAgICAgICAgdGhpcy5fcmVjLnggPSB4O1xyXG4gICAgICAgIHRoaXMuX3JlYy55ID0geTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcG9zQnlWZWModmVjOlZlYzIpOkNvbGlFbWl0e1xyXG4gICAgICAgIHRoaXMuX3JlYy54ID0gdmVjLng7XHJcbiAgICAgICAgdGhpcy5fcmVjLnkgPSB2ZWMueTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2l6ZSh3aWR0aDpudW1iZXIsIGhlaWdodDpudW1iZXIpOkNvbGlFbWl0e1xyXG4gICAgICAgIHRoaXMuX3JlYy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuX3JlYy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGV2ZW50KHB1Ymxpc2hlcj86YW55LCBpZGVudGl0eTpBY3RvclR5cGUgPSBBY3RvclR5cGUuTm9uZSk6dm9pZHtcclxuICAgICAgICBsZXQgY3VycmVudDpWZWMyW10gPSB0aGlzLmZpbmRJbnRlcnNlY3QoKTsvL+W9k+WJjeeisOaSnumbhuWQiFxyXG4gICAgICAgIC8vdGhpcy5fcGFzdFNldC8v5Y6G5Y+y56Kw5pKe6ZuG5ZCIXHJcbiAgICAgICAgLy/nprvlvIDvvJrlpITkuo7ljoblj7LnorDmkp7pm4blkIjvvIzkvYbkuI3lpITkuo7lvZPliY3norDmkp7pm4blkIjnmoTlhYPntKBcclxuICAgICAgICBsZXQgbGVhdmU6VmVjMltdID0gQXJyYXlBbGdvLmZpbmRDb21wbGVtZW50U2V0KHRoaXMuX3Bhc3RTZXQsIGN1cnJlbnQpIGFzIFZlYzJbXTtcclxuICAgICAgICAvL+i/m+WFpe+8muWkhOS6juW9k+WJjeeisOaSnumbhuWQiO+8jOS9huS4jeWkhOS6juWOhuWPsueisOaSnumbhuWQiOeahOWFg+e0oFxyXG4gICAgICAgIGxldCBlbnRyZTpWZWMyW10gPSBBcnJheUFsZ28uZmluZENvbXBsZW1lbnRTZXQoY3VycmVudCwgdGhpcy5fcGFzdFNldCkgYXMgVmVjMltdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8v5Y+R5biD5LqL5Lu2XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCLnprvlvIBcIik7XHJcbiAgICAgICAgbGVhdmUuZm9yRWFjaChlbGU9PntcclxuICAgICAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2UuZXZlbnQoRXZlbnRDZW50cmUuRVR5cGUuTEVBVkUoZWxlLCBgJHtpZGVudGl0eX1gKSwgcHVibGlzaGVyKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCLov5vlhaVcIik7XHJcbiAgICAgICAgZW50cmUuZm9yRWFjaChlbGU9PntcclxuICAgICAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2UuZXZlbnQoRXZlbnRDZW50cmUuRVR5cGUuRU5UUkUoZWxlLCBgJHtpZGVudGl0eX1gKSwgcHVibGlzaGVyKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fcGFzdFNldCA9IGN1cnJlbnQ7Ly/mm7TmlrDljoblj7LnorDmkp7pm4blkIjkuLrlvZPliY3norDmkp7pm4blkIhcclxuICAgIH07XHJcblxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOWPkeW4g+emu+W8gOW9k+WJjeWtmOWcqOeahOaJgOacieWdkOagh+eahOS6i+S7tlxyXG4gICAgICogQHBhcmFtIHB1Ymxpc2hlciBcclxuICAgICAqIEBwYXJhbSBpZGVudGl0eSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGV2ZW50TGVhdmVBbGwocHVibGlzaGVyPzphbnksIGlkZW50aXR5OkFjdG9yVHlwZSA9IEFjdG9yVHlwZS5Ob25lKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3Bhc3RTZXQuZm9yRWFjaCh2ZWM9PntcclxuICAgICAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2UuZXZlbnQoRXZlbnRDZW50cmUuRVR5cGUuTEVBVkUodmVjLCBgJHtpZGVudGl0eX1gKSwgcHVibGlzaGVyKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4Om51bWJlcix5Om51bWJlcix3aWR0aDpudW1iZXIgPSBDb2xpRW1pdC5HTE9CQUxfVU5JVF9TVUJXSURUSCwgaGVpZ2h0Om51bWJlciA9IENvbGlFbWl0LkdMT0JBTF9VTklUX1NVQkhFSUdIVCl7XHJcbiAgICAgICAgdGhpcy5fcmVjID0gbmV3IEZpeFJlY3QoeCx5LHdpZHRoLGhlaWdodCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDnorDmkp7mtojmga/mjqXmlLbogIVcclxuICog5Y+v5Lul6YCa6L+Hc2V0RGV0ZWN0aW9u55uR5o6n5oyH5a6a54K577yM5oyH5a6aSWRlbnRpdHnnmoTov5vlhaXlkoznprvlvIDkuovku7ZcclxuICog5Y+v5Lul6YCa6L+Hb2ZmRGV0ZWN0aW9u5pKk6ZSA5oyH5a6a54K555qE55uR5o6nXHJcbiAqIOi/meS4quS4jeiDveebtOaOpeeUqO+8jOimgee7p+aJv+S4gOWxguaKim9uTGVhdmXlkoxvbkVudHJl5Ye95pWw6YeN5YaZ5LmL5ZCO5omN6IO955SoXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ29saVJlY2VpdmVye1xyXG4gICAgLypcclxuICAgIOi/memHjOeahOS7u+S9leefqemYtemDveWPr+S7peeUqOmUruWAvOWvueabv+S7o+OAgnjkuI555Lik5Liq5Y+C5pWw5Y+v5Lul55Sf5oiQ5rC45LiN6YeN5aSN55qE6ZSuXHJcblxyXG4gICAgKi9cclxuICAgIHByaXZhdGUgX2RldGVjdGlvbk1hdHJpeDpib29sZWFuW11bXSA9IFtdOy8v6K6w5b2V5ZOq5Liq5Z2Q5qCH5bey6KKr55uR5o6nXHJcbiAgICBwcml2YXRlIGRldGVjdGlvbkV4aXN0KHBvc2l0aW9uOlZlYzIpOmJvb2xlYW57Ly/mn6XnnIvmn5DkuKrlnZDmoIfmmK/lkKblt7Looqvnm5HmjqdcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGV0ZWN0aW9uTWF0cml4W3Bvc2l0aW9uLnhdW3Bvc2l0aW9uLnldO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfY2FuY2VsbGF0aW9uTWF0cml4OkZ1bmN0aW9uW11bXVtdID0gW107Ly/lrZjmlL7nlKjkuo7lj5bmtojnm5HlkKznmoTlh73mlbBcclxuICAgIHByaXZhdGUgX3dpZHRoOm51bWJlcjtcclxuICAgIHByaXZhdGUgX2hlaWdodDpudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3Iod2lkdGg6bnVtYmVyLCBoZWlnaHQ6bnVtYmVyKXtcclxuICAgICAgICB0aGlzLl93aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuX2hlaWdodCA9IGhlaWdodDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgdyA9IDA7IHcgPCB3aWR0aDsgdyArPSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RldGVjdGlvbk1hdHJpeFt3XSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLl9jYW5jZWxsYXRpb25NYXRyaXhbd10gPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaCA9IDA7IGggPCBoZWlnaHQ7IGggKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGV0ZWN0aW9uTWF0cml4W3ddW2hdID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jYW5jZWxsYXRpb25NYXRyaXhbd11baF0gPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOatpOaWueazleaPkOS+m+e7meatpOexu+eahOWtkOexu+mHjeWGmVxyXG4gICAgICog5q+P5b2T5q2k5a6e5L6L55uR5o6n55qE6L+b5YWl56Kw5pKe5LqL5Lu25Zyo5bey5ZCv55So55uR5ZCs55qE5Z2Q5qCH5Y+R55Sf5pe277yM5q2k5Ye95pWw5bCG6KKr6LCD55SoXHJcbiAgICAgKiBAcGFyYW0gYWN0b3IgXHJcbiAgICAgKiBAcGFyYW0gcG9zaXRpb25cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IG9uRW50cmUoYWN0b3I6QWN0b3IsIHBvc2l0aW9uOlZlYzIpOnZvaWRcclxuXHJcbiAgICAvKipcclxuICAgICAqIOatpOaWueazleaPkOS+m+e7meatpOexu+eahOWtkOexu+mHjeWGmVxyXG4gICAgICog5q+P5b2T5q2k5a6e5L6L55uR5o6n55qE6L+b5YWl56Kw5pKe5LqL5Lu25Zyo5bey5ZCv55So55uR5ZCs55qE5Z2Q5qCH5Y+R55Sf5pe277yM5q2k5Ye95pWw5bCG6KKr6LCD55SoXHJcbiAgICAgKiBAcGFyYW0gYWN0b3IgXHJcbiAgICAgKiBAcGFyYW0gcG9zaXRpb25cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IG9uTGVhdmUoYWN0b3I6QWN0b3IsIHBvc2l0aW9uOlZlYzIpOnZvaWRcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWcqOaMh+WumuWdkOagh+S4iuiuvue9ruebkeWQrOeisOaSnuS6i+S7tlxyXG4gICAgICogaWRlbnRpdHnlj6/ku6XlnKhBY3Rvci5JZGVudGl0eemHjOmAieaLqVxyXG4gICAgICog6YKj5oiR5Li65LuA5LmI5LiN5YaZZW51beWRouKApuKAplxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0RGV0ZWN0aW9uKHBvc2l0aW9uOlZlYzIsIGlkZW50aXR5OnN0cmluZyk6dm9pZHtcclxuICAgICAgICBpZiAodGhpcy5kZXRlY3Rpb25FeGlzdChwb3NpdGlvbikpIHsvL+WmguaenOWcqOatpOWkhOW3suWtmOWcqOebkeaOp++8jOWImeWPlua2iOebkeaOp1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNldERldGVjdGlvbuWHveaVsOS4jeiDveWcqOWQjOS4gOS4quWdkOagh+WkmuasoeebkeaOp++8jOivt+afpeeci0NvbGlSZWNpZXZlcuexu1wiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocG9zaXRpb24ueCA+PSB0aGlzLl93aWR0aCB8fCBwb3NpdGlvbi54IDwgMCB8fFxyXG4gICAgICAgICAgICBwb3NpdGlvbi55ID4gdGhpcy5faGVpZ2h0IHx8IHBvc2l0aW9uLnkgPCAwKSB7Ly/lpoLmnpznm5HmjqfkvY3nva7otoXlh7rovrnnlYzvvIzliJnlj5bmtojnm5HmjqdcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHBvc2l0aW9uID0gcG9zaXRpb24uY2xvbmUoKTsvL+WkjeWItuS9jee9ruWvueixoeS7pemYsuatouS8oOWdgOmXrumimFxyXG4gICAgICAgIGxldCBkZXRlY3RvcjpGdW5jdGlvbltdID0gW107Ly/ov5nmmK/nm5HlkKzlh73mlbDvvIzlrZjotbfmnaXlh4blpIfmkqTpmaTnm5HlkKzml7bnlKhcclxuICAgICAgICAvL+iuvue9ruebkeWQrOS6i+S7tlxyXG4gICAgICAgICAgICBkZXRlY3RvclswXSA9IChhY3RvcjpBY3Rvcik9PnsvL+i/m+WFpeS6i+S7tuWHveaVsFxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkVudHJlKGFjdG9yLCBwb3NpdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGV0ZWN0b3JbMV0gPSAoYWN0b3I6QWN0b3IpPT57Ly/nprvlvIDkuovku7blh73mlbBcclxuICAgICAgICAgICAgICAgIHRoaXMub25MZWF2ZShhY3RvciwgcG9zaXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5vbihFdmVudENlbnRyZS5FVHlwZS5FTlRSRShwb3NpdGlvbiwgaWRlbnRpdHkpLCB0aGlzLCBkZXRlY3RvclswXSk7XHJcbiAgICAgICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLm9uKEV2ZW50Q2VudHJlLkVUeXBlLkxFQVZFKHBvc2l0aW9uLCBpZGVudGl0eSksIHRoaXMsIGRldGVjdG9yWzFdKTtcclxuICAgICAgICAvL+iuvue9ruebkeWQrOS6i+S7tlxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX2NhbmNlbGxhdGlvbk1hdHJpeFtwb3NpdGlvbi54XVtwb3NpdGlvbi55XS5wdXNoKCgpPT57Ly/lsIbnm5HlkKznp7vpmaTlh73mlbDlrZjlhaXlh73mlbDnn6npmLVcclxuICAgICAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2Uub2ZmKEV2ZW50Q2VudHJlLkVUeXBlLkVOVFJFKHBvc2l0aW9uLCBpZGVudGl0eSksIHRoaXMsIGRldGVjdG9yWzBdKTtcclxuICAgICAgICB9LCAoKT0+e1xyXG4gICAgICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5vZmYoRXZlbnRDZW50cmUuRVR5cGUuTEVBVkUocG9zaXRpb24sIGlkZW50aXR5KSwgdGhpcywgZGV0ZWN0b3JbMV0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLl9kZXRlY3Rpb25NYXRyaXhbcG9zaXRpb24ueF1bcG9zaXRpb24ueV0gPSB0cnVlOy8v5bCG5q2k5Z2Q5qCH55qE54q25oCB6K6+5Li64oCc5bey6KKr55uR5ZCs4oCdXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnp7vpmaTmjIflrprlnZDmoIfnmoTnorDmkp7kuovku7bnm5HlkKxcclxuICAgICAqIEBwYXJhbSBwb3NpdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb2ZmRGV0ZWN0aW9uKHBvc2l0aW9uOlZlYzIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fY2FuY2VsbGF0aW9uTWF0cml4W3Bvc2l0aW9uLnhdW3Bvc2l0aW9uLnldLmZvckVhY2goKGVsZSk9PnsvL+aJp+ihjOavj+S4gOS4qumihOWtmOeahOWHveaVsFxyXG4gICAgICAgICAgICBlbGUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9jYW5jZWxsYXRpb25NYXRyaXhbcG9zaXRpb24ueF1bcG9zaXRpb24ueV0gPSBbXTsvL+WIoOmZpOatpOWkhOeahOmihOWtmOWHveaVsFxyXG4gICAgICAgIHRoaXMuX2RldGVjdGlvbk1hdHJpeFtwb3NpdGlvbi54XVtwb3NpdGlvbi55XSA9IGZhbHNlOy8v5bCG5q2k5Z2Q5qCH6K6+5Li65pyq55uR5ZCsXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9BY3RvclwiO1xyXG5cclxuZXhwb3J0IGVudW0gRGFtYWdlVHlwZXtcclxuICAgIFBZU0lDQUwsXHJcbiAgICBNQUdJQ0FMLFxyXG4gICAgVFJVRSxcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERhbWFnZXtcclxuXHJcbiAgICBwdWJsaWMgc291cmNlOkFjdG9yID0gbnVsbDsvL+S8pOWus+adpea6kFxyXG4gICAgcHVibGljIHZhbHVlOm51bWJlciA9IDA7Ly/mlLvlh7vliptcclxuICAgIHB1YmxpYyB0eXBlOkRhbWFnZVR5cGUvL+S8pOWus+exu+Wei1xyXG4gICAgcHVibGljIHByaW1hcnk6Ym9vbGVhbiA9IHRydWU7Ly/mmK/lkKbkuLrpnZ7pl7TmjqXkvKTlrrPvvIjpl7TmjqXkvKTlrrPkuI3kvJrop6blj5HmmJ/nhorjgIHlubTnmoTlj43nlLLkuYvnsbvnmoTmlYjmnpzvvIlcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2U6QWN0b3IsIHZhbHVlOm51bWJlciwgdHlwZTpEYW1hZ2VUeXBlKXtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvcHkoKTpEYW1hZ2V7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBEYW1hZ2UodGhpcy5zb3VyY2UsIHRoaXMudmFsdWUsIHRoaXMudHlwZSk7XHJcbiAgICAgICAgcmVzdWx0LnR5cGUgPSB0aGlzLnR5cGU7XHJcbiAgICAgICAgcmVzdWx0LnByaW1hcnkgPSB0aGlzLnByaW1hcnk7XHJcbiAgICAgICAgcmVzdWx0LnNvdXJjZSA9IHRoaXMuc291cmNlO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBEYW1hZ2UsIERhbWFnZVR5cGUgfSBmcm9tIFwiLi9EYW1hZ2VcIjtcclxuaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9BY3RvclwiO1xyXG5pbXBvcnQgeyBBY3RvclR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0RvZEtleVwiO1xyXG5pbXBvcnQgeyBWZWMyIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Eb2RNYXRoXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIFByb2ZpbGXnsbvmmK/lgqjlrZjljZXkvY3ln7rmnKzmlbDmja7vvIjlpoLmlLvlh7vlipvjgIHpmLLlvqHlipvnrYnvvInnmoTnsbtcclxuICog5a6D6L+Y5o+Q5L6b5LiA5YiH55So5LqO6I635Y+WQWN0b3Lkv6Hmga/nmoTmjqXlj6PvvIjlpoLmmK/lkKbog73lpJ/ooYzliqjjgIHmmK/lkKbog73lpJ/pmLvmjKHvvIlcclxuICovXHJcbmV4cG9ydCBjbGFzcyBQcm9maWxlIHtcclxuICAgIHB1YmxpYyBuYW1lOiBTdHJpbmcgPSBcIkNoYW5kbGVyIEJpbmdcIjtcclxuICAgIHB1YmxpYyByZWFkb25seSBrZWVwZXI6QWN0b3I7XHJcblxyXG4gICAgcHJpdmF0ZSBfcHJlcFRpbWU6IG51bWJlciA9IDEwMDsvL+WJjeaRh+aXtumXtFxyXG4gICAgcHJpdmF0ZSBfYWZ0ZXJUaW1lOiBudW1iZXIgPSAxMDA7Ly/lkI7mkYfml7bpl7RcclxuICAgIHB1YmxpYyBpbnZpc2libGU6IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpumakOW9olxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Lyk5a6z6K6h566X55u45YWz55qE5L+u5pS55ZKM6K6/6Zeu5o6l5Y+jXHJcbiAgICAgKiDkvZzogIXvvJrokbFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGF0dGFja1Bvd2VyOiBudW1iZXIgPSAxMDA7Ly/mlLvlh7vliptcclxuICAgIHB1YmxpYyBhdGtTY2FsZTpudW1iZXIgPSAxOy8v5pS75Ye75YCN546HXHJcbiAgICBwdWJsaWMgYXRrQnVmZjpudW1iZXIgPSAxOy8v5pS75Ye755m+5YiG5q+U5o+Q5Y2HXHJcbiAgICBwdWJsaWMgYXJtb3VyOm51bWJlciA9IDUwOy8v54mp55CG6Ziy5b6hXHJcbiAgICBwdWJsaWMgbWFnaWNBcm1vdXI6bnVtYmVyID0gMDsvL+azleacr+aKl+aAp1xyXG4gICAgcHVibGljIGRtZ1R5cGU6RGFtYWdlVHlwZSA9IERhbWFnZVR5cGUuUFlTSUNBTDsvL+S8pOWus+exu+Wei1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihrZWVwZXI6QWN0b3IsIHJlczphbnkpe1xyXG4gICAgICAgIHRoaXMua2VlcGVyID0ga2VlcGVyO1xyXG4gICAgICAgIC8vdG9kbzogYWJvdXQgcmVzXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldE5vZGVQb3MoKTpWZWMye1xyXG4gICAgICAgIHJldHVybiB0aGlzLmtlZXBlci50cmFuc2Zvcm0ucG9zLmdldE5vZGVQb3MoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS8oOWFpeS4gOS4qkFjdG9y77yM6L+U5Zue5Lyk5a6z5a+56LGhXHJcbiAgICAgKiDmraPlnKjogIPomZHlup/lvIPmraTpoblcclxuICAgICAqIEBwYXJhbSBzb3VyY2UgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZW5lcmF0ZURhbWFnZShzb3VyY2U6QWN0b3IpOkRhbWFnZXtcclxuICAgICAgICByZXR1cm4gbmV3IERhbWFnZShzb3VyY2UsIHRoaXMuYXR0YWNrUG93ZXIqdGhpcy5hdGtTY2FsZSp0aGlzLmF0a0J1ZmYsIHRoaXMuZG1nVHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhpdFBvaW50OiBudW1iZXIgPSAxMDsvL+eUn+WRveWAvFxyXG4gICAgcHVibGljIG1heEhpdFBvaW50OiBudW1iZXIgPSAxMDsvL+acgOmrmOeUn+WRveWAvFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYnkgWFdWXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoYXRlTGV2ZWw6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgYXR0YWNrUmFuZ2VSYWRpdXM6IG51bWJlcjtcclxuXHJcblxyXG4gICAgcHVibGljIGdldCBwcmVwVGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wcmVwVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGFmdGVyVGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hZnRlclRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBibG9ja2FibGUoKTogYm9vbGVhbntcclxuICAgICAgICAvL3RvZG86IOWIpOaWreaYr+WQpuWPr+S7peiiq+mYu+aMoVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmmK/lkKbpnIDopoHlnKhwcm9maWxl5Lit5bCG5LiN5ZCM55qE5pWw5YC85YiG57G777yfXHJcbiAqXHJcbiAqLyIsImltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuaW1wb3J0IHsgRG9kTWF0aCwgVmVjMiB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vRG9kTWF0aFwiO1xyXG5pbXBvcnQgeyBDb2xpRW1pdCB9IGZyb20gXCIuL0NvbGlNZXNzYWdlXCI7XHJcbmltcG9ydCB7IERlcGxveUludGVyZXN0ZWRNb2R1bGUgfSBmcm9tIFwiLi9Nb2R1bGVJbnRlcmZhY2VcIjtcclxuXHJcbi8qKlxyXG4gKiDlr7nkuIDkuKrljZXkvY3nmoTlh6DkvZXnirbmgIHnmoTmj4/ov7BcclxuICovXHJcbmV4cG9ydCBjbGFzcyBUcmFuc2Zvcm0gaW1wbGVtZW50cyBEZXBsb3lJbnRlcmVzdGVkTW9kdWxle1xyXG5cclxuICAgIHN0YXJ0KHBvczogVmVjMik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNXb3JraW5nID0gKCk9PntyZXR1cm4gdHJ1ZX07XHJcbiAgICAgICAgdGhpcy5wb3Muc2V0Tm9kZVBvcyhwb3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHRlcm1pbmF0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlzV29ya2luZyA9ICgpPT57cmV0dXJuIGZhbHNlfTtcclxuICAgIH1cclxuXHJcbiAgICBpc1dvcmtpbmcoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwb3M6UG9zID0gbmV3IFBvcygpO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihrZWVwZXI6QWN0b3Ipe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBQb3N7XHJcbiAgICAvLyBwdWJsaWMgYXV0b1N3aXRjaFRhcmdldDpib29sZWFuID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBkYXRhOlZlYzIgPSBuZXcgVmVjMigwLDApOy8v5L2N572uXHJcblxyXG5cclxuICAgIFxyXG4gICAgcHVibGljIHRhcmdldDpWZWMyID0gbmV3IFZlYzIoMCwwKTsvL+ebruagh1xyXG4gICAgcHVibGljIHNwZWVkOm51bWJlciA9IDU7Ly/pgJ/luqZcclxuICAgIHB1YmxpYyBhcHByb2FjaDpudW1iZXIgPSAwOy8v6YC86L+R5qyh5pWwXHJcbiAgICBwdWJsaWMgdmVjU3BlZWQ6VmVjMiA9IG5ldyBWZWMyKDAsMCk7Ly/liIbph4/pgJ/luqZcclxuICAgIHByaXZhdGUgX2Fycml2ZWQ6Ym9vbGVhbiA9IHRydWU7Ly/lt7LliLDovr7nm67nmoTlnLAo5q+P5qyh6K6+572u5paw55uu55qE5Zyw5pe26K6+5Li6ZmFsc2UpXHJcbiAgICBwdWJsaWMgZ2V0IGFycml2ZWQoKTpib29sZWFue3JldHVybiB0aGlzLl9hcnJpdmVkO30vL+iOt+WPluaYr+WQpuW3suWIsOi+vueahOS/oeaBr1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u55uu55qE5Zyw5bm26YeN6K6+5YiG6YeP6YCf5bqmXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0VGFyZ2V0KHRhcmdldDpWZWMyKTp2b2lke1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgIHRoaXMuYWltKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7nm7Tnur/pgJ/luqblubbph43orr7liIbph4/pgJ/luqZcclxuICAgICAqIEBwYXJhbSBzcGVlZCBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFNwZWVkKHNwZWVkOm51bWJlcik6dm9pZHtcclxuICAgICAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XHJcbiAgICAgICAgdGhpcy5haW0oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuoeeul+enu+WKqOWPguaVsCzlubblsIZfYXJyaXZlZOiuvuS4umZhbHNlXHJcbiAgICAgKiDlsIbkvJrph43orr7liIbph4/pgJ/luqblkozpgLzov5HmrKHmlbBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhaW0oKTp2b2lke1xyXG4gICAgICAgIHRoaXMudmVjU3BlZWQgPSBEb2RNYXRoLm1vdmVUb0NvbXBvbmVudCh0aGlzLmRhdGEsdGhpcy50YXJnZXQsdGhpcy5zcGVlZCk7XHJcbiAgICAgICAgdGhpcy5hcHByb2FjaCA9IHRoaXMuZGF0YS5kaXN0YW5jZVRvKHRoaXMudGFyZ2V0KSAvIHRoaXMuc3BlZWQ7XHJcbiAgICAgICAgdGhpcy5fYXJyaXZlZCA9IGZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ZCR55uu5qCH54K556e75Yqo5LiA5qyhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtb3ZlKCk6dm9pZHtcclxuICAgICAgICB0aGlzLmFwcHJvYWNoIC09IDE7XHJcbiAgICAgICAgaWYgKHRoaXMuYXBwcm9hY2ggPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEueCA9IHRoaXMudGFyZ2V0Lng7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS55ID0gdGhpcy50YXJnZXQueTtcclxuICAgICAgICAgICAgdGhpcy5fYXJyaXZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kYXRhLnggPSB0aGlzLmRhdGEueCArIHRoaXMudmVjU3BlZWQueDtcclxuICAgICAgICB0aGlzLmRhdGEueSA9IHRoaXMuZGF0YS55ICsgdGhpcy52ZWNTcGVlZC55O1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Tm9kZVBvcygpOlZlYzJ7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMyKE1hdGguZmxvb3IodGhpcy5kYXRhLnggLyBDb2xpRW1pdC5HTE9CQUxfVU5JVF9XSURUSCksIE1hdGguZmxvb3IodGhpcy5kYXRhLnkgLyBDb2xpRW1pdC5HTE9CQUxfVU5JVF9IRUlHSFQpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS+neaNruWcsOWbvuiKgueCueiuvue9ruS9jee9rlxyXG4gICAgICogQHBhcmFtIHBvcyDmraTlpITnmoRWZWMy5a6e5L6L5YKo5a2Y55qE5piv5pW05pWw5pWw5o2u77yM55So5LqO5o+P6L+w5Zyw5Zu+6IqC54K55L2N572uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXROb2RlUG9zKHBvczpWZWMyKTp2b2lke1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IG5ldyBWZWMyKHBvcy54ICogQ29saUVtaXQuR0xPQkFMX1VOSVRfV0lEVEgsIHBvcy55ICogQ29saUVtaXQuR0xPQkFMX1VOSVRfSEVJR0hUKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG5cclxuICAgIH1cclxufSIsImltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuaW1wb3J0IFBlcmZvcm1hbmNlQ2VudHJlIGZyb20gXCIuLi8uLi8uLi9Db21tb24vR3JhcGhpY3MvUGVyZm9ybWFuY2VfTW9kdWxlL1BlcmZvcm1hbmNlQ2VudHJlXCI7XHJcbmltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0RvZE1hdGhcIjtcclxuaW1wb3J0IEZpeFRpbWUgZnJvbSBcIi4uLy4uLy4uL0ZpeC9GaXhUaW1lXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVW5pdFJlbmRlcntcclxuXHJcbiAgICBwcml2YXRlIF9rZWVwZXI6QWN0b3I7XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGtlZXBlcjpBY3Rvcil7XHJcbiAgICAgICAgdGhpcy5fa2VlcGVyID0ga2VlcGVyO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgYm9ybkFuaW1hdGlvbigpOnZvaWR7XHJcbiAgICAgICAgUGVyZm9ybWFuY2VDZW50cmUuaW5zdGFuY2UuZGlzcGxheUFjdG9yKHRoaXMuX2tlZXBlciwgdGhpcy5fa2VlcGVyLnRyYW5zZm9ybS5wb3MuZGF0YSwgbmV3IFZlYzIoMzAsMzApLCBcIiNmZjAwZmZcIik7XHJcbiAgICAgICAgbGV0IGJvcm50aW1lID0gRml4VGltZS5lbGFwc2VkVGltZTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgbG9vcGVyID0gKCk9PntcclxuICAgICAgICAgICAgaWYgKEZpeFRpbWUuZWxhcHNlZFRpbWUgLSBib3JudGltZSA+PSAzKSB7XHJcbiAgICAgICAgICAgICAgICBQZXJmb3JtYW5jZUNlbnRyZS5pbnN0YW5jZS5kaXN0cm95QWN0b3IodGhpcy5fa2VlcGVyLCBuZXcgVmVjMigpKTtcclxuICAgICAgICAgICAgICAgIExheWEudGltZXIuY2xlYXIodGhpcywgbG9vcGVyKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBQZXJmb3JtYW5jZUNlbnRyZS5pbnN0YW5jZS5lZGl0QmFyKHRoaXMuX2tlZXBlciwgMCwgKEZpeFRpbWUuZWxhcHNlZFRpbWUgLSBib3JudGltZSkvMyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBMYXlhLnRpbWVyLmxvb3AoMTYsIHRoaXMsIGxvb3Blcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlcGxveSgpOnZvaWR7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJEZXBsb3lcIik7XHJcbiAgICAgICAgUGVyZm9ybWFuY2VDZW50cmUuaW5zdGFuY2UuZGlzcGxheUFjdG9yKHRoaXMuX2tlZXBlciwgdGhpcy5fa2VlcGVyLnRyYW5zZm9ybS5wb3MuZGF0YSwgbmV3IFZlYzIoNTAsNTApKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbW92ZSh2ZWM6VmVjMik6dm9pZHtcclxuICAgICAgICBQZXJmb3JtYW5jZUNlbnRyZS5pbnN0YW5jZS5tb3ZlKHRoaXMuX2tlZXBlciwgdmVjKTtcclxuICAgIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IEFjdG9yIGZyb20gXCIuL0FjdG9yXCI7XHJcbmltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL0RvZE1hdGhcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlIHtcclxuXHJcbiAgICBwcml2YXRlIF9wYXRoOlZlYzJbXSA9IFZlYzIubGlzdEZyb21MaXN0KFtcclxuICAgICAgICBbNTAwLDUwMF0sXHJcbiAgICAgICAgWzAsMF0sXHJcbiAgICAgICAgWzUwMCwwXSxcclxuICAgICAgICBbMCw1MDBdXHJcbiAgICBdKTtcclxuICAgIHByaXZhdGUgX3RhckNvdW50Om51bWJlciA9IC0xOy8v55uu5YmN5oyH5ZCR55qE55uu5qCHXHJcblxyXG4gICAgY29uc3RydWN0b3Ioa2VlcGVyOkFjdG9yLCByZXM6YW55KXtcclxuICAgICAgICAvL3RvZG86IOagueaNrnJlc+iOt+WPluW6lOi1sOeahOi3r+e6v1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjdXJyZW50VGFyZ2V0KCk6VmVjMntcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGF0aFt0aGlzLl90YXJDb3VudF07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5leHQoKTpib29sZWFue1xyXG4gICAgICAgIGlmICh0aGlzLl90YXJDb3VudCA8IHRoaXMuX3BhdGgubGVuZ3RoIC0gMSkgey8v6L+Y5pyJ5LiL5LiA6aG5XHJcbiAgICAgICAgICAgIHRoaXMuX3RhckNvdW50ICs9IDE7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7Ly/msqHmnInkuIvkuIDpoblcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7S1ZQYWlyfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0RvZERhdGFTdHJ1Y3R1cmVcIjtcclxuaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9BY3RvclwiO1xyXG5pbXBvcnQge0V2ZW50Q2VudHJlfSBmcm9tIFwiLi4vLi4vLi4vRXZlbnQvRXZlbnRDZW50cmVcIjtcclxuaW1wb3J0IHsgU2Vla2VyIH0gZnJvbSBcIi4vQWN0b3JTZWVrZXJcIjtcclxuaW1wb3J0IEZpeFRpbWUgZnJvbSBcIi4uLy4uLy4uL0ZpeC9GaXhUaW1lXCI7XHJcbmltcG9ydCB7IE1hcE5vZGVTZWVrZXIgfSBmcm9tIFwiLi9NYXBOb2RlU2Vla2VyXCI7XHJcbmltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0RvZE1hdGhcIjtcclxuaW1wb3J0IHsgRGVwbG95SW50ZXJlc3RlZE1vZHVsZSB9IGZyb20gXCIuLi9BY3Rvck1vZHVsZXMvTW9kdWxlSW50ZXJmYWNlXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIGJ5IFhXVlxyXG4gKiBcclxuICog6JGxIOS/ruaUueS6jiAzLzE4XHJcbiAqICAgICAg5bCGU2Vla2Vy5oyq5YWl5pS75Ye754q25oCB5py65YaF77yM5LiN55SxQWN0b3LmjIHmnIlcclxuICogICAgICDkuI3lkIznmoTmlLvlh7vojIPlm7TnlLFTZWVrZXLmm7/mjaLmnaXlrp7njrBcclxuICogICAgICDkuI3lkIznmoTmlLvlh7vpgLvovpHvvIjojIPlm7Qv5Y2V5L2T77yJ55Sx5L+u5pS5cHJvZmlsZeS4reeahOWPguaVsOWunueOsFxyXG4gKiAgICAgIEF0a1N0YXRlTWFjaGluZei0n+i0o+WvueWkluaPkOS+m+aJgOacieS/ruaUuS/orr/pl67mjqXlj6NcclxuICogICAgICDku43pnIDlr7nmraTov5vooYzov5vkuIDmraXop4TliJLvvIjljZXkvZMv5aSa5L2TL+e+pOS9k+aUu+WHu+mAu+i+keaYr+S7heeUseS4gOS4quWPguaVsOWunueOsO+8jOi/mOaYr+eUseWkmuaAgeWunueOsO+8iVxyXG4gKiAgICAgIC8vdG9kbzrml7bpl7TntK/liqDpgLvovpHmlLnlj5hcclxuICogXHJcbiAqL1xyXG5cclxuZW51bSBTdGF0ZVR5cGUge1xyXG4gICAgV0FJVCA9IFwiV0FJVFwiLFxyXG4gICAgUFJFUEFSRSA9IFwiUFJFUEFSRVwiLFxyXG4gICAgQUZURVJfQVRLID0gXCJBRlRFUl9BVEtcIlxyXG59XHJcblxyXG5pbnRlcmZhY2UgU3RhdGUge1xyXG4gICAgbmFtZSgpOnN0cmluZ1xyXG5cclxuICAgIGV4ZWN1dGUobWFjaGluZTogQXRrU3RhdGVNYWNoaW5lKTogdm9pZFxyXG5cclxuICAgIHJlc2V0KCk6IHZvaWRcclxufVxyXG5cclxuYWJzdHJhY3QgY2xhc3MgQmFzZVN0YXRlIGltcGxlbWVudHMgU3RhdGUge1xyXG4gICAgcHVibGljIG5hbWUoKTpzdHJpbmd7cmV0dXJuIFwiQmFzZVN0YXRlXCI7fVxyXG5cclxuICAgIHByb3RlY3RlZCB0aW1lOiBudW1iZXIgPSAwOy8v5pe26Ze057Sv5Yqg6YC76L6R5pS55Y+YXHJcblxyXG4gICAgcHVibGljIHJlc2V0KCkge1xyXG4gICAgICAgIHRoaXMudGltZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgYWJzdHJhY3QgZXhlY3V0ZShtYWNoaW5lOiBBdGtTdGF0ZU1hY2hpbmUpOiB2b2lkO1xyXG5cclxufVxyXG5cclxuY2xhc3MgV2FpdCBleHRlbmRzIEJhc2VTdGF0ZSB7XHJcbiAgICBwdWJsaWMgbmFtZSgpOnN0cmluZ3tyZXR1cm4gXCJXYWl0U3RhdGVcIjt9XHJcblxyXG4gICAgcHVibGljIGV4ZWN1dGUobWFjaGluZTogQXRrU3RhdGVNYWNoaW5lKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZm9jdXMgPSBtYWNoaW5lLnNlZWtlci5nZXRGb2N1cygpO1xyXG4gICAgICAgIGlmIChmb2N1cyAhPSBudWxsICYmIGZvY3VzICE9IHVuZGVmaW5lZCkgey8v5aaC5p6c6IO95aSf5om+5Yiw5pWM5Lq6XHJcbiAgICAgICAgICAgIG1hY2hpbmUuY2hhbmdlU3RhdGUoU3RhdGVUeXBlLlBSRVBBUkUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZvdW5kIEVuZW15XCIpO1xyXG4gICAgICAgIH0gZWxzZSB7Ly/lpoLmnpzmib7kuI3liLDmlYzkurpcclxuICAgICAgICAgICAgLy90b2RvOiBub25lXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5aaC5p6cc2Vla2Vy5Lit5a2Y5Zyo5pWM5Lq677yMcmVzZXQgUHJlcGFyZeW5tui3s+i9rOWIsFByZXBhcmXpmLbmrrVcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmNsYXNzIFByZXBhcmUgZXh0ZW5kcyBCYXNlU3RhdGUge1xyXG4gICAgcHVibGljIG5hbWUoKTpzdHJpbmd7cmV0dXJuIFwiUHJlcGFyZVN0YXRlXCI7fVxyXG5cclxuICAgIHB1YmxpYyBleGVjdXRlKG1hY2hpbmU6IEF0a1N0YXRlTWFjaGluZSk6IHZvaWQge1xyXG4gICAgXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIC8v5Yik5pat5piv5ZCm6ZyA6KaB6YeN5paw6YCJ5oup55uu5qCH5bm26YeN572u5YmN5pGHXHJcbiAgICAgICAgbGV0IHNlZWtlciA9IG1hY2hpbmUuc2Vla2VyO1xyXG4gICAgICAgIGxldCBhY3RvciA9IG1hY2hpbmUua2VlcGVyO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHNlZWtlci5mb2N1c0NoYW5nZWQpO1xyXG4gICAgICAgIGlmIChzZWVrZXIuZm9jdXNDaGFuZ2VkKCkpIHsvL+W9k+WJjeebruagh+W3suS/ruaUuVxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInByZXBhcmU6Rm9jdXNjaGFuZ2VkXCIpO1xyXG4gICAgICAgICAgICBtYWNoaW5lLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgaWYgKHNlZWtlci5nZXRGb2N1cygpICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIG1hY2hpbmUucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWFjaGluZS5jaGFuZ2VTdGF0ZShTdGF0ZVR5cGUuV0FJVCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+W9k+WJjeebruagh+acquS/ruaUuVxyXG4gICAgICAgIG1hY2hpbmUudGljKCk7XHJcbiAgICAgICAgaWYgKG1hY2hpbmUucmVhZHkpIHtcclxuICAgICAgICAgICAgLy90b2RvOiDov5vooYzmlLvlh7so6L+b6KGMcHJvZmlsZeWPguaVsOWIpOaWrSlcclxuICAgICAgICAgICAgbWFjaGluZS5rZWVwZXIuYXR0YWNrKHNlZWtlci5nZXRGb2N1cygpKTtcclxuICAgICAgICAgICAgbWFjaGluZS5jaGFuZ2VTdGF0ZShTdGF0ZVR5cGUuQUZURVJfQVRLKTsvL+i9rOaNouWIsOWQjuaRh1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkF0dGFjayBIYXBwZW5lZFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBBZnRlckF0ayBleHRlbmRzIEJhc2VTdGF0ZSB7XHJcbiAgICBwdWJsaWMgbmFtZSgpOnN0cmluZ3tyZXR1cm4gXCJBZnRlclN0YXRlXCI7fVxyXG4gICAgcHVibGljIGV4ZWN1dGUobWFjaGluZTogQXRrU3RhdGVNYWNoaW5lKTogdm9pZCB7XHJcbiAgICAgICAgbWFjaGluZS50aWMoKTtcclxuICAgICAgICBpZiAobWFjaGluZS5jb29sQ29tcGxldGUpIHtcclxuICAgICAgICAgICAgbWFjaGluZS5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIGlmIChtYWNoaW5lLnNlZWtlci5nZXRGb2N1cygpICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIG1hY2hpbmUuY2hhbmdlU3RhdGUoU3RhdGVUeXBlLlBSRVBBUkUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWFjaGluZS5jaGFuZ2VTdGF0ZShTdGF0ZVR5cGUuV0FJVCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBdHRhY2sgcmVjb3ZlclwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDnirbmgIHmnLrnsbtcclxuICovXHJcbmV4cG9ydCBjbGFzcyBBdGtTdGF0ZU1hY2hpbmUgaW1wbGVtZW50cyBEZXBsb3lJbnRlcmVzdGVkTW9kdWxle1xyXG4gICAgLypcclxuICAgICog5omA5bGeQWN0b3JcclxuICAgICogKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBrZWVwZXI6IEFjdG9yO1xyXG4gICAgLyoqXHJcbiAgICAgKiDlvZPliY3nirbmgIFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjdXJTdGF0ZTogU3RhdGU7XHJcbiAgICAvKipcclxuICAgICAqIOWPr+S9v+eUqOeahOeKtuaAgeWIl+ihqFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRlTGlzdDogS1ZQYWlyPFN0YXRlPiA9IG5ldyBLVlBhaXI8U3RhdGU+KCk7XHJcblxyXG4gICAgcHVibGljIHNlZWtlcjogU2Vla2VyO1xyXG5cclxuICAgIHByaXZhdGUgX3ByZXBUaW1lOm51bWJlcjsvL+WJjeaRh+aXtumXtC/luKdcclxuICAgIHByaXZhdGUgX2Nvb2xUaW1lOm51bWJlcjsvL+WQjuaRh+aXtumXtC/luKdcclxuICAgIHByaXZhdGUgX2N1clBvaW50Om51bWJlciA9IDA7Ly/lvZPliY3lt7Lnp6/ok4TnmoTngrnmlbBcclxuICAgIHByaXZhdGUgX3ZlbG9jaXR5Om51bWJlciA9IDE7Ly/lvZPliY3ntK/liqDpgJ/njoco54K55pWwL+W4pylcclxuXHJcbiAgICBwdWJsaWMgZ2V0IHJlYWR5KCk6Ym9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5fY3VyUG9pbnQgPj0gdGhpcy5fcHJlcFRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRpYygpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fY3VyUG9pbnQgKz0gdGhpcy5fdmVsb2NpdHk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjb29sQ29tcGxldGUoKTpib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJQb2ludCA+PSB0aGlzLl9wcmVwVGltZSt0aGlzLl9jb29sVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVmcmVzaCgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fY3VyUG9pbnQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIGtlZXBlciDnirbmgIHmnLrmiYDmnInogIVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioa2VlcGVyOiBBY3RvciwgcmVzOmFueSkge1xyXG4gICAgICAgIHRoaXMua2VlcGVyID0ga2VlcGVyO1xyXG4gICAgICAgIHRoaXMuY3VyU3RhdGUgPSBuZXcgV2FpdCgpO1xyXG4gICAgICAgIHRoaXMuc3RhdGVMaXN0LmVkaXQoU3RhdGVUeXBlLldBSVQsIHRoaXMuY3VyU3RhdGUpO1xyXG4gICAgICAgIHRoaXMuc3RhdGVMaXN0LmVkaXQoU3RhdGVUeXBlLlBSRVBBUkUsIG5ldyBQcmVwYXJlKCkpO1xyXG4gICAgICAgIHRoaXMuc3RhdGVMaXN0LmVkaXQoU3RhdGVUeXBlLkFGVEVSX0FUSywgbmV3IEFmdGVyQXRrKCkpO1xyXG4gICAgICAgIC8vdG9kbzogYWJvdXQgcmVzXHJcblxyXG4gICAgICAgIHRoaXMuX3ByZXBUaW1lID0gMzAwO1xyXG4gICAgICAgIHRoaXMuX2Nvb2xUaW1lID0gMzAwO1xyXG5cclxuICAgICAgICB0aGlzLnNlZWtlciA9IG5ldyBNYXBOb2RlU2Vla2VyKHRoaXMua2VlcGVyLnByb2ZpbGUuZ2V0Tm9kZVBvcygpLnBsdXMobmV3IFZlYzIoMywzKSksIHJlc1sneHh4J10sIDApO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhcnQocG9zOlZlYzIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5pc1dvcmtpbmcgPSAoKT0+e3JldHVybiB0cnVlfTtcclxuICAgICAgICB0aGlzLnNlZWtlci5yZXBvc2l0aW9uKHBvcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRlcm1pbmF0ZSgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5pc1dvcmtpbmcgPSAoKT0+e3JldHVybiBmYWxzZX07XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc1dvcmtpbmcoKTpib29sZWFue3JldHVybiBmYWxzZTt9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliLfmlrDlvZPliY3nirbmgIHvvIzmr4/luKfosIPnlKhcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmN1clN0YXRlLm5hbWUoKSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJwdDpcIiArIHRoaXMuX2N1clBvaW50KTtcclxuICAgICAgICB0aGlzLnNlZWtlci51cGRhdGUoKTtcclxuICAgICAgICBpZiAodGhpcy5rZWVwZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJTdGF0ZS5leGVjdXRlKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaUueWPmOW9k+WJjeeKtuaAge+8jOaWsOeKtuaAgeS8mumHjee9ruS4uuWIneWni+aAgVxyXG4gICAgICogQHBhcmFtIHN0YXRlVHlwZSDmlrDnmoTnirbmgIHnsbvlnotcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNoYW5nZVN0YXRlKHN0YXRlVHlwZTogU3RhdGVUeXBlKSB7XHJcbiAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5zdGF0ZUxpc3QucmVhZChzdGF0ZVR5cGUpO1xyXG4gICAgICAgIHN0YXRlLnJlc2V0KCk7XHJcbiAgICAgICAgdGhpcy5jdXJTdGF0ZSA9IHN0YXRlO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuIiwiaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9BY3RvclwiO1xyXG5pbXBvcnQgeyBTZWVrZXIgfSBmcm9tIFwiLi9BY3RvclNlZWtlclwiO1xyXG5pbXBvcnQgeyBWZWMyIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Eb2RNYXRoXCI7XHJcbmltcG9ydCB7IEFjdG9yVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vRG9kS2V5XCI7XHJcbmltcG9ydCBSaG9kZXNHYW1lIGZyb20gXCIuLi8uLi9SaG9kZXNHYW1lXCI7XHJcbmltcG9ydCB7IEFycmF5QWxnbyB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vRG9kRGF0YVN0cnVjdHVyZVwiO1xyXG5cclxuLyoqXHJcbiAqIOS9nOiAhe+8muiNieeUn+iRsVxyXG4gKiBcclxuICogQmxvY2tlcuaYr+mYu+aMoeaooeWdl1xyXG4gKiDlgqjlrZjpmLvmjKHnm7jlhbPnmoTkv6Hmga9cclxuICog5a6D6LSf6LSj5q+P5bin5qOA5rWL5bmy5ZGY5Y+v6Zi75oyh55qE5L2N572u5piv5ZCm5pyJ5pWM5Lq66L+b5YWl77yM5bm25Yaz5a6a5piv5ZCm6Zi75oyhXHJcbiAqIFxyXG4gKiBcclxuICogLy90b2RvOiDlpoLmnpzov5vooYzpmLvmjKHmiJbop6PpmaTpmLvmjKHvvIxCbG9ja2Vy5bCG5Lya5Y+R5biD5LqL5Lu2XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQmxvY2tlcntcclxuXHJcbiAgICBwcml2YXRlIF9rZWVwZXI6QWN0b3I7XHJcbiAgICBwcml2YXRlIF9wb3M6VmVjMjtcclxuICAgIHByaXZhdGUgX2Jsb2NrTGlzdDpBY3RvcltdID0gW107Ly/lt7LpmLvmjKHnmoTliJfooahcclxuICAgIHByaXZhdGUgX2Jsb2NrZWRCeTpBY3RvciA9IG51bGw7Ly/ooqvosIHpmLvmjKFcclxuICAgIHByaXZhdGUgX2Jsb2NrQWJpbGl0eTpudW1iZXIgPSAzOy8v6Zi75oyh6IO95YqbXHJcbiAgICBwcml2YXRlIF9icmVha3Rocm91Z2g6bnVtYmVyID0gMTsvL+WPjemYu+aMoeiDveWKm1xyXG5cclxuICAgIHB1YmxpYyBnZXQgaXNCbG9ja2VkKCk6Ym9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5fYmxvY2tlZEJ5ICE9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3Ioa2VlcGVyOkFjdG9yLCByZXM6YW55KXtcclxuICAgICAgICB0aGlzLl9rZWVwZXIgPSBrZWVwZXI7XHJcbiAgICAgICAgdGhpcy5fcG9zID0ga2VlcGVyLnByb2ZpbGUuZ2V0Tm9kZVBvcygpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fa2VlcGVyLnR5cGUgIT0gQWN0b3JUeXBlLk9wZXJhdG9yKSB7Ly/kuI3mmK/lubLlkZjnsbvlnovnmoTor53lsLHmuIXnqbp1cGRhdGXmlrnms5VcclxuICAgICAgICAgICAgdGhpcy51cGRhdGUgPSAoKT0+e307XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vdG9kbzog5qC55o2ucmVz6K6+572u6Zi75oyh6IO95Yqb44CB5Y+N6Zi75oyh6IO95YqbXHJcblxyXG4gICAgICAgIC8vdGVzdFxyXG4gICAgICAgIHRoaXMuX3BvcyA9IG5ldyBWZWMyKDQsNCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDph43orr7pmLvmjKHkvY3nva5cclxuICAgICAqIEBwYXJhbSBwb3Mg5Zyw5Zu+6IqC54K55L2N572u77yM5pW05pWwVmVjMlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVwb3NpdGlvbihwb3M6VmVjMik6dm9pZHtcclxuICAgICAgICB0aGlzLl9wb3MgPSBwb3M7XHJcbiAgICAgICAgdGhpcy5fYmxvY2tMaXN0LmZvckVhY2goZWxlPT57XHJcbiAgICAgICAgICAgIHRoaXMuX2Jsb2NrQWJpbGl0eSArPSBlbGUuYmxvY2tlci5fYnJlYWt0aHJvdWdoO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2Jsb2NrTGlzdCA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTp2b2lke1xyXG4gICAgICAgIC8qIOebruWJjeeahOeul+azleS8muS6p+eUn+S4gOS4quWIpOWumumXrumimO+8mlxyXG4gICAgICAgICAqIOiuvuacieebuOmCu+eahOS4pOS4quagvOWtkEHlkoxC77yMQuWcqOWPs+i+ue+8jEHkuIrnq5nnnYDmjqjnjovvvIjmnJ3lj7PvvInvvIxC5LiK56uZ552A5aGe6Zu35aiFXHJcbiAgICAgICAgICog5pWM5Lq65Zyo44CQ56e75YWl44CRQuagvOaXtuS8muiiq+WhnuiOseWohemYu+aMoVxyXG4gICAgICAgICAqIOatpOaXtueUseS6juaOqOeOi+eahOaUu+WHu+iMg+WbtOaYr+S4pOagvO+8jOWlueWPr+S7peaUu+WHu+WIsOWhnumbt+WohemYu+aMoeeahOaVjOS6ulxyXG4gICAgICAgICAqIOi/meS4jua4uOaIj+ihqOeOsOebuOWGsueqge+8muaUu+WHu+iMg+WbtDLmoLznmoTov5HljavmmK/ml6Dms5Xot6jkuIDkuKrkurrmlLvlh7vmlYzkurrnmoTvvIwz5qC85omN6KGM77yI5oiR5Y2w6LGh5Lit5piv77yJXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICog6L+Z5Liq6Zeu6aKY5Zyo5q2k54mI5pys5pqC5LiU5b+955WlXHJcbiAgICAgICAgKi9cclxuICAgICAgICBpZiAodGhpcy5fYmxvY2tBYmlsaXR5IDw9IDApIHsvL+ayoeaciemYu+aMoeiDveWKm+WwseS4jeiAg+iZkeWJqeS4i+eahOS6i+S6hlxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsaXN0OkFjdG9yW10gPSBSaG9kZXNHYW1lLkluc3RhbmNlLmJhdHRsZS5tYXBOb2RlQ1BVLm1hdHJpeEdldCh0aGlzLl9wb3MpOy8v6I635Y+W6Zi75oyh55uu5qCHXHJcbiAgICAgICAgbGV0IG5ld0NhcHR1cmU6QWN0b3JbXSA9IEFycmF5QWxnby5maW5kQ29tcFNldChsaXN0LCB0aGlzLl9ibG9ja0xpc3QpO1xyXG4gICAgICAgIG5ld0NhcHR1cmUgPSBuZXdDYXB0dXJlLmZpbHRlcihlbGU9PntcclxuICAgICAgICAgICAgcmV0dXJuIGVsZS5ibG9ja2VyLl9ibG9ja2VkQnkgPT0gbnVsbCAmJiBlbGUucHJvZmlsZS5ibG9ja2FibGU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy/lj6rpgInlj5bml6DkurrpmLvmjKHkuJTlj6/ooqvpmLvmjKHnmoTpg6jliIZcclxuICAgICAgICBpZiAobmV3Q2FwdHVyZS5sZW5ndGggPT0gMCkgey8v5rKh5pyJ5Ye6546w5paw55qE6Zi75oyh55uu5qCHXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbmV3Q2FwdHVyZS5mb3JFYWNoKGVsZT0+e1xyXG4gICAgICAgICAgICBpZiAoZWxlLmJsb2NrZXIuX2JyZWFrdGhyb3VnaCA8PSB0aGlzLl9ibG9ja0FiaWxpdHkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Jsb2NrTGlzdC5wdXNoKGVsZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ibG9ja0FiaWxpdHkgLT0gZWxlLmJsb2NrZXIuX2JyZWFrdGhyb3VnaDtcclxuICAgICAgICAgICAgICAgIGVsZS5ibG9ja2VyLl9ibG9ja2VkQnkgPSB0aGlzLl9rZWVwZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBBY3RvclR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0RvZEtleVwiO1xyXG5pbXBvcnQgeyBTZWVrZXIgfSBmcm9tIFwiLi9BY3RvclNlZWtlclwiO1xyXG5pbXBvcnQgeyBWZWMyIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Eb2RNYXRoXCI7XHJcbmltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuaW1wb3J0IFJob2Rlc0dhbWUgZnJvbSBcIi4uLy4uL1Job2Rlc0dhbWVcIjtcclxuaW1wb3J0IHsgQXJyYXlBbGdvIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Eb2REYXRhU3RydWN0dXJlXCI7XHJcblxyXG4vKipcclxuICog5q2k5a+56LGh5piv5LiA56eN5Y+v5Lul6KKr5pS75Ye754q25oCB5py65bqU55So55qEQWN0b3LmkJzntKLlmahcclxuICog5LiT6Zeo55So5p2l5a+55bqU5Zyw5Zu+6IqC54K55pCc57Si5pWM5Lq677yI6ICM6Z2e5bmy5ZGY77yJXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWFwTm9kZVNlZWtlciBpbXBsZW1lbnRzIFNlZWtlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBfb3JpZ2luOlZlYzI7Ly/kuK3lv4PkvY3nva5cclxuICAgIHByaXZhdGUgX3JvdGF0ZTpudW1iZXIgPSAwOy8v6aG65pe26ZKI5peL6L2sOTDluqbnmoTmrKHmlbDvvIzpu5jorqTkuLowXHJcbiAgICBwcml2YXRlIF9yZWxhdGl2ZU5vZGVMaXN0OlZlYzJbXSA9IFtdOy8v6ZyA6KaB55uR5o6n55qE5Zyw5Zu+6IqC54K555qE55u45a+55L2N572uXHJcbiAgICBwcml2YXRlIF9hYnNvbHV0ZU5vZGVMaXN0OlZlYzJbXSA9IFtdOy8v6ZyA6KaB55uR5o6n55qE5Zyw5Zu+6IqC54K555qE57ud5a+55L2N572uXHJcblxyXG4gICAgcHJpdmF0ZSBfZm9jdXM6QWN0b3I7Ly/plIHlrprnmoTmlYzkurpcclxuICAgIHByaXZhdGUgX2ZvY3VzQ2hhbmdlZDpib29sZWFuID0gZmFsc2U7Ly/plIHlrprnmoTmlYzkurrlt7Lkv67mlLlcclxuICAgIHByaXZhdGUgX2NhcHR1cmVMaXN0OkFjdG9yW10vL+aNleaNieWIsOeahOaVjOS6ulxyXG5cclxuICAgIHByaXZhdGUgc2V0QWJzb2x1dGUoKTp2b2lkey8v6YeN5paw6K6h566X5omA5pyJ6ZyA6KaB55uR5o6n55qE5Zyw5Zu+6IqC54K555qE57ud5a+55L2N572uXHJcbiAgICAgICAgdGhpcy5fYWJzb2x1dGVOb2RlTGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3JlbGF0aXZlTm9kZUxpc3QuZm9yRWFjaChlbGU9PntcclxuICAgICAgICAgICAgdGhpcy5fYWJzb2x1dGVOb2RlTGlzdC5wdXNoKHRoaXMuX29yaWdpbi5wbHVzKGVsZSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIHRoaXMudXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3Iob3JpZ2luOlZlYzIsIHJlczphbnksIHJvdGF0ZTpudW1iZXIgPSAwKXtcclxuICAgICAgICAvL+i/memHjOeahHJlc+aYr+S4gOenjeS7o+ihqOaUu+WHu+iMg+WbtOexu+Wei+eahOaVsOaNrlxyXG4gICAgICAgIHRoaXMuX29yaWdpbiA9IG9yaWdpbjtcclxuICAgICAgICB0aGlzLl9yb3RhdGUgPSByb3RhdGU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy90ZXN0XHJcbiAgICAgICAgdGhpcy5fcmVsYXRpdmVOb2RlTGlzdC5wdXNoKG5ldyBWZWMyKDAsMCksIG5ldyBWZWMyKDEsMCksIG5ldyBWZWMyKDIsMCkpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5zZXRBYnNvbHV0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXBvc2l0aW9uKHBvczpWZWMyKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX29yaWdpbiA9IHBvcztcclxuICAgICAgICB0aGlzLnNldEFic29sdXRlKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXRGb2N1cygpOiBBY3RvciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZvY3VzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRGb2N1c0xpc3QoY291bnQ6IG51bWJlcik6IEFjdG9yW10ge1xyXG4gICAgICAgIC8vdG9kbzog6ICD6JmR5ZyoaW50ZXJmYWNl5Lit56e76Zmk5q2k6aG5XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldENhcHR1cmVMaXN0KCk6IEFjdG9yW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jYXB0dXJlTGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZm9sbG93QWN0b3IoKTogQWN0b3Ige1xyXG4gICAgICAgIC8vdG9kbzog6ICD6JmR5ZyoaW50ZXJmYWNl5Lit56e76Zmk5q2k6aG5XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGZvY3VzQ2hhbmdlZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZm9jdXNDaGFuZ2VkO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIC8v5Yi35paw5o2V5o2J5YiX6KGoXHJcbiAgICAgICAgdGhpcy5fY2FwdHVyZUxpc3QgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5fYWJzb2x1dGVOb2RlTGlzdC5mb3JFYWNoKGVsZT0+e1xyXG4gICAgICAgICAgICBsZXQgbGlzdDpBY3RvcltdID0gUmhvZGVzR2FtZS5JbnN0YW5jZS5iYXR0bGUubWFwTm9kZUNQVS5tYXRyaXhHZXQoZWxlKTtcclxuICAgICAgICAgICAgbGlzdC5mb3JFYWNoKGVsZT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2FwdHVyZUxpc3QucHVzaChlbGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fY2FwdHVyZUxpc3QgPSBBcnJheUFsZ28uc2hyaW5rKHRoaXMuX2NhcHR1cmVMaXN0KTtcclxuICAgICAgICB0aGlzLl9jYXB0dXJlTGlzdCA9IHRoaXMuX2NhcHR1cmVMaXN0LmZpbHRlcihlbGU9PntcclxuICAgICAgICAgICAgcmV0dXJuIGVsZS50eXBlID09IEFjdG9yVHlwZS5Nb25zdGVyO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8v5aSE55CGZm9jdXNcclxuICAgICAgICBpZiAoICh0aGlzLl9mb2N1cyA9PSBudWxsIHx8IHRoaXMuX2ZvY3VzID09IHVuZGVmaW5lZCkgJiYgdGhpcy5fY2FwdHVyZUxpc3QubGVuZ3RoID4gMCkgey8v5b2T5YmN5peg5o2V5o2J55uu5qCH77yM5LiUY2FwdHVyZUxpc3TkuK3mnInnm67moIdcclxuICAgICAgICAgICAgdGhpcy5fZm9jdXMgPSB0aGlzLl9jYXB0dXJlTGlzdFswXTtcclxuICAgICAgICAgICAgdGhpcy5fZm9jdXNDaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2NhcHR1cmVMaXN0LmluZGV4T2YodGhpcy5fZm9jdXMpID09IC0xKSB7Ly/lvZPliY3mjZXmjYnnm67moIfkuI3lnKhjYXB0dXJlTGlzdOS4rVxyXG4gICAgICAgICAgICB0aGlzLl9mb2N1cyA9IHRoaXMuX2NhcHR1cmVMaXN0WzBdO1xyXG4gICAgICAgICAgICB0aGlzLl9mb2N1c0NoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7Ly/mjZXmjYnnm67moIfmnKrmlLnlj5hcclxuICAgICAgICAgICAgdGhpcy5fZm9jdXNDaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9BY3RvclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWN0b3JTdGF0ZUJhc2Uge1xyXG4gICAgcHJvdGVjdGVkIF9hY3RvcjogQWN0b3I7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYWN0b3I6IEFjdG9yKSB7XHJcbiAgICAgICAgdGhpcy5fYWN0b3IgPSBhY3RvcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW50ZXIoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsZWF2ZSgpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxufSIsImltcG9ydCBBY3RvclN0YXRlQmFzZSBmcm9tIFwiLi9BY3RvclN0YXRlQmFzZVwiO1xyXG5pbXBvcnQgRml4VGltZSBmcm9tIFwiLi4vLi4vLi4vRml4L0ZpeFRpbWVcIjtcclxuaW1wb3J0IHsgQWN0b3JTdGF0ZUlEIH0gZnJvbSBcIi4vQWN0b3JTdGF0ZUZzbVwiO1xyXG5pbXBvcnQgeyBBY3RvclR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0RvZEtleVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFjdG9yU3RhdGVCb3JuIGV4dGVuZHMgQWN0b3JTdGF0ZUJhc2V7XHJcblxyXG4gICAgcHJpdmF0ZSBfZW50ZXJUaW1lOm51bWJlciA9IDA7XHJcblxyXG4gICAgcHVibGljIGVudGVyKCk6dm9pZHtcclxuICAgICAgICB0aGlzLl9lbnRlclRpbWUgPSBGaXhUaW1lLmVsYXBzZWRUaW1lO1xyXG4gICAgICAgIHRoaXMuX2FjdG9yLnJlbmRlci5ib3JuQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFbnRlciBCb3JuXCIpXHJcbiAgICAgICAgLy90ZXN0XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOnZvaWR7XHJcbiAgICAgICAgaWYgKEZpeFRpbWUuZWxhcHNlZFRpbWUgLSB0aGlzLl9lbnRlclRpbWUgPj0gMykgey8vdG9kbzog6L+Z5Liq5Ye655Sf5pe26Ze05bqU6K+l5piv5LiA5Liq5YWo5Zy65YWx6YCa55qE5bi45pWwXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9hY3Rvci50eXBlID09IEFjdG9yVHlwZS5Nb25zdGVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hY3Rvci5zdGF0ZS5ydW5TdGF0ZShBY3RvclN0YXRlSUQuV2Fsayk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYWN0b3IudHlwZSA9PSBBY3RvclR5cGUuT3BlcmF0b3IpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FjdG9yLnN0YXRlLnJ1blN0YXRlKEFjdG9yU3RhdGVJRC5GaWdodCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKFwiVW5hY2NlcHRhYmxlIEFjdG9yIFR5cGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQWN0b3JTdGF0ZUJhc2UgZnJvbSBcIi4vQWN0b3JTdGF0ZUJhc2VcIjtcclxuXHJcbi8qKlxyXG4gKiDmlYzkurrnmoTooqvpmLvmjKHnirbmgIHjgIHlubLlkZjnmoTkuIDoiKznirbmgIFcclxuICovXHJcbmV4cG9ydCBjbGFzcyBBY3RvclN0YXRlRmlnaHQgZXh0ZW5kcyBBY3RvclN0YXRlQmFzZXtcclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6dm9pZHtcclxuICAgICAgICAvL3RvZG86IOiwg+eUqOaUu+WHu+eKtuaAgeacuueahOW4p+W+queOr1xyXG4gICAgICAgIC8qXHJcblxyXG4gICAgICAgICovXHJcbiAgICAgICB0aGlzLl9hY3Rvci5hdGsudXBkYXRlKCk7XHJcbiAgICAgICB0aGlzLl9hY3Rvci5ibG9ja2VyLnVwZGF0ZSgpOyBcclxuICAgIH1cclxufSIsImltcG9ydCBBY3RvclN0YXRlQmFzZSBmcm9tIFwiLi9BY3RvclN0YXRlQmFzZVwiO1xyXG5pbXBvcnQgRG9kTG9nIGZyb20gXCIuLi8uLi8uLi9Db21tb24vRG9kTG9nXCI7XHJcbmltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuaW1wb3J0IHsgQWN0b3JTdGF0ZVdhbGsgfSBmcm9tIFwiLi9BY3RvclN0YXRlV2Fsa1wiO1xyXG5pbXBvcnQgeyBBY3RvclN0YXRlUHJlcGFyZWQgfSBmcm9tIFwiLi9BY3RvclN0YXRlUHJlcGFyZWRcIjtcclxuaW1wb3J0IHsgQWN0b3JTdGF0ZUZpZ2h0IH0gZnJvbSBcIi4vQWN0b3JTdGF0ZUZpZ2h0XCI7XHJcbmltcG9ydCB7IEFjdG9yU3RhdGVCb3JuIH0gZnJvbSBcIi4vQWN0b3JTdGF0ZUJvcm5cIjtcclxuXHJcbmV4cG9ydCBlbnVtIEFjdG9yU3RhdGVJRCB7XHJcbiAgICBOb25lLFxyXG4gICAgUHJlcGFyZWQsICAgICAvL+W+heacuiAo5pyq5Ye65YqoL+acqumDqOe9sikgIFxyXG4gICAgQm9ybiwgICAvL+WHuueUn+WKqOeUuyDkuI3lj6/mlLvlh7sg5LiN5Y+v6KKr5pS75Ye7XHJcbiAgICBXYWxrLCAgIC8v56e75YqoIOaVjOS6uueUqFxyXG4gICAgU3R1bm5lZCwgICAgLy/mmZXnnKkgZXRjIO+8iOaJk+aWreWKqOS9nOeahOiiq+aOp+WItueKtuaAge+8iVxyXG4gICAgRnJlZXplZCwgICAgLy/lhrDlhrsg77yI5LiN5omT5pat5Yqo5L2c55qE6KKr5o6n5Yi254q25oCB77yJXHJcbiAgICBGaWdodCwgIC8v5pmu5pS754q25oCBIOW5suWRmOW4uOaAgSDmlYzkurrooqvpmLvmjKHlkI5cclxuICAgIERlYXRoLCAgLy/mrbvkuqHliqjnlLsg5LiN5Y+v5pS75Ye7IOS4jeWPr+iiq+aUu+WHu1xyXG4gICAgRXNjYXBlLCAvL+aVjOS6uumAg+iEsVxyXG4gICAgQ291bnRcclxufVxyXG5cclxuLypcclxuICog6KeS6Imy54q25oCB5py6IOeuoeeQhuinkuiJsuaJgOWkhOmYtuautSDmoLnmja7kuI3lkIzpmLbmrrXlhrPlrprkuI3lkIznmoTnu4Tku7bnirbmgIFcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjdG9yU3RhdGVNZ3Ige1xyXG4gICAgcHJpdmF0ZSBfc3RhdGVzOiBBY3RvclN0YXRlQmFzZVtdID0gW107XHJcbiAgICBwcml2YXRlIF9jdXJyZW50U3RhdGU6IEFjdG9yU3RhdGVCYXNlO1xyXG4gICAgcHJpdmF0ZSBfY3VycmVudFN0YXRlVHlwZTogQWN0b3JTdGF0ZUlEID0gQWN0b3JTdGF0ZUlELk5vbmU7XHJcblxyXG4gICAgcHVibGljIGdldCBjdXJyZW50U3RhdGVUeXBlKCk6IEFjdG9yU3RhdGVJRHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudFN0YXRlVHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhY3RvcjogQWN0b3IpIHtcclxuICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX3N0YXRlc1tBY3RvclN0YXRlSUQuV2Fsa10gPSBuZXcgQWN0b3JTdGF0ZVdhbGsoYWN0b3IpO1xyXG4gICAgICAgIHRoaXMuX3N0YXRlc1tBY3RvclN0YXRlSUQuUHJlcGFyZWRdID0gbmV3IEFjdG9yU3RhdGVQcmVwYXJlZChhY3Rvcik7XHJcbiAgICAgICAgdGhpcy5fc3RhdGVzW0FjdG9yU3RhdGVJRC5GaWdodF0gPSBuZXcgQWN0b3JTdGF0ZUZpZ2h0KGFjdG9yKTtcclxuICAgICAgICB0aGlzLl9zdGF0ZXNbQWN0b3JTdGF0ZUlELkJvcm5dID0gbmV3IEFjdG9yU3RhdGVCb3JuKGFjdG9yKTtcclxuICAgICAgICAvL1RPRE9cclxuICAgICAgICAvL+WPgueFp+a4uOaIj+Wkp+eKtuaAgeaculxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgaW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJ1blN0YXRlKEFjdG9yU3RhdGVJRC5Ob25lKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcnVuU3RhdGUoc3RhdGVJRDogQWN0b3JTdGF0ZUlEKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKEFjdG9yU3RhdGVJRC5Db3VudCA8PSBzdGF0ZUlEIHx8IHN0YXRlSUQgPD0gQWN0b3JTdGF0ZUlELk5vbmUpIHtcclxuICAgICAgICAgICAgRG9kTG9nLmVycm9yKGBHYW1lU3RhdGVNZ3IucnVuU3RhdGU6IEludmFsaWQgc3RhdGVJRCBbJHtzdGF0ZUlEfV0uIGApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobnVsbCAhPSB0aGlzLl9jdXJyZW50U3RhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlLmxlYXZlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGVUeXBlID0gc3RhdGVJRDtcclxuICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUgPSB0aGlzLl9zdGF0ZXNbc3RhdGVJRF07XHJcbiAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlLmVudGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAobnVsbCAhPSB0aGlzLl9jdXJyZW50U3RhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlLnVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKG51bGwgIT0gdGhpcy5fY3VycmVudFN0YXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZS5sZWF2ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9zdGF0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5fc3RhdGVzW2ldO1xyXG4gICAgICAgICAgICBzdGF0ZS5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBBY3RvclN0YXRlQmFzZSBmcm9tIFwiLi9BY3RvclN0YXRlQmFzZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFjdG9yU3RhdGVQcmVwYXJlZCBleHRlbmRzIEFjdG9yU3RhdGVCYXNle1xyXG4gICAgcHVibGljIHVwZGF0ZSgpOnZvaWR7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJQZXJwYXJlZCB1cGRhdGVcIilcclxuICAgIH1cclxufSIsImltcG9ydCBBY3RvclN0YXRlQmFzZSBmcm9tIFwiLi9BY3RvclN0YXRlQmFzZVwiO1xyXG5pbXBvcnQgeyBBY3RvclR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0RvZEtleVwiO1xyXG5pbXBvcnQgeyBWZWMyIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Eb2RNYXRoXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQWN0b3JTdGF0ZVdhbGsgZXh0ZW5kcyBBY3RvclN0YXRlQmFzZXtcclxuICAgIFxyXG4gICAgcHVibGljIGVudGVyKCk6dm9pZHtcclxuICAgICAgICAvL+S4jeW6lOivpeWcqOi/meS4queKtuaAgemHjO+8jOW6lOivpeWcqGJvcm7ph4zov5vooYxkZXBsb3lcclxuICAgICAgICB0aGlzLl9hY3Rvci5yZW5kZXIuZGVwbG95KCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyB1cGRhdGUoKTp2b2lke1xyXG5cclxuICAgICAgICBsZXQgYWN0b3IgPSB0aGlzLl9hY3RvcjtcclxuXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIGlmIChhY3Rvci5ibG9ja2VyLmlzQmxvY2tlZCkge1xyXG4gICAgICAgICAgICAvL3RvZG86IOi9rOaNouWIsGZpZ2h054q25oCBXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IOS9oOS4jeimgei/h+adpeWVijpib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2FjdG9yLnRyYW5zZm9ybS5wb3MuYXJyaXZlZCAmJiDkvaDkuI3opoHov4fmnaXllYopIHsvL+W3suWIsOi+vuebrueahOWcsFxyXG4gICAgICAgICAgICBpZiAoYWN0b3Iucm91dGUubmV4dCgpKSB7Ly/lrZjlnKjkuIvkuIDkuKrnm67moIfoioLngrlcclxuICAgICAgICAgICAgICAgIGFjdG9yLnRyYW5zZm9ybS5wb3Muc2V0VGFyZ2V0KGFjdG9yLnJvdXRlLmN1cnJlbnRUYXJnZXQoKSk7Ly/lsIbnm67moIfmm7/mjaLkuLrkuIvkuIDkuKrnm67moIfoioLngrlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vdG9kbzog5pWM5Lq65bey5Yiw6L6+57uI54K5XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG5cclxuICAgICAgICBpZiAoIeS9oOS4jeimgei/h+adpeWViikgey8v6Lef6byg5qCH55qE6YC76L6RXHJcbiAgICAgICAgICAgIGFjdG9yLnRyYW5zZm9ybS5wb3Muc2V0VGFyZ2V0KG5ldyBWZWMyKExheWEuc3RhZ2UubW91c2VYLTUwLCBMYXlhLnN0YWdlLm1vdXNlWS01MCkpO1xyXG4gICAgICAgICAgICBhY3Rvci50cmFuc2Zvcm0ucG9zLnNldFNwZWVkKDIwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFjdG9yLnRyYW5zZm9ybS5wb3MubW92ZSgpOy8v56e75YqoXHJcbiAgICAgICAgYWN0b3IuY29saUVtaXQucG9zQnlWZWMoYWN0b3IudHJhbnNmb3JtLnBvcy5kYXRhKTsvL+enu+WKqOeisOaSnueusVxyXG4gICAgICAgIGFjdG9yLmNvbGlFbWl0LmV2ZW50KGFjdG9yLCBhY3Rvci50eXBlKTsvL+WPkeW4g+eisOaSnuS6i+S7tlxyXG4gICAgICAgIGFjdG9yLnJlbmRlci5tb3ZlKGFjdG9yLnRyYW5zZm9ybS5wb3MuZGF0YSk7Ly/np7vliqjlj6/op4blr7nosaFcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yL0FjdG9yXCI7XHJcbmltcG9ydCB7TXlTeW1ib2x9IGZyb20gXCIuLi8uLi9GaXgvRml4U3ltYm9sXCI7XHJcbmltcG9ydCB7Q2lyY2xlQ29sbGlzaW9uUmFuZ2V9IGZyb20gXCIuL0NvbGxpc2lvblJhbmdlXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIOeisOaSnuWkhOeQhuWZqO+8jOivpeexu+e7tOaKpOS4gOS4qk1hcO+8jE1hcOiusOW9leaJgOaciemcgOimgei/m+ihjOeisOaSnuWkhOeQhueahOeisOaSnuWZqO+8jE1hcOeUqOeisOaSnuWZqOeahOWUr+S4gOagh+ivhuS9nOS4uumUruS7pemBv+WFjemHjeWkjeiusOW9leOAglxyXG4gKlxyXG4gKiDor6Xnsbvmj5DkvpvkuIDkuKpyZWNhbGN1bGF0ZeaWueazleeUqOS6jumHjeaWsOiuoeeul+eisOaSnuaDheWGte+8jOWvueS6jk1hcOS4reeahOavj+S4quWkhOeQhuWvueixoe+8jOivpeaWueazleiuoeeul+WFtuS4jk1hcOS4reeahOaJgOacieWFtuS7luWvueixoVxyXG4gKiDnmoTph43lj6Dmg4XlhrXvvIzlubblsIbov5nkupvph43lj6DnmoTlhbbku5blr7nosaHku6XliJfooajnmoTlvaLlvI/kvKDpgJLnu5nor6XlpITnkIblr7nosaHjgIJcclxuICpcclxuICogYnkgWFdWXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQWN0b3JDb2xsaXNpb25Qcm9jZXNzb3Ige1xyXG5cclxuICAgIHByaXZhdGUgX2NvbGxpZGVyTWFwOiB7IFtrZXk6IG51bWJlcl06IEFjdG9yQ29sbGlkZXIgfSA9IHt9O1xyXG5cclxuICAgIHB1YmxpYyByZWdpc3RlckNvbGxpZGVyKGNvbGxpZGVyOiBBY3RvckNvbGxpZGVyKSB7XHJcbiAgICAgICAgdGhpcy5fY29sbGlkZXJNYXBbY29sbGlkZXIuc3ltYm9sLmRhdGFdID0gY29sbGlkZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVucmVnaXN0ZXJDb2xsaWRlcihjb2xsaWRlcjogQWN0b3JDb2xsaWRlcikge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9jb2xsaWRlck1hcFtjb2xsaWRlci5zeW1ib2wuZGF0YV07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpIHtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMuX2NvbGxpZGVyTWFwKSB7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXRDb2xsaWRlciA9IHRoaXMuX2NvbGxpZGVyTWFwW2ldO1xyXG4gICAgICAgICAgICBsZXQgY29sbGlkaW5nTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqIGluIHRoaXMuX2NvbGxpZGVyTWFwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29sbGlkZXIgPSB0aGlzLl9jb2xsaWRlck1hcFtqXTtcclxuICAgICAgICAgICAgICAgIGlmIChjb2xsaWRlciA9PSB0YXJnZXRDb2xsaWRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldENvbGxpZGVyLnNob3VsZENvbGxpZGVXaXRoKGNvbGxpZGVyKSAmJiB0YXJnZXRDb2xsaWRlci5nZXRDb2xsaXNpb25SYW5nZSgpLmlzQ29pbmNpZGVXaXRoUmFuZ2UoY29sbGlkZXIuZ2V0Q29sbGlzaW9uUmFuZ2UoKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xsaWRpbmdMaXN0LnB1c2goY29sbGlkZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRhcmdldENvbGxpZGVyLm9uQ29sbGlkaW5nTGlzdFJlZnJlc2goY29sbGlkaW5nTGlzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBY3RvckNvbGxpZGVyIHtcclxuICAgIC8v5ZSv5LiA5qCH6K+GXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgc3ltYm9sOiBNeVN5bWJvbCA9IG5ldyBNeVN5bWJvbCgpO1xyXG5cclxuICAgIC8v6I635Y+W56Kw5pKe6IyD5Zu0XHJcbiAgICBhYnN0cmFjdCBnZXRDb2xsaXNpb25SYW5nZSgpOiBDaXJjbGVDb2xsaXNpb25SYW5nZSA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDph43orr7norDmkp7ojIPlm7RcclxuICAgICAqIEBwYXJhbSByYW5nZSDmlrDnmoTnorDmkp7ojIPlm7RcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3Qgc2V0Q29sbGlzaW9uUmFuZ2UocmFuZ2U6IENpcmNsZUNvbGxpc2lvblJhbmdlKTtcclxuXHJcbiAgICAvL+iOt+WPlueisOaSnuWZqOeahOaJgOacieiAhVxyXG4gICAgYWJzdHJhY3QgZ2V0QWN0b3IoKTogQWN0b3I7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnorDmkp7liJfooajpnIDopoHliLfmlrBcclxuICAgICAqIEBwYXJhbSBjb2xsaWRpbmdMaXN0IOaWsOeahOeisOaSnuWIl+ihqFxyXG4gICAgICogKi9cclxuICAgIGFic3RyYWN0IG9uQ29sbGlkaW5nTGlzdFJlZnJlc2goY29sbGlkaW5nTGlzdDogQWN0b3JDb2xsaWRlcltdKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpuW6lOivpeS4juaMh+WumueisOaSnuWZqOWPkeeUn+eisOaSnlxyXG4gICAgICogQHBhcmFtIGNvbGxpZGVyIOWPpuS4gOS4queisOaSnuWZqFxyXG4gICAgICogKi9cclxuICAgIGFic3RyYWN0IHNob3VsZENvbGxpZGVXaXRoKGNvbGxpZGVyOiBBY3RvckNvbGxpZGVyKTogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOW9k+WJjeeisOaSnuWIl+ihqFxyXG4gICAgICogKi9cclxuICAgIGFic3RyYWN0IGdldENvbGxpZGluZ0xpc3QoKTogQWN0b3JDb2xsaWRlcltdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yi35paw56Kw5pKe6IyD5Zu077yM5L2/5YW26Lef6ZqP5omA5pyJ6ICF56e75YqoXHJcbiAgICAgKiAqL1xyXG4gICAgYWJzdHJhY3QgcmVmcmVzaENvbGxpc2lvblJhbmdlRm9sbG93QWN0b3IoKTtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTaW1wbGVBY3RvckNvbGxpZGVyIGV4dGVuZHMgQWN0b3JDb2xsaWRlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBjb2xsaWRpbmdMaXN0OiBBY3RvckNvbGxpZGVyW10gPSBbXTtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgYWN0b3I6IEFjdG9yO1xyXG4gICAgcHJpdmF0ZSByYW5nZTogQ2lyY2xlQ29sbGlzaW9uUmFuZ2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYWN0b3I6IEFjdG9yLCByYW5nZTogQ2lyY2xlQ29sbGlzaW9uUmFuZ2UpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuYWN0b3IgPSBhY3RvcjtcclxuICAgICAgICB0aGlzLnJhbmdlID0gcmFuZ2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldENvbGxpc2lvblJhbmdlKCk6IENpcmNsZUNvbGxpc2lvblJhbmdlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yYW5nZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDb2xsaXNpb25SYW5nZShyYW5nZTogQ2lyY2xlQ29sbGlzaW9uUmFuZ2UpIHtcclxuICAgICAgICB0aGlzLnJhbmdlID0gcmFuZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QWN0b3IoKTogQWN0b3Ige1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFjdG9yO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENvbGxpZGluZ0xpc3QoKTogQWN0b3JDb2xsaWRlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb2xsaWRpbmdMaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ29sbGlkaW5nTGlzdFJlZnJlc2goY29sbGlkaW5nTGlzdDogQWN0b3JDb2xsaWRlcltdKSB7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRpbmdMaXN0ID0gY29sbGlkaW5nTGlzdDtcclxuICAgIH1cclxuXHJcblxyXG59IiwiaW1wb3J0IHsgQ29saVJlY2VpdmVyLCBDb2xpRW1pdCB9IGZyb20gXCIuLi9BY3Rvci9BY3Rvck1vZHVsZXMvQ29saU1lc3NhZ2VcIjtcclxuaW1wb3J0IHsgVmVjMiB9IGZyb20gXCIuLi8uLi9Db21tb24vRG9kTWF0aFwiO1xyXG5pbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yL0FjdG9yXCI7XHJcbmltcG9ydCB7IEFycmF5QWxnbyB9IGZyb20gXCIuLi8uLi9Db21tb24vRG9kRGF0YVN0cnVjdHVyZVwiO1xyXG5pbXBvcnQgeyBBY3RvclR5cGUgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL0RvZEtleVwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbGlSZXBvcnRlciBleHRlbmRzIENvbGlSZWNlaXZlciB7XHJcbiAgICBwdWJsaWMgaW5MaXN0OiBWZWMyW10gPSBbXTtcclxuICAgIHB1YmxpYyBsYXllcjogTGF5YS5TcHJpdGUgPSBuZXcgTGF5YS5TcHJpdGUoKTtcclxuXHJcbiAgICBwcml2YXRlIF9tYXRyaXg6IEFjdG9yW11bXVtdID0gW107Ly/lrZjlgqjmr4/kuKrlnLDlm77oioLngrnkuK3nmoRBY3RvcuWvueixoVxyXG5cclxuICAgIHByaXZhdGUgbWF0cml4QWRkKHBvczpWZWMyLCBhY3RvcjpBY3Rvcik6dm9pZHtcclxuICAgICAgICB0aGlzLl9tYXRyaXhbcG9zLnhdW3Bvcy55XS5wdXNoKGFjdG9yKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1hdHJpeFJlbW92ZShwb3M6VmVjMiwgYWN0b3I6QWN0b3IpOnZvaWR7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9tYXRyaXhbcG9zLnhdW3Bvcy55XS5pbmRleE9mKGFjdG9yKTtcclxuICAgICAgICBpZiAoaW5kZXggIT0gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWF0cml4W3Bvcy54XVtwb3MueV0uc3BsaWNlKGluZGV4LDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbWF0cml4R2V0KHBvczpWZWMyKTpBY3Rvcltde1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXRyaXhbcG9zLnhdW3Bvcy55XTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigxMCwgMTApO1xyXG4gICAgICAgIGZvciAobGV0IHcgPSAwOyB3IDwgMTA7IHcgKz0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXRyaXhbd10gPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaCA9IDA7IGggPCAxMDsgaCArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldERldGVjdGlvbihuZXcgVmVjMih3LCBoKSwgYCR7QWN0b3JUeXBlLk1vbnN0ZXJ9YCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXRyaXhbd11baF0gPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLmxheWVyKTtcclxuICAgICAgICB0aGlzLmxheWVyLnpPcmRlciA9IC0xMDtcclxuICAgICAgICB0aGlzLmxheWVyLnBvcyg1MCw1MCk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW50cmUoYWN0b3I6IEFjdG9yLCBwb3M6IFZlYzIpOiB2b2lkIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkVudGVyXCIgKyBwb3MueCArIFwifFwiICsgcG9zLnkpO1xyXG4gICAgICAgIHRoaXMuaW5MaXN0LnB1c2gocG9zKTtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgIHRoaXMubWF0cml4QWRkKHBvcyxhY3Rvcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTGVhdmUoYWN0b3I6IEFjdG9yLCBwb3M6IFZlYzIpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IEFycmF5QWxnby5maW5kRWxlKHBvcywgdGhpcy5pbkxpc3QpO1xyXG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5pbkxpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICB0aGlzLm1hdHJpeFJlbW92ZShwb3MsYWN0b3IpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiTGVhdmVcIiArIHBvcy54ICsgXCJ8XCIgKyBwb3MueSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbmRlcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxheWVyLmdyYXBoaWNzLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5pbkxpc3QuZm9yRWFjaChlbGUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyLmdyYXBoaWNzLmRyYXdSZWN0KGVsZS54ICogQ29saUVtaXQuR0xPQkFMX1VOSVRfV0lEVEggKyAxLFxyXG4gICAgICAgICAgICAgICAgZWxlLnkgKiBDb2xpRW1pdC5HTE9CQUxfVU5JVF9IRUlHSFQgKyAxLFxyXG4gICAgICAgICAgICAgICAgQ29saUVtaXQuR0xPQkFMX1VOSVRfV0lEVEggLSAyLFxyXG4gICAgICAgICAgICAgICAgQ29saUVtaXQuR0xPQkFMX1VOSVRfSEVJR0hUIC0gMixcclxuICAgICAgICAgICAgICAgIFwiI2ZmMDAwMFwiXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEdhbWVNYXAgZnJvbSBcIi4vR2FtZUxldmVsXCI7XHJcbmltcG9ydCB7IEFjdG9yQ29sbGlzaW9uUHJvY2Vzc29yIH0gZnJvbSBcIi4vQ29sbGlzaW9uL0FjdG9yQ29sbGlzaW9uUHJvY2Vzc29yXCI7XHJcbmltcG9ydCBHYW1lTGV2ZWwgZnJvbSBcIi4vR2FtZUxldmVsXCI7XHJcbmltcG9ydCBEb2RSZXNvdXJjZU1nciBmcm9tIFwiLi4vUmVzb3VyY2VzL0RvZFJlc291cmNlTWdyXCI7XHJcbmltcG9ydCBBY3Rvck1nciBmcm9tIFwiLi9BY3Rvci9BY3Rvck1nclwiO1xyXG5pbXBvcnQgQ29saVJlcG9ydGVyIGZyb20gXCIuL0NvbGxpc2lvbi9Db2xpUmVwb3J0ZXJcIjtcclxuaW1wb3J0IEdhbWVVSUV2ZW50IGZyb20gXCIuL0dhbWVVSUV2ZW50XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQmF0dGxlIHtcclxuICAgIHB1YmxpYyBsZXZlbDogR2FtZUxldmVsO1xyXG4gICAgcHVibGljIG1hcDogR2FtZU1hcDtcclxuICAgIHB1YmxpYyBhY3Rvck1ncjogQWN0b3JNZ3I7XHJcblxyXG4gICAgcHVibGljIGNvbGxpc2lvbjogQWN0b3JDb2xsaXNpb25Qcm9jZXNzb3I7Ly/otJ/otKPlnIblvaLnorDmkp7mo4DmtYtcclxuICAgIHB1YmxpYyBtYXBOb2RlQ1BVOiBDb2xpUmVwb3J0ZXIgPSBuZXcgQ29saVJlcG9ydGVyKCk7Ly/otJ/otKPlnLDlm77oioLngrnnorDmkp7mo4DmtYtcclxuXHJcbiAgICBwdWJsaWMgZ2FtZVVJRXZlbnQ6R2FtZVVJRXZlbnQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfbGV2ZWxQcmVwYXJlZDogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmxldmVsID0gbmV3IEdhbWVMZXZlbCgpO1xyXG4gICAgICAgIHRoaXMubWFwID0gbmV3IEdhbWVNYXAoKTtcclxuICAgICAgICB0aGlzLmFjdG9yTWdyID0gbmV3IEFjdG9yTWdyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY29sbGlzaW9uID0gbmV3IEFjdG9yQ29sbGlzaW9uUHJvY2Vzc29yKCk7XHJcbiAgICAgICAgdGhpcy5nYW1lVUlFdmVudCA9IG5ldyBHYW1lVUlFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwcmVwYXJlTGV2ZWwoKTogdm9pZCB7XHJcbiAgICAgICAgLy9UT0RPIGluaXQgbGV2ZWwgaW5mb3JtYXRpb25cclxuICAgICAgICBsZXQgcmVzID0gRG9kUmVzb3VyY2VNZ3IuSW5zdGFuY2UuZ2V0Q3VycmVudExldmVsUmVzKCk7XHJcblxyXG4gICAgICAgIC8vdGVzdFxyXG4gICAgICAgIHJlcyA9IHtsZXZlbDoxLG1hcDoyfTtcclxuXHJcbiAgICAgICAgdGhpcy5sZXZlbC5pbml0KHJlc1snbGV2ZWwnXSk7IC8vanVzdCBzYW1wbGVcclxuICAgICAgICB0aGlzLm1hcC5pbml0KHJlc1snbWFwJ10pO1xyXG4gICAgICAgIHRoaXMuYWN0b3JNZ3IuaW5pdChyZXNbJ21hcCddKTtcclxuXHJcbiAgICAgICAgLy9BTkQgRE9OVCBGT1JHRVQgUkVTRVQgTEFTVCBCQVRUTEUgREFUQSBSRU1BSU5TLiBcclxuICAgICAgICAvL3RoaXMuY29sbGlzaW9uLnJlc2V0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2xldmVsUHJlcGFyZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0xldmVsUHJlcHJhcmVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sZXZlbFByZXBhcmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICAvL1RPRE9cclxuICAgICAgICAvL0NMRUFSIExBU1QgQkFUVExFIFJFU09VUkNFXHJcbiAgICAgICAgdGhpcy5fbGV2ZWxQcmVwYXJlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUJhdHRsZUNvbnN0IHtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgc3RhbmRhcmRDb3N0SW5jcmVhc2VSYXRpbzogbnVtYmVyID0gMTtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgbWF4Q29zdE51bTogbnVtYmVyID0gOTk7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGluaXRDb3N0TnVtOiBudW1iZXIgPSA2O1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBsaWZlUG9pbnQ6IG51bWJlciA9IDM7XHJcbn0iLCJpbXBvcnQgeyBCdWZmIH0gZnJvbSBcIi4vQWN0b3IvQWN0b3JNb2R1bGVzL0J1ZmZcIjtcclxuaW1wb3J0IHsgRXZlbnRDZW50cmUgfSBmcm9tIFwiLi4vRXZlbnQvRXZlbnRDZW50cmVcIjtcclxuaW1wb3J0IEZpeFRpbWUgZnJvbSBcIi4uL0ZpeC9GaXhUaW1lXCI7XHJcbmltcG9ydCBEb2RSZXNvdXJjZU1nciBmcm9tIFwiLi4vUmVzb3VyY2VzL0RvZFJlc291cmNlTWdyXCI7XHJcbmltcG9ydCBHYW1lQmF0dGxlQ29uc3QgZnJvbSBcIi4vR2FtZUJhdHRsZUNvbnN0XCI7XHJcbi8qKlxyXG4gKiDmqKHlnZfor7TmmI46IOa4uOaIj+aImOaWl+WcsOWbvuaooeWdlyAgXHJcbiAqIOi0n+i0o+WGheWuuTog5Zyw5Zu+5bGe5oCn6K6+572u77yM5YWo5bGAYnVmZueuoeeQhiAgXHJcbiAqIOi0n+i0o+S6ujog6ZO25Y2OICBcclxuICog5pe26Ze0OiAyMDIw5bm0M+aciDPml6UxMjo0NTo0MSAgXHJcbiAqL1xyXG5cclxuLy9LUjog5YWo5bGA55Sx5YWz5Y2h5qih5Z2X566h55CGIEDpk7bljY5cclxuLy/ov5nph4zlj6/ku6XljIXlkKvlhajlsYDnmoTosIPmlbTlgLwv55Sf5ZG95YC8L+a2qOi0uVxyXG4vL+WFqOa4uOaIj+agh+WHhuWAvOS9v+eUqOW4uOmHj+WumuS5ieWcqEJhdHRsZUNvbnN057G75LitIOekuuS+i+WPr+S7peeci+S4i+aWuVxyXG4vL+WPpu+8muengeacieaIkOWRmOWRveWQjeivt+WcqOWJjemdouWKoOS4i+WIkue6vyDlo7DmmI7nmoTmiJDlkZjor7flnKjmnoTpgKDlh73mlbDkuK3lhajpg6jliJ3lp4vljJbkuIDkuKrlgLzvvIzpmLLmraJ1bmRlZmluZWQo6YeO5oyH6ZKIKeeahOaDheWGteWPkeeUn1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUxldmVse1xyXG4gICAgcHJpdmF0ZSBfaW5pdGlhbENvc3Q6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfY3VycmVudENvc3Q6bnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgX2xpZmVQb2ludDpudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfdGltZUxpbmU6bnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgX2dsb2JhbEJ1ZmZMaXN0OiBCdWZmW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLl9pbml0aWFsQ29zdCA9IDA7XHJcbiAgICAgICAgdGhpcy5fY3VycmVudENvc3QgPSAwO1xyXG4gICAgICAgIHRoaXMuX2xpZmVQb2ludCA9IDA7XHJcbiAgICAgICAgdGhpcy5fdGltZUxpbmUgPSAwO1xyXG4gICAgICAgIHRoaXMuX2dsb2JhbEJ1ZmZMaXN0ID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXQocmVzOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICAvL2ZvciBleGFtcGxlXHJcbiAgICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgICAgIHRoaXMuX2luaXRpYWxDb3N0ID0gdGhpcy5fY3VycmVudENvc3QgPSByZXNbJ2luaXRDb3N0J10gfHwgR2FtZUJhdHRsZUNvbnN0LmluaXRDb3N0TnVtO1xyXG4gICAgICAgIHRoaXMuX2xpZmVQb2ludCA9IHJlc1snbGlmZSddIHx8IEdhbWVCYXR0bGVDb25zdC5saWZlUG9pbnQ7XHJcbiAgICAgICAgdGhpcy5fdGltZUxpbmUgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuZ2V0R2xvYmFsQnVmZkxpc3QoKTtcclxuICAgICAgICB0aGlzLl91cGRhdGVUaW1lKCk7IFxyXG4gICAgICAgIHRoaXMuX3VwZGF0ZUNvc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0R2xvYmFsQnVmZkxpc3QoKTpCdWZmW117XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dsb2JhbEJ1ZmZMaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGFuZ2VDb3N0KCk6dm9pZHtcclxuICAgICAgICAvL3RvZG8uLi4uXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfdXBkYXRlVGltZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl90aW1lTGluZSArPSBGaXhUaW1lLmRlbHRhVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF91cGRhdGVDb3N0KCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fZ2xvYmFsQnVmZkxpc3Quc3BsaWNlKDAsIHRoaXMuX2dsb2JhbEJ1ZmZMaXN0Lmxlbmd0aCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IFJob2Rlc0dhbWUgZnJvbSBcIi4vUmhvZGVzR2FtZVwiO1xyXG5pbXBvcnQgUGVyZm9ybWFuY2VDZW50cmUgZnJvbSBcIi4uL0NvbW1vbi9HcmFwaGljcy9QZXJmb3JtYW5jZV9Nb2R1bGUvUGVyZm9ybWFuY2VDZW50cmVcIjtcclxuaW1wb3J0IHsgVmVjMiB9IGZyb20gXCIuLi9Db21tb24vRG9kTWF0aFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVVJRXZlbnQge1xyXG5cclxuICAgIHByaXZhdGUgX2NhbmNsZUxpc3Q6RnVuY3Rpb25bXSA9IFtdOy8vdG9kb1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX3JlZ2lzdGVyRXZlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9yZWdpc3RlckV2ZW50KCk6IHZvaWQge1xyXG5cclxuICAgICAgICBQZXJmb3JtYW5jZUNlbnRyZS5pbnN0YW5jZS5tYWluU3ByLm9uKExheWEuRXZlbnQuRE9VQkxFX0NMSUNLLCB0aGlzLCAoKT0+e1xyXG4gICAgICAgICAgICBsZXQgcG9zID0gbmV3IFZlYzIoMiwyKTsvL+WunumZheS4iuW6lOivpeS7jum8oOagh+S4iuiOt+WPllxyXG4gICAgICAgICAgICBSaG9kZXNHYW1lLkluc3RhbmNlLmJhdHRsZS5hY3Rvck1nci5kZXBsb3lPcHJ0KDEscG9zKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgLy9UT0RPIFxyXG4gICAgICAgIC8vQOmYv+iRsSDlnKjov5nkuKrnsbvph4zms6jlhozmiYDmnInmiJjmlpfmqKHlnZfmiYDpnIDmjqXmlLbnmoRVSeS6i+S7tlxyXG4gICAgICAgIC8vQGV4YW1wbGVcclxuICAgICAgICAvL2V2ZW50Y2VudGVyLm9uKGV2ZW50Y2VudGVyLmdhbWVwYXVzZSwgdGhpcywgdGhpcy5fb25HYW1lUGF1c2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVUnkuovku7blpITnkIbnsbvln7rmnKzlrozlhajpgJrov4fkuovku7bkuI7lpJbnlYzov5vooYzkuqTkupLvvIzmsqHmnInov5vooYzluKflvqrnjq/nmoTlv4XopoFcclxuICAgICAqIOatpOWkhOeahHVwZGF0ZeWHveaVsOS7heeUqOS6juW8gOWPkeS+v+WIqVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6dm9pZHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy9AZXhhbXBsZVxyXG4gICAgLy8gcHJpdmF0ZSBfb25HYW1lUGF1c2UoKTogdm9pZCB7XHJcbiAgICAvLyAgICAgUmhvZGVzR2FtZS5JbnN0YW5jZS5iYXR0bGUubGV2ZWwucGF1c2VHYW1lKCk7XHJcbiAgICAvLyB9XHJcbn0iLCJpbXBvcnQgRG9kTG9nIGZyb20gXCIuLi9Db21tb24vRG9kTG9nXCI7XHJcbmltcG9ydCBHYW1lU3RhdGVNZ3IgZnJvbSBcIi4vU3RhdGUvR2FtZVN0YXRlTWdyXCI7XHJcbmltcG9ydCBHYW1lQmF0dGxlIGZyb20gXCIuL0dhbWVCYXR0bGVcIjtcclxuaW1wb3J0IEdhbWVMb2JieSBmcm9tIFwiLi9Mb2JieS9HYW1lTG9iYnlcIjtcclxuXHJcbi8qKlxyXG4gKiDov5nmmK/muLjmiI/mnKzkvZNcclxuICog6K+05LiA5LqbUmhvZGVzX0dhbWXmlofku7blpLnkuIvnmoTms6jph4rop4TliJnvvIzmlrnkvr/ku6XlkI5jdHJsK2ZcclxuICpcclxuICogMS4vL0B0b2RvIOagh+azqOmcgOimgeWujOWWhOeahOmDqOWIhlxyXG4gKlxyXG4gKiAyLi8vQHRvZml4IOagh+azqOW3suefpeaciemXrumimOeahOmDqOWIhlxyXG4gKlxyXG4gKiAzLi8vQHRlc3Qg5qCH5rOo5LuF5L6b5rWL6K+V5L2/55So55qE6YOo5YiGXHJcbiAqXHJcbiAqIDMuLy9AcmVkY2FsbCDmoIfms6josIPnlKjmuLLmn5PmqKHlnZfnmoTpg6jliIZcclxuICpcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJob2Rlc0dhbWUge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBSaG9kZXNHYW1lO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSW5zdGFuY2UoKTogUmhvZGVzR2FtZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlIHx8ICh0aGlzLl9pbnN0YW5jZSA9IG5ldyB0aGlzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0ZU1ncjogR2FtZVN0YXRlTWdyO1xyXG4gICAgcHVibGljIGJhdHRsZTogR2FtZUJhdHRsZTtcclxuICAgIHB1YmxpYyBsb2JieTogR2FtZUxvYmJ5O1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmJhdHRsZSA9IG5ldyBHYW1lQmF0dGxlKCk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZU1nciA9IG5ldyBHYW1lU3RhdGVNZ3IodGhpcy5iYXR0bGUpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGVNZ3IuaW5pdCgpO1xyXG4gICAgICAgIERvZExvZy5kZWJ1ZyhgUmhvZGVzR2FtZTogaW5pdGlhbGl6YXRpb24gY29tcGxldGUuIGApXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXRlTWdyLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJpbXBvcnQgR2FtZUJhdHRsZSBmcm9tIFwiLi4vR2FtZUJhdHRsZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVN0YXRlQmFzZSB7XHJcbiAgICBwcm90ZWN0ZWQgX2JhdHRsZTogR2FtZUJhdHRsZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihiYXR0bGU6IEdhbWVCYXR0bGUpIHtcclxuICAgICAgICB0aGlzLl9iYXR0bGUgPSBiYXR0bGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudGVyKCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbGVhdmUoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgR2FtZVN0YXRlQmFzZSBmcm9tIFwiLi9HYW1lU3RhdGVCYXNlXCI7XHJcbmltcG9ydCBSaG9kZXNHYW1lIGZyb20gXCIuLi9SaG9kZXNHYW1lXCI7XHJcbmltcG9ydCBHYW1lQmF0dGxlIGZyb20gXCIuLi9HYW1lQmF0dGxlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU3RhdGVCYXR0bGUgZXh0ZW5kcyBHYW1lU3RhdGVCYXNle1xyXG4gICAgY29uc3RydWN0b3IoYmF0dGxlOkdhbWVCYXR0bGUpIHtcclxuICAgICAgICBzdXBlcihiYXR0bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnRlcigpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5lbnRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsZWF2ZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5sZWF2ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKCk7XHJcbiAgICAgICAgdGhpcy5fYmF0dGxlLmNvbGxpc2lvbi51cGRhdGUoKTtcclxuICAgICAgICB0aGlzLl9iYXR0bGUuYWN0b3JNZ3IudXBkYXRlKCk7XHJcbiAgICAgICAgdGhpcy5fYmF0dGxlLm1hcC51cGRhdGUoKTtcclxuICAgIH1cclxufSIsImltcG9ydCBHYW1lU3RhdGVCYXNlIGZyb20gXCIuL0dhbWVTdGF0ZUJhc2VcIjtcclxuaW1wb3J0IFJob2Rlc0dhbWUgZnJvbSBcIi4uL1Job2Rlc0dhbWVcIjtcclxuaW1wb3J0IERvZFJlc291cmNlTWdyIGZyb20gXCIuLi8uLi9SZXNvdXJjZXMvRG9kUmVzb3VyY2VNZ3JcIjtcclxuaW1wb3J0IHsgR2FtZVN0YXRlSUQgfSBmcm9tIFwiLi9HYW1lU3RhdGVNZ3JcIjtcclxuaW1wb3J0IERvZExvZyBmcm9tIFwiLi4vLi4vQ29tbW9uL0RvZExvZ1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVN0YXRlR2FtZWxvYWQgZXh0ZW5kcyBHYW1lU3RhdGVCYXNle1xyXG4gICAgY29uc3RydWN0b3IoYmF0dGxlKSB7XHJcbiAgICAgICAgc3VwZXIoYmF0dGxlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW50ZXIoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuZW50ZXIoKTtcclxuICAgICAgICAvL1RPRE8gU0hPVyBMT0FESU5HIFNDUkVFTlxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsZWF2ZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5sZWF2ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJHYW1lTG9hZCB1cGRhdGVcIik7XHJcbiAgICAgICAgaWYgKHRydWUgPT0gRG9kUmVzb3VyY2VNZ3IuSW5zdGFuY2UuaW5pdGVkKCkpIHtcclxuICAgICAgICAgICAgLy9XRSBETyBOT1QgSEFWRSBMT0JCWSBNT0RVTEUgSU4gVEhJUyBWRVJTSU9OXHJcbiAgICAgICAgICAgIC8vSlVTVCBTRVQgTEVWRUwgSUQgSEVSRVxyXG4gICAgICAgICAgICAvL1RPIERFTFxyXG4gICAgICAgICAgICBEb2RSZXNvdXJjZU1nci5JbnN0YW5jZS5zZXRMZXZlbElEKDEpO1xyXG4gICAgICAgICAgICBSaG9kZXNHYW1lLkluc3RhbmNlLnN0YXRlTWdyLnJ1blN0YXRlKEdhbWVTdGF0ZUlELkxldmVsbG9hZCk7XHJcbiAgICAgICAgICAgIERvZExvZy5kZWJ1ZyhgR2FtZVN0YXRlR2FtZWxvYWQudXBkYXRlOiBSZXNvdXJjZXMgaW5pdCBjb21wbGV0ZSwgc2V0IGxldmVsIGludG8gMS4gYCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEdhbWVTdGF0ZUJhc2UgZnJvbSBcIi4vR2FtZVN0YXRlQmFzZVwiO1xyXG5pbXBvcnQgUmhvZGVzR2FtZSBmcm9tIFwiLi4vUmhvZGVzR2FtZVwiO1xyXG5pbXBvcnQgeyBHYW1lU3RhdGVJRCB9IGZyb20gXCIuL0dhbWVTdGF0ZU1nclwiO1xyXG5pbXBvcnQgRG9kUmVzb3VyY2VNZ3IgZnJvbSBcIi4uLy4uL1Jlc291cmNlcy9Eb2RSZXNvdXJjZU1nclwiO1xyXG5pbXBvcnQgRG9kTG9nIGZyb20gXCIuLi8uLi9Db21tb24vRG9kTG9nXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU3RhdGVMZXZlbExvYWQgZXh0ZW5kcyBHYW1lU3RhdGVCYXNle1xyXG4gICAgY29uc3RydWN0b3IoYmF0dGxlKSB7XHJcbiAgICAgICAgc3VwZXIoYmF0dGxlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW50ZXIoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuZW50ZXIoKTtcclxuICAgICAgICB0aGlzLl9iYXR0bGUucHJlcGFyZUxldmVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxlYXZlKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmxlYXZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLnJlc2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci51cGRhdGUoKTtcclxuICAgICAgICBpZiAodHJ1ZSA9PSBEb2RSZXNvdXJjZU1nci5JbnN0YW5jZS5pc0xldmVsUHJlcGFyZWQoKSkge1xyXG4gICAgICAgICAgICBpZiAodHJ1ZSA9PSB0aGlzLl9iYXR0bGUuaXNMZXZlbFByZXByYXJlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICBSaG9kZXNHYW1lLkluc3RhbmNlLnN0YXRlTWdyLnJ1blN0YXRlKEdhbWVTdGF0ZUlELkJhdHRsZSk7XHJcbiAgICAgICAgICAgICAgICBEb2RMb2cuZGVidWcoYEdhbWVTdGF0ZUxldmVsbG9hZC51cGRhdGU6IGxldmVsIFske0RvZFJlc291cmNlTWdyLkluc3RhbmNlLmdldExldmVsSUQoKX1dIGlzIHByZXBhcmVkLiBgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBHYW1lU3RhdGVCYXNlIGZyb20gXCIuL0dhbWVTdGF0ZUJhc2VcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTdGF0ZUxvYmJ5IGV4dGVuZHMgR2FtZVN0YXRlQmFzZXtcclxuICAgIGNvbnN0cnVjdG9yKGJhdHRsZSkge1xyXG4gICAgICAgIHN1cGVyKGJhdHRsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudGVyKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmVudGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxlYXZlKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmxlYXZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLnJlc2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci51cGRhdGUoKTtcclxuICAgIH1cclxufSIsImltcG9ydCBHYW1lU3RhdGVCYXNlIGZyb20gXCIuL0dhbWVTdGF0ZUJhc2VcIjtcclxuaW1wb3J0IEdhbWVTdGF0ZUJhdHRsZSBmcm9tIFwiLi9HYW1lU3RhdGVCYXR0bGVcIjtcclxuaW1wb3J0IERvZExvZyBmcm9tIFwiLi4vLi4vQ29tbW9uL0RvZExvZ1wiO1xyXG5pbXBvcnQgR2FtZVN0YXRlTGV2ZWxMb2FkIGZyb20gXCIuL0dhbWVTdGF0ZUxldmVsbG9hZFwiO1xyXG5pbXBvcnQgR2FtZVN0YXRlR2FtZWxvYWQgZnJvbSBcIi4vR2FtZVN0YXRlR2FtZWxvYWRcIjtcclxuaW1wb3J0IEdhbWVTdGF0ZUxvYmJ5IGZyb20gXCIuL0dhbWVTdGF0ZUxvYmJ5XCI7XHJcbmltcG9ydCBSaG9kZXNHYW1lIGZyb20gXCIuLi9SaG9kZXNHYW1lXCI7XHJcbmltcG9ydCBHYW1lQmF0dGxlIGZyb20gXCIuLi9HYW1lQmF0dGxlXCI7XHJcblxyXG5leHBvcnQgZW51bSBHYW1lU3RhdGVJRCB7XHJcbiAgICBOb25lLFxyXG4gICAgR2FtZWxvYWQsXHJcbiAgICBMb2JieSxcclxuICAgIExldmVsbG9hZCxcclxuICAgIEJhdHRsZSxcclxuICAgIENvdW50XHJcbn1cclxuXHJcbi8qXHJcbiAqIOWkp+eKtuaAgeacuiDnrqHnkIbmuLjmiI/miYDlpITpmLbmrrVcclxuICogQFRPRE8gR0FNRUxPQUQgTE9CQlkgTEVWRUxMT0FEIEJBVFRMRVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVN0YXRlTWdyIHtcclxuICAgIHByaXZhdGUgX3N0YXRlczogR2FtZVN0YXRlQmFzZVtdO1xyXG4gICAgcHJpdmF0ZSBfY3VycmVudFN0YXRlOiBHYW1lU3RhdGVCYXNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGJhdHRsZTpHYW1lQmF0dGxlKSB7XHJcbiAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlID0gbnVsbDtcclxuICAgICAgICAvLyBsZXQgYmF0dGxlID0gUmhvZGVzR2FtZS5JbnN0YW5jZS5iYXR0bGU7XHJcbiAgICBcclxuICAgICAgICB0aGlzLl9zdGF0ZXMgPSBbXTtcclxuICAgICAgICB0aGlzLl9zdGF0ZXMucHVzaChudWxsKTtcclxuICAgICAgICB0aGlzLl9zdGF0ZXMucHVzaChuZXcgR2FtZVN0YXRlR2FtZWxvYWQoYmF0dGxlKSk7XHJcbiAgICAgICAgdGhpcy5fc3RhdGVzLnB1c2gobmV3IEdhbWVTdGF0ZUxvYmJ5KGJhdHRsZSkpO1xyXG4gICAgICAgIHRoaXMuX3N0YXRlcy5wdXNoKG5ldyBHYW1lU3RhdGVMZXZlbExvYWQoYmF0dGxlKSk7XHJcbiAgICAgICAgdGhpcy5fc3RhdGVzLnB1c2gobmV3IEdhbWVTdGF0ZUJhdHRsZShiYXR0bGUpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ydW5TdGF0ZShHYW1lU3RhdGVJRC5HYW1lbG9hZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJ1blN0YXRlKHN0YXRlSUQ6IEdhbWVTdGF0ZUlEKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKEdhbWVTdGF0ZUlELkNvdW50IDw9IHN0YXRlSUQgfHwgc3RhdGVJRCA8PSBHYW1lU3RhdGVJRC5Ob25lKSB7XHJcbiAgICAgICAgICAgIERvZExvZy5lcnJvcihgR2FtZVN0YXRlTWdyLnJ1blN0YXRlOiBJbnZhbGlkIHN0YXRlSUQgWyR7c3RhdGVJRH1dLiBgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG51bGwgIT0gdGhpcy5fY3VycmVudFN0YXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZS5sZWF2ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlID0gdGhpcy5fc3RhdGVzW3N0YXRlSURdO1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZS5lbnRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKG51bGwgIT0gdGhpcy5fY3VycmVudFN0YXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZS51cGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChudWxsICE9IHRoaXMuX2N1cnJlbnRTdGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUubGVhdmUoKTtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fc3RhdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuX3N0YXRlc1tpXTtcclxuICAgICAgICAgICAgc3RhdGUucmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgR2FtZUNvbmZpZyBmcm9tIFwiLi9HYW1lQ29uZmlnXCI7XHJcbmltcG9ydCBTY2VuZU1hbmFnZXIgZnJvbSBcIi4vU2NlbmVNYW5hZ2VyXCI7XHJcbmltcG9ydCBGaXhUaW1lIGZyb20gXCIuL0ZpeC9GaXhUaW1lXCI7XHJcbmltcG9ydCBSaG9kZXNHYW1lIGZyb20gXCIuL0dhbWUvUmhvZGVzR2FtZVwiO1xyXG5pbXBvcnQgeyBFdmVudENlbnRyZSB9IGZyb20gXCIuL0V2ZW50L0V2ZW50Q2VudHJlXCI7XHJcbmltcG9ydCBEb2RSZXNvdXJjZU1nciBmcm9tIFwiLi9SZXNvdXJjZXMvRG9kUmVzb3VyY2VNZ3JcIjtcclxuaW1wb3J0IFBlcmZvcm1hbmNlQ2VudHJlIGZyb20gXCIuL0NvbW1vbi9HcmFwaGljcy9QZXJmb3JtYW5jZV9Nb2R1bGUvUGVyZm9ybWFuY2VDZW50cmVcIjtcclxuaW1wb3J0IHsgVmVjMiB9IGZyb20gXCIuL0NvbW1vbi9Eb2RNYXRoXCI7XHJcbmltcG9ydCBBY3RvciBmcm9tIFwiLi9HYW1lL0FjdG9yL0FjdG9yXCI7XHJcbmltcG9ydCB7IEFjdG9yVHlwZSB9IGZyb20gXCIuL0NvbW1vbi9Eb2RLZXlcIjtcclxuaW1wb3J0IHsgU3ltYm9saXplZCwgTXlTeW1ib2wgfSBmcm9tIFwiLi9GaXgvRml4U3ltYm9sXCI7XHJcblxyXG5jbGFzcyBNYWluIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdC8v5qC55o2uSURF6K6+572u5Yid5aeL5YyW5byV5pOOXHRcdFxyXG5cdFx0aWYgKHdpbmRvd1tcIkxheWEzRFwiXSkgTGF5YTNELmluaXQoR2FtZUNvbmZpZy53aWR0aCwgR2FtZUNvbmZpZy5oZWlnaHQpO1xyXG5cdFx0ZWxzZSBMYXlhLmluaXQoR2FtZUNvbmZpZy53aWR0aCwgR2FtZUNvbmZpZy5oZWlnaHQsIExheWFbXCJXZWJHTFwiXSk7XHJcblx0XHRMYXlhW1wiUGh5c2ljc1wiXSAmJiBMYXlhW1wiUGh5c2ljc1wiXS5lbmFibGUoKTtcclxuXHRcdExheWFbXCJEZWJ1Z1BhbmVsXCJdICYmIExheWFbXCJEZWJ1Z1BhbmVsXCJdLmVuYWJsZSgpO1xyXG5cdFx0TGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBHYW1lQ29uZmlnLnNjYWxlTW9kZTtcclxuXHRcdExheWEuc3RhZ2Uuc2NyZWVuTW9kZSA9IEdhbWVDb25maWcuc2NyZWVuTW9kZTtcclxuXHRcdC8v5YW85a655b6u5L+h5LiN5pSv5oyB5Yqg6L29c2NlbmXlkI7nvIDlnLrmma9cclxuXHRcdExheWEuVVJMLmV4cG9ydFNjZW5lVG9Kc29uID0gR2FtZUNvbmZpZy5leHBvcnRTY2VuZVRvSnNvbjtcclxuXHJcblx0XHQvL+aJk+W8gOiwg+ivlemdouadv++8iOmAmui/h0lEReiuvue9ruiwg+ivleaooeW8j++8jOaIluiAhXVybOWcsOWdgOWinuWKoGRlYnVnPXRydWXlj4LmlbDvvIzlnYflj6/miZPlvIDosIPor5XpnaLmnb/vvIlcclxuXHRcdGlmIChHYW1lQ29uZmlnLmRlYnVnIHx8IExheWEuVXRpbHMuZ2V0UXVlcnlTdHJpbmcoXCJkZWJ1Z1wiKSA9PSBcInRydWVcIikgTGF5YS5lbmFibGVEZWJ1Z1BhbmVsKCk7XHJcblx0XHRpZiAoR2FtZUNvbmZpZy5waHlzaWNzRGVidWcgJiYgTGF5YVtcIlBoeXNpY3NEZWJ1Z0RyYXdcIl0pIExheWFbXCJQaHlzaWNzRGVidWdEcmF3XCJdLmVuYWJsZSgpO1xyXG5cdFx0aWYgKEdhbWVDb25maWcuc3RhdCkgTGF5YS5TdGF0LnNob3coKTtcclxuXHRcdExheWEuYWxlcnRHbG9iYWxFcnJvciA9IHRydWU7XHJcblxyXG5cdFx0Ly9HQU1FIElOSVQgKEdMT0JBTCBNT0RVTEUpXHJcblx0XHRjb25zb2xlLmxvZyhcIlBDIGluaXRcIik7XHJcblx0XHRQZXJmb3JtYW5jZUNlbnRyZS5pbml0aWFsaXplKExheWEuc3RhZ2UpO1xyXG5cclxuXHRcdC8vdGVzdFxyXG5cdFx0UGVyZm9ybWFuY2VDZW50cmUuaW5zdGFuY2UuaW5pdEJvYXJkKFtcclxuXHRcdFx0WzAsMCwwLDBdLFxyXG5cdFx0XHRbMCwwLDAsMF1cclxuXHRcdF0sIG5ldyBWZWMyKDUwLDUwKSwgbmV3IFZlYzIoMTAwLDEwMCksIFwiI2ZmMDBmZlwiLCBcIiNmZmZmMDBcIik7XHJcblxyXG5cdFx0bGV0IGsgPSBuZXcgY2xhc3MgaW1wbGVtZW50cyBTeW1ib2xpemVkIHtcclxuXHRcdFx0c3ltYm9sOiBNeVN5bWJvbCA9IG5ldyBNeVN5bWJvbCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdFBlcmZvcm1hbmNlQ2VudHJlLmluc3RhbmNlLmRpc3BsYXlBY3RvcihrLCBuZXcgVmVjMig1MCw1MCksIG5ldyBWZWMyKDUwLDUwKSk7XHJcblxyXG5cdFx0Y29uc29sZS5sb2coUGVyZm9ybWFuY2VDZW50cmUuaW5zdGFuY2UpO1xyXG5cdFx0Y29uc29sZS5sb2coayk7XHJcblxyXG5cdFx0Ly90ZXN0IGVuZFxyXG5cclxuXHRcdEZpeFRpbWUuaW5pdCgpO1xyXG5cdFx0UmhvZGVzR2FtZS5JbnN0YW5jZS5pbml0KCk7XHJcblx0XHREb2RSZXNvdXJjZU1nci5JbnN0YW5jZS5pbml0KCk7XHJcblx0XHRFdmVudENlbnRyZS5pbml0KCk7XHJcblxyXG5cdFx0Ly/mv4DmtLvotYTmupDniYjmnKzmjqfliLbvvIx2ZXJzaW9uLmpzb27nlLFJREXlj5HluIPlip/og73oh6rliqjnlJ/miJDvvIzlpoLmnpzmsqHmnInkuZ/kuI3lvbHlk43lkI7nu63mtYHnqItcclxuXHRcdExheWEuUmVzb3VyY2VWZXJzaW9uLmVuYWJsZShcInZlcnNpb24uanNvblwiLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMub25WZXJzaW9uTG9hZGVkKSwgTGF5YS5SZXNvdXJjZVZlcnNpb24uRklMRU5BTUVfVkVSU0lPTik7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgb25WZXJzaW9uTG9hZGVkKCk6IHZvaWQge1xyXG5cdFx0Ly/mv4DmtLvlpKflsI/lm77mmKDlsITvvIzliqDovb3lsI/lm77nmoTml7blgJnvvIzlpoLmnpzlj5HnjrDlsI/lm77lnKjlpKflm77lkIjpm4bph4zpnaLvvIzliJnkvJjlhYjliqDovb3lpKflm77lkIjpm4bvvIzogIzkuI3mmK/lsI/lm75cclxuXHRcdExheWEuQXRsYXNJbmZvTWFuYWdlci5lbmFibGUoXCJmaWxlY29uZmlnLmpzb25cIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLm9uQ29uZmlnTG9hZGVkKSk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgb25Db25maWdMb2FkZWQoKTogdm9pZCB7XHJcblxyXG5cdFx0XHJcblxyXG5cdFx0U2NlbmVNYW5hZ2VyLkluc3RhbmNlLmF3YWtlKCk7XHJcblx0XHRcclxuXHJcblx0XHQvL3Rlc3RcclxuXHRcdERvZFJlc291cmNlTWdyLkluc3RhbmNlLmluaXQoKTtcclxuXHRcdFxyXG5cdFx0Ly9Bd2FrZSBHYW1lIEVuZ2luZSBMb29wXHJcblx0XHRMYXlhLnRpbWVyLmxvb3AoMTYsIHRoaXMsIHRoaXMuX3VwZGF0ZSk7XHJcblx0XHRcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgX3VwZGF0ZSgpOiB2b2lkIHtcclxuXHRcdEZpeFRpbWUudXBkYXRlKCk7XHJcblx0XHRSaG9kZXNHYW1lLkluc3RhbmNlLnVwZGF0ZSgpO1xyXG5cdFx0RG9kUmVzb3VyY2VNZ3IuSW5zdGFuY2UudXBkYXRlKCk7XHJcblx0fVxyXG59XHJcblxyXG4vL+a/gOa0u+WQr+WKqOexu1xyXG5uZXcgTWFpbigpO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBEb2RSZXNvdXJjZU1nciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IERvZFJlc291cmNlTWdyO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSW5zdGFuY2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlIHx8ICh0aGlzLl9pbnN0YW5jZSA9IG5ldyB0aGlzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETyBA6ZO25Y2OXHJcbiAgICAvL2xvYWQgcmVzb3VyY2VzIGhlcmUgaW5jbHVkaW5nIEpTT04gLyBURVhUVVJFIC8gQVZBVEFSIC8gU1BJTkVcclxuICAgIC8vcHJpdmF0ZSBfanNvbjogRG9kSnNvbkxvYWRlcjtcclxuICAgIC8vcHJpdmF0ZSBfdGV4OiBEb2RUZXh0dXJlTG9hZGVyO1xyXG5cclxuICAgIHByaXZhdGUgX2xldmVsSUQ6IG51bWJlciB8IG51bGw7XHJcbiAgICBwcml2YXRlIF9pbml0ZWQ6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9sZXZlbFByZXBhcmVkOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX2xldmVsSUQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2luaXRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2xldmVsUHJlcGFyZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0TGV2ZWxJRChpZDogbnVtYmVyIHwgbnVsbCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2xldmVsSUQgPSBpZDtcclxuICAgICAgICB0aGlzLl9sZXZlbFByZXBhcmVkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldExldmVsSUQoKTogbnVtYmVyIHwgbnVsbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xldmVsSUQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgLy9UT0RPIExPQURcclxuICAgICAgICAvL3RoaXMuX2pzb24ubG9hZCgpO1xyXG4gICAgICAgIC8vdGhpcy5fdGV4LmxvYWQoKTtcclxuICAgICAgICAvL3NldCBpbml0ZWQgZmxhZyB0cnVlIHdoaWxlIGluaXRpYWxpemF0aW9uIGNvbXBsZXRlXHJcbiAgICAgICAgdGhpcy5faW5pdGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbml0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAobnVsbCAhPSB0aGlzLnNldExldmVsSUQgJiYgZmFsc2UgPT0gdGhpcy5fbGV2ZWxQcmVwYXJlZCkge1xyXG4gICAgICAgICAgICAvL3ByZXBhcmUgcHJlZmFiIGhlcmVcclxuICAgICAgICAgICAgaWYgKDEpIHsgICAgLy9tYWtlIHN1cmUgcHJlZmFiIHByZXBhcmVkXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sZXZlbFByZXBhcmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNMZXZlbFByZXBhcmVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sZXZlbFByZXBhcmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDdXJyZW50TGV2ZWxSZXMoKTogYW55IHtcclxuICAgICAgICAvL1RPRE9cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QWN0b3JSZXNCeUlEKGlkOiBudW1iZXIpOiBhbnkge1xyXG4gICAgICAgIC8vVE9ET1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59IiwiLy8gaW1wb3J0IEV2ZW50Q2VudHJlIGZyb20gXCIuL1RveWJveC9FdmVudENlbnRyZVwiO1xyXG4vLyBpbXBvcnQgRGF0YWJhc2UgZnJvbSBcIi4vVG95Ym94L0RhdGFiYXNlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2VuZU1hbmFnZXJ7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFNjZW5lTWFuYWdlcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IEluc3RhbmNlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZSB8fCAodGhpcy5faW5zdGFuY2UgPSBuZXcgdGhpcygpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxvYWRpbmdTY2VuZTpzdHJpbmcgPSBcIkxvYWRpbmdTY2VuZS5zY2VuZVwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBnYW1lU2NlbmU6c3RyaW5nID0gXCJHYW1lU2NlbmUuc2NlbmVcIjtcclxuXHJcbiAgICBwdWJsaWMgYXdha2UoKTogdm9pZCB7XHJcbiAgICAgICAgTGF5YS5TY2VuZS5vcGVuKHRoaXMuZ2FtZVNjZW5lKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiIsImltcG9ydCB7dWl9IGZyb20gXCIuLi91aS9sYXlhTWF4VUlcIjtcclxuaW1wb3J0IFJob2Rlc0dhbWUgZnJvbSBcIi4uL0dhbWUvUmhvZGVzR2FtZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUgZXh0ZW5kcyB1aS5HYW1lU2NlbmVVSSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIFVJU2V0OiBMYXlhLlNwcml0ZTtcclxuICAgIHB1YmxpYyBzdGF0aWMgc3RhZ2U6IExheWEuU3RhZ2U7XHJcbiAgICBwcml2YXRlIF9wYXVzZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIC8v5YWo5bGA5pWw5o2u77yI5pWw5o2u5bqT57G75a6M5oiQ5ZCO5bCG6KKr5pu/5Luj77yJXHJcbiAgICBwdWJsaWMgc3RhdGljIGZyYW1lTGVuZ3RoOiBudW1iZXIgPSAyMDsvL+W4p+mVv+W6plxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7dWl9IGZyb20gXCIuLi91aS9sYXlhTWF4VUlcIlxyXG5cclxuXHJcbi8vVE9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZGluZyBleHRlbmRzIHVpLkxvYWRpbmdTY2VuZVVJe1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpXHJcbiAgICB9XHJcbn0iLCIvKipUaGlzIGNsYXNzIGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IExheWFBaXJJREUsIHBsZWFzZSBkbyBub3QgbWFrZSBhbnkgbW9kaWZpY2F0aW9ucy4gKi9cbmltcG9ydCBWaWV3PUxheWEuVmlldztcclxuaW1wb3J0IERpYWxvZz1MYXlhLkRpYWxvZztcclxuaW1wb3J0IFNjZW5lPUxheWEuU2NlbmU7XG52YXIgUkVHOiBGdW5jdGlvbiA9IExheWEuQ2xhc3NVdGlscy5yZWdDbGFzcztcbmV4cG9ydCBtb2R1bGUgdWkge1xyXG4gICAgZXhwb3J0IGNsYXNzIEdhbWVTY2VuZVVJIGV4dGVuZHMgU2NlbmUge1xyXG5cdFx0cHVibGljIFVJU2V0OkxheWEuU3ByaXRlO1xuXHRcdHB1YmxpYyBTaWRlQmFyOkxheWEuU3ByaXRlO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiR2FtZVNjZW5lXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLkdhbWVTY2VuZVVJXCIsR2FtZVNjZW5lVUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIExvYWRpbmdTY2VuZVVJIGV4dGVuZHMgU2NlbmUge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJMb2FkaW5nU2NlbmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkuTG9hZGluZ1NjZW5lVUlcIixMb2FkaW5nU2NlbmVVSSk7XHJcbn1cciJdfQ==
