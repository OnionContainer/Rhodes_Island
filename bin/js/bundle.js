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
    /**
     * 将这个坐标吸附到scale为单位长度的平面空间内最近的左上角一点
     * 例如：(310,278)在以100为单位长度吸附后会变为(3,2)
     * @param scale
     */
    Vec2.prototype.adsorp = function (scale) {
        var x = Math.floor(this.x / scale);
        var y = Math.floor(this.y / scale);
        return new Vec2(x, y);
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
        tmpActor.loadAni("angel_normal", "start");
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
        objbox_1.ActorBox.get(from.symbol.data).clearAni();
        objbox_1.ActorBox.get(from.symbol.data).loadAni("angel_normal", "attack", true);
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
    ActorRU.prototype.clearAni = function () {
        this._ani.clear();
    };
    ActorRU.prototype.loadAni = function (name, status, loopOrNot) {
        if (loopOrNot === void 0) { loopOrNot = false; }
        this._ani = new Laya.Animation();
        this._ani.pos(-17 * this._scale, -8 * this._scale);
        this._ani.scale(0.25 * this._scale, 0.18 * this._scale);
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
            var tmpAni = createAniUrls(name + "/" + status, 16);
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
                _this._ani.stop();
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
        this._ani.scale(0.25 * value, 0.18 * value);
        this._ani.pos(-17 * value, -8 * value);
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
var DodTimer = /** @class */ (function () {
    function DodTimer(interval) {
        if (interval === void 0) { interval = 100; }
        this.interval = 0;
        this._lastAct = 0;
        this.interval = interval;
    }
    Object.defineProperty(DodTimer.prototype, "ready", {
        get: function () {
            return FixTime.elapsedTime - this._lastAct >= this.interval;
        },
        enumerable: true,
        configurable: true
    });
    DodTimer.prototype.reset = function () {
        this._lastAct = FixTime.elapsedTime;
    };
    return DodTimer;
}());
exports.DodTimer = DodTimer;
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
        this.atk.onDeploy(pos);
        this.transform.onDeploy(pos);
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
var GameUIEvent_1 = require("../GameUIEvent");
var ActorMgr = /** @class */ (function () {
    function ActorMgr() {
        var _this = this;
        this.sideBar = [];
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
        // this.actors[0].state.runState(ActorStateID.Walk);
        this.createActor(DodKey_1.ActorType.Operator, {});
        this.actors[1].awake();
        GameUIEvent_1.default.fuck = this.actors[1].symbol.data;
        // creatEnemy([300,600,900]);
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
        if (type == DodKey_1.ActorType.Operator) {
            this.sideBar.push(actor);
        }
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
},{"../../Common/DodKey":2,"../GameUIEvent":42,"../RhodesGame":43,"./Actor":16,"./State/ActorStateFsm":34}],18:[function(require,module,exports){
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
var FixTime_1 = require("../../../Fix/FixTime");
var SkillTiming;
(function (SkillTiming) {
    SkillTiming[SkillTiming["Automatic"] = 0] = "Automatic";
    SkillTiming[SkillTiming["Manual"] = 1] = "Manual";
    SkillTiming[SkillTiming["OnAtk"] = 2] = "OnAtk";
    SkillTiming[SkillTiming["None"] = 3] = "None";
})(SkillTiming || (SkillTiming = {}));
var ActorSkill = /** @class */ (function () {
    function ActorSkill(keeper, res) {
        this._timingType = SkillTiming.Manual;
        this._remainTime = 15;
        this._gainPtFromAtk = false;
        this._gainPtFromTime = true;
        this._gainPtFromDef = false;
        this._maxPt = 39;
        this._initPt = 15;
        this._currentPt = 0;
        this._autoRecoverTimer = new FixTime_1.DodTimer(1);
        this._keeper = keeper;
        this._remainTimer = new FixTime_1.DodTimer(100);
        /*
        //todo: 根据res来修改此对象中的属性
        默认数值是能天使的7级二技能
        */
    }
    ActorSkill.prototype.删函数 = function () {
        throw new Error("Method not implemented.");
    };
    Object.defineProperty(ActorSkill.prototype, "isActivated", {
        get: function () { return false; },
        enumerable: true,
        configurable: true
    });
    ActorSkill.prototype.update = function () {
        //尝试按时间获取技能点
        if (this._gainPtFromTime && this._autoRecoverTimer.ready) {
            this._currentPt += 1;
        }
        //尝试自动触发
        if (this._timingType == SkillTiming.Automatic && this._currentPt >= this._maxPt) {
            this.activate();
        }
    };
    ActorSkill.prototype.beforeAtk = function () {
        // throw new Error("Method not implemented.");
    };
    ActorSkill.prototype.afterAtk = function () {
        //do nothing
    };
    ActorSkill.prototype.activate = function () {
    };
    ActorSkill.prototype.terminate = function () {
    };
    ActorSkill.prototype.onDeploy = function (pos) {
        this._currentPt = this._initPt;
        this._autoRecoverTimer.reset();
        // throw new Error("Method not implemented.");
    };
    return ActorSkill;
}());
exports.ActorSkill = ActorSkill;
},{"../../../Fix/FixTime":14}],21:[function(require,module,exports){
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
    Transform.prototype.删函数 = function () {
        throw new Error("Method not implemented.");
    };
    Transform.prototype.onDeploy = function (pos) {
        this.pos.setNodePos(pos);
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
var FixSymbol_1 = require("../../../Fix/FixSymbol");
var UnitRender = /** @class */ (function () {
    function UnitRender(keeper) {
        this._keeper = keeper;
    }
    /**
     * 出生动画
     */
    UnitRender.prototype.bornAnimation = function () {
        var _this = this;
        var fakeActor = new /** @class */ (function () {
            function class_1() {
                this.symbol = new FixSymbol_1.MySymbol();
            }
            return class_1;
        }());
        PerformanceCentre_1.default.instance.displayActor(fakeActor, this._keeper.transform.pos.data, new DodMath_1.Vec2(30, 30), "#ff00ff");
        var borntime = FixTime_1.default.elapsedTime;
        var looper = function () {
            if (FixTime_1.default.elapsedTime - borntime >= 3) {
                PerformanceCentre_1.default.instance.distroyActor(fakeActor);
                Laya.timer.clear(_this, looper);
                return;
            }
            PerformanceCentre_1.default.instance.editBar(fakeActor, 0, (FixTime_1.default.elapsedTime - borntime) / 3);
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
},{"../../../Common/DodMath":4,"../../../Common/Graphics/Performance_Module/PerformanceCentre":6,"../../../Fix/FixSymbol":13,"../../../Fix/FixTime":14}],27:[function(require,module,exports){
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
var FixTime_1 = require("../../../Fix/FixTime");
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
            machine.prepTimer.reset();
            machine.coolTimer.reset();
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
            machine.prepTimer.reset();
            if (seeker.getFocus() != null) {
                // machine.refresh();
            }
            else {
                machine.changeState(StateType.WAIT);
            }
            return;
        }
        //当前目标未修改
        if (machine.prepTimer.ready) {
            //todo: 进行攻击(进行profile参数判断)
            machine.keeper.attack(seeker.getFocus());
            machine.changeState(StateType.AFTER_ATK); //转换到后摇
            machine.coolTimer.reset();
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
        // machine.tic();
        if (machine.coolTimer.ready) {
            // machine.refresh();
            machine.coolTimer.reset();
            machine.prepTimer.reset();
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
    // private _curPoint:number = 0;//当前已积蓄的点数
    // private _velocity:number = 1;//当前累加速率(点数/帧)
    // public get ready():boolean{
    //     return this._curPoint >= this._prepTime;
    // }
    // public tic():void{
    //     this._curPoint += this._velocity;
    // }
    // public get coolComplete():boolean{
    //     return this._curPoint >= this._prepTime+this._coolTime;
    // }
    // public refresh():void{
    //     this._curPoint = 0;
    // }
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
        this._prepTime = 3;
        this._coolTime = 3;
        this.prepTimer = new FixTime_1.DodTimer(this._prepTime);
        this.coolTimer = new FixTime_1.DodTimer(this._coolTime);
        this.seeker = new MapNodeSeeker_1.MapNodeSeeker(this.keeper.profile.getNodePos().plus(new DodMath_1.Vec2(3, 3)), res['xxx'], 0);
    }
    AtkStateMachine.prototype.删函数 = function () {
        throw new Error("Method not implemented.");
    };
    AtkStateMachine.prototype.onDeploy = function (pos) {
        this.seeker.reposition(pos);
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
},{"../../../Common/DodDataStructure":1,"../../../Common/DodMath":4,"../../../Fix/FixTime":14,"./MapNodeSeeker":30}],29:[function(require,module,exports){
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
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActorStateBorn.prototype.enter = function () {
        this._timer = new FixTime_1.DodTimer(3);
        this._actor.render.bornAnimation();
        console.log("Enter Born");
        //test
    };
    ActorStateBorn.prototype.update = function () {
        if (this._timer.ready) { //todo: 这个出生时间应该是一个全场共通的常数
            console.log("Born complete");
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
    ActorStateBorn.prototype.leave = function () {
        console.log("leave born");
        this._actor.render.deploy();
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
        if (1 == 1) {
            return;
        }
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
var FixSymbol_1 = require("../Fix/FixSymbol");
var ColiMessage_1 = require("./Actor/ActorModules/ColiMessage");
var GameUIEvent = /** @class */ (function () {
    function GameUIEvent() {
        this._cancleList = []; //todo
        this.idiots = [];
        this._registerEvent();
    }
    GameUIEvent.prototype._registerEvent = function () {
        PerformanceCentre_1.default.instance.mainSpr.on(Laya.Event.CLICK, this, function () {
            var pos = new DodMath_1.Vec2(PerformanceCentre_1.default.instance.mainSpr.mouseX, PerformanceCentre_1.default.instance.mainSpr.mouseY).adsorp(ColiMessage_1.ColiEmit.GLOBAL_UNIT_WIDTH);
            RhodesGame_1.default.Instance.battle.actorMgr.deployOprt(GameUIEvent.fuck, pos);
        });
        Laya.timer.loop(100, this, function () {
            var pos = new DodMath_1.Vec2(PerformanceCentre_1.default.instance.mainSpr.mouseX, PerformanceCentre_1.default.instance.mainSpr.mouseY);
            console.log(pos);
        });
        // Laya.timer.loop(200,this,this.update);
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
        while (this.idiots.length < RhodesGame_1.default.Instance.battle.actorMgr.sideBar.length) {
            var idi = new Idiot();
            this.idiots.push(idi);
            PerformanceCentre_1.default.instance.displayActor(idi, new DodMath_1.Vec2(50 + 100 * idi.nnum, 600), new DodMath_1.Vec2(100, 100));
        }
        while (this.idiots.length > RhodesGame_1.default.Instance.battle.actorMgr.sideBar.length) {
            PerformanceCentre_1.default.instance.distroyActor(this.idiots.pop());
        }
        this.idiots.forEach(function (idiot, index) {
            PerformanceCentre_1.default.instance.attachButton(idiot, 1, function () {
                GameUIEvent.fuck = RhodesGame_1.default.Instance.battle.actorMgr.sideBar[index].symbol.data;
            });
        });
    };
    GameUIEvent.fuck = 1;
    return GameUIEvent;
}());
exports.default = GameUIEvent;
var Idiot = /** @class */ (function () {
    function Idiot() {
        this.symbol = new FixSymbol_1.MySymbol();
        this.nnum = 0;
        this.nnum = Idiot.num;
        this.nnum += 1;
    }
    Idiot.num = 0;
    return Idiot;
}());
},{"../Common/DodMath":4,"../Common/Graphics/Performance_Module/PerformanceCentre":6,"../Fix/FixSymbol":13,"./Actor/ActorModules/ColiMessage":22,"./RhodesGame":43}],43:[function(require,module,exports){
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
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ], new DodMath_1.Vec2(50, 50), new DodMath_1.Vec2(100, 100), "#ff00ff", "#ffff00");
        PerformanceCentre_1.default.instance.displayActor(new /** @class */ (function () {
            function class_1() {
                this.symbol = new FixSymbol_1.MySymbol();
            }
            return class_1;
        }()), new DodMath_1.Vec2(10000, 10000), new DodMath_1.Vec2());
        //Bug Temp Fix
        //todo: 告诉李哥点击事件bug
        // let k = new class implements Symbolized {
        // 	symbol: MySymbol = new MySymbol();
        // }
        // PerformanceCentre.instance.displayActor(k, new Vec2(50,50), new Vec2(50,50));
        // console.log(PerformanceCentre.instance);
        // console.log(k);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xheWEvTGF5YUFpcklERS9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQ29tbW9uL0RvZERhdGFTdHJ1Y3R1cmUudHMiLCJzcmMvQ29tbW9uL0RvZEtleS50cyIsInNyYy9Db21tb24vRG9kTG9nLnRzIiwic3JjL0NvbW1vbi9Eb2RNYXRoLnRzIiwic3JjL0NvbW1vbi9HcmFwaGljcy9QZXJmb3JtYW5jZV9Nb2R1bGUvQWN0b3JDb21wb25lbnQudHMiLCJzcmMvQ29tbW9uL0dyYXBoaWNzL1BlcmZvcm1hbmNlX01vZHVsZS9QZXJmb3JtYW5jZUNlbnRyZS50cyIsInNyYy9Db21tb24vR3JhcGhpY3MvUGVyZm9ybWFuY2VfTW9kdWxlL1N5bWJvbGl6ZWRSZW5kZXIudHMiLCJzcmMvQ29tbW9uL0dyYXBoaWNzL1BlcmZvcm1hbmNlX01vZHVsZS9VbnN5bWJvbGl6ZWRSZW5kZXIudHMiLCJzcmMvQ29tbW9uL0dyYXBoaWNzL1BlcmZvcm1hbmNlX01vZHVsZS9jdXN0b21pemVkU3ByLnRzIiwic3JjL0NvbW1vbi9HcmFwaGljcy9QZXJmb3JtYW5jZV9Nb2R1bGUvb2JqYm94LnRzIiwic3JjL0V2ZW50L0V2ZW50Q2VudHJlLnRzIiwic3JjL0ZpeC9GaXhSZWN0LnRzIiwic3JjL0ZpeC9GaXhTeW1ib2wudHMiLCJzcmMvRml4L0ZpeFRpbWUudHMiLCJzcmMvR2FtZUNvbmZpZy50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yLnRzIiwic3JjL0dhbWUvQWN0b3IvQWN0b3JNZ3IudHMiLCJzcmMvR2FtZS9BY3Rvci9BY3Rvck1vZHVsZXMvQWN0b3JCdWZmTWdyLnRzIiwic3JjL0dhbWUvQWN0b3IvQWN0b3JNb2R1bGVzL0FjdG9yQ29zdC50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yTW9kdWxlcy9BY3RvclNraWxsLnRzIiwic3JjL0dhbWUvQWN0b3IvQWN0b3JNb2R1bGVzL0FuaW1hdGlvbi50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yTW9kdWxlcy9Db2xpTWVzc2FnZS50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yTW9kdWxlcy9EYW1hZ2UudHMiLCJzcmMvR2FtZS9BY3Rvci9BY3Rvck1vZHVsZXMvUHJvZmlsZS50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yTW9kdWxlcy9UcmFuc2Zvcm0udHMiLCJzcmMvR2FtZS9BY3Rvci9BY3Rvck1vZHVsZXMvVW5pdFJlbmRlci50cyIsInNyYy9HYW1lL0FjdG9yL0FjdG9yUm91dGUudHMiLCJzcmMvR2FtZS9BY3Rvci9BdHRhY2svQXRrQWJzdC50cyIsInNyYy9HYW1lL0FjdG9yL0F0dGFjay9CbG9ja2VyLnRzIiwic3JjL0dhbWUvQWN0b3IvQXR0YWNrL01hcE5vZGVTZWVrZXIudHMiLCJzcmMvR2FtZS9BY3Rvci9TdGF0ZS9BY3RvclN0YXRlQmFzZS50cyIsInNyYy9HYW1lL0FjdG9yL1N0YXRlL0FjdG9yU3RhdGVCb3JuLnRzIiwic3JjL0dhbWUvQWN0b3IvU3RhdGUvQWN0b3JTdGF0ZUZpZ2h0LnRzIiwic3JjL0dhbWUvQWN0b3IvU3RhdGUvQWN0b3JTdGF0ZUZzbS50cyIsInNyYy9HYW1lL0FjdG9yL1N0YXRlL0FjdG9yU3RhdGVQcmVwYXJlZC50cyIsInNyYy9HYW1lL0FjdG9yL1N0YXRlL0FjdG9yU3RhdGVXYWxrLnRzIiwic3JjL0dhbWUvQ29sbGlzaW9uL0FjdG9yQ29sbGlzaW9uUHJvY2Vzc29yLnRzIiwic3JjL0dhbWUvQ29sbGlzaW9uL0NvbGlSZXBvcnRlci50cyIsInNyYy9HYW1lL0dhbWVCYXR0bGUudHMiLCJzcmMvR2FtZS9HYW1lQmF0dGxlQ29uc3QudHMiLCJzcmMvR2FtZS9HYW1lTGV2ZWwudHMiLCJzcmMvR2FtZS9HYW1lVUlFdmVudC50cyIsInNyYy9HYW1lL1Job2Rlc0dhbWUudHMiLCJzcmMvR2FtZS9TdGF0ZS9HYW1lU3RhdGVCYXNlLnRzIiwic3JjL0dhbWUvU3RhdGUvR2FtZVN0YXRlQmF0dGxlLnRzIiwic3JjL0dhbWUvU3RhdGUvR2FtZVN0YXRlR2FtZWxvYWQudHMiLCJzcmMvR2FtZS9TdGF0ZS9HYW1lU3RhdGVMZXZlbGxvYWQudHMiLCJzcmMvR2FtZS9TdGF0ZS9HYW1lU3RhdGVMb2JieS50cyIsInNyYy9HYW1lL1N0YXRlL0dhbWVTdGF0ZU1nci50cyIsInNyYy9NYWluLnRzIiwic3JjL1Jlc291cmNlcy9Eb2RSZXNvdXJjZU1nci50cyIsInNyYy9TY2VuZU1hbmFnZXIudHMiLCJzcmMvU2NlbmVTY3JpcHQvR2FtZS50cyIsInNyYy9TY2VuZVNjcmlwdC9Mb2FkaW5nLnRzIiwic3JjL3VpL2xheWFNYXhVSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNOQTtJQUFBO1FBQ1ksVUFBSyxHQUFPLEVBQUUsQ0FBQztJQWEzQixDQUFDO0lBWlUscUJBQUksR0FBWCxVQUFZLEdBQVUsRUFBRSxLQUFPO1FBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO0lBQzVCLENBQUM7SUFDTSxxQkFBSSxHQUFYLFVBQVksR0FBVTtRQUNsQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVNLHdCQUFPLEdBQWQsVUFBZSxDQUFzQjtRQUNqQyxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDdEIsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBQ0wsYUFBQztBQUFELENBZEEsQUFjQyxJQUFBO0FBZFksd0JBQU07QUFpQm5CO0lBR0ksY0FBWSxJQUFNLEVBQUUsSUFBWTtRQUM1QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixD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LGNBQWMsQ0FBQyxDQUFDO0FBQzVDLENBQUMsRUFuQmEsRUFBRSxHQUFGLFVBQUUsS0FBRixVQUFFLFFBbUJmIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCB7IENvbXBhcmFibGUgfSBmcm9tIFwiLi9Eb2RNYXRoXCI7XHJcblxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBLVlBhaXI8Vj57XHJcbiAgICBwcml2YXRlIF9saXN0OmFueSA9IHt9O1xyXG4gICAgcHVibGljIGVkaXQoa2V5OnN0cmluZywgdmFsdWU6Vik6dm9pZHtcclxuICAgICAgICB0aGlzLl9saXN0W2tleV0gPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyByZWFkKGtleTpzdHJpbmcpOlZ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3Rba2V5XTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGl0ZXJhdGUoZjooazpzdHJpbmcsdjpWKT0+dm9pZCk6dm9pZHtcclxuICAgICAgICBmb3IgKGxldCBrIGluIHRoaXMuX2xpc3QpIHtcclxuICAgICAgICAgICAgZihrLCB0aGlzLl9saXN0W2tdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5jbGFzcyBOb2RlPEU+e1xyXG4gICAgcHVibGljIGl0ZW06RTtcclxuICAgIHB1YmxpYyBuZXh0Ok5vZGU8RT47XHJcbiAgICBjb25zdHJ1Y3RvcihpdGVtOkUsIG5leHQ6Tm9kZTxFPil7XHJcbiAgICAgICAgdGhpcy5pdGVtID0gaXRlbTtcclxuICAgICAgICB0aGlzLm5leHQgPSBuZXh0O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTGlua0xpc3Q8RT57XHJcbiAgICBwcml2YXRlIF9oZWFkOk5vZGU8RT47XHJcbiAgICBwcml2YXRlIF90YWlsOk5vZGU8RT47XHJcbiAgICBwcml2YXRlIF9sZW5ndGg6bnVtYmVyID0gMDtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5faGVhZCA9IG5ldyBOb2RlPEU+KG51bGwsIG51bGwpO1xyXG4gICAgICAgIHRoaXMuX3RhaWwgPSBuZXcgTm9kZTxFPihudWxsLCBudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WfuuehgOWxnuaAp1xyXG4gICAgcHVibGljIGdldCBsZW5ndGgoKTpudW1iZXJ7XHJcbiAgICAgICAgLy8gbGV0IHJlc3VsdDpudW1iZXIgPSAwO1xyXG4gICAgICAgIC8vIGxldCBjdXJyZW50Ok5vZGU8RT4gPSB0aGlzLl9oZWFkO1xyXG4gICAgICAgIC8vIHdoaWxlIChjdXJyZW50Lm5leHQgIT09IG51bGwpIHtcclxuICAgICAgICAvLyAgICAgcmVzdWx0ICs9IDE7XHJcbiAgICAgICAgLy8gICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzRW1wdHkoKTpib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9oZWFkLm5leHQgPT09IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lop7liKDmlLnmn6VcclxuICAgIC8v5aKeXHJcbiAgICBwdWJsaWMgcHVzaChpdGVtOkUpOnZvaWR7XHJcbiAgICAgICAgbGV0IGxhc3Q6Tm9kZTxFPiA9IG5ldyBOb2RlPEU+KGl0ZW0sIG51bGwpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzRW1wdHkpIHtcclxuICAgICAgICAgICAgdGhpcy5faGVhZC5uZXh0ID0gbGFzdDtcclxuICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0ID0gbGFzdDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl90YWlsLm5leHQubmV4dCA9IGxhc3Q7XHJcbiAgICAgICAgICAgIHRoaXMuX3RhaWwubmV4dCA9IGxhc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2xlbmd0aCArPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1bnNoaWZ0KGl0ZW06RSk6dm9pZHtcclxuICAgICAgICBsZXQgZmlyc3Q6Tm9kZTxFPiA9IG5ldyBOb2RlPEU+KGl0ZW0sIG51bGwpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzRW1wdHkpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0ID0gZmlyc3Q7XHJcbiAgICAgICAgICAgIHRoaXMuX2hlYWQubmV4dCA9IGZpcnN0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZpcnN0Lm5leHQgPSB0aGlzLl9oZWFkLm5leHQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2hlYWQubmV4dCA9IGZpcnN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9sZW5ndGggKz0gMTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5zZXJ0KGluZGV4Om51bWJlciwgaXRlbTpFKTpib29sZWFue1xyXG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPiB0aGlzLl9sZW5ndGgpIHsvL+i/meWPpeS4jeS4gOagt1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaW5kZXggPT09IHRoaXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY3VycmVudDpOb2RlPEU+ID0gdGhpcy5faGVhZDsvL+i/meWPpeWSjOWFtuS7lumBjeWOhuaYr+S4jeS4gOagt+eahO+8jOWboOS4uuimgemAieWPluWIsOmAieWumuS9jee9rueahOWJjemdouS4gOagvFxyXG4gICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgaW5kZXg7IG4gKz0gMSkge1xyXG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3VycmVudC5uZXh0ID0gbmV3IE5vZGU8RT4oaXRlbSwgY3VycmVudC5uZXh0KTtcclxuICAgICAgICB0aGlzLl9sZW5ndGggKz0gMTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liKBcclxuICAgIHB1YmxpYyByZW1vdmUoaW5kZXg6bnVtYmVyKTpFe1xyXG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY3VycmVudDpOb2RlPEU+ID0gdGhpcy5faGVhZC5uZXh0O1xyXG4gICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgaW5kZXg7IG4gKz0gMSkge1xyXG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGl0ZW06RSA9IGN1cnJlbnQuaXRlbTtcclxuICAgICAgICBjdXJyZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9sZW5ndGggLT0gMTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQuaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hpZnQoKTpFe1xyXG4gICAgICAgIGlmICh0aGlzLmlzRW1wdHkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaXRlbSA9IHRoaXMuX2hlYWQubmV4dC5pdGVtO1xyXG4gICAgICAgIHRoaXMuX2hlYWQubmV4dCA9IHRoaXMuX2hlYWQubmV4dC5uZXh0O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc0VtcHR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RhaWwubmV4dCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9sZW5ndGggLT0gMTtcclxuICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICAvL+aUuVxyXG4gICAgcHVibGljIHdyaXRlKGluZGV4Om51bWJlciwgaXRlbTpFKTp2b2lke1xyXG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGN1cnJlbnQ6Tm9kZTxFPiA9IHRoaXMuX2hlYWQubmV4dDtcclxuICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IGluZGV4OyBuICs9IDEpIHtcclxuICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGN1cnJlbnQuaXRlbSA9IGl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgLy/mn6VcclxuICAgIHB1YmxpYyByZWFkKGluZGV4Om51bWJlcik6RXtcclxuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjdXJyZW50Ok5vZGU8RT4gPSB0aGlzLl9oZWFkLm5leHQ7XHJcbiAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBpbmRleDsgbiArPSAxKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY3VycmVudC5pdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZWFyY2goaXRlbTpFKTpudW1iZXJbXXtcclxuICAgICAgICBsZXQgcmVzdWx0Om51bWJlcltdID0gW107XHJcbiAgICAgICAgdGhpcy5mb3JlYWNoKChlbGU6RSwgaW5kZXg6bnVtYmVyKT0+e1xyXG4gICAgICAgICAgICBpZiAoZWxlID09PSBpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChpbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat6ZO+6KGo5Lit5piv5ZCm5a2Y5Zyo5p+Q5LiA5YWD57SgXHJcbiAgICAgKiBAcGFyYW0gaXRlbSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGhhcyhpdGVtOiBFKTpib29sZWFue1xyXG5cclxuICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMuX2hlYWQubmV4dDtcclxuICAgICAgICB3aGlsZSAoY3VycmVudCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50Lml0ZW0gPT0gaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+mrmOmYtuWHveaVsFxyXG4gICAgcHVibGljIGZvcmVhY2goZjooZWxlOkUsIGluZGV4Om51bWJlciwgbGlzdDpMaW5rTGlzdDxFPik9PnZvaWQpOnZvaWR7XHJcbiAgICAgICAgbGV0IGN1cnJlbnQgPSB0aGlzLl9oZWFkLm5leHQ7XHJcbiAgICAgICAgbGV0IG51bTpudW1iZXIgPSAwO1xyXG4gICAgICAgIHdoaWxlIChjdXJyZW50ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGYoY3VycmVudC5pdGVtLCBudW0sIHRoaXMpO1xyXG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4gICAgICAgICAgICBudW0gKz0gMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDor7fmmoLml7bkuI3opoHkvb/nlKjov5nkuKrlh73mlbDvvIzlm6DkuLrmiJHkuZ/kuI3nn6XpgZPlroPkvJrkuI3kvJrniIbngrhcclxuICAgICAqIOmZpOmdnuS9oOivu+i/h+i/meS4quWHveaVsOeahOa6kOS7o+eggVxyXG4gICAgICogQHBhcmFtIGYg5Yik5pat5YWD57Sg5LyY5YWI57qn55qE5Zue6LCD5Ye95pWwXHJcbiAgICAgKiBAcGFyYW0gaW5jcmVhc2Ug5piv5ZCm5Y2H5bqP77yM6buY6K6k5Y2H5bqPXHJcbiAgICAgKiBAcmV0dXJucyDov5Tlm57kuIDkuKrmjpLluo/nmoTpk77ooahcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNvcnRieShmOihlbGU6RSk9Pm51bWJlciwgaW5jcmVhc2U6Ym9vbGVhbiA9IHRydWUpOkxpbmtMaXN0PEU+e1xyXG4gICAgICAgIGxldCBwcmlvcml0eTpMaW5rTGlzdDxudW1iZXI+ID0gbmV3IExpbmtMaXN0PG51bWJlcj4oKTtcclxuICAgICAgICBsZXQgc29ydGVkOkxpbmtMaXN0PEU+ID0gbmV3IExpbmtMaXN0PEU+KCk7XHJcbiAgICAgICAgcHJpb3JpdHkucHVzaCgtMCk7XHJcbiAgICAgICAgc29ydGVkLnB1c2gobnVsbCk7XHJcblxyXG4gICAgICAgIGxldCBjb21wYXJlOihhOm51bWJlcixiOm51bWJlcik9PmJvb2xlYW4gPSBpbmNyZWFzZT8oYSxiKT0+e3JldHVybiBhIDwgYjt9OihhLGIpPT57cmV0dXJuIGEgPiBifTtcclxuXHJcbiAgICAgICAgdGhpcy5mb3JlYWNoKChlbGUpPT57XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50UHJpID0gZihlbGUpO1xyXG4gICAgICAgICAgICBsZXQgbm9kZTpOb2RlPEU+ID0gc29ydGVkLl9oZWFkLm5leHQ7XHJcbiAgICAgICAgICAgIGxldCBwcmlOb2RlOk5vZGU8bnVtYmVyPiA9IHByaW9yaXR5Ll9oZWFkLm5leHQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgZm91bmRQbGFjZTpib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHdoaWxlIChub2RlLm5leHQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vIGlmIChjdXJyZW50UHJpIDwgcHJpTm9kZS5uZXh0Lml0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb21wYXJlKGN1cnJlbnRQcmksIHByaU5vZGUubmV4dC5pdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUubmV4dCA9IG5ldyBOb2RlPEU+KGVsZSwgbm9kZS5uZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICBwcmlOb2RlLm5leHQgPSBuZXcgTm9kZTxudW1iZXI+KGN1cnJlbnRQcmksIHByaU5vZGUubmV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm91bmRQbGFjZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbm9kZSA9IG5vZGUubmV4dDtcclxuICAgICAgICAgICAgICAgIHByaU5vZGUgPSBwcmlOb2RlLm5leHQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghZm91bmRQbGFjZSkge1xyXG4gICAgICAgICAgICAgICAgc29ydGVkLnB1c2goZWxlKTtcclxuICAgICAgICAgICAgICAgIHByaW9yaXR5LnB1c2goY3VycmVudFByaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc29ydGVkLnNoaWZ0KCk7XHJcbiAgICAgICAgcmV0dXJuIHNvcnRlZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBwdWJsaWMgYmJTb3J0QnkoZjooZWxlOkUpPT5udW1iZXIsIGluY3JlYXNlOmJvb2xlYW4gPSB0cnVlKTpMaW5rTGlzdDxFPntcclxuXHJcbiAgICAvLyB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUEFycmF5PEU+e1xyXG4gICAgcHVibGljIGFycjpFW107XHJcbiAgICBwdWJsaWMgcG9pbnRlcjpudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc291cmNlOkVbXSA9IFtdLCBpbml0UG9pbnQ6bnVtYmVyID0gLTEpe1xyXG4gICAgICAgIHRoaXMuYXJyID0gc291cmNlO1xyXG4gICAgICAgIHRoaXMucG9pbnRlciA9IGluaXRQb2ludDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVhZCgpOkV7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXJyW3RoaXMucG9pbnRlcl07XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBzdGVwKCk6dm9pZHtcclxuICAgICAgICB0aGlzLnBvaW50ZXIgKz0gMTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IG91dCgpOmJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucG9pbnRlciA8IDAgfHwgdGhpcy5wb2ludGVyID49IHRoaXMuYXJyLmxlbmd0aDtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQXJyYXlBbGdve1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L6T5YWl55qE5Lik5Liq5pWw57uE55qE5q+P5LiqaW5kZXjlr7nlupTlhYPntKDmmK/lkKbnm7jnrYlcclxuICAgICAqIEBwYXJhbSBhcnIwIFxyXG4gICAgICogQHBhcmFtIGFycjEgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc3RyaWN0Q29tcGFyZShhcnIwOkNvbXBhcmFibGVbXSwgYXJyMTpDb21wYXJhYmxlW10pOmJvb2xlYW57XHJcbiAgICAgICAgaWYgKGFycjAubGVuZ3RoICE9PSBhcnIxLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyMC5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICBpZiAoIWFycjBbaV0uZXF1YWxzKGFycjFbaV0pKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue5LiA5Liq6ZuG5ZCIY++8jOS4lOS9v+W+l+Wug+WFt+acieWmguS4i+aAp+i0qO+8mlxyXG4gICAgICog5a+55LqO5q+P5Liq5a2Y5Zyo5LqO6ZuG5ZCIYeS4reeahOWFg+e0oO+8jOWmguaenOWug+S4jeWcqOmbhuWQiGLkuK3vvIzliJnlroPlnKjpm4blkIhj5LitXHJcbiAgICAgKiDljbNjPWEtYlxyXG4gICAgICogQHBhcmFtIGEgXHJcbiAgICAgKiBAcGFyYW0gYiBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBmaW5kQ29tcGxlbWVudFNldChhOkNvbXBhcmFibGVbXSwgYjpDb21wYXJhYmxlW10pOkNvbXBhcmFibGVbXXtcclxuICAgICAgICBsZXQgcmVzdWx0OkNvbXBhcmFibGVbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGVsZSBvZiBhKSB7XHJcbiAgICAgICAgICAgIGlmIChBcnJheUFsZ28uZmluZEVsZShlbGUsIGIpID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZWxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy/msYLnm7jlr7nooaXpm4ZhLWJcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue5LiA5Liq6ZuG5ZCIY++8jOS4lOS9v+W+l+Wug+WFt+acieWmguS4i+aAp+i0qO+8mlxyXG4gICAgICog5a+55LqO5q+P5Liq5a2Y5Zyo5LqO6ZuG5ZCIYeS4reeahOWFg+e0oO+8jOWmguaenOWug+S4jeWcqOmbhuWQiGLkuK3vvIzliJnlroPlnKjpm4blkIhj5LitXHJcbiAgICAgKiDljbNjPWEtYlxyXG4gICAgICogXHJcbiAgICAgKiDms6jmhI/vvJrnm67liY3lpoLmnpxh5Lit5a2Y5Zyo5Lik5Liq5YWD57SgS++8jGLkuK3lrZjlnKjkuIDkuKrlhYPntKBL77yM57uT5p6c5Lit55qEY+S4jeS8muWtmOWcqOWFg+e0oEtcclxuICAgICAqIOWPquimgWLkuK3lrZjlnKjkuIDkuKrlsLHkvJrmioph6YeM55qE5YWo6YOo5YeP5o6JXHJcbiAgICAgKiBAcGFyYW0gYSBcclxuICAgICAqIEBwYXJhbSBiIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGZpbmRDb21wU2V0KGE6YW55W10sIGI6YW55W10pOmFueVtdIHtcclxuICAgICAgICBsZXQgcmVzdWx0OkNvbXBhcmFibGVbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGVsZSBvZiBhKSB7XHJcbiAgICAgICAgICAgIGlmIChiLmluZGV4T2YoYSkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChlbGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvL+axguebuOWvueihpembhmEtYlxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBmaW5kSW50ZXJzZWN0aW9uU2V0KGE6Q29tcGFyYWJsZVtdLCBiOkNvbXBhcmFibGVbXSl7XHJcbiAgICAgICAgLy/msYLkuqTpm4Zh4oipYlxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L6T5YWl5LiA5Liq5pWw57uE77yM6L+U5Zue5bCG6YeN5aSN5YWD57Sg5Yig6Zmk5ZCO55qE5paw5pWw57uEXHJcbiAgICAgKiDkuI3mlLnliqjljp/mlbDnu4RcclxuICAgICAqIOWkmuS4quWFg+e0oOS7heWPlummluS4qlxyXG4gICAgICogQHBhcmFtIGxpc3QgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc2hyaW5rKGxpc3Q6YW55W10pOmFueVtde1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcclxuXHJcbiAgICAgICAgbGlzdC5mb3JFYWNoKGVsZT0+e1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0LmluZGV4T2YoZWxlKSA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZWxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5rGCZWxl5ZyoYXJy5Lit55qEaW5kZXjvvIzoi6XmnKrmib7liLDliJnov5Tlm54tMVxyXG4gICAgICogZWxl5b+F6aG75a6e546wY29tcGFyYWJsZeaOpeWPo1xyXG4gICAgICogQHBhcmFtIGVsZSBcclxuICAgICAqIEBwYXJhbSBhcnIgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZmluZEVsZShlbGU6Q29tcGFyYWJsZSwgYXJyOkNvbXBhcmFibGVbXSk6bnVtYmVye1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgIGlmIChlbGUuZXF1YWxzKGFycltpXSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS7jmFycuS4reenu+mZpGVsZVxyXG4gICAgICog5aaC5p6cZWxl5LiN5a2Y5Zyo5YiZ5LuA5LmI6YO95LiN5YGaXHJcbiAgICAgKiBAcGFyYW0gZWxlIFxyXG4gICAgICogQHBhcmFtIGFyciBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByZW1vdmVFbGUoZWxlOmFueSwgYXJyOmFueVtdKTphbnlbXXtcclxuICAgICAgICBjb25zdCBpID0gYXJyLmluZGV4T2YoZWxlKTtcclxuICAgICAgICBpZiAoaSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgYXJyLnNwbGljZShpLDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG4vLyBleHBvcnQgY2xhc3MgQm94IGV4dGVuZHMgTGF5YS5SZWN0YW5nbGV7XHJcblxyXG4vLyAgICAgcHVibGljIHVuaXRYOm51bWJlcjtcclxuLy8gICAgIHB1YmxpYyB1bml0WTpudW1iZXI7XHJcbiAgICBcclxuXHJcbi8vICAgICBjb25zdHJ1Y3Rvcigpe1xyXG4vLyAgICAgICAgIHN1cGVyKDAsMCwwLDApO1xyXG4vLyAgICAgfVxyXG4gICBcclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOWwseaYr+KApuKApuadpeS4gOe7hO+8iDEwMOS4qu+8iemaj+acuueahOeisOaSnueusVxyXG4vLyAgICAgICogQHBhcmFtIHhSYW5nZSBcclxuLy8gICAgICAqIEBwYXJhbSB5UmFuZ2UgXHJcbi8vICAgICAgKiBAcGFyYW0gd2lkUmFuZ2UgXHJcbi8vICAgICAgKiBAcGFyYW0gaGlnUmFuZ2VcclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHVibGljIHN0YXRpYyByYW5kb21Cb3hlcyh4UmFuZ2U6bnVtYmVyID0gMTIwMCwgeVJhbmdlOm51bWJlciA9IDgwMCwgd2lkUmFuZ2U6bnVtYmVyID0gMzAwLCBoaWdSYW5nZTpudW1iZXIgPSAzMDApOkJveFtde1xyXG4vLyAgICAgICAgIGNvbnN0IHJhZDpGdW5jdGlvbiA9IE15TWF0aC5yYW5kb21JbnQ7XHJcbi8vICAgICAgICAgbGV0IHJlc3VsdDpCb3hbXSA9IFtdO1xyXG4vLyAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCA1MDsgaSArPSAxKSB7XHJcbi8vICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBCb3goKSk7XHJcbi8vICAgICAgICAgICAgIHJlc3VsdFtpXS5wb3MocmFkKHhSYW5nZSksIHJhZCh5UmFuZ2UpKS5zaXplKHJhZCh3aWRSYW5nZSksIHJhZChoaWdSYW5nZSkpO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIHB1YmxpYyBwb3MoeDpudW1iZXIsIHk6bnVtYmVyKTpCb3h7XHJcbi8vICAgICAgICAgdGhpcy54ID0geDtcclxuLy8gICAgICAgICB0aGlzLnkgPSB5O1xyXG4vLyAgICAgICAgIHJldHVybiB0aGlzO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIHB1YmxpYyBzaXplKHdpZHRoOm51bWJlciwgaGVpZ2h0Om51bWJlcik6Qm94e1xyXG4vLyAgICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuLy8gICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuLy8gICAgICAgICByZXR1cm4gdGhpcztcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBwdWJsaWMgaW50ZXJzZWN0c19YKHJlYzpCb3gpOmJvb2xlYW57XHJcbi8vICAgICAgICAgaWYgKHRoaXMueCA8IHJlYy54KSB7XHJcbi8vICAgICAgICAgICAgIHJldHVybiByZWMuaW50ZXJzZWN0c19YKHRoaXMpO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICByZXR1cm4gICh0aGlzLnggPj0gcmVjLnggJiYgdGhpcy54IDw9IHJlYy5yaWdodCkgfHxcclxuLy8gICAgICAgICAgICAgICAgICh0aGlzLnJpZ2h0ID49IHJlYy54ICYmIHRoaXMucmlnaHQgPD0gcmVjLnJpZ2h0KVxyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIHB1YmxpYyBpbnRlcnNlY3RzX1kocmVjOkJveCk6Ym9vbGVhbntcclxuLy8gICAgICAgICBpZiAodGhpcy55PHJlYy55KSB7XHJcbi8vICAgICAgICAgICAgIHJldHVybiByZWMuaW50ZXJzZWN0c19ZKHRoaXMpO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICByZXR1cm4gICh0aGlzLnkgPj0gcmVjLnkgJiYgdGhpcy55IDw9IHJlYy5ib3R0b20pIHx8XHJcbi8vICAgICAgICAgICAgICAgICAodGhpcy5ib3R0b20gPj0gcmVjLnkgJiYgdGhpcy5ib3R0b20gPD0gcmVjLmJvdHRvbSlcclxuLy8gICAgIH1cclxuLy8gfVxyXG4gICAgXHJcbi8vIGNsYXNzIE1hcE5vZGU8SyxWPntcclxuLy8gICAgIHB1YmxpYyBrZXk7XHJcbi8vICAgICBwdWJsaWMgdmFsdWU7XHJcbi8vICAgICBjb25zdHJ1Y3RvcihrZXk6SywgdmFsdWU6Vil7XHJcbi8vICAgICAgICAgdGhpcy5rZXkgPSBrZXk7XHJcbi8vICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4vLyAgICAgfVxyXG4vLyB9XHJcblxyXG4vLyBleHBvcnQgbW9kdWxlIFN0cnVje1xyXG4vLyAgICAgZXhwb3J0IGNsYXNzIExpbmtMaXN0PEU+e1xyXG4vLyAgICAgICAgIHByaXZhdGUgX2hlYWQ6Tm9kZTxFPjtcclxuLy8gICAgICAgICBwcml2YXRlIF90YWlsOk5vZGU8RT47XHJcbi8vICAgICAgICAgY29uc3RydWN0b3IoKXtcclxuLy8gICAgICAgICAgICAgdGhpcy5faGVhZCA9IG5ldyBOb2RlPEU+KG51bGwsIG51bGwpO1xyXG4vLyAgICAgICAgICAgICB0aGlzLl90YWlsID0gbmV3IE5vZGU8RT4obnVsbCwgbnVsbCk7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvL+WfuuehgOWxnuaAp1xyXG4vLyAgICAgICAgIHB1YmxpYyBnZXQgbGVuZ3RoKCk6bnVtYmVye1xyXG4vLyAgICAgICAgICAgICBsZXQgcmVzdWx0Om51bWJlciA9IDA7XHJcbi8vICAgICAgICAgICAgIGxldCBjdXJyZW50Ok5vZGU8RT4gPSB0aGlzLl9oZWFkO1xyXG4vLyAgICAgICAgICAgICB3aGlsZSAoY3VycmVudC5uZXh0ICE9PSBudWxsKSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXN1bHQgKz0gMTtcclxuLy8gICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIHB1YmxpYyBnZXQgaXNFbXB0eSgpOmJvb2xlYW57XHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLl9oZWFkLm5leHQgPT09IG51bGw7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvL+WinuWIoOaUueafpVxyXG4vLyAgICAgICAgIC8v5aKeXHJcbi8vICAgICAgICAgcHVibGljIHB1c2goaXRlbTpFKTp2b2lke1xyXG4vLyAgICAgICAgICAgICBsZXQgbGFzdDpOb2RlPEU+ID0gbmV3IE5vZGU8RT4oaXRlbSwgbnVsbCk7XHJcbi8vICAgICAgICAgICAgIGlmICh0aGlzLmlzRW1wdHkpIHtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuX2hlYWQubmV4dCA9IGxhc3Q7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLl90YWlsLm5leHQgPSBsYXN0O1xyXG4vLyAgICAgICAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0Lm5leHQgPSBsYXN0O1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0ID0gbGFzdDtcclxuLy8gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIHB1YmxpYyB1bnNoaWZ0KGl0ZW06RSk6dm9pZHtcclxuLy8gICAgICAgICAgICAgbGV0IGZpcnN0Ok5vZGU8RT4gPSBuZXcgTm9kZTxFPihpdGVtLCBudWxsKTtcclxuLy8gICAgICAgICAgICAgaWYgKHRoaXMuaXNFbXB0eSkge1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5fdGFpbC5uZXh0ID0gZmlyc3Q7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLl9oZWFkLm5leHQgPSBmaXJzdDtcclxuLy8gICAgICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgIGZpcnN0Lm5leHQgPSB0aGlzLl9oZWFkLm5leHQubmV4dDtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuX2hlYWQubmV4dCA9IGZpcnN0O1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBwdWJsaWMgaW5zZXJ0KGluZGV4Om51bWJlciwgaXRlbTpFKTpib29sZWFue1xyXG4vLyAgICAgICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID4gdGhpcy5sZW5ndGgpIHsvL+i/meWPpeS4jeS4gOagt1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBpZiAoaW5kZXggPT09IHRoaXMubGVuZ3RoKSB7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLnB1c2goaXRlbSk7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IGN1cnJlbnQ6Tm9kZTxFPiA9IHRoaXMuX2hlYWQ7Ly/ov5nlj6Xlkozlhbbku5bpgY3ljobmmK/kuI3kuIDmoLfnmoTvvIzlm6DkuLropoHpgInlj5bliLDpgInlrprkvY3nva7nmoTliY3pnaLkuIDmoLxcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBpbmRleDsgbiArPSAxKSB7XHJcbi8vICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBjdXJyZW50Lm5leHQgPSBuZXcgTm9kZTxFPihpdGVtLCBjdXJyZW50Lm5leHQpO1xyXG5cclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvL+WIoFxyXG4vLyAgICAgICAgIHB1YmxpYyByZW1vdmUoaW5kZXg6bnVtYmVyKTpFe1xyXG4vLyAgICAgICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMubGVuZ3RoKSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IGN1cnJlbnQ6Tm9kZTxFPiA9IHRoaXMuX2hlYWQubmV4dDtcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBpbmRleDsgbiArPSAxKSB7XHJcbi8vICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgaXRlbTpFID0gY3VycmVudC5pdGVtO1xyXG4vLyAgICAgICAgICAgICBjdXJyZW50ID0gbnVsbDtcclxuXHJcbi8vICAgICAgICAgICAgIHJldHVybiBjdXJyZW50Lml0ZW07XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBwdWJsaWMgc2hpZnQoKTpFe1xyXG4vLyAgICAgICAgICAgICBpZiAodGhpcy5pc0VtcHR5KSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLl9oZWFkLm5leHQuaXRlbTtcclxuLy8gICAgICAgICAgICAgdGhpcy5faGVhZC5uZXh0ID0gdGhpcy5faGVhZC5uZXh0Lm5leHQ7XHJcbi8vICAgICAgICAgICAgIGlmICh0aGlzLmlzRW1wdHkpIHtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuX3RhaWwubmV4dCA9IG51bGw7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvL+aUuVxyXG4vLyAgICAgICAgIHB1YmxpYyB3cml0ZShpbmRleDpudW1iZXIsIGl0ZW06RSk6dm9pZHtcclxuLy8gICAgICAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLmxlbmd0aCkge1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgY3VycmVudDpOb2RlPEU+ID0gdGhpcy5faGVhZC5uZXh0O1xyXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IGluZGV4OyBuICs9IDEpIHtcclxuLy8gICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIGN1cnJlbnQuaXRlbSA9IGl0ZW07XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvL+afpVxyXG4vLyAgICAgICAgIHB1YmxpYyByZWFkKGluZGV4Om51bWJlcik6RXtcclxuLy8gICAgICAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLmxlbmd0aCkge1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgY3VycmVudDpOb2RlPEU+ID0gdGhpcy5faGVhZC5uZXh0O1xyXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IGluZGV4OyBuICs9IDEpIHtcclxuLy8gICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIHJldHVybiBjdXJyZW50Lml0ZW07XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBwdWJsaWMgc2VhcmNoKGl0ZW06RSk6bnVtYmVyW117XHJcbi8vICAgICAgICAgICAgIGxldCByZXN1bHQ6bnVtYmVyW10gPSBbXTtcclxuLy8gICAgICAgICAgICAgdGhpcy5mb3JlYWNoKChlbGU6RSwgaW5kZXg6bnVtYmVyKT0+e1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKGVsZSA9PT0gaXRlbSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGluZGV4KTtcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfSk7XHJcbi8vICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvKipcclxuLy8gICAgICAgICAgKiDliKTmlq3pk77ooajkuK3mmK/lkKblrZjlnKjmn5DkuIDlhYPntKBcclxuLy8gICAgICAgICAgKiBAcGFyYW0gaXRlbSBcclxuLy8gICAgICAgICAgKi9cclxuLy8gICAgICAgICBwdWJsaWMgaGFzKGl0ZW06IEUpOmJvb2xlYW57XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMuX2hlYWQubmV4dDtcclxuLy8gICAgICAgICAgICAgd2hpbGUgKGN1cnJlbnQgIT0gbnVsbCkge1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQuaXRlbSA9PSBpdGVtKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvL+mrmOmYtuWHveaVsFxyXG4vLyAgICAgICAgIHB1YmxpYyBmb3JlYWNoKGY6KGVsZTpFLCBpbmRleDpudW1iZXIsIGxpc3Q6TGlua0xpc3Q8RT4pPT52b2lkKTp2b2lke1xyXG4vLyAgICAgICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMuX2hlYWQubmV4dDtcclxuLy8gICAgICAgICAgICAgbGV0IG51bTpudW1iZXIgPSAwO1xyXG4vLyAgICAgICAgICAgICB3aGlsZSAoY3VycmVudCAhPT0gbnVsbCkge1xyXG4vLyAgICAgICAgICAgICAgICAgZihjdXJyZW50Lml0ZW0sIG51bSwgdGhpcyk7XHJcbi8vICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xyXG4vLyAgICAgICAgICAgICAgICAgbnVtICs9IDE7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIC8qKlxyXG4vLyAgICAgICAgICAqIOivt+aaguaXtuS4jeimgeS9v+eUqOi/meS4quWHveaVsO+8jOWboOS4uuaIkeS5n+S4jeefpemBk+Wug+S8muS4jeS8mueIhueCuFxyXG4vLyAgICAgICAgICAqIOmZpOmdnuS9oOivu+i/h+i/meS4quWHveaVsOeahOa6kOS7o+eggVxyXG4vLyAgICAgICAgICAqIEBwYXJhbSBmIOWIpOaWreWFg+e0oOS8mOWFiOe6p+eahOWbnuiwg+WHveaVsFxyXG4vLyAgICAgICAgICAqIEBwYXJhbSBpbmNyZWFzZSDmmK/lkKbljYfluo/vvIzpu5jorqTljYfluo9cclxuLy8gICAgICAgICAgKiBAcmV0dXJucyDov5Tlm57kuIDkuKrmjpLluo/nmoTpk77ooahcclxuLy8gICAgICAgICAgKi9cclxuLy8gICAgICAgICBwdWJsaWMgc29ydGJ5KGY6KGVsZTpFKT0+bnVtYmVyLCBpbmNyZWFzZTpib29sZWFuID0gdHJ1ZSk6TGlua0xpc3Q8RT57XHJcbi8vICAgICAgICAgICAgIGxldCBwcmlvcml0eTpMaW5rTGlzdDxudW1iZXI+ID0gbmV3IExpbmtMaXN0PG51bWJlcj4oKTtcclxuLy8gICAgICAgICAgICAgbGV0IHNvcnRlZDpMaW5rTGlzdDxFPiA9IG5ldyBMaW5rTGlzdDxFPigpO1xyXG4vLyAgICAgICAgICAgICBwcmlvcml0eS5wdXNoKC0wKTtcclxuLy8gICAgICAgICAgICAgc29ydGVkLnB1c2gobnVsbCk7XHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgY29tcGFyZTooYTpudW1iZXIsYjpudW1iZXIpPT5ib29sZWFuID0gaW5jcmVhc2U/KGEsYik9PntyZXR1cm4gYSA8IGI7fTooYSxiKT0+e3JldHVybiBhID4gYn07XHJcblxyXG4vLyAgICAgICAgICAgICB0aGlzLmZvcmVhY2goKGVsZSk9PntcclxuLy8gICAgICAgICAgICAgICAgIGxldCBjdXJyZW50UHJpID0gZihlbGUpO1xyXG4vLyAgICAgICAgICAgICAgICAgbGV0IG5vZGU6Tm9kZTxFPiA9IHNvcnRlZC5faGVhZC5uZXh0O1xyXG4vLyAgICAgICAgICAgICAgICAgbGV0IHByaU5vZGU6Tm9kZTxudW1iZXI+ID0gcHJpb3JpdHkuX2hlYWQubmV4dDtcclxuXHJcbi8vICAgICAgICAgICAgICAgICBsZXQgZm91bmRQbGFjZTpib29sZWFuID0gZmFsc2U7XHJcbi8vICAgICAgICAgICAgICAgICB3aGlsZSAobm9kZS5uZXh0ICE9PSBudWxsKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGN1cnJlbnRQcmkgPCBwcmlOb2RlLm5leHQuaXRlbSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIGlmIChjb21wYXJlKGN1cnJlbnRQcmksIHByaU5vZGUubmV4dC5pdGVtKSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLm5leHQgPSBuZXcgTm9kZTxFPihlbGUsIG5vZGUubmV4dCk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHByaU5vZGUubmV4dCA9IG5ldyBOb2RlPG51bWJlcj4oY3VycmVudFByaSwgcHJpTm9kZS5uZXh0KTtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgZm91bmRQbGFjZSA9IHRydWU7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IG5vZGUubmV4dDtcclxuLy8gICAgICAgICAgICAgICAgICAgICBwcmlOb2RlID0gcHJpTm9kZS5uZXh0O1xyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgICAgIGlmICghZm91bmRQbGFjZSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHNvcnRlZC5wdXNoKGVsZSk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcHJpb3JpdHkucHVzaChjdXJyZW50UHJpKTtcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfSk7XHJcblxyXG4vLyAgICAgICAgICAgICBzb3J0ZWQuc2hpZnQoKTtcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHNvcnRlZDtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIC8vIHB1YmxpYyBiYlNvcnRCeShmOihlbGU6RSk9Pm51bWJlciwgaW5jcmVhc2U6Ym9vbGVhbiA9IHRydWUpOkxpbmtMaXN0PEU+e1xyXG5cclxuLy8gICAgICAgICAvLyB9XHJcblxyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIGV4cG9ydCBjbGFzcyBNYXA8SyxWPntcclxuLy8gICAgICAgICBwcml2YXRlIF9saXN0OkFycmF5PE1hcE5vZGU8SyxWPj5cclxuLy8gICAgICAgICBjb25zdHJ1Y3Rvcigpe1xyXG4vLyAgICAgICAgICAgICB0aGlzLl9saXN0ID0gW11cclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcHVibGljIGdldChrZXk6Syk6VntcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgZWxlIG9mIHRoaXMuX2xpc3Qpe1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKGVsZS5rZXkgPT09IGtleSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGUudmFsdWVcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gbnVsbFxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBwdWJsaWMgZ2V0S2V5QnlWYWwodmFsOlYpOkt7XHJcbi8vICAgICAgICAgICAgIGZvciAobGV0IGVsZSBvZiB0aGlzLl9saXN0KSB7XHJcbi8vICAgICAgICAgICAgICAgICBpZiAoZWxlLnZhbHVlID09PSB2YWwpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlLmtleVxyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHJldHVybiBudWxsXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHB1YmxpYyBrZXlFeGlzdChrZXk6Syk6Ym9vbGVhbntcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgZWxlIG9mIHRoaXMuX2xpc3QpIHtcclxuLy8gICAgICAgICAgICAgICAgIGlmIChlbGUua2V5ID09PSBrZXkpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBwdWJsaWMgc2V0KGtleTpLLHZhbHVlOlYpOmJvb2xlYW57XHJcbi8vICAgICAgICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgdGhpcy5fbGlzdC5sZW5ndGg7IG4gKz0gMSkge1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xpc3Rbbl0ua2V5ID09PSBrZXkpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLl9saXN0W25dLnZhbHVlID0gdmFsdWVcclxuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgdGhpcy5fbGlzdC5wdXNoKG5ldyBNYXBOb2RlPEssVj4oa2V5LHZhbHVlKSlcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHB1YmxpYyBiYXRjaFNldChrZXlzOktbXSwgdmFsdWVzOlZbXSk6Ym9vbGVhbntcclxuLy8gICAgICAgICAgICAgaWYgKGtleXMubGVuZ3RoICE9PSB2YWx1ZXMubGVuZ3RoKSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBrZXlzLmxlbmd0aDsgbiArPSAxKSB7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLnNldChrZXlzW25dLCB2YWx1ZXNbbl0pO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG5cclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcHVibGljIHJlbW92ZShrZXk6Syk6Ym9vbGVhbntcclxuLy8gICAgICAgICAgICAgbGV0IGNvdW50Om51bWJlciA9IDA7XHJcbi8vICAgICAgICAgICAgIGZvciAobGV0IGVsZSBvZiB0aGlzLl9saXN0KSB7XHJcbi8vICAgICAgICAgICAgICAgICBpZiAoZWxlLmtleSA9PT0ga2V5KSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGlzdC5zcGxpY2UoY291bnQsMSk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIGNvdW50ICs9IDE7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHB1YmxpYyBnZXQgbGVuZ3RoKCk6bnVtYmVye1xyXG4vLyAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdC5sZW5ndGhcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcHVibGljIGZvcmVhY2goZjooazpLLCB2OlYpPT52b2lkKTp2b2lke1xyXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBlbGUgb2YgdGhpcy5fbGlzdCkge1xyXG4vLyAgICAgICAgICAgICAgICAgZihlbGUua2V5LCBlbGUudmFsdWUpO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHJldHVybjtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcHVibGljIGZpbHRlcihmOihrOkssdjpWKT0+Ym9vbGVhbik6TWFwPEssVj57XHJcbi8vICAgICAgICAgICAgIGxldCByZXN1bHQgPSBuZXcgTWFwPEssVj4oKTtcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgZWxlIG9mIHRoaXMuX2xpc3QpIHtcclxuLy8gICAgICAgICAgICAgICAgIGlmIChmKGVsZS5rZXksIGVsZS52YWx1ZSkpe1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zZXQoZWxlLmtleSwgZWxlLnZhbHVlKTtcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBleHBvcnQgY2xhc3MgUG9pbnRlckxpc3Q8RT57XHJcbi8vICAgICAgICAgcHJpdmF0ZSBfbGlzdDpBcnJheTxFPiA9IFtdO1xyXG4vLyAgICAgICAgIHByaXZhdGUgX3BvaW50ZXI6bnVtYmVyID0gMDtcclxuLy8gICAgICAgICBjb25zdHJ1Y3Rvcihzb3VyY2U6QXJyYXk8RT4gPSBbXSwgaW5pdFBvaW50Om51bWJlciA9IDApe1xyXG4vLyAgICAgICAgICAgICBzb3VyY2UuZm9yRWFjaCgoZWxlKT0+e1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5fbGlzdC5wdXNoKGVsZSk7XHJcbi8vICAgICAgICAgICAgIH0pXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBnZXQgZXhjZWVkaW5nKCk6Ym9vbGVhbntcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BvaW50ZXIgPj0gdGhpcy5fbGlzdC5sZW5ndGggfHwgdGhpcy5fcG9pbnRlciA8IDBcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIC8qXHJcbi8vICAgICAgICAg5Lul5LiL5rOo6YeK5Lit77yM5oqK5pWw57uE55yL5L2c5qiq5ZCR5o6S5YiX55qE5LiA57O75YiX5YWD57SgXHJcbi8vICAgICAgICAgaW5kZXggPSAw55qE5YWD57Sg5Zyo5pyA5bem5L6nXHJcbi8vICAgICAgICAgKi9cclxuXHJcbi8vICAgICAgICAgcmVhZCgpOkV7Ly/mn6XnnIvlvZPliY1wb2ludGVy5omA5oyH55qE5YWD57SgXHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLl9saXN0W3RoaXMuX3BvaW50ZXJdXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBzdGVwKCk6RXsvL3BvaW50ZXLlkJHlj7Pnp7vkuIDmraVcclxuLy8gICAgICAgICAgICAgdGhpcy5fcG9pbnRlcis9MTtcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVhZCgpO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgdG8ocGxhY2U6bnVtYmVyKTpQb2ludGVyTGlzdDxFPnsvL3BvaW50ZXLnp7vliLDmjIflrprkvY3nva5cclxuLy8gICAgICAgICAgICAgdGhpcy5fcG9pbnRlciA9IHBsYWNlXHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBwdXNoKGRhdGE6RSk6UG9pbnRlckxpc3Q8RT57Ly/lnKjmlbDnu4TmnKvlsL7lop7liqDkuIDkuKrlhYPntKBcclxuLy8gICAgICAgICAgICAgdGhpcy5fbGlzdC5wdXNoKGRhdGEpXHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBzZXQoaW5kZXg6bnVtYmVyLGRhdGE6RSk6UG9pbnRlckxpc3Q8RT57Ly/opoblhpnmlbDnu4TnibnlrpppbmRleOS4reeahOWFg+e0oFxyXG4vLyAgICAgICAgICAgICB0aGlzLl9saXN0W2luZGV4XSA9IGRhdGFcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXNcclxuLy8gICAgICAgICB9XHJcbiAgICAgICAgXHJcbi8vICAgICAgICAgbmV4dChzaGlmdDpudW1iZXIgPSAxKTpFe1xyXG4vLyAgICAgICAgICAgICAvL+ivu+WPluS9jeS6juW9k+WJjXBvaW50ZXLmiYDmjIfnmoTlhYPntKDlj7Povrnoi6XlubLmoLznmoTlhYPntKBcclxuLy8gICAgICAgICAgICAgLy9zaGlmdOm7mOiupOS4ujHvvIzljbPlvZPliY1wb2ludGVy5Y+z6L6555u46YK755qE5YWD57SgXHJcbi8vICAgICAgICAgICAgIC8vc2hpZnTkuLrotJ/mlbDml7bojrflj5blt6bkvqfnmoTlhYPntKBcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RbdGhpcy5fcG9pbnRlcitzaGlmdF1cclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIGdldCBsZW5ndGgoKTpudW1iZXJ7Ly/ojrflj5bmlbDnu4Tplb/luqZcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3QubGVuZ3RoXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBnZXQgbGFzdCgpOkV7Ly/ojrflj5bmnIDlkI7kuIDpoblcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RbdGhpcy5fbGlzdC5sZW5ndGgtMV1cclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIGdldCBmaXJzdCgpOkV7Ly/ojrflj5bpppbpoblcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RbMF07XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBnZXQgcG9pbnRlcigpOm51bWJlcnsvL+iOt+WPlnBvaW50ZXJcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BvaW50ZXJcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIGdldCBhdEVuZCgpOmJvb2xlYW57Ly/mn6XnnIvigJxwb2ludGVy5oyH5ZCR5pWw57uE5pyA5Y+z5L6n55qE5YWD57Sg4oCd55qE55yf5YC8XHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wb2ludGVyID09PSB0aGlzLl9saXN0Lmxlbmd0aCAtIDFcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcbi8vIH0iLCIvL1RPRE9cclxuLy/mlL7nva7miJHku6zpobnnm67ph4zoh6rlrprkuYnnmoTpgJrnlKhLRVnlgLzooahcclxuLy/mlL7lnKjlkIzkuIDkuKrmlofku7bph4zmnInliqnkuo7nu5PmnoTmuIXmmbBcclxuLy/lj6bvvJrlpoLmnpzlj6rmnInmn5DnibnlrprmqKHlnZfns7vnu5/ph4zkvb/nlKjnmoRlbnVt5Y+v5Lul5LiN5pS+6L+H5p2lIOebtOaOpeWGmeWcqOaooeWdl+aWh+S7tuS4rVxyXG5cclxuLy/lj4jlj6bvvJog5bu66K6u5Zyo5L2/55SoZW51beeahOaXtuWAmeWKoOS4gOS4quepuuWAvE5vbmXku6XlupTlr7nliKTlrprpl67pophcclxuXHJcbmV4cG9ydCBlbnVtIEFjdG9yVHlwZSB7XHJcbiAgICBOb25lLFxyXG4gICAgT3BlcmF0b3IsXHJcbiAgICBNb25zdGVyLFxyXG4gICAgVG9rZW5cclxuICAgIC8v6L+Z5YW25a6e5piv5a+55bqU55qE5LiN5ZCM55qE5pWw5o2u5qih5p2/XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIENhbXBUeXBlIHtcclxuICAgIE5vbmUsXHJcbiAgICBTZWxmLCAgIC8v5oiR5pa5XHJcbiAgICBFbmVteSAgIC8v5pWM5pa5XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9kTG9nIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogRG9kTG9nO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSW5zdGFuY2UoKTogRG9kTG9nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2UgfHwgKHRoaXMuX2luc3RhbmNlID0gbmV3IHRoaXMoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBkZWJ1Zyhtc2c6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIG1zZyA9IGAke21zZ31gO1xyXG4gICAgICAgIGNvbnNvbGUuZGVidWcobXNnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGluZm8obXNnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBtc2cgPSBgJHttc2d9YDtcclxuICAgICAgICBjb25zb2xlLmluZm8obXNnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHdhcm4obXNnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBtc2cgPSBgJHttc2d9YDtcclxuICAgICAgICBjb25zb2xlLndhcm4obXNnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGVycm9yKG1zZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgbXNnID0gYCR7bXNnfWA7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihtc2cpO1xyXG4gICAgICAgIERvZExvZy5JbnN0YW5jZS5fd3JpdGVUb0ZpbGUobXNnKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF93cml0ZVRvRmlsZShsb2c6IHN0cmluZykge1xyXG4gICAgICAgIC8vVE9ET1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGludGVyZmFjZSBDb21wYXJhYmxle1xyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3kuKTkuKrlhYPntKDmmK/lkKbnm7jnrYlcclxuICAgICAqIOW/hemhu+WPr+mAhlxyXG4gICAgICogQHBhcmFtIGVsZSBcclxuICAgICAqL1xyXG4gICAgZXF1YWxzKGVsZTpDb21wYXJhYmxlKTpib29sZWFuXHJcbn1cclxuICAgIFxyXG5leHBvcnQgY2xhc3MgRG9kTWF0aHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnmEvYueahOaVtOaVsOe7k+aenO+8iOWwj+aVsOmDqOWIhuiIjeWOuylcclxuICAgICAqIGHvvIxi5aaC5p6c5LiN5Zyo5q2j5pW05pWw5Z+f77yM6K+356Gu5L+d6ZiF6K+76L+H5q2k5Ye95pWwXHJcbiAgICAgKiB84oCU4oCU4oCU4oCUfOKAlOKAlOKAlOKAlHzigJTigJTigJTigJR84oCU4oCU4oCU4oCUfOKAlOKAlOKAlOKAlHxcclxuICAgICAqICAgICAtMTwtLS0wPC0tLTE8LS0tXHJcbiAgICAgKiAgICAgIOWPr+S7peeQhuino+S4uuWcqOaVsOi9tOS4iuaKiue7k+aenOWQkeW3puaYoOWwhFxyXG4gICAgICogQHBhcmFtIGEgXHJcbiAgICAgKiBAcGFyYW0gYiBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBpbnREaXZpc2lvbihhOm51bWJlciwgYjpudW1iZXIpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gKGEtYSViKS9iO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Zyo5bmz6Z2i5LiK5rGC5LuO5oyH5a6a5Ye65Y+R54K55Yiw5oyH5a6a57uI54K55L2c5LiA5p2h5oyH5a6a6ZW/5bqm55qE57q/5q6177yM5q2k57q/5q6155qE5Y+m5LiA56uv54K555qE5Z2Q5qCHXHJcbiAgICAgKiDvvIjlpoLmnpzmraTnur/mrrXnmoTplb/luqblpKfkuo7nrYnkuo7lh7rlj5HngrnliLDnu4jngrnnmoTot53nprvvvIzliJnovpPlh7rnu4jngrnnmoTlnZDmoIfvvIlcclxuICAgICAqIEBwYXJhbSBmcm9tIFxyXG4gICAgICogQHBhcmFtIGVuZCBcclxuICAgICAqIEBwYXJhbSBtb3ZlbWVudCBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBtb3ZlVG8oZnJvbTpWZWMyLCBlbmQ6VmVjMiwgbW92ZW1lbnQ6bnVtYmVyKTpWZWMye1xyXG4gICAgICAgIGNvbnN0IHhkaXMgPSBlbmQueCAtIGZyb20ueDtcclxuICAgICAgICBjb25zdCB5ZGlzID0gZW5kLnkgLSBmcm9tLnk7XHJcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoKHhkaXMpKioyICsgKHlkaXMpKioyKTtcclxuICAgICAgICBpZiAobW92ZW1lbnQgPj0gZGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVuZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcmF0aW8gPSBtb3ZlbWVudCAvIGRpc3RhbmNlO1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjMihmcm9tLnggKyB4ZGlzKnJhdGlvLGZyb20ueSArIHlkaXMqcmF0aW8pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTXlNYXRoLm1vdmVUb+WHveaVsOeahOWPpuS4gOS4queJiOacrOOAgui/meS4queJiOacrOS8muebtOaOpeS/ruaUuShmcm9tOlZlYzIp5Lyg5YWl55qE5a+56LGh5pys6Lqr77yM5bm25Yik5pat5pyA57uIZnJvbeS4jmVuZOS4pOS4quWvueixoeaYr+WQpumHjeWQiFxyXG4gICAgICogQHBhcmFtIGZyb20gXHJcbiAgICAgKiBAcGFyYW0gZW5kIFxyXG4gICAgICogQHBhcmFtIG1vdmVtZW50IFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG1vdmVUb1NpZGVFZmZlY3QoZnJvbTpWZWMyLCBlbmQ6VmVjMiwgbW92ZW1lbnQ6bnVtYmVyKTpib29sZWFue1xyXG4gICAgICAgIGNvbnN0IHhkaXMgPSBlbmQueCAtIGZyb20ueDtcclxuICAgICAgICBjb25zdCB5ZGlzID0gZW5kLnkgLSBmcm9tLnk7XHJcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoKHhkaXMpKioyICsgKHlkaXMpKioyKTtcclxuICAgICAgICBpZiAobW92ZW1lbnQgPj0gZGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgZnJvbS54ID0gZW5kLng7XHJcbiAgICAgICAgICAgIGZyb20ueSA9IGVuZC55O1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcmF0aW8gPSBtb3ZlbWVudCAvIGRpc3RhbmNlO1xyXG4gICAgICAgIGZyb20ueCA9IGZyb20ueCArIHhkaXMqcmF0aW87XHJcbiAgICAgICAgZnJvbS55ID0gZnJvbS55ICsgeWRpcypyYXRpbztcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNeU1hdGgubW92ZVRv5Ye95pWw55qE5Y+m5LiA5Liq54mI5pys44CC6L+U5Zue55u057q/6YCf5bqm5ZyoeHnkuKTovbTkuIrnmoTliIbph49cclxuICAgICAqIEBwYXJhbSBmcm9tIFxyXG4gICAgICogQHBhcmFtIGVuZCBcclxuICAgICAqIEBwYXJhbSBtb3ZlbWVudCBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBtb3ZlVG9Db21wb25lbnQoZnJvbTpWZWMyLCBlbmQ6VmVjMiwgbW92ZW1lbnQ6bnVtYmVyKTpWZWMye1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IHhkaXMgPSBlbmQueCAtIGZyb20ueDtcclxuICAgICAgICBjb25zdCB5ZGlzID0gZW5kLnkgLSBmcm9tLnk7XHJcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoKHhkaXMpKioyICsgKHlkaXMpKioyKTtcclxuICAgICAgICBjb25zdCByYXRpbyA9IG1vdmVtZW50IC8gZGlzdGFuY2U7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMyKHhkaXMqcmF0aW8sIHlkaXMqcmF0aW8pO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBWZWMyIGltcGxlbWVudHMgQ29tcGFyYWJsZXtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGxpc3RGcm9tTGlzdChsaXN0Om51bWJlcltdW10pOlZlYzJbXXtcclxuICAgICAgICBsZXQgcmVzdWx0OlZlYzJbXSA9IFtdO1xyXG5cclxuICAgICAgICBsaXN0LmZvckVhY2goZWxlPT57XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBWZWMyKGVsZVswXSxlbGVbMV0pKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgeDpudW1iZXI7XHJcbiAgICBwdWJsaWMgeTpudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57ku47mraTngrnliLDmjIflrprngrnnmoTot53nprtcclxuICAgICAqIEBwYXJhbSBlbmQgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXN0YW5jZVRvKGVuZDpWZWMyKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuICgoZW5kLnggLSB0aGlzLngpKioyICsgKGVuZC55IC0gdGhpcy55KSoqMikqKjAuNTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaxguWSjOS4pOS4qlZlY++8jOi/lOWbnue7k+aenO+8jOS4jeS/ruaUueWOn+WunuS+i1xyXG4gICAgICogQHBhcmFtIHZlYyBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHBsdXModmVjOlZlYzIpOlZlYzJ7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMyKHRoaXMueCArIHZlYy54LCB0aGlzLnkgKyB2ZWMueSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDku6XovpPlhaXlnZDmoIfkuLrkuK3lv4Pov5vooYzpobrml7bpkog5MOW6puaXi+i9rFxyXG4gICAgICog77yI5pyq5a6M5oiQ77yJXHJcbiAgICAgKiBAcGFyYW0gY2VudHJlIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcm90YXRlQ2xvY2t3aXNlKGNlbnRyZTpWZWMyKTpWZWMye1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue5q2k5ZCR6YeP55qE5aSN5Yi2XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbG9uZSgpOlZlYzJ7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMyKHRoaXMueCwgdGhpcy55KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXF1YWxzKGVsZTpWZWMyKTpib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLnggPT09IGVsZS54ICYmIHRoaXMueSA9PT0gZWxlLnk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoeD86bnVtYmVyLCB5PzpudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlsIbov5nkuKrlnZDmoIflkLjpmYTliLBzY2FsZeS4uuWNleS9jemVv+W6pueahOW5s+mdouepuumXtOWGheacgOi/keeahOW3puS4iuinkuS4gOeCuVxyXG4gICAgICog5L6L5aaC77yaKDMxMCwyNzgp5Zyo5LulMTAw5Li65Y2V5L2N6ZW/5bqm5ZC46ZmE5ZCO5Lya5Y+Y5Li6KDMsMilcclxuICAgICAqIEBwYXJhbSBzY2FsZSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkc29ycChzY2FsZTpudW1iZXIpOlZlYzJ7XHJcblxyXG4gICAgICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKHRoaXMueC9zY2FsZSk7XHJcbiAgICAgICAgY29uc3QgeSA9IE1hdGguZmxvb3IodGhpcy55L3NjYWxlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMyKHgseSlcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiIsIi8vYXV0aG9yIE5hMkN1QzRPOFxyXG5cclxuXHJcbmltcG9ydCBDdXN0b21pemVkU3ByaXRlIGZyb20gXCIuL2N1c3RvbWl6ZWRTcHJcIjtcclxuaW1wb3J0IHsgVmVjMiB9IGZyb20gXCIuLi8uLi9Eb2RNYXRoXCI7XHJcbmltcG9ydCB7IEV2ZW50Q2VudHJlIH0gZnJvbSBcIi4uLy4uLy4uL0V2ZW50L0V2ZW50Q2VudHJlXCI7XHJcbmltcG9ydCB7IE15U3ltYm9sIH0gZnJvbSBcIi4uLy4uLy4uL0ZpeC9GaXhTeW1ib2xcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCYXJ7XHJcblxyXG4gICAgcHJpdmF0ZSBfaW5pdFBvczpWZWMyOy8v6LW35aeL5Z2Q5qCHXHJcbiAgICBwcml2YXRlIF9pbml0U2l6ZTpWZWMyOy8v6LW35aeL5aSn5bCPXHJcbiAgICBwcml2YXRlIF9wb3M6VmVjMjsvL+e8qeaUvuWQjuWdkOagh1xyXG4gICAgcHJpdmF0ZSBfc2l6ZTpWZWMyOy8v57yp5pS+5ZCO5aSn5bCPXHJcbiAgICBwcml2YXRlIF9zY2FsZTpudW1iZXIgPSAxOy8v5YWo5bGA57yp5pS+5q+UXHJcbiAgICBwcml2YXRlIF9zeW1iTnVtOm51bWJlcjsvL+i/m+W6puadoee8luWPt1xyXG4gICAgcHJpdmF0ZSBfYmFja1NwcjpDdXN0b21pemVkU3ByaXRlOy8v6L+b5bqm5p2h5bqV5bGC57uY5Zu+6IqC54K5XHJcbiAgICBwcml2YXRlIF9mcm9udFNwcjpDdXN0b21pemVkU3ByaXRlOy8v6L+b5bqm5p2h6aG25bGC57uY5Zu+6IqC54K5XHJcbiAgICBwcml2YXRlIF9wZXJjZW50YWdlOm51bWJlciA9IDE7Ly/ov5vluqZcclxuICAgIHByaXZhdGUgX2hlaWdodDpudW1iZXI7Ly/ov5vluqbmnaHpq5jluqZcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5vluqbmnaHmnoTpgKDlmahcclxuICAgICAqIEBwYXJhbSBzeW1iTnVtIOi/m+W6puadoee8luWPt1xyXG4gICAgICogQHBhcmFtIGJhY2tHcm91bmRDb2xvciDog4zmma/popzoibJcclxuICAgICAqIEBwYXJhbSBzaXplIOWkp+Wwj1xyXG4gICAgICogQHBhcmFtIHBvcyDlnZDmoIdcclxuICAgICAqIEBwYXJhbSBzY2FsZSDlhajlsYDnvKnmlL7mr5RcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioc3ltYk51bTpudW1iZXIsIGJhY2tHcm91bmRDb2xvcjpzdHJpbmcsc2l6ZTpWZWMyICxwb3M6VmVjMiwgc2NhbGU6bnVtYmVyID0gMSl7XHJcbiAgICAgICAgdGhpcy5fc3ltYk51bSA9IHN5bWJOdW07XHJcbiAgICAgICAgdGhpcy5faW5pdFNpemUgPSBzaXplO1xyXG4gICAgICAgIHRoaXMuX3NjYWxlID0gc2NhbGU7XHJcbiAgICAgICAgdGhpcy5fc2l6ZSA9IG5ldyBWZWMyKHRoaXMuX2luaXRTaXplLngqdGhpcy5fcGVyY2VudGFnZSp0aGlzLl9zY2FsZSx0aGlzLl9pbml0U2l6ZS55KnRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9pbml0UG9zID0gcG9zO1xyXG4gICAgICAgIHRoaXMuX3BvcyA9IG5ldyBWZWMyKHRoaXMuX2luaXRQb3MueCp0aGlzLl9zY2FsZSx0aGlzLl9pbml0UG9zLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX2JhY2tTcHIgPSBuZXcgQ3VzdG9taXplZFNwcml0ZSgpO1xyXG4gICAgICAgIHRoaXMuX2JhY2tTcHIuc2V0UGFyYW0odGhpcy5fcG9zLngsdGhpcy5fcG9zLnksdGhpcy5fc2l6ZS54LHRoaXMuX3NpemUueSxiYWNrR3JvdW5kQ29sb3IpO1xyXG4gICAgICAgIHRoaXMuX2JhY2tTcHIuY2hhbmdlQ29sb3IoKTtcclxuICAgICAgICB0aGlzLl9mcm9udFNwciA9IG5ldyBDdXN0b21pemVkU3ByaXRlKCk7XHJcbiAgICAgICAgdGhpcy5fYmFja1Nwci5hZGRDaGlsZCh0aGlzLl9mcm9udFNwcik7XHJcbiAgICAgICAgdGhpcy5fZnJvbnRTcHIuc2V0UGFyYW0oMCwwLHRoaXMuX3NpemUueCx0aGlzLl9zaXplLnksXCIjOGI4YjgzXCIsbmV3IFZlYzIodGhpcy5fc2NhbGUsdGhpcy5fc2NhbGUpKTtcclxuICAgICAgICB0aGlzLl9mcm9udFNwci5jaGFuZ2VDb2xvcigpO1xyXG4gICAgICAgIHRoaXMuX2hlaWdodCA9IHRoaXMuX2luaXRTaXplLnk7XHJcbiAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2Uub24oRXZlbnRDZW50cmUuRVR5cGUuUEVSRk9STUFOQ0VfUkVTQ0FMRSgpLHRoaXMsdGhpcy5yZVNjYWxlKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkv67mlLnnvKnmlL7mr5RcclxuICAgICAqIEBwYXJhbSB2YWx1ZSDlhajlsYDnvKnmlL7mr5RcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZVNjYWxlKHZhbHVlOm51bWJlcik6dm9pZHtcclxuICAgICAgICB0aGlzLl9zY2FsZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuX3BvcyA9IG5ldyBWZWMyKHRoaXMuX2luaXRQb3MueCp0aGlzLl9zY2FsZSwgdGhpcy5faW5pdFBvcy55KnRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9zaXplID0gbmV3IFZlYzIodGhpcy5faW5pdFNpemUueCp0aGlzLl9zY2FsZSwgdGhpcy5faW5pdFNpemUueSp0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fYmFja1Nwci5zZXRQYXJhbSh0aGlzLl9wb3MueCx0aGlzLl9wb3MueSx0aGlzLl9zaXplLngsdGhpcy5fc2l6ZS55KTsvL+iuvue9ruiDjOaZr+e7mOWbvuiKgueCueWPguaVsFxyXG4gICAgICAgIHRoaXMuX2JhY2tTcHIuY2hhbmdlQ29sb3IoKTtcclxuICAgICAgICB0aGlzLl9mcm9udFNwci5zZXRQYXJhbSgwLDAsdGhpcy5fc2l6ZS54KnRoaXMuX3BlcmNlbnRhZ2UsdGhpcy5fc2l6ZS55LFwiIzhiOGI4M1wiLG5ldyBWZWMyKDEqdGhpcy5fc2NhbGUsMSp0aGlzLl9zY2FsZSkpOy8v6K6+572u5YmN56uv57uY5Zu+6IqC54K55Y+C5pWwXHJcbiAgICAgICAgdGhpcy5fZnJvbnRTcHIuY2hhbmdlQ29sb3IoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9rui/m+W6puadoeS7o+WPt1xyXG4gICAgICogQHBhcmFtIHN5bWJOdW0g6L+b5bqm5p2h5Luj5Y+3XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRTeW1iKHN5bWJOdW06bnVtYmVyKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3N5bWJOdW0gPSBzeW1iTnVtO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5L+u5pS56L+b5bqmXHJcbiAgICAgKiBAcGFyYW0gcGVyY2VudGFnZSDnm67moIfov5vluqZcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBwZXJjZW50YWdlKHBlcmNlbnRhZ2U6bnVtYmVyKXtcclxuICAgICAgICBpZihwZXJjZW50YWdlID09PSAwKXtcclxuICAgICAgICAgICAgdGhpcy5fcGVyY2VudGFnZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX2Zyb250U3ByLmdyYXBoaWNzLmNsZWFyKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuX3BlcmNlbnRhZ2UgPSBwZXJjZW50YWdlO1xyXG4gICAgICAgICAgICB0aGlzLl9mcm9udFNwci5zZXRQYXJhbSgwLDAsdGhpcy5fc2l6ZS54KnRoaXMuX3BlcmNlbnRhZ2UsdGhpcy5fc2l6ZS55LFwiIzhiOGI4M1wiLG5ldyBWZWMyKDEqdGhpcy5fc2NhbGUsMSp0aGlzLl9zY2FsZSkpO1xyXG4gICAgICAgICAgICB0aGlzLl9mcm9udFNwci5jaGFuZ2VDb2xvcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuacrOi/m+W6puadoeiDjOaZr+e7mOWbvuiKgueCuVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0QmFja1NwcigpOkN1c3RvbWl6ZWRTcHJpdGV7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JhY2tTcHI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57mnKzov5vluqbmnaHpq5jluqZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEhlaWdodCgpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5faGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQnV0dG9ue1xyXG5cclxuICAgIHByaXZhdGUgX2luaXRQb3M6VmVjMjsvL+aMiemSruWIneWni+WdkOagh1xyXG4gICAgcHJpdmF0ZSBfaW5pdFNpemU6VmVjMjsvL+aMiemSruWIneWni+WuvemrmFxyXG4gICAgcHJpdmF0ZSBfcG9zOlZlYzI7Ly/mmL7npLroioLngrnlnZDmoIdcclxuICAgIHByaXZhdGUgX3NpemU6VmVjMjsvL+aYvuekuuiKgueCueWuvemrmFxyXG4gICAgcHJpdmF0ZSBfc3ltYk5hbWU6bnVtYmVyOy8v5oyJ6ZKu57yW5Y+3XHJcbiAgICBwcml2YXRlIF9jb2xvcjpzdHJpbmc7Ly/mjInpkq7popzoibJcclxuICAgIHByaXZhdGUgX2hlaWdodDpudW1iZXI7Ly/mjInpkq7pq5jluqbvvIjpu5jorqTnvKnmlL7mr5TkuLox77yJXHJcbiAgICBwcml2YXRlIF9zcHI6Q3VzdG9taXplZFNwcml0ZTsvL+aMiemSruaYvuekuuiKgueCuVxyXG4gICAgcHJpdmF0ZSBfc2NhbGU6bnVtYmVyOy8v5YWo5bGA57yp5pS+5q+UXHJcbiAgICBwcml2YXRlIF9uYW1lOnN0cmluZzsvL+aMiemSruWQje+8iOaYvuekuuWcqOaMiemSruS4iu+8iVxyXG4gICAgcHJpdmF0ZSBfZnVuOkZ1bmN0aW9uOy8v5oyJ6ZKu5omA5pC65bim55qE5Yqf6IO95Ye95pWwXHJcbiAgICBwcml2YXRlIF9BUlVzeW1iOk15U3ltYm9sOy8v5oyJ6ZKu5omA5ZyoQWN0b3JSVVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5oyJ6ZKu5p6E6YCg5ZmoXHJcbiAgICAgKiBAcGFyYW0gbmFtZSDmjInpkq7lkI1cclxuICAgICAqIEBwYXJhbSBzeW1iTnVtIOaMiemSrue8luWPt1xyXG4gICAgICogQHBhcmFtIHBvcyDotbflp4vlnZDmoIdcclxuICAgICAqIEBwYXJhbSBzaXplIOi1t+Wni+WuvemrmFxyXG4gICAgICogQHBhcmFtIGNvbG9yIOaMiemSruminOiJslxyXG4gICAgICogQHBhcmFtIHNjYWxlIOe8qeaUvuavlFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihBUlVzeW1iOk15U3ltYm9sLCBuYW1lOnN0cmluZyA9IFwiZGVmYXVsdFwiLCBzeW1iTnVtOm51bWJlciwgcG9zOlZlYzIsIHNpemU6VmVjMiwgIGNvbG9yOnN0cmluZyA9IFwiIzAwQjJCRlwiLCBzY2FsZTpudW1iZXIgPSAxKXtcclxuICAgICAgICB0aGlzLl9BUlVzeW1iID0gQVJVc3ltYjtcclxuICAgICAgICB0aGlzLl9zeW1iTmFtZSA9IHN5bWJOdW07XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5faW5pdFBvcyA9IHBvcztcclxuICAgICAgICB0aGlzLl9pbml0U2l6ZSA9IHNpemU7XHJcbiAgICAgICAgdGhpcy5fY29sb3IgPSBjb2xvcjtcclxuICAgICAgICB0aGlzLl9zY2FsZSA9IHNjYWxlO1xyXG4gICAgICAgIHRoaXMuX3BvcyA9IG5ldyBWZWMyKHRoaXMuX2luaXRQb3MueCp0aGlzLl9zY2FsZSx0aGlzLl9pbml0UG9zLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX3NpemUgPSBuZXcgVmVjMih0aGlzLl9pbml0U2l6ZS54KnRoaXMuX3NjYWxlLHRoaXMuX2luaXRTaXplLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX2hlaWdodCA9IHRoaXMuX2luaXRTaXplLnk7XHJcbiAgICAgICAgdGhpcy5fc3ByID0gbmV3IEN1c3RvbWl6ZWRTcHJpdGUoKTtcclxuICAgICAgICB0aGlzLl9zcHIuc2V0UGFyYW0odGhpcy5fcG9zLngsdGhpcy5fcG9zLnksdGhpcy5fc2l6ZS54LHRoaXMuX3NpemUueSx0aGlzLl9jb2xvcik7XHJcbiAgICAgICAgdGhpcy5fc3ByLmNoYW5nZUNvbG9yKCk7XHJcbiAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2Uub24oRXZlbnRDZW50cmUuRVR5cGUuUEVSRk9STUFOQ0VfUkVTQ0FMRSgpLHRoaXMsdGhpcy5yZVNjYWxlKTtcclxuICAgICAgICB0aGlzLnNldFRleHQoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7mjInpkq7lip/og71cclxuICAgICAqIEBwYXJhbSBmdW4g5oyJ6ZKu5Yqf6IO95Ye95pWwXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRGdW5jKGZ1bjpGdW5jdGlvbik6dm9pZHtcclxuICAgICAgICB0aGlzLl9mdW4gPSBmdW47XHJcbiAgICAgICAgdGhpcy5fc3ByLm9uKExheWEuRXZlbnQuTU9VU0VfVVAsdGhpcyx0aGlzLl9mdW4pO1xyXG4gICAgICAgIHRoaXMuX3Nwci5vbihMYXlhLkV2ZW50Lk1PVVNFX09WRVIsdGhpcywoZTogTGF5YS5FdmVudCk9PntcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX3Nwci5vbihMYXlhLkV2ZW50Lk1PVVNFX1VQLHRoaXMsKGU6IExheWEuRXZlbnQpPT57XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57mjInpkq7nu5jlm77oioLngrlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFNwcigpOkN1c3RvbWl6ZWRTcHJpdGV7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NwcjtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57yp5pS+5oyJ6ZKuXHJcbiAgICAgKiBAcGFyYW0gdmFsdWUg5YWo5bGA57yp5pS+5q+UXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZVNjYWxlKHZhbHVlOm51bWJlcik6dm9pZHtcclxuICAgICAgICB0aGlzLl9zY2FsZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuX3BvcyA9IG5ldyBWZWMyKHRoaXMuX2luaXRQb3MueCp0aGlzLl9zY2FsZSx0aGlzLl9pbml0UG9zLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX3NpemUgPSBuZXcgVmVjMih0aGlzLl9pbml0U2l6ZS54KnRoaXMuX3NjYWxlLHRoaXMuX2luaXRTaXplLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX3Nwci5zZXRQYXJhbSh0aGlzLl9wb3MueCx0aGlzLl9wb3MueSx0aGlzLl9zaXplLngsdGhpcy5fc2l6ZS55LHRoaXMuX2NvbG9yKTtcclxuICAgICAgICB0aGlzLl9zcHIuY2hhbmdlQ29sb3IoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa4suafk+aWh+acrFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0VGV4dCgpOnZvaWR7XHJcbiAgICAgICAgbGV0IHRtcFRleDpMYXlhLlRleHQgPSBuZXcgTGF5YS5UZXh0KCk7XHJcbiAgICAgICAgdG1wVGV4LndpZHRoID0gdGhpcy5fc2l6ZS54O1xyXG4gICAgICAgIHRtcFRleC5oZWlnaHQgPSB0aGlzLl9zaXplLnk7XHJcbiAgICAgICAgdG1wVGV4LnggPSAwO1xyXG4gICAgICAgIHRtcFRleC55ID0gMDtcclxuICAgICAgICB0bXBUZXguZm9udFNpemUgPSA5O1xyXG4gICAgICAgIHRtcFRleC50ZXh0ID0gdGhpcy5fbmFtZTtcclxuICAgICAgICB0bXBUZXguYWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgIHRtcFRleC52YWxpZ24gPSBcIm1pZGRsZVwiO1xyXG4gICAgICAgIHRoaXMuX3Nwci5hZGRDaGlsZCh0bXBUZXgpO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dCBleHRlbmRzIExheWEuVGV4dHtcclxuICAgIHByaXZhdGUgX3N3aXRjaDpib29sZWFuID0gdHJ1ZTsvL+aWh+acrOaYvuekuuW8gOWFsyDpu5jorqTlhbPpl61cclxuICAgIHByaXZhdGUgX3NjYWxlOm51bWJlcjsvL+WFqOWxgOe8qeaUvuavlFxyXG4gICAgcHJpdmF0ZSBfc2l6ZTpWZWMyOy8v6LW35aeL5aSn5bCPXHJcbiAgICBwcml2YXRlIF9wb3M6VmVjMiA9IG5ldyBWZWMyKDAsMCk7Ly/otbflp4vlnZDmoIdcclxuICAgIHByaXZhdGUgX215U3RyaW5nOnN0cmluZzsvL+aWh+acrOWGheWuuVxyXG4gICAgcHJpdmF0ZSBfQVJVc3ltYjpNeVN5bWJvbDsvL+aJgOWcqOWPr+inhuiKgueCuVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5paH5pys5p6E6YCg5ZmoXHJcbiAgICAgKiBAcGFyYW0gc2l6ZSDotbflp4vlpKflsI9cclxuICAgICAqIEBwYXJhbSBzY2FsZSDnvKnmlL7mr5RcclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihzaXplOlZlYzIsIHNjYWxlOm51bWJlcil7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9zaXplID0gc2l6ZTtcclxuICAgICAgICB0aGlzLl9zY2FsZSA9IHNjYWxlO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB0aGlzLl9zaXplLngqdGhpcy5fc2NhbGU7Ly/orqHnrpflj6/op4boioLngrnlrr3luqZcclxuICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuX3NpemUueSp0aGlzLl9zY2FsZTsvL+iuoeeul+WPr+inhuiKgueCuemrmOW6plxyXG4gICAgICAgIHRoaXMuZm9udFNpemUgPSAxMCp0aGlzLl9zY2FsZTsvL+iuoeeul+Wtl+S9k+Wkp+Wwj1xyXG4gICAgICAgIHRoaXMuYWxpZ24gPSBcImNlbnRlclwiOy8v6buY6K6k56uW55u05bGF5LitXHJcbiAgICAgICAgdGhpcy52YWxpZ24gPSBcIm1pZGRsZVwiOy8v6buY6K6k5rC05bmz5bGF5LitXHJcbiAgICAgICAgdGhpcy53b3JkV3JhcCA9IHRydWU7Ly/pu5jorqToh6rliqjmjaLooYzlvIDlkK9cclxuICAgICAgICB0aGlzLmNvbG9yID0gXCIjMDAwMDAwXCI7Ly9cclxuICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5vbihFdmVudENlbnRyZS5FVHlwZS5QRVJGT1JNQU5DRV9SRVNDQUxFKCksdGhpcyx0aGlzLnJlU2NhbGUpOy8v55uR5ZCs5YWo5bGA57yp5pS+5q+UXHJcbiAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2Uub24oRXZlbnRDZW50cmUuRVR5cGUuUEVSRk9STUFOQ0VfVEVYVF9TV0lUQ0goKSx0aGlzLHRoaXMuc3dpdGNoKTsvL+ebkeWQrOWFqOWxgOaWh+acrOaYvuekuuW8gOWFs1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruaJgOWcqOaYvuekuuiKgueCuXN5bWJcclxuICAgICAqIEBwYXJhbSBzeW1iIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U3ltYihzeW1iOk15U3ltYm9sKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX0FSVXN5bWIgPSBzeW1iO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5byA5YWz5paH5pys5pi+56S65byA5YWzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzd2l0Y2goKTp2b2lke1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuX3N3aXRjaCA9PT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLl9zd2l0Y2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VUZXh0KFwiXCIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fc3dpdGNoID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkv67mlLnmlofmnKzmmL7npLrlvIDlhbNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFN3aXRjaE9uKCk6dm9pZHtcclxuICAgICAgICBpZih0aGlzLl9zd2l0Y2ggPT09IHRydWUpe1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZVRleHQodGhpcy5fbXlTdHJpbmcpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlhbPpl63mlofmnKzmmL7npLpcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFN3aXRjaE9mZigpOnZvaWR7XHJcbiAgICAgICAgaWYodGhpcy5fc3dpdGNoKXtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VUZXh0KFwiIFwiKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagueaNrue8qeaUvuavlOS/ruaUueWPr+inhuiKgueCueWkp+Wwj1xyXG4gICAgICogQHBhcmFtIHNjYWxlIOWFqOWxgOe8qeaUvuavlFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlU2NhbGUoc2NhbGU6bnVtYmVyKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3NjYWxlID0gc2NhbGU7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuX3NpemUueCp0aGlzLl9zY2FsZTtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuX3NpemUueSp0aGlzLl9zY2FsZTtcclxuICAgICAgICB0aGlzLnggPSB0aGlzLl9wb3MueCp0aGlzLl9zY2FsZTtcclxuICAgICAgICB0aGlzLnkgPSB0aGlzLl9wb3MueSp0aGlzLl9zY2FsZTtcclxuICAgICAgICB0aGlzLmZvbnRTaXplID0gMTAqdGhpcy5fc2NhbGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7mlofmnKxcclxuICAgICAqIEBwYXJhbSB0ZXh0IFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0VGV4dCh0ZXh0OnN0cmluZyk6dm9pZHtcclxuICAgICAgICB0aGlzLl9teVN0cmluZyA9IHRleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkv67mlLnmlofmnKzotbflp4vlnZDmoIfvvIjkuI3lj5flhajlsYDnvKnmlL7mr5TlvbHlk43vvIlcclxuICAgICAqIEBwYXJhbSBwb3Mg6LW35aeL5Z2Q5qCHXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRQb3MocG9zOlZlYzIgPSBuZXcgVmVjMigwLDApKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3BvcyA9IHBvcztcclxuICAgICAgICB0aGlzLnggPSB0aGlzLl9wb3MueCp0aGlzLl9zY2FsZTtcclxuICAgICAgICB0aGlzLnkgPSB0aGlzLl9wb3MueSp0aGlzLl9zY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmYu+atoum8oOagh+S6i+S7tuepv+mAj1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb2ZmU3dpdGNoKCk6dm9pZHtcclxuICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5vZmYoRXZlbnRDZW50cmUuRVR5cGUuUEVSRk9STUFOQ0VfUkVTQ0FMRSgpLHRoaXMsdGhpcy5yZVNjYWxlKTtcclxuICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5vZmYoRXZlbnRDZW50cmUuRVR5cGUuUEVSRk9STUFOQ0VfVEVYVF9TV0lUQ0goKSx0aGlzLHRoaXMuc3dpdGNoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS/ruaUueWtl+S9k+Wkp+Wwj1xyXG4gICAgICogQHBhcmFtIHZhbHVlIOi+k+WFpeWkp+Wwj1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0Rm9udFNpemUodmFsdWU6bnVtYmVyKTp2b2lke1xyXG4gICAgICAgIHRoaXMuZm9udFNpemUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnRleHQgPSB0aGlzLl9teVN0cmluZztcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiIsIi8vYXV0aG9yIE5hMkN1QzRPOFxyXG5cclxuaW1wb3J0IEN1c3RvbWl6ZWRTcHJpdGUgZnJvbSBcIi4vY3VzdG9taXplZFNwclwiO1xyXG5pbXBvcnQgeyBDaGVzc0JvYXJkIH0gZnJvbSBcIi4vVW5zeW1ib2xpemVkUmVuZGVyXCI7XHJcbmltcG9ydCBBY3RvclJVIGZyb20gXCIuL1N5bWJvbGl6ZWRSZW5kZXJcIjtcclxuaW1wb3J0IHsgQWN0b3JCb3ggfSBmcm9tIFwiLi9vYmpib3hcIjtcclxuaW1wb3J0IHsgVmVjMiB9IGZyb20gXCIuLi8uLi9Eb2RNYXRoXCI7XHJcbmltcG9ydCB7IFN5bWJvbGl6ZWQgfSBmcm9tIFwiLi4vLi4vLi4vRml4L0ZpeFN5bWJvbFwiO1xyXG5pbXBvcnQgeyBFdmVudENlbnRyZSB9IGZyb20gXCIuLi8uLi8uLi9FdmVudC9FdmVudENlbnRyZVwiO1xyXG5pbXBvcnQgeyBSZW5kZXJlciB9IGZyb20gXCIuLi8uLi9SZW5kZXJlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGVyZm9ybWFuY2VDZW50cmUgaW1wbGVtZW50cyBSZW5kZXJlcntcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGluc3RhbmNlOlBlcmZvcm1hbmNlQ2VudHJlOy8v5Y2V5L6L77yI6K+35LiN6KaB5omL5Yqo5paw5bu65Y2V5L6L77yJXHJcbiAgICBwdWJsaWMgbWFpblNwcjpDdXN0b21pemVkU3ByaXRlOy8v6buY6K6k57uY5Zu+6IqC54K577yI56aB5q2i5Zyo6K+l6IqC54K55LiK57uY5Zu+77yM5Y+q6IO955So5LqO5re75Yqg5a2Q6IqC54K577yJXHJcbiAgICBwcml2YXRlIGNoZXNzQm9hcmQ6Q2hlc3NCb2FyZDsvL+m7mOiupOaji+ebmFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW5riy5p+T5Li75Zy65pmv77yM5Yid5aeL5YyW5LqL5Lu255uR5ZCs57G7XHJcbiAgICAgKiBAcGFyYW0gc2NlbmUg5ri45oiP5Li75Zy65pmvXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZSAoc2NlbmU6TGF5YS5TcHJpdGUpOnZvaWR7XHJcbiAgICAgICAgUGVyZm9ybWFuY2VDZW50cmUuaW5zdGFuY2UgPSBuZXcgUGVyZm9ybWFuY2VDZW50cmUoKTsvL+WKoOi9vemdmeaAgeexu1xyXG4gICAgICAgIFBlcmZvcm1hbmNlQ2VudHJlLmluc3RhbmNlLm1haW5TcHIgPSBuZXcgQ3VzdG9taXplZFNwcml0ZSgpOy8v5bu656uL5Li757uY5Zu+6IqC54K5XHJcbiAgICAgICAgLy/or6Xnu5jlm77oioLngrnkuI3nlKjkuo7nu5jliLbku7vkvZXlm77lvaLvvIzku4XnlKjkuo7mt7vliqDlrZDoioLngrlcclxuICAgICAgICBzY2VuZS5hZGRDaGlsZChQZXJmb3JtYW5jZUNlbnRyZS5pbnN0YW5jZS5tYWluU3ByKTsvL+WwhuS4u+e7mOWbvuiKgueCuea3u+WKoOS4uuS4u+WcuuaZr+WtkOiKgueCuVxyXG4gICAgICAgIEV2ZW50Q2VudHJlLmluaXQoKTsvL+WIneWni+WMluinguWvn+iAhVxyXG4gICAgICAgIFBlcmZvcm1hbmNlQ2VudHJlLmluaXRpYWxpemUgPSAoKSA9PiB7fTsvL+a4heepuuS4u+WcuuaZr+WIneWni+WMluWHveaVsFxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiTWFpbiBTY2VuZSBJbml0aWFsaXphdGlvbiBDb21wbGV0ZSEhXCIpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa4suafk+aji+ebmFxyXG4gICAgICogQHBhcmFtIGFyciDnlKjkuo7nlJ/miJDmo4vnm5jnmoTkuoznu7TmlbDnu4RcclxuICAgICAqIEBwYXJhbSBwb3NWZWMyIOaji+ebmOi1t+Wni+WdkOagh++8iOS4gOW+i+aMieWFqOWxgOe8qeaUvuavlOS4ujHorqHnrpfvvIzmuLLmn5PlmajkvJrmoLnmja7lhajlsYDnvKnmlL7mr5Toh6rliqjlrozmiJDnvKnmlL7muLLmn5PvvIlcclxuICAgICAqIEBwYXJhbSB1bml0c2l6ZSDljZXkvY3moLzlrZDlrr3pq5jvvIjkuIDlvovmjInlhajlsYDnvKnmlL7mr5TkuLox6K6h566X77yM5riy5p+T5Zmo5Lya5qC55o2u5YWo5bGA57yp5pS+5q+U6Ieq5Yqo5a6M5oiQ57yp5pS+5riy5p+T77yJXHJcbiAgICAgKiBAcGFyYW0gYmFja0dyb3VuZENvbG9yIOaji+ebmOiDjOaZr+minOiJslxyXG4gICAgICogQHBhcmFtIGZyb250Q29sb3Ig5qC85a2Q6aKc6ImyXHJcbiAgICAgKiBAcGFyYW0gZmF0aGVyIOeItue7mOWbvuiKgueCue+8iOm7mOiupOS4uuWFqOWxgOe7mOWbvuiKgueCue+8iVxyXG4gICAgICogQHBhcmFtIHNjYWxlIOe8qeaUvuavlO+8iOm7mOiupOS4ujHvvIlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGluaXRCb2FyZChhcnI6IG51bWJlcltdW10sIHBvc1ZlYzI6IFZlYzIsIHVuaXRzaXplOiBWZWMyLCBiYWNrR3JvdW5kQ29sb3I6IHN0cmluZywgZnJvbnRDb2xvcjogc3RyaW5nLCBzY2FsZTogbnVtYmVyID0gMSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2hlc3NCb2FyZCA9IG5ldyBDaGVzc0JvYXJkKGFycixwb3NWZWMyLHVuaXRzaXplLGJhY2tHcm91bmRDb2xvcixmcm9udENvbG9yLHNjYWxlKTsvL+aWsOW7uuaji+ebmFxyXG4gICAgICAgIFBlcmZvcm1hbmNlQ2VudHJlLmluc3RhbmNlLm1haW5TcHIuYWRkQ2hpbGQodGhpcy5jaGVzc0JvYXJkKTsvL+a3u+WKoOWtkOiKgueCuVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6LCD6IqC5YWo5bGA57yp5pS+5q+U77yM5Y+q6IO95L2c55So5LqO5omA5pyJYWN0b3LmuLLmn5PlrozmiJDlkI7jgIHmiYDmnInnibnmlYjluKflvqrnjq/miafooYzliY3vvIzlkKbliJnmnInpnZ7oh7Tlkb3mgKdidWdcclxuICAgICAqIEBwYXJhbSB2YWx1ZSDlhajlsYDlj6/op4boioLngrnnvKnmlL7mr5RcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlc2NhbGUodmFsdWU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLmV2ZW50KFwiUkVTQ0FMRVwiLFt2YWx1ZV0pOy8v5Y+R5biD6LCD5Y+C5LqL5Lu244CB57yp5pS+5q+U5Y+C5pWwXHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOa4suafk2FjdG9y5a+56LGhXHJcbiAgICAgKiBAcGFyYW0gYm91bmQgYWN0b3JcclxuICAgICAqIEBwYXJhbSBwb3Mg5Z2Q5qCH77yI5LiA5b6L5oyJ5YWo5bGA57yp5pS+5q+U5Li6Meiuoeeul++8jOa4suafk+WZqOS8muagueaNruWFqOWxgOe8qeaUvuavlOiHquWKqOWujOaIkOe8qeaUvua4suafk++8iVxyXG4gICAgICogQHBhcmFtIHNpeiDlrr3pq5jvvIjpu5jorqQxMCwxMO+8ie+8iOS4gOW+i+aMieWFqOWxgOe8qeaUvuavlOS4ujHorqHnrpfvvIzmuLLmn5PlmajkvJrmoLnmja7lhajlsYDnvKnmlL7mr5Toh6rliqjlrozmiJDnvKnmlL7muLLmn5PvvIlcclxuICAgICAqIEBwYXJhbSBmYXRoZXIg54i257uY5Zu+6IqC54K577yI6buY6K6k5Li65qOL55uY57uY5Zu+6IqC54K577yJXHJcbiAgICAgKiBAcGFyYW0gY29sb3Ig6aKc6Imy77yI6buY6K6k5Li657u/77yJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXNwbGF5QWN0b3IoYm91bmQ6IFN5bWJvbGl6ZWQsIHBvczogVmVjMiwgc2l6OlZlYzIgPSBuZXcgVmVjMigxMCwxMCksIGNvbG9yOnN0cmluZyA9IFwiIzAwZmYwMFwiLCBmYXRoZXI6Q3VzdG9taXplZFNwcml0ZSA9IFBlcmZvcm1hbmNlQ2VudHJlLmluc3RhbmNlLmNoZXNzQm9hcmQpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdG1wQWN0b3I6QWN0b3JSVSA9IG5ldyBBY3RvclJVKGJvdW5kLnN5bWJvbCxwb3Msc2l6LGZhdGhlcixjb2xvcik7Ly/muLLmn5NhY3RvclxyXG5cdHRtcEFjdG9yLmxvYWRBbmkoXCJhbmdlbF9ub3JtYWxcIixcInN0YXJ0XCIpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoC/kv67mlLnov5vluqbmnaFcclxuICAgICAqIOm7mOiupOi/m+W6puadoemVvzMw77yM5a69Ne+8iOm7mOiupOi/m+W6puadoeWuvemrmOaXoOazlemAmui/h+acrOWHveaVsOS/ruaUue+8jOWmgumcgOS/ruaUueivt+WJjeW+gCAuXFxSaG9kZSBJc2xhbmRcXHNyY1xcUmhvZGVzX0dhbWVcXFBlcmZvcm1hbmNlX01vZHVsZVxcU3ltYm9saXplZFJlbmRlci50c1xcQWN0b3JSVSlcclxuICAgICAqIOi/m+W6puminOiJsuS4uueBsO+8jOWmgumcgOS/ruaUueivt+WJjeW+gCAuXFxSaG9kZSBJc2xhbmRcXHNyY1xcUmhvZGVzX0dhbWVcXFBlcmZvcm1hbmNlX01vZHVsZVxcQWN0b3JDb21wb25lbnQudHNcXEJhclxyXG4gICAgICogQHBhcmFtIGJvdW5kIGFjdG9yXHJcbiAgICAgKiBAcGFyYW0gYmFyX3N5bWJOdW0g56ys5Yeg5qC56L+b5bqm5p2h77yI5aeL5LqOMO+8iSBcclxuICAgICAqIEBwYXJhbSBwZXJjZW50YWdlIOivpei/m+W6puadoei/m+W6plxyXG4gICAgICogQHBhcmFtIGNvbG9yIOivpei/m+W6puadoeiDjOaZr+minOiJslxyXG4gICAgICogQHBhcmFtIHgg6L+b5bqm5p2h6ZW/5bqm77yI5LiA5b6L5oyJ5YWo5bGA57yp5pS+5q+U5Li6Meiuoeeul++8jOa4suafk+WZqOS8muagueaNruWFqOWxgOe8qeaUvuavlOiHquWKqOWujOaIkOe8qeaUvua4suafk++8iVxyXG4gICAgICogQHBhcmFtIHkg6L+b5bqm5p2h6auY5bqm77yI5LiA5b6L5oyJ5YWo5bGA57yp5pS+5q+U5Li6Meiuoeeul++8jOa4suafk+WZqOS8muagueaNruWFqOWxgOe8qeaUvuavlOiHquWKqOWujOaIkOe8qeaUvua4suafk++8iVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZWRpdEJhcihib3VuZDogU3ltYm9saXplZCwgYmFyX3N5bWJOdW06bnVtYmVyID0gMCwgcGVyY2VudGFnZTogbnVtYmVyID0gMSwgY29sb3I6IHN0cmluZyA9IFwiIzAwZmYwMFwiLCB4PzpudW1iZXIsIHk/Om51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGxldCB0bXBBY3RvcjpBY3RvclJVID0gQWN0b3JCb3guZ2V0KGJvdW5kLnN5bWJvbC5kYXRhKTsvL+iOt+WPluW3sua4suafk+eahGFjdG9yUlXlr7nosaFcclxuICAgICAgICBpZih0bXBBY3Rvci5nZXRCYXIoYmFyX3N5bWJOdW0pID09PSAgdW5kZWZpbmVkKXsvL+WmguaenOWvueW6lOi/m+W6puadoeS4jeWtmOWcqFxyXG4gICAgICAgICAgICB0bXBBY3Rvci5hZGRFeHRCYXIoY29sb3IsYmFyX3N5bWJOdW0scGVyY2VudGFnZSx4LHkpOy8v5qC55o2u6L6T5YWl5Y+C5pWw5paw5bu66L+b5bqm5p2hXHJcblxyXG4gICAgICAgIH1lbHNley8v5aaC5a+55bqU6L+b5bqm5p2h5bey5a2Y5ZyoXHJcbiAgICAgICAgICAgIHRtcEFjdG9yLmVkaXRCYXIoYmFyX3N5bWJOdW0scGVyY2VudGFnZSk7Ly/kv67mlLnor6Xov5vluqbmnaHnmb7liIbmr5RcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+R5biD5pS75Ye75LqL5Lu2XHJcbiAgICAgKiDmraTmlrnms5XosIPnlKjlkI7or7fli7/kv67mlLnlhajlsYDnvKnmlL7mr5TvvIHvvIFcclxuICAgICAqIEBwYXJhbSBmcm9tIOWPkeWKqOaUu+WHu+iKgueCuVxyXG4gICAgICogQHBhcmFtIHRvIOmBreWPl+aJk+WHu+iKgueCuVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVmYXVsdEF0a0VmZmVjdChmcm9tOiBTeW1ib2xpemVkLCB0bzogU3ltYm9saXplZCk6IHZvaWQge1xyXG4gICAgICAgIEFjdG9yQm94LmdldChmcm9tLnN5bWJvbC5kYXRhKS5jbGVhckFuaSgpO1xyXG4gICAgICAgIEFjdG9yQm94LmdldChmcm9tLnN5bWJvbC5kYXRhKS5sb2FkQW5pKFwiYW5nZWxfbm9ybWFsXCIsXCJhdHRhY2tcIix0cnVlKTtcclxuICAgICAgICAvL+aJk+WHu+S6i+S7tuOAgeWPkeWKqOaUu+WHu+iKgueCueWSjOmBreWPl+aUu+WHu+iKgueCueWPguaVsFxyXG4gICAgICAgIEFjdG9yQm94LmdldChmcm9tLnN5bWJvbC5kYXRhKS5oaXQodG8pO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+R5biD5Y+X5Lyk5LqL5Lu2XHJcbiAgICAgKiDmraTmlrnms5XosIPnlKjlkI7or7fli7/kv67mlLnlhajlsYDnvKnmlL7mr5TvvIHvvIFcclxuICAgICAqIEBwYXJhbSBib3VuZCDlj5fkvKToioLngrlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRlZmF1bHREbWdFZmZlY3QoYm91bmQ6IFN5bWJvbGl6ZWQpOiB2b2lkIHtcclxuICAgICAgICAvL+WPl+S8pOS6i+S7tuWSjOWPl+S8pOiKgueCueWPguaVsFxyXG4gICAgICAgIEFjdG9yQm94LmdldChib3VuZC5zeW1ib2wuZGF0YSkuZGFtYWdlKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZSA5q+B5a+56LGh77yI6buY6K6k6ZSA5q+B77yJXHJcbiAgICAgKiBAcGFyYW0gYm91bmQg5a+56LGhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXN0cm95QWN0b3IoYm91bmQ6IFN5bWJvbGl6ZWQpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdG1wQWN0b3I6QWN0b3JSVSA9IEFjdG9yQm94LmdldChib3VuZC5zeW1ib2wuZGF0YSk7Ly/ojrflj5ZhY3RvclJV5a+56LGhXHJcbiAgICAgICAgdG1wQWN0b3IuZGVzdG9yeSgpO1xyXG4gICAgICAgIC8v6ZSA5q+BYWN0b3JSVeWvueixoVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ZyoYWN0b3LouqvkuIrmuLLmn5PmlofmnKxcclxuICAgICAqIOS7heW9k+WFqOWxgOaWh+acrOaYvuekuuW8gOWFs3N3aXRjaEhvdmVyVGV4dO+8iO+8ieW8gOWQr+aXtuaJjeS8mua4suafk+aWh+acrO+8jOW8gOWFs+m7mOiupOWFs+mXrVxyXG4gICAgICogQHBhcmFtIGJvdW5kIGFjdG9yXHJcbiAgICAgKiBAcGFyYW0gY29udGVudCDmlofmnKxcclxuICAgICAqIEBwYXJhbSBwb3Mg5paH5pys6LW35aeL5Z2Q5qCH77yI5LiA5b6L5oyJ5YWo5bGA57yp5pS+5q+U5Li6Meiuoeeul++8jOa4suafk+WZqOS8muagueaNruWFqOWxgOe8qeaUvuavlOiHquWKqOWujOaIkOe8qeaUvua4suafk++8iVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgd3JpdGUoYm91bmQ6IFN5bWJvbGl6ZWQsIGNvbnRlbnQ6IHN0cmluZywgcG9zPzogVmVjMik6IHZvaWQge1xyXG4gICAgICAgIEFjdG9yQm94LmdldChib3VuZC5zeW1ib2wuZGF0YSkuZ2V0VGV4dCgpLnNldFRleHQoY29udGVudCk7Ly/kv67mlLlBY3RvclJV5paH5pysXHJcbiAgICAgICAgQWN0b3JCb3guZ2V0KGJvdW5kLnN5bWJvbC5kYXRhKS5nZXRUZXh0KCkuc2V0UG9zKHBvcyk7Ly/kv67mlLnor6XmlofmnKzkvY3nva5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWFqOWxgOaWh+acrOaYvuekuuW8gOWFs++8iOm7mOiupOWFs+mXre+8iVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3dpdGNoSG92ZXJUZXh0KCk6IHZvaWQge1xyXG4gICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLmV2ZW50KEV2ZW50Q2VudHJlLkVUeXBlLlBFUkZPUk1BTkNFX1RFWFRfU1dJVENIKCkpOy8v5Y+R5biD5paH5pys5byA5YWz5LqL5Lu277yM5oyJ6ZKu5paH5pys5LiN5Y+X5b2x5ZONXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnp7vliqhhY3RvcuWvueixoVxyXG4gICAgICogQHBhcmFtIGJvdW5kIGFjdG9yXHJcbiAgICAgKiBAcGFyYW0gcG9zIOebruagh+WdkOagh++8iOS4gOW+i+aMieWFqOWxgOe8qeaUvuavlOS4ujHorqHnrpfvvIzmuLLmn5PlmajkvJrmoLnmja7lhajlsYDnvKnmlL7mr5Toh6rliqjlrozmiJDnvKnmlL7muLLmn5PvvIlcclxuICAgICAqL1xyXG4gICAgcHVibGljIG1vdmUoYm91bmQ6IFN5bWJvbGl6ZWQsIHBvczogVmVjMik6IHZvaWQge1xyXG4gICAgICAgIEFjdG9yQm94LmdldChib3VuZC5zeW1ib2wuZGF0YSkucmVsb2NhdGUocG9zKTsvL+enu+WKqEFjdG9yUlXlr7nosaHlnZDmoIdcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ZyoYWN0b3LouqvkuIrmt7vliqDmjInpkq5cclxuICAgICAqIOavj+S4qmFjdG9yUlXpu5jorqTlrZjlnKgy5Liq5oyJ6ZKu77yI54K55Ye7YWN0b3JSVeiKgueCueWNs+WPr+aYvuekuu+8ie+8jOWvueW6lOaSpOmAgOWSjOaKgOiDveOAguivpeaMiemSruWdkOagh+OAgeWuvemrmOOAgeminOiJsuOAgeWQjeWtl+S4jeWPr+S/ruaUue+8jOWKn+iDvemcgOS7juWklumDqOa3u+WKoFxyXG4gICAgICogQHBhcmFtIGJvdW5kIGFjdG9yXHJcbiAgICAgKiBAcGFyYW0gbnVtIOaMiemSrue8luWPt++8iDAsMeS4uum7mOiupOaMiemSru+8jOm7mOiupOaMiemSruS4jeiHquW4puS7u+S9leWKn+iDve+8jOmcgOaJi+WKqOa3u+WKoO+8iVxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIOeCueWHu+aMiemSruWQjuiwg+eUqOeahOWHveaVsFxyXG4gICAgICogQHBhcmFtIHRleHQg5pi+56S65Zyo5oyJ6ZKu5LiK55qE5paH5pys77yI6buY6K6k5pi+56S65LiU5peg5rOV5L+u5pS577yJXHJcbiAgICAgKiBAcGFyYW0gcG9zIOaMiemSrui1t+Wni+WdkOagh++8iOS4gOW+i+aMieWFqOWxgOe8qeaUvuavlOS4ujHorqHnrpfvvIzmuLLmn5PlmajkvJrmoLnmja7lhajlsYDnvKnmlL7mr5Toh6rliqjlrozmiJDnvKnmlL7muLLmn5PvvIlcclxuICAgICAqIEBwYXJhbSBzaXplIOaMiemSruWkp+Wwj++8iOS4gOW+i+aMieWFqOWxgOe8qeaUvuavlOS4ujHorqHnrpfvvIzmuLLmn5PlmajkvJrmoLnmja7lhajlsYDnvKnmlL7mr5Toh6rliqjlrozmiJDnvKnmlL7muLLmn5PvvIlcclxuICAgICAqIEBwYXJhbSBjb2xvciDmjInpkq7popzoibJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGF0dGFjaEJ1dHRvbihib3VuZDogU3ltYm9saXplZCxudW06bnVtYmVyLCBjYWxsYmFjazogRnVuY3Rpb24sIHRleHQ/OiBzdHJpbmcsIHBvcz86IFZlYzIsIHNpemU/OiBWZWMyLCBjb2xvcj86IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGxldCB0bXBBY3Q6QWN0b3JSVSA9IEFjdG9yQm94LmdldChib3VuZC5zeW1ib2wuZGF0YSk7Ly/ojrflj5ZBY3RvclJV5a+56LGhXHJcbiAgICAgICAgaWYodG1wQWN0LmdldEJ1dHRvbihudW0pID09PSB1bmRlZmluZWQpey8v5aaC5p6c5a+55bqU5oyJ6ZKu5LiN5a2Y5ZyoXHJcbiAgICAgICAgICAgIGlmKHBvcyA9PT0gdW5kZWZpbmVkKXsvL+WmguaenOS4jei+k+WFpeaMh+WumuWdkOagh1xyXG4gICAgICAgICAgICAgICAgdG1wQWN0LmFkZEV4dHJhQnV0dG9uc0F0RGVmTG9jYXRpb24odGV4dCxudW0sY29sb3IsY2FsbGJhY2spOy8v5Zyo6buY6K6k5L2N572u5paw5bu65oyJ6ZKuXHJcbiAgICAgICAgICAgIH1lbHNley8v5aaC5p6c6L6T5YWl5oyH5a6a5Z2Q5qCHXHJcbiAgICAgICAgICAgICAgICB0bXBBY3QuYWRkRXh0cmFCdXR0b25BdE5vRGVmTG9jYXRpb24odGV4dCxudW0sY2FsbGJhY2sscG9zLHNpemUsY29sb3IpOy8v5Zyo5oyH5a6a5L2N572u5paw5bu65oyJ6ZKuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXsvL+WmguaenOWvueW6lOaMiemSruWtmOWcqFxyXG4gICAgICAgICAgICB0bXBBY3QuZ2V0QnV0dG9uKG51bSkuc2V0RnVuYyhjYWxsYmFjayk7Ly/ovpPlhaXlip/og73lh73mlbBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59IiwiLy9hdXRob3IgTmEyQ3VDNE84XHJcblxyXG5pbXBvcnQgQ3VzdG9taXplZFNwcml0ZSBmcm9tIFwiLi9jdXN0b21pemVkU3ByXCI7XHJcbmltcG9ydCB7IEFjdG9yQm94IH0gZnJvbSBcIi4vb2JqYm94XCI7XHJcbmltcG9ydCB7IEJhciwgQnV0dG9uICwgVGV4dCB9IGZyb20gXCIuL0FjdG9yQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IE15U3ltYm9sLCBTeW1ib2xpemVkIH0gZnJvbSBcIi4uLy4uLy4uL0ZpeC9GaXhTeW1ib2xcIjtcclxuaW1wb3J0IHsgVmVjMiB9IGZyb20gXCIuLi8uLi9Eb2RNYXRoXCI7XHJcbmltcG9ydCB7IEtWUGFpciB9IGZyb20gXCIuLi8uLi9Eb2REYXRhU3RydWN0dXJlXCI7XHJcbmltcG9ydCB7IEV2ZW50Q2VudHJlIH0gZnJvbSBcIi4uLy4uLy4uL0V2ZW50L0V2ZW50Q2VudHJlXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWN0b3JSVXtcclxuICAgIHByaXZhdGUgX2luaXRQb3M6VmVjMjsvL2FjdG9y6LW35aeL5Z2Q5qCHXHJcbiAgICBwcml2YXRlIF9pbml0U2l6ZTpWZWMyOy8vYWN0b3Lotbflp4vlpKflsI9cclxuICAgIHByaXZhdGUgX2luaXRCYXJIZWlnaHQ6bnVtYmVyID0gMDsvL+i/m+W6puadoeWFtuWunumrmOW6puaaguWtmOWZqFxyXG4gICAgcHJpdmF0ZSBfcG9zOlZlYzI7Ly/moLnmja7lhajlsYDnvKnmlL7mr5TmjaLnrpflkI7nmoTlj6/op4HlnZDmoIdcclxuICAgIHByaXZhdGUgX3NpemU6VmVjMjsvL+agueaNruWFqOWxgOe8qeaUvuavlOaNoueul+WQjueahOWPr+ingeWkp+Wwj1xyXG4gICAgcHJpdmF0ZSBfc2NhbGU6bnVtYmVyID0gMTsvL+WFqOWxgOe8qeaUvuavlFxyXG4gICAgcHJpdmF0ZSBfc3ltYjpNeVN5bWJvbDsvL3N5bWJcclxuICAgIHByaXZhdGUgX2ZhdGhlcjpDdXN0b21pemVkU3ByaXRlOy8v54i257uY5Zu+6IqC54K5XHJcbiAgICBwcml2YXRlIF9zcHI6Q3VzdG9taXplZFNwcml0ZTsvL+acrOe7mOWbvuiKgueCuVxyXG4gICAgcHJpdmF0ZSBfYmFyUGFpcjpLVlBhaXI8QmFyPiA9IG5ldyBLVlBhaXI8QmFyPigpOy8v6L+b5bqm5p2h6ZSu5YC857uEXHJcbiAgICBwcml2YXRlIF90ZXh0OlRleHQ7Ly/pu5jorqTmlofmnKxcclxuICAgIHByaXZhdGUgX2RlZkJ1dHRvblNob3dlZDpib29sZWFuID0gZmFsc2U7Ly/mmK/lkKbmmL7npLrpu5jorqTmjInpkq7vvIzpu5jorqTkuLrlkKZcclxuICAgIHByaXZhdGUgX2J1dHRvblBhaXI6S1ZQYWlyPEJ1dHRvbj4gPSBuZXcgS1ZQYWlyPEJ1dHRvbj4oKTtcclxuICAgIHByaXZhdGUgX2J1dHRvbkhlaWdodDpudW1iZXI7Ly/mjInpkq7pq5jluqbmmoLlrZjlmahcclxuICAgIHByaXZhdGUgX2RhbWFnZTpDdXN0b21pemVkU3ByaXRlOy8v5Y+X5Lyk54m55pWI5pi+56S66IqC54K5XHJcbiAgICBwcml2YXRlIF90cmFuc3BhcmVuY3k6bnVtYmVyID0gMTsvL+WPl+S8pOeJueaViOWPguaVsOaaguWtmOWZqFxyXG4gICAgcHJpdmF0ZSBfZmlzdDpDdXN0b21pemVkU3ByaXRlOy8v5pS75Ye754m55pWI5pi+56S66IqC54K5XHJcbiAgICBwcml2YXRlIF9tb3ZlUGVyY2VudGFnZTpudW1iZXIgPSAwOy8v5pS75Ye754m55pWI5Y+C5pWw5pqC5a2Y5ZmoXHJcbiAgICBwdWJsaWMgX2NlbnRlclBvczpWZWMyOy8v5Lit5b+D5Z2Q5qCHXHJcbiAgICBwcml2YXRlIF9hbmk6TGF5YS5BbmltYXRpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXJVbml05p6E6YCg5ZmoXHJcbiAgICAgKiBAcGFyYW0gc3ltYiBzeW1iXHJcbiAgICAgKiBAcGFyYW0gcG9zIOi1t+Wni+WdkOagh1xyXG4gICAgICogQHBhcmFtIHNpemUg5a696auYXHJcbiAgICAgKiBAcGFyYW0gZmF0aGVyIOeItue7mOWbvuiKgueCuVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihzeW1iOk15U3ltYm9sLCBwb3M6VmVjMiwgc2l6ZTpWZWMyLCBmYXRoZXI6Q3VzdG9taXplZFNwcml0ZSwgY29sb3I6c3RyaW5nID0gXCIjMDBmZmZmXCIsIHNjYWxlOm51bWJlciA9IDEpe1xyXG4gICAgICAgIHRoaXMuX2ZhdGhlciA9IGZhdGhlcjsvL+eItue7mOWbvuiKgueCuVxyXG4gICAgICAgIHRoaXMuX2luaXRQb3MgPSBwb3M7Ly/otbflp4vlnZDmoIdcclxuICAgICAgICB0aGlzLl9pbml0U2l6ZSA9IHNpemU7Ly/otbflp4vlrr3pq5hcclxuICAgICAgICB0aGlzLl9zcHIgPSBuZXcgQ3VzdG9taXplZFNwcml0ZSgpOy8v5paw5bu657uY5Zu+6IqC54K5XHJcbiAgICAgICAgdGhpcy5fZmF0aGVyLmFkZENoaWxkKHRoaXMuX3Nwcik7Ly/mt7vliqDlrZDoioLngrlcclxuICAgICAgICB0aGlzLnNldERhdGEoc3ltYixuZXcgVmVjMih0aGlzLl9pbml0UG9zLngqdGhpcy5fc2NhbGUsdGhpcy5faW5pdFBvcy55KnRoaXMuX3NjYWxlKSxuZXcgVmVjMih0aGlzLl9pbml0U2l6ZS54KnRoaXMuX3NjYWxlLCB0aGlzLl9pbml0U2l6ZS55KnRoaXMuX3NjYWxlKSxjb2xvcik7Ly/orr7nva7nu5jlm77oioLngrnlj4LmlbBcclxuICAgICAgICBBY3RvckJveC5hZGQodGhpcyx0aGlzLl9zeW1iKTsvL+WwhuacrOWvueixoea3u+WKoOWIsOmUruWAvOWvuVxyXG4gICAgICAgIHRoaXMuYWRkRGVmQmFyKCk7Ly/mt7vliqDpu5jorqTov5vluqbmnaFcclxuICAgICAgICB0aGlzLl90ZXh0ID0gbmV3IFRleHQodGhpcy5faW5pdFNpemUsdGhpcy5fc2NhbGUpOy8v5re75Yqg6buY6K6k5paH5pysXHJcbiAgICAgICAgdGhpcy5fdGV4dC5zZXRTeW1iKHRoaXMuX3N5bWIpOy8vXHJcbiAgICAgICAgdGhpcy5fYnV0dG9uSGVpZ2h0ID0gdGhpcy5faW5pdFNpemUueTsvL1xyXG4gICAgICAgIHRoaXMuX3Nwci5hZGRDaGlsZCh0aGlzLl90ZXh0KTsvL+m7mOiupOaWh+acrOe9ruS6juWtkOiKgueCuVxyXG4gICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLm9uKEV2ZW50Q2VudHJlLkVUeXBlLlBFUkZPUk1BTkNFX1JFU0NBTEUoKSx0aGlzLHRoaXMucmVTY2FsZSk7Ly/nm5HlkKzlhajlsYDnvKnmlL7mr5RcclxuICAgICAgICB0aGlzLl9zcHIub24oTGF5YS5FdmVudC5NT1VTRV9PVkVSLHRoaXMsdGhpcy5tb3VzZU92ZXIpOy8vXHJcbiAgICAgICAgdGhpcy5fc3ByLm9uKExheWEuRXZlbnQuTU9VU0VfT1VULHRoaXMsdGhpcy5tb3VzZU91dCk7Ly9cclxuICAgICAgICB0aGlzLl9zcHIub24oTGF5YS5FdmVudC5NT1VTRV9VUCx0aGlzLHRoaXMuc2hvd0RlZmF1bHRCb3R0b25zKTsvL1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZSA9IG5ldyBDdXN0b21pemVkU3ByaXRlKCk7Ly9cclxuICAgICAgICB0aGlzLl9zcHIuYWRkQ2hpbGQodGhpcy5fZGFtYWdlKTsvL1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZS5zZXRQYXJhbSgwLDAsdGhpcy5fc2l6ZS54LHRoaXMuX3NpemUueSxcIiNmOTE1MjZcIik7Ly9cclxuICAgICAgICB0aGlzLl9kYW1hZ2UubG9jYXRpb25BbmRTaXplKCk7Ly9cclxuICAgICAgICB0aGlzLmFkZERlZkJ1dHRvbnMoKTsvL1xyXG4gICAgICAgIHRoaXMuX2Zpc3QgPSBuZXcgQ3VzdG9taXplZFNwcml0ZSgpOy8vXHJcbiAgICAgICAgdGhpcy5fZmlzdC5zZXRQYXJhbSh0aGlzLl9jZW50ZXJQb3MueCx0aGlzLl9jZW50ZXJQb3MueSwxNiwxNixcIiNGM0MyNDZcIik7Ly9cclxuICAgICAgICB0aGlzLl9maXN0LmxvY2F0aW9uQW5kU2l6ZSgpOy8vXHJcbiAgICAgICAgdGhpcy5fZmlzdC56T3JkZXIgPSAyOy8vXHJcbiAgICAgICAgdGhpcy5fc3ByLmFkZENoaWxkKHRoaXMuX2Zpc3QpOy8vXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcblxyXG4gICAgfVxyXG5wdWJsaWMgY2xlYXJBbmkoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX2FuaS5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBcclxuXHJcbiAgICBwdWJsaWMgbG9hZEFuaShuYW1lOnN0cmluZyxzdGF0dXM6c3RyaW5nLCBsb29wT3JOb3Q6Ym9vbGVhbiA9IGZhbHNlKTpMYXlhLkFuaW1hdGlvbntcclxuICAgICAgICB0aGlzLl9hbmkgPSBuZXcgTGF5YS5BbmltYXRpb24oKTtcclxuICAgICAgICB0aGlzLl9hbmkucG9zKC0xNyp0aGlzLl9zY2FsZSwtOCp0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fYW5pLnNjYWxlKDAuMjUqdGhpcy5fc2NhbGUsMC4xOCp0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fc3ByLmFkZENoaWxkKHRoaXMuX2FuaSk7XHJcbiAgICAgICAgdGhpcy5fYW5pLmxvYWRBdGxhcyhgcmVzL2F0bGFzLyR7bmFtZX0uYXRsYXNgLExheWEuSGFuZGxlci5jcmVhdGUodGhpcyxvbkxvYWRlZCkpOyBcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9hbmkucGxheSh1bmRlZmluZWQsbG9vcE9yTm90KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlQW5pVXJscyh1cmwsbGVuZ3RoKXtcclxuICAgICAgICAgICAgbGV0IHVybHMgPSBbXTtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTE7aTxsZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKGkgPCAxMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJscy5wdXNoKHVybCArXCJfXCIrXCIwXCIgK2krXCIucG5nXCIpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJscy5wdXNoKHVybCArXCJfXCIraStcIi5wbmdcIik7ICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB1cmxzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBvbkxvYWRlZCgpe1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5fYW5pLmludGVydmFsID0gNTA7XHJcbiAgICAgICAgICAgIGxldCB0bXBBbmkgPSBjcmVhdGVBbmlVcmxzKGAke25hbWV9LyR7c3RhdHVzfWAsMTYpO1xyXG4gICAgICAgICAgICB0aGlzLl9hbmkubG9hZEltYWdlcyh0bXBBbmkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FuaTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuW9k+WJjeWPr+inhuiKgueCueWdkOagh1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGN1clBvcygpOlZlYzJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvcztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5HliqjmiZPlh7vnibnmlYhcclxuICAgICAqIEBwYXJhbSB0byDmiZPlh7vnm67moIdcclxuICAgICAqL1xyXG4gICAgcHVibGljIGhpdCh0bzpTeW1ib2xpemVkKTp2b2lke1xyXG4gICAgICAgIC8vIHRoaXMuX2Zpc3QuZ3JhcGhpY3Muc2F2ZSgpO1xyXG4gICAgICAgIHRoaXMuX2Zpc3QuY2VudHJhbFNoaWZ0Q29sb3JlZCgpO1xyXG4gICAgICAgIGxldCB0bXBWZWM6VmVjMiA9IG5ldyBWZWMyKEFjdG9yQm94LmdldCh0by5zeW1ib2wuZGF0YSkuY3VyUG9zKCkueC10aGlzLl9wb3MueCxBY3RvckJveC5nZXQodG8uc3ltYm9sLmRhdGEpLmN1clBvcygpLnktdGhpcy5fcG9zLnkpO1xyXG4gICAgICAgIGxldCBmdW46RnVuY3Rpb24gPSAodGFyZ2V0OlZlYzIpID0+e1xyXG4gICAgICAgICAgICBpZih0aGlzLl9tb3ZlUGVyY2VudGFnZSA+IDEpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbW92ZVBlcmNlbnRhZ2UgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZmlzdC5ncmFwaGljcy5jbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5fZmlzdC5ncmFwaGljcy5yZXN0b3JlKCk7XHJcbiAgICAgICAgICAgICAgICBMYXlhLnRpbWVyLmNsZWFyKHRoaXMsZnVuKTtcclxuICAgICAgICAgICAgICAgIEFjdG9yQm94LmdldCh0by5zeW1ib2wuZGF0YSkuZGFtYWdlKCk7XHJcblx0dGhpcy5fYW5pLnN0b3AoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBjdXJMb2NhY3Rpb246VmVjMiA9IG5ldyBWZWMyKCAoMTYrIHRhcmdldC54KSp0aGlzLl9tb3ZlUGVyY2VudGFnZSwoMTYrIHRhcmdldC55KSp0aGlzLl9tb3ZlUGVyY2VudGFnZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX21vdmVQZXJjZW50YWdlICs9IDAuMDI7XHJcbiAgICAgICAgICAgIHRoaXMuX2Zpc3QucmVsb2NhdGUoY3VyTG9jYWN0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5fZmlzdC5yb3RhdGlvbiA9IDIwMDAgKiB0aGlzLl9tb3ZlUGVyY2VudGFnZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIExheWEudGltZXIubG9vcCgyMCx0aGlzLGZ1bixbdG1wVmVjXSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+R5Yqo5Y+X5Lyk54m55pWIXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkYW1hZ2UoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZS5zZXRQYXJhbSgwLDAsdGhpcy5fc2l6ZS54LHRoaXMuX3NpemUueSk7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlLmxvY2F0aW9uQW5kU2l6ZSgpO1xyXG4gICAgICAgIHRoaXMuX2RhbWFnZS5jaGFuZ2VDb2xvcigpO1xyXG4gICAgICAgIGxldCBmdW46RnVuY3Rpb24gPSAoKT0+e1xyXG4gICAgICAgICAgICBpZih0aGlzLl90cmFuc3BhcmVuY3kgPCAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RhbWFnZS5ncmFwaGljcy5jbGVhcigpOyBcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zcGFyZW5jeSA9IDE7XHJcbiAgICAgICAgICAgICAgICBMYXlhLnRpbWVyLmNsZWFyKHRoaXMsZnVuKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5fdHJhbnNwYXJlbmN5IC09IDAuMDM7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhbWFnZS5hbHBoYSA9IHRoaXMuX3RyYW5zcGFyZW5jeTtcclxuICAgICAgICB9XHJcbiAgICAgICAgTGF5YS50aW1lci5sb29wKDIwLHRoaXMsZnVuKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5riy5p+T6buY6K6k5oyJ6ZKuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2hvd0RlZmF1bHRCb3R0b25zKCk6dm9pZHtcclxuICAgICAgICBpZih0aGlzLl9kZWZCdXR0b25TaG93ZWQgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgdGhpcy5fc3ByLmFkZENoaWxkKHRoaXMuX2J1dHRvblBhaXIucmVhZCgwK1wiXCIpLmdldFNwcigpKTtcclxuICAgICAgICAgICAgdGhpcy5fc3ByLmFkZENoaWxkKHRoaXMuX2J1dHRvblBhaXIucmVhZCgxK1wiXCIpLmdldFNwcigpKTtcclxuICAgICAgICAgICAgdGhpcy5fZGVmQnV0dG9uU2hvd2VkID0gdHJ1ZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fc3ByLnJlbW92ZUNoaWxkKHRoaXMuX2J1dHRvblBhaXIucmVhZCgwK1wiXCIpLmdldFNwcigpKTtcclxuICAgICAgICAgICAgdGhpcy5fc3ByLnJlbW92ZUNoaWxkKHRoaXMuX2J1dHRvblBhaXIucmVhZCgxK1wiXCIpLmdldFNwcigpKTtcclxuICAgICAgICAgICAgdGhpcy5fZGVmQnV0dG9uU2hvd2VkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOWPkeW4g+m8oOagh+i/m+WFpeS6i+S7tlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG1vdXNlT3ZlcigpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fdGV4dC5zZXRTd2l0Y2hPbigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+R5biD6byg5qCH56a75byA5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbW91c2VPdXQoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3RleHQuc2V0U3dpdGNoT2ZmKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDph43orr7nvKnmlL7mr5RcclxuICAgICAqIEBwYXJhbSB2YWx1ZSDmlrDlhajlsYDnvKnmlL7mr5RcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZVNjYWxlKHZhbHVlOm51bWJlcik6dm9pZHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9zY2FsZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh0aGlzLl9zeW1iLHRoaXMuX2luaXRQb3MsdGhpcy5faW5pdFNpemUsdGhpcy5fc3ByLmdldENvbG9yKCkpO1xyXG4gICAgICAgIHRoaXMuc2V0Q29sb3IoKTtcclxuICAgICAgICB0aGlzLl9kYW1hZ2Uuc2V0UGFyYW0oMCwwLHRoaXMuX2luaXRTaXplLngqdGhpcy5fc2NhbGUsdGhpcy5faW5pdFNpemUueSp0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fZGFtYWdlLmxvY2F0aW9uQW5kU2l6ZSgpO1xyXG4gICAgICAgIHRoaXMuX2FuaS5zY2FsZSgwLjI1KnZhbHVlLDAuMTgqdmFsdWUpO1xyXG4gICAgICAgIHRoaXMuX2FuaS5wb3MoLTE3KnZhbHVlLC04KnZhbHVlKTtcclxuICAgICAgICBcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7mnKxBUlXnmoTlkITpobnlj4LmlbBcclxuICAgICAqIEBwYXJhbSBzeW1iIHN5bWJcclxuICAgICAqIEBwYXJhbSBwb3Mg6LW35aeL5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gc2l6ZSDlpKflsI9cclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldERhdGEoc3ltYjpNeVN5bWJvbCwgcG9zOlZlYzIsIHNpemU6VmVjMixjb2xvcjpzdHJpbmcpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fc3ltYiA9IHN5bWI7XHJcbiAgICAgICAgdGhpcy5fcG9zID0gbmV3IFZlYzIocG9zLngqdGhpcy5fc2NhbGUscG9zLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX3NpemUgPSBuZXcgVmVjMihzaXplLngqdGhpcy5fc2NhbGUsc2l6ZS55KnRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9zcHIuc2V0UGFyYW0odGhpcy5fcG9zLngsdGhpcy5fcG9zLnksdGhpcy5fc2l6ZS54LHRoaXMuX3NpemUueSxjb2xvcik7XHJcbiAgICAgICAgdGhpcy5zZXRDb2xvcigpO1xyXG4gICAgICAgIHRoaXMuX3Nwci5sb2NhdGlvbkFuZFNpemUoKTtcclxuICAgICAgICB0aGlzLl9jZW50ZXJQb3MgPSBuZXcgVmVjMih0aGlzLl9zaXplLngvMix0aGlzLl9zaXplLnkvMik7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gY29sb3Ig6K6+572u6aKc6ImyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRDb2xvcigpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fc3ByLmNoYW5nZUNvbG9yKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gcG9zIOmHjeaWsOiuvue9rui1t+Wni+WdkOagh++8iOS4jeWPl+e8qeaUvuavlOW9seWTje+8iVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVsb2NhdGUocG9zOlZlYzIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fcG9zID0gbmV3IFZlYzIocG9zLngqdGhpcy5fc2NhbGUscG9zLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX2luaXRQb3MgPSBwb3MuY2xvbmUoKTtcclxuICAgICAgICB0aGlzLl9zcHIucmVsb2NhdGUocG9zKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmkafmr4HmnKxBUlVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRlc3RvcnkoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3Nwci5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bmnKxBUlXnmoTotbflp4vlnZDmoIfvvIjkuI3lj5fnvKnmlL7mr5TlvbHlk43vvIlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFBvc1ZlYygpOlZlYzJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luaXRQb3M7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5pysQVJV55qE6buY6K6k5paH5pys5a+56LGhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRUZXh0KCk6VGV4dHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGV4dDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqDpu5jorqTov5vluqbmnaFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZERlZkJhcigpOnZvaWR7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5faW5pdEJhckhlaWdodCA9IDA7XHJcbiAgICAgICAgbGV0IHRtcDpCYXIgPSBuZXcgQmFyKDAsXCIjMDBmZmZmXCIsbmV3IFZlYzIoMzAsNSksbmV3IFZlYzIoMCx0aGlzLl9pbml0QmFySGVpZ2h0IC0gNiksdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX3Nwci5hZGRDaGlsZCh0bXAuZ2V0QmFja1NwcigpKTtcclxuICAgICAgICB0aGlzLl9iYXJQYWlyLmVkaXQoXCJiYXJfMFwiLHRtcCk7XHJcbiAgICAgICAgdGhpcy5faW5pdEJhckhlaWdodCA9IHRoaXMuX2luaXRCYXJIZWlnaHQgLSB0bXAuZ2V0SGVpZ2h0KCkgLSAxO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5pysQVJV55qE5oyH5a6a6L+b5bqm5p2hXHJcbiAgICAgKiBAcGFyYW0gbnVtIOi/m+W6puadoeS7o+WPt1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0QmFyKG51bTpudW1iZXIpOkJhcntcclxuICAgICAgICByZXR1cm4gdGhpcy5fYmFyUGFpci5yZWFkKGBiYXJfJHtudW19YCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqDpmYTliqDov5vluqbmnaFcclxuICAgICAqIEBwYXJhbSBiYWNrR3JvdW5kQ29sb3Ig6K6+572u5paw5aKe6L+b5bqm5p2h6aKc6ImyXHJcbiAgICAgKiBAcGFyYW0gc3ltYiDorr7nva7mlrDlop7ov5vluqbmnaHku6Plj7dcclxuICAgICAqIEBwYXJhbSB4IOWuveW6plxyXG4gICAgICogQHBhcmFtIHkg6auY5bqmXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRFeHRCYXIoYmFja0dyb3VuZENvbG9yOnN0cmluZyxzeW1iOm51bWJlcixwZXJjZW50YWdlOm51bWJlcix4Om51bWJlciA9IDMwLHk6bnVtYmVyID0gNSk6dm9pZHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgdG1wQmFyOkJhciA9IG5ldyBCYXIoc3ltYixiYWNrR3JvdW5kQ29sb3IsbmV3IFZlYzIoeCx5KSxuZXcgVmVjMigwLHRoaXMuX2luaXRCYXJIZWlnaHQgLSB5IC0gMSksdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX3Nwci5hZGRDaGlsZCh0bXBCYXIuZ2V0QmFja1NwcigpKTtcclxuICAgICAgICB0aGlzLl9iYXJQYWlyLmVkaXQoYGJhcl8ke3N5bWJ9YCx0bXBCYXIpO1xyXG4gICAgICAgIHRoaXMuX2luaXRCYXJIZWlnaHQgPSB0aGlzLl9pbml0QmFySGVpZ2h0IC0gdG1wQmFyLmdldEhlaWdodCgpIC0gMTtcclxuICAgICAgICB0bXBCYXIucGVyY2VudGFnZSA9IHBlcmNlbnRhZ2U7XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIOS/ruaUueW3suaciei/m+W6puadoVxyXG4gICAgICogQHBhcmFtIHN5bWIg5oyH5a6a6L+b5bqm5p2h5Luj5Y+3XHJcbiAgICAgKiBAcGFyYW0gcGVyY2VudGFnZSDkv67mlLnov5vluqbmnaHov5vluqZcclxuICAgICAqL1xyXG4gICAgcHVibGljIGVkaXRCYXIoc3ltYjpudW1iZXIsIHBlcmNlbnRhZ2U6bnVtYmVyKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX2JhclBhaXIucmVhZChgYmFyXyR7c3ltYn1gKS5wZXJjZW50YWdlID0gcGVyY2VudGFnZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqDpu5jorqTmjInpkq5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGREZWZCdXR0b25zKCk6dm9pZHtcclxuICAgICAgICBsZXQgdG1wMTpCdXR0b24gPSBuZXcgQnV0dG9uKHRoaXMuX3N5bWIsXCJSZXRyZWF0XCIsMCxuZXcgVmVjMiggLSAyMCx0aGlzLl9pbml0U2l6ZS55KSxuZXcgVmVjMigyMCwxNSksdW5kZWZpbmVkLHRoaXMuX3NjYWxlKTtcclxuICAgICAgICB0aGlzLl9idXR0b25QYWlyLmVkaXQoXCIwXCIsdG1wMSk7XHJcbiAgICAgICAgbGV0IHRtcDI6QnV0dG9uID0gbmV3IEJ1dHRvbih0aGlzLl9zeW1iLFwiQWN0aXZhdGVfU2tpbGxcIiwwLG5ldyBWZWMyKHRoaXMuX2luaXRTaXplLngsdGhpcy5faW5pdFNpemUueSksbmV3IFZlYzIoMjAsMTUpLHVuZGVmaW5lZCx0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fYnV0dG9uUGFpci5lZGl0KFwiMVwiLHRtcDIpO1xyXG4gICAgICAgIHRoaXMuX2J1dHRvbkhlaWdodCA9IHRoaXMuX2luaXRTaXplLnkgKyAxNjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlnKjpu5jorqTkvY3nva7mt7vliqDpop3lpJbmjInpkq5cclxuICAgICAqIEBwYXJhbSBuYW1lIFxyXG4gICAgICogQHBhcmFtIG51bSBcclxuICAgICAqIEBwYXJhbSBjb2xvciBcclxuICAgICAqIEBwYXJhbSBmdW4gXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRFeHRyYUJ1dHRvbnNBdERlZkxvY2F0aW9uKG5hbWU6c3RyaW5nLG51bTpudW1iZXIsIGNvbG9yPzpzdHJpbmcsIGZ1bj86RnVuY3Rpb24pOnZvaWR7XHJcbiAgICAgICAgbGV0IHRtcEJ1dDpCdXR0b24gPSBuZXcgQnV0dG9uKHRoaXMuX3N5bWIsbmFtZSxudW0sbmV3IFZlYzIoMCx0aGlzLl9idXR0b25IZWlnaHQpLG5ldyBWZWMyKDIwLDE1KSxjb2xvcix0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fYnV0dG9uUGFpci5lZGl0KG51bStcIlwiLHRtcEJ1dCk7XHJcbiAgICAgICAgdGhpcy5fc3ByLmFkZENoaWxkKHRtcEJ1dC5nZXRTcHIoKSk7XHJcbiAgICAgICAgdGhpcy5fYnV0dG9uSGVpZ2h0ICs9IDE2O1xyXG4gICAgICAgIHRtcEJ1dC5zZXRGdW5jKGZ1bik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlnKjmjIflrprkvY3nva7mt7vliqDpop3lpJbmjInpkq5cclxuICAgICAqIEBwYXJhbSBuYW1lIFxyXG4gICAgICogQHBhcmFtIG51bSBcclxuICAgICAqIEBwYXJhbSBmdW4gXHJcbiAgICAgKiBAcGFyYW0gcG9zIFxyXG4gICAgICogQHBhcmFtIHNpemUgXHJcbiAgICAgKiBAcGFyYW0gY29sb3IgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRFeHRyYUJ1dHRvbkF0Tm9EZWZMb2NhdGlvbihuYW1lOnN0cmluZyxudW06bnVtYmVyLGZ1bjpGdW5jdGlvbixwb3M6VmVjMixzaXplOlZlYzIsIGNvbG9yPzpzdHJpbmcpOnZvaWR7XHJcbiAgICAgICAgbGV0IHRtcEJ1dDpCdXR0b24gPSBuZXcgQnV0dG9uKHRoaXMuX3N5bWIsbmFtZSxudW0scG9zLHNpemUsY29sb3IsdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX2J1dHRvblBhaXIuZWRpdChudW0rXCJcIix0bXBCdXQpO1xyXG4gICAgICAgIHRoaXMuX3Nwci5hZGRDaGlsZCh0bXBCdXQuZ2V0U3ByKCkpO1xyXG4gICAgICAgIHRtcEJ1dC5zZXRGdW5jKGZ1bik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bmjInpkq5cclxuICAgICAqIEBwYXJhbSBudW0g5oyJ6ZKu57yW5Y+3XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRCdXR0b24obnVtOm51bWJlcik6QnV0dG9ue1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9idXR0b25QYWlyLnJlYWQobnVtK1wiXCIpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iLCIvL2F1dGhvciBOYTJDdUM0TzhcclxuaW1wb3J0IEN1c3RvbWl6ZWRTcHJpdGUgZnJvbSBcIi4vY3VzdG9taXplZFNwclwiO1xyXG5pbXBvcnQgeyBWZWMyIH0gZnJvbSBcIi4uLy4uL0RvZE1hdGhcIjtcclxuaW1wb3J0IHsgRXZlbnRDZW50cmUgfSBmcm9tIFwiLi4vLi4vLi4vRXZlbnQvRXZlbnRDZW50cmVcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQ2hlc3NCb2FyZCBleHRlbmRzIEN1c3RvbWl6ZWRTcHJpdGV7XHJcbiAgICBwcml2YXRlIF9pbml0UG9zOlZlYzI7XHJcbiAgICBwcml2YXRlIF9pbml0U2l6ZTpWZWMyO1xyXG4gICAgcHJpdmF0ZSBfbnVtQXJyOm51bWJlcltdW107Ly8yZCBhcnIgd2hpY2ggcmVwcmVzZW50cyB0aGUgY2hlc3MgYm9hcmRcclxuICAgIHByaXZhdGUgX3Bvc1ZlYzI6VmVjMjsvL2luaXRpYWwgbG9jYXRpb24oeCx5KVxyXG4gICAgcHJpdmF0ZSBfdW5pdFNpemVWZWMyOlZlYzI7Ly91bml0IHNpemUod2lkdGgsIGhlaWdodClcclxuICAgIHByaXZhdGUgX2Zyb250U3ByQXJyOkN1c3RvbWl6ZWRTcHJpdGVbXVtdOy8vZnJvbnQgc3ByXHJcbiAgICBwcml2YXRlIF9zY2FsZTpudW1iZXI7Ly9zY2FsZSBmb3Igem9vbWluZ1xyXG4gICAgcHJpdmF0ZSBfYmFja0dyb3VuZENvbG9yOnN0cmluZzsvL2JhY2tncm91bmQgY29sb3JcclxuICAgIHByaXZhdGUgX2Zyb250Q29sb3I6c3RyaW5nOy8vZnJvbnQgY29sb3IgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmo4vnm5jmnoTpgKDlmahcclxuICAgICAqIEBwYXJhbSBhcnIg5LqM57u05pWw57uEXHJcbiAgICAgKiBAcGFyYW0gcG9zVmVjMiDotbflp4vlnZDmoIdcclxuICAgICAqIEBwYXJhbSB1bml0c2l6ZSDljZXkvY3lrr3pq5hcclxuICAgICAqIEBwYXJhbSBiYWNrR3JvdW5kQ29sb3Ig6IOM5pmv6aKc6ImyXHJcbiAgICAgKiBAcGFyYW0gZnJvbnRDb2xvciDmoLzlrZDpopzoibJcclxuICAgICAqIEBwYXJhbSBmYXRoZXIg54i257uY5Zu+6IqC54K5XHJcbiAgICAgKiBAcGFyYW0gc2NhbGUg57yp5pS+5q+UXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGFycjpudW1iZXJbXVtdLCBwb3NWZWMyOlZlYzIsIHVuaXRzaXplOlZlYzIsIGJhY2tHcm91bmRDb2xvcjpzdHJpbmcsIGZyb250Q29sb3I6c3RyaW5nLCBzY2FsZTpudW1iZXIpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fbnVtQXJyID0gYXJyO1xyXG4gICAgICAgIHRoaXMuX2luaXRQb3MgPSBwb3NWZWMyO1xyXG4gICAgICAgIHRoaXMuX2luaXRTaXplID0gdW5pdHNpemU7XHJcbiAgICAgICAgdGhpcy5fc2NhbGUgPSBzY2FsZTtcclxuICAgICAgICB0aGlzLl9wb3NWZWMyID0gbmV3IFZlYzIodGhpcy5faW5pdFBvcy54KnRoaXMuX3NjYWxlLCB0aGlzLl9pbml0UG9zLnkqdGhpcy5fc2NhbGUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3VuaXRTaXplVmVjMiA9IG5ldyBWZWMyKHRoaXMuX2luaXRTaXplLnggKiB0aGlzLl9zY2FsZSx0aGlzLl9pbml0U2l6ZS55ICogdGhpcy5fc2NhbGUpOy8vcmVjYWxjdWxhdGUgdW5pdFNpemVcclxuICAgICAgICB0aGlzLl9iYWNrR3JvdW5kQ29sb3IgPSBiYWNrR3JvdW5kQ29sb3I7XHJcbiAgICAgICAgdGhpcy5fZnJvbnRDb2xvciA9IGZyb250Q29sb3I7XHJcbiAgICAgICAgdGhpcy5pbml0QmFja2dyb3VuZCgpO1xyXG4gICAgICAgIHRoaXMuc2V0Q29sb3IodGhpcy5fYmFja0dyb3VuZENvbG9yKTtcclxuICAgICAgICB0aGlzLmNoYW5nZUNvbG9yKCk7XHJcbiAgICAgICAgdGhpcy5pbml0RnJvbnRTcHJBcnIoKTtcclxuICAgICAgICB0aGlzLnJlbmRlckZyb250U3ByKHRoaXMuX2Zyb250Q29sb3IpO1xyXG4gICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLm9uKEV2ZW50Q2VudHJlLkVUeXBlLlBFUkZPUk1BTkNFX1JFU0NBTEUoKSx0aGlzLHRoaXMucmVTY2FsZSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZHJhdyBiYWNrZ3JvdW5kXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdEJhY2tncm91bmQoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuc2V0UGFyYW0odGhpcy5fcG9zVmVjMi54LHRoaXMuX3Bvc1ZlYzIueSx0aGlzLl9udW1BcnJbMF0ubGVuZ3RoKnRoaXMuX3VuaXRTaXplVmVjMi54LHRoaXMuX251bUFyci5sZW5ndGgqdGhpcy5fdW5pdFNpemVWZWMyLnksdGhpcy5fYmFja0dyb3VuZENvbG9yKTtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uQW5kU2l6ZSgpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZHJhdyBmcm9udFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRGcm9udFNwckFycigpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fZnJvbnRTcHJBcnIgPSBbXTsvL2luaXQgY3VzdFNwckFyclxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9udW1BcnIubGVuZ3RoOyBpICsrKXtcclxuICAgICAgICAgICAgbGV0IHRtcEFycjpDdXN0b21pemVkU3ByaXRlW10gPSBbXTtcclxuICAgICAgICAgICAgZm9yKCBsZXQgaiA9IDA7IGogPCB0aGlzLl9udW1BcnJbMF0ubGVuZ3RoOyBqICsrKXtcclxuICAgICAgICAgICAgICAgIGxldCB0bXBTcHI6Q3VzdG9taXplZFNwcml0ZSA9IG5ldyBDdXN0b21pemVkU3ByaXRlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZENoaWxkKHRtcFNwcik7XHJcbiAgICAgICAgICAgICAgICB0bXBTcHIuc2V0UGFyYW0oMCtqKnRoaXMuX3VuaXRTaXplVmVjMi54LDAraSp0aGlzLl91bml0U2l6ZVZlYzIueSx0aGlzLl91bml0U2l6ZVZlYzIueCx0aGlzLl91bml0U2l6ZVZlYzIueSx0aGlzLl9mcm9udENvbG9yLG5ldyBWZWMyKDEsMSkpO1xyXG4gICAgICAgICAgICAgICAgdG1wU3ByLmxvY2F0aW9uQW5kU2l6ZSgpO1xyXG4gICAgICAgICAgICAgICAgdG1wU3ByLnNldENvbG9yKHRoaXMuX2Zyb250Q29sb3IpO1xyXG4gICAgICAgICAgICAgICAgdG1wU3ByLmNoYW5nZUNvbG9yKCk7XHJcbiAgICAgICAgICAgICAgICB0bXBTcHIuek9yZGVyID0gLTE7XHJcbiAgICAgICAgICAgICAgICB0bXBBcnIucHVzaCh0bXBTcHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2Zyb250U3ByQXJyLnB1c2godG1wQXJyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBjb2xvciBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZW5kZXJGcm9udFNwcihjb2xvcjpzdHJpbmcpe1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9mcm9udFNwckFyci5sZW5ndGg7IGkgKyspe1xyXG4gICAgICAgICAgICBmb3IoIGxldCBqID0gMDsgaiA8IHRoaXMuX2Zyb250U3ByQXJyWzBdLmxlbmd0aDsgaiArKyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9mcm9udFNwckFycltpXVtqXS5zZXRDb2xvcihjb2xvcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9mcm9udFNwckFycltpXVtqXS5jaGFuZ2VDb2xvcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5L+u5pS55YmN5pa55qC85a2Q6aKc6ImyXHJcbiAgICAgKiBAcGFyYW0gcG9zVmVjMiDlvoXkv67mlLnmoLzlrZDlnZDmoIfvvIh4LHnvvIlcclxuICAgICAqIEBwYXJhbSBjb2xvciDnm67moIfpopzoibJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNoYW5nZUZyb250Q29sb3IocG9zVmVjMjpWZWMyLGNvbG9yOnN0cmluZyk6dm9pZHtcclxuICAgICAgICB0aGlzLl9mcm9udFNwckFycltwb3NWZWMyLnldW3Bvc1ZlYzIueF0uc2V0Q29sb3IoY29sb3IpO1xyXG4gICAgICAgIHRoaXMuX2Zyb250U3ByQXJyW3Bvc1ZlYzIueV1bcG9zVmVjMi54XS5jaGFuZ2VDb2xvcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5riF6Zmk5omA5pyJ5bey57uY5Zu+5b2iXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2xlYXJBbGwoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuZ3JhcGhpY3MuY2xlYXIoKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fZnJvbnRTcHJBcnIubGVuZ3RoOyBpICsrKXtcclxuICAgICAgICAgICAgZm9yKCBsZXQgaiA9IDA7IGogPCB0aGlzLl9mcm9udFNwckFyclswXS5sZW5ndGg7IGogKyspe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZnJvbnRTcHJBcnJbaV1bal0uZ3JhcGhpY3MuY2xlYXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmHjeiuvuaji+ebmOe8qeaUvuavlFxyXG4gICAgICogQHBhcmFtIG51bSDnvKnmlL7mr5RcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlU2NhbGUobnVtOm51bWJlcik6dm9pZHtcclxuICAgICAgICB0aGlzLl9zY2FsZSA9IG51bTtcclxuICAgICAgICB0aGlzLl9wb3NWZWMyID0gbmV3IFZlYzIodGhpcy5faW5pdFBvcy54KnRoaXMuX3NjYWxlLHRoaXMuX2luaXRQb3MueSp0aGlzLl9zY2FsZSk7XHJcbiAgICAgICAgdGhpcy5fdW5pdFNpemVWZWMyID0gbmV3IFZlYzIodGhpcy5faW5pdFNpemUueCAqIHRoaXMuX3NjYWxlLHRoaXMuX2luaXRTaXplLnkgKiB0aGlzLl9zY2FsZSk7Ly9yZWNhbGN1bGF0ZSB1bml0U2l6ZVxyXG4gICAgICAgIHRoaXMuY2xlYXJBbGwoKTtcclxuICAgICAgICB0aGlzLmluaXRCYWNrZ3JvdW5kKCk7XHJcbiAgICAgICAgdGhpcy5pbml0RnJvbnRTcHJBcnIoKTtcclxuICAgICAgICB0aGlzLnNldENvbG9yKHRoaXMuX2JhY2tHcm91bmRDb2xvcik7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VDb2xvcigpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyRnJvbnRTcHIodGhpcy5fZnJvbnRDb2xvcik7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBWZWMyIH0gZnJvbSBcIi4uLy4uL0RvZE1hdGhcIjtcclxuXHJcbi8vYXV0aG9yIE5hMkN1QzRPOFxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3VzdG9taXplZFNwcml0ZSBleHRlbmRzIExheWEuU3ByaXRle1xyXG4gICAgcHJpdmF0ZSBfY29sb3I6c3RyaW5nOy8v5Y+v6KeG6IqC54K56aKc6ImyXHJcbiAgICBwcml2YXRlIF9ncmFwaGljU2hpZnQ6VmVjMjsvL+mHjeWPoOe7mOWbvuWBj+enu+mHj1xyXG4gICAgcHJpdmF0ZSBfY2VudHJhbFNoaWZ0Oy8v5Lit5b+D57uY5Zu+5YGP56e76YePXHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjZW50cmFsU2hpZnRDb2xvcmVkKCk6dm9pZHtcclxuICAgICAgICB0aGlzLmdyYXBoaWNzLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5ncmFwaGljcy5kcmF3UmVjdCgtdGhpcy53aWR0aC8yLC10aGlzLmhlaWdodC8yLHRoaXMud2lkdGgsdGhpcy5oZWlnaHQsdGhpcy5fY29sb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gY29sb3IgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRDb2xvcihjb2xvcjpzdHJpbmcpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fY29sb3IgPSBjb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS/ruaUueminOiJslxyXG4gICAgICogQHBhcmFtIGNvbG9yIOebruagh+minOiJslxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2hhbmdlQ29sb3IoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuZ3JhcGhpY3MuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLmdyYXBoaWNzLmRyYXdSZWN0KHRoaXMuX2dyYXBoaWNTaGlmdC54LHRoaXMuX2dyYXBoaWNTaGlmdC55LHRoaXMud2lkdGgtMip0aGlzLl9ncmFwaGljU2hpZnQueCx0aGlzLmhlaWdodC0yKnRoaXMuX2dyYXBoaWNTaGlmdC55LHRoaXMuX2NvbG9yKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruebuOWFs+WPguaVsFxyXG4gICAgICogQHBhcmFtIHBvc1gg6LW35aeLeFxyXG4gICAgICogQHBhcmFtIHBvc1kg6LW35aeLeVxyXG4gICAgICogQHBhcmFtIHdpZHRoIOWuveW6plxyXG4gICAgICogQHBhcmFtIGhlaWdodCDpq5jluqZcclxuICAgICAqIEBwYXJhbSBjb2xvciDpopzoibJcclxuICAgICAqIEBwYXJhbSBncmFwaGljU2hpZnQg5qOL55uY5YGP56e75YC8XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRQYXJhbShwb3NYOm51bWJlciwgcG9zWTpudW1iZXIsIHdpZHRoOm51bWJlciwgaGVpZ2h0Om51bWJlciwgY29sb3I6c3RyaW5nID0gdGhpcy5fY29sb3IsIGdyYXBoaWNTaGlmdDpWZWMyID0gbmV3IFZlYzIoMCwwKSk6dm9pZHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnggPSBwb3NYO1xyXG4gICAgICAgIHRoaXMueSA9IHBvc1k7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuc2V0Q29sb3IoY29sb3IpO1xyXG4gICAgICAgIHRoaXMuX2dyYXBoaWNTaGlmdCA9IGdyYXBoaWNTaGlmdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS/ruaUueWdkOagh+WSjOWkp+Wwj1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9jYXRpb25BbmRTaXplKCk6dm9pZHtcclxuICAgICAgICB0aGlzLnBvcyh0aGlzLngsdGhpcy55KS5zaXplKHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YeN6K6+5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gcG9zVmVjMiDnm67moIflnZDmoIdcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbG9jYXRlKHBvc1ZlYzI6VmVjMik6dm9pZHtcclxuICAgICAgICB0aGlzLnggPSBwb3NWZWMyLng7XHJcbiAgICAgICAgdGhpcy55ID0gcG9zVmVjMi55O1xyXG4gICAgICAgIHRoaXMubG9jYXRpb25BbmRTaXplKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDph43orr7lrr3pq5hcclxuICAgICAqIEBwYXJhbSBzaXplVmVjMiDnm67moIflrr3pq5hcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlU2l6ZShzaXplVmVjMjpWZWMyKTp2b2lke1xyXG4gICAgICAgIHRoaXMud2lkdGggPSBzaXplVmVjMi54O1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gc2l6ZVZlYzIueTtcclxuICAgICAgICB0aGlzLmNoYW5nZUNvbG9yKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57lvZPliY3lm77lvaLotbflp4vlnZDmoIdcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFBvcygpOlZlYzJ7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMyKHRoaXMueCx0aGlzLnkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue5bey57uY5Yy65Z+f5aSn5bCPXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRTaXplKCk6VmVjMntcclxuICAgICAgICByZXR1cm4gbmV3IFZlYzIodGhpcy53aWR0aCx0aGlzLmhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFxyXG4gICAgICog6L+U5Zue5b2T5YmN5bey57uY5Yy65Z+f6aKc6ImyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRDb2xvcigpOnN0cmluZ3tcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29sb3I7XHJcbiAgICB9XHJcbn0iLCIvL2F1dGhvciBOYTJDdUM0TzhcclxuXHJcbmltcG9ydCBBY3RvclJVIGZyb20gXCIuL1N5bWJvbGl6ZWRSZW5kZXJcIjtcclxuaW1wb3J0IHsgS1ZQYWlyIH0gZnJvbSBcIi4uLy4uL0RvZERhdGFTdHJ1Y3R1cmVcIjtcclxuaW1wb3J0IHsgTXlTeW1ib2wgfSBmcm9tIFwiLi4vLi4vLi4vRml4L0ZpeFN5bWJvbFwiO1xyXG5cclxuXHJcbi8v5YKo5a2Y5omA5pyJ57uY5Zu+6IqC54K55a+56LGhXHJcbmV4cG9ydCBjbGFzcyBBY3RvckJveHtcclxuICAgIHB1YmxpYyBzdGF0aWMgQm94OktWUGFpcjxBY3RvclJVPiA9IG5ldyBLVlBhaXIoKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgYWRkKGFjdDpBY3RvclJVLHN5bWI6TXlTeW1ib2wpOnZvaWR7XHJcbiAgICAgICAgQWN0b3JCb3guQm94LmVkaXQoc3ltYi5kYXRhK1wiXCIsYWN0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldChzeW06bnVtYmVyKTpBY3RvclJVe1xyXG4gICAgICAgIHJldHVybiBBY3RvckJveC5Cb3gucmVhZChzeW0rXCJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbn0iLCJpbXBvcnQgeyBWZWMyIH0gZnJvbSBcIi4uL0NvbW1vbi9Eb2RNYXRoXCI7XHJcbmltcG9ydCB7IE15U3ltYm9sIH0gZnJvbSBcIi4uL0ZpeC9GaXhTeW1ib2xcIjtcclxuLy8vLy8vXHJcbmV4cG9ydCBjbGFzcyBFdmVudENlbnRyZXtcclxuICAgIHB1YmxpYyBzdGF0aWMgaW5zdGFuY2U6RXZlbnRDZW50cmU7XHJcbiAgICBwdWJsaWMgc3RhdGljIEVUeXBlOkVUeXBlO1xyXG4gICAgcHVibGljIHN0YXRpYyBpbml0KCk6dm9pZHtcclxuICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZSA9IG5ldyBFdmVudENlbnRyZSgpO1xyXG4gICAgICAgIEV2ZW50Q2VudHJlLkVUeXBlID0gbmV3IEVUeXBlKCk7XHJcbiAgICAgICAgRXZlbnRDZW50cmUuaW5pdCA9ICgpPT57fTtcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBfY2VudHJlOkxheWEuRXZlbnREaXNwYXRjaGVyID0gbmV3IExheWEuRXZlbnREaXNwYXRjaGVyKCk7XHJcblxyXG4gICAgcHVibGljIG9uKHR5cGU6c3RyaW5nLCBjYWxsZXI6YW55LCBsaXN0ZW5lcjpGdW5jdGlvbiwgYXJncz86YW55W10pOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fY2VudHJlLm9uKHR5cGUsY2FsbGVyLGxpc3RlbmVyLGFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBldmVudCh0eXBlOnN0cmluZywgYXJncz86YW55KTp2b2lke1xyXG4gICAgICAgIHRoaXMuX2NlbnRyZS5ldmVudCh0eXBlLGFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvZmYodHlwZTpzdHJpbmcsIGNhbGxlcjphbnksIGxpc3RlbmVyOkZ1bmN0aW9uKXtcclxuICAgICAgICB0aGlzLl9jZW50cmUub2ZmKHR5cGUsIGNhbGxlciwgbGlzdGVuZXIpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCl7fVxyXG59XHJcblxyXG5cclxuY2xhc3MgRVR5cGUge1xyXG4gICAgcHVibGljIExFQVZFKHBvczpWZWMyLCBpZGVudGl0eTpzdHJpbmcpOnN0cmluZ3tcclxuICAgICAgICByZXR1cm4gYCR7aWRlbnRpdHl9OkNPTExJU0lPTl9FVkVOVF9MRUFWRV9GUk9NKCR7cG9zLnh9fCR7cG9zLnl9KWA7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgRU5UUkUocG9zOlZlYzIsIGlkZW50aXR5OnN0cmluZyk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBgJHtpZGVudGl0eX06Q09MTElTSU9OX0VWRU5UX0VOVFJFX1RPKCR7cG9zLnh9fCR7cG9zLnl9KWA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBuZXcgYWRkZWQgZm9yIHBlcmZvcm1hbmNlIHN0YXJ0cyBoZXJlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBQRVJGT1JNQU5DRV9SRVNDQUxFKCk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiBcIlJFU0NBTEVcIjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUEVSRk9STUFOQ0VfVEVYVF9TV0lUQ0goKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIFwiVEVYVF9TV0lUQ0hcIjtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogbmV3IGFkZGVkIGZvciBwZXJmb3JtYW5jZSBlbmRzIGhlcmVcclxuICAgICAqL1xyXG59IiwiaW1wb3J0IHsgVmVjMiwgRG9kTWF0aCB9IGZyb20gXCIuLi9Db21tb24vRG9kTWF0aFwiO1xyXG5pbXBvcnQgeyBBcnJheUFsZ28gfSBmcm9tIFwiLi4vQ29tbW9uL0RvZERhdGFTdHJ1Y3R1cmVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBGaXhSZWN0IGV4dGVuZHMgTGF5YS5SZWN0YW5nbGV7XHJcbiAgICBjb25zdHJ1Y3Rvcih4PzpudW1iZXIsIHk/Om51bWJlciwgd2lkdGg/Om51bWJlciwgaGVpZ2h0PzpudW1iZXIpe1xyXG4gICAgICAgIHN1cGVyKHgseSx3aWR0aCxoZWlnaHQpO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJleHBvcnQgaW50ZXJmYWNlIFN5bWJvbGl6ZWR7XHJcbiAgICBzeW1ib2w6TXlTeW1ib2w7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNeVN5bWJvbHtcclxuICAgIHByaXZhdGUgc3RhdGljIGNvdW50Om51bWJlciA9IDA7XHJcblxyXG4gICAgcHJpdmF0ZSBfZGF0YTpudW1iZXI7XHJcblxyXG4gICAgcHVibGljIGdldCBkYXRhKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IE15U3ltYm9sLmNvdW50O1xyXG4gICAgICAgIE15U3ltYm9sLmNvdW50ICs9IDE7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBGaXhUaW1lIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZnJhbWVSYXRlOiBudW1iZXIgPSA2MDtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZGVsdGFUaW1lOiBudW1iZXIgPSAxIC8gRml4VGltZS5mcmFtZVJhdGU7XHJcbiAgICBwdWJsaWMgc3RhdGljIGZyYW1lQ291bnQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgZWxhcHNlZFRpbWU6IG51bWJlcjsvL+W3sue7j+i/h+eahOaXtumXtFxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmZyYW1lQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuZWxhcHNlZFRpbWUgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZnJhbWVDb3VudCsrO1xyXG4gICAgICAgIHRoaXMuZWxhcHNlZFRpbWUgKz0gdGhpcy5kZWx0YVRpbWU7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5lbGFwc2VkVGltZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEb2RUaW1lcntcclxuXHJcbiAgICBwdWJsaWMgaW50ZXJ2YWw6bnVtYmVyID0gMDtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfbGFzdEFjdDpudW1iZXIgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGludGVydmFsOm51bWJlciA9IDEwMCl7XHJcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IGludGVydmFsO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IHJlYWR5KCk6Ym9vbGVhbntcclxuICAgICAgICByZXR1cm4gRml4VGltZS5lbGFwc2VkVGltZSAtIHRoaXMuX2xhc3RBY3QgPj0gdGhpcy5pbnRlcnZhbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX2xhc3RBY3QgPSBGaXhUaW1lLmVsYXBzZWRUaW1lO1xyXG4gICAgfVxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXHJcbmltcG9ydCBHYW1lIGZyb20gXCIuL1NjZW5lU2NyaXB0L0dhbWVcIlxuaW1wb3J0IExvYWRpbmcgZnJvbSBcIi4vU2NlbmVTY3JpcHQvTG9hZGluZ1wiXHJcbi8qXHJcbiog5ri45oiP5Yid5aeL5YyW6YWN572uO1xyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ29uZmlne1xyXG4gICAgc3RhdGljIHdpZHRoOm51bWJlcj0xODAwO1xyXG4gICAgc3RhdGljIGhlaWdodDpudW1iZXI9OTAwO1xyXG4gICAgc3RhdGljIHNjYWxlTW9kZTpzdHJpbmc9XCJub3NjYWxlXCI7XHJcbiAgICBzdGF0aWMgc2NyZWVuTW9kZTpzdHJpbmc9XCJub25lXCI7XHJcbiAgICBzdGF0aWMgYWxpZ25WOnN0cmluZz1cInRvcFwiO1xyXG4gICAgc3RhdGljIGFsaWduSDpzdHJpbmc9XCJsZWZ0XCI7XHJcbiAgICBzdGF0aWMgc3RhcnRTY2VuZTphbnk9XCJMb2FkaW5nU2NlbmUuc2NlbmVcIjtcclxuICAgIHN0YXRpYyBzY2VuZVJvb3Q6c3RyaW5nPVwiXCI7XHJcbiAgICBzdGF0aWMgZGVidWc6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBzdGF0OmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgcGh5c2ljc0RlYnVnOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgZXhwb3J0U2NlbmVUb0pzb246Ym9vbGVhbj10cnVlO1xyXG4gICAgY29uc3RydWN0b3IoKXt9XHJcbiAgICBzdGF0aWMgaW5pdCgpe1xyXG4gICAgICAgIHZhciByZWc6IEZ1bmN0aW9uID0gTGF5YS5DbGFzc1V0aWxzLnJlZ0NsYXNzO1xyXG4gICAgICAgIHJlZyhcIlNjZW5lU2NyaXB0L0dhbWUudHNcIixHYW1lKTtcbiAgICAgICAgcmVnKFwiU2NlbmVTY3JpcHQvTG9hZGluZy50c1wiLExvYWRpbmcpO1xyXG4gICAgfVxyXG59XHJcbkdhbWVDb25maWcuaW5pdCgpOyIsImltcG9ydCB7IENvbGlFbWl0IH0gZnJvbSBcIi4vQWN0b3JNb2R1bGVzL0NvbGlNZXNzYWdlXCI7XHJcbmltcG9ydCB7IFByb2ZpbGUgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvUHJvZmlsZVwiO1xyXG5pbXBvcnQgeyBTeW1ib2xpemVkLCBNeVN5bWJvbCB9IGZyb20gXCIuLi8uLi9GaXgvRml4U3ltYm9sXCI7XHJcbmltcG9ydCB7IEJ1ZmYgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvQnVmZlwiO1xyXG5pbXBvcnQgeyBBdGtTdGF0ZU1hY2hpbmUgfSBmcm9tIFwiLi9BdHRhY2svQXRrQWJzdFwiO1xyXG5pbXBvcnQgeyBEYW1hZ2UgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvRGFtYWdlXCI7XHJcbmltcG9ydCB7IEFjdG9yVHlwZSB9IGZyb20gXCIuLi8uLi9Db21tb24vRG9kS2V5XCI7XHJcbmltcG9ydCBBY3RvclN0YXRlTWdyLCB7IEFjdG9yU3RhdGVJRCB9IGZyb20gXCIuL1N0YXRlL0FjdG9yU3RhdGVGc21cIjtcclxuaW1wb3J0IHsgQWN0b3JCdWZmTWdyIH0gZnJvbSBcIi4vQWN0b3JNb2R1bGVzL0FjdG9yQnVmZk1nclwiO1xyXG5pbXBvcnQgeyBUcmFuc2Zvcm0gfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvVHJhbnNmb3JtXCI7XHJcbmltcG9ydCB7IFVuaXRSZW5kZXIgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvVW5pdFJlbmRlclwiO1xyXG5pbXBvcnQgeyBBbmltYXRpb24gfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvQW5pbWF0aW9uXCI7XHJcbmltcG9ydCBSb3V0ZSBmcm9tIFwiLi9BY3RvclJvdXRlXCI7XHJcbmltcG9ydCB7IEFjdG9yU2tpbGwgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvQWN0b3JTa2lsbFwiO1xyXG5pbXBvcnQgeyBBY3RvckNvc3QgfSBmcm9tIFwiLi9BY3Rvck1vZHVsZXMvQWN0b3JDb3N0XCI7XHJcbmltcG9ydCB7IEJsb2NrZXIgfSBmcm9tIFwiLi9BdHRhY2svQmxvY2tlclwiO1xyXG5pbXBvcnQgeyBWZWMyIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9Eb2RNYXRoXCI7XHJcbmltcG9ydCBHYW1lQmF0dGxlIGZyb20gXCIuLi9HYW1lQmF0dGxlXCI7XHJcblxyXG5cclxuXHJcblxyXG5cclxuLy/ln7rmnKzljp/liJnvvJrlsJHnlKjnu6fmib/vvIzlpJrnlKjnu4TlkIhcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWN0b3IgaW1wbGVtZW50cyBTeW1ib2xpemVke1xyXG4gICAgcHVibGljIHN5bWJvbDogTXlTeW1ib2w7IC8v5YWo5bGA5ZSv5LiA55qE5qCH6K+G5pWw5a2XXHJcbiAgICBwdWJsaWMgdHlwZTogQWN0b3JUeXBlID0gQWN0b3JUeXBlLk5vbmU7IC8v6buY6K6k6Lqr5Lu95Li6QWN0b3JcclxuXHJcbiAgICBwdWJsaWMgc3RhdGU6IEFjdG9yU3RhdGVNZ3I7IC8v54q25oCB5py6IOe7n+etueeKtuaAgeabtOaWsFxyXG5cclxuICAgIHB1YmxpYyBwcm9maWxlOlByb2ZpbGU7Ly/ln7rmnKzlsZ7mgKfkuI7orr/pl67mlrnms5XlkIjpm4ZcclxuXHJcbiAgICBwdWJsaWMgYXRrOiBBdGtTdGF0ZU1hY2hpbmU7Ly/mlLvlh7vnirbmgIHmnLpcclxuICAgIHB1YmxpYyBjb2xpRW1pdDpDb2xpRW1pdCA9IG5ldyBDb2xpRW1pdCgwLDAsQ29saUVtaXQuR0xPQkFMX1VOSVRfU1VCV0lEVEgsQ29saUVtaXQuR0xPQkFMX1VOSVRfU1VCSEVJR0hUKTsvL+eisOaSnuS6i+S7tuWPkeW4g+iAhVxyXG4gICAgcHVibGljIGJsb2NrZXI6QmxvY2tlcjsvL+mYu+aMoeaooeWdl1xyXG4gICAgcHVibGljIGJ1ZmZNZ3I6QWN0b3JCdWZmTWdyO1xyXG4gICAgcHVibGljIHRyYW5zZm9ybTpUcmFuc2Zvcm07XHJcbiAgICBwdWJsaWMgcmVuZGVyOlVuaXRSZW5kZXI7XHJcbiAgICBwdWJsaWMgYW5pbWF0aW9uOkFuaW1hdGlvbjtcclxuICAgIHB1YmxpYyByb3V0ZTpSb3V0ZTsvL+i3r+W+hOWvueixoVxyXG4gICAgcHVibGljIHNraWxsOkFjdG9yU2tpbGw7XHJcbiAgICBwdWJsaWMgY29zdDpBY3RvckNvc3Q7XHJcblxyXG4gICAgLy9UT0RP77ya5Y675YyF5LiA5Liq57uE5Lu2XHJcbiAgICAvLyAvKipcclxuICAgIC8vICAqIOebruagh+mAieaLqeWZqFxyXG4gICAgLy8gICovXHJcbiAgICAvLyBwdWJsaWMgc2Vla2VyOiBTZWVrZXI7XHJcblxyXG4gICAgLy8gLypcclxuICAgIC8vICog5b2T5YmN6ZSB5a6a55uu5qCHXHJcbiAgICAvLyAqICovXHJcbiAgICAvLyBwdWJsaWMgZm9jdXM6IEFjdG9yO1xyXG5cclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IodHlwZTogQWN0b3JUeXBlLCByZXM6IGFueSkge1xyXG4gICAgICAgIHJlc1sneHh4J10gPSAxMTQ1MTQxOTE5ODEwO1xyXG5cclxuICAgICAgICB0aGlzLnN5bWJvbCA9IG5ldyBNeVN5bWJvbCgpO1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IG5ldyBBY3RvclN0YXRlTWdyKHRoaXMpO1xyXG4gICAgICAgIC8vIGFjY29yZGluZyB0byBkaWZmZXJlbnQgdHlwZSwgYWRkIGRpZmZlcmVudCBjb21wb25lbnRzIHRvIHRoaXMgYWN0b3IuIFxyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtID0gbmV3IFRyYW5zZm9ybSh0aGlzKTtcclxuICAgICAgICB0aGlzLnByb2ZpbGUgPSBuZXcgUHJvZmlsZSh0aGlzLCByZXNbJ3h4eCddKTsgXHJcbiAgICAgICAgdGhpcy5hdGsgPSBuZXcgQXRrU3RhdGVNYWNoaW5lKHRoaXMsIHJlc1sneHh4J10pO1xyXG4gICAgICAgIHRoaXMuYmxvY2tlciA9IG5ldyBCbG9ja2VyKHRoaXMsIHJlc1sneHh4J10pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuYnVmZk1nciA9IG5ldyBBY3RvckJ1ZmZNZ3IodGhpcywgcmVzWyd4eHgnXSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5yZW5kZXIgPSBuZXcgVW5pdFJlbmRlcih0aGlzKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IG5ldyBBbmltYXRpb24odGhpcywgcmVzWyd4eHgnXSk7XHJcbiBcclxuICAgICAgICBpZiAoQWN0b3JUeXBlLk1vbnN0ZXIgPT0gdGhpcy50eXBlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGUgPSBuZXcgUm91dGUodGhpcywgcmVzWyd4eHgnXSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoQWN0b3JUeXBlLk9wZXJhdG9yID09IHRoaXMudHlwZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNraWxsID0gbmV3IEFjdG9yU2tpbGwodGhpcywgcmVzWyd4eHgnXSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmNvc3QgPSBuZXcgQWN0b3JDb3N0KHRoaXMpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGF3YWtlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGUucnVuU3RhdGUoQWN0b3JTdGF0ZUlELlByZXBhcmVkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGUudXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIC8vIHJlc2V0IGNsZWFyIHJlc291cmNlIHJlbGF0ZWQgbW9kdWxlXHJcbiAgICAgICAgLy8gdGhpcy5yZW5kZXIucmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWwhuatpOWvueixoeiuvue9ruWIsOWcuuS4ilxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0T25NYXAocG9zOlZlYzIpOiB2b2lkIHtcclxuICAgICAgICAvL3RvZG86IOWQr+WKqOaooeWdl1xyXG4gICAgICAgIHRoaXMuYXRrLm9uRGVwbG95KHBvcyk7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ub25EZXBsb3kocG9zKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnN0YXRlLnJ1blN0YXRlKEFjdG9yU3RhdGVJRC5Cb3JuKTtcclxuICAgICAgICAvL1RPRE9cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0UG9zaXRpb24oKTogdm9pZCB7XHJcbiAgICAgICAgLy9UT0RPXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmlLvlh7vkuIDkuKrmiJblpJrkuKpBY3Rvcuebruagh1xyXG4gICAgICogMjAyMC8zLzUg5pS75Ye76YC76L6R5bey5LuO5LqL5Lu26Kem5Y+R5pS55Li655u05o6l6LCD55SoXHJcbiAgICAgKiDlj5HotbflkozmjqXmlLbmlLvlh7vnmoTpgLvovpHlnYflsIHoo4XlnKhBY3Rvcuexu+S4rVxyXG4gICAgICogQHBhcmFtIHZpY3RpbSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGF0dGFjayguLi52aWN0aW06QWN0b3JbXSk6dm9pZHtcclxuICAgICAgICBsZXQgZG1nOkRhbWFnZSA9IHRoaXMucHJvZmlsZS5nZW5lcmF0ZURhbWFnZSh0aGlzKTtcclxuXHJcbiAgICAgICAgdmljdGltLmZvckVhY2goZWxlPT57XHJcbiAgICAgICAgICAgIHRoaXMuYmVBdHRhY2tlZChkbWcuY29weSgpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDooqvmlLvlh7tcclxuICAgICAqIEBwYXJhbSBkYW1hZ2UgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBiZUF0dGFja2VkKGRhbWFnZTpEYW1hZ2UpOnZvaWR7XHJcbiAgICAgICAgLy9AdG9kb1xyXG4gICAgICAgIC8v5YeP5bCR55Sf5ZG95YC8XHJcbiAgICAgICAgLy/lj5Hlh7rmlLvlh7vkuovku7ZcclxuICAgICAgICAvL++8iOWPr+iDve+8ieWPkeWHuuatu+S6oeS6i+S7tlxyXG4gICAgfVxyXG4gICAgXHJcblxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IEFjdG9yIGZyb20gXCIuL0FjdG9yXCI7XHJcbmltcG9ydCB7IEFjdG9yVHlwZSB9IGZyb20gXCIuLi8uLi9Db21tb24vRG9kS2V5XCI7XHJcbmltcG9ydCB7IEFjdG9yU3RhdGVJRCB9IGZyb20gXCIuL1N0YXRlL0FjdG9yU3RhdGVGc21cIjtcclxuaW1wb3J0IHsgQ29saVJlY2VpdmVyIH0gZnJvbSBcIi4vQWN0b3JNb2R1bGVzL0NvbGlNZXNzYWdlXCI7XHJcbmltcG9ydCBSaG9kZXNHYW1lIGZyb20gXCIuLi9SaG9kZXNHYW1lXCI7XHJcbmltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL0RvZE1hdGhcIjtcclxuaW1wb3J0IEdhbWVVSUV2ZW50IGZyb20gXCIuLi9HYW1lVUlFdmVudFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWN0b3JNZ3Ige1xyXG5cclxuICAgIHB1YmxpYyBhY3RvcnM6IEFjdG9yW107XHJcbiAgICBwdWJsaWMgc2lkZUJhcjogQWN0b3JbXT1bXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmFjdG9ycyA9IFtdO1xyXG5cclxuICAgICAgICAvL3Rlc3RcclxuICAgICAgICBsZXQgY3JlYXRFbmVteTpGdW5jdGlvbiA9ICh0aW1lOm51bWJlcltdKT0+e1xyXG4gICAgICAgICAgICB0aW1lLmZvckVhY2goZWxlPT57XHJcbiAgICAgICAgICAgICAgICBMYXlhLnRpbWVyLm9uY2UoZWxlLCB0aGlzLCAoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuYWN0b3JzLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUFjdG9yKEFjdG9yVHlwZS5Nb25zdGVyLCB7fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RvcnNbaW5kZXhdLnN0YXRlLnJ1blN0YXRlKEFjdG9yU3RhdGVJRC5XYWxrKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY3JlYXRlQWN0b3IoQWN0b3JUeXBlLk1vbnN0ZXIsIHt9KTtcclxuICAgICAgICAvLyB0aGlzLmFjdG9yc1swXS5zdGF0ZS5ydW5TdGF0ZShBY3RvclN0YXRlSUQuV2Fsayk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVBY3RvcihBY3RvclR5cGUuT3BlcmF0b3IsIHt9KTtcclxuICAgICAgICB0aGlzLmFjdG9yc1sxXS5hd2FrZSgpO1xyXG4gICAgICAgIEdhbWVVSUV2ZW50LmZ1Y2sgPSB0aGlzLmFjdG9yc1sxXS5zeW1ib2wuZGF0YTtcclxuICAgICAgICAvLyBjcmVhdEVuZW15KFszMDAsNjAwLDkwMF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0KHJlczogYW55KSB7XHJcbiAgICAgICAgdGhpcy5faW5pdEVuZW15KHJlcyk7XHJcbiAgICAgICAgdGhpcy5faW5pdE9wcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXdha2UoKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYWN0b3IgPSB0aGlzLmFjdG9yc1tpXTtcclxuICAgICAgICAgICAgYWN0b3IuYXdha2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYWN0b3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhY3RvciA9IHRoaXMuYWN0b3JzW2ldO1xyXG4gICAgICAgICAgICBhY3Rvci51cGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgUmhvZGVzR2FtZS5JbnN0YW5jZS5iYXR0bGUubWFwTm9kZUNQVS5yZW5kZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYWN0b3IgPSB0aGlzLmFjdG9yc1tpXTtcclxuICAgICAgICAgICAgYWN0b3IucmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNyZWF0ZUFjdG9yKHR5cGU6IEFjdG9yVHlwZSwgcmVzOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBsZXQgYWN0b3IgPSBuZXcgQWN0b3IodHlwZSwgcmVzKTtcclxuICAgICAgICB0aGlzLmFjdG9ycy5wdXNoKGFjdG9yKTtcclxuICAgICAgICBpZiAodHlwZSA9PSBBY3RvclR5cGUuT3BlcmF0b3IpIHtcclxuICAgICAgICAgICAgdGhpcy5zaWRlQmFyLnB1c2goYWN0b3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QWN0b3JCeUlEKElEOiBudW1iZXIpOiBBY3RvciB8IG51bGwge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hY3RvcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGFjdG9yID0gdGhpcy5hY3RvcnNbaV07XHJcbiAgICAgICAgICAgIGlmIChJRCA9PSBhY3Rvci5zeW1ib2wuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjdG9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZXBsb3lPcHJ0KGlkOm51bWJlciwgcG9zOlZlYzIpOnZvaWR7XHJcbiAgICAgICAgbGV0IG9wcnQ6QWN0b3IgPSB0aGlzLmdldEFjdG9yQnlJRChpZCk7XHJcblxyXG4gICAgICAgIGlmIChvcHJ0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbihcIkRlcGxvdGluZyBOb25lIEV4aXN0aW5nIE9wZXJhdG9yXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9wcnQuc3RhdGUuY3VycmVudFN0YXRlVHlwZSAhPSBBY3RvclN0YXRlSUQuUHJlcGFyZWQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbihcIkRlcGxveWluZyBOb25lIFByZXBhcmVkIE9wZXJhdG9yXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9wcnQudHlwZSAhPSBBY3RvclR5cGUuT3BlcmF0b3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbihcIkRlcGxveWluZyBOb25lIE9wZXJhdG9yIEFjdG9yXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb3BydC5zZXRPbk1hcChwb3MpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9pbml0RW5lbXkocmVzOiBhbnkpIHtcclxuICAgICAgICAvL1RPRE8gdXNlIGxldmVsIHJlcyBkYXRhIGluaXQgZW5lbXkgYWN0b3JzXHJcbiAgICAgICAgLy9lZy5cclxuICAgICAgICAvL2xldCBlbmVteVJlcyA9IHJlc1sneHh4eHgnXTtcclxuICAgICAgICAvL2FjdG9yID0gdGhpcy5jcmVhdGVBY3RvcihBY3RvclR5cGUuRW5lbXkgLGVuZW15UmVzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfaW5pdE9wcnQoKSB7XHJcbiAgICAgICAgLy9UT0RPIHVzZSBwcmUgY2hvb3NlIG9wcnQgbGlzdCB0byBpbml0IHNlbGYgYWN0b3JzXHJcbiAgICAgICAgLy9sZXQgYXJyYXkgPSBSaG9kZXNHYW1lcy5JbnN0YW5jZS5nYW1lZGF0YS5jdXJyZW50Rm9ybWF0aW9uO1xyXG4gICAgICAgIC8vZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIC8vICAgbGV0IGlkID0gYXJyYXlbaV07XHJcbiAgICAgICAgLy8gICBsZXQgcmVzID0gRG9kUmVzb3VyY2VNZ3IuSW5zdGFuY2UuZ2V0Q3VycmVudE9wZXJhcm9yRGF0YUJ5SUQoaWQpO1xyXG4gICAgICAgIC8vICAgbGV0IGFjdG9yID0gdGhpcy5jcmVhdGVBY3RvcihBY3RvclR5cGUuT3BlcmF0b3IsIHJlcylcclxuICAgICAgICAvL31cclxuICAgIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9BY3RvclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFjdG9yQnVmZk1ncntcclxuICAgIGNvbnN0cnVjdG9yKGtlZXBlcjpBY3RvciwgcmVzOmFueSl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQWN0b3JDb3N0e1xyXG4gICAgY29uc3RydWN0b3Ioa2VlcGVyOkFjdG9yKXtcclxuICAgICAgICBcclxuICAgIH1cclxufSIsImltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuaW1wb3J0IHsgRG9kVGltZXIgfSBmcm9tIFwiLi4vLi4vLi4vRml4L0ZpeFRpbWVcIjtcclxuaW1wb3J0IHsgQXR0YWNrSW50ZXJlc3RlZE1vZHVsZSwgRGVwbG95SW50ZXJlc3RlZE1vZHVsZSB9IGZyb20gXCIuL01vZHVsZUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBWZWMyIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Eb2RNYXRoXCI7XHJcblxyXG5lbnVtIFNraWxsVGltaW5ne1xyXG4gICAgQXV0b21hdGljLFxyXG4gICAgTWFudWFsLFxyXG4gICAgT25BdGssXHJcbiAgICBOb25lXHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEFjdG9yU2tpbGwgaW1wbGVtZW50cyBBdHRhY2tJbnRlcmVzdGVkTW9kdWxlLCBEZXBsb3lJbnRlcmVzdGVkTW9kdWxle1xyXG5cclxuICAgIFxyXG4gICAgXHJcbiAgICDliKDlh73mlbAoKTogdm9pZCB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfdGltaW5nVHlwZTpTa2lsbFRpbWluZyA9IFNraWxsVGltaW5nLk1hbnVhbDtcclxuXHJcbiAgICBwcml2YXRlIF9rZWVwZXI6QWN0b3I7XHJcbiAgICBwcml2YXRlIF9yZW1haW5UaW1lcjpEb2RUaW1lcjtcclxuICAgIHByaXZhdGUgX3JlbWFpblRpbWU6bnVtYmVyID0gMTU7XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2FpblB0RnJvbUF0ayA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfZ2FpblB0RnJvbVRpbWUgPSB0cnVlO1xyXG4gICAgcHJpdmF0ZSBfZ2FpblB0RnJvbURlZiA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgX21heFB0ID0gMzk7XHJcbiAgICBwcml2YXRlIF9pbml0UHQgPSAxNTtcclxuICAgIHByaXZhdGUgX2N1cnJlbnRQdCA9IDA7XHJcbiAgICBwcml2YXRlIF9hdXRvUmVjb3ZlclRpbWVyID0gbmV3IERvZFRpbWVyKDEpO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgaXNBY3RpdmF0ZWQoKTpib29sZWFue3JldHVybiBmYWxzZTt9XHJcblxyXG4gICAgY29uc3RydWN0b3Ioa2VlcGVyOkFjdG9yLCByZXM6YW55KXtcclxuICAgICAgICB0aGlzLl9rZWVwZXIgPSBrZWVwZXI7XHJcbiAgICAgICAgdGhpcy5fcmVtYWluVGltZXIgPSBuZXcgRG9kVGltZXIoMTAwKTtcclxuICAgICAgICAvKlxyXG4gICAgICAgIC8vdG9kbzog5qC55o2ucmVz5p2l5L+u5pS55q2k5a+56LGh5Lit55qE5bGe5oCnXHJcbiAgICAgICAg6buY6K6k5pWw5YC85piv6IO95aSp5L2/55qEN+e6p+S6jOaKgOiDvVxyXG4gICAgICAgICovXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOnZvaWR7XHJcbiAgICAgICAgLy/lsJ3or5XmjInml7bpl7Tojrflj5bmioDog73ngrlcclxuICAgICAgICBpZiAodGhpcy5fZ2FpblB0RnJvbVRpbWUgJiYgdGhpcy5fYXV0b1JlY292ZXJUaW1lci5yZWFkeSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50UHQgKz0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5bCd6K+V6Ieq5Yqo6Kem5Y+RXHJcbiAgICAgICAgaWYgKHRoaXMuX3RpbWluZ1R5cGUgPT0gU2tpbGxUaW1pbmcuQXV0b21hdGljICYmIHRoaXMuX2N1cnJlbnRQdD49dGhpcy5fbWF4UHQpIHtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYmVmb3JlQXRrKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIHRocm93IG5ldyBFcnJvcihcIk1ldGhvZCBub3QgaW1wbGVtZW50ZWQuXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZnRlckF0aygpOiB2b2lkIHtcclxuICAgICAgICAvL2RvIG5vdGhpbmdcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWN0aXZhdGUoKTp2b2lke1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0ZXJtaW5hdGUoKTp2b2lke1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25EZXBsb3kocG9zOiBWZWMyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY3VycmVudFB0ID0gdGhpcy5faW5pdFB0O1xyXG4gICAgICAgIHRoaXMuX2F1dG9SZWNvdmVyVGltZXIucmVzZXQoKTtcclxuICAgICAgICAvLyB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2Qgbm90IGltcGxlbWVudGVkLlwiKTtcclxuICAgIH1cclxufSIsImltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBbmltYXRpb257XHJcbiAgICBjb25zdHJ1Y3RvcihrZWVwZXI6QWN0b3IsIHJlczphbnkpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgVmVjMiwgRG9kTWF0aCB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vRG9kTWF0aFwiO1xyXG5pbXBvcnQgeyBGaXhSZWN0IH0gZnJvbSBcIi4uLy4uLy4uL0ZpeC9GaXhSZWN0XCI7XHJcbmltcG9ydCB7IEFycmF5QWxnbyB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vRG9kRGF0YVN0cnVjdHVyZVwiO1xyXG5pbXBvcnQgeyBFdmVudENlbnRyZSB9IGZyb20gXCIuLi8uLi8uLi9FdmVudC9FdmVudENlbnRyZVwiO1xyXG5pbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcbmltcG9ydCB7IEFjdG9yVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vRG9kS2V5XCI7XHJcblxyXG4vKipcclxuICog56Kw5pKe5raI5oGv5Y+R5biD6ICFXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29saUVtaXR7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEdMT0JBTF9VTklUX1dJRFRIOm51bWJlciA9IDEwMDsvL+WFqOWxgOWNleS9jeWuvVxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBHTE9CQUxfVU5JVF9IRUlHSFQ6bnVtYmVyID0gMTAwOy8v5YWo5bGA5Y2V5L2N6auYXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEdMT0JBTF9VTklUX1NVQldJRFRIOm51bWJlciA9IDkwOy8v5YWo5bGA5YaF6YOo5Y2V5L2N5a69XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEdMT0JBTF9VTklUX1NVQkhFSUdIVDpudW1iZXIgPSA5MDsvL+WFqOWxgOWGhemDqOWNleS9jemrmFxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBHTE9CQUxfVU5JVF9SU0hJRlQ6bnVtYmVyID0gNTsvL+WFqOWxgOWNleS9jeWQkeWPs+WBj+enu1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBHTE9CQUxfVU5JVF9CU0hJRlQ6bnVtYmVyID0gNTsvL+WFqOWxgOWNleS9jeWQkeS4i+WBj+enu1xyXG5cclxuICAgIHByaXZhdGUgX3JlYzpGaXhSZWN0O1xyXG4gICAgXHJcbiAgICBwcml2YXRlIF9wYXN0U2V0OlZlYzJbXSA9IFtdOy8v5q2k5pa55Z2X5LiK5LiA5qyh5a2Y5Zyo5LqO5ZOq5LiA54K5XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57miYDmnInnm67liY3oh6rouqvmiYDlpITnmoTmlrnmoLxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBmaW5kSW50ZXJzZWN0KCk6VmVjMltde1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IFtcclxuICAgICAgICAgICAgbGVmdCxcclxuICAgICAgICAgICAgdG9wLFxyXG4gICAgICAgICAgICByaWdodCxcclxuICAgICAgICAgICAgYm90dG9tXHJcbiAgICAgICAgXSA9IFtcclxuICAgICAgICAgICAgRG9kTWF0aC5pbnREaXZpc2lvbih0aGlzLl9yZWMueCxDb2xpRW1pdC5HTE9CQUxfVU5JVF9XSURUSCksXHJcbiAgICAgICAgICAgIERvZE1hdGguaW50RGl2aXNpb24odGhpcy5fcmVjLnksQ29saUVtaXQuR0xPQkFMX1VOSVRfSEVJR0hUKSxcclxuICAgICAgICAgICAgRG9kTWF0aC5pbnREaXZpc2lvbih0aGlzLl9yZWMucmlnaHQsQ29saUVtaXQuR0xPQkFMX1VOSVRfV0lEVEgpLFxyXG4gICAgICAgICAgICBEb2RNYXRoLmludERpdmlzaW9uKHRoaXMuX3JlYy5ib3R0b20sQ29saUVtaXQuR0xPQkFMX1VOSVRfSEVJR0hUKVxyXG4gICAgICAgIF1cclxuXHJcbiAgICAgICAgbGV0IHJlc3VsdDpWZWMyW10gPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaG9yaTpudW1iZXIgPSBsZWZ0OyBob3JpIDw9IHJpZ2h0OyBob3JpICs9IDEpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgdmVydGk6bnVtYmVyID0gdG9wOyB2ZXJ0aSA8PSBib3R0b207IHZlcnRpICs9IDEpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBWZWMyKGhvcmksIHZlcnRpKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcG9zKHg6bnVtYmVyLCB5Om51bWJlcik6Q29saUVtaXR7XHJcbiAgICAgICAgdGhpcy5fcmVjLnggPSB4O1xyXG4gICAgICAgIHRoaXMuX3JlYy55ID0geTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcG9zQnlWZWModmVjOlZlYzIpOkNvbGlFbWl0e1xyXG4gICAgICAgIHRoaXMuX3JlYy54ID0gdmVjLng7XHJcbiAgICAgICAgdGhpcy5fcmVjLnkgPSB2ZWMueTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2l6ZSh3aWR0aDpudW1iZXIsIGhlaWdodDpudW1iZXIpOkNvbGlFbWl0e1xyXG4gICAgICAgIHRoaXMuX3JlYy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuX3JlYy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGV2ZW50KHB1Ymxpc2hlcj86YW55LCBpZGVudGl0eTpBY3RvclR5cGUgPSBBY3RvclR5cGUuTm9uZSk6dm9pZHtcclxuICAgICAgICBsZXQgY3VycmVudDpWZWMyW10gPSB0aGlzLmZpbmRJbnRlcnNlY3QoKTsvL+W9k+WJjeeisOaSnumbhuWQiFxyXG4gICAgICAgIC8vdGhpcy5fcGFzdFNldC8v5Y6G5Y+y56Kw5pKe6ZuG5ZCIXHJcbiAgICAgICAgLy/nprvlvIDvvJrlpITkuo7ljoblj7LnorDmkp7pm4blkIjvvIzkvYbkuI3lpITkuo7lvZPliY3norDmkp7pm4blkIjnmoTlhYPntKBcclxuICAgICAgICBsZXQgbGVhdmU6VmVjMltdID0gQXJyYXlBbGdvLmZpbmRDb21wbGVtZW50U2V0KHRoaXMuX3Bhc3RTZXQsIGN1cnJlbnQpIGFzIFZlYzJbXTtcclxuICAgICAgICAvL+i/m+WFpe+8muWkhOS6juW9k+WJjeeisOaSnumbhuWQiO+8jOS9huS4jeWkhOS6juWOhuWPsueisOaSnumbhuWQiOeahOWFg+e0oFxyXG4gICAgICAgIGxldCBlbnRyZTpWZWMyW10gPSBBcnJheUFsZ28uZmluZENvbXBsZW1lbnRTZXQoY3VycmVudCwgdGhpcy5fcGFzdFNldCkgYXMgVmVjMltdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8v5Y+R5biD5LqL5Lu2XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCLnprvlvIBcIik7XHJcbiAgICAgICAgbGVhdmUuZm9yRWFjaChlbGU9PntcclxuICAgICAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2UuZXZlbnQoRXZlbnRDZW50cmUuRVR5cGUuTEVBVkUoZWxlLCBgJHtpZGVudGl0eX1gKSwgcHVibGlzaGVyKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCLov5vlhaVcIik7XHJcbiAgICAgICAgZW50cmUuZm9yRWFjaChlbGU9PntcclxuICAgICAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2UuZXZlbnQoRXZlbnRDZW50cmUuRVR5cGUuRU5UUkUoZWxlLCBgJHtpZGVudGl0eX1gKSwgcHVibGlzaGVyKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fcGFzdFNldCA9IGN1cnJlbnQ7Ly/mm7TmlrDljoblj7LnorDmkp7pm4blkIjkuLrlvZPliY3norDmkp7pm4blkIhcclxuICAgIH07XHJcblxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOWPkeW4g+emu+W8gOW9k+WJjeWtmOWcqOeahOaJgOacieWdkOagh+eahOS6i+S7tlxyXG4gICAgICogQHBhcmFtIHB1Ymxpc2hlciBcclxuICAgICAqIEBwYXJhbSBpZGVudGl0eSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGV2ZW50TGVhdmVBbGwocHVibGlzaGVyPzphbnksIGlkZW50aXR5OkFjdG9yVHlwZSA9IEFjdG9yVHlwZS5Ob25lKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX3Bhc3RTZXQuZm9yRWFjaCh2ZWM9PntcclxuICAgICAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2UuZXZlbnQoRXZlbnRDZW50cmUuRVR5cGUuTEVBVkUodmVjLCBgJHtpZGVudGl0eX1gKSwgcHVibGlzaGVyKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4Om51bWJlcix5Om51bWJlcix3aWR0aDpudW1iZXIgPSBDb2xpRW1pdC5HTE9CQUxfVU5JVF9TVUJXSURUSCwgaGVpZ2h0Om51bWJlciA9IENvbGlFbWl0LkdMT0JBTF9VTklUX1NVQkhFSUdIVCl7XHJcbiAgICAgICAgdGhpcy5fcmVjID0gbmV3IEZpeFJlY3QoeCx5LHdpZHRoLGhlaWdodCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDnorDmkp7mtojmga/mjqXmlLbogIVcclxuICog5Y+v5Lul6YCa6L+Hc2V0RGV0ZWN0aW9u55uR5o6n5oyH5a6a54K577yM5oyH5a6aSWRlbnRpdHnnmoTov5vlhaXlkoznprvlvIDkuovku7ZcclxuICog5Y+v5Lul6YCa6L+Hb2ZmRGV0ZWN0aW9u5pKk6ZSA5oyH5a6a54K555qE55uR5o6nXHJcbiAqIOi/meS4quS4jeiDveebtOaOpeeUqO+8jOimgee7p+aJv+S4gOWxguaKim9uTGVhdmXlkoxvbkVudHJl5Ye95pWw6YeN5YaZ5LmL5ZCO5omN6IO955SoXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ29saVJlY2VpdmVye1xyXG4gICAgLypcclxuICAgIOi/memHjOeahOS7u+S9leefqemYtemDveWPr+S7peeUqOmUruWAvOWvueabv+S7o+OAgnjkuI555Lik5Liq5Y+C5pWw5Y+v5Lul55Sf5oiQ5rC45LiN6YeN5aSN55qE6ZSuXHJcblxyXG4gICAgKi9cclxuICAgIHByaXZhdGUgX2RldGVjdGlvbk1hdHJpeDpib29sZWFuW11bXSA9IFtdOy8v6K6w5b2V5ZOq5Liq5Z2Q5qCH5bey6KKr55uR5o6nXHJcbiAgICBwcml2YXRlIGRldGVjdGlvbkV4aXN0KHBvc2l0aW9uOlZlYzIpOmJvb2xlYW57Ly/mn6XnnIvmn5DkuKrlnZDmoIfmmK/lkKblt7Looqvnm5HmjqdcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGV0ZWN0aW9uTWF0cml4W3Bvc2l0aW9uLnhdW3Bvc2l0aW9uLnldO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfY2FuY2VsbGF0aW9uTWF0cml4OkZ1bmN0aW9uW11bXVtdID0gW107Ly/lrZjmlL7nlKjkuo7lj5bmtojnm5HlkKznmoTlh73mlbBcclxuICAgIHByaXZhdGUgX3dpZHRoOm51bWJlcjtcclxuICAgIHByaXZhdGUgX2hlaWdodDpudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3Iod2lkdGg6bnVtYmVyLCBoZWlnaHQ6bnVtYmVyKXtcclxuICAgICAgICB0aGlzLl93aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuX2hlaWdodCA9IGhlaWdodDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgdyA9IDA7IHcgPCB3aWR0aDsgdyArPSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RldGVjdGlvbk1hdHJpeFt3XSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLl9jYW5jZWxsYXRpb25NYXRyaXhbd10gPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaCA9IDA7IGggPCBoZWlnaHQ7IGggKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGV0ZWN0aW9uTWF0cml4W3ddW2hdID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jYW5jZWxsYXRpb25NYXRyaXhbd11baF0gPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOatpOaWueazleaPkOS+m+e7meatpOexu+eahOWtkOexu+mHjeWGmVxyXG4gICAgICog5q+P5b2T5q2k5a6e5L6L55uR5o6n55qE6L+b5YWl56Kw5pKe5LqL5Lu25Zyo5bey5ZCv55So55uR5ZCs55qE5Z2Q5qCH5Y+R55Sf5pe277yM5q2k5Ye95pWw5bCG6KKr6LCD55SoXHJcbiAgICAgKiBAcGFyYW0gYWN0b3IgXHJcbiAgICAgKiBAcGFyYW0gcG9zaXRpb25cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IG9uRW50cmUoYWN0b3I6QWN0b3IsIHBvc2l0aW9uOlZlYzIpOnZvaWRcclxuXHJcbiAgICAvKipcclxuICAgICAqIOatpOaWueazleaPkOS+m+e7meatpOexu+eahOWtkOexu+mHjeWGmVxyXG4gICAgICog5q+P5b2T5q2k5a6e5L6L55uR5o6n55qE6L+b5YWl56Kw5pKe5LqL5Lu25Zyo5bey5ZCv55So55uR5ZCs55qE5Z2Q5qCH5Y+R55Sf5pe277yM5q2k5Ye95pWw5bCG6KKr6LCD55SoXHJcbiAgICAgKiBAcGFyYW0gYWN0b3IgXHJcbiAgICAgKiBAcGFyYW0gcG9zaXRpb25cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IG9uTGVhdmUoYWN0b3I6QWN0b3IsIHBvc2l0aW9uOlZlYzIpOnZvaWRcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWcqOaMh+WumuWdkOagh+S4iuiuvue9ruebkeWQrOeisOaSnuS6i+S7tlxyXG4gICAgICogaWRlbnRpdHnlj6/ku6XlnKhBY3Rvci5JZGVudGl0eemHjOmAieaLqVxyXG4gICAgICog6YKj5oiR5Li65LuA5LmI5LiN5YaZZW51beWRouKApuKAplxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0RGV0ZWN0aW9uKHBvc2l0aW9uOlZlYzIsIGlkZW50aXR5OnN0cmluZyk6dm9pZHtcclxuICAgICAgICBpZiAodGhpcy5kZXRlY3Rpb25FeGlzdChwb3NpdGlvbikpIHsvL+WmguaenOWcqOatpOWkhOW3suWtmOWcqOebkeaOp++8jOWImeWPlua2iOebkeaOp1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNldERldGVjdGlvbuWHveaVsOS4jeiDveWcqOWQjOS4gOS4quWdkOagh+WkmuasoeebkeaOp++8jOivt+afpeeci0NvbGlSZWNpZXZlcuexu1wiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocG9zaXRpb24ueCA+PSB0aGlzLl93aWR0aCB8fCBwb3NpdGlvbi54IDwgMCB8fFxyXG4gICAgICAgICAgICBwb3NpdGlvbi55ID4gdGhpcy5faGVpZ2h0IHx8IHBvc2l0aW9uLnkgPCAwKSB7Ly/lpoLmnpznm5HmjqfkvY3nva7otoXlh7rovrnnlYzvvIzliJnlj5bmtojnm5HmjqdcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHBvc2l0aW9uID0gcG9zaXRpb24uY2xvbmUoKTsvL+WkjeWItuS9jee9ruWvueixoeS7pemYsuatouS8oOWdgOmXrumimFxyXG4gICAgICAgIGxldCBkZXRlY3RvcjpGdW5jdGlvbltdID0gW107Ly/ov5nmmK/nm5HlkKzlh73mlbDvvIzlrZjotbfmnaXlh4blpIfmkqTpmaTnm5HlkKzml7bnlKhcclxuICAgICAgICAvL+iuvue9ruebkeWQrOS6i+S7tlxyXG4gICAgICAgICAgICBkZXRlY3RvclswXSA9IChhY3RvcjpBY3Rvcik9PnsvL+i/m+WFpeS6i+S7tuWHveaVsFxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkVudHJlKGFjdG9yLCBwb3NpdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGV0ZWN0b3JbMV0gPSAoYWN0b3I6QWN0b3IpPT57Ly/nprvlvIDkuovku7blh73mlbBcclxuICAgICAgICAgICAgICAgIHRoaXMub25MZWF2ZShhY3RvciwgcG9zaXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5vbihFdmVudENlbnRyZS5FVHlwZS5FTlRSRShwb3NpdGlvbiwgaWRlbnRpdHkpLCB0aGlzLCBkZXRlY3RvclswXSk7XHJcbiAgICAgICAgICAgIEV2ZW50Q2VudHJlLmluc3RhbmNlLm9uKEV2ZW50Q2VudHJlLkVUeXBlLkxFQVZFKHBvc2l0aW9uLCBpZGVudGl0eSksIHRoaXMsIGRldGVjdG9yWzFdKTtcclxuICAgICAgICAvL+iuvue9ruebkeWQrOS6i+S7tlxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX2NhbmNlbGxhdGlvbk1hdHJpeFtwb3NpdGlvbi54XVtwb3NpdGlvbi55XS5wdXNoKCgpPT57Ly/lsIbnm5HlkKznp7vpmaTlh73mlbDlrZjlhaXlh73mlbDnn6npmLVcclxuICAgICAgICAgICAgRXZlbnRDZW50cmUuaW5zdGFuY2Uub2ZmKEV2ZW50Q2VudHJlLkVUeXBlLkVOVFJFKHBvc2l0aW9uLCBpZGVudGl0eSksIHRoaXMsIGRldGVjdG9yWzBdKTtcclxuICAgICAgICB9LCAoKT0+e1xyXG4gICAgICAgICAgICBFdmVudENlbnRyZS5pbnN0YW5jZS5vZmYoRXZlbnRDZW50cmUuRVR5cGUuTEVBVkUocG9zaXRpb24sIGlkZW50aXR5KSwgdGhpcywgZGV0ZWN0b3JbMV0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLl9kZXRlY3Rpb25NYXRyaXhbcG9zaXRpb24ueF1bcG9zaXRpb24ueV0gPSB0cnVlOy8v5bCG5q2k5Z2Q5qCH55qE54q25oCB6K6+5Li64oCc5bey6KKr55uR5ZCs4oCdXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnp7vpmaTmjIflrprlnZDmoIfnmoTnorDmkp7kuovku7bnm5HlkKxcclxuICAgICAqIEBwYXJhbSBwb3NpdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb2ZmRGV0ZWN0aW9uKHBvc2l0aW9uOlZlYzIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fY2FuY2VsbGF0aW9uTWF0cml4W3Bvc2l0aW9uLnhdW3Bvc2l0aW9uLnldLmZvckVhY2goKGVsZSk9PnsvL+aJp+ihjOavj+S4gOS4qumihOWtmOeahOWHveaVsFxyXG4gICAgICAgICAgICBlbGUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9jYW5jZWxsYXRpb25NYXRyaXhbcG9zaXRpb24ueF1bcG9zaXRpb24ueV0gPSBbXTsvL+WIoOmZpOatpOWkhOeahOmihOWtmOWHveaVsFxyXG4gICAgICAgIHRoaXMuX2RldGVjdGlvbk1hdHJpeFtwb3NpdGlvbi54XVtwb3NpdGlvbi55XSA9IGZhbHNlOy8v5bCG5q2k5Z2Q5qCH6K6+5Li65pyq55uR5ZCsXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9BY3RvclwiO1xyXG5cclxuZXhwb3J0IGVudW0gRGFtYWdlVHlwZXtcclxuICAgIFBZU0lDQUwsXHJcbiAgICBNQUdJQ0FMLFxyXG4gICAgVFJVRSxcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERhbWFnZXtcclxuXHJcbiAgICBwdWJsaWMgc291cmNlOkFjdG9yID0gbnVsbDsvL+S8pOWus+adpea6kFxyXG4gICAgcHVibGljIHZhbHVlOm51bWJlciA9IDA7Ly/mlLvlh7vliptcclxuICAgIHB1YmxpYyB0eXBlOkRhbWFnZVR5cGUvL+S8pOWus+exu+Wei1xyXG4gICAgcHVibGljIHByaW1hcnk6Ym9vbGVhbiA9IHRydWU7Ly/mmK/lkKbkuLrpnZ7pl7TmjqXkvKTlrrPvvIjpl7TmjqXkvKTlrrPkuI3kvJrop6blj5HmmJ/nhorjgIHlubTnmoTlj43nlLLkuYvnsbvnmoTmlYjmnpzvvIlcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2U6QWN0b3IsIHZhbHVlOm51bWJlciwgdHlwZTpEYW1hZ2VUeXBlKXtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvcHkoKTpEYW1hZ2V7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBEYW1hZ2UodGhpcy5zb3VyY2UsIHRoaXMudmFsdWUsIHRoaXMudHlwZSk7XHJcbiAgICAgICAgcmVzdWx0LnR5cGUgPSB0aGlzLnR5cGU7XHJcbiAgICAgICAgcmVzdWx0LnByaW1hcnkgPSB0aGlzLnByaW1hcnk7XHJcbiAgICAgICAgcmVzdWx0LnNvdXJjZSA9IHRoaXMuc291cmNlO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBEYW1hZ2UsIERhbWFnZVR5cGUgfSBmcm9tIFwiLi9EYW1hZ2VcIjtcclxuaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9BY3RvclwiO1xyXG5pbXBvcnQgeyBBY3RvclR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0RvZEtleVwiO1xyXG5pbXBvcnQgeyBWZWMyIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Eb2RNYXRoXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIFByb2ZpbGXnsbvmmK/lgqjlrZjljZXkvY3ln7rmnKzmlbDmja7vvIjlpoLmlLvlh7vlipvjgIHpmLLlvqHlipvnrYnvvInnmoTnsbtcclxuICog5a6D6L+Y5o+Q5L6b5LiA5YiH55So5LqO6I635Y+WQWN0b3Lkv6Hmga/nmoTmjqXlj6PvvIjlpoLmmK/lkKbog73lpJ/ooYzliqjjgIHmmK/lkKbog73lpJ/pmLvmjKHvvIlcclxuICovXHJcbmV4cG9ydCBjbGFzcyBQcm9maWxlIHtcclxuICAgIHB1YmxpYyBuYW1lOiBTdHJpbmcgPSBcIkNoYW5kbGVyIEJpbmdcIjtcclxuICAgIHB1YmxpYyByZWFkb25seSBrZWVwZXI6QWN0b3I7XHJcblxyXG4gICAgcHJpdmF0ZSBfcHJlcFRpbWU6IG51bWJlciA9IDEwMDsvL+WJjeaRh+aXtumXtFxyXG4gICAgcHJpdmF0ZSBfYWZ0ZXJUaW1lOiBudW1iZXIgPSAxMDA7Ly/lkI7mkYfml7bpl7RcclxuICAgIHB1YmxpYyBpbnZpc2libGU6IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpumakOW9olxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Lyk5a6z6K6h566X55u45YWz55qE5L+u5pS55ZKM6K6/6Zeu5o6l5Y+jXHJcbiAgICAgKiDkvZzogIXvvJrokbFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGF0dGFja1Bvd2VyOiBudW1iZXIgPSAxMDA7Ly/mlLvlh7vliptcclxuICAgIHB1YmxpYyBhdGtTY2FsZTpudW1iZXIgPSAxOy8v5pS75Ye75YCN546HXHJcbiAgICBwdWJsaWMgYXRrQnVmZjpudW1iZXIgPSAxOy8v5pS75Ye755m+5YiG5q+U5o+Q5Y2HXHJcbiAgICBwdWJsaWMgYXJtb3VyOm51bWJlciA9IDUwOy8v54mp55CG6Ziy5b6hXHJcbiAgICBwdWJsaWMgbWFnaWNBcm1vdXI6bnVtYmVyID0gMDsvL+azleacr+aKl+aAp1xyXG4gICAgcHVibGljIGRtZ1R5cGU6RGFtYWdlVHlwZSA9IERhbWFnZVR5cGUuUFlTSUNBTDsvL+S8pOWus+exu+Wei1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihrZWVwZXI6QWN0b3IsIHJlczphbnkpe1xyXG4gICAgICAgIHRoaXMua2VlcGVyID0ga2VlcGVyO1xyXG4gICAgICAgIC8vdG9kbzogYWJvdXQgcmVzXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldE5vZGVQb3MoKTpWZWMye1xyXG4gICAgICAgIHJldHVybiB0aGlzLmtlZXBlci50cmFuc2Zvcm0ucG9zLmdldE5vZGVQb3MoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS8oOWFpeS4gOS4qkFjdG9y77yM6L+U5Zue5Lyk5a6z5a+56LGhXHJcbiAgICAgKiDmraPlnKjogIPomZHlup/lvIPmraTpoblcclxuICAgICAqIEBwYXJhbSBzb3VyY2UgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZW5lcmF0ZURhbWFnZShzb3VyY2U6QWN0b3IpOkRhbWFnZXtcclxuICAgICAgICByZXR1cm4gbmV3IERhbWFnZShzb3VyY2UsIHRoaXMuYXR0YWNrUG93ZXIqdGhpcy5hdGtTY2FsZSp0aGlzLmF0a0J1ZmYsIHRoaXMuZG1nVHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhpdFBvaW50OiBudW1iZXIgPSAxMDsvL+eUn+WRveWAvFxyXG4gICAgcHVibGljIG1heEhpdFBvaW50OiBudW1iZXIgPSAxMDsvL+acgOmrmOeUn+WRveWAvFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYnkgWFdWXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoYXRlTGV2ZWw6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgYXR0YWNrUmFuZ2VSYWRpdXM6IG51bWJlcjtcclxuXHJcblxyXG4gICAgcHVibGljIGdldCBwcmVwVGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wcmVwVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGFmdGVyVGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hZnRlclRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBibG9ja2FibGUoKTogYm9vbGVhbntcclxuICAgICAgICAvL3RvZG86IOWIpOaWreaYr+WQpuWPr+S7peiiq+mYu+aMoVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmmK/lkKbpnIDopoHlnKhwcm9maWxl5Lit5bCG5LiN5ZCM55qE5pWw5YC85YiG57G777yfXHJcbiAqXHJcbiAqLyIsImltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuaW1wb3J0IHsgRG9kTWF0aCwgVmVjMiB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vRG9kTWF0aFwiO1xyXG5pbXBvcnQgeyBDb2xpRW1pdCB9IGZyb20gXCIuL0NvbGlNZXNzYWdlXCI7XHJcbmltcG9ydCB7IERlcGxveUludGVyZXN0ZWRNb2R1bGUgfSBmcm9tIFwiLi9Nb2R1bGVJbnRlcmZhY2VcIjtcclxuXHJcbi8qKlxyXG4gKiDlr7nkuIDkuKrljZXkvY3nmoTlh6DkvZXnirbmgIHnmoTmj4/ov7BcclxuICovXHJcbmV4cG9ydCBjbGFzcyBUcmFuc2Zvcm0gaW1wbGVtZW50cyBEZXBsb3lJbnRlcmVzdGVkTW9kdWxle1xyXG5cclxuICAgIOWIoOWHveaVsCgpOiB2b2lkIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2Qgbm90IGltcGxlbWVudGVkLlwiKTtcclxuICAgIH1cclxuICAgIG9uRGVwbG95KHBvczogVmVjMik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucG9zLnNldE5vZGVQb3MocG9zKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHB1YmxpYyBwb3M6UG9zID0gbmV3IFBvcygpO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihrZWVwZXI6QWN0b3Ipe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBQb3N7XHJcbiAgICAvLyBwdWJsaWMgYXV0b1N3aXRjaFRhcmdldDpib29sZWFuID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBkYXRhOlZlYzIgPSBuZXcgVmVjMigwLDApOy8v5L2N572uXHJcblxyXG5cclxuICAgIFxyXG4gICAgcHVibGljIHRhcmdldDpWZWMyID0gbmV3IFZlYzIoMCwwKTsvL+ebruagh1xyXG4gICAgcHVibGljIHNwZWVkOm51bWJlciA9IDU7Ly/pgJ/luqZcclxuICAgIHB1YmxpYyBhcHByb2FjaDpudW1iZXIgPSAwOy8v6YC86L+R5qyh5pWwXHJcbiAgICBwdWJsaWMgdmVjU3BlZWQ6VmVjMiA9IG5ldyBWZWMyKDAsMCk7Ly/liIbph4/pgJ/luqZcclxuICAgIHByaXZhdGUgX2Fycml2ZWQ6Ym9vbGVhbiA9IHRydWU7Ly/lt7LliLDovr7nm67nmoTlnLAo5q+P5qyh6K6+572u5paw55uu55qE5Zyw5pe26K6+5Li6ZmFsc2UpXHJcbiAgICBwdWJsaWMgZ2V0IGFycml2ZWQoKTpib29sZWFue3JldHVybiB0aGlzLl9hcnJpdmVkO30vL+iOt+WPluaYr+WQpuW3suWIsOi+vueahOS/oeaBr1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u55uu55qE5Zyw5bm26YeN6K6+5YiG6YeP6YCf5bqmXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0VGFyZ2V0KHRhcmdldDpWZWMyKTp2b2lke1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgIHRoaXMuYWltKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7nm7Tnur/pgJ/luqblubbph43orr7liIbph4/pgJ/luqZcclxuICAgICAqIEBwYXJhbSBzcGVlZCBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFNwZWVkKHNwZWVkOm51bWJlcik6dm9pZHtcclxuICAgICAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XHJcbiAgICAgICAgdGhpcy5haW0oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuoeeul+enu+WKqOWPguaVsCzlubblsIZfYXJyaXZlZOiuvuS4umZhbHNlXHJcbiAgICAgKiDlsIbkvJrph43orr7liIbph4/pgJ/luqblkozpgLzov5HmrKHmlbBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhaW0oKTp2b2lke1xyXG4gICAgICAgIHRoaXMudmVjU3BlZWQgPSBEb2RNYXRoLm1vdmVUb0NvbXBvbmVudCh0aGlzLmRhdGEsdGhpcy50YXJnZXQsdGhpcy5zcGVlZCk7XHJcbiAgICAgICAgdGhpcy5hcHByb2FjaCA9IHRoaXMuZGF0YS5kaXN0YW5jZVRvKHRoaXMudGFyZ2V0KSAvIHRoaXMuc3BlZWQ7XHJcbiAgICAgICAgdGhpcy5fYXJyaXZlZCA9IGZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ZCR55uu5qCH54K556e75Yqo5LiA5qyhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtb3ZlKCk6dm9pZHtcclxuICAgICAgICB0aGlzLmFwcHJvYWNoIC09IDE7XHJcbiAgICAgICAgaWYgKHRoaXMuYXBwcm9hY2ggPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEueCA9IHRoaXMudGFyZ2V0Lng7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS55ID0gdGhpcy50YXJnZXQueTtcclxuICAgICAgICAgICAgdGhpcy5fYXJyaXZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kYXRhLnggPSB0aGlzLmRhdGEueCArIHRoaXMudmVjU3BlZWQueDtcclxuICAgICAgICB0aGlzLmRhdGEueSA9IHRoaXMuZGF0YS55ICsgdGhpcy52ZWNTcGVlZC55O1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Tm9kZVBvcygpOlZlYzJ7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMyKE1hdGguZmxvb3IodGhpcy5kYXRhLnggLyBDb2xpRW1pdC5HTE9CQUxfVU5JVF9XSURUSCksIE1hdGguZmxvb3IodGhpcy5kYXRhLnkgLyBDb2xpRW1pdC5HTE9CQUxfVU5JVF9IRUlHSFQpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS+neaNruWcsOWbvuiKgueCueiuvue9ruS9jee9rlxyXG4gICAgICogQHBhcmFtIHBvcyDmraTlpITnmoRWZWMy5a6e5L6L5YKo5a2Y55qE5piv5pW05pWw5pWw5o2u77yM55So5LqO5o+P6L+w5Zyw5Zu+6IqC54K55L2N572uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXROb2RlUG9zKHBvczpWZWMyKTp2b2lke1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IG5ldyBWZWMyKHBvcy54ICogQ29saUVtaXQuR0xPQkFMX1VOSVRfV0lEVEgsIHBvcy55ICogQ29saUVtaXQuR0xPQkFMX1VOSVRfSEVJR0hUKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG5cclxuICAgIH1cclxufSIsImltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuaW1wb3J0IFBlcmZvcm1hbmNlQ2VudHJlIGZyb20gXCIuLi8uLi8uLi9Db21tb24vR3JhcGhpY3MvUGVyZm9ybWFuY2VfTW9kdWxlL1BlcmZvcm1hbmNlQ2VudHJlXCI7XHJcbmltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0RvZE1hdGhcIjtcclxuaW1wb3J0IEZpeFRpbWUgZnJvbSBcIi4uLy4uLy4uL0ZpeC9GaXhUaW1lXCI7XHJcbmltcG9ydCB7IFN5bWJvbGl6ZWQsIE15U3ltYm9sIH0gZnJvbSBcIi4uLy4uLy4uL0ZpeC9GaXhTeW1ib2xcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBVbml0UmVuZGVye1xyXG5cclxuICAgIHByaXZhdGUgX2tlZXBlcjpBY3RvcjtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3Ioa2VlcGVyOkFjdG9yKXtcclxuICAgICAgICB0aGlzLl9rZWVwZXIgPSBrZWVwZXI7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Ye655Sf5Yqo55S7XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBib3JuQW5pbWF0aW9uKCk6dm9pZHtcclxuXHJcbiAgICAgICAgbGV0IGZha2VBY3RvcjpTeW1ib2xpemVkID0gbmV3IGNsYXNzIGltcGxlbWVudHMgU3ltYm9saXplZCB7XHJcbiAgICAgICAgICAgIHN5bWJvbDogTXlTeW1ib2wgPSBuZXcgTXlTeW1ib2woKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFBlcmZvcm1hbmNlQ2VudHJlLmluc3RhbmNlLmRpc3BsYXlBY3RvcihmYWtlQWN0b3IsIHRoaXMuX2tlZXBlci50cmFuc2Zvcm0ucG9zLmRhdGEsIG5ldyBWZWMyKDMwLDMwKSwgXCIjZmYwMGZmXCIpO1xyXG4gICAgICAgIGxldCBib3JudGltZSA9IEZpeFRpbWUuZWxhcHNlZFRpbWU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGxvb3BlciA9ICgpPT57XHJcbiAgICAgICAgICAgIGlmIChGaXhUaW1lLmVsYXBzZWRUaW1lIC0gYm9ybnRpbWUgPj0gMykge1xyXG4gICAgICAgICAgICAgICAgUGVyZm9ybWFuY2VDZW50cmUuaW5zdGFuY2UuZGlzdHJveUFjdG9yKGZha2VBY3Rvcik7XHJcbiAgICAgICAgICAgICAgICBMYXlhLnRpbWVyLmNsZWFyKHRoaXMsIGxvb3Blcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgUGVyZm9ybWFuY2VDZW50cmUuaW5zdGFuY2UuZWRpdEJhcihmYWtlQWN0b3IsIDAsIChGaXhUaW1lLmVsYXBzZWRUaW1lIC0gYm9ybnRpbWUpLzMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgTGF5YS50aW1lci5sb29wKDE2LCB0aGlzLCBsb29wZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZXBsb3koKTp2b2lke1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRGVwbG95XCIpO1xyXG4gICAgICAgIFBlcmZvcm1hbmNlQ2VudHJlLmluc3RhbmNlLmRpc3BsYXlBY3Rvcih0aGlzLl9rZWVwZXIsIHRoaXMuX2tlZXBlci50cmFuc2Zvcm0ucG9zLmRhdGEsIG5ldyBWZWMyKDUwLDUwKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1vdmUodmVjOlZlYzIpOnZvaWR7XHJcbiAgICAgICAgUGVyZm9ybWFuY2VDZW50cmUuaW5zdGFuY2UubW92ZSh0aGlzLl9rZWVwZXIsIHZlYyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCBBY3RvciBmcm9tIFwiLi9BY3RvclwiO1xyXG5pbXBvcnQgeyBWZWMyIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9Eb2RNYXRoXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3V0ZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBfcGF0aDpWZWMyW10gPSBWZWMyLmxpc3RGcm9tTGlzdChbXHJcbiAgICAgICAgWzUwMCw1MDBdLFxyXG4gICAgICAgIFswLDBdLFxyXG4gICAgICAgIFs1MDAsMF0sXHJcbiAgICAgICAgWzAsNTAwXVxyXG4gICAgXSk7XHJcbiAgICBwcml2YXRlIF90YXJDb3VudDpudW1iZXIgPSAtMTsvL+ebruWJjeaMh+WQkeeahOebruagh1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGtlZXBlcjpBY3RvciwgcmVzOmFueSl7XHJcbiAgICAgICAgLy90b2RvOiDmoLnmja5yZXPojrflj5blupTotbDnmoTot6/nur9cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY3VycmVudFRhcmdldCgpOlZlYzJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhdGhbdGhpcy5fdGFyQ291bnRdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZXh0KCk6Ym9vbGVhbntcclxuICAgICAgICBpZiAodGhpcy5fdGFyQ291bnQgPCB0aGlzLl9wYXRoLmxlbmd0aCAtIDEpIHsvL+i/mOacieS4i+S4gOmhuVxyXG4gICAgICAgICAgICB0aGlzLl90YXJDb3VudCArPSAxO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Ugey8v5rKh5pyJ5LiL5LiA6aG5XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0tWUGFpcn0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Eb2REYXRhU3RydWN0dXJlXCI7XHJcbmltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuaW1wb3J0IHtFdmVudENlbnRyZX0gZnJvbSBcIi4uLy4uLy4uL0V2ZW50L0V2ZW50Q2VudHJlXCI7XHJcbmltcG9ydCB7IFNlZWtlciB9IGZyb20gXCIuL0FjdG9yU2Vla2VyXCI7XHJcbmltcG9ydCBGaXhUaW1lLCB7IERvZFRpbWVyIH0gZnJvbSBcIi4uLy4uLy4uL0ZpeC9GaXhUaW1lXCI7XHJcbmltcG9ydCB7IE1hcE5vZGVTZWVrZXIgfSBmcm9tIFwiLi9NYXBOb2RlU2Vla2VyXCI7XHJcbmltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0RvZE1hdGhcIjtcclxuaW1wb3J0IHsgRGVwbG95SW50ZXJlc3RlZE1vZHVsZSB9IGZyb20gXCIuLi9BY3Rvck1vZHVsZXMvTW9kdWxlSW50ZXJmYWNlXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIGJ5IFhXVlxyXG4gKiBcclxuICog6JGxIOS/ruaUueS6jiAzLzE4XHJcbiAqICAgICAg5bCGU2Vla2Vy5oyq5YWl5pS75Ye754q25oCB5py65YaF77yM5LiN55SxQWN0b3LmjIHmnIlcclxuICogICAgICDkuI3lkIznmoTmlLvlh7vojIPlm7TnlLFTZWVrZXLmm7/mjaLmnaXlrp7njrBcclxuICogICAgICDkuI3lkIznmoTmlLvlh7vpgLvovpHvvIjojIPlm7Qv5Y2V5L2T77yJ55Sx5L+u5pS5cHJvZmlsZeS4reeahOWPguaVsOWunueOsFxyXG4gKiAgICAgIEF0a1N0YXRlTWFjaGluZei0n+i0o+WvueWkluaPkOS+m+aJgOacieS/ruaUuS/orr/pl67mjqXlj6NcclxuICogICAgICDku43pnIDlr7nmraTov5vooYzov5vkuIDmraXop4TliJLvvIjljZXkvZMv5aSa5L2TL+e+pOS9k+aUu+WHu+mAu+i+keaYr+S7heeUseS4gOS4quWPguaVsOWunueOsO+8jOi/mOaYr+eUseWkmuaAgeWunueOsO+8iVxyXG4gKiAgICAgIC8vdG9kbzrml7bpl7TntK/liqDpgLvovpHmlLnlj5hcclxuICogXHJcbiAqL1xyXG5cclxuZW51bSBTdGF0ZVR5cGUge1xyXG4gICAgV0FJVCA9IFwiV0FJVFwiLFxyXG4gICAgUFJFUEFSRSA9IFwiUFJFUEFSRVwiLFxyXG4gICAgQUZURVJfQVRLID0gXCJBRlRFUl9BVEtcIlxyXG59XHJcblxyXG5pbnRlcmZhY2UgU3RhdGUge1xyXG4gICAgbmFtZSgpOnN0cmluZ1xyXG5cclxuICAgIGV4ZWN1dGUobWFjaGluZTogQXRrU3RhdGVNYWNoaW5lKTogdm9pZFxyXG5cclxuICAgIHJlc2V0KCk6IHZvaWRcclxufVxyXG5cclxuYWJzdHJhY3QgY2xhc3MgQmFzZVN0YXRlIGltcGxlbWVudHMgU3RhdGUge1xyXG4gICAgcHVibGljIG5hbWUoKTpzdHJpbmd7cmV0dXJuIFwiQmFzZVN0YXRlXCI7fVxyXG5cclxuICAgIHByb3RlY3RlZCB0aW1lOiBudW1iZXIgPSAwOy8v5pe26Ze057Sv5Yqg6YC76L6R5pS55Y+YXHJcblxyXG4gICAgcHVibGljIHJlc2V0KCkge1xyXG4gICAgICAgIHRoaXMudGltZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgYWJzdHJhY3QgZXhlY3V0ZShtYWNoaW5lOiBBdGtTdGF0ZU1hY2hpbmUpOiB2b2lkO1xyXG5cclxufVxyXG5cclxuY2xhc3MgV2FpdCBleHRlbmRzIEJhc2VTdGF0ZSB7XHJcbiAgICBwdWJsaWMgbmFtZSgpOnN0cmluZ3tyZXR1cm4gXCJXYWl0U3RhdGVcIjt9XHJcblxyXG4gICAgcHVibGljIGV4ZWN1dGUobWFjaGluZTogQXRrU3RhdGVNYWNoaW5lKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZm9jdXMgPSBtYWNoaW5lLnNlZWtlci5nZXRGb2N1cygpO1xyXG4gICAgICAgIGlmIChmb2N1cyAhPSBudWxsICYmIGZvY3VzICE9IHVuZGVmaW5lZCkgey8v5aaC5p6c6IO95aSf5om+5Yiw5pWM5Lq6XHJcbiAgICAgICAgICAgIG1hY2hpbmUuY2hhbmdlU3RhdGUoU3RhdGVUeXBlLlBSRVBBUkUpO1xyXG4gICAgICAgICAgICBtYWNoaW5lLnByZXBUaW1lci5yZXNldCgpO1xyXG4gICAgICAgICAgICBtYWNoaW5lLmNvb2xUaW1lci5yZXNldCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZvdW5kIEVuZW15XCIpO1xyXG4gICAgICAgIH0gZWxzZSB7Ly/lpoLmnpzmib7kuI3liLDmlYzkurpcclxuICAgICAgICAgICAgLy90b2RvOiBub25lXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5aaC5p6cc2Vla2Vy5Lit5a2Y5Zyo5pWM5Lq677yMcmVzZXQgUHJlcGFyZeW5tui3s+i9rOWIsFByZXBhcmXpmLbmrrVcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmNsYXNzIFByZXBhcmUgZXh0ZW5kcyBCYXNlU3RhdGUge1xyXG4gICAgcHVibGljIG5hbWUoKTpzdHJpbmd7cmV0dXJuIFwiUHJlcGFyZVN0YXRlXCI7fVxyXG5cclxuICAgIHB1YmxpYyBleGVjdXRlKG1hY2hpbmU6IEF0a1N0YXRlTWFjaGluZSk6IHZvaWQge1xyXG4gICAgXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIC8v5Yik5pat5piv5ZCm6ZyA6KaB6YeN5paw6YCJ5oup55uu5qCH5bm26YeN572u5YmN5pGHXHJcbiAgICAgICAgbGV0IHNlZWtlciA9IG1hY2hpbmUuc2Vla2VyO1xyXG4gICAgICAgIGxldCBhY3RvciA9IG1hY2hpbmUua2VlcGVyO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHNlZWtlci5mb2N1c0NoYW5nZWQpO1xyXG4gICAgICAgIGlmIChzZWVrZXIuZm9jdXNDaGFuZ2VkKCkpIHsvL+W9k+WJjeebruagh+W3suS/ruaUuVxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInByZXBhcmU6Rm9jdXNjaGFuZ2VkXCIpO1xyXG4gICAgICAgICAgICBtYWNoaW5lLnByZXBUaW1lci5yZXNldCgpO1xyXG4gICAgICAgICAgICBpZiAoc2Vla2VyLmdldEZvY3VzKCkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gbWFjaGluZS5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtYWNoaW5lLmNoYW5nZVN0YXRlKFN0YXRlVHlwZS5XQUlUKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5b2T5YmN55uu5qCH5pyq5L+u5pS5XHJcbiAgICAgICAgaWYgKG1hY2hpbmUucHJlcFRpbWVyLnJlYWR5KSB7XHJcbiAgICAgICAgICAgIC8vdG9kbzog6L+b6KGM5pS75Ye7KOi/m+ihjHByb2ZpbGXlj4LmlbDliKTmlq0pXHJcbiAgICAgICAgICAgIG1hY2hpbmUua2VlcGVyLmF0dGFjayhzZWVrZXIuZ2V0Rm9jdXMoKSk7XHJcbiAgICAgICAgICAgIG1hY2hpbmUuY2hhbmdlU3RhdGUoU3RhdGVUeXBlLkFGVEVSX0FUSyk7Ly/ovazmjaLliLDlkI7mkYdcclxuICAgICAgICAgICAgbWFjaGluZS5jb29sVGltZXIucmVzZXQoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBdHRhY2sgSGFwcGVuZWRcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQWZ0ZXJBdGsgZXh0ZW5kcyBCYXNlU3RhdGUge1xyXG4gICAgcHVibGljIG5hbWUoKTpzdHJpbmd7cmV0dXJuIFwiQWZ0ZXJTdGF0ZVwiO31cclxuICAgIHB1YmxpYyBleGVjdXRlKG1hY2hpbmU6IEF0a1N0YXRlTWFjaGluZSk6IHZvaWQge1xyXG4gICAgICAgIC8vIG1hY2hpbmUudGljKCk7XHJcbiAgICAgICAgaWYgKG1hY2hpbmUuY29vbFRpbWVyLnJlYWR5KSB7XHJcbiAgICAgICAgICAgIC8vIG1hY2hpbmUucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICBtYWNoaW5lLmNvb2xUaW1lci5yZXNldCgpO1xyXG4gICAgICAgICAgICBtYWNoaW5lLnByZXBUaW1lci5yZXNldCgpO1xyXG4gICAgICAgICAgICBpZiAobWFjaGluZS5zZWVrZXIuZ2V0Rm9jdXMoKSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBtYWNoaW5lLmNoYW5nZVN0YXRlKFN0YXRlVHlwZS5QUkVQQVJFKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1hY2hpbmUuY2hhbmdlU3RhdGUoU3RhdGVUeXBlLldBSVQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQXR0YWNrIHJlY292ZXJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICog54q25oCB5py657G7XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQXRrU3RhdGVNYWNoaW5lIGltcGxlbWVudHMgRGVwbG95SW50ZXJlc3RlZE1vZHVsZXtcclxuICAgIOWIoOWHveaVsCgpOiB2b2lkIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2Qgbm90IGltcGxlbWVudGVkLlwiKTtcclxuICAgIH1cclxuICAgIC8qXHJcbiAgICAqIOaJgOWxnkFjdG9yXHJcbiAgICAqICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkga2VlcGVyOiBBY3RvcjtcclxuICAgIC8qKlxyXG4gICAgICog5b2T5YmN54q25oCBXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3VyU3RhdGU6IFN0YXRlO1xyXG4gICAgLyoqXHJcbiAgICAgKiDlj6/kvb/nlKjnmoTnirbmgIHliJfooahcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0ZUxpc3Q6IEtWUGFpcjxTdGF0ZT4gPSBuZXcgS1ZQYWlyPFN0YXRlPigpO1xyXG5cclxuICAgIHB1YmxpYyBzZWVrZXI6IFNlZWtlcjtcclxuXHJcbiAgICBwcml2YXRlIF9wcmVwVGltZTpudW1iZXI7Ly/liY3mkYfml7bpl7Qv56eSXHJcbiAgICBwcml2YXRlIF9jb29sVGltZTpudW1iZXI7Ly/lkI7mkYfml7bpl7Qv56eSXHJcbiAgICBwdWJsaWMgcHJlcFRpbWVyOkRvZFRpbWVyO1xyXG4gICAgcHVibGljIGNvb2xUaW1lcjpEb2RUaW1lcjtcclxuICAgIC8vIHByaXZhdGUgX2N1clBvaW50Om51bWJlciA9IDA7Ly/lvZPliY3lt7Lnp6/ok4TnmoTngrnmlbBcclxuICAgIC8vIHByaXZhdGUgX3ZlbG9jaXR5Om51bWJlciA9IDE7Ly/lvZPliY3ntK/liqDpgJ/njoco54K55pWwL+W4pylcclxuXHJcbiAgICAvLyBwdWJsaWMgZ2V0IHJlYWR5KCk6Ym9vbGVhbntcclxuICAgIC8vICAgICByZXR1cm4gdGhpcy5fY3VyUG9pbnQgPj0gdGhpcy5fcHJlcFRpbWU7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gcHVibGljIHRpYygpOnZvaWR7XHJcbiAgICAvLyAgICAgdGhpcy5fY3VyUG9pbnQgKz0gdGhpcy5fdmVsb2NpdHk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gcHVibGljIGdldCBjb29sQ29tcGxldGUoKTpib29sZWFue1xyXG4gICAgLy8gICAgIHJldHVybiB0aGlzLl9jdXJQb2ludCA+PSB0aGlzLl9wcmVwVGltZSt0aGlzLl9jb29sVGltZTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBwdWJsaWMgcmVmcmVzaCgpOnZvaWR7XHJcbiAgICAvLyAgICAgdGhpcy5fY3VyUG9pbnQgPSAwO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIGtlZXBlciDnirbmgIHmnLrmiYDmnInogIVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioa2VlcGVyOiBBY3RvciwgcmVzOmFueSkge1xyXG4gICAgICAgIHRoaXMua2VlcGVyID0ga2VlcGVyO1xyXG4gICAgICAgIHRoaXMuY3VyU3RhdGUgPSBuZXcgV2FpdCgpO1xyXG4gICAgICAgIHRoaXMuc3RhdGVMaXN0LmVkaXQoU3RhdGVUeXBlLldBSVQsIHRoaXMuY3VyU3RhdGUpO1xyXG4gICAgICAgIHRoaXMuc3RhdGVMaXN0LmVkaXQoU3RhdGVUeXBlLlBSRVBBUkUsIG5ldyBQcmVwYXJlKCkpO1xyXG4gICAgICAgIHRoaXMuc3RhdGVMaXN0LmVkaXQoU3RhdGVUeXBlLkFGVEVSX0FUSywgbmV3IEFmdGVyQXRrKCkpO1xyXG4gICAgICAgIC8vdG9kbzogYWJvdXQgcmVzXHJcblxyXG4gICAgICAgIHRoaXMuX3ByZXBUaW1lID0gMztcclxuICAgICAgICB0aGlzLl9jb29sVGltZSA9IDM7XHJcbiAgICAgICAgdGhpcy5wcmVwVGltZXIgPSBuZXcgRG9kVGltZXIodGhpcy5fcHJlcFRpbWUpO1xyXG4gICAgICAgIHRoaXMuY29vbFRpbWVyID0gbmV3IERvZFRpbWVyKHRoaXMuX2Nvb2xUaW1lKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZWVrZXIgPSBuZXcgTWFwTm9kZVNlZWtlcih0aGlzLmtlZXBlci5wcm9maWxlLmdldE5vZGVQb3MoKS5wbHVzKG5ldyBWZWMyKDMsMykpLCByZXNbJ3h4eCddLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25EZXBsb3kocG9zOlZlYzIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5zZWVrZXIucmVwb3NpdGlvbihwb3MpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yi35paw5b2T5YmN54q25oCB77yM5q+P5bin6LCD55SoXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5jdXJTdGF0ZS5uYW1lKCkpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwicHQ6XCIgKyB0aGlzLl9jdXJQb2ludCk7XHJcbiAgICAgICAgdGhpcy5zZWVrZXIudXBkYXRlKCk7XHJcbiAgICAgICAgaWYgKHRoaXMua2VlcGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyU3RhdGUuZXhlY3V0ZSh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmlLnlj5jlvZPliY3nirbmgIHvvIzmlrDnirbmgIHkvJrph43nva7kuLrliJ3lp4vmgIFcclxuICAgICAqIEBwYXJhbSBzdGF0ZVR5cGUg5paw55qE54q25oCB57G75Z6LXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjaGFuZ2VTdGF0ZShzdGF0ZVR5cGU6IFN0YXRlVHlwZSkge1xyXG4gICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuc3RhdGVMaXN0LnJlYWQoc3RhdGVUeXBlKTtcclxuICAgICAgICBzdGF0ZS5yZXNldCgpO1xyXG4gICAgICAgIHRoaXMuY3VyU3RhdGUgPSBzdGF0ZTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiIsImltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuaW1wb3J0IHsgU2Vla2VyIH0gZnJvbSBcIi4vQWN0b3JTZWVrZXJcIjtcclxuaW1wb3J0IHsgVmVjMiB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vRG9kTWF0aFwiO1xyXG5pbXBvcnQgeyBBY3RvclR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0RvZEtleVwiO1xyXG5pbXBvcnQgUmhvZGVzR2FtZSBmcm9tIFwiLi4vLi4vUmhvZGVzR2FtZVwiO1xyXG5pbXBvcnQgeyBBcnJheUFsZ28gfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0RvZERhdGFTdHJ1Y3R1cmVcIjtcclxuXHJcbi8qKlxyXG4gKiDkvZzogIXvvJrojYnnlJ/okbFcclxuICogXHJcbiAqIEJsb2NrZXLmmK/pmLvmjKHmqKHlnZdcclxuICog5YKo5a2Y6Zi75oyh55u45YWz55qE5L+h5oGvXHJcbiAqIOWug+i0n+i0o+avj+W4p+ajgOa1i+W5suWRmOWPr+mYu+aMoeeahOS9jee9ruaYr+WQpuacieaVjOS6uui/m+WFpe+8jOW5tuWGs+WumuaYr+WQpumYu+aMoVxyXG4gKiBcclxuICogXHJcbiAqIC8vdG9kbzog5aaC5p6c6L+b6KGM6Zi75oyh5oiW6Kej6Zmk6Zi75oyh77yMQmxvY2tlcuWwhuS8muWPkeW4g+S6i+S7tlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJsb2NrZXJ7XHJcblxyXG4gICAgcHJpdmF0ZSBfa2VlcGVyOkFjdG9yO1xyXG4gICAgcHJpdmF0ZSBfcG9zOlZlYzI7XHJcbiAgICBwcml2YXRlIF9ibG9ja0xpc3Q6QWN0b3JbXSA9IFtdOy8v5bey6Zi75oyh55qE5YiX6KGoXHJcbiAgICBwcml2YXRlIF9ibG9ja2VkQnk6QWN0b3IgPSBudWxsOy8v6KKr6LCB6Zi75oyhXHJcbiAgICBwcml2YXRlIF9ibG9ja0FiaWxpdHk6bnVtYmVyID0gMzsvL+mYu+aMoeiDveWKm1xyXG4gICAgcHJpdmF0ZSBfYnJlYWt0aHJvdWdoOm51bWJlciA9IDE7Ly/lj43pmLvmjKHog73liptcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzQmxvY2tlZCgpOmJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Jsb2NrZWRCeSAhPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGtlZXBlcjpBY3RvciwgcmVzOmFueSl7XHJcbiAgICAgICAgdGhpcy5fa2VlcGVyID0ga2VlcGVyO1xyXG4gICAgICAgIHRoaXMuX3BvcyA9IGtlZXBlci5wcm9maWxlLmdldE5vZGVQb3MoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2tlZXBlci50eXBlICE9IEFjdG9yVHlwZS5PcGVyYXRvcikgey8v5LiN5piv5bmy5ZGY57G75Z6L55qE6K+d5bCx5riF56m6dXBkYXRl5pa55rOVXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlID0gKCk9Pnt9O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL3RvZG86IOagueaNrnJlc+iuvue9rumYu+aMoeiDveWKm+OAgeWPjemYu+aMoeiDveWKm1xyXG5cclxuICAgICAgICAvL3Rlc3RcclxuICAgICAgICB0aGlzLl9wb3MgPSBuZXcgVmVjMig0LDQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YeN6K6+6Zi75oyh5L2N572uXHJcbiAgICAgKiBAcGFyYW0gcG9zIOWcsOWbvuiKgueCueS9jee9ru+8jOaVtOaVsFZlYzJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlcG9zaXRpb24ocG9zOlZlYzIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5fcG9zID0gcG9zO1xyXG4gICAgICAgIHRoaXMuX2Jsb2NrTGlzdC5mb3JFYWNoKGVsZT0+e1xyXG4gICAgICAgICAgICB0aGlzLl9ibG9ja0FiaWxpdHkgKz0gZWxlLmJsb2NrZXIuX2JyZWFrdGhyb3VnaDtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9ibG9ja0xpc3QgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6dm9pZHtcclxuICAgICAgICAvKiDnm67liY3nmoTnrpfms5XkvJrkuqfnlJ/kuIDkuKrliKTlrprpl67popjvvJpcclxuICAgICAgICAgKiDorr7mnInnm7jpgrvnmoTkuKTkuKrmoLzlrZBB5ZKMQu+8jELlnKjlj7PovrnvvIxB5LiK56uZ552A5o6o546L77yI5pyd5Y+z77yJ77yMQuS4iuermeedgOWhnumbt+WohVxyXG4gICAgICAgICAqIOaVjOS6uuWcqOOAkOenu+WFpeOAkULmoLzml7bkvJrooqvloZ7ojrHlqIXpmLvmjKFcclxuICAgICAgICAgKiDmraTml7bnlLHkuo7mjqjnjovnmoTmlLvlh7vojIPlm7TmmK/kuKTmoLzvvIzlpbnlj6/ku6XmlLvlh7vliLDloZ7pm7flqIXpmLvmjKHnmoTmlYzkurpcclxuICAgICAgICAgKiDov5nkuI7muLjmiI/ooajnjrDnm7jlhrLnqoHvvJrmlLvlh7vojIPlm7Qy5qC855qE6L+R5Y2r5piv5peg5rOV6Leo5LiA5Liq5Lq65pS75Ye75pWM5Lq655qE77yMM+agvOaJjeihjO+8iOaIkeWNsOixoeS4reaYr++8iVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIOi/meS4qumXrumimOWcqOatpOeJiOacrOaaguS4lOW/veeVpVxyXG4gICAgICAgICovXHJcbiAgICAgICAgaWYgKHRoaXMuX2Jsb2NrQWJpbGl0eSA8PSAwKSB7Ly/msqHmnInpmLvmjKHog73lipvlsLHkuI3ogIPomZHliankuIvnmoTkuovkuoZcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbGlzdDpBY3RvcltdID0gUmhvZGVzR2FtZS5JbnN0YW5jZS5iYXR0bGUubWFwTm9kZUNQVS5tYXRyaXhHZXQodGhpcy5fcG9zKTsvL+iOt+WPlumYu+aMoeebruagh1xyXG4gICAgICAgIGxldCBuZXdDYXB0dXJlOkFjdG9yW10gPSBBcnJheUFsZ28uZmluZENvbXBTZXQobGlzdCwgdGhpcy5fYmxvY2tMaXN0KTtcclxuICAgICAgICBuZXdDYXB0dXJlID0gbmV3Q2FwdHVyZS5maWx0ZXIoZWxlPT57XHJcbiAgICAgICAgICAgIHJldHVybiBlbGUuYmxvY2tlci5fYmxvY2tlZEJ5ID09IG51bGwgJiYgZWxlLnByb2ZpbGUuYmxvY2thYmxlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8v5Y+q6YCJ5Y+W5peg5Lq66Zi75oyh5LiU5Y+v6KKr6Zi75oyh55qE6YOo5YiGXHJcbiAgICAgICAgaWYgKG5ld0NhcHR1cmUubGVuZ3RoID09IDApIHsvL+ayoeacieWHuueOsOaWsOeahOmYu+aMoeebruagh1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5ld0NhcHR1cmUuZm9yRWFjaChlbGU9PntcclxuICAgICAgICAgICAgaWYgKGVsZS5ibG9ja2VyLl9icmVha3Rocm91Z2ggPD0gdGhpcy5fYmxvY2tBYmlsaXR5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ibG9ja0xpc3QucHVzaChlbGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmxvY2tBYmlsaXR5IC09IGVsZS5ibG9ja2VyLl9icmVha3Rocm91Z2g7XHJcbiAgICAgICAgICAgICAgICBlbGUuYmxvY2tlci5fYmxvY2tlZEJ5ID0gdGhpcy5fa2VlcGVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgQWN0b3JUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Eb2RLZXlcIjtcclxuaW1wb3J0IHsgU2Vla2VyIH0gZnJvbSBcIi4vQWN0b3JTZWVrZXJcIjtcclxuaW1wb3J0IHsgVmVjMiB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vRG9kTWF0aFwiO1xyXG5pbXBvcnQgQWN0b3IgZnJvbSBcIi4uL0FjdG9yXCI7XHJcbmltcG9ydCBSaG9kZXNHYW1lIGZyb20gXCIuLi8uLi9SaG9kZXNHYW1lXCI7XHJcbmltcG9ydCB7IEFycmF5QWxnbyB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vRG9kRGF0YVN0cnVjdHVyZVwiO1xyXG5cclxuLyoqXHJcbiAqIOatpOWvueixoeaYr+S4gOenjeWPr+S7peiiq+aUu+WHu+eKtuaAgeacuuW6lOeUqOeahEFjdG9y5pCc57Si5ZmoXHJcbiAqIOS4k+mXqOeUqOadpeWvueW6lOWcsOWbvuiKgueCueaQnOe0ouaVjOS6uu+8iOiAjOmdnuW5suWRmO+8iVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1hcE5vZGVTZWVrZXIgaW1wbGVtZW50cyBTZWVrZXIge1xyXG5cclxuICAgIHByaXZhdGUgX29yaWdpbjpWZWMyOy8v5Lit5b+D5L2N572uXHJcbiAgICBwcml2YXRlIF9yb3RhdGU6bnVtYmVyID0gMDsvL+mhuuaXtumSiOaXi+i9rDkw5bqm55qE5qyh5pWw77yM6buY6K6k5Li6MFxyXG4gICAgcHJpdmF0ZSBfcmVsYXRpdmVOb2RlTGlzdDpWZWMyW10gPSBbXTsvL+mcgOimgeebkeaOp+eahOWcsOWbvuiKgueCueeahOebuOWvueS9jee9rlxyXG4gICAgcHJpdmF0ZSBfYWJzb2x1dGVOb2RlTGlzdDpWZWMyW10gPSBbXTsvL+mcgOimgeebkeaOp+eahOWcsOWbvuiKgueCueeahOe7neWvueS9jee9rlxyXG5cclxuICAgIHByaXZhdGUgX2ZvY3VzOkFjdG9yOy8v6ZSB5a6a55qE5pWM5Lq6XHJcbiAgICBwcml2YXRlIF9mb2N1c0NoYW5nZWQ6Ym9vbGVhbiA9IGZhbHNlOy8v6ZSB5a6a55qE5pWM5Lq65bey5L+u5pS5XHJcbiAgICBwcml2YXRlIF9jYXB0dXJlTGlzdDpBY3RvcltdLy/mjZXmjYnliLDnmoTmlYzkurpcclxuXHJcbiAgICBwcml2YXRlIHNldEFic29sdXRlKCk6dm9pZHsvL+mHjeaWsOiuoeeul+aJgOaciemcgOimgeebkeaOp+eahOWcsOWbvuiKgueCueeahOe7neWvueS9jee9rlxyXG4gICAgICAgIHRoaXMuX2Fic29sdXRlTm9kZUxpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLl9yZWxhdGl2ZU5vZGVMaXN0LmZvckVhY2goZWxlPT57XHJcbiAgICAgICAgICAgIHRoaXMuX2Fic29sdXRlTm9kZUxpc3QucHVzaCh0aGlzLl9vcmlnaW4ucGx1cyhlbGUpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKG9yaWdpbjpWZWMyLCByZXM6YW55LCByb3RhdGU6bnVtYmVyID0gMCl7XHJcbiAgICAgICAgLy/ov5nph4znmoRyZXPmmK/kuIDnp43ku6PooajmlLvlh7vojIPlm7TnsbvlnovnmoTmlbDmja5cclxuICAgICAgICB0aGlzLl9vcmlnaW4gPSBvcmlnaW47XHJcbiAgICAgICAgdGhpcy5fcm90YXRlID0gcm90YXRlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vdGVzdFxyXG4gICAgICAgIHRoaXMuX3JlbGF0aXZlTm9kZUxpc3QucHVzaChuZXcgVmVjMigwLDApLCBuZXcgVmVjMigxLDApLCBuZXcgVmVjMigyLDApKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuc2V0QWJzb2x1dGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVwb3NpdGlvbihwb3M6VmVjMik6dm9pZHtcclxuICAgICAgICB0aGlzLl9vcmlnaW4gPSBwb3M7XHJcbiAgICAgICAgdGhpcy5zZXRBYnNvbHV0ZSgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0Rm9jdXMoKTogQWN0b3Ige1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9mb2N1cztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Rm9jdXNMaXN0KGNvdW50OiBudW1iZXIpOiBBY3RvcltdIHtcclxuICAgICAgICAvL3RvZG86IOiAg+iZkeWcqGludGVyZmFjZeS4reenu+mZpOatpOmhuVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDYXB0dXJlTGlzdCgpOiBBY3RvcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2FwdHVyZUxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGZvbGxvd0FjdG9yKCk6IEFjdG9yIHtcclxuICAgICAgICAvL3RvZG86IOiAg+iZkeWcqGludGVyZmFjZeS4reenu+mZpOatpOmhuVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmb2N1c0NoYW5nZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZvY3VzQ2hhbmdlZDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICAvL+WIt+aWsOaNleaNieWIl+ihqFxyXG4gICAgICAgIHRoaXMuX2NhcHR1cmVMaXN0ID0gW107XHJcblxyXG4gICAgICAgIHRoaXMuX2Fic29sdXRlTm9kZUxpc3QuZm9yRWFjaChlbGU9PntcclxuICAgICAgICAgICAgbGV0IGxpc3Q6QWN0b3JbXSA9IFJob2Rlc0dhbWUuSW5zdGFuY2UuYmF0dGxlLm1hcE5vZGVDUFUubWF0cml4R2V0KGVsZSk7XHJcbiAgICAgICAgICAgIGxpc3QuZm9yRWFjaChlbGU9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NhcHR1cmVMaXN0LnB1c2goZWxlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NhcHR1cmVMaXN0ID0gQXJyYXlBbGdvLnNocmluayh0aGlzLl9jYXB0dXJlTGlzdCk7XHJcbiAgICAgICAgdGhpcy5fY2FwdHVyZUxpc3QgPSB0aGlzLl9jYXB0dXJlTGlzdC5maWx0ZXIoZWxlPT57XHJcbiAgICAgICAgICAgIHJldHVybiBlbGUudHlwZSA9PSBBY3RvclR5cGUuTW9uc3RlcjtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICAvL+WkhOeQhmZvY3VzXHJcbiAgICAgICAgaWYgKCAodGhpcy5fZm9jdXMgPT0gbnVsbCB8fCB0aGlzLl9mb2N1cyA9PSB1bmRlZmluZWQpICYmIHRoaXMuX2NhcHR1cmVMaXN0Lmxlbmd0aCA+IDApIHsvL+W9k+WJjeaXoOaNleaNieebruagh++8jOS4lGNhcHR1cmVMaXN05Lit5pyJ55uu5qCHXHJcbiAgICAgICAgICAgIHRoaXMuX2ZvY3VzID0gdGhpcy5fY2FwdHVyZUxpc3RbMF07XHJcbiAgICAgICAgICAgIHRoaXMuX2ZvY3VzQ2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9jYXB0dXJlTGlzdC5pbmRleE9mKHRoaXMuX2ZvY3VzKSA9PSAtMSkgey8v5b2T5YmN5o2V5o2J55uu5qCH5LiN5ZyoY2FwdHVyZUxpc3TkuK1cclxuICAgICAgICAgICAgdGhpcy5fZm9jdXMgPSB0aGlzLl9jYXB0dXJlTGlzdFswXTtcclxuICAgICAgICAgICAgdGhpcy5fZm9jdXNDaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Ugey8v5o2V5o2J55uu5qCH5pyq5pS55Y+YXHJcbiAgICAgICAgICAgIHRoaXMuX2ZvY3VzQ2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjdG9yU3RhdGVCYXNlIHtcclxuICAgIHByb3RlY3RlZCBfYWN0b3I6IEFjdG9yO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFjdG9yOiBBY3Rvcikge1xyXG4gICAgICAgIHRoaXMuX2FjdG9yID0gYWN0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudGVyKCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbGVhdmUoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQWN0b3JTdGF0ZUJhc2UgZnJvbSBcIi4vQWN0b3JTdGF0ZUJhc2VcIjtcclxuaW1wb3J0IEZpeFRpbWUsIHsgRG9kVGltZXIgfSBmcm9tIFwiLi4vLi4vLi4vRml4L0ZpeFRpbWVcIjtcclxuaW1wb3J0IHsgQWN0b3JTdGF0ZUlEIH0gZnJvbSBcIi4vQWN0b3JTdGF0ZUZzbVwiO1xyXG5pbXBvcnQgeyBBY3RvclR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0RvZEtleVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFjdG9yU3RhdGVCb3JuIGV4dGVuZHMgQWN0b3JTdGF0ZUJhc2V7XHJcblxyXG4gICAgcHJpdmF0ZSBfdGltZXI6RG9kVGltZXI7XHJcblxyXG4gICAgcHVibGljIGVudGVyKCk6dm9pZHtcclxuICAgICAgICB0aGlzLl90aW1lciA9IG5ldyBEb2RUaW1lcigzKTtcclxuICAgICAgICB0aGlzLl9hY3Rvci5yZW5kZXIuYm9ybkFuaW1hdGlvbigpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRW50ZXIgQm9yblwiKVxyXG4gICAgICAgIC8vdGVzdFxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTp2b2lke1xyXG4gICAgICAgIGlmICh0aGlzLl90aW1lci5yZWFkeSkgey8vdG9kbzog6L+Z5Liq5Ye655Sf5pe26Ze05bqU6K+l5piv5LiA5Liq5YWo5Zy65YWx6YCa55qE5bi45pWwXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQm9ybiBjb21wbGV0ZVwiKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2FjdG9yLnR5cGUgPT0gQWN0b3JUeXBlLk1vbnN0ZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FjdG9yLnN0YXRlLnJ1blN0YXRlKEFjdG9yU3RhdGVJRC5XYWxrKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9hY3Rvci50eXBlID09IEFjdG9yVHlwZS5PcGVyYXRvcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYWN0b3Iuc3RhdGUucnVuU3RhdGUoQWN0b3JTdGF0ZUlELkZpZ2h0KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oXCJVbmFjY2VwdGFibGUgQWN0b3IgVHlwZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbGVhdmUoKTp2b2lke1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibGVhdmUgYm9yblwiKTtcclxuICAgICAgICB0aGlzLl9hY3Rvci5yZW5kZXIuZGVwbG95KCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQWN0b3JTdGF0ZUJhc2UgZnJvbSBcIi4vQWN0b3JTdGF0ZUJhc2VcIjtcclxuXHJcbi8qKlxyXG4gKiDmlYzkurrnmoTooqvpmLvmjKHnirbmgIHjgIHlubLlkZjnmoTkuIDoiKznirbmgIFcclxuICovXHJcbmV4cG9ydCBjbGFzcyBBY3RvclN0YXRlRmlnaHQgZXh0ZW5kcyBBY3RvclN0YXRlQmFzZXtcclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6dm9pZHtcclxuICAgICAgICAvL3RvZG86IOiwg+eUqOaUu+WHu+eKtuaAgeacuueahOW4p+W+queOr1xyXG4gICAgICAgIC8qXHJcblxyXG4gICAgICAgICovXHJcbiAgICAgICB0aGlzLl9hY3Rvci5hdGsudXBkYXRlKCk7XHJcbiAgICAgICB0aGlzLl9hY3Rvci5ibG9ja2VyLnVwZGF0ZSgpOyBcclxuICAgIH1cclxufSIsImltcG9ydCBBY3RvclN0YXRlQmFzZSBmcm9tIFwiLi9BY3RvclN0YXRlQmFzZVwiO1xyXG5pbXBvcnQgRG9kTG9nIGZyb20gXCIuLi8uLi8uLi9Db21tb24vRG9kTG9nXCI7XHJcbmltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3JcIjtcclxuaW1wb3J0IHsgQWN0b3JTdGF0ZVdhbGsgfSBmcm9tIFwiLi9BY3RvclN0YXRlV2Fsa1wiO1xyXG5pbXBvcnQgeyBBY3RvclN0YXRlUHJlcGFyZWQgfSBmcm9tIFwiLi9BY3RvclN0YXRlUHJlcGFyZWRcIjtcclxuaW1wb3J0IHsgQWN0b3JTdGF0ZUZpZ2h0IH0gZnJvbSBcIi4vQWN0b3JTdGF0ZUZpZ2h0XCI7XHJcbmltcG9ydCB7IEFjdG9yU3RhdGVCb3JuIH0gZnJvbSBcIi4vQWN0b3JTdGF0ZUJvcm5cIjtcclxuXHJcbmV4cG9ydCBlbnVtIEFjdG9yU3RhdGVJRCB7XHJcbiAgICBOb25lLFxyXG4gICAgUHJlcGFyZWQsICAgICAvL+W+heacuiAo5pyq5Ye65YqoL+acqumDqOe9sikgIFxyXG4gICAgQm9ybiwgICAvL+WHuueUn+WKqOeUuyDkuI3lj6/mlLvlh7sg5LiN5Y+v6KKr5pS75Ye7XHJcbiAgICBXYWxrLCAgIC8v56e75YqoIOaVjOS6uueUqFxyXG4gICAgU3R1bm5lZCwgICAgLy/mmZXnnKkgZXRjIO+8iOaJk+aWreWKqOS9nOeahOiiq+aOp+WItueKtuaAge+8iVxyXG4gICAgRnJlZXplZCwgICAgLy/lhrDlhrsg77yI5LiN5omT5pat5Yqo5L2c55qE6KKr5o6n5Yi254q25oCB77yJXHJcbiAgICBGaWdodCwgIC8v5pmu5pS754q25oCBIOW5suWRmOW4uOaAgSDmlYzkurrooqvpmLvmjKHlkI5cclxuICAgIERlYXRoLCAgLy/mrbvkuqHliqjnlLsg5LiN5Y+v5pS75Ye7IOS4jeWPr+iiq+aUu+WHu1xyXG4gICAgRXNjYXBlLCAvL+aVjOS6uumAg+iEsVxyXG4gICAgQ291bnRcclxufVxyXG5cclxuLypcclxuICog6KeS6Imy54q25oCB5py6IOeuoeeQhuinkuiJsuaJgOWkhOmYtuautSDmoLnmja7kuI3lkIzpmLbmrrXlhrPlrprkuI3lkIznmoTnu4Tku7bnirbmgIFcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjdG9yU3RhdGVNZ3Ige1xyXG4gICAgcHJpdmF0ZSBfc3RhdGVzOiBBY3RvclN0YXRlQmFzZVtdID0gW107XHJcbiAgICBwcml2YXRlIF9jdXJyZW50U3RhdGU6IEFjdG9yU3RhdGVCYXNlO1xyXG4gICAgcHJpdmF0ZSBfY3VycmVudFN0YXRlVHlwZTogQWN0b3JTdGF0ZUlEID0gQWN0b3JTdGF0ZUlELk5vbmU7XHJcblxyXG4gICAgcHVibGljIGdldCBjdXJyZW50U3RhdGVUeXBlKCk6IEFjdG9yU3RhdGVJRHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudFN0YXRlVHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhY3RvcjogQWN0b3IpIHtcclxuICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX3N0YXRlc1tBY3RvclN0YXRlSUQuV2Fsa10gPSBuZXcgQWN0b3JTdGF0ZVdhbGsoYWN0b3IpO1xyXG4gICAgICAgIHRoaXMuX3N0YXRlc1tBY3RvclN0YXRlSUQuUHJlcGFyZWRdID0gbmV3IEFjdG9yU3RhdGVQcmVwYXJlZChhY3Rvcik7XHJcbiAgICAgICAgdGhpcy5fc3RhdGVzW0FjdG9yU3RhdGVJRC5GaWdodF0gPSBuZXcgQWN0b3JTdGF0ZUZpZ2h0KGFjdG9yKTtcclxuICAgICAgICB0aGlzLl9zdGF0ZXNbQWN0b3JTdGF0ZUlELkJvcm5dID0gbmV3IEFjdG9yU3RhdGVCb3JuKGFjdG9yKTtcclxuICAgICAgICAvL1RPRE9cclxuICAgICAgICAvL+WPgueFp+a4uOaIj+Wkp+eKtuaAgeaculxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgaW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJ1blN0YXRlKEFjdG9yU3RhdGVJRC5Ob25lKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcnVuU3RhdGUoc3RhdGVJRDogQWN0b3JTdGF0ZUlEKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKEFjdG9yU3RhdGVJRC5Db3VudCA8PSBzdGF0ZUlEIHx8IHN0YXRlSUQgPD0gQWN0b3JTdGF0ZUlELk5vbmUpIHtcclxuICAgICAgICAgICAgRG9kTG9nLmVycm9yKGBHYW1lU3RhdGVNZ3IucnVuU3RhdGU6IEludmFsaWQgc3RhdGVJRCBbJHtzdGF0ZUlEfV0uIGApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobnVsbCAhPSB0aGlzLl9jdXJyZW50U3RhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlLmxlYXZlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGVUeXBlID0gc3RhdGVJRDtcclxuICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUgPSB0aGlzLl9zdGF0ZXNbc3RhdGVJRF07XHJcbiAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlLmVudGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAobnVsbCAhPSB0aGlzLl9jdXJyZW50U3RhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlLnVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKG51bGwgIT0gdGhpcy5fY3VycmVudFN0YXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZS5sZWF2ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9zdGF0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5fc3RhdGVzW2ldO1xyXG4gICAgICAgICAgICBzdGF0ZS5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBBY3RvclN0YXRlQmFzZSBmcm9tIFwiLi9BY3RvclN0YXRlQmFzZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFjdG9yU3RhdGVQcmVwYXJlZCBleHRlbmRzIEFjdG9yU3RhdGVCYXNle1xyXG4gICAgcHVibGljIHVwZGF0ZSgpOnZvaWR7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJQZXJwYXJlZCB1cGRhdGVcIilcclxuICAgIH1cclxufSIsImltcG9ydCBBY3RvclN0YXRlQmFzZSBmcm9tIFwiLi9BY3RvclN0YXRlQmFzZVwiO1xyXG5pbXBvcnQgeyBBY3RvclR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0RvZEtleVwiO1xyXG5pbXBvcnQgeyBWZWMyIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Eb2RNYXRoXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQWN0b3JTdGF0ZVdhbGsgZXh0ZW5kcyBBY3RvclN0YXRlQmFzZXtcclxuICAgIFxyXG4gICAgcHVibGljIGVudGVyKCk6dm9pZHtcclxuICAgICAgICAvL+S4jeW6lOivpeWcqOi/meS4queKtuaAgemHjO+8jOW6lOivpeWcqGJvcm7ph4zov5vooYxkZXBsb3lcclxuICAgICAgICB0aGlzLl9hY3Rvci5yZW5kZXIuZGVwbG95KCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyB1cGRhdGUoKTp2b2lke1xyXG5cclxuICAgICAgICBsZXQgYWN0b3IgPSB0aGlzLl9hY3RvcjtcclxuXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIGlmIChhY3Rvci5ibG9ja2VyLmlzQmxvY2tlZCkge1xyXG4gICAgICAgICAgICAvL3RvZG86IOi9rOaNouWIsGZpZ2h054q25oCBXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IOS9oOS4jeimgei/h+adpeWVijpib29sZWFuID0gdHJ1ZTtcclxuICAgICAgICBpZiAoMT09MSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fYWN0b3IudHJhbnNmb3JtLnBvcy5hcnJpdmVkICYmIOS9oOS4jeimgei/h+adpeWViikgey8v5bey5Yiw6L6+55uu55qE5ZywXHJcbiAgICAgICAgICAgIGlmIChhY3Rvci5yb3V0ZS5uZXh0KCkpIHsvL+WtmOWcqOS4i+S4gOS4quebruagh+iKgueCuVxyXG4gICAgICAgICAgICAgICAgYWN0b3IudHJhbnNmb3JtLnBvcy5zZXRUYXJnZXQoYWN0b3Iucm91dGUuY3VycmVudFRhcmdldCgpKTsvL+Wwhuebruagh+abv+aNouS4uuS4i+S4gOS4quebruagh+iKgueCuVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy90b2RvOiDmlYzkurrlt7LliLDovr7nu4jngrlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcblxyXG4gICAgICAgIGlmICgh5L2g5LiN6KaB6L+H5p2l5ZWKKSB7Ly/ot5/pvKDmoIfnmoTpgLvovpFcclxuICAgICAgICAgICAgYWN0b3IudHJhbnNmb3JtLnBvcy5zZXRUYXJnZXQobmV3IFZlYzIoTGF5YS5zdGFnZS5tb3VzZVgtNTAsIExheWEuc3RhZ2UubW91c2VZLTUwKSk7XHJcbiAgICAgICAgICAgIGFjdG9yLnRyYW5zZm9ybS5wb3Muc2V0U3BlZWQoMjApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYWN0b3IudHJhbnNmb3JtLnBvcy5tb3ZlKCk7Ly/np7vliqhcclxuICAgICAgICBhY3Rvci5jb2xpRW1pdC5wb3NCeVZlYyhhY3Rvci50cmFuc2Zvcm0ucG9zLmRhdGEpOy8v56e75Yqo56Kw5pKe566xXHJcbiAgICAgICAgYWN0b3IuY29saUVtaXQuZXZlbnQoYWN0b3IsIGFjdG9yLnR5cGUpOy8v5Y+R5biD56Kw5pKe5LqL5Lu2XHJcbiAgICAgICAgYWN0b3IucmVuZGVyLm1vdmUoYWN0b3IudHJhbnNmb3JtLnBvcy5kYXRhKTsvL+enu+WKqOWPr+inhuWvueixoVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3IvQWN0b3JcIjtcclxuaW1wb3J0IHtNeVN5bWJvbH0gZnJvbSBcIi4uLy4uL0ZpeC9GaXhTeW1ib2xcIjtcclxuaW1wb3J0IHtDaXJjbGVDb2xsaXNpb25SYW5nZX0gZnJvbSBcIi4vQ29sbGlzaW9uUmFuZ2VcIjtcclxuXHJcblxyXG4vKipcclxuICog56Kw5pKe5aSE55CG5Zmo77yM6K+l57G757u05oqk5LiA5LiqTWFw77yMTWFw6K6w5b2V5omA5pyJ6ZyA6KaB6L+b6KGM56Kw5pKe5aSE55CG55qE56Kw5pKe5Zmo77yMTWFw55So56Kw5pKe5Zmo55qE5ZSv5LiA5qCH6K+G5L2c5Li66ZSu5Lul6YG/5YWN6YeN5aSN6K6w5b2V44CCXHJcbiAqXHJcbiAqIOivpeexu+aPkOS+m+S4gOS4qnJlY2FsY3VsYXRl5pa55rOV55So5LqO6YeN5paw6K6h566X56Kw5pKe5oOF5Ya177yM5a+55LqOTWFw5Lit55qE5q+P5Liq5aSE55CG5a+56LGh77yM6K+l5pa55rOV6K6h566X5YW25LiOTWFw5Lit55qE5omA5pyJ5YW25LuW5a+56LGhXHJcbiAqIOeahOmHjeWPoOaDheWGte+8jOW5tuWwhui/meS6m+mHjeWPoOeahOWFtuS7luWvueixoeS7peWIl+ihqOeahOW9ouW8j+S8oOmAkue7meivpeWkhOeQhuWvueixoeOAglxyXG4gKlxyXG4gKiBieSBYV1ZcclxuICovXHJcbmV4cG9ydCBjbGFzcyBBY3RvckNvbGxpc2lvblByb2Nlc3NvciB7XHJcblxyXG4gICAgcHJpdmF0ZSBfY29sbGlkZXJNYXA6IHsgW2tleTogbnVtYmVyXTogQWN0b3JDb2xsaWRlciB9ID0ge307XHJcblxyXG4gICAgcHVibGljIHJlZ2lzdGVyQ29sbGlkZXIoY29sbGlkZXI6IEFjdG9yQ29sbGlkZXIpIHtcclxuICAgICAgICB0aGlzLl9jb2xsaWRlck1hcFtjb2xsaWRlci5zeW1ib2wuZGF0YV0gPSBjb2xsaWRlcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdW5yZWdpc3RlckNvbGxpZGVyKGNvbGxpZGVyOiBBY3RvckNvbGxpZGVyKSB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX2NvbGxpZGVyTWFwW2NvbGxpZGVyLnN5bWJvbC5kYXRhXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5fY29sbGlkZXJNYXApIHtcclxuICAgICAgICAgICAgbGV0IHRhcmdldENvbGxpZGVyID0gdGhpcy5fY29sbGlkZXJNYXBbaV07XHJcbiAgICAgICAgICAgIGxldCBjb2xsaWRpbmdMaXN0ID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogaW4gdGhpcy5fY29sbGlkZXJNYXApIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb2xsaWRlciA9IHRoaXMuX2NvbGxpZGVyTWFwW2pdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbGxpZGVyID09IHRhcmdldENvbGxpZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0Q29sbGlkZXIuc2hvdWxkQ29sbGlkZVdpdGgoY29sbGlkZXIpICYmIHRhcmdldENvbGxpZGVyLmdldENvbGxpc2lvblJhbmdlKCkuaXNDb2luY2lkZVdpdGhSYW5nZShjb2xsaWRlci5nZXRDb2xsaXNpb25SYW5nZSgpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxpZGluZ0xpc3QucHVzaChjb2xsaWRlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGFyZ2V0Q29sbGlkZXIub25Db2xsaWRpbmdMaXN0UmVmcmVzaChjb2xsaWRpbmdMaXN0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFjdG9yQ29sbGlkZXIge1xyXG4gICAgLy/llK/kuIDmoIfor4ZcclxuICAgIHB1YmxpYyByZWFkb25seSBzeW1ib2w6IE15U3ltYm9sID0gbmV3IE15U3ltYm9sKCk7XHJcblxyXG4gICAgLy/ojrflj5bnorDmkp7ojIPlm7RcclxuICAgIGFic3RyYWN0IGdldENvbGxpc2lvblJhbmdlKCk6IENpcmNsZUNvbGxpc2lvblJhbmdlIDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmHjeiuvueisOaSnuiMg+WbtFxyXG4gICAgICogQHBhcmFtIHJhbmdlIOaWsOeahOeisOaSnuiMg+WbtFxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBzZXRDb2xsaXNpb25SYW5nZShyYW5nZTogQ2lyY2xlQ29sbGlzaW9uUmFuZ2UpO1xyXG5cclxuICAgIC8v6I635Y+W56Kw5pKe5Zmo55qE5omA5pyJ6ICFXHJcbiAgICBhYnN0cmFjdCBnZXRBY3RvcigpOiBBY3RvcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOeisOaSnuWIl+ihqOmcgOimgeWIt+aWsFxyXG4gICAgICogQHBhcmFtIGNvbGxpZGluZ0xpc3Qg5paw55qE56Kw5pKe5YiX6KGoXHJcbiAgICAgKiAqL1xyXG4gICAgYWJzdHJhY3Qgb25Db2xsaWRpbmdMaXN0UmVmcmVzaChjb2xsaWRpbmdMaXN0OiBBY3RvckNvbGxpZGVyW10pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm5bqU6K+l5LiO5oyH5a6a56Kw5pKe5Zmo5Y+R55Sf56Kw5pKeXHJcbiAgICAgKiBAcGFyYW0gY29sbGlkZXIg5Y+m5LiA5Liq56Kw5pKe5ZmoXHJcbiAgICAgKiAqL1xyXG4gICAgYWJzdHJhY3Qgc2hvdWxkQ29sbGlkZVdpdGgoY29sbGlkZXI6IEFjdG9yQ29sbGlkZXIpOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b2T5YmN56Kw5pKe5YiX6KGoXHJcbiAgICAgKiAqL1xyXG4gICAgYWJzdHJhY3QgZ2V0Q29sbGlkaW5nTGlzdCgpOiBBY3RvckNvbGxpZGVyW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliLfmlrDnorDmkp7ojIPlm7TvvIzkvb/lhbbot5/pmo/miYDmnInogIXnp7vliqhcclxuICAgICAqICovXHJcbiAgICBhYnN0cmFjdCByZWZyZXNoQ29sbGlzaW9uUmFuZ2VGb2xsb3dBY3RvcigpO1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNpbXBsZUFjdG9yQ29sbGlkZXIgZXh0ZW5kcyBBY3RvckNvbGxpZGVyIHtcclxuXHJcbiAgICBwcml2YXRlIGNvbGxpZGluZ0xpc3Q6IEFjdG9yQ29sbGlkZXJbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBhY3RvcjogQWN0b3I7XHJcbiAgICBwcml2YXRlIHJhbmdlOiBDaXJjbGVDb2xsaXNpb25SYW5nZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhY3RvcjogQWN0b3IsIHJhbmdlOiBDaXJjbGVDb2xsaXNpb25SYW5nZSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5hY3RvciA9IGFjdG9yO1xyXG4gICAgICAgIHRoaXMucmFuZ2UgPSByYW5nZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0Q29sbGlzaW9uUmFuZ2UoKTogQ2lyY2xlQ29sbGlzaW9uUmFuZ2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJhbmdlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldENvbGxpc2lvblJhbmdlKHJhbmdlOiBDaXJjbGVDb2xsaXNpb25SYW5nZSkge1xyXG4gICAgICAgIHRoaXMucmFuZ2UgPSByYW5nZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBY3RvcigpOiBBY3RvciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q29sbGlkaW5nTGlzdCgpOiBBY3RvckNvbGxpZGVyW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbGxpZGluZ0xpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgb25Db2xsaWRpbmdMaXN0UmVmcmVzaChjb2xsaWRpbmdMaXN0OiBBY3RvckNvbGxpZGVyW10pIHtcclxuICAgICAgICB0aGlzLmNvbGxpZGluZ0xpc3QgPSBjb2xsaWRpbmdMaXN0O1xyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJpbXBvcnQgeyBDb2xpUmVjZWl2ZXIsIENvbGlFbWl0IH0gZnJvbSBcIi4uL0FjdG9yL0FjdG9yTW9kdWxlcy9Db2xpTWVzc2FnZVwiO1xyXG5pbXBvcnQgeyBWZWMyIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9Eb2RNYXRoXCI7XHJcbmltcG9ydCBBY3RvciBmcm9tIFwiLi4vQWN0b3IvQWN0b3JcIjtcclxuaW1wb3J0IHsgQXJyYXlBbGdvIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9Eb2REYXRhU3RydWN0dXJlXCI7XHJcbmltcG9ydCB7IEFjdG9yVHlwZSB9IGZyb20gXCIuLi8uLi9Db21tb24vRG9kS2V5XCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29saVJlcG9ydGVyIGV4dGVuZHMgQ29saVJlY2VpdmVyIHtcclxuICAgIHB1YmxpYyBpbkxpc3Q6IFZlYzJbXSA9IFtdO1xyXG4gICAgcHVibGljIGxheWVyOiBMYXlhLlNwcml0ZSA9IG5ldyBMYXlhLlNwcml0ZSgpO1xyXG5cclxuICAgIHByaXZhdGUgX21hdHJpeDogQWN0b3JbXVtdW10gPSBbXTsvL+WtmOWCqOavj+S4quWcsOWbvuiKgueCueS4reeahEFjdG9y5a+56LGhXHJcblxyXG4gICAgcHJpdmF0ZSBtYXRyaXhBZGQocG9zOlZlYzIsIGFjdG9yOkFjdG9yKTp2b2lke1xyXG4gICAgICAgIHRoaXMuX21hdHJpeFtwb3MueF1bcG9zLnldLnB1c2goYWN0b3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbWF0cml4UmVtb3ZlKHBvczpWZWMyLCBhY3RvcjpBY3Rvcik6dm9pZHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX21hdHJpeFtwb3MueF1bcG9zLnldLmluZGV4T2YoYWN0b3IpO1xyXG4gICAgICAgIGlmIChpbmRleCAhPSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXRyaXhbcG9zLnhdW3Bvcy55XS5zcGxpY2UoaW5kZXgsMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtYXRyaXhHZXQocG9zOlZlYzIpOkFjdG9yW117XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hdHJpeFtwb3MueF1bcG9zLnldO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKDEwLCAxMCk7XHJcbiAgICAgICAgZm9yIChsZXQgdyA9IDA7IHcgPCAxMDsgdyArPSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hdHJpeFt3XSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBoID0gMDsgaCA8IDEwOyBoICs9IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGV0ZWN0aW9uKG5ldyBWZWMyKHcsIGgpLCBgJHtBY3RvclR5cGUuTW9uc3Rlcn1gKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hdHJpeFt3XVtoXSA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMubGF5ZXIpO1xyXG4gICAgICAgIHRoaXMubGF5ZXIuek9yZGVyID0gLTEwO1xyXG4gICAgICAgIHRoaXMubGF5ZXIucG9zKDUwLDUwKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FbnRyZShhY3RvcjogQWN0b3IsIHBvczogVmVjMik6IHZvaWQge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRW50ZXJcIiArIHBvcy54ICsgXCJ8XCIgKyBwb3MueSk7XHJcbiAgICAgICAgdGhpcy5pbkxpc3QucHVzaChwb3MpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICAgICAgdGhpcy5tYXRyaXhBZGQocG9zLGFjdG9yKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25MZWF2ZShhY3RvcjogQWN0b3IsIHBvczogVmVjMik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gQXJyYXlBbGdvLmZpbmRFbGUocG9zLCB0aGlzLmluTGlzdCk7XHJcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLmluTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgIHRoaXMubWF0cml4UmVtb3ZlKHBvcyxhY3Rvcik7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJMZWF2ZVwiICsgcG9zLnggKyBcInxcIiArIHBvcy55KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVuZGVyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubGF5ZXIuZ3JhcGhpY3MuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLmluTGlzdC5mb3JFYWNoKGVsZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXIuZ3JhcGhpY3MuZHJhd1JlY3QoZWxlLnggKiBDb2xpRW1pdC5HTE9CQUxfVU5JVF9XSURUSCArIDEsXHJcbiAgICAgICAgICAgICAgICBlbGUueSAqIENvbGlFbWl0LkdMT0JBTF9VTklUX0hFSUdIVCArIDEsXHJcbiAgICAgICAgICAgICAgICBDb2xpRW1pdC5HTE9CQUxfVU5JVF9XSURUSCAtIDIsXHJcbiAgICAgICAgICAgICAgICBDb2xpRW1pdC5HTE9CQUxfVU5JVF9IRUlHSFQgLSAyLFxyXG4gICAgICAgICAgICAgICAgXCIjZmYwMDAwXCJcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgR2FtZU1hcCBmcm9tIFwiLi9HYW1lTGV2ZWxcIjtcclxuaW1wb3J0IHsgQWN0b3JDb2xsaXNpb25Qcm9jZXNzb3IgfSBmcm9tIFwiLi9Db2xsaXNpb24vQWN0b3JDb2xsaXNpb25Qcm9jZXNzb3JcIjtcclxuaW1wb3J0IEdhbWVMZXZlbCBmcm9tIFwiLi9HYW1lTGV2ZWxcIjtcclxuaW1wb3J0IERvZFJlc291cmNlTWdyIGZyb20gXCIuLi9SZXNvdXJjZXMvRG9kUmVzb3VyY2VNZ3JcIjtcclxuaW1wb3J0IEFjdG9yTWdyIGZyb20gXCIuL0FjdG9yL0FjdG9yTWdyXCI7XHJcbmltcG9ydCBDb2xpUmVwb3J0ZXIgZnJvbSBcIi4vQ29sbGlzaW9uL0NvbGlSZXBvcnRlclwiO1xyXG5pbXBvcnQgR2FtZVVJRXZlbnQgZnJvbSBcIi4vR2FtZVVJRXZlbnRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVCYXR0bGUge1xyXG4gICAgcHVibGljIGxldmVsOiBHYW1lTGV2ZWw7XHJcbiAgICBwdWJsaWMgbWFwOiBHYW1lTWFwO1xyXG4gICAgcHVibGljIGFjdG9yTWdyOiBBY3Rvck1ncjtcclxuXHJcbiAgICBwdWJsaWMgY29sbGlzaW9uOiBBY3RvckNvbGxpc2lvblByb2Nlc3NvcjsvL+i0n+i0o+WchuW9oueisOaSnuajgOa1i1xyXG4gICAgcHVibGljIG1hcE5vZGVDUFU6IENvbGlSZXBvcnRlciA9IG5ldyBDb2xpUmVwb3J0ZXIoKTsvL+i0n+i0o+WcsOWbvuiKgueCueeisOaSnuajgOa1i1xyXG5cclxuICAgIHB1YmxpYyBnYW1lVUlFdmVudDpHYW1lVUlFdmVudDtcclxuXHJcbiAgICBwcml2YXRlIF9sZXZlbFByZXBhcmVkOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubGV2ZWwgPSBuZXcgR2FtZUxldmVsKCk7XHJcbiAgICAgICAgdGhpcy5tYXAgPSBuZXcgR2FtZU1hcCgpO1xyXG4gICAgICAgIHRoaXMuYWN0b3JNZ3IgPSBuZXcgQWN0b3JNZ3IoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb2xsaXNpb24gPSBuZXcgQWN0b3JDb2xsaXNpb25Qcm9jZXNzb3IoKTtcclxuICAgICAgICB0aGlzLmdhbWVVSUV2ZW50ID0gbmV3IEdhbWVVSUV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHByZXBhcmVMZXZlbCgpOiB2b2lkIHtcclxuICAgICAgICAvL1RPRE8gaW5pdCBsZXZlbCBpbmZvcm1hdGlvblxyXG4gICAgICAgIGxldCByZXMgPSBEb2RSZXNvdXJjZU1nci5JbnN0YW5jZS5nZXRDdXJyZW50TGV2ZWxSZXMoKTtcclxuXHJcbiAgICAgICAgLy90ZXN0XHJcbiAgICAgICAgcmVzID0ge2xldmVsOjEsbWFwOjJ9O1xyXG5cclxuICAgICAgICB0aGlzLmxldmVsLmluaXQocmVzWydsZXZlbCddKTsgLy9qdXN0IHNhbXBsZVxyXG4gICAgICAgIHRoaXMubWFwLmluaXQocmVzWydtYXAnXSk7XHJcbiAgICAgICAgdGhpcy5hY3Rvck1nci5pbml0KHJlc1snbWFwJ10pO1xyXG5cclxuICAgICAgICAvL0FORCBET05UIEZPUkdFVCBSRVNFVCBMQVNUIEJBVFRMRSBEQVRBIFJFTUFJTlMuIFxyXG4gICAgICAgIC8vdGhpcy5jb2xsaXNpb24ucmVzZXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fbGV2ZWxQcmVwYXJlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzTGV2ZWxQcmVwcmFyZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xldmVsUHJlcGFyZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIC8vVE9ET1xyXG4gICAgICAgIC8vQ0xFQVIgTEFTVCBCQVRUTEUgUkVTT1VSQ0VcclxuICAgICAgICB0aGlzLl9sZXZlbFByZXBhcmVkID0gZmFsc2U7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQmF0dGxlQ29uc3Qge1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBzdGFuZGFyZENvc3RJbmNyZWFzZVJhdGlvOiBudW1iZXIgPSAxO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBtYXhDb3N0TnVtOiBudW1iZXIgPSA5OTtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgaW5pdENvc3ROdW06IG51bWJlciA9IDY7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGxpZmVQb2ludDogbnVtYmVyID0gMztcclxufSIsImltcG9ydCB7IEJ1ZmYgfSBmcm9tIFwiLi9BY3Rvci9BY3Rvck1vZHVsZXMvQnVmZlwiO1xyXG5pbXBvcnQgeyBFdmVudENlbnRyZSB9IGZyb20gXCIuLi9FdmVudC9FdmVudENlbnRyZVwiO1xyXG5pbXBvcnQgRml4VGltZSBmcm9tIFwiLi4vRml4L0ZpeFRpbWVcIjtcclxuaW1wb3J0IERvZFJlc291cmNlTWdyIGZyb20gXCIuLi9SZXNvdXJjZXMvRG9kUmVzb3VyY2VNZ3JcIjtcclxuaW1wb3J0IEdhbWVCYXR0bGVDb25zdCBmcm9tIFwiLi9HYW1lQmF0dGxlQ29uc3RcIjtcclxuLyoqXHJcbiAqIOaooeWdl+ivtOaYjjog5ri45oiP5oiY5paX5Zyw5Zu+5qih5Z2XICBcclxuICog6LSf6LSj5YaF5a65OiDlnLDlm77lsZ7mgKforr7nva7vvIzlhajlsYBidWZm566h55CGICBcclxuICog6LSf6LSj5Lq6OiDpk7bljY4gIFxyXG4gKiDml7bpl7Q6IDIwMjDlubQz5pyIM+aXpTEyOjQ1OjQxICBcclxuICovXHJcblxyXG4vL0tSOiDlhajlsYDnlLHlhbPljaHmqKHlnZfnrqHnkIYgQOmTtuWNjlxyXG4vL+i/memHjOWPr+S7peWMheWQq+WFqOWxgOeahOiwg+aVtOWAvC/nlJ/lkb3lgLwv5rao6LS5XHJcbi8v5YWo5ri45oiP5qCH5YeG5YC85L2/55So5bi46YeP5a6a5LmJ5ZyoQmF0dGxlQ29uc3TnsbvkuK0g56S65L6L5Y+v5Lul55yL5LiL5pa5XHJcbi8v5Y+m77ya56eB5pyJ5oiQ5ZGY5ZG95ZCN6K+35Zyo5YmN6Z2i5Yqg5LiL5YiS57q/IOWjsOaYjueahOaIkOWRmOivt+WcqOaehOmAoOWHveaVsOS4reWFqOmDqOWIneWni+WMluS4gOS4quWAvO+8jOmYsuatonVuZGVmaW5lZCjph47mjIfpkogp55qE5oOF5Ya15Y+R55SfXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lTGV2ZWx7XHJcbiAgICBwcml2YXRlIF9pbml0aWFsQ29zdDpudW1iZXI7XHJcbiAgICBwcml2YXRlIF9jdXJyZW50Q29zdDpudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfbGlmZVBvaW50Om51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIF90aW1lTGluZTpudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2xvYmFsQnVmZkxpc3Q6IEJ1ZmZbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuX2luaXRpYWxDb3N0ID0gMDtcclxuICAgICAgICB0aGlzLl9jdXJyZW50Q29zdCA9IDA7XHJcbiAgICAgICAgdGhpcy5fbGlmZVBvaW50ID0gMDtcclxuICAgICAgICB0aGlzLl90aW1lTGluZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fZ2xvYmFsQnVmZkxpc3QgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdChyZXM6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIC8vZm9yIGV4YW1wbGVcclxuICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICAgICAgdGhpcy5faW5pdGlhbENvc3QgPSB0aGlzLl9jdXJyZW50Q29zdCA9IHJlc1snaW5pdENvc3QnXSB8fCBHYW1lQmF0dGxlQ29uc3QuaW5pdENvc3ROdW07XHJcbiAgICAgICAgdGhpcy5fbGlmZVBvaW50ID0gcmVzWydsaWZlJ10gfHwgR2FtZUJhdHRsZUNvbnN0LmxpZmVQb2ludDtcclxuICAgICAgICB0aGlzLl90aW1lTGluZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5nZXRHbG9iYWxCdWZmTGlzdCgpO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZVRpbWUoKTsgXHJcbiAgICAgICAgdGhpcy5fdXBkYXRlQ29zdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRHbG9iYWxCdWZmTGlzdCgpOkJ1ZmZbXXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2xvYmFsQnVmZkxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoYW5nZUNvc3QoKTp2b2lke1xyXG4gICAgICAgIC8vdG9kby4uLi5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF91cGRhdGVUaW1lKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3RpbWVMaW5lICs9IEZpeFRpbWUuZGVsdGFUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3VwZGF0ZUNvc3QoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9nbG9iYWxCdWZmTGlzdC5zcGxpY2UoMCwgdGhpcy5fZ2xvYmFsQnVmZkxpc3QubGVuZ3RoKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgUmhvZGVzR2FtZSBmcm9tIFwiLi9SaG9kZXNHYW1lXCI7XHJcbmltcG9ydCBQZXJmb3JtYW5jZUNlbnRyZSBmcm9tIFwiLi4vQ29tbW9uL0dyYXBoaWNzL1BlcmZvcm1hbmNlX01vZHVsZS9QZXJmb3JtYW5jZUNlbnRyZVwiO1xyXG5pbXBvcnQgeyBWZWMyIH0gZnJvbSBcIi4uL0NvbW1vbi9Eb2RNYXRoXCI7XHJcbmltcG9ydCB7IFN5bWJvbGl6ZWQsIE15U3ltYm9sIH0gZnJvbSBcIi4uL0ZpeC9GaXhTeW1ib2xcIjtcclxuaW1wb3J0IHsgQ29saUVtaXQgfSBmcm9tIFwiLi9BY3Rvci9BY3Rvck1vZHVsZXMvQ29saU1lc3NhZ2VcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVVSUV2ZW50IHtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGZ1Y2s6bnVtYmVyID0gMTtcclxuXHJcbiAgICBwcml2YXRlIF9jYW5jbGVMaXN0OkZ1bmN0aW9uW10gPSBbXTsvL3RvZG9cclxuXHJcbiAgICBwcml2YXRlIGlkaW90czpJZGlvdFtdID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fcmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3JlZ2lzdGVyRXZlbnQoKTogdm9pZCB7XHJcbiAgICAgICAgUGVyZm9ybWFuY2VDZW50cmUuaW5zdGFuY2UubWFpblNwci5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCAoKT0+e1xyXG4gICAgICAgICAgICBsZXQgcG9zID0gbmV3IFZlYzIoXHJcbiAgICAgICAgICAgICAgICBQZXJmb3JtYW5jZUNlbnRyZS5pbnN0YW5jZS5tYWluU3ByLm1vdXNlWCxcclxuICAgICAgICAgICAgICAgIFBlcmZvcm1hbmNlQ2VudHJlLmluc3RhbmNlLm1haW5TcHIubW91c2VZXHJcbiAgICAgICAgICAgICkuYWRzb3JwKENvbGlFbWl0LkdMT0JBTF9VTklUX1dJRFRIKTtcclxuICAgICAgICAgICAgUmhvZGVzR2FtZS5JbnN0YW5jZS5iYXR0bGUuYWN0b3JNZ3IuZGVwbG95T3BydChHYW1lVUlFdmVudC5mdWNrLHBvcyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIExheWEudGltZXIubG9vcCgxMDAsIHRoaXMsICgpPT57XHJcbiAgICAgICAgICAgIGxldCBwb3MgPSBuZXcgVmVjMihcclxuICAgICAgICAgICAgICAgIFBlcmZvcm1hbmNlQ2VudHJlLmluc3RhbmNlLm1haW5TcHIubW91c2VYLFxyXG4gICAgICAgICAgICAgICAgUGVyZm9ybWFuY2VDZW50cmUuaW5zdGFuY2UubWFpblNwci5tb3VzZVlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocG9zKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBMYXlhLnRpbWVyLmxvb3AoMjAwLHRoaXMsdGhpcy51cGRhdGUpO1xyXG5cclxuICAgICAgICAvL1RPRE8gXHJcbiAgICAgICAgLy9A6Zi/6JGxIOWcqOi/meS4quexu+mHjOazqOWGjOaJgOacieaImOaWl+aooeWdl+aJgOmcgOaOpeaUtueahFVJ5LqL5Lu2XHJcbiAgICAgICAgLy9AZXhhbXBsZVxyXG4gICAgICAgIC8vZXZlbnRjZW50ZXIub24oZXZlbnRjZW50ZXIuZ2FtZXBhdXNlLCB0aGlzLCB0aGlzLl9vbkdhbWVQYXVzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVSeS6i+S7tuWkhOeQhuexu+WfuuacrOWujOWFqOmAmui/h+S6i+S7tuS4juWklueVjOi/m+ihjOS6pOS6ku+8jOayoeaciei/m+ihjOW4p+W+queOr+eahOW/heimgVxyXG4gICAgICog5q2k5aSE55qEdXBkYXRl5Ye95pWw5LuF55So5LqO5byA5Y+R5L6/5YipXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cGRhdGUoKTp2b2lke1xyXG4gICAgICAgIHdoaWxlICh0aGlzLmlkaW90cy5sZW5ndGggPCBSaG9kZXNHYW1lLkluc3RhbmNlLmJhdHRsZS5hY3Rvck1nci5zaWRlQmFyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBsZXQgaWRpID0gbmV3IElkaW90KCk7XHJcbiAgICAgICAgICAgIHRoaXMuaWRpb3RzLnB1c2goaWRpKTtcclxuICAgICAgICAgICAgUGVyZm9ybWFuY2VDZW50cmUuaW5zdGFuY2UuZGlzcGxheUFjdG9yKGlkaSwgbmV3IFZlYzIoNTAgKyAxMDAqaWRpLm5udW0sIDYwMCksIG5ldyBWZWMyKDEwMCwxMDApKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdoaWxlICh0aGlzLmlkaW90cy5sZW5ndGggPiBSaG9kZXNHYW1lLkluc3RhbmNlLmJhdHRsZS5hY3Rvck1nci5zaWRlQmFyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBQZXJmb3JtYW5jZUNlbnRyZS5pbnN0YW5jZS5kaXN0cm95QWN0b3IodGhpcy5pZGlvdHMucG9wKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pZGlvdHMuZm9yRWFjaCgoaWRpb3QsIGluZGV4KT0+e1xyXG4gICAgICAgICAgICBQZXJmb3JtYW5jZUNlbnRyZS5pbnN0YW5jZS5hdHRhY2hCdXR0b24oaWRpb3QsIDEsICgpPT57XHJcbiAgICAgICAgICAgICAgICBHYW1lVUlFdmVudC5mdWNrID0gUmhvZGVzR2FtZS5JbnN0YW5jZS5iYXR0bGUuYWN0b3JNZ3Iuc2lkZUJhcltpbmRleF0uc3ltYm9sLmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vQGV4YW1wbGVcclxuICAgIC8vIHByaXZhdGUgX29uR2FtZVBhdXNlKCk6IHZvaWQge1xyXG4gICAgLy8gICAgIFJob2Rlc0dhbWUuSW5zdGFuY2UuYmF0dGxlLmxldmVsLnBhdXNlR2FtZSgpO1xyXG4gICAgLy8gfVxyXG59XHJcblxyXG5jbGFzcyBJZGlvdCBpbXBsZW1lbnRzIFN5bWJvbGl6ZWQge1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbnVtID0gMDtcclxuXHJcbiAgICBzeW1ib2w6IE15U3ltYm9sID0gbmV3IE15U3ltYm9sKCk7XHJcblxyXG4gICAgcHVibGljIG5udW0gPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5ubnVtID0gSWRpb3QubnVtO1xyXG4gICAgICAgIHRoaXMubm51bSArPSAxO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IERvZExvZyBmcm9tIFwiLi4vQ29tbW9uL0RvZExvZ1wiO1xyXG5pbXBvcnQgR2FtZVN0YXRlTWdyIGZyb20gXCIuL1N0YXRlL0dhbWVTdGF0ZU1nclwiO1xyXG5pbXBvcnQgR2FtZUJhdHRsZSBmcm9tIFwiLi9HYW1lQmF0dGxlXCI7XHJcbmltcG9ydCBHYW1lTG9iYnkgZnJvbSBcIi4vTG9iYnkvR2FtZUxvYmJ5XCI7XHJcblxyXG4vKipcclxuICog6L+Z5piv5ri45oiP5pys5L2TXHJcbiAqIOivtOS4gOS6m1Job2Rlc19HYW1l5paH5Lu25aS55LiL55qE5rOo6YeK6KeE5YiZ77yM5pa55L6/5Lul5ZCOY3RybCtmXHJcbiAqXHJcbiAqIDEuLy9AdG9kbyDmoIfms6jpnIDopoHlrozlloTnmoTpg6jliIZcclxuICpcclxuICogMi4vL0B0b2ZpeCDmoIfms6jlt7Lnn6XmnInpl67popjnmoTpg6jliIZcclxuICpcclxuICogMy4vL0B0ZXN0IOagh+azqOS7heS+m+a1i+ivleS9v+eUqOeahOmDqOWIhlxyXG4gKlxyXG4gKiAzLi8vQHJlZGNhbGwg5qCH5rOo6LCD55So5riy5p+T5qih5Z2X55qE6YOo5YiGXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSaG9kZXNHYW1lIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogUmhvZGVzR2FtZTtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IEluc3RhbmNlKCk6IFJob2Rlc0dhbWUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZSB8fCAodGhpcy5faW5zdGFuY2UgPSBuZXcgdGhpcygpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGVNZ3I6IEdhbWVTdGF0ZU1ncjtcclxuICAgIHB1YmxpYyBiYXR0bGU6IEdhbWVCYXR0bGU7XHJcbiAgICBwdWJsaWMgbG9iYnk6IEdhbWVMb2JieTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5iYXR0bGUgPSBuZXcgR2FtZUJhdHRsZSgpO1xyXG4gICAgICAgIHRoaXMuc3RhdGVNZ3IgPSBuZXcgR2FtZVN0YXRlTWdyKHRoaXMuYmF0dGxlKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXRlTWdyLmluaXQoKTtcclxuICAgICAgICBEb2RMb2cuZGVidWcoYFJob2Rlc0dhbWU6IGluaXRpYWxpemF0aW9uIGNvbXBsZXRlLiBgKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZU1nci51cGRhdGUoKTtcclxuICAgIH1cclxuXHJcblxyXG59IiwiaW1wb3J0IEdhbWVCYXR0bGUgZnJvbSBcIi4uL0dhbWVCYXR0bGVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTdGF0ZUJhc2Uge1xyXG4gICAgcHJvdGVjdGVkIF9iYXR0bGU6IEdhbWVCYXR0bGU7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYmF0dGxlOiBHYW1lQmF0dGxlKSB7XHJcbiAgICAgICAgdGhpcy5fYmF0dGxlID0gYmF0dGxlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnRlcigpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxlYXZlKCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEdhbWVTdGF0ZUJhc2UgZnJvbSBcIi4vR2FtZVN0YXRlQmFzZVwiO1xyXG5pbXBvcnQgUmhvZGVzR2FtZSBmcm9tIFwiLi4vUmhvZGVzR2FtZVwiO1xyXG5pbXBvcnQgR2FtZUJhdHRsZSBmcm9tIFwiLi4vR2FtZUJhdHRsZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVN0YXRlQmF0dGxlIGV4dGVuZHMgR2FtZVN0YXRlQmFzZXtcclxuICAgIGNvbnN0cnVjdG9yKGJhdHRsZTpHYW1lQmF0dGxlKSB7XHJcbiAgICAgICAgc3VwZXIoYmF0dGxlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW50ZXIoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuZW50ZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbGVhdmUoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIubGVhdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIucmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLnVwZGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuX2JhdHRsZS5jb2xsaXNpb24udXBkYXRlKCk7XHJcbiAgICAgICAgdGhpcy5fYmF0dGxlLmFjdG9yTWdyLnVwZGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuX2JhdHRsZS5tYXAudXBkYXRlKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgR2FtZVN0YXRlQmFzZSBmcm9tIFwiLi9HYW1lU3RhdGVCYXNlXCI7XHJcbmltcG9ydCBSaG9kZXNHYW1lIGZyb20gXCIuLi9SaG9kZXNHYW1lXCI7XHJcbmltcG9ydCBEb2RSZXNvdXJjZU1nciBmcm9tIFwiLi4vLi4vUmVzb3VyY2VzL0RvZFJlc291cmNlTWdyXCI7XHJcbmltcG9ydCB7IEdhbWVTdGF0ZUlEIH0gZnJvbSBcIi4vR2FtZVN0YXRlTWdyXCI7XHJcbmltcG9ydCBEb2RMb2cgZnJvbSBcIi4uLy4uL0NvbW1vbi9Eb2RMb2dcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTdGF0ZUdhbWVsb2FkIGV4dGVuZHMgR2FtZVN0YXRlQmFzZXtcclxuICAgIGNvbnN0cnVjdG9yKGJhdHRsZSkge1xyXG4gICAgICAgIHN1cGVyKGJhdHRsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudGVyKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmVudGVyKCk7XHJcbiAgICAgICAgLy9UT0RPIFNIT1cgTE9BRElORyBTQ1JFRU5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbGVhdmUoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIubGVhdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIucmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLnVwZGF0ZSgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiR2FtZUxvYWQgdXBkYXRlXCIpO1xyXG4gICAgICAgIGlmICh0cnVlID09IERvZFJlc291cmNlTWdyLkluc3RhbmNlLmluaXRlZCgpKSB7XHJcbiAgICAgICAgICAgIC8vV0UgRE8gTk9UIEhBVkUgTE9CQlkgTU9EVUxFIElOIFRISVMgVkVSU0lPTlxyXG4gICAgICAgICAgICAvL0pVU1QgU0VUIExFVkVMIElEIEhFUkVcclxuICAgICAgICAgICAgLy9UTyBERUxcclxuICAgICAgICAgICAgRG9kUmVzb3VyY2VNZ3IuSW5zdGFuY2Uuc2V0TGV2ZWxJRCgxKTtcclxuICAgICAgICAgICAgUmhvZGVzR2FtZS5JbnN0YW5jZS5zdGF0ZU1nci5ydW5TdGF0ZShHYW1lU3RhdGVJRC5MZXZlbGxvYWQpO1xyXG4gICAgICAgICAgICBEb2RMb2cuZGVidWcoYEdhbWVTdGF0ZUdhbWVsb2FkLnVwZGF0ZTogUmVzb3VyY2VzIGluaXQgY29tcGxldGUsIHNldCBsZXZlbCBpbnRvIDEuIGApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBHYW1lU3RhdGVCYXNlIGZyb20gXCIuL0dhbWVTdGF0ZUJhc2VcIjtcclxuaW1wb3J0IFJob2Rlc0dhbWUgZnJvbSBcIi4uL1Job2Rlc0dhbWVcIjtcclxuaW1wb3J0IHsgR2FtZVN0YXRlSUQgfSBmcm9tIFwiLi9HYW1lU3RhdGVNZ3JcIjtcclxuaW1wb3J0IERvZFJlc291cmNlTWdyIGZyb20gXCIuLi8uLi9SZXNvdXJjZXMvRG9kUmVzb3VyY2VNZ3JcIjtcclxuaW1wb3J0IERvZExvZyBmcm9tIFwiLi4vLi4vQ29tbW9uL0RvZExvZ1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVN0YXRlTGV2ZWxMb2FkIGV4dGVuZHMgR2FtZVN0YXRlQmFzZXtcclxuICAgIGNvbnN0cnVjdG9yKGJhdHRsZSkge1xyXG4gICAgICAgIHN1cGVyKGJhdHRsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVudGVyKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmVudGVyKCk7XHJcbiAgICAgICAgdGhpcy5fYmF0dGxlLnByZXBhcmVMZXZlbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsZWF2ZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5sZWF2ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKCk7XHJcbiAgICAgICAgaWYgKHRydWUgPT0gRG9kUmVzb3VyY2VNZ3IuSW5zdGFuY2UuaXNMZXZlbFByZXBhcmVkKCkpIHtcclxuICAgICAgICAgICAgaWYgKHRydWUgPT0gdGhpcy5fYmF0dGxlLmlzTGV2ZWxQcmVwcmFyZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgUmhvZGVzR2FtZS5JbnN0YW5jZS5zdGF0ZU1nci5ydW5TdGF0ZShHYW1lU3RhdGVJRC5CYXR0bGUpO1xyXG4gICAgICAgICAgICAgICAgRG9kTG9nLmRlYnVnKGBHYW1lU3RhdGVMZXZlbGxvYWQudXBkYXRlOiBsZXZlbCBbJHtEb2RSZXNvdXJjZU1nci5JbnN0YW5jZS5nZXRMZXZlbElEKCl9XSBpcyBwcmVwYXJlZC4gYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgR2FtZVN0YXRlQmFzZSBmcm9tIFwiLi9HYW1lU3RhdGVCYXNlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU3RhdGVMb2JieSBleHRlbmRzIEdhbWVTdGF0ZUJhc2V7XHJcbiAgICBjb25zdHJ1Y3RvcihiYXR0bGUpIHtcclxuICAgICAgICBzdXBlcihiYXR0bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbnRlcigpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5lbnRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsZWF2ZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5sZWF2ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgR2FtZVN0YXRlQmFzZSBmcm9tIFwiLi9HYW1lU3RhdGVCYXNlXCI7XHJcbmltcG9ydCBHYW1lU3RhdGVCYXR0bGUgZnJvbSBcIi4vR2FtZVN0YXRlQmF0dGxlXCI7XHJcbmltcG9ydCBEb2RMb2cgZnJvbSBcIi4uLy4uL0NvbW1vbi9Eb2RMb2dcIjtcclxuaW1wb3J0IEdhbWVTdGF0ZUxldmVsTG9hZCBmcm9tIFwiLi9HYW1lU3RhdGVMZXZlbGxvYWRcIjtcclxuaW1wb3J0IEdhbWVTdGF0ZUdhbWVsb2FkIGZyb20gXCIuL0dhbWVTdGF0ZUdhbWVsb2FkXCI7XHJcbmltcG9ydCBHYW1lU3RhdGVMb2JieSBmcm9tIFwiLi9HYW1lU3RhdGVMb2JieVwiO1xyXG5pbXBvcnQgUmhvZGVzR2FtZSBmcm9tIFwiLi4vUmhvZGVzR2FtZVwiO1xyXG5pbXBvcnQgR2FtZUJhdHRsZSBmcm9tIFwiLi4vR2FtZUJhdHRsZVwiO1xyXG5cclxuZXhwb3J0IGVudW0gR2FtZVN0YXRlSUQge1xyXG4gICAgTm9uZSxcclxuICAgIEdhbWVsb2FkLFxyXG4gICAgTG9iYnksXHJcbiAgICBMZXZlbGxvYWQsXHJcbiAgICBCYXR0bGUsXHJcbiAgICBDb3VudFxyXG59XHJcblxyXG4vKlxyXG4gKiDlpKfnirbmgIHmnLog566h55CG5ri45oiP5omA5aSE6Zi25q61XHJcbiAqIEBUT0RPIEdBTUVMT0FEIExPQkJZIExFVkVMTE9BRCBCQVRUTEVcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTdGF0ZU1nciB7XHJcbiAgICBwcml2YXRlIF9zdGF0ZXM6IEdhbWVTdGF0ZUJhc2VbXTtcclxuICAgIHByaXZhdGUgX2N1cnJlbnRTdGF0ZTogR2FtZVN0YXRlQmFzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihiYXR0bGU6R2FtZUJhdHRsZSkge1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZSA9IG51bGw7XHJcbiAgICAgICAgLy8gbGV0IGJhdHRsZSA9IFJob2Rlc0dhbWUuSW5zdGFuY2UuYmF0dGxlO1xyXG4gICAgXHJcbiAgICAgICAgdGhpcy5fc3RhdGVzID0gW107XHJcbiAgICAgICAgdGhpcy5fc3RhdGVzLnB1c2gobnVsbCk7XHJcbiAgICAgICAgdGhpcy5fc3RhdGVzLnB1c2gobmV3IEdhbWVTdGF0ZUdhbWVsb2FkKGJhdHRsZSkpO1xyXG4gICAgICAgIHRoaXMuX3N0YXRlcy5wdXNoKG5ldyBHYW1lU3RhdGVMb2JieShiYXR0bGUpKTtcclxuICAgICAgICB0aGlzLl9zdGF0ZXMucHVzaChuZXcgR2FtZVN0YXRlTGV2ZWxMb2FkKGJhdHRsZSkpO1xyXG4gICAgICAgIHRoaXMuX3N0YXRlcy5wdXNoKG5ldyBHYW1lU3RhdGVCYXR0bGUoYmF0dGxlKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBpbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucnVuU3RhdGUoR2FtZVN0YXRlSUQuR2FtZWxvYWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBydW5TdGF0ZShzdGF0ZUlEOiBHYW1lU3RhdGVJRCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChHYW1lU3RhdGVJRC5Db3VudCA8PSBzdGF0ZUlEIHx8IHN0YXRlSUQgPD0gR2FtZVN0YXRlSUQuTm9uZSkge1xyXG4gICAgICAgICAgICBEb2RMb2cuZXJyb3IoYEdhbWVTdGF0ZU1nci5ydW5TdGF0ZTogSW52YWxpZCBzdGF0ZUlEIFske3N0YXRlSUR9XS4gYCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChudWxsICE9IHRoaXMuX2N1cnJlbnRTdGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUubGVhdmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZSA9IHRoaXMuX3N0YXRlc1tzdGF0ZUlEXTtcclxuICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUuZW50ZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChudWxsICE9IHRoaXMuX2N1cnJlbnRTdGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUudXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAobnVsbCAhPSB0aGlzLl9jdXJyZW50U3RhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlLmxlYXZlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3N0YXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLl9zdGF0ZXNbaV07XHJcbiAgICAgICAgICAgIHN0YXRlLnJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEdhbWVDb25maWcgZnJvbSBcIi4vR2FtZUNvbmZpZ1wiO1xyXG5pbXBvcnQgU2NlbmVNYW5hZ2VyIGZyb20gXCIuL1NjZW5lTWFuYWdlclwiO1xyXG5pbXBvcnQgRml4VGltZSBmcm9tIFwiLi9GaXgvRml4VGltZVwiO1xyXG5pbXBvcnQgUmhvZGVzR2FtZSBmcm9tIFwiLi9HYW1lL1Job2Rlc0dhbWVcIjtcclxuaW1wb3J0IHsgRXZlbnRDZW50cmUgfSBmcm9tIFwiLi9FdmVudC9FdmVudENlbnRyZVwiO1xyXG5pbXBvcnQgRG9kUmVzb3VyY2VNZ3IgZnJvbSBcIi4vUmVzb3VyY2VzL0RvZFJlc291cmNlTWdyXCI7XHJcbmltcG9ydCBQZXJmb3JtYW5jZUNlbnRyZSBmcm9tIFwiLi9Db21tb24vR3JhcGhpY3MvUGVyZm9ybWFuY2VfTW9kdWxlL1BlcmZvcm1hbmNlQ2VudHJlXCI7XHJcbmltcG9ydCB7IFZlYzIgfSBmcm9tIFwiLi9Db21tb24vRG9kTWF0aFwiO1xyXG5pbXBvcnQgQWN0b3IgZnJvbSBcIi4vR2FtZS9BY3Rvci9BY3RvclwiO1xyXG5pbXBvcnQgeyBBY3RvclR5cGUgfSBmcm9tIFwiLi9Db21tb24vRG9kS2V5XCI7XHJcbmltcG9ydCB7IFN5bWJvbGl6ZWQsIE15U3ltYm9sIH0gZnJvbSBcIi4vRml4L0ZpeFN5bWJvbFwiO1xyXG5cclxuY2xhc3MgTWFpbiB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHQvL+agueaNrklEReiuvue9ruWIneWni+WMluW8leaTjlx0XHRcclxuXHRcdGlmICh3aW5kb3dbXCJMYXlhM0RcIl0pIExheWEzRC5pbml0KEdhbWVDb25maWcud2lkdGgsIEdhbWVDb25maWcuaGVpZ2h0KTtcclxuXHRcdGVsc2UgTGF5YS5pbml0KEdhbWVDb25maWcud2lkdGgsIEdhbWVDb25maWcuaGVpZ2h0LCBMYXlhW1wiV2ViR0xcIl0pO1xyXG5cdFx0TGF5YVtcIlBoeXNpY3NcIl0gJiYgTGF5YVtcIlBoeXNpY3NcIl0uZW5hYmxlKCk7XHJcblx0XHRMYXlhW1wiRGVidWdQYW5lbFwiXSAmJiBMYXlhW1wiRGVidWdQYW5lbFwiXS5lbmFibGUoKTtcclxuXHRcdExheWEuc3RhZ2Uuc2NhbGVNb2RlID0gR2FtZUNvbmZpZy5zY2FsZU1vZGU7XHJcblx0XHRMYXlhLnN0YWdlLnNjcmVlbk1vZGUgPSBHYW1lQ29uZmlnLnNjcmVlbk1vZGU7XHJcblx0XHQvL+WFvOWuueW+ruS/oeS4jeaUr+aMgeWKoOi9vXNjZW5l5ZCO57yA5Zy65pmvXHJcblx0XHRMYXlhLlVSTC5leHBvcnRTY2VuZVRvSnNvbiA9IEdhbWVDb25maWcuZXhwb3J0U2NlbmVUb0pzb247XHJcblxyXG5cdFx0Ly/miZPlvIDosIPor5XpnaLmnb/vvIjpgJrov4dJREXorr7nva7osIPor5XmqKHlvI/vvIzmiJbogIV1cmzlnLDlnYDlop7liqBkZWJ1Zz10cnVl5Y+C5pWw77yM5Z2H5Y+v5omT5byA6LCD6K+V6Z2i5p2/77yJXHJcblx0XHRpZiAoR2FtZUNvbmZpZy5kZWJ1ZyB8fCBMYXlhLlV0aWxzLmdldFF1ZXJ5U3RyaW5nKFwiZGVidWdcIikgPT0gXCJ0cnVlXCIpIExheWEuZW5hYmxlRGVidWdQYW5lbCgpO1xyXG5cdFx0aWYgKEdhbWVDb25maWcucGh5c2ljc0RlYnVnICYmIExheWFbXCJQaHlzaWNzRGVidWdEcmF3XCJdKSBMYXlhW1wiUGh5c2ljc0RlYnVnRHJhd1wiXS5lbmFibGUoKTtcclxuXHRcdGlmIChHYW1lQ29uZmlnLnN0YXQpIExheWEuU3RhdC5zaG93KCk7XHJcblx0XHRMYXlhLmFsZXJ0R2xvYmFsRXJyb3IgPSB0cnVlO1xyXG5cclxuXHRcdC8vR0FNRSBJTklUIChHTE9CQUwgTU9EVUxFKVxyXG5cdFx0Y29uc29sZS5sb2coXCJQQyBpbml0XCIpO1xyXG5cdFx0UGVyZm9ybWFuY2VDZW50cmUuaW5pdGlhbGl6ZShMYXlhLnN0YWdlKTtcclxuXHJcblx0XHQvL3Rlc3RcclxuXHRcdFBlcmZvcm1hbmNlQ2VudHJlLmluc3RhbmNlLmluaXRCb2FyZChbXHJcblx0XHRcdFswLDAsMCwwXSxcclxuXHRcdFx0WzAsMCwwLDBdLFxyXG5cdFx0XHRbMCwwLDAsMF0sXHJcblx0XHRcdFswLDAsMCwwXVxyXG5cdFx0XSwgbmV3IFZlYzIoNTAsNTApLCBuZXcgVmVjMigxMDAsMTAwKSwgXCIjZmYwMGZmXCIsIFwiI2ZmZmYwMFwiKTtcclxuXHJcblx0XHRQZXJmb3JtYW5jZUNlbnRyZS5pbnN0YW5jZS5kaXNwbGF5QWN0b3IobmV3IGNsYXNzIGltcGxlbWVudHMgU3ltYm9saXplZCB7XHJcblx0XHRcdHN5bWJvbDogTXlTeW1ib2wgPSBuZXcgTXlTeW1ib2woKTtcclxuXHRcdH0sIG5ldyBWZWMyKDEwMDAwLDEwMDAwKSwgbmV3IFZlYzIoKSlcclxuXHRcdC8vQnVnIFRlbXAgRml4XHJcblx0XHQvL3RvZG86IOWRiuivieadjuWTpeeCueWHu+S6i+S7tmJ1Z1xyXG5cclxuXHRcdC8vIGxldCBrID0gbmV3IGNsYXNzIGltcGxlbWVudHMgU3ltYm9saXplZCB7XHJcblx0XHQvLyBcdHN5bWJvbDogTXlTeW1ib2wgPSBuZXcgTXlTeW1ib2woKTtcclxuXHRcdC8vIH1cclxuXHJcblx0XHQvLyBQZXJmb3JtYW5jZUNlbnRyZS5pbnN0YW5jZS5kaXNwbGF5QWN0b3IoaywgbmV3IFZlYzIoNTAsNTApLCBuZXcgVmVjMig1MCw1MCkpO1xyXG5cdFx0XHJcblxyXG5cdFx0Ly8gY29uc29sZS5sb2coUGVyZm9ybWFuY2VDZW50cmUuaW5zdGFuY2UpO1xyXG5cdFx0Ly8gY29uc29sZS5sb2coayk7XHJcblxyXG5cdFx0Ly90ZXN0IGVuZFxyXG5cclxuXHRcdEZpeFRpbWUuaW5pdCgpO1xyXG5cdFx0UmhvZGVzR2FtZS5JbnN0YW5jZS5pbml0KCk7XHJcblx0XHREb2RSZXNvdXJjZU1nci5JbnN0YW5jZS5pbml0KCk7XHJcblx0XHRFdmVudENlbnRyZS5pbml0KCk7XHJcblxyXG5cdFx0Ly/mv4DmtLvotYTmupDniYjmnKzmjqfliLbvvIx2ZXJzaW9uLmpzb27nlLFJREXlj5HluIPlip/og73oh6rliqjnlJ/miJDvvIzlpoLmnpzmsqHmnInkuZ/kuI3lvbHlk43lkI7nu63mtYHnqItcclxuXHRcdExheWEuUmVzb3VyY2VWZXJzaW9uLmVuYWJsZShcInZlcnNpb24uanNvblwiLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMub25WZXJzaW9uTG9hZGVkKSwgTGF5YS5SZXNvdXJjZVZlcnNpb24uRklMRU5BTUVfVkVSU0lPTik7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgb25WZXJzaW9uTG9hZGVkKCk6IHZvaWQge1xyXG5cdFx0Ly/mv4DmtLvlpKflsI/lm77mmKDlsITvvIzliqDovb3lsI/lm77nmoTml7blgJnvvIzlpoLmnpzlj5HnjrDlsI/lm77lnKjlpKflm77lkIjpm4bph4zpnaLvvIzliJnkvJjlhYjliqDovb3lpKflm77lkIjpm4bvvIzogIzkuI3mmK/lsI/lm75cclxuXHRcdExheWEuQXRsYXNJbmZvTWFuYWdlci5lbmFibGUoXCJmaWxlY29uZmlnLmpzb25cIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLm9uQ29uZmlnTG9hZGVkKSk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgb25Db25maWdMb2FkZWQoKTogdm9pZCB7XHJcblxyXG5cdFx0XHJcblxyXG5cdFx0U2NlbmVNYW5hZ2VyLkluc3RhbmNlLmF3YWtlKCk7XHJcblx0XHRcclxuXHJcblx0XHQvL3Rlc3RcclxuXHRcdERvZFJlc291cmNlTWdyLkluc3RhbmNlLmluaXQoKTtcclxuXHRcdFxyXG5cdFx0Ly9Bd2FrZSBHYW1lIEVuZ2luZSBMb29wXHJcblx0XHRMYXlhLnRpbWVyLmxvb3AoMTYsIHRoaXMsIHRoaXMuX3VwZGF0ZSk7XHJcblx0XHRcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgX3VwZGF0ZSgpOiB2b2lkIHtcclxuXHRcdEZpeFRpbWUudXBkYXRlKCk7XHJcblx0XHRSaG9kZXNHYW1lLkluc3RhbmNlLnVwZGF0ZSgpO1xyXG5cdFx0RG9kUmVzb3VyY2VNZ3IuSW5zdGFuY2UudXBkYXRlKCk7XHJcblx0fVxyXG59XHJcblxyXG4vL+a/gOa0u+WQr+WKqOexu1xyXG5uZXcgTWFpbigpO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBEb2RSZXNvdXJjZU1nciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IERvZFJlc291cmNlTWdyO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSW5zdGFuY2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlIHx8ICh0aGlzLl9pbnN0YW5jZSA9IG5ldyB0aGlzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETyBA6ZO25Y2OXHJcbiAgICAvL2xvYWQgcmVzb3VyY2VzIGhlcmUgaW5jbHVkaW5nIEpTT04gLyBURVhUVVJFIC8gQVZBVEFSIC8gU1BJTkVcclxuICAgIC8vcHJpdmF0ZSBfanNvbjogRG9kSnNvbkxvYWRlcjtcclxuICAgIC8vcHJpdmF0ZSBfdGV4OiBEb2RUZXh0dXJlTG9hZGVyO1xyXG5cclxuICAgIHByaXZhdGUgX2xldmVsSUQ6IG51bWJlciB8IG51bGw7XHJcbiAgICBwcml2YXRlIF9pbml0ZWQ6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9sZXZlbFByZXBhcmVkOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX2xldmVsSUQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2luaXRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2xldmVsUHJlcGFyZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0TGV2ZWxJRChpZDogbnVtYmVyIHwgbnVsbCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2xldmVsSUQgPSBpZDtcclxuICAgICAgICB0aGlzLl9sZXZlbFByZXBhcmVkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldExldmVsSUQoKTogbnVtYmVyIHwgbnVsbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xldmVsSUQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgLy9UT0RPIExPQURcclxuICAgICAgICAvL3RoaXMuX2pzb24ubG9hZCgpO1xyXG4gICAgICAgIC8vdGhpcy5fdGV4LmxvYWQoKTtcclxuICAgICAgICAvL3NldCBpbml0ZWQgZmxhZyB0cnVlIHdoaWxlIGluaXRpYWxpemF0aW9uIGNvbXBsZXRlXHJcbiAgICAgICAgdGhpcy5faW5pdGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbml0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAobnVsbCAhPSB0aGlzLnNldExldmVsSUQgJiYgZmFsc2UgPT0gdGhpcy5fbGV2ZWxQcmVwYXJlZCkge1xyXG4gICAgICAgICAgICAvL3ByZXBhcmUgcHJlZmFiIGhlcmVcclxuICAgICAgICAgICAgaWYgKDEpIHsgICAgLy9tYWtlIHN1cmUgcHJlZmFiIHByZXBhcmVkXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sZXZlbFByZXBhcmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNMZXZlbFByZXBhcmVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sZXZlbFByZXBhcmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDdXJyZW50TGV2ZWxSZXMoKTogYW55IHtcclxuICAgICAgICAvL1RPRE9cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QWN0b3JSZXNCeUlEKGlkOiBudW1iZXIpOiBhbnkge1xyXG4gICAgICAgIC8vVE9ET1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59IiwiLy8gaW1wb3J0IEV2ZW50Q2VudHJlIGZyb20gXCIuL1RveWJveC9FdmVudENlbnRyZVwiO1xyXG4vLyBpbXBvcnQgRGF0YWJhc2UgZnJvbSBcIi4vVG95Ym94L0RhdGFiYXNlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2VuZU1hbmFnZXJ7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFNjZW5lTWFuYWdlcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IEluc3RhbmNlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZSB8fCAodGhpcy5faW5zdGFuY2UgPSBuZXcgdGhpcygpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxvYWRpbmdTY2VuZTpzdHJpbmcgPSBcIkxvYWRpbmdTY2VuZS5zY2VuZVwiO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBnYW1lU2NlbmU6c3RyaW5nID0gXCJHYW1lU2NlbmUuc2NlbmVcIjtcclxuXHJcbiAgICBwdWJsaWMgYXdha2UoKTogdm9pZCB7XHJcbiAgICAgICAgTGF5YS5TY2VuZS5vcGVuKHRoaXMuZ2FtZVNjZW5lKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiIsImltcG9ydCB7dWl9IGZyb20gXCIuLi91aS9sYXlhTWF4VUlcIjtcclxuaW1wb3J0IFJob2Rlc0dhbWUgZnJvbSBcIi4uL0dhbWUvUmhvZGVzR2FtZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUgZXh0ZW5kcyB1aS5HYW1lU2NlbmVVSSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIFVJU2V0OiBMYXlhLlNwcml0ZTtcclxuICAgIHB1YmxpYyBzdGF0aWMgc3RhZ2U6IExheWEuU3RhZ2U7XHJcbiAgICBwcml2YXRlIF9wYXVzZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIC8v5YWo5bGA5pWw5o2u77yI5pWw5o2u5bqT57G75a6M5oiQ5ZCO5bCG6KKr5pu/5Luj77yJXHJcbiAgICBwdWJsaWMgc3RhdGljIGZyYW1lTGVuZ3RoOiBudW1iZXIgPSAyMDsvL+W4p+mVv+W6plxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7dWl9IGZyb20gXCIuLi91aS9sYXlhTWF4VUlcIlxyXG5cclxuXHJcbi8vVE9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZGluZyBleHRlbmRzIHVpLkxvYWRpbmdTY2VuZVVJe1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpXHJcbiAgICB9XHJcbn0iLCIvKipUaGlzIGNsYXNzIGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IExheWFBaXJJREUsIHBsZWFzZSBkbyBub3QgbWFrZSBhbnkgbW9kaWZpY2F0aW9ucy4gKi9cbmltcG9ydCBWaWV3PUxheWEuVmlldztcclxuaW1wb3J0IERpYWxvZz1MYXlhLkRpYWxvZztcclxuaW1wb3J0IFNjZW5lPUxheWEuU2NlbmU7XG52YXIgUkVHOiBGdW5jdGlvbiA9IExheWEuQ2xhc3NVdGlscy5yZWdDbGFzcztcbmV4cG9ydCBtb2R1bGUgdWkge1xyXG4gICAgZXhwb3J0IGNsYXNzIEdhbWVTY2VuZVVJIGV4dGVuZHMgU2NlbmUge1xyXG5cdFx0cHVibGljIFVJU2V0OkxheWEuU3ByaXRlO1xuXHRcdHB1YmxpYyBTaWRlQmFyOkxheWEuU3ByaXRlO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiR2FtZVNjZW5lXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLkdhbWVTY2VuZVVJXCIsR2FtZVNjZW5lVUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIExvYWRpbmdTY2VuZVVJIGV4dGVuZHMgU2NlbmUge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJMb2FkaW5nU2NlbmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkuTG9hZGluZ1NjZW5lVUlcIixMb2FkaW5nU2NlbmVVSSk7XHJcbn1cciJdfQ==
